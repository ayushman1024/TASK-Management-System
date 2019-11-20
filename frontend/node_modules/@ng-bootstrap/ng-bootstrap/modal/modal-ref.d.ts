import { ComponentRef } from '@angular/core';
import { NgbModalBackdrop } from './modal-backdrop';
import { NgbModalWindow } from './modal-window';
import { ContentRef } from '../util/popup';
/**
 * A reference to an active (currently opened) modal. Instances of this class
 * can be injected into components passed as modal content.
 */
export declare class NgbActiveModal {
    /**
     * Closes the modal with an optional 'result' value.
     * The 'NgbMobalRef.result' promise will be resolved with provided value.
     */
    close(result?: any): void;
    /**
     * Dismisses the modal with an optional 'reason' value.
     * The 'NgbModalRef.result' promise will be rejected with provided value.
     */
    dismiss(reason?: any): void;
}
/**
 * A reference to a newly opened modal returned by the 'NgbModal.open()' method.
 */
export declare class NgbModalRef {
    private _windowCmptRef;
    private _contentRef;
    private _backdropCmptRef?;
    private _beforeDismiss?;
    private _resolve;
    private _reject;
    /**
     * The instance of component used as modal's content.
     * Undefined when a TemplateRef is used as modal's content.
     */
    readonly componentInstance: any;
    /**
     * A promise that is resolved when the modal is closed and rejected when the modal is dismissed.
     */
    result: Promise<any>;
    constructor(_windowCmptRef: ComponentRef<NgbModalWindow>, _contentRef: ContentRef, _backdropCmptRef?: ComponentRef<NgbModalBackdrop>, _beforeDismiss?: Function);
    /**
     * Closes the modal with an optional 'result' value.
     * The 'NgbMobalRef.result' promise will be resolved with provided value.
     */
    close(result?: any): void;
    private _dismiss;
    /**
     * Dismisses the modal with an optional 'reason' value.
     * The 'NgbModalRef.result' promise will be rejected with provided value.
     */
    dismiss(reason?: any): void;
    private _removeModalElements;
}
