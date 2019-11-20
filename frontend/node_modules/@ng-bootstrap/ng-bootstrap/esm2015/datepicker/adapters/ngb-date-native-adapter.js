/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NgbDateAdapter } from './ngb-date-adapter';
import { isInteger } from '../../util/util';
/**
 * NgbDateAdapter implementation that allows using native javascript date as a user date model.
 */
export class NgbDateNativeAdapter extends NgbDateAdapter {
    /**
     * Converts native date to a NgbDateStruct
     * @param {?} date
     * @return {?}
     */
    fromModel(date) {
        return (date instanceof Date && !isNaN(date.getTime())) ? this._fromNativeDate(date) : null;
    }
    /**
     * Converts a NgbDateStruct to a native date
     * @param {?} date
     * @return {?}
     */
    toModel(date) {
        return date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day) ? this._toNativeDate(date) :
            null;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    _fromNativeDate(date) {
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    _toNativeDate(date) {
        /** @type {?} */
        const jsDate = new Date(date.year, date.month - 1, date.day, 12);
        // avoid 30 -> 1930 conversion
        jsDate.setFullYear(date.year);
        return jsDate;
    }
}
NgbDateNativeAdapter.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLWRhdGUtbmF0aXZlLWFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXIvYWRhcHRlcnMvbmdiLWRhdGUtbmF0aXZlLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQU0xQyxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsY0FBb0I7Ozs7OztJQUk1RCxTQUFTLENBQUMsSUFBVTtRQUNsQixPQUFPLENBQUMsSUFBSSxZQUFZLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDOUYsQ0FBQzs7Ozs7O0lBS0QsT0FBTyxDQUFDLElBQW1CO1FBQ3pCLE9BQU8sSUFBSSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDO0lBQzdGLENBQUM7Ozs7O0lBRVMsZUFBZSxDQUFDLElBQVU7UUFDbEMsT0FBTyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBQyxDQUFDO0lBQ3JGLENBQUM7Ozs7O0lBRVMsYUFBYSxDQUFDLElBQW1COztjQUNuQyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztRQUNoRSw4QkFBOEI7UUFDOUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7O1lBMUJGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ2JEYXRlQWRhcHRlcn0gZnJvbSAnLi9uZ2ItZGF0ZS1hZGFwdGVyJztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi4vbmdiLWRhdGUtc3RydWN0JztcbmltcG9ydCB7aXNJbnRlZ2VyfSBmcm9tICcuLi8uLi91dGlsL3V0aWwnO1xuXG4vKipcbiogTmdiRGF0ZUFkYXB0ZXIgaW1wbGVtZW50YXRpb24gdGhhdCBhbGxvd3MgdXNpbmcgbmF0aXZlIGphdmFzY3JpcHQgZGF0ZSBhcyBhIHVzZXIgZGF0ZSBtb2RlbC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVOYXRpdmVBZGFwdGVyIGV4dGVuZHMgTmdiRGF0ZUFkYXB0ZXI8RGF0ZT4ge1xuICAvKipcbiAgICogQ29udmVydHMgbmF0aXZlIGRhdGUgdG8gYSBOZ2JEYXRlU3RydWN0XG4gICAqL1xuICBmcm9tTW9kZWwoZGF0ZTogRGF0ZSk6IE5nYkRhdGVTdHJ1Y3Qge1xuICAgIHJldHVybiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUgJiYgIWlzTmFOKGRhdGUuZ2V0VGltZSgpKSkgPyB0aGlzLl9mcm9tTmF0aXZlRGF0ZShkYXRlKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBOZ2JEYXRlU3RydWN0IHRvIGEgbmF0aXZlIGRhdGVcbiAgICovXG4gIHRvTW9kZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IERhdGUge1xuICAgIHJldHVybiBkYXRlICYmIGlzSW50ZWdlcihkYXRlLnllYXIpICYmIGlzSW50ZWdlcihkYXRlLm1vbnRoKSAmJiBpc0ludGVnZXIoZGF0ZS5kYXkpID8gdGhpcy5fdG9OYXRpdmVEYXRlKGRhdGUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2Zyb21OYXRpdmVEYXRlKGRhdGU6IERhdGUpOiBOZ2JEYXRlU3RydWN0IHtcbiAgICByZXR1cm4ge3llYXI6IGRhdGUuZ2V0RnVsbFllYXIoKSwgbW9udGg6IGRhdGUuZ2V0TW9udGgoKSArIDEsIGRheTogZGF0ZS5nZXREYXRlKCl9O1xuICB9XG5cbiAgcHJvdGVjdGVkIF90b05hdGl2ZURhdGUoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IERhdGUge1xuICAgIGNvbnN0IGpzRGF0ZSA9IG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCAtIDEsIGRhdGUuZGF5LCAxMik7XG4gICAgLy8gYXZvaWQgMzAgLT4gMTkzMCBjb252ZXJzaW9uXG4gICAganNEYXRlLnNldEZ1bGxZZWFyKGRhdGUueWVhcik7XG4gICAgcmV0dXJuIGpzRGF0ZTtcbiAgfVxufVxuIl19