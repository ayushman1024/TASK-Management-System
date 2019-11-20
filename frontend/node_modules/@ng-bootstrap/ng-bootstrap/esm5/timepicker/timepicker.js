/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isInteger, isNumber, padNumber, toInteger } from '../util/util';
import { NgbTime } from './ngb-time';
import { NgbTimepickerConfig } from './timepicker-config';
import { NgbTimeAdapter } from './ngb-time-adapter';
/** @type {?} */
var NGB_TIMEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgbTimepicker; }),
    multi: true
};
/**
 * A lightweight & configurable timepicker directive.
 */
var NgbTimepicker = /** @class */ (function () {
    function NgbTimepicker(_config, _ngbTimeAdapter, _cd) {
        this._config = _config;
        this._ngbTimeAdapter = _ngbTimeAdapter;
        this._cd = _cd;
        this.onChange = function (_) { };
        this.onTouched = function () { };
        this.meridian = _config.meridian;
        this.spinners = _config.spinners;
        this.seconds = _config.seconds;
        this.hourStep = _config.hourStep;
        this.minuteStep = _config.minuteStep;
        this.secondStep = _config.secondStep;
        this.disabled = _config.disabled;
        this.readonlyInputs = _config.readonlyInputs;
        this.size = _config.size;
    }
    Object.defineProperty(NgbTimepicker.prototype, "hourStep", {
        get: /**
         * @return {?}
         */
        function () { return this._hourStep; },
        /**
         * Number of hours to increase or decrease when using a button.
         */
        set: /**
         * Number of hours to increase or decrease when using a button.
         * @param {?} step
         * @return {?}
         */
        function (step) {
            this._hourStep = isInteger(step) ? step : this._config.hourStep;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbTimepicker.prototype, "minuteStep", {
        get: /**
         * @return {?}
         */
        function () { return this._minuteStep; },
        /**
         * Number of minutes to increase or decrease when using a button.
         */
        set: /**
         * Number of minutes to increase or decrease when using a button.
         * @param {?} step
         * @return {?}
         */
        function (step) {
            this._minuteStep = isInteger(step) ? step : this._config.minuteStep;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbTimepicker.prototype, "secondStep", {
        get: /**
         * @return {?}
         */
        function () { return this._secondStep; },
        /**
         * Number of seconds to increase or decrease when using a button.
         */
        set: /**
         * Number of seconds to increase or decrease when using a button.
         * @param {?} step
         * @return {?}
         */
        function (step) {
            this._secondStep = isInteger(step) ? step : this._config.secondStep;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    NgbTimepicker.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var structValue = this._ngbTimeAdapter.fromModel(value);
        this.model = structValue ? new NgbTime(structValue.hour, structValue.minute, structValue.second) : new NgbTime();
        if (!this.seconds && (!structValue || !isNumber(structValue.second))) {
            this.model.second = 0;
        }
        this._cd.markForCheck();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbTimepicker.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbTimepicker.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onTouched = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgbTimepicker.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) { this.disabled = isDisabled; };
    /**
     * @param {?} step
     * @return {?}
     */
    NgbTimepicker.prototype.changeHour = /**
     * @param {?} step
     * @return {?}
     */
    function (step) {
        this.model.changeHour(step);
        this.propagateModelChange();
    };
    /**
     * @param {?} step
     * @return {?}
     */
    NgbTimepicker.prototype.changeMinute = /**
     * @param {?} step
     * @return {?}
     */
    function (step) {
        this.model.changeMinute(step);
        this.propagateModelChange();
    };
    /**
     * @param {?} step
     * @return {?}
     */
    NgbTimepicker.prototype.changeSecond = /**
     * @param {?} step
     * @return {?}
     */
    function (step) {
        this.model.changeSecond(step);
        this.propagateModelChange();
    };
    /**
     * @param {?} newVal
     * @return {?}
     */
    NgbTimepicker.prototype.updateHour = /**
     * @param {?} newVal
     * @return {?}
     */
    function (newVal) {
        /** @type {?} */
        var isPM = this.model.hour >= 12;
        /** @type {?} */
        var enteredHour = toInteger(newVal);
        if (this.meridian && (isPM && enteredHour < 12 || !isPM && enteredHour === 12)) {
            this.model.updateHour(enteredHour + 12);
        }
        else {
            this.model.updateHour(enteredHour);
        }
        this.propagateModelChange();
    };
    /**
     * @param {?} newVal
     * @return {?}
     */
    NgbTimepicker.prototype.updateMinute = /**
     * @param {?} newVal
     * @return {?}
     */
    function (newVal) {
        this.model.updateMinute(toInteger(newVal));
        this.propagateModelChange();
    };
    /**
     * @param {?} newVal
     * @return {?}
     */
    NgbTimepicker.prototype.updateSecond = /**
     * @param {?} newVal
     * @return {?}
     */
    function (newVal) {
        this.model.updateSecond(toInteger(newVal));
        this.propagateModelChange();
    };
    /**
     * @return {?}
     */
    NgbTimepicker.prototype.toggleMeridian = /**
     * @return {?}
     */
    function () {
        if (this.meridian) {
            this.changeHour(12);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbTimepicker.prototype.formatHour = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (isNumber(value)) {
            if (this.meridian) {
                return padNumber(value % 12 === 0 ? 12 : value % 12);
            }
            else {
                return padNumber(value % 24);
            }
        }
        else {
            return padNumber(NaN);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbTimepicker.prototype.formatMinSec = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { return padNumber(value); };
    Object.defineProperty(NgbTimepicker.prototype, "isSmallSize", {
        get: /**
         * @return {?}
         */
        function () { return this.size === 'small'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgbTimepicker.prototype, "isLargeSize", {
        get: /**
         * @return {?}
         */
        function () { return this.size === 'large'; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbTimepicker.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['seconds'] && !this.seconds && this.model && !isNumber(this.model.second)) {
            this.model.second = 0;
            this.propagateModelChange(false);
        }
    };
    /**
     * @param {?=} touched
     * @return {?}
     */
    NgbTimepicker.prototype.propagateModelChange = /**
     * @param {?=} touched
     * @return {?}
     */
    function (touched) {
        if (touched === void 0) { touched = true; }
        if (touched) {
            this.onTouched();
        }
        if (this.model.isValid(this.seconds)) {
            this.onChange(this._ngbTimeAdapter.toModel({ hour: this.model.hour, minute: this.model.minute, second: this.model.second }));
        }
        else {
            this.onChange(this._ngbTimeAdapter.toModel(null));
        }
    };
    NgbTimepicker.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-timepicker',
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <fieldset [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n      <div class=\"ngb-tp\">\n        <div class=\"ngb-tp-input-container ngb-tp-hour\">\n          <button *ngIf=\"spinners\" type=\"button\" (click)=\"changeHour(hourStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\" [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.increment-hours\">Increment hours</span>\n          </button>\n          <input type=\"text\" class=\"ngb-tp-input form-control\" [class.form-control-sm]=\"isSmallSize\" [class.form-control-lg]=\"isLargeSize\"\n            maxlength=\"2\" placeholder=\"HH\" i18n-placeholder=\"@@ngb.timepicker.HH\"\n            [value]=\"formatHour(model?.hour)\" (change)=\"updateHour($event.target.value)\"\n            [readonly]=\"readonlyInputs\" [disabled]=\"disabled\" aria-label=\"Hours\" i18n-aria-label=\"@@ngb.timepicker.hours\"\n            (keydown.ArrowUp)=\"changeHour(hourStep)\" (keydown.ArrowDown)=\"changeHour(-hourStep)\">\n          <button *ngIf=\"spinners\" type=\"button\" (click)=\"changeHour(-hourStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\" [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron bottom\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.decrement-hours\">Decrement hours</span>\n          </button>\n        </div>\n        <div class=\"ngb-tp-spacer\">:</div>\n        <div class=\"ngb-tp-input-container ngb-tp-minute\">\n          <button *ngIf=\"spinners\" type=\"button\" (click)=\"changeMinute(minuteStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\" [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.increment-minutes\">Increment minutes</span>\n          </button>\n          <input type=\"text\" class=\"ngb-tp-input form-control\" [class.form-control-sm]=\"isSmallSize\" [class.form-control-lg]=\"isLargeSize\"\n            maxlength=\"2\" placeholder=\"MM\" i18n-placeholder=\"@@ngb.timepicker.MM\"\n            [value]=\"formatMinSec(model?.minute)\" (change)=\"updateMinute($event.target.value)\"\n            [readonly]=\"readonlyInputs\" [disabled]=\"disabled\" aria-label=\"Minutes\" i18n-aria-label=\"@@ngb.timepicker.minutes\"\n            (keydown.ArrowUp)=\"changeMinute(minuteStep)\" (keydown.ArrowDown)=\"changeMinute(-minuteStep)\">\n          <button *ngIf=\"spinners\" type=\"button\" (click)=\"changeMinute(-minuteStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\"  [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron bottom\"></span>\n            <span class=\"sr-only\"  i18n=\"@@ngb.timepicker.decrement-minutes\">Decrement minutes</span>\n          </button>\n        </div>\n        <div *ngIf=\"seconds\" class=\"ngb-tp-spacer\">:</div>\n        <div *ngIf=\"seconds\" class=\"ngb-tp-input-container ngb-tp-second\">\n          <button *ngIf=\"spinners\" type=\"button\" (click)=\"changeSecond(secondStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\" [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.increment-seconds\">Increment seconds</span>\n          </button>\n          <input type=\"text\" class=\"ngb-tp-input form-control\" [class.form-control-sm]=\"isSmallSize\" [class.form-control-lg]=\"isLargeSize\"\n            maxlength=\"2\" placeholder=\"SS\" i18n-placeholder=\"@@ngb.timepicker.SS\"\n            [value]=\"formatMinSec(model?.second)\" (change)=\"updateSecond($event.target.value)\"\n            [readonly]=\"readonlyInputs\" [disabled]=\"disabled\" aria-label=\"Seconds\" i18n-aria-label=\"@@ngb.timepicker.seconds\"\n            (keydown.ArrowUp)=\"changeSecond(secondStep)\" (keydown.ArrowDown)=\"changeSecond(-secondStep)\">\n          <button *ngIf=\"spinners\" type=\"button\" (click)=\"changeSecond(-secondStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\"  [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron bottom\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.decrement-seconds\">Decrement seconds</span>\n          </button>\n        </div>\n        <div *ngIf=\"meridian\" class=\"ngb-tp-spacer\"></div>\n        <div *ngIf=\"meridian\" class=\"ngb-tp-meridian\">\n          <button type=\"button\" class=\"btn btn-outline-primary\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\"\n            [disabled]=\"disabled\" [class.disabled]=\"disabled\"\n                  (click)=\"toggleMeridian()\">\n            <ng-container *ngIf=\"model?.hour >= 12; else am\" i18n=\"@@ngb.timepicker.PM\">PM</ng-container>\n            <ng-template #am i18n=\"@@ngb.timepicker.AM\">AM</ng-template>\n          </button>\n        </div>\n      </div>\n    </fieldset>\n  ",
                    providers: [NGB_TIMEPICKER_VALUE_ACCESSOR],
                    styles: ["ngb-timepicker{font-size:1rem}.ngb-tp{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.ngb-tp-input-container{width:4em}.ngb-tp-chevron::before{border-style:solid;border-width:.29em .29em 0 0;content:'';display:inline-block;height:.69em;left:.05em;position:relative;top:.15em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);vertical-align:middle;width:.69em}.ngb-tp-chevron.bottom:before{top:-.3em;-webkit-transform:rotate(135deg);transform:rotate(135deg)}.ngb-tp-input{text-align:center}.ngb-tp-hour,.ngb-tp-meridian,.ngb-tp-minute,.ngb-tp-second{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around}.ngb-tp-spacer{width:1em;text-align:center}"]
                }] }
    ];
    /** @nocollapse */
    NgbTimepicker.ctorParameters = function () { return [
        { type: NgbTimepickerConfig },
        { type: NgbTimeAdapter },
        { type: ChangeDetectorRef }
    ]; };
    NgbTimepicker.propDecorators = {
        meridian: [{ type: Input }],
        spinners: [{ type: Input }],
        seconds: [{ type: Input }],
        hourStep: [{ type: Input }],
        minuteStep: [{ type: Input }],
        secondStep: [{ type: Input }],
        readonlyInputs: [{ type: Input }],
        size: [{ type: Input }]
    };
    return NgbTimepicker;
}());
export { NgbTimepicker };
if (false) {
    /** @type {?} */
    NgbTimepicker.prototype.disabled;
    /** @type {?} */
    NgbTimepicker.prototype.model;
    /** @type {?} */
    NgbTimepicker.prototype._hourStep;
    /** @type {?} */
    NgbTimepicker.prototype._minuteStep;
    /** @type {?} */
    NgbTimepicker.prototype._secondStep;
    /**
     * Whether to display 12H or 24H mode.
     * @type {?}
     */
    NgbTimepicker.prototype.meridian;
    /**
     * Whether to display the spinners above and below the inputs.
     * @type {?}
     */
    NgbTimepicker.prototype.spinners;
    /**
     * Whether to display seconds input.
     * @type {?}
     */
    NgbTimepicker.prototype.seconds;
    /**
     * To make timepicker readonly
     * @type {?}
     */
    NgbTimepicker.prototype.readonlyInputs;
    /**
     * To set the size of the inputs and button
     * @type {?}
     */
    NgbTimepicker.prototype.size;
    /** @type {?} */
    NgbTimepicker.prototype.onChange;
    /** @type {?} */
    NgbTimepicker.prototype.onTouched;
    /** @type {?} */
    NgbTimepicker.prototype._config;
    /** @type {?} */
    NgbTimepicker.prototype._ngbTimeAdapter;
    /** @type {?} */
    NgbTimepicker.prototype._cd;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidGltZXBpY2tlci90aW1lcGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUdMLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsT0FBTyxFQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN2RSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7SUFFNUMsNkJBQTZCLEdBQUc7SUFDcEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxhQUFhLEVBQWIsQ0FBYSxDQUFDO0lBQzVDLEtBQUssRUFBRSxJQUFJO0NBQ1o7Ozs7QUFLRDtJQWdKRSx1QkFDcUIsT0FBNEIsRUFBVSxlQUFvQyxFQUNuRixHQUFzQjtRQURiLFlBQU8sR0FBUCxPQUFPLENBQXFCO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQXFCO1FBQ25GLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBWWxDLGFBQVEsR0FBRyxVQUFDLENBQU0sSUFBTSxDQUFDLENBQUM7UUFDMUIsY0FBUyxHQUFHLGNBQU8sQ0FBQyxDQUFDO1FBWm5CLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7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QkFBQztDQUFBLEFBOVBELElBOFBDO1NBOUtZLGFBQWE7OztJQUV4QixpQ0FBa0I7O0lBQ2xCLDhCQUFlOztJQUVmLGtDQUEwQjs7SUFDMUIsb0NBQTRCOztJQUM1QixvQ0FBNEI7Ozs7O0lBSzVCLGlDQUEyQjs7Ozs7SUFLM0IsaUNBQTJCOzs7OztJQUszQixnQ0FBMEI7Ozs7O0lBbUMxQix1Q0FBaUM7Ozs7O0lBS2pDLDZCQUE0Qzs7SUFnQjVDLGlDQUEwQjs7SUFDMUIsa0NBQXFCOztJQWRqQixnQ0FBNkM7O0lBQUUsd0NBQTRDOztJQUMzRiw0QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7aXNJbnRlZ2VyLCBpc051bWJlciwgcGFkTnVtYmVyLCB0b0ludGVnZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQge05nYlRpbWV9IGZyb20gJy4vbmdiLXRpbWUnO1xuaW1wb3J0IHtOZ2JUaW1lcGlja2VyQ29uZmlnfSBmcm9tICcuL3RpbWVwaWNrZXItY29uZmlnJztcbmltcG9ydCB7TmdiVGltZUFkYXB0ZXJ9IGZyb20gJy4vbmdiLXRpbWUtYWRhcHRlcic7XG5cbmNvbnN0IE5HQl9USU1FUElDS0VSX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiVGltZXBpY2tlciksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKipcbiAqIEEgbGlnaHR3ZWlnaHQgJiBjb25maWd1cmFibGUgdGltZXBpY2tlciBkaXJlY3RpdmUuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi10aW1lcGlja2VyJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVVcmxzOiBbJy4vdGltZXBpY2tlci5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGZpZWxkc2V0IFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm5nYi10cFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibmdiLXRwLWlucHV0LWNvbnRhaW5lciBuZ2ItdHAtaG91clwiPlxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzcGlubmVyc1wiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2hhbmdlSG91cihob3VyU3RlcClcIlxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hldnJvbiBuZ2ItdHAtY2hldnJvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLmluY3JlbWVudC1ob3Vyc1wiPkluY3JlbWVudCBob3Vyczwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cIm5nYi10cC1pbnB1dCBmb3JtLWNvbnRyb2xcIiBbY2xhc3MuZm9ybS1jb250cm9sLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmZvcm0tY29udHJvbC1sZ109XCJpc0xhcmdlU2l6ZVwiXG4gICAgICAgICAgICBtYXhsZW5ndGg9XCIyXCIgcGxhY2Vob2xkZXI9XCJISFwiIGkxOG4tcGxhY2Vob2xkZXI9XCJAQG5nYi50aW1lcGlja2VyLkhIXCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJmb3JtYXRIb3VyKG1vZGVsPy5ob3VyKVwiIChjaGFuZ2UpPVwidXBkYXRlSG91cigkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlJbnB1dHNcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBhcmlhLWxhYmVsPVwiSG91cnNcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi50aW1lcGlja2VyLmhvdXJzXCJcbiAgICAgICAgICAgIChrZXlkb3duLkFycm93VXApPVwiY2hhbmdlSG91cihob3VyU3RlcClcIiAoa2V5ZG93bi5BcnJvd0Rvd24pPVwiY2hhbmdlSG91cigtaG91clN0ZXApXCI+XG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNwaW5uZXJzXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJjaGFuZ2VIb3VyKC1ob3VyU3RlcClcIlxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hldnJvbiBuZ2ItdHAtY2hldnJvbiBib3R0b21cIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5kZWNyZW1lbnQtaG91cnNcIj5EZWNyZW1lbnQgaG91cnM8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibmdiLXRwLXNwYWNlclwiPjo8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5nYi10cC1pbnB1dC1jb250YWluZXIgbmdiLXRwLW1pbnV0ZVwiPlxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzcGlubmVyc1wiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2hhbmdlTWludXRlKG1pbnV0ZVN0ZXApXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW2NsYXNzLmJ0bi1zbV09XCJpc1NtYWxsU2l6ZVwiIFtjbGFzcy5idG4tbGddPVwiaXNMYXJnZVNpemVcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb24gbmdiLXRwLWNoZXZyb25cIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5pbmNyZW1lbnQtbWludXRlc1wiPkluY3JlbWVudCBtaW51dGVzPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibmdiLXRwLWlucHV0IGZvcm0tY29udHJvbFwiIFtjbGFzcy5mb3JtLWNvbnRyb2wtc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuZm9ybS1jb250cm9sLWxnXT1cImlzTGFyZ2VTaXplXCJcbiAgICAgICAgICAgIG1heGxlbmd0aD1cIjJcIiBwbGFjZWhvbGRlcj1cIk1NXCIgaTE4bi1wbGFjZWhvbGRlcj1cIkBAbmdiLnRpbWVwaWNrZXIuTU1cIlxuICAgICAgICAgICAgW3ZhbHVlXT1cImZvcm1hdE1pblNlYyhtb2RlbD8ubWludXRlKVwiIChjaGFuZ2UpPVwidXBkYXRlTWludXRlKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seUlucHV0c1wiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIGFyaWEtbGFiZWw9XCJNaW51dGVzXCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IudGltZXBpY2tlci5taW51dGVzXCJcbiAgICAgICAgICAgIChrZXlkb3duLkFycm93VXApPVwiY2hhbmdlTWludXRlKG1pbnV0ZVN0ZXApXCIgKGtleWRvd24uQXJyb3dEb3duKT1cImNoYW5nZU1pbnV0ZSgtbWludXRlU3RlcClcIj5cbiAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic3Bpbm5lcnNcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNoYW5nZU1pbnV0ZSgtbWludXRlU3RlcClcIlxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb24gbmdiLXRwLWNoZXZyb24gYm90dG9tXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLmRlY3JlbWVudC1taW51dGVzXCI+RGVjcmVtZW50IG1pbnV0ZXM8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwic2Vjb25kc1wiIGNsYXNzPVwibmdiLXRwLXNwYWNlclwiPjo8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cInNlY29uZHNcIiBjbGFzcz1cIm5nYi10cC1pbnB1dC1jb250YWluZXIgbmdiLXRwLXNlY29uZFwiPlxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzcGlubmVyc1wiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2hhbmdlU2Vjb25kKHNlY29uZFN0ZXApXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW2NsYXNzLmJ0bi1zbV09XCJpc1NtYWxsU2l6ZVwiIFtjbGFzcy5idG4tbGddPVwiaXNMYXJnZVNpemVcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb24gbmdiLXRwLWNoZXZyb25cIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5pbmNyZW1lbnQtc2Vjb25kc1wiPkluY3JlbWVudCBzZWNvbmRzPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibmdiLXRwLWlucHV0IGZvcm0tY29udHJvbFwiIFtjbGFzcy5mb3JtLWNvbnRyb2wtc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuZm9ybS1jb250cm9sLWxnXT1cImlzTGFyZ2VTaXplXCJcbiAgICAgICAgICAgIG1heGxlbmd0aD1cIjJcIiBwbGFjZWhvbGRlcj1cIlNTXCIgaTE4bi1wbGFjZWhvbGRlcj1cIkBAbmdiLnRpbWVwaWNrZXIuU1NcIlxuICAgICAgICAgICAgW3ZhbHVlXT1cImZvcm1hdE1pblNlYyhtb2RlbD8uc2Vjb25kKVwiIChjaGFuZ2UpPVwidXBkYXRlU2Vjb25kKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seUlucHV0c1wiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIGFyaWEtbGFiZWw9XCJTZWNvbmRzXCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IudGltZXBpY2tlci5zZWNvbmRzXCJcbiAgICAgICAgICAgIChrZXlkb3duLkFycm93VXApPVwiY2hhbmdlU2Vjb25kKHNlY29uZFN0ZXApXCIgKGtleWRvd24uQXJyb3dEb3duKT1cImNoYW5nZVNlY29uZCgtc2Vjb25kU3RlcClcIj5cbiAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic3Bpbm5lcnNcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNoYW5nZVNlY29uZCgtc2Vjb25kU3RlcClcIlxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb24gbmdiLXRwLWNoZXZyb24gYm90dG9tXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuZGVjcmVtZW50LXNlY29uZHNcIj5EZWNyZW1lbnQgc2Vjb25kczwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJtZXJpZGlhblwiIGNsYXNzPVwibmdiLXRwLXNwYWNlclwiPjwvZGl2PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwibWVyaWRpYW5cIiBjbGFzcz1cIm5nYi10cC1tZXJpZGlhblwiPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnlcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZU1lcmlkaWFuKClcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtb2RlbD8uaG91ciA+PSAxMjsgZWxzZSBhbVwiIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLlBNXCI+UE08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjYW0gaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuQU1cIj5BTTwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9maWVsZHNldD5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbTkdCX1RJTUVQSUNLRVJfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIE5nYlRpbWVwaWNrZXIgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICBPbkNoYW5nZXMge1xuICBkaXNhYmxlZDogYm9vbGVhbjtcbiAgbW9kZWw6IE5nYlRpbWU7XG5cbiAgcHJpdmF0ZSBfaG91clN0ZXA6IG51bWJlcjtcbiAgcHJpdmF0ZSBfbWludXRlU3RlcDogbnVtYmVyO1xuICBwcml2YXRlIF9zZWNvbmRTdGVwOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gZGlzcGxheSAxMkggb3IgMjRIIG1vZGUuXG4gICAqL1xuICBASW5wdXQoKSBtZXJpZGlhbjogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBkaXNwbGF5IHRoZSBzcGlubmVycyBhYm92ZSBhbmQgYmVsb3cgdGhlIGlucHV0cy5cbiAgICovXG4gIEBJbnB1dCgpIHNwaW5uZXJzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgc2Vjb25kcyBpbnB1dC5cbiAgICovXG4gIEBJbnB1dCgpIHNlY29uZHM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBob3VycyB0byBpbmNyZWFzZSBvciBkZWNyZWFzZSB3aGVuIHVzaW5nIGEgYnV0dG9uLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGhvdXJTdGVwKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMuX2hvdXJTdGVwID0gaXNJbnRlZ2VyKHN0ZXApID8gc3RlcCA6IHRoaXMuX2NvbmZpZy5ob3VyU3RlcDtcbiAgfVxuXG4gIGdldCBob3VyU3RlcCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5faG91clN0ZXA7IH1cblxuICAvKipcbiAgICogTnVtYmVyIG9mIG1pbnV0ZXMgdG8gaW5jcmVhc2Ugb3IgZGVjcmVhc2Ugd2hlbiB1c2luZyBhIGJ1dHRvbi5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBtaW51dGVTdGVwKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMuX21pbnV0ZVN0ZXAgPSBpc0ludGVnZXIoc3RlcCkgPyBzdGVwIDogdGhpcy5fY29uZmlnLm1pbnV0ZVN0ZXA7XG4gIH1cblxuICBnZXQgbWludXRlU3RlcCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbWludXRlU3RlcDsgfVxuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2Ygc2Vjb25kcyB0byBpbmNyZWFzZSBvciBkZWNyZWFzZSB3aGVuIHVzaW5nIGEgYnV0dG9uLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IHNlY29uZFN0ZXAoc3RlcDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2Vjb25kU3RlcCA9IGlzSW50ZWdlcihzdGVwKSA/IHN0ZXAgOiB0aGlzLl9jb25maWcuc2Vjb25kU3RlcDtcbiAgfVxuXG4gIGdldCBzZWNvbmRTdGVwKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9zZWNvbmRTdGVwOyB9XG5cbiAgLyoqXG4gICAqIFRvIG1ha2UgdGltZXBpY2tlciByZWFkb25seVxuICAgKi9cbiAgQElucHV0KCkgcmVhZG9ubHlJbnB1dHM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRvIHNldCB0aGUgc2l6ZSBvZiB0aGUgaW5wdXRzIGFuZCBidXR0b25cbiAgICovXG4gIEBJbnB1dCgpIHNpemU6ICdzbWFsbCcgfCAnbWVkaXVtJyB8ICdsYXJnZSc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IF9jb25maWc6IE5nYlRpbWVwaWNrZXJDb25maWcsIHByaXZhdGUgX25nYlRpbWVBZGFwdGVyOiBOZ2JUaW1lQWRhcHRlcjxhbnk+LFxuICAgICAgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5tZXJpZGlhbiA9IF9jb25maWcubWVyaWRpYW47XG4gICAgdGhpcy5zcGlubmVycyA9IF9jb25maWcuc3Bpbm5lcnM7XG4gICAgdGhpcy5zZWNvbmRzID0gX2NvbmZpZy5zZWNvbmRzO1xuICAgIHRoaXMuaG91clN0ZXAgPSBfY29uZmlnLmhvdXJTdGVwO1xuICAgIHRoaXMubWludXRlU3RlcCA9IF9jb25maWcubWludXRlU3RlcDtcbiAgICB0aGlzLnNlY29uZFN0ZXAgPSBfY29uZmlnLnNlY29uZFN0ZXA7XG4gICAgdGhpcy5kaXNhYmxlZCA9IF9jb25maWcuZGlzYWJsZWQ7XG4gICAgdGhpcy5yZWFkb25seUlucHV0cyA9IF9jb25maWcucmVhZG9ubHlJbnB1dHM7XG4gICAgdGhpcy5zaXplID0gX2NvbmZpZy5zaXplO1xuICB9XG5cbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xuICAgIGNvbnN0IHN0cnVjdFZhbHVlID0gdGhpcy5fbmdiVGltZUFkYXB0ZXIuZnJvbU1vZGVsKHZhbHVlKTtcbiAgICB0aGlzLm1vZGVsID0gc3RydWN0VmFsdWUgPyBuZXcgTmdiVGltZShzdHJ1Y3RWYWx1ZS5ob3VyLCBzdHJ1Y3RWYWx1ZS5taW51dGUsIHN0cnVjdFZhbHVlLnNlY29uZCkgOiBuZXcgTmdiVGltZSgpO1xuICAgIGlmICghdGhpcy5zZWNvbmRzICYmICghc3RydWN0VmFsdWUgfHwgIWlzTnVtYmVyKHN0cnVjdFZhbHVlLnNlY29uZCkpKSB7XG4gICAgICB0aGlzLm1vZGVsLnNlY29uZCA9IDA7XG4gICAgfVxuICAgIHRoaXMuX2NkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uQ2hhbmdlID0gZm47IH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7IHRoaXMub25Ub3VjaGVkID0gZm47IH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHsgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7IH1cblxuICBjaGFuZ2VIb3VyKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMubW9kZWwuY2hhbmdlSG91cihzdGVwKTtcbiAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKCk7XG4gIH1cblxuICBjaGFuZ2VNaW51dGUoc3RlcDogbnVtYmVyKSB7XG4gICAgdGhpcy5tb2RlbC5jaGFuZ2VNaW51dGUoc3RlcCk7XG4gICAgdGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZSgpO1xuICB9XG5cbiAgY2hhbmdlU2Vjb25kKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMubW9kZWwuY2hhbmdlU2Vjb25kKHN0ZXApO1xuICAgIHRoaXMucHJvcGFnYXRlTW9kZWxDaGFuZ2UoKTtcbiAgfVxuXG4gIHVwZGF0ZUhvdXIobmV3VmFsOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpc1BNID0gdGhpcy5tb2RlbC5ob3VyID49IDEyO1xuICAgIGNvbnN0IGVudGVyZWRIb3VyID0gdG9JbnRlZ2VyKG5ld1ZhbCk7XG4gICAgaWYgKHRoaXMubWVyaWRpYW4gJiYgKGlzUE0gJiYgZW50ZXJlZEhvdXIgPCAxMiB8fCAhaXNQTSAmJiBlbnRlcmVkSG91ciA9PT0gMTIpKSB7XG4gICAgICB0aGlzLm1vZGVsLnVwZGF0ZUhvdXIoZW50ZXJlZEhvdXIgKyAxMik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kZWwudXBkYXRlSG91cihlbnRlcmVkSG91cik7XG4gICAgfVxuICAgIHRoaXMucHJvcGFnYXRlTW9kZWxDaGFuZ2UoKTtcbiAgfVxuXG4gIHVwZGF0ZU1pbnV0ZShuZXdWYWw6IHN0cmluZykge1xuICAgIHRoaXMubW9kZWwudXBkYXRlTWludXRlKHRvSW50ZWdlcihuZXdWYWwpKTtcbiAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKCk7XG4gIH1cblxuICB1cGRhdGVTZWNvbmQobmV3VmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1vZGVsLnVwZGF0ZVNlY29uZCh0b0ludGVnZXIobmV3VmFsKSk7XG4gICAgdGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZSgpO1xuICB9XG5cbiAgdG9nZ2xlTWVyaWRpYW4oKSB7XG4gICAgaWYgKHRoaXMubWVyaWRpYW4pIHtcbiAgICAgIHRoaXMuY2hhbmdlSG91cigxMik7XG4gICAgfVxuICB9XG5cbiAgZm9ybWF0SG91cih2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKGlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgaWYgKHRoaXMubWVyaWRpYW4pIHtcbiAgICAgICAgcmV0dXJuIHBhZE51bWJlcih2YWx1ZSAlIDEyID09PSAwID8gMTIgOiB2YWx1ZSAlIDEyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwYWROdW1iZXIodmFsdWUgJSAyNCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwYWROdW1iZXIoTmFOKTtcbiAgICB9XG4gIH1cblxuICBmb3JtYXRNaW5TZWModmFsdWU6IG51bWJlcikgeyByZXR1cm4gcGFkTnVtYmVyKHZhbHVlKTsgfVxuXG4gIGdldCBpc1NtYWxsU2l6ZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ3NtYWxsJzsgfVxuXG4gIGdldCBpc0xhcmdlU2l6ZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ2xhcmdlJzsgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlc1snc2Vjb25kcyddICYmICF0aGlzLnNlY29uZHMgJiYgdGhpcy5tb2RlbCAmJiAhaXNOdW1iZXIodGhpcy5tb2RlbC5zZWNvbmQpKSB7XG4gICAgICB0aGlzLm1vZGVsLnNlY29uZCA9IDA7XG4gICAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHByb3BhZ2F0ZU1vZGVsQ2hhbmdlKHRvdWNoZWQgPSB0cnVlKSB7XG4gICAgaWYgKHRvdWNoZWQpIHtcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLm1vZGVsLmlzVmFsaWQodGhpcy5zZWNvbmRzKSkge1xuICAgICAgdGhpcy5vbkNoYW5nZShcbiAgICAgICAgICB0aGlzLl9uZ2JUaW1lQWRhcHRlci50b01vZGVsKHtob3VyOiB0aGlzLm1vZGVsLmhvdXIsIG1pbnV0ZTogdGhpcy5tb2RlbC5taW51dGUsIHNlY29uZDogdGhpcy5tb2RlbC5zZWNvbmR9KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fbmdiVGltZUFkYXB0ZXIudG9Nb2RlbChudWxsKSk7XG4gICAgfVxuICB9XG59XG4iXX0=