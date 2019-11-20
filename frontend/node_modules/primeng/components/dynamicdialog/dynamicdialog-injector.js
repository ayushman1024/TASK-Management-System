"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DynamicDialogInjector = /** @class */ (function () {
    function DynamicDialogInjector(_parentInjector, _additionalTokens) {
        this._parentInjector = _parentInjector;
        this._additionalTokens = _additionalTokens;
    }
    DynamicDialogInjector.prototype.get = function (token, notFoundValue, flags) {
        var value = this._additionalTokens.get(token);
        if (value)
            return value;
        return this._parentInjector.get(token, notFoundValue);
    };
    return DynamicDialogInjector;
}());
exports.DynamicDialogInjector = DynamicDialogInjector;
//# sourceMappingURL=dynamicdialog-injector.js.map