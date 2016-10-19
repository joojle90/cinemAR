import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';
import { MoviedetailsPage } from '../../pages/moviedetails/moviedetails';
import { BookticketPage } from '../../pages/bookticket/bookticket';

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
            let movielist = data.sort((a,b) => {
                let datesortA = a.showtime.split(" ");
                let datesortB = b.showtime.split(" ");
                let newdateA = new Date (datesortA[2], monthname.indexOf(datesortA[1].toLowerCase()), datesortA[0]);
                let newdateB = new Date (datesortB[2], monthname.indexOf(datesortB[1].toLowerCase()), datesortB[0]);
                return newdateB > newdateA;
            });

            for (let i in movielist) {
                let showdate = data[i].showtime.split(" ");
                let theshowdate = new Date (showdate[2], monthname.indexOf(showdate[1].toLowerCase()), showdate[0]);

                for (let j in data[i].moviedetails) {
                    mymovies.push({
                        movieitems: data[i],
                        moviedetails: data[i].moviedetails,
                        genrename: data[i].moviedetails[j].genre,
                        moviestatus: data[i].status,
                        comingshow: theshowdate > new Date() ?  1 : 0
                    });
                }
            }

            this.moviesbycategories = mymovies.filter((datamovies, j) => {
                for (let i in datamovies.genrename) {
                    if(datamovies.genrename[i].genrename === thegenre && mymovies[j].moviestatus === "active") {
                        console.log(mymovies[j]);
                        this.moviesbycategories = mymovies[j]
                        return this.moviesbycategories;
                    }
                }
            });
        })
    }

    bookticket() {
        this.navCtrl.push(BookticketPage);
    }

    watchtrailer(movieitems, moviedetails) {
        console.log(movieitems);
        let showa = movieitems.showtime.split(" ");
        let theshow = new Date (showa[2], monthname.indexOf(showa[1].toLowerCase()), showa[0]);

        this.navCtrl.push(MoviedetailsPage, {
            movieid: movieitems.movieid,
            image: movieitems.image_land,
            showtimes: movieitems.showtime,
            movienames: movieitems.moviename,
            likes: movieitems.like,
            moviedetails: moviedetails,
            discount: movieitems.discount,
            comingshow: theshow > new Date() ?  1 : 0
        });
    }

}
