/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, EventEmitter, Inject, Input, NgZone, Output, PLATFORM_ID, QueryList, TemplateRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbCarouselConfig } from './carousel-config';
import { merge, Subject, timer } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
/** @type {?} */
var nextId = 0;
/**
 * Represents an individual slide to be used within a carousel.
 */
var NgbSlide = /** @class */ (function () {
    function NgbSlide(tplRef) {
        this.tplRef = tplRef;
        /**
         * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
         * Will be auto-generated if not provided.
         */
        this.id = "ngb-slide-" + nextId++;
    }
    NgbSlide.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngbSlide]' },] }
    ];
    /** @nocollapse */
    NgbSlide.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    NgbSlide.propDecorators = {
        id: [{ type: Input }]
    };
    return NgbSlide;
}());
export { NgbSlide };
if (false) {
    /**
     * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
     * Will be auto-generated if not provided.
     * @type {?}
     */
    NgbSlide.prototype.id;
    /** @type {?} */
    NgbSlide.prototype.tplRef;
}
/**
 * Directive to easily create carousels based on Bootstrap's markup.
 */
var NgbCarousel = /** @class */ (function () {
    function NgbCarousel(config, _platformId, _ngZone, _cd) {
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
    NgbCarousel.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // setInterval() doesn't play well with SSR and protractor,
        // so we should run it in the browser and outside Angular
        if (isPlatformBrowser(this._platformId)) {
            this._ngZone.runOutsideAngular(function () {
                _this._start$
                    .pipe(map(function () { return _this.interval; }), filter(function (interval) { return interval > 0 && _this.slides.length > 0; }), switchMap(function (interval) { return timer(interval).pipe(takeUntil(merge(_this._stop$, _this._destroy$))); }))
                    .subscribe(function () { return _this._ngZone.run(function () { return _this.next(); }); });
                _this._start$.next();
            });
        }
        this.slides.changes.pipe(takeUntil(this._destroy$)).subscribe(function () { return _this._cd.markForCheck(); });
    };
    /**
     * @return {?}
     */
    NgbCarousel.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var activeSlide = this._getSlideById(this.activeId);
        this.activeId = activeSlide ? activeSlide.id : (this.slides.length ? this.slides.first.id : null);
    };
    /**
     * @return {?}
     */
    NgbCarousel.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () { this._destroy$.next(); };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbCarousel.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if ('interval' in changes && !changes['interval'].isFirstChange()) {
            this._start$.next();
        }
    };
    /**
     * Navigate to a slide with the specified identifier.
     */
    /**
     * Navigate to a slide with the specified identifier.
     * @param {?} slideId
     * @return {?}
     */
    NgbCarousel.prototype.select = /**
     * Navigate to a slide with the specified identifier.
     * @param {?} slideId
     * @return {?}
     */
    function (slideId) { this._cycleToSelected(slideId, this._getSlideEventDirection(this.activeId, slideId)); };
    /**
     * Navigate to the next slide.
     */
    /**
     * Navigate to the next slide.
     * @return {?}
     */
    NgbCarousel.prototype.prev = /**
     * Navigate to the next slide.
     * @return {?}
     */
    function () { this._cycleToSelected(this._getPrevSlide(this.activeId), NgbSlideEventDirection.RIGHT); };
    /**
     * Navigate to the next slide.
     */
    /**
     * Navigate to the next slide.
     * @return {?}
     */
    NgbCarousel.prototype.next = /**
     * Navigate to the next slide.
     * @return {?}
     */
    function () { this._cycleToSelected(this._getNextSlide(this.activeId), NgbSlideEventDirection.LEFT); };
    /**
     * Stops the carousel from cycling through items.
     */
    /**
     * Stops the carousel from cycling through items.
     * @return {?}
     */
    NgbCarousel.prototype.pause = /**
     * Stops the carousel from cycling through items.
     * @return {?}
     */
    function () { this._stop$.next(); };
    /**
     * Restarts cycling through the carousel slides from left to right.
     */
    /**
     * Restarts cycling through the carousel slides from left to right.
     * @return {?}
     */
    NgbCarousel.prototype.cycle = /**
     * Restarts cycling through the carousel slides from left to right.
     * @return {?}
     */
    function () { this._start$.next(); };
    /**
     * @param {?} slideIdx
     * @param {?} direction
     * @return {?}
     */
    NgbCarousel.prototype._cycleToSelected = /**
     * @param {?} slideIdx
     * @param {?} direction
     * @return {?}
     */
    function (slideIdx, direction) {
        /** @type {?} */
        var selectedSlide = this._getSlideById(slideIdx);
        if (selectedSlide && selectedSlide.id !== this.activeId) {
            this.slide.emit({ prev: this.activeId, current: selectedSlide.id, direction: direction });
            this._start$.next();
            this.activeId = selectedSlide.id;
        }
        // we get here after the interval fires or any external API call like next(), prev() or select()
        this._cd.markForCheck();
    };
    /**
     * @param {?} currentActiveSlideId
     * @param {?} nextActiveSlideId
     * @return {?}
     */
    NgbCarousel.prototype._getSlideEventDirection = /**
     * @param {?} currentActiveSlideId
     * @param {?} nextActiveSlideId
     * @return {?}
     */
    function (currentActiveSlideId, nextActiveSlideId) {
        /** @type {?} */
        var currentActiveSlideIdx = this._getSlideIdxById(currentActiveSlideId);
        /** @type {?} */
        var nextActiveSlideIdx = this._getSlideIdxById(nextActiveSlideId);
        return currentActiveSlideIdx > nextActiveSlideIdx ? NgbSlideEventDirection.RIGHT : NgbSlideEventDirection.LEFT;
    };
    /**
     * @param {?} slideId
     * @return {?}
     */
    NgbCarousel.prototype._getSlideById = /**
     * @param {?} slideId
     * @return {?}
     */
    function (slideId) { return this.slides.find(function (slide) { return slide.id === slideId; }); };
    /**
     * @param {?} slideId
     * @return {?}
     */
    NgbCarousel.prototype._getSlideIdxById = /**
     * @param {?} slideId
     * @return {?}
     */
    function (slideId) {
        return this.slides.toArray().indexOf(this._getSlideById(slideId));
    };
    /**
     * @param {?} currentSlideId
     * @return {?}
     */
    NgbCarousel.prototype._getNextSlide = /**
     * @param {?} currentSlideId
     * @return {?}
     */
    function (currentSlideId) {
        /** @type {?} */
        var slideArr = this.slides.toArray();
        /** @type {?} */
        var currentSlideIdx = this._getSlideIdxById(currentSlideId);
        /** @type {?} */
        var isLastSlide = currentSlideIdx === slideArr.length - 1;
        return isLastSlide ? (this.wrap ? slideArr[0].id : slideArr[slideArr.length - 1].id) :
            slideArr[currentSlideIdx + 1].id;
    };
    /**
     * @param {?} currentSlideId
     * @return {?}
     */
    NgbCarousel.prototype._getPrevSlide = /**
     * @param {?} currentSlideId
     * @return {?}
     */
    function (currentSlideId) {
        /** @type {?} */
        var slideArr = this.slides.toArray();
        /** @type {?} */
        var currentSlideIdx = this._getSlideIdxById(currentSlideId);
        /** @type {?} */
        var isFirstSlide = currentSlideIdx === 0;
        return isFirstSlide ? (this.wrap ? slideArr[slideArr.length - 1].id : slideArr[0].id) :
            slideArr[currentSlideIdx - 1].id;
    };
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
                    template: "\n    <ol class=\"carousel-indicators\" *ngIf=\"showNavigationIndicators\">\n      <li *ngFor=\"let slide of slides\" [id]=\"slide.id\" [class.active]=\"slide.id === activeId\"\n          (click)=\"select(slide.id); pauseOnHover && pause()\"></li>\n    </ol>\n    <div class=\"carousel-inner\">\n      <div *ngFor=\"let slide of slides\" class=\"carousel-item\" [class.active]=\"slide.id === activeId\">\n        <ng-template [ngTemplateOutlet]=\"slide.tplRef\"></ng-template>\n      </div>\n    </div>\n    <a class=\"carousel-control-prev\" role=\"button\" (click)=\"prev()\" *ngIf=\"showNavigationArrows\">\n      <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\" i18n=\"@@ngb.carousel.previous\">Previous</span>\n    </a>\n    <a class=\"carousel-control-next\" role=\"button\" (click)=\"next()\" *ngIf=\"showNavigationArrows\">\n      <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\" i18n=\"@@ngb.carousel.next\">Next</span>\n    </a>\n  "
                }] }
    ];
    /** @nocollapse */
    NgbCarousel.ctorParameters = function () { return [
        { type: NgbCarouselConfig },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: NgZone },
        { type: ChangeDetectorRef }
    ]; };
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
    return NgbCarousel;
}());
export { NgbCarousel };
if (false) {
    /** @type {?} */
    NgbCarousel.prototype.slides;
    /** @type {?} */
    NgbCarousel.prototype._destroy$;
    /** @type {?} */
    NgbCarousel.prototype._start$;
    /** @type {?} */
    NgbCarousel.prototype._stop$;
    /**
     * The active slide id.
     * @type {?}
     */
    NgbCarousel.prototype.activeId;
    /**
     * Amount of time in milliseconds before next slide is shown.
     * @type {?}
     */
    NgbCarousel.prototype.interval;
    /**
     * Whether can wrap from the last to the first slide.
     * @type {?}
     */
    NgbCarousel.prototype.wrap;
    /**
     * A flag for allowing navigation via keyboard
     * @type {?}
     */
    NgbCarousel.prototype.keyboard;
    /**
     * A flag to enable slide cycling pause/resume on mouseover.
     * \@since 2.2.0
     * @type {?}
     */
    NgbCarousel.prototype.pauseOnHover;
    /**
     * A flag to show / hide navigation arrows.
     * \@since 2.2.0
     * @type {?}
     */
    NgbCarousel.prototype.showNavigationArrows;
    /**
     * A flag to show / hide navigation indicators.
     * \@since 2.2.0
     * @type {?}
     */
    NgbCarousel.prototype.showNavigationIndicators;
    /**
     * A carousel slide event fired when the slide transition is completed.
     * See NgbSlideEvent for payload details
     * @type {?}
     */
    NgbCarousel.prototype.slide;
    /** @type {?} */
    NgbCarousel.prototype._platformId;
    /** @type {?} */
    NgbCarousel.prototype._ngZone;
    /** @type {?} */
    NgbCarousel.prototype._cd;
}
/**
 * The payload of the slide event fired when the slide transition is completed
 * @record
 */
