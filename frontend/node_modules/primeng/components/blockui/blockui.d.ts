import { AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
export declare class BlockUI implements AfterViewInit, OnDestroy {
    el: ElementRef;
    target: any;
    autoZIndex: boolean;
    baseZIndex: number;
    mask: ElementRef;
    _blocked: boolean;
    constructor(el: ElementRef);
    blocked: boolean;
    ngAfterViewInit(): void;
    block(): void;
    unblock(): void;
    ngOnDestroy(): void;
}
export declare class BlockUIModule {
}
