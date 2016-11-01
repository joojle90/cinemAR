import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/selectseats/selectseats.html',
})
export class SelectseatsPage {
    totalticket: number;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams
    ) {
        this.totalticket = this.navParams.data['totalticket'];
        console.log(this.totalticket);
    }

}
