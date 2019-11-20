/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, NgZone, Output, QueryList, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { positionElements } from '../util/positioning';
import { ngbAutoClose } from '../util/autoclose';
import { Key } from '../util/key';
import { NgbDropdownConfig } from './dropdown-config';
/**
 * A directive you should put put on a dropdown item to enable keyboard navigation.
 * Keyboard navigation using arrow keys will move focus between items marked with this directive.
 *
 * \@since 4.1.0
 */
var NgbDropdownItem = /** @class */ (function () {
    function NgbDropdownItem(elementRef) {
        this.elementRef = elementRef;
        this._disabled = false;
    }
    Object.defineProperty(NgbDropdownItem.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = (/** @type {?} */ (value)) === '' || value === true; // accept an empty attribute as true
        },
        enumerable: true,
        configurable: true
    });
    NgbDropdownItem.decorators = [
        { type: Directive, args: [{ selector: '[ngbDropdownItem]', host: { 'class': 'dropdown-item', '[class.disabled]': 'disabled' } },] }
    ];
    /** @nocollapse */
    NgbDropdownItem.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    NgbDropdownItem.propDecorators = {
        disabled: [{ type: Input }]
    };
    return NgbDropdownItem;
}());
export { NgbDropdownItem };
if (false) {
    /** @type {?} */
    NgbDropdownItem.prototype._disabled;
    /** @type {?} */
    NgbDropdownItem.prototype.elementRef;
}
/**
 *
 */
var NgbDropdownMenu = /** @class */ (function () {
    function NgbDropdownMenu(dropdown) {
        this.dropdown = dropdown;
        this.placement = 'bottom';
        this.isOpen = false;
    }
    NgbDropdownMenu.decorators = [
        { type: Directive, args: [{
                    selector: '[ngbDropdownMenu]',
                    host: {
                        '[class.dropdown-menu]': 'true',
                        '[class.show]': 'dropdown.isOpen()',
                        '[attr.x-placement]': 'placement',
                        '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
                        '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
                        '(keydown.Home)': 'dropdown.onKeyDown($event)',
                        '(keydown.End)': 'dropdown.onKeyDown($event)'
                    }
                },] }
    ];
    /** @nocollapse */
    NgbDropdownMenu.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgbDropdown; }),] }] }
    ]; };
    NgbDropdownMenu.propDecorators = {
        menuItems: [{ type: ContentChildren, args: [NgbDropdownItem,] }]
    };
    return NgbDropdownMenu;
}());
export { NgbDropdownMenu };
if (false) {
    /** @type {?} */
    NgbDropdownMenu.prototype.placement;
    /** @type {?} */
    NgbDropdownMenu.prototype.isOpen;
    /** @type {?} */
    NgbDropdownMenu.prototype.menuItems;
    /** @type {?} */
    NgbDropdownMenu.prototype.dropdown;
}
/**
 * Marks an element to which dropdown menu will be anchored. This is a simple version
 * of the NgbDropdownToggle directive. It plays the same role as NgbDropdownToggle but
 * doesn't listen to click events to toggle dropdown menu thus enabling support for
 * events other than click.
 *
 * \@since 1.1.0
 */
var NgbDropdownAnchor = /** @class */ (function () {
    function NgbDropdownAnchor(dropdown, _elementRef) {
        this.dropdown = dropdown;
        this._elementRef = _elementRef;
        this.anchorEl = _elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    NgbDropdownAnchor.prototype.getNativeElement = /**
     * @return {?}
     */
    function () { return this._elementRef.nativeElement; };
    NgbDropdownAnchor.decorators = [
        { type: Directive, args: [{
                    selector: '[ngbDropdownAnchor]',
                    host: { 'class': 'dropdown-toggle', 'aria-haspopup': 'true', '[attr.aria-expanded]': 'dropdown.isOpen()' }
                },] }
    ];
    /** @nocollapse */
    NgbDropdownAnchor.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgbDropdown; }),] }] },
        { type: ElementRef }
    ]; };
    return NgbDropdownAnchor;
}());
export { NgbDropdownAnchor };
if (false) {
    /** @type {?} */
    NgbDropdownAnchor.prototype.anchorEl;
    /** @type {?} */
    NgbDropdownAnchor.prototype.dropdown;
    /** @type {?} */
    NgbDropdownAnchor.prototype._elementRef;
}
/**
 * Allows the dropdown to be toggled via click. This directive is optional: you can use NgbDropdownAnchor as an
 * alternative.
 */
var NgbDropdownToggle = /** @class */ (function (_super) {
    tslib_1.__extends(NgbDropdownToggle, _super);
    function NgbDropdownToggle(dropdown, elementRef) {
        return _super.call(this, dropdown, elementRef) || this;
    }
    /**
     * @return {?}
     */
    NgbDropdownToggle.prototype.toggleOpen = /**
     * @return {?}
     */
    function () { this.dropdown.toggle(); };
    NgbDropdownToggle.decorators = [
        { type: Directive, args: [{
                    selector: '[ngbDropdownToggle]',
                    host: {
                        'class': 'dropdown-toggle',
                        'aria-haspopup': 'true',
                        '[attr.aria-expanded]': 'dropdown.isOpen()',
                        '(click)': 'toggleOpen()',
                        '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
                        '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
                        '(keydown.Home)': 'dropdown.onKeyDown($event)',
                        '(keydown.End)': 'dropdown.onKeyDown($event)'
                    },
                    providers: [{ provide: NgbDropdownAnchor, useExisting: forwardRef(function () { return NgbDropdownToggle; }) }]
                },] }
    ];
    /** @nocollapse */
    NgbDropdownToggle.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return NgbDropdown; }),] }] },
        { type: ElementRef }
    ]; };
    return NgbDropdownToggle;
}(NgbDropdownAnchor));
export { NgbDropdownToggle };
/**
 * Transforms a node into a dropdown.
 */
