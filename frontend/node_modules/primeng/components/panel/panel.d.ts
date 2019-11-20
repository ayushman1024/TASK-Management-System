import { EventEmitter, ElementRef } from '@angular/core';
import { BlockableUI } from '../common/blockableui';
export declare class Panel implements BlockableUI {
    private el;
    toggleable: boolean;
    header: string;
    collapsed: boolean;
    style: any;
    styleClass: string;
    expandIcon: string;
    collapseIcon: string;
    showHeader: boolean;
    toggler: string;
    collapsedChange: EventEmitter<any>;
    onBeforeToggle: EventEmitter<any>;
    onAfterToggle: EventEmitter<any>;
    transitionOptions: string;
    footerFacet: any;
    animating: boolean;
    id: string;
    constructor(el: ElementRef);
    onHeaderClick(event: Event): void;
    onIconClick(event: Event): void;
    toggle(event: Event): boolean;
    expand(event: any): void;
    collapse(event: any): void;
    getBlockableElement(): HTMLElement;
    onToggleDone(event: Event): void;
}
export declare class PanelModule {
}
