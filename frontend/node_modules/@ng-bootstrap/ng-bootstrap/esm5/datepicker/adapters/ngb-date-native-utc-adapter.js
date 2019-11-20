/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { NgbDateNativeAdapter } from './ngb-date-native-adapter';
/**
 * NgbDateAdapter implementation that allows using native javascript UTC date as a user date model.
 * Same as NgbDateNativeAdapter, but uses UTC dates.
 *
 * \@since 3.2.0
 */
var NgbDateNativeUTCAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(NgbDateNativeUTCAdapter, _super);
    function NgbDateNativeUTCAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDateNativeUTCAdapter.prototype._fromNativeDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDateNativeUTCAdapter.prototype._toNativeDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var jsDate = new Date(Date.UTC(date.year, date.month - 1, date.day));
        // avoid 30 -> 1930 conversion
        jsDate.setUTCFullYear(date.year);
        return jsDate;
    };
    NgbDateNativeUTCAdapter.decorators = [
        { type: Injectable }
    ];
    return NgbDateNativeUTCAdapter;
}(NgbDateNativeAdapter));
export { NgbDateNativeUTCAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtbmF0aXZlLXV0Yy1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2FkYXB0ZXJzL25nYi1kYXRlLW5hdGl2ZS11dGMtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7Ozs7Ozs7QUFRL0Q7SUFDNkMsbURBQW9CO0lBRGpFOztJQVlBLENBQUM7Ozs7O0lBVlcsaURBQWU7Ozs7SUFBekIsVUFBMEIsSUFBVTtRQUNsQyxPQUFPLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFDLENBQUM7SUFDOUYsQ0FBQzs7Ozs7SUFFUywrQ0FBYTs7OztJQUF2QixVQUF3QixJQUFtQjs7WUFDbkMsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEUsOEJBQThCO1FBQzlCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7O2dCQVhGLFVBQVU7O0lBWVgsOEJBQUM7Q0FBQSxBQVpELENBQzZDLG9CQUFvQixHQVdoRTtTQVhZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4uL25nYi1kYXRlLXN0cnVjdCc7XG5pbXBvcnQge05nYkRhdGVOYXRpdmVBZGFwdGVyfSBmcm9tICcuL25nYi1kYXRlLW5hdGl2ZS1hZGFwdGVyJztcblxuLyoqXG4gKiBOZ2JEYXRlQWRhcHRlciBpbXBsZW1lbnRhdGlvbiB0aGF0IGFsbG93cyB1c2luZyBuYXRpdmUgamF2YXNjcmlwdCBVVEMgZGF0ZSBhcyBhIHVzZXIgZGF0ZSBtb2RlbC5cbiAqIFNhbWUgYXMgTmdiRGF0ZU5hdGl2ZUFkYXB0ZXIsIGJ1dCB1c2VzIFVUQyBkYXRlcy5cbiAqXG4gKiBAc2luY2UgMy4yLjBcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVOYXRpdmVVVENBZGFwdGVyIGV4dGVuZHMgTmdiRGF0ZU5hdGl2ZUFkYXB0ZXIge1xuICBwcm90ZWN0ZWQgX2Zyb21OYXRpdmVEYXRlKGRhdGU6IERhdGUpOiBOZ2JEYXRlU3RydWN0IHtcbiAgICByZXR1cm4ge3llYXI6IGRhdGUuZ2V0VVRDRnVsbFllYXIoKSwgbW9udGg6IGRhdGUuZ2V0VVRDTW9udGgoKSArIDEsIGRheTogZGF0ZS5nZXRVVENEYXRlKCl9O1xuICB9XG5cbiAgcHJvdGVjdGVkIF90b05hdGl2ZURhdGUoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IERhdGUge1xuICAgIGNvbnN0IGpzRGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKGRhdGUueWVhciwgZGF0ZS5tb250aCAtIDEsIGRhdGUuZGF5KSk7XG4gICAgLy8gYXZvaWQgMzAgLT4gMTkzMCBjb252ZXJzaW9uXG4gICAganNEYXRlLnNldFVUQ0Z1bGxZZWFyKGRhdGUueWVhcik7XG4gICAgcmV0dXJuIGpzRGF0ZTtcbiAgfVxufVxuIl19