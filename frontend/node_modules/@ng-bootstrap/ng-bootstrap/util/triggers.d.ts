import { Observable } from 'rxjs';
export declare class Trigger {
    open: string;
    close?: string;
    constructor(open: string, close?: string);
    isManual(): boolean;
}
export declare function parseTriggers(triggers: string, aliases?: {
    'hover': string[];
    'focus': string[];
}): Trigger[];
export declare function observeTriggers(renderer: any, nativeElement: any, triggers: Trigger[], isOpenedFn: () => boolean): Observable<boolean>;
export declare function triggerDelay(openDelay: number, closeDelay: number, isOpenedFn: () => boolean): (input$: Observable<boolean>) => Observable<boolean>;
export declare function listenToTriggers(renderer: any, nativeElement: any, triggers: string, isOpenedFn: () => boolean, openFn: any, closeFn: any, openDelay?: number, closeDelay?: number): () => void;