var NgbDropdown = /** @class */ (function () {
    function NgbDropdown(_changeDetector, config, _document, _ngZone, _elementRef, _renderer) {
        var _this = this;
        this._changeDetector = _changeDetector;
        this._document = _document;
        this._ngZone = _ngZone;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._closed$ = new Subject();
        /**
         *  Defines whether or not the dropdown-menu is open initially.
         */
        this._open = false;
        /**
         *  An event fired when the dropdown is opened or closed.
         *  Event's payload equals whether dropdown is open.
         */
        this.openChange = new EventEmitter();
        this.placement = config.placement;
        this.container = config.container;
        this.autoClose = config.autoClose;
        this._zoneSubscription = _ngZone.onStable.subscribe(function () { _this._positionMenu(); });
    }
    /**
     * @return {?}
     */
    NgbDropdown.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._applyPlacementClasses();
        if (this._open) {
            this._setCloseHandlers();
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbDropdown.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.container && this._open) {
            this._applyContainer(this.container);
        }
        if (changes.placement && !changes.placement.isFirstChange) {
            this._applyPlacementClasses();
        }
    };
    /**
     * Checks if the dropdown menu is open or not.
     */
    /**
     * Checks if the dropdown menu is open or not.
     * @return {?}
     */
    NgbDropdown.prototype.isOpen = /**
     * Checks if the dropdown menu is open or not.
     * @return {?}
     */
    function () { return this._open; };
    /**
     * Opens the dropdown menu of a given navbar or tabbed navigation.
     */
    /**
     * Opens the dropdown menu of a given navbar or tabbed navigation.
     * @return {?}
     */
    NgbDropdown.prototype.open = /**
     * Opens the dropdown menu of a given navbar or tabbed navigation.
     * @return {?}
     */
    function () {
        if (!this._open) {
            this._open = true;
            this._applyContainer(this.container);
            this.openChange.emit(true);
            this._setCloseHandlers();
        }
    };
    /**
     * @return {?}
     */
    NgbDropdown.prototype._setCloseHandlers = /**
     * @return {?}
     */
    function () {
        var _this = this;
        ngbAutoClose(this._ngZone, this._document, this.autoClose, function () { return _this.close(); }, this._closed$, this._menu ? [this._menuElement.nativeElement] : [], this._anchor ? [this._anchor.getNativeElement()] : []);
    };
    /**
     * Closes the dropdown menu of a given navbar or tabbed navigation.
     */
    /**
     * Closes the dropdown menu of a given navbar or tabbed navigation.
     * @return {?}
     */
    NgbDropdown.prototype.close = /**
     * Closes the dropdown menu of a given navbar or tabbed navigation.
     * @return {?}
     */
    function () {
        if (this._open) {
            this._open = false;
            this._resetContainer();
            this._closed$.next();
            this.openChange.emit(false);
            this._changeDetector.markForCheck();
        }
    };
    /**
     * Toggles the dropdown menu of a given navbar or tabbed navigation.
     */
    /**
     * Toggles the dropdown menu of a given navbar or tabbed navigation.
     * @return {?}
     */
    NgbDropdown.prototype.toggle = /**
     * Toggles the dropdown menu of a given navbar or tabbed navigation.
     * @return {?}
     */
    function () {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * @return {?}
     */
    NgbDropdown.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._resetContainer();
        this._closed$.next();
        this._zoneSubscription.unsubscribe();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbDropdown.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var itemElements = this._getMenuElements();
        /** @type {?} */
        var position = -1;
        /** @type {?} */
        var isEventFromItems = false;
        /** @type {?} */
        var isEventFromToggle = this._isEventFromToggle(event);
        if (!isEventFromToggle) {
            itemElements.forEach(function (itemElement, index) {
                if (itemElement.contains((/** @type {?} */ (event.target)))) {
                    isEventFromItems = true;
                }
                if (itemElement === _this._document.activeElement) {
                    position = index;
                }
            });
        }
        if (isEventFromToggle || isEventFromItems) {
            if (!this.isOpen()) {
                this.open();
            }
            // tslint:disable-next-line:deprecation
            switch (event.which) {
                case Key.ArrowDown:
                    position = Math.min(position + 1, itemElements.length - 1);
                    break;
                case Key.ArrowUp:
                    if (this._isDropup() && position === -1) {
                        position = itemElements.length - 1;
                        break;
                    }
                    position = Math.max(position - 1, 0);
                    break;
                case Key.Home:
                    position = 0;
                    break;
                case Key.End:
                    position = itemElements.length - 1;
                    break;
            }
            itemElements[position].focus();
            event.preventDefault();
        }
    };
    /**
     * @return {?}
     */
    NgbDropdown.prototype._isDropup = /**
     * @return {?}
     */
    function () { return this._elementRef.nativeElement.classList.contains('dropup'); };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbDropdown.prototype._isEventFromToggle = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return this._anchor.getNativeElement().contains((/** @type {?} */ (event.target)));
    };
    /**
     * @return {?}
     */
    NgbDropdown.prototype._getMenuElements = /**
     * @return {?}
     */
    function () {
        if (this._menu == null) {
            return [];
        }
        return this._menu.menuItems.filter(function (item) { return !item.disabled; }).map(function (item) { return item.elementRef.nativeElement; });
    };
    /**
     * @return {?}
     */
    NgbDropdown.prototype._positionMenu = /**
     * @return {?}
     */
    function () {
        if (this.isOpen() && this._menu) {
            this._applyPlacementClasses(positionElements(this._anchor.anchorEl, this._bodyContainer || this._menuElement.nativeElement, this.placement, this.container === 'body'));
        }
    };
    /**
     * @return {?}
     */
    NgbDropdown.prototype._resetContainer = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var renderer = this._renderer;
        if (this._menuElement) {
            /** @type {?} */
            var dropdownElement = this._elementRef.nativeElement;
            /** @type {?} */
            var dropdownMenuElement = this._menuElement.nativeElement;
            renderer.appendChild(dropdownElement, dropdownMenuElement);
            renderer.removeStyle(dropdownMenuElement, 'position');
            renderer.removeStyle(dropdownMenuElement, 'transform');
        }
        if (this._bodyContainer) {
            renderer.removeChild(this._document.body, this._bodyContainer);
            this._bodyContainer = null;
        }
    };
    /**
     * @param {?=} container
     * @return {?}
     */
    NgbDropdown.prototype._applyContainer = /**
     * @param {?=} container
     * @return {?}
     */
    function (container) {
        if (container === void 0) { container = null; }
        this._resetContainer();
        if (container === 'body') {
            /** @type {?} */
            var renderer = this._renderer;
            /** @type {?} */
            var dropdownMenuElement = this._menuElement.nativeElement;
            /** @type {?} */
            var bodyContainer = this._bodyContainer = this._bodyContainer || renderer.createElement('div');
            // Override some styles to have the positionning working
            renderer.setStyle(bodyContainer, 'position', 'absolute');
            renderer.setStyle(dropdownMenuElement, 'position', 'static');
            renderer.appendChild(bodyContainer, dropdownMenuElement);
            renderer.appendChild(this._document.body, bodyContainer);
        }
    };
    /**
     * @param {?=} placement
     * @return {?}
     */
    NgbDropdown.prototype._applyPlacementClasses = /**
     * @param {?=} placement
     * @return {?}
     */
    function (placement) {
        if (this._menu) {
            if (!placement) {
                placement = Array.isArray(this.placement) ? this.placement[0] : (/** @type {?} */ (this.placement.split(' ')[0]));
            }
            /** @type {?} */
            var renderer = this._renderer;
            /** @type {?} */
            var dropdownElement = this._elementRef.nativeElement;
            // remove the current placement classes
            renderer.removeClass(dropdownElement, 'dropup');
            renderer.removeClass(dropdownElement, 'dropdown');
            this._menu.placement = placement;
            /*
                  * apply the new placement
                  * in case of top use up-arrow or down-arrow otherwise
                  */
            /** @type {?} */
            var dropdownClass = placement.search('^top') !== -1 ? 'dropup' : 'dropdown';
            renderer.addClass(dropdownElement, dropdownClass);
            /** @type {?} */
            var bodyContainer = this._bodyContainer;
            if (bodyContainer) {
                renderer.removeClass(bodyContainer, 'dropup');
                renderer.removeClass(bodyContainer, 'dropdown');
                renderer.addClass(bodyContainer, dropdownClass);
            }
        }
    };
    NgbDropdown.decorators = [
        { type: Directive, args: [{ selector: '[ngbDropdown]', exportAs: 'ngbDropdown', host: { '[class.show]': 'isOpen()' } },] }
    ];
    /** @nocollapse */
    NgbDropdown.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: NgbDropdownConfig },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: NgZone },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    NgbDropdown.propDecorators = {
        _menu: [{ type: ContentChild, args: [NgbDropdownMenu,] }],
        _menuElement: [{ type: ContentChild, args: [NgbDropdownMenu, { read: ElementRef },] }],
        _anchor: [{ type: ContentChild, args: [NgbDropdownAnchor,] }],
        autoClose: [{ type: Input }],
        _open: [{ type: Input, args: ['open',] }],
        placement: [{ type: Input }],
        container: [{ type: Input }],
        openChange: [{ type: Output }]
    };
    return NgbDropdown;
}());
export { NgbDropdown };
if (false) {
    /** @type {?} */
    NgbDropdown.prototype._closed$;
    /** @type {?} */
    NgbDropdown.prototype._zoneSubscription;
    /** @type {?} */
    NgbDropdown.prototype._bodyContainer;
    /** @type {?} */
    NgbDropdown.prototype._menu;
    /** @type {?} */
    NgbDropdown.prototype._menuElement;
    /** @type {?} */
    NgbDropdown.prototype._anchor;
    /**
     * Indicates that dropdown should be closed when selecting one of dropdown items (click) or pressing ESC.
     * When it is true (default) dropdowns are automatically closed on both outside and inside (menu) clicks.
     * When it is false dropdowns are never automatically closed.
     * When it is 'outside' dropdowns are automatically closed on outside clicks but not on menu clicks.
     * When it is 'inside' dropdowns are automatically on menu clicks but not on outside clicks.
     * @type {?}
     */
    NgbDropdown.prototype.autoClose;
    /**
     *  Defines whether or not the dropdown-menu is open initially.
     * @type {?}
     */
    NgbDropdown.prototype._open;
    /**
     * Placement of a popover accepts:
     *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
     *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
     *  array or a space separated string of above values
     * @type {?}
     */
    NgbDropdown.prototype.placement;
    /**
     * A selector specifying the element the dropdown should be appended to.
     * Currently only supports "body".
     *
     * \@since 4.1.0
     * @type {?}
     */
    NgbDropdown.prototype.container;
    /**
     *  An event fired when the dropdown is opened or closed.
     *  Event's payload equals whether dropdown is open.
     * @type {?}
     */
    NgbDropdown.prototype.openChange;
    /** @type {?} */
    NgbDropdown.prototype._changeDetector;
    /** @type {?} */
    NgbDropdown.prototype._document;
    /** @type {?} */
    NgbDropdown.prototype._ngZone;
    /** @type {?} */
    NgbDropdown.prototype._elementRef;
    /** @type {?} */
    NgbDropdown.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRyb3Bkb3duL2Ryb3Bkb3duLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFHTixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUUzQyxPQUFPLEVBQTRCLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDaEYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFaEMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7QUFRcEQ7SUFXRSx5QkFBbUIsVUFBbUM7UUFBbkMsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFUOUMsY0FBUyxHQUFHLEtBQUssQ0FBQztJQVMrQixDQUFDO0lBUDFELHNCQUNJLHFDQUFROzs7O1FBSVosY0FBMEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFMbEQsVUFDYSxLQUFjO1lBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQUssS0FBSyxFQUFBLEtBQUssRUFBRSxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBRSxvQ0FBb0M7UUFDN0YsQ0FBQzs7O09BQUE7O2dCQVBGLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxJ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LENBQUM7Z0JBQ2hELFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ2pEO1NBQ0Y7SUFDSCxDQUFDOztnQkEvUEYsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxFQUFDLGNBQWMsRUFBRSxVQUFVLEVBQUMsRUFBQzs7OztnQkF4SGpHLGlCQUFpQjtnQkF3QlgsaUJBQWlCO2dEQWdKcUQsTUFBTSxTQUFDLFFBQVE7Z0JBL0ozRixNQUFNO2dCQUxOLFVBQVU7Z0JBVVYsU0FBUzs7O3dCQWdIUixZQUFZLFNBQUMsZUFBZTsrQkFDNUIsWUFBWSxTQUFDLGVBQWUsRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUM7MEJBRWhELFlBQVksU0FBQyxpQkFBaUI7NEJBUzlCLEtBQUs7d0JBS0wsS0FBSyxTQUFDLE1BQU07NEJBUVosS0FBSzs0QkFRTCxLQUFLOzZCQU1MLE1BQU07O0lBbU5ULGtCQUFDO0NBQUEsQUFoUUQsSUFnUUM7U0EvUFksV0FBVzs7O0lBQ3RCLCtCQUF1Qzs7SUFDdkMsd0NBQXdDOztJQUN4QyxxQ0FBb0M7O0lBRXBDLDRCQUE4RDs7SUFDOUQsbUNBQW9GOztJQUVwRiw4QkFBb0U7Ozs7Ozs7OztJQVNwRSxnQ0FBbUQ7Ozs7O0lBS25ELDRCQUE2Qjs7Ozs7Ozs7SUFRN0IsZ0NBQW1DOzs7Ozs7OztJQVFuQyxnQ0FBa0M7Ozs7OztJQU1sQyxpQ0FBMEM7O0lBR3RDLHNDQUEwQzs7SUFBNkIsZ0NBQXdDOztJQUMvRyw4QkFBdUI7O0lBQUUsa0NBQTRDOztJQUFFLGdDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb250ZW50Q2hpbGQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1BsYWNlbWVudCwgUGxhY2VtZW50QXJyYXksIHBvc2l0aW9uRWxlbWVudHN9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xuaW1wb3J0IHtuZ2JBdXRvQ2xvc2V9IGZyb20gJy4uL3V0aWwvYXV0b2Nsb3NlJztcbmltcG9ydCB7S2V5fSBmcm9tICcuLi91dGlsL2tleSc7XG5cbmltcG9ydCB7TmdiRHJvcGRvd25Db25maWd9IGZyb20gJy4vZHJvcGRvd24tY29uZmlnJztcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB5b3Ugc2hvdWxkIHB1dCBwdXQgb24gYSBkcm9wZG93biBpdGVtIHRvIGVuYWJsZSBrZXlib2FyZCBuYXZpZ2F0aW9uLlxuICogS2V5Ym9hcmQgbmF2aWdhdGlvbiB1c2luZyBhcnJvdyBrZXlzIHdpbGwgbW92ZSBmb2N1cyBiZXR3ZWVuIGl0ZW1zIG1hcmtlZCB3aXRoIHRoaXMgZGlyZWN0aXZlLlxuICpcbiAqIEBzaW5jZSA0LjEuMFxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bkl0ZW1dJywgaG9zdDogeydjbGFzcyc6ICdkcm9wZG93bi1pdGVtJywgJ1tjbGFzcy5kaXNhYmxlZF0nOiAnZGlzYWJsZWQnfX0pXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25JdGVtIHtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IDxhbnk+dmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSB0cnVlOyAgLy8gYWNjZXB0IGFuIGVtcHR5IGF0dHJpYnV0ZSBhcyB0cnVlXG4gIH1cblxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge31cbn1cblxuLyoqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bk1lbnVdJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZHJvcGRvd24tbWVudV0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5zaG93XSc6ICdkcm9wZG93bi5pc09wZW4oKScsXG4gICAgJ1thdHRyLngtcGxhY2VtZW50XSc6ICdwbGFjZW1lbnQnLFxuICAgICcoa2V5ZG93bi5BcnJvd1VwKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG4gICAgJyhrZXlkb3duLkFycm93RG93biknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxuICAgICcoa2V5ZG93bi5Ib21lKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG4gICAgJyhrZXlkb3duLkVuZCknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25NZW51IHtcbiAgcGxhY2VtZW50OiBQbGFjZW1lbnQgPSAnYm90dG9tJztcbiAgaXNPcGVuID0gZmFsc2U7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JEcm9wZG93bkl0ZW0pIG1lbnVJdGVtczogUXVlcnlMaXN0PE5nYkRyb3Bkb3duSXRlbT47XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYkRyb3Bkb3duKSkgcHVibGljIGRyb3Bkb3duKSB7fVxufVxuXG4vKipcbiAqIE1hcmtzIGFuIGVsZW1lbnQgdG8gd2hpY2ggZHJvcGRvd24gbWVudSB3aWxsIGJlIGFuY2hvcmVkLiBUaGlzIGlzIGEgc2ltcGxlIHZlcnNpb25cbiAqIG9mIHRoZSBOZ2JEcm9wZG93blRvZ2dsZSBkaXJlY3RpdmUuIEl0IHBsYXlzIHRoZSBzYW1lIHJvbGUgYXMgTmdiRHJvcGRvd25Ub2dnbGUgYnV0XG4gKiBkb2Vzbid0IGxpc3RlbiB0byBjbGljayBldmVudHMgdG8gdG9nZ2xlIGRyb3Bkb3duIG1lbnUgdGh1cyBlbmFibGluZyBzdXBwb3J0IGZvclxuICogZXZlbnRzIG90aGVyIHRoYW4gY2xpY2suXG4gKlxuICogQHNpbmNlIDEuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bkFuY2hvcl0nLFxuICBob3N0OiB7J2NsYXNzJzogJ2Ryb3Bkb3duLXRvZ2dsZScsICdhcmlhLWhhc3BvcHVwJzogJ3RydWUnLCAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnZHJvcGRvd24uaXNPcGVuKCknfVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93bkFuY2hvciB7XG4gIGFuY2hvckVsO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ2JEcm9wZG93bikpIHB1YmxpYyBkcm9wZG93biwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgICB0aGlzLmFuY2hvckVsID0gX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIGdldE5hdGl2ZUVsZW1lbnQoKSB7IHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7IH1cbn1cblxuLyoqXG4gKiBBbGxvd3MgdGhlIGRyb3Bkb3duIHRvIGJlIHRvZ2dsZWQgdmlhIGNsaWNrLiBUaGlzIGRpcmVjdGl2ZSBpcyBvcHRpb25hbDogeW91IGNhbiB1c2UgTmdiRHJvcGRvd25BbmNob3IgYXMgYW5cbiAqIGFsdGVybmF0aXZlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdiRHJvcGRvd25Ub2dnbGVdJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdkcm9wZG93bi10b2dnbGUnLFxuICAgICdhcmlhLWhhc3BvcHVwJzogJ3RydWUnLFxuICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdkcm9wZG93bi5pc09wZW4oKScsXG4gICAgJyhjbGljayknOiAndG9nZ2xlT3BlbigpJyxcbiAgICAnKGtleWRvd24uQXJyb3dVcCknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxuICAgICcoa2V5ZG93bi5BcnJvd0Rvd24pJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcbiAgICAnKGtleWRvd24uSG9tZSknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxuICAgICcoa2V5ZG93bi5FbmQpJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJ1xuICB9LFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTmdiRHJvcGRvd25BbmNob3IsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYkRyb3Bkb3duVG9nZ2xlKX1dXG59KVxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duVG9nZ2xlIGV4dGVuZHMgTmdiRHJvcGRvd25BbmNob3Ige1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd24pKSBkcm9wZG93biwgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgICBzdXBlcihkcm9wZG93biwgZWxlbWVudFJlZik7XG4gIH1cblxuICB0b2dnbGVPcGVuKCkgeyB0aGlzLmRyb3Bkb3duLnRvZ2dsZSgpOyB9XG59XG5cbi8qKlxuICogVHJhbnNmb3JtcyBhIG5vZGUgaW50byBhIGRyb3Bkb3duLlxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tuZ2JEcm9wZG93bl0nLCBleHBvcnRBczogJ25nYkRyb3Bkb3duJywgaG9zdDogeydbY2xhc3Muc2hvd10nOiAnaXNPcGVuKCknfX0pXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd24gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2Nsb3NlZCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIF96b25lU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgX2JvZHlDb250YWluZXI6IEhUTUxFbGVtZW50O1xuXG4gIEBDb250ZW50Q2hpbGQoTmdiRHJvcGRvd25NZW51KSBwcml2YXRlIF9tZW51OiBOZ2JEcm9wZG93bk1lbnU7XG4gIEBDb250ZW50Q2hpbGQoTmdiRHJvcGRvd25NZW51LCB7cmVhZDogRWxlbWVudFJlZn0pIHByaXZhdGUgX21lbnVFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIEBDb250ZW50Q2hpbGQoTmdiRHJvcGRvd25BbmNob3IpIHByaXZhdGUgX2FuY2hvcjogTmdiRHJvcGRvd25BbmNob3I7XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB0aGF0IGRyb3Bkb3duIHNob3VsZCBiZSBjbG9zZWQgd2hlbiBzZWxlY3Rpbmcgb25lIG9mIGRyb3Bkb3duIGl0ZW1zIChjbGljaykgb3IgcHJlc3NpbmcgRVNDLlxuICAgKiBXaGVuIGl0IGlzIHRydWUgKGRlZmF1bHQpIGRyb3Bkb3ducyBhcmUgYXV0b21hdGljYWxseSBjbG9zZWQgb24gYm90aCBvdXRzaWRlIGFuZCBpbnNpZGUgKG1lbnUpIGNsaWNrcy5cbiAgICogV2hlbiBpdCBpcyBmYWxzZSBkcm9wZG93bnMgYXJlIG5ldmVyIGF1dG9tYXRpY2FsbHkgY2xvc2VkLlxuICAgKiBXaGVuIGl0IGlzICdvdXRzaWRlJyBkcm9wZG93bnMgYXJlIGF1dG9tYXRpY2FsbHkgY2xvc2VkIG9uIG91dHNpZGUgY2xpY2tzIGJ1dCBub3Qgb24gbWVudSBjbGlja3MuXG4gICAqIFdoZW4gaXQgaXMgJ2luc2lkZScgZHJvcGRvd25zIGFyZSBhdXRvbWF0aWNhbGx5IG9uIG1lbnUgY2xpY2tzIGJ1dCBub3Qgb24gb3V0c2lkZSBjbGlja3MuXG4gICAqL1xuICBASW5wdXQoKSBhdXRvQ2xvc2U6IGJvb2xlYW4gfCAnb3V0c2lkZScgfCAnaW5zaWRlJztcblxuICAvKipcbiAgICogIERlZmluZXMgd2hldGhlciBvciBub3QgdGhlIGRyb3Bkb3duLW1lbnUgaXMgb3BlbiBpbml0aWFsbHkuXG4gICAqL1xuICBASW5wdXQoJ29wZW4nKSBfb3BlbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBQbGFjZW1lbnQgb2YgYSBwb3BvdmVyIGFjY2VwdHM6XG4gICAqICAgIFwidG9wXCIsIFwidG9wLWxlZnRcIiwgXCJ0b3AtcmlnaHRcIiwgXCJib3R0b21cIiwgXCJib3R0b20tbGVmdFwiLCBcImJvdHRvbS1yaWdodFwiLFxuICAgKiAgICBcImxlZnRcIiwgXCJsZWZ0LXRvcFwiLCBcImxlZnQtYm90dG9tXCIsIFwicmlnaHRcIiwgXCJyaWdodC10b3BcIiwgXCJyaWdodC1ib3R0b21cIlxuICAgKiAgYXJyYXkgb3IgYSBzcGFjZSBzZXBhcmF0ZWQgc3RyaW5nIG9mIGFib3ZlIHZhbHVlc1xuICAgKi9cbiAgQElucHV0KCkgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheTtcblxuICAvKipcbiAgICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSBkcm9wZG93biBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxuICAgKlxuICAgKiBAc2luY2UgNC4xLjBcbiAgICovXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogbnVsbCB8ICdib2R5JztcblxuICAvKipcbiAgICogIEFuIGV2ZW50IGZpcmVkIHdoZW4gdGhlIGRyb3Bkb3duIGlzIG9wZW5lZCBvciBjbG9zZWQuXG4gICAqICBFdmVudCdzIHBheWxvYWQgZXF1YWxzIHdoZXRoZXIgZHJvcGRvd24gaXMgb3Blbi5cbiAgICovXG4gIEBPdXRwdXQoKSBvcGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLCBjb25maWc6IE5nYkRyb3Bkb3duQ29uZmlnLCBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxuICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgdGhpcy5wbGFjZW1lbnQgPSBjb25maWcucGxhY2VtZW50O1xuICAgIHRoaXMuY29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lcjtcbiAgICB0aGlzLmF1dG9DbG9zZSA9IGNvbmZpZy5hdXRvQ2xvc2U7XG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbiA9IF9uZ1pvbmUub25TdGFibGUuc3Vic2NyaWJlKCgpID0+IHsgdGhpcy5fcG9zaXRpb25NZW51KCk7IH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fYXBwbHlQbGFjZW1lbnRDbGFzc2VzKCk7XG4gICAgaWYgKHRoaXMuX29wZW4pIHtcbiAgICAgIHRoaXMuX3NldENsb3NlSGFuZGxlcnMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMuY29udGFpbmVyICYmIHRoaXMuX29wZW4pIHtcbiAgICAgIHRoaXMuX2FwcGx5Q29udGFpbmVyKHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5wbGFjZW1lbnQgJiYgIWNoYW5nZXMucGxhY2VtZW50LmlzRmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMuX2FwcGx5UGxhY2VtZW50Q2xhc3NlcygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGRyb3Bkb3duIG1lbnUgaXMgb3BlbiBvciBub3QuXG4gICAqL1xuICBpc09wZW4oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9vcGVuOyB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIHRoZSBkcm9wZG93biBtZW51IG9mIGEgZ2l2ZW4gbmF2YmFyIG9yIHRhYmJlZCBuYXZpZ2F0aW9uLlxuICAgKi9cbiAgb3BlbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX29wZW4pIHtcbiAgICAgIHRoaXMuX29wZW4gPSB0cnVlO1xuICAgICAgdGhpcy5fYXBwbHlDb250YWluZXIodGhpcy5jb250YWluZXIpO1xuICAgICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgICB0aGlzLl9zZXRDbG9zZUhhbmRsZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Q2xvc2VIYW5kbGVycygpIHtcbiAgICBuZ2JBdXRvQ2xvc2UoXG4gICAgICAgIHRoaXMuX25nWm9uZSwgdGhpcy5fZG9jdW1lbnQsIHRoaXMuYXV0b0Nsb3NlLCAoKSA9PiB0aGlzLmNsb3NlKCksIHRoaXMuX2Nsb3NlZCQsXG4gICAgICAgIHRoaXMuX21lbnUgPyBbdGhpcy5fbWVudUVsZW1lbnQubmF0aXZlRWxlbWVudF0gOiBbXSwgdGhpcy5fYW5jaG9yID8gW3RoaXMuX2FuY2hvci5nZXROYXRpdmVFbGVtZW50KCldIDogW10pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgZHJvcGRvd24gbWVudSBvZiBhIGdpdmVuIG5hdmJhciBvciB0YWJiZWQgbmF2aWdhdGlvbi5cbiAgICovXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vcGVuKSB7XG4gICAgICB0aGlzLl9vcGVuID0gZmFsc2U7XG4gICAgICB0aGlzLl9yZXNldENvbnRhaW5lcigpO1xuICAgICAgdGhpcy5fY2xvc2VkJC5uZXh0KCk7XG4gICAgICB0aGlzLm9wZW5DaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgZHJvcGRvd24gbWVudSBvZiBhIGdpdmVuIG5hdmJhciBvciB0YWJiZWQgbmF2aWdhdGlvbi5cbiAgICovXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9yZXNldENvbnRhaW5lcigpO1xuXG4gICAgdGhpcy5fY2xvc2VkJC5uZXh0KCk7XG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgY29uc3QgaXRlbUVsZW1lbnRzID0gdGhpcy5fZ2V0TWVudUVsZW1lbnRzKCk7XG5cbiAgICBsZXQgcG9zaXRpb24gPSAtMTtcbiAgICBsZXQgaXNFdmVudEZyb21JdGVtcyA9IGZhbHNlO1xuICAgIGNvbnN0IGlzRXZlbnRGcm9tVG9nZ2xlID0gdGhpcy5faXNFdmVudEZyb21Ub2dnbGUoZXZlbnQpO1xuXG4gICAgaWYgKCFpc0V2ZW50RnJvbVRvZ2dsZSkge1xuICAgICAgaXRlbUVsZW1lbnRzLmZvckVhY2goKGl0ZW1FbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaXRlbUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgIGlzRXZlbnRGcm9tSXRlbXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtRWxlbWVudCA9PT0gdGhpcy5fZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgIHBvc2l0aW9uID0gaW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChpc0V2ZW50RnJvbVRvZ2dsZSB8fCBpc0V2ZW50RnJvbUl0ZW1zKSB7XG4gICAgICBpZiAoIXRoaXMuaXNPcGVuKCkpIHtcbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICB9XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dEb3duOlxuICAgICAgICAgIHBvc2l0aW9uID0gTWF0aC5taW4ocG9zaXRpb24gKyAxLCBpdGVtRWxlbWVudHMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS2V5LkFycm93VXA6XG4gICAgICAgICAgaWYgKHRoaXMuX2lzRHJvcHVwKCkgJiYgcG9zaXRpb24gPT09IC0xKSB7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGl0ZW1FbGVtZW50cy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBvc2l0aW9uID0gTWF0aC5tYXgocG9zaXRpb24gLSAxLCAwKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLZXkuSG9tZTpcbiAgICAgICAgICBwb3NpdGlvbiA9IDA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS2V5LkVuZDpcbiAgICAgICAgICBwb3NpdGlvbiA9IGl0ZW1FbGVtZW50cy5sZW5ndGggLSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaXRlbUVsZW1lbnRzW3Bvc2l0aW9uXS5mb2N1cygpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pc0Ryb3B1cCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3B1cCcpOyB9XG5cbiAgcHJpdmF0ZSBfaXNFdmVudEZyb21Ub2dnbGUoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICByZXR1cm4gdGhpcy5fYW5jaG9yLmdldE5hdGl2ZUVsZW1lbnQoKS5jb250YWlucyhldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TWVudUVsZW1lbnRzKCk6IEhUTUxFbGVtZW50W10ge1xuICAgIGlmICh0aGlzLl9tZW51ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX21lbnUubWVudUl0ZW1zLmZpbHRlcihpdGVtID0+ICFpdGVtLmRpc2FibGVkKS5tYXAoaXRlbSA9PiBpdGVtLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBwcml2YXRlIF9wb3NpdGlvbk1lbnUoKSB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKCkgJiYgdGhpcy5fbWVudSkge1xuICAgICAgdGhpcy5fYXBwbHlQbGFjZW1lbnRDbGFzc2VzKFxuICAgICAgICAgIHBvc2l0aW9uRWxlbWVudHMoXG4gICAgICAgICAgICAgIHRoaXMuX2FuY2hvci5hbmNob3JFbCwgdGhpcy5fYm9keUNvbnRhaW5lciB8fCB0aGlzLl9tZW51RWxlbWVudC5uYXRpdmVFbGVtZW50LCB0aGlzLnBsYWNlbWVudCxcbiAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPT09ICdib2R5JykpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3Jlc2V0Q29udGFpbmVyKCkge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXI7XG4gICAgaWYgKHRoaXMuX21lbnVFbGVtZW50KSB7XG4gICAgICBjb25zdCBkcm9wZG93bkVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBjb25zdCBkcm9wZG93bk1lbnVFbGVtZW50ID0gdGhpcy5fbWVudUVsZW1lbnQubmF0aXZlRWxlbWVudDtcblxuICAgICAgcmVuZGVyZXIuYXBwZW5kQ2hpbGQoZHJvcGRvd25FbGVtZW50LCBkcm9wZG93bk1lbnVFbGVtZW50KTtcbiAgICAgIHJlbmRlcmVyLnJlbW92ZVN0eWxlKGRyb3Bkb3duTWVudUVsZW1lbnQsICdwb3NpdGlvbicpO1xuICAgICAgcmVuZGVyZXIucmVtb3ZlU3R5bGUoZHJvcGRvd25NZW51RWxlbWVudCwgJ3RyYW5zZm9ybScpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fYm9keUNvbnRhaW5lcikge1xuICAgICAgcmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5fZG9jdW1lbnQuYm9keSwgdGhpcy5fYm9keUNvbnRhaW5lcik7XG4gICAgICB0aGlzLl9ib2R5Q29udGFpbmVyID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hcHBseUNvbnRhaW5lcihjb250YWluZXI6IG51bGwgfCAnYm9keScgPSBudWxsKSB7XG4gICAgdGhpcy5fcmVzZXRDb250YWluZXIoKTtcbiAgICBpZiAoY29udGFpbmVyID09PSAnYm9keScpIHtcbiAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXI7XG4gICAgICBjb25zdCBkcm9wZG93bk1lbnVFbGVtZW50ID0gdGhpcy5fbWVudUVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IGJvZHlDb250YWluZXIgPSB0aGlzLl9ib2R5Q29udGFpbmVyID0gdGhpcy5fYm9keUNvbnRhaW5lciB8fCByZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgLy8gT3ZlcnJpZGUgc29tZSBzdHlsZXMgdG8gaGF2ZSB0aGUgcG9zaXRpb25uaW5nIHdvcmtpbmdcbiAgICAgIHJlbmRlcmVyLnNldFN0eWxlKGJvZHlDb250YWluZXIsICdwb3NpdGlvbicsICdhYnNvbHV0ZScpO1xuICAgICAgcmVuZGVyZXIuc2V0U3R5bGUoZHJvcGRvd25NZW51RWxlbWVudCwgJ3Bvc2l0aW9uJywgJ3N0YXRpYycpO1xuXG4gICAgICByZW5kZXJlci5hcHBlbmRDaGlsZChib2R5Q29udGFpbmVyLCBkcm9wZG93bk1lbnVFbGVtZW50KTtcbiAgICAgIHJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuX2RvY3VtZW50LmJvZHksIGJvZHlDb250YWluZXIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FwcGx5UGxhY2VtZW50Q2xhc3NlcyhwbGFjZW1lbnQ/OiBQbGFjZW1lbnQpIHtcbiAgICBpZiAodGhpcy5fbWVudSkge1xuICAgICAgaWYgKCFwbGFjZW1lbnQpIHtcbiAgICAgICAgcGxhY2VtZW50ID0gQXJyYXkuaXNBcnJheSh0aGlzLnBsYWNlbWVudCkgPyB0aGlzLnBsYWNlbWVudFswXSA6IHRoaXMucGxhY2VtZW50LnNwbGl0KCcgJylbMF0gYXMgUGxhY2VtZW50O1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyO1xuICAgICAgY29uc3QgZHJvcGRvd25FbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAvLyByZW1vdmUgdGhlIGN1cnJlbnQgcGxhY2VtZW50IGNsYXNzZXNcbiAgICAgIHJlbmRlcmVyLnJlbW92ZUNsYXNzKGRyb3Bkb3duRWxlbWVudCwgJ2Ryb3B1cCcpO1xuICAgICAgcmVuZGVyZXIucmVtb3ZlQ2xhc3MoZHJvcGRvd25FbGVtZW50LCAnZHJvcGRvd24nKTtcbiAgICAgIHRoaXMuX21lbnUucGxhY2VtZW50ID0gcGxhY2VtZW50O1xuXG4gICAgICAvKlxuICAgICAgKiBhcHBseSB0aGUgbmV3IHBsYWNlbWVudFxuICAgICAgKiBpbiBjYXNlIG9mIHRvcCB1c2UgdXAtYXJyb3cgb3IgZG93bi1hcnJvdyBvdGhlcndpc2VcbiAgICAgICovXG4gICAgICBjb25zdCBkcm9wZG93bkNsYXNzID0gcGxhY2VtZW50LnNlYXJjaCgnXnRvcCcpICE9PSAtMSA/ICdkcm9wdXAnIDogJ2Ryb3Bkb3duJztcbiAgICAgIHJlbmRlcmVyLmFkZENsYXNzKGRyb3Bkb3duRWxlbWVudCwgZHJvcGRvd25DbGFzcyk7XG5cbiAgICAgIGNvbnN0IGJvZHlDb250YWluZXIgPSB0aGlzLl9ib2R5Q29udGFpbmVyO1xuICAgICAgaWYgKGJvZHlDb250YWluZXIpIHtcbiAgICAgICAgcmVuZGVyZXIucmVtb3ZlQ2xhc3MoYm9keUNvbnRhaW5lciwgJ2Ryb3B1cCcpO1xuICAgICAgICByZW5kZXJlci5yZW1vdmVDbGFzcyhib2R5Q29udGFpbmVyLCAnZHJvcGRvd24nKTtcbiAgICAgICAgcmVuZGVyZXIuYWRkQ2xhc3MoYm9keUNvbnRhaW5lciwgZHJvcGRvd25DbGFzcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=