/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Represent options available when opening new modal windows.
 * @record
 */
export function NgbModalOptions() { }
if (false) {
    /**
     * Sets the aria attribute aria-labelledby to a modal window.
     *
     * \@since 2.2.0
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.ariaLabelledBy;
    /**
     * Whether a backdrop element should be created for a given modal (true by default).
     * Alternatively, specify 'static' for a backdrop which doesn't close the modal on click.
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.backdrop;
    /**
     * Function called when a modal will be dismissed.
     * If this function returns false, the promise is resolved with false or the promise is rejected, the modal is not
     * dismissed.
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.beforeDismiss;
    /**
     * To center the modal vertically (false by default).
     *
     * \@since 1.1.0
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.centered;
    /**
     * An element to which to attach newly opened modal windows.
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.container;
    /**
     * Injector to use for modal content.
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.injector;
    /**
     * Whether to close the modal when escape key is pressed (true by default).
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.keyboard;
    /**
     * Size of a new modal window.
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.size;
    /**
     * Custom class to append to the modal window
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.windowClass;
    /**
     * Custom class to append to the modal backdrop
     *
     * \@since 1.1.0
     * @type {?|undefined}
     */
    NgbModalOptions.prototype.backdropClass;
}
/**
 * Configuration object token for the NgbModal service.
 * You can provide this configuration, typically in your root module in order to provide default option values for every
 * modal.
 *
 * \@since 3.1.0
 */
