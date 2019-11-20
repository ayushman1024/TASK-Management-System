"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var common_1 = require("@angular/common");
var domhandler_1 = require("../dom/domhandler");
var router_1 = require("@angular/router");
var SlideMenuSub = /** @class */ (function () {
    function SlideMenuSub(slideMenu) {
        this.slideMenu = slideMenu;
        this.backLabel = 'Back';
        this.easing = 'ease-out';
    }
    SlideMenuSub.prototype.itemClick = function (event, item, listitem) {
        var _this = this;
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
        if (item.items && !this.slideMenu.animating) {
            this.slideMenu.left -= this.slideMenu.menuWidth;
            this.activeItem = listitem;
            this.slideMenu.animating = true;
            setTimeout(function () { return _this.slideMenu.animating = false; }, this.effectDuration);
        }
        if (!item.items && this.slideMenu.popup) {
            this.slideMenu.hide();
        }
    };
    SlideMenuSub.prototype.ngOnDestroy = function () {
        this.activeItem = null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SlideMenuSub.prototype, "item", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SlideMenuSub.prototype, "root", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SlideMenuSub.prototype, "backLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], SlideMenuSub.prototype, "menuWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SlideMenuSub.prototype, "effectDuration", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SlideMenuSub.prototype, "easing", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], SlideMenuSub.prototype, "index", void 0);
    SlideMenuSub = __decorate([
        core_1.Component({
            selector: 'p-slideMenuSub',
            template: "\n        <ul [ngClass]=\"{'ui-slidemenu-rootlist':root, 'ui-submenu-list':!root, 'ui-active-submenu': (-slideMenu.left == (index * menuWidth))}\"\n            [style.width.px]=\"menuWidth\" [style.left.px]=\"root ? slideMenu.left : slideMenu.menuWidth\"\n            [style.transitionProperty]=\"root ? 'left' : 'none'\" [style.transitionDuration]=\"effectDuration + 'ms'\" [style.transitionTimingFunction]=\"easing\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"ui-menu-separator ui-widget-content\" [ngClass]=\"{'ui-helper-hidden': child.visible === false}\">\n                <li *ngIf=\"!child.separator\" #listitem [ngClass]=\"{'ui-menuitem ui-widget ui-corner-all':true,'ui-menuitem-active':listitem==activeItem,'ui-helper-hidden': child.visible === false}\"\n                    [class]=\"child.styleClass\" [ngStyle]=\"child.style\">\n                    <a *ngIf=\"!child.routerLink\" [href]=\"child.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\"\n                        [ngClass]=\"{'ui-state-disabled':child.disabled}\" \n                        (click)=\"itemClick($event, child, listitem)\">\n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                        <span class=\"ui-submenu-icon pi pi-fw pi-caret-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'ui-state-active'\" \n                        [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\" [href]=\"child.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" \n                        [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\"\n                        [ngClass]=\"{'ui-state-disabled':child.disabled}\" \n                        (click)=\"itemClick($event, child, listitem)\">\n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                        <span class=\"ui-submenu-icon pi pi-fw pi-caret-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <p-slideMenuSub class=\"ui-submenu\" [item]=\"child\" [index]=\"index + 1\" [menuWidth]=\"menuWidth\" *ngIf=\"child.items\"></p-slideMenuSub>\n                </li>\n            </ng-template>\n        </ul>\n    "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return SlideMenu; }))),
        __metadata("design:paramtypes", [SlideMenu])
    ], SlideMenuSub);
    return SlideMenuSub;
}());
exports.SlideMenuSub = SlideMenuSub;
var SlideMenu = /** @class */ (function () {
    function SlideMenu(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.menuWidth = 190;
        this.viewportHeight = 180;
        this.effectDuration = 250;
        this.easing = 'ease-out';
        this.backLabel = 'Back';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.left = 0;
        this.animating = false;
    }
    SlideMenu.prototype.ngAfterViewChecked = function () {
        if (!this.viewportUpdated && !this.popup && this.containerViewChild) {
            this.updateViewPort();
            this.viewportUpdated = true;
        }
    };
    Object.defineProperty(SlideMenu.prototype, "container", {
        set: function (element) {
            this.containerViewChild = element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideMenu.prototype, "backward", {
        set: function (element) {
            this.backwardViewChild = element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideMenu.prototype, "slideMenuContent", {
        set: function (element) {
            this.slideMenuContentViewChild = element;
        },
        enumerable: true,
        configurable: true
    });
    SlideMenu.prototype.updateViewPort = function () {
        this.slideMenuContentViewChild.nativeElement.style.height = this.viewportHeight - domhandler_1.DomHandler.getHiddenElementOuterHeight(this.backwardViewChild.nativeElement) + 'px';
    };
    SlideMenu.prototype.toggle = function (event) {
        if (this.visible)
            this.hide();
        else
            this.show(event);
        this.preventDocumentDefault = true;
    };
    SlideMenu.prototype.show = function (event) {
        this.target = event.currentTarget;
        this.visible = true;
        this.preventDocumentDefault = true;
    };
    SlideMenu.prototype.onOverlayAnimationStart = function (event) {
        switch (event.toState) {
            case 'visible':
                if (this.popup) {
                    this.updateViewPort();
                    this.moveOnTop();
                    this.appendOverlay();
                    domhandler_1.DomHandler.absolutePosition(this.containerViewChild.nativeElement, this.target);
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                }
                break;
            case 'void':
                this.onOverlayHide();
                break;
        }
    };
    SlideMenu.prototype.appendOverlay = function () {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.containerViewChild.nativeElement);
            else
                domhandler_1.DomHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
        }
    };
    SlideMenu.prototype.restoreOverlayAppend = function () {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
        }
    };
    SlideMenu.prototype.moveOnTop = function () {
        if (this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++domhandler_1.DomHandler.zindex));
        }
    };
    SlideMenu.prototype.hide = function () {
        this.visible = false;
    };
    SlideMenu.prototype.onWindowResize = function () {
        this.hide();
    };
    SlideMenu.prototype.onClick = function (event) {
        this.preventDocumentDefault = true;
    };
    SlideMenu.prototype.goBack = function () {
        this.left += this.menuWidth;
    };
    SlideMenu.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function () {
                if (!_this.preventDocumentDefault) {
                    _this.hide();
                }
                _this.preventDocumentDefault = false;
            });
        }
    };
    SlideMenu.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    SlideMenu.prototype.bindDocumentResizeListener = function () {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    };
    SlideMenu.prototype.unbindDocumentResizeListener = function () {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    };
    SlideMenu.prototype.onOverlayHide = function () {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.preventDocumentDefault = false;
        this.target = null;
        this.left = 0;
    };
    SlideMenu.prototype.ngOnDestroy = function () {
        if (this.popup) {
            this.restoreOverlayAppend();
            this.onOverlayHide();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], SlideMenu.prototype, "model", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SlideMenu.prototype, "popup", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SlideMenu.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SlideMenu.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], SlideMenu.prototype, "menuWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], SlideMenu.prototype, "viewportHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SlideMenu.prototype, "effectDuration", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SlideMenu.prototype, "easing", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SlideMenu.prototype, "backLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SlideMenu.prototype, "appendTo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SlideMenu.prototype, "autoZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], SlideMenu.prototype, "baseZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SlideMenu.prototype, "showTransitionOptions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SlideMenu.prototype, "hideTransitionOptions", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], SlideMenu.prototype, "container", null);
    __decorate([
        core_1.ViewChild('backward'),
        __metadata("design:type", core_1.ElementRef),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], SlideMenu.prototype, "backward", null);
    __decorate([
        core_1.ViewChild('slideMenuContent'),
        __metadata("design:type", core_1.ElementRef),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], SlideMenu.prototype, "slideMenuContent", null);
    SlideMenu = __decorate([
        core_1.Component({
            selector: 'p-slideMenu',
            template: "\n        <div #container [ngClass]=\"{'ui-slidemenu ui-widget ui-widget-content ui-corner-all':true, 'ui-slidemenu-dynamic ui-shadow':popup}\" \n            [class]=\"styleClass\" [ngStyle]=\"style\" (click)=\"onClick($event)\"\n            [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" [@.disabled]=\"popup !== true\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" *ngIf=\"!popup || visible\">\n            <div class=\"ui-slidemenu-wrapper\" [style.height.px]=\"viewportHeight\">\n                <div #slideMenuContent class=\"ui-slidemenu-content\">\n                    <p-slideMenuSub [item]=\"model\" root=\"root\" [index]=\"0\" [menuWidth]=\"menuWidth\" [effectDuration]=\"effectDuration\" [easing]=\"easing\"></p-slideMenuSub>\n                </div>\n                <div #backward class=\"ui-slidemenu-backward ui-widget-header ui-corner-all\" [style.display]=\"left ? 'block' : 'none'\" (click)=\"goBack()\">\n                    <span class=\"ui-slidemenu-backward-icon pi pi-fw pi-caret-left\"></span><span>{{backLabel}}</span>\n                </div>\n            </div>\n        </div>\n    ",
            animations: [
                animations_1.trigger('overlayAnimation', [
                    animations_1.state('void', animations_1.style({
                        transform: 'translateY(5%)',
                        opacity: 0
                    })),
                    animations_1.state('visible', animations_1.style({
                        transform: 'translateY(0)',
                        opacity: 1
                    })),
                    animations_1.transition('void => visible', animations_1.animate('{{showTransitionParams}}')),
                    animations_1.transition('visible => void', animations_1.animate('{{hideTransitionParams}}'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2])
    ], SlideMenu);
    return SlideMenu;
}());
exports.SlideMenu = SlideMenu;
var SlideMenuModule = /** @class */ (function () {
    function SlideMenuModule() {
    }
    SlideMenuModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, router_1.RouterModule],
            exports: [SlideMenu, router_1.RouterModule],
            declarations: [SlideMenu, SlideMenuSub]
        })
    ], SlideMenuModule);
    return SlideMenuModule;
}());
exports.SlideMenuModule = SlideMenuModule;
//# sourceMappingURL=slidemenu.js.map