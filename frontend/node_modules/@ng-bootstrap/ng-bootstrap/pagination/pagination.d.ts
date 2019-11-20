import { EventEmitter, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { NgbPaginationConfig } from './pagination-config';
/**
 * Context for the pagination 'first', 'previous', 'next', 'last' or 'ellipsis' cell
 * in case you want to override one
 *
 * @since 4.1.0
 */
export interface NgbPaginationLinkContext {
    /**
     * Page number currently selected
     */
    currentPage: number;
    /**
     * If true the link in question is disabled
     */
    disabled: boolean;
}
/**
 * Context for the pagination 'number' cell in case you want to override one.
 * Extends 'NgbPaginationLinkContext'
 *
 * @since 4.1.0
 */
export interface NgbPaginationNumberContext extends NgbPaginationLinkContext {
    /**
     * Page number displayed by the current cell
     */
    $implicit: number;
}
/**
 * The directive to match the 'ellipsis' cell template
 *
 * @since 4.1.0
 */
export declare class NgbPaginationEllipsis {
    templateRef: TemplateRef<NgbPaginationLinkContext>;
    constructor(templateRef: TemplateRef<NgbPaginationLinkContext>);
}
/**
 * The directive to match the 'first' cell template
 *
 * @since 4.1.0
 */
export declare class NgbPaginationFirst {
    templateRef: TemplateRef<NgbPaginationLinkContext>;
    constructor(templateRef: TemplateRef<NgbPaginationLinkContext>);
}
/**
 * The directive to match the 'last' cell template
 *
 * @since 4.1.0
 */
export declare class NgbPaginationLast {
    templateRef: TemplateRef<NgbPaginationLinkContext>;
    constructor(templateRef: TemplateRef<NgbPaginationLinkContext>);
}
/**
 * The directive to match the 'next' cell template
 *
 * @since 4.1.0
 */
export declare class NgbPaginationNext {
    templateRef: TemplateRef<NgbPaginationLinkContext>;
    constructor(templateRef: TemplateRef<NgbPaginationLinkContext>);
}
/**
 * The directive to match the page 'number' cell template
 *
 * @since 4.1.0
 */
export declare class NgbPaginationNumber {
    templateRef: TemplateRef<NgbPaginationNumberContext>;
    constructor(templateRef: TemplateRef<NgbPaginationNumberContext>);
}
/**
 * The directive to match the 'previous' cell template
 *
 * @since 4.1.0
 */
export declare class NgbPaginationPrevious {
    templateRef: TemplateRef<NgbPaginationLinkContext>;
    constructor(templateRef: TemplateRef<NgbPaginationLinkContext>);
}
/**
 * A component that displays page numbers and allows to customize them in several ways
 */
export declare class NgbPagination implements OnChanges {
    pageCount: number;
    pages: number[];
    tplEllipsis: NgbPaginationEllipsis;
    tplFirst: NgbPaginationFirst;
    tplLast: NgbPaginationLast;
    tplNext: NgbPaginationNext;
    tplNumber: NgbPaginationNumber;
    tplPrevious: NgbPaginationPrevious;
    /**
     * Whether to disable buttons from user input
     */
    disabled: boolean;
    /**
     *  Whether to show the "First" and "Last" page links
     */
    boundaryLinks: boolean;
    /**
     *  Whether to show the "Next" and "Previous" page links
     */
    directionLinks: boolean;
    /**
     *  Whether to show ellipsis symbols and first/last page numbers when maxSize > number of pages
     */
    ellipses: boolean;
    /**
     *  Whether to rotate pages when maxSize > number of pages.
     *  Current page will be in the middle
     */
    rotate: boolean;
    /**
     *  Number of items in collection.
     */
    collectionSize: number;
    /**
     *  Maximum number of pages to display.
     */
    maxSize: number;
    /**
     *  Current page. Page numbers start with 1
     */
    page: number;
    /**
     *  Number of items per page.
     */
    pageSize: number;
    /**
     *  An event fired when the page is changed.
     *  Event's payload equals to the newly selected page.
     *  Will fire only if collection size is set and all values are valid.
     *  Page numbers start with 1
     */
    pageChange: EventEmitter<number>;
    /**
     * Pagination display size: small or large
     */
    size: 'sm' | 'lg';
    constructor(config: NgbPaginationConfig);
    hasPrevious(): boolean;
    hasNext(): boolean;
    nextDisabled(): boolean;
    previousDisabled(): boolean;
    selectPage(pageNumber: number): void;
    ngOnChanges(changes: SimpleChanges): void;
    isEllipsis(pageNumber: any): boolean;
    /**
     * Appends ellipses and first/last page number to the displayed pages
     */
    private _applyEllipses;
    /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     */
    private _applyRotation;
    /**
     * Paginates page numbers based on maxSize items per page
     */
    private _applyPagination;
    private _setPageInRange;
    private _updatePages;
}
