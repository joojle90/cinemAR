import {
    IonicApp, Page, NavController, ActionSheet, Alert, Config, NavParams, Platform
}
from 'ionic-angular';
import {
    ElasticHeader
}
from '../../directives/elastic-header/elastic-header';
import {
    YoutubeVideo
}
from '../../directives/youtube/youtube';
import {
    BookticketPage
}
from '../../pages/bookticket/bookticket';

/*
  Generated class for the PlayvideoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@
Page({
    templateUrl: 'build/pages/playvideo/playvideo.html',
    directives: [ElasticHeader, YoutubeVideo]
})
export class PlayvideoPage {
    static get parameters() {
        return [
          [IonicApp], [NavController], [Config], [NavParams]
        ]
    }
    constructor(app, nav, config, navParams, platform) {
        this.app = app;
        this.nav = nav;
        this.navParams = navParams;
        this.platform = platform;
        this.config = config;
        this.getmoviedetails = this.navParams.data;

        this.nowdate = new Date();
        this.newdate;

        this.movieselected = [];
        this.loadmoviedet();
        this.loadcomingsoondate();
    }

    loadmoviedet() {
        var movieitems = [];
        var items = {};
        var itemicons = ["people", "chatboxes", "speedometer", "person"];
        var itemdescs = ["Genre", "Language", "Showtime", "Directed by"];
        var j = 0;

        for (var i in this.getmoviedetails.moviedetails) {
            var details = this.getmoviedetails.moviedetails[i];

            if (j < 5) {
                movieitems.push({
                    "item": details,
                    "itemicon": ""
                });
            } else {
                movieitems.push({
                    "item": details,
                    itemicon: itemicons[j - 5],
                    "itemdesc": itemdescs[j - 5]
                });
            }
            j++;
        }

        items.movieitems = movieitems;
        return this.movieselected = movieitems;
    }

    bookticket() {
        this.nav.push(BookticketPage);
    }

    loadcomingsoondate() {
        var monthname = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

        var thedate = this.getmoviedetails.moviedetails.showtime.split(" ");
        var setdate = new Date (thedate[2], monthname.indexOf(thedate[1].toLowerCase()), thedate[0]);

        this.newdate = setdate;
    }

    presentActionSheet() {
            let actionSheet = ActionSheet.create({
                title: 'Share',
                buttons: [{
                    text: 'Facebook',
                    icon: 'social-facebook',
                    style: 'facebook',
                    handler: () => {
                        test('facebook');
                    }
            }, {
                    text: 'Twitter',
                    icon: 'social-twitter',
                    style: 'twitter',
                    handler: () => {
                        console.log('Archive clicked');
                    }
            }, {
                    text: 'Instagram',
                    icon: 'social-instagram',
                    style: 'instagram',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
            }, {
                    text: 'Path',
                    icon: 'social-pinterest',
                    style: 'path',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
            }]
            });
            this.nav.present(actionSheet);
        }
        //
        //    showToast(message, position) {
        //        this.platform.ready().then(() => {
        //            window.plugins.toast.show(message, "short", position);
        //        });
        //    }

//    var test(sharebtn) {
//        //var message = 'Thanks for sharing via '+sharebtn;
//        //window.plugins.toast.show(message, "short", 'bottom');
//        let alert = Alert.create({
//            title: 'On Progress!',
//            subTitle: 'Thanks for sharing via ' + sharebtn,
//            buttons: ['Ok']
//        });
//        console.log(alert);
//        //this.nav.present(alert);
//    }
}
