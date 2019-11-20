import { AfterViewInit, AfterViewChecked, OnDestroy, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
export declare class Sidebar implements AfterViewInit, AfterViewChecked, OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    position: string;
    fullScreen: boolean;
    appendTo: string;
    blockScroll: boolean;
    style: any;
    styleClass: string;
    autoZIndex: boolean;
    baseZIndex: number;
    modal: boolean;
    dismissible: boolean;
    showCloseIcon: boolean;
    containerViewChild: ElementRef;
    onShow: EventEmitter<any>;
    onHide: EventEmitter<any>;
    visibleChange: EventEmitter<any>;
    initialized: boolean;
    _visible: boolean;
    preventVisibleChangePropagation: boolean;
    mask: HTMLDivElement;
    maskClickListener: Function;
    executePostDisplayActions: boolean;
    constructor(el: ElementRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    visible: boolean;
    ngAfterViewChecked(): void;
    show(): void;
    hide(): void;
    close(event: Event): void;
    enableModality(): void;
    disableModality(): void;
    unbindMaskClickListener(): void;
    ngOnDestroy(): void;
}
export declare class SidebarModule {
}
