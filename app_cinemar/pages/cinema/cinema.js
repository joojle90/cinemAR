import {
    Page, NavController
}
from 'ionic-angular';
import {
    MovieData
}
from '../../providers/movie-data';
@
Page({
    templateUrl: 'build/pages/cinema/cinema.html',
    providers: [MovieData]
})
export class CinemaPage {
    static get parameters() {
        return [
          [NavController], [MovieData]
        ]
    }
    constructor(nav, moviedata) {
        this.nav = nav;
        this.moviedata = moviedata;

        moviedata.load();

        this.cinemashowlist = [];

        this.loadDataCinemashow();
    }

    loadDataCinemashow() {
        return this.moviedata.getDataCinemashow().then(data => {
            this.cinemashowlist = data;
        });
    }
}
