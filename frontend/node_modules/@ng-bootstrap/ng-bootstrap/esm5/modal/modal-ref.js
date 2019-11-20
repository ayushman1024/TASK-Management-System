/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A reference to an active (currently opened) modal. Instances of this class
 * can be injected into components passed as modal content.
 */
var /**
 * A reference to an active (currently opened) modal. Instances of this class
 * can be injected into components passed as modal content.
 */
NgbActiveModal = /** @class */ (function () {
    function NgbActiveModal() {
    }
    /**
     * Closes the modal with an optional 'result' value.
     * The 'NgbMobalRef.result' promise will be resolved with provided value.
     */
    /**
     * Closes the modal with an optional 'result' value.
     * The 'NgbMobalRef.result' promise will be resolved with provided value.
     * @param {?=} result
     * @return {?}
     */
    NgbActiveModal.prototype.close = /**
     * Closes the modal with an optional 'result' value.
     * The 'NgbMobalRef.result' promise will be resolved with provided value.
     * @param {?=} result
     * @return {?}
     */
    function (result) { };
    /**
     * Dismisses the modal with an optional 'reason' value.
     * The 'NgbModalRef.result' promise will be rejected with provided value.
     */
    /**
     * Dismisses the modal with an optional 'reason' value.
     * The 'NgbModalRef.result' promise will be rejected with provided value.
     * @param {?=} reason
     * @return {?}
     */
    NgbActiveModal.prototype.dismiss = /**
     * Dismisses the modal with an optional 'reason' value.
     * The 'NgbModalRef.result' promise will be rejected with provided value.
     * @param {?=} reason
     * @return {?}
     */
    function (reason) { };
    return NgbActiveModal;
}());
/**
 * A reference to an active (currently opened) modal. Instances of this class
 * can be injected into components passed as modal content.
 */
export { NgbActiveModal };
/**
 * A reference to a newly opened modal returned by the 'NgbModal.open()' method.
 */
var /**
 * A reference to a newly opened modal returned by the 'NgbModal.open()' method.
 */
