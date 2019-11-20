import { EventEmitter, TemplateRef, AfterContentInit, QueryList } from '@angular/core';
export declare class Header {
}
export declare class Footer {
}
export declare class PrimeTemplate {
    template: TemplateRef<any>;
    type: string;
    name: string;
    constructor(template: TemplateRef<any>);
    getType(): string;
}
export declare class Column implements AfterContentInit {
    field: string;
    colId: string;
    sortField: string;
    filterField: string;
    header: string;
    footer: string;
    sortable: any;
    editable: boolean;
    filter: boolean;
    filterMatchMode: string;
    filterType: string;
    excludeGlobalFilter: boolean;
    rowspan: number;
    colspan: number;
    scope: string;
    style: any;
    styleClass: string;
    exportable: boolean;
    headerStyle: any;
    headerStyleClass: string;
    bodyStyle: any;
    bodyStyleClass: string;
    footerStyle: any;
    footerStyleClass: string;
    hidden: boolean;
    expander: boolean;
    selectionMode: string;
    filterPlaceholder: string;
    filterMaxlength: number;
    frozen: boolean;
    resizable: boolean;
    sortFunction: EventEmitter<any>;
    templates: QueryList<any>;
    template: TemplateRef<any>;
    headerTemplate: TemplateRef<any>;
    bodyTemplate: TemplateRef<any>;
    footerTemplate: TemplateRef<any>;
    filterTemplate: TemplateRef<any>;
    editorTemplate: TemplateRef<any>;
    ngAfterContentInit(): void;
}
export declare class Row {
    columns: QueryList<Column>;
}
export declare class HeaderColumnGroup {
    frozen: boolean;
    rows: QueryList<any>;
}
export declare class FooterColumnGroup {
    frozen: boolean;
    rows: QueryList<any>;
}
export declare class SharedModule {
}
