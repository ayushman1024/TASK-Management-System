import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
export declare function ngbAutoClose(zone: NgZone, document: any, type: boolean | 'inside' | 'outside', close: () => void, closed$: Observable<any>, insideElements: HTMLElement[], ignoreElements?: HTMLElement[]): void;
