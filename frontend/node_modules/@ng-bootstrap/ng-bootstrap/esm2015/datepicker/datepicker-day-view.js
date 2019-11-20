/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { NgbDate } from './ngb-date';
import { NgbDatepickerI18n } from './datepicker-i18n';
export class NgbDatepickerDayView {
    /**
     * @param {?} i18n
     */
    constructor(i18n) {
        this.i18n = i18n;
    }
    /**
     * @return {?}
     */
    isMuted() { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); }
}
NgbDatepickerDayView.decorators = [
    { type: Component, args: [{
                selector: '[ngbDatepickerDayView]',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    'class': 'btn-light',
                    '[class.bg-primary]': 'selected',
                    '[class.text-white]': 'selected',
                    '[class.text-muted]': 'isMuted()',
                    '[class.outside]': 'isMuted()',
                    '[class.active]': 'focused'
                },
                template: `{{ i18n.getDayNumerals(date) }}`,
                styles: ["[ngbDatepickerDayView]{text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:0 0}[ngbDatepickerDayView].outside{opacity:.5}"]
            }] }
];
/** @nocollapse */
NgbDatepickerDayView.ctorParameters = () => [
    { type: NgbDatepickerI18n }
];
NgbDatepickerDayView.propDecorators = {
    currentMonth: [{ type: Input }],
    date: [{ type: Input }],
    disabled: [{ type: Input }],
    focused: [{ type: Input }],
    selected: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgbDatepickerDayView.prototype.currentMonth;
    /** @type {?} */
    NgbDatepickerDayView.prototype.date;
    /** @type {?} */
    NgbDatepickerDayView.prototype.disabled;
    /** @type {?} */
    NgbDatepickerDayView.prototype.focused;
    /** @type {?} */
    NgbDatepickerDayView.prototype.selected;
    /** @type {?} */
    NgbDatepickerDayView.prototype.i18n;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1kYXktdmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLWRheS12aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBaUJwRCxNQUFNLE9BQU8sb0JBQW9COzs7O0lBTy9CLFlBQW1CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO0lBQUcsQ0FBQzs7OztJQUU5QyxPQUFPLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7OztZQXhCakcsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFFckMsSUFBSSxFQUFFO29CQUNKLE9BQU8sRUFBRSxXQUFXO29CQUNwQixvQkFBb0IsRUFBRSxVQUFVO29CQUNoQyxvQkFBb0IsRUFBRSxVQUFVO29CQUNoQyxvQkFBb0IsRUFBRSxXQUFXO29CQUNqQyxpQkFBaUIsRUFBRSxXQUFXO29CQUM5QixnQkFBZ0IsRUFBRSxTQUFTO2lCQUM1QjtnQkFDRCxRQUFRLEVBQUUsaUNBQWlDOzthQUM1Qzs7OztZQWhCTyxpQkFBaUI7OzsyQkFrQnRCLEtBQUs7bUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3NCQUNMLEtBQUs7dUJBQ0wsS0FBSzs7OztJQUpOLDRDQUE4Qjs7SUFDOUIsb0NBQXVCOztJQUN2Qix3Q0FBMkI7O0lBQzNCLHVDQUEwQjs7SUFDMUIsd0NBQTJCOztJQUVmLG9DQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJJMThufSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tuZ2JEYXRlcGlja2VyRGF5Vmlld10nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVVcmxzOiBbJy4vZGF0ZXBpY2tlci1kYXktdmlldy5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnYnRuLWxpZ2h0JyxcbiAgICAnW2NsYXNzLmJnLXByaW1hcnldJzogJ3NlbGVjdGVkJyxcbiAgICAnW2NsYXNzLnRleHQtd2hpdGVdJzogJ3NlbGVjdGVkJyxcbiAgICAnW2NsYXNzLnRleHQtbXV0ZWRdJzogJ2lzTXV0ZWQoKScsXG4gICAgJ1tjbGFzcy5vdXRzaWRlXSc6ICdpc011dGVkKCknLFxuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdmb2N1c2VkJ1xuICB9LFxuICB0ZW1wbGF0ZTogYHt7IGkxOG4uZ2V0RGF5TnVtZXJhbHMoZGF0ZSkgfX1gXG59KVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJEYXlWaWV3IHtcbiAgQElucHV0KCkgY3VycmVudE1vbnRoOiBudW1iZXI7XG4gIEBJbnB1dCgpIGRhdGU6IE5nYkRhdGU7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBmb2N1c2VkOiBib29sZWFuO1xuICBASW5wdXQoKSBzZWxlY3RlZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4pIHt9XG5cbiAgaXNNdXRlZCgpIHsgcmV0dXJuICF0aGlzLnNlbGVjdGVkICYmICh0aGlzLmRhdGUubW9udGggIT09IHRoaXMuY3VycmVudE1vbnRoIHx8IHRoaXMuZGlzYWJsZWQpOyB9XG59XG4iXX0=