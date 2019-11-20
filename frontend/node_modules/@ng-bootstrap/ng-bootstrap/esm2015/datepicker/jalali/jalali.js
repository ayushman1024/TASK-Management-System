/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgbDate } from '../ngb-date';
/**
 * Returns the equivalent JS date value for a give input Jalali date.
 * `jalaliDate` is an Jalali date to be converted to Gregorian.
 * @param {?} jalaliDate
 * @return {?}
 */
export function toGregorian(jalaliDate) {
    /** @type {?} */
    let jdn = jalaliToJulian(jalaliDate.year, jalaliDate.month, jalaliDate.day);
    /** @type {?} */
    let date = julianToGregorian(jdn);
    date.setHours(6, 30, 3, 200);
    return date;
}
/**
 * Returns the equivalent jalali date value for a give input Gregorian date.
 * `gdate` is a JS Date to be converted to jalali.
 * utc to local
 * @param {?} gdate
 * @return {?}
 */
export function fromGregorian(gdate) {
    /** @type {?} */
    let g2d = gregorianToJulian(gdate.getFullYear(), gdate.getMonth() + 1, gdate.getDate());
    return julianToJalali(g2d);
}
/**
 * @param {?} date
 * @param {?} yearValue
 * @return {?}
 */
export function setJalaliYear(date, yearValue) {
    date.year = +yearValue;
    return date;
}
/**
 * @param {?} date
 * @param {?} month
 * @return {?}
 */
export function setJalaliMonth(date, month) {
    month = +month;
    date.year = date.year + Math.floor((month - 1) / 12);
    date.month = Math.floor(((month - 1) % 12 + 12) % 12) + 1;
    return date;
}
/**
 * @param {?} date
 * @param {?} day
 * @return {?}
 */
export function setJalaliDay(date, day) {
    /** @type {?} */
    let mDays = getDaysPerMonth(date.month, date.year);
    if (day <= 0) {
        while (day <= 0) {
            date = setJalaliMonth(date, date.month - 1);
            mDays = getDaysPerMonth(date.month, date.year);
            day += mDays;
        }
    }
    else if (day > mDays) {
        while (day > mDays) {
            day -= mDays;
            date = setJalaliMonth(date, date.month + 1);
            mDays = getDaysPerMonth(date.month, date.year);
        }
    }
    date.day = day;
    return date;
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
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function div(a, b) {
    return Math.trunc(a / b);
}
/*
 This function determines if the Jalali (Persian) year is
 leap (366-day long) or is the common year (365 days), and
 finds the day in March (Gregorian calendar) of the first
 day of the Jalali year (jalaliYear).
 @param jalaliYear Jalali calendar year (-61 to 3177)
 @return
 leap: number of years since the last leap year (0 to 4)
 gYear: Gregorian year of the beginning of Jalali year
 march: the March day of Farvardin the 1st (1st day of jalaliYear)
 @see: http://www.astro.uni.torun.pl/~kb/Papers/EMP/PersianC-EMP.htm
 @see: http://www.fourmilab.ch/documents/calendar/
 */
/**
 * @param {?} jalaliYear
 * @return {?}
 */
function jalCal(jalaliYear) {
    // Jalali years starting the 33-year rule.
    /** @type {?} */
    let breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];
    /** @type {?} */
    const breaksLength = breaks.length;
    /** @type {?} */
    const gYear = jalaliYear + 621;
    /** @type {?} */
    let leapJ = -14;
    /** @type {?} */
    let jp = breaks[0];
    if (jalaliYear < jp || jalaliYear >= breaks[breaksLength - 1]) {
        throw new Error('Invalid Jalali year ' + jalaliYear);
    }
    // Find the limiting years for the Jalali year jalaliYear.
    /** @type {?} */
    let jump;
    for (let i = 1; i < breaksLength; i += 1) {
        /** @type {?} */
        const jm = breaks[i];
        jump = jm - jp;
        if (jalaliYear < jm) {
            break;
        }
        leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
        jp = jm;
    }
    /** @type {?} */
    let n = jalaliYear - jp;
    // Find the number of leap years from AD 621 to the beginning
    // of the current Jalali year in the Persian calendar.
    leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
    if (mod(jump, 33) === 4 && jump - n === 4) {
        leapJ += 1;
    }
    // And the same in the Gregorian calendar (until the year gYear).
    /** @type {?} */
    const leapG = div(gYear, 4) - div((div(gYear, 100) + 1) * 3, 4) - 150;
    // Determine the Gregorian date of Farvardin the 1st.
    /** @type {?} */
    const march = 20 + leapJ - leapG;
    // Find how many years have passed since the last leap year.
    if (jump - n < 6) {
        n = n - jump + div(jump + 4, 33) * 33;
    }
    /** @type {?} */
    let leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) {
        leap = 4;
    }
    return { leap: leap, gy: gYear, march: march };
}
/*
 Calculates Gregorian and Julian calendar dates from the Julian Day number
 (jdn) for the period since jdn=-34839655 (i.e. the year -100100 of both
 calendars) to some millions years ahead of the present.
 @param jdn Julian Day number
 @return
 gYear: Calendar year (years BC numbered 0, -1, -2, ...)
 gMonth: Calendar month (1 to 12)
 gDay: Calendar day of the month M (1 to 28/29/30/31)
 */
