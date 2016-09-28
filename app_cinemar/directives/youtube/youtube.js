import {
    Directive, ElementRef
}
from '@angular/core';

@
Directive({
    selector: '[youtube-video]'
})
export class YoutubeVideo {
    static get parameters() {
        return [
          [ElementRef]
        ]
    }

    constructor(element) {

        var me = this;
        this.element = element;

        console.log(document);

    }

}
