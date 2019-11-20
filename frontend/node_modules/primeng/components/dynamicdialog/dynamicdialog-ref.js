"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var DynamicDialogRef = /** @class */ (function () {
    function DynamicDialogRef() {
        this._onClose = new rxjs_1.Subject();
        this.onClose = this._onClose.asObservable();
    }
    DynamicDialogRef.prototype.close = function (result) {
        this._onClose.next(result);
    };
    return DynamicDialogRef;
}());
exports.DynamicDialogRef = DynamicDialogRef;
//# sourceMappingURL=dynamicdialog-ref.js.map