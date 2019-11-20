/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { NgbDropdown, NgbDropdownAnchor, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem } from './dropdown';
export { NgbDropdown, NgbDropdownAnchor, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem } from './dropdown';
export { NgbDropdownConfig } from './dropdown-config';
/** @type {?} */
var NGB_DROPDOWN_DIRECTIVES = [NgbDropdown, NgbDropdownAnchor, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem];
var NgbDropdownModule = /** @class */ (function () {
    function NgbDropdownModule() {
    }
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     */
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    NgbDropdownModule.forRoot = /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    function () { return { ngModule: NgbDropdownModule }; };
    NgbDropdownModule.decorators = [
        { type: NgModule, args: [{ declarations: NGB_DROPDOWN_DIRECTIVES, exports: NGB_DROPDOWN_DIRECTIVES },] }
    ];
    return NgbDropdownModule;
}());
export { NgbDropdownModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJkcm9wZG93bi9kcm9wZG93bi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQXNCLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUUvRyxPQUFPLEVBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDL0csT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7O0lBRTlDLHVCQUF1QixHQUFHLENBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxlQUFlLENBQUM7QUFFckg7SUFBQTtJQVNBLENBQUM7SUFQQzs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSSx5QkFBTzs7Ozs7OztJQUFkLGNBQXdDLE9BQU8sRUFBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQVJoRixRQUFRLFNBQUMsRUFBQyxZQUFZLEVBQUUsdUJBQXVCLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFDOztJQVNuRix3QkFBQztDQUFBLEFBVEQsSUFTQztTQVJZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ2JEcm9wZG93biwgTmdiRHJvcGRvd25BbmNob3IsIE5nYkRyb3Bkb3duVG9nZ2xlLCBOZ2JEcm9wZG93bk1lbnUsIE5nYkRyb3Bkb3duSXRlbX0gZnJvbSAnLi9kcm9wZG93bic7XG5cbmV4cG9ydCB7TmdiRHJvcGRvd24sIE5nYkRyb3Bkb3duQW5jaG9yLCBOZ2JEcm9wZG93blRvZ2dsZSwgTmdiRHJvcGRvd25NZW51LCBOZ2JEcm9wZG93bkl0ZW19IGZyb20gJy4vZHJvcGRvd24nO1xuZXhwb3J0IHtOZ2JEcm9wZG93bkNvbmZpZ30gZnJvbSAnLi9kcm9wZG93bi1jb25maWcnO1xuXG5jb25zdCBOR0JfRFJPUERPV05fRElSRUNUSVZFUyA9IFtOZ2JEcm9wZG93biwgTmdiRHJvcGRvd25BbmNob3IsIE5nYkRyb3Bkb3duVG9nZ2xlLCBOZ2JEcm9wZG93bk1lbnUsIE5nYkRyb3Bkb3duSXRlbV07XG5cbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBOR0JfRFJPUERPV05fRElSRUNUSVZFUywgZXhwb3J0czogTkdCX0RST1BET1dOX0RJUkVDVElWRVN9KVxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duTW9kdWxlIHtcbiAgLyoqXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxuICAgKi9cbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYkRyb3Bkb3duTW9kdWxlfTsgfVxufVxuIl19