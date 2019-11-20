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
    (source) => {
        return new Observable((/**
         * @param {?} sink
         * @return {?}
         */
        (sink) => {
            return source.subscribe({
                /**
                 * @param {?} value
                 * @return {?}
                 */
                next(value) {
                    ngxsExecutionStrategy.leave((/**
                     * @return {?}
                     */
                    () => sink.next(value)));
                },
                /**
                 * @param {?} error
                 * @return {?}
                 */
                error(error) {
                    ngxsExecutionStrategy.leave((/**
                     * @return {?}
                     */
                    () => sink.error(error)));
                },
                /**
                 * @return {?}
                 */
                complete() {
                    ngxsExecutionStrategy.leave((/**
                     * @return {?}
                     */
                    () => sink.complete()));
                }
            });
        }));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhdmUtbmd4cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3hzL3N0b3JlLyIsInNvdXJjZXMiOlsic3JjL29wZXJhdG9ycy9sZWF2ZS1uZ3hzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQTRCLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7QUFPdEUsTUFBTSxVQUFVLFNBQVMsQ0FDdkIscUJBQTRDO0lBRTVDOzs7O0lBQU8sQ0FBQyxNQUFxQixFQUFFLEVBQUU7UUFDL0IsT0FBTyxJQUFJLFVBQVU7Ozs7UUFBQyxDQUFDLElBQWlCLEVBQUUsRUFBRTtZQUMxQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUM7Ozs7O2dCQUN0QixJQUFJLENBQUMsS0FBSztvQkFDUixxQkFBcUIsQ0FBQyxLQUFLOzs7b0JBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDO2dCQUN0RCxDQUFDOzs7OztnQkFDRCxLQUFLLENBQUMsS0FBSztvQkFDVCxxQkFBcUIsQ0FBQyxLQUFLOzs7b0JBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDO2dCQUN2RCxDQUFDOzs7O2dCQUNELFFBQVE7b0JBQ04scUJBQXFCLENBQUMsS0FBSzs7O29CQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQyxDQUFDO2dCQUNyRCxDQUFDO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDLEVBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9ub1R5cGVPcGVyYXRvckZ1bmN0aW9uLCBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBOZ3hzRXhlY3V0aW9uU3RyYXRlZ3kgfSBmcm9tICcuLi9leGVjdXRpb24vc3ltYm9scyc7XHJcblxyXG4vKipcclxuICogUmV0dXJucyBvcGVyYXRvciB0aGF0IHdpbGwgcnVuXHJcbiAqIGBzdWJzY3JpYmVgIG91dHNpZGUgb2YgdGhlIG5neHMgZXhlY3V0aW9uIGNvbnRleHRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsZWF2ZU5neHM8VD4oXHJcbiAgbmd4c0V4ZWN1dGlvblN0cmF0ZWd5OiBOZ3hzRXhlY3V0aW9uU3RyYXRlZ3lcclxuKTogTW9ub1R5cGVPcGVyYXRvckZ1bmN0aW9uPFQ+IHtcclxuICByZXR1cm4gKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4ge1xyXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChzaW5rOiBPYnNlcnZlcjxUPikgPT4ge1xyXG4gICAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZSh7XHJcbiAgICAgICAgbmV4dCh2YWx1ZSkge1xyXG4gICAgICAgICAgbmd4c0V4ZWN1dGlvblN0cmF0ZWd5LmxlYXZlKCgpID0+IHNpbmsubmV4dCh2YWx1ZSkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3IoZXJyb3IpIHtcclxuICAgICAgICAgIG5neHNFeGVjdXRpb25TdHJhdGVneS5sZWF2ZSgoKSA9PiBzaW5rLmVycm9yKGVycm9yKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wbGV0ZSgpIHtcclxuICAgICAgICAgIG5neHNFeGVjdXRpb25TdHJhdGVneS5sZWF2ZSgoKSA9PiBzaW5rLmNvbXBsZXRlKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG59XHJcbiJdfQ==