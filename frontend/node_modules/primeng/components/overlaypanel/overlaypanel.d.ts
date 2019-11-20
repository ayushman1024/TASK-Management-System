import { OnDestroy, EventEmitter, Renderer2, ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
export declare class OverlayPanel implements OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    private cd;
    private zone;
    dismissable: boolean;
    showCloseIcon: boolean;
    style: any;
    styleClass: string;
    appendTo: any;
    autoZIndex: boolean;
    baseZIndex: number;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    onShow: EventEmitter<any>;
    onHide: EventEmitter<any>;
    container: HTMLDivElement;
    visible: boolean;
    documentClickListener: any;
    target: any;
    willHide: boolean;
    documentResizeListener: any;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef, zone: NgZone);
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    toggle(event: any, target?: any): void;
    show(event: any, target?: any): void;
    hasTargetChanged(event: any, target: any): boolean;
    appendContainer(): void;
    restoreAppend(): void;
    onAnimationStart(event: AnimationEvent): void;
    hide(): void;
    onCloseClick(event: any): void;
    onWindowResize(event: any): void;
    bindDocumentResizeListener(): void;
    unbindDocumentResizeListener(): void;
    onContainerDestroy(): void;
    ngOnDestroy(): void;
}
export declare class OverlayPanelModule {
}
