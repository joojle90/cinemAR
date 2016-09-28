import {
    Page, NavController
}
from 'ionic-angular';

/*
  Generated class for the AboutusPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@
Page({
    templateUrl: 'build/pages/aboutus/aboutus.html',
})
export class AboutusPage {
    static get parameters() {
        return [
          [NavController]
        ]
    }
    constructor(nav) {
        this.nav = nav;
    }
}
