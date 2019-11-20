/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Configuration service for the NgbDatepicker component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepickers used in the application.
 */
var NgbDatepickerConfig = /** @class */ (function () {
    function NgbDatepickerConfig() {
        this.displayMonths = 1;
        this.firstDayOfWeek = 1;
        this.navigation = 'select';
        this.outsideDays = 'visible';
        this.showWeekdays = true;
        this.showWeekNumbers = false;
    }
    NgbDatepickerConfig.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ NgbDatepickerConfig.ngInjectableDef = i0.defineInjectable({ factory: function NgbDatepickerConfig_Factory() { return new NgbDatepickerConfig(); }, token: NgbDatepickerConfig, providedIn: "root" });
    return NgbDatepickerConfig;
}());
export { NgbDatepickerConfig };
if (false) {
    /** @type {?} */
    NgbDatepickerConfig.prototype.dayTemplate;
    /** @type {?} */
    NgbDatepickerConfig.prototype.dayTemplateData;
    /** @type {?} */
    NgbDatepickerConfig.prototype.footerTemplate;
    /** @type {?} */
    NgbDatepickerConfig.prototype.displayMonths;
    /** @type {?} */
    NgbDatepickerConfig.prototype.firstDayOfWeek;
    /** @type {?} */
    NgbDatepickerConfig.prototype.markDisabled;
    /** @type {?} */
    NgbDatepickerConfig.prototype.minDate;
    /** @type {?} */
    NgbDatepickerConfig.prototype.maxDate;
    /** @type {?} */
    NgbDatepickerConfig.prototype.navigation;
    /** @type {?} */
    NgbDatepickerConfig.prototype.outsideDays;
    /** @type {?} */
    NgbDatepickerConfig.prototype.showWeekdays;
    /** @type {?} */
    NgbDatepickerConfig.prototype.showWeekNumbers;
    /** @type {?} */
    NgbDatepickerConfig.prototype.startDate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXIvZGF0ZXBpY2tlci1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQWMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7QUFTdEQ7SUFBQTtRQUtFLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBSW5CLGVBQVUsR0FBaUMsUUFBUSxDQUFDO1FBQ3BELGdCQUFXLEdBQXVDLFNBQVMsQ0FBQztRQUM1RCxpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixvQkFBZSxHQUFHLEtBQUssQ0FBQztLQUV6Qjs7Z0JBZkEsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7OzhCQVRoQztDQXdCQyxBQWZELElBZUM7U0FkWSxtQkFBbUI7OztJQUM5QiwwQ0FBNkM7O0lBQzdDLDhDQUFzRjs7SUFDdEYsNkNBQWlDOztJQUNqQyw0Q0FBa0I7O0lBQ2xCLDZDQUFtQjs7SUFDbkIsMkNBQXVGOztJQUN2RixzQ0FBdUI7O0lBQ3ZCLHNDQUF1Qjs7SUFDdkIseUNBQW9EOztJQUNwRCwwQ0FBNEQ7O0lBQzVELDJDQUFvQjs7SUFDcEIsOENBQXdCOztJQUN4Qix3Q0FBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIFRlbXBsYXRlUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGF5VGVtcGxhdGVDb250ZXh0fSBmcm9tICcuL2RhdGVwaWNrZXItZGF5LXRlbXBsYXRlLWNvbnRleHQnO1xuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiRGF0ZXBpY2tlciBjb21wb25lbnQuXG4gKiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LCBhbmQgY3VzdG9taXplIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW5cbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgZGF0ZXBpY2tlcnMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJDb25maWcge1xuICBkYXlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8RGF5VGVtcGxhdGVDb250ZXh0PjtcbiAgZGF5VGVtcGxhdGVEYXRhOiAoZGF0ZTogTmdiRGF0ZVN0cnVjdCwgY3VycmVudDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pID0+IGFueTtcbiAgZm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIGRpc3BsYXlNb250aHMgPSAxO1xuICBmaXJzdERheU9mV2VlayA9IDE7XG4gIG1hcmtEaXNhYmxlZDogKGRhdGU6IE5nYkRhdGVTdHJ1Y3QsIGN1cnJlbnQ6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9KSA9PiBib29sZWFuO1xuICBtaW5EYXRlOiBOZ2JEYXRlU3RydWN0O1xuICBtYXhEYXRlOiBOZ2JEYXRlU3RydWN0O1xuICBuYXZpZ2F0aW9uOiAnc2VsZWN0JyB8ICdhcnJvd3MnIHwgJ25vbmUnID0gJ3NlbGVjdCc7XG4gIG91dHNpZGVEYXlzOiAndmlzaWJsZScgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nID0gJ3Zpc2libGUnO1xuICBzaG93V2Vla2RheXMgPSB0cnVlO1xuICBzaG93V2Vla051bWJlcnMgPSBmYWxzZTtcbiAgc3RhcnREYXRlOiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfTtcbn1cbiJdfQ==