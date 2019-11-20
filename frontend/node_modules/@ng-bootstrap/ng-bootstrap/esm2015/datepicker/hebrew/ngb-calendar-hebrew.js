/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgbDate } from '../ngb-date';
import { fromJSDate, NgbCalendar, toJSDate } from '../ngb-calendar';
import { Injectable } from '@angular/core';
import { isNumber } from '../../util/util';
import { fromGregorian, getDayNumberInHebrewYear, getDaysInHebrewMonth, isHebrewLeapYear, toGregorian, setHebrewDay, setHebrewMonth } from './hebrew';
/**
 * \@since 3.2.0
 */
export class NgbCalendarHebrew extends NgbCalendar {
    /**
     * @return {?}
     */
    getDaysPerWeek() { return 7; }
    /**
     * @param {?=} year
     * @return {?}
     */
    getMonths(year) {
        if (year && isHebrewLeapYear(year)) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        }
        else {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }
    }
    /**
     * @return {?}
     */
    getWeeksPerMonth() { return 6; }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        /** @type {?} */
        let b = date && isNumber(date.year) && isNumber(date.month) && isNumber(date.day);
        b = b && date.month > 0 && date.month <= (isHebrewLeapYear(date.year) ? 13 : 12);
        b = b && date.day > 0 && date.day <= getDaysInHebrewMonth(date.month, date.year);
        return b && !isNaN(toGregorian(date).getTime());
    }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getNext(date, period = 'd', number = 1) {
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
        const day = toGregorian(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    getWeekNumber(week, firstDayOfWeek) {
        /** @type {?} */
        const date = week[week.length - 1];
        return Math.ceil(getDayNumberInHebrewYear(date) / 7);
    }
    /**
     * @return {?}
     */
    getToday() { return fromGregorian(new Date()); }
    /**
     * \@since 3.4.0
     * @param {?} date
     * @return {?}
     */
    toGregorian(date) { return fromJSDate(toGregorian(date)); }
    /**
     * \@since 3.4.0
     * @param {?} date
     * @return {?}
     */
    fromGregorian(date) { return fromGregorian(toJSDate(date)); }
}
NgbCalendarHebrew.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWNhbGVuZGFyLWhlYnJldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9oZWJyZXcvbmdiLWNhbGVuZGFyLWhlYnJldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNwQyxPQUFPLEVBQUMsVUFBVSxFQUFFLFdBQVcsRUFBYSxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3RSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsYUFBYSxFQUNiLHdCQUF3QixFQUN4QixvQkFBb0IsRUFDcEIsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDWCxZQUFZLEVBQ1osY0FBYyxFQUNmLE1BQU0sVUFBVSxDQUFDOzs7O0FBTWxCLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxXQUFXOzs7O0lBQ2hELGNBQWMsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRTlCLFNBQVMsQ0FBQyxJQUFhO1FBQ3JCLElBQUksSUFBSSxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2xDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNwRDthQUFNO1lBQ0wsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFB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QUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBSzdFLGFBQWEsQ0FBQyxJQUFhLElBQWEsT0FBTyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7WUFoRWhGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nYkRhdGV9IGZyb20gJy4uL25nYi1kYXRlJztcbmltcG9ydCB7ZnJvbUpTRGF0ZSwgTmdiQ2FsZW5kYXIsIE5nYlBlcmlvZCwgdG9KU0RhdGV9IGZyb20gJy4uL25nYi1jYWxlbmRhcic7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtpc051bWJlcn0gZnJvbSAnLi4vLi4vdXRpbC91dGlsJztcbmltcG9ydCB7XG4gIGZyb21HcmVnb3JpYW4sXG4gIGdldERheU51bWJlckluSGVicmV3WWVhcixcbiAgZ2V0RGF5c0luSGVicmV3TW9udGgsXG4gIGlzSGVicmV3TGVhcFllYXIsXG4gIHRvR3JlZ29yaWFuLFxuICBzZXRIZWJyZXdEYXksXG4gIHNldEhlYnJld01vbnRoXG59IGZyb20gJy4vaGVicmV3JztcblxuLyoqXG4gKiBAc2luY2UgMy4yLjBcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nYkNhbGVuZGFySGVicmV3IGV4dGVuZHMgTmdiQ2FsZW5kYXIge1xuICBnZXREYXlzUGVyV2VlaygpIHsgcmV0dXJuIDc7IH1cblxuICBnZXRNb250aHMoeWVhcj86IG51bWJlcikge1xuICAgIGlmICh5ZWFyICYmIGlzSGVicmV3TGVhcFllYXIoeWVhcikpIHtcbiAgICAgIHJldHVybiBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTNdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTJdO1xuICAgIH1cbiAgfVxuXG4gIGdldFdlZWtzUGVyTW9udGgoKSB7IHJldHVybiA2OyB9XG5cbiAgaXNWYWxpZChkYXRlOiBOZ2JEYXRlKTogYm9vbGVhbiB7XG4gICAgbGV0IGIgPSBkYXRlICYmIGlzTnVtYmVyKGRhdGUueWVhcikgJiYgaXNOdW1iZXIoZGF0ZS5tb250aCkgJiYgaXNOdW1iZXIoZGF0ZS5kYXkpO1xuICAgIGIgPSBiICYmIGRhdGUubW9udGggPiAwICYmIGRhdGUubW9udGggPD0gKGlzSGVicmV3TGVhcFllYXIoZGF0ZS55ZWFyKSA/IDEzIDogMTIpO1xuICAgIGIgPSBiICYmIGRhdGUuZGF5ID4gMCAmJiBkYXRlLmRheSA8PSBnZXREYXlzSW5IZWJyZXdNb250aChkYXRlLm1vbnRoLCBkYXRlLnllYXIpO1xuICAgIHJldHVybiBiICYmICFpc05hTih0b0dyZWdvcmlhbihkYXRlKS5nZXRUaW1lKCkpO1xuICB9XG5cbiAgZ2V0TmV4dChkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkge1xuICAgIGRhdGUgPSBuZXcgTmdiRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5KTtcblxuICAgIHN3aXRjaCAocGVyaW9kKSB7XG4gICAgICBjYXNlICd5JzpcbiAgICAgICAgZGF0ZS55ZWFyICs9IG51bWJlcjtcbiAgICAgICAgZGF0ZS5tb250aCA9IDE7XG4gICAgICAgIGRhdGUuZGF5ID0gMTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICBjYXNlICdtJzpcbiAgICAgICAgZGF0ZSA9IHNldEhlYnJld01vbnRoKGRhdGUsIG51bWJlcik7XG4gICAgICAgIGRhdGUuZGF5ID0gMTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICBjYXNlICdkJzpcbiAgICAgICAgcmV0dXJuIHNldEhlYnJld0RheShkYXRlLCBudW1iZXIpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuICB9XG5cbiAgZ2V0UHJldihkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkgeyByZXR1cm4gdGhpcy5nZXROZXh0KGRhdGUsIHBlcmlvZCwgLW51bWJlcik7IH1cblxuICBnZXRXZWVrZGF5KGRhdGU6IE5nYkRhdGUpIHtcbiAgICBjb25zdCBkYXkgPSB0b0dyZWdvcmlhbihkYXRlKS5nZXREYXkoKTtcbiAgICAvLyBpbiBKUyBEYXRlIFN1bj0wLCBpbiBJU08gODYwMSBTdW49N1xuICAgIHJldHVybiBkYXkgPT09IDAgPyA3IDogZGF5O1xuICB9XG5cbiAgZ2V0V2Vla051bWJlcih3ZWVrOiBOZ2JEYXRlW10sIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpIHtcbiAgICBjb25zdCBkYXRlID0gd2Vla1t3ZWVrLmxlbmd0aCAtIDFdO1xuICAgIHJldHVybiBNYXRoLmNlaWwoZ2V0RGF5TnVtYmVySW5IZWJyZXdZZWFyKGRhdGUpIC8gNyk7XG4gIH1cblxuICBnZXRUb2RheSgpOiBOZ2JEYXRlIHsgcmV0dXJuIGZyb21HcmVnb3JpYW4obmV3IERhdGUoKSk7IH1cblxuICAvKipcbiAgICogQHNpbmNlIDMuNC4wXG4gICAqL1xuICB0b0dyZWdvcmlhbihkYXRlOiBOZ2JEYXRlKTogTmdiRGF0ZSB7IHJldHVybiBmcm9tSlNEYXRlKHRvR3JlZ29yaWFuKGRhdGUpKTsgfVxuXG4gIC8qKlxuICAgKiBAc2luY2UgMy40LjBcbiAgICovXG4gIGZyb21HcmVnb3JpYW4oZGF0ZTogTmdiRGF0ZSk6IE5nYkRhdGUgeyByZXR1cm4gZnJvbUdyZWdvcmlhbih0b0pTRGF0ZShkYXRlKSk7IH1cbn1cbiJdfQ==