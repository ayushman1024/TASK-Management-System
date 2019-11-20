/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Object freeze code
 * https://github.com/jsdf/deep-freeze
 * @type {?}
 */
export var deepFreeze = (/**
 * @param {?} o
 * @return {?}
 */
function (o) {
    Object.freeze(o);
    /** @type {?} */
    var oIsFunction = typeof o === 'function';
    /** @type {?} */
    var hasOwnProp = Object.prototype.hasOwnProperty;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJlZXplLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neHMvc3RvcmUvIiwic291cmNlcyI6WyJzcmMvdXRpbHMvZnJlZXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUlBLE1BQU0sS0FBTyxVQUFVOzs7O0FBQUcsVUFBQyxDQUFNO0lBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBRVgsV0FBVyxHQUFHLE9BQU8sQ0FBQyxLQUFLLFVBQVU7O1FBQ3JDLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWM7SUFFbEQsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87Ozs7SUFBQyxVQUFTLElBQUk7UUFDakQsSUFDRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7WUFDeEIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDckYsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUk7WUFDaEIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssVUFBVSxDQUFDO1lBQzlELENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDekI7WUFDQSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDckI7SUFDSCxDQUFDLEVBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIE9iamVjdCBmcmVlemUgY29kZVxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vanNkZi9kZWVwLWZyZWV6ZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGRlZXBGcmVlemUgPSAobzogYW55KSA9PiB7XHJcbiAgT2JqZWN0LmZyZWV6ZShvKTtcclxuXHJcbiAgY29uc3Qgb0lzRnVuY3Rpb24gPSB0eXBlb2YgbyA9PT0gJ2Z1bmN0aW9uJztcclxuICBjb25zdCBoYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxuXHJcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobykuZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGhhc093blByb3AuY2FsbChvLCBwcm9wKSAmJlxyXG4gICAgICAob0lzRnVuY3Rpb24gPyBwcm9wICE9PSAnY2FsbGVyJyAmJiBwcm9wICE9PSAnY2FsbGVlJyAmJiBwcm9wICE9PSAnYXJndW1lbnRzJyA6IHRydWUpICYmXHJcbiAgICAgIG9bcHJvcF0gIT09IG51bGwgJiZcclxuICAgICAgKHR5cGVvZiBvW3Byb3BdID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb1twcm9wXSA9PT0gJ2Z1bmN0aW9uJykgJiZcclxuICAgICAgIU9iamVjdC5pc0Zyb3plbihvW3Byb3BdKVxyXG4gICAgKSB7XHJcbiAgICAgIGRlZXBGcmVlemUob1twcm9wXSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBvO1xyXG59O1xyXG4iXX0=