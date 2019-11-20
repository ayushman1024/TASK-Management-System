/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Object freeze code
 * https://github.com/jsdf/deep-freeze
 * @type {?}
 */
export const deepFreeze = (/**
 * @param {?} o
 * @return {?}
 */
(o) => {
    Object.freeze(o);
    /** @type {?} */
    const oIsFunction = typeof o === 'function';
    /** @type {?} */
    const hasOwnProp = Object.prototype.hasOwnProperty;
    Object.getOwnPropertyNames(o).forEach((/**
     * @param {?} prop
     * @return {?}
     */
    function (prop) {
        if (hasOwnProp.call(o, prop) &&
            (oIsFunction ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments' : true) &&
            o[prop] !== null &&
            (typeof o[prop] === 'object' || typeof o[prop] === 'function') &&
            !Object.isFrozen(o[prop])) {
            deepFreeze(o[prop]);
        }
    }));
    return o;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJlZXplLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neHMvc3RvcmUvIiwic291cmNlcyI6WyJzcmMvdXRpbHMvZnJlZXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUlBLE1BQU0sT0FBTyxVQUFVOzs7O0FBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRTtJQUNuQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOztVQUVYLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBSyxVQUFVOztVQUNyQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjO0lBRWxELE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPOzs7O0lBQUMsVUFBUyxJQUFJO1FBQ2pELElBQ0UsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDO1lBQ3hCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3JGLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJO1lBQ2hCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLFVBQVUsQ0FBQztZQUM5RCxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ3pCO1lBQ0EsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQyxFQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBPYmplY3QgZnJlZXplIGNvZGVcclxuICogaHR0cHM6Ly9naXRodWIuY29tL2pzZGYvZGVlcC1mcmVlemVcclxuICovXHJcbmV4cG9ydCBjb25zdCBkZWVwRnJlZXplID0gKG86IGFueSkgPT4ge1xyXG4gIE9iamVjdC5mcmVlemUobyk7XHJcblxyXG4gIGNvbnN0IG9Jc0Z1bmN0aW9uID0gdHlwZW9mIG8gPT09ICdmdW5jdGlvbic7XHJcbiAgY29uc3QgaGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XHJcblxyXG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG8pLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xyXG4gICAgaWYgKFxyXG4gICAgICBoYXNPd25Qcm9wLmNhbGwobywgcHJvcCkgJiZcclxuICAgICAgKG9Jc0Z1bmN0aW9uID8gcHJvcCAhPT0gJ2NhbGxlcicgJiYgcHJvcCAhPT0gJ2NhbGxlZScgJiYgcHJvcCAhPT0gJ2FyZ3VtZW50cycgOiB0cnVlKSAmJlxyXG4gICAgICBvW3Byb3BdICE9PSBudWxsICYmXHJcbiAgICAgICh0eXBlb2Ygb1twcm9wXSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9bcHJvcF0gPT09ICdmdW5jdGlvbicpICYmXHJcbiAgICAgICFPYmplY3QuaXNGcm96ZW4ob1twcm9wXSlcclxuICAgICkge1xyXG4gICAgICBkZWVwRnJlZXplKG9bcHJvcF0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbztcclxufTtcclxuIl19