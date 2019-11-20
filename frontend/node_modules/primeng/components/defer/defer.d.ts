import { ElementRef, AfterViewInit, OnDestroy, TemplateRef, EmbeddedViewRef, ViewContainerRef, Renderer2, EventEmitter } from '@angular/core';
export declare class DeferredLoader implements AfterViewInit, OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    viewContainer: ViewContainerRef;
    onLoad: EventEmitter<any>;
    template: TemplateRef<any>;
    documentScrollListener: Function;
    view: EmbeddedViewRef<any>;
    constructor(el: ElementRef, renderer: Renderer2, viewContainer: ViewContainerRef);
    ngAfterViewInit(): void;
    shouldLoad(): boolean;
    load(): void;
    isLoaded(): boolean;
    ngOnDestroy(): void;
}
export declare class DeferModule {
}
