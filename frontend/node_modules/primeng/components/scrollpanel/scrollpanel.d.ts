import { AfterViewInit, OnDestroy, ElementRef, NgZone } from '@angular/core';
export declare class ScrollPanel implements AfterViewInit, OnDestroy {
    el: ElementRef;
    zone: NgZone;
    style: any;
    styleClass: string;
    constructor(el: ElementRef, zone: NgZone);
    containerViewChild: ElementRef;
    contentViewChild: ElementRef;
    xBarViewChild: ElementRef;
    yBarViewChild: ElementRef;
    scrollYRatio: number;
    scrollXRatio: number;
    timeoutFrame: any;
    initialized: boolean;
    lastPageY: number;
    lastPageX: number;
    isXBarClicked: boolean;
    isYBarClicked: boolean;
    ngAfterViewInit(): void;
    calculateContainerHeight(): void;
    moveBar(): void;
    onYBarMouseDown(e: MouseEvent): void;
    onXBarMouseDown(e: MouseEvent): void;
    onDocumentMouseMove(e: MouseEvent): void;
    onMouseMoveForXBar(e: MouseEvent): void;
    onMouseMoveForYBar(e: MouseEvent): void;
    scrollTop(scrollTop: number): void;
    onDocumentMouseUp(e: Event): void;
    requestAnimationFrame(f: Function): void;
    ngOnDestroy(): void;
    refresh(): void;
}
export declare class ScrollPanelModule {
}
