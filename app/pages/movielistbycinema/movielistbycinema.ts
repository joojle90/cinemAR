import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';

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

    }

}
