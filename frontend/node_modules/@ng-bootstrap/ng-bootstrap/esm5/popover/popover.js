/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Directive, Input, Output, EventEmitter, ChangeDetectionStrategy, Inject, Injector, Renderer2, ElementRef, TemplateRef, ViewContainerRef, ComponentFactoryResolver, NgZone, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { listenToTriggers } from '../util/triggers';
import { ngbAutoClose } from '../util/autoclose';
import { positionElements } from '../util/positioning';
import { PopupService } from '../util/popup';
import { NgbPopoverConfig } from './popover-config';
/** @type {?} */
var nextId = 0;
var NgbPopoverWindow = /** @class */ (function () {
    function NgbPopoverWindow() {
    }
    /**
     * @return {?}
     */
    NgbPopoverWindow.prototype.isTitleTemplate = /**
     * @return {?}
     */
    function () { return this.title instanceof TemplateRef; };
    NgbPopoverWindow.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-popover-window',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: { '[class]': '"popover" + (popoverClass ? " " + popoverClass : "")', 'role': 'tooltip', '[id]': 'id' },
                    template: "\n    <div class=\"arrow\"></div>\n    <h3 class=\"popover-header\" *ngIf=\"title != null\">\n      <ng-template #simpleTitle>{{title}}</ng-template>\n      <ng-template [ngTemplateOutlet]=\"isTitleTemplate() ? title : simpleTitle\" [ngTemplateOutletContext]=\"context\"></ng-template>\n    </h3>\n    <div class=\"popover-body\"><ng-content></ng-content></div>",
                    styles: ["ngb-popover-window.bs-popover-bottom .arrow,ngb-popover-window.bs-popover-top .arrow{left:50%;margin-left:-.5rem}ngb-popover-window.bs-popover-bottom-left .arrow,ngb-popover-window.bs-popover-top-left .arrow{left:2em}ngb-popover-window.bs-popover-bottom-right .arrow,ngb-popover-window.bs-popover-top-right .arrow{left:auto;right:2em}ngb-popover-window.bs-popover-left .arrow,ngb-popover-window.bs-popover-right .arrow{top:50%;margin-top:-.5rem}ngb-popover-window.bs-popover-left-top .arrow,ngb-popover-window.bs-popover-right-top .arrow{top:.7em}ngb-popover-window.bs-popover-left-bottom .arrow,ngb-popover-window.bs-popover-right-bottom .arrow{top:auto;bottom:.7em}"]
                }] }
    ];
    NgbPopoverWindow.propDecorators = {
        title: [{ type: Input }],
        id: [{ type: Input }],
        popoverClass: [{ type: Input }],
        context: [{ type: Input }]
    };
    return NgbPopoverWindow;
}());
export { NgbPopoverWindow };
if (false) {
    /** @type {?} */
    NgbPopoverWindow.prototype.title;
    /** @type {?} */
    NgbPopoverWindow.prototype.id;
    /** @type {?} */
    NgbPopoverWindow.prototype.popoverClass;
    /** @type {?} */
    NgbPopoverWindow.prototype.context;
}
/**
 * A lightweight, extensible directive for fancy popover creation.
 */
