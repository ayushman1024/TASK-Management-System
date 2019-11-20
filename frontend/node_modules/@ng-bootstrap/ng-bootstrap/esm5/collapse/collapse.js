/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input } from '@angular/core';
/**
 * The NgbCollapse directive provides a simple way to hide and show an element with animations.
 */
var NgbCollapse = /** @class */ (function () {
    function NgbCollapse() {
        /**
         * A flag indicating collapsed (true) or open (false) state.
         */
        this.collapsed = false;
    }
    NgbCollapse.decorators = [
        { type: Directive, args: [{
                    selector: '[ngbCollapse]',
                    exportAs: 'ngbCollapse',
                    host: { '[class.collapse]': 'true', '[class.show]': '!collapsed' }
                },] }
    ];
    NgbCollapse.propDecorators = {
        collapsed: [{ type: Input, args: ['ngbCollapse',] }]
    };
    return NgbCollapse;
}());
export { NgbCollapse };
if (false) {
    /**
     * A flag indicating collapsed (true) or open (false) state.
     * @type {?}
     */
    NgbCollapse.prototype.collapsed;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImNvbGxhcHNlL2NvbGxhcHNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQzs7OztBQUsvQztJQUFBOzs7O1FBU3dCLGNBQVMsR0FBRyxLQUFLLENBQUM7SUFDMUMsQ0FBQzs7Z0JBVkEsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUsYUFBYTtvQkFDdkIsSUFBSSxFQUFFLEVBQUMsa0JBQWtCLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUM7aUJBQ2pFOzs7NEJBS0UsS0FBSyxTQUFDLGFBQWE7O0lBQ3RCLGtCQUFDO0NBQUEsQUFWRCxJQVVDO1NBTFksV0FBVzs7Ozs7O0lBSXRCLGdDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogVGhlIE5nYkNvbGxhcHNlIGRpcmVjdGl2ZSBwcm92aWRlcyBhIHNpbXBsZSB3YXkgdG8gaGlkZSBhbmQgc2hvdyBhbiBlbGVtZW50IHdpdGggYW5pbWF0aW9ucy5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nYkNvbGxhcHNlXScsXG4gIGV4cG9ydEFzOiAnbmdiQ29sbGFwc2UnLFxuICBob3N0OiB7J1tjbGFzcy5jb2xsYXBzZV0nOiAndHJ1ZScsICdbY2xhc3Muc2hvd10nOiAnIWNvbGxhcHNlZCd9XG59KVxuZXhwb3J0IGNsYXNzIE5nYkNvbGxhcHNlIHtcbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGNvbGxhcHNlZCAodHJ1ZSkgb3Igb3BlbiAoZmFsc2UpIHN0YXRlLlxuICAgKi9cbiAgQElucHV0KCduZ2JDb2xsYXBzZScpIGNvbGxhcHNlZCA9IGZhbHNlO1xufVxuIl19