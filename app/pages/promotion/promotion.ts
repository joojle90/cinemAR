import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';
import { MoviedetailsPage } from '../../pages/moviedetails/moviedetails';

/*
  Generated class for the PromotionPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'build/pages/promotion/promotion.html',
})
export class PromotionPage {
    promotionlist: string[];
    slideconf: any;

    constructor(
        private navCtrl: NavController,
        public cinemardata: CinemarData
    ) {

        this.slideconf = {
            initialSlide: 0,
            autoplay: 3000,
            autoplayDisableOnInteraction: false
        };
        this.loadpromotionlist();
    }

    loadpromotionlist() {
        return this.cinemardata.getPromotionlist().then(data => {
            this.promotionlist = data.filter(datapromo =>
                     datapromo.discount > 0 && datapromo.status === "active");
        })
    }

}
