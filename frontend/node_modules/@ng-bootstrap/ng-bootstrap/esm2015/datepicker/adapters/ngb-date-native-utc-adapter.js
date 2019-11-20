/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NgbDateNativeAdapter } from './ngb-date-native-adapter';
/**
 * NgbDateAdapter implementation that allows using native javascript UTC date as a user date model.
 * Same as NgbDateNativeAdapter, but uses UTC dates.
 *
 * \@since 3.2.0
 */
export class NgbDateNativeUTCAdapter extends NgbDateNativeAdapter {
    /**
     * @param {?} date
     * @return {?}
     */
    _fromNativeDate(date) {
        return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    _toNativeDate(date) {
        /** @type {?} */
        const jsDate = new Date(Date.UTC(date.year, date.month - 1, date.day));
        // avoid 30 -> 1930 conversion
        jsDate.setUTCFullYear(date.year);
        return jsDate;
    }
}
NgbDateNativeUTCAdapter.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtbmF0aXZlLXV0Yy1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2FkYXB0ZXJzL25nYi1kYXRlLW5hdGl2ZS11dGMtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7OztBQVMvRCxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsb0JBQW9COzs7OztJQUNyRCxlQUFlLENBQUMsSUFBVTtRQUNsQyxPQUFPLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFDLENBQUM7SUFDOUYsQ0FBQzs7Ozs7SUFFUyxhQUFhLENBQUMsSUFBbUI7O2NBQ25DLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RFLDhCQUE4QjtRQUM5QixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7WUFYRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi4vbmdiLWRhdGUtc3RydWN0JztcbmltcG9ydCB7TmdiRGF0ZU5hdGl2ZUFkYXB0ZXJ9IGZyb20gJy4vbmdiLWRhdGUtbmF0aXZlLWFkYXB0ZXInO1xuXG4vKipcbiAqIE5nYkRhdGVBZGFwdGVyIGltcGxlbWVudGF0aW9uIHRoYXQgYWxsb3dzIHVzaW5nIG5hdGl2ZSBqYXZhc2NyaXB0IFVUQyBkYXRlIGFzIGEgdXNlciBkYXRlIG1vZGVsLlxuICogU2FtZSBhcyBOZ2JEYXRlTmF0aXZlQWRhcHRlciwgYnV0IHVzZXMgVVRDIGRhdGVzLlxuICpcbiAqIEBzaW5jZSAzLjIuMFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiRGF0ZU5hdGl2ZVVUQ0FkYXB0ZXIgZXh0ZW5kcyBOZ2JEYXRlTmF0aXZlQWRhcHRlciB7XG4gIHByb3RlY3RlZCBfZnJvbU5hdGl2ZURhdGUoZGF0ZTogRGF0ZSk6IE5nYkRhdGVTdHJ1Y3Qge1xuICAgIHJldHVybiB7eWVhcjogZGF0ZS5nZXRVVENGdWxsWWVhcigpLCBtb250aDogZGF0ZS5nZXRVVENNb250aCgpICsgMSwgZGF5OiBkYXRlLmdldFVUQ0RhdGUoKX07XG4gIH1cblxuICBwcm90ZWN0ZWQgX3RvTmF0aXZlRGF0ZShkYXRlOiBOZ2JEYXRlU3RydWN0KTogRGF0ZSB7XG4gICAgY29uc3QganNEYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoIC0gMSwgZGF0ZS5kYXkpKTtcbiAgICAvLyBhdm9pZCAzMCAtPiAxOTMwIGNvbnZlcnNpb25cbiAgICBqc0RhdGUuc2V0VVRDRnVsbFllYXIoZGF0ZS55ZWFyKTtcbiAgICByZXR1cm4ganNEYXRlO1xuICB9XG59XG4iXX0=