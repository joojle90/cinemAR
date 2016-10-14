import { Component, ViewChild, Type } from '@angular/core';
import { Platform, ionicBootstrap, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { CinemarData } from './providers/cinemar-data/cinemar-data';
import { TabsPage } from './pages/tabs/tabs';

//let component = [NowshowingPage];

@Component({
    templateUrl: 'build/app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    urllink: string;
    activelink: any;

    private rootPage: Type = TabsPage;

    leftsidemenu: string[];

    constructor(
        private platform: Platform,
        public mymenu: MenuController,
        public cinemardata: CinemarData
    ) {
        platform.ready().then(() => {
            StatusBar.styleDefault();
        });

        //this.urllink = "http://cinemar.myxscan.net/api/Movie/";
        this.loadleftsidemenu();
    }

    loadleftsidemenu() {
        return this.cinemardata.getLeftsidemenu().then(data => {
            this.leftsidemenu = data;
            console.log(this.leftsidemenu);
        })
    }

    openPage(mypage: any) {
        console.log(mypage);
        if(mypage === 0) {
            this.activelink = true;
        } else {
            this.activelink = false;
        }
//        for(var i = 0; i < this.leftsidemenu.length; i++) {
//            console.log(this.leftsidemenu[i].submenu);
//          if(this.leftsidemenu[i].name == "mypage.title") {
//
//          }
//          else  {
//              this.leftsidemenu[i].active = false;
//          }
//        }
    }
}

ionicBootstrap(MyApp, [CinemarData], { });
