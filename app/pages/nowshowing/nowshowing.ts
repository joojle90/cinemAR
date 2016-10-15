import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';
import { MoviedetailsPage } from '../../pages/moviedetails/moviedetails';

let monthname = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug",
                 "sep", "oct", "nov", "dec"];

@Component({
    templateUrl: 'build/pages/nowshowing/nowshowing.html',
})
export class NowshowingPage {
    movielist: string[];

    constructor(
        private navCtrl: NavController,
        public cinemardata: CinemarData
    ) {
        this.loadmovielist();
    }

    loadmovielist() {
        return this.cinemardata.getMovielist().then(data => {
            this.movielist = data.filter(moviesort => {
                let datea = moviesort.showtime.split(" ");
                let dateb = new Date (datea[2], monthname.indexOf(datea[1].toLowerCase()), datea[0]);
                return dateb < new Date();
            });
        })
    }

    watchtrailer(moviedetails) {
        var thetrailer = `https://www.youtube.com/embed/${moviedetails.trailer}`;
        this.navCtrl.push(MoviedetailsPage, {
            trailerlinks: thetrailer,
            moviedetails: moviedetails
        });
    }
}
