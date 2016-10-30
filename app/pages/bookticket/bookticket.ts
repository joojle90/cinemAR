import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';

@Component({
    templateUrl: 'build/pages/bookticket/bookticket.html',
})
export class BookticketPage {
    getbookingdetails: string[];
    selectionmoviesDD: string[];
    selectioncinemasDD: string[];
    selectiondatesDD: string[];
    selectiontimeDD: string[];
    selectedmovies: any;
    selectedcinema: any;
    selecteddate: any;
    selectedtime: any;

    idmovie: string;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        public cinemardata: CinemarData
    ) {
        this.getbookingdetails = this.navParams.data;
        this.loadmovieselection();
        this.loadcinemaselection(this.navParams.data['movieid']);

        this.idmovie = this.navParams.data['movieid'];

        this.selectedmovies = {
            movieid: this.idmovie
        }
        this.selectedcinema = "";
        this.selecteddate = "";
        this.selectedtime = "";
    }

    loadmovieselection() {
        return this.cinemardata.getSelectionMovieDD().then(data => {
            this.selectionmoviesDD = data.sort((a,b) => {
                return a.moviename.localeCompare(b.moviename);
            });
        });
    }

    loadcinemaselection(movieid: any) {
        return this.cinemardata.getSelectionCinemaDD(movieid).then(data => {
            console.log(data);
            this.selectioncinemasDD = data.sort((a,b) => {
                return a.cinemaname.localeCompare(b.cinemaname);
            });
        });
    }

    cinemaChange(selectedcinema) {
        this.selecteddate = "";
        return this.cinemardata.getSelectionDateDD(this.idmovie, selectedcinema).then(data => {
            this.selectiondatesDD = data;
            console.log(data);
        });
    }

    dateChange(selecteddate) {
        this.selectedtime = "";
        return this.cinemardata.getSelectionTimeDD(selecteddate).then(data => {
            this.selectiontimeDD = data;
            console.log(data);
        });
    }

    timeChange(selectedtime) {
        console.log(selectedtime);
    }

}
