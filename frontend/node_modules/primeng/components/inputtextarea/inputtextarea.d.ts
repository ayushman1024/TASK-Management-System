import { ElementRef, DoCheck, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
export declare class InputTextarea implements DoCheck {
    el: ElementRef;
    ngModel: NgModel;
    autoResize: boolean;
    onResize: EventEmitter<any>;
    filled: boolean;
    cachedScrollHeight: number;
    constructor(el: ElementRef, ngModel: NgModel);
    ngDoCheck(): void;
    onInput(e: any): void;
    updateFilledState(): void;
    onFocus(e: any): void;
    onBlur(e: any): void;
    resize(event?: Event): void;
}
export declare class InputTextareaModule {
}
