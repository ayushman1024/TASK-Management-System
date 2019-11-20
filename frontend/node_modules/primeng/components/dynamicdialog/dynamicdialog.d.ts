import { Type, ComponentFactoryResolver, OnDestroy, ComponentRef, AfterViewInit, ChangeDetectorRef, Renderer2, NgZone, ElementRef } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { DynamicDialogContent } from './dynamicdialogcontent';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';
export declare class DynamicDialogComponent implements AfterViewInit, OnDestroy {
    private componentFactoryResolver;
    private cd;
    renderer: Renderer2;
    config: DynamicDialogConfig;
    private dialogRef;
    zone: NgZone;
    visible: boolean;
    componentRef: ComponentRef<any>;
    mask: HTMLDivElement;
    insertionPoint: DynamicDialogContent;
    maskViewChild: ElementRef;
    childComponentType: Type<any>;
    container: HTMLDivElement;
    documentEscapeListener: Function;
    constructor(componentFactoryResolver: ComponentFactoryResolver, cd: ChangeDetectorRef, renderer: Renderer2, config: DynamicDialogConfig, dialogRef: DynamicDialogRef, zone: NgZone);
    ngAfterViewInit(): void;
    onOverlayClicked(evt: MouseEvent): void;
    onDialogClicked(evt: MouseEvent): void;
    loadChildComponent(componentType: Type<any>): void;
    moveOnTop(): void;
    onAnimationStart(event: AnimationEvent): void;
    onAnimationEnd(event: AnimationEvent): void;
    onContainerDestroy(): void;
    close(): void;
    onMaskClick(): void;
    bindGlobalListeners(): void;
    unbindGlobalListeners(): void;
    bindDocumentEscapeListener(): void;
    unbindDocumentEscapeListener(): void;
    ngOnDestroy(): void;
}
export declare class DynamicDialogModule {
}
