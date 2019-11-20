/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { NgbModal } from './modal';
import { NgbModalBackdrop } from './modal-backdrop';
import { NgbModalWindow } from './modal-window';
export { NgbModal } from './modal';
export { NgbModalConfig } from './modal-config';
export { NgbModalRef, NgbActiveModal } from './modal-ref';
export { ModalDismissReasons } from './modal-dismiss-reasons';
var NgbModalModule = /** @class */ (function () {
    function NgbModalModule() {
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
    NgbModalModule.forRoot = /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    function () { return { ngModule: NgbModalModule }; };
    NgbModalModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgbModalBackdrop, NgbModalWindow],
                    entryComponents: [NgbModalBackdrop, NgbModalWindow],
                    providers: [NgbModal]
                },] }
    ];
    return NgbModalModule;
}());
export { NgbModalModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTVELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDakMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDakMsT0FBTyxFQUFDLGNBQWMsRUFBa0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvRCxPQUFPLEVBQUMsV0FBVyxFQUFFLGNBQWMsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN4RCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUU1RDtJQUFBO0lBYUEsQ0FBQztJQVBDOzs7OztPQUtHOzs7Ozs7OztJQUNJLHNCQUFPOzs7Ozs7O0lBQWQsY0FBd0MsT0FBTyxFQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQVo3RSxRQUFRLFNBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDO29CQUNoRCxlQUFlLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUM7b0JBQ25ELFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQztpQkFDdEI7O0lBU0QscUJBQUM7Q0FBQSxBQWJELElBYUM7U0FSWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TmdiTW9kYWx9IGZyb20gJy4vbW9kYWwnO1xuaW1wb3J0IHtOZ2JNb2RhbEJhY2tkcm9wfSBmcm9tICcuL21vZGFsLWJhY2tkcm9wJztcbmltcG9ydCB7TmdiTW9kYWxXaW5kb3d9IGZyb20gJy4vbW9kYWwtd2luZG93JztcblxuZXhwb3J0IHtOZ2JNb2RhbH0gZnJvbSAnLi9tb2RhbCc7XG5leHBvcnQge05nYk1vZGFsQ29uZmlnLCBOZ2JNb2RhbE9wdGlvbnN9IGZyb20gJy4vbW9kYWwtY29uZmlnJztcbmV4cG9ydCB7TmdiTW9kYWxSZWYsIE5nYkFjdGl2ZU1vZGFsfSBmcm9tICcuL21vZGFsLXJlZic7XG5leHBvcnQge01vZGFsRGlzbWlzc1JlYXNvbnN9IGZyb20gJy4vbW9kYWwtZGlzbWlzcy1yZWFzb25zJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdiTW9kYWxCYWNrZHJvcCwgTmdiTW9kYWxXaW5kb3ddLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ2JNb2RhbEJhY2tkcm9wLCBOZ2JNb2RhbFdpbmRvd10sXG4gIHByb3ZpZGVyczogW05nYk1vZGFsXVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JNb2RhbE1vZHVsZSB7XG4gIC8qKlxuICAgKiBJbXBvcnRpbmcgd2l0aCAnLmZvclJvb3QoKScgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSwgeW91IGNhbiBzaW1wbHkgaW1wb3J0IHRoZSBtb2R1bGUuXG4gICAqIFdpbGwgYmUgcmVtb3ZlZCBpbiA0LjAuMC5cbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcbiAgICovXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JNb2RhbE1vZHVsZX07IH1cbn1cbiJdfQ==