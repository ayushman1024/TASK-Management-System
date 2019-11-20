/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgbDate } from './ngb-date';
import { Injectable } from '@angular/core';
import { isInteger } from '../util/util';
import * as i0 from "@angular/core";
/**
 * @param {?} jsDate
 * @return {?}
 */
export function fromJSDate(jsDate) {
    return new NgbDate(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate());
}
/**
 * @param {?} date
 * @return {?}
 */
export function toJSDate(date) {
    /** @type {?} */
    var jsDate = new Date(date.year, date.month - 1, date.day, 12);
    // this is done avoid 30 -> 1930 conversion
    if (!isNaN(jsDate.getTime())) {
        jsDate.setFullYear(date.year);
    }
    return jsDate;
}
/**
 * @return {?}
 */
export function NGB_DATEPICKER_CALENDAR_FACTORY() {
    return new NgbCalendarGregorian();
}
/**
 * Calendar used by the datepicker.
 * Default implementation uses Gregorian calendar.
 * @abstract
 */
var NgbCalendar = /** @class */ (function () {
    function NgbCalendar() {
    }
    NgbCalendar.decorators = [
        { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_CALENDAR_FACTORY },] }
    ];
    /** @nocollapse */ NgbCalendar.ngInjectableDef = i0.defineInjectable({ factory: NGB_DATEPICKER_CALENDAR_FACTORY, token: NgbCalendar, providedIn: "root" });
    return NgbCalendar;
}());
export { NgbCalendar };
if (false) {
    /**
     * Returns number of days per week.
     * @abstract
     * @return {?}
     */
    NgbCalendar.prototype.getDaysPerWeek = function () { };
    /**
     * Returns an array of months per year.
     * With default calendar we use ISO 8601 and return [1, 2, ..., 12];
     * @abstract
     * @param {?=} year
     * @return {?}
     */
    NgbCalendar.prototype.getMonths = function (year) { };
    /**
     * Returns number of weeks per month.
     * @abstract
     * @return {?}
     */
    NgbCalendar.prototype.getWeeksPerMonth = function () { };
    /**
     * Returns weekday number for a given day.
     * With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun
     * @abstract
     * @param {?} date
     * @return {?}
     */
    NgbCalendar.prototype.getWeekday = function (date) { };
    /**
     * Adds a number of years, months or days to a given date.
     * Period can be 'y', 'm' or 'd' and defaults to day.
     * Number defaults to 1.
     * @abstract
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbCalendar.prototype.getNext = function (date, period, number) { };
    /**
     * Subtracts a number of years, months or days from a given date.
     * Period can be 'y', 'm' or 'd' and defaults to day.
     * Number defaults to 1.
     * @abstract
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbCalendar.prototype.getPrev = function (date, period, number) { };
    /**
     * Returns week number for a given week.
     * @abstract
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    NgbCalendar.prototype.getWeekNumber = function (week, firstDayOfWeek) { };
    /**
     * Returns today's date.
     * @abstract
     * @return {?}
     */
    NgbCalendar.prototype.getToday = function () { };
    /**
     * Checks if a date is valid for a current calendar.
     * @abstract
     * @param {?} date
     * @return {?}
     */
    NgbCalendar.prototype.isValid = function (date) { };
}
var NgbCalendarGregorian = /** @class */ (function (_super) {
    tslib_1.__extends(NgbCalendarGregorian, _super);
    function NgbCalendarGregorian() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getDaysPerWeek = /**
     * @return {?}
     */
    function () { return 7; };
    /**
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getMonths = /**
     * @return {?}
     */
    function () { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; };
    /**
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getWeeksPerMonth = /**
     * @return {?}
     */
    function () { return 6; };
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getNext = /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    function (date, period, number) {
        if (period === void 0) { period = 'd'; }
        if (number === void 0) { number = 1; }
        /** @type {?} */
        var jsDate = toJSDate(date);
        switch (period) {
            case 'y':
                return new NgbDate(date.year + number, 1, 1);
            case 'm':
                jsDate = new Date(date.year, date.month + number - 1, 1, 12);
                break;
            case 'd':
                jsDate.setDate(jsDate.getDate() + number);
                break;
            default:
                return date;
        }
        return fromJSDate(jsDate);
    };
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getPrev = /**
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
    NgbCalendarGregorian.prototype.getWeekday = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var jsDate = toJSDate(date);
        /** @type {?} */
        var day = jsDate.getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    };
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getWeekNumber = /**
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
        var jsDate = toJSDate(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        // Thursday
        /** @type {?} */
        var time = jsDate.getTime();
        jsDate.setMonth(0); // Compare with Jan 1
        jsDate.setDate(1);
        return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
    };
    /**
     * @return {?}
     */
    NgbCalendarGregorian.prototype.getToday = /**
     * @return {?}
     */
    function () { return fromJSDate(new Date()); };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbCalendarGregorian.prototype.isValid = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (!date || !isInteger(date.year) || !isInteger(date.month) || !isInteger(date.day)) {
            return false;
        }
        // year 0 doesn't exist in Gregorian calendar
        if (date.year === 0) {
            return false;
        }
        /** @type {?} */
        var jsDate = toJSDate(date);
        return !isNaN(jsDate.getTime()) && jsDate.getFullYear() === date.year && jsDate.getMonth() + 1 === date.month &&
            jsDate.getDate() === date.day;
    };
    NgbCalendarGregorian.decorators = [
        { type: Injectable }
    ];
    return NgbCalendarGregorian;
}(NgbCalendar));
export { NgbCalendarGregorian };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWNhbGVuZGFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL25nYi1jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFDOzs7Ozs7QUFFdkMsTUFBTSxVQUFVLFVBQVUsQ0FBQyxNQUFZO0lBQ3JDLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFDcEYsQ0FBQzs7Ozs7QUFDRCxNQUFNLFVBQVUsUUFBUSxDQUFDLElBQWE7O1FBQzlCLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO0lBQ2hFLDJDQUEyQztJQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFO1FBQzVCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQy9CO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQzs7OztBQUlELE1BQU0sVUFBVSwrQkFBK0I7SUFDN0MsT0FBTyxJQUFJLG9CQUFvQixFQUFFLENBQUM7QUFDcEMsQ0FBQzs7Ozs7O0FBTUQ7SUFBQTtLQW9EQzs7Z0JBcERBLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLCtCQUErQixFQUFDOzs7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ekcsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEMsQ0FBQzs7Z0JBckVGLFVBQVU7O0lBc0VYLDJCQUFDO0NBQUEsQUF0RUQsQ0FDMEMsV0FBVyxHQXFFcEQ7U0FyRVksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2lzSW50ZWdlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21KU0RhdGUoanNEYXRlOiBEYXRlKSB7XG4gIHJldHVybiBuZXcgTmdiRGF0ZShqc0RhdGUuZ2V0RnVsbFllYXIoKSwganNEYXRlLmdldE1vbnRoKCkgKyAxLCBqc0RhdGUuZ2V0RGF0ZSgpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0b0pTRGF0ZShkYXRlOiBOZ2JEYXRlKSB7XG4gIGNvbnN0IGpzRGF0ZSA9IG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCAtIDEsIGRhdGUuZGF5LCAxMik7XG4gIC8vIHRoaXMgaXMgZG9uZSBhdm9pZCAzMCAtPiAxOTMwIGNvbnZlcnNpb25cbiAgaWYgKCFpc05hTihqc0RhdGUuZ2V0VGltZSgpKSkge1xuICAgIGpzRGF0ZS5zZXRGdWxsWWVhcihkYXRlLnllYXIpO1xuICB9XG4gIHJldHVybiBqc0RhdGU7XG59XG5cbmV4cG9ydCB0eXBlIE5nYlBlcmlvZCA9ICd5JyB8ICdtJyB8ICdkJztcblxuZXhwb3J0IGZ1bmN0aW9uIE5HQl9EQVRFUElDS0VSX0NBTEVOREFSX0ZBQ1RPUlkoKSB7XG4gIHJldHVybiBuZXcgTmdiQ2FsZW5kYXJHcmVnb3JpYW4oKTtcbn1cblxuLyoqXG4gKiBDYWxlbmRhciB1c2VkIGJ5IHRoZSBkYXRlcGlja2VyLlxuICogRGVmYXVsdCBpbXBsZW1lbnRhdGlvbiB1c2VzIEdyZWdvcmlhbiBjYWxlbmRhci5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogTkdCX0RBVEVQSUNLRVJfQ0FMRU5EQVJfRkFDVE9SWX0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdiQ2FsZW5kYXIge1xuICAvKipcbiAgICogUmV0dXJucyBudW1iZXIgb2YgZGF5cyBwZXIgd2Vlay5cbiAgICovXG4gIGFic3RyYWN0IGdldERheXNQZXJXZWVrKCk6IG51bWJlcjtcblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSBvZiBtb250aHMgcGVyIHllYXIuXG4gICAqIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDEgYW5kIHJldHVybiBbMSwgMiwgLi4uLCAxMl07XG4gICAqL1xuICBhYnN0cmFjdCBnZXRNb250aHMoeWVhcj86IG51bWJlcik6IG51bWJlcltdO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIG51bWJlciBvZiB3ZWVrcyBwZXIgbW9udGguXG4gICAqL1xuICBhYnN0cmFjdCBnZXRXZWVrc1Blck1vbnRoKCk6IG51bWJlcjtcblxuICAvKipcbiAgICogUmV0dXJucyB3ZWVrZGF5IG51bWJlciBmb3IgYSBnaXZlbiBkYXkuXG4gICAqIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICd3ZWVrZGF5JyBpcyAxPU1vbiAuLi4gNz1TdW5cbiAgICovXG4gIGFic3RyYWN0IGdldFdlZWtkYXkoZGF0ZTogTmdiRGF0ZSk6IG51bWJlcjtcblxuICAvKipcbiAgICogQWRkcyBhIG51bWJlciBvZiB5ZWFycywgbW9udGhzIG9yIGRheXMgdG8gYSBnaXZlbiBkYXRlLlxuICAgKiBQZXJpb2QgY2FuIGJlICd5JywgJ20nIG9yICdkJyBhbmQgZGVmYXVsdHMgdG8gZGF5LlxuICAgKiBOdW1iZXIgZGVmYXVsdHMgdG8gMS5cbiAgICovXG4gIGFic3RyYWN0IGdldE5leHQoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kPzogTmdiUGVyaW9kLCBudW1iZXI/OiBudW1iZXIpOiBOZ2JEYXRlO1xuXG4gIC8qKlxuICAgKiBTdWJ0cmFjdHMgYSBudW1iZXIgb2YgeWVhcnMsIG1vbnRocyBvciBkYXlzIGZyb20gYSBnaXZlbiBkYXRlLlxuICAgKiBQZXJpb2QgY2FuIGJlICd5JywgJ20nIG9yICdkJyBhbmQgZGVmYXVsdHMgdG8gZGF5LlxuICAgKiBOdW1iZXIgZGVmYXVsdHMgdG8gMS5cbiAgICovXG4gIGFic3RyYWN0IGdldFByZXYoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kPzogTmdiUGVyaW9kLCBudW1iZXI/OiBudW1iZXIpOiBOZ2JEYXRlO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdlZWsgbnVtYmVyIGZvciBhIGdpdmVuIHdlZWsuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRXZWVrTnVtYmVyKHdlZWs6IE5nYkRhdGVbXSwgZmlyc3REYXlPZldlZWs6IG51bWJlcik6IG51bWJlcjtcblxuICAvKipcbiAgICogUmV0dXJucyB0b2RheSdzIGRhdGUuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRUb2RheSgpOiBOZ2JEYXRlO1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYSBkYXRlIGlzIHZhbGlkIGZvciBhIGN1cnJlbnQgY2FsZW5kYXIuXG4gICAqL1xuICBhYnN0cmFjdCBpc1ZhbGlkKGRhdGU6IE5nYkRhdGUpOiBib29sZWFuO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiQ2FsZW5kYXJHcmVnb3JpYW4gZXh0ZW5kcyBOZ2JDYWxlbmRhciB7XG4gIGdldERheXNQZXJXZWVrKCkgeyByZXR1cm4gNzsgfVxuXG4gIGdldE1vbnRocygpIHsgcmV0dXJuIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyXTsgfVxuXG4gIGdldFdlZWtzUGVyTW9udGgoKSB7IHJldHVybiA2OyB9XG5cbiAgZ2V0TmV4dChkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkge1xuICAgIGxldCBqc0RhdGUgPSB0b0pTRGF0ZShkYXRlKTtcblxuICAgIHN3aXRjaCAocGVyaW9kKSB7XG4gICAgICBjYXNlICd5JzpcbiAgICAgICAgcmV0dXJuIG5ldyBOZ2JEYXRlKGRhdGUueWVhciArIG51bWJlciwgMSwgMSk7XG4gICAgICBjYXNlICdtJzpcbiAgICAgICAganNEYXRlID0gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoICsgbnVtYmVyIC0gMSwgMSwgMTIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2QnOlxuICAgICAgICBqc0RhdGUuc2V0RGF0ZShqc0RhdGUuZ2V0RGF0ZSgpICsgbnVtYmVyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnJvbUpTRGF0ZShqc0RhdGUpO1xuICB9XG5cbiAgZ2V0UHJldihkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkgeyByZXR1cm4gdGhpcy5nZXROZXh0KGRhdGUsIHBlcmlvZCwgLW51bWJlcik7IH1cblxuICBnZXRXZWVrZGF5KGRhdGU6IE5nYkRhdGUpIHtcbiAgICBsZXQganNEYXRlID0gdG9KU0RhdGUoZGF0ZSk7XG4gICAgbGV0IGRheSA9IGpzRGF0ZS5nZXREYXkoKTtcbiAgICAvLyBpbiBKUyBEYXRlIFN1bj0wLCBpbiBJU08gODYwMSBTdW49N1xuICAgIHJldHVybiBkYXkgPT09IDAgPyA3IDogZGF5O1xuICB9XG5cbiAgZ2V0V2Vla051bWJlcih3ZWVrOiBOZ2JEYXRlW10sIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpIHtcbiAgICAvLyBpbiBKUyBEYXRlIFN1bj0wLCBpbiBJU08gODYwMSBTdW49N1xuICAgIGlmIChmaXJzdERheU9mV2VlayA9PT0gNykge1xuICAgICAgZmlyc3REYXlPZldlZWsgPSAwO1xuICAgIH1cblxuICAgIGNvbnN0IHRodXJzZGF5SW5kZXggPSAoNCArIDcgLSBmaXJzdERheU9mV2VlaykgJSA3O1xuICAgIGxldCBkYXRlID0gd2Vla1t0aHVyc2RheUluZGV4XTtcblxuICAgIGNvbnN0IGpzRGF0ZSA9IHRvSlNEYXRlKGRhdGUpO1xuICAgIGpzRGF0ZS5zZXREYXRlKGpzRGF0ZS5nZXREYXRlKCkgKyA0IC0gKGpzRGF0ZS5nZXREYXkoKSB8fCA3KSk7ICAvLyBUaHVyc2RheVxuICAgIGNvbnN0IHRpbWUgPSBqc0RhdGUuZ2V0VGltZSgpO1xuICAgIGpzRGF0ZS5zZXRNb250aCgwKTsgIC8vIENvbXBhcmUgd2l0aCBKYW4gMVxuICAgIGpzRGF0ZS5zZXREYXRlKDEpO1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucm91bmQoKHRpbWUgLSBqc0RhdGUuZ2V0VGltZSgpKSAvIDg2NDAwMDAwKSAvIDcpICsgMTtcbiAgfVxuXG4gIGdldFRvZGF5KCk6IE5nYkRhdGUgeyByZXR1cm4gZnJvbUpTRGF0ZShuZXcgRGF0ZSgpKTsgfVxuXG4gIGlzVmFsaWQoZGF0ZTogTmdiRGF0ZSk6IGJvb2xlYW4ge1xuICAgIGlmICghZGF0ZSB8fCAhaXNJbnRlZ2VyKGRhdGUueWVhcikgfHwgIWlzSW50ZWdlcihkYXRlLm1vbnRoKSB8fCAhaXNJbnRlZ2VyKGRhdGUuZGF5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIHllYXIgMCBkb2Vzbid0IGV4aXN0IGluIEdyZWdvcmlhbiBjYWxlbmRhclxuICAgIGlmIChkYXRlLnllYXIgPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBqc0RhdGUgPSB0b0pTRGF0ZShkYXRlKTtcblxuICAgIHJldHVybiAhaXNOYU4oanNEYXRlLmdldFRpbWUoKSkgJiYganNEYXRlLmdldEZ1bGxZZWFyKCkgPT09IGRhdGUueWVhciAmJiBqc0RhdGUuZ2V0TW9udGgoKSArIDEgPT09IGRhdGUubW9udGggJiZcbiAgICAgICAganNEYXRlLmdldERhdGUoKSA9PT0gZGF0ZS5kYXk7XG4gIH1cbn1cbiJdfQ==