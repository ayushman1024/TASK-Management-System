/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ContentChildren, QueryList, Directive, TemplateRef, Output, EventEmitter } from '@angular/core';
import { NgbTabsetConfig } from './tabset-config';
/** @type {?} */
let nextId = 0;
/**
 * This directive should be used to wrap tab titles that need to contain HTML markup or other directives.
 */
export class NgbTabTitle {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbTabTitle.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbTabTitle]' },] }
];
/** @nocollapse */
NgbTabTitle.ctorParameters = () => [
    { type: TemplateRef }
];
if (false) {
    /** @type {?} */
    NgbTabTitle.prototype.templateRef;
}
/**
 * This directive must be used to wrap content to be displayed in a tab.
 */
export class NgbTabContent {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbTabContent.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbTabContent]' },] }
];
/** @nocollapse */
NgbTabContent.ctorParameters = () => [
    { type: TemplateRef }
];
if (false) {
    /** @type {?} */
    NgbTabContent.prototype.templateRef;
}
/**
 * A directive representing an individual tab.
 */
export class NgbTab {
    constructor() {
        /**
         * Unique tab identifier. Must be unique for the entire document for proper accessibility support.
         */
        this.id = `ngb-tab-${nextId++}`;
        /**
         * Allows toggling disabled state of a given state. Disabled tabs can't be selected.
         */
        this.disabled = false;
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
        // only @ContentChildren allows us to specify the {descendants: false} option.
        // Without {descendants: false} we are hitting bugs described in:
        // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
        this.titleTpl = this.titleTpls.first;
        this.contentTpl = this.contentTpls.first;
    }
}
NgbTab.decorators = [
    { type: Directive, args: [{ selector: 'ngb-tab' },] }
];
NgbTab.propDecorators = {
    id: [{ type: Input }],
    title: [{ type: Input }],
    disabled: [{ type: Input }],
    titleTpls: [{ type: ContentChildren, args: [NgbTabTitle, { descendants: false },] }],
    contentTpls: [{ type: ContentChildren, args: [NgbTabContent, { descendants: false },] }]
};
if (false) {
    /**
     * Unique tab identifier. Must be unique for the entire document for proper accessibility support.
     * @type {?}
     */
    NgbTab.prototype.id;
    /**
     * Simple (string only) title. Use the "NgbTabTitle" directive for more complex use-cases.
     * @type {?}
     */
    NgbTab.prototype.title;
    /**
     * Allows toggling disabled state of a given state. Disabled tabs can't be selected.
     * @type {?}
     */
    NgbTab.prototype.disabled;
    /** @type {?} */
    NgbTab.prototype.titleTpl;
    /** @type {?} */
    NgbTab.prototype.contentTpl;
    /** @type {?} */
    NgbTab.prototype.titleTpls;
    /** @type {?} */
    NgbTab.prototype.contentTpls;
}
/**
 * The payload of the change event fired right before the tab change
 * @record
 */
export function NgbTabChangeEvent() { }
if (false) {
    /**
     * Id of the currently active tab
     * @type {?}
     */
    NgbTabChangeEvent.prototype.activeId;
    /**
     * Id of the newly selected tab
     * @type {?}
     */
    NgbTabChangeEvent.prototype.nextId;
    /**
     * Function that will prevent tab switch if called
     * @type {?}
     */
    NgbTabChangeEvent.prototype.preventDefault;
}
/**
 * A component that makes it easy to create tabbed interface.
 */
