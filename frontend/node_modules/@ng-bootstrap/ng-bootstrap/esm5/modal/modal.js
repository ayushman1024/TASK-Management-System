/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Injector, ComponentFactoryResolver } from '@angular/core';
import { NgbModalConfig } from './modal-config';
import { NgbModalStack } from './modal-stack';
import * as i0 from "@angular/core";
import * as i1 from "./modal-stack";
import * as i2 from "./modal-config";
/**
 * A service to open modal windows. Creating a modal is straightforward: create a template and pass it as an argument to
 * the "open" method!
 */
var NgbModal = /** @class */ (function () {
    function NgbModal(_moduleCFR, _injector, _modalStack, _config) {
        this._moduleCFR = _moduleCFR;
        this._injector = _injector;
        this._modalStack = _modalStack;
        this._config = _config;
    }
    /**
     * Opens a new modal window with the specified content and using supplied options. Content can be provided
     * as a TemplateRef or a component type. If you pass a component type as content, then instances of those
     * components can be injected with an instance of the NgbActiveModal class. You can use methods on the
     * NgbActiveModal class to close / dismiss modals from "inside" of a component.
     */
    /**
     * Opens a new modal window with the specified content and using supplied options. Content can be provided
     * as a TemplateRef or a component type. If you pass a component type as content, then instances of those
     * components can be injected with an instance of the NgbActiveModal class. You can use methods on the
     * NgbActiveModal class to close / dismiss modals from "inside" of a component.
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    NgbModal.prototype.open = /**
     * Opens a new modal window with the specified content and using supplied options. Content can be provided
     * as a TemplateRef or a component type. If you pass a component type as content, then instances of those
     * components can be injected with an instance of the NgbActiveModal class. You can use methods on the
     * NgbActiveModal class to close / dismiss modals from "inside" of a component.
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    function (content, options) {
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var combinedOptions = Object.assign({}, this._config, options);
        return this._modalStack.open(this._moduleCFR, this._injector, content, combinedOptions);
    };
    /**
     * Dismiss all currently displayed modal windows with the supplied reason.
     *
     * @since 3.1.0
     */
    /**
     * Dismiss all currently displayed modal windows with the supplied reason.
     *
     * \@since 3.1.0
     * @param {?=} reason
     * @return {?}
     */
    NgbModal.prototype.dismissAll = /**
     * Dismiss all currently displayed modal windows with the supplied reason.
     *
     * \@since 3.1.0
     * @param {?=} reason
     * @return {?}
     */
    function (reason) { this._modalStack.dismissAll(reason); };
    /**
     * Indicates if there are currently any open modal windows in the application.
     *
     * @since 3.3.0
     */
    /**
     * Indicates if there are currently any open modal windows in the application.
     *
     * \@since 3.3.0
     * @return {?}
     */
    NgbModal.prototype.hasOpenModals = /**
     * Indicates if there are currently any open modal windows in the application.
     *
     * \@since 3.3.0
     * @return {?}
     */
    function () { return this._modalStack.hasOpenModals(); };
    NgbModal.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    NgbModal.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: Injector },
        { type: NgbModalStack },
        { type: NgbModalConfig }
    ]; };
    /** @nocollapse */ NgbModal.ngInjectableDef = i0.defineInjectable({ factory: function NgbModal_Factory() { return new NgbModal(i0.inject(i0.ComponentFactoryResolver), i0.inject(i0.INJECTOR), i0.inject(i1.NgbModalStack), i0.inject(i2.NgbModalConfig)); }, token: NgbModal, providedIn: "root" });
    return NgbModal;
}());
export { NgbModal };
if (false) {
    /** @type {?} */
    NgbModal.prototype._moduleCFR;
    /** @type {?} */
    NgbModal.prototype._injector;
    /** @type {?} */
    NgbModal.prototype._modalStack;
    /** @type {?} */
    NgbModal.prototype._config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbIm1vZGFsL21vZGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU3RSxPQUFPLEVBQWtCLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRS9ELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0FBTTVDO0lBRUUsa0JBQ1ksVUFBb0MsRUFBVSxTQUFtQixFQUFVLFdBQTBCLEVBQ3JHLE9BQXVCO1FBRHZCLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFlO1FBQ3JHLFlBQU8sR0FBUCxPQUFPLENBQWdCO0lBQUcsQ0FBQztJQUV2Qzs7Ozs7T0FLRzs7Ozs7Ozs7OztJQUNILHVCQUFJOzs7Ozs7Ozs7SUFBSixVQUFLLE9BQVksRUFBRSxPQUE2QjtRQUE3Qix3QkFBQSxFQUFBLFlBQTZCOztZQUN4QyxlQUFlLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7UUFDaEUsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7OztJQUNILDZCQUFVOzs7Ozs7O0lBQVYsVUFBVyxNQUFZLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWpFOzs7O09BSUc7Ozs7Ozs7SUFDSCxnQ0FBYTs7Ozs7O0lBQWIsY0FBMkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Z0JBN0J0RSxVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7O2dCQVZGLHdCQUF3QjtnQkFBbEMsUUFBUTtnQkFJcEIsYUFBYTtnQkFGSSxjQUFjOzs7bUJBRnZDO0NBd0NDLEFBOUJELElBOEJDO1NBN0JZLFFBQVE7OztJQUVmLDhCQUE0Qzs7SUFBRSw2QkFBMkI7O0lBQUUsK0JBQWtDOztJQUM3RywyQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIEluamVjdG9yLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge05nYk1vZGFsT3B0aW9ucywgTmdiTW9kYWxDb25maWd9IGZyb20gJy4vbW9kYWwtY29uZmlnJztcbmltcG9ydCB7TmdiTW9kYWxSZWZ9IGZyb20gJy4vbW9kYWwtcmVmJztcbmltcG9ydCB7TmdiTW9kYWxTdGFja30gZnJvbSAnLi9tb2RhbC1zdGFjayc7XG5cbi8qKlxuICogQSBzZXJ2aWNlIHRvIG9wZW4gbW9kYWwgd2luZG93cy4gQ3JlYXRpbmcgYSBtb2RhbCBpcyBzdHJhaWdodGZvcndhcmQ6IGNyZWF0ZSBhIHRlbXBsYXRlIGFuZCBwYXNzIGl0IGFzIGFuIGFyZ3VtZW50IHRvXG4gKiB0aGUgXCJvcGVuXCIgbWV0aG9kIVxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfbW9kdWxlQ0ZSOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBfbW9kYWxTdGFjazogTmdiTW9kYWxTdGFjayxcbiAgICAgIHByaXZhdGUgX2NvbmZpZzogTmdiTW9kYWxDb25maWcpIHt9XG5cbiAgLyoqXG4gICAqIE9wZW5zIGEgbmV3IG1vZGFsIHdpbmRvdyB3aXRoIHRoZSBzcGVjaWZpZWQgY29udGVudCBhbmQgdXNpbmcgc3VwcGxpZWQgb3B0aW9ucy4gQ29udGVudCBjYW4gYmUgcHJvdmlkZWRcbiAgICogYXMgYSBUZW1wbGF0ZVJlZiBvciBhIGNvbXBvbmVudCB0eXBlLiBJZiB5b3UgcGFzcyBhIGNvbXBvbmVudCB0eXBlIGFzIGNvbnRlbnQsIHRoZW4gaW5zdGFuY2VzIG9mIHRob3NlXG4gICAqIGNvbXBvbmVudHMgY2FuIGJlIGluamVjdGVkIHdpdGggYW4gaW5zdGFuY2Ugb2YgdGhlIE5nYkFjdGl2ZU1vZGFsIGNsYXNzLiBZb3UgY2FuIHVzZSBtZXRob2RzIG9uIHRoZVxuICAgKiBOZ2JBY3RpdmVNb2RhbCBjbGFzcyB0byBjbG9zZSAvIGRpc21pc3MgbW9kYWxzIGZyb20gXCJpbnNpZGVcIiBvZiBhIGNvbXBvbmVudC5cbiAgICovXG4gIG9wZW4oY29udGVudDogYW55LCBvcHRpb25zOiBOZ2JNb2RhbE9wdGlvbnMgPSB7fSk6IE5nYk1vZGFsUmVmIHtcbiAgICBjb25zdCBjb21iaW5lZE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9jb25maWcsIG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLl9tb2RhbFN0YWNrLm9wZW4odGhpcy5fbW9kdWxlQ0ZSLCB0aGlzLl9pbmplY3RvciwgY29udGVudCwgY29tYmluZWRPcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNtaXNzIGFsbCBjdXJyZW50bHkgZGlzcGxheWVkIG1vZGFsIHdpbmRvd3Mgd2l0aCB0aGUgc3VwcGxpZWQgcmVhc29uLlxuICAgKlxuICAgKiBAc2luY2UgMy4xLjBcbiAgICovXG4gIGRpc21pc3NBbGwocmVhc29uPzogYW55KSB7IHRoaXMuX21vZGFsU3RhY2suZGlzbWlzc0FsbChyZWFzb24pOyB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGVyZSBhcmUgY3VycmVudGx5IGFueSBvcGVuIG1vZGFsIHdpbmRvd3MgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICAgKlxuICAgKiBAc2luY2UgMy4zLjBcbiAgICovXG4gIGhhc09wZW5Nb2RhbHMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9tb2RhbFN0YWNrLmhhc09wZW5Nb2RhbHMoKTsgfVxufVxuIl19