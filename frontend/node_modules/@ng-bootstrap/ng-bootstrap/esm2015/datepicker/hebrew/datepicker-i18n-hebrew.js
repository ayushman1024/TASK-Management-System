/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgbDatepickerI18n } from '../datepicker-i18n';
import { hebrewNumerals, isHebrewLeapYear } from './hebrew';
import { Injectable } from '@angular/core';
/** @type {?} */
const WEEKDAYS = ['שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת', 'ראשון'];
/** @type {?} */
const MONTHS = ['תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר', 'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'];
/** @type {?} */
const MONTHS_LEAP = ['תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר א׳', 'אדר ב׳', 'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'];
/**
 * \@since 3.2.0
 */
export class NgbDatepickerI18nHebrew extends NgbDatepickerI18n {
    /**
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    getMonthShortName(month, year) { return this.getMonthFullName(month, year); }
    /**
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    getMonthFullName(month, year) {
        return isHebrewLeapYear(year) ? MONTHS_LEAP[month - 1] : MONTHS[month - 1];
    }
    /**
     * @param {?} weekday
     * @return {?}
     */
    getWeekdayShortName(weekday) { return WEEKDAYS[weekday - 1]; }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayAriaLabel(date) {
        return `${hebrewNumerals(date.day)} ${this.getMonthFullName(date.month, date.year)} ${hebrewNumerals(date.year)}`;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayNumerals(date) { return hebrewNumerals(date.day); }
    /**
     * @param {?} weekNumber
     * @return {?}
     */
    getWeekNumerals(weekNumber) { return hebrewNumerals(weekNumber); }
    /**
     * @param {?} year
     * @return {?}
     */
    getYearNumerals(year) { return hebrewNumerals(year); }
}
NgbDatepickerI18nHebrew.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pMThuLWhlYnJldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9oZWJyZXcvZGF0ZXBpY2tlci1pMThuLWhlYnJldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFckQsT0FBTyxFQUFDLGNBQWMsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUMxRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztNQUduQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUM7O01BQ3JFLE1BQU0sR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDOztNQUNwRyxXQUFXLEdBQ2IsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUM7Ozs7QUFNNUcsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGlCQUFpQjs7Ozs7O0lBQzVELGlCQUFpQixDQUFDLEtBQWEsRUFBRSxJQUFhLElBQVksT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBRXRHLGdCQUFnQixDQUFDLEtBQWEsRUFBRSxJQUFhO1FBQzNDLE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQzs7Ozs7SUFFRCxtQkFBbUIsQ0FBQyxPQUFlLElBQVksT0FBTyxRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFOUUsZUFBZSxDQUFDLElBQW1CO1FBQ2pDLE9BQU8sR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDcEgsQ0FBQzs7Ozs7SUFFRCxjQUFjLENBQUMsSUFBbUIsSUFBWSxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUVoRixlQUFlLENBQUMsVUFBa0IsSUFBWSxPQUFPLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRWxGLGVBQWUsQ0FBQyxJQUFZLElBQVksT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7WUFsQnZFLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nYkRhdGVwaWNrZXJJMThufSBmcm9tICcuLi9kYXRlcGlja2VyLWkxOG4nO1xuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuLi8uLi9pbmRleCc7XG5pbXBvcnQge2hlYnJld051bWVyYWxzLCBpc0hlYnJld0xlYXBZZWFyfSBmcm9tICcuL2hlYnJldyc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbmNvbnN0IFdFRUtEQVlTID0gWyfXqdeg15knLCAn16nXnNeZ16nXmScsICfXqNeR15nXoteZJywgJ9eX157Xmdep15knLCAn16nXmdep15knLCAn16nXkdeqJywgJ9eo15DXqdeV158nXTtcbmNvbnN0IE1PTlRIUyA9IFsn16rXqdeo15knLCAn15fXqdeV158nLCAn15vXodec15UnLCAn15jXkdeqJywgJ9ep15HXmCcsICfXkNeT16gnLCAn16DXmdeh158nLCAn15DXmdeZ16gnLCAn16HXmdeV158nLCAn16rXnteV15YnLCAn15DXkScsICfXkNec15XXnCddO1xuY29uc3QgTU9OVEhTX0xFQVAgPVxuICAgIFsn16rXqdeo15knLCAn15fXqdeV158nLCAn15vXodec15UnLCAn15jXkdeqJywgJ9ep15HXmCcsICfXkNeT16gg15DXsycsICfXkNeT16gg15HXsycsICfXoNeZ16HXnycsICfXkNeZ15nXqCcsICfXodeZ15XXnycsICfXqtee15XXlicsICfXkNeRJywgJ9eQ15zXldecJ107XG5cbi8qKlxuICogQHNpbmNlIDMuMi4wXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VySTE4bkhlYnJldyBleHRlbmRzIE5nYkRhdGVwaWNrZXJJMThuIHtcbiAgZ2V0TW9udGhTaG9ydE5hbWUobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IHN0cmluZyB7IHJldHVybiB0aGlzLmdldE1vbnRoRnVsbE5hbWUobW9udGgsIHllYXIpOyB9XG5cbiAgZ2V0TW9udGhGdWxsTmFtZShtb250aDogbnVtYmVyLCB5ZWFyPzogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXNIZWJyZXdMZWFwWWVhcih5ZWFyKSA/IE1PTlRIU19MRUFQW21vbnRoIC0gMV0gOiBNT05USFNbbW9udGggLSAxXTtcbiAgfVxuXG4gIGdldFdlZWtkYXlTaG9ydE5hbWUod2Vla2RheTogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIFdFRUtEQVlTW3dlZWtkYXkgLSAxXTsgfVxuXG4gIGdldERheUFyaWFMYWJlbChkYXRlOiBOZ2JEYXRlU3RydWN0KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7aGVicmV3TnVtZXJhbHMoZGF0ZS5kYXkpfSAke3RoaXMuZ2V0TW9udGhGdWxsTmFtZShkYXRlLm1vbnRoLCBkYXRlLnllYXIpfSAke2hlYnJld051bWVyYWxzKGRhdGUueWVhcil9YDtcbiAgfVxuXG4gIGdldERheU51bWVyYWxzKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBzdHJpbmcgeyByZXR1cm4gaGVicmV3TnVtZXJhbHMoZGF0ZS5kYXkpOyB9XG5cbiAgZ2V0V2Vla051bWVyYWxzKHdlZWtOdW1iZXI6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiBoZWJyZXdOdW1lcmFscyh3ZWVrTnVtYmVyKTsgfVxuXG4gIGdldFllYXJOdW1lcmFscyh5ZWFyOiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gaGVicmV3TnVtZXJhbHMoeWVhcik7IH1cbn1cbiJdfQ==