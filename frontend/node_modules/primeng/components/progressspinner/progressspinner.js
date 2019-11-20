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
var ProgressSpinner = /** @class */ (function () {
    function ProgressSpinner() {
        this.strokeWidth = "2";
        this.fill = "none";
        this.animationDuration = "2s";
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ProgressSpinner.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProgressSpinner.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProgressSpinner.prototype, "strokeWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProgressSpinner.prototype, "fill", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProgressSpinner.prototype, "animationDuration", void 0);
    ProgressSpinner = __decorate([
        core_1.Component({
            selector: 'p-progressSpinner',
            template: "\n        <div class=\"ui-progress-spinner\" [ngStyle]=\"style\" [ngClass]=\"styleClass\">\n            <svg class=\"ui-progress-spinner-svg\" viewBox=\"25 25 50 50\" [style.animation-duration]=\"animationDuration\">\n                <circle class=\"ui-progress-spinner-circle\" cx=\"50\" cy=\"50\" r=\"20\" [attr.fill]=\"fill\" [attr.stroke-width]=\"strokeWidth\" stroke-miterlimit=\"10\"/>\n            </svg>\n        </div>\n    "
        })
    ], ProgressSpinner);
    return ProgressSpinner;
}());
exports.ProgressSpinner = ProgressSpinner;
var ProgressSpinnerModule = /** @class */ (function () {
    function ProgressSpinnerModule() {
    }
    ProgressSpinnerModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: [ProgressSpinner],
            declarations: [ProgressSpinner]
        })
    ], ProgressSpinnerModule);
    return ProgressSpinnerModule;
}());
exports.ProgressSpinnerModule = ProgressSpinnerModule;
//# sourceMappingURL=progressspinner.js.map