/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { fromEvent, race } from 'rxjs';
import { delay, filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Key } from './key';
/** @type {?} */
const isHTMLElementContainedIn = (element, array) => array ? array.some(item => item.contains(element)) : false;
const ɵ0 = isHTMLElementContainedIn;
// we'll have to use 'touch' events instead of 'mouse' events on iOS and add a more significant delay
// to avoid re-opening when handling (click) on a toggling element
// TODO: use proper Angular platform detection when NgbAutoClose becomes a service and we can inject PLATFORM_ID
/** @type {?} */
let iOS = false;
if (typeof navigator !== 'undefined') {
    iOS = !!navigator.userAgent && /iPad|iPhone|iPod/.test(navigator.userAgent);
}
/**
 * @param {?} zone
 * @param {?} document
 * @param {?} type
 * @param {?} close
 * @param {?} closed$
 * @param {?} insideElements
 * @param {?=} ignoreElements
 * @return {?}
 */
export function ngbAutoClose(zone, document, type, close, closed$, insideElements, ignoreElements) {
    // closing on ESC and outside clicks
    if (type) {
        zone.runOutsideAngular(() => {
            /** @type {?} */
            const shouldCloseOnClick = (event) => {
                /** @type {?} */
                const element = (/** @type {?} */ (event.target));
                if ((event instanceof MouseEvent && event.button === 2) || isHTMLElementContainedIn(element, ignoreElements)) {
                    return false;
                }
                if (type === 'inside') {
                    return isHTMLElementContainedIn(element, insideElements);
                }
                else if (type === 'outside') {
                    return !isHTMLElementContainedIn(element, insideElements);
                }
                else /* if (type === true) */ {
                    return true;
                }
            };
            /** @type {?} */
            const escapes$ = fromEvent(document, 'keydown')
                .pipe(takeUntil(closed$), 
            // tslint:disable-next-line:deprecation
            filter(e => e.which === Key.Escape));
            // we have to pre-calculate 'shouldCloseOnClick' on 'mousedown/touchstart',
            // because on 'mouseup/touchend' DOM nodes might be detached
            /** @type {?} */
            const mouseDowns$ = fromEvent(document, iOS ? 'touchstart' : 'mousedown')
                .pipe(map(shouldCloseOnClick), takeUntil(closed$));
            /** @type {?} */
            const closeableClicks$ = fromEvent(document, iOS ? 'touchend' : 'mouseup')
                .pipe(withLatestFrom(mouseDowns$), filter(([_, shouldClose]) => shouldClose), delay(iOS ? 16 : 0), takeUntil(closed$));
            race([escapes$, closeableClicks$]).subscribe(() => zone.run(close));
        });
    }
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2Nsb3NlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ1dGlsL2F1dG9jbG9zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFDLFNBQVMsRUFBYyxJQUFJLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3RSxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sT0FBTyxDQUFDOztNQUVwQix3QkFBd0IsR0FBRyxDQUFDLE9BQW9CLEVBQUUsS0FBcUIsRUFBRSxFQUFFLENBQzdFLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSzs7Ozs7O0lBSzFELEdBQUcsR0FBRyxLQUFLO0FBQ2YsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLEVBQUU7SUFDcEMsR0FBRyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FDN0U7Ozs7Ozs7Ozs7O0FBRUQsTUFBTSxVQUFVLFlBQVksQ0FDeEIsSUFBWSxFQUFFLFFBQWEsRUFBRSxJQUFvQyxFQUFFLEtBQWlCLEVBQUUsT0FBd0IsRUFDOUcsY0FBNkIsRUFBRSxjQUE4QjtJQUMvRCxvQ0FBb0M7SUFDcEMsSUFBSSxJQUFJLEVBQUU7UUFDUixJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFOztrQkFFcEIsa0JBQWtCLEdBQUcsQ0FBQyxLQUE4QixFQUFFLEVBQUU7O3NCQUN0RCxPQUFPLEdBQUcsbUJBQUEsS0FBSyxDQUFDLE1BQU0sRUFBZTtnQkFDM0MsSUFBSSxDQUFDLEtBQUssWUFBWSxVQUFVLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsSUFBSSx3QkFBd0IsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLEVBQUU7b0JBQzVHLE9BQU8sS0FBSyxDQUFDO2lCQUNkO2dCQUNELElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDckIsT0FBTyx3QkFBd0IsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7aUJBQzFEO3FCQUFNLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtvQkFDN0IsT0FBTyxDQUFDLHdCQUF3QixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztpQkFDM0Q7cUJBQU0sd0JBQXdCLENBQUM7b0JBQzlCLE9BQU8sSUFBSSxDQUFDO2lCQUNiO1lBQ0gsQ0FBQzs7a0JBRUssUUFBUSxHQUFHLFNBQVMsQ0FBZ0IsUUFBUSxFQUFFLFNBQVMsQ0FBQztpQkFDeEMsSUFBSSxDQUNELFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDbEIsdUNBQXVDO1lBQ3ZDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7O2tCQUt2RCxXQUFXLEdBQUcsU0FBUyxDQUFhLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO2lCQUM1RCxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztrQkFFcEUsZ0JBQWdCLEdBQUcsU0FBUyxDQUFhLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2lCQUN4RCxJQUFJLENBQ0QsY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFDdEUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFHekUsSUFBSSxDQUFRLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzdFLENBQUMsQ0FBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtmcm9tRXZlbnQsIE9ic2VydmFibGUsIHJhY2V9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkZWxheSwgZmlsdGVyLCBtYXAsIHRha2VVbnRpbCwgd2l0aExhdGVzdEZyb219IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7S2V5fSBmcm9tICcuL2tleSc7XG5cbmNvbnN0IGlzSFRNTEVsZW1lbnRDb250YWluZWRJbiA9IChlbGVtZW50OiBIVE1MRWxlbWVudCwgYXJyYXk/OiBIVE1MRWxlbWVudFtdKSA9PlxuICAgIGFycmF5ID8gYXJyYXkuc29tZShpdGVtID0+IGl0ZW0uY29udGFpbnMoZWxlbWVudCkpIDogZmFsc2U7XG5cbi8vIHdlJ2xsIGhhdmUgdG8gdXNlICd0b3VjaCcgZXZlbnRzIGluc3RlYWQgb2YgJ21vdXNlJyBldmVudHMgb24gaU9TIGFuZCBhZGQgYSBtb3JlIHNpZ25pZmljYW50IGRlbGF5XG4vLyB0byBhdm9pZCByZS1vcGVuaW5nIHdoZW4gaGFuZGxpbmcgKGNsaWNrKSBvbiBhIHRvZ2dsaW5nIGVsZW1lbnRcbi8vIFRPRE86IHVzZSBwcm9wZXIgQW5ndWxhciBwbGF0Zm9ybSBkZXRlY3Rpb24gd2hlbiBOZ2JBdXRvQ2xvc2UgYmVjb21lcyBhIHNlcnZpY2UgYW5kIHdlIGNhbiBpbmplY3QgUExBVEZPUk1fSURcbmxldCBpT1MgPSBmYWxzZTtcbmlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJykge1xuICBpT1MgPSAhIW5hdmlnYXRvci51c2VyQWdlbnQgJiYgL2lQYWR8aVBob25lfGlQb2QvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZ2JBdXRvQ2xvc2UoXG4gICAgem9uZTogTmdab25lLCBkb2N1bWVudDogYW55LCB0eXBlOiBib29sZWFuIHwgJ2luc2lkZScgfCAnb3V0c2lkZScsIGNsb3NlOiAoKSA9PiB2b2lkLCBjbG9zZWQkOiBPYnNlcnZhYmxlPGFueT4sXG4gICAgaW5zaWRlRWxlbWVudHM6IEhUTUxFbGVtZW50W10sIGlnbm9yZUVsZW1lbnRzPzogSFRNTEVsZW1lbnRbXSkge1xuICAvLyBjbG9zaW5nIG9uIEVTQyBhbmQgb3V0c2lkZSBjbGlja3NcbiAgaWYgKHR5cGUpIHtcbiAgICB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcblxuICAgICAgY29uc3Qgc2hvdWxkQ2xvc2VPbkNsaWNrID0gKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBpZiAoKGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCAmJiBldmVudC5idXR0b24gPT09IDIpIHx8IGlzSFRNTEVsZW1lbnRDb250YWluZWRJbihlbGVtZW50LCBpZ25vcmVFbGVtZW50cykpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT09ICdpbnNpZGUnKSB7XG4gICAgICAgICAgcmV0dXJuIGlzSFRNTEVsZW1lbnRDb250YWluZWRJbihlbGVtZW50LCBpbnNpZGVFbGVtZW50cyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ291dHNpZGUnKSB7XG4gICAgICAgICAgcmV0dXJuICFpc0hUTUxFbGVtZW50Q29udGFpbmVkSW4oZWxlbWVudCwgaW5zaWRlRWxlbWVudHMpO1xuICAgICAgICB9IGVsc2UgLyogaWYgKHR5cGUgPT09IHRydWUpICovIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3QgZXNjYXBlcyQgPSBmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4oZG9jdW1lbnQsICdrZXlkb3duJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2VVbnRpbChjbG9zZWQkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoZSA9PiBlLndoaWNoID09PSBLZXkuRXNjYXBlKSk7XG5cblxuICAgICAgLy8gd2UgaGF2ZSB0byBwcmUtY2FsY3VsYXRlICdzaG91bGRDbG9zZU9uQ2xpY2snIG9uICdtb3VzZWRvd24vdG91Y2hzdGFydCcsXG4gICAgICAvLyBiZWNhdXNlIG9uICdtb3VzZXVwL3RvdWNoZW5kJyBET00gbm9kZXMgbWlnaHQgYmUgZGV0YWNoZWRcbiAgICAgIGNvbnN0IG1vdXNlRG93bnMkID0gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KGRvY3VtZW50LCBpT1MgPyAndG91Y2hzdGFydCcgOiAnbW91c2Vkb3duJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcChzaG91bGRDbG9zZU9uQ2xpY2spLCB0YWtlVW50aWwoY2xvc2VkJCkpO1xuXG4gICAgICBjb25zdCBjbG9zZWFibGVDbGlja3MkID0gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KGRvY3VtZW50LCBpT1MgPyAndG91Y2hlbmQnIDogJ21vdXNldXAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKG1vdXNlRG93bnMkKSwgZmlsdGVyKChbXywgc2hvdWxkQ2xvc2VdKSA9PiBzaG91bGRDbG9zZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxheShpT1MgPyAxNiA6IDApLCB0YWtlVW50aWwoY2xvc2VkJCkpO1xuXG5cbiAgICAgIHJhY2U8RXZlbnQ+KFtlc2NhcGVzJCwgY2xvc2VhYmxlQ2xpY2tzJF0pLnN1YnNjcmliZSgoKSA9PiB6b25lLnJ1bihjbG9zZSkpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=