/**
 * @param {?} julianDayNumber
 * @return {?}
 */
function julianToGregorian(julianDayNumber) {
    /** @type {?} */
    let j = 4 * julianDayNumber + 139361631;
    j = j + div(div(4 * julianDayNumber + 183187720, 146097) * 3, 4) * 4 - 3908;
    /** @type {?} */
    const i = div(mod(j, 1461), 4) * 5 + 308;
    /** @type {?} */
    const gDay = div(mod(i, 153), 5) + 1;
    /** @type {?} */
    const gMonth = mod(div(i, 153), 12) + 1;
    /** @type {?} */
    const gYear = div(j, 1461) - 100100 + div(8 - gMonth, 6);
    return new Date(gYear, gMonth - 1, gDay);
}
/*
 Converts a date of the Jalali calendar to the Julian Day number.
 @param jy Jalali year (1 to 3100)
 @param jm Jalali month (1 to 12)
 @param jd Jalali day (1 to 29/31)
 @return Julian Day number
 */
/**
 * @param {?} gy
 * @param {?} gm
 * @param {?} gd
 * @return {?}
 */
function gregorianToJulian(gy, gm, gd) {
    /** @type {?} */
    let d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod(gm + 9, 12) + 2, 5) + gd - 34840408;
    d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
    return d;
}
/*
 Converts the Julian Day number to a date in the Jalali calendar.
 @param julianDayNumber Julian Day number
 @return
 jalaliYear: Jalali year (1 to 3100)
 jalaliMonth: Jalali month (1 to 12)
 jalaliDay: Jalali day (1 to 29/31)
 */
/**
 * @param {?} julianDayNumber
 * @return {?}
 */
function julianToJalali(julianDayNumber) {
    /** @type {?} */
    let gy = julianToGregorian(julianDayNumber).getFullYear() // Calculate Gregorian year (gy).
    ;
    /** @type {?} */
    let jalaliYear = gy - 621;
    /** @type {?} */
    let r = jalCal(jalaliYear);
    /** @type {?} */
    let gregorianDay = gregorianToJulian(gy, 3, r.march);
    /** @type {?} */
    let jalaliDay;
    /** @type {?} */
    let jalaliMonth;
    /** @type {?} */
    let numberOfDays;
    // Find number of days that passed since 1 Farvardin.
    numberOfDays = julianDayNumber - gregorianDay;
    if (numberOfDays >= 0) {
        if (numberOfDays <= 185) {
            // The first 6 months.
            jalaliMonth = 1 + div(numberOfDays, 31);
            jalaliDay = mod(numberOfDays, 31) + 1;
            return new NgbDate(jalaliYear, jalaliMonth, jalaliDay);
        }
        else {
            // The remaining months.
            numberOfDays -= 186;
        }
    }
    else {
        // Previous Jalali year.
        jalaliYear -= 1;
        numberOfDays += 179;
        if (r.leap === 1) {
            numberOfDays += 1;
        }
    }
    jalaliMonth = 7 + div(numberOfDays, 30);
    jalaliDay = mod(numberOfDays, 30) + 1;
    return new NgbDate(jalaliYear, jalaliMonth, jalaliDay);
}
/*
 Converts a date of the Jalali calendar to the Julian Day number.
 @param jYear Jalali year (1 to 3100)
 @param jMonth Jalali month (1 to 12)
 @param jDay Jalali day (1 to 29/31)
 @return Julian Day number
 */
