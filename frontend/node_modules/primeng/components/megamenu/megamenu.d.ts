import { ElementRef, Renderer2 } from '@angular/core';
import { MenuItem } from '../common/menuitem';
export declare class MegaMenu {
    el: ElementRef;
    renderer: Renderer2;
    model: MenuItem[];
    style: any;
    styleClass: string;
    orientation: string;
    autoZIndex: boolean;
    baseZIndex: number;
    activeItem: any;
    hideTimeout: any;
    constructor(el: ElementRef, renderer: Renderer2);
    onItemMouseEnter(event: any, item: any, menuitem: MenuItem): void;
    onItemMouseLeave(event: any, link: any): void;
    itemClick(event: any, item: MenuItem): void;
    getColumnClass(menuitem: MenuItem): any;
}
export declare class MegaMenuModule {
}
