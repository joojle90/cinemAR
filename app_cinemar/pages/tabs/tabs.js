import {
    Page, NavController
}
from 'ionic-angular';
import {
    NowshowingPage
}
from '../nowshowing/nowshowing';
import {
    TophitsPage
}
from '../tophits/tophits';
import {
    CategoryPage
}
from '../category/category';

/*
  Generated class for the TabsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@
Page({
    templateUrl: 'build/pages/tabs/tabs.html',
})
export class TabsPage {
    static get parameters() {
        return [
          [NavController]
        ]
    }
    constructor(nav) {
        this.nav = nav;
        this.tab1Root = NowshowingPage;
        this.tab2Root = TophitsPage;
        this.tab3Root = CategoryPage;
    }
}
