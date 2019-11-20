/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { isInteger } from '../util/util';
/**
 * Simple class used for a date representation that datepicker also uses internally
 *
 * \@since 3.0.0
 */
var /**
 * Simple class used for a date representation that datepicker also uses internally
 *
 * \@since 3.0.0
 */
NgbDate = /** @class */ (function () {
    function NgbDate(year, month, day) {
        this.year = isInteger(year) ? year : null;
        this.month = isInteger(month) ? month : null;
        this.day = isInteger(day) ? day : null;
    }
    /**
     * Static method. Creates a new date object from the NgbDateStruct, ex. NgbDate.from({year: 2000,
     * month: 5, day: 1}). If the 'date' is already of NgbDate, the method will return the same object
     */
    /**
     * Static method. Creates a new date object from the NgbDateStruct, ex. NgbDate.from({year: 2000,
     * month: 5, day: 1}). If the 'date' is already of NgbDate, the method will return the same object
     * @param {?} date
     * @return {?}
     */
    NgbDate.from = /**
     * Static method. Creates a new date object from the NgbDateStruct, ex. NgbDate.from({year: 2000,
     * month: 5, day: 1}). If the 'date' is already of NgbDate, the method will return the same object
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (date instanceof NgbDate) {
            return date;
        }
        return date ? new NgbDate(date.year, date.month, date.day) : null;
    };
    /**
     * Checks if current date is equal to another date
     */
    /**
     * Checks if current date is equal to another date
     * @param {?} other
     * @return {?}
     */
    NgbDate.prototype.equals = /**
     * Checks if current date is equal to another date
     * @param {?} other
     * @return {?}
     */
    function (other) {
        return other && this.year === other.year && this.month === other.month && this.day === other.day;
    };
    /**
     * Checks if current date is before another date
     */
    /**
     * Checks if current date is before another date
     * @param {?} other
     * @return {?}
     */
    NgbDate.prototype.before = /**
     * Checks if current date is before another date
     * @param {?} other
     * @return {?}
     */
    function (other) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day < other.day;
            }
            else {
                return this.month < other.month;
            }
        }
        else {
            return this.year < other.year;
        }
    };
    /**
     * Checks if current date is after another date
     */
    /**
     * Checks if current date is after another date
     * @param {?} other
     * @return {?}
     */
    NgbDate.prototype.after = /**
     * Checks if current date is after another date
     * @param {?} other
     * @return {?}
     */
    function (other) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day > other.day;
            }
            else {
                return this.month > other.month;
            }
        }
        else {
            return this.year > other.year;
        }
    };
    return NgbDate;
}());
/**
 * Simple class used for a date representation that datepicker also uses internally
 *
 * \@since 3.0.0
 */
