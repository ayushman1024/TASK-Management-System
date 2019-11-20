/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgbDatepickerI18n } from '../datepicker-i18n';
import { hebrewNumerals, isHebrewLeapYear } from './hebrew';
import { Injectable } from '@angular/core';
/** @type {?} */
var WEEKDAYS = ['שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת', 'ראשון'];
/** @type {?} */
var MONTHS = ['תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר', 'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'];
/** @type {?} */
var MONTHS_LEAP = ['תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר א׳', 'אדר ב׳', 'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'];
/**
 * \@since 3.2.0
 */
var NgbDatepickerI18nHebrew = /** @class */ (function (_super) {
    tslib_1.__extends(NgbDatepickerI18nHebrew, _super);
    function NgbDatepickerI18nHebrew() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    NgbDatepickerI18nHebrew.prototype.getMonthShortName = /**
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    function (month, year) { return this.getMonthFullName(month, year); };
    /**
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    NgbDatepickerI18nHebrew.prototype.getMonthFullName = /**
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    function (month, year) {
        return isHebrewLeapYear(year) ? MONTHS_LEAP[month - 1] : MONTHS[month - 1];
    };
    /**
     * @param {?} weekday
     * @return {?}
     */
    NgbDatepickerI18nHebrew.prototype.getWeekdayShortName = /**
     * @param {?} weekday
     * @return {?}
     */
    function (weekday) { return WEEKDAYS[weekday - 1]; };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDatepickerI18nHebrew.prototype.getDayAriaLabel = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return hebrewNumerals(date.day) + " " + this.getMonthFullName(date.month, date.year) + " " + hebrewNumerals(date.year);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDatepickerI18nHebrew.prototype.getDayNumerals = /**
     * @param {?} date
     * @return {?}
     */
    function (date) { return hebrewNumerals(date.day); };
    /**
     * @param {?} weekNumber
     * @return {?}
     */
    NgbDatepickerI18nHebrew.prototype.getWeekNumerals = /**
     * @param {?} weekNumber
     * @return {?}
     */
    function (weekNumber) { return hebrewNumerals(weekNumber); };
    /**
     * @param {?} year
     * @return {?}
     */
    NgbDatepickerI18nHebrew.prototype.getYearNumerals = /**
     * @param {?} year
     * @return {?}
     */
    function (year) { return hebrewNumerals(year); };
    NgbDatepickerI18nHebrew.decorators = [
        { type: Injectable }
    ];
    return NgbDatepickerI18nHebrew;
}(NgbDatepickerI18n));
export { NgbDatepickerI18nHebrew };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pMThuLWhlYnJldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9oZWJyZXcvZGF0ZXBpY2tlci1pMThuLWhlYnJldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRXJELE9BQU8sRUFBQyxjQUFjLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDMUQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7SUFHbkMsUUFBUSxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDOztJQUNyRSxNQUFNLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQzs7SUFDcEcsV0FBVyxHQUNiLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDOzs7O0FBSzVHO0lBQzZDLG1EQUFpQjtJQUQ5RDs7SUFtQkEsQ0FBQzs7Ozs7O0lBakJDLG1EQUFpQjs7Ozs7SUFBakIsVUFBa0IsS0FBYSxFQUFFLElBQWEsSUFBWSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUFFdEcsa0RBQWdCOzs7OztJQUFoQixVQUFpQixLQUFhLEVBQUUsSUFBYTtRQUMzQyxPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzdFLENBQUM7Ozs7O0lBRUQscURBQW1COzs7O0lBQW5CLFVBQW9CLE9BQWUsSUFBWSxPQUFPLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUU5RSxpREFBZTs7OztJQUFmLFVBQWdCLElBQW1CO1FBQ2pDLE9BQVUsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQztJQUNwSCxDQUFDOzs7OztJQUVELGdEQUFjOzs7O0lBQWQsVUFBZSxJQUFtQixJQUFZLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRWhGLGlEQUFlOzs7O0lBQWYsVUFBZ0IsVUFBa0IsSUFBWSxPQUFPLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRWxGLGlEQUFlOzs7O0lBQWYsVUFBZ0IsSUFBWSxJQUFZLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBbEJ2RSxVQUFVOztJQW1CWCw4QkFBQztDQUFBLEFBbkJELENBQzZDLGlCQUFpQixHQWtCN0Q7U0FsQlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi4vZGF0ZXBpY2tlci1pMThuJztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi4vLi4vaW5kZXgnO1xuaW1wb3J0IHtoZWJyZXdOdW1lcmFscywgaXNIZWJyZXdMZWFwWWVhcn0gZnJvbSAnLi9oZWJyZXcnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5jb25zdCBXRUVLREFZUyA9IFsn16nXoNeZJywgJ9ep15zXmdep15knLCAn16jXkdeZ16LXmScsICfXl9ee15nXqdeZJywgJ9ep15nXqdeZJywgJ9ep15HXqicsICfXqNeQ16nXldefJ107XG5jb25zdCBNT05USFMgPSBbJ9eq16nXqNeZJywgJ9eX16nXldefJywgJ9eb16HXnNeVJywgJ9eY15HXqicsICfXqdeR15gnLCAn15DXk9eoJywgJ9eg15nXodefJywgJ9eQ15nXmdeoJywgJ9eh15nXldefJywgJ9eq157XldeWJywgJ9eQ15EnLCAn15DXnNeV15wnXTtcbmNvbnN0IE1PTlRIU19MRUFQID1cbiAgICBbJ9eq16nXqNeZJywgJ9eX16nXldefJywgJ9eb16HXnNeVJywgJ9eY15HXqicsICfXqdeR15gnLCAn15DXk9eoINeQ17MnLCAn15DXk9eoINeR17MnLCAn16DXmdeh158nLCAn15DXmdeZ16gnLCAn16HXmdeV158nLCAn16rXnteV15YnLCAn15DXkScsICfXkNec15XXnCddO1xuXG4vKipcbiAqIEBzaW5jZSAzLjIuMFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlckkxOG5IZWJyZXcgZXh0ZW5kcyBOZ2JEYXRlcGlja2VySTE4biB7XG4gIGdldE1vbnRoU2hvcnROYW1lKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5nZXRNb250aEZ1bGxOYW1lKG1vbnRoLCB5ZWFyKTsgfVxuXG4gIGdldE1vbnRoRnVsbE5hbWUobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGlzSGVicmV3TGVhcFllYXIoeWVhcikgPyBNT05USFNfTEVBUFttb250aCAtIDFdIDogTU9OVEhTW21vbnRoIC0gMV07XG4gIH1cblxuICBnZXRXZWVrZGF5U2hvcnROYW1lKHdlZWtkYXk6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiBXRUVLREFZU1t3ZWVrZGF5IC0gMV07IH1cblxuICBnZXREYXlBcmlhTGFiZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke2hlYnJld051bWVyYWxzKGRhdGUuZGF5KX0gJHt0aGlzLmdldE1vbnRoRnVsbE5hbWUoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKX0gJHtoZWJyZXdOdW1lcmFscyhkYXRlLnllYXIpfWA7XG4gIH1cblxuICBnZXREYXlOdW1lcmFscyhkYXRlOiBOZ2JEYXRlU3RydWN0KTogc3RyaW5nIHsgcmV0dXJuIGhlYnJld051bWVyYWxzKGRhdGUuZGF5KTsgfVxuXG4gIGdldFdlZWtOdW1lcmFscyh3ZWVrTnVtYmVyOiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gaGVicmV3TnVtZXJhbHMod2Vla051bWJlcik7IH1cblxuICBnZXRZZWFyTnVtZXJhbHMoeWVhcjogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIGhlYnJld051bWVyYWxzKHllYXIpOyB9XG59XG4iXX0=