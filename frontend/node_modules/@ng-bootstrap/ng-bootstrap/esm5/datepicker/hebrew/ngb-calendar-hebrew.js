/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgbDate } from '../ngb-date';
import { fromJSDate, NgbCalendar, toJSDate } from '../ngb-calendar';
import { Injectable } from '@angular/core';
import { isNumber } from '../../util/util';
import { fromGregorian, getDayNumberInHebrewYear, getDaysInHebrewMonth, isHebrewLeapYear, toGregorian, setHebrewDay, setHebrewMonth } from './hebrew';
/**
 * \@since 3.2.0
 */
var NgbCalendarHebrew = /** @class */ (function (_super) {
    tslib_1.__extends(NgbCalendarHebrew, _super);
    function NgbCalendarHebrew() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getDaysPerWeek = /**
     * @return {?}
     */
    function () { return 7; };
    /**
     * @param {?=} year
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getMonths = /**
     * @param {?=} year
     * @return {?}
     */
    function (year) {
        if (year && isHebrewLeapYear(year)) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        }
        else {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }
    };
    /**
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getWeeksPerMonth = /**
     * @return {?}
     */
    function () { return 6; };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbCalendarHebrew.prototype.isValid = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var b = date && isNumber(date.year) && isNumber(date.month) && isNumber(date.day);
        b = b && date.month > 0 && date.month <= (isHebrewLeapYear(date.year) ? 13 : 12);
        b = b && date.day > 0 && date.day <= getDaysInHebrewMonth(date.month, date.year);
        return b && !isNaN(toGregorian(date).getTime());
    };
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getNext = /**
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
                date.year += number;
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = setHebrewMonth(date, number);
                date.day = 1;
                return date;
            case 'd':
                return setHebrewDay(date, number);
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
    NgbCalendarHebrew.prototype.getPrev = /**
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
    NgbCalendarHebrew.prototype.getWeekday = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var day = toGregorian(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    };
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getWeekNumber = /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    function (week, firstDayOfWeek) {
        /** @type {?} */
        var date = week[week.length - 1];
        return Math.ceil(getDayNumberInHebrewYear(date) / 7);
    };
    /**
     * @return {?}
     */
    NgbCalendarHebrew.prototype.getToday = /**
     * @return {?}
     */
    function () { return fromGregorian(new Date()); };
    /**
     * @since 3.4.0
     */
    /**
     * \@since 3.4.0
     * @param {?} date
     * @return {?}
     */
    NgbCalendarHebrew.prototype.toGregorian = /**
     * \@since 3.4.0
     * @param {?} date
     * @return {?}
     */
    function (date) { return fromJSDate(toGregorian(date)); };
    /**
     * @since 3.4.0
     */
    /**
     * \@since 3.4.0
     * @param {?} date
     * @return {?}
     */
    NgbCalendarHebrew.prototype.fromGregorian = /**
     * \@since 3.4.0
     * @param {?} date
     * @return {?}
     */
    function (date) { return fromGregorian(toJSDate(date)); };
    NgbCalendarHebrew.decorators = [
        { type: Injectable }
    ];
    return NgbCalendarHebrew;
}(NgbCalendar));
export { NgbCalendarHebrew };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWNhbGVuZGFyLWhlYnJldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9oZWJyZXcvbmdiLWNhbGVuZGFyLWhlYnJldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDcEMsT0FBTyxFQUFDLFVBQVUsRUFBRSxXQUFXLEVBQWEsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0UsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNMLGFBQWEsRUFDYix3QkFBd0IsRUFDeEIsb0JBQW9CLEVBQ3BCLGdCQUFnQixFQUNoQixXQUFXLEVBQ1gsWUFBWSxFQUNaLGNBQWMsRUFDZixNQUFNLFVBQVUsQ0FBQzs7OztBQUtsQjtJQUN1Qyw2Q0FBVztJQURsRDs7SUFpRUEsQ0FBQzs7OztJQS9EQywwQ0FBYzs7O0lBQWQsY0FBbUIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUU5QixxQ0FBUzs7OztJQUFULFVBQVUsSUFBYTtRQUNyQixJQUFJLElBQUksSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNsQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDcEQ7YUFBTTtZQUNMLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxF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dkQsQ0FBQzs7OztJQUVELG9DQUFROzs7SUFBUixjQUFzQixPQUFPLGFBQWEsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXpEOztPQUVHOzs7Ozs7SUFDSCx1Q0FBVzs7Ozs7SUFBWCxVQUFZLElBQWEsSUFBYSxPQUFPLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFN0U7O09BRUc7Ozs7OztJQUNILHlDQUFhOzs7OztJQUFiLFVBQWMsSUFBYSxJQUFhLE9BQU8sYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBaEVoRixVQUFVOztJQWlFWCx3QkFBQztDQUFBLEFBakVELENBQ3VDLFdBQVcsR0FnRWpEO1NBaEVZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi4vbmdiLWRhdGUnO1xuaW1wb3J0IHtmcm9tSlNEYXRlLCBOZ2JDYWxlbmRhciwgTmdiUGVyaW9kLCB0b0pTRGF0ZX0gZnJvbSAnLi4vbmdiLWNhbGVuZGFyJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2lzTnVtYmVyfSBmcm9tICcuLi8uLi91dGlsL3V0aWwnO1xuaW1wb3J0IHtcbiAgZnJvbUdyZWdvcmlhbixcbiAgZ2V0RGF5TnVtYmVySW5IZWJyZXdZZWFyLFxuICBnZXREYXlzSW5IZWJyZXdNb250aCxcbiAgaXNIZWJyZXdMZWFwWWVhcixcbiAgdG9HcmVnb3JpYW4sXG4gIHNldEhlYnJld0RheSxcbiAgc2V0SGVicmV3TW9udGhcbn0gZnJvbSAnLi9oZWJyZXcnO1xuXG4vKipcbiAqIEBzaW5jZSAzLjIuMFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiQ2FsZW5kYXJIZWJyZXcgZXh0ZW5kcyBOZ2JDYWxlbmRhciB7XG4gIGdldERheXNQZXJXZWVrKCkgeyByZXR1cm4gNzsgfVxuXG4gIGdldE1vbnRocyh5ZWFyPzogbnVtYmVyKSB7XG4gICAgaWYgKHllYXIgJiYgaXNIZWJyZXdMZWFwWWVhcih5ZWFyKSkge1xuICAgICAgcmV0dXJuIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxM107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMl07XG4gICAgfVxuICB9XG5cbiAgZ2V0V2Vla3NQZXJNb250aCgpIHsgcmV0dXJuIDY7IH1cblxuICBpc1ZhbGlkKGRhdGU6IE5nYkRhdGUpOiBib29sZWFuIHtcbiAgICBsZXQgYiA9IGRhdGUgJiYgaXNOdW1iZXIoZGF0ZS55ZWFyKSAmJiBpc051bWJlcihkYXRlLm1vbnRoKSAmJiBpc051bWJlcihkYXRlLmRheSk7XG4gICAgYiA9IGIgJiYgZGF0ZS5tb250aCA+IDAgJiYgZGF0ZS5tb250aCA8PSAoaXNIZWJyZXdMZWFwWWVhcihkYXRlLnllYXIpID8gMTMgOiAxMik7XG4gICAgYiA9IGIgJiYgZGF0ZS5kYXkgPiAwICYmIGRhdGUuZGF5IDw9IGdldERheXNJbkhlYnJld01vbnRoKGRhdGUubW9udGgsIGRhdGUueWVhcik7XG4gICAgcmV0dXJuIGIgJiYgIWlzTmFOKHRvR3JlZ29yaWFuKGRhdGUpLmdldFRpbWUoKSk7XG4gIH1cblxuICBnZXROZXh0KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7XG4gICAgZGF0ZSA9IG5ldyBOZ2JEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgZGF0ZS5kYXkpO1xuXG4gICAgc3dpdGNoIChwZXJpb2QpIHtcbiAgICAgIGNhc2UgJ3knOlxuICAgICAgICBkYXRlLnllYXIgKz0gbnVtYmVyO1xuICAgICAgICBkYXRlLm1vbnRoID0gMTtcbiAgICAgICAgZGF0ZS5kYXkgPSAxO1xuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgIGNhc2UgJ20nOlxuICAgICAgICBkYXRlID0gc2V0SGVicmV3TW9udGgoZGF0ZSwgbnVtYmVyKTtcbiAgICAgICAgZGF0ZS5kYXkgPSAxO1xuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgIGNhc2UgJ2QnOlxuICAgICAgICByZXR1cm4gc2V0SGVicmV3RGF5KGRhdGUsIG51bWJlcik7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG4gIH1cblxuICBnZXRQcmV2KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7IHJldHVybiB0aGlzLmdldE5leHQoZGF0ZSwgcGVyaW9kLCAtbnVtYmVyKTsgfVxuXG4gIGdldFdlZWtkYXkoZGF0ZTogTmdiRGF0ZSkge1xuICAgIGNvbnN0IGRheSA9IHRvR3JlZ29yaWFuKGRhdGUpLmdldERheSgpO1xuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XG4gICAgcmV0dXJuIGRheSA9PT0gMCA/IDcgOiBkYXk7XG4gIH1cblxuICBnZXRXZWVrTnVtYmVyKHdlZWs6IE5nYkRhdGVbXSwgZmlyc3REYXlPZldlZWs6IG51bWJlcikge1xuICAgIGNvbnN0IGRhdGUgPSB3ZWVrW3dlZWsubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIE1hdGguY2VpbChnZXREYXlOdW1iZXJJbkhlYnJld1llYXIoZGF0ZSkgLyA3KTtcbiAgfVxuXG4gIGdldFRvZGF5KCk6IE5nYkRhdGUgeyByZXR1cm4gZnJvbUdyZWdvcmlhbihuZXcgRGF0ZSgpKTsgfVxuXG4gIC8qKlxuICAgKiBAc2luY2UgMy40LjBcbiAgICovXG4gIHRvR3JlZ29yaWFuKGRhdGU6IE5nYkRhdGUpOiBOZ2JEYXRlIHsgcmV0dXJuIGZyb21KU0RhdGUodG9HcmVnb3JpYW4oZGF0ZSkpOyB9XG5cbiAgLyoqXG4gICAqIEBzaW5jZSAzLjQuMFxuICAgKi9cbiAgZnJvbUdyZWdvcmlhbihkYXRlOiBOZ2JEYXRlKTogTmdiRGF0ZSB7IHJldHVybiBmcm9tR3JlZ29yaWFuKHRvSlNEYXRlKGRhdGUpKTsgfVxufVxuIl19