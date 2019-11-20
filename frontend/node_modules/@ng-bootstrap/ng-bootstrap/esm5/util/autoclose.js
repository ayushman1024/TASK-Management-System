/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { fromEvent, race } from 'rxjs';
import { delay, filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Key } from './key';
/** @type {?} */
var isHTMLElementContainedIn = function (element, array) {
    return array ? array.some(function (item) { return item.contains(element); }) : false;
};
var ɵ0 = isHTMLElementContainedIn;
// we'll have to use 'touch' events instead of 'mouse' events on iOS and add a more significant delay
// to avoid re-opening when handling (click) on a toggling element
// TODO: use proper Angular platform detection when NgbAutoClose becomes a service and we can inject PLATFORM_ID
/** @type {?} */
var iOS = false;
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
        zone.runOutsideAngular(function () {
            /** @type {?} */
            var shouldCloseOnClick = function (event) {
                /** @type {?} */
                var element = (/** @type {?} */ (event.target));
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
            var escapes$ = fromEvent(document, 'keydown')
                .pipe(takeUntil(closed$), 
            // tslint:disable-next-line:deprecation
            filter(function (e) { return e.which === Key.Escape; }));
            // we have to pre-calculate 'shouldCloseOnClick' on 'mousedown/touchstart',
            // because on 'mouseup/touchend' DOM nodes might be detached
            /** @type {?} */
            var mouseDowns$ = fromEvent(document, iOS ? 'touchstart' : 'mousedown')
                .pipe(map(shouldCloseOnClick), takeUntil(closed$));
            /** @type {?} */
            var closeableClicks$ = fromEvent(document, iOS ? 'touchend' : 'mouseup')
                .pipe(withLatestFrom(mouseDowns$), filter(function (_a) {
                var _b = tslib_1.__read(_a, 2), _ = _b[0], shouldClose = _b[1];
                return shouldClose;
            }), delay(iOS ? 16 : 0), takeUntil(closed$));
            race([escapes$, closeableClicks$]).subscribe(function () { return zone.run(close); });
        });
    }
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2Nsb3NlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ1dGlsL2F1dG9jbG9zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBQyxTQUFTLEVBQWMsSUFBSSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0UsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLE9BQU8sQ0FBQzs7SUFFcEIsd0JBQXdCLEdBQUcsVUFBQyxPQUFvQixFQUFFLEtBQXFCO0lBQ3pFLE9BQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO0FBQTFELENBQTBEOzs7Ozs7SUFLMUQsR0FBRyxHQUFHLEtBQUs7QUFDZixJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsRUFBRTtJQUNwQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUM3RTs7Ozs7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUN4QixJQUFZLEVBQUUsUUFBYSxFQUFFLElBQW9DLEVBQUUsS0FBaUIsRUFBRSxPQUF3QixFQUM5RyxjQUE2QixFQUFFLGNBQThCO0lBQy9ELG9DQUFvQztJQUNwQyxJQUFJLElBQUksRUFBRTtRQUNSLElBQUksQ0FBQyxpQkFBaUIsQ0FBQzs7Z0JBRWYsa0JBQWtCLEdBQUcsVUFBQyxLQUE4Qjs7b0JBQ2xELE9BQU8sR0FBRyxtQkFBQSxLQUFLLENBQUMsTUFBTSxFQUFlO2dCQUMzQyxJQUFJLENBQUMsS0FBSyxZQUFZLFVBQVUsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxJQUFJLHdCQUF3QixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsRUFBRTtvQkFDNUcsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7Z0JBQ0QsSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUNyQixPQUFPLHdCQUF3QixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztpQkFDMUQ7cUJBQU0sSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO29CQUM3QixPQUFPLENBQUMsd0JBQXdCLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO2lCQUMzRDtxQkFBTSx3QkFBd0IsQ0FBQztvQkFDOUIsT0FBTyxJQUFJLENBQUM7aUJBQ2I7WUFDSCxDQUFDOztnQkFFSyxRQUFRLEdBQUcsU0FBUyxDQUFnQixRQUFRLEVBQUUsU0FBUyxDQUFDO2lCQUN4QyxJQUFJLENBQ0QsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUNsQix1Q0FBdUM7WUFDdkMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssS0FBSyxHQUFHLENBQUMsTUFBTSxFQUF0QixDQUFzQixDQUFDLENBQUM7Ozs7Z0JBS3ZELFdBQVcsR0FBRyxTQUFTLENBQWEsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7aUJBQzVELElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7O2dCQUVwRSxnQkFBZ0IsR0FBRyxTQUFTLENBQWEsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7aUJBQ3hELElBQUksQ0FDRCxjQUFjLENBQUMsV0FBVyxDQUFDLEVBQUUsTUFBTSxDQUFDLFVBQUMsRUFBZ0I7b0JBQWhCLDBCQUFnQixFQUFmLFNBQUMsRUFBRSxtQkFBVztnQkFBTSxPQUFBLFdBQVc7WUFBWCxDQUFXLENBQUMsRUFDdEUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFHekUsSUFBSSxDQUFRLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQWYsQ0FBZSxDQUFDLENBQUM7UUFDN0UsQ0FBQyxDQUFDLENBQUM7S0FDSjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2Zyb21FdmVudCwgT2JzZXJ2YWJsZSwgcmFjZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2RlbGF5LCBmaWx0ZXIsIG1hcCwgdGFrZVVudGlsLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtLZXl9IGZyb20gJy4va2V5JztcblxuY29uc3QgaXNIVE1MRWxlbWVudENvbnRhaW5lZEluID0gKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBhcnJheT86IEhUTUxFbGVtZW50W10pID0+XG4gICAgYXJyYXkgPyBhcnJheS5zb21lKGl0ZW0gPT4gaXRlbS5jb250YWlucyhlbGVtZW50KSkgOiBmYWxzZTtcblxuLy8gd2UnbGwgaGF2ZSB0byB1c2UgJ3RvdWNoJyBldmVudHMgaW5zdGVhZCBvZiAnbW91c2UnIGV2ZW50cyBvbiBpT1MgYW5kIGFkZCBhIG1vcmUgc2lnbmlmaWNhbnQgZGVsYXlcbi8vIHRvIGF2b2lkIHJlLW9wZW5pbmcgd2hlbiBoYW5kbGluZyAoY2xpY2spIG9uIGEgdG9nZ2xpbmcgZWxlbWVudFxuLy8gVE9ETzogdXNlIHByb3BlciBBbmd1bGFyIHBsYXRmb3JtIGRldGVjdGlvbiB3aGVuIE5nYkF1dG9DbG9zZSBiZWNvbWVzIGEgc2VydmljZSBhbmQgd2UgY2FuIGluamVjdCBQTEFURk9STV9JRFxubGV0IGlPUyA9IGZhbHNlO1xuaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnKSB7XG4gIGlPUyA9ICEhbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiAvaVBhZHxpUGhvbmV8aVBvZC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5nYkF1dG9DbG9zZShcbiAgICB6b25lOiBOZ1pvbmUsIGRvY3VtZW50OiBhbnksIHR5cGU6IGJvb2xlYW4gfCAnaW5zaWRlJyB8ICdvdXRzaWRlJywgY2xvc2U6ICgpID0+IHZvaWQsIGNsb3NlZCQ6IE9ic2VydmFibGU8YW55PixcbiAgICBpbnNpZGVFbGVtZW50czogSFRNTEVsZW1lbnRbXSwgaWdub3JlRWxlbWVudHM/OiBIVE1MRWxlbWVudFtdKSB7XG4gIC8vIGNsb3Npbmcgb24gRVNDIGFuZCBvdXRzaWRlIGNsaWNrc1xuICBpZiAodHlwZSkge1xuICAgIHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuXG4gICAgICBjb25zdCBzaG91bGRDbG9zZU9uQ2xpY2sgPSAoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGlmICgoZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50ICYmIGV2ZW50LmJ1dHRvbiA9PT0gMikgfHwgaXNIVE1MRWxlbWVudENvbnRhaW5lZEluKGVsZW1lbnQsIGlnbm9yZUVsZW1lbnRzKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PT0gJ2luc2lkZScpIHtcbiAgICAgICAgICByZXR1cm4gaXNIVE1MRWxlbWVudENvbnRhaW5lZEluKGVsZW1lbnQsIGluc2lkZUVsZW1lbnRzKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnb3V0c2lkZScpIHtcbiAgICAgICAgICByZXR1cm4gIWlzSFRNTEVsZW1lbnRDb250YWluZWRJbihlbGVtZW50LCBpbnNpZGVFbGVtZW50cyk7XG4gICAgICAgIH0gZWxzZSAvKiBpZiAodHlwZSA9PT0gdHJ1ZSkgKi8ge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBlc2NhcGVzJCA9IGZyb21FdmVudDxLZXlib2FyZEV2ZW50Pihkb2N1bWVudCwgJ2tleWRvd24nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFrZVVudGlsKGNsb3NlZCQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcihlID0+IGUud2hpY2ggPT09IEtleS5Fc2NhcGUpKTtcblxuXG4gICAgICAvLyB3ZSBoYXZlIHRvIHByZS1jYWxjdWxhdGUgJ3Nob3VsZENsb3NlT25DbGljaycgb24gJ21vdXNlZG93bi90b3VjaHN0YXJ0JyxcbiAgICAgIC8vIGJlY2F1c2Ugb24gJ21vdXNldXAvdG91Y2hlbmQnIERPTSBub2RlcyBtaWdodCBiZSBkZXRhY2hlZFxuICAgICAgY29uc3QgbW91c2VEb3ducyQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4oZG9jdW1lbnQsIGlPUyA/ICd0b3VjaHN0YXJ0JyA6ICdtb3VzZWRvd24nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKHNob3VsZENsb3NlT25DbGljayksIHRha2VVbnRpbChjbG9zZWQkKSk7XG5cbiAgICAgIGNvbnN0IGNsb3NlYWJsZUNsaWNrcyQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4oZG9jdW1lbnQsIGlPUyA/ICd0b3VjaGVuZCcgOiAnbW91c2V1cCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aExhdGVzdEZyb20obW91c2VEb3ducyQpLCBmaWx0ZXIoKFtfLCBzaG91bGRDbG9zZV0pID0+IHNob3VsZENsb3NlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5KGlPUyA/IDE2IDogMCksIHRha2VVbnRpbChjbG9zZWQkKSk7XG5cblxuICAgICAgcmFjZTxFdmVudD4oW2VzY2FwZXMkLCBjbG9zZWFibGVDbGlja3MkXSkuc3Vic2NyaWJlKCgpID0+IHpvbmUucnVuKGNsb3NlKSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==