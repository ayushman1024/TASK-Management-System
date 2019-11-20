import { Observable } from 'rxjs';
export declare class DynamicDialogRef {
    constructor();
    close(result?: any): void;
    private readonly _onClose;
    onClose: Observable<any>;
}
