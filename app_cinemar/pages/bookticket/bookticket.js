import {
    Page, NavController
}
from 'ionic-angular';

/*
  Generated class for the BookticketPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@
Page({
    templateUrl: 'build/pages/bookticket/bookticket.html',
})
export class BookticketPage {
    static get parameters() {
        return [
          [NavController]
        ]
    }
    constructor(nav) {

    }
        //    gaming: string = "n64";
        //    gender: string = "f";
        //    musicAlertOpts: {
        //        title: string,
        //        subTitle: string
        //    };
        //
        //    constructor(nav: NavController) {
        //        this.nav = nav;
        //        this.musicAlertOpts = {
        //            title: '1994 Music',
        //            subTitle: 'Select your favorite'
        //        };
        //    }
        //
        //    stpSelect() {
        //        console.log('STP selected');
        //    }
}
