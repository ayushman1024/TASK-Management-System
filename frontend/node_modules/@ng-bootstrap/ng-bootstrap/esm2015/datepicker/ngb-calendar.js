/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
    const jsDate = new Date(date.year, date.month - 1, date.day, 12);
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
export class NgbCalendar {
}
NgbCalendar.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_CALENDAR_FACTORY },] }
];
/** @nocollapse */ NgbCalendar.ngInjectableDef = i0.defineInjectable({ factory: NGB_DATEPICKER_CALENDAR_FACTORY, token: NgbCalendar, providedIn: "root" });
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
export class NgbCalendarGregorian extends NgbCalendar {
    /**
     * @return {?}
     */
    getDaysPerWeek() { return 7; }
    /**
     * @return {?}
     */
    getMonths() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }
    /**
     * @return {?}
     */
    getWeeksPerMonth() { return 6; }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getNext(date, period = 'd', number = 1) {
        /** @type {?} */
        let jsDate = toJSDate(date);
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
    }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getPrev(date, period = 'd', number = 1) { return this.getNext(date, period, -number); }
    /**
     * @param {?} date
     * @return {?}
     */
    getWeekday(date) {
        /** @type {?} */
        let jsDate = toJSDate(date);
        /** @type {?} */
        let day = jsDate.getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        /** @type {?} */
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        /** @type {?} */
        let date = week[thursdayIndex];
        /** @type {?} */
        const jsDate = toJSDate(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        // Thursday
        /** @type {?} */
        const time = jsDate.getTime();
        jsDate.setMonth(0); // Compare with Jan 1
        jsDate.setDate(1);
        return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
    }
    /**
     * @return {?}
     */
    getToday() { return fromJSDate(new Date()); }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        if (!date || !isInteger(date.year) || !isInteger(date.month) || !isInteger(date.day)) {
            return false;
        }
        // year 0 doesn't exist in Gregorian calendar
        if (date.year === 0) {
            return false;
        }
        /** @type {?} */
        const jsDate = toJSDate(date);
        return !isNaN(jsDate.getTime()) && jsDate.getFullYear() === date.year && jsDate.getMonth() + 1 === date.month &&
            jsDate.getDate() === date.day;
    }
}
NgbCalendarGregorian.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWNhbGVuZGFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL25nYi1jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7OztBQUV2QyxNQUFNLFVBQVUsVUFBVSxDQUFDLE1BQVk7SUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUNwRixDQUFDOzs7OztBQUNELE1BQU0sVUFBVSxRQUFRLENBQUMsSUFBYTs7VUFDOUIsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7SUFDaEUsMkNBQTJDO0lBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUU7UUFDNUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDL0I7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDOzs7O0FBSUQsTUFBTSxVQUFVLCtCQUErQjtJQUM3QyxPQUFPLElBQUksb0JBQW9CLEVBQUUsQ0FBQztBQUNwQyxDQUFDOzs7Ozs7QUFPRCxNQUFNLE9BQWdCLFdBQVc7OztZQURoQyxVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSwrQkFBK0IsRUFB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QzFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlFLENBQUM7Ozs7SUFFRCxRQUFRLEtBQWMsT0FBTyxVQUFVLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFdEQsT0FBTyxDQUFDLElBQWE7UUFDbkIsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNwRixPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsNkNBQTZDO1FBQzdDLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7WUFDbkIsT0FBTyxLQUFLLENBQUM7U0FDZDs7Y0FFSyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUU3QixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUs7WUFDekcsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEMsQ0FBQzs7O1lBckVGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNJbnRlZ2VyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbUpTRGF0ZShqc0RhdGU6IERhdGUpIHtcbiAgcmV0dXJuIG5ldyBOZ2JEYXRlKGpzRGF0ZS5nZXRGdWxsWWVhcigpLCBqc0RhdGUuZ2V0TW9udGgoKSArIDEsIGpzRGF0ZS5nZXREYXRlKCkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHRvSlNEYXRlKGRhdGU6IE5nYkRhdGUpIHtcbiAgY29uc3QganNEYXRlID0gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoIC0gMSwgZGF0ZS5kYXksIDEyKTtcbiAgLy8gdGhpcyBpcyBkb25lIGF2b2lkIDMwIC0+IDE5MzAgY29udmVyc2lvblxuICBpZiAoIWlzTmFOKGpzRGF0ZS5nZXRUaW1lKCkpKSB7XG4gICAganNEYXRlLnNldEZ1bGxZZWFyKGRhdGUueWVhcik7XG4gIH1cbiAgcmV0dXJuIGpzRGF0ZTtcbn1cblxuZXhwb3J0IHR5cGUgTmdiUGVyaW9kID0gJ3knIHwgJ20nIHwgJ2QnO1xuXG5leHBvcnQgZnVuY3Rpb24gTkdCX0RBVEVQSUNLRVJfQ0FMRU5EQVJfRkFDVE9SWSgpIHtcbiAgcmV0dXJuIG5ldyBOZ2JDYWxlbmRhckdyZWdvcmlhbigpO1xufVxuXG4vKipcbiAqIENhbGVuZGFyIHVzZWQgYnkgdGhlIGRhdGVwaWNrZXIuXG4gKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIHVzZXMgR3JlZ29yaWFuIGNhbGVuZGFyLlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnLCB1c2VGYWN0b3J5OiBOR0JfREFURVBJQ0tFUl9DQUxFTkRBUl9GQUNUT1JZfSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JDYWxlbmRhciB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIG51bWJlciBvZiBkYXlzIHBlciB3ZWVrLlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0RGF5c1BlcldlZWsoKTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIG1vbnRocyBwZXIgeWVhci5cbiAgICogV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMSBhbmQgcmV0dXJuIFsxLCAyLCAuLi4sIDEyXTtcbiAgICovXG4gIGFic3RyYWN0IGdldE1vbnRocyh5ZWFyPzogbnVtYmVyKTogbnVtYmVyW107XG5cbiAgLyoqXG4gICAqIFJldHVybnMgbnVtYmVyIG9mIHdlZWtzIHBlciBtb250aC5cbiAgICovXG4gIGFic3RyYWN0IGdldFdlZWtzUGVyTW9udGgoKTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdlZWtkYXkgbnVtYmVyIGZvciBhIGdpdmVuIGRheS5cbiAgICogV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ3dlZWtkYXknIGlzIDE9TW9uIC4uLiA3PVN1blxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0V2Vla2RheShkYXRlOiBOZ2JEYXRlKTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgbnVtYmVyIG9mIHllYXJzLCBtb250aHMgb3IgZGF5cyB0byBhIGdpdmVuIGRhdGUuXG4gICAqIFBlcmlvZCBjYW4gYmUgJ3knLCAnbScgb3IgJ2QnIGFuZCBkZWZhdWx0cyB0byBkYXkuXG4gICAqIE51bWJlciBkZWZhdWx0cyB0byAxLlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0TmV4dChkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q/OiBOZ2JQZXJpb2QsIG51bWJlcj86IG51bWJlcik6IE5nYkRhdGU7XG5cbiAgLyoqXG4gICAqIFN1YnRyYWN0cyBhIG51bWJlciBvZiB5ZWFycywgbW9udGhzIG9yIGRheXMgZnJvbSBhIGdpdmVuIGRhdGUuXG4gICAqIFBlcmlvZCBjYW4gYmUgJ3knLCAnbScgb3IgJ2QnIGFuZCBkZWZhdWx0cyB0byBkYXkuXG4gICAqIE51bWJlciBkZWZhdWx0cyB0byAxLlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0UHJldihkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q/OiBOZ2JQZXJpb2QsIG51bWJlcj86IG51bWJlcik6IE5nYkRhdGU7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2VlayBudW1iZXIgZm9yIGEgZ2l2ZW4gd2Vlay5cbiAgICovXG4gIGFic3RyYWN0IGdldFdlZWtOdW1iZXIod2VlazogTmdiRGF0ZVtdLCBmaXJzdERheU9mV2VlazogbnVtYmVyKTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRvZGF5J3MgZGF0ZS5cbiAgICovXG4gIGFic3RyYWN0IGdldFRvZGF5KCk6IE5nYkRhdGU7XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhIGRhdGUgaXMgdmFsaWQgZm9yIGEgY3VycmVudCBjYWxlbmRhci5cbiAgICovXG4gIGFic3RyYWN0IGlzVmFsaWQoZGF0ZTogTmdiRGF0ZSk6IGJvb2xlYW47XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JDYWxlbmRhckdyZWdvcmlhbiBleHRlbmRzIE5nYkNhbGVuZGFyIHtcbiAgZ2V0RGF5c1BlcldlZWsoKSB7IHJldHVybiA3OyB9XG5cbiAgZ2V0TW9udGhzKCkgeyByZXR1cm4gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTJdOyB9XG5cbiAgZ2V0V2Vla3NQZXJNb250aCgpIHsgcmV0dXJuIDY7IH1cblxuICBnZXROZXh0KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7XG4gICAgbGV0IGpzRGF0ZSA9IHRvSlNEYXRlKGRhdGUpO1xuXG4gICAgc3dpdGNoIChwZXJpb2QpIHtcbiAgICAgIGNhc2UgJ3knOlxuICAgICAgICByZXR1cm4gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyICsgbnVtYmVyLCAxLCAxKTtcbiAgICAgIGNhc2UgJ20nOlxuICAgICAgICBqc0RhdGUgPSBuZXcgRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGggKyBudW1iZXIgLSAxLCAxLCAxMik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZCc6XG4gICAgICAgIGpzRGF0ZS5zZXREYXRlKGpzRGF0ZS5nZXREYXRlKCkgKyBudW1iZXIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cblxuICAgIHJldHVybiBmcm9tSlNEYXRlKGpzRGF0ZSk7XG4gIH1cblxuICBnZXRQcmV2KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7IHJldHVybiB0aGlzLmdldE5leHQoZGF0ZSwgcGVyaW9kLCAtbnVtYmVyKTsgfVxuXG4gIGdldFdlZWtkYXkoZGF0ZTogTmdiRGF0ZSkge1xuICAgIGxldCBqc0RhdGUgPSB0b0pTRGF0ZShkYXRlKTtcbiAgICBsZXQgZGF5ID0ganNEYXRlLmdldERheSgpO1xuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XG4gICAgcmV0dXJuIGRheSA9PT0gMCA/IDcgOiBkYXk7XG4gIH1cblxuICBnZXRXZWVrTnVtYmVyKHdlZWs6IE5nYkRhdGVbXSwgZmlyc3REYXlPZldlZWs6IG51bWJlcikge1xuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XG4gICAgaWYgKGZpcnN0RGF5T2ZXZWVrID09PSA3KSB7XG4gICAgICBmaXJzdERheU9mV2VlayA9IDA7XG4gICAgfVxuXG4gICAgY29uc3QgdGh1cnNkYXlJbmRleCA9ICg0ICsgNyAtIGZpcnN0RGF5T2ZXZWVrKSAlIDc7XG4gICAgbGV0IGRhdGUgPSB3ZWVrW3RodXJzZGF5SW5kZXhdO1xuXG4gICAgY29uc3QganNEYXRlID0gdG9KU0RhdGUoZGF0ZSk7XG4gICAganNEYXRlLnNldERhdGUoanNEYXRlLmdldERhdGUoKSArIDQgLSAoanNEYXRlLmdldERheSgpIHx8IDcpKTsgIC8vIFRodXJzZGF5XG4gICAgY29uc3QgdGltZSA9IGpzRGF0ZS5nZXRUaW1lKCk7XG4gICAganNEYXRlLnNldE1vbnRoKDApOyAgLy8gQ29tcGFyZSB3aXRoIEphbiAxXG4gICAganNEYXRlLnNldERhdGUoMSk7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yb3VuZCgodGltZSAtIGpzRGF0ZS5nZXRUaW1lKCkpIC8gODY0MDAwMDApIC8gNykgKyAxO1xuICB9XG5cbiAgZ2V0VG9kYXkoKTogTmdiRGF0ZSB7IHJldHVybiBmcm9tSlNEYXRlKG5ldyBEYXRlKCkpOyB9XG5cbiAgaXNWYWxpZChkYXRlOiBOZ2JEYXRlKTogYm9vbGVhbiB7XG4gICAgaWYgKCFkYXRlIHx8ICFpc0ludGVnZXIoZGF0ZS55ZWFyKSB8fCAhaXNJbnRlZ2VyKGRhdGUubW9udGgpIHx8ICFpc0ludGVnZXIoZGF0ZS5kYXkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8geWVhciAwIGRvZXNuJ3QgZXhpc3QgaW4gR3JlZ29yaWFuIGNhbGVuZGFyXG4gICAgaWYgKGRhdGUueWVhciA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGpzRGF0ZSA9IHRvSlNEYXRlKGRhdGUpO1xuXG4gICAgcmV0dXJuICFpc05hTihqc0RhdGUuZ2V0VGltZSgpKSAmJiBqc0RhdGUuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZS55ZWFyICYmIGpzRGF0ZS5nZXRNb250aCgpICsgMSA9PT0gZGF0ZS5tb250aCAmJlxuICAgICAgICBqc0RhdGUuZ2V0RGF0ZSgpID09PSBkYXRlLmRheTtcbiAgfVxufVxuIl19