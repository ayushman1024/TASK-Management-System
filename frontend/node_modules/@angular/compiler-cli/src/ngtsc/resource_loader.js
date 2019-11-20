/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/ngtsc/resource_loader", ["require", "exports", "tslib", "fs", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var fs = require("fs");
    var ts = require("typescript");
    /**
     * `ResourceLoader` which delegates to a `CompilerHost` resource loading method.
     */
    var HostResourceLoader = /** @class */ (function () {
        function HostResourceLoader(resolver, loader) {
            this.resolver = resolver;
            this.loader = loader;
            this.cache = new Map();
            this.fetching = new Map();
        }
        HostResourceLoader.prototype.preload = function (file, containingFile) {
            var _this = this;
            var resolved = this.resolver(file, containingFile);
            if (resolved === null) {
                return undefined;
            }
            if (this.cache.has(resolved)) {
                return undefined;
            }
            else if (this.fetching.has(resolved)) {
                return this.fetching.get(resolved);
            }
            var result = this.loader(resolved);
            if (typeof result === 'string') {
                this.cache.set(resolved, result);
                return undefined;
            }
            else {
                var fetchCompletion = result.then(function (str) {
                    _this.fetching.delete(resolved);
                    _this.cache.set(resolved, str);
                });
                this.fetching.set(resolved, fetchCompletion);
                return fetchCompletion;
            }
        };
        HostResourceLoader.prototype.load = function (file, containingFile) {
            var resolved = this.resolver(file, containingFile);
            if (resolved === null) {
                throw new Error("HostResourceLoader: could not resolve " + file + " in context of " + containingFile + ")");
            }
            if (this.cache.has(resolved)) {
                return this.cache.get(resolved);
            }
            var result = this.loader(resolved);
            if (typeof result !== 'string') {
                throw new Error("HostResourceLoader: loader(" + resolved + ") returned a Promise");
            }
            this.cache.set(resolved, result);
            return result;
        };
        return HostResourceLoader;
    }());
    exports.HostResourceLoader = HostResourceLoader;
    /**
     * `ResourceLoader` which directly uses the filesystem to resolve resources synchronously.
     */
    var FileResourceLoader = /** @class */ (function () {
        function FileResourceLoader(host, options) {
            this.host = host;
            this.options = options;
        }
        FileResourceLoader.prototype.load = function (file, containingFile) {
            // Attempt to resolve `file` in the context of `containingFile`, while respecting the rootDirs
            // option from the tsconfig. First, normalize the file name.
            var e_1, _a;
            // Strip a leading '/' if one is present.
            if (file.startsWith('/')) {
                file = file.substr(1);
            }
            // Turn absolute paths into relative paths.
            if (!file.startsWith('.')) {
                file = "./" + file;
            }
            // TypeScript provides utilities to resolve module names, but not resource files (which aren't
            // a part of the ts.Program). However, TypeScript's module resolution can be used creatively
            // to locate where resource files should be expected to exist. Since module resolution returns
            // a list of file names that were considered, the loader can enumerate the possible locations
            // for the file by setting up a module resolution for it that will fail.
            file += '.$ngresource$';
            // clang-format off
            var failedLookup = ts.resolveModuleName(file, containingFile, this.options, this.host);
            // clang-format on
            if (failedLookup.failedLookupLocations === undefined) {
                throw new Error("Internal error: expected to find failedLookupLocations during resolution of resource '" + file + "' in context of " + containingFile);
            }
            var candidateLocations = failedLookup.failedLookupLocations
                .filter(function (candidate) { return candidate.endsWith('.$ngresource$.ts'); })
                .map(function (candidate) { return candidate.replace(/\.\$ngresource\$\.ts$/, ''); });
            try {
                for (var candidateLocations_1 = tslib_1.__values(candidateLocations), candidateLocations_1_1 = candidateLocations_1.next(); !candidateLocations_1_1.done; candidateLocations_1_1 = candidateLocations_1.next()) {
                    var candidate = candidateLocations_1_1.value;
                    if (fs.existsSync(candidate)) {
                        return fs.readFileSync(candidate, 'utf8');
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (candidateLocations_1_1 && !candidateLocations_1_1.done && (_a = candidateLocations_1.return)) _a.call(candidateLocations_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            throw new Error("Could not find resource " + file + " in context of " + containingFile);
        };
        return FileResourceLoader;
    }());
    exports.FileResourceLoader = FileResourceLoader;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VfbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXItY2xpL3NyYy9uZ3RzYy9yZXNvdXJjZV9sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7O0lBRUgsdUJBQXlCO0lBQ3pCLCtCQUFpQztJQUlqQzs7T0FFRztJQUNIO1FBSUUsNEJBQ1ksUUFBMkQsRUFDM0QsTUFBaUQ7WUFEakQsYUFBUSxHQUFSLFFBQVEsQ0FBbUQ7WUFDM0QsV0FBTSxHQUFOLE1BQU0sQ0FBMkM7WUFMckQsVUFBSyxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1lBQ2xDLGFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBeUIsQ0FBQztRQUlZLENBQUM7UUFFakUsb0NBQU8sR0FBUCxVQUFRLElBQVksRUFBRSxjQUFzQjtZQUE1QyxpQkF3QkM7WUF2QkMsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDckQsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO2dCQUNyQixPQUFPLFNBQVMsQ0FBQzthQUNsQjtZQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzVCLE9BQU8sU0FBUyxDQUFDO2FBQ2xCO2lCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3RDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDcEM7WUFFRCxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JDLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO2dCQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLEdB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LENBQUMsRUFBdEMsQ0FBc0MsQ0FBQztpQkFDM0QsR0FBRyxDQUFDLFVBQUEsU0FBUyxJQUFJLE9BQUEsU0FBUyxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLENBQUMsRUFBOUMsQ0FBOEMsQ0FBQyxDQUFDOztnQkFFMUUsS0FBd0IsSUFBQSx1QkFBQSxpQkFBQSxrQkFBa0IsQ0FBQSxzREFBQSxzRkFBRTtvQkFBdkMsSUFBTSxTQUFTLCtCQUFBO29CQUNsQixJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQzVCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7cUJBQzNDO2lCQUNGOzs7Ozs7Ozs7WUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUEyQixJQUFJLHVCQUFrQixjQUFnQixDQUFDLENBQUM7UUFDckYsQ0FBQztRQUNILHlCQUFDO0lBQUQsQ0FBQyxBQTNDRCxJQTJDQztJQTNDWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5pbXBvcnQge1Jlc291cmNlTG9hZGVyfSBmcm9tICcuL2Fubm90YXRpb25zJztcblxuLyoqXG4gKiBgUmVzb3VyY2VMb2FkZXJgIHdoaWNoIGRlbGVnYXRlcyB0byBhIGBDb21waWxlckhvc3RgIHJlc291cmNlIGxvYWRpbmcgbWV0aG9kLlxuICovXG5leHBvcnQgY2xhc3MgSG9zdFJlc291cmNlTG9hZGVyIGltcGxlbWVudHMgUmVzb3VyY2VMb2FkZXIge1xuICBwcml2YXRlIGNhY2hlID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgcHJpdmF0ZSBmZXRjaGluZyA9IG5ldyBNYXA8c3RyaW5nLCBQcm9taXNlPHZvaWQ+PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSByZXNvbHZlcjogKGZpbGU6IHN0cmluZywgYmFzZVBhdGg6IHN0cmluZykgPT4gc3RyaW5nIHwgbnVsbCxcbiAgICAgIHByaXZhdGUgbG9hZGVyOiAodXJsOiBzdHJpbmcpID0+IHN0cmluZyB8IFByb21pc2U8c3RyaW5nPikge31cblxuICBwcmVsb2FkKGZpbGU6IHN0cmluZywgY29udGFpbmluZ0ZpbGU6IHN0cmluZyk6IFByb21pc2U8dm9pZD58dW5kZWZpbmVkIHtcbiAgICBjb25zdCByZXNvbHZlZCA9IHRoaXMucmVzb2x2ZXIoZmlsZSwgY29udGFpbmluZ0ZpbGUpO1xuICAgIGlmIChyZXNvbHZlZCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jYWNoZS5oYXMocmVzb2x2ZWQpKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mZXRjaGluZy5oYXMocmVzb2x2ZWQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5mZXRjaGluZy5nZXQocmVzb2x2ZWQpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMubG9hZGVyKHJlc29sdmVkKTtcbiAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuY2FjaGUuc2V0KHJlc29sdmVkLCByZXN1bHQpO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmV0Y2hDb21wbGV0aW9uID0gcmVzdWx0LnRoZW4oc3RyID0+IHtcbiAgICAgICAgdGhpcy5mZXRjaGluZy5kZWxldGUocmVzb2x2ZWQpO1xuICAgICAgICB0aGlzLmNhY2hlLnNldChyZXNvbHZlZCwgc3RyKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5mZXRjaGluZy5zZXQocmVzb2x2ZWQsIGZldGNoQ29tcGxldGlvbik7XG4gICAgICByZXR1cm4gZmV0Y2hDb21wbGV0aW9uO1xuICAgIH1cbiAgfVxuXG4gIGxvYWQoZmlsZTogc3RyaW5nLCBjb250YWluaW5nRmlsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCByZXNvbHZlZCA9IHRoaXMucmVzb2x2ZXIoZmlsZSwgY29udGFpbmluZ0ZpbGUpO1xuICAgIGlmIChyZXNvbHZlZCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBIb3N0UmVzb3VyY2VMb2FkZXI6IGNvdWxkIG5vdCByZXNvbHZlICR7ZmlsZX0gaW4gY29udGV4dCBvZiAke2NvbnRhaW5pbmdGaWxlfSlgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jYWNoZS5oYXMocmVzb2x2ZWQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXQocmVzb2x2ZWQpICE7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5sb2FkZXIocmVzb2x2ZWQpO1xuICAgIGlmICh0eXBlb2YgcmVzdWx0ICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBIb3N0UmVzb3VyY2VMb2FkZXI6IGxvYWRlcigke3Jlc29sdmVkfSkgcmV0dXJuZWQgYSBQcm9taXNlYCk7XG4gICAgfVxuICAgIHRoaXMuY2FjaGUuc2V0KHJlc29sdmVkLCByZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuXG5cbi8vIGBmYWlsZWRMb29rdXBMb2NhdGlvbnNgIGlzIGluIHRoZSBuYW1lIG9mIHRoZSB0eXBlIHRzLlJlc29sdmVkTW9kdWxlV2l0aEZhaWxlZExvb2t1cExvY2F0aW9uc1xuLy8gYnV0IGlzIG1hcmtlZCBAaW50ZXJuYWwgaW4gVHlwZVNjcmlwdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMjg3NzAuXG50eXBlIFJlc29sdmVkTW9kdWxlV2l0aEZhaWxlZExvb2t1cExvY2F0aW9ucyA9XG4gICAgdHMuUmVzb2x2ZWRNb2R1bGVXaXRoRmFpbGVkTG9va3VwTG9jYXRpb25zICYge2ZhaWxlZExvb2t1cExvY2F0aW9uczogUmVhZG9ubHlBcnJheTxzdHJpbmc+fTtcblxuLyoqXG4gKiBgUmVzb3VyY2VMb2FkZXJgIHdoaWNoIGRpcmVjdGx5IHVzZXMgdGhlIGZpbGVzeXN0ZW0gdG8gcmVzb2x2ZSByZXNvdXJjZXMgc3luY2hyb25vdXNseS5cbiAqL1xuZXhwb3J0IGNsYXNzIEZpbGVSZXNvdXJjZUxvYWRlciBpbXBsZW1lbnRzIFJlc291cmNlTG9hZGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBob3N0OiB0cy5Db21waWxlckhvc3QsIHByaXZhdGUgb3B0aW9uczogdHMuQ29tcGlsZXJPcHRpb25zKSB7fVxuXG4gIGxvYWQoZmlsZTogc3RyaW5nLCBjb250YWluaW5nRmlsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAvLyBBdHRlbXB0IHRvIHJlc29sdmUgYGZpbGVgIGluIHRoZSBjb250ZXh0IG9mIGBjb250YWluaW5nRmlsZWAsIHdoaWxlIHJlc3BlY3RpbmcgdGhlIHJvb3REaXJzXG4gICAgLy8gb3B0aW9uIGZyb20gdGhlIHRzY29uZmlnLiBGaXJzdCwgbm9ybWFsaXplIHRoZSBmaWxlIG5hbWUuXG5cbiAgICAvLyBTdHJpcCBhIGxlYWRpbmcgJy8nIGlmIG9uZSBpcyBwcmVzZW50LlxuICAgIGlmIChmaWxlLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgZmlsZSA9IGZpbGUuc3Vic3RyKDEpO1xuICAgIH1cbiAgICAvLyBUdXJuIGFic29sdXRlIHBhdGhzIGludG8gcmVsYXRpdmUgcGF0aHMuXG4gICAgaWYgKCFmaWxlLnN0YXJ0c1dpdGgoJy4nKSkge1xuICAgICAgZmlsZSA9IGAuLyR7ZmlsZX1gO1xuICAgIH1cblxuICAgIC8vIFR5cGVTY3JpcHQgcHJvdmlkZXMgdXRpbGl0aWVzIHRvIHJlc29sdmUgbW9kdWxlIG5hbWVzLCBidXQgbm90IHJlc291cmNlIGZpbGVzICh3aGljaCBhcmVuJ3RcbiAgICAvLyBhIHBhcnQgb2YgdGhlIHRzLlByb2dyYW0pLiBIb3dldmVyLCBUeXBlU2NyaXB0J3MgbW9kdWxlIHJlc29sdXRpb24gY2FuIGJlIHVzZWQgY3JlYXRpdmVseVxuICAgIC8vIHRvIGxvY2F0ZSB3aGVyZSByZXNvdXJjZSBmaWxlcyBzaG91bGQgYmUgZXhwZWN0ZWQgdG8gZXhpc3QuIFNpbmNlIG1vZHVsZSByZXNvbHV0aW9uIHJldHVybnNcbiAgICAvLyBhIGxpc3Qgb2YgZmlsZSBuYW1lcyB0aGF0IHdlcmUgY29uc2lkZXJlZCwgdGhlIGxvYWRlciBjYW4gZW51bWVyYXRlIHRoZSBwb3NzaWJsZSBsb2NhdGlvbnNcbiAgICAvLyBmb3IgdGhlIGZpbGUgYnkgc2V0dGluZyB1cCBhIG1vZHVsZSByZXNvbHV0aW9uIGZvciBpdCB0aGF0IHdpbGwgZmFpbC5cbiAgICBmaWxlICs9ICcuJG5ncmVzb3VyY2UkJztcblxuICAgIC8vIGNsYW5nLWZvcm1hdCBvZmZcbiAgICBjb25zdCBmYWlsZWRMb29rdXAgPSB0cy5yZXNvbHZlTW9kdWxlTmFtZShmaWxlLCBjb250YWluaW5nRmlsZSwgdGhpcy5vcHRpb25zLCB0aGlzLmhvc3QpIGFzIFJlc29sdmVkTW9kdWxlV2l0aEZhaWxlZExvb2t1cExvY2F0aW9ucztcbiAgICAvLyBjbGFuZy1mb3JtYXQgb25cbiAgICBpZiAoZmFpbGVkTG9va3VwLmZhaWxlZExvb2t1cExvY2F0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYEludGVybmFsIGVycm9yOiBleHBlY3RlZCB0byBmaW5kIGZhaWxlZExvb2t1cExvY2F0aW9ucyBkdXJpbmcgcmVzb2x1dGlvbiBvZiByZXNvdXJjZSAnJHtmaWxlfScgaW4gY29udGV4dCBvZiAke2NvbnRhaW5pbmdGaWxlfWApO1xuICAgIH1cblxuICAgIGNvbnN0IGNhbmRpZGF0ZUxvY2F0aW9ucyA9XG4gICAgICAgIGZhaWxlZExvb2t1cC5mYWlsZWRMb29rdXBMb2NhdGlvbnNcbiAgICAgICAgICAgIC5maWx0ZXIoY2FuZGlkYXRlID0+IGNhbmRpZGF0ZS5lbmRzV2l0aCgnLiRuZ3Jlc291cmNlJC50cycpKVxuICAgICAgICAgICAgLm1hcChjYW5kaWRhdGUgPT4gY2FuZGlkYXRlLnJlcGxhY2UoL1xcLlxcJG5ncmVzb3VyY2VcXCRcXC50cyQvLCAnJykpO1xuXG4gICAgZm9yIChjb25zdCBjYW5kaWRhdGUgb2YgY2FuZGlkYXRlTG9jYXRpb25zKSB7XG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyhjYW5kaWRhdGUpKSB7XG4gICAgICAgIHJldHVybiBmcy5yZWFkRmlsZVN5bmMoY2FuZGlkYXRlLCAndXRmOCcpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIHJlc291cmNlICR7ZmlsZX0gaW4gY29udGV4dCBvZiAke2NvbnRhaW5pbmdGaWxlfWApO1xuICB9XG59XG4iXX0=