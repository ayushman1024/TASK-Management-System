/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { fromEvent, merge, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, NgZone, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbCalendar } from './ngb-calendar';
import { NgbDate } from './ngb-date';
import { NgbDatepickerService } from './datepicker-service';
import { NgbDatepickerKeyMapService } from './datepicker-keymap-service';
import { NavigationEvent } from './datepicker-view-model';
import { NgbDatepickerConfig } from './datepicker-config';
import { NgbDateAdapter } from './adapters/ngb-date-adapter';
import { NgbDatepickerI18n } from './datepicker-i18n';
import { isChangedDate } from './datepicker-tools';
import { hasClassName } from '../util/util';
/** @type {?} */
var NGB_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgbDatepicker; }),
    multi: true
};
/**
 * The payload of the datepicker navigation event
 * @record
 */
export function NgbDatepickerNavigateEvent() { }
if (false) {
    /**
     * Currently displayed month
     * @type {?}
     */
    NgbDatepickerNavigateEvent.prototype.current;
    /**
     * Month we're navigating to
     * @type {?}
     */
    NgbDatepickerNavigateEvent.prototype.next;
    /**
     * Function that will prevent navigation if called
     *
     * \@since 4.1.0
     * @type {?}
     */
    NgbDatepickerNavigateEvent.prototype.preventDefault;
}
/**
 * A lightweight and highly configurable datepicker directive
 */
