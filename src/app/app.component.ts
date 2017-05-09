import { Component } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	housesObservable: FirebaseListObservable<any>;
	houses: Array<object>;

	constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
		this.housesObservable = db.list('/houses', {
			query: {
				limitToLast: 4
			}
		});

		this.housesObservable.subscribe(houses => {
			this.houses = houses;
			console.log('AppComponent subscribe');
		});
	}
}
