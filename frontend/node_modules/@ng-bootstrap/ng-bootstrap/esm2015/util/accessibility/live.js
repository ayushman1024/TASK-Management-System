/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Inject, InjectionToken } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/** @type {?} */
export const ARIA_LIVE_DELAY = new InjectionToken('live announcer delay', { providedIn: 'root', factory: ARIA_LIVE_DELAY_FACTORY });
/**
 * @return {?}
 */
export function ARIA_LIVE_DELAY_FACTORY() {
    return 100;
}
/**
 * @param {?} document
 * @param {?=} lazyCreate
 * @return {?}
 */
function getLiveElement(document, lazyCreate = false) {
    /** @type {?} */
    let element = (/** @type {?} */ (document.body.querySelector('#ngb-live')));
    if (element == null && lazyCreate) {
        element = document.createElement('div');
        element.setAttribute('id', 'ngb-live');
        element.setAttribute('aria-live', 'polite');
        element.setAttribute('aria-atomic', 'true');
        element.classList.add('sr-only');
        document.body.appendChild(element);
    }
    return element;
}
export class Live {
    /**
     * @param {?} _document
     * @param {?} _delay
     */
    constructor(_document, _delay) {
        this._document = _document;
        this._delay = _delay;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        /** @type {?} */
        const element = getLiveElement(this._document);
        if (element) {
            element.parentElement.removeChild(element);
        }
    }
    /**
     * @param {?} message
     * @return {?}
     */
    say(message) {
        /** @type {?} */
        const element = getLiveElement(this._document, true);
        /** @type {?} */
        const delay = this._delay;
        element.textContent = '';
        /** @type {?} */
        const setText = () => element.textContent = message;
        if (delay === null) {
            setText();
        }
        else {
            setTimeout(setText, delay);
        }
    }
}
Live.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
Live.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [ARIA_LIVE_DELAY,] }] }
];
/** @nocollapse */ Live.ngInjectableDef = i0.defineInjectable({ factory: function Live_Factory() { return new Live(i0.inject(i1.DOCUMENT), i0.inject(ARIA_LIVE_DELAY)); }, token: Live, providedIn: "root" });
if (false) {
    /** @type {?} */
    Live.prototype._document;
    /** @type {?} */
    Live.prototype._delay;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidXRpbC9hY2Nlc3NpYmlsaXR5L2xpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFPekMsTUFBTSxPQUFPLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FDN0Msc0JBQXNCLEVBQUUsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBQyxDQUFDOzs7O0FBQ25GLE1BQU0sVUFBVSx1QkFBdUI7SUFDckMsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDOzs7Ozs7QUFHRCxTQUFTLGNBQWMsQ0FBQyxRQUFhLEVBQUUsVUFBVSxHQUFHLEtBQUs7O1FBQ25ELE9BQU8sR0FBRyxtQkFBQSxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBZTtJQUVyRSxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksVUFBVSxFQUFFO1FBQ2pDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTVDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWpDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3BDO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQUtELE1BQU0sT0FBTyxJQUFJOzs7OztJQUNmLFlBQXNDLFNBQWMsRUFBbUMsTUFBVztRQUE1RCxjQUFTLEdBQVQsU0FBUyxDQUFLO1FBQW1DLFdBQU0sR0FBTixNQUFNLENBQUs7SUFBRyxDQUFDOzs7O0lBRXRHLFdBQVc7O2NBQ0gsT0FBTyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzlDLElBQUksT0FBTyxFQUFFO1lBQ1gsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDNUM7SUFDSCxDQUFDOzs7OztJQUVELEdBQUcsQ0FBQyxPQUFlOztjQUNYLE9BQU8sR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7O2NBQzlDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTTtRQUV6QixPQUFPLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQzs7Y0FDbkIsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsT0FBTztRQUNuRCxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsT0FBTyxFQUFFLENBQUM7U0FDWDthQUFNO1lBQ0wsVUFBVSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM1QjtJQUNILENBQUM7OztZQXRCRixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7OzRDQUVqQixNQUFNLFNBQUMsUUFBUTs0Q0FBMkIsTUFBTSxTQUFDLGVBQWU7Ozs7O0lBQWpFLHlCQUF3Qzs7SUFBRSxzQkFBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIEluamVjdCwgSW5qZWN0aW9uVG9rZW4sIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5cblxuLy8gdXNlZnVsbmVzcyAoYW5kIGRlZmF1bHQgdmFsdWUpIG9mIGRlbGF5IGRvY3VtZW50ZWQgaW4gTWF0ZXJpYWwncyBDREtcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9ibG9iLzY0MDVkYTliOGU4NTMyYTdlNWM4NTRjOTIwZWUxODE1YzI3NWQ3MzQvc3JjL2Nkay9hMTF5L2xpdmUtYW5ub3VuY2VyL2xpdmUtYW5ub3VuY2VyLnRzI0w1MFxuZXhwb3J0IHR5cGUgQVJJQV9MSVZFX0RFTEFZX1RZUEUgPSBudW1iZXIgfCBudWxsO1xuZXhwb3J0IGNvbnN0IEFSSUFfTElWRV9ERUxBWSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxBUklBX0xJVkVfREVMQVlfVFlQRT4oXG4gICAgJ2xpdmUgYW5ub3VuY2VyIGRlbGF5Jywge3Byb3ZpZGVkSW46ICdyb290JywgZmFjdG9yeTogQVJJQV9MSVZFX0RFTEFZX0ZBQ1RPUll9KTtcbmV4cG9ydCBmdW5jdGlvbiBBUklBX0xJVkVfREVMQVlfRkFDVE9SWSgpOiBudW1iZXIge1xuICByZXR1cm4gMTAwO1xufVxuXG5cbmZ1bmN0aW9uIGdldExpdmVFbGVtZW50KGRvY3VtZW50OiBhbnksIGxhenlDcmVhdGUgPSBmYWxzZSk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKCcjbmdiLWxpdmUnKSBhcyBIVE1MRWxlbWVudDtcblxuICBpZiAoZWxlbWVudCA9PSBudWxsICYmIGxhenlDcmVhdGUpIHtcbiAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAnbmdiLWxpdmUnKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1saXZlJywgJ3BvbGl0ZScpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWF0b21pYycsICd0cnVlJyk7XG5cbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NyLW9ubHknKTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuXG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIExpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LCBASW5qZWN0KEFSSUFfTElWRV9ERUxBWSkgcHJpdmF0ZSBfZGVsYXk6IGFueSkge31cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZ2V0TGl2ZUVsZW1lbnQodGhpcy5fZG9jdW1lbnQpO1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgc2F5KG1lc3NhZ2U6IHN0cmluZykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBnZXRMaXZlRWxlbWVudCh0aGlzLl9kb2N1bWVudCwgdHJ1ZSk7XG4gICAgY29uc3QgZGVsYXkgPSB0aGlzLl9kZWxheTtcblxuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcbiAgICBjb25zdCBzZXRUZXh0ID0gKCkgPT4gZWxlbWVudC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gICAgaWYgKGRlbGF5ID09PSBudWxsKSB7XG4gICAgICBzZXRUZXh0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFRpbWVvdXQoc2V0VGV4dCwgZGVsYXkpO1xuICAgIH1cbiAgfVxufVxuIl19