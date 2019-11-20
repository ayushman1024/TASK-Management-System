/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export const compose = (/**
 * @param {?} funcs
 * @return {?}
 */
(funcs) => (/**
 * @param {...?} args
 * @return {?}
 */
(...args) => {
    /** @type {?} */
    const curr = (/** @type {?} */ (funcs.shift()));
    return curr(...args, (/**
     * @param {...?} nextArgs
     * @return {?}
     */
    (...nextArgs) => compose(funcs)(...nextArgs)));
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9zZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3hzL3N0b3JlLyIsInNvdXJjZXMiOlsic3JjL3V0aWxzL2NvbXBvc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsTUFBTSxPQUFPLE9BQU87Ozs7QUFBRyxDQUFDLEtBQWdCLEVBQUUsRUFBRTs7OztBQUFDLENBQUMsR0FBRyxJQUFXLEVBQUUsRUFBRTs7VUFDeEQsSUFBSSxHQUFHLG1CQUFBLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBQztJQUMzQixPQUFPLElBQUksQ0FBQyxHQUFHLElBQUk7Ozs7SUFBRSxDQUFDLEdBQUcsUUFBZSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsRUFBQyxDQUFDO0FBQzVFLENBQUMsQ0FBQSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHR5cGUgU3RhdGVGbiA9ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xyXG5cclxuLyoqXHJcbiAqIENvbXBvc2VzIGEgYXJyYXkgb2YgZnVuY3Rpb25zIGZyb20gbGVmdCB0byByaWdodC4gRXhhbXBsZTpcclxuICpcclxuICogICAgICBjb21wb3NlKFtmbiwgZmluYWxdKShzdGF0ZSwgYWN0aW9uKTtcclxuICpcclxuICogdGhlbiB0aGUgZnVuY3MgaGF2ZSBhIHNpZ25hdHVyZSBsaWtlOlxyXG4gKlxyXG4gKiAgICAgIGZ1bmN0aW9uIGZuIChzdGF0ZSwgYWN0aW9uLCBuZXh0KSB7XHJcbiAqICAgICAgICAgIGNvbnNvbGUubG9nKCdoZXJlJywgc3RhdGUsIGFjdGlvbiwgbmV4dCk7XHJcbiAqICAgICAgICAgIHJldHVybiBuZXh0KHN0YXRlLCBhY3Rpb24pO1xyXG4gKiAgICAgIH1cclxuICpcclxuICogICAgICBmdW5jdGlvbiBmaW5hbCAoc3RhdGUsIGFjdGlvbikge1xyXG4gKiAgICAgICAgICBjb25zb2xlLmxvZygnaGVyZScsIHN0YXRlLCBhY3Rpb24pO1xyXG4gKiAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAqICAgICAgfVxyXG4gKlxyXG4gKiB0aGUgbGFzdCBmdW5jdGlvbiBzaG91bGQgbm90IGNhbGwgYG5leHRgLlxyXG4gKlxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY29tcG9zZSA9IChmdW5jczogU3RhdGVGbltdKSA9PiAoLi4uYXJnczogYW55W10pID0+IHtcclxuICBjb25zdCBjdXJyID0gZnVuY3Muc2hpZnQoKSE7XHJcbiAgcmV0dXJuIGN1cnIoLi4uYXJncywgKC4uLm5leHRBcmdzOiBhbnlbXSkgPT4gY29tcG9zZShmdW5jcykoLi4ubmV4dEFyZ3MpKTtcclxufTtcclxuIl19