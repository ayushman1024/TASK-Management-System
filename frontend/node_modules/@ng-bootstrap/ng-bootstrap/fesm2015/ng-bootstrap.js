import { Injectable, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, EventEmitter, Inject, Input, NgZone, Output, PLATFORM_ID, TemplateRef, ViewEncapsulation, NgModule, LOCALE_ID, Injector, Renderer2, ElementRef, ViewContainerRef, ComponentFactoryResolver, InjectionToken, forwardRef, Host, Optional, ContentChild, defineInjectable, inject, ApplicationRef, RendererFactory2, INJECTOR, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser, FormStyle, getLocaleDayNames, getLocaleMonthNames, TranslationWidth, formatDate, DOCUMENT } from '@angular/common';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormsModule } from '@angular/forms';
import { merge, Subject, timer, fromEvent, race, Observable, BehaviorSubject } from 'rxjs';
import { filter, map, switchMap, takeUntil, take, delay, withLatestFrom, share, tap } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} value
 * @return {?}
 */
function toInteger(value) {
    return parseInt(`${value}`, 10);
}
/**
 * @param {?} value
 * @return {?}
 */
function toString(value) {
    return (value !== undefined && value !== null) ? `${value}` : '';
}
/**
 * @param {?} value
 * @param {?} max
 * @param {?=} min
 * @return {?}
 */
function getValueInRange(value, max, min = 0) {
    return Math.max(Math.min(value, max), min);
}
/**
 * @param {?} value
 * @return {?}
 */
function isString(value) {
    return typeof value === 'string';
}
/**
 * @param {?} value
 * @return {?}
 */
function isNumber(value) {
    return !isNaN(toInteger(value));
}
/**
 * @param {?} value
 * @return {?}
 */
function isInteger(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
/**
 * @param {?} value
 * @return {?}
 */
function isDefined(value) {
    return value !== undefined && value !== null;
}
/**
 * @param {?} value
 * @return {?}
 */
function padNumber(value) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    }
    else {
        return '';
    }
}
/**
 * @param {?} text
 * @return {?}
 */
function regExpEscape(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
/**
 * @param {?} element
 * @param {?} className
 * @return {?}
 */
function hasClassName(element, className) {
    return element && element.className && element.className.split &&
        element.className.split(/\s+/).indexOf(className) >= 0;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbAccordion component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the accordions used in the application.
 */
class NgbAccordionConfig {
    constructor() {
        this.closeOthers = false;
    }
}
NgbAccordionConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbAccordionConfig.ngInjectableDef = defineInjectable({ factory: function NgbAccordionConfig_Factory() { return new NgbAccordionConfig(); }, token: NgbAccordionConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
let nextId = 0;
/**
 * A directive to put on a button that toggles panel opening and closing.
 * To be used inside the `NgbPanelHeader`
 *
 * \@since 4.1.0
 */
class NgbPanelToggle {
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
/**
 * A directive to wrap an accordion panel header to contain any HTML markup and a toggling button with `NgbPanelToggle`
 *
 * \@since 4.1.0
 */
class NgbPanelHeader {
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
/**
 * This directive should be used to wrap accordion panel titles that need to contain HTML markup or other directives.
 */
class NgbPanelTitle {
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
/**
 * This directive must be used to wrap accordion panel content.
 */
class NgbPanelContent {
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
/**
 * The NgbPanel directive represents an individual panel with the title and collapsible
 * content
 */
class NgbPanel {
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
/**
 * The NgbAccordion directive is a collection of panels.
 * It can assure that only one panel can be opened at a time.
 */
class NgbAccordion {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_ACCORDION_DIRECTIVES = [NgbAccordion, NgbPanel, NgbPanelTitle, NgbPanelContent, NgbPanelHeader, NgbPanelToggle];
class NgbAccordionModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbAccordionModule }; }
}
NgbAccordionModule.decorators = [
    { type: NgModule, args: [{ declarations: NGB_ACCORDION_DIRECTIVES, exports: NGB_ACCORDION_DIRECTIVES, imports: [CommonModule] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbAlert component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the alerts used in the application.
 */
class NgbAlertConfig {
    constructor() {
        this.dismissible = true;
        this.type = 'warning';
    }
}
NgbAlertConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbAlertConfig.ngInjectableDef = defineInjectable({ factory: function NgbAlertConfig_Factory() { return new NgbAlertConfig(); }, token: NgbAlertConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Alerts can be used to provide feedback messages.
 */
class NgbAlert {
    /**
     * @param {?} config
     * @param {?} _renderer
     * @param {?} _element
     */
    constructor(config, _renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        /**
         * An event emitted when the close button is clicked. This event has no payload. Only relevant for dismissible alerts.
         */
        this.close = new EventEmitter();
        this.dismissible = config.dismissible;
        this.type = config.type;
    }
    /**
     * @return {?}
     */
    closeHandler() { this.close.emit(null); }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const typeChange = changes['type'];
        if (typeChange && !typeChange.firstChange) {
            this._renderer.removeClass(this._element.nativeElement, `alert-${typeChange.previousValue}`);
            this._renderer.addClass(this._element.nativeElement, `alert-${typeChange.currentValue}`);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() { this._renderer.addClass(this._element.nativeElement, `alert-${this.type}`); }
}
NgbAlert.decorators = [
    { type: Component, args: [{
                selector: 'ngb-alert',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: { 'role': 'alert', 'class': 'alert', '[class.alert-dismissible]': 'dismissible' },
                template: `
    <button *ngIf="dismissible" type="button" class="close" aria-label="Close" i18n-aria-label="@@ngb.alert.close"
      (click)="closeHandler()">
      <span aria-hidden="true">&times;</span>
    </button>
    <ng-content></ng-content>
    `,
                styles: ["ngb-alert{display:block}"]
            }] }
];
/** @nocollapse */
NgbAlert.ctorParameters = () => [
    { type: NgbAlertConfig },
    { type: Renderer2 },
    { type: ElementRef }
];
NgbAlert.propDecorators = {
    dismissible: [{ type: Input }],
    type: [{ type: Input }],
    close: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbAlertModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbAlertModule }; }
}
NgbAlertModule.decorators = [
    { type: NgModule, args: [{ declarations: [NgbAlert], exports: [NgbAlert], imports: [CommonModule], entryComponents: [NgbAlert] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbButtonLabel {
}
NgbButtonLabel.decorators = [
    { type: Directive, args: [{
                selector: '[ngbButtonLabel]',
                host: { '[class.btn]': 'true', '[class.active]': 'active', '[class.disabled]': 'disabled', '[class.focus]': 'focused' }
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbCheckBox),
    multi: true
};
/**
 * Easily create Bootstrap-style checkbox buttons. A value of a checked button is bound to a variable
 * specified via ngModel.
 */
class NgbCheckBox {
    /**
     * @param {?} _label
     * @param {?} _cd
     */
    constructor(_label, _cd) {
        this._label = _label;
        this._cd = _cd;
        /**
         * A flag indicating if a given checkbox button is disabled.
         */
        this.disabled = false;
        /**
         * Value to be propagated as model when the checkbox is checked.
         */
        this.valueChecked = true;
        /**
         * Value to be propagated as model when the checkbox is unchecked.
         */
        this.valueUnChecked = false;
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    /**
     * @param {?} isFocused
     * @return {?}
     */
    set focused(isFocused) {
        this._label.focused = isFocused;
        if (!isFocused) {
            this.onTouched();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onInputChange($event) {
        /** @type {?} */
        const modelToPropagate = $event.target.checked ? this.valueChecked : this.valueUnChecked;
        this.onChange(modelToPropagate);
        this.onTouched();
        this.writeValue(modelToPropagate);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._label.disabled = isDisabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.checked = value === this.valueChecked;
        this._label.active = this.checked;
        // label won't be updated, if it is inside the OnPush component when [ngModel] changes
        this._cd.markForCheck();
    }
}
NgbCheckBox.decorators = [
    { type: Directive, args: [{
                selector: '[ngbButton][type=checkbox]',
                host: {
                    'autocomplete': 'off',
                    '[checked]': 'checked',
                    '[disabled]': 'disabled',
                    '(change)': 'onInputChange($event)',
                    '(focus)': 'focused = true',
                    '(blur)': 'focused = false'
                },
                providers: [NGB_CHECKBOX_VALUE_ACCESSOR]
            },] }
];
/** @nocollapse */
NgbCheckBox.ctorParameters = () => [
    { type: NgbButtonLabel },
    { type: ChangeDetectorRef }
];
NgbCheckBox.propDecorators = {
    disabled: [{ type: Input }],
    valueChecked: [{ type: Input }],
    valueUnChecked: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbRadioGroup),
    multi: true
};
/** @type {?} */
let nextId$1 = 0;
/**
 * Easily create Bootstrap-style radio buttons. A value of a selected button is bound to a variable
 * specified via ngModel.
 */
class NgbRadioGroup {
    constructor() {
        this._radios = new Set();
        this._value = null;
        /**
         * The name of the group. Unless enclosed inputs specify a name, this name is used as the name of the
         * enclosed inputs. If not specified, a name is generated automatically.
         */
        this.name = `ngb-radio-${nextId$1++}`;
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    set disabled(isDisabled) { this.setDisabledState(isDisabled); }
    /**
     * @param {?} radio
     * @return {?}
     */
    onRadioChange(radio) {
        this.writeValue(radio.value);
        this.onChange(radio.value);
    }
    /**
     * @return {?}
     */
    onRadioValueUpdate() { this._updateRadiosValue(); }
    /**
     * @param {?} radio
     * @return {?}
     */
    register(radio) { this._radios.add(radio); }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this._disabled = isDisabled;
        this._updateRadiosDisabled();
    }
    /**
     * @param {?} radio
     * @return {?}
     */
    unregister(radio) { this._radios.delete(radio); }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._value = value;
        this._updateRadiosValue();
    }
    /**
     * @return {?}
     */
    _updateRadiosValue() { this._radios.forEach((radio) => radio.updateValue(this._value)); }
    /**
     * @return {?}
     */
    _updateRadiosDisabled() { this._radios.forEach((radio) => radio.updateDisabled()); }
}
NgbRadioGroup.decorators = [
    { type: Directive, args: [{ selector: '[ngbRadioGroup]', host: { 'role': 'radiogroup' }, providers: [NGB_RADIO_VALUE_ACCESSOR] },] }
];
NgbRadioGroup.propDecorators = {
    name: [{ type: Input }]
};
/**
 * Marks an input of type "radio" as part of the NgbRadioGroup.
 */
class NgbRadio {
    /**
     * @param {?} _group
     * @param {?} _label
     * @param {?} _renderer
     * @param {?} _element
     * @param {?} _cd
     */
    constructor(_group, _label, _renderer, _element, _cd) {
        this._group = _group;
        this._label = _label;
        this._renderer = _renderer;
        this._element = _element;
        this._cd = _cd;
        this._value = null;
        this._group.register(this);
        this.updateDisabled();
    }
    /**
     * You can specify model value of a given radio by binding to the value property.
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
        /** @type {?} */
        const stringValue = value ? value.toString() : '';
        this._renderer.setProperty(this._element.nativeElement, 'value', stringValue);
        this._group.onRadioValueUpdate();
    }
    /**
     * A flag indicating if a given radio button is disabled.
     * @param {?} isDisabled
     * @return {?}
     */
    set disabled(isDisabled) {
        this._disabled = isDisabled !== false;
        this.updateDisabled();
    }
    /**
     * @param {?} isFocused
     * @return {?}
     */
    set focused(isFocused) {
        if (this._label) {
            this._label.focused = isFocused;
        }
        if (!isFocused) {
            this._group.onTouched();
        }
    }
    /**
     * @return {?}
     */
    get checked() { return this._checked; }
    /**
     * @return {?}
     */
    get disabled() { return this._group.disabled || this._disabled; }
    /**
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @return {?}
     */
    get nameAttr() { return this.name || this._group.name; }
    /**
     * @return {?}
     */
    ngOnDestroy() { this._group.unregister(this); }
    /**
     * @return {?}
     */
    onChange() { this._group.onRadioChange(this); }
    /**
     * @param {?} value
     * @return {?}
     */
    updateValue(value) {
        // label won't be updated, if it is inside the OnPush component when [ngModel] changes
        if (this.value !== value) {
            this._cd.markForCheck();
        }
        this._checked = this.value === value;
        this._label.active = this._checked;
    }
    /**
     * @return {?}
     */
    updateDisabled() { this._label.disabled = this.disabled; }
}
NgbRadio.decorators = [
    { type: Directive, args: [{
                selector: '[ngbButton][type=radio]',
                host: {
                    '[checked]': 'checked',
                    '[disabled]': 'disabled',
                    '[name]': 'nameAttr',
                    '(change)': 'onChange()',
                    '(focus)': 'focused = true',
                    '(blur)': 'focused = false'
                }
            },] }
];
/** @nocollapse */
NgbRadio.ctorParameters = () => [
    { type: NgbRadioGroup },
    { type: NgbButtonLabel },
    { type: Renderer2 },
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
NgbRadio.propDecorators = {
    name: [{ type: Input }],
    value: [{ type: Input, args: ['value',] }],
    disabled: [{ type: Input, args: ['disabled',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_BUTTON_DIRECTIVES = [NgbButtonLabel, NgbCheckBox, NgbRadioGroup, NgbRadio];
class NgbButtonsModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbButtonsModule }; }
}
NgbButtonsModule.decorators = [
    { type: NgModule, args: [{ declarations: NGB_BUTTON_DIRECTIVES, exports: NGB_BUTTON_DIRECTIVES },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbCarousel component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the carousels used in the application.
 */
class NgbCarouselConfig {
    constructor() {
        this.interval = 5000;
        this.wrap = true;
        this.keyboard = true;
        this.pauseOnHover = true;
        this.showNavigationArrows = true;
        this.showNavigationIndicators = true;
    }
}
NgbCarouselConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbCarouselConfig.ngInjectableDef = defineInjectable({ factory: function NgbCarouselConfig_Factory() { return new NgbCarouselConfig(); }, token: NgbCarouselConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
let nextId$2 = 0;
/**
 * Represents an individual slide to be used within a carousel.
 */
class NgbSlide {
    /**
     * @param {?} tplRef
     */
    constructor(tplRef) {
        this.tplRef = tplRef;
        /**
         * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
         * Will be auto-generated if not provided.
         */
        this.id = `ngb-slide-${nextId$2++}`;
    }
}
NgbSlide.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbSlide]' },] }
];
/** @nocollapse */
NgbSlide.ctorParameters = () => [
    { type: TemplateRef }
];
NgbSlide.propDecorators = {
    id: [{ type: Input }]
};
/**
 * Directive to easily create carousels based on Bootstrap's markup.
 */
class NgbCarousel {
    /**
     * @param {?} config
     * @param {?} _platformId
     * @param {?} _ngZone
     * @param {?} _cd
     */
    constructor(config, _platformId, _ngZone, _cd) {
        this._platformId = _platformId;
        this._ngZone = _ngZone;
        this._cd = _cd;
        this._destroy$ = new Subject();
        this._start$ = new Subject();
        this._stop$ = new Subject();
        /**
         * A carousel slide event fired when the slide transition is completed.
         * See NgbSlideEvent for payload details
         */
        this.slide = new EventEmitter();
        this.interval = config.interval;
        this.wrap = config.wrap;
        this.keyboard = config.keyboard;
        this.pauseOnHover = config.pauseOnHover;
        this.showNavigationArrows = config.showNavigationArrows;
        this.showNavigationIndicators = config.showNavigationIndicators;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // setInterval() doesn't play well with SSR and protractor,
        // so we should run it in the browser and outside Angular
        if (isPlatformBrowser(this._platformId)) {
            this._ngZone.runOutsideAngular(() => {
                this._start$
                    .pipe(map(() => this.interval), filter(interval => interval > 0 && this.slides.length > 0), switchMap(interval => timer(interval).pipe(takeUntil(merge(this._stop$, this._destroy$)))))
                    .subscribe(() => this._ngZone.run(() => this.next()));
                this._start$.next();
            });
        }
        this.slides.changes.pipe(takeUntil(this._destroy$)).subscribe(() => this._cd.markForCheck());
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        /** @type {?} */
        let activeSlide = this._getSlideById(this.activeId);
        this.activeId = activeSlide ? activeSlide.id : (this.slides.length ? this.slides.first.id : null);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() { this._destroy$.next(); }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('interval' in changes && !changes['interval'].isFirstChange()) {
            this._start$.next();
        }
    }
    /**
     * Navigate to a slide with the specified identifier.
     * @param {?} slideId
     * @return {?}
     */
    select(slideId) { this._cycleToSelected(slideId, this._getSlideEventDirection(this.activeId, slideId)); }
    /**
     * Navigate to the next slide.
     * @return {?}
     */
    prev() { this._cycleToSelected(this._getPrevSlide(this.activeId), NgbSlideEventDirection.RIGHT); }
    /**
     * Navigate to the next slide.
     * @return {?}
     */
    next() { this._cycleToSelected(this._getNextSlide(this.activeId), NgbSlideEventDirection.LEFT); }
    /**
     * Stops the carousel from cycling through items.
     * @return {?}
     */
    pause() { this._stop$.next(); }
    /**
     * Restarts cycling through the carousel slides from left to right.
     * @return {?}
     */
    cycle() { this._start$.next(); }
    /**
     * @param {?} slideIdx
     * @param {?} direction
     * @return {?}
     */
    _cycleToSelected(slideIdx, direction) {
        /** @type {?} */
        let selectedSlide = this._getSlideById(slideIdx);
        if (selectedSlide && selectedSlide.id !== this.activeId) {
            this.slide.emit({ prev: this.activeId, current: selectedSlide.id, direction: direction });
            this._start$.next();
            this.activeId = selectedSlide.id;
        }
        // we get here after the interval fires or any external API call like next(), prev() or select()
        this._cd.markForCheck();
    }
    /**
     * @param {?} currentActiveSlideId
     * @param {?} nextActiveSlideId
     * @return {?}
     */
    _getSlideEventDirection(currentActiveSlideId, nextActiveSlideId) {
        /** @type {?} */
        const currentActiveSlideIdx = this._getSlideIdxById(currentActiveSlideId);
        /** @type {?} */
        const nextActiveSlideIdx = this._getSlideIdxById(nextActiveSlideId);
        return currentActiveSlideIdx > nextActiveSlideIdx ? NgbSlideEventDirection.RIGHT : NgbSlideEventDirection.LEFT;
    }
    /**
     * @param {?} slideId
     * @return {?}
     */
    _getSlideById(slideId) { return this.slides.find(slide => slide.id === slideId); }
    /**
     * @param {?} slideId
     * @return {?}
     */
    _getSlideIdxById(slideId) {
        return this.slides.toArray().indexOf(this._getSlideById(slideId));
    }
    /**
     * @param {?} currentSlideId
     * @return {?}
     */
    _getNextSlide(currentSlideId) {
        /** @type {?} */
        const slideArr = this.slides.toArray();
        /** @type {?} */
        const currentSlideIdx = this._getSlideIdxById(currentSlideId);
        /** @type {?} */
        const isLastSlide = currentSlideIdx === slideArr.length - 1;
        return isLastSlide ? (this.wrap ? slideArr[0].id : slideArr[slideArr.length - 1].id) :
            slideArr[currentSlideIdx + 1].id;
    }
    /**
     * @param {?} currentSlideId
     * @return {?}
     */
    _getPrevSlide(currentSlideId) {
        /** @type {?} */
        const slideArr = this.slides.toArray();
        /** @type {?} */
        const currentSlideIdx = this._getSlideIdxById(currentSlideId);
        /** @type {?} */
        const isFirstSlide = currentSlideIdx === 0;
        return isFirstSlide ? (this.wrap ? slideArr[slideArr.length - 1].id : slideArr[0].id) :
            slideArr[currentSlideIdx - 1].id;
    }
}
NgbCarousel.decorators = [
    { type: Component, args: [{
                selector: 'ngb-carousel',
                exportAs: 'ngbCarousel',
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'class': 'carousel slide',
                    '[style.display]': '"block"',
                    'tabIndex': '0',
                    '(mouseenter)': 'pauseOnHover && pause()',
                    '(mouseleave)': 'pauseOnHover && cycle()',
                    '(keydown.arrowLeft)': 'keyboard && prev()',
                    '(keydown.arrowRight)': 'keyboard && next()'
                },
                template: `
    <ol class="carousel-indicators" *ngIf="showNavigationIndicators">
      <li *ngFor="let slide of slides" [id]="slide.id" [class.active]="slide.id === activeId"
          (click)="select(slide.id); pauseOnHover && pause()"></li>
    </ol>
    <div class="carousel-inner">
      <div *ngFor="let slide of slides" class="carousel-item" [class.active]="slide.id === activeId">
        <ng-template [ngTemplateOutlet]="slide.tplRef"></ng-template>
      </div>
    </div>
    <a class="carousel-control-prev" role="button" (click)="prev()" *ngIf="showNavigationArrows">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only" i18n="@@ngb.carousel.previous">Previous</span>
    </a>
    <a class="carousel-control-next" role="button" (click)="next()" *ngIf="showNavigationArrows">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only" i18n="@@ngb.carousel.next">Next</span>
    </a>
  `
            }] }
];
/** @nocollapse */
NgbCarousel.ctorParameters = () => [
    { type: NgbCarouselConfig },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
NgbCarousel.propDecorators = {
    slides: [{ type: ContentChildren, args: [NgbSlide,] }],
    activeId: [{ type: Input }],
    interval: [{ type: Input }],
    wrap: [{ type: Input }],
    keyboard: [{ type: Input }],
    pauseOnHover: [{ type: Input }],
    showNavigationArrows: [{ type: Input }],
    showNavigationIndicators: [{ type: Input }],
    slide: [{ type: Output }]
};
/** @enum {string} */
const NgbSlideEventDirection = {
    LEFT: (/** @type {?} */ ('left')),
    RIGHT: (/** @type {?} */ ('right')),
};
/** @type {?} */
const NGB_CAROUSEL_DIRECTIVES = [NgbCarousel, NgbSlide];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbCarouselModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbCarouselModule }; }
}
NgbCarouselModule.decorators = [
    { type: NgModule, args: [{ declarations: NGB_CAROUSEL_DIRECTIVES, exports: NGB_CAROUSEL_DIRECTIVES, imports: [CommonModule] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * The NgbCollapse directive provides a simple way to hide and show an element with animations.
 */
class NgbCollapse {
    constructor() {
        /**
         * A flag indicating collapsed (true) or open (false) state.
         */
        this.collapsed = false;
    }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbCollapseModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbCollapseModule }; }
}
NgbCollapseModule.decorators = [
    { type: NgModule, args: [{ declarations: [NgbCollapse], exports: [NgbCollapse] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Simple class used for a date representation that datepicker also uses internally
 *
 * \@since 3.0.0
 */
class NgbDate {
    /**
     * Static method. Creates a new date object from the NgbDateStruct, ex. NgbDate.from({year: 2000,
     * month: 5, day: 1}). If the 'date' is already of NgbDate, the method will return the same object
     * @param {?} date
     * @return {?}
     */
    static from(date) {
        if (date instanceof NgbDate) {
            return date;
        }
        return date ? new NgbDate(date.year, date.month, date.day) : null;
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} day
     */
    constructor(year, month, day) {
        this.year = isInteger(year) ? year : null;
        this.month = isInteger(month) ? month : null;
        this.day = isInteger(day) ? day : null;
    }
    /**
     * Checks if current date is equal to another date
     * @param {?} other
     * @return {?}
     */
    equals(other) {
        return other && this.year === other.year && this.month === other.month && this.day === other.day;
    }
    /**
     * Checks if current date is before another date
     * @param {?} other
     * @return {?}
     */
    before(other) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day < other.day;
            }
            else {
                return this.month < other.month;
            }
        }
        else {
            return this.year < other.year;
        }
    }
    /**
     * Checks if current date is after another date
     * @param {?} other
     * @return {?}
     */
    after(other) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day > other.day;
            }
            else {
                return this.month > other.month;
            }
        }
        else {
            return this.year > other.year;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} jsDate
 * @return {?}
 */
function fromJSDate(jsDate) {
    return new NgbDate(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate());
}
/**
 * @param {?} date
 * @return {?}
 */
function toJSDate(date) {
    /** @type {?} */
    const jsDate = new Date(date.year, date.month - 1, date.day, 12);
    // this is done avoid 30 -> 1930 conversion
    if (!isNaN(jsDate.getTime())) {
        jsDate.setFullYear(date.year);
    }
    return jsDate;
}
/**
 * @return {?}
 */
function NGB_DATEPICKER_CALENDAR_FACTORY() {
    return new NgbCalendarGregorian();
}
/**
 * Calendar used by the datepicker.
 * Default implementation uses Gregorian calendar.
 * @abstract
 */
class NgbCalendar {
}
NgbCalendar.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_CALENDAR_FACTORY },] }
];
/** @nocollapse */ NgbCalendar.ngInjectableDef = defineInjectable({ factory: NGB_DATEPICKER_CALENDAR_FACTORY, token: NgbCalendar, providedIn: "root" });
class NgbCalendarGregorian extends NgbCalendar {
    /**
     * @return {?}
     */
    getDaysPerWeek() { return 7; }
    /**
     * @return {?}
     */
    getMonths() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }
    /**
     * @return {?}
     */
    getWeeksPerMonth() { return 6; }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getNext(date, period = 'd', number = 1) {
        /** @type {?} */
        let jsDate = toJSDate(date);
        switch (period) {
            case 'y':
                return new NgbDate(date.year + number, 1, 1);
            case 'm':
                jsDate = new Date(date.year, date.month + number - 1, 1, 12);
                break;
            case 'd':
                jsDate.setDate(jsDate.getDate() + number);
                break;
            default:
                return date;
        }
        return fromJSDate(jsDate);
    }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getPrev(date, period = 'd', number = 1) { return this.getNext(date, period, -number); }
    /**
     * @param {?} date
     * @return {?}
     */
    getWeekday(date) {
        /** @type {?} */
        let jsDate = toJSDate(date);
        /** @type {?} */
        let day = jsDate.getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        /** @type {?} */
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        /** @type {?} */
        let date = week[thursdayIndex];
        /** @type {?} */
        const jsDate = toJSDate(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        // Thursday
        /** @type {?} */
        const time = jsDate.getTime();
        jsDate.setMonth(0); // Compare with Jan 1
        jsDate.setDate(1);
        return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
    }
    /**
     * @return {?}
     */
    getToday() { return fromJSDate(new Date()); }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        if (!date || !isInteger(date.year) || !isInteger(date.month) || !isInteger(date.day)) {
            return false;
        }
        // year 0 doesn't exist in Gregorian calendar
        if (date.year === 0) {
            return false;
        }
        /** @type {?} */
        const jsDate = toJSDate(date);
        return !isNaN(jsDate.getTime()) && jsDate.getFullYear() === date.year && jsDate.getMonth() + 1 === date.month &&
            jsDate.getDate() === date.day;
    }
}
NgbCalendarGregorian.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} prev
 * @param {?} next
 * @return {?}
 */
function isChangedDate(prev, next) {
    return !dateComparator(prev, next);
}
/**
 * @param {?} prev
 * @param {?} next
 * @return {?}
 */
function dateComparator(prev, next) {
    return (!prev && !next) || (!!prev && !!next && prev.equals(next));
}
/**
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
function checkMinBeforeMax(minDate, maxDate) {
    if (maxDate && minDate && maxDate.before(minDate)) {
        throw new Error(`'maxDate' ${maxDate} should be greater than 'minDate' ${minDate}`);
    }
}
/**
 * @param {?} date
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
function checkDateInRange(date, minDate, maxDate) {
    if (date && minDate && date.before(minDate)) {
        return minDate;
    }
    if (date && maxDate && date.after(maxDate)) {
        return maxDate;
    }
    return date;
}
/**
 * @param {?} date
 * @param {?} state
 * @return {?}
 */
function isDateSelectable(date, state) {
    const { minDate, maxDate, disabled, markDisabled } = state;
    // clang-format off
    return !(!isDefined(date) ||
        disabled ||
        (markDisabled && markDisabled(date, { year: date.year, month: date.month })) ||
        (minDate && date.before(minDate)) ||
        (maxDate && date.after(maxDate)));
    // clang-format on
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
function generateSelectBoxMonths(calendar, date, minDate, maxDate) {
    if (!date) {
        return [];
    }
    /** @type {?} */
    let months = calendar.getMonths(date.year);
    if (minDate && date.year === minDate.year) {
        /** @type {?} */
        const index = months.findIndex(month => month === minDate.month);
        months = months.slice(index);
    }
    if (maxDate && date.year === maxDate.year) {
        /** @type {?} */
        const index = months.findIndex(month => month === maxDate.month);
        months = months.slice(0, index + 1);
    }
    return months;
}
/**
 * @param {?} date
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
function generateSelectBoxYears(date, minDate, maxDate) {
    if (!date) {
        return [];
    }
    /** @type {?} */
    const start = minDate && minDate.year || date.year - 10;
    /** @type {?} */
    const end = maxDate && maxDate.year || date.year + 10;
    return Array.from({ length: end - start + 1 }, (e, i) => start + i);
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} maxDate
 * @return {?}
 */
function nextMonthDisabled(calendar, date, maxDate) {
    return maxDate && calendar.getNext(date, 'm').after(maxDate);
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} minDate
 * @return {?}
 */
function prevMonthDisabled(calendar, date, minDate) {
    /** @type {?} */
    const prevDate = calendar.getPrev(date, 'm');
    return minDate && (prevDate.year === minDate.year && prevDate.month < minDate.month ||
        prevDate.year < minDate.year && minDate.month === 1);
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} state
 * @param {?} i18n
 * @param {?} force
 * @return {?}
 */
function buildMonths(calendar, date, state, i18n, force) {
    const { displayMonths, months } = state;
    // move old months to a temporary array
    /** @type {?} */
    const monthsToReuse = months.splice(0, months.length);
    // generate new first dates, nullify or reuse months
    /** @type {?} */
    const firstDates = Array.from({ length: displayMonths }, (_, i) => {
        /** @type {?} */
        const firstDate = calendar.getNext(date, 'm', i);
        months[i] = null;
        if (!force) {
            /** @type {?} */
            const reusedIndex = monthsToReuse.findIndex(month => month.firstDate.equals(firstDate));
            // move reused month back to months
            if (reusedIndex !== -1) {
                months[i] = monthsToReuse.splice(reusedIndex, 1)[0];
            }
        }
        return firstDate;
    });
    // rebuild nullified months
    firstDates.forEach((firstDate, i) => {
        if (months[i] === null) {
            months[i] = buildMonth(calendar, firstDate, state, i18n, monthsToReuse.shift() || (/** @type {?} */ ({})));
        }
    });
    return months;
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} state
 * @param {?} i18n
 * @param {?=} month
 * @return {?}
 */
function buildMonth(calendar, date, state, i18n, month = (/** @type {?} */ ({}))) {
    const { dayTemplateData, minDate, maxDate, firstDayOfWeek, markDisabled, outsideDays } = state;
    /** @type {?} */
    const calendarToday = calendar.getToday();
    month.firstDate = null;
    month.lastDate = null;
    month.number = date.month;
    month.year = date.year;
    month.weeks = month.weeks || [];
    month.weekdays = month.weekdays || [];
    date = getFirstViewDate(calendar, date, firstDayOfWeek);
    // month has weeks
    for (let week = 0; week < calendar.getWeeksPerMonth(); week++) {
        /** @type {?} */
        let weekObject = month.weeks[week];
        if (!weekObject) {
            weekObject = month.weeks[week] = { number: 0, days: [], collapsed: true };
        }
        /** @type {?} */
        const days = weekObject.days;
        // week has days
        for (let day = 0; day < calendar.getDaysPerWeek(); day++) {
            if (week === 0) {
                month.weekdays[day] = calendar.getWeekday(date);
            }
            /** @type {?} */
            const newDate = new NgbDate(date.year, date.month, date.day);
            /** @type {?} */
            const nextDate = calendar.getNext(newDate);
            /** @type {?} */
            const ariaLabel = i18n.getDayAriaLabel(newDate);
            // marking date as disabled
            /** @type {?} */
            let disabled = !!((minDate && newDate.before(minDate)) || (maxDate && newDate.after(maxDate)));
            if (!disabled && markDisabled) {
                disabled = markDisabled(newDate, { month: month.number, year: month.year });
            }
            // today
            /** @type {?} */
            let today = newDate.equals(calendarToday);
            // adding user-provided data to the context
            /** @type {?} */
            let contextUserData = dayTemplateData ? dayTemplateData(newDate, { month: month.number, year: month.year }) : undefined;
            // saving first date of the month
            if (month.firstDate === null && newDate.month === month.number) {
                month.firstDate = newDate;
            }
            // saving last date of the month
            if (newDate.month === month.number && nextDate.month !== month.number) {
                month.lastDate = newDate;
            }
            /** @type {?} */
            let dayObject = days[day];
            if (!dayObject) {
                dayObject = days[day] = (/** @type {?} */ ({}));
            }
            dayObject.date = newDate;
            dayObject.context = Object.assign(dayObject.context || {}, {
                $implicit: newDate,
                date: newDate,
                data: contextUserData,
                currentMonth: month.number, disabled,
                focused: false,
                selected: false, today
            });
            dayObject.tabindex = -1;
            dayObject.ariaLabel = ariaLabel;
            dayObject.hidden = false;
            date = nextDate;
        }
        weekObject.number = calendar.getWeekNumber(days.map(day => day.date), firstDayOfWeek);
        // marking week as collapsed
        weekObject.collapsed = outsideDays === 'collapsed' && days[0].date.month !== month.number &&
            days[days.length - 1].date.month !== month.number;
    }
    return month;
}
/**
 * @param {?} calendar
 * @param {?} date
 * @param {?} firstDayOfWeek
 * @return {?}
 */
function getFirstViewDate(calendar, date, firstDayOfWeek) {
    /** @type {?} */
    const daysPerWeek = calendar.getDaysPerWeek();
    /** @type {?} */
    const firstMonthDate = new NgbDate(date.year, date.month, 1);
    /** @type {?} */
    const dayOfWeek = calendar.getWeekday(firstMonthDate) % daysPerWeek;
    return calendar.getPrev(firstMonthDate, 'd', (daysPerWeek + dayOfWeek - firstDayOfWeek) % daysPerWeek);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} locale
 * @return {?}
 */
function NGB_DATEPICKER_18N_FACTORY(locale) {
    return new NgbDatepickerI18nDefault(locale);
}
/**
 * Type of the service supplying month and weekday names to to NgbDatepicker component.
 * The default implementation of this service honors the Angular locale, and uses the registered locale data,
 * as explained in the Angular i18n guide.
 * See the i18n demo for how to extend this class and define a custom provider for i18n.
 * @abstract
 */
class NgbDatepickerI18n {
    /**
     * Returns the textual representation of a day that is rendered in a day cell
     *
     * \@since 3.0.0
     * @param {?} date
     * @return {?}
     */
    getDayNumerals(date) { return `${date.day}`; }
    /**
     * Returns the textual representation of a week number rendered by date picker
     *
     * \@since 3.0.0
     * @param {?} weekNumber
     * @return {?}
     */
    getWeekNumerals(weekNumber) { return `${weekNumber}`; }
    /**
     * Returns the textual representation of a year that is rendered
     * in date picker year select box
     *
     * \@since 3.0.0
     * @param {?} year
     * @return {?}
     */
    getYearNumerals(year) { return `${year}`; }
}
NgbDatepickerI18n.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_18N_FACTORY, deps: [LOCALE_ID] },] }
];
/** @nocollapse */ NgbDatepickerI18n.ngInjectableDef = defineInjectable({ factory: function NgbDatepickerI18n_Factory() { return NGB_DATEPICKER_18N_FACTORY(inject(LOCALE_ID)); }, token: NgbDatepickerI18n, providedIn: "root" });
class NgbDatepickerI18nDefault extends NgbDatepickerI18n {
    /**
     * @param {?} _locale
     */
    constructor(_locale) {
        super();
        this._locale = _locale;
        /** @type {?} */
        const weekdaysStartingOnSunday = getLocaleDayNames(_locale, FormStyle.Standalone, TranslationWidth.Short);
        this._weekdaysShort = weekdaysStartingOnSunday.map((day, index) => weekdaysStartingOnSunday[(index + 1) % 7]);
        this._monthsShort = getLocaleMonthNames(_locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
        this._monthsFull = getLocaleMonthNames(_locale, FormStyle.Standalone, TranslationWidth.Wide);
    }
    /**
     * @param {?} weekday
     * @return {?}
     */
    getWeekdayShortName(weekday) { return this._weekdaysShort[weekday - 1]; }
    /**
     * @param {?} month
     * @return {?}
     */
    getMonthShortName(month) { return this._monthsShort[month - 1]; }
    /**
     * @param {?} month
     * @return {?}
     */
    getMonthFullName(month) { return this._monthsFull[month - 1]; }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayAriaLabel(date) {
        /** @type {?} */
        const jsDate = new Date(date.year, date.month - 1, date.day);
        return formatDate(jsDate, 'fullDate', this._locale);
    }
}
NgbDatepickerI18nDefault.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgbDatepickerI18nDefault.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbDatepickerService {
    /**
     * @param {?} _calendar
     * @param {?} _i18n
     */
    constructor(_calendar, _i18n) {
        this._calendar = _calendar;
        this._i18n = _i18n;
        this._model$ = new Subject();
        this._select$ = new Subject();
        this._state = {
            disabled: false,
            displayMonths: 1,
            firstDayOfWeek: 1,
            focusVisible: false,
            months: [],
            navigation: 'select',
            outsideDays: 'visible',
            prevDisabled: false,
            nextDisabled: false,
            selectBoxes: { years: [], months: [] },
            selectedDate: null
        };
    }
    /**
     * @return {?}
     */
    get model$() { return this._model$.pipe(filter(model => model.months.length > 0)); }
    /**
     * @return {?}
     */
    get select$() { return this._select$.pipe(filter(date => date !== null)); }
    /**
     * @param {?} dayTemplateData
     * @return {?}
     */
    set dayTemplateData(dayTemplateData) {
        if (this._state.dayTemplateData !== dayTemplateData) {
            this._nextState({ dayTemplateData });
        }
    }
    /**
     * @param {?} disabled
     * @return {?}
     */
    set disabled(disabled) {
        if (this._state.disabled !== disabled) {
            this._nextState({ disabled });
        }
    }
    /**
     * @param {?} displayMonths
     * @return {?}
     */
    set displayMonths(displayMonths) {
        displayMonths = toInteger(displayMonths);
        if (isInteger(displayMonths) && displayMonths > 0 && this._state.displayMonths !== displayMonths) {
            this._nextState({ displayMonths });
        }
    }
    /**
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    set firstDayOfWeek(firstDayOfWeek) {
        firstDayOfWeek = toInteger(firstDayOfWeek);
        if (isInteger(firstDayOfWeek) && firstDayOfWeek >= 0 && this._state.firstDayOfWeek !== firstDayOfWeek) {
            this._nextState({ firstDayOfWeek });
        }
    }
    /**
     * @param {?} focusVisible
     * @return {?}
     */
    set focusVisible(focusVisible) {
        if (this._state.focusVisible !== focusVisible && !this._state.disabled) {
            this._nextState({ focusVisible });
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set maxDate(date) {
        /** @type {?} */
        const maxDate = this.toValidDate(date, null);
        if (isChangedDate(this._state.maxDate, maxDate)) {
            this._nextState({ maxDate });
        }
    }
    /**
     * @param {?} markDisabled
     * @return {?}
     */
    set markDisabled(markDisabled) {
        if (this._state.markDisabled !== markDisabled) {
            this._nextState({ markDisabled });
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set minDate(date) {
        /** @type {?} */
        const minDate = this.toValidDate(date, null);
        if (isChangedDate(this._state.minDate, minDate)) {
            this._nextState({ minDate });
        }
    }
    /**
     * @param {?} navigation
     * @return {?}
     */
    set navigation(navigation) {
        if (this._state.navigation !== navigation) {
            this._nextState({ navigation });
        }
    }
    /**
     * @param {?} outsideDays
     * @return {?}
     */
    set outsideDays(outsideDays) {
        if (this._state.outsideDays !== outsideDays) {
            this._nextState({ outsideDays });
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    focus(date) {
        if (!this._state.disabled && this._calendar.isValid(date) && isChangedDate(this._state.focusDate, date)) {
            this._nextState({ focusDate: date });
        }
    }
    /**
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    focusMove(period, number) {
        this.focus(this._calendar.getNext(this._state.focusDate, period, number));
    }
    /**
     * @return {?}
     */
    focusSelect() {
        if (isDateSelectable(this._state.focusDate, this._state)) {
            this.select(this._state.focusDate, { emitEvent: true });
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    open(date) {
        /** @type {?} */
        const firstDate = this.toValidDate(date, this._calendar.getToday());
        if (!this._state.disabled) {
            this._nextState({ firstDate });
        }
    }
    /**
     * @param {?} state
     * @return {?}
     */
    reset(state) { this._state = state; }
    /**
     * @param {?} date
     * @param {?=} options
     * @return {?}
     */
    select(date, options = {}) {
        /** @type {?} */
        const selectedDate = this.toValidDate(date, null);
        if (!this._state.disabled) {
            if (isChangedDate(this._state.selectedDate, selectedDate)) {
                this._nextState({ selectedDate });
            }
            if (options.emitEvent && isDateSelectable(selectedDate, this._state)) {
                this._select$.next(selectedDate);
            }
        }
    }
    /**
     * @param {?} date
     * @param {?=} defaultValue
     * @return {?}
     */
    toValidDate(date, defaultValue) {
        /** @type {?} */
        const ngbDate = NgbDate.from(date);
        if (defaultValue === undefined) {
            defaultValue = this._calendar.getToday();
        }
        return this._calendar.isValid(ngbDate) ? ngbDate : defaultValue;
    }
    /**
     * @param {?} patch
     * @return {?}
     */
    _nextState(patch) {
        /** @type {?} */
        const newState = this._updateState(patch);
        this._patchContexts(newState);
        this._state = newState;
        this._model$.next(this._state);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    _patchContexts(state) {
        const { months, displayMonths, selectedDate, focusDate, focusVisible, disabled, outsideDays } = state;
        state.months.forEach(month => {
            month.weeks.forEach(week => {
                week.days.forEach(day => {
                    // patch focus flag
                    if (focusDate) {
                        day.context.focused = focusDate.equals(day.date) && focusVisible;
                    }
                    // calculating tabindex
                    day.tabindex = !disabled && day.date.equals(focusDate) && focusDate.month === month.number ? 0 : -1;
                    // override context disabled
                    if (disabled === true) {
                        day.context.disabled = true;
                    }
                    // patch selection flag
                    if (selectedDate !== undefined) {
                        day.context.selected = selectedDate !== null && selectedDate.equals(day.date);
                    }
                    // visibility
                    if (month.number !== day.date.month) {
                        day.hidden = outsideDays === 'hidden' || outsideDays === 'collapsed' ||
                            (displayMonths > 1 && day.date.after(months[0].firstDate) &&
                                day.date.before(months[displayMonths - 1].lastDate));
                    }
                });
            });
        });
    }
    /**
     * @param {?} patch
     * @return {?}
     */
    _updateState(patch) {
        // patching fields
        /** @type {?} */
        const state = Object.assign({}, this._state, patch);
        /** @type {?} */
        let startDate = state.firstDate;
        // min/max dates changed
        if ('minDate' in patch || 'maxDate' in patch) {
            checkMinBeforeMax(state.minDate, state.maxDate);
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
        }
        // disabled
        if ('disabled' in patch) {
            state.focusVisible = false;
        }
        // initial rebuild via 'select()'
        if ('selectedDate' in patch && this._state.months.length === 0) {
            startDate = state.selectedDate;
        }
        // terminate early if only focus visibility was changed
        if ('focusVisible' in patch) {
            return state;
        }
        // focus date changed
        if ('focusDate' in patch) {
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
            // nothing to rebuild if only focus changed and it is still visible
            if (state.months.length !== 0 && !state.focusDate.before(state.firstDate) &&
                !state.focusDate.after(state.lastDate)) {
                return state;
            }
        }
        // first date changed
        if ('firstDate' in patch) {
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.firstDate;
        }
        // rebuilding months
        if (startDate) {
            /** @type {?} */
            const forceRebuild = 'dayTemplateData' in patch || 'firstDayOfWeek' in patch || 'markDisabled' in patch ||
                'minDate' in patch || 'maxDate' in patch || 'disabled' in patch || 'outsideDays' in patch;
            /** @type {?} */
            const months = buildMonths(this._calendar, startDate, state, this._i18n, forceRebuild);
            // updating months and boundary dates
            state.months = months;
            state.firstDate = months.length > 0 ? months[0].firstDate : undefined;
            state.lastDate = months.length > 0 ? months[months.length - 1].lastDate : undefined;
            // reset selected date if 'markDisabled' returns true
            if ('selectedDate' in patch && !isDateSelectable(state.selectedDate, state)) {
                state.selectedDate = null;
            }
            // adjusting focus after months were built
            if ('firstDate' in patch) {
                if (state.focusDate === undefined || state.focusDate.before(state.firstDate) ||
                    state.focusDate.after(state.lastDate)) {
                    state.focusDate = startDate;
                }
            }
            // adjusting months/years for the select box navigation
            /** @type {?} */
            const yearChanged = !this._state.firstDate || this._state.firstDate.year !== state.firstDate.year;
            /** @type {?} */
            const monthChanged = !this._state.firstDate || this._state.firstDate.month !== state.firstDate.month;
            if (state.navigation === 'select') {
                // years ->  boundaries (min/max were changed)
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.years.length === 0 || yearChanged) {
                    state.selectBoxes.years = generateSelectBoxYears(state.firstDate, state.minDate, state.maxDate);
                }
                // months -> when current year or boundaries change
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.months.length === 0 || yearChanged) {
                    state.selectBoxes.months =
                        generateSelectBoxMonths(this._calendar, state.firstDate, state.minDate, state.maxDate);
                }
            }
            else {
                state.selectBoxes = { years: [], months: [] };
            }
            // updating navigation arrows -> boundaries change (min/max) or month/year changes
            if ((state.navigation === 'arrows' || state.navigation === 'select') &&
                (monthChanged || yearChanged || 'minDate' in patch || 'maxDate' in patch || 'disabled' in patch)) {
                state.prevDisabled = state.disabled || prevMonthDisabled(this._calendar, state.firstDate, state.minDate);
                state.nextDisabled = state.disabled || nextMonthDisabled(this._calendar, state.lastDate, state.maxDate);
            }
        }
        return state;
    }
}
NgbDatepickerService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgbDatepickerService.ctorParameters = () => [
    { type: NgbCalendar },
    { type: NgbDatepickerI18n }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
const Key = {
    Tab: 9,
    Enter: 13,
    Escape: 27,
    Space: 32,
    PageUp: 33,
    PageDown: 34,
    End: 35,
    Home: 36,
    ArrowLeft: 37,
    ArrowUp: 38,
    ArrowRight: 39,
    ArrowDown: 40,
};
Key[Key.Tab] = 'Tab';
Key[Key.Enter] = 'Enter';
Key[Key.Escape] = 'Escape';
Key[Key.Space] = 'Space';
Key[Key.PageUp] = 'PageUp';
Key[Key.PageDown] = 'PageDown';
Key[Key.End] = 'End';
Key[Key.Home] = 'Home';
Key[Key.ArrowLeft] = 'ArrowLeft';
Key[Key.ArrowUp] = 'ArrowUp';
Key[Key.ArrowRight] = 'ArrowRight';
Key[Key.ArrowDown] = 'ArrowDown';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbDatepickerKeyMapService {
    /**
     * @param {?} _service
     * @param {?} _calendar
     */
    constructor(_service, _calendar) {
        this._service = _service;
        this._calendar = _calendar;
        _service.model$.subscribe(model => {
            this._minDate = model.minDate;
            this._maxDate = model.maxDate;
            this._firstViewDate = model.firstDate;
            this._lastViewDate = model.lastDate;
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    processKey(event) {
        // tslint:disable-next-line:deprecation
        switch (event.which) {
            case Key.PageUp:
                this._service.focusMove(event.shiftKey ? 'y' : 'm', -1);
                break;
            case Key.PageDown:
                this._service.focusMove(event.shiftKey ? 'y' : 'm', 1);
                break;
            case Key.End:
                this._service.focus(event.shiftKey ? this._maxDate : this._lastViewDate);
                break;
            case Key.Home:
                this._service.focus(event.shiftKey ? this._minDate : this._firstViewDate);
                break;
            case Key.ArrowLeft:
                this._service.focusMove('d', -1);
                break;
            case Key.ArrowUp:
                this._service.focusMove('d', -this._calendar.getDaysPerWeek());
                break;
            case Key.ArrowRight:
                this._service.focusMove('d', 1);
                break;
            case Key.ArrowDown:
                this._service.focusMove('d', this._calendar.getDaysPerWeek());
                break;
            case Key.Enter:
            case Key.Space:
                this._service.focusSelect();
                break;
            default:
                return;
        }
        // note 'return' in default case
        event.preventDefault();
        event.stopPropagation();
    }
}
NgbDatepickerKeyMapService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgbDatepickerKeyMapService.ctorParameters = () => [
    { type: NgbDatepickerService },
    { type: NgbCalendar }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
const NavigationEvent = {
    PREV: 0,
    NEXT: 1,
};
NavigationEvent[NavigationEvent.PREV] = 'PREV';
NavigationEvent[NavigationEvent.NEXT] = 'NEXT';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbDatepicker component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepickers used in the application.
 */
class NgbDatepickerConfig {
    constructor() {
        this.displayMonths = 1;
        this.firstDayOfWeek = 1;
        this.navigation = 'select';
        this.outsideDays = 'visible';
        this.showWeekdays = true;
        this.showWeekNumbers = false;
    }
}
NgbDatepickerConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbDatepickerConfig.ngInjectableDef = defineInjectable({ factory: function NgbDatepickerConfig_Factory() { return new NgbDatepickerConfig(); }, token: NgbDatepickerConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function NGB_DATEPICKER_DATE_ADAPTER_FACTORY() {
    return new NgbDateStructAdapter();
}
/**
 * An abstract class used as the DI token that does conversion between the internal
 * datepicker NgbDateStruct model and any provided user date model, ex. string, native date, etc.
 *
 * Adapter is used for conversion when binding datepicker to a model with forms, ex. [(ngModel)]="userDateModel"
 *
 * Default implementation assumes NgbDateStruct for user model as well.
 * @abstract
 * @template D
 */
class NgbDateAdapter {
}
NgbDateAdapter.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY },] }
];
/** @nocollapse */ NgbDateAdapter.ngInjectableDef = defineInjectable({ factory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY, token: NgbDateAdapter, providedIn: "root" });
class NgbDateStructAdapter extends NgbDateAdapter {
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     * @param {?} date
     * @return {?}
     */
    fromModel(date) {
        return (date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)) ?
            { year: date.year, month: date.month, day: date.day } :
            null;
    }
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     * @param {?} date
     * @return {?}
     */
    toModel(date) {
        return (date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)) ?
            { year: date.year, month: date.month, day: date.day } :
            null;
    }
}
NgbDateStructAdapter.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbDatepicker),
    multi: true
};
/**
 * A lightweight and highly configurable datepicker directive
 */
class NgbDatepicker {
    /**
     * @param {?} _keyMapService
     * @param {?} _service
     * @param {?} _calendar
     * @param {?} i18n
     * @param {?} config
     * @param {?} _cd
     * @param {?} _elementRef
     * @param {?} _ngbDateAdapter
     * @param {?} _ngZone
     */
    constructor(_keyMapService, _service, _calendar, i18n, config, _cd, _elementRef, _ngbDateAdapter, _ngZone) {
        this._keyMapService = _keyMapService;
        this._service = _service;
        this._calendar = _calendar;
        this.i18n = i18n;
        this._cd = _cd;
        this._elementRef = _elementRef;
        this._ngbDateAdapter = _ngbDateAdapter;
        this._ngZone = _ngZone;
        this._destroyed$ = new Subject();
        /**
         * An event fired right before the navigation happens and currently displayed month changes.
         * See NgbDatepickerNavigateEvent for the payload info.
         */
        this.navigate = new EventEmitter();
        /**
         * An event fired when user selects a date using keyboard or mouse.
         * The payload of the event is currently selected NgbDate.
         */
        this.select = new EventEmitter();
        this.onChange = (_) => { };
        this.onTouched = () => { };
        ['dayTemplate', 'dayTemplateData', 'displayMonths', 'firstDayOfWeek', 'footerTemplate', 'markDisabled', 'minDate',
            'maxDate', 'navigation', 'outsideDays', 'showWeekdays', 'showWeekNumbers', 'startDate']
            .forEach(input => this[input] = config[input]);
        _service.select$.pipe(takeUntil(this._destroyed$)).subscribe(date => { this.select.emit(date); });
        _service.model$.pipe(takeUntil(this._destroyed$)).subscribe(model => {
            /** @type {?} */
            const newDate = model.firstDate;
            /** @type {?} */
            const oldDate = this.model ? this.model.firstDate : null;
            /** @type {?} */
            let navigationPrevented = false;
            // emitting navigation event if the first month changes
            if (!newDate.equals(oldDate)) {
                this.navigate.emit({
                    current: oldDate ? { year: oldDate.year, month: oldDate.month } : null,
                    next: { year: newDate.year, month: newDate.month },
                    preventDefault: () => navigationPrevented = true
                });
                // can't prevent the very first navigation
                if (navigationPrevented && oldDate !== null) {
                    this._service.reset(this.model);
                    return;
                }
            }
            /** @type {?} */
            const newSelectedDate = model.selectedDate;
            /** @type {?} */
            const newFocusedDate = model.focusDate;
            /** @type {?} */
            const oldFocusedDate = this.model ? this.model.focusDate : null;
            this.model = model;
            // handling selection change
            if (isChangedDate(newSelectedDate, this._controlValue)) {
                this._controlValue = newSelectedDate;
                this.onTouched();
                this.onChange(this._ngbDateAdapter.toModel(newSelectedDate));
            }
            // handling focus change
            if (isChangedDate(newFocusedDate, oldFocusedDate) && oldFocusedDate && model.focusVisible) {
                this.focus();
            }
            _cd.markForCheck();
        });
    }
    /**
     * Manually focus the focusable day in the datepicker
     * @return {?}
     */
    focus() {
        this._ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
            /** @type {?} */
            const elementToFocus = this._elementRef.nativeElement.querySelector('div.ngb-dp-day[tabindex="0"]');
            if (elementToFocus) {
                elementToFocus.focus();
            }
        });
    }
    /**
     * Navigates current view to provided date.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     * Use 'startDate' input as an alternative
     * @param {?=} date
     * @return {?}
     */
    navigateTo(date) {
        this._service.open(NgbDate.from(date ? date.day ? (/** @type {?} */ (date)) : Object.assign({}, date, { day: 1 }) : null));
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._ngZone.runOutsideAngular(() => {
            /** @type {?} */
            const focusIns$ = fromEvent(this._monthsEl.nativeElement, 'focusin');
            /** @type {?} */
            const focusOuts$ = fromEvent(this._monthsEl.nativeElement, 'focusout');
            // we're changing 'focusVisible' only when entering or leaving months view
            // and ignoring all focus events where both 'target' and 'related' target are day cells
            merge(focusIns$, focusOuts$)
                .pipe(filter(({ target, relatedTarget }) => !(hasClassName(target, 'ngb-dp-day') && hasClassName(relatedTarget, 'ngb-dp-day'))), takeUntil(this._destroyed$))
                .subscribe(({ type }) => this._ngZone.run(() => this._service.focusVisible = type === 'focusin'));
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() { this._destroyed$.next(); }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.model === undefined) {
            ['dayTemplateData', 'displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate',
                'outsideDays']
                .forEach(input => this._service[input] = this[input]);
            this.navigateTo(this.startDate);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        ['dayTemplateData', 'displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate',
            'outsideDays']
            .filter(input => input in changes)
            .forEach(input => this._service[input] = this[input]);
        if ('startDate' in changes) {
            this.navigateTo(this.startDate);
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    onDateSelect(date) {
        this._service.focus(date);
        this._service.select(date, { emitEvent: true });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) { this._keyMapService.processKey(event); }
    /**
     * @param {?} date
     * @return {?}
     */
    onNavigateDateSelect(date) { this._service.open(date); }
    /**
     * @param {?} event
     * @return {?}
     */
    onNavigateEvent(event) {
        switch (event) {
            case NavigationEvent.PREV:
                this._service.open(this._calendar.getPrev(this.model.firstDate, 'm', 1));
                break;
            case NavigationEvent.NEXT:
                this._service.open(this._calendar.getNext(this.model.firstDate, 'm', 1));
                break;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) { this._service.disabled = isDisabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._controlValue = NgbDate.from(this._ngbDateAdapter.fromModel(value));
        this._service.select(this._controlValue);
    }
}
NgbDatepicker.decorators = [
    { type: Component, args: [{
                exportAs: 'ngbDatepicker',
                selector: 'ngb-datepicker',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-template #dt let-date="date" let-currentMonth="currentMonth" let-selected="selected" let-disabled="disabled" let-focused="focused">
      <div ngbDatepickerDayView
        [date]="date"
        [currentMonth]="currentMonth"
        [selected]="selected"
        [disabled]="disabled"
        [focused]="focused">
      </div>
    </ng-template>

    <div class="ngb-dp-header bg-light">
      <ngb-datepicker-navigation *ngIf="navigation !== 'none'"
        [date]="model.firstDate"
        [months]="model.months"
        [disabled]="model.disabled"
        [showSelect]="model.navigation === 'select'"
        [prevDisabled]="model.prevDisabled"
        [nextDisabled]="model.nextDisabled"
        [selectBoxes]="model.selectBoxes"
        (navigate)="onNavigateEvent($event)"
        (select)="onNavigateDateSelect($event)">
      </ngb-datepicker-navigation>
    </div>

    <div #months class="ngb-dp-months" (keydown)="onKeyDown($event)">
      <ng-template ngFor let-month [ngForOf]="model.months" let-i="index">
        <div class="ngb-dp-month">
          <div *ngIf="navigation === 'none' || (displayMonths > 1 && navigation === 'select')"
                class="ngb-dp-month-name bg-light">
            {{ i18n.getMonthFullName(month.number, month.year) }} {{ i18n.getYearNumerals(month.year) }}
          </div>
          <ngb-datepicker-month-view
            [month]="month"
            [dayTemplate]="dayTemplate || dt"
            [showWeekdays]="showWeekdays"
            [showWeekNumbers]="showWeekNumbers"
            (select)="onDateSelect($event)">
          </ngb-datepicker-month-view>
        </div>
      </ng-template>
    </div>

    <ng-template [ngTemplateOutlet]="footerTemplate"></ng-template>
  `,
                providers: [NGB_DATEPICKER_VALUE_ACCESSOR, NgbDatepickerService, NgbDatepickerKeyMapService],
                styles: ["ngb-datepicker{border:1px solid #dfdfdf;border-radius:.25rem;display:inline-block}.ngb-dp-month{pointer-events:none}.ngb-dp-header{border-bottom:0;border-radius:.25rem .25rem 0 0;padding-top:.25rem}ngb-datepicker-month-view{pointer-events:auto}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-month+.ngb-dp-month>.ngb-dp-month-name,.ngb-dp-month+.ngb-dp-month>ngb-datepicker-month-view>.ngb-dp-week{padding-left:1rem}.ngb-dp-month:last-child .ngb-dp-week{padding-right:.25rem}.ngb-dp-month:first-child .ngb-dp-week{padding-left:.25rem}.ngb-dp-month>ngb-datepicker-month-view>.ngb-dp-week:last-child{padding-bottom:.25rem}.ngb-dp-months{display:-ms-flexbox;display:flex}"]
            }] }
];
/** @nocollapse */
NgbDatepicker.ctorParameters = () => [
    { type: NgbDatepickerKeyMapService },
    { type: NgbDatepickerService },
    { type: NgbCalendar },
    { type: NgbDatepickerI18n },
    { type: NgbDatepickerConfig },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgbDateAdapter },
    { type: NgZone }
];
NgbDatepicker.propDecorators = {
    _monthsEl: [{ type: ViewChild, args: ['months',] }],
    dayTemplate: [{ type: Input }],
    dayTemplateData: [{ type: Input }],
    displayMonths: [{ type: Input }],
    firstDayOfWeek: [{ type: Input }],
    footerTemplate: [{ type: Input }],
    markDisabled: [{ type: Input }],
    maxDate: [{ type: Input }],
    minDate: [{ type: Input }],
    navigation: [{ type: Input }],
    outsideDays: [{ type: Input }],
    showWeekdays: [{ type: Input }],
    showWeekNumbers: [{ type: Input }],
    startDate: [{ type: Input }],
    navigate: [{ type: Output }],
    select: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbDatepickerMonthView {
    /**
     * @param {?} i18n
     */
    constructor(i18n) {
        this.i18n = i18n;
        this.select = new EventEmitter();
    }
    /**
     * @param {?} day
     * @return {?}
     */
    doSelect(day) {
        if (!day.context.disabled && !day.hidden) {
            this.select.emit(day.date);
        }
    }
}
NgbDatepickerMonthView.decorators = [
    { type: Component, args: [{
                selector: 'ngb-datepicker-month-view',
                host: { 'role': 'grid' },
                encapsulation: ViewEncapsulation.None,
                template: `
    <div *ngIf="showWeekdays" class="ngb-dp-week ngb-dp-weekdays bg-light">
      <div *ngIf="showWeekNumbers" class="ngb-dp-weekday ngb-dp-showweek"></div>
      <div *ngFor="let w of month.weekdays" class="ngb-dp-weekday small">
        {{ i18n.getWeekdayShortName(w) }}
      </div>
    </div>
    <ng-template ngFor let-week [ngForOf]="month.weeks">
      <div *ngIf="!week.collapsed" class="ngb-dp-week" role="row">
        <div *ngIf="showWeekNumbers" class="ngb-dp-week-number small text-muted">{{ i18n.getWeekNumerals(week.number) }}</div>
        <div *ngFor="let day of week.days" (click)="doSelect(day)" class="ngb-dp-day" role="gridcell"
          [class.disabled]="day.context.disabled"
          [tabindex]="day.tabindex"
          [class.hidden]="day.hidden"
          [class.ngb-dp-today]="day.context.today"
          [attr.aria-label]="day.ariaLabel">
          <ng-template [ngIf]="!day.hidden">
            <ng-template [ngTemplateOutlet]="dayTemplate" [ngTemplateOutletContext]="day.context"></ng-template>
          </ng-template>
        </div>
      </div>
    </ng-template>
  `,
                styles: ["ngb-datepicker-month-view{display:block}.ngb-dp-week-number,.ngb-dp-weekday{line-height:2rem;text-align:center;font-style:italic}.ngb-dp-weekday{color:#5bc0de;color:var(--info)}.ngb-dp-week{border-radius:.25rem;display:-ms-flexbox;display:flex}.ngb-dp-weekdays{border-bottom:1px solid rgba(0,0,0,.125);border-radius:0}.ngb-dp-day,.ngb-dp-week-number,.ngb-dp-weekday{width:2rem;height:2rem}.ngb-dp-day{cursor:pointer}.ngb-dp-day.disabled,.ngb-dp-day.hidden{cursor:default}"]
            }] }
];
/** @nocollapse */
NgbDatepickerMonthView.ctorParameters = () => [
    { type: NgbDatepickerI18n }
];
NgbDatepickerMonthView.propDecorators = {
    dayTemplate: [{ type: Input }],
    month: [{ type: Input }],
    showWeekdays: [{ type: Input }],
    showWeekNumbers: [{ type: Input }],
    select: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbDatepickerNavigation {
    /**
     * @param {?} i18n
     */
    constructor(i18n) {
        this.i18n = i18n;
        this.navigation = NavigationEvent;
        this.months = [];
        this.navigate = new EventEmitter();
        this.select = new EventEmitter();
    }
}
NgbDatepickerNavigation.decorators = [
    { type: Component, args: [{
                selector: 'ngb-datepicker-navigation',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <div class="ngb-dp-arrow">
      <button type="button" class="btn btn-link ngb-dp-arrow-btn" (click)="navigate.emit(navigation.PREV)" [disabled]="prevDisabled"
              i18n-aria-label="@@ngb.datepicker.previous-month" aria-label="Previous month"
              i18n-title="@@ngb.datepicker.previous-month" title="Previous month">
        <span class="ngb-dp-navigation-chevron"></span>
      </button>
    </div>
    <ngb-datepicker-navigation-select *ngIf="showSelect" class="ngb-dp-navigation-select"
      [date]="date"
      [disabled] = "disabled"
      [months]="selectBoxes.months"
      [years]="selectBoxes.years"
      (select)="select.emit($event)">
    </ngb-datepicker-navigation-select>

    <ng-template *ngIf="!showSelect" ngFor let-month [ngForOf]="months" let-i="index">
      <div class="ngb-dp-arrow" *ngIf="i > 0"></div>
      <div class="ngb-dp-month-name">
        {{ i18n.getMonthFullName(month.number, month.year) }} {{ i18n.getYearNumerals(month.year) }}
      </div>
      <div class="ngb-dp-arrow" *ngIf="i !== months.length - 1"></div>
    </ng-template>
    <div class="ngb-dp-arrow right">
      <button type="button" class="btn btn-link ngb-dp-arrow-btn" (click)="navigate.emit(navigation.NEXT)" [disabled]="nextDisabled"
              i18n-aria-label="@@ngb.datepicker.next-month" aria-label="Next month"
              i18n-title="@@ngb.datepicker.next-month" title="Next month">
        <span class="ngb-dp-navigation-chevron"></span>
      </button>
    </div>
    `,
                styles: ["ngb-datepicker-navigation{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.ngb-dp-navigation-chevron{border-style:solid;border-width:.2em .2em 0 0;display:inline-block;width:.75em;height:.75em;margin-left:.25em;margin-right:.15em;-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}.right .ngb-dp-navigation-chevron{-webkit-transform:rotate(45deg);transform:rotate(45deg);margin-left:.15em;margin-right:.25em}.ngb-dp-arrow{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;padding-right:0;padding-left:0;margin:0;width:2rem;height:2rem}.ngb-dp-arrow.right{-ms-flex-pack:end;justify-content:flex-end}.ngb-dp-arrow-btn{padding:0 .25rem;margin:0 .5rem;border:none;background-color:transparent;z-index:1}.ngb-dp-arrow-btn:focus{outline-width:1px;outline-style:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.ngb-dp-arrow-btn:focus{outline-style:solid}}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-navigation-select{display:-ms-flexbox;display:flex;-ms-flex:1 1 9rem;flex:1 1 9rem}"]
            }] }
];
/** @nocollapse */
NgbDatepickerNavigation.ctorParameters = () => [
    { type: NgbDatepickerI18n }
];
NgbDatepickerNavigation.propDecorators = {
    date: [{ type: Input }],
    disabled: [{ type: Input }],
    months: [{ type: Input }],
    showSelect: [{ type: Input }],
    prevDisabled: [{ type: Input }],
    nextDisabled: [{ type: Input }],
    selectBoxes: [{ type: Input }],
    navigate: [{ type: Output }],
    select: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const isHTMLElementContainedIn = (element, array) => array ? array.some(item => item.contains(element)) : false;
// we'll have to use 'touch' events instead of 'mouse' events on iOS and add a more significant delay
// to avoid re-opening when handling (click) on a toggling element
// TODO: use proper Angular platform detection when NgbAutoClose becomes a service and we can inject PLATFORM_ID
/** @type {?} */
let iOS = false;
if (typeof navigator !== 'undefined') {
    iOS = !!navigator.userAgent && /iPad|iPhone|iPod/.test(navigator.userAgent);
}
/**
 * @param {?} zone
 * @param {?} document
 * @param {?} type
 * @param {?} close
 * @param {?} closed$
 * @param {?} insideElements
 * @param {?=} ignoreElements
 * @return {?}
 */
function ngbAutoClose(zone, document, type, close, closed$, insideElements, ignoreElements) {
    // closing on ESC and outside clicks
    if (type) {
        zone.runOutsideAngular(() => {
            /** @type {?} */
            const shouldCloseOnClick = (event) => {
                /** @type {?} */
                const element = (/** @type {?} */ (event.target));
                if ((event instanceof MouseEvent && event.button === 2) || isHTMLElementContainedIn(element, ignoreElements)) {
                    return false;
                }
                if (type === 'inside') {
                    return isHTMLElementContainedIn(element, insideElements);
                }
                else if (type === 'outside') {
                    return !isHTMLElementContainedIn(element, insideElements);
                }
                else /* if (type === true) */ {
                    return true;
                }
            };
            /** @type {?} */
            const escapes$ = fromEvent(document, 'keydown')
                .pipe(takeUntil(closed$), 
            // tslint:disable-next-line:deprecation
            filter(e => e.which === Key.Escape));
            // we have to pre-calculate 'shouldCloseOnClick' on 'mousedown/touchstart',
            // because on 'mouseup/touchend' DOM nodes might be detached
            /** @type {?} */
            const mouseDowns$ = fromEvent(document, iOS ? 'touchstart' : 'mousedown')
                .pipe(map(shouldCloseOnClick), takeUntil(closed$));
            /** @type {?} */
            const closeableClicks$ = fromEvent(document, iOS ? 'touchend' : 'mouseup')
                .pipe(withLatestFrom(mouseDowns$), filter(([_, shouldClose]) => shouldClose), delay(iOS ? 16 : 0), takeUntil(closed$));
            race([escapes$, closeableClicks$]).subscribe(() => zone.run(close));
        });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const FOCUSABLE_ELEMENTS_SELECTOR = [
    'a[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])',
    'textarea:not([disabled])', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'
].join(', ');
/**
 * Returns first and last focusable elements inside of a given element based on specific CSS selector
 * @param {?} element
 * @return {?}
 */
function getFocusableBoundaryElements(element) {
    /** @type {?} */
    const list = Array.from((/** @type {?} */ (element.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR))))
        .filter(el => el.tabIndex !== -1);
    return [list[0], list[list.length - 1]];
}
/**
 * Function that enforces browser focus to be trapped inside a DOM element.
 *
 * Works only for clicks inside the element and navigation with 'Tab', ignoring clicks outside of the element
 *
 * \@param element The element around which focus will be trapped inside
 * \@param stopFocusTrap$ The observable stream. When completed the focus trap will clean up listeners
 * and free internal resources
 * \@param refocusOnClick Put the focus back to the last focused element whenever a click occurs on element (default to
 * false)
 * @type {?}
 */
const ngbFocusTrap = (element, stopFocusTrap$, refocusOnClick = false) => {
    // last focused element
    /** @type {?} */
    const lastFocusedElement$ = fromEvent(element, 'focusin').pipe(takeUntil(stopFocusTrap$), map(e => e.target));
    // 'tab' / 'shift+tab' stream
    fromEvent(element, 'keydown')
        .pipe(takeUntil(stopFocusTrap$), 
    // tslint:disable:deprecation
    filter(e => e.which === Key.Tab), 
    // tslint:enable:deprecation
    withLatestFrom(lastFocusedElement$))
        .subscribe(([tabEvent, focusedElement]) => {
        const [first, last] = getFocusableBoundaryElements(element);
        if ((focusedElement === first || focusedElement === element) && tabEvent.shiftKey) {
            last.focus();
            tabEvent.preventDefault();
        }
        if (focusedElement === last && !tabEvent.shiftKey) {
            first.focus();
            tabEvent.preventDefault();
        }
    });
    // inside click
    if (refocusOnClick) {
        fromEvent(element, 'click')
            .pipe(takeUntil(stopFocusTrap$), withLatestFrom(lastFocusedElement$), map(arr => (/** @type {?} */ (arr[1]))))
            .subscribe(lastFocusedElement => lastFocusedElement.focus());
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// previous version:
// https://github.com/angular-ui/bootstrap/blob/07c31d0731f7cb068a1932b8e01d2312b796b4ec/src/position/position.js
class Positioning {
    /**
     * @param {?} element
     * @return {?}
     */
    getAllStyles(element) { return window.getComputedStyle(element); }
    /**
     * @param {?} element
     * @param {?} prop
     * @return {?}
     */
    getStyle(element, prop) { return this.getAllStyles(element)[prop]; }
    /**
     * @param {?} element
     * @return {?}
     */
    isStaticPositioned(element) {
        return (this.getStyle(element, 'position') || 'static') === 'static';
    }
    /**
     * @param {?} element
     * @return {?}
     */
    offsetParent(element) {
        /** @type {?} */
        let offsetParentEl = (/** @type {?} */ (element.offsetParent)) || document.documentElement;
        while (offsetParentEl && offsetParentEl !== document.documentElement && this.isStaticPositioned(offsetParentEl)) {
            offsetParentEl = (/** @type {?} */ (offsetParentEl.offsetParent));
        }
        return offsetParentEl || document.documentElement;
    }
    /**
     * @param {?} element
     * @param {?=} round
     * @return {?}
     */
    position(element, round = true) {
        /** @type {?} */
        let elPosition;
        /** @type {?} */
        let parentOffset = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 };
        if (this.getStyle(element, 'position') === 'fixed') {
            elPosition = element.getBoundingClientRect();
            elPosition = {
                top: elPosition.top,
                bottom: elPosition.bottom,
                left: elPosition.left,
                right: elPosition.right,
                height: elPosition.height,
                width: elPosition.width
            };
        }
        else {
            /** @type {?} */
            const offsetParentEl = this.offsetParent(element);
            elPosition = this.offset(element, false);
            if (offsetParentEl !== document.documentElement) {
                parentOffset = this.offset(offsetParentEl, false);
            }
            parentOffset.top += offsetParentEl.clientTop;
            parentOffset.left += offsetParentEl.clientLeft;
        }
        elPosition.top -= parentOffset.top;
        elPosition.bottom -= parentOffset.top;
        elPosition.left -= parentOffset.left;
        elPosition.right -= parentOffset.left;
        if (round) {
            elPosition.top = Math.round(elPosition.top);
            elPosition.bottom = Math.round(elPosition.bottom);
            elPosition.left = Math.round(elPosition.left);
            elPosition.right = Math.round(elPosition.right);
        }
        return elPosition;
    }
    /**
     * @param {?} element
     * @param {?=} round
     * @return {?}
     */
    offset(element, round = true) {
        /** @type {?} */
        const elBcr = element.getBoundingClientRect();
        /** @type {?} */
        const viewportOffset = {
            top: window.pageYOffset - document.documentElement.clientTop,
            left: window.pageXOffset - document.documentElement.clientLeft
        };
        /** @type {?} */
        let elOffset = {
            height: elBcr.height || element.offsetHeight,
            width: elBcr.width || element.offsetWidth,
            top: elBcr.top + viewportOffset.top,
            bottom: elBcr.bottom + viewportOffset.top,
            left: elBcr.left + viewportOffset.left,
            right: elBcr.right + viewportOffset.left
        };
        if (round) {
            elOffset.height = Math.round(elOffset.height);
            elOffset.width = Math.round(elOffset.width);
            elOffset.top = Math.round(elOffset.top);
            elOffset.bottom = Math.round(elOffset.bottom);
            elOffset.left = Math.round(elOffset.left);
            elOffset.right = Math.round(elOffset.right);
        }
        return elOffset;
    }
    /*
        Return false if the element to position is outside the viewport
      */
    /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @param {?} placement
     * @param {?=} appendToBody
     * @return {?}
     */
    positionElements(hostElement, targetElement, placement, appendToBody) {
        const [placementPrimary = 'top', placementSecondary = 'center'] = placement.split('-');
        /** @type {?} */
        const hostElPosition = appendToBody ? this.offset(hostElement, false) : this.position(hostElement, false);
        /** @type {?} */
        const targetElStyles = this.getAllStyles(targetElement);
        /** @type {?} */
        const marginTop = parseFloat(targetElStyles.marginTop);
        /** @type {?} */
        const marginBottom = parseFloat(targetElStyles.marginBottom);
        /** @type {?} */
        const marginLeft = parseFloat(targetElStyles.marginLeft);
        /** @type {?} */
        const marginRight = parseFloat(targetElStyles.marginRight);
        /** @type {?} */
        let topPosition = 0;
        /** @type {?} */
        let leftPosition = 0;
        switch (placementPrimary) {
            case 'top':
                topPosition = (hostElPosition.top - (targetElement.offsetHeight + marginTop + marginBottom));
                break;
            case 'bottom':
                topPosition = (hostElPosition.top + hostElPosition.height);
                break;
            case 'left':
                leftPosition = (hostElPosition.left - (targetElement.offsetWidth + marginLeft + marginRight));
                break;
            case 'right':
                leftPosition = (hostElPosition.left + hostElPosition.width);
                break;
        }
        switch (placementSecondary) {
            case 'top':
                topPosition = hostElPosition.top;
                break;
            case 'bottom':
                topPosition = hostElPosition.top + hostElPosition.height - targetElement.offsetHeight;
                break;
            case 'left':
                leftPosition = hostElPosition.left;
                break;
            case 'right':
                leftPosition = hostElPosition.left + hostElPosition.width - targetElement.offsetWidth;
                break;
            case 'center':
                if (placementPrimary === 'top' || placementPrimary === 'bottom') {
                    leftPosition = (hostElPosition.left + hostElPosition.width / 2 - targetElement.offsetWidth / 2);
                }
                else {
                    topPosition = (hostElPosition.top + hostElPosition.height / 2 - targetElement.offsetHeight / 2);
                }
                break;
        }
        /// The translate3d/gpu acceleration render a blurry text on chrome, the next line is commented until a browser fix
        // targetElement.style.transform = `translate3d(${Math.round(leftPosition)}px, ${Math.floor(topPosition)}px, 0px)`;
        targetElement.style.transform = `translate(${Math.round(leftPosition)}px, ${Math.round(topPosition)}px)`;
        // Check if the targetElement is inside the viewport
        /** @type {?} */
        const targetElBCR = targetElement.getBoundingClientRect();
        /** @type {?} */
        const html = document.documentElement;
        /** @type {?} */
        const windowHeight = window.innerHeight || html.clientHeight;
        /** @type {?} */
        const windowWidth = window.innerWidth || html.clientWidth;
        return targetElBCR.left >= 0 && targetElBCR.top >= 0 && targetElBCR.right <= windowWidth &&
            targetElBCR.bottom <= windowHeight;
    }
}
/** @type {?} */
const placementSeparator = /\s+/;
/** @type {?} */
const positionService = new Positioning();
/*
 * Accept the placement array and applies the appropriate placement dependent on the viewport.
 * Returns the applied placement.
 * In case of auto placement, placements are selected in order
 *   'top', 'bottom', 'left', 'right',
 *   'top-left', 'top-right',
 *   'bottom-left', 'bottom-right',
 *   'left-top', 'left-bottom',
 *   'right-top', 'right-bottom'.
 * */
/**
 * @param {?} hostElement
 * @param {?} targetElement
 * @param {?} placement
 * @param {?=} appendToBody
 * @param {?=} baseClass
 * @return {?}
 */
function positionElements(hostElement, targetElement, placement, appendToBody, baseClass) {
    /** @type {?} */
    let placementVals = Array.isArray(placement) ? placement : (/** @type {?} */ (placement.split(placementSeparator)));
    /** @type {?} */
    const allowedPlacements = [
        'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'left-top', 'left-bottom',
        'right-top', 'right-bottom'
    ];
    /** @type {?} */
    const classList = targetElement.classList;
    /** @type {?} */
    const addClassesToTarget = (targetPlacement) => {
        const [primary, secondary] = targetPlacement.split('-');
        /** @type {?} */
        const classes = [];
        if (baseClass) {
            classes.push(`${baseClass}-${primary}`);
            if (secondary) {
                classes.push(`${baseClass}-${primary}-${secondary}`);
            }
            classes.forEach((classname) => { classList.add(classname); });
        }
        return classes;
    };
    // Remove old placement classes to avoid issues
    if (baseClass) {
        allowedPlacements.forEach((placementToRemove) => { classList.remove(`${baseClass}-${placementToRemove}`); });
    }
    // replace auto placement with other placements
    /** @type {?} */
    let hasAuto = placementVals.findIndex(val => val === 'auto');
    if (hasAuto >= 0) {
        allowedPlacements.forEach(function (obj) {
            if (placementVals.find(val => val.search('^' + obj) !== -1) == null) {
                placementVals.splice(hasAuto++, 1, (/** @type {?} */ (obj)));
            }
        });
    }
    // coordinates where to position
    // Required for transform:
    /** @type {?} */
    const style = targetElement.style;
    style.position = 'absolute';
    style.top = '0';
    style.left = '0';
    // The translate3d/gpu acceleration render a blurry text on chrome, the next line is commented until a browser fix
    // style['will-change'] = 'transform';
    /** @type {?} */
    let testPlacement;
    /** @type {?} */
    let isInViewport = false;
    for (testPlacement of placementVals) {
        /** @type {?} */
        let addedClasses = addClassesToTarget(testPlacement);
        if (positionService.positionElements(hostElement, targetElement, testPlacement, appendToBody)) {
            isInViewport = true;
            break;
        }
        // Remove the baseClasses for further calculation
        if (baseClass) {
            addedClasses.forEach((classname) => { classList.remove(classname); });
        }
    }
    if (!isInViewport) {
        // If nothing match, the first placement is the default one
        testPlacement = placementVals[0];
        addClassesToTarget(testPlacement);
        positionService.positionElements(hostElement, targetElement, testPlacement, appendToBody);
    }
    return testPlacement;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function NGB_DATEPICKER_PARSER_FORMATTER_FACTORY() {
    return new NgbDateISOParserFormatter();
}
/**
 * Abstract type serving as a DI token for the service parsing and formatting dates for the NgbInputDatepicker
 * directive. A default implementation using the ISO 8601 format is provided, but you can provide another implementation
 * to use an alternative format.
 * @abstract
 */
class NgbDateParserFormatter {
}
NgbDateParserFormatter.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY },] }
];
/** @nocollapse */ NgbDateParserFormatter.ngInjectableDef = defineInjectable({ factory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY, token: NgbDateParserFormatter, providedIn: "root" });
class NgbDateISOParserFormatter extends NgbDateParserFormatter {
    /**
     * @param {?} value
     * @return {?}
     */
    parse(value) {
        if (value) {
            /** @type {?} */
            const dateParts = value.trim().split('-');
            if (dateParts.length === 1 && isNumber(dateParts[0])) {
                return { year: toInteger(dateParts[0]), month: null, day: null };
            }
            else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: null };
            }
            else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: toInteger(dateParts[2]) };
            }
        }
        return null;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    format(date) {
        return date ?
            `${date.year}-${isNumber(date.month) ? padNumber(date.month) : ''}-${isNumber(date.day) ? padNumber(date.day) : ''}` :
            '';
    }
}
NgbDateISOParserFormatter.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_DATEPICKER_VALUE_ACCESSOR$1 = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbInputDatepicker),
    multi: true
};
/** @type {?} */
const NGB_DATEPICKER_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => NgbInputDatepicker),
    multi: true
};
/**
 * A directive that makes it possible to have datepickers on input fields.
 * Manages integration with the input field itself (data entry) and ngModel (validation etc.).
 */
class NgbInputDatepicker {
    /**
     * @param {?} _parserFormatter
     * @param {?} _elRef
     * @param {?} _vcRef
     * @param {?} _renderer
     * @param {?} _cfr
     * @param {?} _ngZone
     * @param {?} _service
     * @param {?} _calendar
     * @param {?} _dateAdapter
     * @param {?} _document
     * @param {?} _changeDetector
     */
    constructor(_parserFormatter, _elRef, _vcRef, _renderer, _cfr, _ngZone, _service, _calendar, _dateAdapter, _document, _changeDetector) {
        this._parserFormatter = _parserFormatter;
        this._elRef = _elRef;
        this._vcRef = _vcRef;
        this._renderer = _renderer;
        this._cfr = _cfr;
        this._ngZone = _ngZone;
        this._service = _service;
        this._calendar = _calendar;
        this._dateAdapter = _dateAdapter;
        this._document = _document;
        this._changeDetector = _changeDetector;
        this._closed$ = new Subject();
        this._cRef = null;
        this._disabled = false;
        /**
         * Indicates whether the datepicker popup should be closed automatically after date selection / outside click or not.
         *
         * By default the popup will close on both date selection and outside click. If the value is 'false' the popup has to
         * be closed manually via '.close()' or '.toggle()' methods. If the value is set to 'inside' the popup will close on
         * date selection only. For the 'outside' the popup will close only on the outside click.
         *
         * \@since 3.0.0
         */
        this.autoClose = true;
        /**
         * Placement of a datepicker popup accepts:
         *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
         *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
         *  array or a space separated string of above values
         */
        this.placement = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
        /**
         * An event fired when user selects a date using keyboard or mouse.
         * The payload of the event is currently selected NgbDate.
         *
         * \@since 1.1.1
         */
        this.dateSelect = new EventEmitter();
        /**
         * An event fired when navigation happens and currently displayed month changes.
         * See NgbDatepickerNavigateEvent for the payload info.
         */
        this.navigate = new EventEmitter();
        this._onChange = (_) => { };
        this._onTouched = () => { };
        this._validatorChange = () => { };
        this._zoneSubscription = _ngZone.onStable.subscribe(() => {
            if (this._cRef) {
                positionElements(this._elRef.nativeElement, this._cRef.location.nativeElement, this.placement, this.container === 'body');
            }
        });
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = value === '' || (value && value !== 'false');
        if (this.isOpen()) {
            this._cRef.instance.setDisabledState(this._disabled);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this._onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this._onTouched = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnValidatorChange(fn) { this._validatorChange = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) { this.disabled = isDisabled; }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        /** @type {?} */
        const value = c.value;
        if (value === null || value === undefined) {
            return null;
        }
        /** @type {?} */
        const ngbDate = this._fromDateStruct(this._dateAdapter.fromModel(value));
        if (!this._calendar.isValid(ngbDate)) {
            return { 'ngbDate': { invalid: c.value } };
        }
        if (this.minDate && ngbDate.before(NgbDate.from(this.minDate))) {
            return { 'ngbDate': { requiredBefore: this.minDate } };
        }
        if (this.maxDate && ngbDate.after(NgbDate.from(this.maxDate))) {
            return { 'ngbDate': { requiredAfter: this.maxDate } };
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._model = this._fromDateStruct(this._dateAdapter.fromModel(value));
        this._writeModelValue(this._model);
    }
    /**
     * @param {?} value
     * @param {?=} updateView
     * @return {?}
     */
    manualDateChange(value, updateView = false) {
        /** @type {?} */
        const inputValueChanged = value !== this._inputValue;
        if (inputValueChanged) {
            this._inputValue = value;
            this._model = this._fromDateStruct(this._parserFormatter.parse(value));
        }
        if (inputValueChanged || !updateView) {
            this._onChange(this._model ? this._dateAdapter.toModel(this._model) : (value === '' ? null : value));
        }
        if (updateView && this._model) {
            this._writeModelValue(this._model);
        }
    }
    /**
     * @return {?}
     */
    isOpen() { return !!this._cRef; }
    /**
     * Opens the datepicker with the selected date indicated by the ngModel value.
     * @return {?}
     */
    open() {
        if (!this.isOpen()) {
            /** @type {?} */
            const cf = this._cfr.resolveComponentFactory(NgbDatepicker);
            this._cRef = this._vcRef.createComponent(cf);
            this._applyPopupStyling(this._cRef.location.nativeElement);
            this._applyDatepickerInputs(this._cRef.instance);
            this._subscribeForDatepickerOutputs(this._cRef.instance);
            this._cRef.instance.ngOnInit();
            this._cRef.instance.writeValue(this._dateAdapter.toModel(this._model));
            // date selection event handling
            this._cRef.instance.registerOnChange((selectedDate) => {
                this.writeValue(selectedDate);
                this._onChange(selectedDate);
                this._onTouched();
            });
            this._cRef.changeDetectorRef.detectChanges();
            this._cRef.instance.setDisabledState(this.disabled);
            if (this.container === 'body') {
                window.document.querySelector(this.container).appendChild(this._cRef.location.nativeElement);
            }
            // focus handling
            ngbFocusTrap(this._cRef.location.nativeElement, this._closed$, true);
            this._cRef.instance.focus();
            ngbAutoClose(this._ngZone, this._document, this.autoClose, () => this.close(), this._closed$, [], [this._elRef.nativeElement, this._cRef.location.nativeElement]);
        }
    }
    /**
     * Closes the datepicker popup.
     * @return {?}
     */
    close() {
        if (this.isOpen()) {
            this._vcRef.remove(this._vcRef.indexOf(this._cRef.hostView));
            this._cRef = null;
            this._closed$.next();
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Toggles the datepicker popup (opens when closed and closes when opened).
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
     * Navigates current view to provided date.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     * Use 'startDate' input as an alternative
     * @param {?=} date
     * @return {?}
     */
    navigateTo(date) {
        if (this.isOpen()) {
            this._cRef.instance.navigateTo(date);
        }
    }
    /**
     * @return {?}
     */
    onBlur() { this._onTouched(); }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['minDate'] || changes['maxDate']) {
            this._validatorChange();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.close();
        this._zoneSubscription.unsubscribe();
    }
    /**
     * @param {?} datepickerInstance
     * @return {?}
     */
    _applyDatepickerInputs(datepickerInstance) {
        ['dayTemplate', 'dayTemplateData', 'displayMonths', 'firstDayOfWeek', 'footerTemplate', 'markDisabled', 'minDate',
            'maxDate', 'navigation', 'outsideDays', 'showNavigation', 'showWeekdays', 'showWeekNumbers']
            .forEach((optionName) => {
            if (this[optionName] !== undefined) {
                datepickerInstance[optionName] = this[optionName];
            }
        });
        datepickerInstance.startDate = this.startDate || this._model;
    }
    /**
     * @param {?} nativeElement
     * @return {?}
     */
    _applyPopupStyling(nativeElement) {
        this._renderer.addClass(nativeElement, 'dropdown-menu');
        this._renderer.setStyle(nativeElement, 'padding', '0');
        this._renderer.addClass(nativeElement, 'show');
    }
    /**
     * @param {?} datepickerInstance
     * @return {?}
     */
    _subscribeForDatepickerOutputs(datepickerInstance) {
        datepickerInstance.navigate.subscribe(navigateEvent => this.navigate.emit(navigateEvent));
        datepickerInstance.select.subscribe(date => {
            this.dateSelect.emit(date);
            if (this.autoClose === true || this.autoClose === 'inside') {
                this.close();
            }
        });
    }
    /**
     * @param {?} model
     * @return {?}
     */
    _writeModelValue(model) {
        /** @type {?} */
        const value = this._parserFormatter.format(model);
        this._inputValue = value;
        this._renderer.setProperty(this._elRef.nativeElement, 'value', value);
        if (this.isOpen()) {
            this._cRef.instance.writeValue(this._dateAdapter.toModel(model));
            this._onTouched();
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    _fromDateStruct(date) {
        /** @type {?} */
        const ngbDate = date ? new NgbDate(date.year, date.month, date.day) : null;
        return this._calendar.isValid(ngbDate) ? ngbDate : null;
    }
}
NgbInputDatepicker.decorators = [
    { type: Directive, args: [{
                selector: 'input[ngbDatepicker]',
                exportAs: 'ngbDatepicker',
                host: {
                    '(input)': 'manualDateChange($event.target.value)',
                    '(change)': 'manualDateChange($event.target.value, true)',
                    '(blur)': 'onBlur()',
                    '[disabled]': 'disabled'
                },
                providers: [NGB_DATEPICKER_VALUE_ACCESSOR$1, NGB_DATEPICKER_VALIDATOR, NgbDatepickerService]
            },] }
];
/** @nocollapse */
NgbInputDatepicker.ctorParameters = () => [
    { type: NgbDateParserFormatter },
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: Renderer2 },
    { type: ComponentFactoryResolver },
    { type: NgZone },
    { type: NgbDatepickerService },
    { type: NgbCalendar },
    { type: NgbDateAdapter },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ChangeDetectorRef }
];
NgbInputDatepicker.propDecorators = {
    autoClose: [{ type: Input }],
    dayTemplate: [{ type: Input }],
    dayTemplateData: [{ type: Input }],
    displayMonths: [{ type: Input }],
    firstDayOfWeek: [{ type: Input }],
    footerTemplate: [{ type: Input }],
    markDisabled: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    navigation: [{ type: Input }],
    outsideDays: [{ type: Input }],
    placement: [{ type: Input }],
    showWeekdays: [{ type: Input }],
    showWeekNumbers: [{ type: Input }],
    startDate: [{ type: Input }],
    container: [{ type: Input }],
    dateSelect: [{ type: Output }],
    navigate: [{ type: Output }],
    disabled: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbDatepickerDayView {
    /**
     * @param {?} i18n
     */
    constructor(i18n) {
        this.i18n = i18n;
    }
    /**
     * @return {?}
     */
    isMuted() { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); }
}
NgbDatepickerDayView.decorators = [
    { type: Component, args: [{
                selector: '[ngbDatepickerDayView]',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    'class': 'btn-light',
                    '[class.bg-primary]': 'selected',
                    '[class.text-white]': 'selected',
                    '[class.text-muted]': 'isMuted()',
                    '[class.outside]': 'isMuted()',
                    '[class.active]': 'focused'
                },
                template: `{{ i18n.getDayNumerals(date) }}`,
                styles: ["[ngbDatepickerDayView]{text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:0 0}[ngbDatepickerDayView].outside{opacity:.5}"]
            }] }
];
/** @nocollapse */
NgbDatepickerDayView.ctorParameters = () => [
    { type: NgbDatepickerI18n }
];
NgbDatepickerDayView.propDecorators = {
    currentMonth: [{ type: Input }],
    date: [{ type: Input }],
    disabled: [{ type: Input }],
    focused: [{ type: Input }],
    selected: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbDatepickerNavigationSelect {
    /**
     * @param {?} i18n
     */
    constructor(i18n) {
        this.i18n = i18n;
        this.select = new EventEmitter();
    }
    /**
     * @param {?} month
     * @return {?}
     */
    changeMonth(month) { this.select.emit(new NgbDate(this.date.year, toInteger(month), 1)); }
    /**
     * @param {?} year
     * @return {?}
     */
    changeYear(year) { this.select.emit(new NgbDate(toInteger(year), this.date.month, 1)); }
}
NgbDatepickerNavigationSelect.decorators = [
    { type: Component, args: [{
                selector: 'ngb-datepicker-navigation-select',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <select
      [disabled]="disabled"
      class="custom-select"
      [value]="date?.month"
      i18n-aria-label="@@ngb.datepicker.select-month" aria-label="Select month"
      i18n-title="@@ngb.datepicker.select-month" title="Select month"
      (change)="changeMonth($event.target.value)">
        <option *ngFor="let m of months" [attr.aria-label]="i18n.getMonthFullName(m, date?.year)"
                [value]="m">{{ i18n.getMonthShortName(m, date?.year) }}</option>
    </select><select
      [disabled]="disabled"
      class="custom-select"
      [value]="date?.year"
      i18n-aria-label="@@ngb.datepicker.select-year" aria-label="Select year"
      i18n-title="@@ngb.datepicker.select-year" title="Select year"
      (change)="changeYear($event.target.value)">
        <option *ngFor="let y of years" [value]="y">{{ i18n.getYearNumerals(y) }}</option>
    </select>
  `,
                styles: ["ngb-datepicker-navigation-select>.custom-select{-ms-flex:1 1 auto;flex:1 1 auto;padding:0 .5rem;font-size:.875rem;height:1.85rem}"]
            }] }
];
/** @nocollapse */
NgbDatepickerNavigationSelect.ctorParameters = () => [
    { type: NgbDatepickerI18n }
];
NgbDatepickerNavigationSelect.propDecorators = {
    date: [{ type: Input }],
    disabled: [{ type: Input }],
    months: [{ type: Input }],
    years: [{ type: Input }],
    select: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class NgbCalendarHijri extends NgbCalendar {
    /**
     * @return {?}
     */
    getDaysPerWeek() { return 7; }
    /**
     * @return {?}
     */
    getMonths() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }
    /**
     * @return {?}
     */
    getWeeksPerMonth() { return 6; }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getNext(date, period = 'd', number = 1) {
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date = this._setYear(date, date.year + number);
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = this._setMonth(date, date.month + number);
                date.day = 1;
                return date;
            case 'd':
                return this._setDay(date, date.day + number);
            default:
                return date;
        }
    }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getPrev(date, period = 'd', number = 1) { return this.getNext(date, period, -number); }
    /**
     * @param {?} date
     * @return {?}
     */
    getWeekday(date) {
        /** @type {?} */
        const day = this.toGregorian(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        /** @type {?} */
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        /** @type {?} */
        const date = week[thursdayIndex];
        /** @type {?} */
        const jsDate = this.toGregorian(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        // Thursday
        /** @type {?} */
        const time = jsDate.getTime();
        /** @type {?} */
        const MuhDate = this.toGregorian(new NgbDate(date.year, 1, 1));
        return Math.floor(Math.round((time - MuhDate.getTime()) / 86400000) / 7) + 1;
    }
    /**
     * @return {?}
     */
    getToday() { return this.fromGregorian(new Date()); }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        return date && isNumber(date.year) && isNumber(date.month) && isNumber(date.day) &&
            !isNaN(this.toGregorian(date).getTime());
    }
    /**
     * @param {?} date
     * @param {?} day
     * @return {?}
     */
    _setDay(date, day) {
        day = +day;
        /** @type {?} */
        let mDays = this.getDaysPerMonth(date.month, date.year);
        if (day <= 0) {
            while (day <= 0) {
                date = this._setMonth(date, date.month - 1);
                mDays = this.getDaysPerMonth(date.month, date.year);
                day += mDays;
            }
        }
        else if (day > mDays) {
            while (day > mDays) {
                day -= mDays;
                date = this._setMonth(date, date.month + 1);
                mDays = this.getDaysPerMonth(date.month, date.year);
            }
        }
        date.day = day;
        return date;
    }
    /**
     * @param {?} date
     * @param {?} month
     * @return {?}
     */
    _setMonth(date, month) {
        month = +month;
        date.year = date.year + Math.floor((month - 1) / 12);
        date.month = Math.floor(((month - 1) % 12 + 12) % 12) + 1;
        return date;
    }
    /**
     * @param {?} date
     * @param {?} year
     * @return {?}
     */
    _setYear(date, year) {
        date.year = +year;
        return date;
    }
}
NgbCalendarHijri.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Checks if islamic year is a leap year
 * @param {?} hYear
 * @return {?}
 */
function isIslamicLeapYear(hYear) {
    return (14 + 11 * hYear) % 30 < 11;
}
/**
 * Checks if gregorian years is a leap year
 * @param {?} gDate
 * @return {?}
 */
function isGregorianLeapYear(gDate) {
    /** @type {?} */
    const year = gDate.getFullYear();
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
/**
 * Returns the start of Hijri Month.
 * `hMonth` is 0 for Muharram, 1 for Safar, etc.
 * `hYear` is any Hijri hYear.
 * @param {?} hYear
 * @param {?} hMonth
 * @return {?}
 */
function getIslamicMonthStart(hYear, hMonth) {
    return Math.ceil(29.5 * hMonth) + (hYear - 1) * 354 + Math.floor((3 + 11 * hYear) / 30.0);
}
/**
 * Returns the start of Hijri year.
 * `year` is any Hijri year.
 * @param {?} year
 * @return {?}
 */
function getIslamicYearStart(year) {
    return (year - 1) * 354 + Math.floor((3 + 11 * year) / 30.0);
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function mod(a, b) {
    return a - b * Math.floor(a / b);
}
/**
 * The civil calendar is one type of Hijri calendars used in islamic countries.
 * Uses a fixed cycle of alternating 29- and 30-day months,
 * with a leap day added to the last month of 11 out of every 30 years.
 * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
 * All the calculations here are based on the equations from "Calendrical Calculations" By Edward M. Reingold, Nachum
 * Dershowitz.
 * @type {?}
 */
const GREGORIAN_EPOCH = 1721425.5;
/** @type {?} */
const ISLAMIC_EPOCH = 1948439.5;
class NgbCalendarIslamicCivil extends NgbCalendarHijri {
    /**
     * Returns the equivalent islamic(civil) date value for a give input Gregorian date.
     * `gDate` is a JS Date to be converted to Hijri.
     * @param {?} gDate
     * @return {?}
     */
    fromGregorian(gDate) {
        /** @type {?} */
        const gYear = gDate.getFullYear();
        /** @type {?} */
        const gMonth = gDate.getMonth();
        /** @type {?} */
        const gDay = gDate.getDate();
        /** @type {?} */
        let julianDay = GREGORIAN_EPOCH - 1 + 365 * (gYear - 1) + Math.floor((gYear - 1) / 4) +
            -Math.floor((gYear - 1) / 100) + Math.floor((gYear - 1) / 400) +
            Math.floor((367 * (gMonth + 1) - 362) / 12 + (gMonth + 1 <= 2 ? 0 : isGregorianLeapYear(gDate) ? -1 : -2) + gDay);
        julianDay = Math.floor(julianDay) + 0.5;
        /** @type {?} */
        const days = julianDay - ISLAMIC_EPOCH;
        /** @type {?} */
        const hYear = Math.floor((30 * days + 10646) / 10631.0);
        /** @type {?} */
        let hMonth = Math.ceil((days - 29 - getIslamicYearStart(hYear)) / 29.5);
        hMonth = Math.min(hMonth, 11);
        /** @type {?} */
        const hDay = Math.ceil(days - getIslamicMonthStart(hYear, hMonth)) + 1;
        return new NgbDate(hYear, hMonth + 1, hDay);
    }
    /**
     * Returns the equivalent JS date value for a give input islamic(civil) date.
     * `hDate` is an islamic(civil) date to be converted to Gregorian.
     * @param {?} hDate
     * @return {?}
     */
    toGregorian(hDate) {
        /** @type {?} */
        const hYear = hDate.year;
        /** @type {?} */
        const hMonth = hDate.month - 1;
        /** @type {?} */
        const hDay = hDate.day;
        /** @type {?} */
        const julianDay = hDay + Math.ceil(29.5 * hMonth) + (hYear - 1) * 354 + Math.floor((3 + 11 * hYear) / 30) + ISLAMIC_EPOCH - 1;
        /** @type {?} */
        const wjd = Math.floor(julianDay - 0.5) + 0.5;
        /** @type {?} */
        const depoch = wjd - GREGORIAN_EPOCH;
        /** @type {?} */
        const quadricent = Math.floor(depoch / 146097);
        /** @type {?} */
        const dqc = mod(depoch, 146097);
        /** @type {?} */
        const cent = Math.floor(dqc / 36524);
        /** @type {?} */
        const dcent = mod(dqc, 36524);
        /** @type {?} */
        const quad = Math.floor(dcent / 1461);
        /** @type {?} */
        const dquad = mod(dcent, 1461);
        /** @type {?} */
        const yindex = Math.floor(dquad / 365);
        /** @type {?} */
        let year = quadricent * 400 + cent * 100 + quad * 4 + yindex;
        if (!(cent === 4 || yindex === 4)) {
            year++;
        }
        /** @type {?} */
        const gYearStart = GREGORIAN_EPOCH + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400);
        /** @type {?} */
        const yearday = wjd - gYearStart;
        /** @type {?} */
        const tjd = GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400) + Math.floor(739 / 12 + (isGregorianLeapYear(new Date(year, 3, 1)) ? -1 : -2) + 1);
        /** @type {?} */
        const leapadj = wjd < tjd ? 0 : isGregorianLeapYear(new Date(year, 3, 1)) ? 1 : 2;
        /** @type {?} */
        const month = Math.floor(((yearday + leapadj) * 12 + 373) / 367);
        /** @type {?} */
        const tjd2 = GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400) +
            Math.floor((367 * month - 362) / 12 + (month <= 2 ? 0 : isGregorianLeapYear(new Date(year, month - 1, 1)) ? -1 : -2) +
                1);
        /** @type {?} */
        const day = wjd - tjd2 + 1;
        return new Date(year, month - 1, day);
    }
    /**
     * Returns the number of days in a specific Hijri month.
     * `month` is 1 for Muharram, 2 for Safar, etc.
     * `year` is any Hijri year.
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    getDaysPerMonth(month, year) {
        year = year + Math.floor(month / 13);
        month = ((month - 1) % 12) + 1;
        /** @type {?} */
        let length = 29 + month % 2;
        if (month === 12 && isIslamicLeapYear(year)) {
            length++;
        }
        return length;
    }
}
NgbCalendarIslamicCivil.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Umalqura calendar is one type of Hijri calendars used in islamic countries.
 * This Calendar is used by Saudi Arabia for administrative purpose.
 * Unlike tabular calendars, the algorithm involves astronomical calculation, but it's still deterministic.
 * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
 * @type {?}
 */
const GREGORIAN_FIRST_DATE = new Date(1882, 10, 12);
/** @type {?} */
const GREGORIAN_LAST_DATE = new Date(2174, 10, 25);
/** @type {?} */
const HIJRI_BEGIN = 1300;
/** @type {?} */
const HIJRI_END = 1600;
/** @type {?} */
const ONE_DAY = 1000 * 60 * 60 * 24;
/** @type {?} */
const MONTH_LENGTH = [
    // 1300-1304
    '101010101010', '110101010100', '111011001001', '011011010100', '011011101010',
    // 1305-1309
    '001101101100', '101010101101', '010101010101', '011010101001', '011110010010',
    // 1310-1314
    '101110101001', '010111010100', '101011011010', '010101011100', '110100101101',
    // 1315-1319
    '011010010101', '011101001010', '101101010100', '101101101010', '010110101101',
    // 1320-1324
    '010010101110', '101001001111', '010100010111', '011010001011', '011010100101',
    // 1325-1329
    '101011010101', '001011010110', '100101011011', '010010011101', '101001001101',
    // 1330-1334
    '110100100110', '110110010101', '010110101100', '100110110110', '001010111010',
    // 1335-1339
    '101001011011', '010100101011', '101010010101', '011011001010', '101011101001',
    // 1340-1344
    '001011110100', '100101110110', '001010110110', '100101010110', '101011001010',
    // 1345-1349
    '101110100100', '101111010010', '010111011001', '001011011100', '100101101101',
    // 1350-1354
    '010101001101', '101010100101', '101101010010', '101110100101', '010110110100',
    // 1355-1359
    '100110110110', '010101010111', '001010010111', '010101001011', '011010100011',
    // 1360-1364
    '011101010010', '101101100101', '010101101010', '101010101011', '010100101011',
    // 1365-1369
    '110010010101', '110101001010', '110110100101', '010111001010', '101011010110',
    // 1370-1374
    '100101010111', '010010101011', '100101001011', '101010100101', '101101010010',
    // 1375-1379
    '101101101010', '010101110101', '001001110110', '100010110111', '010001011011',
    // 1380-1384
    '010101010101', '010110101001', '010110110100', '100111011010', '010011011101',
    // 1385-1389
    '001001101110', '100100110110', '101010101010', '110101010100', '110110110010',
    // 1390-1394
    '010111010101', '001011011010', '100101011011', '010010101011', '101001010101',
    // 1395-1399
    '101101001001', '101101100100', '101101110001', '010110110100', '101010110101',
    // 1400-1404
    '101001010101', '110100100101', '111010010010', '111011001001', '011011010100',
    // 1405-1409
    '101011101001', '100101101011', '010010101011', '101010010011', '110101001001',
    // 1410-1414
    '110110100100', '110110110010', '101010111001', '010010111010', '101001011011',
    // 1415-1419
    '010100101011', '101010010101', '101100101010', '101101010101', '010101011100',
    // 1420-1424
    '010010111101', '001000111101', '100100011101', '101010010101', '101101001010',
    // 1425-1429
    '101101011010', '010101101101', '001010110110', '100100111011', '010010011011',
    // 1430-1434
    '011001010101', '011010101001', '011101010100', '101101101010', '010101101100',
    // 1435-1439
    '101010101101', '010101010101', '101100101001', '101110010010', '101110101001',
    // 1440-1444
    '010111010100', '101011011010', '010101011010', '101010101011', '010110010101',
    // 1445-1449
    '011101001001', '011101100100', '101110101010', '010110110101', '001010110110',
    // 1450-1454
    '101001010110', '111001001101', '101100100101', '101101010010', '101101101010',
    // 1455-1459
    '010110101101', '001010101110', '100100101111', '010010010111', '011001001011',
    // 1460-1464
    '011010100101', '011010101100', '101011010110', '010101011101', '010010011101',
    // 1465-1469
    '101001001101', '110100010110', '110110010101', '010110101010', '010110110101',
    // 1470-1474
    '001011011010', '100101011011', '010010101101', '010110010101', '011011001010',
    // 1475-1479
    '011011100100', '101011101010', '010011110101', '001010110110', '100101010110',
    // 1480-1484
    '101010101010', '101101010100', '101111010010', '010111011001', '001011101010',
    // 1485-1489
    '100101101101', '010010101101', '101010010101', '101101001010', '101110100101',
    // 1490-1494
    '010110110010', '100110110101', '010011010110', '101010010111', '010101000111',
    // 1495-1499
    '011010010011', '011101001001', '101101010101', '010101101010', '101001101011',
    // 1500-1504
    '010100101011', '101010001011', '110101000110', '110110100011', '010111001010',
    // 1505-1509
    '101011010110', '010011011011', '001001101011', '100101001011', '101010100101',
    // 1510-1514
    '101101010010', '101101101001', '010101110101', '000101110110', '100010110111',
    // 1515-1519
    '001001011011', '010100101011', '010101100101', '010110110100', '100111011010',
    // 1520-1524
    '010011101101', '000101101101', '100010110110', '101010100110', '110101010010',
    // 1525-1529
    '110110101001', '010111010100', '101011011010', '100101011011', '010010101011',
    // 1530-1534
    '011001010011', '011100101001', '011101100010', '101110101001', '010110110010',
    // 1535-1539
    '101010110101', '010101010101', '101100100101', '110110010010', '111011001001',
    // 1540-1544
    '011011010010', '101011101001', '010101101011', '010010101011', '101001010101',
    // 1545-1549
    '110100101001', '110101010100', '110110101010', '100110110101', '010010111010',
    // 1550-1554
    '101000111011', '010010011011', '101001001101', '101010101010', '101011010101',
    // 1555-1559
    '001011011010', '100101011101', '010001011110', '101000101110', '110010011010',
    // 1560-1564
    '110101010101', '011010110010', '011010111001', '010010111010', '101001011101',
    // 1565-1569
    '010100101101', '101010010101', '101101010010', '101110101000', '101110110100',
    // 1570-1574
    '010110111001', '001011011010', '100101011010', '101101001010', '110110100100',
    // 1575-1579
    '111011010001', '011011101000', '101101101010', '010101101101', '010100110101',
    // 1580-1584
    '011010010101', '110101001010', '110110101000', '110111010100', '011011011010',
    // 1585-1589
    '010101011011', '001010011101', '011000101011', '101100010101', '101101001010',
    // 1590-1594
    '101110010101', '010110101010', '101010101110', '100100101110', '110010001111',
    // 1595-1599
    '010100100111', '011010010101', '011010101010', '101011010110', '010101011101',
    // 1600
    '001010011101'
];
/**
 * @param {?} date1
 * @param {?} date2
 * @return {?}
 */
function getDaysDiff(date1, date2) {
    /** @type {?} */
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.round(diff / ONE_DAY);
}
class NgbCalendarIslamicUmalqura extends NgbCalendarIslamicCivil {
    /**
     * Returns the equivalent islamic(Umalqura) date value for a give input Gregorian date.
     * `gdate` is s JS Date to be converted to Hijri.
     * @param {?} gDate
     * @return {?}
     */
    fromGregorian(gDate) {
        /** @type {?} */
        let hDay = 1;
        /** @type {?} */
        let hMonth = 0;
        /** @type {?} */
        let hYear = 1300;
        /** @type {?} */
        let daysDiff = getDaysDiff(gDate, GREGORIAN_FIRST_DATE);
        if (gDate.getTime() - GREGORIAN_FIRST_DATE.getTime() >= 0 && gDate.getTime() - GREGORIAN_LAST_DATE.getTime() <= 0) {
            /** @type {?} */
            let year = 1300;
            for (let i = 0; i < MONTH_LENGTH.length; i++, year++) {
                for (let j = 0; j < 12; j++) {
                    /** @type {?} */
                    let numOfDays = +MONTH_LENGTH[i][j] + 29;
                    if (daysDiff <= numOfDays) {
                        hDay = daysDiff + 1;
                        if (hDay > numOfDays) {
                            hDay = 1;
                            j++;
                        }
                        if (j > 11) {
                            j = 0;
                            year++;
                        }
                        hMonth = j;
                        hYear = year;
                        return new NgbDate(hYear, hMonth + 1, hDay);
                    }
                    daysDiff = daysDiff - numOfDays;
                }
            }
        }
        else {
            return super.fromGregorian(gDate);
        }
    }
    /**
     * Converts the current Hijri date to Gregorian.
     * @param {?} hDate
     * @return {?}
     */
    toGregorian(hDate) {
        /** @type {?} */
        const hYear = hDate.year;
        /** @type {?} */
        const hMonth = hDate.month - 1;
        /** @type {?} */
        const hDay = hDate.day;
        /** @type {?} */
        let gDate = new Date(GREGORIAN_FIRST_DATE);
        /** @type {?} */
        let dayDiff = hDay - 1;
        if (hYear >= HIJRI_BEGIN && hYear <= HIJRI_END) {
            for (let y = 0; y < hYear - HIJRI_BEGIN; y++) {
                for (let m = 0; m < 12; m++) {
                    dayDiff += +MONTH_LENGTH[y][m] + 29;
                }
            }
            for (let m = 0; m < hMonth; m++) {
                dayDiff += +MONTH_LENGTH[hYear - HIJRI_BEGIN][m] + 29;
            }
            gDate.setDate(GREGORIAN_FIRST_DATE.getDate() + dayDiff);
        }
        else {
            gDate = super.toGregorian(hDate);
        }
        return gDate;
    }
    /**
     * Returns the number of days in a specific Hijri hMonth.
     * `hMonth` is 1 for Muharram, 2 for Safar, etc.
     * `hYear` is any Hijri hYear.
     * @param {?} hMonth
     * @param {?} hYear
     * @return {?}
     */
    getDaysPerMonth(hMonth, hYear) {
        if (hYear >= HIJRI_BEGIN && hYear <= HIJRI_END) {
            /** @type {?} */
            const pos = hYear - HIJRI_BEGIN;
            return +MONTH_LENGTH[pos][hMonth - 1] + 29;
        }
        return super.getDaysPerMonth(hMonth, hYear);
    }
}
NgbCalendarIslamicUmalqura.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Returns the equivalent JS date value for a give input Jalali date.
 * `jalaliDate` is an Jalali date to be converted to Gregorian.
 * @param {?} jalaliDate
 * @return {?}
 */
function toGregorian(jalaliDate) {
    /** @type {?} */
    let jdn = jalaliToJulian(jalaliDate.year, jalaliDate.month, jalaliDate.day);
    /** @type {?} */
    let date = julianToGregorian(jdn);
    date.setHours(6, 30, 3, 200);
    return date;
}
/**
 * Returns the equivalent jalali date value for a give input Gregorian date.
 * `gdate` is a JS Date to be converted to jalali.
 * utc to local
 * @param {?} gdate
 * @return {?}
 */
function fromGregorian(gdate) {
    /** @type {?} */
    let g2d = gregorianToJulian(gdate.getFullYear(), gdate.getMonth() + 1, gdate.getDate());
    return julianToJalali(g2d);
}
/**
 * @param {?} date
 * @param {?} yearValue
 * @return {?}
 */
function setJalaliYear(date, yearValue) {
    date.year = +yearValue;
    return date;
}
/**
 * @param {?} date
 * @param {?} month
 * @return {?}
 */
function setJalaliMonth(date, month) {
    month = +month;
    date.year = date.year + Math.floor((month - 1) / 12);
    date.month = Math.floor(((month - 1) % 12 + 12) % 12) + 1;
    return date;
}
/**
 * @param {?} date
 * @param {?} day
 * @return {?}
 */
function setJalaliDay(date, day) {
    /** @type {?} */
    let mDays = getDaysPerMonth(date.month, date.year);
    if (day <= 0) {
        while (day <= 0) {
            date = setJalaliMonth(date, date.month - 1);
            mDays = getDaysPerMonth(date.month, date.year);
            day += mDays;
        }
    }
    else if (day > mDays) {
        while (day > mDays) {
            day -= mDays;
            date = setJalaliMonth(date, date.month + 1);
            mDays = getDaysPerMonth(date.month, date.year);
        }
    }
    date.day = day;
    return date;
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function mod$1(a, b) {
    return a - b * Math.floor(a / b);
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function div(a, b) {
    return Math.trunc(a / b);
}
/*
 This function determines if the Jalali (Persian) year is
 leap (366-day long) or is the common year (365 days), and
 finds the day in March (Gregorian calendar) of the first
 day of the Jalali year (jalaliYear).
 @param jalaliYear Jalali calendar year (-61 to 3177)
 @return
 leap: number of years since the last leap year (0 to 4)
 gYear: Gregorian year of the beginning of Jalali year
 march: the March day of Farvardin the 1st (1st day of jalaliYear)
 @see: http://www.astro.uni.torun.pl/~kb/Papers/EMP/PersianC-EMP.htm
 @see: http://www.fourmilab.ch/documents/calendar/
 */
/**
 * @param {?} jalaliYear
 * @return {?}
 */
function jalCal(jalaliYear) {
    // Jalali years starting the 33-year rule.
    /** @type {?} */
    let breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];
    /** @type {?} */
    const breaksLength = breaks.length;
    /** @type {?} */
    const gYear = jalaliYear + 621;
    /** @type {?} */
    let leapJ = -14;
    /** @type {?} */
    let jp = breaks[0];
    if (jalaliYear < jp || jalaliYear >= breaks[breaksLength - 1]) {
        throw new Error('Invalid Jalali year ' + jalaliYear);
    }
    // Find the limiting years for the Jalali year jalaliYear.
    /** @type {?} */
    let jump;
    for (let i = 1; i < breaksLength; i += 1) {
        /** @type {?} */
        const jm = breaks[i];
        jump = jm - jp;
        if (jalaliYear < jm) {
            break;
        }
        leapJ = leapJ + div(jump, 33) * 8 + div(mod$1(jump, 33), 4);
        jp = jm;
    }
    /** @type {?} */
    let n = jalaliYear - jp;
    // Find the number of leap years from AD 621 to the beginning
    // of the current Jalali year in the Persian calendar.
    leapJ = leapJ + div(n, 33) * 8 + div(mod$1(n, 33) + 3, 4);
    if (mod$1(jump, 33) === 4 && jump - n === 4) {
        leapJ += 1;
    }
    // And the same in the Gregorian calendar (until the year gYear).
    /** @type {?} */
    const leapG = div(gYear, 4) - div((div(gYear, 100) + 1) * 3, 4) - 150;
    // Determine the Gregorian date of Farvardin the 1st.
    /** @type {?} */
    const march = 20 + leapJ - leapG;
    // Find how many years have passed since the last leap year.
    if (jump - n < 6) {
        n = n - jump + div(jump + 4, 33) * 33;
    }
    /** @type {?} */
    let leap = mod$1(mod$1(n + 1, 33) - 1, 4);
    if (leap === -1) {
        leap = 4;
    }
    return { leap: leap, gy: gYear, march: march };
}
/*
 Calculates Gregorian and Julian calendar dates from the Julian Day number
 (jdn) for the period since jdn=-34839655 (i.e. the year -100100 of both
 calendars) to some millions years ahead of the present.
 @param jdn Julian Day number
 @return
 gYear: Calendar year (years BC numbered 0, -1, -2, ...)
 gMonth: Calendar month (1 to 12)
 gDay: Calendar day of the month M (1 to 28/29/30/31)
 */
/**
 * @param {?} julianDayNumber
 * @return {?}
 */
function julianToGregorian(julianDayNumber) {
    /** @type {?} */
    let j = 4 * julianDayNumber + 139361631;
    j = j + div(div(4 * julianDayNumber + 183187720, 146097) * 3, 4) * 4 - 3908;
    /** @type {?} */
    const i = div(mod$1(j, 1461), 4) * 5 + 308;
    /** @type {?} */
    const gDay = div(mod$1(i, 153), 5) + 1;
    /** @type {?} */
    const gMonth = mod$1(div(i, 153), 12) + 1;
    /** @type {?} */
    const gYear = div(j, 1461) - 100100 + div(8 - gMonth, 6);
    return new Date(gYear, gMonth - 1, gDay);
}
/*
 Converts a date of the Jalali calendar to the Julian Day number.
 @param jy Jalali year (1 to 3100)
 @param jm Jalali month (1 to 12)
 @param jd Jalali day (1 to 29/31)
 @return Julian Day number
 */
/**
 * @param {?} gy
 * @param {?} gm
 * @param {?} gd
 * @return {?}
 */
function gregorianToJulian(gy, gm, gd) {
    /** @type {?} */
    let d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod$1(gm + 9, 12) + 2, 5) + gd - 34840408;
    d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
    return d;
}
/*
 Converts the Julian Day number to a date in the Jalali calendar.
 @param julianDayNumber Julian Day number
 @return
 jalaliYear: Jalali year (1 to 3100)
 jalaliMonth: Jalali month (1 to 12)
 jalaliDay: Jalali day (1 to 29/31)
 */
/**
 * @param {?} julianDayNumber
 * @return {?}
 */
function julianToJalali(julianDayNumber) {
    /** @type {?} */
    let gy = julianToGregorian(julianDayNumber).getFullYear() // Calculate Gregorian year (gy).
    ;
    /** @type {?} */
    let jalaliYear = gy - 621;
    /** @type {?} */
    let r = jalCal(jalaliYear);
    /** @type {?} */
    let gregorianDay = gregorianToJulian(gy, 3, r.march);
    /** @type {?} */
    let jalaliDay;
    /** @type {?} */
    let jalaliMonth;
    /** @type {?} */
    let numberOfDays;
    // Find number of days that passed since 1 Farvardin.
    numberOfDays = julianDayNumber - gregorianDay;
    if (numberOfDays >= 0) {
        if (numberOfDays <= 185) {
            // The first 6 months.
            jalaliMonth = 1 + div(numberOfDays, 31);
            jalaliDay = mod$1(numberOfDays, 31) + 1;
            return new NgbDate(jalaliYear, jalaliMonth, jalaliDay);
        }
        else {
            // The remaining months.
            numberOfDays -= 186;
        }
    }
    else {
        // Previous Jalali year.
        jalaliYear -= 1;
        numberOfDays += 179;
        if (r.leap === 1) {
            numberOfDays += 1;
        }
    }
    jalaliMonth = 7 + div(numberOfDays, 30);
    jalaliDay = mod$1(numberOfDays, 30) + 1;
    return new NgbDate(jalaliYear, jalaliMonth, jalaliDay);
}
/*
 Converts a date of the Jalali calendar to the Julian Day number.
 @param jYear Jalali year (1 to 3100)
 @param jMonth Jalali month (1 to 12)
 @param jDay Jalali day (1 to 29/31)
 @return Julian Day number
 */
/**
 * @param {?} jYear
 * @param {?} jMonth
 * @param {?} jDay
 * @return {?}
 */
function jalaliToJulian(jYear, jMonth, jDay) {
    /** @type {?} */
    let r = jalCal(jYear);
    return gregorianToJulian(r.gy, 3, r.march) + (jMonth - 1) * 31 - div(jMonth, 7) * (jMonth - 7) + jDay - 1;
}
/**
 * Returns the number of days in a specific jalali month.
 * @param {?} month
 * @param {?} year
 * @return {?}
 */
function getDaysPerMonth(month, year) {
    if (month <= 6) {
        return 31;
    }
    if (month <= 11) {
        return 30;
    }
    if (jalCal(year).leap === 0) {
        return 30;
    }
    return 29;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbCalendarPersian extends NgbCalendar {
    /**
     * @return {?}
     */
    getDaysPerWeek() { return 7; }
    /**
     * @return {?}
     */
    getMonths() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }
    /**
     * @return {?}
     */
    getWeeksPerMonth() { return 6; }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getNext(date, period = 'd', number = 1) {
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date = setJalaliYear(date, date.year + number);
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = setJalaliMonth(date, date.month + number);
                date.day = 1;
                return date;
            case 'd':
                return setJalaliDay(date, date.day + number);
            default:
                return date;
        }
    }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getPrev(date, period = 'd', number = 1) { return this.getNext(date, period, -number); }
    /**
     * @param {?} date
     * @return {?}
     */
    getWeekday(date) {
        /** @type {?} */
        const day = toGregorian(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        /** @type {?} */
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        /** @type {?} */
        const date = week[thursdayIndex];
        /** @type {?} */
        const jsDate = toGregorian(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        // Thursday
        /** @type {?} */
        const time = jsDate.getTime();
        /** @type {?} */
        const startDate = toGregorian(new NgbDate(date.year, 1, 1));
        return Math.floor(Math.round((time - startDate.getTime()) / 86400000) / 7) + 1;
    }
    /**
     * @return {?}
     */
    getToday() { return fromGregorian(new Date()); }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        return date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day) &&
            !isNaN(toGregorian(date).getTime());
    }
}
NgbCalendarPersian.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const PARTS_PER_HOUR = 1080;
/** @type {?} */
const PARTS_PER_DAY = 24 * PARTS_PER_HOUR;
/** @type {?} */
const PARTS_FRACTIONAL_MONTH = 12 * PARTS_PER_HOUR + 793;
/** @type {?} */
const PARTS_PER_MONTH = 29 * PARTS_PER_DAY + PARTS_FRACTIONAL_MONTH;
/** @type {?} */
const BAHARAD = 11 * PARTS_PER_HOUR + 204;
/** @type {?} */
const HEBREW_DAY_ON_JAN_1_1970 = 2092591;
/** @type {?} */
const GREGORIAN_EPOCH$1 = 1721425.5;
/**
 * @param {?} year
 * @return {?}
 */
function isGregorianLeapYear$1(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
/**
 * @param {?} year
 * @return {?}
 */
function numberOfFirstDayInYear(year) {
    /** @type {?} */
    let monthsBeforeYear = Math.floor((235 * year - 234) / 19);
    /** @type {?} */
    let fractionalMonthsBeforeYear = monthsBeforeYear * PARTS_FRACTIONAL_MONTH + BAHARAD;
    /** @type {?} */
    let dayNumber = monthsBeforeYear * 29 + Math.floor(fractionalMonthsBeforeYear / PARTS_PER_DAY);
    /** @type {?} */
    let timeOfDay = fractionalMonthsBeforeYear % PARTS_PER_DAY;
    /** @type {?} */
    let dayOfWeek = dayNumber % 7;
    if (dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6) {
        dayNumber++;
        dayOfWeek = dayNumber % 7;
    }
    if (dayOfWeek === 1 && timeOfDay > 15 * PARTS_PER_HOUR + 204 && !isHebrewLeapYear(year)) {
        dayNumber += 2;
    }
    else if (dayOfWeek === 0 && timeOfDay > 21 * PARTS_PER_HOUR + 589 && isHebrewLeapYear(year - 1)) {
        dayNumber++;
    }
    return dayNumber;
}
/**
 * @param {?} month
 * @param {?} year
 * @return {?}
 */
function getDaysInGregorianMonth(month, year) {
    /** @type {?} */
    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (isGregorianLeapYear$1(year)) {
        days[1]++;
    }
    return days[month - 1];
}
/**
 * @param {?} year
 * @return {?}
 */
function getHebrewMonths(year) {
    return isHebrewLeapYear(year) ? 13 : 12;
}
/**
 * Returns the number of days in a specific Hebrew year.
 * `year` is any Hebrew year.
 * @param {?} year
 * @return {?}
 */
function getDaysInHebrewYear(year) {
    return numberOfFirstDayInYear(year + 1) - numberOfFirstDayInYear(year);
}
/**
 * @param {?} year
 * @return {?}
 */
function isHebrewLeapYear(year) {
    /** @type {?} */
    let b = (year * 12 + 17) % 19;
    return b >= ((b < 0) ? -7 : 12);
}
/**
 * Returns the number of days in a specific Hebrew month.
 * `month` is 1 for Nisan, 2 for Iyar etc. Note: Hebrew leap year contains 13 months.
 * `year` is any Hebrew year.
 * @param {?} month
 * @param {?} year
 * @return {?}
 */
function getDaysInHebrewMonth(month, year) {
    /** @type {?} */
    let yearLength = numberOfFirstDayInYear(year + 1) - numberOfFirstDayInYear(year);
    /** @type {?} */
    let yearType = (yearLength <= 380 ? yearLength : (yearLength - 30)) - 353;
    /** @type {?} */
    let leapYear = isHebrewLeapYear(year);
    /** @type {?} */
    let daysInMonth = leapYear ? [30, 29, 29, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29] :
        [30, 29, 29, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    if (yearType > 0) {
        daysInMonth[2]++; // Kislev gets an extra day in normal or complete years.
    }
    if (yearType > 1) {
        daysInMonth[1]++; // Heshvan gets an extra day in complete years only.
    }
    return daysInMonth[month - 1];
}
/**
 * @param {?} date
 * @return {?}
 */
function getDayNumberInHebrewYear(date) {
    /** @type {?} */
    let numberOfDay = 0;
    for (let i = 1; i < date.month; i++) {
        numberOfDay += getDaysInHebrewMonth(i, date.year);
    }
    return numberOfDay + date.day;
}
/**
 * @param {?} date
 * @param {?} val
 * @return {?}
 */
function setHebrewMonth(date, val) {
    /** @type {?} */
    let after = val >= 0;
    if (!after) {
        val = -val;
    }
    while (val > 0) {
        if (after) {
            if (val > getHebrewMonths(date.year) - date.month) {
                val -= getHebrewMonths(date.year) - date.month + 1;
                date.year++;
                date.month = 1;
            }
            else {
                date.month += val;
                val = 0;
            }
        }
        else {
            if (val >= date.month) {
                date.year--;
                val -= date.month;
                date.month = getHebrewMonths(date.year);
            }
            else {
                date.month -= val;
                val = 0;
            }
        }
    }
    return date;
}
/**
 * @param {?} date
 * @param {?} val
 * @return {?}
 */
function setHebrewDay(date, val) {
    /** @type {?} */
    let after = val >= 0;
    if (!after) {
        val = -val;
    }
    while (val > 0) {
        if (after) {
            if (val > getDaysInHebrewYear(date.year) - getDayNumberInHebrewYear(date)) {
                val -= getDaysInHebrewYear(date.year) - getDayNumberInHebrewYear(date) + 1;
                date.year++;
                date.month = 1;
                date.day = 1;
            }
            else if (val > getDaysInHebrewMonth(date.month, date.year) - date.day) {
                val -= getDaysInHebrewMonth(date.month, date.year) - date.day + 1;
                date.month++;
                date.day = 1;
            }
            else {
                date.day += val;
                val = 0;
            }
        }
        else {
            if (val >= date.day) {
                val -= date.day;
                date.month--;
                if (date.month === 0) {
                    date.year--;
                    date.month = getHebrewMonths(date.year);
                }
                date.day = getDaysInHebrewMonth(date.month, date.year);
            }
            else {
                date.day -= val;
                val = 0;
            }
        }
    }
    return date;
}
/**
 * Returns the equivalent Hebrew date value for a give input Gregorian date.
 * `gdate` is a JS Date to be converted to Hebrew date.
 * @param {?} gdate
 * @return {?}
 */
function fromGregorian$1(gdate) {
    /** @type {?} */
    const date = new Date(gdate);
    /** @type {?} */
    const gYear = date.getFullYear();
    /** @type {?} */
    const gMonth = date.getMonth();
    /** @type {?} */
    const gDay = date.getDate();
    /** @type {?} */
    let julianDay = GREGORIAN_EPOCH$1 - 1 + 365 * (gYear - 1) + Math.floor((gYear - 1) / 4) -
        Math.floor((gYear - 1) / 100) + Math.floor((gYear - 1) / 400) +
        Math.floor((367 * (gMonth + 1) - 362) / 12 + (gMonth + 1 <= 2 ? 0 : isGregorianLeapYear$1(gYear) ? -1 : -2) + gDay);
    julianDay = Math.floor(julianDay + 0.5);
    /** @type {?} */
    let daysSinceHebEpoch = julianDay - 347997;
    /** @type {?} */
    let monthsSinceHebEpoch = Math.floor(daysSinceHebEpoch * PARTS_PER_DAY / PARTS_PER_MONTH);
    /** @type {?} */
    let hYear = Math.floor((monthsSinceHebEpoch * 19 + 234) / 235) + 1;
    /** @type {?} */
    let firstDayOfThisYear = numberOfFirstDayInYear(hYear);
    /** @type {?} */
    let dayOfYear = daysSinceHebEpoch - firstDayOfThisYear;
    while (dayOfYear < 1) {
        hYear--;
        firstDayOfThisYear = numberOfFirstDayInYear(hYear);
        dayOfYear = daysSinceHebEpoch - firstDayOfThisYear;
    }
    /** @type {?} */
    let hMonth = 1;
    /** @type {?} */
    let hDay = dayOfYear;
    while (hDay > getDaysInHebrewMonth(hMonth, hYear)) {
        hDay -= getDaysInHebrewMonth(hMonth, hYear);
        hMonth++;
    }
    return new NgbDate(hYear, hMonth, hDay);
}
/**
 * Returns the equivalent JS date value for a given Hebrew date.
 * `hebrewDate` is an Hebrew date to be converted to Gregorian.
 * @param {?} hebrewDate
 * @return {?}
 */
function toGregorian$1(hebrewDate) {
    /** @type {?} */
    const hYear = hebrewDate.year;
    /** @type {?} */
    const hMonth = hebrewDate.month;
    /** @type {?} */
    const hDay = hebrewDate.day;
    /** @type {?} */
    let days = numberOfFirstDayInYear(hYear);
    for (let i = 1; i < hMonth; i++) {
        days += getDaysInHebrewMonth(i, hYear);
    }
    days += hDay;
    /** @type {?} */
    let diffDays = days - HEBREW_DAY_ON_JAN_1_1970;
    /** @type {?} */
    let after = diffDays >= 0;
    if (!after) {
        diffDays = -diffDays;
    }
    /** @type {?} */
    let gYear = 1970;
    /** @type {?} */
    let gMonth = 1;
    /** @type {?} */
    let gDay = 1;
    while (diffDays > 0) {
        if (after) {
            if (diffDays >= (isGregorianLeapYear$1(gYear) ? 366 : 365)) {
                diffDays -= isGregorianLeapYear$1(gYear) ? 366 : 365;
                gYear++;
            }
            else if (diffDays >= getDaysInGregorianMonth(gMonth, gYear)) {
                diffDays -= getDaysInGregorianMonth(gMonth, gYear);
                gMonth++;
            }
            else {
                gDay += diffDays;
                diffDays = 0;
            }
        }
        else {
            if (diffDays >= (isGregorianLeapYear$1(gYear - 1) ? 366 : 365)) {
                diffDays -= isGregorianLeapYear$1(gYear - 1) ? 366 : 365;
                gYear--;
            }
            else {
                if (gMonth > 1) {
                    gMonth--;
                }
                else {
                    gMonth = 12;
                    gYear--;
                }
                if (diffDays >= getDaysInGregorianMonth(gMonth, gYear)) {
                    diffDays -= getDaysInGregorianMonth(gMonth, gYear);
                }
                else {
                    gDay = getDaysInGregorianMonth(gMonth, gYear) - diffDays + 1;
                    diffDays = 0;
                }
            }
        }
    }
    return new Date(gYear, gMonth - 1, gDay);
}
/**
 * @param {?} numerals
 * @return {?}
 */
function hebrewNumerals(numerals) {
    if (!numerals) {
        return '';
    }
    /** @type {?} */
    const hArray0_9 = ['', '\u05d0', '\u05d1', '\u05d2', '\u05d3', '\u05d4', '\u05d5', '\u05d6', '\u05d7', '\u05d8'];
    /** @type {?} */
    const hArray10_19 = [
        '\u05d9', '\u05d9\u05d0', '\u05d9\u05d1', '\u05d9\u05d2', '\u05d9\u05d3', '\u05d8\u05d5', '\u05d8\u05d6',
        '\u05d9\u05d6', '\u05d9\u05d7', '\u05d9\u05d8'
    ];
    /** @type {?} */
    const hArray20_90 = ['', '', '\u05db', '\u05dc', '\u05de', '\u05e0', '\u05e1', '\u05e2', '\u05e4', '\u05e6'];
    /** @type {?} */
    const hArray100_900 = [
        '', '\u05e7', '\u05e8', '\u05e9', '\u05ea', '\u05ea\u05e7', '\u05ea\u05e8', '\u05ea\u05e9', '\u05ea\u05ea',
        '\u05ea\u05ea\u05e7'
    ];
    /** @type {?} */
    const hArray1000_9000 = [
        '', '\u05d0', '\u05d1', '\u05d1\u05d0', '\u05d1\u05d1', '\u05d4', '\u05d4\u05d0', '\u05d4\u05d1',
        '\u05d4\u05d1\u05d0', '\u05d4\u05d1\u05d1'
    ];
    /** @type {?} */
    const geresh = '\u05f3';
    /** @type {?} */
    const gershaim = '\u05f4';
    /** @type {?} */
    let mem = 0;
    /** @type {?} */
    let result = [];
    /** @type {?} */
    let step = 0;
    while (numerals > 0) {
        /** @type {?} */
        let m = numerals % 10;
        if (step === 0) {
            mem = m;
        }
        else if (step === 1) {
            if (m !== 1) {
                result.unshift(hArray20_90[m], hArray0_9[mem]);
            }
            else {
                result.unshift(hArray10_19[mem]);
            }
        }
        else if (step === 2) {
            result.unshift(hArray100_900[m]);
        }
        else {
            if (m !== 5) {
                result.unshift(hArray1000_9000[m], geresh, ' ');
            }
            break;
        }
        numerals = Math.floor(numerals / 10);
        if (step === 0 && numerals === 0) {
            result.unshift(hArray0_9[m]);
        }
        step++;
    }
    result = result.join('').split('');
    if (result.length === 1) {
        result.push(geresh);
    }
    else if (result.length > 1) {
        result.splice(result.length - 1, 0, gershaim);
    }
    return result.join('');
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * \@since 3.2.0
 */
class NgbCalendarHebrew extends NgbCalendar {
    /**
     * @return {?}
     */
    getDaysPerWeek() { return 7; }
    /**
     * @param {?=} year
     * @return {?}
     */
    getMonths(year) {
        if (year && isHebrewLeapYear(year)) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        }
        else {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }
    }
    /**
     * @return {?}
     */
    getWeeksPerMonth() { return 6; }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        /** @type {?} */
        let b = date && isNumber(date.year) && isNumber(date.month) && isNumber(date.day);
        b = b && date.month > 0 && date.month <= (isHebrewLeapYear(date.year) ? 13 : 12);
        b = b && date.day > 0 && date.day <= getDaysInHebrewMonth(date.month, date.year);
        return b && !isNaN(toGregorian$1(date).getTime());
    }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getNext(date, period = 'd', number = 1) {
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date.year += number;
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = setHebrewMonth(date, number);
                date.day = 1;
                return date;
            case 'd':
                return setHebrewDay(date, number);
            default:
                return date;
        }
    }
    /**
     * @param {?} date
     * @param {?=} period
     * @param {?=} number
     * @return {?}
     */
    getPrev(date, period = 'd', number = 1) { return this.getNext(date, period, -number); }
    /**
     * @param {?} date
     * @return {?}
     */
    getWeekday(date) {
        /** @type {?} */
        const day = toGregorian$1(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    /**
     * @param {?} week
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    getWeekNumber(week, firstDayOfWeek) {
        /** @type {?} */
        const date = week[week.length - 1];
        return Math.ceil(getDayNumberInHebrewYear(date) / 7);
    }
    /**
     * @return {?}
     */
    getToday() { return fromGregorian$1(new Date()); }
    /**
     * \@since 3.4.0
     * @param {?} date
     * @return {?}
     */
    toGregorian(date) { return fromJSDate(toGregorian$1(date)); }
    /**
     * \@since 3.4.0
     * @param {?} date
     * @return {?}
     */
    fromGregorian(date) { return fromGregorian$1(toJSDate(date)); }
}
NgbCalendarHebrew.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const WEEKDAYS = ['שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת', 'ראשון'];
/** @type {?} */
const MONTHS = ['תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר', 'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'];
/** @type {?} */
const MONTHS_LEAP = ['תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר א׳', 'אדר ב׳', 'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'];
/**
 * \@since 3.2.0
 */
class NgbDatepickerI18nHebrew extends NgbDatepickerI18n {
    /**
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    getMonthShortName(month, year) { return this.getMonthFullName(month, year); }
    /**
     * @param {?} month
     * @param {?=} year
     * @return {?}
     */
    getMonthFullName(month, year) {
        return isHebrewLeapYear(year) ? MONTHS_LEAP[month - 1] : MONTHS[month - 1];
    }
    /**
     * @param {?} weekday
     * @return {?}
     */
    getWeekdayShortName(weekday) { return WEEKDAYS[weekday - 1]; }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayAriaLabel(date) {
        return `${hebrewNumerals(date.day)} ${this.getMonthFullName(date.month, date.year)} ${hebrewNumerals(date.year)}`;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayNumerals(date) { return hebrewNumerals(date.day); }
    /**
     * @param {?} weekNumber
     * @return {?}
     */
    getWeekNumerals(weekNumber) { return hebrewNumerals(weekNumber); }
    /**
     * @param {?} year
     * @return {?}
     */
    getYearNumerals(year) { return hebrewNumerals(year); }
}
NgbDatepickerI18nHebrew.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * NgbDateAdapter implementation that allows using native javascript date as a user date model.
 */
class NgbDateNativeAdapter extends NgbDateAdapter {
    /**
     * Converts native date to a NgbDateStruct
     * @param {?} date
     * @return {?}
     */
    fromModel(date) {
        return (date instanceof Date && !isNaN(date.getTime())) ? this._fromNativeDate(date) : null;
    }
    /**
     * Converts a NgbDateStruct to a native date
     * @param {?} date
     * @return {?}
     */
    toModel(date) {
        return date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day) ? this._toNativeDate(date) :
            null;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    _fromNativeDate(date) {
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    _toNativeDate(date) {
        /** @type {?} */
        const jsDate = new Date(date.year, date.month - 1, date.day, 12);
        // avoid 30 -> 1930 conversion
        jsDate.setFullYear(date.year);
        return jsDate;
    }
}
NgbDateNativeAdapter.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * NgbDateAdapter implementation that allows using native javascript UTC date as a user date model.
 * Same as NgbDateNativeAdapter, but uses UTC dates.
 *
 * \@since 3.2.0
 */
class NgbDateNativeUTCAdapter extends NgbDateNativeAdapter {
    /**
     * @param {?} date
     * @return {?}
     */
    _fromNativeDate(date) {
        return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    _toNativeDate(date) {
        /** @type {?} */
        const jsDate = new Date(Date.UTC(date.year, date.month - 1, date.day));
        // avoid 30 -> 1930 conversion
        jsDate.setUTCFullYear(date.year);
        return jsDate;
    }
}
NgbDateNativeUTCAdapter.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbDatepickerModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbDatepickerModule }; }
}
NgbDatepickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    NgbDatepicker, NgbDatepickerMonthView, NgbDatepickerNavigation, NgbDatepickerNavigationSelect, NgbDatepickerDayView,
                    NgbInputDatepicker
                ],
                exports: [NgbDatepicker, NgbInputDatepicker],
                imports: [CommonModule, FormsModule],
                entryComponents: [NgbDatepicker]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbDropdown directive.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the dropdowns used in the application.
 */
class NgbDropdownConfig {
    constructor() {
        this.autoClose = true;
        this.placement = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
    }
}
NgbDropdownConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbDropdownConfig.ngInjectableDef = defineInjectable({ factory: function NgbDropdownConfig_Factory() { return new NgbDropdownConfig(); }, token: NgbDropdownConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A directive you should put put on a dropdown item to enable keyboard navigation.
 * Keyboard navigation using arrow keys will move focus between items marked with this directive.
 *
 * \@since 4.1.0
 */
class NgbDropdownItem {
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
/**
 *
 */
class NgbDropdownMenu {
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
/**
 * Marks an element to which dropdown menu will be anchored. This is a simple version
 * of the NgbDropdownToggle directive. It plays the same role as NgbDropdownToggle but
 * doesn't listen to click events to toggle dropdown menu thus enabling support for
 * events other than click.
 *
 * \@since 1.1.0
 */
class NgbDropdownAnchor {
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
/**
 * Allows the dropdown to be toggled via click. This directive is optional: you can use NgbDropdownAnchor as an
 * alternative.
 */
class NgbDropdownToggle extends NgbDropdownAnchor {
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
class NgbDropdown {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_DROPDOWN_DIRECTIVES = [NgbDropdown, NgbDropdownAnchor, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem];
class NgbDropdownModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbDropdownModule }; }
}
NgbDropdownModule.decorators = [
    { type: NgModule, args: [{ declarations: NGB_DROPDOWN_DIRECTIVES, exports: NGB_DROPDOWN_DIRECTIVES },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration object token for the NgbModal service.
 * You can provide this configuration, typically in your root module in order to provide default option values for every
 * modal.
 *
 * \@since 3.1.0
 */
class NgbModalConfig {
    constructor() {
        this.backdrop = true;
        this.keyboard = true;
    }
}
NgbModalConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbModalConfig.ngInjectableDef = defineInjectable({ factory: function NgbModalConfig_Factory() { return new NgbModalConfig(); }, token: NgbModalConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ContentRef {
    /**
     * @param {?} nodes
     * @param {?=} viewRef
     * @param {?=} componentRef
     */
    constructor(nodes, viewRef, componentRef) {
        this.nodes = nodes;
        this.viewRef = viewRef;
        this.componentRef = componentRef;
    }
}
/**
 * @template T
 */
class PopupService {
    /**
     * @param {?} _type
     * @param {?} _injector
     * @param {?} _viewContainerRef
     * @param {?} _renderer
     * @param {?} _componentFactoryResolver
     */
    constructor(_type, _injector, _viewContainerRef, _renderer, _componentFactoryResolver) {
        this._type = _type;
        this._injector = _injector;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._componentFactoryResolver = _componentFactoryResolver;
    }
    /**
     * @param {?=} content
     * @param {?=} context
     * @return {?}
     */
    open(content, context) {
        if (!this._windowRef) {
            this._contentRef = this._getContentRef(content, context);
            this._windowRef = this._viewContainerRef.createComponent(this._componentFactoryResolver.resolveComponentFactory(this._type), 0, this._injector, this._contentRef.nodes);
        }
        return this._windowRef;
    }
    /**
     * @return {?}
     */
    close() {
        if (this._windowRef) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._windowRef.hostView));
            this._windowRef = null;
            if (this._contentRef.viewRef) {
                this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
                this._contentRef = null;
            }
        }
    }
    /**
     * @param {?} content
     * @param {?=} context
     * @return {?}
     */
    _getContentRef(content, context) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            /** @type {?} */
            const viewRef = this._viewContainerRef.createEmbeddedView((/** @type {?} */ (content)), context);
            return new ContentRef([viewRef.rootNodes], viewRef);
        }
        else {
            return new ContentRef([[this._renderer.createText(`${content}`)]]);
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const noop = () => { };
/**
 * Utility to handle the scrollbar.
 *
 * It allows to compensate the lack of a vertical scrollbar by adding an
 * equivalent padding on the right of the body, and to remove this compensation.
 */
class ScrollBar {
    /**
     * @param {?} _document
     */
    constructor(_document) {
        this._document = _document;
    }
    /**
     * Detects if a scrollbar is present and if yes, already compensates for its
     * removal by adding an equivalent padding on the right of the body.
     *
     * @return {?} a callback used to revert the compensation (noop if there was none,
     * otherwise a function removing the padding)
     */
    compensate() { return !this._isPresent() ? noop : this._adjustBody(this._getWidth()); }
    /**
     * Adds a padding of the given width on the right of the body.
     *
     * @param {?} width
     * @return {?} a callback used to revert the padding to its previous value
     */
    _adjustBody(width) {
        /** @type {?} */
        const body = this._document.body;
        /** @type {?} */
        const userSetPadding = body.style.paddingRight;
        /** @type {?} */
        const paddingAmount = parseFloat(window.getComputedStyle(body)['padding-right']);
        body.style['padding-right'] = `${paddingAmount + width}px`;
        return () => body.style['padding-right'] = userSetPadding;
    }
    /**
     * Tells whether a scrollbar is currently present on the body.
     *
     * @return {?} true if scrollbar is present, false otherwise
     */
    _isPresent() {
        /** @type {?} */
        const rect = this._document.body.getBoundingClientRect();
        return rect.left + rect.right < window.innerWidth;
    }
    /**
     * Calculates and returns the width of a scrollbar.
     *
     * @return {?} the width of a scrollbar on this page
     */
    _getWidth() {
        /** @type {?} */
        const measurer = this._document.createElement('div');
        measurer.className = 'modal-scrollbar-measure';
        /** @type {?} */
        const body = this._document.body;
        body.appendChild(measurer);
        /** @type {?} */
        const width = measurer.getBoundingClientRect().width - measurer.clientWidth;
        body.removeChild(measurer);
        return width;
    }
}
ScrollBar.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
ScrollBar.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ ScrollBar.ngInjectableDef = defineInjectable({ factory: function ScrollBar_Factory() { return new ScrollBar(inject(DOCUMENT)); }, token: ScrollBar, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbModalBackdrop {
}
NgbModalBackdrop.decorators = [
    { type: Component, args: [{
                selector: 'ngb-modal-backdrop',
                template: '',
                host: { '[class]': '"modal-backdrop fade show" + (backdropClass ? " " + backdropClass : "")', 'style': 'z-index: 1050' }
            }] }
];
NgbModalBackdrop.propDecorators = {
    backdropClass: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A reference to an active (currently opened) modal. Instances of this class
 * can be injected into components passed as modal content.
 */
class NgbActiveModal {
    /**
     * Closes the modal with an optional 'result' value.
     * The 'NgbMobalRef.result' promise will be resolved with provided value.
     * @param {?=} result
     * @return {?}
     */
    close(result) { }
    /**
     * Dismisses the modal with an optional 'reason' value.
     * The 'NgbModalRef.result' promise will be rejected with provided value.
     * @param {?=} reason
     * @return {?}
     */
    dismiss(reason) { }
}
/**
 * A reference to a newly opened modal returned by the 'NgbModal.open()' method.
 */
class NgbModalRef {
    /**
     * @param {?} _windowCmptRef
     * @param {?} _contentRef
     * @param {?=} _backdropCmptRef
     * @param {?=} _beforeDismiss
     */
    constructor(_windowCmptRef, _contentRef, _backdropCmptRef, _beforeDismiss) {
        this._windowCmptRef = _windowCmptRef;
        this._contentRef = _contentRef;
        this._backdropCmptRef = _backdropCmptRef;
        this._beforeDismiss = _beforeDismiss;
        _windowCmptRef.instance.dismissEvent.subscribe((reason) => { this.dismiss(reason); });
        this.result = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
        this.result.then(null, () => { });
    }
    /**
     * The instance of component used as modal's content.
     * Undefined when a TemplateRef is used as modal's content.
     * @return {?}
     */
    get componentInstance() {
        if (this._contentRef.componentRef) {
            return this._contentRef.componentRef.instance;
        }
    }
    /**
     * Closes the modal with an optional 'result' value.
     * The 'NgbMobalRef.result' promise will be resolved with provided value.
     * @param {?=} result
     * @return {?}
     */
    close(result) {
        if (this._windowCmptRef) {
            this._resolve(result);
            this._removeModalElements();
        }
    }
    /**
     * @param {?=} reason
     * @return {?}
     */
    _dismiss(reason) {
        this._reject(reason);
        this._removeModalElements();
    }
    /**
     * Dismisses the modal with an optional 'reason' value.
     * The 'NgbModalRef.result' promise will be rejected with provided value.
     * @param {?=} reason
     * @return {?}
     */
    dismiss(reason) {
        if (this._windowCmptRef) {
            if (!this._beforeDismiss) {
                this._dismiss(reason);
            }
            else {
                /** @type {?} */
                const dismiss = this._beforeDismiss();
                if (dismiss && dismiss.then) {
                    dismiss.then(result => {
                        if (result !== false) {
                            this._dismiss(reason);
                        }
                    }, () => { });
                }
                else if (dismiss !== false) {
                    this._dismiss(reason);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    _removeModalElements() {
        /** @type {?} */
        const windowNativeEl = this._windowCmptRef.location.nativeElement;
        windowNativeEl.parentNode.removeChild(windowNativeEl);
        this._windowCmptRef.destroy();
        if (this._backdropCmptRef) {
            /** @type {?} */
            const backdropNativeEl = this._backdropCmptRef.location.nativeElement;
            backdropNativeEl.parentNode.removeChild(backdropNativeEl);
            this._backdropCmptRef.destroy();
        }
        if (this._contentRef && this._contentRef.viewRef) {
            this._contentRef.viewRef.destroy();
        }
        this._windowCmptRef = null;
        this._backdropCmptRef = null;
        this._contentRef = null;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {number} */
const ModalDismissReasons = {
    BACKDROP_CLICK: 0,
    ESC: 1,
};
ModalDismissReasons[ModalDismissReasons.BACKDROP_CLICK] = 'BACKDROP_CLICK';
ModalDismissReasons[ModalDismissReasons.ESC] = 'ESC';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbModalWindow {
    /**
     * @param {?} _document
     * @param {?} _elRef
     */
    constructor(_document, _elRef) {
        this._document = _document;
        this._elRef = _elRef;
        this.backdrop = true;
        this.keyboard = true;
        this.dismissEvent = new EventEmitter();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    backdropClick($event) {
        if (this.backdrop === true && this._elRef.nativeElement === $event.target) {
            this.dismiss(ModalDismissReasons.BACKDROP_CLICK);
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    escKey($event) {
        if (this.keyboard && !$event.defaultPrevented) {
            this.dismiss(ModalDismissReasons.ESC);
        }
    }
    /**
     * @param {?} reason
     * @return {?}
     */
    dismiss(reason) { this.dismissEvent.emit(reason); }
    /**
     * @return {?}
     */
    ngOnInit() { this._elWithFocus = this._document.activeElement; }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this._elRef.nativeElement.contains(document.activeElement)) {
            /** @type {?} */
            const autoFocusable = (/** @type {?} */ (this._elRef.nativeElement.querySelector(`[ngbAutofocus]`)));
            /** @type {?} */
            const firstFocusable = getFocusableBoundaryElements(this._elRef.nativeElement)[0];
            /** @type {?} */
            const elementToFocus = autoFocusable || firstFocusable || this._elRef.nativeElement;
            elementToFocus.focus();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        /** @type {?} */
        const body = this._document.body;
        /** @type {?} */
        const elWithFocus = this._elWithFocus;
        /** @type {?} */
        let elementToFocus;
        if (elWithFocus && elWithFocus['focus'] && body.contains(elWithFocus)) {
            elementToFocus = elWithFocus;
        }
        else {
            elementToFocus = body;
        }
        elementToFocus.focus();
        this._elWithFocus = null;
    }
}
NgbModalWindow.decorators = [
    { type: Component, args: [{
                selector: 'ngb-modal-window',
                host: {
                    '[class]': '"modal fade show d-block" + (windowClass ? " " + windowClass : "")',
                    'role': 'dialog',
                    'tabindex': '-1',
                    '(keyup.esc)': 'escKey($event)',
                    '(click)': 'backdropClick($event)',
                    '[attr.aria-modal]': 'true',
                    '[attr.aria-labelledby]': 'ariaLabelledBy',
                },
                template: `
    <div [class]="'modal-dialog' + (size ? ' modal-' + size : '') + (centered ? ' modal-dialog-centered' : '')" role="document">
        <div class="modal-content"><ng-content></ng-content></div>
    </div>
    `
            }] }
];
/** @nocollapse */
NgbModalWindow.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ElementRef }
];
NgbModalWindow.propDecorators = {
    ariaLabelledBy: [{ type: Input }],
    backdrop: [{ type: Input }],
    centered: [{ type: Input }],
    keyboard: [{ type: Input }],
    size: [{ type: Input }],
    windowClass: [{ type: Input }],
    dismissEvent: [{ type: Output, args: ['dismiss',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbModalStack {
    /**
     * @param {?} _applicationRef
     * @param {?} _injector
     * @param {?} _document
     * @param {?} _scrollBar
     * @param {?} _rendererFactory
     */
    constructor(_applicationRef, _injector, _document, _scrollBar, _rendererFactory) {
        this._applicationRef = _applicationRef;
        this._injector = _injector;
        this._document = _document;
        this._scrollBar = _scrollBar;
        this._rendererFactory = _rendererFactory;
        this._activeWindowCmptHasChanged = new Subject();
        this._ariaHiddenValues = new Map();
        this._backdropAttributes = ['backdropClass'];
        this._modalRefs = [];
        this._windowAttributes = ['ariaLabelledBy', 'backdrop', 'centered', 'keyboard', 'size', 'windowClass'];
        this._windowCmpts = [];
        // Trap focus on active WindowCmpt
        this._activeWindowCmptHasChanged.subscribe(() => {
            if (this._windowCmpts.length) {
                /** @type {?} */
                const activeWindowCmpt = this._windowCmpts[this._windowCmpts.length - 1];
                ngbFocusTrap(activeWindowCmpt.location.nativeElement, this._activeWindowCmptHasChanged);
                this._revertAriaHidden();
                this._setAriaHidden(activeWindowCmpt.location.nativeElement);
            }
        });
    }
    /**
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} options
     * @return {?}
     */
    open(moduleCFR, contentInjector, content, options) {
        /** @type {?} */
        const containerEl = isDefined(options.container) ? this._document.querySelector(options.container) : this._document.body;
        /** @type {?} */
        const renderer = this._rendererFactory.createRenderer(null, null);
        /** @type {?} */
        const revertPaddingForScrollBar = this._scrollBar.compensate();
        /** @type {?} */
        const removeBodyClass = () => {
            if (!this._modalRefs.length) {
                renderer.removeClass(this._document.body, 'modal-open');
                this._revertAriaHidden();
            }
        };
        if (!containerEl) {
            throw new Error(`The specified modal container "${options.container || 'body'}" was not found in the DOM.`);
        }
        /** @type {?} */
        const activeModal = new NgbActiveModal();
        /** @type {?} */
        const contentRef = this._getContentRef(moduleCFR, options.injector || contentInjector, content, activeModal);
        /** @type {?} */
        let backdropCmptRef = options.backdrop !== false ? this._attachBackdrop(moduleCFR, containerEl) : null;
        /** @type {?} */
        let windowCmptRef = this._attachWindowComponent(moduleCFR, containerEl, contentRef);
        /** @type {?} */
        let ngbModalRef = new NgbModalRef(windowCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);
        this._registerModalRef(ngbModalRef);
        this._registerWindowCmpt(windowCmptRef);
        ngbModalRef.result.then(revertPaddingForScrollBar, revertPaddingForScrollBar);
        ngbModalRef.result.then(removeBodyClass, removeBodyClass);
        activeModal.close = (result) => { ngbModalRef.close(result); };
        activeModal.dismiss = (reason) => { ngbModalRef.dismiss(reason); };
        this._applyWindowOptions(windowCmptRef.instance, options);
        if (this._modalRefs.length === 1) {
            renderer.addClass(this._document.body, 'modal-open');
        }
        if (backdropCmptRef && backdropCmptRef.instance) {
            this._applyBackdropOptions(backdropCmptRef.instance, options);
        }
        return ngbModalRef;
    }
    /**
     * @param {?=} reason
     * @return {?}
     */
    dismissAll(reason) { this._modalRefs.forEach(ngbModalRef => ngbModalRef.dismiss(reason)); }
    /**
     * @return {?}
     */
    hasOpenModals() { return this._modalRefs.length > 0; }
    /**
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @return {?}
     */
    _attachBackdrop(moduleCFR, containerEl) {
        /** @type {?} */
        let backdropFactory = moduleCFR.resolveComponentFactory(NgbModalBackdrop);
        /** @type {?} */
        let backdropCmptRef = backdropFactory.create(this._injector);
        this._applicationRef.attachView(backdropCmptRef.hostView);
        containerEl.appendChild(backdropCmptRef.location.nativeElement);
        return backdropCmptRef;
    }
    /**
     * @param {?} moduleCFR
     * @param {?} containerEl
     * @param {?} contentRef
     * @return {?}
     */
    _attachWindowComponent(moduleCFR, containerEl, contentRef) {
        /** @type {?} */
        let windowFactory = moduleCFR.resolveComponentFactory(NgbModalWindow);
        /** @type {?} */
        let windowCmptRef = windowFactory.create(this._injector, contentRef.nodes);
        this._applicationRef.attachView(windowCmptRef.hostView);
        containerEl.appendChild(windowCmptRef.location.nativeElement);
        return windowCmptRef;
    }
    /**
     * @param {?} windowInstance
     * @param {?} options
     * @return {?}
     */
    _applyWindowOptions(windowInstance, options) {
        this._windowAttributes.forEach((optionName) => {
            if (isDefined(options[optionName])) {
                windowInstance[optionName] = options[optionName];
            }
        });
    }
    /**
     * @param {?} backdropInstance
     * @param {?} options
     * @return {?}
     */
    _applyBackdropOptions(backdropInstance, options) {
        this._backdropAttributes.forEach((optionName) => {
            if (isDefined(options[optionName])) {
                backdropInstance[optionName] = options[optionName];
            }
        });
    }
    /**
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} activeModal
     * @return {?}
     */
    _getContentRef(moduleCFR, contentInjector, content, activeModal) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            return this._createFromTemplateRef(content, activeModal);
        }
        else if (isString(content)) {
            return this._createFromString(content);
        }
        else {
            return this._createFromComponent(moduleCFR, contentInjector, content, activeModal);
        }
    }
    /**
     * @param {?} content
     * @param {?} activeModal
     * @return {?}
     */
    _createFromTemplateRef(content, activeModal) {
        /** @type {?} */
        const context = {
            $implicit: activeModal,
            /**
             * @param {?} result
             * @return {?}
             */
            close(result) { activeModal.close(result); },
            /**
             * @param {?} reason
             * @return {?}
             */
            dismiss(reason) { activeModal.dismiss(reason); }
        };
        /** @type {?} */
        const viewRef = content.createEmbeddedView(context);
        this._applicationRef.attachView(viewRef);
        return new ContentRef([viewRef.rootNodes], viewRef);
    }
    /**
     * @param {?} content
     * @return {?}
     */
    _createFromString(content) {
        /** @type {?} */
        const component = this._document.createTextNode(`${content}`);
        return new ContentRef([[component]]);
    }
    /**
     * @param {?} moduleCFR
     * @param {?} contentInjector
     * @param {?} content
     * @param {?} context
     * @return {?}
     */
    _createFromComponent(moduleCFR, contentInjector, content, context) {
        /** @type {?} */
        const contentCmptFactory = moduleCFR.resolveComponentFactory(content);
        /** @type {?} */
        const modalContentInjector = Injector.create({ providers: [{ provide: NgbActiveModal, useValue: context }], parent: contentInjector });
        /** @type {?} */
        const componentRef = contentCmptFactory.create(modalContentInjector);
        this._applicationRef.attachView(componentRef.hostView);
        return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    _setAriaHidden(element) {
        /** @type {?} */
        const parent = element.parentElement;
        if (parent && element !== this._document.body) {
            Array.from(parent.children).forEach(sibling => {
                if (sibling !== element && sibling.nodeName !== 'SCRIPT') {
                    this._ariaHiddenValues.set(sibling, sibling.getAttribute('aria-hidden'));
                    sibling.setAttribute('aria-hidden', 'true');
                }
            });
            this._setAriaHidden(parent);
        }
    }
    /**
     * @return {?}
     */
    _revertAriaHidden() {
        this._ariaHiddenValues.forEach((value, element) => {
            if (value) {
                element.setAttribute('aria-hidden', value);
            }
            else {
                element.removeAttribute('aria-hidden');
            }
        });
        this._ariaHiddenValues.clear();
    }
    /**
     * @param {?} ngbModalRef
     * @return {?}
     */
    _registerModalRef(ngbModalRef) {
        /** @type {?} */
        const unregisterModalRef = () => {
            /** @type {?} */
            const index = this._modalRefs.indexOf(ngbModalRef);
            if (index > -1) {
                this._modalRefs.splice(index, 1);
            }
        };
        this._modalRefs.push(ngbModalRef);
        ngbModalRef.result.then(unregisterModalRef, unregisterModalRef);
    }
    /**
     * @param {?} ngbWindowCmpt
     * @return {?}
     */
    _registerWindowCmpt(ngbWindowCmpt) {
        this._windowCmpts.push(ngbWindowCmpt);
        this._activeWindowCmptHasChanged.next();
        ngbWindowCmpt.onDestroy(() => {
            /** @type {?} */
            const index = this._windowCmpts.indexOf(ngbWindowCmpt);
            if (index > -1) {
                this._windowCmpts.splice(index, 1);
                this._activeWindowCmptHasChanged.next();
            }
        });
    }
}
NgbModalStack.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
NgbModalStack.ctorParameters = () => [
    { type: ApplicationRef },
    { type: Injector },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ScrollBar },
    { type: RendererFactory2 }
];
/** @nocollapse */ NgbModalStack.ngInjectableDef = defineInjectable({ factory: function NgbModalStack_Factory() { return new NgbModalStack(inject(ApplicationRef), inject(INJECTOR), inject(DOCUMENT), inject(ScrollBar), inject(RendererFactory2)); }, token: NgbModalStack, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A service to open modal windows. Creating a modal is straightforward: create a template and pass it as an argument to
 * the "open" method!
 */
class NgbModal {
    /**
     * @param {?} _moduleCFR
     * @param {?} _injector
     * @param {?} _modalStack
     * @param {?} _config
     */
    constructor(_moduleCFR, _injector, _modalStack, _config) {
        this._moduleCFR = _moduleCFR;
        this._injector = _injector;
        this._modalStack = _modalStack;
        this._config = _config;
    }
    /**
     * Opens a new modal window with the specified content and using supplied options. Content can be provided
     * as a TemplateRef or a component type. If you pass a component type as content, then instances of those
     * components can be injected with an instance of the NgbActiveModal class. You can use methods on the
     * NgbActiveModal class to close / dismiss modals from "inside" of a component.
     * @param {?} content
     * @param {?=} options
     * @return {?}
     */
    open(content, options = {}) {
        /** @type {?} */
        const combinedOptions = Object.assign({}, this._config, options);
        return this._modalStack.open(this._moduleCFR, this._injector, content, combinedOptions);
    }
    /**
     * Dismiss all currently displayed modal windows with the supplied reason.
     *
     * \@since 3.1.0
     * @param {?=} reason
     * @return {?}
     */
    dismissAll(reason) { this._modalStack.dismissAll(reason); }
    /**
     * Indicates if there are currently any open modal windows in the application.
     *
     * \@since 3.3.0
     * @return {?}
     */
    hasOpenModals() { return this._modalStack.hasOpenModals(); }
}
NgbModal.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
NgbModal.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: NgbModalStack },
    { type: NgbModalConfig }
];
/** @nocollapse */ NgbModal.ngInjectableDef = defineInjectable({ factory: function NgbModal_Factory() { return new NgbModal(inject(ComponentFactoryResolver), inject(INJECTOR), inject(NgbModalStack), inject(NgbModalConfig)); }, token: NgbModal, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbModalModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbModalModule }; }
}
NgbModalModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgbModalBackdrop, NgbModalWindow],
                entryComponents: [NgbModalBackdrop, NgbModalWindow],
                providers: [NgbModal]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbPagination component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the paginations used in the application.
 */
class NgbPaginationConfig {
    constructor() {
        this.disabled = false;
        this.boundaryLinks = false;
        this.directionLinks = true;
        this.ellipses = true;
        this.maxSize = 0;
        this.pageSize = 10;
        this.rotate = false;
    }
}
NgbPaginationConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbPaginationConfig.ngInjectableDef = defineInjectable({ factory: function NgbPaginationConfig_Factory() { return new NgbPaginationConfig(); }, token: NgbPaginationConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * The directive to match the 'ellipsis' cell template
 *
 * \@since 4.1.0
 */
class NgbPaginationEllipsis {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationEllipsis.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPaginationEllipsis]' },] }
];
/** @nocollapse */
NgbPaginationEllipsis.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * The directive to match the 'first' cell template
 *
 * \@since 4.1.0
 */
class NgbPaginationFirst {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationFirst.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPaginationFirst]' },] }
];
/** @nocollapse */
NgbPaginationFirst.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * The directive to match the 'last' cell template
 *
 * \@since 4.1.0
 */
class NgbPaginationLast {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationLast.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPaginationLast]' },] }
];
/** @nocollapse */
NgbPaginationLast.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * The directive to match the 'next' cell template
 *
 * \@since 4.1.0
 */
class NgbPaginationNext {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationNext.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPaginationNext]' },] }
];
/** @nocollapse */
NgbPaginationNext.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * The directive to match the page 'number' cell template
 *
 * \@since 4.1.0
 */
class NgbPaginationNumber {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationNumber.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPaginationNumber]' },] }
];
/** @nocollapse */
NgbPaginationNumber.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * The directive to match the 'previous' cell template
 *
 * \@since 4.1.0
 */
class NgbPaginationPrevious {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationPrevious.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPaginationPrevious]' },] }
];
/** @nocollapse */
NgbPaginationPrevious.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * A component that displays page numbers and allows to customize them in several ways
 */
class NgbPagination {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.pageCount = 0;
        this.pages = [];
        /**
         *  Current page. Page numbers start with 1
         */
        this.page = 1;
        /**
         *  An event fired when the page is changed.
         *  Event's payload equals to the newly selected page.
         *  Will fire only if collection size is set and all values are valid.
         *  Page numbers start with 1
         */
        this.pageChange = new EventEmitter(true);
        this.disabled = config.disabled;
        this.boundaryLinks = config.boundaryLinks;
        this.directionLinks = config.directionLinks;
        this.ellipses = config.ellipses;
        this.maxSize = config.maxSize;
        this.pageSize = config.pageSize;
        this.rotate = config.rotate;
        this.size = config.size;
    }
    /**
     * @return {?}
     */
    hasPrevious() { return this.page > 1; }
    /**
     * @return {?}
     */
    hasNext() { return this.page < this.pageCount; }
    /**
     * @return {?}
     */
    nextDisabled() { return !this.hasNext() || this.disabled; }
    /**
     * @return {?}
     */
    previousDisabled() { return !this.hasPrevious() || this.disabled; }
    /**
     * @param {?} pageNumber
     * @return {?}
     */
    selectPage(pageNumber) { this._updatePages(pageNumber); }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) { this._updatePages(this.page); }
    /**
     * @param {?} pageNumber
     * @return {?}
     */
    isEllipsis(pageNumber) { return pageNumber === -1; }
    /**
     * Appends ellipses and first/last page number to the displayed pages
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    _applyEllipses(start, end) {
        if (this.ellipses) {
            if (start > 0) {
                if (start > 1) {
                    this.pages.unshift(-1);
                }
                this.pages.unshift(1);
            }
            if (end < this.pageCount) {
                if (end < (this.pageCount - 1)) {
                    this.pages.push(-1);
                }
                this.pages.push(this.pageCount);
            }
        }
    }
    /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     * @return {?}
     */
    _applyRotation() {
        /** @type {?} */
        let start = 0;
        /** @type {?} */
        let end = this.pageCount;
        /** @type {?} */
        let leftOffset = Math.floor(this.maxSize / 2);
        /** @type {?} */
        let rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
        if (this.page <= leftOffset) {
            // very beginning, no rotation -> [0..maxSize]
            end = this.maxSize;
        }
        else if (this.pageCount - this.page < leftOffset) {
            // very end, no rotation -> [len-maxSize..len]
            start = this.pageCount - this.maxSize;
        }
        else {
            // rotate
            start = this.page - leftOffset - 1;
            end = this.page + rightOffset;
        }
        return [start, end];
    }
    /**
     * Paginates page numbers based on maxSize items per page
     * @return {?}
     */
    _applyPagination() {
        /** @type {?} */
        let page = Math.ceil(this.page / this.maxSize) - 1;
        /** @type {?} */
        let start = page * this.maxSize;
        /** @type {?} */
        let end = start + this.maxSize;
        return [start, end];
    }
    /**
     * @param {?} newPageNo
     * @return {?}
     */
    _setPageInRange(newPageNo) {
        /** @type {?} */
        const prevPageNo = this.page;
        this.page = getValueInRange(newPageNo, this.pageCount, 1);
        if (this.page !== prevPageNo && isNumber(this.collectionSize)) {
            this.pageChange.emit(this.page);
        }
    }
    /**
     * @param {?} newPage
     * @return {?}
     */
    _updatePages(newPage) {
        this.pageCount = Math.ceil(this.collectionSize / this.pageSize);
        if (!isNumber(this.pageCount)) {
            this.pageCount = 0;
        }
        // fill-in model needed to render pages
        this.pages.length = 0;
        for (let i = 1; i <= this.pageCount; i++) {
            this.pages.push(i);
        }
        // set page within 1..max range
        this._setPageInRange(newPage);
        // apply maxSize if necessary
        if (this.maxSize > 0 && this.pageCount > this.maxSize) {
            /** @type {?} */
            let start = 0;
            /** @type {?} */
            let end = this.pageCount;
            // either paginating or rotating page numbers
            if (this.rotate) {
                [start, end] = this._applyRotation();
            }
            else {
                [start, end] = this._applyPagination();
            }
            this.pages = this.pages.slice(start, end);
            // adding ellipses
            this._applyEllipses(start, end);
        }
    }
}
NgbPagination.decorators = [
    { type: Component, args: [{
                selector: 'ngb-pagination',
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: { 'role': 'navigation' },
                template: `
    <ng-template #first><span aria-hidden="true" i18n="@@ngb.pagination.first">&laquo;&laquo;</span></ng-template>
    <ng-template #previous><span aria-hidden="true" i18n="@@ngb.pagination.previous">&laquo;</span></ng-template>
    <ng-template #next><span aria-hidden="true" i18n="@@ngb.pagination.next">&raquo;</span></ng-template>
    <ng-template #last><span aria-hidden="true" i18n="@@ngb.pagination.last">&raquo;&raquo;</span></ng-template>
    <ng-template #ellipsis>...</ng-template>
    <ng-template #defaultNumber let-page let-currentPage="currentPage">
      {{ page }}
      <span *ngIf="page === currentPage" class="sr-only">(current)</span>
    </ng-template>
    <ul [class]="'pagination' + (size ? ' pagination-' + size : '')">
      <li *ngIf="boundaryLinks" class="page-item"
        [class.disabled]="previousDisabled()">
        <a aria-label="First" i18n-aria-label="@@ngb.pagination.first-aria" class="page-link" href
          (click)="selectPage(1); $event.preventDefault()" [attr.tabindex]="(hasPrevious() ? null : '-1')">
          <ng-template [ngTemplateOutlet]="tplFirst?.templateRef || first"
                       [ngTemplateOutletContext]="{disabled: previousDisabled(), currentPage: page}"></ng-template>
        </a>
      </li>

      <li *ngIf="directionLinks" class="page-item"
        [class.disabled]="previousDisabled()">
        <a aria-label="Previous" i18n-aria-label="@@ngb.pagination.previous-aria" class="page-link" href
          (click)="selectPage(page-1); $event.preventDefault()" [attr.tabindex]="(hasPrevious() ? null : '-1')">
          <ng-template [ngTemplateOutlet]="tplPrevious?.templateRef || previous"
                       [ngTemplateOutletContext]="{disabled: previousDisabled()}"></ng-template>
        </a>
      </li>
      <li *ngFor="let pageNumber of pages" class="page-item" [class.active]="pageNumber === page"
        [class.disabled]="isEllipsis(pageNumber) || disabled">
        <a *ngIf="isEllipsis(pageNumber)" class="page-link">
          <ng-template [ngTemplateOutlet]="tplEllipsis?.templateRef || ellipsis"
                       [ngTemplateOutletContext]="{disabled: true, currentPage: page}"></ng-template>
        </a>
        <a *ngIf="!isEllipsis(pageNumber)" class="page-link" href (click)="selectPage(pageNumber); $event.preventDefault()">
          <ng-template [ngTemplateOutlet]="tplNumber?.templateRef || defaultNumber"
                       [ngTemplateOutletContext]="{disabled: disabled, $implicit: pageNumber, currentPage: page}"></ng-template>
        </a>
      </li>
      <li *ngIf="directionLinks" class="page-item" [class.disabled]="nextDisabled()">
        <a aria-label="Next" i18n-aria-label="@@ngb.pagination.next-aria" class="page-link" href
          (click)="selectPage(page+1); $event.preventDefault()" [attr.tabindex]="(hasNext() ? null : '-1')">
          <ng-template [ngTemplateOutlet]="tplNext?.templateRef || next"
                       [ngTemplateOutletContext]="{disabled: nextDisabled(), currentPage: page}"></ng-template>
        </a>
      </li>

      <li *ngIf="boundaryLinks" class="page-item" [class.disabled]="nextDisabled()">
        <a aria-label="Last" i18n-aria-label="@@ngb.pagination.last-aria" class="page-link" href
          (click)="selectPage(pageCount); $event.preventDefault()" [attr.tabindex]="(hasNext() ? null : '-1')">
          <ng-template [ngTemplateOutlet]="tplLast?.templateRef || last"
                       [ngTemplateOutletContext]="{disabled: nextDisabled(), currentPage: page}"></ng-template>
        </a>
      </li>
    </ul>
  `
            }] }
];
/** @nocollapse */
NgbPagination.ctorParameters = () => [
    { type: NgbPaginationConfig }
];
NgbPagination.propDecorators = {
    tplEllipsis: [{ type: ContentChild, args: [NgbPaginationEllipsis,] }],
    tplFirst: [{ type: ContentChild, args: [NgbPaginationFirst,] }],
    tplLast: [{ type: ContentChild, args: [NgbPaginationLast,] }],
    tplNext: [{ type: ContentChild, args: [NgbPaginationNext,] }],
    tplNumber: [{ type: ContentChild, args: [NgbPaginationNumber,] }],
    tplPrevious: [{ type: ContentChild, args: [NgbPaginationPrevious,] }],
    disabled: [{ type: Input }],
    boundaryLinks: [{ type: Input }],
    directionLinks: [{ type: Input }],
    ellipses: [{ type: Input }],
    rotate: [{ type: Input }],
    collectionSize: [{ type: Input }],
    maxSize: [{ type: Input }],
    page: [{ type: Input }],
    pageSize: [{ type: Input }],
    pageChange: [{ type: Output }],
    size: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const DIRECTIVES = [
    NgbPagination, NgbPaginationEllipsis, NgbPaginationFirst, NgbPaginationLast, NgbPaginationNext, NgbPaginationNumber,
    NgbPaginationPrevious
];
class NgbPaginationModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbPaginationModule }; }
}
NgbPaginationModule.decorators = [
    { type: NgModule, args: [{ declarations: DIRECTIVES, exports: DIRECTIVES, imports: [CommonModule] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class Trigger {
    /**
     * @param {?} open
     * @param {?=} close
     */
    constructor(open, close) {
        this.open = open;
        this.close = close;
        if (!close) {
            this.close = open;
        }
    }
    /**
     * @return {?}
     */
    isManual() { return this.open === 'manual' || this.close === 'manual'; }
}
/** @type {?} */
const DEFAULT_ALIASES = {
    'hover': ['mouseenter', 'mouseleave'],
    'focus': ['focusin', 'focusout'],
};
/**
 * @param {?} triggers
 * @param {?=} aliases
 * @return {?}
 */
function parseTriggers(triggers, aliases = DEFAULT_ALIASES) {
    /** @type {?} */
    const trimmedTriggers = (triggers || '').trim();
    if (trimmedTriggers.length === 0) {
        return [];
    }
    /** @type {?} */
    const parsedTriggers = trimmedTriggers.split(/\s+/).map(trigger => trigger.split(':')).map((triggerPair) => {
        /** @type {?} */
        let alias = aliases[triggerPair[0]] || triggerPair;
        return new Trigger(alias[0], alias[1]);
    });
    /** @type {?} */
    const manualTriggers = parsedTriggers.filter(triggerPair => triggerPair.isManual());
    if (manualTriggers.length > 1) {
        throw 'Triggers parse error: only one manual trigger is allowed';
    }
    if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
        throw 'Triggers parse error: manual trigger can\'t be mixed with other triggers';
    }
    return parsedTriggers;
}
/**
 * @param {?} renderer
 * @param {?} nativeElement
 * @param {?} triggers
 * @param {?} isOpenedFn
 * @return {?}
 */
function observeTriggers(renderer, nativeElement, triggers, isOpenedFn) {
    return new Observable(subscriber => {
        /** @type {?} */
        const listeners = [];
        /** @type {?} */
        const openFn = () => subscriber.next(true);
        /** @type {?} */
        const closeFn = () => subscriber.next(false);
        /** @type {?} */
        const toggleFn = () => subscriber.next(!isOpenedFn());
        triggers.forEach((trigger) => {
            if (trigger.open === trigger.close) {
                listeners.push(renderer.listen(nativeElement, trigger.open, toggleFn));
            }
            else {
                listeners.push(renderer.listen(nativeElement, trigger.open, openFn), renderer.listen(nativeElement, trigger.close, closeFn));
            }
        });
        return () => { listeners.forEach(unsubscribeFn => unsubscribeFn()); };
    });
}
/** @type {?} */
const delayOrNoop = (time) => time > 0 ? delay(time) : (a) => a;
/**
 * @param {?} openDelay
 * @param {?} closeDelay
 * @param {?} isOpenedFn
 * @return {?}
 */
function triggerDelay(openDelay, closeDelay, isOpenedFn) {
    return (input$) => {
        /** @type {?} */
        let pending = null;
        /** @type {?} */
        const filteredInput$ = input$.pipe(map(open => ({ open })), filter(event => {
            /** @type {?} */
            const currentlyOpen = isOpenedFn();
            if (currentlyOpen !== event.open && (!pending || pending.open === currentlyOpen)) {
                pending = event;
                return true;
            }
            if (pending && pending.open !== event.open) {
                pending = null;
            }
            return false;
        }), share());
        /** @type {?} */
        const delayedOpen$ = filteredInput$.pipe(filter(event => event.open), delayOrNoop(openDelay));
        /** @type {?} */
        const delayedClose$ = filteredInput$.pipe(filter(event => !event.open), delayOrNoop(closeDelay));
        return merge(delayedOpen$, delayedClose$)
            .pipe(filter(event => {
            if (event === pending) {
                pending = null;
                return event.open !== isOpenedFn();
            }
            return false;
        }), map(event => event.open));
    };
}
/**
 * @param {?} renderer
 * @param {?} nativeElement
 * @param {?} triggers
 * @param {?} isOpenedFn
 * @param {?} openFn
 * @param {?} closeFn
 * @param {?=} openDelay
 * @param {?=} closeDelay
 * @return {?}
 */
function listenToTriggers(renderer, nativeElement, triggers, isOpenedFn, openFn, closeFn, openDelay = 0, closeDelay = 0) {
    /** @type {?} */
    const parsedTriggers = parseTriggers(triggers);
    if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
        return () => { };
    }
    /** @type {?} */
    const subscription = observeTriggers(renderer, nativeElement, parsedTriggers, isOpenedFn)
        .pipe(triggerDelay(openDelay, closeDelay, isOpenedFn))
        .subscribe(open => (open ? openFn() : closeFn()));
    return () => subscription.unsubscribe();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbPopover directive.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the popovers used in the application.
 */
class NgbPopoverConfig {
    constructor() {
        this.autoClose = true;
        this.placement = 'auto';
        this.triggers = 'click';
        this.disablePopover = false;
        this.openDelay = 0;
        this.closeDelay = 0;
    }
}
NgbPopoverConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbPopoverConfig.ngInjectableDef = defineInjectable({ factory: function NgbPopoverConfig_Factory() { return new NgbPopoverConfig(); }, token: NgbPopoverConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
let nextId$3 = 0;
class NgbPopoverWindow {
    /**
     * @return {?}
     */
    isTitleTemplate() { return this.title instanceof TemplateRef; }
}
NgbPopoverWindow.decorators = [
    { type: Component, args: [{
                selector: 'ngb-popover-window',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: { '[class]': '"popover" + (popoverClass ? " " + popoverClass : "")', 'role': 'tooltip', '[id]': 'id' },
                template: `
    <div class="arrow"></div>
    <h3 class="popover-header" *ngIf="title != null">
      <ng-template #simpleTitle>{{title}}</ng-template>
      <ng-template [ngTemplateOutlet]="isTitleTemplate() ? title : simpleTitle" [ngTemplateOutletContext]="context"></ng-template>
    </h3>
    <div class="popover-body"><ng-content></ng-content></div>`,
                styles: ["ngb-popover-window.bs-popover-bottom .arrow,ngb-popover-window.bs-popover-top .arrow{left:50%;margin-left:-.5rem}ngb-popover-window.bs-popover-bottom-left .arrow,ngb-popover-window.bs-popover-top-left .arrow{left:2em}ngb-popover-window.bs-popover-bottom-right .arrow,ngb-popover-window.bs-popover-top-right .arrow{left:auto;right:2em}ngb-popover-window.bs-popover-left .arrow,ngb-popover-window.bs-popover-right .arrow{top:50%;margin-top:-.5rem}ngb-popover-window.bs-popover-left-top .arrow,ngb-popover-window.bs-popover-right-top .arrow{top:.7em}ngb-popover-window.bs-popover-left-bottom .arrow,ngb-popover-window.bs-popover-right-bottom .arrow{top:auto;bottom:.7em}"]
            }] }
];
NgbPopoverWindow.propDecorators = {
    title: [{ type: Input }],
    id: [{ type: Input }],
    popoverClass: [{ type: Input }],
    context: [{ type: Input }]
};
/**
 * A lightweight, extensible directive for fancy popover creation.
 */
class NgbPopover {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} injector
     * @param {?} componentFactoryResolver
     * @param {?} viewContainerRef
     * @param {?} config
     * @param {?} _ngZone
     * @param {?} _document
     * @param {?} _changeDetector
     */
    constructor(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, config, _ngZone, _document, _changeDetector) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._document = _document;
        this._changeDetector = _changeDetector;
        /**
         * Emits an event when the popover is shown
         */
        this.shown = new EventEmitter();
        /**
         * Emits an event when the popover is hidden
         */
        this.hidden = new EventEmitter();
        this._ngbPopoverWindowId = `ngb-popover-${nextId$3++}`;
        this.autoClose = config.autoClose;
        this.placement = config.placement;
        this.triggers = config.triggers;
        this.container = config.container;
        this.disablePopover = config.disablePopover;
        this.popoverClass = config.popoverClass;
        this.openDelay = config.openDelay;
        this.closeDelay = config.closeDelay;
        this._popupService = new PopupService(NgbPopoverWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);
        this._zoneSubscription = _ngZone.onStable.subscribe(() => {
            if (this._windowRef) {
                positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body', 'bs-popover');
            }
        });
    }
    /**
     * @return {?}
     */
    _isDisabled() {
        if (this.disablePopover) {
            return true;
        }
        if (!this.ngbPopover && !this.popoverTitle) {
            return true;
        }
        return false;
    }
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of the popover.
     * The context is an optional value to be injected into the popover template when it is created.
     * @param {?=} context
     * @return {?}
     */
    open(context) {
        if (!this._windowRef && !this._isDisabled()) {
            this._windowRef = this._popupService.open(this.ngbPopover, context);
            this._windowRef.instance.title = this.popoverTitle;
            this._windowRef.instance.context = context;
            this._windowRef.instance.popoverClass = this.popoverClass;
            this._windowRef.instance.id = this._ngbPopoverWindowId;
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbPopoverWindowId);
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            // apply styling to set basic css-classes on target element, before going for positioning
            this._windowRef.changeDetectorRef.markForCheck();
            ngbAutoClose(this._ngZone, this._document, this.autoClose, () => this.close(), this.hidden, [this._windowRef.location.nativeElement]);
            this.shown.emit();
        }
    }
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of the popover.
     * @return {?}
     */
    close() {
        if (this._windowRef) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
            this._popupService.close();
            this._windowRef = null;
            this.hidden.emit();
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of the popover.
     * @return {?}
     */
    toggle() {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Returns whether or not the popover is currently being shown
     * @return {?}
     */
    isOpen() { return this._windowRef != null; }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._unregisterListenersFn = listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this), this.close.bind(this), +this.openDelay, +this.closeDelay);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // close popover if title and content become empty, or disablePopover set to true
        if ((changes['ngbPopover'] || changes['popoverTitle'] || changes['disablePopover']) && this._isDisabled()) {
            this.close();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.close();
        // This check is needed as it might happen that ngOnDestroy is called before ngOnInit
        // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
        if (this._unregisterListenersFn) {
            this._unregisterListenersFn();
        }
        this._zoneSubscription.unsubscribe();
    }
}
NgbPopover.decorators = [
    { type: Directive, args: [{ selector: '[ngbPopover]', exportAs: 'ngbPopover' },] }
];
/** @nocollapse */
NgbPopover.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: Injector },
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef },
    { type: NgbPopoverConfig },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ChangeDetectorRef }
];
NgbPopover.propDecorators = {
    autoClose: [{ type: Input }],
    ngbPopover: [{ type: Input }],
    popoverTitle: [{ type: Input }],
    placement: [{ type: Input }],
    triggers: [{ type: Input }],
    container: [{ type: Input }],
    disablePopover: [{ type: Input }],
    popoverClass: [{ type: Input }],
    openDelay: [{ type: Input }],
    closeDelay: [{ type: Input }],
    shown: [{ type: Output }],
    hidden: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbPopoverModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbPopoverModule }; }
}
NgbPopoverModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgbPopover, NgbPopoverWindow],
                exports: [NgbPopover],
                imports: [CommonModule],
                entryComponents: [NgbPopoverWindow]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbProgressbar component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the progress bars used in the application.
 */
class NgbProgressbarConfig {
    constructor() {
        this.max = 100;
        this.animated = false;
        this.striped = false;
        this.showValue = false;
    }
}
NgbProgressbarConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbProgressbarConfig.ngInjectableDef = defineInjectable({ factory: function NgbProgressbarConfig_Factory() { return new NgbProgressbarConfig(); }, token: NgbProgressbarConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Directive that can be used to provide feedback on the progress of a workflow or an action.
 */
class NgbProgressbar {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbProgressbarModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbProgressbarModule }; }
}
NgbProgressbarModule.decorators = [
    { type: NgModule, args: [{ declarations: [NgbProgressbar], exports: [NgbProgressbar], imports: [CommonModule] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbRating component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the ratings used in the application.
 */
class NgbRatingConfig {
    constructor() {
        this.max = 10;
        this.readonly = false;
        this.resettable = false;
    }
}
NgbRatingConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbRatingConfig.ngInjectableDef = defineInjectable({ factory: function NgbRatingConfig_Factory() { return new NgbRatingConfig(); }, token: NgbRatingConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_RATING_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbRating),
    multi: true
};
/**
 * Rating directive that will take care of visualising a star rating bar.
 */
class NgbRating {
    /**
     * @param {?} config
     * @param {?} _changeDetectorRef
     */
    constructor(config, _changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this.contexts = [];
        this.disabled = false;
        /**
         * An event fired when a user is hovering over a given rating.
         * Event's payload equals to the rating being hovered over.
         */
        this.hover = new EventEmitter();
        /**
         * An event fired when a user stops hovering over a given rating.
         * Event's payload equals to the rating of the last item being hovered over.
         */
        this.leave = new EventEmitter();
        /**
         * An event fired when a user selects a new rating.
         * Event's payload equals to the newly selected rating.
         */
        this.rateChange = new EventEmitter(true);
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this.max = config.max;
        this.readonly = config.readonly;
    }
    /**
     * @return {?}
     */
    ariaValueText() { return `${this.nextRate} out of ${this.max}`; }
    /**
     * @param {?} value
     * @return {?}
     */
    enter(value) {
        if (!this.readonly && !this.disabled) {
            this._updateState(value);
        }
        this.hover.emit(value);
    }
    /**
     * @return {?}
     */
    handleBlur() { this.onTouched(); }
    /**
     * @param {?} value
     * @return {?}
     */
    handleClick(value) { this.update(this.resettable && this.rate === value ? 0 : value); }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeyDown(event) {
        // tslint:disable-next-line:deprecation
        switch (event.which) {
            case Key.ArrowDown:
            case Key.ArrowLeft:
                this.update(this.rate - 1);
                break;
            case Key.ArrowUp:
            case Key.ArrowRight:
                this.update(this.rate + 1);
                break;
            case Key.Home:
                this.update(0);
                break;
            case Key.End:
                this.update(this.max);
                break;
            default:
                return;
        }
        // note 'return' in default case
        event.preventDefault();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['rate']) {
            this.update(this.rate);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.contexts = Array.from({ length: this.max }, (v, k) => ({ fill: 0, index: k }));
        this._updateState(this.rate);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @return {?}
     */
    reset() {
        this.leave.emit(this.nextRate);
        this._updateState(this.rate);
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) { this.disabled = isDisabled; }
    /**
     * @param {?} value
     * @param {?=} internalChange
     * @return {?}
     */
    update(value, internalChange = true) {
        /** @type {?} */
        const newRate = getValueInRange(value, this.max, 0);
        if (!this.readonly && !this.disabled && this.rate !== newRate) {
            this.rate = newRate;
            this.rateChange.emit(this.rate);
        }
        if (internalChange) {
            this.onChange(this.rate);
            this.onTouched();
        }
        this._updateState(this.rate);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.update(value, false);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @param {?} index
     * @return {?}
     */
    _getFillValue(index) {
        /** @type {?} */
        const diff = this.nextRate - index;
        if (diff >= 1) {
            return 100;
        }
        if (diff < 1 && diff > 0) {
            return parseInt((diff * 100).toFixed(2), 10);
        }
        return 0;
    }
    /**
     * @param {?} nextValue
     * @return {?}
     */
    _updateState(nextValue) {
        this.nextRate = nextValue;
        this.contexts.forEach((context, index) => context.fill = this._getFillValue(index));
    }
}
NgbRating.decorators = [
    { type: Component, args: [{
                selector: 'ngb-rating',
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'class': 'd-inline-flex',
                    'tabindex': '0',
                    'role': 'slider',
                    'aria-valuemin': '0',
                    '[attr.aria-valuemax]': 'max',
                    '[attr.aria-valuenow]': 'nextRate',
                    '[attr.aria-valuetext]': 'ariaValueText()',
                    '[attr.aria-disabled]': 'readonly ? true : null',
                    '(blur)': 'handleBlur()',
                    '(keydown)': 'handleKeyDown($event)',
                    '(mouseleave)': 'reset()'
                },
                template: `
    <ng-template #t let-fill="fill">{{ fill === 100 ? '&#9733;' : '&#9734;' }}</ng-template>
    <ng-template ngFor [ngForOf]="contexts" let-index="index">
      <span class="sr-only">({{ index < nextRate ? '*' : ' ' }})</span>
      <span (mouseenter)="enter(index + 1)" (click)="handleClick(index + 1)" [style.cursor]="readonly || disabled ? 'default' : 'pointer'">
        <ng-template [ngTemplateOutlet]="starTemplate || starTemplateFromContent || t" [ngTemplateOutletContext]="contexts[index]">
        </ng-template>
      </span>
    </ng-template>
  `,
                providers: [NGB_RATING_VALUE_ACCESSOR]
            }] }
];
/** @nocollapse */
NgbRating.ctorParameters = () => [
    { type: NgbRatingConfig },
    { type: ChangeDetectorRef }
];
NgbRating.propDecorators = {
    max: [{ type: Input }],
    rate: [{ type: Input }],
    readonly: [{ type: Input }],
    resettable: [{ type: Input }],
    starTemplate: [{ type: Input }],
    starTemplateFromContent: [{ type: ContentChild, args: [TemplateRef,] }],
    hover: [{ type: Output }],
    leave: [{ type: Output }],
    rateChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbRatingModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbRatingModule }; }
}
NgbRatingModule.decorators = [
    { type: NgModule, args: [{ declarations: [NgbRating], exports: [NgbRating], imports: [CommonModule] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbTabset component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tabsets used in the application.
 */
class NgbTabsetConfig {
    constructor() {
        this.justify = 'start';
        this.orientation = 'horizontal';
        this.type = 'tabs';
    }
}
NgbTabsetConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbTabsetConfig.ngInjectableDef = defineInjectable({ factory: function NgbTabsetConfig_Factory() { return new NgbTabsetConfig(); }, token: NgbTabsetConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
let nextId$4 = 0;
/**
 * This directive should be used to wrap tab titles that need to contain HTML markup or other directives.
 */
class NgbTabTitle {
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
/**
 * This directive must be used to wrap content to be displayed in a tab.
 */
class NgbTabContent {
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
/**
 * A directive representing an individual tab.
 */
class NgbTab {
    constructor() {
        /**
         * Unique tab identifier. Must be unique for the entire document for proper accessibility support.
         */
        this.id = `ngb-tab-${nextId$4++}`;
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
/**
 * A component that makes it easy to create tabbed interface.
 */
class NgbTabset {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_TABSET_DIRECTIVES = [NgbTabset, NgbTab, NgbTabContent, NgbTabTitle];
class NgbTabsetModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbTabsetModule }; }
}
NgbTabsetModule.decorators = [
    { type: NgModule, args: [{ declarations: NGB_TABSET_DIRECTIVES, exports: NGB_TABSET_DIRECTIVES, imports: [CommonModule] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbTime {
    /**
     * @param {?=} hour
     * @param {?=} minute
     * @param {?=} second
     */
    constructor(hour, minute, second) {
        this.hour = toInteger(hour);
        this.minute = toInteger(minute);
        this.second = toInteger(second);
    }
    /**
     * @param {?=} step
     * @return {?}
     */
    changeHour(step = 1) { this.updateHour((isNaN(this.hour) ? 0 : this.hour) + step); }
    /**
     * @param {?} hour
     * @return {?}
     */
    updateHour(hour) {
        if (isNumber(hour)) {
            this.hour = (hour < 0 ? 24 + hour : hour) % 24;
        }
        else {
            this.hour = NaN;
        }
    }
    /**
     * @param {?=} step
     * @return {?}
     */
    changeMinute(step = 1) { this.updateMinute((isNaN(this.minute) ? 0 : this.minute) + step); }
    /**
     * @param {?} minute
     * @return {?}
     */
    updateMinute(minute) {
        if (isNumber(minute)) {
            this.minute = minute % 60 < 0 ? 60 + minute % 60 : minute % 60;
            this.changeHour(Math.floor(minute / 60));
        }
        else {
            this.minute = NaN;
        }
    }
    /**
     * @param {?=} step
     * @return {?}
     */
    changeSecond(step = 1) { this.updateSecond((isNaN(this.second) ? 0 : this.second) + step); }
    /**
     * @param {?} second
     * @return {?}
     */
    updateSecond(second) {
        if (isNumber(second)) {
            this.second = second < 0 ? 60 + second % 60 : second % 60;
            this.changeMinute(Math.floor(second / 60));
        }
        else {
            this.second = NaN;
        }
    }
    /**
     * @param {?=} checkSecs
     * @return {?}
     */
    isValid(checkSecs = true) {
        return isNumber(this.hour) && isNumber(this.minute) && (checkSecs ? isNumber(this.second) : true);
    }
    /**
     * @return {?}
     */
    toString() { return `${this.hour || 0}:${this.minute || 0}:${this.second || 0}`; }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbTimepicker component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the timepickers used in the application.
 */
class NgbTimepickerConfig {
    constructor() {
        this.meridian = false;
        this.spinners = true;
        this.seconds = false;
        this.hourStep = 1;
        this.minuteStep = 1;
        this.secondStep = 1;
        this.disabled = false;
        this.readonlyInputs = false;
        this.size = 'medium';
    }
}
NgbTimepickerConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbTimepickerConfig.ngInjectableDef = defineInjectable({ factory: function NgbTimepickerConfig_Factory() { return new NgbTimepickerConfig(); }, token: NgbTimepickerConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function NGB_DATEPICKER_TIME_ADAPTER_FACTORY() {
    return new NgbTimeStructAdapter();
}
/**
 * Abstract type serving as a DI token for the service converting from your application Time model to internal
 * NgbTimeStruct model.
 * A default implementation converting from and to NgbTimeStruct is provided for retro-compatibility,
 * but you can provide another implementation to use an alternative format, ie for using with native Date Object.
 *
 * \@since 2.2.0
 * @abstract
 * @template T
 */
class NgbTimeAdapter {
}
NgbTimeAdapter.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY },] }
];
/** @nocollapse */ NgbTimeAdapter.ngInjectableDef = defineInjectable({ factory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY, token: NgbTimeAdapter, providedIn: "root" });
class NgbTimeStructAdapter extends NgbTimeAdapter {
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     * @param {?} time
     * @return {?}
     */
    fromModel(time) {
        return (time && isInteger(time.hour) && isInteger(time.minute)) ?
            { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null } :
            null;
    }
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     * @param {?} time
     * @return {?}
     */
    toModel(time) {
        return (time && isInteger(time.hour) && isInteger(time.minute)) ?
            { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null } :
            null;
    }
}
NgbTimeStructAdapter.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_TIMEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbTimepicker),
    multi: true
};
/**
 * A lightweight & configurable timepicker directive.
 */
class NgbTimepicker {
    /**
     * @param {?} _config
     * @param {?} _ngbTimeAdapter
     * @param {?} _cd
     */
    constructor(_config, _ngbTimeAdapter, _cd) {
        this._config = _config;
        this._ngbTimeAdapter = _ngbTimeAdapter;
        this._cd = _cd;
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this.meridian = _config.meridian;
        this.spinners = _config.spinners;
        this.seconds = _config.seconds;
        this.hourStep = _config.hourStep;
        this.minuteStep = _config.minuteStep;
        this.secondStep = _config.secondStep;
        this.disabled = _config.disabled;
        this.readonlyInputs = _config.readonlyInputs;
        this.size = _config.size;
    }
    /**
     * Number of hours to increase or decrease when using a button.
     * @param {?} step
     * @return {?}
     */
    set hourStep(step) {
        this._hourStep = isInteger(step) ? step : this._config.hourStep;
    }
    /**
     * @return {?}
     */
    get hourStep() { return this._hourStep; }
    /**
     * Number of minutes to increase or decrease when using a button.
     * @param {?} step
     * @return {?}
     */
    set minuteStep(step) {
        this._minuteStep = isInteger(step) ? step : this._config.minuteStep;
    }
    /**
     * @return {?}
     */
    get minuteStep() { return this._minuteStep; }
    /**
     * Number of seconds to increase or decrease when using a button.
     * @param {?} step
     * @return {?}
     */
    set secondStep(step) {
        this._secondStep = isInteger(step) ? step : this._config.secondStep;
    }
    /**
     * @return {?}
     */
    get secondStep() { return this._secondStep; }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        /** @type {?} */
        const structValue = this._ngbTimeAdapter.fromModel(value);
        this.model = structValue ? new NgbTime(structValue.hour, structValue.minute, structValue.second) : new NgbTime();
        if (!this.seconds && (!structValue || !isNumber(structValue.second))) {
            this.model.second = 0;
        }
        this._cd.markForCheck();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this.onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this.onTouched = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) { this.disabled = isDisabled; }
    /**
     * @param {?} step
     * @return {?}
     */
    changeHour(step) {
        this.model.changeHour(step);
        this.propagateModelChange();
    }
    /**
     * @param {?} step
     * @return {?}
     */
    changeMinute(step) {
        this.model.changeMinute(step);
        this.propagateModelChange();
    }
    /**
     * @param {?} step
     * @return {?}
     */
    changeSecond(step) {
        this.model.changeSecond(step);
        this.propagateModelChange();
    }
    /**
     * @param {?} newVal
     * @return {?}
     */
    updateHour(newVal) {
        /** @type {?} */
        const isPM = this.model.hour >= 12;
        /** @type {?} */
        const enteredHour = toInteger(newVal);
        if (this.meridian && (isPM && enteredHour < 12 || !isPM && enteredHour === 12)) {
            this.model.updateHour(enteredHour + 12);
        }
        else {
            this.model.updateHour(enteredHour);
        }
        this.propagateModelChange();
    }
    /**
     * @param {?} newVal
     * @return {?}
     */
    updateMinute(newVal) {
        this.model.updateMinute(toInteger(newVal));
        this.propagateModelChange();
    }
    /**
     * @param {?} newVal
     * @return {?}
     */
    updateSecond(newVal) {
        this.model.updateSecond(toInteger(newVal));
        this.propagateModelChange();
    }
    /**
     * @return {?}
     */
    toggleMeridian() {
        if (this.meridian) {
            this.changeHour(12);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    formatHour(value) {
        if (isNumber(value)) {
            if (this.meridian) {
                return padNumber(value % 12 === 0 ? 12 : value % 12);
            }
            else {
                return padNumber(value % 24);
            }
        }
        else {
            return padNumber(NaN);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    formatMinSec(value) { return padNumber(value); }
    /**
     * @return {?}
     */
    get isSmallSize() { return this.size === 'small'; }
    /**
     * @return {?}
     */
    get isLargeSize() { return this.size === 'large'; }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['seconds'] && !this.seconds && this.model && !isNumber(this.model.second)) {
            this.model.second = 0;
            this.propagateModelChange(false);
        }
    }
    /**
     * @param {?=} touched
     * @return {?}
     */
    propagateModelChange(touched = true) {
        if (touched) {
            this.onTouched();
        }
        if (this.model.isValid(this.seconds)) {
            this.onChange(this._ngbTimeAdapter.toModel({ hour: this.model.hour, minute: this.model.minute, second: this.model.second }));
        }
        else {
            this.onChange(this._ngbTimeAdapter.toModel(null));
        }
    }
}
NgbTimepicker.decorators = [
    { type: Component, args: [{
                selector: 'ngb-timepicker',
                encapsulation: ViewEncapsulation.None,
                template: `
    <fieldset [disabled]="disabled" [class.disabled]="disabled">
      <div class="ngb-tp">
        <div class="ngb-tp-input-container ngb-tp-hour">
          <button *ngIf="spinners" type="button" (click)="changeHour(hourStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron ngb-tp-chevron"></span>
            <span class="sr-only" i18n="@@ngb.timepicker.increment-hours">Increment hours</span>
          </button>
          <input type="text" class="ngb-tp-input form-control" [class.form-control-sm]="isSmallSize" [class.form-control-lg]="isLargeSize"
            maxlength="2" placeholder="HH" i18n-placeholder="@@ngb.timepicker.HH"
            [value]="formatHour(model?.hour)" (change)="updateHour($event.target.value)"
            [readonly]="readonlyInputs" [disabled]="disabled" aria-label="Hours" i18n-aria-label="@@ngb.timepicker.hours"
            (keydown.ArrowUp)="changeHour(hourStep)" (keydown.ArrowDown)="changeHour(-hourStep)">
          <button *ngIf="spinners" type="button" (click)="changeHour(-hourStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron ngb-tp-chevron bottom"></span>
            <span class="sr-only" i18n="@@ngb.timepicker.decrement-hours">Decrement hours</span>
          </button>
        </div>
        <div class="ngb-tp-spacer">:</div>
        <div class="ngb-tp-input-container ngb-tp-minute">
          <button *ngIf="spinners" type="button" (click)="changeMinute(minuteStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron ngb-tp-chevron"></span>
            <span class="sr-only" i18n="@@ngb.timepicker.increment-minutes">Increment minutes</span>
          </button>
          <input type="text" class="ngb-tp-input form-control" [class.form-control-sm]="isSmallSize" [class.form-control-lg]="isLargeSize"
            maxlength="2" placeholder="MM" i18n-placeholder="@@ngb.timepicker.MM"
            [value]="formatMinSec(model?.minute)" (change)="updateMinute($event.target.value)"
            [readonly]="readonlyInputs" [disabled]="disabled" aria-label="Minutes" i18n-aria-label="@@ngb.timepicker.minutes"
            (keydown.ArrowUp)="changeMinute(minuteStep)" (keydown.ArrowDown)="changeMinute(-minuteStep)">
          <button *ngIf="spinners" type="button" (click)="changeMinute(-minuteStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize"  [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron ngb-tp-chevron bottom"></span>
            <span class="sr-only"  i18n="@@ngb.timepicker.decrement-minutes">Decrement minutes</span>
          </button>
        </div>
        <div *ngIf="seconds" class="ngb-tp-spacer">:</div>
        <div *ngIf="seconds" class="ngb-tp-input-container ngb-tp-second">
          <button *ngIf="spinners" type="button" (click)="changeSecond(secondStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron ngb-tp-chevron"></span>
            <span class="sr-only" i18n="@@ngb.timepicker.increment-seconds">Increment seconds</span>
          </button>
          <input type="text" class="ngb-tp-input form-control" [class.form-control-sm]="isSmallSize" [class.form-control-lg]="isLargeSize"
            maxlength="2" placeholder="SS" i18n-placeholder="@@ngb.timepicker.SS"
            [value]="formatMinSec(model?.second)" (change)="updateSecond($event.target.value)"
            [readonly]="readonlyInputs" [disabled]="disabled" aria-label="Seconds" i18n-aria-label="@@ngb.timepicker.seconds"
            (keydown.ArrowUp)="changeSecond(secondStep)" (keydown.ArrowDown)="changeSecond(-secondStep)">
          <button *ngIf="spinners" type="button" (click)="changeSecond(-secondStep)"
            class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize"  [class.disabled]="disabled"
            [disabled]="disabled">
            <span class="chevron ngb-tp-chevron bottom"></span>
            <span class="sr-only" i18n="@@ngb.timepicker.decrement-seconds">Decrement seconds</span>
          </button>
        </div>
        <div *ngIf="meridian" class="ngb-tp-spacer"></div>
        <div *ngIf="meridian" class="ngb-tp-meridian">
          <button type="button" class="btn btn-outline-primary" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize"
            [disabled]="disabled" [class.disabled]="disabled"
                  (click)="toggleMeridian()">
            <ng-container *ngIf="model?.hour >= 12; else am" i18n="@@ngb.timepicker.PM">PM</ng-container>
            <ng-template #am i18n="@@ngb.timepicker.AM">AM</ng-template>
          </button>
        </div>
      </div>
    </fieldset>
  `,
                providers: [NGB_TIMEPICKER_VALUE_ACCESSOR],
                styles: ["ngb-timepicker{font-size:1rem}.ngb-tp{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.ngb-tp-input-container{width:4em}.ngb-tp-chevron::before{border-style:solid;border-width:.29em .29em 0 0;content:'';display:inline-block;height:.69em;left:.05em;position:relative;top:.15em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);vertical-align:middle;width:.69em}.ngb-tp-chevron.bottom:before{top:-.3em;-webkit-transform:rotate(135deg);transform:rotate(135deg)}.ngb-tp-input{text-align:center}.ngb-tp-hour,.ngb-tp-meridian,.ngb-tp-minute,.ngb-tp-second{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around}.ngb-tp-spacer{width:1em;text-align:center}"]
            }] }
];
/** @nocollapse */
NgbTimepicker.ctorParameters = () => [
    { type: NgbTimepickerConfig },
    { type: NgbTimeAdapter },
    { type: ChangeDetectorRef }
];
NgbTimepicker.propDecorators = {
    meridian: [{ type: Input }],
    spinners: [{ type: Input }],
    seconds: [{ type: Input }],
    hourStep: [{ type: Input }],
    minuteStep: [{ type: Input }],
    secondStep: [{ type: Input }],
    readonlyInputs: [{ type: Input }],
    size: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbTimepickerModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbTimepickerModule }; }
}
NgbTimepickerModule.decorators = [
    { type: NgModule, args: [{ declarations: [NgbTimepicker], exports: [NgbTimepicker], imports: [CommonModule] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbTooltip directive.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tooltips used in the application.
 */
class NgbTooltipConfig {
    constructor() {
        this.autoClose = true;
        this.placement = 'auto';
        this.triggers = 'hover focus';
        this.disableTooltip = false;
        this.openDelay = 0;
        this.closeDelay = 0;
    }
}
NgbTooltipConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbTooltipConfig.ngInjectableDef = defineInjectable({ factory: function NgbTooltipConfig_Factory() { return new NgbTooltipConfig(); }, token: NgbTooltipConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
let nextId$5 = 0;
class NgbTooltipWindow {
}
NgbTooltipWindow.decorators = [
    { type: Component, args: [{
                selector: 'ngb-tooltip-window',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: { '[class]': '"tooltip show" + (tooltipClass ? " " + tooltipClass : "")', 'role': 'tooltip', '[id]': 'id' },
                template: `<div class="arrow"></div><div class="tooltip-inner"><ng-content></ng-content></div>`,
                styles: ["ngb-tooltip-window.bs-tooltip-bottom .arrow,ngb-tooltip-window.bs-tooltip-top .arrow{left:calc(50% - .4rem)}ngb-tooltip-window.bs-tooltip-bottom-left .arrow,ngb-tooltip-window.bs-tooltip-top-left .arrow{left:1em}ngb-tooltip-window.bs-tooltip-bottom-right .arrow,ngb-tooltip-window.bs-tooltip-top-right .arrow{left:auto;right:.8rem}ngb-tooltip-window.bs-tooltip-left .arrow,ngb-tooltip-window.bs-tooltip-right .arrow{top:calc(50% - .4rem)}ngb-tooltip-window.bs-tooltip-left-top .arrow,ngb-tooltip-window.bs-tooltip-right-top .arrow{top:.4rem}ngb-tooltip-window.bs-tooltip-left-bottom .arrow,ngb-tooltip-window.bs-tooltip-right-bottom .arrow{top:auto;bottom:.4rem}"]
            }] }
];
NgbTooltipWindow.propDecorators = {
    id: [{ type: Input }],
    tooltipClass: [{ type: Input }]
};
/**
 * A lightweight, extensible directive for fancy tooltip creation.
 */
class NgbTooltip {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} injector
     * @param {?} componentFactoryResolver
     * @param {?} viewContainerRef
     * @param {?} config
     * @param {?} _ngZone
     * @param {?} _document
     * @param {?} _changeDetector
     */
    constructor(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, config, _ngZone, _document, _changeDetector) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this._document = _document;
        this._changeDetector = _changeDetector;
        /**
         * Emits an event when the tooltip is shown
         */
        this.shown = new EventEmitter();
        /**
         * Emits an event when the tooltip is hidden
         */
        this.hidden = new EventEmitter();
        this._ngbTooltipWindowId = `ngb-tooltip-${nextId$5++}`;
        this.autoClose = config.autoClose;
        this.placement = config.placement;
        this.triggers = config.triggers;
        this.container = config.container;
        this.disableTooltip = config.disableTooltip;
        this.tooltipClass = config.tooltipClass;
        this.openDelay = config.openDelay;
        this.closeDelay = config.closeDelay;
        this._popupService = new PopupService(NgbTooltipWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);
        this._zoneSubscription = _ngZone.onStable.subscribe(() => {
            if (this._windowRef) {
                positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body', 'bs-tooltip');
            }
        });
    }
    /**
     * Content to be displayed as tooltip. If falsy, the tooltip won't open.
     * @param {?} value
     * @return {?}
     */
    set ngbTooltip(value) {
        this._ngbTooltip = value;
        if (!value && this._windowRef) {
            this.close();
        }
    }
    /**
     * @return {?}
     */
    get ngbTooltip() { return this._ngbTooltip; }
    /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * The context is an optional value to be injected into the tooltip template when it is created.
     * @param {?=} context
     * @return {?}
     */
    open(context) {
        if (!this._windowRef && this._ngbTooltip && !this.disableTooltip) {
            this._windowRef = this._popupService.open(this._ngbTooltip, context);
            this._windowRef.instance.tooltipClass = this.tooltipClass;
            this._windowRef.instance.id = this._ngbTooltipWindowId;
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbTooltipWindowId);
            if (this.container === 'body') {
                this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            // apply styling to set basic css-classes on target element, before going for positioning
            this._windowRef.changeDetectorRef.markForCheck();
            ngbAutoClose(this._ngZone, this._document, this.autoClose, () => this.close(), this.hidden, [this._windowRef.location.nativeElement]);
            this.shown.emit();
        }
    }
    /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * @return {?}
     */
    close() {
        if (this._windowRef != null) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
            this._popupService.close();
            this._windowRef = null;
            this.hidden.emit();
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * @return {?}
     */
    toggle() {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Returns whether or not the tooltip is currently being shown
     * @return {?}
     */
    isOpen() { return this._windowRef != null; }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._unregisterListenersFn = listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this), this.close.bind(this), +this.openDelay, +this.closeDelay);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.close();
        // This check is needed as it might happen that ngOnDestroy is called before ngOnInit
        // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
        if (this._unregisterListenersFn) {
            this._unregisterListenersFn();
        }
        this._zoneSubscription.unsubscribe();
    }
}
NgbTooltip.decorators = [
    { type: Directive, args: [{ selector: '[ngbTooltip]', exportAs: 'ngbTooltip' },] }
];
/** @nocollapse */
NgbTooltip.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: Injector },
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef },
    { type: NgbTooltipConfig },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ChangeDetectorRef }
];
NgbTooltip.propDecorators = {
    autoClose: [{ type: Input }],
    placement: [{ type: Input }],
    triggers: [{ type: Input }],
    container: [{ type: Input }],
    disableTooltip: [{ type: Input }],
    tooltipClass: [{ type: Input }],
    openDelay: [{ type: Input }],
    closeDelay: [{ type: Input }],
    shown: [{ type: Output }],
    hidden: [{ type: Output }],
    ngbTooltip: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbTooltipModule {
    /**
     * No need in forRoot anymore with tree-shakeable services
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbTooltipModule }; }
}
NgbTooltipModule.decorators = [
    { type: NgModule, args: [{ declarations: [NgbTooltip, NgbTooltipWindow], exports: [NgbTooltip], entryComponents: [NgbTooltipWindow] },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A component that can be used inside a custom result template in order to highlight the term inside the text of the
 * result
 */
class NgbHighlight {
    constructor() {
        /**
         * The CSS class of the span elements wrapping the term inside the result
         */
        this.highlightClass = 'ngb-highlight';
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const resultStr = toString(this.result);
        /** @type {?} */
        const resultLC = resultStr.toLowerCase();
        /** @type {?} */
        const termLC = toString(this.term).toLowerCase();
        /** @type {?} */
        let currentIdx = 0;
        if (termLC.length > 0) {
            this.parts = resultLC.split(new RegExp(`(${regExpEscape(termLC)})`)).map((part) => {
                /** @type {?} */
                const originalPart = resultStr.substr(currentIdx, part.length);
                currentIdx += part.length;
                return originalPart;
            });
        }
        else {
            this.parts = [resultStr];
        }
    }
}
NgbHighlight.decorators = [
    { type: Component, args: [{
                selector: 'ngb-highlight',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `<ng-template ngFor [ngForOf]="parts" let-part let-isOdd="odd">` +
                    `<span *ngIf="isOdd; else even" [class]="highlightClass">{{part}}</span><ng-template #even>{{part}}</ng-template>` +
                    `</ng-template>`,
                styles: [".ngb-highlight{font-weight:700}"]
            }] }
];
NgbHighlight.propDecorators = {
    highlightClass: [{ type: Input }],
    result: [{ type: Input }],
    term: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbTypeaheadWindow {
    constructor() {
        this.activeIdx = 0;
        /**
         * Flag indicating if the first row should be active initially
         */
        this.focusFirst = true;
        /**
         * A function used to format a given result before display. This function should return a formatted string without any
         * HTML markup
         */
        this.formatter = toString;
        /**
         * Event raised when user selects a particular result row
         */
        this.selectEvent = new EventEmitter();
        this.activeChangeEvent = new EventEmitter();
    }
    /**
     * @return {?}
     */
    hasActive() { return this.activeIdx > -1 && this.activeIdx < this.results.length; }
    /**
     * @return {?}
     */
    getActive() { return this.results[this.activeIdx]; }
    /**
     * @param {?} activeIdx
     * @return {?}
     */
    markActive(activeIdx) {
        this.activeIdx = activeIdx;
        this._activeChanged();
    }
    /**
     * @return {?}
     */
    next() {
        if (this.activeIdx === this.results.length - 1) {
            this.activeIdx = this.focusFirst ? (this.activeIdx + 1) % this.results.length : -1;
        }
        else {
            this.activeIdx++;
        }
        this._activeChanged();
    }
    /**
     * @return {?}
     */
    prev() {
        if (this.activeIdx < 0) {
            this.activeIdx = this.results.length - 1;
        }
        else if (this.activeIdx === 0) {
            this.activeIdx = this.focusFirst ? this.results.length - 1 : -1;
        }
        else {
            this.activeIdx--;
        }
        this._activeChanged();
    }
    /**
     * @return {?}
     */
    resetActive() {
        this.activeIdx = this.focusFirst ? 0 : -1;
        this._activeChanged();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) { this.selectEvent.emit(item); }
    /**
     * @return {?}
     */
    ngOnInit() { this.resetActive(); }
    /**
     * @return {?}
     */
    _activeChanged() {
        this.activeChangeEvent.emit(this.activeIdx >= 0 ? this.id + '-' + this.activeIdx : undefined);
    }
}
NgbTypeaheadWindow.decorators = [
    { type: Component, args: [{
                selector: 'ngb-typeahead-window',
                exportAs: 'ngbTypeaheadWindow',
                host: { '(mousedown)': '$event.preventDefault()', 'class': 'dropdown-menu show', 'role': 'listbox', '[id]': 'id' },
                template: `
    <ng-template #rt let-result="result" let-term="term" let-formatter="formatter">
      <ngb-highlight [result]="formatter(result)" [term]="term"></ngb-highlight>
    </ng-template>
    <ng-template ngFor [ngForOf]="results" let-result let-idx="index">
      <button type="button" class="dropdown-item" role="option"
        [id]="id + '-' + idx"
        [class.active]="idx === activeIdx"
        (mouseenter)="markActive(idx)"
        (click)="select(result)">
          <ng-template [ngTemplateOutlet]="resultTemplate || rt"
          [ngTemplateOutletContext]="{result: result, term: term, formatter: formatter}"></ng-template>
      </button>
    </ng-template>
  `
            }] }
];
NgbTypeaheadWindow.propDecorators = {
    id: [{ type: Input }],
    focusFirst: [{ type: Input }],
    results: [{ type: Input }],
    term: [{ type: Input }],
    formatter: [{ type: Input }],
    resultTemplate: [{ type: Input }],
    selectEvent: [{ type: Output, args: ['select',] }],
    activeChangeEvent: [{ type: Output, args: ['activeChange',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const ARIA_LIVE_DELAY = new InjectionToken('live announcer delay', { providedIn: 'root', factory: ARIA_LIVE_DELAY_FACTORY });
/**
 * @return {?}
 */
function ARIA_LIVE_DELAY_FACTORY() {
    return 100;
}
/**
 * @param {?} document
 * @param {?=} lazyCreate
 * @return {?}
 */
function getLiveElement(document, lazyCreate = false) {
    /** @type {?} */
    let element = (/** @type {?} */ (document.body.querySelector('#ngb-live')));
    if (element == null && lazyCreate) {
        element = document.createElement('div');
        element.setAttribute('id', 'ngb-live');
        element.setAttribute('aria-live', 'polite');
        element.setAttribute('aria-atomic', 'true');
        element.classList.add('sr-only');
        document.body.appendChild(element);
    }
    return element;
}
class Live {
    /**
     * @param {?} _document
     * @param {?} _delay
     */
    constructor(_document, _delay) {
        this._document = _document;
        this._delay = _delay;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        /** @type {?} */
        const element = getLiveElement(this._document);
        if (element) {
            element.parentElement.removeChild(element);
        }
    }
    /**
     * @param {?} message
     * @return {?}
     */
    say(message) {
        /** @type {?} */
        const element = getLiveElement(this._document, true);
        /** @type {?} */
        const delay$$1 = this._delay;
        element.textContent = '';
        /** @type {?} */
        const setText = () => element.textContent = message;
        if (delay$$1 === null) {
            setText();
        }
        else {
            setTimeout(setText, delay$$1);
        }
    }
}
Live.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
Live.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [ARIA_LIVE_DELAY,] }] }
];
/** @nocollapse */ Live.ngInjectableDef = defineInjectable({ factory: function Live_Factory() { return new Live(inject(DOCUMENT), inject(ARIA_LIVE_DELAY)); }, token: Live, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Configuration service for the NgbTypeahead component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the typeaheads used in the application.
 */
class NgbTypeaheadConfig {
    constructor() {
        this.editable = true;
        this.focusFirst = true;
        this.showHint = false;
        this.placement = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
    }
}
NgbTypeaheadConfig.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ NgbTypeaheadConfig.ngInjectableDef = defineInjectable({ factory: function NgbTypeaheadConfig_Factory() { return new NgbTypeaheadConfig(); }, token: NgbTypeaheadConfig, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_TYPEAHEAD_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbTypeahead),
    multi: true
};
/** @type {?} */
let nextWindowId = 0;
/**
 * NgbTypeahead directive provides a simple way of creating powerful typeaheads from any text input
 */
class NgbTypeahead {
    /**
     * @param {?} _elementRef
     * @param {?} _viewContainerRef
     * @param {?} _renderer
     * @param {?} _injector
     * @param {?} componentFactoryResolver
     * @param {?} config
     * @param {?} ngZone
     * @param {?} _live
     * @param {?} _document
     * @param {?} _ngZone
     * @param {?} _changeDetector
     */
    constructor(_elementRef, _viewContainerRef, _renderer, _injector, componentFactoryResolver, config, ngZone, _live, _document, _ngZone, _changeDetector) {
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._injector = _injector;
        this._live = _live;
        this._document = _document;
        this._ngZone = _ngZone;
        this._changeDetector = _changeDetector;
        this._closed$ = new Subject();
        /**
         * Value for the configurable autocomplete attribute.
         * Defaults to 'off' to disable the native browser autocomplete, but this standard value does not seem
         * to be always correctly taken into account.
         *
         * \@since 2.1.0
         */
        this.autocomplete = 'off';
        /**
         * Placement of a typeahead accepts:
         *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
         *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
         *  array or a space separated string of above values
         */
        this.placement = 'bottom-left';
        /**
         * An event emitted when a match is selected. Event payload is of type NgbTypeaheadSelectItemEvent.
         */
        this.selectItem = new EventEmitter();
        this.popupId = `ngb-typeahead-${nextWindowId++}`;
        this._onTouched = () => { };
        this._onChange = (_) => { };
        this.container = config.container;
        this.editable = config.editable;
        this.focusFirst = config.focusFirst;
        this.showHint = config.showHint;
        this.placement = config.placement;
        this._valueChanges = fromEvent(_elementRef.nativeElement, 'input')
            .pipe(map($event => ((/** @type {?} */ ($event.target))).value));
        this._resubscribeTypeahead = new BehaviorSubject(null);
        this._popupService = new PopupService(NgbTypeaheadWindow, _injector, _viewContainerRef, _renderer, componentFactoryResolver);
        this._zoneSubscription = ngZone.onStable.subscribe(() => {
            if (this.isPopupOpen()) {
                positionElements(this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement, this.container === 'body');
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const inputValues$ = this._valueChanges.pipe(tap(value => {
            this._inputValueBackup = this.showHint ? value : null;
            if (this.editable) {
                this._onChange(value);
            }
        }));
        /** @type {?} */
        const results$ = inputValues$.pipe(this.ngbTypeahead);
        /** @type {?} */
        const processedResults$ = results$.pipe(tap(() => {
            if (!this.editable) {
                this._onChange(undefined);
            }
        }));
        /** @type {?} */
        const userInput$ = this._resubscribeTypeahead.pipe(switchMap(() => processedResults$));
        this._subscription = this._subscribeToUserInput(userInput$);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._closePopup();
        this._unsubscribeFromUserInput();
        this._zoneSubscription.unsubscribe();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this._onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this._onTouched = fn; }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._writeInputValue(this._formatItemForInput(value));
        if (this.showHint) {
            this._inputValueBackup = value;
        }
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    }
    /**
     * Dismisses typeahead popup window
     * @return {?}
     */
    dismissPopup() {
        if (this.isPopupOpen()) {
            this._resubscribeTypeahead.next(null);
            this._closePopup();
            if (this.showHint && this._inputValueBackup !== null) {
                this._writeInputValue(this._inputValueBackup);
            }
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Returns true if the typeahead popup window is displayed
     * @return {?}
     */
    isPopupOpen() { return this._windowRef != null; }
    /**
     * @return {?}
     */
    handleBlur() {
        this._resubscribeTypeahead.next(null);
        this._onTouched();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeyDown(event) {
        if (!this.isPopupOpen()) {
            return;
        }
        // tslint:disable-next-line:deprecation
        switch (event.which) {
            case Key.ArrowDown:
                event.preventDefault();
                this._windowRef.instance.next();
                this._showHint();
                break;
            case Key.ArrowUp:
                event.preventDefault();
                this._windowRef.instance.prev();
                this._showHint();
                break;
            case Key.Enter:
            case Key.Tab:
                /** @type {?} */
                const result = this._windowRef.instance.getActive();
                if (isDefined(result)) {
                    event.preventDefault();
                    event.stopPropagation();
                    this._selectResult(result);
                }
                this._closePopup();
                break;
        }
    }
    /**
     * @return {?}
     */
    _openPopup() {
        if (!this.isPopupOpen()) {
            this._inputValueBackup = this._elementRef.nativeElement.value;
            this._windowRef = this._popupService.open();
            this._windowRef.instance.id = this.popupId;
            this._windowRef.instance.selectEvent.subscribe((result) => this._selectResultClosePopup(result));
            this._windowRef.instance.activeChangeEvent.subscribe((activeId) => this.activeDescendant = activeId);
            if (this.container === 'body') {
                window.document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
            this._changeDetector.markForCheck();
            ngbAutoClose(this._ngZone, this._document, 'outside', () => this.dismissPopup(), this._closed$, [this._elementRef.nativeElement, this._windowRef.location.nativeElement]);
        }
    }
    /**
     * @return {?}
     */
    _closePopup() {
        this._closed$.next();
        this._popupService.close();
        this._windowRef = null;
        this.activeDescendant = undefined;
    }
    /**
     * @param {?} result
     * @return {?}
     */
    _selectResult(result) {
        /** @type {?} */
        let defaultPrevented = false;
        this.selectItem.emit({ item: result, preventDefault: () => { defaultPrevented = true; } });
        this._resubscribeTypeahead.next(null);
        if (!defaultPrevented) {
            this.writeValue(result);
            this._onChange(result);
        }
    }
    /**
     * @param {?} result
     * @return {?}
     */
    _selectResultClosePopup(result) {
        this._selectResult(result);
        this._closePopup();
    }
    /**
     * @return {?}
     */
    _showHint() {
        if (this.showHint && this._windowRef.instance.hasActive() && this._inputValueBackup != null) {
            /** @type {?} */
            const userInputLowerCase = this._inputValueBackup.toLowerCase();
            /** @type {?} */
            const formattedVal = this._formatItemForInput(this._windowRef.instance.getActive());
            if (userInputLowerCase === formattedVal.substr(0, this._inputValueBackup.length).toLowerCase()) {
                this._writeInputValue(this._inputValueBackup + formattedVal.substr(this._inputValueBackup.length));
                this._elementRef.nativeElement['setSelectionRange'].apply(this._elementRef.nativeElement, [this._inputValueBackup.length, formattedVal.length]);
            }
            else {
                this._writeInputValue(formattedVal);
            }
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    _formatItemForInput(item) {
        return item != null && this.inputFormatter ? this.inputFormatter(item) : toString(item);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _writeInputValue(value) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', toString(value));
    }
    /**
     * @param {?} userInput$
     * @return {?}
     */
    _subscribeToUserInput(userInput$) {
        return userInput$.subscribe((results) => {
            if (!results || results.length === 0) {
                this._closePopup();
            }
            else {
                this._openPopup();
                this._windowRef.instance.focusFirst = this.focusFirst;
                this._windowRef.instance.results = results;
                this._windowRef.instance.term = this._elementRef.nativeElement.value;
                if (this.resultFormatter) {
                    this._windowRef.instance.formatter = this.resultFormatter;
                }
                if (this.resultTemplate) {
                    this._windowRef.instance.resultTemplate = this.resultTemplate;
                }
                this._windowRef.instance.resetActive();
                // The observable stream we are subscribing to might have async steps
                // and if a component containing typeahead is using the OnPush strategy
                // the change detection turn wouldn't be invoked automatically.
                this._windowRef.changeDetectorRef.detectChanges();
                this._showHint();
            }
            // live announcer
            /** @type {?} */
            const count = results ? results.length : 0;
            this._live.say(count === 0 ? 'No results available' : `${count} result${count === 1 ? '' : 's'} available`);
        });
    }
    /**
     * @return {?}
     */
    _unsubscribeFromUserInput() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._subscription = null;
    }
}
NgbTypeahead.decorators = [
    { type: Directive, args: [{
                selector: 'input[ngbTypeahead]',
                exportAs: 'ngbTypeahead',
                host: {
                    '(blur)': 'handleBlur()',
                    '[class.open]': 'isPopupOpen()',
                    '(keydown)': 'handleKeyDown($event)',
                    '[autocomplete]': 'autocomplete',
                    'autocapitalize': 'off',
                    'autocorrect': 'off',
                    'role': 'combobox',
                    'aria-multiline': 'false',
                    '[attr.aria-autocomplete]': 'showHint ? "both" : "list"',
                    '[attr.aria-activedescendant]': 'activeDescendant',
                    '[attr.aria-owns]': 'isPopupOpen() ? popupId : null',
                    '[attr.aria-expanded]': 'isPopupOpen()'
                },
                providers: [NGB_TYPEAHEAD_VALUE_ACCESSOR]
            },] }
];
/** @nocollapse */
NgbTypeahead.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: Renderer2 },
    { type: Injector },
    { type: ComponentFactoryResolver },
    { type: NgbTypeaheadConfig },
    { type: NgZone },
    { type: Live },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
NgbTypeahead.propDecorators = {
    autocomplete: [{ type: Input }],
    container: [{ type: Input }],
    editable: [{ type: Input }],
    focusFirst: [{ type: Input }],
    inputFormatter: [{ type: Input }],
    ngbTypeahead: [{ type: Input }],
    resultFormatter: [{ type: Input }],
    resultTemplate: [{ type: Input }],
    showHint: [{ type: Input }],
    placement: [{ type: Input }],
    selectItem: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgbTypeaheadModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbTypeaheadModule }; }
}
NgbTypeaheadModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgbTypeahead, NgbHighlight, NgbTypeaheadWindow],
                exports: [NgbTypeahead, NgbHighlight],
                imports: [CommonModule],
                entryComponents: [NgbTypeaheadWindow]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const NGB_MODULES = [
    NgbAccordionModule, NgbAlertModule, NgbButtonsModule, NgbCarouselModule, NgbCollapseModule, NgbDatepickerModule,
    NgbDropdownModule, NgbModalModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbRatingModule,
    NgbTabsetModule, NgbTimepickerModule, NgbTooltipModule, NgbTypeaheadModule
];
class NgbModule {
    /**
     * Importing with '.forRoot()' is no longer necessary, you can simply import the module.
     * Will be removed in 4.0.0.
     *
     * @deprecated 3.0.0
     * @return {?}
     */
    static forRoot() { return { ngModule: NgbModule }; }
}
NgbModule.decorators = [
    { type: NgModule, args: [{ imports: NGB_MODULES, exports: NGB_MODULES },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgbAccordionModule, NgbAccordionConfig, NgbAccordion, NgbPanel, NgbPanelTitle, NgbPanelContent, NgbPanelHeader, NgbPanelToggle, NgbAlertModule, NgbAlertConfig, NgbAlert, NgbButtonsModule, NgbButtonLabel, NgbCheckBox, NgbRadio, NgbRadioGroup, NgbCarouselModule, NgbCarouselConfig, NgbCarousel, NgbSlide, NgbCollapseModule, NgbCollapse, NgbCalendar, NgbCalendarGregorian, NgbCalendarIslamicCivil, NgbCalendarIslamicUmalqura, NgbCalendarHebrew, NgbCalendarPersian, NgbDatepickerModule, NgbDatepickerI18n, NgbDatepickerI18nHebrew, NgbDatepickerConfig, NgbDate, NgbDateParserFormatter, NgbDateAdapter, NgbDateNativeAdapter, NgbDateNativeUTCAdapter, NgbDatepicker, NgbInputDatepicker, NgbDropdownModule, NgbDropdownAnchor, NgbDropdownConfig, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle, NgbDropdown, NgbModalModule, NgbModal, NgbModalConfig, NgbActiveModal, NgbModalRef, ModalDismissReasons, NgbPaginationModule, NgbPaginationConfig, NgbPagination, NgbPaginationEllipsis, NgbPaginationFirst, NgbPaginationLast, NgbPaginationNext, NgbPaginationNumber, NgbPaginationPrevious, NgbPopoverModule, NgbPopoverConfig, NgbPopover, NgbProgressbarModule, NgbProgressbarConfig, NgbProgressbar, NgbRatingModule, NgbRatingConfig, NgbRating, NgbTabsetModule, NgbTabsetConfig, NgbTabset, NgbTab, NgbTabContent, NgbTabTitle, NgbTimepickerModule, NgbTimepickerConfig, NgbTimepicker, NgbTimeAdapter, NgbTooltipModule, NgbTooltipConfig, NgbTooltip, NgbHighlight, NgbTypeaheadModule, NgbTypeaheadConfig, NgbTypeahead, NgbModule, NGB_CAROUSEL_DIRECTIVES as ɵa, NGB_DATEPICKER_DATE_ADAPTER_FACTORY as ɵi, NgbDateStructAdapter as ɵj, NgbDatepickerDayView as ɵd, NGB_DATEPICKER_18N_FACTORY as ɵg, NgbDatepickerI18nDefault as ɵh, NgbDatepickerKeyMapService as ɵs, NgbDatepickerMonthView as ɵc, NgbDatepickerNavigation as ɵe, NgbDatepickerNavigationSelect as ɵf, NgbDatepickerService as ɵr, NgbCalendarHijri as ɵba, NGB_DATEPICKER_CALENDAR_FACTORY as ɵb, NGB_DATEPICKER_PARSER_FORMATTER_FACTORY as ɵk, NgbDateISOParserFormatter as ɵl, NgbModalBackdrop as ɵt, NgbModalStack as ɵv, NgbModalWindow as ɵu, NgbPopoverWindow as ɵm, NGB_DATEPICKER_TIME_ADAPTER_FACTORY as ɵn, NgbTimeStructAdapter as ɵo, NgbTooltipWindow as ɵp, NgbTypeaheadWindow as ɵq, ARIA_LIVE_DELAY as ɵx, ARIA_LIVE_DELAY_FACTORY as ɵy, Live as ɵz, ContentRef as ɵbb, ScrollBar as ɵw };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYm9vdHN0cmFwLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC91dGlsL3V0aWwudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2FjY29yZGlvbi9hY2NvcmRpb24tY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9hY2NvcmRpb24vYWNjb3JkaW9uLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9hY2NvcmRpb24vYWNjb3JkaW9uLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvYWxlcnQvYWxlcnQtY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9hbGVydC9hbGVydC50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvYWxlcnQvYWxlcnQubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9idXR0b25zL2xhYmVsLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9idXR0b25zL2NoZWNrYm94LnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9idXR0b25zL3JhZGlvLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9idXR0b25zL2J1dHRvbnMubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9jYXJvdXNlbC9jYXJvdXNlbC1jb25maWcudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2Nhcm91c2VsL2Nhcm91c2VsLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9jYXJvdXNlbC9jYXJvdXNlbC5tb2R1bGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2NvbGxhcHNlL2NvbGxhcHNlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9jb2xsYXBzZS9jb2xsYXBzZS5tb2R1bGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvbmdiLWRhdGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvbmdiLWNhbGVuZGFyLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2RhdGVwaWNrZXItdG9vbHMudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1pMThuLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2RhdGVwaWNrZXItc2VydmljZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdXRpbC9rZXkudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1rZXltYXAtc2VydmljZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9kYXRlcGlja2VyLXZpZXctbW9kZWwudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1jb25maWcudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvYWRhcHRlcnMvbmdiLWRhdGUtYWRhcHRlci50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9kYXRlcGlja2VyLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2RhdGVwaWNrZXItbW9udGgtdmlldy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9kYXRlcGlja2VyLW5hdmlnYXRpb24udHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3V0aWwvYXV0b2Nsb3NlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC91dGlsL2ZvY3VzLXRyYXAudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3V0aWwvcG9zaXRpb25pbmcudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvbmdiLWRhdGUtcGFyc2VyLWZvcm1hdHRlci50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9kYXRlcGlja2VyLWlucHV0LnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9kYXRlcGlja2VyL2RhdGVwaWNrZXItZGF5LXZpZXcudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdC50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9oaWpyaS9uZ2ItY2FsZW5kYXItaGlqcmkudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvaGlqcmkvbmdiLWNhbGVuZGFyLWlzbGFtaWMtY2l2aWwudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvaGlqcmkvbmdiLWNhbGVuZGFyLWlzbGFtaWMtdW1hbHF1cmEudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvamFsYWxpL2phbGFsaS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9qYWxhbGkvbmdiLWNhbGVuZGFyLXBlcnNpYW4udHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvaGVicmV3L2hlYnJldy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9oZWJyZXcvbmdiLWNhbGVuZGFyLWhlYnJldy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9oZWJyZXcvZGF0ZXBpY2tlci1pMThuLWhlYnJldy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9hZGFwdGVycy9uZ2ItZGF0ZS1uYXRpdmUtYWRhcHRlci50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZGF0ZXBpY2tlci9hZGFwdGVycy9uZ2ItZGF0ZS1uYXRpdmUtdXRjLWFkYXB0ZXIudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5tb2R1bGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2Ryb3Bkb3duL2Ryb3Bkb3duLWNvbmZpZy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvZHJvcGRvd24vZHJvcGRvd24udHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2Ryb3Bkb3duL2Ryb3Bkb3duLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvbW9kYWwvbW9kYWwtY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC91dGlsL3BvcHVwLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC91dGlsL3Njcm9sbGJhci50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvbW9kYWwvbW9kYWwtYmFja2Ryb3AudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL21vZGFsL21vZGFsLXJlZi50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvbW9kYWwvbW9kYWwtZGlzbWlzcy1yZWFzb25zLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9tb2RhbC9tb2RhbC13aW5kb3cudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL21vZGFsL21vZGFsLXN0YWNrLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9tb2RhbC9tb2RhbC50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvbW9kYWwvbW9kYWwubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9wYWdpbmF0aW9uL3BhZ2luYXRpb24tY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9wYWdpbmF0aW9uL3BhZ2luYXRpb24udHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5tb2R1bGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3V0aWwvdHJpZ2dlcnMudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3BvcG92ZXIvcG9wb3Zlci1jb25maWcudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3BvcG92ZXIvcG9wb3Zlci50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvcG9wb3Zlci9wb3BvdmVyLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXItY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIubW9kdWxlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9yYXRpbmcvcmF0aW5nLWNvbmZpZy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvcmF0aW5nL3JhdGluZy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvcmF0aW5nL3JhdGluZy5tb2R1bGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3RhYnNldC90YWJzZXQtY29uZmlnLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90YWJzZXQvdGFic2V0LnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90YWJzZXQvdGFic2V0Lm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdGltZXBpY2tlci9uZ2ItdGltZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdGltZXBpY2tlci90aW1lcGlja2VyLWNvbmZpZy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdGltZXBpY2tlci9uZ2ItdGltZS1hZGFwdGVyLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90aW1lcGlja2VyL3RpbWVwaWNrZXIudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3RpbWVwaWNrZXIvdGltZXBpY2tlci5tb2R1bGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3Rvb2x0aXAvdG9vbHRpcC1jb25maWcudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3Rvb2x0aXAvdG9vbHRpcC50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdG9vbHRpcC90b29sdGlwLm1vZHVsZS50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdHlwZWFoZWFkL2hpZ2hsaWdodC50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdHlwZWFoZWFkL3R5cGVhaGVhZC13aW5kb3cudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL3V0aWwvYWNjZXNzaWJpbGl0eS9saXZlLnRzIiwibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC90eXBlYWhlYWQvdHlwZWFoZWFkLWNvbmZpZy50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdHlwZWFoZWFkL3R5cGVhaGVhZC50cyIsIm5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvdHlwZWFoZWFkL3R5cGVhaGVhZC5tb2R1bGUudHMiLCJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiB0b0ludGVnZXIodmFsdWU6IGFueSk6IG51bWJlciB7XG4gIHJldHVybiBwYXJzZUludChgJHt2YWx1ZX1gLCAxMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1N0cmluZyh2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgcmV0dXJuICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSA/IGAke3ZhbHVlfWAgOiAnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlSW5SYW5nZSh2YWx1ZTogbnVtYmVyLCBtYXg6IG51bWJlciwgbWluID0gMCk6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLm1heChNYXRoLm1pbih2YWx1ZSwgbWF4KSwgbWluKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBzdHJpbmcge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBudW1iZXIge1xuICByZXR1cm4gIWlzTmFOKHRvSW50ZWdlcih2YWx1ZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBudW1iZXIge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2YWx1ZSkgJiYgTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEZWZpbmVkKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYWROdW1iZXIodmFsdWU6IG51bWJlcikge1xuICBpZiAoaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgcmV0dXJuIGAwJHt2YWx1ZX1gLnNsaWNlKC0yKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ0V4cEVzY2FwZSh0ZXh0KSB7XG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoL1stW1xcXXt9KCkqKz8uLFxcXFxeJHwjXFxzXS9nLCAnXFxcXCQmJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNDbGFzc05hbWUoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gZWxlbWVudCAmJiBlbGVtZW50LmNsYXNzTmFtZSAmJiBlbGVtZW50LmNsYXNzTmFtZS5zcGxpdCAmJlxuICAgICAgZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoL1xccysvKS5pbmRleE9mKGNsYXNzTmFtZSkgPj0gMDtcbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiQWNjb3JkaW9uIGNvbXBvbmVudC5cbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxuICogb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZSBhY2NvcmRpb25zIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBOZ2JBY2NvcmRpb25Db25maWcge1xuICBjbG9zZU90aGVycyA9IGZhbHNlO1xuICB0eXBlOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEhvc3QsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7aXNTdHJpbmd9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5cbmltcG9ydCB7TmdiQWNjb3JkaW9uQ29uZmlnfSBmcm9tICcuL2FjY29yZGlvbi1jb25maWcnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuLyoqXG4gKiBBIGNvbnRleHQgZm9yIHRoZSBgTmdiUGFuZWxIZWFkZXJgIHRlbXBsYXRlXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiUGFuZWxIZWFkZXJDb250ZXh0IHtcbiAgLyoqXG4gICAqIFRydWUgaWYgY3VycmVudCBwYW5lbCBpcyBvcGVuZWRcbiAgICovXG4gIG9wZW5lZDogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBwdXQgb24gYSBidXR0b24gdGhhdCB0b2dnbGVzIHBhbmVsIG9wZW5pbmcgYW5kIGNsb3NpbmcuXG4gKiBUbyBiZSB1c2VkIGluc2lkZSB0aGUgYE5nYlBhbmVsSGVhZGVyYFxuICpcbiAqIEBzaW5jZSA0LjEuMFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdidXR0b25bbmdiUGFuZWxUb2dnbGVdJyxcbiAgaG9zdDoge1xuICAgICd0eXBlJzogJ2J1dHRvbicsXG4gICAgJ1tkaXNhYmxlZF0nOiAncGFuZWwuZGlzYWJsZWQnLFxuICAgICdbY2xhc3MuY29sbGFwc2VkXSc6ICchcGFuZWwuaXNPcGVuJyxcbiAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAncGFuZWwuaXNPcGVuJyxcbiAgICAnW2F0dHIuYXJpYS1jb250cm9sc10nOiAncGFuZWwuaWQnLFxuICAgICcoY2xpY2spJzogJ2FjY29yZGlvbi50b2dnbGUocGFuZWwuaWQpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE5nYlBhbmVsVG9nZ2xlIHtcbiAgQElucHV0KClcbiAgc2V0IG5nYlBhbmVsVG9nZ2xlKHBhbmVsOiBOZ2JQYW5lbCkge1xuICAgIGlmIChwYW5lbCkge1xuICAgICAgdGhpcy5wYW5lbCA9IHBhbmVsO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYkFjY29yZGlvbikpIHB1YmxpYyBhY2NvcmRpb246IE5nYkFjY29yZGlvbixcbiAgICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYlBhbmVsKSkgcHVibGljIHBhbmVsOiBOZ2JQYW5lbCkge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byB3cmFwIGFuIGFjY29yZGlvbiBwYW5lbCBoZWFkZXIgdG8gY29udGFpbiBhbnkgSFRNTCBtYXJrdXAgYW5kIGEgdG9nZ2xpbmcgYnV0dG9uIHdpdGggYE5nYlBhbmVsVG9nZ2xlYFxuICpcbiAqIEBzaW5jZSA0LjEuMFxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlBhbmVsSGVhZGVyXSd9KVxuZXhwb3J0IGNsYXNzIE5nYlBhbmVsSGVhZGVyIHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG4vKipcbiAqIFRoaXMgZGlyZWN0aXZlIHNob3VsZCBiZSB1c2VkIHRvIHdyYXAgYWNjb3JkaW9uIHBhbmVsIHRpdGxlcyB0aGF0IG5lZWQgdG8gY29udGFpbiBIVE1MIG1hcmt1cCBvciBvdGhlciBkaXJlY3RpdmVzLlxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlBhbmVsVGl0bGVdJ30pXG5leHBvcnQgY2xhc3MgTmdiUGFuZWxUaXRsZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSBtdXN0IGJlIHVzZWQgdG8gd3JhcCBhY2NvcmRpb24gcGFuZWwgY29udGVudC5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYW5lbENvbnRlbnRdJ30pXG5leHBvcnQgY2xhc3MgTmdiUGFuZWxDb250ZW50IHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG4vKipcbiAqIFRoZSBOZ2JQYW5lbCBkaXJlY3RpdmUgcmVwcmVzZW50cyBhbiBpbmRpdmlkdWFsIHBhbmVsIHdpdGggdGhlIHRpdGxlIGFuZCBjb2xsYXBzaWJsZVxuICogY29udGVudFxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nYi1wYW5lbCd9KVxuZXhwb3J0IGNsYXNzIE5nYlBhbmVsIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XG4gIC8qKlxuICAgKiAgQSBmbGFnIGRldGVybWluaW5nIHdoZXRoZXIgdGhlIHBhbmVsIGlzIGRpc2FibGVkIG9yIG5vdC5cbiAgICogIFdoZW4gZGlzYWJsZWQsIHRoZSBwYW5lbCBjYW5ub3QgYmUgdG9nZ2xlZC5cbiAgICovXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqICBBbiBvcHRpb25hbCBpZCBmb3IgdGhlIHBhbmVsLiBUaGUgaWQgc2hvdWxkIGJlIHVuaXF1ZS5cbiAgICogIElmIG5vdCBwcm92aWRlZCwgaXQgd2lsbCBiZSBhdXRvLWdlbmVyYXRlZC5cbiAgICovXG4gIEBJbnB1dCgpIGlkID0gYG5nYi1wYW5lbC0ke25leHRJZCsrfWA7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyB0ZWxsaW5nIGlmIHRoZSBwYW5lbCBpcyBjdXJyZW50bHkgb3BlblxuICAgKi9cbiAgaXNPcGVuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqICBUaGUgdGl0bGUgZm9yIHRoZSBwYW5lbC5cbiAgICovXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqICBBY2NvcmRpb24ncyB0eXBlcyBvZiBwYW5lbHMgdG8gYmUgYXBwbGllZCBwZXIgcGFuZWwgYmFzaXMuXG4gICAqICBCb290c3RyYXAgcmVjb2duaXplcyB0aGUgZm9sbG93aW5nIHR5cGVzOiBcInByaW1hcnlcIiwgXCJzZWNvbmRhcnlcIiwgXCJzdWNjZXNzXCIsIFwiZGFuZ2VyXCIsIFwid2FybmluZ1wiLCBcImluZm9cIiwgXCJsaWdodFwiXG4gICAqIGFuZCBcImRhcmtcIlxuICAgKi9cbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xuXG4gIHRpdGxlVHBsOiBOZ2JQYW5lbFRpdGxlIHwgbnVsbDtcbiAgaGVhZGVyVHBsOiBOZ2JQYW5lbEhlYWRlciB8IG51bGw7XG4gIGNvbnRlbnRUcGw6IE5nYlBhbmVsQ29udGVudCB8IG51bGw7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JQYW5lbFRpdGxlLCB7ZGVzY2VuZGFudHM6IGZhbHNlfSkgdGl0bGVUcGxzOiBRdWVyeUxpc3Q8TmdiUGFuZWxUaXRsZT47XG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiUGFuZWxIZWFkZXIsIHtkZXNjZW5kYW50czogZmFsc2V9KSBoZWFkZXJUcGxzOiBRdWVyeUxpc3Q8TmdiUGFuZWxIZWFkZXI+O1xuICBAQ29udGVudENoaWxkcmVuKE5nYlBhbmVsQ29udGVudCwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIGNvbnRlbnRUcGxzOiBRdWVyeUxpc3Q8TmdiUGFuZWxDb250ZW50PjtcblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgLy8gV2UgYXJlIHVzaW5nIEBDb250ZW50Q2hpbGRyZW4gaW5zdGVhZCBvZiBAQ29udGVudENoaWxkIGFzIGluIHRoZSBBbmd1bGFyIHZlcnNpb24gYmVpbmcgdXNlZFxuICAgIC8vIG9ubHkgQENvbnRlbnRDaGlsZHJlbiBhbGxvd3MgdXMgdG8gc3BlY2lmeSB0aGUge2Rlc2NlbmRhbnRzOiBmYWxzZX0gb3B0aW9uLlxuICAgIC8vIFdpdGhvdXQge2Rlc2NlbmRhbnRzOiBmYWxzZX0gd2UgYXJlIGhpdHRpbmcgYnVncyBkZXNjcmliZWQgaW46XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvaXNzdWVzLzIyNDBcbiAgICB0aGlzLnRpdGxlVHBsID0gdGhpcy50aXRsZVRwbHMuZmlyc3Q7XG4gICAgdGhpcy5oZWFkZXJUcGwgPSB0aGlzLmhlYWRlclRwbHMuZmlyc3Q7XG4gICAgdGhpcy5jb250ZW50VHBsID0gdGhpcy5jb250ZW50VHBscy5maXJzdDtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBwYXlsb2FkIG9mIHRoZSBjaGFuZ2UgZXZlbnQgZmlyZWQgcmlnaHQgYmVmb3JlIHRvZ2dsaW5nIGFuIGFjY29yZGlvbiBwYW5lbFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYlBhbmVsQ2hhbmdlRXZlbnQge1xuICAvKipcbiAgICogSWQgb2YgdGhlIGFjY29yZGlvbiBwYW5lbCB0aGF0IGlzIHRvZ2dsZWRcbiAgICovXG4gIHBhbmVsSWQ6IHN0cmluZztcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgcGFuZWwgd2lsbCBiZSBvcGVuZWQgKHRydWUpIG9yIGNsb3NlZCAoZmFsc2UpXG4gICAqL1xuICBuZXh0U3RhdGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgd2lsbCBwcmV2ZW50IHBhbmVsIHRvZ2dsaW5nIGlmIGNhbGxlZFxuICAgKi9cbiAgcHJldmVudERlZmF1bHQ6ICgpID0+IHZvaWQ7XG59XG5cbi8qKlxuICogVGhlIE5nYkFjY29yZGlvbiBkaXJlY3RpdmUgaXMgYSBjb2xsZWN0aW9uIG9mIHBhbmVscy5cbiAqIEl0IGNhbiBhc3N1cmUgdGhhdCBvbmx5IG9uZSBwYW5lbCBjYW4gYmUgb3BlbmVkIGF0IGEgdGltZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLWFjY29yZGlvbicsXG4gIGV4cG9ydEFzOiAnbmdiQWNjb3JkaW9uJyxcbiAgaG9zdDogeydjbGFzcyc6ICdhY2NvcmRpb24nLCAncm9sZSc6ICd0YWJsaXN0JywgJ1thdHRyLmFyaWEtbXVsdGlzZWxlY3RhYmxlXSc6ICchY2xvc2VPdGhlclBhbmVscyd9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjdCBuZ2JQYW5lbEhlYWRlciBsZXQtcGFuZWw+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW25nYlBhbmVsVG9nZ2xlXT1cInBhbmVsXCI+XG4gICAgICAgIHt7cGFuZWwudGl0bGV9fTxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJwYW5lbC50aXRsZVRwbD8udGVtcGxhdGVSZWZcIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXBhbmVsIFtuZ0Zvck9mXT1cInBhbmVsc1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgPGRpdiByb2xlPVwidGFiXCIgaWQ9XCJ7e3BhbmVsLmlkfX0taGVhZGVyXCIgW2NsYXNzXT1cIidjYXJkLWhlYWRlciAnICsgKHBhbmVsLnR5cGUgPyAnYmctJytwYW5lbC50eXBlOiB0eXBlID8gJ2JnLScrdHlwZSA6ICcnKVwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJwYW5lbC5oZWFkZXJUcGw/LnRlbXBsYXRlUmVmIHx8IHRcIlxuICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyRpbXBsaWNpdDogcGFuZWwsIG9wZW5lZDogcGFuZWwuaXNPcGVufVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGlkPVwie3twYW5lbC5pZH19XCIgcm9sZT1cInRhYnBhbmVsXCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cInBhbmVsLmlkICsgJy1oZWFkZXInXCJcbiAgICAgICAgICAgICBjbGFzcz1cImNvbGxhcHNlXCIgW2NsYXNzLnNob3ddPVwicGFuZWwuaXNPcGVuXCIgKm5nSWY9XCIhZGVzdHJveU9uSGlkZSB8fCBwYW5lbC5pc09wZW5cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwicGFuZWwuY29udGVudFRwbD8udGVtcGxhdGVSZWZcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTmdiQWNjb3JkaW9uIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiUGFuZWwpIHBhbmVsczogUXVlcnlMaXN0PE5nYlBhbmVsPjtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb3IgY29tbWEgc2VwYXJhdGVkIHN0cmluZ3Mgb2YgcGFuZWwgaWRlbnRpZmllcnMgdGhhdCBzaG91bGQgYmUgb3BlbmVkXG4gICAqL1xuICBASW5wdXQoKSBhY3RpdmVJZHM6IHN0cmluZyB8IHN0cmluZ1tdID0gW107XG5cbiAgLyoqXG4gICAqICBXaGV0aGVyIHRoZSBvdGhlciBwYW5lbHMgc2hvdWxkIGJlIGNsb3NlZCB3aGVuIGEgcGFuZWwgaXMgb3BlbmVkXG4gICAqL1xuICBASW5wdXQoJ2Nsb3NlT3RoZXJzJykgY2xvc2VPdGhlclBhbmVsczogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgY2xvc2VkIHBhbmVscyBzaG91bGQgYmUgaGlkZGVuIHdpdGhvdXQgZGVzdHJveWluZyB0aGVtXG4gICAqL1xuICBASW5wdXQoKSBkZXN0cm95T25IaWRlID0gdHJ1ZTtcblxuICAvKipcbiAgICogIEFjY29yZGlvbidzIHR5cGVzIG9mIHBhbmVscyB0byBiZSBhcHBsaWVkIGdsb2JhbGx5LlxuICAgKiAgQm9vdHN0cmFwIHJlY29nbml6ZXMgdGhlIGZvbGxvd2luZyB0eXBlczogXCJwcmltYXJ5XCIsIFwic2Vjb25kYXJ5XCIsIFwic3VjY2Vzc1wiLCBcImRhbmdlclwiLCBcIndhcm5pbmdcIiwgXCJpbmZvXCIsIFwibGlnaHRcIlxuICAgKiBhbmQgXCJkYXJrXG4gICAqL1xuICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgcGFuZWwgY2hhbmdlIGV2ZW50IGZpcmVkIHJpZ2h0IGJlZm9yZSB0aGUgcGFuZWwgdG9nZ2xlIGhhcHBlbnMuIFNlZSBOZ2JQYW5lbENoYW5nZUV2ZW50IGZvciBwYXlsb2FkIGRldGFpbHNcbiAgICovXG4gIEBPdXRwdXQoKSBwYW5lbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiUGFuZWxDaGFuZ2VFdmVudD4oKTtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5nYkFjY29yZGlvbkNvbmZpZykge1xuICAgIHRoaXMudHlwZSA9IGNvbmZpZy50eXBlO1xuICAgIHRoaXMuY2xvc2VPdGhlclBhbmVscyA9IGNvbmZpZy5jbG9zZU90aGVycztcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYSBwYW5lbCB3aXRoIGEgZ2l2ZW4gaWQgaXMgZXhwYW5kZWQgb3Igbm90LlxuICAgKi9cbiAgaXNFeHBhbmRlZChwYW5lbElkOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuYWN0aXZlSWRzLmluZGV4T2YocGFuZWxJZCkgPiAtMTsgfVxuXG4gIC8qKlxuICAgKiBFeHBhbmRzIGEgcGFuZWwgd2l0aCBhIGdpdmVuIGlkLiBIYXMgbm8gZWZmZWN0IGlmIHRoZSBwYW5lbCBpcyBhbHJlYWR5IGV4cGFuZGVkIG9yIGRpc2FibGVkLlxuICAgKi9cbiAgZXhwYW5kKHBhbmVsSWQ6IHN0cmluZyk6IHZvaWQgeyB0aGlzLl9jaGFuZ2VPcGVuU3RhdGUodGhpcy5fZmluZFBhbmVsQnlJZChwYW5lbElkKSwgdHJ1ZSk7IH1cblxuICAvKipcbiAgICogRXhwYW5kcyBhbGwgcGFuZWxzIGlmIFtjbG9zZU90aGVyc109XCJmYWxzZVwiLiBGb3IgdGhlIFtjbG9zZU90aGVyc109XCJ0cnVlXCIgY2FzZSB3aWxsIGhhdmUgbm8gZWZmZWN0IGlmIHRoZXJlIGlzIGFuXG4gICAqIG9wZW4gcGFuZWwsIG90aGVyd2lzZSB0aGUgZmlyc3QgcGFuZWwgd2lsbCBiZSBleHBhbmRlZC5cbiAgICovXG4gIGV4cGFuZEFsbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jbG9zZU90aGVyUGFuZWxzKSB7XG4gICAgICBpZiAodGhpcy5hY3RpdmVJZHMubGVuZ3RoID09PSAwICYmIHRoaXMucGFuZWxzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLl9jaGFuZ2VPcGVuU3RhdGUodGhpcy5wYW5lbHMuZmlyc3QsIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHRoaXMuX2NoYW5nZU9wZW5TdGF0ZShwYW5lbCwgdHJ1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsYXBzZXMgYSBwYW5lbCB3aXRoIGEgZ2l2ZW4gaWQuIEhhcyBubyBlZmZlY3QgaWYgdGhlIHBhbmVsIGlzIGFscmVhZHkgY29sbGFwc2VkIG9yIGRpc2FibGVkLlxuICAgKi9cbiAgY29sbGFwc2UocGFuZWxJZDogc3RyaW5nKSB7IHRoaXMuX2NoYW5nZU9wZW5TdGF0ZSh0aGlzLl9maW5kUGFuZWxCeUlkKHBhbmVsSWQpLCBmYWxzZSk7IH1cblxuICAvKipcbiAgICogQ29sbGFwc2VzIGFsbCBvcGVuIHBhbmVscy5cbiAgICovXG4gIGNvbGxhcHNlQWxsKCkge1xuICAgIHRoaXMucGFuZWxzLmZvckVhY2goKHBhbmVsKSA9PiB7IHRoaXMuX2NoYW5nZU9wZW5TdGF0ZShwYW5lbCwgZmFsc2UpOyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9ncmFtbWF0aWNhbGx5IHRvZ2dsZSBhIHBhbmVsIHdpdGggYSBnaXZlbiBpZC4gSGFzIG5vIGVmZmVjdCBpZiB0aGUgcGFuZWwgaXMgZGlzYWJsZWQuXG4gICAqL1xuICB0b2dnbGUocGFuZWxJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgcGFuZWwgPSB0aGlzLl9maW5kUGFuZWxCeUlkKHBhbmVsSWQpO1xuICAgIGlmIChwYW5lbCkge1xuICAgICAgdGhpcy5fY2hhbmdlT3BlblN0YXRlKHBhbmVsLCAhcGFuZWwuaXNPcGVuKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgLy8gYWN0aXZlIGlkIHVwZGF0ZXNcbiAgICBpZiAoaXNTdHJpbmcodGhpcy5hY3RpdmVJZHMpKSB7XG4gICAgICB0aGlzLmFjdGl2ZUlkcyA9IHRoaXMuYWN0aXZlSWRzLnNwbGl0KC9cXHMqLFxccyovKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgcGFuZWxzIG9wZW4gc3RhdGVzXG4gICAgdGhpcy5wYW5lbHMuZm9yRWFjaChwYW5lbCA9PiBwYW5lbC5pc09wZW4gPSAhcGFuZWwuZGlzYWJsZWQgJiYgdGhpcy5hY3RpdmVJZHMuaW5kZXhPZihwYW5lbC5pZCkgPiAtMSk7XG5cbiAgICAvLyBjbG9zZU90aGVycyB1cGRhdGVzXG4gICAgaWYgKHRoaXMuYWN0aXZlSWRzLmxlbmd0aCA+IDEgJiYgdGhpcy5jbG9zZU90aGVyUGFuZWxzKSB7XG4gICAgICB0aGlzLl9jbG9zZU90aGVycyh0aGlzLmFjdGl2ZUlkc1swXSk7XG4gICAgICB0aGlzLl91cGRhdGVBY3RpdmVJZHMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jaGFuZ2VPcGVuU3RhdGUocGFuZWw6IE5nYlBhbmVsLCBuZXh0U3RhdGU6IGJvb2xlYW4pIHtcbiAgICBpZiAocGFuZWwgJiYgIXBhbmVsLmRpc2FibGVkICYmIHBhbmVsLmlzT3BlbiAhPT0gbmV4dFN0YXRlKSB7XG4gICAgICBsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuXG4gICAgICB0aGlzLnBhbmVsQ2hhbmdlLmVtaXQoXG4gICAgICAgICAge3BhbmVsSWQ6IHBhbmVsLmlkLCBuZXh0U3RhdGU6IG5leHRTdGF0ZSwgcHJldmVudERlZmF1bHQ6ICgpID0+IHsgZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7IH19KTtcblxuICAgICAgaWYgKCFkZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHBhbmVsLmlzT3BlbiA9IG5leHRTdGF0ZTtcblxuICAgICAgICBpZiAobmV4dFN0YXRlICYmIHRoaXMuY2xvc2VPdGhlclBhbmVscykge1xuICAgICAgICAgIHRoaXMuX2Nsb3NlT3RoZXJzKHBhbmVsLmlkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVBY3RpdmVJZHMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jbG9zZU90aGVycyhwYW5lbElkOiBzdHJpbmcpIHtcbiAgICB0aGlzLnBhbmVscy5mb3JFYWNoKHBhbmVsID0+IHtcbiAgICAgIGlmIChwYW5lbC5pZCAhPT0gcGFuZWxJZCkge1xuICAgICAgICBwYW5lbC5pc09wZW4gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRQYW5lbEJ5SWQocGFuZWxJZDogc3RyaW5nKTogTmdiUGFuZWwgfCBudWxsIHsgcmV0dXJuIHRoaXMucGFuZWxzLmZpbmQocCA9PiBwLmlkID09PSBwYW5lbElkKTsgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUFjdGl2ZUlkcygpIHtcbiAgICB0aGlzLmFjdGl2ZUlkcyA9IHRoaXMucGFuZWxzLmZpbHRlcihwYW5lbCA9PiBwYW5lbC5pc09wZW4gJiYgIXBhbmVsLmRpc2FibGVkKS5tYXAocGFuZWwgPT4gcGFuZWwuaWQpO1xuICB9XG59XG4iLCJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge05nYkFjY29yZGlvbiwgTmdiUGFuZWwsIE5nYlBhbmVsVGl0bGUsIE5nYlBhbmVsQ29udGVudCwgTmdiUGFuZWxIZWFkZXIsIE5nYlBhbmVsVG9nZ2xlfSBmcm9tICcuL2FjY29yZGlvbic7XG5cbmV4cG9ydCB7XG4gIE5nYkFjY29yZGlvbixcbiAgTmdiUGFuZWwsXG4gIE5nYlBhbmVsVGl0bGUsXG4gIE5nYlBhbmVsQ29udGVudCxcbiAgTmdiUGFuZWxDaGFuZ2VFdmVudCxcbiAgTmdiUGFuZWxIZWFkZXIsXG4gIE5nYlBhbmVsSGVhZGVyQ29udGV4dCxcbiAgTmdiUGFuZWxUb2dnbGVcbn0gZnJvbSAnLi9hY2NvcmRpb24nO1xuZXhwb3J0IHtOZ2JBY2NvcmRpb25Db25maWd9IGZyb20gJy4vYWNjb3JkaW9uLWNvbmZpZyc7XG5cbmNvbnN0IE5HQl9BQ0NPUkRJT05fRElSRUNUSVZFUyA9XG4gICAgW05nYkFjY29yZGlvbiwgTmdiUGFuZWwsIE5nYlBhbmVsVGl0bGUsIE5nYlBhbmVsQ29udGVudCwgTmdiUGFuZWxIZWFkZXIsIE5nYlBhbmVsVG9nZ2xlXTtcblxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IE5HQl9BQ0NPUkRJT05fRElSRUNUSVZFUywgZXhwb3J0czogTkdCX0FDQ09SRElPTl9ESVJFQ1RJVkVTLCBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXX0pXG5leHBvcnQgY2xhc3MgTmdiQWNjb3JkaW9uTW9kdWxlIHtcbiAgLyoqXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxuICAgKi9cbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYkFjY29yZGlvbk1vZHVsZX07IH1cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiQWxlcnQgY29tcG9uZW50LlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIGFsZXJ0cyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTmdiQWxlcnRDb25maWcge1xuICBkaXNtaXNzaWJsZSA9IHRydWU7XG4gIHR5cGUgPSAnd2FybmluZyc7XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFJlbmRlcmVyMixcbiAgRWxlbWVudFJlZixcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge05nYkFsZXJ0Q29uZmlnfSBmcm9tICcuL2FsZXJ0LWNvbmZpZyc7XG5cbi8qKlxuICogQWxlcnRzIGNhbiBiZSB1c2VkIHRvIHByb3ZpZGUgZmVlZGJhY2sgbWVzc2FnZXMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1hbGVydCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7J3JvbGUnOiAnYWxlcnQnLCAnY2xhc3MnOiAnYWxlcnQnLCAnW2NsYXNzLmFsZXJ0LWRpc21pc3NpYmxlXSc6ICdkaXNtaXNzaWJsZSd9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxidXR0b24gKm5nSWY9XCJkaXNtaXNzaWJsZVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IuYWxlcnQuY2xvc2VcIlxuICAgICAgKGNsaWNrKT1cImNsb3NlSGFuZGxlcigpXCI+XG4gICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICBgLFxuICBzdHlsZVVybHM6IFsnLi9hbGVydC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmdiQWxlcnQgaW1wbGVtZW50cyBPbkluaXQsXG4gICAgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIGEgZ2l2ZW4gYWxlcnQgY2FuIGJlIGRpc21pc3NlZCAoY2xvc2VkKSBieSBhIHVzZXIuIElmIHRoaXMgZmxhZyBpcyBzZXQsIGEgY2xvc2UgYnV0dG9uIChpbiBhXG4gICAqIGZvcm0gb2YgYW4gw4PClykgd2lsbCBiZSBkaXNwbGF5ZWQuXG4gICAqL1xuICBASW5wdXQoKSBkaXNtaXNzaWJsZTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEFsZXJ0IHR5cGUgKENTUyBjbGFzcykuIEJvb3RzdHJhcCA0IHJlY29nbml6ZXMgdGhlIGZvbGxvd2luZyB0eXBlczogXCJzdWNjZXNzXCIsIFwiaW5mb1wiLCBcIndhcm5pbmdcIiwgXCJkYW5nZXJcIixcbiAgICogXCJwcmltYXJ5XCIsIFwic2Vjb25kYXJ5XCIsIFwibGlnaHRcIiwgXCJkYXJrXCIuXG4gICAqL1xuICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIGNsb3NlIGJ1dHRvbiBpcyBjbGlja2VkLiBUaGlzIGV2ZW50IGhhcyBubyBwYXlsb2FkLiBPbmx5IHJlbGV2YW50IGZvciBkaXNtaXNzaWJsZSBhbGVydHMuXG4gICAqL1xuICBAT3V0cHV0KCkgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JBbGVydENvbmZpZywgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuZGlzbWlzc2libGUgPSBjb25maWcuZGlzbWlzc2libGU7XG4gICAgdGhpcy50eXBlID0gY29uZmlnLnR5cGU7XG4gIH1cblxuICBjbG9zZUhhbmRsZXIoKSB7IHRoaXMuY2xvc2UuZW1pdChudWxsKTsgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBjb25zdCB0eXBlQ2hhbmdlID0gY2hhbmdlc1sndHlwZSddO1xuICAgIGlmICh0eXBlQ2hhbmdlICYmICF0eXBlQ2hhbmdlLmZpcnN0Q2hhbmdlKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIGBhbGVydC0ke3R5cGVDaGFuZ2UucHJldmlvdXNWYWx1ZX1gKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgYGFsZXJ0LSR7dHlwZUNoYW5nZS5jdXJyZW50VmFsdWV9YCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7IHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgYGFsZXJ0LSR7dGhpcy50eXBlfWApOyB9XG59XG4iLCJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge05nYkFsZXJ0fSBmcm9tICcuL2FsZXJ0JztcblxuZXhwb3J0IHtOZ2JBbGVydH0gZnJvbSAnLi9hbGVydCc7XG5leHBvcnQge05nYkFsZXJ0Q29uZmlnfSBmcm9tICcuL2FsZXJ0LWNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBbTmdiQWxlcnRdLCBleHBvcnRzOiBbTmdiQWxlcnRdLCBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSwgZW50cnlDb21wb25lbnRzOiBbTmdiQWxlcnRdfSlcbmV4cG9ydCBjbGFzcyBOZ2JBbGVydE1vZHVsZSB7XG4gIC8qKlxuICAgKiBJbXBvcnRpbmcgd2l0aCAnLmZvclJvb3QoKScgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSwgeW91IGNhbiBzaW1wbHkgaW1wb3J0IHRoZSBtb2R1bGUuXG4gICAqIFdpbGwgYmUgcmVtb3ZlZCBpbiA0LjAuMC5cbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcbiAgICovXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JBbGVydE1vZHVsZX07IH1cbn1cbiIsImltcG9ydCB7RGlyZWN0aXZlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nYkJ1dHRvbkxhYmVsXScsXG4gIGhvc3Q6XG4gICAgICB7J1tjbGFzcy5idG5dJzogJ3RydWUnLCAnW2NsYXNzLmFjdGl2ZV0nOiAnYWN0aXZlJywgJ1tjbGFzcy5kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLCAnW2NsYXNzLmZvY3VzXSc6ICdmb2N1c2VkJ31cbn0pXG5leHBvcnQgY2xhc3MgTmdiQnV0dG9uTGFiZWwge1xuICBhY3RpdmU6IGJvb2xlYW47XG4gIGRpc2FibGVkOiBib29sZWFuO1xuICBmb2N1c2VkOiBib29sZWFuO1xufVxuIiwiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBmb3J3YXJkUmVmLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge05nYkJ1dHRvbkxhYmVsfSBmcm9tICcuL2xhYmVsJztcblxuY29uc3QgTkdCX0NIRUNLQk9YX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiQ2hlY2tCb3gpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuXG4vKipcbiAqIEVhc2lseSBjcmVhdGUgQm9vdHN0cmFwLXN0eWxlIGNoZWNrYm94IGJ1dHRvbnMuIEEgdmFsdWUgb2YgYSBjaGVja2VkIGJ1dHRvbiBpcyBib3VuZCB0byBhIHZhcmlhYmxlXG4gKiBzcGVjaWZpZWQgdmlhIG5nTW9kZWwuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ2JCdXR0b25dW3R5cGU9Y2hlY2tib3hdJyxcbiAgaG9zdDoge1xuICAgICdhdXRvY29tcGxldGUnOiAnb2ZmJyxcbiAgICAnW2NoZWNrZWRdJzogJ2NoZWNrZWQnLFxuICAgICdbZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnKGNoYW5nZSknOiAnb25JbnB1dENoYW5nZSgkZXZlbnQpJyxcbiAgICAnKGZvY3VzKSc6ICdmb2N1c2VkID0gdHJ1ZScsXG4gICAgJyhibHVyKSc6ICdmb2N1c2VkID0gZmFsc2UnXG4gIH0sXG4gIHByb3ZpZGVyczogW05HQl9DSEVDS0JPWF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTmdiQ2hlY2tCb3ggaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIGNoZWNrZWQ7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIGEgZ2l2ZW4gY2hlY2tib3ggYnV0dG9uIGlzIGRpc2FibGVkLlxuICAgKi9cbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogVmFsdWUgdG8gYmUgcHJvcGFnYXRlZCBhcyBtb2RlbCB3aGVuIHRoZSBjaGVja2JveCBpcyBjaGVja2VkLlxuICAgKi9cbiAgQElucHV0KCkgdmFsdWVDaGVja2VkID0gdHJ1ZTtcblxuICAvKipcbiAgICogVmFsdWUgdG8gYmUgcHJvcGFnYXRlZCBhcyBtb2RlbCB3aGVuIHRoZSBjaGVja2JveCBpcyB1bmNoZWNrZWQuXG4gICAqL1xuICBASW5wdXQoKSB2YWx1ZVVuQ2hlY2tlZCA9IGZhbHNlO1xuXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIHNldCBmb2N1c2VkKGlzRm9jdXNlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX2xhYmVsLmZvY3VzZWQgPSBpc0ZvY3VzZWQ7XG4gICAgaWYgKCFpc0ZvY3VzZWQpIHtcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbGFiZWw6IE5nYkJ1dHRvbkxhYmVsLCBwcml2YXRlIF9jZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgb25JbnB1dENoYW5nZSgkZXZlbnQpIHtcbiAgICBjb25zdCBtb2RlbFRvUHJvcGFnYXRlID0gJGV2ZW50LnRhcmdldC5jaGVja2VkID8gdGhpcy52YWx1ZUNoZWNrZWQgOiB0aGlzLnZhbHVlVW5DaGVja2VkO1xuICAgIHRoaXMub25DaGFuZ2UobW9kZWxUb1Byb3BhZ2F0ZSk7XG4gICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB0aGlzLndyaXRlVmFsdWUobW9kZWxUb1Byb3BhZ2F0ZSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMub25DaGFuZ2UgPSBmbjsgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vblRvdWNoZWQgPSBmbjsgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMuX2xhYmVsLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLmNoZWNrZWQgPSB2YWx1ZSA9PT0gdGhpcy52YWx1ZUNoZWNrZWQ7XG4gICAgdGhpcy5fbGFiZWwuYWN0aXZlID0gdGhpcy5jaGVja2VkO1xuXG4gICAgLy8gbGFiZWwgd29uJ3QgYmUgdXBkYXRlZCwgaWYgaXQgaXMgaW5zaWRlIHRoZSBPblB1c2ggY29tcG9uZW50IHdoZW4gW25nTW9kZWxdIGNoYW5nZXNcbiAgICB0aGlzLl9jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25EZXN0cm95LCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtOZ2JCdXR0b25MYWJlbH0gZnJvbSAnLi9sYWJlbCc7XG5cbmNvbnN0IE5HQl9SQURJT19WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYlJhZGlvR3JvdXApLFxuICBtdWx0aTogdHJ1ZVxufTtcblxubGV0IG5leHRJZCA9IDA7XG5cbi8qKlxuICogRWFzaWx5IGNyZWF0ZSBCb290c3RyYXAtc3R5bGUgcmFkaW8gYnV0dG9ucy4gQSB2YWx1ZSBvZiBhIHNlbGVjdGVkIGJ1dHRvbiBpcyBib3VuZCB0byBhIHZhcmlhYmxlXG4gKiBzcGVjaWZpZWQgdmlhIG5nTW9kZWwuXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nYlJhZGlvR3JvdXBdJywgaG9zdDogeydyb2xlJzogJ3JhZGlvZ3JvdXAnfSwgcHJvdmlkZXJzOiBbTkdCX1JBRElPX1ZBTFVFX0FDQ0VTU09SXX0pXG5leHBvcnQgY2xhc3MgTmdiUmFkaW9Hcm91cCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgcHJpdmF0ZSBfcmFkaW9zOiBTZXQ8TmdiUmFkaW8+ID0gbmV3IFNldDxOZ2JSYWRpbz4oKTtcbiAgcHJpdmF0ZSBfdmFsdWUgPSBudWxsO1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcblxuICBnZXQgZGlzYWJsZWQoKSB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuICBzZXQgZGlzYWJsZWQoaXNEaXNhYmxlZDogYm9vbGVhbikgeyB0aGlzLnNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZCk7IH1cblxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIGdyb3VwLiBVbmxlc3MgZW5jbG9zZWQgaW5wdXRzIHNwZWNpZnkgYSBuYW1lLCB0aGlzIG5hbWUgaXMgdXNlZCBhcyB0aGUgbmFtZSBvZiB0aGVcbiAgICogZW5jbG9zZWQgaW5wdXRzLiBJZiBub3Qgc3BlY2lmaWVkLCBhIG5hbWUgaXMgZ2VuZXJhdGVkIGF1dG9tYXRpY2FsbHkuXG4gICAqL1xuICBASW5wdXQoKSBuYW1lID0gYG5nYi1yYWRpby0ke25leHRJZCsrfWA7XG5cbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgb25SYWRpb0NoYW5nZShyYWRpbzogTmdiUmFkaW8pIHtcbiAgICB0aGlzLndyaXRlVmFsdWUocmFkaW8udmFsdWUpO1xuICAgIHRoaXMub25DaGFuZ2UocmFkaW8udmFsdWUpO1xuICB9XG5cbiAgb25SYWRpb1ZhbHVlVXBkYXRlKCkgeyB0aGlzLl91cGRhdGVSYWRpb3NWYWx1ZSgpOyB9XG5cbiAgcmVnaXN0ZXIocmFkaW86IE5nYlJhZGlvKSB7IHRoaXMuX3JhZGlvcy5hZGQocmFkaW8pOyB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uQ2hhbmdlID0gZm47IH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7IHRoaXMub25Ub3VjaGVkID0gZm47IH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy5fdXBkYXRlUmFkaW9zRGlzYWJsZWQoKTtcbiAgfVxuXG4gIHVucmVnaXN0ZXIocmFkaW86IE5nYlJhZGlvKSB7IHRoaXMuX3JhZGlvcy5kZWxldGUocmFkaW8pOyB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlUmFkaW9zVmFsdWUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVJhZGlvc1ZhbHVlKCkgeyB0aGlzLl9yYWRpb3MuZm9yRWFjaCgocmFkaW8pID0+IHJhZGlvLnVwZGF0ZVZhbHVlKHRoaXMuX3ZhbHVlKSk7IH1cbiAgcHJpdmF0ZSBfdXBkYXRlUmFkaW9zRGlzYWJsZWQoKSB7IHRoaXMuX3JhZGlvcy5mb3JFYWNoKChyYWRpbykgPT4gcmFkaW8udXBkYXRlRGlzYWJsZWQoKSk7IH1cbn1cblxuXG4vKipcbiAqIE1hcmtzIGFuIGlucHV0IG9mIHR5cGUgXCJyYWRpb1wiIGFzIHBhcnQgb2YgdGhlIE5nYlJhZGlvR3JvdXAuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ2JCdXR0b25dW3R5cGU9cmFkaW9dJyxcbiAgaG9zdDoge1xuICAgICdbY2hlY2tlZF0nOiAnY2hlY2tlZCcsXG4gICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbbmFtZV0nOiAnbmFtZUF0dHInLFxuICAgICcoY2hhbmdlKSc6ICdvbkNoYW5nZSgpJyxcbiAgICAnKGZvY3VzKSc6ICdmb2N1c2VkID0gdHJ1ZScsXG4gICAgJyhibHVyKSc6ICdmb2N1c2VkID0gZmFsc2UnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTmdiUmFkaW8gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9jaGVja2VkOiBib29sZWFuO1xuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfdmFsdWU6IGFueSA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBpbnB1dC4gQWxsIGlucHV0cyBvZiBhIGdyb3VwIHNob3VsZCBoYXZlIHRoZSBzYW1lIG5hbWUuIElmIG5vdCBzcGVjaWZpZWQsXG4gICAqIHRoZSBuYW1lIG9mIHRoZSBlbmNsb3NpbmcgZ3JvdXAgaXMgdXNlZC5cbiAgICovXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogWW91IGNhbiBzcGVjaWZ5IG1vZGVsIHZhbHVlIG9mIGEgZ2l2ZW4gcmFkaW8gYnkgYmluZGluZyB0byB0aGUgdmFsdWUgcHJvcGVydHkuXG4gICAqL1xuICBASW5wdXQoJ3ZhbHVlJylcbiAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIGNvbnN0IHN0cmluZ1ZhbHVlID0gdmFsdWUgPyB2YWx1ZS50b1N0cmluZygpIDogJyc7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCBzdHJpbmdWYWx1ZSk7XG4gICAgdGhpcy5fZ3JvdXAub25SYWRpb1ZhbHVlVXBkYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgYSBnaXZlbiByYWRpbyBidXR0b24gaXMgZGlzYWJsZWQuXG4gICAqL1xuICBASW5wdXQoJ2Rpc2FibGVkJylcbiAgc2V0IGRpc2FibGVkKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGlzRGlzYWJsZWQgIT09IGZhbHNlO1xuICAgIHRoaXMudXBkYXRlRGlzYWJsZWQoKTtcbiAgfVxuXG4gIHNldCBmb2N1c2VkKGlzRm9jdXNlZDogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9sYWJlbCkge1xuICAgICAgdGhpcy5fbGFiZWwuZm9jdXNlZCA9IGlzRm9jdXNlZDtcbiAgICB9XG4gICAgaWYgKCFpc0ZvY3VzZWQpIHtcbiAgICAgIHRoaXMuX2dyb3VwLm9uVG91Y2hlZCgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjaGVja2VkKCkgeyByZXR1cm4gdGhpcy5fY2hlY2tlZDsgfVxuXG4gIGdldCBkaXNhYmxlZCgpIHsgcmV0dXJuIHRoaXMuX2dyb3VwLmRpc2FibGVkIHx8IHRoaXMuX2Rpc2FibGVkOyB9XG5cbiAgZ2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cblxuICBnZXQgbmFtZUF0dHIoKSB7IHJldHVybiB0aGlzLm5hbWUgfHwgdGhpcy5fZ3JvdXAubmFtZTsgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZ3JvdXA6IE5nYlJhZGlvR3JvdXAsIHByaXZhdGUgX2xhYmVsOiBOZ2JCdXR0b25MYWJlbCwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sIHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuX2dyb3VwLnJlZ2lzdGVyKHRoaXMpO1xuICAgIHRoaXMudXBkYXRlRGlzYWJsZWQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkgeyB0aGlzLl9ncm91cC51bnJlZ2lzdGVyKHRoaXMpOyB9XG5cbiAgb25DaGFuZ2UoKSB7IHRoaXMuX2dyb3VwLm9uUmFkaW9DaGFuZ2UodGhpcyk7IH1cblxuICB1cGRhdGVWYWx1ZSh2YWx1ZSkge1xuICAgIC8vIGxhYmVsIHdvbid0IGJlIHVwZGF0ZWQsIGlmIGl0IGlzIGluc2lkZSB0aGUgT25QdXNoIGNvbXBvbmVudCB3aGVuIFtuZ01vZGVsXSBjaGFuZ2VzXG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jaGVja2VkID0gdGhpcy52YWx1ZSA9PT0gdmFsdWU7XG4gICAgdGhpcy5fbGFiZWwuYWN0aXZlID0gdGhpcy5fY2hlY2tlZDtcbiAgfVxuXG4gIHVwZGF0ZURpc2FibGVkKCkgeyB0aGlzLl9sYWJlbC5kaXNhYmxlZCA9IHRoaXMuZGlzYWJsZWQ7IH1cbn1cbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ2JCdXR0b25MYWJlbH0gZnJvbSAnLi9sYWJlbCc7XG5pbXBvcnQge05nYkNoZWNrQm94fSBmcm9tICcuL2NoZWNrYm94JztcbmltcG9ydCB7TmdiUmFkaW8sIE5nYlJhZGlvR3JvdXB9IGZyb20gJy4vcmFkaW8nO1xuXG5leHBvcnQge05nYkJ1dHRvbkxhYmVsfSBmcm9tICcuL2xhYmVsJztcbmV4cG9ydCB7TmdiQ2hlY2tCb3h9IGZyb20gJy4vY2hlY2tib3gnO1xuZXhwb3J0IHtOZ2JSYWRpbywgTmdiUmFkaW9Hcm91cH0gZnJvbSAnLi9yYWRpbyc7XG5cblxuY29uc3QgTkdCX0JVVFRPTl9ESVJFQ1RJVkVTID0gW05nYkJ1dHRvbkxhYmVsLCBOZ2JDaGVja0JveCwgTmdiUmFkaW9Hcm91cCwgTmdiUmFkaW9dO1xuXG5ATmdNb2R1bGUoe2RlY2xhcmF0aW9uczogTkdCX0JVVFRPTl9ESVJFQ1RJVkVTLCBleHBvcnRzOiBOR0JfQlVUVE9OX0RJUkVDVElWRVN9KVxuZXhwb3J0IGNsYXNzIE5nYkJ1dHRvbnNNb2R1bGUge1xuICAvKipcbiAgICogSW1wb3J0aW5nIHdpdGggJy5mb3JSb290KCknIGlzIG5vIGxvbmdlciBuZWNlc3NhcnksIHlvdSBjYW4gc2ltcGx5IGltcG9ydCB0aGUgbW9kdWxlLlxuICAgKiBXaWxsIGJlIHJlbW92ZWQgaW4gNC4wLjAuXG4gICAqXG4gICAqIEBkZXByZWNhdGVkIDMuMC4wXG4gICAqL1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiQnV0dG9uc01vZHVsZX07IH1cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiQ2Fyb3VzZWwgY29tcG9uZW50LlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIGNhcm91c2VscyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTmdiQ2Fyb3VzZWxDb25maWcge1xuICBpbnRlcnZhbCA9IDUwMDA7XG4gIHdyYXAgPSB0cnVlO1xuICBrZXlib2FyZCA9IHRydWU7XG4gIHBhdXNlT25Ib3ZlciA9IHRydWU7XG4gIHNob3dOYXZpZ2F0aW9uQXJyb3dzID0gdHJ1ZTtcbiAgc2hvd05hdmlnYXRpb25JbmRpY2F0b3JzID0gdHJ1ZTtcbn1cbiIsImltcG9ydCB7XG4gIEFmdGVyQ29udGVudENoZWNrZWQsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBRdWVyeUxpc3QsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHtOZ2JDYXJvdXNlbENvbmZpZ30gZnJvbSAnLi9jYXJvdXNlbC1jb25maWcnO1xuXG5pbXBvcnQge21lcmdlLCBTdWJqZWN0LCB0aW1lcn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwLCBzd2l0Y2hNYXAsIHRha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGluZGl2aWR1YWwgc2xpZGUgdG8gYmUgdXNlZCB3aXRoaW4gYSBjYXJvdXNlbC5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JTbGlkZV0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JTbGlkZSB7XG4gIC8qKlxuICAgKiBVbmlxdWUgc2xpZGUgaWRlbnRpZmllci4gTXVzdCBiZSB1bmlxdWUgZm9yIHRoZSBlbnRpcmUgZG9jdW1lbnQgZm9yIHByb3BlciBhY2Nlc3NpYmlsaXR5IHN1cHBvcnQuXG4gICAqIFdpbGwgYmUgYXV0by1nZW5lcmF0ZWQgaWYgbm90IHByb3ZpZGVkLlxuICAgKi9cbiAgQElucHV0KCkgaWQgPSBgbmdiLXNsaWRlLSR7bmV4dElkKyt9YDtcbiAgY29uc3RydWN0b3IocHVibGljIHRwbFJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gZWFzaWx5IGNyZWF0ZSBjYXJvdXNlbHMgYmFzZWQgb24gQm9vdHN0cmFwJ3MgbWFya3VwLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItY2Fyb3VzZWwnLFxuICBleHBvcnRBczogJ25nYkNhcm91c2VsJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnY2Fyb3VzZWwgc2xpZGUnLFxuICAgICdbc3R5bGUuZGlzcGxheV0nOiAnXCJibG9ja1wiJyxcbiAgICAndGFiSW5kZXgnOiAnMCcsXG4gICAgJyhtb3VzZWVudGVyKSc6ICdwYXVzZU9uSG92ZXIgJiYgcGF1c2UoKScsXG4gICAgJyhtb3VzZWxlYXZlKSc6ICdwYXVzZU9uSG92ZXIgJiYgY3ljbGUoKScsXG4gICAgJyhrZXlkb3duLmFycm93TGVmdCknOiAna2V5Ym9hcmQgJiYgcHJldigpJyxcbiAgICAnKGtleWRvd24uYXJyb3dSaWdodCknOiAna2V5Ym9hcmQgJiYgbmV4dCgpJ1xuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxvbCBjbGFzcz1cImNhcm91c2VsLWluZGljYXRvcnNcIiAqbmdJZj1cInNob3dOYXZpZ2F0aW9uSW5kaWNhdG9yc1wiPlxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBzbGlkZSBvZiBzbGlkZXNcIiBbaWRdPVwic2xpZGUuaWRcIiBbY2xhc3MuYWN0aXZlXT1cInNsaWRlLmlkID09PSBhY3RpdmVJZFwiXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdChzbGlkZS5pZCk7IHBhdXNlT25Ib3ZlciAmJiBwYXVzZSgpXCI+PC9saT5cbiAgICA8L29sPlxuICAgIDxkaXYgY2xhc3M9XCJjYXJvdXNlbC1pbm5lclwiPlxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgc2xpZGUgb2Ygc2xpZGVzXCIgY2xhc3M9XCJjYXJvdXNlbC1pdGVtXCIgW2NsYXNzLmFjdGl2ZV09XCJzbGlkZS5pZCA9PT0gYWN0aXZlSWRcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInNsaWRlLnRwbFJlZlwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8YSBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtcHJldlwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwicHJldigpXCIgKm5nSWY9XCJzaG93TmF2aWdhdGlvbkFycm93c1wiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLXByZXYtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi5jYXJvdXNlbC5wcmV2aW91c1wiPlByZXZpb3VzPC9zcGFuPlxuICAgIDwvYT5cbiAgICA8YSBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtbmV4dFwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwibmV4dCgpXCIgKm5nSWY9XCJzaG93TmF2aWdhdGlvbkFycm93c1wiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLW5leHQtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi5jYXJvdXNlbC5uZXh0XCI+TmV4dDwvc3Bhbj5cbiAgICA8L2E+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTmdiQ2Fyb3VzZWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkLFxuICAgIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JTbGlkZSkgc2xpZGVzOiBRdWVyeUxpc3Q8TmdiU2xpZGU+O1xuXG4gIHByaXZhdGUgX2Rlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfc3RhcnQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfc3RvcCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBUaGUgYWN0aXZlIHNsaWRlIGlkLlxuICAgKi9cbiAgQElucHV0KCkgYWN0aXZlSWQ6IHN0cmluZztcblxuXG4gIC8qKlxuICAgKiBBbW91bnQgb2YgdGltZSBpbiBtaWxsaXNlY29uZHMgYmVmb3JlIG5leHQgc2xpZGUgaXMgc2hvd24uXG4gICAqL1xuICBASW5wdXQoKSBpbnRlcnZhbDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIGNhbiB3cmFwIGZyb20gdGhlIGxhc3QgdG8gdGhlIGZpcnN0IHNsaWRlLlxuICAgKi9cbiAgQElucHV0KCkgd3JhcDogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBmbGFnIGZvciBhbGxvd2luZyBuYXZpZ2F0aW9uIHZpYSBrZXlib2FyZFxuICAgKi9cbiAgQElucHV0KCkga2V5Ym9hcmQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgZmxhZyB0byBlbmFibGUgc2xpZGUgY3ljbGluZyBwYXVzZS9yZXN1bWUgb24gbW91c2VvdmVyLlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIEBJbnB1dCgpIHBhdXNlT25Ib3ZlcjogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBmbGFnIHRvIHNob3cgLyBoaWRlIG5hdmlnYXRpb24gYXJyb3dzLlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIEBJbnB1dCgpIHNob3dOYXZpZ2F0aW9uQXJyb3dzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBIGZsYWcgdG8gc2hvdyAvIGhpZGUgbmF2aWdhdGlvbiBpbmRpY2F0b3JzLlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIEBJbnB1dCgpIHNob3dOYXZpZ2F0aW9uSW5kaWNhdG9yczogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBjYXJvdXNlbCBzbGlkZSBldmVudCBmaXJlZCB3aGVuIHRoZSBzbGlkZSB0cmFuc2l0aW9uIGlzIGNvbXBsZXRlZC5cbiAgICogU2VlIE5nYlNsaWRlRXZlbnQgZm9yIHBheWxvYWQgZGV0YWlsc1xuICAgKi9cbiAgQE91dHB1dCgpIHNsaWRlID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JTbGlkZUV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgY29uZmlnOiBOZ2JDYXJvdXNlbENvbmZpZywgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBfcGxhdGZvcm1JZCwgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgICBwcml2YXRlIF9jZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLmludGVydmFsID0gY29uZmlnLmludGVydmFsO1xuICAgIHRoaXMud3JhcCA9IGNvbmZpZy53cmFwO1xuICAgIHRoaXMua2V5Ym9hcmQgPSBjb25maWcua2V5Ym9hcmQ7XG4gICAgdGhpcy5wYXVzZU9uSG92ZXIgPSBjb25maWcucGF1c2VPbkhvdmVyO1xuICAgIHRoaXMuc2hvd05hdmlnYXRpb25BcnJvd3MgPSBjb25maWcuc2hvd05hdmlnYXRpb25BcnJvd3M7XG4gICAgdGhpcy5zaG93TmF2aWdhdGlvbkluZGljYXRvcnMgPSBjb25maWcuc2hvd05hdmlnYXRpb25JbmRpY2F0b3JzO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIC8vIHNldEludGVydmFsKCkgZG9lc24ndCBwbGF5IHdlbGwgd2l0aCBTU1IgYW5kIHByb3RyYWN0b3IsXG4gICAgLy8gc28gd2Ugc2hvdWxkIHJ1biBpdCBpbiB0aGUgYnJvd3NlciBhbmQgb3V0c2lkZSBBbmd1bGFyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMuX3BsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLl9zdGFydCRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoKSA9PiB0aGlzLmludGVydmFsKSwgZmlsdGVyKGludGVydmFsID0+IGludGVydmFsID4gMCAmJiB0aGlzLnNsaWRlcy5sZW5ndGggPiAwKSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoaW50ZXJ2YWwgPT4gdGltZXIoaW50ZXJ2YWwpLnBpcGUodGFrZVVudGlsKG1lcmdlKHRoaXMuX3N0b3AkLCB0aGlzLl9kZXN0cm95JCkpKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5uZXh0KCkpKTtcblxuICAgICAgICB0aGlzLl9zdGFydCQubmV4dCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5zbGlkZXMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9jZC5tYXJrRm9yQ2hlY2soKSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgbGV0IGFjdGl2ZVNsaWRlID0gdGhpcy5fZ2V0U2xpZGVCeUlkKHRoaXMuYWN0aXZlSWQpO1xuICAgIHRoaXMuYWN0aXZlSWQgPSBhY3RpdmVTbGlkZSA/IGFjdGl2ZVNsaWRlLmlkIDogKHRoaXMuc2xpZGVzLmxlbmd0aCA/IHRoaXMuc2xpZGVzLmZpcnN0LmlkIDogbnVsbCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHsgdGhpcy5fZGVzdHJveSQubmV4dCgpOyB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xuICAgIGlmICgnaW50ZXJ2YWwnIGluIGNoYW5nZXMgJiYgIWNoYW5nZXNbJ2ludGVydmFsJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLl9zdGFydCQubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZSB0byBhIHNsaWRlIHdpdGggdGhlIHNwZWNpZmllZCBpZGVudGlmaWVyLlxuICAgKi9cbiAgc2VsZWN0KHNsaWRlSWQ6IHN0cmluZykgeyB0aGlzLl9jeWNsZVRvU2VsZWN0ZWQoc2xpZGVJZCwgdGhpcy5fZ2V0U2xpZGVFdmVudERpcmVjdGlvbih0aGlzLmFjdGl2ZUlkLCBzbGlkZUlkKSk7IH1cblxuICAvKipcbiAgICogTmF2aWdhdGUgdG8gdGhlIG5leHQgc2xpZGUuXG4gICAqL1xuICBwcmV2KCkgeyB0aGlzLl9jeWNsZVRvU2VsZWN0ZWQodGhpcy5fZ2V0UHJldlNsaWRlKHRoaXMuYWN0aXZlSWQpLCBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLlJJR0hUKTsgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZSB0byB0aGUgbmV4dCBzbGlkZS5cbiAgICovXG4gIG5leHQoKSB7IHRoaXMuX2N5Y2xlVG9TZWxlY3RlZCh0aGlzLl9nZXROZXh0U2xpZGUodGhpcy5hY3RpdmVJZCksIE5nYlNsaWRlRXZlbnREaXJlY3Rpb24uTEVGVCk7IH1cblxuICAvKipcbiAgICogU3RvcHMgdGhlIGNhcm91c2VsIGZyb20gY3ljbGluZyB0aHJvdWdoIGl0ZW1zLlxuICAgKi9cbiAgcGF1c2UoKSB7IHRoaXMuX3N0b3AkLm5leHQoKTsgfVxuXG4gIC8qKlxuICAgKiBSZXN0YXJ0cyBjeWNsaW5nIHRocm91Z2ggdGhlIGNhcm91c2VsIHNsaWRlcyBmcm9tIGxlZnQgdG8gcmlnaHQuXG4gICAqL1xuICBjeWNsZSgpIHsgdGhpcy5fc3RhcnQkLm5leHQoKTsgfVxuXG4gIHByaXZhdGUgX2N5Y2xlVG9TZWxlY3RlZChzbGlkZUlkeDogc3RyaW5nLCBkaXJlY3Rpb246IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24pIHtcbiAgICBsZXQgc2VsZWN0ZWRTbGlkZSA9IHRoaXMuX2dldFNsaWRlQnlJZChzbGlkZUlkeCk7XG4gICAgaWYgKHNlbGVjdGVkU2xpZGUgJiYgc2VsZWN0ZWRTbGlkZS5pZCAhPT0gdGhpcy5hY3RpdmVJZCkge1xuICAgICAgdGhpcy5zbGlkZS5lbWl0KHtwcmV2OiB0aGlzLmFjdGl2ZUlkLCBjdXJyZW50OiBzZWxlY3RlZFNsaWRlLmlkLCBkaXJlY3Rpb246IGRpcmVjdGlvbn0pO1xuICAgICAgdGhpcy5fc3RhcnQkLm5leHQoKTtcbiAgICAgIHRoaXMuYWN0aXZlSWQgPSBzZWxlY3RlZFNsaWRlLmlkO1xuICAgIH1cblxuICAgIC8vIHdlIGdldCBoZXJlIGFmdGVyIHRoZSBpbnRlcnZhbCBmaXJlcyBvciBhbnkgZXh0ZXJuYWwgQVBJIGNhbGwgbGlrZSBuZXh0KCksIHByZXYoKSBvciBzZWxlY3QoKVxuICAgIHRoaXMuX2NkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0U2xpZGVFdmVudERpcmVjdGlvbihjdXJyZW50QWN0aXZlU2xpZGVJZDogc3RyaW5nLCBuZXh0QWN0aXZlU2xpZGVJZDogc3RyaW5nKTogTmdiU2xpZGVFdmVudERpcmVjdGlvbiB7XG4gICAgY29uc3QgY3VycmVudEFjdGl2ZVNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRBY3RpdmVTbGlkZUlkKTtcbiAgICBjb25zdCBuZXh0QWN0aXZlU2xpZGVJZHggPSB0aGlzLl9nZXRTbGlkZUlkeEJ5SWQobmV4dEFjdGl2ZVNsaWRlSWQpO1xuXG4gICAgcmV0dXJuIGN1cnJlbnRBY3RpdmVTbGlkZUlkeCA+IG5leHRBY3RpdmVTbGlkZUlkeCA/IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24uUklHSFQgOiBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLkxFRlQ7XG4gIH1cblxuICBwcml2YXRlIF9nZXRTbGlkZUJ5SWQoc2xpZGVJZDogc3RyaW5nKTogTmdiU2xpZGUgeyByZXR1cm4gdGhpcy5zbGlkZXMuZmluZChzbGlkZSA9PiBzbGlkZS5pZCA9PT0gc2xpZGVJZCk7IH1cblxuICBwcml2YXRlIF9nZXRTbGlkZUlkeEJ5SWQoc2xpZGVJZDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zbGlkZXMudG9BcnJheSgpLmluZGV4T2YodGhpcy5fZ2V0U2xpZGVCeUlkKHNsaWRlSWQpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE5leHRTbGlkZShjdXJyZW50U2xpZGVJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBzbGlkZUFyciA9IHRoaXMuc2xpZGVzLnRvQXJyYXkoKTtcbiAgICBjb25zdCBjdXJyZW50U2xpZGVJZHggPSB0aGlzLl9nZXRTbGlkZUlkeEJ5SWQoY3VycmVudFNsaWRlSWQpO1xuICAgIGNvbnN0IGlzTGFzdFNsaWRlID0gY3VycmVudFNsaWRlSWR4ID09PSBzbGlkZUFyci5sZW5ndGggLSAxO1xuXG4gICAgcmV0dXJuIGlzTGFzdFNsaWRlID8gKHRoaXMud3JhcCA/IHNsaWRlQXJyWzBdLmlkIDogc2xpZGVBcnJbc2xpZGVBcnIubGVuZ3RoIC0gMV0uaWQpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZUFycltjdXJyZW50U2xpZGVJZHggKyAxXS5pZDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFByZXZTbGlkZShjdXJyZW50U2xpZGVJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBzbGlkZUFyciA9IHRoaXMuc2xpZGVzLnRvQXJyYXkoKTtcbiAgICBjb25zdCBjdXJyZW50U2xpZGVJZHggPSB0aGlzLl9nZXRTbGlkZUlkeEJ5SWQoY3VycmVudFNsaWRlSWQpO1xuICAgIGNvbnN0IGlzRmlyc3RTbGlkZSA9IGN1cnJlbnRTbGlkZUlkeCA9PT0gMDtcblxuICAgIHJldHVybiBpc0ZpcnN0U2xpZGUgPyAodGhpcy53cmFwID8gc2xpZGVBcnJbc2xpZGVBcnIubGVuZ3RoIC0gMV0uaWQgOiBzbGlkZUFyclswXS5pZCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZUFycltjdXJyZW50U2xpZGVJZHggLSAxXS5pZDtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBwYXlsb2FkIG9mIHRoZSBzbGlkZSBldmVudCBmaXJlZCB3aGVuIHRoZSBzbGlkZSB0cmFuc2l0aW9uIGlzIGNvbXBsZXRlZFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYlNsaWRlRXZlbnQge1xuICAvKipcbiAgICogUHJldmlvdXMgc2xpZGUgaWRcbiAgICovXG4gIHByZXY6IHN0cmluZztcblxuICAvKipcbiAgICogTmV3IHNsaWRlIGlkc1xuICAgKi9cbiAgY3VycmVudDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBTbGlkZSBldmVudCBkaXJlY3Rpb25cbiAgICovXG4gIGRpcmVjdGlvbjogTmdiU2xpZGVFdmVudERpcmVjdGlvbjtcbn1cblxuLyoqXG4gKiBFbnVtIHRvIGRlZmluZSB0aGUgY2Fyb3VzZWwgc2xpZGUgZXZlbnQgZGlyZWN0aW9uXG4gKi9cbmV4cG9ydCBlbnVtIE5nYlNsaWRlRXZlbnREaXJlY3Rpb24ge1xuICBMRUZUID0gPGFueT4nbGVmdCcsXG4gIFJJR0hUID0gPGFueT4ncmlnaHQnXG59XG5cbmV4cG9ydCBjb25zdCBOR0JfQ0FST1VTRUxfRElSRUNUSVZFUyA9IFtOZ2JDYXJvdXNlbCwgTmdiU2xpZGVdO1xuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHtOR0JfQ0FST1VTRUxfRElSRUNUSVZFU30gZnJvbSAnLi9jYXJvdXNlbCc7XG5cbmV4cG9ydCB7TmdiQ2Fyb3VzZWwsIE5nYlNsaWRlLCBOZ2JTbGlkZUV2ZW50fSBmcm9tICcuL2Nhcm91c2VsJztcbmV4cG9ydCB7TmdiQ2Fyb3VzZWxDb25maWd9IGZyb20gJy4vY2Fyb3VzZWwtY29uZmlnJztcblxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IE5HQl9DQVJPVVNFTF9ESVJFQ1RJVkVTLCBleHBvcnRzOiBOR0JfQ0FST1VTRUxfRElSRUNUSVZFUywgaW1wb3J0czogW0NvbW1vbk1vZHVsZV19KVxuZXhwb3J0IGNsYXNzIE5nYkNhcm91c2VsTW9kdWxlIHtcbiAgLyoqXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxuICAgKi9cbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYkNhcm91c2VsTW9kdWxlfTsgfVxufVxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBUaGUgTmdiQ29sbGFwc2UgZGlyZWN0aXZlIHByb3ZpZGVzIGEgc2ltcGxlIHdheSB0byBoaWRlIGFuZCBzaG93IGFuIGVsZW1lbnQgd2l0aCBhbmltYXRpb25zLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdiQ29sbGFwc2VdJyxcbiAgZXhwb3J0QXM6ICduZ2JDb2xsYXBzZScsXG4gIGhvc3Q6IHsnW2NsYXNzLmNvbGxhcHNlXSc6ICd0cnVlJywgJ1tjbGFzcy5zaG93XSc6ICchY29sbGFwc2VkJ31cbn0pXG5leHBvcnQgY2xhc3MgTmdiQ29sbGFwc2Uge1xuICAvKipcbiAgICogQSBmbGFnIGluZGljYXRpbmcgY29sbGFwc2VkICh0cnVlKSBvciBvcGVuIChmYWxzZSkgc3RhdGUuXG4gICAqL1xuICBASW5wdXQoJ25nYkNvbGxhcHNlJykgY29sbGFwc2VkID0gZmFsc2U7XG59XG4iLCJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdiQ29sbGFwc2V9IGZyb20gJy4vY29sbGFwc2UnO1xuXG5leHBvcnQge05nYkNvbGxhcHNlfSBmcm9tICcuL2NvbGxhcHNlJztcblxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IFtOZ2JDb2xsYXBzZV0sIGV4cG9ydHM6IFtOZ2JDb2xsYXBzZV19KVxuZXhwb3J0IGNsYXNzIE5nYkNvbGxhcHNlTW9kdWxlIHtcbiAgLyoqXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxuICAgKi9cbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYkNvbGxhcHNlTW9kdWxlfTsgfVxufVxuIiwiaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XG5pbXBvcnQge2lzSW50ZWdlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuLyoqXG4gKiBTaW1wbGUgY2xhc3MgdXNlZCBmb3IgYSBkYXRlIHJlcHJlc2VudGF0aW9uIHRoYXQgZGF0ZXBpY2tlciBhbHNvIHVzZXMgaW50ZXJuYWxseVxuICpcbiAqIEBzaW5jZSAzLjAuMFxuICovXG5leHBvcnQgY2xhc3MgTmdiRGF0ZSBpbXBsZW1lbnRzIE5nYkRhdGVTdHJ1Y3Qge1xuICAvKipcbiAgICogVGhlIHllYXIsIGZvciBleGFtcGxlIDIwMTZcbiAgICovXG4gIHllYXI6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIG1vbnRoLCBmb3IgZXhhbXBsZSAxPUphbiAuLi4gMTI9RGVjIGFzIGluIElTTyA4NjAxXG4gICAqL1xuICBtb250aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF5IG9mIG1vbnRoLCBzdGFydGluZyB3aXRoIDFcbiAgICovXG4gIGRheTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBTdGF0aWMgbWV0aG9kLiBDcmVhdGVzIGEgbmV3IGRhdGUgb2JqZWN0IGZyb20gdGhlIE5nYkRhdGVTdHJ1Y3QsIGV4LiBOZ2JEYXRlLmZyb20oe3llYXI6IDIwMDAsXG4gICAqIG1vbnRoOiA1LCBkYXk6IDF9KS4gSWYgdGhlICdkYXRlJyBpcyBhbHJlYWR5IG9mIE5nYkRhdGUsIHRoZSBtZXRob2Qgd2lsbCByZXR1cm4gdGhlIHNhbWUgb2JqZWN0XG4gICAqL1xuICBzdGF0aWMgZnJvbShkYXRlOiBOZ2JEYXRlU3RydWN0KTogTmdiRGF0ZSB7XG4gICAgaWYgKGRhdGUgaW5zdGFuY2VvZiBOZ2JEYXRlKSB7XG4gICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGUgPyBuZXcgTmdiRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIGRhdGUuZGF5KSA6IG51bGw7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcih5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKSB7XG4gICAgdGhpcy55ZWFyID0gaXNJbnRlZ2VyKHllYXIpID8geWVhciA6IG51bGw7XG4gICAgdGhpcy5tb250aCA9IGlzSW50ZWdlcihtb250aCkgPyBtb250aCA6IG51bGw7XG4gICAgdGhpcy5kYXkgPSBpc0ludGVnZXIoZGF5KSA/IGRheSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGN1cnJlbnQgZGF0ZSBpcyBlcXVhbCB0byBhbm90aGVyIGRhdGVcbiAgICovXG4gIGVxdWFscyhvdGhlcjogTmdiRGF0ZVN0cnVjdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBvdGhlciAmJiB0aGlzLnllYXIgPT09IG90aGVyLnllYXIgJiYgdGhpcy5tb250aCA9PT0gb3RoZXIubW9udGggJiYgdGhpcy5kYXkgPT09IG90aGVyLmRheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgY3VycmVudCBkYXRlIGlzIGJlZm9yZSBhbm90aGVyIGRhdGVcbiAgICovXG4gIGJlZm9yZShvdGhlcjogTmdiRGF0ZVN0cnVjdCk6IGJvb2xlYW4ge1xuICAgIGlmICghb3RoZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy55ZWFyID09PSBvdGhlci55ZWFyKSB7XG4gICAgICBpZiAodGhpcy5tb250aCA9PT0gb3RoZXIubW9udGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF5ID09PSBvdGhlci5kYXkgPyBmYWxzZSA6IHRoaXMuZGF5IDwgb3RoZXIuZGF5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9udGggPCBvdGhlci5tb250aDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMueWVhciA8IG90aGVyLnllYXI7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBjdXJyZW50IGRhdGUgaXMgYWZ0ZXIgYW5vdGhlciBkYXRlXG4gICAqL1xuICBhZnRlcihvdGhlcjogTmdiRGF0ZVN0cnVjdCk6IGJvb2xlYW4ge1xuICAgIGlmICghb3RoZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMueWVhciA9PT0gb3RoZXIueWVhcikge1xuICAgICAgaWYgKHRoaXMubW9udGggPT09IG90aGVyLm1vbnRoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRheSA9PT0gb3RoZXIuZGF5ID8gZmFsc2UgOiB0aGlzLmRheSA+IG90aGVyLmRheTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vbnRoID4gb3RoZXIubW9udGg7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnllYXIgPiBvdGhlci55ZWFyO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2lzSW50ZWdlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21KU0RhdGUoanNEYXRlOiBEYXRlKSB7XG4gIHJldHVybiBuZXcgTmdiRGF0ZShqc0RhdGUuZ2V0RnVsbFllYXIoKSwganNEYXRlLmdldE1vbnRoKCkgKyAxLCBqc0RhdGUuZ2V0RGF0ZSgpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0b0pTRGF0ZShkYXRlOiBOZ2JEYXRlKSB7XG4gIGNvbnN0IGpzRGF0ZSA9IG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCAtIDEsIGRhdGUuZGF5LCAxMik7XG4gIC8vIHRoaXMgaXMgZG9uZSBhdm9pZCAzMCAtPiAxOTMwIGNvbnZlcnNpb25cbiAgaWYgKCFpc05hTihqc0RhdGUuZ2V0VGltZSgpKSkge1xuICAgIGpzRGF0ZS5zZXRGdWxsWWVhcihkYXRlLnllYXIpO1xuICB9XG4gIHJldHVybiBqc0RhdGU7XG59XG5cbmV4cG9ydCB0eXBlIE5nYlBlcmlvZCA9ICd5JyB8ICdtJyB8ICdkJztcblxuZXhwb3J0IGZ1bmN0aW9uIE5HQl9EQVRFUElDS0VSX0NBTEVOREFSX0ZBQ1RPUlkoKSB7XG4gIHJldHVybiBuZXcgTmdiQ2FsZW5kYXJHcmVnb3JpYW4oKTtcbn1cblxuLyoqXG4gKiBDYWxlbmRhciB1c2VkIGJ5IHRoZSBkYXRlcGlja2VyLlxuICogRGVmYXVsdCBpbXBsZW1lbnRhdGlvbiB1c2VzIEdyZWdvcmlhbiBjYWxlbmRhci5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogTkdCX0RBVEVQSUNLRVJfQ0FMRU5EQVJfRkFDVE9SWX0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdiQ2FsZW5kYXIge1xuICAvKipcbiAgICogUmV0dXJucyBudW1iZXIgb2YgZGF5cyBwZXIgd2Vlay5cbiAgICovXG4gIGFic3RyYWN0IGdldERheXNQZXJXZWVrKCk6IG51bWJlcjtcblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSBvZiBtb250aHMgcGVyIHllYXIuXG4gICAqIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDEgYW5kIHJldHVybiBbMSwgMiwgLi4uLCAxMl07XG4gICAqL1xuICBhYnN0cmFjdCBnZXRNb250aHMoeWVhcj86IG51bWJlcik6IG51bWJlcltdO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIG51bWJlciBvZiB3ZWVrcyBwZXIgbW9udGguXG4gICAqL1xuICBhYnN0cmFjdCBnZXRXZWVrc1Blck1vbnRoKCk6IG51bWJlcjtcblxuICAvKipcbiAgICogUmV0dXJucyB3ZWVrZGF5IG51bWJlciBmb3IgYSBnaXZlbiBkYXkuXG4gICAqIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICd3ZWVrZGF5JyBpcyAxPU1vbiAuLi4gNz1TdW5cbiAgICovXG4gIGFic3RyYWN0IGdldFdlZWtkYXkoZGF0ZTogTmdiRGF0ZSk6IG51bWJlcjtcblxuICAvKipcbiAgICogQWRkcyBhIG51bWJlciBvZiB5ZWFycywgbW9udGhzIG9yIGRheXMgdG8gYSBnaXZlbiBkYXRlLlxuICAgKiBQZXJpb2QgY2FuIGJlICd5JywgJ20nIG9yICdkJyBhbmQgZGVmYXVsdHMgdG8gZGF5LlxuICAgKiBOdW1iZXIgZGVmYXVsdHMgdG8gMS5cbiAgICovXG4gIGFic3RyYWN0IGdldE5leHQoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kPzogTmdiUGVyaW9kLCBudW1iZXI/OiBudW1iZXIpOiBOZ2JEYXRlO1xuXG4gIC8qKlxuICAgKiBTdWJ0cmFjdHMgYSBudW1iZXIgb2YgeWVhcnMsIG1vbnRocyBvciBkYXlzIGZyb20gYSBnaXZlbiBkYXRlLlxuICAgKiBQZXJpb2QgY2FuIGJlICd5JywgJ20nIG9yICdkJyBhbmQgZGVmYXVsdHMgdG8gZGF5LlxuICAgKiBOdW1iZXIgZGVmYXVsdHMgdG8gMS5cbiAgICovXG4gIGFic3RyYWN0IGdldFByZXYoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kPzogTmdiUGVyaW9kLCBudW1iZXI/OiBudW1iZXIpOiBOZ2JEYXRlO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdlZWsgbnVtYmVyIGZvciBhIGdpdmVuIHdlZWsuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRXZWVrTnVtYmVyKHdlZWs6IE5nYkRhdGVbXSwgZmlyc3REYXlPZldlZWs6IG51bWJlcik6IG51bWJlcjtcblxuICAvKipcbiAgICogUmV0dXJucyB0b2RheSdzIGRhdGUuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRUb2RheSgpOiBOZ2JEYXRlO1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYSBkYXRlIGlzIHZhbGlkIGZvciBhIGN1cnJlbnQgY2FsZW5kYXIuXG4gICAqL1xuICBhYnN0cmFjdCBpc1ZhbGlkKGRhdGU6IE5nYkRhdGUpOiBib29sZWFuO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiQ2FsZW5kYXJHcmVnb3JpYW4gZXh0ZW5kcyBOZ2JDYWxlbmRhciB7XG4gIGdldERheXNQZXJXZWVrKCkgeyByZXR1cm4gNzsgfVxuXG4gIGdldE1vbnRocygpIHsgcmV0dXJuIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyXTsgfVxuXG4gIGdldFdlZWtzUGVyTW9udGgoKSB7IHJldHVybiA2OyB9XG5cbiAgZ2V0TmV4dChkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkge1xuICAgIGxldCBqc0RhdGUgPSB0b0pTRGF0ZShkYXRlKTtcblxuICAgIHN3aXRjaCAocGVyaW9kKSB7XG4gICAgICBjYXNlICd5JzpcbiAgICAgICAgcmV0dXJuIG5ldyBOZ2JEYXRlKGRhdGUueWVhciArIG51bWJlciwgMSwgMSk7XG4gICAgICBjYXNlICdtJzpcbiAgICAgICAganNEYXRlID0gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoICsgbnVtYmVyIC0gMSwgMSwgMTIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2QnOlxuICAgICAgICBqc0RhdGUuc2V0RGF0ZShqc0RhdGUuZ2V0RGF0ZSgpICsgbnVtYmVyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnJvbUpTRGF0ZShqc0RhdGUpO1xuICB9XG5cbiAgZ2V0UHJldihkYXRlOiBOZ2JEYXRlLCBwZXJpb2Q6IE5nYlBlcmlvZCA9ICdkJywgbnVtYmVyID0gMSkgeyByZXR1cm4gdGhpcy5nZXROZXh0KGRhdGUsIHBlcmlvZCwgLW51bWJlcik7IH1cblxuICBnZXRXZWVrZGF5KGRhdGU6IE5nYkRhdGUpIHtcbiAgICBsZXQganNEYXRlID0gdG9KU0RhdGUoZGF0ZSk7XG4gICAgbGV0IGRheSA9IGpzRGF0ZS5nZXREYXkoKTtcbiAgICAvLyBpbiBKUyBEYXRlIFN1bj0wLCBpbiBJU08gODYwMSBTdW49N1xuICAgIHJldHVybiBkYXkgPT09IDAgPyA3IDogZGF5O1xuICB9XG5cbiAgZ2V0V2Vla051bWJlcih3ZWVrOiBOZ2JEYXRlW10sIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpIHtcbiAgICAvLyBpbiBKUyBEYXRlIFN1bj0wLCBpbiBJU08gODYwMSBTdW49N1xuICAgIGlmIChmaXJzdERheU9mV2VlayA9PT0gNykge1xuICAgICAgZmlyc3REYXlPZldlZWsgPSAwO1xuICAgIH1cblxuICAgIGNvbnN0IHRodXJzZGF5SW5kZXggPSAoNCArIDcgLSBmaXJzdERheU9mV2VlaykgJSA3O1xuICAgIGxldCBkYXRlID0gd2Vla1t0aHVyc2RheUluZGV4XTtcblxuICAgIGNvbnN0IGpzRGF0ZSA9IHRvSlNEYXRlKGRhdGUpO1xuICAgIGpzRGF0ZS5zZXREYXRlKGpzRGF0ZS5nZXREYXRlKCkgKyA0IC0gKGpzRGF0ZS5nZXREYXkoKSB8fCA3KSk7ICAvLyBUaHVyc2RheVxuICAgIGNvbnN0IHRpbWUgPSBqc0RhdGUuZ2V0VGltZSgpO1xuICAgIGpzRGF0ZS5zZXRNb250aCgwKTsgIC8vIENvbXBhcmUgd2l0aCBKYW4gMVxuICAgIGpzRGF0ZS5zZXREYXRlKDEpO1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucm91bmQoKHRpbWUgLSBqc0RhdGUuZ2V0VGltZSgpKSAvIDg2NDAwMDAwKSAvIDcpICsgMTtcbiAgfVxuXG4gIGdldFRvZGF5KCk6IE5nYkRhdGUgeyByZXR1cm4gZnJvbUpTRGF0ZShuZXcgRGF0ZSgpKTsgfVxuXG4gIGlzVmFsaWQoZGF0ZTogTmdiRGF0ZSk6IGJvb2xlYW4ge1xuICAgIGlmICghZGF0ZSB8fCAhaXNJbnRlZ2VyKGRhdGUueWVhcikgfHwgIWlzSW50ZWdlcihkYXRlLm1vbnRoKSB8fCAhaXNJbnRlZ2VyKGRhdGUuZGF5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIHllYXIgMCBkb2Vzbid0IGV4aXN0IGluIEdyZWdvcmlhbiBjYWxlbmRhclxuICAgIGlmIChkYXRlLnllYXIgPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBqc0RhdGUgPSB0b0pTRGF0ZShkYXRlKTtcblxuICAgIHJldHVybiAhaXNOYU4oanNEYXRlLmdldFRpbWUoKSkgJiYganNEYXRlLmdldEZ1bGxZZWFyKCkgPT09IGRhdGUueWVhciAmJiBqc0RhdGUuZ2V0TW9udGgoKSArIDEgPT09IGRhdGUubW9udGggJiZcbiAgICAgICAganNEYXRlLmdldERhdGUoKSA9PT0gZGF0ZS5kYXk7XG4gIH1cbn1cbiIsImltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XG5pbXBvcnQge0RhdGVwaWNrZXJWaWV3TW9kZWwsIERheVZpZXdNb2RlbCwgTW9udGhWaWV3TW9kZWx9IGZyb20gJy4vZGF0ZXBpY2tlci12aWV3LW1vZGVsJztcbmltcG9ydCB7TmdiQ2FsZW5kYXJ9IGZyb20gJy4vbmdiLWNhbGVuZGFyJztcbmltcG9ydCB7aXNEZWZpbmVkfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNDaGFuZ2VkRGF0ZShwcmV2OiBOZ2JEYXRlLCBuZXh0OiBOZ2JEYXRlKSB7XG4gIHJldHVybiAhZGF0ZUNvbXBhcmF0b3IocHJldiwgbmV4dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkYXRlQ29tcGFyYXRvcihwcmV2OiBOZ2JEYXRlLCBuZXh0OiBOZ2JEYXRlKSB7XG4gIHJldHVybiAoIXByZXYgJiYgIW5leHQpIHx8ICghIXByZXYgJiYgISFuZXh0ICYmIHByZXYuZXF1YWxzKG5leHQpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrTWluQmVmb3JlTWF4KG1pbkRhdGU6IE5nYkRhdGUsIG1heERhdGU6IE5nYkRhdGUpIHtcbiAgaWYgKG1heERhdGUgJiYgbWluRGF0ZSAmJiBtYXhEYXRlLmJlZm9yZShtaW5EYXRlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJ21heERhdGUnICR7bWF4RGF0ZX0gc2hvdWxkIGJlIGdyZWF0ZXIgdGhhbiAnbWluRGF0ZScgJHttaW5EYXRlfWApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0RhdGVJblJhbmdlKGRhdGU6IE5nYkRhdGUsIG1pbkRhdGU6IE5nYkRhdGUsIG1heERhdGU6IE5nYkRhdGUpOiBOZ2JEYXRlIHtcbiAgaWYgKGRhdGUgJiYgbWluRGF0ZSAmJiBkYXRlLmJlZm9yZShtaW5EYXRlKSkge1xuICAgIHJldHVybiBtaW5EYXRlO1xuICB9XG4gIGlmIChkYXRlICYmIG1heERhdGUgJiYgZGF0ZS5hZnRlcihtYXhEYXRlKSkge1xuICAgIHJldHVybiBtYXhEYXRlO1xuICB9XG5cbiAgcmV0dXJuIGRhdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGVTZWxlY3RhYmxlKGRhdGU6IE5nYkRhdGUsIHN0YXRlOiBEYXRlcGlja2VyVmlld01vZGVsKSB7XG4gIGNvbnN0IHttaW5EYXRlLCBtYXhEYXRlLCBkaXNhYmxlZCwgbWFya0Rpc2FibGVkfSA9IHN0YXRlO1xuICAvLyBjbGFuZy1mb3JtYXQgb2ZmXG4gIHJldHVybiAhKFxuICAgICFpc0RlZmluZWQoZGF0ZSkgfHxcbiAgICBkaXNhYmxlZCB8fFxuICAgIChtYXJrRGlzYWJsZWQgJiYgbWFya0Rpc2FibGVkKGRhdGUsIHt5ZWFyOiBkYXRlLnllYXIsIG1vbnRoOiBkYXRlLm1vbnRofSkpIHx8XG4gICAgKG1pbkRhdGUgJiYgZGF0ZS5iZWZvcmUobWluRGF0ZSkpIHx8XG4gICAgKG1heERhdGUgJiYgZGF0ZS5hZnRlcihtYXhEYXRlKSlcbiAgKTtcbiAgLy8gY2xhbmctZm9ybWF0IG9uXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVNlbGVjdEJveE1vbnRocyhjYWxlbmRhcjogTmdiQ2FsZW5kYXIsIGRhdGU6IE5nYkRhdGUsIG1pbkRhdGU6IE5nYkRhdGUsIG1heERhdGU6IE5nYkRhdGUpIHtcbiAgaWYgKCFkYXRlKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgbGV0IG1vbnRocyA9IGNhbGVuZGFyLmdldE1vbnRocyhkYXRlLnllYXIpO1xuXG4gIGlmIChtaW5EYXRlICYmIGRhdGUueWVhciA9PT0gbWluRGF0ZS55ZWFyKSB7XG4gICAgY29uc3QgaW5kZXggPSBtb250aHMuZmluZEluZGV4KG1vbnRoID0+IG1vbnRoID09PSBtaW5EYXRlLm1vbnRoKTtcbiAgICBtb250aHMgPSBtb250aHMuc2xpY2UoaW5kZXgpO1xuICB9XG5cbiAgaWYgKG1heERhdGUgJiYgZGF0ZS55ZWFyID09PSBtYXhEYXRlLnllYXIpIHtcbiAgICBjb25zdCBpbmRleCA9IG1vbnRocy5maW5kSW5kZXgobW9udGggPT4gbW9udGggPT09IG1heERhdGUubW9udGgpO1xuICAgIG1vbnRocyA9IG1vbnRocy5zbGljZSgwLCBpbmRleCArIDEpO1xuICB9XG5cbiAgcmV0dXJuIG1vbnRocztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlU2VsZWN0Qm94WWVhcnMoZGF0ZTogTmdiRGF0ZSwgbWluRGF0ZTogTmdiRGF0ZSwgbWF4RGF0ZTogTmdiRGF0ZSkge1xuICBpZiAoIWRhdGUpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdCBzdGFydCA9IG1pbkRhdGUgJiYgbWluRGF0ZS55ZWFyIHx8IGRhdGUueWVhciAtIDEwO1xuICBjb25zdCBlbmQgPSBtYXhEYXRlICYmIG1heERhdGUueWVhciB8fCBkYXRlLnllYXIgKyAxMDtcblxuICByZXR1cm4gQXJyYXkuZnJvbSh7bGVuZ3RoOiBlbmQgLSBzdGFydCArIDF9LCAoZSwgaSkgPT4gc3RhcnQgKyBpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5leHRNb250aERpc2FibGVkKGNhbGVuZGFyOiBOZ2JDYWxlbmRhciwgZGF0ZTogTmdiRGF0ZSwgbWF4RGF0ZTogTmdiRGF0ZSkge1xuICByZXR1cm4gbWF4RGF0ZSAmJiBjYWxlbmRhci5nZXROZXh0KGRhdGUsICdtJykuYWZ0ZXIobWF4RGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmV2TW9udGhEaXNhYmxlZChjYWxlbmRhcjogTmdiQ2FsZW5kYXIsIGRhdGU6IE5nYkRhdGUsIG1pbkRhdGU6IE5nYkRhdGUpIHtcbiAgY29uc3QgcHJldkRhdGUgPSBjYWxlbmRhci5nZXRQcmV2KGRhdGUsICdtJyk7XG4gIHJldHVybiBtaW5EYXRlICYmIChwcmV2RGF0ZS55ZWFyID09PSBtaW5EYXRlLnllYXIgJiYgcHJldkRhdGUubW9udGggPCBtaW5EYXRlLm1vbnRoIHx8XG4gICAgICAgICAgICAgICAgICAgICBwcmV2RGF0ZS55ZWFyIDwgbWluRGF0ZS55ZWFyICYmIG1pbkRhdGUubW9udGggPT09IDEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNb250aHMoXG4gICAgY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBkYXRlOiBOZ2JEYXRlLCBzdGF0ZTogRGF0ZXBpY2tlclZpZXdNb2RlbCwgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4sXG4gICAgZm9yY2U6IGJvb2xlYW4pOiBNb250aFZpZXdNb2RlbFtdIHtcbiAgY29uc3Qge2Rpc3BsYXlNb250aHMsIG1vbnRoc30gPSBzdGF0ZTtcbiAgLy8gbW92ZSBvbGQgbW9udGhzIHRvIGEgdGVtcG9yYXJ5IGFycmF5XG4gIGNvbnN0IG1vbnRoc1RvUmV1c2UgPSBtb250aHMuc3BsaWNlKDAsIG1vbnRocy5sZW5ndGgpO1xuXG4gIC8vIGdlbmVyYXRlIG5ldyBmaXJzdCBkYXRlcywgbnVsbGlmeSBvciByZXVzZSBtb250aHNcbiAgY29uc3QgZmlyc3REYXRlcyA9IEFycmF5LmZyb20oe2xlbmd0aDogZGlzcGxheU1vbnRoc30sIChfLCBpKSA9PiB7XG4gICAgY29uc3QgZmlyc3REYXRlID0gY2FsZW5kYXIuZ2V0TmV4dChkYXRlLCAnbScsIGkpO1xuICAgIG1vbnRoc1tpXSA9IG51bGw7XG5cbiAgICBpZiAoIWZvcmNlKSB7XG4gICAgICBjb25zdCByZXVzZWRJbmRleCA9IG1vbnRoc1RvUmV1c2UuZmluZEluZGV4KG1vbnRoID0+IG1vbnRoLmZpcnN0RGF0ZS5lcXVhbHMoZmlyc3REYXRlKSk7XG4gICAgICAvLyBtb3ZlIHJldXNlZCBtb250aCBiYWNrIHRvIG1vbnRoc1xuICAgICAgaWYgKHJldXNlZEluZGV4ICE9PSAtMSkge1xuICAgICAgICBtb250aHNbaV0gPSBtb250aHNUb1JldXNlLnNwbGljZShyZXVzZWRJbmRleCwgMSlbMF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpcnN0RGF0ZTtcbiAgfSk7XG5cbiAgLy8gcmVidWlsZCBudWxsaWZpZWQgbW9udGhzXG4gIGZpcnN0RGF0ZXMuZm9yRWFjaCgoZmlyc3REYXRlLCBpKSA9PiB7XG4gICAgaWYgKG1vbnRoc1tpXSA9PT0gbnVsbCkge1xuICAgICAgbW9udGhzW2ldID0gYnVpbGRNb250aChjYWxlbmRhciwgZmlyc3REYXRlLCBzdGF0ZSwgaTE4biwgbW9udGhzVG9SZXVzZS5zaGlmdCgpIHx8IHt9IGFzIE1vbnRoVmlld01vZGVsKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBtb250aHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZE1vbnRoKFxuICAgIGNhbGVuZGFyOiBOZ2JDYWxlbmRhciwgZGF0ZTogTmdiRGF0ZSwgc3RhdGU6IERhdGVwaWNrZXJWaWV3TW9kZWwsIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuLFxuICAgIG1vbnRoOiBNb250aFZpZXdNb2RlbCA9IHt9IGFzIE1vbnRoVmlld01vZGVsKTogTW9udGhWaWV3TW9kZWwge1xuICBjb25zdCB7ZGF5VGVtcGxhdGVEYXRhLCBtaW5EYXRlLCBtYXhEYXRlLCBmaXJzdERheU9mV2VlaywgbWFya0Rpc2FibGVkLCBvdXRzaWRlRGF5c30gPSBzdGF0ZTtcbiAgY29uc3QgY2FsZW5kYXJUb2RheSA9IGNhbGVuZGFyLmdldFRvZGF5KCk7XG5cbiAgbW9udGguZmlyc3REYXRlID0gbnVsbDtcbiAgbW9udGgubGFzdERhdGUgPSBudWxsO1xuICBtb250aC5udW1iZXIgPSBkYXRlLm1vbnRoO1xuICBtb250aC55ZWFyID0gZGF0ZS55ZWFyO1xuICBtb250aC53ZWVrcyA9IG1vbnRoLndlZWtzIHx8IFtdO1xuICBtb250aC53ZWVrZGF5cyA9IG1vbnRoLndlZWtkYXlzIHx8IFtdO1xuXG4gIGRhdGUgPSBnZXRGaXJzdFZpZXdEYXRlKGNhbGVuZGFyLCBkYXRlLCBmaXJzdERheU9mV2Vlayk7XG5cbiAgLy8gbW9udGggaGFzIHdlZWtzXG4gIGZvciAobGV0IHdlZWsgPSAwOyB3ZWVrIDwgY2FsZW5kYXIuZ2V0V2Vla3NQZXJNb250aCgpOyB3ZWVrKyspIHtcbiAgICBsZXQgd2Vla09iamVjdCA9IG1vbnRoLndlZWtzW3dlZWtdO1xuICAgIGlmICghd2Vla09iamVjdCkge1xuICAgICAgd2Vla09iamVjdCA9IG1vbnRoLndlZWtzW3dlZWtdID0ge251bWJlcjogMCwgZGF5czogW10sIGNvbGxhcHNlZDogdHJ1ZX07XG4gICAgfVxuICAgIGNvbnN0IGRheXMgPSB3ZWVrT2JqZWN0LmRheXM7XG5cbiAgICAvLyB3ZWVrIGhhcyBkYXlzXG4gICAgZm9yIChsZXQgZGF5ID0gMDsgZGF5IDwgY2FsZW5kYXIuZ2V0RGF5c1BlcldlZWsoKTsgZGF5KyspIHtcbiAgICAgIGlmICh3ZWVrID09PSAwKSB7XG4gICAgICAgIG1vbnRoLndlZWtkYXlzW2RheV0gPSBjYWxlbmRhci5nZXRXZWVrZGF5KGRhdGUpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdEYXRlID0gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRheSk7XG4gICAgICBjb25zdCBuZXh0RGF0ZSA9IGNhbGVuZGFyLmdldE5leHQobmV3RGF0ZSk7XG5cbiAgICAgIGNvbnN0IGFyaWFMYWJlbCA9IGkxOG4uZ2V0RGF5QXJpYUxhYmVsKG5ld0RhdGUpO1xuXG4gICAgICAvLyBtYXJraW5nIGRhdGUgYXMgZGlzYWJsZWRcbiAgICAgIGxldCBkaXNhYmxlZCA9ICEhKChtaW5EYXRlICYmIG5ld0RhdGUuYmVmb3JlKG1pbkRhdGUpKSB8fCAobWF4RGF0ZSAmJiBuZXdEYXRlLmFmdGVyKG1heERhdGUpKSk7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIG1hcmtEaXNhYmxlZCkge1xuICAgICAgICBkaXNhYmxlZCA9IG1hcmtEaXNhYmxlZChuZXdEYXRlLCB7bW9udGg6IG1vbnRoLm51bWJlciwgeWVhcjogbW9udGgueWVhcn0pO1xuICAgICAgfVxuXG4gICAgICAvLyB0b2RheVxuICAgICAgbGV0IHRvZGF5ID0gbmV3RGF0ZS5lcXVhbHMoY2FsZW5kYXJUb2RheSk7XG5cbiAgICAgIC8vIGFkZGluZyB1c2VyLXByb3ZpZGVkIGRhdGEgdG8gdGhlIGNvbnRleHRcbiAgICAgIGxldCBjb250ZXh0VXNlckRhdGEgPVxuICAgICAgICAgIGRheVRlbXBsYXRlRGF0YSA/IGRheVRlbXBsYXRlRGF0YShuZXdEYXRlLCB7bW9udGg6IG1vbnRoLm51bWJlciwgeWVhcjogbW9udGgueWVhcn0pIDogdW5kZWZpbmVkO1xuXG4gICAgICAvLyBzYXZpbmcgZmlyc3QgZGF0ZSBvZiB0aGUgbW9udGhcbiAgICAgIGlmIChtb250aC5maXJzdERhdGUgPT09IG51bGwgJiYgbmV3RGF0ZS5tb250aCA9PT0gbW9udGgubnVtYmVyKSB7XG4gICAgICAgIG1vbnRoLmZpcnN0RGF0ZSA9IG5ld0RhdGU7XG4gICAgICB9XG5cbiAgICAgIC8vIHNhdmluZyBsYXN0IGRhdGUgb2YgdGhlIG1vbnRoXG4gICAgICBpZiAobmV3RGF0ZS5tb250aCA9PT0gbW9udGgubnVtYmVyICYmIG5leHREYXRlLm1vbnRoICE9PSBtb250aC5udW1iZXIpIHtcbiAgICAgICAgbW9udGgubGFzdERhdGUgPSBuZXdEYXRlO1xuICAgICAgfVxuXG4gICAgICBsZXQgZGF5T2JqZWN0ID0gZGF5c1tkYXldO1xuICAgICAgaWYgKCFkYXlPYmplY3QpIHtcbiAgICAgICAgZGF5T2JqZWN0ID0gZGF5c1tkYXldID0ge30gYXMgRGF5Vmlld01vZGVsO1xuICAgICAgfVxuICAgICAgZGF5T2JqZWN0LmRhdGUgPSBuZXdEYXRlO1xuICAgICAgZGF5T2JqZWN0LmNvbnRleHQgPSBPYmplY3QuYXNzaWduKGRheU9iamVjdC5jb250ZXh0IHx8IHt9LCB7XG4gICAgICAgICRpbXBsaWNpdDogbmV3RGF0ZSxcbiAgICAgICAgZGF0ZTogbmV3RGF0ZSxcbiAgICAgICAgZGF0YTogY29udGV4dFVzZXJEYXRhLFxuICAgICAgICBjdXJyZW50TW9udGg6IG1vbnRoLm51bWJlciwgZGlzYWJsZWQsXG4gICAgICAgIGZvY3VzZWQ6IGZhbHNlLFxuICAgICAgICBzZWxlY3RlZDogZmFsc2UsIHRvZGF5XG4gICAgICB9KTtcbiAgICAgIGRheU9iamVjdC50YWJpbmRleCA9IC0xO1xuICAgICAgZGF5T2JqZWN0LmFyaWFMYWJlbCA9IGFyaWFMYWJlbDtcbiAgICAgIGRheU9iamVjdC5oaWRkZW4gPSBmYWxzZTtcblxuICAgICAgZGF0ZSA9IG5leHREYXRlO1xuICAgIH1cblxuICAgIHdlZWtPYmplY3QubnVtYmVyID0gY2FsZW5kYXIuZ2V0V2Vla051bWJlcihkYXlzLm1hcChkYXkgPT4gZGF5LmRhdGUpLCBmaXJzdERheU9mV2Vlayk7XG5cbiAgICAvLyBtYXJraW5nIHdlZWsgYXMgY29sbGFwc2VkXG4gICAgd2Vla09iamVjdC5jb2xsYXBzZWQgPSBvdXRzaWRlRGF5cyA9PT0gJ2NvbGxhcHNlZCcgJiYgZGF5c1swXS5kYXRlLm1vbnRoICE9PSBtb250aC5udW1iZXIgJiZcbiAgICAgICAgZGF5c1tkYXlzLmxlbmd0aCAtIDFdLmRhdGUubW9udGggIT09IG1vbnRoLm51bWJlcjtcbiAgfVxuXG4gIHJldHVybiBtb250aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpcnN0Vmlld0RhdGUoY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBkYXRlOiBOZ2JEYXRlLCBmaXJzdERheU9mV2VlazogbnVtYmVyKTogTmdiRGF0ZSB7XG4gIGNvbnN0IGRheXNQZXJXZWVrID0gY2FsZW5kYXIuZ2V0RGF5c1BlcldlZWsoKTtcbiAgY29uc3QgZmlyc3RNb250aERhdGUgPSBuZXcgTmdiRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGgsIDEpO1xuICBjb25zdCBkYXlPZldlZWsgPSBjYWxlbmRhci5nZXRXZWVrZGF5KGZpcnN0TW9udGhEYXRlKSAlIGRheXNQZXJXZWVrO1xuICByZXR1cm4gY2FsZW5kYXIuZ2V0UHJldihmaXJzdE1vbnRoRGF0ZSwgJ2QnLCAoZGF5c1BlcldlZWsgKyBkYXlPZldlZWsgLSBmaXJzdERheU9mV2VlaykgJSBkYXlzUGVyV2Vlayk7XG59XG4iLCJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgTE9DQUxFX0lEfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybVN0eWxlLCBnZXRMb2NhbGVEYXlOYW1lcywgZ2V0TG9jYWxlTW9udGhOYW1lcywgVHJhbnNsYXRpb25XaWR0aCwgZm9ybWF0RGF0ZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gTkdCX0RBVEVQSUNLRVJfMThOX0ZBQ1RPUlkobG9jYWxlKSB7XG4gIHJldHVybiBuZXcgTmdiRGF0ZXBpY2tlckkxOG5EZWZhdWx0KGxvY2FsZSk7XG59XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgc2VydmljZSBzdXBwbHlpbmcgbW9udGggYW5kIHdlZWtkYXkgbmFtZXMgdG8gdG8gTmdiRGF0ZXBpY2tlciBjb21wb25lbnQuXG4gKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIHNlcnZpY2UgaG9ub3JzIHRoZSBBbmd1bGFyIGxvY2FsZSwgYW5kIHVzZXMgdGhlIHJlZ2lzdGVyZWQgbG9jYWxlIGRhdGEsXG4gKiBhcyBleHBsYWluZWQgaW4gdGhlIEFuZ3VsYXIgaTE4biBndWlkZS5cbiAqIFNlZSB0aGUgaTE4biBkZW1vIGZvciBob3cgdG8gZXh0ZW5kIHRoaXMgY2xhc3MgYW5kIGRlZmluZSBhIGN1c3RvbSBwcm92aWRlciBmb3IgaTE4bi5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogTkdCX0RBVEVQSUNLRVJfMThOX0ZBQ1RPUlksIGRlcHM6IFtMT0NBTEVfSURdfSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JEYXRlcGlja2VySTE4biB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBzaG9ydCB3ZWVrZGF5IG5hbWUgdG8gZGlzcGxheSBpbiB0aGUgaGVhZGluZyBvZiB0aGUgbW9udGggdmlldy5cbiAgICogV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ3dlZWtkYXknIGlzIDE9TW9uIC4uLiA3PVN1blxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0V2Vla2RheVNob3J0TmFtZSh3ZWVrZGF5OiBudW1iZXIpOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHNob3J0IG1vbnRoIG5hbWUgdG8gZGlzcGxheSBpbiB0aGUgZGF0ZSBwaWNrZXIgbmF2aWdhdGlvbi5cbiAgICogV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ21vbnRoJyBpcyAxPUphbiAuLi4gMTI9RGVjXG4gICAqL1xuICBhYnN0cmFjdCBnZXRNb250aFNob3J0TmFtZShtb250aDogbnVtYmVyLCB5ZWFyPzogbnVtYmVyKTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBmdWxsIG1vbnRoIG5hbWUgdG8gZGlzcGxheSBpbiB0aGUgZGF0ZSBwaWNrZXIgbmF2aWdhdGlvbi5cbiAgICogV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ21vbnRoJyBpcyAxPUphbnVhcnkgLi4uIDEyPURlY2VtYmVyXG4gICAqL1xuICBhYnN0cmFjdCBnZXRNb250aEZ1bGxOYW1lKG1vbnRoOiBudW1iZXIsIHllYXI/OiBudW1iZXIpOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSAnYXJpYS1sYWJlbCcgYXR0cmlidXRlIGZvciBhIHNwZWNpZmljIGRhdGVcbiAgICpcbiAgICogQHNpbmNlIDIuMC4wXG4gICAqL1xuICBhYnN0cmFjdCBnZXREYXlBcmlhTGFiZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IHN0cmluZztcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdGV4dHVhbCByZXByZXNlbnRhdGlvbiBvZiBhIGRheSB0aGF0IGlzIHJlbmRlcmVkIGluIGEgZGF5IGNlbGxcbiAgICpcbiAgICogQHNpbmNlIDMuMC4wXG4gICAqL1xuICBnZXREYXlOdW1lcmFscyhkYXRlOiBOZ2JEYXRlU3RydWN0KTogc3RyaW5nIHsgcmV0dXJuIGAke2RhdGUuZGF5fWA7IH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdGV4dHVhbCByZXByZXNlbnRhdGlvbiBvZiBhIHdlZWsgbnVtYmVyIHJlbmRlcmVkIGJ5IGRhdGUgcGlja2VyXG4gICAqXG4gICAqIEBzaW5jZSAzLjAuMFxuICAgKi9cbiAgZ2V0V2Vla051bWVyYWxzKHdlZWtOdW1iZXI6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiBgJHt3ZWVrTnVtYmVyfWA7IH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdGV4dHVhbCByZXByZXNlbnRhdGlvbiBvZiBhIHllYXIgdGhhdCBpcyByZW5kZXJlZFxuICAgKiBpbiBkYXRlIHBpY2tlciB5ZWFyIHNlbGVjdCBib3hcbiAgICpcbiAgICogQHNpbmNlIDMuMC4wXG4gICAqL1xuICBnZXRZZWFyTnVtZXJhbHMoeWVhcjogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIGAke3llYXJ9YDsgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlckkxOG5EZWZhdWx0IGV4dGVuZHMgTmdiRGF0ZXBpY2tlckkxOG4ge1xuICBwcml2YXRlIF93ZWVrZGF5c1Nob3J0OiBBcnJheTxzdHJpbmc+O1xuICBwcml2YXRlIF9tb250aHNTaG9ydDogQXJyYXk8c3RyaW5nPjtcbiAgcHJpdmF0ZSBfbW9udGhzRnVsbDogQXJyYXk8c3RyaW5nPjtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KExPQ0FMRV9JRCkgcHJpdmF0ZSBfbG9jYWxlOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgY29uc3Qgd2Vla2RheXNTdGFydGluZ09uU3VuZGF5ID0gZ2V0TG9jYWxlRGF5TmFtZXMoX2xvY2FsZSwgRm9ybVN0eWxlLlN0YW5kYWxvbmUsIFRyYW5zbGF0aW9uV2lkdGguU2hvcnQpO1xuICAgIHRoaXMuX3dlZWtkYXlzU2hvcnQgPSB3ZWVrZGF5c1N0YXJ0aW5nT25TdW5kYXkubWFwKChkYXksIGluZGV4KSA9PiB3ZWVrZGF5c1N0YXJ0aW5nT25TdW5kYXlbKGluZGV4ICsgMSkgJSA3XSk7XG5cbiAgICB0aGlzLl9tb250aHNTaG9ydCA9IGdldExvY2FsZU1vbnRoTmFtZXMoX2xvY2FsZSwgRm9ybVN0eWxlLlN0YW5kYWxvbmUsIFRyYW5zbGF0aW9uV2lkdGguQWJicmV2aWF0ZWQpO1xuICAgIHRoaXMuX21vbnRoc0Z1bGwgPSBnZXRMb2NhbGVNb250aE5hbWVzKF9sb2NhbGUsIEZvcm1TdHlsZS5TdGFuZGFsb25lLCBUcmFuc2xhdGlvbldpZHRoLldpZGUpO1xuICB9XG5cbiAgZ2V0V2Vla2RheVNob3J0TmFtZSh3ZWVrZGF5OiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFt3ZWVrZGF5IC0gMV07IH1cblxuICBnZXRNb250aFNob3J0TmFtZShtb250aDogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0W21vbnRoIC0gMV07IH1cblxuICBnZXRNb250aEZ1bGxOYW1lKG1vbnRoOiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbW9udGhzRnVsbFttb250aCAtIDFdOyB9XG5cbiAgZ2V0RGF5QXJpYUxhYmVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBzdHJpbmcge1xuICAgIGNvbnN0IGpzRGF0ZSA9IG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCAtIDEsIGRhdGUuZGF5KTtcbiAgICByZXR1cm4gZm9ybWF0RGF0ZShqc0RhdGUsICdmdWxsRGF0ZScsIHRoaXMuX2xvY2FsZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7TmdiQ2FsZW5kYXIsIE5nYlBlcmlvZH0gZnJvbSAnLi9uZ2ItY2FsZW5kYXInO1xuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcbmltcG9ydCB7TmdiRGF0ZVN0cnVjdH0gZnJvbSAnLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuaW1wb3J0IHtEYXRlcGlja2VyVmlld01vZGVsLCBOZ2JEYXlUZW1wbGF0ZURhdGEsIE5nYk1hcmtEaXNhYmxlZH0gZnJvbSAnLi9kYXRlcGlja2VyLXZpZXctbW9kZWwnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNJbnRlZ2VyLCB0b0ludGVnZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgYnVpbGRNb250aHMsXG4gIGNoZWNrRGF0ZUluUmFuZ2UsXG4gIGNoZWNrTWluQmVmb3JlTWF4LFxuICBpc0NoYW5nZWREYXRlLFxuICBpc0RhdGVTZWxlY3RhYmxlLFxuICBnZW5lcmF0ZVNlbGVjdEJveFllYXJzLFxuICBnZW5lcmF0ZVNlbGVjdEJveE1vbnRocyxcbiAgcHJldk1vbnRoRGlzYWJsZWQsXG4gIG5leHRNb250aERpc2FibGVkXG59IGZyb20gJy4vZGF0ZXBpY2tlci10b29scyc7XG5cbmltcG9ydCB7ZmlsdGVyfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJJMThufSBmcm9tICcuL2RhdGVwaWNrZXItaTE4bic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyU2VydmljZSB7XG4gIHByaXZhdGUgX21vZGVsJCA9IG5ldyBTdWJqZWN0PERhdGVwaWNrZXJWaWV3TW9kZWw+KCk7XG5cbiAgcHJpdmF0ZSBfc2VsZWN0JCA9IG5ldyBTdWJqZWN0PE5nYkRhdGU+KCk7XG5cbiAgcHJpdmF0ZSBfc3RhdGU6IERhdGVwaWNrZXJWaWV3TW9kZWwgPSB7XG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIGRpc3BsYXlNb250aHM6IDEsXG4gICAgZmlyc3REYXlPZldlZWs6IDEsXG4gICAgZm9jdXNWaXNpYmxlOiBmYWxzZSxcbiAgICBtb250aHM6IFtdLFxuICAgIG5hdmlnYXRpb246ICdzZWxlY3QnLFxuICAgIG91dHNpZGVEYXlzOiAndmlzaWJsZScsXG4gICAgcHJldkRpc2FibGVkOiBmYWxzZSxcbiAgICBuZXh0RGlzYWJsZWQ6IGZhbHNlLFxuICAgIHNlbGVjdEJveGVzOiB7eWVhcnM6IFtdLCBtb250aHM6IFtdfSxcbiAgICBzZWxlY3RlZERhdGU6IG51bGxcbiAgfTtcblxuICBnZXQgbW9kZWwkKCk6IE9ic2VydmFibGU8RGF0ZXBpY2tlclZpZXdNb2RlbD4geyByZXR1cm4gdGhpcy5fbW9kZWwkLnBpcGUoZmlsdGVyKG1vZGVsID0+IG1vZGVsLm1vbnRocy5sZW5ndGggPiAwKSk7IH1cblxuICBnZXQgc2VsZWN0JCgpOiBPYnNlcnZhYmxlPE5nYkRhdGU+IHsgcmV0dXJuIHRoaXMuX3NlbGVjdCQucGlwZShmaWx0ZXIoZGF0ZSA9PiBkYXRlICE9PSBudWxsKSk7IH1cblxuICBzZXQgZGF5VGVtcGxhdGVEYXRhKGRheVRlbXBsYXRlRGF0YTogTmdiRGF5VGVtcGxhdGVEYXRhKSB7XG4gICAgaWYgKHRoaXMuX3N0YXRlLmRheVRlbXBsYXRlRGF0YSAhPT0gZGF5VGVtcGxhdGVEYXRhKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe2RheVRlbXBsYXRlRGF0YX0pO1xuICAgIH1cbiAgfVxuXG4gIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9zdGF0ZS5kaXNhYmxlZCAhPT0gZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7ZGlzYWJsZWR9KTtcbiAgICB9XG4gIH1cblxuICBzZXQgZGlzcGxheU1vbnRocyhkaXNwbGF5TW9udGhzOiBudW1iZXIpIHtcbiAgICBkaXNwbGF5TW9udGhzID0gdG9JbnRlZ2VyKGRpc3BsYXlNb250aHMpO1xuICAgIGlmIChpc0ludGVnZXIoZGlzcGxheU1vbnRocykgJiYgZGlzcGxheU1vbnRocyA+IDAgJiYgdGhpcy5fc3RhdGUuZGlzcGxheU1vbnRocyAhPT0gZGlzcGxheU1vbnRocykge1xuICAgICAgdGhpcy5fbmV4dFN0YXRlKHtkaXNwbGF5TW9udGhzfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0IGZpcnN0RGF5T2ZXZWVrKGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpIHtcbiAgICBmaXJzdERheU9mV2VlayA9IHRvSW50ZWdlcihmaXJzdERheU9mV2Vlayk7XG4gICAgaWYgKGlzSW50ZWdlcihmaXJzdERheU9mV2VlaykgJiYgZmlyc3REYXlPZldlZWsgPj0gMCAmJiB0aGlzLl9zdGF0ZS5maXJzdERheU9mV2VlayAhPT0gZmlyc3REYXlPZldlZWspIHtcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7Zmlyc3REYXlPZldlZWt9KTtcbiAgICB9XG4gIH1cblxuICBzZXQgZm9jdXNWaXNpYmxlKGZvY3VzVmlzaWJsZTogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9zdGF0ZS5mb2N1c1Zpc2libGUgIT09IGZvY3VzVmlzaWJsZSAmJiAhdGhpcy5fc3RhdGUuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX25leHRTdGF0ZSh7Zm9jdXNWaXNpYmxlfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0IG1heERhdGUoZGF0ZTogTmdiRGF0ZSkge1xuICAgIGNvbnN0IG1heERhdGUgPSB0aGlzLnRvVmFsaWREYXRlKGRhdGUsIG51bGwpO1xuICAgIGlmIChpc0NoYW5nZWREYXRlKHRoaXMuX3N0YXRlLm1heERhdGUsIG1heERhdGUpKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe21heERhdGV9KTtcbiAgICB9XG4gIH1cblxuICBzZXQgbWFya0Rpc2FibGVkKG1hcmtEaXNhYmxlZDogTmdiTWFya0Rpc2FibGVkKSB7XG4gICAgaWYgKHRoaXMuX3N0YXRlLm1hcmtEaXNhYmxlZCAhPT0gbWFya0Rpc2FibGVkKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe21hcmtEaXNhYmxlZH0pO1xuICAgIH1cbiAgfVxuXG4gIHNldCBtaW5EYXRlKGRhdGU6IE5nYkRhdGUpIHtcbiAgICBjb25zdCBtaW5EYXRlID0gdGhpcy50b1ZhbGlkRGF0ZShkYXRlLCBudWxsKTtcbiAgICBpZiAoaXNDaGFuZ2VkRGF0ZSh0aGlzLl9zdGF0ZS5taW5EYXRlLCBtaW5EYXRlKSkge1xuICAgICAgdGhpcy5fbmV4dFN0YXRlKHttaW5EYXRlfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0IG5hdmlnYXRpb24obmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJykge1xuICAgIGlmICh0aGlzLl9zdGF0ZS5uYXZpZ2F0aW9uICE9PSBuYXZpZ2F0aW9uKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe25hdmlnYXRpb259KTtcbiAgICB9XG4gIH1cblxuICBzZXQgb3V0c2lkZURheXMob3V0c2lkZURheXM6ICd2aXNpYmxlJyB8ICdjb2xsYXBzZWQnIHwgJ2hpZGRlbicpIHtcbiAgICBpZiAodGhpcy5fc3RhdGUub3V0c2lkZURheXMgIT09IG91dHNpZGVEYXlzKSB7XG4gICAgICB0aGlzLl9uZXh0U3RhdGUoe291dHNpZGVEYXlzfSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBwcml2YXRlIF9pMThuOiBOZ2JEYXRlcGlja2VySTE4bikge31cblxuICBmb2N1cyhkYXRlOiBOZ2JEYXRlKSB7XG4gICAgaWYgKCF0aGlzLl9zdGF0ZS5kaXNhYmxlZCAmJiB0aGlzLl9jYWxlbmRhci5pc1ZhbGlkKGRhdGUpICYmIGlzQ2hhbmdlZERhdGUodGhpcy5fc3RhdGUuZm9jdXNEYXRlLCBkYXRlKSkge1xuICAgICAgdGhpcy5fbmV4dFN0YXRlKHtmb2N1c0RhdGU6IGRhdGV9KTtcbiAgICB9XG4gIH1cblxuICBmb2N1c01vdmUocGVyaW9kPzogTmdiUGVyaW9kLCBudW1iZXI/OiBudW1iZXIpIHtcbiAgICB0aGlzLmZvY3VzKHRoaXMuX2NhbGVuZGFyLmdldE5leHQodGhpcy5fc3RhdGUuZm9jdXNEYXRlLCBwZXJpb2QsIG51bWJlcikpO1xuICB9XG5cbiAgZm9jdXNTZWxlY3QoKSB7XG4gICAgaWYgKGlzRGF0ZVNlbGVjdGFibGUodGhpcy5fc3RhdGUuZm9jdXNEYXRlLCB0aGlzLl9zdGF0ZSkpIHtcbiAgICAgIHRoaXMuc2VsZWN0KHRoaXMuX3N0YXRlLmZvY3VzRGF0ZSwge2VtaXRFdmVudDogdHJ1ZX0pO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4oZGF0ZTogTmdiRGF0ZSkge1xuICAgIGNvbnN0IGZpcnN0RGF0ZSA9IHRoaXMudG9WYWxpZERhdGUoZGF0ZSwgdGhpcy5fY2FsZW5kYXIuZ2V0VG9kYXkoKSk7XG4gICAgaWYgKCF0aGlzLl9zdGF0ZS5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fbmV4dFN0YXRlKHtmaXJzdERhdGV9KTtcbiAgICB9XG4gIH1cblxuICByZXNldChzdGF0ZTogRGF0ZXBpY2tlclZpZXdNb2RlbCkgeyB0aGlzLl9zdGF0ZSA9IHN0YXRlOyB9XG5cbiAgc2VsZWN0KGRhdGU6IE5nYkRhdGUsIG9wdGlvbnM6IHtlbWl0RXZlbnQ/OiBib29sZWFufSA9IHt9KSB7XG4gICAgY29uc3Qgc2VsZWN0ZWREYXRlID0gdGhpcy50b1ZhbGlkRGF0ZShkYXRlLCBudWxsKTtcbiAgICBpZiAoIXRoaXMuX3N0YXRlLmRpc2FibGVkKSB7XG4gICAgICBpZiAoaXNDaGFuZ2VkRGF0ZSh0aGlzLl9zdGF0ZS5zZWxlY3RlZERhdGUsIHNlbGVjdGVkRGF0ZSkpIHtcbiAgICAgICAgdGhpcy5fbmV4dFN0YXRlKHtzZWxlY3RlZERhdGV9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuZW1pdEV2ZW50ICYmIGlzRGF0ZVNlbGVjdGFibGUoc2VsZWN0ZWREYXRlLCB0aGlzLl9zdGF0ZSkpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0JC5uZXh0KHNlbGVjdGVkRGF0ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdG9WYWxpZERhdGUoZGF0ZTogTmdiRGF0ZVN0cnVjdCwgZGVmYXVsdFZhbHVlPzogTmdiRGF0ZSk6IE5nYkRhdGUge1xuICAgIGNvbnN0IG5nYkRhdGUgPSBOZ2JEYXRlLmZyb20oZGF0ZSk7XG4gICAgaWYgKGRlZmF1bHRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBkZWZhdWx0VmFsdWUgPSB0aGlzLl9jYWxlbmRhci5nZXRUb2RheSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY2FsZW5kYXIuaXNWYWxpZChuZ2JEYXRlKSA/IG5nYkRhdGUgOiBkZWZhdWx0VmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9uZXh0U3RhdGUocGF0Y2g6IFBhcnRpYWw8RGF0ZXBpY2tlclZpZXdNb2RlbD4pIHtcbiAgICBjb25zdCBuZXdTdGF0ZSA9IHRoaXMuX3VwZGF0ZVN0YXRlKHBhdGNoKTtcbiAgICB0aGlzLl9wYXRjaENvbnRleHRzKG5ld1N0YXRlKTtcbiAgICB0aGlzLl9zdGF0ZSA9IG5ld1N0YXRlO1xuICAgIHRoaXMuX21vZGVsJC5uZXh0KHRoaXMuX3N0YXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhdGNoQ29udGV4dHMoc3RhdGU6IERhdGVwaWNrZXJWaWV3TW9kZWwpIHtcbiAgICBjb25zdCB7bW9udGhzLCBkaXNwbGF5TW9udGhzLCBzZWxlY3RlZERhdGUsIGZvY3VzRGF0ZSwgZm9jdXNWaXNpYmxlLCBkaXNhYmxlZCwgb3V0c2lkZURheXN9ID0gc3RhdGU7XG4gICAgc3RhdGUubW9udGhzLmZvckVhY2gobW9udGggPT4ge1xuICAgICAgbW9udGgud2Vla3MuZm9yRWFjaCh3ZWVrID0+IHtcbiAgICAgICAgd2Vlay5kYXlzLmZvckVhY2goZGF5ID0+IHtcblxuICAgICAgICAgIC8vIHBhdGNoIGZvY3VzIGZsYWdcbiAgICAgICAgICBpZiAoZm9jdXNEYXRlKSB7XG4gICAgICAgICAgICBkYXkuY29udGV4dC5mb2N1c2VkID0gZm9jdXNEYXRlLmVxdWFscyhkYXkuZGF0ZSkgJiYgZm9jdXNWaXNpYmxlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGNhbGN1bGF0aW5nIHRhYmluZGV4XG4gICAgICAgICAgZGF5LnRhYmluZGV4ID0gIWRpc2FibGVkICYmIGRheS5kYXRlLmVxdWFscyhmb2N1c0RhdGUpICYmIGZvY3VzRGF0ZS5tb250aCA9PT0gbW9udGgubnVtYmVyID8gMCA6IC0xO1xuXG4gICAgICAgICAgLy8gb3ZlcnJpZGUgY29udGV4dCBkaXNhYmxlZFxuICAgICAgICAgIGlmIChkaXNhYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZGF5LmNvbnRleHQuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHBhdGNoIHNlbGVjdGlvbiBmbGFnXG4gICAgICAgICAgaWYgKHNlbGVjdGVkRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkYXkuY29udGV4dC5zZWxlY3RlZCA9IHNlbGVjdGVkRGF0ZSAhPT0gbnVsbCAmJiBzZWxlY3RlZERhdGUuZXF1YWxzKGRheS5kYXRlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyB2aXNpYmlsaXR5XG4gICAgICAgICAgaWYgKG1vbnRoLm51bWJlciAhPT0gZGF5LmRhdGUubW9udGgpIHtcbiAgICAgICAgICAgIGRheS5oaWRkZW4gPSBvdXRzaWRlRGF5cyA9PT0gJ2hpZGRlbicgfHwgb3V0c2lkZURheXMgPT09ICdjb2xsYXBzZWQnIHx8XG4gICAgICAgICAgICAgICAgKGRpc3BsYXlNb250aHMgPiAxICYmIGRheS5kYXRlLmFmdGVyKG1vbnRoc1swXS5maXJzdERhdGUpICYmXG4gICAgICAgICAgICAgICAgIGRheS5kYXRlLmJlZm9yZShtb250aHNbZGlzcGxheU1vbnRocyAtIDFdLmxhc3REYXRlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU3RhdGUocGF0Y2g6IFBhcnRpYWw8RGF0ZXBpY2tlclZpZXdNb2RlbD4pOiBEYXRlcGlja2VyVmlld01vZGVsIHtcbiAgICAvLyBwYXRjaGluZyBmaWVsZHNcbiAgICBjb25zdCBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3N0YXRlLCBwYXRjaCk7XG5cbiAgICBsZXQgc3RhcnREYXRlID0gc3RhdGUuZmlyc3REYXRlO1xuXG4gICAgLy8gbWluL21heCBkYXRlcyBjaGFuZ2VkXG4gICAgaWYgKCdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2gpIHtcbiAgICAgIGNoZWNrTWluQmVmb3JlTWF4KHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgc3RhdGUuZm9jdXNEYXRlID0gY2hlY2tEYXRlSW5SYW5nZShzdGF0ZS5mb2N1c0RhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgc3RhdGUuZmlyc3REYXRlID0gY2hlY2tEYXRlSW5SYW5nZShzdGF0ZS5maXJzdERhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgc3RhcnREYXRlID0gc3RhdGUuZm9jdXNEYXRlO1xuICAgIH1cblxuICAgIC8vIGRpc2FibGVkXG4gICAgaWYgKCdkaXNhYmxlZCcgaW4gcGF0Y2gpIHtcbiAgICAgIHN0YXRlLmZvY3VzVmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIGluaXRpYWwgcmVidWlsZCB2aWEgJ3NlbGVjdCgpJ1xuICAgIGlmICgnc2VsZWN0ZWREYXRlJyBpbiBwYXRjaCAmJiB0aGlzLl9zdGF0ZS5tb250aHMubGVuZ3RoID09PSAwKSB7XG4gICAgICBzdGFydERhdGUgPSBzdGF0ZS5zZWxlY3RlZERhdGU7XG4gICAgfVxuXG4gICAgLy8gdGVybWluYXRlIGVhcmx5IGlmIG9ubHkgZm9jdXMgdmlzaWJpbGl0eSB3YXMgY2hhbmdlZFxuICAgIGlmICgnZm9jdXNWaXNpYmxlJyBpbiBwYXRjaCkge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIC8vIGZvY3VzIGRhdGUgY2hhbmdlZFxuICAgIGlmICgnZm9jdXNEYXRlJyBpbiBwYXRjaCkge1xuICAgICAgc3RhdGUuZm9jdXNEYXRlID0gY2hlY2tEYXRlSW5SYW5nZShzdGF0ZS5mb2N1c0RhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgc3RhcnREYXRlID0gc3RhdGUuZm9jdXNEYXRlO1xuXG4gICAgICAvLyBub3RoaW5nIHRvIHJlYnVpbGQgaWYgb25seSBmb2N1cyBjaGFuZ2VkIGFuZCBpdCBpcyBzdGlsbCB2aXNpYmxlXG4gICAgICBpZiAoc3RhdGUubW9udGhzLmxlbmd0aCAhPT0gMCAmJiAhc3RhdGUuZm9jdXNEYXRlLmJlZm9yZShzdGF0ZS5maXJzdERhdGUpICYmXG4gICAgICAgICAgIXN0YXRlLmZvY3VzRGF0ZS5hZnRlcihzdGF0ZS5sYXN0RGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZpcnN0IGRhdGUgY2hhbmdlZFxuICAgIGlmICgnZmlyc3REYXRlJyBpbiBwYXRjaCkge1xuICAgICAgc3RhdGUuZmlyc3REYXRlID0gY2hlY2tEYXRlSW5SYW5nZShzdGF0ZS5maXJzdERhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgc3RhcnREYXRlID0gc3RhdGUuZmlyc3REYXRlO1xuICAgIH1cblxuICAgIC8vIHJlYnVpbGRpbmcgbW9udGhzXG4gICAgaWYgKHN0YXJ0RGF0ZSkge1xuICAgICAgY29uc3QgZm9yY2VSZWJ1aWxkID0gJ2RheVRlbXBsYXRlRGF0YScgaW4gcGF0Y2ggfHwgJ2ZpcnN0RGF5T2ZXZWVrJyBpbiBwYXRjaCB8fCAnbWFya0Rpc2FibGVkJyBpbiBwYXRjaCB8fFxuICAgICAgICAgICdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2ggfHwgJ2Rpc2FibGVkJyBpbiBwYXRjaCB8fCAnb3V0c2lkZURheXMnIGluIHBhdGNoO1xuXG4gICAgICBjb25zdCBtb250aHMgPSBidWlsZE1vbnRocyh0aGlzLl9jYWxlbmRhciwgc3RhcnREYXRlLCBzdGF0ZSwgdGhpcy5faTE4biwgZm9yY2VSZWJ1aWxkKTtcblxuICAgICAgLy8gdXBkYXRpbmcgbW9udGhzIGFuZCBib3VuZGFyeSBkYXRlc1xuICAgICAgc3RhdGUubW9udGhzID0gbW9udGhzO1xuICAgICAgc3RhdGUuZmlyc3REYXRlID0gbW9udGhzLmxlbmd0aCA+IDAgPyBtb250aHNbMF0uZmlyc3REYXRlIDogdW5kZWZpbmVkO1xuICAgICAgc3RhdGUubGFzdERhdGUgPSBtb250aHMubGVuZ3RoID4gMCA/IG1vbnRoc1ttb250aHMubGVuZ3RoIC0gMV0ubGFzdERhdGUgOiB1bmRlZmluZWQ7XG5cbiAgICAgIC8vIHJlc2V0IHNlbGVjdGVkIGRhdGUgaWYgJ21hcmtEaXNhYmxlZCcgcmV0dXJucyB0cnVlXG4gICAgICBpZiAoJ3NlbGVjdGVkRGF0ZScgaW4gcGF0Y2ggJiYgIWlzRGF0ZVNlbGVjdGFibGUoc3RhdGUuc2VsZWN0ZWREYXRlLCBzdGF0ZSkpIHtcbiAgICAgICAgc3RhdGUuc2VsZWN0ZWREYXRlID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gYWRqdXN0aW5nIGZvY3VzIGFmdGVyIG1vbnRocyB3ZXJlIGJ1aWx0XG4gICAgICBpZiAoJ2ZpcnN0RGF0ZScgaW4gcGF0Y2gpIHtcbiAgICAgICAgaWYgKHN0YXRlLmZvY3VzRGF0ZSA9PT0gdW5kZWZpbmVkIHx8IHN0YXRlLmZvY3VzRGF0ZS5iZWZvcmUoc3RhdGUuZmlyc3REYXRlKSB8fFxuICAgICAgICAgICAgc3RhdGUuZm9jdXNEYXRlLmFmdGVyKHN0YXRlLmxhc3REYXRlKSkge1xuICAgICAgICAgIHN0YXRlLmZvY3VzRGF0ZSA9IHN0YXJ0RGF0ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBhZGp1c3RpbmcgbW9udGhzL3llYXJzIGZvciB0aGUgc2VsZWN0IGJveCBuYXZpZ2F0aW9uXG4gICAgICBjb25zdCB5ZWFyQ2hhbmdlZCA9ICF0aGlzLl9zdGF0ZS5maXJzdERhdGUgfHwgdGhpcy5fc3RhdGUuZmlyc3REYXRlLnllYXIgIT09IHN0YXRlLmZpcnN0RGF0ZS55ZWFyO1xuICAgICAgY29uc3QgbW9udGhDaGFuZ2VkID0gIXRoaXMuX3N0YXRlLmZpcnN0RGF0ZSB8fCB0aGlzLl9zdGF0ZS5maXJzdERhdGUubW9udGggIT09IHN0YXRlLmZpcnN0RGF0ZS5tb250aDtcbiAgICAgIGlmIChzdGF0ZS5uYXZpZ2F0aW9uID09PSAnc2VsZWN0Jykge1xuICAgICAgICAvLyB5ZWFycyAtPiAgYm91bmRhcmllcyAobWluL21heCB3ZXJlIGNoYW5nZWQpXG4gICAgICAgIGlmICgnbWluRGF0ZScgaW4gcGF0Y2ggfHwgJ21heERhdGUnIGluIHBhdGNoIHx8IHN0YXRlLnNlbGVjdEJveGVzLnllYXJzLmxlbmd0aCA9PT0gMCB8fCB5ZWFyQ2hhbmdlZCkge1xuICAgICAgICAgIHN0YXRlLnNlbGVjdEJveGVzLnllYXJzID0gZ2VuZXJhdGVTZWxlY3RCb3hZZWFycyhzdGF0ZS5maXJzdERhdGUsIHN0YXRlLm1pbkRhdGUsIHN0YXRlLm1heERhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbW9udGhzIC0+IHdoZW4gY3VycmVudCB5ZWFyIG9yIGJvdW5kYXJpZXMgY2hhbmdlXG4gICAgICAgIGlmICgnbWluRGF0ZScgaW4gcGF0Y2ggfHwgJ21heERhdGUnIGluIHBhdGNoIHx8IHN0YXRlLnNlbGVjdEJveGVzLm1vbnRocy5sZW5ndGggPT09IDAgfHwgeWVhckNoYW5nZWQpIHtcbiAgICAgICAgICBzdGF0ZS5zZWxlY3RCb3hlcy5tb250aHMgPVxuICAgICAgICAgICAgICBnZW5lcmF0ZVNlbGVjdEJveE1vbnRocyh0aGlzLl9jYWxlbmRhciwgc3RhdGUuZmlyc3REYXRlLCBzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUuc2VsZWN0Qm94ZXMgPSB7eWVhcnM6IFtdLCBtb250aHM6IFtdfTtcbiAgICAgIH1cblxuICAgICAgLy8gdXBkYXRpbmcgbmF2aWdhdGlvbiBhcnJvd3MgLT4gYm91bmRhcmllcyBjaGFuZ2UgKG1pbi9tYXgpIG9yIG1vbnRoL3llYXIgY2hhbmdlc1xuICAgICAgaWYgKChzdGF0ZS5uYXZpZ2F0aW9uID09PSAnYXJyb3dzJyB8fCBzdGF0ZS5uYXZpZ2F0aW9uID09PSAnc2VsZWN0JykgJiZcbiAgICAgICAgICAobW9udGhDaGFuZ2VkIHx8IHllYXJDaGFuZ2VkIHx8ICdtaW5EYXRlJyBpbiBwYXRjaCB8fCAnbWF4RGF0ZScgaW4gcGF0Y2ggfHwgJ2Rpc2FibGVkJyBpbiBwYXRjaCkpIHtcbiAgICAgICAgc3RhdGUucHJldkRpc2FibGVkID0gc3RhdGUuZGlzYWJsZWQgfHwgcHJldk1vbnRoRGlzYWJsZWQodGhpcy5fY2FsZW5kYXIsIHN0YXRlLmZpcnN0RGF0ZSwgc3RhdGUubWluRGF0ZSk7XG4gICAgICAgIHN0YXRlLm5leHREaXNhYmxlZCA9IHN0YXRlLmRpc2FibGVkIHx8IG5leHRNb250aERpc2FibGVkKHRoaXMuX2NhbGVuZGFyLCBzdGF0ZS5sYXN0RGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG4iLCJleHBvcnQgZW51bSBLZXkge1xuICBUYWIgPSA5LFxuICBFbnRlciA9IDEzLFxuICBFc2NhcGUgPSAyNyxcbiAgU3BhY2UgPSAzMixcbiAgUGFnZVVwID0gMzMsXG4gIFBhZ2VEb3duID0gMzQsXG4gIEVuZCA9IDM1LFxuICBIb21lID0gMzYsXG4gIEFycm93TGVmdCA9IDM3LFxuICBBcnJvd1VwID0gMzgsXG4gIEFycm93UmlnaHQgPSAzOSxcbiAgQXJyb3dEb3duID0gNDBcbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJTZXJ2aWNlfSBmcm9tICcuL2RhdGVwaWNrZXItc2VydmljZSc7XG5pbXBvcnQge05nYkNhbGVuZGFyfSBmcm9tICcuL25nYi1jYWxlbmRhcic7XG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJLZXlNYXBTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfbWluRGF0ZTogTmdiRGF0ZTtcbiAgcHJpdmF0ZSBfbWF4RGF0ZTogTmdiRGF0ZTtcbiAgcHJpdmF0ZSBfZmlyc3RWaWV3RGF0ZTogTmdiRGF0ZTtcbiAgcHJpdmF0ZSBfbGFzdFZpZXdEYXRlOiBOZ2JEYXRlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IE5nYkRhdGVwaWNrZXJTZXJ2aWNlLCBwcml2YXRlIF9jYWxlbmRhcjogTmdiQ2FsZW5kYXIpIHtcbiAgICBfc2VydmljZS5tb2RlbCQuc3Vic2NyaWJlKG1vZGVsID0+IHtcbiAgICAgIHRoaXMuX21pbkRhdGUgPSBtb2RlbC5taW5EYXRlO1xuICAgICAgdGhpcy5fbWF4RGF0ZSA9IG1vZGVsLm1heERhdGU7XG4gICAgICB0aGlzLl9maXJzdFZpZXdEYXRlID0gbW9kZWwuZmlyc3REYXRlO1xuICAgICAgdGhpcy5fbGFzdFZpZXdEYXRlID0gbW9kZWwubGFzdERhdGU7XG4gICAgfSk7XG4gIH1cblxuICBwcm9jZXNzS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgY2FzZSBLZXkuUGFnZVVwOlxuICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZShldmVudC5zaGlmdEtleSA/ICd5JyA6ICdtJywgLTEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LlBhZ2VEb3duOlxuICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZShldmVudC5zaGlmdEtleSA/ICd5JyA6ICdtJywgMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuRW5kOlxuICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzKGV2ZW50LnNoaWZ0S2V5ID8gdGhpcy5fbWF4RGF0ZSA6IHRoaXMuX2xhc3RWaWV3RGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuSG9tZTpcbiAgICAgICAgdGhpcy5fc2VydmljZS5mb2N1cyhldmVudC5zaGlmdEtleSA/IHRoaXMuX21pbkRhdGUgOiB0aGlzLl9maXJzdFZpZXdEYXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtleS5BcnJvd0xlZnQ6XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKCdkJywgLTEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkFycm93VXA6XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKCdkJywgLXRoaXMuX2NhbGVuZGFyLmdldERheXNQZXJXZWVrKCkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkFycm93UmlnaHQ6XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKCdkJywgMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuQXJyb3dEb3duOlxuICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZSgnZCcsIHRoaXMuX2NhbGVuZGFyLmdldERheXNQZXJXZWVrKCkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkVudGVyOlxuICAgICAgY2FzZSBLZXkuU3BhY2U6XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNTZWxlY3QoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gbm90ZSAncmV0dXJuJyBpbiBkZWZhdWx0IGNhc2VcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG59XG4iLCJpbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XG5pbXBvcnQge0RheVRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi9kYXRlcGlja2VyLWRheS10ZW1wbGF0ZS1jb250ZXh0JztcblxuZXhwb3J0IHR5cGUgTmdiTWFya0Rpc2FibGVkID0gKGRhdGU6IE5nYkRhdGVTdHJ1Y3QsIGN1cnJlbnQ6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9KSA9PiBib29sZWFuO1xuZXhwb3J0IHR5cGUgTmdiRGF5VGVtcGxhdGVEYXRhID0gKGRhdGU6IE5nYkRhdGVTdHJ1Y3QsIGN1cnJlbnQ6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9KSA9PiBhbnk7XG5cbmV4cG9ydCB0eXBlIERheVZpZXdNb2RlbCA9IHtcbiAgZGF0ZTogTmdiRGF0ZSxcbiAgY29udGV4dDogRGF5VGVtcGxhdGVDb250ZXh0LFxuICB0YWJpbmRleDogbnVtYmVyLFxuICBhcmlhTGFiZWw6IHN0cmluZyxcbiAgaGlkZGVuOiBib29sZWFuXG59O1xuXG5leHBvcnQgdHlwZSBXZWVrVmlld01vZGVsID0ge1xuICBudW1iZXI6IG51bWJlcixcbiAgZGF5czogRGF5Vmlld01vZGVsW10sXG4gIGNvbGxhcHNlZDogYm9vbGVhblxufTtcblxuZXhwb3J0IHR5cGUgTW9udGhWaWV3TW9kZWwgPSB7XG4gIGZpcnN0RGF0ZTogTmdiRGF0ZSxcbiAgbGFzdERhdGU6IE5nYkRhdGUsXG4gIG51bWJlcjogbnVtYmVyLFxuICB5ZWFyOiBudW1iZXIsXG4gIHdlZWtzOiBXZWVrVmlld01vZGVsW10sXG4gIHdlZWtkYXlzOiBudW1iZXJbXVxufTtcblxuLy8gY2xhbmctZm9ybWF0IG9mZlxuZXhwb3J0IHR5cGUgRGF0ZXBpY2tlclZpZXdNb2RlbCA9IHtcbiAgZGF5VGVtcGxhdGVEYXRhPzogTmdiRGF5VGVtcGxhdGVEYXRhLFxuICBkaXNhYmxlZDogYm9vbGVhbixcbiAgZGlzcGxheU1vbnRoczogbnVtYmVyLFxuICBmaXJzdERhdGU/OiBOZ2JEYXRlLFxuICBmaXJzdERheU9mV2VlazogbnVtYmVyLFxuICBmb2N1c0RhdGU/OiBOZ2JEYXRlLFxuICBmb2N1c1Zpc2libGU6IGJvb2xlYW4sXG4gIGxhc3REYXRlPzogTmdiRGF0ZSxcbiAgbWFya0Rpc2FibGVkPzogTmdiTWFya0Rpc2FibGVkLFxuICBtYXhEYXRlPzogTmdiRGF0ZSxcbiAgbWluRGF0ZT86IE5nYkRhdGUsXG4gIG1vbnRoczogTW9udGhWaWV3TW9kZWxbXSxcbiAgbmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJyxcbiAgb3V0c2lkZURheXM6ICd2aXNpYmxlJyB8ICdjb2xsYXBzZWQnIHwgJ2hpZGRlbicsXG4gIHByZXZEaXNhYmxlZDogYm9vbGVhbixcbiAgbmV4dERpc2FibGVkOiBib29sZWFuLFxuICBzZWxlY3RCb3hlczoge1xuICAgIHllYXJzOiBudW1iZXJbXSxcbiAgICBtb250aHM6IG51bWJlcltdXG4gIH0sXG4gIHNlbGVjdGVkRGF0ZTogTmdiRGF0ZVxufTtcbi8vIGNsYW5nLWZvcm1hdCBvblxuXG5leHBvcnQgZW51bSBOYXZpZ2F0aW9uRXZlbnQge1xuICBQUkVWLFxuICBORVhUXG59XG4iLCJpbXBvcnQge0luamVjdGFibGUsIFRlbXBsYXRlUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGF5VGVtcGxhdGVDb250ZXh0fSBmcm9tICcuL2RhdGVwaWNrZXItZGF5LXRlbXBsYXRlLWNvbnRleHQnO1xuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiRGF0ZXBpY2tlciBjb21wb25lbnQuXG4gKiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LCBhbmQgY3VzdG9taXplIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW5cbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgZGF0ZXBpY2tlcnMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJDb25maWcge1xuICBkYXlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8RGF5VGVtcGxhdGVDb250ZXh0PjtcbiAgZGF5VGVtcGxhdGVEYXRhOiAoZGF0ZTogTmdiRGF0ZVN0cnVjdCwgY3VycmVudDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pID0+IGFueTtcbiAgZm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIGRpc3BsYXlNb250aHMgPSAxO1xuICBmaXJzdERheU9mV2VlayA9IDE7XG4gIG1hcmtEaXNhYmxlZDogKGRhdGU6IE5nYkRhdGVTdHJ1Y3QsIGN1cnJlbnQ6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9KSA9PiBib29sZWFuO1xuICBtaW5EYXRlOiBOZ2JEYXRlU3RydWN0O1xuICBtYXhEYXRlOiBOZ2JEYXRlU3RydWN0O1xuICBuYXZpZ2F0aW9uOiAnc2VsZWN0JyB8ICdhcnJvd3MnIHwgJ25vbmUnID0gJ3NlbGVjdCc7XG4gIG91dHNpZGVEYXlzOiAndmlzaWJsZScgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nID0gJ3Zpc2libGUnO1xuICBzaG93V2Vla2RheXMgPSB0cnVlO1xuICBzaG93V2Vla051bWJlcnMgPSBmYWxzZTtcbiAgc3RhcnREYXRlOiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfTtcbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4uL25nYi1kYXRlLXN0cnVjdCc7XG5pbXBvcnQge2lzSW50ZWdlcn0gZnJvbSAnLi4vLi4vdXRpbC91dGlsJztcblxuZXhwb3J0IGZ1bmN0aW9uIE5HQl9EQVRFUElDS0VSX0RBVEVfQURBUFRFUl9GQUNUT1JZKCkge1xuICByZXR1cm4gbmV3IE5nYkRhdGVTdHJ1Y3RBZGFwdGVyKCk7XG59XG5cbi8qKlxuICogQW4gYWJzdHJhY3QgY2xhc3MgdXNlZCBhcyB0aGUgREkgdG9rZW4gdGhhdCBkb2VzIGNvbnZlcnNpb24gYmV0d2VlbiB0aGUgaW50ZXJuYWxcbiAqIGRhdGVwaWNrZXIgTmdiRGF0ZVN0cnVjdCBtb2RlbCBhbmQgYW55IHByb3ZpZGVkIHVzZXIgZGF0ZSBtb2RlbCwgZXguIHN0cmluZywgbmF0aXZlIGRhdGUsIGV0Yy5cbiAqXG4gKiBBZGFwdGVyIGlzIHVzZWQgZm9yIGNvbnZlcnNpb24gd2hlbiBiaW5kaW5nIGRhdGVwaWNrZXIgdG8gYSBtb2RlbCB3aXRoIGZvcm1zLCBleC4gWyhuZ01vZGVsKV09XCJ1c2VyRGF0ZU1vZGVsXCJcbiAqXG4gKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIGFzc3VtZXMgTmdiRGF0ZVN0cnVjdCBmb3IgdXNlciBtb2RlbCBhcyB3ZWxsLlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnLCB1c2VGYWN0b3J5OiBOR0JfREFURVBJQ0tFUl9EQVRFX0FEQVBURVJfRkFDVE9SWX0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdiRGF0ZUFkYXB0ZXI8RD4ge1xuICAvKipcbiAgICogQ29udmVydHMgdXNlci1tb2RlbCBkYXRlIGludG8gYW4gTmdiRGF0ZVN0cnVjdCBmb3IgaW50ZXJuYWwgdXNlIGluIHRoZSBsaWJyYXJ5XG4gICAqL1xuICBhYnN0cmFjdCBmcm9tTW9kZWwodmFsdWU6IEQpOiBOZ2JEYXRlU3RydWN0O1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBpbnRlcm5hbCBkYXRlIHZhbHVlIE5nYkRhdGVTdHJ1Y3QgdG8gdXNlci1tb2RlbCBkYXRlXG4gICAqIFRoZSByZXR1cm5lZCB0eXBlIGlzIHN1cHBvc2VkIHRvIGJlIG9mIHRoZSBzYW1lIHR5cGUgYXMgZnJvbU1vZGVsKCkgaW5wdXQtdmFsdWUgcGFyYW1cbiAgICovXG4gIGFic3RyYWN0IHRvTW9kZWwoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IEQ7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlU3RydWN0QWRhcHRlciBleHRlbmRzIE5nYkRhdGVBZGFwdGVyPE5nYkRhdGVTdHJ1Y3Q+IHtcbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgTmdiRGF0ZVN0cnVjdCB2YWx1ZSBpbnRvIE5nYkRhdGVTdHJ1Y3QgdmFsdWVcbiAgICovXG4gIGZyb21Nb2RlbChkYXRlOiBOZ2JEYXRlU3RydWN0KTogTmdiRGF0ZVN0cnVjdCB7XG4gICAgcmV0dXJuIChkYXRlICYmIGlzSW50ZWdlcihkYXRlLnllYXIpICYmIGlzSW50ZWdlcihkYXRlLm1vbnRoKSAmJiBpc0ludGVnZXIoZGF0ZS5kYXkpKSA/XG4gICAgICAgIHt5ZWFyOiBkYXRlLnllYXIsIG1vbnRoOiBkYXRlLm1vbnRoLCBkYXk6IGRhdGUuZGF5fSA6XG4gICAgICAgIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBOZ2JEYXRlU3RydWN0IHZhbHVlIGludG8gTmdiRGF0ZVN0cnVjdCB2YWx1ZVxuICAgKi9cbiAgdG9Nb2RlbChkYXRlOiBOZ2JEYXRlU3RydWN0KTogTmdiRGF0ZVN0cnVjdCB7XG4gICAgcmV0dXJuIChkYXRlICYmIGlzSW50ZWdlcihkYXRlLnllYXIpICYmIGlzSW50ZWdlcihkYXRlLm1vbnRoKSAmJiBpc0ludGVnZXIoZGF0ZS5kYXkpKSA/XG4gICAgICAgIHt5ZWFyOiBkYXRlLnllYXIsIG1vbnRoOiBkYXRlLm1vbnRoLCBkYXk6IGRhdGUuZGF5fSA6XG4gICAgICAgIG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7ZnJvbUV2ZW50LCBtZXJnZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgdGFrZSwgdGFrZVVudGlsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7TmdiQ2FsZW5kYXJ9IGZyb20gJy4vbmdiLWNhbGVuZGFyJztcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJTZXJ2aWNlfSBmcm9tICcuL2RhdGVwaWNrZXItc2VydmljZSc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJLZXlNYXBTZXJ2aWNlfSBmcm9tICcuL2RhdGVwaWNrZXIta2V5bWFwLXNlcnZpY2UnO1xuaW1wb3J0IHtEYXRlcGlja2VyVmlld01vZGVsLCBOYXZpZ2F0aW9uRXZlbnR9IGZyb20gJy4vZGF0ZXBpY2tlci12aWV3LW1vZGVsJztcbmltcG9ydCB7RGF5VGVtcGxhdGVDb250ZXh0fSBmcm9tICcuL2RhdGVwaWNrZXItZGF5LXRlbXBsYXRlLWNvbnRleHQnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VyQ29uZmlnfSBmcm9tICcuL2RhdGVwaWNrZXItY29uZmlnJztcbmltcG9ydCB7TmdiRGF0ZUFkYXB0ZXJ9IGZyb20gJy4vYWRhcHRlcnMvbmdiLWRhdGUtYWRhcHRlcic7XG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcbmltcG9ydCB7aXNDaGFuZ2VkRGF0ZX0gZnJvbSAnLi9kYXRlcGlja2VyLXRvb2xzJztcbmltcG9ydCB7aGFzQ2xhc3NOYW1lfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuXG5jb25zdCBOR0JfREFURVBJQ0tFUl9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYkRhdGVwaWNrZXIpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqXG4gKiBUaGUgcGF5bG9hZCBvZiB0aGUgZGF0ZXBpY2tlciBuYXZpZ2F0aW9uIGV2ZW50XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnQge1xuICAvKipcbiAgICogQ3VycmVudGx5IGRpc3BsYXllZCBtb250aFxuICAgKi9cbiAgY3VycmVudDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn07XG5cbiAgLyoqXG4gICAqIE1vbnRoIHdlJ3JlIG5hdmlnYXRpbmcgdG9cbiAgICovXG4gIG5leHQ6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9O1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IHdpbGwgcHJldmVudCBuYXZpZ2F0aW9uIGlmIGNhbGxlZFxuICAgKlxuICAgKiBAc2luY2UgNC4xLjBcbiAgICovXG4gIHByZXZlbnREZWZhdWx0OiAoKSA9PiB2b2lkO1xufVxuXG4vKipcbiAqIEEgbGlnaHR3ZWlnaHQgYW5kIGhpZ2hseSBjb25maWd1cmFibGUgZGF0ZXBpY2tlciBkaXJlY3RpdmVcbiAqL1xuQENvbXBvbmVudCh7XG4gIGV4cG9ydEFzOiAnbmdiRGF0ZXBpY2tlcicsXG4gIHNlbGVjdG9yOiAnbmdiLWRhdGVwaWNrZXInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVVcmxzOiBbJy4vZGF0ZXBpY2tlci5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNkdCBsZXQtZGF0ZT1cImRhdGVcIiBsZXQtY3VycmVudE1vbnRoPVwiY3VycmVudE1vbnRoXCIgbGV0LXNlbGVjdGVkPVwic2VsZWN0ZWRcIiBsZXQtZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIGxldC1mb2N1c2VkPVwiZm9jdXNlZFwiPlxuICAgICAgPGRpdiBuZ2JEYXRlcGlja2VyRGF5Vmlld1xuICAgICAgICBbZGF0ZV09XCJkYXRlXCJcbiAgICAgICAgW2N1cnJlbnRNb250aF09XCJjdXJyZW50TW9udGhcIlxuICAgICAgICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICBbZm9jdXNlZF09XCJmb2N1c2VkXCI+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPGRpdiBjbGFzcz1cIm5nYi1kcC1oZWFkZXIgYmctbGlnaHRcIj5cbiAgICAgIDxuZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uICpuZ0lmPVwibmF2aWdhdGlvbiAhPT0gJ25vbmUnXCJcbiAgICAgICAgW2RhdGVdPVwibW9kZWwuZmlyc3REYXRlXCJcbiAgICAgICAgW21vbnRoc109XCJtb2RlbC5tb250aHNcIlxuICAgICAgICBbZGlzYWJsZWRdPVwibW9kZWwuZGlzYWJsZWRcIlxuICAgICAgICBbc2hvd1NlbGVjdF09XCJtb2RlbC5uYXZpZ2F0aW9uID09PSAnc2VsZWN0J1wiXG4gICAgICAgIFtwcmV2RGlzYWJsZWRdPVwibW9kZWwucHJldkRpc2FibGVkXCJcbiAgICAgICAgW25leHREaXNhYmxlZF09XCJtb2RlbC5uZXh0RGlzYWJsZWRcIlxuICAgICAgICBbc2VsZWN0Qm94ZXNdPVwibW9kZWwuc2VsZWN0Qm94ZXNcIlxuICAgICAgICAobmF2aWdhdGUpPVwib25OYXZpZ2F0ZUV2ZW50KCRldmVudClcIlxuICAgICAgICAoc2VsZWN0KT1cIm9uTmF2aWdhdGVEYXRlU2VsZWN0KCRldmVudClcIj5cbiAgICAgIDwvbmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgI21vbnRocyBjbGFzcz1cIm5nYi1kcC1tb250aHNcIiAoa2V5ZG93bik9XCJvbktleURvd24oJGV2ZW50KVwiPlxuICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1tb250aCBbbmdGb3JPZl09XCJtb2RlbC5tb250aHNcIiBsZXQtaT1cImluZGV4XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtbW9udGhcIj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwibmF2aWdhdGlvbiA9PT0gJ25vbmUnIHx8IChkaXNwbGF5TW9udGhzID4gMSAmJiBuYXZpZ2F0aW9uID09PSAnc2VsZWN0JylcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwibmdiLWRwLW1vbnRoLW5hbWUgYmctbGlnaHRcIj5cbiAgICAgICAgICAgIHt7IGkxOG4uZ2V0TW9udGhGdWxsTmFtZShtb250aC5udW1iZXIsIG1vbnRoLnllYXIpIH19IHt7IGkxOG4uZ2V0WWVhck51bWVyYWxzKG1vbnRoLnllYXIpIH19XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPG5nYi1kYXRlcGlja2VyLW1vbnRoLXZpZXdcbiAgICAgICAgICAgIFttb250aF09XCJtb250aFwiXG4gICAgICAgICAgICBbZGF5VGVtcGxhdGVdPVwiZGF5VGVtcGxhdGUgfHwgZHRcIlxuICAgICAgICAgICAgW3Nob3dXZWVrZGF5c109XCJzaG93V2Vla2RheXNcIlxuICAgICAgICAgICAgW3Nob3dXZWVrTnVtYmVyc109XCJzaG93V2Vla051bWJlcnNcIlxuICAgICAgICAgICAgKHNlbGVjdCk9XCJvbkRhdGVTZWxlY3QoJGV2ZW50KVwiPlxuICAgICAgICAgIDwvbmdiLWRhdGVwaWNrZXItbW9udGgtdmlldz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuXG4gICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImZvb3RlclRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbTkdCX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1IsIE5nYkRhdGVwaWNrZXJTZXJ2aWNlLCBOZ2JEYXRlcGlja2VyS2V5TWFwU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlciBpbXBsZW1lbnRzIE9uRGVzdHJveSxcbiAgICBPbkNoYW5nZXMsIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBtb2RlbDogRGF0ZXBpY2tlclZpZXdNb2RlbDtcblxuICBAVmlld0NoaWxkKCdtb250aHMnKSBwcml2YXRlIF9tb250aHNFbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIHByaXZhdGUgX2NvbnRyb2xWYWx1ZTogTmdiRGF0ZTtcbiAgcHJpdmF0ZSBfZGVzdHJveWVkJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIFJlZmVyZW5jZSBmb3IgdGhlIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgdGhlIGRheSBkaXNwbGF5XG4gICAqL1xuICBASW5wdXQoKSBkYXlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8RGF5VGVtcGxhdGVDb250ZXh0PjtcblxuICAvKipcbiAgICogQ2FsbGJhY2sgdG8gcGFzcyBhbnkgYXJiaXRyYXJ5IGRhdGEgdG8gdGhlIGN1c3RvbSBkYXkgdGVtcGxhdGUgY29udGV4dFxuICAgKiAnQ3VycmVudCcgY29udGFpbnMgdGhlIG1vbnRoIHRoYXQgd2lsbCBiZSBkaXNwbGF5ZWQgaW4gdGhlIHZpZXdcbiAgICpcbiAgICogQHNpbmNlIDMuMy4wXG4gICAqL1xuICBASW5wdXQoKSBkYXlUZW1wbGF0ZURhdGE6IChkYXRlOiBOZ2JEYXRlLCBjdXJyZW50OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfSkgPT4gYW55O1xuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgbW9udGhzIHRvIGRpc3BsYXlcbiAgICovXG4gIEBJbnB1dCgpIGRpc3BsYXlNb250aHM6IG51bWJlcjtcblxuICAvKipcbiAgICogRmlyc3QgZGF5IG9mIHRoZSB3ZWVrLiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnd2Vla2RheScgaXMgMT1Nb24gLi4uIDc9U3VuXG4gICAqL1xuICBASW5wdXQoKSBmaXJzdERheU9mV2VlazogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgZm9yIHRoZSBjdXN0b20gdGVtcGxhdGUgZm9yIHRoZSBmb290ZXJcbiAgICpcbiAgICogQHNpbmNlIDMuMy4wXG4gICAqL1xuICBASW5wdXQoKSBmb290ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQ2FsbGJhY2sgdG8gbWFyayBhIGdpdmVuIGRhdGUgYXMgZGlzYWJsZWQuXG4gICAqICdDdXJyZW50JyBjb250YWlucyB0aGUgbW9udGggdGhhdCB3aWxsIGJlIGRpc3BsYXllZCBpbiB0aGUgdmlld1xuICAgKi9cbiAgQElucHV0KCkgbWFya0Rpc2FibGVkOiAoZGF0ZTogTmdiRGF0ZSwgY3VycmVudDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pID0+IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIE1heCBkYXRlIGZvciB0aGUgbmF2aWdhdGlvbi4gSWYgbm90IHByb3ZpZGVkLCAneWVhcicgc2VsZWN0IGJveCB3aWxsIGRpc3BsYXkgMTAgeWVhcnMgYWZ0ZXIgY3VycmVudCBtb250aFxuICAgKi9cbiAgQElucHV0KCkgbWF4RGF0ZTogTmdiRGF0ZVN0cnVjdDtcblxuICAvKipcbiAgICogTWluIGRhdGUgZm9yIHRoZSBuYXZpZ2F0aW9uLiBJZiBub3QgcHJvdmlkZWQsICd5ZWFyJyBzZWxlY3QgYm94IHdpbGwgZGlzcGxheSAxMCB5ZWFycyBiZWZvcmUgY3VycmVudCBtb250aFxuICAgKi9cbiAgQElucHV0KCkgbWluRGF0ZTogTmdiRGF0ZVN0cnVjdDtcblxuICAvKipcbiAgICogTmF2aWdhdGlvbiB0eXBlOiBgc2VsZWN0YCAoZGVmYXVsdCB3aXRoIHNlbGVjdCBib3hlcyBmb3IgbW9udGggYW5kIHllYXIpLCBgYXJyb3dzYFxuICAgKiAod2l0aG91dCBzZWxlY3QgYm94ZXMsIG9ubHkgbmF2aWdhdGlvbiBhcnJvd3MpIG9yIGBub25lYCAobm8gbmF2aWdhdGlvbiBhdCBhbGwpXG4gICAqL1xuICBASW5wdXQoKSBuYXZpZ2F0aW9uOiAnc2VsZWN0JyB8ICdhcnJvd3MnIHwgJ25vbmUnO1xuXG4gIC8qKlxuICAgKiBUaGUgd2F5IHRvIGRpc3BsYXkgZGF5cyB0aGF0IGRvbid0IGJlbG9uZyB0byBjdXJyZW50IG1vbnRoOiBgdmlzaWJsZWAgKGRlZmF1bHQpLFxuICAgKiBgaGlkZGVuYCAobm90IGRpc3BsYXllZCkgb3IgYGNvbGxhcHNlZGAgKG5vdCBkaXNwbGF5ZWQgd2l0aCBlbXB0eSBzcGFjZSBjb2xsYXBzZWQpXG4gICAqL1xuICBASW5wdXQoKSBvdXRzaWRlRGF5czogJ3Zpc2libGUnIHwgJ2NvbGxhcHNlZCcgfCAnaGlkZGVuJztcblxuICAvKipcbiAgICogV2hldGhlciB0byBkaXNwbGF5IGRheXMgb2YgdGhlIHdlZWtcbiAgICovXG4gIEBJbnB1dCgpIHNob3dXZWVrZGF5czogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBkaXNwbGF5IHdlZWsgbnVtYmVyc1xuICAgKi9cbiAgQElucHV0KCkgc2hvd1dlZWtOdW1iZXJzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBEYXRlIHRvIG9wZW4gY2FsZW5kYXIgd2l0aC5cbiAgICogV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ21vbnRoJyBpcyAxPUphbiAuLi4gMTI9RGVjLlxuICAgKiBJZiBub3RoaW5nIG9yIGludmFsaWQgZGF0ZSBwcm92aWRlZCwgY2FsZW5kYXIgd2lsbCBvcGVuIHdpdGggY3VycmVudCBtb250aC5cbiAgICogVXNlICduYXZpZ2F0ZVRvKGRhdGUpJyBhcyBhbiBhbHRlcm5hdGl2ZVxuICAgKi9cbiAgQElucHV0KCkgc3RhcnREYXRlOiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXk/OiBudW1iZXJ9O1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCBmaXJlZCByaWdodCBiZWZvcmUgdGhlIG5hdmlnYXRpb24gaGFwcGVucyBhbmQgY3VycmVudGx5IGRpc3BsYXllZCBtb250aCBjaGFuZ2VzLlxuICAgKiBTZWUgTmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnQgZm9yIHRoZSBwYXlsb2FkIGluZm8uXG4gICAqL1xuICBAT3V0cHV0KCkgbmF2aWdhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCBmaXJlZCB3aGVuIHVzZXIgc2VsZWN0cyBhIGRhdGUgdXNpbmcga2V5Ym9hcmQgb3IgbW91c2UuXG4gICAqIFRoZSBwYXlsb2FkIG9mIHRoZSBldmVudCBpcyBjdXJyZW50bHkgc2VsZWN0ZWQgTmdiRGF0ZS5cbiAgICovXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGU+KCk7XG5cbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9rZXlNYXBTZXJ2aWNlOiBOZ2JEYXRlcGlja2VyS2V5TWFwU2VydmljZSwgcHVibGljIF9zZXJ2aWNlOiBOZ2JEYXRlcGlja2VyU2VydmljZSxcbiAgICAgIHByaXZhdGUgX2NhbGVuZGFyOiBOZ2JDYWxlbmRhciwgcHVibGljIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuLCBjb25maWc6IE5nYkRhdGVwaWNrZXJDb25maWcsXG4gICAgICBwcml2YXRlIF9jZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgcHJpdmF0ZSBfbmdiRGF0ZUFkYXB0ZXI6IE5nYkRhdGVBZGFwdGVyPGFueT4sIHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7XG4gICAgWydkYXlUZW1wbGF0ZScsICdkYXlUZW1wbGF0ZURhdGEnLCAnZGlzcGxheU1vbnRocycsICdmaXJzdERheU9mV2VlaycsICdmb290ZXJUZW1wbGF0ZScsICdtYXJrRGlzYWJsZWQnLCAnbWluRGF0ZScsXG4gICAgICdtYXhEYXRlJywgJ25hdmlnYXRpb24nLCAnb3V0c2lkZURheXMnLCAnc2hvd1dlZWtkYXlzJywgJ3Nob3dXZWVrTnVtYmVycycsICdzdGFydERhdGUnXVxuICAgICAgICAuZm9yRWFjaChpbnB1dCA9PiB0aGlzW2lucHV0XSA9IGNvbmZpZ1tpbnB1dF0pO1xuXG4gICAgX3NlcnZpY2Uuc2VsZWN0JC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQkKSkuc3Vic2NyaWJlKGRhdGUgPT4geyB0aGlzLnNlbGVjdC5lbWl0KGRhdGUpOyB9KTtcblxuICAgIF9zZXJ2aWNlLm1vZGVsJC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQkKSkuc3Vic2NyaWJlKG1vZGVsID0+IHtcbiAgICAgIGNvbnN0IG5ld0RhdGUgPSBtb2RlbC5maXJzdERhdGU7XG4gICAgICBjb25zdCBvbGREYXRlID0gdGhpcy5tb2RlbCA/IHRoaXMubW9kZWwuZmlyc3REYXRlIDogbnVsbDtcblxuICAgICAgbGV0IG5hdmlnYXRpb25QcmV2ZW50ZWQgPSBmYWxzZTtcbiAgICAgIC8vIGVtaXR0aW5nIG5hdmlnYXRpb24gZXZlbnQgaWYgdGhlIGZpcnN0IG1vbnRoIGNoYW5nZXNcbiAgICAgIGlmICghbmV3RGF0ZS5lcXVhbHMob2xkRGF0ZSkpIHtcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZS5lbWl0KHtcbiAgICAgICAgICBjdXJyZW50OiBvbGREYXRlID8ge3llYXI6IG9sZERhdGUueWVhciwgbW9udGg6IG9sZERhdGUubW9udGh9IDogbnVsbCxcbiAgICAgICAgICBuZXh0OiB7eWVhcjogbmV3RGF0ZS55ZWFyLCBtb250aDogbmV3RGF0ZS5tb250aH0sXG4gICAgICAgICAgcHJldmVudERlZmF1bHQ6ICgpID0+IG5hdmlnYXRpb25QcmV2ZW50ZWQgPSB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNhbid0IHByZXZlbnQgdGhlIHZlcnkgZmlyc3QgbmF2aWdhdGlvblxuICAgICAgICBpZiAobmF2aWdhdGlvblByZXZlbnRlZCAmJiBvbGREYXRlICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fc2VydmljZS5yZXNldCh0aGlzLm1vZGVsKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3U2VsZWN0ZWREYXRlID0gbW9kZWwuc2VsZWN0ZWREYXRlO1xuICAgICAgY29uc3QgbmV3Rm9jdXNlZERhdGUgPSBtb2RlbC5mb2N1c0RhdGU7XG4gICAgICBjb25zdCBvbGRGb2N1c2VkRGF0ZSA9IHRoaXMubW9kZWwgPyB0aGlzLm1vZGVsLmZvY3VzRGF0ZSA6IG51bGw7XG5cbiAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgICAgLy8gaGFuZGxpbmcgc2VsZWN0aW9uIGNoYW5nZVxuICAgICAgaWYgKGlzQ2hhbmdlZERhdGUobmV3U2VsZWN0ZWREYXRlLCB0aGlzLl9jb250cm9sVmFsdWUpKSB7XG4gICAgICAgIHRoaXMuX2NvbnRyb2xWYWx1ZSA9IG5ld1NlbGVjdGVkRGF0ZTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLl9uZ2JEYXRlQWRhcHRlci50b01vZGVsKG5ld1NlbGVjdGVkRGF0ZSkpO1xuICAgICAgfVxuXG4gICAgICAvLyBoYW5kbGluZyBmb2N1cyBjaGFuZ2VcbiAgICAgIGlmIChpc0NoYW5nZWREYXRlKG5ld0ZvY3VzZWREYXRlLCBvbGRGb2N1c2VkRGF0ZSkgJiYgb2xkRm9jdXNlZERhdGUgJiYgbW9kZWwuZm9jdXNWaXNpYmxlKSB7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgIH1cblxuICAgICAgX2NkLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hbnVhbGx5IGZvY3VzIHRoZSBmb2N1c2FibGUgZGF5IGluIHRoZSBkYXRlcGlja2VyXG4gICAqL1xuICBmb2N1cygpIHtcbiAgICB0aGlzLl9uZ1pvbmUub25TdGFibGUuYXNPYnNlcnZhYmxlKCkucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudFRvRm9jdXMgPVxuICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yPEhUTUxEaXZFbGVtZW50PignZGl2Lm5nYi1kcC1kYXlbdGFiaW5kZXg9XCIwXCJdJyk7XG4gICAgICBpZiAoZWxlbWVudFRvRm9jdXMpIHtcbiAgICAgICAgZWxlbWVudFRvRm9jdXMuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZXMgY3VycmVudCB2aWV3IHRvIHByb3ZpZGVkIGRhdGUuXG4gICAqIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICdtb250aCcgaXMgMT1KYW4gLi4uIDEyPURlYy5cbiAgICogSWYgbm90aGluZyBvciBpbnZhbGlkIGRhdGUgcHJvdmlkZWQgY2FsZW5kYXIgd2lsbCBvcGVuIGN1cnJlbnQgbW9udGguXG4gICAqIFVzZSAnc3RhcnREYXRlJyBpbnB1dCBhcyBhbiBhbHRlcm5hdGl2ZVxuICAgKi9cbiAgbmF2aWdhdGVUbyhkYXRlPzoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF5PzogbnVtYmVyfSkge1xuICAgIHRoaXMuX3NlcnZpY2Uub3BlbihOZ2JEYXRlLmZyb20oZGF0ZSA/IGRhdGUuZGF5ID8gZGF0ZSBhcyBOZ2JEYXRlU3RydWN0IDogey4uLmRhdGUsIGRheTogMX0gOiBudWxsKSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGNvbnN0IGZvY3VzSW5zJCA9IGZyb21FdmVudDxGb2N1c0V2ZW50Pih0aGlzLl9tb250aHNFbC5uYXRpdmVFbGVtZW50LCAnZm9jdXNpbicpO1xuICAgICAgY29uc3QgZm9jdXNPdXRzJCA9IGZyb21FdmVudDxGb2N1c0V2ZW50Pih0aGlzLl9tb250aHNFbC5uYXRpdmVFbGVtZW50LCAnZm9jdXNvdXQnKTtcblxuICAgICAgLy8gd2UncmUgY2hhbmdpbmcgJ2ZvY3VzVmlzaWJsZScgb25seSB3aGVuIGVudGVyaW5nIG9yIGxlYXZpbmcgbW9udGhzIHZpZXdcbiAgICAgIC8vIGFuZCBpZ25vcmluZyBhbGwgZm9jdXMgZXZlbnRzIHdoZXJlIGJvdGggJ3RhcmdldCcgYW5kICdyZWxhdGVkJyB0YXJnZXQgYXJlIGRheSBjZWxsc1xuICAgICAgbWVyZ2UoZm9jdXNJbnMkLCBmb2N1c091dHMkKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICAgICAgICAoe3RhcmdldCwgcmVsYXRlZFRhcmdldH0pID0+XG4gICAgICAgICAgICAgICAgICAgICAgIShoYXNDbGFzc05hbWUodGFyZ2V0LCAnbmdiLWRwLWRheScpICYmIGhhc0NsYXNzTmFtZShyZWxhdGVkVGFyZ2V0LCAnbmdiLWRwLWRheScpKSksXG4gICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQkKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCh7dHlwZX0pID0+IHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5fc2VydmljZS5mb2N1c1Zpc2libGUgPSB0eXBlID09PSAnZm9jdXNpbicpKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkgeyB0aGlzLl9kZXN0cm95ZWQkLm5leHQoKTsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLm1vZGVsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIFsnZGF5VGVtcGxhdGVEYXRhJywgJ2Rpc3BsYXlNb250aHMnLCAnbWFya0Rpc2FibGVkJywgJ2ZpcnN0RGF5T2ZXZWVrJywgJ25hdmlnYXRpb24nLCAnbWluRGF0ZScsICdtYXhEYXRlJyxcbiAgICAgICAnb3V0c2lkZURheXMnXVxuICAgICAgICAgIC5mb3JFYWNoKGlucHV0ID0+IHRoaXMuX3NlcnZpY2VbaW5wdXRdID0gdGhpc1tpbnB1dF0pO1xuICAgICAgdGhpcy5uYXZpZ2F0ZVRvKHRoaXMuc3RhcnREYXRlKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgWydkYXlUZW1wbGF0ZURhdGEnLCAnZGlzcGxheU1vbnRocycsICdtYXJrRGlzYWJsZWQnLCAnZmlyc3REYXlPZldlZWsnLCAnbmF2aWdhdGlvbicsICdtaW5EYXRlJywgJ21heERhdGUnLFxuICAgICAnb3V0c2lkZURheXMnXVxuICAgICAgICAuZmlsdGVyKGlucHV0ID0+IGlucHV0IGluIGNoYW5nZXMpXG4gICAgICAgIC5mb3JFYWNoKGlucHV0ID0+IHRoaXMuX3NlcnZpY2VbaW5wdXRdID0gdGhpc1tpbnB1dF0pO1xuXG4gICAgaWYgKCdzdGFydERhdGUnIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMubmF2aWdhdGVUbyh0aGlzLnN0YXJ0RGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgb25EYXRlU2VsZWN0KGRhdGU6IE5nYkRhdGUpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzKGRhdGUpO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2VsZWN0KGRhdGUsIHtlbWl0RXZlbnQ6IHRydWV9KTtcbiAgfVxuXG4gIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkgeyB0aGlzLl9rZXlNYXBTZXJ2aWNlLnByb2Nlc3NLZXkoZXZlbnQpOyB9XG5cbiAgb25OYXZpZ2F0ZURhdGVTZWxlY3QoZGF0ZTogTmdiRGF0ZSkgeyB0aGlzLl9zZXJ2aWNlLm9wZW4oZGF0ZSk7IH1cblxuICBvbk5hdmlnYXRlRXZlbnQoZXZlbnQ6IE5hdmlnYXRpb25FdmVudCkge1xuICAgIHN3aXRjaCAoZXZlbnQpIHtcbiAgICAgIGNhc2UgTmF2aWdhdGlvbkV2ZW50LlBSRVY6XG4gICAgICAgIHRoaXMuX3NlcnZpY2Uub3Blbih0aGlzLl9jYWxlbmRhci5nZXRQcmV2KHRoaXMubW9kZWwuZmlyc3REYXRlLCAnbScsIDEpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE5hdmlnYXRpb25FdmVudC5ORVhUOlxuICAgICAgICB0aGlzLl9zZXJ2aWNlLm9wZW4odGhpcy5fY2FsZW5kYXIuZ2V0TmV4dCh0aGlzLm1vZGVsLmZpcnN0RGF0ZSwgJ20nLCAxKSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vbkNoYW5nZSA9IGZuOyB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uVG91Y2hlZCA9IGZuOyB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7IHRoaXMuX3NlcnZpY2UuZGlzYWJsZWQgPSBpc0Rpc2FibGVkOyB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuX2NvbnRyb2xWYWx1ZSA9IE5nYkRhdGUuZnJvbSh0aGlzLl9uZ2JEYXRlQWRhcHRlci5mcm9tTW9kZWwodmFsdWUpKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnNlbGVjdCh0aGlzLl9jb250cm9sVmFsdWUpO1xuICB9XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNb250aFZpZXdNb2RlbCwgRGF5Vmlld01vZGVsfSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xuaW1wb3J0IHtEYXlUZW1wbGF0ZUNvbnRleHR9IGZyb20gJy4vZGF0ZXBpY2tlci1kYXktdGVtcGxhdGUtY29udGV4dCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1kYXRlcGlja2VyLW1vbnRoLXZpZXcnLFxuICBob3N0OiB7J3JvbGUnOiAnZ3JpZCd9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZVVybHM6IFsnLi9kYXRlcGlja2VyLW1vbnRoLXZpZXcuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgKm5nSWY9XCJzaG93V2Vla2RheXNcIiBjbGFzcz1cIm5nYi1kcC13ZWVrIG5nYi1kcC13ZWVrZGF5cyBiZy1saWdodFwiPlxuICAgICAgPGRpdiAqbmdJZj1cInNob3dXZWVrTnVtYmVyc1wiIGNsYXNzPVwibmdiLWRwLXdlZWtkYXkgbmdiLWRwLXNob3d3ZWVrXCI+PC9kaXY+XG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCB3IG9mIG1vbnRoLndlZWtkYXlzXCIgY2xhc3M9XCJuZ2ItZHAtd2Vla2RheSBzbWFsbFwiPlxuICAgICAgICB7eyBpMThuLmdldFdlZWtkYXlTaG9ydE5hbWUodykgfX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtd2VlayBbbmdGb3JPZl09XCJtb250aC53ZWVrc1wiPlxuICAgICAgPGRpdiAqbmdJZj1cIiF3ZWVrLmNvbGxhcHNlZFwiIGNsYXNzPVwibmdiLWRwLXdlZWtcIiByb2xlPVwicm93XCI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzaG93V2Vla051bWJlcnNcIiBjbGFzcz1cIm5nYi1kcC13ZWVrLW51bWJlciBzbWFsbCB0ZXh0LW11dGVkXCI+e3sgaTE4bi5nZXRXZWVrTnVtZXJhbHMod2Vlay5udW1iZXIpIH19PC9kaXY+XG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGRheSBvZiB3ZWVrLmRheXNcIiAoY2xpY2spPVwiZG9TZWxlY3QoZGF5KVwiIGNsYXNzPVwibmdiLWRwLWRheVwiIHJvbGU9XCJncmlkY2VsbFwiXG4gICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRheS5jb250ZXh0LmRpc2FibGVkXCJcbiAgICAgICAgICBbdGFiaW5kZXhdPVwiZGF5LnRhYmluZGV4XCJcbiAgICAgICAgICBbY2xhc3MuaGlkZGVuXT1cImRheS5oaWRkZW5cIlxuICAgICAgICAgIFtjbGFzcy5uZ2ItZHAtdG9kYXldPVwiZGF5LmNvbnRleHQudG9kYXlcIlxuICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZGF5LmFyaWFMYWJlbFwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhZGF5LmhpZGRlblwiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImRheVRlbXBsYXRlXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImRheS5jb250ZXh0XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlck1vbnRoVmlldyB7XG4gIEBJbnB1dCgpIGRheVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxEYXlUZW1wbGF0ZUNvbnRleHQ+O1xuICBASW5wdXQoKSBtb250aDogTW9udGhWaWV3TW9kZWw7XG4gIEBJbnB1dCgpIHNob3dXZWVrZGF5cztcbiAgQElucHV0KCkgc2hvd1dlZWtOdW1iZXJzO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGU+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuKSB7fVxuXG4gIGRvU2VsZWN0KGRheTogRGF5Vmlld01vZGVsKSB7XG4gICAgaWYgKCFkYXkuY29udGV4dC5kaXNhYmxlZCAmJiAhZGF5LmhpZGRlbikge1xuICAgICAgdGhpcy5zZWxlY3QuZW1pdChkYXkuZGF0ZSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOYXZpZ2F0aW9uRXZlbnQsIE1vbnRoVmlld01vZGVsfSBmcm9tICcuL2RhdGVwaWNrZXItdmlldy1tb2RlbCc7XG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlVXJsczogWycuL2RhdGVwaWNrZXItbmF2aWdhdGlvbi5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIm5nYi1kcC1hcnJvd1wiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpbmsgbmdiLWRwLWFycm93LWJ0blwiIChjbGljayk9XCJuYXZpZ2F0ZS5lbWl0KG5hdmlnYXRpb24uUFJFVilcIiBbZGlzYWJsZWRdPVwicHJldkRpc2FibGVkXCJcbiAgICAgICAgICAgICAgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IuZGF0ZXBpY2tlci5wcmV2aW91cy1tb250aFwiIGFyaWEtbGFiZWw9XCJQcmV2aW91cyBtb250aFwiXG4gICAgICAgICAgICAgIGkxOG4tdGl0bGU9XCJAQG5nYi5kYXRlcGlja2VyLnByZXZpb3VzLW1vbnRoXCIgdGl0bGU9XCJQcmV2aW91cyBtb250aFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIm5nYi1kcC1uYXZpZ2F0aW9uLWNoZXZyb25cIj48L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8bmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbi1zZWxlY3QgKm5nSWY9XCJzaG93U2VsZWN0XCIgY2xhc3M9XCJuZ2ItZHAtbmF2aWdhdGlvbi1zZWxlY3RcIlxuICAgICAgW2RhdGVdPVwiZGF0ZVwiXG4gICAgICBbZGlzYWJsZWRdID0gXCJkaXNhYmxlZFwiXG4gICAgICBbbW9udGhzXT1cInNlbGVjdEJveGVzLm1vbnRoc1wiXG4gICAgICBbeWVhcnNdPVwic2VsZWN0Qm94ZXMueWVhcnNcIlxuICAgICAgKHNlbGVjdCk9XCJzZWxlY3QuZW1pdCgkZXZlbnQpXCI+XG4gICAgPC9uZ2ItZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdD5cblxuICAgIDxuZy10ZW1wbGF0ZSAqbmdJZj1cIiFzaG93U2VsZWN0XCIgbmdGb3IgbGV0LW1vbnRoIFtuZ0Zvck9mXT1cIm1vbnRoc1wiIGxldC1pPVwiaW5kZXhcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtYXJyb3dcIiAqbmdJZj1cImkgPiAwXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLW1vbnRoLW5hbWVcIj5cbiAgICAgICAge3sgaTE4bi5nZXRNb250aEZ1bGxOYW1lKG1vbnRoLm51bWJlciwgbW9udGgueWVhcikgfX0ge3sgaTE4bi5nZXRZZWFyTnVtZXJhbHMobW9udGgueWVhcikgfX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5nYi1kcC1hcnJvd1wiICpuZ0lmPVwiaSAhPT0gbW9udGhzLmxlbmd0aCAtIDFcIj48L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtYXJyb3cgcmlnaHRcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1saW5rIG5nYi1kcC1hcnJvdy1idG5cIiAoY2xpY2spPVwibmF2aWdhdGUuZW1pdChuYXZpZ2F0aW9uLk5FWFQpXCIgW2Rpc2FibGVkXT1cIm5leHREaXNhYmxlZFwiXG4gICAgICAgICAgICAgIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLmRhdGVwaWNrZXIubmV4dC1tb250aFwiIGFyaWEtbGFiZWw9XCJOZXh0IG1vbnRoXCJcbiAgICAgICAgICAgICAgaTE4bi10aXRsZT1cIkBAbmdiLmRhdGVwaWNrZXIubmV4dC1tb250aFwiIHRpdGxlPVwiTmV4dCBtb250aFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIm5nYi1kcC1uYXZpZ2F0aW9uLWNoZXZyb25cIj48L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXJOYXZpZ2F0aW9uIHtcbiAgbmF2aWdhdGlvbiA9IE5hdmlnYXRpb25FdmVudDtcblxuICBASW5wdXQoKSBkYXRlOiBOZ2JEYXRlO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgbW9udGhzOiBNb250aFZpZXdNb2RlbFtdID0gW107XG4gIEBJbnB1dCgpIHNob3dTZWxlY3Q6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHByZXZEaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgbmV4dERpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBzZWxlY3RCb3hlczoge3llYXJzOiBudW1iZXJbXSwgbW9udGhzOiBudW1iZXJbXX07XG5cbiAgQE91dHB1dCgpIG5hdmlnYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxOYXZpZ2F0aW9uRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGU+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuKSB7fVxufVxuIiwiaW1wb3J0IHtOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtmcm9tRXZlbnQsIE9ic2VydmFibGUsIHJhY2V9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkZWxheSwgZmlsdGVyLCBtYXAsIHRha2VVbnRpbCwgd2l0aExhdGVzdEZyb219IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7S2V5fSBmcm9tICcuL2tleSc7XG5cbmNvbnN0IGlzSFRNTEVsZW1lbnRDb250YWluZWRJbiA9IChlbGVtZW50OiBIVE1MRWxlbWVudCwgYXJyYXk/OiBIVE1MRWxlbWVudFtdKSA9PlxuICAgIGFycmF5ID8gYXJyYXkuc29tZShpdGVtID0+IGl0ZW0uY29udGFpbnMoZWxlbWVudCkpIDogZmFsc2U7XG5cbi8vIHdlJ2xsIGhhdmUgdG8gdXNlICd0b3VjaCcgZXZlbnRzIGluc3RlYWQgb2YgJ21vdXNlJyBldmVudHMgb24gaU9TIGFuZCBhZGQgYSBtb3JlIHNpZ25pZmljYW50IGRlbGF5XG4vLyB0byBhdm9pZCByZS1vcGVuaW5nIHdoZW4gaGFuZGxpbmcgKGNsaWNrKSBvbiBhIHRvZ2dsaW5nIGVsZW1lbnRcbi8vIFRPRE86IHVzZSBwcm9wZXIgQW5ndWxhciBwbGF0Zm9ybSBkZXRlY3Rpb24gd2hlbiBOZ2JBdXRvQ2xvc2UgYmVjb21lcyBhIHNlcnZpY2UgYW5kIHdlIGNhbiBpbmplY3QgUExBVEZPUk1fSURcbmxldCBpT1MgPSBmYWxzZTtcbmlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJykge1xuICBpT1MgPSAhIW5hdmlnYXRvci51c2VyQWdlbnQgJiYgL2lQYWR8aVBob25lfGlQb2QvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZ2JBdXRvQ2xvc2UoXG4gICAgem9uZTogTmdab25lLCBkb2N1bWVudDogYW55LCB0eXBlOiBib29sZWFuIHwgJ2luc2lkZScgfCAnb3V0c2lkZScsIGNsb3NlOiAoKSA9PiB2b2lkLCBjbG9zZWQkOiBPYnNlcnZhYmxlPGFueT4sXG4gICAgaW5zaWRlRWxlbWVudHM6IEhUTUxFbGVtZW50W10sIGlnbm9yZUVsZW1lbnRzPzogSFRNTEVsZW1lbnRbXSkge1xuICAvLyBjbG9zaW5nIG9uIEVTQyBhbmQgb3V0c2lkZSBjbGlja3NcbiAgaWYgKHR5cGUpIHtcbiAgICB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcblxuICAgICAgY29uc3Qgc2hvdWxkQ2xvc2VPbkNsaWNrID0gKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBpZiAoKGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCAmJiBldmVudC5idXR0b24gPT09IDIpIHx8IGlzSFRNTEVsZW1lbnRDb250YWluZWRJbihlbGVtZW50LCBpZ25vcmVFbGVtZW50cykpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT09ICdpbnNpZGUnKSB7XG4gICAgICAgICAgcmV0dXJuIGlzSFRNTEVsZW1lbnRDb250YWluZWRJbihlbGVtZW50LCBpbnNpZGVFbGVtZW50cyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ291dHNpZGUnKSB7XG4gICAgICAgICAgcmV0dXJuICFpc0hUTUxFbGVtZW50Q29udGFpbmVkSW4oZWxlbWVudCwgaW5zaWRlRWxlbWVudHMpO1xuICAgICAgICB9IGVsc2UgLyogaWYgKHR5cGUgPT09IHRydWUpICovIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3QgZXNjYXBlcyQgPSBmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4oZG9jdW1lbnQsICdrZXlkb3duJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2VVbnRpbChjbG9zZWQkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoZSA9PiBlLndoaWNoID09PSBLZXkuRXNjYXBlKSk7XG5cblxuICAgICAgLy8gd2UgaGF2ZSB0byBwcmUtY2FsY3VsYXRlICdzaG91bGRDbG9zZU9uQ2xpY2snIG9uICdtb3VzZWRvd24vdG91Y2hzdGFydCcsXG4gICAgICAvLyBiZWNhdXNlIG9uICdtb3VzZXVwL3RvdWNoZW5kJyBET00gbm9kZXMgbWlnaHQgYmUgZGV0YWNoZWRcbiAgICAgIGNvbnN0IG1vdXNlRG93bnMkID0gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KGRvY3VtZW50LCBpT1MgPyAndG91Y2hzdGFydCcgOiAnbW91c2Vkb3duJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcChzaG91bGRDbG9zZU9uQ2xpY2spLCB0YWtlVW50aWwoY2xvc2VkJCkpO1xuXG4gICAgICBjb25zdCBjbG9zZWFibGVDbGlja3MkID0gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KGRvY3VtZW50LCBpT1MgPyAndG91Y2hlbmQnIDogJ21vdXNldXAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKG1vdXNlRG93bnMkKSwgZmlsdGVyKChbXywgc2hvdWxkQ2xvc2VdKSA9PiBzaG91bGRDbG9zZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxheShpT1MgPyAxNiA6IDApLCB0YWtlVW50aWwoY2xvc2VkJCkpO1xuXG5cbiAgICAgIHJhY2U8RXZlbnQ+KFtlc2NhcGVzJCwgY2xvc2VhYmxlQ2xpY2tzJF0pLnN1YnNjcmliZSgoKSA9PiB6b25lLnJ1bihjbG9zZSkpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQge2Zyb21FdmVudCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwLCB0YWtlVW50aWwsIHdpdGhMYXRlc3RGcm9tfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7S2V5fSBmcm9tICcuLi91dGlsL2tleSc7XG5cblxuY29uc3QgRk9DVVNBQkxFX0VMRU1FTlRTX1NFTEVDVE9SID0gW1xuICAnYVtocmVmXScsICdidXR0b246bm90KFtkaXNhYmxlZF0pJywgJ2lucHV0Om5vdChbZGlzYWJsZWRdKTpub3QoW3R5cGU9XCJoaWRkZW5cIl0pJywgJ3NlbGVjdDpub3QoW2Rpc2FibGVkXSknLFxuICAndGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pJywgJ1tjb250ZW50ZWRpdGFibGVdJywgJ1t0YWJpbmRleF06bm90KFt0YWJpbmRleD1cIi0xXCJdKSdcbl0uam9pbignLCAnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGZpcnN0IGFuZCBsYXN0IGZvY3VzYWJsZSBlbGVtZW50cyBpbnNpZGUgb2YgYSBnaXZlbiBlbGVtZW50IGJhc2VkIG9uIHNwZWNpZmljIENTUyBzZWxlY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9jdXNhYmxlQm91bmRhcnlFbGVtZW50cyhlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50W10ge1xuICBjb25zdCBsaXN0OiBIVE1MRWxlbWVudFtdID1cbiAgICAgIEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKEZPQ1VTQUJMRV9FTEVNRU5UU19TRUxFQ1RPUikgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4pXG4gICAgICAgICAgLmZpbHRlcihlbCA9PiBlbC50YWJJbmRleCAhPT0gLTEpO1xuICByZXR1cm4gW2xpc3RbMF0sIGxpc3RbbGlzdC5sZW5ndGggLSAxXV07XG59XG5cbi8qKlxuICogRnVuY3Rpb24gdGhhdCBlbmZvcmNlcyBicm93c2VyIGZvY3VzIHRvIGJlIHRyYXBwZWQgaW5zaWRlIGEgRE9NIGVsZW1lbnQuXG4gKlxuICogV29ya3Mgb25seSBmb3IgY2xpY2tzIGluc2lkZSB0aGUgZWxlbWVudCBhbmQgbmF2aWdhdGlvbiB3aXRoICdUYWInLCBpZ25vcmluZyBjbGlja3Mgb3V0c2lkZSBvZiB0aGUgZWxlbWVudFxuICpcbiAqIEBwYXJhbSBlbGVtZW50IFRoZSBlbGVtZW50IGFyb3VuZCB3aGljaCBmb2N1cyB3aWxsIGJlIHRyYXBwZWQgaW5zaWRlXG4gKiBAcGFyYW0gc3RvcEZvY3VzVHJhcCQgVGhlIG9ic2VydmFibGUgc3RyZWFtLiBXaGVuIGNvbXBsZXRlZCB0aGUgZm9jdXMgdHJhcCB3aWxsIGNsZWFuIHVwIGxpc3RlbmVyc1xuICogYW5kIGZyZWUgaW50ZXJuYWwgcmVzb3VyY2VzXG4gKiBAcGFyYW0gcmVmb2N1c09uQ2xpY2sgUHV0IHRoZSBmb2N1cyBiYWNrIHRvIHRoZSBsYXN0IGZvY3VzZWQgZWxlbWVudCB3aGVuZXZlciBhIGNsaWNrIG9jY3VycyBvbiBlbGVtZW50IChkZWZhdWx0IHRvXG4gKiBmYWxzZSlcbiAqL1xuZXhwb3J0IGNvbnN0IG5nYkZvY3VzVHJhcCA9IChlbGVtZW50OiBIVE1MRWxlbWVudCwgc3RvcEZvY3VzVHJhcCQ6IE9ic2VydmFibGU8YW55PiwgcmVmb2N1c09uQ2xpY2sgPSBmYWxzZSkgPT4ge1xuICAvLyBsYXN0IGZvY3VzZWQgZWxlbWVudFxuICBjb25zdCBsYXN0Rm9jdXNlZEVsZW1lbnQkID1cbiAgICAgIGZyb21FdmVudDxGb2N1c0V2ZW50PihlbGVtZW50LCAnZm9jdXNpbicpLnBpcGUodGFrZVVudGlsKHN0b3BGb2N1c1RyYXAkKSwgbWFwKGUgPT4gZS50YXJnZXQpKTtcblxuICAvLyAndGFiJyAvICdzaGlmdCt0YWInIHN0cmVhbVxuICBmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4oZWxlbWVudCwgJ2tleWRvd24nKVxuICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFrZVVudGlsKHN0b3BGb2N1c1RyYXAkKSxcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpkZXByZWNhdGlvblxuICAgICAgICAgIGZpbHRlcihlID0+IGUud2hpY2ggPT09IEtleS5UYWIpLFxuICAgICAgICAgIC8vIHRzbGludDplbmFibGU6ZGVwcmVjYXRpb25cbiAgICAgICAgICB3aXRoTGF0ZXN0RnJvbShsYXN0Rm9jdXNlZEVsZW1lbnQkKSlcbiAgICAgIC5zdWJzY3JpYmUoKFt0YWJFdmVudCwgZm9jdXNlZEVsZW1lbnRdKSA9PiB7XG4gICAgICAgIGNvbnN0W2ZpcnN0LCBsYXN0XSA9IGdldEZvY3VzYWJsZUJvdW5kYXJ5RWxlbWVudHMoZWxlbWVudCk7XG5cbiAgICAgICAgaWYgKChmb2N1c2VkRWxlbWVudCA9PT0gZmlyc3QgfHwgZm9jdXNlZEVsZW1lbnQgPT09IGVsZW1lbnQpICYmIHRhYkV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgbGFzdC5mb2N1cygpO1xuICAgICAgICAgIHRhYkV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9jdXNlZEVsZW1lbnQgPT09IGxhc3QgJiYgIXRhYkV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgZmlyc3QuZm9jdXMoKTtcbiAgICAgICAgICB0YWJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAvLyBpbnNpZGUgY2xpY2tcbiAgaWYgKHJlZm9jdXNPbkNsaWNrKSB7XG4gICAgZnJvbUV2ZW50KGVsZW1lbnQsICdjbGljaycpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbChzdG9wRm9jdXNUcmFwJCksIHdpdGhMYXRlc3RGcm9tKGxhc3RGb2N1c2VkRWxlbWVudCQpLCBtYXAoYXJyID0+IGFyclsxXSBhcyBIVE1MRWxlbWVudCkpXG4gICAgICAgIC5zdWJzY3JpYmUobGFzdEZvY3VzZWRFbGVtZW50ID0+IGxhc3RGb2N1c2VkRWxlbWVudC5mb2N1cygpKTtcbiAgfVxufTtcbiIsIi8vIHByZXZpb3VzIHZlcnNpb246XG4vLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci11aS9ib290c3RyYXAvYmxvYi8wN2MzMWQwNzMxZjdjYjA2OGExOTMyYjhlMDFkMjMxMmI3OTZiNGVjL3NyYy9wb3NpdGlvbi9wb3NpdGlvbi5qc1xuZXhwb3J0IGNsYXNzIFBvc2l0aW9uaW5nIHtcbiAgcHJpdmF0ZSBnZXRBbGxTdHlsZXMoZWxlbWVudDogSFRNTEVsZW1lbnQpIHsgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpOyB9XG5cbiAgcHJpdmF0ZSBnZXRTdHlsZShlbGVtZW50OiBIVE1MRWxlbWVudCwgcHJvcDogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuZ2V0QWxsU3R5bGVzKGVsZW1lbnQpW3Byb3BdOyB9XG5cbiAgcHJpdmF0ZSBpc1N0YXRpY1Bvc2l0aW9uZWQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHRoaXMuZ2V0U3R5bGUoZWxlbWVudCwgJ3Bvc2l0aW9uJykgfHwgJ3N0YXRpYycpID09PSAnc3RhdGljJztcbiAgfVxuXG4gIHByaXZhdGUgb2Zmc2V0UGFyZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuICAgIGxldCBvZmZzZXRQYXJlbnRFbCA9IDxIVE1MRWxlbWVudD5lbGVtZW50Lm9mZnNldFBhcmVudCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICB3aGlsZSAob2Zmc2V0UGFyZW50RWwgJiYgb2Zmc2V0UGFyZW50RWwgIT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiB0aGlzLmlzU3RhdGljUG9zaXRpb25lZChvZmZzZXRQYXJlbnRFbCkpIHtcbiAgICAgIG9mZnNldFBhcmVudEVsID0gPEhUTUxFbGVtZW50Pm9mZnNldFBhcmVudEVsLm9mZnNldFBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gb2Zmc2V0UGFyZW50RWwgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB9XG5cbiAgcG9zaXRpb24oZWxlbWVudDogSFRNTEVsZW1lbnQsIHJvdW5kID0gdHJ1ZSk6IENsaWVudFJlY3Qge1xuICAgIGxldCBlbFBvc2l0aW9uOiBDbGllbnRSZWN0O1xuICAgIGxldCBwYXJlbnRPZmZzZXQ6IENsaWVudFJlY3QgPSB7d2lkdGg6IDAsIGhlaWdodDogMCwgdG9wOiAwLCBib3R0b206IDAsIGxlZnQ6IDAsIHJpZ2h0OiAwfTtcblxuICAgIGlmICh0aGlzLmdldFN0eWxlKGVsZW1lbnQsICdwb3NpdGlvbicpID09PSAnZml4ZWQnKSB7XG4gICAgICBlbFBvc2l0aW9uID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGVsUG9zaXRpb24gPSB7XG4gICAgICAgIHRvcDogZWxQb3NpdGlvbi50b3AsXG4gICAgICAgIGJvdHRvbTogZWxQb3NpdGlvbi5ib3R0b20sXG4gICAgICAgIGxlZnQ6IGVsUG9zaXRpb24ubGVmdCxcbiAgICAgICAgcmlnaHQ6IGVsUG9zaXRpb24ucmlnaHQsXG4gICAgICAgIGhlaWdodDogZWxQb3NpdGlvbi5oZWlnaHQsXG4gICAgICAgIHdpZHRoOiBlbFBvc2l0aW9uLndpZHRoXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBvZmZzZXRQYXJlbnRFbCA9IHRoaXMub2Zmc2V0UGFyZW50KGVsZW1lbnQpO1xuXG4gICAgICBlbFBvc2l0aW9uID0gdGhpcy5vZmZzZXQoZWxlbWVudCwgZmFsc2UpO1xuXG4gICAgICBpZiAob2Zmc2V0UGFyZW50RWwgIT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICBwYXJlbnRPZmZzZXQgPSB0aGlzLm9mZnNldChvZmZzZXRQYXJlbnRFbCwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBwYXJlbnRPZmZzZXQudG9wICs9IG9mZnNldFBhcmVudEVsLmNsaWVudFRvcDtcbiAgICAgIHBhcmVudE9mZnNldC5sZWZ0ICs9IG9mZnNldFBhcmVudEVsLmNsaWVudExlZnQ7XG4gICAgfVxuXG4gICAgZWxQb3NpdGlvbi50b3AgLT0gcGFyZW50T2Zmc2V0LnRvcDtcbiAgICBlbFBvc2l0aW9uLmJvdHRvbSAtPSBwYXJlbnRPZmZzZXQudG9wO1xuICAgIGVsUG9zaXRpb24ubGVmdCAtPSBwYXJlbnRPZmZzZXQubGVmdDtcbiAgICBlbFBvc2l0aW9uLnJpZ2h0IC09IHBhcmVudE9mZnNldC5sZWZ0O1xuXG4gICAgaWYgKHJvdW5kKSB7XG4gICAgICBlbFBvc2l0aW9uLnRvcCA9IE1hdGgucm91bmQoZWxQb3NpdGlvbi50b3ApO1xuICAgICAgZWxQb3NpdGlvbi5ib3R0b20gPSBNYXRoLnJvdW5kKGVsUG9zaXRpb24uYm90dG9tKTtcbiAgICAgIGVsUG9zaXRpb24ubGVmdCA9IE1hdGgucm91bmQoZWxQb3NpdGlvbi5sZWZ0KTtcbiAgICAgIGVsUG9zaXRpb24ucmlnaHQgPSBNYXRoLnJvdW5kKGVsUG9zaXRpb24ucmlnaHQpO1xuICAgIH1cblxuICAgIHJldHVybiBlbFBvc2l0aW9uO1xuICB9XG5cbiAgb2Zmc2V0KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCByb3VuZCA9IHRydWUpOiBDbGllbnRSZWN0IHtcbiAgICBjb25zdCBlbEJjciA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgdmlld3BvcnRPZmZzZXQgPSB7XG4gICAgICB0b3A6IHdpbmRvdy5wYWdlWU9mZnNldCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRUb3AsXG4gICAgICBsZWZ0OiB3aW5kb3cucGFnZVhPZmZzZXQgLSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50TGVmdFxuICAgIH07XG5cbiAgICBsZXQgZWxPZmZzZXQgPSB7XG4gICAgICBoZWlnaHQ6IGVsQmNyLmhlaWdodCB8fCBlbGVtZW50Lm9mZnNldEhlaWdodCxcbiAgICAgIHdpZHRoOiBlbEJjci53aWR0aCB8fCBlbGVtZW50Lm9mZnNldFdpZHRoLFxuICAgICAgdG9wOiBlbEJjci50b3AgKyB2aWV3cG9ydE9mZnNldC50b3AsXG4gICAgICBib3R0b206IGVsQmNyLmJvdHRvbSArIHZpZXdwb3J0T2Zmc2V0LnRvcCxcbiAgICAgIGxlZnQ6IGVsQmNyLmxlZnQgKyB2aWV3cG9ydE9mZnNldC5sZWZ0LFxuICAgICAgcmlnaHQ6IGVsQmNyLnJpZ2h0ICsgdmlld3BvcnRPZmZzZXQubGVmdFxuICAgIH07XG5cbiAgICBpZiAocm91bmQpIHtcbiAgICAgIGVsT2Zmc2V0LmhlaWdodCA9IE1hdGgucm91bmQoZWxPZmZzZXQuaGVpZ2h0KTtcbiAgICAgIGVsT2Zmc2V0LndpZHRoID0gTWF0aC5yb3VuZChlbE9mZnNldC53aWR0aCk7XG4gICAgICBlbE9mZnNldC50b3AgPSBNYXRoLnJvdW5kKGVsT2Zmc2V0LnRvcCk7XG4gICAgICBlbE9mZnNldC5ib3R0b20gPSBNYXRoLnJvdW5kKGVsT2Zmc2V0LmJvdHRvbSk7XG4gICAgICBlbE9mZnNldC5sZWZ0ID0gTWF0aC5yb3VuZChlbE9mZnNldC5sZWZ0KTtcbiAgICAgIGVsT2Zmc2V0LnJpZ2h0ID0gTWF0aC5yb3VuZChlbE9mZnNldC5yaWdodCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsT2Zmc2V0O1xuICB9XG5cbiAgLypcbiAgICBSZXR1cm4gZmFsc2UgaWYgdGhlIGVsZW1lbnQgdG8gcG9zaXRpb24gaXMgb3V0c2lkZSB0aGUgdmlld3BvcnRcbiAgKi9cbiAgcG9zaXRpb25FbGVtZW50cyhob3N0RWxlbWVudDogSFRNTEVsZW1lbnQsIHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwbGFjZW1lbnQ6IHN0cmluZywgYXBwZW5kVG9Cb2R5PzogYm9vbGVhbik6XG4gICAgICBib29sZWFuIHtcbiAgICBjb25zdFtwbGFjZW1lbnRQcmltYXJ5ID0gJ3RvcCcsIHBsYWNlbWVudFNlY29uZGFyeSA9ICdjZW50ZXInXSA9IHBsYWNlbWVudC5zcGxpdCgnLScpO1xuXG4gICAgY29uc3QgaG9zdEVsUG9zaXRpb24gPSBhcHBlbmRUb0JvZHkgPyB0aGlzLm9mZnNldChob3N0RWxlbWVudCwgZmFsc2UpIDogdGhpcy5wb3NpdGlvbihob3N0RWxlbWVudCwgZmFsc2UpO1xuICAgIGNvbnN0IHRhcmdldEVsU3R5bGVzID0gdGhpcy5nZXRBbGxTdHlsZXModGFyZ2V0RWxlbWVudCk7XG5cbiAgICBjb25zdCBtYXJnaW5Ub3AgPSBwYXJzZUZsb2F0KHRhcmdldEVsU3R5bGVzLm1hcmdpblRvcCk7XG4gICAgY29uc3QgbWFyZ2luQm90dG9tID0gcGFyc2VGbG9hdCh0YXJnZXRFbFN0eWxlcy5tYXJnaW5Cb3R0b20pO1xuICAgIGNvbnN0IG1hcmdpbkxlZnQgPSBwYXJzZUZsb2F0KHRhcmdldEVsU3R5bGVzLm1hcmdpbkxlZnQpO1xuICAgIGNvbnN0IG1hcmdpblJpZ2h0ID0gcGFyc2VGbG9hdCh0YXJnZXRFbFN0eWxlcy5tYXJnaW5SaWdodCk7XG5cbiAgICBsZXQgdG9wUG9zaXRpb24gPSAwO1xuICAgIGxldCBsZWZ0UG9zaXRpb24gPSAwO1xuXG4gICAgc3dpdGNoIChwbGFjZW1lbnRQcmltYXJ5KSB7XG4gICAgICBjYXNlICd0b3AnOlxuICAgICAgICB0b3BQb3NpdGlvbiA9IChob3N0RWxQb3NpdGlvbi50b3AgLSAodGFyZ2V0RWxlbWVudC5vZmZzZXRIZWlnaHQgKyBtYXJnaW5Ub3AgKyBtYXJnaW5Cb3R0b20pKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICB0b3BQb3NpdGlvbiA9IChob3N0RWxQb3NpdGlvbi50b3AgKyBob3N0RWxQb3NpdGlvbi5oZWlnaHQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICBsZWZ0UG9zaXRpb24gPSAoaG9zdEVsUG9zaXRpb24ubGVmdCAtICh0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoICsgbWFyZ2luTGVmdCArIG1hcmdpblJpZ2h0KSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICBsZWZ0UG9zaXRpb24gPSAoaG9zdEVsUG9zaXRpb24ubGVmdCArIGhvc3RFbFBvc2l0aW9uLndpZHRoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3dpdGNoIChwbGFjZW1lbnRTZWNvbmRhcnkpIHtcbiAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgIHRvcFBvc2l0aW9uID0gaG9zdEVsUG9zaXRpb24udG9wO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgIHRvcFBvc2l0aW9uID0gaG9zdEVsUG9zaXRpb24udG9wICsgaG9zdEVsUG9zaXRpb24uaGVpZ2h0IC0gdGFyZ2V0RWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIGxlZnRQb3NpdGlvbiA9IGhvc3RFbFBvc2l0aW9uLmxlZnQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICBsZWZ0UG9zaXRpb24gPSBob3N0RWxQb3NpdGlvbi5sZWZ0ICsgaG9zdEVsUG9zaXRpb24ud2lkdGggLSB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgIGlmIChwbGFjZW1lbnRQcmltYXJ5ID09PSAndG9wJyB8fCBwbGFjZW1lbnRQcmltYXJ5ID09PSAnYm90dG9tJykge1xuICAgICAgICAgIGxlZnRQb3NpdGlvbiA9IChob3N0RWxQb3NpdGlvbi5sZWZ0ICsgaG9zdEVsUG9zaXRpb24ud2lkdGggLyAyIC0gdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aCAvIDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvcFBvc2l0aW9uID0gKGhvc3RFbFBvc2l0aW9uLnRvcCArIGhvc3RFbFBvc2l0aW9uLmhlaWdodCAvIDIgLSB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodCAvIDIpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vLyBUaGUgdHJhbnNsYXRlM2QvZ3B1IGFjY2VsZXJhdGlvbiByZW5kZXIgYSBibHVycnkgdGV4dCBvbiBjaHJvbWUsIHRoZSBuZXh0IGxpbmUgaXMgY29tbWVudGVkIHVudGlsIGEgYnJvd3NlciBmaXhcbiAgICAvLyB0YXJnZXRFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke01hdGgucm91bmQobGVmdFBvc2l0aW9uKX1weCwgJHtNYXRoLmZsb29yKHRvcFBvc2l0aW9uKX1weCwgMHB4KWA7XG4gICAgdGFyZ2V0RWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7TWF0aC5yb3VuZChsZWZ0UG9zaXRpb24pfXB4LCAke01hdGgucm91bmQodG9wUG9zaXRpb24pfXB4KWA7XG5cbiAgICAvLyBDaGVjayBpZiB0aGUgdGFyZ2V0RWxlbWVudCBpcyBpbnNpZGUgdGhlIHZpZXdwb3J0XG4gICAgY29uc3QgdGFyZ2V0RWxCQ1IgPSB0YXJnZXRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IGh0bWwuY2xpZW50SGVpZ2h0O1xuICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgaHRtbC5jbGllbnRXaWR0aDtcblxuICAgIHJldHVybiB0YXJnZXRFbEJDUi5sZWZ0ID49IDAgJiYgdGFyZ2V0RWxCQ1IudG9wID49IDAgJiYgdGFyZ2V0RWxCQ1IucmlnaHQgPD0gd2luZG93V2lkdGggJiZcbiAgICAgICAgdGFyZ2V0RWxCQ1IuYm90dG9tIDw9IHdpbmRvd0hlaWdodDtcbiAgfVxufVxuXG5jb25zdCBwbGFjZW1lbnRTZXBhcmF0b3IgPSAvXFxzKy87XG5jb25zdCBwb3NpdGlvblNlcnZpY2UgPSBuZXcgUG9zaXRpb25pbmcoKTtcblxuLypcbiAqIEFjY2VwdCB0aGUgcGxhY2VtZW50IGFycmF5IGFuZCBhcHBsaWVzIHRoZSBhcHByb3ByaWF0ZSBwbGFjZW1lbnQgZGVwZW5kZW50IG9uIHRoZSB2aWV3cG9ydC5cbiAqIFJldHVybnMgdGhlIGFwcGxpZWQgcGxhY2VtZW50LlxuICogSW4gY2FzZSBvZiBhdXRvIHBsYWNlbWVudCwgcGxhY2VtZW50cyBhcmUgc2VsZWN0ZWQgaW4gb3JkZXJcbiAqICAgJ3RvcCcsICdib3R0b20nLCAnbGVmdCcsICdyaWdodCcsXG4gKiAgICd0b3AtbGVmdCcsICd0b3AtcmlnaHQnLFxuICogICAnYm90dG9tLWxlZnQnLCAnYm90dG9tLXJpZ2h0JyxcbiAqICAgJ2xlZnQtdG9wJywgJ2xlZnQtYm90dG9tJyxcbiAqICAgJ3JpZ2h0LXRvcCcsICdyaWdodC1ib3R0b20nLlxuICogKi9cbmV4cG9ydCBmdW5jdGlvbiBwb3NpdGlvbkVsZW1lbnRzKFxuICAgIGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQsIHBsYWNlbWVudDogc3RyaW5nIHwgUGxhY2VtZW50IHwgUGxhY2VtZW50QXJyYXksXG4gICAgYXBwZW5kVG9Cb2R5PzogYm9vbGVhbiwgYmFzZUNsYXNzPzogc3RyaW5nKTogUGxhY2VtZW50IHtcbiAgbGV0IHBsYWNlbWVudFZhbHM6IEFycmF5PFBsYWNlbWVudD4gPVxuICAgICAgQXJyYXkuaXNBcnJheShwbGFjZW1lbnQpID8gcGxhY2VtZW50IDogcGxhY2VtZW50LnNwbGl0KHBsYWNlbWVudFNlcGFyYXRvcikgYXMgQXJyYXk8UGxhY2VtZW50PjtcblxuICBjb25zdCBhbGxvd2VkUGxhY2VtZW50cyA9IFtcbiAgICAndG9wJywgJ2JvdHRvbScsICdsZWZ0JywgJ3JpZ2h0JywgJ3RvcC1sZWZ0JywgJ3RvcC1yaWdodCcsICdib3R0b20tbGVmdCcsICdib3R0b20tcmlnaHQnLCAnbGVmdC10b3AnLCAnbGVmdC1ib3R0b20nLFxuICAgICdyaWdodC10b3AnLCAncmlnaHQtYm90dG9tJ1xuICBdO1xuXG4gIGNvbnN0IGNsYXNzTGlzdCA9IHRhcmdldEVsZW1lbnQuY2xhc3NMaXN0O1xuICBjb25zdCBhZGRDbGFzc2VzVG9UYXJnZXQgPSAodGFyZ2V0UGxhY2VtZW50OiBQbGFjZW1lbnQpOiBBcnJheTxzdHJpbmc+ID0+IHtcbiAgICBjb25zdFtwcmltYXJ5LCBzZWNvbmRhcnldID0gdGFyZ2V0UGxhY2VtZW50LnNwbGl0KCctJyk7XG4gICAgY29uc3QgY2xhc3NlcyA9IFtdO1xuICAgIGlmIChiYXNlQ2xhc3MpIHtcbiAgICAgIGNsYXNzZXMucHVzaChgJHtiYXNlQ2xhc3N9LSR7cHJpbWFyeX1gKTtcbiAgICAgIGlmIChzZWNvbmRhcnkpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKGAke2Jhc2VDbGFzc30tJHtwcmltYXJ5fS0ke3NlY29uZGFyeX1gKTtcbiAgICAgIH1cblxuICAgICAgY2xhc3Nlcy5mb3JFYWNoKChjbGFzc25hbWUpID0+IHsgY2xhc3NMaXN0LmFkZChjbGFzc25hbWUpOyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNsYXNzZXM7XG4gIH07XG5cbiAgLy8gUmVtb3ZlIG9sZCBwbGFjZW1lbnQgY2xhc3NlcyB0byBhdm9pZCBpc3N1ZXNcbiAgaWYgKGJhc2VDbGFzcykge1xuICAgIGFsbG93ZWRQbGFjZW1lbnRzLmZvckVhY2goKHBsYWNlbWVudFRvUmVtb3ZlKSA9PiB7IGNsYXNzTGlzdC5yZW1vdmUoYCR7YmFzZUNsYXNzfS0ke3BsYWNlbWVudFRvUmVtb3ZlfWApOyB9KTtcbiAgfVxuXG4gIC8vIHJlcGxhY2UgYXV0byBwbGFjZW1lbnQgd2l0aCBvdGhlciBwbGFjZW1lbnRzXG4gIGxldCBoYXNBdXRvID0gcGxhY2VtZW50VmFscy5maW5kSW5kZXgodmFsID0+IHZhbCA9PT0gJ2F1dG8nKTtcbiAgaWYgKGhhc0F1dG8gPj0gMCkge1xuICAgIGFsbG93ZWRQbGFjZW1lbnRzLmZvckVhY2goZnVuY3Rpb24ob2JqKSB7XG4gICAgICBpZiAocGxhY2VtZW50VmFscy5maW5kKHZhbCA9PiB2YWwuc2VhcmNoKCdeJyArIG9iaikgIT09IC0xKSA9PSBudWxsKSB7XG4gICAgICAgIHBsYWNlbWVudFZhbHMuc3BsaWNlKGhhc0F1dG8rKywgMSwgb2JqIGFzIFBsYWNlbWVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBjb29yZGluYXRlcyB3aGVyZSB0byBwb3NpdGlvblxuXG4gIC8vIFJlcXVpcmVkIGZvciB0cmFuc2Zvcm06XG4gIGNvbnN0IHN0eWxlID0gdGFyZ2V0RWxlbWVudC5zdHlsZTtcbiAgc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICBzdHlsZS50b3AgPSAnMCc7XG4gIHN0eWxlLmxlZnQgPSAnMCc7XG4gIC8vIFRoZSB0cmFuc2xhdGUzZC9ncHUgYWNjZWxlcmF0aW9uIHJlbmRlciBhIGJsdXJyeSB0ZXh0IG9uIGNocm9tZSwgdGhlIG5leHQgbGluZSBpcyBjb21tZW50ZWQgdW50aWwgYSBicm93c2VyIGZpeFxuICAvLyBzdHlsZVsnd2lsbC1jaGFuZ2UnXSA9ICd0cmFuc2Zvcm0nO1xuXG4gIGxldCB0ZXN0UGxhY2VtZW50OiBQbGFjZW1lbnQ7XG4gIGxldCBpc0luVmlld3BvcnQgPSBmYWxzZTtcbiAgZm9yICh0ZXN0UGxhY2VtZW50IG9mIHBsYWNlbWVudFZhbHMpIHtcbiAgICBsZXQgYWRkZWRDbGFzc2VzID0gYWRkQ2xhc3Nlc1RvVGFyZ2V0KHRlc3RQbGFjZW1lbnQpO1xuXG4gICAgaWYgKHBvc2l0aW9uU2VydmljZS5wb3NpdGlvbkVsZW1lbnRzKGhvc3RFbGVtZW50LCB0YXJnZXRFbGVtZW50LCB0ZXN0UGxhY2VtZW50LCBhcHBlbmRUb0JvZHkpKSB7XG4gICAgICBpc0luVmlld3BvcnQgPSB0cnVlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIHRoZSBiYXNlQ2xhc3NlcyBmb3IgZnVydGhlciBjYWxjdWxhdGlvblxuICAgIGlmIChiYXNlQ2xhc3MpIHtcbiAgICAgIGFkZGVkQ2xhc3Nlcy5mb3JFYWNoKChjbGFzc25hbWUpID0+IHsgY2xhc3NMaXN0LnJlbW92ZShjbGFzc25hbWUpOyB9KTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWlzSW5WaWV3cG9ydCkge1xuICAgIC8vIElmIG5vdGhpbmcgbWF0Y2gsIHRoZSBmaXJzdCBwbGFjZW1lbnQgaXMgdGhlIGRlZmF1bHQgb25lXG4gICAgdGVzdFBsYWNlbWVudCA9IHBsYWNlbWVudFZhbHNbMF07XG4gICAgYWRkQ2xhc3Nlc1RvVGFyZ2V0KHRlc3RQbGFjZW1lbnQpO1xuICAgIHBvc2l0aW9uU2VydmljZS5wb3NpdGlvbkVsZW1lbnRzKGhvc3RFbGVtZW50LCB0YXJnZXRFbGVtZW50LCB0ZXN0UGxhY2VtZW50LCBhcHBlbmRUb0JvZHkpO1xuICB9XG5cbiAgcmV0dXJuIHRlc3RQbGFjZW1lbnQ7XG59XG5cbmV4cG9ydCB0eXBlIFBsYWNlbWVudCA9ICdhdXRvJyB8ICd0b3AnIHwgJ2JvdHRvbScgfCAnbGVmdCcgfCAncmlnaHQnIHwgJ3RvcC1sZWZ0JyB8ICd0b3AtcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0JyB8XG4gICAgJ2JvdHRvbS1yaWdodCcgfCAnbGVmdC10b3AnIHwgJ2xlZnQtYm90dG9tJyB8ICdyaWdodC10b3AnIHwgJ3JpZ2h0LWJvdHRvbSc7XG5cbmV4cG9ydCB0eXBlIFBsYWNlbWVudEFycmF5ID0gUGxhY2VtZW50IHwgQXJyYXk8UGxhY2VtZW50Pnwgc3RyaW5nO1xuIiwiaW1wb3J0IHtwYWROdW1iZXIsIHRvSW50ZWdlciwgaXNOdW1iZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBOR0JfREFURVBJQ0tFUl9QQVJTRVJfRk9STUFUVEVSX0ZBQ1RPUlkoKSB7XG4gIHJldHVybiBuZXcgTmdiRGF0ZUlTT1BhcnNlckZvcm1hdHRlcigpO1xufVxuXG4vKipcbiAqIEFic3RyYWN0IHR5cGUgc2VydmluZyBhcyBhIERJIHRva2VuIGZvciB0aGUgc2VydmljZSBwYXJzaW5nIGFuZCBmb3JtYXR0aW5nIGRhdGVzIGZvciB0aGUgTmdiSW5wdXREYXRlcGlja2VyXG4gKiBkaXJlY3RpdmUuIEEgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiB1c2luZyB0aGUgSVNPIDg2MDEgZm9ybWF0IGlzIHByb3ZpZGVkLCBidXQgeW91IGNhbiBwcm92aWRlIGFub3RoZXIgaW1wbGVtZW50YXRpb25cbiAqIHRvIHVzZSBhbiBhbHRlcm5hdGl2ZSBmb3JtYXQuXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCcsIHVzZUZhY3Rvcnk6IE5HQl9EQVRFUElDS0VSX1BBUlNFUl9GT1JNQVRURVJfRkFDVE9SWX0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdiRGF0ZVBhcnNlckZvcm1hdHRlciB7XG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIGdpdmVuIHZhbHVlIHRvIGFuIE5nYkRhdGVTdHJ1Y3QuIEltcGxlbWVudGF0aW9ucyBzaG91bGQgdHJ5IHRoZWlyIGJlc3QgdG8gcHJvdmlkZSBhIHJlc3VsdCwgZXZlblxuICAgKiBwYXJ0aWFsLiBUaGV5IG11c3QgcmV0dXJuIG51bGwgaWYgdGhlIHZhbHVlIGNhbid0IGJlIHBhcnNlZC5cbiAgICogQHBhcmFtIHZhbHVlIHRoZSB2YWx1ZSB0byBwYXJzZVxuICAgKi9cbiAgYWJzdHJhY3QgcGFyc2UodmFsdWU6IHN0cmluZyk6IE5nYkRhdGVTdHJ1Y3Q7XG5cbiAgLyoqXG4gICAqIEZvcm1hdHMgdGhlIGdpdmVuIGRhdGUgdG8gYSBzdHJpbmcuIEltcGxlbWVudGF0aW9ucyBzaG91bGQgcmV0dXJuIGFuIGVtcHR5IHN0cmluZyBpZiB0aGUgZ2l2ZW4gZGF0ZSBpcyBudWxsLFxuICAgKiBhbmQgdHJ5IHRoZWlyIGJlc3QgdG8gcHJvdmlkZSBhIHBhcnRpYWwgcmVzdWx0IGlmIHRoZSBnaXZlbiBkYXRlIGlzIGluY29tcGxldGUgb3IgaW52YWxpZC5cbiAgICogQHBhcmFtIGRhdGUgdGhlIGRhdGUgdG8gZm9ybWF0IGFzIGEgc3RyaW5nXG4gICAqL1xuICBhYnN0cmFjdCBmb3JtYXQoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVJU09QYXJzZXJGb3JtYXR0ZXIgZXh0ZW5kcyBOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyIHtcbiAgcGFyc2UodmFsdWU6IHN0cmluZyk6IE5nYkRhdGVTdHJ1Y3Qge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgY29uc3QgZGF0ZVBhcnRzID0gdmFsdWUudHJpbSgpLnNwbGl0KCctJyk7XG4gICAgICBpZiAoZGF0ZVBhcnRzLmxlbmd0aCA9PT0gMSAmJiBpc051bWJlcihkYXRlUGFydHNbMF0pKSB7XG4gICAgICAgIHJldHVybiB7eWVhcjogdG9JbnRlZ2VyKGRhdGVQYXJ0c1swXSksIG1vbnRoOiBudWxsLCBkYXk6IG51bGx9O1xuICAgICAgfSBlbHNlIGlmIChkYXRlUGFydHMubGVuZ3RoID09PSAyICYmIGlzTnVtYmVyKGRhdGVQYXJ0c1swXSkgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzFdKSkge1xuICAgICAgICByZXR1cm4ge3llYXI6IHRvSW50ZWdlcihkYXRlUGFydHNbMF0pLCBtb250aDogdG9JbnRlZ2VyKGRhdGVQYXJ0c1sxXSksIGRheTogbnVsbH07XG4gICAgICB9IGVsc2UgaWYgKGRhdGVQYXJ0cy5sZW5ndGggPT09IDMgJiYgaXNOdW1iZXIoZGF0ZVBhcnRzWzBdKSAmJiBpc051bWJlcihkYXRlUGFydHNbMV0pICYmIGlzTnVtYmVyKGRhdGVQYXJ0c1syXSkpIHtcbiAgICAgICAgcmV0dXJuIHt5ZWFyOiB0b0ludGVnZXIoZGF0ZVBhcnRzWzBdKSwgbW9udGg6IHRvSW50ZWdlcihkYXRlUGFydHNbMV0pLCBkYXk6IHRvSW50ZWdlcihkYXRlUGFydHNbMl0pfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmb3JtYXQoZGF0ZTogTmdiRGF0ZVN0cnVjdCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGRhdGUgP1xuICAgICAgICBgJHtkYXRlLnllYXJ9LSR7aXNOdW1iZXIoZGF0ZS5tb250aCkgPyBwYWROdW1iZXIoZGF0ZS5tb250aCkgOiAnJ30tJHtpc051bWJlcihkYXRlLmRheSkgPyBwYWROdW1iZXIoZGF0ZS5kYXkpIDogJyd9YCA6XG4gICAgICAgICcnO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxJREFUT1JTLCBOR19WQUxVRV9BQ0NFU1NPUiwgVmFsaWRhdG9yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge25nYkF1dG9DbG9zZX0gZnJvbSAnLi4vdXRpbC9hdXRvY2xvc2UnO1xuaW1wb3J0IHtuZ2JGb2N1c1RyYXB9IGZyb20gJy4uL3V0aWwvZm9jdXMtdHJhcCc7XG5pbXBvcnQge1BsYWNlbWVudEFycmF5LCBwb3NpdGlvbkVsZW1lbnRzfSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcblxuaW1wb3J0IHtOZ2JEYXRlQWRhcHRlcn0gZnJvbSAnLi9hZGFwdGVycy9uZ2ItZGF0ZS1hZGFwdGVyJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlciwgTmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnR9IGZyb20gJy4vZGF0ZXBpY2tlcic7XG5pbXBvcnQge0RheVRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi9kYXRlcGlja2VyLWRheS10ZW1wbGF0ZS1jb250ZXh0JztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlclNlcnZpY2V9IGZyb20gJy4vZGF0ZXBpY2tlci1zZXJ2aWNlJztcbmltcG9ydCB7TmdiQ2FsZW5kYXJ9IGZyb20gJy4vbmdiLWNhbGVuZGFyJztcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XG5pbXBvcnQge05nYkRhdGVQYXJzZXJGb3JtYXR0ZXJ9IGZyb20gJy4vbmdiLWRhdGUtcGFyc2VyLWZvcm1hdHRlcic7XG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcblxuY29uc3QgTkdCX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JJbnB1dERhdGVwaWNrZXIpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuY29uc3QgTkdCX0RBVEVQSUNLRVJfVkFMSURBVE9SID0ge1xuICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JJbnB1dERhdGVwaWNrZXIpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IG1ha2VzIGl0IHBvc3NpYmxlIHRvIGhhdmUgZGF0ZXBpY2tlcnMgb24gaW5wdXQgZmllbGRzLlxuICogTWFuYWdlcyBpbnRlZ3JhdGlvbiB3aXRoIHRoZSBpbnB1dCBmaWVsZCBpdHNlbGYgKGRhdGEgZW50cnkpIGFuZCBuZ01vZGVsICh2YWxpZGF0aW9uIGV0Yy4pLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpbnB1dFtuZ2JEYXRlcGlja2VyXScsXG4gIGV4cG9ydEFzOiAnbmdiRGF0ZXBpY2tlcicsXG4gIGhvc3Q6IHtcbiAgICAnKGlucHV0KSc6ICdtYW51YWxEYXRlQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpJyxcbiAgICAnKGNoYW5nZSknOiAnbWFudWFsRGF0ZUNoYW5nZSgkZXZlbnQudGFyZ2V0LnZhbHVlLCB0cnVlKScsXG4gICAgJyhibHVyKSc6ICdvbkJsdXIoKScsXG4gICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnXG4gIH0sXG4gIHByb3ZpZGVyczogW05HQl9EQVRFUElDS0VSX1ZBTFVFX0FDQ0VTU09SLCBOR0JfREFURVBJQ0tFUl9WQUxJREFUT1IsIE5nYkRhdGVwaWNrZXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JJbnB1dERhdGVwaWNrZXIgaW1wbGVtZW50cyBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yIHtcbiAgcHJpdmF0ZSBfY2xvc2VkJCA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgX2NSZWY6IENvbXBvbmVudFJlZjxOZ2JEYXRlcGlja2VyPiA9IG51bGw7XG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG4gIHByaXZhdGUgX21vZGVsOiBOZ2JEYXRlO1xuICBwcml2YXRlIF9pbnB1dFZhbHVlOiBzdHJpbmc7XG4gIHByaXZhdGUgX3pvbmVTdWJzY3JpcHRpb246IGFueTtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGRhdGVwaWNrZXIgcG9wdXAgc2hvdWxkIGJlIGNsb3NlZCBhdXRvbWF0aWNhbGx5IGFmdGVyIGRhdGUgc2VsZWN0aW9uIC8gb3V0c2lkZSBjbGljayBvciBub3QuXG4gICAqXG4gICAqIEJ5IGRlZmF1bHQgdGhlIHBvcHVwIHdpbGwgY2xvc2Ugb24gYm90aCBkYXRlIHNlbGVjdGlvbiBhbmQgb3V0c2lkZSBjbGljay4gSWYgdGhlIHZhbHVlIGlzICdmYWxzZScgdGhlIHBvcHVwIGhhcyB0b1xuICAgKiBiZSBjbG9zZWQgbWFudWFsbHkgdmlhICcuY2xvc2UoKScgb3IgJy50b2dnbGUoKScgbWV0aG9kcy4gSWYgdGhlIHZhbHVlIGlzIHNldCB0byAnaW5zaWRlJyB0aGUgcG9wdXAgd2lsbCBjbG9zZSBvblxuICAgKiBkYXRlIHNlbGVjdGlvbiBvbmx5LiBGb3IgdGhlICdvdXRzaWRlJyB0aGUgcG9wdXAgd2lsbCBjbG9zZSBvbmx5IG9uIHRoZSBvdXRzaWRlIGNsaWNrLlxuICAgKlxuICAgKiBAc2luY2UgMy4wLjBcbiAgICovXG4gIEBJbnB1dCgpIGF1dG9DbG9zZTogYm9vbGVhbiB8ICdpbnNpZGUnIHwgJ291dHNpZGUnID0gdHJ1ZTtcblxuICAvKipcbiAgICogUmVmZXJlbmNlIGZvciB0aGUgY3VzdG9tIHRlbXBsYXRlIGZvciB0aGUgZGF5IGRpc3BsYXlcbiAgICovXG4gIEBJbnB1dCgpIGRheVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxEYXlUZW1wbGF0ZUNvbnRleHQ+O1xuXG4gIC8qKlxuICAgKiBDYWxsYmFjayB0byBwYXNzIGFueSBhcmJpdHJhcnkgZGF0YSB0byB0aGUgY3VzdG9tIGRheSB0ZW1wbGF0ZSBjb250ZXh0XG4gICAqICdDdXJyZW50JyBjb250YWlucyB0aGUgbW9udGggdGhhdCB3aWxsIGJlIGRpc3BsYXllZCBpbiB0aGUgdmlld1xuICAgKlxuICAgKiBAc2luY2UgMy4zLjBcbiAgICovXG4gIEBJbnB1dCgpIGRheVRlbXBsYXRlRGF0YTogKGRhdGU6IE5nYkRhdGUsIGN1cnJlbnQ6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9KSA9PiBhbnk7XG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBtb250aHMgdG8gZGlzcGxheVxuICAgKi9cbiAgQElucHV0KCkgZGlzcGxheU1vbnRoczogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBGaXJzdCBkYXkgb2YgdGhlIHdlZWsuIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6IDE9TW9uIC4uLiA3PVN1blxuICAgKi9cbiAgQElucHV0KCkgZmlyc3REYXlPZldlZWs6IG51bWJlcjtcblxuICAvKipcbiAgICogUmVmZXJlbmNlIGZvciB0aGUgY3VzdG9tIHRlbXBsYXRlIGZvciB0aGUgZm9vdGVyIGluc2lkZSBkYXRlcGlja2VyXG4gICAqXG4gICAqIEBzaW5jZSAzLjMuMFxuICAgKi9cbiAgQElucHV0KCkgZm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHRvIG1hcmsgYSBnaXZlbiBkYXRlIGFzIGRpc2FibGVkLlxuICAgKiAnQ3VycmVudCcgY29udGFpbnMgdGhlIG1vbnRoIHRoYXQgd2lsbCBiZSBkaXNwbGF5ZWQgaW4gdGhlIHZpZXdcbiAgICovXG4gIEBJbnB1dCgpIG1hcmtEaXNhYmxlZDogKGRhdGU6IE5nYkRhdGUsIGN1cnJlbnQ6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9KSA9PiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBNaW4gZGF0ZSBmb3IgdGhlIG5hdmlnYXRpb24uIElmIG5vdCBwcm92aWRlZCB3aWxsIGJlIDEwIHllYXJzIGJlZm9yZSB0b2RheSBvciBgc3RhcnREYXRlYFxuICAgKi9cbiAgQElucHV0KCkgbWluRGF0ZTogTmdiRGF0ZVN0cnVjdDtcblxuICAvKipcbiAgICogTWF4IGRhdGUgZm9yIHRoZSBuYXZpZ2F0aW9uLiBJZiBub3QgcHJvdmlkZWQgd2lsbCBiZSAxMCB5ZWFycyBmcm9tIHRvZGF5IG9yIGBzdGFydERhdGVgXG4gICAqL1xuICBASW5wdXQoKSBtYXhEYXRlOiBOZ2JEYXRlU3RydWN0O1xuXG4gIC8qKlxuICAgKiBOYXZpZ2F0aW9uIHR5cGU6IGBzZWxlY3RgIChkZWZhdWx0IHdpdGggc2VsZWN0IGJveGVzIGZvciBtb250aCBhbmQgeWVhciksIGBhcnJvd3NgXG4gICAqICh3aXRob3V0IHNlbGVjdCBib3hlcywgb25seSBuYXZpZ2F0aW9uIGFycm93cykgb3IgYG5vbmVgIChubyBuYXZpZ2F0aW9uIGF0IGFsbClcbiAgICovXG4gIEBJbnB1dCgpIG5hdmlnYXRpb246ICdzZWxlY3QnIHwgJ2Fycm93cycgfCAnbm9uZSc7XG5cbiAgLyoqXG4gICAqIFRoZSB3YXkgdG8gZGlzcGxheSBkYXlzIHRoYXQgZG9uJ3QgYmVsb25nIHRvIGN1cnJlbnQgbW9udGg6IGB2aXNpYmxlYCAoZGVmYXVsdCksXG4gICAqIGBoaWRkZW5gIChub3QgZGlzcGxheWVkKSBvciBgY29sbGFwc2VkYCAobm90IGRpc3BsYXllZCB3aXRoIGVtcHR5IHNwYWNlIGNvbGxhcHNlZClcbiAgICovXG4gIEBJbnB1dCgpIG91dHNpZGVEYXlzOiAndmlzaWJsZScgfCAnY29sbGFwc2VkJyB8ICdoaWRkZW4nO1xuXG4gIC8qKlxuICAgKiBQbGFjZW1lbnQgb2YgYSBkYXRlcGlja2VyIHBvcHVwIGFjY2VwdHM6XG4gICAqICAgIFwidG9wXCIsIFwidG9wLWxlZnRcIiwgXCJ0b3AtcmlnaHRcIiwgXCJib3R0b21cIiwgXCJib3R0b20tbGVmdFwiLCBcImJvdHRvbS1yaWdodFwiLFxuICAgKiAgICBcImxlZnRcIiwgXCJsZWZ0LXRvcFwiLCBcImxlZnQtYm90dG9tXCIsIFwicmlnaHRcIiwgXCJyaWdodC10b3BcIiwgXCJyaWdodC1ib3R0b21cIlxuICAgKiAgYXJyYXkgb3IgYSBzcGFjZSBzZXBhcmF0ZWQgc3RyaW5nIG9mIGFib3ZlIHZhbHVlc1xuICAgKi9cbiAgQElucHV0KCkgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9IFsnYm90dG9tLWxlZnQnLCAnYm90dG9tLXJpZ2h0JywgJ3RvcC1sZWZ0JywgJ3RvcC1yaWdodCddO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgZGF5cyBvZiB0aGUgd2Vla1xuICAgKi9cbiAgQElucHV0KCkgc2hvd1dlZWtkYXlzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgd2VlayBudW1iZXJzXG4gICAqL1xuICBASW5wdXQoKSBzaG93V2Vla051bWJlcnM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIERhdGUgdG8gb3BlbiBjYWxlbmRhciB3aXRoLlxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWMuXG4gICAqIElmIG5vdGhpbmcgb3IgaW52YWxpZCBkYXRlIHByb3ZpZGVkLCBjYWxlbmRhciB3aWxsIG9wZW4gd2l0aCBjdXJyZW50IG1vbnRoLlxuICAgKiBVc2UgJ25hdmlnYXRlVG8oZGF0ZSknIGFzIGFuIGFsdGVybmF0aXZlXG4gICAqL1xuICBASW5wdXQoKSBzdGFydERhdGU6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheT86IG51bWJlcn07XG5cbiAgLyoqXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgZGF0ZXBpY2tlciBwb3B1cCBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxuICAgKi9cbiAgQElucHV0KCkgY29udGFpbmVyOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGZpcmVkIHdoZW4gdXNlciBzZWxlY3RzIGEgZGF0ZSB1c2luZyBrZXlib2FyZCBvciBtb3VzZS5cbiAgICogVGhlIHBheWxvYWQgb2YgdGhlIGV2ZW50IGlzIGN1cnJlbnRseSBzZWxlY3RlZCBOZ2JEYXRlLlxuICAgKlxuICAgKiBAc2luY2UgMS4xLjFcbiAgICovXG4gIEBPdXRwdXQoKSBkYXRlU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JEYXRlPigpO1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCBmaXJlZCB3aGVuIG5hdmlnYXRpb24gaGFwcGVucyBhbmQgY3VycmVudGx5IGRpc3BsYXllZCBtb250aCBjaGFuZ2VzLlxuICAgKiBTZWUgTmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnQgZm9yIHRoZSBwYXlsb2FkIGluZm8uXG4gICAqL1xuICBAT3V0cHV0KCkgbmF2aWdhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50PigpO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlID09PSAnJyB8fCAodmFsdWUgJiYgdmFsdWUgIT09ICdmYWxzZScpO1xuXG4gICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcbiAgICAgIHRoaXMuX2NSZWYuaW5zdGFuY2Uuc2V0RGlzYWJsZWRTdGF0ZSh0aGlzLl9kaXNhYmxlZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgcHJpdmF0ZSBfb25Ub3VjaGVkID0gKCkgPT4ge307XG4gIHByaXZhdGUgX3ZhbGlkYXRvckNoYW5nZSA9ICgpID0+IHt9O1xuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9wYXJzZXJGb3JtYXR0ZXI6IE5nYkRhdGVQYXJzZXJGb3JtYXR0ZXIsIHByaXZhdGUgX2VsUmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxuICAgICAgcHJpdmF0ZSBfdmNSZWY6IFZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgX2NmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgX3NlcnZpY2U6IE5nYkRhdGVwaWNrZXJTZXJ2aWNlLCBwcml2YXRlIF9jYWxlbmRhcjogTmdiQ2FsZW5kYXIsXG4gICAgICBwcml2YXRlIF9kYXRlQWRhcHRlcjogTmdiRGF0ZUFkYXB0ZXI8YW55PiwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcbiAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24gPSBfbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fY1JlZikge1xuICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxuICAgICAgICAgICAgdGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fY1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCB0aGlzLnBsYWNlbWVudCwgdGhpcy5jb250YWluZXIgPT09ICdib2R5Jyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMuX29uQ2hhbmdlID0gZm47IH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7IHRoaXMuX29uVG91Y2hlZCA9IGZuOyB9XG5cbiAgcmVnaXN0ZXJPblZhbGlkYXRvckNoYW5nZShmbjogKCkgPT4gdm9pZCk6IHZvaWQgeyB0aGlzLl92YWxpZGF0b3JDaGFuZ2UgPSBmbjsgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQgeyB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDsgfVxuXG4gIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICBjb25zdCB2YWx1ZSA9IGMudmFsdWU7XG5cbiAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbmdiRGF0ZSA9IHRoaXMuX2Zyb21EYXRlU3RydWN0KHRoaXMuX2RhdGVBZGFwdGVyLmZyb21Nb2RlbCh2YWx1ZSkpO1xuXG4gICAgaWYgKCF0aGlzLl9jYWxlbmRhci5pc1ZhbGlkKG5nYkRhdGUpKSB7XG4gICAgICByZXR1cm4geyduZ2JEYXRlJzoge2ludmFsaWQ6IGMudmFsdWV9fTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5taW5EYXRlICYmIG5nYkRhdGUuYmVmb3JlKE5nYkRhdGUuZnJvbSh0aGlzLm1pbkRhdGUpKSkge1xuICAgICAgcmV0dXJuIHsnbmdiRGF0ZSc6IHtyZXF1aXJlZEJlZm9yZTogdGhpcy5taW5EYXRlfX07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubWF4RGF0ZSAmJiBuZ2JEYXRlLmFmdGVyKE5nYkRhdGUuZnJvbSh0aGlzLm1heERhdGUpKSkge1xuICAgICAgcmV0dXJuIHsnbmdiRGF0ZSc6IHtyZXF1aXJlZEFmdGVyOiB0aGlzLm1heERhdGV9fTtcbiAgICB9XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fbW9kZWwgPSB0aGlzLl9mcm9tRGF0ZVN0cnVjdCh0aGlzLl9kYXRlQWRhcHRlci5mcm9tTW9kZWwodmFsdWUpKTtcbiAgICB0aGlzLl93cml0ZU1vZGVsVmFsdWUodGhpcy5fbW9kZWwpO1xuICB9XG5cbiAgbWFudWFsRGF0ZUNoYW5nZSh2YWx1ZTogc3RyaW5nLCB1cGRhdGVWaWV3ID0gZmFsc2UpIHtcbiAgICBjb25zdCBpbnB1dFZhbHVlQ2hhbmdlZCA9IHZhbHVlICE9PSB0aGlzLl9pbnB1dFZhbHVlO1xuICAgIGlmIChpbnB1dFZhbHVlQ2hhbmdlZCkge1xuICAgICAgdGhpcy5faW5wdXRWYWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fbW9kZWwgPSB0aGlzLl9mcm9tRGF0ZVN0cnVjdCh0aGlzLl9wYXJzZXJGb3JtYXR0ZXIucGFyc2UodmFsdWUpKTtcbiAgICB9XG4gICAgaWYgKGlucHV0VmFsdWVDaGFuZ2VkIHx8ICF1cGRhdGVWaWV3KSB7XG4gICAgICB0aGlzLl9vbkNoYW5nZSh0aGlzLl9tb2RlbCA/IHRoaXMuX2RhdGVBZGFwdGVyLnRvTW9kZWwodGhpcy5fbW9kZWwpIDogKHZhbHVlID09PSAnJyA/IG51bGwgOiB2YWx1ZSkpO1xuICAgIH1cbiAgICBpZiAodXBkYXRlVmlldyAmJiB0aGlzLl9tb2RlbCkge1xuICAgICAgdGhpcy5fd3JpdGVNb2RlbFZhbHVlKHRoaXMuX21vZGVsKTtcbiAgICB9XG4gIH1cblxuICBpc09wZW4oKSB7IHJldHVybiAhIXRoaXMuX2NSZWY7IH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIGRhdGVwaWNrZXIgd2l0aCB0aGUgc2VsZWN0ZWQgZGF0ZSBpbmRpY2F0ZWQgYnkgdGhlIG5nTW9kZWwgdmFsdWUuXG4gICAqL1xuICBvcGVuKCkge1xuICAgIGlmICghdGhpcy5pc09wZW4oKSkge1xuICAgICAgY29uc3QgY2YgPSB0aGlzLl9jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTmdiRGF0ZXBpY2tlcik7XG4gICAgICB0aGlzLl9jUmVmID0gdGhpcy5fdmNSZWYuY3JlYXRlQ29tcG9uZW50KGNmKTtcblxuICAgICAgdGhpcy5fYXBwbHlQb3B1cFN0eWxpbmcodGhpcy5fY1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIHRoaXMuX2FwcGx5RGF0ZXBpY2tlcklucHV0cyh0aGlzLl9jUmVmLmluc3RhbmNlKTtcbiAgICAgIHRoaXMuX3N1YnNjcmliZUZvckRhdGVwaWNrZXJPdXRwdXRzKHRoaXMuX2NSZWYuaW5zdGFuY2UpO1xuICAgICAgdGhpcy5fY1JlZi5pbnN0YW5jZS5uZ09uSW5pdCgpO1xuICAgICAgdGhpcy5fY1JlZi5pbnN0YW5jZS53cml0ZVZhbHVlKHRoaXMuX2RhdGVBZGFwdGVyLnRvTW9kZWwodGhpcy5fbW9kZWwpKTtcblxuICAgICAgLy8gZGF0ZSBzZWxlY3Rpb24gZXZlbnQgaGFuZGxpbmdcbiAgICAgIHRoaXMuX2NSZWYuaW5zdGFuY2UucmVnaXN0ZXJPbkNoYW5nZSgoc2VsZWN0ZWREYXRlKSA9PiB7XG4gICAgICAgIHRoaXMud3JpdGVWYWx1ZShzZWxlY3RlZERhdGUpO1xuICAgICAgICB0aGlzLl9vbkNoYW5nZShzZWxlY3RlZERhdGUpO1xuICAgICAgICB0aGlzLl9vblRvdWNoZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9jUmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcblxuICAgICAgdGhpcy5fY1JlZi5pbnN0YW5jZS5zZXREaXNhYmxlZFN0YXRlKHRoaXMuZGlzYWJsZWQpO1xuXG4gICAgICBpZiAodGhpcy5jb250YWluZXIgPT09ICdib2R5Jykge1xuICAgICAgICB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmNvbnRhaW5lcikuYXBwZW5kQ2hpbGQodGhpcy5fY1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgLy8gZm9jdXMgaGFuZGxpbmdcbiAgICAgIG5nYkZvY3VzVHJhcCh0aGlzLl9jUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2Nsb3NlZCQsIHRydWUpO1xuICAgICAgdGhpcy5fY1JlZi5pbnN0YW5jZS5mb2N1cygpO1xuXG4gICAgICBuZ2JBdXRvQ2xvc2UoXG4gICAgICAgICAgdGhpcy5fbmdab25lLCB0aGlzLl9kb2N1bWVudCwgdGhpcy5hdXRvQ2xvc2UsICgpID0+IHRoaXMuY2xvc2UoKSwgdGhpcy5fY2xvc2VkJCwgW10sXG4gICAgICAgICAgW3RoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX2NSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudF0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIGRhdGVwaWNrZXIgcG9wdXAuXG4gICAqL1xuICBjbG9zZSgpIHtcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xuICAgICAgdGhpcy5fdmNSZWYucmVtb3ZlKHRoaXMuX3ZjUmVmLmluZGV4T2YodGhpcy5fY1JlZi5ob3N0VmlldykpO1xuICAgICAgdGhpcy5fY1JlZiA9IG51bGw7XG4gICAgICB0aGlzLl9jbG9zZWQkLm5leHQoKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBkYXRlcGlja2VyIHBvcHVwIChvcGVucyB3aGVuIGNsb3NlZCBhbmQgY2xvc2VzIHdoZW4gb3BlbmVkKS5cbiAgICovXG4gIHRvZ2dsZSgpIHtcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGVzIGN1cnJlbnQgdmlldyB0byBwcm92aWRlZCBkYXRlLlxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWMuXG4gICAqIElmIG5vdGhpbmcgb3IgaW52YWxpZCBkYXRlIHByb3ZpZGVkIGNhbGVuZGFyIHdpbGwgb3BlbiBjdXJyZW50IG1vbnRoLlxuICAgKiBVc2UgJ3N0YXJ0RGF0ZScgaW5wdXQgYXMgYW4gYWx0ZXJuYXRpdmVcbiAgICovXG4gIG5hdmlnYXRlVG8oZGF0ZT86IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheT86IG51bWJlcn0pIHtcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xuICAgICAgdGhpcy5fY1JlZi5pbnN0YW5jZS5uYXZpZ2F0ZVRvKGRhdGUpO1xuICAgIH1cbiAgfVxuXG4gIG9uQmx1cigpIHsgdGhpcy5fb25Ub3VjaGVkKCk7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ21pbkRhdGUnXSB8fCBjaGFuZ2VzWydtYXhEYXRlJ10pIHtcbiAgICAgIHRoaXMuX3ZhbGlkYXRvckNoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIF9hcHBseURhdGVwaWNrZXJJbnB1dHMoZGF0ZXBpY2tlckluc3RhbmNlOiBOZ2JEYXRlcGlja2VyKTogdm9pZCB7XG4gICAgWydkYXlUZW1wbGF0ZScsICdkYXlUZW1wbGF0ZURhdGEnLCAnZGlzcGxheU1vbnRocycsICdmaXJzdERheU9mV2VlaycsICdmb290ZXJUZW1wbGF0ZScsICdtYXJrRGlzYWJsZWQnLCAnbWluRGF0ZScsXG4gICAgICdtYXhEYXRlJywgJ25hdmlnYXRpb24nLCAnb3V0c2lkZURheXMnLCAnc2hvd05hdmlnYXRpb24nLCAnc2hvd1dlZWtkYXlzJywgJ3Nob3dXZWVrTnVtYmVycyddXG4gICAgICAgIC5mb3JFYWNoKChvcHRpb25OYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBpZiAodGhpc1tvcHRpb25OYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkYXRlcGlja2VySW5zdGFuY2Vbb3B0aW9uTmFtZV0gPSB0aGlzW29wdGlvbk5hbWVdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgZGF0ZXBpY2tlckluc3RhbmNlLnN0YXJ0RGF0ZSA9IHRoaXMuc3RhcnREYXRlIHx8IHRoaXMuX21vZGVsO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlQb3B1cFN0eWxpbmcobmF0aXZlRWxlbWVudDogYW55KSB7XG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MobmF0aXZlRWxlbWVudCwgJ2Ryb3Bkb3duLW1lbnUnKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShuYXRpdmVFbGVtZW50LCAncGFkZGluZycsICcwJyk7XG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MobmF0aXZlRWxlbWVudCwgJ3Nob3cnKTtcbiAgfVxuXG4gIHByaXZhdGUgX3N1YnNjcmliZUZvckRhdGVwaWNrZXJPdXRwdXRzKGRhdGVwaWNrZXJJbnN0YW5jZTogTmdiRGF0ZXBpY2tlcikge1xuICAgIGRhdGVwaWNrZXJJbnN0YW5jZS5uYXZpZ2F0ZS5zdWJzY3JpYmUobmF2aWdhdGVFdmVudCA9PiB0aGlzLm5hdmlnYXRlLmVtaXQobmF2aWdhdGVFdmVudCkpO1xuICAgIGRhdGVwaWNrZXJJbnN0YW5jZS5zZWxlY3Quc3Vic2NyaWJlKGRhdGUgPT4ge1xuICAgICAgdGhpcy5kYXRlU2VsZWN0LmVtaXQoZGF0ZSk7XG4gICAgICBpZiAodGhpcy5hdXRvQ2xvc2UgPT09IHRydWUgfHwgdGhpcy5hdXRvQ2xvc2UgPT09ICdpbnNpZGUnKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3dyaXRlTW9kZWxWYWx1ZShtb2RlbDogTmdiRGF0ZSkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fcGFyc2VyRm9ybWF0dGVyLmZvcm1hdChtb2RlbCk7XG4gICAgdGhpcy5faW5wdXRWYWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHZhbHVlKTtcbiAgICBpZiAodGhpcy5pc09wZW4oKSkge1xuICAgICAgdGhpcy5fY1JlZi5pbnN0YW5jZS53cml0ZVZhbHVlKHRoaXMuX2RhdGVBZGFwdGVyLnRvTW9kZWwobW9kZWwpKTtcbiAgICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Zyb21EYXRlU3RydWN0KGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBOZ2JEYXRlIHtcbiAgICBjb25zdCBuZ2JEYXRlID0gZGF0ZSA/IG5ldyBOZ2JEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgZGF0ZS5kYXkpIDogbnVsbDtcbiAgICByZXR1cm4gdGhpcy5fY2FsZW5kYXIuaXNWYWxpZChuZ2JEYXRlKSA/IG5nYkRhdGUgOiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbmdiRGF0ZXBpY2tlckRheVZpZXddJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlVXJsczogWycuL2RhdGVwaWNrZXItZGF5LXZpZXcuc2NzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ2J0bi1saWdodCcsXG4gICAgJ1tjbGFzcy5iZy1wcmltYXJ5XSc6ICdzZWxlY3RlZCcsXG4gICAgJ1tjbGFzcy50ZXh0LXdoaXRlXSc6ICdzZWxlY3RlZCcsXG4gICAgJ1tjbGFzcy50ZXh0LW11dGVkXSc6ICdpc011dGVkKCknLFxuICAgICdbY2xhc3Mub3V0c2lkZV0nOiAnaXNNdXRlZCgpJyxcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnZm9jdXNlZCdcbiAgfSxcbiAgdGVtcGxhdGU6IGB7eyBpMThuLmdldERheU51bWVyYWxzKGRhdGUpIH19YFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyRGF5VmlldyB7XG4gIEBJbnB1dCgpIGN1cnJlbnRNb250aDogbnVtYmVyO1xuICBASW5wdXQoKSBkYXRlOiBOZ2JEYXRlO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgZm9jdXNlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHVibGljIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuKSB7fVxuXG4gIGlzTXV0ZWQoKSB7IHJldHVybiAhdGhpcy5zZWxlY3RlZCAmJiAodGhpcy5kYXRlLm1vbnRoICE9PSB0aGlzLmN1cnJlbnRNb250aCB8fCB0aGlzLmRpc2FibGVkKTsgfVxufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XG5pbXBvcnQge3RvSW50ZWdlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbi1zZWxlY3QnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVVcmxzOiBbJy4vZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNlbGVjdFxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgIGNsYXNzPVwiY3VzdG9tLXNlbGVjdFwiXG4gICAgICBbdmFsdWVdPVwiZGF0ZT8ubW9udGhcIlxuICAgICAgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IuZGF0ZXBpY2tlci5zZWxlY3QtbW9udGhcIiBhcmlhLWxhYmVsPVwiU2VsZWN0IG1vbnRoXCJcbiAgICAgIGkxOG4tdGl0bGU9XCJAQG5nYi5kYXRlcGlja2VyLnNlbGVjdC1tb250aFwiIHRpdGxlPVwiU2VsZWN0IG1vbnRoXCJcbiAgICAgIChjaGFuZ2UpPVwiY2hhbmdlTW9udGgoJGV2ZW50LnRhcmdldC52YWx1ZSlcIj5cbiAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgbSBvZiBtb250aHNcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImkxOG4uZ2V0TW9udGhGdWxsTmFtZShtLCBkYXRlPy55ZWFyKVwiXG4gICAgICAgICAgICAgICAgW3ZhbHVlXT1cIm1cIj57eyBpMThuLmdldE1vbnRoU2hvcnROYW1lKG0sIGRhdGU/LnllYXIpIH19PC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+PHNlbGVjdFxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgIGNsYXNzPVwiY3VzdG9tLXNlbGVjdFwiXG4gICAgICBbdmFsdWVdPVwiZGF0ZT8ueWVhclwiXG4gICAgICBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5kYXRlcGlja2VyLnNlbGVjdC15ZWFyXCIgYXJpYS1sYWJlbD1cIlNlbGVjdCB5ZWFyXCJcbiAgICAgIGkxOG4tdGl0bGU9XCJAQG5nYi5kYXRlcGlja2VyLnNlbGVjdC15ZWFyXCIgdGl0bGU9XCJTZWxlY3QgeWVhclwiXG4gICAgICAoY2hhbmdlKT1cImNoYW5nZVllYXIoJGV2ZW50LnRhcmdldC52YWx1ZSlcIj5cbiAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgeSBvZiB5ZWFyc1wiIFt2YWx1ZV09XCJ5XCI+e3sgaTE4bi5nZXRZZWFyTnVtZXJhbHMoeSkgfX08L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyTmF2aWdhdGlvblNlbGVjdCB7XG4gIEBJbnB1dCgpIGRhdGU6IE5nYkRhdGU7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBtb250aHM6IG51bWJlcltdO1xuICBASW5wdXQoKSB5ZWFyczogbnVtYmVyW107XG5cbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiRGF0ZT4oKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaTE4bjogTmdiRGF0ZXBpY2tlckkxOG4pIHt9XG5cbiAgY2hhbmdlTW9udGgobW9udGg6IHN0cmluZykgeyB0aGlzLnNlbGVjdC5lbWl0KG5ldyBOZ2JEYXRlKHRoaXMuZGF0ZS55ZWFyLCB0b0ludGVnZXIobW9udGgpLCAxKSk7IH1cblxuICBjaGFuZ2VZZWFyKHllYXI6IHN0cmluZykgeyB0aGlzLnNlbGVjdC5lbWl0KG5ldyBOZ2JEYXRlKHRvSW50ZWdlcih5ZWFyKSwgdGhpcy5kYXRlLm1vbnRoLCAxKSk7IH1cbn1cbiIsImltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi4vbmdiLWRhdGUnO1xuaW1wb3J0IHtOZ2JQZXJpb2QsIE5nYkNhbGVuZGFyfSBmcm9tICcuLi9uZ2ItY2FsZW5kYXInO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNOdW1iZXJ9IGZyb20gJy4uLy4uL3V0aWwvdXRpbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ2JDYWxlbmRhckhpanJpIGV4dGVuZHMgTmdiQ2FsZW5kYXIge1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGRheXMgaW4gYSBzcGVjaWZpYyBIaWpyaSBtb250aC5cbiAgICogYG1vbnRoYCBpcyAxIGZvciBNdWhhcnJhbSwgMiBmb3IgU2FmYXIsIGV0Yy5cbiAgICogYHllYXJgIGlzIGFueSBIaWpyaSB5ZWFyLlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0RGF5c1Blck1vbnRoKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcik6IG51bWJlcjtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZXF1aXZhbGVudCBIaWpyaSBkYXRlIHZhbHVlIGZvciBhIGdpdmUgaW5wdXQgR3JlZ29yaWFuIGRhdGUuXG4gICAqIGBnRGF0ZWAgaXMgcyBKUyBEYXRlIHRvIGJlIGNvbnZlcnRlZCB0byBIaWpyaS5cbiAgICovXG4gIGFic3RyYWN0IGZyb21HcmVnb3JpYW4oZ0RhdGU6IERhdGUpOiBOZ2JEYXRlO1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyB0aGUgY3VycmVudCBIaWpyaSBkYXRlIHRvIEdyZWdvcmlhbi5cbiAgICovXG4gIGFic3RyYWN0IHRvR3JlZ29yaWFuKGhEYXRlOiBOZ2JEYXRlKTogRGF0ZTtcblxuICBnZXREYXlzUGVyV2VlaygpIHsgcmV0dXJuIDc7IH1cblxuICBnZXRNb250aHMoKSB7IHJldHVybiBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMl07IH1cblxuICBnZXRXZWVrc1Blck1vbnRoKCkgeyByZXR1cm4gNjsgfVxuXG4gIGdldE5leHQoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kOiBOZ2JQZXJpb2QgPSAnZCcsIG51bWJlciA9IDEpIHtcbiAgICBkYXRlID0gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRheSk7XG5cbiAgICBzd2l0Y2ggKHBlcmlvZCkge1xuICAgICAgY2FzZSAneSc6XG4gICAgICAgIGRhdGUgPSB0aGlzLl9zZXRZZWFyKGRhdGUsIGRhdGUueWVhciArIG51bWJlcik7XG4gICAgICAgIGRhdGUubW9udGggPSAxO1xuICAgICAgICBkYXRlLmRheSA9IDE7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgY2FzZSAnbSc6XG4gICAgICAgIGRhdGUgPSB0aGlzLl9zZXRNb250aChkYXRlLCBkYXRlLm1vbnRoICsgbnVtYmVyKTtcbiAgICAgICAgZGF0ZS5kYXkgPSAxO1xuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgIGNhc2UgJ2QnOlxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0RGF5KGRhdGUsIGRhdGUuZGF5ICsgbnVtYmVyKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgfVxuXG4gIGdldFByZXYoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kOiBOZ2JQZXJpb2QgPSAnZCcsIG51bWJlciA9IDEpIHsgcmV0dXJuIHRoaXMuZ2V0TmV4dChkYXRlLCBwZXJpb2QsIC1udW1iZXIpOyB9XG5cbiAgZ2V0V2Vla2RheShkYXRlOiBOZ2JEYXRlKSB7XG4gICAgY29uc3QgZGF5ID0gdGhpcy50b0dyZWdvcmlhbihkYXRlKS5nZXREYXkoKTtcbiAgICAvLyBpbiBKUyBEYXRlIFN1bj0wLCBpbiBJU08gODYwMSBTdW49N1xuICAgIHJldHVybiBkYXkgPT09IDAgPyA3IDogZGF5O1xuICB9XG5cbiAgZ2V0V2Vla051bWJlcih3ZWVrOiBOZ2JEYXRlW10sIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIpIHtcbiAgICAvLyBpbiBKUyBEYXRlIFN1bj0wLCBpbiBJU08gODYwMSBTdW49N1xuICAgIGlmIChmaXJzdERheU9mV2VlayA9PT0gNykge1xuICAgICAgZmlyc3REYXlPZldlZWsgPSAwO1xuICAgIH1cblxuICAgIGNvbnN0IHRodXJzZGF5SW5kZXggPSAoNCArIDcgLSBmaXJzdERheU9mV2VlaykgJSA3O1xuICAgIGNvbnN0IGRhdGUgPSB3ZWVrW3RodXJzZGF5SW5kZXhdO1xuXG4gICAgY29uc3QganNEYXRlID0gdGhpcy50b0dyZWdvcmlhbihkYXRlKTtcbiAgICBqc0RhdGUuc2V0RGF0ZShqc0RhdGUuZ2V0RGF0ZSgpICsgNCAtIChqc0RhdGUuZ2V0RGF5KCkgfHwgNykpOyAgLy8gVGh1cnNkYXlcbiAgICBjb25zdCB0aW1lID0ganNEYXRlLmdldFRpbWUoKTtcbiAgICBjb25zdCBNdWhEYXRlID0gdGhpcy50b0dyZWdvcmlhbihuZXcgTmdiRGF0ZShkYXRlLnllYXIsIDEsIDEpKTsgIC8vIENvbXBhcmUgd2l0aCBNdWhhcnJhbSAxXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yb3VuZCgodGltZSAtIE11aERhdGUuZ2V0VGltZSgpKSAvIDg2NDAwMDAwKSAvIDcpICsgMTtcbiAgfVxuXG4gIGdldFRvZGF5KCk6IE5nYkRhdGUgeyByZXR1cm4gdGhpcy5mcm9tR3JlZ29yaWFuKG5ldyBEYXRlKCkpOyB9XG5cblxuICBpc1ZhbGlkKGRhdGU6IE5nYkRhdGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZGF0ZSAmJiBpc051bWJlcihkYXRlLnllYXIpICYmIGlzTnVtYmVyKGRhdGUubW9udGgpICYmIGlzTnVtYmVyKGRhdGUuZGF5KSAmJlxuICAgICAgICAhaXNOYU4odGhpcy50b0dyZWdvcmlhbihkYXRlKS5nZXRUaW1lKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0RGF5KGRhdGU6IE5nYkRhdGUsIGRheTogbnVtYmVyKTogTmdiRGF0ZSB7XG4gICAgZGF5ID0gK2RheTtcbiAgICBsZXQgbURheXMgPSB0aGlzLmdldERheXNQZXJNb250aChkYXRlLm1vbnRoLCBkYXRlLnllYXIpO1xuICAgIGlmIChkYXkgPD0gMCkge1xuICAgICAgd2hpbGUgKGRheSA8PSAwKSB7XG4gICAgICAgIGRhdGUgPSB0aGlzLl9zZXRNb250aChkYXRlLCBkYXRlLm1vbnRoIC0gMSk7XG4gICAgICAgIG1EYXlzID0gdGhpcy5nZXREYXlzUGVyTW9udGgoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcbiAgICAgICAgZGF5ICs9IG1EYXlzO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGF5ID4gbURheXMpIHtcbiAgICAgIHdoaWxlIChkYXkgPiBtRGF5cykge1xuICAgICAgICBkYXkgLT0gbURheXM7XG4gICAgICAgIGRhdGUgPSB0aGlzLl9zZXRNb250aChkYXRlLCBkYXRlLm1vbnRoICsgMSk7XG4gICAgICAgIG1EYXlzID0gdGhpcy5nZXREYXlzUGVyTW9udGgoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZGF0ZS5kYXkgPSBkYXk7XG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cblxuICBwcml2YXRlIF9zZXRNb250aChkYXRlOiBOZ2JEYXRlLCBtb250aDogbnVtYmVyKTogTmdiRGF0ZSB7XG4gICAgbW9udGggPSArbW9udGg7XG4gICAgZGF0ZS55ZWFyID0gZGF0ZS55ZWFyICsgTWF0aC5mbG9vcigobW9udGggLSAxKSAvIDEyKTtcbiAgICBkYXRlLm1vbnRoID0gTWF0aC5mbG9vcigoKG1vbnRoIC0gMSkgJSAxMiArIDEyKSAlIDEyKSArIDE7XG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cblxuICBwcml2YXRlIF9zZXRZZWFyKGRhdGU6IE5nYkRhdGUsIHllYXI6IG51bWJlcik6IE5nYkRhdGUge1xuICAgIGRhdGUueWVhciA9ICt5ZWFyO1xuICAgIHJldHVybiBkYXRlO1xuICB9XG59XG4iLCJpbXBvcnQge05nYkNhbGVuZGFySGlqcml9IGZyb20gJy4vbmdiLWNhbGVuZGFyLWhpanJpJztcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi4vbmdiLWRhdGUnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBDaGVja3MgaWYgaXNsYW1pYyB5ZWFyIGlzIGEgbGVhcCB5ZWFyXG4gKi9cbmZ1bmN0aW9uIGlzSXNsYW1pY0xlYXBZZWFyKGhZZWFyOiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuICgxNCArIDExICogaFllYXIpICUgMzAgPCAxMTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgZ3JlZ29yaWFuIHllYXJzIGlzIGEgbGVhcCB5ZWFyXG4gKi9cbmZ1bmN0aW9uIGlzR3JlZ29yaWFuTGVhcFllYXIoZ0RhdGU6IERhdGUpOiBib29sZWFuIHtcbiAgY29uc3QgeWVhciA9IGdEYXRlLmdldEZ1bGxZZWFyKCk7XG4gIHJldHVybiB5ZWFyICUgNCA9PT0gMCAmJiB5ZWFyICUgMTAwICE9PSAwIHx8IHllYXIgJSA0MDAgPT09IDA7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgc3RhcnQgb2YgSGlqcmkgTW9udGguXG4gKiBgaE1vbnRoYCBpcyAwIGZvciBNdWhhcnJhbSwgMSBmb3IgU2FmYXIsIGV0Yy5cbiAqIGBoWWVhcmAgaXMgYW55IEhpanJpIGhZZWFyLlxuICovXG5mdW5jdGlvbiBnZXRJc2xhbWljTW9udGhTdGFydChoWWVhcjogbnVtYmVyLCBoTW9udGg6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLmNlaWwoMjkuNSAqIGhNb250aCkgKyAoaFllYXIgLSAxKSAqIDM1NCArIE1hdGguZmxvb3IoKDMgKyAxMSAqIGhZZWFyKSAvIDMwLjApO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHN0YXJ0IG9mIEhpanJpIHllYXIuXG4gKiBgeWVhcmAgaXMgYW55IEhpanJpIHllYXIuXG4gKi9cbmZ1bmN0aW9uIGdldElzbGFtaWNZZWFyU3RhcnQoeWVhcjogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuICh5ZWFyIC0gMSkgKiAzNTQgKyBNYXRoLmZsb29yKCgzICsgMTEgKiB5ZWFyKSAvIDMwLjApO1xufVxuXG5mdW5jdGlvbiBtb2QoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gYSAtIGIgKiBNYXRoLmZsb29yKGEgLyBiKTtcbn1cblxuLyoqXG4gKiBUaGUgY2l2aWwgY2FsZW5kYXIgaXMgb25lIHR5cGUgb2YgSGlqcmkgY2FsZW5kYXJzIHVzZWQgaW4gaXNsYW1pYyBjb3VudHJpZXMuXG4gKiBVc2VzIGEgZml4ZWQgY3ljbGUgb2YgYWx0ZXJuYXRpbmcgMjktIGFuZCAzMC1kYXkgbW9udGhzLFxuICogd2l0aCBhIGxlYXAgZGF5IGFkZGVkIHRvIHRoZSBsYXN0IG1vbnRoIG9mIDExIG91dCBvZiBldmVyeSAzMCB5ZWFycy5cbiAqIGh0dHA6Ly9jbGRyLnVuaWNvZGUub3JnL2RldmVsb3BtZW50L2RldmVsb3BtZW50LXByb2Nlc3MvZGVzaWduLXByb3Bvc2Fscy9pc2xhbWljLWNhbGVuZGFyLXR5cGVzXG4gKiBBbGwgdGhlIGNhbGN1bGF0aW9ucyBoZXJlIGFyZSBiYXNlZCBvbiB0aGUgZXF1YXRpb25zIGZyb20gXCJDYWxlbmRyaWNhbCBDYWxjdWxhdGlvbnNcIiBCeSBFZHdhcmQgTS4gUmVpbmdvbGQsIE5hY2h1bVxuICogRGVyc2hvd2l0ei5cbiAqL1xuXG5jb25zdCBHUkVHT1JJQU5fRVBPQ0ggPSAxNzIxNDI1LjU7XG5jb25zdCBJU0xBTUlDX0VQT0NIID0gMTk0ODQzOS41O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiQ2FsZW5kYXJJc2xhbWljQ2l2aWwgZXh0ZW5kcyBOZ2JDYWxlbmRhckhpanJpIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGVxdWl2YWxlbnQgaXNsYW1pYyhjaXZpbCkgZGF0ZSB2YWx1ZSBmb3IgYSBnaXZlIGlucHV0IEdyZWdvcmlhbiBkYXRlLlxuICAgKiBgZ0RhdGVgIGlzIGEgSlMgRGF0ZSB0byBiZSBjb252ZXJ0ZWQgdG8gSGlqcmkuXG4gICAqL1xuICBmcm9tR3JlZ29yaWFuKGdEYXRlOiBEYXRlKTogTmdiRGF0ZSB7XG4gICAgY29uc3QgZ1llYXIgPSBnRGF0ZS5nZXRGdWxsWWVhcigpLCBnTW9udGggPSBnRGF0ZS5nZXRNb250aCgpLCBnRGF5ID0gZ0RhdGUuZ2V0RGF0ZSgpO1xuXG4gICAgbGV0IGp1bGlhbkRheSA9IEdSRUdPUklBTl9FUE9DSCAtIDEgKyAzNjUgKiAoZ1llYXIgLSAxKSArIE1hdGguZmxvb3IoKGdZZWFyIC0gMSkgLyA0KSArXG4gICAgICAgIC1NYXRoLmZsb29yKChnWWVhciAtIDEpIC8gMTAwKSArIE1hdGguZmxvb3IoKGdZZWFyIC0gMSkgLyA0MDApICtcbiAgICAgICAgTWF0aC5mbG9vcihcbiAgICAgICAgICAgICgzNjcgKiAoZ01vbnRoICsgMSkgLSAzNjIpIC8gMTIgKyAoZ01vbnRoICsgMSA8PSAyID8gMCA6IGlzR3JlZ29yaWFuTGVhcFllYXIoZ0RhdGUpID8gLTEgOiAtMikgKyBnRGF5KTtcbiAgICBqdWxpYW5EYXkgPSBNYXRoLmZsb29yKGp1bGlhbkRheSkgKyAwLjU7XG5cbiAgICBjb25zdCBkYXlzID0ganVsaWFuRGF5IC0gSVNMQU1JQ19FUE9DSDtcbiAgICBjb25zdCBoWWVhciA9IE1hdGguZmxvb3IoKDMwICogZGF5cyArIDEwNjQ2KSAvIDEwNjMxLjApO1xuICAgIGxldCBoTW9udGggPSBNYXRoLmNlaWwoKGRheXMgLSAyOSAtIGdldElzbGFtaWNZZWFyU3RhcnQoaFllYXIpKSAvIDI5LjUpO1xuICAgIGhNb250aCA9IE1hdGgubWluKGhNb250aCwgMTEpO1xuICAgIGNvbnN0IGhEYXkgPSBNYXRoLmNlaWwoZGF5cyAtIGdldElzbGFtaWNNb250aFN0YXJ0KGhZZWFyLCBoTW9udGgpKSArIDE7XG4gICAgcmV0dXJuIG5ldyBOZ2JEYXRlKGhZZWFyLCBoTW9udGggKyAxLCBoRGF5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBlcXVpdmFsZW50IEpTIGRhdGUgdmFsdWUgZm9yIGEgZ2l2ZSBpbnB1dCBpc2xhbWljKGNpdmlsKSBkYXRlLlxuICAgKiBgaERhdGVgIGlzIGFuIGlzbGFtaWMoY2l2aWwpIGRhdGUgdG8gYmUgY29udmVydGVkIHRvIEdyZWdvcmlhbi5cbiAgICovXG4gIHRvR3JlZ29yaWFuKGhEYXRlOiBOZ2JEYXRlKTogRGF0ZSB7XG4gICAgY29uc3QgaFllYXIgPSBoRGF0ZS55ZWFyO1xuICAgIGNvbnN0IGhNb250aCA9IGhEYXRlLm1vbnRoIC0gMTtcbiAgICBjb25zdCBoRGF5ID0gaERhdGUuZGF5O1xuICAgIGNvbnN0IGp1bGlhbkRheSA9XG4gICAgICAgIGhEYXkgKyBNYXRoLmNlaWwoMjkuNSAqIGhNb250aCkgKyAoaFllYXIgLSAxKSAqIDM1NCArIE1hdGguZmxvb3IoKDMgKyAxMSAqIGhZZWFyKSAvIDMwKSArIElTTEFNSUNfRVBPQ0ggLSAxO1xuXG4gICAgY29uc3Qgd2pkID0gTWF0aC5mbG9vcihqdWxpYW5EYXkgLSAwLjUpICsgMC41LCBkZXBvY2ggPSB3amQgLSBHUkVHT1JJQU5fRVBPQ0gsXG4gICAgICAgICAgcXVhZHJpY2VudCA9IE1hdGguZmxvb3IoZGVwb2NoIC8gMTQ2MDk3KSwgZHFjID0gbW9kKGRlcG9jaCwgMTQ2MDk3KSwgY2VudCA9IE1hdGguZmxvb3IoZHFjIC8gMzY1MjQpLFxuICAgICAgICAgIGRjZW50ID0gbW9kKGRxYywgMzY1MjQpLCBxdWFkID0gTWF0aC5mbG9vcihkY2VudCAvIDE0NjEpLCBkcXVhZCA9IG1vZChkY2VudCwgMTQ2MSksXG4gICAgICAgICAgeWluZGV4ID0gTWF0aC5mbG9vcihkcXVhZCAvIDM2NSk7XG4gICAgbGV0IHllYXIgPSBxdWFkcmljZW50ICogNDAwICsgY2VudCAqIDEwMCArIHF1YWQgKiA0ICsgeWluZGV4O1xuICAgIGlmICghKGNlbnQgPT09IDQgfHwgeWluZGV4ID09PSA0KSkge1xuICAgICAgeWVhcisrO1xuICAgIH1cblxuICAgIGNvbnN0IGdZZWFyU3RhcnQgPSBHUkVHT1JJQU5fRVBPQ0ggKyAzNjUgKiAoeWVhciAtIDEpICsgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNCkgLSBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyAxMDApICtcbiAgICAgICAgTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gNDAwKTtcblxuICAgIGNvbnN0IHllYXJkYXkgPSB3amQgLSBnWWVhclN0YXJ0O1xuXG4gICAgY29uc3QgdGpkID0gR1JFR09SSUFOX0VQT0NIIC0gMSArIDM2NSAqICh5ZWFyIC0gMSkgKyBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyA0KSAtIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDEwMCkgK1xuICAgICAgICBNYXRoLmZsb29yKCh5ZWFyIC0gMSkgLyA0MDApICsgTWF0aC5mbG9vcig3MzkgLyAxMiArIChpc0dyZWdvcmlhbkxlYXBZZWFyKG5ldyBEYXRlKHllYXIsIDMsIDEpKSA/IC0xIDogLTIpICsgMSk7XG5cbiAgICBjb25zdCBsZWFwYWRqID0gd2pkIDwgdGpkID8gMCA6IGlzR3JlZ29yaWFuTGVhcFllYXIobmV3IERhdGUoeWVhciwgMywgMSkpID8gMSA6IDI7XG5cbiAgICBjb25zdCBtb250aCA9IE1hdGguZmxvb3IoKCh5ZWFyZGF5ICsgbGVhcGFkaikgKiAxMiArIDM3MykgLyAzNjcpO1xuICAgIGNvbnN0IHRqZDIgPSBHUkVHT1JJQU5fRVBPQ0ggLSAxICsgMzY1ICogKHllYXIgLSAxKSArIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDQpIC0gTWF0aC5mbG9vcigoeWVhciAtIDEpIC8gMTAwKSArXG4gICAgICAgIE1hdGguZmxvb3IoKHllYXIgLSAxKSAvIDQwMCkgK1xuICAgICAgICBNYXRoLmZsb29yKFxuICAgICAgICAgICAgKDM2NyAqIG1vbnRoIC0gMzYyKSAvIDEyICsgKG1vbnRoIDw9IDIgPyAwIDogaXNHcmVnb3JpYW5MZWFwWWVhcihuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIDEpKSA/IC0xIDogLTIpICtcbiAgICAgICAgICAgIDEpO1xuXG4gICAgY29uc3QgZGF5ID0gd2pkIC0gdGpkMiArIDE7XG5cbiAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgc3BlY2lmaWMgSGlqcmkgbW9udGguXG4gICAqIGBtb250aGAgaXMgMSBmb3IgTXVoYXJyYW0sIDIgZm9yIFNhZmFyLCBldGMuXG4gICAqIGB5ZWFyYCBpcyBhbnkgSGlqcmkgeWVhci5cbiAgICovXG4gIGdldERheXNQZXJNb250aChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHllYXIgPSB5ZWFyICsgTWF0aC5mbG9vcihtb250aCAvIDEzKTtcbiAgICBtb250aCA9ICgobW9udGggLSAxKSAlIDEyKSArIDE7XG4gICAgbGV0IGxlbmd0aCA9IDI5ICsgbW9udGggJSAyO1xuICAgIGlmIChtb250aCA9PT0gMTIgJiYgaXNJc2xhbWljTGVhcFllYXIoeWVhcikpIHtcbiAgICAgIGxlbmd0aCsrO1xuICAgIH1cbiAgICByZXR1cm4gbGVuZ3RoO1xuICB9XG59XG4iLCJpbXBvcnQge05nYkNhbGVuZGFySXNsYW1pY0NpdmlsfSBmcm9tICcuL25nYi1jYWxlbmRhci1pc2xhbWljLWNpdmlsJztcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi4vbmdiLWRhdGUnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBVbWFscXVyYSBjYWxlbmRhciBpcyBvbmUgdHlwZSBvZiBIaWpyaSBjYWxlbmRhcnMgdXNlZCBpbiBpc2xhbWljIGNvdW50cmllcy5cbiAqIFRoaXMgQ2FsZW5kYXIgaXMgdXNlZCBieSBTYXVkaSBBcmFiaWEgZm9yIGFkbWluaXN0cmF0aXZlIHB1cnBvc2UuXG4gKiBVbmxpa2UgdGFidWxhciBjYWxlbmRhcnMsIHRoZSBhbGdvcml0aG0gaW52b2x2ZXMgYXN0cm9ub21pY2FsIGNhbGN1bGF0aW9uLCBidXQgaXQncyBzdGlsbCBkZXRlcm1pbmlzdGljLlxuICogaHR0cDovL2NsZHIudW5pY29kZS5vcmcvZGV2ZWxvcG1lbnQvZGV2ZWxvcG1lbnQtcHJvY2Vzcy9kZXNpZ24tcHJvcG9zYWxzL2lzbGFtaWMtY2FsZW5kYXItdHlwZXNcbiAqL1xuXG5jb25zdCBHUkVHT1JJQU5fRklSU1RfREFURSA9IG5ldyBEYXRlKDE4ODIsIDEwLCAxMik7XG5jb25zdCBHUkVHT1JJQU5fTEFTVF9EQVRFID0gbmV3IERhdGUoMjE3NCwgMTAsIDI1KTtcbmNvbnN0IEhJSlJJX0JFR0lOID0gMTMwMDtcbmNvbnN0IEhJSlJJX0VORCA9IDE2MDA7XG5jb25zdCBPTkVfREFZID0gMTAwMCAqIDYwICogNjAgKiAyNDtcblxuY29uc3QgTU9OVEhfTEVOR1RIID0gW1xuICAvLyAxMzAwLTEzMDRcbiAgJzEwMTAxMDEwMTAxMCcsICcxMTAxMDEwMTAxMDAnLCAnMTExMDExMDAxMDAxJywgJzAxMTAxMTAxMDEwMCcsICcwMTEwMTExMDEwMTAnLFxuICAvLyAxMzA1LTEzMDlcbiAgJzAwMTEwMTEwMTEwMCcsICcxMDEwMTAxMDExMDEnLCAnMDEwMTAxMDEwMTAxJywgJzAxMTAxMDEwMTAwMScsICcwMTExMTAwMTAwMTAnLFxuICAvLyAxMzEwLTEzMTRcbiAgJzEwMTExMDEwMTAwMScsICcwMTAxMTEwMTAxMDAnLCAnMTAxMDExMDExMDEwJywgJzAxMDEwMTAxMTEwMCcsICcxMTAxMDAxMDExMDEnLFxuICAvLyAxMzE1LTEzMTlcbiAgJzAxMTAxMDAxMDEwMScsICcwMTExMDEwMDEwMTAnLCAnMTAxMTAxMDEwMTAwJywgJzEwMTEwMTEwMTAxMCcsICcwMTAxMTAxMDExMDEnLFxuICAvLyAxMzIwLTEzMjRcbiAgJzAxMDAxMDEwMTExMCcsICcxMDEwMDEwMDExMTEnLCAnMDEwMTAwMDEwMTExJywgJzAxMTAxMDAwMTAxMScsICcwMTEwMTAxMDAxMDEnLFxuICAvLyAxMzI1LTEzMjlcbiAgJzEwMTAxMTAxMDEwMScsICcwMDEwMTEwMTAxMTAnLCAnMTAwMTAxMDExMDExJywgJzAxMDAxMDAxMTEwMScsICcxMDEwMDEwMDExMDEnLFxuICAvLyAxMzMwLTEzMzRcbiAgJzExMDEwMDEwMDExMCcsICcxMTAxMTAwMTAxMDEnLCAnMDEwMTEwMTAxMTAwJywgJzEwMDExMDExMDExMCcsICcwMDEwMTAxMTEwMTAnLFxuICAvLyAxMzM1LTEzMzlcbiAgJzEwMTAwMTAxMTAxMScsICcwMTAxMDAxMDEwMTEnLCAnMTAxMDEwMDEwMTAxJywgJzAxMTAxMTAwMTAxMCcsICcxMDEwMTExMDEwMDEnLFxuICAvLyAxMzQwLTEzNDRcbiAgJzAwMTAxMTExMDEwMCcsICcxMDAxMDExMTAxMTAnLCAnMDAxMDEwMTEwMTEwJywgJzEwMDEwMTAxMDExMCcsICcxMDEwMTEwMDEwMTAnLFxuICAvLyAxMzQ1LTEzNDlcbiAgJzEwMTExMDEwMDEwMCcsICcxMDExMTEwMTAwMTAnLCAnMDEwMTExMDExMDAxJywgJzAwMTAxMTAxMTEwMCcsICcxMDAxMDExMDExMDEnLFxuICAvLyAxMzUwLTEzNTRcbiAgJzAxMDEwMTAwMTEwMScsICcxMDEwMTAxMDAxMDEnLCAnMTAxMTAxMDEwMDEwJywgJzEwMTExMDEwMDEwMScsICcwMTAxMTAxMTAxMDAnLFxuICAvLyAxMzU1LTEzNTlcbiAgJzEwMDExMDExMDExMCcsICcwMTAxMDEwMTAxMTEnLCAnMDAxMDEwMDEwMTExJywgJzAxMDEwMTAwMTAxMScsICcwMTEwMTAxMDAwMTEnLFxuICAvLyAxMzYwLTEzNjRcbiAgJzAxMTEwMTAxMDAxMCcsICcxMDExMDExMDAxMDEnLCAnMDEwMTAxMTAxMDEwJywgJzEwMTAxMDEwMTAxMScsICcwMTAxMDAxMDEwMTEnLFxuICAvLyAxMzY1LTEzNjlcbiAgJzExMDAxMDAxMDEwMScsICcxMTAxMDEwMDEwMTAnLCAnMTEwMTEwMTAwMTAxJywgJzAxMDExMTAwMTAxMCcsICcxMDEwMTEwMTAxMTAnLFxuICAvLyAxMzcwLTEzNzRcbiAgJzEwMDEwMTAxMDExMScsICcwMTAwMTAxMDEwMTEnLCAnMTAwMTAxMDAxMDExJywgJzEwMTAxMDEwMDEwMScsICcxMDExMDEwMTAwMTAnLFxuICAvLyAxMzc1LTEzNzlcbiAgJzEwMTEwMTEwMTAxMCcsICcwMTAxMDExMTAxMDEnLCAnMDAxMDAxMTEwMTEwJywgJzEwMDAxMDExMDExMScsICcwMTAwMDEwMTEwMTEnLFxuICAvLyAxMzgwLTEzODRcbiAgJzAxMDEwMTAxMDEwMScsICcwMTAxMTAxMDEwMDEnLCAnMDEwMTEwMTEwMTAwJywgJzEwMDExMTAxMTAxMCcsICcwMTAwMTEwMTExMDEnLFxuICAvLyAxMzg1LTEzODlcbiAgJzAwMTAwMTEwMTExMCcsICcxMDAxMDAxMTAxMTAnLCAnMTAxMDEwMTAxMDEwJywgJzExMDEwMTAxMDEwMCcsICcxMTAxMTAxMTAwMTAnLFxuICAvLyAxMzkwLTEzOTRcbiAgJzAxMDExMTAxMDEwMScsICcwMDEwMTEwMTEwMTAnLCAnMTAwMTAxMDExMDExJywgJzAxMDAxMDEwMTAxMScsICcxMDEwMDEwMTAxMDEnLFxuICAvLyAxMzk1LTEzOTlcbiAgJzEwMTEwMTAwMTAwMScsICcxMDExMDExMDAxMDAnLCAnMTAxMTAxMTEwMDAxJywgJzAxMDExMDExMDEwMCcsICcxMDEwMTAxMTAxMDEnLFxuICAvLyAxNDAwLTE0MDRcbiAgJzEwMTAwMTAxMDEwMScsICcxMTAxMDAxMDAxMDEnLCAnMTExMDEwMDEwMDEwJywgJzExMTAxMTAwMTAwMScsICcwMTEwMTEwMTAxMDAnLFxuICAvLyAxNDA1LTE0MDlcbiAgJzEwMTAxMTEwMTAwMScsICcxMDAxMDExMDEwMTEnLCAnMDEwMDEwMTAxMDExJywgJzEwMTAxMDAxMDAxMScsICcxMTAxMDEwMDEwMDEnLFxuICAvLyAxNDEwLTE0MTRcbiAgJzExMDExMDEwMDEwMCcsICcxMTAxMTAxMTAwMTAnLCAnMTAxMDEwMTExMDAxJywgJzAxMDAxMDExMTAxMCcsICcxMDEwMDEwMTEwMTEnLFxuICAvLyAxNDE1LTE0MTlcbiAgJzAxMDEwMDEwMTAxMScsICcxMDEwMTAwMTAxMDEnLCAnMTAxMTAwMTAxMDEwJywgJzEwMTEwMTAxMDEwMScsICcwMTAxMDEwMTExMDAnLFxuICAvLyAxNDIwLTE0MjRcbiAgJzAxMDAxMDExMTEwMScsICcwMDEwMDAxMTExMDEnLCAnMTAwMTAwMDExMTAxJywgJzEwMTAxMDAxMDEwMScsICcxMDExMDEwMDEwMTAnLFxuICAvLyAxNDI1LTE0MjlcbiAgJzEwMTEwMTAxMTAxMCcsICcwMTAxMDExMDExMDEnLCAnMDAxMDEwMTEwMTEwJywgJzEwMDEwMDExMTAxMScsICcwMTAwMTAwMTEwMTEnLFxuICAvLyAxNDMwLTE0MzRcbiAgJzAxMTAwMTAxMDEwMScsICcwMTEwMTAxMDEwMDEnLCAnMDExMTAxMDEwMTAwJywgJzEwMTEwMTEwMTAxMCcsICcwMTAxMDExMDExMDAnLFxuICAvLyAxNDM1LTE0MzlcbiAgJzEwMTAxMDEwMTEwMScsICcwMTAxMDEwMTAxMDEnLCAnMTAxMTAwMTAxMDAxJywgJzEwMTExMDAxMDAxMCcsICcxMDExMTAxMDEwMDEnLFxuICAvLyAxNDQwLTE0NDRcbiAgJzAxMDExMTAxMDEwMCcsICcxMDEwMTEwMTEwMTAnLCAnMDEwMTAxMDExMDEwJywgJzEwMTAxMDEwMTAxMScsICcwMTAxMTAwMTAxMDEnLFxuICAvLyAxNDQ1LTE0NDlcbiAgJzAxMTEwMTAwMTAwMScsICcwMTExMDExMDAxMDAnLCAnMTAxMTEwMTAxMDEwJywgJzAxMDExMDExMDEwMScsICcwMDEwMTAxMTAxMTAnLFxuICAvLyAxNDUwLTE0NTRcbiAgJzEwMTAwMTAxMDExMCcsICcxMTEwMDEwMDExMDEnLCAnMTAxMTAwMTAwMTAxJywgJzEwMTEwMTAxMDAxMCcsICcxMDExMDExMDEwMTAnLFxuICAvLyAxNDU1LTE0NTlcbiAgJzAxMDExMDEwMTEwMScsICcwMDEwMTAxMDExMTAnLCAnMTAwMTAwMTAxMTExJywgJzAxMDAxMDAxMDExMScsICcwMTEwMDEwMDEwMTEnLFxuICAvLyAxNDYwLTE0NjRcbiAgJzAxMTAxMDEwMDEwMScsICcwMTEwMTAxMDExMDAnLCAnMTAxMDExMDEwMTEwJywgJzAxMDEwMTAxMTEwMScsICcwMTAwMTAwMTExMDEnLFxuICAvLyAxNDY1LTE0NjlcbiAgJzEwMTAwMTAwMTEwMScsICcxMTAxMDAwMTAxMTAnLCAnMTEwMTEwMDEwMTAxJywgJzAxMDExMDEwMTAxMCcsICcwMTAxMTAxMTAxMDEnLFxuICAvLyAxNDcwLTE0NzRcbiAgJzAwMTAxMTAxMTAxMCcsICcxMDAxMDEwMTEwMTEnLCAnMDEwMDEwMTAxMTAxJywgJzAxMDExMDAxMDEwMScsICcwMTEwMTEwMDEwMTAnLFxuICAvLyAxNDc1LTE0NzlcbiAgJzAxMTAxMTEwMDEwMCcsICcxMDEwMTExMDEwMTAnLCAnMDEwMDExMTEwMTAxJywgJzAwMTAxMDExMDExMCcsICcxMDAxMDEwMTAxMTAnLFxuICAvLyAxNDgwLTE0ODRcbiAgJzEwMTAxMDEwMTAxMCcsICcxMDExMDEwMTAxMDAnLCAnMTAxMTExMDEwMDEwJywgJzAxMDExMTAxMTAwMScsICcwMDEwMTExMDEwMTAnLFxuICAvLyAxNDg1LTE0ODlcbiAgJzEwMDEwMTEwMTEwMScsICcwMTAwMTAxMDExMDEnLCAnMTAxMDEwMDEwMTAxJywgJzEwMTEwMTAwMTAxMCcsICcxMDExMTAxMDAxMDEnLFxuICAvLyAxNDkwLTE0OTRcbiAgJzAxMDExMDExMDAxMCcsICcxMDAxMTAxMTAxMDEnLCAnMDEwMDExMDEwMTEwJywgJzEwMTAxMDAxMDExMScsICcwMTAxMDEwMDAxMTEnLFxuICAvLyAxNDk1LTE0OTlcbiAgJzAxMTAxMDAxMDAxMScsICcwMTExMDEwMDEwMDEnLCAnMTAxMTAxMDEwMTAxJywgJzAxMDEwMTEwMTAxMCcsICcxMDEwMDExMDEwMTEnLFxuICAvLyAxNTAwLTE1MDRcbiAgJzAxMDEwMDEwMTAxMScsICcxMDEwMTAwMDEwMTEnLCAnMTEwMTAxMDAwMTEwJywgJzExMDExMDEwMDAxMScsICcwMTAxMTEwMDEwMTAnLFxuICAvLyAxNTA1LTE1MDlcbiAgJzEwMTAxMTAxMDExMCcsICcwMTAwMTEwMTEwMTEnLCAnMDAxMDAxMTAxMDExJywgJzEwMDEwMTAwMTAxMScsICcxMDEwMTAxMDAxMDEnLFxuICAvLyAxNTEwLTE1MTRcbiAgJzEwMTEwMTAxMDAxMCcsICcxMDExMDExMDEwMDEnLCAnMDEwMTAxMTEwMTAxJywgJzAwMDEwMTExMDExMCcsICcxMDAwMTAxMTAxMTEnLFxuICAvLyAxNTE1LTE1MTlcbiAgJzAwMTAwMTAxMTAxMScsICcwMTAxMDAxMDEwMTEnLCAnMDEwMTAxMTAwMTAxJywgJzAxMDExMDExMDEwMCcsICcxMDAxMTEwMTEwMTAnLFxuICAvLyAxNTIwLTE1MjRcbiAgJzAxMDAxMTEwMTEwMScsICcwMDAxMDExMDExMDEnLCAnMTAwMDEwMTEwMTEwJywgJzEwMTAxMDEwMDExMCcsICcxMTAxMDEwMTAwMTAnLFxuICAvLyAxNTI1LTE1MjlcbiAgJzExMDExMDEwMTAwMScsICcwMTAxMTEwMTAxMDAnLCAnMTAxMDExMDExMDEwJywgJzEwMDEwMTAxMTAxMScsICcwMTAwMTAxMDEwMTEnLFxuICAvLyAxNTMwLTE1MzRcbiAgJzAxMTAwMTAxMDAxMScsICcwMTExMDAxMDEwMDEnLCAnMDExMTAxMTAwMDEwJywgJzEwMTExMDEwMTAwMScsICcwMTAxMTAxMTAwMTAnLFxuICAvLyAxNTM1LTE1MzlcbiAgJzEwMTAxMDExMDEwMScsICcwMTAxMDEwMTAxMDEnLCAnMTAxMTAwMTAwMTAxJywgJzExMDExMDAxMDAxMCcsICcxMTEwMTEwMDEwMDEnLFxuICAvLyAxNTQwLTE1NDRcbiAgJzAxMTAxMTAxMDAxMCcsICcxMDEwMTExMDEwMDEnLCAnMDEwMTAxMTAxMDExJywgJzAxMDAxMDEwMTAxMScsICcxMDEwMDEwMTAxMDEnLFxuICAvLyAxNTQ1LTE1NDlcbiAgJzExMDEwMDEwMTAwMScsICcxMTAxMDEwMTAxMDAnLCAnMTEwMTEwMTAxMDEwJywgJzEwMDExMDExMDEwMScsICcwMTAwMTAxMTEwMTAnLFxuICAvLyAxNTUwLTE1NTRcbiAgJzEwMTAwMDExMTAxMScsICcwMTAwMTAwMTEwMTEnLCAnMTAxMDAxMDAxMTAxJywgJzEwMTAxMDEwMTAxMCcsICcxMDEwMTEwMTAxMDEnLFxuICAvLyAxNTU1LTE1NTlcbiAgJzAwMTAxMTAxMTAxMCcsICcxMDAxMDEwMTExMDEnLCAnMDEwMDAxMDExMTEwJywgJzEwMTAwMDEwMTExMCcsICcxMTAwMTAwMTEwMTAnLFxuICAvLyAxNTYwLTE1NjRcbiAgJzExMDEwMTAxMDEwMScsICcwMTEwMTAxMTAwMTAnLCAnMDExMDEwMTExMDAxJywgJzAxMDAxMDExMTAxMCcsICcxMDEwMDEwMTExMDEnLFxuICAvLyAxNTY1LTE1NjlcbiAgJzAxMDEwMDEwMTEwMScsICcxMDEwMTAwMTAxMDEnLCAnMTAxMTAxMDEwMDEwJywgJzEwMTExMDEwMTAwMCcsICcxMDExMTAxMTAxMDAnLFxuICAvLyAxNTcwLTE1NzRcbiAgJzAxMDExMDExMTAwMScsICcwMDEwMTEwMTEwMTAnLCAnMTAwMTAxMDExMDEwJywgJzEwMTEwMTAwMTAxMCcsICcxMTAxMTAxMDAxMDAnLFxuICAvLyAxNTc1LTE1NzlcbiAgJzExMTAxMTAxMDAwMScsICcwMTEwMTExMDEwMDAnLCAnMTAxMTAxMTAxMDEwJywgJzAxMDEwMTEwMTEwMScsICcwMTAxMDAxMTAxMDEnLFxuICAvLyAxNTgwLTE1ODRcbiAgJzAxMTAxMDAxMDEwMScsICcxMTAxMDEwMDEwMTAnLCAnMTEwMTEwMTAxMDAwJywgJzExMDExMTAxMDEwMCcsICcwMTEwMTEwMTEwMTAnLFxuICAvLyAxNTg1LTE1ODlcbiAgJzAxMDEwMTAxMTAxMScsICcwMDEwMTAwMTExMDEnLCAnMDExMDAwMTAxMDExJywgJzEwMTEwMDAxMDEwMScsICcxMDExMDEwMDEwMTAnLFxuICAvLyAxNTkwLTE1OTRcbiAgJzEwMTExMDAxMDEwMScsICcwMTAxMTAxMDEwMTAnLCAnMTAxMDEwMTAxMTEwJywgJzEwMDEwMDEwMTExMCcsICcxMTAwMTAwMDExMTEnLFxuICAvLyAxNTk1LTE1OTlcbiAgJzAxMDEwMDEwMDExMScsICcwMTEwMTAwMTAxMDEnLCAnMDExMDEwMTAxMDEwJywgJzEwMTAxMTAxMDExMCcsICcwMTAxMDEwMTExMDEnLFxuICAvLyAxNjAwXG4gICcwMDEwMTAwMTExMDEnXG5dO1xuXG5mdW5jdGlvbiBnZXREYXlzRGlmZihkYXRlMTogRGF0ZSwgZGF0ZTI6IERhdGUpOiBudW1iZXIge1xuICBjb25zdCBkaWZmID0gTWF0aC5hYnMoZGF0ZTEuZ2V0VGltZSgpIC0gZGF0ZTIuZ2V0VGltZSgpKTtcbiAgcmV0dXJuIE1hdGgucm91bmQoZGlmZiAvIE9ORV9EQVkpO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiQ2FsZW5kYXJJc2xhbWljVW1hbHF1cmEgZXh0ZW5kcyBOZ2JDYWxlbmRhcklzbGFtaWNDaXZpbCB7XG4gIC8qKlxuICAqIFJldHVybnMgdGhlIGVxdWl2YWxlbnQgaXNsYW1pYyhVbWFscXVyYSkgZGF0ZSB2YWx1ZSBmb3IgYSBnaXZlIGlucHV0IEdyZWdvcmlhbiBkYXRlLlxuICAqIGBnZGF0ZWAgaXMgcyBKUyBEYXRlIHRvIGJlIGNvbnZlcnRlZCB0byBIaWpyaS5cbiAgKi9cbiAgZnJvbUdyZWdvcmlhbihnRGF0ZTogRGF0ZSk6IE5nYkRhdGUge1xuICAgIGxldCBoRGF5ID0gMSwgaE1vbnRoID0gMCwgaFllYXIgPSAxMzAwO1xuICAgIGxldCBkYXlzRGlmZiA9IGdldERheXNEaWZmKGdEYXRlLCBHUkVHT1JJQU5fRklSU1RfREFURSk7XG4gICAgaWYgKGdEYXRlLmdldFRpbWUoKSAtIEdSRUdPUklBTl9GSVJTVF9EQVRFLmdldFRpbWUoKSA+PSAwICYmIGdEYXRlLmdldFRpbWUoKSAtIEdSRUdPUklBTl9MQVNUX0RBVEUuZ2V0VGltZSgpIDw9IDApIHtcbiAgICAgIGxldCB5ZWFyID0gMTMwMDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTU9OVEhfTEVOR1RILmxlbmd0aDsgaSsrLCB5ZWFyKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMjsgaisrKSB7XG4gICAgICAgICAgbGV0IG51bU9mRGF5cyA9ICtNT05USF9MRU5HVEhbaV1bal0gKyAyOTtcbiAgICAgICAgICBpZiAoZGF5c0RpZmYgPD0gbnVtT2ZEYXlzKSB7XG4gICAgICAgICAgICBoRGF5ID0gZGF5c0RpZmYgKyAxO1xuICAgICAgICAgICAgaWYgKGhEYXkgPiBudW1PZkRheXMpIHtcbiAgICAgICAgICAgICAgaERheSA9IDE7XG4gICAgICAgICAgICAgIGorKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChqID4gMTEpIHtcbiAgICAgICAgICAgICAgaiA9IDA7XG4gICAgICAgICAgICAgIHllYXIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhNb250aCA9IGo7XG4gICAgICAgICAgICBoWWVhciA9IHllYXI7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE5nYkRhdGUoaFllYXIsIGhNb250aCArIDEsIGhEYXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkYXlzRGlmZiA9IGRheXNEaWZmIC0gbnVtT2ZEYXlzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzdXBlci5mcm9tR3JlZ29yaWFuKGdEYXRlKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICogQ29udmVydHMgdGhlIGN1cnJlbnQgSGlqcmkgZGF0ZSB0byBHcmVnb3JpYW4uXG4gICovXG4gIHRvR3JlZ29yaWFuKGhEYXRlOiBOZ2JEYXRlKTogRGF0ZSB7XG4gICAgY29uc3QgaFllYXIgPSBoRGF0ZS55ZWFyO1xuICAgIGNvbnN0IGhNb250aCA9IGhEYXRlLm1vbnRoIC0gMTtcbiAgICBjb25zdCBoRGF5ID0gaERhdGUuZGF5O1xuICAgIGxldCBnRGF0ZSA9IG5ldyBEYXRlKEdSRUdPUklBTl9GSVJTVF9EQVRFKTtcbiAgICBsZXQgZGF5RGlmZiA9IGhEYXkgLSAxO1xuICAgIGlmIChoWWVhciA+PSBISUpSSV9CRUdJTiAmJiBoWWVhciA8PSBISUpSSV9FTkQpIHtcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgaFllYXIgLSBISUpSSV9CRUdJTjsgeSsrKSB7XG4gICAgICAgIGZvciAobGV0IG0gPSAwOyBtIDwgMTI7IG0rKykge1xuICAgICAgICAgIGRheURpZmYgKz0gK01PTlRIX0xFTkdUSFt5XVttXSArIDI5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBtID0gMDsgbSA8IGhNb250aDsgbSsrKSB7XG4gICAgICAgIGRheURpZmYgKz0gK01PTlRIX0xFTkdUSFtoWWVhciAtIEhJSlJJX0JFR0lOXVttXSArIDI5O1xuICAgICAgfVxuICAgICAgZ0RhdGUuc2V0RGF0ZShHUkVHT1JJQU5fRklSU1RfREFURS5nZXREYXRlKCkgKyBkYXlEaWZmKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ0RhdGUgPSBzdXBlci50b0dyZWdvcmlhbihoRGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBnRGF0ZTtcbiAgfVxuICAvKipcbiAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIHNwZWNpZmljIEhpanJpIGhNb250aC5cbiAgKiBgaE1vbnRoYCBpcyAxIGZvciBNdWhhcnJhbSwgMiBmb3IgU2FmYXIsIGV0Yy5cbiAgKiBgaFllYXJgIGlzIGFueSBIaWpyaSBoWWVhci5cbiAgKi9cbiAgZ2V0RGF5c1Blck1vbnRoKGhNb250aDogbnVtYmVyLCBoWWVhcjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAoaFllYXIgPj0gSElKUklfQkVHSU4gJiYgaFllYXIgPD0gSElKUklfRU5EKSB7XG4gICAgICBjb25zdCBwb3MgPSBoWWVhciAtIEhJSlJJX0JFR0lOO1xuICAgICAgcmV0dXJuICtNT05USF9MRU5HVEhbcG9zXVtoTW9udGggLSAxXSArIDI5O1xuICAgIH1cbiAgICByZXR1cm4gc3VwZXIuZ2V0RGF5c1Blck1vbnRoKGhNb250aCwgaFllYXIpO1xuICB9XG59XG4iLCJpbXBvcnQge05nYkRhdGV9IGZyb20gJy4uL25nYi1kYXRlJztcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBlcXVpdmFsZW50IEpTIGRhdGUgdmFsdWUgZm9yIGEgZ2l2ZSBpbnB1dCBKYWxhbGkgZGF0ZS5cbiAqIGBqYWxhbGlEYXRlYCBpcyBhbiBKYWxhbGkgZGF0ZSB0byBiZSBjb252ZXJ0ZWQgdG8gR3JlZ29yaWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9HcmVnb3JpYW4oamFsYWxpRGF0ZTogTmdiRGF0ZSk6IERhdGUge1xuICBsZXQgamRuID0gamFsYWxpVG9KdWxpYW4oamFsYWxpRGF0ZS55ZWFyLCBqYWxhbGlEYXRlLm1vbnRoLCBqYWxhbGlEYXRlLmRheSk7XG4gIGxldCBkYXRlID0ganVsaWFuVG9HcmVnb3JpYW4oamRuKTtcbiAgZGF0ZS5zZXRIb3Vycyg2LCAzMCwgMywgMjAwKTtcbiAgcmV0dXJuIGRhdGU7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZXF1aXZhbGVudCBqYWxhbGkgZGF0ZSB2YWx1ZSBmb3IgYSBnaXZlIGlucHV0IEdyZWdvcmlhbiBkYXRlLlxuICogYGdkYXRlYCBpcyBhIEpTIERhdGUgdG8gYmUgY29udmVydGVkIHRvIGphbGFsaS5cbiAqIHV0YyB0byBsb2NhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZnJvbUdyZWdvcmlhbihnZGF0ZTogRGF0ZSk6IE5nYkRhdGUge1xuICBsZXQgZzJkID0gZ3JlZ29yaWFuVG9KdWxpYW4oZ2RhdGUuZ2V0RnVsbFllYXIoKSwgZ2RhdGUuZ2V0TW9udGgoKSArIDEsIGdkYXRlLmdldERhdGUoKSk7XG4gIHJldHVybiBqdWxpYW5Ub0phbGFsaShnMmQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0SmFsYWxpWWVhcihkYXRlOiBOZ2JEYXRlLCB5ZWFyVmFsdWU6IG51bWJlcik6IE5nYkRhdGUge1xuICBkYXRlLnllYXIgPSAreWVhclZhbHVlO1xuICByZXR1cm4gZGF0ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEphbGFsaU1vbnRoKGRhdGU6IE5nYkRhdGUsIG1vbnRoOiBudW1iZXIpOiBOZ2JEYXRlIHtcbiAgbW9udGggPSArbW9udGg7XG4gIGRhdGUueWVhciA9IGRhdGUueWVhciArIE1hdGguZmxvb3IoKG1vbnRoIC0gMSkgLyAxMik7XG4gIGRhdGUubW9udGggPSBNYXRoLmZsb29yKCgobW9udGggLSAxKSAlIDEyICsgMTIpICUgMTIpICsgMTtcbiAgcmV0dXJuIGRhdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRKYWxhbGlEYXkoZGF0ZTogTmdiRGF0ZSwgZGF5OiBudW1iZXIpOiBOZ2JEYXRlIHtcbiAgbGV0IG1EYXlzID0gZ2V0RGF5c1Blck1vbnRoKGRhdGUubW9udGgsIGRhdGUueWVhcik7XG4gIGlmIChkYXkgPD0gMCkge1xuICAgIHdoaWxlIChkYXkgPD0gMCkge1xuICAgICAgZGF0ZSA9IHNldEphbGFsaU1vbnRoKGRhdGUsIGRhdGUubW9udGggLSAxKTtcbiAgICAgIG1EYXlzID0gZ2V0RGF5c1Blck1vbnRoKGRhdGUubW9udGgsIGRhdGUueWVhcik7XG4gICAgICBkYXkgKz0gbURheXM7XG4gICAgfVxuICB9IGVsc2UgaWYgKGRheSA+IG1EYXlzKSB7XG4gICAgd2hpbGUgKGRheSA+IG1EYXlzKSB7XG4gICAgICBkYXkgLT0gbURheXM7XG4gICAgICBkYXRlID0gc2V0SmFsYWxpTW9udGgoZGF0ZSwgZGF0ZS5tb250aCArIDEpO1xuICAgICAgbURheXMgPSBnZXREYXlzUGVyTW9udGgoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcbiAgICB9XG4gIH1cbiAgZGF0ZS5kYXkgPSBkYXk7XG4gIHJldHVybiBkYXRlO1xufVxuXG5mdW5jdGlvbiBtb2QoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gYSAtIGIgKiBNYXRoLmZsb29yKGEgLyBiKTtcbn1cblxuZnVuY3Rpb24gZGl2KGE6IG51bWJlciwgYjogbnVtYmVyKSB7XG4gIHJldHVybiBNYXRoLnRydW5jKGEgLyBiKTtcbn1cblxuLypcbiBUaGlzIGZ1bmN0aW9uIGRldGVybWluZXMgaWYgdGhlIEphbGFsaSAoUGVyc2lhbikgeWVhciBpc1xuIGxlYXAgKDM2Ni1kYXkgbG9uZykgb3IgaXMgdGhlIGNvbW1vbiB5ZWFyICgzNjUgZGF5cyksIGFuZFxuIGZpbmRzIHRoZSBkYXkgaW4gTWFyY2ggKEdyZWdvcmlhbiBjYWxlbmRhcikgb2YgdGhlIGZpcnN0XG4gZGF5IG9mIHRoZSBKYWxhbGkgeWVhciAoamFsYWxpWWVhcikuXG4gQHBhcmFtIGphbGFsaVllYXIgSmFsYWxpIGNhbGVuZGFyIHllYXIgKC02MSB0byAzMTc3KVxuIEByZXR1cm5cbiBsZWFwOiBudW1iZXIgb2YgeWVhcnMgc2luY2UgdGhlIGxhc3QgbGVhcCB5ZWFyICgwIHRvIDQpXG4gZ1llYXI6IEdyZWdvcmlhbiB5ZWFyIG9mIHRoZSBiZWdpbm5pbmcgb2YgSmFsYWxpIHllYXJcbiBtYXJjaDogdGhlIE1hcmNoIGRheSBvZiBGYXJ2YXJkaW4gdGhlIDFzdCAoMXN0IGRheSBvZiBqYWxhbGlZZWFyKVxuIEBzZWU6IGh0dHA6Ly93d3cuYXN0cm8udW5pLnRvcnVuLnBsL35rYi9QYXBlcnMvRU1QL1BlcnNpYW5DLUVNUC5odG1cbiBAc2VlOiBodHRwOi8vd3d3LmZvdXJtaWxhYi5jaC9kb2N1bWVudHMvY2FsZW5kYXIvXG4gKi9cbmZ1bmN0aW9uIGphbENhbChqYWxhbGlZZWFyOiBudW1iZXIpIHtcbiAgLy8gSmFsYWxpIHllYXJzIHN0YXJ0aW5nIHRoZSAzMy15ZWFyIHJ1bGUuXG4gIGxldCBicmVha3MgPVxuICAgICAgWy02MSwgOSwgMzgsIDE5OSwgNDI2LCA2ODYsIDc1NiwgODE4LCAxMTExLCAxMTgxLCAxMjEwLCAxNjM1LCAyMDYwLCAyMDk3LCAyMTkyLCAyMjYyLCAyMzI0LCAyMzk0LCAyNDU2LCAzMTc4XTtcbiAgY29uc3QgYnJlYWtzTGVuZ3RoID0gYnJlYWtzLmxlbmd0aDtcbiAgY29uc3QgZ1llYXIgPSBqYWxhbGlZZWFyICsgNjIxO1xuICBsZXQgbGVhcEogPSAtMTQ7XG4gIGxldCBqcCA9IGJyZWFrc1swXTtcblxuICBpZiAoamFsYWxpWWVhciA8IGpwIHx8IGphbGFsaVllYXIgPj0gYnJlYWtzW2JyZWFrc0xlbmd0aCAtIDFdKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEphbGFsaSB5ZWFyICcgKyBqYWxhbGlZZWFyKTtcbiAgfVxuXG4gIC8vIEZpbmQgdGhlIGxpbWl0aW5nIHllYXJzIGZvciB0aGUgSmFsYWxpIHllYXIgamFsYWxpWWVhci5cbiAgbGV0IGp1bXA7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgYnJlYWtzTGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBqbSA9IGJyZWFrc1tpXTtcbiAgICBqdW1wID0gam0gLSBqcDtcbiAgICBpZiAoamFsYWxpWWVhciA8IGptKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgbGVhcEogPSBsZWFwSiArIGRpdihqdW1wLCAzMykgKiA4ICsgZGl2KG1vZChqdW1wLCAzMyksIDQpO1xuICAgIGpwID0gam07XG4gIH1cbiAgbGV0IG4gPSBqYWxhbGlZZWFyIC0ganA7XG5cbiAgLy8gRmluZCB0aGUgbnVtYmVyIG9mIGxlYXAgeWVhcnMgZnJvbSBBRCA2MjEgdG8gdGhlIGJlZ2lubmluZ1xuICAvLyBvZiB0aGUgY3VycmVudCBKYWxhbGkgeWVhciBpbiB0aGUgUGVyc2lhbiBjYWxlbmRhci5cbiAgbGVhcEogPSBsZWFwSiArIGRpdihuLCAzMykgKiA4ICsgZGl2KG1vZChuLCAzMykgKyAzLCA0KTtcbiAgaWYgKG1vZChqdW1wLCAzMykgPT09IDQgJiYganVtcCAtIG4gPT09IDQpIHtcbiAgICBsZWFwSiArPSAxO1xuICB9XG5cbiAgLy8gQW5kIHRoZSBzYW1lIGluIHRoZSBHcmVnb3JpYW4gY2FsZW5kYXIgKHVudGlsIHRoZSB5ZWFyIGdZZWFyKS5cbiAgY29uc3QgbGVhcEcgPSBkaXYoZ1llYXIsIDQpIC0gZGl2KChkaXYoZ1llYXIsIDEwMCkgKyAxKSAqIDMsIDQpIC0gMTUwO1xuXG4gIC8vIERldGVybWluZSB0aGUgR3JlZ29yaWFuIGRhdGUgb2YgRmFydmFyZGluIHRoZSAxc3QuXG4gIGNvbnN0IG1hcmNoID0gMjAgKyBsZWFwSiAtIGxlYXBHO1xuXG4gIC8vIEZpbmQgaG93IG1hbnkgeWVhcnMgaGF2ZSBwYXNzZWQgc2luY2UgdGhlIGxhc3QgbGVhcCB5ZWFyLlxuICBpZiAoanVtcCAtIG4gPCA2KSB7XG4gICAgbiA9IG4gLSBqdW1wICsgZGl2KGp1bXAgKyA0LCAzMykgKiAzMztcbiAgfVxuICBsZXQgbGVhcCA9IG1vZChtb2QobiArIDEsIDMzKSAtIDEsIDQpO1xuICBpZiAobGVhcCA9PT0gLTEpIHtcbiAgICBsZWFwID0gNDtcbiAgfVxuXG4gIHJldHVybiB7bGVhcDogbGVhcCwgZ3k6IGdZZWFyLCBtYXJjaDogbWFyY2h9O1xufVxuXG4vKlxuIENhbGN1bGF0ZXMgR3JlZ29yaWFuIGFuZCBKdWxpYW4gY2FsZW5kYXIgZGF0ZXMgZnJvbSB0aGUgSnVsaWFuIERheSBudW1iZXJcbiAoamRuKSBmb3IgdGhlIHBlcmlvZCBzaW5jZSBqZG49LTM0ODM5NjU1IChpLmUuIHRoZSB5ZWFyIC0xMDAxMDAgb2YgYm90aFxuIGNhbGVuZGFycykgdG8gc29tZSBtaWxsaW9ucyB5ZWFycyBhaGVhZCBvZiB0aGUgcHJlc2VudC5cbiBAcGFyYW0gamRuIEp1bGlhbiBEYXkgbnVtYmVyXG4gQHJldHVyblxuIGdZZWFyOiBDYWxlbmRhciB5ZWFyICh5ZWFycyBCQyBudW1iZXJlZCAwLCAtMSwgLTIsIC4uLilcbiBnTW9udGg6IENhbGVuZGFyIG1vbnRoICgxIHRvIDEyKVxuIGdEYXk6IENhbGVuZGFyIGRheSBvZiB0aGUgbW9udGggTSAoMSB0byAyOC8yOS8zMC8zMSlcbiAqL1xuZnVuY3Rpb24ganVsaWFuVG9HcmVnb3JpYW4oanVsaWFuRGF5TnVtYmVyOiBudW1iZXIpIHtcbiAgbGV0IGogPSA0ICoganVsaWFuRGF5TnVtYmVyICsgMTM5MzYxNjMxO1xuICBqID0gaiArIGRpdihkaXYoNCAqIGp1bGlhbkRheU51bWJlciArIDE4MzE4NzcyMCwgMTQ2MDk3KSAqIDMsIDQpICogNCAtIDM5MDg7XG4gIGNvbnN0IGkgPSBkaXYobW9kKGosIDE0NjEpLCA0KSAqIDUgKyAzMDg7XG4gIGNvbnN0IGdEYXkgPSBkaXYobW9kKGksIDE1MyksIDUpICsgMTtcbiAgY29uc3QgZ01vbnRoID0gbW9kKGRpdihpLCAxNTMpLCAxMikgKyAxO1xuICBjb25zdCBnWWVhciA9IGRpdihqLCAxNDYxKSAtIDEwMDEwMCArIGRpdig4IC0gZ01vbnRoLCA2KTtcblxuICByZXR1cm4gbmV3IERhdGUoZ1llYXIsIGdNb250aCAtIDEsIGdEYXkpO1xufVxuXG4vKlxuIENvbnZlcnRzIGEgZGF0ZSBvZiB0aGUgSmFsYWxpIGNhbGVuZGFyIHRvIHRoZSBKdWxpYW4gRGF5IG51bWJlci5cbiBAcGFyYW0gankgSmFsYWxpIHllYXIgKDEgdG8gMzEwMClcbiBAcGFyYW0gam0gSmFsYWxpIG1vbnRoICgxIHRvIDEyKVxuIEBwYXJhbSBqZCBKYWxhbGkgZGF5ICgxIHRvIDI5LzMxKVxuIEByZXR1cm4gSnVsaWFuIERheSBudW1iZXJcbiAqL1xuZnVuY3Rpb24gZ3JlZ29yaWFuVG9KdWxpYW4oZ3k6IG51bWJlciwgZ206IG51bWJlciwgZ2Q6IG51bWJlcikge1xuICBsZXQgZCA9IGRpdigoZ3kgKyBkaXYoZ20gLSA4LCA2KSArIDEwMDEwMCkgKiAxNDYxLCA0KSArIGRpdigxNTMgKiBtb2QoZ20gKyA5LCAxMikgKyAyLCA1KSArIGdkIC0gMzQ4NDA0MDg7XG4gIGQgPSBkIC0gZGl2KGRpdihneSArIDEwMDEwMCArIGRpdihnbSAtIDgsIDYpLCAxMDApICogMywgNCkgKyA3NTI7XG4gIHJldHVybiBkO1xufVxuXG4vKlxuIENvbnZlcnRzIHRoZSBKdWxpYW4gRGF5IG51bWJlciB0byBhIGRhdGUgaW4gdGhlIEphbGFsaSBjYWxlbmRhci5cbiBAcGFyYW0ganVsaWFuRGF5TnVtYmVyIEp1bGlhbiBEYXkgbnVtYmVyXG4gQHJldHVyblxuIGphbGFsaVllYXI6IEphbGFsaSB5ZWFyICgxIHRvIDMxMDApXG4gamFsYWxpTW9udGg6IEphbGFsaSBtb250aCAoMSB0byAxMilcbiBqYWxhbGlEYXk6IEphbGFsaSBkYXkgKDEgdG8gMjkvMzEpXG4gKi9cbmZ1bmN0aW9uIGp1bGlhblRvSmFsYWxpKGp1bGlhbkRheU51bWJlcjogbnVtYmVyKSB7XG4gIGxldCBneSA9IGp1bGlhblRvR3JlZ29yaWFuKGp1bGlhbkRheU51bWJlcikuZ2V0RnVsbFllYXIoKSAgLy8gQ2FsY3VsYXRlIEdyZWdvcmlhbiB5ZWFyIChneSkuXG4gICAgICAsXG4gICAgICBqYWxhbGlZZWFyID0gZ3kgLSA2MjEsIHIgPSBqYWxDYWwoamFsYWxpWWVhciksIGdyZWdvcmlhbkRheSA9IGdyZWdvcmlhblRvSnVsaWFuKGd5LCAzLCByLm1hcmNoKSwgamFsYWxpRGF5LFxuICAgICAgamFsYWxpTW9udGgsIG51bWJlck9mRGF5cztcblxuICAvLyBGaW5kIG51bWJlciBvZiBkYXlzIHRoYXQgcGFzc2VkIHNpbmNlIDEgRmFydmFyZGluLlxuICBudW1iZXJPZkRheXMgPSBqdWxpYW5EYXlOdW1iZXIgLSBncmVnb3JpYW5EYXk7XG4gIGlmIChudW1iZXJPZkRheXMgPj0gMCkge1xuICAgIGlmIChudW1iZXJPZkRheXMgPD0gMTg1KSB7XG4gICAgICAvLyBUaGUgZmlyc3QgNiBtb250aHMuXG4gICAgICBqYWxhbGlNb250aCA9IDEgKyBkaXYobnVtYmVyT2ZEYXlzLCAzMSk7XG4gICAgICBqYWxhbGlEYXkgPSBtb2QobnVtYmVyT2ZEYXlzLCAzMSkgKyAxO1xuICAgICAgcmV0dXJuIG5ldyBOZ2JEYXRlKGphbGFsaVllYXIsIGphbGFsaU1vbnRoLCBqYWxhbGlEYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGUgcmVtYWluaW5nIG1vbnRocy5cbiAgICAgIG51bWJlck9mRGF5cyAtPSAxODY7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIFByZXZpb3VzIEphbGFsaSB5ZWFyLlxuICAgIGphbGFsaVllYXIgLT0gMTtcbiAgICBudW1iZXJPZkRheXMgKz0gMTc5O1xuICAgIGlmIChyLmxlYXAgPT09IDEpIHtcbiAgICAgIG51bWJlck9mRGF5cyArPSAxO1xuICAgIH1cbiAgfVxuICBqYWxhbGlNb250aCA9IDcgKyBkaXYobnVtYmVyT2ZEYXlzLCAzMCk7XG4gIGphbGFsaURheSA9IG1vZChudW1iZXJPZkRheXMsIDMwKSArIDE7XG5cbiAgcmV0dXJuIG5ldyBOZ2JEYXRlKGphbGFsaVllYXIsIGphbGFsaU1vbnRoLCBqYWxhbGlEYXkpO1xufVxuXG4vKlxuIENvbnZlcnRzIGEgZGF0ZSBvZiB0aGUgSmFsYWxpIGNhbGVuZGFyIHRvIHRoZSBKdWxpYW4gRGF5IG51bWJlci5cbiBAcGFyYW0galllYXIgSmFsYWxpIHllYXIgKDEgdG8gMzEwMClcbiBAcGFyYW0gak1vbnRoIEphbGFsaSBtb250aCAoMSB0byAxMilcbiBAcGFyYW0gakRheSBKYWxhbGkgZGF5ICgxIHRvIDI5LzMxKVxuIEByZXR1cm4gSnVsaWFuIERheSBudW1iZXJcbiAqL1xuZnVuY3Rpb24gamFsYWxpVG9KdWxpYW4oalllYXI6IG51bWJlciwgak1vbnRoOiBudW1iZXIsIGpEYXk6IG51bWJlcikge1xuICBsZXQgciA9IGphbENhbChqWWVhcik7XG4gIHJldHVybiBncmVnb3JpYW5Ub0p1bGlhbihyLmd5LCAzLCByLm1hcmNoKSArIChqTW9udGggLSAxKSAqIDMxIC0gZGl2KGpNb250aCwgNykgKiAoak1vbnRoIC0gNykgKyBqRGF5IC0gMTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIHNwZWNpZmljIGphbGFsaSBtb250aC5cbiAqL1xuZnVuY3Rpb24gZ2V0RGF5c1Blck1vbnRoKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcik6IG51bWJlciB7XG4gIGlmIChtb250aCA8PSA2KSB7XG4gICAgcmV0dXJuIDMxO1xuICB9XG4gIGlmIChtb250aCA8PSAxMSkge1xuICAgIHJldHVybiAzMDtcbiAgfVxuICBpZiAoamFsQ2FsKHllYXIpLmxlYXAgPT09IDApIHtcbiAgICByZXR1cm4gMzA7XG4gIH1cbiAgcmV0dXJuIDI5O1xufVxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi4vbmdiLWRhdGUnO1xuaW1wb3J0IHtOZ2JDYWxlbmRhciwgTmdiUGVyaW9kfSBmcm9tICcuLi9uZ2ItY2FsZW5kYXInO1xuaW1wb3J0IHtpc0ludGVnZXJ9IGZyb20gJy4uLy4uL3V0aWwvdXRpbCc7XG5cbmltcG9ydCB7ZnJvbUdyZWdvcmlhbiwgc2V0SmFsYWxpRGF5LCBzZXRKYWxhbGlNb250aCwgc2V0SmFsYWxpWWVhciwgdG9HcmVnb3JpYW59IGZyb20gJy4vamFsYWxpJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nYkNhbGVuZGFyUGVyc2lhbiBleHRlbmRzIE5nYkNhbGVuZGFyIHtcbiAgZ2V0RGF5c1BlcldlZWsoKSB7IHJldHVybiA3OyB9XG5cbiAgZ2V0TW9udGhzKCkgeyByZXR1cm4gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTJdOyB9XG5cbiAgZ2V0V2Vla3NQZXJNb250aCgpIHsgcmV0dXJuIDY7IH1cblxuICBnZXROZXh0KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7XG4gICAgZGF0ZSA9IG5ldyBOZ2JEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCwgZGF0ZS5kYXkpO1xuXG4gICAgc3dpdGNoIChwZXJpb2QpIHtcbiAgICAgIGNhc2UgJ3knOlxuICAgICAgICBkYXRlID0gc2V0SmFsYWxpWWVhcihkYXRlLCBkYXRlLnllYXIgKyBudW1iZXIpO1xuICAgICAgICBkYXRlLm1vbnRoID0gMTtcbiAgICAgICAgZGF0ZS5kYXkgPSAxO1xuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgIGNhc2UgJ20nOlxuICAgICAgICBkYXRlID0gc2V0SmFsYWxpTW9udGgoZGF0ZSwgZGF0ZS5tb250aCArIG51bWJlcik7XG4gICAgICAgIGRhdGUuZGF5ID0gMTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICBjYXNlICdkJzpcbiAgICAgICAgcmV0dXJuIHNldEphbGFsaURheShkYXRlLCBkYXRlLmRheSArIG51bWJlcik7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG4gIH1cblxuICBnZXRQcmV2KGRhdGU6IE5nYkRhdGUsIHBlcmlvZDogTmdiUGVyaW9kID0gJ2QnLCBudW1iZXIgPSAxKSB7IHJldHVybiB0aGlzLmdldE5leHQoZGF0ZSwgcGVyaW9kLCAtbnVtYmVyKTsgfVxuXG4gIGdldFdlZWtkYXkoZGF0ZTogTmdiRGF0ZSkge1xuICAgIGNvbnN0IGRheSA9IHRvR3JlZ29yaWFuKGRhdGUpLmdldERheSgpO1xuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XG4gICAgcmV0dXJuIGRheSA9PT0gMCA/IDcgOiBkYXk7XG4gIH1cblxuICBnZXRXZWVrTnVtYmVyKHdlZWs6IE5nYkRhdGVbXSwgZmlyc3REYXlPZldlZWs6IG51bWJlcikge1xuICAgIC8vIGluIEpTIERhdGUgU3VuPTAsIGluIElTTyA4NjAxIFN1bj03XG4gICAgaWYgKGZpcnN0RGF5T2ZXZWVrID09PSA3KSB7XG4gICAgICBmaXJzdERheU9mV2VlayA9IDA7XG4gICAgfVxuXG4gICAgY29uc3QgdGh1cnNkYXlJbmRleCA9ICg0ICsgNyAtIGZpcnN0RGF5T2ZXZWVrKSAlIDc7XG4gICAgY29uc3QgZGF0ZSA9IHdlZWtbdGh1cnNkYXlJbmRleF07XG5cbiAgICBjb25zdCBqc0RhdGUgPSB0b0dyZWdvcmlhbihkYXRlKTtcbiAgICBqc0RhdGUuc2V0RGF0ZShqc0RhdGUuZ2V0RGF0ZSgpICsgNCAtIChqc0RhdGUuZ2V0RGF5KCkgfHwgNykpOyAgLy8gVGh1cnNkYXlcbiAgICBjb25zdCB0aW1lID0ganNEYXRlLmdldFRpbWUoKTtcbiAgICBjb25zdCBzdGFydERhdGUgPSB0b0dyZWdvcmlhbihuZXcgTmdiRGF0ZShkYXRlLnllYXIsIDEsIDEpKTtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJvdW5kKCh0aW1lIC0gc3RhcnREYXRlLmdldFRpbWUoKSkgLyA4NjQwMDAwMCkgLyA3KSArIDE7XG4gIH1cblxuICBnZXRUb2RheSgpOiBOZ2JEYXRlIHsgcmV0dXJuIGZyb21HcmVnb3JpYW4obmV3IERhdGUoKSk7IH1cblxuICBpc1ZhbGlkKGRhdGU6IE5nYkRhdGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZGF0ZSAmJiBpc0ludGVnZXIoZGF0ZS55ZWFyKSAmJiBpc0ludGVnZXIoZGF0ZS5tb250aCkgJiYgaXNJbnRlZ2VyKGRhdGUuZGF5KSAmJlxuICAgICAgICAhaXNOYU4odG9HcmVnb3JpYW4oZGF0ZSkuZ2V0VGltZSgpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuLi9uZ2ItZGF0ZSc7XG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4uL25nYi1kYXRlLXN0cnVjdCc7XG5cbmNvbnN0IFBBUlRTX1BFUl9IT1VSID0gMTA4MDtcbmNvbnN0IFBBUlRTX1BFUl9EQVkgPSAyNCAqIFBBUlRTX1BFUl9IT1VSO1xuY29uc3QgUEFSVFNfRlJBQ1RJT05BTF9NT05USCA9IDEyICogUEFSVFNfUEVSX0hPVVIgKyA3OTM7XG5jb25zdCBQQVJUU19QRVJfTU9OVEggPSAyOSAqIFBBUlRTX1BFUl9EQVkgKyBQQVJUU19GUkFDVElPTkFMX01PTlRIO1xuY29uc3QgQkFIQVJBRCA9IDExICogUEFSVFNfUEVSX0hPVVIgKyAyMDQ7XG5jb25zdCBIRUJSRVdfREFZX09OX0pBTl8xXzE5NzAgPSAyMDkyNTkxO1xuY29uc3QgR1JFR09SSUFOX0VQT0NIID0gMTcyMTQyNS41O1xuXG5mdW5jdGlvbiBpc0dyZWdvcmlhbkxlYXBZZWFyKHllYXI6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4geWVhciAlIDQgPT09IDAgJiYgeWVhciAlIDEwMCAhPT0gMCB8fCB5ZWFyICUgNDAwID09PSAwO1xufVxuXG5mdW5jdGlvbiBudW1iZXJPZkZpcnN0RGF5SW5ZZWFyKHllYXI6IG51bWJlcik6IG51bWJlciB7XG4gIGxldCBtb250aHNCZWZvcmVZZWFyID0gTWF0aC5mbG9vcigoMjM1ICogeWVhciAtIDIzNCkgLyAxOSk7XG4gIGxldCBmcmFjdGlvbmFsTW9udGhzQmVmb3JlWWVhciA9IG1vbnRoc0JlZm9yZVllYXIgKiBQQVJUU19GUkFDVElPTkFMX01PTlRIICsgQkFIQVJBRDtcbiAgbGV0IGRheU51bWJlciA9IG1vbnRoc0JlZm9yZVllYXIgKiAyOSArIE1hdGguZmxvb3IoZnJhY3Rpb25hbE1vbnRoc0JlZm9yZVllYXIgLyBQQVJUU19QRVJfREFZKTtcbiAgbGV0IHRpbWVPZkRheSA9IGZyYWN0aW9uYWxNb250aHNCZWZvcmVZZWFyICUgUEFSVFNfUEVSX0RBWTtcblxuICBsZXQgZGF5T2ZXZWVrID0gZGF5TnVtYmVyICUgNzsgIC8vIDAgPT0gTW9uZGF5XG5cbiAgaWYgKGRheU9mV2VlayA9PT0gMiB8fCBkYXlPZldlZWsgPT09IDQgfHwgZGF5T2ZXZWVrID09PSA2KSB7XG4gICAgZGF5TnVtYmVyKys7XG4gICAgZGF5T2ZXZWVrID0gZGF5TnVtYmVyICUgNztcbiAgfVxuICBpZiAoZGF5T2ZXZWVrID09PSAxICYmIHRpbWVPZkRheSA+IDE1ICogUEFSVFNfUEVSX0hPVVIgKyAyMDQgJiYgIWlzSGVicmV3TGVhcFllYXIoeWVhcikpIHtcbiAgICBkYXlOdW1iZXIgKz0gMjtcbiAgfSBlbHNlIGlmIChkYXlPZldlZWsgPT09IDAgJiYgdGltZU9mRGF5ID4gMjEgKiBQQVJUU19QRVJfSE9VUiArIDU4OSAmJiBpc0hlYnJld0xlYXBZZWFyKHllYXIgLSAxKSkge1xuICAgIGRheU51bWJlcisrO1xuICB9XG4gIHJldHVybiBkYXlOdW1iZXI7XG59XG5cbmZ1bmN0aW9uIGdldERheXNJbkdyZWdvcmlhbk1vbnRoKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcik6IG51bWJlciB7XG4gIGxldCBkYXlzID0gWzMxLCAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdO1xuICBpZiAoaXNHcmVnb3JpYW5MZWFwWWVhcih5ZWFyKSkge1xuICAgIGRheXNbMV0rKztcbiAgfVxuICByZXR1cm4gZGF5c1ttb250aCAtIDFdO1xufVxuXG5mdW5jdGlvbiBnZXRIZWJyZXdNb250aHMoeWVhcjogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIGlzSGVicmV3TGVhcFllYXIoeWVhcikgPyAxMyA6IDEyO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBkYXlzIGluIGEgc3BlY2lmaWMgSGVicmV3IHllYXIuXG4gKiBgeWVhcmAgaXMgYW55IEhlYnJldyB5ZWFyLlxuICovXG5mdW5jdGlvbiBnZXREYXlzSW5IZWJyZXdZZWFyKHllYXI6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBudW1iZXJPZkZpcnN0RGF5SW5ZZWFyKHllYXIgKyAxKSAtIG51bWJlck9mRmlyc3REYXlJblllYXIoeWVhcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0hlYnJld0xlYXBZZWFyKHllYXI6IG51bWJlcik6IGJvb2xlYW4ge1xuICBsZXQgYiA9ICh5ZWFyICogMTIgKyAxNykgJSAxOTtcbiAgcmV0dXJuIGIgPj0gKChiIDwgMCkgPyAtNyA6IDEyKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIHNwZWNpZmljIEhlYnJldyBtb250aC5cbiAqIGBtb250aGAgaXMgMSBmb3IgTmlzYW4sIDIgZm9yIEl5YXIgZXRjLiBOb3RlOiBIZWJyZXcgbGVhcCB5ZWFyIGNvbnRhaW5zIDEzIG1vbnRocy5cbiAqIGB5ZWFyYCBpcyBhbnkgSGVicmV3IHllYXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlzSW5IZWJyZXdNb250aChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpOiBudW1iZXIge1xuICBsZXQgeWVhckxlbmd0aCA9IG51bWJlck9mRmlyc3REYXlJblllYXIoeWVhciArIDEpIC0gbnVtYmVyT2ZGaXJzdERheUluWWVhcih5ZWFyKTtcbiAgbGV0IHllYXJUeXBlID0gKHllYXJMZW5ndGggPD0gMzgwID8geWVhckxlbmd0aCA6ICh5ZWFyTGVuZ3RoIC0gMzApKSAtIDM1MztcbiAgbGV0IGxlYXBZZWFyID0gaXNIZWJyZXdMZWFwWWVhcih5ZWFyKTtcbiAgbGV0IGRheXNJbk1vbnRoID0gbGVhcFllYXIgPyBbMzAsIDI5LCAyOSwgMjksIDMwLCAzMCwgMjksIDMwLCAyOSwgMzAsIDI5LCAzMCwgMjldIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbMzAsIDI5LCAyOSwgMjksIDMwLCAyOSwgMzAsIDI5LCAzMCwgMjksIDMwLCAyOV07XG4gIGlmICh5ZWFyVHlwZSA+IDApIHtcbiAgICBkYXlzSW5Nb250aFsyXSsrOyAgLy8gS2lzbGV2IGdldHMgYW4gZXh0cmEgZGF5IGluIG5vcm1hbCBvciBjb21wbGV0ZSB5ZWFycy5cbiAgfVxuICBpZiAoeWVhclR5cGUgPiAxKSB7XG4gICAgZGF5c0luTW9udGhbMV0rKzsgIC8vIEhlc2h2YW4gZ2V0cyBhbiBleHRyYSBkYXkgaW4gY29tcGxldGUgeWVhcnMgb25seS5cbiAgfVxuICByZXR1cm4gZGF5c0luTW9udGhbbW9udGggLSAxXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERheU51bWJlckluSGVicmV3WWVhcihkYXRlOiBOZ2JEYXRlKTogbnVtYmVyIHtcbiAgbGV0IG51bWJlck9mRGF5ID0gMDtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBkYXRlLm1vbnRoOyBpKyspIHtcbiAgICBudW1iZXJPZkRheSArPSBnZXREYXlzSW5IZWJyZXdNb250aChpLCBkYXRlLnllYXIpO1xuICB9XG4gIHJldHVybiBudW1iZXJPZkRheSArIGRhdGUuZGF5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0SGVicmV3TW9udGgoZGF0ZTogTmdiRGF0ZSwgdmFsOiBudW1iZXIpOiBOZ2JEYXRlIHtcbiAgbGV0IGFmdGVyID0gdmFsID49IDA7XG4gIGlmICghYWZ0ZXIpIHtcbiAgICB2YWwgPSAtdmFsO1xuICB9XG4gIHdoaWxlICh2YWwgPiAwKSB7XG4gICAgaWYgKGFmdGVyKSB7XG4gICAgICBpZiAodmFsID4gZ2V0SGVicmV3TW9udGhzKGRhdGUueWVhcikgLSBkYXRlLm1vbnRoKSB7XG4gICAgICAgIHZhbCAtPSBnZXRIZWJyZXdNb250aHMoZGF0ZS55ZWFyKSAtIGRhdGUubW9udGggKyAxO1xuICAgICAgICBkYXRlLnllYXIrKztcbiAgICAgICAgZGF0ZS5tb250aCA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRlLm1vbnRoICs9IHZhbDtcbiAgICAgICAgdmFsID0gMDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHZhbCA+PSBkYXRlLm1vbnRoKSB7XG4gICAgICAgIGRhdGUueWVhci0tO1xuICAgICAgICB2YWwgLT0gZGF0ZS5tb250aDtcbiAgICAgICAgZGF0ZS5tb250aCA9IGdldEhlYnJld01vbnRocyhkYXRlLnllYXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0ZS5tb250aCAtPSB2YWw7XG4gICAgICAgIHZhbCA9IDA7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBkYXRlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0SGVicmV3RGF5KGRhdGU6IE5nYkRhdGUsIHZhbDogbnVtYmVyKTogTmdiRGF0ZSB7XG4gIGxldCBhZnRlciA9IHZhbCA+PSAwO1xuICBpZiAoIWFmdGVyKSB7XG4gICAgdmFsID0gLXZhbDtcbiAgfVxuICB3aGlsZSAodmFsID4gMCkge1xuICAgIGlmIChhZnRlcikge1xuICAgICAgaWYgKHZhbCA+IGdldERheXNJbkhlYnJld1llYXIoZGF0ZS55ZWFyKSAtIGdldERheU51bWJlckluSGVicmV3WWVhcihkYXRlKSkge1xuICAgICAgICB2YWwgLT0gZ2V0RGF5c0luSGVicmV3WWVhcihkYXRlLnllYXIpIC0gZ2V0RGF5TnVtYmVySW5IZWJyZXdZZWFyKGRhdGUpICsgMTtcbiAgICAgICAgZGF0ZS55ZWFyKys7XG4gICAgICAgIGRhdGUubW9udGggPSAxO1xuICAgICAgICBkYXRlLmRheSA9IDE7XG4gICAgICB9IGVsc2UgaWYgKHZhbCA+IGdldERheXNJbkhlYnJld01vbnRoKGRhdGUubW9udGgsIGRhdGUueWVhcikgLSBkYXRlLmRheSkge1xuICAgICAgICB2YWwgLT0gZ2V0RGF5c0luSGVicmV3TW9udGgoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKSAtIGRhdGUuZGF5ICsgMTtcbiAgICAgICAgZGF0ZS5tb250aCsrO1xuICAgICAgICBkYXRlLmRheSA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRlLmRheSArPSB2YWw7XG4gICAgICAgIHZhbCA9IDA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh2YWwgPj0gZGF0ZS5kYXkpIHtcbiAgICAgICAgdmFsIC09IGRhdGUuZGF5O1xuICAgICAgICBkYXRlLm1vbnRoLS07XG4gICAgICAgIGlmIChkYXRlLm1vbnRoID09PSAwKSB7XG4gICAgICAgICAgZGF0ZS55ZWFyLS07XG4gICAgICAgICAgZGF0ZS5tb250aCA9IGdldEhlYnJld01vbnRocyhkYXRlLnllYXIpO1xuICAgICAgICB9XG4gICAgICAgIGRhdGUuZGF5ID0gZ2V0RGF5c0luSGVicmV3TW9udGgoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGUuZGF5IC09IHZhbDtcbiAgICAgICAgdmFsID0gMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRhdGU7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZXF1aXZhbGVudCBIZWJyZXcgZGF0ZSB2YWx1ZSBmb3IgYSBnaXZlIGlucHV0IEdyZWdvcmlhbiBkYXRlLlxuICogYGdkYXRlYCBpcyBhIEpTIERhdGUgdG8gYmUgY29udmVydGVkIHRvIEhlYnJldyBkYXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZnJvbUdyZWdvcmlhbihnZGF0ZTogRGF0ZSk6IE5nYkRhdGUge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoZ2RhdGUpO1xuICBjb25zdCBnWWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKSwgZ01vbnRoID0gZGF0ZS5nZXRNb250aCgpLCBnRGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gIGxldCBqdWxpYW5EYXkgPSBHUkVHT1JJQU5fRVBPQ0ggLSAxICsgMzY1ICogKGdZZWFyIC0gMSkgKyBNYXRoLmZsb29yKChnWWVhciAtIDEpIC8gNCkgLVxuICAgICAgTWF0aC5mbG9vcigoZ1llYXIgLSAxKSAvIDEwMCkgKyBNYXRoLmZsb29yKChnWWVhciAtIDEpIC8gNDAwKSArXG4gICAgICBNYXRoLmZsb29yKCgzNjcgKiAoZ01vbnRoICsgMSkgLSAzNjIpIC8gMTIgKyAoZ01vbnRoICsgMSA8PSAyID8gMCA6IGlzR3JlZ29yaWFuTGVhcFllYXIoZ1llYXIpID8gLTEgOiAtMikgKyBnRGF5KTtcbiAganVsaWFuRGF5ID0gTWF0aC5mbG9vcihqdWxpYW5EYXkgKyAwLjUpO1xuICBsZXQgZGF5c1NpbmNlSGViRXBvY2ggPSBqdWxpYW5EYXkgLSAzNDc5OTc7XG4gIGxldCBtb250aHNTaW5jZUhlYkVwb2NoID0gTWF0aC5mbG9vcihkYXlzU2luY2VIZWJFcG9jaCAqIFBBUlRTX1BFUl9EQVkgLyBQQVJUU19QRVJfTU9OVEgpO1xuICBsZXQgaFllYXIgPSBNYXRoLmZsb29yKChtb250aHNTaW5jZUhlYkVwb2NoICogMTkgKyAyMzQpIC8gMjM1KSArIDE7XG4gIGxldCBmaXJzdERheU9mVGhpc1llYXIgPSBudW1iZXJPZkZpcnN0RGF5SW5ZZWFyKGhZZWFyKTtcbiAgbGV0IGRheU9mWWVhciA9IGRheXNTaW5jZUhlYkVwb2NoIC0gZmlyc3REYXlPZlRoaXNZZWFyO1xuICB3aGlsZSAoZGF5T2ZZZWFyIDwgMSkge1xuICAgIGhZZWFyLS07XG4gICAgZmlyc3REYXlPZlRoaXNZZWFyID0gbnVtYmVyT2ZGaXJzdERheUluWWVhcihoWWVhcik7XG4gICAgZGF5T2ZZZWFyID0gZGF5c1NpbmNlSGViRXBvY2ggLSBmaXJzdERheU9mVGhpc1llYXI7XG4gIH1cbiAgbGV0IGhNb250aCA9IDE7XG4gIGxldCBoRGF5ID0gZGF5T2ZZZWFyO1xuICB3aGlsZSAoaERheSA+IGdldERheXNJbkhlYnJld01vbnRoKGhNb250aCwgaFllYXIpKSB7XG4gICAgaERheSAtPSBnZXREYXlzSW5IZWJyZXdNb250aChoTW9udGgsIGhZZWFyKTtcbiAgICBoTW9udGgrKztcbiAgfVxuICByZXR1cm4gbmV3IE5nYkRhdGUoaFllYXIsIGhNb250aCwgaERheSk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZXF1aXZhbGVudCBKUyBkYXRlIHZhbHVlIGZvciBhIGdpdmVuIEhlYnJldyBkYXRlLlxuICogYGhlYnJld0RhdGVgIGlzIGFuIEhlYnJldyBkYXRlIHRvIGJlIGNvbnZlcnRlZCB0byBHcmVnb3JpYW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0dyZWdvcmlhbihoZWJyZXdEYXRlOiBOZ2JEYXRlU3RydWN0IHwgTmdiRGF0ZSk6IERhdGUge1xuICBjb25zdCBoWWVhciA9IGhlYnJld0RhdGUueWVhcjtcbiAgY29uc3QgaE1vbnRoID0gaGVicmV3RGF0ZS5tb250aDtcbiAgY29uc3QgaERheSA9IGhlYnJld0RhdGUuZGF5O1xuICBsZXQgZGF5cyA9IG51bWJlck9mRmlyc3REYXlJblllYXIoaFllYXIpO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IGhNb250aDsgaSsrKSB7XG4gICAgZGF5cyArPSBnZXREYXlzSW5IZWJyZXdNb250aChpLCBoWWVhcik7XG4gIH1cbiAgZGF5cyArPSBoRGF5O1xuICBsZXQgZGlmZkRheXMgPSBkYXlzIC0gSEVCUkVXX0RBWV9PTl9KQU5fMV8xOTcwO1xuICBsZXQgYWZ0ZXIgPSBkaWZmRGF5cyA+PSAwO1xuICBpZiAoIWFmdGVyKSB7XG4gICAgZGlmZkRheXMgPSAtZGlmZkRheXM7XG4gIH1cbiAgbGV0IGdZZWFyID0gMTk3MDtcbiAgbGV0IGdNb250aCA9IDE7XG4gIGxldCBnRGF5ID0gMTtcbiAgd2hpbGUgKGRpZmZEYXlzID4gMCkge1xuICAgIGlmIChhZnRlcikge1xuICAgICAgaWYgKGRpZmZEYXlzID49IChpc0dyZWdvcmlhbkxlYXBZZWFyKGdZZWFyKSA/IDM2NiA6IDM2NSkpIHtcbiAgICAgICAgZGlmZkRheXMgLT0gaXNHcmVnb3JpYW5MZWFwWWVhcihnWWVhcikgPyAzNjYgOiAzNjU7XG4gICAgICAgIGdZZWFyKys7XG4gICAgICB9IGVsc2UgaWYgKGRpZmZEYXlzID49IGdldERheXNJbkdyZWdvcmlhbk1vbnRoKGdNb250aCwgZ1llYXIpKSB7XG4gICAgICAgIGRpZmZEYXlzIC09IGdldERheXNJbkdyZWdvcmlhbk1vbnRoKGdNb250aCwgZ1llYXIpO1xuICAgICAgICBnTW9udGgrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdEYXkgKz0gZGlmZkRheXM7XG4gICAgICAgIGRpZmZEYXlzID0gMDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRpZmZEYXlzID49IChpc0dyZWdvcmlhbkxlYXBZZWFyKGdZZWFyIC0gMSkgPyAzNjYgOiAzNjUpKSB7XG4gICAgICAgIGRpZmZEYXlzIC09IGlzR3JlZ29yaWFuTGVhcFllYXIoZ1llYXIgLSAxKSA/IDM2NiA6IDM2NTtcbiAgICAgICAgZ1llYXItLTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChnTW9udGggPiAxKSB7XG4gICAgICAgICAgZ01vbnRoLS07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ01vbnRoID0gMTI7XG4gICAgICAgICAgZ1llYXItLTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGlmZkRheXMgPj0gZ2V0RGF5c0luR3JlZ29yaWFuTW9udGgoZ01vbnRoLCBnWWVhcikpIHtcbiAgICAgICAgICBkaWZmRGF5cyAtPSBnZXREYXlzSW5HcmVnb3JpYW5Nb250aChnTW9udGgsIGdZZWFyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnRGF5ID0gZ2V0RGF5c0luR3JlZ29yaWFuTW9udGgoZ01vbnRoLCBnWWVhcikgLSBkaWZmRGF5cyArIDE7XG4gICAgICAgICAgZGlmZkRheXMgPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXcgRGF0ZShnWWVhciwgZ01vbnRoIC0gMSwgZ0RheSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoZWJyZXdOdW1lcmFscyhudW1lcmFsczogbnVtYmVyKTogc3RyaW5nIHtcbiAgaWYgKCFudW1lcmFscykge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBjb25zdCBoQXJyYXkwXzkgPSBbJycsICdcXHUwNWQwJywgJ1xcdTA1ZDEnLCAnXFx1MDVkMicsICdcXHUwNWQzJywgJ1xcdTA1ZDQnLCAnXFx1MDVkNScsICdcXHUwNWQ2JywgJ1xcdTA1ZDcnLCAnXFx1MDVkOCddO1xuICBjb25zdCBoQXJyYXkxMF8xOSA9IFtcbiAgICAnXFx1MDVkOScsICdcXHUwNWQ5XFx1MDVkMCcsICdcXHUwNWQ5XFx1MDVkMScsICdcXHUwNWQ5XFx1MDVkMicsICdcXHUwNWQ5XFx1MDVkMycsICdcXHUwNWQ4XFx1MDVkNScsICdcXHUwNWQ4XFx1MDVkNicsXG4gICAgJ1xcdTA1ZDlcXHUwNWQ2JywgJ1xcdTA1ZDlcXHUwNWQ3JywgJ1xcdTA1ZDlcXHUwNWQ4J1xuICBdO1xuICBjb25zdCBoQXJyYXkyMF85MCA9IFsnJywgJycsICdcXHUwNWRiJywgJ1xcdTA1ZGMnLCAnXFx1MDVkZScsICdcXHUwNWUwJywgJ1xcdTA1ZTEnLCAnXFx1MDVlMicsICdcXHUwNWU0JywgJ1xcdTA1ZTYnXTtcbiAgY29uc3QgaEFycmF5MTAwXzkwMCA9IFtcbiAgICAnJywgJ1xcdTA1ZTcnLCAnXFx1MDVlOCcsICdcXHUwNWU5JywgJ1xcdTA1ZWEnLCAnXFx1MDVlYVxcdTA1ZTcnLCAnXFx1MDVlYVxcdTA1ZTgnLCAnXFx1MDVlYVxcdTA1ZTknLCAnXFx1MDVlYVxcdTA1ZWEnLFxuICAgICdcXHUwNWVhXFx1MDVlYVxcdTA1ZTcnXG4gIF07XG4gIGNvbnN0IGhBcnJheTEwMDBfOTAwMCA9IFtcbiAgICAnJywgJ1xcdTA1ZDAnLCAnXFx1MDVkMScsICdcXHUwNWQxXFx1MDVkMCcsICdcXHUwNWQxXFx1MDVkMScsICdcXHUwNWQ0JywgJ1xcdTA1ZDRcXHUwNWQwJywgJ1xcdTA1ZDRcXHUwNWQxJyxcbiAgICAnXFx1MDVkNFxcdTA1ZDFcXHUwNWQwJywgJ1xcdTA1ZDRcXHUwNWQxXFx1MDVkMSdcbiAgXTtcbiAgY29uc3QgZ2VyZXNoID0gJ1xcdTA1ZjMnLCBnZXJzaGFpbSA9ICdcXHUwNWY0JztcbiAgbGV0IG1lbSA9IDA7XG4gIGxldCByZXN1bHQgPSBbXTtcbiAgbGV0IHN0ZXAgPSAwO1xuICB3aGlsZSAobnVtZXJhbHMgPiAwKSB7XG4gICAgbGV0IG0gPSBudW1lcmFscyAlIDEwO1xuICAgIGlmIChzdGVwID09PSAwKSB7XG4gICAgICBtZW0gPSBtO1xuICAgIH0gZWxzZSBpZiAoc3RlcCA9PT0gMSkge1xuICAgICAgaWYgKG0gIT09IDEpIHtcbiAgICAgICAgcmVzdWx0LnVuc2hpZnQoaEFycmF5MjBfOTBbbV0sIGhBcnJheTBfOVttZW1dKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdC51bnNoaWZ0KGhBcnJheTEwXzE5W21lbV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3RlcCA9PT0gMikge1xuICAgICAgcmVzdWx0LnVuc2hpZnQoaEFycmF5MTAwXzkwMFttXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChtICE9PSA1KSB7XG4gICAgICAgIHJlc3VsdC51bnNoaWZ0KGhBcnJheTEwMDBfOTAwMFttXSwgZ2VyZXNoLCAnICcpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIG51bWVyYWxzID0gTWF0aC5mbG9vcihudW1lcmFscyAvIDEwKTtcbiAgICBpZiAoc3RlcCA9PT0gMCAmJiBudW1lcmFscyA9PT0gMCkge1xuICAgICAgcmVzdWx0LnVuc2hpZnQoaEFycmF5MF85W21dKTtcbiAgICB9XG4gICAgc3RlcCsrO1xuICB9XG4gIHJlc3VsdCA9IHJlc3VsdC5qb2luKCcnKS5zcGxpdCgnJyk7XG4gIGlmIChyZXN1bHQubGVuZ3RoID09PSAxKSB7XG4gICAgcmVzdWx0LnB1c2goZ2VyZXNoKTtcbiAgfSBlbHNlIGlmIChyZXN1bHQubGVuZ3RoID4gMSkge1xuICAgIHJlc3VsdC5zcGxpY2UocmVzdWx0Lmxlbmd0aCAtIDEsIDAsIGdlcnNoYWltKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xufVxuIiwiaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuLi9uZ2ItZGF0ZSc7XG5pbXBvcnQge2Zyb21KU0RhdGUsIE5nYkNhbGVuZGFyLCBOZ2JQZXJpb2QsIHRvSlNEYXRlfSBmcm9tICcuLi9uZ2ItY2FsZW5kYXInO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNOdW1iZXJ9IGZyb20gJy4uLy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQge1xuICBmcm9tR3JlZ29yaWFuLFxuICBnZXREYXlOdW1iZXJJbkhlYnJld1llYXIsXG4gIGdldERheXNJbkhlYnJld01vbnRoLFxuICBpc0hlYnJld0xlYXBZZWFyLFxuICB0b0dyZWdvcmlhbixcbiAgc2V0SGVicmV3RGF5LFxuICBzZXRIZWJyZXdNb250aFxufSBmcm9tICcuL2hlYnJldyc7XG5cbi8qKlxuICogQHNpbmNlIDMuMi4wXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JDYWxlbmRhckhlYnJldyBleHRlbmRzIE5nYkNhbGVuZGFyIHtcbiAgZ2V0RGF5c1BlcldlZWsoKSB7IHJldHVybiA3OyB9XG5cbiAgZ2V0TW9udGhzKHllYXI/OiBudW1iZXIpIHtcbiAgICBpZiAoeWVhciAmJiBpc0hlYnJld0xlYXBZZWFyKHllYXIpKSB7XG4gICAgICByZXR1cm4gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyXTtcbiAgICB9XG4gIH1cblxuICBnZXRXZWVrc1Blck1vbnRoKCkgeyByZXR1cm4gNjsgfVxuXG4gIGlzVmFsaWQoZGF0ZTogTmdiRGF0ZSk6IGJvb2xlYW4ge1xuICAgIGxldCBiID0gZGF0ZSAmJiBpc051bWJlcihkYXRlLnllYXIpICYmIGlzTnVtYmVyKGRhdGUubW9udGgpICYmIGlzTnVtYmVyKGRhdGUuZGF5KTtcbiAgICBiID0gYiAmJiBkYXRlLm1vbnRoID4gMCAmJiBkYXRlLm1vbnRoIDw9IChpc0hlYnJld0xlYXBZZWFyKGRhdGUueWVhcikgPyAxMyA6IDEyKTtcbiAgICBiID0gYiAmJiBkYXRlLmRheSA+IDAgJiYgZGF0ZS5kYXkgPD0gZ2V0RGF5c0luSGVicmV3TW9udGgoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcbiAgICByZXR1cm4gYiAmJiAhaXNOYU4odG9HcmVnb3JpYW4oZGF0ZSkuZ2V0VGltZSgpKTtcbiAgfVxuXG4gIGdldE5leHQoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kOiBOZ2JQZXJpb2QgPSAnZCcsIG51bWJlciA9IDEpIHtcbiAgICBkYXRlID0gbmV3IE5nYkRhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoLCBkYXRlLmRheSk7XG5cbiAgICBzd2l0Y2ggKHBlcmlvZCkge1xuICAgICAgY2FzZSAneSc6XG4gICAgICAgIGRhdGUueWVhciArPSBudW1iZXI7XG4gICAgICAgIGRhdGUubW9udGggPSAxO1xuICAgICAgICBkYXRlLmRheSA9IDE7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgY2FzZSAnbSc6XG4gICAgICAgIGRhdGUgPSBzZXRIZWJyZXdNb250aChkYXRlLCBudW1iZXIpO1xuICAgICAgICBkYXRlLmRheSA9IDE7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgY2FzZSAnZCc6XG4gICAgICAgIHJldHVybiBzZXRIZWJyZXdEYXkoZGF0ZSwgbnVtYmVyKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgfVxuXG4gIGdldFByZXYoZGF0ZTogTmdiRGF0ZSwgcGVyaW9kOiBOZ2JQZXJpb2QgPSAnZCcsIG51bWJlciA9IDEpIHsgcmV0dXJuIHRoaXMuZ2V0TmV4dChkYXRlLCBwZXJpb2QsIC1udW1iZXIpOyB9XG5cbiAgZ2V0V2Vla2RheShkYXRlOiBOZ2JEYXRlKSB7XG4gICAgY29uc3QgZGF5ID0gdG9HcmVnb3JpYW4oZGF0ZSkuZ2V0RGF5KCk7XG4gICAgLy8gaW4gSlMgRGF0ZSBTdW49MCwgaW4gSVNPIDg2MDEgU3VuPTdcbiAgICByZXR1cm4gZGF5ID09PSAwID8gNyA6IGRheTtcbiAgfVxuXG4gIGdldFdlZWtOdW1iZXIod2VlazogTmdiRGF0ZVtdLCBmaXJzdERheU9mV2VlazogbnVtYmVyKSB7XG4gICAgY29uc3QgZGF0ZSA9IHdlZWtbd2Vlay5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4gTWF0aC5jZWlsKGdldERheU51bWJlckluSGVicmV3WWVhcihkYXRlKSAvIDcpO1xuICB9XG5cbiAgZ2V0VG9kYXkoKTogTmdiRGF0ZSB7IHJldHVybiBmcm9tR3JlZ29yaWFuKG5ldyBEYXRlKCkpOyB9XG5cbiAgLyoqXG4gICAqIEBzaW5jZSAzLjQuMFxuICAgKi9cbiAgdG9HcmVnb3JpYW4oZGF0ZTogTmdiRGF0ZSk6IE5nYkRhdGUgeyByZXR1cm4gZnJvbUpTRGF0ZSh0b0dyZWdvcmlhbihkYXRlKSk7IH1cblxuICAvKipcbiAgICogQHNpbmNlIDMuNC4wXG4gICAqL1xuICBmcm9tR3JlZ29yaWFuKGRhdGU6IE5nYkRhdGUpOiBOZ2JEYXRlIHsgcmV0dXJuIGZyb21HcmVnb3JpYW4odG9KU0RhdGUoZGF0ZSkpOyB9XG59XG4iLCJpbXBvcnQge05nYkRhdGVwaWNrZXJJMThufSBmcm9tICcuLi9kYXRlcGlja2VyLWkxOG4nO1xuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuLi8uLi9pbmRleCc7XG5pbXBvcnQge2hlYnJld051bWVyYWxzLCBpc0hlYnJld0xlYXBZZWFyfSBmcm9tICcuL2hlYnJldyc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbmNvbnN0IFdFRUtEQVlTID0gWyfDl8Kpw5fCoMOXwpknLCAnw5fCqcOXwpzDl8KZw5fCqcOXwpknLCAnw5fCqMOXwpHDl8KZw5fCosOXwpknLCAnw5fCl8OXwp7Dl8KZw5fCqcOXwpknLCAnw5fCqcOXwpnDl8Kpw5fCmScsICfDl8Kpw5fCkcOXwqonLCAnw5fCqMOXwpDDl8Kpw5fClcOXwp8nXTtcbmNvbnN0IE1PTlRIUyA9IFsnw5fCqsOXwqnDl8Kow5fCmScsICfDl8KXw5fCqcOXwpXDl8KfJywgJ8OXwpvDl8Khw5fCnMOXwpUnLCAnw5fCmMOXwpHDl8KqJywgJ8OXwqnDl8KRw5fCmCcsICfDl8KQw5fCk8OXwqgnLCAnw5fCoMOXwpnDl8Khw5fCnycsICfDl8KQw5fCmcOXwpnDl8KoJywgJ8OXwqHDl8KZw5fClcOXwp8nLCAnw5fCqsOXwp7Dl8KVw5fClicsICfDl8KQw5fCkScsICfDl8KQw5fCnMOXwpXDl8KcJ107XG5jb25zdCBNT05USFNfTEVBUCA9XG4gICAgWyfDl8Kqw5fCqcOXwqjDl8KZJywgJ8OXwpfDl8Kpw5fClcOXwp8nLCAnw5fCm8OXwqHDl8Kcw5fClScsICfDl8KYw5fCkcOXwqonLCAnw5fCqcOXwpHDl8KYJywgJ8OXwpDDl8KTw5fCqCDDl8KQw5fCsycsICfDl8KQw5fCk8OXwqggw5fCkcOXwrMnLCAnw5fCoMOXwpnDl8Khw5fCnycsICfDl8KQw5fCmcOXwpnDl8KoJywgJ8OXwqHDl8KZw5fClcOXwp8nLCAnw5fCqsOXwp7Dl8KVw5fClicsICfDl8KQw5fCkScsICfDl8KQw5fCnMOXwpXDl8KcJ107XG5cbi8qKlxuICogQHNpbmNlIDMuMi4wXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VySTE4bkhlYnJldyBleHRlbmRzIE5nYkRhdGVwaWNrZXJJMThuIHtcbiAgZ2V0TW9udGhTaG9ydE5hbWUobW9udGg6IG51bWJlciwgeWVhcj86IG51bWJlcik6IHN0cmluZyB7IHJldHVybiB0aGlzLmdldE1vbnRoRnVsbE5hbWUobW9udGgsIHllYXIpOyB9XG5cbiAgZ2V0TW9udGhGdWxsTmFtZShtb250aDogbnVtYmVyLCB5ZWFyPzogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXNIZWJyZXdMZWFwWWVhcih5ZWFyKSA/IE1PTlRIU19MRUFQW21vbnRoIC0gMV0gOiBNT05USFNbbW9udGggLSAxXTtcbiAgfVxuXG4gIGdldFdlZWtkYXlTaG9ydE5hbWUod2Vla2RheTogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIFdFRUtEQVlTW3dlZWtkYXkgLSAxXTsgfVxuXG4gIGdldERheUFyaWFMYWJlbChkYXRlOiBOZ2JEYXRlU3RydWN0KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7aGVicmV3TnVtZXJhbHMoZGF0ZS5kYXkpfSAke3RoaXMuZ2V0TW9udGhGdWxsTmFtZShkYXRlLm1vbnRoLCBkYXRlLnllYXIpfSAke2hlYnJld051bWVyYWxzKGRhdGUueWVhcil9YDtcbiAgfVxuXG4gIGdldERheU51bWVyYWxzKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBzdHJpbmcgeyByZXR1cm4gaGVicmV3TnVtZXJhbHMoZGF0ZS5kYXkpOyB9XG5cbiAgZ2V0V2Vla051bWVyYWxzKHdlZWtOdW1iZXI6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiBoZWJyZXdOdW1lcmFscyh3ZWVrTnVtYmVyKTsgfVxuXG4gIGdldFllYXJOdW1lcmFscyh5ZWFyOiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gaGVicmV3TnVtZXJhbHMoeWVhcik7IH1cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYkRhdGVBZGFwdGVyfSBmcm9tICcuL25nYi1kYXRlLWFkYXB0ZXInO1xuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuaW1wb3J0IHtpc0ludGVnZXJ9IGZyb20gJy4uLy4uL3V0aWwvdXRpbCc7XG5cbi8qKlxuKiBOZ2JEYXRlQWRhcHRlciBpbXBsZW1lbnRhdGlvbiB0aGF0IGFsbG93cyB1c2luZyBuYXRpdmUgamF2YXNjcmlwdCBkYXRlIGFzIGEgdXNlciBkYXRlIG1vZGVsLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiRGF0ZU5hdGl2ZUFkYXB0ZXIgZXh0ZW5kcyBOZ2JEYXRlQWRhcHRlcjxEYXRlPiB7XG4gIC8qKlxuICAgKiBDb252ZXJ0cyBuYXRpdmUgZGF0ZSB0byBhIE5nYkRhdGVTdHJ1Y3RcbiAgICovXG4gIGZyb21Nb2RlbChkYXRlOiBEYXRlKTogTmdiRGF0ZVN0cnVjdCB7XG4gICAgcmV0dXJuIChkYXRlIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSA/IHRoaXMuX2Zyb21OYXRpdmVEYXRlKGRhdGUpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIE5nYkRhdGVTdHJ1Y3QgdG8gYSBuYXRpdmUgZGF0ZVxuICAgKi9cbiAgdG9Nb2RlbChkYXRlOiBOZ2JEYXRlU3RydWN0KTogRGF0ZSB7XG4gICAgcmV0dXJuIGRhdGUgJiYgaXNJbnRlZ2VyKGRhdGUueWVhcikgJiYgaXNJbnRlZ2VyKGRhdGUubW9udGgpICYmIGlzSW50ZWdlcihkYXRlLmRheSkgPyB0aGlzLl90b05hdGl2ZURhdGUoZGF0ZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfZnJvbU5hdGl2ZURhdGUoZGF0ZTogRGF0ZSk6IE5nYkRhdGVTdHJ1Y3Qge1xuICAgIHJldHVybiB7eWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLCBtb250aDogZGF0ZS5nZXRNb250aCgpICsgMSwgZGF5OiBkYXRlLmdldERhdGUoKX07XG4gIH1cblxuICBwcm90ZWN0ZWQgX3RvTmF0aXZlRGF0ZShkYXRlOiBOZ2JEYXRlU3RydWN0KTogRGF0ZSB7XG4gICAgY29uc3QganNEYXRlID0gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoIC0gMSwgZGF0ZS5kYXksIDEyKTtcbiAgICAvLyBhdm9pZCAzMCAtPiAxOTMwIGNvbnZlcnNpb25cbiAgICBqc0RhdGUuc2V0RnVsbFllYXIoZGF0ZS55ZWFyKTtcbiAgICByZXR1cm4ganNEYXRlO1xuICB9XG59XG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuLi9uZ2ItZGF0ZS1zdHJ1Y3QnO1xuaW1wb3J0IHtOZ2JEYXRlTmF0aXZlQWRhcHRlcn0gZnJvbSAnLi9uZ2ItZGF0ZS1uYXRpdmUtYWRhcHRlcic7XG5cbi8qKlxuICogTmdiRGF0ZUFkYXB0ZXIgaW1wbGVtZW50YXRpb24gdGhhdCBhbGxvd3MgdXNpbmcgbmF0aXZlIGphdmFzY3JpcHQgVVRDIGRhdGUgYXMgYSB1c2VyIGRhdGUgbW9kZWwuXG4gKiBTYW1lIGFzIE5nYkRhdGVOYXRpdmVBZGFwdGVyLCBidXQgdXNlcyBVVEMgZGF0ZXMuXG4gKlxuICogQHNpbmNlIDMuMi4wXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlTmF0aXZlVVRDQWRhcHRlciBleHRlbmRzIE5nYkRhdGVOYXRpdmVBZGFwdGVyIHtcbiAgcHJvdGVjdGVkIF9mcm9tTmF0aXZlRGF0ZShkYXRlOiBEYXRlKTogTmdiRGF0ZVN0cnVjdCB7XG4gICAgcmV0dXJuIHt5ZWFyOiBkYXRlLmdldFVUQ0Z1bGxZZWFyKCksIG1vbnRoOiBkYXRlLmdldFVUQ01vbnRoKCkgKyAxLCBkYXk6IGRhdGUuZ2V0VVRDRGF0ZSgpfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdG9OYXRpdmVEYXRlKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBEYXRlIHtcbiAgICBjb25zdCBqc0RhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQyhkYXRlLnllYXIsIGRhdGUubW9udGggLSAxLCBkYXRlLmRheSkpO1xuICAgIC8vIGF2b2lkIDMwIC0+IDE5MzAgY29udmVyc2lvblxuICAgIGpzRGF0ZS5zZXRVVENGdWxsWWVhcihkYXRlLnllYXIpO1xuICAgIHJldHVybiBqc0RhdGU7XG4gIH1cbn1cbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJ9IGZyb20gJy4vZGF0ZXBpY2tlcic7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJNb250aFZpZXd9IGZyb20gJy4vZGF0ZXBpY2tlci1tb250aC12aWV3JztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlck5hdmlnYXRpb259IGZyb20gJy4vZGF0ZXBpY2tlci1uYXZpZ2F0aW9uJztcbmltcG9ydCB7TmdiSW5wdXREYXRlcGlja2VyfSBmcm9tICcuL2RhdGVwaWNrZXItaW5wdXQnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VyRGF5Vmlld30gZnJvbSAnLi9kYXRlcGlja2VyLWRheS12aWV3JztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlck5hdmlnYXRpb25TZWxlY3R9IGZyb20gJy4vZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdCc7XG5cbmV4cG9ydCB7TmdiRGF0ZXBpY2tlciwgTmdiRGF0ZXBpY2tlck5hdmlnYXRlRXZlbnR9IGZyb20gJy4vZGF0ZXBpY2tlcic7XG5leHBvcnQge05nYklucHV0RGF0ZXBpY2tlcn0gZnJvbSAnLi9kYXRlcGlja2VyLWlucHV0JztcbmV4cG9ydCB7TmdiQ2FsZW5kYXIsIE5nYlBlcmlvZCwgTmdiQ2FsZW5kYXJHcmVnb3JpYW59IGZyb20gJy4vbmdiLWNhbGVuZGFyJztcbmV4cG9ydCB7TmdiQ2FsZW5kYXJJc2xhbWljQ2l2aWx9IGZyb20gJy4vaGlqcmkvbmdiLWNhbGVuZGFyLWlzbGFtaWMtY2l2aWwnO1xuZXhwb3J0IHtOZ2JDYWxlbmRhcklzbGFtaWNVbWFscXVyYX0gZnJvbSAnLi9oaWpyaS9uZ2ItY2FsZW5kYXItaXNsYW1pYy11bWFscXVyYSc7XG5leHBvcnQge05nYkNhbGVuZGFyUGVyc2lhbn0gZnJvbSAnLi9qYWxhbGkvbmdiLWNhbGVuZGFyLXBlcnNpYW4nO1xuZXhwb3J0IHtOZ2JDYWxlbmRhckhlYnJld30gZnJvbSAnLi9oZWJyZXcvbmdiLWNhbGVuZGFyLWhlYnJldyc7XG5leHBvcnQge05nYkRhdGVwaWNrZXJJMThuSGVicmV3fSBmcm9tICcuL2hlYnJldy9kYXRlcGlja2VyLWkxOG4taGVicmV3JztcbmV4cG9ydCB7TmdiRGF0ZXBpY2tlck1vbnRoVmlld30gZnJvbSAnLi9kYXRlcGlja2VyLW1vbnRoLXZpZXcnO1xuZXhwb3J0IHtOZ2JEYXRlcGlja2VyRGF5Vmlld30gZnJvbSAnLi9kYXRlcGlja2VyLWRheS12aWV3JztcbmV4cG9ydCB7TmdiRGF0ZXBpY2tlck5hdmlnYXRpb259IGZyb20gJy4vZGF0ZXBpY2tlci1uYXZpZ2F0aW9uJztcbmV4cG9ydCB7TmdiRGF0ZXBpY2tlck5hdmlnYXRpb25TZWxlY3R9IGZyb20gJy4vZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXNlbGVjdCc7XG5leHBvcnQge05nYkRhdGVwaWNrZXJDb25maWd9IGZyb20gJy4vZGF0ZXBpY2tlci1jb25maWcnO1xuZXhwb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xuZXhwb3J0IHtOZ2JEYXRlU3RydWN0fSBmcm9tICcuL25nYi1kYXRlLXN0cnVjdCc7XG5leHBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xuZXhwb3J0IHtOZ2JEYXRlQWRhcHRlcn0gZnJvbSAnLi9hZGFwdGVycy9uZ2ItZGF0ZS1hZGFwdGVyJztcbmV4cG9ydCB7TmdiRGF0ZU5hdGl2ZUFkYXB0ZXJ9IGZyb20gJy4vYWRhcHRlcnMvbmdiLWRhdGUtbmF0aXZlLWFkYXB0ZXInO1xuZXhwb3J0IHtOZ2JEYXRlTmF0aXZlVVRDQWRhcHRlcn0gZnJvbSAnLi9hZGFwdGVycy9uZ2ItZGF0ZS1uYXRpdmUtdXRjLWFkYXB0ZXInO1xuZXhwb3J0IHtOZ2JEYXRlUGFyc2VyRm9ybWF0dGVyfSBmcm9tICcuL25nYi1kYXRlLXBhcnNlci1mb3JtYXR0ZXInO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOZ2JEYXRlcGlja2VyLCBOZ2JEYXRlcGlja2VyTW9udGhWaWV3LCBOZ2JEYXRlcGlja2VyTmF2aWdhdGlvbiwgTmdiRGF0ZXBpY2tlck5hdmlnYXRpb25TZWxlY3QsIE5nYkRhdGVwaWNrZXJEYXlWaWV3LFxuICAgIE5nYklucHV0RGF0ZXBpY2tlclxuICBdLFxuICBleHBvcnRzOiBbTmdiRGF0ZXBpY2tlciwgTmdiSW5wdXREYXRlcGlja2VyXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGVdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ2JEYXRlcGlja2VyXVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyTW9kdWxlIHtcbiAgLyoqXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxuICAgKi9cbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYkRhdGVwaWNrZXJNb2R1bGV9OyB9XG59XG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtQbGFjZW1lbnRBcnJheX0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiRHJvcGRvd24gZGlyZWN0aXZlLlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIGRyb3Bkb3ducyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25Db25maWcge1xuICBhdXRvQ2xvc2U6IGJvb2xlYW4gfCAnb3V0c2lkZScgfCAnaW5zaWRlJyA9IHRydWU7XG4gIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSBbJ2JvdHRvbS1sZWZ0JywgJ2JvdHRvbS1yaWdodCcsICd0b3AtbGVmdCcsICd0b3AtcmlnaHQnXTtcbiAgY29udGFpbmVyOiBudWxsIHwgJ2JvZHknO1xufVxuIiwiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbnRlbnRDaGlsZCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1N1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7UGxhY2VtZW50LCBQbGFjZW1lbnRBcnJheSwgcG9zaXRpb25FbGVtZW50c30gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XG5pbXBvcnQge25nYkF1dG9DbG9zZX0gZnJvbSAnLi4vdXRpbC9hdXRvY2xvc2UnO1xuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcblxuaW1wb3J0IHtOZ2JEcm9wZG93bkNvbmZpZ30gZnJvbSAnLi9kcm9wZG93bi1jb25maWcnO1xuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHlvdSBzaG91bGQgcHV0IHB1dCBvbiBhIGRyb3Bkb3duIGl0ZW0gdG8gZW5hYmxlIGtleWJvYXJkIG5hdmlnYXRpb24uXG4gKiBLZXlib2FyZCBuYXZpZ2F0aW9uIHVzaW5nIGFycm93IGtleXMgd2lsbCBtb3ZlIGZvY3VzIGJldHdlZW4gaXRlbXMgbWFya2VkIHdpdGggdGhpcyBkaXJlY3RpdmUuXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nYkRyb3Bkb3duSXRlbV0nLCBob3N0OiB7J2NsYXNzJzogJ2Ryb3Bkb3duLWl0ZW0nLCAnW2NsYXNzLmRpc2FibGVkXSc6ICdkaXNhYmxlZCd9fSlcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93bkl0ZW0ge1xuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gPGFueT52YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09IHRydWU7ICAvLyBhY2NlcHQgYW4gZW1wdHkgYXR0cmlidXRlIGFzIHRydWVcbiAgfVxuXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7fVxufVxuXG4vKipcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nYkRyb3Bkb3duTWVudV0nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kcm9wZG93bi1tZW51XSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLnNob3ddJzogJ2Ryb3Bkb3duLmlzT3BlbigpJyxcbiAgICAnW2F0dHIueC1wbGFjZW1lbnRdJzogJ3BsYWNlbWVudCcsXG4gICAgJyhrZXlkb3duLkFycm93VXApJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcbiAgICAnKGtleWRvd24uQXJyb3dEb3duKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG4gICAgJyhrZXlkb3duLkhvbWUpJzogJ2Ryb3Bkb3duLm9uS2V5RG93bigkZXZlbnQpJyxcbiAgICAnKGtleWRvd24uRW5kKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93bk1lbnUge1xuICBwbGFjZW1lbnQ6IFBsYWNlbWVudCA9ICdib3R0b20nO1xuICBpc09wZW4gPSBmYWxzZTtcblxuICBAQ29udGVudENoaWxkcmVuKE5nYkRyb3Bkb3duSXRlbSkgbWVudUl0ZW1zOiBRdWVyeUxpc3Q8TmdiRHJvcGRvd25JdGVtPjtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd24pKSBwdWJsaWMgZHJvcGRvd24pIHt9XG59XG5cbi8qKlxuICogTWFya3MgYW4gZWxlbWVudCB0byB3aGljaCBkcm9wZG93biBtZW51IHdpbGwgYmUgYW5jaG9yZWQuIFRoaXMgaXMgYSBzaW1wbGUgdmVyc2lvblxuICogb2YgdGhlIE5nYkRyb3Bkb3duVG9nZ2xlIGRpcmVjdGl2ZS4gSXQgcGxheXMgdGhlIHNhbWUgcm9sZSBhcyBOZ2JEcm9wZG93blRvZ2dsZSBidXRcbiAqIGRvZXNuJ3QgbGlzdGVuIHRvIGNsaWNrIGV2ZW50cyB0byB0b2dnbGUgZHJvcGRvd24gbWVudSB0aHVzIGVuYWJsaW5nIHN1cHBvcnQgZm9yXG4gKiBldmVudHMgb3RoZXIgdGhhbiBjbGljay5cbiAqXG4gKiBAc2luY2UgMS4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nYkRyb3Bkb3duQW5jaG9yXScsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnZHJvcGRvd24tdG9nZ2xlJywgJ2FyaWEtaGFzcG9wdXAnOiAndHJ1ZScsICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdkcm9wZG93bi5pc09wZW4oKSd9XG59KVxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duQW5jaG9yIHtcbiAgYW5jaG9yRWw7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE5nYkRyb3Bkb3duKSkgcHVibGljIGRyb3Bkb3duLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIHRoaXMuYW5jaG9yRWwgPSBfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgZ2V0TmF0aXZlRWxlbWVudCgpIHsgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDsgfVxufVxuXG4vKipcbiAqIEFsbG93cyB0aGUgZHJvcGRvd24gdG8gYmUgdG9nZ2xlZCB2aWEgY2xpY2suIFRoaXMgZGlyZWN0aXZlIGlzIG9wdGlvbmFsOiB5b3UgY2FuIHVzZSBOZ2JEcm9wZG93bkFuY2hvciBhcyBhblxuICogYWx0ZXJuYXRpdmUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ2JEcm9wZG93blRvZ2dsZV0nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ2Ryb3Bkb3duLXRvZ2dsZScsXG4gICAgJ2FyaWEtaGFzcG9wdXAnOiAndHJ1ZScsXG4gICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2Ryb3Bkb3duLmlzT3BlbigpJyxcbiAgICAnKGNsaWNrKSc6ICd0b2dnbGVPcGVuKCknLFxuICAgICcoa2V5ZG93bi5BcnJvd1VwKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG4gICAgJyhrZXlkb3duLkFycm93RG93biknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknLFxuICAgICcoa2V5ZG93bi5Ib21lKSc6ICdkcm9wZG93bi5vbktleURvd24oJGV2ZW50KScsXG4gICAgJyhrZXlkb3duLkVuZCknOiAnZHJvcGRvd24ub25LZXlEb3duKCRldmVudCknXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBOZ2JEcm9wZG93bkFuY2hvciwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiRHJvcGRvd25Ub2dnbGUpfV1cbn0pXG5leHBvcnQgY2xhc3MgTmdiRHJvcGRvd25Ub2dnbGUgZXh0ZW5kcyBOZ2JEcm9wZG93bkFuY2hvciB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ2JEcm9wZG93bikpIGRyb3Bkb3duLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIHN1cGVyKGRyb3Bkb3duLCBlbGVtZW50UmVmKTtcbiAgfVxuXG4gIHRvZ2dsZU9wZW4oKSB7IHRoaXMuZHJvcGRvd24udG9nZ2xlKCk7IH1cbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGEgbm9kZSBpbnRvIGEgZHJvcGRvd24uXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nYkRyb3Bkb3duXScsIGV4cG9ydEFzOiAnbmdiRHJvcGRvd24nLCBob3N0OiB7J1tjbGFzcy5zaG93XSc6ICdpc09wZW4oKSd9fSlcbmV4cG9ydCBjbGFzcyBOZ2JEcm9wZG93biBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfY2xvc2VkJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgX3pvbmVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfYm9keUNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG5cbiAgQENvbnRlbnRDaGlsZChOZ2JEcm9wZG93bk1lbnUpIHByaXZhdGUgX21lbnU6IE5nYkRyb3Bkb3duTWVudTtcbiAgQENvbnRlbnRDaGlsZChOZ2JEcm9wZG93bk1lbnUsIHtyZWFkOiBFbGVtZW50UmVmfSkgcHJpdmF0ZSBfbWVudUVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgQENvbnRlbnRDaGlsZChOZ2JEcm9wZG93bkFuY2hvcikgcHJpdmF0ZSBfYW5jaG9yOiBOZ2JEcm9wZG93bkFuY2hvcjtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHRoYXQgZHJvcGRvd24gc2hvdWxkIGJlIGNsb3NlZCB3aGVuIHNlbGVjdGluZyBvbmUgb2YgZHJvcGRvd24gaXRlbXMgKGNsaWNrKSBvciBwcmVzc2luZyBFU0MuXG4gICAqIFdoZW4gaXQgaXMgdHJ1ZSAoZGVmYXVsdCkgZHJvcGRvd25zIGFyZSBhdXRvbWF0aWNhbGx5IGNsb3NlZCBvbiBib3RoIG91dHNpZGUgYW5kIGluc2lkZSAobWVudSkgY2xpY2tzLlxuICAgKiBXaGVuIGl0IGlzIGZhbHNlIGRyb3Bkb3ducyBhcmUgbmV2ZXIgYXV0b21hdGljYWxseSBjbG9zZWQuXG4gICAqIFdoZW4gaXQgaXMgJ291dHNpZGUnIGRyb3Bkb3ducyBhcmUgYXV0b21hdGljYWxseSBjbG9zZWQgb24gb3V0c2lkZSBjbGlja3MgYnV0IG5vdCBvbiBtZW51IGNsaWNrcy5cbiAgICogV2hlbiBpdCBpcyAnaW5zaWRlJyBkcm9wZG93bnMgYXJlIGF1dG9tYXRpY2FsbHkgb24gbWVudSBjbGlja3MgYnV0IG5vdCBvbiBvdXRzaWRlIGNsaWNrcy5cbiAgICovXG4gIEBJbnB1dCgpIGF1dG9DbG9zZTogYm9vbGVhbiB8ICdvdXRzaWRlJyB8ICdpbnNpZGUnO1xuXG4gIC8qKlxuICAgKiAgRGVmaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgZHJvcGRvd24tbWVudSBpcyBvcGVuIGluaXRpYWxseS5cbiAgICovXG4gIEBJbnB1dCgnb3BlbicpIF9vcGVuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFBsYWNlbWVudCBvZiBhIHBvcG92ZXIgYWNjZXB0czpcbiAgICogICAgXCJ0b3BcIiwgXCJ0b3AtbGVmdFwiLCBcInRvcC1yaWdodFwiLCBcImJvdHRvbVwiLCBcImJvdHRvbS1sZWZ0XCIsIFwiYm90dG9tLXJpZ2h0XCIsXG4gICAqICAgIFwibGVmdFwiLCBcImxlZnQtdG9wXCIsIFwibGVmdC1ib3R0b21cIiwgXCJyaWdodFwiLCBcInJpZ2h0LXRvcFwiLCBcInJpZ2h0LWJvdHRvbVwiXG4gICAqICBhcnJheSBvciBhIHNwYWNlIHNlcGFyYXRlZCBzdHJpbmcgb2YgYWJvdmUgdmFsdWVzXG4gICAqL1xuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5O1xuXG4gIC8qKlxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIGRyb3Bkb3duIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cbiAgICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgXCJib2R5XCIuXG4gICAqXG4gICAqIEBzaW5jZSA0LjEuMFxuICAgKi9cbiAgQElucHV0KCkgY29udGFpbmVyOiBudWxsIHwgJ2JvZHknO1xuXG4gIC8qKlxuICAgKiAgQW4gZXZlbnQgZmlyZWQgd2hlbiB0aGUgZHJvcGRvd24gaXMgb3BlbmVkIG9yIGNsb3NlZC5cbiAgICogIEV2ZW50J3MgcGF5bG9hZCBlcXVhbHMgd2hldGhlciBkcm9wZG93biBpcyBvcGVuLlxuICAgKi9cbiAgQE91dHB1dCgpIG9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGNvbmZpZzogTmdiRHJvcGRvd25Db25maWcsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXG4gICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLnBsYWNlbWVudCA9IGNvbmZpZy5wbGFjZW1lbnQ7XG4gICAgdGhpcy5jb250YWluZXIgPSBjb25maWcuY29udGFpbmVyO1xuICAgIHRoaXMuYXV0b0Nsb3NlID0gY29uZmlnLmF1dG9DbG9zZTtcbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gX25nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4geyB0aGlzLl9wb3NpdGlvbk1lbnUoKTsgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9hcHBseVBsYWNlbWVudENsYXNzZXMoKTtcbiAgICBpZiAodGhpcy5fb3Blbikge1xuICAgICAgdGhpcy5fc2V0Q2xvc2VIYW5kbGVycygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5jb250YWluZXIgJiYgdGhpcy5fb3Blbikge1xuICAgICAgdGhpcy5fYXBwbHlDb250YWluZXIodGhpcy5jb250YWluZXIpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLnBsYWNlbWVudCAmJiAhY2hhbmdlcy5wbGFjZW1lbnQuaXNGaXJzdENoYW5nZSkge1xuICAgICAgdGhpcy5fYXBwbHlQbGFjZW1lbnRDbGFzc2VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgZHJvcGRvd24gbWVudSBpcyBvcGVuIG9yIG5vdC5cbiAgICovXG4gIGlzT3BlbigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX29wZW47IH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIGRyb3Bkb3duIG1lbnUgb2YgYSBnaXZlbiBuYXZiYXIgb3IgdGFiYmVkIG5hdmlnYXRpb24uXG4gICAqL1xuICBvcGVuKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fb3Blbikge1xuICAgICAgdGhpcy5fb3BlbiA9IHRydWU7XG4gICAgICB0aGlzLl9hcHBseUNvbnRhaW5lcih0aGlzLmNvbnRhaW5lcik7XG4gICAgICB0aGlzLm9wZW5DaGFuZ2UuZW1pdCh0cnVlKTtcbiAgICAgIHRoaXMuX3NldENsb3NlSGFuZGxlcnMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZXRDbG9zZUhhbmRsZXJzKCkge1xuICAgIG5nYkF1dG9DbG9zZShcbiAgICAgICAgdGhpcy5fbmdab25lLCB0aGlzLl9kb2N1bWVudCwgdGhpcy5hdXRvQ2xvc2UsICgpID0+IHRoaXMuY2xvc2UoKSwgdGhpcy5fY2xvc2VkJCxcbiAgICAgICAgdGhpcy5fbWVudSA/IFt0aGlzLl9tZW51RWxlbWVudC5uYXRpdmVFbGVtZW50XSA6IFtdLCB0aGlzLl9hbmNob3IgPyBbdGhpcy5fYW5jaG9yLmdldE5hdGl2ZUVsZW1lbnQoKV0gOiBbXSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBkcm9wZG93biBtZW51IG9mIGEgZ2l2ZW4gbmF2YmFyIG9yIHRhYmJlZCBuYXZpZ2F0aW9uLlxuICAgKi9cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX29wZW4pIHtcbiAgICAgIHRoaXMuX29wZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuX3Jlc2V0Q29udGFpbmVyKCk7XG4gICAgICB0aGlzLl9jbG9zZWQkLm5leHQoKTtcbiAgICAgIHRoaXMub3BlbkNoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSBkcm9wZG93biBtZW51IG9mIGEgZ2l2ZW4gbmF2YmFyIG9yIHRhYmJlZCBuYXZpZ2F0aW9uLlxuICAgKi9cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzT3BlbigpKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3Jlc2V0Q29udGFpbmVyKCk7XG5cbiAgICB0aGlzLl9jbG9zZWQkLm5leHQoKTtcbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBjb25zdCBpdGVtRWxlbWVudHMgPSB0aGlzLl9nZXRNZW51RWxlbWVudHMoKTtcblxuICAgIGxldCBwb3NpdGlvbiA9IC0xO1xuICAgIGxldCBpc0V2ZW50RnJvbUl0ZW1zID0gZmFsc2U7XG4gICAgY29uc3QgaXNFdmVudEZyb21Ub2dnbGUgPSB0aGlzLl9pc0V2ZW50RnJvbVRvZ2dsZShldmVudCk7XG5cbiAgICBpZiAoIWlzRXZlbnRGcm9tVG9nZ2xlKSB7XG4gICAgICBpdGVtRWxlbWVudHMuZm9yRWFjaCgoaXRlbUVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpdGVtRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgaXNFdmVudEZyb21JdGVtcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW1FbGVtZW50ID09PSB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgcG9zaXRpb24gPSBpbmRleDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGlzRXZlbnRGcm9tVG9nZ2xlIHx8IGlzRXZlbnRGcm9tSXRlbXMpIHtcbiAgICAgIGlmICghdGhpcy5pc09wZW4oKSkge1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgIH1cbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICBjYXNlIEtleS5BcnJvd0Rvd246XG4gICAgICAgICAgcG9zaXRpb24gPSBNYXRoLm1pbihwb3NpdGlvbiArIDEsIGl0ZW1FbGVtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dVcDpcbiAgICAgICAgICBpZiAodGhpcy5faXNEcm9wdXAoKSAmJiBwb3NpdGlvbiA9PT0gLTEpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaXRlbUVsZW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgcG9zaXRpb24gPSBNYXRoLm1heChwb3NpdGlvbiAtIDEsIDApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5Ib21lOlxuICAgICAgICAgIHBvc2l0aW9uID0gMDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLZXkuRW5kOlxuICAgICAgICAgIHBvc2l0aW9uID0gaXRlbUVsZW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpdGVtRWxlbWVudHNbcG9zaXRpb25dLmZvY3VzKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2lzRHJvcHVwKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZHJvcHVwJyk7IH1cblxuICBwcml2YXRlIF9pc0V2ZW50RnJvbVRvZ2dsZShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIHJldHVybiB0aGlzLl9hbmNob3IuZ2V0TmF0aXZlRWxlbWVudCgpLmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRNZW51RWxlbWVudHMoKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgaWYgKHRoaXMuX21lbnUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fbWVudS5tZW51SXRlbXMuZmlsdGVyKGl0ZW0gPT4gIWl0ZW0uZGlzYWJsZWQpLm1hcChpdGVtID0+IGl0ZW0uZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgX3Bvc2l0aW9uTWVudSgpIHtcbiAgICBpZiAodGhpcy5pc09wZW4oKSAmJiB0aGlzLl9tZW51KSB7XG4gICAgICB0aGlzLl9hcHBseVBsYWNlbWVudENsYXNzZXMoXG4gICAgICAgICAgcG9zaXRpb25FbGVtZW50cyhcbiAgICAgICAgICAgICAgdGhpcy5fYW5jaG9yLmFuY2hvckVsLCB0aGlzLl9ib2R5Q29udGFpbmVyIHx8IHRoaXMuX21lbnVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50LFxuICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVzZXRDb250YWluZXIoKSB7XG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLl9yZW5kZXJlcjtcbiAgICBpZiAodGhpcy5fbWVudUVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGRyb3Bkb3duRWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IGRyb3Bkb3duTWVudUVsZW1lbnQgPSB0aGlzLl9tZW51RWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG4gICAgICByZW5kZXJlci5hcHBlbmRDaGlsZChkcm9wZG93bkVsZW1lbnQsIGRyb3Bkb3duTWVudUVsZW1lbnQpO1xuICAgICAgcmVuZGVyZXIucmVtb3ZlU3R5bGUoZHJvcGRvd25NZW51RWxlbWVudCwgJ3Bvc2l0aW9uJyk7XG4gICAgICByZW5kZXJlci5yZW1vdmVTdHlsZShkcm9wZG93bk1lbnVFbGVtZW50LCAndHJhbnNmb3JtJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9ib2R5Q29udGFpbmVyKSB7XG4gICAgICByZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLl9kb2N1bWVudC5ib2R5LCB0aGlzLl9ib2R5Q29udGFpbmVyKTtcbiAgICAgIHRoaXMuX2JvZHlDb250YWluZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FwcGx5Q29udGFpbmVyKGNvbnRhaW5lcjogbnVsbCB8ICdib2R5JyA9IG51bGwpIHtcbiAgICB0aGlzLl9yZXNldENvbnRhaW5lcigpO1xuICAgIGlmIChjb250YWluZXIgPT09ICdib2R5Jykge1xuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLl9yZW5kZXJlcjtcbiAgICAgIGNvbnN0IGRyb3Bkb3duTWVudUVsZW1lbnQgPSB0aGlzLl9tZW51RWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgY29uc3QgYm9keUNvbnRhaW5lciA9IHRoaXMuX2JvZHlDb250YWluZXIgPSB0aGlzLl9ib2R5Q29udGFpbmVyIHx8IHJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAvLyBPdmVycmlkZSBzb21lIHN0eWxlcyB0byBoYXZlIHRoZSBwb3NpdGlvbm5pbmcgd29ya2luZ1xuICAgICAgcmVuZGVyZXIuc2V0U3R5bGUoYm9keUNvbnRhaW5lciwgJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJyk7XG4gICAgICByZW5kZXJlci5zZXRTdHlsZShkcm9wZG93bk1lbnVFbGVtZW50LCAncG9zaXRpb24nLCAnc3RhdGljJyk7XG5cbiAgICAgIHJlbmRlcmVyLmFwcGVuZENoaWxkKGJvZHlDb250YWluZXIsIGRyb3Bkb3duTWVudUVsZW1lbnQpO1xuICAgICAgcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5fZG9jdW1lbnQuYm9keSwgYm9keUNvbnRhaW5lcik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlQbGFjZW1lbnRDbGFzc2VzKHBsYWNlbWVudD86IFBsYWNlbWVudCkge1xuICAgIGlmICh0aGlzLl9tZW51KSB7XG4gICAgICBpZiAoIXBsYWNlbWVudCkge1xuICAgICAgICBwbGFjZW1lbnQgPSBBcnJheS5pc0FycmF5KHRoaXMucGxhY2VtZW50KSA/IHRoaXMucGxhY2VtZW50WzBdIDogdGhpcy5wbGFjZW1lbnQuc3BsaXQoJyAnKVswXSBhcyBQbGFjZW1lbnQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXI7XG4gICAgICBjb25zdCBkcm9wZG93bkVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIC8vIHJlbW92ZSB0aGUgY3VycmVudCBwbGFjZW1lbnQgY2xhc3Nlc1xuICAgICAgcmVuZGVyZXIucmVtb3ZlQ2xhc3MoZHJvcGRvd25FbGVtZW50LCAnZHJvcHVwJyk7XG4gICAgICByZW5kZXJlci5yZW1vdmVDbGFzcyhkcm9wZG93bkVsZW1lbnQsICdkcm9wZG93bicpO1xuICAgICAgdGhpcy5fbWVudS5wbGFjZW1lbnQgPSBwbGFjZW1lbnQ7XG5cbiAgICAgIC8qXG4gICAgICAqIGFwcGx5IHRoZSBuZXcgcGxhY2VtZW50XG4gICAgICAqIGluIGNhc2Ugb2YgdG9wIHVzZSB1cC1hcnJvdyBvciBkb3duLWFycm93IG90aGVyd2lzZVxuICAgICAgKi9cbiAgICAgIGNvbnN0IGRyb3Bkb3duQ2xhc3MgPSBwbGFjZW1lbnQuc2VhcmNoKCdedG9wJykgIT09IC0xID8gJ2Ryb3B1cCcgOiAnZHJvcGRvd24nO1xuICAgICAgcmVuZGVyZXIuYWRkQ2xhc3MoZHJvcGRvd25FbGVtZW50LCBkcm9wZG93bkNsYXNzKTtcblxuICAgICAgY29uc3QgYm9keUNvbnRhaW5lciA9IHRoaXMuX2JvZHlDb250YWluZXI7XG4gICAgICBpZiAoYm9keUNvbnRhaW5lcikge1xuICAgICAgICByZW5kZXJlci5yZW1vdmVDbGFzcyhib2R5Q29udGFpbmVyLCAnZHJvcHVwJyk7XG4gICAgICAgIHJlbmRlcmVyLnJlbW92ZUNsYXNzKGJvZHlDb250YWluZXIsICdkcm9wZG93bicpO1xuICAgICAgICByZW5kZXJlci5hZGRDbGFzcyhib2R5Q29udGFpbmVyLCBkcm9wZG93bkNsYXNzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ2JEcm9wZG93biwgTmdiRHJvcGRvd25BbmNob3IsIE5nYkRyb3Bkb3duVG9nZ2xlLCBOZ2JEcm9wZG93bk1lbnUsIE5nYkRyb3Bkb3duSXRlbX0gZnJvbSAnLi9kcm9wZG93bic7XG5cbmV4cG9ydCB7TmdiRHJvcGRvd24sIE5nYkRyb3Bkb3duQW5jaG9yLCBOZ2JEcm9wZG93blRvZ2dsZSwgTmdiRHJvcGRvd25NZW51LCBOZ2JEcm9wZG93bkl0ZW19IGZyb20gJy4vZHJvcGRvd24nO1xuZXhwb3J0IHtOZ2JEcm9wZG93bkNvbmZpZ30gZnJvbSAnLi9kcm9wZG93bi1jb25maWcnO1xuXG5jb25zdCBOR0JfRFJPUERPV05fRElSRUNUSVZFUyA9IFtOZ2JEcm9wZG93biwgTmdiRHJvcGRvd25BbmNob3IsIE5nYkRyb3Bkb3duVG9nZ2xlLCBOZ2JEcm9wZG93bk1lbnUsIE5nYkRyb3Bkb3duSXRlbV07XG5cbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBOR0JfRFJPUERPV05fRElSRUNUSVZFUywgZXhwb3J0czogTkdCX0RST1BET1dOX0RJUkVDVElWRVN9KVxuZXhwb3J0IGNsYXNzIE5nYkRyb3Bkb3duTW9kdWxlIHtcbiAgLyoqXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxuICAgKi9cbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYkRyb3Bkb3duTW9kdWxlfTsgfVxufVxuIiwiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3Rvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogUmVwcmVzZW50IG9wdGlvbnMgYXZhaWxhYmxlIHdoZW4gb3BlbmluZyBuZXcgbW9kYWwgd2luZG93cy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JNb2RhbE9wdGlvbnMge1xuICAvKipcbiAgICogU2V0cyB0aGUgYXJpYSBhdHRyaWJ1dGUgYXJpYS1sYWJlbGxlZGJ5IHRvIGEgbW9kYWwgd2luZG93LlxuICAgKlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIGFyaWFMYWJlbGxlZEJ5Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIGEgYmFja2Ryb3AgZWxlbWVudCBzaG91bGQgYmUgY3JlYXRlZCBmb3IgYSBnaXZlbiBtb2RhbCAodHJ1ZSBieSBkZWZhdWx0KS5cbiAgICogQWx0ZXJuYXRpdmVseSwgc3BlY2lmeSAnc3RhdGljJyBmb3IgYSBiYWNrZHJvcCB3aGljaCBkb2Vzbid0IGNsb3NlIHRoZSBtb2RhbCBvbiBjbGljay5cbiAgICovXG4gIGJhY2tkcm9wPzogYm9vbGVhbiB8ICdzdGF0aWMnO1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiBjYWxsZWQgd2hlbiBhIG1vZGFsIHdpbGwgYmUgZGlzbWlzc2VkLlxuICAgKiBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgZmFsc2UsIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggZmFsc2Ugb3IgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQsIHRoZSBtb2RhbCBpcyBub3RcbiAgICogZGlzbWlzc2VkLlxuICAgKi9cbiAgYmVmb3JlRGlzbWlzcz86ICgpID0+IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+O1xuXG4gIC8qKlxuICAgKiBUbyBjZW50ZXIgdGhlIG1vZGFsIHZlcnRpY2FsbHkgKGZhbHNlIGJ5IGRlZmF1bHQpLlxuICAgKlxuICAgKiBAc2luY2UgMS4xLjBcbiAgICovXG4gIGNlbnRlcmVkPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQW4gZWxlbWVudCB0byB3aGljaCB0byBhdHRhY2ggbmV3bHkgb3BlbmVkIG1vZGFsIHdpbmRvd3MuXG4gICAqL1xuICBjb250YWluZXI/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEluamVjdG9yIHRvIHVzZSBmb3IgbW9kYWwgY29udGVudC5cbiAgICovXG4gIGluamVjdG9yPzogSW5qZWN0b3I7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gY2xvc2UgdGhlIG1vZGFsIHdoZW4gZXNjYXBlIGtleSBpcyBwcmVzc2VkICh0cnVlIGJ5IGRlZmF1bHQpLlxuICAgKi9cbiAga2V5Ym9hcmQ/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTaXplIG9mIGEgbmV3IG1vZGFsIHdpbmRvdy5cbiAgICovXG4gIHNpemU/OiAnc20nIHwgJ2xnJztcblxuICAvKipcbiAgICogQ3VzdG9tIGNsYXNzIHRvIGFwcGVuZCB0byB0aGUgbW9kYWwgd2luZG93XG4gICAqL1xuICB3aW5kb3dDbGFzcz86IHN0cmluZztcblxuICAvKipcbiAgICogQ3VzdG9tIGNsYXNzIHRvIGFwcGVuZCB0byB0aGUgbW9kYWwgYmFja2Ryb3BcbiAgICpcbiAgICogQHNpbmNlIDEuMS4wXG4gICAqL1xuICBiYWNrZHJvcENsYXNzPzogc3RyaW5nO1xufVxuXG4vKipcbiogQ29uZmlndXJhdGlvbiBvYmplY3QgdG9rZW4gZm9yIHRoZSBOZ2JNb2RhbCBzZXJ2aWNlLlxuKiBZb3UgY2FuIHByb3ZpZGUgdGhpcyBjb25maWd1cmF0aW9uLCB0eXBpY2FsbHkgaW4geW91ciByb290IG1vZHVsZSBpbiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgb3B0aW9uIHZhbHVlcyBmb3IgZXZlcnlcbiogbW9kYWwuXG4qXG4qIEBzaW5jZSAzLjEuMFxuKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsQ29uZmlnIGltcGxlbWVudHMgTmdiTW9kYWxPcHRpb25zIHtcbiAgYmFja2Ryb3A6IGJvb2xlYW4gfCAnc3RhdGljJyA9IHRydWU7XG4gIGtleWJvYXJkID0gdHJ1ZTtcbn1cbiIsImltcG9ydCB7XG4gIEluamVjdG9yLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld1JlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgUmVuZGVyZXIyLFxuICBDb21wb25lbnRSZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNsYXNzIENvbnRlbnRSZWYge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbm9kZXM6IGFueVtdLCBwdWJsaWMgdmlld1JlZj86IFZpZXdSZWYsIHB1YmxpYyBjb21wb25lbnRSZWY/OiBDb21wb25lbnRSZWY8YW55Pikge31cbn1cblxuZXhwb3J0IGNsYXNzIFBvcHVwU2VydmljZTxUPiB7XG4gIHByaXZhdGUgX3dpbmRvd1JlZjogQ29tcG9uZW50UmVmPFQ+O1xuICBwcml2YXRlIF9jb250ZW50UmVmOiBDb250ZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfdHlwZTogYW55LCBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IsIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIF9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge31cblxuICBvcGVuKGNvbnRlbnQ/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+LCBjb250ZXh0PzogYW55KTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICBpZiAoIXRoaXMuX3dpbmRvd1JlZikge1xuICAgICAgdGhpcy5fY29udGVudFJlZiA9IHRoaXMuX2dldENvbnRlbnRSZWYoY29udGVudCwgY29udGV4dCk7XG4gICAgICB0aGlzLl93aW5kb3dSZWYgPSB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChcbiAgICAgICAgICB0aGlzLl9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8VD4odGhpcy5fdHlwZSksIDAsIHRoaXMuX2luamVjdG9yLFxuICAgICAgICAgIHRoaXMuX2NvbnRlbnRSZWYubm9kZXMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl93aW5kb3dSZWY7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBpZiAodGhpcy5fd2luZG93UmVmKSB7XG4gICAgICB0aGlzLl92aWV3Q29udGFpbmVyUmVmLnJlbW92ZSh0aGlzLl92aWV3Q29udGFpbmVyUmVmLmluZGV4T2YodGhpcy5fd2luZG93UmVmLmhvc3RWaWV3KSk7XG4gICAgICB0aGlzLl93aW5kb3dSZWYgPSBudWxsO1xuXG4gICAgICBpZiAodGhpcy5fY29udGVudFJlZi52aWV3UmVmKSB7XG4gICAgICAgIHRoaXMuX3ZpZXdDb250YWluZXJSZWYucmVtb3ZlKHRoaXMuX3ZpZXdDb250YWluZXJSZWYuaW5kZXhPZih0aGlzLl9jb250ZW50UmVmLnZpZXdSZWYpKTtcbiAgICAgICAgdGhpcy5fY29udGVudFJlZiA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q29udGVudFJlZihjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+LCBjb250ZXh0PzogYW55KTogQ29udGVudFJlZiB7XG4gICAgaWYgKCFjb250ZW50KSB7XG4gICAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW10pO1xuICAgIH0gZWxzZSBpZiAoY29udGVudCBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICBjb25zdCB2aWV3UmVmID0gdGhpcy5fdmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcoPFRlbXBsYXRlUmVmPFQ+PmNvbnRlbnQsIGNvbnRleHQpO1xuICAgICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFt2aWV3UmVmLnJvb3ROb2Rlc10sIHZpZXdSZWYpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW1t0aGlzLl9yZW5kZXJlci5jcmVhdGVUZXh0KGAke2NvbnRlbnR9YCldXSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge0luamVjdGFibGUsIEluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuXG5cbi8qKiBUeXBlIGZvciB0aGUgY2FsbGJhY2sgdXNlZCB0byByZXZlcnQgdGhlIHNjcm9sbGJhciBjb21wZW5zYXRpb24uICovXG5leHBvcnQgdHlwZSBDb21wZW5zYXRpb25SZXZlcnRlciA9ICgpID0+IHZvaWQ7XG5cblxuXG4vKipcbiAqIFV0aWxpdHkgdG8gaGFuZGxlIHRoZSBzY3JvbGxiYXIuXG4gKlxuICogSXQgYWxsb3dzIHRvIGNvbXBlbnNhdGUgdGhlIGxhY2sgb2YgYSB2ZXJ0aWNhbCBzY3JvbGxiYXIgYnkgYWRkaW5nIGFuXG4gKiBlcXVpdmFsZW50IHBhZGRpbmcgb24gdGhlIHJpZ2h0IG9mIHRoZSBib2R5LCBhbmQgdG8gcmVtb3ZlIHRoaXMgY29tcGVuc2F0aW9uLlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxCYXIge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55KSB7fVxuXG4gIC8qKlxuICAgKiBEZXRlY3RzIGlmIGEgc2Nyb2xsYmFyIGlzIHByZXNlbnQgYW5kIGlmIHllcywgYWxyZWFkeSBjb21wZW5zYXRlcyBmb3IgaXRzXG4gICAqIHJlbW92YWwgYnkgYWRkaW5nIGFuIGVxdWl2YWxlbnQgcGFkZGluZyBvbiB0aGUgcmlnaHQgb2YgdGhlIGJvZHkuXG4gICAqXG4gICAqIEByZXR1cm4gYSBjYWxsYmFjayB1c2VkIHRvIHJldmVydCB0aGUgY29tcGVuc2F0aW9uIChub29wIGlmIHRoZXJlIHdhcyBub25lLFxuICAgKiBvdGhlcndpc2UgYSBmdW5jdGlvbiByZW1vdmluZyB0aGUgcGFkZGluZylcbiAgICovXG4gIGNvbXBlbnNhdGUoKTogQ29tcGVuc2F0aW9uUmV2ZXJ0ZXIgeyByZXR1cm4gIXRoaXMuX2lzUHJlc2VudCgpID8gbm9vcCA6IHRoaXMuX2FkanVzdEJvZHkodGhpcy5fZ2V0V2lkdGgoKSk7IH1cblxuICAvKipcbiAgICogQWRkcyBhIHBhZGRpbmcgb2YgdGhlIGdpdmVuIHdpZHRoIG9uIHRoZSByaWdodCBvZiB0aGUgYm9keS5cbiAgICpcbiAgICogQHJldHVybiBhIGNhbGxiYWNrIHVzZWQgdG8gcmV2ZXJ0IHRoZSBwYWRkaW5nIHRvIGl0cyBwcmV2aW91cyB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSBfYWRqdXN0Qm9keSh3aWR0aDogbnVtYmVyKTogQ29tcGVuc2F0aW9uUmV2ZXJ0ZXIge1xuICAgIGNvbnN0IGJvZHkgPSB0aGlzLl9kb2N1bWVudC5ib2R5O1xuICAgIGNvbnN0IHVzZXJTZXRQYWRkaW5nID0gYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ7XG4gICAgY29uc3QgcGFkZGluZ0Ftb3VudCA9IHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoYm9keSlbJ3BhZGRpbmctcmlnaHQnXSk7XG4gICAgYm9keS5zdHlsZVsncGFkZGluZy1yaWdodCddID0gYCR7cGFkZGluZ0Ftb3VudCArIHdpZHRofXB4YDtcbiAgICByZXR1cm4gKCkgPT4gYm9keS5zdHlsZVsncGFkZGluZy1yaWdodCddID0gdXNlclNldFBhZGRpbmc7XG4gIH1cblxuICAvKipcbiAgICogVGVsbHMgd2hldGhlciBhIHNjcm9sbGJhciBpcyBjdXJyZW50bHkgcHJlc2VudCBvbiB0aGUgYm9keS5cbiAgICpcbiAgICogQHJldHVybiB0cnVlIGlmIHNjcm9sbGJhciBpcyBwcmVzZW50LCBmYWxzZSBvdGhlcndpc2VcbiAgICovXG4gIHByaXZhdGUgX2lzUHJlc2VudCgpOiBib29sZWFuIHtcbiAgICBjb25zdCByZWN0ID0gdGhpcy5fZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4gcmVjdC5sZWZ0ICsgcmVjdC5yaWdodCA8IHdpbmRvdy5pbm5lcldpZHRoO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgYW5kIHJldHVybnMgdGhlIHdpZHRoIG9mIGEgc2Nyb2xsYmFyLlxuICAgKlxuICAgKiBAcmV0dXJuIHRoZSB3aWR0aCBvZiBhIHNjcm9sbGJhciBvbiB0aGlzIHBhZ2VcbiAgICovXG4gIHByaXZhdGUgX2dldFdpZHRoKCk6IG51bWJlciB7XG4gICAgY29uc3QgbWVhc3VyZXIgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtZWFzdXJlci5jbGFzc05hbWUgPSAnbW9kYWwtc2Nyb2xsYmFyLW1lYXN1cmUnO1xuXG4gICAgY29uc3QgYm9keSA9IHRoaXMuX2RvY3VtZW50LmJvZHk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChtZWFzdXJlcik7XG4gICAgY29uc3Qgd2lkdGggPSBtZWFzdXJlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCAtIG1lYXN1cmVyLmNsaWVudFdpZHRoO1xuICAgIGJvZHkucmVtb3ZlQ2hpbGQobWVhc3VyZXIpO1xuXG4gICAgcmV0dXJuIHdpZHRoO1xuICB9XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItbW9kYWwtYmFja2Ryb3AnLFxuICB0ZW1wbGF0ZTogJycsXG4gIGhvc3Q6XG4gICAgICB7J1tjbGFzc10nOiAnXCJtb2RhbC1iYWNrZHJvcCBmYWRlIHNob3dcIiArIChiYWNrZHJvcENsYXNzID8gXCIgXCIgKyBiYWNrZHJvcENsYXNzIDogXCJcIiknLCAnc3R5bGUnOiAnei1pbmRleDogMTA1MCd9XG59KVxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsQmFja2Ryb3Age1xuICBASW5wdXQoKSBiYWNrZHJvcENsYXNzOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TmdiTW9kYWxCYWNrZHJvcH0gZnJvbSAnLi9tb2RhbC1iYWNrZHJvcCc7XG5pbXBvcnQge05nYk1vZGFsV2luZG93fSBmcm9tICcuL21vZGFsLXdpbmRvdyc7XG5cbmltcG9ydCB7Q29udGVudFJlZn0gZnJvbSAnLi4vdXRpbC9wb3B1cCc7XG5cbi8qKlxuICogQSByZWZlcmVuY2UgdG8gYW4gYWN0aXZlIChjdXJyZW50bHkgb3BlbmVkKSBtb2RhbC4gSW5zdGFuY2VzIG9mIHRoaXMgY2xhc3NcbiAqIGNhbiBiZSBpbmplY3RlZCBpbnRvIGNvbXBvbmVudHMgcGFzc2VkIGFzIG1vZGFsIGNvbnRlbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBOZ2JBY3RpdmVNb2RhbCB7XG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIG1vZGFsIHdpdGggYW4gb3B0aW9uYWwgJ3Jlc3VsdCcgdmFsdWUuXG4gICAqIFRoZSAnTmdiTW9iYWxSZWYucmVzdWx0JyBwcm9taXNlIHdpbGwgYmUgcmVzb2x2ZWQgd2l0aCBwcm92aWRlZCB2YWx1ZS5cbiAgICovXG4gIGNsb3NlKHJlc3VsdD86IGFueSk6IHZvaWQge31cblxuICAvKipcbiAgICogRGlzbWlzc2VzIHRoZSBtb2RhbCB3aXRoIGFuIG9wdGlvbmFsICdyZWFzb24nIHZhbHVlLlxuICAgKiBUaGUgJ05nYk1vZGFsUmVmLnJlc3VsdCcgcHJvbWlzZSB3aWxsIGJlIHJlamVjdGVkIHdpdGggcHJvdmlkZWQgdmFsdWUuXG4gICAqL1xuICBkaXNtaXNzKHJlYXNvbj86IGFueSk6IHZvaWQge31cbn1cblxuLyoqXG4gKiBBIHJlZmVyZW5jZSB0byBhIG5ld2x5IG9wZW5lZCBtb2RhbCByZXR1cm5lZCBieSB0aGUgJ05nYk1vZGFsLm9wZW4oKScgbWV0aG9kLlxuICovXG5leHBvcnQgY2xhc3MgTmdiTW9kYWxSZWYge1xuICBwcml2YXRlIF9yZXNvbHZlOiAocmVzdWx0PzogYW55KSA9PiB2b2lkO1xuICBwcml2YXRlIF9yZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFRoZSBpbnN0YW5jZSBvZiBjb21wb25lbnQgdXNlZCBhcyBtb2RhbCdzIGNvbnRlbnQuXG4gICAqIFVuZGVmaW5lZCB3aGVuIGEgVGVtcGxhdGVSZWYgaXMgdXNlZCBhcyBtb2RhbCdzIGNvbnRlbnQuXG4gICAqL1xuICBnZXQgY29tcG9uZW50SW5zdGFuY2UoKTogYW55IHtcbiAgICBpZiAodGhpcy5fY29udGVudFJlZi5jb21wb25lbnRSZWYpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb250ZW50UmVmLmNvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiB0aGUgbW9kYWwgaXMgY2xvc2VkIGFuZCByZWplY3RlZCB3aGVuIHRoZSBtb2RhbCBpcyBkaXNtaXNzZWQuXG4gICAqL1xuICByZXN1bHQ6IFByb21pc2U8YW55PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX3dpbmRvd0NtcHRSZWY6IENvbXBvbmVudFJlZjxOZ2JNb2RhbFdpbmRvdz4sIHByaXZhdGUgX2NvbnRlbnRSZWY6IENvbnRlbnRSZWYsXG4gICAgICBwcml2YXRlIF9iYWNrZHJvcENtcHRSZWY/OiBDb21wb25lbnRSZWY8TmdiTW9kYWxCYWNrZHJvcD4sIHByaXZhdGUgX2JlZm9yZURpc21pc3M/OiBGdW5jdGlvbikge1xuICAgIF93aW5kb3dDbXB0UmVmLmluc3RhbmNlLmRpc21pc3NFdmVudC5zdWJzY3JpYmUoKHJlYXNvbjogYW55KSA9PiB7IHRoaXMuZGlzbWlzcyhyZWFzb24pOyB9KTtcblxuICAgIHRoaXMucmVzdWx0ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5fcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICB0aGlzLl9yZWplY3QgPSByZWplY3Q7XG4gICAgfSk7XG4gICAgdGhpcy5yZXN1bHQudGhlbihudWxsLCAoKSA9PiB7fSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBtb2RhbCB3aXRoIGFuIG9wdGlvbmFsICdyZXN1bHQnIHZhbHVlLlxuICAgKiBUaGUgJ05nYk1vYmFsUmVmLnJlc3VsdCcgcHJvbWlzZSB3aWxsIGJlIHJlc29sdmVkIHdpdGggcHJvdmlkZWQgdmFsdWUuXG4gICAqL1xuICBjbG9zZShyZXN1bHQ/OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fd2luZG93Q21wdFJlZikge1xuICAgICAgdGhpcy5fcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgdGhpcy5fcmVtb3ZlTW9kYWxFbGVtZW50cygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Rpc21pc3MocmVhc29uPzogYW55KSB7XG4gICAgdGhpcy5fcmVqZWN0KHJlYXNvbik7XG4gICAgdGhpcy5fcmVtb3ZlTW9kYWxFbGVtZW50cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc21pc3NlcyB0aGUgbW9kYWwgd2l0aCBhbiBvcHRpb25hbCAncmVhc29uJyB2YWx1ZS5cbiAgICogVGhlICdOZ2JNb2RhbFJlZi5yZXN1bHQnIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZCB3aXRoIHByb3ZpZGVkIHZhbHVlLlxuICAgKi9cbiAgZGlzbWlzcyhyZWFzb24/OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fd2luZG93Q21wdFJlZikge1xuICAgICAgaWYgKCF0aGlzLl9iZWZvcmVEaXNtaXNzKSB7XG4gICAgICAgIHRoaXMuX2Rpc21pc3MocmVhc29uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRpc21pc3MgPSB0aGlzLl9iZWZvcmVEaXNtaXNzKCk7XG4gICAgICAgIGlmIChkaXNtaXNzICYmIGRpc21pc3MudGhlbikge1xuICAgICAgICAgIGRpc21pc3MudGhlbihcbiAgICAgICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzbWlzcyhyZWFzb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgKCkgPT4ge30pO1xuICAgICAgICB9IGVsc2UgaWYgKGRpc21pc3MgIT09IGZhbHNlKSB7XG4gICAgICAgICAgdGhpcy5fZGlzbWlzcyhyZWFzb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTW9kYWxFbGVtZW50cygpIHtcbiAgICBjb25zdCB3aW5kb3dOYXRpdmVFbCA9IHRoaXMuX3dpbmRvd0NtcHRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcbiAgICB3aW5kb3dOYXRpdmVFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHdpbmRvd05hdGl2ZUVsKTtcbiAgICB0aGlzLl93aW5kb3dDbXB0UmVmLmRlc3Ryb3koKTtcblxuICAgIGlmICh0aGlzLl9iYWNrZHJvcENtcHRSZWYpIHtcbiAgICAgIGNvbnN0IGJhY2tkcm9wTmF0aXZlRWwgPSB0aGlzLl9iYWNrZHJvcENtcHRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcbiAgICAgIGJhY2tkcm9wTmF0aXZlRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChiYWNrZHJvcE5hdGl2ZUVsKTtcbiAgICAgIHRoaXMuX2JhY2tkcm9wQ21wdFJlZi5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2NvbnRlbnRSZWYgJiYgdGhpcy5fY29udGVudFJlZi52aWV3UmVmKSB7XG4gICAgICB0aGlzLl9jb250ZW50UmVmLnZpZXdSZWYuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHRoaXMuX3dpbmRvd0NtcHRSZWYgPSBudWxsO1xuICAgIHRoaXMuX2JhY2tkcm9wQ21wdFJlZiA9IG51bGw7XG4gICAgdGhpcy5fY29udGVudFJlZiA9IG51bGw7XG4gIH1cbn1cbiIsImV4cG9ydCBlbnVtIE1vZGFsRGlzbWlzc1JlYXNvbnMge1xuICBCQUNLRFJPUF9DTElDSyxcbiAgRVNDXG59XG4iLCJpbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7Z2V0Rm9jdXNhYmxlQm91bmRhcnlFbGVtZW50c30gZnJvbSAnLi4vdXRpbC9mb2N1cy10cmFwJztcbmltcG9ydCB7TW9kYWxEaXNtaXNzUmVhc29uc30gZnJvbSAnLi9tb2RhbC1kaXNtaXNzLXJlYXNvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItbW9kYWwtd2luZG93JyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3NdJzogJ1wibW9kYWwgZmFkZSBzaG93IGQtYmxvY2tcIiArICh3aW5kb3dDbGFzcyA/IFwiIFwiICsgd2luZG93Q2xhc3MgOiBcIlwiKScsXG4gICAgJ3JvbGUnOiAnZGlhbG9nJyxcbiAgICAndGFiaW5kZXgnOiAnLTEnLFxuICAgICcoa2V5dXAuZXNjKSc6ICdlc2NLZXkoJGV2ZW50KScsXG4gICAgJyhjbGljayknOiAnYmFja2Ryb3BDbGljaygkZXZlbnQpJyxcbiAgICAnW2F0dHIuYXJpYS1tb2RhbF0nOiAndHJ1ZScsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxsZWRieV0nOiAnYXJpYUxhYmVsbGVkQnknLFxuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cIidtb2RhbC1kaWFsb2cnICsgKHNpemUgPyAnIG1vZGFsLScgKyBzaXplIDogJycpICsgKGNlbnRlcmVkID8gJyBtb2RhbC1kaWFsb2ctY2VudGVyZWQnIDogJycpXCIgcm9sZT1cImRvY3VtZW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgTmdiTW9kYWxXaW5kb3cgaW1wbGVtZW50cyBPbkluaXQsXG4gICAgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfZWxXaXRoRm9jdXM6IEVsZW1lbnQ7ICAvLyBlbGVtZW50IHRoYXQgaXMgZm9jdXNlZCBwcmlvciB0byBtb2RhbCBvcGVuaW5nXG5cbiAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZztcbiAgQElucHV0KCkgYmFja2Ryb3A6IGJvb2xlYW4gfCBzdHJpbmcgPSB0cnVlO1xuICBASW5wdXQoKSBjZW50ZXJlZDogc3RyaW5nO1xuICBASW5wdXQoKSBrZXlib2FyZCA9IHRydWU7XG4gIEBJbnB1dCgpIHNpemU6IHN0cmluZztcbiAgQElucHV0KCkgd2luZG93Q2xhc3M6IHN0cmluZztcblxuICBAT3V0cHV0KCdkaXNtaXNzJykgZGlzbWlzc0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksIHByaXZhdGUgX2VsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge31cblxuICBiYWNrZHJvcENsaWNrKCRldmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmJhY2tkcm9wID09PSB0cnVlICYmIHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQgPT09ICRldmVudC50YXJnZXQpIHtcbiAgICAgIHRoaXMuZGlzbWlzcyhNb2RhbERpc21pc3NSZWFzb25zLkJBQ0tEUk9QX0NMSUNLKTtcbiAgICB9XG4gIH1cblxuICBlc2NLZXkoJGV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMua2V5Ym9hcmQgJiYgISRldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICB0aGlzLmRpc21pc3MoTW9kYWxEaXNtaXNzUmVhc29ucy5FU0MpO1xuICAgIH1cbiAgfVxuXG4gIGRpc21pc3MocmVhc29uKTogdm9pZCB7IHRoaXMuZGlzbWlzc0V2ZW50LmVtaXQocmVhc29uKTsgfVxuXG4gIG5nT25Jbml0KCkgeyB0aGlzLl9lbFdpdGhGb2N1cyA9IHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKCF0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICBjb25zdCBhdXRvRm9jdXNhYmxlID0gdGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKGBbbmdiQXV0b2ZvY3VzXWApIGFzIEhUTUxFbGVtZW50O1xuICAgICAgY29uc3QgZmlyc3RGb2N1c2FibGUgPSBnZXRGb2N1c2FibGVCb3VuZGFyeUVsZW1lbnRzKHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQpWzBdO1xuXG4gICAgICBjb25zdCBlbGVtZW50VG9Gb2N1cyA9IGF1dG9Gb2N1c2FibGUgfHwgZmlyc3RGb2N1c2FibGUgfHwgdGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIGVsZW1lbnRUb0ZvY3VzLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgY29uc3QgYm9keSA9IHRoaXMuX2RvY3VtZW50LmJvZHk7XG4gICAgY29uc3QgZWxXaXRoRm9jdXMgPSB0aGlzLl9lbFdpdGhGb2N1cztcblxuICAgIGxldCBlbGVtZW50VG9Gb2N1cztcbiAgICBpZiAoZWxXaXRoRm9jdXMgJiYgZWxXaXRoRm9jdXNbJ2ZvY3VzJ10gJiYgYm9keS5jb250YWlucyhlbFdpdGhGb2N1cykpIHtcbiAgICAgIGVsZW1lbnRUb0ZvY3VzID0gZWxXaXRoRm9jdXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnRUb0ZvY3VzID0gYm9keTtcbiAgICB9XG4gICAgZWxlbWVudFRvRm9jdXMuZm9jdXMoKTtcbiAgICB0aGlzLl9lbFdpdGhGb2N1cyA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBcHBsaWNhdGlvblJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0b3IsXG4gIFJlbmRlcmVyRmFjdG9yeTIsXG4gIFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7bmdiRm9jdXNUcmFwfSBmcm9tICcuLi91dGlsL2ZvY3VzLXRyYXAnO1xuaW1wb3J0IHtDb250ZW50UmVmfSBmcm9tICcuLi91dGlsL3BvcHVwJztcbmltcG9ydCB7U2Nyb2xsQmFyfSBmcm9tICcuLi91dGlsL3Njcm9sbGJhcic7XG5pbXBvcnQge2lzRGVmaW5lZCwgaXNTdHJpbmd9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQge05nYk1vZGFsQmFja2Ryb3B9IGZyb20gJy4vbW9kYWwtYmFja2Ryb3AnO1xuaW1wb3J0IHtOZ2JBY3RpdmVNb2RhbCwgTmdiTW9kYWxSZWZ9IGZyb20gJy4vbW9kYWwtcmVmJztcbmltcG9ydCB7TmdiTW9kYWxXaW5kb3d9IGZyb20gJy4vbW9kYWwtd2luZG93JztcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTmdiTW9kYWxTdGFjayB7XG4gIHByaXZhdGUgX2FjdGl2ZVdpbmRvd0NtcHRIYXNDaGFuZ2VkID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBfYXJpYUhpZGRlblZhbHVlczogTWFwPEVsZW1lbnQsIHN0cmluZz4gPSBuZXcgTWFwKCk7XG4gIHByaXZhdGUgX2JhY2tkcm9wQXR0cmlidXRlcyA9IFsnYmFja2Ryb3BDbGFzcyddO1xuICBwcml2YXRlIF9tb2RhbFJlZnM6IE5nYk1vZGFsUmVmW10gPSBbXTtcbiAgcHJpdmF0ZSBfd2luZG93QXR0cmlidXRlcyA9IFsnYXJpYUxhYmVsbGVkQnknLCAnYmFja2Ryb3AnLCAnY2VudGVyZWQnLCAna2V5Ym9hcmQnLCAnc2l6ZScsICd3aW5kb3dDbGFzcyddO1xuICBwcml2YXRlIF93aW5kb3dDbXB0czogQ29tcG9uZW50UmVmPE5nYk1vZGFsV2luZG93PltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9hcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYsIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvciwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcbiAgICAgIHByaXZhdGUgX3Njcm9sbEJhcjogU2Nyb2xsQmFyLCBwcml2YXRlIF9yZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIpIHtcbiAgICAvLyBUcmFwIGZvY3VzIG9uIGFjdGl2ZSBXaW5kb3dDbXB0XG4gICAgdGhpcy5fYWN0aXZlV2luZG93Q21wdEhhc0NoYW5nZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLl93aW5kb3dDbXB0cy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlV2luZG93Q21wdCA9IHRoaXMuX3dpbmRvd0NtcHRzW3RoaXMuX3dpbmRvd0NtcHRzLmxlbmd0aCAtIDFdO1xuICAgICAgICBuZ2JGb2N1c1RyYXAoYWN0aXZlV2luZG93Q21wdC5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCB0aGlzLl9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZCk7XG4gICAgICAgIHRoaXMuX3JldmVydEFyaWFIaWRkZW4oKTtcbiAgICAgICAgdGhpcy5fc2V0QXJpYUhpZGRlbihhY3RpdmVXaW5kb3dDbXB0LmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb3Blbihtb2R1bGVDRlI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgY29udGVudEluamVjdG9yOiBJbmplY3RvciwgY29udGVudDogYW55LCBvcHRpb25zKTogTmdiTW9kYWxSZWYge1xuICAgIGNvbnN0IGNvbnRhaW5lckVsID1cbiAgICAgICAgaXNEZWZpbmVkKG9wdGlvbnMuY29udGFpbmVyKSA/IHRoaXMuX2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5jb250YWluZXIpIDogdGhpcy5fZG9jdW1lbnQuYm9keTtcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihudWxsLCBudWxsKTtcblxuICAgIGNvbnN0IHJldmVydFBhZGRpbmdGb3JTY3JvbGxCYXIgPSB0aGlzLl9zY3JvbGxCYXIuY29tcGVuc2F0ZSgpO1xuICAgIGNvbnN0IHJlbW92ZUJvZHlDbGFzcyA9ICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5fbW9kYWxSZWZzLmxlbmd0aCkge1xuICAgICAgICByZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9kb2N1bWVudC5ib2R5LCAnbW9kYWwtb3BlbicpO1xuICAgICAgICB0aGlzLl9yZXZlcnRBcmlhSGlkZGVuKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICghY29udGFpbmVyRWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHNwZWNpZmllZCBtb2RhbCBjb250YWluZXIgXCIke29wdGlvbnMuY29udGFpbmVyIHx8ICdib2R5J31cIiB3YXMgbm90IGZvdW5kIGluIHRoZSBET00uYCk7XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aXZlTW9kYWwgPSBuZXcgTmdiQWN0aXZlTW9kYWwoKTtcbiAgICBjb25zdCBjb250ZW50UmVmID0gdGhpcy5fZ2V0Q29udGVudFJlZihtb2R1bGVDRlIsIG9wdGlvbnMuaW5qZWN0b3IgfHwgY29udGVudEluamVjdG9yLCBjb250ZW50LCBhY3RpdmVNb2RhbCk7XG5cbiAgICBsZXQgYmFja2Ryb3BDbXB0UmVmOiBDb21wb25lbnRSZWY8TmdiTW9kYWxCYWNrZHJvcD4gPVxuICAgICAgICBvcHRpb25zLmJhY2tkcm9wICE9PSBmYWxzZSA/IHRoaXMuX2F0dGFjaEJhY2tkcm9wKG1vZHVsZUNGUiwgY29udGFpbmVyRWwpIDogbnVsbDtcbiAgICBsZXQgd2luZG93Q21wdFJlZjogQ29tcG9uZW50UmVmPE5nYk1vZGFsV2luZG93PiA9IHRoaXMuX2F0dGFjaFdpbmRvd0NvbXBvbmVudChtb2R1bGVDRlIsIGNvbnRhaW5lckVsLCBjb250ZW50UmVmKTtcbiAgICBsZXQgbmdiTW9kYWxSZWY6IE5nYk1vZGFsUmVmID0gbmV3IE5nYk1vZGFsUmVmKHdpbmRvd0NtcHRSZWYsIGNvbnRlbnRSZWYsIGJhY2tkcm9wQ21wdFJlZiwgb3B0aW9ucy5iZWZvcmVEaXNtaXNzKTtcblxuICAgIHRoaXMuX3JlZ2lzdGVyTW9kYWxSZWYobmdiTW9kYWxSZWYpO1xuICAgIHRoaXMuX3JlZ2lzdGVyV2luZG93Q21wdCh3aW5kb3dDbXB0UmVmKTtcbiAgICBuZ2JNb2RhbFJlZi5yZXN1bHQudGhlbihyZXZlcnRQYWRkaW5nRm9yU2Nyb2xsQmFyLCByZXZlcnRQYWRkaW5nRm9yU2Nyb2xsQmFyKTtcbiAgICBuZ2JNb2RhbFJlZi5yZXN1bHQudGhlbihyZW1vdmVCb2R5Q2xhc3MsIHJlbW92ZUJvZHlDbGFzcyk7XG4gICAgYWN0aXZlTW9kYWwuY2xvc2UgPSAocmVzdWx0OiBhbnkpID0+IHsgbmdiTW9kYWxSZWYuY2xvc2UocmVzdWx0KTsgfTtcbiAgICBhY3RpdmVNb2RhbC5kaXNtaXNzID0gKHJlYXNvbjogYW55KSA9PiB7IG5nYk1vZGFsUmVmLmRpc21pc3MocmVhc29uKTsgfTtcblxuICAgIHRoaXMuX2FwcGx5V2luZG93T3B0aW9ucyh3aW5kb3dDbXB0UmVmLmluc3RhbmNlLCBvcHRpb25zKTtcbiAgICBpZiAodGhpcy5fbW9kYWxSZWZzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZG9jdW1lbnQuYm9keSwgJ21vZGFsLW9wZW4nKTtcbiAgICB9XG5cbiAgICBpZiAoYmFja2Ryb3BDbXB0UmVmICYmIGJhY2tkcm9wQ21wdFJlZi5pbnN0YW5jZSkge1xuICAgICAgdGhpcy5fYXBwbHlCYWNrZHJvcE9wdGlvbnMoYmFja2Ryb3BDbXB0UmVmLmluc3RhbmNlLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIG5nYk1vZGFsUmVmO1xuICB9XG5cbiAgZGlzbWlzc0FsbChyZWFzb24/OiBhbnkpIHsgdGhpcy5fbW9kYWxSZWZzLmZvckVhY2gobmdiTW9kYWxSZWYgPT4gbmdiTW9kYWxSZWYuZGlzbWlzcyhyZWFzb24pKTsgfVxuXG4gIGhhc09wZW5Nb2RhbHMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9tb2RhbFJlZnMubGVuZ3RoID4gMDsgfVxuXG4gIHByaXZhdGUgX2F0dGFjaEJhY2tkcm9wKG1vZHVsZUNGUjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBjb250YWluZXJFbDogYW55KTogQ29tcG9uZW50UmVmPE5nYk1vZGFsQmFja2Ryb3A+IHtcbiAgICBsZXQgYmFja2Ryb3BGYWN0b3J5ID0gbW9kdWxlQ0ZSLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KE5nYk1vZGFsQmFja2Ryb3ApO1xuICAgIGxldCBiYWNrZHJvcENtcHRSZWYgPSBiYWNrZHJvcEZhY3RvcnkuY3JlYXRlKHRoaXMuX2luamVjdG9yKTtcbiAgICB0aGlzLl9hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KGJhY2tkcm9wQ21wdFJlZi5ob3N0Vmlldyk7XG4gICAgY29udGFpbmVyRWwuYXBwZW5kQ2hpbGQoYmFja2Ryb3BDbXB0UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHJldHVybiBiYWNrZHJvcENtcHRSZWY7XG4gIH1cblxuICBwcml2YXRlIF9hdHRhY2hXaW5kb3dDb21wb25lbnQobW9kdWxlQ0ZSOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIGNvbnRhaW5lckVsOiBhbnksIGNvbnRlbnRSZWY6IGFueSk6XG4gICAgICBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+IHtcbiAgICBsZXQgd2luZG93RmFjdG9yeSA9IG1vZHVsZUNGUi5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShOZ2JNb2RhbFdpbmRvdyk7XG4gICAgbGV0IHdpbmRvd0NtcHRSZWYgPSB3aW5kb3dGYWN0b3J5LmNyZWF0ZSh0aGlzLl9pbmplY3RvciwgY29udGVudFJlZi5ub2Rlcyk7XG4gICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyh3aW5kb3dDbXB0UmVmLmhvc3RWaWV3KTtcbiAgICBjb250YWluZXJFbC5hcHBlbmRDaGlsZCh3aW5kb3dDbXB0UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHJldHVybiB3aW5kb3dDbXB0UmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlXaW5kb3dPcHRpb25zKHdpbmRvd0luc3RhbmNlOiBOZ2JNb2RhbFdpbmRvdywgb3B0aW9uczogT2JqZWN0KTogdm9pZCB7XG4gICAgdGhpcy5fd2luZG93QXR0cmlidXRlcy5mb3JFYWNoKChvcHRpb25OYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChpc0RlZmluZWQob3B0aW9uc1tvcHRpb25OYW1lXSkpIHtcbiAgICAgICAgd2luZG93SW5zdGFuY2Vbb3B0aW9uTmFtZV0gPSBvcHRpb25zW29wdGlvbk5hbWVdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXBwbHlCYWNrZHJvcE9wdGlvbnMoYmFja2Ryb3BJbnN0YW5jZTogTmdiTW9kYWxCYWNrZHJvcCwgb3B0aW9uczogT2JqZWN0KTogdm9pZCB7XG4gICAgdGhpcy5fYmFja2Ryb3BBdHRyaWJ1dGVzLmZvckVhY2goKG9wdGlvbk5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKGlzRGVmaW5lZChvcHRpb25zW29wdGlvbk5hbWVdKSkge1xuICAgICAgICBiYWNrZHJvcEluc3RhbmNlW29wdGlvbk5hbWVdID0gb3B0aW9uc1tvcHRpb25OYW1lXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldENvbnRlbnRSZWYoXG4gICAgICBtb2R1bGVDRlI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgY29udGVudEluamVjdG9yOiBJbmplY3RvciwgY29udGVudDogYW55LFxuICAgICAgYWN0aXZlTW9kYWw6IE5nYkFjdGl2ZU1vZGFsKTogQ29udGVudFJlZiB7XG4gICAgaWYgKCFjb250ZW50KSB7XG4gICAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW10pO1xuICAgIH0gZWxzZSBpZiAoY29udGVudCBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY3JlYXRlRnJvbVRlbXBsYXRlUmVmKGNvbnRlbnQsIGFjdGl2ZU1vZGFsKTtcbiAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKGNvbnRlbnQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY3JlYXRlRnJvbVN0cmluZyhjb250ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZUZyb21Db21wb25lbnQobW9kdWxlQ0ZSLCBjb250ZW50SW5qZWN0b3IsIGNvbnRlbnQsIGFjdGl2ZU1vZGFsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVGcm9tVGVtcGxhdGVSZWYoY29udGVudDogVGVtcGxhdGVSZWY8YW55PiwgYWN0aXZlTW9kYWw6IE5nYkFjdGl2ZU1vZGFsKTogQ29udGVudFJlZiB7XG4gICAgY29uc3QgY29udGV4dCA9IHtcbiAgICAgICRpbXBsaWNpdDogYWN0aXZlTW9kYWwsXG4gICAgICBjbG9zZShyZXN1bHQpIHsgYWN0aXZlTW9kYWwuY2xvc2UocmVzdWx0KTsgfSxcbiAgICAgIGRpc21pc3MocmVhc29uKSB7IGFjdGl2ZU1vZGFsLmRpc21pc3MocmVhc29uKTsgfVxuICAgIH07XG4gICAgY29uc3Qgdmlld1JlZiA9IGNvbnRlbnQuY3JlYXRlRW1iZWRkZWRWaWV3KGNvbnRleHQpO1xuICAgIHRoaXMuX2FwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcodmlld1JlZik7XG4gICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFt2aWV3UmVmLnJvb3ROb2Rlc10sIHZpZXdSZWYpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlRnJvbVN0cmluZyhjb250ZW50OiBzdHJpbmcpOiBDb250ZW50UmVmIHtcbiAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgJHtjb250ZW50fWApO1xuICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbW2NvbXBvbmVudF1dKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUZyb21Db21wb25lbnQoXG4gICAgICBtb2R1bGVDRlI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgY29udGVudEluamVjdG9yOiBJbmplY3RvciwgY29udGVudDogYW55LFxuICAgICAgY29udGV4dDogTmdiQWN0aXZlTW9kYWwpOiBDb250ZW50UmVmIHtcbiAgICBjb25zdCBjb250ZW50Q21wdEZhY3RvcnkgPSBtb2R1bGVDRlIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29udGVudCk7XG4gICAgY29uc3QgbW9kYWxDb250ZW50SW5qZWN0b3IgPVxuICAgICAgICBJbmplY3Rvci5jcmVhdGUoe3Byb3ZpZGVyczogW3twcm92aWRlOiBOZ2JBY3RpdmVNb2RhbCwgdXNlVmFsdWU6IGNvbnRleHR9XSwgcGFyZW50OiBjb250ZW50SW5qZWN0b3J9KTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSBjb250ZW50Q21wdEZhY3RvcnkuY3JlYXRlKG1vZGFsQ29udGVudEluamVjdG9yKTtcbiAgICB0aGlzLl9hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG4gICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFtbY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnRdXSwgY29tcG9uZW50UmVmLmhvc3RWaWV3LCBjb21wb25lbnRSZWYpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0QXJpYUhpZGRlbihlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgY29uc3QgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIGlmIChwYXJlbnQgJiYgZWxlbWVudCAhPT0gdGhpcy5fZG9jdW1lbnQuYm9keSkge1xuICAgICAgQXJyYXkuZnJvbShwYXJlbnQuY2hpbGRyZW4pLmZvckVhY2goc2libGluZyA9PiB7XG4gICAgICAgIGlmIChzaWJsaW5nICE9PSBlbGVtZW50ICYmIHNpYmxpbmcubm9kZU5hbWUgIT09ICdTQ1JJUFQnKSB7XG4gICAgICAgICAgdGhpcy5fYXJpYUhpZGRlblZhbHVlcy5zZXQoc2libGluZywgc2libGluZy5nZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJykpO1xuICAgICAgICAgIHNpYmxpbmcuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9zZXRBcmlhSGlkZGVuKHBhcmVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmV2ZXJ0QXJpYUhpZGRlbigpIHtcbiAgICB0aGlzLl9hcmlhSGlkZGVuVmFsdWVzLmZvckVhY2goKHZhbHVlLCBlbGVtZW50KSA9PiB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fYXJpYUhpZGRlblZhbHVlcy5jbGVhcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVnaXN0ZXJNb2RhbFJlZihuZ2JNb2RhbFJlZjogTmdiTW9kYWxSZWYpIHtcbiAgICBjb25zdCB1bnJlZ2lzdGVyTW9kYWxSZWYgPSAoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX21vZGFsUmVmcy5pbmRleE9mKG5nYk1vZGFsUmVmKTtcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIHRoaXMuX21vZGFsUmVmcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5fbW9kYWxSZWZzLnB1c2gobmdiTW9kYWxSZWYpO1xuICAgIG5nYk1vZGFsUmVmLnJlc3VsdC50aGVuKHVucmVnaXN0ZXJNb2RhbFJlZiwgdW5yZWdpc3Rlck1vZGFsUmVmKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZ2lzdGVyV2luZG93Q21wdChuZ2JXaW5kb3dDbXB0OiBDb21wb25lbnRSZWY8TmdiTW9kYWxXaW5kb3c+KSB7XG4gICAgdGhpcy5fd2luZG93Q21wdHMucHVzaChuZ2JXaW5kb3dDbXB0KTtcbiAgICB0aGlzLl9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZC5uZXh0KCk7XG5cbiAgICBuZ2JXaW5kb3dDbXB0Lm9uRGVzdHJveSgoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX3dpbmRvd0NtcHRzLmluZGV4T2YobmdiV2luZG93Q21wdCk7XG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0aGlzLl93aW5kb3dDbXB0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLl9hY3RpdmVXaW5kb3dDbXB0SGFzQ2hhbmdlZC5uZXh0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0b3IsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TmdiTW9kYWxPcHRpb25zLCBOZ2JNb2RhbENvbmZpZ30gZnJvbSAnLi9tb2RhbC1jb25maWcnO1xuaW1wb3J0IHtOZ2JNb2RhbFJlZn0gZnJvbSAnLi9tb2RhbC1yZWYnO1xuaW1wb3J0IHtOZ2JNb2RhbFN0YWNrfSBmcm9tICcuL21vZGFsLXN0YWNrJztcblxuLyoqXG4gKiBBIHNlcnZpY2UgdG8gb3BlbiBtb2RhbCB3aW5kb3dzLiBDcmVhdGluZyBhIG1vZGFsIGlzIHN0cmFpZ2h0Zm9yd2FyZDogY3JlYXRlIGEgdGVtcGxhdGUgYW5kIHBhc3MgaXQgYXMgYW4gYXJndW1lbnQgdG9cbiAqIHRoZSBcIm9wZW5cIiBtZXRob2QhXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9tb2R1bGVDRlI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIF9tb2RhbFN0YWNrOiBOZ2JNb2RhbFN0YWNrLFxuICAgICAgcHJpdmF0ZSBfY29uZmlnOiBOZ2JNb2RhbENvbmZpZykge31cblxuICAvKipcbiAgICogT3BlbnMgYSBuZXcgbW9kYWwgd2luZG93IHdpdGggdGhlIHNwZWNpZmllZCBjb250ZW50IGFuZCB1c2luZyBzdXBwbGllZCBvcHRpb25zLiBDb250ZW50IGNhbiBiZSBwcm92aWRlZFxuICAgKiBhcyBhIFRlbXBsYXRlUmVmIG9yIGEgY29tcG9uZW50IHR5cGUuIElmIHlvdSBwYXNzIGEgY29tcG9uZW50IHR5cGUgYXMgY29udGVudCwgdGhlbiBpbnN0YW5jZXMgb2YgdGhvc2VcbiAgICogY29tcG9uZW50cyBjYW4gYmUgaW5qZWN0ZWQgd2l0aCBhbiBpbnN0YW5jZSBvZiB0aGUgTmdiQWN0aXZlTW9kYWwgY2xhc3MuIFlvdSBjYW4gdXNlIG1ldGhvZHMgb24gdGhlXG4gICAqIE5nYkFjdGl2ZU1vZGFsIGNsYXNzIHRvIGNsb3NlIC8gZGlzbWlzcyBtb2RhbHMgZnJvbSBcImluc2lkZVwiIG9mIGEgY29tcG9uZW50LlxuICAgKi9cbiAgb3Blbihjb250ZW50OiBhbnksIG9wdGlvbnM6IE5nYk1vZGFsT3B0aW9ucyA9IHt9KTogTmdiTW9kYWxSZWYge1xuICAgIGNvbnN0IGNvbWJpbmVkT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX2NvbmZpZywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuX21vZGFsU3RhY2sub3Blbih0aGlzLl9tb2R1bGVDRlIsIHRoaXMuX2luamVjdG9yLCBjb250ZW50LCBjb21iaW5lZE9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc21pc3MgYWxsIGN1cnJlbnRseSBkaXNwbGF5ZWQgbW9kYWwgd2luZG93cyB3aXRoIHRoZSBzdXBwbGllZCByZWFzb24uXG4gICAqXG4gICAqIEBzaW5jZSAzLjEuMFxuICAgKi9cbiAgZGlzbWlzc0FsbChyZWFzb24/OiBhbnkpIHsgdGhpcy5fbW9kYWxTdGFjay5kaXNtaXNzQWxsKHJlYXNvbik7IH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZXJlIGFyZSBjdXJyZW50bHkgYW55IG9wZW4gbW9kYWwgd2luZG93cyBpbiB0aGUgYXBwbGljYXRpb24uXG4gICAqXG4gICAqIEBzaW5jZSAzLjMuMFxuICAgKi9cbiAgaGFzT3Blbk1vZGFscygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX21vZGFsU3RhY2suaGFzT3Blbk1vZGFscygpOyB9XG59XG4iLCJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtOZ2JNb2RhbH0gZnJvbSAnLi9tb2RhbCc7XG5pbXBvcnQge05nYk1vZGFsQmFja2Ryb3B9IGZyb20gJy4vbW9kYWwtYmFja2Ryb3AnO1xuaW1wb3J0IHtOZ2JNb2RhbFdpbmRvd30gZnJvbSAnLi9tb2RhbC13aW5kb3cnO1xuXG5leHBvcnQge05nYk1vZGFsfSBmcm9tICcuL21vZGFsJztcbmV4cG9ydCB7TmdiTW9kYWxDb25maWcsIE5nYk1vZGFsT3B0aW9uc30gZnJvbSAnLi9tb2RhbC1jb25maWcnO1xuZXhwb3J0IHtOZ2JNb2RhbFJlZiwgTmdiQWN0aXZlTW9kYWx9IGZyb20gJy4vbW9kYWwtcmVmJztcbmV4cG9ydCB7TW9kYWxEaXNtaXNzUmVhc29uc30gZnJvbSAnLi9tb2RhbC1kaXNtaXNzLXJlYXNvbnMnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ2JNb2RhbEJhY2tkcm9wLCBOZ2JNb2RhbFdpbmRvd10sXG4gIGVudHJ5Q29tcG9uZW50czogW05nYk1vZGFsQmFja2Ryb3AsIE5nYk1vZGFsV2luZG93XSxcbiAgcHJvdmlkZXJzOiBbTmdiTW9kYWxdXG59KVxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsTW9kdWxlIHtcbiAgLyoqXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxuICAgKi9cbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYk1vZGFsTW9kdWxlfTsgfVxufVxuIiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBOZ2JQYWdpbmF0aW9uIGNvbXBvbmVudC5cbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxuICogb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZSBwYWdpbmF0aW9ucyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTmdiUGFnaW5hdGlvbkNvbmZpZyB7XG4gIGRpc2FibGVkID0gZmFsc2U7XG4gIGJvdW5kYXJ5TGlua3MgPSBmYWxzZTtcbiAgZGlyZWN0aW9uTGlua3MgPSB0cnVlO1xuICBlbGxpcHNlcyA9IHRydWU7XG4gIG1heFNpemUgPSAwO1xuICBwYWdlU2l6ZSA9IDEwO1xuICByb3RhdGUgPSBmYWxzZTtcbiAgc2l6ZTogJ3NtJyB8ICdsZyc7XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIE9uQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtnZXRWYWx1ZUluUmFuZ2UsIGlzTnVtYmVyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHtOZ2JQYWdpbmF0aW9uQ29uZmlnfSBmcm9tICcuL3BhZ2luYXRpb24tY29uZmlnJztcblxuLyoqXG4gKiBDb250ZXh0IGZvciB0aGUgcGFnaW5hdGlvbiAnZmlyc3QnLCAncHJldmlvdXMnLCAnbmV4dCcsICdsYXN0JyBvciAnZWxsaXBzaXMnIGNlbGxcbiAqIGluIGNhc2UgeW91IHdhbnQgdG8gb3ZlcnJpZGUgb25lXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiUGFnaW5hdGlvbkxpbmtDb250ZXh0IHtcbiAgLyoqXG4gICAqIFBhZ2UgbnVtYmVyIGN1cnJlbnRseSBzZWxlY3RlZFxuICAgKi9cbiAgY3VycmVudFBhZ2U6IG51bWJlcjtcblxuICAvKipcbiAgICogSWYgdHJ1ZSB0aGUgbGluayBpbiBxdWVzdGlvbiBpcyBkaXNhYmxlZFxuICAgKi9cbiAgZGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQ29udGV4dCBmb3IgdGhlIHBhZ2luYXRpb24gJ251bWJlcicgY2VsbCBpbiBjYXNlIHlvdSB3YW50IHRvIG92ZXJyaWRlIG9uZS5cbiAqIEV4dGVuZHMgJ05nYlBhZ2luYXRpb25MaW5rQ29udGV4dCdcbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JQYWdpbmF0aW9uTnVtYmVyQ29udGV4dCBleHRlbmRzIE5nYlBhZ2luYXRpb25MaW5rQ29udGV4dCB7XG4gIC8qKlxuICAgKiBQYWdlIG51bWJlciBkaXNwbGF5ZWQgYnkgdGhlIGN1cnJlbnQgY2VsbFxuICAgKi9cbiAgJGltcGxpY2l0OiBudW1iZXI7XG59XG5cbi8qKlxuICogVGhlIGRpcmVjdGl2ZSB0byBtYXRjaCB0aGUgJ2VsbGlwc2lzJyBjZWxsIHRlbXBsYXRlXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFnaW5hdGlvbkVsbGlwc2lzXSd9KVxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb25FbGxpcHNpcyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TmdiUGFnaW5hdGlvbkxpbmtDb250ZXh0Pikge31cbn1cblxuLyoqXG4gKiBUaGUgZGlyZWN0aXZlIHRvIG1hdGNoIHRoZSAnZmlyc3QnIGNlbGwgdGVtcGxhdGVcbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYWdpbmF0aW9uRmlyc3RdJ30pXG5leHBvcnQgY2xhc3MgTmdiUGFnaW5hdGlvbkZpcnN0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxOZ2JQYWdpbmF0aW9uTGlua0NvbnRleHQ+KSB7fVxufVxuXG4vKipcbiAqIFRoZSBkaXJlY3RpdmUgdG8gbWF0Y2ggdGhlICdsYXN0JyBjZWxsIHRlbXBsYXRlXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFnaW5hdGlvbkxhc3RdJ30pXG5leHBvcnQgY2xhc3MgTmdiUGFnaW5hdGlvbkxhc3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPE5nYlBhZ2luYXRpb25MaW5rQ29udGV4dD4pIHt9XG59XG5cbi8qKlxuICogVGhlIGRpcmVjdGl2ZSB0byBtYXRjaCB0aGUgJ25leHQnIGNlbGwgdGVtcGxhdGVcbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYWdpbmF0aW9uTmV4dF0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uTmV4dCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TmdiUGFnaW5hdGlvbkxpbmtDb250ZXh0Pikge31cbn1cblxuLyoqXG4gKiBUaGUgZGlyZWN0aXZlIHRvIG1hdGNoIHRoZSBwYWdlICdudW1iZXInIGNlbGwgdGVtcGxhdGVcbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYWdpbmF0aW9uTnVtYmVyXSd9KVxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb25OdW1iZXIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPE5nYlBhZ2luYXRpb25OdW1iZXJDb250ZXh0Pikge31cbn1cblxuLyoqXG4gKiBUaGUgZGlyZWN0aXZlIHRvIG1hdGNoIHRoZSAncHJldmlvdXMnIGNlbGwgdGVtcGxhdGVcbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYWdpbmF0aW9uUHJldmlvdXNdJ30pXG5leHBvcnQgY2xhc3MgTmdiUGFnaW5hdGlvblByZXZpb3VzIHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxOZ2JQYWdpbmF0aW9uTGlua0NvbnRleHQ+KSB7fVxufVxuXG4vKipcbiAqIEEgY29tcG9uZW50IHRoYXQgZGlzcGxheXMgcGFnZSBudW1iZXJzIGFuZCBhbGxvd3MgdG8gY3VzdG9taXplIHRoZW0gaW4gc2V2ZXJhbCB3YXlzXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1wYWdpbmF0aW9uJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHsncm9sZSc6ICduYXZpZ2F0aW9uJ30sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNmaXJzdD48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBpMThuPVwiQEBuZ2IucGFnaW5hdGlvbi5maXJzdFwiPiZsYXF1bzsmbGFxdW87PC9zcGFuPjwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICNwcmV2aW91cz48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBpMThuPVwiQEBuZ2IucGFnaW5hdGlvbi5wcmV2aW91c1wiPiZsYXF1bzs8L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI25leHQ+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgaTE4bj1cIkBAbmdiLnBhZ2luYXRpb24ubmV4dFwiPiZyYXF1bzs8L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI2xhc3Q+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgaTE4bj1cIkBAbmdiLnBhZ2luYXRpb24ubGFzdFwiPiZyYXF1bzsmcmFxdW87PC9zcGFuPjwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICNlbGxpcHNpcz4uLi48L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdE51bWJlciBsZXQtcGFnZSBsZXQtY3VycmVudFBhZ2U9XCJjdXJyZW50UGFnZVwiPlxuICAgICAge3sgcGFnZSB9fVxuICAgICAgPHNwYW4gKm5nSWY9XCJwYWdlID09PSBjdXJyZW50UGFnZVwiIGNsYXNzPVwic3Itb25seVwiPihjdXJyZW50KTwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDx1bCBbY2xhc3NdPVwiJ3BhZ2luYXRpb24nICsgKHNpemUgPyAnIHBhZ2luYXRpb24tJyArIHNpemUgOiAnJylcIj5cbiAgICAgIDxsaSAqbmdJZj1cImJvdW5kYXJ5TGlua3NcIiBjbGFzcz1cInBhZ2UtaXRlbVwiXG4gICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJwcmV2aW91c0Rpc2FibGVkKClcIj5cbiAgICAgICAgPGEgYXJpYS1sYWJlbD1cIkZpcnN0XCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IucGFnaW5hdGlvbi5maXJzdC1hcmlhXCIgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFBhZ2UoMSk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCIgW2F0dHIudGFiaW5kZXhdPVwiKGhhc1ByZXZpb3VzKCkgPyBudWxsIDogJy0xJylcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidHBsRmlyc3Q/LnRlbXBsYXRlUmVmIHx8IGZpcnN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntkaXNhYmxlZDogcHJldmlvdXNEaXNhYmxlZCgpLCBjdXJyZW50UGFnZTogcGFnZX1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuXG4gICAgICA8bGkgKm5nSWY9XCJkaXJlY3Rpb25MaW5rc1wiIGNsYXNzPVwicGFnZS1pdGVtXCJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cInByZXZpb3VzRGlzYWJsZWQoKVwiPlxuICAgICAgICA8YSBhcmlhLWxhYmVsPVwiUHJldmlvdXNcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5wYWdpbmF0aW9uLnByZXZpb3VzLWFyaWFcIiBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWZcbiAgICAgICAgICAoY2xpY2spPVwic2VsZWN0UGFnZShwYWdlLTEpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiIFthdHRyLnRhYmluZGV4XT1cIihoYXNQcmV2aW91cygpID8gbnVsbCA6ICctMScpXCI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRwbFByZXZpb3VzPy50ZW1wbGF0ZVJlZiB8fCBwcmV2aW91c1wiXG4gICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZGlzYWJsZWQ6IHByZXZpb3VzRGlzYWJsZWQoKX1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBwYWdlTnVtYmVyIG9mIHBhZ2VzXCIgY2xhc3M9XCJwYWdlLWl0ZW1cIiBbY2xhc3MuYWN0aXZlXT1cInBhZ2VOdW1iZXIgPT09IHBhZ2VcIlxuICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiaXNFbGxpcHNpcyhwYWdlTnVtYmVyKSB8fCBkaXNhYmxlZFwiPlxuICAgICAgICA8YSAqbmdJZj1cImlzRWxsaXBzaXMocGFnZU51bWJlcilcIiBjbGFzcz1cInBhZ2UtbGlua1wiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0cGxFbGxpcHNpcz8udGVtcGxhdGVSZWYgfHwgZWxsaXBzaXNcIlxuICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Rpc2FibGVkOiB0cnVlLCBjdXJyZW50UGFnZTogcGFnZX1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2E+XG4gICAgICAgIDxhICpuZ0lmPVwiIWlzRWxsaXBzaXMocGFnZU51bWJlcilcIiBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWYgKGNsaWNrKT1cInNlbGVjdFBhZ2UocGFnZU51bWJlcik7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCI+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRwbE51bWJlcj8udGVtcGxhdGVSZWYgfHwgZGVmYXVsdE51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZGlzYWJsZWQ6IGRpc2FibGVkLCAkaW1wbGljaXQ6IHBhZ2VOdW1iZXIsIGN1cnJlbnRQYWdlOiBwYWdlfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG4gICAgICA8bGkgKm5nSWY9XCJkaXJlY3Rpb25MaW5rc1wiIGNsYXNzPVwicGFnZS1pdGVtXCIgW2NsYXNzLmRpc2FibGVkXT1cIm5leHREaXNhYmxlZCgpXCI+XG4gICAgICAgIDxhIGFyaWEtbGFiZWw9XCJOZXh0XCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IucGFnaW5hdGlvbi5uZXh0LWFyaWFcIiBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWZcbiAgICAgICAgICAoY2xpY2spPVwic2VsZWN0UGFnZShwYWdlKzEpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiIFthdHRyLnRhYmluZGV4XT1cIihoYXNOZXh0KCkgPyBudWxsIDogJy0xJylcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidHBsTmV4dD8udGVtcGxhdGVSZWYgfHwgbmV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZGlzYWJsZWQ6IG5leHREaXNhYmxlZCgpLCBjdXJyZW50UGFnZTogcGFnZX1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuXG4gICAgICA8bGkgKm5nSWY9XCJib3VuZGFyeUxpbmtzXCIgY2xhc3M9XCJwYWdlLWl0ZW1cIiBbY2xhc3MuZGlzYWJsZWRdPVwibmV4dERpc2FibGVkKClcIj5cbiAgICAgICAgPGEgYXJpYS1sYWJlbD1cIkxhc3RcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5wYWdpbmF0aW9uLmxhc3QtYXJpYVwiIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZlxuICAgICAgICAgIChjbGljayk9XCJzZWxlY3RQYWdlKHBhZ2VDb3VudCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCIgW2F0dHIudGFiaW5kZXhdPVwiKGhhc05leHQoKSA/IG51bGwgOiAnLTEnKVwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0cGxMYXN0Py50ZW1wbGF0ZVJlZiB8fCBsYXN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntkaXNhYmxlZDogbmV4dERpc2FibGVkKCksIGN1cnJlbnRQYWdlOiBwYWdlfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgcGFnZUNvdW50ID0gMDtcbiAgcGFnZXM6IG51bWJlcltdID0gW107XG5cbiAgQENvbnRlbnRDaGlsZChOZ2JQYWdpbmF0aW9uRWxsaXBzaXMpIHRwbEVsbGlwc2lzOiBOZ2JQYWdpbmF0aW9uRWxsaXBzaXM7XG4gIEBDb250ZW50Q2hpbGQoTmdiUGFnaW5hdGlvbkZpcnN0KSB0cGxGaXJzdDogTmdiUGFnaW5hdGlvbkZpcnN0O1xuICBAQ29udGVudENoaWxkKE5nYlBhZ2luYXRpb25MYXN0KSB0cGxMYXN0OiBOZ2JQYWdpbmF0aW9uTGFzdDtcbiAgQENvbnRlbnRDaGlsZChOZ2JQYWdpbmF0aW9uTmV4dCkgdHBsTmV4dDogTmdiUGFnaW5hdGlvbk5leHQ7XG4gIEBDb250ZW50Q2hpbGQoTmdiUGFnaW5hdGlvbk51bWJlcikgdHBsTnVtYmVyOiBOZ2JQYWdpbmF0aW9uTnVtYmVyO1xuICBAQ29udGVudENoaWxkKE5nYlBhZ2luYXRpb25QcmV2aW91cykgdHBsUHJldmlvdXM6IE5nYlBhZ2luYXRpb25QcmV2aW91cztcblxuICAvKipcbiAgICogV2hldGhlciB0byBkaXNhYmxlIGJ1dHRvbnMgZnJvbSB1c2VyIGlucHV0XG4gICAqL1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogIFdoZXRoZXIgdG8gc2hvdyB0aGUgXCJGaXJzdFwiIGFuZCBcIkxhc3RcIiBwYWdlIGxpbmtzXG4gICAqL1xuICBASW5wdXQoKSBib3VuZGFyeUxpbmtzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiAgV2hldGhlciB0byBzaG93IHRoZSBcIk5leHRcIiBhbmQgXCJQcmV2aW91c1wiIHBhZ2UgbGlua3NcbiAgICovXG4gIEBJbnB1dCgpIGRpcmVjdGlvbkxpbmtzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiAgV2hldGhlciB0byBzaG93IGVsbGlwc2lzIHN5bWJvbHMgYW5kIGZpcnN0L2xhc3QgcGFnZSBudW1iZXJzIHdoZW4gbWF4U2l6ZSA+IG51bWJlciBvZiBwYWdlc1xuICAgKi9cbiAgQElucHV0KCkgZWxsaXBzZXM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqICBXaGV0aGVyIHRvIHJvdGF0ZSBwYWdlcyB3aGVuIG1heFNpemUgPiBudW1iZXIgb2YgcGFnZXMuXG4gICAqICBDdXJyZW50IHBhZ2Ugd2lsbCBiZSBpbiB0aGUgbWlkZGxlXG4gICAqL1xuICBASW5wdXQoKSByb3RhdGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqICBOdW1iZXIgb2YgaXRlbXMgaW4gY29sbGVjdGlvbi5cbiAgICovXG4gIEBJbnB1dCgpIGNvbGxlY3Rpb25TaXplOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqICBNYXhpbXVtIG51bWJlciBvZiBwYWdlcyB0byBkaXNwbGF5LlxuICAgKi9cbiAgQElucHV0KCkgbWF4U2l6ZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiAgQ3VycmVudCBwYWdlLiBQYWdlIG51bWJlcnMgc3RhcnQgd2l0aCAxXG4gICAqL1xuICBASW5wdXQoKSBwYWdlID0gMTtcblxuICAvKipcbiAgICogIE51bWJlciBvZiBpdGVtcyBwZXIgcGFnZS5cbiAgICovXG4gIEBJbnB1dCgpIHBhZ2VTaXplOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqICBBbiBldmVudCBmaXJlZCB3aGVuIHRoZSBwYWdlIGlzIGNoYW5nZWQuXG4gICAqICBFdmVudCdzIHBheWxvYWQgZXF1YWxzIHRvIHRoZSBuZXdseSBzZWxlY3RlZCBwYWdlLlxuICAgKiAgV2lsbCBmaXJlIG9ubHkgaWYgY29sbGVjdGlvbiBzaXplIGlzIHNldCBhbmQgYWxsIHZhbHVlcyBhcmUgdmFsaWQuXG4gICAqICBQYWdlIG51bWJlcnMgc3RhcnQgd2l0aCAxXG4gICAqL1xuICBAT3V0cHV0KCkgcGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPih0cnVlKTtcblxuICAvKipcbiAgICogUGFnaW5hdGlvbiBkaXNwbGF5IHNpemU6IHNtYWxsIG9yIGxhcmdlXG4gICAqL1xuICBASW5wdXQoKSBzaXplOiAnc20nIHwgJ2xnJztcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5nYlBhZ2luYXRpb25Db25maWcpIHtcbiAgICB0aGlzLmRpc2FibGVkID0gY29uZmlnLmRpc2FibGVkO1xuICAgIHRoaXMuYm91bmRhcnlMaW5rcyA9IGNvbmZpZy5ib3VuZGFyeUxpbmtzO1xuICAgIHRoaXMuZGlyZWN0aW9uTGlua3MgPSBjb25maWcuZGlyZWN0aW9uTGlua3M7XG4gICAgdGhpcy5lbGxpcHNlcyA9IGNvbmZpZy5lbGxpcHNlcztcbiAgICB0aGlzLm1heFNpemUgPSBjb25maWcubWF4U2l6ZTtcbiAgICB0aGlzLnBhZ2VTaXplID0gY29uZmlnLnBhZ2VTaXplO1xuICAgIHRoaXMucm90YXRlID0gY29uZmlnLnJvdGF0ZTtcbiAgICB0aGlzLnNpemUgPSBjb25maWcuc2l6ZTtcbiAgfVxuXG4gIGhhc1ByZXZpb3VzKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5wYWdlID4gMTsgfVxuXG4gIGhhc05leHQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnBhZ2UgPCB0aGlzLnBhZ2VDb3VudDsgfVxuXG4gIG5leHREaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuICF0aGlzLmhhc05leHQoKSB8fCB0aGlzLmRpc2FibGVkOyB9XG5cbiAgcHJldmlvdXNEaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuICF0aGlzLmhhc1ByZXZpb3VzKCkgfHwgdGhpcy5kaXNhYmxlZDsgfVxuXG4gIHNlbGVjdFBhZ2UocGFnZU51bWJlcjogbnVtYmVyKTogdm9pZCB7IHRoaXMuX3VwZGF0ZVBhZ2VzKHBhZ2VOdW1iZXIpOyB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQgeyB0aGlzLl91cGRhdGVQYWdlcyh0aGlzLnBhZ2UpOyB9XG5cbiAgaXNFbGxpcHNpcyhwYWdlTnVtYmVyKTogYm9vbGVhbiB7IHJldHVybiBwYWdlTnVtYmVyID09PSAtMTsgfVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIGVsbGlwc2VzIGFuZCBmaXJzdC9sYXN0IHBhZ2UgbnVtYmVyIHRvIHRoZSBkaXNwbGF5ZWQgcGFnZXNcbiAgICovXG4gIHByaXZhdGUgX2FwcGx5RWxsaXBzZXMoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5lbGxpcHNlcykge1xuICAgICAgaWYgKHN0YXJ0ID4gMCkge1xuICAgICAgICBpZiAoc3RhcnQgPiAxKSB7XG4gICAgICAgICAgdGhpcy5wYWdlcy51bnNoaWZ0KC0xKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhZ2VzLnVuc2hpZnQoMSk7XG4gICAgICB9XG4gICAgICBpZiAoZW5kIDwgdGhpcy5wYWdlQ291bnQpIHtcbiAgICAgICAgaWYgKGVuZCA8ICh0aGlzLnBhZ2VDb3VudCAtIDEpKSB7XG4gICAgICAgICAgdGhpcy5wYWdlcy5wdXNoKC0xKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhZ2VzLnB1c2godGhpcy5wYWdlQ291bnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSb3RhdGVzIHBhZ2UgbnVtYmVycyBiYXNlZCBvbiBtYXhTaXplIGl0ZW1zIHZpc2libGUuXG4gICAqIEN1cnJlbnRseSBzZWxlY3RlZCBwYWdlIHN0YXlzIGluIHRoZSBtaWRkbGU6XG4gICAqXG4gICAqIEV4LiBmb3Igc2VsZWN0ZWQgcGFnZSA9IDY6XG4gICAqIFs1LCo2Kiw3XSBmb3IgbWF4U2l6ZSA9IDNcbiAgICogWzQsNSwqNiosN10gZm9yIG1heFNpemUgPSA0XG4gICAqL1xuICBwcml2YXRlIF9hcHBseVJvdGF0aW9uKCk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgIGxldCBzdGFydCA9IDA7XG4gICAgbGV0IGVuZCA9IHRoaXMucGFnZUNvdW50O1xuICAgIGxldCBsZWZ0T2Zmc2V0ID0gTWF0aC5mbG9vcih0aGlzLm1heFNpemUgLyAyKTtcbiAgICBsZXQgcmlnaHRPZmZzZXQgPSB0aGlzLm1heFNpemUgJSAyID09PSAwID8gbGVmdE9mZnNldCAtIDEgOiBsZWZ0T2Zmc2V0O1xuXG4gICAgaWYgKHRoaXMucGFnZSA8PSBsZWZ0T2Zmc2V0KSB7XG4gICAgICAvLyB2ZXJ5IGJlZ2lubmluZywgbm8gcm90YXRpb24gLT4gWzAuLm1heFNpemVdXG4gICAgICBlbmQgPSB0aGlzLm1heFNpemU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBhZ2VDb3VudCAtIHRoaXMucGFnZSA8IGxlZnRPZmZzZXQpIHtcbiAgICAgIC8vIHZlcnkgZW5kLCBubyByb3RhdGlvbiAtPiBbbGVuLW1heFNpemUuLmxlbl1cbiAgICAgIHN0YXJ0ID0gdGhpcy5wYWdlQ291bnQgLSB0aGlzLm1heFNpemU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJvdGF0ZVxuICAgICAgc3RhcnQgPSB0aGlzLnBhZ2UgLSBsZWZ0T2Zmc2V0IC0gMTtcbiAgICAgIGVuZCA9IHRoaXMucGFnZSArIHJpZ2h0T2Zmc2V0O1xuICAgIH1cblxuICAgIHJldHVybiBbc3RhcnQsIGVuZF07XG4gIH1cblxuICAvKipcbiAgICogUGFnaW5hdGVzIHBhZ2UgbnVtYmVycyBiYXNlZCBvbiBtYXhTaXplIGl0ZW1zIHBlciBwYWdlXG4gICAqL1xuICBwcml2YXRlIF9hcHBseVBhZ2luYXRpb24oKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgbGV0IHBhZ2UgPSBNYXRoLmNlaWwodGhpcy5wYWdlIC8gdGhpcy5tYXhTaXplKSAtIDE7XG4gICAgbGV0IHN0YXJ0ID0gcGFnZSAqIHRoaXMubWF4U2l6ZTtcbiAgICBsZXQgZW5kID0gc3RhcnQgKyB0aGlzLm1heFNpemU7XG5cbiAgICByZXR1cm4gW3N0YXJ0LCBlbmRdO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0UGFnZUluUmFuZ2UobmV3UGFnZU5vKSB7XG4gICAgY29uc3QgcHJldlBhZ2VObyA9IHRoaXMucGFnZTtcbiAgICB0aGlzLnBhZ2UgPSBnZXRWYWx1ZUluUmFuZ2UobmV3UGFnZU5vLCB0aGlzLnBhZ2VDb3VudCwgMSk7XG5cbiAgICBpZiAodGhpcy5wYWdlICE9PSBwcmV2UGFnZU5vICYmIGlzTnVtYmVyKHRoaXMuY29sbGVjdGlvblNpemUpKSB7XG4gICAgICB0aGlzLnBhZ2VDaGFuZ2UuZW1pdCh0aGlzLnBhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVBhZ2VzKG5ld1BhZ2U6IG51bWJlcikge1xuICAgIHRoaXMucGFnZUNvdW50ID0gTWF0aC5jZWlsKHRoaXMuY29sbGVjdGlvblNpemUgLyB0aGlzLnBhZ2VTaXplKTtcblxuICAgIGlmICghaXNOdW1iZXIodGhpcy5wYWdlQ291bnQpKSB7XG4gICAgICB0aGlzLnBhZ2VDb3VudCA9IDA7XG4gICAgfVxuXG4gICAgLy8gZmlsbC1pbiBtb2RlbCBuZWVkZWQgdG8gcmVuZGVyIHBhZ2VzXG4gICAgdGhpcy5wYWdlcy5sZW5ndGggPSAwO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHRoaXMucGFnZUNvdW50OyBpKyspIHtcbiAgICAgIHRoaXMucGFnZXMucHVzaChpKTtcbiAgICB9XG5cbiAgICAvLyBzZXQgcGFnZSB3aXRoaW4gMS4ubWF4IHJhbmdlXG4gICAgdGhpcy5fc2V0UGFnZUluUmFuZ2UobmV3UGFnZSk7XG5cbiAgICAvLyBhcHBseSBtYXhTaXplIGlmIG5lY2Vzc2FyeVxuICAgIGlmICh0aGlzLm1heFNpemUgPiAwICYmIHRoaXMucGFnZUNvdW50ID4gdGhpcy5tYXhTaXplKSB7XG4gICAgICBsZXQgc3RhcnQgPSAwO1xuICAgICAgbGV0IGVuZCA9IHRoaXMucGFnZUNvdW50O1xuXG4gICAgICAvLyBlaXRoZXIgcGFnaW5hdGluZyBvciByb3RhdGluZyBwYWdlIG51bWJlcnNcbiAgICAgIGlmICh0aGlzLnJvdGF0ZSkge1xuICAgICAgICBbc3RhcnQsIGVuZF0gPSB0aGlzLl9hcHBseVJvdGF0aW9uKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBbc3RhcnQsIGVuZF0gPSB0aGlzLl9hcHBseVBhZ2luYXRpb24oKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wYWdlcyA9IHRoaXMucGFnZXMuc2xpY2Uoc3RhcnQsIGVuZCk7XG5cbiAgICAgIC8vIGFkZGluZyBlbGxpcHNlc1xuICAgICAgdGhpcy5fYXBwbHlFbGxpcHNlcyhzdGFydCwgZW5kKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7XG4gIE5nYlBhZ2luYXRpb24sXG4gIE5nYlBhZ2luYXRpb25FbGxpcHNpcyxcbiAgTmdiUGFnaW5hdGlvbkZpcnN0LFxuICBOZ2JQYWdpbmF0aW9uTGFzdCxcbiAgTmdiUGFnaW5hdGlvbk5leHQsXG4gIE5nYlBhZ2luYXRpb25OdW1iZXIsXG4gIE5nYlBhZ2luYXRpb25QcmV2aW91c1xufSBmcm9tICcuL3BhZ2luYXRpb24nO1xuXG5leHBvcnQge1xuICBOZ2JQYWdpbmF0aW9uLFxuICBOZ2JQYWdpbmF0aW9uRWxsaXBzaXMsXG4gIE5nYlBhZ2luYXRpb25GaXJzdCxcbiAgTmdiUGFnaW5hdGlvbkxhc3QsXG4gIE5nYlBhZ2luYXRpb25OZXh0LFxuICBOZ2JQYWdpbmF0aW9uTnVtYmVyLFxuICBOZ2JQYWdpbmF0aW9uUHJldmlvdXNcbn0gZnJvbSAnLi9wYWdpbmF0aW9uJztcbmV4cG9ydCB7TmdiUGFnaW5hdGlvbkNvbmZpZ30gZnJvbSAnLi9wYWdpbmF0aW9uLWNvbmZpZyc7XG5cbmNvbnN0IERJUkVDVElWRVMgPSBbXG4gIE5nYlBhZ2luYXRpb24sIE5nYlBhZ2luYXRpb25FbGxpcHNpcywgTmdiUGFnaW5hdGlvbkZpcnN0LCBOZ2JQYWdpbmF0aW9uTGFzdCwgTmdiUGFnaW5hdGlvbk5leHQsIE5nYlBhZ2luYXRpb25OdW1iZXIsXG4gIE5nYlBhZ2luYXRpb25QcmV2aW91c1xuXTtcblxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IERJUkVDVElWRVMsIGV4cG9ydHM6IERJUkVDVElWRVMsIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uTW9kdWxlIHtcbiAgLyoqXG4gICAqIEltcG9ydGluZyB3aXRoICcuZm9yUm9vdCgpJyBpcyBubyBsb25nZXIgbmVjZXNzYXJ5LCB5b3UgY2FuIHNpbXBseSBpbXBvcnQgdGhlIG1vZHVsZS5cbiAgICogV2lsbCBiZSByZW1vdmVkIGluIDQuMC4wLlxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCAzLjAuMFxuICAgKi9cbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7IHJldHVybiB7bmdNb2R1bGU6IE5nYlBhZ2luYXRpb25Nb2R1bGV9OyB9XG59XG4iLCJpbXBvcnQge09ic2VydmFibGUsIG1lcmdlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7c2hhcmUsIGZpbHRlciwgZGVsYXksIG1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY2xhc3MgVHJpZ2dlciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcGVuOiBzdHJpbmcsIHB1YmxpYyBjbG9zZT86IHN0cmluZykge1xuICAgIGlmICghY2xvc2UpIHtcbiAgICAgIHRoaXMuY2xvc2UgPSBvcGVuO1xuICAgIH1cbiAgfVxuXG4gIGlzTWFudWFsKCkgeyByZXR1cm4gdGhpcy5vcGVuID09PSAnbWFudWFsJyB8fCB0aGlzLmNsb3NlID09PSAnbWFudWFsJzsgfVxufVxuXG5jb25zdCBERUZBVUxUX0FMSUFTRVMgPSB7XG4gICdob3Zlcic6IFsnbW91c2VlbnRlcicsICdtb3VzZWxlYXZlJ10sXG4gICdmb2N1cyc6IFsnZm9jdXNpbicsICdmb2N1c291dCddLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVHJpZ2dlcnModHJpZ2dlcnM6IHN0cmluZywgYWxpYXNlcyA9IERFRkFVTFRfQUxJQVNFUyk6IFRyaWdnZXJbXSB7XG4gIGNvbnN0IHRyaW1tZWRUcmlnZ2VycyA9ICh0cmlnZ2VycyB8fCAnJykudHJpbSgpO1xuXG4gIGlmICh0cmltbWVkVHJpZ2dlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3QgcGFyc2VkVHJpZ2dlcnMgPSB0cmltbWVkVHJpZ2dlcnMuc3BsaXQoL1xccysvKS5tYXAodHJpZ2dlciA9PiB0cmlnZ2VyLnNwbGl0KCc6JykpLm1hcCgodHJpZ2dlclBhaXIpID0+IHtcbiAgICBsZXQgYWxpYXMgPSBhbGlhc2VzW3RyaWdnZXJQYWlyWzBdXSB8fCB0cmlnZ2VyUGFpcjtcbiAgICByZXR1cm4gbmV3IFRyaWdnZXIoYWxpYXNbMF0sIGFsaWFzWzFdKTtcbiAgfSk7XG5cbiAgY29uc3QgbWFudWFsVHJpZ2dlcnMgPSBwYXJzZWRUcmlnZ2Vycy5maWx0ZXIodHJpZ2dlclBhaXIgPT4gdHJpZ2dlclBhaXIuaXNNYW51YWwoKSk7XG5cbiAgaWYgKG1hbnVhbFRyaWdnZXJzLmxlbmd0aCA+IDEpIHtcbiAgICB0aHJvdyAnVHJpZ2dlcnMgcGFyc2UgZXJyb3I6IG9ubHkgb25lIG1hbnVhbCB0cmlnZ2VyIGlzIGFsbG93ZWQnO1xuICB9XG5cbiAgaWYgKG1hbnVhbFRyaWdnZXJzLmxlbmd0aCA9PT0gMSAmJiBwYXJzZWRUcmlnZ2Vycy5sZW5ndGggPiAxKSB7XG4gICAgdGhyb3cgJ1RyaWdnZXJzIHBhcnNlIGVycm9yOiBtYW51YWwgdHJpZ2dlciBjYW5cXCd0IGJlIG1peGVkIHdpdGggb3RoZXIgdHJpZ2dlcnMnO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlZFRyaWdnZXJzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZVRyaWdnZXJzKHJlbmRlcmVyOiBhbnksIG5hdGl2ZUVsZW1lbnQ6IGFueSwgdHJpZ2dlcnM6IFRyaWdnZXJbXSwgaXNPcGVuZWRGbjogKCkgPT4gYm9vbGVhbikge1xuICByZXR1cm4gbmV3IE9ic2VydmFibGU8Ym9vbGVhbj4oc3Vic2NyaWJlciA9PiB7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gW107XG4gICAgY29uc3Qgb3BlbkZuID0gKCkgPT4gc3Vic2NyaWJlci5uZXh0KHRydWUpO1xuICAgIGNvbnN0IGNsb3NlRm4gPSAoKSA9PiBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgIGNvbnN0IHRvZ2dsZUZuID0gKCkgPT4gc3Vic2NyaWJlci5uZXh0KCFpc09wZW5lZEZuKCkpO1xuXG4gICAgdHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlcjogVHJpZ2dlcikgPT4ge1xuICAgICAgaWYgKHRyaWdnZXIub3BlbiA9PT0gdHJpZ2dlci5jbG9zZSkge1xuICAgICAgICBsaXN0ZW5lcnMucHVzaChyZW5kZXJlci5saXN0ZW4obmF0aXZlRWxlbWVudCwgdHJpZ2dlci5vcGVuLCB0b2dnbGVGbikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICByZW5kZXJlci5saXN0ZW4obmF0aXZlRWxlbWVudCwgdHJpZ2dlci5vcGVuLCBvcGVuRm4pLFxuICAgICAgICAgICAgcmVuZGVyZXIubGlzdGVuKG5hdGl2ZUVsZW1lbnQsIHRyaWdnZXIuY2xvc2UsIGNsb3NlRm4pKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiAoKSA9PiB7IGxpc3RlbmVycy5mb3JFYWNoKHVuc3Vic2NyaWJlRm4gPT4gdW5zdWJzY3JpYmVGbigpKTsgfTtcbiAgfSk7XG59XG5cbmNvbnN0IGRlbGF5T3JOb29wID0gPFQ+KHRpbWU6IG51bWJlcikgPT4gdGltZSA+IDAgPyBkZWxheTxUPih0aW1lKSA6IChhOiBPYnNlcnZhYmxlPFQ+KSA9PiBhO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJpZ2dlckRlbGF5KG9wZW5EZWxheTogbnVtYmVyLCBjbG9zZURlbGF5OiBudW1iZXIsIGlzT3BlbmVkRm46ICgpID0+IGJvb2xlYW4pIHtcbiAgcmV0dXJuIChpbnB1dCQ6IE9ic2VydmFibGU8Ym9vbGVhbj4pID0+IHtcbiAgICBsZXQgcGVuZGluZyA9IG51bGw7XG4gICAgY29uc3QgZmlsdGVyZWRJbnB1dCQgPSBpbnB1dCQucGlwZShcbiAgICAgICAgbWFwKG9wZW4gPT4gKHtvcGVufSkpLCBmaWx0ZXIoZXZlbnQgPT4ge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRseU9wZW4gPSBpc09wZW5lZEZuKCk7XG4gICAgICAgICAgaWYgKGN1cnJlbnRseU9wZW4gIT09IGV2ZW50Lm9wZW4gJiYgKCFwZW5kaW5nIHx8IHBlbmRpbmcub3BlbiA9PT0gY3VycmVudGx5T3BlbikpIHtcbiAgICAgICAgICAgIHBlbmRpbmcgPSBldmVudDtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocGVuZGluZyAmJiBwZW5kaW5nLm9wZW4gIT09IGV2ZW50Lm9wZW4pIHtcbiAgICAgICAgICAgIHBlbmRpbmcgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pLFxuICAgICAgICBzaGFyZSgpKTtcbiAgICBjb25zdCBkZWxheWVkT3BlbiQgPSBmaWx0ZXJlZElucHV0JC5waXBlKGZpbHRlcihldmVudCA9PiBldmVudC5vcGVuKSwgZGVsYXlPck5vb3Aob3BlbkRlbGF5KSk7XG4gICAgY29uc3QgZGVsYXllZENsb3NlJCA9IGZpbHRlcmVkSW5wdXQkLnBpcGUoZmlsdGVyKGV2ZW50ID0+ICFldmVudC5vcGVuKSwgZGVsYXlPck5vb3AoY2xvc2VEZWxheSkpO1xuICAgIHJldHVybiBtZXJnZShkZWxheWVkT3BlbiQsIGRlbGF5ZWRDbG9zZSQpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50ID09PSBwZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgcGVuZGluZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50Lm9wZW4gIT09IGlzT3BlbmVkRm4oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1hcChldmVudCA9PiBldmVudC5vcGVuKSk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW5Ub1RyaWdnZXJzKFxuICAgIHJlbmRlcmVyOiBhbnksIG5hdGl2ZUVsZW1lbnQ6IGFueSwgdHJpZ2dlcnM6IHN0cmluZywgaXNPcGVuZWRGbjogKCkgPT4gYm9vbGVhbiwgb3BlbkZuLCBjbG9zZUZuLCBvcGVuRGVsYXkgPSAwLFxuICAgIGNsb3NlRGVsYXkgPSAwKSB7XG4gIGNvbnN0IHBhcnNlZFRyaWdnZXJzID0gcGFyc2VUcmlnZ2Vycyh0cmlnZ2Vycyk7XG5cbiAgaWYgKHBhcnNlZFRyaWdnZXJzLmxlbmd0aCA9PT0gMSAmJiBwYXJzZWRUcmlnZ2Vyc1swXS5pc01hbnVhbCgpKSB7XG4gICAgcmV0dXJuICgpID0+IHt9O1xuICB9XG5cbiAgY29uc3Qgc3Vic2NyaXB0aW9uID0gb2JzZXJ2ZVRyaWdnZXJzKHJlbmRlcmVyLCBuYXRpdmVFbGVtZW50LCBwYXJzZWRUcmlnZ2VycywgaXNPcGVuZWRGbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHRyaWdnZXJEZWxheShvcGVuRGVsYXksIGNsb3NlRGVsYXksIGlzT3BlbmVkRm4pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShvcGVuID0+IChvcGVuID8gb3BlbkZuKCkgOiBjbG9zZUZuKCkpKTtcblxuICByZXR1cm4gKCkgPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG59XG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtQbGFjZW1lbnRBcnJheX0gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiUG9wb3ZlciBkaXJlY3RpdmUuXG4gKiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LCBhbmQgY3VzdG9taXplIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW5cbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgcG9wb3ZlcnMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIE5nYlBvcG92ZXJDb25maWcge1xuICBhdXRvQ2xvc2U6IGJvb2xlYW4gfCAnaW5zaWRlJyB8ICdvdXRzaWRlJyA9IHRydWU7XG4gIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXkgPSAnYXV0byc7XG4gIHRyaWdnZXJzID0gJ2NsaWNrJztcbiAgY29udGFpbmVyOiBzdHJpbmc7XG4gIGRpc2FibGVQb3BvdmVyID0gZmFsc2U7XG4gIHBvcG92ZXJDbGFzczogc3RyaW5nO1xuICBvcGVuRGVsYXkgPSAwO1xuICBjbG9zZURlbGF5ID0gMDtcbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgT25DaGFuZ2VzLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBSZW5kZXJlcjIsXG4gIENvbXBvbmVudFJlZixcbiAgRWxlbWVudFJlZixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgTmdab25lLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge2xpc3RlblRvVHJpZ2dlcnN9IGZyb20gJy4uL3V0aWwvdHJpZ2dlcnMnO1xuaW1wb3J0IHtuZ2JBdXRvQ2xvc2V9IGZyb20gJy4uL3V0aWwvYXV0b2Nsb3NlJztcbmltcG9ydCB7cG9zaXRpb25FbGVtZW50cywgUGxhY2VtZW50QXJyYXl9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xuaW1wb3J0IHtQb3B1cFNlcnZpY2V9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xuXG5pbXBvcnQge05nYlBvcG92ZXJDb25maWd9IGZyb20gJy4vcG9wb3Zlci1jb25maWcnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLXBvcG92ZXItd2luZG93JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHsnW2NsYXNzXSc6ICdcInBvcG92ZXJcIiArIChwb3BvdmVyQ2xhc3MgPyBcIiBcIiArIHBvcG92ZXJDbGFzcyA6IFwiXCIpJywgJ3JvbGUnOiAndG9vbHRpcCcsICdbaWRdJzogJ2lkJ30sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+XG4gICAgPGgzIGNsYXNzPVwicG9wb3Zlci1oZWFkZXJcIiAqbmdJZj1cInRpdGxlICE9IG51bGxcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjc2ltcGxlVGl0bGU+e3t0aXRsZX19PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJpc1RpdGxlVGVtcGxhdGUoKSA/IHRpdGxlIDogc2ltcGxlVGl0bGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiY29udGV4dFwiPjwvbmctdGVtcGxhdGU+XG4gICAgPC9oMz5cbiAgICA8ZGl2IGNsYXNzPVwicG9wb3Zlci1ib2R5XCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PmAsXG4gIHN0eWxlVXJsczogWycuL3BvcG92ZXIuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5nYlBvcG92ZXJXaW5kb3cge1xuICBASW5wdXQoKSB0aXRsZTogdW5kZWZpbmVkIHwgc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KCkgcG9wb3ZlckNsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbnRleHQ6IGFueTtcblxuICBpc1RpdGxlVGVtcGxhdGUoKSB7IHJldHVybiB0aGlzLnRpdGxlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWY7IH1cbn1cblxuLyoqXG4gKiBBIGxpZ2h0d2VpZ2h0LCBleHRlbnNpYmxlIGRpcmVjdGl2ZSBmb3IgZmFuY3kgcG9wb3ZlciBjcmVhdGlvbi5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdiUG9wb3Zlcl0nLCBleHBvcnRBczogJ25nYlBvcG92ZXInfSlcbmV4cG9ydCBjbGFzcyBOZ2JQb3BvdmVyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcG9wb3ZlciBzaG91bGQgYmUgY2xvc2VkIG9uIEVzY2FwZSBrZXkgYW5kIGluc2lkZS9vdXRzaWRlIGNsaWNrcy5cbiAgICpcbiAgICogLSB0cnVlIChkZWZhdWx0KTogY2xvc2VzIG9uIGJvdGggb3V0c2lkZSBhbmQgaW5zaWRlIGNsaWNrcyBhcyB3ZWxsIGFzIEVzY2FwZSBwcmVzc2VzXG4gICAqIC0gZmFsc2U6IGRpc2FibGVzIHRoZSBhdXRvQ2xvc2UgZmVhdHVyZSAoTkI6IHRyaWdnZXJzIHN0aWxsIGFwcGx5KVxuICAgKiAtICdpbnNpZGUnOiBjbG9zZXMgb24gaW5zaWRlIGNsaWNrcyBhcyB3ZWxsIGFzIEVzY2FwZSBwcmVzc2VzXG4gICAqIC0gJ291dHNpZGUnOiBjbG9zZXMgb24gb3V0c2lkZSBjbGlja3MgKHNvbWV0aW1lcyBhbHNvIGFjaGlldmFibGUgdGhyb3VnaCB0cmlnZ2VycylcbiAgICogYXMgd2VsbCBhcyBFc2NhcGUgcHJlc3Nlc1xuICAgKlxuICAgKiBAc2luY2UgMy4wLjBcbiAgICovXG4gIEBJbnB1dCgpIGF1dG9DbG9zZTogYm9vbGVhbiB8ICdpbnNpZGUnIHwgJ291dHNpZGUnO1xuICAvKipcbiAgICogQ29udGVudCB0byBiZSBkaXNwbGF5ZWQgYXMgcG9wb3Zlci4gSWYgdGl0bGUgYW5kIGNvbnRlbnQgYXJlIGVtcHR5LCB0aGUgcG9wb3ZlciB3b24ndCBvcGVuLlxuICAgKi9cbiAgQElucHV0KCkgbmdiUG9wb3Zlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcbiAgLyoqXG4gICAqIFRpdGxlIG9mIGEgcG9wb3Zlci4gSWYgdGl0bGUgYW5kIGNvbnRlbnQgYXJlIGVtcHR5LCB0aGUgcG9wb3ZlciB3b24ndCBvcGVuLlxuICAgKi9cbiAgQElucHV0KCkgcG9wb3ZlclRpdGxlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuICAvKipcbiAgICAqIFBsYWNlbWVudCBvZiBhIHBvcG92ZXIgYWNjZXB0czpcbiAgICAqICAgIFwidG9wXCIsIFwidG9wLWxlZnRcIiwgXCJ0b3AtcmlnaHRcIiwgXCJib3R0b21cIiwgXCJib3R0b20tbGVmdFwiLCBcImJvdHRvbS1yaWdodFwiLFxuICAgICogICAgXCJsZWZ0XCIsIFwibGVmdC10b3BcIiwgXCJsZWZ0LWJvdHRvbVwiLCBcInJpZ2h0XCIsIFwicmlnaHQtdG9wXCIsIFwicmlnaHQtYm90dG9tXCIsXG4gICAgKiAgYXJyYXkgb3IgYSBzcGFjZSBzZXBhcmF0ZWQgc3RyaW5nIG9mIGFib3ZlIHZhbHVlc1xuICAgICovXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogUGxhY2VtZW50QXJyYXk7XG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgZXZlbnRzIHRoYXQgc2hvdWxkIHRyaWdnZXIuIFN1cHBvcnRzIGEgc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgZXZlbnQgbmFtZXMuXG4gICAqL1xuICBASW5wdXQoKSB0cmlnZ2Vyczogc3RyaW5nO1xuICAvKipcbiAgICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSBwb3BvdmVyIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cbiAgICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgXCJib2R5XCIuXG4gICAqL1xuICBASW5wdXQoKSBjb250YWluZXI6IHN0cmluZztcbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIGEgZ2l2ZW4gcG9wb3ZlciBpcyBkaXNhYmxlZCBhbmQgc2hvdWxkIG5vdCBiZSBkaXNwbGF5ZWQuXG4gICAqXG4gICAqIEBzaW5jZSAxLjEuMFxuICAgKi9cbiAgQElucHV0KCkgZGlzYWJsZVBvcG92ZXI6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBjbGFzcyBhcHBsaWVkIHRvIG5nYi1wb3BvdmVyLXdpbmRvd1xuICAgKlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIEBJbnB1dCgpIHBvcG92ZXJDbGFzczogc3RyaW5nO1xuICAvKipcbiAgICogT3BlbmluZyBkZWxheSBpbiBtcy4gV29ya3Mgb25seSBmb3Igbm9uLW1hbnVhbCBvcGVuaW5nIHRyaWdnZXJzLlxuICAgKlxuICAgKiBAc2luY2UgNC4xLjBcbiAgICovXG4gIEBJbnB1dCgpIG9wZW5EZWxheTogbnVtYmVyO1xuICAvKipcbiAgICogQ2xvc2luZyBkZWxheSBpbiBtcy4gV29ya3Mgb25seSBmb3Igbm9uLW1hbnVhbCBjbG9zaW5nIHRyaWdnZXJzLlxuICAgKlxuICAgKiBAc2luY2UgNC4xLjBcbiAgICovXG4gIEBJbnB1dCgpIGNsb3NlRGVsYXk6IG51bWJlcjtcbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIHBvcG92ZXIgaXMgc2hvd25cbiAgICovXG4gIEBPdXRwdXQoKSBzaG93biA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIHBvcG92ZXIgaXMgaGlkZGVuXG4gICAqL1xuICBAT3V0cHV0KCkgaGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX25nYlBvcG92ZXJXaW5kb3dJZCA9IGBuZ2ItcG9wb3Zlci0ke25leHRJZCsrfWA7XG4gIHByaXZhdGUgX3BvcHVwU2VydmljZTogUG9wdXBTZXJ2aWNlPE5nYlBvcG92ZXJXaW5kb3c+O1xuICBwcml2YXRlIF93aW5kb3dSZWY6IENvbXBvbmVudFJlZjxOZ2JQb3BvdmVyV2luZG93PjtcbiAgcHJpdmF0ZSBfdW5yZWdpc3Rlckxpc3RlbmVyc0ZuO1xuICBwcml2YXRlIF96b25lU3Vic2NyaXB0aW9uOiBhbnk7XG4gIHByaXZhdGUgX2lzRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZVBvcG92ZXIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoIXRoaXMubmdiUG9wb3ZlciAmJiAhdGhpcy5wb3BvdmVyVGl0bGUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZiwgY29uZmlnOiBOZ2JQb3BvdmVyQ29uZmlnLFxuICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksIHByaXZhdGUgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuYXV0b0Nsb3NlID0gY29uZmlnLmF1dG9DbG9zZTtcbiAgICB0aGlzLnBsYWNlbWVudCA9IGNvbmZpZy5wbGFjZW1lbnQ7XG4gICAgdGhpcy50cmlnZ2VycyA9IGNvbmZpZy50cmlnZ2VycztcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XG4gICAgdGhpcy5kaXNhYmxlUG9wb3ZlciA9IGNvbmZpZy5kaXNhYmxlUG9wb3ZlcjtcbiAgICB0aGlzLnBvcG92ZXJDbGFzcyA9IGNvbmZpZy5wb3BvdmVyQ2xhc3M7XG4gICAgdGhpcy5vcGVuRGVsYXkgPSBjb25maWcub3BlbkRlbGF5O1xuICAgIHRoaXMuY2xvc2VEZWxheSA9IGNvbmZpZy5jbG9zZURlbGF5O1xuICAgIHRoaXMuX3BvcHVwU2VydmljZSA9IG5ldyBQb3B1cFNlcnZpY2U8TmdiUG9wb3ZlcldpbmRvdz4oXG4gICAgICAgIE5nYlBvcG92ZXJXaW5kb3csIGluamVjdG9yLCB2aWV3Q29udGFpbmVyUmVmLCBfcmVuZGVyZXIsIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcik7XG5cbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gX25nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3dpbmRvd1JlZikge1xuICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgdGhpcy5wbGFjZW1lbnQsXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknLCAnYnMtcG9wb3ZlcicpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW5zIGFuIGVsZW1lbnTDosKAwplzIHBvcG92ZXIuIFRoaXMgaXMgY29uc2lkZXJlZCBhIMOiwoDCnG1hbnVhbMOiwoDCnSB0cmlnZ2VyaW5nIG9mIHRoZSBwb3BvdmVyLlxuICAgKiBUaGUgY29udGV4dCBpcyBhbiBvcHRpb25hbCB2YWx1ZSB0byBiZSBpbmplY3RlZCBpbnRvIHRoZSBwb3BvdmVyIHRlbXBsYXRlIHdoZW4gaXQgaXMgY3JlYXRlZC5cbiAgICovXG4gIG9wZW4oY29udGV4dD86IGFueSkge1xuICAgIGlmICghdGhpcy5fd2luZG93UmVmICYmICF0aGlzLl9pc0Rpc2FibGVkKCkpIHtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IHRoaXMuX3BvcHVwU2VydmljZS5vcGVuKHRoaXMubmdiUG9wb3ZlciwgY29udGV4dCk7XG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UudGl0bGUgPSB0aGlzLnBvcG92ZXJUaXRsZTtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5wb3BvdmVyQ2xhc3MgPSB0aGlzLnBvcG92ZXJDbGFzcztcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5pZCA9IHRoaXMuX25nYlBvcG92ZXJXaW5kb3dJZDtcblxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FyaWEtZGVzY3JpYmVkYnknLCB0aGlzLl9uZ2JQb3BvdmVyV2luZG93SWQpO1xuXG4gICAgICBpZiAodGhpcy5jb250YWluZXIgPT09ICdib2R5Jykge1xuICAgICAgICB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29udGFpbmVyKS5hcHBlbmRDaGlsZCh0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGFwcGx5IHN0eWxpbmcgdG8gc2V0IGJhc2ljIGNzcy1jbGFzc2VzIG9uIHRhcmdldCBlbGVtZW50LCBiZWZvcmUgZ29pbmcgZm9yIHBvc2l0aW9uaW5nXG4gICAgICB0aGlzLl93aW5kb3dSZWYuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgIG5nYkF1dG9DbG9zZShcbiAgICAgICAgICB0aGlzLl9uZ1pvbmUsIHRoaXMuX2RvY3VtZW50LCB0aGlzLmF1dG9DbG9zZSwgKCkgPT4gdGhpcy5jbG9zZSgpLCB0aGlzLmhpZGRlbixcbiAgICAgICAgICBbdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnRdKTtcbiAgICAgIHRoaXMuc2hvd24uZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgYW4gZWxlbWVudMOiwoDCmXMgcG9wb3Zlci4gVGhpcyBpcyBjb25zaWRlcmVkIGEgw6LCgMKcbWFudWFsw6LCgMKdIHRyaWdnZXJpbmcgb2YgdGhlIHBvcG92ZXIuXG4gICAqL1xuICBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fd2luZG93UmVmKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYXJpYS1kZXNjcmliZWRieScpO1xuICAgICAgdGhpcy5fcG9wdXBTZXJ2aWNlLmNsb3NlKCk7XG4gICAgICB0aGlzLl93aW5kb3dSZWYgPSBudWxsO1xuICAgICAgdGhpcy5oaWRkZW4uZW1pdCgpO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgYW4gZWxlbWVudMOiwoDCmXMgcG9wb3Zlci4gVGhpcyBpcyBjb25zaWRlcmVkIGEgw6LCgMKcbWFudWFsw6LCgMKdIHRyaWdnZXJpbmcgb2YgdGhlIHBvcG92ZXIuXG4gICAqL1xuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3dpbmRvd1JlZikge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgcG9wb3ZlciBpcyBjdXJyZW50bHkgYmVpbmcgc2hvd25cbiAgICovXG4gIGlzT3BlbigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3dpbmRvd1JlZiAhPSBudWxsOyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fdW5yZWdpc3Rlckxpc3RlbmVyc0ZuID0gbGlzdGVuVG9UcmlnZ2VycyhcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIsIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy50cmlnZ2VycywgdGhpcy5pc09wZW4uYmluZCh0aGlzKSwgdGhpcy5vcGVuLmJpbmQodGhpcyksXG4gICAgICAgIHRoaXMuY2xvc2UuYmluZCh0aGlzKSwgK3RoaXMub3BlbkRlbGF5LCArdGhpcy5jbG9zZURlbGF5KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAvLyBjbG9zZSBwb3BvdmVyIGlmIHRpdGxlIGFuZCBjb250ZW50IGJlY29tZSBlbXB0eSwgb3IgZGlzYWJsZVBvcG92ZXIgc2V0IHRvIHRydWVcbiAgICBpZiAoKGNoYW5nZXNbJ25nYlBvcG92ZXInXSB8fCBjaGFuZ2VzWydwb3BvdmVyVGl0bGUnXSB8fCBjaGFuZ2VzWydkaXNhYmxlUG9wb3ZlciddKSAmJiB0aGlzLl9pc0Rpc2FibGVkKCkpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgLy8gVGhpcyBjaGVjayBpcyBuZWVkZWQgYXMgaXQgbWlnaHQgaGFwcGVuIHRoYXQgbmdPbkRlc3Ryb3kgaXMgY2FsbGVkIGJlZm9yZSBuZ09uSW5pdFxuICAgIC8vIHVuZGVyIGNlcnRhaW4gY29uZGl0aW9ucywgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC9pc3N1ZXMvMjE5OVxuICAgIGlmICh0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4pIHtcbiAgICAgIHRoaXMuX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbigpO1xuICAgIH1cbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge05nYlBvcG92ZXIsIE5nYlBvcG92ZXJXaW5kb3d9IGZyb20gJy4vcG9wb3Zlcic7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZXhwb3J0IHtOZ2JQb3BvdmVyfSBmcm9tICcuL3BvcG92ZXInO1xuZXhwb3J0IHtOZ2JQb3BvdmVyQ29uZmlnfSBmcm9tICcuL3BvcG92ZXItY29uZmlnJztcbmV4cG9ydCB7UGxhY2VtZW50fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdiUG9wb3ZlciwgTmdiUG9wb3ZlcldpbmRvd10sXG4gIGV4cG9ydHM6IFtOZ2JQb3BvdmVyXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nYlBvcG92ZXJXaW5kb3ddXG59KVxuZXhwb3J0IGNsYXNzIE5nYlBvcG92ZXJNb2R1bGUge1xuICAvKipcbiAgICogSW1wb3J0aW5nIHdpdGggJy5mb3JSb290KCknIGlzIG5vIGxvbmdlciBuZWNlc3NhcnksIHlvdSBjYW4gc2ltcGx5IGltcG9ydCB0aGUgbW9kdWxlLlxuICAgKiBXaWxsIGJlIHJlbW92ZWQgaW4gNC4wLjAuXG4gICAqXG4gICAqIEBkZXByZWNhdGVkIDMuMC4wXG4gICAqL1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiUG9wb3Zlck1vZHVsZX07IH1cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiUHJvZ3Jlc3NiYXIgY29tcG9uZW50LlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIHByb2dyZXNzIGJhcnMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIE5nYlByb2dyZXNzYmFyQ29uZmlnIHtcbiAgbWF4ID0gMTAwO1xuICBhbmltYXRlZCA9IGZhbHNlO1xuICBzdHJpcGVkID0gZmFsc2U7XG4gIHR5cGU6IHN0cmluZztcbiAgc2hvd1ZhbHVlID0gZmFsc2U7XG4gIGhlaWdodDogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2dldFZhbHVlSW5SYW5nZX0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7TmdiUHJvZ3Jlc3NiYXJDb25maWd9IGZyb20gJy4vcHJvZ3Jlc3NiYXItY29uZmlnJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgdGhhdCBjYW4gYmUgdXNlZCB0byBwcm92aWRlIGZlZWRiYWNrIG9uIHRoZSBwcm9ncmVzcyBvZiBhIHdvcmtmbG93IG9yIGFuIGFjdGlvbi5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLXByb2dyZXNzYmFyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInByb2dyZXNzXCIgW3N0eWxlLmhlaWdodF09XCJoZWlnaHRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXJ7e3R5cGUgPyAnIGJnLScgKyB0eXBlIDogJyd9fXt7YW5pbWF0ZWQgPyAnIHByb2dyZXNzLWJhci1hbmltYXRlZCcgOiAnJ319e3tzdHJpcGVkID9cbiAgICAnIHByb2dyZXNzLWJhci1zdHJpcGVkJyA6ICcnfX1cIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBbc3R5bGUud2lkdGguJV09XCJnZXRQZXJjZW50VmFsdWUoKVwiXG4gICAgW2F0dHIuYXJpYS12YWx1ZW5vd109XCJnZXRWYWx1ZSgpXCIgYXJpYS12YWx1ZW1pbj1cIjBcIiBbYXR0ci5hcmlhLXZhbHVlbWF4XT1cIm1heFwiPlxuICAgICAgICA8c3BhbiAqbmdJZj1cInNob3dWYWx1ZVwiIGkxOG49XCJAQG5nYi5wcm9ncmVzc2Jhci52YWx1ZVwiPnt7Z2V0UGVyY2VudFZhbHVlKCl9fSU8L3NwYW4+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTmdiUHJvZ3Jlc3NiYXIge1xuICAvKipcbiAgICogTWF4aW1hbCB2YWx1ZSB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHByb2dyZXNzYmFyLlxuICAgKi9cbiAgQElucHV0KCkgbWF4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBzdHJpcGVzIG9mIHRoZSBwcm9ncmVzcyBiYXIgc2hvdWxkIGJlIGFuaW1hdGVkLiBUYWtlcyBlZmZlY3Qgb25seSBmb3IgYnJvd3NlcnNcbiAgICogc3VwcG9ydGluZyBDU1MzIGFuaW1hdGlvbnMsIGFuZCBpZiBzdHJpcGVkIGlzIHRydWUuXG4gICAqL1xuICBASW5wdXQoKSBhbmltYXRlZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgYSBwcm9ncmVzcyBiYXIgc2hvdWxkIGJlIGRpc3BsYXllZCBhcyBzdHJpcGVkLlxuICAgKi9cbiAgQElucHV0KCkgc3RyaXBlZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIGN1cnJlbnQgcGVyY2VudGFnZSB2YWx1ZSBzaG91bGQgYmUgc2hvd24uXG4gICAqL1xuICBASW5wdXQoKSBzaG93VmFsdWU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFR5cGUgb2YgcHJvZ3Jlc3MgYmFyLCBjYW4gYmUgb25lIG9mIFwic3VjY2Vzc1wiLCBcImluZm9cIiwgXCJ3YXJuaW5nXCIgb3IgXCJkYW5nZXJcIi5cbiAgICovXG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcblxuICAvKipcbiAgICogQ3VycmVudCB2YWx1ZSB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHByb2dyZXNzYmFyLiBTaG91bGQgYmUgc21hbGxlciBvciBlcXVhbCB0byBcIm1heFwiIHZhbHVlLlxuICAgKi9cbiAgQElucHV0KCkgdmFsdWUgPSAwO1xuXG4gIC8qKlxuICAgKiBIZWlnaHQgb2YgdGhlIHByb2dyZXNzIGJhci4gQWNjZXB0cyBhbnkgdmFsaWQgQ1NTIGhlaWdodCB2YWx1ZXMsIGV4LiAnMnJlbSdcbiAgICovXG4gIEBJbnB1dCgpIGhlaWdodDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiUHJvZ3Jlc3NiYXJDb25maWcpIHtcbiAgICB0aGlzLm1heCA9IGNvbmZpZy5tYXg7XG4gICAgdGhpcy5hbmltYXRlZCA9IGNvbmZpZy5hbmltYXRlZDtcbiAgICB0aGlzLnN0cmlwZWQgPSBjb25maWcuc3RyaXBlZDtcbiAgICB0aGlzLnR5cGUgPSBjb25maWcudHlwZTtcbiAgICB0aGlzLnNob3dWYWx1ZSA9IGNvbmZpZy5zaG93VmFsdWU7XG4gICAgdGhpcy5oZWlnaHQgPSBjb25maWcuaGVpZ2h0O1xuICB9XG5cbiAgZ2V0VmFsdWUoKSB7IHJldHVybiBnZXRWYWx1ZUluUmFuZ2UodGhpcy52YWx1ZSwgdGhpcy5tYXgpOyB9XG5cbiAgZ2V0UGVyY2VudFZhbHVlKCkgeyByZXR1cm4gMTAwICogdGhpcy5nZXRWYWx1ZSgpIC8gdGhpcy5tYXg7IH1cbn1cbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7TmdiUHJvZ3Jlc3NiYXJ9IGZyb20gJy4vcHJvZ3Jlc3NiYXInO1xuXG5leHBvcnQge05nYlByb2dyZXNzYmFyfSBmcm9tICcuL3Byb2dyZXNzYmFyJztcbmV4cG9ydCB7TmdiUHJvZ3Jlc3NiYXJDb25maWd9IGZyb20gJy4vcHJvZ3Jlc3NiYXItY29uZmlnJztcblxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IFtOZ2JQcm9ncmVzc2Jhcl0sIGV4cG9ydHM6IFtOZ2JQcm9ncmVzc2Jhcl0sIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdfSlcbmV4cG9ydCBjbGFzcyBOZ2JQcm9ncmVzc2Jhck1vZHVsZSB7XG4gIC8qKlxuICAgKiBJbXBvcnRpbmcgd2l0aCAnLmZvclJvb3QoKScgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSwgeW91IGNhbiBzaW1wbHkgaW1wb3J0IHRoZSBtb2R1bGUuXG4gICAqIFdpbGwgYmUgcmVtb3ZlZCBpbiA0LjAuMC5cbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcbiAgICovXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JQcm9ncmVzc2Jhck1vZHVsZX07IH1cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBzZXJ2aWNlIGZvciB0aGUgTmdiUmF0aW5nIGNvbXBvbmVudC5cbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxuICogb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZSByYXRpbmdzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBOZ2JSYXRpbmdDb25maWcge1xuICBtYXggPSAxMDtcbiAgcmVhZG9ubHkgPSBmYWxzZTtcbiAgcmVzZXR0YWJsZSA9IGZhbHNlO1xufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkluaXQsXG4gIFRlbXBsYXRlUmVmLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIENvbnRlbnRDaGlsZCxcbiAgZm9yd2FyZFJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYlJhdGluZ0NvbmZpZ30gZnJvbSAnLi9yYXRpbmctY29uZmlnJztcbmltcG9ydCB7Z2V0VmFsdWVJblJhbmdlfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8qKlxuICogQ29udGV4dCBmb3IgdGhlIGN1c3RvbSBzdGFyIGRpc3BsYXkgdGVtcGxhdGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdGFyVGVtcGxhdGVDb250ZXh0IHtcbiAgLyoqXG4gICAqIFN0YXIgZmlsbCBwZXJjZW50YWdlLiBBbiBpbnRlZ2VyIHZhbHVlIGJldHdlZW4gMCBhbmQgMTAwXG4gICAqL1xuICBmaWxsOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBzdGFyLlxuICAgKi9cbiAgaW5kZXg6IG51bWJlcjtcbn1cblxuY29uc3QgTkdCX1JBVElOR19WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nYlJhdGluZyksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKipcbiAqIFJhdGluZyBkaXJlY3RpdmUgdGhhdCB3aWxsIHRha2UgY2FyZSBvZiB2aXN1YWxpc2luZyBhIHN0YXIgcmF0aW5nIGJhci5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLXJhdGluZycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ2QtaW5saW5lLWZsZXgnLFxuICAgICd0YWJpbmRleCc6ICcwJyxcbiAgICAncm9sZSc6ICdzbGlkZXInLFxuICAgICdhcmlhLXZhbHVlbWluJzogJzAnLFxuICAgICdbYXR0ci5hcmlhLXZhbHVlbWF4XSc6ICdtYXgnLFxuICAgICdbYXR0ci5hcmlhLXZhbHVlbm93XSc6ICduZXh0UmF0ZScsXG4gICAgJ1thdHRyLmFyaWEtdmFsdWV0ZXh0XSc6ICdhcmlhVmFsdWVUZXh0KCknLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdyZWFkb25seSA/IHRydWUgOiBudWxsJyxcbiAgICAnKGJsdXIpJzogJ2hhbmRsZUJsdXIoKScsXG4gICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlEb3duKCRldmVudCknLFxuICAgICcobW91c2VsZWF2ZSknOiAncmVzZXQoKSdcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI3QgbGV0LWZpbGw9XCJmaWxsXCI+e3sgZmlsbCA9PT0gMTAwID8gJyYjOTczMzsnIDogJyYjOTczNDsnIH19PC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwiY29udGV4dHNcIiBsZXQtaW5kZXg9XCJpbmRleFwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+KHt7IGluZGV4IDwgbmV4dFJhdGUgPyAnKicgOiAnICcgfX0pPC9zcGFuPlxuICAgICAgPHNwYW4gKG1vdXNlZW50ZXIpPVwiZW50ZXIoaW5kZXggKyAxKVwiIChjbGljayk9XCJoYW5kbGVDbGljayhpbmRleCArIDEpXCIgW3N0eWxlLmN1cnNvcl09XCJyZWFkb25seSB8fCBkaXNhYmxlZCA/ICdkZWZhdWx0JyA6ICdwb2ludGVyJ1wiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwic3RhclRlbXBsYXRlIHx8IHN0YXJUZW1wbGF0ZUZyb21Db250ZW50IHx8IHRcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiY29udGV4dHNbaW5kZXhdXCI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L3NwYW4+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbTkdCX1JBVElOR19WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTmdiUmF0aW5nIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgT25Jbml0LCBPbkNoYW5nZXMge1xuICBjb250ZXh0czogU3RhclRlbXBsYXRlQ29udGV4dFtdID0gW107XG4gIGRpc2FibGVkID0gZmFsc2U7XG4gIG5leHRSYXRlOiBudW1iZXI7XG5cblxuICAvKipcbiAgICogTWF4aW1hbCByYXRpbmcgdGhhdCBjYW4gYmUgZ2l2ZW4gdXNpbmcgdGhpcyB3aWRnZXQuXG4gICAqL1xuICBASW5wdXQoKSBtYXg6IG51bWJlcjtcblxuICAvKipcbiAgICogQ3VycmVudCByYXRpbmcuIENhbiBiZSBhIGRlY2ltYWwgdmFsdWUgbGlrZSAzLjc1XG4gICAqL1xuICBASW5wdXQoKSByYXRlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIHJhdGluZyBjYW4gYmUgdXBkYXRlZC5cbiAgICovXG4gIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiByYXRpbmcgY2FuIGJlIHJlc2V0IHRvIDAgb24gbW91c2UgY2xpY2tcbiAgICovXG4gIEBJbnB1dCgpIHJlc2V0dGFibGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgdGVtcGxhdGUgdG8gb3ZlcnJpZGUgc3RhciBkaXNwbGF5LlxuICAgKiBBbHRlcm5hdGl2ZWx5IHB1dCBhIDxuZy10ZW1wbGF0ZT4gYXMgdGhlIG9ubHkgY2hpbGQgb2YgPG5nYi1yYXRpbmc+IGVsZW1lbnRcbiAgICovXG4gIEBJbnB1dCgpIHN0YXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8U3RhclRlbXBsYXRlQ29udGV4dD47XG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHN0YXJUZW1wbGF0ZUZyb21Db250ZW50OiBUZW1wbGF0ZVJlZjxTdGFyVGVtcGxhdGVDb250ZXh0PjtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZmlyZWQgd2hlbiBhIHVzZXIgaXMgaG92ZXJpbmcgb3ZlciBhIGdpdmVuIHJhdGluZy5cbiAgICogRXZlbnQncyBwYXlsb2FkIGVxdWFscyB0byB0aGUgcmF0aW5nIGJlaW5nIGhvdmVyZWQgb3Zlci5cbiAgICovXG4gIEBPdXRwdXQoKSBob3ZlciA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCBmaXJlZCB3aGVuIGEgdXNlciBzdG9wcyBob3ZlcmluZyBvdmVyIGEgZ2l2ZW4gcmF0aW5nLlxuICAgKiBFdmVudCdzIHBheWxvYWQgZXF1YWxzIHRvIHRoZSByYXRpbmcgb2YgdGhlIGxhc3QgaXRlbSBiZWluZyBob3ZlcmVkIG92ZXIuXG4gICAqL1xuICBAT3V0cHV0KCkgbGVhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZmlyZWQgd2hlbiBhIHVzZXIgc2VsZWN0cyBhIG5ldyByYXRpbmcuXG4gICAqIEV2ZW50J3MgcGF5bG9hZCBlcXVhbHMgdG8gdGhlIG5ld2x5IHNlbGVjdGVkIHJhdGluZy5cbiAgICovXG4gIEBPdXRwdXQoKSByYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KHRydWUpO1xuXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiUmF0aW5nQ29uZmlnLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLm1heCA9IGNvbmZpZy5tYXg7XG4gICAgdGhpcy5yZWFkb25seSA9IGNvbmZpZy5yZWFkb25seTtcbiAgfVxuXG4gIGFyaWFWYWx1ZVRleHQoKSB7IHJldHVybiBgJHt0aGlzLm5leHRSYXRlfSBvdXQgb2YgJHt0aGlzLm1heH1gOyB9XG5cbiAgZW50ZXIodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghdGhpcy5yZWFkb25seSAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fdXBkYXRlU3RhdGUodmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLmhvdmVyLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgaGFuZGxlQmx1cigpIHsgdGhpcy5vblRvdWNoZWQoKTsgfVxuXG4gIGhhbmRsZUNsaWNrKHZhbHVlOiBudW1iZXIpIHsgdGhpcy51cGRhdGUodGhpcy5yZXNldHRhYmxlICYmIHRoaXMucmF0ZSA9PT0gdmFsdWUgPyAwIDogdmFsdWUpOyB9XG5cbiAgaGFuZGxlS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgIGNhc2UgS2V5LkFycm93RG93bjpcbiAgICAgIGNhc2UgS2V5LkFycm93TGVmdDpcbiAgICAgICAgdGhpcy51cGRhdGUodGhpcy5yYXRlIC0gMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuQXJyb3dVcDpcbiAgICAgIGNhc2UgS2V5LkFycm93UmlnaHQ6XG4gICAgICAgIHRoaXMudXBkYXRlKHRoaXMucmF0ZSArIDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkhvbWU6XG4gICAgICAgIHRoaXMudXBkYXRlKDApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkVuZDpcbiAgICAgICAgdGhpcy51cGRhdGUodGhpcy5tYXgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBub3RlICdyZXR1cm4nIGluIGRlZmF1bHQgY2FzZVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ3JhdGUnXSkge1xuICAgICAgdGhpcy51cGRhdGUodGhpcy5yYXRlKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRleHRzID0gQXJyYXkuZnJvbSh7bGVuZ3RoOiB0aGlzLm1heH0sICh2LCBrKSA9PiAoe2ZpbGw6IDAsIGluZGV4OiBrfSkpO1xuICAgIHRoaXMuX3VwZGF0ZVN0YXRlKHRoaXMucmF0ZSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMub25DaGFuZ2UgPSBmbjsgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vblRvdWNoZWQgPSBmbjsgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMubGVhdmUuZW1pdCh0aGlzLm5leHRSYXRlKTtcbiAgICB0aGlzLl91cGRhdGVTdGF0ZSh0aGlzLnJhdGUpO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7IHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkOyB9XG5cbiAgdXBkYXRlKHZhbHVlOiBudW1iZXIsIGludGVybmFsQ2hhbmdlID0gdHJ1ZSk6IHZvaWQge1xuICAgIGNvbnN0IG5ld1JhdGUgPSBnZXRWYWx1ZUluUmFuZ2UodmFsdWUsIHRoaXMubWF4LCAwKTtcbiAgICBpZiAoIXRoaXMucmVhZG9ubHkgJiYgIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy5yYXRlICE9PSBuZXdSYXRlKSB7XG4gICAgICB0aGlzLnJhdGUgPSBuZXdSYXRlO1xuICAgICAgdGhpcy5yYXRlQ2hhbmdlLmVtaXQodGhpcy5yYXRlKTtcbiAgICB9XG4gICAgaWYgKGludGVybmFsQ2hhbmdlKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMucmF0ZSk7XG4gICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIH1cbiAgICB0aGlzLl91cGRhdGVTdGF0ZSh0aGlzLnJhdGUpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMudXBkYXRlKHZhbHVlLCBmYWxzZSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRGaWxsVmFsdWUoaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgZGlmZiA9IHRoaXMubmV4dFJhdGUgLSBpbmRleDtcblxuICAgIGlmIChkaWZmID49IDEpIHtcbiAgICAgIHJldHVybiAxMDA7XG4gICAgfVxuICAgIGlmIChkaWZmIDwgMSAmJiBkaWZmID4gMCkge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KChkaWZmICogMTAwKS50b0ZpeGVkKDIpLCAxMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTdGF0ZShuZXh0VmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMubmV4dFJhdGUgPSBuZXh0VmFsdWU7XG4gICAgdGhpcy5jb250ZXh0cy5mb3JFYWNoKChjb250ZXh0LCBpbmRleCkgPT4gY29udGV4dC5maWxsID0gdGhpcy5fZ2V0RmlsbFZhbHVlKGluZGV4KSk7XG4gIH1cbn1cbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7TmdiUmF0aW5nfSBmcm9tICcuL3JhdGluZyc7XG5cbmV4cG9ydCB7TmdiUmF0aW5nfSBmcm9tICcuL3JhdGluZyc7XG5leHBvcnQge05nYlJhdGluZ0NvbmZpZ30gZnJvbSAnLi9yYXRpbmctY29uZmlnJztcblxuQE5nTW9kdWxlKHtkZWNsYXJhdGlvbnM6IFtOZ2JSYXRpbmddLCBleHBvcnRzOiBbTmdiUmF0aW5nXSwgaW1wb3J0czogW0NvbW1vbk1vZHVsZV19KVxuZXhwb3J0IGNsYXNzIE5nYlJhdGluZ01vZHVsZSB7XG4gIC8qKlxuICAgKiBJbXBvcnRpbmcgd2l0aCAnLmZvclJvb3QoKScgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSwgeW91IGNhbiBzaW1wbHkgaW1wb3J0IHRoZSBtb2R1bGUuXG4gICAqIFdpbGwgYmUgcmVtb3ZlZCBpbiA0LjAuMC5cbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcbiAgICovXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JSYXRpbmdNb2R1bGV9OyB9XG59XG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIE5nYlRhYnNldCBjb21wb25lbnQuXG4gKiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LCBhbmQgY3VzdG9taXplIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW5cbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgdGFic2V0cyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTmdiVGFic2V0Q29uZmlnIHtcbiAganVzdGlmeTogJ3N0YXJ0JyB8ICdjZW50ZXInIHwgJ2VuZCcgfCAnZmlsbCcgfCAnanVzdGlmaWVkJyA9ICdzdGFydCc7XG4gIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuICB0eXBlOiAndGFicycgfCAncGlsbHMnID0gJ3RhYnMnO1xufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIERpcmVjdGl2ZSxcbiAgVGVtcGxhdGVSZWYsXG4gIENvbnRlbnRDaGlsZCxcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYlRhYnNldENvbmZpZ30gZnJvbSAnLi90YWJzZXQtY29uZmlnJztcblxubGV0IG5leHRJZCA9IDA7XG5cbi8qKlxuICogVGhpcyBkaXJlY3RpdmUgc2hvdWxkIGJlIHVzZWQgdG8gd3JhcCB0YWIgdGl0bGVzIHRoYXQgbmVlZCB0byBjb250YWluIEhUTUwgbWFya3VwIG9yIG90aGVyIGRpcmVjdGl2ZXMuXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiVGFiVGl0bGVdJ30pXG5leHBvcnQgY2xhc3MgTmdiVGFiVGl0bGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG5cbi8qKlxuICogVGhpcyBkaXJlY3RpdmUgbXVzdCBiZSB1c2VkIHRvIHdyYXAgY29udGVudCB0byBiZSBkaXNwbGF5ZWQgaW4gYSB0YWIuXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiVGFiQ29udGVudF0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JUYWJDb250ZW50IHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHJlcHJlc2VudGluZyBhbiBpbmRpdmlkdWFsIHRhYi5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZ2ItdGFiJ30pXG5leHBvcnQgY2xhc3MgTmdiVGFiIHtcbiAgLyoqXG4gICAqIFVuaXF1ZSB0YWIgaWRlbnRpZmllci4gTXVzdCBiZSB1bmlxdWUgZm9yIHRoZSBlbnRpcmUgZG9jdW1lbnQgZm9yIHByb3BlciBhY2Nlc3NpYmlsaXR5IHN1cHBvcnQuXG4gICAqL1xuICBASW5wdXQoKSBpZCA9IGBuZ2ItdGFiLSR7bmV4dElkKyt9YDtcbiAgLyoqXG4gICAqIFNpbXBsZSAoc3RyaW5nIG9ubHkpIHRpdGxlLiBVc2UgdGhlIFwiTmdiVGFiVGl0bGVcIiBkaXJlY3RpdmUgZm9yIG1vcmUgY29tcGxleCB1c2UtY2FzZXMuXG4gICAqL1xuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xuICAvKipcbiAgICogQWxsb3dzIHRvZ2dsaW5nIGRpc2FibGVkIHN0YXRlIG9mIGEgZ2l2ZW4gc3RhdGUuIERpc2FibGVkIHRhYnMgY2FuJ3QgYmUgc2VsZWN0ZWQuXG4gICAqL1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIHRpdGxlVHBsOiBOZ2JUYWJUaXRsZSB8IG51bGw7XG4gIGNvbnRlbnRUcGw6IE5nYlRhYkNvbnRlbnQgfCBudWxsO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiVGFiVGl0bGUsIHtkZXNjZW5kYW50czogZmFsc2V9KSB0aXRsZVRwbHM6IFF1ZXJ5TGlzdDxOZ2JUYWJUaXRsZT47XG4gIEBDb250ZW50Q2hpbGRyZW4oTmdiVGFiQ29udGVudCwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIGNvbnRlbnRUcGxzOiBRdWVyeUxpc3Q8TmdiVGFiQ29udGVudD47XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIC8vIFdlIGFyZSB1c2luZyBAQ29udGVudENoaWxkcmVuIGluc3RlYWQgb2YgQENvbnRlbnRDaGlsZCBhcyBpbiB0aGUgQW5ndWxhciB2ZXJzaW9uIGJlaW5nIHVzZWRcbiAgICAvLyBvbmx5IEBDb250ZW50Q2hpbGRyZW4gYWxsb3dzIHVzIHRvIHNwZWNpZnkgdGhlIHtkZXNjZW5kYW50czogZmFsc2V9IG9wdGlvbi5cbiAgICAvLyBXaXRob3V0IHtkZXNjZW5kYW50czogZmFsc2V9IHdlIGFyZSBoaXR0aW5nIGJ1Z3MgZGVzY3JpYmVkIGluOlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZy1ib290c3RyYXAvbmctYm9vdHN0cmFwL2lzc3Vlcy8yMjQwXG4gICAgdGhpcy50aXRsZVRwbCA9IHRoaXMudGl0bGVUcGxzLmZpcnN0O1xuICAgIHRoaXMuY29udGVudFRwbCA9IHRoaXMuY29udGVudFRwbHMuZmlyc3Q7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgcGF5bG9hZCBvZiB0aGUgY2hhbmdlIGV2ZW50IGZpcmVkIHJpZ2h0IGJlZm9yZSB0aGUgdGFiIGNoYW5nZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYlRhYkNoYW5nZUV2ZW50IHtcbiAgLyoqXG4gICAqIElkIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIHRhYlxuICAgKi9cbiAgYWN0aXZlSWQ6IHN0cmluZztcblxuICAvKipcbiAgICogSWQgb2YgdGhlIG5ld2x5IHNlbGVjdGVkIHRhYlxuICAgKi9cbiAgbmV4dElkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgd2lsbCBwcmV2ZW50IHRhYiBzd2l0Y2ggaWYgY2FsbGVkXG4gICAqL1xuICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBBIGNvbXBvbmVudCB0aGF0IG1ha2VzIGl0IGVhc3kgdG8gY3JlYXRlIHRhYmJlZCBpbnRlcmZhY2UuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi10YWJzZXQnLFxuICBleHBvcnRBczogJ25nYlRhYnNldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHVsIFtjbGFzc109XCInbmF2IG5hdi0nICsgdHlwZSArIChvcmllbnRhdGlvbiA9PSAnaG9yaXpvbnRhbCc/ICAnICcgKyBqdXN0aWZ5Q2xhc3MgOiAnIGZsZXgtY29sdW1uJylcIiByb2xlPVwidGFibGlzdFwiPlxuICAgICAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIiAqbmdGb3I9XCJsZXQgdGFiIG9mIHRhYnNcIj5cbiAgICAgICAgPGEgW2lkXT1cInRhYi5pZFwiIGNsYXNzPVwibmF2LWxpbmtcIiBbY2xhc3MuYWN0aXZlXT1cInRhYi5pZCA9PT0gYWN0aXZlSWRcIiBbY2xhc3MuZGlzYWJsZWRdPVwidGFiLmRpc2FibGVkXCJcbiAgICAgICAgICBocmVmIChjbGljayk9XCJzZWxlY3QodGFiLmlkKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIiByb2xlPVwidGFiXCIgW2F0dHIudGFiaW5kZXhdPVwiKHRhYi5kaXNhYmxlZCA/ICctMSc6IHVuZGVmaW5lZClcIlxuICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiKCFkZXN0cm95T25IaWRlIHx8IHRhYi5pZCA9PT0gYWN0aXZlSWQgPyB0YWIuaWQgKyAnLXBhbmVsJyA6IG51bGwpXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cInRhYi5pZCA9PT0gYWN0aXZlSWRcIiBbYXR0ci5hcmlhLWRpc2FibGVkXT1cInRhYi5kaXNhYmxlZFwiPlxuICAgICAgICAgIHt7dGFiLnRpdGxlfX08bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFiLnRpdGxlVHBsPy50ZW1wbGF0ZVJlZlwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgICA8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtdGFiIFtuZ0Zvck9mXT1cInRhYnNcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwidGFiLXBhbmUge3t0YWIuaWQgPT09IGFjdGl2ZUlkID8gJ2FjdGl2ZScgOiBudWxsfX1cIlxuICAgICAgICAgICpuZ0lmPVwiIWRlc3Ryb3lPbkhpZGUgfHwgdGFiLmlkID09PSBhY3RpdmVJZFwiXG4gICAgICAgICAgcm9sZT1cInRhYnBhbmVsXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwidGFiLmlkXCIgaWQ9XCJ7e3RhYi5pZH19LXBhbmVsXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cInRhYi5pZCA9PT0gYWN0aXZlSWRcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFiLmNvbnRlbnRUcGw/LnRlbXBsYXRlUmVmXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYlRhYnNldCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xuICBqdXN0aWZ5Q2xhc3M6IHN0cmluZztcblxuICBAQ29udGVudENoaWxkcmVuKE5nYlRhYikgdGFiczogUXVlcnlMaXN0PE5nYlRhYj47XG5cbiAgLyoqXG4gICAqIEFuIGlkZW50aWZpZXIgb2YgYW4gaW5pdGlhbGx5IHNlbGVjdGVkIChhY3RpdmUpIHRhYi4gVXNlIHRoZSBcInNlbGVjdFwiIG1ldGhvZCB0byBzd2l0Y2ggYSB0YWIgcHJvZ3JhbW1hdGljYWxseS5cbiAgICovXG4gIEBJbnB1dCgpIGFjdGl2ZUlkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGNsb3NlZCB0YWJzIHNob3VsZCBiZSBoaWRkZW4gd2l0aG91dCBkZXN0cm95aW5nIHRoZW1cbiAgICovXG4gIEBJbnB1dCgpIGRlc3Ryb3lPbkhpZGUgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgaG9yaXpvbnRhbCBhbGlnbm1lbnQgb2YgdGhlIG5hdiB3aXRoIGZsZXhib3ggdXRpbGl0aWVzLiBDYW4gYmUgb25lIG9mICdzdGFydCcsICdjZW50ZXInLCAnZW5kJywgJ2ZpbGwnIG9yXG4gICAqICdqdXN0aWZpZWQnXG4gICAqIFRoZSBkZWZhdWx0IHZhbHVlIGlzICdzdGFydCcuXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQganVzdGlmeShjbGFzc05hbWU6ICdzdGFydCcgfCAnY2VudGVyJyB8ICdlbmQnIHwgJ2ZpbGwnIHwgJ2p1c3RpZmllZCcpIHtcbiAgICBpZiAoY2xhc3NOYW1lID09PSAnZmlsbCcgfHwgY2xhc3NOYW1lID09PSAnanVzdGlmaWVkJykge1xuICAgICAgdGhpcy5qdXN0aWZ5Q2xhc3MgPSBgbmF2LSR7Y2xhc3NOYW1lfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuanVzdGlmeUNsYXNzID0gYGp1c3RpZnktY29udGVudC0ke2NsYXNzTmFtZX1gO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgb3JpZW50YXRpb24gb2YgdGhlIG5hdiAoaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCkuXG4gICAqIFRoZSBkZWZhdWx0IHZhbHVlIGlzICdob3Jpem9udGFsJy5cbiAgICovXG4gIEBJbnB1dCgpIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnO1xuXG4gIC8qKlxuICAgKiBUeXBlIG9mIG5hdmlnYXRpb24gdG8gYmUgdXNlZCBmb3IgdGFicy4gQ2FuIGJlIG9uZSBvZiBCb290c3RyYXAgZGVmaW5lZCB0eXBlcyAoJ3RhYnMnIG9yICdwaWxscycpLlxuICAgKiBTaW5jZSAzLjAuMCBjYW4gYWxzbyBiZSBhbiBhcmJpdHJhcnkgc3RyaW5nIChmb3IgY3VzdG9tIHRoZW1lcykuXG4gICAqL1xuICBASW5wdXQoKSB0eXBlOiAndGFicycgfCAncGlsbHMnIHwgc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIHRhYiBjaGFuZ2UgZXZlbnQgZmlyZWQgcmlnaHQgYmVmb3JlIHRoZSB0YWIgc2VsZWN0aW9uIGhhcHBlbnMuIFNlZSBOZ2JUYWJDaGFuZ2VFdmVudCBmb3IgcGF5bG9hZCBkZXRhaWxzXG4gICAqL1xuICBAT3V0cHV0KCkgdGFiQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JUYWJDaGFuZ2VFdmVudD4oKTtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5nYlRhYnNldENvbmZpZykge1xuICAgIHRoaXMudHlwZSA9IGNvbmZpZy50eXBlO1xuICAgIHRoaXMuanVzdGlmeSA9IGNvbmZpZy5qdXN0aWZ5O1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBjb25maWcub3JpZW50YXRpb247XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0cyB0aGUgdGFiIHdpdGggdGhlIGdpdmVuIGlkIGFuZCBzaG93cyBpdHMgYXNzb2NpYXRlZCBwYW5lLlxuICAgKiBBbnkgb3RoZXIgdGFiIHRoYXQgd2FzIHByZXZpb3VzbHkgc2VsZWN0ZWQgYmVjb21lcyB1bnNlbGVjdGVkIGFuZCBpdHMgYXNzb2NpYXRlZCBwYW5lIGlzIGhpZGRlbi5cbiAgICovXG4gIHNlbGVjdCh0YWJJZDogc3RyaW5nKSB7XG4gICAgbGV0IHNlbGVjdGVkVGFiID0gdGhpcy5fZ2V0VGFiQnlJZCh0YWJJZCk7XG4gICAgaWYgKHNlbGVjdGVkVGFiICYmICFzZWxlY3RlZFRhYi5kaXNhYmxlZCAmJiB0aGlzLmFjdGl2ZUlkICE9PSBzZWxlY3RlZFRhYi5pZCkge1xuICAgICAgbGV0IGRlZmF1bHRQcmV2ZW50ZWQgPSBmYWxzZTtcblxuICAgICAgdGhpcy50YWJDaGFuZ2UuZW1pdChcbiAgICAgICAgICB7YWN0aXZlSWQ6IHRoaXMuYWN0aXZlSWQsIG5leHRJZDogc2VsZWN0ZWRUYWIuaWQsIHByZXZlbnREZWZhdWx0OiAoKSA9PiB7IGRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlOyB9fSk7XG5cbiAgICAgIGlmICghZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICB0aGlzLmFjdGl2ZUlkID0gc2VsZWN0ZWRUYWIuaWQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIC8vIGF1dG8tY29ycmVjdCBhY3RpdmVJZCB0aGF0IG1pZ2h0IGhhdmUgYmVlbiBzZXQgaW5jb3JyZWN0bHkgYXMgaW5wdXRcbiAgICBsZXQgYWN0aXZlVGFiID0gdGhpcy5fZ2V0VGFiQnlJZCh0aGlzLmFjdGl2ZUlkKTtcbiAgICB0aGlzLmFjdGl2ZUlkID0gYWN0aXZlVGFiID8gYWN0aXZlVGFiLmlkIDogKHRoaXMudGFicy5sZW5ndGggPyB0aGlzLnRhYnMuZmlyc3QuaWQgOiBudWxsKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFRhYkJ5SWQoaWQ6IHN0cmluZyk6IE5nYlRhYiB7XG4gICAgbGV0IHRhYnNXaXRoSWQ6IE5nYlRhYltdID0gdGhpcy50YWJzLmZpbHRlcih0YWIgPT4gdGFiLmlkID09PSBpZCk7XG4gICAgcmV0dXJuIHRhYnNXaXRoSWQubGVuZ3RoID8gdGFic1dpdGhJZFswXSA6IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7TmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7TmdiVGFic2V0LCBOZ2JUYWIsIE5nYlRhYkNvbnRlbnQsIE5nYlRhYlRpdGxlfSBmcm9tICcuL3RhYnNldCc7XG5cbmV4cG9ydCB7TmdiVGFic2V0LCBOZ2JUYWIsIE5nYlRhYkNvbnRlbnQsIE5nYlRhYlRpdGxlLCBOZ2JUYWJDaGFuZ2VFdmVudH0gZnJvbSAnLi90YWJzZXQnO1xuZXhwb3J0IHtOZ2JUYWJzZXRDb25maWd9IGZyb20gJy4vdGFic2V0LWNvbmZpZyc7XG5cbmNvbnN0IE5HQl9UQUJTRVRfRElSRUNUSVZFUyA9IFtOZ2JUYWJzZXQsIE5nYlRhYiwgTmdiVGFiQ29udGVudCwgTmdiVGFiVGl0bGVdO1xuXG5ATmdNb2R1bGUoe2RlY2xhcmF0aW9uczogTkdCX1RBQlNFVF9ESVJFQ1RJVkVTLCBleHBvcnRzOiBOR0JfVEFCU0VUX0RJUkVDVElWRVMsIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdfSlcbmV4cG9ydCBjbGFzcyBOZ2JUYWJzZXRNb2R1bGUge1xuICAvKipcbiAgICogSW1wb3J0aW5nIHdpdGggJy5mb3JSb290KCknIGlzIG5vIGxvbmdlciBuZWNlc3NhcnksIHlvdSBjYW4gc2ltcGx5IGltcG9ydCB0aGUgbW9kdWxlLlxuICAgKiBXaWxsIGJlIHJlbW92ZWQgaW4gNC4wLjAuXG4gICAqXG4gICAqIEBkZXByZWNhdGVkIDMuMC4wXG4gICAqL1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiVGFic2V0TW9kdWxlfTsgfVxufVxuIiwiaW1wb3J0IHtpc051bWJlciwgdG9JbnRlZ2VyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuXG5leHBvcnQgY2xhc3MgTmdiVGltZSB7XG4gIGhvdXI6IG51bWJlcjtcbiAgbWludXRlOiBudW1iZXI7XG4gIHNlY29uZDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGhvdXI/OiBudW1iZXIsIG1pbnV0ZT86IG51bWJlciwgc2Vjb25kPzogbnVtYmVyKSB7XG4gICAgdGhpcy5ob3VyID0gdG9JbnRlZ2VyKGhvdXIpO1xuICAgIHRoaXMubWludXRlID0gdG9JbnRlZ2VyKG1pbnV0ZSk7XG4gICAgdGhpcy5zZWNvbmQgPSB0b0ludGVnZXIoc2Vjb25kKTtcbiAgfVxuXG4gIGNoYW5nZUhvdXIoc3RlcCA9IDEpIHsgdGhpcy51cGRhdGVIb3VyKChpc05hTih0aGlzLmhvdXIpID8gMCA6IHRoaXMuaG91cikgKyBzdGVwKTsgfVxuXG4gIHVwZGF0ZUhvdXIoaG91cjogbnVtYmVyKSB7XG4gICAgaWYgKGlzTnVtYmVyKGhvdXIpKSB7XG4gICAgICB0aGlzLmhvdXIgPSAoaG91ciA8IDAgPyAyNCArIGhvdXIgOiBob3VyKSAlIDI0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhvdXIgPSBOYU47XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlTWludXRlKHN0ZXAgPSAxKSB7IHRoaXMudXBkYXRlTWludXRlKChpc05hTih0aGlzLm1pbnV0ZSkgPyAwIDogdGhpcy5taW51dGUpICsgc3RlcCk7IH1cblxuICB1cGRhdGVNaW51dGUobWludXRlOiBudW1iZXIpIHtcbiAgICBpZiAoaXNOdW1iZXIobWludXRlKSkge1xuICAgICAgdGhpcy5taW51dGUgPSBtaW51dGUgJSA2MCA8IDAgPyA2MCArIG1pbnV0ZSAlIDYwIDogbWludXRlICUgNjA7XG4gICAgICB0aGlzLmNoYW5nZUhvdXIoTWF0aC5mbG9vcihtaW51dGUgLyA2MCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pbnV0ZSA9IE5hTjtcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VTZWNvbmQoc3RlcCA9IDEpIHsgdGhpcy51cGRhdGVTZWNvbmQoKGlzTmFOKHRoaXMuc2Vjb25kKSA/IDAgOiB0aGlzLnNlY29uZCkgKyBzdGVwKTsgfVxuXG4gIHVwZGF0ZVNlY29uZChzZWNvbmQ6IG51bWJlcikge1xuICAgIGlmIChpc051bWJlcihzZWNvbmQpKSB7XG4gICAgICB0aGlzLnNlY29uZCA9IHNlY29uZCA8IDAgPyA2MCArIHNlY29uZCAlIDYwIDogc2Vjb25kICUgNjA7XG4gICAgICB0aGlzLmNoYW5nZU1pbnV0ZShNYXRoLmZsb29yKHNlY29uZCAvIDYwKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2Vjb25kID0gTmFOO1xuICAgIH1cbiAgfVxuXG4gIGlzVmFsaWQoY2hlY2tTZWNzID0gdHJ1ZSkge1xuICAgIHJldHVybiBpc051bWJlcih0aGlzLmhvdXIpICYmIGlzTnVtYmVyKHRoaXMubWludXRlKSAmJiAoY2hlY2tTZWNzID8gaXNOdW1iZXIodGhpcy5zZWNvbmQpIDogdHJ1ZSk7XG4gIH1cblxuICB0b1N0cmluZygpIHsgcmV0dXJuIGAke3RoaXMuaG91ciB8fCAwfToke3RoaXMubWludXRlIHx8IDB9OiR7dGhpcy5zZWNvbmQgfHwgMH1gOyB9XG59XG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIE5nYlRpbWVwaWNrZXIgY29tcG9uZW50LlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIHRpbWVwaWNrZXJzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBOZ2JUaW1lcGlja2VyQ29uZmlnIHtcbiAgbWVyaWRpYW4gPSBmYWxzZTtcbiAgc3Bpbm5lcnMgPSB0cnVlO1xuICBzZWNvbmRzID0gZmFsc2U7XG4gIGhvdXJTdGVwID0gMTtcbiAgbWludXRlU3RlcCA9IDE7XG4gIHNlY29uZFN0ZXAgPSAxO1xuICBkaXNhYmxlZCA9IGZhbHNlO1xuICByZWFkb25seUlucHV0cyA9IGZhbHNlO1xuICBzaXplOiAnc21hbGwnIHwgJ21lZGl1bScgfCAnbGFyZ2UnID0gJ21lZGl1bSc7XG59XG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ2JUaW1lU3RydWN0fSBmcm9tICcuL25nYi10aW1lLXN0cnVjdCc7XG5pbXBvcnQge2lzSW50ZWdlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuZXhwb3J0IGZ1bmN0aW9uIE5HQl9EQVRFUElDS0VSX1RJTUVfQURBUFRFUl9GQUNUT1JZKCkge1xuICByZXR1cm4gbmV3IE5nYlRpbWVTdHJ1Y3RBZGFwdGVyKCk7XG59XG5cbi8qKlxuICogQWJzdHJhY3QgdHlwZSBzZXJ2aW5nIGFzIGEgREkgdG9rZW4gZm9yIHRoZSBzZXJ2aWNlIGNvbnZlcnRpbmcgZnJvbSB5b3VyIGFwcGxpY2F0aW9uIFRpbWUgbW9kZWwgdG8gaW50ZXJuYWxcbiAqIE5nYlRpbWVTdHJ1Y3QgbW9kZWwuXG4gKiBBIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gY29udmVydGluZyBmcm9tIGFuZCB0byBOZ2JUaW1lU3RydWN0IGlzIHByb3ZpZGVkIGZvciByZXRyby1jb21wYXRpYmlsaXR5LFxuICogYnV0IHlvdSBjYW4gcHJvdmlkZSBhbm90aGVyIGltcGxlbWVudGF0aW9uIHRvIHVzZSBhbiBhbHRlcm5hdGl2ZSBmb3JtYXQsIGllIGZvciB1c2luZyB3aXRoIG5hdGl2ZSBEYXRlIE9iamVjdC5cbiAqXG4gKiBAc2luY2UgMi4yLjBcbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogTkdCX0RBVEVQSUNLRVJfVElNRV9BREFQVEVSX0ZBQ1RPUll9KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE5nYlRpbWVBZGFwdGVyPFQ+IHtcbiAgLyoqXG4gICAqIENvbnZlcnRzIHVzZXItbW9kZWwgZGF0ZSBpbnRvIGFuIE5nYlRpbWVTdHJ1Y3QgZm9yIGludGVybmFsIHVzZSBpbiB0aGUgbGlicmFyeVxuICAgKi9cbiAgYWJzdHJhY3QgZnJvbU1vZGVsKHZhbHVlOiBUKTogTmdiVGltZVN0cnVjdDtcblxuICAvKipcbiAgICogQ29udmVydHMgaW50ZXJuYWwgdGltZSB2YWx1ZSBOZ2JUaW1lU3RydWN0IHRvIHVzZXItbW9kZWwgZGF0ZVxuICAgKiBUaGUgcmV0dXJuZWQgdHlwZSBpcyBzdXBwb3NlZCB0byBiZSBvZiB0aGUgc2FtZSB0eXBlIGFzIGZyb21Nb2RlbCgpIGlucHV0LXZhbHVlIHBhcmFtXG4gICAqL1xuICBhYnN0cmFjdCB0b01vZGVsKHRpbWU6IE5nYlRpbWVTdHJ1Y3QpOiBUO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiVGltZVN0cnVjdEFkYXB0ZXIgZXh0ZW5kcyBOZ2JUaW1lQWRhcHRlcjxOZ2JUaW1lU3RydWN0PiB7XG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIE5nYlRpbWVTdHJ1Y3QgdmFsdWUgaW50byBOZ2JUaW1lU3RydWN0IHZhbHVlXG4gICAqL1xuICBmcm9tTW9kZWwodGltZTogTmdiVGltZVN0cnVjdCk6IE5nYlRpbWVTdHJ1Y3Qge1xuICAgIHJldHVybiAodGltZSAmJiBpc0ludGVnZXIodGltZS5ob3VyKSAmJiBpc0ludGVnZXIodGltZS5taW51dGUpKSA/XG4gICAgICAgIHtob3VyOiB0aW1lLmhvdXIsIG1pbnV0ZTogdGltZS5taW51dGUsIHNlY29uZDogaXNJbnRlZ2VyKHRpbWUuc2Vjb25kKSA/IHRpbWUuc2Vjb25kIDogbnVsbH0gOlxuICAgICAgICBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgTmdiVGltZVN0cnVjdCB2YWx1ZSBpbnRvIE5nYlRpbWVTdHJ1Y3QgdmFsdWVcbiAgICovXG4gIHRvTW9kZWwodGltZTogTmdiVGltZVN0cnVjdCk6IE5nYlRpbWVTdHJ1Y3Qge1xuICAgIHJldHVybiAodGltZSAmJiBpc0ludGVnZXIodGltZS5ob3VyKSAmJiBpc0ludGVnZXIodGltZS5taW51dGUpKSA/XG4gICAgICAgIHtob3VyOiB0aW1lLmhvdXIsIG1pbnV0ZTogdGltZS5taW51dGUsIHNlY29uZDogaXNJbnRlZ2VyKHRpbWUuc2Vjb25kKSA/IHRpbWUuc2Vjb25kIDogbnVsbH0gOlxuICAgICAgICBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7aXNJbnRlZ2VyLCBpc051bWJlciwgcGFkTnVtYmVyLCB0b0ludGVnZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQge05nYlRpbWV9IGZyb20gJy4vbmdiLXRpbWUnO1xuaW1wb3J0IHtOZ2JUaW1lcGlja2VyQ29uZmlnfSBmcm9tICcuL3RpbWVwaWNrZXItY29uZmlnJztcbmltcG9ydCB7TmdiVGltZUFkYXB0ZXJ9IGZyb20gJy4vbmdiLXRpbWUtYWRhcHRlcic7XG5cbmNvbnN0IE5HQl9USU1FUElDS0VSX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiVGltZXBpY2tlciksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKipcbiAqIEEgbGlnaHR3ZWlnaHQgJiBjb25maWd1cmFibGUgdGltZXBpY2tlciBkaXJlY3RpdmUuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi10aW1lcGlja2VyJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVVcmxzOiBbJy4vdGltZXBpY2tlci5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGZpZWxkc2V0IFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm5nYi10cFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibmdiLXRwLWlucHV0LWNvbnRhaW5lciBuZ2ItdHAtaG91clwiPlxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzcGlubmVyc1wiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2hhbmdlSG91cihob3VyU3RlcClcIlxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hldnJvbiBuZ2ItdHAtY2hldnJvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLmluY3JlbWVudC1ob3Vyc1wiPkluY3JlbWVudCBob3Vyczwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cIm5nYi10cC1pbnB1dCBmb3JtLWNvbnRyb2xcIiBbY2xhc3MuZm9ybS1jb250cm9sLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmZvcm0tY29udHJvbC1sZ109XCJpc0xhcmdlU2l6ZVwiXG4gICAgICAgICAgICBtYXhsZW5ndGg9XCIyXCIgcGxhY2Vob2xkZXI9XCJISFwiIGkxOG4tcGxhY2Vob2xkZXI9XCJAQG5nYi50aW1lcGlja2VyLkhIXCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJmb3JtYXRIb3VyKG1vZGVsPy5ob3VyKVwiIChjaGFuZ2UpPVwidXBkYXRlSG91cigkZXZlbnQudGFyZ2V0LnZhbHVlKVwiXG4gICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlJbnB1dHNcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBhcmlhLWxhYmVsPVwiSG91cnNcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi50aW1lcGlja2VyLmhvdXJzXCJcbiAgICAgICAgICAgIChrZXlkb3duLkFycm93VXApPVwiY2hhbmdlSG91cihob3VyU3RlcClcIiAoa2V5ZG93bi5BcnJvd0Rvd24pPVwiY2hhbmdlSG91cigtaG91clN0ZXApXCI+XG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNwaW5uZXJzXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJjaGFuZ2VIb3VyKC1ob3VyU3RlcClcIlxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hldnJvbiBuZ2ItdHAtY2hldnJvbiBib3R0b21cIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5kZWNyZW1lbnQtaG91cnNcIj5EZWNyZW1lbnQgaG91cnM8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibmdiLXRwLXNwYWNlclwiPjo8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5nYi10cC1pbnB1dC1jb250YWluZXIgbmdiLXRwLW1pbnV0ZVwiPlxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzcGlubmVyc1wiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2hhbmdlTWludXRlKG1pbnV0ZVN0ZXApXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW2NsYXNzLmJ0bi1zbV09XCJpc1NtYWxsU2l6ZVwiIFtjbGFzcy5idG4tbGddPVwiaXNMYXJnZVNpemVcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb24gbmdiLXRwLWNoZXZyb25cIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5pbmNyZW1lbnQtbWludXRlc1wiPkluY3JlbWVudCBtaW51dGVzPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibmdiLXRwLWlucHV0IGZvcm0tY29udHJvbFwiIFtjbGFzcy5mb3JtLWNvbnRyb2wtc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuZm9ybS1jb250cm9sLWxnXT1cImlzTGFyZ2VTaXplXCJcbiAgICAgICAgICAgIG1heGxlbmd0aD1cIjJcIiBwbGFjZWhvbGRlcj1cIk1NXCIgaTE4bi1wbGFjZWhvbGRlcj1cIkBAbmdiLnRpbWVwaWNrZXIuTU1cIlxuICAgICAgICAgICAgW3ZhbHVlXT1cImZvcm1hdE1pblNlYyhtb2RlbD8ubWludXRlKVwiIChjaGFuZ2UpPVwidXBkYXRlTWludXRlKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seUlucHV0c1wiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIGFyaWEtbGFiZWw9XCJNaW51dGVzXCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IudGltZXBpY2tlci5taW51dGVzXCJcbiAgICAgICAgICAgIChrZXlkb3duLkFycm93VXApPVwiY2hhbmdlTWludXRlKG1pbnV0ZVN0ZXApXCIgKGtleWRvd24uQXJyb3dEb3duKT1cImNoYW5nZU1pbnV0ZSgtbWludXRlU3RlcClcIj5cbiAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic3Bpbm5lcnNcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNoYW5nZU1pbnV0ZSgtbWludXRlU3RlcClcIlxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb24gbmdiLXRwLWNoZXZyb24gYm90dG9tXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLmRlY3JlbWVudC1taW51dGVzXCI+RGVjcmVtZW50IG1pbnV0ZXM8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwic2Vjb25kc1wiIGNsYXNzPVwibmdiLXRwLXNwYWNlclwiPjo8L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cInNlY29uZHNcIiBjbGFzcz1cIm5nYi10cC1pbnB1dC1jb250YWluZXIgbmdiLXRwLXNlY29uZFwiPlxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzcGlubmVyc1wiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2hhbmdlU2Vjb25kKHNlY29uZFN0ZXApXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW2NsYXNzLmJ0bi1zbV09XCJpc1NtYWxsU2l6ZVwiIFtjbGFzcy5idG4tbGddPVwiaXNMYXJnZVNpemVcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb24gbmdiLXRwLWNoZXZyb25cIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiBpMThuPVwiQEBuZ2IudGltZXBpY2tlci5pbmNyZW1lbnQtc2Vjb25kc1wiPkluY3JlbWVudCBzZWNvbmRzPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibmdiLXRwLWlucHV0IGZvcm0tY29udHJvbFwiIFtjbGFzcy5mb3JtLWNvbnRyb2wtc21dPVwiaXNTbWFsbFNpemVcIiBbY2xhc3MuZm9ybS1jb250cm9sLWxnXT1cImlzTGFyZ2VTaXplXCJcbiAgICAgICAgICAgIG1heGxlbmd0aD1cIjJcIiBwbGFjZWhvbGRlcj1cIlNTXCIgaTE4bi1wbGFjZWhvbGRlcj1cIkBAbmdiLnRpbWVwaWNrZXIuU1NcIlxuICAgICAgICAgICAgW3ZhbHVlXT1cImZvcm1hdE1pblNlYyhtb2RlbD8uc2Vjb25kKVwiIChjaGFuZ2UpPVwidXBkYXRlU2Vjb25kKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seUlucHV0c1wiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIGFyaWEtbGFiZWw9XCJTZWNvbmRzXCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IudGltZXBpY2tlci5zZWNvbmRzXCJcbiAgICAgICAgICAgIChrZXlkb3duLkFycm93VXApPVwiY2hhbmdlU2Vjb25kKHNlY29uZFN0ZXApXCIgKGtleWRvd24uQXJyb3dEb3duKT1cImNoYW5nZVNlY29uZCgtc2Vjb25kU3RlcClcIj5cbiAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic3Bpbm5lcnNcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNoYW5nZVNlY29uZCgtc2Vjb25kU3RlcClcIlxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZXZyb24gbmdiLXRwLWNoZXZyb24gYm90dG9tXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuZGVjcmVtZW50LXNlY29uZHNcIj5EZWNyZW1lbnQgc2Vjb25kczwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJtZXJpZGlhblwiIGNsYXNzPVwibmdiLXRwLXNwYWNlclwiPjwvZGl2PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwibWVyaWRpYW5cIiBjbGFzcz1cIm5nYi10cC1tZXJpZGlhblwiPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnlcIiBbY2xhc3MuYnRuLXNtXT1cImlzU21hbGxTaXplXCIgW2NsYXNzLmJ0bi1sZ109XCJpc0xhcmdlU2l6ZVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZU1lcmlkaWFuKClcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtb2RlbD8uaG91ciA+PSAxMjsgZWxzZSBhbVwiIGkxOG49XCJAQG5nYi50aW1lcGlja2VyLlBNXCI+UE08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjYW0gaTE4bj1cIkBAbmdiLnRpbWVwaWNrZXIuQU1cIj5BTTwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9maWVsZHNldD5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbTkdCX1RJTUVQSUNLRVJfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIE5nYlRpbWVwaWNrZXIgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICBPbkNoYW5nZXMge1xuICBkaXNhYmxlZDogYm9vbGVhbjtcbiAgbW9kZWw6IE5nYlRpbWU7XG5cbiAgcHJpdmF0ZSBfaG91clN0ZXA6IG51bWJlcjtcbiAgcHJpdmF0ZSBfbWludXRlU3RlcDogbnVtYmVyO1xuICBwcml2YXRlIF9zZWNvbmRTdGVwOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gZGlzcGxheSAxMkggb3IgMjRIIG1vZGUuXG4gICAqL1xuICBASW5wdXQoKSBtZXJpZGlhbjogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBkaXNwbGF5IHRoZSBzcGlubmVycyBhYm92ZSBhbmQgYmVsb3cgdGhlIGlucHV0cy5cbiAgICovXG4gIEBJbnB1dCgpIHNwaW5uZXJzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgc2Vjb25kcyBpbnB1dC5cbiAgICovXG4gIEBJbnB1dCgpIHNlY29uZHM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBob3VycyB0byBpbmNyZWFzZSBvciBkZWNyZWFzZSB3aGVuIHVzaW5nIGEgYnV0dG9uLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGhvdXJTdGVwKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMuX2hvdXJTdGVwID0gaXNJbnRlZ2VyKHN0ZXApID8gc3RlcCA6IHRoaXMuX2NvbmZpZy5ob3VyU3RlcDtcbiAgfVxuXG4gIGdldCBob3VyU3RlcCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5faG91clN0ZXA7IH1cblxuICAvKipcbiAgICogTnVtYmVyIG9mIG1pbnV0ZXMgdG8gaW5jcmVhc2Ugb3IgZGVjcmVhc2Ugd2hlbiB1c2luZyBhIGJ1dHRvbi5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBtaW51dGVTdGVwKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMuX21pbnV0ZVN0ZXAgPSBpc0ludGVnZXIoc3RlcCkgPyBzdGVwIDogdGhpcy5fY29uZmlnLm1pbnV0ZVN0ZXA7XG4gIH1cblxuICBnZXQgbWludXRlU3RlcCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbWludXRlU3RlcDsgfVxuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2Ygc2Vjb25kcyB0byBpbmNyZWFzZSBvciBkZWNyZWFzZSB3aGVuIHVzaW5nIGEgYnV0dG9uLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IHNlY29uZFN0ZXAoc3RlcDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2Vjb25kU3RlcCA9IGlzSW50ZWdlcihzdGVwKSA/IHN0ZXAgOiB0aGlzLl9jb25maWcuc2Vjb25kU3RlcDtcbiAgfVxuXG4gIGdldCBzZWNvbmRTdGVwKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9zZWNvbmRTdGVwOyB9XG5cbiAgLyoqXG4gICAqIFRvIG1ha2UgdGltZXBpY2tlciByZWFkb25seVxuICAgKi9cbiAgQElucHV0KCkgcmVhZG9ubHlJbnB1dHM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRvIHNldCB0aGUgc2l6ZSBvZiB0aGUgaW5wdXRzIGFuZCBidXR0b25cbiAgICovXG4gIEBJbnB1dCgpIHNpemU6ICdzbWFsbCcgfCAnbWVkaXVtJyB8ICdsYXJnZSc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IF9jb25maWc6IE5nYlRpbWVwaWNrZXJDb25maWcsIHByaXZhdGUgX25nYlRpbWVBZGFwdGVyOiBOZ2JUaW1lQWRhcHRlcjxhbnk+LFxuICAgICAgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5tZXJpZGlhbiA9IF9jb25maWcubWVyaWRpYW47XG4gICAgdGhpcy5zcGlubmVycyA9IF9jb25maWcuc3Bpbm5lcnM7XG4gICAgdGhpcy5zZWNvbmRzID0gX2NvbmZpZy5zZWNvbmRzO1xuICAgIHRoaXMuaG91clN0ZXAgPSBfY29uZmlnLmhvdXJTdGVwO1xuICAgIHRoaXMubWludXRlU3RlcCA9IF9jb25maWcubWludXRlU3RlcDtcbiAgICB0aGlzLnNlY29uZFN0ZXAgPSBfY29uZmlnLnNlY29uZFN0ZXA7XG4gICAgdGhpcy5kaXNhYmxlZCA9IF9jb25maWcuZGlzYWJsZWQ7XG4gICAgdGhpcy5yZWFkb25seUlucHV0cyA9IF9jb25maWcucmVhZG9ubHlJbnB1dHM7XG4gICAgdGhpcy5zaXplID0gX2NvbmZpZy5zaXplO1xuICB9XG5cbiAgb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xuICAgIGNvbnN0IHN0cnVjdFZhbHVlID0gdGhpcy5fbmdiVGltZUFkYXB0ZXIuZnJvbU1vZGVsKHZhbHVlKTtcbiAgICB0aGlzLm1vZGVsID0gc3RydWN0VmFsdWUgPyBuZXcgTmdiVGltZShzdHJ1Y3RWYWx1ZS5ob3VyLCBzdHJ1Y3RWYWx1ZS5taW51dGUsIHN0cnVjdFZhbHVlLnNlY29uZCkgOiBuZXcgTmdiVGltZSgpO1xuICAgIGlmICghdGhpcy5zZWNvbmRzICYmICghc3RydWN0VmFsdWUgfHwgIWlzTnVtYmVyKHN0cnVjdFZhbHVlLnNlY29uZCkpKSB7XG4gICAgICB0aGlzLm1vZGVsLnNlY29uZCA9IDA7XG4gICAgfVxuICAgIHRoaXMuX2NkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uQ2hhbmdlID0gZm47IH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gYW55KTogdm9pZCB7IHRoaXMub25Ub3VjaGVkID0gZm47IH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHsgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7IH1cblxuICBjaGFuZ2VIb3VyKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMubW9kZWwuY2hhbmdlSG91cihzdGVwKTtcbiAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKCk7XG4gIH1cblxuICBjaGFuZ2VNaW51dGUoc3RlcDogbnVtYmVyKSB7XG4gICAgdGhpcy5tb2RlbC5jaGFuZ2VNaW51dGUoc3RlcCk7XG4gICAgdGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZSgpO1xuICB9XG5cbiAgY2hhbmdlU2Vjb25kKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMubW9kZWwuY2hhbmdlU2Vjb25kKHN0ZXApO1xuICAgIHRoaXMucHJvcGFnYXRlTW9kZWxDaGFuZ2UoKTtcbiAgfVxuXG4gIHVwZGF0ZUhvdXIobmV3VmFsOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpc1BNID0gdGhpcy5tb2RlbC5ob3VyID49IDEyO1xuICAgIGNvbnN0IGVudGVyZWRIb3VyID0gdG9JbnRlZ2VyKG5ld1ZhbCk7XG4gICAgaWYgKHRoaXMubWVyaWRpYW4gJiYgKGlzUE0gJiYgZW50ZXJlZEhvdXIgPCAxMiB8fCAhaXNQTSAmJiBlbnRlcmVkSG91ciA9PT0gMTIpKSB7XG4gICAgICB0aGlzLm1vZGVsLnVwZGF0ZUhvdXIoZW50ZXJlZEhvdXIgKyAxMik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW9kZWwudXBkYXRlSG91cihlbnRlcmVkSG91cik7XG4gICAgfVxuICAgIHRoaXMucHJvcGFnYXRlTW9kZWxDaGFuZ2UoKTtcbiAgfVxuXG4gIHVwZGF0ZU1pbnV0ZShuZXdWYWw6IHN0cmluZykge1xuICAgIHRoaXMubW9kZWwudXBkYXRlTWludXRlKHRvSW50ZWdlcihuZXdWYWwpKTtcbiAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKCk7XG4gIH1cblxuICB1cGRhdGVTZWNvbmQobmV3VmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1vZGVsLnVwZGF0ZVNlY29uZCh0b0ludGVnZXIobmV3VmFsKSk7XG4gICAgdGhpcy5wcm9wYWdhdGVNb2RlbENoYW5nZSgpO1xuICB9XG5cbiAgdG9nZ2xlTWVyaWRpYW4oKSB7XG4gICAgaWYgKHRoaXMubWVyaWRpYW4pIHtcbiAgICAgIHRoaXMuY2hhbmdlSG91cigxMik7XG4gICAgfVxuICB9XG5cbiAgZm9ybWF0SG91cih2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKGlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgaWYgKHRoaXMubWVyaWRpYW4pIHtcbiAgICAgICAgcmV0dXJuIHBhZE51bWJlcih2YWx1ZSAlIDEyID09PSAwID8gMTIgOiB2YWx1ZSAlIDEyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwYWROdW1iZXIodmFsdWUgJSAyNCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwYWROdW1iZXIoTmFOKTtcbiAgICB9XG4gIH1cblxuICBmb3JtYXRNaW5TZWModmFsdWU6IG51bWJlcikgeyByZXR1cm4gcGFkTnVtYmVyKHZhbHVlKTsgfVxuXG4gIGdldCBpc1NtYWxsU2l6ZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ3NtYWxsJzsgfVxuXG4gIGdldCBpc0xhcmdlU2l6ZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ2xhcmdlJzsgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlc1snc2Vjb25kcyddICYmICF0aGlzLnNlY29uZHMgJiYgdGhpcy5tb2RlbCAmJiAhaXNOdW1iZXIodGhpcy5tb2RlbC5zZWNvbmQpKSB7XG4gICAgICB0aGlzLm1vZGVsLnNlY29uZCA9IDA7XG4gICAgICB0aGlzLnByb3BhZ2F0ZU1vZGVsQ2hhbmdlKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHByb3BhZ2F0ZU1vZGVsQ2hhbmdlKHRvdWNoZWQgPSB0cnVlKSB7XG4gICAgaWYgKHRvdWNoZWQpIHtcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLm1vZGVsLmlzVmFsaWQodGhpcy5zZWNvbmRzKSkge1xuICAgICAgdGhpcy5vbkNoYW5nZShcbiAgICAgICAgICB0aGlzLl9uZ2JUaW1lQWRhcHRlci50b01vZGVsKHtob3VyOiB0aGlzLm1vZGVsLmhvdXIsIG1pbnV0ZTogdGhpcy5tb2RlbC5taW51dGUsIHNlY29uZDogdGhpcy5tb2RlbC5zZWNvbmR9KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fbmdiVGltZUFkYXB0ZXIudG9Nb2RlbChudWxsKSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge05nYlRpbWVwaWNrZXJ9IGZyb20gJy4vdGltZXBpY2tlcic7XG5cbmV4cG9ydCB7TmdiVGltZXBpY2tlcn0gZnJvbSAnLi90aW1lcGlja2VyJztcbmV4cG9ydCB7TmdiVGltZXBpY2tlckNvbmZpZ30gZnJvbSAnLi90aW1lcGlja2VyLWNvbmZpZyc7XG5leHBvcnQge05nYlRpbWVTdHJ1Y3R9IGZyb20gJy4vbmdiLXRpbWUtc3RydWN0JztcbmV4cG9ydCB7TmdiVGltZUFkYXB0ZXJ9IGZyb20gJy4vbmdiLXRpbWUtYWRhcHRlcic7XG5cbkBOZ01vZHVsZSh7ZGVjbGFyYXRpb25zOiBbTmdiVGltZXBpY2tlcl0sIGV4cG9ydHM6IFtOZ2JUaW1lcGlja2VyXSwgaW1wb3J0czogW0NvbW1vbk1vZHVsZV19KVxuZXhwb3J0IGNsYXNzIE5nYlRpbWVwaWNrZXJNb2R1bGUge1xuICAvKipcbiAgICogSW1wb3J0aW5nIHdpdGggJy5mb3JSb290KCknIGlzIG5vIGxvbmdlciBuZWNlc3NhcnksIHlvdSBjYW4gc2ltcGx5IGltcG9ydCB0aGUgbW9kdWxlLlxuICAgKiBXaWxsIGJlIHJlbW92ZWQgaW4gNC4wLjAuXG4gICAqXG4gICAqIEBkZXByZWNhdGVkIDMuMC4wXG4gICAqL1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiVGltZXBpY2tlck1vZHVsZX07IH1cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1BsYWNlbWVudEFycmF5fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBOZ2JUb29sdGlwIGRpcmVjdGl2ZS5cbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxuICogb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZSB0b29sdGlwcyB1c2VkIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTmdiVG9vbHRpcENvbmZpZyB7XG4gIGF1dG9DbG9zZTogYm9vbGVhbiB8ICdpbnNpZGUnIHwgJ291dHNpZGUnID0gdHJ1ZTtcbiAgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9ICdhdXRvJztcbiAgdHJpZ2dlcnMgPSAnaG92ZXIgZm9jdXMnO1xuICBjb250YWluZXI6IHN0cmluZztcbiAgZGlzYWJsZVRvb2x0aXAgPSBmYWxzZTtcbiAgdG9vbHRpcENsYXNzOiBzdHJpbmc7XG4gIG9wZW5EZWxheSA9IDA7XG4gIGNsb3NlRGVsYXkgPSAwO1xufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBSZW5kZXJlcjIsXG4gIENvbXBvbmVudFJlZixcbiAgRWxlbWVudFJlZixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgTmdab25lLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge2xpc3RlblRvVHJpZ2dlcnN9IGZyb20gJy4uL3V0aWwvdHJpZ2dlcnMnO1xuaW1wb3J0IHtuZ2JBdXRvQ2xvc2V9IGZyb20gJy4uL3V0aWwvYXV0b2Nsb3NlJztcbmltcG9ydCB7cG9zaXRpb25FbGVtZW50cywgUGxhY2VtZW50QXJyYXl9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xuaW1wb3J0IHtQb3B1cFNlcnZpY2V9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xuXG5pbXBvcnQge05nYlRvb2x0aXBDb25maWd9IGZyb20gJy4vdG9vbHRpcC1jb25maWcnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLXRvb2x0aXAtd2luZG93JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHsnW2NsYXNzXSc6ICdcInRvb2x0aXAgc2hvd1wiICsgKHRvb2x0aXBDbGFzcyA/IFwiIFwiICsgdG9vbHRpcENsYXNzIDogXCJcIiknLCAncm9sZSc6ICd0b29sdGlwJywgJ1tpZF0nOiAnaWQnfSxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiYXJyb3dcIj48L2Rpdj48ZGl2IGNsYXNzPVwidG9vbHRpcC1pbm5lclwiPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj5gLFxuICBzdHlsZVVybHM6IFsnLi90b29sdGlwLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JUb29sdGlwV2luZG93IHtcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KCkgdG9vbHRpcENsYXNzOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQSBsaWdodHdlaWdodCwgZXh0ZW5zaWJsZSBkaXJlY3RpdmUgZm9yIGZhbmN5IHRvb2x0aXAgY3JlYXRpb24uXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nYlRvb2x0aXBdJywgZXhwb3J0QXM6ICduZ2JUb29sdGlwJ30pXG5leHBvcnQgY2xhc3MgTmdiVG9vbHRpcCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSB0b29sdGlwIHNob3VsZCBiZSBjbG9zZWQgb24gRXNjYXBlIGtleSBhbmQgaW5zaWRlL291dHNpZGUgY2xpY2tzLlxuICAgKlxuICAgKiAtIHRydWUgKGRlZmF1bHQpOiBjbG9zZXMgb24gYm90aCBvdXRzaWRlIGFuZCBpbnNpZGUgY2xpY2tzIGFzIHdlbGwgYXMgRXNjYXBlIHByZXNzZXNcbiAgICogLSBmYWxzZTogZGlzYWJsZXMgdGhlIGF1dG9DbG9zZSBmZWF0dXJlIChOQjogdHJpZ2dlcnMgc3RpbGwgYXBwbHkpXG4gICAqIC0gJ2luc2lkZSc6IGNsb3NlcyBvbiBpbnNpZGUgY2xpY2tzIGFzIHdlbGwgYXMgRXNjYXBlIHByZXNzZXNcbiAgICogLSAnb3V0c2lkZSc6IGNsb3NlcyBvbiBvdXRzaWRlIGNsaWNrcyAoc29tZXRpbWVzIGFsc28gYWNoaWV2YWJsZSB0aHJvdWdoIHRyaWdnZXJzKVxuICAgKiBhcyB3ZWxsIGFzIEVzY2FwZSBwcmVzc2VzXG4gICAqXG4gICAqIEBzaW5jZSAzLjAuMFxuICAgKi9cbiAgQElucHV0KCkgYXV0b0Nsb3NlOiBib29sZWFuIHwgJ2luc2lkZScgfCAnb3V0c2lkZSc7XG4gIC8qKlxuICAgICogUGxhY2VtZW50IG9mIGEgdG9vbHRpcCBhY2NlcHRzOlxuICAgICogICAgXCJ0b3BcIiwgXCJ0b3AtbGVmdFwiLCBcInRvcC1yaWdodFwiLCBcImJvdHRvbVwiLCBcImJvdHRvbS1sZWZ0XCIsIFwiYm90dG9tLXJpZ2h0XCIsXG4gICAgKiAgICBcImxlZnRcIiwgXCJsZWZ0LXRvcFwiLCBcImxlZnQtYm90dG9tXCIsIFwicmlnaHRcIiwgXCJyaWdodC10b3BcIiwgXCJyaWdodC1ib3R0b21cIixcbiAgICAqICBhcnJheSBvciBhIHNwYWNlIHNlcGFyYXRlZCBzdHJpbmcgb2YgYWJvdmUgdmFsdWVzXG4gICAgKi9cbiAgQElucHV0KCkgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheTtcbiAgLyoqXG4gICAqIFNwZWNpZmllcyBldmVudHMgdGhhdCBzaG91bGQgdHJpZ2dlci4gU3VwcG9ydHMgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiBldmVudCBuYW1lcy5cbiAgICovXG4gIEBJbnB1dCgpIHRyaWdnZXJzOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxuICAgKiBDdXJyZW50bHkgb25seSBzdXBwb3J0cyBcImJvZHlcIi5cbiAgICovXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xuICAvKipcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgYSBnaXZlbiB0b29sdGlwIGlzIGRpc2FibGVkIGFuZCBzaG91bGQgbm90IGJlIGRpc3BsYXllZC5cbiAgICpcbiAgICogQHNpbmNlIDEuMS4wXG4gICAqL1xuICBASW5wdXQoKSBkaXNhYmxlVG9vbHRpcDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEFuIG9wdGlvbmFsIGNsYXNzIGFwcGxpZWQgdG8gbmdiLXRvb2x0aXAtd2luZG93XG4gICAqXG4gICAqIEBzaW5jZSAzLjIuMFxuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcENsYXNzOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBPcGVuaW5nIGRlbGF5IGluIG1zLiBXb3JrcyBvbmx5IGZvciBub24tbWFudWFsIG9wZW5pbmcgdHJpZ2dlcnMuXG4gICAqXG4gICAqIEBzaW5jZSA0LjEuMFxuICAgKi9cbiAgQElucHV0KCkgb3BlbkRlbGF5OiBudW1iZXI7XG4gIC8qKlxuICAgKiBDbG9zaW5nIGRlbGF5IGluIG1zLiBXb3JrcyBvbmx5IGZvciBub24tbWFudWFsIGNsb3NpbmcgdHJpZ2dlcnMuXG4gICAqXG4gICAqIEBzaW5jZSA0LjEuMFxuICAgKi9cbiAgQElucHV0KCkgY2xvc2VEZWxheTogbnVtYmVyO1xuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgdG9vbHRpcCBpcyBzaG93blxuICAgKi9cbiAgQE91dHB1dCgpIHNob3duID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgdG9vbHRpcCBpcyBoaWRkZW5cbiAgICovXG4gIEBPdXRwdXQoKSBoaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfbmdiVG9vbHRpcDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcbiAgcHJpdmF0ZSBfbmdiVG9vbHRpcFdpbmRvd0lkID0gYG5nYi10b29sdGlwLSR7bmV4dElkKyt9YDtcbiAgcHJpdmF0ZSBfcG9wdXBTZXJ2aWNlOiBQb3B1cFNlcnZpY2U8TmdiVG9vbHRpcFdpbmRvdz47XG4gIHByaXZhdGUgX3dpbmRvd1JlZjogQ29tcG9uZW50UmVmPE5nYlRvb2x0aXBXaW5kb3c+O1xuICBwcml2YXRlIF91bnJlZ2lzdGVyTGlzdGVuZXJzRm47XG4gIHByaXZhdGUgX3pvbmVTdWJzY3JpcHRpb246IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZiwgY29uZmlnOiBOZ2JUb29sdGlwQ29uZmlnLFxuICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksIHByaXZhdGUgX2NoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuYXV0b0Nsb3NlID0gY29uZmlnLmF1dG9DbG9zZTtcbiAgICB0aGlzLnBsYWNlbWVudCA9IGNvbmZpZy5wbGFjZW1lbnQ7XG4gICAgdGhpcy50cmlnZ2VycyA9IGNvbmZpZy50cmlnZ2VycztcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XG4gICAgdGhpcy5kaXNhYmxlVG9vbHRpcCA9IGNvbmZpZy5kaXNhYmxlVG9vbHRpcDtcbiAgICB0aGlzLnRvb2x0aXBDbGFzcyA9IGNvbmZpZy50b29sdGlwQ2xhc3M7XG4gICAgdGhpcy5vcGVuRGVsYXkgPSBjb25maWcub3BlbkRlbGF5O1xuICAgIHRoaXMuY2xvc2VEZWxheSA9IGNvbmZpZy5jbG9zZURlbGF5O1xuICAgIHRoaXMuX3BvcHVwU2VydmljZSA9IG5ldyBQb3B1cFNlcnZpY2U8TmdiVG9vbHRpcFdpbmRvdz4oXG4gICAgICAgIE5nYlRvb2x0aXBXaW5kb3csIGluamVjdG9yLCB2aWV3Q29udGFpbmVyUmVmLCBfcmVuZGVyZXIsIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcik7XG5cbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gX25nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3dpbmRvd1JlZikge1xuICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKFxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl93aW5kb3dSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgdGhpcy5wbGFjZW1lbnQsXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9PT0gJ2JvZHknLCAnYnMtdG9vbHRpcCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnRlbnQgdG8gYmUgZGlzcGxheWVkIGFzIHRvb2x0aXAuIElmIGZhbHN5LCB0aGUgdG9vbHRpcCB3b24ndCBvcGVuLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IG5nYlRvb2x0aXAodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICB0aGlzLl9uZ2JUb29sdGlwID0gdmFsdWU7XG4gICAgaWYgKCF2YWx1ZSAmJiB0aGlzLl93aW5kb3dSZWYpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbmdiVG9vbHRpcCgpIHsgcmV0dXJuIHRoaXMuX25nYlRvb2x0aXA7IH1cblxuICAvKipcbiAgICogT3BlbnMgYW4gZWxlbWVudMOiwoDCmXMgdG9vbHRpcC4gVGhpcyBpcyBjb25zaWRlcmVkIGEgw6LCgMKcbWFudWFsw6LCgMKdIHRyaWdnZXJpbmcgb2YgdGhlIHRvb2x0aXAuXG4gICAqIFRoZSBjb250ZXh0IGlzIGFuIG9wdGlvbmFsIHZhbHVlIHRvIGJlIGluamVjdGVkIGludG8gdGhlIHRvb2x0aXAgdGVtcGxhdGUgd2hlbiBpdCBpcyBjcmVhdGVkLlxuICAgKi9cbiAgb3Blbihjb250ZXh0PzogYW55KSB7XG4gICAgaWYgKCF0aGlzLl93aW5kb3dSZWYgJiYgdGhpcy5fbmdiVG9vbHRpcCAmJiAhdGhpcy5kaXNhYmxlVG9vbHRpcCkge1xuICAgICAgdGhpcy5fd2luZG93UmVmID0gdGhpcy5fcG9wdXBTZXJ2aWNlLm9wZW4odGhpcy5fbmdiVG9vbHRpcCwgY29udGV4dCk7XG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UudG9vbHRpcENsYXNzID0gdGhpcy50b29sdGlwQ2xhc3M7XG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuaWQgPSB0aGlzLl9uZ2JUb29sdGlwV2luZG93SWQ7XG5cbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhcmlhLWRlc2NyaWJlZGJ5JywgdGhpcy5fbmdiVG9vbHRpcFdpbmRvd0lkKTtcblxuICAgICAgaWYgKHRoaXMuY29udGFpbmVyID09PSAnYm9keScpIHtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmNvbnRhaW5lcikuYXBwZW5kQ2hpbGQodGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICAvLyBhcHBseSBzdHlsaW5nIHRvIHNldCBiYXNpYyBjc3MtY2xhc3NlcyBvbiB0YXJnZXQgZWxlbWVudCwgYmVmb3JlIGdvaW5nIGZvciBwb3NpdGlvbmluZ1xuICAgICAgdGhpcy5fd2luZG93UmVmLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICBuZ2JBdXRvQ2xvc2UoXG4gICAgICAgICAgdGhpcy5fbmdab25lLCB0aGlzLl9kb2N1bWVudCwgdGhpcy5hdXRvQ2xvc2UsICgpID0+IHRoaXMuY2xvc2UoKSwgdGhpcy5oaWRkZW4sXG4gICAgICAgICAgW3RoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50XSk7XG5cbiAgICAgIHRoaXMuc2hvd24uZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgYW4gZWxlbWVudMOiwoDCmXMgdG9vbHRpcC4gVGhpcyBpcyBjb25zaWRlcmVkIGEgw6LCgMKcbWFudWFsw6LCgMKdIHRyaWdnZXJpbmcgb2YgdGhlIHRvb2x0aXAuXG4gICAqL1xuICBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fd2luZG93UmVmICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhcmlhLWRlc2NyaWJlZGJ5Jyk7XG4gICAgICB0aGlzLl9wb3B1cFNlcnZpY2UuY2xvc2UoKTtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IG51bGw7XG4gICAgICB0aGlzLmhpZGRlbi5lbWl0KCk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyBhbiBlbGVtZW50w6LCgMKZcyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDDosKAwpxtYW51YWzDosKAwp0gdHJpZ2dlcmluZyBvZiB0aGUgdG9vbHRpcC5cbiAgICovXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fd2luZG93UmVmKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB0b29sdGlwIGlzIGN1cnJlbnRseSBiZWluZyBzaG93blxuICAgKi9cbiAgaXNPcGVuKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fd2luZG93UmVmICE9IG51bGw7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4gPSBsaXN0ZW5Ub1RyaWdnZXJzKFxuICAgICAgICB0aGlzLl9yZW5kZXJlciwgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLnRyaWdnZXJzLCB0aGlzLmlzT3Blbi5iaW5kKHRoaXMpLCB0aGlzLm9wZW4uYmluZCh0aGlzKSxcbiAgICAgICAgdGhpcy5jbG9zZS5iaW5kKHRoaXMpLCArdGhpcy5vcGVuRGVsYXksICt0aGlzLmNsb3NlRGVsYXkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIC8vIFRoaXMgY2hlY2sgaXMgbmVlZGVkIGFzIGl0IG1pZ2h0IGhhcHBlbiB0aGF0IG5nT25EZXN0cm95IGlzIGNhbGxlZCBiZWZvcmUgbmdPbkluaXRcbiAgICAvLyB1bmRlciBjZXJ0YWluIGNvbmRpdGlvbnMsIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL25nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvaXNzdWVzLzIxOTlcbiAgICBpZiAodGhpcy5fdW5yZWdpc3Rlckxpc3RlbmVyc0ZuKSB7XG4gICAgICB0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4oKTtcbiAgICB9XG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtOZ2JUb29sdGlwLCBOZ2JUb29sdGlwV2luZG93fSBmcm9tICcuL3Rvb2x0aXAnO1xuXG5leHBvcnQge05nYlRvb2x0aXBDb25maWd9IGZyb20gJy4vdG9vbHRpcC1jb25maWcnO1xuZXhwb3J0IHtOZ2JUb29sdGlwfSBmcm9tICcuL3Rvb2x0aXAnO1xuZXhwb3J0IHtQbGFjZW1lbnR9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xuXG5ATmdNb2R1bGUoe2RlY2xhcmF0aW9uczogW05nYlRvb2x0aXAsIE5nYlRvb2x0aXBXaW5kb3ddLCBleHBvcnRzOiBbTmdiVG9vbHRpcF0sIGVudHJ5Q29tcG9uZW50czogW05nYlRvb2x0aXBXaW5kb3ddfSlcbmV4cG9ydCBjbGFzcyBOZ2JUb29sdGlwTW9kdWxlIHtcbiAgLyoqXG4gICAqIE5vIG5lZWQgaW4gZm9yUm9vdCBhbnltb3JlIHdpdGggdHJlZS1zaGFrZWFibGUgc2VydmljZXNcbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcbiAgICovXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JUb29sdGlwTW9kdWxlfTsgfVxufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBTaW1wbGVDaGFuZ2VzLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3JlZ0V4cEVzY2FwZSwgdG9TdHJpbmd9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5cbi8qKlxuICogQSBjb21wb25lbnQgdGhhdCBjYW4gYmUgdXNlZCBpbnNpZGUgYSBjdXN0b20gcmVzdWx0IHRlbXBsYXRlIGluIG9yZGVyIHRvIGhpZ2hsaWdodCB0aGUgdGVybSBpbnNpZGUgdGhlIHRleHQgb2YgdGhlXG4gKiByZXN1bHRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLWhpZ2hsaWdodCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJwYXJ0c1wiIGxldC1wYXJ0IGxldC1pc09kZD1cIm9kZFwiPmAgK1xuICAgICAgYDxzcGFuICpuZ0lmPVwiaXNPZGQ7IGVsc2UgZXZlblwiIFtjbGFzc109XCJoaWdobGlnaHRDbGFzc1wiPnt7cGFydH19PC9zcGFuPjxuZy10ZW1wbGF0ZSAjZXZlbj57e3BhcnR9fTwvbmctdGVtcGxhdGU+YCArXG4gICAgICBgPC9uZy10ZW1wbGF0ZT5gLCAgLy8gdGVtcGxhdGUgbmVlZHMgdG8gYmUgZm9ybWF0dGVkIGluIGEgY2VydGFpbiB3YXkgc28gd2UgZG9uJ3QgYWRkIGVtcHR5IHRleHQgbm9kZXNcbiAgc3R5bGVVcmxzOiBbJy4vaGlnaGxpZ2h0LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JIaWdobGlnaHQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBwYXJ0czogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIFRoZSBDU1MgY2xhc3Mgb2YgdGhlIHNwYW4gZWxlbWVudHMgd3JhcHBpbmcgdGhlIHRlcm0gaW5zaWRlIHRoZSByZXN1bHRcbiAgICovXG4gIEBJbnB1dCgpIGhpZ2hsaWdodENsYXNzID0gJ25nYi1oaWdobGlnaHQnO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVzdWx0IHRleHQgdG8gZGlzcGxheS4gSWYgdGhlIHRlcm0gaXMgZm91bmQgaW5zaWRlIHRoaXMgdGV4dCwgaXQncyBoaWdobGlnaHRlZFxuICAgKi9cbiAgQElucHV0KCkgcmVzdWx0OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBzZWFyY2hlZCB0ZXJtXG4gICAqL1xuICBASW5wdXQoKSB0ZXJtOiBzdHJpbmc7XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IHJlc3VsdFN0ciA9IHRvU3RyaW5nKHRoaXMucmVzdWx0KTtcbiAgICBjb25zdCByZXN1bHRMQyA9IHJlc3VsdFN0ci50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IHRlcm1MQyA9IHRvU3RyaW5nKHRoaXMudGVybSkudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgY3VycmVudElkeCA9IDA7XG5cbiAgICBpZiAodGVybUxDLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMucGFydHMgPSByZXN1bHRMQy5zcGxpdChuZXcgUmVnRXhwKGAoJHtyZWdFeHBFc2NhcGUodGVybUxDKX0pYCkpLm1hcCgocGFydCkgPT4ge1xuICAgICAgICBjb25zdCBvcmlnaW5hbFBhcnQgPSByZXN1bHRTdHIuc3Vic3RyKGN1cnJlbnRJZHgsIHBhcnQubGVuZ3RoKTtcbiAgICAgICAgY3VycmVudElkeCArPSBwYXJ0Lmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsUGFydDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhcnRzID0gW3Jlc3VsdFN0cl07XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBUZW1wbGF0ZVJlZiwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHt0b1N0cmluZ30gZnJvbSAnLi4vdXRpbC91dGlsJztcblxuLyoqXG4gKiBDb250ZXh0IGZvciB0aGUgdHlwZWFoZWFkIHJlc3VsdCB0ZW1wbGF0ZSBpbiBjYXNlIHlvdSB3YW50IHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IG9uZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlc3VsdFRlbXBsYXRlQ29udGV4dCB7XG4gIC8qKlxuICAgKiBZb3VyIHR5cGVhaGVhZCByZXN1bHQgZGF0YSBtb2RlbFxuICAgKi9cbiAgcmVzdWx0OiBhbnk7XG5cbiAgLyoqXG4gICAqIFNlYXJjaCB0ZXJtIGZyb20gdGhlIGlucHV0IHVzZWQgdG8gZ2V0IGN1cnJlbnQgcmVzdWx0XG4gICAqL1xuICB0ZXJtOiBzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi10eXBlYWhlYWQtd2luZG93JyxcbiAgZXhwb3J0QXM6ICduZ2JUeXBlYWhlYWRXaW5kb3cnLFxuICBob3N0OiB7Jyhtb3VzZWRvd24pJzogJyRldmVudC5wcmV2ZW50RGVmYXVsdCgpJywgJ2NsYXNzJzogJ2Ryb3Bkb3duLW1lbnUgc2hvdycsICdyb2xlJzogJ2xpc3Rib3gnLCAnW2lkXSc6ICdpZCd9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjcnQgbGV0LXJlc3VsdD1cInJlc3VsdFwiIGxldC10ZXJtPVwidGVybVwiIGxldC1mb3JtYXR0ZXI9XCJmb3JtYXR0ZXJcIj5cbiAgICAgIDxuZ2ItaGlnaGxpZ2h0IFtyZXN1bHRdPVwiZm9ybWF0dGVyKHJlc3VsdClcIiBbdGVybV09XCJ0ZXJtXCI+PC9uZ2ItaGlnaGxpZ2h0PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5nRm9yIFtuZ0Zvck9mXT1cInJlc3VsdHNcIiBsZXQtcmVzdWx0IGxldC1pZHg9XCJpbmRleFwiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgIFtpZF09XCJpZCArICctJyArIGlkeFwiXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaWR4ID09PSBhY3RpdmVJZHhcIlxuICAgICAgICAobW91c2VlbnRlcik9XCJtYXJrQWN0aXZlKGlkeClcIlxuICAgICAgICAoY2xpY2spPVwic2VsZWN0KHJlc3VsdClcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwicmVzdWx0VGVtcGxhdGUgfHwgcnRcIlxuICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7cmVzdWx0OiByZXN1bHQsIHRlcm06IHRlcm0sIGZvcm1hdHRlcjogZm9ybWF0dGVyfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYlR5cGVhaGVhZFdpbmRvdyBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGFjdGl2ZUlkeCA9IDA7XG5cbiAgLyoqXG4gICAqICBUaGUgaWQgZm9yIHRoZSB0eXBlYWhlYWQgd2luZG93LiBUaGUgaWQgc2hvdWxkIGJlIHVuaXF1ZSBhbmQgdGhlIHNhbWVcbiAgICogIGFzIHRoZSBhc3NvY2lhdGVkIHR5cGVhaGVhZCdzIGlkLlxuICAgKi9cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICAvKipcbiAgICogRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBmaXJzdCByb3cgc2hvdWxkIGJlIGFjdGl2ZSBpbml0aWFsbHlcbiAgICovXG4gIEBJbnB1dCgpIGZvY3VzRmlyc3QgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUeXBlYWhlYWQgbWF0Y2ggcmVzdWx0cyB0byBiZSBkaXNwbGF5ZWRcbiAgICovXG4gIEBJbnB1dCgpIHJlc3VsdHM7XG5cbiAgLyoqXG4gICAqIFNlYXJjaCB0ZXJtIHVzZWQgdG8gZ2V0IGN1cnJlbnQgcmVzdWx0c1xuICAgKi9cbiAgQElucHV0KCkgdGVybTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHVzZWQgdG8gZm9ybWF0IGEgZ2l2ZW4gcmVzdWx0IGJlZm9yZSBkaXNwbGF5LiBUaGlzIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gYSBmb3JtYXR0ZWQgc3RyaW5nIHdpdGhvdXQgYW55XG4gICAqIEhUTUwgbWFya3VwXG4gICAqL1xuICBASW5wdXQoKSBmb3JtYXR0ZXIgPSB0b1N0cmluZztcblxuICAvKipcbiAgICogQSB0ZW1wbGF0ZSB0byBvdmVycmlkZSBhIG1hdGNoaW5nIHJlc3VsdCBkZWZhdWx0IGRpc3BsYXlcbiAgICovXG4gIEBJbnB1dCgpIHJlc3VsdFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxSZXN1bHRUZW1wbGF0ZUNvbnRleHQ+O1xuXG4gIC8qKlxuICAgKiBFdmVudCByYWlzZWQgd2hlbiB1c2VyIHNlbGVjdHMgYSBwYXJ0aWN1bGFyIHJlc3VsdCByb3dcbiAgICovXG4gIEBPdXRwdXQoJ3NlbGVjdCcpIHNlbGVjdEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoJ2FjdGl2ZUNoYW5nZScpIGFjdGl2ZUNoYW5nZUV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGhhc0FjdGl2ZSgpIHsgcmV0dXJuIHRoaXMuYWN0aXZlSWR4ID4gLTEgJiYgdGhpcy5hY3RpdmVJZHggPCB0aGlzLnJlc3VsdHMubGVuZ3RoOyB9XG5cbiAgZ2V0QWN0aXZlKCkgeyByZXR1cm4gdGhpcy5yZXN1bHRzW3RoaXMuYWN0aXZlSWR4XTsgfVxuXG4gIG1hcmtBY3RpdmUoYWN0aXZlSWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLmFjdGl2ZUlkeCA9IGFjdGl2ZUlkeDtcbiAgICB0aGlzLl9hY3RpdmVDaGFuZ2VkKCk7XG4gIH1cblxuICBuZXh0KCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZUlkeCA9PT0gdGhpcy5yZXN1bHRzLmxlbmd0aCAtIDEpIHtcbiAgICAgIHRoaXMuYWN0aXZlSWR4ID0gdGhpcy5mb2N1c0ZpcnN0ID8gKHRoaXMuYWN0aXZlSWR4ICsgMSkgJSB0aGlzLnJlc3VsdHMubGVuZ3RoIDogLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlSWR4Kys7XG4gICAgfVxuICAgIHRoaXMuX2FjdGl2ZUNoYW5nZWQoKTtcbiAgfVxuXG4gIHByZXYoKSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlSWR4IDwgMCkge1xuICAgICAgdGhpcy5hY3RpdmVJZHggPSB0aGlzLnJlc3VsdHMubGVuZ3RoIC0gMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZlSWR4ID09PSAwKSB7XG4gICAgICB0aGlzLmFjdGl2ZUlkeCA9IHRoaXMuZm9jdXNGaXJzdCA/IHRoaXMucmVzdWx0cy5sZW5ndGggLSAxIDogLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlSWR4LS07XG4gICAgfVxuICAgIHRoaXMuX2FjdGl2ZUNoYW5nZWQoKTtcbiAgfVxuXG4gIHJlc2V0QWN0aXZlKCkge1xuICAgIHRoaXMuYWN0aXZlSWR4ID0gdGhpcy5mb2N1c0ZpcnN0ID8gMCA6IC0xO1xuICAgIHRoaXMuX2FjdGl2ZUNoYW5nZWQoKTtcbiAgfVxuXG4gIHNlbGVjdChpdGVtKSB7IHRoaXMuc2VsZWN0RXZlbnQuZW1pdChpdGVtKTsgfVxuXG4gIG5nT25Jbml0KCkgeyB0aGlzLnJlc2V0QWN0aXZlKCk7IH1cblxuICBwcml2YXRlIF9hY3RpdmVDaGFuZ2VkKCkge1xuICAgIHRoaXMuYWN0aXZlQ2hhbmdlRXZlbnQuZW1pdCh0aGlzLmFjdGl2ZUlkeCA+PSAwID8gdGhpcy5pZCArICctJyArIHRoaXMuYWN0aXZlSWR4IDogdW5kZWZpbmVkKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3QsIEluamVjdGlvblRva2VuLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuXG5cbi8vIHVzZWZ1bG5lc3MgKGFuZCBkZWZhdWx0IHZhbHVlKSBvZiBkZWxheSBkb2N1bWVudGVkIGluIE1hdGVyaWFsJ3MgQ0RLXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvYmxvYi82NDA1ZGE5YjhlODUzMmE3ZTVjODU0YzkyMGVlMTgxNWMyNzVkNzM0L3NyYy9jZGsvYTExeS9saXZlLWFubm91bmNlci9saXZlLWFubm91bmNlci50cyNMNTBcbmV4cG9ydCB0eXBlIEFSSUFfTElWRV9ERUxBWV9UWVBFID0gbnVtYmVyIHwgbnVsbDtcbmV4cG9ydCBjb25zdCBBUklBX0xJVkVfREVMQVkgPSBuZXcgSW5qZWN0aW9uVG9rZW48QVJJQV9MSVZFX0RFTEFZX1RZUEU+KFxuICAgICdsaXZlIGFubm91bmNlciBkZWxheScsIHtwcm92aWRlZEluOiAncm9vdCcsIGZhY3Rvcnk6IEFSSUFfTElWRV9ERUxBWV9GQUNUT1JZfSk7XG5leHBvcnQgZnVuY3Rpb24gQVJJQV9MSVZFX0RFTEFZX0ZBQ1RPUlkoKTogbnVtYmVyIHtcbiAgcmV0dXJuIDEwMDtcbn1cblxuXG5mdW5jdGlvbiBnZXRMaXZlRWxlbWVudChkb2N1bWVudDogYW55LCBsYXp5Q3JlYXRlID0gZmFsc2UpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcignI25nYi1saXZlJykgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgaWYgKGVsZW1lbnQgPT0gbnVsbCAmJiBsYXp5Q3JlYXRlKSB7XG4gICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25nYi1saXZlJyk7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScsICdwb2xpdGUnKTtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1hdG9taWMnLCAndHJ1ZScpO1xuXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzci1vbmx5Jyk7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cblxuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBMaXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSwgQEluamVjdChBUklBX0xJVkVfREVMQVkpIHByaXZhdGUgX2RlbGF5OiBhbnkpIHt9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGdldExpdmVFbGVtZW50KHRoaXMuX2RvY3VtZW50KTtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHNheShtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZ2V0TGl2ZUVsZW1lbnQodGhpcy5fZG9jdW1lbnQsIHRydWUpO1xuICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5fZGVsYXk7XG5cbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gJyc7XG4gICAgY29uc3Qgc2V0VGV4dCA9ICgpID0+IGVsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICAgIGlmIChkZWxheSA9PT0gbnVsbCkge1xuICAgICAgc2V0VGV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRUaW1lb3V0KHNldFRleHQsIGRlbGF5KTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1BsYWNlbWVudEFycmF5fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBOZ2JUeXBlYWhlYWQgY29tcG9uZW50LlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIHR5cGVhaGVhZHMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIE5nYlR5cGVhaGVhZENvbmZpZyB7XG4gIGNvbnRhaW5lcjtcbiAgZWRpdGFibGUgPSB0cnVlO1xuICBmb2N1c0ZpcnN0ID0gdHJ1ZTtcbiAgc2hvd0hpbnQgPSBmYWxzZTtcbiAgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9IFsnYm90dG9tLWxlZnQnLCAnYm90dG9tLXJpZ2h0JywgJ3RvcC1sZWZ0JywgJ3RvcC1yaWdodCddO1xufVxuIiwiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIGZyb21FdmVudCwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwLCBzd2l0Y2hNYXAsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0xpdmV9IGZyb20gJy4uL3V0aWwvYWNjZXNzaWJpbGl0eS9saXZlJztcbmltcG9ydCB7bmdiQXV0b0Nsb3NlfSBmcm9tICcuLi91dGlsL2F1dG9jbG9zZSc7XG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xuaW1wb3J0IHtQb3B1cFNlcnZpY2V9IGZyb20gJy4uL3V0aWwvcG9wdXAnO1xuaW1wb3J0IHtQbGFjZW1lbnRBcnJheSwgcG9zaXRpb25FbGVtZW50c30gZnJvbSAnLi4vdXRpbC9wb3NpdGlvbmluZyc7XG5pbXBvcnQge2lzRGVmaW5lZCwgdG9TdHJpbmd9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5cbmltcG9ydCB7TmdiVHlwZWFoZWFkQ29uZmlnfSBmcm9tICcuL3R5cGVhaGVhZC1jb25maWcnO1xuaW1wb3J0IHtOZ2JUeXBlYWhlYWRXaW5kb3csIFJlc3VsdFRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi90eXBlYWhlYWQtd2luZG93JztcblxuXG5jb25zdCBOR0JfVFlQRUFIRUFEX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmdiVHlwZWFoZWFkKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qKlxuICogUGF5bG9hZCBvZiB0aGUgc2VsZWN0SXRlbSBldmVudC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnQge1xuICAvKipcbiAgICogQW4gaXRlbSBhYm91dCB0byBiZSBzZWxlY3RlZFxuICAgKi9cbiAgaXRlbTogYW55O1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IHdpbGwgcHJldmVudCBpdGVtIHNlbGVjdGlvbiBpZiBjYWxsZWRcbiAgICovXG4gIHByZXZlbnREZWZhdWx0OiAoKSA9PiB2b2lkO1xufVxuXG5sZXQgbmV4dFdpbmRvd0lkID0gMDtcblxuLyoqXG4gKiBOZ2JUeXBlYWhlYWQgZGlyZWN0aXZlIHByb3ZpZGVzIGEgc2ltcGxlIHdheSBvZiBjcmVhdGluZyBwb3dlcmZ1bCB0eXBlYWhlYWRzIGZyb20gYW55IHRleHQgaW5wdXRcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnaW5wdXRbbmdiVHlwZWFoZWFkXScsXG4gIGV4cG9ydEFzOiAnbmdiVHlwZWFoZWFkJyxcbiAgaG9zdDoge1xuICAgICcoYmx1ciknOiAnaGFuZGxlQmx1cigpJyxcbiAgICAnW2NsYXNzLm9wZW5dJzogJ2lzUG9wdXBPcGVuKCknLFxuICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5RG93bigkZXZlbnQpJyxcbiAgICAnW2F1dG9jb21wbGV0ZV0nOiAnYXV0b2NvbXBsZXRlJyxcbiAgICAnYXV0b2NhcGl0YWxpemUnOiAnb2ZmJyxcbiAgICAnYXV0b2NvcnJlY3QnOiAnb2ZmJyxcbiAgICAncm9sZSc6ICdjb21ib2JveCcsXG4gICAgJ2FyaWEtbXVsdGlsaW5lJzogJ2ZhbHNlJyxcbiAgICAnW2F0dHIuYXJpYS1hdXRvY29tcGxldGVdJzogJ3Nob3dIaW50ID8gXCJib3RoXCIgOiBcImxpc3RcIicsXG4gICAgJ1thdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF0nOiAnYWN0aXZlRGVzY2VuZGFudCcsXG4gICAgJ1thdHRyLmFyaWEtb3duc10nOiAnaXNQb3B1cE9wZW4oKSA/IHBvcHVwSWQgOiBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnaXNQb3B1cE9wZW4oKSdcbiAgfSxcbiAgcHJvdmlkZXJzOiBbTkdCX1RZUEVBSEVBRF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTmdiVHlwZWFoZWFkIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9wb3B1cFNlcnZpY2U6IFBvcHVwU2VydmljZTxOZ2JUeXBlYWhlYWRXaW5kb3c+O1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfY2xvc2VkJCA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgX2lucHV0VmFsdWVCYWNrdXA6IHN0cmluZztcbiAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VzOiBPYnNlcnZhYmxlPHN0cmluZz47XG4gIHByaXZhdGUgX3Jlc3Vic2NyaWJlVHlwZWFoZWFkOiBCZWhhdmlvclN1YmplY3Q8YW55PjtcbiAgcHJpdmF0ZSBfd2luZG93UmVmOiBDb21wb25lbnRSZWY8TmdiVHlwZWFoZWFkV2luZG93PjtcbiAgcHJpdmF0ZSBfem9uZVN1YnNjcmlwdGlvbjogYW55O1xuXG4gIC8qKlxuICAgKiBWYWx1ZSBmb3IgdGhlIGNvbmZpZ3VyYWJsZSBhdXRvY29tcGxldGUgYXR0cmlidXRlLlxuICAgKiBEZWZhdWx0cyB0byAnb2ZmJyB0byBkaXNhYmxlIHRoZSBuYXRpdmUgYnJvd3NlciBhdXRvY29tcGxldGUsIGJ1dCB0aGlzIHN0YW5kYXJkIHZhbHVlIGRvZXMgbm90IHNlZW1cbiAgICogdG8gYmUgYWx3YXlzIGNvcnJlY3RseSB0YWtlbiBpbnRvIGFjY291bnQuXG4gICAqXG4gICAqIEBzaW5jZSAyLjEuMFxuICAgKi9cbiAgQElucHV0KCkgYXV0b2NvbXBsZXRlID0gJ29mZic7XG5cbiAgLyoqXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgdG9vbHRpcCBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxuICAgKi9cbiAgQElucHV0KCkgY29udGFpbmVyOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIG1vZGVsIHZhbHVlcyBzaG91bGQgYmUgcmVzdHJpY3RlZCB0byB0aGUgb25lcyBzZWxlY3RlZCBmcm9tIHRoZSBwb3B1cCBvbmx5LlxuICAgKi9cbiAgQElucHV0KCkgZWRpdGFibGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBmaXJzdCBtYXRjaCBzaG91bGQgYXV0b21hdGljYWxseSBiZSBmb2N1c2VkIGFzIHlvdSB0eXBlLlxuICAgKi9cbiAgQElucHV0KCkgZm9jdXNGaXJzdDogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0byBjb252ZXJ0IGEgZ2l2ZW4gdmFsdWUgaW50byBzdHJpbmcgdG8gZGlzcGxheSBpbiB0aGUgaW5wdXQgZmllbGRcbiAgICovXG4gIEBJbnB1dCgpIGlucHV0Rm9ybWF0dGVyOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRvIHRyYW5zZm9ybSB0aGUgcHJvdmlkZWQgb2JzZXJ2YWJsZSB0ZXh0IGludG8gdGhlIGFycmF5IG9mIHJlc3VsdHMuICBOb3RlIHRoYXQgdGhlIFwidGhpc1wiIGFyZ3VtZW50XG4gICAqIGlzIHVuZGVmaW5lZCBzbyB5b3UgbmVlZCB0byBleHBsaWNpdGx5IGJpbmQgaXQgdG8gYSBkZXNpcmVkIFwidGhpc1wiIHRhcmdldC5cbiAgICovXG4gIEBJbnB1dCgpIG5nYlR5cGVhaGVhZDogKHRleHQ6IE9ic2VydmFibGU8c3RyaW5nPikgPT4gT2JzZXJ2YWJsZTxhbnlbXT47XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdG8gZm9ybWF0IGEgZ2l2ZW4gcmVzdWx0IGJlZm9yZSBkaXNwbGF5LiBUaGlzIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gYSBmb3JtYXR0ZWQgc3RyaW5nIHdpdGhvdXQgYW55XG4gICAqIEhUTUwgbWFya3VwXG4gICAqL1xuICBASW5wdXQoKSByZXN1bHRGb3JtYXR0ZXI6ICh2YWx1ZTogYW55KSA9PiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgdGVtcGxhdGUgdG8gb3ZlcnJpZGUgYSBtYXRjaGluZyByZXN1bHQgZGVmYXVsdCBkaXNwbGF5XG4gICAqL1xuICBASW5wdXQoKSByZXN1bHRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8UmVzdWx0VGVtcGxhdGVDb250ZXh0PjtcblxuICAvKipcbiAgICogU2hvdyBoaW50IHdoZW4gYW4gb3B0aW9uIGluIHRoZSByZXN1bHQgbGlzdCBtYXRjaGVzLlxuICAgKi9cbiAgQElucHV0KCkgc2hvd0hpbnQ6IGJvb2xlYW47XG5cbiAgLyoqIFBsYWNlbWVudCBvZiBhIHR5cGVhaGVhZCBhY2NlcHRzOlxuICAgKiAgICBcInRvcFwiLCBcInRvcC1sZWZ0XCIsIFwidG9wLXJpZ2h0XCIsIFwiYm90dG9tXCIsIFwiYm90dG9tLWxlZnRcIiwgXCJib3R0b20tcmlnaHRcIixcbiAgICogICAgXCJsZWZ0XCIsIFwibGVmdC10b3BcIiwgXCJsZWZ0LWJvdHRvbVwiLCBcInJpZ2h0XCIsIFwicmlnaHQtdG9wXCIsIFwicmlnaHQtYm90dG9tXCJcbiAgICogIGFycmF5IG9yIGEgc3BhY2Ugc2VwYXJhdGVkIHN0cmluZyBvZiBhYm92ZSB2YWx1ZXNcbiAgKi9cbiAgQElucHV0KCkgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9ICdib3R0b20tbGVmdCc7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiBhIG1hdGNoIGlzIHNlbGVjdGVkLiBFdmVudCBwYXlsb2FkIGlzIG9mIHR5cGUgTmdiVHlwZWFoZWFkU2VsZWN0SXRlbUV2ZW50LlxuICAgKi9cbiAgQE91dHB1dCgpIHNlbGVjdEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudD4oKTtcblxuICBhY3RpdmVEZXNjZW5kYW50OiBzdHJpbmc7XG4gIHBvcHVwSWQgPSBgbmdiLXR5cGVhaGVhZC0ke25leHRXaW5kb3dJZCsrfWA7XG5cbiAgcHJpdmF0ZSBfb25Ub3VjaGVkID0gKCkgPT4ge307XG4gIHByaXZhdGUgX29uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LCBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgIGNvbmZpZzogTmdiVHlwZWFoZWFkQ29uZmlnLCBuZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBfbGl2ZTogTGl2ZSwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcbiAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XG4gICAgdGhpcy5lZGl0YWJsZSA9IGNvbmZpZy5lZGl0YWJsZTtcbiAgICB0aGlzLmZvY3VzRmlyc3QgPSBjb25maWcuZm9jdXNGaXJzdDtcbiAgICB0aGlzLnNob3dIaW50ID0gY29uZmlnLnNob3dIaW50O1xuICAgIHRoaXMucGxhY2VtZW50ID0gY29uZmlnLnBsYWNlbWVudDtcblxuICAgIHRoaXMuX3ZhbHVlQ2hhbmdlcyA9IGZyb21FdmVudDxFdmVudD4oX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2lucHV0JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKCRldmVudCA9PiAoJGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSkpO1xuXG4gICAgdGhpcy5fcmVzdWJzY3JpYmVUeXBlYWhlYWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuXG4gICAgdGhpcy5fcG9wdXBTZXJ2aWNlID0gbmV3IFBvcHVwU2VydmljZTxOZ2JUeXBlYWhlYWRXaW5kb3c+KFxuICAgICAgICBOZ2JUeXBlYWhlYWRXaW5kb3csIF9pbmplY3RvciwgX3ZpZXdDb250YWluZXJSZWYsIF9yZW5kZXJlciwgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyKTtcblxuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24gPSBuZ1pvbmUub25TdGFibGUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzUG9wdXBPcGVuKCkpIHtcbiAgICAgICAgcG9zaXRpb25FbGVtZW50cyhcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRoaXMucGxhY2VtZW50LFxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPT09ICdib2R5Jyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBpbnB1dFZhbHVlcyQgPSB0aGlzLl92YWx1ZUNoYW5nZXMucGlwZSh0YXAodmFsdWUgPT4ge1xuICAgICAgdGhpcy5faW5wdXRWYWx1ZUJhY2t1cCA9IHRoaXMuc2hvd0hpbnQgPyB2YWx1ZSA6IG51bGw7XG4gICAgICBpZiAodGhpcy5lZGl0YWJsZSkge1xuICAgICAgICB0aGlzLl9vbkNoYW5nZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSkpO1xuICAgIGNvbnN0IHJlc3VsdHMkID0gaW5wdXRWYWx1ZXMkLnBpcGUodGhpcy5uZ2JUeXBlYWhlYWQpO1xuICAgIGNvbnN0IHByb2Nlc3NlZFJlc3VsdHMkID0gcmVzdWx0cyQucGlwZSh0YXAoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmVkaXRhYmxlKSB7XG4gICAgICAgIHRoaXMuX29uQ2hhbmdlKHVuZGVmaW5lZCk7XG4gICAgICB9XG4gICAgfSkpO1xuICAgIGNvbnN0IHVzZXJJbnB1dCQgPSB0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZC5waXBlKHN3aXRjaE1hcCgoKSA9PiBwcm9jZXNzZWRSZXN1bHRzJCkpO1xuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMuX3N1YnNjcmliZVRvVXNlcklucHV0KHVzZXJJbnB1dCQpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fY2xvc2VQb3B1cCgpO1xuICAgIHRoaXMuX3Vuc3Vic2NyaWJlRnJvbVVzZXJJbnB1dCgpO1xuICAgIHRoaXMuX3pvbmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5fb25DaGFuZ2UgPSBmbjsgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5fb25Ub3VjaGVkID0gZm47IH1cblxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fd3JpdGVJbnB1dFZhbHVlKHRoaXMuX2Zvcm1hdEl0ZW1Gb3JJbnB1dCh2YWx1ZSkpO1xuICAgIGlmICh0aGlzLnNob3dIaW50KSB7XG4gICAgICB0aGlzLl9pbnB1dFZhbHVlQmFja3VwID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCBpc0Rpc2FibGVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNtaXNzZXMgdHlwZWFoZWFkIHBvcHVwIHdpbmRvd1xuICAgKi9cbiAgZGlzbWlzc1BvcHVwKCkge1xuICAgIGlmICh0aGlzLmlzUG9wdXBPcGVuKCkpIHtcbiAgICAgIHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkLm5leHQobnVsbCk7XG4gICAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XG4gICAgICBpZiAodGhpcy5zaG93SGludCAmJiB0aGlzLl9pbnB1dFZhbHVlQmFja3VwICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3dyaXRlSW5wdXRWYWx1ZSh0aGlzLl9pbnB1dFZhbHVlQmFja3VwKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR5cGVhaGVhZCBwb3B1cCB3aW5kb3cgaXMgZGlzcGxheWVkXG4gICAqL1xuICBpc1BvcHVwT3BlbigpIHsgcmV0dXJuIHRoaXMuX3dpbmRvd1JlZiAhPSBudWxsOyB9XG5cbiAgaGFuZGxlQmx1cigpIHtcbiAgICB0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZC5uZXh0KG51bGwpO1xuICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICB9XG5cbiAgaGFuZGxlS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICghdGhpcy5pc1BvcHVwT3BlbigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgY2FzZSBLZXkuQXJyb3dEb3duOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UubmV4dCgpO1xuICAgICAgICB0aGlzLl9zaG93SGludCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgS2V5LkFycm93VXA6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5wcmV2KCk7XG4gICAgICAgIHRoaXMuX3Nob3dIaW50KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBLZXkuRW50ZXI6XG4gICAgICBjYXNlIEtleS5UYWI6XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5nZXRBY3RpdmUoKTtcbiAgICAgICAgaWYgKGlzRGVmaW5lZChyZXN1bHQpKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB0aGlzLl9zZWxlY3RSZXN1bHQocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29wZW5Qb3B1cCgpIHtcbiAgICBpZiAoIXRoaXMuaXNQb3B1cE9wZW4oKSkge1xuICAgICAgdGhpcy5faW5wdXRWYWx1ZUJhY2t1cCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IHRoaXMuX3BvcHVwU2VydmljZS5vcGVuKCk7XG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuaWQgPSB0aGlzLnBvcHVwSWQ7XG4gICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2Uuc2VsZWN0RXZlbnQuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4gdGhpcy5fc2VsZWN0UmVzdWx0Q2xvc2VQb3B1cChyZXN1bHQpKTtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5hY3RpdmVDaGFuZ2VFdmVudC5zdWJzY3JpYmUoKGFjdGl2ZUlkOiBzdHJpbmcpID0+IHRoaXMuYWN0aXZlRGVzY2VuZGFudCA9IGFjdGl2ZUlkKTtcblxuICAgICAgaWYgKHRoaXMuY29udGFpbmVyID09PSAnYm9keScpIHtcbiAgICAgICAgd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb250YWluZXIpLmFwcGVuZENoaWxkKHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgIG5nYkF1dG9DbG9zZShcbiAgICAgICAgICB0aGlzLl9uZ1pvbmUsIHRoaXMuX2RvY3VtZW50LCAnb3V0c2lkZScsICgpID0+IHRoaXMuZGlzbWlzc1BvcHVwKCksIHRoaXMuX2Nsb3NlZCQsXG4gICAgICAgICAgW3RoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnRdKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jbG9zZVBvcHVwKCkge1xuICAgIHRoaXMuX2Nsb3NlZCQubmV4dCgpO1xuICAgIHRoaXMuX3BvcHVwU2VydmljZS5jbG9zZSgpO1xuICAgIHRoaXMuX3dpbmRvd1JlZiA9IG51bGw7XG4gICAgdGhpcy5hY3RpdmVEZXNjZW5kYW50ID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VsZWN0UmVzdWx0KHJlc3VsdDogYW55KSB7XG4gICAgbGV0IGRlZmF1bHRQcmV2ZW50ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGVjdEl0ZW0uZW1pdCh7aXRlbTogcmVzdWx0LCBwcmV2ZW50RGVmYXVsdDogKCkgPT4geyBkZWZhdWx0UHJldmVudGVkID0gdHJ1ZTsgfX0pO1xuICAgIHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkLm5leHQobnVsbCk7XG5cbiAgICBpZiAoIWRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHRoaXMud3JpdGVWYWx1ZShyZXN1bHQpO1xuICAgICAgdGhpcy5fb25DaGFuZ2UocmVzdWx0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RSZXN1bHRDbG9zZVBvcHVwKHJlc3VsdDogYW55KSB7XG4gICAgdGhpcy5fc2VsZWN0UmVzdWx0KHJlc3VsdCk7XG4gICAgdGhpcy5fY2xvc2VQb3B1cCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2hvd0hpbnQoKSB7XG4gICAgaWYgKHRoaXMuc2hvd0hpbnQgJiYgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmhhc0FjdGl2ZSgpICYmIHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgIT0gbnVsbCkge1xuICAgICAgY29uc3QgdXNlcklucHV0TG93ZXJDYXNlID0gdGhpcy5faW5wdXRWYWx1ZUJhY2t1cC50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgZm9ybWF0dGVkVmFsID0gdGhpcy5fZm9ybWF0SXRlbUZvcklucHV0KHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5nZXRBY3RpdmUoKSk7XG5cbiAgICAgIGlmICh1c2VySW5wdXRMb3dlckNhc2UgPT09IGZvcm1hdHRlZFZhbC5zdWJzdHIoMCwgdGhpcy5faW5wdXRWYWx1ZUJhY2t1cC5sZW5ndGgpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgdGhpcy5fd3JpdGVJbnB1dFZhbHVlKHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgKyBmb3JtYXR0ZWRWYWwuc3Vic3RyKHRoaXMuX2lucHV0VmFsdWVCYWNrdXAubGVuZ3RoKSk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudFsnc2V0U2VsZWN0aW9uUmFuZ2UnXS5hcHBseShcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgW3RoaXMuX2lucHV0VmFsdWVCYWNrdXAubGVuZ3RoLCBmb3JtYXR0ZWRWYWwubGVuZ3RoXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl93cml0ZUlucHV0VmFsdWUoZm9ybWF0dGVkVmFsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9mb3JtYXRJdGVtRm9ySW5wdXQoaXRlbTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXRlbSAhPSBudWxsICYmIHRoaXMuaW5wdXRGb3JtYXR0ZXIgPyB0aGlzLmlucHV0Rm9ybWF0dGVyKGl0ZW0pIDogdG9TdHJpbmcoaXRlbSk7XG4gIH1cblxuICBwcml2YXRlIF93cml0ZUlucHV0VmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdG9TdHJpbmcodmFsdWUpKTtcbiAgfVxuXG4gIHByaXZhdGUgX3N1YnNjcmliZVRvVXNlcklucHV0KHVzZXJJbnB1dCQ6IE9ic2VydmFibGU8YW55W10+KTogU3Vic2NyaXB0aW9uIHtcbiAgICByZXR1cm4gdXNlcklucHV0JC5zdWJzY3JpYmUoKHJlc3VsdHMpID0+IHtcbiAgICAgIGlmICghcmVzdWx0cyB8fCByZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9vcGVuUG9wdXAoKTtcbiAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmZvY3VzRmlyc3QgPSB0aGlzLmZvY3VzRmlyc3Q7XG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5yZXN1bHRzID0gcmVzdWx0cztcbiAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnRlcm0gPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgIGlmICh0aGlzLnJlc3VsdEZvcm1hdHRlcikge1xuICAgICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5mb3JtYXR0ZXIgPSB0aGlzLnJlc3VsdEZvcm1hdHRlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yZXN1bHRUZW1wbGF0ZSkge1xuICAgICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5yZXN1bHRUZW1wbGF0ZSA9IHRoaXMucmVzdWx0VGVtcGxhdGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnJlc2V0QWN0aXZlKCk7XG5cbiAgICAgICAgLy8gVGhlIG9ic2VydmFibGUgc3RyZWFtIHdlIGFyZSBzdWJzY3JpYmluZyB0byBtaWdodCBoYXZlIGFzeW5jIHN0ZXBzXG4gICAgICAgIC8vIGFuZCBpZiBhIGNvbXBvbmVudCBjb250YWluaW5nIHR5cGVhaGVhZCBpcyB1c2luZyB0aGUgT25QdXNoIHN0cmF0ZWd5XG4gICAgICAgIC8vIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIHR1cm4gd291bGRuJ3QgYmUgaW52b2tlZCBhdXRvbWF0aWNhbGx5LlxuICAgICAgICB0aGlzLl93aW5kb3dSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgICAgIHRoaXMuX3Nob3dIaW50KCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGxpdmUgYW5ub3VuY2VyXG4gICAgICBjb25zdCBjb3VudCA9IHJlc3VsdHMgPyByZXN1bHRzLmxlbmd0aCA6IDA7XG4gICAgICB0aGlzLl9saXZlLnNheShjb3VudCA9PT0gMCA/ICdObyByZXN1bHRzIGF2YWlsYWJsZScgOiBgJHtjb3VudH0gcmVzdWx0JHtjb3VudCA9PT0gMSA/ICcnIDogJ3MnfSBhdmFpbGFibGVgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3Vuc3Vic2NyaWJlRnJvbVVzZXJJbnB1dCgpIHtcbiAgICBpZiAodGhpcy5fc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHtOZ2JIaWdobGlnaHR9IGZyb20gJy4vaGlnaGxpZ2h0JztcbmltcG9ydCB7TmdiVHlwZWFoZWFkV2luZG93fSBmcm9tICcuL3R5cGVhaGVhZC13aW5kb3cnO1xuaW1wb3J0IHtOZ2JUeXBlYWhlYWR9IGZyb20gJy4vdHlwZWFoZWFkJztcblxuZXhwb3J0IHtOZ2JIaWdobGlnaHR9IGZyb20gJy4vaGlnaGxpZ2h0JztcbmV4cG9ydCB7TmdiVHlwZWFoZWFkV2luZG93fSBmcm9tICcuL3R5cGVhaGVhZC13aW5kb3cnO1xuZXhwb3J0IHtOZ2JUeXBlYWhlYWRDb25maWd9IGZyb20gJy4vdHlwZWFoZWFkLWNvbmZpZyc7XG5leHBvcnQge05nYlR5cGVhaGVhZCwgTmdiVHlwZWFoZWFkU2VsZWN0SXRlbUV2ZW50fSBmcm9tICcuL3R5cGVhaGVhZCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nYlR5cGVhaGVhZCwgTmdiSGlnaGxpZ2h0LCBOZ2JUeXBlYWhlYWRXaW5kb3ddLFxuICBleHBvcnRzOiBbTmdiVHlwZWFoZWFkLCBOZ2JIaWdobGlnaHRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdiVHlwZWFoZWFkV2luZG93XVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JUeXBlYWhlYWRNb2R1bGUge1xuICAvKipcbiAgICogSW1wb3J0aW5nIHdpdGggJy5mb3JSb290KCknIGlzIG5vIGxvbmdlciBuZWNlc3NhcnksIHlvdSBjYW4gc2ltcGx5IGltcG9ydCB0aGUgbW9kdWxlLlxuICAgKiBXaWxsIGJlIHJlbW92ZWQgaW4gNC4wLjAuXG4gICAqXG4gICAqIEBkZXByZWNhdGVkIDMuMC4wXG4gICAqL1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHsgcmV0dXJuIHtuZ01vZHVsZTogTmdiVHlwZWFoZWFkTW9kdWxlfTsgfVxufVxuIiwiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TmdiQWNjb3JkaW9uTW9kdWxlfSBmcm9tICcuL2FjY29yZGlvbi9hY2NvcmRpb24ubW9kdWxlJztcbmltcG9ydCB7TmdiQWxlcnRNb2R1bGV9IGZyb20gJy4vYWxlcnQvYWxlcnQubW9kdWxlJztcbmltcG9ydCB7TmdiQnV0dG9uc01vZHVsZX0gZnJvbSAnLi9idXR0b25zL2J1dHRvbnMubW9kdWxlJztcbmltcG9ydCB7TmdiQ2Fyb3VzZWxNb2R1bGV9IGZyb20gJy4vY2Fyb3VzZWwvY2Fyb3VzZWwubW9kdWxlJztcbmltcG9ydCB7TmdiQ29sbGFwc2VNb2R1bGV9IGZyb20gJy4vY29sbGFwc2UvY29sbGFwc2UubW9kdWxlJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlck1vZHVsZX0gZnJvbSAnLi9kYXRlcGlja2VyL2RhdGVwaWNrZXIubW9kdWxlJztcbmltcG9ydCB7TmdiRHJvcGRvd25Nb2R1bGV9IGZyb20gJy4vZHJvcGRvd24vZHJvcGRvd24ubW9kdWxlJztcbmltcG9ydCB7TmdiTW9kYWxNb2R1bGV9IGZyb20gJy4vbW9kYWwvbW9kYWwubW9kdWxlJztcbmltcG9ydCB7TmdiUGFnaW5hdGlvbk1vZHVsZX0gZnJvbSAnLi9wYWdpbmF0aW9uL3BhZ2luYXRpb24ubW9kdWxlJztcbmltcG9ydCB7TmdiUG9wb3Zlck1vZHVsZX0gZnJvbSAnLi9wb3BvdmVyL3BvcG92ZXIubW9kdWxlJztcbmltcG9ydCB7TmdiUHJvZ3Jlc3NiYXJNb2R1bGV9IGZyb20gJy4vcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIubW9kdWxlJztcbmltcG9ydCB7TmdiUmF0aW5nTW9kdWxlfSBmcm9tICcuL3JhdGluZy9yYXRpbmcubW9kdWxlJztcbmltcG9ydCB7TmdiVGFic2V0TW9kdWxlfSBmcm9tICcuL3RhYnNldC90YWJzZXQubW9kdWxlJztcbmltcG9ydCB7TmdiVGltZXBpY2tlck1vZHVsZX0gZnJvbSAnLi90aW1lcGlja2VyL3RpbWVwaWNrZXIubW9kdWxlJztcbmltcG9ydCB7TmdiVG9vbHRpcE1vZHVsZX0gZnJvbSAnLi90b29sdGlwL3Rvb2x0aXAubW9kdWxlJztcbmltcG9ydCB7TmdiVHlwZWFoZWFkTW9kdWxlfSBmcm9tICcuL3R5cGVhaGVhZC90eXBlYWhlYWQubW9kdWxlJztcblxuZXhwb3J0IHtcbiAgTmdiQWNjb3JkaW9uTW9kdWxlLFxuICBOZ2JQYW5lbENoYW5nZUV2ZW50LFxuICBOZ2JBY2NvcmRpb25Db25maWcsXG4gIE5nYkFjY29yZGlvbixcbiAgTmdiUGFuZWwsXG4gIE5nYlBhbmVsVGl0bGUsXG4gIE5nYlBhbmVsQ29udGVudCxcbiAgTmdiUGFuZWxIZWFkZXIsXG4gIE5nYlBhbmVsSGVhZGVyQ29udGV4dCxcbiAgTmdiUGFuZWxUb2dnbGVcbn0gZnJvbSAnLi9hY2NvcmRpb24vYWNjb3JkaW9uLm1vZHVsZSc7XG5leHBvcnQge05nYkFsZXJ0TW9kdWxlLCBOZ2JBbGVydENvbmZpZywgTmdiQWxlcnR9IGZyb20gJy4vYWxlcnQvYWxlcnQubW9kdWxlJztcbmV4cG9ydCB7TmdiQnV0dG9uc01vZHVsZSwgTmdiQnV0dG9uTGFiZWwsIE5nYkNoZWNrQm94LCBOZ2JSYWRpbywgTmdiUmFkaW9Hcm91cH0gZnJvbSAnLi9idXR0b25zL2J1dHRvbnMubW9kdWxlJztcbmV4cG9ydCB7TmdiQ2Fyb3VzZWxNb2R1bGUsIE5nYkNhcm91c2VsQ29uZmlnLCBOZ2JDYXJvdXNlbCwgTmdiU2xpZGV9IGZyb20gJy4vY2Fyb3VzZWwvY2Fyb3VzZWwubW9kdWxlJztcbmV4cG9ydCB7TmdiQ29sbGFwc2VNb2R1bGUsIE5nYkNvbGxhcHNlfSBmcm9tICcuL2NvbGxhcHNlL2NvbGxhcHNlLm1vZHVsZSc7XG5leHBvcnQge1xuICBOZ2JDYWxlbmRhcixcbiAgTmdiUGVyaW9kLFxuICBOZ2JDYWxlbmRhckdyZWdvcmlhbixcbiAgTmdiQ2FsZW5kYXJJc2xhbWljQ2l2aWwsXG4gIE5nYkNhbGVuZGFySXNsYW1pY1VtYWxxdXJhLFxuICBOZ2JDYWxlbmRhckhlYnJldyxcbiAgTmdiQ2FsZW5kYXJQZXJzaWFuLFxuICBOZ2JEYXRlcGlja2VyTW9kdWxlLFxuICBOZ2JEYXRlcGlja2VySTE4bixcbiAgTmdiRGF0ZXBpY2tlckkxOG5IZWJyZXcsXG4gIE5nYkRhdGVwaWNrZXJDb25maWcsXG4gIE5nYkRhdGVTdHJ1Y3QsXG4gIE5nYkRhdGUsXG4gIE5nYkRhdGVQYXJzZXJGb3JtYXR0ZXIsXG4gIE5nYkRhdGVBZGFwdGVyLFxuICBOZ2JEYXRlTmF0aXZlQWRhcHRlcixcbiAgTmdiRGF0ZU5hdGl2ZVVUQ0FkYXB0ZXIsXG4gIE5nYkRhdGVwaWNrZXIsXG4gIE5nYklucHV0RGF0ZXBpY2tlclxufSBmcm9tICcuL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci5tb2R1bGUnO1xuZXhwb3J0IHtcbiAgTmdiRHJvcGRvd25Nb2R1bGUsXG4gIE5nYkRyb3Bkb3duQW5jaG9yLFxuICBOZ2JEcm9wZG93bkNvbmZpZyxcbiAgTmdiRHJvcGRvd25JdGVtLFxuICBOZ2JEcm9wZG93bk1lbnUsXG4gIE5nYkRyb3Bkb3duVG9nZ2xlLFxuICBOZ2JEcm9wZG93blxufSBmcm9tICcuL2Ryb3Bkb3duL2Ryb3Bkb3duLm1vZHVsZSc7XG5leHBvcnQge1xuICBOZ2JNb2RhbE1vZHVsZSxcbiAgTmdiTW9kYWwsXG4gIE5nYk1vZGFsQ29uZmlnLFxuICBOZ2JNb2RhbE9wdGlvbnMsXG4gIE5nYkFjdGl2ZU1vZGFsLFxuICBOZ2JNb2RhbFJlZixcbiAgTW9kYWxEaXNtaXNzUmVhc29uc1xufSBmcm9tICcuL21vZGFsL21vZGFsLm1vZHVsZSc7XG5leHBvcnQge1xuICBOZ2JQYWdpbmF0aW9uTW9kdWxlLFxuICBOZ2JQYWdpbmF0aW9uQ29uZmlnLFxuICBOZ2JQYWdpbmF0aW9uLFxuICBOZ2JQYWdpbmF0aW9uRWxsaXBzaXMsXG4gIE5nYlBhZ2luYXRpb25GaXJzdCxcbiAgTmdiUGFnaW5hdGlvbkxhc3QsXG4gIE5nYlBhZ2luYXRpb25OZXh0LFxuICBOZ2JQYWdpbmF0aW9uTnVtYmVyLFxuICBOZ2JQYWdpbmF0aW9uUHJldmlvdXNcbn0gZnJvbSAnLi9wYWdpbmF0aW9uL3BhZ2luYXRpb24ubW9kdWxlJztcbmV4cG9ydCB7TmdiUG9wb3Zlck1vZHVsZSwgTmdiUG9wb3ZlckNvbmZpZywgTmdiUG9wb3Zlcn0gZnJvbSAnLi9wb3BvdmVyL3BvcG92ZXIubW9kdWxlJztcbmV4cG9ydCB7TmdiUHJvZ3Jlc3NiYXJNb2R1bGUsIE5nYlByb2dyZXNzYmFyQ29uZmlnLCBOZ2JQcm9ncmVzc2Jhcn0gZnJvbSAnLi9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5tb2R1bGUnO1xuZXhwb3J0IHtOZ2JSYXRpbmdNb2R1bGUsIE5nYlJhdGluZ0NvbmZpZywgTmdiUmF0aW5nfSBmcm9tICcuL3JhdGluZy9yYXRpbmcubW9kdWxlJztcbmV4cG9ydCB7XG4gIE5nYlRhYnNldE1vZHVsZSxcbiAgTmdiVGFiQ2hhbmdlRXZlbnQsXG4gIE5nYlRhYnNldENvbmZpZyxcbiAgTmdiVGFic2V0LFxuICBOZ2JUYWIsXG4gIE5nYlRhYkNvbnRlbnQsXG4gIE5nYlRhYlRpdGxlXG59IGZyb20gJy4vdGFic2V0L3RhYnNldC5tb2R1bGUnO1xuZXhwb3J0IHtcbiAgTmdiVGltZXBpY2tlck1vZHVsZSxcbiAgTmdiVGltZXBpY2tlckNvbmZpZyxcbiAgTmdiVGltZVN0cnVjdCxcbiAgTmdiVGltZXBpY2tlcixcbiAgTmdiVGltZUFkYXB0ZXJcbn0gZnJvbSAnLi90aW1lcGlja2VyL3RpbWVwaWNrZXIubW9kdWxlJztcbmV4cG9ydCB7TmdiVG9vbHRpcE1vZHVsZSwgTmdiVG9vbHRpcENvbmZpZywgTmdiVG9vbHRpcH0gZnJvbSAnLi90b29sdGlwL3Rvb2x0aXAubW9kdWxlJztcbmV4cG9ydCB7XG4gIE5nYkhpZ2hsaWdodCxcbiAgTmdiVHlwZWFoZWFkTW9kdWxlLFxuICBOZ2JUeXBlYWhlYWRDb25maWcsXG4gIE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudCxcbiAgTmdiVHlwZWFoZWFkXG59IGZyb20gJy4vdHlwZWFoZWFkL3R5cGVhaGVhZC5tb2R1bGUnO1xuXG5leHBvcnQge1BsYWNlbWVudH0gZnJvbSAnLi91dGlsL3Bvc2l0aW9uaW5nJztcblxuY29uc3QgTkdCX01PRFVMRVMgPSBbXG4gIE5nYkFjY29yZGlvbk1vZHVsZSwgTmdiQWxlcnRNb2R1bGUsIE5nYkJ1dHRvbnNNb2R1bGUsIE5nYkNhcm91c2VsTW9kdWxlLCBOZ2JDb2xsYXBzZU1vZHVsZSwgTmdiRGF0ZXBpY2tlck1vZHVsZSxcbiAgTmdiRHJvcGRvd25Nb2R1bGUsIE5nYk1vZGFsTW9kdWxlLCBOZ2JQYWdpbmF0aW9uTW9kdWxlLCBOZ2JQb3BvdmVyTW9kdWxlLCBOZ2JQcm9ncmVzc2Jhck1vZHVsZSwgTmdiUmF0aW5nTW9kdWxlLFxuICBOZ2JUYWJzZXRNb2R1bGUsIE5nYlRpbWVwaWNrZXJNb2R1bGUsIE5nYlRvb2x0aXBNb2R1bGUsIE5nYlR5cGVhaGVhZE1vZHVsZVxuXTtcblxuQE5nTW9kdWxlKHtpbXBvcnRzOiBOR0JfTU9EVUxFUywgZXhwb3J0czogTkdCX01PRFVMRVN9KVxuZXhwb3J0IGNsYXNzIE5nYk1vZHVsZSB7XG4gIC8qKlxuICAgKiBJbXBvcnRpbmcgd2l0aCAnLmZvclJvb3QoKScgaXMgbm8gbG9uZ2VyIG5lY2Vzc2FyeSwgeW91IGNhbiBzaW1wbHkgaW1wb3J0IHRoZSBtb2R1bGUuXG4gICAqIFdpbGwgYmUgcmVtb3ZlZCBpbiA0LjAuMC5cbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgMy4wLjBcbiAgICovXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMgeyByZXR1cm4ge25nTW9kdWxlOiBOZ2JNb2R1bGV9OyB9XG59XG4iXSwibmFtZXMiOlsibmV4dElkIiwiTkdCX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1IiLCJtb2QiLCJHUkVHT1JJQU5fRVBPQ0giLCJpc0dyZWdvcmlhbkxlYXBZZWFyIiwiZnJvbUdyZWdvcmlhbiIsInRvR3JlZ29yaWFuIiwiZGVsYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBZ0IsU0FBUyxDQUFDLEtBQVU7SUFDbEMsT0FBTyxRQUFRLENBQUMsR0FBRyxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztDQUNqQzs7Ozs7QUFFRCxTQUFnQixRQUFRLENBQUMsS0FBVTtJQUNqQyxPQUFPLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDO0NBQ2xFOzs7Ozs7O0FBRUQsU0FBZ0IsZUFBZSxDQUFDLEtBQWEsRUFBRSxHQUFXLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDakUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQzVDOzs7OztBQUVELFNBQWdCLFFBQVEsQ0FBQyxLQUFVO0lBQ2pDLE9BQU8sT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDO0NBQ2xDOzs7OztBQUVELFNBQWdCLFFBQVEsQ0FB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QkFBb0IsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7TUFDN0MsbUJBQW1CLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7O01BQzVDLFdBQVcsR0FBRyxJQUFJOztNQUNsQixTQUFTLEdBQUcsSUFBSTs7TUFDaEIsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7O01BRTdCLFlBQVksR0FBRzs7SUFFbkIsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7O0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjOztJQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYzs7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7O0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjOztJQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYzs7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7O0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjOztJQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYzs7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7O0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjOztJQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYzs7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7O0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjOztJQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYzs7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7O0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjOztJQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYzs7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7O0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjOztJQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYzs7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7O0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjOztJQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYzs7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7O0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjOztJQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYzs7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7O0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjOztJQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYzs7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7O0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjOztJQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYzs7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7O0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjOztJQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYzs7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7O0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjOztJQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYzs7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7O0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjOztJQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYzs7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7O0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjOztJQUU5RSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYzs7SUFFOUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7O0lBRTlFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjOztJQUU5RSxjQUFjLEVBQUUsY0FBYyxF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Q0FBQyxDQUFDO1FBQ3BCLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxVQUFVLEdBQUcsRUFBRSxFQUFFO1lBQ25CLE1BQU07U0FDUDtRQUNELEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDQSxLQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFELEVBQUUsR0FBRyxFQUFFLENBQUM7S0FDVDs7UUFDRyxDQUFDLEdBQUcsVUFBVSxHQUFHLEVBQUU7OztJQUl2QixLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQ0EsS0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEQsSUFBSUEsS0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDekMsS0FBSyxJQUFJLENBQUMsQ0FBQztLQUNaOzs7VUFHSyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRzs7O1VBRy9ELEtBQUssR0FBRyxFQUFFLEdBQUcsS0FBSyxHQUFHLEtBQUs7O0lBR2hDLElBQUksSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDaEIsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQ3ZDOztRQUNHLElBQUksR0FBR0EsS0FBRyxDQUFDQSxLQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2YsSUFBSSxHQUFHLENBQUMsQ0FBQztLQUNWO0lBRUQsT0FBTyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUM7Q0FDOUM7Ozs7Ozs7Ozs7Ozs7OztBQVlELFNBQVMsaUJBQWlCLENBQUMsZUFBdUI7O1FBQzVDLENBQUMsR0FBRyxDQUFDLEdBQUcsZUFBZSxHQUFHLFNBQVM7SUFDdkMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxlQUFlLEdBQUcsU0FBUyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDOztVQUN0RSxDQUFDLEdBQUcsR0FBRyxDQUFDQSxLQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHOztVQUNsQyxJQUFJLEdBQUcsR0FBRyxDQUFDQSxLQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7O1VBQzlCLE1BQU0sR0FBR0EsS0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQzs7VUFDakMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUV4RCxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQzFDOzs7Ozs7Ozs7Ozs7OztBQVNELFNBQVMsaUJB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