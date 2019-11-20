/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NgbDatepickerService } from './datepicker-service';
import { NgbCalendar } from './ngb-calendar';
import { Key } from '../util/key';
export class NgbDatepickerKeyMapService {
    /**
     * @param {?} _service
     * @param {?} _calendar
     */
    constructor(_service, _calendar) {
        this._service = _service;
        this._calendar = _calendar;
        _service.model$.subscribe(model => {
            this._minDate = model.minDate;
            this._maxDate = model.maxDate;
            this._firstViewDate = model.firstDate;
            this._lastViewDate = model.lastDate;
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    processKey(event) {
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
    }
}
NgbDatepickerKeyMapService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgbDatepickerKeyMapService.ctorParameters = () => [
    { type: NgbDatepickerService },
    { type: NgbCalendar }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1rZXltYXAtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLWtleW1hcC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBSWhDLE1BQU0sT0FBTywwQkFBMEI7Ozs7O0lBTXJDLFlBQW9CLFFBQThCLEVBQVUsU0FBc0I7UUFBOUQsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFhO1FBQ2hGLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLEtBQW9CO1FBQzdCLHVDQUF1QztRQUN2QyxRQUFRLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDbkIsS0FBSyxHQUFHLENBQUMsTUFBTTtnQkFDYixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4RCxNQUFNO1lBQ1IsS0FBSyxHQUFHLENBQUMsUUFBUTtnQkFDZixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdkQsTUFBTTtZQUNSLEtBQUssR0FBRyxDQUFDLEdBQUc7Z0JBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUN6RSxNQUFNO1lBQ1IsS0FBSyxHQUFHLENBQUMsSUFBSTtnQkFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzFFLE1BQU07WUFDUixLQUFLLEdBQUcsQ0FBQyxTQUFTO2dCQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsTUFBTTtZQUNSLEtBQUssR0FBRyxDQUFDLE9BQU87Z0JBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRCxNQUFNO1lBQ1IsS0FBSyxHQUFHLENBQUMsVUFBVTtnQkFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNO1lBQ1IsS0FBSyxHQUFHLENBQUMsU0FBUztnQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztnQkFDOUQsTUFBTTtZQUNSLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQztZQUNmLEtBQUssR0FBRyxDQUFDLEtBQUs7Z0JBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDNUIsTUFBTTtZQUNSO2dCQUNFLE9BQU87U0FDVjtRQUVELGdDQUFnQztRQUNoQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzFCLENBQUM7OztZQXRERixVQUFVOzs7O1lBTEgsb0JBQW9CO1lBQ3BCLFdBQVc7Ozs7SUFNakIsOENBQTBCOztJQUMxQiw4Q0FBMEI7O0lBQzFCLG9EQUFnQzs7SUFDaEMsbURBQStCOztJQUVuQiw4Q0FBc0M7O0lBQUUsK0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlclNlcnZpY2V9IGZyb20gJy4vZGF0ZXBpY2tlci1zZXJ2aWNlJztcbmltcG9ydCB7TmdiQ2FsZW5kYXJ9IGZyb20gJy4vbmdiLWNhbGVuZGFyJztcbmltcG9ydCB7S2V5fSBmcm9tICcuLi91dGlsL2tleSc7XG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlcktleU1hcFNlcnZpY2Uge1xuICBwcml2YXRlIF9taW5EYXRlOiBOZ2JEYXRlO1xuICBwcml2YXRlIF9tYXhEYXRlOiBOZ2JEYXRlO1xuICBwcml2YXRlIF9maXJzdFZpZXdEYXRlOiBOZ2JEYXRlO1xuICBwcml2YXRlIF9sYXN0Vmlld0RhdGU6IE5nYkRhdGU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogTmdiRGF0ZXBpY2tlclNlcnZpY2UsIHByaXZhdGUgX2NhbGVuZGFyOiBOZ2JDYWxlbmRhcikge1xuICAgIF9zZXJ2aWNlLm1vZGVsJC5zdWJzY3JpYmUobW9kZWwgPT4ge1xuICAgICAgdGhpcy5fbWluRGF0ZSA9IG1vZGVsLm1pbkRhdGU7XG4gICAgICB0aGlzLl9tYXhEYXRlID0gbW9kZWwubWF4RGF0ZTtcbiAgICAgIHRoaXMuX2ZpcnN0Vmlld0RhdGUgPSBtb2RlbC5maXJzdERhdGU7XG4gICAgICB0aGlzLl9sYXN0Vmlld0RhdGUgPSBtb2RlbC5sYXN0RGF0ZTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb2Nlc3NLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICBjYXNlIEtleS5QYWdlVXA6XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKGV2ZW50LnNoaWZ0S2V5ID8gJ3knIDogJ20nLCAtMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuUGFnZURvd246XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKGV2ZW50LnNoaWZ0S2V5ID8gJ3knIDogJ20nLCAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtleS5FbmQ6XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXMoZXZlbnQuc2hpZnRLZXkgPyB0aGlzLl9tYXhEYXRlIDogdGhpcy5fbGFzdFZpZXdEYXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtleS5Ib21lOlxuICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzKGV2ZW50LnNoaWZ0S2V5ID8gdGhpcy5fbWluRGF0ZSA6IHRoaXMuX2ZpcnN0Vmlld0RhdGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkFycm93TGVmdDpcbiAgICAgICAgdGhpcy5fc2VydmljZS5mb2N1c01vdmUoJ2QnLCAtMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuQXJyb3dVcDpcbiAgICAgICAgdGhpcy5fc2VydmljZS5mb2N1c01vdmUoJ2QnLCAtdGhpcy5fY2FsZW5kYXIuZ2V0RGF5c1BlcldlZWsoKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuQXJyb3dSaWdodDpcbiAgICAgICAgdGhpcy5fc2VydmljZS5mb2N1c01vdmUoJ2QnLCAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtleS5BcnJvd0Rvd246XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKCdkJywgdGhpcy5fY2FsZW5kYXIuZ2V0RGF5c1BlcldlZWsoKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuRW50ZXI6XG4gICAgICBjYXNlIEtleS5TcGFjZTpcbiAgICAgICAgdGhpcy5fc2VydmljZS5mb2N1c1NlbGVjdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBub3RlICdyZXR1cm4nIGluIGRlZmF1bHQgY2FzZVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cbn1cbiJdfQ==