var NgbModalConfig = /** @class */ (function () {
    function NgbModalConfig() {
        this.backdrop = true;
        this.keyboard = true;
    }
    NgbModalConfig.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ NgbModalConfig.ngInjectableDef = i0.defineInjectable({ factory: function NgbModalConfig_Factory() { return new NgbModalConfig(); }, token: NgbModalConfig, providedIn: "root" });
    return NgbModalConfig;
}());
export { NgbModalConfig };
if (false) {
    /** @type {?} */
    NgbModalConfig.prototype.backdrop;
    /** @type {?} */
    NgbModalConfig.prototype.keyboard;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQVcsTUFBTSxlQUFlLENBQUM7Ozs7OztBQUtuRCxxQ0EyREM7Ozs7Ozs7O0lBckRDLHlDQUF3Qjs7Ozs7O0lBTXhCLG1DQUE4Qjs7Ozs7OztJQU85Qix3Q0FBaUQ7Ozs7Ozs7SUFPakQsbUNBQW1COzs7OztJQUtuQixvQ0FBbUI7Ozs7O0lBS25CLG1DQUFvQjs7Ozs7SUFLcEIsbUNBQW1COzs7OztJQUtuQiwrQkFBbUI7Ozs7O0lBS25CLHNDQUFxQjs7Ozs7OztJQU9yQix3Q0FBdUI7Ozs7Ozs7OztBQVV6QjtJQUFBO1FBRUUsYUFBUSxHQUF1QixJQUFJLENBQUM7UUFDcEMsYUFBUSxHQUFHLElBQUksQ0FBQztLQUNqQjs7Z0JBSkEsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7O3lCQXpFaEM7Q0E2RUMsQUFKRCxJQUlDO1NBSFksY0FBYzs7O0lBQ3pCLGtDQUFvQzs7SUFDcEMsa0NBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3Rvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogUmVwcmVzZW50IG9wdGlvbnMgYXZhaWxhYmxlIHdoZW4gb3BlbmluZyBuZXcgbW9kYWwgd2luZG93cy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JNb2RhbE9wdGlvbnMge1xuICAvKipcbiAgICogU2V0cyB0aGUgYXJpYSBhdHRyaWJ1dGUgYXJpYS1sYWJlbGxlZGJ5IHRvIGEgbW9kYWwgd2luZG93LlxuICAgKlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIGFyaWFMYWJlbGxlZEJ5Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIGEgYmFja2Ryb3AgZWxlbWVudCBzaG91bGQgYmUgY3JlYXRlZCBmb3IgYSBnaXZlbiBtb2RhbCAodHJ1ZSBieSBkZWZhdWx0KS5cbiAgICogQWx0ZXJuYXRpdmVseSwgc3BlY2lmeSAnc3RhdGljJyBmb3IgYSBiYWNrZHJvcCB3aGljaCBkb2Vzbid0IGNsb3NlIHRoZSBtb2RhbCBvbiBjbGljay5cbiAgICovXG4gIGJhY2tkcm9wPzogYm9vbGVhbiB8ICdzdGF0aWMnO1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiBjYWxsZWQgd2hlbiBhIG1vZGFsIHdpbGwgYmUgZGlzbWlzc2VkLlxuICAgKiBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgZmFsc2UsIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggZmFsc2Ugb3IgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQsIHRoZSBtb2RhbCBpcyBub3RcbiAgICogZGlzbWlzc2VkLlxuICAgKi9cbiAgYmVmb3JlRGlzbWlzcz86ICgpID0+IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+O1xuXG4gIC8qKlxuICAgKiBUbyBjZW50ZXIgdGhlIG1vZGFsIHZlcnRpY2FsbHkgKGZhbHNlIGJ5IGRlZmF1bHQpLlxuICAgKlxuICAgKiBAc2luY2UgMS4xLjBcbiAgICovXG4gIGNlbnRlcmVkPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQW4gZWxlbWVudCB0byB3aGljaCB0byBhdHRhY2ggbmV3bHkgb3BlbmVkIG1vZGFsIHdpbmRvd3MuXG4gICAqL1xuICBjb250YWluZXI/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEluamVjdG9yIHRvIHVzZSBmb3IgbW9kYWwgY29udGVudC5cbiAgICovXG4gIGluamVjdG9yPzogSW5qZWN0b3I7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gY2xvc2UgdGhlIG1vZGFsIHdoZW4gZXNjYXBlIGtleSBpcyBwcmVzc2VkICh0cnVlIGJ5IGRlZmF1bHQpLlxuICAgKi9cbiAga2V5Ym9hcmQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTaXplIG9mIGEgbmV3IG1vZGFsIHdpbmRvdy5cbiAgICovXG4gIHNpemU/OiAnc20nIHwgJ2xnJztcblxuICAvKipcbiAgICogQ3VzdG9tIGNsYXNzIHRvIGFwcGVuZCB0byB0aGUgbW9kYWwgd2luZG93XG4gICAqL1xuICB3aW5kb3dDbGFzcz86IHN0cmluZztcblxuICAvKipcbiAgICogQ3VzdG9tIGNsYXNzIHRvIGFwcGVuZCB0byB0aGUgbW9kYWwgYmFja2Ryb3BcbiAgICpcbiAgICogQHNpbmNlIDEuMS4wXG4gICAqL1xuICBiYWNrZHJvcENsYXNzPzogc3RyaW5nO1xufVxuXG4vKipcbiogQ29uZmlndXJhdGlvbiBvYmplY3QgdG9rZW4gZm9yIHRoZSBOZ2JNb2RhbCBzZXJ2aWNlLlxuKiBZb3UgY2FuIHByb3ZpZGUgdGhpcyBjb25maWd1cmF0aW9uLCB0eXBpY2FsbHkgaW4geW91ciByb290IG1vZHVsZSBpbiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgb3B0aW9uIHZhbHVlcyBmb3IgZXZlcnlcbiogbW9kYWwuXG4qXG4qIEBzaW5jZSAzLjEuMFxuKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsQ29uZmlnIGltcGxlbWVudHMgTmdiTW9kYWxPcHRpb25zIHtcbiAgYmFja2Ryb3A6IGJvb2xlYW4gfCAnc3RhdGljJyA9IHRydWU7XG4gIGtleWJvYXJkID0gdHJ1ZTtcbn1cbiJdfQ==