var NgbDatepicker = /** @class */ (function () {
    function NgbDatepicker(_keyMapService, _service, _calendar, i18n, config, _cd, _elementRef, _ngbDateAdapter, _ngZone) {
        var _this = this;
        this._keyMapService = _keyMapService;
        this._service = _service;
        this._calendar = _calendar;
        this.i18n = i18n;
        this._cd = _cd;
        this._elementRef = _elementRef;
        this._ngbDateAdapter = _ngbDateAdapter;
        this._ngZone = _ngZone;
        this._destroyed$ = new Subject();
        /**
         * An event fired right before the navigation happens and currently displayed month changes.
         * See NgbDatepickerNavigateEvent for the payload info.
         */
        this.navigate = new EventEmitter();
        /**
         * An event fired when user selects a date using keyboard or mouse.
         * The payload of the event is currently selected NgbDate.
         */
        this.select = new EventEmitter();
        this.onChange = function (_) { };
        this.onTouched = function () { };
        ['dayTemplate', 'dayTemplateData', 'displayMonths', 'firstDayOfWeek', 'footerTemplate', 'markDisabled', 'minDate',
            'maxDate', 'navigation', 'outsideDays', 'showWeekdays', 'showWeekNumbers', 'startDate']
            .forEach(function (input) { return _this[input] = config[input]; });
        _service.select$.pipe(takeUntil(this._destroyed$)).subscribe(function (date) { _this.select.emit(date); });
        _service.model$.pipe(takeUntil(this._destroyed$)).subscribe(function (model) {
            /** @type {?} */
            var newDate = model.firstDate;
            /** @type {?} */
            var oldDate = _this.model ? _this.model.firstDate : null;
            /** @type {?} */
            var navigationPrevented = false;
            // emitting navigation event if the first month changes
            if (!newDate.equals(oldDate)) {
                _this.navigate.emit({
                    current: oldDate ? { year: oldDate.year, month: oldDate.month } : null,
                    next: { year: newDate.year, month: newDate.month },
                    preventDefault: function () { return navigationPrevented = true; }
                });
                // can't prevent the very first navigation
                if (navigationPrevented && oldDate !== null) {
                    _this._service.reset(_this.model);
                    return;
                }
            }
            /** @type {?} */
            var newSelectedDate = model.selectedDate;
            /** @type {?} */
            var newFocusedDate = model.focusDate;
            /** @type {?} */
            var oldFocusedDate = _this.model ? _this.model.focusDate : null;
            _this.model = model;
            // handling selection change
            if (isChangedDate(newSelectedDate, _this._controlValue)) {
                _this._controlValue = newSelectedDate;
                _this.onTouched();
                _this.onChange(_this._ngbDateAdapter.toModel(newSelectedDate));
            }
            // handling focus change
            if (isChangedDate(newFocusedDate, oldFocusedDate) && oldFocusedDate && model.focusVisible) {
                _this.focus();
            }
            _cd.markForCheck();
        });
    }
    /**
     * Manually focus the focusable day in the datepicker
     */
    /**
     * Manually focus the focusable day in the datepicker
     * @return {?}
     */
    NgbDatepicker.prototype.focus = /**
     * Manually focus the focusable day in the datepicker
     * @return {?}
     */
    function () {
        var _this = this;
        this._ngZone.onStable.asObservable().pipe(take(1)).subscribe(function () {
            /** @type {?} */
            var elementToFocus = _this._elementRef.nativeElement.querySelector('div.ngb-dp-day[tabindex="0"]');
            if (elementToFocus) {
                elementToFocus.focus();
            }
        });
    };
    /**
     * Navigates current view to provided date.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     * Use 'startDate' input as an alternative
     */
    /**
     * Navigates current view to provided date.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     * Use 'startDate' input as an alternative
     * @param {?=} date
     * @return {?}
     */
    NgbDatepicker.prototype.navigateTo = /**
     * Navigates current view to provided date.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     * Use 'startDate' input as an alternative
     * @param {?=} date
     * @return {?}
     */
    function (date) {
        this._service.open(NgbDate.from(date ? date.day ? (/** @type {?} */ (date)) : tslib_1.__assign({}, date, { day: 1 }) : null));
    };
    /**
     * @return {?}
     */
    NgbDatepicker.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._ngZone.runOutsideAngular(function () {
            /** @type {?} */
            var focusIns$ = fromEvent(_this._monthsEl.nativeElement, 'focusin');
            /** @type {?} */
            var focusOuts$ = fromEvent(_this._monthsEl.nativeElement, 'focusout');
            // we're changing 'focusVisible' only when entering or leaving months view
            // and ignoring all focus events where both 'target' and 'related' target are day cells
            merge(focusIns$, focusOuts$)
                .pipe(filter(function (_a) {
                var target = _a.target, relatedTarget = _a.relatedTarget;
                return !(hasClassName(target, 'ngb-dp-day') && hasClassName(relatedTarget, 'ngb-dp-day'));
            }), takeUntil(_this._destroyed$))
                .subscribe(function (_a) {
                var type = _a.type;
                return _this._ngZone.run(function () { return _this._service.focusVisible = type === 'focusin'; });
            });
        });
    };
    /**
     * @return {?}
     */
    NgbDatepicker.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () { this._destroyed$.next(); };
    /**
     * @return {?}
     */
    NgbDatepicker.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.model === undefined) {
            ['dayTemplateData', 'displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate',
                'outsideDays']
                .forEach(function (input) { return _this._service[input] = _this[input]; });
            this.navigateTo(this.startDate);
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbDatepicker.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        ['dayTemplateData', 'displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate',
            'outsideDays']
            .filter(function (input) { return input in changes; })
            .forEach(function (input) { return _this._service[input] = _this[input]; });
        if ('startDate' in changes) {
            this.navigateTo(this.startDate);
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDatepicker.prototype.onDateSelect = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this._service.focus(date);
        this._service.select(date, { emitEvent: true });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbDatepicker.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) { this._keyMapService.processKey(event); };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDatepicker.prototype.onNavigateDateSelect = /**
     * @param {?} date
     * @return {?}
     */
    function (date) { this._service.open(date); };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbDatepicker.prototype.onNavigateEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        switch (event) {
            case NavigationEvent.PREV:
                this._service.open(this._calendar.getPrev(this.model.firstDate, 'm', 1));
                break;
            case NavigationEvent.NEXT:
                this._service.open(this._calendar.getNext(this.model.firstDate, 'm', 1));
                break;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbDatepicker.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbDatepicker.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onTouched = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgbDatepicker.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) { this._service.disabled = isDisabled; };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbDatepicker.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._controlValue = NgbDate.from(this._ngbDateAdapter.fromModel(value));
        this._service.select(this._controlValue);
    };
    NgbDatepicker.decorators = [
        { type: Component, args: [{
                    exportAs: 'ngbDatepicker',
                    selector: 'ngb-datepicker',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <ng-template #dt let-date=\"date\" let-currentMonth=\"currentMonth\" let-selected=\"selected\" let-disabled=\"disabled\" let-focused=\"focused\">\n      <div ngbDatepickerDayView\n        [date]=\"date\"\n        [currentMonth]=\"currentMonth\"\n        [selected]=\"selected\"\n        [disabled]=\"disabled\"\n        [focused]=\"focused\">\n      </div>\n    </ng-template>\n\n    <div class=\"ngb-dp-header bg-light\">\n      <ngb-datepicker-navigation *ngIf=\"navigation !== 'none'\"\n        [date]=\"model.firstDate\"\n        [months]=\"model.months\"\n        [disabled]=\"model.disabled\"\n        [showSelect]=\"model.navigation === 'select'\"\n        [prevDisabled]=\"model.prevDisabled\"\n        [nextDisabled]=\"model.nextDisabled\"\n        [selectBoxes]=\"model.selectBoxes\"\n        (navigate)=\"onNavigateEvent($event)\"\n        (select)=\"onNavigateDateSelect($event)\">\n      </ngb-datepicker-navigation>\n    </div>\n\n    <div #months class=\"ngb-dp-months\" (keydown)=\"onKeyDown($event)\">\n      <ng-template ngFor let-month [ngForOf]=\"model.months\" let-i=\"index\">\n        <div class=\"ngb-dp-month\">\n          <div *ngIf=\"navigation === 'none' || (displayMonths > 1 && navigation === 'select')\"\n                class=\"ngb-dp-month-name bg-light\">\n            {{ i18n.getMonthFullName(month.number, month.year) }} {{ i18n.getYearNumerals(month.year) }}\n          </div>\n          <ngb-datepicker-month-view\n            [month]=\"month\"\n            [dayTemplate]=\"dayTemplate || dt\"\n            [showWeekdays]=\"showWeekdays\"\n            [showWeekNumbers]=\"showWeekNumbers\"\n            (select)=\"onDateSelect($event)\">\n          </ngb-datepicker-month-view>\n        </div>\n      </ng-template>\n    </div>\n\n    <ng-template [ngTemplateOutlet]=\"footerTemplate\"></ng-template>\n  ",
                    providers: [NGB_DATEPICKER_VALUE_ACCESSOR, NgbDatepickerService, NgbDatepickerKeyMapService],
                    styles: ["ngb-datepicker{border:1px solid #dfdfdf;border-radius:.25rem;display:inline-block}.ngb-dp-month{pointer-events:none}.ngb-dp-header{border-bottom:0;border-radius:.25rem .25rem 0 0;padding-top:.25rem}ngb-datepicker-month-view{pointer-events:auto}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-month+.ngb-dp-month>.ngb-dp-month-name,.ngb-dp-month+.ngb-dp-month>ngb-datepicker-month-view>.ngb-dp-week{padding-left:1rem}.ngb-dp-month:last-child .ngb-dp-week{padding-right:.25rem}.ngb-dp-month:first-child .ngb-dp-week{padding-left:.25rem}.ngb-dp-month>ngb-datepicker-month-view>.ngb-dp-week:last-child{padding-bottom:.25rem}.ngb-dp-months{display:-ms-flexbox;display:flex}"]
                }] }
    ];
    /** @nocollapse */
    NgbDatepicker.ctorParameters = function () { return [
        { type: NgbDatepickerKeyMapService },
        { type: NgbDatepickerService },
        { type: NgbCalendar },
        { type: NgbDatepickerI18n },
        { type: NgbDatepickerConfig },
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgbDateAdapter },
        { type: NgZone }
    ]; };
    NgbDatepicker.propDecorators = {
        _monthsEl: [{ type: ViewChild, args: ['months',] }],
        dayTemplate: [{ type: Input }],
        dayTemplateData: [{ type: Input }],
        displayMonths: [{ type: Input }],
        firstDayOfWeek: [{ type: Input }],
        footerTemplate: [{ type: Input }],
        markDisabled: [{ type: Input }],
        maxDate: [{ type: Input }],
        minDate: [{ type: Input }],
        navigation: [{ type: Input }],
        outsideDays: [{ type: Input }],
        showWeekdays: [{ type: Input }],
        showWeekNumbers: [{ type: Input }],
        startDate: [{ type: Input }],
        navigate: [{ type: Output }],
        select: [{ type: Output }]
    };
    return NgbDatepicker;
}());
export { NgbDatepicker };
if (false) {
    /** @type {?} */
    NgbDatepicker.prototype.model;
    /** @type {?} */
    NgbDatepicker.prototype._monthsEl;
    /** @type {?} */
    NgbDatepicker.prototype._controlValue;
    /** @type {?} */
    NgbDatepicker.prototype._destroyed$;
    /**
     * Reference for the custom template for the day display
     * @type {?}
     */
    NgbDatepicker.prototype.dayTemplate;
    /**
     * Callback to pass any arbitrary data to the custom day template context
     * 'Current' contains the month that will be displayed in the view
     *
     * \@since 3.3.0
     * @type {?}
     */
    NgbDatepicker.prototype.dayTemplateData;
    /**
     * Number of months to display
     * @type {?}
     */
    NgbDatepicker.prototype.displayMonths;
    /**
     * First day of the week. With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun
     * @type {?}
     */
    NgbDatepicker.prototype.firstDayOfWeek;
    /**
     * Reference for the custom template for the footer
     *
     * \@since 3.3.0
     * @type {?}
     */
    NgbDatepicker.prototype.footerTemplate;
    /**
     * Callback to mark a given date as disabled.
     * 'Current' contains the month that will be displayed in the view
     * @type {?}
     */
    NgbDatepicker.prototype.markDisabled;
    /**
     * Max date for the navigation. If not provided, 'year' select box will display 10 years after current month
     * @type {?}
     */
    NgbDatepicker.prototype.maxDate;
    /**
     * Min date for the navigation. If not provided, 'year' select box will display 10 years before current month
     * @type {?}
     */
    NgbDatepicker.prototype.minDate;
    /**
     * Navigation type: `select` (default with select boxes for month and year), `arrows`
     * (without select boxes, only navigation arrows) or `none` (no navigation at all)
     * @type {?}
     */
    NgbDatepicker.prototype.navigation;
    /**
     * The way to display days that don't belong to current month: `visible` (default),
     * `hidden` (not displayed) or `collapsed` (not displayed with empty space collapsed)
     * @type {?}
     */
    NgbDatepicker.prototype.outsideDays;
    /**
     * Whether to display days of the week
     * @type {?}
     */
    NgbDatepicker.prototype.showWeekdays;
    /**
     * Whether to display week numbers
     * @type {?}
     */
    NgbDatepicker.prototype.showWeekNumbers;
    /**
     * Date to open calendar with.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided, calendar will open with current month.
     * Use 'navigateTo(date)' as an alternative
     * @type {?}
     */
    NgbDatepicker.prototype.startDate;
    /**
     * An event fired right before the navigation happens and currently displayed month changes.
     * See NgbDatepickerNavigateEvent for the payload info.
     * @type {?}
     */
    NgbDatepicker.prototype.navigate;
    /**
     * An event fired when user selects a date using keyboard or mouse.
     * The payload of the event is currently selected NgbDate.
     * @type {?}
     */
    NgbDatepicker.prototype.select;
    /** @type {?} */
    NgbDatepicker.prototype.onChange;
    /** @type {?} */
    NgbDatepicker.prototype.onTouched;
    /** @type {?} */
    NgbDatepicker.prototype._keyMapService;
    /** @type {?} */
    NgbDatepicker.prototype._service;
    /** @type {?} */
    NgbDatepicker.prototype._calendar;
    /** @type {?} */
    NgbDatepicker.prototype.i18n;
    /** @type {?} */
    NgbDatepicker.prototype._cd;
    /** @type {?} */
    NgbDatepicker.prototype._elementRef;
    /** @type {?} */
    NgbDatepicker.prototype._ngbDateAdapter;
    /** @type {?} */
    NgbDatepicker.prototype._ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUlOLE1BQU0sRUFFTixXQUFXLEVBQ1gsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDMUQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDdkUsT0FBTyxFQUFzQixlQUFlLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUU3RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFFM0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxZQUFZLEVBQUMs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QUFLOzBCQUtMLEtBQUs7NkJBTUwsS0FBSzs4QkFNTCxLQUFLOytCQUtMLEtBQUs7a0NBS0wsS0FBSzs0QkFRTCxLQUFLOzJCQU1MLE1BQU07eUJBTU4sTUFBTTs7SUFzSlQsb0JBQUM7Q0FBQSxBQXpTRCxJQXlTQztTQXBQWSxhQUFhOzs7SUFFeEIsOEJBQTJCOztJQUUzQixrQ0FBZ0U7O0lBQ2hFLHNDQUErQjs7SUFDL0Isb0NBQTBDOzs7OztJQUsxQyxvQ0FBc0Q7Ozs7Ozs7O0lBUXRELHdDQUF5Rjs7Ozs7SUFLekYsc0NBQStCOzs7OztJQUsvQix1Q0FBZ0M7Ozs7Ozs7SUFPaEMsdUNBQTBDOzs7Ozs7SUFNMUMscUNBQTBGOzs7OztJQUsxRixnQ0FBZ0M7Ozs7O0lBS2hDLGdDQUFnQzs7Ozs7O0lBTWhDLG1DQUFrRDs7Ozs7O0lBTWxELG9DQUF5RDs7Ozs7SUFLekQscUNBQStCOzs7OztJQUsvQix3Q0FBa0M7Ozs7Ozs7O0lBUWxDLGtDQUFnRTs7Ozs7O0lBTWhFLGlDQUFvRTs7Ozs7O0lBTXBFLCtCQUErQzs7SUFFL0MsaUNBQTBCOztJQUMxQixrQ0FBcUI7O0lBR2pCLHVDQUFrRDs7SUFBRSxpQ0FBcUM7O0lBQ3pGLGtDQUE4Qjs7SUFBRSw2QkFBOEI7O0lBQzlELDRCQUE4Qjs7SUFBRSxvQ0FBNEM7O0lBQzVFLHdDQUE0Qzs7SUFBRSxnQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2Zyb21FdmVudCwgbWVyZ2UsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIHRha2UsIHRha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge05nYkNhbGVuZGFyfSBmcm9tICcuL25nYi1jYWxlbmRhcic7XG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VyU2VydmljZX0gZnJvbSAnLi9kYXRlcGlja2VyLXNlcnZpY2UnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VyS2V5TWFwU2VydmljZX0gZnJvbSAnLi9kYXRlcGlja2VyLWtleW1hcC1zZXJ2aWNlJztcbmltcG9ydCB7RGF0ZXBpY2tlclZpZXdNb2RlbCwgTmF2aWdhdGlvbkV2ZW50fSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XG5pbXBvcnQge0RheVRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi9kYXRlcGlja2VyLWRheS10ZW1wbGF0ZS1jb250ZXh0JztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckNvbmZpZ30gZnJvbSAnLi9kYXRlcGlja2VyLWNvbmZpZyc7XG5pbXBvcnQge05nYkRhdGVBZGFwdGVyfSBmcm9tICcuL2FkYXB0ZXJzL25nYi1kYXRlLWFkYXB0ZXInO1xuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJJMThufSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XG5pbXBvcnQge2lzQ2hhbmdlZERhdGV9IGZyb20gJy4vZGF0ZXBpY2tlci10b29scyc7XG5pbXBvcnQge2hhc0NsYXNzTmFtZX0gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuY29uc3QgTkdCX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JEYXRlcGlja2VyKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qKlxuICogVGhlIHBheWxvYWQgb2YgdGhlIGRhdGVwaWNrZXIgbmF2aWdhdGlvbiBldmVudFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50IHtcbiAgLyoqXG4gICAqIEN1cnJlbnRseSBkaXNwbGF5ZWQgbW9udGhcbiAgICovXG4gIGN1cnJlbnQ6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9O1xuXG4gIC8qKlxuICAgKiBNb250aCB3ZSdyZSBuYXZpZ2F0aW5nIHRvXG4gICAqL1xuICBuZXh0OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfTtcblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCB3aWxsIHByZXZlbnQgbmF2aWdhdGlvbiBpZiBjYWxsZWRcbiAgICpcbiAgICogQHNpbmNlIDQuMS4wXG4gICAqL1xuICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBBIGxpZ2h0d2VpZ2h0IGFuZCBoaWdobHkgY29uZmlndXJhYmxlIGRhdGVwaWNrZXIgZGlyZWN0aXZlXG4gKi9cbkBDb21wb25lbnQoe1xuICBleHBvcnRBczogJ25nYkRhdGVwaWNrZXInLFxuICBzZWxlY3RvcjogJ25nYi1kYXRlcGlja2VyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlVXJsczogWycuL2RhdGVwaWNrZXIuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjZHQgbGV0LWRhdGU9XCJkYXRlXCIgbGV0LWN1cnJlbnRNb250aD1cImN1cnJlbnRNb250aFwiIGxldC1zZWxlY3RlZD1cInNlbGVjdGVkXCIgbGV0LWRpc2FibGVkPVwiZGlzYWJsZWRcIiBsZXQtZm9jdXNlZD1cImZvY3VzZWRcIj5cbiAgICAgIDxkaXYgbmdiRGF0ZXBpY2tlckRheVZpZXdcbiAgICAgICAgW2RhdGVdPVwiZGF0ZVwiXG4gICAgICAgIFtjdXJyZW50TW9udGhdPVwiY3VycmVudE1vbnRoXCJcbiAgICAgICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgW2ZvY3VzZWRdPVwiZm9jdXNlZFwiPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtaGVhZGVyIGJnLWxpZ2h0XCI+XG4gICAgICA8bmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbiAqbmdJZj1cIm5hdmlnYXRpb24gIT09ICdub25lJ1wiXG4gICAgICAgIFtkYXRlXT1cIm1vZGVsLmZpcnN0RGF0ZVwiXG4gICAgICAgIFttb250aHNdPVwibW9kZWwubW9udGhzXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cIm1vZGVsLmRpc2FibGVkXCJcbiAgICAgICAgW3Nob3dTZWxlY3RdPVwibW9kZWwubmF2aWdhdGlvbiA9PT0gJ3NlbGVjdCdcIlxuICAgICAgICBbcHJldkRpc2FibGVkXT1cIm1vZGVsLnByZXZEaXNhYmxlZFwiXG4gICAgICAgIFtuZXh0RGlzYWJsZWRdPVwibW9kZWwubmV4dERpc2FibGVkXCJcbiAgICAgICAgW3NlbGVjdEJveGVzXT1cIm1vZGVsLnNlbGVjdEJveGVzXCJcbiAgICAgICAgKG5hdmlnYXRlKT1cIm9uTmF2aWdhdGVFdmVudCgkZXZlbnQpXCJcbiAgICAgICAgKHNlbGVjdCk9XCJvbk5hdmlnYXRlRGF0ZVNlbGVjdCgkZXZlbnQpXCI+XG4gICAgICA8L25nYi1kYXRlcGlja2VyLW5hdmlnYXRpb24+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2ICNtb250aHMgY2xhc3M9XCJuZ2ItZHAtbW9udGhzXCIgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtbW9udGggW25nRm9yT2ZdPVwibW9kZWwubW9udGhzXCIgbGV0LWk9XCJpbmRleFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLW1vbnRoXCI+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cIm5hdmlnYXRpb24gPT09ICdub25lJyB8fCAoZGlzcGxheU1vbnRocyA+IDEgJiYgbmF2aWdhdGlvbiA9PT0gJ3NlbGVjdCcpXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cIm5nYi1kcC1tb250aC1uYW1lIGJnLWxpZ2h0XCI+XG4gICAgICAgICAgICB7eyBpMThuLmdldE1vbnRoRnVsbE5hbWUobW9udGgubnVtYmVyLCBtb250aC55ZWFyKSB9fSB7eyBpMThuLmdldFllYXJOdW1lcmFscyhtb250aC55ZWFyKSB9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxuZ2ItZGF0ZXBpY2tlci1tb250aC12aWV3XG4gICAgICAgICAgICBbbW9udGhdPVwibW9udGhcIlxuICAgICAgICAgICAgW2RheVRlbXBsYXRlXT1cImRheVRlbXBsYXRlIHx8IGR0XCJcbiAgICAgICAgICAgIFtzaG93V2Vla2RheXNdPVwic2hvd1dlZWtkYXlzXCJcbiAgICAgICAgICAgIFtzaG93V2Vla051bWJlcnNdPVwic2hvd1dlZWtOdW1iZXJzXCJcbiAgICAgICAgICAgIChzZWxlY3QpPVwib25EYXRlU2VsZWN0KCRldmVudClcIj5cbiAgICAgICAgICA8L25nYi1kYXRlcGlja2VyLW1vbnRoLXZpZXc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cblxuICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJmb290ZXJUZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIHByb3ZpZGVyczogW05HQl9EQVRFUElDS0VSX1ZBTFVFX0FDQ0VTU09SLCBOZ2JEYXRlcGlja2VyU2VydmljZSwgTmdiRGF0ZXBpY2tlcktleU1hcFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3ksXG4gICAgT25DaGFuZ2VzLCBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgbW9kZWw6IERhdGVwaWNrZXJWaWV3TW9kZWw7XG5cbiAgQFZpZXdDaGlsZCgnbW9udGhzJykgcHJpdmF0ZSBfbW9udGhzRWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBwcml2YXRlIF9jb250cm9sVmFsdWU6IE5nYkRhdGU7XG4gIHByaXZhdGUgX2Rlc3Ryb3llZCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgZm9yIHRoZSBjdXN0b20gdGVtcGxhdGUgZm9yIHRoZSBkYXkgZGlzcGxheVxuICAgKi9cbiAgQElucHV0KCkgZGF5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPERheVRlbXBsYXRlQ29udGV4dD47XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHRvIHBhc3MgYW55IGFyYml0cmFyeSBkYXRhIHRvIHRoZSBjdXN0b20gZGF5IHRlbXBsYXRlIGNvbnRleHRcbiAgICogJ0N1cnJlbnQnIGNvbnRhaW5zIHRoZSBtb250aCB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGluIHRoZSB2aWV3XG4gICAqXG4gICAqIEBzaW5jZSAzLjMuMFxuICAgKi9cbiAgQElucHV0KCkgZGF5VGVtcGxhdGVEYXRhOiAoZGF0ZTogTmdiRGF0ZSwgY3VycmVudDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pID0+IGFueTtcblxuICAvKipcbiAgICogTnVtYmVyIG9mIG1vbnRocyB0byBkaXNwbGF5XG4gICAqL1xuICBASW5wdXQoKSBkaXNwbGF5TW9udGhzOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEZpcnN0IGRheSBvZiB0aGUgd2Vlay4gV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ3dlZWtkYXknIGlzIDE9TW9uIC4uLiA3PVN1blxuICAgKi9cbiAgQElucHV0KCkgZmlyc3REYXlPZldlZWs6IG51bWJlcjtcblxuICAvKipcbiAgICogUmVmZXJlbmNlIGZvciB0aGUgY3VzdG9tIHRlbXBsYXRlIGZvciB0aGUgZm9vdGVyXG4gICAqXG4gICAqIEBzaW5jZSAzLjMuMFxuICAgKi9cbiAgQElucHV0KCkgZm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHRvIG1hcmsgYSBnaXZlbiBkYXRlIGFzIGRpc2FibGVkLlxuICAgKiAnQ3VycmVudCcgY29udGFpbnMgdGhlIG1vbnRoIHRoYXQgd2lsbCBiZSBkaXNwbGF5ZWQgaW4gdGhlIHZpZXdcbiAgICovXG4gIEBJbnB1dCgpIG1hcmtEaXNhYmxlZDogKGRhdGU6IE5nYkRhdGUsIGN1cnJlbnQ6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9KSA9PiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBNYXggZGF0ZSBmb3IgdGhlIG5hdmlnYXRpb24uIElmIG5vdCBwcm92aWRlZCwgJ3llYXInIHNlbGVjdCBib3ggd2lsbCBkaXNwbGF5IDEwIHllYXJzIGFmdGVyIGN1cnJlbnQgbW9udGhcbiAgICovXG4gIEBJbnB1dCgpIG1heERhdGU6IE5nYkRhdGVTdHJ1Y3Q7XG5cbiAgLyoqXG4gICAqIE1pbiBkYXRlIGZvciB0aGUgbmF2aWdhdGlvbi4gSWYgbm90IHByb3ZpZGVkLCAneWVhcicgc2VsZWN0IGJveCB3aWxsIGRpc3BsYXkgMTAgeWVhcnMgYmVmb3JlIGN1cnJlbnQgbW9udGhcbiAgICovXG4gIEBJbnB1dCgpIG1pbkRhdGU6IE5nYkRhdGVTdHJ1Y3Q7XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRpb24gdHlwZTogYHNlbGVjdGAgKGRlZmF1bHQgd2l0aCBzZWxlY3QgYm94ZXMgZm9yIG1vbnRoIGFuZCB5ZWFyKSwgYGFycm93c2BcbiAgICogKHdpdGhvdXQgc2VsZWN0IGJveGVzLCBvbmx5IG5hdmlnYXRpb24gYXJyb3dzKSBvciBgbm9uZWAgKG5vIG5hdmlnYXRpb24gYXQgYWxsKVxuICAgKi9cbiAgQElucHV0KCkgbmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJztcblxuICAvKipcbiAgICogVGhlIHdheSB0byBkaXNwbGF5IGRheXMgdGhhdCBkb24ndCBiZWxvbmcgdG8gY3VycmVudCBtb250aDogYHZpc2libGVgIChkZWZhdWx0KSxcbiAgICogYGhpZGRlbmAgKG5vdCBkaXNwbGF5ZWQpIG9yIGBjb2xsYXBzZWRgIChub3QgZGlzcGxheWVkIHdpdGggZW1wdHkgc3BhY2UgY29sbGFwc2VkKVxuICAgKi9cbiAgQElucHV0KCkgb3V0c2lkZURheXM6ICd2aXNpYmxlJyB8ICdjb2xsYXBzZWQnIHwgJ2hpZGRlbic7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gZGlzcGxheSBkYXlzIG9mIHRoZSB3ZWVrXG4gICAqL1xuICBASW5wdXQoKSBzaG93V2Vla2RheXM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gZGlzcGxheSB3ZWVrIG51bWJlcnNcbiAgICovXG4gIEBJbnB1dCgpIHNob3dXZWVrTnVtYmVyczogYm9vbGVhbjtcblxuICAvKipcbiAgICogRGF0ZSB0byBvcGVuIGNhbGVuZGFyIHdpdGguXG4gICAqIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICdtb250aCcgaXMgMT1KYW4gLi4uIDEyPURlYy5cbiAgICogSWYgbm90aGluZyBvciBpbnZhbGlkIGRhdGUgcHJvdmlkZWQsIGNhbGVuZGFyIHdpbGwgb3BlbiB3aXRoIGN1cnJlbnQgbW9udGguXG4gICAqIFVzZSAnbmF2aWdhdGVUbyhkYXRlKScgYXMgYW4gYWx0ZXJuYXRpdmVcbiAgICovXG4gIEBJbnB1dCgpIHN0YXJ0RGF0ZToge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF5PzogbnVtYmVyfTtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZmlyZWQgcmlnaHQgYmVmb3JlIHRoZSBuYXZpZ2F0aW9uIGhhcHBlbnMgYW5kIGN1cnJlbnRseSBkaXNwbGF5ZWQgbW9udGggY2hhbmdlcy5cbiAgICogU2VlIE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50IGZvciB0aGUgcGF5bG9hZCBpbmZvLlxuICAgKi9cbiAgQE91dHB1dCgpIG5hdmlnYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JEYXRlcGlja2VyTmF2aWdhdGVFdmVudD4oKTtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZmlyZWQgd2hlbiB1c2VyIHNlbGVjdHMgYSBkYXRlIHVzaW5nIGtleWJvYXJkIG9yIG1vdXNlLlxuICAgKiBUaGUgcGF5bG9hZCBvZiB0aGUgZXZlbnQgaXMgY3VycmVudGx5IHNlbGVjdGVkIE5nYkRhdGUuXG4gICAqL1xuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JEYXRlPigpO1xuXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfa2V5TWFwU2VydmljZTogTmdiRGF0ZXBpY2tlcktleU1hcFNlcnZpY2UsIHB1YmxpYyBfc2VydmljZTogTmdiRGF0ZXBpY2tlclNlcnZpY2UsXG4gICAgICBwcml2YXRlIF9jYWxlbmRhcjogTmdiQ2FsZW5kYXIsIHB1YmxpYyBpMThuOiBOZ2JEYXRlcGlja2VySTE4biwgY29uZmlnOiBOZ2JEYXRlcGlja2VyQ29uZmlnLFxuICAgICAgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgIHByaXZhdGUgX25nYkRhdGVBZGFwdGVyOiBOZ2JEYXRlQWRhcHRlcjxhbnk+LCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSkge1xuICAgIFsnZGF5VGVtcGxhdGUnLCAnZGF5VGVtcGxhdGVEYXRhJywgJ2Rpc3BsYXlNb250aHMnLCAnZmlyc3REYXlPZldlZWsnLCAnZm9vdGVyVGVtcGxhdGUnLCAnbWFya0Rpc2FibGVkJywgJ21pbkRhdGUnLFxuICAgICAnbWF4RGF0ZScsICduYXZpZ2F0aW9uJywgJ291dHNpZGVEYXlzJywgJ3Nob3dXZWVrZGF5cycsICdzaG93V2Vla051bWJlcnMnLCAnc3RhcnREYXRlJ11cbiAgICAgICAgLmZvckVhY2goaW5wdXQgPT4gdGhpc1tpbnB1dF0gPSBjb25maWdbaW5wdXRdKTtcblxuICAgIF9zZXJ2aWNlLnNlbGVjdCQucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkJCkpLnN1YnNjcmliZShkYXRlID0+IHsgdGhpcy5zZWxlY3QuZW1pdChkYXRlKTsgfSk7XG5cbiAgICBfc2VydmljZS5tb2RlbCQucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkJCkpLnN1YnNjcmliZShtb2RlbCA9PiB7XG4gICAgICBjb25zdCBuZXdEYXRlID0gbW9kZWwuZmlyc3REYXRlO1xuICAgICAgY29uc3Qgb2xkRGF0ZSA9IHRoaXMubW9kZWwgPyB0aGlzLm1vZGVsLmZpcnN0RGF0ZSA6IG51bGw7XG5cbiAgICAgIGxldCBuYXZpZ2F0aW9uUHJldmVudGVkID0gZmFsc2U7XG4gICAgICAvLyBlbWl0dGluZyBuYXZpZ2F0aW9uIGV2ZW50IGlmIHRoZSBmaXJzdCBtb250aCBjaGFuZ2VzXG4gICAgICBpZiAoIW5ld0RhdGUuZXF1YWxzKG9sZERhdGUpKSB7XG4gICAgICAgIHRoaXMubmF2aWdhdGUuZW1pdCh7XG4gICAgICAgICAgY3VycmVudDogb2xkRGF0ZSA/IHt5ZWFyOiBvbGREYXRlLnllYXIsIG1vbnRoOiBvbGREYXRlLm1vbnRofSA6IG51bGwsXG4gICAgICAgICAgbmV4dDoge3llYXI6IG5ld0RhdGUueWVhciwgbW9udGg6IG5ld0RhdGUubW9udGh9LFxuICAgICAgICAgIHByZXZlbnREZWZhdWx0OiAoKSA9PiBuYXZpZ2F0aW9uUHJldmVudGVkID0gdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjYW4ndCBwcmV2ZW50IHRoZSB2ZXJ5IGZpcnN0IG5hdmlnYXRpb25cbiAgICAgICAgaWYgKG5hdmlnYXRpb25QcmV2ZW50ZWQgJiYgb2xkRGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX3NlcnZpY2UucmVzZXQodGhpcy5tb2RlbCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5ld1NlbGVjdGVkRGF0ZSA9IG1vZGVsLnNlbGVjdGVkRGF0ZTtcbiAgICAgIGNvbnN0IG5ld0ZvY3VzZWREYXRlID0gbW9kZWwuZm9jdXNEYXRlO1xuICAgICAgY29uc3Qgb2xkRm9jdXNlZERhdGUgPSB0aGlzLm1vZGVsID8gdGhpcy5tb2RlbC5mb2N1c0RhdGUgOiBudWxsO1xuXG4gICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgIC8vIGhhbmRsaW5nIHNlbGVjdGlvbiBjaGFuZ2VcbiAgICAgIGlmIChpc0NoYW5nZWREYXRlKG5ld1NlbGVjdGVkRGF0ZSwgdGhpcy5fY29udHJvbFZhbHVlKSkge1xuICAgICAgICB0aGlzLl9jb250cm9sVmFsdWUgPSBuZXdTZWxlY3RlZERhdGU7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fbmdiRGF0ZUFkYXB0ZXIudG9Nb2RlbChuZXdTZWxlY3RlZERhdGUpKTtcbiAgICAgIH1cblxuICAgICAgLy8gaGFuZGxpbmcgZm9jdXMgY2hhbmdlXG4gICAgICBpZiAoaXNDaGFuZ2VkRGF0ZShuZXdGb2N1c2VkRGF0ZSwgb2xkRm9jdXNlZERhdGUpICYmIG9sZEZvY3VzZWREYXRlICYmIG1vZGVsLmZvY3VzVmlzaWJsZSkge1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICB9XG5cbiAgICAgIF9jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYW51YWxseSBmb2N1cyB0aGUgZm9jdXNhYmxlIGRheSBpbiB0aGUgZGF0ZXBpY2tlclxuICAgKi9cbiAgZm9jdXMoKSB7XG4gICAgdGhpcy5fbmdab25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IGVsZW1lbnRUb0ZvY3VzID1cbiAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRGl2RWxlbWVudD4oJ2Rpdi5uZ2ItZHAtZGF5W3RhYmluZGV4PVwiMFwiXScpO1xuICAgICAgaWYgKGVsZW1lbnRUb0ZvY3VzKSB7XG4gICAgICAgIGVsZW1lbnRUb0ZvY3VzLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGVzIGN1cnJlbnQgdmlldyB0byBwcm92aWRlZCBkYXRlLlxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWMuXG4gICAqIElmIG5vdGhpbmcgb3IgaW52YWxpZCBkYXRlIHByb3ZpZGVkIGNhbGVuZGFyIHdpbGwgb3BlbiBjdXJyZW50IG1vbnRoLlxuICAgKiBVc2UgJ3N0YXJ0RGF0ZScgaW5wdXQgYXMgYW4gYWx0ZXJuYXRpdmVcbiAgICovXG4gIG5hdmlnYXRlVG8oZGF0ZT86IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheT86IG51bWJlcn0pIHtcbiAgICB0aGlzLl9zZXJ2aWNlLm9wZW4oTmdiRGF0ZS5mcm9tKGRhdGUgPyBkYXRlLmRheSA/IGRhdGUgYXMgTmdiRGF0ZVN0cnVjdCA6IHsuLi5kYXRlLCBkYXk6IDF9IDogbnVsbCkpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBjb25zdCBmb2N1c0lucyQgPSBmcm9tRXZlbnQ8Rm9jdXNFdmVudD4odGhpcy5fbW9udGhzRWwubmF0aXZlRWxlbWVudCwgJ2ZvY3VzaW4nKTtcbiAgICAgIGNvbnN0IGZvY3VzT3V0cyQgPSBmcm9tRXZlbnQ8Rm9jdXNFdmVudD4odGhpcy5fbW9udGhzRWwubmF0aXZlRWxlbWVudCwgJ2ZvY3Vzb3V0Jyk7XG5cbiAgICAgIC8vIHdlJ3JlIGNoYW5naW5nICdmb2N1c1Zpc2libGUnIG9ubHkgd2hlbiBlbnRlcmluZyBvciBsZWF2aW5nIG1vbnRocyB2aWV3XG4gICAgICAvLyBhbmQgaWdub3JpbmcgYWxsIGZvY3VzIGV2ZW50cyB3aGVyZSBib3RoICd0YXJnZXQnIGFuZCAncmVsYXRlZCcgdGFyZ2V0IGFyZSBkYXkgY2VsbHNcbiAgICAgIG1lcmdlKGZvY3VzSW5zJCwgZm9jdXNPdXRzJClcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgKHt0YXJnZXQsIHJlbGF0ZWRUYXJnZXR9KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICEoaGFzQ2xhc3NOYW1lKHRhcmdldCwgJ25nYi1kcC1kYXknKSAmJiBoYXNDbGFzc05hbWUocmVsYXRlZFRhcmdldCwgJ25nYi1kcC1kYXknKSkpLFxuICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkJCkpXG4gICAgICAgICAgLnN1YnNjcmliZSgoe3R5cGV9KSA9PiB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMuX3NlcnZpY2UuZm9jdXNWaXNpYmxlID0gdHlwZSA9PT0gJ2ZvY3VzaW4nKSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHsgdGhpcy5fZGVzdHJveWVkJC5uZXh0KCk7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5tb2RlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBbJ2RheVRlbXBsYXRlRGF0YScsICdkaXNwbGF5TW9udGhzJywgJ21hcmtEaXNhYmxlZCcsICdmaXJzdERheU9mV2VlaycsICduYXZpZ2F0aW9uJywgJ21pbkRhdGUnLCAnbWF4RGF0ZScsXG4gICAgICAgJ291dHNpZGVEYXlzJ11cbiAgICAgICAgICAuZm9yRWFjaChpbnB1dCA9PiB0aGlzLl9zZXJ2aWNlW2lucHV0XSA9IHRoaXNbaW5wdXRdKTtcbiAgICAgIHRoaXMubmF2aWdhdGVUbyh0aGlzLnN0YXJ0RGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIFsnZGF5VGVtcGxhdGVEYXRhJywgJ2Rpc3BsYXlNb250aHMnLCAnbWFya0Rpc2FibGVkJywgJ2ZpcnN0RGF5T2ZXZWVrJywgJ25hdmlnYXRpb24nLCAnbWluRGF0ZScsICdtYXhEYXRlJyxcbiAgICAgJ291dHNpZGVEYXlzJ11cbiAgICAgICAgLmZpbHRlcihpbnB1dCA9PiBpbnB1dCBpbiBjaGFuZ2VzKVxuICAgICAgICAuZm9yRWFjaChpbnB1dCA9PiB0aGlzLl9zZXJ2aWNlW2lucHV0XSA9IHRoaXNbaW5wdXRdKTtcblxuICAgIGlmICgnc3RhcnREYXRlJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLm5hdmlnYXRlVG8odGhpcy5zdGFydERhdGUpO1xuICAgIH1cbiAgfVxuXG4gIG9uRGF0ZVNlbGVjdChkYXRlOiBOZ2JEYXRlKSB7XG4gICAgdGhpcy5fc2VydmljZS5mb2N1cyhkYXRlKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnNlbGVjdChkYXRlLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XG4gIH1cblxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHsgdGhpcy5fa2V5TWFwU2VydmljZS5wcm9jZXNzS2V5KGV2ZW50KTsgfVxuXG4gIG9uTmF2aWdhdGVEYXRlU2VsZWN0KGRhdGU6IE5nYkRhdGUpIHsgdGhpcy5fc2VydmljZS5vcGVuKGRhdGUpOyB9XG5cbiAgb25OYXZpZ2F0ZUV2ZW50KGV2ZW50OiBOYXZpZ2F0aW9uRXZlbnQpIHtcbiAgICBzd2l0Y2ggKGV2ZW50KSB7XG4gICAgICBjYXNlIE5hdmlnYXRpb25FdmVudC5QUkVWOlxuICAgICAgICB0aGlzLl9zZXJ2aWNlLm9wZW4odGhpcy5fY2FsZW5kYXIuZ2V0UHJldih0aGlzLm1vZGVsLmZpcnN0RGF0ZSwgJ20nLCAxKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBOYXZpZ2F0aW9uRXZlbnQuTkVYVDpcbiAgICAgICAgdGhpcy5fc2VydmljZS5vcGVuKHRoaXMuX2NhbGVuZGFyLmdldE5leHQodGhpcy5tb2RlbC5maXJzdERhdGUsICdtJywgMSkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMub25DaGFuZ2UgPSBmbjsgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vblRvdWNoZWQgPSBmbjsgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikgeyB0aGlzLl9zZXJ2aWNlLmRpc2FibGVkID0gaXNEaXNhYmxlZDsgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLl9jb250cm9sVmFsdWUgPSBOZ2JEYXRlLmZyb20odGhpcy5fbmdiRGF0ZUFkYXB0ZXIuZnJvbU1vZGVsKHZhbHVlKSk7XG4gICAgdGhpcy5fc2VydmljZS5zZWxlY3QodGhpcy5fY29udHJvbFZhbHVlKTtcbiAgfVxufVxuIl19