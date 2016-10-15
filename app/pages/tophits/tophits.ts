import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';
import { MoviedetailsPage } from '../../pages/moviedetails/moviedetails';
import { BookticketPage } from '../../pages/bookticket/bookticket';

@Component({
    templateUrl: 'build/pages/tophits/tophits.html',
})
export class TophitsPage {
    tophitslist: string[];

    constructor(
        private navCtrl: NavController,
        public cinemardata: CinemarData
    ) {
        this.loadtophitslist();
    }

    loadtophitslist() {
        return this.cinemardata.getTophitslist().then(data => {
            this.tophitslist = data;
            console.log(this.tophitslist);
        })
    }

    bookticket() {
        this.navCtrl.push(BookticketPage);
    }

    watchtrailer(moviedetails) {
        var thetrailer = `https://www.youtube.com/embed/${moviedetails.trailer}`;
        this.navCtrl.push(MoviedetailsPage, {
            trailerlinks: thetrailer,
            moviedetails: moviedetails
        });
    }

}
