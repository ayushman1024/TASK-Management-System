import { ElementRef } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';
export declare const KEYFILTER_VALIDATOR: any;
export declare class KeyFilter implements Validator {
    el: ElementRef;
    static DEFAULT_MASKS: {
        pint: RegExp;
        'int': RegExp;
        pnum: RegExp;
        money: RegExp;
        num: RegExp;
        hex: RegExp;
        email: RegExp;
        alpha: RegExp;
        alphanum: RegExp;
    };
    static KEYS: {
        TAB: number;
        RETURN: number;
        ESC: number;
        BACKSPACE: number;
        DELETE: number;
    };
    static SAFARI_KEYS: {
        63234: number;
        63235: number;
        63232: number;
        63233: number;
        63276: number;
        63277: number;
        63272: number;
        63273: number;
        63275: number;
    };
    pValidateOnly: boolean;
    regex: RegExp;
    _pattern: any;
    constructor(el: ElementRef);
    pattern: any;
    isNavKeyPress(e: KeyboardEvent): boolean;
    isSpecialKey(e: KeyboardEvent): boolean;
    getKey(e: KeyboardEvent): any;
    getCharCode(e: KeyboardEvent): number;
    onKeyPress(e: KeyboardEvent): void;
    onPaste(e: any): void;
    validate(c: AbstractControl): {
        [key: string]: any;
    };
}
export declare class KeyFilterModule {
}
