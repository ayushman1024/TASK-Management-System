/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NgbDatepickerService } from './datepicker-service';
import { NgbCalendar } from './ngb-calendar';
import { Key } from '../util/key';
var NgbDatepickerKeyMapService = /** @class */ (function () {
    function NgbDatepickerKeyMapService(_service, _calendar) {
        var _this = this;
        this._service = _service;
        this._calendar = _calendar;
        _service.model$.subscribe(function (model) {
            _this._minDate = model.minDate;
            _this._maxDate = model.maxDate;
            _this._firstViewDate = model.firstDate;
            _this._lastViewDate = model.lastDate;
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    NgbDatepickerKeyMapService.prototype.processKey = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line:deprecation
        switch (event.which) {
            case Key.PageUp:
                this._service.focusMove(event.shiftKey ? 'y' : 'm', -1);
                break;
            case Key.PageDown:
                this._service.focusMove(event.shiftKey ? 'y' : 'm', 1);
                break;
            case Key.End:
                this._service.focus(event.shiftKey ? this._maxDate : this._lastViewDate);
                break;
            case Key.Home:
                this._service.focus(event.shiftKey ? this._minDate : this._firstViewDate);
                break;
            case Key.ArrowLeft:
                this._service.focusMove('d', -1);
                break;
            case Key.ArrowUp:
                this._service.focusMove('d', -this._calendar.getDaysPerWeek());
                break;
            case Key.ArrowRight:
                this._service.focusMove('d', 1);
                break;
            case Key.ArrowDown:
                this._service.focusMove('d', this._calendar.getDaysPerWeek());
                break;
            case Key.Enter:
            case Key.Space:
                this._service.focusSelect();
                break;
            default:
                return;
        }
        // note 'return' in default case
        event.preventDefault();
        event.stopPropagation();
    };
    NgbDatepickerKeyMapService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NgbDatepickerKeyMapService.ctorParameters = function () { return [
        { type: NgbDatepickerService },
        { type: NgbCalendar }
    ]; };
    return NgbDatepickerKeyMapService;
}());
export { NgbDatepickerKeyMapService };
if (false) {
    /** @type {?} */
    NgbDatepickerKeyMapService.prototype._minDate;
    /** @type {?} */
    NgbDatepickerKeyMapService.prototype._maxDate;
    /** @type {?} */
    NgbDatepickerKeyMapService.prototype._firstViewDate;
    /** @type {?} */
    NgbDatepickerKeyMapService.prototype._lastViewDate;
    /** @type {?} */
    NgbDatepickerKeyMapService.prototype._service;
    /** @type {?} */
    NgbDatepickerKeyMapService.prototype._calendar;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1rZXltYXAtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLWtleW1hcC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBR2hDO0lBT0Usb0NBQW9CLFFBQThCLEVBQVUsU0FBc0I7UUFBbEYsaUJBT0M7UUFQbUIsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFhO1FBQ2hGLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUM3QixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDOUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQzlCLEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUN0QyxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELCtDQUFVOzs7O0lBQVYsVUFBVyxLQUFvQjtRQUM3Qix1Q0FBdUM7UUFDdkMsUUFBUSxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ25CLEtBQUssR0FBRyxDQUFDLE1BQU07Z0JBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEQsTUFBTTtZQUNSLEtBQUssR0FBRyxDQUFDLFFBQVE7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELE1BQU07WUFDUixLQUFLLEdBQUcsQ0FBQyxHQUFHO2dCQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDekUsTUFBTTtZQUNSLEtBQUssR0FBRyxDQUFDLElBQUk7Z0JBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUMxRSxNQUFNO1lBQ1IsS0FBSyxHQUFHLENBQUMsU0FBUztnQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU07WUFDUixLQUFLLEdBQUcsQ0FBQyxPQUFPO2dCQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztnQkFDL0QsTUFBTTtZQUNSLEtBQUssR0FBRyxDQUFDLFVBQVU7Z0JBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDaEMsTUFBTTtZQUNSLEtBQUssR0FBRyxDQUFDLFNBQVM7Z0JBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7Z0JBQzlELE1BQU07WUFDUixLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDZixLQUFLLEdBQUcsQ0FBQyxLQUFLO2dCQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzVCLE1BQU07WUFDUjtnQkFDRSxPQUFPO1NBQ1Y7UUFFRCxnQ0FBZ0M7UUFDaEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMxQixDQUFDOztnQkF0REYsVUFBVTs7OztnQkFMSCxvQkFBb0I7Z0JBQ3BCLFdBQVc7O0lBMkRuQixpQ0FBQztDQUFBLEFBdkRELElBdURDO1NBdERZLDBCQUEwQjs7O0lBQ3JDLDhDQUEwQjs7SUFDMUIsOENBQTBCOztJQUMxQixvREFBZ0M7O0lBQ2hDLG1EQUErQjs7SUFFbkIsOENBQXNDOztJQUFFLCtDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJTZXJ2aWNlfSBmcm9tICcuL2RhdGVwaWNrZXItc2VydmljZSc7XG5pbXBvcnQge05nYkNhbGVuZGFyfSBmcm9tICcuL25nYi1jYWxlbmRhcic7XG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJLZXlNYXBTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfbWluRGF0ZTogTmdiRGF0ZTtcbiAgcHJpdmF0ZSBfbWF4RGF0ZTogTmdiRGF0ZTtcbiAgcHJpdmF0ZSBfZmlyc3RWaWV3RGF0ZTogTmdiRGF0ZTtcbiAgcHJpdmF0ZSBfbGFzdFZpZXdEYXRlOiBOZ2JEYXRlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IE5nYkRhdGVwaWNrZXJTZXJ2aWNlLCBwcml2YXRlIF9jYWxlbmRhcjogTmdiQ2FsZW5kYXIpIHtcbiAgICBfc2VydmljZS5tb2RlbCQuc3Vic2NyaWJlKG1vZGVsID0+IHtcbiAgICAgIHRoaXMuX21pbkRhdGUgPSBtb2RlbC5taW5EYXRlO1xuICAgICAgdGhpcy5fbWF4RGF0ZSA9IG1vZGVsLm1heERhdGU7XG4gICAgICB0aGlzLl9maXJzdFZpZXdEYXRlID0gbW9kZWwuZmlyc3REYXRlO1xuICAgICAgdGhpcy5fbGFzdFZpZXdEYXRlID0gbW9kZWwubGFzdERhdGU7XG4gICAgfSk7XG4gIH1cblxuICBwcm9jZXNzS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgY2FzZSBLZXkuUGFnZVVwOlxuICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZShldmVudC5zaGlmdEtleSA/ICd5JyA6ICdtJywgLTEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LlBhZ2VEb3duOlxuICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZShldmVudC5zaGlmdEtleSA/ICd5JyA6ICdtJywgMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuRW5kOlxuICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzKGV2ZW50LnNoaWZ0S2V5ID8gdGhpcy5fbWF4RGF0ZSA6IHRoaXMuX2xhc3RWaWV3RGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuSG9tZTpcbiAgICAgICAgdGhpcy5fc2VydmljZS5mb2N1cyhldmVudC5zaGlmdEtleSA/IHRoaXMuX21pbkRhdGUgOiB0aGlzLl9maXJzdFZpZXdEYXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtleS5BcnJvd0xlZnQ6XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKCdkJywgLTEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkFycm93VXA6XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKCdkJywgLXRoaXMuX2NhbGVuZGFyLmdldERheXNQZXJXZWVrKCkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkFycm93UmlnaHQ6XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKCdkJywgMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuQXJyb3dEb3duOlxuICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZSgnZCcsIHRoaXMuX2NhbGVuZGFyLmdldERheXNQZXJXZWVrKCkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkVudGVyOlxuICAgICAgY2FzZSBLZXkuU3BhY2U6XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNTZWxlY3QoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gbm90ZSAncmV0dXJuJyBpbiBkZWZhdWx0IGNhc2VcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG59XG4iXX0=