/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Configuration service for the NgbTypeahead component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the typeaheads used in the application.
 */
var NgbTypeaheadConfig = /** @class */ (function () {
    function NgbTypeaheadConfig() {
        this.editable = true;
        this.focusFirst = true;
        this.showHint = false;
        this.placement = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
    }
    NgbTypeaheadConfig.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ NgbTypeaheadConfig.ngInjectableDef = i0.defineInjectable({ factory: function NgbTypeaheadConfig_Factory() { return new NgbTypeaheadConfig(); }, token: NgbTypeaheadConfig, providedIn: "root" });
    return NgbTypeaheadConfig;
}());
export { NgbTypeaheadConfig };
if (false) {
    /** @type {?} */
    NgbTypeaheadConfig.prototype.container;
    /** @type {?} */
    NgbTypeaheadConfig.prototype.editable;
    /** @type {?} */
    NgbTypeaheadConfig.prototype.focusFirst;
    /** @type {?} */
    NgbTypeaheadConfig.prototype.showHint;
    /** @type {?} */
    NgbTypeaheadConfig.prototype.placement;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidHlwZWFoZWFkL3R5cGVhaGVhZC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7QUFRekM7SUFBQTtRQUdFLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGNBQVMsR0FBbUIsQ0FBQyxhQUFhLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztLQUN0Rjs7Z0JBUEEsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7OzZCQVJoQztDQWVDLEFBUEQsSUFPQztTQU5ZLGtCQUFrQjs7O0lBQzdCLHVDQUFVOztJQUNWLHNDQUFnQjs7SUFDaEIsd0NBQWtCOztJQUNsQixzQ0FBaUI7O0lBQ2pCLHVDQUFxRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1BsYWNlbWVudEFycmF5fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBOZ2JUeXBlYWhlYWQgY29tcG9uZW50LlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIHR5cGVhaGVhZHMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIE5nYlR5cGVhaGVhZENvbmZpZyB7XG4gIGNvbnRhaW5lcjtcbiAgZWRpdGFibGUgPSB0cnVlO1xuICBmb2N1c0ZpcnN0ID0gdHJ1ZTtcbiAgc2hvd0hpbnQgPSBmYWxzZTtcbiAgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9IFsnYm90dG9tLWxlZnQnLCAnYm90dG9tLXJpZ2h0JywgJ3RvcC1sZWZ0JywgJ3RvcC1yaWdodCddO1xufVxuIl19