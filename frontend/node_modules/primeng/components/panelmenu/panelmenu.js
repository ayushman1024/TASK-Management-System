"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var animations_1 = require("@angular/animations");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var BasePanelMenuItem = /** @class */ (function () {
    function BasePanelMenuItem() {
    }
    BasePanelMenuItem.prototype.handleClick = function (event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        item.expanded = !item.expanded;
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
    return BasePanelMenuItem;
}());
exports.BasePanelMenuItem = BasePanelMenuItem;
var PanelMenuSub = /** @class */ (function (_super) {
    __extends(PanelMenuSub, _super);
    function PanelMenuSub() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PanelMenuSub.prototype, "item", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PanelMenuSub.prototype, "expanded", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PanelMenuSub.prototype, "transitionOptions", void 0);
    PanelMenuSub = __decorate([
        core_1.Component({
            selector: 'p-panelMenuSub',
            template: "\n        <ul class=\"ui-submenu-list\" [@submenu]=\"expanded ? {value: 'visible', params: {transitionParams: transitionOptions}} : {value: 'hidden', params: {transitionParams: transitionOptions}}\">\n            <ng-template ngFor let-child [ngForOf]=\"item.items\">\n                <li *ngIf=\"child.separator\" class=\"ui-menu-separator ui-widget-content\">\n                <li *ngIf=\"!child.separator\" class=\"ui-menuitem ui-corner-all\" [ngClass]=\"child.styleClass\" [class.ui-helper-hidden]=\"child.visible === false\" [ngStyle]=\"child.style\">\n                    <a *ngIf=\"!child.routerLink\" [href]=\"child.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" [attr.tabindex]=\"item.expanded ? null : '-1'\" [attr.id]=\"child.id\"\n                        [ngClass]=\"{'ui-state-disabled':child.disabled}\" \n                        (click)=\"handleClick($event,child)\" [attr.target]=\"child.target\" [attr.title]=\"child.title\">\n                        <span class=\"ui-panelmenu-icon pi pi-fw\" [ngClass]=\"{'pi-caret-right':!child.expanded,'pi-caret-down':child.expanded}\" *ngIf=\"child.items\"></span\n                        ><span class=\"ui-menuitem-icon\" [ngClass]=\"child.icon\" *ngIf=\"child.icon\"></span\n                        ><span class=\"ui-menuitem-text\">{{child.label}}</span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'ui-state-active'\" [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\" class=\"ui-menuitem-link ui-corner-all\" \n                        [ngClass]=\"{'ui-state-disabled':child.disabled}\" [attr.tabindex]=\"item.expanded ? null : '-1'\" [attr.id]=\"child.id\"\n                        (click)=\"handleClick($event,child)\" [attr.target]=\"child.target\" [attr.title]=\"child.title\">\n                        <span class=\"ui-panelmenu-icon pi pi-fw\" [ngClass]=\"{'pi-caret-right':!child.expanded,'pi-caret-down':child.expanded}\" *ngIf=\"child.items\"></span\n                        ><span class=\"ui-menuitem-icon\" [ngClass]=\"child.icon\" *ngIf=\"child.icon\"></span\n                        ><span class=\"ui-menuitem-text\">{{child.label}}</span>\n                    </a>\n                    <p-panelMenuSub [item]=\"child\" [expanded]=\"child.expanded\" [transitionOptions]=\"transitionOptions\" *ngIf=\"child.items\"></p-panelMenuSub>\n                </li>\n            </ng-template>\n        </ul>\n    ",
            animations: [
                animations_1.trigger('submenu', [
                    animations_1.state('hidden', animations_1.style({
                        height: '0px'
                    })),
                    animations_1.state('visible', animations_1.style({
                        height: '*'
                    })),
                    animations_1.transition('visible => hidden', animations_1.animate('{{transitionParams}}')),
                    animations_1.transition('hidden => visible', animations_1.animate('{{transitionParams}}'))
                ])
            ]
        })
    ], PanelMenuSub);
    return PanelMenuSub;
}(BasePanelMenuItem));
exports.PanelMenuSub = PanelMenuSub;
var PanelMenu = /** @class */ (function (_super) {
    __extends(PanelMenu, _super);
    function PanelMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.multiple = true;
        _this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
        return _this;
    }
    PanelMenu.prototype.collapseAll = function () {
        for (var _i = 0, _a = this.model; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.expanded) {
                item.expanded = false;
            }
        }
    };
    PanelMenu.prototype.handleClick = function (event, item) {
        if (!this.multiple) {
            for (var _i = 0, _a = this.model; _i < _a.length; _i++) {
                var modelItem = _a[_i];
                if (item !== modelItem && modelItem.expanded) {
                    modelItem.expanded = false;
                }
            }
        }
        this.animating = true;
        _super.prototype.handleClick.call(this, event, item);
    };
    PanelMenu.prototype.onToggleDone = function () {
        this.animating = false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], PanelMenu.prototype, "model", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PanelMenu.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PanelMenu.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PanelMenu.prototype, "multiple", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PanelMenu.prototype, "transitionOptions", void 0);
    PanelMenu = __decorate([
        core_1.Component({
            selector: 'p-panelMenu',
            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"'ui-panelmenu ui-widget'\">\n            <ng-container *ngFor=\"let item of model;let f=first;let l=last;\">\n                <div class=\"ui-panelmenu-panel\" [ngClass]=\"{'ui-helper-hidden': item.visible === false}\">\n                    <div [ngClass]=\"{'ui-widget ui-panelmenu-header ui-state-default':true,'ui-corner-top':f,'ui-corner-bottom':l&&!item.expanded,\n                    'ui-state-active':item.expanded,'ui-state-disabled':item.disabled}\" [class]=\"item.styleClass\" [ngStyle]=\"item.style\">\n                        <a *ngIf=\"!item.routerLink\" [href]=\"item.url||'#'\" (click)=\"handleClick($event,item)\"\n                           [attr.target]=\"item.target\" [attr.title]=\"item.title\" class=\"ui-panelmenu-header-link\">\n                        <span *ngIf=\"item.items\" class=\"ui-panelmenu-icon pi pi-fw\" [ngClass]=\"{'pi-chevron-right':!item.expanded,'pi-chevron-down':item.expanded}\"></span\n                        ><span class=\"ui-menuitem-icon\" [ngClass]=\"item.icon\" *ngIf=\"item.icon\"></span\n                        ><span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </a>\n                        <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" [routerLinkActive]=\"'ui-state-active'\" [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\"\n                           (click)=\"handleClick($event,item)\" [attr.target]=\"item.target\" [attr.title]=\"item.title\" class=\"ui-panelmenu-header-link\">\n                        <span *ngIf=\"item.items\" class=\"ui-panelmenu-icon pi pi-fw\" [ngClass]=\"{'pi-chevron-right':!item.expanded,'pi-chevron-down':item.expanded}\"></span\n                        ><span class=\"ui-menuitem-icon\" [ngClass]=\"item.icon\" *ngIf=\"item.icon\"></span\n                        ><span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </a>\n                    </div>\n                    <div *ngIf=\"item.items\" class=\"ui-panelmenu-content-wrapper\" [@rootItem]=\"item.expanded ? {value: 'visible', params: {transitionParams: transitionOptions}} : {value: 'hidden', params: {transitionParams: transitionOptions}}\"  (@rootItem.done)=\"onToggleDone()\"\n                         [ngClass]=\"{'ui-panelmenu-content-wrapper-overflown': !item.expanded||animating}\">\n                        <div class=\"ui-panelmenu-content ui-widget-content\">\n                            <p-panelMenuSub [item]=\"item\" [expanded]=\"true\" [transitionOptions]=\"transitionOptions\" class=\"ui-panelmenu-root-submenu\"></p-panelMenuSub>\n                        </div>\n                    </div>\n                </div>\n            </ng-container>\n        </div>\n    ",
            animations: [
                animations_1.trigger('rootItem', [
                    animations_1.state('hidden', animations_1.style({
                        height: '0px'
                    })),
                    animations_1.state('visible', animations_1.style({
                        height: '*'
                    })),
                    animations_1.transition('visible => hidden', animations_1.animate('{{transitionParams}}')),
                    animations_1.transition('hidden => visible', animations_1.animate('{{transitionParams}}'))
                ])
            ]
        })
    ], PanelMenu);
    return PanelMenu;
}(BasePanelMenuItem));
exports.PanelMenu = PanelMenu;
var PanelMenuModule = /** @class */ (function () {
    function PanelMenuModule() {
    }
    PanelMenuModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, router_1.RouterModule],
            exports: [PanelMenu, router_1.RouterModule],
            declarations: [PanelMenu, PanelMenuSub]
        })
    ], PanelMenuModule);
    return PanelMenuModule;
}());
exports.PanelMenuModule = PanelMenuModule;
//# sourceMappingURL=panelmenu.js.map