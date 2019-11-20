/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
export class NgxsBootstrapper {
    constructor() {
        /**
         * Use `ReplaySubject`, thus we can get cached value even if the stream is completed
         */
        this.bootstrap$ = new ReplaySubject(1);
    }
    /**
     * @return {?}
     */
    get appBootstrapped$() {
        return this.bootstrap$.asObservable();
    }
    /**
     * This event will be emitted after attaching `ComponentRef` of the root component
     * to the tree of views, that's a signal that application has been fully rendered
     * @return {?}
     */
    bootstrap() {
        this.bootstrap$.next(true);
        this.bootstrap$.complete();
    }
}
NgxsBootstrapper.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * Use `ReplaySubject`, thus we can get cached value even if the stream is completed
     * @type {?}
     * @private
     */
    NgxsBootstrapper.prototype.bootstrap$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4cy1ib290c3RyYXBwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4cy9zdG9yZS9pbnRlcm5hbHMvIiwic291cmNlcyI6WyJuZ3hzLWJvb3RzdHJhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR2pELE1BQU0sT0FBTyxnQkFBZ0I7SUFEN0I7Ozs7UUFLVSxlQUFVLEdBQUcsSUFBSSxhQUFhLENBQVUsQ0FBQyxDQUFDLENBQUM7SUFjckQsQ0FBQzs7OztJQVpDLElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QyxDQUFDOzs7Ozs7SUFNRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7WUFsQkYsVUFBVTs7Ozs7Ozs7SUFLVCxzQ0FBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE5neHNCb290c3RyYXBwZXIge1xyXG4gIC8qKlxyXG4gICAqIFVzZSBgUmVwbGF5U3ViamVjdGAsIHRodXMgd2UgY2FuIGdldCBjYWNoZWQgdmFsdWUgZXZlbiBpZiB0aGUgc3RyZWFtIGlzIGNvbXBsZXRlZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYm9vdHN0cmFwJCA9IG5ldyBSZXBsYXlTdWJqZWN0PGJvb2xlYW4+KDEpO1xyXG5cclxuICBnZXQgYXBwQm9vdHN0cmFwcGVkJCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiB0aGlzLmJvb3RzdHJhcCQuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGV2ZW50IHdpbGwgYmUgZW1pdHRlZCBhZnRlciBhdHRhY2hpbmcgYENvbXBvbmVudFJlZmAgb2YgdGhlIHJvb3QgY29tcG9uZW50XHJcbiAgICogdG8gdGhlIHRyZWUgb2Ygdmlld3MsIHRoYXQncyBhIHNpZ25hbCB0aGF0IGFwcGxpY2F0aW9uIGhhcyBiZWVuIGZ1bGx5IHJlbmRlcmVkXHJcbiAgICovXHJcbiAgYm9vdHN0cmFwKCk6IHZvaWQge1xyXG4gICAgdGhpcy5ib290c3RyYXAkLm5leHQodHJ1ZSk7XHJcbiAgICB0aGlzLmJvb3RzdHJhcCQuY29tcGxldGUoKTtcclxuICB9XHJcbn1cclxuIl19