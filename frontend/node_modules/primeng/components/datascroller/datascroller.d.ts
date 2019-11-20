import { ElementRef, OnInit, AfterViewInit, OnDestroy, Renderer2, NgZone, EventEmitter, QueryList, TemplateRef } from '@angular/core';
export declare class DataScroller implements OnInit, AfterViewInit, OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    zone: NgZone;
    value: any[];
    rows: number;
    lazy: boolean;
    style: any;
    styleClass: string;
    buffer: number;
    inline: boolean;
    scrollHeight: any;
    loader: any;
    totalRecords: number;
    trackBy: Function;
    header: any;
    footer: any;
    templates: QueryList<any>;
    contentViewChild: ElementRef;
    onLazyLoad: EventEmitter<any>;
    itemTemplate: TemplateRef<any>;
    dataToRender: any[];
    first: number;
    inlineScrollListener: any;
    windowScrollListener: any;
    loaderClickListener: any;
    page: number;
    constructor(el: ElementRef, renderer: Renderer2, zone: NgZone);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    load(): void;
    shouldLoad(): boolean;
    reset(): void;
    isEmpty(): boolean;
    bindScrollListener(): void;
    unbindScrollListener(): void;
    onInlineScroll(): void;
    onWindowScroll(): void;
    ngOnDestroy(): void;
}
export declare class DataScrollerModule {
}
