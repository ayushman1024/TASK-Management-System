import { ElementRef, OnInit, AfterContentInit, EventEmitter, QueryList, TemplateRef } from '@angular/core';
import { BlockableUI } from '../common/blockableui';
export declare class DataView implements OnInit, AfterContentInit, BlockableUI {
    el: ElementRef;
    layout: string;
    paginator: boolean;
    rows: number;
    totalRecords: number;
    pageLinks: number;
    rowsPerPageOptions: number[];
    paginatorPosition: string;
    alwaysShowPaginator: boolean;
    paginatorDropdownAppendTo: any;
    lazy: boolean;
    emptyMessage: string;
    onLazyLoad: EventEmitter<any>;
    style: any;
    styleClass: string;
    trackBy: Function;
    filterBy: string;
    loading: boolean;
    loadingIcon: string;
    first: number;
    onPage: EventEmitter<any>;
    onSort: EventEmitter<any>;
    header: any;
    footer: any;
    templates: QueryList<any>;
    _value: any[];
    listItemTemplate: TemplateRef<any>;
    gridItemTemplate: TemplateRef<any>;
    itemTemplate: TemplateRef<any>;
    paginatorLeftTemplate: TemplateRef<any>;
    paginatorRightTemplate: TemplateRef<any>;
    filteredValue: any[];
    filterValue: string;
    _sortField: string;
    _sortOrder: number;
    initialized: boolean;
    constructor(el: ElementRef);
    ngOnInit(): void;
    sortField: string;
    sortOrder: number;
    ngAfterContentInit(): void;
    updateItemTemplate(): void;
    value: any[];
    changeLayout(layout: string): void;
    updateTotalRecords(): void;
    paginate(event: any): void;
    sort(): void;
    isEmpty(): boolean;
    createLazyLoadMetadata(): any;
    getBlockableElement(): HTMLElement;
    filter(filter: string): void;
    hasFilter(): boolean;
}
export declare class DataViewLayoutOptions {
    dv: DataView;
    style: any;
    styleClass: string;
    constructor(dv: DataView);
    changeLayout(event: Event, layout: string): void;
}
export declare class DataViewModule {
}
