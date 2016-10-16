import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';
import { MoviedetailsPage } from '../../pages/moviedetails/moviedetails';
import { BookticketPage } from '../../pages/bookticket/bookticket';

let monthname = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug",
                 "sep", "oct", "nov", "dec"];

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
            let thetophits = data.filter(themovie => {
                let datea = themovie.showtime.split(" ");
                let dateb = new Date (datea[2], monthname.indexOf(datea[1].toLowerCase()), datea[0]);
                return dateb < new Date() && themovie.status === "active";
            });
            this.tophitslist = thetophits.sort((a,b) => {
                return b.like - a.like;
            });
            this.tophitslist = this.tophitslist.slice(0, 10);
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
