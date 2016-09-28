import {
    Page, NavController, Config, NavParams, Events
}
from 'ionic-angular';
import {
    UserData
}
from '../../providers/user-data';


@
Page({
    templateUrl: 'build/pages/userprofile/userprofile.html',
    providers: [UserData],
    config: {}
})
export class UserprofilePage {
    static get parameters() {
        return [
          [NavController], [NavParams], [UserData], [Events]
        ]
    }

    constructor(nav, navParams, userData, events) {
        this.nav = nav;
        this.navParams = navParams;

        this.userData = userData;

        this.items = [];
        this.info = {};
        this.status = null;
        var lastIndex;

        this.viewUseraccnt();

    }

    viewUseraccnt() {
        return this.userData.getUserData().then((detail) => {
            this.items = JSON.parse(detail) || [];
            lastIndex = this.items.length;
            if (lastIndex === 0) {
                this.status = "adduser";
                this.info = {
                    title: '',
                    description: ''
                };
            } else {
                this.status = "update";
                this.info = this.items[lastIndex - 1];
            }
        });
    }

    saveUser() {
        if (!this.info.title && !this.info.description) {
            return false;
        }
        let info = this.info;
        if (this.status === "adduser") {
            this.saveUserItem(info);
        } else {
            this.updateUserItem(info, lastIndex - 1);
        }
        this.nav.pop();
    }

    saveUserItem(item) {
        this.items.push(item);
        this.userData.save(item);
    }

    updateUserItem(item, index) {
        this.items[index] = item;
        this.userData.update(item, index);
    }
}
