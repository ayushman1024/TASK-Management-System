/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, ComponentFactoryResolver, Directive, ElementRef, EventEmitter, forwardRef, Inject, Injector, Input, NgZone, Output, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Live } from '../util/accessibility/live';
import { ngbAutoClose } from '../util/autoclose';
import { Key } from '../util/key';
import { PopupService } from '../util/popup';
import { positionElements } from '../util/positioning';
import { isDefined, toString } from '../util/util';
import { NgbTypeaheadConfig } from './typeahead-config';
import { NgbTypeaheadWindow } from './typeahead-window';
/** @type {?} */
var NGB_TYPEAHEAD_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgbTypeahead; }),
    multi: true
};
/**
 * Payload of the selectItem event.
 * @record
 */
export function NgbTypeaheadSelectItemEvent() { }
if (false) {
    /**
     * An item about to be selected
     * @type {?}
     */
    NgbTypeaheadSelectItemEvent.prototype.item;
    /**
     * Function that will prevent item selection if called
     * @type {?}
     */
    NgbTypeaheadSelectItemEvent.prototype.preventDefault;
}
/** @type {?} */
var nextWindowId = 0;
/**
 * NgbTypeahead directive provides a simple way of creating powerful typeaheads from any text input
 */
var NgbTypeahead = /** @class */ (function () {
    function NgbTypeahead(_elementRef, _viewContainerRef, _renderer, _injector, componentFactoryResolver, config, ngZone, _live, _document, _ngZone, _changeDetector) {
        var _this = this;
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._injector = _injector;
        this._live = _live;
        this._document = _document;
        this._ngZone = _ngZone;
        this._changeDetector = _changeDetector;
        this._closed$ = new Subject();
        /**
         * Value for the configurable autocomplete attribute.
         * Defaults to 'off' to disable the native browser autocomplete, but this standard value does not seem
         * to be always correctly taken into account.
         *
         * \@since 2.1.0
         */
        this.autocomplete = 'off';
        /**
         * Placement of a typeahead accepts:
         *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
         *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
         *  array or a space separated string of above values
         */
        this.placement = 'bottom-left';
        /**
         * An event emitted when a match is selected. Event payload is of type NgbTypeaheadSelectItemEvent.
         */
        this.selectItem = new EventEmitter();
        this.popupId = "ngb-typeahead-" + nextWindowId++;
        this._onTouched = function () { };
        this._onChange = function (_) { };
        this.container = config.container;
        this.editable = config.editable;
        this.focusFirst = config.focusFirst;
        this.showHint = config.showHint;
        this.placement = config.placement;
        this._valueChanges = fromEvent(_elementRef.nativeElement, 'input')
            .pipe(map(function ($event) { return ((/** @type {?} */ ($event.target))).value; }));
        this._resubscribeTypeahead = new BehaviorSubject(null);
        this._popupService = new PopupService(NgbTypeaheadWindow, _injector, _viewContainerRef, _renderer, componentFactoryResolver);
        this._zoneSubscription = ngZone.onStable.subscribe(function () {
            if (_this.isPopupOpen()) {
                positionElements(_this._elementRef.nativeElement, _this._windowRef.location.nativeElement, _this.placement, _this.container === 'body');
            }
        });
    }
    /**
     * @return {?}
     */
    NgbTypeahead.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var inputValues$ = this._valueChanges.pipe(tap(function (value) {
            _this._inputValueBackup = _this.showHint ? value : null;
            if (_this.editable) {
                _this._onChange(value);
            }
        }));
        /** @type {?} */
        var results$ = inputValues$.pipe(this.ngbTypeahead);
        /** @type {?} */
        var processedResults$ = results$.pipe(tap(function () {
            if (!_this.editable) {
                _this._onChange(undefined);
            }
        }));
        /** @type {?} */
        var userInput$ = this._resubscribeTypeahead.pipe(switchMap(function () { return processedResults$; }));
        this._subscription = this._subscribeToUserInput(userInput$);
    };
    /**
     * @return {?}
     */
    NgbTypeahead.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._closePopup();
        this._unsubscribeFromUserInput();
        this._zoneSubscription.unsubscribe();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbTypeahead.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbTypeahead.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onTouched = fn; };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbTypeahead.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._writeInputValue(this._formatItemForInput(value));
        if (this.showHint) {
            this._inputValueBackup = value;
        }
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgbTypeahead.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    /**
     * Dismisses typeahead popup window
     */
    /**
     * Dismisses typeahead popup window
     * @return {?}
     */
    NgbTypeahead.prototype.dismissPopup = /**
     * Dismisses typeahead popup window
     * @return {?}
     */
    function () {
        if (this.isPopupOpen()) {
            this._resubscribeTypeahead.next(null);
            this._closePopup();
            if (this.showHint && this._inputValueBackup !== null) {
                this._writeInputValue(this._inputValueBackup);
            }
            this._changeDetector.markForCheck();
        }
    };
    /**
     * Returns true if the typeahead popup window is displayed
     */
    /**
     * Returns true if the typeahead popup window is displayed
     * @return {?}
     */
    NgbTypeahead.prototype.isPopupOpen = /**
     * Returns true if the typeahead popup window is displayed
     * @return {?}
     */
    function () { return this._windowRef != null; };
    /**
     * @return {?}
     */
    NgbTypeahead.prototype.handleBlur = /**
     * @return {?}
     */
    function () {
        this._resubscribeTypeahead.next(null);
        this._onTouched();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbTypeahead.prototype.handleKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.isPopupOpen()) {
            return;
        }
        // tslint:disable-next-line:deprecation
        switch (event.which) {
            case Key.ArrowDown:
                event.preventDefault();
                this._windowRef.instance.next();
                this._showHint();
                break;
            case Key.ArrowUp:
                event.preventDefault();
                this._windowRef.instance.prev();
                this._showHint();
                break;
            case Key.Enter:
            case Key.Tab:
                /** @type {?} */
                var result = this._windowRef.instance.getActive();
                if (isDefined(result)) {
                    event.preventDefault();
                    event.stopPropagation();
                    this._selectResult(result);
                }
                this._closePopup();
                break;
        }
    };
    /**
     * @return {?}
     */
    NgbTypeahead.prototype._openPopup = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.isPopupOpen()) {
            this._inputValueBackup = this._elementRef.nativeElement.value;
            this._windowRef = this._popupService.open();
            this._windowRef.instance.id = this.popupId;
            this._windowRef.instance.selectEvent.subscribe(function (result) { return _this._selectResultClosePopup(result); });
            this._windowRef.instance.activeChangeEvent.subscribe(function (activeId) { return _this.activeDescendant = activeId; });
            if (this.container === 'body') {
                window.document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            this._changeDetector.markForCheck();
            ngbAutoClose(this._ngZone, this._document, 'outside', function () { return _this.dismissPopup(); }, this._closed$, [this._elementRef.nativeElement, this._windowRef.location.nativeElement]);
        }
    };
    /**
     * @return {?}
     */
    NgbTypeahead.prototype._closePopup = /**
     * @return {?}
     */
    function () {
        this._closed$.next();
        this._popupService.close();
        this._windowRef = null;
        this.activeDescendant = undefined;
    };
    /**
     * @param {?} result
     * @return {?}
     */
    NgbTypeahead.prototype._selectResult = /**
     * @param {?} result
     * @return {?}
     */
    function (result) {
        /** @type {?} */
        var defaultPrevented = false;
        this.selectItem.emit({ item: result, preventDefault: function () { defaultPrevented = true; } });
        this._resubscribeTypeahead.next(null);
        if (!defaultPrevented) {
            this.writeValue(result);
            this._onChange(result);
        }
    };
    /**
     * @param {?} result
     * @return {?}
     */
    NgbTypeahead.prototype._selectResultClosePopup = /**
     * @param {?} result
     * @return {?}
     */
    function (result) {
        this._selectResult(result);
        this._closePopup();
    };
    /**
     * @return {?}
     */
    NgbTypeahead.prototype._showHint = /**
     * @return {?}
     */
    function () {
        if (this.showHint && this._windowRef.instance.hasActive() && this._inputValueBackup != null) {
            /** @type {?} */
            var userInputLowerCase = this._inputValueBackup.toLowerCase();
            /** @type {?} */
            var formattedVal = this._formatItemForInput(this._windowRef.instance.getActive());
            if (userInputLowerCase === formattedVal.substr(0, this._inputValueBackup.length).toLowerCase()) {
                this._writeInputValue(this._inputValueBackup + formattedVal.substr(this._inputValueBackup.length));
                this._elementRef.nativeElement['setSelectionRange'].apply(this._elementRef.nativeElement, [this._inputValueBackup.length, formattedVal.length]);
            }
            else {
                this._writeInputValue(formattedVal);
            }
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    NgbTypeahead.prototype._formatItemForInput = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item != null && this.inputFormatter ? this.inputFormatter(item) : toString(item);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbTypeahead.prototype._writeInputValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', toString(value));
    };
    /**
     * @param {?} userInput$
     * @return {?}
     */
    NgbTypeahead.prototype._subscribeToUserInput = /**
     * @param {?} userInput$
     * @return {?}
     */
    function (userInput$) {
        var _this = this;
        return userInput$.subscribe(function (results) {
            if (!results || results.length === 0) {
                _this._closePopup();
            }
            else {
                _this._openPopup();
                _this._windowRef.instance.focusFirst = _this.focusFirst;
                _this._windowRef.instance.results = results;
                _this._windowRef.instance.term = _this._elementRef.nativeElement.value;
                if (_this.resultFormatter) {
                    _this._windowRef.instance.formatter = _this.resultFormatter;
                }
                if (_this.resultTemplate) {
                    _this._windowRef.instance.resultTemplate = _this.resultTemplate;
                }
                _this._windowRef.instance.resetActive();
                // The observable stream we are subscribing to might have async steps
                // and if a component containing typeahead is using the OnPush strategy
                // the change detection turn wouldn't be invoked automatically.
                _this._windowRef.changeDetectorRef.detectChanges();
                _this._showHint();
            }
            // live announcer
            /** @type {?} */
            var count = results ? results.length : 0;
            _this._live.say(count === 0 ? 'No results available' : count + " result" + (count === 1 ? '' : 's') + " available");
        });
    };
    /**
     * @return {?}
     */
    NgbTypeahead.prototype._unsubscribeFromUserInput = /**
     * @return {?}
     */
    function () {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._subscription = null;
    };
    NgbTypeahead.decorators = [
        { type: Directive, args: [{
                    selector: 'input[ngbTypeahead]',
                    exportAs: 'ngbTypeahead',
                    host: {
                        '(blur)': 'handleBlur()',
                        '[class.open]': 'isPopupOpen()',
                        '(keydown)': 'handleKeyDown($event)',
                        '[autocomplete]': 'autocomplete',
                        'autocapitalize': 'off',
                        'autocorrect': 'off',
                        'role': 'combobox',
                        'aria-multiline': 'false',
                        '[attr.aria-autocomplete]': 'showHint ? "both" : "list"',
                        '[attr.aria-activedescendant]': 'activeDescendant',
                        '[attr.aria-owns]': 'isPopupOpen() ? popupId : null',
                        '[attr.aria-expanded]': 'isPopupOpen()'
                    },
                    providers: [NGB_TYPEAHEAD_VALUE_ACCESSOR]
                },] }
    ];
    /** @nocollapse */
    NgbTypeahead.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: Renderer2 },
        { type: Injector },
        { type: ComponentFactoryResolver },
        { type: NgbTypeaheadConfig },
        { type: NgZone },
        { type: Live },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: NgZone },
        { type: ChangeDetectorRef }
    ]; };
    NgbTypeahead.propDecorators = {
        autocomplete: [{ type: Input }],
        container: [{ type: Input }],
        editable: [{ type: Input }],
        focusFirst: [{ type: Input }],
        inputFormatter: [{ type: Input }],
        ngbTypeahead: [{ type: Input }],
        resultFormatter: [{ type: Input }],
        resultTemplate: [{ type: Input }],
        showHint: [{ type: Input }],
        placement: [{ type: Input }],
        selectItem: [{ type: Output }]
    };
    return NgbTypeahead;
}());
export { NgbTypeahead };
if (false) {
    /** @type {?} */
    NgbTypeahead.prototype._popupService;
    /** @type {?} */
    NgbTypeahead.prototype._subscription;
    /** @type {?} */
    NgbTypeahead.prototype._closed$;
    /** @type {?} */
    NgbTypeahead.prototype._inputValueBackup;
    /** @type {?} */
    NgbTypeahead.prototype._valueChanges;
    /** @type {?} */
    NgbTypeahead.prototype._resubscribeTypeahead;
    /** @type {?} */
    NgbTypeahead.prototype._windowRef;
    /** @type {?} */
    NgbTypeahead.prototype._zoneSubscription;
    /**
     * Value for the configurable autocomplete attribute.
     * Defaults to 'off' to disable the native browser autocomplete, but this standard value does not seem
     * to be always correctly taken into account.
     *
     * \@since 2.1.0
     * @type {?}
     */
    NgbTypeahead.prototype.autocomplete;
    /**
     * A selector specifying the element the tooltip should be appended to.
     * Currently only supports "body".
     * @type {?}
     */
    NgbTypeahead.prototype.container;
    /**
     * A flag indicating if model values should be restricted to the ones selected from the popup only.
     * @type {?}
     */
    NgbTypeahead.prototype.editable;
    /**
     * A flag indicating if the first match should automatically be focused as you type.
     * @type {?}
     */
    NgbTypeahead.prototype.focusFirst;
    /**
     * A function to convert a given value into string to display in the input field
     * @type {?}
     */
    NgbTypeahead.prototype.inputFormatter;
    /**
     * A function to transform the provided observable text into the array of results.  Note that the "this" argument
     * is undefined so you need to explicitly bind it to a desired "this" target.
     * @type {?}
     */
    NgbTypeahead.prototype.ngbTypeahead;
    /**
     * A function to format a given result before display. This function should return a formatted string without any
     * HTML markup
     * @type {?}
     */
    NgbTypeahead.prototype.resultFormatter;
    /**
     * A template to override a matching result default display
     * @type {?}
     */
    NgbTypeahead.prototype.resultTemplate;
    /**
     * Show hint when an option in the result list matches.
     * @type {?}
     */
    NgbTypeahead.prototype.showHint;
    /**
     * Placement of a typeahead accepts:
     *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
     *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
     *  array or a space separated string of above values
     * @type {?}
     */
    NgbTypeahead.prototype.placement;
    /**
     * An event emitted when a match is selected. Event payload is of type NgbTypeaheadSelectItemEvent.
     * @type {?}
     */
    NgbTypeahead.prototype.selectItem;
    /** @type {?} */
    NgbTypeahead.prototype.activeDescendant;
    /** @type {?} */
    NgbTypeahead.prototype.popupId;
    /** @type {?} */
    NgbTypeahead.prototype._onTouched;
    /** @type {?} */
    NgbTypeahead.prototype._onChange;
    /** @type {?} */
    NgbTypeahead.prototype._elementRef;
    /** @type {?} */
    NgbTypeahead.prototype._viewContainerRef;
    /** @type {?} */
    NgbTypeahead.prototype._renderer;
    /** @type {?} */
    NgbTypeahead.prototype._injector;
    /** @type {?} */
    NgbTypeahead.prototype._live;
    /** @type {?} */
    NgbTypeahead.prototype._document;
    /** @type {?} */
    NgbTypeahead.prototype._ngZone;
    /** @type {?} */
    NgbTypeahead.prototype._changeDetector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0eXBlYWhlYWQvdHlwZWFoZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLHdCQUF3QixFQUV4QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLFFBQVEsRUFDUixLQUFLLEVBQ0wsTUFBTSxFQUdOLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFjLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUNuRixPQUFPLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDaEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDaEMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWlCLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDckUsT0FBTyxFQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFakQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFDLGtCQUFrQixFQUF3QixNQUFNLG9CQUFvQixDQUFDOztJQUd2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b0Q7O0lBQ3BELGtDQUFxRDs7SUFDckQseUNBQStCOzs7Ozs7Ozs7SUFTL0Isb0NBQThCOzs7Ozs7SUFNOUIsaUNBQTJCOzs7OztJQUszQixnQ0FBMkI7Ozs7O0lBSzNCLGtDQUE2Qjs7Ozs7SUFLN0Isc0NBQWdEOzs7Ozs7SUFNaEQsb0NBQXVFOzs7Ozs7SUFNdkUsdUNBQWlEOzs7OztJQUtqRCxzQ0FBNEQ7Ozs7O0lBSzVELGdDQUEyQjs7Ozs7Ozs7SUFPM0IsaUNBQW1EOzs7OztJQUtuRCxrQ0FBdUU7O0lBRXZFLHdDQUF5Qjs7SUFDekIsK0JBQTRDOztJQUU1QyxrQ0FBOEI7O0lBQzlCLGlDQUFtQzs7SUFHL0IsbUNBQWlEOztJQUFFLHlDQUEyQzs7SUFDOUYsaUNBQTRCOztJQUFFLGlDQUEyQjs7SUFDYiw2QkFBbUI7O0lBQUUsaUNBQXdDOztJQUN6RywrQkFBdUI7O0lBQUUsdUNBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIGZyb21FdmVudCwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwLCBzd2l0Y2hNYXAsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0xpdmV9IGZyb20gJy4uL3V0aWwvYWNjZXNzaWJpbGl0eS9saXZlJztcbmltcG9ydCB7bmdiQXV0b0Nsb3NlfSBmcm9tICcuLi91dGlsL2F1dG9jbG9zZSc7XG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xuaW1wb3J0IHtQb3B1cFNlcnZpY2V9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xuaW1wb3J0IHtQbGFjZW1lbnRBcnJheSwgcG9zaXRpb25FbGVtZW50c30gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XG5pbXBvcnQge2lzRGVmaW5lZCwgdG9TdHJpbmd9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5cbmltcG9ydCB7TmdiVHlwZWFoZWFkQ29uZmlnfSBmcm9tICcuL3R5cGVhaGVhZC1jb25maWcnO1xuaW1wb3J0IHtOZ2JUeXBlYWhlYWRXaW5kb3csIFJlc3VsdFRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi90eXBlYWhlYWQtd2luZG93JztcblxuXG5jb25zdCBOR0JfVFlQRUFIRUFEX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiVHlwZWFoZWFkKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qKlxuICogUGF5bG9hZCBvZiB0aGUgc2VsZWN0SXRlbSBldmVudC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnQge1xuICAvKipcbiAgICogQW4gaXRlbSBhYm91dCB0byBiZSBzZWxlY3RlZFxuICAgKi9cbiAgaXRlbTogYW55O1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IHdpbGwgcHJldmVudCBpdGVtIHNlbGVjdGlvbiBpZiBjYWxsZWRcbiAgICovXG4gIHByZXZlbnREZWZhdWx0OiAoKSA9PiB2b2lkO1xufVxuXG5sZXQgbmV4dFdpbmRvd0lkID0gMDtcblxuLyoqXG4gKiBOZ2JUeXBlYWhlYWQgZGlyZWN0aXZlIHByb3ZpZGVzIGEgc2ltcGxlIHdheSBvZiBjcmVhdGluZyBwb3dlcmZ1bCB0eXBlYWhlYWRzIGZyb20gYW55IHRleHQgaW5wdXRcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnaW5wdXRbbmdiVHlwZWFoZWFkXScsXG4gIGV4cG9ydEFzOiAnbmdiVHlwZWFoZWFkJyxcbiAgaG9zdDoge1xuICAgICcoYmx1ciknOiAnaGFuZGxlQmx1cigpJyxcbiAgICAnW2NsYXNzLm9wZW5dJzogJ2lzUG9wdXBPcGVuKCknLFxuICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5RG93bigkZXZlbnQpJyxcbiAgICAnW2F1dG9jb21wbGV0ZV0nOiAnYXV0b2NvbXBsZXRlJyxcbiAgICAnYXV0b2NhcGl0YWxpemUnOiAnb2ZmJyxcbiAgICAnYXV0b2NvcnJlY3QnOiAnb2ZmJyxcbiAgICAncm9sZSc6ICdjb21ib2JveCcsXG4gICAgJ2FyaWEtbXVsdGlsaW5lJzogJ2ZhbHNlJyxcbiAgICAnW2F0dHIuYXJpYS1hdXRvY29tcGxldGVdJzogJ3Nob3dIaW50ID8gXCJib3RoXCIgOiBcImxpc3RcIicsXG4gICAgJ1thdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF0nOiAnYWN0aXZlRGVzY2VuZGFudCcsXG4gICAgJ1thdHRyLmFyaWEtb3duc10nOiAnaXNQb3B1cE9wZW4oKSA/IHBvcHVwSWQgOiBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnaXNQb3B1cE9wZW4oKSdcbiAgfSxcbiAgcHJvdmlkZXJzOiBbTkdCX1RZUEVBSEVBRF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTmdiVHlwZWFoZWFkIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9wb3B1cFNlcnZpY2U6IFBvcHVwU2VydmljZTxOZ2JUeXBlYWhlYWRXaW5kb3c+O1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfY2xvc2VkJCA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgX2lucHV0VmFsdWVCYWNrdXA6IHN0cmluZztcbiAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VzOiBPYnNlcnZhYmxlPHN0cmluZz47XG4gIHByaXZhdGUgX3Jlc3Vic2NyaWJlVHlwZWFoZWFkOiBCZWhhdmlvclN1YmplY3Q8YW55PjtcbiAgcHJpdmF0ZSBfd2luZG93UmVmOiBDb21wb25lbnRSZWY8TmdiVHlwZWFoZWFkV2luZG93PjtcbiAgcHJpdmF0ZSBfem9uZVN1YnNjcmlwdGlvbjogYW55O1xuXG4gIC8qKlxuICAgKiBWYWx1ZSBmb3IgdGhlIGNvbmZpZ3VyYWJsZSBhdXRvY29tcGxldGUgYXR0cmlidXRlLlxuICAgKiBEZWZhdWx0cyB0byAnb2ZmJyB0byBkaXNhYmxlIHRoZSBuYXRpdmUgYnJvd3NlciBhdXRvY29tcGxldGUsIGJ1dCB0aGlzIHN0YW5kYXJkIHZhbHVlIGRvZXMgbm90IHNlZW1cbiAgICogdG8gYmUgYWx3YXlzIGNvcnJlY3RseSB0YWtlbiBpbnRvIGFjY291bnQuXG4gICAqXG4gICAqIEBzaW5jZSAyLjEuMFxuICAgKi9cbiAgQElucHV0KCkgYXV0b2NvbXBsZXRlID0gJ29mZic7XG5cbiAgLyoqXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgdG9vbHRpcCBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxuICAgKi9cbiAgQElucHV0KCkgY29udGFpbmVyOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIG1vZGVsIHZhbHVlcyBzaG91bGQgYmUgcmVzdHJpY3RlZCB0byB0aGUgb25lcyBzZWxlY3RlZCBmcm9tIHRoZSBwb3B1cCBvbmx5LlxuICAgKi9cbiAgQElucHV0KCkgZWRpdGFibGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBmaXJzdCBtYXRjaCBzaG91bGQgYXV0b21hdGljYWxseSBiZSBmb2N1c2VkIGFzIHlvdSB0eXBlLlxuICAgKi9cbiAgQElucHV0KCkgZm9jdXNGaXJzdDogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0byBjb252ZXJ0IGEgZ2l2ZW4gdmFsdWUgaW50byBzdHJpbmcgdG8gZGlzcGxheSBpbiB0aGUgaW5wdXQgZmllbGRcbiAgICovXG4gIEBJbnB1dCgpIGlucHV0Rm9ybWF0dGVyOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRvIHRyYW5zZm9ybSB0aGUgcHJvdmlkZWQgb2JzZXJ2YWJsZSB0ZXh0IGludG8gdGhlIGFycmF5IG9mIHJlc3VsdHMuICBOb3RlIHRoYXQgdGhlIFwidGhpc1wiIGFyZ3VtZW50XG4gICAqIGlzIHVuZGVmaW5lZCBzbyB5b3UgbmVlZCB0byBleHBsaWNpdGx5IGJpbmQgaXQgdG8gYSBkZXNpcmVkIFwidGhpc1wiIHRhcmdldC5cbiAgICovXG4gIEBJbnB1dCgpIG5nYlR5cGVhaGVhZDogKHRleHQ6IE9ic2VydmFibGU8c3RyaW5nPikgPT4gT2JzZXJ2YWJsZTxhbnlbXT47XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdG8gZm9ybWF0IGEgZ2l2ZW4gcmVzdWx0IGJlZm9yZSBkaXNwbGF5LiBUaGlzIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gYSBmb3JtYXR0ZWQgc3RyaW5nIHdpdGhvdXQgYW55XG4gICAqIEhUTUwgbWFya3VwXG4gICAqL1xuICBASW5wdXQoKSByZXN1bHRGb3JtYXR0ZXI6ICh2YWx1ZTogYW55KSA9PiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgdGVtcGxhdGUgdG8gb3ZlcnJpZGUgYSBtYXRjaGluZyByZXN1bHQgZGVmYXVsdCBkaXNwbGF5XG4gICAqL1xuICBASW5wdXQoKSByZXN1bHRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8UmVzdWx0VGVtcGxhdGVDb250ZXh0PjtcblxuICAvKipcbiAgICogU2hvdyBoaW50IHdoZW4gYW4gb3B0aW9uIGluIHRoZSByZXN1bHQgbGlzdCBtYXRjaGVzLlxuICAgKi9cbiAgQElucHV0KCkgc2hvd0hpbnQ6IGJvb2xlYW47XG5cbiAgLyoqIFBsYWNlbWVudCBvZiBhIHR5cGVhaGVhZCBhY2NlcHRzOlxuICAgKiAgICBcInRvcFwiLCBcInRvcC1sZWZ0XCIsIFwidG9wLXJpZ2h0XCIsIFwiYm90dG9tXCIsIFwiYm90dG9tLWxlZnRcIiwgXCJib3R0b20tcmlnaHRcIixcbiAgICogICAgXCJsZWZ0XCIsIFwibGVmdC10b3BcIiwgXCJsZWZ0LWJvdHRvbVwiLCBcInJpZ2h0XCIsIFwicmlnaHQtdG9wXCIsIFwicmlnaHQtYm90dG9tXCJcbiAgICogIGFycmF5IG9yIGEgc3BhY2Ugc2VwYXJhdGVkIHN0cmluZyBvZiBhYm92ZSB2YWx1ZXNcbiAgKi9cbiAgQElucHV0KCkgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9ICdib3R0b20tbGVmdCc7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiBhIG1hdGNoIGlzIHNlbGVjdGVkLiBFdmVudCBwYXlsb2FkIGlzIG9mIHR5cGUgTmdiVHlwZWFoZWFkU2VsZWN0SXRlbUV2ZW50LlxuICAgKi9cbiAgQE91dHB1dCgpIHNlbGVjdEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudD4oKTtcblxuICBhY3RpdmVEZXNjZW5kYW50OiBzdHJpbmc7XG4gIHBvcHVwSWQgPSBgbmdiLXR5cGVhaGVhZC0ke25leHRXaW5kb3dJZCsrfWA7XG5cbiAgcHJpdmF0ZSBfb25Ub3VjaGVkID0gKCkgPT4ge307XG4gIHByaXZhdGUgX29uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LCBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgIGNvbmZpZzogTmdiVHlwZWFoZWFkQ29uZmlnLCBuZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBfbGl2ZTogTGl2ZSwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcbiAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XG4gICAgdGhpcy5lZGl0YWJsZSA9IGNvbmZpZy5lZGl0YWJsZTtcbiAgICB0aGlzLmZvY3VzRmlyc3QgPSBjb25maWcuZm9jdXNGaXJzdDtcbiAgICB0aGlzLnNob3dIaW50ID0gY29uZmlnLnNob3dIaW50O1xuICAgIHRoaXMucGxhY2VtZW50ID0gY29uZmlnLnBsYWNlbWVudDtcblxuICAgIHRoaXMuX3ZhbHVlQ2hhbmdlcyA9IGZyb21FdmVudDxFdmVudD4oX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2lucHV0JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKCRldmVudCA9PiAoJGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSkpO1xuXG4gICAgdGhpcy5fcmVzdWJzY3JpYmVUeXBlYWhlYWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuXG4gICAgdGhpcy5fcG9wdXBTZXJ2aWNlID0gbmV3IFBvcHVwU2VydmljZTxOZ2JUeXBlYWhlYWRXaW5kb3c+KFxuICAgICAgICBOZ2JUeXBlYWhlYWRXaW5kb3csIF9pbmplY3RvciwgX3ZpZXdDb250YWluZXJSZWYsIF9yZW5kZXJlciwgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyKTtcblxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24gPSBuZ1pvbmUub25TdGFibGUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzUG9wdXBPcGVuKCkpIHtcbiAgICAgICAgcG9zaXRpb25FbGVtZW50cyhcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50LFxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPT09ICdib2R5Jyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBpbnB1dFZhbHVlcyQgPSB0aGlzLl92YWx1ZUNoYW5nZXMucGlwZSh0YXAodmFsdWUgPT4ge1xuICAgICAgdGhpcy5faW5wdXRWYWx1ZUJhY2t1cCA9IHRoaXMuc2hvd0hpbnQgPyB2YWx1ZSA6IG51bGw7XG4gICAgICBpZiAodGhpcy5lZGl0YWJsZSkge1xuICAgICAgICB0aGlzLl9vbkNoYW5nZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSkpO1xuICAgIGNvbnN0IHJlc3VsdHMkID0gaW5wdXRWYWx1ZXMkLnBpcGUodGhpcy5uZ2JUeXBlYWhlYWQpO1xuICAgIGNvbnN0IHByb2Nlc3NlZFJlc3VsdHMkID0gcmVzdWx0cyQucGlwZSh0YXAoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmVkaXRhYmxlKSB7XG4gICAgICAgIHRoaXMuX29uQ2hhbmdlKHVuZGVmaW5lZCk7XG4gICAgICB9XG4gICAgfSkpO1xuICAgIGNvbnN0IHVzZXJJbnB1dCQgPSB0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZC5waXBlKHN3aXRjaE1hcCgoKSA9PiBwcm9jZXNzZWRSZXN1bHRzJCkpO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMuX3N1YnNjcmliZVRvVXNlcklucHV0KHVzZXJJbnB1dCQpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fY2xvc2VQb3B1cCgpO1xuICAgIHRoaXMuX3Vuc3Vic2NyaWJlRnJvbVVzZXJJbnB1dCgpO1xuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5fb25DaGFuZ2UgPSBmbjsgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5fb25Ub3VjaGVkID0gZm47IH1cblxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fd3JpdGVJbnB1dFZhbHVlKHRoaXMuX2Zvcm1hdEl0ZW1Gb3JJbnB1dCh2YWx1ZSkpO1xuICAgIGlmICh0aGlzLnNob3dIaW50KSB7XG4gICAgICB0aGlzLl9pbnB1dFZhbHVlQmFja3VwID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCBpc0Rpc2FibGVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNtaXNzZXMgdHlwZWFoZWFkIHBvcHVwIHdpbmRvd1xuICAgKi9cbiAgZGlzbWlzc1BvcHVwKCkge1xuICAgIGlmICh0aGlzLmlzUG9wdXBPcGVuKCkpIHtcbiAgICAgIHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkLm5leHQobnVsbCk7XG4gICAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XG4gICAgICBpZiAodGhpcy5zaG93SGludCAmJiB0aGlzLl9pbnB1dFZhbHVlQmFja3VwICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3dyaXRlSW5wdXRWYWx1ZSh0aGlzLl9pbnB1dFZhbHVlQmFja3VwKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR5cGVhaGVhZCBwb3B1cCB3aW5kb3cgaXMgZGlzcGxheWVkXG4gICAqL1xuICBpc1BvcHVwT3BlbigpIHsgcmV0dXJuIHRoaXMuX3dpbmRvd1JlZiAhPSBudWxsOyB9XG5cbiAgaGFuZGxlQmx1cigpIHtcbiAgICB0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZC5uZXh0KG51bGwpO1xuICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICB9XG5cbiAgaGFuZGxlS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICghdGhpcy5pc1BvcHVwT3BlbigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgY2FzZSBLZXkuQXJyb3dEb3duOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UubmV4dCgpO1xuICAgICAgICB0aGlzLl9zaG93SGludCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkFycm93VXA6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5wcmV2KCk7XG4gICAgICAgIHRoaXMuX3Nob3dIaW50KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuRW50ZXI6XG4gICAgICBjYXNlIEtleS5UYWI6XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5nZXRBY3RpdmUoKTtcbiAgICAgICAgaWYgKGlzRGVmaW5lZChyZXN1bHQpKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB0aGlzLl9zZWxlY3RSZXN1bHQocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29wZW5Qb3B1cCgpIHtcbiAgICBpZiAoIXRoaXMuaXNQb3B1cE9wZW4oKSkge1xuICAgICAgdGhpcy5faW5wdXRWYWx1ZUJhY2t1cCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IHRoaXMuX3BvcHVwU2VydmljZS5vcGVuKCk7XG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuaWQgPSB0aGlzLnBvcHVwSWQ7XG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2Uuc2VsZWN0RXZlbnQuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4gdGhpcy5fc2VsZWN0UmVzdWx0Q2xvc2VQb3B1cChyZXN1bHQpKTtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5hY3RpdmVDaGFuZ2VFdmVudC5zdWJzY3JpYmUoKGFjdGl2ZUlkOiBzdHJpbmcpID0+IHRoaXMuYWN0aXZlRGVzY2VuZGFudCA9IGFjdGl2ZUlkKTtcblxuICAgICAgaWYgKHRoaXMuY29udGFpbmVyID09PSAnYm9keScpIHtcbiAgICAgICAgd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb250YWluZXIpLmFwcGVuZENoaWxkKHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgIG5nYkF1dG9DbG9zZShcbiAgICAgICAgICB0aGlzLl9uZ1pvbmUsIHRoaXMuX2RvY3VtZW50LCAnb3V0c2lkZScsICgpID0+IHRoaXMuZGlzbWlzc1BvcHVwKCksIHRoaXMuX2Nsb3NlZCQsXG4gICAgICAgICAgW3RoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnRdKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jbG9zZVBvcHVwKCkge1xuICAgIHRoaXMuX2Nsb3NlZCQubmV4dCgpO1xuICAgIHRoaXMuX3BvcHVwU2VydmljZS5jbG9zZSgpO1xuICAgIHRoaXMuX3dpbmRvd1JlZiA9IG51bGw7XG4gICAgdGhpcy5hY3RpdmVEZXNjZW5kYW50ID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VsZWN0UmVzdWx0KHJlc3VsdDogYW55KSB7XG4gICAgbGV0IGRlZmF1bHRQcmV2ZW50ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGVjdEl0ZW0uZW1pdCh7aXRlbTogcmVzdWx0LCBwcmV2ZW50RGVmYXVsdDogKCkgPT4geyBkZWZhdWx0UHJldmVudGVkID0gdHJ1ZTsgfX0pO1xuICAgIHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkLm5leHQobnVsbCk7XG5cbiAgICBpZiAoIWRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHRoaXMud3JpdGVWYWx1ZShyZXN1bHQpO1xuICAgICAgdGhpcy5fb25DaGFuZ2UocmVzdWx0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RSZXN1bHRDbG9zZVBvcHVwKHJlc3VsdDogYW55KSB7XG4gICAgdGhpcy5fc2VsZWN0UmVzdWx0KHJlc3VsdCk7XG4gICAgdGhpcy5fY2xvc2VQb3B1cCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2hvd0hpbnQoKSB7XG4gICAgaWYgKHRoaXMuc2hvd0hpbnQgJiYgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmhhc0FjdGl2ZSgpICYmIHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgIT0gbnVsbCkge1xuICAgICAgY29uc3QgdXNlcklucHV0TG93ZXJDYXNlID0gdGhpcy5faW5wdXRWYWx1ZUJhY2t1cC50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgZm9ybWF0dGVkVmFsID0gdGhpcy5fZm9ybWF0SXRlbUZvcklucHV0KHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5nZXRBY3RpdmUoKSk7XG5cbiAgICAgIGlmICh1c2VySW5wdXRMb3dlckNhc2UgPT09IGZvcm1hdHRlZFZhbC5zdWJzdHIoMCwgdGhpcy5faW5wdXRWYWx1ZUJhY2t1cC5sZW5ndGgpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgdGhpcy5fd3JpdGVJbnB1dFZhbHVlKHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgKyBmb3JtYXR0ZWRWYWwuc3Vic3RyKHRoaXMuX2lucHV0VmFsdWVCYWNrdXAubGVuZ3RoKSk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudFsnc2V0U2VsZWN0aW9uUmFuZ2UnXS5hcHBseShcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgW3RoaXMuX2lucHV0VmFsdWVCYWNrdXAubGVuZ3RoLCBmb3JtYXR0ZWRWYWwubGVuZ3RoXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl93cml0ZUlucHV0VmFsdWUoZm9ybWF0dGVkVmFsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9mb3JtYXRJdGVtRm9ySW5wdXQoaXRlbTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXRlbSAhPSBudWxsICYmIHRoaXMuaW5wdXRGb3JtYXR0ZXIgPyB0aGlzLmlucHV0Rm9ybWF0dGVyKGl0ZW0pIDogdG9TdHJpbmcoaXRlbSk7XG4gIH1cblxuICBwcml2YXRlIF93cml0ZUlucHV0VmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdG9TdHJpbmcodmFsdWUpKTtcbiAgfVxuXG4gIHByaXZhdGUgX3N1YnNjcmliZVRvVXNlcklucHV0KHVzZXJJbnB1dCQ6IE9ic2VydmFibGU8YW55W10+KTogU3Vic2NyaXB0aW9uIHtcbiAgICByZXR1cm4gdXNlcklucHV0JC5zdWJzY3JpYmUoKHJlc3VsdHMpID0+IHtcbiAgICAgIGlmICghcmVzdWx0cyB8fCByZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9vcGVuUG9wdXAoKTtcbiAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmZvY3VzRmlyc3QgPSB0aGlzLmZvY3VzRmlyc3Q7XG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5yZXN1bHRzID0gcmVzdWx0cztcbiAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnRlcm0gPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgIGlmICh0aGlzLnJlc3VsdEZvcm1hdHRlcikge1xuICAgICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5mb3JtYXR0ZXIgPSB0aGlzLnJlc3VsdEZvcm1hdHRlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yZXN1bHRUZW1wbGF0ZSkge1xuICAgICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5yZXN1bHRUZW1wbGF0ZSA9IHRoaXMucmVzdWx0VGVtcGxhdGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnJlc2V0QWN0aXZlKCk7XG5cbiAgICAgICAgLy8gVGhlIG9ic2VydmFibGUgc3RyZWFtIHdlIGFyZSBzdWJzY3JpYmluZyB0byBtaWdodCBoYXZlIGFzeW5jIHN0ZXBzXG4gICAgICAgIC8vIGFuZCBpZiBhIGNvbXBvbmVudCBjb250YWluaW5nIHR5cGVhaGVhZCBpcyB1c2luZyB0aGUgT25QdXNoIHN0cmF0ZWd5XG4gICAgICAgIC8vIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIHR1cm4gd291bGRuJ3QgYmUgaW52b2tlZCBhdXRvbWF0aWNhbGx5LlxuICAgICAgICB0aGlzLl93aW5kb3dSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgICAgIHRoaXMuX3Nob3dIaW50KCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGxpdmUgYW5ub3VuY2VyXG4gICAgICBjb25zdCBjb3VudCA9IHJlc3VsdHMgPyByZXN1bHRzLmxlbmd0aCA6IDA7XG4gICAgICB0aGlzLl9saXZlLnNheShjb3VudCA9PT0gMCA/ICdObyByZXN1bHRzIGF2YWlsYWJsZScgOiBgJHtjb3VudH0gcmVzdWx0JHtjb3VudCA9PT0gMSA/ICcnIDogJ3MnfSBhdmFpbGFibGVgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3Vuc3Vic2NyaWJlRnJvbVVzZXJJbnB1dCgpIHtcbiAgICBpZiAodGhpcy5fc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgfVxufVxuIl19