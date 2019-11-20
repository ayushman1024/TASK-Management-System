/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChildren, Directive, EventEmitter, forwardRef, Host, Inject, Input, Optional, Output, QueryList, TemplateRef } from '@angular/core';
import { isString } from '../util/util';
import { NgbAccordionConfig } from './accordion-config';
/** @type {?} */
let nextId = 0;
/**
 * A context for the `NgbPanelHeader` template
 *
 * \@since 4.1.0
 * @record
 */
export function NgbPanelHeaderContext() { }
if (false) {
    /**
     * True if current panel is opened
     * @type {?}
     */
    NgbPanelHeaderContext.prototype.opened;
}
/**
 * A directive to put on a button that toggles panel opening and closing.
 * To be used inside the `NgbPanelHeader`
 *
 * \@since 4.1.0
 */
export class NgbPanelToggle {
    /**
     * @param {?} accordion
     * @param {?} panel
     */
    constructor(accordion, panel) {
        this.accordion = accordion;
        this.panel = panel;
    }
    /**
     * @param {?} panel
     * @return {?}
     */
    set ngbPanelToggle(panel) {
        if (panel) {
            this.panel = panel;
        }
    }
}
NgbPanelToggle.decorators = [
    { type: Directive, args: [{
                selector: 'button[ngbPanelToggle]',
                host: {
                    'type': 'button',
                    '[disabled]': 'panel.disabled',
                    '[class.collapsed]': '!panel.isOpen',
                    '[attr.aria-expanded]': 'panel.isOpen',
                    '[attr.aria-controls]': 'panel.id',
                    '(click)': 'accordion.toggle(panel.id)'
                }
            },] }
];
/** @nocollapse */
NgbPanelToggle.ctorParameters = () => [
    { type: NgbAccordion, decorators: [{ type: Inject, args: [forwardRef(() => NgbAccordion),] }] },
    { type: NgbPanel, decorators: [{ type: Optional }, { type: Host }, { type: Inject, args: [forwardRef(() => NgbPanel),] }] }
];
NgbPanelToggle.propDecorators = {
    ngbPanelToggle: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgbPanelToggle.prototype.accordion;
    /** @type {?} */
    NgbPanelToggle.prototype.panel;
}
/**
 * A directive to wrap an accordion panel header to contain any HTML markup and a toggling button with `NgbPanelToggle`
 *
 * \@since 4.1.0
 */
export class NgbPanelHeader {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPanelHeader.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPanelHeader]' },] }
];
/** @nocollapse */
NgbPanelHeader.ctorParameters = () => [
    { type: TemplateRef }
];
if (false) {
    /** @type {?} */
    NgbPanelHeader.prototype.templateRef;
}
/**
 * This directive should be used to wrap accordion panel titles that need to contain HTML markup or other directives.
 */
export class NgbPanelTitle {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPanelTitle.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPanelTitle]' },] }
];
/** @nocollapse */
NgbPanelTitle.ctorParameters = () => [
    { type: TemplateRef }
];
if (false) {
    /** @type {?} */
    NgbPanelTitle.prototype.templateRef;
}
/**
 * This directive must be used to wrap accordion panel content.
 */
export class NgbPanelContent {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPanelContent.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPanelContent]' },] }
];
/** @nocollapse */
NgbPanelContent.ctorParameters = () => [
    { type: TemplateRef }
];
if (false) {
    /** @type {?} */
    NgbPanelContent.prototype.templateRef;
}
/**
 * The NgbPanel directive represents an individual panel with the title and collapsible
 * content
 */
export class NgbPanel {
    constructor() {
        /**
         *  A flag determining whether the panel is disabled or not.
         *  When disabled, the panel cannot be toggled.
         */
        this.disabled = false;
        /**
         *  An optional id for the panel. The id should be unique.
         *  If not provided, it will be auto-generated.
         */
        this.id = `ngb-panel-${nextId++}`;
        /**
         * A flag telling if the panel is currently open
         */
        this.isOpen = false;
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
        this.headerTpl = this.headerTpls.first;
        this.contentTpl = this.contentTpls.first;
    }
}
NgbPanel.decorators = [
    { type: Directive, args: [{ selector: 'ngb-panel' },] }
];
NgbPanel.propDecorators = {
    disabled: [{ type: Input }],
    id: [{ type: Input }],
    title: [{ type: Input }],
    type: [{ type: Input }],
    titleTpls: [{ type: ContentChildren, args: [NgbPanelTitle, { descendants: false },] }],
    headerTpls: [{ type: ContentChildren, args: [NgbPanelHeader, { descendants: false },] }],
    contentTpls: [{ type: ContentChildren, args: [NgbPanelContent, { descendants: false },] }]
};
if (false) {
    /**
     *  A flag determining whether the panel is disabled or not.
     *  When disabled, the panel cannot be toggled.
     * @type {?}
     */
    NgbPanel.prototype.disabled;
    /**
     *  An optional id for the panel. The id should be unique.
     *  If not provided, it will be auto-generated.
     * @type {?}
     */
    NgbPanel.prototype.id;
    /**
     * A flag telling if the panel is currently open
     * @type {?}
     */
    NgbPanel.prototype.isOpen;
    /**
     *  The title for the panel.
     * @type {?}
     */
    NgbPanel.prototype.title;
    /**
     *  Accordion's types of panels to be applied per panel basis.
     *  Bootstrap recognizes the following types: "primary", "secondary", "success", "danger", "warning", "info", "light"
     * and "dark"
     * @type {?}
     */
    NgbPanel.prototype.type;
    /** @type {?} */
    NgbPanel.prototype.titleTpl;
    /** @type {?} */
    NgbPanel.prototype.headerTpl;
    /** @type {?} */
    NgbPanel.prototype.contentTpl;
    /** @type {?} */
    NgbPanel.prototype.titleTpls;
    /** @type {?} */
    NgbPanel.prototype.headerTpls;
    /** @type {?} */
    NgbPanel.prototype.contentTpls;
}
/**
 * The payload of the change event fired right before toggling an accordion panel
 * @record
 */
