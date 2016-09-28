import {
    Page, NavController
}
from 'ionic-angular';
import {
    MovieData
}
from '../../providers/movie-data';
import {
    BookticketPage
}
from '../../pages/bookticket/bookticket';
import {
    PlayvideoPage
}
from '../../pages/playvideo/playvideo';

/*
  Generated class for the TophitsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@
Page({
    templateUrl: 'build/pages/tophits/tophits.html',
    providers: [MovieData],
    config: {}
})
export class TophitsPage {
    static get parameters() {
        return [
          [NavController], [MovieData]
        ]
    }
    constructor(nav, moviedata) {
        this.nav = nav;
        this.moviedata = moviedata;

        moviedata.load();

        this.tophitlist = [];

        this.loadDataTophits();
    }

    loadDataTophits() {
        return this.moviedata.getDataMovie().then(data => {
            this.tophitlist = data.sort((a,b) => {
                    return b.like - a.like;
            });
            this.tophitlist = this.tophitlist.slice(0, 10);
            console.log(this.tophitlist);
        });
    }

    bookticket() {
        this.nav.push(BookticketPage);
    }

    watchtrailer(moviedetail) {
        var trailerlink = `https://www.youtube.com/embed/${moviedetail.trailer}`;
        this.nav.push(PlayvideoPage, {
            trailerlinks: trailerlink,
            moviedetails: moviedetail
        });
    }
}
