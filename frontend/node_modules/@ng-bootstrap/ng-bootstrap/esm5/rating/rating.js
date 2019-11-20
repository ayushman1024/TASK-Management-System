/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, TemplateRef, ContentChild, forwardRef, ChangeDetectorRef } from '@angular/core';
import { NgbRatingConfig } from './rating-config';
import { getValueInRange } from '../util/util';
import { Key } from '../util/key';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/**
 * Context for the custom star display template
 * @record
 */
export function StarTemplateContext() { }
if (false) {
    /**
     * Star fill percentage. An integer value between 0 and 100
     * @type {?}
     */
    StarTemplateContext.prototype.fill;
    /**
     * Index of the star.
     * @type {?}
     */
    StarTemplateContext.prototype.index;
}
/** @type {?} */
var NGB_RATING_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgbRating; }),
    multi: true
};
/**
 * Rating directive that will take care of visualising a star rating bar.
 */
var NgbRating = /** @class */ (function () {
    function NgbRating(config, _changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this.contexts = [];
        this.disabled = false;
        /**
         * An event fired when a user is hovering over a given rating.
         * Event's payload equals to the rating being hovered over.
         */
        this.hover = new EventEmitter();
        /**
         * An event fired when a user stops hovering over a given rating.
         * Event's payload equals to the rating of the last item being hovered over.
         */
        this.leave = new EventEmitter();
        /**
         * An event fired when a user selects a new rating.
         * Event's payload equals to the newly selected rating.
         */
        this.rateChange = new EventEmitter(true);
        this.onChange = function (_) { };
        this.onTouched = function () { };
        this.max = config.max;
        this.readonly = config.readonly;
    }
    /**
     * @return {?}
     */
    NgbRating.prototype.ariaValueText = /**
     * @return {?}
     */
    function () { return this.nextRate + " out of " + this.max; };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbRating.prototype.enter = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.readonly && !this.disabled) {
            this._updateState(value);
        }
        this.hover.emit(value);
    };
    /**
     * @return {?}
     */
    NgbRating.prototype.handleBlur = /**
     * @return {?}
     */
    function () { this.onTouched(); };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbRating.prototype.handleClick = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this.update(this.resettable && this.rate === value ? 0 : value); };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbRating.prototype.handleKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line:deprecation
        switch (event.which) {
            case Key.ArrowDown:
            case Key.ArrowLeft:
                this.update(this.rate - 1);
                break;
            case Key.ArrowUp:
            case Key.ArrowRight:
                this.update(this.rate + 1);
                break;
            case Key.Home:
                this.update(0);
                break;
            case Key.End:
                this.update(this.max);
                break;
            default:
                return;
        }
        // note 'return' in default case
        event.preventDefault();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbRating.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['rate']) {
            this.update(this.rate);
        }
    };
    /**
     * @return {?}
     */
    NgbRating.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.contexts = Array.from({ length: this.max }, function (v, k) { return ({ fill: 0, index: k }); });
        this._updateState(this.rate);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbRating.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbRating.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onTouched = fn; };
    /**
     * @return {?}
     */
    NgbRating.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.leave.emit(this.nextRate);
        this._updateState(this.rate);
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgbRating.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) { this.disabled = isDisabled; };
    /**
     * @param {?} value
     * @param {?=} internalChange
     * @return {?}
     */
    NgbRating.prototype.update = /**
     * @param {?} value
     * @param {?=} internalChange
     * @return {?}
     */
    function (value, internalChange) {
        if (internalChange === void 0) { internalChange = true; }
        /** @type {?} */
        var newRate = getValueInRange(value, this.max, 0);
        if (!this.readonly && !this.disabled && this.rate !== newRate) {
            this.rate = newRate;
            this.rateChange.emit(this.rate);
        }
        if (internalChange) {
            this.onChange(this.rate);
            this.onTouched();
        }
        this._updateState(this.rate);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbRating.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.update(value, false);
        this._changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgbRating.prototype._getFillValue = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var diff = this.nextRate - index;
        if (diff >= 1) {
            return 100;
        }
        if (diff < 1 && diff > 0) {
            return parseInt((diff * 100).toFixed(2), 10);
        }
        return 0;
    };
    /**
     * @param {?} nextValue
     * @return {?}
     */
    NgbRating.prototype._updateState = /**
     * @param {?} nextValue
     * @return {?}
     */
    function (nextValue) {
        var _this = this;
        this.nextRate = nextValue;
        this.contexts.forEach(function (context, index) { return context.fill = _this._getFillValue(index); });
    };
    NgbRating.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-rating',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        'class': 'd-inline-flex',
                        'tabindex': '0',
                        'role': 'slider',
                        'aria-valuemin': '0',
                        '[attr.aria-valuemax]': 'max',
                        '[attr.aria-valuenow]': 'nextRate',
                        '[attr.aria-valuetext]': 'ariaValueText()',
                        '[attr.aria-disabled]': 'readonly ? true : null',
                        '(blur)': 'handleBlur()',
                        '(keydown)': 'handleKeyDown($event)',
                        '(mouseleave)': 'reset()'
                    },
                    template: "\n    <ng-template #t let-fill=\"fill\">{{ fill === 100 ? '&#9733;' : '&#9734;' }}</ng-template>\n    <ng-template ngFor [ngForOf]=\"contexts\" let-index=\"index\">\n      <span class=\"sr-only\">({{ index < nextRate ? '*' : ' ' }})</span>\n      <span (mouseenter)=\"enter(index + 1)\" (click)=\"handleClick(index + 1)\" [style.cursor]=\"readonly || disabled ? 'default' : 'pointer'\">\n        <ng-template [ngTemplateOutlet]=\"starTemplate || starTemplateFromContent || t\" [ngTemplateOutletContext]=\"contexts[index]\">\n        </ng-template>\n      </span>\n    </ng-template>\n  ",
                    providers: [NGB_RATING_VALUE_ACCESSOR]
                }] }
    ];
    /** @nocollapse */
    NgbRating.ctorParameters = function () { return [
        { type: NgbRatingConfig },
        { type: ChangeDetectorRef }
    ]; };
    NgbRating.propDecorators = {
        max: [{ type: Input }],
        rate: [{ type: Input }],
        readonly: [{ type: Input }],
        resettable: [{ type: Input }],
        starTemplate: [{ type: Input }],
        starTemplateFromContent: [{ type: ContentChild, args: [TemplateRef,] }],
        hover: [{ type: Output }],
        leave: [{ type: Output }],
        rateChange: [{ type: Output }]
    };
    return NgbRating;
}());
export { NgbRating };
if (false) {
    /** @type {?} */
    NgbRating.prototype.contexts;
    /** @type {?} */
    NgbRating.prototype.disabled;
    /** @type {?} */
    NgbRating.prototype.nextRate;
    /**
     * Maximal rating that can be given using this widget.
     * @type {?}
     */
    NgbRating.prototype.max;
    /**
     * Current rating. Can be a decimal value like 3.75
     * @type {?}
     */
    NgbRating.prototype.rate;
    /**
     * A flag indicating if rating can be updated.
     * @type {?}
     */
    NgbRating.prototype.readonly;
    /**
     * A flag indicating if rating can be reset to 0 on mouse click
     * @type {?}
     */
    NgbRating.prototype.resettable;
    /**
     * A template to override star display.
     * Alternatively put a <ng-template> as the only child of <ngb-rating> element
     * @type {?}
     */
    NgbRating.prototype.starTemplate;
    /** @type {?} */
    NgbRating.prototype.starTemplateFromContent;
    /**
     * An event fired when a user is hovering over a given rating.
     * Event's payload equals to the rating being hovered over.
     * @type {?}
     */
    NgbRating.prototype.hover;
    /**
     * An event fired when a user stops hovering over a given rating.
     * Event's payload equals to the rating of the last item being hovered over.
     * @type {?}
     */
    NgbRating.prototype.leave;
    /**
     * An event fired when a user selects a new rating.
     * Event's payload equals to the newly selected rating.
     * @type {?}
     */
    NgbRating.prototype.rateChange;
    /** @type {?} */
    NgbRating.prototype.onChange;
    /** @type {?} */
    NgbRating.prototype.onTouched;
    /** @type {?} */
    NgbRating.prototype._changeDetectorRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJyYXRpbmcvcmF0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixFQUN2QixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFFWixXQUFXLEVBR1gsWUFBWSxFQUNaLFVBQVUsRUFDVixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDN0MsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNoQyxPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBS3ZFLHlDQVVDOzs7Ozs7SUFOQyxtQ0FBYTs7Ozs7SUFLYixvQ0FBYzs7O0lBR1YseUJBQXlCLEdBQUc7SUFDaEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxTQUFTLEVBQVQsQ0FBUyxDQUFDO0lBQ3hDLEtBQUssRUFBRSxJQUFJO0NBQ1o7Ozs7QUFLRDtJQW1GRSxtQkFBWSxNQUF1QixFQUFVLGtCQUFxQztRQUFyQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBckRsRixhQUFRLEdBQTBCLEVBQUUsQ0FBQztRQUNyQyxhQUFRLEdBQUcsS0FBSyxDQUFDOzs7OztRQW1DUCxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQzs7Ozs7UUFNbkMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7Ozs7O1FBTW5DLGVBQVUsR0FBRyxJQUFJLFlBQVksQ0FBUyxJQUFJLENBQUMsQ0FBQztRQUV0RCxhQUFRLEdBQUcsVUFBQyxDQUFNLElBQU0sQ0FBQyxDQUFD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QUMseUJBQXlCLENBQUM7aUJBQ3ZDOzs7O2dCQXhETyxlQUFlO2dCQUZyQixpQkFBaUI7OztzQkFxRWhCLEtBQUs7dUJBS0wsS0FBSzsyQkFLTCxLQUFLOzZCQUtMLEtBQUs7K0JBTUwsS0FBSzswQ0FDTCxZQUFZLFNBQUMsV0FBVzt3QkFNeEIsTUFBTTt3QkFNTixNQUFNOzZCQU1OLE1BQU07O0lBeUdULGdCQUFDO0NBQUEsQUF2TEQsSUF1TEM7U0EzSlksU0FBUzs7O0lBRXBCLDZCQUFxQzs7SUFDckMsNkJBQWlCOztJQUNqQiw2QkFBaUI7Ozs7O0lBTWpCLHdCQUFxQjs7Ozs7SUFLckIseUJBQXNCOzs7OztJQUt0Qiw2QkFBMkI7Ozs7O0lBSzNCLCtCQUE2Qjs7Ozs7O0lBTTdCLGlDQUF3RDs7SUFDeEQsNENBQXFGOzs7Ozs7SUFNckYsMEJBQTZDOzs7Ozs7SUFNN0MsMEJBQTZDOzs7Ozs7SUFNN0MsK0JBQXNEOztJQUV0RCw2QkFBMEI7O0lBQzFCLDhCQUFxQjs7SUFFZ0IsdUNBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkluaXQsXG4gIFRlbXBsYXRlUmVmLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIENvbnRlbnRDaGlsZCxcbiAgZm9yd2FyZFJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYlJhdGluZ0NvbmZpZ30gZnJvbSAnLi9yYXRpbmctY29uZmlnJztcbmltcG9ydCB7Z2V0VmFsdWVJblJhbmdlfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8qKlxuICogQ29udGV4dCBmb3IgdGhlIGN1c3RvbSBzdGFyIGRpc3BsYXkgdGVtcGxhdGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdGFyVGVtcGxhdGVDb250ZXh0IHtcbiAgLyoqXG4gICAqIFN0YXIgZmlsbCBwZXJjZW50YWdlLiBBbiBpbnRlZ2VyIHZhbHVlIGJldHdlZW4gMCBhbmQgMTAwXG4gICAqL1xuICBmaWxsOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBzdGFyLlxuICAgKi9cbiAgaW5kZXg6IG51bWJlcjtcbn1cblxuY29uc3QgTkdCX1JBVElOR19WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYlJhdGluZyksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKipcbiAqIFJhdGluZyBkaXJlY3RpdmUgdGhhdCB3aWxsIHRha2UgY2FyZSBvZiB2aXN1YWxpc2luZyBhIHN0YXIgcmF0aW5nIGJhci5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLXJhdGluZycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ2QtaW5saW5lLWZsZXgnLFxuICAgICd0YWJpbmRleCc6ICcwJyxcbiAgICAncm9sZSc6ICdzbGlkZXInLFxuICAgICdhcmlhLXZhbHVlbWluJzogJzAnLFxuICAgICdbYXR0ci5hcmlhLXZhbHVlbWF4XSc6ICdtYXgnLFxuICAgICdbYXR0ci5hcmlhLXZhbHVlbm93XSc6ICduZXh0UmF0ZScsXG4gICAgJ1thdHRyLmFyaWEtdmFsdWV0ZXh0XSc6ICdhcmlhVmFsdWVUZXh0KCknLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdyZWFkb25seSA/IHRydWUgOiBudWxsJyxcbiAgICAnKGJsdXIpJzogJ2hhbmRsZUJsdXIoKScsXG4gICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlEb3duKCRldmVudCknLFxuICAgICcobW91c2VsZWF2ZSknOiAncmVzZXQoKSdcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI3QgbGV0LWZpbGw9XCJmaWxsXCI+e3sgZmlsbCA9PT0gMTAwID8gJyYjOTczMzsnIDogJyYjOTczNDsnIH19PC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwiY29udGV4dHNcIiBsZXQtaW5kZXg9XCJpbmRleFwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+KHt7IGluZGV4IDwgbmV4dFJhdGUgPyAnKicgOiAnICcgfX0pPC9zcGFuPlxuICAgICAgPHNwYW4gKG1vdXNlZW50ZXIpPVwiZW50ZXIoaW5kZXggKyAxKVwiIChjbGljayk9XCJoYW5kbGVDbGljayhpbmRleCArIDEpXCIgW3N0eWxlLmN1cnNvcl09XCJyZWFkb25seSB8fCBkaXNhYmxlZCA/ICdkZWZhdWx0JyA6ICdwb2ludGVyJ1wiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwic3RhclRlbXBsYXRlIHx8IHN0YXJUZW1wbGF0ZUZyb21Db250ZW50IHx8IHRcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiY29udGV4dHNbaW5kZXhdXCI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L3NwYW4+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbTkdCX1JBVElOR19WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTmdiUmF0aW5nIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgT25Jbml0LCBPbkNoYW5nZXMge1xuICBjb250ZXh0czogU3RhclRlbXBsYXRlQ29udGV4dFtdID0gW107XG4gIGRpc2FibGVkID0gZmFsc2U7XG4gIG5leHRSYXRlOiBudW1iZXI7XG5cblxuICAvKipcbiAgICogTWF4aW1hbCByYXRpbmcgdGhhdCBjYW4gYmUgZ2l2ZW4gdXNpbmcgdGhpcyB3aWRnZXQuXG4gICAqL1xuICBASW5wdXQoKSBtYXg6IG51bWJlcjtcblxuICAvKipcbiAgICogQ3VycmVudCByYXRpbmcuIENhbiBiZSBhIGRlY2ltYWwgdmFsdWUgbGlrZSAzLjc1XG4gICAqL1xuICBASW5wdXQoKSByYXRlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIHJhdGluZyBjYW4gYmUgdXBkYXRlZC5cbiAgICovXG4gIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiByYXRpbmcgY2FuIGJlIHJlc2V0IHRvIDAgb24gbW91c2UgY2xpY2tcbiAgICovXG4gIEBJbnB1dCgpIHJlc2V0dGFibGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgdGVtcGxhdGUgdG8gb3ZlcnJpZGUgc3RhciBkaXNwbGF5LlxuICAgKiBBbHRlcm5hdGl2ZWx5IHB1dCBhIDxuZy10ZW1wbGF0ZT4gYXMgdGhlIG9ubHkgY2hpbGQgb2YgPG5nYi1yYXRpbmc+IGVsZW1lbnRcbiAgICovXG4gIEBJbnB1dCgpIHN0YXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8U3RhclRlbXBsYXRlQ29udGV4dD47XG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHN0YXJUZW1wbGF0ZUZyb21Db250ZW50OiBUZW1wbGF0ZVJlZjxTdGFyVGVtcGxhdGVDb250ZXh0PjtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZmlyZWQgd2hlbiBhIHVzZXIgaXMgaG92ZXJpbmcgb3ZlciBhIGdpdmVuIHJhdGluZy5cbiAgICogRXZlbnQncyBwYXlsb2FkIGVxdWFscyB0byB0aGUgcmF0aW5nIGJlaW5nIGhvdmVyZWQgb3Zlci5cbiAgICovXG4gIEBPdXRwdXQoKSBob3ZlciA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCBmaXJlZCB3aGVuIGEgdXNlciBzdG9wcyBob3ZlcmluZyBvdmVyIGEgZ2l2ZW4gcmF0aW5nLlxuICAgKiBFdmVudCdzIHBheWxvYWQgZXF1YWxzIHRvIHRoZSByYXRpbmcgb2YgdGhlIGxhc3QgaXRlbSBiZWluZyBob3ZlcmVkIG92ZXIuXG4gICAqL1xuICBAT3V0cHV0KCkgbGVhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZmlyZWQgd2hlbiBhIHVzZXIgc2VsZWN0cyBhIG5ldyByYXRpbmcuXG4gICAqIEV2ZW50J3MgcGF5bG9hZCBlcXVhbHMgdG8gdGhlIG5ld2x5IHNlbGVjdGVkIHJhdGluZy5cbiAgICovXG4gIEBPdXRwdXQoKSByYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KHRydWUpO1xuXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiUmF0aW5nQ29uZmlnLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLm1heCA9IGNvbmZpZy5tYXg7XG4gICAgdGhpcy5yZWFkb25seSA9IGNvbmZpZy5yZWFkb25seTtcbiAgfVxuXG4gIGFyaWFWYWx1ZVRleHQoKSB7IHJldHVybiBgJHt0aGlzLm5leHRSYXRlfSBvdXQgb2YgJHt0aGlzLm1heH1gOyB9XG5cbiAgZW50ZXIodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghdGhpcy5yZWFkb25seSAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fdXBkYXRlU3RhdGUodmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLmhvdmVyLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgaGFuZGxlQmx1cigpIHsgdGhpcy5vblRvdWNoZWQoKTsgfVxuXG4gIGhhbmRsZUNsaWNrKHZhbHVlOiBudW1iZXIpIHsgdGhpcy51cGRhdGUodGhpcy5yZXNldHRhYmxlICYmIHRoaXMucmF0ZSA9PT0gdmFsdWUgPyAwIDogdmFsdWUpOyB9XG5cbiAgaGFuZGxlS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgIGNhc2UgS2V5LkFycm93RG93bjpcbiAgICAgIGNhc2UgS2V5LkFycm93TGVmdDpcbiAgICAgICAgdGhpcy51cGRhdGUodGhpcy5yYXRlIC0gMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuQXJyb3dVcDpcbiAgICAgIGNhc2UgS2V5LkFycm93UmlnaHQ6XG4gICAgICAgIHRoaXMudXBkYXRlKHRoaXMucmF0ZSArIDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkhvbWU6XG4gICAgICAgIHRoaXMudXBkYXRlKDApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkVuZDpcbiAgICAgICAgdGhpcy51cGRhdGUodGhpcy5tYXgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBub3RlICdyZXR1cm4nIGluIGRlZmF1bHQgY2FzZVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ3JhdGUnXSkge1xuICAgICAgdGhpcy51cGRhdGUodGhpcy5yYXRlKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRleHRzID0gQXJyYXkuZnJvbSh7bGVuZ3RoOiB0aGlzLm1heH0sICh2LCBrKSA9PiAoe2ZpbGw6IDAsIGluZGV4OiBrfSkpO1xuICAgIHRoaXMuX3VwZGF0ZVN0YXRlKHRoaXMucmF0ZSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMub25DaGFuZ2UgPSBmbjsgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vblRvdWNoZWQgPSBmbjsgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMubGVhdmUuZW1pdCh0aGlzLm5leHRSYXRlKTtcbiAgICB0aGlzLl91cGRhdGVTdGF0ZSh0aGlzLnJhdGUpO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7IHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkOyB9XG5cbiAgdXBkYXRlKHZhbHVlOiBudW1iZXIsIGludGVybmFsQ2hhbmdlID0gdHJ1ZSk6IHZvaWQge1xuICAgIGNvbnN0IG5ld1JhdGUgPSBnZXRWYWx1ZUluUmFuZ2UodmFsdWUsIHRoaXMubWF4LCAwKTtcbiAgICBpZiAoIXRoaXMucmVhZG9ubHkgJiYgIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy5yYXRlICE9PSBuZXdSYXRlKSB7XG4gICAgICB0aGlzLnJhdGUgPSBuZXdSYXRlO1xuICAgICAgdGhpcy5yYXRlQ2hhbmdlLmVtaXQodGhpcy5yYXRlKTtcbiAgICB9XG4gICAgaWYgKGludGVybmFsQ2hhbmdlKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMucmF0ZSk7XG4gICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIH1cbiAgICB0aGlzLl91cGRhdGVTdGF0ZSh0aGlzLnJhdGUpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMudXBkYXRlKHZhbHVlLCBmYWxzZSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRGaWxsVmFsdWUoaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgZGlmZiA9IHRoaXMubmV4dFJhdGUgLSBpbmRleDtcblxuICAgIGlmIChkaWZmID49IDEpIHtcbiAgICAgIHJldHVybiAxMDA7XG4gICAgfVxuICAgIGlmIChkaWZmIDwgMSAmJiBkaWZmID4gMCkge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KChkaWZmICogMTAwKS50b0ZpeGVkKDIpLCAxMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTdGF0ZShuZXh0VmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMubmV4dFJhdGUgPSBuZXh0VmFsdWU7XG4gICAgdGhpcy5jb250ZXh0cy5mb3JFYWNoKChjb250ZXh0LCBpbmRleCkgPT4gY29udGV4dC5maWxsID0gdGhpcy5fZ2V0RmlsbFZhbHVlKGluZGV4KSk7XG4gIH1cbn1cbiJdfQ==