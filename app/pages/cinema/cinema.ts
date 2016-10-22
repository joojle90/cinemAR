import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';

@Component({
    templateUrl: 'build/pages/cinema/cinema.html',
})
export class CinemaPage {
    cinemalist: string[];

    constructor(
        private navCtrl: NavController,
        public cinemardata: CinemarData
    ) {
        this.loadcinemalist();
    }

    loadcinemalist() {
        return this.cinemardata.getCinemaList().then(data => {
            let thecinema = data.filter(datacinema =>
                 datacinema.status === "active");

            this.cinemalist = thecinema.sort((a,b) => {
                return a.cinemaname.localeCompare(b.cinemaname);
            });
        })
    }

    moviesbycinema(getmoviedetails) {
        console.log(getmoviedetails);
    }

}
