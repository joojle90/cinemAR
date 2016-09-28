import {
    Injectable
}
from '@angular/core';
import {
    Http
}
from '@angular/http';


@
Injectable()
export class MovieData {
    static get parameters() {
        return [[Http]];
    }
    constructor(http) {
        // inject the Http provider and set to this instance
        this.http = http;
    }

    load() {
        if (this.data) {
            return Promise.resolve(this.data);
        }

        return new Promise(resolve => {
            this.http.get('data/moviedata.json').subscribe(res => {
                resolve(res.json());
            });
        });
    }

    getLeftsidemenu() {
        return this.load().then(data => {
            return data.leftsidemenu;
        });
    }

    getTabcontent() {
        return this.load().then(data => {
            return data.tabcontent;
        });
    }

    getDataMovie() {
        return this.load().then(data => {
            return data.datamovie;
        });
    }

    getDataPromotion() {
        return this.load().then(data => {
            return data.promotion;
        });
    }

    getDataGenre() {
        return this.load().then(data => {
            return data.categorygenre;
        });
    }

    getDataTophits() {
        return this.load().then(data => {
            return data.movietophits;
        });
    }

    getDataCinemashow() {
        return this.load().then(data => {
            return data.cinemashow;
        });
    }

    getDataComingsoon() {
        return this.load().then(data => {
            return data.comingsoon;
        });
    }

}
