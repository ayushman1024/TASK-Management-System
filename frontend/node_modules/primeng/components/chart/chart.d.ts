import { ElementRef, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
export declare class UIChart implements AfterViewInit, OnDestroy {
    el: ElementRef;
    type: string;
    options: any;
    plugins: any[];
    width: string;
    height: string;
    responsive: boolean;
    onDataSelect: EventEmitter<any>;
    initialized: boolean;
    _data: any;
    chart: any;
    constructor(el: ElementRef);
    data: any;
    ngAfterViewInit(): void;
    onCanvasClick(event: any): void;
    initChart(): void;
    getCanvas(): any;
    getBase64Image(): any;
    generateLegend(): any;
    refresh(): void;
    reinit(): void;
    ngOnDestroy(): void;
}
export declare class ChartModule {
}
