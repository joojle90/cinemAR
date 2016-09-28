import {
    Page, NavController
}
from 'ionic-angular';
import {
    MovieData
}
from '../../providers/movie-data';
import {
    PlayvideoPage
}
from '../playvideo/playvideo';

@
Page({
    templateUrl: 'build/pages/comingsoon/comingsoon.html',
    providers: [MovieData]
})
export class ComingsoonPage {
    static get parameters() {
        return [
          [NavController], [MovieData]
        ]
    }
    constructor(nav, moviedata) {
        this.nav = nav;
        this.moviedata = moviedata;

        moviedata.load();

        this.comingsoonlist = [];

        this.loadDataComingsoon();
    }

    loadDataComingsoon() {
        var monthname = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

        return this.moviedata.getDataMovie().then(data => {
            this.comingsoonlist = data.filter(newdata => {
                var thedate = newdata.moviedet[0].showtime.split(" ");
                var setdate = new Date (thedate[2], monthname.indexOf(thedate[1].toLowerCase()), thedate[0]);
                return setdate > new Date();
            });
            this.comingsoonlist = this.comingsoonlist.sort((a,b) => {
                var thedatea = a.moviedet[0].showtime.split(" ");
                var setdatea = new Date (thedatea[2], monthname.indexOf(thedatea[1].toLowerCase()), thedatea[0]);
                var thedateb = b.moviedet[0].showtime.split(" ");
                var setdateb = new Date (thedateb[2], monthname.indexOf(thedateb[1].toLowerCase()), thedateb[0]);
                return setdatea - setdateb;
            });
        });
    }

    watchtrailer(moviedetail) {
        var trailerlink = `https://www.youtube.com/embed/${moviedetail.trailer}`;
        this.nav.push(PlayvideoPage, {
            trailerlinks: trailerlink,
            moviedetails: moviedetail,
            readyTicket: false
        });
    }
}
