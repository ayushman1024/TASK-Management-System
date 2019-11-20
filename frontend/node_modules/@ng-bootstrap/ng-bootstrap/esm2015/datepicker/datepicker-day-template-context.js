/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Context for the datepicker 'day' template in case you want to override the default one
 * @record
 */
export function DayTemplateContext() { }
if (false) {
    /**
     * Date that corresponds to the template. Same as 'date' property.
     * Can be used for convenience as a default template key, ex. 'let-d')
     *
     * \@since 3.3.0
     * @type {?}
     */
    DayTemplateContext.prototype.$implicit;
    /**
     * Month currently displayed by the datepicker
     * @type {?}
     */
    DayTemplateContext.prototype.currentMonth;
    /**
     * Any data you pass using `dayTemplateData` input in the datepicker
     *
     * \@since 3.3.0
     * @type {?|undefined}
     */
    DayTemplateContext.prototype.data;
    /**
     * Date that corresponds to the template
     * @type {?}
     */
    DayTemplateContext.prototype.date;
    /**
     * True if current date is disabled
     * @type {?}
     */
    DayTemplateContext.prototype.disabled;
    /**
     * True if current date is focused
     * @type {?}
     */
    DayTemplateContext.prototype.focused;
    /**
     * True if current date is selected
     * @type {?}
     */
    DayTemplateContext.prototype.selected;
    /**
     * True if current date is equal to 'NgbCalendar.getToday()'
     *
     * \@since 4.1.0
     * @type {?}
     */
    DayTemplateContext.prototype.today;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1kYXktdGVtcGxhdGUtY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLWRheS10ZW1wbGF0ZS1jb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUEsd0NBK0NDOzs7Ozs7Ozs7SUF4Q0MsdUNBQW1COzs7OztJQUtuQiwwQ0FBcUI7Ozs7Ozs7SUFPckIsa0NBQVc7Ozs7O0lBS1gsa0NBQWM7Ozs7O0lBS2Qsc0NBQWtCOzs7OztJQUtsQixxQ0FBaUI7Ozs7O0lBS2pCLHNDQUFrQjs7Ozs7OztJQU9sQixtQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XG4vKipcbiAqIENvbnRleHQgZm9yIHRoZSBkYXRlcGlja2VyICdkYXknIHRlbXBsYXRlIGluIGNhc2UgeW91IHdhbnQgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgb25lXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGF5VGVtcGxhdGVDb250ZXh0IHtcbiAgLyoqXG4gICAqIERhdGUgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgdGVtcGxhdGUuIFNhbWUgYXMgJ2RhdGUnIHByb3BlcnR5LlxuICAgKiBDYW4gYmUgdXNlZCBmb3IgY29udmVuaWVuY2UgYXMgYSBkZWZhdWx0IHRlbXBsYXRlIGtleSwgZXguICdsZXQtZCcpXG4gICAqXG4gICAqIEBzaW5jZSAzLjMuMFxuICAgKi9cbiAgJGltcGxpY2l0OiBOZ2JEYXRlO1xuXG4gIC8qKlxuICAgKiBNb250aCBjdXJyZW50bHkgZGlzcGxheWVkIGJ5IHRoZSBkYXRlcGlja2VyXG4gICAqL1xuICBjdXJyZW50TW9udGg6IG51bWJlcjtcblxuICAvKipcbiAgICogQW55IGRhdGEgeW91IHBhc3MgdXNpbmcgYGRheVRlbXBsYXRlRGF0YWAgaW5wdXQgaW4gdGhlIGRhdGVwaWNrZXJcbiAgICpcbiAgICogQHNpbmNlIDMuMy4wXG4gICAqL1xuICBkYXRhPzogYW55O1xuXG4gIC8qKlxuICAgKiBEYXRlIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIHRlbXBsYXRlXG4gICAqL1xuICBkYXRlOiBOZ2JEYXRlO1xuXG4gIC8qKlxuICAgKiBUcnVlIGlmIGN1cnJlbnQgZGF0ZSBpcyBkaXNhYmxlZFxuICAgKi9cbiAgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRydWUgaWYgY3VycmVudCBkYXRlIGlzIGZvY3VzZWRcbiAgICovXG4gIGZvY3VzZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRydWUgaWYgY3VycmVudCBkYXRlIGlzIHNlbGVjdGVkXG4gICAqL1xuICBzZWxlY3RlZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogVHJ1ZSBpZiBjdXJyZW50IGRhdGUgaXMgZXF1YWwgdG8gJ05nYkNhbGVuZGFyLmdldFRvZGF5KCknXG4gICAqXG4gICAqIEBzaW5jZSA0LjEuMFxuICAgKi9cbiAgdG9kYXk6IGJvb2xlYW47XG59XG4iXX0=