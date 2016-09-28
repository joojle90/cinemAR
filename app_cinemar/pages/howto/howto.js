import {
    Page, NavController, MenuController
}
from 'ionic-angular';
import {
    TabsPage
}
from '../tabs/tabs';

/*
  Generated class for the HowtoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@
Page({
    templateUrl: 'build/pages/howto/howto.html',
})
export class HowtoPage {
    static get parameters() {
        return [
          [NavController], [MenuController]
        ]
    }
    constructor(nav, menu) {
        this.nav = nav;

        this.slides = [
            {
                title: "Welcome to <b>ICA</b>",
                description: "The <b>Ionic Conference App</b> is a practical preview of the Ionic Framework in action, and a demonstration of proper code use.",
                image: "img/ica-slidebox-img-1.png",
      },
            {
                title: "What is Ionic?",
                description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
                image: "img/ica-slidebox-img-2.png",
      },
            {
                title: " What is Ionic Platform?",
                description: "The <b>Ionic Platform</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
                image: "img/ica-slidebox-img-3.png",
      }
    ];
    }

    startApp() {
        this.nav.push(TabsPage);
    }

    onPageDidEnter() {
        // the left menu should be disabled on the tutorial page
        this.menu.enable(false);
    }

    onPageDidLeave() {
        // enable the left menu when leaving the tutorial page
        this.menu.enable(true);
    }
}