export { NgbDate };
if (false) {
    /**
     * The year, for example 2016
     * @type {?}
     */
    NgbDate.prototype.year;
    /**
     * The month, for example 1=Jan ... 12=Dec as in ISO 8601
     * @type {?}
     */
    NgbDate.prototype.month;
    /**
     * The day of month, starting with 1
     * @type {?}
     */
    NgbDate.prototype.day;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXIvbmdiLWRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7OztBQU92Qzs7Ozs7O0lBMkJFLGlCQUFZLElBQVksRUFBRSxLQUFhLEVBQUUsR0FBVztRQUNsRCxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN6QyxDQUFDO0lBZkQ7OztPQUdHOzs7Ozs7O0lBQ0ksWUFBSTs7Ozs7O0lBQVgsVUFBWSxJQUFtQjtRQUM3QixJQUFJLElBQUksWUFBWSxPQUFPLEVBQUU7WUFDM0IsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDcEUsQ0FBQztJQVFEOztPQUVHOzs7Ozs7SUFDSCx3QkFBTTs7Ozs7SUFBTixVQUFPLEtBQW9CO1FBQ3pCLE9BQU8sS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ25HLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsd0JBQU07Ozs7O0lBQU4sVUFBTyxLQUFvQjtRQUN6QixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUM5QixPQUFPLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDOUQ7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDakM7U0FDRjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDL0I7SUFDSCxDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNILHVCQUFLOzs7OztJQUFMLFVBQU0sS0FBb0I7UUFDeEIsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksRUFBRTtZQUM1QixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDOUIsT0FBTyxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2FBQzlEO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO2FBQ2pDO1NBQ0Y7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQy9CO0lBQ0gsQ0FBQztJQUNILGNBQUM7QUFBRCxDQUFDLEFBNUVELElBNEVDOzs7Ozs7Ozs7Ozs7SUF4RUMsdUJBQWE7Ozs7O0lBS2Isd0JBQWM7Ozs7O0lBS2Qsc0JBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcbmltcG9ydCB7aXNJbnRlZ2VyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuXG4vKipcbiAqIFNpbXBsZSBjbGFzcyB1c2VkIGZvciBhIGRhdGUgcmVwcmVzZW50YXRpb24gdGhhdCBkYXRlcGlja2VyIGFsc28gdXNlcyBpbnRlcm5hbGx5XG4gKlxuICogQHNpbmNlIDMuMC4wXG4gKi9cbmV4cG9ydCBjbGFzcyBOZ2JEYXRlIGltcGxlbWVudHMgTmdiRGF0ZVN0cnVjdCB7XG4gIC8qKlxuICAgKiBUaGUgeWVhciwgZm9yIGV4YW1wbGUgMjAxNlxuICAgKi9cbiAgeWVhcjogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgbW9udGgsIGZvciBleGFtcGxlIDE9SmFuIC4uLiAxMj1EZWMgYXMgaW4gSVNPIDg2MDFcbiAgICovXG4gIG1vbnRoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgb2YgbW9udGgsIHN0YXJ0aW5nIHdpdGggMVxuICAgKi9cbiAgZGF5OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBtZXRob2QuIENyZWF0ZXMgYSBuZXcgZGF0ZSBvYmplY3QgZnJvbSB0aGUgTmdiRGF0ZVN0cnVjdCwgZXguIE5nYkRhdGUuZnJvbSh7eWVhcjogMjAwMCxcbiAgICogbW9udGg6IDUsIGRheTogMX0pLiBJZiB0aGUgJ2RhdGUnIGlzIGFscmVhZHkgb2YgTmdiRGF0ZSwgdGhlIG1ldGhvZCB3aWxsIHJldHVybiB0aGUgc2FtZSBvYmplY3RcbiAgICovXG4gIHN0YXRpYyBmcm9tKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBOZ2JEYXRlIHtcbiAgICBpZiAoZGF0ZSBpbnN0YW5jZW9mIE5nYkRhdGUpIHtcbiAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgICByZXR1cm4gZGF0ZSA/IG5ldyBOZ2JEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgZGF0ZS5kYXkpIDogbnVsbDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF5OiBudW1iZXIpIHtcbiAgICB0aGlzLnllYXIgPSBpc0ludGVnZXIoeWVhcikgPyB5ZWFyIDogbnVsbDtcbiAgICB0aGlzLm1vbnRoID0gaXNJbnRlZ2VyKG1vbnRoKSA/IG1vbnRoIDogbnVsbDtcbiAgICB0aGlzLmRheSA9IGlzSW50ZWdlcihkYXkpID8gZGF5IDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgY3VycmVudCBkYXRlIGlzIGVxdWFsIHRvIGFub3RoZXIgZGF0ZVxuICAgKi9cbiAgZXF1YWxzKG90aGVyOiBOZ2JEYXRlU3RydWN0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG90aGVyICYmIHRoaXMueWVhciA9PT0gb3RoZXIueWVhciAmJiB0aGlzLm1vbnRoID09PSBvdGhlci5tb250aCAmJiB0aGlzLmRheSA9PT0gb3RoZXIuZGF5O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBjdXJyZW50IGRhdGUgaXMgYmVmb3JlIGFub3RoZXIgZGF0ZVxuICAgKi9cbiAgYmVmb3JlKG90aGVyOiBOZ2JEYXRlU3RydWN0KTogYm9vbGVhbiB7XG4gICAgaWYgKCFvdGhlcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnllYXIgPT09IG90aGVyLnllYXIpIHtcbiAgICAgIGlmICh0aGlzLm1vbnRoID09PSBvdGhlci5tb250aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXkgPT09IG90aGVyLmRheSA/IGZhbHNlIDogdGhpcy5kYXkgPCBvdGhlci5kYXk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5tb250aCA8IG90aGVyLm1vbnRoO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy55ZWFyIDwgb3RoZXIueWVhcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGN1cnJlbnQgZGF0ZSBpcyBhZnRlciBhbm90aGVyIGRhdGVcbiAgICovXG4gIGFmdGVyKG90aGVyOiBOZ2JEYXRlU3RydWN0KTogYm9vbGVhbiB7XG4gICAgaWYgKCFvdGhlcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy55ZWFyID09PSBvdGhlci55ZWFyKSB7XG4gICAgICBpZiAodGhpcy5tb250aCA9PT0gb3RoZXIubW9udGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF5ID09PSBvdGhlci5kYXkgPyBmYWxzZSA6IHRoaXMuZGF5ID4gb3RoZXIuZGF5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9udGggPiBvdGhlci5tb250aDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMueWVhciA+IG90aGVyLnllYXI7XG4gICAgfVxuICB9XG59XG4iXX0=