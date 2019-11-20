import { ElementRef, OnDestroy, OnInit, AfterViewChecked } from '@angular/core';
export declare class FullCalendar implements OnDestroy, OnInit, AfterViewChecked {
    el: ElementRef;
    style: any;
    styleClass: string;
    initialized: boolean;
    calendar: any;
    config: any;
    _options: any;
    _events: any[];
    constructor(el: ElementRef);
    ngOnInit(): void;
    ngAfterViewChecked(): void;
    events: any;
    options: any;
    initialize(): void;
    getCalendar(): any;
    ngOnDestroy(): void;
}
export declare class FullCalendarModule {
}