export function NgbPanelChangeEvent() { }
if (false) {
    /**
     * Id of the accordion panel that is toggled
     * @type {?}
     */
    NgbPanelChangeEvent.prototype.panelId;
    /**
     * Whether the panel will be opened (true) or closed (false)
     * @type {?}
     */
    NgbPanelChangeEvent.prototype.nextState;
    /**
     * Function that will prevent panel toggling if called
     * @type {?}
     */
    NgbPanelChangeEvent.prototype.preventDefault;
}
/**
 * The NgbAccordion directive is a collection of panels.
 * It can assure that only one panel can be opened at a time.
 */
export class NgbAccordion {
    /**
     * @param {?} config
     */
    constructor(config) {
        /**
         * An array or comma separated strings of panel identifiers that should be opened
         */
        this.activeIds = [];
        /**
         * Whether the closed panels should be hidden without destroying them
         */
        this.destroyOnHide = true;
        /**
         * A panel change event fired right before the panel toggle happens. See NgbPanelChangeEvent for payload details
         */
        this.panelChange = new EventEmitter();
        this.type = config.type;
        this.closeOtherPanels = config.closeOthers;
    }
    /**
     * Checks if a panel with a given id is expanded or not.
     * @param {?} panelId
     * @return {?}
     */
    isExpanded(panelId) { return this.activeIds.indexOf(panelId) > -1; }
    /**
     * Expands a panel with a given id. Has no effect if the panel is already expanded or disabled.
     * @param {?} panelId
     * @return {?}
     */
    expand(panelId) { this._changeOpenState(this._findPanelById(panelId), true); }
    /**
     * Expands all panels if [closeOthers]="false". For the [closeOthers]="true" case will have no effect if there is an
     * open panel, otherwise the first panel will be expanded.
     * @return {?}
     */
    expandAll() {
        if (this.closeOtherPanels) {
            if (this.activeIds.length === 0 && this.panels.length) {
                this._changeOpenState(this.panels.first, true);
            }
        }
        else {
            this.panels.forEach(panel => this._changeOpenState(panel, true));
        }
    }
    /**
     * Collapses a panel with a given id. Has no effect if the panel is already collapsed or disabled.
     * @param {?} panelId
     * @return {?}
     */
    collapse(panelId) { this._changeOpenState(this._findPanelById(panelId), false); }
    /**
     * Collapses all open panels.
     * @return {?}
     */
    collapseAll() {
        this.panels.forEach((panel) => { this._changeOpenState(panel, false); });
    }
    /**
     * Programmatically toggle a panel with a given id. Has no effect if the panel is disabled.
     * @param {?} panelId
     * @return {?}
     */
    toggle(panelId) {
        /** @type {?} */
        const panel = this._findPanelById(panelId);
        if (panel) {
            this._changeOpenState(panel, !panel.isOpen);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        // active id updates
        if (isString(this.activeIds)) {
            this.activeIds = this.activeIds.split(/\s*,\s*/);
        }
        // update panels open states
        this.panels.forEach(panel => panel.isOpen = !panel.disabled && this.activeIds.indexOf(panel.id) > -1);
        // closeOthers updates
        if (this.activeIds.length > 1 && this.closeOtherPanels) {
            this._closeOthers(this.activeIds[0]);
            this._updateActiveIds();
        }
    }
    /**
     * @param {?} panel
     * @param {?} nextState
     * @return {?}
     */
    _changeOpenState(panel, nextState) {
        if (panel && !panel.disabled && panel.isOpen !== nextState) {
            /** @type {?} */
            let defaultPrevented = false;
            this.panelChange.emit({ panelId: panel.id, nextState: nextState, preventDefault: () => { defaultPrevented = true; } });
            if (!defaultPrevented) {
                panel.isOpen = nextState;
                if (nextState && this.closeOtherPanels) {
                    this._closeOthers(panel.id);
                }
                this._updateActiveIds();
            }
        }
    }
    /**
     * @param {?} panelId
     * @return {?}
     */
    _closeOthers(panelId) {
        this.panels.forEach(panel => {
            if (panel.id !== panelId) {
                panel.isOpen = false;
            }
        });
    }
    /**
     * @param {?} panelId
     * @return {?}
     */
    _findPanelById(panelId) { return this.panels.find(p => p.id === panelId); }
    /**
     * @return {?}
     */
    _updateActiveIds() {
        this.activeIds = this.panels.filter(panel => panel.isOpen && !panel.disabled).map(panel => panel.id);
    }
}
NgbAccordion.decorators = [
    { type: Component, args: [{
                selector: 'ngb-accordion',
                exportAs: 'ngbAccordion',
                host: { 'class': 'accordion', 'role': 'tablist', '[attr.aria-multiselectable]': '!closeOtherPanels' },
                template: `
    <ng-template #t ngbPanelHeader let-panel>
      <button class="btn btn-link" [ngbPanelToggle]="panel">
        {{panel.title}}<ng-template [ngTemplateOutlet]="panel.titleTpl?.templateRef"></ng-template>
      </button>
    </ng-template>
    <ng-template ngFor let-panel [ngForOf]="panels">
      <div class="card">
        <div role="tab" id="{{panel.id}}-header" [class]="'card-header ' + (panel.type ? 'bg-'+panel.type: type ? 'bg-'+type : '')">
          <ng-template [ngTemplateOutlet]="panel.headerTpl?.templateRef || t"
                       [ngTemplateOutletContext]="{$implicit: panel, opened: panel.isOpen}"></ng-template>
        </div>
        <div id="{{panel.id}}" role="tabpanel" [attr.aria-labelledby]="panel.id + '-header'"
             class="collapse" [class.show]="panel.isOpen" *ngIf="!destroyOnHide || panel.isOpen">
          <div class="card-body">
               <ng-template [ngTemplateOutlet]="panel.contentTpl?.templateRef"></ng-template>
          </div>
        </div>
      </div>
    </ng-template>
  `
            }] }
];
/** @nocollapse */
NgbAccordion.ctorParameters = () => [
    { type: NgbAccordionConfig }
];
NgbAccordion.propDecorators = {
    panels: [{ type: ContentChildren, args: [NgbPanel,] }],
    activeIds: [{ type: Input }],
    closeOtherPanels: [{ type: Input, args: ['closeOthers',] }],
    destroyOnHide: [{ type: Input }],
    type: [{ type: Input }],
    panelChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NgbAccordion.prototype.panels;
    /**
     * An array or comma separated strings of panel identifiers that should be opened
     * @type {?}
     */
    NgbAccordion.prototype.activeIds;
    /**
     *  Whether the other panels should be closed when a panel is opened
     * @type {?}
     */
    NgbAccordion.prototype.closeOtherPanels;
    /**
     * Whether the closed panels should be hidden without destroying them
     * @type {?}
     */
    NgbAccordion.prototype.destroyOnHide;
    /**
     *  Accordion's types of panels to be applied globally.
     *  Bootstrap recognizes the following types: "primary", "secondary", "success", "danger", "warning", "info", "light"
     * and "dark
     * @type {?}
     */
    NgbAccordion.prototype.type;
    /**
     * A panel change event fired right before the panel toggle happens. See NgbPanelChangeEvent for payload details
     * @type {?}
     */
    NgbAccordion.prototype.panelChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJhY2NvcmRpb24vYWNjb3JkaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixJQUFJLEVBQ0osTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUV0QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7SUFFbEQsTUFBTSxHQUFHLENBQUM7Ozs7Ozs7QUFPZCwyQ0FLQzs7Ozs7O0lBREMsdUNBQWdCOzs7Ozs7OztBQW9CbEIsTUFBTSxPQUFPLGNBQWM7Ozs7O0lBUXpCLFlBQ21ELFNBQXVCLEVBQ1AsS0FBZTtRQUQvQixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBQ1AsVUFBSyxHQUFMLEtBQUssQ0FBVTtJQUFHLENBQUM7Ozs7O0lBVHRGLElBQ0ksY0FBYyxDQUFDLEtBQWU7UUFDaEMsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUNwQjtJQUNILENBQUM7OztZQWpCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsSUFBSSxFQUFFO29CQUNKLE1BQU0sRUFBRSxRQUFRO29CQUNoQixZQUFZLEVBQUUsZ0JBQWdCO29CQUM5QixtQkFBbUIsRUFBRSxlQUFlO29CQUNwQyxzQkFBc0IsRUFBRSxjQUFjO29CQUN0QyxzQkFBc0IsRUFBRSxVQUFVO29CQUNsQyxTQUFTLEVBQUUsNEJBQTRCO2lCQUN4QzthQUNGOzs7O1lBVStELFlBQVksdUJBQXJFLE1BQU0s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QkFBNkIsRUFBRSxtQkFBbUIsRUFBQztnQkFDbkcsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CVDthQUNGOzs7O1lBL0tPLGtCQUFrQjs7O3FCQWlMdkIsZUFBZSxTQUFDLFFBQVE7d0JBS3hCLEtBQUs7K0JBS0wsS0FBSyxTQUFDLGFBQWE7NEJBS25CLEtBQUs7bUJBT0wsS0FBSzswQkFLTCxNQUFNOzs7O0lBM0JQLDhCQUF1RDs7Ozs7SUFLdkQsaUNBQTJDOzs7OztJQUszQyx3Q0FBZ0Q7Ozs7O0lBS2hELHFDQUE4Qjs7Ozs7OztJQU85Qiw0QkFBc0I7Ozs7O0lBS3RCLG1DQUFnRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudENoZWNrZWQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdCxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtpc1N0cmluZ30gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuaW1wb3J0IHtOZ2JBY2NvcmRpb25Db25maWd9IGZyb20gJy4vYWNjb3JkaW9uLWNvbmZpZyc7XG5cbmxldCBuZXh0SWQgPSAwO1xuXG4vKipcbiAqIEEgY29udGV4dCBmb3IgdGhlIGBOZ2JQYW5lbEhlYWRlcmAgdGVtcGxhdGVcbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JQYW5lbEhlYWRlckNvbnRleHQge1xuICAvKipcbiAgICogVHJ1ZSBpZiBjdXJyZW50IHBhbmVsIGlzIG9wZW5lZFxuICAgKi9cbiAgb3BlbmVkOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIHB1dCBvbiBhIGJ1dHRvbiB0aGF0IHRvZ2dsZXMgcGFuZWwgb3BlbmluZyBhbmQgY2xvc2luZy5cbiAqIFRvIGJlIHVzZWQgaW5zaWRlIHRoZSBgTmdiUGFuZWxIZWFkZXJgXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2J1dHRvbltuZ2JQYW5lbFRvZ2dsZV0nLFxuICBob3N0OiB7XG4gICAgJ3R5cGUnOiAnYnV0dG9uJyxcbiAgICAnW2Rpc2FibGVkXSc6ICdwYW5lbC5kaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5jb2xsYXBzZWRdJzogJyFwYW5lbC5pc09wZW4nLFxuICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdwYW5lbC5pc09wZW4nLFxuICAgICdbYXR0ci5hcmlhLWNvbnRyb2xzXSc6ICdwYW5lbC5pZCcsXG4gICAgJyhjbGljayknOiAnYWNjb3JkaW9uLnRvZ2dsZShwYW5lbC5pZCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTmdiUGFuZWxUb2dnbGUge1xuICBASW5wdXQoKVxuICBzZXQgbmdiUGFuZWxUb2dnbGUocGFuZWw6IE5nYlBhbmVsKSB7XG4gICAgaWYgKHBhbmVsKSB7XG4gICAgICB0aGlzLnBhbmVsID0gcGFuZWw7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiQWNjb3JkaW9uKSkgcHVibGljIGFjY29yZGlvbjogTmdiQWNjb3JkaW9uLFxuICAgICAgQE9wdGlvbmFsKCkgQEhvc3QoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiUGFuZWwpKSBwdWJsaWMgcGFuZWw6IE5nYlBhbmVsKSB7fVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIHdyYXAgYW4gYWNjb3JkaW9uIHBhbmVsIGhlYWRlciB0byBjb250YWluIGFueSBIVE1MIG1hcmt1cCBhbmQgYSB0b2dnbGluZyBidXR0b24gd2l0aCBgTmdiUGFuZWxUb2dnbGVgXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFuZWxIZWFkZXJdJ30pXG5leHBvcnQgY2xhc3MgTmdiUGFuZWxIZWFkZXIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cbi8qKlxuICogVGhpcyBkaXJlY3RpdmUgc2hvdWxkIGJlIHVzZWQgdG8gd3JhcCBhY2NvcmRpb24gcGFuZWwgdGl0bGVzIHRoYXQgbmVlZCB0byBjb250YWluIEhUTUwgbWFya3VwIG9yIG90aGVyIGRpcmVjdGl2ZXMuXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFuZWxUaXRsZV0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYW5lbFRpdGxlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG4vKipcbiAqIFRoaXMgZGlyZWN0aXZlIG11c3QgYmUgdXNlZCB0byB3cmFwIGFjY29yZGlvbiBwYW5lbCBjb250ZW50LlxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlBhbmVsQ29udGVudF0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYW5lbENvbnRlbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cbi8qKlxuICogVGhlIE5nYlBhbmVsIGRpcmVjdGl2ZSByZXByZXNlbnRzIGFuIGluZGl2aWR1YWwgcGFuZWwgd2l0aCB0aGUgdGl0bGUgYW5kIGNvbGxhcHNpYmxlXG4gKiBjb250ZW50XG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmdiLXBhbmVsJ30pXG5leHBvcnQgY2xhc3MgTmdiUGFuZWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkIHtcbiAgLyoqXG4gICAqICBBIGZsYWcgZGV0ZXJtaW5pbmcgd2hldGhlciB0aGUgcGFuZWwgaXMgZGlzYWJsZWQgb3Igbm90LlxuICAgKiAgV2hlbiBkaXNhYmxlZCwgdGhlIHBhbmVsIGNhbm5vdCBiZSB0b2dnbGVkLlxuICAgKi9cbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogIEFuIG9wdGlvbmFsIGlkIGZvciB0aGUgcGFuZWwuIFRoZSBpZCBzaG91bGQgYmUgdW5pcXVlLlxuICAgKiAgSWYgbm90IHByb3ZpZGVkLCBpdCB3aWxsIGJlIGF1dG8tZ2VuZXJhdGVkLlxuICAgKi9cbiAgQElucHV0KCkgaWQgPSBgbmdiLXBhbmVsLSR7bmV4dElkKyt9YDtcblxuICAvKipcbiAgICogQSBmbGFnIHRlbGxpbmcgaWYgdGhlIHBhbmVsIGlzIGN1cnJlbnRseSBvcGVuXG4gICAqL1xuICBpc09wZW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogIFRoZSB0aXRsZSBmb3IgdGhlIHBhbmVsLlxuICAgKi9cbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcblxuICAvKipcbiAgICogIEFjY29yZGlvbidzIHR5cGVzIG9mIHBhbmVscyB0byBiZSBhcHBsaWVkIHBlciBwYW5lbCBiYXNpcy5cbiAgICogIEJvb3RzdHJhcCByZWNvZ25pemVzIHRoZSBmb2xsb3dpbmcgdHlwZXM6IFwicHJpbWFyeVwiLCBcInNlY29uZGFyeVwiLCBcInN1Y2Nlc3NcIiwgXCJkYW5nZXJcIiwgXCJ3YXJuaW5nXCIsIFwiaW5mb1wiLCBcImxpZ2h0XCJcbiAgICogYW5kIFwiZGFya1wiXG4gICAqL1xuICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XG5cbiAgdGl0bGVUcGw6IE5nYlBhbmVsVGl0bGUgfCBudWxsO1xuICBoZWFkZXJUcGw6IE5nYlBhbmVsSGVhZGVyIHwgbnVsbDtcbiAgY29udGVudFRwbDogTmdiUGFuZWxDb250ZW50IHwgbnVsbDtcblxuICBAQ29udGVudENoaWxkcmVuKE5nYlBhbmVsVGl0bGUsIHtkZXNjZW5kYW50czogZmFsc2V9KSB0aXRsZVRwbHM6IFF1ZXJ5TGlzdDxOZ2JQYW5lbFRpdGxlPjtcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JQYW5lbEhlYWRlciwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIGhlYWRlclRwbHM6IFF1ZXJ5TGlzdDxOZ2JQYW5lbEhlYWRlcj47XG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiUGFuZWxDb250ZW50LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgY29udGVudFRwbHM6IFF1ZXJ5TGlzdDxOZ2JQYW5lbENvbnRlbnQ+O1xuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAvLyBXZSBhcmUgdXNpbmcgQENvbnRlbnRDaGlsZHJlbiBpbnN0ZWFkIG9mIEBDb250ZW50Q2hpbGQgYXMgaW4gdGhlIEFuZ3VsYXIgdmVyc2lvbiBiZWluZyB1c2VkXG4gICAgLy8gb25seSBAQ29udGVudENoaWxkcmVuIGFsbG93cyB1cyB0byBzcGVjaWZ5IHRoZSB7ZGVzY2VuZGFudHM6IGZhbHNlfSBvcHRpb24uXG4gICAgLy8gV2l0aG91dCB7ZGVzY2VuZGFudHM6IGZhbHNlfSB3ZSBhcmUgaGl0dGluZyBidWdzIGRlc2NyaWJlZCBpbjpcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9pc3N1ZXMvMjI0MFxuICAgIHRoaXMudGl0bGVUcGwgPSB0aGlzLnRpdGxlVHBscy5maXJzdDtcbiAgICB0aGlzLmhlYWRlclRwbCA9IHRoaXMuaGVhZGVyVHBscy5maXJzdDtcbiAgICB0aGlzLmNvbnRlbnRUcGwgPSB0aGlzLmNvbnRlbnRUcGxzLmZpcnN0O1xuICB9XG59XG5cbi8qKlxuICogVGhlIHBheWxvYWQgb2YgdGhlIGNoYW5nZSBldmVudCBmaXJlZCByaWdodCBiZWZvcmUgdG9nZ2xpbmcgYW4gYWNjb3JkaW9uIHBhbmVsXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiUGFuZWxDaGFuZ2VFdmVudCB7XG4gIC8qKlxuICAgKiBJZCBvZiB0aGUgYWNjb3JkaW9uIHBhbmVsIHRoYXQgaXMgdG9nZ2xlZFxuICAgKi9cbiAgcGFuZWxJZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBwYW5lbCB3aWxsIGJlIG9wZW5lZCAodHJ1ZSkgb3IgY2xvc2VkIChmYWxzZSlcbiAgICovXG4gIG5leHRTdGF0ZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCB3aWxsIHByZXZlbnQgcGFuZWwgdG9nZ2xpbmcgaWYgY2FsbGVkXG4gICAqL1xuICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBUaGUgTmdiQWNjb3JkaW9uIGRpcmVjdGl2ZSBpcyBhIGNvbGxlY3Rpb24gb2YgcGFuZWxzLlxuICogSXQgY2FuIGFzc3VyZSB0aGF0IG9ubHkgb25lIHBhbmVsIGNhbiBiZSBvcGVuZWQgYXQgYSB0aW1lLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItYWNjb3JkaW9uJyxcbiAgZXhwb3J0QXM6ICduZ2JBY2NvcmRpb24nLFxuICBob3N0OiB7J2NsYXNzJzogJ2FjY29yZGlvbicsICdyb2xlJzogJ3RhYmxpc3QnLCAnW2F0dHIuYXJpYS1tdWx0aXNlbGVjdGFibGVdJzogJyFjbG9zZU90aGVyUGFuZWxzJ30sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICN0IG5nYlBhbmVsSGVhZGVyIGxldC1wYW5lbD5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbbmdiUGFuZWxUb2dnbGVdPVwicGFuZWxcIj5cbiAgICAgICAge3twYW5lbC50aXRsZX19PG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInBhbmVsLnRpdGxlVHBsPy50ZW1wbGF0ZVJlZlwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtcGFuZWwgW25nRm9yT2ZdPVwicGFuZWxzXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICA8ZGl2IHJvbGU9XCJ0YWJcIiBpZD1cInt7cGFuZWwuaWR9fS1oZWFkZXJcIiBbY2xhc3NdPVwiJ2NhcmQtaGVhZGVyICcgKyAocGFuZWwudHlwZSA/ICdiZy0nK3BhbmVsLnR5cGU6IHR5cGUgPyAnYmctJyt0eXBlIDogJycpXCI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInBhbmVsLmhlYWRlclRwbD8udGVtcGxhdGVSZWYgfHwgdFwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7JGltcGxpY2l0OiBwYW5lbCwgb3BlbmVkOiBwYW5lbC5pc09wZW59XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgaWQ9XCJ7e3BhbmVsLmlkfX1cIiByb2xlPVwidGFicGFuZWxcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwicGFuZWwuaWQgKyAnLWhlYWRlcidcIlxuICAgICAgICAgICAgIGNsYXNzPVwiY29sbGFwc2VcIiBbY2xhc3Muc2hvd109XCJwYW5lbC5pc09wZW5cIiAqbmdJZj1cIiFkZXN0cm95T25IaWRlIHx8IHBhbmVsLmlzT3BlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJwYW5lbC5jb250ZW50VHBsPy50ZW1wbGF0ZVJlZlwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JBY2NvcmRpb24gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkIHtcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JQYW5lbCkgcGFuZWxzOiBRdWVyeUxpc3Q8TmdiUGFuZWw+O1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvciBjb21tYSBzZXBhcmF0ZWQgc3RyaW5ncyBvZiBwYW5lbCBpZGVudGlmaWVycyB0aGF0IHNob3VsZCBiZSBvcGVuZWRcbiAgICovXG4gIEBJbnB1dCgpIGFjdGl2ZUlkczogc3RyaW5nIHwgc3RyaW5nW10gPSBbXTtcblxuICAvKipcbiAgICogIFdoZXRoZXIgdGhlIG90aGVyIHBhbmVscyBzaG91bGQgYmUgY2xvc2VkIHdoZW4gYSBwYW5lbCBpcyBvcGVuZWRcbiAgICovXG4gIEBJbnB1dCgnY2xvc2VPdGhlcnMnKSBjbG9zZU90aGVyUGFuZWxzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBjbG9zZWQgcGFuZWxzIHNob3VsZCBiZSBoaWRkZW4gd2l0aG91dCBkZXN0cm95aW5nIHRoZW1cbiAgICovXG4gIEBJbnB1dCgpIGRlc3Ryb3lPbkhpZGUgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiAgQWNjb3JkaW9uJ3MgdHlwZXMgb2YgcGFuZWxzIHRvIGJlIGFwcGxpZWQgZ2xvYmFsbHkuXG4gICAqICBCb290c3RyYXAgcmVjb2duaXplcyB0aGUgZm9sbG93aW5nIHR5cGVzOiBcInByaW1hcnlcIiwgXCJzZWNvbmRhcnlcIiwgXCJzdWNjZXNzXCIsIFwiZGFuZ2VyXCIsIFwid2FybmluZ1wiLCBcImluZm9cIiwgXCJsaWdodFwiXG4gICAqIGFuZCBcImRhcmtcbiAgICovXG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcblxuICAvKipcbiAgICogQSBwYW5lbCBjaGFuZ2UgZXZlbnQgZmlyZWQgcmlnaHQgYmVmb3JlIHRoZSBwYW5lbCB0b2dnbGUgaGFwcGVucy4gU2VlIE5nYlBhbmVsQ2hhbmdlRXZlbnQgZm9yIHBheWxvYWQgZGV0YWlsc1xuICAgKi9cbiAgQE91dHB1dCgpIHBhbmVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JQYW5lbENoYW5nZUV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiQWNjb3JkaW9uQ29uZmlnKSB7XG4gICAgdGhpcy50eXBlID0gY29uZmlnLnR5cGU7XG4gICAgdGhpcy5jbG9zZU90aGVyUGFuZWxzID0gY29uZmlnLmNsb3NlT3RoZXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhIHBhbmVsIHdpdGggYSBnaXZlbiBpZCBpcyBleHBhbmRlZCBvciBub3QuXG4gICAqL1xuICBpc0V4cGFuZGVkKHBhbmVsSWQ6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5hY3RpdmVJZHMuaW5kZXhPZihwYW5lbElkKSA+IC0xOyB9XG5cbiAgLyoqXG4gICAqIEV4cGFuZHMgYSBwYW5lbCB3aXRoIGEgZ2l2ZW4gaWQuIEhhcyBubyBlZmZlY3QgaWYgdGhlIHBhbmVsIGlzIGFscmVhZHkgZXhwYW5kZWQgb3IgZGlzYWJsZWQuXG4gICAqL1xuICBleHBhbmQocGFuZWxJZDogc3RyaW5nKTogdm9pZCB7IHRoaXMuX2NoYW5nZU9wZW5TdGF0ZSh0aGlzLl9maW5kUGFuZWxCeUlkKHBhbmVsSWQpLCB0cnVlKTsgfVxuXG4gIC8qKlxuICAgKiBFeHBhbmRzIGFsbCBwYW5lbHMgaWYgW2Nsb3NlT3RoZXJzXT1cImZhbHNlXCIuIEZvciB0aGUgW2Nsb3NlT3RoZXJzXT1cInRydWVcIiBjYXNlIHdpbGwgaGF2ZSBubyBlZmZlY3QgaWYgdGhlcmUgaXMgYW5cbiAgICogb3BlbiBwYW5lbCwgb3RoZXJ3aXNlIHRoZSBmaXJzdCBwYW5lbCB3aWxsIGJlIGV4cGFuZGVkLlxuICAgKi9cbiAgZXhwYW5kQWxsKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNsb3NlT3RoZXJQYW5lbHMpIHtcbiAgICAgIGlmICh0aGlzLmFjdGl2ZUlkcy5sZW5ndGggPT09IDAgJiYgdGhpcy5wYW5lbHMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX2NoYW5nZU9wZW5TdGF0ZSh0aGlzLnBhbmVscy5maXJzdCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFuZWxzLmZvckVhY2gocGFuZWwgPT4gdGhpcy5fY2hhbmdlT3BlblN0YXRlKHBhbmVsLCB0cnVlKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbGxhcHNlcyBhIHBhbmVsIHdpdGggYSBnaXZlbiBpZC4gSGFzIG5vIGVmZmVjdCBpZiB0aGUgcGFuZWwgaXMgYWxyZWFkeSBjb2xsYXBzZWQgb3IgZGlzYWJsZWQuXG4gICAqL1xuICBjb2xsYXBzZShwYW5lbElkOiBzdHJpbmcpIHsgdGhpcy5fY2hhbmdlT3BlblN0YXRlKHRoaXMuX2ZpbmRQYW5lbEJ5SWQocGFuZWxJZCksIGZhbHNlKTsgfVxuXG4gIC8qKlxuICAgKiBDb2xsYXBzZXMgYWxsIG9wZW4gcGFuZWxzLlxuICAgKi9cbiAgY29sbGFwc2VBbGwoKSB7XG4gICAgdGhpcy5wYW5lbHMuZm9yRWFjaCgocGFuZWwpID0+IHsgdGhpcy5fY2hhbmdlT3BlblN0YXRlKHBhbmVsLCBmYWxzZSk7IH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2dyYW1tYXRpY2FsbHkgdG9nZ2xlIGEgcGFuZWwgd2l0aCBhIGdpdmVuIGlkLiBIYXMgbm8gZWZmZWN0IGlmIHRoZSBwYW5lbCBpcyBkaXNhYmxlZC5cbiAgICovXG4gIHRvZ2dsZShwYW5lbElkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwYW5lbCA9IHRoaXMuX2ZpbmRQYW5lbEJ5SWQocGFuZWxJZCk7XG4gICAgaWYgKHBhbmVsKSB7XG4gICAgICB0aGlzLl9jaGFuZ2VPcGVuU3RhdGUocGFuZWwsICFwYW5lbC5pc09wZW4pO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAvLyBhY3RpdmUgaWQgdXBkYXRlc1xuICAgIGlmIChpc1N0cmluZyh0aGlzLmFjdGl2ZUlkcykpIHtcbiAgICAgIHRoaXMuYWN0aXZlSWRzID0gdGhpcy5hY3RpdmVJZHMuc3BsaXQoL1xccyosXFxzKi8pO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBwYW5lbHMgb3BlbiBzdGF0ZXNcbiAgICB0aGlzLnBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHBhbmVsLmlzT3BlbiA9ICFwYW5lbC5kaXNhYmxlZCAmJiB0aGlzLmFjdGl2ZUlkcy5pbmRleE9mKHBhbmVsLmlkKSA+IC0xKTtcblxuICAgIC8vIGNsb3NlT3RoZXJzIHVwZGF0ZXNcbiAgICBpZiAodGhpcy5hY3RpdmVJZHMubGVuZ3RoID4gMSAmJiB0aGlzLmNsb3NlT3RoZXJQYW5lbHMpIHtcbiAgICAgIHRoaXMuX2Nsb3NlT3RoZXJzKHRoaXMuYWN0aXZlSWRzWzBdKTtcbiAgICAgIHRoaXMuX3VwZGF0ZUFjdGl2ZUlkcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NoYW5nZU9wZW5TdGF0ZShwYW5lbDogTmdiUGFuZWwsIG5leHRTdGF0ZTogYm9vbGVhbikge1xuICAgIGlmIChwYW5lbCAmJiAhcGFuZWwuZGlzYWJsZWQgJiYgcGFuZWwuaXNPcGVuICE9PSBuZXh0U3RhdGUpIHtcbiAgICAgIGxldCBkZWZhdWx0UHJldmVudGVkID0gZmFsc2U7XG5cbiAgICAgIHRoaXMucGFuZWxDaGFuZ2UuZW1pdChcbiAgICAgICAgICB7cGFuZWxJZDogcGFuZWwuaWQsIG5leHRTdGF0ZTogbmV4dFN0YXRlLCBwcmV2ZW50RGVmYXVsdDogKCkgPT4geyBkZWZhdWx0UHJldmVudGVkID0gdHJ1ZTsgfX0pO1xuXG4gICAgICBpZiAoIWRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgcGFuZWwuaXNPcGVuID0gbmV4dFN0YXRlO1xuXG4gICAgICAgIGlmIChuZXh0U3RhdGUgJiYgdGhpcy5jbG9zZU90aGVyUGFuZWxzKSB7XG4gICAgICAgICAgdGhpcy5fY2xvc2VPdGhlcnMocGFuZWwuaWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZUFjdGl2ZUlkcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Nsb3NlT3RoZXJzKHBhbmVsSWQ6IHN0cmluZykge1xuICAgIHRoaXMucGFuZWxzLmZvckVhY2gocGFuZWwgPT4ge1xuICAgICAgaWYgKHBhbmVsLmlkICE9PSBwYW5lbElkKSB7XG4gICAgICAgIHBhbmVsLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmluZFBhbmVsQnlJZChwYW5lbElkOiBzdHJpbmcpOiBOZ2JQYW5lbCB8IG51bGwgeyByZXR1cm4gdGhpcy5wYW5lbHMuZmluZChwID0+IHAuaWQgPT09IHBhbmVsSWQpOyB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQWN0aXZlSWRzKCkge1xuICAgIHRoaXMuYWN0aXZlSWRzID0gdGhpcy5wYW5lbHMuZmlsdGVyKHBhbmVsID0+IHBhbmVsLmlzT3BlbiAmJiAhcGFuZWwuZGlzYWJsZWQpLm1hcChwYW5lbCA9PiBwYW5lbC5pZCk7XG4gIH1cbn1cbiJdfQ==