/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Directive, Input, Output, EventEmitter, ChangeDetectionStrategy, Inject, Injector, Renderer2, ElementRef, ViewContainerRef, ComponentFactoryResolver, NgZone, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { listenToTriggers } from '../util/triggers';
import { ngbAutoClose } from '../util/autoclose';
import { positionElements } from '../util/positioning';
import { PopupService } from '../util/popup';
import { NgbTooltipConfig } from './tooltip-config';
/** @type {?} */
var nextId = 0;
var NgbTooltipWindow = /** @class */ (function () {
    function NgbTooltipWindow() {
    }
    NgbTooltipWindow.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-tooltip-window',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: { '[class]': '"tooltip show" + (tooltipClass ? " " + tooltipClass : "")', 'role': 'tooltip', '[id]': 'id' },
                    template: "<div class=\"arrow\"></div><div class=\"tooltip-inner\"><ng-content></ng-content></div>",
                    styles: ["ngb-tooltip-window.bs-tooltip-bottom .arrow,ngb-tooltip-window.bs-tooltip-top .arrow{left:calc(50% - .4rem)}ngb-tooltip-window.bs-tooltip-bottom-left .arrow,ngb-tooltip-window.bs-tooltip-top-left .arrow{left:1em}ngb-tooltip-window.bs-tooltip-bottom-right .arrow,ngb-tooltip-window.bs-tooltip-top-right .arrow{left:auto;right:.8rem}ngb-tooltip-window.bs-tooltip-left .arrow,ngb-tooltip-window.bs-tooltip-right .arrow{top:calc(50% - .4rem)}ngb-tooltip-window.bs-tooltip-left-top .arrow,ngb-tooltip-window.bs-tooltip-right-top .arrow{top:.4rem}ngb-tooltip-window.bs-tooltip-left-bottom .arrow,ngb-tooltip-window.bs-tooltip-right-bottom .arrow{top:auto;bottom:.4rem}"]
                }] }
    ];
    NgbTooltipWindow.propDecorators = {
        id: [{ type: Input }],
        tooltipClass: [{ type: Input }]
    };
    return NgbTooltipWindow;
}());
export { NgbTooltipWindow };
if (false) {
    /** @type {?} */
    NgbTooltipWindow.prototype.id;
    /** @type {?} */
    NgbTooltipWindow.prototype.tooltipClass;
}
/**
 * A lightweight, extensible directive for fancy tooltip creation.
 */
