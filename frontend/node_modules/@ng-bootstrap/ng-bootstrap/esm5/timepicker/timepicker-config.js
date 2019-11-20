/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Configuration service for the NgbTimepicker component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the timepickers used in the application.
 */
var NgbTimepickerConfig = /** @class */ (function () {
    function NgbTimepickerConfig() {
        this.meridian = false;
        this.spinners = true;
        this.seconds = false;
        this.hourStep = 1;
        this.minuteStep = 1;
        this.secondStep = 1;
        this.disabled = false;
        this.readonlyInputs = false;
        this.size = 'medium';
    }
    NgbTimepickerConfig.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ NgbTimepickerConfig.ngInjectableDef = i0.defineInjectable({ factory: function NgbTimepickerConfig_Factory() { return new NgbTimepickerConfig(); }, token: NgbTimepickerConfig, providedIn: "root" });
    return NgbTimepickerConfig;
}());
export { NgbTimepickerConfig };
if (false) {
    /** @type {?} */
    NgbTimepickerConfig.prototype.meridian;
    /** @type {?} */
    NgbTimepickerConfig.prototype.spinners;
    /** @type {?} */
    NgbTimepickerConfig.prototype.seconds;
    /** @type {?} */
    NgbTimepickerConfig.prototype.hourStep;
    /** @type {?} */
    NgbTimepickerConfig.prototype.minuteStep;
    /** @type {?} */
    NgbTimepickerConfig.prototype.secondStep;
    /** @type {?} */
    NgbTimepickerConfig.prototype.disabled;
    /** @type {?} */
    NgbTimepickerConfig.prototype.readonlyInputs;
    /** @type {?} */
    NgbTimepickerConfig.prototype.size;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci1jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInRpbWVwaWNrZXIvdGltZXBpY2tlci1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7QUFPekM7SUFBQTtRQUVFLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsU0FBSSxHQUFpQyxRQUFRLENBQUM7S0FDL0M7O2dCQVhBLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7Ozs4QkFQaEM7Q0FrQkMsQUFYRCxJQVdDO1NBVlksbUJBQW1COzs7SUFDOUIsdUNBQWlCOztJQUNqQix1Q0FBZ0I7O0lBQ2hCLHNDQUFnQjs7SUFDaEIsdUNBQWE7O0lBQ2IseUNBQWU7O0lBQ2YseUNBQWU7O0lBQ2YsdUNBQWlCOztJQUNqQiw2Q0FBdUI7O0lBQ3ZCLG1DQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiVGltZXBpY2tlciBjb21wb25lbnQuXG4gKiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LCBhbmQgY3VzdG9taXplIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW5cbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgdGltZXBpY2tlcnMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIE5nYlRpbWVwaWNrZXJDb25maWcge1xuICBtZXJpZGlhbiA9IGZhbHNlO1xuICBzcGlubmVycyA9IHRydWU7XG4gIHNlY29uZHMgPSBmYWxzZTtcbiAgaG91clN0ZXAgPSAxO1xuICBtaW51dGVTdGVwID0gMTtcbiAgc2Vjb25kU3RlcCA9IDE7XG4gIGRpc2FibGVkID0gZmFsc2U7XG4gIHJlYWRvbmx5SW5wdXRzID0gZmFsc2U7XG4gIHNpemU6ICdzbWFsbCcgfCAnbWVkaXVtJyB8ICdsYXJnZScgPSAnbWVkaXVtJztcbn1cbiJdfQ==