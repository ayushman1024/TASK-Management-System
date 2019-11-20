import { ElementRef, AfterViewChecked, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
export declare class Galleria implements AfterViewChecked, AfterViewInit, OnDestroy {
    el: ElementRef;
    style: any;
    styleClass: string;
    panelWidth: number;
    panelHeight: number;
    frameWidth: number;
    frameHeight: number;
    activeIndex: number;
    showFilmstrip: boolean;
    autoPlay: boolean;
    transitionInterval: number;
    showCaption: boolean;
    effectDuration: number;
    onImageClicked: EventEmitter<{}>;
    onImageChange: EventEmitter<{}>;
    _images: any[];
    slideshowActive: boolean;
    container: any;
    panelWrapper: any;
    panels: any;
    caption: any;
    stripWrapper: any;
    strip: any;
    frames: any;
    interval: any;
    stripLeft: number;
    imagesChanged: boolean;
    initialized: boolean;
    constructor(el: ElementRef);
    ngAfterViewChecked(): void;
    images: any[];
    ngAfterViewInit(): void;
    render(): void;
    startSlideshow(): void;
    stopSlideshow(): void;
    clickNavRight(): void;
    clickNavLeft(): void;
    frameClick(frame: any): void;
    prev(): void;
    next(): void;
    select(index: any, reposition: any): void;
    clickImage(event: any, image: any, i: any): void;
    ngOnDestroy(): void;
}
export declare class GalleriaModule {
}
