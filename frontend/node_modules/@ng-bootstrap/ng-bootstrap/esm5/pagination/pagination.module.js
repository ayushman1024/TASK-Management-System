/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPagination, NgbPaginationEllipsis, NgbPaginationFirst, NgbPaginationLast, NgbPaginationNext, NgbPaginationNumber, NgbPaginationPrevious } from './pagination';
export { NgbPagination, NgbPaginationEllipsis, NgbPaginationFirst, NgbPaginationLast, NgbPaginationNext, NgbPaginationNumber, NgbPaginationPrevious } from './pagination';
export { NgbPaginationConfig } from './pagination-config';
/** @type {?} */
var DIRECTIVES = [
    NgbPagination, NgbPaginationEllipsis, NgbPaginationFirst, NgbPaginationLast, NgbPaginationNext, NgbPaginationNumber,
    NgbPaginationPrevious
];
var NgbPaginationModule = /** @class */ (function () {
    function NgbPaginationModule() {
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
    NgbPaginationModule.forRoot = /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    function () { return { ngModule: NgbPaginationModule }; };
    NgbPaginationModule.decorators = [
        { type: NgModule, args: [{ declarations: DIRECTIVES, exports: DIRECTIVES, imports: [CommonModule] },] }
    ];
    return NgbPaginationModule;
}());
export { NgbPaginationModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInBhZ2luYXRpb24vcGFnaW5hdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQXNCLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQ0wsYUFBYSxFQUNiLHFCQUFxQixFQUNyQixrQkFBa0IsRUFDbEIsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIscUJBQXFCLEVBQ3RCLE1BQU0sY0FBYyxDQUFDO0FBRXRCLE9BQU8sRUFDTCxhQUFhLEVBQ2IscUJBQXFCLEVBQ3JCLGtCQUFrQixFQUNsQixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLG1CQUFtQixFQUNuQixxQkFBcUIsRUFDdEIsTUFBTSxjQUFjLENBQUM7QUFDdEIsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUJBQXFCLENBQUM7O0lBRWxELFVBQVUsR0FBRztJQUNqQixhQUFhLEVBQUUscUJBQXFCLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CO0lBQ25ILHFCQUFxQjtDQUN0QjtBQUVEO0lBQUE7SUFTQSxDQUFDO0lBUEM7Ozs7O09BS0c7Ozs7Ozs7O0lBQ0ksMkJBQU87Ozs7Ozs7SUFBZCxjQUF3QyxPQUFPLEVBQUMsUUFBUSxFQUFFLG1CQUFtQixFQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFSbEYsUUFBUSxTQUFDLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFDOztJQVNsRiwwQkFBQztDQUFBLEFBVEQsSUFTQztTQVJZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7XG4gIE5nYlBhZ2luYXRpb24sXG4gIE5nYlBhZ2luYXRpb25FbGxpcHNpcyxcbiAgTmdiUGFnaW5hdGlvbkZpcnN0LFxuICBOZ2JQYWdpbmF0aW9uTGFzdCxcbiAgTmdiUGFnaW5hdGlvbk5leHQsXG4gIE5nYlBhZ2luYXRpb25OdW1iZXIsXG4gIE5nYlBhZ2luYXRpb25QcmV2aW91c1xufSBmcm9tICcuL3BhZ2luYXRpb24nO1xuXG5leHBvcnQge1xuICBOZ2JQYWdpbmF0aW9uLFxuICBOZ2JQYWdpbmF0aW9uRWxsaXBzaXMsXG4gIE5nYlBhZ2luYXRpb25GaXJzdCxcbiAgTmdiUGFnaW5hdGlvbkxhc3QsXG4gIE5nYlBhZ2luYXRpb25OZXh0LFxuICBOZ2JQYWdpbmF0aW9uTnVtYmVyLFxuICBOZ2JQYWdpbmF0aW9uUHJldmlvdXNcbn0gZnJvbSAnLi9wYWdpbmF0aW9uJztcbmV4cG9ydCB7TmdiUGFnaW5hdGlvbkNvbmZpZ30gZnJvbSAnLi9wYWdpbmF0aW9uLWNvbmZpZyc7XG5cbmNvbnN0IERJUkVDVElWRVMgPSBbXG4gIE5nYlBhZ2luYXRpb24sIE5nYlBhZ2luYXRpb25FbGxpcHNpcywgTmdiUGFnaW5hdGlvbkZpcnN0LCBOZ2JQYWdpbmF0aW9uTGFzdCwgTmdiUGFnaW5hdGlvbk5leHQsIE5nYlBhZ2luYXRpb25OdW1iZXIsXG4gIE5nYlBhZ2luYXRpb25QcmV2aW91c1xuXTtcblxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IERJUkVDVElWRVMsIGV4cG9ydHM6IERJUkVDVElWRVMsIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uTW9kdWxlIHtcbiAgLyoqXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxuICAgKi9cbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYlBhZ2luYXRpb25Nb2R1bGV9OyB9XG59XG4iXX0=