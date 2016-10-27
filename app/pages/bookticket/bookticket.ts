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
    selectedmovies: any;
    selectedcinema: any;
    selecteddate: any;

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
        });
    }

    dateChange(selecteddate) {
        console.log(selecteddate);
    }

}
