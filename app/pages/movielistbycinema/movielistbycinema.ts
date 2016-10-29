import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';

let monthname = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug",
                 "sep", "oct", "nov", "dec"];

@Component({
    templateUrl: 'build/pages/movielistbycinema/movielistbycinema.html',
})

export class MovielistbycinemaPage {
    getcinemadetails: string[];
    getcinemaimages: string[];
    slideconf: any;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        public cinemardata: CinemarData
    ) {
        this.slideconf = {
            initialSlide: 0,
            autoplay: 3000,
            autoplayDisableOnInteraction: false
        };

        this.getcinemaimages = this.navParams.data['cinemaimages'];

        let images: any = [];
        for(var i in this.getcinemaimages) {
            images.push({
                image: this.getcinemaimages[i]
            })
        }
        this.getcinemaimages = images;

        this.getcinemadetails = this.navParams.data;
        this.loadmoviesbycinema(this.navParams.data['cinemaid']);
    }

    loadmoviesbycinema(thecinema: string) {
        return this.cinemardata.getMovielist().then(data => {
            let mymovies: any = [];
            let movielist = data.sort((a,b) => {
                let datesortA = a.showtime.split(" ");
                let datesortB = b.showtime.split(" ");
                let newdateA = new Date (datesortA[2], monthname.indexOf(datesortA[1].toLowerCase()), datesortA[0]);
                let newdateB = new Date (datesortB[2], monthname.indexOf(datesortB[1].toLowerCase()), datesortB[0]);
                return newdateB > newdateA;
            });
            console.log(thecinema);

            for(let i in movielist) {
                let showdate = movielist[i].showtime.split(" ");
                let theshowdate = new Date (showdate[2], monthname.indexOf(showdate[1].toLowerCase()), showdate[0]);

                for(let j in movielist[i].cinemamovie) {
                    if(movielist[i].cinemamovie[j].cinemaid === thecinema) {
                        mymovies.push({
                            movieitems: movielist[i],
                            moviedetails: movielist[i].moviedetails,
                            moviestatus: data[i].status,
                            discount: movielist[i].discount > 0 ?  1 : 0,
                            comingshow: theshowdate > new Date() ?  1 : 0
                        });
                    }
                }
            }
                        console.log(mymovies);

//            for (let i in movielist) {
//                let showdate = data[i].showtime.split(" ");
//                let theshowdate = new Date (showdate[2], monthname.indexOf(showdate[1].toLowerCase()), showdate[0]);
//
//                for (let j in data[i].cinemamovie) {
//                    mymovies.push({
//                        movieitems: data[i],
//                        moviedetails: data[i].moviedetails,
//                        genrename: data[i].moviedetails[j].genre,
//                        moviestatus: data[i].status,
//                        comingshow: theshowdate > new Date() ?  1 : 0
//                    });
//                }
//            }
//
//            this.moviesbycategories = mymovies.filter((datamovies, j) => {
//                for (let i in datamovies.genrename) {
//                    if(datamovies.genrename[i].genrename === thegenre && mymovies[j].moviestatus === "active") {
//                        console.log(mymovies[j]);
//                        this.moviesbycategories = mymovies[j]
//                        return this.moviesbycategories;
//                    }
//                }
//            });
        })
    }

}
