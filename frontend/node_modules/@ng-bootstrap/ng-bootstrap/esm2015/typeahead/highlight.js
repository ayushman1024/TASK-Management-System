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
export class NgbHighlight {
    constructor() {
        /**
         * The CSS class of the span elements wrapping the term inside the result
         */
        this.highlightClass = 'ngb-highlight';
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const resultStr = toString(this.result);
        /** @type {?} */
        const resultLC = resultStr.toLowerCase();
        /** @type {?} */
        const termLC = toString(this.term).toLowerCase();
        /** @type {?} */
        let currentIdx = 0;
        if (termLC.length > 0) {
            this.parts = resultLC.split(new RegExp(`(${regExpEscape(termLC)})`)).map((part) => {
                /** @type {?} */
                const originalPart = resultStr.substr(currentIdx, part.length);
                currentIdx += part.length;
                return originalPart;
            });
        }
        else {
            this.parts = [resultStr];
        }
    }
}
NgbHighlight.decorators = [
    { type: Component, args: [{
                selector: 'ngb-highlight',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `<ng-template ngFor [ngForOf]="parts" let-part let-isOdd="odd">` +
                    `<span *ngIf="isOdd; else even" [class]="highlightClass">{{part}}</span><ng-template #even>{{part}}</ng-template>` +
                    `</ng-template>`,
                styles: [".ngb-highlight{font-weight:700}"]
            }] }
];
NgbHighlight.propDecorators = {
    highlightClass: [{ type: Input }],
    result: [{ type: Input }],
    term: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0eXBlYWhlYWQvaGlnaGxpZ2h0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBYSx1QkFBdUIsRUFBaUIsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUFDLFlBQVksRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7O0FBZXBELE1BQU0sT0FBTyxZQUFZO0lBVHpCOzs7O1FBZVcsbUJBQWMsR0FBRyxlQUFlLENBQUM7SUE0QjVDLENBQUM7Ozs7O0lBaEJDLFdBQVcsQ0FBQyxPQUFzQjs7Y0FDMUIsU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOztjQUNqQyxRQUFRLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRTs7Y0FDbEMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFOztZQUM1QyxVQUFVLEdBQUcsQ0FBQztRQUVsQixJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs7c0JBQzFFLFlBQVksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUM5RCxVQUFVLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDMUIsT0FBTyxZQUFZLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQzs7O1lBMUNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUUsZ0VBQWdFO29CQUN0RSxrSEFBa0g7b0JBQ2xILGdCQUFnQjs7YUFFckI7Ozs2QkFPRSxLQUFLO3FCQUtMLEtBQUs7bUJBS0wsS0FBSzs7OztJQWZOLDZCQUFnQjs7Ozs7SUFLaEIsc0NBQTBDOzs7OztJQUsxQyw4QkFBd0I7Ozs7O0lBS3hCLDRCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgU2ltcGxlQ2hhbmdlcywgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtyZWdFeHBFc2NhcGUsIHRvU3RyaW5nfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuXG4vKipcbiAqIEEgY29tcG9uZW50IHRoYXQgY2FuIGJlIHVzZWQgaW5zaWRlIGEgY3VzdG9tIHJlc3VsdCB0ZW1wbGF0ZSBpbiBvcmRlciB0byBoaWdobGlnaHQgdGhlIHRlcm0gaW5zaWRlIHRoZSB0ZXh0IG9mIHRoZVxuICogcmVzdWx0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1oaWdobGlnaHQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwicGFydHNcIiBsZXQtcGFydCBsZXQtaXNPZGQ9XCJvZGRcIj5gICtcbiAgICAgIGA8c3BhbiAqbmdJZj1cImlzT2RkOyBlbHNlIGV2ZW5cIiBbY2xhc3NdPVwiaGlnaGxpZ2h0Q2xhc3NcIj57e3BhcnR9fTwvc3Bhbj48bmctdGVtcGxhdGUgI2V2ZW4+e3twYXJ0fX08L25nLXRlbXBsYXRlPmAgK1xuICAgICAgYDwvbmctdGVtcGxhdGU+YCwgIC8vIHRlbXBsYXRlIG5lZWRzIHRvIGJlIGZvcm1hdHRlZCBpbiBhIGNlcnRhaW4gd2F5IHNvIHdlIGRvbid0IGFkZCBlbXB0eSB0ZXh0IG5vZGVzXG4gIHN0eWxlVXJsczogWycuL2hpZ2hsaWdodC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmdiSGlnaGxpZ2h0IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgcGFydHM6IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBUaGUgQ1NTIGNsYXNzIG9mIHRoZSBzcGFuIGVsZW1lbnRzIHdyYXBwaW5nIHRoZSB0ZXJtIGluc2lkZSB0aGUgcmVzdWx0XG4gICAqL1xuICBASW5wdXQoKSBoaWdobGlnaHRDbGFzcyA9ICduZ2ItaGlnaGxpZ2h0JztcblxuICAvKipcbiAgICogVGhlIHJlc3VsdCB0ZXh0IHRvIGRpc3BsYXkuIElmIHRoZSB0ZXJtIGlzIGZvdW5kIGluc2lkZSB0aGlzIHRleHQsIGl0J3MgaGlnaGxpZ2h0ZWRcbiAgICovXG4gIEBJbnB1dCgpIHJlc3VsdDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgc2VhcmNoZWQgdGVybVxuICAgKi9cbiAgQElucHV0KCkgdGVybTogc3RyaW5nO1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBjb25zdCByZXN1bHRTdHIgPSB0b1N0cmluZyh0aGlzLnJlc3VsdCk7XG4gICAgY29uc3QgcmVzdWx0TEMgPSByZXN1bHRTdHIudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCB0ZXJtTEMgPSB0b1N0cmluZyh0aGlzLnRlcm0pLnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IGN1cnJlbnRJZHggPSAwO1xuXG4gICAgaWYgKHRlcm1MQy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnBhcnRzID0gcmVzdWx0TEMuc3BsaXQobmV3IFJlZ0V4cChgKCR7cmVnRXhwRXNjYXBlKHRlcm1MQyl9KWApKS5tYXAoKHBhcnQpID0+IHtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxQYXJ0ID0gcmVzdWx0U3RyLnN1YnN0cihjdXJyZW50SWR4LCBwYXJ0Lmxlbmd0aCk7XG4gICAgICAgIGN1cnJlbnRJZHggKz0gcGFydC5sZW5ndGg7XG4gICAgICAgIHJldHVybiBvcmlnaW5hbFBhcnQ7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXJ0cyA9IFtyZXN1bHRTdHJdO1xuICAgIH1cbiAgfVxufVxuIl19