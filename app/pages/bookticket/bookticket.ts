import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/bookticket/bookticket.html',
})
export class BookticketPage {
    getbookingdetails: string[];

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams
    ) {
        this.getbookingdetails = this.navParams.data;
        console.log(this.getbookingdetails);
    }

}
