import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SortingHat } from './sorting-hat.component';
import { SortingHatScoreboard } from './sorting-hat-scoreboard.component';

export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

const appRoutes: Routes = [
  { path: 'sorting-hat', component: SortingHat },
  { path: 'sorting-hat-scoreboard', component: SortingHatScoreboard },
  { path: '',
    redirectTo: '/sorting-hat',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SortingHat,
    SortingHatScoreboard
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
