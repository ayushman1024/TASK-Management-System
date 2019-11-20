(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/metadata/bundler", ["require", "exports", "tslib", "path", "typescript", "@angular/compiler-cli/src/metadata/collector", "@angular/compiler-cli/src/metadata/schema"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var path = require("path");
    var ts = require("typescript");
    var collector_1 = require("@angular/compiler-cli/src/metadata/collector");
    var schema_1 = require("@angular/compiler-cli/src/metadata/schema");
    // The character set used to produce private names.
    var PRIVATE_NAME_CHARS = 'abcdefghijklmnopqrstuvwxyz';
    var MetadataBundler = /** @class */ (function () {
        function MetadataBundler(root, importAs, host, privateSymbolPrefix) {
            this.root = root;
            this.importAs = importAs;
            this.host = host;
            this.symbolMap = new Map();
            this.metadataCache = new Map();
            this.exports = new Map();
            this.rootModule = "./" + path.basename(root);
            this.privateSymbolPrefix = (privateSymbolPrefix || '').replace(/\W/g, '_');
        }
        MetadataBundler.prototype.getMetadataBundle = function () {
            // Export the root module. This also collects the transitive closure of all values referenced by
            // the exports.
            var exportedSymbols = this.exportAll(this.rootModule);
            this.canonicalizeSymbols(exportedSymbols);
            // TODO: exports? e.g. a module re-exports a symbol from another bundle
            var metadata = this.getEntries(exportedSymbols);
            var privates = Array.from(this.symbolMap.values())
                .filter(function (s) { return s.referenced && s.isPrivate; })
                .map(function (s) { return ({
                privateName: s.privateName,
                name: s.declaration.name,
                module: s.declaration.module
            }); });
            var origins = Array.from(this.symbolMap.values())
                .filter(function (s) { return s.referenced && !s.reexport; })
                .reduce(function (p, s) {
                p[s.isPrivate ? s.privateName : s.name] = s.declaration.module;
                return p;
            }, {});
            var exports = this.getReExports(exportedSymbols);
            return {
                metadata: {
                    __symbolic: 'module',
                    version: schema_1.METADATA_VERSION,
                    exports: exports.length ? exports : undefined, metadata: metadata, origins: origins,
                    importAs: this.importAs
                },
                privates: privates
            };
        };
        MetadataBundler.resolveModule = function (importName, from) {
            return resolveModule(importName, from);
        };
        MetadataBundler.prototype.getMetadata = function (moduleName) {
            var result = this.metadataCache.get(moduleName);
            if (!result) {
                if (moduleName.startsWith('.')) {
                    var fullModuleName = resolveModule(moduleName, this.root);
                    result = this.host.getMetadataFor(fullModuleName, this.root);
                }
                this.metadataCache.set(moduleName, result);
            }
            return result;
        };
        MetadataBundler.prototype.exportAll = function (moduleName) {
            var _this = this;
            var e_1, _a, e_2, _b, e_3, _c;
            var module = this.getMetadata(moduleName);
            var result = this.exports.get(moduleName);
            if (result) {
                return result;
            }
            result = [];
            var exportSymbol = function (exportedSymbol, exportAs) {
                var symbol = _this.symbolOf(moduleName, exportAs);
                result.push(symbol);
                exportedSymbol.reexportedAs = symbol;
                symbol.exports = exportedSymbol;
            };
            // Export all the symbols defined in this module.
            if (module && module.metadata) {
                for (var key in module.metadata) {
                    var data = module.metadata[key];
                    if (schema_1.isMetadataImportedSymbolReferenceExpression(data)) {
                        // This is a re-export of an imported symbol. Record this as a re-export.
                        var exportFrom = resolveModule(data.module, moduleName);
                        this.exportAll(exportFrom);
                        var symbol = this.symbolOf(exportFrom, data.name);
                        exportSymbol(symbol, key);
                    }
                    else {
                        // Record that this symbol is exported by this module.
                        result.push(this.symbolOf(moduleName, key));
                    }
                }
            }
            // Export all the re-exports from this module
            if (module && module.exports) {
                try {
                    for (var _d = tslib_1.__values(module.exports), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var exportDeclaration = _e.value;
                        var exportFrom = resolveModule(exportDeclaration.from, moduleName);
                        // Record all the exports from the module even if we don't use it directly.
                        var exportedSymbols = this.exportAll(exportFrom);
                        if (exportDeclaration.export) {
                            try {
                                // Re-export all the named exports from a module.
                                for (var _f = tslib_1.__values(exportDeclaration.export), _g = _f.next(); !_g.done; _g = _f.next()) {
                                    var exportItem = _g.value;
                                    var name = typeof exportItem == 'string' ? exportItem : exportItem.name;
                                    var exportAs = typeof exportItem == 'string' ? exportItem : exportItem.as;
                                    var symbol = this.symbolOf(exportFrom, name);
                                    if (exportedSymbols && exportedSymbols.length == 1 && exportedSymbols[0].reexport &&
                                        exportedSymbols[0].name == '*') {
                                        // This is a named export from a module we have no metadata about. Record the named
                                        // export as a re-export.
                                        symbol.reexport = true;
                                    }
                                    exportSymbol(this.symbolOf(exportFrom, name), exportAs);
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                        else {
                            // Re-export all the symbols from the module
                            var exportedSymbols_2 = this.exportAll(exportFrom);
                            try {
                                for (var exportedSymbols_1 = tslib_1.__values(exportedSymbols_2), exportedSymbols_1_1 = exportedSymbols_1.next(); !exportedSymbols_1_1.done; exportedSymbols_1_1 = exportedSymbols_1.next()) {
                                    var exportedSymbol = exportedSymbols_1_1.value;
                                    var name = exportedSymbol.name;
                                    exportSymbol(exportedSymbol, name);
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (exportedSymbols_1_1 && !exportedSymbols_1_1.done && (_c = exportedSymbols_1.return)) _c.call(exportedSymbols_1);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (!module) {
                // If no metadata is found for this import then it is considered external to the
                // library and should be recorded as a re-export in the final metadata if it is
                // eventually re-exported.
                var symbol = this.symbolOf(moduleName, '*');
                symbol.reexport = true;
                result.push(symbol);
            }
            this.exports.set(moduleName, result);
            return result;
        };
        /**
         * Fill in the canonicalSymbol which is the symbol that should be imported by factories.
         * The canonical symbol is the one exported by the index file for the bundle or definition
         * symbol for private symbols that are not exported by bundle index.
         */
        MetadataBundler.prototype.canonicalizeSymbols = function (exportedSymbols) {
            var symbols = Array.from(this.symbolMap.values());
            this.exported = new Set(exportedSymbols);
            symbols.forEach(this.canonicalizeSymbol, this);
        };
        MetadataBundler.prototype.canonicalizeSymbol = function (symbol) {
            var rootExport = getRootExport(symbol);
            var declaration = getSymbolDeclaration(symbol);
            var isPrivate = !this.exported.has(rootExport);
            var canonicalSymbol = isPrivate ? declaration : rootExport;
            symbol.isPrivate = isPrivate;
            symbol.declaration = declaration;
            symbol.canonicalSymbol = canonicalSymbol;
            symbol.reexport = declaration.reexport;
        };
        MetadataBundler.prototype.getEntries = function (exportedSymbols) {
            var _this = this;
            var result = {};
            var exportedNames = new Set(exportedSymbols.map(function (s) { return s.name; }));
            var privateName = 0;
            function newPrivateName(prefix) {
                while (true) {
                    var digits = [];
                    var index = privateName++;
                    var base = PRIVATE_NAME_CHARS;
                    while (!digits.length || index > 0) {
                        digits.unshift(base[index % base.length]);
                        index = Math.floor(index / base.length);
                    }
                    var result_1 = "\u0275" + prefix + digits.join('');
                    if (!exportedNames.has(result_1))
                        return result_1;
                }
            }
            exportedSymbols.forEach(function (symbol) { return _this.convertSymbol(symbol); });
            var symbolsMap = new Map();
            Array.from(this.symbolMap.values()).forEach(function (symbol) {
                if (symbol.referenced && !symbol.reexport) {
                    var name = symbol.name;
                    var identifier = symbol.declaration.module + ":" + symbol.declaration.name;
                    if (symbol.isPrivate && !symbol.privateName) {
                        name = newPrivateName(_this.privateSymbolPrefix);
                        symbol.privateName = name;
                    }
                    if (symbolsMap.has(identifier)) {
                        var names = symbolsMap.get(identifier);
                        names.push(name);
                    }
                    else {
                        symbolsMap.set(identifier, [name]);
                    }
                    result[name] = symbol.value;
                }
            });
            // check for duplicated entries
            symbolsMap.forEach(function (names, identifier) {
                if (names.length > 1) {
                    var _a = tslib_1.__read(identifier.split(':'), 2), module_1 = _a[0], declaredName = _a[1];
                    // prefer the export that uses the declared name (if any)
                    var reference_1 = names.indexOf(declaredName);
                    if (reference_1 === -1) {
                        reference_1 = 0;
                    }
                    // keep one entry and replace the others by references
                    names.forEach(function (name, i) {
                        if (i !== reference_1) {
                            result[name] = { __symbolic: 'reference', name: names[reference_1] };
                        }
                    });
                }
            });
            return result;
        };
        MetadataBundler.prototype.getReExports = function (exportedSymbols) {
            var e_4, _a;
            var modules = new Map();
            var exportAlls = new Set();
            try {
                for (var exportedSymbols_3 = tslib_1.__values(exportedSymbols), exportedSymbols_3_1 = exportedSymbols_3.next(); !exportedSymbols_3_1.done; exportedSymbols_3_1 = exportedSymbols_3.next()) {
                    var symbol = exportedSymbols_3_1.value;
                    if (symbol.reexport) {
                        // symbol.declaration is guaranteed to be defined during the phase this method is called.
                        var declaration = symbol.declaration;
                        var module_2 = declaration.module;
                        if (declaration.name == '*') {
                            // Reexport all the symbols.
                            exportAlls.add(declaration.module);
                        }
                        else {
                            // Re-export the symbol as the exported name.
                            var entry = modules.get(module_2);
                            if (!entry) {
                                entry = [];
                                modules.set(module_2, entry);
                            }
                            var as = symbol.name;
                            var name = declaration.name;
                            entry.push({ name: name, as: as });
                        }
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (exportedSymbols_3_1 && !exportedSymbols_3_1.done && (_a = exportedSymbols_3.return)) _a.call(exportedSymbols_3);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return tslib_1.__spread(Array.from(exportAlls.values()).map(function (from) { return ({ from: from }); }), Array.from(modules.entries()).map(function (_a) {
                var _b = tslib_1.__read(_a, 2), from = _b[0], exports = _b[1];
                return ({ export: exports, from: from });
            }));
        };
        MetadataBundler.prototype.convertSymbol = function (symbol) {
            // canonicalSymbol is ensured to be defined before this is called.
            var canonicalSymbol = symbol.canonicalSymbol;
            if (!canonicalSymbol.referenced) {
                canonicalSymbol.referenced = true;
                // declaration is ensured to be definded before this method is called.
                var declaration = canonicalSymbol.declaration;
                var module_3 = this.getMetadata(declaration.module);
                if (module_3) {
                    var value = module_3.metadata[declaration.name];
                    if (value && !declaration.name.startsWith('___')) {
                        canonicalSymbol.value = this.convertEntry(declaration.module, value);
                    }
                }
            }
        };
        MetadataBundler.prototype.convertEntry = function (moduleName, value) {
            if (schema_1.isClassMetadata(value)) {
                return this.convertClass(moduleName, value);
            }
            if (schema_1.isFunctionMetadata(value)) {
                return this.convertFunction(moduleName, value);
            }
            if (schema_1.isInterfaceMetadata(value)) {
                return value;
            }
            return this.convertValue(moduleName, value);
        };
        MetadataBundler.prototype.convertClass = function (moduleName, value) {
            var _this = this;
            return {
                __symbolic: 'class',
                arity: value.arity,
                extends: this.convertExpression(moduleName, value.extends),
                decorators: value.decorators && value.decorators.map(function (d) { return _this.convertExpression(moduleName, d); }),
                members: this.convertMembers(moduleName, value.members),
                statics: value.statics && this.convertStatics(moduleName, value.statics)
            };
        };
        MetadataBundler.prototype.convertMembers = function (moduleName, members) {
            var _this = this;
            var result = {};
            for (var name in members) {
                var value = members[name];
                result[name] = value.map(function (v) { return _this.convertMember(moduleName, v); });
            }
            return result;
        };
        MetadataBundler.prototype.convertMember = function (moduleName, member) {
            var _this = this;
            var result = { __symbolic: member.__symbolic };
            result.decorators =
                member.decorators && member.decorators.map(function (d) { return _this.convertExpression(moduleName, d); });
            if (schema_1.isMethodMetadata(member)) {
                result.parameterDecorators = member.parameterDecorators &&
                    member.parameterDecorators.map(function (d) { return d && d.map(function (p) { return _this.convertExpression(moduleName, p); }); });
                if (schema_1.isConstructorMetadata(member)) {
                    if (member.parameters) {
                        result.parameters =
                            member.parameters.map(function (p) { return _this.convertExpression(moduleName, p); });
                    }
                }
            }
            return result;
        };
        MetadataBundler.prototype.convertStatics = function (moduleName, statics) {
            var result = {};
            for (var key in statics) {
                var value = statics[key];
                if (schema_1.isFunctionMetadata(value)) {
                    result[key] = this.convertFunction(moduleName, value);
                }
                else if (schema_1.isMetadataSymbolicCallExpression(value)) {
                    // Class members can also contain static members that call a function with module
                    // references. e.g. "static ngInjectableDef = defineInjectable(..)". We also need to
                    // convert these module references because otherwise these resolve to non-existent files.
                    result[key] = this.convertValue(moduleName, value);
                }
                else {
                    result[key] = value;
                }
            }
            return result;
        };
        MetadataBundler.prototype.convertFunction = function (moduleName, value) {
            var _this = this;
            return {
                __symbolic: 'function',
                parameters: value.parameters,
                defaults: value.defaults && value.defaults.map(function (v) { return _this.convertValue(moduleName, v); }),
                value: this.convertValue(moduleName, value.value)
            };
        };
        MetadataBundler.prototype.convertValue = function (moduleName, value) {
            var _this = this;
            if (isPrimitive(value)) {
                return value;
            }
            if (schema_1.isMetadataError(value)) {
                return this.convertError(moduleName, value);
            }
            if (schema_1.isMetadataSymbolicExpression(value)) {
                return this.convertExpression(moduleName, value);
            }
            if (Array.isArray(value)) {
                return value.map(function (v) { return _this.convertValue(moduleName, v); });
            }
            // Otherwise it is a metadata object.
            var object = value;
            var result = {};
            for (var key in object) {
                result[key] = this.convertValue(moduleName, object[key]);
            }
            return result;
        };
        MetadataBundler.prototype.convertExpression = function (moduleName, value) {
            if (value) {
                switch (value.__symbolic) {
                    case 'error':
                        return this.convertError(moduleName, value);
                    case 'reference':
                        return this.convertReference(moduleName, value);
                    default:
                        return this.convertExpressionNode(moduleName, value);
                }
            }
            return value;
        };
        MetadataBundler.prototype.convertError = function (module, value) {
            return {
                __symbolic: 'error',
                message: value.message,
                line: value.line,
                character: value.character,
                context: value.context, module: module
            };
        };
        MetadataBundler.prototype.convertReference = function (moduleName, value) {
            var _this = this;
            var createReference = function (symbol) {
                var declaration = symbol.declaration;
                if (declaration.module.startsWith('.')) {
                    // Reference to a symbol defined in the module. Ensure it is converted then return a
                    // references to the final symbol.
                    _this.convertSymbol(symbol);
                    return {
                        __symbolic: 'reference',
                        get name() {
                            // Resolved lazily because private names are assigned late.
                            var canonicalSymbol = symbol.canonicalSymbol;
                            if (canonicalSymbol.isPrivate == null) {
                                throw Error('Invalid state: isPrivate was not initialized');
                            }
                            return canonicalSymbol.isPrivate ? canonicalSymbol.privateName : canonicalSymbol.name;
                        }
                    };
                }
                else {
                    // The symbol was a re-exported symbol from another module. Return a reference to the
                    // original imported symbol.
                    return { __symbolic: 'reference', name: declaration.name, module: declaration.module };
                }
            };
            if (schema_1.isMetadataGlobalReferenceExpression(value)) {
                var metadata = this.getMetadata(moduleName);
                if (metadata && metadata.metadata && metadata.metadata[value.name]) {
                    // Reference to a symbol defined in the module
                    return createReference(this.canonicalSymbolOf(moduleName, value.name));
                }
                // If a reference has arguments, the arguments need to be converted.
                if (value.arguments) {
                    return {
                        __symbolic: 'reference',
                        name: value.name,
                        arguments: value.arguments.map(function (a) { return _this.convertValue(moduleName, a); })
                    };
                }
                // Global references without arguments (such as to Math or JSON) are unmodified.
                return value;
            }
            if (schema_1.isMetadataImportedSymbolReferenceExpression(value)) {
                // References to imported symbols are separated into two, references to bundled modules and
                // references to modules external to the bundle. If the module reference is relative it is
                // assumed to be in the bundle. If it is Global it is assumed to be outside the bundle.
                // References to symbols outside the bundle are left unmodified. References to symbol inside
                // the bundle need to be converted to a bundle import reference reachable from the bundle
                // index.
                if (value.module.startsWith('.')) {
                    // Reference is to a symbol defined inside the module. Convert the reference to a reference
                    // to the canonical symbol.
                    var referencedModule = resolveModule(value.module, moduleName);
                    var referencedName = value.name;
                    return createReference(this.canonicalSymbolOf(referencedModule, referencedName));
                }
                // Value is a reference to a symbol defined outside the module.
                if (value.arguments) {
                    // If a reference has arguments the arguments need to be converted.
                    return {
                        __symbolic: 'reference',
                        name: value.name,
                        module: value.module,
                        arguments: value.arguments.map(function (a) { return _this.convertValue(moduleName, a); })
                    };
                }
                return value;
            }
            if (schema_1.isMetadataModuleReferenceExpression(value)) {
                // Cannot support references to bundled modules as the internal modules of a bundle are erased
                // by the bundler.
                if (value.module.startsWith('.')) {
                    return {
                        __symbolic: 'error',
                        message: 'Unsupported bundled module reference',
                        context: { module: value.module }
                    };
                }
                // References to unbundled modules are unmodified.
                return value;
            }
        };
        MetadataBundler.prototype.convertExpressionNode = function (moduleName, value) {
            var result = { __symbolic: value.__symbolic };
            for (var key in value) {
                result[key] = this.convertValue(moduleName, value[key]);
            }
            return result;
        };
        MetadataBundler.prototype.symbolOf = function (module, name) {
            var symbolKey = module + ":" + name;
            var symbol = this.symbolMap.get(symbolKey);
            if (!symbol) {
                symbol = { module: module, name: name };
                this.symbolMap.set(symbolKey, symbol);
            }
            return symbol;
        };
        MetadataBundler.prototype.canonicalSymbolOf = function (module, name) {
            // Ensure the module has been seen.
            this.exportAll(module);
            var symbol = this.symbolOf(module, name);
            if (!symbol.canonicalSymbol) {
                this.canonicalizeSymbol(symbol);
            }
            return symbol;
        };
        return MetadataBundler;
    }());
    exports.MetadataBundler = MetadataBundler;
    var CompilerHostAdapter = /** @class */ (function () {
        function CompilerHostAdapter(host, cache, options) {
            this.host = host;
            this.cache = cache;
            this.options = options;
            this.collector = new collector_1.MetadataCollector();
        }
        CompilerHostAdapter.prototype.getMetadataFor = function (fileName, containingFile) {
            var resolvedModule = ts.resolveModuleName(fileName, containingFile, this.options, this.host).resolvedModule;
            var sourceFile;
            if (resolvedModule) {
                var resolvedFileName = resolvedModule.resolvedFileName;
                if (resolvedModule.extension !== '.ts') {
                    resolvedFileName = resolvedFileName.replace(/(\.d\.ts|\.js)$/, '.ts');
                }
                sourceFile = this.host.getSourceFile(resolvedFileName, ts.ScriptTarget.Latest);
            }
            else {
                // If typescript is unable to resolve the file, fallback on old behavior
                if (!this.host.fileExists(fileName + '.ts'))
                    return undefined;
                sourceFile = this.host.getSourceFile(fileName + '.ts', ts.ScriptTarget.Latest);
            }
            // If there is a metadata cache, use it to get the metadata for this source file. Otherwise,
            // fall back on the locally created MetadataCollector.
            if (!sourceFile) {
                return undefined;
            }
            else if (this.cache) {
                return this.cache.getMetadata(sourceFile);
            }
            else {
                return this.collector.getMetadata(sourceFile);
            }
        };
        return CompilerHostAdapter;
    }());
    exports.CompilerHostAdapter = CompilerHostAdapter;
    function resolveModule(importName, from) {
        if (importName.startsWith('.') && from) {
            var normalPath = path.normalize(path.join(path.dirname(from), importName));
            if (!normalPath.startsWith('.') && from.startsWith('.')) {
                // path.normalize() preserves leading '../' but not './'. This adds it back.
                normalPath = "." + path.sep + normalPath;
            }
            // Replace windows path delimiters with forward-slashes. Otherwise the paths are not
            // TypeScript compatible when building the bundle.
            return normalPath.replace(/\\/g, '/');
        }
        return importName;
    }
    function isPrimitive(o) {
        return o === null || (typeof o !== 'function' && typeof o !== 'object');
    }
    function getRootExport(symbol) {
        return symbol.reexportedAs ? getRootExport(symbol.reexportedAs) : symbol;
    }
    function getSymbolDeclaration(symbol) {
        return symbol.exports ? getSymbolDeclaration(symbol.exports) : symbol;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9zcmMvbWV0YWRhdGEvYnVuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7O09BTUc7SUFDSCwyQkFBNkI7SUFDN0IsK0JBQWlDO0lBSWpDLDBFQUE4QztJQUM5QyxvRUFBNGxCO0lBSTVsQixtREFBbUQ7SUFDbkQsSUFBTSxrQkFBa0IsR0FBRyw0QkFBNEIsQ0FBQztJQWdFeEQ7UUFTRSx5QkFDWSxJQUFZLEVBQVUsUUFBMEIsRUFBVSxJQUF5QixFQUMzRixtQkFBNEI7WUFEcEIsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUFVLGFBQVEsR0FBUixRQUFRLENBQWtCO1lBQVUsU0FBSSxHQUFKLElBQUksQ0FBcUI7WUFUdkYsY0FBUyxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1lBQ3RDLGtCQUFhLEdBQUcsSUFBSSxHQUFHLEVBQW9DLENBQUM7WUFDNUQsWUFBTyxHQUFHLElBQUksR0FBRyxFQUFvQixDQUFDO1lBUzVDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBRyxDQUFDO1lBQzdDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLG1CQUFtQixJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDN0UsQ0FBQztRQUVELDJDQUFpQixHQUFqQjtZQUNFLGdHQUFnRztZQUNoRyxlQUFlO1lBQ2YsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzFDLHVFQUF1RTtZQUN2RSxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxD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LENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUN4RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5pbXBvcnQge01ldGFkYXRhQ2FjaGV9IGZyb20gJy4uL3RyYW5zZm9ybWVycy9tZXRhZGF0YV9jYWNoZSc7XG5cbmltcG9ydCB7TWV0YWRhdGFDb2xsZWN0b3J9IGZyb20gJy4vY29sbGVjdG9yJztcbmltcG9ydCB7Q2xhc3NNZXRhZGF0YSwgQ29uc3RydWN0b3JNZXRhZGF0YSwgRnVuY3Rpb25NZXRhZGF0YSwgTUVUQURBVEFfVkVSU0lPTiwgTWVtYmVyTWV0YWRhdGEsIE1ldGFkYXRhRW50cnksIE1ldGFkYXRhRXJyb3IsIE1ldGFkYXRhTWFwLCBNZXRhZGF0YU9iamVjdCwgTWV0YWRhdGFTeW1ib2xpY0V4cHJlc3Npb24sIE1ldGFkYXRhU3ltYm9saWNSZWZlcmVuY2VFeHByZXNzaW9uLCBNZXRhZGF0YVZhbHVlLCBNZXRob2RNZXRhZGF0YSwgTW9kdWxlRXhwb3J0TWV0YWRhdGEsIE1vZHVsZU1ldGFkYXRhLCBpc0NsYXNzTWV0YWRhdGEsIGlzQ29uc3RydWN0b3JNZXRhZGF0YSwgaXNGdW5jdGlvbk1ldGFkYXRhLCBpc0ludGVyZmFjZU1ldGFkYXRhLCBpc01ldGFkYXRhRXJyb3IsIGlzTWV0YWRhdGFHbG9iYWxSZWZlcmVuY2VFeHByZXNzaW9uLCBpc01ldGFkYXRhSW1wb3J0ZWRTeW1ib2xSZWZlcmVuY2VFeHByZXNzaW9uLCBpc01ldGFkYXRhTW9kdWxlUmVmZXJlbmNlRXhwcmVzc2lvbiwgaXNNZXRhZGF0YVN5bWJvbGljQ2FsbEV4cHJlc3Npb24sIGlzTWV0YWRhdGFTeW1ib2xpY0V4cHJlc3Npb24sIGlzTWV0aG9kTWV0YWRhdGF9IGZyb20gJy4vc2NoZW1hJztcblxuXG5cbi8vIFRoZSBjaGFyYWN0ZXIgc2V0IHVzZWQgdG8gcHJvZHVjZSBwcml2YXRlIG5hbWVzLlxuY29uc3QgUFJJVkFURV9OQU1FX0NIQVJTID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6JztcblxuaW50ZXJmYWNlIFN5bWJvbCB7XG4gIG1vZHVsZTogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG5cbiAgLy8gUHJvZHVjZWQgYnkgaW5kaXJlY3RseSBieSBleHBvcnRBbGwoKSBmb3Igc3ltYm9scyByZS1leHBvcnQgYW5vdGhlciBzeW1ib2wuXG4gIGV4cG9ydHM/OiBTeW1ib2w7XG5cbiAgLy8gUHJvZHVjZWQgYnkgaW5kaXJlY3RseSBieSBleHBvcnRBbGwoKSBmb3Igc3ltYm9scyBhcmUgcmUtZXhwb3J0ZWQgYnkgYW5vdGhlciBzeW1ib2wuXG4gIHJlZXhwb3J0ZWRBcz86IFN5bWJvbDtcblxuICAvLyBQcm9kdWNlZCBieSBjYW5vbmljYWxpemVTeW1ib2xzKCkgZm9yIGFsbCBzeW1ib2xzLiBBIHN5bWJvbCBpcyBwcml2YXRlIGlmIGl0IGlzIG5vdFxuICAvLyBleHBvcnRlZCBieSB0aGUgaW5kZXguXG4gIGlzUHJpdmF0ZT86IGJvb2xlYW47XG5cbiAgLy8gUHJvZHVjZWQgYnkgY2Fub25pY2FsaXplU3ltYm9scygpIGZvciBhbGwgc3ltYm9scy4gVGhpcyBpcyB0aGUgb25lIHN5bWJvbCB0aGF0XG4gIC8vIHJlc3ByZXNlbnRzIGFsbCBvdGhlciBzeW1ib2xzIGFuZCBpcyB0aGUgb25seSBzeW1ib2wgdGhhdCwgYW1vbmcgYWxsIHRoZSByZS1leHBvcnRlZFxuICAvLyBhbGlhc2VzLCB3aG9zZSBmaWVsZHMgY2FuIGJlIHRydXN0ZWQgdG8gY29udGFpbiB0aGUgY29ycmVjdCBpbmZvcm1hdGlvbi5cbiAgLy8gRm9yIHByaXZhdGUgc3ltYm9scyB0aGlzIGlzIHRoZSBkZWNsYXJhdGlvbiBzeW1ib2wuIEZvciBwdWJsaWMgc3ltYm9scyB0aGlzIGlzIHRoZVxuICAvLyBzeW1ib2wgdGhhdCBpcyBleHBvcnRlZC5cbiAgY2Fub25pY2FsU3ltYm9sPzogU3ltYm9sO1xuXG4gIC8vIFByb2R1Y2VkIGJ5IGNhbm9uaWNhbGl6ZVN5bWJvbHMoKSBmb3IgYWxsIHN5bWJvbHMuIFRoaXMgdGhlIHN5bWJvbCB0aGF0IG9yaWdpbmFsbHlcbiAgLy8gZGVjbGFyZWQgdGhlIHZhbHVlIGFuZCBzaG91bGQgYmUgdXNlZCB0byBmZXRjaCB0aGUgdmFsdWUuXG4gIGRlY2xhcmF0aW9uPzogU3ltYm9sO1xuXG4gIC8vIEEgc3ltYm9sIGlzIHJlZmVyZW5jZWQgaWYgaXQgaXMgZXhwb3J0ZWQgZnJvbSBpbmRleCBvciByZWZlcmVuY2VkIGJ5IHRoZSB2YWx1ZSBvZlxuICAvLyBhIHJlZmVyZW5jZWQgc3ltYm9sJ3MgdmFsdWUuXG4gIHJlZmVyZW5jZWQ/OiBib29sZWFuO1xuXG4gIC8vIEEgc3ltYm9sIGlzIG1hcmtlZCBhcyBhIHJlLWV4cG9ydCB0aGUgc3ltYm9sIHdhcyByZXhwb3J0ZWQgZnJvbSBhIG1vZHVsZSB0aGF0IGlzXG4gIC8vIG5vdCBwYXJ0IG9mIHRoZSBmbGF0IG1vZHVsZSBidW5kbGUuXG4gIHJlZXhwb3J0PzogYm9vbGVhbjtcblxuICAvLyBPbmx5IHZhbGlkIGZvciByZWZlcmVuY2VkIGNhbm9uaWNhbCBzeW1ib2xzLiBQcm9kdWNlcyBieSBjb252ZXJ0U3ltYm9scygpLlxuICB2YWx1ZT86IE1ldGFkYXRhRW50cnk7XG5cbiAgLy8gT25seSB2YWxpZCBmb3IgcmVmZXJlbmNlZCBwcml2YXRlIHN5bWJvbHMuIEl0IGlzIHRoZSBuYW1lIHRvIHVzZSB0byBpbXBvcnQgdGhlIHN5bWJvbCBmcm9tXG4gIC8vIHRoZSBidW5kbGUgaW5kZXguIFByb2R1Y2UgYnkgYXNzaWduUHJpdmF0ZU5hbWVzKCk7XG4gIHByaXZhdGVOYW1lPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJ1bmRsZUVudHJpZXMgeyBbbmFtZTogc3RyaW5nXTogTWV0YWRhdGFFbnRyeTsgfVxuXG5leHBvcnQgaW50ZXJmYWNlIEJ1bmRsZVByaXZhdGVFbnRyeSB7XG4gIHByaXZhdGVOYW1lOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgbW9kdWxlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnVuZGxlZE1vZHVsZSB7XG4gIG1ldGFkYXRhOiBNb2R1bGVNZXRhZGF0YTtcbiAgcHJpdmF0ZXM6IEJ1bmRsZVByaXZhdGVFbnRyeVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1ldGFkYXRhQnVuZGxlckhvc3Qge1xuICBnZXRNZXRhZGF0YUZvcihtb2R1bGVOYW1lOiBzdHJpbmcsIGNvbnRhaW5pbmdGaWxlOiBzdHJpbmcpOiBNb2R1bGVNZXRhZGF0YXx1bmRlZmluZWQ7XG59XG5cbnR5cGUgU3RhdGljc01ldGFkYXRhID0ge1xuICBbbmFtZTogc3RyaW5nXTogTWV0YWRhdGFWYWx1ZSB8IEZ1bmN0aW9uTWV0YWRhdGE7XG59O1xuXG5leHBvcnQgY2xhc3MgTWV0YWRhdGFCdW5kbGVyIHtcbiAgcHJpdmF0ZSBzeW1ib2xNYXAgPSBuZXcgTWFwPHN0cmluZywgU3ltYm9sPigpO1xuICBwcml2YXRlIG1ldGFkYXRhQ2FjaGUgPSBuZXcgTWFwPHN0cmluZywgTW9kdWxlTWV0YWRhdGF8dW5kZWZpbmVkPigpO1xuICBwcml2YXRlIGV4cG9ydHMgPSBuZXcgTWFwPHN0cmluZywgU3ltYm9sW10+KCk7XG4gIHByaXZhdGUgcm9vdE1vZHVsZTogc3RyaW5nO1xuICBwcml2YXRlIHByaXZhdGVTeW1ib2xQcmVmaXg6IHN0cmluZztcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgZXhwb3J0ZWQgITogU2V0PFN5bWJvbD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJvb3Q6IHN0cmluZywgcHJpdmF0ZSBpbXBvcnRBczogc3RyaW5nfHVuZGVmaW5lZCwgcHJpdmF0ZSBob3N0OiBNZXRhZGF0YUJ1bmRsZXJIb3N0LFxuICAgICAgcHJpdmF0ZVN5bWJvbFByZWZpeD86IHN0cmluZykge1xuICAgIHRoaXMucm9vdE1vZHVsZSA9IGAuLyR7cGF0aC5iYXNlbmFtZShyb290KX1gO1xuICAgIHRoaXMucHJpdmF0ZVN5bWJvbFByZWZpeCA9IChwcml2YXRlU3ltYm9sUHJlZml4IHx8ICcnKS5yZXBsYWNlKC9cXFcvZywgJ18nKTtcbiAgfVxuXG4gIGdldE1ldGFkYXRhQnVuZGxlKCk6IEJ1bmRsZWRNb2R1bGUge1xuICAgIC8vIEV4cG9ydCB0aGUgcm9vdCBtb2R1bGUuIFRoaXMgYWxzbyBjb2xsZWN0cyB0aGUgdHJhbnNpdGl2ZSBjbG9zdXJlIG9mIGFsbCB2YWx1ZXMgcmVmZXJlbmNlZCBieVxuICAgIC8vIHRoZSBleHBvcnRzLlxuICAgIGNvbnN0IGV4cG9ydGVkU3ltYm9scyA9IHRoaXMuZXhwb3J0QWxsKHRoaXMucm9vdE1vZHVsZSk7XG4gICAgdGhpcy5jYW5vbmljYWxpemVTeW1ib2xzKGV4cG9ydGVkU3ltYm9scyk7XG4gICAgLy8gVE9ETzogZXhwb3J0cz8gZS5nLiBhIG1vZHVsZSByZS1leHBvcnRzIGEgc3ltYm9sIGZyb20gYW5vdGhlciBidW5kbGVcbiAgICBjb25zdCBtZXRhZGF0YSA9IHRoaXMuZ2V0RW50cmllcyhleHBvcnRlZFN5bWJvbHMpO1xuICAgIGNvbnN0IHByaXZhdGVzID0gQXJyYXkuZnJvbSh0aGlzLnN5bWJvbE1hcC52YWx1ZXMoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHMgPT4gcy5yZWZlcmVuY2VkICYmIHMuaXNQcml2YXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAocyA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcml2YXRlTmFtZTogcy5wcml2YXRlTmFtZSAhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBzLmRlY2xhcmF0aW9uICEubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlOiBzLmRlY2xhcmF0aW9uICEubW9kdWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgY29uc3Qgb3JpZ2lucyA9IEFycmF5LmZyb20odGhpcy5zeW1ib2xNYXAudmFsdWVzKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHMgPT4gcy5yZWZlcmVuY2VkICYmICFzLnJlZXhwb3J0KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlZHVjZTx7W25hbWU6IHN0cmluZ106IHN0cmluZ30+KChwLCBzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBbcy5pc1ByaXZhdGUgPyBzLnByaXZhdGVOYW1lICEgOiBzLm5hbWVdID0gcy5kZWNsYXJhdGlvbiAhLm1vZHVsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7fSk7XG4gICAgY29uc3QgZXhwb3J0cyA9IHRoaXMuZ2V0UmVFeHBvcnRzKGV4cG9ydGVkU3ltYm9scyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1ldGFkYXRhOiB7XG4gICAgICAgIF9fc3ltYm9saWM6ICdtb2R1bGUnLFxuICAgICAgICB2ZXJzaW9uOiBNRVRBREFUQV9WRVJTSU9OLFxuICAgICAgICBleHBvcnRzOiBleHBvcnRzLmxlbmd0aCA/IGV4cG9ydHMgOiB1bmRlZmluZWQsIG1ldGFkYXRhLCBvcmlnaW5zLFxuICAgICAgICBpbXBvcnRBczogdGhpcy5pbXBvcnRBcyAhXG4gICAgICB9LFxuICAgICAgcHJpdmF0ZXNcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHJlc29sdmVNb2R1bGUoaW1wb3J0TmFtZTogc3RyaW5nLCBmcm9tOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiByZXNvbHZlTW9kdWxlKGltcG9ydE5hbWUsIGZyb20pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRNZXRhZGF0YShtb2R1bGVOYW1lOiBzdHJpbmcpOiBNb2R1bGVNZXRhZGF0YXx1bmRlZmluZWQge1xuICAgIGxldCByZXN1bHQgPSB0aGlzLm1ldGFkYXRhQ2FjaGUuZ2V0KG1vZHVsZU5hbWUpO1xuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICBpZiAobW9kdWxlTmFtZS5zdGFydHNXaXRoKCcuJykpIHtcbiAgICAgICAgY29uc3QgZnVsbE1vZHVsZU5hbWUgPSByZXNvbHZlTW9kdWxlKG1vZHVsZU5hbWUsIHRoaXMucm9vdCk7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuaG9zdC5nZXRNZXRhZGF0YUZvcihmdWxsTW9kdWxlTmFtZSwgdGhpcy5yb290KTtcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0YWRhdGFDYWNoZS5zZXQobW9kdWxlTmFtZSwgcmVzdWx0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgZXhwb3J0QWxsKG1vZHVsZU5hbWU6IHN0cmluZyk6IFN5bWJvbFtdIHtcbiAgICBjb25zdCBtb2R1bGUgPSB0aGlzLmdldE1ldGFkYXRhKG1vZHVsZU5hbWUpO1xuICAgIGxldCByZXN1bHQgPSB0aGlzLmV4cG9ydHMuZ2V0KG1vZHVsZU5hbWUpO1xuXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXN1bHQgPSBbXTtcblxuICAgIGNvbnN0IGV4cG9ydFN5bWJvbCA9IChleHBvcnRlZFN5bWJvbDogU3ltYm9sLCBleHBvcnRBczogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBzeW1ib2wgPSB0aGlzLnN5bWJvbE9mKG1vZHVsZU5hbWUsIGV4cG9ydEFzKTtcbiAgICAgIHJlc3VsdCAhLnB1c2goc3ltYm9sKTtcbiAgICAgIGV4cG9ydGVkU3ltYm9sLnJlZXhwb3J0ZWRBcyA9IHN5bWJvbDtcbiAgICAgIHN5bWJvbC5leHBvcnRzID0gZXhwb3J0ZWRTeW1ib2w7XG4gICAgfTtcblxuICAgIC8vIEV4cG9ydCBhbGwgdGhlIHN5bWJvbHMgZGVmaW5lZCBpbiB0aGlzIG1vZHVsZS5cbiAgICBpZiAobW9kdWxlICYmIG1vZHVsZS5tZXRhZGF0YSkge1xuICAgICAgZm9yIChsZXQga2V5IGluIG1vZHVsZS5tZXRhZGF0YSkge1xuICAgICAgICBjb25zdCBkYXRhID0gbW9kdWxlLm1ldGFkYXRhW2tleV07XG4gICAgICAgIGlmIChpc01ldGFkYXRhSW1wb3J0ZWRTeW1ib2xSZWZlcmVuY2VFeHByZXNzaW9uKGRhdGEpKSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBhIHJlLWV4cG9ydCBvZiBhbiBpbXBvcnRlZCBzeW1ib2wuIFJlY29yZCB0aGlzIGFzIGEgcmUtZXhwb3J0LlxuICAgICAgICAgIGNvbnN0IGV4cG9ydEZyb20gPSByZXNvbHZlTW9kdWxlKGRhdGEubW9kdWxlLCBtb2R1bGVOYW1lKTtcbiAgICAgICAgICB0aGlzLmV4cG9ydEFsbChleHBvcnRGcm9tKTtcbiAgICAgICAgICBjb25zdCBzeW1ib2wgPSB0aGlzLnN5bWJvbE9mKGV4cG9ydEZyb20sIGRhdGEubmFtZSk7XG4gICAgICAgICAgZXhwb3J0U3ltYm9sKHN5bWJvbCwga2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBSZWNvcmQgdGhhdCB0aGlzIHN5bWJvbCBpcyBleHBvcnRlZCBieSB0aGlzIG1vZHVsZS5cbiAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLnN5bWJvbE9mKG1vZHVsZU5hbWUsIGtleSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRXhwb3J0IGFsbCB0aGUgcmUtZXhwb3J0cyBmcm9tIHRoaXMgbW9kdWxlXG4gICAgaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgZm9yIChjb25zdCBleHBvcnREZWNsYXJhdGlvbiBvZiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICBjb25zdCBleHBvcnRGcm9tID0gcmVzb2x2ZU1vZHVsZShleHBvcnREZWNsYXJhdGlvbi5mcm9tLCBtb2R1bGVOYW1lKTtcbiAgICAgICAgLy8gUmVjb3JkIGFsbCB0aGUgZXhwb3J0cyBmcm9tIHRoZSBtb2R1bGUgZXZlbiBpZiB3ZSBkb24ndCB1c2UgaXQgZGlyZWN0bHkuXG4gICAgICAgIGNvbnN0IGV4cG9ydGVkU3ltYm9scyA9IHRoaXMuZXhwb3J0QWxsKGV4cG9ydEZyb20pO1xuICAgICAgICBpZiAoZXhwb3J0RGVjbGFyYXRpb24uZXhwb3J0KSB7XG4gICAgICAgICAgLy8gUmUtZXhwb3J0IGFsbCB0aGUgbmFtZWQgZXhwb3J0cyBmcm9tIGEgbW9kdWxlLlxuICAgICAgICAgIGZvciAoY29uc3QgZXhwb3J0SXRlbSBvZiBleHBvcnREZWNsYXJhdGlvbi5leHBvcnQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSB0eXBlb2YgZXhwb3J0SXRlbSA9PSAnc3RyaW5nJyA/IGV4cG9ydEl0ZW0gOiBleHBvcnRJdGVtLm5hbWU7XG4gICAgICAgICAgICBjb25zdCBleHBvcnRBcyA9IHR5cGVvZiBleHBvcnRJdGVtID09ICdzdHJpbmcnID8gZXhwb3J0SXRlbSA6IGV4cG9ydEl0ZW0uYXM7XG4gICAgICAgICAgICBjb25zdCBzeW1ib2wgPSB0aGlzLnN5bWJvbE9mKGV4cG9ydEZyb20sIG5hbWUpO1xuICAgICAgICAgICAgaWYgKGV4cG9ydGVkU3ltYm9scyAmJiBleHBvcnRlZFN5bWJvbHMubGVuZ3RoID09IDEgJiYgZXhwb3J0ZWRTeW1ib2xzWzBdLnJlZXhwb3J0ICYmXG4gICAgICAgICAgICAgICAgZXhwb3J0ZWRTeW1ib2xzWzBdLm5hbWUgPT0gJyonKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBuYW1lZCBleHBvcnQgZnJvbSBhIG1vZHVsZSB3ZSBoYXZlIG5vIG1ldGFkYXRhIGFib3V0LiBSZWNvcmQgdGhlIG5hbWVkXG4gICAgICAgICAgICAgIC8vIGV4cG9ydCBhcyBhIHJlLWV4cG9ydC5cbiAgICAgICAgICAgICAgc3ltYm9sLnJlZXhwb3J0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4cG9ydFN5bWJvbCh0aGlzLnN5bWJvbE9mKGV4cG9ydEZyb20sIG5hbWUpLCBleHBvcnRBcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFJlLWV4cG9ydCBhbGwgdGhlIHN5bWJvbHMgZnJvbSB0aGUgbW9kdWxlXG4gICAgICAgICAgY29uc3QgZXhwb3J0ZWRTeW1ib2xzID0gdGhpcy5leHBvcnRBbGwoZXhwb3J0RnJvbSk7XG4gICAgICAgICAgZm9yIChjb25zdCBleHBvcnRlZFN5bWJvbCBvZiBleHBvcnRlZFN5bWJvbHMpIHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBleHBvcnRlZFN5bWJvbC5uYW1lO1xuICAgICAgICAgICAgZXhwb3J0U3ltYm9sKGV4cG9ydGVkU3ltYm9sLCBuYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIW1vZHVsZSkge1xuICAgICAgLy8gSWYgbm8gbWV0YWRhdGEgaXMgZm91bmQgZm9yIHRoaXMgaW1wb3J0IHRoZW4gaXQgaXMgY29uc2lkZXJlZCBleHRlcm5hbCB0byB0aGVcbiAgICAgIC8vIGxpYnJhcnkgYW5kIHNob3VsZCBiZSByZWNvcmRlZCBhcyBhIHJlLWV4cG9ydCBpbiB0aGUgZmluYWwgbWV0YWRhdGEgaWYgaXQgaXNcbiAgICAgIC8vIGV2ZW50dWFsbHkgcmUtZXhwb3J0ZWQuXG4gICAgICBjb25zdCBzeW1ib2wgPSB0aGlzLnN5bWJvbE9mKG1vZHVsZU5hbWUsICcqJyk7XG4gICAgICBzeW1ib2wucmVleHBvcnQgPSB0cnVlO1xuICAgICAgcmVzdWx0LnB1c2goc3ltYm9sKTtcbiAgICB9XG4gICAgdGhpcy5leHBvcnRzLnNldChtb2R1bGVOYW1lLCByZXN1bHQpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaWxsIGluIHRoZSBjYW5vbmljYWxTeW1ib2wgd2hpY2ggaXMgdGhlIHN5bWJvbCB0aGF0IHNob3VsZCBiZSBpbXBvcnRlZCBieSBmYWN0b3JpZXMuXG4gICAqIFRoZSBjYW5vbmljYWwgc3ltYm9sIGlzIHRoZSBvbmUgZXhwb3J0ZWQgYnkgdGhlIGluZGV4IGZpbGUgZm9yIHRoZSBidW5kbGUgb3IgZGVmaW5pdGlvblxuICAgKiBzeW1ib2wgZm9yIHByaXZhdGUgc3ltYm9scyB0aGF0IGFyZSBub3QgZXhwb3J0ZWQgYnkgYnVuZGxlIGluZGV4LlxuICAgKi9cbiAgcHJpdmF0ZSBjYW5vbmljYWxpemVTeW1ib2xzKGV4cG9ydGVkU3ltYm9sczogU3ltYm9sW10pIHtcbiAgICBjb25zdCBzeW1ib2xzID0gQXJyYXkuZnJvbSh0aGlzLnN5bWJvbE1hcC52YWx1ZXMoKSk7XG4gICAgdGhpcy5leHBvcnRlZCA9IG5ldyBTZXQoZXhwb3J0ZWRTeW1ib2xzKTtcbiAgICBzeW1ib2xzLmZvckVhY2godGhpcy5jYW5vbmljYWxpemVTeW1ib2wsIHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBjYW5vbmljYWxpemVTeW1ib2woc3ltYm9sOiBTeW1ib2wpIHtcbiAgICBjb25zdCByb290RXhwb3J0ID0gZ2V0Um9vdEV4cG9ydChzeW1ib2wpO1xuICAgIGNvbnN0IGRlY2xhcmF0aW9uID0gZ2V0U3ltYm9sRGVjbGFyYXRpb24oc3ltYm9sKTtcbiAgICBjb25zdCBpc1ByaXZhdGUgPSAhdGhpcy5leHBvcnRlZC5oYXMocm9vdEV4cG9ydCk7XG4gICAgY29uc3QgY2Fub25pY2FsU3ltYm9sID0gaXNQcml2YXRlID8gZGVjbGFyYXRpb24gOiByb290RXhwb3J0O1xuICAgIHN5bWJvbC5pc1ByaXZhdGUgPSBpc1ByaXZhdGU7XG4gICAgc3ltYm9sLmRlY2xhcmF0aW9uID0gZGVjbGFyYXRpb247XG4gICAgc3ltYm9sLmNhbm9uaWNhbFN5bWJvbCA9IGNhbm9uaWNhbFN5bWJvbDtcbiAgICBzeW1ib2wucmVleHBvcnQgPSBkZWNsYXJhdGlvbi5yZWV4cG9ydDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RW50cmllcyhleHBvcnRlZFN5bWJvbHM6IFN5bWJvbFtdKTogQnVuZGxlRW50cmllcyB7XG4gICAgY29uc3QgcmVzdWx0OiBCdW5kbGVFbnRyaWVzID0ge307XG5cbiAgICBjb25zdCBleHBvcnRlZE5hbWVzID0gbmV3IFNldChleHBvcnRlZFN5bWJvbHMubWFwKHMgPT4gcy5uYW1lKSk7XG4gICAgbGV0IHByaXZhdGVOYW1lID0gMDtcblxuICAgIGZ1bmN0aW9uIG5ld1ByaXZhdGVOYW1lKHByZWZpeDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGxldCBkaWdpdHM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGxldCBpbmRleCA9IHByaXZhdGVOYW1lKys7XG4gICAgICAgIGxldCBiYXNlID0gUFJJVkFURV9OQU1FX0NIQVJTO1xuICAgICAgICB3aGlsZSAoIWRpZ2l0cy5sZW5ndGggfHwgaW5kZXggPiAwKSB7XG4gICAgICAgICAgZGlnaXRzLnVuc2hpZnQoYmFzZVtpbmRleCAlIGJhc2UubGVuZ3RoXSk7XG4gICAgICAgICAgaW5kZXggPSBNYXRoLmZsb29yKGluZGV4IC8gYmFzZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGBcXHUwMjc1JHtwcmVmaXh9JHtkaWdpdHMuam9pbignJyl9YDtcbiAgICAgICAgaWYgKCFleHBvcnRlZE5hbWVzLmhhcyhyZXN1bHQpKSByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydGVkU3ltYm9scy5mb3JFYWNoKHN5bWJvbCA9PiB0aGlzLmNvbnZlcnRTeW1ib2woc3ltYm9sKSk7XG5cbiAgICBjb25zdCBzeW1ib2xzTWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZ1tdPigpO1xuICAgIEFycmF5LmZyb20odGhpcy5zeW1ib2xNYXAudmFsdWVzKCkpLmZvckVhY2goc3ltYm9sID0+IHtcbiAgICAgIGlmIChzeW1ib2wucmVmZXJlbmNlZCAmJiAhc3ltYm9sLnJlZXhwb3J0KSB7XG4gICAgICAgIGxldCBuYW1lID0gc3ltYm9sLm5hbWU7XG4gICAgICAgIGNvbnN0IGlkZW50aWZpZXIgPSBgJHtzeW1ib2wuZGVjbGFyYXRpb24hLm1vZHVsZX06JHtzeW1ib2wuZGVjbGFyYXRpb24gIS5uYW1lfWA7XG4gICAgICAgIGlmIChzeW1ib2wuaXNQcml2YXRlICYmICFzeW1ib2wucHJpdmF0ZU5hbWUpIHtcbiAgICAgICAgICBuYW1lID0gbmV3UHJpdmF0ZU5hbWUodGhpcy5wcml2YXRlU3ltYm9sUHJlZml4KTtcbiAgICAgICAgICBzeW1ib2wucHJpdmF0ZU5hbWUgPSBuYW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzeW1ib2xzTWFwLmhhcyhpZGVudGlmaWVyKSkge1xuICAgICAgICAgIGNvbnN0IG5hbWVzID0gc3ltYm9sc01hcC5nZXQoaWRlbnRpZmllcik7XG4gICAgICAgICAgbmFtZXMgIS5wdXNoKG5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN5bWJvbHNNYXAuc2V0KGlkZW50aWZpZXIsIFtuYW1lXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0W25hbWVdID0gc3ltYm9sLnZhbHVlICE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBjaGVjayBmb3IgZHVwbGljYXRlZCBlbnRyaWVzXG4gICAgc3ltYm9sc01hcC5mb3JFYWNoKChuYW1lczogc3RyaW5nW10sIGlkZW50aWZpZXI6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKG5hbWVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgY29uc3QgW21vZHVsZSwgZGVjbGFyZWROYW1lXSA9IGlkZW50aWZpZXIuc3BsaXQoJzonKTtcbiAgICAgICAgLy8gcHJlZmVyIHRoZSBleHBvcnQgdGhhdCB1c2VzIHRoZSBkZWNsYXJlZCBuYW1lIChpZiBhbnkpXG4gICAgICAgIGxldCByZWZlcmVuY2UgPSBuYW1lcy5pbmRleE9mKGRlY2xhcmVkTmFtZSk7XG4gICAgICAgIGlmIChyZWZlcmVuY2UgPT09IC0xKSB7XG4gICAgICAgICAgcmVmZXJlbmNlID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGtlZXAgb25lIGVudHJ5IGFuZCByZXBsYWNlIHRoZSBvdGhlcnMgYnkgcmVmZXJlbmNlc1xuICAgICAgICBuYW1lcy5mb3JFYWNoKChuYW1lOiBzdHJpbmcsIGk6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGlmIChpICE9PSByZWZlcmVuY2UpIHtcbiAgICAgICAgICAgIHJlc3VsdFtuYW1lXSA9IHtfX3N5bWJvbGljOiAncmVmZXJlbmNlJywgbmFtZTogbmFtZXNbcmVmZXJlbmNlXX07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIGdldFJlRXhwb3J0cyhleHBvcnRlZFN5bWJvbHM6IFN5bWJvbFtdKTogTW9kdWxlRXhwb3J0TWV0YWRhdGFbXSB7XG4gICAgdHlwZSBFeHBvcnRDbGF1c2UgPSB7bmFtZTogc3RyaW5nLCBhczogc3RyaW5nfVtdO1xuICAgIGNvbnN0IG1vZHVsZXMgPSBuZXcgTWFwPHN0cmluZywgRXhwb3J0Q2xhdXNlPigpO1xuICAgIGNvbnN0IGV4cG9ydEFsbHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICBmb3IgKGNvbnN0IHN5bWJvbCBvZiBleHBvcnRlZFN5bWJvbHMpIHtcbiAgICAgIGlmIChzeW1ib2wucmVleHBvcnQpIHtcbiAgICAgICAgLy8gc3ltYm9sLmRlY2xhcmF0aW9uIGlzIGd1YXJhbnRlZWQgdG8gYmUgZGVmaW5lZCBkdXJpbmcgdGhlIHBoYXNlIHRoaXMgbWV0aG9kIGlzIGNhbGxlZC5cbiAgICAgICAgY29uc3QgZGVjbGFyYXRpb24gPSBzeW1ib2wuZGVjbGFyYXRpb24gITtcbiAgICAgICAgY29uc3QgbW9kdWxlID0gZGVjbGFyYXRpb24ubW9kdWxlO1xuICAgICAgICBpZiAoZGVjbGFyYXRpb24gIS5uYW1lID09ICcqJykge1xuICAgICAgICAgIC8vIFJlZXhwb3J0IGFsbCB0aGUgc3ltYm9scy5cbiAgICAgICAgICBleHBvcnRBbGxzLmFkZChkZWNsYXJhdGlvbi5tb2R1bGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFJlLWV4cG9ydCB0aGUgc3ltYm9sIGFzIHRoZSBleHBvcnRlZCBuYW1lLlxuICAgICAgICAgIGxldCBlbnRyeSA9IG1vZHVsZXMuZ2V0KG1vZHVsZSk7XG4gICAgICAgICAgaWYgKCFlbnRyeSkge1xuICAgICAgICAgICAgZW50cnkgPSBbXTtcbiAgICAgICAgICAgIG1vZHVsZXMuc2V0KG1vZHVsZSwgZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBhcyA9IHN5bWJvbC5uYW1lO1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBkZWNsYXJhdGlvbi5uYW1lO1xuICAgICAgICAgIGVudHJ5LnB1c2goe25hbWUsIGFzfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtcbiAgICAgIC4uLkFycmF5LmZyb20oZXhwb3J0QWxscy52YWx1ZXMoKSkubWFwKGZyb20gPT4gKHtmcm9tfSkpLFxuICAgICAgLi4uQXJyYXkuZnJvbShtb2R1bGVzLmVudHJpZXMoKSkubWFwKChbZnJvbSwgZXhwb3J0c10pID0+ICh7ZXhwb3J0OiBleHBvcnRzLCBmcm9tfSkpXG4gICAgXTtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydFN5bWJvbChzeW1ib2w6IFN5bWJvbCkge1xuICAgIC8vIGNhbm9uaWNhbFN5bWJvbCBpcyBlbnN1cmVkIHRvIGJlIGRlZmluZWQgYmVmb3JlIHRoaXMgaXMgY2FsbGVkLlxuICAgIGNvbnN0IGNhbm9uaWNhbFN5bWJvbCA9IHN5bWJvbC5jYW5vbmljYWxTeW1ib2wgITtcblxuICAgIGlmICghY2Fub25pY2FsU3ltYm9sLnJlZmVyZW5jZWQpIHtcbiAgICAgIGNhbm9uaWNhbFN5bWJvbC5yZWZlcmVuY2VkID0gdHJ1ZTtcbiAgICAgIC8vIGRlY2xhcmF0aW9uIGlzIGVuc3VyZWQgdG8gYmUgZGVmaW5kZWQgYmVmb3JlIHRoaXMgbWV0aG9kIGlzIGNhbGxlZC5cbiAgICAgIGNvbnN0IGRlY2xhcmF0aW9uID0gY2Fub25pY2FsU3ltYm9sLmRlY2xhcmF0aW9uICE7XG4gICAgICBjb25zdCBtb2R1bGUgPSB0aGlzLmdldE1ldGFkYXRhKGRlY2xhcmF0aW9uLm1vZHVsZSk7XG4gICAgICBpZiAobW9kdWxlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gbW9kdWxlLm1ldGFkYXRhW2RlY2xhcmF0aW9uLm5hbWVdO1xuICAgICAgICBpZiAodmFsdWUgJiYgIWRlY2xhcmF0aW9uLm5hbWUuc3RhcnRzV2l0aCgnX19fJykpIHtcbiAgICAgICAgICBjYW5vbmljYWxTeW1ib2wudmFsdWUgPSB0aGlzLmNvbnZlcnRFbnRyeShkZWNsYXJhdGlvbi5tb2R1bGUsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY29udmVydEVudHJ5KG1vZHVsZU5hbWU6IHN0cmluZywgdmFsdWU6IE1ldGFkYXRhRW50cnkpOiBNZXRhZGF0YUVudHJ5IHtcbiAgICBpZiAoaXNDbGFzc01ldGFkYXRhKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29udmVydENsYXNzKG1vZHVsZU5hbWUsIHZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGlzRnVuY3Rpb25NZXRhZGF0YSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRGdW5jdGlvbihtb2R1bGVOYW1lLCB2YWx1ZSk7XG4gICAgfVxuICAgIGlmIChpc0ludGVyZmFjZU1ldGFkYXRhKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb252ZXJ0VmFsdWUobW9kdWxlTmFtZSwgdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0Q2xhc3MobW9kdWxlTmFtZTogc3RyaW5nLCB2YWx1ZTogQ2xhc3NNZXRhZGF0YSk6IENsYXNzTWV0YWRhdGEge1xuICAgIHJldHVybiB7XG4gICAgICBfX3N5bWJvbGljOiAnY2xhc3MnLFxuICAgICAgYXJpdHk6IHZhbHVlLmFyaXR5LFxuICAgICAgZXh0ZW5kczogdGhpcy5jb252ZXJ0RXhwcmVzc2lvbihtb2R1bGVOYW1lLCB2YWx1ZS5leHRlbmRzKSAhLFxuICAgICAgZGVjb3JhdG9yczpcbiAgICAgICAgICB2YWx1ZS5kZWNvcmF0b3JzICYmIHZhbHVlLmRlY29yYXRvcnMubWFwKGQgPT4gdGhpcy5jb252ZXJ0RXhwcmVzc2lvbihtb2R1bGVOYW1lLCBkKSAhKSxcbiAgICAgIG1lbWJlcnM6IHRoaXMuY29udmVydE1lbWJlcnMobW9kdWxlTmFtZSwgdmFsdWUubWVtYmVycyAhKSxcbiAgICAgIHN0YXRpY3M6IHZhbHVlLnN0YXRpY3MgJiYgdGhpcy5jb252ZXJ0U3RhdGljcyhtb2R1bGVOYW1lLCB2YWx1ZS5zdGF0aWNzKVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRNZW1iZXJzKG1vZHVsZU5hbWU6IHN0cmluZywgbWVtYmVyczogTWV0YWRhdGFNYXApOiBNZXRhZGF0YU1hcCB7XG4gICAgY29uc3QgcmVzdWx0OiBNZXRhZGF0YU1hcCA9IHt9O1xuICAgIGZvciAoY29uc3QgbmFtZSBpbiBtZW1iZXJzKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG1lbWJlcnNbbmFtZV07XG4gICAgICByZXN1bHRbbmFtZV0gPSB2YWx1ZS5tYXAodiA9PiB0aGlzLmNvbnZlcnRNZW1iZXIobW9kdWxlTmFtZSwgdikpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0TWVtYmVyKG1vZHVsZU5hbWU6IHN0cmluZywgbWVtYmVyOiBNZW1iZXJNZXRhZGF0YSkge1xuICAgIGNvbnN0IHJlc3VsdDogTWVtYmVyTWV0YWRhdGEgPSB7X19zeW1ib2xpYzogbWVtYmVyLl9fc3ltYm9saWN9O1xuICAgIHJlc3VsdC5kZWNvcmF0b3JzID1cbiAgICAgICAgbWVtYmVyLmRlY29yYXRvcnMgJiYgbWVtYmVyLmRlY29yYXRvcnMubWFwKGQgPT4gdGhpcy5jb252ZXJ0RXhwcmVzc2lvbihtb2R1bGVOYW1lLCBkKSAhKTtcbiAgICBpZiAoaXNNZXRob2RNZXRhZGF0YShtZW1iZXIpKSB7XG4gICAgICAocmVzdWx0IGFzIE1ldGhvZE1ldGFkYXRhKS5wYXJhbWV0ZXJEZWNvcmF0b3JzID0gbWVtYmVyLnBhcmFtZXRlckRlY29yYXRvcnMgJiZcbiAgICAgICAgICBtZW1iZXIucGFyYW1ldGVyRGVjb3JhdG9ycy5tYXAoXG4gICAgICAgICAgICAgIGQgPT4gZCAmJiBkLm1hcChwID0+IHRoaXMuY29udmVydEV4cHJlc3Npb24obW9kdWxlTmFtZSwgcCkgISkpO1xuICAgICAgaWYgKGlzQ29uc3RydWN0b3JNZXRhZGF0YShtZW1iZXIpKSB7XG4gICAgICAgIGlmIChtZW1iZXIucGFyYW1ldGVycykge1xuICAgICAgICAgIChyZXN1bHQgYXMgQ29uc3RydWN0b3JNZXRhZGF0YSkucGFyYW1ldGVycyA9XG4gICAgICAgICAgICAgIG1lbWJlci5wYXJhbWV0ZXJzLm1hcChwID0+IHRoaXMuY29udmVydEV4cHJlc3Npb24obW9kdWxlTmFtZSwgcCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRTdGF0aWNzKG1vZHVsZU5hbWU6IHN0cmluZywgc3RhdGljczogU3RhdGljc01ldGFkYXRhKTogU3RhdGljc01ldGFkYXRhIHtcbiAgICBsZXQgcmVzdWx0OiBTdGF0aWNzTWV0YWRhdGEgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzdGF0aWNzKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHN0YXRpY3Nba2V5XTtcblxuICAgICAgaWYgKGlzRnVuY3Rpb25NZXRhZGF0YSh2YWx1ZSkpIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzLmNvbnZlcnRGdW5jdGlvbihtb2R1bGVOYW1lLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGlzTWV0YWRhdGFTeW1ib2xpY0NhbGxFeHByZXNzaW9uKHZhbHVlKSkge1xuICAgICAgICAvLyBDbGFzcyBtZW1iZXJzIGNhbiBhbHNvIGNvbnRhaW4gc3RhdGljIG1lbWJlcnMgdGhhdCBjYWxsIGEgZnVuY3Rpb24gd2l0aCBtb2R1bGVcbiAgICAgICAgLy8gcmVmZXJlbmNlcy4gZS5nLiBcInN0YXRpYyBuZ0luamVjdGFibGVEZWYgPSBkZWZpbmVJbmplY3RhYmxlKC4uKVwiLiBXZSBhbHNvIG5lZWQgdG9cbiAgICAgICAgLy8gY29udmVydCB0aGVzZSBtb2R1bGUgcmVmZXJlbmNlcyBiZWNhdXNlIG90aGVyd2lzZSB0aGVzZSByZXNvbHZlIHRvIG5vbi1leGlzdGVudCBmaWxlcy5cbiAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzLmNvbnZlcnRWYWx1ZShtb2R1bGVOYW1lLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0RnVuY3Rpb24obW9kdWxlTmFtZTogc3RyaW5nLCB2YWx1ZTogRnVuY3Rpb25NZXRhZGF0YSk6IEZ1bmN0aW9uTWV0YWRhdGEge1xuICAgIHJldHVybiB7XG4gICAgICBfX3N5bWJvbGljOiAnZnVuY3Rpb24nLFxuICAgICAgcGFyYW1ldGVyczogdmFsdWUucGFyYW1ldGVycyxcbiAgICAgIGRlZmF1bHRzOiB2YWx1ZS5kZWZhdWx0cyAmJiB2YWx1ZS5kZWZhdWx0cy5tYXAodiA9PiB0aGlzLmNvbnZlcnRWYWx1ZShtb2R1bGVOYW1lLCB2KSksXG4gICAgICB2YWx1ZTogdGhpcy5jb252ZXJ0VmFsdWUobW9kdWxlTmFtZSwgdmFsdWUudmFsdWUpXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydFZhbHVlKG1vZHVsZU5hbWU6IHN0cmluZywgdmFsdWU6IE1ldGFkYXRhVmFsdWUpOiBNZXRhZGF0YVZhbHVlIHtcbiAgICBpZiAoaXNQcmltaXRpdmUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGlmIChpc01ldGFkYXRhRXJyb3IodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb252ZXJ0RXJyb3IobW9kdWxlTmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgICBpZiAoaXNNZXRhZGF0YVN5bWJvbGljRXhwcmVzc2lvbih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRFeHByZXNzaW9uKG1vZHVsZU5hbWUsIHZhbHVlKSAhO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5tYXAodiA9PiB0aGlzLmNvbnZlcnRWYWx1ZShtb2R1bGVOYW1lLCB2KSk7XG4gICAgfVxuXG4gICAgLy8gT3RoZXJ3aXNlIGl0IGlzIGEgbWV0YWRhdGEgb2JqZWN0LlxuICAgIGNvbnN0IG9iamVjdCA9IHZhbHVlIGFzIE1ldGFkYXRhT2JqZWN0O1xuICAgIGNvbnN0IHJlc3VsdDogTWV0YWRhdGFPYmplY3QgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmplY3QpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdGhpcy5jb252ZXJ0VmFsdWUobW9kdWxlTmFtZSwgb2JqZWN0W2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0RXhwcmVzc2lvbihcbiAgICAgIG1vZHVsZU5hbWU6IHN0cmluZywgdmFsdWU6IE1ldGFkYXRhU3ltYm9saWNFeHByZXNzaW9ufE1ldGFkYXRhRXJyb3J8bnVsbHxcbiAgICAgIHVuZGVmaW5lZCk6IE1ldGFkYXRhU3ltYm9saWNFeHByZXNzaW9ufE1ldGFkYXRhRXJyb3J8dW5kZWZpbmVkfG51bGwge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgc3dpdGNoICh2YWx1ZS5fX3N5bWJvbGljKSB7XG4gICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJ0RXJyb3IobW9kdWxlTmFtZSwgdmFsdWUgYXMgTWV0YWRhdGFFcnJvcik7XG4gICAgICAgIGNhc2UgJ3JlZmVyZW5jZSc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY29udmVydFJlZmVyZW5jZShtb2R1bGVOYW1lLCB2YWx1ZSBhcyBNZXRhZGF0YVN5bWJvbGljUmVmZXJlbmNlRXhwcmVzc2lvbik7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY29udmVydEV4cHJlc3Npb25Ob2RlKG1vZHVsZU5hbWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0RXJyb3IobW9kdWxlOiBzdHJpbmcsIHZhbHVlOiBNZXRhZGF0YUVycm9yKTogTWV0YWRhdGFFcnJvciB7XG4gICAgcmV0dXJuIHtcbiAgICAgIF9fc3ltYm9saWM6ICdlcnJvcicsXG4gICAgICBtZXNzYWdlOiB2YWx1ZS5tZXNzYWdlLFxuICAgICAgbGluZTogdmFsdWUubGluZSxcbiAgICAgIGNoYXJhY3RlcjogdmFsdWUuY2hhcmFjdGVyLFxuICAgICAgY29udGV4dDogdmFsdWUuY29udGV4dCwgbW9kdWxlXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydFJlZmVyZW5jZShtb2R1bGVOYW1lOiBzdHJpbmcsIHZhbHVlOiBNZXRhZGF0YVN5bWJvbGljUmVmZXJlbmNlRXhwcmVzc2lvbik6XG4gICAgICBNZXRhZGF0YVN5bWJvbGljUmVmZXJlbmNlRXhwcmVzc2lvbnxNZXRhZGF0YUVycm9yfHVuZGVmaW5lZCB7XG4gICAgY29uc3QgY3JlYXRlUmVmZXJlbmNlID0gKHN5bWJvbDogU3ltYm9sKTogTWV0YWRhdGFTeW1ib2xpY1JlZmVyZW5jZUV4cHJlc3Npb24gPT4ge1xuICAgICAgY29uc3QgZGVjbGFyYXRpb24gPSBzeW1ib2wuZGVjbGFyYXRpb24gITtcbiAgICAgIGlmIChkZWNsYXJhdGlvbi5tb2R1bGUuc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgICAgIC8vIFJlZmVyZW5jZSB0byBhIHN5bWJvbCBkZWZpbmVkIGluIHRoZSBtb2R1bGUuIEVuc3VyZSBpdCBpcyBjb252ZXJ0ZWQgdGhlbiByZXR1cm4gYVxuICAgICAgICAvLyByZWZlcmVuY2VzIHRvIHRoZSBmaW5hbCBzeW1ib2wuXG4gICAgICAgIHRoaXMuY29udmVydFN5bWJvbChzeW1ib2wpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIF9fc3ltYm9saWM6ICdyZWZlcmVuY2UnLFxuICAgICAgICAgIGdldCBuYW1lKCkge1xuICAgICAgICAgICAgLy8gUmVzb2x2ZWQgbGF6aWx5IGJlY2F1c2UgcHJpdmF0ZSBuYW1lcyBhcmUgYXNzaWduZWQgbGF0ZS5cbiAgICAgICAgICAgIGNvbnN0IGNhbm9uaWNhbFN5bWJvbCA9IHN5bWJvbC5jYW5vbmljYWxTeW1ib2wgITtcbiAgICAgICAgICAgIGlmIChjYW5vbmljYWxTeW1ib2wuaXNQcml2YXRlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgc3RhdGU6IGlzUHJpdmF0ZSB3YXMgbm90IGluaXRpYWxpemVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY2Fub25pY2FsU3ltYm9sLmlzUHJpdmF0ZSA/IGNhbm9uaWNhbFN5bWJvbC5wcml2YXRlTmFtZSAhIDogY2Fub25pY2FsU3ltYm9sLm5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGhlIHN5bWJvbCB3YXMgYSByZS1leHBvcnRlZCBzeW1ib2wgZnJvbSBhbm90aGVyIG1vZHVsZS4gUmV0dXJuIGEgcmVmZXJlbmNlIHRvIHRoZVxuICAgICAgICAvLyBvcmlnaW5hbCBpbXBvcnRlZCBzeW1ib2wuXG4gICAgICAgIHJldHVybiB7X19zeW1ib2xpYzogJ3JlZmVyZW5jZScsIG5hbWU6IGRlY2xhcmF0aW9uLm5hbWUsIG1vZHVsZTogZGVjbGFyYXRpb24ubW9kdWxlfTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKGlzTWV0YWRhdGFHbG9iYWxSZWZlcmVuY2VFeHByZXNzaW9uKHZhbHVlKSkge1xuICAgICAgY29uc3QgbWV0YWRhdGEgPSB0aGlzLmdldE1ldGFkYXRhKG1vZHVsZU5hbWUpO1xuICAgICAgaWYgKG1ldGFkYXRhICYmIG1ldGFkYXRhLm1ldGFkYXRhICYmIG1ldGFkYXRhLm1ldGFkYXRhW3ZhbHVlLm5hbWVdKSB7XG4gICAgICAgIC8vIFJlZmVyZW5jZSB0byBhIHN5bWJvbCBkZWZpbmVkIGluIHRoZSBtb2R1bGVcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVJlZmVyZW5jZSh0aGlzLmNhbm9uaWNhbFN5bWJvbE9mKG1vZHVsZU5hbWUsIHZhbHVlLm5hbWUpKTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgYSByZWZlcmVuY2UgaGFzIGFyZ3VtZW50cywgdGhlIGFyZ3VtZW50cyBuZWVkIHRvIGJlIGNvbnZlcnRlZC5cbiAgICAgIGlmICh2YWx1ZS5hcmd1bWVudHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBfX3N5bWJvbGljOiAncmVmZXJlbmNlJyxcbiAgICAgICAgICBuYW1lOiB2YWx1ZS5uYW1lLFxuICAgICAgICAgIGFyZ3VtZW50czogdmFsdWUuYXJndW1lbnRzLm1hcChhID0+IHRoaXMuY29udmVydFZhbHVlKG1vZHVsZU5hbWUsIGEpKVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICAvLyBHbG9iYWwgcmVmZXJlbmNlcyB3aXRob3V0IGFyZ3VtZW50cyAoc3VjaCBhcyB0byBNYXRoIG9yIEpTT04pIGFyZSB1bm1vZGlmaWVkLlxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGlmIChpc01ldGFkYXRhSW1wb3J0ZWRTeW1ib2xSZWZlcmVuY2VFeHByZXNzaW9uKHZhbHVlKSkge1xuICAgICAgLy8gUmVmZXJlbmNlcyB0byBpbXBvcnRlZCBzeW1ib2xzIGFyZSBzZXBhcmF0ZWQgaW50byB0d28sIHJlZmVyZW5jZXMgdG8gYnVuZGxlZCBtb2R1bGVzIGFuZFxuICAgICAgLy8gcmVmZXJlbmNlcyB0byBtb2R1bGVzIGV4dGVybmFsIHRvIHRoZSBidW5kbGUuIElmIHRoZSBtb2R1bGUgcmVmZXJlbmNlIGlzIHJlbGF0aXZlIGl0IGlzXG4gICAgICAvLyBhc3N1bWVkIHRvIGJlIGluIHRoZSBidW5kbGUuIElmIGl0IGlzIEdsb2JhbCBpdCBpcyBhc3N1bWVkIHRvIGJlIG91dHNpZGUgdGhlIGJ1bmRsZS5cbiAgICAgIC8vIFJlZmVyZW5jZXMgdG8gc3ltYm9scyBvdXRzaWRlIHRoZSBidW5kbGUgYXJlIGxlZnQgdW5tb2RpZmllZC4gUmVmZXJlbmNlcyB0byBzeW1ib2wgaW5zaWRlXG4gICAgICAvLyB0aGUgYnVuZGxlIG5lZWQgdG8gYmUgY29udmVydGVkIHRvIGEgYnVuZGxlIGltcG9ydCByZWZlcmVuY2UgcmVhY2hhYmxlIGZyb20gdGhlIGJ1bmRsZVxuICAgICAgLy8gaW5kZXguXG5cbiAgICAgIGlmICh2YWx1ZS5tb2R1bGUuc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgICAgIC8vIFJlZmVyZW5jZSBpcyB0byBhIHN5bWJvbCBkZWZpbmVkIGluc2lkZSB0aGUgbW9kdWxlLiBDb252ZXJ0IHRoZSByZWZlcmVuY2UgdG8gYSByZWZlcmVuY2VcbiAgICAgICAgLy8gdG8gdGhlIGNhbm9uaWNhbCBzeW1ib2wuXG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZWRNb2R1bGUgPSByZXNvbHZlTW9kdWxlKHZhbHVlLm1vZHVsZSwgbW9kdWxlTmFtZSk7XG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZWROYW1lID0gdmFsdWUubmFtZTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVJlZmVyZW5jZSh0aGlzLmNhbm9uaWNhbFN5bWJvbE9mKHJlZmVyZW5jZWRNb2R1bGUsIHJlZmVyZW5jZWROYW1lKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFZhbHVlIGlzIGEgcmVmZXJlbmNlIHRvIGEgc3ltYm9sIGRlZmluZWQgb3V0c2lkZSB0aGUgbW9kdWxlLlxuICAgICAgaWYgKHZhbHVlLmFyZ3VtZW50cykge1xuICAgICAgICAvLyBJZiBhIHJlZmVyZW5jZSBoYXMgYXJndW1lbnRzIHRoZSBhcmd1bWVudHMgbmVlZCB0byBiZSBjb252ZXJ0ZWQuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgX19zeW1ib2xpYzogJ3JlZmVyZW5jZScsXG4gICAgICAgICAgbmFtZTogdmFsdWUubmFtZSxcbiAgICAgICAgICBtb2R1bGU6IHZhbHVlLm1vZHVsZSxcbiAgICAgICAgICBhcmd1bWVudHM6IHZhbHVlLmFyZ3VtZW50cy5tYXAoYSA9PiB0aGlzLmNvbnZlcnRWYWx1ZShtb2R1bGVOYW1lLCBhKSlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoaXNNZXRhZGF0YU1vZHVsZVJlZmVyZW5jZUV4cHJlc3Npb24odmFsdWUpKSB7XG4gICAgICAvLyBDYW5ub3Qgc3VwcG9ydCByZWZlcmVuY2VzIHRvIGJ1bmRsZWQgbW9kdWxlcyBhcyB0aGUgaW50ZXJuYWwgbW9kdWxlcyBvZiBhIGJ1bmRsZSBhcmUgZXJhc2VkXG4gICAgICAvLyBieSB0aGUgYnVuZGxlci5cbiAgICAgIGlmICh2YWx1ZS5tb2R1bGUuc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgX19zeW1ib2xpYzogJ2Vycm9yJyxcbiAgICAgICAgICBtZXNzYWdlOiAnVW5zdXBwb3J0ZWQgYnVuZGxlZCBtb2R1bGUgcmVmZXJlbmNlJyxcbiAgICAgICAgICBjb250ZXh0OiB7bW9kdWxlOiB2YWx1ZS5tb2R1bGV9XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIC8vIFJlZmVyZW5jZXMgdG8gdW5idW5kbGVkIG1vZHVsZXMgYXJlIHVubW9kaWZpZWQuXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0RXhwcmVzc2lvbk5vZGUobW9kdWxlTmFtZTogc3RyaW5nLCB2YWx1ZTogTWV0YWRhdGFTeW1ib2xpY0V4cHJlc3Npb24pOlxuICAgICAgTWV0YWRhdGFTeW1ib2xpY0V4cHJlc3Npb24ge1xuICAgIGNvbnN0IHJlc3VsdDogTWV0YWRhdGFTeW1ib2xpY0V4cHJlc3Npb24gPSB7IF9fc3ltYm9saWM6IHZhbHVlLl9fc3ltYm9saWMgfSBhcyBhbnk7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdmFsdWUpIHtcbiAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldID0gdGhpcy5jb252ZXJ0VmFsdWUobW9kdWxlTmFtZSwgKHZhbHVlIGFzIGFueSlba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHN5bWJvbE9mKG1vZHVsZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBTeW1ib2wge1xuICAgIGNvbnN0IHN5bWJvbEtleSA9IGAke21vZHVsZX06JHtuYW1lfWA7XG4gICAgbGV0IHN5bWJvbCA9IHRoaXMuc3ltYm9sTWFwLmdldChzeW1ib2xLZXkpO1xuICAgIGlmICghc3ltYm9sKSB7XG4gICAgICBzeW1ib2wgPSB7bW9kdWxlLCBuYW1lfTtcbiAgICAgIHRoaXMuc3ltYm9sTWFwLnNldChzeW1ib2xLZXksIHN5bWJvbCk7XG4gICAgfVxuICAgIHJldHVybiBzeW1ib2w7XG4gIH1cblxuICBwcml2YXRlIGNhbm9uaWNhbFN5bWJvbE9mKG1vZHVsZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBTeW1ib2wge1xuICAgIC8vIEVuc3VyZSB0aGUgbW9kdWxlIGhhcyBiZWVuIHNlZW4uXG4gICAgdGhpcy5leHBvcnRBbGwobW9kdWxlKTtcbiAgICBjb25zdCBzeW1ib2wgPSB0aGlzLnN5bWJvbE9mKG1vZHVsZSwgbmFtZSk7XG4gICAgaWYgKCFzeW1ib2wuY2Fub25pY2FsU3ltYm9sKSB7XG4gICAgICB0aGlzLmNhbm9uaWNhbGl6ZVN5bWJvbChzeW1ib2wpO1xuICAgIH1cbiAgICByZXR1cm4gc3ltYm9sO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlckhvc3RBZGFwdGVyIGltcGxlbWVudHMgTWV0YWRhdGFCdW5kbGVySG9zdCB7XG4gIHByaXZhdGUgY29sbGVjdG9yID0gbmV3IE1ldGFkYXRhQ29sbGVjdG9yKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGhvc3Q6IHRzLkNvbXBpbGVySG9zdCwgcHJpdmF0ZSBjYWNoZTogTWV0YWRhdGFDYWNoZXxudWxsLFxuICAgICAgcHJpdmF0ZSBvcHRpb25zOiB0cy5Db21waWxlck9wdGlvbnMpIHt9XG5cbiAgZ2V0TWV0YWRhdGFGb3IoZmlsZU5hbWU6IHN0cmluZywgY29udGFpbmluZ0ZpbGU6IHN0cmluZyk6IE1vZHVsZU1ldGFkYXRhfHVuZGVmaW5lZCB7XG4gICAgY29uc3Qge3Jlc29sdmVkTW9kdWxlfSA9XG4gICAgICAgIHRzLnJlc29sdmVNb2R1bGVOYW1lKGZpbGVOYW1lLCBjb250YWluaW5nRmlsZSwgdGhpcy5vcHRpb25zLCB0aGlzLmhvc3QpO1xuXG4gICAgbGV0IHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGV8dW5kZWZpbmVkO1xuICAgIGlmIChyZXNvbHZlZE1vZHVsZSkge1xuICAgICAgbGV0IHtyZXNvbHZlZEZpbGVOYW1lfSA9IHJlc29sdmVkTW9kdWxlO1xuICAgICAgaWYgKHJlc29sdmVkTW9kdWxlLmV4dGVuc2lvbiAhPT0gJy50cycpIHtcbiAgICAgICAgcmVzb2x2ZWRGaWxlTmFtZSA9IHJlc29sdmVkRmlsZU5hbWUucmVwbGFjZSgvKFxcLmRcXC50c3xcXC5qcykkLywgJy50cycpO1xuICAgICAgfVxuICAgICAgc291cmNlRmlsZSA9IHRoaXMuaG9zdC5nZXRTb3VyY2VGaWxlKHJlc29sdmVkRmlsZU5hbWUsIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiB0eXBlc2NyaXB0IGlzIHVuYWJsZSB0byByZXNvbHZlIHRoZSBmaWxlLCBmYWxsYmFjayBvbiBvbGQgYmVoYXZpb3JcbiAgICAgIGlmICghdGhpcy5ob3N0LmZpbGVFeGlzdHMoZmlsZU5hbWUgKyAnLnRzJykpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICBzb3VyY2VGaWxlID0gdGhpcy5ob3N0LmdldFNvdXJjZUZpbGUoZmlsZU5hbWUgKyAnLnRzJywgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdCk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUgaXMgYSBtZXRhZGF0YSBjYWNoZSwgdXNlIGl0IHRvIGdldCB0aGUgbWV0YWRhdGEgZm9yIHRoaXMgc291cmNlIGZpbGUuIE90aGVyd2lzZSxcbiAgICAvLyBmYWxsIGJhY2sgb24gdGhlIGxvY2FsbHkgY3JlYXRlZCBNZXRhZGF0YUNvbGxlY3Rvci5cbiAgICBpZiAoIXNvdXJjZUZpbGUpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNhY2hlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXRNZXRhZGF0YShzb3VyY2VGaWxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY29sbGVjdG9yLmdldE1ldGFkYXRhKHNvdXJjZUZpbGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlTW9kdWxlKGltcG9ydE5hbWU6IHN0cmluZywgZnJvbTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKGltcG9ydE5hbWUuc3RhcnRzV2l0aCgnLicpICYmIGZyb20pIHtcbiAgICBsZXQgbm9ybWFsUGF0aCA9IHBhdGgubm9ybWFsaXplKHBhdGguam9pbihwYXRoLmRpcm5hbWUoZnJvbSksIGltcG9ydE5hbWUpKTtcbiAgICBpZiAoIW5vcm1hbFBhdGguc3RhcnRzV2l0aCgnLicpICYmIGZyb20uc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgICAvLyBwYXRoLm5vcm1hbGl6ZSgpIHByZXNlcnZlcyBsZWFkaW5nICcuLi8nIGJ1dCBub3QgJy4vJy4gVGhpcyBhZGRzIGl0IGJhY2suXG4gICAgICBub3JtYWxQYXRoID0gYC4ke3BhdGguc2VwfSR7bm9ybWFsUGF0aH1gO1xuICAgIH1cbiAgICAvLyBSZXBsYWNlIHdpbmRvd3MgcGF0aCBkZWxpbWl0ZXJzIHdpdGggZm9yd2FyZC1zbGFzaGVzLiBPdGhlcndpc2UgdGhlIHBhdGhzIGFyZSBub3RcbiAgICAvLyBUeXBlU2NyaXB0IGNvbXBhdGlibGUgd2hlbiBidWlsZGluZyB0aGUgYnVuZGxlLlxuICAgIHJldHVybiBub3JtYWxQYXRoLnJlcGxhY2UoL1xcXFwvZywgJy8nKTtcbiAgfVxuICByZXR1cm4gaW1wb3J0TmFtZTtcbn1cblxuZnVuY3Rpb24gaXNQcmltaXRpdmUobzogYW55KTogbyBpcyBib29sZWFufHN0cmluZ3xudW1iZXIge1xuICByZXR1cm4gbyA9PT0gbnVsbCB8fCAodHlwZW9mIG8gIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG8gIT09ICdvYmplY3QnKTtcbn1cblxuZnVuY3Rpb24gZ2V0Um9vdEV4cG9ydChzeW1ib2w6IFN5bWJvbCk6IFN5bWJvbCB7XG4gIHJldHVybiBzeW1ib2wucmVleHBvcnRlZEFzID8gZ2V0Um9vdEV4cG9ydChzeW1ib2wucmVleHBvcnRlZEFzKSA6IHN5bWJvbDtcbn1cblxuZnVuY3Rpb24gZ2V0U3ltYm9sRGVjbGFyYXRpb24oc3ltYm9sOiBTeW1ib2wpOiBTeW1ib2wge1xuICByZXR1cm4gc3ltYm9sLmV4cG9ydHMgPyBnZXRTeW1ib2xEZWNsYXJhdGlvbihzeW1ib2wuZXhwb3J0cykgOiBzeW1ib2w7XG59XG4iXX0=