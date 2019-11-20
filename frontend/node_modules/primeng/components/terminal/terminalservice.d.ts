export declare class TerminalService {
    private commandSource;
    private responseSource;
    commandHandler: import("rxjs/internal/Observable").Observable<string>;
    responseHandler: import("rxjs/internal/Observable").Observable<string>;
    sendCommand(command: string): void;
    sendResponse(response: string): void;
}
