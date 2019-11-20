/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgbCalendarHijri } from './ngb-calendar-hijri';
import { NgbDate } from '../ngb-date';
import { Injectable } from '@angular/core';
/**
 * Checks if islamic year is a leap year
 * @param {?} hYear
 * @return {?}
 */
function isIslamicLeapYear(hYear) {
    return (14 + 11 * hYear) % 30 < 11;
}
/**
 * Checks if gregorian years is a leap year
 * @param {?} gDate
 * @return {?}
 */
function isGregorianLeapYear(gDate) {
    /** @type {?} */
    var year = gDate.getFullYear();
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
/**
 * Returns the start of Hijri Month.
 * `hMonth` is 0 for Muharram, 1 for Safar, etc.
 * `hYear` is any Hijri hYear.
 * @param {?} hYear
 * @param {?} hMonth
 * @return {?}
 */
function getIslamicMonthStart(hYear, hMonth) {
    return Math.ceil(29.5 * hMonth) + (hYear - 1) * 354 + Math.floor((3 + 11 * hYear) / 30.0);
}
/**
 * Returns the start of Hijri year.
 * `year` is any Hijri year.
 * @param {?} year
 * @return {?}
 */
function getIslamicYearStart(year) {
    return (year - 1) * 354 + Math.floor((3 + 11 * year) / 30.0);
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function mod(a, b) {
    return a - b * Math.floor(a / b);
}
/**
 * The civil calendar is one type of Hijri calendars used in islamic countries.
 * Uses a fixed cycle of alternating 29- and 30-day months,
 * with a leap day added to the last month of 11 out of every 30 years.
 * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
 * All the calculations here are based on the equations from "Calendrical Calculations" By Edward M. Reingold, Nachum
 * Dershowitz.
 * @type {?}
 */
var GREGORIAN_EPOCH = 1721425.5;
/** @type {?} */
var ISLAMIC_EPOCH = 1948439.5;
var NgbCalendarIslamicCivil = /** @class */ (function (_super) {
    tslib_1.__extends(NgbCalendarIslamicCivil, _super);
    function NgbCalendarIslamicCivil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns the equivalent islamic(civil) date value for a give input Gregorian date.
     * `gDate` is a JS Date to be converted to Hijri.
     */
    /**
     * Returns the equivalent islamic(civil) date value for a give input Gregorian date.
     * `gDate` is a JS Date to be converted to Hijri.
     * @param {?} gDate
     * @return {?}
     */
    NgbCalendarIslamicCivil.prototype.fromGregorian = /**
     * Returns the equivalent islamic(civil) date value for a give input Gregorian date.
     * `gDate` is a JS Date to be converted to Hijri.
     * @param {?} gDate
     * @return {?}
     */
    function (gDate) {
        /** @type {?} */
        var gYear = gDate.getFullYear();
        /** @type {?} */
        var gMonth = gDate.getMonth();
        /** @type {?} */
        var gDay = gDate.getDate();
        /** @type {?} */
        var julianDay = GREGORIAN_EPOCH - 1 + 365 * (gYear - 1) + Math.floor((gYear - 1) / 4) +
            -Math.floor((gYear - 1) / 100) + Math.floor((gYear - 1) / 400) +
            Math.floor((367 * (gMonth + 1) - 362) / 12 + (gMonth + 1 <= 2 ? 0 : isGregorianLeapYear(gDate) ? -1 : -2) + gDay);
        julianDay = Math.floor(julianDay) + 0.5;
        /** @type {?} */
        var days = julianDay - ISLAMIC_EPOCH;
        /** @type {?} */
        var hYear = Math.floor((30 * days + 10646) / 10631.0);
        /** @type {?} */
        var hMonth = Math.ceil((days - 29 - getIslamicYearStart(hYear)) / 29.5);
        hMonth = Math.min(hMonth, 11);
        /** @type {?} */
        var hDay = Math.ceil(days - getIslamicMonthStart(hYear, hMonth)) + 1;
        return new NgbDate(hYear, hMonth + 1, hDay);
    };
    /**
     * Returns the equivalent JS date value for a give input islamic(civil) date.
     * `hDate` is an islamic(civil) date to be converted to Gregorian.
     */
    /**
     * Returns the equivalent JS date value for a give input islamic(civil) date.
     * `hDate` is an islamic(civil) date to be converted to Gregorian.
     * @param {?} hDate
     * @return {?}
     */
    NgbCalendarIslamicCivil.prototype.toGregorian = /**
     * Returns the equivalent JS date value for a give input islamic(civil) date.
     * `hDate` is an islamic(civil) date to be converted to Gregorian.
     * @param {?} hDate
     * @return {?}
     */
    function (hDate) {
        /** @type {?} */
        var hYear = hDate.year;
        /** @type {?} */
        var hMonth = hDate.month - 1;
        /** @type {?} */
        var hDay = hDate.day;
        /** @type {?} */
        var julianDay = hDay + Math.ceil(29.5 * hMonth) + (hYear - 1) * 354 + Math.floor((3 + 11 * hYear) / 30) + ISLAMIC_EPOCH - 1;
        /** @type {?} */
        var wjd = Math.floor(julianDay - 0.5) + 0.5;
        /** @type {?} */
        var depoch = wjd - GREGORIAN_EPOCH;
        /** @type {?} */
        var quadricent = Math.floor(depoch / 146097);
        /** @type {?} */
        var dqc = mod(depoch, 146097);
        /** @type {?} */
        var cent = Math.floor(dqc / 36524);
        /** @type {?} */
        var dcent = mod(dqc, 36524);
        /** @type {?} */
        var quad = Math.floor(dcent / 1461);
        /** @type {?} */
        var dquad = mod(dcent, 1461);
        /** @type {?} */
        var yindex = Math.floor(dquad / 365);
        /** @type {?} */
        var year = quadricent * 400 + cent * 100 + quad * 4 + yindex;
        if (!(cent === 4 || yindex === 4)) {
            year++;
        }
        /** @type {?} */
        var gYearStart = GREGORIAN_EPOCH + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400);
        /** @type {?} */
        var yearday = wjd - gYearStart;
        /** @type {?} */
        var tjd = GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400) + Math.floor(739 / 12 + (isGregorianLeapYear(new Date(year, 3, 1)) ? -1 : -2) + 1);
        /** @type {?} */
        var leapadj = wjd < tjd ? 0 : isGregorianLeapYear(new Date(year, 3, 1)) ? 1 : 2;
        /** @type {?} */
        var month = Math.floor(((yearday + leapadj) * 12 + 373) / 367);
        /** @type {?} */
        var tjd2 = GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400) +
            Math.floor((367 * month - 362) / 12 + (month <= 2 ? 0 : isGregorianLeapYear(new Date(year, month - 1, 1)) ? -1 : -2) +
                1);
        /** @type {?} */
        var day = wjd - tjd2 + 1;
        return new Date(year, month - 1, day);
    };
    /**
     * Returns the number of days in a specific Hijri month.
     * `month` is 1 for Muharram, 2 for Safar, etc.
     * `year` is any Hijri year.
     */
    /**
     * Returns the number of days in a specific Hijri month.
     * `month` is 1 for Muharram, 2 for Safar, etc.
     * `year` is any Hijri year.
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    NgbCalendarIslamicCivil.prototype.getDaysPerMonth = /**
     * Returns the number of days in a specific Hijri month.
     * `month` is 1 for Muharram, 2 for Safar, etc.
     * `year` is any Hijri year.
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    function (month, year) {
        year = year + Math.floor(month / 13);
        month = ((month - 1) % 12) + 1;
        /** @type {?} */
        var length = 29 + month % 2;
        if (month === 12 && isIslamicLeapYear(year)) {
            length++;
        }
        return length;
    };
    NgbCalendarIslamicCivil.decorators = [
        { type: Injectable }
    ];
    return NgbCalendarIslamicCivil;
}(NgbCalendarHijri));
export { NgbCalendarIslamicCivil };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWNhbGVuZGFyLWlzbGFtaWMtY2l2aWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXIvaGlqcmkvbmdiLWNhbGVuZGFyLWlzbGFtaWMtY2l2aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7OztBQUt6QyxTQUFTLGlCQUFpQixDQUFDLEtBQWE7SUFDdEMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUNyQyxDQUFDOzs7Ozs7QUFLRCxTQUFTLG1CQUFtQixDQUFDLEtBQVc7O1FBQ2hDLElBQUksR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFO0lBQ2hDLE9BQU8sSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDaEUsQ0FBQzs7Ozs7Ozs7O0FBT0QsU0FBUyxvQkFBb0IsQ0FBQyxLQUFhLEVBQUUsTUFBYztJQUN6RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUM1RixDQUFDOzs7Ozs7O0FBTUQsU0FBUyxtQkFBbUIsQ0FBQyxJQUFZO0lBQ3ZDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsQ0FB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LENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxhQUFhLEdBQUcsQ0FBQzs7WUFFekcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUc7O1lBQUUsTUFBTSxHQUFHLEdBQUcsR0FBRyxlQUFlOztZQUN2RSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztZQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQzs7WUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDOztZQUNuRyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUM7O1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzs7WUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7O1lBQ2xGLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7O1lBQ2xDLElBQUksR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxNQUFNO1FBQzVELElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2pDLElBQUksRUFBRSxDQUFDO1NBQ1I7O1lBRUssVUFBVSxHQUFHLGVBQWUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUM3RyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQzs7WUFFMUIsT0FBTyxHQUFHLEdBQUcsR0FBRyxVQUFVOztZQUUxQixHQUFHLEdBQUcsZUFBZSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUMxRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLG1CQUFtQixDQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztZQUU3RyxPQUFPLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFFM0UsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDOztZQUMxRCxJQUFJLEdBQUcsZUFBZSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUMzRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxDQUNOLENBQUMsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekcsQ0FBQyxDQUFDOztZQUVKLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUM7UUFFMUIsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7O0lBQ0gsaURBQWU7Ozs7Ozs7O0lBQWYsVUFBZ0IsS0FBYSxFQUFFLElBQVk7UUFDekMsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNyQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7O1lBQzNCLE1BQU0sR0FBRyxFQUFFLEdBQUcsS0FBSyxHQUFHLENBQUM7UUFDM0IsSUFBSSxLQUFLLEtBQUssRUFBRSxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzNDLE1BQU0sRUFBRSxDQUFDO1NBQ1Y7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOztnQkE5RUYsVUFBVTs7SUErRVgsOEJBQUM7Q0FBQSxBQS9FRCxDQUM2QyxnQkFBZ0IsR0E4RTVEO1NBOUVZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdiQ2FsZW5kYXJIaWpyaX0gZnJvbSAnLi9uZ2ItY2FsZW5kYXItaGlqcmknO1xuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuLi9uZ2ItZGF0ZSc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIENoZWNrcyBpZiBpc2xhbWljIHllYXIgaXMgYSBsZWFwIHllYXJcbiAqL1xuZnVuY3Rpb24gaXNJc2xhbWljTGVhcFllYXIoaFllYXI6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gKDE0ICsgMTEgKiBoWWVhcikgJSAzMCA8IDExO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBncmVnb3JpYW4geWVhcnMgaXMgYSBsZWFwIHllYXJcbiAqL1xuZnVuY3Rpb24gaXNHcmVnb3JpYW5MZWFwWWVhcihnRGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xuICBjb25zdCB5ZWFyID0gZ0RhdGUuZ2V0RnVsbFllYXIoKTtcbiAgcmV0dXJuIHllYXIgJSA0ID09PSAwICYmIHllYXIgJSAxMDAgIT09IDAgfHwgeWVhciAlIDQwMCA9PT0gMDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzdGFydCBvZiBIaWpyaSBNb250aC5cbiAqIGBoTW9udGhgIGlzIDAgZm9yIE11aGFycmFtLCAxIGZvciBTYWZhciwgZXRjLlxuICogYGhZZWFyYCBpcyBhbnkgSGlqcmkgaFllYXIuXG4gKi9cbmZ1bmN0aW9uIGdldElzbGFtaWNNb250aFN0YXJ0KGhZZWFyOiBudW1iZXIsIGhNb250aDogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGguY2VpbCgyOS41ICogaE1vbnRoKSArIChoWWVhciAtIDEpICogMzU0ICsgTWF0aC5mbG9vcigoMyArIDExICogaFllYXIpIC8gMzAuMCk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgc3RhcnQgb2YgSGlqcmkgeWVhci5cbiAqIGB5ZWFyYCBpcyBhbnkgSGlqcmkgeWVhci5cbiAqL1xuZnVuY3Rpb24gZ2V0SXNsYW1pY1llYXJTdGFydCh5ZWFyOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gKHllYXIgLSAxKSAqIDM1NCArIE1hdGguZmxvb3IoKDMgKyAxMSAqIHllYXIpIC8gMzAuMCk7XG59XG5cbmZ1bmN0aW9uIG1vZChhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBhIC0gYiAqIE1hdGguZmxvb3IoYSAvIGIpO1xufVxuXG4vKipcbiAqIFRoZSBjaXZpbCBjYWxlbmRhciBpcyBvbmUgdHlwZSBvZiBIaWpyaSBjYWxlbmRhcnMgdXNlZCBpbiBpc2xhbWljIGNvdW50cmllcy5cbiAqIFVzZXMgYSBmaXhlZCBjeWNsZSBvZiBhbHRlcm5hdGluZyAyOS0gYW5kIDMwLWRheSBtb250aHMsXG4gKiB3aXRoIGEgbGVhcCBkYXkgYWRkZWQgdG8gdGhlIGxhc3QgbW9udGggb2YgMTEgb3V0IG9mIGV2ZXJ5IDMwIHllYXJzLlxuICogaHR0cDovL2NsZHIudW5pY29kZS5vcmcvZGV2ZWxvcG1lbnQvZGV2ZWxvcG1lbnQtcHJvY2Vzcy9kZXNpZ24tcHJvcG9zYWxzL2lzbGFtaWMtY2FsZW5kYXItdHlwZXNcbiAqIEFsbCB0aGUgY2FsY3VsYXRpb25zIGhlcmUgYXJlIGJhc2VkIG9uIHRoZSBlcXVhdGlvbnMgZnJvbSBcIkNhbGVuZHJpY2FsIENhbGN1bGF0aW9uc1wiIEJ5IEVkd2FyZCBNLiBSZWluZ29sZCwgTmFjaHVtXG4gKiBEZXJzaG93aXR6LlxuICovXG5cbmNvbnN0IEdSRUdPUklBTl9FUE9DSCA9IDE3MjE0MjUuNTtcbmNvbnN0IElTTEFNSUNfRVBPQ0ggPSAxOTQ4NDM5LjU7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JDYWxlbmRhcklzbGFtaWNDaXZpbCBleHRlbmRzIE5nYkNhbGVuZGFySGlqcmkge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgZXF1aXZhbGVudCBpc2xhbWljKGNpdmlsKSBkYXRlIHZhbHVlIGZvciBhIGdpdmUgaW5wdXQgR3JlZ29yaWFuIGRhdGUuXG4gICAqIGBnRGF0ZWAgaXMgYSBKUyBEYXRlIHRvIGJlIGNvbnZlcnRlZCB0byBIaWpyaS5cbiAgICovXG4gIGZyb21HcmVnb3JpYW4oZ0RhdGU6IERhdGUpOiBOZ2JEYXRlIHtcbiAgICBjb25zdCBnWWVhciA9IGdEYXRlLmdldEZ1bGxZZWFyKCksIGdNb250aCA9IGdEYXRlLmdldE1vbnRoKCksIGdEYXkgPSBnRGF0ZS5nZXREYXRlKCk7XG5cbiAgICBsZXQganVsaWFuRGF5ID0gR1JFR09SSUFOX0VQT0NIIC0gMSArIDM2NSAqIChnWWVhciAtIDEpICsgTWF0aC5mbG9vcigoZ1llYXIgLSAxKSAvIDQpICtcbiAgICAgICAgLU1hdGguZmxvb3IoKGdZZWFyIC0gMSkgLyAxMDApICsgTWF0aC5mbG9vcigoZ1llYXIgLSAxKSAvIDQwMCkgK1xuICAgICAgICBNYXRoLmZsb29yKFxuICAgICAgICAgICAgKDM2NyAqIChnTW9udGggKyAxKSAtIDM2MikgLyAxMiArIChnTW9udGggKyAxIDw9IDIgPyAwIDogaXNHcmVnb3JpYW5MZWFwWWVhcihnRGF0ZSkgPyAtMSA6IC0yKSArIGdEYXkpO1xuICAgIGp1bGlhbkRheSA9IE1hdGguZmxvb3IoanVsaWFuRGF5KSArIDAuNTtcblxuICAgIGNvbnN0IGRheXMgPSBqdWxpYW5EYXkgLSBJU0xBTUlDX0VQT0NIO1xuICAgIGNvbnN0IGhZZWFyID0gTWF0aC5mbG9vcigoMzAgKiBkYXlzICsgMTA2NDYpIC8gMTA2MzEuMCk7XG4gICAgbGV0IGhNb250aCA9IE1hdGguY2VpbCgoZGF5cyAtIDI5IC0gZ2V0SXNsYW1pY1llYXJTdGFydChoWWVhcikpIC8gMjkuNSk7XG4gICAgaE1vbnRoID0gTWF0aC5taW4oaE1vbnRoLCAxMSk7XG4gICAgY29uc3QgaERheSA9IE1hdGguY2VpbChkYXlzIC0gZ2V0SXNsYW1pY01vbnRoU3RhcnQoaFllYXIsIGhNb250aCkpICsgMTtcbiAgICByZXR1cm4gbmV3IE5nYkRhdGUoaFllYXIsIGhNb250aCArIDEsIGhEYXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVxdWl2YWxlbnQgSlMgZGF0ZSB2YWx1ZSBmb3IgYSBnaXZlIGlucHV0IGlzbGFtaWMoY2l2aWwpIGRhdGUuXG4gICAqIGBoRGF0ZWAgaXMgYW4gaXNsYW1pYyhjaXZpbCkgZGF0ZSB0byBiZSBjb252ZXJ0ZWQgdG8gR3JlZ29yaWFuLlxuICAgKi9cbiAgdG9HcmVnb3JpYW4oaERhdGU6IE5nYkRhdGUpOiBEYXRlIHtcbiAgICBjb25zdCBoWWVhciA9IGhEYXRlLnllYXI7XG4gICAgY29uc3QgaE1vbnRoID0gaERhdGUubW9udGggLSAxO1xuICAgIGNvbnN0IGhEYXkgPSBoRGF0ZS5kYXk7XG4gICAgY29uc3QganVsaWFuRGF5ID1cbiAgICAgICAgaERheSArIE1hdGguY2VpbCgyOS41ICogaE1vbnRoKSArIChoWWVhciAtIDEpICogMzU0ICsgTWF0aC5mbG9vcigoMyArIDExICogaFllYXIpIC8gMzApICsgSVNMQU1JQ19FUE9DSCAtIDE7XG5cbiAgICBjb25zdCB3amQgPSBNYXRoLmZsb29yKGp1bGlhbkRheSAtIDAuNSkgKyAwLjUsIGRlcG9jaCA9IHdqZCAtIEdSRUdPUklBTl9FUE9DSCxcbiAgICAgICAgICBxdWFkcmljZW50ID0gTWF0aC5mbG9vcihkZXBvY2ggLyAxNDYwOTcpLCBkcWMgPSBtb2QoZGVwb2NoLCAxNDYwOTcpLCBjZW50ID0gTWF0aC5mbG9vcihkcWMgLyAzNjUyNCksXG4gICAgICAgICAgZGNlbnQgPSBtb2QoZHFjLCAzNjUyNCksIHF1YWQgPSBNYXRoLmZsb29yKGRjZW50IC8gMTQ2MSksIGRxdWFkID0gbW9kKGRjZW50LCAxNDYxKSxcbiAgICAgICAgICB5aW5kZXggPSBNYXRoLmZsb29yKGRxdWFkIC8gMzY1KTtcbiAgICBsZXQgeWVhciA9IHF1YWRyaWNlbnQgKiA0MDAgKyBjZW50ICogMTAwICsgcXVhZCAqIDQgKyB5aW5kZXg7XG4gICAgaWYgKCEoY2VudCA9PT0gNCB8fCB5aW5kZXggPT09IDQpKSB7XG4gICAgICB5ZWFyKys7XG4gICAgfVxuXG4gICAgY29uc3QgZ1llYXJTdGFydCA9IEdSRUdPUklBTl9FUE9DSCArIDM2NSAqICh5ZWFyIC0gMSkgKyBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyA0KSAtIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDEwMCkgK1xuICAgICAgICBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyA0MDApO1xuXG4gICAgY29uc3QgeWVhcmRheSA9IHdqZCAtIGdZZWFyU3RhcnQ7XG5cbiAgICBjb25zdCB0amQgPSBHUkVHT1JJQU5fRVBPQ0ggLSAxICsgMzY1ICogKHllYXIgLSAxKSArIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDQpIC0gTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gMTAwKSArXG4gICAgICAgIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDQwMCkgKyBNYXRoLmZsb29yKDczOSAvIDEyICsgKGlzR3JlZ29yaWFuTGVhcFllYXIobmV3IERhdGUoeWVhciwgMywgMSkpID8gLTEgOiAtMikgKyAxKTtcblxuICAgIGNvbnN0IGxlYXBhZGogPSB3amQgPCB0amQgPyAwIDogaXNHcmVnb3JpYW5MZWFwWWVhcihuZXcgRGF0ZSh5ZWFyLCAzLCAxKSkgPyAxIDogMjtcblxuICAgIGNvbnN0IG1vbnRoID0gTWF0aC5mbG9vcigoKHllYXJkYXkgKyBsZWFwYWRqKSAqIDEyICsgMzczKSAvIDM2Nyk7XG4gICAgY29uc3QgdGpkMiA9IEdSRUdPUklBTl9FUE9DSCAtIDEgKyAzNjUgKiAoeWVhciAtIDEpICsgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNCkgLSBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyAxMDApICtcbiAgICAgICAgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNDAwKSArXG4gICAgICAgIE1hdGguZmxvb3IoXG4gICAgICAgICAgICAoMzY3ICogbW9udGggLSAzNjIpIC8gMTIgKyAobW9udGggPD0gMiA/IDAgOiBpc0dyZWdvcmlhbkxlYXBZZWFyKG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgMSkpID8gLTEgOiAtMikgK1xuICAgICAgICAgICAgMSk7XG5cbiAgICBjb25zdCBkYXkgPSB3amQgLSB0amQyICsgMTtcblxuICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGRheXMgaW4gYSBzcGVjaWZpYyBIaWpyaSBtb250aC5cbiAgICogYG1vbnRoYCBpcyAxIGZvciBNdWhhcnJhbSwgMiBmb3IgU2FmYXIsIGV0Yy5cbiAgICogYHllYXJgIGlzIGFueSBIaWpyaSB5ZWFyLlxuICAgKi9cbiAgZ2V0RGF5c1Blck1vbnRoKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcik6IG51bWJlciB7XG4gICAgeWVhciA9IHllYXIgKyBNYXRoLmZsb29yKG1vbnRoIC8gMTMpO1xuICAgIG1vbnRoID0gKChtb250aCAtIDEpICUgMTIpICsgMTtcbiAgICBsZXQgbGVuZ3RoID0gMjkgKyBtb250aCAlIDI7XG4gICAgaWYgKG1vbnRoID09PSAxMiAmJiBpc0lzbGFtaWNMZWFwWWVhcih5ZWFyKSkge1xuICAgICAgbGVuZ3RoKys7XG4gICAgfVxuICAgIHJldHVybiBsZW5ndGg7XG4gIH1cbn1cbiJdfQ==