/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} value
 * @return {?}
 */
export function toInteger(value) {
    return parseInt(`${value}`, 10);
}
/**
 * @param {?} value
 * @return {?}
 */
export function toString(value) {
    return (value !== undefined && value !== null) ? `${value}` : '';
}
/**
 * @param {?} value
 * @param {?} max
 * @param {?=} min
 * @return {?}
 */
export function getValueInRange(value, max, min = 0) {
    return Math.max(Math.min(value, max), min);
}
/**
 * @param {?} value
 * @return {?}
 */
export function isString(value) {
    return typeof value === 'string';
}
/**
 * @param {?} value
 * @return {?}
 */
export function isNumber(value) {
    return !isNaN(toInteger(value));
}
/**
 * @param {?} value
 * @return {?}
 */
export function isInteger(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
/**
 * @param {?} value
 * @return {?}
 */
export function isDefined(value) {
    return value !== undefined && value !== null;
}
/**
 * @param {?} value
 * @return {?}
 */
export function padNumber(value) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    }
    else {
        return '';
    }
}
/**
 * @param {?} text
 * @return {?}
 */
export function regExpEscape(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
/**
 * @param {?} element
 * @param {?} className
 * @return {?}
 */
export function hasClassName(element, className) {
    return element && element.className && element.className.split &&
        element.className.split(/\s+/).indexOf(className) >= 0;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidXRpbC91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsTUFBTSxVQUFVLFNBQVMsQ0FBQyxLQUFVO0lBQ2xDLE9BQU8sUUFBUSxDQUFDLEdBQUcsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDbEMsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUFDLEtBQVU7SUFDakMsT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbkUsQ0FBQzs7Ozs7OztBQUVELE1BQU0sVUFBVSxlQUFlLENBQUMsS0FBYSxFQUFFLEdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUNqRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDN0MsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUFDLEtBQVU7SUFDakMsT0FBTyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUM7QUFDbkMsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUFDLEtBQVU7SUFDakMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNsQyxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsS0FBVTtJQUNsQyxPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUM7QUFDckYsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsU0FBUyxDQUFDLEtBQVU7SUFDbEMsT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUM7QUFDL0MsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsU0FBUyxDQUFDLEtBQWE7SUFDckMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDbkIsT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzlCO1NBQU07UUFDTCxPQUFPLEVBQUUsQ0FBQztLQUNYO0FBQ0gsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLElBQUk7SUFDL0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzFELENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxZQUFZLENBQUMsT0FBWSxFQUFFLFNBQWlCO0lBQzFELE9BQU8sT0FBTyxJQUFJLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLO1FBQzFELE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiB0b0ludGVnZXIodmFsdWU6IGFueSk6IG51bWJlciB7XG4gIHJldHVybiBwYXJzZUludChgJHt2YWx1ZX1gLCAxMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1N0cmluZyh2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgcmV0dXJuICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSA/IGAke3ZhbHVlfWAgOiAnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlSW5SYW5nZSh2YWx1ZTogbnVtYmVyLCBtYXg6IG51bWJlciwgbWluID0gMCk6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLm1heChNYXRoLm1pbih2YWx1ZSwgbWF4KSwgbWluKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBzdHJpbmcge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBudW1iZXIge1xuICByZXR1cm4gIWlzTmFOKHRvSW50ZWdlcih2YWx1ZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBudW1iZXIge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2YWx1ZSkgJiYgTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEZWZpbmVkKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYWROdW1iZXIodmFsdWU6IG51bWJlcikge1xuICBpZiAoaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgcmV0dXJuIGAwJHt2YWx1ZX1gLnNsaWNlKC0yKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ0V4cEVzY2FwZSh0ZXh0KSB7XG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoL1stW1xcXXt9KCkqKz8uLFxcXFxeJHwjXFxzXS9nLCAnXFxcXCQmJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNDbGFzc05hbWUoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gZWxlbWVudCAmJiBlbGVtZW50LmNsYXNzTmFtZSAmJiBlbGVtZW50LmNsYXNzTmFtZS5zcGxpdCAmJlxuICAgICAgZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoL1xccysvKS5pbmRleE9mKGNsYXNzTmFtZSkgPj0gMDtcbn1cbiJdfQ==