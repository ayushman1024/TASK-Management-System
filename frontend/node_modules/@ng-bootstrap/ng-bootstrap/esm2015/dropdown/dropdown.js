/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class NgbDropdownItem {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
        this._disabled = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = (/** @type {?} */ (value)) === '' || value === true; // accept an empty attribute as true
    }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
}
NgbDropdownItem.decorators = [
    { type: Directive, args: [{ selector: '[ngbDropdownItem]', host: { 'class': 'dropdown-item', '[class.disabled]': 'disabled' } },] }
];
/** @nocollapse */
NgbDropdownItem.ctorParameters = () => [
    { type: ElementRef }
];
NgbDropdownItem.propDecorators = {
    disabled: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgbDropdownItem.prototype._disabled;
    /** @type {?} */
    NgbDropdownItem.prototype.elementRef;
}
/**
 *
 */
export class NgbDropdownMenu {
    /**
     * @param {?} dropdown
     */
    constructor(dropdown) {
        this.dropdown = dropdown;
        this.placement = 'bottom';
        this.isOpen = false;
    }
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
NgbDropdownMenu.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgbDropdown),] }] }
];
NgbDropdownMenu.propDecorators = {
    menuItems: [{ type: ContentChildren, args: [NgbDropdownItem,] }]
};
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
export class NgbDropdownAnchor {
    /**
     * @param {?} dropdown
     * @param {?} _elementRef
     */
    constructor(dropdown, _elementRef) {
        this.dropdown = dropdown;
        this._elementRef = _elementRef;
        this.anchorEl = _elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    getNativeElement() { return this._elementRef.nativeElement; }
}
NgbDropdownAnchor.decorators = [
    { type: Directive, args: [{
                selector: '[ngbDropdownAnchor]',
                host: { 'class': 'dropdown-toggle', 'aria-haspopup': 'true', '[attr.aria-expanded]': 'dropdown.isOpen()' }
            },] }
];
/** @nocollapse */
NgbDropdownAnchor.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgbDropdown),] }] },
    { type: ElementRef }
];
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
export class NgbDropdownToggle extends NgbDropdownAnchor {
    /**
     * @param {?} dropdown
     * @param {?} elementRef
     */
    constructor(dropdown, elementRef) {
        super(dropdown, elementRef);
    }
    /**
     * @return {?}
     */
    toggleOpen() { this.dropdown.toggle(); }
}
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
                providers: [{ provide: NgbDropdownAnchor, useExisting: forwardRef(() => NgbDropdownToggle) }]
            },] }
];
/** @nocollapse */
NgbDropdownToggle.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => NgbDropdown),] }] },
    { type: ElementRef }
];
/**
 * Transforms a node into a dropdown.
 */
