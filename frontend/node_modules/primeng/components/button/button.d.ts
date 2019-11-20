import { ElementRef, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
export declare class ButtonDirective implements AfterViewInit, OnDestroy {
    el: ElementRef;
    iconPos: string;
    cornerStyleClass: string;
    _label: string;
    _icon: string;
    initialized: boolean;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    getStyleClass(): string;
    label: string;
    icon: string;
    ngOnDestroy(): void;
}
export declare class Button {
    type: string;
    iconPos: string;
    icon: string;
    label: string;
    disabled: boolean;
    style: any;
    styleClass: string;
    onClick: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
}
export declare class ButtonModule {
}
