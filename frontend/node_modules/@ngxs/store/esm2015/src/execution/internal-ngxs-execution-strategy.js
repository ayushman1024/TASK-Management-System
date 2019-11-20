/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { NGXS_EXECUTION_STRATEGY } from './symbols';
export class InternalNgxsExecutionStrategy {
    /**
     * @param {?} _executionStrategy
     */
    constructor(_executionStrategy) {
        this._executionStrategy = _executionStrategy;
    }
    /**
     * @template T
     * @param {?} func
     * @return {?}
     */
    enter(func) {
        return this._executionStrategy.enter(func);
    }
    /**
     * @template T
     * @param {?} func
     * @return {?}
     */
    leave(func) {
        return this._executionStrategy.leave(func);
    }
}
InternalNgxsExecutionStrategy.decorators = [
    { type: Injectable }
];
/** @nocollapse */
InternalNgxsExecutionStrategy.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [NGXS_EXECUTION_STRATEGY,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    InternalNgxsExecutionStrategy.prototype._executionStrategy;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJuYWwtbmd4cy1leGVjdXRpb24tc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4cy9zdG9yZS8iLCJzb3VyY2VzIjpbInNyYy9leGVjdXRpb24vaW50ZXJuYWwtbmd4cy1leGVjdXRpb24tc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBeUIsdUJBQXVCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFHM0UsTUFBTSxPQUFPLDZCQUE2Qjs7OztJQUN4QyxZQUMyQyxrQkFBeUM7UUFBekMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUF1QjtJQUNqRixDQUFDOzs7Ozs7SUFFSixLQUFLLENBQUksSUFBYTtRQUNwQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7Ozs7O0lBRUQsS0FBSyxDQUFJLElBQWE7UUFDcEIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7OztZQVpGLFVBQVU7Ozs7NENBR04sTUFBTSxTQUFDLHVCQUF1Qjs7Ozs7OztJQUEvQiwyREFBa0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE5neHNFeGVjdXRpb25TdHJhdGVneSwgTkdYU19FWEVDVVRJT05fU1RSQVRFR1kgfSBmcm9tICcuL3N5bWJvbHMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxOZ3hzRXhlY3V0aW9uU3RyYXRlZ3kgaW1wbGVtZW50cyBOZ3hzRXhlY3V0aW9uU3RyYXRlZ3kge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChOR1hTX0VYRUNVVElPTl9TVFJBVEVHWSkgcHJpdmF0ZSBfZXhlY3V0aW9uU3RyYXRlZ3k6IE5neHNFeGVjdXRpb25TdHJhdGVneVxyXG4gICkge31cclxuXHJcbiAgZW50ZXI8VD4oZnVuYzogKCkgPT4gVCk6IFQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2V4ZWN1dGlvblN0cmF0ZWd5LmVudGVyKGZ1bmMpO1xyXG4gIH1cclxuXHJcbiAgbGVhdmU8VD4oZnVuYzogKCkgPT4gVCk6IFQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2V4ZWN1dGlvblN0cmF0ZWd5LmxlYXZlKGZ1bmMpO1xyXG4gIH1cclxufVxyXG4iXX0=