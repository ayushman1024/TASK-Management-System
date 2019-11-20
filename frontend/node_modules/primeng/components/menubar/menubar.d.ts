import { ElementRef, Renderer2, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MenuItem } from '../common/menuitem';
export declare class MenubarSub implements OnDestroy {
    renderer: Renderer2;
    private cd;
    item: MenuItem;
    root: boolean;
    autoDisplay: boolean;
    autoZIndex: boolean;
    baseZIndex: number;
    documentClickListener: any;
    menuClick: boolean;
    menuHoverActive: boolean;
    activeItem: any;
    hideTimeout: any;
    activeMenu: any;
    constructor(renderer: Renderer2, cd: ChangeDetectorRef);
    onItemMenuClick(event: Event, item: HTMLLIElement, menuitem: MenuItem): void;
    bindEventListener(): void;
    onItemMouseEnter(event: Event, item: HTMLLIElement, menuitem: MenuItem): void;
    onItemMouseLeave(event: Event): void;
    itemClick(event: any, item: MenuItem): void;
    listClick(event: any): void;
    ngOnDestroy(): void;
}
export declare class Menubar {
    el: ElementRef;
    renderer: Renderer2;
    model: MenuItem[];
    style: any;
    styleClass: string;
    autoDisplay: boolean;
    autoZIndex: boolean;
    baseZIndex: number;
    constructor(el: ElementRef, renderer: Renderer2);
}
export declare class MenubarModule {
}