export class NgbTabset {
    /**
     * @param {?} config
     */
    constructor(config) {
        /**
         * Whether the closed tabs should be hidden without destroying them
         */
        this.destroyOnHide = true;
        /**
         * A tab change event fired right before the tab selection happens. See NgbTabChangeEvent for payload details
         */
        this.tabChange = new EventEmitter();
        this.type = config.type;
        this.justify = config.justify;
        this.orientation = config.orientation;
    }
    /**
     * The horizontal alignment of the nav with flexbox utilities. Can be one of 'start', 'center', 'end', 'fill' or
     * 'justified'
     * The default value is 'start'.
     * @param {?} className
     * @return {?}
     */
    set justify(className) {
        if (className === 'fill' || className === 'justified') {
            this.justifyClass = `nav-${className}`;
        }
        else {
            this.justifyClass = `justify-content-${className}`;
        }
    }
    /**
     * Selects the tab with the given id and shows its associated pane.
     * Any other tab that was previously selected becomes unselected and its associated pane is hidden.
     * @param {?} tabId
     * @return {?}
     */
    select(tabId) {
        /** @type {?} */
        let selectedTab = this._getTabById(tabId);
        if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
            /** @type {?} */
            let defaultPrevented = false;
            this.tabChange.emit({ activeId: this.activeId, nextId: selectedTab.id, preventDefault: () => { defaultPrevented = true; } });
            if (!defaultPrevented) {
                this.activeId = selectedTab.id;
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        // auto-correct activeId that might have been set incorrectly as input
        /** @type {?} */
        let activeTab = this._getTabById(this.activeId);
        this.activeId = activeTab ? activeTab.id : (this.tabs.length ? this.tabs.first.id : null);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    _getTabById(id) {
        /** @type {?} */
        let tabsWithId = this.tabs.filter(tab => tab.id === id);
        return tabsWithId.length ? tabsWithId[0] : null;
    }
}
NgbTabset.decorators = [
    { type: Component, args: [{
                selector: 'ngb-tabset',
                exportAs: 'ngbTabset',
                template: `
    <ul [class]="'nav nav-' + type + (orientation == 'horizontal'?  ' ' + justifyClass : ' flex-column')" role="tablist">
      <li class="nav-item" *ngFor="let tab of tabs">
        <a [id]="tab.id" class="nav-link" [class.active]="tab.id === activeId" [class.disabled]="tab.disabled"
          href (click)="select(tab.id); $event.preventDefault()" role="tab" [attr.tabindex]="(tab.disabled ? '-1': undefined)"
          [attr.aria-controls]="(!destroyOnHide || tab.id === activeId ? tab.id + '-panel' : null)"
          [attr.aria-expanded]="tab.id === activeId" [attr.aria-disabled]="tab.disabled">
          {{tab.title}}<ng-template [ngTemplateOutlet]="tab.titleTpl?.templateRef"></ng-template>
        </a>
      </li>
    </ul>
    <div class="tab-content">
      <ng-template ngFor let-tab [ngForOf]="tabs">
        <div
          class="tab-pane {{tab.id === activeId ? 'active' : null}}"
          *ngIf="!destroyOnHide || tab.id === activeId"
          role="tabpanel"
          [attr.aria-labelledby]="tab.id" id="{{tab.id}}-panel"
          [attr.aria-expanded]="tab.id === activeId">
          <ng-template [ngTemplateOutlet]="tab.contentTpl?.templateRef"></ng-template>
        </div>
      </ng-template>
    </div>
  `
            }] }
];
/** @nocollapse */
NgbTabset.ctorParameters = () => [
    { type: NgbTabsetConfig }
];
NgbTabset.propDecorators = {
    tabs: [{ type: ContentChildren, args: [NgbTab,] }],
    activeId: [{ type: Input }],
    destroyOnHide: [{ type: Input }],
    justify: [{ type: Input }],
    orientation: [{ type: Input }],
    type: [{ type: Input }],
    tabChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NgbTabset.prototype.justifyClass;
    /** @type {?} */
    NgbTabset.prototype.tabs;
    /**
     * An identifier of an initially selected (active) tab. Use the "select" method to switch a tab programmatically.
     * @type {?}
     */
    NgbTabset.prototype.activeId;
    /**
     * Whether the closed tabs should be hidden without destroying them
     * @type {?}
     */
    NgbTabset.prototype.destroyOnHide;
    /**
     * The orientation of the nav (horizontal or vertical).
     * The default value is 'horizontal'.
     * @type {?}
     */
    NgbTabset.prototype.orientation;
    /**
     * Type of navigation to be used for tabs. Can be one of Bootstrap defined types ('tabs' or 'pills').
     * Since 3.0.0 can also be an arbitrary string (for custom themes).
     * @type {?}
     */
    NgbTabset.prototype.type;
    /**
     * A tab change event fired right before the tab selection happens. See NgbTabChangeEvent for payload details
     * @type {?}
     */
    NgbTabset.prototype.tabChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0YWJzZXQvdGFic2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxlQUFlLEVBQ2YsU0FBUyxFQUNULFNBQVMsRUFDVCxXQUFXLEVBR1gsTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUJBQWlCLENBQUM7O0lBRTVDLE1BQU0sR0FBRyxDQUFDOzs7O0FBTWQsTUFBTSxPQUFPLFdBQVc7Ozs7SUFDdEIsWUFBbUIsV0FBNkI7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0lBQUcsQ0FBQzs7O1lBRnJELFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSwwQkFBMEIsRUFBQzs7OztZQWIvQyxXQUFXOzs7O0lBZUMsa0NBQW9DOzs7OztBQU9sRCxNQUFNLE9BQU8sYUFBYTs7OztJQUN4QixZQUFtQixXQUE2QjtRQUE3QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7SUFBRyxDQUFDOzs7WUFGckQsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLDRCQUE0QixFQUFDOzs7O1lBckJqRCxXQUFXOzs7O0lBdUJDLG9DQUFvQzs7Ozs7QUFPbEQsTUFBTSxPQUFPLE1BQU07SUFEbkI7Ozs7UUFLVyxPQUFFLEdBQUcsV0FBVyxNQUFNLEVBQUUsRUFBRSxDQUFDOzs7O1FBUTNCLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFnQjVCLENBQUM7Ozs7SUFSQyxxQkFBcUI7UUFDbkIsOEZBQThGO1FBQzlGLDhFQUE4RTtRQUM5RSxpRUFBaUU7UUFDakUsMkRBQTJEO1FBQzNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENB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QUFDOzs7WUEzR0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCVDthQUNGOzs7O1lBeEdPLGVBQWU7OzttQkE0R3BCLGVBQWUsU0FBQyxNQUFNO3VCQUt0QixLQUFLOzRCQUtMLEtBQUs7c0JBT0wsS0FBSzswQkFhTCxLQUFLO21CQU1MLEtBQUs7d0JBS0wsTUFBTTs7OztJQTNDUCxpQ0FBcUI7O0lBRXJCLHlCQUFpRDs7Ozs7SUFLakQsNkJBQTBCOzs7OztJQUsxQixrQ0FBOEI7Ozs7OztJQW9COUIsZ0NBQWdEOzs7Ozs7SUFNaEQseUJBQXlDOzs7OztJQUt6Qyw4QkFBNEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgRGlyZWN0aXZlLFxuICBUZW1wbGF0ZVJlZixcbiAgQ29udGVudENoaWxkLFxuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdiVGFic2V0Q29uZmlnfSBmcm9tICcuL3RhYnNldC1jb25maWcnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSBzaG91bGQgYmUgdXNlZCB0byB3cmFwIHRhYiB0aXRsZXMgdGhhdCBuZWVkIHRvIGNvbnRhaW4gSFRNTCBtYXJrdXAgb3Igb3RoZXIgZGlyZWN0aXZlcy5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JUYWJUaXRsZV0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JUYWJUaXRsZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSBtdXN0IGJlIHVzZWQgdG8gd3JhcCBjb250ZW50IHRvIGJlIGRpc3BsYXllZCBpbiBhIHRhYi5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JUYWJDb250ZW50XSd9KVxuZXhwb3J0IGNsYXNzIE5nYlRhYkNvbnRlbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgcmVwcmVzZW50aW5nIGFuIGluZGl2aWR1YWwgdGFiLlxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nYi10YWInfSlcbmV4cG9ydCBjbGFzcyBOZ2JUYWIge1xuICAvKipcbiAgICogVW5pcXVlIHRhYiBpZGVudGlmaWVyLiBNdXN0IGJlIHVuaXF1ZSBmb3IgdGhlIGVudGlyZSBkb2N1bWVudCBmb3IgcHJvcGVyIGFjY2Vzc2liaWxpdHkgc3VwcG9ydC5cbiAgICovXG4gIEBJbnB1dCgpIGlkID0gYG5nYi10YWItJHtuZXh0SWQrK31gO1xuICAvKipcbiAgICogU2ltcGxlIChzdHJpbmcgb25seSkgdGl0bGUuIFVzZSB0aGUgXCJOZ2JUYWJUaXRsZVwiIGRpcmVjdGl2ZSBmb3IgbW9yZSBjb21wbGV4IHVzZS1jYXNlcy5cbiAgICovXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBBbGxvd3MgdG9nZ2xpbmcgZGlzYWJsZWQgc3RhdGUgb2YgYSBnaXZlbiBzdGF0ZS4gRGlzYWJsZWQgdGFicyBjYW4ndCBiZSBzZWxlY3RlZC5cbiAgICovXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgdGl0bGVUcGw6IE5nYlRhYlRpdGxlIHwgbnVsbDtcbiAgY29udGVudFRwbDogTmdiVGFiQ29udGVudCB8IG51bGw7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JUYWJUaXRsZSwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIHRpdGxlVHBsczogUXVlcnlMaXN0PE5nYlRhYlRpdGxlPjtcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JUYWJDb250ZW50LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgY29udGVudFRwbHM6IFF1ZXJ5TGlzdDxOZ2JUYWJDb250ZW50PjtcblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgLy8gV2UgYXJlIHVzaW5nIEBDb250ZW50Q2hpbGRyZW4gaW5zdGVhZCBvZiBAQ29udGVudENoaWxkIGFzIGluIHRoZSBBbmd1bGFyIHZlcnNpb24gYmVpbmcgdXNlZFxuICAgIC8vIG9ubHkgQENvbnRlbnRDaGlsZHJlbiBhbGxvd3MgdXMgdG8gc3BlY2lmeSB0aGUge2Rlc2NlbmRhbnRzOiBmYWxzZX0gb3B0aW9uLlxuICAgIC8vIFdpdGhvdXQge2Rlc2NlbmRhbnRzOiBmYWxzZX0gd2UgYXJlIGhpdHRpbmcgYnVncyBkZXNjcmliZWQgaW46XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvaXNzdWVzLzIyNDBcbiAgICB0aGlzLnRpdGxlVHBsID0gdGhpcy50aXRsZVRwbHMuZmlyc3Q7XG4gICAgdGhpcy5jb250ZW50VHBsID0gdGhpcy5jb250ZW50VHBscy5maXJzdDtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBwYXlsb2FkIG9mIHRoZSBjaGFuZ2UgZXZlbnQgZmlyZWQgcmlnaHQgYmVmb3JlIHRoZSB0YWIgY2hhbmdlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiVGFiQ2hhbmdlRXZlbnQge1xuICAvKipcbiAgICogSWQgb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgdGFiXG4gICAqL1xuICBhY3RpdmVJZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBJZCBvZiB0aGUgbmV3bHkgc2VsZWN0ZWQgdGFiXG4gICAqL1xuICBuZXh0SWQ6IHN0cmluZztcblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCB3aWxsIHByZXZlbnQgdGFiIHN3aXRjaCBpZiBjYWxsZWRcbiAgICovXG4gIHByZXZlbnREZWZhdWx0OiAoKSA9PiB2b2lkO1xufVxuXG4vKipcbiAqIEEgY29tcG9uZW50IHRoYXQgbWFrZXMgaXQgZWFzeSB0byBjcmVhdGUgdGFiYmVkIGludGVyZmFjZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLXRhYnNldCcsXG4gIGV4cG9ydEFzOiAnbmdiVGFic2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8dWwgW2NsYXNzXT1cIiduYXYgbmF2LScgKyB0eXBlICsgKG9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJz8gICcgJyArIGp1c3RpZnlDbGFzcyA6ICcgZmxleC1jb2x1bW4nKVwiIHJvbGU9XCJ0YWJsaXN0XCI+XG4gICAgICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiICpuZ0Zvcj1cImxldCB0YWIgb2YgdGFic1wiPlxuICAgICAgICA8YSBbaWRdPVwidGFiLmlkXCIgY2xhc3M9XCJuYXYtbGlua1wiIFtjbGFzcy5hY3RpdmVdPVwidGFiLmlkID09PSBhY3RpdmVJZFwiIFtjbGFzcy5kaXNhYmxlZF09XCJ0YWIuZGlzYWJsZWRcIlxuICAgICAgICAgIGhyZWYgKGNsaWNrKT1cInNlbGVjdCh0YWIuaWQpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiIHJvbGU9XCJ0YWJcIiBbYXR0ci50YWJpbmRleF09XCIodGFiLmRpc2FibGVkID8gJy0xJzogdW5kZWZpbmVkKVwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCIoIWRlc3Ryb3lPbkhpZGUgfHwgdGFiLmlkID09PSBhY3RpdmVJZCA/IHRhYi5pZCArICctcGFuZWwnIDogbnVsbClcIlxuICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwidGFiLmlkID09PSBhY3RpdmVJZFwiIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwidGFiLmRpc2FibGVkXCI+XG4gICAgICAgICAge3t0YWIudGl0bGV9fTxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0YWIudGl0bGVUcGw/LnRlbXBsYXRlUmVmXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9hPlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICAgIDxkaXYgY2xhc3M9XCJ0YWItY29udGVudFwiPlxuICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC10YWIgW25nRm9yT2ZdPVwidGFic1wiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJ0YWItcGFuZSB7e3RhYi5pZCA9PT0gYWN0aXZlSWQgPyAnYWN0aXZlJyA6IG51bGx9fVwiXG4gICAgICAgICAgKm5nSWY9XCIhZGVzdHJveU9uSGlkZSB8fCB0YWIuaWQgPT09IGFjdGl2ZUlkXCJcbiAgICAgICAgICByb2xlPVwidGFicGFuZWxcIlxuICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJ0YWIuaWRcIiBpZD1cInt7dGFiLmlkfX0tcGFuZWxcIlxuICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwidGFiLmlkID09PSBhY3RpdmVJZFwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0YWIuY29udGVudFRwbD8udGVtcGxhdGVSZWZcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTmdiVGFic2V0IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XG4gIGp1c3RpZnlDbGFzczogc3RyaW5nO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiVGFiKSB0YWJzOiBRdWVyeUxpc3Q8TmdiVGFiPjtcblxuICAvKipcbiAgICogQW4gaWRlbnRpZmllciBvZiBhbiBpbml0aWFsbHkgc2VsZWN0ZWQgKGFjdGl2ZSkgdGFiLiBVc2UgdGhlIFwic2VsZWN0XCIgbWV0aG9kIHRvIHN3aXRjaCBhIHRhYiBwcm9ncmFtbWF0aWNhbGx5LlxuICAgKi9cbiAgQElucHV0KCkgYWN0aXZlSWQ6IHN0cmluZztcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgY2xvc2VkIHRhYnMgc2hvdWxkIGJlIGhpZGRlbiB3aXRob3V0IGRlc3Ryb3lpbmcgdGhlbVxuICAgKi9cbiAgQElucHV0KCkgZGVzdHJveU9uSGlkZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBob3Jpem9udGFsIGFsaWdubWVudCBvZiB0aGUgbmF2IHdpdGggZmxleGJveCB1dGlsaXRpZXMuIENhbiBiZSBvbmUgb2YgJ3N0YXJ0JywgJ2NlbnRlcicsICdlbmQnLCAnZmlsbCcgb3JcbiAgICogJ2p1c3RpZmllZCdcbiAgICogVGhlIGRlZmF1bHQgdmFsdWUgaXMgJ3N0YXJ0Jy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBqdXN0aWZ5KGNsYXNzTmFtZTogJ3N0YXJ0JyB8ICdjZW50ZXInIHwgJ2VuZCcgfCAnZmlsbCcgfCAnanVzdGlmaWVkJykge1xuICAgIGlmIChjbGFzc05hbWUgPT09ICdmaWxsJyB8fCBjbGFzc05hbWUgPT09ICdqdXN0aWZpZWQnKSB7XG4gICAgICB0aGlzLmp1c3RpZnlDbGFzcyA9IGBuYXYtJHtjbGFzc05hbWV9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5qdXN0aWZ5Q2xhc3MgPSBganVzdGlmeS1jb250ZW50LSR7Y2xhc3NOYW1lfWA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBvcmllbnRhdGlvbiBvZiB0aGUgbmF2IChob3Jpem9udGFsIG9yIHZlcnRpY2FsKS5cbiAgICogVGhlIGRlZmF1bHQgdmFsdWUgaXMgJ2hvcml6b250YWwnLlxuICAgKi9cbiAgQElucHV0KCkgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc7XG5cbiAgLyoqXG4gICAqIFR5cGUgb2YgbmF2aWdhdGlvbiB0byBiZSB1c2VkIGZvciB0YWJzLiBDYW4gYmUgb25lIG9mIEJvb3RzdHJhcCBkZWZpbmVkIHR5cGVzICgndGFicycgb3IgJ3BpbGxzJykuXG4gICAqIFNpbmNlIDMuMC4wIGNhbiBhbHNvIGJlIGFuIGFyYml0cmFyeSBzdHJpbmcgKGZvciBjdXN0b20gdGhlbWVzKS5cbiAgICovXG4gIEBJbnB1dCgpIHR5cGU6ICd0YWJzJyB8ICdwaWxscycgfCBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgdGFiIGNoYW5nZSBldmVudCBmaXJlZCByaWdodCBiZWZvcmUgdGhlIHRhYiBzZWxlY3Rpb24gaGFwcGVucy4gU2VlIE5nYlRhYkNoYW5nZUV2ZW50IGZvciBwYXlsb2FkIGRldGFpbHNcbiAgICovXG4gIEBPdXRwdXQoKSB0YWJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlRhYkNoYW5nZUV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiVGFic2V0Q29uZmlnKSB7XG4gICAgdGhpcy50eXBlID0gY29uZmlnLnR5cGU7XG4gICAgdGhpcy5qdXN0aWZ5ID0gY29uZmlnLmp1c3RpZnk7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IGNvbmZpZy5vcmllbnRhdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3RzIHRoZSB0YWIgd2l0aCB0aGUgZ2l2ZW4gaWQgYW5kIHNob3dzIGl0cyBhc3NvY2lhdGVkIHBhbmUuXG4gICAqIEFueSBvdGhlciB0YWIgdGhhdCB3YXMgcHJldmlvdXNseSBzZWxlY3RlZCBiZWNvbWVzIHVuc2VsZWN0ZWQgYW5kIGl0cyBhc3NvY2lhdGVkIHBhbmUgaXMgaGlkZGVuLlxuICAgKi9cbiAgc2VsZWN0KHRhYklkOiBzdHJpbmcpIHtcbiAgICBsZXQgc2VsZWN0ZWRUYWIgPSB0aGlzLl9nZXRUYWJCeUlkKHRhYklkKTtcbiAgICBpZiAoc2VsZWN0ZWRUYWIgJiYgIXNlbGVjdGVkVGFiLmRpc2FibGVkICYmIHRoaXMuYWN0aXZlSWQgIT09IHNlbGVjdGVkVGFiLmlkKSB7XG4gICAgICBsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuXG4gICAgICB0aGlzLnRhYkNoYW5nZS5lbWl0KFxuICAgICAgICAgIHthY3RpdmVJZDogdGhpcy5hY3RpdmVJZCwgbmV4dElkOiBzZWxlY3RlZFRhYi5pZCwgcHJldmVudERlZmF1bHQ6ICgpID0+IHsgZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7IH19KTtcblxuICAgICAgaWYgKCFkZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSWQgPSBzZWxlY3RlZFRhYi5pZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgLy8gYXV0by1jb3JyZWN0IGFjdGl2ZUlkIHRoYXQgbWlnaHQgaGF2ZSBiZWVuIHNldCBpbmNvcnJlY3RseSBhcyBpbnB1dFxuICAgIGxldCBhY3RpdmVUYWIgPSB0aGlzLl9nZXRUYWJCeUlkKHRoaXMuYWN0aXZlSWQpO1xuICAgIHRoaXMuYWN0aXZlSWQgPSBhY3RpdmVUYWIgPyBhY3RpdmVUYWIuaWQgOiAodGhpcy50YWJzLmxlbmd0aCA/IHRoaXMudGFicy5maXJzdC5pZCA6IG51bGwpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0VGFiQnlJZChpZDogc3RyaW5nKTogTmdiVGFiIHtcbiAgICBsZXQgdGFic1dpdGhJZDogTmdiVGFiW10gPSB0aGlzLnRhYnMuZmlsdGVyKHRhYiA9PiB0YWIuaWQgPT09IGlkKTtcbiAgICByZXR1cm4gdGFic1dpdGhJZC5sZW5ndGggPyB0YWJzV2l0aElkWzBdIDogbnVsbDtcbiAgfVxufVxuIl19