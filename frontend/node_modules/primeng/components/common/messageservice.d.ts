import { Message } from './message';
export declare class MessageService {
    private messageSource;
    private clearSource;
    messageObserver: import("rxjs/internal/Observable").Observable<Message | Message[]>;
    clearObserver: import("rxjs/internal/Observable").Observable<string>;
    add(message: Message): void;
    addAll(messages: Message[]): void;
    clear(key?: string): void;
}
