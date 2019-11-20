import { Confirmation } from './confirmation';
export declare class ConfirmationService {
    private requireConfirmationSource;
    private acceptConfirmationSource;
    requireConfirmation$: import("rxjs/internal/Observable").Observable<Confirmation>;
    accept: import("rxjs/internal/Observable").Observable<Confirmation>;
    confirm(confirmation: Confirmation): this;
    onAccept(): void;
}
