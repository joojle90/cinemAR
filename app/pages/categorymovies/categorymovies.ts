import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';

let monthname = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug",
                 "sep", "oct", "nov", "dec"];

@Component({
    templateUrl: 'build/pages/categorymovies/categorymovies.html',
})
export class CategorymoviesPage {
    getmoviecategories: string;
    moviesbycategories: string[];

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        public cinemardata: CinemarData
    ) {
        this.getmoviecategories = this.navParams.data.genrename;
        this.loadcategoryMovieslist(this.getmoviecategories);
        console.log(this.getmoviecategories);
    }

    loadcategoryMovieslist(thegenre: string) {
        return this.cinemardata.getMoviebyCategory().then(data => {
            let mymovies: any = [];

            for (let i in data) {
                let showa = data[i].showtime.split(" ");
                let theshow = new Date (showa[2], monthname.indexOf(showa[1].toLowerCase()), showa[0]);

                for (let j in data[i].moviedetails) {
                    mymovies.push({
                        showtimes: data[i].showtime,
                        movienames: data[i].moviename,
                        likes: data[i].like,
                        moviedetails: data[i].moviedetails,
                        discount: data[i].discount,
                        comingshow: theshow > new Date() ?  1 : 0,
                        genrename: data[i].moviedetails[j].genre
                    });
                }
            }
            this.moviesbycategories = mymovies.filter(datamovies => {
//                let s = [];
//                for (let i in datamovies.genrename) {
//                    s = datamovies.genrename[i];
//                    console.log(datamovies.genrename[i]);
////                    return datamovies.genrename[i] === thegenre ? datamovies : "No data";
//                }
                return datamovies;
            });
                    console.log(this.moviesbycategories);
        })
    }

}
