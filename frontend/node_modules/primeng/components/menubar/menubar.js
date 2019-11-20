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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var domhandler_1 = require("../dom/domhandler");
var router_1 = require("@angular/router");
var MenubarSub = /** @class */ (function () {
    function MenubarSub(renderer, cd) {
        this.renderer = renderer;
        this.cd = cd;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.menuHoverActive = false;
    }
    MenubarSub.prototype.onItemMenuClick = function (event, item, menuitem) {
        if (!this.autoDisplay) {
            if (menuitem.disabled) {
                return;
            }
            this.activeItem = this.activeMenu ? (this.activeMenu.isEqualNode(item) && this.autoDisplay ? null : item) : item;
            var nextElement = item.children[0].nextElementSibling;
            if (nextElement) {
                var sublist = nextElement.children[0];
                if (this.autoZIndex) {
                    sublist.style.zIndex = String(this.baseZIndex + (++domhandler_1.DomHandler.zindex));
                }
                if (this.root) {
                    sublist.style.top = domhandler_1.DomHandler.getOuterHeight(item.children[0]) + 'px';
                    sublist.style.left = '0px';
                }
                else {
                    sublist.style.top = '0px';
                    sublist.style.left = domhandler_1.DomHandler.getOuterWidth(item.children[0]) + 'px';
                }
            }
            this.menuClick = true;
            this.menuHoverActive = this.activeMenu ? (!this.activeMenu.isEqualNode(item)) : true;
            this.activeMenu = this.activeMenu ? (this.activeMenu.isEqualNode(item) && this.autoDisplay ? null : item) : item;
            this.bindEventListener();
        }
    };
    MenubarSub.prototype.bindEventListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function (event) {
                if (!_this.menuClick) {
                    _this.activeItem = null;
                    _this.menuHoverActive = false;
                }
                _this.menuClick = false;
            });
        }
    };
    MenubarSub.prototype.onItemMouseEnter = function (event, item, menuitem) {
        if (this.autoDisplay || (!this.autoDisplay && this.root && this.menuHoverActive)) {
            if (menuitem.disabled) {
                return;
            }
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = null;
            }
            this.activeItem = this.activeItem ? (this.activeItem.isEqualNode(item) && this.autoDisplay ? null : item) : item;
            var nextElement = item.children[0].nextElementSibling;
            if (nextElement) {
                var sublist = nextElement.children[0];
                sublist.style.zIndex = String(++domhandler_1.DomHandler.zindex);
                if (this.root) {
                    sublist.style.top = domhandler_1.DomHandler.getOuterHeight(item.children[0]) + 'px';
                    sublist.style.left = '0px';
                }
                else {
                    sublist.style.top = '0px';
                    sublist.style.left = domhandler_1.DomHandler.getOuterWidth(item.children[0]) + 'px';
                }
            }
            this.activeMenu = this.activeMenu ? (this.activeMenu.isEqualNode(item) && this.autoDisplay ? null : item) : item;
        }
    };
    MenubarSub.prototype.onItemMouseLeave = function (event) {
        var _this = this;
        if (this.autoDisplay) {
            this.hideTimeout = setTimeout(function () {
                _this.activeItem = null;
                _this.cd.markForCheck();
            }, 250);
        }
    };
    MenubarSub.prototype.itemClick = function (event, item) {
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
        this.activeItem = null;
    };
    MenubarSub.prototype.listClick = function (event) {
        if (this.autoDisplay) {
            this.activeItem = null;
        }
    };
    MenubarSub.prototype.ngOnDestroy = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MenubarSub.prototype, "item", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MenubarSub.prototype, "root", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MenubarSub.prototype, "autoDisplay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MenubarSub.prototype, "autoZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], MenubarSub.prototype, "baseZIndex", void 0);
    MenubarSub = __decorate([
        core_1.Component({
            selector: 'p-menubarSub',
            template: "\n        <ul [ngClass]=\"{'ui-menubar-root-list':root, 'ui-widget-content ui-corner-all ui-submenu-list ui-shadow':!root}\"\n            (click)=\"listClick($event)\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"ui-menu-separator ui-widget-content\" [ngClass]=\"{'ui-helper-hidden': child.visible === false}\">\n                <li *ngIf=\"!child.separator\" #listItem [ngClass]=\"{'ui-menuitem ui-corner-all':true,\n                        'ui-menu-parent':child.items,'ui-menuitem-active':listItem==activeItem,'ui-helper-hidden': child.visible === false}\"\n                        (mouseenter)=\"onItemMouseEnter($event,listItem,child)\" (mouseleave)=\"onItemMouseLeave($event)\" (click)=\"onItemMenuClick($event, listItem, child)\">\n                    <a *ngIf=\"!child.routerLink\" [href]=\"child.url||'#'\" [attr.data-automationid]=\"child.automationId\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" (click)=\"itemClick($event, child)\"\n                         [ngClass]=\"{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}\" [ngStyle]=\"child.style\" [class]=\"child.styleClass\">\n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                        <span class=\"ui-submenu-icon pi pi-fw\" *ngIf=\"child.items\" [ngClass]=\"{'pi-caret-down':root,'pi-caret-right':!root}\"></span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [attr.data-automationid]=\"child.automationId\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'ui-state-active'\" [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\"\n                        [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\"\n                        (click)=\"itemClick($event, child)\" [ngClass]=\"{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}\" [ngStyle]=\"child.style\" [class]=\"child.styleClass\">\n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                        <span class=\"ui-submenu-icon pi pi-fw\" *ngIf=\"child.items\" [ngClass]=\"{'pi-caret-down':root,'pi-caret-right':!root}\"></span>\n                    </a>\n                    <p-menubarSub class=\"ui-submenu\" [item]=\"child\" *ngIf=\"child.items\" [autoDisplay]=\"true\"></p-menubarSub>\n                </li>\n            </ng-template>\n        </ul>\n    "
        }),
        __metadata("design:paramtypes", [core_1.Renderer2, core_1.ChangeDetectorRef])
    ], MenubarSub);
    return MenubarSub;
}());
exports.MenubarSub = MenubarSub;
var Menubar = /** @class */ (function () {
    function Menubar(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.autoDisplay = true;
        this.autoZIndex = true;
        this.baseZIndex = 0;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], Menubar.prototype, "model", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Menubar.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Menubar.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Menubar.prototype, "autoDisplay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Menubar.prototype, "autoZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Menubar.prototype, "baseZIndex", void 0);
    Menubar = __decorate([
        core_1.Component({
            selector: 'p-menubar',
            template: "\n        <div [ngClass]=\"{'ui-menubar ui-widget ui-widget-content ui-corner-all':true}\" [class]=\"styleClass\" [ngStyle]=\"style\">\n            <p-menubarSub [item]=\"model\" root=\"root\" [autoDisplay]=\"autoDisplay\" [baseZIndex]=\"baseZIndex\" [autoZIndex]=\"autoZIndex\">\n                <ng-content></ng-content>\n            </p-menubarSub>\n            <div class=\"ui-menubar-custom\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2])
    ], Menubar);
    return Menubar;
}());
exports.Menubar = Menubar;
var MenubarModule = /** @class */ (function () {
    function MenubarModule() {
    }
    MenubarModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, router_1.RouterModule],
            exports: [Menubar, router_1.RouterModule],
            declarations: [Menubar, MenubarSub]
        })
    ], MenubarModule);
    return MenubarModule;
}());
exports.MenubarModule = MenubarModule;
//# sourceMappingURL=menubar.js.map