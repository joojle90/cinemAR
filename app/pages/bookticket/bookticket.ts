import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';

@Component({
    templateUrl: 'build/pages/bookticket/bookticket.html',
})
export class BookticketPage {
    getbookingdetails: string[];
    zone: any;
    modeKeys: any;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        public cinemardata: CinemarData
    ) {
        this.getbookingdetails = this.navParams.data;
        this.loadmovieselection();
        console.log(this.getbookingdetails);

//        this.zone = {
//            kind: 'key2'
//        }
//        this.modeKeys =
//            [{
//                title: '1994 Music',
//                subTitle: 'Select your favorite'
//            }
//            'key1',
//            'key2',
//            'key3',
//            'key4',
//            ]
    }

    loadmovieselection() {
        return this.cinemardata.getSelectionMovieDD().then(data => {
            console.log(data);
            return data;
        });
    }

}
