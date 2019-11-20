/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModuleRef, NgZone, isDevMode, ɵConsole as Console } from '@angular/core';
import { BehaviorSubject, EMPTY, Subject, of } from 'rxjs';
import { catchError, filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { standardizeConfig, validateConfig } from './config';
import { createRouterState } from './create_router_state';
import { createUrlTree } from './create_url_tree';
import { GuardsCheckEnd, GuardsCheckStart, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, RoutesRecognized } from './events';
import { activateRoutes } from './operators/activate_routes';
import { applyRedirects } from './operators/apply_redirects';
import { checkGuards } from './operators/check_guards';
import { recognize } from './operators/recognize';
import { resolveData } from './operators/resolve_data';
import { switchTap } from './operators/switch_tap';
import { DefaultRouteReuseStrategy } from './route_reuse_strategy';
import { RouterConfigLoader } from './router_config_loader';
import { createEmptyState } from './router_state';
import { isNavigationCancelingError, navigationCancelingError } from './shared';
import { DefaultUrlHandlingStrategy } from './url_handling_strategy';
import { containsTree, createEmptyUrlTree } from './url_tree';
import { getAllRouteGuards } from './utils/preactivation';
import { isUrlTree } from './utils/type_guards';
/**
 * \@description
 *
 * Represents the extra options used during navigation.
 *
 * \@publicApi
 * @record
 */
export function NavigationExtras() { }
if (false) {
    /**
     * Enables relative navigation from the current ActivatedRoute.
     *
     * Configuration:
     *
     * ```
     * [{
     *   path: 'parent',
     *   component: ParentComponent,
     *   children: [{
     *     path: 'list',
     *     component: ListComponent
     *   },{
     *     path: 'child',
     *     component: ChildComponent
     *   }]
     * }]
     * ```
     *
     * Navigate to list route from child route:
     *
     * ```
     * \@Component({...})
     *  class ChildComponent {
     *    constructor(private router: Router, private route: ActivatedRoute) {}
     *
     *    go() {
     *      this.router.navigate(['../list'], { relativeTo: this.route });
     *    }
     *  }
     * ```
     * @type {?|undefined}
     */
    NavigationExtras.prototype.relativeTo;
    /**
     * Sets query parameters to the URL.
     *
     * ```
     * // Navigate to /results?page=1
     * this.router.navigate(['/results'], { queryParams: { page: 1 } });
     * ```
     * @type {?|undefined}
     */
    NavigationExtras.prototype.queryParams;
    /**
     * Sets the hash fragment for the URL.
     *
     * ```
     * // Navigate to /results#top
     * this.router.navigate(['/results'], { fragment: 'top' });
     * ```
     * @type {?|undefined}
     */
    NavigationExtras.prototype.fragment;
    /**
     * Preserves the query parameters for the next navigation.
     *
     * deprecated, use `queryParamsHandling` instead
     *
     * ```
     * // Preserve query params from /results?page=1 to /view?page=1
     * this.router.navigate(['/view'], { preserveQueryParams: true });
     * ```
     *
     * @deprecated since v4
     * @type {?|undefined}
     */
    NavigationExtras.prototype.preserveQueryParams;
    /**
     *  config strategy to handle the query parameters for the next navigation.
     *
     * ```
     * // from /results?page=1 to /view?page=1&page=2
     * this.router.navigate(['/view'], { queryParams: { page: 2 },  queryParamsHandling: "merge" });
     * ```
     * @type {?|undefined}
     */
    NavigationExtras.prototype.queryParamsHandling;
    /**
     * Preserves the fragment for the next navigation
     *
     * ```
     * // Preserve fragment from /results#top to /view#top
     * this.router.navigate(['/view'], { preserveFragment: true });
     * ```
     * @type {?|undefined}
     */
    NavigationExtras.prototype.preserveFragment;
    /**
     * Navigates without pushing a new state into history.
     *
     * ```
     * // Navigate silently to /view
     * this.router.navigate(['/view'], { skipLocationChange: true });
     * ```
     * @type {?|undefined}
     */
    NavigationExtras.prototype.skipLocationChange;
    /**
     * Navigates while replacing the current state in history.
     *
     * ```
     * // Navigate to /view
     * this.router.navigate(['/view'], { replaceUrl: true });
     * ```
     * @type {?|undefined}
     */
    NavigationExtras.prototype.replaceUrl;
    /**
     * State passed to any navigation. This value will be accessible through the `extras` object
     * returned from `router.getCurrentNavigation()` while a navigation is executing. Once a
     * navigation completes, this value will be written to `history.state` when the `location.go`
     * or `location.replaceState` method is called before activating of this route. Note that
     * `history.state` will not pass an object equality test because the `navigationId` will be
     * added to the state before being written.
     *
     * While `history.state` can accept any type of value, because the router adds the `navigationId`
     * on each navigation, the `state` must always be an object.
     * @type {?|undefined}
     */
    NavigationExtras.prototype.state;
}
/**
 * @param {?} error
 * @return {?}
 */
function defaultErrorHandler(error) {
    throw error;
}
/**
 * @param {?} error
 * @param {?} urlSerializer
 * @param {?} url
 * @return {?}
 */
function defaultMalformedUriErrorHandler(error, urlSerializer, url) {
    return urlSerializer.parse('/');
}
/**
 * \@internal
 * @param {?} snapshot
 * @param {?} runExtras
 * @return {?}
 */
function defaultRouterHook(snapshot, runExtras) {
    return (/** @type {?} */ (of(null)));
}
/**
 * \@description
 *
 * Provides the navigation and url manipulation capabilities.
 *
 * See `Routes` for more details and examples.
 *
 * \@ngModule RouterModule
 *
 * \@publicApi
 */
export class Router {
    /**
     * Creates the router service.
     * @param {?} rootComponentType
     * @param {?} urlSerializer
     * @param {?} rootContexts
     * @param {?} location
     * @param {?} injector
     * @param {?} loader
     * @param {?} compiler
     * @param {?} config
     */
    // TODO: vsavkin make internal after the final is out.
    constructor(rootComponentType, urlSerializer, rootContexts, location, injector, loader, compiler, config) {
        this.rootComponentType = rootComponentType;
        this.urlSerializer = urlSerializer;
        this.rootContexts = rootContexts;
        this.location = location;
        this.config = config;
        this.lastSuccessfulNavigation = null;
        this.currentNavigation = null;
        this.navigationId = 0;
        this.isNgZoneEnabled = false;
        this.events = new Subject();
        /**
         * Error handler that is invoked when a navigation errors.
         *
         * See `ErrorHandler` for more information.
         */
        this.errorHandler = defaultErrorHandler;
        /**
         * Malformed uri error handler is invoked when `Router.parseUrl(url)` throws an
         * error due to containing an invalid character. The most common case would be a `%` sign
         * that's not encoded and is not part of a percent encoded sequence.
         */
        this.malformedUriErrorHandler = defaultMalformedUriErrorHandler;
        /**
         * Indicates if at least one navigation happened.
         */
        this.navigated = false;
        this.lastSuccessfulId = -1;
        /**
         * Used by RouterModule. This allows us to
         * pause the navigation either before preactivation or after it.
         * \@internal
         */
        this.hooks = {
            beforePreactivation: defaultRouterHook,
            afterPreactivation: defaultRouterHook
        };
        /**
         * Extracts and merges URLs. Used for AngularJS to Angular migrations.
         */
        this.urlHandlingStrategy = new DefaultUrlHandlingStrategy();
        this.routeReuseStrategy = new DefaultRouteReuseStrategy();
        /**
         * Define what the router should do if it receives a navigation request to the current URL.
         * By default, the router will ignore this navigation. However, this prevents features such
         * as a "refresh" button. Use this option to configure the behavior when navigating to the
         * current URL. Default is 'ignore'.
         */
        this.onSameUrlNavigation = 'ignore';
        /**
         * Defines how the router merges params, data and resolved data from parent to child
         * routes. Available options are:
         *
         * - `'emptyOnly'`, the default, only inherits parent params for path-less or component-less
         *   routes.
         * - `'always'`, enables unconditional inheritance of parent params.
         */
        this.paramsInheritanceStrategy = 'emptyOnly';
        /**
         * Defines when the router updates the browser URL. The default behavior is to update after
         * successful navigation. However, some applications may prefer a mode where the URL gets
         * updated at the beginning of navigation. The most common use case would be updating the
         * URL early so if navigation fails, you can show an error message with the URL that failed.
         * Available options are:
         *
         * - `'deferred'`, the default, updates the browser URL after navigation has finished.
         * - `'eager'`, updates browser URL at the beginning of navigation.
         */
        this.urlUpdateStrategy = 'deferred';
        /**
         * See {\@link RouterModule} for more information.
         */
        this.relativeLinkResolution = 'legacy';
        /** @type {?} */
        const onLoadStart = (r) => this.triggerEvent(new RouteConfigLoadStart(r));
        /** @type {?} */
        const onLoadEnd = (r) => this.triggerEvent(new RouteConfigLoadEnd(r));
        this.ngModule = injector.get(NgModuleRef);
        this.console = injector.get(Console);
        /** @type {?} */
        const ngZone = injector.get(NgZone);
        this.isNgZoneEnabled = ngZone instanceof NgZone;
        this.resetConfig(config);
        this.currentUrlTree = createEmptyUrlTree();
        this.rawUrlTree = this.currentUrlTree;
        this.browserUrlTree = this.currentUrlTree;
        this.configLoader = new RouterConfigLoader(loader, compiler, onLoadStart, onLoadEnd);
        this.routerState = createEmptyState(this.currentUrlTree, this.rootComponentType);
        this.transitions = new BehaviorSubject({
            id: 0,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.currentUrlTree,
            extractedUrl: this.urlHandlingStrategy.extract(this.currentUrlTree),
            urlAfterRedirects: this.urlHandlingStrategy.extract(this.currentUrlTree),
            rawUrl: this.currentUrlTree,
            extras: {},
            resolve: null,
            reject: null,
            promise: Promise.resolve(true),
            source: 'imperative',
            restoredState: null,
            currentSnapshot: this.routerState.snapshot,
            targetSnapshot: null,
            currentRouterState: this.routerState,
            targetRouterState: null,
            guards: { canActivateChecks: [], canDeactivateChecks: [] },
            guardsResult: null,
        });
        this.navigations = this.setupNavigations(this.transitions);
        this.processNavigations();
    }
    /**
     * @private
     * @param {?} transitions
     * @return {?}
     */
    setupNavigations(transitions) {
        /** @type {?} */
        const eventsSubject = ((/** @type {?} */ (this.events)));
        return (/** @type {?} */ ((/** @type {?} */ (transitions.pipe(filter(t => t.id !== 0), 
        // Extract URL
        map(t => ((/** @type {?} */ (Object.assign({}, t, { extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl) }))))), 
        // Store the Navigation object
        tap(t => {
            this.currentNavigation = {
                id: t.id,
                initialUrl: t.currentRawUrl,
                extractedUrl: t.extractedUrl,
                trigger: t.source,
                extras: t.extras,
                previousNavigation: this.lastSuccessfulNavigation ? Object.assign({}, this.lastSuccessfulNavigation, { previousNavigation: null }) :
                    null
            };
        }), 
        // Using switchMap so we cancel executing navigations when a new one comes in
        switchMap(t => {
            /** @type {?} */
            let completed = false;
            /** @type {?} */
            let errored = false;
            return of(t).pipe(switchMap(t => {
                /** @type {?} */
                const urlTransition = !this.navigated || t.extractedUrl.toString() !== this.browserUrlTree.toString();
                /** @type {?} */
                const processCurrentUrl = (this.onSameUrlNavigation === 'reload' ? true : urlTransition) &&
                    this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl);
                if (processCurrentUrl) {
                    return of(t).pipe(
                    // Fire NavigationStart event
                    switchMap(t => {
                        /** @type {?} */
                        const transition = this.transitions.getValue();
                        eventsSubject.next(new NavigationStart(t.id, this.serializeUrl(t.extractedUrl), t.source, t.restoredState));
                        if (transition !== this.transitions.getValue()) {
                            return EMPTY;
                        }
                        return [t];
                    }), 
                    // This delay is required to match old behavior that forced navigation to
                    // always be async
                    switchMap(t => Promise.resolve(t)), 
                    // ApplyRedirects
                    applyRedirects(this.ngModule.injector, this.configLoader, this.urlSerializer, this.config), 
                    // Update the currentNavigation
                    tap(t => {
                        this.currentNavigation = Object.assign({}, (/** @type {?} */ (this.currentNavigation)), { finalUrl: t.urlAfterRedirects });
                    }), 
                    // Recognize
                    recognize(this.rootComponentType, this.config, (url) => this.serializeUrl(url), this.paramsInheritanceStrategy, this.relativeLinkResolution), 
                    // Update URL if in `eager` update mode
                    tap(t => {
                        if (this.urlUpdateStrategy === 'eager') {
                            if (!t.extras.skipLocationChange) {
                                this.setBrowserUrl(t.urlAfterRedirects, !!t.extras.replaceUrl, t.id);
                            }
                            this.browserUrlTree = t.urlAfterRedirects;
                        }
                    }), 
                    // Fire RoutesRecognized
                    tap(t => {
                        /** @type {?} */
                        const routesRecognized = new RoutesRecognized(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), (/** @type {?} */ (t.targetSnapshot)));
                        eventsSubject.next(routesRecognized);
                    }));
                }
                else {
                    /** @type {?} */
                    const processPreviousUrl = urlTransition && this.rawUrlTree &&
                        this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree);
                    /* When the current URL shouldn't be processed, but the previous one was, we
                     * handle this "error condition" by navigating to the previously successful URL,
                     * but leaving the URL intact.*/
                    if (processPreviousUrl) {
                        const { id, extractedUrl, source, restoredState, extras } = t;
                        /** @type {?} */
                        const navStart = new NavigationStart(id, this.serializeUrl(extractedUrl), source, restoredState);
                        eventsSubject.next(navStart);
                        /** @type {?} */
                        const targetSnapshot = createEmptyState(extractedUrl, this.rootComponentType).snapshot;
                        return of(Object.assign({}, t, { targetSnapshot, urlAfterRedirects: extractedUrl, extras: Object.assign({}, extras, { skipLocationChange: false, replaceUrl: false }) }));
                    }
                    else {
                        /* When neither the current or previous URL can be processed, do nothing other
                         * than update router's internal reference to the current "settled" URL. This
                         * way the next navigation will be coming from the current URL in the browser.
                         */
                        this.rawUrlTree = t.rawUrl;
                        t.resolve(null);
                        return EMPTY;
                    }
                }
            }), 
            // Before Preactivation
            switchTap(t => {
                const { targetSnapshot, id: navigationId, extractedUrl: appliedUrlTree, rawUrl: rawUrlTree, extras: { skipLocationChange, replaceUrl } } = t;
                return this.hooks.beforePreactivation((/** @type {?} */ (targetSnapshot)), {
                    navigationId,
                    appliedUrlTree,
                    rawUrlTree,
                    skipLocationChange: !!skipLocationChange,
                    replaceUrl: !!replaceUrl,
                });
            }), 
            // --- GUARDS ---
            tap(t => {
                /** @type {?} */
                const guardsStart = new GuardsCheckStart(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), (/** @type {?} */ (t.targetSnapshot)));
                this.triggerEvent(guardsStart);
            }), map(t => (Object.assign({}, t, { guards: getAllRouteGuards((/** @type {?} */ (t.targetSnapshot)), t.currentSnapshot, this.rootContexts) }))), checkGuards(this.ngModule.injector, (evt) => this.triggerEvent(evt)), tap(t => {
                if (isUrlTree(t.guardsResult)) {
                    /** @type {?} */
                    const error = navigationCancelingError(`Redirecting to "${this.serializeUrl(t.guardsResult)}"`);
                    error.url = t.guardsResult;
                    throw error;
                }
            }), tap(t => {
                /** @type {?} */
                const guardsEnd = new GuardsCheckEnd(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), (/** @type {?} */ (t.targetSnapshot)), !!t.guardsResult);
                this.triggerEvent(guardsEnd);
            }), filter(t => {
                if (!t.guardsResult) {
                    this.resetUrlToCurrentUrlTree();
                    /** @type {?} */
                    const navCancel = new NavigationCancel(t.id, this.serializeUrl(t.extractedUrl), '');
                    eventsSubject.next(navCancel);
                    t.resolve(false);
                    return false;
                }
                return true;
            }), 
            // --- RESOLVE ---
            switchTap(t => {
                if (t.guards.canActivateChecks.length) {
                    return of(t).pipe(tap(t => {
                        /** @type {?} */
                        const resolveStart = new ResolveStart(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), (/** @type {?} */ (t.targetSnapshot)));
                        this.triggerEvent(resolveStart);
                    }), resolveData(this.paramsInheritanceStrategy, this.ngModule.injector), //
                    tap(t => {
                        /** @type {?} */
                        const resolveEnd = new ResolveEnd(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), (/** @type {?} */ (t.targetSnapshot)));
                        this.triggerEvent(resolveEnd);
                    }));
                }
                return undefined;
            }), 
            // --- AFTER PREACTIVATION ---
            switchTap((t) => {
                const { targetSnapshot, id: navigationId, extractedUrl: appliedUrlTree, rawUrl: rawUrlTree, extras: { skipLocationChange, replaceUrl } } = t;
                return this.hooks.afterPreactivation((/** @type {?} */ (targetSnapshot)), {
                    navigationId,
                    appliedUrlTree,
                    rawUrlTree,
                    skipLocationChange: !!skipLocationChange,
                    replaceUrl: !!replaceUrl,
                });
            }), map((t) => {
                /** @type {?} */
                const targetRouterState = createRouterState(this.routeReuseStrategy, (/** @type {?} */ (t.targetSnapshot)), t.currentRouterState);
                return (Object.assign({}, t, { targetRouterState }));
            }), 
            /* Once here, we are about to activate syncronously. The assumption is this will
               succeed, and user code may read from the Router service. Therefore before
               activation, we need to update router properties storing the current URL and the
               RouterState, as well as updated the browser URL. All this should happen *before*
               activating. */
            tap((t) => {
                this.currentUrlTree = t.urlAfterRedirects;
                this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, t.rawUrl);
                ((/** @type {?} */ (this))).routerState = (/** @type {?} */ (t.targetRouterState));
                if (this.urlUpdateStrategy === 'deferred') {
                    if (!t.extras.skipLocationChange) {
                        this.setBrowserUrl(this.rawUrlTree, !!t.extras.replaceUrl, t.id, t.extras.state);
                    }
                    this.browserUrlTree = t.urlAfterRedirects;
                }
            }), activateRoutes(this.rootContexts, this.routeReuseStrategy, (evt) => this.triggerEvent(evt)), tap({ /**
                 * @return {?}
                 */
                next() { completed = true; }, /**
                 * @return {?}
                 */
                complete() { completed = true; } }), finalize(() => {
                /* When the navigation stream finishes either through error or success, we set the
                 * `completed` or `errored` flag. However, there are some situations where we could
                 * get here without either of those being set. For instance, a redirect during
                 * NavigationStart. Therefore, this is a catch-all to make sure the NavigationCancel
                 * event is fired when a navigation gets cancelled but not caught by other means. */
                if (!completed && !errored) {
                    // Must reset to current URL tree here to ensure history.state is set. On a fresh
                    // page load, if a new navigation comes in before a successful navigation
                    // completes, there will be nothing in history.state.navigationId. This can cause
                    // sync problems with AngularJS sync code which looks for a value here in order
                    // to determine whether or not to handle a given popstate event or to leave it
                    // to the Angualr router.
                    this.resetUrlToCurrentUrlTree();
                    /** @type {?} */
                    const navCancel = new NavigationCancel(t.id, this.serializeUrl(t.extractedUrl), `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`);
                    eventsSubject.next(navCancel);
                    t.resolve(false);
                }
                // currentNavigation should always be reset to null here. If navigation was
                // successful, lastSuccessfulTransition will have already been set. Therefore we
                // can safely set currentNavigation to null here.
                this.currentNavigation = null;
            }), catchError((e) => {
                errored = true;
                /* This error type is issued during Redirect, and is handled as a cancellation
                 * rather than an error. */
                if (isNavigationCancelingError(e)) {
                    /** @type {?} */
                    const redirecting = isUrlTree(e.url);
                    if (!redirecting) {
                        // Set property only if we're not redirecting. If we landed on a page and
                        // redirect to `/` route, the new navigation is going to see the `/` isn't
                        // a change from the default currentUrlTree and won't navigate. This is
                        // only applicable with initial navigation, so setting `navigated` only when
                        // not redirecting resolves this scenario.
                        this.navigated = true;
                        this.resetStateAndUrl(t.currentRouterState, t.currentUrlTree, t.rawUrl);
                    }
                    /** @type {?} */
                    const navCancel = new NavigationCancel(t.id, this.serializeUrl(t.extractedUrl), e.message);
                    eventsSubject.next(navCancel);
                    t.resolve(false);
                    if (redirecting) {
                        this.navigateByUrl(e.url);
                    }
                    /* All other errors should reset to the router's internal URL reference to the
                     * pre-error state. */
                }
                else {
                    this.resetStateAndUrl(t.currentRouterState, t.currentUrlTree, t.rawUrl);
                    /** @type {?} */
                    const navError = new NavigationError(t.id, this.serializeUrl(t.extractedUrl), e);
                    eventsSubject.next(navError);
                    try {
                        t.resolve(this.errorHandler(e));
                    }
                    catch (ee) {
                        t.reject(ee);
                    }
                }
                return EMPTY;
            }));
            // TODO(jasonaden): remove cast once g3 is on updated TypeScript
        }))))));
    }
    /**
     * \@internal
     * TODO: this should be removed once the constructor of the router made internal
     * @param {?} rootComponentType
     * @return {?}
     */
    resetRootComponentType(rootComponentType) {
        this.rootComponentType = rootComponentType;
        // TODO: vsavkin router 4.0 should make the root component set to null
        // this will simplify the lifecycle of the router.
        this.routerState.root.component = this.rootComponentType;
    }
    /**
     * @private
     * @return {?}
     */
    getTransition() { return this.transitions.value; }
    /**
     * @private
     * @param {?} t
     * @return {?}
     */
    setTransition(t) {
        this.transitions.next(Object.assign({}, this.getTransition(), t));
    }
    /**
     * Sets up the location change listener and performs the initial navigation.
     * @return {?}
     */
    initialNavigation() {
        this.setUpLocationChangeListener();
        if (this.navigationId === 0) {
            this.navigateByUrl(this.location.path(true), { replaceUrl: true });
        }
    }
    /**
     * Sets up the location change listener.
     * @return {?}
     */
    setUpLocationChangeListener() {
        // Don't need to use Zone.wrap any more, because zone.js
        // already patch onPopState, so location change callback will
        // run into ngZone
        if (!this.locationSubscription) {
            this.locationSubscription = (/** @type {?} */ (this.location.subscribe((change) => {
                /** @type {?} */
                let rawUrlTree = this.parseUrl(change['url']);
                /** @type {?} */
                const source = change['type'] === 'popstate' ? 'popstate' : 'hashchange';
                // Navigations coming from Angular router have a navigationId state property. When this
                // exists, restore the state.
                /** @type {?} */
                const state = change.state && change.state.navigationId ? change.state : null;
                setTimeout(() => { this.scheduleNavigation(rawUrlTree, source, state, { replaceUrl: true }); }, 0);
            })));
        }
    }
    /**
     * The current url
     * @return {?}
     */
    get url() { return this.serializeUrl(this.currentUrlTree); }
    /**
     * The current Navigation object if one exists
     * @return {?}
     */
    getCurrentNavigation() { return this.currentNavigation; }
    /**
     * \@internal
     * @param {?} event
     * @return {?}
     */
    triggerEvent(event) { ((/** @type {?} */ (this.events))).next(event); }
    /**
     * Resets the configuration used for navigation and generating links.
     *
     * \@usageNotes
     *
     * ### Example
     *
     * ```
     * router.resetConfig([
     *  { path: 'team/:id', component: TeamCmp, children: [
     *    { path: 'simple', component: SimpleCmp },
     *    { path: 'user/:name', component: UserCmp }
     *  ]}
     * ]);
     * ```
     * @param {?} config
     * @return {?}
     */
    resetConfig(config) {
        validateConfig(config);
        this.config = config.map(standardizeConfig);
        this.navigated = false;
        this.lastSuccessfulId = -1;
    }
    /**
     * \@docsNotRequired
     * @return {?}
     */
    ngOnDestroy() { this.dispose(); }
    /**
     * Disposes of the router
     * @return {?}
     */
    dispose() {
        if (this.locationSubscription) {
            this.locationSubscription.unsubscribe();
            this.locationSubscription = (/** @type {?} */ (null));
        }
    }
    /**
     * Applies an array of commands to the current url tree and creates a new url tree.
     *
     * When given an activate route, applies the given commands starting from the route.
     * When not given a route, applies the given command starting from the root.
     *
     * \@usageNotes
     *
     * ### Example
     *
     * ```
     * // create /team/33/user/11
     * router.createUrlTree(['/team', 33, 'user', 11]);
     *
     * // create /team/33;expand=true/user/11
     * router.createUrlTree(['/team', 33, {expand: true}, 'user', 11]);
     *
     * // you can collapse static segments like this (this works only with the first passed-in value):
     * router.createUrlTree(['/team/33/user', userId]);
     *
     * // If the first segment can contain slashes, and you do not want the router to split it, you
     * // can do the following:
     *
     * router.createUrlTree([{segmentPath: '/one/two'}]);
     *
     * // create /team/33/(user/11//right:chat)
     * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: 'chat'}}]);
     *
     * // remove the right secondary node
     * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: null}}]);
     *
     * // assuming the current url is `/team/33/user/11` and the route points to `user/11`
     *
     * // navigate to /team/33/user/11/details
     * router.createUrlTree(['details'], {relativeTo: route});
     *
     * // navigate to /team/33/user/22
     * router.createUrlTree(['../22'], {relativeTo: route});
     *
     * // navigate to /team/44/user/22
     * router.createUrlTree(['../../team/44/user/22'], {relativeTo: route});
     * ```
     * @param {?} commands
     * @param {?=} navigationExtras
     * @return {?}
     */
    createUrlTree(commands, navigationExtras = {}) {
        const { relativeTo, queryParams, fragment, preserveQueryParams, queryParamsHandling, preserveFragment } = navigationExtras;
        if (isDevMode() && preserveQueryParams && (/** @type {?} */ (console)) && (/** @type {?} */ (console.warn))) {
            console.warn('preserveQueryParams is deprecated, use queryParamsHandling instead.');
        }
        /** @type {?} */
        const a = relativeTo || this.routerState.root;
        /** @type {?} */
        const f = preserveFragment ? this.currentUrlTree.fragment : fragment;
        /** @type {?} */
        let q = null;
        if (queryParamsHandling) {
            switch (queryParamsHandling) {
                case 'merge':
                    q = Object.assign({}, this.currentUrlTree.queryParams, queryParams);
                    break;
                case 'preserve':
                    q = this.currentUrlTree.queryParams;
                    break;
                default:
                    q = queryParams || null;
            }
        }
        else {
            q = preserveQueryParams ? this.currentUrlTree.queryParams : queryParams || null;
        }
        if (q !== null) {
            q = this.removeEmptyProps(q);
        }
        return createUrlTree(a, this.currentUrlTree, commands, (/** @type {?} */ (q)), (/** @type {?} */ (f)));
    }
    /**
     * Navigate based on the provided url. This navigation is always absolute.
     *
     * Returns a promise that:
     * - resolves to 'true' when navigation succeeds,
     * - resolves to 'false' when navigation fails,
     * - is rejected when an error happens.
     *
     * \@usageNotes
     *
     * ### Example
     *
     * ```
     * router.navigateByUrl("/team/33/user/11");
     *
     * // Navigate without updating the URL
     * router.navigateByUrl("/team/33/user/11", { skipLocationChange: true });
     * ```
     *
     * Since `navigateByUrl()` takes an absolute URL as the first parameter,
     * it will not apply any delta to the current URL and ignores any properties
     * in the second parameter (the `NavigationExtras`) that would change the
     * provided URL.
     * @param {?} url
     * @param {?=} extras
     * @return {?}
     */
    navigateByUrl(url, extras = { skipLocationChange: false }) {
        if (isDevMode() && this.isNgZoneEnabled && !NgZone.isInAngularZone()) {
            this.console.warn(`Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?`);
        }
        /** @type {?} */
        const urlTree = isUrlTree(url) ? url : this.parseUrl(url);
        /** @type {?} */
        const mergedTree = this.urlHandlingStrategy.merge(urlTree, this.rawUrlTree);
        return this.scheduleNavigation(mergedTree, 'imperative', null, extras);
    }
    /**
     * Navigate based on the provided array of commands and a starting point.
     * If no starting route is provided, the navigation is absolute.
     *
     * Returns a promise that:
     * - resolves to 'true' when navigation succeeds,
     * - resolves to 'false' when navigation fails,
     * - is rejected when an error happens.
     *
     * \@usageNotes
     *
     * ### Example
     *
     * ```
     * router.navigate(['team', 33, 'user', 11], {relativeTo: route});
     *
     * // Navigate without updating the URL
     * router.navigate(['team', 33, 'user', 11], {relativeTo: route, skipLocationChange: true});
     * ```
     *
     * The first parameter of `navigate()` is a delta to be applied to the current URL
     * or the one provided in the `relativeTo` property of the second parameter (the
     * `NavigationExtras`).
     *
     * In order to affect this browser's `history.state` entry, the `state`
     * parameter can be passed. This must be an object because the router
     * will add the `navigationId` property to this object before creating
     * the new history item.
     * @param {?} commands
     * @param {?=} extras
     * @return {?}
     */
    navigate(commands, extras = { skipLocationChange: false }) {
        validateCommands(commands);
        return this.navigateByUrl(this.createUrlTree(commands, extras), extras);
    }
    /**
     * Serializes a `UrlTree` into a string
     * @param {?} url
     * @return {?}
     */
    serializeUrl(url) { return this.urlSerializer.serialize(url); }
    /**
     * Parses a string into a `UrlTree`
     * @param {?} url
     * @return {?}
     */
    parseUrl(url) {
        /** @type {?} */
        let urlTree;
        try {
            urlTree = this.urlSerializer.parse(url);
        }
        catch (e) {
            urlTree = this.malformedUriErrorHandler(e, this.urlSerializer, url);
        }
        return urlTree;
    }
    /**
     * Returns whether the url is activated
     * @param {?} url
     * @param {?} exact
     * @return {?}
     */
    isActive(url, exact) {
        if (isUrlTree(url)) {
            return containsTree(this.currentUrlTree, url, exact);
        }
        /** @type {?} */
        const urlTree = this.parseUrl(url);
        return containsTree(this.currentUrlTree, urlTree, exact);
    }
    /**
     * @private
     * @param {?} params
     * @return {?}
     */
    removeEmptyProps(params) {
        return Object.keys(params).reduce((result, key) => {
            /** @type {?} */
            const value = params[key];
            if (value !== null && value !== undefined) {
                result[key] = value;
            }
            return result;
        }, {});
    }
    /**
     * @private
     * @return {?}
     */
    processNavigations() {
        this.navigations.subscribe(t => {
            this.navigated = true;
            this.lastSuccessfulId = t.id;
            ((/** @type {?} */ (this.events)))
                .next(new NavigationEnd(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(this.currentUrlTree)));
            this.lastSuccessfulNavigation = this.currentNavigation;
            this.currentNavigation = null;
            t.resolve(true);
        }, e => { this.console.warn(`Unhandled Navigation Error: `); });
    }
    /**
     * @private
     * @param {?} rawUrl
     * @param {?} source
     * @param {?} restoredState
     * @param {?} extras
     * @return {?}
     */
    scheduleNavigation(rawUrl, source, restoredState, extras) {
        /** @type {?} */
        const lastNavigation = this.getTransition();
        // If the user triggers a navigation imperatively (e.g., by using navigateByUrl),
        // and that navigation results in 'replaceState' that leads to the same URL,
        // we should skip those.
        if (lastNavigation && source !== 'imperative' && lastNavigation.source === 'imperative' &&
            lastNavigation.rawUrl.toString() === rawUrl.toString()) {
            return Promise.resolve(true); // return value is not used
        }
        // Because of a bug in IE and Edge, the location class fires two events (popstate and
        // hashchange) every single time. The second one should be ignored. Otherwise, the URL will
        // flicker. Handles the case when a popstate was emitted first.
        if (lastNavigation && source == 'hashchange' && lastNavigation.source === 'popstate' &&
            lastNavigation.rawUrl.toString() === rawUrl.toString()) {
            return Promise.resolve(true); // return value is not used
        }
        // Because of a bug in IE and Edge, the location class fires two events (popstate and
        // hashchange) every single time. The second one should be ignored. Otherwise, the URL will
        // flicker. Handles the case when a hashchange was emitted first.
        if (lastNavigation && source == 'popstate' && lastNavigation.source === 'hashchange' &&
            lastNavigation.rawUrl.toString() === rawUrl.toString()) {
            return Promise.resolve(true); // return value is not used
        }
        /** @type {?} */
        let resolve = null;
        /** @type {?} */
        let reject = null;
        /** @type {?} */
        const promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        /** @type {?} */
        const id = ++this.navigationId;
        this.setTransition({
            id,
            source,
            restoredState,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.rawUrlTree, rawUrl, extras, resolve, reject, promise,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState
        });
        // Make sure that the error is propagated even though `processNavigations` catch
        // handler does not rethrow
        return promise.catch((e) => { return Promise.reject(e); });
    }
    /**
     * @private
     * @param {?} url
     * @param {?} replaceUrl
     * @param {?} id
     * @param {?=} state
     * @return {?}
     */
    setBrowserUrl(url, replaceUrl, id, state) {
        /** @type {?} */
        const path = this.urlSerializer.serialize(url);
        state = state || {};
        if (this.location.isCurrentPathEqualTo(path) || replaceUrl) {
            // TODO(jasonaden): Remove first `navigationId` and rely on `ng` namespace.
            this.location.replaceState(path, '', Object.assign({}, state, { navigationId: id }));
        }
        else {
            this.location.go(path, '', Object.assign({}, state, { navigationId: id }));
        }
    }
    /**
     * @private
     * @param {?} storedState
     * @param {?} storedUrl
     * @param {?} rawUrl
     * @return {?}
     */
    resetStateAndUrl(storedState, storedUrl, rawUrl) {
        ((/** @type {?} */ (this))).routerState = storedState;
        this.currentUrlTree = storedUrl;
        this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, rawUrl);
        this.resetUrlToCurrentUrlTree();
    }
    /**
     * @private
     * @return {?}
     */
    resetUrlToCurrentUrlTree() {
        this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), '', { navigationId: this.lastSuccessfulId });
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    Router.prototype.currentUrlTree;
    /**
     * @type {?}
     * @private
     */
    Router.prototype.rawUrlTree;
    /**
     * @type {?}
     * @private
     */
    Router.prototype.browserUrlTree;
    /**
     * @type {?}
     * @private
     */
    Router.prototype.transitions;
    /**
     * @type {?}
     * @private
     */
    Router.prototype.navigations;
    /**
     * @type {?}
     * @private
     */
    Router.prototype.lastSuccessfulNavigation;
    /**
     * @type {?}
     * @private
     */
    Router.prototype.currentNavigation;
    /**
     * @type {?}
     * @private
     */
    Router.prototype.locationSubscription;
    /**
     * @type {?}
     * @private
     */
    Router.prototype.navigationId;
    /**
     * @type {?}
     * @private
     */
    Router.prototype.configLoader;
    /**
     * @type {?}
     * @private
     */
    Router.prototype.ngModule;
    /**
     * @type {?}
     * @private
     */
    Router.prototype.console;
    /**
     * @type {?}
     * @private
     */
    Router.prototype.isNgZoneEnabled;
    /** @type {?} */
    Router.prototype.events;
    /** @type {?} */
    Router.prototype.routerState;
    /**
     * Error handler that is invoked when a navigation errors.
     *
     * See `ErrorHandler` for more information.
     * @type {?}
     */
    Router.prototype.errorHandler;
    /**
     * Malformed uri error handler is invoked when `Router.parseUrl(url)` throws an
     * error due to containing an invalid character. The most common case would be a `%` sign
     * that's not encoded and is not part of a percent encoded sequence.
     * @type {?}
     */
    Router.prototype.malformedUriErrorHandler;
    /**
     * Indicates if at least one navigation happened.
     * @type {?}
     */
    Router.prototype.navigated;
    /**
     * @type {?}
     * @private
     */
    Router.prototype.lastSuccessfulId;
    /**
     * Used by RouterModule. This allows us to
     * pause the navigation either before preactivation or after it.
     * \@internal
     * @type {?}
     */
    Router.prototype.hooks;
    /**
     * Extracts and merges URLs. Used for AngularJS to Angular migrations.
     * @type {?}
     */
    Router.prototype.urlHandlingStrategy;
    /** @type {?} */
    Router.prototype.routeReuseStrategy;
    /**
     * Define what the router should do if it receives a navigation request to the current URL.
     * By default, the router will ignore this navigation. However, this prevents features such
     * as a "refresh" button. Use this option to configure the behavior when navigating to the
     * current URL. Default is 'ignore'.
     * @type {?}
     */
    Router.prototype.onSameUrlNavigation;
    /**
     * Defines how the router merges params, data and resolved data from parent to child
     * routes. Available options are:
     *
     * - `'emptyOnly'`, the default, only inherits parent params for path-less or component-less
     *   routes.
     * - `'always'`, enables unconditional inheritance of parent params.
     * @type {?}
     */
    Router.prototype.paramsInheritanceStrategy;
    /**
     * Defines when the router updates the browser URL. The default behavior is to update after
     * successful navigation. However, some applications may prefer a mode where the URL gets
     * updated at the beginning of navigation. The most common use case would be updating the
     * URL early so if navigation fails, you can show an error message with the URL that failed.
     * Available options are:
     *
     * - `'deferred'`, the default, updates the browser URL after navigation has finished.
     * - `'eager'`, updates browser URL at the beginning of navigation.
     * @type {?}
     */
    Router.prototype.urlUpdateStrategy;
    /**
     * See {\@link RouterModule} for more information.
     * @type {?}
     */
    Router.prototype.relativeLinkResolution;
    /**
     * @type {?}
     * @private
     */
    Router.prototype.rootComponentType;
    /**
     * @type {?}
     * @private
     */
    Router.prototype.urlSerializer;
    /**
     * @type {?}
     * @private
     */
    Router.prototype.rootContexts;
    /**
     * @type {?}
     * @private
     */
    Router.prototype.location;
    /** @type {?} */
    Router.prototype.config;
}
/**
 * @param {?} commands
 * @return {?}
 */
