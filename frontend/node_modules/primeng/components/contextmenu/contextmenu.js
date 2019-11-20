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
var common_1 = require("@angular/common");
var domhandler_1 = require("../dom/domhandler");
var router_1 = require("@angular/router");
var ContextMenuSub = /** @class */ (function () {
    function ContextMenuSub(contextMenu) {
        this.contextMenu = contextMenu;
    }
    ContextMenuSub.prototype.onItemMouseEnter = function (event, item, menuitem) {
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
            sublist.style.zIndex = ++domhandler_1.DomHandler.zindex;
            this.position(sublist, item);
        }
    };
    ContextMenuSub.prototype.onItemMouseLeave = function (event, link) {
        var _this = this;
        this.hideTimeout = setTimeout(function () {
            _this.activeItem = null;
        }, 1000);
    };
    ContextMenuSub.prototype.itemClick = function (event, item) {
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
    };
    ContextMenuSub.prototype.listClick = function (event) {
        this.activeItem = null;
    };
    ContextMenuSub.prototype.position = function (sublist, item) {
        this.containerOffset = domhandler_1.DomHandler.getOffset(item.parentElement);
        var viewport = domhandler_1.DomHandler.getViewport();
        var sublistWidth = sublist.offsetParent ? sublist.offsetWidth : domhandler_1.DomHandler.getHiddenElementOuterWidth(sublist);
        var itemOuterWidth = domhandler_1.DomHandler.getOuterWidth(item.children[0]);
        var itemOuterHeight = domhandler_1.DomHandler.getOuterHeight(item.children[0]);
        var sublistHeight = sublist.offsetHeight ? sublist.offsetHeight : domhandler_1.DomHandler.getHiddenElementOuterHeight(sublist);
        if ((parseInt(this.containerOffset.top) + itemOuterHeight + sublistHeight) > (viewport.height - domhandler_1.DomHandler.calculateScrollbarHeight())) {
            sublist.style.bottom = '0px';
        }
        else {
            sublist.style.top = '0px';
        }
        if ((parseInt(this.containerOffset.left) + itemOuterWidth + sublistWidth) > (viewport.width - domhandler_1.DomHandler.calculateScrollbarWidth())) {
            sublist.style.left = -sublistWidth + 'px';
        }
        else {
            sublist.style.left = itemOuterWidth + 'px';
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ContextMenuSub.prototype, "item", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ContextMenuSub.prototype, "root", void 0);
    ContextMenuSub = __decorate([
        core_1.Component({
            selector: 'p-contextMenuSub',
            template: "\n        <ul [ngClass]=\"{'ui-widget-content ui-corner-all ui-submenu-list ui-shadow':!root}\" class=\"ui-menu-list\" (click)=\"listClick($event)\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"ui-menu-separator ui-widget-content\" [ngClass]=\"{'ui-helper-hidden': child.visible === false}\">\n                <li *ngIf=\"!child.separator\" #item [ngClass]=\"{'ui-menuitem ui-corner-all':true,'ui-menuitem-active':item==activeItem,'ui-helper-hidden': child.visible === false}\"\n                    (mouseenter)=\"onItemMouseEnter($event,item,child)\" (mouseleave)=\"onItemMouseLeave($event,item)\">\n                    <a *ngIf=\"!child.routerLink\" [href]=\"child.url||'#'\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" (click)=\"itemClick($event, child)\"\n                        [ngClass]=\"{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}\" [ngStyle]=\"child.style\" [class]=\"child.styleClass\">\n                        <span class=\"ui-submenu-icon pi pi-fw pi-caret-right\" *ngIf=\"child.items\"></span>\n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'ui-state-active'\"\n                        [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\"\n                        (click)=\"itemClick($event, child)\" [ngClass]=\"{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}\"\n                        [ngStyle]=\"child.style\" [class]=\"child.styleClass\">\n                        <span class=\"ui-submenu-icon pi pi-fw pi-caret-right\" *ngIf=\"child.items\"></span>\n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                    </a>\n                    <p-contextMenuSub class=\"ui-submenu\" [item]=\"child\" *ngIf=\"child.items\"></p-contextMenuSub>\n                </li>\n            </ng-template>\n        </ul>\n    "
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return ContextMenu; }))),
        __metadata("design:paramtypes", [ContextMenu])
    ], ContextMenuSub);
    return ContextMenuSub;
}());
exports.ContextMenuSub = ContextMenuSub;
var ContextMenu = /** @class */ (function () {
    function ContextMenu(el, renderer, zone) {
        this.el = el;
        this.renderer = renderer;
        this.zone = zone;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.triggerEvent = 'contextmenu';
    }
    ContextMenu.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.global) {
            this.triggerEventListener = this.renderer.listen('document', this.triggerEvent, function (event) {
                _this.show(event);
                event.preventDefault();
            });
        }
        else if (this.target) {
            this.triggerEventListener = this.renderer.listen(this.target, this.triggerEvent, function (event) {
                _this.show(event);
                event.preventDefault();
                event.stopPropagation();
            });
        }
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.containerViewChild.nativeElement);
            else
                domhandler_1.DomHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
        }
    };
    ContextMenu.prototype.show = function (event) {
        this.position(event);
        this.moveOnTop();
        this.containerViewChild.nativeElement.style.display = 'block';
        domhandler_1.DomHandler.fadeIn(this.containerViewChild.nativeElement, 250);
        this.bindGlobalListeners();
        if (event) {
            event.preventDefault();
        }
    };
    ContextMenu.prototype.hide = function () {
        this.containerViewChild.nativeElement.style.display = 'none';
        this.unbindGlobalListeners();
    };
    ContextMenu.prototype.moveOnTop = function () {
        if (this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++domhandler_1.DomHandler.zindex));
        }
    };
    ContextMenu.prototype.toggle = function (event) {
        if (this.containerViewChild.nativeElement.offsetParent)
            this.hide();
        else
            this.show(event);
    };
    ContextMenu.prototype.position = function (event) {
        if (event) {
            var left = event.pageX + 1;
            var top_1 = event.pageY + 1;
            var width = this.containerViewChild.nativeElement.offsetParent ? this.containerViewChild.nativeElement.offsetWidth : domhandler_1.DomHandler.getHiddenElementOuterWidth(this.containerViewChild.nativeElement);
            var height = this.containerViewChild.nativeElement.offsetParent ? this.containerViewChild.nativeElement.offsetHeight : domhandler_1.DomHandler.getHiddenElementOuterHeight(this.containerViewChild.nativeElement);
            var viewport = domhandler_1.DomHandler.getViewport();
            //flip
            if (left + width - document.body.scrollLeft > viewport.width) {
                left -= width;
            }
            //flip
            if (top_1 + height - document.body.scrollTop > viewport.height) {
                top_1 -= height;
            }
            //fit
            if (left < document.body.scrollLeft) {
                left = document.body.scrollLeft;
            }
            //fit
            if (top_1 < document.body.scrollTop) {
                top_1 = document.body.scrollTop;
            }
            this.containerViewChild.nativeElement.style.left = left + 'px';
            this.containerViewChild.nativeElement.style.top = top_1 + 'px';
        }
    };
    ContextMenu.prototype.bindGlobalListeners = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function (event) {
                if (_this.containerViewChild.nativeElement.offsetParent && event.button !== 2) {
                    _this.hide();
                }
            });
        }
        this.zone.runOutsideAngular(function () {
            if (!_this.windowResizeListener) {
                _this.windowResizeListener = _this.onWindowResize.bind(_this);
                window.addEventListener('resize', _this.windowResizeListener);
            }
        });
    };
    ContextMenu.prototype.unbindGlobalListeners = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
        if (this.windowResizeListener) {
            window.removeEventListener('resize', this.windowResizeListener);
            this.windowResizeListener = null;
        }
    };
    ContextMenu.prototype.onWindowResize = function (event) {
        if (this.containerViewChild.nativeElement.offsetParent) {
            this.hide();
        }
    };
    ContextMenu.prototype.ngOnDestroy = function () {
        this.unbindGlobalListeners();
        if (this.triggerEventListener) {
            this.triggerEventListener();
        }
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ContextMenu.prototype, "model", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ContextMenu.prototype, "global", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ContextMenu.prototype, "target", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ContextMenu.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ContextMenu.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ContextMenu.prototype, "appendTo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ContextMenu.prototype, "autoZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ContextMenu.prototype, "baseZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ContextMenu.prototype, "triggerEvent", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], ContextMenu.prototype, "containerViewChild", void 0);
    ContextMenu = __decorate([
        core_1.Component({
            selector: 'p-contextMenu',
            template: "\n        <div #container [ngClass]=\"'ui-contextmenu ui-widget ui-widget-content ui-corner-all ui-shadow'\"\n            [class]=\"styleClass\" [ngStyle]=\"style\">\n            <p-contextMenuSub [item]=\"model\" root=\"root\"></p-contextMenuSub>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, core_1.NgZone])
    ], ContextMenu);
    return ContextMenu;
}());
exports.ContextMenu = ContextMenu;
var ContextMenuModule = /** @class */ (function () {
    function ContextMenuModule() {
    }
    ContextMenuModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, router_1.RouterModule],
            exports: [ContextMenu, router_1.RouterModule],
            declarations: [ContextMenu, ContextMenuSub]
        })
    ], ContextMenuModule);
    return ContextMenuModule;
}());
exports.ContextMenuModule = ContextMenuModule;
//# sourceMappingURL=contextmenu.js.map