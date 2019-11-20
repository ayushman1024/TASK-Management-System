/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { regExpEscape, toString } from '../util/util';
/**
 * A component that can be used inside a custom result template in order to highlight the term inside the text of the
 * result
 */
var NgbHighlight = /** @class */ (function () {
    function NgbHighlight() {
        /**
         * The CSS class of the span elements wrapping the term inside the result
         */
        this.highlightClass = 'ngb-highlight';
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbHighlight.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var resultStr = toString(this.result);
        /** @type {?} */
        var resultLC = resultStr.toLowerCase();
        /** @type {?} */
        var termLC = toString(this.term).toLowerCase();
        /** @type {?} */
        var currentIdx = 0;
        if (termLC.length > 0) {
            this.parts = resultLC.split(new RegExp("(" + regExpEscape(termLC) + ")")).map(function (part) {
                /** @type {?} */
                var originalPart = resultStr.substr(currentIdx, part.length);
                currentIdx += part.length;
                return originalPart;
            });
        }
        else {
            this.parts = [resultStr];
        }
    };
    NgbHighlight.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-highlight',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "<ng-template ngFor [ngForOf]=\"parts\" let-part let-isOdd=\"odd\">" +
                        "<span *ngIf=\"isOdd; else even\" [class]=\"highlightClass\">{{part}}</span><ng-template #even>{{part}}</ng-template>" +
                        "</ng-template>",
                    styles: [".ngb-highlight{font-weight:700}"]
                }] }
    ];
    NgbHighlight.propDecorators = {
        highlightClass: [{ type: Input }],
        result: [{ type: Input }],
        term: [{ type: Input }]
    };
    return NgbHighlight;
}());
export { NgbHighlight };
if (false) {
    /** @type {?} */
    NgbHighlight.prototype.parts;
    /**
     * The CSS class of the span elements wrapping the term inside the result
     * @type {?}
     */
    NgbHighlight.prototype.highlightClass;
    /**
     * The result text to display. If the term is found inside this text, it's highlighted
     * @type {?}
     */
    NgbHighlight.prototype.result;
    /**
     * The searched term
     * @type {?}
     */
    NgbHighlight.prototype.term;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0eXBlYWhlYWQvaGlnaGxpZ2h0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBYSx1QkFBdUIsRUFBaUIsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUFDLFlBQVksRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7O0FBTXBEO0lBQUE7Ozs7UUFlVyxtQkFBYyxHQUFHLGVBQWUsQ0FBQztJQTRCNUMsQ0FBQzs7Ozs7SUFoQkMsa0NBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCOztZQUMxQixTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7O1lBQ2pDLFFBQVEsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFOztZQUNsQyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUU7O1lBQzVDLFVBQVUsR0FBRyxDQUFDO1FBRWxCLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE1BQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUk7O29CQUN0RSxZQUFZLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDOUQsVUFBVSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQzFCLE9BQU8sWUFBWSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMxQjtJQUNILENBQUM7O2dCQTFDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLG9FQUFnRTt3QkFDdEUsc0hBQWtIO3dCQUNsSCxnQkFBZ0I7O2lCQUVyQjs7O2lDQU9FLEtBQUs7eUJBS0wsS0FBSzt1QkFLTCxLQUFLOztJQWtCUixtQkFBQztDQUFBLEFBM0NELElBMkNDO1NBbENZLFlBQVk7OztJQUN2Qiw2QkFBZ0I7Ozs7O0lBS2hCLHNDQUEwQzs7Ozs7SUFLMUMsOEJBQXdCOzs7OztJQUt4Qiw0QkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFNpbXBsZUNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7cmVnRXhwRXNjYXBlLCB0b1N0cmluZ30gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuLyoqXG4gKiBBIGNvbXBvbmVudCB0aGF0IGNhbiBiZSB1c2VkIGluc2lkZSBhIGN1c3RvbSByZXN1bHQgdGVtcGxhdGUgaW4gb3JkZXIgdG8gaGlnaGxpZ2h0IHRoZSB0ZXJtIGluc2lkZSB0aGUgdGV4dCBvZiB0aGVcbiAqIHJlc3VsdFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItaGlnaGxpZ2h0JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgPG5nLXRlbXBsYXRlIG5nRm9yIFtuZ0Zvck9mXT1cInBhcnRzXCIgbGV0LXBhcnQgbGV0LWlzT2RkPVwib2RkXCI+YCArXG4gICAgICBgPHNwYW4gKm5nSWY9XCJpc09kZDsgZWxzZSBldmVuXCIgW2NsYXNzXT1cImhpZ2hsaWdodENsYXNzXCI+e3twYXJ0fX08L3NwYW4+PG5nLXRlbXBsYXRlICNldmVuPnt7cGFydH19PC9uZy10ZW1wbGF0ZT5gICtcbiAgICAgIGA8L25nLXRlbXBsYXRlPmAsICAvLyB0ZW1wbGF0ZSBuZWVkcyB0byBiZSBmb3JtYXR0ZWQgaW4gYSBjZXJ0YWluIHdheSBzbyB3ZSBkb24ndCBhZGQgZW1wdHkgdGV4dCBub2Rlc1xuICBzdHlsZVVybHM6IFsnLi9oaWdobGlnaHQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5nYkhpZ2hsaWdodCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIHBhcnRzOiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogVGhlIENTUyBjbGFzcyBvZiB0aGUgc3BhbiBlbGVtZW50cyB3cmFwcGluZyB0aGUgdGVybSBpbnNpZGUgdGhlIHJlc3VsdFxuICAgKi9cbiAgQElucHV0KCkgaGlnaGxpZ2h0Q2xhc3MgPSAnbmdiLWhpZ2hsaWdodCc7XG5cbiAgLyoqXG4gICAqIFRoZSByZXN1bHQgdGV4dCB0byBkaXNwbGF5LiBJZiB0aGUgdGVybSBpcyBmb3VuZCBpbnNpZGUgdGhpcyB0ZXh0LCBpdCdzIGhpZ2hsaWdodGVkXG4gICAqL1xuICBASW5wdXQoKSByZXN1bHQ6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHNlYXJjaGVkIHRlcm1cbiAgICovXG4gIEBJbnB1dCgpIHRlcm06IHN0cmluZztcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgY29uc3QgcmVzdWx0U3RyID0gdG9TdHJpbmcodGhpcy5yZXN1bHQpO1xuICAgIGNvbnN0IHJlc3VsdExDID0gcmVzdWx0U3RyLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgdGVybUxDID0gdG9TdHJpbmcodGhpcy50ZXJtKS50b0xvd2VyQ2FzZSgpO1xuICAgIGxldCBjdXJyZW50SWR4ID0gMDtcblxuICAgIGlmICh0ZXJtTEMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5wYXJ0cyA9IHJlc3VsdExDLnNwbGl0KG5ldyBSZWdFeHAoYCgke3JlZ0V4cEVzY2FwZSh0ZXJtTEMpfSlgKSkubWFwKChwYXJ0KSA9PiB7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsUGFydCA9IHJlc3VsdFN0ci5zdWJzdHIoY3VycmVudElkeCwgcGFydC5sZW5ndGgpO1xuICAgICAgICBjdXJyZW50SWR4ICs9IHBhcnQubGVuZ3RoO1xuICAgICAgICByZXR1cm4gb3JpZ2luYWxQYXJ0O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFydHMgPSBbcmVzdWx0U3RyXTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==