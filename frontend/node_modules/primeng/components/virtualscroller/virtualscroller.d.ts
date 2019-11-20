import { ElementRef, AfterContentInit, EventEmitter, QueryList, TemplateRef } from '@angular/core';
import { BlockableUI } from '../common/blockableui';
export declare class VirtualScroller implements AfterContentInit, BlockableUI {
    el: ElementRef;
    itemSize: number;
    style: any;
    styleClass: string;
    scrollHeight: any;
    lazy: boolean;
    cache: boolean;
    rows: number;
    first: number;
    trackBy: Function;
    header: any;
    footer: any;
    templates: QueryList<any>;
    viewPortViewChild: ElementRef;
    onLazyLoad: EventEmitter<any>;
    itemTemplate: TemplateRef<any>;
    loadingItemTemplate: TemplateRef<any>;
    _totalRecords: number;
    _value: any[];
    lazyValue: any[];
    page: number;
    constructor(el: ElementRef);
    totalRecords: number;
    value: any[];
    ngAfterContentInit(): void;
    onScrollIndexChange(index: number): void;
    createLazyLoadMetadata(): any;
    getBlockableElement(): HTMLElement;
    scrollTo(index: number): void;
}
export declare class VirtualScrollerModule {
}