export function NgbSlideEvent() { }
if (false) {
    /**
     * Previous slide id
     * @type {?}
     */
    NgbSlideEvent.prototype.prev;
    /**
     * New slide ids
     * @type {?}
     */
    NgbSlideEvent.prototype.current;
    /**
     * Slide event direction
     * @type {?}
     */
    NgbSlideEvent.prototype.direction;
}
/** @enum {string} */
var NgbSlideEventDirection = {
    LEFT: (/** @type {?} */ ('left')),
    RIGHT: (/** @type {?} */ ('right')),
};
export { NgbSlideEventDirection };
/** @type {?} */
export var NGB_CAROUSEL_DIRECTIVES = [NgbCarousel, NgbSlide];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImNhcm91c2VsL2Nhcm91c2VsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBR04sTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRWxELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRXBELE9BQU8sRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0lBRTdELE1BQU0sR0FBRyxDQUFDOzs7O0FBS2Q7SUFPRSxrQkFBbUIsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7Ozs7O1FBRGxDLE9BQUUsR0FBRyxlQUFhLE1BQU0sRUFBSSxDQUFDO0lBQ1EsQ0FBQzs7Z0JBUGhELFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSx1QkFBdUIsRUFBQzs7OztnQkFkNUMsV0FBVzs7O3FCQW9CVixLQUFLOztJQUVSLGVBQUM7Q0FBQSxBQVJELElBUUM7U0FQWSxRQUFROzs7Ozs7O0lBS25CLHNCQUFzQzs7SUFDMUIsMEJBQStCOzs7OztBQU03QztJQXNGRSxxQkFDSSxNQUF5QixFQUErQixXQUFXLEVBQVUsT0FBZSxFQUNwRixHQUFzQjtRQUQwQixnQkFBVyxHQUFYLFdBQVcsQ0FBQTtRQUFVLFlBQU8s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ZixjQUFjLEVBQUUseUJBQXlCO3dCQUN6QyxjQUFjLEVBQUUseUJBQXlCO3dCQUN6QyxxQkFBcUIsRUFBRSxvQkFBb0I7d0JBQzNDLHNCQUFzQixFQUFFLG9CQUFvQjtxQkFDN0M7b0JBQ0QsUUFBUSxFQUFFLDRoQ0FrQlQ7aUJBQ0Y7Ozs7Z0JBdkRPLGlCQUFpQjtnREE4R1MsTUFBTSxTQUFDLFdBQVc7Z0JBeEhsRCxNQUFNO2dCQVBOLGlCQUFpQjs7O3lCQTJFaEIsZUFBZSxTQUFDLFFBQVE7MkJBU3hCLEtBQUs7MkJBTUwsS0FBSzt1QkFLTCxLQUFLOzJCQUtMLEtBQUs7K0JBTUwsS0FBSzt1Q0FNTCxLQUFLOzJDQU1MLEtBQUs7d0JBTUwsTUFBTTs7SUErR1Qsa0JBQUM7Q0FBQSxBQW5NRCxJQW1NQztTQWxLWSxXQUFXOzs7SUFFdEIsNkJBQXVEOztJQUV2RCxnQ0FBd0M7O0lBQ3hDLDhCQUFzQzs7SUFDdEMsNkJBQXFDOzs7OztJQUtyQywrQkFBMEI7Ozs7O0lBTTFCLCtCQUEwQjs7Ozs7SUFLMUIsMkJBQXVCOzs7OztJQUt2QiwrQkFBMkI7Ozs7OztJQU0zQixtQ0FBK0I7Ozs7OztJQU0vQiwyQ0FBdUM7Ozs7OztJQU12QywrQ0FBMkM7Ozs7OztJQU0zQyw0QkFBb0Q7O0lBR3JCLGtDQUF3Qzs7SUFBRSw4QkFBdUI7O0lBQzVGLDBCQUE4Qjs7Ozs7O0FBZ0hwQyxtQ0FlQzs7Ozs7O0lBWEMsNkJBQWE7Ozs7O0lBS2IsZ0NBQWdCOzs7OztJQUtoQixrQ0FBa0M7Ozs7SUFPbEMsTUFBTyxtQkFBSyxNQUFNLEVBQUE7SUFDbEIsT0FBUSxtQkFBSyxPQUFPLEVBQUE7Ozs7QUFHdEIsTUFBTSxLQUFPLHVCQUF1QixHQUFHLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudENoZWNrZWQsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBRdWVyeUxpc3QsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHtOZ2JDYXJvdXNlbENvbmZpZ30gZnJvbSAnLi9jYXJvdXNlbC1jb25maWcnO1xuXG5pbXBvcnQge21lcmdlLCBTdWJqZWN0LCB0aW1lcn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwLCBzd2l0Y2hNYXAsIHRha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGluZGl2aWR1YWwgc2xpZGUgdG8gYmUgdXNlZCB3aXRoaW4gYSBjYXJvdXNlbC5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JTbGlkZV0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JTbGlkZSB7XG4gIC8qKlxuICAgKiBVbmlxdWUgc2xpZGUgaWRlbnRpZmllci4gTXVzdCBiZSB1bmlxdWUgZm9yIHRoZSBlbnRpcmUgZG9jdW1lbnQgZm9yIHByb3BlciBhY2Nlc3NpYmlsaXR5IHN1cHBvcnQuXG4gICAqIFdpbGwgYmUgYXV0by1nZW5lcmF0ZWQgaWYgbm90IHByb3ZpZGVkLlxuICAgKi9cbiAgQElucHV0KCkgaWQgPSBgbmdiLXNsaWRlLSR7bmV4dElkKyt9YDtcbiAgY29uc3RydWN0b3IocHVibGljIHRwbFJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gZWFzaWx5IGNyZWF0ZSBjYXJvdXNlbHMgYmFzZWQgb24gQm9vdHN0cmFwJ3MgbWFya3VwLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItY2Fyb3VzZWwnLFxuICBleHBvcnRBczogJ25nYkNhcm91c2VsJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnY2Fyb3VzZWwgc2xpZGUnLFxuICAgICdbc3R5bGUuZGlzcGxheV0nOiAnXCJibG9ja1wiJyxcbiAgICAndGFiSW5kZXgnOiAnMCcsXG4gICAgJyhtb3VzZWVudGVyKSc6ICdwYXVzZU9uSG92ZXIgJiYgcGF1c2UoKScsXG4gICAgJyhtb3VzZWxlYXZlKSc6ICdwYXVzZU9uSG92ZXIgJiYgY3ljbGUoKScsXG4gICAgJyhrZXlkb3duLmFycm93TGVmdCknOiAna2V5Ym9hcmQgJiYgcHJldigpJyxcbiAgICAnKGtleWRvd24uYXJyb3dSaWdodCknOiAna2V5Ym9hcmQgJiYgbmV4dCgpJ1xuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxvbCBjbGFzcz1cImNhcm91c2VsLWluZGljYXRvcnNcIiAqbmdJZj1cInNob3dOYXZpZ2F0aW9uSW5kaWNhdG9yc1wiPlxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBzbGlkZSBvZiBzbGlkZXNcIiBbaWRdPVwic2xpZGUuaWRcIiBbY2xhc3MuYWN0aXZlXT1cInNsaWRlLmlkID09PSBhY3RpdmVJZFwiXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdChzbGlkZS5pZCk7IHBhdXNlT25Ib3ZlciAmJiBwYXVzZSgpXCI+PC9saT5cbiAgICA8L29sPlxuICAgIDxkaXYgY2xhc3M9XCJjYXJvdXNlbC1pbm5lclwiPlxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgc2xpZGUgb2Ygc2xpZGVzXCIgY2xhc3M9XCJjYXJvdXNlbC1pdGVtXCIgW2NsYXNzLmFjdGl2ZV09XCJzbGlkZS5pZCA9PT0gYWN0aXZlSWRcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInNsaWRlLnRwbFJlZlwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8YSBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtcHJldlwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwicHJldigpXCIgKm5nSWY9XCJzaG93TmF2aWdhdGlvbkFycm93c1wiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLXByZXYtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi5jYXJvdXNlbC5wcmV2aW91c1wiPlByZXZpb3VzPC9zcGFuPlxuICAgIDwvYT5cbiAgICA8YSBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtbmV4dFwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwibmV4dCgpXCIgKm5nSWY9XCJzaG93TmF2aWdhdGlvbkFycm93c1wiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLW5leHQtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi5jYXJvdXNlbC5uZXh0XCI+TmV4dDwvc3Bhbj5cbiAgICA8L2E+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTmdiQ2Fyb3VzZWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkLFxuICAgIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JTbGlkZSkgc2xpZGVzOiBRdWVyeUxpc3Q8TmdiU2xpZGU+O1xuXG4gIHByaXZhdGUgX2Rlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfc3RhcnQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfc3RvcCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBUaGUgYWN0aXZlIHNsaWRlIGlkLlxuICAgKi9cbiAgQElucHV0KCkgYWN0aXZlSWQ6IHN0cmluZztcblxuXG4gIC8qKlxuICAgKiBBbW91bnQgb2YgdGltZSBpbiBtaWxsaXNlY29uZHMgYmVmb3JlIG5leHQgc2xpZGUgaXMgc2hvd24uXG4gICAqL1xuICBASW5wdXQoKSBpbnRlcnZhbDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIGNhbiB3cmFwIGZyb20gdGhlIGxhc3QgdG8gdGhlIGZpcnN0IHNsaWRlLlxuICAgKi9cbiAgQElucHV0KCkgd3JhcDogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBmbGFnIGZvciBhbGxvd2luZyBuYXZpZ2F0aW9uIHZpYSBrZXlib2FyZFxuICAgKi9cbiAgQElucHV0KCkga2V5Ym9hcmQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgZmxhZyB0byBlbmFibGUgc2xpZGUgY3ljbGluZyBwYXVzZS9yZXN1bWUgb24gbW91c2VvdmVyLlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIEBJbnB1dCgpIHBhdXNlT25Ib3ZlcjogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBmbGFnIHRvIHNob3cgLyBoaWRlIG5hdmlnYXRpb24gYXJyb3dzLlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIEBJbnB1dCgpIHNob3dOYXZpZ2F0aW9uQXJyb3dzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBIGZsYWcgdG8gc2hvdyAvIGhpZGUgbmF2aWdhdGlvbiBpbmRpY2F0b3JzLlxuICAgKiBAc2luY2UgMi4yLjBcbiAgICovXG4gIEBJbnB1dCgpIHNob3dOYXZpZ2F0aW9uSW5kaWNhdG9yczogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBjYXJvdXNlbCBzbGlkZSBldmVudCBmaXJlZCB3aGVuIHRoZSBzbGlkZSB0cmFuc2l0aW9uIGlzIGNvbXBsZXRlZC5cbiAgICogU2VlIE5nYlNsaWRlRXZlbnQgZm9yIHBheWxvYWQgZGV0YWlsc1xuICAgKi9cbiAgQE91dHB1dCgpIHNsaWRlID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JTbGlkZUV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgY29uZmlnOiBOZ2JDYXJvdXNlbENvbmZpZywgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBfcGxhdGZvcm1JZCwgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgICBwcml2YXRlIF9jZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLmludGVydmFsID0gY29uZmlnLmludGVydmFsO1xuICAgIHRoaXMud3JhcCA9IGNvbmZpZy53cmFwO1xuICAgIHRoaXMua2V5Ym9hcmQgPSBjb25maWcua2V5Ym9hcmQ7XG4gICAgdGhpcy5wYXVzZU9uSG92ZXIgPSBjb25maWcucGF1c2VPbkhvdmVyO1xuICAgIHRoaXMuc2hvd05hdmlnYXRpb25BcnJvd3MgPSBjb25maWcuc2hvd05hdmlnYXRpb25BcnJvd3M7XG4gICAgdGhpcy5zaG93TmF2aWdhdGlvbkluZGljYXRvcnMgPSBjb25maWcuc2hvd05hdmlnYXRpb25JbmRpY2F0b3JzO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIC8vIHNldEludGVydmFsKCkgZG9lc24ndCBwbGF5IHdlbGwgd2l0aCBTU1IgYW5kIHByb3RyYWN0b3IsXG4gICAgLy8gc28gd2Ugc2hvdWxkIHJ1biBpdCBpbiB0aGUgYnJvd3NlciBhbmQgb3V0c2lkZSBBbmd1bGFyXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMuX3BsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLl9zdGFydCRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoKSA9PiB0aGlzLmludGVydmFsKSwgZmlsdGVyKGludGVydmFsID0+IGludGVydmFsID4gMCAmJiB0aGlzLnNsaWRlcy5sZW5ndGggPiAwKSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoaW50ZXJ2YWwgPT4gdGltZXIoaW50ZXJ2YWwpLnBpcGUodGFrZVVudGlsKG1lcmdlKHRoaXMuX3N0b3AkLCB0aGlzLl9kZXN0cm95JCkpKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5uZXh0KCkpKTtcblxuICAgICAgICB0aGlzLl9zdGFydCQubmV4dCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5zbGlkZXMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9jZC5tYXJrRm9yQ2hlY2soKSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgbGV0IGFjdGl2ZVNsaWRlID0gdGhpcy5fZ2V0U2xpZGVCeUlkKHRoaXMuYWN0aXZlSWQpO1xuICAgIHRoaXMuYWN0aXZlSWQgPSBhY3RpdmVTbGlkZSA/IGFjdGl2ZVNsaWRlLmlkIDogKHRoaXMuc2xpZGVzLmxlbmd0aCA/IHRoaXMuc2xpZGVzLmZpcnN0LmlkIDogbnVsbCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHsgdGhpcy5fZGVzdHJveSQubmV4dCgpOyB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xuICAgIGlmICgnaW50ZXJ2YWwnIGluIGNoYW5nZXMgJiYgIWNoYW5nZXNbJ2ludGVydmFsJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLl9zdGFydCQubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZSB0byBhIHNsaWRlIHdpdGggdGhlIHNwZWNpZmllZCBpZGVudGlmaWVyLlxuICAgKi9cbiAgc2VsZWN0KHNsaWRlSWQ6IHN0cmluZykgeyB0aGlzLl9jeWNsZVRvU2VsZWN0ZWQoc2xpZGVJZCwgdGhpcy5fZ2V0U2xpZGVFdmVudERpcmVjdGlvbih0aGlzLmFjdGl2ZUlkLCBzbGlkZUlkKSk7IH1cblxuICAvKipcbiAgICogTmF2aWdhdGUgdG8gdGhlIG5leHQgc2xpZGUuXG4gICAqL1xuICBwcmV2KCkgeyB0aGlzLl9jeWNsZVRvU2VsZWN0ZWQodGhpcy5fZ2V0UHJldlNsaWRlKHRoaXMuYWN0aXZlSWQpLCBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLlJJR0hUKTsgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZSB0byB0aGUgbmV4dCBzbGlkZS5cbiAgICovXG4gIG5leHQoKSB7IHRoaXMuX2N5Y2xlVG9TZWxlY3RlZCh0aGlzLl9nZXROZXh0U2xpZGUodGhpcy5hY3RpdmVJZCksIE5nYlNsaWRlRXZlbnREaXJlY3Rpb24uTEVGVCk7IH1cblxuICAvKipcbiAgICogU3RvcHMgdGhlIGNhcm91c2VsIGZyb20gY3ljbGluZyB0aHJvdWdoIGl0ZW1zLlxuICAgKi9cbiAgcGF1c2UoKSB7IHRoaXMuX3N0b3AkLm5leHQoKTsgfVxuXG4gIC8qKlxuICAgKiBSZXN0YXJ0cyBjeWNsaW5nIHRocm91Z2ggdGhlIGNhcm91c2VsIHNsaWRlcyBmcm9tIGxlZnQgdG8gcmlnaHQuXG4gICAqL1xuICBjeWNsZSgpIHsgdGhpcy5fc3RhcnQkLm5leHQoKTsgfVxuXG4gIHByaXZhdGUgX2N5Y2xlVG9TZWxlY3RlZChzbGlkZUlkeDogc3RyaW5nLCBkaXJlY3Rpb246IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24pIHtcbiAgICBsZXQgc2VsZWN0ZWRTbGlkZSA9IHRoaXMuX2dldFNsaWRlQnlJZChzbGlkZUlkeCk7XG4gICAgaWYgKHNlbGVjdGVkU2xpZGUgJiYgc2VsZWN0ZWRTbGlkZS5pZCAhPT0gdGhpcy5hY3RpdmVJZCkge1xuICAgICAgdGhpcy5zbGlkZS5lbWl0KHtwcmV2OiB0aGlzLmFjdGl2ZUlkLCBjdXJyZW50OiBzZWxlY3RlZFNsaWRlLmlkLCBkaXJlY3Rpb246IGRpcmVjdGlvbn0pO1xuICAgICAgdGhpcy5fc3RhcnQkLm5leHQoKTtcbiAgICAgIHRoaXMuYWN0aXZlSWQgPSBzZWxlY3RlZFNsaWRlLmlkO1xuICAgIH1cblxuICAgIC8vIHdlIGdldCBoZXJlIGFmdGVyIHRoZSBpbnRlcnZhbCBmaXJlcyBvciBhbnkgZXh0ZXJuYWwgQVBJIGNhbGwgbGlrZSBuZXh0KCksIHByZXYoKSBvciBzZWxlY3QoKVxuICAgIHRoaXMuX2NkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0U2xpZGVFdmVudERpcmVjdGlvbihjdXJyZW50QWN0aXZlU2xpZGVJZDogc3RyaW5nLCBuZXh0QWN0aXZlU2xpZGVJZDogc3RyaW5nKTogTmdiU2xpZGVFdmVudERpcmVjdGlvbiB7XG4gICAgY29uc3QgY3VycmVudEFjdGl2ZVNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRBY3RpdmVTbGlkZUlkKTtcbiAgICBjb25zdCBuZXh0QWN0aXZlU2xpZGVJZHggPSB0aGlzLl9nZXRTbGlkZUlkeEJ5SWQobmV4dEFjdGl2ZVNsaWRlSWQpO1xuXG4gICAgcmV0dXJuIGN1cnJlbnRBY3RpdmVTbGlkZUlkeCA+IG5leHRBY3RpdmVTbGlkZUlkeCA/IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24uUklHSFQgOiBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLkxFRlQ7XG4gIH1cblxuICBwcml2YXRlIF9nZXRTbGlkZUJ5SWQoc2xpZGVJZDogc3RyaW5nKTogTmdiU2xpZGUgeyByZXR1cm4gdGhpcy5zbGlkZXMuZmluZChzbGlkZSA9PiBzbGlkZS5pZCA9PT0gc2xpZGVJZCk7IH1cblxuICBwcml2YXRlIF9nZXRTbGlkZUlkeEJ5SWQoc2xpZGVJZDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zbGlkZXMudG9BcnJheSgpLmluZGV4T2YodGhpcy5fZ2V0U2xpZGVCeUlkKHNsaWRlSWQpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE5leHRTbGlkZShjdXJyZW50U2xpZGVJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBzbGlkZUFyciA9IHRoaXMuc2xpZGVzLnRvQXJyYXkoKTtcbiAgICBjb25zdCBjdXJyZW50U2xpZGVJZHggPSB0aGlzLl9nZXRTbGlkZUlkeEJ5SWQoY3VycmVudFNsaWRlSWQpO1xuICAgIGNvbnN0IGlzTGFzdFNsaWRlID0gY3VycmVudFNsaWRlSWR4ID09PSBzbGlkZUFyci5sZW5ndGggLSAxO1xuXG4gICAgcmV0dXJuIGlzTGFzdFNsaWRlID8gKHRoaXMud3JhcCA/IHNsaWRlQXJyWzBdLmlkIDogc2xpZGVBcnJbc2xpZGVBcnIubGVuZ3RoIC0gMV0uaWQpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZUFycltjdXJyZW50U2xpZGVJZHggKyAxXS5pZDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFByZXZTbGlkZShjdXJyZW50U2xpZGVJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBzbGlkZUFyciA9IHRoaXMuc2xpZGVzLnRvQXJyYXkoKTtcbiAgICBjb25zdCBjdXJyZW50U2xpZGVJZHggPSB0aGlzLl9nZXRTbGlkZUlkeEJ5SWQoY3VycmVudFNsaWRlSWQpO1xuICAgIGNvbnN0IGlzRmlyc3RTbGlkZSA9IGN1cnJlbnRTbGlkZUlkeCA9PT0gMDtcblxuICAgIHJldHVybiBpc0ZpcnN0U2xpZGUgPyAodGhpcy53cmFwID8gc2xpZGVBcnJbc2xpZGVBcnIubGVuZ3RoIC0gMV0uaWQgOiBzbGlkZUFyclswXS5pZCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZUFycltjdXJyZW50U2xpZGVJZHggLSAxXS5pZDtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBwYXlsb2FkIG9mIHRoZSBzbGlkZSBldmVudCBmaXJlZCB3aGVuIHRoZSBzbGlkZSB0cmFuc2l0aW9uIGlzIGNvbXBsZXRlZFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYlNsaWRlRXZlbnQge1xuICAvKipcbiAgICogUHJldmlvdXMgc2xpZGUgaWRcbiAgICovXG4gIHByZXY6IHN0cmluZztcblxuICAvKipcbiAgICogTmV3IHNsaWRlIGlkc1xuICAgKi9cbiAgY3VycmVudDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBTbGlkZSBldmVudCBkaXJlY3Rpb25cbiAgICovXG4gIGRpcmVjdGlvbjogTmdiU2xpZGVFdmVudERpcmVjdGlvbjtcbn1cblxuLyoqXG4gKiBFbnVtIHRvIGRlZmluZSB0aGUgY2Fyb3VzZWwgc2xpZGUgZXZlbnQgZGlyZWN0aW9uXG4gKi9cbmV4cG9ydCBlbnVtIE5nYlNsaWRlRXZlbnREaXJlY3Rpb24ge1xuICBMRUZUID0gPGFueT4nbGVmdCcsXG4gIFJJR0hUID0gPGFueT4ncmlnaHQnXG59XG5cbmV4cG9ydCBjb25zdCBOR0JfQ0FST1VTRUxfRElSRUNUSVZFUyA9IFtOZ2JDYXJvdXNlbCwgTmdiU2xpZGVdO1xuIl19