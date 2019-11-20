import { ElementRef } from '@angular/core';
import { BlockableUI } from '../common/blockableui';
export declare class Toolbar implements BlockableUI {
    private el;
    style: any;
    styleClass: string;
    constructor(el: ElementRef);
    getBlockableElement(): HTMLElement;
}
export declare class ToolbarModule {
}
