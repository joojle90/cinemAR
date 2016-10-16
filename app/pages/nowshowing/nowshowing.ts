import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { CinemarData } from '../../providers/cinemar-data/cinemar-data';
import { MoviedetailsPage } from '../../pages/moviedetails/moviedetails';

let monthname = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug",
                 "sep", "oct", "nov", "dec"];

@Component({
    templateUrl: 'build/pages/nowshowing/nowshowing.html',
})
export class NowshowingPage {
    movielist: string[];

    constructor(
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        public cinemardata: CinemarData
    ) {
        this.presentLoadingData();
    }

//    ngOnInit() {
//        let loader = this.loadingCtrl.create({
//            content: "Please wait..." ,
//            duration: 3000,
//            dismissOnPageChange: true
//        });
//        try {
//            loader.present();
//        } catch (e) {
//
//        }
////            loader.present();
//        this.loadmovielist().then(() => {
//            setTimeout(() => {
//                loader.dismiss();
//             }, 3000);
//        });
//    }

    loadmovielist() {
        return this.cinemardata.getMovielist().then(data => {
            let movieitems = data.filter(themovie => {
                let datea = themovie.showtime.split(" ");
                let dateb = new Date (datea[2], monthname.indexOf(datea[1].toLowerCase()), datea[0]);
                return dateb < new Date() && themovie.status === "active";
            });
            this.movielist = movieitems.sort((a,b) => {
                let datesortA = a.showtime.split(" ");
                let datesortB = b.showtime.split(" ");
                let newdateA = new Date (datesortA[2], monthname.indexOf(datesortA[1].toLowerCase()), datesortA[0]);
                let newdateB = new Date (datesortB[2], monthname.indexOf(datesortB[1].toLowerCase()), datesortB[0]);
                return newdateB > newdateA;
            });
        })
    }

    watchtrailer(movieitems, moviedetails) {
        this.navCtrl.push(MoviedetailsPage, {
            showtimes: movieitems.showtime,
            movienames: movieitems.moviename,
            likes: movieitems.like,
            moviedetails: moviedetails,
            discount: movieitems.discount
        });
    }

    presentLoadingData() {
//        setTimeout(() => {
            let loader = this.loadingCtrl.create({
                content: "Please wait..."
            });
            //loader.present();
            try {
                loader.present();
            } catch (e) {
                console.log(e);
            }

            this.loadmovielist().then(() => {
                loader.dismiss();
            });
//        }, 3000);
    }
}
