/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { getValueInRange } from '../util/util';
import { NgbProgressbarConfig } from './progressbar-config';
/**
 * Directive that can be used to provide feedback on the progress of a workflow or an action.
 */
export class NgbProgressbar {
    /**
     * @param {?} config
     */
    constructor(config) {
        /**
         * Current value to be displayed in the progressbar. Should be smaller or equal to "max" value.
         */
        this.value = 0;
        this.max = config.max;
        this.animated = config.animated;
        this.striped = config.striped;
        this.type = config.type;
        this.showValue = config.showValue;
        this.height = config.height;
    }
    /**
     * @return {?}
     */
    getValue() { return getValueInRange(this.value, this.max); }
    /**
     * @return {?}
     */
    getPercentValue() { return 100 * this.getValue() / this.max; }
}
NgbProgressbar.decorators = [
    { type: Component, args: [{
                selector: 'ngb-progressbar',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div class="progress" [style.height]="height">
      <div class="progress-bar{{type ? ' bg-' + type : ''}}{{animated ? ' progress-bar-animated' : ''}}{{striped ?
    ' progress-bar-striped' : ''}}" role="progressbar" [style.width.%]="getPercentValue()"
    [attr.aria-valuenow]="getValue()" aria-valuemin="0" [attr.aria-valuemax]="max">
        <span *ngIf="showValue" i18n="@@ngb.progressbar.value">{{getPercentValue()}}%</span><ng-content></ng-content>
      </div>
    </div>
  `
            }] }
];
/** @nocollapse */
NgbProgressbar.ctorParameters = () => [
    { type: NgbProgressbarConfig }
];
NgbProgressbar.propDecorators = {
    max: [{ type: Input }],
    animated: [{ type: Input }],
    striped: [{ type: Input }],
    showValue: [{ type: Input }],
    type: [{ type: Input }],
    value: [{ type: Input }],
    height: [{ type: Input }]
};
if (false) {
    /**
     * Maximal value to be displayed in the progressbar.
     * @type {?}
     */
    NgbProgressbar.prototype.max;
    /**
     * A flag indicating if the stripes of the progress bar should be animated. Takes effect only for browsers
     * supporting CSS3 animations, and if striped is true.
     * @type {?}
     */
    NgbProgressbar.prototype.animated;
    /**
     * A flag indicating if a progress bar should be displayed as striped.
     * @type {?}
     */
    NgbProgressbar.prototype.striped;
    /**
     * A flag indicating if the current percentage value should be shown.
     * @type {?}
     */
    NgbProgressbar.prototype.showValue;
    /**
     * Type of progress bar, can be one of "success", "info", "warning" or "danger".
     * @type {?}
     */
    NgbProgressbar.prototype.type;
    /**
     * Current value to be displayed in the progressbar. Should be smaller or equal to "max" value.
     * @type {?}
     */
    NgbProgressbar.prototype.value;
    /**
     * Height of the progress bar. Accepts any valid CSS height values, ex. '2rem'
     * @type {?}
     */
    NgbProgressbar.prototype.height;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInByb2dyZXNzYmFyL3Byb2dyZXNzYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDOzs7O0FBa0IxRCxNQUFNLE9BQU8sY0FBYzs7OztJQXFDekIsWUFBWSxNQUE0Qjs7OztRQVAvQixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBUWpCLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQzlCLENBQUM7Ozs7SUFFRCxRQUFRLEtBQUssT0FBTyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0lBRTVELGVBQWUsS0FBSyxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7OztZQTdEL0QsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxRQUFRLEVBQUU7Ozs7Ozs7O0dBUVQ7YUFDRjs7OztZQWpCTyxvQkFBb0I7OztrQkFzQnpCLEtBQUs7dUJBTUwsS0FBSztzQkFLTCxLQUFLO3dCQUtMLEtBQUs7bUJBS0wsS0FBSztvQkFLTCxLQUFLO3FCQUtMLEtBQUs7Ozs7Ozs7SUEvQk4sNkJBQXFCOzs7Ozs7SUFNckIsa0NBQTJCOzs7OztJQUszQixpQ0FBMEI7Ozs7O0lBSzFCLG1DQUE0Qjs7Ozs7SUFLNUIsOEJBQXNCOzs7OztJQUt0QiwrQkFBbUI7Ozs7O0lBS25CLGdDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtnZXRWYWx1ZUluUmFuZ2V9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQge05nYlByb2dyZXNzYmFyQ29uZmlnfSBmcm9tICcuL3Byb2dyZXNzYmFyLWNvbmZpZyc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSBmZWVkYmFjayBvbiB0aGUgcHJvZ3Jlc3Mgb2YgYSB3b3JrZmxvdyBvciBhbiBhY3Rpb24uXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1wcm9ncmVzc2JhcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzc1wiIFtzdHlsZS5oZWlnaHRdPVwiaGVpZ2h0XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFye3t0eXBlID8gJyBiZy0nICsgdHlwZSA6ICcnfX17e2FuaW1hdGVkID8gJyBwcm9ncmVzcy1iYXItYW5pbWF0ZWQnIDogJyd9fXt7c3RyaXBlZCA/XG4gICAgJyBwcm9ncmVzcy1iYXItc3RyaXBlZCcgOiAnJ319XCIgcm9sZT1cInByb2dyZXNzYmFyXCIgW3N0eWxlLndpZHRoLiVdPVwiZ2V0UGVyY2VudFZhbHVlKClcIlxuICAgIFthdHRyLmFyaWEtdmFsdWVub3ddPVwiZ2V0VmFsdWUoKVwiIGFyaWEtdmFsdWVtaW49XCIwXCIgW2F0dHIuYXJpYS12YWx1ZW1heF09XCJtYXhcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJzaG93VmFsdWVcIiBpMThuPVwiQEBuZ2IucHJvZ3Jlc3NiYXIudmFsdWVcIj57e2dldFBlcmNlbnRWYWx1ZSgpfX0lPC9zcGFuPjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYlByb2dyZXNzYmFyIHtcbiAgLyoqXG4gICAqIE1heGltYWwgdmFsdWUgdG8gYmUgZGlzcGxheWVkIGluIHRoZSBwcm9ncmVzc2Jhci5cbiAgICovXG4gIEBJbnB1dCgpIG1heDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiB0aGUgc3RyaXBlcyBvZiB0aGUgcHJvZ3Jlc3MgYmFyIHNob3VsZCBiZSBhbmltYXRlZC4gVGFrZXMgZWZmZWN0IG9ubHkgZm9yIGJyb3dzZXJzXG4gICAqIHN1cHBvcnRpbmcgQ1NTMyBhbmltYXRpb25zLCBhbmQgaWYgc3RyaXBlZCBpcyB0cnVlLlxuICAgKi9cbiAgQElucHV0KCkgYW5pbWF0ZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIGEgcHJvZ3Jlc3MgYmFyIHNob3VsZCBiZSBkaXNwbGF5ZWQgYXMgc3RyaXBlZC5cbiAgICovXG4gIEBJbnB1dCgpIHN0cmlwZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBjdXJyZW50IHBlcmNlbnRhZ2UgdmFsdWUgc2hvdWxkIGJlIHNob3duLlxuICAgKi9cbiAgQElucHV0KCkgc2hvd1ZhbHVlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUeXBlIG9mIHByb2dyZXNzIGJhciwgY2FuIGJlIG9uZSBvZiBcInN1Y2Nlc3NcIiwgXCJpbmZvXCIsIFwid2FybmluZ1wiIG9yIFwiZGFuZ2VyXCIuXG4gICAqL1xuICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgdmFsdWUgdG8gYmUgZGlzcGxheWVkIGluIHRoZSBwcm9ncmVzc2Jhci4gU2hvdWxkIGJlIHNtYWxsZXIgb3IgZXF1YWwgdG8gXCJtYXhcIiB2YWx1ZS5cbiAgICovXG4gIEBJbnB1dCgpIHZhbHVlID0gMDtcblxuICAvKipcbiAgICogSGVpZ2h0IG9mIHRoZSBwcm9ncmVzcyBiYXIuIEFjY2VwdHMgYW55IHZhbGlkIENTUyBoZWlnaHQgdmFsdWVzLCBleC4gJzJyZW0nXG4gICAqL1xuICBASW5wdXQoKSBoZWlnaHQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5nYlByb2dyZXNzYmFyQ29uZmlnKSB7XG4gICAgdGhpcy5tYXggPSBjb25maWcubWF4O1xuICAgIHRoaXMuYW5pbWF0ZWQgPSBjb25maWcuYW5pbWF0ZWQ7XG4gICAgdGhpcy5zdHJpcGVkID0gY29uZmlnLnN0cmlwZWQ7XG4gICAgdGhpcy50eXBlID0gY29uZmlnLnR5cGU7XG4gICAgdGhpcy5zaG93VmFsdWUgPSBjb25maWcuc2hvd1ZhbHVlO1xuICAgIHRoaXMuaGVpZ2h0ID0gY29uZmlnLmhlaWdodDtcbiAgfVxuXG4gIGdldFZhbHVlKCkgeyByZXR1cm4gZ2V0VmFsdWVJblJhbmdlKHRoaXMudmFsdWUsIHRoaXMubWF4KTsgfVxuXG4gIGdldFBlcmNlbnRWYWx1ZSgpIHsgcmV0dXJuIDEwMCAqIHRoaXMuZ2V0VmFsdWUoKSAvIHRoaXMubWF4OyB9XG59XG4iXX0=