/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgbCalendar } from './ngb-calendar';
import { NgbDate } from './ngb-date';
import { Injectable } from '@angular/core';
import { isInteger, toInteger } from '../util/util';
import { Subject } from 'rxjs';
import { buildMonths, checkDateInRange, checkMinBeforeMax, isChangedDate, isDateSelectable, generateSelectBoxYears, generateSelectBoxMonths, prevMonthDisabled, nextMonthDisabled } from './datepicker-tools';
import { filter } from 'rxjs/operators';
import { NgbDatepickerI18n } from './datepicker-i18n';
var NgbDatepickerService = /** @class */ (function () {
    function NgbDatepickerService(_calendar, _i18n) {
        this._calendar = _calendar;
        this._i18n = _i18n;
        this._model$ = new Subject();
        this._select$ = new Subject();
        this._state = {
            disabled: false,
            displayMonths: 1,
            firstDayOfWeek: 1,
            focusVisible: false,
            months: [],
            navigation: 'select',
            outsideDays: 'visible',
            prevDisabled: false,
            nextDisabled: false,
            selectBoxes: { years: [], months: [] },
            selectedDate: null
        };
    }
    Object.defineProperty(NgbDatepickerService.prototype, "model$", {
        get: /**
         * @return {?}
         */
        function () { return this._model$.pipe(filter(function (model) { return model.months.length > 0; })); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "select$", {
        get: /**
         * @return {?}
         */
        function () { return this._select$.pipe(filter(function (date) { return date !== null; })); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "dayTemplateData", {
        set: /**
         * @param {?} dayTemplateData
         * @return {?}
         */
        function (dayTemplateData) {
            if (this._state.dayTemplateData !== dayTemplateData) {
                this._nextState({ dayTemplateData: dayTemplateData });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "disabled", {
        set: /**
         * @param {?} disabled
         * @return {?}
         */
        function (disabled) {
            if (this._state.disabled !== disabled) {
                this._nextState({ disabled: disabled });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "displayMonths", {
        set: /**
         * @param {?} displayMonths
         * @return {?}
         */
        function (displayMonths) {
            displayMonths = toInteger(displayMonths);
            if (isInteger(displayMonths) && displayMonths > 0 && this._state.displayMonths !== displayMonths) {
                this._nextState({ displayMonths: displayMonths });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "firstDayOfWeek", {
        set: /**
         * @param {?} firstDayOfWeek
         * @return {?}
         */
        function (firstDayOfWeek) {
            firstDayOfWeek = toInteger(firstDayOfWeek);
            if (isInteger(firstDayOfWeek) && firstDayOfWeek >= 0 && this._state.firstDayOfWeek !== firstDayOfWeek) {
                this._nextState({ firstDayOfWeek: firstDayOfWeek });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "focusVisible", {
        set: /**
         * @param {?} focusVisible
         * @return {?}
         */
        function (focusVisible) {
            if (this._state.focusVisible !== focusVisible && !this._state.disabled) {
                this._nextState({ focusVisible: focusVisible });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "maxDate", {
        set: /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            /** @type {?} */
            var maxDate = this.toValidDate(date, null);
            if (isChangedDate(this._state.maxDate, maxDate)) {
                this._nextState({ maxDate: maxDate });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "markDisabled", {
        set: /**
         * @param {?} markDisabled
         * @return {?}
         */
        function (markDisabled) {
            if (this._state.markDisabled !== markDisabled) {
                this._nextState({ markDisabled: markDisabled });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "minDate", {
        set: /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            /** @type {?} */
            var minDate = this.toValidDate(date, null);
            if (isChangedDate(this._state.minDate, minDate)) {
                this._nextState({ minDate: minDate });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "navigation", {
        set: /**
         * @param {?} navigation
         * @return {?}
         */
        function (navigation) {
            if (this._state.navigation !== navigation) {
                this._nextState({ navigation: navigation });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbDatepickerService.prototype, "outsideDays", {
        set: /**
         * @param {?} outsideDays
         * @return {?}
         */
        function (outsideDays) {
            if (this._state.outsideDays !== outsideDays) {
                this._nextState({ outsideDays: outsideDays });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDatepickerService.prototype.focus = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (!this._state.disabled && this._calendar.isValid(date) && isChangedDate(this._state.focusDate, date)) {
            this._nextState({ focusDate: date });
        }
    };
    /**
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    NgbDatepickerService.prototype.focusMove = /**
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    function (period, number) {
        this.focus(this._calendar.getNext(this._state.focusDate, period, number));
    };
    /**
     * @return {?}
     */
    NgbDatepickerService.prototype.focusSelect = /**
     * @return {?}
     */
    function () {
        if (isDateSelectable(this._state.focusDate, this._state)) {
            this.select(this._state.focusDate, { emitEvent: true });
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDatepickerService.prototype.open = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var firstDate = this.toValidDate(date, this._calendar.getToday());
        if (!this._state.disabled) {
            this._nextState({ firstDate: firstDate });
        }
    };
    /**
     * @param {?} state
     * @return {?}
     */
    NgbDatepickerService.prototype.reset = /**
     * @param {?} state
     * @return {?}
     */
    function (state) { this._state = state; };
    /**
     * @param {?} date
     * @param {?=} options
     * @return {?}
     */
    NgbDatepickerService.prototype.select = /**
     * @param {?} date
     * @param {?=} options
     * @return {?}
     */
    function (date, options) {
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var selectedDate = this.toValidDate(date, null);
        if (!this._state.disabled) {
            if (isChangedDate(this._state.selectedDate, selectedDate)) {
                this._nextState({ selectedDate: selectedDate });
            }
            if (options.emitEvent && isDateSelectable(selectedDate, this._state)) {
                this._select$.next(selectedDate);
            }
        }
    };
    /**
     * @param {?} date
     * @param {?=} defaultValue
     * @return {?}
     */
    NgbDatepickerService.prototype.toValidDate = /**
     * @param {?} date
     * @param {?=} defaultValue
     * @return {?}
     */
    function (date, defaultValue) {
        /** @type {?} */
        var ngbDate = NgbDate.from(date);
        if (defaultValue === undefined) {
            defaultValue = this._calendar.getToday();
        }
        return this._calendar.isValid(ngbDate) ? ngbDate : defaultValue;
    };
    /**
     * @param {?} patch
     * @return {?}
     */
    NgbDatepickerService.prototype._nextState = /**
     * @param {?} patch
     * @return {?}
     */
    function (patch) {
        /** @type {?} */
        var newState = this._updateState(patch);
        this._patchContexts(newState);
        this._state = newState;
        this._model$.next(this._state);
    };
    /**
     * @param {?} state
     * @return {?}
     */
    NgbDatepickerService.prototype._patchContexts = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        var months = state.months, displayMonths = state.displayMonths, selectedDate = state.selectedDate, focusDate = state.focusDate, focusVisible = state.focusVisible, disabled = state.disabled, outsideDays = state.outsideDays;
        state.months.forEach(function (month) {
            month.weeks.forEach(function (week) {
                week.days.forEach(function (day) {
                    // patch focus flag
                    if (focusDate) {
                        day.context.focused = focusDate.equals(day.date) && focusVisible;
                    }
                    // calculating tabindex
                    day.tabindex = !disabled && day.date.equals(focusDate) && focusDate.month === month.number ? 0 : -1;
                    // override context disabled
                    if (disabled === true) {
                        day.context.disabled = true;
                    }
                    // patch selection flag
                    if (selectedDate !== undefined) {
                        day.context.selected = selectedDate !== null && selectedDate.equals(day.date);
                    }
                    // visibility
                    if (month.number !== day.date.month) {
                        day.hidden = outsideDays === 'hidden' || outsideDays === 'collapsed' ||
                            (displayMonths > 1 && day.date.after(months[0].firstDate) &&
                                day.date.before(months[displayMonths - 1].lastDate));
                    }
                });
            });
        });
    };
    /**
     * @param {?} patch
     * @return {?}
     */
    NgbDatepickerService.prototype._updateState = /**
     * @param {?} patch
     * @return {?}
     */
    function (patch) {
        // patching fields
        /** @type {?} */
        var state = Object.assign({}, this._state, patch);
        /** @type {?} */
        var startDate = state.firstDate;
        // min/max dates changed
        if ('minDate' in patch || 'maxDate' in patch) {
            checkMinBeforeMax(state.minDate, state.maxDate);
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
        }
        // disabled
        if ('disabled' in patch) {
            state.focusVisible = false;
        }
        // initial rebuild via 'select()'
        if ('selectedDate' in patch && this._state.months.length === 0) {
            startDate = state.selectedDate;
        }
        // terminate early if only focus visibility was changed
        if ('focusVisible' in patch) {
            return state;
        }
        // focus date changed
        if ('focusDate' in patch) {
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
            // nothing to rebuild if only focus changed and it is still visible
            if (state.months.length !== 0 && !state.focusDate.before(state.firstDate) &&
                !state.focusDate.after(state.lastDate)) {
                return state;
            }
        }
        // first date changed
        if ('firstDate' in patch) {
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.firstDate;
        }
        // rebuilding months
        if (startDate) {
            /** @type {?} */
            var forceRebuild = 'dayTemplateData' in patch || 'firstDayOfWeek' in patch || 'markDisabled' in patch ||
                'minDate' in patch || 'maxDate' in patch || 'disabled' in patch || 'outsideDays' in patch;
            /** @type {?} */
            var months = buildMonths(this._calendar, startDate, state, this._i18n, forceRebuild);
            // updating months and boundary dates
            state.months = months;
            state.firstDate = months.length > 0 ? months[0].firstDate : undefined;
            state.lastDate = months.length > 0 ? months[months.length - 1].lastDate : undefined;
            // reset selected date if 'markDisabled' returns true
            if ('selectedDate' in patch && !isDateSelectable(state.selectedDate, state)) {
                state.selectedDate = null;
            }
            // adjusting focus after months were built
            if ('firstDate' in patch) {
                if (state.focusDate === undefined || state.focusDate.before(state.firstDate) ||
                    state.focusDate.after(state.lastDate)) {
                    state.focusDate = startDate;
                }
            }
            // adjusting months/years for the select box navigation
            /** @type {?} */
            var yearChanged = !this._state.firstDate || this._state.firstDate.year !== state.firstDate.year;
            /** @type {?} */
            var monthChanged = !this._state.firstDate || this._state.firstDate.month !== state.firstDate.month;
            if (state.navigation === 'select') {
                // years ->  boundaries (min/max were changed)
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.years.length === 0 || yearChanged) {
                    state.selectBoxes.years = generateSelectBoxYears(state.firstDate, state.minDate, state.maxDate);
                }
                // months -> when current year or boundaries change
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.months.length === 0 || yearChanged) {
                    state.selectBoxes.months =
                        generateSelectBoxMonths(this._calendar, state.firstDate, state.minDate, state.maxDate);
                }
            }
            else {
                state.selectBoxes = { years: [], months: [] };
            }
            // updating navigation arrows -> boundaries change (min/max) or month/year changes
            if ((state.navigation === 'arrows' || state.navigation === 'select') &&
                (monthChanged || yearChanged || 'minDate' in patch || 'maxDate' in patch || 'disabled' in patch)) {
                state.prevDisabled = state.disabled || prevMonthDisabled(this._calendar, state.firstDate, state.minDate);
                state.nextDisabled = state.disabled || nextMonthDisabled(this._calendar, state.lastDate, state.maxDate);
            }
        }
        return state;
    };
    NgbDatepickerService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NgbDatepickerService.ctorParameters = function () { return [
        { type: NgbCalendar },
        { type: NgbDatepickerI18n }
    ]; };
    return NgbDatepickerService;
}());
export { NgbDatepickerService };
if (false) {
    /** @type {?} */
    NgbDatepickerService.prototype._model$;
    /** @type {?} */
    NgbDatepickerService.prototype._select$;
    /** @type {?} */
    NgbDatepickerService.prototype._state;
    /** @type {?} */
    NgbDatepickerService.prototype._calendar;
    /** @type {?} */
    NgbDatepickerService.prototype._i18n;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2RhdGVwaWNrZXItc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFdBQVcsRUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFHbkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNsRCxPQUFPLEVBQWEsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCxXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLHNCQUFzQixFQUN0Qix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNsQixNQUFNLG9CQUFvQixDQUFDO0FBRTVCLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUVwRDtJQXdGRSw4QkFBb0IsU0FBc0IsRUFBVSxLQUF3QjtRQUF4RCxjQUFTLEdBQVQsU0FBUyxDQUFhO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUF0RnBFLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBdUIsQ0FBQztRQUU3QyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQUVsQyxXQUFNLEdBQXdCO1lBQ3BDLFFBQVEsRUFBRSxLQUFLO1lBQ2YsYUFBYSxFQUFFLENBQUM7WUFDaEIsY0FBYyxFQUFFLENBQUM7WUFDakIsWUFBWSxFQUFFLEtBQUs7WUFDbkIsTUFBTSxFQUFFLEVBQUU7WUFD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QUMsS0FBSyxDQUFDLFVBQVUsS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxRQUFRLENBQUM7Z0JBQ2hFLENBQUMsWUFBWSxJQUFJLFdBQVcsSUFBSSxTQUFTLElBQUksS0FBSyxJQUFJLFNBQVMsSUFBSSxLQUFLLElBQUksVUFBVSxJQUFJLEtBQUssQ0FBQyxFQUFFO2dCQUNwRyxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxRQUFRLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDekcsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsUUFBUSxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDekc7U0FDRjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Z0JBclJGLFVBQVU7Ozs7Z0JBdEJILFdBQVc7Z0JBb0JYLGlCQUFpQjs7SUF3UnpCLDJCQUFDO0NBQUEsQUF0UkQsSUFzUkM7U0FyUlksb0JBQW9COzs7SUFDL0IsdUNBQXFEOztJQUVyRCx3Q0FBMEM7O0lBRTFDLHNDQVlFOztJQXNFVSx5Q0FBOEI7O0lBQUUscUNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ2JDYWxlbmRhciwgTmdiUGVyaW9kfSBmcm9tICcuL25nYi1jYWxlbmRhcic7XG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XG5pbXBvcnQge0RhdGVwaWNrZXJWaWV3TW9kZWwsIE5nYkRheVRlbXBsYXRlRGF0YSwgTmdiTWFya0Rpc2FibGVkfSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtpc0ludGVnZXIsIHRvSW50ZWdlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBidWlsZE1vbnRocyxcbiAgY2hlY2tEYXRlSW5SYW5nZSxcbiAgY2hlY2tNaW5CZWZvcmVNYXgsXG4gIGlzQ2hhbmdlZERhdGUsXG4gIGlzRGF0ZVNlbGVjdGFibGUsXG4gIGdlbmVyYXRlU2VsZWN0Qm94WWVhcnMsXG4gIGdlbmVyYXRlU2VsZWN0Qm94TW9udGhzLFxuICBwcmV2TW9udGhEaXNhYmxlZCxcbiAgbmV4dE1vbnRoRGlzYWJsZWRcbn0gZnJvbSAnLi9kYXRlcGlja2VyLXRvb2xzJztcblxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfbW9kZWwkID0gbmV3IFN1YmplY3Q8RGF0ZXBpY2tlclZpZXdNb2RlbD4oKTtcblxuICBwcml2YXRlIF9zZWxlY3QkID0gbmV3IFN1YmplY3Q8TmdiRGF0ZT4oKTtcblxuICBwcml2YXRlIF9zdGF0ZTogRGF0ZXBpY2tlclZpZXdNb2RlbCA9IHtcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgZGlzcGxheU1vbnRoczogMSxcbiAgICBmaXJzdERheU9mV2VlazogMSxcbiAgICBmb2N1c1Zpc2libGU6IGZhbHNlLFxuICAgIG1vbnRoczogW10sXG4gICAgbmF2aWdhdGlvbjogJ3NlbGVjdCcsXG4gICAgb3V0c2lkZURheXM6ICd2aXNpYmxlJyxcbiAgICBwcmV2RGlzYWJsZWQ6IGZhbHNlLFxuICAgIG5leHREaXNhYmxlZDogZmFsc2UsXG4gICAgc2VsZWN0Qm94ZXM6IHt5ZWFyczogW10sIG1vbnRoczogW119LFxuICAgIHNlbGVjdGVkRGF0ZTogbnVsbFxuICB9O1xuXG4gIGdldCBtb2RlbCQoKTogT2JzZXJ2YWJsZTxEYXRlcGlja2VyVmlld01vZGVsPiB7IHJldHVybiB0aGlzLl9tb2RlbCQucGlwZShmaWx0ZXIobW9kZWwgPT4gbW9kZWwubW9udGhzLmxlbmd0aCA+IDApKTsgfVxuXG4gIGdldCBzZWxlY3QkKCk6IE9ic2VydmFibGU8TmdiRGF0ZT4geyByZXR1cm4gdGhpcy5fc2VsZWN0JC5waXBlKGZpbHRlcihkYXRlID0+IGRhdGUgIT09IG51bGwpKTsgfVxuXG4gIHNldCBkYXlUZW1wbGF0ZURhdGEoZGF5VGVtcGxhdGVEYXRhOiBOZ2JEYXlUZW1wbGF0ZURhdGEpIHtcbiAgICBpZiAodGhpcy5fc3RhdGUuZGF5VGVtcGxhdGVEYXRhICE9PSBkYXlUZW1wbGF0ZURhdGEpIHtcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7ZGF5VGVtcGxhdGVEYXRhfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX3N0YXRlLmRpc2FibGVkICE9PSBkaXNhYmxlZCkge1xuICAgICAgdGhpcy5fbmV4dFN0YXRlKHtkaXNhYmxlZH0pO1xuICAgIH1cbiAgfVxuXG4gIHNldCBkaXNwbGF5TW9udGhzKGRpc3BsYXlNb250aHM6IG51bWJlcikge1xuICAgIGRpc3BsYXlNb250aHMgPSB0b0ludGVnZXIoZGlzcGxheU1vbnRocyk7XG4gICAgaWYgKGlzSW50ZWdlcihkaXNwbGF5TW9udGhzKSAmJiBkaXNwbGF5TW9udGhzID4gMCAmJiB0aGlzLl9zdGF0ZS5kaXNwbGF5TW9udGhzICE9PSBkaXNwbGF5TW9udGhzKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe2Rpc3BsYXlNb250aHN9KTtcbiAgICB9XG4gIH1cblxuICBzZXQgZmlyc3REYXlPZldlZWsoZmlyc3REYXlPZldlZWs6IG51bWJlcikge1xuICAgIGZpcnN0RGF5T2ZXZWVrID0gdG9JbnRlZ2VyKGZpcnN0RGF5T2ZXZWVrKTtcbiAgICBpZiAoaXNJbnRlZ2VyKGZpcnN0RGF5T2ZXZWVrKSAmJiBmaXJzdERheU9mV2VlayA+PSAwICYmIHRoaXMuX3N0YXRlLmZpcnN0RGF5T2ZXZWVrICE9PSBmaXJzdERheU9mV2Vlaykge1xuICAgICAgdGhpcy5fbmV4dFN0YXRlKHtmaXJzdERheU9mV2Vla30pO1xuICAgIH1cbiAgfVxuXG4gIHNldCBmb2N1c1Zpc2libGUoZm9jdXNWaXNpYmxlOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX3N0YXRlLmZvY3VzVmlzaWJsZSAhPT0gZm9jdXNWaXNpYmxlICYmICF0aGlzLl9zdGF0ZS5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fbmV4dFN0YXRlKHtmb2N1c1Zpc2libGV9KTtcbiAgICB9XG4gIH1cblxuICBzZXQgbWF4RGF0ZShkYXRlOiBOZ2JEYXRlKSB7XG4gICAgY29uc3QgbWF4RGF0ZSA9IHRoaXMudG9WYWxpZERhdGUoZGF0ZSwgbnVsbCk7XG4gICAgaWYgKGlzQ2hhbmdlZERhdGUodGhpcy5fc3RhdGUubWF4RGF0ZSwgbWF4RGF0ZSkpIHtcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7bWF4RGF0ZX0pO1xuICAgIH1cbiAgfVxuXG4gIHNldCBtYXJrRGlzYWJsZWQobWFya0Rpc2FibGVkOiBOZ2JNYXJrRGlzYWJsZWQpIHtcbiAgICBpZiAodGhpcy5fc3RhdGUubWFya0Rpc2FibGVkICE9PSBtYXJrRGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7bWFya0Rpc2FibGVkfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0IG1pbkRhdGUoZGF0ZTogTmdiRGF0ZSkge1xuICAgIGNvbnN0IG1pbkRhdGUgPSB0aGlzLnRvVmFsaWREYXRlKGRhdGUsIG51bGwpO1xuICAgIGlmIChpc0NoYW5nZWREYXRlKHRoaXMuX3N0YXRlLm1pbkRhdGUsIG1pbkRhdGUpKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe21pbkRhdGV9KTtcbiAgICB9XG4gIH1cblxuICBzZXQgbmF2aWdhdGlvbihuYXZpZ2F0aW9uOiAnc2VsZWN0JyB8ICdhcnJvd3MnIHwgJ25vbmUnKSB7XG4gICAgaWYgKHRoaXMuX3N0YXRlLm5hdmlnYXRpb24gIT09IG5hdmlnYXRpb24pIHtcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7bmF2aWdhdGlvbn0pO1xuICAgIH1cbiAgfVxuXG4gIHNldCBvdXRzaWRlRGF5cyhvdXRzaWRlRGF5czogJ3Zpc2libGUnIHwgJ2NvbGxhcHNlZCcgfCAnaGlkZGVuJykge1xuICAgIGlmICh0aGlzLl9zdGF0ZS5vdXRzaWRlRGF5cyAhPT0gb3V0c2lkZURheXMpIHtcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7b3V0c2lkZURheXN9KTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jYWxlbmRhcjogTmdiQ2FsZW5kYXIsIHByaXZhdGUgX2kxOG46IE5nYkRhdGVwaWNrZXJJMThuKSB7fVxuXG4gIGZvY3VzKGRhdGU6IE5nYkRhdGUpIHtcbiAgICBpZiAoIXRoaXMuX3N0YXRlLmRpc2FibGVkICYmIHRoaXMuX2NhbGVuZGFyLmlzVmFsaWQoZGF0ZSkgJiYgaXNDaGFuZ2VkRGF0ZSh0aGlzLl9zdGF0ZS5mb2N1c0RhdGUsIGRhdGUpKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe2ZvY3VzRGF0ZTogZGF0ZX0pO1xuICAgIH1cbiAgfVxuXG4gIGZvY3VzTW92ZShwZXJpb2Q/OiBOZ2JQZXJpb2QsIG51bWJlcj86IG51bWJlcikge1xuICAgIHRoaXMuZm9jdXModGhpcy5fY2FsZW5kYXIuZ2V0TmV4dCh0aGlzLl9zdGF0ZS5mb2N1c0RhdGUsIHBlcmlvZCwgbnVtYmVyKSk7XG4gIH1cblxuICBmb2N1c1NlbGVjdCgpIHtcbiAgICBpZiAoaXNEYXRlU2VsZWN0YWJsZSh0aGlzLl9zdGF0ZS5mb2N1c0RhdGUsIHRoaXMuX3N0YXRlKSkge1xuICAgICAgdGhpcy5zZWxlY3QodGhpcy5fc3RhdGUuZm9jdXNEYXRlLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XG4gICAgfVxuICB9XG5cbiAgb3BlbihkYXRlOiBOZ2JEYXRlKSB7XG4gICAgY29uc3QgZmlyc3REYXRlID0gdGhpcy50b1ZhbGlkRGF0ZShkYXRlLCB0aGlzLl9jYWxlbmRhci5nZXRUb2RheSgpKTtcbiAgICBpZiAoIXRoaXMuX3N0YXRlLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe2ZpcnN0RGF0ZX0pO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0KHN0YXRlOiBEYXRlcGlja2VyVmlld01vZGVsKSB7IHRoaXMuX3N0YXRlID0gc3RhdGU7IH1cblxuICBzZWxlY3QoZGF0ZTogTmdiRGF0ZSwgb3B0aW9uczoge2VtaXRFdmVudD86IGJvb2xlYW59ID0ge30pIHtcbiAgICBjb25zdCBzZWxlY3RlZERhdGUgPSB0aGlzLnRvVmFsaWREYXRlKGRhdGUsIG51bGwpO1xuICAgIGlmICghdGhpcy5fc3RhdGUuZGlzYWJsZWQpIHtcbiAgICAgIGlmIChpc0NoYW5nZWREYXRlKHRoaXMuX3N0YXRlLnNlbGVjdGVkRGF0ZSwgc2VsZWN0ZWREYXRlKSkge1xuICAgICAgICB0aGlzLl9uZXh0U3RhdGUoe3NlbGVjdGVkRGF0ZX0pO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5lbWl0RXZlbnQgJiYgaXNEYXRlU2VsZWN0YWJsZShzZWxlY3RlZERhdGUsIHRoaXMuX3N0YXRlKSkge1xuICAgICAgICB0aGlzLl9zZWxlY3QkLm5leHQoc2VsZWN0ZWREYXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b1ZhbGlkRGF0ZShkYXRlOiBOZ2JEYXRlU3RydWN0LCBkZWZhdWx0VmFsdWU/OiBOZ2JEYXRlKTogTmdiRGF0ZSB7XG4gICAgY29uc3QgbmdiRGF0ZSA9IE5nYkRhdGUuZnJvbShkYXRlKTtcbiAgICBpZiAoZGVmYXVsdFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGRlZmF1bHRWYWx1ZSA9IHRoaXMuX2NhbGVuZGFyLmdldFRvZGF5KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jYWxlbmRhci5pc1ZhbGlkKG5nYkRhdGUpID8gbmdiRGF0ZSA6IGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX25leHRTdGF0ZShwYXRjaDogUGFydGlhbDxEYXRlcGlja2VyVmlld01vZGVsPikge1xuICAgIGNvbnN0IG5ld1N0YXRlID0gdGhpcy5fdXBkYXRlU3RhdGUocGF0Y2gpO1xuICAgIHRoaXMuX3BhdGNoQ29udGV4dHMobmV3U3RhdGUpO1xuICAgIHRoaXMuX3N0YXRlID0gbmV3U3RhdGU7XG4gICAgdGhpcy5fbW9kZWwkLm5leHQodGhpcy5fc3RhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGF0Y2hDb250ZXh0cyhzdGF0ZTogRGF0ZXBpY2tlclZpZXdNb2RlbCkge1xuICAgIGNvbnN0IHttb250aHMsIGRpc3BsYXlNb250aHMsIHNlbGVjdGVkRGF0ZSwgZm9jdXNEYXRlLCBmb2N1c1Zpc2libGUsIGRpc2FibGVkLCBvdXRzaWRlRGF5c30gPSBzdGF0ZTtcbiAgICBzdGF0ZS5tb250aHMuZm9yRWFjaChtb250aCA9PiB7XG4gICAgICBtb250aC53ZWVrcy5mb3JFYWNoKHdlZWsgPT4ge1xuICAgICAgICB3ZWVrLmRheXMuZm9yRWFjaChkYXkgPT4ge1xuXG4gICAgICAgICAgLy8gcGF0Y2ggZm9jdXMgZmxhZ1xuICAgICAgICAgIGlmIChmb2N1c0RhdGUpIHtcbiAgICAgICAgICAgIGRheS5jb250ZXh0LmZvY3VzZWQgPSBmb2N1c0RhdGUuZXF1YWxzKGRheS5kYXRlKSAmJiBmb2N1c1Zpc2libGU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gY2FsY3VsYXRpbmcgdGFiaW5kZXhcbiAgICAgICAgICBkYXkudGFiaW5kZXggPSAhZGlzYWJsZWQgJiYgZGF5LmRhdGUuZXF1YWxzKGZvY3VzRGF0ZSkgJiYgZm9jdXNEYXRlLm1vbnRoID09PSBtb250aC5udW1iZXIgPyAwIDogLTE7XG5cbiAgICAgICAgICAvLyBvdmVycmlkZSBjb250ZXh0IGRpc2FibGVkXG4gICAgICAgICAgaWYgKGRpc2FibGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBkYXkuY29udGV4dC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gcGF0Y2ggc2VsZWN0aW9uIGZsYWdcbiAgICAgICAgICBpZiAoc2VsZWN0ZWREYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRheS5jb250ZXh0LnNlbGVjdGVkID0gc2VsZWN0ZWREYXRlICE9PSBudWxsICYmIHNlbGVjdGVkRGF0ZS5lcXVhbHMoZGF5LmRhdGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHZpc2liaWxpdHlcbiAgICAgICAgICBpZiAobW9udGgubnVtYmVyICE9PSBkYXkuZGF0ZS5tb250aCkge1xuICAgICAgICAgICAgZGF5LmhpZGRlbiA9IG91dHNpZGVEYXlzID09PSAnaGlkZGVuJyB8fCBvdXRzaWRlRGF5cyA9PT0gJ2NvbGxhcHNlZCcgfHxcbiAgICAgICAgICAgICAgICAoZGlzcGxheU1vbnRocyA+IDEgJiYgZGF5LmRhdGUuYWZ0ZXIobW9udGhzWzBdLmZpcnN0RGF0ZSkgJiZcbiAgICAgICAgICAgICAgICAgZGF5LmRhdGUuYmVmb3JlKG1vbnRoc1tkaXNwbGF5TW9udGhzIC0gMV0ubGFzdERhdGUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTdGF0ZShwYXRjaDogUGFydGlhbDxEYXRlcGlja2VyVmlld01vZGVsPik6IERhdGVwaWNrZXJWaWV3TW9kZWwge1xuICAgIC8vIHBhdGNoaW5nIGZpZWxkc1xuICAgIGNvbnN0IHN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fc3RhdGUsIHBhdGNoKTtcblxuICAgIGxldCBzdGFydERhdGUgPSBzdGF0ZS5maXJzdERhdGU7XG5cbiAgICAvLyBtaW4vbWF4IGRhdGVzIGNoYW5nZWRcbiAgICBpZiAoJ21pbkRhdGUnIGluIHBhdGNoIHx8ICdtYXhEYXRlJyBpbiBwYXRjaCkge1xuICAgICAgY2hlY2tNaW5CZWZvcmVNYXgoc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICBzdGF0ZS5mb2N1c0RhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZvY3VzRGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICBzdGF0ZS5maXJzdERhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICBzdGFydERhdGUgPSBzdGF0ZS5mb2N1c0RhdGU7XG4gICAgfVxuXG4gICAgLy8gZGlzYWJsZWRcbiAgICBpZiAoJ2Rpc2FibGVkJyBpbiBwYXRjaCkge1xuICAgICAgc3RhdGUuZm9jdXNWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gaW5pdGlhbCByZWJ1aWxkIHZpYSAnc2VsZWN0KCknXG4gICAgaWYgKCdzZWxlY3RlZERhdGUnIGluIHBhdGNoICYmIHRoaXMuX3N0YXRlLm1vbnRocy5sZW5ndGggPT09IDApIHtcbiAgICAgIHN0YXJ0RGF0ZSA9IHN0YXRlLnNlbGVjdGVkRGF0ZTtcbiAgICB9XG5cbiAgICAvLyB0ZXJtaW5hdGUgZWFybHkgaWYgb25seSBmb2N1cyB2aXNpYmlsaXR5IHdhcyBjaGFuZ2VkXG4gICAgaWYgKCdmb2N1c1Zpc2libGUnIGluIHBhdGNoKSB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgLy8gZm9jdXMgZGF0ZSBjaGFuZ2VkXG4gICAgaWYgKCdmb2N1c0RhdGUnIGluIHBhdGNoKSB7XG4gICAgICBzdGF0ZS5mb2N1c0RhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZvY3VzRGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICBzdGFydERhdGUgPSBzdGF0ZS5mb2N1c0RhdGU7XG5cbiAgICAgIC8vIG5vdGhpbmcgdG8gcmVidWlsZCBpZiBvbmx5IGZvY3VzIGNoYW5nZWQgYW5kIGl0IGlzIHN0aWxsIHZpc2libGVcbiAgICAgIGlmIChzdGF0ZS5tb250aHMubGVuZ3RoICE9PSAwICYmICFzdGF0ZS5mb2N1c0RhdGUuYmVmb3JlKHN0YXRlLmZpcnN0RGF0ZSkgJiZcbiAgICAgICAgICAhc3RhdGUuZm9jdXNEYXRlLmFmdGVyKHN0YXRlLmxhc3REYXRlKSkge1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmlyc3QgZGF0ZSBjaGFuZ2VkXG4gICAgaWYgKCdmaXJzdERhdGUnIGluIHBhdGNoKSB7XG4gICAgICBzdGF0ZS5maXJzdERhdGUgPSBjaGVja0RhdGVJblJhbmdlKHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICBzdGFydERhdGUgPSBzdGF0ZS5maXJzdERhdGU7XG4gICAgfVxuXG4gICAgLy8gcmVidWlsZGluZyBtb250aHNcbiAgICBpZiAoc3RhcnREYXRlKSB7XG4gICAgICBjb25zdCBmb3JjZVJlYnVpbGQgPSAnZGF5VGVtcGxhdGVEYXRhJyBpbiBwYXRjaCB8fCAnZmlyc3REYXlPZldlZWsnIGluIHBhdGNoIHx8ICdtYXJrRGlzYWJsZWQnIGluIHBhdGNoIHx8XG4gICAgICAgICAgJ21pbkRhdGUnIGluIHBhdGNoIHx8ICdtYXhEYXRlJyBpbiBwYXRjaCB8fCAnZGlzYWJsZWQnIGluIHBhdGNoIHx8ICdvdXRzaWRlRGF5cycgaW4gcGF0Y2g7XG5cbiAgICAgIGNvbnN0IG1vbnRocyA9IGJ1aWxkTW9udGhzKHRoaXMuX2NhbGVuZGFyLCBzdGFydERhdGUsIHN0YXRlLCB0aGlzLl9pMThuLCBmb3JjZVJlYnVpbGQpO1xuXG4gICAgICAvLyB1cGRhdGluZyBtb250aHMgYW5kIGJvdW5kYXJ5IGRhdGVzXG4gICAgICBzdGF0ZS5tb250aHMgPSBtb250aHM7XG4gICAgICBzdGF0ZS5maXJzdERhdGUgPSBtb250aHMubGVuZ3RoID4gMCA/IG1vbnRoc1swXS5maXJzdERhdGUgOiB1bmRlZmluZWQ7XG4gICAgICBzdGF0ZS5sYXN0RGF0ZSA9IG1vbnRocy5sZW5ndGggPiAwID8gbW9udGhzW21vbnRocy5sZW5ndGggLSAxXS5sYXN0RGF0ZSA6IHVuZGVmaW5lZDtcblxuICAgICAgLy8gcmVzZXQgc2VsZWN0ZWQgZGF0ZSBpZiAnbWFya0Rpc2FibGVkJyByZXR1cm5zIHRydWVcbiAgICAgIGlmICgnc2VsZWN0ZWREYXRlJyBpbiBwYXRjaCAmJiAhaXNEYXRlU2VsZWN0YWJsZShzdGF0ZS5zZWxlY3RlZERhdGUsIHN0YXRlKSkge1xuICAgICAgICBzdGF0ZS5zZWxlY3RlZERhdGUgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBhZGp1c3RpbmcgZm9jdXMgYWZ0ZXIgbW9udGhzIHdlcmUgYnVpbHRcbiAgICAgIGlmICgnZmlyc3REYXRlJyBpbiBwYXRjaCkge1xuICAgICAgICBpZiAoc3RhdGUuZm9jdXNEYXRlID09PSB1bmRlZmluZWQgfHwgc3RhdGUuZm9jdXNEYXRlLmJlZm9yZShzdGF0ZS5maXJzdERhdGUpIHx8XG4gICAgICAgICAgICBzdGF0ZS5mb2N1c0RhdGUuYWZ0ZXIoc3RhdGUubGFzdERhdGUpKSB7XG4gICAgICAgICAgc3RhdGUuZm9jdXNEYXRlID0gc3RhcnREYXRlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGFkanVzdGluZyBtb250aHMveWVhcnMgZm9yIHRoZSBzZWxlY3QgYm94IG5hdmlnYXRpb25cbiAgICAgIGNvbnN0IHllYXJDaGFuZ2VkID0gIXRoaXMuX3N0YXRlLmZpcnN0RGF0ZSB8fCB0aGlzLl9zdGF0ZS5maXJzdERhdGUueWVhciAhPT0gc3RhdGUuZmlyc3REYXRlLnllYXI7XG4gICAgICBjb25zdCBtb250aENoYW5nZWQgPSAhdGhpcy5fc3RhdGUuZmlyc3REYXRlIHx8IHRoaXMuX3N0YXRlLmZpcnN0RGF0ZS5tb250aCAhPT0gc3RhdGUuZmlyc3REYXRlLm1vbnRoO1xuICAgICAgaWYgKHN0YXRlLm5hdmlnYXRpb24gPT09ICdzZWxlY3QnKSB7XG4gICAgICAgIC8vIHllYXJzIC0+ICBib3VuZGFyaWVzIChtaW4vbWF4IHdlcmUgY2hhbmdlZClcbiAgICAgICAgaWYgKCdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2ggfHwgc3RhdGUuc2VsZWN0Qm94ZXMueWVhcnMubGVuZ3RoID09PSAwIHx8IHllYXJDaGFuZ2VkKSB7XG4gICAgICAgICAgc3RhdGUuc2VsZWN0Qm94ZXMueWVhcnMgPSBnZW5lcmF0ZVNlbGVjdEJveFllYXJzKHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtb250aHMgLT4gd2hlbiBjdXJyZW50IHllYXIgb3IgYm91bmRhcmllcyBjaGFuZ2VcbiAgICAgICAgaWYgKCdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2ggfHwgc3RhdGUuc2VsZWN0Qm94ZXMubW9udGhzLmxlbmd0aCA9PT0gMCB8fCB5ZWFyQ2hhbmdlZCkge1xuICAgICAgICAgIHN0YXRlLnNlbGVjdEJveGVzLm1vbnRocyA9XG4gICAgICAgICAgICAgIGdlbmVyYXRlU2VsZWN0Qm94TW9udGhzKHRoaXMuX2NhbGVuZGFyLCBzdGF0ZS5maXJzdERhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZS5zZWxlY3RCb3hlcyA9IHt5ZWFyczogW10sIG1vbnRoczogW119O1xuICAgICAgfVxuXG4gICAgICAvLyB1cGRhdGluZyBuYXZpZ2F0aW9uIGFycm93cyAtPiBib3VuZGFyaWVzIGNoYW5nZSAobWluL21heCkgb3IgbW9udGgveWVhciBjaGFuZ2VzXG4gICAgICBpZiAoKHN0YXRlLm5hdmlnYXRpb24gPT09ICdhcnJvd3MnIHx8IHN0YXRlLm5hdmlnYXRpb24gPT09ICdzZWxlY3QnKSAmJlxuICAgICAgICAgIChtb250aENoYW5nZWQgfHwgeWVhckNoYW5nZWQgfHwgJ21pbkRhdGUnIGluIHBhdGNoIHx8ICdtYXhEYXRlJyBpbiBwYXRjaCB8fCAnZGlzYWJsZWQnIGluIHBhdGNoKSkge1xuICAgICAgICBzdGF0ZS5wcmV2RGlzYWJsZWQgPSBzdGF0ZS5kaXNhYmxlZCB8fCBwcmV2TW9udGhEaXNhYmxlZCh0aGlzLl9jYWxlbmRhciwgc3RhdGUuZmlyc3REYXRlLCBzdGF0ZS5taW5EYXRlKTtcbiAgICAgICAgc3RhdGUubmV4dERpc2FibGVkID0gc3RhdGUuZGlzYWJsZWQgfHwgbmV4dE1vbnRoRGlzYWJsZWQodGhpcy5fY2FsZW5kYXIsIHN0YXRlLmxhc3REYXRlLCBzdGF0ZS5tYXhEYXRlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiJdfQ==