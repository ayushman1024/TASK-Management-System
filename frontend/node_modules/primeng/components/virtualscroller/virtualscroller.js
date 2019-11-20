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
var shared_1 = require("../common/shared");
var scrolling_1 = require("@angular/cdk/scrolling");
var VirtualScroller = /** @class */ (function () {
    function VirtualScroller(el) {
        this.el = el;
        this.cache = true;
        this.first = 0;
        this.trackBy = function (index, item) { return item; };
        this.onLazyLoad = new core_1.EventEmitter();
        this._totalRecords = 0;
        this.lazyValue = [];
        this.page = 0;
    }
    Object.defineProperty(VirtualScroller.prototype, "totalRecords", {
        get: function () {
            return this._totalRecords;
        },
        set: function (val) {
            this._totalRecords = val;
            this.lazyValue = Array.from({ length: this._totalRecords });
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
            this.first = 0;
            this.scrollTo(0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualScroller.prototype, "value", {
        get: function () {
            return this.lazy ? this.lazyValue : this._value;
        },
        set: function (val) {
            if (this.lazy) {
                if (val) {
                    var arr = this.cache ? this.lazyValue.slice() : Array.from({ length: this._totalRecords });
                    for (var i = this.first, j = 0; i < (this.first + this.rows); i++, j++) {
                        arr[i] = val[j];
                    }
                    this.lazyValue = arr;
                }
            }
            else {
                this._value = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    VirtualScroller.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                case 'loadingItem':
                    _this.loadingItemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    VirtualScroller.prototype.onScrollIndexChange = function (index) {
        var p = Math.floor(index / this.rows);
        if (p !== this.page) {
            this.page = p;
            this.first = this.page * this.rows;
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
    };
    VirtualScroller.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows
        };
    };
    VirtualScroller.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    VirtualScroller.prototype.scrollTo = function (index) {
        if (this.viewPortViewChild && this.viewPortViewChild['elementRef'] && this.viewPortViewChild['elementRef'].nativeElement) {
            this.viewPortViewChild['elementRef'].nativeElement.scrollTop = index * this.itemSize;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], VirtualScroller.prototype, "itemSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VirtualScroller.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], VirtualScroller.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VirtualScroller.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], VirtualScroller.prototype, "lazy", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], VirtualScroller.prototype, "cache", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], VirtualScroller.prototype, "rows", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], VirtualScroller.prototype, "first", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], VirtualScroller.prototype, "trackBy", void 0);
    __decorate([
        core_1.ContentChild(shared_1.Header),
        __metadata("design:type", Object)
    ], VirtualScroller.prototype, "header", void 0);
    __decorate([
        core_1.ContentChild(shared_1.Footer),
        __metadata("design:type", Object)
    ], VirtualScroller.prototype, "footer", void 0);
    __decorate([
        core_1.ContentChildren(shared_1.PrimeTemplate),
        __metadata("design:type", core_1.QueryList)
    ], VirtualScroller.prototype, "templates", void 0);
    __decorate([
        core_1.ViewChild('viewport'),
        __metadata("design:type", core_1.ElementRef)
    ], VirtualScroller.prototype, "viewPortViewChild", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], VirtualScroller.prototype, "onLazyLoad", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], VirtualScroller.prototype, "totalRecords", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], VirtualScroller.prototype, "value", null);
    VirtualScroller = __decorate([
        core_1.Component({
            selector: 'p-virtualScroller',
            template: "\n        <div [ngClass]=\"'ui-virtualscroller ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-virtualscroller-header ui-widget-header ui-corner-top\" *ngIf=\"header\">\n                <ng-content select=\"p-header\"></ng-content>\n            </div>\n            <div #content class=\"ui-virtualscroller-content ui-widget-content\">\n                <ul class=\"ui-virtualscroller-list\">\n                    <cdk-virtual-scroll-viewport #viewport [ngStyle]=\"{'height': scrollHeight}\" [itemSize]=\"itemSize\" (scrolledIndexChange)=\"onScrollIndexChange($event)\">\n                        <ng-container *cdkVirtualFor=\"let item of value; trackBy: trackBy; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd; \">\n                            <li [ngStyle]=\"{'height': itemSize + 'px'}\">\n                                <ng-container *ngTemplateOutlet=\"item ? itemTemplate : loadingItemTemplate; context: {$implicit: item, index: i, count: c, first: f, last: l, even: e, odd: o}\"></ng-container>\n                            </li>\n                        </ng-container>\n                    </cdk-virtual-scroll-viewport>\n                </ul>\n            </div>\n            <div class=\"ui-virtualscroller-footer ui-widget-header ui-corner-bottom\" *ngIf=\"footer\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], VirtualScroller);
    return VirtualScroller;
}());
exports.VirtualScroller = VirtualScroller;
var VirtualScrollerModule = /** @class */ (function () {
    function VirtualScrollerModule() {
    }
    VirtualScrollerModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, scrolling_1.ScrollingModule],
            exports: [VirtualScroller, shared_1.SharedModule, scrolling_1.ScrollingModule],
            declarations: [VirtualScroller]
        })
    ], VirtualScrollerModule);
    return VirtualScrollerModule;
}());
exports.VirtualScrollerModule = VirtualScrollerModule;
//# sourceMappingURL=virtualscroller.js.map