import { ElementRef, AfterViewInit, DoCheck, OnDestroy, EventEmitter, IterableDiffers, NgZone } from '@angular/core';
import { Message } from '../common/message';
import { MessageService } from '../common/messageservice';
import { Subscription } from 'rxjs';
export declare class Growl implements AfterViewInit, DoCheck, OnDestroy {
    el: ElementRef;
    differs: IterableDiffers;
    messageService: MessageService;
    private zone;
    life: number;
    style: any;
    styleClass: string;
    immutable: boolean;
    autoZIndex: boolean;
    baseZIndex: number;
    key: string;
    onClick: EventEmitter<any>;
    onHover: EventEmitter<any>;
    onClose: EventEmitter<any>;
    valueChange: EventEmitter<Message[]>;
    containerViewChild: ElementRef;
    _sticky: boolean;
    _value: Message[];
    timeout: any;
    preventRerender: boolean;
    differ: any;
    subscription: Subscription;
    closeIconClick: boolean;
    constructor(el: ElementRef, differs: IterableDiffers, messageService: MessageService, zone: NgZone);
    ngAfterViewInit(): void;
    value: Message[];
    sticky: boolean;
    ngDoCheck(): void;
    handleValueChange(): void;
    initTimeout(): void;
    remove(index: number, msgel: any): void;
    removeAll(): void;
    onMessageClick(i: number): void;
    onMessageHover(i: number): void;
    ngOnDestroy(): void;
}
export declare class GrowlModule {
}
