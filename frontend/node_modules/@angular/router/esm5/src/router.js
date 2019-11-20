/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
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
function defaultErrorHandler(error) {
    throw error;
}
function defaultMalformedUriErrorHandler(error, urlSerializer, url) {
    return urlSerializer.parse('/');
}
/**
 * @internal
 */
function defaultRouterHook(snapshot, runExtras) {
    return of(null);
}
/**
 * @description
 *
 * Provides the navigation and url manipulation capabilities.
 *
 * See `Routes` for more details and examples.
 *
 * @ngModule RouterModule
 *
 * @publicApi
 */
var Router = /** @class */ (function () {
    /**
     * Creates the router service.
     */
    // TODO: vsavkin make internal after the final is out.
    function Router(rootComponentType, urlSerializer, rootContexts, location, injector, loader, compiler, config) {
        var _this = this;
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
         * @internal
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
         * See {@link RouterModule} for more information.
         */
        this.relativeLinkResolution = 'legacy';
        var onLoadStart = function (r) { return _this.triggerEvent(new RouteConfigLoadStart(r)); };
        var onLoadEnd = function (r) { return _this.triggerEvent(new RouteConfigLoadEnd(r)); };
        this.ngModule = injector.get(NgModuleRef);
        this.console = injector.get(Console);
        var ngZone = injector.get(NgZone);
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
    Router.prototype.setupNavigations = function (transitions) {
        var _this = this;
        var eventsSubject = this.events;
        return transitions.pipe(filter(function (t) { return t.id !== 0; }), 
        // Extract URL
        map(function (t) { return (tslib_1.__assign({}, t, { extractedUrl: _this.urlHandlingStrategy.extract(t.rawUrl) })); }), 
        // Store the Navigation object
        tap(function (t) {
            _this.currentNavigation = {
                id: t.id,
                initialUrl: t.currentRawUrl,
                extractedUrl: t.extractedUrl,
                trigger: t.source,
                extras: t.extras,
                previousNavigation: _this.lastSuccessfulNavigation ? tslib_1.__assign({}, _this.lastSuccessfulNavigation, { previousNavigation: null }) :
                    null
            };
        }), 
        // Using switchMap so we cancel executing navigations when a new one comes in
        switchMap(function (t) {
            var completed = false;
            var errored = false;
            return of(t).pipe(switchMap(function (t) {
                var urlTransition = !_this.navigated || t.extractedUrl.toString() !== _this.browserUrlTree.toString();
                var processCurrentUrl = (_this.onSameUrlNavigation === 'reload' ? true : urlTransition) &&
                    _this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl);
                if (processCurrentUrl) {
                    return of(t).pipe(
                    // Fire NavigationStart event
                    switchMap(function (t) {
                        var transition = _this.transitions.getValue();
                        eventsSubject.next(new NavigationStart(t.id, _this.serializeUrl(t.extractedUrl), t.source, t.restoredState));
                        if (transition !== _this.transitions.getValue()) {
                            return EMPTY;
                        }
                        return [t];
                    }), 
                    // This delay is required to match old behavior that forced navigation to
                    // always be async
                    switchMap(function (t) { return Promise.resolve(t); }), 
                    // ApplyRedirects
                    applyRedirects(_this.ngModule.injector, _this.configLoader, _this.urlSerializer, _this.config), 
                    // Update the currentNavigation
                    tap(function (t) {
                        _this.currentNavigation = tslib_1.__assign({}, _this.currentNavigation, { finalUrl: t.urlAfterRedirects });
                    }), 
                    // Recognize
                    recognize(_this.rootComponentType, _this.config, function (url) { return _this.serializeUrl(url); }, _this.paramsInheritanceStrategy, _this.relativeLinkResolution), 
                    // Update URL if in `eager` update mode
                    tap(function (t) {
                        if (_this.urlUpdateStrategy === 'eager') {
                            if (!t.extras.skipLocationChange) {
                                _this.setBrowserUrl(t.urlAfterRedirects, !!t.extras.replaceUrl, t.id);
                            }
                            _this.browserUrlTree = t.urlAfterRedirects;
                        }
                    }), 
                    // Fire RoutesRecognized
                    tap(function (t) {
                        var routesRecognized = new RoutesRecognized(t.id, _this.serializeUrl(t.extractedUrl), _this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                        eventsSubject.next(routesRecognized);
                    }));
                }
                else {
                    var processPreviousUrl = urlTransition && _this.rawUrlTree &&
                        _this.urlHandlingStrategy.shouldProcessUrl(_this.rawUrlTree);
                    /* When the current URL shouldn't be processed, but the previous one was, we
                     * handle this "error condition" by navigating to the previously successful URL,
                     * but leaving the URL intact.*/
                    if (processPreviousUrl) {
                        var id = t.id, extractedUrl = t.extractedUrl, source = t.source, restoredState = t.restoredState, extras = t.extras;
                        var navStart = new NavigationStart(id, _this.serializeUrl(extractedUrl), source, restoredState);
                        eventsSubject.next(navStart);
                        var targetSnapshot = createEmptyState(extractedUrl, _this.rootComponentType).snapshot;
                        return of(tslib_1.__assign({}, t, { targetSnapshot: targetSnapshot, urlAfterRedirects: extractedUrl, extras: tslib_1.__assign({}, extras, { skipLocationChange: false, replaceUrl: false }) }));
                    }
                    else {
                        /* When neither the current or previous URL can be processed, do nothing other
                         * than update router's internal reference to the current "settled" URL. This
                         * way the next navigation will be coming from the current URL in the browser.
                         */
                        _this.rawUrlTree = t.rawUrl;
                        t.resolve(null);
                        return EMPTY;
                    }
                }
            }), 
            // Before Preactivation
            switchTap(function (t) {
                var targetSnapshot = t.targetSnapshot, navigationId = t.id, appliedUrlTree = t.extractedUrl, rawUrlTree = t.rawUrl, _a = t.extras, skipLocationChange = _a.skipLocationChange, replaceUrl = _a.replaceUrl;
                return _this.hooks.beforePreactivation(targetSnapshot, {
                    navigationId: navigationId,
                    appliedUrlTree: appliedUrlTree,
                    rawUrlTree: rawUrlTree,
                    skipLocationChange: !!skipLocationChange,
                    replaceUrl: !!replaceUrl,
                });
            }), 
            // --- GUARDS ---
            tap(function (t) {
                var guardsStart = new GuardsCheckStart(t.id, _this.serializeUrl(t.extractedUrl), _this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                _this.triggerEvent(guardsStart);
            }), map(function (t) { return (tslib_1.__assign({}, t, { guards: getAllRouteGuards(t.targetSnapshot, t.currentSnapshot, _this.rootContexts) })); }), checkGuards(_this.ngModule.injector, function (evt) { return _this.triggerEvent(evt); }), tap(function (t) {
                if (isUrlTree(t.guardsResult)) {
                    var error = navigationCancelingError("Redirecting to \"" + _this.serializeUrl(t.guardsResult) + "\"");
                    error.url = t.guardsResult;
                    throw error;
                }
            }), tap(function (t) {
                var guardsEnd = new GuardsCheckEnd(t.id, _this.serializeUrl(t.extractedUrl), _this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot, !!t.guardsResult);
                _this.triggerEvent(guardsEnd);
            }), filter(function (t) {
                if (!t.guardsResult) {
                    _this.resetUrlToCurrentUrlTree();
                    var navCancel = new NavigationCancel(t.id, _this.serializeUrl(t.extractedUrl), '');
                    eventsSubject.next(navCancel);
                    t.resolve(false);
                    return false;
                }
                return true;
            }), 
            // --- RESOLVE ---
            switchTap(function (t) {
                if (t.guards.canActivateChecks.length) {
                    return of(t).pipe(tap(function (t) {
                        var resolveStart = new ResolveStart(t.id, _this.serializeUrl(t.extractedUrl), _this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                        _this.triggerEvent(resolveStart);
                    }), resolveData(_this.paramsInheritanceStrategy, _this.ngModule.injector), //
                    tap(function (t) {
                        var resolveEnd = new ResolveEnd(t.id, _this.serializeUrl(t.extractedUrl), _this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                        _this.triggerEvent(resolveEnd);
                    }));
                }
                return undefined;
            }), 
            // --- AFTER PREACTIVATION ---
            switchTap(function (t) {
                var targetSnapshot = t.targetSnapshot, navigationId = t.id, appliedUrlTree = t.extractedUrl, rawUrlTree = t.rawUrl, _a = t.extras, skipLocationChange = _a.skipLocationChange, replaceUrl = _a.replaceUrl;
                return _this.hooks.afterPreactivation(targetSnapshot, {
                    navigationId: navigationId,
                    appliedUrlTree: appliedUrlTree,
                    rawUrlTree: rawUrlTree,
                    skipLocationChange: !!skipLocationChange,
                    replaceUrl: !!replaceUrl,
                });
            }), map(function (t) {
                var targetRouterState = createRouterState(_this.routeReuseStrategy, t.targetSnapshot, t.currentRouterState);
                return (tslib_1.__assign({}, t, { targetRouterState: targetRouterState }));
            }), 
            /* Once here, we are about to activate syncronously. The assumption is this will
               succeed, and user code may read from the Router service. Therefore before
               activation, we need to update router properties storing the current URL and the
               RouterState, as well as updated the browser URL. All this should happen *before*
               activating. */
            tap(function (t) {
                _this.currentUrlTree = t.urlAfterRedirects;
                _this.rawUrlTree = _this.urlHandlingStrategy.merge(_this.currentUrlTree, t.rawUrl);
                _this.routerState = t.targetRouterState;
                if (_this.urlUpdateStrategy === 'deferred') {
                    if (!t.extras.skipLocationChange) {
                        _this.setBrowserUrl(_this.rawUrlTree, !!t.extras.replaceUrl, t.id, t.extras.state);
                    }
                    _this.browserUrlTree = t.urlAfterRedirects;
                }
            }), activateRoutes(_this.rootContexts, _this.routeReuseStrategy, function (evt) { return _this.triggerEvent(evt); }), tap({ next: function () { completed = true; }, complete: function () { completed = true; } }), finalize(function () {
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
                    _this.resetUrlToCurrentUrlTree();
                    var navCancel = new NavigationCancel(t.id, _this.serializeUrl(t.extractedUrl), "Navigation ID " + t.id + " is not equal to the current navigation id " + _this.navigationId);
                    eventsSubject.next(navCancel);
                    t.resolve(false);
                }
                // currentNavigation should always be reset to null here. If navigation was
                // successful, lastSuccessfulTransition will have already been set. Therefore we
                // can safely set currentNavigation to null here.
                _this.currentNavigation = null;
            }), catchError(function (e) {
                errored = true;
                /* This error type is issued during Redirect, and is handled as a cancellation
                 * rather than an error. */
                if (isNavigationCancelingError(e)) {
                    var redirecting = isUrlTree(e.url);
                    if (!redirecting) {
                        // Set property only if we're not redirecting. If we landed on a page and
                        // redirect to `/` route, the new navigation is going to see the `/` isn't
                        // a change from the default currentUrlTree and won't navigate. This is
                        // only applicable with initial navigation, so setting `navigated` only when
                        // not redirecting resolves this scenario.
                        _this.navigated = true;
                        _this.resetStateAndUrl(t.currentRouterState, t.currentUrlTree, t.rawUrl);
                    }
                    var navCancel = new NavigationCancel(t.id, _this.serializeUrl(t.extractedUrl), e.message);
                    eventsSubject.next(navCancel);
                    t.resolve(false);
                    if (redirecting) {
                        _this.navigateByUrl(e.url);
                    }
                    /* All other errors should reset to the router's internal URL reference to the
                     * pre-error state. */
                }
                else {
                    _this.resetStateAndUrl(t.currentRouterState, t.currentUrlTree, t.rawUrl);
                    var navError = new NavigationError(t.id, _this.serializeUrl(t.extractedUrl), e);
                    eventsSubject.next(navError);
                    try {
                        t.resolve(_this.errorHandler(e));
                    }
                    catch (ee) {
                        t.reject(ee);
                    }
                }
                return EMPTY;
            }));
            // TODO(jasonaden): remove cast once g3 is on updated TypeScript
        }));
    };
    /**
     * @internal
     * TODO: this should be removed once the constructor of the router made internal
     */
    Router.prototype.resetRootComponentType = function (rootComponentType) {
        this.rootComponentType = rootComponentType;
        // TODO: vsavkin router 4.0 should make the root component set to null
        // this will simplify the lifecycle of the router.
        this.routerState.root.component = this.rootComponentType;
    };
    Router.prototype.getTransition = function () { return this.transitions.value; };
    Router.prototype.setTransition = function (t) {
        this.transitions.next(tslib_1.__assign({}, this.getTransition(), t));
    };
    /**
     * Sets up the location change listener and performs the initial navigation.
     */
    Router.prototype.initialNavigation = function () {
        this.setUpLocationChangeListener();
        if (this.navigationId === 0) {
            this.navigateByUrl(this.location.path(true), { replaceUrl: true });
        }
    };
    /**
     * Sets up the location change listener.
     */
    Router.prototype.setUpLocationChangeListener = function () {
        var _this = this;
        // Don't need to use Zone.wrap any more, because zone.js
        // already patch onPopState, so location change callback will
        // run into ngZone
        if (!this.locationSubscription) {
            this.locationSubscription = this.location.subscribe(function (change) {
                var rawUrlTree = _this.parseUrl(change['url']);
                var source = change['type'] === 'popstate' ? 'popstate' : 'hashchange';
                // Navigations coming from Angular router have a navigationId state property. When this
                // exists, restore the state.
                var state = change.state && change.state.navigationId ? change.state : null;
                setTimeout(function () { _this.scheduleNavigation(rawUrlTree, source, state, { replaceUrl: true }); }, 0);
            });
        }
    };
    Object.defineProperty(Router.prototype, "url", {
        /** The current url */
        get: function () { return this.serializeUrl(this.currentUrlTree); },
        enumerable: true,
        configurable: true
    });
    /** The current Navigation object if one exists */
    Router.prototype.getCurrentNavigation = function () { return this.currentNavigation; };
    /** @internal */
    Router.prototype.triggerEvent = function (event) { this.events.next(event); };
    /**
     * Resets the configuration used for navigation and generating links.
     *
     * @usageNotes
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
     */
    Router.prototype.resetConfig = function (config) {
        validateConfig(config);
        this.config = config.map(standardizeConfig);
        this.navigated = false;
        this.lastSuccessfulId = -1;
    };
    /** @docsNotRequired */
    Router.prototype.ngOnDestroy = function () { this.dispose(); };
    /** Disposes of the router */
    Router.prototype.dispose = function () {
        if (this.locationSubscription) {
            this.locationSubscription.unsubscribe();
            this.locationSubscription = null;
        }
    };
    /**
     * Applies an array of commands to the current url tree and creates a new url tree.
     *
     * When given an activate route, applies the given commands starting from the route.
     * When not given a route, applies the given command starting from the root.
     *
     * @usageNotes
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
     */
    Router.prototype.createUrlTree = function (commands, navigationExtras) {
        if (navigationExtras === void 0) { navigationExtras = {}; }
        var relativeTo = navigationExtras.relativeTo, queryParams = navigationExtras.queryParams, fragment = navigationExtras.fragment, preserveQueryParams = navigationExtras.preserveQueryParams, queryParamsHandling = navigationExtras.queryParamsHandling, preserveFragment = navigationExtras.preserveFragment;
        if (isDevMode() && preserveQueryParams && console && console.warn) {
            console.warn('preserveQueryParams is deprecated, use queryParamsHandling instead.');
        }
        var a = relativeTo || this.routerState.root;
        var f = preserveFragment ? this.currentUrlTree.fragment : fragment;
        var q = null;
        if (queryParamsHandling) {
            switch (queryParamsHandling) {
                case 'merge':
                    q = tslib_1.__assign({}, this.currentUrlTree.queryParams, queryParams);
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
        return createUrlTree(a, this.currentUrlTree, commands, q, f);
    };
    /**
     * Navigate based on the provided url. This navigation is always absolute.
     *
     * Returns a promise that:
     * - resolves to 'true' when navigation succeeds,
     * - resolves to 'false' when navigation fails,
     * - is rejected when an error happens.
     *
     * @usageNotes
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
     */
    Router.prototype.navigateByUrl = function (url, extras) {
        if (extras === void 0) { extras = { skipLocationChange: false }; }
        if (isDevMode() && this.isNgZoneEnabled && !NgZone.isInAngularZone()) {
            this.console.warn("Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?");
        }
        var urlTree = isUrlTree(url) ? url : this.parseUrl(url);
        var mergedTree = this.urlHandlingStrategy.merge(urlTree, this.rawUrlTree);
        return this.scheduleNavigation(mergedTree, 'imperative', null, extras);
    };
    /**
     * Navigate based on the provided array of commands and a starting point.
     * If no starting route is provided, the navigation is absolute.
     *
     * Returns a promise that:
     * - resolves to 'true' when navigation succeeds,
     * - resolves to 'false' when navigation fails,
     * - is rejected when an error happens.
     *
     * @usageNotes
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
     */
    Router.prototype.navigate = function (commands, extras) {
        if (extras === void 0) { extras = { skipLocationChange: false }; }
        validateCommands(commands);
        return this.navigateByUrl(this.createUrlTree(commands, extras), extras);
    };
    /** Serializes a `UrlTree` into a string */
    Router.prototype.serializeUrl = function (url) { return this.urlSerializer.serialize(url); };
    /** Parses a string into a `UrlTree` */
    Router.prototype.parseUrl = function (url) {
        var urlTree;
        try {
            urlTree = this.urlSerializer.parse(url);
        }
        catch (e) {
            urlTree = this.malformedUriErrorHandler(e, this.urlSerializer, url);
        }
        return urlTree;
    };
    /** Returns whether the url is activated */
    Router.prototype.isActive = function (url, exact) {
        if (isUrlTree(url)) {
            return containsTree(this.currentUrlTree, url, exact);
        }
        var urlTree = this.parseUrl(url);
        return containsTree(this.currentUrlTree, urlTree, exact);
    };
    Router.prototype.removeEmptyProps = function (params) {
        return Object.keys(params).reduce(function (result, key) {
            var value = params[key];
            if (value !== null && value !== undefined) {
                result[key] = value;
            }
            return result;
        }, {});
    };
    Router.prototype.processNavigations = function () {
        var _this = this;
        this.navigations.subscribe(function (t) {
            _this.navigated = true;
            _this.lastSuccessfulId = t.id;
            _this.events
                .next(new NavigationEnd(t.id, _this.serializeUrl(t.extractedUrl), _this.serializeUrl(_this.currentUrlTree)));
            _this.lastSuccessfulNavigation = _this.currentNavigation;
            _this.currentNavigation = null;
            t.resolve(true);
        }, function (e) { _this.console.warn("Unhandled Navigation Error: "); });
    };
    Router.prototype.scheduleNavigation = function (rawUrl, source, restoredState, extras) {
        var lastNavigation = this.getTransition();
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
        var resolve = null;
        var reject = null;
        var promise = new Promise(function (res, rej) {
            resolve = res;
            reject = rej;
        });
        var id = ++this.navigationId;
        this.setTransition({
            id: id,
            source: source,
            restoredState: restoredState,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.rawUrlTree, rawUrl: rawUrl, extras: extras, resolve: resolve, reject: reject, promise: promise,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState
        });
        // Make sure that the error is propagated even though `processNavigations` catch
        // handler does not rethrow
        return promise.catch(function (e) { return Promise.reject(e); });
    };
    Router.prototype.setBrowserUrl = function (url, replaceUrl, id, state) {
        var path = this.urlSerializer.serialize(url);
        state = state || {};
        if (this.location.isCurrentPathEqualTo(path) || replaceUrl) {
            // TODO(jasonaden): Remove first `navigationId` and rely on `ng` namespace.
            this.location.replaceState(path, '', tslib_1.__assign({}, state, { navigationId: id }));
        }
        else {
            this.location.go(path, '', tslib_1.__assign({}, state, { navigationId: id }));
        }
    };
    Router.prototype.resetStateAndUrl = function (storedState, storedUrl, rawUrl) {
        this.routerState = storedState;
        this.currentUrlTree = storedUrl;
        this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, rawUrl);
        this.resetUrlToCurrentUrlTree();
    };
    Router.prototype.resetUrlToCurrentUrlTree = function () {
        this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), '', { navigationId: this.lastSuccessfulId });
    };
    return Router;
}());
export { Router };
function validateCommands(commands) {
    for (var i = 0; i < commands.length; i++) {
        var cmd = commands[i];
        if (cmd == null) {
            throw new Error("The requested path contains " + cmd + " segment at index " + i);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3NyYy9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUdILE9BQU8sRUFBNEMsV0FBVyxFQUFFLE1BQU0sRUFBUSxTQUFTLEVBQUUsUUFBUSxJQUFJLE9BQU8sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuSSxPQUFPLEVBQUMsZUFBZSxFQUFFLEtBQUssRUFBYyxPQUFPLEVBQXVCLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRixPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRixPQUFPLEVBQXFDLGlCQUFpQixFQUFFLGNBQWMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUMvRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFRLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBcUIsVUFBVSxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUM3TyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFN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Q0FBQztTQUMxRDtJQUNILENBQUM7SUFFTyxpQ0FBZ0IsR0FBeEIsVUFBeUIsV0FBd0IsRUFBRSxTQUFrQixFQUFFLE1BQWU7UUFDbkYsSUFBa0MsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQzlELElBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFTyx5Q0FBd0IsR0FBaEM7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUFDSCxhQUFDO0FBQUQsQ0FBQyxBQXJ6QkQsSUFxekJDOztBQUVELFNBQVMsZ0JBQWdCLENBQUMsUUFBa0I7SUFDMUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDeEMsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQStCLEdBQUcsMEJBQXFCLENBQUcsQ0FBQyxDQUFDO1NBQzdFO0tBQ0Y7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtDb21waWxlciwgSW5qZWN0b3IsIE5nTW9kdWxlRmFjdG9yeUxvYWRlciwgTmdNb2R1bGVSZWYsIE5nWm9uZSwgVHlwZSwgaXNEZXZNb2RlLCDJtUNvbnNvbGUgYXMgQ29uc29sZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgRU1QVFksIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiwgZGVmZXIsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2NhdGNoRXJyb3IsIGZpbHRlciwgZmluYWxpemUsIG1hcCwgc3dpdGNoTWFwLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtRdWVyeVBhcmFtc0hhbmRsaW5nLCBSb3V0ZSwgUm91dGVzLCBzdGFuZGFyZGl6ZUNvbmZpZywgdmFsaWRhdGVDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7Y3JlYXRlUm91dGVyU3RhdGV9IGZyb20gJy4vY3JlYXRlX3JvdXRlcl9zdGF0ZSc7XG5pbXBvcnQge2NyZWF0ZVVybFRyZWV9IGZyb20gJy4vY3JlYXRlX3VybF90cmVlJztcbmltcG9ydCB7RXZlbnQsIEd1YXJkc0NoZWNrRW5kLCBHdWFyZHNDaGVja1N0YXJ0LCBOYXZpZ2F0aW9uQ2FuY2VsLCBOYXZpZ2F0aW9uRW5kLCBOYXZpZ2F0aW9uRXJyb3IsIE5hdmlnYXRpb25TdGFydCwgTmF2aWdhdGlvblRyaWdnZXIsIFJlc29sdmVFbmQsIFJlc29sdmVTdGFydCwgUm91dGVDb25maWdMb2FkRW5kLCBSb3V0ZUNvbmZpZ0xvYWRTdGFydCwgUm91dGVzUmVjb2duaXplZH0gZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IHthY3RpdmF0ZVJvdXRlc30gZnJvbSAnLi9vcGVyYXRvcnMvYWN0aXZhdGVfcm91dGVzJztcbmltcG9ydCB7YXBwbHlSZWRpcmVjdHN9IGZyb20gJy4vb3BlcmF0b3JzL2FwcGx5X3JlZGlyZWN0cyc7XG5pbXBvcnQge2NoZWNrR3VhcmRzfSBmcm9tICcuL29wZXJhdG9ycy9jaGVja19ndWFyZHMnO1xuaW1wb3J0IHtyZWNvZ25pemV9IGZyb20gJy4vb3BlcmF0b3JzL3JlY29nbml6ZSc7XG5pbXBvcnQge3Jlc29sdmVEYXRhfSBmcm9tICcuL29wZXJhdG9ycy9yZXNvbHZlX2RhdGEnO1xuaW1wb3J0IHtzd2l0Y2hUYXB9IGZyb20gJy4vb3BlcmF0b3JzL3N3aXRjaF90YXAnO1xuaW1wb3J0IHtEZWZhdWx0Um91dGVSZXVzZVN0cmF0ZWd5LCBSb3V0ZVJldXNlU3RyYXRlZ3l9IGZyb20gJy4vcm91dGVfcmV1c2Vfc3RyYXRlZ3knO1xuaW1wb3J0IHtSb3V0ZXJDb25maWdMb2FkZXJ9IGZyb20gJy4vcm91dGVyX2NvbmZpZ19sb2FkZXInO1xuaW1wb3J0IHtDaGlsZHJlbk91dGxldENvbnRleHRzfSBmcm9tICcuL3JvdXRlcl9vdXRsZXRfY29udGV4dCc7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlLCBSb3V0ZXJTdGF0ZSwgUm91dGVyU3RhdGVTbmFwc2hvdCwgY3JlYXRlRW1wdHlTdGF0ZX0gZnJvbSAnLi9yb3V0ZXJfc3RhdGUnO1xuaW1wb3J0IHtQYXJhbXMsIGlzTmF2aWdhdGlvbkNhbmNlbGluZ0Vycm9yLCBuYXZpZ2F0aW9uQ2FuY2VsaW5nRXJyb3J9IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7RGVmYXVsdFVybEhhbmRsaW5nU3RyYXRlZ3ksIFVybEhhbmRsaW5nU3RyYXRlZ3l9IGZyb20gJy4vdXJsX2hhbmRsaW5nX3N0cmF0ZWd5JztcbmltcG9ydCB7VXJsU2VyaWFsaXplciwgVXJsVHJlZSwgY29udGFpbnNUcmVlLCBjcmVhdGVFbXB0eVVybFRyZWV9IGZyb20gJy4vdXJsX3RyZWUnO1xuaW1wb3J0IHtDaGVja3MsIGdldEFsbFJvdXRlR3VhcmRzfSBmcm9tICcuL3V0aWxzL3ByZWFjdGl2YXRpb24nO1xuaW1wb3J0IHtpc1VybFRyZWV9IGZyb20gJy4vdXRpbHMvdHlwZV9ndWFyZHMnO1xuXG5cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBSZXByZXNlbnRzIHRoZSBleHRyYSBvcHRpb25zIHVzZWQgZHVyaW5nIG5hdmlnYXRpb24uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5hdmlnYXRpb25FeHRyYXMge1xuICAvKipcbiAgICogRW5hYmxlcyByZWxhdGl2ZSBuYXZpZ2F0aW9uIGZyb20gdGhlIGN1cnJlbnQgQWN0aXZhdGVkUm91dGUuXG4gICAqXG4gICAqIENvbmZpZ3VyYXRpb246XG4gICAqXG4gICAqIGBgYFxuICAgKiBbe1xuICAqICAgcGF0aDogJ3BhcmVudCcsXG4gICogICBjb21wb25lbnQ6IFBhcmVudENvbXBvbmVudCxcbiAgKiAgIGNoaWxkcmVuOiBbe1xuICAqICAgICBwYXRoOiAnbGlzdCcsXG4gICogICAgIGNvbXBvbmVudDogTGlzdENvbXBvbmVudFxuICAqICAgfSx7XG4gICogICAgIHBhdGg6ICdjaGlsZCcsXG4gICogICAgIGNvbXBvbmVudDogQ2hpbGRDb21wb25lbnRcbiAgKiAgIH1dXG4gICogfV1cbiAgICogYGBgXG4gICAqXG4gICAqIE5hdmlnYXRlIHRvIGxpc3Qgcm91dGUgZnJvbSBjaGlsZCByb3V0ZTpcbiAgICpcbiAgICogYGBgXG4gICAqICBAQ29tcG9uZW50KHsuLi59KVxuICAgKiAgY2xhc3MgQ2hpbGRDb21wb25lbnQge1xuICAqICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7fVxuICAqXG4gICogICAgZ28oKSB7XG4gICogICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4uL2xpc3QnXSwgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlIH0pO1xuICAqICAgIH1cbiAgKiAgfVxuICAgKiBgYGBcbiAgICovXG4gIHJlbGF0aXZlVG8/OiBBY3RpdmF0ZWRSb3V0ZXxudWxsO1xuXG4gIC8qKlxuICAgKiBTZXRzIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gdGhlIFVSTC5cbiAgICpcbiAgICogYGBgXG4gICAqIC8vIE5hdmlnYXRlIHRvIC9yZXN1bHRzP3BhZ2U9MVxuICAgKiB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9yZXN1bHRzJ10sIHsgcXVlcnlQYXJhbXM6IHsgcGFnZTogMSB9IH0pO1xuICAgKiBgYGBcbiAgICovXG4gIHF1ZXJ5UGFyYW1zPzogUGFyYW1zfG51bGw7XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGhhc2ggZnJhZ21lbnQgZm9yIHRoZSBVUkwuXG4gICAqXG4gICAqIGBgYFxuICAgKiAvLyBOYXZpZ2F0ZSB0byAvcmVzdWx0cyN0b3BcbiAgICogdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcmVzdWx0cyddLCB7IGZyYWdtZW50OiAndG9wJyB9KTtcbiAgICogYGBgXG4gICAqL1xuICBmcmFnbWVudD86IHN0cmluZztcblxuICAvKipcbiAgICogUHJlc2VydmVzIHRoZSBxdWVyeSBwYXJhbWV0ZXJzIGZvciB0aGUgbmV4dCBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiBkZXByZWNhdGVkLCB1c2UgYHF1ZXJ5UGFyYW1zSGFuZGxpbmdgIGluc3RlYWRcbiAgICpcbiAgICogYGBgXG4gICAqIC8vIFByZXNlcnZlIHF1ZXJ5IHBhcmFtcyBmcm9tIC9yZXN1bHRzP3BhZ2U9MSB0byAvdmlldz9wYWdlPTFcbiAgICogdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvdmlldyddLCB7IHByZXNlcnZlUXVlcnlQYXJhbXM6IHRydWUgfSk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2NFxuICAgKi9cbiAgcHJlc2VydmVRdWVyeVBhcmFtcz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqICBjb25maWcgc3RyYXRlZ3kgdG8gaGFuZGxlIHRoZSBxdWVyeSBwYXJhbWV0ZXJzIGZvciB0aGUgbmV4dCBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiBgYGBcbiAgICogLy8gZnJvbSAvcmVzdWx0cz9wYWdlPTEgdG8gL3ZpZXc/cGFnZT0xJnBhZ2U9MlxuICAgKiB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy92aWV3J10sIHsgcXVlcnlQYXJhbXM6IHsgcGFnZTogMiB9LCAgcXVlcnlQYXJhbXNIYW5kbGluZzogXCJtZXJnZVwiIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIHF1ZXJ5UGFyYW1zSGFuZGxpbmc/OiBRdWVyeVBhcmFtc0hhbmRsaW5nfG51bGw7XG4gIC8qKlxuICAgKiBQcmVzZXJ2ZXMgdGhlIGZyYWdtZW50IGZvciB0aGUgbmV4dCBuYXZpZ2F0aW9uXG4gICAqXG4gICAqIGBgYFxuICAgKiAvLyBQcmVzZXJ2ZSBmcmFnbWVudCBmcm9tIC9yZXN1bHRzI3RvcCB0byAvdmlldyN0b3BcbiAgICogdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvdmlldyddLCB7IHByZXNlcnZlRnJhZ21lbnQ6IHRydWUgfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgcHJlc2VydmVGcmFnbWVudD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBOYXZpZ2F0ZXMgd2l0aG91dCBwdXNoaW5nIGEgbmV3IHN0YXRlIGludG8gaGlzdG9yeS5cbiAgICpcbiAgICogYGBgXG4gICAqIC8vIE5hdmlnYXRlIHNpbGVudGx5IHRvIC92aWV3XG4gICAqIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3ZpZXcnXSwgeyBza2lwTG9jYXRpb25DaGFuZ2U6IHRydWUgfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgc2tpcExvY2F0aW9uQ2hhbmdlPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIE5hdmlnYXRlcyB3aGlsZSByZXBsYWNpbmcgdGhlIGN1cnJlbnQgc3RhdGUgaW4gaGlzdG9yeS5cbiAgICpcbiAgICogYGBgXG4gICAqIC8vIE5hdmlnYXRlIHRvIC92aWV3XG4gICAqIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3ZpZXcnXSwgeyByZXBsYWNlVXJsOiB0cnVlIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIHJlcGxhY2VVcmw/OiBib29sZWFuO1xuICAvKipcbiAgICogU3RhdGUgcGFzc2VkIHRvIGFueSBuYXZpZ2F0aW9uLiBUaGlzIHZhbHVlIHdpbGwgYmUgYWNjZXNzaWJsZSB0aHJvdWdoIHRoZSBgZXh0cmFzYCBvYmplY3RcbiAgICogcmV0dXJuZWQgZnJvbSBgcm91dGVyLmdldEN1cnJlbnROYXZpZ2F0aW9uKClgIHdoaWxlIGEgbmF2aWdhdGlvbiBpcyBleGVjdXRpbmcuIE9uY2UgYVxuICAgKiBuYXZpZ2F0aW9uIGNvbXBsZXRlcywgdGhpcyB2YWx1ZSB3aWxsIGJlIHdyaXR0ZW4gdG8gYGhpc3Rvcnkuc3RhdGVgIHdoZW4gdGhlIGBsb2NhdGlvbi5nb2BcbiAgICogb3IgYGxvY2F0aW9uLnJlcGxhY2VTdGF0ZWAgbWV0aG9kIGlzIGNhbGxlZCBiZWZvcmUgYWN0aXZhdGluZyBvZiB0aGlzIHJvdXRlLiBOb3RlIHRoYXRcbiAgICogYGhpc3Rvcnkuc3RhdGVgIHdpbGwgbm90IHBhc3MgYW4gb2JqZWN0IGVxdWFsaXR5IHRlc3QgYmVjYXVzZSB0aGUgYG5hdmlnYXRpb25JZGAgd2lsbCBiZVxuICAgKiBhZGRlZCB0byB0aGUgc3RhdGUgYmVmb3JlIGJlaW5nIHdyaXR0ZW4uXG4gICAqXG4gICAqIFdoaWxlIGBoaXN0b3J5LnN0YXRlYCBjYW4gYWNjZXB0IGFueSB0eXBlIG9mIHZhbHVlLCBiZWNhdXNlIHRoZSByb3V0ZXIgYWRkcyB0aGUgYG5hdmlnYXRpb25JZGBcbiAgICogb24gZWFjaCBuYXZpZ2F0aW9uLCB0aGUgYHN0YXRlYCBtdXN0IGFsd2F5cyBiZSBhbiBvYmplY3QuXG4gICAqL1xuICBzdGF0ZT86IHtbazogc3RyaW5nXTogYW55fTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBFcnJvciBoYW5kbGVyIHRoYXQgaXMgaW52b2tlZCB3aGVuIGEgbmF2aWdhdGlvbiBlcnJvcnMuXG4gKlxuICogSWYgdGhlIGhhbmRsZXIgcmV0dXJucyBhIHZhbHVlLCB0aGUgbmF2aWdhdGlvbiBwcm9taXNlIHdpbGwgYmUgcmVzb2x2ZWQgd2l0aCB0aGlzIHZhbHVlLlxuICogSWYgdGhlIGhhbmRsZXIgdGhyb3dzIGFuIGV4Y2VwdGlvbiwgdGhlIG5hdmlnYXRpb24gcHJvbWlzZSB3aWxsIGJlIHJlamVjdGVkIHdpdGhcbiAqIHRoZSBleGNlcHRpb24uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgdHlwZSBFcnJvckhhbmRsZXIgPSAoZXJyb3I6IGFueSkgPT4gYW55O1xuXG5mdW5jdGlvbiBkZWZhdWx0RXJyb3JIYW5kbGVyKGVycm9yOiBhbnkpOiBhbnkge1xuICB0aHJvdyBlcnJvcjtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdE1hbGZvcm1lZFVyaUVycm9ySGFuZGxlcihcbiAgICBlcnJvcjogVVJJRXJyb3IsIHVybFNlcmlhbGl6ZXI6IFVybFNlcmlhbGl6ZXIsIHVybDogc3RyaW5nKTogVXJsVHJlZSB7XG4gIHJldHVybiB1cmxTZXJpYWxpemVyLnBhcnNlKCcvJyk7XG59XG5cbmV4cG9ydCB0eXBlIFJlc3RvcmVkU3RhdGUgPSB7XG4gIFtrOiBzdHJpbmddOiBhbnk7IG5hdmlnYXRpb25JZDogbnVtYmVyO1xufTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBJbmZvcm1hdGlvbiBhYm91dCBhbnkgZ2l2ZW4gbmF2aWdhdGlvbi4gVGhpcyBpbmZvcm1hdGlvbiBjYW4gYmUgZ290dGVuIGZyb20gdGhlIHJvdXRlciBhdFxuICogYW55IHRpbWUgdXNpbmcgdGhlIGByb3V0ZXIuZ2V0Q3VycmVudE5hdmlnYXRpb24oKWAgbWV0aG9kLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IHR5cGUgTmF2aWdhdGlvbiA9IHtcbiAgLyoqXG4gICAqIFRoZSBJRCBvZiB0aGUgY3VycmVudCBuYXZpZ2F0aW9uLlxuICAgKi9cbiAgaWQ6IG51bWJlcjtcbiAgLyoqXG4gICAqIFRhcmdldCBVUkwgcGFzc2VkIGludG8gdGhlIHtAbGluayBSb3V0ZXIjbmF2aWdhdGVCeVVybH0gY2FsbCBiZWZvcmUgbmF2aWdhdGlvbi4gVGhpcyBpc1xuICAgKiB0aGUgdmFsdWUgYmVmb3JlIHRoZSByb3V0ZXIgaGFzIHBhcnNlZCBvciBhcHBsaWVkIHJlZGlyZWN0cyB0byBpdC5cbiAgICovXG4gIGluaXRpYWxVcmw6IHN0cmluZyB8IFVybFRyZWU7XG4gIC8qKlxuICAgKiBUaGUgaW5pdGlhbCB0YXJnZXQgVVJMIGFmdGVyIGJlaW5nIHBhcnNlZCB3aXRoIHtAbGluayBVcmxTZXJpYWxpemVyLmV4dHJhY3QoKX0uXG4gICAqL1xuICBleHRyYWN0ZWRVcmw6IFVybFRyZWU7XG4gIC8qKlxuICAgKiBFeHRyYWN0ZWQgVVJMIGFmdGVyIHJlZGlyZWN0cyBoYXZlIGJlZW4gYXBwbGllZC4gVGhpcyBVUkwgbWF5IG5vdCBiZSBhdmFpbGFibGUgaW1tZWRpYXRlbHksXG4gICAqIHRoZXJlZm9yZSB0aGlzIHByb3BlcnR5IGNhbiBiZSBgdW5kZWZpbmVkYC4gSXQgaXMgZ3VhcmFudGVlZCB0byBiZSBzZXQgYWZ0ZXIgdGhlXG4gICAqIHtAbGluayBSb3V0ZXNSZWNvZ25pemVkfSBldmVudCBmaXJlcy5cbiAgICovXG4gIGZpbmFsVXJsPzogVXJsVHJlZTtcbiAgLyoqXG4gICAqIElkZW50aWZpZXMgdGhlIHRyaWdnZXIgb2YgdGhlIG5hdmlnYXRpb24uXG4gICAqXG4gICAqICogJ2ltcGVyYXRpdmUnLS10cmlnZ2VyZWQgYnkgYHJvdXRlci5uYXZpZ2F0ZUJ5VXJsYCBvciBgcm91dGVyLm5hdmlnYXRlYC5cbiAgICogKiAncG9wc3RhdGUnLS10cmlnZ2VyZWQgYnkgYSBwb3BzdGF0ZSBldmVudFxuICAgKiAqICdoYXNoY2hhbmdlJy0tdHJpZ2dlcmVkIGJ5IGEgaGFzaGNoYW5nZSBldmVudFxuICAgKi9cbiAgdHJpZ2dlcjogJ2ltcGVyYXRpdmUnIHwgJ3BvcHN0YXRlJyB8ICdoYXNoY2hhbmdlJztcbiAgLyoqXG4gICAqIFRoZSBOYXZpZ2F0aW9uRXh0cmFzIHVzZWQgaW4gdGhpcyBuYXZpZ2F0aW9uLiBTZWUge0BsaW5rIE5hdmlnYXRpb25FeHRyYXN9IGZvciBtb3JlIGluZm8uXG4gICAqL1xuICBleHRyYXM6IE5hdmlnYXRpb25FeHRyYXM7XG4gIC8qKlxuICAgKiBQcmV2aW91c2x5IHN1Y2Nlc3NmdWwgTmF2aWdhdGlvbiBvYmplY3QuIE9ubHkgYSBzaW5nbGUgcHJldmlvdXMgTmF2aWdhdGlvbiBpcyBhdmFpbGFibGUsXG4gICAqIHRoZXJlZm9yZSB0aGlzIHByZXZpb3VzIE5hdmlnYXRpb24gd2lsbCBhbHdheXMgaGF2ZSBhIGBudWxsYCB2YWx1ZSBmb3IgYHByZXZpb3VzTmF2aWdhdGlvbmAuXG4gICAqL1xuICBwcmV2aW91c05hdmlnYXRpb246IE5hdmlnYXRpb24gfCBudWxsO1xufTtcblxuZXhwb3J0IHR5cGUgTmF2aWdhdGlvblRyYW5zaXRpb24gPSB7XG4gIGlkOiBudW1iZXIsXG4gIGN1cnJlbnRVcmxUcmVlOiBVcmxUcmVlLFxuICBjdXJyZW50UmF3VXJsOiBVcmxUcmVlLFxuICBleHRyYWN0ZWRVcmw6IFVybFRyZWUsXG4gIHVybEFmdGVyUmVkaXJlY3RzOiBVcmxUcmVlLFxuICByYXdVcmw6IFVybFRyZWUsXG4gIGV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyxcbiAgcmVzb2x2ZTogYW55LFxuICByZWplY3Q6IGFueSxcbiAgcHJvbWlzZTogUHJvbWlzZTxib29sZWFuPixcbiAgc291cmNlOiBOYXZpZ2F0aW9uVHJpZ2dlcixcbiAgcmVzdG9yZWRTdGF0ZTogUmVzdG9yZWRTdGF0ZSB8IG51bGwsXG4gIGN1cnJlbnRTbmFwc2hvdDogUm91dGVyU3RhdGVTbmFwc2hvdCxcbiAgdGFyZ2V0U25hcHNob3Q6IFJvdXRlclN0YXRlU25hcHNob3QgfCBudWxsLFxuICBjdXJyZW50Um91dGVyU3RhdGU6IFJvdXRlclN0YXRlLFxuICB0YXJnZXRSb3V0ZXJTdGF0ZTogUm91dGVyU3RhdGUgfCBudWxsLFxuICBndWFyZHM6IENoZWNrcyxcbiAgZ3VhcmRzUmVzdWx0OiBib29sZWFuIHwgVXJsVHJlZSB8IG51bGwsXG59O1xuXG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgdHlwZSBSb3V0ZXJIb29rID0gKHNuYXBzaG90OiBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBydW5FeHRyYXM6IHtcbiAgYXBwbGllZFVybFRyZWU6IFVybFRyZWUsXG4gIHJhd1VybFRyZWU6IFVybFRyZWUsXG4gIHNraXBMb2NhdGlvbkNoYW5nZTogYm9vbGVhbixcbiAgcmVwbGFjZVVybDogYm9vbGVhbixcbiAgbmF2aWdhdGlvbklkOiBudW1iZXJcbn0pID0+IE9ic2VydmFibGU8dm9pZD47XG5cbi8qKlxuICogQGludGVybmFsXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRSb3V0ZXJIb29rKHNuYXBzaG90OiBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBydW5FeHRyYXM6IHtcbiAgYXBwbGllZFVybFRyZWU6IFVybFRyZWUsXG4gIHJhd1VybFRyZWU6IFVybFRyZWUsXG4gIHNraXBMb2NhdGlvbkNoYW5nZTogYm9vbGVhbixcbiAgcmVwbGFjZVVybDogYm9vbGVhbixcbiAgbmF2aWdhdGlvbklkOiBudW1iZXJcbn0pOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgcmV0dXJuIG9mIChudWxsKSBhcyBhbnk7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUHJvdmlkZXMgdGhlIG5hdmlnYXRpb24gYW5kIHVybCBtYW5pcHVsYXRpb24gY2FwYWJpbGl0aWVzLlxuICpcbiAqIFNlZSBgUm91dGVzYCBmb3IgbW9yZSBkZXRhaWxzIGFuZCBleGFtcGxlcy5cbiAqXG4gKiBAbmdNb2R1bGUgUm91dGVyTW9kdWxlXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY2xhc3MgUm91dGVyIHtcbiAgcHJpdmF0ZSBjdXJyZW50VXJsVHJlZTogVXJsVHJlZTtcbiAgcHJpdmF0ZSByYXdVcmxUcmVlOiBVcmxUcmVlO1xuICBwcml2YXRlIGJyb3dzZXJVcmxUcmVlOiBVcmxUcmVlO1xuICBwcml2YXRlIHJlYWRvbmx5IHRyYW5zaXRpb25zOiBCZWhhdmlvclN1YmplY3Q8TmF2aWdhdGlvblRyYW5zaXRpb24+O1xuICBwcml2YXRlIG5hdmlnYXRpb25zOiBPYnNlcnZhYmxlPE5hdmlnYXRpb25UcmFuc2l0aW9uPjtcbiAgcHJpdmF0ZSBsYXN0U3VjY2Vzc2Z1bE5hdmlnYXRpb246IE5hdmlnYXRpb258bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgY3VycmVudE5hdmlnYXRpb246IE5hdmlnYXRpb258bnVsbCA9IG51bGw7XG5cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgbG9jYXRpb25TdWJzY3JpcHRpb24gITogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIG5hdmlnYXRpb25JZDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBjb25maWdMb2FkZXI6IFJvdXRlckNvbmZpZ0xvYWRlcjtcbiAgcHJpdmF0ZSBuZ01vZHVsZTogTmdNb2R1bGVSZWY8YW55PjtcbiAgcHJpdmF0ZSBjb25zb2xlOiBDb25zb2xlO1xuICBwcml2YXRlIGlzTmdab25lRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHB1YmxpYyByZWFkb25seSBldmVudHM6IE9ic2VydmFibGU8RXZlbnQ+ID0gbmV3IFN1YmplY3Q8RXZlbnQ+KCk7XG4gIHB1YmxpYyByZWFkb25seSByb3V0ZXJTdGF0ZTogUm91dGVyU3RhdGU7XG5cbiAgLyoqXG4gICAqIEVycm9yIGhhbmRsZXIgdGhhdCBpcyBpbnZva2VkIHdoZW4gYSBuYXZpZ2F0aW9uIGVycm9ycy5cbiAgICpcbiAgICogU2VlIGBFcnJvckhhbmRsZXJgIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXIgPSBkZWZhdWx0RXJyb3JIYW5kbGVyO1xuXG4gIC8qKlxuICAgKiBNYWxmb3JtZWQgdXJpIGVycm9yIGhhbmRsZXIgaXMgaW52b2tlZCB3aGVuIGBSb3V0ZXIucGFyc2VVcmwodXJsKWAgdGhyb3dzIGFuXG4gICAqIGVycm9yIGR1ZSB0byBjb250YWluaW5nIGFuIGludmFsaWQgY2hhcmFjdGVyLiBUaGUgbW9zdCBjb21tb24gY2FzZSB3b3VsZCBiZSBhIGAlYCBzaWduXG4gICAqIHRoYXQncyBub3QgZW5jb2RlZCBhbmQgaXMgbm90IHBhcnQgb2YgYSBwZXJjZW50IGVuY29kZWQgc2VxdWVuY2UuXG4gICAqL1xuICBtYWxmb3JtZWRVcmlFcnJvckhhbmRsZXI6XG4gICAgICAoZXJyb3I6IFVSSUVycm9yLCB1cmxTZXJpYWxpemVyOiBVcmxTZXJpYWxpemVyLFxuICAgICAgIHVybDogc3RyaW5nKSA9PiBVcmxUcmVlID0gZGVmYXVsdE1hbGZvcm1lZFVyaUVycm9ySGFuZGxlcjtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIGF0IGxlYXN0IG9uZSBuYXZpZ2F0aW9uIGhhcHBlbmVkLlxuICAgKi9cbiAgbmF2aWdhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgbGFzdFN1Y2Nlc3NmdWxJZDogbnVtYmVyID0gLTE7XG5cbiAgLyoqXG4gICAqIFVzZWQgYnkgUm91dGVyTW9kdWxlLiBUaGlzIGFsbG93cyB1cyB0b1xuICAgKiBwYXVzZSB0aGUgbmF2aWdhdGlvbiBlaXRoZXIgYmVmb3JlIHByZWFjdGl2YXRpb24gb3IgYWZ0ZXIgaXQuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgaG9va3M6IHtiZWZvcmVQcmVhY3RpdmF0aW9uOiBSb3V0ZXJIb29rLCBhZnRlclByZWFjdGl2YXRpb246IFJvdXRlckhvb2t9ID0ge1xuICAgIGJlZm9yZVByZWFjdGl2YXRpb246IGRlZmF1bHRSb3V0ZXJIb29rLFxuICAgIGFmdGVyUHJlYWN0aXZhdGlvbjogZGVmYXVsdFJvdXRlckhvb2tcbiAgfTtcblxuICAvKipcbiAgICogRXh0cmFjdHMgYW5kIG1lcmdlcyBVUkxzLiBVc2VkIGZvciBBbmd1bGFySlMgdG8gQW5ndWxhciBtaWdyYXRpb25zLlxuICAgKi9cbiAgdXJsSGFuZGxpbmdTdHJhdGVneTogVXJsSGFuZGxpbmdTdHJhdGVneSA9IG5ldyBEZWZhdWx0VXJsSGFuZGxpbmdTdHJhdGVneSgpO1xuXG4gIHJvdXRlUmV1c2VTdHJhdGVneTogUm91dGVSZXVzZVN0cmF0ZWd5ID0gbmV3IERlZmF1bHRSb3V0ZVJldXNlU3RyYXRlZ3koKTtcblxuICAvKipcbiAgICogRGVmaW5lIHdoYXQgdGhlIHJvdXRlciBzaG91bGQgZG8gaWYgaXQgcmVjZWl2ZXMgYSBuYXZpZ2F0aW9uIHJlcXVlc3QgdG8gdGhlIGN1cnJlbnQgVVJMLlxuICAgKiBCeSBkZWZhdWx0LCB0aGUgcm91dGVyIHdpbGwgaWdub3JlIHRoaXMgbmF2aWdhdGlvbi4gSG93ZXZlciwgdGhpcyBwcmV2ZW50cyBmZWF0dXJlcyBzdWNoXG4gICAqIGFzIGEgXCJyZWZyZXNoXCIgYnV0dG9uLiBVc2UgdGhpcyBvcHRpb24gdG8gY29uZmlndXJlIHRoZSBiZWhhdmlvciB3aGVuIG5hdmlnYXRpbmcgdG8gdGhlXG4gICAqIGN1cnJlbnQgVVJMLiBEZWZhdWx0IGlzICdpZ25vcmUnLlxuICAgKi9cbiAgb25TYW1lVXJsTmF2aWdhdGlvbjogJ3JlbG9hZCd8J2lnbm9yZScgPSAnaWdub3JlJztcblxuICAvKipcbiAgICogRGVmaW5lcyBob3cgdGhlIHJvdXRlciBtZXJnZXMgcGFyYW1zLCBkYXRhIGFuZCByZXNvbHZlZCBkYXRhIGZyb20gcGFyZW50IHRvIGNoaWxkXG4gICAqIHJvdXRlcy4gQXZhaWxhYmxlIG9wdGlvbnMgYXJlOlxuICAgKlxuICAgKiAtIGAnZW1wdHlPbmx5J2AsIHRoZSBkZWZhdWx0LCBvbmx5IGluaGVyaXRzIHBhcmVudCBwYXJhbXMgZm9yIHBhdGgtbGVzcyBvciBjb21wb25lbnQtbGVzc1xuICAgKiAgIHJvdXRlcy5cbiAgICogLSBgJ2Fsd2F5cydgLCBlbmFibGVzIHVuY29uZGl0aW9uYWwgaW5oZXJpdGFuY2Ugb2YgcGFyZW50IHBhcmFtcy5cbiAgICovXG4gIHBhcmFtc0luaGVyaXRhbmNlU3RyYXRlZ3k6ICdlbXB0eU9ubHknfCdhbHdheXMnID0gJ2VtcHR5T25seSc7XG5cbiAgLyoqXG4gICAqIERlZmluZXMgd2hlbiB0aGUgcm91dGVyIHVwZGF0ZXMgdGhlIGJyb3dzZXIgVVJMLiBUaGUgZGVmYXVsdCBiZWhhdmlvciBpcyB0byB1cGRhdGUgYWZ0ZXJcbiAgICogc3VjY2Vzc2Z1bCBuYXZpZ2F0aW9uLiBIb3dldmVyLCBzb21lIGFwcGxpY2F0aW9ucyBtYXkgcHJlZmVyIGEgbW9kZSB3aGVyZSB0aGUgVVJMIGdldHNcbiAgICogdXBkYXRlZCBhdCB0aGUgYmVnaW5uaW5nIG9mIG5hdmlnYXRpb24uIFRoZSBtb3N0IGNvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB1cGRhdGluZyB0aGVcbiAgICogVVJMIGVhcmx5IHNvIGlmIG5hdmlnYXRpb24gZmFpbHMsIHlvdSBjYW4gc2hvdyBhbiBlcnJvciBtZXNzYWdlIHdpdGggdGhlIFVSTCB0aGF0IGZhaWxlZC5cbiAgICogQXZhaWxhYmxlIG9wdGlvbnMgYXJlOlxuICAgKlxuICAgKiAtIGAnZGVmZXJyZWQnYCwgdGhlIGRlZmF1bHQsIHVwZGF0ZXMgdGhlIGJyb3dzZXIgVVJMIGFmdGVyIG5hdmlnYXRpb24gaGFzIGZpbmlzaGVkLlxuICAgKiAtIGAnZWFnZXInYCwgdXBkYXRlcyBicm93c2VyIFVSTCBhdCB0aGUgYmVnaW5uaW5nIG9mIG5hdmlnYXRpb24uXG4gICAqL1xuICB1cmxVcGRhdGVTdHJhdGVneTogJ2RlZmVycmVkJ3wnZWFnZXInID0gJ2RlZmVycmVkJztcblxuICAvKipcbiAgICogU2VlIHtAbGluayBSb3V0ZXJNb2R1bGV9IGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgcmVsYXRpdmVMaW5rUmVzb2x1dGlvbjogJ2xlZ2FjeSd8J2NvcnJlY3RlZCcgPSAnbGVnYWN5JztcblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgcm91dGVyIHNlcnZpY2UuXG4gICAqL1xuICAvLyBUT0RPOiB2c2F2a2luIG1ha2UgaW50ZXJuYWwgYWZ0ZXIgdGhlIGZpbmFsIGlzIG91dC5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJvb3RDb21wb25lbnRUeXBlOiBUeXBlPGFueT58bnVsbCwgcHJpdmF0ZSB1cmxTZXJpYWxpemVyOiBVcmxTZXJpYWxpemVyLFxuICAgICAgcHJpdmF0ZSByb290Q29udGV4dHM6IENoaWxkcmVuT3V0bGV0Q29udGV4dHMsIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLCBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICBsb2FkZXI6IE5nTW9kdWxlRmFjdG9yeUxvYWRlciwgY29tcGlsZXI6IENvbXBpbGVyLCBwdWJsaWMgY29uZmlnOiBSb3V0ZXMpIHtcbiAgICBjb25zdCBvbkxvYWRTdGFydCA9IChyOiBSb3V0ZSkgPT4gdGhpcy50cmlnZ2VyRXZlbnQobmV3IFJvdXRlQ29uZmlnTG9hZFN0YXJ0KHIpKTtcbiAgICBjb25zdCBvbkxvYWRFbmQgPSAocjogUm91dGUpID0+IHRoaXMudHJpZ2dlckV2ZW50KG5ldyBSb3V0ZUNvbmZpZ0xvYWRFbmQocikpO1xuXG4gICAgdGhpcy5uZ01vZHVsZSA9IGluamVjdG9yLmdldChOZ01vZHVsZVJlZik7XG4gICAgdGhpcy5jb25zb2xlID0gaW5qZWN0b3IuZ2V0KENvbnNvbGUpO1xuICAgIGNvbnN0IG5nWm9uZSA9IGluamVjdG9yLmdldChOZ1pvbmUpO1xuICAgIHRoaXMuaXNOZ1pvbmVFbmFibGVkID0gbmdab25lIGluc3RhbmNlb2YgTmdab25lO1xuXG4gICAgdGhpcy5yZXNldENvbmZpZyhjb25maWcpO1xuICAgIHRoaXMuY3VycmVudFVybFRyZWUgPSBjcmVhdGVFbXB0eVVybFRyZWUoKTtcbiAgICB0aGlzLnJhd1VybFRyZWUgPSB0aGlzLmN1cnJlbnRVcmxUcmVlO1xuICAgIHRoaXMuYnJvd3NlclVybFRyZWUgPSB0aGlzLmN1cnJlbnRVcmxUcmVlO1xuXG4gICAgdGhpcy5jb25maWdMb2FkZXIgPSBuZXcgUm91dGVyQ29uZmlnTG9hZGVyKGxvYWRlciwgY29tcGlsZXIsIG9uTG9hZFN0YXJ0LCBvbkxvYWRFbmQpO1xuICAgIHRoaXMucm91dGVyU3RhdGUgPSBjcmVhdGVFbXB0eVN0YXRlKHRoaXMuY3VycmVudFVybFRyZWUsIHRoaXMucm9vdENvbXBvbmVudFR5cGUpO1xuXG4gICAgdGhpcy50cmFuc2l0aW9ucyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TmF2aWdhdGlvblRyYW5zaXRpb24+KHtcbiAgICAgIGlkOiAwLFxuICAgICAgY3VycmVudFVybFRyZWU6IHRoaXMuY3VycmVudFVybFRyZWUsXG4gICAgICBjdXJyZW50UmF3VXJsOiB0aGlzLmN1cnJlbnRVcmxUcmVlLFxuICAgICAgZXh0cmFjdGVkVXJsOiB0aGlzLnVybEhhbmRsaW5nU3RyYXRlZ3kuZXh0cmFjdCh0aGlzLmN1cnJlbnRVcmxUcmVlKSxcbiAgICAgIHVybEFmdGVyUmVkaXJlY3RzOiB0aGlzLnVybEhhbmRsaW5nU3RyYXRlZ3kuZXh0cmFjdCh0aGlzLmN1cnJlbnRVcmxUcmVlKSxcbiAgICAgIHJhd1VybDogdGhpcy5jdXJyZW50VXJsVHJlZSxcbiAgICAgIGV4dHJhczoge30sXG4gICAgICByZXNvbHZlOiBudWxsLFxuICAgICAgcmVqZWN0OiBudWxsLFxuICAgICAgcHJvbWlzZTogUHJvbWlzZS5yZXNvbHZlKHRydWUpLFxuICAgICAgc291cmNlOiAnaW1wZXJhdGl2ZScsXG4gICAgICByZXN0b3JlZFN0YXRlOiBudWxsLFxuICAgICAgY3VycmVudFNuYXBzaG90OiB0aGlzLnJvdXRlclN0YXRlLnNuYXBzaG90LFxuICAgICAgdGFyZ2V0U25hcHNob3Q6IG51bGwsXG4gICAgICBjdXJyZW50Um91dGVyU3RhdGU6IHRoaXMucm91dGVyU3RhdGUsXG4gICAgICB0YXJnZXRSb3V0ZXJTdGF0ZTogbnVsbCxcbiAgICAgIGd1YXJkczoge2NhbkFjdGl2YXRlQ2hlY2tzOiBbXSwgY2FuRGVhY3RpdmF0ZUNoZWNrczogW119LFxuICAgICAgZ3VhcmRzUmVzdWx0OiBudWxsLFxuICAgIH0pO1xuICAgIHRoaXMubmF2aWdhdGlvbnMgPSB0aGlzLnNldHVwTmF2aWdhdGlvbnModGhpcy50cmFuc2l0aW9ucyk7XG5cbiAgICB0aGlzLnByb2Nlc3NOYXZpZ2F0aW9ucygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cE5hdmlnYXRpb25zKHRyYW5zaXRpb25zOiBPYnNlcnZhYmxlPE5hdmlnYXRpb25UcmFuc2l0aW9uPik6XG4gICAgICBPYnNlcnZhYmxlPE5hdmlnYXRpb25UcmFuc2l0aW9uPiB7XG4gICAgY29uc3QgZXZlbnRzU3ViamVjdCA9ICh0aGlzLmV2ZW50cyBhcyBTdWJqZWN0PEV2ZW50Pik7XG4gICAgcmV0dXJuIHRyYW5zaXRpb25zLnBpcGUoXG4gICAgICAgIGZpbHRlcih0ID0+IHQuaWQgIT09IDApLFxuXG4gICAgICAgIC8vIEV4dHJhY3QgVVJMXG4gICAgICAgIG1hcCh0ID0+ICh7XG4gICAgICAgICAgICAgIC4uLnQsIGV4dHJhY3RlZFVybDogdGhpcy51cmxIYW5kbGluZ1N0cmF0ZWd5LmV4dHJhY3QodC5yYXdVcmwpXG4gICAgICAgICAgICB9IGFzIE5hdmlnYXRpb25UcmFuc2l0aW9uKSksXG5cbiAgICAgICAgLy8gU3RvcmUgdGhlIE5hdmlnYXRpb24gb2JqZWN0XG4gICAgICAgIHRhcCh0ID0+IHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnROYXZpZ2F0aW9uID0ge1xuICAgICAgICAgICAgaWQ6IHQuaWQsXG4gICAgICAgICAgICBpbml0aWFsVXJsOiB0LmN1cnJlbnRSYXdVcmwsXG4gICAgICAgICAgICBleHRyYWN0ZWRVcmw6IHQuZXh0cmFjdGVkVXJsLFxuICAgICAgICAgICAgdHJpZ2dlcjogdC5zb3VyY2UsXG4gICAgICAgICAgICBleHRyYXM6IHQuZXh0cmFzLFxuICAgICAgICAgICAgcHJldmlvdXNOYXZpZ2F0aW9uOiB0aGlzLmxhc3RTdWNjZXNzZnVsTmF2aWdhdGlvbiA/XG4gICAgICAgICAgICAgICAgey4uLnRoaXMubGFzdFN1Y2Nlc3NmdWxOYXZpZ2F0aW9uLCBwcmV2aW91c05hdmlnYXRpb246IG51bGx9IDpcbiAgICAgICAgICAgICAgICBudWxsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSksXG5cbiAgICAgICAgLy8gVXNpbmcgc3dpdGNoTWFwIHNvIHdlIGNhbmNlbCBleGVjdXRpbmcgbmF2aWdhdGlvbnMgd2hlbiBhIG5ldyBvbmUgY29tZXMgaW5cbiAgICAgICAgc3dpdGNoTWFwKHQgPT4ge1xuICAgICAgICAgIGxldCBjb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICBsZXQgZXJyb3JlZCA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBvZiAodCkucGlwZShcbiAgICAgICAgICAgICAgc3dpdGNoTWFwKHQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybFRyYW5zaXRpb24gPVxuICAgICAgICAgICAgICAgICAgICAhdGhpcy5uYXZpZ2F0ZWQgfHwgdC5leHRyYWN0ZWRVcmwudG9TdHJpbmcoKSAhPT0gdGhpcy5icm93c2VyVXJsVHJlZS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NDdXJyZW50VXJsID1cbiAgICAgICAgICAgICAgICAgICAgKHRoaXMub25TYW1lVXJsTmF2aWdhdGlvbiA9PT0gJ3JlbG9hZCcgPyB0cnVlIDogdXJsVHJhbnNpdGlvbikgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cmxIYW5kbGluZ1N0cmF0ZWd5LnNob3VsZFByb2Nlc3NVcmwodC5yYXdVcmwpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NDdXJyZW50VXJsKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb2YgKHQpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgLy8gRmlyZSBOYXZpZ2F0aW9uU3RhcnQgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2hNYXAodCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0cmFuc2l0aW9uID0gdGhpcy50cmFuc2l0aW9ucy5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzU3ViamVjdC5uZXh0KG5ldyBOYXZpZ2F0aW9uU3RhcnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdC5pZCwgdGhpcy5zZXJpYWxpemVVcmwodC5leHRyYWN0ZWRVcmwpLCB0LnNvdXJjZSwgdC5yZXN0b3JlZFN0YXRlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNpdGlvbiAhPT0gdGhpcy50cmFuc2l0aW9ucy5nZXRWYWx1ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbdF07XG4gICAgICAgICAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGRlbGF5IGlzIHJlcXVpcmVkIHRvIG1hdGNoIG9sZCBiZWhhdmlvciB0aGF0IGZvcmNlZCBuYXZpZ2F0aW9uIHRvXG4gICAgICAgICAgICAgICAgICAgICAgLy8gYWx3YXlzIGJlIGFzeW5jXG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoTWFwKHQgPT4gUHJvbWlzZS5yZXNvbHZlKHQpKSxcblxuICAgICAgICAgICAgICAgICAgICAgIC8vIEFwcGx5UmVkaXJlY3RzXG4gICAgICAgICAgICAgICAgICAgICAgYXBwbHlSZWRpcmVjdHMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmdNb2R1bGUuaW5qZWN0b3IsIHRoaXMuY29uZmlnTG9hZGVyLCB0aGlzLnVybFNlcmlhbGl6ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnKSxcblxuICAgICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgY3VycmVudE5hdmlnYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICB0YXAodCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnROYXZpZ2F0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLmN1cnJlbnROYXZpZ2F0aW9uICEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsVXJsOiB0LnVybEFmdGVyUmVkaXJlY3RzXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgICAgICAgICAgLy8gUmVjb2duaXplXG4gICAgICAgICAgICAgICAgICAgICAgcmVjb2duaXplKFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb3RDb21wb25lbnRUeXBlLCB0aGlzLmNvbmZpZywgKHVybCkgPT4gdGhpcy5zZXJpYWxpemVVcmwodXJsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbXNJbmhlcml0YW5jZVN0cmF0ZWd5LCB0aGlzLnJlbGF0aXZlTGlua1Jlc29sdXRpb24pLFxuXG4gICAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIFVSTCBpZiBpbiBgZWFnZXJgIHVwZGF0ZSBtb2RlXG4gICAgICAgICAgICAgICAgICAgICAgdGFwKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudXJsVXBkYXRlU3RyYXRlZ3kgPT09ICdlYWdlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0LmV4dHJhcy5za2lwTG9jYXRpb25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJyb3dzZXJVcmwodC51cmxBZnRlclJlZGlyZWN0cywgISF0LmV4dHJhcy5yZXBsYWNlVXJsLCB0LmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJyb3dzZXJVcmxUcmVlID0gdC51cmxBZnRlclJlZGlyZWN0cztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICAgICAgICAgIC8vIEZpcmUgUm91dGVzUmVjb2duaXplZFxuICAgICAgICAgICAgICAgICAgICAgIHRhcCh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdXRlc1JlY29nbml6ZWQgPSBuZXcgUm91dGVzUmVjb2duaXplZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0LmlkLCB0aGlzLnNlcmlhbGl6ZVVybCh0LmV4dHJhY3RlZFVybCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJpYWxpemVVcmwodC51cmxBZnRlclJlZGlyZWN0cyksIHQudGFyZ2V0U25hcHNob3QgISk7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudHNTdWJqZWN0Lm5leHQocm91dGVzUmVjb2duaXplZCk7XG4gICAgICAgICAgICAgICAgICAgICAgfSksICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NQcmV2aW91c1VybCA9IHVybFRyYW5zaXRpb24gJiYgdGhpcy5yYXdVcmxUcmVlICYmXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy51cmxIYW5kbGluZ1N0cmF0ZWd5LnNob3VsZFByb2Nlc3NVcmwodGhpcy5yYXdVcmxUcmVlKTtcbiAgICAgICAgICAgICAgICAgIC8qIFdoZW4gdGhlIGN1cnJlbnQgVVJMIHNob3VsZG4ndCBiZSBwcm9jZXNzZWQsIGJ1dCB0aGUgcHJldmlvdXMgb25lIHdhcywgd2VcbiAgICAgICAgICAgICAgICAgICAqIGhhbmRsZSB0aGlzIFwiZXJyb3IgY29uZGl0aW9uXCIgYnkgbmF2aWdhdGluZyB0byB0aGUgcHJldmlvdXNseSBzdWNjZXNzZnVsIFVSTCxcbiAgICAgICAgICAgICAgICAgICAqIGJ1dCBsZWF2aW5nIHRoZSBVUkwgaW50YWN0LiovXG4gICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc1ByZXZpb3VzVXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHtpZCwgZXh0cmFjdGVkVXJsLCBzb3VyY2UsIHJlc3RvcmVkU3RhdGUsIGV4dHJhc30gPSB0O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuYXZTdGFydCA9IG5ldyBOYXZpZ2F0aW9uU3RhcnQoXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCwgdGhpcy5zZXJpYWxpemVVcmwoZXh0cmFjdGVkVXJsKSwgc291cmNlLCByZXN0b3JlZFN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzU3ViamVjdC5uZXh0KG5hdlN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0U25hcHNob3QgPVxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlRW1wdHlTdGF0ZShleHRyYWN0ZWRVcmwsIHRoaXMucm9vdENvbXBvbmVudFR5cGUpLnNuYXBzaG90O1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZiAoe1xuICAgICAgICAgICAgICAgICAgICAgIC4uLnQsXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0U25hcHNob3QsXG4gICAgICAgICAgICAgICAgICAgICAgdXJsQWZ0ZXJSZWRpcmVjdHM6IGV4dHJhY3RlZFVybCxcbiAgICAgICAgICAgICAgICAgICAgICBleHRyYXM6IHsuLi5leHRyYXMsIHNraXBMb2NhdGlvbkNoYW5nZTogZmFsc2UsIHJlcGxhY2VVcmw6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvKiBXaGVuIG5laXRoZXIgdGhlIGN1cnJlbnQgb3IgcHJldmlvdXMgVVJMIGNhbiBiZSBwcm9jZXNzZWQsIGRvIG5vdGhpbmcgb3RoZXJcbiAgICAgICAgICAgICAgICAgICAgICogdGhhbiB1cGRhdGUgcm91dGVyJ3MgaW50ZXJuYWwgcmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IFwic2V0dGxlZFwiIFVSTC4gVGhpc1xuICAgICAgICAgICAgICAgICAgICAgKiB3YXkgdGhlIG5leHQgbmF2aWdhdGlvbiB3aWxsIGJlIGNvbWluZyBmcm9tIHRoZSBjdXJyZW50IFVSTCBpbiB0aGUgYnJvd3Nlci5cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmF3VXJsVHJlZSA9IHQucmF3VXJsO1xuICAgICAgICAgICAgICAgICAgICB0LnJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgIC8vIEJlZm9yZSBQcmVhY3RpdmF0aW9uXG4gICAgICAgICAgICAgIHN3aXRjaFRhcCh0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICB0YXJnZXRTbmFwc2hvdCxcbiAgICAgICAgICAgICAgICAgIGlkOiBuYXZpZ2F0aW9uSWQsXG4gICAgICAgICAgICAgICAgICBleHRyYWN0ZWRVcmw6IGFwcGxpZWRVcmxUcmVlLFxuICAgICAgICAgICAgICAgICAgcmF3VXJsOiByYXdVcmxUcmVlLFxuICAgICAgICAgICAgICAgICAgZXh0cmFzOiB7c2tpcExvY2F0aW9uQ2hhbmdlLCByZXBsYWNlVXJsfVxuICAgICAgICAgICAgICAgIH0gPSB0O1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhvb2tzLmJlZm9yZVByZWFjdGl2YXRpb24odGFyZ2V0U25hcHNob3QgISwge1xuICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbklkLFxuICAgICAgICAgICAgICAgICAgYXBwbGllZFVybFRyZWUsXG4gICAgICAgICAgICAgICAgICByYXdVcmxUcmVlLFxuICAgICAgICAgICAgICAgICAgc2tpcExvY2F0aW9uQ2hhbmdlOiAhIXNraXBMb2NhdGlvbkNoYW5nZSxcbiAgICAgICAgICAgICAgICAgIHJlcGxhY2VVcmw6ICEhcmVwbGFjZVVybCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgLy8gLS0tIEdVQVJEUyAtLS1cbiAgICAgICAgICAgICAgdGFwKHQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGd1YXJkc1N0YXJ0ID0gbmV3IEd1YXJkc0NoZWNrU3RhcnQoXG4gICAgICAgICAgICAgICAgICAgIHQuaWQsIHRoaXMuc2VyaWFsaXplVXJsKHQuZXh0cmFjdGVkVXJsKSwgdGhpcy5zZXJpYWxpemVVcmwodC51cmxBZnRlclJlZGlyZWN0cyksXG4gICAgICAgICAgICAgICAgICAgIHQudGFyZ2V0U25hcHNob3QgISk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoZ3VhcmRzU3RhcnQpO1xuICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICBtYXAodCA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAuLi50LFxuICAgICAgICAgICAgICAgICAgICBndWFyZHM6XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRBbGxSb3V0ZUd1YXJkcyh0LnRhcmdldFNuYXBzaG90ICEsIHQuY3VycmVudFNuYXBzaG90LCB0aGlzLnJvb3RDb250ZXh0cylcbiAgICAgICAgICAgICAgICAgIH0pKSxcblxuICAgICAgICAgICAgICBjaGVja0d1YXJkcyh0aGlzLm5nTW9kdWxlLmluamVjdG9yLCAoZXZ0OiBFdmVudCkgPT4gdGhpcy50cmlnZ2VyRXZlbnQoZXZ0KSksXG4gICAgICAgICAgICAgIHRhcCh0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXNVcmxUcmVlKHQuZ3VhcmRzUmVzdWx0KSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3I6IEVycm9yJnt1cmw/OiBVcmxUcmVlfSA9IG5hdmlnYXRpb25DYW5jZWxpbmdFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICBgUmVkaXJlY3RpbmcgdG8gXCIke3RoaXMuc2VyaWFsaXplVXJsKHQuZ3VhcmRzUmVzdWx0KX1cImApO1xuICAgICAgICAgICAgICAgICAgZXJyb3IudXJsID0gdC5ndWFyZHNSZXN1bHQ7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgIHRhcCh0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBndWFyZHNFbmQgPSBuZXcgR3VhcmRzQ2hlY2tFbmQoXG4gICAgICAgICAgICAgICAgICAgIHQuaWQsIHRoaXMuc2VyaWFsaXplVXJsKHQuZXh0cmFjdGVkVXJsKSwgdGhpcy5zZXJpYWxpemVVcmwodC51cmxBZnRlclJlZGlyZWN0cyksXG4gICAgICAgICAgICAgICAgICAgIHQudGFyZ2V0U25hcHNob3QgISwgISF0Lmd1YXJkc1Jlc3VsdCk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoZ3VhcmRzRW5kKTtcbiAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgZmlsdGVyKHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdC5ndWFyZHNSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRVcmxUb0N1cnJlbnRVcmxUcmVlKCk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBuYXZDYW5jZWwgPVxuICAgICAgICAgICAgICAgICAgICAgIG5ldyBOYXZpZ2F0aW9uQ2FuY2VsKHQuaWQsIHRoaXMuc2VyaWFsaXplVXJsKHQuZXh0cmFjdGVkVXJsKSwgJycpO1xuICAgICAgICAgICAgICAgICAgZXZlbnRzU3ViamVjdC5uZXh0KG5hdkNhbmNlbCk7XG4gICAgICAgICAgICAgICAgICB0LnJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgLy8gLS0tIFJFU09MVkUgLS0tXG4gICAgICAgICAgICAgIHN3aXRjaFRhcCh0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodC5ndWFyZHMuY2FuQWN0aXZhdGVDaGVja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb2YgKHQpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgdGFwKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZVN0YXJ0ID0gbmV3IFJlc29sdmVTdGFydChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0LmlkLCB0aGlzLnNlcmlhbGl6ZVVybCh0LmV4dHJhY3RlZFVybCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJpYWxpemVVcmwodC51cmxBZnRlclJlZGlyZWN0cyksIHQudGFyZ2V0U25hcHNob3QgISk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChyZXNvbHZlU3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVEYXRhKFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmFtc0luaGVyaXRhbmNlU3RyYXRlZ3ksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmdNb2R1bGUuaW5qZWN0b3IpLCAgLy9cbiAgICAgICAgICAgICAgICAgICAgICB0YXAodCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNvbHZlRW5kID0gbmV3IFJlc29sdmVFbmQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdC5pZCwgdGhpcy5zZXJpYWxpemVVcmwodC5leHRyYWN0ZWRVcmwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VyaWFsaXplVXJsKHQudXJsQWZ0ZXJSZWRpcmVjdHMpLCB0LnRhcmdldFNuYXBzaG90ICEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQocmVzb2x2ZUVuZCk7XG4gICAgICAgICAgICAgICAgICAgICAgfSksICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICAgIC8vIC0tLSBBRlRFUiBQUkVBQ1RJVkFUSU9OIC0tLVxuICAgICAgICAgICAgICBzd2l0Y2hUYXAoKHQ6IE5hdmlnYXRpb25UcmFuc2l0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgdGFyZ2V0U25hcHNob3QsXG4gICAgICAgICAgICAgICAgICBpZDogbmF2aWdhdGlvbklkLFxuICAgICAgICAgICAgICAgICAgZXh0cmFjdGVkVXJsOiBhcHBsaWVkVXJsVHJlZSxcbiAgICAgICAgICAgICAgICAgIHJhd1VybDogcmF3VXJsVHJlZSxcbiAgICAgICAgICAgICAgICAgIGV4dHJhczoge3NraXBMb2NhdGlvbkNoYW5nZSwgcmVwbGFjZVVybH1cbiAgICAgICAgICAgICAgICB9ID0gdDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ob29rcy5hZnRlclByZWFjdGl2YXRpb24odGFyZ2V0U25hcHNob3QgISwge1xuICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbklkLFxuICAgICAgICAgICAgICAgICAgYXBwbGllZFVybFRyZWUsXG4gICAgICAgICAgICAgICAgICByYXdVcmxUcmVlLFxuICAgICAgICAgICAgICAgICAgc2tpcExvY2F0aW9uQ2hhbmdlOiAhIXNraXBMb2NhdGlvbkNoYW5nZSxcbiAgICAgICAgICAgICAgICAgIHJlcGxhY2VVcmw6ICEhcmVwbGFjZVVybCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICAgbWFwKCh0OiBOYXZpZ2F0aW9uVHJhbnNpdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFJvdXRlclN0YXRlID0gY3JlYXRlUm91dGVyU3RhdGUoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVSZXVzZVN0cmF0ZWd5LCB0LnRhcmdldFNuYXBzaG90ICEsIHQuY3VycmVudFJvdXRlclN0YXRlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHsuLi50LCB0YXJnZXRSb3V0ZXJTdGF0ZX0pO1xuICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICAvKiBPbmNlIGhlcmUsIHdlIGFyZSBhYm91dCB0byBhY3RpdmF0ZSBzeW5jcm9ub3VzbHkuIFRoZSBhc3N1bXB0aW9uIGlzIHRoaXMgd2lsbFxuICAgICAgICAgICAgICAgICBzdWNjZWVkLCBhbmQgdXNlciBjb2RlIG1heSByZWFkIGZyb20gdGhlIFJvdXRlciBzZXJ2aWNlLiBUaGVyZWZvcmUgYmVmb3JlXG4gICAgICAgICAgICAgICAgIGFjdGl2YXRpb24sIHdlIG5lZWQgdG8gdXBkYXRlIHJvdXRlciBwcm9wZXJ0aWVzIHN0b3JpbmcgdGhlIGN1cnJlbnQgVVJMIGFuZCB0aGVcbiAgICAgICAgICAgICAgICAgUm91dGVyU3RhdGUsIGFzIHdlbGwgYXMgdXBkYXRlZCB0aGUgYnJvd3NlciBVUkwuIEFsbCB0aGlzIHNob3VsZCBoYXBwZW4gKmJlZm9yZSpcbiAgICAgICAgICAgICAgICAgYWN0aXZhdGluZy4gKi9cbiAgICAgICAgICAgICAgdGFwKCh0OiBOYXZpZ2F0aW9uVHJhbnNpdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFVybFRyZWUgPSB0LnVybEFmdGVyUmVkaXJlY3RzO1xuICAgICAgICAgICAgICAgIHRoaXMucmF3VXJsVHJlZSA9IHRoaXMudXJsSGFuZGxpbmdTdHJhdGVneS5tZXJnZSh0aGlzLmN1cnJlbnRVcmxUcmVlLCB0LnJhd1VybCk7XG5cbiAgICAgICAgICAgICAgICAodGhpcyBhc3tyb3V0ZXJTdGF0ZTogUm91dGVyU3RhdGV9KS5yb3V0ZXJTdGF0ZSA9IHQudGFyZ2V0Um91dGVyU3RhdGUgITtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnVybFVwZGF0ZVN0cmF0ZWd5ID09PSAnZGVmZXJyZWQnKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoIXQuZXh0cmFzLnNraXBMb2NhdGlvbkNoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJyb3dzZXJVcmwoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJhd1VybFRyZWUsICEhdC5leHRyYXMucmVwbGFjZVVybCwgdC5pZCwgdC5leHRyYXMuc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgdGhpcy5icm93c2VyVXJsVHJlZSA9IHQudXJsQWZ0ZXJSZWRpcmVjdHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgICBhY3RpdmF0ZVJvdXRlcyhcbiAgICAgICAgICAgICAgICAgIHRoaXMucm9vdENvbnRleHRzLCB0aGlzLnJvdXRlUmV1c2VTdHJhdGVneSxcbiAgICAgICAgICAgICAgICAgIChldnQ6IEV2ZW50KSA9PiB0aGlzLnRyaWdnZXJFdmVudChldnQpKSxcblxuICAgICAgICAgICAgICB0YXAoe25leHQoKSB7IGNvbXBsZXRlZCA9IHRydWU7IH0sIGNvbXBsZXRlKCkgeyBjb21wbGV0ZWQgPSB0cnVlOyB9fSksXG4gICAgICAgICAgICAgIGZpbmFsaXplKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvKiBXaGVuIHRoZSBuYXZpZ2F0aW9uIHN0cmVhbSBmaW5pc2hlcyBlaXRoZXIgdGhyb3VnaCBlcnJvciBvciBzdWNjZXNzLCB3ZSBzZXQgdGhlXG4gICAgICAgICAgICAgICAgICogYGNvbXBsZXRlZGAgb3IgYGVycm9yZWRgIGZsYWcuIEhvd2V2ZXIsIHRoZXJlIGFyZSBzb21lIHNpdHVhdGlvbnMgd2hlcmUgd2UgY291bGRcbiAgICAgICAgICAgICAgICAgKiBnZXQgaGVyZSB3aXRob3V0IGVpdGhlciBvZiB0aG9zZSBiZWluZyBzZXQuIEZvciBpbnN0YW5jZSwgYSByZWRpcmVjdCBkdXJpbmdcbiAgICAgICAgICAgICAgICAgKiBOYXZpZ2F0aW9uU3RhcnQuIFRoZXJlZm9yZSwgdGhpcyBpcyBhIGNhdGNoLWFsbCB0byBtYWtlIHN1cmUgdGhlIE5hdmlnYXRpb25DYW5jZWxcbiAgICAgICAgICAgICAgICAgKiBldmVudCBpcyBmaXJlZCB3aGVuIGEgbmF2aWdhdGlvbiBnZXRzIGNhbmNlbGxlZCBidXQgbm90IGNhdWdodCBieSBvdGhlciBtZWFucy4gKi9cbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBsZXRlZCAmJiAhZXJyb3JlZCkge1xuICAgICAgICAgICAgICAgICAgLy8gTXVzdCByZXNldCB0byBjdXJyZW50IFVSTCB0cmVlIGhlcmUgdG8gZW5zdXJlIGhpc3Rvcnkuc3RhdGUgaXMgc2V0LiBPbiBhIGZyZXNoXG4gICAgICAgICAgICAgICAgICAvLyBwYWdlIGxvYWQsIGlmIGEgbmV3IG5hdmlnYXRpb24gY29tZXMgaW4gYmVmb3JlIGEgc3VjY2Vzc2Z1bCBuYXZpZ2F0aW9uXG4gICAgICAgICAgICAgICAgICAvLyBjb21wbGV0ZXMsIHRoZXJlIHdpbGwgYmUgbm90aGluZyBpbiBoaXN0b3J5LnN0YXRlLm5hdmlnYXRpb25JZC4gVGhpcyBjYW4gY2F1c2VcbiAgICAgICAgICAgICAgICAgIC8vIHN5bmMgcHJvYmxlbXMgd2l0aCBBbmd1bGFySlMgc3luYyBjb2RlIHdoaWNoIGxvb2tzIGZvciBhIHZhbHVlIGhlcmUgaW4gb3JkZXJcbiAgICAgICAgICAgICAgICAgIC8vIHRvIGRldGVybWluZSB3aGV0aGVyIG9yIG5vdCB0byBoYW5kbGUgYSBnaXZlbiBwb3BzdGF0ZSBldmVudCBvciB0byBsZWF2ZSBpdFxuICAgICAgICAgICAgICAgICAgLy8gdG8gdGhlIEFuZ3VhbHIgcm91dGVyLlxuICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFVybFRvQ3VycmVudFVybFRyZWUoKTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG5hdkNhbmNlbCA9IG5ldyBOYXZpZ2F0aW9uQ2FuY2VsKFxuICAgICAgICAgICAgICAgICAgICAgIHQuaWQsIHRoaXMuc2VyaWFsaXplVXJsKHQuZXh0cmFjdGVkVXJsKSxcbiAgICAgICAgICAgICAgICAgICAgICBgTmF2aWdhdGlvbiBJRCAke3QuaWR9IGlzIG5vdCBlcXVhbCB0byB0aGUgY3VycmVudCBuYXZpZ2F0aW9uIGlkICR7dGhpcy5uYXZpZ2F0aW9uSWR9YCk7XG4gICAgICAgICAgICAgICAgICBldmVudHNTdWJqZWN0Lm5leHQobmF2Q2FuY2VsKTtcbiAgICAgICAgICAgICAgICAgIHQucmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGN1cnJlbnROYXZpZ2F0aW9uIHNob3VsZCBhbHdheXMgYmUgcmVzZXQgdG8gbnVsbCBoZXJlLiBJZiBuYXZpZ2F0aW9uIHdhc1xuICAgICAgICAgICAgICAgIC8vIHN1Y2Nlc3NmdWwsIGxhc3RTdWNjZXNzZnVsVHJhbnNpdGlvbiB3aWxsIGhhdmUgYWxyZWFkeSBiZWVuIHNldC4gVGhlcmVmb3JlIHdlXG4gICAgICAgICAgICAgICAgLy8gY2FuIHNhZmVseSBzZXQgY3VycmVudE5hdmlnYXRpb24gdG8gbnVsbCBoZXJlLlxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE5hdmlnYXRpb24gPSBudWxsO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGVycm9yZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8qIFRoaXMgZXJyb3IgdHlwZSBpcyBpc3N1ZWQgZHVyaW5nIFJlZGlyZWN0LCBhbmQgaXMgaGFuZGxlZCBhcyBhIGNhbmNlbGxhdGlvblxuICAgICAgICAgICAgICAgICAqIHJhdGhlciB0aGFuIGFuIGVycm9yLiAqL1xuICAgICAgICAgICAgICAgIGlmIChpc05hdmlnYXRpb25DYW5jZWxpbmdFcnJvcihlKSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVkaXJlY3RpbmcgPSBpc1VybFRyZWUoZS51cmwpO1xuICAgICAgICAgICAgICAgICAgaWYgKCFyZWRpcmVjdGluZykge1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgcHJvcGVydHkgb25seSBpZiB3ZSdyZSBub3QgcmVkaXJlY3RpbmcuIElmIHdlIGxhbmRlZCBvbiBhIHBhZ2UgYW5kXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlZGlyZWN0IHRvIGAvYCByb3V0ZSwgdGhlIG5ldyBuYXZpZ2F0aW9uIGlzIGdvaW5nIHRvIHNlZSB0aGUgYC9gIGlzbid0XG4gICAgICAgICAgICAgICAgICAgIC8vIGEgY2hhbmdlIGZyb20gdGhlIGRlZmF1bHQgY3VycmVudFVybFRyZWUgYW5kIHdvbid0IG5hdmlnYXRlLiBUaGlzIGlzXG4gICAgICAgICAgICAgICAgICAgIC8vIG9ubHkgYXBwbGljYWJsZSB3aXRoIGluaXRpYWwgbmF2aWdhdGlvbiwgc28gc2V0dGluZyBgbmF2aWdhdGVkYCBvbmx5IHdoZW5cbiAgICAgICAgICAgICAgICAgICAgLy8gbm90IHJlZGlyZWN0aW5nIHJlc29sdmVzIHRoaXMgc2NlbmFyaW8uXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFN0YXRlQW5kVXJsKHQuY3VycmVudFJvdXRlclN0YXRlLCB0LmN1cnJlbnRVcmxUcmVlLCB0LnJhd1VybCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjb25zdCBuYXZDYW5jZWwgPVxuICAgICAgICAgICAgICAgICAgICAgIG5ldyBOYXZpZ2F0aW9uQ2FuY2VsKHQuaWQsIHRoaXMuc2VyaWFsaXplVXJsKHQuZXh0cmFjdGVkVXJsKSwgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgIGV2ZW50c1N1YmplY3QubmV4dChuYXZDYW5jZWwpO1xuICAgICAgICAgICAgICAgICAgdC5yZXNvbHZlKGZhbHNlKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKHJlZGlyZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVCeVVybChlLnVybCk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIC8qIEFsbCBvdGhlciBlcnJvcnMgc2hvdWxkIHJlc2V0IHRvIHRoZSByb3V0ZXIncyBpbnRlcm5hbCBVUkwgcmVmZXJlbmNlIHRvIHRoZVxuICAgICAgICAgICAgICAgICAgICogcHJlLWVycm9yIHN0YXRlLiAqL1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0U3RhdGVBbmRVcmwodC5jdXJyZW50Um91dGVyU3RhdGUsIHQuY3VycmVudFVybFRyZWUsIHQucmF3VXJsKTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG5hdkVycm9yID0gbmV3IE5hdmlnYXRpb25FcnJvcih0LmlkLCB0aGlzLnNlcmlhbGl6ZVVybCh0LmV4dHJhY3RlZFVybCksIGUpO1xuICAgICAgICAgICAgICAgICAgZXZlbnRzU3ViamVjdC5uZXh0KG5hdkVycm9yKTtcbiAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHQucmVzb2x2ZSh0aGlzLmVycm9ySGFuZGxlcihlKSk7XG4gICAgICAgICAgICAgICAgICB9IGNhdGNoIChlZSkge1xuICAgICAgICAgICAgICAgICAgICB0LnJlamVjdChlZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgICAgICAgfSksICk7XG4gICAgICAgICAgLy8gVE9ETyhqYXNvbmFkZW4pOiByZW1vdmUgY2FzdCBvbmNlIGczIGlzIG9uIHVwZGF0ZWQgVHlwZVNjcmlwdFxuICAgICAgICB9KSkgYXMgYW55IGFzIE9ic2VydmFibGU8TmF2aWdhdGlvblRyYW5zaXRpb24+O1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKiBUT0RPOiB0aGlzIHNob3VsZCBiZSByZW1vdmVkIG9uY2UgdGhlIGNvbnN0cnVjdG9yIG9mIHRoZSByb3V0ZXIgbWFkZSBpbnRlcm5hbFxuICAgKi9cbiAgcmVzZXRSb290Q29tcG9uZW50VHlwZShyb290Q29tcG9uZW50VHlwZTogVHlwZTxhbnk+KTogdm9pZCB7XG4gICAgdGhpcy5yb290Q29tcG9uZW50VHlwZSA9IHJvb3RDb21wb25lbnRUeXBlO1xuICAgIC8vIFRPRE86IHZzYXZraW4gcm91dGVyIDQuMCBzaG91bGQgbWFrZSB0aGUgcm9vdCBjb21wb25lbnQgc2V0IHRvIG51bGxcbiAgICAvLyB0aGlzIHdpbGwgc2ltcGxpZnkgdGhlIGxpZmVjeWNsZSBvZiB0aGUgcm91dGVyLlxuICAgIHRoaXMucm91dGVyU3RhdGUucm9vdC5jb21wb25lbnQgPSB0aGlzLnJvb3RDb21wb25lbnRUeXBlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUcmFuc2l0aW9uKCk6IE5hdmlnYXRpb25UcmFuc2l0aW9uIHsgcmV0dXJuIHRoaXMudHJhbnNpdGlvbnMudmFsdWU7IH1cblxuICBwcml2YXRlIHNldFRyYW5zaXRpb24odDogUGFydGlhbDxOYXZpZ2F0aW9uVHJhbnNpdGlvbj4pOiB2b2lkIHtcbiAgICB0aGlzLnRyYW5zaXRpb25zLm5leHQoey4uLnRoaXMuZ2V0VHJhbnNpdGlvbigpLCAuLi50fSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB1cCB0aGUgbG9jYXRpb24gY2hhbmdlIGxpc3RlbmVyIGFuZCBwZXJmb3JtcyB0aGUgaW5pdGlhbCBuYXZpZ2F0aW9uLlxuICAgKi9cbiAgaW5pdGlhbE5hdmlnYXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5zZXRVcExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIoKTtcbiAgICBpZiAodGhpcy5uYXZpZ2F0aW9uSWQgPT09IDApIHtcbiAgICAgIHRoaXMubmF2aWdhdGVCeVVybCh0aGlzLmxvY2F0aW9uLnBhdGgodHJ1ZSksIHtyZXBsYWNlVXJsOiB0cnVlfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdXAgdGhlIGxvY2F0aW9uIGNoYW5nZSBsaXN0ZW5lci5cbiAgICovXG4gIHNldFVwTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICAvLyBEb24ndCBuZWVkIHRvIHVzZSBab25lLndyYXAgYW55IG1vcmUsIGJlY2F1c2Ugem9uZS5qc1xuICAgIC8vIGFscmVhZHkgcGF0Y2ggb25Qb3BTdGF0ZSwgc28gbG9jYXRpb24gY2hhbmdlIGNhbGxiYWNrIHdpbGxcbiAgICAvLyBydW4gaW50byBuZ1pvbmVcbiAgICBpZiAoIXRoaXMubG9jYXRpb25TdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMubG9jYXRpb25TdWJzY3JpcHRpb24gPSA8YW55PnRoaXMubG9jYXRpb24uc3Vic2NyaWJlKChjaGFuZ2U6IGFueSkgPT4ge1xuICAgICAgICBsZXQgcmF3VXJsVHJlZSA9IHRoaXMucGFyc2VVcmwoY2hhbmdlWyd1cmwnXSk7XG4gICAgICAgIGNvbnN0IHNvdXJjZTogTmF2aWdhdGlvblRyaWdnZXIgPSBjaGFuZ2VbJ3R5cGUnXSA9PT0gJ3BvcHN0YXRlJyA/ICdwb3BzdGF0ZScgOiAnaGFzaGNoYW5nZSc7XG4gICAgICAgIC8vIE5hdmlnYXRpb25zIGNvbWluZyBmcm9tIEFuZ3VsYXIgcm91dGVyIGhhdmUgYSBuYXZpZ2F0aW9uSWQgc3RhdGUgcHJvcGVydHkuIFdoZW4gdGhpc1xuICAgICAgICAvLyBleGlzdHMsIHJlc3RvcmUgdGhlIHN0YXRlLlxuICAgICAgICBjb25zdCBzdGF0ZSA9IGNoYW5nZS5zdGF0ZSAmJiBjaGFuZ2Uuc3RhdGUubmF2aWdhdGlvbklkID8gY2hhbmdlLnN0YXRlIDogbnVsbDtcbiAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgICgpID0+IHsgdGhpcy5zY2hlZHVsZU5hdmlnYXRpb24ocmF3VXJsVHJlZSwgc291cmNlLCBzdGF0ZSwge3JlcGxhY2VVcmw6IHRydWV9KTsgfSwgMCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogVGhlIGN1cnJlbnQgdXJsICovXG4gIGdldCB1cmwoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuc2VyaWFsaXplVXJsKHRoaXMuY3VycmVudFVybFRyZWUpOyB9XG5cbiAgLyoqIFRoZSBjdXJyZW50IE5hdmlnYXRpb24gb2JqZWN0IGlmIG9uZSBleGlzdHMgKi9cbiAgZ2V0Q3VycmVudE5hdmlnYXRpb24oKTogTmF2aWdhdGlvbnxudWxsIHsgcmV0dXJuIHRoaXMuY3VycmVudE5hdmlnYXRpb247IH1cblxuICAvKiogQGludGVybmFsICovXG4gIHRyaWdnZXJFdmVudChldmVudDogRXZlbnQpOiB2b2lkIHsgKHRoaXMuZXZlbnRzIGFzIFN1YmplY3Q8RXZlbnQ+KS5uZXh0KGV2ZW50KTsgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGNvbmZpZ3VyYXRpb24gdXNlZCBmb3IgbmF2aWdhdGlvbiBhbmQgZ2VuZXJhdGluZyBsaW5rcy5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICogYGBgXG4gICAqIHJvdXRlci5yZXNldENvbmZpZyhbXG4gICAqICB7IHBhdGg6ICd0ZWFtLzppZCcsIGNvbXBvbmVudDogVGVhbUNtcCwgY2hpbGRyZW46IFtcbiAgICogICAgeyBwYXRoOiAnc2ltcGxlJywgY29tcG9uZW50OiBTaW1wbGVDbXAgfSxcbiAgICogICAgeyBwYXRoOiAndXNlci86bmFtZScsIGNvbXBvbmVudDogVXNlckNtcCB9XG4gICAqICBdfVxuICAgKiBdKTtcbiAgICogYGBgXG4gICAqL1xuICByZXNldENvbmZpZyhjb25maWc6IFJvdXRlcyk6IHZvaWQge1xuICAgIHZhbGlkYXRlQ29uZmlnKGNvbmZpZyk7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWcubWFwKHN0YW5kYXJkaXplQ29uZmlnKTtcbiAgICB0aGlzLm5hdmlnYXRlZCA9IGZhbHNlO1xuICAgIHRoaXMubGFzdFN1Y2Nlc3NmdWxJZCA9IC0xO1xuICB9XG5cbiAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7IHRoaXMuZGlzcG9zZSgpOyB9XG5cbiAgLyoqIERpc3Bvc2VzIG9mIHRoZSByb3V0ZXIgKi9cbiAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5sb2NhdGlvblN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5sb2NhdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5sb2NhdGlvblN1YnNjcmlwdGlvbiA9IG51bGwgITtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyBhbiBhcnJheSBvZiBjb21tYW5kcyB0byB0aGUgY3VycmVudCB1cmwgdHJlZSBhbmQgY3JlYXRlcyBhIG5ldyB1cmwgdHJlZS5cbiAgICpcbiAgICogV2hlbiBnaXZlbiBhbiBhY3RpdmF0ZSByb3V0ZSwgYXBwbGllcyB0aGUgZ2l2ZW4gY29tbWFuZHMgc3RhcnRpbmcgZnJvbSB0aGUgcm91dGUuXG4gICAqIFdoZW4gbm90IGdpdmVuIGEgcm91dGUsIGFwcGxpZXMgdGhlIGdpdmVuIGNvbW1hbmQgc3RhcnRpbmcgZnJvbSB0aGUgcm9vdC5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICogYGBgXG4gICAqIC8vIGNyZWF0ZSAvdGVhbS8zMy91c2VyLzExXG4gICAqIHJvdXRlci5jcmVhdGVVcmxUcmVlKFsnL3RlYW0nLCAzMywgJ3VzZXInLCAxMV0pO1xuICAgKlxuICAgKiAvLyBjcmVhdGUgL3RlYW0vMzM7ZXhwYW5kPXRydWUvdXNlci8xMVxuICAgKiByb3V0ZXIuY3JlYXRlVXJsVHJlZShbJy90ZWFtJywgMzMsIHtleHBhbmQ6IHRydWV9LCAndXNlcicsIDExXSk7XG4gICAqXG4gICAqIC8vIHlvdSBjYW4gY29sbGFwc2Ugc3RhdGljIHNlZ21lbnRzIGxpa2UgdGhpcyAodGhpcyB3b3JrcyBvbmx5IHdpdGggdGhlIGZpcnN0IHBhc3NlZC1pbiB2YWx1ZSk6XG4gICAqIHJvdXRlci5jcmVhdGVVcmxUcmVlKFsnL3RlYW0vMzMvdXNlcicsIHVzZXJJZF0pO1xuICAgKlxuICAgKiAvLyBJZiB0aGUgZmlyc3Qgc2VnbWVudCBjYW4gY29udGFpbiBzbGFzaGVzLCBhbmQgeW91IGRvIG5vdCB3YW50IHRoZSByb3V0ZXIgdG8gc3BsaXQgaXQsIHlvdVxuICAgKiAvLyBjYW4gZG8gdGhlIGZvbGxvd2luZzpcbiAgICpcbiAgICogcm91dGVyLmNyZWF0ZVVybFRyZWUoW3tzZWdtZW50UGF0aDogJy9vbmUvdHdvJ31dKTtcbiAgICpcbiAgICogLy8gY3JlYXRlIC90ZWFtLzMzLyh1c2VyLzExLy9yaWdodDpjaGF0KVxuICAgKiByb3V0ZXIuY3JlYXRlVXJsVHJlZShbJy90ZWFtJywgMzMsIHtvdXRsZXRzOiB7cHJpbWFyeTogJ3VzZXIvMTEnLCByaWdodDogJ2NoYXQnfX1dKTtcbiAgICpcbiAgICogLy8gcmVtb3ZlIHRoZSByaWdodCBzZWNvbmRhcnkgbm9kZVxuICAgKiByb3V0ZXIuY3JlYXRlVXJsVHJlZShbJy90ZWFtJywgMzMsIHtvdXRsZXRzOiB7cHJpbWFyeTogJ3VzZXIvMTEnLCByaWdodDogbnVsbH19XSk7XG4gICAqXG4gICAqIC8vIGFzc3VtaW5nIHRoZSBjdXJyZW50IHVybCBpcyBgL3RlYW0vMzMvdXNlci8xMWAgYW5kIHRoZSByb3V0ZSBwb2ludHMgdG8gYHVzZXIvMTFgXG4gICAqXG4gICAqIC8vIG5hdmlnYXRlIHRvIC90ZWFtLzMzL3VzZXIvMTEvZGV0YWlsc1xuICAgKiByb3V0ZXIuY3JlYXRlVXJsVHJlZShbJ2RldGFpbHMnXSwge3JlbGF0aXZlVG86IHJvdXRlfSk7XG4gICAqXG4gICAqIC8vIG5hdmlnYXRlIHRvIC90ZWFtLzMzL3VzZXIvMjJcbiAgICogcm91dGVyLmNyZWF0ZVVybFRyZWUoWycuLi8yMiddLCB7cmVsYXRpdmVUbzogcm91dGV9KTtcbiAgICpcbiAgICogLy8gbmF2aWdhdGUgdG8gL3RlYW0vNDQvdXNlci8yMlxuICAgKiByb3V0ZXIuY3JlYXRlVXJsVHJlZShbJy4uLy4uL3RlYW0vNDQvdXNlci8yMiddLCB7cmVsYXRpdmVUbzogcm91dGV9KTtcbiAgICogYGBgXG4gICAqL1xuICBjcmVhdGVVcmxUcmVlKGNvbW1hbmRzOiBhbnlbXSwgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHt9KTogVXJsVHJlZSB7XG4gICAgY29uc3Qge3JlbGF0aXZlVG8sICAgICAgICAgIHF1ZXJ5UGFyYW1zLCAgICAgICAgIGZyYWdtZW50LFxuICAgICAgICAgICBwcmVzZXJ2ZVF1ZXJ5UGFyYW1zLCBxdWVyeVBhcmFtc0hhbmRsaW5nLCBwcmVzZXJ2ZUZyYWdtZW50fSA9IG5hdmlnYXRpb25FeHRyYXM7XG4gICAgaWYgKGlzRGV2TW9kZSgpICYmIHByZXNlcnZlUXVlcnlQYXJhbXMgJiYgPGFueT5jb25zb2xlICYmIDxhbnk+Y29uc29sZS53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ3ByZXNlcnZlUXVlcnlQYXJhbXMgaXMgZGVwcmVjYXRlZCwgdXNlIHF1ZXJ5UGFyYW1zSGFuZGxpbmcgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgY29uc3QgYSA9IHJlbGF0aXZlVG8gfHwgdGhpcy5yb3V0ZXJTdGF0ZS5yb290O1xuICAgIGNvbnN0IGYgPSBwcmVzZXJ2ZUZyYWdtZW50ID8gdGhpcy5jdXJyZW50VXJsVHJlZS5mcmFnbWVudCA6IGZyYWdtZW50O1xuICAgIGxldCBxOiBQYXJhbXN8bnVsbCA9IG51bGw7XG4gICAgaWYgKHF1ZXJ5UGFyYW1zSGFuZGxpbmcpIHtcbiAgICAgIHN3aXRjaCAocXVlcnlQYXJhbXNIYW5kbGluZykge1xuICAgICAgICBjYXNlICdtZXJnZSc6XG4gICAgICAgICAgcSA9IHsuLi50aGlzLmN1cnJlbnRVcmxUcmVlLnF1ZXJ5UGFyYW1zLCAuLi5xdWVyeVBhcmFtc307XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3ByZXNlcnZlJzpcbiAgICAgICAgICBxID0gdGhpcy5jdXJyZW50VXJsVHJlZS5xdWVyeVBhcmFtcztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBxID0gcXVlcnlQYXJhbXMgfHwgbnVsbDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcSA9IHByZXNlcnZlUXVlcnlQYXJhbXMgPyB0aGlzLmN1cnJlbnRVcmxUcmVlLnF1ZXJ5UGFyYW1zIDogcXVlcnlQYXJhbXMgfHwgbnVsbDtcbiAgICB9XG4gICAgaWYgKHEgIT09IG51bGwpIHtcbiAgICAgIHEgPSB0aGlzLnJlbW92ZUVtcHR5UHJvcHMocSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVVcmxUcmVlKGEsIHRoaXMuY3VycmVudFVybFRyZWUsIGNvbW1hbmRzLCBxICEsIGYgISk7XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGUgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHVybC4gVGhpcyBuYXZpZ2F0aW9uIGlzIGFsd2F5cyBhYnNvbHV0ZS5cbiAgICpcbiAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdDpcbiAgICogLSByZXNvbHZlcyB0byAndHJ1ZScgd2hlbiBuYXZpZ2F0aW9uIHN1Y2NlZWRzLFxuICAgKiAtIHJlc29sdmVzIHRvICdmYWxzZScgd2hlbiBuYXZpZ2F0aW9uIGZhaWxzLFxuICAgKiAtIGlzIHJlamVjdGVkIHdoZW4gYW4gZXJyb3IgaGFwcGVucy5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICogYGBgXG4gICAqIHJvdXRlci5uYXZpZ2F0ZUJ5VXJsKFwiL3RlYW0vMzMvdXNlci8xMVwiKTtcbiAgICpcbiAgICogLy8gTmF2aWdhdGUgd2l0aG91dCB1cGRhdGluZyB0aGUgVVJMXG4gICAqIHJvdXRlci5uYXZpZ2F0ZUJ5VXJsKFwiL3RlYW0vMzMvdXNlci8xMVwiLCB7IHNraXBMb2NhdGlvbkNoYW5nZTogdHJ1ZSB9KTtcbiAgICogYGBgXG4gICAqXG4gICAqIFNpbmNlIGBuYXZpZ2F0ZUJ5VXJsKClgIHRha2VzIGFuIGFic29sdXRlIFVSTCBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyLFxuICAgKiBpdCB3aWxsIG5vdCBhcHBseSBhbnkgZGVsdGEgdG8gdGhlIGN1cnJlbnQgVVJMIGFuZCBpZ25vcmVzIGFueSBwcm9wZXJ0aWVzXG4gICAqIGluIHRoZSBzZWNvbmQgcGFyYW1ldGVyICh0aGUgYE5hdmlnYXRpb25FeHRyYXNgKSB0aGF0IHdvdWxkIGNoYW5nZSB0aGVcbiAgICogcHJvdmlkZWQgVVJMLlxuICAgKi9cbiAgbmF2aWdhdGVCeVVybCh1cmw6IHN0cmluZ3xVcmxUcmVlLCBleHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7c2tpcExvY2F0aW9uQ2hhbmdlOiBmYWxzZX0pOlxuICAgICAgUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKGlzRGV2TW9kZSgpICYmIHRoaXMuaXNOZ1pvbmVFbmFibGVkICYmICFOZ1pvbmUuaXNJbkFuZ3VsYXJab25lKCkpIHtcbiAgICAgIHRoaXMuY29uc29sZS53YXJuKFxuICAgICAgICAgIGBOYXZpZ2F0aW9uIHRyaWdnZXJlZCBvdXRzaWRlIEFuZ3VsYXIgem9uZSwgZGlkIHlvdSBmb3JnZXQgdG8gY2FsbCAnbmdab25lLnJ1bigpJz9gKTtcbiAgICB9XG5cbiAgICBjb25zdCB1cmxUcmVlID0gaXNVcmxUcmVlKHVybCkgPyB1cmwgOiB0aGlzLnBhcnNlVXJsKHVybCk7XG4gICAgY29uc3QgbWVyZ2VkVHJlZSA9IHRoaXMudXJsSGFuZGxpbmdTdHJhdGVneS5tZXJnZSh1cmxUcmVlLCB0aGlzLnJhd1VybFRyZWUpO1xuXG4gICAgcmV0dXJuIHRoaXMuc2NoZWR1bGVOYXZpZ2F0aW9uKG1lcmdlZFRyZWUsICdpbXBlcmF0aXZlJywgbnVsbCwgZXh0cmFzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZSBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgYXJyYXkgb2YgY29tbWFuZHMgYW5kIGEgc3RhcnRpbmcgcG9pbnQuXG4gICAqIElmIG5vIHN0YXJ0aW5nIHJvdXRlIGlzIHByb3ZpZGVkLCB0aGUgbmF2aWdhdGlvbiBpcyBhYnNvbHV0ZS5cbiAgICpcbiAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdDpcbiAgICogLSByZXNvbHZlcyB0byAndHJ1ZScgd2hlbiBuYXZpZ2F0aW9uIHN1Y2NlZWRzLFxuICAgKiAtIHJlc29sdmVzIHRvICdmYWxzZScgd2hlbiBuYXZpZ2F0aW9uIGZhaWxzLFxuICAgKiAtIGlzIHJlamVjdGVkIHdoZW4gYW4gZXJyb3IgaGFwcGVucy5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICogYGBgXG4gICAqIHJvdXRlci5uYXZpZ2F0ZShbJ3RlYW0nLCAzMywgJ3VzZXInLCAxMV0sIHtyZWxhdGl2ZVRvOiByb3V0ZX0pO1xuICAgKlxuICAgKiAvLyBOYXZpZ2F0ZSB3aXRob3V0IHVwZGF0aW5nIHRoZSBVUkxcbiAgICogcm91dGVyLm5hdmlnYXRlKFsndGVhbScsIDMzLCAndXNlcicsIDExXSwge3JlbGF0aXZlVG86IHJvdXRlLCBza2lwTG9jYXRpb25DaGFuZ2U6IHRydWV9KTtcbiAgICogYGBgXG4gICAqXG4gICAqIFRoZSBmaXJzdCBwYXJhbWV0ZXIgb2YgYG5hdmlnYXRlKClgIGlzIGEgZGVsdGEgdG8gYmUgYXBwbGllZCB0byB0aGUgY3VycmVudCBVUkxcbiAgICogb3IgdGhlIG9uZSBwcm92aWRlZCBpbiB0aGUgYHJlbGF0aXZlVG9gIHByb3BlcnR5IG9mIHRoZSBzZWNvbmQgcGFyYW1ldGVyICh0aGVcbiAgICogYE5hdmlnYXRpb25FeHRyYXNgKS5cbiAgICpcbiAgICogSW4gb3JkZXIgdG8gYWZmZWN0IHRoaXMgYnJvd3NlcidzIGBoaXN0b3J5LnN0YXRlYCBlbnRyeSwgdGhlIGBzdGF0ZWBcbiAgICogcGFyYW1ldGVyIGNhbiBiZSBwYXNzZWQuIFRoaXMgbXVzdCBiZSBhbiBvYmplY3QgYmVjYXVzZSB0aGUgcm91dGVyXG4gICAqIHdpbGwgYWRkIHRoZSBgbmF2aWdhdGlvbklkYCBwcm9wZXJ0eSB0byB0aGlzIG9iamVjdCBiZWZvcmUgY3JlYXRpbmdcbiAgICogdGhlIG5ldyBoaXN0b3J5IGl0ZW0uXG4gICAqL1xuICBuYXZpZ2F0ZShjb21tYW5kczogYW55W10sIGV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtza2lwTG9jYXRpb25DaGFuZ2U6IGZhbHNlfSk6XG4gICAgICBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICB2YWxpZGF0ZUNvbW1hbmRzKGNvbW1hbmRzKTtcbiAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZUJ5VXJsKHRoaXMuY3JlYXRlVXJsVHJlZShjb21tYW5kcywgZXh0cmFzKSwgZXh0cmFzKTtcbiAgfVxuXG4gIC8qKiBTZXJpYWxpemVzIGEgYFVybFRyZWVgIGludG8gYSBzdHJpbmcgKi9cbiAgc2VyaWFsaXplVXJsKHVybDogVXJsVHJlZSk6IHN0cmluZyB7IHJldHVybiB0aGlzLnVybFNlcmlhbGl6ZXIuc2VyaWFsaXplKHVybCk7IH1cblxuICAvKiogUGFyc2VzIGEgc3RyaW5nIGludG8gYSBgVXJsVHJlZWAgKi9cbiAgcGFyc2VVcmwodXJsOiBzdHJpbmcpOiBVcmxUcmVlIHtcbiAgICBsZXQgdXJsVHJlZTogVXJsVHJlZTtcbiAgICB0cnkge1xuICAgICAgdXJsVHJlZSA9IHRoaXMudXJsU2VyaWFsaXplci5wYXJzZSh1cmwpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHVybFRyZWUgPSB0aGlzLm1hbGZvcm1lZFVyaUVycm9ySGFuZGxlcihlLCB0aGlzLnVybFNlcmlhbGl6ZXIsIHVybCk7XG4gICAgfVxuICAgIHJldHVybiB1cmxUcmVlO1xuICB9XG5cbiAgLyoqIFJldHVybnMgd2hldGhlciB0aGUgdXJsIGlzIGFjdGl2YXRlZCAqL1xuICBpc0FjdGl2ZSh1cmw6IHN0cmluZ3xVcmxUcmVlLCBleGFjdDogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIGlmIChpc1VybFRyZWUodXJsKSkge1xuICAgICAgcmV0dXJuIGNvbnRhaW5zVHJlZSh0aGlzLmN1cnJlbnRVcmxUcmVlLCB1cmwsIGV4YWN0KTtcbiAgICB9XG5cbiAgICBjb25zdCB1cmxUcmVlID0gdGhpcy5wYXJzZVVybCh1cmwpO1xuICAgIHJldHVybiBjb250YWluc1RyZWUodGhpcy5jdXJyZW50VXJsVHJlZSwgdXJsVHJlZSwgZXhhY3QpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVFbXB0eVByb3BzKHBhcmFtczogUGFyYW1zKTogUGFyYW1zIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocGFyYW1zKS5yZWR1Y2UoKHJlc3VsdDogUGFyYW1zLCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgdmFsdWU6IGFueSA9IHBhcmFtc1trZXldO1xuICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwge30pO1xuICB9XG5cbiAgcHJpdmF0ZSBwcm9jZXNzTmF2aWdhdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5uYXZpZ2F0aW9ucy5zdWJzY3JpYmUoXG4gICAgICAgIHQgPT4ge1xuICAgICAgICAgIHRoaXMubmF2aWdhdGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmxhc3RTdWNjZXNzZnVsSWQgPSB0LmlkO1xuICAgICAgICAgICh0aGlzLmV2ZW50cyBhcyBTdWJqZWN0PEV2ZW50PilcbiAgICAgICAgICAgICAgLm5leHQobmV3IE5hdmlnYXRpb25FbmQoXG4gICAgICAgICAgICAgICAgICB0LmlkLCB0aGlzLnNlcmlhbGl6ZVVybCh0LmV4dHJhY3RlZFVybCksIHRoaXMuc2VyaWFsaXplVXJsKHRoaXMuY3VycmVudFVybFRyZWUpKSk7XG4gICAgICAgICAgdGhpcy5sYXN0U3VjY2Vzc2Z1bE5hdmlnYXRpb24gPSB0aGlzLmN1cnJlbnROYXZpZ2F0aW9uO1xuICAgICAgICAgIHRoaXMuY3VycmVudE5hdmlnYXRpb24gPSBudWxsO1xuICAgICAgICAgIHQucmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZSA9PiB7IHRoaXMuY29uc29sZS53YXJuKGBVbmhhbmRsZWQgTmF2aWdhdGlvbiBFcnJvcjogYCk7IH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzY2hlZHVsZU5hdmlnYXRpb24oXG4gICAgICByYXdVcmw6IFVybFRyZWUsIHNvdXJjZTogTmF2aWdhdGlvblRyaWdnZXIsIHJlc3RvcmVkU3RhdGU6IFJlc3RvcmVkU3RhdGV8bnVsbCxcbiAgICAgIGV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGxhc3ROYXZpZ2F0aW9uID0gdGhpcy5nZXRUcmFuc2l0aW9uKCk7XG4gICAgLy8gSWYgdGhlIHVzZXIgdHJpZ2dlcnMgYSBuYXZpZ2F0aW9uIGltcGVyYXRpdmVseSAoZS5nLiwgYnkgdXNpbmcgbmF2aWdhdGVCeVVybCksXG4gICAgLy8gYW5kIHRoYXQgbmF2aWdhdGlvbiByZXN1bHRzIGluICdyZXBsYWNlU3RhdGUnIHRoYXQgbGVhZHMgdG8gdGhlIHNhbWUgVVJMLFxuICAgIC8vIHdlIHNob3VsZCBza2lwIHRob3NlLlxuICAgIGlmIChsYXN0TmF2aWdhdGlvbiAmJiBzb3VyY2UgIT09ICdpbXBlcmF0aXZlJyAmJiBsYXN0TmF2aWdhdGlvbi5zb3VyY2UgPT09ICdpbXBlcmF0aXZlJyAmJlxuICAgICAgICBsYXN0TmF2aWdhdGlvbi5yYXdVcmwudG9TdHJpbmcoKSA9PT0gcmF3VXJsLnRvU3RyaW5nKCkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7ICAvLyByZXR1cm4gdmFsdWUgaXMgbm90IHVzZWRcbiAgICB9XG5cbiAgICAvLyBCZWNhdXNlIG9mIGEgYnVnIGluIElFIGFuZCBFZGdlLCB0aGUgbG9jYXRpb24gY2xhc3MgZmlyZXMgdHdvIGV2ZW50cyAocG9wc3RhdGUgYW5kXG4gICAgLy8gaGFzaGNoYW5nZSkgZXZlcnkgc2luZ2xlIHRpbWUuIFRoZSBzZWNvbmQgb25lIHNob3VsZCBiZSBpZ25vcmVkLiBPdGhlcndpc2UsIHRoZSBVUkwgd2lsbFxuICAgIC8vIGZsaWNrZXIuIEhhbmRsZXMgdGhlIGNhc2Ugd2hlbiBhIHBvcHN0YXRlIHdhcyBlbWl0dGVkIGZpcnN0LlxuICAgIGlmIChsYXN0TmF2aWdhdGlvbiAmJiBzb3VyY2UgPT0gJ2hhc2hjaGFuZ2UnICYmIGxhc3ROYXZpZ2F0aW9uLnNvdXJjZSA9PT0gJ3BvcHN0YXRlJyAmJlxuICAgICAgICBsYXN0TmF2aWdhdGlvbi5yYXdVcmwudG9TdHJpbmcoKSA9PT0gcmF3VXJsLnRvU3RyaW5nKCkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7ICAvLyByZXR1cm4gdmFsdWUgaXMgbm90IHVzZWRcbiAgICB9XG4gICAgLy8gQmVjYXVzZSBvZiBhIGJ1ZyBpbiBJRSBhbmQgRWRnZSwgdGhlIGxvY2F0aW9uIGNsYXNzIGZpcmVzIHR3byBldmVudHMgKHBvcHN0YXRlIGFuZFxuICAgIC8vIGhhc2hjaGFuZ2UpIGV2ZXJ5IHNpbmdsZSB0aW1lLiBUaGUgc2Vjb25kIG9uZSBzaG91bGQgYmUgaWdub3JlZC4gT3RoZXJ3aXNlLCB0aGUgVVJMIHdpbGxcbiAgICAvLyBmbGlja2VyLiBIYW5kbGVzIHRoZSBjYXNlIHdoZW4gYSBoYXNoY2hhbmdlIHdhcyBlbWl0dGVkIGZpcnN0LlxuICAgIGlmIChsYXN0TmF2aWdhdGlvbiAmJiBzb3VyY2UgPT0gJ3BvcHN0YXRlJyAmJiBsYXN0TmF2aWdhdGlvbi5zb3VyY2UgPT09ICdoYXNoY2hhbmdlJyAmJlxuICAgICAgICBsYXN0TmF2aWdhdGlvbi5yYXdVcmwudG9TdHJpbmcoKSA9PT0gcmF3VXJsLnRvU3RyaW5nKCkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7ICAvLyByZXR1cm4gdmFsdWUgaXMgbm90IHVzZWRcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZTogYW55ID0gbnVsbDtcbiAgICBsZXQgcmVqZWN0OiBhbnkgPSBudWxsO1xuXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXMsIHJlaikgPT4ge1xuICAgICAgcmVzb2x2ZSA9IHJlcztcbiAgICAgIHJlamVjdCA9IHJlajtcbiAgICB9KTtcblxuICAgIGNvbnN0IGlkID0gKyt0aGlzLm5hdmlnYXRpb25JZDtcbiAgICB0aGlzLnNldFRyYW5zaXRpb24oe1xuICAgICAgaWQsXG4gICAgICBzb3VyY2UsXG4gICAgICByZXN0b3JlZFN0YXRlLFxuICAgICAgY3VycmVudFVybFRyZWU6IHRoaXMuY3VycmVudFVybFRyZWUsXG4gICAgICBjdXJyZW50UmF3VXJsOiB0aGlzLnJhd1VybFRyZWUsIHJhd1VybCwgZXh0cmFzLCByZXNvbHZlLCByZWplY3QsIHByb21pc2UsXG4gICAgICBjdXJyZW50U25hcHNob3Q6IHRoaXMucm91dGVyU3RhdGUuc25hcHNob3QsXG4gICAgICBjdXJyZW50Um91dGVyU3RhdGU6IHRoaXMucm91dGVyU3RhdGVcbiAgICB9KTtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBlcnJvciBpcyBwcm9wYWdhdGVkIGV2ZW4gdGhvdWdoIGBwcm9jZXNzTmF2aWdhdGlvbnNgIGNhdGNoXG4gICAgLy8gaGFuZGxlciBkb2VzIG5vdCByZXRocm93XG4gICAgcmV0dXJuIHByb21pc2UuY2F0Y2goKGU6IGFueSkgPT4geyByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7IH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRCcm93c2VyVXJsKFxuICAgICAgdXJsOiBVcmxUcmVlLCByZXBsYWNlVXJsOiBib29sZWFuLCBpZDogbnVtYmVyLCBzdGF0ZT86IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7XG4gICAgY29uc3QgcGF0aCA9IHRoaXMudXJsU2VyaWFsaXplci5zZXJpYWxpemUodXJsKTtcbiAgICBzdGF0ZSA9IHN0YXRlIHx8IHt9O1xuICAgIGlmICh0aGlzLmxvY2F0aW9uLmlzQ3VycmVudFBhdGhFcXVhbFRvKHBhdGgpIHx8IHJlcGxhY2VVcmwpIHtcbiAgICAgIC8vIFRPRE8oamFzb25hZGVuKTogUmVtb3ZlIGZpcnN0IGBuYXZpZ2F0aW9uSWRgIGFuZCByZWx5IG9uIGBuZ2AgbmFtZXNwYWNlLlxuICAgICAgdGhpcy5sb2NhdGlvbi5yZXBsYWNlU3RhdGUocGF0aCwgJycsIHsuLi5zdGF0ZSwgbmF2aWdhdGlvbklkOiBpZH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvY2F0aW9uLmdvKHBhdGgsICcnLCB7Li4uc3RhdGUsIG5hdmlnYXRpb25JZDogaWR9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc2V0U3RhdGVBbmRVcmwoc3RvcmVkU3RhdGU6IFJvdXRlclN0YXRlLCBzdG9yZWRVcmw6IFVybFRyZWUsIHJhd1VybDogVXJsVHJlZSk6IHZvaWQge1xuICAgICh0aGlzIGFze3JvdXRlclN0YXRlOiBSb3V0ZXJTdGF0ZX0pLnJvdXRlclN0YXRlID0gc3RvcmVkU3RhdGU7XG4gICAgdGhpcy5jdXJyZW50VXJsVHJlZSA9IHN0b3JlZFVybDtcbiAgICB0aGlzLnJhd1VybFRyZWUgPSB0aGlzLnVybEhhbmRsaW5nU3RyYXRlZ3kubWVyZ2UodGhpcy5jdXJyZW50VXJsVHJlZSwgcmF3VXJsKTtcbiAgICB0aGlzLnJlc2V0VXJsVG9DdXJyZW50VXJsVHJlZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFVybFRvQ3VycmVudFVybFRyZWUoKTogdm9pZCB7XG4gICAgdGhpcy5sb2NhdGlvbi5yZXBsYWNlU3RhdGUoXG4gICAgICAgIHRoaXMudXJsU2VyaWFsaXplci5zZXJpYWxpemUodGhpcy5yYXdVcmxUcmVlKSwgJycsIHtuYXZpZ2F0aW9uSWQ6IHRoaXMubGFzdFN1Y2Nlc3NmdWxJZH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlQ29tbWFuZHMoY29tbWFuZHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29tbWFuZHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjbWQgPSBjb21tYW5kc1tpXTtcbiAgICBpZiAoY21kID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHJlcXVlc3RlZCBwYXRoIGNvbnRhaW5zICR7Y21kfSBzZWdtZW50IGF0IGluZGV4ICR7aX1gKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==