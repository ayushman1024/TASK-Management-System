/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Observable } from 'rxjs';
/**
 * Returns operator that will run
 * `subscribe` outside of the ngxs execution context
 * @template T
 * @param {?} ngxsExecutionStrategy
 * @return {?}
 */
export function leaveNgxs(ngxsExecutionStrategy) {
    return (/**
     * @param {?} source
     * @return {?}
     */
    function (source) {
        return new Observable((/**
         * @param {?} sink
         * @return {?}
         */
        function (sink) {
            return source.subscribe({
                next: /**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) {
                    ngxsExecutionStrategy.leave((/**
                     * @return {?}
                     */
                    function () { return sink.next(value); }));
                },
                error: /**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    ngxsExecutionStrategy.leave((/**
                     * @return {?}
                     */
                    function () { return sink.error(error); }));
                },
                complete: /**
                 * @return {?}
                 */
                function () {
                    ngxsExecutionStrategy.leave((/**
                     * @return {?}
                     */
                    function () { return sink.complete(); }));
                }
            });
        }));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhdmUtbmd4cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3hzL3N0b3JlLyIsInNvdXJjZXMiOlsic3JjL29wZXJhdG9ycy9sZWF2ZS1uZ3hzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQTRCLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7QUFPdEUsTUFBTSxVQUFVLFNBQVMsQ0FDdkIscUJBQTRDO0lBRTVDOzs7O0lBQU8sVUFBQyxNQUFxQjtRQUMzQixPQUFPLElBQUksVUFBVTs7OztRQUFDLFVBQUMsSUFBaUI7WUFDdEMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUN0QixJQUFJOzs7OzBCQUFDLEtBQUs7b0JBQ1IscUJBQXFCLENBQUMsS0FBSzs7O29CQUFDLGNBQU0sT0FBQSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFoQixDQUFnQixFQUFDLENBQUM7Z0JBQ3RELENBQUM7Z0JBQ0QsS0FBSzs7OzswQkFBQyxLQUFLO29CQUNULHFCQUFxQixDQUFDLEtBQUs7OztvQkFBQyxjQUFNLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBakIsQ0FBaUIsRUFBQyxDQUFDO2dCQUN2RCxDQUFDO2dCQUNELFFBQVE7Ozs7b0JBQ04scUJBQXFCLENBQUMsS0FBSzs7O29CQUFDLGNBQU0sT0FBQSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQWYsQ0FBZSxFQUFDLENBQUM7Z0JBQ3JELENBQUM7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUMsRUFBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb25vVHlwZU9wZXJhdG9yRnVuY3Rpb24sIE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE5neHNFeGVjdXRpb25TdHJhdGVneSB9IGZyb20gJy4uL2V4ZWN1dGlvbi9zeW1ib2xzJztcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIG9wZXJhdG9yIHRoYXQgd2lsbCBydW5cclxuICogYHN1YnNjcmliZWAgb3V0c2lkZSBvZiB0aGUgbmd4cyBleGVjdXRpb24gY29udGV4dFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGxlYXZlTmd4czxUPihcclxuICBuZ3hzRXhlY3V0aW9uU3RyYXRlZ3k6IE5neHNFeGVjdXRpb25TdHJhdGVneVxyXG4pOiBNb25vVHlwZU9wZXJhdG9yRnVuY3Rpb248VD4ge1xyXG4gIHJldHVybiAoc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKHNpbms6IE9ic2VydmVyPFQ+KSA9PiB7XHJcbiAgICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKHtcclxuICAgICAgICBuZXh0KHZhbHVlKSB7XHJcbiAgICAgICAgICBuZ3hzRXhlY3V0aW9uU3RyYXRlZ3kubGVhdmUoKCkgPT4gc2luay5uZXh0KHZhbHVlKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcihlcnJvcikge1xyXG4gICAgICAgICAgbmd4c0V4ZWN1dGlvblN0cmF0ZWd5LmxlYXZlKCgpID0+IHNpbmsuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBsZXRlKCkge1xyXG4gICAgICAgICAgbmd4c0V4ZWN1dGlvblN0cmF0ZWd5LmxlYXZlKCgpID0+IHNpbmsuY29tcGxldGUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH07XHJcbn1cclxuIl19