import { ElementRef, OnDestroy, DoCheck, NgZone } from '@angular/core';
export declare class Password implements OnDestroy, DoCheck {
    el: ElementRef;
    zone: NgZone;
    promptLabel: string;
    weakLabel: string;
    mediumLabel: string;
    strongLabel: string;
    feedback: boolean;
    showPassword: boolean;
    panel: HTMLDivElement;
    meter: any;
    info: any;
    filled: boolean;
    constructor(el: ElementRef, zone: NgZone);
    ngDoCheck(): void;
    onInput(e: any): void;
    updateFilledState(): void;
    createPanel(): void;
    onFocus(e: any): void;
    onBlur(e: any): void;
    onKeyup(e: any): void;
    testStrength(str: string): number;
    normalize(x: any, y: any): number;
    readonly disabled: boolean;
    ngOnDestroy(): void;
}
export declare class PasswordModule {
}
