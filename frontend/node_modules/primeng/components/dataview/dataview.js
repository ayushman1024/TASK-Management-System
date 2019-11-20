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
var objectutils_1 = require("../utils/objectutils");
var shared_1 = require("../common/shared");
var paginator_1 = require("../paginator/paginator");
var DataView = /** @class */ (function () {
    function DataView(el) {
        this.el = el;
        this.layout = 'list';
        this.pageLinks = 5;
        this.paginatorPosition = 'bottom';
        this.alwaysShowPaginator = true;
        this.emptyMessage = 'No records found';
        this.onLazyLoad = new core_1.EventEmitter();
        this.trackBy = function (index, item) { return item; };
        this.loadingIcon = 'pi pi-spinner';
        this.first = 0;
        this.onPage = new core_1.EventEmitter();
        this.onSort = new core_1.EventEmitter();
        this._sortOrder = 1;
    }
    DataView.prototype.ngOnInit = function () {
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.initialized = true;
    };
    Object.defineProperty(DataView.prototype, "sortField", {
        get: function () {
            return this._sortField;
        },
        set: function (val) {
            this._sortField = val;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                this.sort();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataView.prototype, "sortOrder", {
        get: function () {
            return this._sortOrder;
        },
        set: function (val) {
            this._sortOrder = val;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                this.sort();
            }
        },
        enumerable: true,
        configurable: true
    });
    DataView.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'listItem':
                    _this.listItemTemplate = item.template;
                    break;
                case 'gridItem':
                    _this.gridItemTemplate = item.template;
                    break;
                case 'paginatorleft':
                    _this.paginatorLeftTemplate = item.template;
                    break;
                case 'paginatorright':
                    _this.paginatorRightTemplate = item.template;
                    break;
            }
        });
        this.updateItemTemplate();
    };
    DataView.prototype.updateItemTemplate = function () {
        switch (this.layout) {
            case 'list':
                this.itemTemplate = this.listItemTemplate;
                break;
            case 'grid':
                this.itemTemplate = this.gridItemTemplate;
                break;
        }
    };
    Object.defineProperty(DataView.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            this.updateTotalRecords();
            if (!this.lazy && this.hasFilter()) {
                this.filter(this.filterValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    DataView.prototype.changeLayout = function (layout) {
        this.layout = layout;
        this.updateItemTemplate();
    };
    DataView.prototype.updateTotalRecords = function () {
        this.totalRecords = this.lazy ? this.totalRecords : (this._value ? this._value.length : 0);
    };
    DataView.prototype.paginate = function (event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
    };
    DataView.prototype.sort = function () {
        var _this = this;
        this.first = 0;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else if (this.value) {
            this.value.sort(function (data1, data2) {
                var value1 = objectutils_1.ObjectUtils.resolveFieldData(data1, _this.sortField);
                var value2 = objectutils_1.ObjectUtils.resolveFieldData(data2, _this.sortField);
                var result = null;
                if (value1 == null && value2 != null)
                    result = -1;
                else if (value1 != null && value2 == null)
                    result = 1;
                else if (value1 == null && value2 == null)
                    result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string')
                    result = value1.localeCompare(value2);
                else
                    result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                return (_this.sortOrder * result);
            });
            if (this.hasFilter()) {
                this.filter(this.filterValue);
            }
        }
        this.onSort.emit({
            sortField: this.sortField,
            sortOrder: this.sortOrder
        });
    };
    DataView.prototype.isEmpty = function () {
        var data = this.filteredValue || this.value;
        return data == null || data.length == 0;
    };
    DataView.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows
        };
    };
    DataView.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    DataView.prototype.filter = function (filter) {
        this.filterValue = filter;
        if (this.value && this.value.length) {
            var searchFields = this.filterBy.split(',');
            this.filteredValue = objectutils_1.ObjectUtils.filter(this.value, searchFields, filter);
            if (this.filteredValue.length === this.value.length) {
                this.filteredValue = null;
            }
            if (this.paginator) {
                this.first = 0;
                this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
            }
        }
    };
    DataView.prototype.hasFilter = function () {
        return this.filterValue && this.filterValue.trim().length > 0;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataView.prototype, "layout", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataView.prototype, "paginator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataView.prototype, "rows", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataView.prototype, "totalRecords", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataView.prototype, "pageLinks", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DataView.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataView.prototype, "paginatorPosition", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataView.prototype, "alwaysShowPaginator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataView.prototype, "paginatorDropdownAppendTo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataView.prototype, "lazy", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataView.prototype, "emptyMessage", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataView.prototype, "onLazyLoad", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataView.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataView.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], DataView.prototype, "trackBy", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataView.prototype, "filterBy", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataView.prototype, "loading", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataView.prototype, "loadingIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataView.prototype, "first", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataView.prototype, "onPage", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataView.prototype, "onSort", void 0);
    __decorate([
        core_1.ContentChild(shared_1.Header),
        __metadata("design:type", Object)
    ], DataView.prototype, "header", void 0);
    __decorate([
        core_1.ContentChild(shared_1.Footer),
        __metadata("design:type", Object)
    ], DataView.prototype, "footer", void 0);
    __decorate([
        core_1.ContentChildren(shared_1.PrimeTemplate),
        __metadata("design:type", core_1.QueryList)
    ], DataView.prototype, "templates", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], DataView.prototype, "sortField", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DataView.prototype, "sortOrder", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], DataView.prototype, "value", null);
    DataView = __decorate([
        core_1.Component({
            selector: 'p-dataView',
            template: "\n        <div [ngClass]=\"{'ui-dataview ui-widget': true, 'ui-dataview-list': (layout === 'list'), 'ui-dataview-grid': (layout === 'grid')}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-dataview-loading ui-widget-overlay\" *ngIf=\"loading\"></div>\n            <div class=\"ui-dataview-loading-content\" *ngIf=\"loading\">\n                <i [class]=\"'ui-dataview-loading-icon pi-spin ' + loadingIcon\"></i>\n            </div>\n            <div class=\"ui-dataview-header ui-widget-header ui-corner-top\">\n                <ng-content select=\"p-header\"></ng-content>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-top\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'top' || paginatorPosition =='both')\"\n                [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\"></p-paginator>\n            <div class=\"ui-dataview-content ui-widget-content\">\n                <div class=\"ui-g\">\n                    <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"paginator ? ((filteredValue||value) | slice:(lazy ? 0 : first):((lazy ? 0 : first) + rows)) : (filteredValue||value)\" [ngForTrackBy]=\"trackBy\">\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: rowData, rowIndex: rowIndex}\"></ng-container>\n                    </ng-template>\n                    <div *ngIf=\"isEmpty()\" class=\"ui-g-12 ui-dataview-emptymessage\">{{emptyMessage}}</div>\n                </div>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')\"\n                [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\"></p-paginator>\n            <div class=\"ui-dataview-footer ui-widget-header ui-corner-bottom\" *ngIf=\"footer\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], DataView);
    return DataView;
}());
exports.DataView = DataView;
var DataViewLayoutOptions = /** @class */ (function () {
    function DataViewLayoutOptions(dv) {
        this.dv = dv;
    }
    DataViewLayoutOptions.prototype.changeLayout = function (event, layout) {
        this.dv.changeLayout(layout);
        event.preventDefault();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataViewLayoutOptions.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataViewLayoutOptions.prototype, "styleClass", void 0);
    DataViewLayoutOptions = __decorate([
        core_1.Component({
            selector: 'p-dataViewLayoutOptions',
            template: "\n        <div [ngClass]=\"'ui-dataview-layout-options ui-selectbutton ui-buttonset'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <a tabindex=\"0\" class=\"ui-button ui-button-icon-only ui-state-default\" (click)=\"changeLayout($event, 'list')\" (keydown.enter)=\"changeLayout($event, 'list')\"\n                [ngClass]=\"{'ui-state-active': dv.layout === 'list'}\">\n                <i class=\"pi pi-bars ui-button-icon-left\"></i>\n                <span class=\"ui-button-text ui-clickable\">ui-btn</span>\n            </a><a tabindex=\"0\" class=\"ui-button ui-button-icon-only ui-state-default\" (click)=\"changeLayout($event, 'grid')\" (keydown.enter)=\"changeLayout($event, 'grid')\"\n                [ngClass]=\"{'ui-state-active': dv.layout === 'grid'}\">\n                <i class=\"pi pi-th-large ui-button-icon-left\"></i>\n                <span class=\"ui-button-text ui-clickable\">ui-btn</span>\n            </a>\n        </div>\n    "
        }),
        __metadata("design:paramtypes", [DataView])
    ], DataViewLayoutOptions);
    return DataViewLayoutOptions;
}());
exports.DataViewLayoutOptions = DataViewLayoutOptions;
var DataViewModule = /** @class */ (function () {
    function DataViewModule() {
    }
    DataViewModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, shared_1.SharedModule, paginator_1.PaginatorModule],
            exports: [DataView, shared_1.SharedModule, DataViewLayoutOptions],
            declarations: [DataView, DataViewLayoutOptions]
        })
    ], DataViewModule);
    return DataViewModule;
}());
exports.DataViewModule = DataViewModule;
//# sourceMappingURL=dataview.js.map