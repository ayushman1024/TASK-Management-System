/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * Composes a array of functions from left to right. Example:
 *
 *      compose([fn, final])(state, action);
 *
 * then the funcs have a signature like:
 *
 *      function fn (state, action, next) {
 *          console.log('here', state, action, next);
 *          return next(state, action);
 *      }
 *
 *      function final (state, action) {
 *          console.log('here', state, action);
 *          return state;
 *      }
 *
 * the last function should not call `next`.
 *
 * @ignore
 * @type {?}
 */
export var compose = (/**
 * @param {?} funcs
 * @return {?}
 */
function (funcs) { return (/**
 * @param {...?} args
 * @return {?}
 */
function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    /** @type {?} */
    var curr = (/** @type {?} */ (funcs.shift()));
    return curr.apply(void 0, tslib_1.__spread(args, [(/**
         * @param {...?} nextArgs
         * @return {?}
         */
        function () {
            var nextArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                nextArgs[_i] = arguments[_i];
            }
            return compose(funcs).apply(void 0, tslib_1.__spread(nextArgs));
        })]));
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3hzL3N0b3JlLyIsInNvdXJjZXMiOlsic3JjL3V0aWxzL2NvbXBvc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE1BQU0sS0FBTyxPQUFPOzs7O0FBQUcsVUFBQyxLQUFnQjs7OztBQUFLO0lBQUMsY0FBYztTQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7UUFBZCx5QkFBYzs7O1FBQ3BELElBQUksR0FBRyxtQkFBQSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUM7SUFDM0IsT0FBTyxJQUFJLGdDQUFJLElBQUk7Ozs7UUFBRTtZQUFDLGtCQUFrQjtpQkFBbEIsVUFBa0IsRUFBbEIscUJBQWtCLEVBQWxCLElBQWtCO2dCQUFsQiw2QkFBa0I7O1lBQUssT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLGdDQUFJLFFBQVE7UUFBMUIsQ0FBMkIsS0FBRTtBQUM1RSxDQUFDLElBQUEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIFN0YXRlRm4gPSAoLi4uYXJnczogYW55W10pID0+IGFueTtcclxuXHJcbi8qKlxyXG4gKiBDb21wb3NlcyBhIGFycmF5IG9mIGZ1bmN0aW9ucyBmcm9tIGxlZnQgdG8gcmlnaHQuIEV4YW1wbGU6XHJcbiAqXHJcbiAqICAgICAgY29tcG9zZShbZm4sIGZpbmFsXSkoc3RhdGUsIGFjdGlvbik7XHJcbiAqXHJcbiAqIHRoZW4gdGhlIGZ1bmNzIGhhdmUgYSBzaWduYXR1cmUgbGlrZTpcclxuICpcclxuICogICAgICBmdW5jdGlvbiBmbiAoc3RhdGUsIGFjdGlvbiwgbmV4dCkge1xyXG4gKiAgICAgICAgICBjb25zb2xlLmxvZygnaGVyZScsIHN0YXRlLCBhY3Rpb24sIG5leHQpO1xyXG4gKiAgICAgICAgICByZXR1cm4gbmV4dChzdGF0ZSwgYWN0aW9uKTtcclxuICogICAgICB9XHJcbiAqXHJcbiAqICAgICAgZnVuY3Rpb24gZmluYWwgKHN0YXRlLCBhY3Rpb24pIHtcclxuICogICAgICAgICAgY29uc29sZS5sb2coJ2hlcmUnLCBzdGF0ZSwgYWN0aW9uKTtcclxuICogICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gKiAgICAgIH1cclxuICpcclxuICogdGhlIGxhc3QgZnVuY3Rpb24gc2hvdWxkIG5vdCBjYWxsIGBuZXh0YC5cclxuICpcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNvbXBvc2UgPSAoZnVuY3M6IFN0YXRlRm5bXSkgPT4gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XHJcbiAgY29uc3QgY3VyciA9IGZ1bmNzLnNoaWZ0KCkhO1xyXG4gIHJldHVybiBjdXJyKC4uLmFyZ3MsICguLi5uZXh0QXJnczogYW55W10pID0+IGNvbXBvc2UoZnVuY3MpKC4uLm5leHRBcmdzKSk7XHJcbn07XHJcbiJdfQ==