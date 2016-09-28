import {
    Page, NavController
}
from 'ionic-angular';
import {
    MovieData
}
from '../../providers/movie-data';

/*
  Generated class for the CategoryPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@
Page({
    templateUrl: 'build/pages/category/category.html',
    providers: [MovieData],
    config: {
        tabbarPlacement: "top"
    }
})
export class CategoryPage {
    static get parameters() {
        return [
          [NavController], [MovieData]
        ]
    }
    constructor(nav, moviedata) {
        this.nav = nav;
        this.moviedata = moviedata;

        moviedata.load();

        this.genrelist = [];

        this.loadDataGenre();
    }

    loadDataGenre() {
        return this.moviedata.getDataGenre().then(data => {
            this.genrelist = data;
        });
    }

    moviebygenre(genre) {
        console.log(genre);
//        this.nav.push(PlayvideoPage, {
//            trailerlinks: trailerlink,
//            moviedetails: moviedetail
//        });
    }
}