function validateCommands(commands) {
    for (let i = 0; i < commands.length; i++) {
        /** @type {?} */
        const cmd = commands[i];
        if (cmd == null) {
            throw new Error(`The requested path contains ${cmd} segment at index ${i}`);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3NyYy9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFTQSxPQUFPLEVBQTRDLFdBQVcsRUFBRSxNQUFNLEVBQVEsU0FBUyxFQUFFLFFBQVEsSUFBSSxPQUFPLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkksT0FBTyxFQUFDLGVBQWUsRUFBRSxLQUFLLEVBQWMsT0FBTyxFQUF1QixFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0YsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFakYsT0FBTyxFQUFxQyxpQkFBaUIsRUFBRSxjQUFjLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDL0YsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2hELE9BQU8sRUFBUSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQXFCLFVBQVUsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDN08sT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2hELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDakQsT0FBTyxFQUFDLHlCQUF5QixFQUFxQixNQUFNLHdCQUF3QixDQUFDO0FBQ3JGLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRTFELE9BQU8sRUFBbUQsZ0JBQWdCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRyxPQUFPLEVBQVMsMEJBQTBCLEVBQUUsd0JBQXdCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDdEYsT0FBTyxFQUFDLDBCQUEwQixFQUFzQixNQUFNLHlCQUF5QixDQUFDO0FBQ3hGLE9BQU8sRUFBeUIsWUFBWSxFQUFFLGtCQUFrQixFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ3BGLE9BQU8sRUFBUyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7Ozs7O0FBVzlDLHNDQXFIQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFwRkMsc0NBQWlDOzs7Ozs7Ozs7O0lBVWpDLHVDQUEwQjs7Ozs7Ozs7OztJQVUxQixvQ0FBa0I7Ozs7Ozs7Ozs7Ozs7O0lBY2xCLCtDQUE4Qjs7Ozs7Ozs7OztJQVU5QiwrQ0FBK0M7Ozs7Ozs7Ozs7SUFTL0MsNENBQTJCOzs7Ozs7Ozs7O0lBUzNCLDhDQUE2Qjs7Ozs7Ozs7OztJQVM3QixzQ0FBcUI7Ozs7Ozs7Ozs7Ozs7SUFZckIsaUNBQTJCOzs7Ozs7QUFnQjdCLFNBQVMsbUJBQW1CLENBQUMsS0FBVTtJQUNyQyxNQUFNLEtBQUssQ0FBQztBQUNkLENBQUM7Ozs7Ozs7QUFFRCxTQUFTLCtCQUErQixDQUNwQyxLQUFlLEVBQUUsYUFBNEIsRUFBRSxHQUFXO0lBQzVELE9BQU8sYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsQyxDQUFDOzs7Ozs7O0FBd0ZELFNBQVMsaUJBQWlCLENBQUMsUUFBNkIsRUFBRSxTQU16RDtJQUNDLE9BQU8sbUJBQUEsRUFBRSxDQUFFLElBQUksQ0FBQyxFQUFPLENBQUM7QUFDMUIsQ0FBQzs7Ozs7Ozs7Ozs7O0FBYUQsTUFBTSxPQUFPLE1BQU07Ozs7Ozs7Ozs7Ozs7SUFrR2pCLFlBQ1ksaUJBQWlDLEVBQVUsYUFBNEIsRUFDdkUsWUFBb0MsRUFBVSxRQUFrQixFQUFFLFFBQWtCLEVBQzVGLE1BQTZCLEVBQUUsUUFBa0IsRUFBUyxNQUFjO1FBRmhFLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUN2RSxpQkFBWSxHQUFaLFlBQVksQ0FBd0I7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2QsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQS9GcEUsNkJBQXdCLEdBQW9CLElBQUksQ0FBQztRQUNqRCxzQkFBaUIsR0FBb0IsSUFBSSxDQUFDO1FBSTFDLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBSXpCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBRXpCLFdBQU0sR0FBc0IsSUFBSSxPQUFPLEVBQVMsQ0FBQzs7Ozs7O1FBUWpFLGlCQUFZLEdBQWlCLG1CQUFtQixDQUFDOzs7Ozs7UUFPakQsNkJBQXdCLEdBRU8sK0JBQStCLENBQUM7Ozs7UUFLL0QsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUNuQixxQkFBZ0IsR0FBVyxDQUFDLENBQUMsQ0FBQzs7Ozs7O1FBT3RDLFVBQUssR0FBc0U7WUFDekUsbUJBQW1CLEVBQUUsaUJBQWlCO1lBQ3RDLGtCQUFrQixFQUFFLGlCQUFpQjtTQUN0QyxDQUFDOzs7O1FBS0Ysd0JBQW1CLEdBQXdCLElBQUksMEJBQTBCLEVBQUUsQ0FBQztRQUU1RSx1QkFBa0IsR0FBdUIsSUFBSSx5QkFBeUIsRUFBRSxDQUFDOzs7Ozs7O1FBUXpFLHdCQUFtQixHQUFzQixRQUFRLENBQUM7Ozs7Ozs7OztRQVVsRCw4QkFBeUIsR0FBeUIsV0FBVyxDQUFDOzs7Ozs7Ozs7OztRQVk5RCxzQkFBaUIsR0FBdUIsVUFBVSxDQUFDOzs7O1FBS25ELDJCQUFzQixHQUF5QixRQUFRLENBQUM7O2NBVWhELFdBQVcsR0FBRyxDQUFDLENBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDOztjQUMxRSxTQUFTLEdBQUcsQ0FBQyxDQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU1RSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztjQUMvQixNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLFlBQVksTUFBTSxDQUFDO1FBRWhELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxrQkFBa0IsRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUN0QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFFMUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3JGLElBQUksQ0FBQyxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUVqRixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksZUFBZSxDQUF1QjtZQUMzRCxFQUFFLEVBQUUsQ0FBQztZQUNMLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNuQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDbEMsWUFBWSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUNuRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDeEUsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQzNCLE1BQU0sRUFBRSxFQUFFO1lBQ1YsT0FBTyxFQUFFLElBQUk7WUFDYixNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUM5QixNQUFNLEVBQUUsWUFBWTtZQUNwQixhQUFhLEVBQUUsSUFBSTtZQUNuQixlQUFlLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRO1lBQzFDLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGtCQUFrQixFQUFFLElBQUksQ0FBQyxXQUFXO1lBQ3BDLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsTUFBTSxFQUFFLEVBQUMsaUJBQWlCLEVBQUUsRUFBRSxFQUFFLG1CQUFtQixFQUFFLEVBQUUsRUFBQztZQUN4RCxZQUFZLEVBQUUsSUFBSTtTQUNuQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFM0QsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQzs7Ozs7O0lBRU8sZ0JBQWdCLENBQUMsV0FBNkM7O2NBRTlELGFBQWEsR0FBRyxDQUFDLG1CQUFBLElBQUksQ0FBQyxNQUFNLEVBQWtCLENBQUM7UUFDckQsT0FBTyxtQkFBQSxtQkFBQSxXQUFXLENBQUMsSUFBSSxDQUNuQixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV2QixjQUFjO1FBQ2QsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxxQ0FDRCxDQUFDLElBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUN2QyxDQUFDLENBQUM7UUFFL0IsOEJBQThCO1FBQzlCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNOLElBQUksQ0FBQyxpQkFBaUIsR0FBRztnQkFDdkIsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUNSLFVBQVUsRUFBRSxDQUFDLENBQUMsYUFBYTtnQkFDM0IsWUFBWSxFQUFFLENBQUMsQ0FBQyxZQUFZO2dCQUM1QixPQUFPLEVBQUUsQ0FBQyxDQUFDLE1BQU07Z0JBQ2pCLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTTtnQkFDaEIsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsbUJBQzNDLElBQUksQ0FBQyx3QkFBd0IsSUFBRSxrQkFBa0IsRUFBRSxJQUFJLElBQUUsQ0FBQztvQkFDOUQsSUFBSTthQUNULENBQUM7UUFDSixDQUFDLENBQUM7UUFFRiw2RUFBNkU7UUFDN0UsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFOztnQkFDUixTQUFTLEdBQUcsS0FBSzs7Z0JBQ2pCLE9BQU8sR0FBRyxLQUFLO1lBQ25CLE9BQU8sRUFBRSxDQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDZCxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7O3NCQUNOLGFBQWEsR0FDZixDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRTs7c0JBQzdFLGlCQUFpQixHQUNuQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO29CQUM5RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFFdkQsSUFBSSxpQkFBaUIsRUFBRTtvQkFDckIsT0FBTyxFQUFFLENBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSTtvQkFDZCw2QkFBNkI7b0JBQzdCLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTs7OEJBQ04sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO3dCQUM5QyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksZUFBZSxDQUNsQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7d0JBQ3pFLElBQUksVUFBVSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUU7NEJBQzlDLE9BQU8sS0FBSyxDQUFDO3lCQUNkO3dCQUNELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDYixDQUFDLENBQUM7b0JBRUYseUVBQXlFO29CQUN6RSxrQkFBa0I7b0JBQ2xCLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRWxDLGlCQUFpQjtvQkFDakIsY0FBYyxDQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFDN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFFaEIsK0JBQStCO29CQUMvQixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQ04sSUFBSSxDQUFDLGlCQUFpQixxQkFDakIsbUJBQUEsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQzNCLFFBQVEsRUFBRSxDQUFDLENBQUMsaUJBQWlCLEdBQzlCLENBQUM7b0JBQ0osQ0FBQyxDQUFDO29CQUVGLFlBQVk7b0JBQ1osU0FBUyxDQUNMLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNwRSxJQUFJLENBQUMseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDO29CQUVoRSx1Q0FBdUM7b0JBQ3ZDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTt3QkFDTixJQUFJLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxPQUFPLEVBQUU7NEJBQ3RDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFO2dDQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzZCQUN0RTs0QkFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQzt5QkFDM0M7b0JBQ0gsQ0FBQyxDQUFDO29CQUVGLHdCQUF3QjtvQkFDeEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFOzs4QkFDQSxnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixDQUN6QyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLG1CQUFBLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDL0QsYUFBYSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUN2QyxDQUFDLENBQUMsQ0FBRyxDQUFDO2lCQUNYO3FCQUFNOzswQkFDQyxrQkFBa0IsR0FBRyxhQUFhLElBQUksSUFBSSxDQUFDLFVBQVU7d0JBQ3ZELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO29CQUM5RDs7b0RBRWdDO29CQUNoQyxJQUFJLGtCQUFrQixFQUFFOzhCQUNoQixFQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUMsR0FBRyxDQUFDOzs4QkFDckQsUUFBUSxHQUFHLElBQUksZUFBZSxDQUNoQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDO3dCQUMvRCxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs4QkFDdkIsY0FBYyxHQUNoQixnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsUUFBUTt3QkFFbkUsT0FBTyxFQUFFLG1CQUNKLENBQUMsSUFDSixjQUFjLEVBQ2QsaUJBQWlCLEVBQUUsWUFBWSxFQUMvQixNQUFNLG9CQUFNLE1BQU0sSUFBRSxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssT0FDaEUsQ0FBQztxQkFDSjt5QkFBTTt3QkFDTDs7OzJCQUdHO3dCQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQzt3QkFDM0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDaEIsT0FBTyxLQUFLLENBQUM7cUJBQ2Q7aUJBQ0Y7WUFDSCxDQUFDLENBQUM7WUFFRix1QkFBdUI7WUFDdkIsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO3NCQUNOLEVBQ0osY0FBYyxFQUNkLEVBQUUsRUFBRSxZQUFZLEVBQ2hCLFlBQVksRUFBRSxjQUFjLEVBQzVCLE1BQU0sRUFBRSxVQUFVLEVBQ2xCLE1BQU0sRUFBRSxFQUFDLGtCQUFrQixFQUFFLFVBQVUsRUFBQyxFQUN6QyxHQUFHLENBQUM7Z0JBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLG1CQUFBLGNBQWMsRUFBRSxFQUFFO29CQUN0RCxZQUFZO29CQUNaLGNBQWM7b0JBQ2QsVUFBVTtvQkFDVixrQkFBa0IsRUFBRSxDQUFDLENBQUMsa0JBQWtCO29CQUN4QyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFVBQVU7aUJBQ3pCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQztZQUVGLGlCQUFpQjtZQUNqQixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7O3NCQUNBLFdBQVcsR0FBRyxJQUFJLGdCQUFnQixDQUNwQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEVBQy9FLG1CQUFBLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUMsRUFFRixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxtQkFDQSxDQUFDLElBQ0osTUFBTSxFQUNGLGlCQUFpQixDQUFDLG1CQUFBLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFDL0UsQ0FBQyxFQUVQLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUMzRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ04sSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFOzswQkFDdkIsS0FBSyxHQUEwQix3QkFBd0IsQ0FDekQsbUJBQW1CLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7b0JBQzVELEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQztvQkFDM0IsTUFBTSxLQUFLLENBQUM7aUJBQ2I7WUFDSCxDQUFDLENBQUMsRUFFRixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7O3NCQUNBLFNBQVMsR0FBRyxJQUFJLGNBQWMsQ0FDaEMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUMvRSxtQkFBQSxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDLEVBRUYsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNULElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFO29CQUNuQixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQzs7MEJBQzFCLFNBQVMsR0FDWCxJQUFJLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUNyRSxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM5QixDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNqQixPQUFPLEtBQUssQ0FBQztpQkFDZDtnQkFDRCxPQUFPLElBQUksQ0FBQztZQUNkLENBQUMsQ0FBQztZQUVGLGtCQUFrQjtZQUNsQixTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRTtvQkFDckMsT0FBTyxFQUFFLENBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNkLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTs7OEJBQ0EsWUFBWSxHQUFHLElBQUksWUFBWSxDQUNqQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLG1CQUFBLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDL0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDbEMsQ0FBQyxDQUFDLEVBQ0YsV0FBVyxDQUNQLElBQUksQ0FBQyx5QkFBeUIsRUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRyxFQUFFO29CQUNoQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7OzhCQUNBLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FDN0IsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsRUFBRSxtQkFBQSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7d0JBQy9ELElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ2hDLENBQUMsQ0FBQyxDQUFHLENBQUM7aUJBQ1g7Z0JBQ0QsT0FBTyxTQUFTLENBQUM7WUFDbkIsQ0FBQyxDQUFDO1lBRUYsOEJBQThCO1lBQzlCLFNBQVMsQ0FBQyxDQUFDLENBQXVCLEVBQUUsRUFBRTtzQkFDOUIsRUFDSixjQUFjLEVBQ2QsRUFBRSxFQUFFLFlBQVksRUFDaEIsWUFBWSxFQUFFLGNBQWMsRUFDNUIsTUFBTSxFQUFFLFVBQVUsRUFDbEIsTUFBTSxFQUFFLEVBQUMsa0JBQWtCLEVBQUUsVUFBVSxFQUFDLEVBQ3pDLEdBQUcsQ0FBQztnQkFDTCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsbUJBQUEsY0FBYyxFQUFFLEVBQUU7b0JBQ3JELFlBQVk7b0JBQ1osY0FBYztvQkFDZCxVQUFVO29CQUNWLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxrQkFBa0I7b0JBQ3hDLFVBQVUsRUFBRSxDQUFDLENBQUMsVUFBVTtpQkFDekIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLEVBRUYsR0FBRyxDQUFDLENBQUMsQ0FBdUIsRUFBRSxFQUFFOztzQkFDeEIsaUJBQWlCLEdBQUcsaUJBQWlCLENBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxtQkFBQSxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO2dCQUN0RSxPQUFPLG1CQUFLLENBQUMsSUFBRSxpQkFBaUIsSUFBRSxDQUFDO1lBQ3JDLENBQUMsQ0FBQztZQUVGOzs7OzZCQUlpQjtZQUNqQixHQUFHLENBQUMsQ0FBQyxDQUF1QixFQUFFLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO2dCQUMxQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRWhGLENBQUMsbUJBQUEsSUFBSSxFQUE2QixDQUFDLENBQUMsV0FBVyxHQUFHLG1CQUFBLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUV4RSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxVQUFVLEVBQUU7b0JBQ3pDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFO3dCQUNoQyxJQUFJLENBQUMsYUFBYSxDQUNkLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDbkU7b0JBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsaUJBQWlCLENBQUM7aUJBQzNDO1lBQ0gsQ0FBQyxDQUFDLEVBRUYsY0FBYyxDQUNWLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUMxQyxDQUFDLEdBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUUzQyxHQUFHLENBQUM7OztnQkFBQyxJQUFJLEtBQUssU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7OztnQkFBRSxRQUFRLEtBQUssU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQ3JFLFFBQVEsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1o7Ozs7b0dBSW9GO2dCQUNwRixJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUMxQixpRkFBaUY7b0JBQ2pGLHlFQUF5RTtvQkFDekUsaUZBQWlGO29CQUNqRiwrRUFBK0U7b0JBQy9FLDhFQUE4RTtvQkFDOUUseUJBQXlCO29CQUN6QixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQzs7MEJBQzFCLFNBQVMsR0FBRyxJQUFJLGdCQUFnQixDQUNsQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUN2QyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsOENBQThDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDM0YsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDOUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbEI7Z0JBQ0QsMkVBQTJFO2dCQUMzRSxnRkFBZ0Y7Z0JBQ2hGLGlEQUFpRDtnQkFDakQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztZQUNoQyxDQUFDLENBQUMsRUFDRixVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDZixPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNmOzJDQUMyQjtnQkFDM0IsSUFBSSwwQkFBMEIsQ0FBQyxDQUFDLENBQUMsRUFBRTs7MEJBQzNCLFdBQVcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztvQkFDcEMsSUFBSSxDQUFDLFdBQVcsRUFBRTt3QkFDaEIseUVBQXlFO3dCQUN6RSwwRUFBMEU7d0JBQzFFLHVFQUF1RTt3QkFDdkUsNEVBQTRFO3dCQUM1RSwwQ0FBMEM7d0JBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO3dCQUN0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUN6RTs7MEJBQ0ssU0FBUyxHQUNYLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO29CQUM1RSxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM5QixDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUVqQixJQUFJLFdBQVcsRUFBRTt3QkFDZixJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDM0I7b0JBRUQ7MENBQ3NCO2lCQUN2QjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzswQkFDbEUsUUFBUSxHQUFHLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNoRixhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM3QixJQUFJO3dCQUNGLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNqQztvQkFBQyxPQUFPLEVBQUUsRUFBRTt3QkFDWCxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUNkO2lCQUNGO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUcsQ0FBQztZQUNWLGdFQUFnRTtRQUNsRSxDQUFDLENBQUMsQ0FBQyxFQUFPLEVBQW9DLENBQUM7SUFDckQsQ0FBQzs7Ozs7OztJQU1ELHNCQUFzQixDQUFDLGlCQUE0QjtRQUNqRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0Msc0VBQXNFO1FBQ3RFLGtEQUFrRDtRQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQzNELENBQUM7Ozs7O0lBRU8sYUFBYSxLQUEyQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBRXhFLGFBQWEsQ0FBQyxDQUFnQztRQUNwRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksbUJBQUssSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFLLENBQUMsRUFBRSxDQUFDO0lBQ3pELENBQUM7Ozs7O0lBS0QsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDbkMsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7U0FDbEU7SUFDSCxDQUFDOzs7OztJQUtELDJCQUEyQjtRQUN6Qix3REFBd0Q7UUFDeEQsNkRBQTZEO1FBQzdELGtCQUFrQjtRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzlCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxtQkFBSyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFOztvQkFDbkUsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDOztzQkFDdkMsTUFBTSxHQUFzQixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFlBQVk7Ozs7c0JBR3JGLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUM3RSxVQUFVLENBQ04sR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUYsQ0FBQyxDQUFDLEVBQUEsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Ozs7SUFHRCxJQUFJLEdBQUcsS0FBYSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFHcEUsb0JBQW9CLEtBQXNCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBRzFFLFlBQVksQ0FBQyxLQUFZLElBQVUsQ0FBQyxtQkFBQSxJQUFJLENBQUMsTUFBTSxFQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWtCakYsV0FBVyxDQUFDLE1BQWM7UUFDeEIsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7OztJQUdELFdBQVcsS0FBVyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7OztJQUd2QyxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDN0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxtQkFBQSxJQUFJLEVBQUUsQ0FBQztTQUNwQztJQUNILENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNkNELGFBQWEsQ0FBQyxRQUFlLEVBQUUsbUJBQXFDLEVBQUU7Y0FDOUQsRUFBQyxVQUFVLEVBQVcsV0FBVyxFQUFVLFFBQVEsRUFDbEQsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUMsR0FBRyxnQkFBZ0I7UUFDckYsSUFBSSxTQUFTLEVBQUUsSUFBSSxtQkFBbUIsSUFBSSxtQkFBSyxPQUFPLEVBQUEsSUFBSSxtQkFBSyxPQUFPLENBQUMsSUFBSSxFQUFBLEVBQUU7WUFDM0UsT0FBTyxDQUFDLElBQUksQ0FBQyxxRUFBcUUsQ0FBQyxDQUFDO1NBQ3JGOztjQUNLLENBQUMsR0FBRyxVQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJOztjQUN2QyxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFROztZQUNoRSxDQUFDLEdBQWdCLElBQUk7UUFDekIsSUFBSSxtQkFBbUIsRUFBRTtZQUN2QixRQUFRLG1CQUFtQixFQUFFO2dCQUMzQixLQUFLLE9BQU87b0JBQ1YsQ0FBQyxxQkFBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBSyxXQUFXLENBQUMsQ0FBQztvQkFDekQsTUFBTTtnQkFDUixLQUFLLFVBQVU7b0JBQ2IsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDO29CQUNwQyxNQUFNO2dCQUNSO29CQUNFLENBQUMsR0FBRyxXQUFXLElBQUksSUFBSSxDQUFDO2FBQzNCO1NBQ0Y7YUFBTTtZQUNMLENBQUMsR0FBRyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUM7U0FDakY7UUFDRCxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDZCxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLG1CQUFBLENBQUMsRUFBRSxFQUFFLG1CQUFBLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTBCRCxhQUFhLENBQUMsR0FBbUIsRUFBRSxTQUEyQixFQUFDLGtCQUFrQixFQUFFLEtBQUssRUFBQztRQUV2RixJQUFJLFNBQVMsRUFBRSxJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLEVBQUU7WUFDcEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ2IsbUZBQW1GLENBQUMsQ0FBQztTQUMxRjs7Y0FFSyxPQUFPLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDOztjQUNuRCxVQUFVLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUUzRSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6RSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUErQkQsUUFBUSxDQUFDLFFBQWUsRUFBRSxTQUEyQixFQUFDLGtCQUFrQixFQUFFLEtBQUssRUFBQztRQUU5RSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7Ozs7O0lBR0QsWUFBWSxDQUFDLEdBQVksSUFBWSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBR2hGLFFBQVEsQ0FBQyxHQUFXOztZQUNkLE9BQWdCO1FBQ3BCLElBQUk7WUFDRixPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDekM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDckU7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs7Ozs7O0lBR0QsUUFBUSxDQUFDLEdBQW1CLEVBQUUsS0FBYztRQUMxQyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNsQixPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN0RDs7Y0FFSyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDbEMsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7Ozs7O0lBRU8sZ0JBQWdCLENBQUMsTUFBYztRQUNyQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBYyxFQUFFLEdBQVcsRUFBRSxFQUFFOztrQkFDMUQsS0FBSyxHQUFRLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDOUIsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQ3pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7YUFDckI7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDOzs7OztJQUVPLGtCQUFrQjtRQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FDdEIsQ0FBQyxDQUFDLEVBQUU7WUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM3QixDQUFDLG1CQUFBLElBQUksQ0FBQyxNQUFNLEVBQWtCLENBQUM7aUJBQzFCLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FDbkIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUYsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUN2RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQzlCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsQ0FBQyxFQUNELENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7Ozs7Ozs7OztJQUVPLGtCQUFrQixDQUN0QixNQUFlLEVBQUUsTUFBeUIsRUFBRSxhQUFpQyxFQUM3RSxNQUF3Qjs7Y0FDcEIsY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDM0MsaUZBQWlGO1FBQ2pGLDRFQUE0RTtRQUM1RSx3QkFBd0I7UUFDeEIsSUFBSSxjQUFjLElBQUksTUFBTSxLQUFLLFlBQVksSUFBSSxjQUFjLENBQUMsTUFBTSxLQUFLLFlBQVk7WUFDbkYsY0FBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDMUQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUUsMkJBQTJCO1NBQzNEO1FBRUQscUZBQXFGO1FBQ3JGLDJGQUEyRjtRQUMzRiwrREFBK0Q7UUFDL0QsSUFBSSxjQUFjLElBQUksTUFBTSxJQUFJLFlBQVksSUFBSSxjQUFjLENBQUMsTUFBTSxLQUFLLFVBQVU7WUFDaEYsY0FBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDMUQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUUsMkJBQTJCO1NBQzNEO1FBQ0QscUZBQXFGO1FBQ3JGLDJGQUEyRjtRQUMzRixpRUFBaUU7UUFDakUsSUFBSSxjQUFjLElBQUksTUFBTSxJQUFJLFVBQVUsSUFBSSxjQUFjLENBQUMsTUFBTSxLQUFLLFlBQVk7WUFDaEYsY0FBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDMUQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUUsMkJBQTJCO1NBQzNEOztZQUVHLE9BQU8sR0FBUSxJQUFJOztZQUNuQixNQUFNLEdBQVEsSUFBSTs7Y0FFaEIsT0FBTyxHQUFHLElBQUksT0FBTyxDQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2hELE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDZCxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2YsQ0FBQyxDQUFDOztjQUVJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxZQUFZO1FBQzlCLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDakIsRUFBRTtZQUNGLE1BQU07WUFDTixhQUFhO1lBQ2IsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQ25DLGFBQWEsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPO1lBQ3hFLGVBQWUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVE7WUFDMUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDckMsQ0FBQyxDQUFDO1FBRUgsZ0ZBQWdGO1FBQ2hGLDJCQUEyQjtRQUMzQixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7Ozs7Ozs7OztJQUVPLGFBQWEsQ0FDakIsR0FBWSxFQUFFLFVBQW1CLEVBQUUsRUFBVSxFQUFFLEtBQTRCOztjQUN2RSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQzlDLEtBQUssR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3BCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLEVBQUU7WUFDMUQsMkVBQTJFO1lBQzNFLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLG9CQUFNLEtBQUssSUFBRSxZQUFZLEVBQUUsRUFBRSxJQUFFLENBQUM7U0FDcEU7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLG9CQUFNLEtBQUssSUFBRSxZQUFZLEVBQUUsRUFBRSxJQUFFLENBQUM7U0FDMUQ7SUFDSCxDQUFDOzs7Ozs7OztJQUVPLGdCQUFnQixDQUFDLFdBQXdCLEVBQUUsU0FBa0IsRUFBRSxNQUFlO1FBQ3BGLENBQUMsbUJBQUEsSUFBSSxFQUE2QixDQUFDLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUM5RCxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVPLHdCQUF3QjtRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7Q0FDRjs7Ozs7O0lBcHpCQyxnQ0FBZ0M7Ozs7O0lBQ2hDLDRCQUE0Qjs7Ozs7SUFDNUIsZ0NBQWdDOzs7OztJQUNoQyw2QkFBb0U7Ozs7O0lBQ3BFLDZCQUFzRDs7Ozs7SUFDdEQsMENBQXlEOzs7OztJQUN6RCxtQ0FBa0Q7Ozs7O0lBR2xELHNDQUE2Qzs7Ozs7SUFDN0MsOEJBQWlDOzs7OztJQUNqQyw4QkFBeUM7Ozs7O0lBQ3pDLDBCQUFtQzs7Ozs7SUFDbkMseUJBQXlCOzs7OztJQUN6QixpQ0FBeUM7O0lBRXpDLHdCQUFpRTs7SUFDakUsNkJBQXlDOzs7Ozs7O0lBT3pDLDhCQUFpRDs7Ozs7OztJQU9qRCwwQ0FFK0Q7Ozs7O0lBSy9ELDJCQUEyQjs7Ozs7SUFDM0Isa0NBQXNDOzs7Ozs7O0lBT3RDLHVCQUdFOzs7OztJQUtGLHFDQUE0RTs7SUFFNUUsb0NBQXlFOzs7Ozs7OztJQVF6RSxxQ0FBa0Q7Ozs7Ozs7Ozs7SUFVbEQsMkNBQThEOzs7Ozs7Ozs7Ozs7SUFZOUQsbUNBQW1EOzs7OztJQUtuRCx3Q0FBd0Q7Ozs7O0lBT3BELG1DQUF5Qzs7Ozs7SUFBRSwrQkFBb0M7Ozs7O0lBQy9FLDhCQUE0Qzs7Ozs7SUFBRSwwQkFBMEI7O0lBQ3JCLHdCQUFxQjs7Ozs7O0FBa3RCOUUsU0FBUyxnQkFBZ0IsQ0FBQyxRQUFrQjtJQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7Y0FDbEMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsR0FBRyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM3RTtLQUNGO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Q29tcGlsZXIsIEluamVjdG9yLCBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIE5nTW9kdWxlUmVmLCBOZ1pvbmUsIFR5cGUsIGlzRGV2TW9kZSwgybVDb25zb2xlIGFzIENvbnNvbGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIEVNUFRZLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIGRlZmVyLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBmaWx0ZXIsIGZpbmFsaXplLCBtYXAsIHN3aXRjaE1hcCwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7UXVlcnlQYXJhbXNIYW5kbGluZywgUm91dGUsIFJvdXRlcywgc3RhbmRhcmRpemVDb25maWcsIHZhbGlkYXRlQ29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge2NyZWF0ZVJvdXRlclN0YXRlfSBmcm9tICcuL2NyZWF0ZV9yb3V0ZXJfc3RhdGUnO1xuaW1wb3J0IHtjcmVhdGVVcmxUcmVlfSBmcm9tICcuL2NyZWF0ZV91cmxfdHJlZSc7XG5pbXBvcnQge0V2ZW50LCBHdWFyZHNDaGVja0VuZCwgR3VhcmRzQ2hlY2tTdGFydCwgTmF2aWdhdGlvbkNhbmNlbCwgTmF2aWdhdGlvbkVuZCwgTmF2aWdhdGlvbkVycm9yLCBOYXZpZ2F0aW9uU3RhcnQsIE5hdmlnYXRpb25UcmlnZ2VyLCBSZXNvbHZlRW5kLCBSZXNvbHZlU3RhcnQsIFJvdXRlQ29uZmlnTG9hZEVuZCwgUm91dGVDb25maWdMb2FkU3RhcnQsIFJvdXRlc1JlY29nbml6ZWR9IGZyb20gJy4vZXZlbnRzJztcbmltcG9ydCB7YWN0aXZhdGVSb3V0ZXN9IGZyb20gJy4vb3BlcmF0b3JzL2FjdGl2YXRlX3JvdXRlcyc7XG5pbXBvcnQge2FwcGx5UmVkaXJlY3RzfSBmcm9tICcuL29wZXJhdG9ycy9hcHBseV9yZWRpcmVjdHMnO1xuaW1wb3J0IHtjaGVja0d1YXJkc30gZnJvbSAnLi9vcGVyYXRvcnMvY2hlY2tfZ3VhcmRzJztcbmltcG9ydCB7cmVjb2duaXplfSBmcm9tICcuL29wZXJhdG9ycy9yZWNvZ25pemUnO1xuaW1wb3J0IHtyZXNvbHZlRGF0YX0gZnJvbSAnLi9vcGVyYXRvcnMvcmVzb2x2ZV9kYXRhJztcbmltcG9ydCB7c3dpdGNoVGFwfSBmcm9tICcuL29wZXJhdG9ycy9zd2l0Y2hfdGFwJztcbmltcG9ydCB7RGVmYXVsdFJvdXRlUmV1c2VTdHJhdGVneSwgUm91dGVSZXVzZVN0cmF0ZWd5fSBmcm9tICcuL3JvdXRlX3JldXNlX3N0cmF0ZWd5JztcbmltcG9ydCB7Um91dGVyQ29uZmlnTG9hZGVyfSBmcm9tICcuL3JvdXRlcl9jb25maWdfbG9hZGVyJztcbmltcG9ydCB7Q2hpbGRyZW5PdXRsZXRDb250ZXh0c30gZnJvbSAnLi9yb3V0ZXJfb3V0bGV0X2NvbnRleHQnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyU3RhdGUsIFJvdXRlclN0YXRlU25hcHNob3QsIGNyZWF0ZUVtcHR5U3RhdGV9IGZyb20gJy4vcm91dGVyX3N0YXRlJztcbmltcG9ydCB7UGFyYW1zLCBpc05hdmlnYXRpb25DYW5jZWxpbmdFcnJvciwgbmF2aWdhdGlvbkNhbmNlbGluZ0Vycm9yfSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQge0RlZmF1bHRVcmxIYW5kbGluZ1N0cmF0ZWd5LCBVcmxIYW5kbGluZ1N0cmF0ZWd5fSBmcm9tICcuL3VybF9oYW5kbGluZ19zdHJhdGVneSc7XG5pbXBvcnQge1VybFNlcmlhbGl6ZXIsIFVybFRyZWUsIGNvbnRhaW5zVHJlZSwgY3JlYXRlRW1wdHlVcmxUcmVlfSBmcm9tICcuL3VybF90cmVlJztcbmltcG9ydCB7Q2hlY2tzLCBnZXRBbGxSb3V0ZUd1YXJkc30gZnJvbSAnLi91dGlscy9wcmVhY3RpdmF0aW9uJztcbmltcG9ydCB7aXNVcmxUcmVlfSBmcm9tICcuL3V0aWxzL3R5cGVfZ3VhcmRzJztcblxuXG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUmVwcmVzZW50cyB0aGUgZXh0cmEgb3B0aW9ucyB1c2VkIGR1cmluZyBuYXZpZ2F0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOYXZpZ2F0aW9uRXh0cmFzIHtcbiAgLyoqXG4gICAqIEVuYWJsZXMgcmVsYXRpdmUgbmF2aWdhdGlvbiBmcm9tIHRoZSBjdXJyZW50IEFjdGl2YXRlZFJvdXRlLlxuICAgKlxuICAgKiBDb25maWd1cmF0aW9uOlxuICAgKlxuICAgKiBgYGBcbiAgICogW3tcbiAgKiAgIHBhdGg6ICdwYXJlbnQnLFxuICAqICAgY29tcG9uZW50OiBQYXJlbnRDb21wb25lbnQsXG4gICogICBjaGlsZHJlbjogW3tcbiAgKiAgICAgcGF0aDogJ2xpc3QnLFxuICAqICAgICBjb21wb25lbnQ6IExpc3RDb21wb25lbnRcbiAgKiAgIH0se1xuICAqICAgICBwYXRoOiAnY2hpbGQnLFxuICAqICAgICBjb21wb25lbnQ6IENoaWxkQ29tcG9uZW50XG4gICogICB9XVxuICAqIH1dXG4gICAqIGBgYFxuICAgKlxuICAgKiBOYXZpZ2F0ZSB0byBsaXN0IHJvdXRlIGZyb20gY2hpbGQgcm91dGU6XG4gICAqXG4gICAqIGBgYFxuICAgKiAgQENvbXBvbmVudCh7Li4ufSlcbiAgICogIGNsYXNzIENoaWxkQ29tcG9uZW50IHtcbiAgKiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge31cbiAgKlxuICAqICAgIGdvKCkge1xuICAqICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLi9saXN0J10sIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KTtcbiAgKiAgICB9XG4gICogIH1cbiAgICogYGBgXG4gICAqL1xuICByZWxhdGl2ZVRvPzogQWN0aXZhdGVkUm91dGV8bnVsbDtcblxuICAvKipcbiAgICogU2V0cyBxdWVyeSBwYXJhbWV0ZXJzIHRvIHRoZSBVUkwuXG4gICAqXG4gICAqIGBgYFxuICAgKiAvLyBOYXZpZ2F0ZSB0byAvcmVzdWx0cz9wYWdlPTFcbiAgICogdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcmVzdWx0cyddLCB7IHF1ZXJ5UGFyYW1zOiB7IHBhZ2U6IDEgfSB9KTtcbiAgICogYGBgXG4gICAqL1xuICBxdWVyeVBhcmFtcz86IFBhcmFtc3xudWxsO1xuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBoYXNoIGZyYWdtZW50IGZvciB0aGUgVVJMLlxuICAgKlxuICAgKiBgYGBcbiAgICogLy8gTmF2aWdhdGUgdG8gL3Jlc3VsdHMjdG9wXG4gICAqIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3Jlc3VsdHMnXSwgeyBmcmFnbWVudDogJ3RvcCcgfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgZnJhZ21lbnQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFByZXNlcnZlcyB0aGUgcXVlcnkgcGFyYW1ldGVycyBmb3IgdGhlIG5leHQgbmF2aWdhdGlvbi5cbiAgICpcbiAgICogZGVwcmVjYXRlZCwgdXNlIGBxdWVyeVBhcmFtc0hhbmRsaW5nYCBpbnN0ZWFkXG4gICAqXG4gICAqIGBgYFxuICAgKiAvLyBQcmVzZXJ2ZSBxdWVyeSBwYXJhbXMgZnJvbSAvcmVzdWx0cz9wYWdlPTEgdG8gL3ZpZXc/cGFnZT0xXG4gICAqIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3ZpZXcnXSwgeyBwcmVzZXJ2ZVF1ZXJ5UGFyYW1zOiB0cnVlIH0pO1xuICAgKiBgYGBcbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjRcbiAgICovXG4gIHByZXNlcnZlUXVlcnlQYXJhbXM/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiAgY29uZmlnIHN0cmF0ZWd5IHRvIGhhbmRsZSB0aGUgcXVlcnkgcGFyYW1ldGVycyBmb3IgdGhlIG5leHQgbmF2aWdhdGlvbi5cbiAgICpcbiAgICogYGBgXG4gICAqIC8vIGZyb20gL3Jlc3VsdHM/cGFnZT0xIHRvIC92aWV3P3BhZ2U9MSZwYWdlPTJcbiAgICogdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvdmlldyddLCB7IHF1ZXJ5UGFyYW1zOiB7IHBhZ2U6IDIgfSwgIHF1ZXJ5UGFyYW1zSGFuZGxpbmc6IFwibWVyZ2VcIiB9KTtcbiAgICogYGBgXG4gICAqL1xuICBxdWVyeVBhcmFtc0hhbmRsaW5nPzogUXVlcnlQYXJhbXNIYW5kbGluZ3xudWxsO1xuICAvKipcbiAgICogUHJlc2VydmVzIHRoZSBmcmFnbWVudCBmb3IgdGhlIG5leHQgbmF2aWdhdGlvblxuICAgKlxuICAgKiBgYGBcbiAgICogLy8gUHJlc2VydmUgZnJhZ21lbnQgZnJvbSAvcmVzdWx0cyN0b3AgdG8gL3ZpZXcjdG9wXG4gICAqIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3ZpZXcnXSwgeyBwcmVzZXJ2ZUZyYWdtZW50OiB0cnVlIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIHByZXNlcnZlRnJhZ21lbnQ/OiBib29sZWFuO1xuICAvKipcbiAgICogTmF2aWdhdGVzIHdpdGhvdXQgcHVzaGluZyBhIG5ldyBzdGF0ZSBpbnRvIGhpc3RvcnkuXG4gICAqXG4gICAqIGBgYFxuICAgKiAvLyBOYXZpZ2F0ZSBzaWxlbnRseSB0byAvdmlld1xuICAgKiB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy92aWV3J10sIHsgc2tpcExvY2F0aW9uQ2hhbmdlOiB0cnVlIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIHNraXBMb2NhdGlvbkNoYW5nZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBOYXZpZ2F0ZXMgd2hpbGUgcmVwbGFjaW5nIHRoZSBjdXJyZW50IHN0YXRlIGluIGhpc3RvcnkuXG4gICAqXG4gICAqIGBgYFxuICAgKiAvLyBOYXZpZ2F0ZSB0byAvdmlld1xuICAgKiB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy92aWV3J10sIHsgcmVwbGFjZVVybDogdHJ1ZSB9KTtcbiAgICogYGBgXG4gICAqL1xuICByZXBsYWNlVXJsPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFN0YXRlIHBhc3NlZCB0byBhbnkgbmF2aWdhdGlvbi4gVGhpcyB2YWx1ZSB3aWxsIGJlIGFjY2Vzc2libGUgdGhyb3VnaCB0aGUgYGV4dHJhc2Agb2JqZWN0XG4gICAqIHJldHVybmVkIGZyb20gYHJvdXRlci5nZXRDdXJyZW50TmF2aWdhdGlvbigpYCB3aGlsZSBhIG5hdmlnYXRpb24gaXMgZXhlY3V0aW5nLiBPbmNlIGFcbiAgICogbmF2aWdhdGlvbiBjb21wbGV0ZXMsIHRoaXMgdmFsdWUgd2lsbCBiZSB3cml0dGVuIHRvIGBoaXN0b3J5LnN0YXRlYCB3aGVuIHRoZSBgbG9jYXRpb24uZ29gXG4gICAqIG9yIGBsb2NhdGlvbi5yZXBsYWNlU3RhdGVgIG1ldGhvZCBpcyBjYWxsZWQgYmVmb3JlIGFjdGl2YXRpbmcgb2YgdGhpcyByb3V0ZS4gTm90ZSB0aGF0XG4gICAqIGBoaXN0b3J5LnN0YXRlYCB3aWxsIG5vdCBwYXNzIGFuIG9iamVjdCBlcXVhbGl0eSB0ZXN0IGJlY2F1c2UgdGhlIGBuYXZpZ2F0aW9uSWRgIHdpbGwgYmVcbiAgICogYWRkZWQgdG8gdGhlIHN0YXRlIGJlZm9yZSBiZWluZyB3cml0dGVuLlxuICAgKlxuICAgKiBXaGlsZSBgaGlzdG9yeS5zdGF0ZWAgY2FuIGFjY2VwdCBhbnkgdHlwZSBvZiB2YWx1ZSwgYmVjYXVzZSB0aGUgcm91dGVyIGFkZHMgdGhlIGBuYXZpZ2F0aW9uSWRgXG4gICAqIG9uIGVhY2ggbmF2aWdhdGlvbiwgdGhlIGBzdGF0ZWAgbXVzdCBhbHdheXMgYmUgYW4gb2JqZWN0LlxuICAgKi9cbiAgc3RhdGU/OiB7W2s6IHN0cmluZ106IGFueX07XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogRXJyb3IgaGFuZGxlciB0aGF0IGlzIGludm9rZWQgd2hlbiBhIG5hdmlnYXRpb24gZXJyb3JzLlxuICpcbiAqIElmIHRoZSBoYW5kbGVyIHJldHVybnMgYSB2YWx1ZSwgdGhlIG5hdmlnYXRpb24gcHJvbWlzZSB3aWxsIGJlIHJlc29sdmVkIHdpdGggdGhpcyB2YWx1ZS5cbiAqIElmIHRoZSBoYW5kbGVyIHRocm93cyBhbiBleGNlcHRpb24sIHRoZSBuYXZpZ2F0aW9uIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZCB3aXRoXG4gKiB0aGUgZXhjZXB0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IHR5cGUgRXJyb3JIYW5kbGVyID0gKGVycm9yOiBhbnkpID0+IGFueTtcblxuZnVuY3Rpb24gZGVmYXVsdEVycm9ySGFuZGxlcihlcnJvcjogYW55KTogYW55IHtcbiAgdGhyb3cgZXJyb3I7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRNYWxmb3JtZWRVcmlFcnJvckhhbmRsZXIoXG4gICAgZXJyb3I6IFVSSUVycm9yLCB1cmxTZXJpYWxpemVyOiBVcmxTZXJpYWxpemVyLCB1cmw6IHN0cmluZyk6IFVybFRyZWUge1xuICByZXR1cm4gdXJsU2VyaWFsaXplci5wYXJzZSgnLycpO1xufVxuXG5leHBvcnQgdHlwZSBSZXN0b3JlZFN0YXRlID0ge1xuICBbazogc3RyaW5nXTogYW55OyBuYXZpZ2F0aW9uSWQ6IG51bWJlcjtcbn07XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogSW5mb3JtYXRpb24gYWJvdXQgYW55IGdpdmVuIG5hdmlnYXRpb24uIFRoaXMgaW5mb3JtYXRpb24gY2FuIGJlIGdvdHRlbiBmcm9tIHRoZSByb3V0ZXIgYXRcbiAqIGFueSB0aW1lIHVzaW5nIHRoZSBgcm91dGVyLmdldEN1cnJlbnROYXZpZ2F0aW9uKClgIG1ldGhvZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIE5hdmlnYXRpb24gPSB7XG4gIC8qKlxuICAgKiBUaGUgSUQgb2YgdGhlIGN1cnJlbnQgbmF2aWdhdGlvbi5cbiAgICovXG4gIGlkOiBudW1iZXI7XG4gIC8qKlxuICAgKiBUYXJnZXQgVVJMIHBhc3NlZCBpbnRvIHRoZSB7QGxpbmsgUm91dGVyI25hdmlnYXRlQnlVcmx9IGNhbGwgYmVmb3JlIG5hdmlnYXRpb24uIFRoaXMgaXNcbiAgICogdGhlIHZhbHVlIGJlZm9yZSB0aGUgcm91dGVyIGhhcyBwYXJzZWQgb3IgYXBwbGllZCByZWRpcmVjdHMgdG8gaXQuXG4gICAqL1xuICBpbml0aWFsVXJsOiBzdHJpbmcgfCBVcmxUcmVlO1xuICAvKipcbiAgICogVGhlIGluaXRpYWwgdGFyZ2V0IFVSTCBhZnRlciBiZWluZyBwYXJzZWQgd2l0aCB7QGxpbmsgVXJsU2VyaWFsaXplci5leHRyYWN0KCl9LlxuICAgKi9cbiAgZXh0cmFjdGVkVXJsOiBVcmxUcmVlO1xuICAvKipcbiAgICogRXh0cmFjdGVkIFVSTCBhZnRlciByZWRpcmVjdHMgaGF2ZSBiZWVuIGFwcGxpZWQuIFRoaXMgVVJMIG1heSBub3QgYmUgYXZhaWxhYmxlIGltbWVkaWF0ZWx5LFxuICAgKiB0aGVyZWZvcmUgdGhpcyBwcm9wZXJ0eSBjYW4gYmUgYHVuZGVmaW5lZGAuIEl0IGlzIGd1YXJhbnRlZWQgdG8gYmUgc2V0IGFmdGVyIHRoZVxuICAgKiB7QGxpbmsgUm91dGVzUmVjb2duaXplZH0gZXZlbnQgZmlyZXMuXG4gICAqL1xuICBmaW5hbFVybD86IFVybFRyZWU7XG4gIC8qKlxuICAgKiBJZGVudGlmaWVzIHRoZSB0cmlnZ2VyIG9mIHRoZSBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiAqICdpbXBlcmF0aXZlJy0tdHJpZ2dlcmVkIGJ5IGByb3V0ZXIubmF2aWdhdGVCeVVybGAgb3IgYHJvdXRlci5uYXZpZ2F0ZWAuXG4gICAqICogJ3BvcHN0YXRlJy0tdHJpZ2dlcmVkIGJ5IGEgcG9wc3RhdGUgZXZlbnRcbiAgICogKiAnaGFzaGNoYW5nZSctLXRyaWdnZXJlZCBieSBhIGhhc2hjaGFuZ2UgZXZlbnRcbiAgICovXG4gIHRyaWdnZXI6ICdpbXBlcmF0aXZlJyB8ICdwb3BzdGF0ZScgfCAnaGFzaGNoYW5nZSc7XG4gIC8qKlxuICAgKiBUaGUgTmF2aWdhdGlvbkV4dHJhcyB1c2VkIGluIHRoaXMgbmF2aWdhdGlvbi4gU2VlIHtAbGluayBOYXZpZ2F0aW9uRXh0cmFzfSBmb3IgbW9yZSBpbmZvLlxuICAgKi9cbiAgZXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzO1xuICAvKipcbiAgICogUHJldmlvdXNseSBzdWNjZXNzZnVsIE5hdmlnYXRpb24gb2JqZWN0LiBPbmx5IGEgc2luZ2xlIHByZXZpb3VzIE5hdmlnYXRpb24gaXMgYXZhaWxhYmxlLFxuICAgKiB0aGVyZWZvcmUgdGhpcyBwcmV2aW91cyBOYXZpZ2F0aW9uIHdpbGwgYWx3YXlzIGhhdmUgYSBgbnVsbGAgdmFsdWUgZm9yIGBwcmV2aW91c05hdmlnYXRpb25gLlxuICAgKi9cbiAgcHJldmlvdXNOYXZpZ2F0aW9uOiBOYXZpZ2F0aW9uIHwgbnVsbDtcbn07XG5cbmV4cG9ydCB0eXBlIE5hdmlnYXRpb25UcmFuc2l0aW9uID0ge1xuICBpZDogbnVtYmVyLFxuICBjdXJyZW50VXJsVHJlZTogVXJsVHJlZSxcbiAgY3VycmVudFJhd1VybDogVXJsVHJlZSxcbiAgZXh0cmFjdGVkVXJsOiBVcmxUcmVlLFxuICB1cmxBZnRlclJlZGlyZWN0czogVXJsVHJlZSxcbiAgcmF3VXJsOiBVcmxUcmVlLFxuICBleHRyYXM6IE5hdmlnYXRpb25FeHRyYXMsXG4gIHJlc29sdmU6IGFueSxcbiAgcmVqZWN0OiBhbnksXG4gIHByb21pc2U6IFByb21pc2U8Ym9vbGVhbj4sXG4gIHNvdXJjZTogTmF2aWdhdGlvblRyaWdnZXIsXG4gIHJlc3RvcmVkU3RhdGU6IFJlc3RvcmVkU3RhdGUgfCBudWxsLFxuICBjdXJyZW50U25hcHNob3Q6IFJvdXRlclN0YXRlU25hcHNob3QsXG4gIHRhcmdldFNuYXBzaG90OiBSb3V0ZXJTdGF0ZVNuYXBzaG90IHwgbnVsbCxcbiAgY3VycmVudFJvdXRlclN0YXRlOiBSb3V0ZXJTdGF0ZSxcbiAgdGFyZ2V0Um91dGVyU3RhdGU6IFJvdXRlclN0YXRlIHwgbnVsbCxcbiAgZ3VhcmRzOiBDaGVja3MsXG4gIGd1YXJkc1Jlc3VsdDogYm9vbGVhbiB8IFVybFRyZWUgfCBudWxsLFxufTtcblxuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IHR5cGUgUm91dGVySG9vayA9IChzbmFwc2hvdDogUm91dGVyU3RhdGVTbmFwc2hvdCwgcnVuRXh0cmFzOiB7XG4gIGFwcGxpZWRVcmxUcmVlOiBVcmxUcmVlLFxuICByYXdVcmxUcmVlOiBVcmxUcmVlLFxuICBza2lwTG9jYXRpb25DaGFuZ2U6IGJvb2xlYW4sXG4gIHJlcGxhY2VVcmw6IGJvb2xlYW4sXG4gIG5hdmlnYXRpb25JZDogbnVtYmVyXG59KSA9PiBPYnNlcnZhYmxlPHZvaWQ+O1xuXG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5mdW5jdGlvbiBkZWZhdWx0Um91dGVySG9vayhzbmFwc2hvdDogUm91dGVyU3RhdGVTbmFwc2hvdCwgcnVuRXh0cmFzOiB7XG4gIGFwcGxpZWRVcmxUcmVlOiBVcmxUcmVlLFxuICByYXdVcmxUcmVlOiBVcmxUcmVlLFxuICBza2lwTG9jYXRpb25DaGFuZ2U6IGJvb2xlYW4sXG4gIHJlcGxhY2VVcmw6IGJvb2xlYW4sXG4gIG5hdmlnYXRpb25JZDogbnVtYmVyXG59KTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gIHJldHVybiBvZiAobnVsbCkgYXMgYW55O1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFByb3ZpZGVzIHRoZSBuYXZpZ2F0aW9uIGFuZCB1cmwgbWFuaXB1bGF0aW9uIGNhcGFiaWxpdGllcy5cbiAqXG4gKiBTZWUgYFJvdXRlc2AgZm9yIG1vcmUgZGV0YWlscyBhbmQgZXhhbXBsZXMuXG4gKlxuICogQG5nTW9kdWxlIFJvdXRlck1vZHVsZVxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNsYXNzIFJvdXRlciB7XG4gIHByaXZhdGUgY3VycmVudFVybFRyZWU6IFVybFRyZWU7XG4gIHByaXZhdGUgcmF3VXJsVHJlZTogVXJsVHJlZTtcbiAgcHJpdmF0ZSBicm93c2VyVXJsVHJlZTogVXJsVHJlZTtcbiAgcHJpdmF0ZSByZWFkb25seSB0cmFuc2l0aW9uczogQmVoYXZpb3JTdWJqZWN0PE5hdmlnYXRpb25UcmFuc2l0aW9uPjtcbiAgcHJpdmF0ZSBuYXZpZ2F0aW9uczogT2JzZXJ2YWJsZTxOYXZpZ2F0aW9uVHJhbnNpdGlvbj47XG4gIHByaXZhdGUgbGFzdFN1Y2Nlc3NmdWxOYXZpZ2F0aW9uOiBOYXZpZ2F0aW9ufG51bGwgPSBudWxsO1xuICBwcml2YXRlIGN1cnJlbnROYXZpZ2F0aW9uOiBOYXZpZ2F0aW9ufG51bGwgPSBudWxsO1xuXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIGxvY2F0aW9uU3Vic2NyaXB0aW9uICE6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBuYXZpZ2F0aW9uSWQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgY29uZmlnTG9hZGVyOiBSb3V0ZXJDb25maWdMb2FkZXI7XG4gIHByaXZhdGUgbmdNb2R1bGU6IE5nTW9kdWxlUmVmPGFueT47XG4gIHByaXZhdGUgY29uc29sZTogQ29uc29sZTtcbiAgcHJpdmF0ZSBpc05nWm9uZUVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwdWJsaWMgcmVhZG9ubHkgZXZlbnRzOiBPYnNlcnZhYmxlPEV2ZW50PiA9IG5ldyBTdWJqZWN0PEV2ZW50PigpO1xuICBwdWJsaWMgcmVhZG9ubHkgcm91dGVyU3RhdGU6IFJvdXRlclN0YXRlO1xuXG4gIC8qKlxuICAgKiBFcnJvciBoYW5kbGVyIHRoYXQgaXMgaW52b2tlZCB3aGVuIGEgbmF2aWdhdGlvbiBlcnJvcnMuXG4gICAqXG4gICAqIFNlZSBgRXJyb3JIYW5kbGVyYCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyID0gZGVmYXVsdEVycm9ySGFuZGxlcjtcblxuICAvKipcbiAgICogTWFsZm9ybWVkIHVyaSBlcnJvciBoYW5kbGVyIGlzIGludm9rZWQgd2hlbiBgUm91dGVyLnBhcnNlVXJsKHVybClgIHRocm93cyBhblxuICAgKiBlcnJvciBkdWUgdG8gY29udGFpbmluZyBhbiBpbnZhbGlkIGNoYXJhY3Rlci4gVGhlIG1vc3QgY29tbW9uIGNhc2Ugd291bGQgYmUgYSBgJWAgc2lnblxuICAgKiB0aGF0J3Mgbm90IGVuY29kZWQgYW5kIGlzIG5vdCBwYXJ0IG9mIGEgcGVyY2VudCBlbmNvZGVkIHNlcXVlbmNlLlxuICAgKi9cbiAgbWFsZm9ybWVkVXJpRXJyb3JIYW5kbGVyOlxuICAgICAgKGVycm9yOiBVUklFcnJvciwgdXJsU2VyaWFsaXplcjogVXJsU2VyaWFsaXplcixcbiAgICAgICB1cmw6IHN0cmluZykgPT4gVXJsVHJlZSA9IGRlZmF1bHRNYWxmb3JtZWRVcmlFcnJvckhhbmRsZXI7XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiBhdCBsZWFzdCBvbmUgbmF2aWdhdGlvbiBoYXBwZW5lZC5cbiAgICovXG4gIG5hdmlnYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGxhc3RTdWNjZXNzZnVsSWQ6IG51bWJlciA9IC0xO1xuXG4gIC8qKlxuICAgKiBVc2VkIGJ5IFJvdXRlck1vZHVsZS4gVGhpcyBhbGxvd3MgdXMgdG9cbiAgICogcGF1c2UgdGhlIG5hdmlnYXRpb24gZWl0aGVyIGJlZm9yZSBwcmVhY3RpdmF0aW9uIG9yIGFmdGVyIGl0LlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGhvb2tzOiB7YmVmb3JlUHJlYWN0aXZhdGlvbjogUm91dGVySG9vaywgYWZ0ZXJQcmVhY3RpdmF0aW9uOiBSb3V0ZXJIb29rfSA9IHtcbiAgICBiZWZvcmVQcmVhY3RpdmF0aW9uOiBkZWZhdWx0Um91dGVySG9vayxcbiAgICBhZnRlclByZWFjdGl2YXRpb246IGRlZmF1bHRSb3V0ZXJIb29rXG4gIH07XG5cbiAgLyoqXG4gICAqIEV4dHJhY3RzIGFuZCBtZXJnZXMgVVJMcy4gVXNlZCBmb3IgQW5ndWxhckpTIHRvIEFuZ3VsYXIgbWlncmF0aW9ucy5cbiAgICovXG4gIHVybEhhbmRsaW5nU3RyYXRlZ3k6IFVybEhhbmRsaW5nU3RyYXRlZ3kgPSBuZXcgRGVmYXVsdFVybEhhbmRsaW5nU3RyYXRlZ3koKTtcblxuICByb3V0ZVJldXNlU3RyYXRlZ3k6IFJvdXRlUmV1c2VTdHJhdGVneSA9IG5ldyBEZWZhdWx0Um91dGVSZXVzZVN0cmF0ZWd5KCk7XG5cbiAgLyoqXG4gICAqIERlZmluZSB3aGF0IHRoZSByb3V0ZXIgc2hvdWxkIGRvIGlmIGl0IHJlY2VpdmVzIGEgbmF2aWdhdGlvbiByZXF1ZXN0IHRvIHRoZSBjdXJyZW50IFVSTC5cbiAgICogQnkgZGVmYXVsdCwgdGhlIHJvdXRlciB3aWxsIGlnbm9yZSB0aGlzIG5hdmlnYXRpb24uIEhvd2V2ZXIsIHRoaXMgcHJldmVudHMgZmVhdHVyZXMgc3VjaFxuICAgKiBhcyBhIFwicmVmcmVzaFwiIGJ1dHRvbi4gVXNlIHRoaXMgb3B0aW9uIHRvIGNvbmZpZ3VyZSB0aGUgYmVoYXZpb3Igd2hlbiBuYXZpZ2F0aW5nIHRvIHRoZVxuICAgKiBjdXJyZW50IFVSTC4gRGVmYXVsdCBpcyAnaWdub3JlJy5cbiAgICovXG4gIG9uU2FtZVVybE5hdmlnYXRpb246ICdyZWxvYWQnfCdpZ25vcmUnID0gJ2lnbm9yZSc7XG5cbiAgLyoqXG4gICAqIERlZmluZXMgaG93IHRoZSByb3V0ZXIgbWVyZ2VzIHBhcmFtcywgZGF0YSBhbmQgcmVzb2x2ZWQgZGF0YSBmcm9tIHBhcmVudCB0byBjaGlsZFxuICAgKiByb3V0ZXMuIEF2YWlsYWJsZSBvcHRpb25zIGFyZTpcbiAgICpcbiAgICogLSBgJ2VtcHR5T25seSdgLCB0aGUgZGVmYXVsdCwgb25seSBpbmhlcml0cyBwYXJlbnQgcGFyYW1zIGZvciBwYXRoLWxlc3Mgb3IgY29tcG9uZW50LWxlc3NcbiAgICogICByb3V0ZXMuXG4gICAqIC0gYCdhbHdheXMnYCwgZW5hYmxlcyB1bmNvbmRpdGlvbmFsIGluaGVyaXRhbmNlIG9mIHBhcmVudCBwYXJhbXMuXG4gICAqL1xuICBwYXJhbXNJbmhlcml0YW5jZVN0cmF0ZWd5OiAnZW1wdHlPbmx5J3wnYWx3YXlzJyA9ICdlbXB0eU9ubHknO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHdoZW4gdGhlIHJvdXRlciB1cGRhdGVzIHRoZSBicm93c2VyIFVSTC4gVGhlIGRlZmF1bHQgYmVoYXZpb3IgaXMgdG8gdXBkYXRlIGFmdGVyXG4gICAqIHN1Y2Nlc3NmdWwgbmF2aWdhdGlvbi4gSG93ZXZlciwgc29tZSBhcHBsaWNhdGlvbnMgbWF5IHByZWZlciBhIG1vZGUgd2hlcmUgdGhlIFVSTCBnZXRzXG4gICAqIHVwZGF0ZWQgYXQgdGhlIGJlZ2lubmluZyBvZiBuYXZpZ2F0aW9uLiBUaGUgbW9zdCBjb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdXBkYXRpbmcgdGhlXG4gICAqIFVSTCBlYXJseSBzbyBpZiBuYXZpZ2F0aW9uIGZhaWxzLCB5b3UgY2FuIHNob3cgYW4gZXJyb3IgbWVzc2FnZSB3aXRoIHRoZSBVUkwgdGhhdCBmYWlsZWQuXG4gICAqIEF2YWlsYWJsZSBvcHRpb25zIGFyZTpcbiAgICpcbiAgICogLSBgJ2RlZmVycmVkJ2AsIHRoZSBkZWZhdWx0LCB1cGRhdGVzIHRoZSBicm93c2VyIFVSTCBhZnRlciBuYXZpZ2F0aW9uIGhhcyBmaW5pc2hlZC5cbiAgICogLSBgJ2VhZ2VyJ2AsIHVwZGF0ZXMgYnJvd3NlciBVUkwgYXQgdGhlIGJlZ2lubmluZyBvZiBuYXZpZ2F0aW9uLlxuICAgKi9cbiAgdXJsVXBkYXRlU3RyYXRlZ3k6ICdkZWZlcnJlZCd8J2VhZ2VyJyA9ICdkZWZlcnJlZCc7XG5cbiAgLyoqXG4gICAqIFNlZSB7QGxpbmsgUm91dGVyTW9kdWxlfSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHJlbGF0aXZlTGlua1Jlc29sdXRpb246ICdsZWdhY3knfCdjb3JyZWN0ZWQnID0gJ2xlZ2FjeSc7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIHJvdXRlciBzZXJ2aWNlLlxuICAgKi9cbiAgLy8gVE9ETzogdnNhdmtpbiBtYWtlIGludGVybmFsIGFmdGVyIHRoZSBmaW5hbCBpcyBvdXQuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSByb290Q29tcG9uZW50VHlwZTogVHlwZTxhbnk+fG51bGwsIHByaXZhdGUgdXJsU2VyaWFsaXplcjogVXJsU2VyaWFsaXplcixcbiAgICAgIHByaXZhdGUgcm9vdENvbnRleHRzOiBDaGlsZHJlbk91dGxldENvbnRleHRzLCBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbiwgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgbG9hZGVyOiBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIGNvbXBpbGVyOiBDb21waWxlciwgcHVibGljIGNvbmZpZzogUm91dGVzKSB7XG4gICAgY29uc3Qgb25Mb2FkU3RhcnQgPSAocjogUm91dGUpID0+IHRoaXMudHJpZ2dlckV2ZW50KG5ldyBSb3V0ZUNvbmZpZ0xvYWRTdGFydChyKSk7XG4gICAgY29uc3Qgb25Mb2FkRW5kID0gKHI6IFJvdXRlKSA9PiB0aGlzLnRyaWdnZXJFdmVudChuZXcgUm91dGVDb25maWdMb2FkRW5kKHIpKTtcblxuICAgIHRoaXMubmdNb2R1bGUgPSBpbmplY3Rvci5nZXQoTmdNb2R1bGVSZWYpO1xuICAgIHRoaXMuY29uc29sZSA9IGluamVjdG9yLmdldChDb25zb2xlKTtcbiAgICBjb25zdCBuZ1pvbmUgPSBpbmplY3Rvci5nZXQoTmdab25lKTtcbiAgICB0aGlzLmlzTmdab25lRW5hYmxlZCA9IG5nWm9uZSBpbnN0YW5jZW9mIE5nWm9uZTtcblxuICAgIHRoaXMucmVzZXRDb25maWcoY29uZmlnKTtcbiAgICB0aGlzLmN1cnJlbnRVcmxUcmVlID0gY3JlYXRlRW1wdHlVcmxUcmVlKCk7XG4gICAgdGhpcy5yYXdVcmxUcmVlID0gdGhpcy5jdXJyZW50VXJsVHJlZTtcbiAgICB0aGlzLmJyb3dzZXJVcmxUcmVlID0gdGhpcy5jdXJyZW50VXJsVHJlZTtcblxuICAgIHRoaXMuY29uZmlnTG9hZGVyID0gbmV3IFJvdXRlckNvbmZpZ0xvYWRlcihsb2FkZXIsIGNvbXBpbGVyLCBvbkxvYWRTdGFydCwgb25Mb2FkRW5kKTtcbiAgICB0aGlzLnJvdXRlclN0YXRlID0gY3JlYXRlRW1wdHlTdGF0ZSh0aGlzLmN1cnJlbnRVcmxUcmVlLCB0aGlzLnJvb3RDb21wb25lbnRUeXBlKTtcblxuICAgIHRoaXMudHJhbnNpdGlvbnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE5hdmlnYXRpb25UcmFuc2l0aW9uPih7XG4gICAgICBpZDogMCxcbiAgICAgIGN1cnJlbnRVcmxUcmVlOiB0aGlzLmN1cnJlbnRVcmxUcmVlLFxuICAgICAgY3VycmVudFJhd1VybDogdGhpcy5jdXJyZW50VXJsVHJlZSxcbiAgICAgIGV4dHJhY3RlZFVybDogdGhpcy51cmxIYW5kbGluZ1N0cmF0ZWd5LmV4dHJhY3QodGhpcy5jdXJyZW50VXJsVHJlZSksXG4gICAgICB1cmxBZnRlclJlZGlyZWN0czogdGhpcy51cmxIYW5kbGluZ1N0cmF0ZWd5LmV4dHJhY3QodGhpcy5jdXJyZW50VXJsVHJlZSksXG4gICAgICByYXdVcmw6IHRoaXMuY3VycmVudFVybFRyZWUsXG4gICAgICBleHRyYXM6IHt9LFxuICAgICAgcmVzb2x2ZTogbnVsbCxcbiAgICAgIHJlamVjdDogbnVsbCxcbiAgICAgIHByb21pc2U6IFByb21pc2UucmVzb2x2ZSh0cnVlKSxcbiAgICAgIHNvdXJjZTogJ2ltcGVyYXRpdmUnLFxuICAgICAgcmVzdG9yZWRTdGF0ZTogbnVsbCxcbiAgICAgIGN1cnJlbnRTbmFwc2hvdDogdGhpcy5yb3V0ZXJTdGF0ZS5zbmFwc2hvdCxcbiAgICAgIHRhcmdldFNuYXBzaG90OiBudWxsLFxuICAgICAgY3VycmVudFJvdXRlclN0YXRlOiB0aGlzLnJvdXRlclN0YXRlLFxuICAgICAgdGFyZ2V0Um91dGVyU3RhdGU6IG51bGwsXG4gICAgICBndWFyZHM6IHtjYW5BY3RpdmF0ZUNoZWNrczogW10sIGNhbkRlYWN0aXZhdGVDaGVja3M6IFtdfSxcbiAgICAgIGd1YXJkc1Jlc3VsdDogbnVsbCxcbiAgICB9KTtcbiAgICB0aGlzLm5hdmlnYXRpb25zID0gdGhpcy5zZXR1cE5hdmlnYXRpb25zKHRoaXMudHJhbnNpdGlvbnMpO1xuXG4gICAgdGhpcy5wcm9jZXNzTmF2aWdhdGlvbnMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBOYXZpZ2F0aW9ucyh0cmFuc2l0aW9uczogT2JzZXJ2YWJsZTxOYXZpZ2F0aW9uVHJhbnNpdGlvbj4pOlxuICAgICAgT2JzZXJ2YWJsZTxOYXZpZ2F0aW9uVHJhbnNpdGlvbj4ge1xuICAgIGNvbnN0IGV2ZW50c1N1YmplY3QgPSAodGhpcy5ldmVudHMgYXMgU3ViamVjdDxFdmVudD4pO1xuICAgIHJldHVybiB0cmFuc2l0aW9ucy5waXBlKFxuICAgICAgICBmaWx0ZXIodCA9PiB0LmlkICE9PSAwKSxcblxuICAgICAgICAvLyBFeHRyYWN0IFVSTFxuICAgICAgICBtYXAodCA9PiAoe1xuICAgICAgICAgICAgICAuLi50LCBleHRyYWN0ZWRVcmw6IHRoaXMudXJsSGFuZGxpbmdTdHJhdGVneS5leHRyYWN0KHQucmF3VXJsKVxuICAgICAgICAgICAgfSBhcyBOYXZpZ2F0aW9uVHJhbnNpdGlvbikpLFxuXG4gICAgICAgIC8vIFN0b3JlIHRoZSBOYXZpZ2F0aW9uIG9iamVjdFxuICAgICAgICB0YXAodCA9PiB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50TmF2aWdhdGlvbiA9IHtcbiAgICAgICAgICAgIGlkOiB0LmlkLFxuICAgICAgICAgICAgaW5pdGlhbFVybDogdC5jdXJyZW50UmF3VXJsLFxuICAgICAgICAgICAgZXh0cmFjdGVkVXJsOiB0LmV4dHJhY3RlZFVybCxcbiAgICAgICAgICAgIHRyaWdnZXI6IHQuc291cmNlLFxuICAgICAgICAgICAgZXh0cmFzOiB0LmV4dHJhcyxcbiAgICAgICAgICAgIHByZXZpb3VzTmF2aWdhdGlvbjogdGhpcy5sYXN0U3VjY2Vzc2Z1bE5hdmlnYXRpb24gP1xuICAgICAgICAgICAgICAgIHsuLi50aGlzLmxhc3RTdWNjZXNzZnVsTmF2aWdhdGlvbiwgcHJldmlvdXNOYXZpZ2F0aW9uOiBudWxsfSA6XG4gICAgICAgICAgICAgICAgbnVsbFxuICAgICAgICAgIH07XG4gICAgICAgIH0pLFxuXG4gICAgICAgIC8vIFVzaW5nIHN3aXRjaE1hcCBzbyB3ZSBjYW5jZWwgZXhlY3V0aW5nIG5hdmlnYXRpb25zIHdoZW4gYSBuZXcgb25lIGNvbWVzIGluXG4gICAgICAgIHN3aXRjaE1hcCh0ID0+IHtcbiAgICAgICAgICBsZXQgY29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgICAgbGV0IGVycm9yZWQgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gb2YgKHQpLnBpcGUoXG4gICAgICAgICAgICAgIHN3aXRjaE1hcCh0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmxUcmFuc2l0aW9uID1cbiAgICAgICAgICAgICAgICAgICAgIXRoaXMubmF2aWdhdGVkIHx8IHQuZXh0cmFjdGVkVXJsLnRvU3RyaW5nKCkgIT09IHRoaXMuYnJvd3NlclVybFRyZWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9jZXNzQ3VycmVudFVybCA9XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLm9uU2FtZVVybE5hdmlnYXRpb24gPT09ICdyZWxvYWQnID8gdHJ1ZSA6IHVybFRyYW5zaXRpb24pICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXJsSGFuZGxpbmdTdHJhdGVneS5zaG91bGRQcm9jZXNzVXJsKHQucmF3VXJsKTtcblxuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzQ3VycmVudFVybCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mICh0KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgIC8vIEZpcmUgTmF2aWdhdGlvblN0YXJ0IGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoTWFwKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJhbnNpdGlvbiA9IHRoaXMudHJhbnNpdGlvbnMuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50c1N1YmplY3QubmV4dChuZXcgTmF2aWdhdGlvblN0YXJ0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQuaWQsIHRoaXMuc2VyaWFsaXplVXJsKHQuZXh0cmFjdGVkVXJsKSwgdC5zb3VyY2UsIHQucmVzdG9yZWRTdGF0ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zaXRpb24gIT09IHRoaXMudHJhbnNpdGlvbnMuZ2V0VmFsdWUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gRU1QVFk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW3RdO1xuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBkZWxheSBpcyByZXF1aXJlZCB0byBtYXRjaCBvbGQgYmVoYXZpb3IgdGhhdCBmb3JjZWQgbmF2aWdhdGlvbiB0b1xuICAgICAgICAgICAgICAgICAgICAgIC8vIGFsd2F5cyBiZSBhc3luY1xuICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaE1hcCh0ID0+IFByb21pc2UucmVzb2x2ZSh0KSksXG5cbiAgICAgICAgICAgICAgICAgICAgICAvLyBBcHBseVJlZGlyZWN0c1xuICAgICAgICAgICAgICAgICAgICAgIGFwcGx5UmVkaXJlY3RzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5nTW9kdWxlLmluamVjdG9yLCB0aGlzLmNvbmZpZ0xvYWRlciwgdGhpcy51cmxTZXJpYWxpemVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZyksXG5cbiAgICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGN1cnJlbnROYXZpZ2F0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgdGFwKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TmF2aWdhdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5jdXJyZW50TmF2aWdhdGlvbiAhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbFVybDogdC51cmxBZnRlclJlZGlyZWN0c1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICAgICAgICAgIC8vIFJlY29nbml6ZVxuICAgICAgICAgICAgICAgICAgICAgIHJlY29nbml6ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290Q29tcG9uZW50VHlwZSwgdGhpcy5jb25maWcsICh1cmwpID0+IHRoaXMuc2VyaWFsaXplVXJsKHVybCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyYW1zSW5oZXJpdGFuY2VTdHJhdGVneSwgdGhpcy5yZWxhdGl2ZUxpbmtSZXNvbHV0aW9uKSxcblxuICAgICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBVUkwgaWYgaW4gYGVhZ2VyYCB1cGRhdGUgbW9kZVxuICAgICAgICAgICAgICAgICAgICAgIHRhcCh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnVybFVwZGF0ZVN0cmF0ZWd5ID09PSAnZWFnZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdC5leHRyYXMuc2tpcExvY2F0aW9uQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRCcm93c2VyVXJsKHQudXJsQWZ0ZXJSZWRpcmVjdHMsICEhdC5leHRyYXMucmVwbGFjZVVybCwgdC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5icm93c2VyVXJsVHJlZSA9IHQudXJsQWZ0ZXJSZWRpcmVjdHM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgICAgICAgICAvLyBGaXJlIFJvdXRlc1JlY29nbml6ZWRcbiAgICAgICAgICAgICAgICAgICAgICB0YXAodCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb3V0ZXNSZWNvZ25pemVkID0gbmV3IFJvdXRlc1JlY29nbml6ZWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdC5pZCwgdGhpcy5zZXJpYWxpemVVcmwodC5leHRyYWN0ZWRVcmwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VyaWFsaXplVXJsKHQudXJsQWZ0ZXJSZWRpcmVjdHMpLCB0LnRhcmdldFNuYXBzaG90ICEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzU3ViamVjdC5uZXh0KHJvdXRlc1JlY29nbml6ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgIH0pLCApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBwcm9jZXNzUHJldmlvdXNVcmwgPSB1cmxUcmFuc2l0aW9uICYmIHRoaXMucmF3VXJsVHJlZSAmJlxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXJsSGFuZGxpbmdTdHJhdGVneS5zaG91bGRQcm9jZXNzVXJsKHRoaXMucmF3VXJsVHJlZSk7XG4gICAgICAgICAgICAgICAgICAvKiBXaGVuIHRoZSBjdXJyZW50IFVSTCBzaG91bGRuJ3QgYmUgcHJvY2Vzc2VkLCBidXQgdGhlIHByZXZpb3VzIG9uZSB3YXMsIHdlXG4gICAgICAgICAgICAgICAgICAgKiBoYW5kbGUgdGhpcyBcImVycm9yIGNvbmRpdGlvblwiIGJ5IG5hdmlnYXRpbmcgdG8gdGhlIHByZXZpb3VzbHkgc3VjY2Vzc2Z1bCBVUkwsXG4gICAgICAgICAgICAgICAgICAgKiBidXQgbGVhdmluZyB0aGUgVVJMIGludGFjdC4qL1xuICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NQcmV2aW91c1VybCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7aWQsIGV4dHJhY3RlZFVybCwgc291cmNlLCByZXN0b3JlZFN0YXRlLCBleHRyYXN9ID0gdDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmF2U3RhcnQgPSBuZXcgTmF2aWdhdGlvblN0YXJ0KFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQsIHRoaXMuc2VyaWFsaXplVXJsKGV4dHJhY3RlZFVybCksIHNvdXJjZSwgcmVzdG9yZWRTdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50c1N1YmplY3QubmV4dChuYXZTdGFydCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFNuYXBzaG90ID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUVtcHR5U3RhdGUoZXh0cmFjdGVkVXJsLCB0aGlzLnJvb3RDb21wb25lbnRUeXBlKS5zbmFwc2hvdDtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YgKHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi50LFxuICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFNuYXBzaG90LFxuICAgICAgICAgICAgICAgICAgICAgIHVybEFmdGVyUmVkaXJlY3RzOiBleHRyYWN0ZWRVcmwsXG4gICAgICAgICAgICAgICAgICAgICAgZXh0cmFzOiB7Li4uZXh0cmFzLCBza2lwTG9jYXRpb25DaGFuZ2U6IGZhbHNlLCByZXBsYWNlVXJsOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLyogV2hlbiBuZWl0aGVyIHRoZSBjdXJyZW50IG9yIHByZXZpb3VzIFVSTCBjYW4gYmUgcHJvY2Vzc2VkLCBkbyBub3RoaW5nIG90aGVyXG4gICAgICAgICAgICAgICAgICAgICAqIHRoYW4gdXBkYXRlIHJvdXRlcidzIGludGVybmFsIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudCBcInNldHRsZWRcIiBVUkwuIFRoaXNcbiAgICAgICAgICAgICAgICAgICAgICogd2F5IHRoZSBuZXh0IG5hdmlnYXRpb24gd2lsbCBiZSBjb21pbmcgZnJvbSB0aGUgY3VycmVudCBVUkwgaW4gdGhlIGJyb3dzZXIuXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJhd1VybFRyZWUgPSB0LnJhd1VybDtcbiAgICAgICAgICAgICAgICAgICAgdC5yZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRU1QVFk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICAvLyBCZWZvcmUgUHJlYWN0aXZhdGlvblxuICAgICAgICAgICAgICBzd2l0Y2hUYXAodCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgdGFyZ2V0U25hcHNob3QsXG4gICAgICAgICAgICAgICAgICBpZDogbmF2aWdhdGlvbklkLFxuICAgICAgICAgICAgICAgICAgZXh0cmFjdGVkVXJsOiBhcHBsaWVkVXJsVHJlZSxcbiAgICAgICAgICAgICAgICAgIHJhd1VybDogcmF3VXJsVHJlZSxcbiAgICAgICAgICAgICAgICAgIGV4dHJhczoge3NraXBMb2NhdGlvbkNoYW5nZSwgcmVwbGFjZVVybH1cbiAgICAgICAgICAgICAgICB9ID0gdDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ob29rcy5iZWZvcmVQcmVhY3RpdmF0aW9uKHRhcmdldFNuYXBzaG90ICEsIHtcbiAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25JZCxcbiAgICAgICAgICAgICAgICAgIGFwcGxpZWRVcmxUcmVlLFxuICAgICAgICAgICAgICAgICAgcmF3VXJsVHJlZSxcbiAgICAgICAgICAgICAgICAgIHNraXBMb2NhdGlvbkNoYW5nZTogISFza2lwTG9jYXRpb25DaGFuZ2UsXG4gICAgICAgICAgICAgICAgICByZXBsYWNlVXJsOiAhIXJlcGxhY2VVcmwsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgIC8vIC0tLSBHVUFSRFMgLS0tXG4gICAgICAgICAgICAgIHRhcCh0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBndWFyZHNTdGFydCA9IG5ldyBHdWFyZHNDaGVja1N0YXJ0KFxuICAgICAgICAgICAgICAgICAgICB0LmlkLCB0aGlzLnNlcmlhbGl6ZVVybCh0LmV4dHJhY3RlZFVybCksIHRoaXMuc2VyaWFsaXplVXJsKHQudXJsQWZ0ZXJSZWRpcmVjdHMpLFxuICAgICAgICAgICAgICAgICAgICB0LnRhcmdldFNuYXBzaG90ICEpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KGd1YXJkc1N0YXJ0KTtcbiAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgbWFwKHQgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgLi4udCxcbiAgICAgICAgICAgICAgICAgICAgZ3VhcmRzOlxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0QWxsUm91dGVHdWFyZHModC50YXJnZXRTbmFwc2hvdCAhLCB0LmN1cnJlbnRTbmFwc2hvdCwgdGhpcy5yb290Q29udGV4dHMpXG4gICAgICAgICAgICAgICAgICB9KSksXG5cbiAgICAgICAgICAgICAgY2hlY2tHdWFyZHModGhpcy5uZ01vZHVsZS5pbmplY3RvciwgKGV2dDogRXZlbnQpID0+IHRoaXMudHJpZ2dlckV2ZW50KGV2dCkpLFxuICAgICAgICAgICAgICB0YXAodCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzVXJsVHJlZSh0Lmd1YXJkc1Jlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yOiBFcnJvciZ7dXJsPzogVXJsVHJlZX0gPSBuYXZpZ2F0aW9uQ2FuY2VsaW5nRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgYFJlZGlyZWN0aW5nIHRvIFwiJHt0aGlzLnNlcmlhbGl6ZVVybCh0Lmd1YXJkc1Jlc3VsdCl9XCJgKTtcbiAgICAgICAgICAgICAgICAgIGVycm9yLnVybCA9IHQuZ3VhcmRzUmVzdWx0O1xuICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICB0YXAodCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3VhcmRzRW5kID0gbmV3IEd1YXJkc0NoZWNrRW5kKFxuICAgICAgICAgICAgICAgICAgICB0LmlkLCB0aGlzLnNlcmlhbGl6ZVVybCh0LmV4dHJhY3RlZFVybCksIHRoaXMuc2VyaWFsaXplVXJsKHQudXJsQWZ0ZXJSZWRpcmVjdHMpLFxuICAgICAgICAgICAgICAgICAgICB0LnRhcmdldFNuYXBzaG90ICEsICEhdC5ndWFyZHNSZXN1bHQpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KGd1YXJkc0VuZCk7XG4gICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgIGZpbHRlcih0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXQuZ3VhcmRzUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0VXJsVG9DdXJyZW50VXJsVHJlZSgpO1xuICAgICAgICAgICAgICAgICAgY29uc3QgbmF2Q2FuY2VsID1cbiAgICAgICAgICAgICAgICAgICAgICBuZXcgTmF2aWdhdGlvbkNhbmNlbCh0LmlkLCB0aGlzLnNlcmlhbGl6ZVVybCh0LmV4dHJhY3RlZFVybCksICcnKTtcbiAgICAgICAgICAgICAgICAgIGV2ZW50c1N1YmplY3QubmV4dChuYXZDYW5jZWwpO1xuICAgICAgICAgICAgICAgICAgdC5yZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgIC8vIC0tLSBSRVNPTFZFIC0tLVxuICAgICAgICAgICAgICBzd2l0Y2hUYXAodCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHQuZ3VhcmRzLmNhbkFjdGl2YXRlQ2hlY2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mICh0KS5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgIHRhcCh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVTdGFydCA9IG5ldyBSZXNvbHZlU3RhcnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdC5pZCwgdGhpcy5zZXJpYWxpemVVcmwodC5leHRyYWN0ZWRVcmwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VyaWFsaXplVXJsKHQudXJsQWZ0ZXJSZWRpcmVjdHMpLCB0LnRhcmdldFNuYXBzaG90ICEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQocmVzb2x2ZVN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlRGF0YShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbXNJbmhlcml0YW5jZVN0cmF0ZWd5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5nTW9kdWxlLmluamVjdG9yKSwgIC8vXG4gICAgICAgICAgICAgICAgICAgICAgdGFwKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZUVuZCA9IG5ldyBSZXNvbHZlRW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQuaWQsIHRoaXMuc2VyaWFsaXplVXJsKHQuZXh0cmFjdGVkVXJsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcmlhbGl6ZVVybCh0LnVybEFmdGVyUmVkaXJlY3RzKSwgdC50YXJnZXRTbmFwc2hvdCAhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHJlc29sdmVFbmQpO1xuICAgICAgICAgICAgICAgICAgICAgIH0pLCApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICAvLyAtLS0gQUZURVIgUFJFQUNUSVZBVElPTiAtLS1cbiAgICAgICAgICAgICAgc3dpdGNoVGFwKCh0OiBOYXZpZ2F0aW9uVHJhbnNpdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgIHRhcmdldFNuYXBzaG90LFxuICAgICAgICAgICAgICAgICAgaWQ6IG5hdmlnYXRpb25JZCxcbiAgICAgICAgICAgICAgICAgIGV4dHJhY3RlZFVybDogYXBwbGllZFVybFRyZWUsXG4gICAgICAgICAgICAgICAgICByYXdVcmw6IHJhd1VybFRyZWUsXG4gICAgICAgICAgICAgICAgICBleHRyYXM6IHtza2lwTG9jYXRpb25DaGFuZ2UsIHJlcGxhY2VVcmx9XG4gICAgICAgICAgICAgICAgfSA9IHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaG9va3MuYWZ0ZXJQcmVhY3RpdmF0aW9uKHRhcmdldFNuYXBzaG90ICEsIHtcbiAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25JZCxcbiAgICAgICAgICAgICAgICAgIGFwcGxpZWRVcmxUcmVlLFxuICAgICAgICAgICAgICAgICAgcmF3VXJsVHJlZSxcbiAgICAgICAgICAgICAgICAgIHNraXBMb2NhdGlvbkNoYW5nZTogISFza2lwTG9jYXRpb25DaGFuZ2UsXG4gICAgICAgICAgICAgICAgICByZXBsYWNlVXJsOiAhIXJlcGxhY2VVcmwsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgIG1hcCgodDogTmF2aWdhdGlvblRyYW5zaXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRSb3V0ZXJTdGF0ZSA9IGNyZWF0ZVJvdXRlclN0YXRlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlUmV1c2VTdHJhdGVneSwgdC50YXJnZXRTbmFwc2hvdCAhLCB0LmN1cnJlbnRSb3V0ZXJTdGF0ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh7Li4udCwgdGFyZ2V0Um91dGVyU3RhdGV9KTtcbiAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgLyogT25jZSBoZXJlLCB3ZSBhcmUgYWJvdXQgdG8gYWN0aXZhdGUgc3luY3Jvbm91c2x5LiBUaGUgYXNzdW1wdGlvbiBpcyB0aGlzIHdpbGxcbiAgICAgICAgICAgICAgICAgc3VjY2VlZCwgYW5kIHVzZXIgY29kZSBtYXkgcmVhZCBmcm9tIHRoZSBSb3V0ZXIgc2VydmljZS4gVGhlcmVmb3JlIGJlZm9yZVxuICAgICAgICAgICAgICAgICBhY3RpdmF0aW9uLCB3ZSBuZWVkIHRvIHVwZGF0ZSByb3V0ZXIgcHJvcGVydGllcyBzdG9yaW5nIHRoZSBjdXJyZW50IFVSTCBhbmQgdGhlXG4gICAgICAgICAgICAgICAgIFJvdXRlclN0YXRlLCBhcyB3ZWxsIGFzIHVwZGF0ZWQgdGhlIGJyb3dzZXIgVVJMLiBBbGwgdGhpcyBzaG91bGQgaGFwcGVuICpiZWZvcmUqXG4gICAgICAgICAgICAgICAgIGFjdGl2YXRpbmcuICovXG4gICAgICAgICAgICAgIHRhcCgodDogTmF2aWdhdGlvblRyYW5zaXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRVcmxUcmVlID0gdC51cmxBZnRlclJlZGlyZWN0cztcbiAgICAgICAgICAgICAgICB0aGlzLnJhd1VybFRyZWUgPSB0aGlzLnVybEhhbmRsaW5nU3RyYXRlZ3kubWVyZ2UodGhpcy5jdXJyZW50VXJsVHJlZSwgdC5yYXdVcmwpO1xuXG4gICAgICAgICAgICAgICAgKHRoaXMgYXN7cm91dGVyU3RhdGU6IFJvdXRlclN0YXRlfSkucm91dGVyU3RhdGUgPSB0LnRhcmdldFJvdXRlclN0YXRlICE7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy51cmxVcGRhdGVTdHJhdGVneSA9PT0gJ2RlZmVycmVkJykge1xuICAgICAgICAgICAgICAgICAgaWYgKCF0LmV4dHJhcy5za2lwTG9jYXRpb25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRCcm93c2VyVXJsKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yYXdVcmxUcmVlLCAhIXQuZXh0cmFzLnJlcGxhY2VVcmwsIHQuaWQsIHQuZXh0cmFzLnN0YXRlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHRoaXMuYnJvd3NlclVybFRyZWUgPSB0LnVybEFmdGVyUmVkaXJlY3RzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgYWN0aXZhdGVSb3V0ZXMoXG4gICAgICAgICAgICAgICAgICB0aGlzLnJvb3RDb250ZXh0cywgdGhpcy5yb3V0ZVJldXNlU3RyYXRlZ3ksXG4gICAgICAgICAgICAgICAgICAoZXZ0OiBFdmVudCkgPT4gdGhpcy50cmlnZ2VyRXZlbnQoZXZ0KSksXG5cbiAgICAgICAgICAgICAgdGFwKHtuZXh0KCkgeyBjb21wbGV0ZWQgPSB0cnVlOyB9LCBjb21wbGV0ZSgpIHsgY29tcGxldGVkID0gdHJ1ZTsgfX0pLFxuICAgICAgICAgICAgICBmaW5hbGl6ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLyogV2hlbiB0aGUgbmF2aWdhdGlvbiBzdHJlYW0gZmluaXNoZXMgZWl0aGVyIHRocm91Z2ggZXJyb3Igb3Igc3VjY2Vzcywgd2Ugc2V0IHRoZVxuICAgICAgICAgICAgICAgICAqIGBjb21wbGV0ZWRgIG9yIGBlcnJvcmVkYCBmbGFnLiBIb3dldmVyLCB0aGVyZSBhcmUgc29tZSBzaXR1YXRpb25zIHdoZXJlIHdlIGNvdWxkXG4gICAgICAgICAgICAgICAgICogZ2V0IGhlcmUgd2l0aG91dCBlaXRoZXIgb2YgdGhvc2UgYmVpbmcgc2V0LiBGb3IgaW5zdGFuY2UsIGEgcmVkaXJlY3QgZHVyaW5nXG4gICAgICAgICAgICAgICAgICogTmF2aWdhdGlvblN0YXJ0LiBUaGVyZWZvcmUsIHRoaXMgaXMgYSBjYXRjaC1hbGwgdG8gbWFrZSBzdXJlIHRoZSBOYXZpZ2F0aW9uQ2FuY2VsXG4gICAgICAgICAgICAgICAgICogZXZlbnQgaXMgZmlyZWQgd2hlbiBhIG5hdmlnYXRpb24gZ2V0cyBjYW5jZWxsZWQgYnV0IG5vdCBjYXVnaHQgYnkgb3RoZXIgbWVhbnMuICovXG4gICAgICAgICAgICAgICAgaWYgKCFjb21wbGV0ZWQgJiYgIWVycm9yZWQpIHtcbiAgICAgICAgICAgICAgICAgIC8vIE11c3QgcmVzZXQgdG8gY3VycmVudCBVUkwgdHJlZSBoZXJlIHRvIGVuc3VyZSBoaXN0b3J5LnN0YXRlIGlzIHNldC4gT24gYSBmcmVzaFxuICAgICAgICAgICAgICAgICAgLy8gcGFnZSBsb2FkLCBpZiBhIG5ldyBuYXZpZ2F0aW9uIGNvbWVzIGluIGJlZm9yZSBhIHN1Y2Nlc3NmdWwgbmF2aWdhdGlvblxuICAgICAgICAgICAgICAgICAgLy8gY29tcGxldGVzLCB0aGVyZSB3aWxsIGJlIG5vdGhpbmcgaW4gaGlzdG9yeS5zdGF0ZS5uYXZpZ2F0aW9uSWQuIFRoaXMgY2FuIGNhdXNlXG4gICAgICAgICAgICAgICAgICAvLyBzeW5jIHByb2JsZW1zIHdpdGggQW5ndWxhckpTIHN5bmMgY29kZSB3aGljaCBsb29rcyBmb3IgYSB2YWx1ZSBoZXJlIGluIG9yZGVyXG4gICAgICAgICAgICAgICAgICAvLyB0byBkZXRlcm1pbmUgd2hldGhlciBvciBub3QgdG8gaGFuZGxlIGEgZ2l2ZW4gcG9wc3RhdGUgZXZlbnQgb3IgdG8gbGVhdmUgaXRcbiAgICAgICAgICAgICAgICAgIC8vIHRvIHRoZSBBbmd1YWxyIHJvdXRlci5cbiAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRVcmxUb0N1cnJlbnRVcmxUcmVlKCk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBuYXZDYW5jZWwgPSBuZXcgTmF2aWdhdGlvbkNhbmNlbChcbiAgICAgICAgICAgICAgICAgICAgICB0LmlkLCB0aGlzLnNlcmlhbGl6ZVVybCh0LmV4dHJhY3RlZFVybCksXG4gICAgICAgICAgICAgICAgICAgICAgYE5hdmlnYXRpb24gSUQgJHt0LmlkfSBpcyBub3QgZXF1YWwgdG8gdGhlIGN1cnJlbnQgbmF2aWdhdGlvbiBpZCAke3RoaXMubmF2aWdhdGlvbklkfWApO1xuICAgICAgICAgICAgICAgICAgZXZlbnRzU3ViamVjdC5uZXh0KG5hdkNhbmNlbCk7XG4gICAgICAgICAgICAgICAgICB0LnJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjdXJyZW50TmF2aWdhdGlvbiBzaG91bGQgYWx3YXlzIGJlIHJlc2V0IHRvIG51bGwgaGVyZS4gSWYgbmF2aWdhdGlvbiB3YXNcbiAgICAgICAgICAgICAgICAvLyBzdWNjZXNzZnVsLCBsYXN0U3VjY2Vzc2Z1bFRyYW5zaXRpb24gd2lsbCBoYXZlIGFscmVhZHkgYmVlbiBzZXQuIFRoZXJlZm9yZSB3ZVxuICAgICAgICAgICAgICAgIC8vIGNhbiBzYWZlbHkgc2V0IGN1cnJlbnROYXZpZ2F0aW9uIHRvIG51bGwgaGVyZS5cbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnROYXZpZ2F0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlcnJvcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvKiBUaGlzIGVycm9yIHR5cGUgaXMgaXNzdWVkIGR1cmluZyBSZWRpcmVjdCwgYW5kIGlzIGhhbmRsZWQgYXMgYSBjYW5jZWxsYXRpb25cbiAgICAgICAgICAgICAgICAgKiByYXRoZXIgdGhhbiBhbiBlcnJvci4gKi9cbiAgICAgICAgICAgICAgICBpZiAoaXNOYXZpZ2F0aW9uQ2FuY2VsaW5nRXJyb3IoZSkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZGlyZWN0aW5nID0gaXNVcmxUcmVlKGUudXJsKTtcbiAgICAgICAgICAgICAgICAgIGlmICghcmVkaXJlY3RpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHByb3BlcnR5IG9ubHkgaWYgd2UncmUgbm90IHJlZGlyZWN0aW5nLiBJZiB3ZSBsYW5kZWQgb24gYSBwYWdlIGFuZFxuICAgICAgICAgICAgICAgICAgICAvLyByZWRpcmVjdCB0byBgL2Agcm91dGUsIHRoZSBuZXcgbmF2aWdhdGlvbiBpcyBnb2luZyB0byBzZWUgdGhlIGAvYCBpc24ndFxuICAgICAgICAgICAgICAgICAgICAvLyBhIGNoYW5nZSBmcm9tIHRoZSBkZWZhdWx0IGN1cnJlbnRVcmxUcmVlIGFuZCB3b24ndCBuYXZpZ2F0ZS4gVGhpcyBpc1xuICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IGFwcGxpY2FibGUgd2l0aCBpbml0aWFsIG5hdmlnYXRpb24sIHNvIHNldHRpbmcgYG5hdmlnYXRlZGAgb25seSB3aGVuXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vdCByZWRpcmVjdGluZyByZXNvbHZlcyB0aGlzIHNjZW5hcmlvLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRTdGF0ZUFuZFVybCh0LmN1cnJlbnRSb3V0ZXJTdGF0ZSwgdC5jdXJyZW50VXJsVHJlZSwgdC5yYXdVcmwpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY29uc3QgbmF2Q2FuY2VsID1cbiAgICAgICAgICAgICAgICAgICAgICBuZXcgTmF2aWdhdGlvbkNhbmNlbCh0LmlkLCB0aGlzLnNlcmlhbGl6ZVVybCh0LmV4dHJhY3RlZFVybCksIGUubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICBldmVudHNTdWJqZWN0Lm5leHQobmF2Q2FuY2VsKTtcbiAgICAgICAgICAgICAgICAgIHQucmVzb2x2ZShmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChyZWRpcmVjdGluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlQnlVcmwoZS51cmwpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAvKiBBbGwgb3RoZXIgZXJyb3JzIHNob3VsZCByZXNldCB0byB0aGUgcm91dGVyJ3MgaW50ZXJuYWwgVVJMIHJlZmVyZW5jZSB0byB0aGVcbiAgICAgICAgICAgICAgICAgICAqIHByZS1lcnJvciBzdGF0ZS4gKi9cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFN0YXRlQW5kVXJsKHQuY3VycmVudFJvdXRlclN0YXRlLCB0LmN1cnJlbnRVcmxUcmVlLCB0LnJhd1VybCk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBuYXZFcnJvciA9IG5ldyBOYXZpZ2F0aW9uRXJyb3IodC5pZCwgdGhpcy5zZXJpYWxpemVVcmwodC5leHRyYWN0ZWRVcmwpLCBlKTtcbiAgICAgICAgICAgICAgICAgIGV2ZW50c1N1YmplY3QubmV4dChuYXZFcnJvcik7XG4gICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0LnJlc29sdmUodGhpcy5lcnJvckhhbmRsZXIoZSkpO1xuICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5yZWplY3QoZWUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gRU1QVFk7XG4gICAgICAgICAgICAgIH0pLCApO1xuICAgICAgICAgIC8vIFRPRE8oamFzb25hZGVuKTogcmVtb3ZlIGNhc3Qgb25jZSBnMyBpcyBvbiB1cGRhdGVkIFR5cGVTY3JpcHRcbiAgICAgICAgfSkpIGFzIGFueSBhcyBPYnNlcnZhYmxlPE5hdmlnYXRpb25UcmFuc2l0aW9uPjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICogVE9ETzogdGhpcyBzaG91bGQgYmUgcmVtb3ZlZCBvbmNlIHRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgcm91dGVyIG1hZGUgaW50ZXJuYWxcbiAgICovXG4gIHJlc2V0Um9vdENvbXBvbmVudFR5cGUocm9vdENvbXBvbmVudFR5cGU6IFR5cGU8YW55Pik6IHZvaWQge1xuICAgIHRoaXMucm9vdENvbXBvbmVudFR5cGUgPSByb290Q29tcG9uZW50VHlwZTtcbiAgICAvLyBUT0RPOiB2c2F2a2luIHJvdXRlciA0LjAgc2hvdWxkIG1ha2UgdGhlIHJvb3QgY29tcG9uZW50IHNldCB0byBudWxsXG4gICAgLy8gdGhpcyB3aWxsIHNpbXBsaWZ5IHRoZSBsaWZlY3ljbGUgb2YgdGhlIHJvdXRlci5cbiAgICB0aGlzLnJvdXRlclN0YXRlLnJvb3QuY29tcG9uZW50ID0gdGhpcy5yb290Q29tcG9uZW50VHlwZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VHJhbnNpdGlvbigpOiBOYXZpZ2F0aW9uVHJhbnNpdGlvbiB7IHJldHVybiB0aGlzLnRyYW5zaXRpb25zLnZhbHVlOyB9XG5cbiAgcHJpdmF0ZSBzZXRUcmFuc2l0aW9uKHQ6IFBhcnRpYWw8TmF2aWdhdGlvblRyYW5zaXRpb24+KTogdm9pZCB7XG4gICAgdGhpcy50cmFuc2l0aW9ucy5uZXh0KHsuLi50aGlzLmdldFRyYW5zaXRpb24oKSwgLi4udH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdXAgdGhlIGxvY2F0aW9uIGNoYW5nZSBsaXN0ZW5lciBhbmQgcGVyZm9ybXMgdGhlIGluaXRpYWwgbmF2aWdhdGlvbi5cbiAgICovXG4gIGluaXRpYWxOYXZpZ2F0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0VXBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyKCk7XG4gICAgaWYgKHRoaXMubmF2aWdhdGlvbklkID09PSAwKSB7XG4gICAgICB0aGlzLm5hdmlnYXRlQnlVcmwodGhpcy5sb2NhdGlvbi5wYXRoKHRydWUpLCB7cmVwbGFjZVVybDogdHJ1ZX0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHVwIHRoZSBsb2NhdGlvbiBjaGFuZ2UgbGlzdGVuZXIuXG4gICAqL1xuICBzZXRVcExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIoKTogdm9pZCB7XG4gICAgLy8gRG9uJ3QgbmVlZCB0byB1c2UgWm9uZS53cmFwIGFueSBtb3JlLCBiZWNhdXNlIHpvbmUuanNcbiAgICAvLyBhbHJlYWR5IHBhdGNoIG9uUG9wU3RhdGUsIHNvIGxvY2F0aW9uIGNoYW5nZSBjYWxsYmFjayB3aWxsXG4gICAgLy8gcnVuIGludG8gbmdab25lXG4gICAgaWYgKCF0aGlzLmxvY2F0aW9uU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmxvY2F0aW9uU3Vic2NyaXB0aW9uID0gPGFueT50aGlzLmxvY2F0aW9uLnN1YnNjcmliZSgoY2hhbmdlOiBhbnkpID0+IHtcbiAgICAgICAgbGV0IHJhd1VybFRyZWUgPSB0aGlzLnBhcnNlVXJsKGNoYW5nZVsndXJsJ10pO1xuICAgICAgICBjb25zdCBzb3VyY2U6IE5hdmlnYXRpb25UcmlnZ2VyID0gY2hhbmdlWyd0eXBlJ10gPT09ICdwb3BzdGF0ZScgPyAncG9wc3RhdGUnIDogJ2hhc2hjaGFuZ2UnO1xuICAgICAgICAvLyBOYXZpZ2F0aW9ucyBjb21pbmcgZnJvbSBBbmd1bGFyIHJvdXRlciBoYXZlIGEgbmF2aWdhdGlvbklkIHN0YXRlIHByb3BlcnR5LiBXaGVuIHRoaXNcbiAgICAgICAgLy8gZXhpc3RzLCByZXN0b3JlIHRoZSBzdGF0ZS5cbiAgICAgICAgY29uc3Qgc3RhdGUgPSBjaGFuZ2Uuc3RhdGUgJiYgY2hhbmdlLnN0YXRlLm5hdmlnYXRpb25JZCA/IGNoYW5nZS5zdGF0ZSA6IG51bGw7XG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICAoKSA9PiB7IHRoaXMuc2NoZWR1bGVOYXZpZ2F0aW9uKHJhd1VybFRyZWUsIHNvdXJjZSwgc3RhdGUsIHtyZXBsYWNlVXJsOiB0cnVlfSk7IH0sIDApO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFRoZSBjdXJyZW50IHVybCAqL1xuICBnZXQgdXJsKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnNlcmlhbGl6ZVVybCh0aGlzLmN1cnJlbnRVcmxUcmVlKTsgfVxuXG4gIC8qKiBUaGUgY3VycmVudCBOYXZpZ2F0aW9uIG9iamVjdCBpZiBvbmUgZXhpc3RzICovXG4gIGdldEN1cnJlbnROYXZpZ2F0aW9uKCk6IE5hdmlnYXRpb258bnVsbCB7IHJldHVybiB0aGlzLmN1cnJlbnROYXZpZ2F0aW9uOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICB0cmlnZ2VyRXZlbnQoZXZlbnQ6IEV2ZW50KTogdm9pZCB7ICh0aGlzLmV2ZW50cyBhcyBTdWJqZWN0PEV2ZW50PikubmV4dChldmVudCk7IH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBjb25maWd1cmF0aW9uIHVzZWQgZm9yIG5hdmlnYXRpb24gYW5kIGdlbmVyYXRpbmcgbGlua3MuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIGBgYFxuICAgKiByb3V0ZXIucmVzZXRDb25maWcoW1xuICAgKiAgeyBwYXRoOiAndGVhbS86aWQnLCBjb21wb25lbnQ6IFRlYW1DbXAsIGNoaWxkcmVuOiBbXG4gICAqICAgIHsgcGF0aDogJ3NpbXBsZScsIGNvbXBvbmVudDogU2ltcGxlQ21wIH0sXG4gICAqICAgIHsgcGF0aDogJ3VzZXIvOm5hbWUnLCBjb21wb25lbnQ6IFVzZXJDbXAgfVxuICAgKiAgXX1cbiAgICogXSk7XG4gICAqIGBgYFxuICAgKi9cbiAgcmVzZXRDb25maWcoY29uZmlnOiBSb3V0ZXMpOiB2b2lkIHtcbiAgICB2YWxpZGF0ZUNvbmZpZyhjb25maWcpO1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnLm1hcChzdGFuZGFyZGl6ZUNvbmZpZyk7XG4gICAgdGhpcy5uYXZpZ2F0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmxhc3RTdWNjZXNzZnVsSWQgPSAtMTtcbiAgfVxuXG4gIC8qKiBAZG9jc05vdFJlcXVpcmVkICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQgeyB0aGlzLmRpc3Bvc2UoKTsgfVxuXG4gIC8qKiBEaXNwb3NlcyBvZiB0aGUgcm91dGVyICovXG4gIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubG9jYXRpb25TdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMubG9jYXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMubG9jYXRpb25TdWJzY3JpcHRpb24gPSBudWxsICE7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgYW4gYXJyYXkgb2YgY29tbWFuZHMgdG8gdGhlIGN1cnJlbnQgdXJsIHRyZWUgYW5kIGNyZWF0ZXMgYSBuZXcgdXJsIHRyZWUuXG4gICAqXG4gICAqIFdoZW4gZ2l2ZW4gYW4gYWN0aXZhdGUgcm91dGUsIGFwcGxpZXMgdGhlIGdpdmVuIGNvbW1hbmRzIHN0YXJ0aW5nIGZyb20gdGhlIHJvdXRlLlxuICAgKiBXaGVuIG5vdCBnaXZlbiBhIHJvdXRlLCBhcHBsaWVzIHRoZSBnaXZlbiBjb21tYW5kIHN0YXJ0aW5nIGZyb20gdGhlIHJvb3QuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIGBgYFxuICAgKiAvLyBjcmVhdGUgL3RlYW0vMzMvdXNlci8xMVxuICAgKiByb3V0ZXIuY3JlYXRlVXJsVHJlZShbJy90ZWFtJywgMzMsICd1c2VyJywgMTFdKTtcbiAgICpcbiAgICogLy8gY3JlYXRlIC90ZWFtLzMzO2V4cGFuZD10cnVlL3VzZXIvMTFcbiAgICogcm91dGVyLmNyZWF0ZVVybFRyZWUoWycvdGVhbScsIDMzLCB7ZXhwYW5kOiB0cnVlfSwgJ3VzZXInLCAxMV0pO1xuICAgKlxuICAgKiAvLyB5b3UgY2FuIGNvbGxhcHNlIHN0YXRpYyBzZWdtZW50cyBsaWtlIHRoaXMgKHRoaXMgd29ya3Mgb25seSB3aXRoIHRoZSBmaXJzdCBwYXNzZWQtaW4gdmFsdWUpOlxuICAgKiByb3V0ZXIuY3JlYXRlVXJsVHJlZShbJy90ZWFtLzMzL3VzZXInLCB1c2VySWRdKTtcbiAgICpcbiAgICogLy8gSWYgdGhlIGZpcnN0IHNlZ21lbnQgY2FuIGNvbnRhaW4gc2xhc2hlcywgYW5kIHlvdSBkbyBub3Qgd2FudCB0aGUgcm91dGVyIHRvIHNwbGl0IGl0LCB5b3VcbiAgICogLy8gY2FuIGRvIHRoZSBmb2xsb3dpbmc6XG4gICAqXG4gICAqIHJvdXRlci5jcmVhdGVVcmxUcmVlKFt7c2VnbWVudFBhdGg6ICcvb25lL3R3byd9XSk7XG4gICAqXG4gICAqIC8vIGNyZWF0ZSAvdGVhbS8zMy8odXNlci8xMS8vcmlnaHQ6Y2hhdClcbiAgICogcm91dGVyLmNyZWF0ZVVybFRyZWUoWycvdGVhbScsIDMzLCB7b3V0bGV0czoge3ByaW1hcnk6ICd1c2VyLzExJywgcmlnaHQ6ICdjaGF0J319XSk7XG4gICAqXG4gICAqIC8vIHJlbW92ZSB0aGUgcmlnaHQgc2Vjb25kYXJ5IG5vZGVcbiAgICogcm91dGVyLmNyZWF0ZVVybFRyZWUoWycvdGVhbScsIDMzLCB7b3V0bGV0czoge3ByaW1hcnk6ICd1c2VyLzExJywgcmlnaHQ6IG51bGx9fV0pO1xuICAgKlxuICAgKiAvLyBhc3N1bWluZyB0aGUgY3VycmVudCB1cmwgaXMgYC90ZWFtLzMzL3VzZXIvMTFgIGFuZCB0aGUgcm91dGUgcG9pbnRzIHRvIGB1c2VyLzExYFxuICAgKlxuICAgKiAvLyBuYXZpZ2F0ZSB0byAvdGVhbS8zMy91c2VyLzExL2RldGFpbHNcbiAgICogcm91dGVyLmNyZWF0ZVVybFRyZWUoWydkZXRhaWxzJ10sIHtyZWxhdGl2ZVRvOiByb3V0ZX0pO1xuICAgKlxuICAgKiAvLyBuYXZpZ2F0ZSB0byAvdGVhbS8zMy91c2VyLzIyXG4gICAqIHJvdXRlci5jcmVhdGVVcmxUcmVlKFsnLi4vMjInXSwge3JlbGF0aXZlVG86IHJvdXRlfSk7XG4gICAqXG4gICAqIC8vIG5hdmlnYXRlIHRvIC90ZWFtLzQ0L3VzZXIvMjJcbiAgICogcm91dGVyLmNyZWF0ZVVybFRyZWUoWycuLi8uLi90ZWFtLzQ0L3VzZXIvMjInXSwge3JlbGF0aXZlVG86IHJvdXRlfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgY3JlYXRlVXJsVHJlZShjb21tYW5kczogYW55W10sIG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7fSk6IFVybFRyZWUge1xuICAgIGNvbnN0IHtyZWxhdGl2ZVRvLCAgICAgICAgICBxdWVyeVBhcmFtcywgICAgICAgICBmcmFnbWVudCxcbiAgICAgICAgICAgcHJlc2VydmVRdWVyeVBhcmFtcywgcXVlcnlQYXJhbXNIYW5kbGluZywgcHJlc2VydmVGcmFnbWVudH0gPSBuYXZpZ2F0aW9uRXh0cmFzO1xuICAgIGlmIChpc0Rldk1vZGUoKSAmJiBwcmVzZXJ2ZVF1ZXJ5UGFyYW1zICYmIDxhbnk+Y29uc29sZSAmJiA8YW55PmNvbnNvbGUud2Fybikge1xuICAgICAgY29uc29sZS53YXJuKCdwcmVzZXJ2ZVF1ZXJ5UGFyYW1zIGlzIGRlcHJlY2F0ZWQsIHVzZSBxdWVyeVBhcmFtc0hhbmRsaW5nIGluc3RlYWQuJyk7XG4gICAgfVxuICAgIGNvbnN0IGEgPSByZWxhdGl2ZVRvIHx8IHRoaXMucm91dGVyU3RhdGUucm9vdDtcbiAgICBjb25zdCBmID0gcHJlc2VydmVGcmFnbWVudCA/IHRoaXMuY3VycmVudFVybFRyZWUuZnJhZ21lbnQgOiBmcmFnbWVudDtcbiAgICBsZXQgcTogUGFyYW1zfG51bGwgPSBudWxsO1xuICAgIGlmIChxdWVyeVBhcmFtc0hhbmRsaW5nKSB7XG4gICAgICBzd2l0Y2ggKHF1ZXJ5UGFyYW1zSGFuZGxpbmcpIHtcbiAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgIHEgPSB7Li4udGhpcy5jdXJyZW50VXJsVHJlZS5xdWVyeVBhcmFtcywgLi4ucXVlcnlQYXJhbXN9O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwcmVzZXJ2ZSc6XG4gICAgICAgICAgcSA9IHRoaXMuY3VycmVudFVybFRyZWUucXVlcnlQYXJhbXM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcSA9IHF1ZXJ5UGFyYW1zIHx8IG51bGw7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHEgPSBwcmVzZXJ2ZVF1ZXJ5UGFyYW1zID8gdGhpcy5jdXJyZW50VXJsVHJlZS5xdWVyeVBhcmFtcyA6IHF1ZXJ5UGFyYW1zIHx8IG51bGw7XG4gICAgfVxuICAgIGlmIChxICE9PSBudWxsKSB7XG4gICAgICBxID0gdGhpcy5yZW1vdmVFbXB0eVByb3BzKHEpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlVXJsVHJlZShhLCB0aGlzLmN1cnJlbnRVcmxUcmVlLCBjb21tYW5kcywgcSAhLCBmICEpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlIGJhc2VkIG9uIHRoZSBwcm92aWRlZCB1cmwuIFRoaXMgbmF2aWdhdGlvbiBpcyBhbHdheXMgYWJzb2x1dGUuXG4gICAqXG4gICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQ6XG4gICAqIC0gcmVzb2x2ZXMgdG8gJ3RydWUnIHdoZW4gbmF2aWdhdGlvbiBzdWNjZWVkcyxcbiAgICogLSByZXNvbHZlcyB0byAnZmFsc2UnIHdoZW4gbmF2aWdhdGlvbiBmYWlscyxcbiAgICogLSBpcyByZWplY3RlZCB3aGVuIGFuIGVycm9yIGhhcHBlbnMuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIGBgYFxuICAgKiByb3V0ZXIubmF2aWdhdGVCeVVybChcIi90ZWFtLzMzL3VzZXIvMTFcIik7XG4gICAqXG4gICAqIC8vIE5hdmlnYXRlIHdpdGhvdXQgdXBkYXRpbmcgdGhlIFVSTFxuICAgKiByb3V0ZXIubmF2aWdhdGVCeVVybChcIi90ZWFtLzMzL3VzZXIvMTFcIiwgeyBza2lwTG9jYXRpb25DaGFuZ2U6IHRydWUgfSk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBTaW5jZSBgbmF2aWdhdGVCeVVybCgpYCB0YWtlcyBhbiBhYnNvbHV0ZSBVUkwgYXMgdGhlIGZpcnN0IHBhcmFtZXRlcixcbiAgICogaXQgd2lsbCBub3QgYXBwbHkgYW55IGRlbHRhIHRvIHRoZSBjdXJyZW50IFVSTCBhbmQgaWdub3JlcyBhbnkgcHJvcGVydGllc1xuICAgKiBpbiB0aGUgc2Vjb25kIHBhcmFtZXRlciAodGhlIGBOYXZpZ2F0aW9uRXh0cmFzYCkgdGhhdCB3b3VsZCBjaGFuZ2UgdGhlXG4gICAqIHByb3ZpZGVkIFVSTC5cbiAgICovXG4gIG5hdmlnYXRlQnlVcmwodXJsOiBzdHJpbmd8VXJsVHJlZSwgZXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge3NraXBMb2NhdGlvbkNoYW5nZTogZmFsc2V9KTpcbiAgICAgIFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmIChpc0Rldk1vZGUoKSAmJiB0aGlzLmlzTmdab25lRW5hYmxlZCAmJiAhTmdab25lLmlzSW5Bbmd1bGFyWm9uZSgpKSB7XG4gICAgICB0aGlzLmNvbnNvbGUud2FybihcbiAgICAgICAgICBgTmF2aWdhdGlvbiB0cmlnZ2VyZWQgb3V0c2lkZSBBbmd1bGFyIHpvbmUsIGRpZCB5b3UgZm9yZ2V0IHRvIGNhbGwgJ25nWm9uZS5ydW4oKSc/YCk7XG4gICAgfVxuXG4gICAgY29uc3QgdXJsVHJlZSA9IGlzVXJsVHJlZSh1cmwpID8gdXJsIDogdGhpcy5wYXJzZVVybCh1cmwpO1xuICAgIGNvbnN0IG1lcmdlZFRyZWUgPSB0aGlzLnVybEhhbmRsaW5nU3RyYXRlZ3kubWVyZ2UodXJsVHJlZSwgdGhpcy5yYXdVcmxUcmVlKTtcblxuICAgIHJldHVybiB0aGlzLnNjaGVkdWxlTmF2aWdhdGlvbihtZXJnZWRUcmVlLCAnaW1wZXJhdGl2ZScsIG51bGwsIGV4dHJhcyk7XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGUgYmFzZWQgb24gdGhlIHByb3ZpZGVkIGFycmF5IG9mIGNvbW1hbmRzIGFuZCBhIHN0YXJ0aW5nIHBvaW50LlxuICAgKiBJZiBubyBzdGFydGluZyByb3V0ZSBpcyBwcm92aWRlZCwgdGhlIG5hdmlnYXRpb24gaXMgYWJzb2x1dGUuXG4gICAqXG4gICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQ6XG4gICAqIC0gcmVzb2x2ZXMgdG8gJ3RydWUnIHdoZW4gbmF2aWdhdGlvbiBzdWNjZWVkcyxcbiAgICogLSByZXNvbHZlcyB0byAnZmFsc2UnIHdoZW4gbmF2aWdhdGlvbiBmYWlscyxcbiAgICogLSBpcyByZWplY3RlZCB3aGVuIGFuIGVycm9yIGhhcHBlbnMuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIGBgYFxuICAgKiByb3V0ZXIubmF2aWdhdGUoWyd0ZWFtJywgMzMsICd1c2VyJywgMTFdLCB7cmVsYXRpdmVUbzogcm91dGV9KTtcbiAgICpcbiAgICogLy8gTmF2aWdhdGUgd2l0aG91dCB1cGRhdGluZyB0aGUgVVJMXG4gICAqIHJvdXRlci5uYXZpZ2F0ZShbJ3RlYW0nLCAzMywgJ3VzZXInLCAxMV0sIHtyZWxhdGl2ZVRvOiByb3V0ZSwgc2tpcExvY2F0aW9uQ2hhbmdlOiB0cnVlfSk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBUaGUgZmlyc3QgcGFyYW1ldGVyIG9mIGBuYXZpZ2F0ZSgpYCBpcyBhIGRlbHRhIHRvIGJlIGFwcGxpZWQgdG8gdGhlIGN1cnJlbnQgVVJMXG4gICAqIG9yIHRoZSBvbmUgcHJvdmlkZWQgaW4gdGhlIGByZWxhdGl2ZVRvYCBwcm9wZXJ0eSBvZiB0aGUgc2Vjb25kIHBhcmFtZXRlciAodGhlXG4gICAqIGBOYXZpZ2F0aW9uRXh0cmFzYCkuXG4gICAqXG4gICAqIEluIG9yZGVyIHRvIGFmZmVjdCB0aGlzIGJyb3dzZXIncyBgaGlzdG9yeS5zdGF0ZWAgZW50cnksIHRoZSBgc3RhdGVgXG4gICAqIHBhcmFtZXRlciBjYW4gYmUgcGFzc2VkLiBUaGlzIG11c3QgYmUgYW4gb2JqZWN0IGJlY2F1c2UgdGhlIHJvdXRlclxuICAgKiB3aWxsIGFkZCB0aGUgYG5hdmlnYXRpb25JZGAgcHJvcGVydHkgdG8gdGhpcyBvYmplY3QgYmVmb3JlIGNyZWF0aW5nXG4gICAqIHRoZSBuZXcgaGlzdG9yeSBpdGVtLlxuICAgKi9cbiAgbmF2aWdhdGUoY29tbWFuZHM6IGFueVtdLCBleHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7c2tpcExvY2F0aW9uQ2hhbmdlOiBmYWxzZX0pOlxuICAgICAgUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdmFsaWRhdGVDb21tYW5kcyhjb21tYW5kcyk7XG4gICAgcmV0dXJuIHRoaXMubmF2aWdhdGVCeVVybCh0aGlzLmNyZWF0ZVVybFRyZWUoY29tbWFuZHMsIGV4dHJhcyksIGV4dHJhcyk7XG4gIH1cblxuICAvKiogU2VyaWFsaXplcyBhIGBVcmxUcmVlYCBpbnRvIGEgc3RyaW5nICovXG4gIHNlcmlhbGl6ZVVybCh1cmw6IFVybFRyZWUpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy51cmxTZXJpYWxpemVyLnNlcmlhbGl6ZSh1cmwpOyB9XG5cbiAgLyoqIFBhcnNlcyBhIHN0cmluZyBpbnRvIGEgYFVybFRyZWVgICovXG4gIHBhcnNlVXJsKHVybDogc3RyaW5nKTogVXJsVHJlZSB7XG4gICAgbGV0IHVybFRyZWU6IFVybFRyZWU7XG4gICAgdHJ5IHtcbiAgICAgIHVybFRyZWUgPSB0aGlzLnVybFNlcmlhbGl6ZXIucGFyc2UodXJsKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB1cmxUcmVlID0gdGhpcy5tYWxmb3JtZWRVcmlFcnJvckhhbmRsZXIoZSwgdGhpcy51cmxTZXJpYWxpemVyLCB1cmwpO1xuICAgIH1cbiAgICByZXR1cm4gdXJsVHJlZTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHdoZXRoZXIgdGhlIHVybCBpcyBhY3RpdmF0ZWQgKi9cbiAgaXNBY3RpdmUodXJsOiBzdHJpbmd8VXJsVHJlZSwgZXhhY3Q6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICBpZiAoaXNVcmxUcmVlKHVybCkpIHtcbiAgICAgIHJldHVybiBjb250YWluc1RyZWUodGhpcy5jdXJyZW50VXJsVHJlZSwgdXJsLCBleGFjdCk7XG4gICAgfVxuXG4gICAgY29uc3QgdXJsVHJlZSA9IHRoaXMucGFyc2VVcmwodXJsKTtcbiAgICByZXR1cm4gY29udGFpbnNUcmVlKHRoaXMuY3VycmVudFVybFRyZWUsIHVybFRyZWUsIGV4YWN0KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlRW1wdHlQcm9wcyhwYXJhbXM6IFBhcmFtcyk6IFBhcmFtcyB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHBhcmFtcykucmVkdWNlKChyZXN1bHQ6IFBhcmFtcywga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlOiBhbnkgPSBwYXJhbXNba2V5XTtcbiAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIHByaXZhdGUgcHJvY2Vzc05hdmlnYXRpb25zKCk6IHZvaWQge1xuICAgIHRoaXMubmF2aWdhdGlvbnMuc3Vic2NyaWJlKFxuICAgICAgICB0ID0+IHtcbiAgICAgICAgICB0aGlzLm5hdmlnYXRlZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5sYXN0U3VjY2Vzc2Z1bElkID0gdC5pZDtcbiAgICAgICAgICAodGhpcy5ldmVudHMgYXMgU3ViamVjdDxFdmVudD4pXG4gICAgICAgICAgICAgIC5uZXh0KG5ldyBOYXZpZ2F0aW9uRW5kKFxuICAgICAgICAgICAgICAgICAgdC5pZCwgdGhpcy5zZXJpYWxpemVVcmwodC5leHRyYWN0ZWRVcmwpLCB0aGlzLnNlcmlhbGl6ZVVybCh0aGlzLmN1cnJlbnRVcmxUcmVlKSkpO1xuICAgICAgICAgIHRoaXMubGFzdFN1Y2Nlc3NmdWxOYXZpZ2F0aW9uID0gdGhpcy5jdXJyZW50TmF2aWdhdGlvbjtcbiAgICAgICAgICB0aGlzLmN1cnJlbnROYXZpZ2F0aW9uID0gbnVsbDtcbiAgICAgICAgICB0LnJlc29sdmUodHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGUgPT4geyB0aGlzLmNvbnNvbGUud2FybihgVW5oYW5kbGVkIE5hdmlnYXRpb24gRXJyb3I6IGApOyB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2NoZWR1bGVOYXZpZ2F0aW9uKFxuICAgICAgcmF3VXJsOiBVcmxUcmVlLCBzb3VyY2U6IE5hdmlnYXRpb25UcmlnZ2VyLCByZXN0b3JlZFN0YXRlOiBSZXN0b3JlZFN0YXRlfG51bGwsXG4gICAgICBleHRyYXM6IE5hdmlnYXRpb25FeHRyYXMpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBsYXN0TmF2aWdhdGlvbiA9IHRoaXMuZ2V0VHJhbnNpdGlvbigpO1xuICAgIC8vIElmIHRoZSB1c2VyIHRyaWdnZXJzIGEgbmF2aWdhdGlvbiBpbXBlcmF0aXZlbHkgKGUuZy4sIGJ5IHVzaW5nIG5hdmlnYXRlQnlVcmwpLFxuICAgIC8vIGFuZCB0aGF0IG5hdmlnYXRpb24gcmVzdWx0cyBpbiAncmVwbGFjZVN0YXRlJyB0aGF0IGxlYWRzIHRvIHRoZSBzYW1lIFVSTCxcbiAgICAvLyB3ZSBzaG91bGQgc2tpcCB0aG9zZS5cbiAgICBpZiAobGFzdE5hdmlnYXRpb24gJiYgc291cmNlICE9PSAnaW1wZXJhdGl2ZScgJiYgbGFzdE5hdmlnYXRpb24uc291cmNlID09PSAnaW1wZXJhdGl2ZScgJiZcbiAgICAgICAgbGFzdE5hdmlnYXRpb24ucmF3VXJsLnRvU3RyaW5nKCkgPT09IHJhd1VybC50b1N0cmluZygpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpOyAgLy8gcmV0dXJuIHZhbHVlIGlzIG5vdCB1c2VkXG4gICAgfVxuXG4gICAgLy8gQmVjYXVzZSBvZiBhIGJ1ZyBpbiBJRSBhbmQgRWRnZSwgdGhlIGxvY2F0aW9uIGNsYXNzIGZpcmVzIHR3byBldmVudHMgKHBvcHN0YXRlIGFuZFxuICAgIC8vIGhhc2hjaGFuZ2UpIGV2ZXJ5IHNpbmdsZSB0aW1lLiBUaGUgc2Vjb25kIG9uZSBzaG91bGQgYmUgaWdub3JlZC4gT3RoZXJ3aXNlLCB0aGUgVVJMIHdpbGxcbiAgICAvLyBmbGlja2VyLiBIYW5kbGVzIHRoZSBjYXNlIHdoZW4gYSBwb3BzdGF0ZSB3YXMgZW1pdHRlZCBmaXJzdC5cbiAgICBpZiAobGFzdE5hdmlnYXRpb24gJiYgc291cmNlID09ICdoYXNoY2hhbmdlJyAmJiBsYXN0TmF2aWdhdGlvbi5zb3VyY2UgPT09ICdwb3BzdGF0ZScgJiZcbiAgICAgICAgbGFzdE5hdmlnYXRpb24ucmF3VXJsLnRvU3RyaW5nKCkgPT09IHJhd1VybC50b1N0cmluZygpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpOyAgLy8gcmV0dXJuIHZhbHVlIGlzIG5vdCB1c2VkXG4gICAgfVxuICAgIC8vIEJlY2F1c2Ugb2YgYSBidWcgaW4gSUUgYW5kIEVkZ2UsIHRoZSBsb2NhdGlvbiBjbGFzcyBmaXJlcyB0d28gZXZlbnRzIChwb3BzdGF0ZSBhbmRcbiAgICAvLyBoYXNoY2hhbmdlKSBldmVyeSBzaW5nbGUgdGltZS4gVGhlIHNlY29uZCBvbmUgc2hvdWxkIGJlIGlnbm9yZWQuIE90aGVyd2lzZSwgdGhlIFVSTCB3aWxsXG4gICAgLy8gZmxpY2tlci4gSGFuZGxlcyB0aGUgY2FzZSB3aGVuIGEgaGFzaGNoYW5nZSB3YXMgZW1pdHRlZCBmaXJzdC5cbiAgICBpZiAobGFzdE5hdmlnYXRpb24gJiYgc291cmNlID09ICdwb3BzdGF0ZScgJiYgbGFzdE5hdmlnYXRpb24uc291cmNlID09PSAnaGFzaGNoYW5nZScgJiZcbiAgICAgICAgbGFzdE5hdmlnYXRpb24ucmF3VXJsLnRvU3RyaW5nKCkgPT09IHJhd1VybC50b1N0cmluZygpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpOyAgLy8gcmV0dXJuIHZhbHVlIGlzIG5vdCB1c2VkXG4gICAgfVxuXG4gICAgbGV0IHJlc29sdmU6IGFueSA9IG51bGw7XG4gICAgbGV0IHJlamVjdDogYW55ID0gbnVsbDtcblxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzLCByZWopID0+IHtcbiAgICAgIHJlc29sdmUgPSByZXM7XG4gICAgICByZWplY3QgPSByZWo7XG4gICAgfSk7XG5cbiAgICBjb25zdCBpZCA9ICsrdGhpcy5uYXZpZ2F0aW9uSWQ7XG4gICAgdGhpcy5zZXRUcmFuc2l0aW9uKHtcbiAgICAgIGlkLFxuICAgICAgc291cmNlLFxuICAgICAgcmVzdG9yZWRTdGF0ZSxcbiAgICAgIGN1cnJlbnRVcmxUcmVlOiB0aGlzLmN1cnJlbnRVcmxUcmVlLFxuICAgICAgY3VycmVudFJhd1VybDogdGhpcy5yYXdVcmxUcmVlLCByYXdVcmwsIGV4dHJhcywgcmVzb2x2ZSwgcmVqZWN0LCBwcm9taXNlLFxuICAgICAgY3VycmVudFNuYXBzaG90OiB0aGlzLnJvdXRlclN0YXRlLnNuYXBzaG90LFxuICAgICAgY3VycmVudFJvdXRlclN0YXRlOiB0aGlzLnJvdXRlclN0YXRlXG4gICAgfSk7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgZXJyb3IgaXMgcHJvcGFnYXRlZCBldmVuIHRob3VnaCBgcHJvY2Vzc05hdmlnYXRpb25zYCBjYXRjaFxuICAgIC8vIGhhbmRsZXIgZG9lcyBub3QgcmV0aHJvd1xuICAgIHJldHVybiBwcm9taXNlLmNhdGNoKChlOiBhbnkpID0+IHsgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpOyB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0QnJvd3NlclVybChcbiAgICAgIHVybDogVXJsVHJlZSwgcmVwbGFjZVVybDogYm9vbGVhbiwgaWQ6IG51bWJlciwgc3RhdGU/OiB7W2tleTogc3RyaW5nXTogYW55fSkge1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLnVybFNlcmlhbGl6ZXIuc2VyaWFsaXplKHVybCk7XG4gICAgc3RhdGUgPSBzdGF0ZSB8fCB7fTtcbiAgICBpZiAodGhpcy5sb2NhdGlvbi5pc0N1cnJlbnRQYXRoRXF1YWxUbyhwYXRoKSB8fCByZXBsYWNlVXJsKSB7XG4gICAgICAvLyBUT0RPKGphc29uYWRlbik6IFJlbW92ZSBmaXJzdCBgbmF2aWdhdGlvbklkYCBhbmQgcmVseSBvbiBgbmdgIG5hbWVzcGFjZS5cbiAgICAgIHRoaXMubG9jYXRpb24ucmVwbGFjZVN0YXRlKHBhdGgsICcnLCB7Li4uc3RhdGUsIG5hdmlnYXRpb25JZDogaWR9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2NhdGlvbi5nbyhwYXRoLCAnJywgey4uLnN0YXRlLCBuYXZpZ2F0aW9uSWQ6IGlkfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXNldFN0YXRlQW5kVXJsKHN0b3JlZFN0YXRlOiBSb3V0ZXJTdGF0ZSwgc3RvcmVkVXJsOiBVcmxUcmVlLCByYXdVcmw6IFVybFRyZWUpOiB2b2lkIHtcbiAgICAodGhpcyBhc3tyb3V0ZXJTdGF0ZTogUm91dGVyU3RhdGV9KS5yb3V0ZXJTdGF0ZSA9IHN0b3JlZFN0YXRlO1xuICAgIHRoaXMuY3VycmVudFVybFRyZWUgPSBzdG9yZWRVcmw7XG4gICAgdGhpcy5yYXdVcmxUcmVlID0gdGhpcy51cmxIYW5kbGluZ1N0cmF0ZWd5Lm1lcmdlKHRoaXMuY3VycmVudFVybFRyZWUsIHJhd1VybCk7XG4gICAgdGhpcy5yZXNldFVybFRvQ3VycmVudFVybFRyZWUoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRVcmxUb0N1cnJlbnRVcmxUcmVlKCk6IHZvaWQge1xuICAgIHRoaXMubG9jYXRpb24ucmVwbGFjZVN0YXRlKFxuICAgICAgICB0aGlzLnVybFNlcmlhbGl6ZXIuc2VyaWFsaXplKHRoaXMucmF3VXJsVHJlZSksICcnLCB7bmF2aWdhdGlvbklkOiB0aGlzLmxhc3RTdWNjZXNzZnVsSWR9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUNvbW1hbmRzKGNvbW1hbmRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbW1hbmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY21kID0gY29tbWFuZHNbaV07XG4gICAgaWYgKGNtZCA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSByZXF1ZXN0ZWQgcGF0aCBjb250YWlucyAke2NtZH0gc2VnbWVudCBhdCBpbmRleCAke2l9YCk7XG4gICAgfVxuICB9XG59XG4iXX0=