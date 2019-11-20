import { AfterContentChecked, EventEmitter, QueryList, TemplateRef } from '@angular/core';
import { NgbAccordionConfig } from './accordion-config';
/**
 * A context for the `NgbPanelHeader` template
 *
 * @since 4.1.0
 */
export interface NgbPanelHeaderContext {
    /**
     * True if current panel is opened
     */
    opened: boolean;
}
/**
 * A directive to put on a button that toggles panel opening and closing.
 * To be used inside the `NgbPanelHeader`
 *
 * @since 4.1.0
 */
export declare class NgbPanelToggle {
    accordion: NgbAccordion;
    panel: NgbPanel;
    ngbPanelToggle: NgbPanel;
    constructor(accordion: NgbAccordion, panel: NgbPanel);
}
/**
 * A directive to wrap an accordion panel header to contain any HTML markup and a toggling button with `NgbPanelToggle`
 *
 * @since 4.1.0
 */
export declare class NgbPanelHeader {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>);
}
/**
 * This directive should be used to wrap accordion panel titles that need to contain HTML markup or other directives.
 */
export declare class NgbPanelTitle {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>);
}
/**
 * This directive must be used to wrap accordion panel content.
 */
export declare class NgbPanelContent {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>);
}
/**
 * The NgbPanel directive represents an individual panel with the title and collapsible
 * content
 */
export declare class NgbPanel implements AfterContentChecked {
    /**
     *  A flag determining whether the panel is disabled or not.
     *  When disabled, the panel cannot be toggled.
     */
    disabled: boolean;
    /**
     *  An optional id for the panel. The id should be unique.
     *  If not provided, it will be auto-generated.
     */
    id: string;
    /**
     * A flag telling if the panel is currently open
     */
    isOpen: boolean;
    /**
     *  The title for the panel.
     */
    title: string;
    /**
     *  Accordion's types of panels to be applied per panel basis.
     *  Bootstrap recognizes the following types: "primary", "secondary", "success", "danger", "warning", "info", "light"
     * and "dark"
     */
    type: string;
    titleTpl: NgbPanelTitle | null;
    headerTpl: NgbPanelHeader | null;
    contentTpl: NgbPanelContent | null;
    titleTpls: QueryList<NgbPanelTitle>;
    headerTpls: QueryList<NgbPanelHeader>;
    contentTpls: QueryList<NgbPanelContent>;
    ngAfterContentChecked(): void;
}
/**
 * The payload of the change event fired right before toggling an accordion panel
 */
export interface NgbPanelChangeEvent {
    /**
     * Id of the accordion panel that is toggled
     */
    panelId: string;
    /**
     * Whether the panel will be opened (true) or closed (false)
     */
    nextState: boolean;
    /**
     * Function that will prevent panel toggling if called
     */
    preventDefault: () => void;
}
/**
 * The NgbAccordion directive is a collection of panels.
 * It can assure that only one panel can be opened at a time.
 */
export declare class NgbAccordion implements AfterContentChecked {
    panels: QueryList<NgbPanel>;
    /**
     * An array or comma separated strings of panel identifiers that should be opened
     */
    activeIds: string | string[];
    /**
     *  Whether the other panels should be closed when a panel is opened
     */
    closeOtherPanels: boolean;
    /**
     * Whether the closed panels should be hidden without destroying them
     */
    destroyOnHide: boolean;
    /**
     *  Accordion's types of panels to be applied globally.
     *  Bootstrap recognizes the following types: "primary", "secondary", "success", "danger", "warning", "info", "light"
     * and "dark
     */
    type: string;
    /**
     * A panel change event fired right before the panel toggle happens. See NgbPanelChangeEvent for payload details
     */
    panelChange: EventEmitter<NgbPanelChangeEvent>;
    constructor(config: NgbAccordionConfig);
    /**
     * Checks if a panel with a given id is expanded or not.
     */
    isExpanded(panelId: string): boolean;
    /**
     * Expands a panel with a given id. Has no effect if the panel is already expanded or disabled.
     */
    expand(panelId: string): void;
    /**
     * Expands all panels if [closeOthers]="false". For the [closeOthers]="true" case will have no effect if there is an
     * open panel, otherwise the first panel will be expanded.
     */
    expandAll(): void;
    /**
     * Collapses a panel with a given id. Has no effect if the panel is already collapsed or disabled.
     */
    collapse(panelId: string): void;
    /**
     * Collapses all open panels.
     */
    collapseAll(): void;
    /**
     * Programmatically toggle a panel with a given id. Has no effect if the panel is disabled.
     */
    toggle(panelId: string): void;
    ngAfterContentChecked(): void;
    private _changeOpenState;
    private _closeOthers;
    private _findPanelById;
    private _updateActiveIds;
}
