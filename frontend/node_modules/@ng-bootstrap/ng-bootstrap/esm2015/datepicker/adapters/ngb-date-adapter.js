/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { isInteger } from '../../util/util';
import * as i0 from "@angular/core";
/**
 * @return {?}
 */
export function NGB_DATEPICKER_DATE_ADAPTER_FACTORY() {
    return new NgbDateStructAdapter();
}
/**
 * An abstract class used as the DI token that does conversion between the internal
 * datepicker NgbDateStruct model and any provided user date model, ex. string, native date, etc.
 *
 * Adapter is used for conversion when binding datepicker to a model with forms, ex. [(ngModel)]="userDateModel"
 *
 * Default implementation assumes NgbDateStruct for user model as well.
 * @abstract
 * @template D
 */
export class NgbDateAdapter {
}
NgbDateAdapter.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY },] }
];
/** @nocollapse */ NgbDateAdapter.ngInjectableDef = i0.defineInjectable({ factory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY, token: NgbDateAdapter, providedIn: "root" });
if (false) {
    /**
     * Converts user-model date into an NgbDateStruct for internal use in the library
     * @abstract
     * @param {?} value
     * @return {?}
     */
    NgbDateAdapter.prototype.fromModel = function (value) { };
    /**
     * Converts internal date value NgbDateStruct to user-model date
     * The returned type is supposed to be of the same type as fromModel() input-value param
     * @abstract
     * @param {?} date
     * @return {?}
     */
    NgbDateAdapter.prototype.toModel = function (date) { };
}
export class NgbDateStructAdapter extends NgbDateAdapter {
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     * @param {?} date
     * @return {?}
     */
    fromModel(date) {
        return (date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)) ?
            { year: date.year, month: date.month, day: date.day } :
            null;
    }
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     * @param {?} date
     * @return {?}
     */
    toModel(date) {
        return (date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)) ?
            { year: date.year, month: date.month, day: date.day } :
            null;
    }
}
NgbDateStructAdapter.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9hZGFwdGVycy9uZ2ItZGF0ZS1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7QUFFMUMsTUFBTSxVQUFVLG1DQUFtQztJQUNqRCxPQUFPLElBQUksb0JBQW9CLEVBQUUsQ0FBQztBQUNwQyxDQUFDOzs7Ozs7Ozs7OztBQVdELE1BQU0sT0FBZ0IsY0FBYzs7O1lBRG5DLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLG1DQUFtQyxFQUFDOzs7Ozs7Ozs7O0lBSy9FLDBEQUE0Qzs7Ozs7Ozs7SUFNNUMsdURBQXlDOztBQUkzQyxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsY0FBNkI7Ozs7OztJQUlyRSxTQUFTLENBQUMsSUFBbUI7UUFDM0IsT0FBTyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkYsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDO0lBQ1gsQ0FBQzs7Ozs7O0lBS0QsT0FBTyxDQUFDLElBQW1CO1FBQ3pCLE9BQU8sQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25GLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQztJQUNYLENBQUM7OztZQWxCRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi4vbmdiLWRhdGUtc3RydWN0JztcbmltcG9ydCB7aXNJbnRlZ2VyfSBmcm9tICcuLi8uLi91dGlsL3V0aWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gTkdCX0RBVEVQSUNLRVJfREFURV9BREFQVEVSX0ZBQ1RPUlkoKSB7XG4gIHJldHVybiBuZXcgTmdiRGF0ZVN0cnVjdEFkYXB0ZXIoKTtcbn1cblxuLyoqXG4gKiBBbiBhYnN0cmFjdCBjbGFzcyB1c2VkIGFzIHRoZSBESSB0b2tlbiB0aGF0IGRvZXMgY29udmVyc2lvbiBiZXR3ZWVuIHRoZSBpbnRlcm5hbFxuICogZGF0ZXBpY2tlciBOZ2JEYXRlU3RydWN0IG1vZGVsIGFuZCBhbnkgcHJvdmlkZWQgdXNlciBkYXRlIG1vZGVsLCBleC4gc3RyaW5nLCBuYXRpdmUgZGF0ZSwgZXRjLlxuICpcbiAqIEFkYXB0ZXIgaXMgdXNlZCBmb3IgY29udmVyc2lvbiB3aGVuIGJpbmRpbmcgZGF0ZXBpY2tlciB0byBhIG1vZGVsIHdpdGggZm9ybXMsIGV4LiBbKG5nTW9kZWwpXT1cInVzZXJEYXRlTW9kZWxcIlxuICpcbiAqIERlZmF1bHQgaW1wbGVtZW50YXRpb24gYXNzdW1lcyBOZ2JEYXRlU3RydWN0IGZvciB1c2VyIG1vZGVsIGFzIHdlbGwuXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCcsIHVzZUZhY3Rvcnk6IE5HQl9EQVRFUElDS0VSX0RBVEVfQURBUFRFUl9GQUNUT1JZfSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JEYXRlQWRhcHRlcjxEPiB7XG4gIC8qKlxuICAgKiBDb252ZXJ0cyB1c2VyLW1vZGVsIGRhdGUgaW50byBhbiBOZ2JEYXRlU3RydWN0IGZvciBpbnRlcm5hbCB1c2UgaW4gdGhlIGxpYnJhcnlcbiAgICovXG4gIGFic3RyYWN0IGZyb21Nb2RlbCh2YWx1ZTogRCk6IE5nYkRhdGVTdHJ1Y3Q7XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGludGVybmFsIGRhdGUgdmFsdWUgTmdiRGF0ZVN0cnVjdCB0byB1c2VyLW1vZGVsIGRhdGVcbiAgICogVGhlIHJldHVybmVkIHR5cGUgaXMgc3VwcG9zZWQgdG8gYmUgb2YgdGhlIHNhbWUgdHlwZSBhcyBmcm9tTW9kZWwoKSBpbnB1dC12YWx1ZSBwYXJhbVxuICAgKi9cbiAgYWJzdHJhY3QgdG9Nb2RlbChkYXRlOiBOZ2JEYXRlU3RydWN0KTogRDtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVTdHJ1Y3RBZGFwdGVyIGV4dGVuZHMgTmdiRGF0ZUFkYXB0ZXI8TmdiRGF0ZVN0cnVjdD4ge1xuICAvKipcbiAgICogQ29udmVydHMgYSBOZ2JEYXRlU3RydWN0IHZhbHVlIGludG8gTmdiRGF0ZVN0cnVjdCB2YWx1ZVxuICAgKi9cbiAgZnJvbU1vZGVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBOZ2JEYXRlU3RydWN0IHtcbiAgICByZXR1cm4gKGRhdGUgJiYgaXNJbnRlZ2VyKGRhdGUueWVhcikgJiYgaXNJbnRlZ2VyKGRhdGUubW9udGgpICYmIGlzSW50ZWdlcihkYXRlLmRheSkpID9cbiAgICAgICAge3llYXI6IGRhdGUueWVhciwgbW9udGg6IGRhdGUubW9udGgsIGRheTogZGF0ZS5kYXl9IDpcbiAgICAgICAgbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIE5nYkRhdGVTdHJ1Y3QgdmFsdWUgaW50byBOZ2JEYXRlU3RydWN0IHZhbHVlXG4gICAqL1xuICB0b01vZGVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBOZ2JEYXRlU3RydWN0IHtcbiAgICByZXR1cm4gKGRhdGUgJiYgaXNJbnRlZ2VyKGRhdGUueWVhcikgJiYgaXNJbnRlZ2VyKGRhdGUubW9udGgpICYmIGlzSW50ZWdlcihkYXRlLmRheSkpID9cbiAgICAgICAge3llYXI6IGRhdGUueWVhciwgbW9udGg6IGRhdGUubW9udGgsIGRheTogZGF0ZS5kYXl9IDpcbiAgICAgICAgbnVsbDtcbiAgfVxufVxuIl19