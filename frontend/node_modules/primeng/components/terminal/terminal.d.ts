import { AfterViewInit, AfterViewChecked, OnDestroy, ElementRef } from '@angular/core';
import { TerminalService } from './terminalservice';
import { Subscription } from 'rxjs';
export declare class Terminal implements AfterViewInit, AfterViewChecked, OnDestroy {
    el: ElementRef;
    terminalService: TerminalService;
    welcomeMessage: string;
    prompt: string;
    style: any;
    styleClass: string;
    commands: any[];
    command: string;
    container: Element;
    commandProcessed: boolean;
    subscription: Subscription;
    constructor(el: ElementRef, terminalService: TerminalService);
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    response: string;
    handleCommand(event: KeyboardEvent): void;
    focus(element: HTMLElement): void;
    ngOnDestroy(): void;
}
export declare class TerminalModule {
}
