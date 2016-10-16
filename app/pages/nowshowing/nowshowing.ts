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
            let movieitems = data.filter(themovie => {
                let datea = themovie.showtime.split(" ");
                let dateb = new Date (datea[2], monthname.indexOf(datea[1].toLowerCase()), datea[0]);
                return dateb < new Date() && themovie.status === "active";
            });
            this.movielist = movieitems.sort((a,b) => {
                let datesortA = a.showtime.split(" ");
                let datesortB = b.showtime.split(" ");
                let newdateA = new Date (datesortA[2], monthname.indexOf(datesortA[1].toLowerCase()), datesortA[0]);
                let newdateB = new Date (datesortB[2], monthname.indexOf(datesortB[1].toLowerCase()), datesortB[0]);
                return newdateB > newdateA;
            });
        })
    }

    watchtrailer(movieitems, moviedetails) {
        let thetrailer = `https://www.youtube.com/embed/${moviedetails.trailer}`;
        this.navCtrl.push(MoviedetailsPage, {
            trailerlinks: thetrailer,
            showtimes: movieitems.showtime,
            movienames: movieitems.moviename,
            likes: movieitems.like,
            moviedetails: moviedetails
        });
    }
}
