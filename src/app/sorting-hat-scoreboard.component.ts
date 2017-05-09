import { Component } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Component({
	selector: 'app-component',
	templateUrl: './sorting-hat-scoreboard.component.html',
	styleUrls: ['./sorting-hat-scoreboard.component.css']
})
export class SortingHatScoreboard {
	housesObservable: FirebaseListObservable<any>;
	houses: Array<object>;
	backgroundMusicUrl: string = '/assets/audio/harry_potter_theme.mp3';
	backgroundMusic: any;
	ignoreClick: boolean = false;
	clickTimer: any;
	clickDelay: number = 200;

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
			console.log('SortingHatScoreboard subscribe');
		});
	}

	increaseScore(house) {
		var me = this;
	    this.clickTimer = setTimeout(function() {
	      if (!me.ignoreClick) {
			let houseKey = me.houses.indexOf(house);
			if (house) {
				let updates = {};
				updates['/houses/' + houseKey + '/score/'] = house.score + 5;
				me.db.database.ref().update(updates);
			}
	      }
	      me.ignoreClick = false;
	    }, me.clickDelay);
	}

	decreaseScore(house) {
	    clearTimeout(this.clickTimer);
		this.ignoreClick = true;
		let houseKey = this.houses.indexOf(house);
		if (house) {
			let updates = {};
			updates['/houses/' + houseKey + '/score/'] = house.score - 5;
			return this.db.database.ref().update(updates);
		}
		return false;
	}
}