/**
 * @param {?} jYear
 * @param {?} jMonth
 * @param {?} jDay
 * @return {?}
 */
function jalaliToJulian(jYear, jMonth, jDay) {
    /** @type {?} */
    let r = jalCal(jYear);
    return gregorianToJulian(r.gy, 3, r.march) + (jMonth - 1) * 31 - div(jMonth, 7) * (jMonth - 7) + jDay - 1;
}
/**
 * Returns the number of days in a specific jalali month.
 * @param {?} month
 * @param {?} year
 * @return {?}
 */
function getDaysPerMonth(month, year) {
    if (month <= 6) {
        return 31;
    }
    if (month <= 11) {
        return 30;
    }
    if (jalCal(year).leap === 0) {
        return 30;
    }
    return 29;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamFsYWxpLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2phbGFsaS9qYWxhbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxhQUFhLENBQUM7Ozs7Ozs7QUFNcEMsTUFBTSxVQUFVLFdBQVcsQ0FBQyxVQUFtQjs7UUFDekMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQzs7UUFDdkUsSUFBSSxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQztJQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQzs7Ozs7Ozs7QUFPRCxNQUFNLFVBQVUsYUFBYSxDQUFDLEtBQVc7O1FBQ25DLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdkYsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDN0IsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FBQyxJQUFhLEVBQUUsU0FBaUI7SUFDNUQsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUN2QixPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxjQUFjLENBQUMsSUFBYSxFQUFFLEtBQWE7SUFDekQsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDO0lBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FB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QUssSUFBSSxDQUFDLEVBQUU7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsSUFBSSxLQUFLLElBQUksRUFBRSxFQUFFO1FBQ2YsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7UUFDM0IsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi4vbmdiLWRhdGUnO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGVxdWl2YWxlbnQgSlMgZGF0ZSB2YWx1ZSBmb3IgYSBnaXZlIGlucHV0IEphbGFsaSBkYXRlLlxuICogYGphbGFsaURhdGVgIGlzIGFuIEphbGFsaSBkYXRlIHRvIGJlIGNvbnZlcnRlZCB0byBHcmVnb3JpYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0dyZWdvcmlhbihqYWxhbGlEYXRlOiBOZ2JEYXRlKTogRGF0ZSB7XG4gIGxldCBqZG4gPSBqYWxhbGlUb0p1bGlhbihqYWxhbGlEYXRlLnllYXIsIGphbGFsaURhdGUubW9udGgsIGphbGFsaURhdGUuZGF5KTtcbiAgbGV0IGRhdGUgPSBqdWxpYW5Ub0dyZWdvcmlhbihqZG4pO1xuICBkYXRlLnNldEhvdXJzKDYsIDMwLCAzLCAyMDApO1xuICByZXR1cm4gZGF0ZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBlcXVpdmFsZW50IGphbGFsaSBkYXRlIHZhbHVlIGZvciBhIGdpdmUgaW5wdXQgR3JlZ29yaWFuIGRhdGUuXG4gKiBgZ2RhdGVgIGlzIGEgSlMgRGF0ZSB0byBiZSBjb252ZXJ0ZWQgdG8gamFsYWxpLlxuICogdXRjIHRvIGxvY2FsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tR3JlZ29yaWFuKGdkYXRlOiBEYXRlKTogTmdiRGF0ZSB7XG4gIGxldCBnMmQgPSBncmVnb3JpYW5Ub0p1bGlhbihnZGF0ZS5nZXRGdWxsWWVhcigpLCBnZGF0ZS5nZXRNb250aCgpICsgMSwgZ2RhdGUuZ2V0RGF0ZSgpKTtcbiAgcmV0dXJuIGp1bGlhblRvSmFsYWxpKGcyZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRKYWxhbGlZZWFyKGRhdGU6IE5nYkRhdGUsIHllYXJWYWx1ZTogbnVtYmVyKTogTmdiRGF0ZSB7XG4gIGRhdGUueWVhciA9ICt5ZWFyVmFsdWU7XG4gIHJldHVybiBkYXRlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0SmFsYWxpTW9udGgoZGF0ZTogTmdiRGF0ZSwgbW9udGg6IG51bWJlcik6IE5nYkRhdGUge1xuICBtb250aCA9ICttb250aDtcbiAgZGF0ZS55ZWFyID0gZGF0ZS55ZWFyICsgTWF0aC5mbG9vcigobW9udGggLSAxKSAvIDEyKTtcbiAgZGF0ZS5tb250aCA9IE1hdGguZmxvb3IoKChtb250aCAtIDEpICUgMTIgKyAxMikgJSAxMikgKyAxO1xuICByZXR1cm4gZGF0ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEphbGFsaURheShkYXRlOiBOZ2JEYXRlLCBkYXk6IG51bWJlcik6IE5nYkRhdGUge1xuICBsZXQgbURheXMgPSBnZXREYXlzUGVyTW9udGgoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcbiAgaWYgKGRheSA8PSAwKSB7XG4gICAgd2hpbGUgKGRheSA8PSAwKSB7XG4gICAgICBkYXRlID0gc2V0SmFsYWxpTW9udGgoZGF0ZSwgZGF0ZS5tb250aCAtIDEpO1xuICAgICAgbURheXMgPSBnZXREYXlzUGVyTW9udGgoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcbiAgICAgIGRheSArPSBtRGF5cztcbiAgICB9XG4gIH0gZWxzZSBpZiAoZGF5ID4gbURheXMpIHtcbiAgICB3aGlsZSAoZGF5ID4gbURheXMpIHtcbiAgICAgIGRheSAtPSBtRGF5cztcbiAgICAgIGRhdGUgPSBzZXRKYWxhbGlNb250aChkYXRlLCBkYXRlLm1vbnRoICsgMSk7XG4gICAgICBtRGF5cyA9IGdldERheXNQZXJNb250aChkYXRlLm1vbnRoLCBkYXRlLnllYXIpO1xuICAgIH1cbiAgfVxuICBkYXRlLmRheSA9IGRheTtcbiAgcmV0dXJuIGRhdGU7XG59XG5cbmZ1bmN0aW9uIG1vZChhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBhIC0gYiAqIE1hdGguZmxvb3IoYSAvIGIpO1xufVxuXG5mdW5jdGlvbiBkaXYoYTogbnVtYmVyLCBiOiBudW1iZXIpIHtcbiAgcmV0dXJuIE1hdGgudHJ1bmMoYSAvIGIpO1xufVxuXG4vKlxuIFRoaXMgZnVuY3Rpb24gZGV0ZXJtaW5lcyBpZiB0aGUgSmFsYWxpIChQZXJzaWFuKSB5ZWFyIGlzXG4gbGVhcCAoMzY2LWRheSBsb25nKSBvciBpcyB0aGUgY29tbW9uIHllYXIgKDM2NSBkYXlzKSwgYW5kXG4gZmluZHMgdGhlIGRheSBpbiBNYXJjaCAoR3JlZ29yaWFuIGNhbGVuZGFyKSBvZiB0aGUgZmlyc3RcbiBkYXkgb2YgdGhlIEphbGFsaSB5ZWFyIChqYWxhbGlZZWFyKS5cbiBAcGFyYW0gamFsYWxpWWVhciBKYWxhbGkgY2FsZW5kYXIgeWVhciAoLTYxIHRvIDMxNzcpXG4gQHJldHVyblxuIGxlYXA6IG51bWJlciBvZiB5ZWFycyBzaW5jZSB0aGUgbGFzdCBsZWFwIHllYXIgKDAgdG8gNClcbiBnWWVhcjogR3JlZ29yaWFuIHllYXIgb2YgdGhlIGJlZ2lubmluZyBvZiBKYWxhbGkgeWVhclxuIG1hcmNoOiB0aGUgTWFyY2ggZGF5IG9mIEZhcnZhcmRpbiB0aGUgMXN0ICgxc3QgZGF5IG9mIGphbGFsaVllYXIpXG4gQHNlZTogaHR0cDovL3d3dy5hc3Ryby51bmkudG9ydW4ucGwvfmtiL1BhcGVycy9FTVAvUGVyc2lhbkMtRU1QLmh0bVxuIEBzZWU6IGh0dHA6Ly93d3cuZm91cm1pbGFiLmNoL2RvY3VtZW50cy9jYWxlbmRhci9cbiAqL1xuZnVuY3Rpb24gamFsQ2FsKGphbGFsaVllYXI6IG51bWJlcikge1xuICAvLyBKYWxhbGkgeWVhcnMgc3RhcnRpbmcgdGhlIDMzLXllYXIgcnVsZS5cbiAgbGV0IGJyZWFrcyA9XG4gICAgICBbLTYxLCA5LCAzOCwgMTk5LCA0MjYsIDY4NiwgNzU2LCA4MTgsIDExMTEsIDExODEsIDEyMTAsIDE2MzUsIDIwNjAsIDIwOTcsIDIxOTIsIDIyNjIsIDIzMjQsIDIzOTQsIDI0NTYsIDMxNzhdO1xuICBjb25zdCBicmVha3NMZW5ndGggPSBicmVha3MubGVuZ3RoO1xuICBjb25zdCBnWWVhciA9IGphbGFsaVllYXIgKyA2MjE7XG4gIGxldCBsZWFwSiA9IC0xNDtcbiAgbGV0IGpwID0gYnJlYWtzWzBdO1xuXG4gIGlmIChqYWxhbGlZZWFyIDwganAgfHwgamFsYWxpWWVhciA+PSBicmVha3NbYnJlYWtzTGVuZ3RoIC0gMV0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgSmFsYWxpIHllYXIgJyArIGphbGFsaVllYXIpO1xuICB9XG5cbiAgLy8gRmluZCB0aGUgbGltaXRpbmcgeWVhcnMgZm9yIHRoZSBKYWxhbGkgeWVhciBqYWxhbGlZZWFyLlxuICBsZXQganVtcDtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBicmVha3NMZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IGptID0gYnJlYWtzW2ldO1xuICAgIGp1bXAgPSBqbSAtIGpwO1xuICAgIGlmIChqYWxhbGlZZWFyIDwgam0pIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBsZWFwSiA9IGxlYXBKICsgZGl2KGp1bXAsIDMzKSAqIDggKyBkaXYobW9kKGp1bXAsIDMzKSwgNCk7XG4gICAganAgPSBqbTtcbiAgfVxuICBsZXQgbiA9IGphbGFsaVllYXIgLSBqcDtcblxuICAvLyBGaW5kIHRoZSBudW1iZXIgb2YgbGVhcCB5ZWFycyBmcm9tIEFEIDYyMSB0byB0aGUgYmVnaW5uaW5nXG4gIC8vIG9mIHRoZSBjdXJyZW50IEphbGFsaSB5ZWFyIGluIHRoZSBQZXJzaWFuIGNhbGVuZGFyLlxuICBsZWFwSiA9IGxlYXBKICsgZGl2KG4sIDMzKSAqIDggKyBkaXYobW9kKG4sIDMzKSArIDMsIDQpO1xuICBpZiAobW9kKGp1bXAsIDMzKSA9PT0gNCAmJiBqdW1wIC0gbiA9PT0gNCkge1xuICAgIGxlYXBKICs9IDE7XG4gIH1cblxuICAvLyBBbmQgdGhlIHNhbWUgaW4gdGhlIEdyZWdvcmlhbiBjYWxlbmRhciAodW50aWwgdGhlIHllYXIgZ1llYXIpLlxuICBjb25zdCBsZWFwRyA9IGRpdihnWWVhciwgNCkgLSBkaXYoKGRpdihnWWVhciwgMTAwKSArIDEpICogMywgNCkgLSAxNTA7XG5cbiAgLy8gRGV0ZXJtaW5lIHRoZSBHcmVnb3JpYW4gZGF0ZSBvZiBGYXJ2YXJkaW4gdGhlIDFzdC5cbiAgY29uc3QgbWFyY2ggPSAyMCArIGxlYXBKIC0gbGVhcEc7XG5cbiAgLy8gRmluZCBob3cgbWFueSB5ZWFycyBoYXZlIHBhc3NlZCBzaW5jZSB0aGUgbGFzdCBsZWFwIHllYXIuXG4gIGlmIChqdW1wIC0gbiA8IDYpIHtcbiAgICBuID0gbiAtIGp1bXAgKyBkaXYoanVtcCArIDQsIDMzKSAqIDMzO1xuICB9XG4gIGxldCBsZWFwID0gbW9kKG1vZChuICsgMSwgMzMpIC0gMSwgNCk7XG4gIGlmIChsZWFwID09PSAtMSkge1xuICAgIGxlYXAgPSA0O1xuICB9XG5cbiAgcmV0dXJuIHtsZWFwOiBsZWFwLCBneTogZ1llYXIsIG1hcmNoOiBtYXJjaH07XG59XG5cbi8qXG4gQ2FsY3VsYXRlcyBHcmVnb3JpYW4gYW5kIEp1bGlhbiBjYWxlbmRhciBkYXRlcyBmcm9tIHRoZSBKdWxpYW4gRGF5IG51bWJlclxuIChqZG4pIGZvciB0aGUgcGVyaW9kIHNpbmNlIGpkbj0tMzQ4Mzk2NTUgKGkuZS4gdGhlIHllYXIgLTEwMDEwMCBvZiBib3RoXG4gY2FsZW5kYXJzKSB0byBzb21lIG1pbGxpb25zIHllYXJzIGFoZWFkIG9mIHRoZSBwcmVzZW50LlxuIEBwYXJhbSBqZG4gSnVsaWFuIERheSBudW1iZXJcbiBAcmV0dXJuXG4gZ1llYXI6IENhbGVuZGFyIHllYXIgKHllYXJzIEJDIG51bWJlcmVkIDAsIC0xLCAtMiwgLi4uKVxuIGdNb250aDogQ2FsZW5kYXIgbW9udGggKDEgdG8gMTIpXG4gZ0RheTogQ2FsZW5kYXIgZGF5IG9mIHRoZSBtb250aCBNICgxIHRvIDI4LzI5LzMwLzMxKVxuICovXG5mdW5jdGlvbiBqdWxpYW5Ub0dyZWdvcmlhbihqdWxpYW5EYXlOdW1iZXI6IG51bWJlcikge1xuICBsZXQgaiA9IDQgKiBqdWxpYW5EYXlOdW1iZXIgKyAxMzkzNjE2MzE7XG4gIGogPSBqICsgZGl2KGRpdig0ICoganVsaWFuRGF5TnVtYmVyICsgMTgzMTg3NzIwLCAxNDYwOTcpICogMywgNCkgKiA0IC0gMzkwODtcbiAgY29uc3QgaSA9IGRpdihtb2QoaiwgMTQ2MSksIDQpICogNSArIDMwODtcbiAgY29uc3QgZ0RheSA9IGRpdihtb2QoaSwgMTUzKSwgNSkgKyAxO1xuICBjb25zdCBnTW9udGggPSBtb2QoZGl2KGksIDE1MyksIDEyKSArIDE7XG4gIGNvbnN0IGdZZWFyID0gZGl2KGosIDE0NjEpIC0gMTAwMTAwICsgZGl2KDggLSBnTW9udGgsIDYpO1xuXG4gIHJldHVybiBuZXcgRGF0ZShnWWVhciwgZ01vbnRoIC0gMSwgZ0RheSk7XG59XG5cbi8qXG4gQ29udmVydHMgYSBkYXRlIG9mIHRoZSBKYWxhbGkgY2FsZW5kYXIgdG8gdGhlIEp1bGlhbiBEYXkgbnVtYmVyLlxuIEBwYXJhbSBqeSBKYWxhbGkgeWVhciAoMSB0byAzMTAwKVxuIEBwYXJhbSBqbSBKYWxhbGkgbW9udGggKDEgdG8gMTIpXG4gQHBhcmFtIGpkIEphbGFsaSBkYXkgKDEgdG8gMjkvMzEpXG4gQHJldHVybiBKdWxpYW4gRGF5IG51bWJlclxuICovXG5mdW5jdGlvbiBncmVnb3JpYW5Ub0p1bGlhbihneTogbnVtYmVyLCBnbTogbnVtYmVyLCBnZDogbnVtYmVyKSB7XG4gIGxldCBkID0gZGl2KChneSArIGRpdihnbSAtIDgsIDYpICsgMTAwMTAwKSAqIDE0NjEsIDQpICsgZGl2KDE1MyAqIG1vZChnbSArIDksIDEyKSArIDIsIDUpICsgZ2QgLSAzNDg0MDQwODtcbiAgZCA9IGQgLSBkaXYoZGl2KGd5ICsgMTAwMTAwICsgZGl2KGdtIC0gOCwgNiksIDEwMCkgKiAzLCA0KSArIDc1MjtcbiAgcmV0dXJuIGQ7XG59XG5cbi8qXG4gQ29udmVydHMgdGhlIEp1bGlhbiBEYXkgbnVtYmVyIHRvIGEgZGF0ZSBpbiB0aGUgSmFsYWxpIGNhbGVuZGFyLlxuIEBwYXJhbSBqdWxpYW5EYXlOdW1iZXIgSnVsaWFuIERheSBudW1iZXJcbiBAcmV0dXJuXG4gamFsYWxpWWVhcjogSmFsYWxpIHllYXIgKDEgdG8gMzEwMClcbiBqYWxhbGlNb250aDogSmFsYWxpIG1vbnRoICgxIHRvIDEyKVxuIGphbGFsaURheTogSmFsYWxpIGRheSAoMSB0byAyOS8zMSlcbiAqL1xuZnVuY3Rpb24ganVsaWFuVG9KYWxhbGkoanVsaWFuRGF5TnVtYmVyOiBudW1iZXIpIHtcbiAgbGV0IGd5ID0ganVsaWFuVG9HcmVnb3JpYW4oanVsaWFuRGF5TnVtYmVyKS5nZXRGdWxsWWVhcigpICAvLyBDYWxjdWxhdGUgR3JlZ29yaWFuIHllYXIgKGd5KS5cbiAgICAgICxcbiAgICAgIGphbGFsaVllYXIgPSBneSAtIDYyMSwgciA9IGphbENhbChqYWxhbGlZZWFyKSwgZ3JlZ29yaWFuRGF5ID0gZ3JlZ29yaWFuVG9KdWxpYW4oZ3ksIDMsIHIubWFyY2gpLCBqYWxhbGlEYXksXG4gICAgICBqYWxhbGlNb250aCwgbnVtYmVyT2ZEYXlzO1xuXG4gIC8vIEZpbmQgbnVtYmVyIG9mIGRheXMgdGhhdCBwYXNzZWQgc2luY2UgMSBGYXJ2YXJkaW4uXG4gIG51bWJlck9mRGF5cyA9IGp1bGlhbkRheU51bWJlciAtIGdyZWdvcmlhbkRheTtcbiAgaWYgKG51bWJlck9mRGF5cyA+PSAwKSB7XG4gICAgaWYgKG51bWJlck9mRGF5cyA8PSAxODUpIHtcbiAgICAgIC8vIFRoZSBmaXJzdCA2IG1vbnRocy5cbiAgICAgIGphbGFsaU1vbnRoID0gMSArIGRpdihudW1iZXJPZkRheXMsIDMxKTtcbiAgICAgIGphbGFsaURheSA9IG1vZChudW1iZXJPZkRheXMsIDMxKSArIDE7XG4gICAgICByZXR1cm4gbmV3IE5nYkRhdGUoamFsYWxpWWVhciwgamFsYWxpTW9udGgsIGphbGFsaURheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoZSByZW1haW5pbmcgbW9udGhzLlxuICAgICAgbnVtYmVyT2ZEYXlzIC09IDE4NjtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gUHJldmlvdXMgSmFsYWxpIHllYXIuXG4gICAgamFsYWxpWWVhciAtPSAxO1xuICAgIG51bWJlck9mRGF5cyArPSAxNzk7XG4gICAgaWYgKHIubGVhcCA9PT0gMSkge1xuICAgICAgbnVtYmVyT2ZEYXlzICs9IDE7XG4gICAgfVxuICB9XG4gIGphbGFsaU1vbnRoID0gNyArIGRpdihudW1iZXJPZkRheXMsIDMwKTtcbiAgamFsYWxpRGF5ID0gbW9kKG51bWJlck9mRGF5cywgMzApICsgMTtcblxuICByZXR1cm4gbmV3IE5nYkRhdGUoamFsYWxpWWVhciwgamFsYWxpTW9udGgsIGphbGFsaURheSk7XG59XG5cbi8qXG4gQ29udmVydHMgYSBkYXRlIG9mIHRoZSBKYWxhbGkgY2FsZW5kYXIgdG8gdGhlIEp1bGlhbiBEYXkgbnVtYmVyLlxuIEBwYXJhbSBqWWVhciBKYWxhbGkgeWVhciAoMSB0byAzMTAwKVxuIEBwYXJhbSBqTW9udGggSmFsYWxpIG1vbnRoICgxIHRvIDEyKVxuIEBwYXJhbSBqRGF5IEphbGFsaSBkYXkgKDEgdG8gMjkvMzEpXG4gQHJldHVybiBKdWxpYW4gRGF5IG51bWJlclxuICovXG5mdW5jdGlvbiBqYWxhbGlUb0p1bGlhbihqWWVhcjogbnVtYmVyLCBqTW9udGg6IG51bWJlciwgakRheTogbnVtYmVyKSB7XG4gIGxldCByID0gamFsQ2FsKGpZZWFyKTtcbiAgcmV0dXJuIGdyZWdvcmlhblRvSnVsaWFuKHIuZ3ksIDMsIHIubWFyY2gpICsgKGpNb250aCAtIDEpICogMzEgLSBkaXYoak1vbnRoLCA3KSAqIChqTW9udGggLSA3KSArIGpEYXkgLSAxO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgc3BlY2lmaWMgamFsYWxpIG1vbnRoLlxuICovXG5mdW5jdGlvbiBnZXREYXlzUGVyTW9udGgobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKTogbnVtYmVyIHtcbiAgaWYgKG1vbnRoIDw9IDYpIHtcbiAgICByZXR1cm4gMzE7XG4gIH1cbiAgaWYgKG1vbnRoIDw9IDExKSB7XG4gICAgcmV0dXJuIDMwO1xuICB9XG4gIGlmIChqYWxDYWwoeWVhcikubGVhcCA9PT0gMCkge1xuICAgIHJldHVybiAzMDtcbiAgfVxuICByZXR1cm4gMjk7XG59XG4iXX0=