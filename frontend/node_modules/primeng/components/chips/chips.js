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
var inputtext_1 = require("../inputtext/inputtext");
var forms_1 = require("@angular/forms");
exports.CHIPS_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return Chips; }),
    multi: true
};
var Chips = /** @class */ (function () {
    function Chips(el) {
        this.el = el;
        this.allowDuplicate = true;
        this.onAdd = new core_1.EventEmitter();
        this.onRemove = new core_1.EventEmitter();
        this.onFocus = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
        this.onChipClick = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Chips.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    Chips.prototype.onClick = function (event) {
        this.inputViewChild.nativeElement.focus();
    };
    Chips.prototype.onItemClick = function (event, item) {
        this.onChipClick.emit({
            originalEvent: event,
            value: item
        });
    };
    Chips.prototype.writeValue = function (value) {
        this.value = value;
        this.updateMaxedOut();
    };
    Chips.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Chips.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Chips.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Chips.prototype.resolveFieldData = function (data, field) {
        if (data && field) {
            if (field.indexOf('.') == -1) {
                return data[field];
            }
            else {
                var fields = field.split('.');
                var value = data;
                for (var i = 0, len = fields.length; i < len; ++i) {
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
            return null;
        }
    };
    Chips.prototype.onInputFocus = function (event) {
        this.focus = true;
        this.onFocus.emit(event);
    };
    Chips.prototype.onInputBlur = function (event) {
        this.focus = false;
        if (this.addOnBlur && this.inputViewChild.nativeElement.value) {
            this.addItem(event, this.inputViewChild.nativeElement.value);
            this.inputViewChild.nativeElement.value = '';
        }
        this.onModelTouched();
        this.onBlur.emit(event);
    };
    Chips.prototype.removeItem = function (event, index) {
        if (this.disabled) {
            return;
        }
        var removedItem = this.value[index];
        this.value = this.value.filter(function (val, i) { return i != index; });
        this.onModelChange(this.value);
        this.onRemove.emit({
            originalEvent: event,
            value: removedItem
        });
        this.updateMaxedOut();
    };
    Chips.prototype.addItem = function (event, item) {
        this.value = this.value || [];
        if (item && item.trim().length) {
            if (this.allowDuplicate || this.value.indexOf(item) === -1) {
                this.value = this.value.concat([item]);
                this.onModelChange(this.value);
                this.onAdd.emit({
                    originalEvent: event,
                    value: item
                });
            }
        }
        this.updateMaxedOut();
    };
    Chips.prototype.onKeydown = function (event) {
        switch (event.which) {
            //backspace
            case 8:
                if (this.inputViewChild.nativeElement.value.length === 0 && this.value && this.value.length > 0) {
                    this.value = this.value.slice();
                    var removedItem = this.value.pop();
                    this.onModelChange(this.value);
                    this.onRemove.emit({
                        originalEvent: event,
                        value: removedItem
                    });
                }
                break;
            //enter
            case 13:
                this.addItem(event, this.inputViewChild.nativeElement.value);
                this.inputViewChild.nativeElement.value = '';
                event.preventDefault();
                break;
            case 9:
                if (this.addOnTab && this.inputViewChild.nativeElement.value !== '') {
                    this.addItem(event, this.inputViewChild.nativeElement.value);
                    this.inputViewChild.nativeElement.value = '';
                    event.preventDefault();
                }
                break;
            default:
                if (this.max && this.value && this.max === this.value.length) {
                    event.preventDefault();
                }
                break;
        }
    };
    Chips.prototype.updateMaxedOut = function () {
        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            if (this.max && this.value && this.max === this.value.length)
                this.inputViewChild.nativeElement.disabled = true;
            else
                this.inputViewChild.nativeElement.disabled = this.disabled || false;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Chips.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Chips.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Chips.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Chips.prototype, "field", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Chips.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Chips.prototype, "max", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Chips.prototype, "tabindex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Chips.prototype, "inputId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Chips.prototype, "allowDuplicate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Chips.prototype, "inputStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Chips.prototype, "inputStyleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Chips.prototype, "addOnTab", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Chips.prototype, "addOnBlur", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Chips.prototype, "onAdd", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Chips.prototype, "onRemove", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Chips.prototype, "onFocus", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Chips.prototype, "onBlur", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Chips.prototype, "onChipClick", void 0);
    __decorate([
        core_1.ViewChild('inputtext'),
        __metadata("design:type", core_1.ElementRef)
    ], Chips.prototype, "inputViewChild", void 0);
    __decorate([
        core_1.ContentChildren(shared_1.PrimeTemplate),
        __metadata("design:type", core_1.QueryList)
    ], Chips.prototype, "templates", void 0);
    Chips = __decorate([
        core_1.Component({
            selector: 'p-chips',
            template: "\n        <div [ngClass]=\"'ui-chips ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"onClick($event)\">\n            <ul [ngClass]=\"{'ui-inputtext ui-state-default ui-corner-all':true,'ui-state-focus':focus,'ui-state-disabled':disabled}\">\n                <li #token *ngFor=\"let item of value; let i = index;\" class=\"ui-chips-token ui-state-highlight ui-corner-all\" (click)=\"onItemClick($event, item)\">\n                    <span *ngIf=\"!disabled\" class=\"ui-chips-token-icon pi pi-fw pi-times\" (click)=\"removeItem($event,i)\"></span>\n                    <span *ngIf=\"!itemTemplate\" class=\"ui-chips-token-label\">{{field ? resolveFieldData(item,field) : item}}</span>\n                    <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item}\"></ng-container>\n                </li>\n                <li class=\"ui-chips-input-token\">\n                    <input #inputtext type=\"text\" [attr.id]=\"inputId\" [attr.placeholder]=\"(value && value.length ? null : placeholder)\" [attr.tabindex]=\"tabindex\" (keydown)=\"onKeydown($event)\" \n                        (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\" [disabled]=\"disabled\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\">\n                </li>\n            </ul>\n        </div>\n    ",
            providers: [exports.CHIPS_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], Chips);
    return Chips;
}());
exports.Chips = Chips;
var ChipsModule = /** @class */ (function () {
    function ChipsModule() {
    }
    ChipsModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, inputtext_1.InputTextModule, shared_1.SharedModule],
            exports: [Chips, inputtext_1.InputTextModule, shared_1.SharedModule],
            declarations: [Chips]
        })
    ], ChipsModule);
    return ChipsModule;
}());
exports.ChipsModule = ChipsModule;
//# sourceMappingURL=chips.js.map