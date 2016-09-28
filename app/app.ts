import { Component } from '@angular/core';
import { Platform, ionicBootstrap, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { CinemarData } from './providers/cinemar-data/cinemar-data';
import { NowshowingPage } from './pages/nowshowing/nowshowing';


let component = [NowshowingPage];

@Component({
    templateUrl: 'build/app.html'
})
export class MyApp {
    urllink: string;
    leftsidemenu: string[];

    private rootPage: any;

    constructor(
        private platform: Platform,
        public mymenu: MenuController,
        public cinemardata: CinemarData
    ) {
        this.rootPage = NowshowingPage;

        platform.ready().then(() => {
            StatusBar.styleDefault();
        });

        //this.urllink = "http://cinemar.myxscan.net/api/Movie/";
        this.loadleftsidemenu();
    }

    loadleftsidemenu() {
        return this.cinemardata.getLeftsidemenu().then(data => {
            this.leftsidemenu = data;
        })
    }
}

ionicBootstrap(MyApp, [CinemarData], { });
