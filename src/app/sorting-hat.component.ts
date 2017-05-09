import { Component } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Component({
	selector: 'app-component',
	templateUrl: './sorting-hat.component.html',
	styleUrls: ['./sorting-hat.component.css']
})
export class SortingHat {
	housesObservable: FirebaseListObservable<any>;
	houses: Array<object>;
	backgroundMusicUrl: string = '/assets/audio/harry_potter_theme.mp3';
	backgroundMusic: any;

	constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
		this.backgroundMusic = new Audio(this.backgroundMusicUrl);
		this.backgroundMusic.volume = 1;
		// this.backgroundMusic.play();

		this.housesObservable = db.list('/houses', {
			query: {
				limitToLast: 4
			}
		});

		this.housesObservable.subscribe(houses => {
			this.houses = houses;
			console.log('SortingHat subscribe');
		});
	}

	getAvailableHouses() {
		let me = this;
		let max = Math.max.apply(Math, this.houses.map(house => { return (house['students'] ? Object.keys(house['students']).length : 0); }));
		let min = Math.min.apply(Math, this.houses.map(house => { return (house['students'] ? Object.keys(house['students']).length : 0); }));
		if (max === min) {
			return me.houses.map((house, index) => { return index; });
		}
		return me.houses.filter(house => { return (house['students'] ? Object.keys(house['students']).length < max : true); }).map(house => { return me.houses.indexOf(house); });
	}

	assignToRandomHouse(studentName: string, input) {
		if (!studentName) {
			return;
		}
		let me = this;
		let availableHouses = me.getAvailableHouses();
		let randomAvailableHouseKey = availableHouses[Math.floor(Math.random() * availableHouses.length)].toString();
		me.playAssignedHouse(randomAvailableHouseKey, () => {
			me.backgroundMusic.volume = 1;
			input.value = '';
		});
		return me.addToHouse(randomAvailableHouseKey, studentName);
	}

	playAssignedHouse(houseKey: string, callback) {
		this.backgroundMusic.volume = 0.25;
		let audio = new Audio(this.houses[houseKey].audioUrl);
		audio.onended = callback;
		audio.play();
	}

	addToHouse(houseKey: string, studentName: string) {
		if (houseKey) {
			let newStudentKey = this.db.database.ref().child('houses').child(houseKey.toString()).child('students').push().key;
			
			let updates = {};
			updates['/houses/' + houseKey + '/students/' + newStudentKey] = studentName;
			return this.db.database.ref().update(updates);
		}
		return false;
	}
}
