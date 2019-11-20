/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { NavigationEvent } from './datepicker-view-model';
import { NgbDate } from './ngb-date';
import { NgbDatepickerI18n } from './datepicker-i18n';
export class NgbDatepickerNavigation {
    /**
     * @param {?} i18n
     */
    constructor(i18n) {
        this.i18n = i18n;
        this.navigation = NavigationEvent;
        this.months = [];
        this.navigate = new EventEmitter();
        this.select = new EventEmitter();
    }
}
NgbDatepickerNavigation.decorators = [
    { type: Component, args: [{
                selector: 'ngb-datepicker-navigation',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <div class="ngb-dp-arrow">
      <button type="button" class="btn btn-link ngb-dp-arrow-btn" (click)="navigate.emit(navigation.PREV)" [disabled]="prevDisabled"
              i18n-aria-label="@@ngb.datepicker.previous-month" aria-label="Previous month"
              i18n-title="@@ngb.datepicker.previous-month" title="Previous month">
        <span class="ngb-dp-navigation-chevron"></span>
      </button>
    </div>
    <ngb-datepicker-navigation-select *ngIf="showSelect" class="ngb-dp-navigation-select"
      [date]="date"
      [disabled] = "disabled"
      [months]="selectBoxes.months"
      [years]="selectBoxes.years"
      (select)="select.emit($event)">
    </ngb-datepicker-navigation-select>

    <ng-template *ngIf="!showSelect" ngFor let-month [ngForOf]="months" let-i="index">
      <div class="ngb-dp-arrow" *ngIf="i > 0"></div>
      <div class="ngb-dp-month-name">
        {{ i18n.getMonthFullName(month.number, month.year) }} {{ i18n.getYearNumerals(month.year) }}
      </div>
      <div class="ngb-dp-arrow" *ngIf="i !== months.length - 1"></div>
    </ng-template>
    <div class="ngb-dp-arrow right">
      <button type="button" class="btn btn-link ngb-dp-arrow-btn" (click)="navigate.emit(navigation.NEXT)" [disabled]="nextDisabled"
              i18n-aria-label="@@ngb.datepicker.next-month" aria-label="Next month"
              i18n-title="@@ngb.datepicker.next-month" title="Next month">
        <span class="ngb-dp-navigation-chevron"></span>
      </button>
    </div>
    `,
                styles: ["ngb-datepicker-navigation{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.ngb-dp-navigation-chevron{border-style:solid;border-width:.2em .2em 0 0;display:inline-block;width:.75em;height:.75em;margin-left:.25em;margin-right:.15em;-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}.right .ngb-dp-navigation-chevron{-webkit-transform:rotate(45deg);transform:rotate(45deg);margin-left:.15em;margin-right:.25em}.ngb-dp-arrow{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;padding-right:0;padding-left:0;margin:0;width:2rem;height:2rem}.ngb-dp-arrow.right{-ms-flex-pack:end;justify-content:flex-end}.ngb-dp-arrow-btn{padding:0 .25rem;margin:0 .5rem;border:none;background-color:transparent;z-index:1}.ngb-dp-arrow-btn:focus{outline-width:1px;outline-style:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.ngb-dp-arrow-btn:focus{outline-style:solid}}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-navigation-select{display:-ms-flexbox;display:flex;-ms-flex:1 1 9rem;flex:1 1 9rem}"]
            }] }
];
/** @nocollapse */
NgbDatepickerNavigation.ctorParameters = () => [
    { type: NgbDatepickerI18n }
];
NgbDatepickerNavigation.propDecorators = {
    date: [{ type: Input }],
    disabled: [{ type: Input }],
    months: [{ type: Input }],
    showSelect: [{ type: Input }],
    prevDisabled: [{ type: Input }],
    nextDisabled: [{ type: Input }],
    selectBoxes: [{ type: Input }],
    navigate: [{ type: Output }],
    select: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NgbDatepickerNavigation.prototype.navigation;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.date;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.disabled;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.months;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.showSelect;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.prevDisabled;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.nextDisabled;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.selectBoxes;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.navigate;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.select;
    /** @type {?} */
    NgbDatepickerNavigation.prototype.i18n;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkYXRlcGlja2VyL2RhdGVwaWNrZXItbmF2aWdhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqSCxPQUFPLEVBQUMsZUFBZSxFQUFpQixNQUFNLHlCQUF5QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUF1Q3BELE1BQU0sT0FBTyx1QkFBdUI7Ozs7SUFjbEMsWUFBbUIsSUFBdUI7UUFBdkIsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFiMUMsZUFBVSxHQUFHLGVBQWUsQ0FBQztRQUlwQixXQUFNLEdBQXFCLEVBQUUsQ0FBQztRQU03QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDL0MsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFFRixDQUFDOzs7WUFuRC9DLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBRXJDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBOEJQOzthQUNKOzs7O1lBdENPLGlCQUFpQjs7O21CQTBDdEIsS0FBSzt1QkFDTCxLQUFLO3FCQUNMLEtBQUs7eUJBQ0wsS0FBSzsyQkFDTCxLQUFLOzJCQUNMLEtBQUs7MEJBQ0wsS0FBSzt1QkFFTCxNQUFNO3FCQUNOLE1BQU07Ozs7SUFYUCw2Q0FBNkI7O0lBRTdCLHVDQUF1Qjs7SUFDdkIsMkNBQTJCOztJQUMzQix5Q0FBdUM7O0lBQ3ZDLDZDQUE2Qjs7SUFDN0IsK0NBQStCOztJQUMvQiwrQ0FBK0I7O0lBQy9CLDhDQUEwRDs7SUFFMUQsMkNBQXlEOztJQUN6RCx5Q0FBK0M7O0lBRW5DLHVDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05hdmlnYXRpb25FdmVudCwgTW9udGhWaWV3TW9kZWx9IGZyb20gJy4vZGF0ZXBpY2tlci12aWV3LW1vZGVsJztcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJJMThufSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1kYXRlcGlja2VyLW5hdmlnYXRpb24nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVVcmxzOiBbJy4vZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLnNjc3MnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLWFycm93XCI+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGluayBuZ2ItZHAtYXJyb3ctYnRuXCIgKGNsaWNrKT1cIm5hdmlnYXRlLmVtaXQobmF2aWdhdGlvbi5QUkVWKVwiIFtkaXNhYmxlZF09XCJwcmV2RGlzYWJsZWRcIlxuICAgICAgICAgICAgICBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5kYXRlcGlja2VyLnByZXZpb3VzLW1vbnRoXCIgYXJpYS1sYWJlbD1cIlByZXZpb3VzIG1vbnRoXCJcbiAgICAgICAgICAgICAgaTE4bi10aXRsZT1cIkBAbmdiLmRhdGVwaWNrZXIucHJldmlvdXMtbW9udGhcIiB0aXRsZT1cIlByZXZpb3VzIG1vbnRoXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibmdiLWRwLW5hdmlnYXRpb24tY2hldnJvblwiPjwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxuZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdCAqbmdJZj1cInNob3dTZWxlY3RcIiBjbGFzcz1cIm5nYi1kcC1uYXZpZ2F0aW9uLXNlbGVjdFwiXG4gICAgICBbZGF0ZV09XCJkYXRlXCJcbiAgICAgIFtkaXNhYmxlZF0gPSBcImRpc2FibGVkXCJcbiAgICAgIFttb250aHNdPVwic2VsZWN0Qm94ZXMubW9udGhzXCJcbiAgICAgIFt5ZWFyc109XCJzZWxlY3RCb3hlcy55ZWFyc1wiXG4gICAgICAoc2VsZWN0KT1cInNlbGVjdC5lbWl0KCRldmVudClcIj5cbiAgICA8L25nYi1kYXRlcGlja2VyLW5hdmlnYXRpb24tc2VsZWN0PlxuXG4gICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwiIXNob3dTZWxlY3RcIiBuZ0ZvciBsZXQtbW9udGggW25nRm9yT2ZdPVwibW9udGhzXCIgbGV0LWk9XCJpbmRleFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm5nYi1kcC1hcnJvd1wiICpuZ0lmPVwiaSA+IDBcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtbW9udGgtbmFtZVwiPlxuICAgICAgICB7eyBpMThuLmdldE1vbnRoRnVsbE5hbWUobW9udGgubnVtYmVyLCBtb250aC55ZWFyKSB9fSB7eyBpMThuLmdldFllYXJOdW1lcmFscyhtb250aC55ZWFyKSB9fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLWFycm93XCIgKm5nSWY9XCJpICE9PSBtb250aHMubGVuZ3RoIC0gMVwiPjwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cIm5nYi1kcC1hcnJvdyByaWdodFwiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpbmsgbmdiLWRwLWFycm93LWJ0blwiIChjbGljayk9XCJuYXZpZ2F0ZS5lbWl0KG5hdmlnYXRpb24uTkVYVClcIiBbZGlzYWJsZWRdPVwibmV4dERpc2FibGVkXCJcbiAgICAgICAgICAgICAgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IuZGF0ZXBpY2tlci5uZXh0LW1vbnRoXCIgYXJpYS1sYWJlbD1cIk5leHQgbW9udGhcIlxuICAgICAgICAgICAgICBpMThuLXRpdGxlPVwiQEBuZ2IuZGF0ZXBpY2tlci5uZXh0LW1vbnRoXCIgdGl0bGU9XCJOZXh0IG1vbnRoXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibmdiLWRwLW5hdmlnYXRpb24tY2hldnJvblwiPjwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlck5hdmlnYXRpb24ge1xuICBuYXZpZ2F0aW9uID0gTmF2aWdhdGlvbkV2ZW50O1xuXG4gIEBJbnB1dCgpIGRhdGU6IE5nYkRhdGU7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBtb250aHM6IE1vbnRoVmlld01vZGVsW10gPSBbXTtcbiAgQElucHV0KCkgc2hvd1NlbGVjdDogYm9vbGVhbjtcbiAgQElucHV0KCkgcHJldkRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBuZXh0RGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNlbGVjdEJveGVzOiB7eWVhcnM6IG51bWJlcltdLCBtb250aHM6IG51bWJlcltdfTtcblxuICBAT3V0cHV0KCkgbmF2aWdhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPE5hdmlnYXRpb25FdmVudD4oKTtcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZT4oKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4pIHt9XG59XG4iXX0=