var NgbPopover = /** @class */ (function () {
    function NgbPopover(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, config, _ngZone, _document, _changeDetector) {
        var _this = this;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._document = _document;
        this._changeDetector = _changeDetector;
        /**
         * Emits an event when the popover is shown
         */
        this.shown = new EventEmitter();
        /**
         * Emits an event when the popover is hidden
         */
        this.hidden = new EventEmitter();
        this._ngbPopoverWindowId = "ngb-popover-" + nextId++;
        this.autoClose = config.autoClose;
        this.placement = config.placement;
        this.triggers = config.triggers;
        this.container = config.container;
        this.disablePopover = config.disablePopover;
        this.popoverClass = config.popoverClass;
        this.openDelay = config.openDelay;
        this.closeDelay = config.closeDelay;
        this._popupService = new PopupService(NgbPopoverWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);
        this._zoneSubscription = _ngZone.onStable.subscribe(function () {
            if (_this._windowRef) {
                positionElements(_this._elementRef.nativeElement, _this._windowRef.location.nativeElement, _this.placement, _this.container === 'body', 'bs-popover');
            }
        });
    }
    /**
     * @return {?}
     */
    NgbPopover.prototype._isDisabled = /**
     * @return {?}
     */
    function () {
        if (this.disablePopover) {
            return true;
        }
        if (!this.ngbPopover && !this.popoverTitle) {
            return true;
        }
        return false;
    };
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of the popover.
     * The context is an optional value to be injected into the popover template when it is created.
     */
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of the popover.
     * The context is an optional value to be injected into the popover template when it is created.
     * @param {?=} context
     * @return {?}
     */
    NgbPopover.prototype.open = /**
     * Opens an element’s popover. This is considered a “manual” triggering of the popover.
     * The context is an optional value to be injected into the popover template when it is created.
     * @param {?=} context
     * @return {?}
     */
    function (context) {
        var _this = this;
        if (!this._windowRef && !this._isDisabled()) {
            this._windowRef = this._popupService.open(this.ngbPopover, context);
            this._windowRef.instance.title = this.popoverTitle;
            this._windowRef.instance.context = context;
            this._windowRef.instance.popoverClass = this.popoverClass;
            this._windowRef.instance.id = this._ngbPopoverWindowId;
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbPopoverWindowId);
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
     * Closes an element’s popover. This is considered a “manual” triggering of the popover.
     */
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of the popover.
     * @return {?}
     */
    NgbPopover.prototype.close = /**
     * Closes an element’s popover. This is considered a “manual” triggering of the popover.
     * @return {?}
     */
    function () {
        if (this._windowRef) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
            this._popupService.close();
            this._windowRef = null;
            this.hidden.emit();
            this._changeDetector.markForCheck();
        }
    };
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of the popover.
     */
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of the popover.
     * @return {?}
     */
    NgbPopover.prototype.toggle = /**
     * Toggles an element’s popover. This is considered a “manual” triggering of the popover.
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
     * Returns whether or not the popover is currently being shown
     */
    /**
     * Returns whether or not the popover is currently being shown
     * @return {?}
     */
    NgbPopover.prototype.isOpen = /**
     * Returns whether or not the popover is currently being shown
     * @return {?}
     */
    function () { return this._windowRef != null; };
    /**
     * @return {?}
     */
    NgbPopover.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._unregisterListenersFn = listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this), this.close.bind(this), +this.openDelay, +this.closeDelay);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbPopover.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // close popover if title and content become empty, or disablePopover set to true
        if ((changes['ngbPopover'] || changes['popoverTitle'] || changes['disablePopover']) && this._isDisabled()) {
            this.close();
        }
    };
    /**
     * @return {?}
     */
    NgbPopover.prototype.ngOnDestroy = /**
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
    NgbPopover.decorators = [
        { type: Directive, args: [{ selector: '[ngbPopover]', exportAs: 'ngbPopover' },] }
    ];
    /** @nocollapse */
    NgbPopover.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: Injector },
        { type: ComponentFactoryResolver },
        { type: ViewContainerRef },
        { type: NgbPopoverConfig },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: ChangeDetectorRef }
    ]; };
    NgbPopover.propDecorators = {
        autoClose: [{ type: Input }],
        ngbPopover: [{ type: Input }],
        popoverTitle: [{ type: Input }],
        placement: [{ type: Input }],
        triggers: [{ type: Input }],
        container: [{ type: Input }],
        disablePopover: [{ type: Input }],
        popoverClass: [{ type: Input }],
        openDelay: [{ type: Input }],
        closeDelay: [{ type: Input }],
        shown: [{ type: Output }],
        hidden: [{ type: Output }]
    };
    return NgbPopover;
}());
export { NgbPopover };
if (false) {
    /**
     * Indicates whether the popover should be closed on Escape key and inside/outside clicks.
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
    NgbPopover.prototype.autoClose;
    /**
     * Content to be displayed as popover. If title and content are empty, the popover won't open.
     * @type {?}
     */
    NgbPopover.prototype.ngbPopover;
    /**
     * Title of a popover. If title and content are empty, the popover won't open.
     * @type {?}
     */
    NgbPopover.prototype.popoverTitle;
    /**
     * Placement of a popover accepts:
     *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
     *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom",
     *  array or a space separated string of above values
     * @type {?}
     */
    NgbPopover.prototype.placement;
    /**
     * Specifies events that should trigger. Supports a space separated list of event names.
     * @type {?}
     */
    NgbPopover.prototype.triggers;
    /**
     * A selector specifying the element the popover should be appended to.
     * Currently only supports "body".
     * @type {?}
     */
    NgbPopover.prototype.container;
    /**
     * A flag indicating if a given popover is disabled and should not be displayed.
     *
     * \@since 1.1.0
     * @type {?}
     */
    NgbPopover.prototype.disablePopover;
    /**
     * An optional class applied to ngb-popover-window
     *
     * \@since 2.2.0
     * @type {?}
     */
    NgbPopover.prototype.popoverClass;
    /**
     * Opening delay in ms. Works only for non-manual opening triggers.
     *
     * \@since 4.1.0
     * @type {?}
     */
    NgbPopover.prototype.openDelay;
    /**
     * Closing delay in ms. Works only for non-manual closing triggers.
     *
     * \@since 4.1.0
     * @type {?}
     */
    NgbPopover.prototype.closeDelay;
    /**
     * Emits an event when the popover is shown
     * @type {?}
     */
    NgbPopover.prototype.shown;
    /**
     * Emits an event when the popover is hidden
     * @type {?}
     */
    NgbPopover.prototype.hidden;
    /** @type {?} */
    NgbPopover.prototype._ngbPopoverWindowId;
    /** @type {?} */
    NgbPopover.prototype._popupService;
    /** @type {?} */
    NgbPopover.prototype._windowRef;
    /** @type {?} */
    NgbPopover.prototype._unregisterListenersFn;
    /** @type {?} */
    NgbPopover.prototype._zoneSubscription;
    /** @type {?} */
    NgbPopover.prototype._elementRef;
    /** @type {?} */
    NgbPopover.prototype._renderer;
    /** @type {?} */
    NgbPopover.prototype._ngZone;
    /** @type {?} */
    NgbPopover.prototype._document;
    /** @type {?} */
    NgbPopover.prototype._changeDetector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsicG9wb3Zlci9wb3BvdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFJdkIsTUFBTSxFQUNOLFFBQVEsRUFDUixTQUFTLEVBRVQsVUFBVSxFQUNWLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsd0JBQXdCLEVBQ3hCLE1BQU0sRUFFTixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFDLGdCQUFnQixFQUFpQixNQUFNLHFCQUFxQixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7O0lBRTlDLE1BQU0sR0FBRyxDQUFDO0FBRWQ7SUFBQTtJQXFCQSxDQUFDOzs7O0lBREMsMENBQWU7OztJQUFmLGNBQW9CLE9BQU8sSUFBSSxDQUFDLEtBQUssWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDOztnQkFwQmhFLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLElBQUksRUFBRSxFQUFDLFNBQVMsRUFBRSxzREFBc0QsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1B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RDs7SUFDeEQsbUNBQXNEOztJQUN0RCxnQ0FBbUQ7O0lBQ25ELDRDQUErQjs7SUFDL0IsdUNBQStCOztJQVkzQixpQ0FBNEM7O0lBQUUsK0JBQTRCOztJQUUxRSw2QkFBdUI7O0lBQUUsK0JBQXdDOztJQUFFLHFDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgT25DaGFuZ2VzLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBSZW5kZXJlcjIsXG4gIENvbXBvbmVudFJlZixcbiAgRWxlbWVudFJlZixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgTmdab25lLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge2xpc3RlblRvVHJpZ2dlcnN9IGZyb20gJy4uL3V0aWwvdHJpZ2dlcnMnO1xuaW1wb3J0IHtuZ2JBdXRvQ2xvc2V9IGZyb20gJy4uL3V0aWwvYXV0b2Nsb3NlJztcbmltcG9ydCB7cG9zaXRpb25FbGVtZW50cywgUGxhY2VtZW50QXJyYXl9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xuaW1wb3J0IHtQb3B1cFNlcnZpY2V9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xuXG5pbXBvcnQge05nYlBvcG92ZXJDb25maWd9IGZyb20gJy4vcG9wb3Zlci1jb25maWcnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLXBvcG92ZXItd2luZG93JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHsnW2NsYXNzXSc6ICdcInBvcG92ZXJcIiArIChwb3BvdmVyQ2xhc3MgPyBcIiBcIiArIHBvcG92ZXJDbGFzcyA6IFwiXCIpJywgJ3JvbGUnOiAndG9vbHRpcCcsICdbaWRdJzogJ2lkJ30sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+XG4gICAgPGgzIGNsYXNzPVwicG9wb3Zlci1oZWFkZXJcIiAqbmdJZj1cInRpdGxlICE9IG51bGxcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjc2ltcGxlVGl0bGU+e3t0aXRsZX19PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJpc1RpdGxlVGVtcGxhdGUoKSA/IHRpdGxlIDogc2ltcGxlVGl0bGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiY29udGV4dFwiPjwvbmctdGVtcGxhdGU+XG4gICAgPC9oMz5cbiAgICA8ZGl2IGNsYXNzPVwicG9wb3Zlci1ib2R5XCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PmAsXG4gIHN0eWxlVXJsczogWycuL3BvcG92ZXIuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5nYlBvcG92ZXJXaW5kb3cge1xuICBASW5wdXQoKSB0aXRsZTogdW5kZWZpbmVkIHwgc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KCkgcG9wb3ZlckNsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbnRleHQ6IGFueTtcblxuICBpc1RpdGxlVGVtcGxhdGUoKSB7IHJldHVybiB0aGlzLnRpdGxlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWY7IH1cbn1cblxuLyoqXG4gKiBBIGxpZ2h0d2VpZ2h0LCBleHRlbnNpYmxlIGRpcmVjdGl2ZSBmb3IgZmFuY3kgcG9wb3ZlciBjcmVhdGlvbi5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdiUG9wb3Zlcl0nLCBleHBvcnRBczogJ25nYlBvcG92ZXInfSlcbmV4cG9ydCBjbGFzcyBOZ2JQb3BvdmVyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcG9wb3ZlciBzaG91bGQgYmUgY2xvc2VkIG9uIEVzY2FwZSBrZXkgYW5kIGluc2lkZS9vdXRzaWRlIGNsaWNrcy5cbiAgICpcbiAgICogLSB0cnVlIChkZWZhdWx0KTogY2xvc2VzIG9uIGJvdGggb3V0c2lkZSBhbmQgaW5zaWRlIGNsaWNrcyBhcyB3ZWxsIGFzIEVzY2FwZSBwcmVzc2VzXG4gICAqIC0gZmFsc2U6IGRpc2FibGVzIHRoZSBhdXRvQ2xvc2UgZmVhdHVyZSAoTkI6IHRyaWdnZXJzIHN0aWxsIGFwcGx5KVxuICAgKiAtICdpbnNpZGUnOiBjbG9zZXMgb24gaW5zaWRlIGNsaWNrcyBhcyB3ZWxsIGFzIEVzY2FwZSBwcmVzc2VzXG4gICAqIC0gJ291dHNpZGUnOiBjbG9zZXMgb24gb3V0c2lkZSBjbGlja3MgKHNvbWV0aW1lcyBhbHNvIGFjaGlldmFibGUgdGhyb3VnaCB0cmlnZ2VycylcbiAgICogYXMgd2VsbCBhcyBFc2NhcGUgcHJlc3Nlc1xuICAgKlxuICAgKiBAc2luY2UgMy4wLjBcbiAgICovXG4gIEBJbnB1dCgpIGF1dG9DbG9zZTogYm9vbGVhbiB8ICdpbnNpZGUnIHwgJ291dHNpZGUnO1xuICAvKipcbiAgICogQ29udGVudCB0byBiZSBkaXNwbGF5ZWQgYXMgcG9wb3Zlci4gSWYgdGl0bGUgYW5kIGNvbnRlbnQgYXJlIGVtcHR5LCB0aGUgcG9wb3ZlciB3b24ndCBvcGVuLlxuICAgKi9cbiAgQElucHV0KCkgbmdiUG9wb3Zlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcbiAgLyoqXG4gICAqIFRpdGxlIG9mIGEgcG9wb3Zlci4gSWYgdGl0bGUgYW5kIGNvbnRlbnQgYXJlIGVtcHR5LCB0aGUgcG9wb3ZlciB3b24ndCBvcGVuLlxuICAgKi9cbiAgQElucHV0KCkgcG9wb3ZlclRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuICAvKipcbiAgICAqIFBsYWNlbWVudCBvZiBhIHBvcG92ZXIgYWNjZXB0czpcbiAgICAqICAgIFwidG9wXCIsIFwidG9wLWxlZnRcIiwgXCJ0b3AtcmlnaHRcIiwgXCJib3R0b21cIiwgXCJib3R0b20tbGVmdFwiLCBcImJvdHRvbS1yaWdodFwiLFxuICAgICogICAgXCJsZWZ0XCIsIFwibGVmdC10b3BcIiwgXCJsZWZ0LWJvdHRvbVwiLCBcInJpZ2h0XCIsIFwicmlnaHQtdG9wXCIsIFwicmlnaHQtYm90dG9tXCIsXG4gICAgKiAgYXJyYXkgb3IgYSBzcGFjZSBzZXBhcmF0ZWQgc3RyaW5nIG9mIGFib3ZlIHZhbHVlc1xuICAgICovXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXk7XG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgZXZlbnRzIHRoYXQgc2hvdWxkIHRyaWdnZXIuIFN1cHBvcnRzIGEgc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgZXZlbnQgbmFtZXMuXG4gICAqL1xuICBASW5wdXQoKSB0cmlnZ2Vyczogc3RyaW5nO1xuICAvKipcbiAgICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSBwb3BvdmVyIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cbiAgICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgXCJib2R5XCIuXG4gICAqL1xuICBASW5wdXQoKSBjb250YWluZXI6IHN0cmluZztcbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIGEgZ2l2ZW4gcG9wb3ZlciBpcyBkaXNhYmxlZCBhbmQgc2hvdWxkIG5vdCBiZSBkaXNwbGF5ZWQuXG4gICAqXG4gICAqIEBzaW5jZSAxLjEuMFxuICAgKi9cbiAgQElucHV0KCkgZGlzYWJsZVBvcG92ZXI6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBjbGFzcyBhcHBsaWVkIHRvIG5nYi1wb3BvdmVyLXdpbmRvd1xuICAgKlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIEBJbnB1dCgpIHBvcG92ZXJDbGFzczogc3RyaW5nO1xuICAvKipcbiAgICogT3BlbmluZyBkZWxheSBpbiBtcy4gV29ya3Mgb25seSBmb3Igbm9uLW1hbnVhbCBvcGVuaW5nIHRyaWdnZXJzLlxuICAgKlxuICAgKiBAc2luY2UgNC4xLjBcbiAgICovXG4gIEBJbnB1dCgpIG9wZW5EZWxheTogbnVtYmVyO1xuICAvKipcbiAgICogQ2xvc2luZyBkZWxheSBpbiBtcy4gV29ya3Mgb25seSBmb3Igbm9uLW1hbnVhbCBjbG9zaW5nIHRyaWdnZXJzLlxuICAgKlxuICAgKiBAc2luY2UgNC4xLjBcbiAgICovXG4gIEBJbnB1dCgpIGNsb3NlRGVsYXk6IG51bWJlcjtcbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIHBvcG92ZXIgaXMgc2hvd25cbiAgICovXG4gIEBPdXRwdXQoKSBzaG93biA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIHBvcG92ZXIgaXMgaGlkZGVuXG4gICAqL1xuICBAT3V0cHV0KCkgaGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX25nYlBvcG92ZXJXaW5kb3dJZCA9IGBuZ2ItcG9wb3Zlci0ke25leHRJZCsrfWA7XG4gIHByaXZhdGUgX3BvcHVwU2VydmljZTogUG9wdXBTZXJ2aWNlPE5nYlBvcG92ZXJXaW5kb3c+O1xuICBwcml2YXRlIF93aW5kb3dSZWY6IENvbXBvbmVudFJlZjxOZ2JQb3BvdmVyV2luZG93PjtcbiAgcHJpdmF0ZSBfdW5yZWdpc3Rlckxpc3RlbmVyc0ZuO1xuICBwcml2YXRlIF96b25lU3Vic2NyaXB0aW9uOiBhbnk7XG4gIHByaXZhdGUgX2lzRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZVBvcG92ZXIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoIXRoaXMubmdiUG9wb3ZlciAmJiAhdGhpcy5wb3BvdmVyVGl0bGUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZiwgY29uZmlnOiBOZ2JQb3BvdmVyQ29uZmlnLFxuICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksIHByaXZhdGUgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuYXV0b0Nsb3NlID0gY29uZmlnLmF1dG9DbG9zZTtcbiAgICB0aGlzLnBsYWNlbWVudCA9IGNvbmZpZy5wbGFjZW1lbnQ7XG4gICAgdGhpcy50cmlnZ2VycyA9IGNvbmZpZy50cmlnZ2VycztcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XG4gICAgdGhpcy5kaXNhYmxlUG9wb3ZlciA9IGNvbmZpZy5kaXNhYmxlUG9wb3ZlcjtcbiAgICB0aGlzLnBvcG92ZXJDbGFzcyA9IGNvbmZpZy5wb3BvdmVyQ2xhc3M7XG4gICAgdGhpcy5vcGVuRGVsYXkgPSBjb25maWcub3BlbkRlbGF5O1xuICAgIHRoaXMuY2xvc2VEZWxheSA9IGNvbmZpZy5jbG9zZURlbGF5O1xuICAgIHRoaXMuX3BvcHVwU2VydmljZSA9IG5ldyBQb3B1cFNlcnZpY2U8TmdiUG9wb3ZlcldpbmRvdz4oXG4gICAgICAgIE5nYlBvcG92ZXJXaW5kb3csIGluamVjdG9yLCB2aWV3Q29udGFpbmVyUmVmLCBfcmVuZGVyZXIsIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcik7XG5cbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gX25nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3dpbmRvd1JlZikge1xuICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgdGhpcy5wbGFjZW1lbnQsXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknLCAnYnMtcG9wb3ZlcicpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIGFuIGVsZW1lbnTigJlzIHBvcG92ZXIuIFRoaXMgaXMgY29uc2lkZXJlZCBhIOKAnG1hbnVhbOKAnSB0cmlnZ2VyaW5nIG9mIHRoZSBwb3BvdmVyLlxuICAgKiBUaGUgY29udGV4dCBpcyBhbiBvcHRpb25hbCB2YWx1ZSB0byBiZSBpbmplY3RlZCBpbnRvIHRoZSBwb3BvdmVyIHRlbXBsYXRlIHdoZW4gaXQgaXMgY3JlYXRlZC5cbiAgICovXG4gIG9wZW4oY29udGV4dD86IGFueSkge1xuICAgIGlmICghdGhpcy5fd2luZG93UmVmICYmICF0aGlzLl9pc0Rpc2FibGVkKCkpIHtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IHRoaXMuX3BvcHVwU2VydmljZS5vcGVuKHRoaXMubmdiUG9wb3ZlciwgY29udGV4dCk7XG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UudGl0bGUgPSB0aGlzLnBvcG92ZXJUaXRsZTtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5wb3BvdmVyQ2xhc3MgPSB0aGlzLnBvcG92ZXJDbGFzcztcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5pZCA9IHRoaXMuX25nYlBvcG92ZXJXaW5kb3dJZDtcblxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FyaWEtZGVzY3JpYmVkYnknLCB0aGlzLl9uZ2JQb3BvdmVyV2luZG93SWQpO1xuXG4gICAgICBpZiAodGhpcy5jb250YWluZXIgPT09ICdib2R5Jykge1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29udGFpbmVyKS5hcHBlbmRDaGlsZCh0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGFwcGx5IHN0eWxpbmcgdG8gc2V0IGJhc2ljIGNzcy1jbGFzc2VzIG9uIHRhcmdldCBlbGVtZW50LCBiZWZvcmUgZ29pbmcgZm9yIHBvc2l0aW9uaW5nXG4gICAgICB0aGlzLl93aW5kb3dSZWYuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgIG5nYkF1dG9DbG9zZShcbiAgICAgICAgICB0aGlzLl9uZ1pvbmUsIHRoaXMuX2RvY3VtZW50LCB0aGlzLmF1dG9DbG9zZSwgKCkgPT4gdGhpcy5jbG9zZSgpLCB0aGlzLmhpZGRlbixcbiAgICAgICAgICBbdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnRdKTtcbiAgICAgIHRoaXMuc2hvd24uZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgYW4gZWxlbWVudOKAmXMgcG9wb3Zlci4gVGhpcyBpcyBjb25zaWRlcmVkIGEg4oCcbWFudWFs4oCdIHRyaWdnZXJpbmcgb2YgdGhlIHBvcG92ZXIuXG4gICAqL1xuICBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fd2luZG93UmVmKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYXJpYS1kZXNjcmliZWRieScpO1xuICAgICAgdGhpcy5fcG9wdXBTZXJ2aWNlLmNsb3NlKCk7XG4gICAgICB0aGlzLl93aW5kb3dSZWYgPSBudWxsO1xuICAgICAgdGhpcy5oaWRkZW4uZW1pdCgpO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgYW4gZWxlbWVudOKAmXMgcG9wb3Zlci4gVGhpcyBpcyBjb25zaWRlcmVkIGEg4oCcbWFudWFs4oCdIHRyaWdnZXJpbmcgb2YgdGhlIHBvcG92ZXIuXG4gICAqL1xuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3dpbmRvd1JlZikge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgcG9wb3ZlciBpcyBjdXJyZW50bHkgYmVpbmcgc2hvd25cbiAgICovXG4gIGlzT3BlbigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3dpbmRvd1JlZiAhPSBudWxsOyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fdW5yZWdpc3Rlckxpc3RlbmVyc0ZuID0gbGlzdGVuVG9UcmlnZ2VycyhcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIsIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy50cmlnZ2VycywgdGhpcy5pc09wZW4uYmluZCh0aGlzKSwgdGhpcy5vcGVuLmJpbmQodGhpcyksXG4gICAgICAgIHRoaXMuY2xvc2UuYmluZCh0aGlzKSwgK3RoaXMub3BlbkRlbGF5LCArdGhpcy5jbG9zZURlbGF5KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAvLyBjbG9zZSBwb3BvdmVyIGlmIHRpdGxlIGFuZCBjb250ZW50IGJlY29tZSBlbXB0eSwgb3IgZGlzYWJsZVBvcG92ZXIgc2V0IHRvIHRydWVcbiAgICBpZiAoKGNoYW5nZXNbJ25nYlBvcG92ZXInXSB8fCBjaGFuZ2VzWydwb3BvdmVyVGl0bGUnXSB8fCBjaGFuZ2VzWydkaXNhYmxlUG9wb3ZlciddKSAmJiB0aGlzLl9pc0Rpc2FibGVkKCkpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgLy8gVGhpcyBjaGVjayBpcyBuZWVkZWQgYXMgaXQgbWlnaHQgaGFwcGVuIHRoYXQgbmdPbkRlc3Ryb3kgaXMgY2FsbGVkIGJlZm9yZSBuZ09uSW5pdFxuICAgIC8vIHVuZGVyIGNlcnRhaW4gY29uZGl0aW9ucywgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9pc3N1ZXMvMjE5OVxuICAgIGlmICh0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4pIHtcbiAgICAgIHRoaXMuX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbigpO1xuICAgIH1cbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==