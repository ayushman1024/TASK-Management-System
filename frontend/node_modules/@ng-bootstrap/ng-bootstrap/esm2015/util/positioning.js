/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// previous version:
// https://github.com/angular-ui/bootstrap/blob/07c31d0731f7cb068a1932b8e01d2312b796b4ec/src/position/position.js
export class Positioning {
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
export function positionElements(hostElement, targetElement, placement, appendToBody, baseClass) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb25pbmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInV0aWwvcG9zaXRpb25pbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsTUFBTSxPQUFPLFdBQVc7Ozs7O0lBQ2QsWUFBWSxDQUFDLE9BQW9CLElBQUksT0FBTyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUFFL0UsUUFBUSxDQUFDLE9BQW9CLEVBQUUsSUFBWSxJQUFZLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRWpHLGtCQUFrQixDQUFDLE9BQW9CO1FBQzdDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxRQUFRLENBQUM7SUFDdkUsQ0FBQzs7Ozs7SUFFTyxZQUFZLENBQUMsT0FBb0I7O1lBQ25DLGNBQWMsR0FBRyxtQkFBYSxPQUFPLENBQUMsWUFBWSxFQUFBLElBQUksUUFBUSxDQUFDLGVBQWU7UUFFbEYsT0FBTyxjQUFjLElBQUksY0FBYyxLQUFLLFFBQVEsQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQy9HLGNBQWMsR0FBRyxtQkFBYSxjQUFjLENBQUMsWUFBWSxFQUFBLENBQUM7U0FDM0Q7UUFFRCxPQUFPLGNBQWMsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDO0lBQ3BELENBQUM7Ozs7OztJQUVELFFBQVEsQ0FBQyxPQUFvQixFQUFFLEtBQUssR0FBRyxJQUFJOztZQUNyQyxVQUFzQjs7WUFDdEIsWUFBWSxHQUFlLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVB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O1lBQ2IsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZFO0tBQ0Y7SUFFRCxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQ2pCLDJEQUEyRDtRQUMzRCxhQUFhLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztLQUMzRjtJQUVELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBwcmV2aW91cyB2ZXJzaW9uOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXItdWkvYm9vdHN0cmFwL2Jsb2IvMDdjMzFkMDczMWY3Y2IwNjhhMTkzMmI4ZTAxZDIzMTJiNzk2YjRlYy9zcmMvcG9zaXRpb24vcG9zaXRpb24uanNcbmV4cG9ydCBjbGFzcyBQb3NpdGlvbmluZyB7XG4gIHByaXZhdGUgZ2V0QWxsU3R5bGVzKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7IHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTsgfVxuXG4gIHByaXZhdGUgZ2V0U3R5bGUoZWxlbWVudDogSFRNTEVsZW1lbnQsIHByb3A6IHN0cmluZyk6IHN0cmluZyB7IHJldHVybiB0aGlzLmdldEFsbFN0eWxlcyhlbGVtZW50KVtwcm9wXTsgfVxuXG4gIHByaXZhdGUgaXNTdGF0aWNQb3NpdGlvbmVkKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLmdldFN0eWxlKGVsZW1lbnQsICdwb3NpdGlvbicpIHx8ICdzdGF0aWMnKSA9PT0gJ3N0YXRpYyc7XG4gIH1cblxuICBwcml2YXRlIG9mZnNldFBhcmVudChlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICBsZXQgb2Zmc2V0UGFyZW50RWwgPSA8SFRNTEVsZW1lbnQ+ZWxlbWVudC5vZmZzZXRQYXJlbnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgd2hpbGUgKG9mZnNldFBhcmVudEVsICYmIG9mZnNldFBhcmVudEVsICE9PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgdGhpcy5pc1N0YXRpY1Bvc2l0aW9uZWQob2Zmc2V0UGFyZW50RWwpKSB7XG4gICAgICBvZmZzZXRQYXJlbnRFbCA9IDxIVE1MRWxlbWVudD5vZmZzZXRQYXJlbnRFbC5vZmZzZXRQYXJlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZnNldFBhcmVudEVsIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfVxuXG4gIHBvc2l0aW9uKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCByb3VuZCA9IHRydWUpOiBDbGllbnRSZWN0IHtcbiAgICBsZXQgZWxQb3NpdGlvbjogQ2xpZW50UmVjdDtcbiAgICBsZXQgcGFyZW50T2Zmc2V0OiBDbGllbnRSZWN0ID0ge3dpZHRoOiAwLCBoZWlnaHQ6IDAsIHRvcDogMCwgYm90dG9tOiAwLCBsZWZ0OiAwLCByaWdodDogMH07XG5cbiAgICBpZiAodGhpcy5nZXRTdHlsZShlbGVtZW50LCAncG9zaXRpb24nKSA9PT0gJ2ZpeGVkJykge1xuICAgICAgZWxQb3NpdGlvbiA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBlbFBvc2l0aW9uID0ge1xuICAgICAgICB0b3A6IGVsUG9zaXRpb24udG9wLFxuICAgICAgICBib3R0b206IGVsUG9zaXRpb24uYm90dG9tLFxuICAgICAgICBsZWZ0OiBlbFBvc2l0aW9uLmxlZnQsXG4gICAgICAgIHJpZ2h0OiBlbFBvc2l0aW9uLnJpZ2h0LFxuICAgICAgICBoZWlnaHQ6IGVsUG9zaXRpb24uaGVpZ2h0LFxuICAgICAgICB3aWR0aDogZWxQb3NpdGlvbi53aWR0aFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgb2Zmc2V0UGFyZW50RWwgPSB0aGlzLm9mZnNldFBhcmVudChlbGVtZW50KTtcblxuICAgICAgZWxQb3NpdGlvbiA9IHRoaXMub2Zmc2V0KGVsZW1lbnQsIGZhbHNlKTtcblxuICAgICAgaWYgKG9mZnNldFBhcmVudEVsICE9PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgcGFyZW50T2Zmc2V0ID0gdGhpcy5vZmZzZXQob2Zmc2V0UGFyZW50RWwsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgcGFyZW50T2Zmc2V0LnRvcCArPSBvZmZzZXRQYXJlbnRFbC5jbGllbnRUb3A7XG4gICAgICBwYXJlbnRPZmZzZXQubGVmdCArPSBvZmZzZXRQYXJlbnRFbC5jbGllbnRMZWZ0O1xuICAgIH1cblxuICAgIGVsUG9zaXRpb24udG9wIC09IHBhcmVudE9mZnNldC50b3A7XG4gICAgZWxQb3NpdGlvbi5ib3R0b20gLT0gcGFyZW50T2Zmc2V0LnRvcDtcbiAgICBlbFBvc2l0aW9uLmxlZnQgLT0gcGFyZW50T2Zmc2V0LmxlZnQ7XG4gICAgZWxQb3NpdGlvbi5yaWdodCAtPSBwYXJlbnRPZmZzZXQubGVmdDtcblxuICAgIGlmIChyb3VuZCkge1xuICAgICAgZWxQb3NpdGlvbi50b3AgPSBNYXRoLnJvdW5kKGVsUG9zaXRpb24udG9wKTtcbiAgICAgIGVsUG9zaXRpb24uYm90dG9tID0gTWF0aC5yb3VuZChlbFBvc2l0aW9uLmJvdHRvbSk7XG4gICAgICBlbFBvc2l0aW9uLmxlZnQgPSBNYXRoLnJvdW5kKGVsUG9zaXRpb24ubGVmdCk7XG4gICAgICBlbFBvc2l0aW9uLnJpZ2h0ID0gTWF0aC5yb3VuZChlbFBvc2l0aW9uLnJpZ2h0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxQb3NpdGlvbjtcbiAgfVxuXG4gIG9mZnNldChlbGVtZW50OiBIVE1MRWxlbWVudCwgcm91bmQgPSB0cnVlKTogQ2xpZW50UmVjdCB7XG4gICAgY29uc3QgZWxCY3IgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHZpZXdwb3J0T2Zmc2V0ID0ge1xuICAgICAgdG9wOiB3aW5kb3cucGFnZVlPZmZzZXQgLSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50VG9wLFxuICAgICAgbGVmdDogd2luZG93LnBhZ2VYT2Zmc2V0IC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudExlZnRcbiAgICB9O1xuXG4gICAgbGV0IGVsT2Zmc2V0ID0ge1xuICAgICAgaGVpZ2h0OiBlbEJjci5oZWlnaHQgfHwgZWxlbWVudC5vZmZzZXRIZWlnaHQsXG4gICAgICB3aWR0aDogZWxCY3Iud2lkdGggfHwgZWxlbWVudC5vZmZzZXRXaWR0aCxcbiAgICAgIHRvcDogZWxCY3IudG9wICsgdmlld3BvcnRPZmZzZXQudG9wLFxuICAgICAgYm90dG9tOiBlbEJjci5ib3R0b20gKyB2aWV3cG9ydE9mZnNldC50b3AsXG4gICAgICBsZWZ0OiBlbEJjci5sZWZ0ICsgdmlld3BvcnRPZmZzZXQubGVmdCxcbiAgICAgIHJpZ2h0OiBlbEJjci5yaWdodCArIHZpZXdwb3J0T2Zmc2V0LmxlZnRcbiAgICB9O1xuXG4gICAgaWYgKHJvdW5kKSB7XG4gICAgICBlbE9mZnNldC5oZWlnaHQgPSBNYXRoLnJvdW5kKGVsT2Zmc2V0LmhlaWdodCk7XG4gICAgICBlbE9mZnNldC53aWR0aCA9IE1hdGgucm91bmQoZWxPZmZzZXQud2lkdGgpO1xuICAgICAgZWxPZmZzZXQudG9wID0gTWF0aC5yb3VuZChlbE9mZnNldC50b3ApO1xuICAgICAgZWxPZmZzZXQuYm90dG9tID0gTWF0aC5yb3VuZChlbE9mZnNldC5ib3R0b20pO1xuICAgICAgZWxPZmZzZXQubGVmdCA9IE1hdGgucm91bmQoZWxPZmZzZXQubGVmdCk7XG4gICAgICBlbE9mZnNldC5yaWdodCA9IE1hdGgucm91bmQoZWxPZmZzZXQucmlnaHQpO1xuICAgIH1cblxuICAgIHJldHVybiBlbE9mZnNldDtcbiAgfVxuXG4gIC8qXG4gICAgUmV0dXJuIGZhbHNlIGlmIHRoZSBlbGVtZW50IHRvIHBvc2l0aW9uIGlzIG91dHNpZGUgdGhlIHZpZXdwb3J0XG4gICovXG4gIHBvc2l0aW9uRWxlbWVudHMoaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCwgcGxhY2VtZW50OiBzdHJpbmcsIGFwcGVuZFRvQm9keT86IGJvb2xlYW4pOlxuICAgICAgYm9vbGVhbiB7XG4gICAgY29uc3RbcGxhY2VtZW50UHJpbWFyeSA9ICd0b3AnLCBwbGFjZW1lbnRTZWNvbmRhcnkgPSAnY2VudGVyJ10gPSBwbGFjZW1lbnQuc3BsaXQoJy0nKTtcblxuICAgIGNvbnN0IGhvc3RFbFBvc2l0aW9uID0gYXBwZW5kVG9Cb2R5ID8gdGhpcy5vZmZzZXQoaG9zdEVsZW1lbnQsIGZhbHNlKSA6IHRoaXMucG9zaXRpb24oaG9zdEVsZW1lbnQsIGZhbHNlKTtcbiAgICBjb25zdCB0YXJnZXRFbFN0eWxlcyA9IHRoaXMuZ2V0QWxsU3R5bGVzKHRhcmdldEVsZW1lbnQpO1xuXG4gICAgY29uc3QgbWFyZ2luVG9wID0gcGFyc2VGbG9hdCh0YXJnZXRFbFN0eWxlcy5tYXJnaW5Ub3ApO1xuICAgIGNvbnN0IG1hcmdpbkJvdHRvbSA9IHBhcnNlRmxvYXQodGFyZ2V0RWxTdHlsZXMubWFyZ2luQm90dG9tKTtcbiAgICBjb25zdCBtYXJnaW5MZWZ0ID0gcGFyc2VGbG9hdCh0YXJnZXRFbFN0eWxlcy5tYXJnaW5MZWZ0KTtcbiAgICBjb25zdCBtYXJnaW5SaWdodCA9IHBhcnNlRmxvYXQodGFyZ2V0RWxTdHlsZXMubWFyZ2luUmlnaHQpO1xuXG4gICAgbGV0IHRvcFBvc2l0aW9uID0gMDtcbiAgICBsZXQgbGVmdFBvc2l0aW9uID0gMDtcblxuICAgIHN3aXRjaCAocGxhY2VtZW50UHJpbWFyeSkge1xuICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgdG9wUG9zaXRpb24gPSAoaG9zdEVsUG9zaXRpb24udG9wIC0gKHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgbWFyZ2luVG9wICsgbWFyZ2luQm90dG9tKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgdG9wUG9zaXRpb24gPSAoaG9zdEVsUG9zaXRpb24udG9wICsgaG9zdEVsUG9zaXRpb24uaGVpZ2h0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgbGVmdFBvc2l0aW9uID0gKGhvc3RFbFBvc2l0aW9uLmxlZnQgLSAodGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aCArIG1hcmdpbkxlZnQgKyBtYXJnaW5SaWdodCkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgbGVmdFBvc2l0aW9uID0gKGhvc3RFbFBvc2l0aW9uLmxlZnQgKyBob3N0RWxQb3NpdGlvbi53aWR0aCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHN3aXRjaCAocGxhY2VtZW50U2Vjb25kYXJ5KSB7XG4gICAgICBjYXNlICd0b3AnOlxuICAgICAgICB0b3BQb3NpdGlvbiA9IGhvc3RFbFBvc2l0aW9uLnRvcDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICB0b3BQb3NpdGlvbiA9IGhvc3RFbFBvc2l0aW9uLnRvcCArIGhvc3RFbFBvc2l0aW9uLmhlaWdodCAtIHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICBsZWZ0UG9zaXRpb24gPSBob3N0RWxQb3NpdGlvbi5sZWZ0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgbGVmdFBvc2l0aW9uID0gaG9zdEVsUG9zaXRpb24ubGVmdCArIGhvc3RFbFBvc2l0aW9uLndpZHRoIC0gdGFyZ2V0RWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICBpZiAocGxhY2VtZW50UHJpbWFyeSA9PT0gJ3RvcCcgfHwgcGxhY2VtZW50UHJpbWFyeSA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICBsZWZ0UG9zaXRpb24gPSAoaG9zdEVsUG9zaXRpb24ubGVmdCArIGhvc3RFbFBvc2l0aW9uLndpZHRoIC8gMiAtIHRhcmdldEVsZW1lbnQub2Zmc2V0V2lkdGggLyAyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b3BQb3NpdGlvbiA9IChob3N0RWxQb3NpdGlvbi50b3AgKyBob3N0RWxQb3NpdGlvbi5oZWlnaHQgLyAyIC0gdGFyZ2V0RWxlbWVudC5vZmZzZXRIZWlnaHQgLyAyKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLy8gVGhlIHRyYW5zbGF0ZTNkL2dwdSBhY2NlbGVyYXRpb24gcmVuZGVyIGEgYmx1cnJ5IHRleHQgb24gY2hyb21lLCB0aGUgbmV4dCBsaW5lIGlzIGNvbW1lbnRlZCB1bnRpbCBhIGJyb3dzZXIgZml4XG4gICAgLy8gdGFyZ2V0RWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHtNYXRoLnJvdW5kKGxlZnRQb3NpdGlvbil9cHgsICR7TWF0aC5mbG9vcih0b3BQb3NpdGlvbil9cHgsIDBweClgO1xuICAgIHRhcmdldEVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke01hdGgucm91bmQobGVmdFBvc2l0aW9uKX1weCwgJHtNYXRoLnJvdW5kKHRvcFBvc2l0aW9uKX1weClgO1xuXG4gICAgLy8gQ2hlY2sgaWYgdGhlIHRhcmdldEVsZW1lbnQgaXMgaW5zaWRlIHRoZSB2aWV3cG9ydFxuICAgIGNvbnN0IHRhcmdldEVsQkNSID0gdGFyZ2V0RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBodG1sID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBodG1sLmNsaWVudEhlaWdodDtcbiAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGh0bWwuY2xpZW50V2lkdGg7XG5cbiAgICByZXR1cm4gdGFyZ2V0RWxCQ1IubGVmdCA+PSAwICYmIHRhcmdldEVsQkNSLnRvcCA+PSAwICYmIHRhcmdldEVsQkNSLnJpZ2h0IDw9IHdpbmRvd1dpZHRoICYmXG4gICAgICAgIHRhcmdldEVsQkNSLmJvdHRvbSA8PSB3aW5kb3dIZWlnaHQ7XG4gIH1cbn1cblxuY29uc3QgcGxhY2VtZW50U2VwYXJhdG9yID0gL1xccysvO1xuY29uc3QgcG9zaXRpb25TZXJ2aWNlID0gbmV3IFBvc2l0aW9uaW5nKCk7XG5cbi8qXG4gKiBBY2NlcHQgdGhlIHBsYWNlbWVudCBhcnJheSBhbmQgYXBwbGllcyB0aGUgYXBwcm9wcmlhdGUgcGxhY2VtZW50IGRlcGVuZGVudCBvbiB0aGUgdmlld3BvcnQuXG4gKiBSZXR1cm5zIHRoZSBhcHBsaWVkIHBsYWNlbWVudC5cbiAqIEluIGNhc2Ugb2YgYXV0byBwbGFjZW1lbnQsIHBsYWNlbWVudHMgYXJlIHNlbGVjdGVkIGluIG9yZGVyXG4gKiAgICd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnLFxuICogICAndG9wLWxlZnQnLCAndG9wLXJpZ2h0JyxcbiAqICAgJ2JvdHRvbS1sZWZ0JywgJ2JvdHRvbS1yaWdodCcsXG4gKiAgICdsZWZ0LXRvcCcsICdsZWZ0LWJvdHRvbScsXG4gKiAgICdyaWdodC10b3AnLCAncmlnaHQtYm90dG9tJy5cbiAqICovXG5leHBvcnQgZnVuY3Rpb24gcG9zaXRpb25FbGVtZW50cyhcbiAgICBob3N0RWxlbWVudDogSFRNTEVsZW1lbnQsIHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwbGFjZW1lbnQ6IHN0cmluZyB8IFBsYWNlbWVudCB8IFBsYWNlbWVudEFycmF5LFxuICAgIGFwcGVuZFRvQm9keT86IGJvb2xlYW4sIGJhc2VDbGFzcz86IHN0cmluZyk6IFBsYWNlbWVudCB7XG4gIGxldCBwbGFjZW1lbnRWYWxzOiBBcnJheTxQbGFjZW1lbnQ+ID1cbiAgICAgIEFycmF5LmlzQXJyYXkocGxhY2VtZW50KSA/IHBsYWNlbWVudCA6IHBsYWNlbWVudC5zcGxpdChwbGFjZW1lbnRTZXBhcmF0b3IpIGFzIEFycmF5PFBsYWNlbWVudD47XG5cbiAgY29uc3QgYWxsb3dlZFBsYWNlbWVudHMgPSBbXG4gICAgJ3RvcCcsICdib3R0b20nLCAnbGVmdCcsICdyaWdodCcsICd0b3AtbGVmdCcsICd0b3AtcmlnaHQnLCAnYm90dG9tLWxlZnQnLCAnYm90dG9tLXJpZ2h0JywgJ2xlZnQtdG9wJywgJ2xlZnQtYm90dG9tJyxcbiAgICAncmlnaHQtdG9wJywgJ3JpZ2h0LWJvdHRvbSdcbiAgXTtcblxuICBjb25zdCBjbGFzc0xpc3QgPSB0YXJnZXRFbGVtZW50LmNsYXNzTGlzdDtcbiAgY29uc3QgYWRkQ2xhc3Nlc1RvVGFyZ2V0ID0gKHRhcmdldFBsYWNlbWVudDogUGxhY2VtZW50KTogQXJyYXk8c3RyaW5nPiA9PiB7XG4gICAgY29uc3RbcHJpbWFyeSwgc2Vjb25kYXJ5XSA9IHRhcmdldFBsYWNlbWVudC5zcGxpdCgnLScpO1xuICAgIGNvbnN0IGNsYXNzZXMgPSBbXTtcbiAgICBpZiAoYmFzZUNsYXNzKSB7XG4gICAgICBjbGFzc2VzLnB1c2goYCR7YmFzZUNsYXNzfS0ke3ByaW1hcnl9YCk7XG4gICAgICBpZiAoc2Vjb25kYXJ5KSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChgJHtiYXNlQ2xhc3N9LSR7cHJpbWFyeX0tJHtzZWNvbmRhcnl9YCk7XG4gICAgICB9XG5cbiAgICAgIGNsYXNzZXMuZm9yRWFjaCgoY2xhc3NuYW1lKSA9PiB7IGNsYXNzTGlzdC5hZGQoY2xhc3NuYW1lKTsgfSk7XG4gICAgfVxuICAgIHJldHVybiBjbGFzc2VzO1xuICB9O1xuXG4gIC8vIFJlbW92ZSBvbGQgcGxhY2VtZW50IGNsYXNzZXMgdG8gYXZvaWQgaXNzdWVzXG4gIGlmIChiYXNlQ2xhc3MpIHtcbiAgICBhbGxvd2VkUGxhY2VtZW50cy5mb3JFYWNoKChwbGFjZW1lbnRUb1JlbW92ZSkgPT4geyBjbGFzc0xpc3QucmVtb3ZlKGAke2Jhc2VDbGFzc30tJHtwbGFjZW1lbnRUb1JlbW92ZX1gKTsgfSk7XG4gIH1cblxuICAvLyByZXBsYWNlIGF1dG8gcGxhY2VtZW50IHdpdGggb3RoZXIgcGxhY2VtZW50c1xuICBsZXQgaGFzQXV0byA9IHBsYWNlbWVudFZhbHMuZmluZEluZGV4KHZhbCA9PiB2YWwgPT09ICdhdXRvJyk7XG4gIGlmIChoYXNBdXRvID49IDApIHtcbiAgICBhbGxvd2VkUGxhY2VtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKG9iaikge1xuICAgICAgaWYgKHBsYWNlbWVudFZhbHMuZmluZCh2YWwgPT4gdmFsLnNlYXJjaCgnXicgKyBvYmopICE9PSAtMSkgPT0gbnVsbCkge1xuICAgICAgICBwbGFjZW1lbnRWYWxzLnNwbGljZShoYXNBdXRvKyssIDEsIG9iaiBhcyBQbGFjZW1lbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gY29vcmRpbmF0ZXMgd2hlcmUgdG8gcG9zaXRpb25cblxuICAvLyBSZXF1aXJlZCBmb3IgdHJhbnNmb3JtOlxuICBjb25zdCBzdHlsZSA9IHRhcmdldEVsZW1lbnQuc3R5bGU7XG4gIHN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgc3R5bGUudG9wID0gJzAnO1xuICBzdHlsZS5sZWZ0ID0gJzAnO1xuICAvLyBUaGUgdHJhbnNsYXRlM2QvZ3B1IGFjY2VsZXJhdGlvbiByZW5kZXIgYSBibHVycnkgdGV4dCBvbiBjaHJvbWUsIHRoZSBuZXh0IGxpbmUgaXMgY29tbWVudGVkIHVudGlsIGEgYnJvd3NlciBmaXhcbiAgLy8gc3R5bGVbJ3dpbGwtY2hhbmdlJ10gPSAndHJhbnNmb3JtJztcblxuICBsZXQgdGVzdFBsYWNlbWVudDogUGxhY2VtZW50O1xuICBsZXQgaXNJblZpZXdwb3J0ID0gZmFsc2U7XG4gIGZvciAodGVzdFBsYWNlbWVudCBvZiBwbGFjZW1lbnRWYWxzKSB7XG4gICAgbGV0IGFkZGVkQ2xhc3NlcyA9IGFkZENsYXNzZXNUb1RhcmdldCh0ZXN0UGxhY2VtZW50KTtcblxuICAgIGlmIChwb3NpdGlvblNlcnZpY2UucG9zaXRpb25FbGVtZW50cyhob3N0RWxlbWVudCwgdGFyZ2V0RWxlbWVudCwgdGVzdFBsYWNlbWVudCwgYXBwZW5kVG9Cb2R5KSkge1xuICAgICAgaXNJblZpZXdwb3J0ID0gdHJ1ZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZSB0aGUgYmFzZUNsYXNzZXMgZm9yIGZ1cnRoZXIgY2FsY3VsYXRpb25cbiAgICBpZiAoYmFzZUNsYXNzKSB7XG4gICAgICBhZGRlZENsYXNzZXMuZm9yRWFjaCgoY2xhc3NuYW1lKSA9PiB7IGNsYXNzTGlzdC5yZW1vdmUoY2xhc3NuYW1lKTsgfSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFpc0luVmlld3BvcnQpIHtcbiAgICAvLyBJZiBub3RoaW5nIG1hdGNoLCB0aGUgZmlyc3QgcGxhY2VtZW50IGlzIHRoZSBkZWZhdWx0IG9uZVxuICAgIHRlc3RQbGFjZW1lbnQgPSBwbGFjZW1lbnRWYWxzWzBdO1xuICAgIGFkZENsYXNzZXNUb1RhcmdldCh0ZXN0UGxhY2VtZW50KTtcbiAgICBwb3NpdGlvblNlcnZpY2UucG9zaXRpb25FbGVtZW50cyhob3N0RWxlbWVudCwgdGFyZ2V0RWxlbWVudCwgdGVzdFBsYWNlbWVudCwgYXBwZW5kVG9Cb2R5KTtcbiAgfVxuXG4gIHJldHVybiB0ZXN0UGxhY2VtZW50O1xufVxuXG5leHBvcnQgdHlwZSBQbGFjZW1lbnQgPSAnYXV0bycgfCAndG9wJyB8ICdib3R0b20nIHwgJ2xlZnQnIHwgJ3JpZ2h0JyB8ICd0b3AtbGVmdCcgfCAndG9wLXJpZ2h0JyB8ICdib3R0b20tbGVmdCcgfFxuICAgICdib3R0b20tcmlnaHQnIHwgJ2xlZnQtdG9wJyB8ICdsZWZ0LWJvdHRvbScgfCAncmlnaHQtdG9wJyB8ICdyaWdodC1ib3R0b20nO1xuXG5leHBvcnQgdHlwZSBQbGFjZW1lbnRBcnJheSA9IFBsYWNlbWVudCB8IEFycmF5PFBsYWNlbWVudD58IHN0cmluZztcbiJdfQ==