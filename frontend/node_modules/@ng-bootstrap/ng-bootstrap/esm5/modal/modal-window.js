/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, Output } from '@angular/core';
import { getFocusableBoundaryElements } from '../util/focus-trap';
import { ModalDismissReasons } from './modal-dismiss-reasons';
var NgbModalWindow = /** @class */ (function () {
    function NgbModalWindow(_document, _elRef) {
        this._document = _document;
        this._elRef = _elRef;
        this.backdrop = true;
        this.keyboard = true;
        this.dismissEvent = new EventEmitter();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    NgbModalWindow.prototype.backdropClick = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.backdrop === true && this._elRef.nativeElement === $event.target) {
            this.dismiss(ModalDismissReasons.BACKDROP_CLICK);
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgbModalWindow.prototype.escKey = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.keyboard && !$event.defaultPrevented) {
            this.dismiss(ModalDismissReasons.ESC);
        }
    };
    /**
     * @param {?} reason
     * @return {?}
     */
    NgbModalWindow.prototype.dismiss = /**
     * @param {?} reason
     * @return {?}
     */
    function (reason) { this.dismissEvent.emit(reason); };
    /**
     * @return {?}
     */
    NgbModalWindow.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { this._elWithFocus = this._document.activeElement; };
    /**
     * @return {?}
     */
    NgbModalWindow.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (!this._elRef.nativeElement.contains(document.activeElement)) {
            /** @type {?} */
            var autoFocusable = (/** @type {?} */ (this._elRef.nativeElement.querySelector("[ngbAutofocus]")));
            /** @type {?} */
            var firstFocusable = getFocusableBoundaryElements(this._elRef.nativeElement)[0];
            /** @type {?} */
            var elementToFocus = autoFocusable || firstFocusable || this._elRef.nativeElement;
            elementToFocus.focus();
        }
    };
    /**
     * @return {?}
     */
    NgbModalWindow.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var body = this._document.body;
        /** @type {?} */
        var elWithFocus = this._elWithFocus;
        /** @type {?} */
        var elementToFocus;
        if (elWithFocus && elWithFocus['focus'] && body.contains(elWithFocus)) {
            elementToFocus = elWithFocus;
        }
        else {
            elementToFocus = body;
        }
        elementToFocus.focus();
        this._elWithFocus = null;
    };
    NgbModalWindow.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-modal-window',
                    host: {
                        '[class]': '"modal fade show d-block" + (windowClass ? " " + windowClass : "")',
                        'role': 'dialog',
                        'tabindex': '-1',
                        '(keyup.esc)': 'escKey($event)',
                        '(click)': 'backdropClick($event)',
                        '[attr.aria-modal]': 'true',
                        '[attr.aria-labelledby]': 'ariaLabelledBy',
                    },
                    template: "\n    <div [class]=\"'modal-dialog' + (size ? ' modal-' + size : '') + (centered ? ' modal-dialog-centered' : '')\" role=\"document\">\n        <div class=\"modal-content\"><ng-content></ng-content></div>\n    </div>\n    "
                }] }
    ];
    /** @nocollapse */
    NgbModalWindow.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: ElementRef }
    ]; };
    NgbModalWindow.propDecorators = {
        ariaLabelledBy: [{ type: Input }],
        backdrop: [{ type: Input }],
        centered: [{ type: Input }],
        keyboard: [{ type: Input }],
        size: [{ type: Input }],
        windowClass: [{ type: Input }],
        dismissEvent: [{ type: Output, args: ['dismiss',] }]
    };
    return NgbModalWindow;
}());
export { NgbModalWindow };
if (false) {
    /** @type {?} */
    NgbModalWindow.prototype._elWithFocus;
    /** @type {?} */
    NgbModalWindow.prototype.ariaLabelledBy;
    /** @type {?} */
    NgbModalWindow.prototype.backdrop;
    /** @type {?} */
    NgbModalWindow.prototype.centered;
    /** @type {?} */
    NgbModalWindow.prototype.keyboard;
    /** @type {?} */
    NgbModalWindow.prototype.size;
    /** @type {?} */
    NgbModalWindow.prototype.windowClass;
    /** @type {?} */
    NgbModalWindow.prototype.dismissEvent;
    /** @type {?} */
    NgbModalWindow.prototype._document;
    /** @type {?} */
    NgbModalWindow.prototype._elRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtd2luZG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC13aW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDaEUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFNUQ7SUE4QkUsd0JBQXNDLFNBQWMsRUFBVSxNQUErQjtRQUF2RCxjQUFTLEdBQVQsU0FBUyxDQUFLO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFScEYsYUFBUSxHQUFxQixJQUFJLENBQUM7UUFFbEMsYUFBUSxHQUFHLElBQUksQ0FBQztRQUlOLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUUyQyxDQUFDOzs7OztJQUVqRyxzQ0FBYTs7OztJQUFiLFVBQWMsTUFBTTtRQUNsQixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxLQUFLLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDekUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUNsRDtJQUNILENBQUM7Ozs7O0lBRUQsK0JBQU07Ozs7SUFBTixVQUFPLE1BQU07UUFDWCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7WUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7Ozs7O0lBRUQsZ0NBQU87Ozs7SUFBUCxVQUFRLE1BQU0sSUFBVSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFFekQsaUNBQVE7OztJQUFSLGNBQWEsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Ozs7SUFFaEUsd0NBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7O2dCQUN6RCxhQUFhLEdBQUcsbUJBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEVBQWU7O2dCQUN4RixjQUFjLEdBQUcsNEJBQTRCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUUzRSxjQUFjLEdBQUcsYUFBYSxJQUFJLGNBQWMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWE7WUFDbkYsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7OztJQUVELG9DQUFXOzs7SUFBWDs7WUFDUSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJOztZQUMxQixXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVk7O1lBRWpDLGNBQWM7UUFDbEIsSUFBSSxXQUFXLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDckUsY0FBYyxHQUFHLFdBQVcsQ0FBQztTQUM5QjthQUFNO1lBQ0wsY0FBYyxHQUFHLElBQUksQ0FBQztTQUN2QjtRQUNELGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDOztnQkF0RUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLElBQUksRUFBRTt3QkFDSixTQUFTLEVBQUUsb0VBQW9FO3dCQUMvRSxNQUFNLEVBQUUsUUFBUTt3QkFDaEIsVUFBVSxFQUFFLElBQUk7d0JBQ2hCLGFBQWEsRUFBRSxnQkFBZ0I7d0JBQy9CLFNBQVMsRUFBRSx1QkFBdUI7d0JBQ2xDLG1CQUFtQixFQUFFLE1BQU07d0JBQzNCLHdCQUF3QixFQUFFLGdCQUFnQjtxQkFDM0M7b0JBQ0QsUUFBUSxFQUFFLGdPQUlQO2lCQUNKOzs7O2dEQWNjLE1BQU0sU0FBQyxRQUFRO2dCQTFDNUIsVUFBVTs7O2lDQWlDVCxLQUFLOzJCQUNMLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLO3VCQUNMLEtBQUs7OEJBQ0wsS0FBSzsrQkFFTCxNQUFNLFNBQUMsU0FBUzs7SUEyQ25CLHFCQUFDO0NBQUEsQUF2RUQsSUF1RUM7U0F0RFksY0FBYzs7O0lBRXpCLHNDQUE4Qjs7SUFFOUIsd0NBQWdDOztJQUNoQyxrQ0FBMkM7O0lBQzNDLGtDQUEwQjs7SUFDMUIsa0NBQXlCOztJQUN6Qiw4QkFBc0I7O0lBQ3RCLHFDQUE2Qjs7SUFFN0Isc0NBQXFEOztJQUV6QyxtQ0FBd0M7O0lBQUUsZ0NBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge2dldEZvY3VzYWJsZUJvdW5kYXJ5RWxlbWVudHN9IGZyb20gJy4uL3V0aWwvZm9jdXMtdHJhcCc7XG5pbXBvcnQge01vZGFsRGlzbWlzc1JlYXNvbnN9IGZyb20gJy4vbW9kYWwtZGlzbWlzcy1yZWFzb25zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLW1vZGFsLXdpbmRvdycsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzXSc6ICdcIm1vZGFsIGZhZGUgc2hvdyBkLWJsb2NrXCIgKyAod2luZG93Q2xhc3MgPyBcIiBcIiArIHdpbmRvd0NsYXNzIDogXCJcIiknLFxuICAgICdyb2xlJzogJ2RpYWxvZycsXG4gICAgJ3RhYmluZGV4JzogJy0xJyxcbiAgICAnKGtleXVwLmVzYyknOiAnZXNjS2V5KCRldmVudCknLFxuICAgICcoY2xpY2spJzogJ2JhY2tkcm9wQ2xpY2soJGV2ZW50KScsXG4gICAgJ1thdHRyLmFyaWEtbW9kYWxdJzogJ3RydWUnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ2FyaWFMYWJlbGxlZEJ5JyxcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtjbGFzc109XCInbW9kYWwtZGlhbG9nJyArIChzaXplID8gJyBtb2RhbC0nICsgc2l6ZSA6ICcnKSArIChjZW50ZXJlZCA/ICcgbW9kYWwtZGlhbG9nLWNlbnRlcmVkJyA6ICcnKVwiIHJvbGU9XCJkb2N1bWVudFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsV2luZG93IGltcGxlbWVudHMgT25Jbml0LFxuICAgIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2VsV2l0aEZvY3VzOiBFbGVtZW50OyAgLy8gZWxlbWVudCB0aGF0IGlzIGZvY3VzZWQgcHJpb3IgdG8gbW9kYWwgb3BlbmluZ1xuXG4gIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJhY2tkcm9wOiBib29sZWFuIHwgc3RyaW5nID0gdHJ1ZTtcbiAgQElucHV0KCkgY2VudGVyZWQ6IHN0cmluZztcbiAgQElucHV0KCkga2V5Ym9hcmQgPSB0cnVlO1xuICBASW5wdXQoKSBzaXplOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHdpbmRvd0NsYXNzOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgnZGlzbWlzcycpIGRpc21pc3NFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LCBwcml2YXRlIF9lbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHt9XG5cbiAgYmFja2Ryb3BDbGljaygkZXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5iYWNrZHJvcCA9PT0gdHJ1ZSAmJiB0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50ID09PSAkZXZlbnQudGFyZ2V0KSB7XG4gICAgICB0aGlzLmRpc21pc3MoTW9kYWxEaXNtaXNzUmVhc29ucy5CQUNLRFJPUF9DTElDSyk7XG4gICAgfVxuICB9XG5cbiAgZXNjS2V5KCRldmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmtleWJvYXJkICYmICEkZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgdGhpcy5kaXNtaXNzKE1vZGFsRGlzbWlzc1JlYXNvbnMuRVNDKTtcbiAgICB9XG4gIH1cblxuICBkaXNtaXNzKHJlYXNvbik6IHZvaWQgeyB0aGlzLmRpc21pc3NFdmVudC5lbWl0KHJlYXNvbik7IH1cblxuICBuZ09uSW5pdCgpIHsgdGhpcy5fZWxXaXRoRm9jdXMgPSB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50OyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICghdGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgY29uc3QgYXV0b0ZvY3VzYWJsZSA9IHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihgW25nYkF1dG9mb2N1c11gKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgIGNvbnN0IGZpcnN0Rm9jdXNhYmxlID0gZ2V0Rm9jdXNhYmxlQm91bmRhcnlFbGVtZW50cyh0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50KVswXTtcblxuICAgICAgY29uc3QgZWxlbWVudFRvRm9jdXMgPSBhdXRvRm9jdXNhYmxlIHx8IGZpcnN0Rm9jdXNhYmxlIHx8IHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBlbGVtZW50VG9Gb2N1cy5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGNvbnN0IGJvZHkgPSB0aGlzLl9kb2N1bWVudC5ib2R5O1xuICAgIGNvbnN0IGVsV2l0aEZvY3VzID0gdGhpcy5fZWxXaXRoRm9jdXM7XG5cbiAgICBsZXQgZWxlbWVudFRvRm9jdXM7XG4gICAgaWYgKGVsV2l0aEZvY3VzICYmIGVsV2l0aEZvY3VzWydmb2N1cyddICYmIGJvZHkuY29udGFpbnMoZWxXaXRoRm9jdXMpKSB7XG4gICAgICBlbGVtZW50VG9Gb2N1cyA9IGVsV2l0aEZvY3VzO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50VG9Gb2N1cyA9IGJvZHk7XG4gICAgfVxuICAgIGVsZW1lbnRUb0ZvY3VzLmZvY3VzKCk7XG4gICAgdGhpcy5fZWxXaXRoRm9jdXMgPSBudWxsO1xuICB9XG59XG4iXX0=