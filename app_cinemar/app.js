import {
    ViewChild
}
from '@angular/core';
import {
    App, IonicApp, Config, Platform
}
from 'ionic-angular';
import {
    StatusBar
}
from 'ionic-native';
import {
    MovieData
}
from './providers/movie-data';
import {
    TabsPage
}
from './pages/tabs/tabs';
import {
    NowshowingPage
}
from './pages/nowshowing/nowshowing';
import {
    PlayvideoPage
}
from './pages/playvideo/playvideo';
import {
    PromotionPage
}
from './pages/promotion/promotion';
import {
    FastticketPage
}
from './pages/fastticket/fastticket';
import {
    HowtoPage
}
from './pages/howto/howto';
import {
    CategoryPage
}
from './pages/category/category';
import {
    CinemaPage
}
from './pages/cinema/cinema';
import {
    ComingsoonPage
}
from './pages/comingsoon/comingsoon';
import {
    BookticketPage
}
from './pages/bookticket/bookticket';


@
App({
    templateUrl: 'build/app.html',
    providers: [MovieData],
    config: {
        tabbarPlacement: "top"
    },
    queries: {
        nav: new ViewChild('content')
    }
})
class CinemarApp {
    static get parameters() {
        return [
          [IonicApp], [Config], [MovieData], [Platform]
        ]
    }
    constructor(app, config, movData, platform) {
        this.app = app;
        this.movData = movData;
        this.platform = platform;

        movData.load();

        // We plan to add auth to only show the login page if not logged in
        this.root = TabsPage;

        this.leftsidemenu = [];
        this.leftsidemenu2 = [];

        this.updateleftsidemenu();

        this.platform.ready().then(() => {
            StatusBar.styleDefault();
            document.addEventListener("backbutton", () => {

                let activeVC = this.nav.getActive();
                let page = activeVC.instance;
                if (page instanceof TabsPage) {
                    alert("Hold back button to close app");
                }

            }, false);
        });
    }

    updateleftsidemenu() {
        return this.movData.getLeftsidemenu().then(data => {
            this.leftsidemenu = data;

            var sidemenudata = [];
            var sideitems = {};
            var classcomps = [TabsPage, PromotionPage, BookticketPage, CinemaPage, ComingsoonPage];
            var j = 0;
            var count;

            for (var i in data) {
                for (var s in data[i].submenu) {
                    sidemenudata.push({
                        id: j,
                        classcomp: classcomps[j]
                    });
                    j++;
                }
            }
            sideitems.sidemenudata = sidemenudata;
            this.leftsidemenu2 = sidemenudata;
        });
    }

    openPage(id) {
        console.log(id);
        console.log(this.leftsidemenu2[id - 1].classcomp);
        //let nav = this.app.getComponent('nav');
        this.nav.setRoot(this.leftsidemenu2[id - 1].classcomp);
    }
}
