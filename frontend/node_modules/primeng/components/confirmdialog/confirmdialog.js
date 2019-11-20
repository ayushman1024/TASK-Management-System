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
var animations_1 = require("@angular/animations");
var common_1 = require("@angular/common");
var domhandler_1 = require("../dom/domhandler");
var shared_1 = require("../common/shared");
var button_1 = require("../button/button");
var confirmationservice_1 = require("../common/confirmationservice");
var ConfirmDialog = /** @class */ (function () {
    function ConfirmDialog(el, renderer, confirmationService, zone) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.confirmationService = confirmationService;
        this.zone = zone;
        this.acceptIcon = 'pi pi-check';
        this.acceptLabel = 'Yes';
        this.acceptVisible = true;
        this.rejectIcon = 'pi pi-times';
        this.rejectLabel = 'No';
        this.rejectVisible = true;
        this.closeOnEscape = true;
        this.blockScroll = true;
        this.closable = true;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.transitionOptions = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';
        this.subscription = this.confirmationService.requireConfirmation$.subscribe(function (confirmation) {
            if (confirmation.key === _this.key) {
                _this.confirmation = confirmation;
                _this.message = _this.confirmation.message || _this.message;
                _this.icon = _this.confirmation.icon || _this.icon;
                _this.header = _this.confirmation.header || _this.header;
                _this.rejectVisible = _this.confirmation.rejectVisible == null ? _this.rejectVisible : _this.confirmation.rejectVisible;
                _this.acceptVisible = _this.confirmation.acceptVisible == null ? _this.acceptVisible : _this.confirmation.acceptVisible;
                _this.acceptLabel = _this.confirmation.acceptLabel || _this.acceptLabel;
                _this.rejectLabel = _this.confirmation.rejectLabel || _this.rejectLabel;
                if (_this.confirmation.accept) {
                    _this.confirmation.acceptEvent = new core_1.EventEmitter();
                    _this.confirmation.acceptEvent.subscribe(_this.confirmation.accept);
                }
                if (_this.confirmation.reject) {
                    _this.confirmation.rejectEvent = new core_1.EventEmitter();
                    _this.confirmation.rejectEvent.subscribe(_this.confirmation.reject);
                }
                if (_this.confirmation.blockScroll === false) {
                    _this.blockScroll = _this.confirmation.blockScroll;
                }
                _this.visible = true;
            }
        });
    }
    Object.defineProperty(ConfirmDialog.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (val) {
            this._width = val;
            console.warn("width property is deprecated, use style to define the width of the Dialog.");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfirmDialog.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (val) {
            this._height = val;
            console.warn("height property is deprecated, use style to define the height of the Dialog.");
        },
        enumerable: true,
        configurable: true
    });
    ConfirmDialog.prototype.onAnimationStart = function (event) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.setDimensions();
                this.contentContainer = domhandler_1.DomHandler.findSingle(this.container, '.ui-dialog-content');
                domhandler_1.DomHandler.findSingle(this.container, 'button').focus();
                this.appendContainer();
                this.moveOnTop();
                this.bindGlobalListeners();
                this.enableModality();
                break;
            case 'void':
                this.onOverlayHide();
                break;
        }
    };
    ConfirmDialog.prototype.setDimensions = function () {
        if (this.width) {
            this.container.style.width = this.width + 'px';
        }
        if (this.height) {
            this.container.style.height = this.height + 'px';
        }
    };
    ConfirmDialog.prototype.appendContainer = function () {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                domhandler_1.DomHandler.appendChild(this.container, this.appendTo);
        }
    };
    ConfirmDialog.prototype.restoreAppend = function () {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
    };
    ConfirmDialog.prototype.enableModality = function () {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.container.style.zIndex) - 1);
            domhandler_1.DomHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-dialog-mask');
            document.body.appendChild(this.mask);
            domhandler_1.DomHandler.addClass(document.body, 'ui-overflow-hidden');
            if (this.blockScroll) {
                domhandler_1.DomHandler.addClass(document.body, 'ui-overflow-hidden');
            }
        }
    };
    ConfirmDialog.prototype.disableModality = function () {
        if (this.mask) {
            document.body.removeChild(this.mask);
            domhandler_1.DomHandler.removeClass(document.body, 'ui-overflow-hidden');
            if (this.blockScroll) {
                domhandler_1.DomHandler.removeClass(document.body, 'ui-overflow-hidden');
            }
            this.mask = null;
        }
    };
    ConfirmDialog.prototype.close = function (event) {
        if (this.confirmation.rejectEvent) {
            this.confirmation.rejectEvent.emit();
        }
        this.hide();
        event.preventDefault();
    };
    ConfirmDialog.prototype.hide = function () {
        this.visible = false;
    };
    ConfirmDialog.prototype.moveOnTop = function () {
        if (this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++domhandler_1.DomHandler.zindex));
        }
    };
    ConfirmDialog.prototype.bindGlobalListeners = function () {
        var _this = this;
        if (this.closeOnEscape && this.closable && !this.documentEscapeListener) {
            this.documentEscapeListener = this.renderer.listen('document', 'keydown', function (event) {
                if (event.which == 27) {
                    if (parseInt(_this.container.style.zIndex) === domhandler_1.DomHandler.zindex && _this.visible) {
                        _this.close(event);
                    }
                }
            });
        }
    };
    ConfirmDialog.prototype.unbindGlobalListeners = function () {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    };
    ConfirmDialog.prototype.onOverlayHide = function () {
        this.disableModality();
        this.unbindGlobalListeners();
        this.container = null;
    };
    ConfirmDialog.prototype.ngOnDestroy = function () {
        this.restoreAppend();
        this.onOverlayHide();
        this.subscription.unsubscribe();
    };
    ConfirmDialog.prototype.accept = function () {
        if (this.confirmation.acceptEvent) {
            this.confirmation.acceptEvent.emit();
        }
        this.hide();
        this.confirmation = null;
    };
    ConfirmDialog.prototype.reject = function () {
        if (this.confirmation.rejectEvent) {
            this.confirmation.rejectEvent.emit();
        }
        this.hide();
        this.confirmation = null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ConfirmDialog.prototype, "visible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ConfirmDialog.prototype, "header", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ConfirmDialog.prototype, "icon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ConfirmDialog.prototype, "message", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ConfirmDialog.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ConfirmDialog.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ConfirmDialog.prototype, "acceptIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ConfirmDialog.prototype, "acceptLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ConfirmDialog.prototype, "acceptVisible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ConfirmDialog.prototype, "rejectIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ConfirmDialog.prototype, "rejectLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ConfirmDialog.prototype, "rejectVisible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ConfirmDialog.prototype, "acceptButtonStyleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ConfirmDialog.prototype, "rejectButtonStyleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ConfirmDialog.prototype, "closeOnEscape", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ConfirmDialog.prototype, "blockScroll", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ConfirmDialog.prototype, "rtl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ConfirmDialog.prototype, "closable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ConfirmDialog.prototype, "appendTo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ConfirmDialog.prototype, "key", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ConfirmDialog.prototype, "autoZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ConfirmDialog.prototype, "baseZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ConfirmDialog.prototype, "transitionOptions", void 0);
    __decorate([
        core_1.ContentChild(shared_1.Footer),
        __metadata("design:type", Object)
    ], ConfirmDialog.prototype, "footer", void 0);
    __decorate([
        core_1.ViewChild('content'),
        __metadata("design:type", core_1.ElementRef)
    ], ConfirmDialog.prototype, "contentViewChild", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ConfirmDialog.prototype, "width", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ConfirmDialog.prototype, "height", null);
    ConfirmDialog = __decorate([
        core_1.Component({
            selector: 'p-confirmDialog',
            template: "\n        <div [ngClass]=\"{'ui-dialog ui-confirmdialog ui-widget ui-widget-content ui-corner-all ui-shadow':true,'ui-dialog-rtl':rtl}\" [ngStyle]=\"style\" [class]=\"styleClass\" (mousedown)=\"moveOnTop()\"\n            [@animation]=\"{value: 'visible', params: {transitionParams: transitionOptions}}\" (@animation.start)=\"onAnimationStart($event)\" *ngIf=\"visible\">\n            <div class=\"ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top\">\n                <span class=\"ui-dialog-title\" *ngIf=\"header\">{{header}}</span>\n                <a *ngIf=\"closable\" [ngClass]=\"{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}\" tabindex=\"0\" role=\"button\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\">\n                    <span class=\"pi pi-fw pi-times\"></span>\n                </a>\n            </div>\n            <div #content class=\"ui-dialog-content ui-widget-content\">\n                <i [ngClass]=\"'ui-confirmdialog-icon'\" [class]=\"icon\" *ngIf=\"icon\"></i>\n                <span class=\"ui-confirmdialog-message\" [innerHTML]=\"message\"></span>\n            </div>\n            <div class=\"ui-dialog-footer ui-widget-content\" *ngIf=\"footer\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n            <div class=\"ui-dialog-footer ui-widget-content\" *ngIf=\"!footer\">\n                <button type=\"button\" pButton [icon]=\"acceptIcon\" [label]=\"acceptLabel\" (click)=\"accept()\" [class]=\"acceptButtonStyleClass\" *ngIf=\"acceptVisible\"></button>\n                <button type=\"button\" pButton [icon]=\"rejectIcon\" [label]=\"rejectLabel\" (click)=\"reject()\" [class]=\"rejectButtonStyleClass\" *ngIf=\"rejectVisible\"></button>\n            </div>\n        </div>\n    ",
            animations: [
                animations_1.trigger('animation', [
                    animations_1.state('void', animations_1.style({
                        transform: 'translate3d(-50%, -25%, 0) scale(0.9)',
                        opacity: 0
                    })),
                    animations_1.state('visible', animations_1.style({
                        transform: 'translateX(-50%) translateY(-50%)',
                        opacity: 1
                    })),
                    animations_1.transition('* => *', animations_1.animate('{{transitionParams}}'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, confirmationservice_1.ConfirmationService, core_1.NgZone])
    ], ConfirmDialog);
    return ConfirmDialog;
}());
exports.ConfirmDialog = ConfirmDialog;
var ConfirmDialogModule = /** @class */ (function () {
    function ConfirmDialogModule() {
    }
    ConfirmDialogModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, button_1.ButtonModule],
            exports: [ConfirmDialog, button_1.ButtonModule, shared_1.SharedModule],
            declarations: [ConfirmDialog]
        })
    ], ConfirmDialogModule);
    return ConfirmDialogModule;
}());
exports.ConfirmDialogModule = ConfirmDialogModule;
//# sourceMappingURL=confirmdialog.js.map