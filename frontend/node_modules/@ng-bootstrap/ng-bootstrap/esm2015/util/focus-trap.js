/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { fromEvent } from 'rxjs';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Key } from '../util/key';
/** @type {?} */
const FOCUSABLE_ELEMENTS_SELECTOR = [
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
    const list = Array.from((/** @type {?} */ (element.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR))))
        .filter(el => el.tabIndex !== -1);
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
export const ngbFocusTrap = (element, stopFocusTrap$, refocusOnClick = false) => {
    // last focused element
    /** @type {?} */
    const lastFocusedElement$ = fromEvent(element, 'focusin').pipe(takeUntil(stopFocusTrap$), map(e => e.target));
    // 'tab' / 'shift+tab' stream
    fromEvent(element, 'keydown')
        .pipe(takeUntil(stopFocusTrap$), 
    // tslint:disable:deprecation
    filter(e => e.which === Key.Tab), 
    // tslint:enable:deprecation
    withLatestFrom(lastFocusedElement$))
        .subscribe(([tabEvent, focusedElement]) => {
        const [first, last] = getFocusableBoundaryElements(element);
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
            .pipe(takeUntil(stopFocusTrap$), withLatestFrom(lastFocusedElement$), map(arr => (/** @type {?} */ (arr[1]))))
            .subscribe(lastFocusedElement => lastFocusedElement.focus());
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdHJhcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidXRpbC9mb2N1cy10cmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RSxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sYUFBYSxDQUFDOztNQUcxQiwyQkFBMkIsR0FBRztJQUNsQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsNENBQTRDLEVBQUUsd0JBQXdCO0lBQzNHLDBCQUEwQixFQUFFLG1CQUFtQixFQUFFLGlDQUFpQztDQUNuRixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztBQUtaLE1BQU0sVUFBVSw0QkFBNEIsQ0FBQyxPQUFvQjs7VUFDekQsSUFBSSxHQUNOLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQUEsT0FBTyxDQUFDLGdCQUFnQixDQUFDLDJCQUEyQixDQUFDLEVBQTJCLENBQUM7U0FDdkYsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQWFELE1BQU0sT0FBTyxZQUFZLEdBQUcsQ0FBQyxPQUFvQixFQUFFLGNBQStCLEVBQUUsY0FBYyxHQUFHLEtBQUssRUFBRSxFQUFFOzs7VUFFdEcsbUJBQW1CLEdBQ3JCLFNBQVMsQ0FBYSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFakcsNkJBQTZCO0lBQzdCLFNBQVMsQ0FBZ0IsT0FBTyxFQUFFLFNBQVMsQ0FBQztTQUN2QyxJQUFJLENBQ0QsU0FBUyxDQUFDLGNBQWMsQ0FBQztJQUN6Qiw2QkFBNkI7SUFDN0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDO0lBQ2hDLDRCQUE0QjtJQUM1QixjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUN2QyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsRUFBRSxFQUFFO2NBQ25DLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLDRCQUE0QixDQUFDLE9BQU8sQ0FBQztRQUUxRCxJQUFJLENBQUMsY0FBYyxLQUFLLEtBQUssSUFBSSxjQUFjLEtBQUssT0FBTyxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUNqRixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDM0I7UUFFRCxJQUFJLGNBQWMsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQ2pELEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNkLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRVAsZUFBZTtJQUNmLElBQUksY0FBYyxFQUFFO1FBQ2xCLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEVBQUUsY0FBYyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQUEsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFlLENBQUMsQ0FBQzthQUN2RyxTQUFTLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDbEU7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtmcm9tRXZlbnQsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgdGFrZVVudGlsLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xuXG5cbmNvbnN0IEZPQ1VTQUJMRV9FTEVNRU5UU19TRUxFQ1RPUiA9IFtcbiAgJ2FbaHJlZl0nLCAnYnV0dG9uOm5vdChbZGlzYWJsZWRdKScsICdpbnB1dDpub3QoW2Rpc2FibGVkXSk6bm90KFt0eXBlPVwiaGlkZGVuXCJdKScsICdzZWxlY3Q6bm90KFtkaXNhYmxlZF0pJyxcbiAgJ3RleHRhcmVhOm5vdChbZGlzYWJsZWRdKScsICdbY29udGVudGVkaXRhYmxlXScsICdbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXg9XCItMVwiXSknXG5dLmpvaW4oJywgJyk7XG5cbi8qKlxuICogUmV0dXJucyBmaXJzdCBhbmQgbGFzdCBmb2N1c2FibGUgZWxlbWVudHMgaW5zaWRlIG9mIGEgZ2l2ZW4gZWxlbWVudCBiYXNlZCBvbiBzcGVjaWZpYyBDU1Mgc2VsZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZvY3VzYWJsZUJvdW5kYXJ5RWxlbWVudHMoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudFtdIHtcbiAgY29uc3QgbGlzdDogSFRNTEVsZW1lbnRbXSA9XG4gICAgICBBcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChGT0NVU0FCTEVfRUxFTUVOVFNfU0VMRUNUT1IpIGFzIE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+KVxuICAgICAgICAgIC5maWx0ZXIoZWwgPT4gZWwudGFiSW5kZXggIT09IC0xKTtcbiAgcmV0dXJuIFtsaXN0WzBdLCBsaXN0W2xpc3QubGVuZ3RoIC0gMV1dO1xufVxuXG4vKipcbiAqIEZ1bmN0aW9uIHRoYXQgZW5mb3JjZXMgYnJvd3NlciBmb2N1cyB0byBiZSB0cmFwcGVkIGluc2lkZSBhIERPTSBlbGVtZW50LlxuICpcbiAqIFdvcmtzIG9ubHkgZm9yIGNsaWNrcyBpbnNpZGUgdGhlIGVsZW1lbnQgYW5kIG5hdmlnYXRpb24gd2l0aCAnVGFiJywgaWdub3JpbmcgY2xpY2tzIG91dHNpZGUgb2YgdGhlIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0gZWxlbWVudCBUaGUgZWxlbWVudCBhcm91bmQgd2hpY2ggZm9jdXMgd2lsbCBiZSB0cmFwcGVkIGluc2lkZVxuICogQHBhcmFtIHN0b3BGb2N1c1RyYXAkIFRoZSBvYnNlcnZhYmxlIHN0cmVhbS4gV2hlbiBjb21wbGV0ZWQgdGhlIGZvY3VzIHRyYXAgd2lsbCBjbGVhbiB1cCBsaXN0ZW5lcnNcbiAqIGFuZCBmcmVlIGludGVybmFsIHJlc291cmNlc1xuICogQHBhcmFtIHJlZm9jdXNPbkNsaWNrIFB1dCB0aGUgZm9jdXMgYmFjayB0byB0aGUgbGFzdCBmb2N1c2VkIGVsZW1lbnQgd2hlbmV2ZXIgYSBjbGljayBvY2N1cnMgb24gZWxlbWVudCAoZGVmYXVsdCB0b1xuICogZmFsc2UpXG4gKi9cbmV4cG9ydCBjb25zdCBuZ2JGb2N1c1RyYXAgPSAoZWxlbWVudDogSFRNTEVsZW1lbnQsIHN0b3BGb2N1c1RyYXAkOiBPYnNlcnZhYmxlPGFueT4sIHJlZm9jdXNPbkNsaWNrID0gZmFsc2UpID0+IHtcbiAgLy8gbGFzdCBmb2N1c2VkIGVsZW1lbnRcbiAgY29uc3QgbGFzdEZvY3VzZWRFbGVtZW50JCA9XG4gICAgICBmcm9tRXZlbnQ8Rm9jdXNFdmVudD4oZWxlbWVudCwgJ2ZvY3VzaW4nKS5waXBlKHRha2VVbnRpbChzdG9wRm9jdXNUcmFwJCksIG1hcChlID0+IGUudGFyZ2V0KSk7XG5cbiAgLy8gJ3RhYicgLyAnc2hpZnQrdGFiJyBzdHJlYW1cbiAgZnJvbUV2ZW50PEtleWJvYXJkRXZlbnQ+KGVsZW1lbnQsICdrZXlkb3duJylcbiAgICAgIC5waXBlKFxuICAgICAgICAgIHRha2VVbnRpbChzdG9wRm9jdXNUcmFwJCksXG4gICAgICAgICAgLy8gdHNsaW50OmRpc2FibGU6ZGVwcmVjYXRpb25cbiAgICAgICAgICBmaWx0ZXIoZSA9PiBlLndoaWNoID09PSBLZXkuVGFiKSxcbiAgICAgICAgICAvLyB0c2xpbnQ6ZW5hYmxlOmRlcHJlY2F0aW9uXG4gICAgICAgICAgd2l0aExhdGVzdEZyb20obGFzdEZvY3VzZWRFbGVtZW50JCkpXG4gICAgICAuc3Vic2NyaWJlKChbdGFiRXZlbnQsIGZvY3VzZWRFbGVtZW50XSkgPT4ge1xuICAgICAgICBjb25zdFtmaXJzdCwgbGFzdF0gPSBnZXRGb2N1c2FibGVCb3VuZGFyeUVsZW1lbnRzKGVsZW1lbnQpO1xuXG4gICAgICAgIGlmICgoZm9jdXNlZEVsZW1lbnQgPT09IGZpcnN0IHx8IGZvY3VzZWRFbGVtZW50ID09PSBlbGVtZW50KSAmJiB0YWJFdmVudC5zaGlmdEtleSkge1xuICAgICAgICAgIGxhc3QuZm9jdXMoKTtcbiAgICAgICAgICB0YWJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvY3VzZWRFbGVtZW50ID09PSBsYXN0ICYmICF0YWJFdmVudC5zaGlmdEtleSkge1xuICAgICAgICAgIGZpcnN0LmZvY3VzKCk7XG4gICAgICAgICAgdGFiRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgLy8gaW5zaWRlIGNsaWNrXG4gIGlmIChyZWZvY3VzT25DbGljaykge1xuICAgIGZyb21FdmVudChlbGVtZW50LCAnY2xpY2snKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwoc3RvcEZvY3VzVHJhcCQpLCB3aXRoTGF0ZXN0RnJvbShsYXN0Rm9jdXNlZEVsZW1lbnQkKSwgbWFwKGFyciA9PiBhcnJbMV0gYXMgSFRNTEVsZW1lbnQpKVxuICAgICAgICAuc3Vic2NyaWJlKGxhc3RGb2N1c2VkRWxlbWVudCA9PiBsYXN0Rm9jdXNlZEVsZW1lbnQuZm9jdXMoKSk7XG4gIH1cbn07XG4iXX0=