/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
/**
 * Interface for the redux-devtools-extension API.
 * @record
 */
export function NgxsDevtoolsExtension() { }
if (false) {
    /**
     * @param {?} state
     * @return {?}
     */
    NgxsDevtoolsExtension.prototype.init = function (state) { };
    /**
     * @param {?} action
     * @param {?=} state
     * @return {?}
     */
    NgxsDevtoolsExtension.prototype.send = function (action, state) { };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxsDevtoolsExtension.prototype.subscribe = function (fn) { };
}
/**
 * @record
 */
export function NgxsDevtoolsAction() { }
if (false) {
    /** @type {?} */
    NgxsDevtoolsAction.prototype.type;
    /** @type {?} */
    NgxsDevtoolsAction.prototype.payload;
    /** @type {?} */
    NgxsDevtoolsAction.prototype.state;
    /** @type {?} */
    NgxsDevtoolsAction.prototype.id;
    /** @type {?} */
    NgxsDevtoolsAction.prototype.source;
}
/**
 * @record
 */
export function NgxsDevtoolsOptions() { }
if (false) {
    /**
     * The name of the extension
     * @type {?|undefined}
     */
    NgxsDevtoolsOptions.prototype.name;
    /**
     * Whether the dev tools is enabled or note. Useful for setting during production.
     * @type {?|undefined}
     */
    NgxsDevtoolsOptions.prototype.disabled;
    /**
     * Max number of entiries to keep.
     * @type {?|undefined}
     */
    NgxsDevtoolsOptions.prototype.maxAge;
    /**
     * Reformat actions before sending to dev tools
     * @type {?|undefined}
     */
    NgxsDevtoolsOptions.prototype.actionSanitizer;
    /**
     * Reformat state before sending to devtools
     * @type {?|undefined}
     */
    NgxsDevtoolsOptions.prototype.stateSanitizer;
}
/** @type {?} */
export var NGXS_DEVTOOLS_OPTIONS = new InjectionToken('NGXS_DEVTOOLS_OPTIONS');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ltYm9scy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3hzL2RldnRvb2xzLXBsdWdpbi8iLCJzb3VyY2VzIjpbInNyYy9zeW1ib2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQU0vQywyQ0FJQzs7Ozs7O0lBSEMsNERBQXVCOzs7Ozs7SUFDdkIsb0VBQXFDOzs7OztJQUNyQyw4REFBbUU7Ozs7O0FBR3JFLHdDQU1DOzs7SUFMQyxrQ0FBYTs7SUFDYixxQ0FBYTs7SUFDYixtQ0FBVzs7SUFDWCxnQ0FBVzs7SUFDWCxvQ0FBZTs7Ozs7QUFHakIseUNBeUJDOzs7Ozs7SUFyQkMsbUNBQWM7Ozs7O0lBS2QsdUNBQW1COzs7OztJQUtuQixxQ0FBZ0I7Ozs7O0lBS2hCLDhDQUF3Qzs7Ozs7SUFLeEMsNkNBQXNDOzs7QUFHeEMsTUFBTSxLQUFPLHFCQUFxQixHQUFHLElBQUksY0FBYyxDQUFDLHVCQUF1QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG4vKipcclxuICogSW50ZXJmYWNlIGZvciB0aGUgcmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uIEFQSS5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTmd4c0RldnRvb2xzRXh0ZW5zaW9uIHtcclxuICBpbml0KHN0YXRlOiBhbnkpOiB2b2lkO1xyXG4gIHNlbmQoYWN0aW9uOiBhbnksIHN0YXRlPzogYW55KTogdm9pZDtcclxuICBzdWJzY3JpYmUoZm46IChtZXNzYWdlOiBOZ3hzRGV2dG9vbHNBY3Rpb24pID0+IHZvaWQpOiBTdWJzY3JpcHRpb247XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTmd4c0RldnRvb2xzQWN0aW9uIHtcclxuICB0eXBlOiBzdHJpbmc7XHJcbiAgcGF5bG9hZDogYW55O1xyXG4gIHN0YXRlOiBhbnk7XHJcbiAgaWQ6IG51bWJlcjtcclxuICBzb3VyY2U6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBOZ3hzRGV2dG9vbHNPcHRpb25zIHtcclxuICAvKipcclxuICAgKiBUaGUgbmFtZSBvZiB0aGUgZXh0ZW5zaW9uXHJcbiAgICovXHJcbiAgbmFtZT86IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgZGV2IHRvb2xzIGlzIGVuYWJsZWQgb3Igbm90ZS4gVXNlZnVsIGZvciBzZXR0aW5nIGR1cmluZyBwcm9kdWN0aW9uLlxyXG4gICAqL1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogTWF4IG51bWJlciBvZiBlbnRpcmllcyB0byBrZWVwLlxyXG4gICAqL1xyXG4gIG1heEFnZT86IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogUmVmb3JtYXQgYWN0aW9ucyBiZWZvcmUgc2VuZGluZyB0byBkZXYgdG9vbHNcclxuICAgKi9cclxuICBhY3Rpb25TYW5pdGl6ZXI/OiAoYWN0aW9uOiBhbnkpID0+IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZm9ybWF0IHN0YXRlIGJlZm9yZSBzZW5kaW5nIHRvIGRldnRvb2xzXHJcbiAgICovXHJcbiAgc3RhdGVTYW5pdGl6ZXI/OiAoc3RhdGU6IGFueSkgPT4gdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IE5HWFNfREVWVE9PTFNfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbignTkdYU19ERVZUT09MU19PUFRJT05TJyk7XHJcbiJdfQ==