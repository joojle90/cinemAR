import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

//let serverURL = 'http://cinemar.myxscan.net/api/Movie/';
//let serverURL = '/api/Movie/'; // Json web api
let serverURL = 'data/';

@Injectable()
export class CinemarData {

    data: any;
    apidata: any;
    errormsg: string;

    constructor(
        private http: Http
    ) {
        this.http = http;
    }

    load(apidata) {
        if (this.data) {
            return Promise.resolve(this.data);
        }

        return new Promise((resolve, reject) => {
            this.http.get(serverURL+apidata).map(response => response.json())
            .subscribe(
                result => {
                    resolve(result);
                },
                error => {
                    Promise.reject(new Error("my error msg"))
                    .catch(error => {
                        return this.errormsg = "Error404";
                    });
                }
            );
        });
    }

    getLeftsidemenu() {
        return this.load('leftsidemenu.json').then(data => {
            return data.leftsidemenu;
        });
    }

    getMovielist() {
        return this.load('movielist.json').then(data => {
            return data.movielist;
        });
    }

    getTophitslist() {
        return this.load('tophits.json').then(data => {
            return data.tophits;
        });
    }

    getCategorylist() {
        return this.load('category.json').then(data => {
            return data.categories;
        });
    }

    getPromotionlist() {
        return this.load('promotion.json').then(data => {
            return data.promotions;
        });
    }

    getCinemaList() {
        return this.load('cinemashow.json').then(data => {
            return data.cinemashow;
        });
    }

    getSelectionMovieDD() {
        return this.load('movielist.json').then(data => {
            let movieselection: any = [];

            for (let c in data.movielist) {
                let s = data.movielist[c];
                movieselection.push({
                        movieid: s.movieid,
                        moviename: s.moviename
                })
            }
            return movieselection;
        });
    }

    getSelectionCinemaDD(movieid: any) {
        return this.load('movielist.json').then(data => {
            let moviecinemas = data.movielist.filter(thecinema => {
                return thecinema.movieid === movieid && thecinema.status === "active";
            });
            console.log(moviecinemas);
            return moviecinemas[0].cinemamovie;
        });
    }

    getSelectionDateDD(movieid: any, cinemaid: any) {
        return this.load('movieschedule.json').then(data => {
            let moviedate = data.movieschedule.filter(themoviedate => {
                return themoviedate.movieid === movieid && themoviedate.cinemaid === cinemaid && themoviedate.status === "active";
            });
            return moviedate.length > 0  ? moviedate[0].scheduledetails : [];
        });
    }

}

