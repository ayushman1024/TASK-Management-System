import { ElementRef, OnDestroy, EventEmitter, Renderer2 } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { MenuItem } from '../common/menuitem';
export declare class MenuItemContent {
    menu: Menu;
    item: MenuItem;
    constructor(menu: Menu);
}
export declare class Menu implements OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    model: MenuItem[];
    popup: boolean;
    style: any;
    styleClass: string;
    appendTo: any;
    autoZIndex: boolean;
    baseZIndex: number;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    containerViewChild: ElementRef;
    onShow: EventEmitter<any>;
    onHide: EventEmitter<any>;
    container: HTMLDivElement;
    documentClickListener: any;
    documentResizeListener: any;
    preventDocumentDefault: boolean;
    target: any;
    visible: boolean;
    constructor(el: ElementRef, renderer: Renderer2);
    toggle(event: any): void;
    show(event: any): void;
    onOverlayAnimationStart(event: AnimationEvent): void;
    appendOverlay(): void;
    restoreOverlayAppend(): void;
    moveOnTop(): void;
    hide(): void;
    onWindowResize(): void;
    itemClick(event: any, item: MenuItem): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    bindDocumentResizeListener(): void;
    unbindDocumentResizeListener(): void;
    onOverlayHide(): void;
    ngOnDestroy(): void;
    hasSubMenu(): boolean;
}
export declare class MenuModule {
}
