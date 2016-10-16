import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';
import { BookticketPage } from '../../pages/bookticket/bookticket';

@Component({
    templateUrl: 'build/pages/moviedetails/moviedetails.html',
})
export class MoviedetailsPage {
    getmoviedetails: string[];

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams
    ) {
        this.getmoviedetails = this.navParams.data;
        console.log(this.getmoviedetails);
    }

}