export class NgbDropdown {
    /**
     * @param {?} _changeDetector
     * @param {?} config
     * @param {?} _document
     * @param {?} _ngZone
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    constructor(_changeDetector, config, _document, _ngZone, _elementRef, _renderer) {
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
        this._zoneSubscription = _ngZone.onStable.subscribe(() => { this._positionMenu(); });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._applyPlacementClasses();
        if (this._open) {
            this._setCloseHandlers();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.container && this._open) {
            this._applyContainer(this.container);
        }
        if (changes.placement && !changes.placement.isFirstChange) {
            this._applyPlacementClasses();
        }
    }
    /**
     * Checks if the dropdown menu is open or not.
     * @return {?}
     */
    isOpen() { return this._open; }
    /**
     * Opens the dropdown menu of a given navbar or tabbed navigation.
     * @return {?}
     */
    open() {
        if (!this._open) {
            this._open = true;
            this._applyContainer(this.container);
            this.openChange.emit(true);
            this._setCloseHandlers();
        }
    }
    /**
     * @return {?}
     */
    _setCloseHandlers() {
        ngbAutoClose(this._ngZone, this._document, this.autoClose, () => this.close(), this._closed$, this._menu ? [this._menuElement.nativeElement] : [], this._anchor ? [this._anchor.getNativeElement()] : []);
    }
    /**
     * Closes the dropdown menu of a given navbar or tabbed navigation.
     * @return {?}
     */
    close() {
        if (this._open) {
            this._open = false;
            this._resetContainer();
            this._closed$.next();
            this.openChange.emit(false);
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Toggles the dropdown menu of a given navbar or tabbed navigation.
     * @return {?}
     */
    toggle() {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._resetContainer();
        this._closed$.next();
        this._zoneSubscription.unsubscribe();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        /** @type {?} */
        const itemElements = this._getMenuElements();
        /** @type {?} */
        let position = -1;
        /** @type {?} */
        let isEventFromItems = false;
        /** @type {?} */
        const isEventFromToggle = this._isEventFromToggle(event);
        if (!isEventFromToggle) {
            itemElements.forEach((itemElement, index) => {
                if (itemElement.contains((/** @type {?} */ (event.target)))) {
                    isEventFromItems = true;
                }
                if (itemElement === this._document.activeElement) {
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
    }
    /**
     * @return {?}
     */
    _isDropup() { return this._elementRef.nativeElement.classList.contains('dropup'); }
    /**
     * @param {?} event
     * @return {?}
     */
    _isEventFromToggle(event) {
        return this._anchor.getNativeElement().contains((/** @type {?} */ (event.target)));
    }
    /**
     * @return {?}
     */
    _getMenuElements() {
        if (this._menu == null) {
            return [];
        }
        return this._menu.menuItems.filter(item => !item.disabled).map(item => item.elementRef.nativeElement);
    }
    /**
     * @return {?}
     */
    _positionMenu() {
        if (this.isOpen() && this._menu) {
            this._applyPlacementClasses(positionElements(this._anchor.anchorEl, this._bodyContainer || this._menuElement.nativeElement, this.placement, this.container === 'body'));
        }
    }
    /**
     * @return {?}
     */
    _resetContainer() {
        /** @type {?} */
        const renderer = this._renderer;
        if (this._menuElement) {
            /** @type {?} */
            const dropdownElement = this._elementRef.nativeElement;
            /** @type {?} */
            const dropdownMenuElement = this._menuElement.nativeElement;
            renderer.appendChild(dropdownElement, dropdownMenuElement);
            renderer.removeStyle(dropdownMenuElement, 'position');
            renderer.removeStyle(dropdownMenuElement, 'transform');
        }
        if (this._bodyContainer) {
            renderer.removeChild(this._document.body, this._bodyContainer);
            this._bodyContainer = null;
        }
    }
    /**
     * @param {?=} container
     * @return {?}
     */
    _applyContainer(container = null) {
        this._resetContainer();
        if (container === 'body') {
            /** @type {?} */
            const renderer = this._renderer;
            /** @type {?} */
            const dropdownMenuElement = this._menuElement.nativeElement;
            /** @type {?} */
            const bodyContainer = this._bodyContainer = this._bodyContainer || renderer.createElement('div');
            // Override some styles to have the positionning working
            renderer.setStyle(bodyContainer, 'position', 'absolute');
            renderer.setStyle(dropdownMenuElement, 'position', 'static');
            renderer.appendChild(bodyContainer, dropdownMenuElement);
            renderer.appendChild(this._document.body, bodyContainer);
        }
    }
    /**
     * @param {?=} placement
     * @return {?}
     */
    _applyPlacementClasses(placement) {
        if (this._menu) {
            if (!placement) {
                placement = Array.isArray(this.placement) ? this.placement[0] : (/** @type {?} */ (this.placement.split(' ')[0]));
            }
            /** @type {?} */
            const renderer = this._renderer;
            /** @type {?} */
            const dropdownElement = this._elementRef.nativeElement;
            // remove the current placement classes
            renderer.removeClass(dropdownElement, 'dropup');
            renderer.removeClass(dropdownElement, 'dropdown');
            this._menu.placement = placement;
            /*
                  * apply the new placement
                  * in case of top use up-arrow or down-arrow otherwise
                  */
            /** @type {?} */
            const dropdownClass = placement.search('^top') !== -1 ? 'dropup' : 'dropdown';
            renderer.addClass(dropdownElement, dropdownClass);
            /** @type {?} */
            const bodyContainer = this._bodyContainer;
            if (bodyContainer) {
                renderer.removeClass(bodyContainer, 'dropup');
                renderer.removeClass(bodyContainer, 'dropdown');
                renderer.addClass(bodyContainer, dropdownClass);
            }
        }
    }
}
NgbDropdown.decorators = [
    { type: Directive, args: [{ selector: '[ngbDropdown]', exportAs: 'ngbDropdown', host: { '[class.show]': 'isOpen()' } },] }
];
/** @nocollapse */
NgbDropdown.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NgbDropdownConfig },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NgZone },
    { type: ElementRef },
    { type: Renderer2 }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRyb3Bkb3duL2Ryb3Bkb3duLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWixlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUdOLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUVWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBNEIsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUVoQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7OztBQVNwRCxNQUFNLE9BQU8sZUFBZTs7OztJQVUxQixZQUFtQixVQUFtQztRQUFuQyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQVQ5QyxjQUFTLEdBQUcsS0FBSyxDQUFDO0lBUytCLENBQUM7Ozs7O0lBUDFELElBQ0ksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBSyxLQUFLLEVBQUEsS0FBSyxFQUFFLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFFLG9DQUFvQztJQUM3RixDQUFDOzs7O0lBRUQsSUFBSSxRQUFRLEtBQWMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7O1lBVG5ELFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxt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LGlCQUFpQjt3QkFTOUIsS0FBSztvQkFLTCxLQUFLLFNBQUMsTUFBTTt3QkFRWixLQUFLO3dCQVFMLEtBQUs7eUJBTUwsTUFBTTs7OztJQTNDUCwrQkFBdUM7O0lBQ3ZDLHdDQUF3Qzs7SUFDeEMscUNBQW9DOztJQUVwQyw0QkFBOEQ7O0lBQzlELG1DQUFvRjs7SUFFcEYsOEJBQW9FOzs7Ozs7Ozs7SUFTcEUsZ0NBQW1EOzs7OztJQUtuRCw0QkFBNkI7Ozs7Ozs7O0lBUTdCLGdDQUFtQzs7Ozs7Ozs7SUFRbkMsZ0NBQWtDOzs7Ozs7SUFNbEMsaUNBQTBDOztJQUd0QyxzQ0FBMEM7O0lBQTZCLGdDQUF3Qzs7SUFDL0csOEJBQXVCOztJQUFFLGtDQUE0Qzs7SUFBRSxnQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29udGVudENoaWxkLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7U3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtQbGFjZW1lbnQsIFBsYWNlbWVudEFycmF5LCBwb3NpdGlvbkVsZW1lbnRzfSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcbmltcG9ydCB7bmdiQXV0b0Nsb3NlfSBmcm9tICcuLi91dGlsL2F1dG9jbG9zZSc7XG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xuXG5pbXBvcnQge05nYkRyb3Bkb3duQ29uZmlnfSBmcm9tICcuL2Ryb3Bkb3duLWNvbmZpZyc7XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgeW91IHNob3VsZCBwdXQgcHV0IG9uIGEgZHJvcGRvd24gaXRlbSB0byBlbmFibGUga2V5Ym9hcmQgbmF2aWdhdGlvbi5cbiAqIEtleWJvYXJkIG5hdmlnYXRpb24gdXNpbmcgYXJyb3cga2V5cyB3aWxsIG1vdmUgZm9jdXMgYmV0d2VlbiBpdGVtcyBtYXJrZWQgd2l0aCB0aGlzIGRpcmVjdGl2ZS5cbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdiRHJvcGRvd25JdGVtXScsIGhvc3Q6IHsnY2xhc3MnOiAnZHJvcGRvd24taXRlbScsICdbY2xhc3MuZGlzYWJsZWRdJzogJ2Rpc2FibGVkJ319KVxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duSXRlbSB7XG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSA8YW55PnZhbHVlID09PSAnJyB8fCB2YWx1ZSA9PT0gdHJ1ZTsgIC8vIGFjY2VwdCBhbiBlbXB0eSBhdHRyaWJ1dGUgYXMgdHJ1ZVxuICB9XG5cbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHt9XG59XG5cbi8qKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdiRHJvcGRvd25NZW51XScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRyb3Bkb3duLW1lbnVdJzogJ3RydWUnLFxuICAgICdbY2xhc3Muc2hvd10nOiAnZHJvcGRvd24uaXNPcGVuKCknLFxuICAgICdbYXR0ci54LXBsYWNlbWVudF0nOiAncGxhY2VtZW50JyxcbiAgICAnKGtleWRvd24uQXJyb3dVcCknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxuICAgICcoa2V5ZG93bi5BcnJvd0Rvd24pJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcbiAgICAnKGtleWRvd24uSG9tZSknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxuICAgICcoa2V5ZG93bi5FbmQpJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duTWVudSB7XG4gIHBsYWNlbWVudDogUGxhY2VtZW50ID0gJ2JvdHRvbSc7XG4gIGlzT3BlbiA9IGZhbHNlO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiRHJvcGRvd25JdGVtKSBtZW51SXRlbXM6IFF1ZXJ5TGlzdDxOZ2JEcm9wZG93bkl0ZW0+O1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ2JEcm9wZG93bikpIHB1YmxpYyBkcm9wZG93bikge31cbn1cblxuLyoqXG4gKiBNYXJrcyBhbiBlbGVtZW50IHRvIHdoaWNoIGRyb3Bkb3duIG1lbnUgd2lsbCBiZSBhbmNob3JlZC4gVGhpcyBpcyBhIHNpbXBsZSB2ZXJzaW9uXG4gKiBvZiB0aGUgTmdiRHJvcGRvd25Ub2dnbGUgZGlyZWN0aXZlLiBJdCBwbGF5cyB0aGUgc2FtZSByb2xlIGFzIE5nYkRyb3Bkb3duVG9nZ2xlIGJ1dFxuICogZG9lc24ndCBsaXN0ZW4gdG8gY2xpY2sgZXZlbnRzIHRvIHRvZ2dsZSBkcm9wZG93biBtZW51IHRodXMgZW5hYmxpbmcgc3VwcG9ydCBmb3JcbiAqIGV2ZW50cyBvdGhlciB0aGFuIGNsaWNrLlxuICpcbiAqIEBzaW5jZSAxLjEuMFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdiRHJvcGRvd25BbmNob3JdJyxcbiAgaG9zdDogeydjbGFzcyc6ICdkcm9wZG93bi10b2dnbGUnLCAnYXJpYS1oYXNwb3B1cCc6ICd0cnVlJywgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2Ryb3Bkb3duLmlzT3BlbigpJ31cbn0pXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25BbmNob3Ige1xuICBhbmNob3JFbDtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd24pKSBwdWJsaWMgZHJvcGRvd24sIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgdGhpcy5hbmNob3JFbCA9IF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBnZXROYXRpdmVFbGVtZW50KCkgeyByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50OyB9XG59XG5cbi8qKlxuICogQWxsb3dzIHRoZSBkcm9wZG93biB0byBiZSB0b2dnbGVkIHZpYSBjbGljay4gVGhpcyBkaXJlY3RpdmUgaXMgb3B0aW9uYWw6IHlvdSBjYW4gdXNlIE5nYkRyb3Bkb3duQW5jaG9yIGFzIGFuXG4gKiBhbHRlcm5hdGl2ZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nYkRyb3Bkb3duVG9nZ2xlXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnZHJvcGRvd24tdG9nZ2xlJyxcbiAgICAnYXJpYS1oYXNwb3B1cCc6ICd0cnVlJyxcbiAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnZHJvcGRvd24uaXNPcGVuKCknLFxuICAgICcoY2xpY2spJzogJ3RvZ2dsZU9wZW4oKScsXG4gICAgJyhrZXlkb3duLkFycm93VXApJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcbiAgICAnKGtleWRvd24uQXJyb3dEb3duKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG4gICAgJyhrZXlkb3duLkhvbWUpJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcbiAgICAnKGtleWRvd24uRW5kKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KSdcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE5nYkRyb3Bkb3duQW5jaG9yLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JEcm9wZG93blRvZ2dsZSl9XVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93blRvZ2dsZSBleHRlbmRzIE5nYkRyb3Bkb3duQW5jaG9yIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYkRyb3Bkb3duKSkgZHJvcGRvd24sIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgc3VwZXIoZHJvcGRvd24sIGVsZW1lbnRSZWYpO1xuICB9XG5cbiAgdG9nZ2xlT3BlbigpIHsgdGhpcy5kcm9wZG93bi50b2dnbGUoKTsgfVxufVxuXG4vKipcbiAqIFRyYW5zZm9ybXMgYSBub2RlIGludG8gYSBkcm9wZG93bi5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdiRHJvcGRvd25dJywgZXhwb3J0QXM6ICduZ2JEcm9wZG93bicsIGhvc3Q6IHsnW2NsYXNzLnNob3ddJzogJ2lzT3BlbigpJ319KVxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9jbG9zZWQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfem9uZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIF9ib2R5Q29udGFpbmVyOiBIVE1MRWxlbWVudDtcblxuICBAQ29udGVudENoaWxkKE5nYkRyb3Bkb3duTWVudSkgcHJpdmF0ZSBfbWVudTogTmdiRHJvcGRvd25NZW51O1xuICBAQ29udGVudENoaWxkKE5nYkRyb3Bkb3duTWVudSwge3JlYWQ6IEVsZW1lbnRSZWZ9KSBwcml2YXRlIF9tZW51RWxlbWVudDogRWxlbWVudFJlZjtcblxuICBAQ29udGVudENoaWxkKE5nYkRyb3Bkb3duQW5jaG9yKSBwcml2YXRlIF9hbmNob3I6IE5nYkRyb3Bkb3duQW5jaG9yO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhhdCBkcm9wZG93biBzaG91bGQgYmUgY2xvc2VkIHdoZW4gc2VsZWN0aW5nIG9uZSBvZiBkcm9wZG93biBpdGVtcyAoY2xpY2spIG9yIHByZXNzaW5nIEVTQy5cbiAgICogV2hlbiBpdCBpcyB0cnVlIChkZWZhdWx0KSBkcm9wZG93bnMgYXJlIGF1dG9tYXRpY2FsbHkgY2xvc2VkIG9uIGJvdGggb3V0c2lkZSBhbmQgaW5zaWRlIChtZW51KSBjbGlja3MuXG4gICAqIFdoZW4gaXQgaXMgZmFsc2UgZHJvcGRvd25zIGFyZSBuZXZlciBhdXRvbWF0aWNhbGx5IGNsb3NlZC5cbiAgICogV2hlbiBpdCBpcyAnb3V0c2lkZScgZHJvcGRvd25zIGFyZSBhdXRvbWF0aWNhbGx5IGNsb3NlZCBvbiBvdXRzaWRlIGNsaWNrcyBidXQgbm90IG9uIG1lbnUgY2xpY2tzLlxuICAgKiBXaGVuIGl0IGlzICdpbnNpZGUnIGRyb3Bkb3ducyBhcmUgYXV0b21hdGljYWxseSBvbiBtZW51IGNsaWNrcyBidXQgbm90IG9uIG91dHNpZGUgY2xpY2tzLlxuICAgKi9cbiAgQElucHV0KCkgYXV0b0Nsb3NlOiBib29sZWFuIHwgJ291dHNpZGUnIHwgJ2luc2lkZSc7XG5cbiAgLyoqXG4gICAqICBEZWZpbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBkcm9wZG93bi1tZW51IGlzIG9wZW4gaW5pdGlhbGx5LlxuICAgKi9cbiAgQElucHV0KCdvcGVuJykgX29wZW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogUGxhY2VtZW50IG9mIGEgcG9wb3ZlciBhY2NlcHRzOlxuICAgKiAgICBcInRvcFwiLCBcInRvcC1sZWZ0XCIsIFwidG9wLXJpZ2h0XCIsIFwiYm90dG9tXCIsIFwiYm90dG9tLWxlZnRcIiwgXCJib3R0b20tcmlnaHRcIixcbiAgICogICAgXCJsZWZ0XCIsIFwibGVmdC10b3BcIiwgXCJsZWZ0LWJvdHRvbVwiLCBcInJpZ2h0XCIsIFwicmlnaHQtdG9wXCIsIFwicmlnaHQtYm90dG9tXCJcbiAgICogIGFycmF5IG9yIGEgc3BhY2Ugc2VwYXJhdGVkIHN0cmluZyBvZiBhYm92ZSB2YWx1ZXNcbiAgICovXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXk7XG5cbiAgLyoqXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgZHJvcGRvd24gc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxuICAgKiBDdXJyZW50bHkgb25seSBzdXBwb3J0cyBcImJvZHlcIi5cbiAgICpcbiAgICogQHNpbmNlIDQuMS4wXG4gICAqL1xuICBASW5wdXQoKSBjb250YWluZXI6IG51bGwgfCAnYm9keSc7XG5cbiAgLyoqXG4gICAqICBBbiBldmVudCBmaXJlZCB3aGVuIHRoZSBkcm9wZG93biBpcyBvcGVuZWQgb3IgY2xvc2VkLlxuICAgKiAgRXZlbnQncyBwYXlsb2FkIGVxdWFscyB3aGV0aGVyIGRyb3Bkb3duIGlzIG9wZW4uXG4gICAqL1xuICBAT3V0cHV0KCkgb3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZiwgY29uZmlnOiBOZ2JEcm9wZG93bkNvbmZpZywgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcbiAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMucGxhY2VtZW50ID0gY29uZmlnLnBsYWNlbWVudDtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XG4gICAgdGhpcy5hdXRvQ2xvc2UgPSBjb25maWcuYXV0b0Nsb3NlO1xuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24gPSBfbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSgoKSA9PiB7IHRoaXMuX3Bvc2l0aW9uTWVudSgpOyB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX2FwcGx5UGxhY2VtZW50Q2xhc3NlcygpO1xuICAgIGlmICh0aGlzLl9vcGVuKSB7XG4gICAgICB0aGlzLl9zZXRDbG9zZUhhbmRsZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmNvbnRhaW5lciAmJiB0aGlzLl9vcGVuKSB7XG4gICAgICB0aGlzLl9hcHBseUNvbnRhaW5lcih0aGlzLmNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMucGxhY2VtZW50ICYmICFjaGFuZ2VzLnBsYWNlbWVudC5pc0ZpcnN0Q2hhbmdlKSB7XG4gICAgICB0aGlzLl9hcHBseVBsYWNlbWVudENsYXNzZXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBkcm9wZG93biBtZW51IGlzIG9wZW4gb3Igbm90LlxuICAgKi9cbiAgaXNPcGVuKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fb3BlbjsgfVxuXG4gIC8qKlxuICAgKiBPcGVucyB0aGUgZHJvcGRvd24gbWVudSBvZiBhIGdpdmVuIG5hdmJhciBvciB0YWJiZWQgbmF2aWdhdGlvbi5cbiAgICovXG4gIG9wZW4oKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9vcGVuKSB7XG4gICAgICB0aGlzLl9vcGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2FwcGx5Q29udGFpbmVyKHRoaXMuY29udGFpbmVyKTtcbiAgICAgIHRoaXMub3BlbkNoYW5nZS5lbWl0KHRydWUpO1xuICAgICAgdGhpcy5fc2V0Q2xvc2VIYW5kbGVycygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NldENsb3NlSGFuZGxlcnMoKSB7XG4gICAgbmdiQXV0b0Nsb3NlKFxuICAgICAgICB0aGlzLl9uZ1pvbmUsIHRoaXMuX2RvY3VtZW50LCB0aGlzLmF1dG9DbG9zZSwgKCkgPT4gdGhpcy5jbG9zZSgpLCB0aGlzLl9jbG9zZWQkLFxuICAgICAgICB0aGlzLl9tZW51ID8gW3RoaXMuX21lbnVFbGVtZW50Lm5hdGl2ZUVsZW1lbnRdIDogW10sIHRoaXMuX2FuY2hvciA/IFt0aGlzLl9hbmNob3IuZ2V0TmF0aXZlRWxlbWVudCgpXSA6IFtdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIGRyb3Bkb3duIG1lbnUgb2YgYSBnaXZlbiBuYXZiYXIgb3IgdGFiYmVkIG5hdmlnYXRpb24uXG4gICAqL1xuICBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3Blbikge1xuICAgICAgdGhpcy5fb3BlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5fcmVzZXRDb250YWluZXIoKTtcbiAgICAgIHRoaXMuX2Nsb3NlZCQubmV4dCgpO1xuICAgICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIGRyb3Bkb3duIG1lbnUgb2YgYSBnaXZlbiBuYXZiYXIgb3IgdGFiYmVkIG5hdmlnYXRpb24uXG4gICAqL1xuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fcmVzZXRDb250YWluZXIoKTtcblxuICAgIHRoaXMuX2Nsb3NlZCQubmV4dCgpO1xuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnN0IGl0ZW1FbGVtZW50cyA9IHRoaXMuX2dldE1lbnVFbGVtZW50cygpO1xuXG4gICAgbGV0IHBvc2l0aW9uID0gLTE7XG4gICAgbGV0IGlzRXZlbnRGcm9tSXRlbXMgPSBmYWxzZTtcbiAgICBjb25zdCBpc0V2ZW50RnJvbVRvZ2dsZSA9IHRoaXMuX2lzRXZlbnRGcm9tVG9nZ2xlKGV2ZW50KTtcblxuICAgIGlmICghaXNFdmVudEZyb21Ub2dnbGUpIHtcbiAgICAgIGl0ZW1FbGVtZW50cy5mb3JFYWNoKChpdGVtRWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGl0ZW1FbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICBpc0V2ZW50RnJvbUl0ZW1zID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbUVsZW1lbnQgPT09IHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICBwb3NpdGlvbiA9IGluZGV4O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoaXNFdmVudEZyb21Ub2dnbGUgfHwgaXNFdmVudEZyb21JdGVtcykge1xuICAgICAgaWYgKCF0aGlzLmlzT3BlbigpKSB7XG4gICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgfVxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgIGNhc2UgS2V5LkFycm93RG93bjpcbiAgICAgICAgICBwb3NpdGlvbiA9IE1hdGgubWluKHBvc2l0aW9uICsgMSwgaXRlbUVsZW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5BcnJvd1VwOlxuICAgICAgICAgIGlmICh0aGlzLl9pc0Ryb3B1cCgpICYmIHBvc2l0aW9uID09PSAtMSkge1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpdGVtRWxlbWVudHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwb3NpdGlvbiA9IE1hdGgubWF4KHBvc2l0aW9uIC0gMSwgMCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS2V5LkhvbWU6XG4gICAgICAgICAgcG9zaXRpb24gPSAwO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5FbmQ6XG4gICAgICAgICAgcG9zaXRpb24gPSBpdGVtRWxlbWVudHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGl0ZW1FbGVtZW50c1twb3NpdGlvbl0uZm9jdXMoKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaXNEcm9wdXAoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wdXAnKTsgfVxuXG4gIHByaXZhdGUgX2lzRXZlbnRGcm9tVG9nZ2xlKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuX2FuY2hvci5nZXROYXRpdmVFbGVtZW50KCkuY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE1lbnVFbGVtZW50cygpOiBIVE1MRWxlbWVudFtdIHtcbiAgICBpZiAodGhpcy5fbWVudSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9tZW51Lm1lbnVJdGVtcy5maWx0ZXIoaXRlbSA9PiAhaXRlbS5kaXNhYmxlZCkubWFwKGl0ZW0gPT4gaXRlbS5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcG9zaXRpb25NZW51KCkge1xuICAgIGlmICh0aGlzLmlzT3BlbigpICYmIHRoaXMuX21lbnUpIHtcbiAgICAgIHRoaXMuX2FwcGx5UGxhY2VtZW50Q2xhc3NlcyhcbiAgICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxuICAgICAgICAgICAgICB0aGlzLl9hbmNob3IuYW5jaG9yRWwsIHRoaXMuX2JvZHlDb250YWluZXIgfHwgdGhpcy5fbWVudUVsZW1lbnQubmF0aXZlRWxlbWVudCwgdGhpcy5wbGFjZW1lbnQsXG4gICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID09PSAnYm9keScpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZXNldENvbnRhaW5lcigpIHtcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyO1xuICAgIGlmICh0aGlzLl9tZW51RWxlbWVudCkge1xuICAgICAgY29uc3QgZHJvcGRvd25FbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgY29uc3QgZHJvcGRvd25NZW51RWxlbWVudCA9IHRoaXMuX21lbnVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIHJlbmRlcmVyLmFwcGVuZENoaWxkKGRyb3Bkb3duRWxlbWVudCwgZHJvcGRvd25NZW51RWxlbWVudCk7XG4gICAgICByZW5kZXJlci5yZW1vdmVTdHlsZShkcm9wZG93bk1lbnVFbGVtZW50LCAncG9zaXRpb24nKTtcbiAgICAgIHJlbmRlcmVyLnJlbW92ZVN0eWxlKGRyb3Bkb3duTWVudUVsZW1lbnQsICd0cmFuc2Zvcm0nKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2JvZHlDb250YWluZXIpIHtcbiAgICAgIHJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuX2RvY3VtZW50LmJvZHksIHRoaXMuX2JvZHlDb250YWluZXIpO1xuICAgICAgdGhpcy5fYm9keUNvbnRhaW5lciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlDb250YWluZXIoY29udGFpbmVyOiBudWxsIHwgJ2JvZHknID0gbnVsbCkge1xuICAgIHRoaXMuX3Jlc2V0Q29udGFpbmVyKCk7XG4gICAgaWYgKGNvbnRhaW5lciA9PT0gJ2JvZHknKSB7XG4gICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyO1xuICAgICAgY29uc3QgZHJvcGRvd25NZW51RWxlbWVudCA9IHRoaXMuX21lbnVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBjb25zdCBib2R5Q29udGFpbmVyID0gdGhpcy5fYm9keUNvbnRhaW5lciA9IHRoaXMuX2JvZHlDb250YWluZXIgfHwgcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgIC8vIE92ZXJyaWRlIHNvbWUgc3R5bGVzIHRvIGhhdmUgdGhlIHBvc2l0aW9ubmluZyB3b3JraW5nXG4gICAgICByZW5kZXJlci5zZXRTdHlsZShib2R5Q29udGFpbmVyLCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcbiAgICAgIHJlbmRlcmVyLnNldFN0eWxlKGRyb3Bkb3duTWVudUVsZW1lbnQsICdwb3NpdGlvbicsICdzdGF0aWMnKTtcblxuICAgICAgcmVuZGVyZXIuYXBwZW5kQ2hpbGQoYm9keUNvbnRhaW5lciwgZHJvcGRvd25NZW51RWxlbWVudCk7XG4gICAgICByZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLl9kb2N1bWVudC5ib2R5LCBib2R5Q29udGFpbmVyKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hcHBseVBsYWNlbWVudENsYXNzZXMocGxhY2VtZW50PzogUGxhY2VtZW50KSB7XG4gICAgaWYgKHRoaXMuX21lbnUpIHtcbiAgICAgIGlmICghcGxhY2VtZW50KSB7XG4gICAgICAgIHBsYWNlbWVudCA9IEFycmF5LmlzQXJyYXkodGhpcy5wbGFjZW1lbnQpID8gdGhpcy5wbGFjZW1lbnRbMF0gOiB0aGlzLnBsYWNlbWVudC5zcGxpdCgnICcpWzBdIGFzIFBsYWNlbWVudDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLl9yZW5kZXJlcjtcbiAgICAgIGNvbnN0IGRyb3Bkb3duRWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgICAgLy8gcmVtb3ZlIHRoZSBjdXJyZW50IHBsYWNlbWVudCBjbGFzc2VzXG4gICAgICByZW5kZXJlci5yZW1vdmVDbGFzcyhkcm9wZG93bkVsZW1lbnQsICdkcm9wdXAnKTtcbiAgICAgIHJlbmRlcmVyLnJlbW92ZUNsYXNzKGRyb3Bkb3duRWxlbWVudCwgJ2Ryb3Bkb3duJyk7XG4gICAgICB0aGlzLl9tZW51LnBsYWNlbWVudCA9IHBsYWNlbWVudDtcblxuICAgICAgLypcbiAgICAgICogYXBwbHkgdGhlIG5ldyBwbGFjZW1lbnRcbiAgICAgICogaW4gY2FzZSBvZiB0b3AgdXNlIHVwLWFycm93IG9yIGRvd24tYXJyb3cgb3RoZXJ3aXNlXG4gICAgICAqL1xuICAgICAgY29uc3QgZHJvcGRvd25DbGFzcyA9IHBsYWNlbWVudC5zZWFyY2goJ150b3AnKSAhPT0gLTEgPyAnZHJvcHVwJyA6ICdkcm9wZG93bic7XG4gICAgICByZW5kZXJlci5hZGRDbGFzcyhkcm9wZG93bkVsZW1lbnQsIGRyb3Bkb3duQ2xhc3MpO1xuXG4gICAgICBjb25zdCBib2R5Q29udGFpbmVyID0gdGhpcy5fYm9keUNvbnRhaW5lcjtcbiAgICAgIGlmIChib2R5Q29udGFpbmVyKSB7XG4gICAgICAgIHJlbmRlcmVyLnJlbW92ZUNsYXNzKGJvZHlDb250YWluZXIsICdkcm9wdXAnKTtcbiAgICAgICAgcmVuZGVyZXIucmVtb3ZlQ2xhc3MoYm9keUNvbnRhaW5lciwgJ2Ryb3Bkb3duJyk7XG4gICAgICAgIHJlbmRlcmVyLmFkZENsYXNzKGJvZHlDb250YWluZXIsIGRyb3Bkb3duQ2xhc3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19