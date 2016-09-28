import {
    IonicApp, Page, NavController
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
from '../playvideo/playvideo';

@
Page({
    templateUrl: 'build/pages/promotion/promotion.html',
    providers: [MovieData]
})
export class PromotionPage {
    static get parameters() {
        return [
          [IonicApp], [NavController], [MovieData]
        ]
    }
    constructor(app, nav, moviedata) {
        this.app = app;
        this.nav = nav;
        this.moviedata = moviedata;

        moviedata.load();

        this.promotionlist = [];

        this.loadDataPromotion();
    }

    loadDataPromotion() {
        return this.moviedata.getDataMovie().then(data => {
            this.promotionlist = data.filter(newdata => newdata.discount > 0);
            console.log(this.promotionlist);
        });
    }

    getpromotion() {
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
