/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { fromEvent } from 'rxjs';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Key } from '../util/key';
/** @type {?} */
var FOCUSABLE_ELEMENTS_SELECTOR = [
    'a[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])',
    'textarea:not([disabled])', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'
].join(', ');
/**
 * Returns first and last focusable elements inside of a given element based on specific CSS selector
 * @param {?} element
 * @return {?}
 */
export function getFocusableBoundaryElements(element) {
    /** @type {?} */
    var list = Array.from((/** @type {?} */ (element.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR))))
        .filter(function (el) { return el.tabIndex !== -1; });
    return [list[0], list[list.length - 1]];
}
/**
 * Function that enforces browser focus to be trapped inside a DOM element.
 *
 * Works only for clicks inside the element and navigation with 'Tab', ignoring clicks outside of the element
 *
 * \@param element The element around which focus will be trapped inside
 * \@param stopFocusTrap$ The observable stream. When completed the focus trap will clean up listeners
 * and free internal resources
 * \@param refocusOnClick Put the focus back to the last focused element whenever a click occurs on element (default to
 * false)
 * @type {?}
 */
export var ngbFocusTrap = function (element, stopFocusTrap$, refocusOnClick) {
    if (refocusOnClick === void 0) { refocusOnClick = false; }
    // last focused element
    /** @type {?} */
    var lastFocusedElement$ = fromEvent(element, 'focusin').pipe(takeUntil(stopFocusTrap$), map(function (e) { return e.target; }));
    // 'tab' / 'shift+tab' stream
    fromEvent(element, 'keydown')
        .pipe(takeUntil(stopFocusTrap$), 
    // tslint:disable:deprecation
    filter(function (e) { return e.which === Key.Tab; }), 
    // tslint:enable:deprecation
    withLatestFrom(lastFocusedElement$))
        .subscribe(function (_a) {
        var _b = tslib_1.__read(_a, 2), tabEvent = _b[0], focusedElement = _b[1];
        var _c = tslib_1.__read(getFocusableBoundaryElements(element), 2), first = _c[0], last = _c[1];
        if ((focusedElement === first || focusedElement === element) && tabEvent.shiftKey) {
            last.focus();
            tabEvent.preventDefault();
        }
        if (focusedElement === last && !tabEvent.shiftKey) {
            first.focus();
            tabEvent.preventDefault();
        }
    });
    // inside click
    if (refocusOnClick) {
        fromEvent(element, 'click')
            .pipe(takeUntil(stopFocusTrap$), withLatestFrom(lastFocusedElement$), map(function (arr) { return (/** @type {?} */ (arr[1])); }))
            .subscribe(function (lastFocusedElement) { return lastFocusedElement.focus(); });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdHJhcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidXRpbC9mb2N1cy10cmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEUsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGFBQWEsQ0FBQzs7SUFHMUIsMkJBQTJCLEdBQUc7SUFDbEMsU0FBUyxFQUFFLHdCQUF3QixFQUFFLDRDQUE0QyxFQUFFLHdCQUF3QjtJQUMzRywwQkFBMEIsRUFBRSxtQkFBbUIsRUFBRSxpQ0FBaUM7Q0FDbkYsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7QUFLWixNQUFNLFVBQVUsNEJBQTRCLENBQUMsT0FBb0I7O1FBQ3pELElBQUksR0FDTixLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFBLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQywyQkFBMkIsQ0FBQyxFQUEyQixDQUFDO1NBQ3ZGLE1BQU0sQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLEVBQWxCLENBQWtCLENBQUM7SUFDekMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFDLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFhRCxNQUFNLEtBQU8sWUFBWSxHQUFHLFVBQUMsT0FBb0IsRUFBRSxjQUErQixFQUFFLGNBQXNCO0lBQXRCLCtCQUFBLEVBQUEsc0JBQXNCOzs7UUFFbEcsbUJBQW1CLEdBQ3JCLFNBQVMsQ0FBYSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsRUFBRSxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxFQUFSLENBQVEsQ0FBQyxDQUFDO0lBRWpHLDZCQUE2QjtJQUM3QixTQUFTLENBQWdCLE9BQU8sRUFBRSxTQUFTLENBQUM7U0FDdkMsSUFBSSxDQUNELFNBQVMsQ0FBQyxjQUFjLENBQUM7SUFDekIsNkJBQTZCO0lBQzdCLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLEdBQUcsRUFBbkIsQ0FBbUIsQ0FBQztJQUNoQyw0QkFBNEI7SUFDNUIsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDdkMsU0FBUyxDQUFDLFVBQUMsRUFBMEI7WUFBMUIsMEJBQTBCLEVBQXpCLGdCQUFRLEVBQUUsc0JBQWM7UUFDOUIsSUFBQSw2REFBcUQsRUFBcEQsYUFBSyxFQUFFLFlBQTZDO1FBRTFELElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxJQUFJLGNBQWMsS0FBSyxPQUFPLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQ2pGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMzQjtRQUVELElBQUksY0FBYyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDakQsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2QsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFUCxlQUFlO0lBQ2YsSUFBSSxjQUFjLEVBQUU7UUFDbEIsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7YUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsRUFBRSxjQUFjLENBQUMsbUJBQW1CLENBQUMsRUFBRSxHQUFHLENBQUMsVUFBQSxHQUFHLFdBQUksbUJBQUEsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFlLEdBQUEsQ0FBQyxDQUFDO2FBQ3ZHLFNBQVMsQ0FBQyxVQUFBLGtCQUFrQixJQUFJLE9BQUEsa0JBQWtCLENBQUMsS0FBSyxFQUFFLEVBQTFCLENBQTBCLENBQUMsQ0FBQztLQUNsRTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2Zyb21FdmVudCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwLCB0YWtlVW50aWwsIHdpdGhMYXRlc3RGcm9tfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7S2V5fSBmcm9tICcuLi91dGlsL2tleSc7XG5cblxuY29uc3QgRk9DVVNBQkxFX0VMRU1FTlRTX1NFTEVDVE9SID0gW1xuICAnYVtocmVmXScsICdidXR0b246bm90KFtkaXNhYmxlZF0pJywgJ2lucHV0Om5vdChbZGlzYWJsZWRdKTpub3QoW3R5cGU9XCJoaWRkZW5cIl0pJywgJ3NlbGVjdDpub3QoW2Rpc2FibGVkXSknLFxuICAndGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pJywgJ1tjb250ZW50ZWRpdGFibGVdJywgJ1t0YWJpbmRleF06bm90KFt0YWJpbmRleD1cIi0xXCJdKSdcbl0uam9pbignLCAnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGZpcnN0IGFuZCBsYXN0IGZvY3VzYWJsZSBlbGVtZW50cyBpbnNpZGUgb2YgYSBnaXZlbiBlbGVtZW50IGJhc2VkIG9uIHNwZWNpZmljIENTUyBzZWxlY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9jdXNhYmxlQm91bmRhcnlFbGVtZW50cyhlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50W10ge1xuICBjb25zdCBsaXN0OiBIVE1MRWxlbWVudFtdID1cbiAgICAgIEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKEZPQ1VTQUJMRV9FTEVNRU5UU19TRUxFQ1RPUikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4pXG4gICAgICAgICAgLmZpbHRlcihlbCA9PiBlbC50YWJJbmRleCAhPT0gLTEpO1xuICByZXR1cm4gW2xpc3RbMF0sIGxpc3RbbGlzdC5sZW5ndGggLSAxXV07XG59XG5cbi8qKlxuICogRnVuY3Rpb24gdGhhdCBlbmZvcmNlcyBicm93c2VyIGZvY3VzIHRvIGJlIHRyYXBwZWQgaW5zaWRlIGEgRE9NIGVsZW1lbnQuXG4gKlxuICogV29ya3Mgb25seSBmb3IgY2xpY2tzIGluc2lkZSB0aGUgZWxlbWVudCBhbmQgbmF2aWdhdGlvbiB3aXRoICdUYWInLCBpZ25vcmluZyBjbGlja3Mgb3V0c2lkZSBvZiB0aGUgZWxlbWVudFxuICpcbiAqIEBwYXJhbSBlbGVtZW50IFRoZSBlbGVtZW50IGFyb3VuZCB3aGljaCBmb2N1cyB3aWxsIGJlIHRyYXBwZWQgaW5zaWRlXG4gKiBAcGFyYW0gc3RvcEZvY3VzVHJhcCQgVGhlIG9ic2VydmFibGUgc3RyZWFtLiBXaGVuIGNvbXBsZXRlZCB0aGUgZm9jdXMgdHJhcCB3aWxsIGNsZWFuIHVwIGxpc3RlbmVyc1xuICogYW5kIGZyZWUgaW50ZXJuYWwgcmVzb3VyY2VzXG4gKiBAcGFyYW0gcmVmb2N1c09uQ2xpY2sgUHV0IHRoZSBmb2N1cyBiYWNrIHRvIHRoZSBsYXN0IGZvY3VzZWQgZWxlbWVudCB3aGVuZXZlciBhIGNsaWNrIG9jY3VycyBvbiBlbGVtZW50IChkZWZhdWx0IHRvXG4gKiBmYWxzZSlcbiAqL1xuZXhwb3J0IGNvbnN0IG5nYkZvY3VzVHJhcCA9IChlbGVtZW50OiBIVE1MRWxlbWVudCwgc3RvcEZvY3VzVHJhcCQ6IE9ic2VydmFibGU8YW55PiwgcmVmb2N1c09uQ2xpY2sgPSBmYWxzZSkgPT4ge1xuICAvLyBsYXN0IGZvY3VzZWQgZWxlbWVudFxuICBjb25zdCBsYXN0Rm9jdXNlZEVsZW1lbnQkID1cbiAgICAgIGZyb21FdmVudDxGb2N1c0V2ZW50PihlbGVtZW50LCAnZm9jdXNpbicpLnBpcGUodGFrZVVudGlsKHN0b3BGb2N1c1RyYXAkKSwgbWFwKGUgPT4gZS50YXJnZXQpKTtcblxuICAvLyAndGFiJyAvICdzaGlmdCt0YWInIHN0cmVhbVxuICBmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4oZWxlbWVudCwgJ2tleWRvd24nKVxuICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFrZVVudGlsKHN0b3BGb2N1c1RyYXAkKSxcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpkZXByZWNhdGlvblxuICAgICAgICAgIGZpbHRlcihlID0+IGUud2hpY2ggPT09IEtleS5UYWIpLFxuICAgICAgICAgIC8vIHRzbGludDplbmFibGU6ZGVwcmVjYXRpb25cbiAgICAgICAgICB3aXRoTGF0ZXN0RnJvbShsYXN0Rm9jdXNlZEVsZW1lbnQkKSlcbiAgICAgIC5zdWJzY3JpYmUoKFt0YWJFdmVudCwgZm9jdXNlZEVsZW1lbnRdKSA9PiB7XG4gICAgICAgIGNvbnN0W2ZpcnN0LCBsYXN0XSA9IGdldEZvY3VzYWJsZUJvdW5kYXJ5RWxlbWVudHMoZWxlbWVudCk7XG5cbiAgICAgICAgaWYgKChmb2N1c2VkRWxlbWVudCA9PT0gZmlyc3QgfHwgZm9jdXNlZEVsZW1lbnQgPT09IGVsZW1lbnQpICYmIHRhYkV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgbGFzdC5mb2N1cygpO1xuICAgICAgICAgIHRhYkV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9jdXNlZEVsZW1lbnQgPT09IGxhc3QgJiYgIXRhYkV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgZmlyc3QuZm9jdXMoKTtcbiAgICAgICAgICB0YWJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAvLyBpbnNpZGUgY2xpY2tcbiAgaWYgKHJlZm9jdXNPbkNsaWNrKSB7XG4gICAgZnJvbUV2ZW50KGVsZW1lbnQsICdjbGljaycpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbChzdG9wRm9jdXNUcmFwJCksIHdpdGhMYXRlc3RGcm9tKGxhc3RGb2N1c2VkRWxlbWVudCQpLCBtYXAoYXJyID0+IGFyclsxXSBhcyBIVE1MRWxlbWVudCkpXG4gICAgICAgIC5zdWJzY3JpYmUobGFzdEZvY3VzZWRFbGVtZW50ID0+IGxhc3RGb2N1c2VkRWxlbWVudC5mb2N1cygpKTtcbiAgfVxufTtcbiJdfQ==