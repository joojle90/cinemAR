import {
    IonicApp, Page, NavController
}
from 'ionic-angular';
import {
    MovieData
}
from '../../providers/movie-data';
import {
    PlayvideoPage
}
from '../playvideo/playvideo';
import {
    UserprofilePage
}
from '../userprofile/userprofile';
import {
    BookticketPage
}
from '../../pages/bookticket/bookticket';
@
Page({
    templateUrl: 'build/pages/nowshowing/nowshowing.html',
    providers: [MovieData]
})
export class NowshowingPage {
    static get parameters() {
        return [
          [IonicApp], [NavController], [MovieData]
        ]
    }
    constructor(app, nav, moviedata) {
        this.app = app;
        this.nav = nav;
        this.moviedata = moviedata;

        moviedata.load();

        this.movielist = [];

        this.loadDataMovie();
    }

    loadDataMovie() {
        var monthname = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

        return this.moviedata.getDataMovie().then(data => {
            this.movielist = data.filter(newdata => {
                var thedate = newdata.moviedet[0].showtime.split(" ");
                var setdate = new Date (thedate[2], monthname.indexOf(thedate[1].toLowerCase()), thedate[0]);
                return setdate < new Date();
            });
        });
    }

    watchtrailer(moviedetail) {
        var trailerlink = `https://www.youtube.com/embed/${moviedetail.trailer}`;
        this.nav.push(PlayvideoPage, {
            trailerlinks: trailerlink,
            moviedetails: moviedetail
        });
    }

    useraccount() {
        this.nav.push(UserprofilePage);
    }

    bookticket(){
        this.nav.push(BookticketPage);
    }

    getARapps() {
        var app = {

        // Url/Path to the augmented reality experience you would like to load
       // arExperienceUrl: "www/experience/index.html",

        arExperienceUrl: "www/world/1_ClientRecognition_1_ImageOnTarget/index.html",

        //cloud recognition continuous scan
        //arExperienceUrl: "www/world/2_CloudRecognition_2_ContinuousRecognitionVsOn-Click/index.html",
        // The features your augmented reality experience requires, only define the ones you really need
        requiredFeatures: ["2d_tracking"],
        // Represents the device capability of launching augmented reality experiences with specific features
        isDeviceSupported: false,
        // Additional startup settings, for now the only setting available is camera_position (back|front)
        startupConfiguration: {
          "camera_position": "back"
        },
        // Application Constructor
        initialize: function () {
          this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function () {
          document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        onDeviceReady: function () {
          app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
          app.wikitudePlugin.isDeviceSupported(app.onDeviceSupported, app.onDeviceNotSupported, app.requiredFeatures);
        },
        // Callback if the device supports all required features
        onDeviceSupported: function () {
          app.wikitudePlugin.loadARchitectWorld(
            app.onARExperienceLoadedSuccessful,
            app.onARExperienceLoadError,
            app.arExperienceUrl,
            app.requiredFeatures,
            app.startupConfiguration
          );
        },
        // Callback if the device does not support all required features
        onDeviceNotSupported: function (errorMessage) {
          alert(errorMessage);
        },
        // Callback if your AR experience loaded successful
        onARExperienceLoadedSuccessful: function (loadedURL) {
          /* Respond to successful augmented reality experience loading if you need to */
        },
        // Callback if your AR experience did not load successful
        onARExperienceLoadError: function (errorMessage) {
          alert('Loading AR web view failed: ' + errorMessage);
        }

      };


      app.initialize();
    }

    //    getpicture() {
    //        this.Camera.getPicture({
    //
    //        }).then(data => {
    //            console.log('Data', data);
    //        }, err => {
    //            alert('Unable to take picture')
    //        })
    //    }
}
