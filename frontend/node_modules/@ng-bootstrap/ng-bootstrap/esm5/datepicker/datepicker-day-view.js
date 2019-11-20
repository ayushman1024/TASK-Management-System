/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { NgbDate } from './ngb-date';
import { NgbDatepickerI18n } from './datepicker-i18n';
var NgbDatepickerDayView = /** @class */ (function () {
    function NgbDatepickerDayView(i18n) {
        this.i18n = i18n;
    }
    /**
     * @return {?}
     */
    NgbDatepickerDayView.prototype.isMuted = /**
     * @return {?}
     */
    function () { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); };
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
                    template: "{{ i18n.getDayNumerals(date) }}",
                    styles: ["[ngbDatepickerDayView]{text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:0 0}[ngbDatepickerDayView].outside{opacity:.5}"]
                }] }
    ];
    /** @nocollapse */
    NgbDatepickerDayView.ctorParameters = function () { return [
        { type: NgbDatepickerI18n }
    ]; };
    NgbDatepickerDayView.propDecorators = {
        currentMonth: [{ type: Input }],
        date: [{ type: Input }],
        disabled: [{ type: Input }],
        focused: [{ type: Input }],
        selected: [{ type: Input }]
    };
    return NgbDatepickerDayView;
}());
export { NgbDatepickerDayView };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1kYXktdmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLWRheS12aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRXBEO0lBc0JFLDhCQUFtQixJQUF1QjtRQUF2QixTQUFJLEdBQUosSUFBSSxDQUFtQjtJQUFHLENBQUM7Ozs7SUFFOUMsc0NBQU87OztJQUFQLGNBQVksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQXhCakcsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFFckMsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxXQUFXO3dCQUNwQixvQkFBb0IsRUFBRSxVQUFVO3dCQUNoQyxvQkFBb0IsRUFBRSxVQUFVO3dCQUNoQyxvQkFBb0IsRUFBRSxXQUFXO3dCQUNqQyxpQkFBaUIsRUFBRSxXQUFXO3dCQUM5QixnQkFBZ0IsRUFBRSxTQUFTO3FCQUM1QjtvQkFDRCxRQUFRLEVBQUUsaUNBQWlDOztpQkFDNUM7Ozs7Z0JBaEJPLGlCQUFpQjs7OytCQWtCdEIsS0FBSzt1QkFDTCxLQUFLOzJCQUNMLEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxLQUFLOztJQUtSLDJCQUFDO0NBQUEsQUF6QkQsSUF5QkM7U0FWWSxvQkFBb0I7OztJQUMvQiw0Q0FBOEI7O0lBQzlCLG9DQUF1Qjs7SUFDdkIsd0NBQTJCOztJQUMzQix1Q0FBMEI7O0lBQzFCLHdDQUEyQjs7SUFFZixvQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbmdiRGF0ZXBpY2tlckRheVZpZXddJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlVXJsczogWycuL2RhdGVwaWNrZXItZGF5LXZpZXcuc2NzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ2J0bi1saWdodCcsXG4gICAgJ1tjbGFzcy5iZy1wcmltYXJ5XSc6ICdzZWxlY3RlZCcsXG4gICAgJ1tjbGFzcy50ZXh0LXdoaXRlXSc6ICdzZWxlY3RlZCcsXG4gICAgJ1tjbGFzcy50ZXh0LW11dGVkXSc6ICdpc011dGVkKCknLFxuICAgICdbY2xhc3Mub3V0c2lkZV0nOiAnaXNNdXRlZCgpJyxcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnZm9jdXNlZCdcbiAgfSxcbiAgdGVtcGxhdGU6IGB7eyBpMThuLmdldERheU51bWVyYWxzKGRhdGUpIH19YFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyRGF5VmlldyB7XG4gIEBJbnB1dCgpIGN1cnJlbnRNb250aDogbnVtYmVyO1xuICBASW5wdXQoKSBkYXRlOiBOZ2JEYXRlO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgZm9jdXNlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHVibGljIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuKSB7fVxuXG4gIGlzTXV0ZWQoKSB7IHJldHVybiAhdGhpcy5zZWxlY3RlZCAmJiAodGhpcy5kYXRlLm1vbnRoICE9PSB0aGlzLmN1cnJlbnRNb250aCB8fCB0aGlzLmRpc2FibGVkKTsgfVxufVxuIl19