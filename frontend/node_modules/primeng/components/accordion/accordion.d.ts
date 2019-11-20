import { ElementRef, AfterContentInit, OnDestroy, EventEmitter, QueryList, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { Header } from '../common/shared';
import { BlockableUI } from '../common/blockableui';
import { Subscription } from 'rxjs';
export declare class AccordionTab implements OnDestroy {
    accordion: Accordion;
    header: string;
    selected: boolean;
    disabled: boolean;
    cache: boolean;
    selectedChange: EventEmitter<any>;
    transitionOptions: string;
    headerFacet: QueryList<Header>;
    templates: QueryList<any>;
    animating: boolean;
    contentTemplate: TemplateRef<any>;
    id: string;
    loaded: boolean;
    constructor(accordion: Accordion);
    ngAfterContentInit(): void;
    toggle(event: any): boolean;
    findTabIndex(): number;
    readonly hasHeaderFacet: boolean;
    onToggleDone(event: Event): void;
    onKeydown(event: KeyboardEvent): void;
    ngOnDestroy(): void;
}
export declare class Accordion implements BlockableUI, AfterContentInit, OnDestroy {
    el: ElementRef;
    changeDetector: ChangeDetectorRef;
    multiple: boolean;
    onClose: EventEmitter<any>;
    onOpen: EventEmitter<any>;
    style: any;
    styleClass: string;
    expandIcon: string;
    collapseIcon: string;
    tabList: QueryList<AccordionTab>;
    tabListSubscription: Subscription;
    private _activeIndex;
    tabs: AccordionTab[];
    constructor(el: ElementRef, changeDetector: ChangeDetectorRef);
    ngAfterContentInit(): void;
    initTabs(): any;
    getBlockableElement(): HTMLElement;
    activeIndex: any;
    updateSelectionState(): void;
    ngOnDestroy(): void;
}
export declare class AccordionModule {
}
