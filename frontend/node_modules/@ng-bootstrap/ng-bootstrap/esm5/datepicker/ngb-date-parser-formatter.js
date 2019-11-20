/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { padNumber, toInteger, isNumber } from '../util/util';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @return {?}
 */
export function NGB_DATEPICKER_PARSER_FORMATTER_FACTORY() {
    return new NgbDateISOParserFormatter();
}
/**
 * Abstract type serving as a DI token for the service parsing and formatting dates for the NgbInputDatepicker
 * directive. A default implementation using the ISO 8601 format is provided, but you can provide another implementation
 * to use an alternative format.
 * @abstract
 */
var NgbDateParserFormatter = /** @class */ (function () {
    function NgbDateParserFormatter() {
    }
    NgbDateParserFormatter.decorators = [
        { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY },] }
    ];
    /** @nocollapse */ NgbDateParserFormatter.ngInjectableDef = i0.defineInjectable({ factory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY, token: NgbDateParserFormatter, providedIn: "root" });
    return NgbDateParserFormatter;
}());
export { NgbDateParserFormatter };
if (false) {
    /**
     * Parses the given value to an NgbDateStruct. Implementations should try their best to provide a result, even
     * partial. They must return null if the value can't be parsed.
     * @abstract
     * @param {?} value the value to parse
     * @return {?}
     */
    NgbDateParserFormatter.prototype.parse = function (value) { };
    /**
     * Formats the given date to a string. Implementations should return an empty string if the given date is null,
     * and try their best to provide a partial result if the given date is incomplete or invalid.
     * @abstract
     * @param {?} date the date to format as a string
     * @return {?}
     */
    NgbDateParserFormatter.prototype.format = function (date) { };
}
var NgbDateISOParserFormatter = /** @class */ (function (_super) {
    tslib_1.__extends(NgbDateISOParserFormatter, _super);
    function NgbDateISOParserFormatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    NgbDateISOParserFormatter.prototype.parse = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value) {
            /** @type {?} */
            var dateParts = value.trim().split('-');
            if (dateParts.length === 1 && isNumber(dateParts[0])) {
                return { year: toInteger(dateParts[0]), month: null, day: null };
            }
            else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: null };
            }
            else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: toInteger(dateParts[2]) };
            }
        }
        return null;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDateISOParserFormatter.prototype.format = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date ?
            date.year + "-" + (isNumber(date.month) ? padNumber(date.month) : '') + "-" + (isNumber(date.day) ? padNumber(date.day) : '') :
            '';
    };
    NgbDateISOParserFormatter.decorators = [
        { type: Injectable }
    ];
    return NgbDateISOParserFormatter;
}(NgbDateParserFormatter));
export { NgbDateISOParserFormatter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtcGFyc2VyLWZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9uZ2ItZGF0ZS1wYXJzZXItZm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRTVELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7O0FBRXpDLE1BQU0sVUFBVSx1Q0FBdUM7SUFDckQsT0FBTyxJQUFJLHlCQUF5QixFQUFFLENBQUM7QUFDekMsQ0FBQzs7Ozs7OztBQU9EO0lBQUE7S0FlQzs7Z0JBZkEsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsdUNBQXVDLEVBQUM7OztpQ0FickY7Q0E0QkMsQUFmRCxJQWVDO1NBZHFCLHNCQUFzQjs7Ozs7Ozs7O0lBTTFDLDhEQUE2Qzs7Ozs7Ozs7SUFPN0MsOERBQTZDOztBQUcvQztJQUMrQyxxREFBc0I7SUFEckU7O0lBcUJBLENBQUM7Ozs7O0lBbkJDLHlDQUFLOzs7O0lBQUwsVUFBTSxLQUFhO1FBQ2pCLElBQUksS0FBSyxFQUFFOztnQkFDSCxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDekMsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3BELE9BQU8sRUFBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBQyxDQUFDO2FBQ2hFO2lCQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDckYsT0FBTyxFQUFDLElBQUksRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFDLENBQUM7YUFDbkY7aUJBQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDL0csT0FBTyxFQUFDLElBQUksRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7YUFDdEc7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFFRCwwQ0FBTTs7OztJQUFOLFVBQU8sSUFBbUI7UUFDeEIsT0FBTyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxJQUFJLFVBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBRSxDQUFDLENBQUM7WUFDdEgsRUFBRSxDQUFDO0lBQ1QsQ0FBQzs7Z0JBcEJGLFVBQVU7O0lBcUJYLGdDQUFDO0NBQUEsQUFyQkQsQ0FDK0Msc0JBQXNCLEdBb0JwRTtTQXBCWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3BhZE51bWJlciwgdG9JbnRlZ2VyLCBpc051bWJlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIE5HQl9EQVRFUElDS0VSX1BBUlNFUl9GT1JNQVRURVJfRkFDVE9SWSgpIHtcbiAgcmV0dXJuIG5ldyBOZ2JEYXRlSVNPUGFyc2VyRm9ybWF0dGVyKCk7XG59XG5cbi8qKlxuICogQWJzdHJhY3QgdHlwZSBzZXJ2aW5nIGFzIGEgREkgdG9rZW4gZm9yIHRoZSBzZXJ2aWNlIHBhcnNpbmcgYW5kIGZvcm1hdHRpbmcgZGF0ZXMgZm9yIHRoZSBOZ2JJbnB1dERhdGVwaWNrZXJcbiAqIGRpcmVjdGl2ZS4gQSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIHVzaW5nIHRoZSBJU08gODYwMSBmb3JtYXQgaXMgcHJvdmlkZWQsIGJ1dCB5b3UgY2FuIHByb3ZpZGUgYW5vdGhlciBpbXBsZW1lbnRhdGlvblxuICogdG8gdXNlIGFuIGFsdGVybmF0aXZlIGZvcm1hdC5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogTkdCX0RBVEVQSUNLRVJfUEFSU0VSX0ZPUk1BVFRFUl9GQUNUT1JZfSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyIHtcbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgZ2l2ZW4gdmFsdWUgdG8gYW4gTmdiRGF0ZVN0cnVjdC4gSW1wbGVtZW50YXRpb25zIHNob3VsZCB0cnkgdGhlaXIgYmVzdCB0byBwcm92aWRlIGEgcmVzdWx0LCBldmVuXG4gICAqIHBhcnRpYWwuIFRoZXkgbXVzdCByZXR1cm4gbnVsbCBpZiB0aGUgdmFsdWUgY2FuJ3QgYmUgcGFyc2VkLlxuICAgKiBAcGFyYW0gdmFsdWUgdGhlIHZhbHVlIHRvIHBhcnNlXG4gICAqL1xuICBhYnN0cmFjdCBwYXJzZSh2YWx1ZTogc3RyaW5nKTogTmdiRGF0ZVN0cnVjdDtcblxuICAvKipcbiAgICogRm9ybWF0cyB0aGUgZ2l2ZW4gZGF0ZSB0byBhIHN0cmluZy4gSW1wbGVtZW50YXRpb25zIHNob3VsZCByZXR1cm4gYW4gZW1wdHkgc3RyaW5nIGlmIHRoZSBnaXZlbiBkYXRlIGlzIG51bGwsXG4gICAqIGFuZCB0cnkgdGhlaXIgYmVzdCB0byBwcm92aWRlIGEgcGFydGlhbCByZXN1bHQgaWYgdGhlIGdpdmVuIGRhdGUgaXMgaW5jb21wbGV0ZSBvciBpbnZhbGlkLlxuICAgKiBAcGFyYW0gZGF0ZSB0aGUgZGF0ZSB0byBmb3JtYXQgYXMgYSBzdHJpbmdcbiAgICovXG4gIGFic3RyYWN0IGZvcm1hdChkYXRlOiBOZ2JEYXRlU3RydWN0KTogc3RyaW5nO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiRGF0ZUlTT1BhcnNlckZvcm1hdHRlciBleHRlbmRzIE5nYkRhdGVQYXJzZXJGb3JtYXR0ZXIge1xuICBwYXJzZSh2YWx1ZTogc3RyaW5nKTogTmdiRGF0ZVN0cnVjdCB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBjb25zdCBkYXRlUGFydHMgPSB2YWx1ZS50cmltKCkuc3BsaXQoJy0nKTtcbiAgICAgIGlmIChkYXRlUGFydHMubGVuZ3RoID09PSAxICYmIGlzTnVtYmVyKGRhdGVQYXJ0c1swXSkpIHtcbiAgICAgICAgcmV0dXJuIHt5ZWFyOiB0b0ludGVnZXIoZGF0ZVBhcnRzWzBdKSwgbW9udGg6IG51bGwsIGRheTogbnVsbH07XG4gICAgICB9IGVsc2UgaWYgKGRhdGVQYXJ0cy5sZW5ndGggPT09IDIgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzBdKSAmJiBpc051bWJlcihkYXRlUGFydHNbMV0pKSB7XG4gICAgICAgIHJldHVybiB7eWVhcjogdG9JbnRlZ2VyKGRhdGVQYXJ0c1swXSksIG1vbnRoOiB0b0ludGVnZXIoZGF0ZVBhcnRzWzFdKSwgZGF5OiBudWxsfTtcbiAgICAgIH0gZWxzZSBpZiAoZGF0ZVBhcnRzLmxlbmd0aCA9PT0gMyAmJiBpc051bWJlcihkYXRlUGFydHNbMF0pICYmIGlzTnVtYmVyKGRhdGVQYXJ0c1sxXSkgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzJdKSkge1xuICAgICAgICByZXR1cm4ge3llYXI6IHRvSW50ZWdlcihkYXRlUGFydHNbMF0pLCBtb250aDogdG9JbnRlZ2VyKGRhdGVQYXJ0c1sxXSksIGRheTogdG9JbnRlZ2VyKGRhdGVQYXJ0c1syXSl9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZvcm1hdChkYXRlOiBOZ2JEYXRlU3RydWN0KTogc3RyaW5nIHtcbiAgICByZXR1cm4gZGF0ZSA/XG4gICAgICAgIGAke2RhdGUueWVhcn0tJHtpc051bWJlcihkYXRlLm1vbnRoKSA/IHBhZE51bWJlcihkYXRlLm1vbnRoKSA6ICcnfS0ke2lzTnVtYmVyKGRhdGUuZGF5KSA/IHBhZE51bWJlcihkYXRlLmRheSkgOiAnJ31gIDpcbiAgICAgICAgJyc7XG4gIH1cbn1cbiJdfQ==