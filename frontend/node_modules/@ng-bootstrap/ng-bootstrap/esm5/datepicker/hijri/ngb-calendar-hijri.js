/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgbDate } from '../ngb-date';
import { NgbCalendar } from '../ngb-calendar';
import { Injectable } from '@angular/core';
import { isNumber } from '../../util/util';
/**
 * @abstract
 */
var NgbCalendarHijri = /** @class */ (function (_super) {
    tslib_1.__extends(NgbCalendarHijri, _super);
    function NgbCalendarHijri() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    NgbCalendarHijri.prototype.getDaysPerWeek = /**
     * @return {?}
     */
    function () { return 7; };
    /**
     * @return {?}
     */
    NgbCalendarHijri.prototype.getMonths = /**
     * @return {?}
     */
    function () { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; };
    /**
     * @return {?}
     */
    NgbCalendarHijri.prototype.getWeeksPerMonth = /**
     * @return {?}
     */
    function () { return 6; };
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbCalendarHijri.prototype.getNext = /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    function (date, period, number) {
        if (period === void 0) { period = 'd'; }
        if (number === void 0) { number = 1; }
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date = this._setYear(date, date.year + number);
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = this._setMonth(date, date.month + number);
                date.day = 1;
                return date;
            case 'd':
                return this._setDay(date, date.day + number);
            default:
                return date;
        }
    };
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbCalendarHijri.prototype.getPrev = /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    function (date, period, number) {
        if (period === void 0) { period = 'd'; }
        if (number === void 0) { number = 1; }
        return this.getNext(date, period, -number);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbCalendarHijri.prototype.getWeekday = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var day = this.toGregorian(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    };
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    NgbCalendarHijri.prototype.getWeekNumber = /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    function (week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        /** @type {?} */
        var thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        /** @type {?} */
        var date = week[thursdayIndex];
        /** @type {?} */
        var jsDate = this.toGregorian(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        // Thursday
        /** @type {?} */
        var time = jsDate.getTime();
        /** @type {?} */
        var MuhDate = this.toGregorian(new NgbDate(date.year, 1, 1));
        return Math.floor(Math.round((time - MuhDate.getTime()) / 86400000) / 7) + 1;
    };
    /**
     * @return {?}
     */
    NgbCalendarHijri.prototype.getToday = /**
     * @return {?}
     */
    function () { return this.fromGregorian(new Date()); };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbCalendarHijri.prototype.isValid = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date && isNumber(date.year) && isNumber(date.month) && isNumber(date.day) &&
            !isNaN(this.toGregorian(date).getTime());
    };
    /**
     * @param {?} date
     * @param {?} day
     * @return {?}
     */
    NgbCalendarHijri.prototype._setDay = /**
     * @param {?} date
     * @param {?} day
     * @return {?}
     */
    function (date, day) {
        day = +day;
        /** @type {?} */
        var mDays = this.getDaysPerMonth(date.month, date.year);
        if (day <= 0) {
            while (day <= 0) {
                date = this._setMonth(date, date.month - 1);
                mDays = this.getDaysPerMonth(date.month, date.year);
                day += mDays;
            }
        }
        else if (day > mDays) {
            while (day > mDays) {
                day -= mDays;
                date = this._setMonth(date, date.month + 1);
                mDays = this.getDaysPerMonth(date.month, date.year);
            }
        }
        date.day = day;
        return date;
    };
    /**
     * @param {?} date
     * @param {?} month
     * @return {?}
     */
    NgbCalendarHijri.prototype._setMonth = /**
     * @param {?} date
     * @param {?} month
     * @return {?}
     */
    function (date, month) {
        month = +month;
        date.year = date.year + Math.floor((month - 1) / 12);
        date.month = Math.floor(((month - 1) % 12 + 12) % 12) + 1;
        return date;
    };
    /**
     * @param {?} date
     * @param {?} year
     * @return {?}
     */
    NgbCalendarHijri.prototype._setYear = /**
     * @param {?} date
     * @param {?} year
     * @return {?}
     */
    function (date, year) {
        date.year = +year;
        return date;
    };
    NgbCalendarHijri.decorators = [
        { type: Injectable }
    ];
    return NgbCalendarHijri;
}(NgbCalendar));
export { NgbCalendarHijri };
if (false) {
    /**
     * Returns the number of days in a specific Hijri month.
     * `month` is 1 for Muharram, 2 for Safar, etc.
     * `year` is any Hijri year.
     * @abstract
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    NgbCalendarHijri.prototype.getDaysPerMonth = function (month, year) { };
    /**
     * Returns the equivalent Hijri date value for a give input Gregorian date.
     * `gDate` is s JS Date to be converted to Hijri.
     * @abstract
     * @param {?} gDate
     * @return {?}
     */
    NgbCalendarHijri.prototype.fromGregorian = function (gDate) { };
    /**
     * Converts the current Hijri date to Gregorian.
     * @abstract
     * @param {?} hDate
     * @return {?}
     */
    NgbCalendarHijri.prototype.toGregorian = function (hDate) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWNhbGVuZGFyLWhpanJpLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2hpanJpL25nYi1jYWxlbmRhci1oaWpyaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDcEMsT0FBTyxFQUFZLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7O0FBRXpDO0lBQytDLDRDQUFXO0lBRDFEOztJQTZHQSxDQUFDOzs7O0lBekZDLHlDQUFjOzs7SUFBZCxjQUFtQixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFFOUIsb0NBQVM7OztJQUFULGNBQWMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0lBRS9ELDJDQUFnQjs7O0lBQWhCLGNBQXFCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztJQUVoQyxrQ0FBTzs7Ozs7O0lBQVAsVUFBUSxJQUFhLEVBQUUsTUFBdUIsRUFBRSxNQUFVO1FBQW5DLHVCQUFBLEVBQUEsWUFBdUI7UUFBRSx1QkFBQSxFQUFBLFVBQVU7UUFDeEQsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFcEQsUUFBUSxNQUFNLEVBQUU7WUFDZCxLQUFLLEdBQUc7Z0JBQ04s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QyxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7OztJQUVPLG1DQUFROzs7OztJQUFoQixVQUFpQixJQUFhLEVBQUUsSUFBWTtRQUMxQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ2xCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Z0JBNUdGLFVBQVU7O0lBNkdYLHVCQUFDO0NBQUEsQUE3R0QsQ0FDK0MsV0FBVyxHQTRHekQ7U0E1R3FCLGdCQUFnQjs7Ozs7Ozs7Ozs7SUFNcEMsd0VBQThEOzs7Ozs7OztJQU05RCxnRUFBNkM7Ozs7Ozs7SUFLN0MsOERBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuLi9uZ2ItZGF0ZSc7XG5pbXBvcnQge05nYlBlcmlvZCwgTmdiQ2FsZW5kYXJ9IGZyb20gJy4uL25nYi1jYWxlbmRhcic7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtpc051bWJlcn0gZnJvbSAnLi4vLi4vdXRpbC91dGlsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5nYkNhbGVuZGFySGlqcmkgZXh0ZW5kcyBOZ2JDYWxlbmRhciB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIHNwZWNpZmljIEhpanJpIG1vbnRoLlxuICAgKiBgbW9udGhgIGlzIDEgZm9yIE11aGFycmFtLCAyIGZvciBTYWZhciwgZXRjLlxuICAgKiBgeWVhcmAgaXMgYW55IEhpanJpIHllYXIuXG4gICAqL1xuICBhYnN0cmFjdCBnZXREYXlzUGVyTW9udGgobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBlcXVpdmFsZW50IEhpanJpIGRhdGUgdmFsdWUgZm9yIGEgZ2l2ZSBpbnB1dCBHcmVnb3JpYW4gZGF0ZS5cbiAgICogYGdEYXRlYCBpcyBzIEpTIERhdGUgdG8gYmUgY29udmVydGVkIHRvIEhpanJpLlxuICAgKi9cbiAgYWJzdHJhY3QgZnJvbUdyZWdvcmlhbihnRGF0ZTogRGF0ZSk6IE5nYkRhdGU7XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHRoZSBjdXJyZW50IEhpanJpIGRhdGUgdG8gR3JlZ29yaWFuLlxuICAgKi9cbiAgYWJzdHJhY3QgdG9HcmVnb3JpYW4oaERhdGU6IE5nYkRhdGUpOiBEYXRlO1xuXG4gIGdldERheXNQZXJXZWVrKCkgeyByZXR1cm4gNzsgfVxuXG4gIGdldE1vbnRocygpIHsgcmV0dXJuIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyXTsgfVxuXG4gIGdldFdlZWtzUGVyTW9udGgoKSB7IHJldHVybiA2OyB9XG5cbiAgZ2V0TmV4dChkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkge1xuICAgIGRhdGUgPSBuZXcgTmdiRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5KTtcblxuICAgIHN3aXRjaCAocGVyaW9kKSB7XG4gICAgICBjYXNlICd5JzpcbiAgICAgICAgZGF0ZSA9IHRoaXMuX3NldFllYXIoZGF0ZSwgZGF0ZS55ZWFyICsgbnVtYmVyKTtcbiAgICAgICAgZGF0ZS5tb250aCA9IDE7XG4gICAgICAgIGRhdGUuZGF5ID0gMTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICBjYXNlICdtJzpcbiAgICAgICAgZGF0ZSA9IHRoaXMuX3NldE1vbnRoKGRhdGUsIGRhdGUubW9udGggKyBudW1iZXIpO1xuICAgICAgICBkYXRlLmRheSA9IDE7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgY2FzZSAnZCc6XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXREYXkoZGF0ZSwgZGF0ZS5kYXkgKyBudW1iZXIpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuICB9XG5cbiAgZ2V0UHJldihkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkgeyByZXR1cm4gdGhpcy5nZXROZXh0KGRhdGUsIHBlcmlvZCwgLW51bWJlcik7IH1cblxuICBnZXRXZWVrZGF5KGRhdGU6IE5nYkRhdGUpIHtcbiAgICBjb25zdCBkYXkgPSB0aGlzLnRvR3JlZ29yaWFuKGRhdGUpLmdldERheSgpO1xuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XG4gICAgcmV0dXJuIGRheSA9PT0gMCA/IDcgOiBkYXk7XG4gIH1cblxuICBnZXRXZWVrTnVtYmVyKHdlZWs6IE5nYkRhdGVbXSwgZmlyc3REYXlPZldlZWs6IG51bWJlcikge1xuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XG4gICAgaWYgKGZpcnN0RGF5T2ZXZWVrID09PSA3KSB7XG4gICAgICBmaXJzdERheU9mV2VlayA9IDA7XG4gICAgfVxuXG4gICAgY29uc3QgdGh1cnNkYXlJbmRleCA9ICg0ICsgNyAtIGZpcnN0RGF5T2ZXZWVrKSAlIDc7XG4gICAgY29uc3QgZGF0ZSA9IHdlZWtbdGh1cnNkYXlJbmRleF07XG5cbiAgICBjb25zdCBqc0RhdGUgPSB0aGlzLnRvR3JlZ29yaWFuKGRhdGUpO1xuICAgIGpzRGF0ZS5zZXREYXRlKGpzRGF0ZS5nZXREYXRlKCkgKyA0IC0gKGpzRGF0ZS5nZXREYXkoKSB8fCA3KSk7ICAvLyBUaHVyc2RheVxuICAgIGNvbnN0IHRpbWUgPSBqc0RhdGUuZ2V0VGltZSgpO1xuICAgIGNvbnN0IE11aERhdGUgPSB0aGlzLnRvR3JlZ29yaWFuKG5ldyBOZ2JEYXRlKGRhdGUueWVhciwgMSwgMSkpOyAgLy8gQ29tcGFyZSB3aXRoIE11aGFycmFtIDFcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJvdW5kKCh0aW1lIC0gTXVoRGF0ZS5nZXRUaW1lKCkpIC8gODY0MDAwMDApIC8gNykgKyAxO1xuICB9XG5cbiAgZ2V0VG9kYXkoKTogTmdiRGF0ZSB7IHJldHVybiB0aGlzLmZyb21HcmVnb3JpYW4obmV3IERhdGUoKSk7IH1cblxuXG4gIGlzVmFsaWQoZGF0ZTogTmdiRGF0ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkYXRlICYmIGlzTnVtYmVyKGRhdGUueWVhcikgJiYgaXNOdW1iZXIoZGF0ZS5tb250aCkgJiYgaXNOdW1iZXIoZGF0ZS5kYXkpICYmXG4gICAgICAgICFpc05hTih0aGlzLnRvR3JlZ29yaWFuKGRhdGUpLmdldFRpbWUoKSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXREYXkoZGF0ZTogTmdiRGF0ZSwgZGF5OiBudW1iZXIpOiBOZ2JEYXRlIHtcbiAgICBkYXkgPSArZGF5O1xuICAgIGxldCBtRGF5cyA9IHRoaXMuZ2V0RGF5c1Blck1vbnRoKGRhdGUubW9udGgsIGRhdGUueWVhcik7XG4gICAgaWYgKGRheSA8PSAwKSB7XG4gICAgICB3aGlsZSAoZGF5IDw9IDApIHtcbiAgICAgICAgZGF0ZSA9IHRoaXMuX3NldE1vbnRoKGRhdGUsIGRhdGUubW9udGggLSAxKTtcbiAgICAgICAgbURheXMgPSB0aGlzLmdldERheXNQZXJNb250aChkYXRlLm1vbnRoLCBkYXRlLnllYXIpO1xuICAgICAgICBkYXkgKz0gbURheXM7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkYXkgPiBtRGF5cykge1xuICAgICAgd2hpbGUgKGRheSA+IG1EYXlzKSB7XG4gICAgICAgIGRheSAtPSBtRGF5cztcbiAgICAgICAgZGF0ZSA9IHRoaXMuX3NldE1vbnRoKGRhdGUsIGRhdGUubW9udGggKyAxKTtcbiAgICAgICAgbURheXMgPSB0aGlzLmdldERheXNQZXJNb250aChkYXRlLm1vbnRoLCBkYXRlLnllYXIpO1xuICAgICAgfVxuICAgIH1cbiAgICBkYXRlLmRheSA9IGRheTtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldE1vbnRoKGRhdGU6IE5nYkRhdGUsIG1vbnRoOiBudW1iZXIpOiBOZ2JEYXRlIHtcbiAgICBtb250aCA9ICttb250aDtcbiAgICBkYXRlLnllYXIgPSBkYXRlLnllYXIgKyBNYXRoLmZsb29yKChtb250aCAtIDEpIC8gMTIpO1xuICAgIGRhdGUubW9udGggPSBNYXRoLmZsb29yKCgobW9udGggLSAxKSAlIDEyICsgMTIpICUgMTIpICsgMTtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldFllYXIoZGF0ZTogTmdiRGF0ZSwgeWVhcjogbnVtYmVyKTogTmdiRGF0ZSB7XG4gICAgZGF0ZS55ZWFyID0gK3llYXI7XG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cbn1cbiJdfQ==