NgbModalRef = /** @class */ (function () {
    function NgbModalRef(_windowCmptRef, _contentRef, _backdropCmptRef, _beforeDismiss) {
        var _this = this;
        this._windowCmptRef = _windowCmptRef;
        this._contentRef = _contentRef;
        this._backdropCmptRef = _backdropCmptRef;
        this._beforeDismiss = _beforeDismiss;
        _windowCmptRef.instance.dismissEvent.subscribe(function (reason) { _this.dismiss(reason); });
        this.result = new Promise(function (resolve, reject) {
            _this._resolve = resolve;
            _this._reject = reject;
        });
        this.result.then(null, function () { });
    }
    Object.defineProperty(NgbModalRef.prototype, "componentInstance", {
        /**
         * The instance of component used as modal's content.
         * Undefined when a TemplateRef is used as modal's content.
         */
        get: /**
         * The instance of component used as modal's content.
         * Undefined when a TemplateRef is used as modal's content.
         * @return {?}
         */
        function () {
            if (this._contentRef.componentRef) {
                return this._contentRef.componentRef.instance;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Closes the modal with an optional 'result' value.
     * The 'NgbMobalRef.result' promise will be resolved with provided value.
     */
    /**
     * Closes the modal with an optional 'result' value.
     * The 'NgbMobalRef.result' promise will be resolved with provided value.
     * @param {?=} result
     * @return {?}
     */
    NgbModalRef.prototype.close = /**
     * Closes the modal with an optional 'result' value.
     * The 'NgbMobalRef.result' promise will be resolved with provided value.
     * @param {?=} result
     * @return {?}
     */
    function (result) {
        if (this._windowCmptRef) {
            this._resolve(result);
            this._removeModalElements();
        }
    };
    /**
     * @param {?=} reason
     * @return {?}
     */
    NgbModalRef.prototype._dismiss = /**
     * @param {?=} reason
     * @return {?}
     */
    function (reason) {
        this._reject(reason);
        this._removeModalElements();
    };
    /**
     * Dismisses the modal with an optional 'reason' value.
     * The 'NgbModalRef.result' promise will be rejected with provided value.
     */
    /**
     * Dismisses the modal with an optional 'reason' value.
     * The 'NgbModalRef.result' promise will be rejected with provided value.
     * @param {?=} reason
     * @return {?}
     */
    NgbModalRef.prototype.dismiss = /**
     * Dismisses the modal with an optional 'reason' value.
     * The 'NgbModalRef.result' promise will be rejected with provided value.
     * @param {?=} reason
     * @return {?}
     */
    function (reason) {
        var _this = this;
        if (this._windowCmptRef) {
            if (!this._beforeDismiss) {
                this._dismiss(reason);
            }
            else {
                /** @type {?} */
                var dismiss = this._beforeDismiss();
                if (dismiss && dismiss.then) {
                    dismiss.then(function (result) {
                        if (result !== false) {
                            _this._dismiss(reason);
                        }
                    }, function () { });
                }
                else if (dismiss !== false) {
                    this._dismiss(reason);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    NgbModalRef.prototype._removeModalElements = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var windowNativeEl = this._windowCmptRef.location.nativeElement;
        windowNativeEl.parentNode.removeChild(windowNativeEl);
        this._windowCmptRef.destroy();
        if (this._backdropCmptRef) {
            /** @type {?} */
            var backdropNativeEl = this._backdropCmptRef.location.nativeElement;
            backdropNativeEl.parentNode.removeChild(backdropNativeEl);
            this._backdropCmptRef.destroy();
        }
        if (this._contentRef && this._contentRef.viewRef) {
            this._contentRef.viewRef.destroy();
        }
        this._windowCmptRef = null;
        this._backdropCmptRef = null;
        this._contentRef = null;
    };
    return NgbModalRef;
}());
/**
 * A reference to a newly opened modal returned by the 'NgbModal.open()' method.
 */
export { NgbModalRef };
if (false) {
    /** @type {?} */
    NgbModalRef.prototype._resolve;
    /** @type {?} */
    NgbModalRef.prototype._reject;
    /**
     * A promise that is resolved when the modal is closed and rejected when the modal is dismissed.
     * @type {?}
     */
    NgbModalRef.prototype.result;
    /** @type {?} */
    NgbModalRef.prototype._windowCmptRef;
    /** @type {?} */
    NgbModalRef.prototype._contentRef;
    /** @type {?} */
    NgbModalRef.prototype._backdropCmptRef;
    /** @type {?} */
    NgbModalRef.prototype._beforeDismiss;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtcmVmLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC1yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFXQTs7Ozs7SUFBQTtJQVlBLENBQUM7SUFYQzs7O09BR0c7Ozs7Ozs7SUFDSCw4QkFBSzs7Ozs7O0lBQUwsVUFBTSxNQUFZLElBQVMsQ0FBQztJQUU1Qjs7O09BR0c7Ozs7Ozs7SUFDSCxnQ0FBTzs7Ozs7O0lBQVAsVUFBUSxNQUFZLElBQVMsQ0FBQztJQUNoQyxxQkFBQztBQUFELENBQUMsQUFaRCxJQVlDOzs7Ozs7Ozs7QUFLRDs7OztJQW1CRSxxQkFDWSxjQUE0QyxFQUFVLFdBQXVCLEVBQzdFLGdCQUFpRCxFQUFVLGNBQXlCO1FBRmhHLGlCQVVDO1FBVFcsbUJBQWMsR0FBZCxjQUFjLENBQThCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDN0UscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQztRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFXO1FBQzlGLGNBQWMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQVcsSUFBTyxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFM0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3hDLEtBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGNBQU8sQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQXJCRCxzQkFBSSwwQ0FBaUI7UUFKckI7OztXQUdHOzs7Ozs7UUFDSDtZQUNFLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUU7Z0JBQ2pDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO2FBQy9DO1FBQ0gsQ0FBQzs7O09BQUE7SUFtQkQ7OztPQUdHOzs7Ozs7O0lBQ0gsMkJBQUs7Ozs7OztJQUFMLFVBQU0sTUFBWTtRQUNoQixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUM3QjtJQUNILENBQUM7Ozs7O0lBRU8sOEJBQVE7Ozs7SUFBaEIsVUFBaUIsTUFBWTtRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSCw2QkFBTzs7Ozs7O0lBQVAsVUFBUSxNQUFZO1FBQXBCLGlCQW1CQztRQWxCQyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDdkI7aUJBQU07O29CQUNDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNyQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO29CQUMzQixPQUFPLENBQUMsSUFBSSxDQUNSLFVBQUEsTUFBTTt3QkFDSixJQUFJLE1BQU0sS0FBSyxLQUFLLEVBQUU7NEJBQ3BCLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ3ZCO29CQUNILENBQUMsRUFDRCxjQUFPLENBQUMsQ0FBQyxDQUFDO2lCQUNmO3FCQUFNLElBQUksT0FBTyxLQUFLLEtBQUssRUFBRTtvQkFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDdkI7YUFDRjtTQUNGO0lBQ0gsQ0FBQzs7OztJQUVPLDBDQUFvQjs7O0lBQTVCOztZQUNRLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxhQUFhO1FBQ2pFLGNBQWMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFOUIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7O2dCQUNuQixnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLGFBQWE7WUFDckUsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNqQztRQUVELElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNwQztRQUVELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQTNGRCxJQTJGQzs7Ozs7OztJQTFGQywrQkFBeUM7O0lBQ3pDLDhCQUF3Qzs7Ozs7SUFleEMsNkJBQXFCOztJQUdqQixxQ0FBb0Q7O0lBQUUsa0NBQStCOztJQUNyRix1Q0FBeUQ7O0lBQUUscUNBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge05nYk1vZGFsQmFja2Ryb3B9IGZyb20gJy4vbW9kYWwtYmFja2Ryb3AnO1xuaW1wb3J0IHtOZ2JNb2RhbFdpbmRvd30gZnJvbSAnLi9tb2RhbC13aW5kb3cnO1xuXG5pbXBvcnQge0NvbnRlbnRSZWZ9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xuXG4vKipcbiAqIEEgcmVmZXJlbmNlIHRvIGFuIGFjdGl2ZSAoY3VycmVudGx5IG9wZW5lZCkgbW9kYWwuIEluc3RhbmNlcyBvZiB0aGlzIGNsYXNzXG4gKiBjYW4gYmUgaW5qZWN0ZWQgaW50byBjb21wb25lbnRzIHBhc3NlZCBhcyBtb2RhbCBjb250ZW50LlxuICovXG5leHBvcnQgY2xhc3MgTmdiQWN0aXZlTW9kYWwge1xuICAvKipcbiAgICogQ2xvc2VzIHRoZSBtb2RhbCB3aXRoIGFuIG9wdGlvbmFsICdyZXN1bHQnIHZhbHVlLlxuICAgKiBUaGUgJ05nYk1vYmFsUmVmLnJlc3VsdCcgcHJvbWlzZSB3aWxsIGJlIHJlc29sdmVkIHdpdGggcHJvdmlkZWQgdmFsdWUuXG4gICAqL1xuICBjbG9zZShyZXN1bHQ/OiBhbnkpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIERpc21pc3NlcyB0aGUgbW9kYWwgd2l0aCBhbiBvcHRpb25hbCAncmVhc29uJyB2YWx1ZS5cbiAgICogVGhlICdOZ2JNb2RhbFJlZi5yZXN1bHQnIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZCB3aXRoIHByb3ZpZGVkIHZhbHVlLlxuICAgKi9cbiAgZGlzbWlzcyhyZWFzb24/OiBhbnkpOiB2b2lkIHt9XG59XG5cbi8qKlxuICogQSByZWZlcmVuY2UgdG8gYSBuZXdseSBvcGVuZWQgbW9kYWwgcmV0dXJuZWQgYnkgdGhlICdOZ2JNb2RhbC5vcGVuKCknIG1ldGhvZC5cbiAqL1xuZXhwb3J0IGNsYXNzIE5nYk1vZGFsUmVmIHtcbiAgcHJpdmF0ZSBfcmVzb2x2ZTogKHJlc3VsdD86IGFueSkgPT4gdm9pZDtcbiAgcHJpdmF0ZSBfcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBUaGUgaW5zdGFuY2Ugb2YgY29tcG9uZW50IHVzZWQgYXMgbW9kYWwncyBjb250ZW50LlxuICAgKiBVbmRlZmluZWQgd2hlbiBhIFRlbXBsYXRlUmVmIGlzIHVzZWQgYXMgbW9kYWwncyBjb250ZW50LlxuICAgKi9cbiAgZ2V0IGNvbXBvbmVudEluc3RhbmNlKCk6IGFueSB7XG4gICAgaWYgKHRoaXMuX2NvbnRlbnRSZWYuY29tcG9uZW50UmVmKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29udGVudFJlZi5jb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gdGhlIG1vZGFsIGlzIGNsb3NlZCBhbmQgcmVqZWN0ZWQgd2hlbiB0aGUgbW9kYWwgaXMgZGlzbWlzc2VkLlxuICAgKi9cbiAgcmVzdWx0OiBQcm9taXNlPGFueT47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF93aW5kb3dDbXB0UmVmOiBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+LCBwcml2YXRlIF9jb250ZW50UmVmOiBDb250ZW50UmVmLFxuICAgICAgcHJpdmF0ZSBfYmFja2Ryb3BDbXB0UmVmPzogQ29tcG9uZW50UmVmPE5nYk1vZGFsQmFja2Ryb3A+LCBwcml2YXRlIF9iZWZvcmVEaXNtaXNzPzogRnVuY3Rpb24pIHtcbiAgICBfd2luZG93Q21wdFJlZi5pbnN0YW5jZS5kaXNtaXNzRXZlbnQuc3Vic2NyaWJlKChyZWFzb246IGFueSkgPT4geyB0aGlzLmRpc21pc3MocmVhc29uKTsgfSk7XG5cbiAgICB0aGlzLnJlc3VsdCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgdGhpcy5fcmVqZWN0ID0gcmVqZWN0O1xuICAgIH0pO1xuICAgIHRoaXMucmVzdWx0LnRoZW4obnVsbCwgKCkgPT4ge30pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgbW9kYWwgd2l0aCBhbiBvcHRpb25hbCAncmVzdWx0JyB2YWx1ZS5cbiAgICogVGhlICdOZ2JNb2JhbFJlZi5yZXN1bHQnIHByb21pc2Ugd2lsbCBiZSByZXNvbHZlZCB3aXRoIHByb3ZpZGVkIHZhbHVlLlxuICAgKi9cbiAgY2xvc2UocmVzdWx0PzogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3dpbmRvd0NtcHRSZWYpIHtcbiAgICAgIHRoaXMuX3Jlc29sdmUocmVzdWx0KTtcbiAgICAgIHRoaXMuX3JlbW92ZU1vZGFsRWxlbWVudHMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kaXNtaXNzKHJlYXNvbj86IGFueSkge1xuICAgIHRoaXMuX3JlamVjdChyZWFzb24pO1xuICAgIHRoaXMuX3JlbW92ZU1vZGFsRWxlbWVudHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNtaXNzZXMgdGhlIG1vZGFsIHdpdGggYW4gb3B0aW9uYWwgJ3JlYXNvbicgdmFsdWUuXG4gICAqIFRoZSAnTmdiTW9kYWxSZWYucmVzdWx0JyBwcm9taXNlIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aCBwcm92aWRlZCB2YWx1ZS5cbiAgICovXG4gIGRpc21pc3MocmVhc29uPzogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3dpbmRvd0NtcHRSZWYpIHtcbiAgICAgIGlmICghdGhpcy5fYmVmb3JlRGlzbWlzcykge1xuICAgICAgICB0aGlzLl9kaXNtaXNzKHJlYXNvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkaXNtaXNzID0gdGhpcy5fYmVmb3JlRGlzbWlzcygpO1xuICAgICAgICBpZiAoZGlzbWlzcyAmJiBkaXNtaXNzLnRoZW4pIHtcbiAgICAgICAgICBkaXNtaXNzLnRoZW4oXG4gICAgICAgICAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc21pc3MocmVhc29uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICgpID0+IHt9KTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXNtaXNzICE9PSBmYWxzZSkge1xuICAgICAgICAgIHRoaXMuX2Rpc21pc3MocmVhc29uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU1vZGFsRWxlbWVudHMoKSB7XG4gICAgY29uc3Qgd2luZG93TmF0aXZlRWwgPSB0aGlzLl93aW5kb3dDbXB0UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQ7XG4gICAgd2luZG93TmF0aXZlRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh3aW5kb3dOYXRpdmVFbCk7XG4gICAgdGhpcy5fd2luZG93Q21wdFJlZi5kZXN0cm95KCk7XG5cbiAgICBpZiAodGhpcy5fYmFja2Ryb3BDbXB0UmVmKSB7XG4gICAgICBjb25zdCBiYWNrZHJvcE5hdGl2ZUVsID0gdGhpcy5fYmFja2Ryb3BDbXB0UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBiYWNrZHJvcE5hdGl2ZUVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYmFja2Ryb3BOYXRpdmVFbCk7XG4gICAgICB0aGlzLl9iYWNrZHJvcENtcHRSZWYuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9jb250ZW50UmVmICYmIHRoaXMuX2NvbnRlbnRSZWYudmlld1JlZikge1xuICAgICAgdGhpcy5fY29udGVudFJlZi52aWV3UmVmLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICB0aGlzLl93aW5kb3dDbXB0UmVmID0gbnVsbDtcbiAgICB0aGlzLl9iYWNrZHJvcENtcHRSZWYgPSBudWxsO1xuICAgIHRoaXMuX2NvbnRlbnRSZWYgPSBudWxsO1xuICB9XG59XG4iXX0=