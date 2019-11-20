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
var TieredMenuSub = /** @class */ (function () {
    function TieredMenuSub(tieredMenu) {
        this.tieredMenu = tieredMenu;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.hideDelay = 250;
    }
    TieredMenuSub.prototype.onItemMouseEnter = function (event, item, menuitem) {
        if (menuitem.disabled) {
            return;
        }
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
        this.activeItem = item;
        var nextElement = item.children[0].nextElementSibling;
        if (nextElement) {
            var sublist = nextElement.children[0];
            if (this.autoZIndex) {
                sublist.style.zIndex = String(this.baseZIndex + (++domhandler_1.DomHandler.zindex));
            }
            sublist.style.zIndex = String(++domhandler_1.DomHandler.zindex);
            sublist.style.top = '0px';
            sublist.style.left = domhandler_1.DomHandler.getOuterWidth(item.children[0]) + 'px';
        }
    };
    TieredMenuSub.prototype.onItemMouseLeave = function (event) {
        var _this = this;
        this.hideTimeout = setTimeout(function () {
            _this.activeItem = null;
        }, this.hideDelay);
    };
    TieredMenuSub.prototype.itemClick = function (event, item) {
        if (item.disabled) {
            event.preventDefault();
            return true;
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
        if (!item.items && this.tieredMenu.popup) {
            this.tieredMenu.hide();
        }
    };
    TieredMenuSub.prototype.listClick = function (event) {
        this.activeItem = null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TieredMenuSub.prototype, "item", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TieredMenuSub.prototype, "root", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TieredMenuSub.prototype, "autoZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TieredMenuSub.prototype, "baseZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TieredMenuSub.prototype, "hideDelay", void 0);
    TieredMenuSub = __decorate([
        core_1.Component({
            selector: 'p-tieredMenuSub',
            template: "\n        <ul [ngClass]=\"{'ui-widget-content ui-corner-all ui-shadow ui-submenu-list': !root}\" (click)=\"listClick($event)\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"ui-menu-separator ui-widget-content\" [ngClass]=\"{'ui-helper-hidden': child.visible === false}\">\n                <li *ngIf=\"!child.separator\" #listItem [ngClass]=\"{'ui-menuitem ui-widget ui-corner-all':true,'ui-menuitem-active':listItem==activeItem,'ui-helper-hidden': child.visible === false}\"\n                    [class]=\"child.styleClass\" [ngStyle]=\"child.style\"\n                    (mouseenter)=\"onItemMouseEnter($event, listItem, child)\" (mouseleave)=\"onItemMouseLeave($event)\">\n                    <a *ngIf=\"!child.routerLink\" [attr.href]=\"child.url\" class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\"\n                        [ngClass]=\"{'ui-state-disabled':child.disabled}\" (click)=\"itemClick($event, child)\">\n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                        <span class=\"ui-submenu-icon pi pi-fw pi-caret-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'ui-state-active'\" \n                        [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\"\n                        class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\"\n                        [ngClass]=\"{'ui-state-disabled':child.disabled}\" (click)=\"itemClick($event, child)\">\n                        \n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                        <span class=\"ui-submenu-icon pi pi-fw pi-caret-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <p-tieredMenuSub class=\"ui-submenu\" [item]=\"child\" *ngIf=\"child.items\" [baseZIndex]=\"baseZIndex\" [autoZIndex]=\"autoZIndex\" [hideDelay]=\"hideDelay\"></p-tieredMenuSub>\n                </li>\n            </ng-template>\n        </ul>\n    "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return TieredMenu; }))),
        __metadata("design:paramtypes", [TieredMenu])
    ], TieredMenuSub);
    return TieredMenuSub;
}());
exports.TieredMenuSub = TieredMenuSub;
var TieredMenu = /** @class */ (function () {
    function TieredMenu(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.hideDelay = 250;
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
    }
    TieredMenu.prototype.toggle = function (event) {
        if (this.visible)
            this.hide();
        else
            this.show(event);
        this.preventDocumentDefault = true;
    };
    TieredMenu.prototype.show = function (event) {
        this.target = event.currentTarget;
        this.visible = true;
        this.preventDocumentDefault = true;
    };
    TieredMenu.prototype.onOverlayAnimationStart = function (event) {
        switch (event.toState) {
            case 'visible':
                if (this.popup) {
                    this.container = event.element;
                    this.moveOnTop();
                    this.appendOverlay();
                    domhandler_1.DomHandler.absolutePosition(this.container, this.target);
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                }
                break;
            case 'void':
                this.onOverlayHide();
                break;
        }
    };
    TieredMenu.prototype.appendOverlay = function () {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                domhandler_1.DomHandler.appendChild(this.container, this.appendTo);
        }
    };
    TieredMenu.prototype.restoreOverlayAppend = function () {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
    };
    TieredMenu.prototype.moveOnTop = function () {
        if (this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++domhandler_1.DomHandler.zindex));
        }
    };
    TieredMenu.prototype.hide = function () {
        this.visible = false;
    };
    TieredMenu.prototype.onWindowResize = function () {
        this.hide();
    };
    TieredMenu.prototype.bindDocumentClickListener = function () {
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
    TieredMenu.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    TieredMenu.prototype.bindDocumentResizeListener = function () {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    };
    TieredMenu.prototype.unbindDocumentResizeListener = function () {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    };
    TieredMenu.prototype.onOverlayHide = function () {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.preventDocumentDefault = false;
        this.target = null;
    };
    TieredMenu.prototype.ngOnDestroy = function () {
        if (this.popup) {
            this.restoreOverlayAppend();
            this.onOverlayHide();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TieredMenu.prototype, "model", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TieredMenu.prototype, "popup", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TieredMenu.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TieredMenu.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TieredMenu.prototype, "appendTo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TieredMenu.prototype, "autoZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TieredMenu.prototype, "baseZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TieredMenu.prototype, "hideDelay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TieredMenu.prototype, "showTransitionOptions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TieredMenu.prototype, "hideTransitionOptions", void 0);
    TieredMenu = __decorate([
        core_1.Component({
            selector: 'p-tieredMenu',
            template: "\n        <div [ngClass]=\"{'ui-tieredmenu ui-widget ui-widget-content ui-corner-all':true, 'ui-tieredmenu-dynamic ui-shadow':popup}\" [class]=\"styleClass\" [ngStyle]=\"style\"\n            [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" [@.disabled]=\"popup !== true\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" *ngIf=\"!popup || visible\">\n            <p-tieredMenuSub [item]=\"model\" root=\"root\" [baseZIndex]=\"baseZIndex\" [autoZIndex]=\"autoZIndex\" [hideDelay]=\"hideDelay\"></p-tieredMenuSub>\n        </div>\n    ",
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
    ], TieredMenu);
    return TieredMenu;
}());
exports.TieredMenu = TieredMenu;
var TieredMenuModule = /** @class */ (function () {
    function TieredMenuModule() {
    }
    TieredMenuModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, router_1.RouterModule],
            exports: [TieredMenu, router_1.RouterModule],
            declarations: [TieredMenu, TieredMenuSub]
        })
    ], TieredMenuModule);
    return TieredMenuModule;
}());
exports.TieredMenuModule = TieredMenuModule;
//# sourceMappingURL=tieredmenu.js.map