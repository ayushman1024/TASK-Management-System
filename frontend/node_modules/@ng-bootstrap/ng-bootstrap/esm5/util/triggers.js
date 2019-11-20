/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Observable, merge } from 'rxjs';
import { share, filter, delay, map } from 'rxjs/operators';
var Trigger = /** @class */ (function () {
    function Trigger(open, close) {
        this.open = open;
        this.close = close;
        if (!close) {
            this.close = open;
        }
    }
    /**
     * @return {?}
     */
    Trigger.prototype.isManual = /**
     * @return {?}
     */
    function () { return this.open === 'manual' || this.close === 'manual'; };
    return Trigger;
}());
export { Trigger };
if (false) {
    /** @type {?} */
    Trigger.prototype.open;
    /** @type {?} */
    Trigger.prototype.close;
}
/** @type {?} */
var DEFAULT_ALIASES = {
    'hover': ['mouseenter', 'mouseleave'],
    'focus': ['focusin', 'focusout'],
};
/**
 * @param {?} triggers
 * @param {?=} aliases
 * @return {?}
 */
export function parseTriggers(triggers, aliases) {
    if (aliases === void 0) { aliases = DEFAULT_ALIASES; }
    /** @type {?} */
    var trimmedTriggers = (triggers || '').trim();
    if (trimmedTriggers.length === 0) {
        return [];
    }
    /** @type {?} */
    var parsedTriggers = trimmedTriggers.split(/\s+/).map(function (trigger) { return trigger.split(':'); }).map(function (triggerPair) {
        /** @type {?} */
        var alias = aliases[triggerPair[0]] || triggerPair;
        return new Trigger(alias[0], alias[1]);
    });
    /** @type {?} */
    var manualTriggers = parsedTriggers.filter(function (triggerPair) { return triggerPair.isManual(); });
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
export function observeTriggers(renderer, nativeElement, triggers, isOpenedFn) {
    return new Observable(function (subscriber) {
        /** @type {?} */
        var listeners = [];
        /** @type {?} */
        var openFn = function () { return subscriber.next(true); };
        /** @type {?} */
        var closeFn = function () { return subscriber.next(false); };
        /** @type {?} */
        var toggleFn = function () { return subscriber.next(!isOpenedFn()); };
        triggers.forEach(function (trigger) {
            if (trigger.open === trigger.close) {
                listeners.push(renderer.listen(nativeElement, trigger.open, toggleFn));
            }
            else {
                listeners.push(renderer.listen(nativeElement, trigger.open, openFn), renderer.listen(nativeElement, trigger.close, closeFn));
            }
        });
        return function () { listeners.forEach(function (unsubscribeFn) { return unsubscribeFn(); }); };
    });
}
/** @type {?} */
var delayOrNoop = function (time) { return time > 0 ? delay(time) : function (a) { return a; }; };
var ɵ0 = delayOrNoop;
/**
 * @param {?} openDelay
 * @param {?} closeDelay
 * @param {?} isOpenedFn
 * @return {?}
 */
export function triggerDelay(openDelay, closeDelay, isOpenedFn) {
    return function (input$) {
        /** @type {?} */
        var pending = null;
        /** @type {?} */
        var filteredInput$ = input$.pipe(map(function (open) { return ({ open: open }); }), filter(function (event) {
            /** @type {?} */
            var currentlyOpen = isOpenedFn();
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
        var delayedOpen$ = filteredInput$.pipe(filter(function (event) { return event.open; }), delayOrNoop(openDelay));
        /** @type {?} */
        var delayedClose$ = filteredInput$.pipe(filter(function (event) { return !event.open; }), delayOrNoop(closeDelay));
        return merge(delayedOpen$, delayedClose$)
            .pipe(filter(function (event) {
            if (event === pending) {
                pending = null;
                return event.open !== isOpenedFn();
            }
            return false;
        }), map(function (event) { return event.open; }));
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
export function listenToTriggers(renderer, nativeElement, triggers, isOpenedFn, openFn, closeFn, openDelay, closeDelay) {
    if (openDelay === void 0) { openDelay = 0; }
    if (closeDelay === void 0) { closeDelay = 0; }
    /** @type {?} */
    var parsedTriggers = parseTriggers(triggers);
    if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
        return function () { };
    }
    /** @type {?} */
    var subscription = observeTriggers(renderer, nativeElement, parsedTriggers, isOpenedFn)
        .pipe(triggerDelay(openDelay, closeDelay, isOpenedFn))
        .subscribe(function (open) { return (open ? openFn() : closeFn()); });
    return function () { return subscription.unsubscribe(); };
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInV0aWwvdHJpZ2dlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RDtJQUNFLGlCQUFtQixJQUFZLEVBQVMsS0FBYztRQUFuQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUztRQUNwRCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDbkI7SUFDSCxDQUFDOzs7O0lBRUQsMEJBQVE7OztJQUFSLGNBQWEsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDMUUsY0FBQztBQUFELENBQUMsQUFSRCxJQVFDOzs7O0lBUGEsdUJBQW1COztJQUFFLHdCQUFxQjs7O0lBU2xELGVBQWUsR0FBRztJQUN0QixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO0lBQ3JDLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUM7Q0FDakM7Ozs7OztBQUVELE1BQU0sVUFBVSxhQUFhLENBQUMsUUFBZ0IsRUFBRSxPQUF5QjtJQUF6Qix3QkFBQSxFQUFBLHlCQUF5Qjs7UUFDakUsZUFBZSxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRTtJQUUvQyxJQUFJLGVBQWUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2hDLE9BQU8sRUFBRSxDQUFDO0tBQ1g7O1FBRUssY0FBYyxHQUFH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LENBQVUsQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0FBQ0osQ0FBQzs7Ozs7Ozs7Ozs7O0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUM1QixRQUFhLEVBQUUsYUFBa0IsRUFBRSxRQUFnQixFQUFFLFVBQXlCLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFhLEVBQzlHLFVBQWM7SUFEbUYsMEJBQUEsRUFBQSxhQUFhO0lBQzlHLDJCQUFBLEVBQUEsY0FBYzs7UUFDVixjQUFjLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQztJQUU5QyxJQUFJLGNBQWMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUMvRCxPQUFPLGNBQU8sQ0FBQyxDQUFDO0tBQ2pCOztRQUVLLFlBQVksR0FBRyxlQUFlLENBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDO1NBQy9ELElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNyRCxTQUFTLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQTdCLENBQTZCLENBQUM7SUFFMUUsT0FBTyxjQUFNLE9BQUEsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUExQixDQUEwQixDQUFDO0FBQzFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09ic2VydmFibGUsIG1lcmdlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7c2hhcmUsIGZpbHRlciwgZGVsYXksIG1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY2xhc3MgVHJpZ2dlciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcGVuOiBzdHJpbmcsIHB1YmxpYyBjbG9zZT86IHN0cmluZykge1xuICAgIGlmICghY2xvc2UpIHtcbiAgICAgIHRoaXMuY2xvc2UgPSBvcGVuO1xuICAgIH1cbiAgfVxuXG4gIGlzTWFudWFsKCkgeyByZXR1cm4gdGhpcy5vcGVuID09PSAnbWFudWFsJyB8fCB0aGlzLmNsb3NlID09PSAnbWFudWFsJzsgfVxufVxuXG5jb25zdCBERUZBVUxUX0FMSUFTRVMgPSB7XG4gICdob3Zlcic6IFsnbW91c2VlbnRlcicsICdtb3VzZWxlYXZlJ10sXG4gICdmb2N1cyc6IFsnZm9jdXNpbicsICdmb2N1c291dCddLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVHJpZ2dlcnModHJpZ2dlcnM6IHN0cmluZywgYWxpYXNlcyA9IERFRkFVTFRfQUxJQVNFUyk6IFRyaWdnZXJbXSB7XG4gIGNvbnN0IHRyaW1tZWRUcmlnZ2VycyA9ICh0cmlnZ2VycyB8fCAnJykudHJpbSgpO1xuXG4gIGlmICh0cmltbWVkVHJpZ2dlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3QgcGFyc2VkVHJpZ2dlcnMgPSB0cmltbWVkVHJpZ2dlcnMuc3BsaXQoL1xccysvKS5tYXAodHJpZ2dlciA9PiB0cmlnZ2VyLnNwbGl0KCc6JykpLm1hcCgodHJpZ2dlclBhaXIpID0+IHtcbiAgICBsZXQgYWxpYXMgPSBhbGlhc2VzW3RyaWdnZXJQYWlyWzBdXSB8fCB0cmlnZ2VyUGFpcjtcbiAgICByZXR1cm4gbmV3IFRyaWdnZXIoYWxpYXNbMF0sIGFsaWFzWzFdKTtcbiAgfSk7XG5cbiAgY29uc3QgbWFudWFsVHJpZ2dlcnMgPSBwYXJzZWRUcmlnZ2Vycy5maWx0ZXIodHJpZ2dlclBhaXIgPT4gdHJpZ2dlclBhaXIuaXNNYW51YWwoKSk7XG5cbiAgaWYgKG1hbnVhbFRyaWdnZXJzLmxlbmd0aCA+IDEpIHtcbiAgICB0aHJvdyAnVHJpZ2dlcnMgcGFyc2UgZXJyb3I6IG9ubHkgb25lIG1hbnVhbCB0cmlnZ2VyIGlzIGFsbG93ZWQnO1xuICB9XG5cbiAgaWYgKG1hbnVhbFRyaWdnZXJzLmxlbmd0aCA9PT0gMSAmJiBwYXJzZWRUcmlnZ2Vycy5sZW5ndGggPiAxKSB7XG4gICAgdGhyb3cgJ1RyaWdnZXJzIHBhcnNlIGVycm9yOiBtYW51YWwgdHJpZ2dlciBjYW5cXCd0IGJlIG1peGVkIHdpdGggb3RoZXIgdHJpZ2dlcnMnO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlZFRyaWdnZXJzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZVRyaWdnZXJzKHJlbmRlcmVyOiBhbnksIG5hdGl2ZUVsZW1lbnQ6IGFueSwgdHJpZ2dlcnM6IFRyaWdnZXJbXSwgaXNPcGVuZWRGbjogKCkgPT4gYm9vbGVhbikge1xuICByZXR1cm4gbmV3IE9ic2VydmFibGU8Ym9vbGVhbj4oc3Vic2NyaWJlciA9PiB7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gW107XG4gICAgY29uc3Qgb3BlbkZuID0gKCkgPT4gc3Vic2NyaWJlci5uZXh0KHRydWUpO1xuICAgIGNvbnN0IGNsb3NlRm4gPSAoKSA9PiBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgIGNvbnN0IHRvZ2dsZUZuID0gKCkgPT4gc3Vic2NyaWJlci5uZXh0KCFpc09wZW5lZEZuKCkpO1xuXG4gICAgdHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlcjogVHJpZ2dlcikgPT4ge1xuICAgICAgaWYgKHRyaWdnZXIub3BlbiA9PT0gdHJpZ2dlci5jbG9zZSkge1xuICAgICAgICBsaXN0ZW5lcnMucHVzaChyZW5kZXJlci5saXN0ZW4obmF0aXZlRWxlbWVudCwgdHJpZ2dlci5vcGVuLCB0b2dnbGVGbikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICByZW5kZXJlci5saXN0ZW4obmF0aXZlRWxlbWVudCwgdHJpZ2dlci5vcGVuLCBvcGVuRm4pLFxuICAgICAgICAgICAgcmVuZGVyZXIubGlzdGVuKG5hdGl2ZUVsZW1lbnQsIHRyaWdnZXIuY2xvc2UsIGNsb3NlRm4pKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiAoKSA9PiB7IGxpc3RlbmVycy5mb3JFYWNoKHVuc3Vic2NyaWJlRm4gPT4gdW5zdWJzY3JpYmVGbigpKTsgfTtcbiAgfSk7XG59XG5cbmNvbnN0IGRlbGF5T3JOb29wID0gPFQ+KHRpbWU6IG51bWJlcikgPT4gdGltZSA+IDAgPyBkZWxheTxUPih0aW1lKSA6IChhOiBPYnNlcnZhYmxlPFQ+KSA9PiBhO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJpZ2dlckRlbGF5KG9wZW5EZWxheTogbnVtYmVyLCBjbG9zZURlbGF5OiBudW1iZXIsIGlzT3BlbmVkRm46ICgpID0+IGJvb2xlYW4pIHtcbiAgcmV0dXJuIChpbnB1dCQ6IE9ic2VydmFibGU8Ym9vbGVhbj4pID0+IHtcbiAgICBsZXQgcGVuZGluZyA9IG51bGw7XG4gICAgY29uc3QgZmlsdGVyZWRJbnB1dCQgPSBpbnB1dCQucGlwZShcbiAgICAgICAgbWFwKG9wZW4gPT4gKHtvcGVufSkpLCBmaWx0ZXIoZXZlbnQgPT4ge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRseU9wZW4gPSBpc09wZW5lZEZuKCk7XG4gICAgICAgICAgaWYgKGN1cnJlbnRseU9wZW4gIT09IGV2ZW50Lm9wZW4gJiYgKCFwZW5kaW5nIHx8IHBlbmRpbmcub3BlbiA9PT0gY3VycmVudGx5T3BlbikpIHtcbiAgICAgICAgICAgIHBlbmRpbmcgPSBldmVudDtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocGVuZGluZyAmJiBwZW5kaW5nLm9wZW4gIT09IGV2ZW50Lm9wZW4pIHtcbiAgICAgICAgICAgIHBlbmRpbmcgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pLFxuICAgICAgICBzaGFyZSgpKTtcbiAgICBjb25zdCBkZWxheWVkT3BlbiQgPSBmaWx0ZXJlZElucHV0JC5waXBlKGZpbHRlcihldmVudCA9PiBldmVudC5vcGVuKSwgZGVsYXlPck5vb3Aob3BlbkRlbGF5KSk7XG4gICAgY29uc3QgZGVsYXllZENsb3NlJCA9IGZpbHRlcmVkSW5wdXQkLnBpcGUoZmlsdGVyKGV2ZW50ID0+ICFldmVudC5vcGVuKSwgZGVsYXlPck5vb3AoY2xvc2VEZWxheSkpO1xuICAgIHJldHVybiBtZXJnZShkZWxheWVkT3BlbiQsIGRlbGF5ZWRDbG9zZSQpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50ID09PSBwZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgcGVuZGluZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50Lm9wZW4gIT09IGlzT3BlbmVkRm4oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1hcChldmVudCA9PiBldmVudC5vcGVuKSk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW5Ub1RyaWdnZXJzKFxuICAgIHJlbmRlcmVyOiBhbnksIG5hdGl2ZUVsZW1lbnQ6IGFueSwgdHJpZ2dlcnM6IHN0cmluZywgaXNPcGVuZWRGbjogKCkgPT4gYm9vbGVhbiwgb3BlbkZuLCBjbG9zZUZuLCBvcGVuRGVsYXkgPSAwLFxuICAgIGNsb3NlRGVsYXkgPSAwKSB7XG4gIGNvbnN0IHBhcnNlZFRyaWdnZXJzID0gcGFyc2VUcmlnZ2Vycyh0cmlnZ2Vycyk7XG5cbiAgaWYgKHBhcnNlZFRyaWdnZXJzLmxlbmd0aCA9PT0gMSAmJiBwYXJzZWRUcmlnZ2Vyc1swXS5pc01hbnVhbCgpKSB7XG4gICAgcmV0dXJuICgpID0+IHt9O1xuICB9XG5cbiAgY29uc3Qgc3Vic2NyaXB0aW9uID0gb2JzZXJ2ZVRyaWdnZXJzKHJlbmRlcmVyLCBuYXRpdmVFbGVtZW50LCBwYXJzZWRUcmlnZ2VycywgaXNPcGVuZWRGbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHRyaWdnZXJEZWxheShvcGVuRGVsYXksIGNsb3NlRGVsYXksIGlzT3BlbmVkRm4pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShvcGVuID0+IChvcGVuID8gb3BlbkZuKCkgOiBjbG9zZUZuKCkpKTtcblxuICByZXR1cm4gKCkgPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG59XG4iXX0=