var NgbTooltip = /** @class */ (function () {
    function NgbTooltip(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, config, _ngZone, _document, _changeDetector) {
        var _this = this;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._document = _document;
        this._changeDetector = _changeDetector;
        /**
         * Emits an event when the tooltip is shown
         */
        this.shown = new EventEmitter();
        /**
         * Emits an event when the tooltip is hidden
         */
        this.hidden = new EventEmitter();
        this._ngbTooltipWindowId = "ngb-tooltip-" + nextId++;
        this.autoClose = config.autoClose;
        this.placement = config.placement;
        this.triggers = config.triggers;
        this.container = config.container;
        this.disableTooltip = config.disableTooltip;
        this.tooltipClass = config.tooltipClass;
        this.openDelay = config.openDelay;
        this.closeDelay = config.closeDelay;
        this._popupService = new PopupService(NgbTooltipWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);
        this._zoneSubscription = _ngZone.onStable.subscribe(function () {
            if (_this._windowRef) {
                positionElements(_this._elementRef.nativeElement, _this._windowRef.location.nativeElement, _this.placement, _this.container === 'body', 'bs-tooltip');
            }
        });
    }
    Object.defineProperty(NgbTooltip.prototype, "ngbTooltip", {
        get: /**
         * @return {?}
         */
        function () { return this._ngbTooltip; },
        /**
         * Content to be displayed as tooltip. If falsy, the tooltip won't open.
         */
        set: /**
         * Content to be displayed as tooltip. If falsy, the tooltip won't open.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._ngbTooltip = value;
            if (!value && this._windowRef) {
                this.close();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * The context is an optional value to be injected into the tooltip template when it is created.
     */
    /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * The context is an optional value to be injected into the tooltip template when it is created.
     * @param {?=} context
     * @return {?}
     */
    NgbTooltip.prototype.open = /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * The context is an optional value to be injected into the tooltip template when it is created.
     * @param {?=} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        if (!this._windowRef && this._ngbTooltip && !this.disableTooltip) {
            this._windowRef = this._popupService.open(this._ngbTooltip, context);
            this._windowRef.instance.tooltipClass = this.tooltipClass;
            this._windowRef.instance.id = this._ngbTooltipWindowId;
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbTooltipWindowId);
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            // apply styling to set basic css-classes on target element, before going for positioning
            this._windowRef.changeDetectorRef.markForCheck();
            ngbAutoClose(this._ngZone, this._document, this.autoClose, function () { return _this.close(); }, this.hidden, [this._windowRef.location.nativeElement]);
            this.shown.emit();
        }
    };
    /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     */
    /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * @return {?}
     */
    NgbTooltip.prototype.close = /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * @return {?}
     */
    function () {
        if (this._windowRef != null) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
            this._popupService.close();
            this._windowRef = null;
            this.hidden.emit();
            this._changeDetector.markForCheck();
        }
    };
    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     */
    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * @return {?}
     */
    NgbTooltip.prototype.toggle = /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * @return {?}
     */
    function () {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * Returns whether or not the tooltip is currently being shown
     */
    /**
     * Returns whether or not the tooltip is currently being shown
     * @return {?}
     */
    NgbTooltip.prototype.isOpen = /**
     * Returns whether or not the tooltip is currently being shown
     * @return {?}
     */
    function () { return this._windowRef != null; };
    /**
     * @return {?}
     */
    NgbTooltip.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._unregisterListenersFn = listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this), this.close.bind(this), +this.openDelay, +this.closeDelay);
    };
    /**
     * @return {?}
     */
    NgbTooltip.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.close();
        // This check is needed as it might happen that ngOnDestroy is called before ngOnInit
        // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
        if (this._unregisterListenersFn) {
            this._unregisterListenersFn();
        }
        this._zoneSubscription.unsubscribe();
    };
    NgbTooltip.decorators = [
        { type: Directive, args: [{ selector: '[ngbTooltip]', exportAs: 'ngbTooltip' },] }
    ];
    /** @nocollapse */
    NgbTooltip.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: Injector },
        { type: ComponentFactoryResolver },
        { type: ViewContainerRef },
        { type: NgbTooltipConfig },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: ChangeDetectorRef }
    ]; };
    NgbTooltip.propDecorators = {
        autoClose: [{ type: Input }],
        placement: [{ type: Input }],
        triggers: [{ type: Input }],
        container: [{ type: Input }],
        disableTooltip: [{ type: Input }],
        tooltipClass: [{ type: Input }],
        openDelay: [{ type: Input }],
        closeDelay: [{ type: Input }],
        shown: [{ type: Output }],
        hidden: [{ type: Output }],
        ngbTooltip: [{ type: Input }]
    };
    return NgbTooltip;
}());
export { NgbTooltip };
if (false) {
    /**
     * Indicates whether the tooltip should be closed on Escape key and inside/outside clicks.
     *
     * - true (default): closes on both outside and inside clicks as well as Escape presses
     * - false: disables the autoClose feature (NB: triggers still apply)
     * - 'inside': closes on inside clicks as well as Escape presses
     * - 'outside': closes on outside clicks (sometimes also achievable through triggers)
     * as well as Escape presses
     *
     * \@since 3.0.0
     * @type {?}
     */
    NgbTooltip.prototype.autoClose;
    /**
     * Placement of a tooltip accepts:
     *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
     *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom",
     *  array or a space separated string of above values
     * @type {?}
     */
    NgbTooltip.prototype.placement;
    /**
     * Specifies events that should trigger. Supports a space separated list of event names.
     * @type {?}
     */
    NgbTooltip.prototype.triggers;
    /**
     * A selector specifying the element the tooltip should be appended to.
     * Currently only supports "body".
     * @type {?}
     */
    NgbTooltip.prototype.container;
    /**
     * A flag indicating if a given tooltip is disabled and should not be displayed.
     *
     * \@since 1.1.0
     * @type {?}
     */
    NgbTooltip.prototype.disableTooltip;
    /**
     * An optional class applied to ngb-tooltip-window
     *
     * \@since 3.2.0
     * @type {?}
     */
    NgbTooltip.prototype.tooltipClass;
    /**
     * Opening delay in ms. Works only for non-manual opening triggers.
     *
     * \@since 4.1.0
     * @type {?}
     */
    NgbTooltip.prototype.openDelay;
    /**
     * Closing delay in ms. Works only for non-manual closing triggers.
     *
     * \@since 4.1.0
     * @type {?}
     */
    NgbTooltip.prototype.closeDelay;
    /**
     * Emits an event when the tooltip is shown
     * @type {?}
     */
    NgbTooltip.prototype.shown;
    /**
     * Emits an event when the tooltip is hidden
     * @type {?}
     */
    NgbTooltip.prototype.hidden;
    /** @type {?} */
    NgbTooltip.prototype._ngbTooltip;
    /** @type {?} */
    NgbTooltip.prototype._ngbTooltipWindowId;
    /** @type {?} */
    NgbTooltip.prototype._popupService;
    /** @type {?} */
    NgbTooltip.prototype._windowRef;
    /** @type {?} */
    NgbTooltip.prototype._unregisterListenersFn;
    /** @type {?} */
    NgbTooltip.prototype._zoneSubscription;
    /** @type {?} */
    NgbTooltip.prototype._elementRef;
    /** @type {?} */
    NgbTooltip.prototype._renderer;
    /** @type {?} */
    NgbTooltip.prototype._ngZone;
    /** @type {?} */
    NgbTooltip.prototype._document;
    /** @type {?} */
    NgbTooltip.prototype._changeDetector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidG9vbHRpcC90b29sdGlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFHdkIsTUFBTSxFQUNOLFFBQVEsRUFDUixTQUFTLEVBRVQsVUFBVSxFQUVWLGdCQUFnQixFQUNoQix3QkFBd0IsRUFDeEIsTUFBTSxFQUNOLGlCQUFpQixFQUNqQixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQWlCLE1BQU0scUJBQXFCLENBQUM7QUFDckUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7SUFFOUMsTUFBTSxHQUFHLENBQUM7QUFFZDtJQUFBO0lBV0EsQ0FBQzs7Z0JBWEEsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsSUFBSSxFQUFFLEVBQUMsU0FBUyxFQUFFLDJEQUEyRCxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQztvQkFDL0csUUFBUSxFQUFFLHlGQUFxRjs7aUJBRWhHOzs7cUJBRUUsS0FBSzsrQkFDTCxLQUFLOztJQUNSLHVCQUFD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RHhCLGdCQUFnQjtnQkFhVixnQkFBZ0I7Z0JBWHRCLE1BQU07Z0RBd0d3QixNQUFNLFNBQUMsUUFBUTtnQkF0RzdDLGlCQUFpQjs7OzRCQTBDaEIsS0FBSzs0QkFPTCxLQUFLOzJCQUlMLEtBQUs7NEJBS0wsS0FBSztpQ0FNTCxLQUFLOytCQU1MLEtBQUs7NEJBTUwsS0FBSzs2QkFNTCxLQUFLO3dCQUlMLE1BQU07eUJBSU4sTUFBTTs2QkFvQ04sS0FBSzs7SUFpRlIsaUJBQUM7Q0FBQSxBQWxMRCxJQWtMQztTQWpMWSxVQUFVOzs7Ozs7Ozs7Ozs7OztJQVlyQiwrQkFBbUQ7Ozs7Ozs7O0lBT25ELCtCQUFtQzs7Ozs7SUFJbkMsOEJBQTBCOzs7Ozs7SUFLMUIsK0JBQTJCOzs7Ozs7O0lBTTNCLG9DQUFpQzs7Ozs7OztJQU1qQyxrQ0FBOEI7Ozs7Ozs7SUFNOUIsK0JBQTJCOzs7Ozs7O0lBTTNCLGdDQUE0Qjs7Ozs7SUFJNUIsMkJBQXFDOzs7OztJQUlyQyw0QkFBc0M7O0lBRXRDLGlDQUErQzs7SUFDL0MseUNBQXdEOztJQUN4RCxtQ0FBc0Q7O0lBQ3RELGdDQUFtRDs7SUFDbkQsNENBQStCOztJQUMvQix1Q0FBK0I7O0lBRzNCLGlDQUE0Qzs7SUFBRSwrQkFBNEI7O0lBRTFFLDZCQUF1Qjs7SUFBRSwrQkFBd0M7O0lBQUUscUNBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBSZW5kZXJlcjIsXG4gIENvbXBvbmVudFJlZixcbiAgRWxlbWVudFJlZixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgTmdab25lLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge2xpc3RlblRvVHJpZ2dlcnN9IGZyb20gJy4uL3V0aWwvdHJpZ2dlcnMnO1xuaW1wb3J0IHtuZ2JBdXRvQ2xvc2V9IGZyb20gJy4uL3V0aWwvYXV0b2Nsb3NlJztcbmltcG9ydCB7cG9zaXRpb25FbGVtZW50cywgUGxhY2VtZW50QXJyYXl9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xuaW1wb3J0IHtQb3B1cFNlcnZpY2V9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xuXG5pbXBvcnQge05nYlRvb2x0aXBDb25maWd9IGZyb20gJy4vdG9vbHRpcC1jb25maWcnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLXRvb2x0aXAtd2luZG93JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHsnW2NsYXNzXSc6ICdcInRvb2x0aXAgc2hvd1wiICsgKHRvb2x0aXBDbGFzcyA/IFwiIFwiICsgdG9vbHRpcENsYXNzIDogXCJcIiknLCAncm9sZSc6ICd0b29sdGlwJywgJ1tpZF0nOiAnaWQnfSxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiYXJyb3dcIj48L2Rpdj48ZGl2IGNsYXNzPVwidG9vbHRpcC1pbm5lclwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj5gLFxuICBzdHlsZVVybHM6IFsnLi90b29sdGlwLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JUb29sdGlwV2luZG93IHtcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KCkgdG9vbHRpcENsYXNzOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQSBsaWdodHdlaWdodCwgZXh0ZW5zaWJsZSBkaXJlY3RpdmUgZm9yIGZhbmN5IHRvb2x0aXAgY3JlYXRpb24uXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nYlRvb2x0aXBdJywgZXhwb3J0QXM6ICduZ2JUb29sdGlwJ30pXG5leHBvcnQgY2xhc3MgTmdiVG9vbHRpcCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSB0b29sdGlwIHNob3VsZCBiZSBjbG9zZWQgb24gRXNjYXBlIGtleSBhbmQgaW5zaWRlL291dHNpZGUgY2xpY2tzLlxuICAgKlxuICAgKiAtIHRydWUgKGRlZmF1bHQpOiBjbG9zZXMgb24gYm90aCBvdXRzaWRlIGFuZCBpbnNpZGUgY2xpY2tzIGFzIHdlbGwgYXMgRXNjYXBlIHByZXNzZXNcbiAgICogLSBmYWxzZTogZGlzYWJsZXMgdGhlIGF1dG9DbG9zZSBmZWF0dXJlIChOQjogdHJpZ2dlcnMgc3RpbGwgYXBwbHkpXG4gICAqIC0gJ2luc2lkZSc6IGNsb3NlcyBvbiBpbnNpZGUgY2xpY2tzIGFzIHdlbGwgYXMgRXNjYXBlIHByZXNzZXNcbiAgICogLSAnb3V0c2lkZSc6IGNsb3NlcyBvbiBvdXRzaWRlIGNsaWNrcyAoc29tZXRpbWVzIGFsc28gYWNoaWV2YWJsZSB0aHJvdWdoIHRyaWdnZXJzKVxuICAgKiBhcyB3ZWxsIGFzIEVzY2FwZSBwcmVzc2VzXG4gICAqXG4gICAqIEBzaW5jZSAzLjAuMFxuICAgKi9cbiAgQElucHV0KCkgYXV0b0Nsb3NlOiBib29sZWFuIHwgJ2luc2lkZScgfCAnb3V0c2lkZSc7XG4gIC8qKlxuICAgICogUGxhY2VtZW50IG9mIGEgdG9vbHRpcCBhY2NlcHRzOlxuICAgICogICAgXCJ0b3BcIiwgXCJ0b3AtbGVmdFwiLCBcInRvcC1yaWdodFwiLCBcImJvdHRvbVwiLCBcImJvdHRvbS1sZWZ0XCIsIFwiYm90dG9tLXJpZ2h0XCIsXG4gICAgKiAgICBcImxlZnRcIiwgXCJsZWZ0LXRvcFwiLCBcImxlZnQtYm90dG9tXCIsIFwicmlnaHRcIiwgXCJyaWdodC10b3BcIiwgXCJyaWdodC1ib3R0b21cIixcbiAgICAqICBhcnJheSBvciBhIHNwYWNlIHNlcGFyYXRlZCBzdHJpbmcgb2YgYWJvdmUgdmFsdWVzXG4gICAgKi9cbiAgQElucHV0KCkgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheTtcbiAgLyoqXG4gICAqIFNwZWNpZmllcyBldmVudHMgdGhhdCBzaG91bGQgdHJpZ2dlci4gU3VwcG9ydHMgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiBldmVudCBuYW1lcy5cbiAgICovXG4gIEBJbnB1dCgpIHRyaWdnZXJzOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxuICAgKiBDdXJyZW50bHkgb25seSBzdXBwb3J0cyBcImJvZHlcIi5cbiAgICovXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xuICAvKipcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgYSBnaXZlbiB0b29sdGlwIGlzIGRpc2FibGVkIGFuZCBzaG91bGQgbm90IGJlIGRpc3BsYXllZC5cbiAgICpcbiAgICogQHNpbmNlIDEuMS4wXG4gICAqL1xuICBASW5wdXQoKSBkaXNhYmxlVG9vbHRpcDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEFuIG9wdGlvbmFsIGNsYXNzIGFwcGxpZWQgdG8gbmdiLXRvb2x0aXAtd2luZG93XG4gICAqXG4gICAqIEBzaW5jZSAzLjIuMFxuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcENsYXNzOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBPcGVuaW5nIGRlbGF5IGluIG1zLiBXb3JrcyBvbmx5IGZvciBub24tbWFudWFsIG9wZW5pbmcgdHJpZ2dlcnMuXG4gICAqXG4gICAqIEBzaW5jZSA0LjEuMFxuICAgKi9cbiAgQElucHV0KCkgb3BlbkRlbGF5OiBudW1iZXI7XG4gIC8qKlxuICAgKiBDbG9zaW5nIGRlbGF5IGluIG1zLiBXb3JrcyBvbmx5IGZvciBub24tbWFudWFsIGNsb3NpbmcgdHJpZ2dlcnMuXG4gICAqXG4gICAqIEBzaW5jZSA0LjEuMFxuICAgKi9cbiAgQElucHV0KCkgY2xvc2VEZWxheTogbnVtYmVyO1xuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgdG9vbHRpcCBpcyBzaG93blxuICAgKi9cbiAgQE91dHB1dCgpIHNob3duID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgdG9vbHRpcCBpcyBoaWRkZW5cbiAgICovXG4gIEBPdXRwdXQoKSBoaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfbmdiVG9vbHRpcDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcbiAgcHJpdmF0ZSBfbmdiVG9vbHRpcFdpbmRvd0lkID0gYG5nYi10b29sdGlwLSR7bmV4dElkKyt9YDtcbiAgcHJpdmF0ZSBfcG9wdXBTZXJ2aWNlOiBQb3B1cFNlcnZpY2U8TmdiVG9vbHRpcFdpbmRvdz47XG4gIHByaXZhdGUgX3dpbmRvd1JlZjogQ29tcG9uZW50UmVmPE5nYlRvb2x0aXBXaW5kb3c+O1xuICBwcml2YXRlIF91bnJlZ2lzdGVyTGlzdGVuZXJzRm47XG4gIHByaXZhdGUgX3pvbmVTdWJzY3JpcHRpb246IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZiwgY29uZmlnOiBOZ2JUb29sdGlwQ29uZmlnLFxuICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksIHByaXZhdGUgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuYXV0b0Nsb3NlID0gY29uZmlnLmF1dG9DbG9zZTtcbiAgICB0aGlzLnBsYWNlbWVudCA9IGNvbmZpZy5wbGFjZW1lbnQ7XG4gICAgdGhpcy50cmlnZ2VycyA9IGNvbmZpZy50cmlnZ2VycztcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XG4gICAgdGhpcy5kaXNhYmxlVG9vbHRpcCA9IGNvbmZpZy5kaXNhYmxlVG9vbHRpcDtcbiAgICB0aGlzLnRvb2x0aXBDbGFzcyA9IGNvbmZpZy50b29sdGlwQ2xhc3M7XG4gICAgdGhpcy5vcGVuRGVsYXkgPSBjb25maWcub3BlbkRlbGF5O1xuICAgIHRoaXMuY2xvc2VEZWxheSA9IGNvbmZpZy5jbG9zZURlbGF5O1xuICAgIHRoaXMuX3BvcHVwU2VydmljZSA9IG5ldyBQb3B1cFNlcnZpY2U8TmdiVG9vbHRpcFdpbmRvdz4oXG4gICAgICAgIE5nYlRvb2x0aXBXaW5kb3csIGluamVjdG9yLCB2aWV3Q29udGFpbmVyUmVmLCBfcmVuZGVyZXIsIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcik7XG5cbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gX25nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3dpbmRvd1JlZikge1xuICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgdGhpcy5wbGFjZW1lbnQsXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknLCAnYnMtdG9vbHRpcCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnRlbnQgdG8gYmUgZGlzcGxheWVkIGFzIHRvb2x0aXAuIElmIGZhbHN5LCB0aGUgdG9vbHRpcCB3b24ndCBvcGVuLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IG5nYlRvb2x0aXAodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICB0aGlzLl9uZ2JUb29sdGlwID0gdmFsdWU7XG4gICAgaWYgKCF2YWx1ZSAmJiB0aGlzLl93aW5kb3dSZWYpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbmdiVG9vbHRpcCgpIHsgcmV0dXJuIHRoaXMuX25nYlRvb2x0aXA7IH1cblxuICAvKipcbiAgICogT3BlbnMgYW4gZWxlbWVudOKAmXMgdG9vbHRpcC4gVGhpcyBpcyBjb25zaWRlcmVkIGEg4oCcbWFudWFs4oCdIHRyaWdnZXJpbmcgb2YgdGhlIHRvb2x0aXAuXG4gICAqIFRoZSBjb250ZXh0IGlzIGFuIG9wdGlvbmFsIHZhbHVlIHRvIGJlIGluamVjdGVkIGludG8gdGhlIHRvb2x0aXAgdGVtcGxhdGUgd2hlbiBpdCBpcyBjcmVhdGVkLlxuICAgKi9cbiAgb3Blbihjb250ZXh0PzogYW55KSB7XG4gICAgaWYgKCF0aGlzLl93aW5kb3dSZWYgJiYgdGhpcy5fbmdiVG9vbHRpcCAmJiAhdGhpcy5kaXNhYmxlVG9vbHRpcCkge1xuICAgICAgdGhpcy5fd2luZG93UmVmID0gdGhpcy5fcG9wdXBTZXJ2aWNlLm9wZW4odGhpcy5fbmdiVG9vbHRpcCwgY29udGV4dCk7XG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UudG9vbHRpcENsYXNzID0gdGhpcy50b29sdGlwQ2xhc3M7XG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuaWQgPSB0aGlzLl9uZ2JUb29sdGlwV2luZG93SWQ7XG5cbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhcmlhLWRlc2NyaWJlZGJ5JywgdGhpcy5fbmdiVG9vbHRpcFdpbmRvd0lkKTtcblxuICAgICAgaWYgKHRoaXMuY29udGFpbmVyID09PSAnYm9keScpIHtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmNvbnRhaW5lcikuYXBwZW5kQ2hpbGQodGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICAvLyBhcHBseSBzdHlsaW5nIHRvIHNldCBiYXNpYyBjc3MtY2xhc3NlcyBvbiB0YXJnZXQgZWxlbWVudCwgYmVmb3JlIGdvaW5nIGZvciBwb3NpdGlvbmluZ1xuICAgICAgdGhpcy5fd2luZG93UmVmLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICBuZ2JBdXRvQ2xvc2UoXG4gICAgICAgICAgdGhpcy5fbmdab25lLCB0aGlzLl9kb2N1bWVudCwgdGhpcy5hdXRvQ2xvc2UsICgpID0+IHRoaXMuY2xvc2UoKSwgdGhpcy5oaWRkZW4sXG4gICAgICAgICAgW3RoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50XSk7XG5cbiAgICAgIHRoaXMuc2hvd24uZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgYW4gZWxlbWVudOKAmXMgdG9vbHRpcC4gVGhpcyBpcyBjb25zaWRlcmVkIGEg4oCcbWFudWFs4oCdIHRyaWdnZXJpbmcgb2YgdGhlIHRvb2x0aXAuXG4gICAqL1xuICBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fd2luZG93UmVmICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhcmlhLWRlc2NyaWJlZGJ5Jyk7XG4gICAgICB0aGlzLl9wb3B1cFNlcnZpY2UuY2xvc2UoKTtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IG51bGw7XG4gICAgICB0aGlzLmhpZGRlbi5lbWl0KCk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyBhbiBlbGVtZW504oCZcyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDigJxtYW51YWzigJ0gdHJpZ2dlcmluZyBvZiB0aGUgdG9vbHRpcC5cbiAgICovXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fd2luZG93UmVmKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB0b29sdGlwIGlzIGN1cnJlbnRseSBiZWluZyBzaG93blxuICAgKi9cbiAgaXNPcGVuKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fd2luZG93UmVmICE9IG51bGw7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4gPSBsaXN0ZW5Ub1RyaWdnZXJzKFxuICAgICAgICB0aGlzLl9yZW5kZXJlciwgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLnRyaWdnZXJzLCB0aGlzLmlzT3Blbi5iaW5kKHRoaXMpLCB0aGlzLm9wZW4uYmluZCh0aGlzKSxcbiAgICAgICAgdGhpcy5jbG9zZS5iaW5kKHRoaXMpLCArdGhpcy5vcGVuRGVsYXksICt0aGlzLmNsb3NlRGVsYXkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIC8vIFRoaXMgY2hlY2sgaXMgbmVlZGVkIGFzIGl0IG1pZ2h0IGhhcHBlbiB0aGF0IG5nT25EZXN0cm95IGlzIGNhbGxlZCBiZWZvcmUgbmdPbkluaXRcbiAgICAvLyB1bmRlciBjZXJ0YWluIGNvbmRpdGlvbnMsIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvaXNzdWVzLzIxOTlcbiAgICBpZiAodGhpcy5fdW5yZWdpc3Rlckxpc3RlbmVyc0ZuKSB7XG4gICAgICB0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4oKTtcbiAgICB9XG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=