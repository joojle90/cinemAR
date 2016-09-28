import {
    Page, NavController
}
from 'ionic-angular';

/*
  Generated class for the FastticketPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@
Page({
    templateUrl: 'build/pages/fastticket/fastticket.html',
})
export class FastticketPage {
    static get parameters() {
        return [
          [NavController]
        ]
    }
    constructor(nav) {
        this.nav = nav;
        gender: string = "f";
    }
}
