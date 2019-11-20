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
var dynamicdialog_1 = require("./dynamicdialog");
var dynamicdialog_injector_1 = require("./dynamicdialog-injector");
var dynamicdialog_config_1 = require("./dynamicdialog-config");
var dynamicdialog_ref_1 = require("./dynamicdialog-ref");
var DialogService = /** @class */ (function () {
    function DialogService(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    DialogService.prototype.open = function (componentType, config) {
        var dialogRef = this.appendDialogComponentToBody(config);
        this.dialogComponentRef.instance.childComponentType = componentType;
        return dialogRef;
    };
    DialogService.prototype.appendDialogComponentToBody = function (config) {
        var _this = this;
        var map = new WeakMap();
        map.set(dynamicdialog_config_1.DynamicDialogConfig, config);
        var dialogRef = new dynamicdialog_ref_1.DynamicDialogRef();
        map.set(dynamicdialog_ref_1.DynamicDialogRef, dialogRef);
        var sub = dialogRef.onClose.subscribe(function () {
            _this.removeDialogComponentFromBody();
            sub.unsubscribe();
        });
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicdialog_1.DynamicDialogComponent);
        var componentRef = componentFactory.create(new dynamicdialog_injector_1.DynamicDialogInjector(this.injector, map));
        this.appRef.attachView(componentRef.hostView);
        var domElem = componentRef.hostView.rootNodes[0];
        document.body.appendChild(domElem);
        this.dialogComponentRef = componentRef;
        return dialogRef;
    };
    DialogService.prototype.removeDialogComponentFromBody = function () {
        this.appRef.detachView(this.dialogComponentRef.hostView);
        this.dialogComponentRef.destroy();
    };
    DialogService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver, core_1.ApplicationRef, core_1.Injector])
    ], DialogService);
    return DialogService;
}());
exports.DialogService = DialogService;
//# sourceMappingURL=dialogservice.js.map