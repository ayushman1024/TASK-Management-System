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
        define("@angular/compiler-cli/src/transformers/program", ["require", "exports", "tslib", "@angular/compiler", "fs", "path", "typescript", "@angular/compiler-cli/src/diagnostics/translate_diagnostics", "@angular/compiler-cli/src/diagnostics/typescript_version", "@angular/compiler-cli/src/metadata/index", "@angular/compiler-cli/src/ngtsc/program", "@angular/compiler-cli/src/transformers/api", "@angular/compiler-cli/src/transformers/compiler_host", "@angular/compiler-cli/src/transformers/inline_resources", "@angular/compiler-cli/src/transformers/lower_expressions", "@angular/compiler-cli/src/transformers/metadata_cache", "@angular/compiler-cli/src/transformers/nocollapse_hack", "@angular/compiler-cli/src/transformers/node_emitter_transform", "@angular/compiler-cli/src/transformers/r3_metadata_transform", "@angular/compiler-cli/src/transformers/r3_strip_decorators", "@angular/compiler-cli/src/transformers/r3_transform", "@angular/compiler-cli/src/transformers/tsc_pass_through", "@angular/compiler-cli/src/transformers/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var compiler_1 = require("@angular/compiler");
    var fs = require("fs");
    var path = require("path");
    var ts = require("typescript");
    var translate_diagnostics_1 = require("@angular/compiler-cli/src/diagnostics/translate_diagnostics");
    var typescript_version_1 = require("@angular/compiler-cli/src/diagnostics/typescript_version");
    var metadata_1 = require("@angular/compiler-cli/src/metadata/index");
    var program_1 = require("@angular/compiler-cli/src/ngtsc/program");
    var api_1 = require("@angular/compiler-cli/src/transformers/api");
    var compiler_host_1 = require("@angular/compiler-cli/src/transformers/compiler_host");
    var inline_resources_1 = require("@angular/compiler-cli/src/transformers/inline_resources");
    var lower_expressions_1 = require("@angular/compiler-cli/src/transformers/lower_expressions");
    var metadata_cache_1 = require("@angular/compiler-cli/src/transformers/metadata_cache");
    var nocollapse_hack_1 = require("@angular/compiler-cli/src/transformers/nocollapse_hack");
    var node_emitter_transform_1 = require("@angular/compiler-cli/src/transformers/node_emitter_transform");
    var r3_metadata_transform_1 = require("@angular/compiler-cli/src/transformers/r3_metadata_transform");
    var r3_strip_decorators_1 = require("@angular/compiler-cli/src/transformers/r3_strip_decorators");
    var r3_transform_1 = require("@angular/compiler-cli/src/transformers/r3_transform");
    var tsc_pass_through_1 = require("@angular/compiler-cli/src/transformers/tsc_pass_through");
    var util_1 = require("@angular/compiler-cli/src/transformers/util");
    /**
     * Maximum number of files that are emitable via calling ts.Program.emit
     * passing individual targetSourceFiles.
     */
    var MAX_FILE_COUNT_FOR_SINGLE_FILE_EMIT = 20;
    /**
     * Fields to lower within metadata in render2 mode.
     */
    var LOWER_FIELDS = ['useValue', 'useFactory', 'data', 'id', 'loadChildren'];
    /**
     * Fields to lower within metadata in render3 mode.
     */
    var R3_LOWER_FIELDS = tslib_1.__spread(LOWER_FIELDS, ['providers', 'imports', 'exports']);
    var R3_REIFIED_DECORATORS = [
        'Component',
        'Directive',
        'Injectable',
        'NgModule',
        'Pipe',
    ];
    var emptyModules = {
        ngModules: [],
        ngModuleByPipeOrDirective: new Map(),
        files: []
    };
    var defaultEmitCallback = function (_a) {
        var program = _a.program, targetSourceFile = _a.targetSourceFile, writeFile = _a.writeFile, cancellationToken = _a.cancellationToken, emitOnlyDtsFiles = _a.emitOnlyDtsFiles, customTransformers = _a.customTransformers;
        return program.emit(targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers);
    };
    /**
     * Minimum supported TypeScript version
     * ∀ supported typescript version v, v >= MIN_TS_VERSION
     */
    var MIN_TS_VERSION = '3.1.1';
    /**
     * Supremum of supported TypeScript versions
     * ∀ supported typescript version v, v < MAX_TS_VERSION
     * MAX_TS_VERSION is not considered as a supported TypeScript version
     */
    var MAX_TS_VERSION = '3.3.0';
    var AngularCompilerProgram = /** @class */ (function () {
        function AngularCompilerProgram(rootNames, options, host, oldProgram) {
            var _a;
            var _this = this;
            this.options = options;
            this.host = host;
            this._optionsDiagnostics = [];
            this.rootNames = tslib_1.__spread(rootNames);
            checkVersion(ts.version, MIN_TS_VERSION, MAX_TS_VERSION, options.disableTypeScriptVersionCheck);
            this.oldTsProgram = oldProgram ? oldProgram.getTsProgram() : undefined;
            if (oldProgram) {
                this.oldProgramLibrarySummaries = oldProgram.getLibrarySummaries();
                this.oldProgramEmittedGeneratedFiles = oldProgram.getEmittedGeneratedFiles();
                this.oldProgramEmittedSourceFiles = oldProgram.getEmittedSourceFiles();
            }
            if (options.flatModuleOutFile) {
                var _b = metadata_1.createBundleIndexHost(options, this.rootNames, host, function () { return _this.flatModuleMetadataCache; }), bundleHost = _b.host, indexName = _b.indexName, errors = _b.errors;
                if (errors) {
                    (_a = this._optionsDiagnostics).push.apply(_a, tslib_1.__spread(errors.map(function (e) { return ({
                        category: e.category,
                        messageText: e.messageText,
                        source: api_1.SOURCE,
                        code: api_1.DEFAULT_ERROR_CODE
                    }); })));
                }
                else {
                    this.rootNames.push(indexName);
                    this.host = bundleHost;
                }
            }
            this.loweringMetadataTransform =
                new lower_expressions_1.LowerMetadataTransform(options.enableIvy ? R3_LOWER_FIELDS : LOWER_FIELDS);
            this.metadataCache = this.createMetadataCache([this.loweringMetadataTransform]);
        }
        AngularCompilerProgram.prototype.createMetadataCache = function (transformers) {
            return new metadata_cache_1.MetadataCache(new metadata_1.MetadataCollector({ quotedNames: true }), !!this.options.strictMetadataEmit, transformers);
        };
        AngularCompilerProgram.prototype.getLibrarySummaries = function () {
            var result = new Map();
            if (this.oldProgramLibrarySummaries) {
                this.oldProgramLibrarySummaries.forEach(function (summary, fileName) { return result.set(fileName, summary); });
            }
            if (this.emittedLibrarySummaries) {
                this.emittedLibrarySummaries.forEach(function (summary, fileName) { return result.set(summary.fileName, summary); });
            }
            return result;
        };
        AngularCompilerProgram.prototype.getEmittedGeneratedFiles = function () {
            var result = new Map();
            if (this.oldProgramEmittedGeneratedFiles) {
                this.oldProgramEmittedGeneratedFiles.forEach(function (genFile, fileName) { return result.set(fileName, genFile); });
            }
            if (this.emittedGeneratedFiles) {
                this.emittedGeneratedFiles.forEach(function (genFile) { return result.set(genFile.genFileUrl, genFile); });
            }
            return result;
        };
        AngularCompilerProgram.prototype.getEmittedSourceFiles = function () {
            var result = new Map();
            if (this.oldProgramEmittedSourceFiles) {
                this.oldProgramEmittedSourceFiles.forEach(function (sf, fileName) { return result.set(fileName, sf); });
            }
            if (this.emittedSourceFiles) {
                this.emittedSourceFiles.forEach(function (sf) { return result.set(sf.fileName, sf); });
            }
            return result;
        };
        AngularCompilerProgram.prototype.getTsProgram = function () { return this.tsProgram; };
        AngularCompilerProgram.prototype.getTsOptionDiagnostics = function (cancellationToken) {
            return this.tsProgram.getOptionsDiagnostics(cancellationToken);
        };
        AngularCompilerProgram.prototype.getNgOptionDiagnostics = function (cancellationToken) {
            return tslib_1.__spread(this._optionsDiagnostics, getNgOptionDiagnostics(this.options));
        };
        AngularCompilerProgram.prototype.getTsSyntacticDiagnostics = function (sourceFile, cancellationToken) {
            return this.tsProgram.getSyntacticDiagnostics(sourceFile, cancellationToken);
        };
        AngularCompilerProgram.prototype.getNgStructuralDiagnostics = function (cancellationToken) {
            return this.structuralDiagnostics;
        };
        AngularCompilerProgram.prototype.getTsSemanticDiagnostics = function (sourceFile, cancellationToken) {
            var _this = this;
            var sourceFiles = sourceFile ? [sourceFile] : this.tsProgram.getSourceFiles();
            var diags = [];
            sourceFiles.forEach(function (sf) {
                if (!util_1.GENERATED_FILES.test(sf.fileName)) {
                    diags.push.apply(diags, tslib_1.__spread(_this.tsProgram.getSemanticDiagnostics(sf, cancellationToken)));
                }
            });
            return diags;
        };
        AngularCompilerProgram.prototype.getNgSemanticDiagnostics = function (fileName, cancellationToken) {
            var _this = this;
            var diags = [];
            this.tsProgram.getSourceFiles().forEach(function (sf) {
                if (util_1.GENERATED_FILES.test(sf.fileName) && !sf.isDeclarationFile) {
                    diags.push.apply(diags, tslib_1.__spread(_this.tsProgram.getSemanticDiagnostics(sf, cancellationToken)));
                }
            });
            var ng = translate_diagnostics_1.translateDiagnostics(this.hostAdapter, diags).ng;
            return ng;
        };
        AngularCompilerProgram.prototype.loadNgStructureAsync = function () {
            var _this = this;
            if (this._analyzedModules) {
                throw new Error('Angular structure already loaded');
            }
            return Promise.resolve()
                .then(function () {
                var _a = _this._createProgramWithBasicStubs(), tmpProgram = _a.tmpProgram, sourceFiles = _a.sourceFiles, tsFiles = _a.tsFiles, rootNames = _a.rootNames;
                return _this.compiler.loadFilesAsync(sourceFiles, tsFiles)
                    .then(function (_a) {
                    var analyzedModules = _a.analyzedModules, analyzedInjectables = _a.analyzedInjectables;
                    if (_this._analyzedModules) {
                        throw new Error('Angular structure loaded both synchronously and asynchronously');
                    }
                    _this._updateProgramWithTypeCheckStubs(tmpProgram, analyzedModules, analyzedInjectables, rootNames);
                });
            })
                .catch(function (e) { return _this._createProgramOnError(e); });
        };
        AngularCompilerProgram.prototype.listLazyRoutes = function (route) {
            // Note: Don't analyzedModules if a route is given
            // to be fast enough.
            return this.compiler.listLazyRoutes(route, route ? undefined : this.analyzedModules);
        };
        AngularCompilerProgram.prototype.emit = function (parameters) {
            if (parameters === void 0) { parameters = {}; }
            if (this.options.enableIvy === 'ngtsc' || this.options.enableIvy === 'tsc') {
                throw new Error('Cannot run legacy compiler in ngtsc mode');
            }
            return this.options.enableIvy === true ? this._emitRender3(parameters) :
                this._emitRender2(parameters);
        };
        AngularCompilerProgram.prototype._emitRender3 = function (_a) {
            var _this = this;
            var _b = _a === void 0 ? {} : _a, _c = _b.emitFlags, emitFlags = _c === void 0 ? api_1.EmitFlags.Default : _c, cancellationToken = _b.cancellationToken, customTransformers = _b.customTransformers, _d = _b.emitCallback, emitCallback = _d === void 0 ? defaultEmitCallback : _d, _e = _b.mergeEmitResultsCallback, mergeEmitResultsCallback = _e === void 0 ? mergeEmitResults : _e;
            var e_1, _f, e_2, _g;
            var emitStart = Date.now();
            if ((emitFlags & (api_1.EmitFlags.JS | api_1.EmitFlags.DTS | api_1.EmitFlags.Metadata | api_1.EmitFlags.Codegen)) ===
                0) {
                return { emitSkipped: true, diagnostics: [], emittedFiles: [] };
            }
            // analyzedModules and analyzedInjectables are created together. If one exists, so does the
            // other.
            var modules = this.compiler.emitAllPartialModules(this.analyzedModules, this._analyzedInjectables);
            var writeTsFile = function (outFileName, outData, writeByteOrderMark, onError, sourceFiles) {
                var sourceFile = sourceFiles && sourceFiles.length == 1 ? sourceFiles[0] : null;
                var genFile;
                if (_this.options.annotateForClosureCompiler && sourceFile &&
                    util_1.TS.test(sourceFile.fileName)) {
                    outData = nocollapse_hack_1.nocollapseHack(outData);
                }
                _this.writeFile(outFileName, outData, writeByteOrderMark, onError, undefined, sourceFiles);
            };
            var emitOnlyDtsFiles = (emitFlags & (api_1.EmitFlags.DTS | api_1.EmitFlags.JS)) == api_1.EmitFlags.DTS;
            var tsCustomTransformers = this.calculateTransforms(
            /* genFiles */ undefined, /* partialModules */ modules, 
            /* stripDecorators */ this.reifiedDecorators, customTransformers);
            // Restore the original references before we emit so TypeScript doesn't emit
            // a reference to the .d.ts file.
            var augmentedReferences = new Map();
            try {
                for (var _h = tslib_1.__values(this.tsProgram.getSourceFiles()), _j = _h.next(); !_j.done; _j = _h.next()) {
                    var sourceFile = _j.value;
                    var originalReferences = compiler_host_1.getOriginalReferences(sourceFile);
                    if (originalReferences) {
                        augmentedReferences.set(sourceFile, sourceFile.referencedFiles);
                        sourceFile.referencedFiles = originalReferences;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_f = _h.return)) _f.call(_h);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                return emitCallback({
                    program: this.tsProgram,
                    host: this.host,
                    options: this.options,
                    writeFile: writeTsFile, emitOnlyDtsFiles: emitOnlyDtsFiles,
                    customTransformers: tsCustomTransformers
                });
            }
            finally {
                try {
                    // Restore the references back to the augmented value to ensure that the
                    // checks that TypeScript makes for project structure reuse will succeed.
                    for (var _k = tslib_1.__values(Array.from(augmentedReferences)), _l = _k.next(); !_l.done; _l = _k.next()) {
                        var _m = tslib_1.__read(_l.value, 2), sourceFile = _m[0], references = _m[1];
                        // TODO(chuckj): Remove any cast after updating build to 2.6
                        sourceFile.referencedFiles = references;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_l && !_l.done && (_g = _k.return)) _g.call(_k);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        };
        AngularCompilerProgram.prototype._emitRender2 = function (_a) {
            var _this = this;
            var _b = _a === void 0 ? {} : _a, _c = _b.emitFlags, emitFlags = _c === void 0 ? api_1.EmitFlags.Default : _c, cancellationToken = _b.cancellationToken, customTransformers = _b.customTransformers, _d = _b.emitCallback, emitCallback = _d === void 0 ? defaultEmitCallback : _d, _e = _b.mergeEmitResultsCallback, mergeEmitResultsCallback = _e === void 0 ? mergeEmitResults : _e;
            var e_3, _f, e_4, _g;
            var emitStart = Date.now();
            if (emitFlags & api_1.EmitFlags.I18nBundle) {
                var locale = this.options.i18nOutLocale || null;
                var file = this.options.i18nOutFile || null;
                var format = this.options.i18nOutFormat || null;
                var bundle = this.compiler.emitMessageBundle(this.analyzedModules, locale);
                i18nExtract(format, file, this.host, this.options, bundle);
            }
            if ((emitFlags & (api_1.EmitFlags.JS | api_1.EmitFlags.DTS | api_1.EmitFlags.Metadata | api_1.EmitFlags.Codegen)) ===
                0) {
                return { emitSkipped: true, diagnostics: [], emittedFiles: [] };
            }
            var _h = this.generateFilesForEmit(emitFlags), genFiles = _h.genFiles, genDiags = _h.genDiags;
            if (genDiags.length) {
                return {
                    diagnostics: genDiags,
                    emitSkipped: true,
                    emittedFiles: [],
                };
            }
            this.emittedGeneratedFiles = genFiles;
            var outSrcMapping = [];
            var genFileByFileName = new Map();
            genFiles.forEach(function (genFile) { return genFileByFileName.set(genFile.genFileUrl, genFile); });
            this.emittedLibrarySummaries = [];
            var emittedSourceFiles = [];
            var writeTsFile = function (outFileName, outData, writeByteOrderMark, onError, sourceFiles) {
                var sourceFile = sourceFiles && sourceFiles.length == 1 ? sourceFiles[0] : null;
                var genFile;
                if (sourceFile) {
                    outSrcMapping.push({ outFileName: outFileName, sourceFile: sourceFile });
                    genFile = genFileByFileName.get(sourceFile.fileName);
                    if (!sourceFile.isDeclarationFile && !util_1.GENERATED_FILES.test(sourceFile.fileName)) {
                        // Note: sourceFile is the transformed sourcefile, not the original one!
                        var originalFile = _this.tsProgram.getSourceFile(sourceFile.fileName);
                        if (originalFile) {
                            emittedSourceFiles.push(originalFile);
                        }
                    }
                    if (_this.options.annotateForClosureCompiler && util_1.TS.test(sourceFile.fileName)) {
                        outData = nocollapse_hack_1.nocollapseHack(outData);
                    }
                }
                _this.writeFile(outFileName, outData, writeByteOrderMark, onError, genFile, sourceFiles);
            };
            var modules = this._analyzedInjectables &&
                this.compiler.emitAllPartialModules2(this._analyzedInjectables);
            var tsCustomTransformers = this.calculateTransforms(genFileByFileName, modules, /* stripDecorators */ undefined, customTransformers);
            var emitOnlyDtsFiles = (emitFlags & (api_1.EmitFlags.DTS | api_1.EmitFlags.JS)) == api_1.EmitFlags.DTS;
            // Restore the original references before we emit so TypeScript doesn't emit
            // a reference to the .d.ts file.
            var augmentedReferences = new Map();
            try {
                for (var _j = tslib_1.__values(this.tsProgram.getSourceFiles()), _k = _j.next(); !_k.done; _k = _j.next()) {
                    var sourceFile = _k.value;
                    var originalReferences = compiler_host_1.getOriginalReferences(sourceFile);
                    if (originalReferences) {
                        augmentedReferences.set(sourceFile, sourceFile.referencedFiles);
                        sourceFile.referencedFiles = originalReferences;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_k && !_k.done && (_f = _j.return)) _f.call(_j);
                }
                finally { if (e_3) throw e_3.error; }
            }
            var genTsFiles = [];
            var genJsonFiles = [];
            genFiles.forEach(function (gf) {
                if (gf.stmts) {
                    genTsFiles.push(gf);
                }
                if (gf.source) {
                    genJsonFiles.push(gf);
                }
            });
            var emitResult;
            var emittedUserTsCount;
            try {
                var sourceFilesToEmit = this.getSourceFilesForEmit();
                if (sourceFilesToEmit &&
                    (sourceFilesToEmit.length + genTsFiles.length) < MAX_FILE_COUNT_FOR_SINGLE_FILE_EMIT) {
                    var fileNamesToEmit = tslib_1.__spread(sourceFilesToEmit.map(function (sf) { return sf.fileName; }), genTsFiles.map(function (gf) { return gf.genFileUrl; }));
                    emitResult = mergeEmitResultsCallback(fileNamesToEmit.map(function (fileName) { return emitResult = emitCallback({
                        program: _this.tsProgram,
                        host: _this.host,
                        options: _this.options,
                        writeFile: writeTsFile, emitOnlyDtsFiles: emitOnlyDtsFiles,
                        customTransformers: tsCustomTransformers,
                        targetSourceFile: _this.tsProgram.getSourceFile(fileName),
                    }); }));
                    emittedUserTsCount = sourceFilesToEmit.length;
                }
                else {
                    emitResult = emitCallback({
                        program: this.tsProgram,
                        host: this.host,
                        options: this.options,
                        writeFile: writeTsFile, emitOnlyDtsFiles: emitOnlyDtsFiles,
                        customTransformers: tsCustomTransformers
                    });
                    emittedUserTsCount = this.tsProgram.getSourceFiles().length - genTsFiles.length;
                }
            }
            finally {
                try {
                    // Restore the references back to the augmented value to ensure that the
                    // checks that TypeScript makes for project structure reuse will succeed.
                    for (var _l = tslib_1.__values(Array.from(augmentedReferences)), _m = _l.next(); !_m.done; _m = _l.next()) {
                        var _o = tslib_1.__read(_m.value, 2), sourceFile = _o[0], references = _o[1];
                        // TODO(chuckj): Remove any cast after updating build to 2.6
                        sourceFile.referencedFiles = references;
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_m && !_m.done && (_g = _l.return)) _g.call(_l);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
            this.emittedSourceFiles = emittedSourceFiles;
            // Match behavior of tsc: only produce emit diagnostics if it would block
            // emit. If noEmitOnError is false, the emit will happen in spite of any
            // errors, so we should not report them.
            if (this.options.noEmitOnError === true) {
                // translate the diagnostics in the emitResult as well.
                var translatedEmitDiags = translate_diagnostics_1.translateDiagnostics(this.hostAdapter, emitResult.diagnostics);
                emitResult.diagnostics = translatedEmitDiags.ts.concat(this.structuralDiagnostics.concat(translatedEmitDiags.ng).map(util_1.ngToTsDiagnostic));
            }
            if (!outSrcMapping.length) {
                // if no files were emitted by TypeScript, also don't emit .json files
                emitResult.diagnostics =
                    emitResult.diagnostics.concat([util_1.createMessageDiagnostic("Emitted no files.")]);
                return emitResult;
            }
            var sampleSrcFileName;
            var sampleOutFileName;
            if (outSrcMapping.length) {
                sampleSrcFileName = outSrcMapping[0].sourceFile.fileName;
                sampleOutFileName = outSrcMapping[0].outFileName;
            }
            var srcToOutPath = createSrcToOutPathMapper(this.options.outDir, sampleSrcFileName, sampleOutFileName);
            if (emitFlags & api_1.EmitFlags.Codegen) {
                genJsonFiles.forEach(function (gf) {
                    var outFileName = srcToOutPath(gf.genFileUrl);
                    _this.writeFile(outFileName, gf.source, false, undefined, gf);
                });
            }
            var metadataJsonCount = 0;
            if (emitFlags & api_1.EmitFlags.Metadata) {
                this.tsProgram.getSourceFiles().forEach(function (sf) {
                    if (!sf.isDeclarationFile && !util_1.GENERATED_FILES.test(sf.fileName)) {
                        metadataJsonCount++;
                        var metadata = _this.metadataCache.getMetadata(sf);
                        if (metadata) {
                            var metadataText = JSON.stringify([metadata]);
                            var outFileName = srcToOutPath(sf.fileName.replace(/\.tsx?$/, '.metadata.json'));
                            _this.writeFile(outFileName, metadataText, false, undefined, undefined, [sf]);
                        }
                    }
                });
            }
            var emitEnd = Date.now();
            if (this.options.diagnostics) {
                emitResult.diagnostics = emitResult.diagnostics.concat([util_1.createMessageDiagnostic([
                        "Emitted in " + (emitEnd - emitStart) + "ms",
                        "- " + emittedUserTsCount + " user ts files",
                        "- " + genTsFiles.length + " generated ts files",
                        "- " + (genJsonFiles.length + metadataJsonCount) + " generated json files",
                    ].join('\n'))]);
            }
            return emitResult;
        };
        Object.defineProperty(AngularCompilerProgram.prototype, "compiler", {
            // Private members
            get: function () {
                if (!this._compiler) {
                    this._createCompiler();
                }
                return this._compiler;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AngularCompilerProgram.prototype, "hostAdapter", {
            get: function () {
                if (!this._hostAdapter) {
                    this._createCompiler();
                }
                return this._hostAdapter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AngularCompilerProgram.prototype, "analyzedModules", {
            get: function () {
                if (!this._analyzedModules) {
                    this.initSync();
                }
                return this._analyzedModules;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AngularCompilerProgram.prototype, "structuralDiagnostics", {
            get: function () {
                var diagnostics = this._structuralDiagnostics;
                if (!diagnostics) {
                    this.initSync();
                    diagnostics = (this._structuralDiagnostics = this._structuralDiagnostics || []);
                }
                return diagnostics;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AngularCompilerProgram.prototype, "tsProgram", {
            get: function () {
                if (!this._tsProgram) {
                    this.initSync();
                }
                return this._tsProgram;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AngularCompilerProgram.prototype, "reifiedDecorators", {
            get: function () {
                if (!this._reifiedDecorators) {
                    var reflector_1 = this.compiler.reflector;
                    this._reifiedDecorators = new Set(R3_REIFIED_DECORATORS.map(function (name) { return reflector_1.findDeclaration('@angular/core', name); }));
                }
                return this._reifiedDecorators;
            },
            enumerable: true,
            configurable: true
        });
        AngularCompilerProgram.prototype.calculateTransforms = function (genFiles, partialModules, stripDecorators, customTransformers) {
            var beforeTs = [];
            var metadataTransforms = [];
            var flatModuleMetadataTransforms = [];
            if (this.options.enableResourceInlining) {
                beforeTs.push(inline_resources_1.getInlineResourcesTransformFactory(this.tsProgram, this.hostAdapter));
                var transformer = new inline_resources_1.InlineResourcesMetadataTransformer(this.hostAdapter);
                metadataTransforms.push(transformer);
                flatModuleMetadataTransforms.push(transformer);
            }
            if (!this.options.disableExpressionLowering) {
                beforeTs.push(lower_expressions_1.getExpressionLoweringTransformFactory(this.loweringMetadataTransform, this.tsProgram));
                metadataTransforms.push(this.loweringMetadataTransform);
            }
            if (genFiles) {
                beforeTs.push(node_emitter_transform_1.getAngularEmitterTransformFactory(genFiles, this.getTsProgram()));
            }
            if (partialModules) {
                beforeTs.push(r3_transform_1.getAngularClassTransformerFactory(partialModules));
                // If we have partial modules, the cached metadata might be incorrect as it doesn't reflect
                // the partial module transforms.
                var transformer = new r3_metadata_transform_1.PartialModuleMetadataTransformer(partialModules);
                metadataTransforms.push(transformer);
                flatModuleMetadataTransforms.push(transformer);
            }
            if (stripDecorators) {
                beforeTs.push(r3_strip_decorators_1.getDecoratorStripTransformerFactory(stripDecorators, this.compiler.reflector, this.getTsProgram().getTypeChecker()));
                var transformer = new r3_strip_decorators_1.StripDecoratorsMetadataTransformer(stripDecorators, this.compiler.reflector);
                metadataTransforms.push(transformer);
                flatModuleMetadataTransforms.push(transformer);
            }
            if (customTransformers && customTransformers.beforeTs) {
                beforeTs.push.apply(beforeTs, tslib_1.__spread(customTransformers.beforeTs));
            }
            if (metadataTransforms.length > 0) {
                this.metadataCache = this.createMetadataCache(metadataTransforms);
            }
            if (flatModuleMetadataTransforms.length > 0) {
                this.flatModuleMetadataCache = this.createMetadataCache(flatModuleMetadataTransforms);
            }
            var afterTs = customTransformers ? customTransformers.afterTs : undefined;
            return { before: beforeTs, after: afterTs };
        };
        AngularCompilerProgram.prototype.initSync = function () {
            if (this._analyzedModules) {
                return;
            }
            try {
                var _a = this._createProgramWithBasicStubs(), tmpProgram = _a.tmpProgram, sourceFiles = _a.sourceFiles, tsFiles = _a.tsFiles, rootNames = _a.rootNames;
                var _b = this.compiler.loadFilesSync(sourceFiles, tsFiles), analyzedModules = _b.analyzedModules, analyzedInjectables = _b.analyzedInjectables;
                this._updateProgramWithTypeCheckStubs(tmpProgram, analyzedModules, analyzedInjectables, rootNames);
            }
            catch (e) {
                this._createProgramOnError(e);
            }
        };
        AngularCompilerProgram.prototype._createCompiler = function () {
            var _this = this;
            var codegen = {
                generateFile: function (genFileName, baseFileName) {
                    return _this._compiler.emitBasicStub(genFileName, baseFileName);
                },
                findGeneratedFileNames: function (fileName) { return _this._compiler.findGeneratedFileNames(fileName); },
            };
            this._hostAdapter = new compiler_host_1.TsCompilerAotCompilerTypeCheckHostAdapter(this.rootNames, this.options, this.host, this.metadataCache, codegen, this.oldProgramLibrarySummaries);
            var aotOptions = getAotCompilerOptions(this.options);
            var errorCollector = (this.options.collectAllErrors || this.options.fullTemplateTypeCheck) ?
                function (err) { return _this._addStructuralDiagnostics(err); } :
                undefined;
            this._compiler = compiler_1.createAotCompiler(this._hostAdapter, aotOptions, errorCollector).compiler;
        };
        AngularCompilerProgram.prototype._createProgramWithBasicStubs = function () {
            var _this = this;
            if (this._analyzedModules) {
                throw new Error("Internal Error: already initialized!");
            }
            // Note: This is important to not produce a memory leak!
            var oldTsProgram = this.oldTsProgram;
            this.oldTsProgram = undefined;
            var codegen = {
                generateFile: function (genFileName, baseFileName) {
                    return _this.compiler.emitBasicStub(genFileName, baseFileName);
                },
                findGeneratedFileNames: function (fileName) { return _this.compiler.findGeneratedFileNames(fileName); },
            };
            var rootNames = tslib_1.__spread(this.rootNames);
            if (this.options.generateCodeForLibraries !== false) {
                // if we should generateCodeForLibraries, never include
                // generated files in the program as otherwise we will
                // overwrite them and typescript will report the error
                // TS5055: Cannot write file ... because it would overwrite input file.
                rootNames = rootNames.filter(function (fn) { return !util_1.GENERATED_FILES.test(fn); });
            }
            if (this.options.noResolve) {
                this.rootNames.forEach(function (rootName) {
                    if (_this.hostAdapter.shouldGenerateFilesFor(rootName)) {
                        rootNames.push.apply(rootNames, tslib_1.__spread(_this.compiler.findGeneratedFileNames(rootName)));
                    }
                });
            }
            var tmpProgram = ts.createProgram(rootNames, this.options, this.hostAdapter, oldTsProgram);
            var sourceFiles = [];
            var tsFiles = [];
            tmpProgram.getSourceFiles().forEach(function (sf) {
                if (_this.hostAdapter.isSourceFile(sf.fileName)) {
                    sourceFiles.push(sf.fileName);
                }
                if (util_1.TS.test(sf.fileName) && !util_1.DTS.test(sf.fileName)) {
                    tsFiles.push(sf.fileName);
                }
            });
            return { tmpProgram: tmpProgram, sourceFiles: sourceFiles, tsFiles: tsFiles, rootNames: rootNames };
        };
        AngularCompilerProgram.prototype._updateProgramWithTypeCheckStubs = function (tmpProgram, analyzedModules, analyzedInjectables, rootNames) {
            var _this = this;
            this._analyzedModules = analyzedModules;
            this._analyzedInjectables = analyzedInjectables;
            tmpProgram.getSourceFiles().forEach(function (sf) {
                if (sf.fileName.endsWith('.ngfactory.ts')) {
                    var _a = _this.hostAdapter.shouldGenerateFile(sf.fileName), generate = _a.generate, baseFileName = _a.baseFileName;
                    if (generate) {
                        // Note: ! is ok as hostAdapter.shouldGenerateFile will always return a baseFileName
                        // for .ngfactory.ts files.
                        var genFile = _this.compiler.emitTypeCheckStub(sf.fileName, baseFileName);
                        if (genFile) {
                            _this.hostAdapter.updateGeneratedFile(genFile);
                        }
                    }
                }
            });
            this._tsProgram = ts.createProgram(rootNames, this.options, this.hostAdapter, tmpProgram);
            // Note: the new ts program should be completely reusable by TypeScript as:
            // - we cache all the files in the hostAdapter
            // - new new stubs use the exactly same imports/exports as the old once (we assert that in
            // hostAdapter.updateGeneratedFile).
            if (util_1.tsStructureIsReused(tmpProgram) !== 2 /* Completely */) {
                throw new Error("Internal Error: The structure of the program changed during codegen.");
            }
        };
        AngularCompilerProgram.prototype._createProgramOnError = function (e) {
            // Still fill the analyzedModules and the tsProgram
            // so that we don't cause other errors for users who e.g. want to emit the ngProgram.
            this._analyzedModules = emptyModules;
            this.oldTsProgram = undefined;
            this._hostAdapter.isSourceFile = function () { return false; };
            this._tsProgram = ts.createProgram(this.rootNames, this.options, this.hostAdapter);
            if (compiler_1.isSyntaxError(e)) {
                this._addStructuralDiagnostics(e);
                return;
            }
            throw e;
        };
        AngularCompilerProgram.prototype._addStructuralDiagnostics = function (error) {
            var diagnostics = this._structuralDiagnostics || (this._structuralDiagnostics = []);
            if (compiler_1.isSyntaxError(error)) {
                diagnostics.push.apply(diagnostics, tslib_1.__spread(syntaxErrorToDiagnostics(error)));
            }
            else {
                diagnostics.push({
                    messageText: error.toString(),
                    category: ts.DiagnosticCategory.Error,
                    source: api_1.SOURCE,
                    code: api_1.DEFAULT_ERROR_CODE
                });
            }
        };
        // Note: this returns a ts.Diagnostic so that we
        // can return errors in a ts.EmitResult
        AngularCompilerProgram.prototype.generateFilesForEmit = function (emitFlags) {
            var _this = this;
            try {
                if (!(emitFlags & api_1.EmitFlags.Codegen)) {
                    return { genFiles: [], genDiags: [] };
                }
                // TODO(tbosch): allow generating files that are not in the rootDir
                // See https://github.com/angular/angular/issues/19337
                var genFiles = this.compiler.emitAllImpls(this.analyzedModules)
                    .filter(function (genFile) { return util_1.isInRootDir(genFile.genFileUrl, _this.options); });
                if (this.oldProgramEmittedGeneratedFiles) {
                    var oldProgramEmittedGeneratedFiles_1 = this.oldProgramEmittedGeneratedFiles;
                    genFiles = genFiles.filter(function (genFile) {
                        var oldGenFile = oldProgramEmittedGeneratedFiles_1.get(genFile.genFileUrl);
                        return !oldGenFile || !genFile.isEquivalent(oldGenFile);
                    });
                }
                return { genFiles: genFiles, genDiags: [] };
            }
            catch (e) {
                // TODO(tbosch): check whether we can actually have syntax errors here,
                // as we already parsed the metadata and templates before to create the type check block.
                if (compiler_1.isSyntaxError(e)) {
                    var genDiags = [{
                            file: undefined,
                            start: undefined,
                            length: undefined,
                            messageText: e.message,
                            category: ts.DiagnosticCategory.Error,
                            source: api_1.SOURCE,
                            code: api_1.DEFAULT_ERROR_CODE
                        }];
                    return { genFiles: [], genDiags: genDiags };
                }
                throw e;
            }
        };
        /**
         * Returns undefined if all files should be emitted.
         */
        AngularCompilerProgram.prototype.getSourceFilesForEmit = function () {
            var _this = this;
            // TODO(tbosch): if one of the files contains a `const enum`
            // always emit all files -> return undefined!
            var sourceFilesToEmit = this.tsProgram.getSourceFiles().filter(function (sf) { return !sf.isDeclarationFile && !util_1.GENERATED_FILES.test(sf.fileName); });
            if (this.oldProgramEmittedSourceFiles) {
                sourceFilesToEmit = sourceFilesToEmit.filter(function (sf) {
                    var oldFile = _this.oldProgramEmittedSourceFiles.get(sf.fileName);
                    return sf !== oldFile;
                });
            }
            return sourceFilesToEmit;
        };
        AngularCompilerProgram.prototype.writeFile = function (outFileName, outData, writeByteOrderMark, onError, genFile, sourceFiles) {
            // collect emittedLibrarySummaries
            var baseFile;
            if (genFile) {
                baseFile = this.tsProgram.getSourceFile(genFile.srcFileUrl);
                if (baseFile) {
                    if (!this.emittedLibrarySummaries) {
                        this.emittedLibrarySummaries = [];
                    }
                    if (genFile.genFileUrl.endsWith('.ngsummary.json') && baseFile.fileName.endsWith('.d.ts')) {
                        this.emittedLibrarySummaries.push({
                            fileName: baseFile.fileName,
                            text: baseFile.text,
                            sourceFile: baseFile,
                        });
                        this.emittedLibrarySummaries.push({ fileName: genFile.genFileUrl, text: outData });
                        if (!this.options.declaration) {
                            // If we don't emit declarations, still record an empty .ngfactory.d.ts file,
                            // as we might need it later on for resolving module names from summaries.
                            var ngFactoryDts = genFile.genFileUrl.substring(0, genFile.genFileUrl.length - 15) + '.ngfactory.d.ts';
                            this.emittedLibrarySummaries.push({ fileName: ngFactoryDts, text: '' });
                        }
                    }
                    else if (outFileName.endsWith('.d.ts') && baseFile.fileName.endsWith('.d.ts')) {
                        var dtsSourceFilePath = genFile.genFileUrl.replace(/\.ts$/, '.d.ts');
                        // Note: Don't use sourceFiles here as the created .d.ts has a path in the outDir,
                        // but we need one that is next to the .ts file
                        this.emittedLibrarySummaries.push({ fileName: dtsSourceFilePath, text: outData });
                    }
                }
            }
            // Filter out generated files for which we didn't generate code.
            // This can happen as the stub calculation is not completely exact.
            // Note: sourceFile refers to the .ngfactory.ts / .ngsummary.ts file
            // node_emitter_transform already set the file contents to be empty,
            //  so this code only needs to skip the file if !allowEmptyCodegenFiles.
            var isGenerated = util_1.GENERATED_FILES.test(outFileName);
            if (isGenerated && !this.options.allowEmptyCodegenFiles &&
                (!genFile || !genFile.stmts || genFile.stmts.length === 0)) {
                return;
            }
            if (baseFile) {
                sourceFiles = sourceFiles ? tslib_1.__spread(sourceFiles, [baseFile]) : [baseFile];
            }
            // TODO: remove any when TS 2.4 support is removed.
            this.host.writeFile(outFileName, outData, writeByteOrderMark, onError, sourceFiles);
        };
        return AngularCompilerProgram;
    }());
    /**
     * Checks whether a given version ∈ [minVersion, maxVersion[
     * An error will be thrown if the following statements are simultaneously true:
     * - the given version ∉ [minVersion, maxVersion[,
     * - the result of the version check is not meant to be bypassed (the parameter disableVersionCheck
     * is false)
     *
     * @param version The version on which the check will be performed
     * @param minVersion The lower bound version. A valid version needs to be greater than minVersion
     * @param maxVersion The upper bound version. A valid version needs to be strictly less than
     * maxVersion
     * @param disableVersionCheck Indicates whether version check should be bypassed
     *
     * @throws Will throw an error if the following statements are simultaneously true:
     * - the given version ∉ [minVersion, maxVersion[,
     * - the result of the version check is not meant to be bypassed (the parameter disableVersionCheck
     * is false)
     */
    function checkVersion(version, minVersion, maxVersion, disableVersionCheck) {
        if ((typescript_version_1.compareVersions(version, minVersion) < 0 || typescript_version_1.compareVersions(version, maxVersion) >= 0) &&
            !disableVersionCheck) {
            throw new Error("The Angular Compiler requires TypeScript >=" + minVersion + " and <" + maxVersion + " but " + version + " was found instead.");
        }
    }
    exports.checkVersion = checkVersion;
    function createProgram(_a) {
        var rootNames = _a.rootNames, options = _a.options, host = _a.host, oldProgram = _a.oldProgram;
        if (options.enableIvy === 'ngtsc') {
            return new program_1.NgtscProgram(rootNames, options, host, oldProgram);
        }
        else if (options.enableIvy === 'tsc') {
            return new tsc_pass_through_1.TscPassThroughProgram(rootNames, options, host, oldProgram);
        }
        return new AngularCompilerProgram(rootNames, options, host, oldProgram);
    }
    exports.createProgram = createProgram;
    // Compute the AotCompiler options
    function getAotCompilerOptions(options) {
        var missingTranslation = compiler_1.core.MissingTranslationStrategy.Warning;
        switch (options.i18nInMissingTranslations) {
            case 'ignore':
                missingTranslation = compiler_1.core.MissingTranslationStrategy.Ignore;
                break;
            case 'error':
                missingTranslation = compiler_1.core.MissingTranslationStrategy.Error;
                break;
        }
        var translations = '';
        if (options.i18nInFile) {
            if (!options.i18nInLocale) {
                throw new Error("The translation file (" + options.i18nInFile + ") locale must be provided.");
            }
            translations = fs.readFileSync(options.i18nInFile, 'utf8');
        }
        else {
            // No translations are provided, ignore any errors
            // We still go through i18n to remove i18n attributes
            missingTranslation = compiler_1.core.MissingTranslationStrategy.Ignore;
        }
        return {
            locale: options.i18nInLocale,
            i18nFormat: options.i18nInFormat || options.i18nOutFormat,
            i18nUseExternalIds: options.i18nUseExternalIds, translations: translations, missingTranslation: missingTranslation,
            enableSummariesForJit: options.enableSummariesForJit,
            preserveWhitespaces: options.preserveWhitespaces,
            fullTemplateTypeCheck: options.fullTemplateTypeCheck,
            allowEmptyCodegenFiles: options.allowEmptyCodegenFiles,
            enableIvy: options.enableIvy,
        };
    }
    function getNgOptionDiagnostics(options) {
        if (options.annotationsAs) {
            switch (options.annotationsAs) {
                case 'decorators':
                case 'static fields':
                    break;
                default:
                    return [{
                            messageText: 'Angular compiler options "annotationsAs" only supports "static fields" and "decorators"',
                            category: ts.DiagnosticCategory.Error,
                            source: api_1.SOURCE,
                            code: api_1.DEFAULT_ERROR_CODE
                        }];
            }
        }
        return [];
    }
    function normalizeSeparators(path) {
        return path.replace(/\\/g, '/');
    }
    /**
     * Returns a function that can adjust a path from source path to out path,
     * based on an existing mapping from source to out path.
     *
     * TODO(tbosch): talk to the TypeScript team to expose their logic for calculating the `rootDir`
     * if none was specified.
     *
     * Note: This function works on normalized paths from typescript but should always return
     * POSIX normalized paths for output paths.
     */
    function createSrcToOutPathMapper(outDir, sampleSrcFileName, sampleOutFileName, host) {
        if (host === void 0) { host = path; }
        if (outDir) {
            var path_1 = {}; // Ensure we error if we use `path` instead of `host`.
            if (sampleSrcFileName == null || sampleOutFileName == null) {
                throw new Error("Can't calculate the rootDir without a sample srcFileName / outFileName. ");
            }
            var srcFileDir = normalizeSeparators(host.dirname(sampleSrcFileName));
            var outFileDir = normalizeSeparators(host.dirname(sampleOutFileName));
            if (srcFileDir === outFileDir) {
                return function (srcFileName) { return srcFileName; };
            }
            // calculate the common suffix, stopping
            // at `outDir`.
            var srcDirParts = srcFileDir.split('/');
            var outDirParts = normalizeSeparators(host.relative(outDir, outFileDir)).split('/');
            var i = 0;
            while (i < Math.min(srcDirParts.length, outDirParts.length) &&
                srcDirParts[srcDirParts.length - 1 - i] === outDirParts[outDirParts.length - 1 - i])
                i++;
            var rootDir_1 = srcDirParts.slice(0, srcDirParts.length - i).join('/');
            return function (srcFileName) {
                // Note: Before we return the mapped output path, we need to normalize the path delimiters
                // because the output path is usually passed to TypeScript which sometimes only expects
                // posix normalized paths (e.g. if a custom compiler host is used)
                return normalizeSeparators(host.resolve(outDir, host.relative(rootDir_1, srcFileName)));
            };
        }
        else {
            // Note: Before we return the output path, we need to normalize the path delimiters because
            // the output path is usually passed to TypeScript which only passes around posix
            // normalized paths (e.g. if a custom compiler host is used)
            return function (srcFileName) { return normalizeSeparators(srcFileName); };
        }
    }
    exports.createSrcToOutPathMapper = createSrcToOutPathMapper;
    function i18nExtract(formatName, outFile, host, options, bundle) {
        formatName = formatName || 'xlf';
        // Checks the format and returns the extension
        var ext = i18nGetExtension(formatName);
        var content = i18nSerialize(bundle, formatName, options);
        var dstFile = outFile || "messages." + ext;
        var dstPath = path.resolve(options.outDir || options.basePath, dstFile);
        host.writeFile(dstPath, content, false, undefined, []);
        return [dstPath];
    }
    exports.i18nExtract = i18nExtract;
    function i18nSerialize(bundle, formatName, options) {
        var format = formatName.toLowerCase();
        var serializer;
        switch (format) {
            case 'xmb':
                serializer = new compiler_1.Xmb();
                break;
            case 'xliff2':
            case 'xlf2':
                serializer = new compiler_1.Xliff2();
                break;
            case 'xlf':
            case 'xliff':
            default:
                serializer = new compiler_1.Xliff();
        }
        return bundle.write(serializer, getPathNormalizer(options.basePath));
    }
    exports.i18nSerialize = i18nSerialize;
    function getPathNormalizer(basePath) {
        // normalize source paths by removing the base path and always using "/" as a separator
        return function (sourcePath) {
            sourcePath = basePath ? path.relative(basePath, sourcePath) : sourcePath;
            return sourcePath.split(path.sep).join('/');
        };
    }
    function i18nGetExtension(formatName) {
        var format = formatName.toLowerCase();
        switch (format) {
            case 'xmb':
                return 'xmb';
            case 'xlf':
            case 'xlif':
            case 'xliff':
            case 'xlf2':
            case 'xliff2':
                return 'xlf';
        }
        throw new Error("Unsupported format \"" + formatName + "\"");
    }
    exports.i18nGetExtension = i18nGetExtension;
    function mergeEmitResults(emitResults) {
        var e_5, _a;
        var diagnostics = [];
        var emitSkipped = false;
        var emittedFiles = [];
        try {
            for (var emitResults_1 = tslib_1.__values(emitResults), emitResults_1_1 = emitResults_1.next(); !emitResults_1_1.done; emitResults_1_1 = emitResults_1.next()) {
                var er = emitResults_1_1.value;
                diagnostics.push.apply(diagnostics, tslib_1.__spread(er.diagnostics));
                emitSkipped = emitSkipped || er.emitSkipped;
                emittedFiles.push.apply(emittedFiles, tslib_1.__spread((er.emittedFiles || [])));
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (emitResults_1_1 && !emitResults_1_1.done && (_a = emitResults_1.return)) _a.call(emitResults_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return { diagnostics: diagnostics, emitSkipped: emitSkipped, emittedFiles: emittedFiles };
    }
    function diagnosticSourceOfSpan(span) {
        // For diagnostics, TypeScript only uses the fileName and text properties.
        // The redundant '()' are here is to avoid having clang-format breaking the line incorrectly.
        return { fileName: span.start.file.url, text: span.start.file.content };
    }
    function diagnosticSourceOfFileName(fileName, program) {
        var sourceFile = program.getSourceFile(fileName);
        if (sourceFile)
            return sourceFile;
        // If we are reporting diagnostics for a source file that is not in the project then we need
        // to fake a source file so the diagnostic formatting routines can emit the file name.
        // The redundant '()' are here is to avoid having clang-format breaking the line incorrectly.
        return { fileName: fileName, text: '' };
    }
    function diagnosticChainFromFormattedDiagnosticChain(chain) {
        return {
            messageText: chain.message,
            next: chain.next && diagnosticChainFromFormattedDiagnosticChain(chain.next),
            position: chain.position
        };
    }
    function syntaxErrorToDiagnostics(error) {
        var parserErrors = compiler_1.getParseErrors(error);
        if (parserErrors && parserErrors.length) {
            return parserErrors.map(function (e) { return ({
                messageText: e.contextualMessage(),
                file: diagnosticSourceOfSpan(e.span),
                start: e.span.start.offset,
                length: e.span.end.offset - e.span.start.offset,
                category: ts.DiagnosticCategory.Error,
                source: api_1.SOURCE,
                code: api_1.DEFAULT_ERROR_CODE
            }); });
        }
        else if (compiler_1.isFormattedError(error)) {
            return [{
                    messageText: error.message,
                    chain: error.chain && diagnosticChainFromFormattedDiagnosticChain(error.chain),
                    category: ts.DiagnosticCategory.Error,
                    source: api_1.SOURCE,
                    code: api_1.DEFAULT_ERROR_CODE,
                    position: error.position
                }];
        }
        // Produce a Diagnostic anyway since we know for sure `error` is a SyntaxError
        return [{
                messageText: error.message,
                category: ts.DiagnosticCategory.Error,
                code: api_1.DEFAULT_ERROR_CODE,
                source: api_1.SOURCE,
            }];
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3JhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9zcmMvdHJhbnNmb3JtZXJzL3Byb2dyYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7O0lBRUgsOENBQXNaO0lBQ3RaLHVCQUF5QjtJQUN6QiwyQkFBNkI7SUFDN0IsK0JBQWlDO0lBRWpDLHFHQUF5RjtJQUN6RiwrRkFBa0U7SUFDbEUscUVBQXFGO0lBQ3JGLG1FQUE4QztJQUU5QyxrRUFBb1A7SUFDcFAsc0ZBQWdIO0lBQ2hILDRGQUEwRztJQUMxRyw4RkFBa0c7SUFDbEcsd0ZBQW9FO0lBQ3BFLDBGQUFpRDtJQUNqRCx3R0FBMkU7SUFDM0Usc0dBQXlFO0lBQ3pFLGtHQUE4RztJQUM5RyxvRkFBaUU7SUFDakUsNEZBQXlEO0lBQ3pELG9FQUEySjtJQUczSjs7O09BR0c7SUFDSCxJQUFNLG1DQUFtQyxHQUFHLEVBQUUsQ0FBQztJQUcvQzs7T0FFRztJQUNILElBQU0sWUFBWSxHQUFHLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBRTlFOztPQUVHO0lBQ0gsSUFBTSxlQUFlLG9CQUFPLFlBQVksR0FBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxDQUFDO0lBRTdFLElBQU0scUJBQXFCLEdBQUc7UUFDNUIsV0FBVztRQUNYLFdBQVc7UUFDWCxZQUFZO1FBQ1osVUFBVTtRQUNWLE1BQU07S0FDUCxDQUFDO0lBRUYsSUFBTSxZQUFZLEdBQXNCO1FBQ3RDLFNBQVMsRUFBRSxFQUFFO1FBQ2IseUJBQXlCLEVBQUUsSUFBSSxHQUFHLEVBQUU7UUFDcEMsS0FBSyxFQUFFLEVBQUU7S0FDVixDQUFDO0lBRUYsSUFBTSxtQkFBbUIsR0FDckIsVUFBQyxFQUNvQjtZQURuQixvQkFBTyxFQUFFLHND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QyxJQUFJLEVBQUUsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDcEMsS0FBSyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07Z0JBQzFCLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO2dCQUNyQyxNQUFNLEVBQUUsWUFBTTtnQkFDZCxJQUFJLEVBQUUsd0JBQWtCO2FBQ3pCLENBQUMsRUFSRyxDQVFILENBQUMsQ0FBQztTQUN6QzthQUFNLElBQUksMkJBQWdCLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEMsT0FBTyxDQUFDO29CQUNOLFdBQVcsRUFBRSxLQUFLLENBQUMsT0FBTztvQkFDMUIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLElBQUksMkNBQTJDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztvQkFDOUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO29CQUNyQyxNQUFNLEVBQUUsWUFBTTtvQkFDZCxJQUFJLEVBQUUsd0JBQWtCO29CQUN4QixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7aUJBQ3pCLENBQUMsQ0FBQztTQUNKO1FBQ0QsOEVBQThFO1FBQzlFLE9BQU8sQ0FBQztnQkFDTixXQUFXLEVBQUUsS0FBSyxDQUFDLE9BQU87Z0JBQzFCLFFBQVEsRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUMsS0FBSztnQkFDckMsSUFBSSxFQUFFLHdCQUFrQjtnQkFDeEIsTUFBTSxFQUFFLFlBQU07YUFDZixDQUFDLENBQUM7SUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QW90Q29tcGlsZXIsIEFvdENvbXBpbGVySG9zdCwgQW90Q29tcGlsZXJPcHRpb25zLCBFbWl0dGVyVmlzaXRvckNvbnRleHQsIEZvcm1hdHRlZE1lc3NhZ2VDaGFpbiwgR2VuZXJhdGVkRmlsZSwgTWVzc2FnZUJ1bmRsZSwgTmdBbmFseXplZEZpbGUsIE5nQW5hbHl6ZWRGaWxlV2l0aEluamVjdGFibGVzLCBOZ0FuYWx5emVkTW9kdWxlcywgUGFyc2VTb3VyY2VTcGFuLCBQYXJ0aWFsTW9kdWxlLCBQb3NpdGlvbiwgU2VyaWFsaXplciwgU3RhdGljU3ltYm9sLCBUeXBlU2NyaXB0RW1pdHRlciwgWGxpZmYsIFhsaWZmMiwgWG1iLCBjb3JlLCBjcmVhdGVBb3RDb21waWxlciwgZ2V0UGFyc2VFcnJvcnMsIGlzRm9ybWF0dGVkRXJyb3IsIGlzU3ludGF4RXJyb3J9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcblxuaW1wb3J0IHtUeXBlQ2hlY2tIb3N0LCB0cmFuc2xhdGVEaWFnbm9zdGljc30gZnJvbSAnLi4vZGlhZ25vc3RpY3MvdHJhbnNsYXRlX2RpYWdub3N0aWNzJztcbmltcG9ydCB7Y29tcGFyZVZlcnNpb25zfSBmcm9tICcuLi9kaWFnbm9zdGljcy90eXBlc2NyaXB0X3ZlcnNpb24nO1xuaW1wb3J0IHtNZXRhZGF0YUNvbGxlY3RvciwgTW9kdWxlTWV0YWRhdGEsIGNyZWF0ZUJ1bmRsZUluZGV4SG9zdH0gZnJvbSAnLi4vbWV0YWRhdGEnO1xuaW1wb3J0IHtOZ3RzY1Byb2dyYW19IGZyb20gJy4uL25ndHNjL3Byb2dyYW0nO1xuXG5pbXBvcnQge0NvbXBpbGVySG9zdCwgQ29tcGlsZXJPcHRpb25zLCBDdXN0b21UcmFuc2Zvcm1lcnMsIERFRkFVTFRfRVJST1JfQ09ERSwgRGlhZ25vc3RpYywgRGlhZ25vc3RpY01lc3NhZ2VDaGFpbiwgRW1pdEZsYWdzLCBMYXp5Um91dGUsIExpYnJhcnlTdW1tYXJ5LCBQcm9ncmFtLCBTT1VSQ0UsIFRzRW1pdEFyZ3VtZW50cywgVHNFbWl0Q2FsbGJhY2ssIFRzTWVyZ2VFbWl0UmVzdWx0c0NhbGxiYWNrfSBmcm9tICcuL2FwaSc7XG5pbXBvcnQge0NvZGVHZW5lcmF0b3IsIFRzQ29tcGlsZXJBb3RDb21waWxlclR5cGVDaGVja0hvc3RBZGFwdGVyLCBnZXRPcmlnaW5hbFJlZmVyZW5jZXN9IGZyb20gJy4vY29tcGlsZXJfaG9zdCc7XG5pbXBvcnQge0lubGluZVJlc291cmNlc01ldGFkYXRhVHJhbnNmb3JtZXIsIGdldElubGluZVJlc291cmNlc1RyYW5zZm9ybUZhY3Rvcnl9IGZyb20gJy4vaW5saW5lX3Jlc291cmNlcyc7XG5pbXBvcnQge0xvd2VyTWV0YWRhdGFUcmFuc2Zvcm0sIGdldEV4cHJlc3Npb25Mb3dlcmluZ1RyYW5zZm9ybUZhY3Rvcnl9IGZyb20gJy4vbG93ZXJfZXhwcmVzc2lvbnMnO1xuaW1wb3J0IHtNZXRhZGF0YUNhY2hlLCBNZXRhZGF0YVRyYW5zZm9ybWVyfSBmcm9tICcuL21ldGFkYXRhX2NhY2hlJztcbmltcG9ydCB7bm9jb2xsYXBzZUhhY2t9IGZyb20gJy4vbm9jb2xsYXBzZV9oYWNrJztcbmltcG9ydCB7Z2V0QW5ndWxhckVtaXR0ZXJUcmFuc2Zvcm1GYWN0b3J5fSBmcm9tICcuL25vZGVfZW1pdHRlcl90cmFuc2Zvcm0nO1xuaW1wb3J0IHtQYXJ0aWFsTW9kdWxlTWV0YWRhdGFUcmFuc2Zvcm1lcn0gZnJvbSAnLi9yM19tZXRhZGF0YV90cmFuc2Zvcm0nO1xuaW1wb3J0IHtTdHJpcERlY29yYXRvcnNNZXRhZGF0YVRyYW5zZm9ybWVyLCBnZXREZWNvcmF0b3JTdHJpcFRyYW5zZm9ybWVyRmFjdG9yeX0gZnJvbSAnLi9yM19zdHJpcF9kZWNvcmF0b3JzJztcbmltcG9ydCB7Z2V0QW5ndWxhckNsYXNzVHJhbnNmb3JtZXJGYWN0b3J5fSBmcm9tICcuL3IzX3RyYW5zZm9ybSc7XG5pbXBvcnQge1RzY1Bhc3NUaHJvdWdoUHJvZ3JhbX0gZnJvbSAnLi90c2NfcGFzc190aHJvdWdoJztcbmltcG9ydCB7RFRTLCBHRU5FUkFURURfRklMRVMsIFN0cnVjdHVyZUlzUmV1c2VkLCBUUywgY3JlYXRlTWVzc2FnZURpYWdub3N0aWMsIGlzSW5Sb290RGlyLCBuZ1RvVHNEaWFnbm9zdGljLCB0c1N0cnVjdHVyZUlzUmV1c2VkLCB1c2VyRXJyb3J9IGZyb20gJy4vdXRpbCc7XG5cblxuLyoqXG4gKiBNYXhpbXVtIG51bWJlciBvZiBmaWxlcyB0aGF0IGFyZSBlbWl0YWJsZSB2aWEgY2FsbGluZyB0cy5Qcm9ncmFtLmVtaXRcbiAqIHBhc3NpbmcgaW5kaXZpZHVhbCB0YXJnZXRTb3VyY2VGaWxlcy5cbiAqL1xuY29uc3QgTUFYX0ZJTEVfQ09VTlRfRk9SX1NJTkdMRV9GSUxFX0VNSVQgPSAyMDtcblxuXG4vKipcbiAqIEZpZWxkcyB0byBsb3dlciB3aXRoaW4gbWV0YWRhdGEgaW4gcmVuZGVyMiBtb2RlLlxuICovXG5jb25zdCBMT1dFUl9GSUVMRFMgPSBbJ3VzZVZhbHVlJywgJ3VzZUZhY3RvcnknLCAnZGF0YScsICdpZCcsICdsb2FkQ2hpbGRyZW4nXTtcblxuLyoqXG4gKiBGaWVsZHMgdG8gbG93ZXIgd2l0aGluIG1ldGFkYXRhIGluIHJlbmRlcjMgbW9kZS5cbiAqL1xuY29uc3QgUjNfTE9XRVJfRklFTERTID0gWy4uLkxPV0VSX0ZJRUxEUywgJ3Byb3ZpZGVycycsICdpbXBvcnRzJywgJ2V4cG9ydHMnXTtcblxuY29uc3QgUjNfUkVJRklFRF9ERUNPUkFUT1JTID0gW1xuICAnQ29tcG9uZW50JyxcbiAgJ0RpcmVjdGl2ZScsXG4gICdJbmplY3RhYmxlJyxcbiAgJ05nTW9kdWxlJyxcbiAgJ1BpcGUnLFxuXTtcblxuY29uc3QgZW1wdHlNb2R1bGVzOiBOZ0FuYWx5emVkTW9kdWxlcyA9IHtcbiAgbmdNb2R1bGVzOiBbXSxcbiAgbmdNb2R1bGVCeVBpcGVPckRpcmVjdGl2ZTogbmV3IE1hcCgpLFxuICBmaWxlczogW11cbn07XG5cbmNvbnN0IGRlZmF1bHRFbWl0Q2FsbGJhY2s6IFRzRW1pdENhbGxiYWNrID1cbiAgICAoe3Byb2dyYW0sIHRhcmdldFNvdXJjZUZpbGUsIHdyaXRlRmlsZSwgY2FuY2VsbGF0aW9uVG9rZW4sIGVtaXRPbmx5RHRzRmlsZXMsXG4gICAgICBjdXN0b21UcmFuc2Zvcm1lcnN9KSA9PlxuICAgICAgICBwcm9ncmFtLmVtaXQoXG4gICAgICAgICAgICB0YXJnZXRTb3VyY2VGaWxlLCB3cml0ZUZpbGUsIGNhbmNlbGxhdGlvblRva2VuLCBlbWl0T25seUR0c0ZpbGVzLCBjdXN0b21UcmFuc2Zvcm1lcnMpO1xuXG4vKipcbiAqIE1pbmltdW0gc3VwcG9ydGVkIFR5cGVTY3JpcHQgdmVyc2lvblxuICog4oiAIHN1cHBvcnRlZCB0eXBlc2NyaXB0IHZlcnNpb24gdiwgdiA+PSBNSU5fVFNfVkVSU0lPTlxuICovXG5jb25zdCBNSU5fVFNfVkVSU0lPTiA9ICczLjEuMSc7XG5cbi8qKlxuICogU3VwcmVtdW0gb2Ygc3VwcG9ydGVkIFR5cGVTY3JpcHQgdmVyc2lvbnNcbiAqIOKIgCBzdXBwb3J0ZWQgdHlwZXNjcmlwdCB2ZXJzaW9uIHYsIHYgPCBNQVhfVFNfVkVSU0lPTlxuICogTUFYX1RTX1ZFUlNJT04gaXMgbm90IGNvbnNpZGVyZWQgYXMgYSBzdXBwb3J0ZWQgVHlwZVNjcmlwdCB2ZXJzaW9uXG4gKi9cbmNvbnN0IE1BWF9UU19WRVJTSU9OID0gJzMuMy4wJztcblxuY2xhc3MgQW5ndWxhckNvbXBpbGVyUHJvZ3JhbSBpbXBsZW1lbnRzIFByb2dyYW0ge1xuICBwcml2YXRlIHJvb3ROYW1lczogc3RyaW5nW107XG4gIHByaXZhdGUgbWV0YWRhdGFDYWNoZTogTWV0YWRhdGFDYWNoZTtcbiAgLy8gTWV0YWRhdGEgY2FjaGUgdXNlZCBleGNsdXNpdmVseSBmb3IgdGhlIGZsYXQgbW9kdWxlIGluZGV4XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIGZsYXRNb2R1bGVNZXRhZGF0YUNhY2hlICE6IE1ldGFkYXRhQ2FjaGU7XG4gIHByaXZhdGUgbG93ZXJpbmdNZXRhZGF0YVRyYW5zZm9ybTogTG93ZXJNZXRhZGF0YVRyYW5zZm9ybTtcbiAgcHJpdmF0ZSBvbGRQcm9ncmFtTGlicmFyeVN1bW1hcmllczogTWFwPHN0cmluZywgTGlicmFyeVN1bW1hcnk+fHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBvbGRQcm9ncmFtRW1pdHRlZEdlbmVyYXRlZEZpbGVzOiBNYXA8c3RyaW5nLCBHZW5lcmF0ZWRGaWxlPnx1bmRlZmluZWQ7XG4gIHByaXZhdGUgb2xkUHJvZ3JhbUVtaXR0ZWRTb3VyY2VGaWxlczogTWFwPHN0cmluZywgdHMuU291cmNlRmlsZT58dW5kZWZpbmVkO1xuICAvLyBOb3RlOiBUaGlzIHdpbGwgYmUgY2xlYXJlZCBvdXQgYXMgc29vbiBhcyB3ZSBjcmVhdGUgdGhlIF90c1Byb2dyYW1cbiAgcHJpdmF0ZSBvbGRUc1Byb2dyYW06IHRzLlByb2dyYW18dW5kZWZpbmVkO1xuICBwcml2YXRlIGVtaXR0ZWRMaWJyYXJ5U3VtbWFyaWVzOiBMaWJyYXJ5U3VtbWFyeVtdfHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBlbWl0dGVkR2VuZXJhdGVkRmlsZXM6IEdlbmVyYXRlZEZpbGVbXXx1bmRlZmluZWQ7XG4gIHByaXZhdGUgZW1pdHRlZFNvdXJjZUZpbGVzOiB0cy5Tb3VyY2VGaWxlW118dW5kZWZpbmVkO1xuXG4gIC8vIExhemlseSBpbml0aWFsaXplZCBmaWVsZHNcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgX2NvbXBpbGVyICE6IEFvdENvbXBpbGVyO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBfaG9zdEFkYXB0ZXIgITogVHNDb21waWxlckFvdENvbXBpbGVyVHlwZUNoZWNrSG9zdEFkYXB0ZXI7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF90c1Byb2dyYW0gITogdHMuUHJvZ3JhbTtcbiAgcHJpdmF0ZSBfYW5hbHl6ZWRNb2R1bGVzOiBOZ0FuYWx5emVkTW9kdWxlc3x1bmRlZmluZWQ7XG4gIHByaXZhdGUgX2FuYWx5emVkSW5qZWN0YWJsZXM6IE5nQW5hbHl6ZWRGaWxlV2l0aEluamVjdGFibGVzW118dW5kZWZpbmVkO1xuICBwcml2YXRlIF9zdHJ1Y3R1cmFsRGlhZ25vc3RpY3M6IERpYWdub3N0aWNbXXx1bmRlZmluZWQ7XG4gIHByaXZhdGUgX3Byb2dyYW1XaXRoU3R1YnM6IHRzLlByb2dyYW18dW5kZWZpbmVkO1xuICBwcml2YXRlIF9vcHRpb25zRGlhZ25vc3RpY3M6IERpYWdub3N0aWNbXSA9IFtdO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBfcmVpZmllZERlY29yYXRvcnMgITogU2V0PFN0YXRpY1N5bWJvbD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICByb290TmFtZXM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPiwgcHJpdmF0ZSBvcHRpb25zOiBDb21waWxlck9wdGlvbnMsXG4gICAgICBwcml2YXRlIGhvc3Q6IENvbXBpbGVySG9zdCwgb2xkUHJvZ3JhbT86IFByb2dyYW0pIHtcbiAgICB0aGlzLnJvb3ROYW1lcyA9IFsuLi5yb290TmFtZXNdO1xuXG4gICAgY2hlY2tWZXJzaW9uKHRzLnZlcnNpb24sIE1JTl9UU19WRVJTSU9OLCBNQVhfVFNfVkVSU0lPTiwgb3B0aW9ucy5kaXNhYmxlVHlwZVNjcmlwdFZlcnNpb25DaGVjayk7XG5cbiAgICB0aGlzLm9sZFRzUHJvZ3JhbSA9IG9sZFByb2dyYW0gPyBvbGRQcm9ncmFtLmdldFRzUHJvZ3JhbSgpIDogdW5kZWZpbmVkO1xuICAgIGlmIChvbGRQcm9ncmFtKSB7XG4gICAgICB0aGlzLm9sZFByb2dyYW1MaWJyYXJ5U3VtbWFyaWVzID0gb2xkUHJvZ3JhbS5nZXRMaWJyYXJ5U3VtbWFyaWVzKCk7XG4gICAgICB0aGlzLm9sZFByb2dyYW1FbWl0dGVkR2VuZXJhdGVkRmlsZXMgPSBvbGRQcm9ncmFtLmdldEVtaXR0ZWRHZW5lcmF0ZWRGaWxlcygpO1xuICAgICAgdGhpcy5vbGRQcm9ncmFtRW1pdHRlZFNvdXJjZUZpbGVzID0gb2xkUHJvZ3JhbS5nZXRFbWl0dGVkU291cmNlRmlsZXMoKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5mbGF0TW9kdWxlT3V0RmlsZSkge1xuICAgICAgY29uc3Qge2hvc3Q6IGJ1bmRsZUhvc3QsIGluZGV4TmFtZSwgZXJyb3JzfSA9XG4gICAgICAgICAgY3JlYXRlQnVuZGxlSW5kZXhIb3N0KG9wdGlvbnMsIHRoaXMucm9vdE5hbWVzLCBob3N0LCAoKSA9PiB0aGlzLmZsYXRNb2R1bGVNZXRhZGF0YUNhY2hlKTtcbiAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9uc0RpYWdub3N0aWNzLnB1c2goLi4uZXJyb3JzLm1hcChlID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogZS5jYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VUZXh0OiBlLm1lc3NhZ2VUZXh0IGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogU09VUkNFLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogREVGQVVMVF9FUlJPUl9DT0RFXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucm9vdE5hbWVzLnB1c2goaW5kZXhOYW1lICEpO1xuICAgICAgICB0aGlzLmhvc3QgPSBidW5kbGVIb3N0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubG93ZXJpbmdNZXRhZGF0YVRyYW5zZm9ybSA9XG4gICAgICAgIG5ldyBMb3dlck1ldGFkYXRhVHJhbnNmb3JtKG9wdGlvbnMuZW5hYmxlSXZ5ID8gUjNfTE9XRVJfRklFTERTIDogTE9XRVJfRklFTERTKTtcbiAgICB0aGlzLm1ldGFkYXRhQ2FjaGUgPSB0aGlzLmNyZWF0ZU1ldGFkYXRhQ2FjaGUoW3RoaXMubG93ZXJpbmdNZXRhZGF0YVRyYW5zZm9ybV0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVNZXRhZGF0YUNhY2hlKHRyYW5zZm9ybWVyczogTWV0YWRhdGFUcmFuc2Zvcm1lcltdKSB7XG4gICAgcmV0dXJuIG5ldyBNZXRhZGF0YUNhY2hlKFxuICAgICAgICBuZXcgTWV0YWRhdGFDb2xsZWN0b3Ioe3F1b3RlZE5hbWVzOiB0cnVlfSksICEhdGhpcy5vcHRpb25zLnN0cmljdE1ldGFkYXRhRW1pdCxcbiAgICAgICAgdHJhbnNmb3JtZXJzKTtcbiAgfVxuXG4gIGdldExpYnJhcnlTdW1tYXJpZXMoKTogTWFwPHN0cmluZywgTGlicmFyeVN1bW1hcnk+IHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgTWFwPHN0cmluZywgTGlicmFyeVN1bW1hcnk+KCk7XG4gICAgaWYgKHRoaXMub2xkUHJvZ3JhbUxpYnJhcnlTdW1tYXJpZXMpIHtcbiAgICAgIHRoaXMub2xkUHJvZ3JhbUxpYnJhcnlTdW1tYXJpZXMuZm9yRWFjaCgoc3VtbWFyeSwgZmlsZU5hbWUpID0+IHJlc3VsdC5zZXQoZmlsZU5hbWUsIHN1bW1hcnkpKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZW1pdHRlZExpYnJhcnlTdW1tYXJpZXMpIHtcbiAgICAgIHRoaXMuZW1pdHRlZExpYnJhcnlTdW1tYXJpZXMuZm9yRWFjaChcbiAgICAgICAgICAoc3VtbWFyeSwgZmlsZU5hbWUpID0+IHJlc3VsdC5zZXQoc3VtbWFyeS5maWxlTmFtZSwgc3VtbWFyeSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZ2V0RW1pdHRlZEdlbmVyYXRlZEZpbGVzKCk6IE1hcDxzdHJpbmcsIEdlbmVyYXRlZEZpbGU+IHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgTWFwPHN0cmluZywgR2VuZXJhdGVkRmlsZT4oKTtcbiAgICBpZiAodGhpcy5vbGRQcm9ncmFtRW1pdHRlZEdlbmVyYXRlZEZpbGVzKSB7XG4gICAgICB0aGlzLm9sZFByb2dyYW1FbWl0dGVkR2VuZXJhdGVkRmlsZXMuZm9yRWFjaChcbiAgICAgICAgICAoZ2VuRmlsZSwgZmlsZU5hbWUpID0+IHJlc3VsdC5zZXQoZmlsZU5hbWUsIGdlbkZpbGUpKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZW1pdHRlZEdlbmVyYXRlZEZpbGVzKSB7XG4gICAgICB0aGlzLmVtaXR0ZWRHZW5lcmF0ZWRGaWxlcy5mb3JFYWNoKChnZW5GaWxlKSA9PiByZXN1bHQuc2V0KGdlbkZpbGUuZ2VuRmlsZVVybCwgZ2VuRmlsZSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZ2V0RW1pdHRlZFNvdXJjZUZpbGVzKCk6IE1hcDxzdHJpbmcsIHRzLlNvdXJjZUZpbGU+IHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgTWFwPHN0cmluZywgdHMuU291cmNlRmlsZT4oKTtcbiAgICBpZiAodGhpcy5vbGRQcm9ncmFtRW1pdHRlZFNvdXJjZUZpbGVzKSB7XG4gICAgICB0aGlzLm9sZFByb2dyYW1FbWl0dGVkU291cmNlRmlsZXMuZm9yRWFjaCgoc2YsIGZpbGVOYW1lKSA9PiByZXN1bHQuc2V0KGZpbGVOYW1lLCBzZikpO1xuICAgIH1cbiAgICBpZiAodGhpcy5lbWl0dGVkU291cmNlRmlsZXMpIHtcbiAgICAgIHRoaXMuZW1pdHRlZFNvdXJjZUZpbGVzLmZvckVhY2goKHNmKSA9PiByZXN1bHQuc2V0KHNmLmZpbGVOYW1lLCBzZikpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZ2V0VHNQcm9ncmFtKCk6IHRzLlByb2dyYW0geyByZXR1cm4gdGhpcy50c1Byb2dyYW07IH1cblxuICBnZXRUc09wdGlvbkRpYWdub3N0aWNzKGNhbmNlbGxhdGlvblRva2VuPzogdHMuQ2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICByZXR1cm4gdGhpcy50c1Byb2dyYW0uZ2V0T3B0aW9uc0RpYWdub3N0aWNzKGNhbmNlbGxhdGlvblRva2VuKTtcbiAgfVxuXG4gIGdldE5nT3B0aW9uRGlhZ25vc3RpY3MoY2FuY2VsbGF0aW9uVG9rZW4/OiB0cy5DYW5jZWxsYXRpb25Ub2tlbik6IFJlYWRvbmx5QXJyYXk8RGlhZ25vc3RpYz4ge1xuICAgIHJldHVybiBbLi4udGhpcy5fb3B0aW9uc0RpYWdub3N0aWNzLCAuLi5nZXROZ09wdGlvbkRpYWdub3N0aWNzKHRoaXMub3B0aW9ucyldO1xuICB9XG5cbiAgZ2V0VHNTeW50YWN0aWNEaWFnbm9zdGljcyhzb3VyY2VGaWxlPzogdHMuU291cmNlRmlsZSwgY2FuY2VsbGF0aW9uVG9rZW4/OiB0cy5DYW5jZWxsYXRpb25Ub2tlbik6XG4gICAgICBSZWFkb25seUFycmF5PHRzLkRpYWdub3N0aWM+IHtcbiAgICByZXR1cm4gdGhpcy50c1Byb2dyYW0uZ2V0U3ludGFjdGljRGlhZ25vc3RpY3Moc291cmNlRmlsZSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICB9XG5cbiAgZ2V0TmdTdHJ1Y3R1cmFsRGlhZ25vc3RpY3MoY2FuY2VsbGF0aW9uVG9rZW4/OiB0cy5DYW5jZWxsYXRpb25Ub2tlbik6IFJlYWRvbmx5QXJyYXk8RGlhZ25vc3RpYz4ge1xuICAgIHJldHVybiB0aGlzLnN0cnVjdHVyYWxEaWFnbm9zdGljcztcbiAgfVxuXG4gIGdldFRzU2VtYW50aWNEaWFnbm9zdGljcyhzb3VyY2VGaWxlPzogdHMuU291cmNlRmlsZSwgY2FuY2VsbGF0aW9uVG9rZW4/OiB0cy5DYW5jZWxsYXRpb25Ub2tlbik6XG4gICAgICBSZWFkb25seUFycmF5PHRzLkRpYWdub3N0aWM+IHtcbiAgICBjb25zdCBzb3VyY2VGaWxlcyA9IHNvdXJjZUZpbGUgPyBbc291cmNlRmlsZV0gOiB0aGlzLnRzUHJvZ3JhbS5nZXRTb3VyY2VGaWxlcygpO1xuICAgIGxldCBkaWFnczogdHMuRGlhZ25vc3RpY1tdID0gW107XG4gICAgc291cmNlRmlsZXMuZm9yRWFjaChzZiA9PiB7XG4gICAgICBpZiAoIUdFTkVSQVRFRF9GSUxFUy50ZXN0KHNmLmZpbGVOYW1lKSkge1xuICAgICAgICBkaWFncy5wdXNoKC4uLnRoaXMudHNQcm9ncmFtLmdldFNlbWFudGljRGlhZ25vc3RpY3Moc2YsIGNhbmNlbGxhdGlvblRva2VuKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRpYWdzO1xuICB9XG5cbiAgZ2V0TmdTZW1hbnRpY0RpYWdub3N0aWNzKGZpbGVOYW1lPzogc3RyaW5nLCBjYW5jZWxsYXRpb25Ub2tlbj86IHRzLkNhbmNlbGxhdGlvblRva2VuKTpcbiAgICAgIFJlYWRvbmx5QXJyYXk8RGlhZ25vc3RpYz4ge1xuICAgIGxldCBkaWFnczogdHMuRGlhZ25vc3RpY1tdID0gW107XG4gICAgdGhpcy50c1Byb2dyYW0uZ2V0U291cmNlRmlsZXMoKS5mb3JFYWNoKHNmID0+IHtcbiAgICAgIGlmIChHRU5FUkFURURfRklMRVMudGVzdChzZi5maWxlTmFtZSkgJiYgIXNmLmlzRGVjbGFyYXRpb25GaWxlKSB7XG4gICAgICAgIGRpYWdzLnB1c2goLi4udGhpcy50c1Byb2dyYW0uZ2V0U2VtYW50aWNEaWFnbm9zdGljcyhzZiwgY2FuY2VsbGF0aW9uVG9rZW4pKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCB7bmd9ID0gdHJhbnNsYXRlRGlhZ25vc3RpY3ModGhpcy5ob3N0QWRhcHRlciwgZGlhZ3MpO1xuICAgIHJldHVybiBuZztcbiAgfVxuXG4gIGxvYWROZ1N0cnVjdHVyZUFzeW5jKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLl9hbmFseXplZE1vZHVsZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQW5ndWxhciBzdHJ1Y3R1cmUgYWxyZWFkeSBsb2FkZWQnKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBjb25zdCB7dG1wUHJvZ3JhbSwgc291cmNlRmlsZXMsIHRzRmlsZXMsIHJvb3ROYW1lc30gPSB0aGlzLl9jcmVhdGVQcm9ncmFtV2l0aEJhc2ljU3R1YnMoKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jb21waWxlci5sb2FkRmlsZXNBc3luYyhzb3VyY2VGaWxlcywgdHNGaWxlcylcbiAgICAgICAgICAgICAgLnRoZW4oKHthbmFseXplZE1vZHVsZXMsIGFuYWx5emVkSW5qZWN0YWJsZXN9KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FuYWx5emVkTW9kdWxlcykge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbmd1bGFyIHN0cnVjdHVyZSBsb2FkZWQgYm90aCBzeW5jaHJvbm91c2x5IGFuZCBhc3luY2hyb25vdXNseScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVQcm9ncmFtV2l0aFR5cGVDaGVja1N0dWJzKFxuICAgICAgICAgICAgICAgICAgICB0bXBQcm9ncmFtLCBhbmFseXplZE1vZHVsZXMsIGFuYWx5emVkSW5qZWN0YWJsZXMsIHJvb3ROYW1lcyk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB0aGlzLl9jcmVhdGVQcm9ncmFtT25FcnJvcihlKSk7XG4gIH1cblxuICBsaXN0TGF6eVJvdXRlcyhyb3V0ZT86IHN0cmluZyk6IExhenlSb3V0ZVtdIHtcbiAgICAvLyBOb3RlOiBEb24ndCBhbmFseXplZE1vZHVsZXMgaWYgYSByb3V0ZSBpcyBnaXZlblxuICAgIC8vIHRvIGJlIGZhc3QgZW5vdWdoLlxuICAgIHJldHVybiB0aGlzLmNvbXBpbGVyLmxpc3RMYXp5Um91dGVzKHJvdXRlLCByb3V0ZSA/IHVuZGVmaW5lZCA6IHRoaXMuYW5hbHl6ZWRNb2R1bGVzKTtcbiAgfVxuXG4gIGVtaXQocGFyYW1ldGVyczoge1xuICAgIGVtaXRGbGFncz86IEVtaXRGbGFncyxcbiAgICBjYW5jZWxsYXRpb25Ub2tlbj86IHRzLkNhbmNlbGxhdGlvblRva2VuLFxuICAgIGN1c3RvbVRyYW5zZm9ybWVycz86IEN1c3RvbVRyYW5zZm9ybWVycyxcbiAgICBlbWl0Q2FsbGJhY2s/OiBUc0VtaXRDYWxsYmFjayxcbiAgICBtZXJnZUVtaXRSZXN1bHRzQ2FsbGJhY2s/OiBUc01lcmdlRW1pdFJlc3VsdHNDYWxsYmFjayxcbiAgfSA9IHt9KTogdHMuRW1pdFJlc3VsdCB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5lbmFibGVJdnkgPT09ICduZ3RzYycgfHwgdGhpcy5vcHRpb25zLmVuYWJsZUl2eSA9PT0gJ3RzYycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHJ1biBsZWdhY3kgY29tcGlsZXIgaW4gbmd0c2MgbW9kZScpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmVuYWJsZUl2eSA9PT0gdHJ1ZSA/IHRoaXMuX2VtaXRSZW5kZXIzKHBhcmFtZXRlcnMpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2VtaXRSZW5kZXIyKHBhcmFtZXRlcnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZW1pdFJlbmRlcjMoXG4gICAgICB7XG4gICAgICAgICAgZW1pdEZsYWdzID0gRW1pdEZsYWdzLkRlZmF1bHQsIGNhbmNlbGxhdGlvblRva2VuLCBjdXN0b21UcmFuc2Zvcm1lcnMsXG4gICAgICAgICAgZW1pdENhbGxiYWNrID0gZGVmYXVsdEVtaXRDYWxsYmFjaywgbWVyZ2VFbWl0UmVzdWx0c0NhbGxiYWNrID0gbWVyZ2VFbWl0UmVzdWx0cyxcbiAgICAgIH06IHtcbiAgICAgICAgZW1pdEZsYWdzPzogRW1pdEZsYWdzLFxuICAgICAgICBjYW5jZWxsYXRpb25Ub2tlbj86IHRzLkNhbmNlbGxhdGlvblRva2VuLFxuICAgICAgICBjdXN0b21UcmFuc2Zvcm1lcnM/OiBDdXN0b21UcmFuc2Zvcm1lcnMsXG4gICAgICAgIGVtaXRDYWxsYmFjaz86IFRzRW1pdENhbGxiYWNrLFxuICAgICAgICBtZXJnZUVtaXRSZXN1bHRzQ2FsbGJhY2s/OiBUc01lcmdlRW1pdFJlc3VsdHNDYWxsYmFjayxcbiAgICAgIH0gPSB7fSk6IHRzLkVtaXRSZXN1bHQge1xuICAgIGNvbnN0IGVtaXRTdGFydCA9IERhdGUubm93KCk7XG4gICAgaWYgKChlbWl0RmxhZ3MgJiAoRW1pdEZsYWdzLkpTIHwgRW1pdEZsYWdzLkRUUyB8IEVtaXRGbGFncy5NZXRhZGF0YSB8IEVtaXRGbGFncy5Db2RlZ2VuKSkgPT09XG4gICAgICAgIDApIHtcbiAgICAgIHJldHVybiB7ZW1pdFNraXBwZWQ6IHRydWUsIGRpYWdub3N0aWNzOiBbXSwgZW1pdHRlZEZpbGVzOiBbXX07XG4gICAgfVxuXG4gICAgLy8gYW5hbHl6ZWRNb2R1bGVzIGFuZCBhbmFseXplZEluamVjdGFibGVzIGFyZSBjcmVhdGVkIHRvZ2V0aGVyLiBJZiBvbmUgZXhpc3RzLCBzbyBkb2VzIHRoZVxuICAgIC8vIG90aGVyLlxuICAgIGNvbnN0IG1vZHVsZXMgPVxuICAgICAgICB0aGlzLmNvbXBpbGVyLmVtaXRBbGxQYXJ0aWFsTW9kdWxlcyh0aGlzLmFuYWx5emVkTW9kdWxlcywgdGhpcy5fYW5hbHl6ZWRJbmplY3RhYmxlcyAhKTtcblxuICAgIGNvbnN0IHdyaXRlVHNGaWxlOiB0cy5Xcml0ZUZpbGVDYWxsYmFjayA9XG4gICAgICAgIChvdXRGaWxlTmFtZSwgb3V0RGF0YSwgd3JpdGVCeXRlT3JkZXJNYXJrLCBvbkVycm9yPywgc291cmNlRmlsZXM/KSA9PiB7XG4gICAgICAgICAgY29uc3Qgc291cmNlRmlsZSA9IHNvdXJjZUZpbGVzICYmIHNvdXJjZUZpbGVzLmxlbmd0aCA9PSAxID8gc291cmNlRmlsZXNbMF0gOiBudWxsO1xuICAgICAgICAgIGxldCBnZW5GaWxlOiBHZW5lcmF0ZWRGaWxlfHVuZGVmaW5lZDtcbiAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmFubm90YXRlRm9yQ2xvc3VyZUNvbXBpbGVyICYmIHNvdXJjZUZpbGUgJiZcbiAgICAgICAgICAgICAgVFMudGVzdChzb3VyY2VGaWxlLmZpbGVOYW1lKSkge1xuICAgICAgICAgICAgb3V0RGF0YSA9IG5vY29sbGFwc2VIYWNrKG91dERhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLndyaXRlRmlsZShvdXRGaWxlTmFtZSwgb3V0RGF0YSwgd3JpdGVCeXRlT3JkZXJNYXJrLCBvbkVycm9yLCB1bmRlZmluZWQsIHNvdXJjZUZpbGVzKTtcbiAgICAgICAgfTtcblxuICAgIGNvbnN0IGVtaXRPbmx5RHRzRmlsZXMgPSAoZW1pdEZsYWdzICYgKEVtaXRGbGFncy5EVFMgfCBFbWl0RmxhZ3MuSlMpKSA9PSBFbWl0RmxhZ3MuRFRTO1xuXG4gICAgY29uc3QgdHNDdXN0b21UcmFuc2Zvcm1lcnMgPSB0aGlzLmNhbGN1bGF0ZVRyYW5zZm9ybXMoXG4gICAgICAgIC8qIGdlbkZpbGVzICovIHVuZGVmaW5lZCwgLyogcGFydGlhbE1vZHVsZXMgKi8gbW9kdWxlcyxcbiAgICAgICAgLyogc3RyaXBEZWNvcmF0b3JzICovIHRoaXMucmVpZmllZERlY29yYXRvcnMsIGN1c3RvbVRyYW5zZm9ybWVycyk7XG5cblxuICAgIC8vIFJlc3RvcmUgdGhlIG9yaWdpbmFsIHJlZmVyZW5jZXMgYmVmb3JlIHdlIGVtaXQgc28gVHlwZVNjcmlwdCBkb2Vzbid0IGVtaXRcbiAgICAvLyBhIHJlZmVyZW5jZSB0byB0aGUgLmQudHMgZmlsZS5cbiAgICBjb25zdCBhdWdtZW50ZWRSZWZlcmVuY2VzID0gbmV3IE1hcDx0cy5Tb3VyY2VGaWxlLCBSZWFkb25seUFycmF5PHRzLkZpbGVSZWZlcmVuY2U+PigpO1xuICAgIGZvciAoY29uc3Qgc291cmNlRmlsZSBvZiB0aGlzLnRzUHJvZ3JhbS5nZXRTb3VyY2VGaWxlcygpKSB7XG4gICAgICBjb25zdCBvcmlnaW5hbFJlZmVyZW5jZXMgPSBnZXRPcmlnaW5hbFJlZmVyZW5jZXMoc291cmNlRmlsZSk7XG4gICAgICBpZiAob3JpZ2luYWxSZWZlcmVuY2VzKSB7XG4gICAgICAgIGF1Z21lbnRlZFJlZmVyZW5jZXMuc2V0KHNvdXJjZUZpbGUsIHNvdXJjZUZpbGUucmVmZXJlbmNlZEZpbGVzKTtcbiAgICAgICAgc291cmNlRmlsZS5yZWZlcmVuY2VkRmlsZXMgPSBvcmlnaW5hbFJlZmVyZW5jZXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBlbWl0Q2FsbGJhY2soe1xuICAgICAgICBwcm9ncmFtOiB0aGlzLnRzUHJvZ3JhbSxcbiAgICAgICAgaG9zdDogdGhpcy5ob3N0LFxuICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICAgIHdyaXRlRmlsZTogd3JpdGVUc0ZpbGUsIGVtaXRPbmx5RHRzRmlsZXMsXG4gICAgICAgIGN1c3RvbVRyYW5zZm9ybWVyczogdHNDdXN0b21UcmFuc2Zvcm1lcnNcbiAgICAgIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICAvLyBSZXN0b3JlIHRoZSByZWZlcmVuY2VzIGJhY2sgdG8gdGhlIGF1Z21lbnRlZCB2YWx1ZSB0byBlbnN1cmUgdGhhdCB0aGVcbiAgICAgIC8vIGNoZWNrcyB0aGF0IFR5cGVTY3JpcHQgbWFrZXMgZm9yIHByb2plY3Qgc3RydWN0dXJlIHJldXNlIHdpbGwgc3VjY2VlZC5cbiAgICAgIGZvciAoY29uc3QgW3NvdXJjZUZpbGUsIHJlZmVyZW5jZXNdIG9mIEFycmF5LmZyb20oYXVnbWVudGVkUmVmZXJlbmNlcykpIHtcbiAgICAgICAgLy8gVE9ETyhjaHVja2opOiBSZW1vdmUgYW55IGNhc3QgYWZ0ZXIgdXBkYXRpbmcgYnVpbGQgdG8gMi42XG4gICAgICAgIChzb3VyY2VGaWxlIGFzIGFueSkucmVmZXJlbmNlZEZpbGVzID0gcmVmZXJlbmNlcztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9lbWl0UmVuZGVyMihcbiAgICAgIHtcbiAgICAgICAgICBlbWl0RmxhZ3MgPSBFbWl0RmxhZ3MuRGVmYXVsdCwgY2FuY2VsbGF0aW9uVG9rZW4sIGN1c3RvbVRyYW5zZm9ybWVycyxcbiAgICAgICAgICBlbWl0Q2FsbGJhY2sgPSBkZWZhdWx0RW1pdENhbGxiYWNrLCBtZXJnZUVtaXRSZXN1bHRzQ2FsbGJhY2sgPSBtZXJnZUVtaXRSZXN1bHRzLFxuICAgICAgfToge1xuICAgICAgICBlbWl0RmxhZ3M/OiBFbWl0RmxhZ3MsXG4gICAgICAgIGNhbmNlbGxhdGlvblRva2VuPzogdHMuQ2FuY2VsbGF0aW9uVG9rZW4sXG4gICAgICAgIGN1c3RvbVRyYW5zZm9ybWVycz86IEN1c3RvbVRyYW5zZm9ybWVycyxcbiAgICAgICAgZW1pdENhbGxiYWNrPzogVHNFbWl0Q2FsbGJhY2ssXG4gICAgICAgIG1lcmdlRW1pdFJlc3VsdHNDYWxsYmFjaz86IFRzTWVyZ2VFbWl0UmVzdWx0c0NhbGxiYWNrLFxuICAgICAgfSA9IHt9KTogdHMuRW1pdFJlc3VsdCB7XG4gICAgY29uc3QgZW1pdFN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICBpZiAoZW1pdEZsYWdzICYgRW1pdEZsYWdzLkkxOG5CdW5kbGUpIHtcbiAgICAgIGNvbnN0IGxvY2FsZSA9IHRoaXMub3B0aW9ucy5pMThuT3V0TG9jYWxlIHx8IG51bGw7XG4gICAgICBjb25zdCBmaWxlID0gdGhpcy5vcHRpb25zLmkxOG5PdXRGaWxlIHx8IG51bGw7XG4gICAgICBjb25zdCBmb3JtYXQgPSB0aGlzLm9wdGlvbnMuaTE4bk91dEZvcm1hdCB8fCBudWxsO1xuICAgICAgY29uc3QgYnVuZGxlID0gdGhpcy5jb21waWxlci5lbWl0TWVzc2FnZUJ1bmRsZSh0aGlzLmFuYWx5emVkTW9kdWxlcywgbG9jYWxlKTtcbiAgICAgIGkxOG5FeHRyYWN0KGZvcm1hdCwgZmlsZSwgdGhpcy5ob3N0LCB0aGlzLm9wdGlvbnMsIGJ1bmRsZSk7XG4gICAgfVxuICAgIGlmICgoZW1pdEZsYWdzICYgKEVtaXRGbGFncy5KUyB8IEVtaXRGbGFncy5EVFMgfCBFbWl0RmxhZ3MuTWV0YWRhdGEgfCBFbWl0RmxhZ3MuQ29kZWdlbikpID09PVxuICAgICAgICAwKSB7XG4gICAgICByZXR1cm4ge2VtaXRTa2lwcGVkOiB0cnVlLCBkaWFnbm9zdGljczogW10sIGVtaXR0ZWRGaWxlczogW119O1xuICAgIH1cbiAgICBsZXQge2dlbkZpbGVzLCBnZW5EaWFnc30gPSB0aGlzLmdlbmVyYXRlRmlsZXNGb3JFbWl0KGVtaXRGbGFncyk7XG4gICAgaWYgKGdlbkRpYWdzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGlhZ25vc3RpY3M6IGdlbkRpYWdzLFxuICAgICAgICBlbWl0U2tpcHBlZDogdHJ1ZSxcbiAgICAgICAgZW1pdHRlZEZpbGVzOiBbXSxcbiAgICAgIH07XG4gICAgfVxuICAgIHRoaXMuZW1pdHRlZEdlbmVyYXRlZEZpbGVzID0gZ2VuRmlsZXM7XG4gICAgY29uc3Qgb3V0U3JjTWFwcGluZzogQXJyYXk8e3NvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsIG91dEZpbGVOYW1lOiBzdHJpbmd9PiA9IFtdO1xuICAgIGNvbnN0IGdlbkZpbGVCeUZpbGVOYW1lID0gbmV3IE1hcDxzdHJpbmcsIEdlbmVyYXRlZEZpbGU+KCk7XG4gICAgZ2VuRmlsZXMuZm9yRWFjaChnZW5GaWxlID0+IGdlbkZpbGVCeUZpbGVOYW1lLnNldChnZW5GaWxlLmdlbkZpbGVVcmwsIGdlbkZpbGUpKTtcbiAgICB0aGlzLmVtaXR0ZWRMaWJyYXJ5U3VtbWFyaWVzID0gW107XG4gICAgY29uc3QgZW1pdHRlZFNvdXJjZUZpbGVzID0gW10gYXMgdHMuU291cmNlRmlsZVtdO1xuICAgIGNvbnN0IHdyaXRlVHNGaWxlOiB0cy5Xcml0ZUZpbGVDYWxsYmFjayA9XG4gICAgICAgIChvdXRGaWxlTmFtZSwgb3V0RGF0YSwgd3JpdGVCeXRlT3JkZXJNYXJrLCBvbkVycm9yPywgc291cmNlRmlsZXM/KSA9PiB7XG4gICAgICAgICAgY29uc3Qgc291cmNlRmlsZSA9IHNvdXJjZUZpbGVzICYmIHNvdXJjZUZpbGVzLmxlbmd0aCA9PSAxID8gc291cmNlRmlsZXNbMF0gOiBudWxsO1xuICAgICAgICAgIGxldCBnZW5GaWxlOiBHZW5lcmF0ZWRGaWxlfHVuZGVmaW5lZDtcbiAgICAgICAgICBpZiAoc291cmNlRmlsZSkge1xuICAgICAgICAgICAgb3V0U3JjTWFwcGluZy5wdXNoKHtvdXRGaWxlTmFtZTogb3V0RmlsZU5hbWUsIHNvdXJjZUZpbGV9KTtcbiAgICAgICAgICAgIGdlbkZpbGUgPSBnZW5GaWxlQnlGaWxlTmFtZS5nZXQoc291cmNlRmlsZS5maWxlTmFtZSk7XG4gICAgICAgICAgICBpZiAoIXNvdXJjZUZpbGUuaXNEZWNsYXJhdGlvbkZpbGUgJiYgIUdFTkVSQVRFRF9GSUxFUy50ZXN0KHNvdXJjZUZpbGUuZmlsZU5hbWUpKSB7XG4gICAgICAgICAgICAgIC8vIE5vdGU6IHNvdXJjZUZpbGUgaXMgdGhlIHRyYW5zZm9ybWVkIHNvdXJjZWZpbGUsIG5vdCB0aGUgb3JpZ2luYWwgb25lIVxuICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbEZpbGUgPSB0aGlzLnRzUHJvZ3JhbS5nZXRTb3VyY2VGaWxlKHNvdXJjZUZpbGUuZmlsZU5hbWUpO1xuICAgICAgICAgICAgICBpZiAob3JpZ2luYWxGaWxlKSB7XG4gICAgICAgICAgICAgICAgZW1pdHRlZFNvdXJjZUZpbGVzLnB1c2gob3JpZ2luYWxGaWxlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbm5vdGF0ZUZvckNsb3N1cmVDb21waWxlciAmJiBUUy50ZXN0KHNvdXJjZUZpbGUuZmlsZU5hbWUpKSB7XG4gICAgICAgICAgICAgIG91dERhdGEgPSBub2NvbGxhcHNlSGFjayhvdXREYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy53cml0ZUZpbGUob3V0RmlsZU5hbWUsIG91dERhdGEsIHdyaXRlQnl0ZU9yZGVyTWFyaywgb25FcnJvciwgZ2VuRmlsZSwgc291cmNlRmlsZXMpO1xuICAgICAgICB9O1xuXG4gICAgY29uc3QgbW9kdWxlcyA9IHRoaXMuX2FuYWx5emVkSW5qZWN0YWJsZXMgJiZcbiAgICAgICAgdGhpcy5jb21waWxlci5lbWl0QWxsUGFydGlhbE1vZHVsZXMyKHRoaXMuX2FuYWx5emVkSW5qZWN0YWJsZXMpO1xuXG4gICAgY29uc3QgdHNDdXN0b21UcmFuc2Zvcm1lcnMgPSB0aGlzLmNhbGN1bGF0ZVRyYW5zZm9ybXMoXG4gICAgICAgIGdlbkZpbGVCeUZpbGVOYW1lLCBtb2R1bGVzLCAvKiBzdHJpcERlY29yYXRvcnMgKi8gdW5kZWZpbmVkLCBjdXN0b21UcmFuc2Zvcm1lcnMpO1xuICAgIGNvbnN0IGVtaXRPbmx5RHRzRmlsZXMgPSAoZW1pdEZsYWdzICYgKEVtaXRGbGFncy5EVFMgfCBFbWl0RmxhZ3MuSlMpKSA9PSBFbWl0RmxhZ3MuRFRTO1xuICAgIC8vIFJlc3RvcmUgdGhlIG9yaWdpbmFsIHJlZmVyZW5jZXMgYmVmb3JlIHdlIGVtaXQgc28gVHlwZVNjcmlwdCBkb2Vzbid0IGVtaXRcbiAgICAvLyBhIHJlZmVyZW5jZSB0byB0aGUgLmQudHMgZmlsZS5cbiAgICBjb25zdCBhdWdtZW50ZWRSZWZlcmVuY2VzID0gbmV3IE1hcDx0cy5Tb3VyY2VGaWxlLCBSZWFkb25seUFycmF5PHRzLkZpbGVSZWZlcmVuY2U+PigpO1xuICAgIGZvciAoY29uc3Qgc291cmNlRmlsZSBvZiB0aGlzLnRzUHJvZ3JhbS5nZXRTb3VyY2VGaWxlcygpKSB7XG4gICAgICBjb25zdCBvcmlnaW5hbFJlZmVyZW5jZXMgPSBnZXRPcmlnaW5hbFJlZmVyZW5jZXMoc291cmNlRmlsZSk7XG4gICAgICBpZiAob3JpZ2luYWxSZWZlcmVuY2VzKSB7XG4gICAgICAgIGF1Z21lbnRlZFJlZmVyZW5jZXMuc2V0KHNvdXJjZUZpbGUsIHNvdXJjZUZpbGUucmVmZXJlbmNlZEZpbGVzKTtcbiAgICAgICAgc291cmNlRmlsZS5yZWZlcmVuY2VkRmlsZXMgPSBvcmlnaW5hbFJlZmVyZW5jZXM7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGdlblRzRmlsZXM6IEdlbmVyYXRlZEZpbGVbXSA9IFtdO1xuICAgIGNvbnN0IGdlbkpzb25GaWxlczogR2VuZXJhdGVkRmlsZVtdID0gW107XG4gICAgZ2VuRmlsZXMuZm9yRWFjaChnZiA9PiB7XG4gICAgICBpZiAoZ2Yuc3RtdHMpIHtcbiAgICAgICAgZ2VuVHNGaWxlcy5wdXNoKGdmKTtcbiAgICAgIH1cbiAgICAgIGlmIChnZi5zb3VyY2UpIHtcbiAgICAgICAgZ2VuSnNvbkZpbGVzLnB1c2goZ2YpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGxldCBlbWl0UmVzdWx0OiB0cy5FbWl0UmVzdWx0O1xuICAgIGxldCBlbWl0dGVkVXNlclRzQ291bnQ6IG51bWJlcjtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc291cmNlRmlsZXNUb0VtaXQgPSB0aGlzLmdldFNvdXJjZUZpbGVzRm9yRW1pdCgpO1xuICAgICAgaWYgKHNvdXJjZUZpbGVzVG9FbWl0ICYmXG4gICAgICAgICAgKHNvdXJjZUZpbGVzVG9FbWl0Lmxlbmd0aCArIGdlblRzRmlsZXMubGVuZ3RoKSA8IE1BWF9GSUxFX0NPVU5UX0ZPUl9TSU5HTEVfRklMRV9FTUlUKSB7XG4gICAgICAgIGNvbnN0IGZpbGVOYW1lc1RvRW1pdCA9XG4gICAgICAgICAgICBbLi4uc291cmNlRmlsZXNUb0VtaXQubWFwKHNmID0+IHNmLmZpbGVOYW1lKSwgLi4uZ2VuVHNGaWxlcy5tYXAoZ2YgPT4gZ2YuZ2VuRmlsZVVybCldO1xuICAgICAgICBlbWl0UmVzdWx0ID0gbWVyZ2VFbWl0UmVzdWx0c0NhbGxiYWNrKFxuICAgICAgICAgICAgZmlsZU5hbWVzVG9FbWl0Lm1hcCgoZmlsZU5hbWUpID0+IGVtaXRSZXN1bHQgPSBlbWl0Q2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyYW06IHRoaXMudHNQcm9ncmFtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvc3Q6IHRoaXMuaG9zdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVGaWxlOiB3cml0ZVRzRmlsZSwgZW1pdE9ubHlEdHNGaWxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21UcmFuc2Zvcm1lcnM6IHRzQ3VzdG9tVHJhbnNmb3JtZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFNvdXJjZUZpbGU6IHRoaXMudHNQcm9ncmFtLmdldFNvdXJjZUZpbGUoZmlsZU5hbWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkpO1xuICAgICAgICBlbWl0dGVkVXNlclRzQ291bnQgPSBzb3VyY2VGaWxlc1RvRW1pdC5sZW5ndGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbWl0UmVzdWx0ID0gZW1pdENhbGxiYWNrKHtcbiAgICAgICAgICBwcm9ncmFtOiB0aGlzLnRzUHJvZ3JhbSxcbiAgICAgICAgICBob3N0OiB0aGlzLmhvc3QsXG4gICAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICAgIHdyaXRlRmlsZTogd3JpdGVUc0ZpbGUsIGVtaXRPbmx5RHRzRmlsZXMsXG4gICAgICAgICAgY3VzdG9tVHJhbnNmb3JtZXJzOiB0c0N1c3RvbVRyYW5zZm9ybWVyc1xuICAgICAgICB9KTtcbiAgICAgICAgZW1pdHRlZFVzZXJUc0NvdW50ID0gdGhpcy50c1Byb2dyYW0uZ2V0U291cmNlRmlsZXMoKS5sZW5ndGggLSBnZW5Uc0ZpbGVzLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgLy8gUmVzdG9yZSB0aGUgcmVmZXJlbmNlcyBiYWNrIHRvIHRoZSBhdWdtZW50ZWQgdmFsdWUgdG8gZW5zdXJlIHRoYXQgdGhlXG4gICAgICAvLyBjaGVja3MgdGhhdCBUeXBlU2NyaXB0IG1ha2VzIGZvciBwcm9qZWN0IHN0cnVjdHVyZSByZXVzZSB3aWxsIHN1Y2NlZWQuXG4gICAgICBmb3IgKGNvbnN0IFtzb3VyY2VGaWxlLCByZWZlcmVuY2VzXSBvZiBBcnJheS5mcm9tKGF1Z21lbnRlZFJlZmVyZW5jZXMpKSB7XG4gICAgICAgIC8vIFRPRE8oY2h1Y2tqKTogUmVtb3ZlIGFueSBjYXN0IGFmdGVyIHVwZGF0aW5nIGJ1aWxkIHRvIDIuNlxuICAgICAgICAoc291cmNlRmlsZSBhcyBhbnkpLnJlZmVyZW5jZWRGaWxlcyA9IHJlZmVyZW5jZXM7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZW1pdHRlZFNvdXJjZUZpbGVzID0gZW1pdHRlZFNvdXJjZUZpbGVzO1xuXG4gICAgLy8gTWF0Y2ggYmVoYXZpb3Igb2YgdHNjOiBvbmx5IHByb2R1Y2UgZW1pdCBkaWFnbm9zdGljcyBpZiBpdCB3b3VsZCBibG9ja1xuICAgIC8vIGVtaXQuIElmIG5vRW1pdE9uRXJyb3IgaXMgZmFsc2UsIHRoZSBlbWl0IHdpbGwgaGFwcGVuIGluIHNwaXRlIG9mIGFueVxuICAgIC8vIGVycm9ycywgc28gd2Ugc2hvdWxkIG5vdCByZXBvcnQgdGhlbS5cbiAgICBpZiAodGhpcy5vcHRpb25zLm5vRW1pdE9uRXJyb3IgPT09IHRydWUpIHtcbiAgICAgIC8vIHRyYW5zbGF0ZSB0aGUgZGlhZ25vc3RpY3MgaW4gdGhlIGVtaXRSZXN1bHQgYXMgd2VsbC5cbiAgICAgIGNvbnN0IHRyYW5zbGF0ZWRFbWl0RGlhZ3MgPSB0cmFuc2xhdGVEaWFnbm9zdGljcyh0aGlzLmhvc3RBZGFwdGVyLCBlbWl0UmVzdWx0LmRpYWdub3N0aWNzKTtcbiAgICAgIGVtaXRSZXN1bHQuZGlhZ25vc3RpY3MgPSB0cmFuc2xhdGVkRW1pdERpYWdzLnRzLmNvbmNhdChcbiAgICAgICAgICB0aGlzLnN0cnVjdHVyYWxEaWFnbm9zdGljcy5jb25jYXQodHJhbnNsYXRlZEVtaXREaWFncy5uZykubWFwKG5nVG9Uc0RpYWdub3N0aWMpKTtcbiAgICB9XG5cbiAgICBpZiAoIW91dFNyY01hcHBpbmcubGVuZ3RoKSB7XG4gICAgICAvLyBpZiBubyBmaWxlcyB3ZXJlIGVtaXR0ZWQgYnkgVHlwZVNjcmlwdCwgYWxzbyBkb24ndCBlbWl0IC5qc29uIGZpbGVzXG4gICAgICBlbWl0UmVzdWx0LmRpYWdub3N0aWNzID1cbiAgICAgICAgICBlbWl0UmVzdWx0LmRpYWdub3N0aWNzLmNvbmNhdChbY3JlYXRlTWVzc2FnZURpYWdub3N0aWMoYEVtaXR0ZWQgbm8gZmlsZXMuYCldKTtcbiAgICAgIHJldHVybiBlbWl0UmVzdWx0O1xuICAgIH1cblxuICAgIGxldCBzYW1wbGVTcmNGaWxlTmFtZTogc3RyaW5nfHVuZGVmaW5lZDtcbiAgICBsZXQgc2FtcGxlT3V0RmlsZU5hbWU6IHN0cmluZ3x1bmRlZmluZWQ7XG4gICAgaWYgKG91dFNyY01hcHBpbmcubGVuZ3RoKSB7XG4gICAgICBzYW1wbGVTcmNGaWxlTmFtZSA9IG91dFNyY01hcHBpbmdbMF0uc291cmNlRmlsZS5maWxlTmFtZTtcbiAgICAgIHNhbXBsZU91dEZpbGVOYW1lID0gb3V0U3JjTWFwcGluZ1swXS5vdXRGaWxlTmFtZTtcbiAgICB9XG4gICAgY29uc3Qgc3JjVG9PdXRQYXRoID1cbiAgICAgICAgY3JlYXRlU3JjVG9PdXRQYXRoTWFwcGVyKHRoaXMub3B0aW9ucy5vdXREaXIsIHNhbXBsZVNyY0ZpbGVOYW1lLCBzYW1wbGVPdXRGaWxlTmFtZSk7XG4gICAgaWYgKGVtaXRGbGFncyAmIEVtaXRGbGFncy5Db2RlZ2VuKSB7XG4gICAgICBnZW5Kc29uRmlsZXMuZm9yRWFjaChnZiA9PiB7XG4gICAgICAgIGNvbnN0IG91dEZpbGVOYW1lID0gc3JjVG9PdXRQYXRoKGdmLmdlbkZpbGVVcmwpO1xuICAgICAgICB0aGlzLndyaXRlRmlsZShvdXRGaWxlTmFtZSwgZ2Yuc291cmNlICEsIGZhbHNlLCB1bmRlZmluZWQsIGdmKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBsZXQgbWV0YWRhdGFKc29uQ291bnQgPSAwO1xuICAgIGlmIChlbWl0RmxhZ3MgJiBFbWl0RmxhZ3MuTWV0YWRhdGEpIHtcbiAgICAgIHRoaXMudHNQcm9ncmFtLmdldFNvdXJjZUZpbGVzKCkuZm9yRWFjaChzZiA9PiB7XG4gICAgICAgIGlmICghc2YuaXNEZWNsYXJhdGlvbkZpbGUgJiYgIUdFTkVSQVRFRF9GSUxFUy50ZXN0KHNmLmZpbGVOYW1lKSkge1xuICAgICAgICAgIG1ldGFkYXRhSnNvbkNvdW50Kys7XG4gICAgICAgICAgY29uc3QgbWV0YWRhdGEgPSB0aGlzLm1ldGFkYXRhQ2FjaGUuZ2V0TWV0YWRhdGEoc2YpO1xuICAgICAgICAgIGlmIChtZXRhZGF0YSkge1xuICAgICAgICAgICAgY29uc3QgbWV0YWRhdGFUZXh0ID0gSlNPTi5zdHJpbmdpZnkoW21ldGFkYXRhXSk7XG4gICAgICAgICAgICBjb25zdCBvdXRGaWxlTmFtZSA9IHNyY1RvT3V0UGF0aChzZi5maWxlTmFtZS5yZXBsYWNlKC9cXC50c3g/JC8sICcubWV0YWRhdGEuanNvbicpKTtcbiAgICAgICAgICAgIHRoaXMud3JpdGVGaWxlKG91dEZpbGVOYW1lLCBtZXRhZGF0YVRleHQsIGZhbHNlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgW3NmXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgZW1pdEVuZCA9IERhdGUubm93KCk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaWFnbm9zdGljcykge1xuICAgICAgZW1pdFJlc3VsdC5kaWFnbm9zdGljcyA9IGVtaXRSZXN1bHQuZGlhZ25vc3RpY3MuY29uY2F0KFtjcmVhdGVNZXNzYWdlRGlhZ25vc3RpYyhbXG4gICAgICAgIGBFbWl0dGVkIGluICR7ZW1pdEVuZCAtIGVtaXRTdGFydH1tc2AsXG4gICAgICAgIGAtICR7ZW1pdHRlZFVzZXJUc0NvdW50fSB1c2VyIHRzIGZpbGVzYCxcbiAgICAgICAgYC0gJHtnZW5Uc0ZpbGVzLmxlbmd0aH0gZ2VuZXJhdGVkIHRzIGZpbGVzYCxcbiAgICAgICAgYC0gJHtnZW5Kc29uRmlsZXMubGVuZ3RoICsgbWV0YWRhdGFKc29uQ291bnR9IGdlbmVyYXRlZCBqc29uIGZpbGVzYCxcbiAgICAgIF0uam9pbignXFxuJykpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVtaXRSZXN1bHQ7XG4gIH1cblxuICAvLyBQcml2YXRlIG1lbWJlcnNcbiAgcHJpdmF0ZSBnZXQgY29tcGlsZXIoKTogQW90Q29tcGlsZXIge1xuICAgIGlmICghdGhpcy5fY29tcGlsZXIpIHtcbiAgICAgIHRoaXMuX2NyZWF0ZUNvbXBpbGVyKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jb21waWxlciAhO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgaG9zdEFkYXB0ZXIoKTogVHNDb21waWxlckFvdENvbXBpbGVyVHlwZUNoZWNrSG9zdEFkYXB0ZXIge1xuICAgIGlmICghdGhpcy5faG9zdEFkYXB0ZXIpIHtcbiAgICAgIHRoaXMuX2NyZWF0ZUNvbXBpbGVyKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9ob3N0QWRhcHRlciAhO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgYW5hbHl6ZWRNb2R1bGVzKCk6IE5nQW5hbHl6ZWRNb2R1bGVzIHtcbiAgICBpZiAoIXRoaXMuX2FuYWx5emVkTW9kdWxlcykge1xuICAgICAgdGhpcy5pbml0U3luYygpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYW5hbHl6ZWRNb2R1bGVzICE7XG4gIH1cblxuICBwcml2YXRlIGdldCBzdHJ1Y3R1cmFsRGlhZ25vc3RpY3MoKTogUmVhZG9ubHlBcnJheTxEaWFnbm9zdGljPiB7XG4gICAgbGV0IGRpYWdub3N0aWNzID0gdGhpcy5fc3RydWN0dXJhbERpYWdub3N0aWNzO1xuICAgIGlmICghZGlhZ25vc3RpY3MpIHtcbiAgICAgIHRoaXMuaW5pdFN5bmMoKTtcbiAgICAgIGRpYWdub3N0aWNzID0gKHRoaXMuX3N0cnVjdHVyYWxEaWFnbm9zdGljcyA9IHRoaXMuX3N0cnVjdHVyYWxEaWFnbm9zdGljcyB8fCBbXSk7XG4gICAgfVxuICAgIHJldHVybiBkaWFnbm9zdGljcztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHRzUHJvZ3JhbSgpOiB0cy5Qcm9ncmFtIHtcbiAgICBpZiAoIXRoaXMuX3RzUHJvZ3JhbSkge1xuICAgICAgdGhpcy5pbml0U3luYygpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdHNQcm9ncmFtICE7XG4gIH1cblxuICBwcml2YXRlIGdldCByZWlmaWVkRGVjb3JhdG9ycygpOiBTZXQ8U3RhdGljU3ltYm9sPiB7XG4gICAgaWYgKCF0aGlzLl9yZWlmaWVkRGVjb3JhdG9ycykge1xuICAgICAgY29uc3QgcmVmbGVjdG9yID0gdGhpcy5jb21waWxlci5yZWZsZWN0b3I7XG4gICAgICB0aGlzLl9yZWlmaWVkRGVjb3JhdG9ycyA9IG5ldyBTZXQoXG4gICAgICAgICAgUjNfUkVJRklFRF9ERUNPUkFUT1JTLm1hcChuYW1lID0+IHJlZmxlY3Rvci5maW5kRGVjbGFyYXRpb24oJ0Bhbmd1bGFyL2NvcmUnLCBuYW1lKSkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcmVpZmllZERlY29yYXRvcnM7XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZVRyYW5zZm9ybXMoXG4gICAgICBnZW5GaWxlczogTWFwPHN0cmluZywgR2VuZXJhdGVkRmlsZT58dW5kZWZpbmVkLCBwYXJ0aWFsTW9kdWxlczogUGFydGlhbE1vZHVsZVtdfHVuZGVmaW5lZCxcbiAgICAgIHN0cmlwRGVjb3JhdG9yczogU2V0PFN0YXRpY1N5bWJvbD58dW5kZWZpbmVkLFxuICAgICAgY3VzdG9tVHJhbnNmb3JtZXJzPzogQ3VzdG9tVHJhbnNmb3JtZXJzKTogdHMuQ3VzdG9tVHJhbnNmb3JtZXJzIHtcbiAgICBjb25zdCBiZWZvcmVUczogQXJyYXk8dHMuVHJhbnNmb3JtZXJGYWN0b3J5PHRzLlNvdXJjZUZpbGU+PiA9IFtdO1xuICAgIGNvbnN0IG1ldGFkYXRhVHJhbnNmb3JtczogTWV0YWRhdGFUcmFuc2Zvcm1lcltdID0gW107XG4gICAgY29uc3QgZmxhdE1vZHVsZU1ldGFkYXRhVHJhbnNmb3JtczogTWV0YWRhdGFUcmFuc2Zvcm1lcltdID0gW107XG4gICAgaWYgKHRoaXMub3B0aW9ucy5lbmFibGVSZXNvdXJjZUlubGluaW5nKSB7XG4gICAgICBiZWZvcmVUcy5wdXNoKGdldElubGluZVJlc291cmNlc1RyYW5zZm9ybUZhY3RvcnkodGhpcy50c1Byb2dyYW0sIHRoaXMuaG9zdEFkYXB0ZXIpKTtcbiAgICAgIGNvbnN0IHRyYW5zZm9ybWVyID0gbmV3IElubGluZVJlc291cmNlc01ldGFkYXRhVHJhbnNmb3JtZXIodGhpcy5ob3N0QWRhcHRlcik7XG4gICAgICBtZXRhZGF0YVRyYW5zZm9ybXMucHVzaCh0cmFuc2Zvcm1lcik7XG4gICAgICBmbGF0TW9kdWxlTWV0YWRhdGFUcmFuc2Zvcm1zLnB1c2godHJhbnNmb3JtZXIpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vcHRpb25zLmRpc2FibGVFeHByZXNzaW9uTG93ZXJpbmcpIHtcbiAgICAgIGJlZm9yZVRzLnB1c2goXG4gICAgICAgICAgZ2V0RXhwcmVzc2lvbkxvd2VyaW5nVHJhbnNmb3JtRmFjdG9yeSh0aGlzLmxvd2VyaW5nTWV0YWRhdGFUcmFuc2Zvcm0sIHRoaXMudHNQcm9ncmFtKSk7XG4gICAgICBtZXRhZGF0YVRyYW5zZm9ybXMucHVzaCh0aGlzLmxvd2VyaW5nTWV0YWRhdGFUcmFuc2Zvcm0pO1xuICAgIH1cbiAgICBpZiAoZ2VuRmlsZXMpIHtcbiAgICAgIGJlZm9yZVRzLnB1c2goZ2V0QW5ndWxhckVtaXR0ZXJUcmFuc2Zvcm1GYWN0b3J5KGdlbkZpbGVzLCB0aGlzLmdldFRzUHJvZ3JhbSgpKSk7XG4gICAgfVxuICAgIGlmIChwYXJ0aWFsTW9kdWxlcykge1xuICAgICAgYmVmb3JlVHMucHVzaChnZXRBbmd1bGFyQ2xhc3NUcmFuc2Zvcm1lckZhY3RvcnkocGFydGlhbE1vZHVsZXMpKTtcblxuICAgICAgLy8gSWYgd2UgaGF2ZSBwYXJ0aWFsIG1vZHVsZXMsIHRoZSBjYWNoZWQgbWV0YWRhdGEgbWlnaHQgYmUgaW5jb3JyZWN0IGFzIGl0IGRvZXNuJ3QgcmVmbGVjdFxuICAgICAgLy8gdGhlIHBhcnRpYWwgbW9kdWxlIHRyYW5zZm9ybXMuXG4gICAgICBjb25zdCB0cmFuc2Zvcm1lciA9IG5ldyBQYXJ0aWFsTW9kdWxlTWV0YWRhdGFUcmFuc2Zvcm1lcihwYXJ0aWFsTW9kdWxlcyk7XG4gICAgICBtZXRhZGF0YVRyYW5zZm9ybXMucHVzaCh0cmFuc2Zvcm1lcik7XG4gICAgICBmbGF0TW9kdWxlTWV0YWRhdGFUcmFuc2Zvcm1zLnB1c2godHJhbnNmb3JtZXIpO1xuICAgIH1cblxuICAgIGlmIChzdHJpcERlY29yYXRvcnMpIHtcbiAgICAgIGJlZm9yZVRzLnB1c2goZ2V0RGVjb3JhdG9yU3RyaXBUcmFuc2Zvcm1lckZhY3RvcnkoXG4gICAgICAgICAgc3RyaXBEZWNvcmF0b3JzLCB0aGlzLmNvbXBpbGVyLnJlZmxlY3RvciwgdGhpcy5nZXRUc1Byb2dyYW0oKS5nZXRUeXBlQ2hlY2tlcigpKSk7XG4gICAgICBjb25zdCB0cmFuc2Zvcm1lciA9XG4gICAgICAgICAgbmV3IFN0cmlwRGVjb3JhdG9yc01ldGFkYXRhVHJhbnNmb3JtZXIoc3RyaXBEZWNvcmF0b3JzLCB0aGlzLmNvbXBpbGVyLnJlZmxlY3Rvcik7XG4gICAgICBtZXRhZGF0YVRyYW5zZm9ybXMucHVzaCh0cmFuc2Zvcm1lcik7XG4gICAgICBmbGF0TW9kdWxlTWV0YWRhdGFUcmFuc2Zvcm1zLnB1c2godHJhbnNmb3JtZXIpO1xuICAgIH1cblxuICAgIGlmIChjdXN0b21UcmFuc2Zvcm1lcnMgJiYgY3VzdG9tVHJhbnNmb3JtZXJzLmJlZm9yZVRzKSB7XG4gICAgICBiZWZvcmVUcy5wdXNoKC4uLmN1c3RvbVRyYW5zZm9ybWVycy5iZWZvcmVUcyk7XG4gICAgfVxuICAgIGlmIChtZXRhZGF0YVRyYW5zZm9ybXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5tZXRhZGF0YUNhY2hlID0gdGhpcy5jcmVhdGVNZXRhZGF0YUNhY2hlKG1ldGFkYXRhVHJhbnNmb3Jtcyk7XG4gICAgfVxuICAgIGlmIChmbGF0TW9kdWxlTWV0YWRhdGFUcmFuc2Zvcm1zLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZmxhdE1vZHVsZU1ldGFkYXRhQ2FjaGUgPSB0aGlzLmNyZWF0ZU1ldGFkYXRhQ2FjaGUoZmxhdE1vZHVsZU1ldGFkYXRhVHJhbnNmb3Jtcyk7XG4gICAgfVxuICAgIGNvbnN0IGFmdGVyVHMgPSBjdXN0b21UcmFuc2Zvcm1lcnMgPyBjdXN0b21UcmFuc2Zvcm1lcnMuYWZ0ZXJUcyA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4ge2JlZm9yZTogYmVmb3JlVHMsIGFmdGVyOiBhZnRlclRzfTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFN5bmMoKSB7XG4gICAgaWYgKHRoaXMuX2FuYWx5emVkTW9kdWxlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgY29uc3Qge3RtcFByb2dyYW0sIHNvdXJjZUZpbGVzLCB0c0ZpbGVzLCByb290TmFtZXN9ID0gdGhpcy5fY3JlYXRlUHJvZ3JhbVdpdGhCYXNpY1N0dWJzKCk7XG4gICAgICBjb25zdCB7YW5hbHl6ZWRNb2R1bGVzLCBhbmFseXplZEluamVjdGFibGVzfSA9XG4gICAgICAgICAgdGhpcy5jb21waWxlci5sb2FkRmlsZXNTeW5jKHNvdXJjZUZpbGVzLCB0c0ZpbGVzKTtcbiAgICAgIHRoaXMuX3VwZGF0ZVByb2dyYW1XaXRoVHlwZUNoZWNrU3R1YnMoXG4gICAgICAgICAgdG1wUHJvZ3JhbSwgYW5hbHl6ZWRNb2R1bGVzLCBhbmFseXplZEluamVjdGFibGVzLCByb290TmFtZXMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuX2NyZWF0ZVByb2dyYW1PbkVycm9yKGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUNvbXBpbGVyKCkge1xuICAgIGNvbnN0IGNvZGVnZW46IENvZGVHZW5lcmF0b3IgPSB7XG4gICAgICBnZW5lcmF0ZUZpbGU6IChnZW5GaWxlTmFtZSwgYmFzZUZpbGVOYW1lKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29tcGlsZXIuZW1pdEJhc2ljU3R1YihnZW5GaWxlTmFtZSwgYmFzZUZpbGVOYW1lKSxcbiAgICAgIGZpbmRHZW5lcmF0ZWRGaWxlTmFtZXM6IChmaWxlTmFtZSkgPT4gdGhpcy5fY29tcGlsZXIuZmluZEdlbmVyYXRlZEZpbGVOYW1lcyhmaWxlTmFtZSksXG4gICAgfTtcblxuICAgIHRoaXMuX2hvc3RBZGFwdGVyID0gbmV3IFRzQ29tcGlsZXJBb3RDb21waWxlclR5cGVDaGVja0hvc3RBZGFwdGVyKFxuICAgICAgICB0aGlzLnJvb3ROYW1lcywgdGhpcy5vcHRpb25zLCB0aGlzLmhvc3QsIHRoaXMubWV0YWRhdGFDYWNoZSwgY29kZWdlbixcbiAgICAgICAgdGhpcy5vbGRQcm9ncmFtTGlicmFyeVN1bW1hcmllcyk7XG4gICAgY29uc3QgYW90T3B0aW9ucyA9IGdldEFvdENvbXBpbGVyT3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xuICAgIGNvbnN0IGVycm9yQ29sbGVjdG9yID0gKHRoaXMub3B0aW9ucy5jb2xsZWN0QWxsRXJyb3JzIHx8IHRoaXMub3B0aW9ucy5mdWxsVGVtcGxhdGVUeXBlQ2hlY2spID9cbiAgICAgICAgKGVycjogYW55KSA9PiB0aGlzLl9hZGRTdHJ1Y3R1cmFsRGlhZ25vc3RpY3MoZXJyKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcbiAgICB0aGlzLl9jb21waWxlciA9IGNyZWF0ZUFvdENvbXBpbGVyKHRoaXMuX2hvc3RBZGFwdGVyLCBhb3RPcHRpb25zLCBlcnJvckNvbGxlY3RvcikuY29tcGlsZXI7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVQcm9ncmFtV2l0aEJhc2ljU3R1YnMoKToge1xuICAgIHRtcFByb2dyYW06IHRzLlByb2dyYW0sXG4gICAgcm9vdE5hbWVzOiBzdHJpbmdbXSxcbiAgICBzb3VyY2VGaWxlczogc3RyaW5nW10sXG4gICAgdHNGaWxlczogc3RyaW5nW10sXG4gIH0ge1xuICAgIGlmICh0aGlzLl9hbmFseXplZE1vZHVsZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW50ZXJuYWwgRXJyb3I6IGFscmVhZHkgaW5pdGlhbGl6ZWQhYCk7XG4gICAgfVxuICAgIC8vIE5vdGU6IFRoaXMgaXMgaW1wb3J0YW50IHRvIG5vdCBwcm9kdWNlIGEgbWVtb3J5IGxlYWshXG4gICAgY29uc3Qgb2xkVHNQcm9ncmFtID0gdGhpcy5vbGRUc1Byb2dyYW07XG4gICAgdGhpcy5vbGRUc1Byb2dyYW0gPSB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBjb2RlZ2VuOiBDb2RlR2VuZXJhdG9yID0ge1xuICAgICAgZ2VuZXJhdGVGaWxlOiAoZ2VuRmlsZU5hbWUsIGJhc2VGaWxlTmFtZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGlsZXIuZW1pdEJhc2ljU3R1YihnZW5GaWxlTmFtZSwgYmFzZUZpbGVOYW1lKSxcbiAgICAgIGZpbmRHZW5lcmF0ZWRGaWxlTmFtZXM6IChmaWxlTmFtZSkgPT4gdGhpcy5jb21waWxlci5maW5kR2VuZXJhdGVkRmlsZU5hbWVzKGZpbGVOYW1lKSxcbiAgICB9O1xuXG5cbiAgICBsZXQgcm9vdE5hbWVzID0gWy4uLnRoaXMucm9vdE5hbWVzXTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmdlbmVyYXRlQ29kZUZvckxpYnJhcmllcyAhPT0gZmFsc2UpIHtcbiAgICAgIC8vIGlmIHdlIHNob3VsZCBnZW5lcmF0ZUNvZGVGb3JMaWJyYXJpZXMsIG5ldmVyIGluY2x1ZGVcbiAgICAgIC8vIGdlbmVyYXRlZCBmaWxlcyBpbiB0aGUgcHJvZ3JhbSBhcyBvdGhlcndpc2Ugd2Ugd2lsbFxuICAgICAgLy8gb3ZlcndyaXRlIHRoZW0gYW5kIHR5cGVzY3JpcHQgd2lsbCByZXBvcnQgdGhlIGVycm9yXG4gICAgICAvLyBUUzUwNTU6IENhbm5vdCB3cml0ZSBmaWxlIC4uLiBiZWNhdXNlIGl0IHdvdWxkIG92ZXJ3cml0ZSBpbnB1dCBmaWxlLlxuICAgICAgcm9vdE5hbWVzID0gcm9vdE5hbWVzLmZpbHRlcihmbiA9PiAhR0VORVJBVEVEX0ZJTEVTLnRlc3QoZm4pKTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5ub1Jlc29sdmUpIHtcbiAgICAgIHRoaXMucm9vdE5hbWVzLmZvckVhY2gocm9vdE5hbWUgPT4ge1xuICAgICAgICBpZiAodGhpcy5ob3N0QWRhcHRlci5zaG91bGRHZW5lcmF0ZUZpbGVzRm9yKHJvb3ROYW1lKSkge1xuICAgICAgICAgIHJvb3ROYW1lcy5wdXNoKC4uLnRoaXMuY29tcGlsZXIuZmluZEdlbmVyYXRlZEZpbGVOYW1lcyhyb290TmFtZSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB0bXBQcm9ncmFtID0gdHMuY3JlYXRlUHJvZ3JhbShyb290TmFtZXMsIHRoaXMub3B0aW9ucywgdGhpcy5ob3N0QWRhcHRlciwgb2xkVHNQcm9ncmFtKTtcbiAgICBjb25zdCBzb3VyY2VGaWxlczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCB0c0ZpbGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHRtcFByb2dyYW0uZ2V0U291cmNlRmlsZXMoKS5mb3JFYWNoKHNmID0+IHtcbiAgICAgIGlmICh0aGlzLmhvc3RBZGFwdGVyLmlzU291cmNlRmlsZShzZi5maWxlTmFtZSkpIHtcbiAgICAgICAgc291cmNlRmlsZXMucHVzaChzZi5maWxlTmFtZSk7XG4gICAgICB9XG4gICAgICBpZiAoVFMudGVzdChzZi5maWxlTmFtZSkgJiYgIURUUy50ZXN0KHNmLmZpbGVOYW1lKSkge1xuICAgICAgICB0c0ZpbGVzLnB1c2goc2YuZmlsZU5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB7dG1wUHJvZ3JhbSwgc291cmNlRmlsZXMsIHRzRmlsZXMsIHJvb3ROYW1lc307XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVQcm9ncmFtV2l0aFR5cGVDaGVja1N0dWJzKFxuICAgICAgdG1wUHJvZ3JhbTogdHMuUHJvZ3JhbSwgYW5hbHl6ZWRNb2R1bGVzOiBOZ0FuYWx5emVkTW9kdWxlcyxcbiAgICAgIGFuYWx5emVkSW5qZWN0YWJsZXM6IE5nQW5hbHl6ZWRGaWxlV2l0aEluamVjdGFibGVzW10sIHJvb3ROYW1lczogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9hbmFseXplZE1vZHVsZXMgPSBhbmFseXplZE1vZHVsZXM7XG4gICAgdGhpcy5fYW5hbHl6ZWRJbmplY3RhYmxlcyA9IGFuYWx5emVkSW5qZWN0YWJsZXM7XG4gICAgdG1wUHJvZ3JhbS5nZXRTb3VyY2VGaWxlcygpLmZvckVhY2goc2YgPT4ge1xuICAgICAgaWYgKHNmLmZpbGVOYW1lLmVuZHNXaXRoKCcubmdmYWN0b3J5LnRzJykpIHtcbiAgICAgICAgY29uc3Qge2dlbmVyYXRlLCBiYXNlRmlsZU5hbWV9ID0gdGhpcy5ob3N0QWRhcHRlci5zaG91bGRHZW5lcmF0ZUZpbGUoc2YuZmlsZU5hbWUpO1xuICAgICAgICBpZiAoZ2VuZXJhdGUpIHtcbiAgICAgICAgICAvLyBOb3RlOiAhIGlzIG9rIGFzIGhvc3RBZGFwdGVyLnNob3VsZEdlbmVyYXRlRmlsZSB3aWxsIGFsd2F5cyByZXR1cm4gYSBiYXNlRmlsZU5hbWVcbiAgICAgICAgICAvLyBmb3IgLm5nZmFjdG9yeS50cyBmaWxlcy5cbiAgICAgICAgICBjb25zdCBnZW5GaWxlID0gdGhpcy5jb21waWxlci5lbWl0VHlwZUNoZWNrU3R1YihzZi5maWxlTmFtZSwgYmFzZUZpbGVOYW1lICEpO1xuICAgICAgICAgIGlmIChnZW5GaWxlKSB7XG4gICAgICAgICAgICB0aGlzLmhvc3RBZGFwdGVyLnVwZGF0ZUdlbmVyYXRlZEZpbGUoZ2VuRmlsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fdHNQcm9ncmFtID0gdHMuY3JlYXRlUHJvZ3JhbShyb290TmFtZXMsIHRoaXMub3B0aW9ucywgdGhpcy5ob3N0QWRhcHRlciwgdG1wUHJvZ3JhbSk7XG4gICAgLy8gTm90ZTogdGhlIG5ldyB0cyBwcm9ncmFtIHNob3VsZCBiZSBjb21wbGV0ZWx5IHJldXNhYmxlIGJ5IFR5cGVTY3JpcHQgYXM6XG4gICAgLy8gLSB3ZSBjYWNoZSBhbGwgdGhlIGZpbGVzIGluIHRoZSBob3N0QWRhcHRlclxuICAgIC8vIC0gbmV3IG5ldyBzdHVicyB1c2UgdGhlIGV4YWN0bHkgc2FtZSBpbXBvcnRzL2V4cG9ydHMgYXMgdGhlIG9sZCBvbmNlICh3ZSBhc3NlcnQgdGhhdCBpblxuICAgIC8vIGhvc3RBZGFwdGVyLnVwZGF0ZUdlbmVyYXRlZEZpbGUpLlxuICAgIGlmICh0c1N0cnVjdHVyZUlzUmV1c2VkKHRtcFByb2dyYW0pICE9PSBTdHJ1Y3R1cmVJc1JldXNlZC5Db21wbGV0ZWx5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludGVybmFsIEVycm9yOiBUaGUgc3RydWN0dXJlIG9mIHRoZSBwcm9ncmFtIGNoYW5nZWQgZHVyaW5nIGNvZGVnZW4uYCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlUHJvZ3JhbU9uRXJyb3IoZTogYW55KSB7XG4gICAgLy8gU3RpbGwgZmlsbCB0aGUgYW5hbHl6ZWRNb2R1bGVzIGFuZCB0aGUgdHNQcm9ncmFtXG4gICAgLy8gc28gdGhhdCB3ZSBkb24ndCBjYXVzZSBvdGhlciBlcnJvcnMgZm9yIHVzZXJzIHdobyBlLmcuIHdhbnQgdG8gZW1pdCB0aGUgbmdQcm9ncmFtLlxuICAgIHRoaXMuX2FuYWx5emVkTW9kdWxlcyA9IGVtcHR5TW9kdWxlcztcbiAgICB0aGlzLm9sZFRzUHJvZ3JhbSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9ob3N0QWRhcHRlci5pc1NvdXJjZUZpbGUgPSAoKSA9PiBmYWxzZTtcbiAgICB0aGlzLl90c1Byb2dyYW0gPSB0cy5jcmVhdGVQcm9ncmFtKHRoaXMucm9vdE5hbWVzLCB0aGlzLm9wdGlvbnMsIHRoaXMuaG9zdEFkYXB0ZXIpO1xuICAgIGlmIChpc1N5bnRheEVycm9yKGUpKSB7XG4gICAgICB0aGlzLl9hZGRTdHJ1Y3R1cmFsRGlhZ25vc3RpY3MoZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRocm93IGU7XG4gIH1cblxuICBwcml2YXRlIF9hZGRTdHJ1Y3R1cmFsRGlhZ25vc3RpY3MoZXJyb3I6IEVycm9yKSB7XG4gICAgY29uc3QgZGlhZ25vc3RpY3MgPSB0aGlzLl9zdHJ1Y3R1cmFsRGlhZ25vc3RpY3MgfHwgKHRoaXMuX3N0cnVjdHVyYWxEaWFnbm9zdGljcyA9IFtdKTtcbiAgICBpZiAoaXNTeW50YXhFcnJvcihlcnJvcikpIHtcbiAgICAgIGRpYWdub3N0aWNzLnB1c2goLi4uc3ludGF4RXJyb3JUb0RpYWdub3N0aWNzKGVycm9yKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpYWdub3N0aWNzLnB1c2goe1xuICAgICAgICBtZXNzYWdlVGV4dDogZXJyb3IudG9TdHJpbmcoKSxcbiAgICAgICAgY2F0ZWdvcnk6IHRzLkRpYWdub3N0aWNDYXRlZ29yeS5FcnJvcixcbiAgICAgICAgc291cmNlOiBTT1VSQ0UsXG4gICAgICAgIGNvZGU6IERFRkFVTFRfRVJST1JfQ09ERVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gTm90ZTogdGhpcyByZXR1cm5zIGEgdHMuRGlhZ25vc3RpYyBzbyB0aGF0IHdlXG4gIC8vIGNhbiByZXR1cm4gZXJyb3JzIGluIGEgdHMuRW1pdFJlc3VsdFxuICBwcml2YXRlIGdlbmVyYXRlRmlsZXNGb3JFbWl0KGVtaXRGbGFnczogRW1pdEZsYWdzKTpcbiAgICAgIHtnZW5GaWxlczogR2VuZXJhdGVkRmlsZVtdLCBnZW5EaWFnczogdHMuRGlhZ25vc3RpY1tdfSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghKGVtaXRGbGFncyAmIEVtaXRGbGFncy5Db2RlZ2VuKSkge1xuICAgICAgICByZXR1cm4ge2dlbkZpbGVzOiBbXSwgZ2VuRGlhZ3M6IFtdfTtcbiAgICAgIH1cbiAgICAgIC8vIFRPRE8odGJvc2NoKTogYWxsb3cgZ2VuZXJhdGluZyBmaWxlcyB0aGF0IGFyZSBub3QgaW4gdGhlIHJvb3REaXJcbiAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xOTMzN1xuICAgICAgbGV0IGdlbkZpbGVzID0gdGhpcy5jb21waWxlci5lbWl0QWxsSW1wbHModGhpcy5hbmFseXplZE1vZHVsZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihnZW5GaWxlID0+IGlzSW5Sb290RGlyKGdlbkZpbGUuZ2VuRmlsZVVybCwgdGhpcy5vcHRpb25zKSk7XG4gICAgICBpZiAodGhpcy5vbGRQcm9ncmFtRW1pdHRlZEdlbmVyYXRlZEZpbGVzKSB7XG4gICAgICAgIGNvbnN0IG9sZFByb2dyYW1FbWl0dGVkR2VuZXJhdGVkRmlsZXMgPSB0aGlzLm9sZFByb2dyYW1FbWl0dGVkR2VuZXJhdGVkRmlsZXM7XG4gICAgICAgIGdlbkZpbGVzID0gZ2VuRmlsZXMuZmlsdGVyKGdlbkZpbGUgPT4ge1xuICAgICAgICAgIGNvbnN0IG9sZEdlbkZpbGUgPSBvbGRQcm9ncmFtRW1pdHRlZEdlbmVyYXRlZEZpbGVzLmdldChnZW5GaWxlLmdlbkZpbGVVcmwpO1xuICAgICAgICAgIHJldHVybiAhb2xkR2VuRmlsZSB8fCAhZ2VuRmlsZS5pc0VxdWl2YWxlbnQob2xkR2VuRmlsZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtnZW5GaWxlcywgZ2VuRGlhZ3M6IFtdfTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBUT0RPKHRib3NjaCk6IGNoZWNrIHdoZXRoZXIgd2UgY2FuIGFjdHVhbGx5IGhhdmUgc3ludGF4IGVycm9ycyBoZXJlLFxuICAgICAgLy8gYXMgd2UgYWxyZWFkeSBwYXJzZWQgdGhlIG1ldGFkYXRhIGFuZCB0ZW1wbGF0ZXMgYmVmb3JlIHRvIGNyZWF0ZSB0aGUgdHlwZSBjaGVjayBibG9jay5cbiAgICAgIGlmIChpc1N5bnRheEVycm9yKGUpKSB7XG4gICAgICAgIGNvbnN0IGdlbkRpYWdzOiB0cy5EaWFnbm9zdGljW10gPSBbe1xuICAgICAgICAgIGZpbGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICBzdGFydDogdW5kZWZpbmVkLFxuICAgICAgICAgIGxlbmd0aDogdW5kZWZpbmVkLFxuICAgICAgICAgIG1lc3NhZ2VUZXh0OiBlLm1lc3NhZ2UsXG4gICAgICAgICAgY2F0ZWdvcnk6IHRzLkRpYWdub3N0aWNDYXRlZ29yeS5FcnJvcixcbiAgICAgICAgICBzb3VyY2U6IFNPVVJDRSxcbiAgICAgICAgICBjb2RlOiBERUZBVUxUX0VSUk9SX0NPREVcbiAgICAgICAgfV07XG4gICAgICAgIHJldHVybiB7Z2VuRmlsZXM6IFtdLCBnZW5EaWFnc307XG4gICAgICB9XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHVuZGVmaW5lZCBpZiBhbGwgZmlsZXMgc2hvdWxkIGJlIGVtaXR0ZWQuXG4gICAqL1xuICBwcml2YXRlIGdldFNvdXJjZUZpbGVzRm9yRW1pdCgpOiB0cy5Tb3VyY2VGaWxlW118dW5kZWZpbmVkIHtcbiAgICAvLyBUT0RPKHRib3NjaCk6IGlmIG9uZSBvZiB0aGUgZmlsZXMgY29udGFpbnMgYSBgY29uc3QgZW51bWBcbiAgICAvLyBhbHdheXMgZW1pdCBhbGwgZmlsZXMgLT4gcmV0dXJuIHVuZGVmaW5lZCFcbiAgICBsZXQgc291cmNlRmlsZXNUb0VtaXQgPSB0aGlzLnRzUHJvZ3JhbS5nZXRTb3VyY2VGaWxlcygpLmZpbHRlcihcbiAgICAgICAgc2YgPT4geyByZXR1cm4gIXNmLmlzRGVjbGFyYXRpb25GaWxlICYmICFHRU5FUkFURURfRklMRVMudGVzdChzZi5maWxlTmFtZSk7IH0pO1xuICAgIGlmICh0aGlzLm9sZFByb2dyYW1FbWl0dGVkU291cmNlRmlsZXMpIHtcbiAgICAgIHNvdXJjZUZpbGVzVG9FbWl0ID0gc291cmNlRmlsZXNUb0VtaXQuZmlsdGVyKHNmID0+IHtcbiAgICAgICAgY29uc3Qgb2xkRmlsZSA9IHRoaXMub2xkUHJvZ3JhbUVtaXR0ZWRTb3VyY2VGaWxlcyAhLmdldChzZi5maWxlTmFtZSk7XG4gICAgICAgIHJldHVybiBzZiAhPT0gb2xkRmlsZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlRmlsZXNUb0VtaXQ7XG4gIH1cblxuICBwcml2YXRlIHdyaXRlRmlsZShcbiAgICAgIG91dEZpbGVOYW1lOiBzdHJpbmcsIG91dERhdGE6IHN0cmluZywgd3JpdGVCeXRlT3JkZXJNYXJrOiBib29sZWFuLFxuICAgICAgb25FcnJvcj86IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQsIGdlbkZpbGU/OiBHZW5lcmF0ZWRGaWxlLFxuICAgICAgc291cmNlRmlsZXM/OiBSZWFkb25seUFycmF5PHRzLlNvdXJjZUZpbGU+KSB7XG4gICAgLy8gY29sbGVjdCBlbWl0dGVkTGlicmFyeVN1bW1hcmllc1xuICAgIGxldCBiYXNlRmlsZTogdHMuU291cmNlRmlsZXx1bmRlZmluZWQ7XG4gICAgaWYgKGdlbkZpbGUpIHtcbiAgICAgIGJhc2VGaWxlID0gdGhpcy50c1Byb2dyYW0uZ2V0U291cmNlRmlsZShnZW5GaWxlLnNyY0ZpbGVVcmwpO1xuICAgICAgaWYgKGJhc2VGaWxlKSB7XG4gICAgICAgIGlmICghdGhpcy5lbWl0dGVkTGlicmFyeVN1bW1hcmllcykge1xuICAgICAgICAgIHRoaXMuZW1pdHRlZExpYnJhcnlTdW1tYXJpZXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2VuRmlsZS5nZW5GaWxlVXJsLmVuZHNXaXRoKCcubmdzdW1tYXJ5Lmpzb24nKSAmJiBiYXNlRmlsZS5maWxlTmFtZS5lbmRzV2l0aCgnLmQudHMnKSkge1xuICAgICAgICAgIHRoaXMuZW1pdHRlZExpYnJhcnlTdW1tYXJpZXMucHVzaCh7XG4gICAgICAgICAgICBmaWxlTmFtZTogYmFzZUZpbGUuZmlsZU5hbWUsXG4gICAgICAgICAgICB0ZXh0OiBiYXNlRmlsZS50ZXh0LFxuICAgICAgICAgICAgc291cmNlRmlsZTogYmFzZUZpbGUsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5lbWl0dGVkTGlicmFyeVN1bW1hcmllcy5wdXNoKHtmaWxlTmFtZTogZ2VuRmlsZS5nZW5GaWxlVXJsLCB0ZXh0OiBvdXREYXRhfSk7XG4gICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuZGVjbGFyYXRpb24pIHtcbiAgICAgICAgICAgIC8vIElmIHdlIGRvbid0IGVtaXQgZGVjbGFyYXRpb25zLCBzdGlsbCByZWNvcmQgYW4gZW1wdHkgLm5nZmFjdG9yeS5kLnRzIGZpbGUsXG4gICAgICAgICAgICAvLyBhcyB3ZSBtaWdodCBuZWVkIGl0IGxhdGVyIG9uIGZvciByZXNvbHZpbmcgbW9kdWxlIG5hbWVzIGZyb20gc3VtbWFyaWVzLlxuICAgICAgICAgICAgY29uc3QgbmdGYWN0b3J5RHRzID1cbiAgICAgICAgICAgICAgICBnZW5GaWxlLmdlbkZpbGVVcmwuc3Vic3RyaW5nKDAsIGdlbkZpbGUuZ2VuRmlsZVVybC5sZW5ndGggLSAxNSkgKyAnLm5nZmFjdG9yeS5kLnRzJztcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlZExpYnJhcnlTdW1tYXJpZXMucHVzaCh7ZmlsZU5hbWU6IG5nRmFjdG9yeUR0cywgdGV4dDogJyd9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAob3V0RmlsZU5hbWUuZW5kc1dpdGgoJy5kLnRzJykgJiYgYmFzZUZpbGUuZmlsZU5hbWUuZW5kc1dpdGgoJy5kLnRzJykpIHtcbiAgICAgICAgICBjb25zdCBkdHNTb3VyY2VGaWxlUGF0aCA9IGdlbkZpbGUuZ2VuRmlsZVVybC5yZXBsYWNlKC9cXC50cyQvLCAnLmQudHMnKTtcbiAgICAgICAgICAvLyBOb3RlOiBEb24ndCB1c2Ugc291cmNlRmlsZXMgaGVyZSBhcyB0aGUgY3JlYXRlZCAuZC50cyBoYXMgYSBwYXRoIGluIHRoZSBvdXREaXIsXG4gICAgICAgICAgLy8gYnV0IHdlIG5lZWQgb25lIHRoYXQgaXMgbmV4dCB0byB0aGUgLnRzIGZpbGVcbiAgICAgICAgICB0aGlzLmVtaXR0ZWRMaWJyYXJ5U3VtbWFyaWVzLnB1c2goe2ZpbGVOYW1lOiBkdHNTb3VyY2VGaWxlUGF0aCwgdGV4dDogb3V0RGF0YX0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEZpbHRlciBvdXQgZ2VuZXJhdGVkIGZpbGVzIGZvciB3aGljaCB3ZSBkaWRuJ3QgZ2VuZXJhdGUgY29kZS5cbiAgICAvLyBUaGlzIGNhbiBoYXBwZW4gYXMgdGhlIHN0dWIgY2FsY3VsYXRpb24gaXMgbm90IGNvbXBsZXRlbHkgZXhhY3QuXG4gICAgLy8gTm90ZTogc291cmNlRmlsZSByZWZlcnMgdG8gdGhlIC5uZ2ZhY3RvcnkudHMgLyAubmdzdW1tYXJ5LnRzIGZpbGVcbiAgICAvLyBub2RlX2VtaXR0ZXJfdHJhbnNmb3JtIGFscmVhZHkgc2V0IHRoZSBmaWxlIGNvbnRlbnRzIHRvIGJlIGVtcHR5LFxuICAgIC8vICBzbyB0aGlzIGNvZGUgb25seSBuZWVkcyB0byBza2lwIHRoZSBmaWxlIGlmICFhbGxvd0VtcHR5Q29kZWdlbkZpbGVzLlxuICAgIGNvbnN0IGlzR2VuZXJhdGVkID0gR0VORVJBVEVEX0ZJTEVTLnRlc3Qob3V0RmlsZU5hbWUpO1xuICAgIGlmIChpc0dlbmVyYXRlZCAmJiAhdGhpcy5vcHRpb25zLmFsbG93RW1wdHlDb2RlZ2VuRmlsZXMgJiZcbiAgICAgICAgKCFnZW5GaWxlIHx8ICFnZW5GaWxlLnN0bXRzIHx8IGdlbkZpbGUuc3RtdHMubGVuZ3RoID09PSAwKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoYmFzZUZpbGUpIHtcbiAgICAgIHNvdXJjZUZpbGVzID0gc291cmNlRmlsZXMgPyBbLi4uc291cmNlRmlsZXMsIGJhc2VGaWxlXSA6IFtiYXNlRmlsZV07XG4gICAgfVxuICAgIC8vIFRPRE86IHJlbW92ZSBhbnkgd2hlbiBUUyAyLjQgc3VwcG9ydCBpcyByZW1vdmVkLlxuICAgIHRoaXMuaG9zdC53cml0ZUZpbGUob3V0RmlsZU5hbWUsIG91dERhdGEsIHdyaXRlQnl0ZU9yZGVyTWFyaywgb25FcnJvciwgc291cmNlRmlsZXMgYXMgYW55KTtcbiAgfVxufVxuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIGEgZ2l2ZW4gdmVyc2lvbiDiiIggW21pblZlcnNpb24sIG1heFZlcnNpb25bXG4gKiBBbiBlcnJvciB3aWxsIGJlIHRocm93biBpZiB0aGUgZm9sbG93aW5nIHN0YXRlbWVudHMgYXJlIHNpbXVsdGFuZW91c2x5IHRydWU6XG4gKiAtIHRoZSBnaXZlbiB2ZXJzaW9uIOKIiSBbbWluVmVyc2lvbiwgbWF4VmVyc2lvblssXG4gKiAtIHRoZSByZXN1bHQgb2YgdGhlIHZlcnNpb24gY2hlY2sgaXMgbm90IG1lYW50IHRvIGJlIGJ5cGFzc2VkICh0aGUgcGFyYW1ldGVyIGRpc2FibGVWZXJzaW9uQ2hlY2tcbiAqIGlzIGZhbHNlKVxuICpcbiAqIEBwYXJhbSB2ZXJzaW9uIFRoZSB2ZXJzaW9uIG9uIHdoaWNoIHRoZSBjaGVjayB3aWxsIGJlIHBlcmZvcm1lZFxuICogQHBhcmFtIG1pblZlcnNpb24gVGhlIGxvd2VyIGJvdW5kIHZlcnNpb24uIEEgdmFsaWQgdmVyc2lvbiBuZWVkcyB0byBiZSBncmVhdGVyIHRoYW4gbWluVmVyc2lvblxuICogQHBhcmFtIG1heFZlcnNpb24gVGhlIHVwcGVyIGJvdW5kIHZlcnNpb24uIEEgdmFsaWQgdmVyc2lvbiBuZWVkcyB0byBiZSBzdHJpY3RseSBsZXNzIHRoYW5cbiAqIG1heFZlcnNpb25cbiAqIEBwYXJhbSBkaXNhYmxlVmVyc2lvbkNoZWNrIEluZGljYXRlcyB3aGV0aGVyIHZlcnNpb24gY2hlY2sgc2hvdWxkIGJlIGJ5cGFzc2VkXG4gKlxuICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSBmb2xsb3dpbmcgc3RhdGVtZW50cyBhcmUgc2ltdWx0YW5lb3VzbHkgdHJ1ZTpcbiAqIC0gdGhlIGdpdmVuIHZlcnNpb24g4oiJIFttaW5WZXJzaW9uLCBtYXhWZXJzaW9uWyxcbiAqIC0gdGhlIHJlc3VsdCBvZiB0aGUgdmVyc2lvbiBjaGVjayBpcyBub3QgbWVhbnQgdG8gYmUgYnlwYXNzZWQgKHRoZSBwYXJhbWV0ZXIgZGlzYWJsZVZlcnNpb25DaGVja1xuICogaXMgZmFsc2UpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1ZlcnNpb24oXG4gICAgdmVyc2lvbjogc3RyaW5nLCBtaW5WZXJzaW9uOiBzdHJpbmcsIG1heFZlcnNpb246IHN0cmluZyxcbiAgICBkaXNhYmxlVmVyc2lvbkNoZWNrOiBib29sZWFuIHwgdW5kZWZpbmVkKSB7XG4gIGlmICgoY29tcGFyZVZlcnNpb25zKHZlcnNpb24sIG1pblZlcnNpb24pIDwgMCB8fCBjb21wYXJlVmVyc2lvbnModmVyc2lvbiwgbWF4VmVyc2lvbikgPj0gMCkgJiZcbiAgICAgICFkaXNhYmxlVmVyc2lvbkNoZWNrKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgVGhlIEFuZ3VsYXIgQ29tcGlsZXIgcmVxdWlyZXMgVHlwZVNjcmlwdCA+PSR7bWluVmVyc2lvbn0gYW5kIDwke21heFZlcnNpb259IGJ1dCAke3ZlcnNpb259IHdhcyBmb3VuZCBpbnN0ZWFkLmApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm9ncmFtKHtyb290TmFtZXMsIG9wdGlvbnMsIGhvc3QsIG9sZFByb2dyYW19OiB7XG4gIHJvb3ROYW1lczogUmVhZG9ubHlBcnJheTxzdHJpbmc+LFxuICBvcHRpb25zOiBDb21waWxlck9wdGlvbnMsXG4gIGhvc3Q6IENvbXBpbGVySG9zdCwgb2xkUHJvZ3JhbT86IFByb2dyYW1cbn0pOiBQcm9ncmFtIHtcbiAgaWYgKG9wdGlvbnMuZW5hYmxlSXZ5ID09PSAnbmd0c2MnKSB7XG4gICAgcmV0dXJuIG5ldyBOZ3RzY1Byb2dyYW0ocm9vdE5hbWVzLCBvcHRpb25zLCBob3N0LCBvbGRQcm9ncmFtKTtcbiAgfSBlbHNlIGlmIChvcHRpb25zLmVuYWJsZUl2eSA9PT0gJ3RzYycpIHtcbiAgICByZXR1cm4gbmV3IFRzY1Bhc3NUaHJvdWdoUHJvZ3JhbShyb290TmFtZXMsIG9wdGlvbnMsIGhvc3QsIG9sZFByb2dyYW0pO1xuICB9XG4gIHJldHVybiBuZXcgQW5ndWxhckNvbXBpbGVyUHJvZ3JhbShyb290TmFtZXMsIG9wdGlvbnMsIGhvc3QsIG9sZFByb2dyYW0pO1xufVxuXG4vLyBDb21wdXRlIHRoZSBBb3RDb21waWxlciBvcHRpb25zXG5mdW5jdGlvbiBnZXRBb3RDb21waWxlck9wdGlvbnMob3B0aW9uczogQ29tcGlsZXJPcHRpb25zKTogQW90Q29tcGlsZXJPcHRpb25zIHtcbiAgbGV0IG1pc3NpbmdUcmFuc2xhdGlvbiA9IGNvcmUuTWlzc2luZ1RyYW5zbGF0aW9uU3RyYXRlZ3kuV2FybmluZztcblxuICBzd2l0Y2ggKG9wdGlvbnMuaTE4bkluTWlzc2luZ1RyYW5zbGF0aW9ucykge1xuICAgIGNhc2UgJ2lnbm9yZSc6XG4gICAgICBtaXNzaW5nVHJhbnNsYXRpb24gPSBjb3JlLk1pc3NpbmdUcmFuc2xhdGlvblN0cmF0ZWd5Lklnbm9yZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgIG1pc3NpbmdUcmFuc2xhdGlvbiA9IGNvcmUuTWlzc2luZ1RyYW5zbGF0aW9uU3RyYXRlZ3kuRXJyb3I7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIGxldCB0cmFuc2xhdGlvbnM6IHN0cmluZyA9ICcnO1xuXG4gIGlmIChvcHRpb25zLmkxOG5JbkZpbGUpIHtcbiAgICBpZiAoIW9wdGlvbnMuaTE4bkluTG9jYWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSB0cmFuc2xhdGlvbiBmaWxlICgke29wdGlvbnMuaTE4bkluRmlsZX0pIGxvY2FsZSBtdXN0IGJlIHByb3ZpZGVkLmApO1xuICAgIH1cbiAgICB0cmFuc2xhdGlvbnMgPSBmcy5yZWFkRmlsZVN5bmMob3B0aW9ucy5pMThuSW5GaWxlLCAndXRmOCcpO1xuICB9IGVsc2Uge1xuICAgIC8vIE5vIHRyYW5zbGF0aW9ucyBhcmUgcHJvdmlkZWQsIGlnbm9yZSBhbnkgZXJyb3JzXG4gICAgLy8gV2Ugc3RpbGwgZ28gdGhyb3VnaCBpMThuIHRvIHJlbW92ZSBpMThuIGF0dHJpYnV0ZXNcbiAgICBtaXNzaW5nVHJhbnNsYXRpb24gPSBjb3JlLk1pc3NpbmdUcmFuc2xhdGlvblN0cmF0ZWd5Lklnbm9yZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbG9jYWxlOiBvcHRpb25zLmkxOG5JbkxvY2FsZSxcbiAgICBpMThuRm9ybWF0OiBvcHRpb25zLmkxOG5JbkZvcm1hdCB8fCBvcHRpb25zLmkxOG5PdXRGb3JtYXQsXG4gICAgaTE4blVzZUV4dGVybmFsSWRzOiBvcHRpb25zLmkxOG5Vc2VFeHRlcm5hbElkcywgdHJhbnNsYXRpb25zLCBtaXNzaW5nVHJhbnNsYXRpb24sXG4gICAgZW5hYmxlU3VtbWFyaWVzRm9ySml0OiBvcHRpb25zLmVuYWJsZVN1bW1hcmllc0ZvckppdCxcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBvcHRpb25zLnByZXNlcnZlV2hpdGVzcGFjZXMsXG4gICAgZnVsbFRlbXBsYXRlVHlwZUNoZWNrOiBvcHRpb25zLmZ1bGxUZW1wbGF0ZVR5cGVDaGVjayxcbiAgICBhbGxvd0VtcHR5Q29kZWdlbkZpbGVzOiBvcHRpb25zLmFsbG93RW1wdHlDb2RlZ2VuRmlsZXMsXG4gICAgZW5hYmxlSXZ5OiBvcHRpb25zLmVuYWJsZUl2eSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0TmdPcHRpb25EaWFnbm9zdGljcyhvcHRpb25zOiBDb21waWxlck9wdGlvbnMpOiBSZWFkb25seUFycmF5PERpYWdub3N0aWM+IHtcbiAgaWYgKG9wdGlvbnMuYW5ub3RhdGlvbnNBcykge1xuICAgIHN3aXRjaCAob3B0aW9ucy5hbm5vdGF0aW9uc0FzKSB7XG4gICAgICBjYXNlICdkZWNvcmF0b3JzJzpcbiAgICAgIGNhc2UgJ3N0YXRpYyBmaWVsZHMnOlxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBbe1xuICAgICAgICAgIG1lc3NhZ2VUZXh0OlxuICAgICAgICAgICAgICAnQW5ndWxhciBjb21waWxlciBvcHRpb25zIFwiYW5ub3RhdGlvbnNBc1wiIG9ubHkgc3VwcG9ydHMgXCJzdGF0aWMgZmllbGRzXCIgYW5kIFwiZGVjb3JhdG9yc1wiJyxcbiAgICAgICAgICBjYXRlZ29yeTogdHMuRGlhZ25vc3RpY0NhdGVnb3J5LkVycm9yLFxuICAgICAgICAgIHNvdXJjZTogU09VUkNFLFxuICAgICAgICAgIGNvZGU6IERFRkFVTFRfRVJST1JfQ09ERVxuICAgICAgICB9XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFtdO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVTZXBhcmF0b3JzKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBwYXRoLnJlcGxhY2UoL1xcXFwvZywgJy8nKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjYW4gYWRqdXN0IGEgcGF0aCBmcm9tIHNvdXJjZSBwYXRoIHRvIG91dCBwYXRoLFxuICogYmFzZWQgb24gYW4gZXhpc3RpbmcgbWFwcGluZyBmcm9tIHNvdXJjZSB0byBvdXQgcGF0aC5cbiAqXG4gKiBUT0RPKHRib3NjaCk6IHRhbGsgdG8gdGhlIFR5cGVTY3JpcHQgdGVhbSB0byBleHBvc2UgdGhlaXIgbG9naWMgZm9yIGNhbGN1bGF0aW5nIHRoZSBgcm9vdERpcmBcbiAqIGlmIG5vbmUgd2FzIHNwZWNpZmllZC5cbiAqXG4gKiBOb3RlOiBUaGlzIGZ1bmN0aW9uIHdvcmtzIG9uIG5vcm1hbGl6ZWQgcGF0aHMgZnJvbSB0eXBlc2NyaXB0IGJ1dCBzaG91bGQgYWx3YXlzIHJldHVyblxuICogUE9TSVggbm9ybWFsaXplZCBwYXRocyBmb3Igb3V0cHV0IHBhdGhzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3JjVG9PdXRQYXRoTWFwcGVyKFxuICAgIG91dERpcjogc3RyaW5nIHwgdW5kZWZpbmVkLCBzYW1wbGVTcmNGaWxlTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHNhbXBsZU91dEZpbGVOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQsIGhvc3Q6IHtcbiAgICAgIGRpcm5hbWU6IHR5cGVvZiBwYXRoLmRpcm5hbWUsXG4gICAgICByZXNvbHZlOiB0eXBlb2YgcGF0aC5yZXNvbHZlLFxuICAgICAgcmVsYXRpdmU6IHR5cGVvZiBwYXRoLnJlbGF0aXZlXG4gICAgfSA9IHBhdGgpOiAoc3JjRmlsZU5hbWU6IHN0cmluZykgPT4gc3RyaW5nIHtcbiAgaWYgKG91dERpcikge1xuICAgIGxldCBwYXRoOiB7fSA9IHt9OyAgLy8gRW5zdXJlIHdlIGVycm9yIGlmIHdlIHVzZSBgcGF0aGAgaW5zdGVhZCBvZiBgaG9zdGAuXG4gICAgaWYgKHNhbXBsZVNyY0ZpbGVOYW1lID09IG51bGwgfHwgc2FtcGxlT3V0RmlsZU5hbWUgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4ndCBjYWxjdWxhdGUgdGhlIHJvb3REaXIgd2l0aG91dCBhIHNhbXBsZSBzcmNGaWxlTmFtZSAvIG91dEZpbGVOYW1lLiBgKTtcbiAgICB9XG4gICAgY29uc3Qgc3JjRmlsZURpciA9IG5vcm1hbGl6ZVNlcGFyYXRvcnMoaG9zdC5kaXJuYW1lKHNhbXBsZVNyY0ZpbGVOYW1lKSk7XG4gICAgY29uc3Qgb3V0RmlsZURpciA9IG5vcm1hbGl6ZVNlcGFyYXRvcnMoaG9zdC5kaXJuYW1lKHNhbXBsZU91dEZpbGVOYW1lKSk7XG4gICAgaWYgKHNyY0ZpbGVEaXIgPT09IG91dEZpbGVEaXIpIHtcbiAgICAgIHJldHVybiAoc3JjRmlsZU5hbWUpID0+IHNyY0ZpbGVOYW1lO1xuICAgIH1cbiAgICAvLyBjYWxjdWxhdGUgdGhlIGNvbW1vbiBzdWZmaXgsIHN0b3BwaW5nXG4gICAgLy8gYXQgYG91dERpcmAuXG4gICAgY29uc3Qgc3JjRGlyUGFydHMgPSBzcmNGaWxlRGlyLnNwbGl0KCcvJyk7XG4gICAgY29uc3Qgb3V0RGlyUGFydHMgPSBub3JtYWxpemVTZXBhcmF0b3JzKGhvc3QucmVsYXRpdmUob3V0RGlyLCBvdXRGaWxlRGlyKSkuc3BsaXQoJy8nKTtcbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBNYXRoLm1pbihzcmNEaXJQYXJ0cy5sZW5ndGgsIG91dERpclBhcnRzLmxlbmd0aCkgJiZcbiAgICAgICAgICAgc3JjRGlyUGFydHNbc3JjRGlyUGFydHMubGVuZ3RoIC0gMSAtIGldID09PSBvdXREaXJQYXJ0c1tvdXREaXJQYXJ0cy5sZW5ndGggLSAxIC0gaV0pXG4gICAgICBpKys7XG4gICAgY29uc3Qgcm9vdERpciA9IHNyY0RpclBhcnRzLnNsaWNlKDAsIHNyY0RpclBhcnRzLmxlbmd0aCAtIGkpLmpvaW4oJy8nKTtcbiAgICByZXR1cm4gKHNyY0ZpbGVOYW1lKSA9PiB7XG4gICAgICAvLyBOb3RlOiBCZWZvcmUgd2UgcmV0dXJuIHRoZSBtYXBwZWQgb3V0cHV0IHBhdGgsIHdlIG5lZWQgdG8gbm9ybWFsaXplIHRoZSBwYXRoIGRlbGltaXRlcnNcbiAgICAgIC8vIGJlY2F1c2UgdGhlIG91dHB1dCBwYXRoIGlzIHVzdWFsbHkgcGFzc2VkIHRvIFR5cGVTY3JpcHQgd2hpY2ggc29tZXRpbWVzIG9ubHkgZXhwZWN0c1xuICAgICAgLy8gcG9zaXggbm9ybWFsaXplZCBwYXRocyAoZS5nLiBpZiBhIGN1c3RvbSBjb21waWxlciBob3N0IGlzIHVzZWQpXG4gICAgICByZXR1cm4gbm9ybWFsaXplU2VwYXJhdG9ycyhob3N0LnJlc29sdmUob3V0RGlyLCBob3N0LnJlbGF0aXZlKHJvb3REaXIsIHNyY0ZpbGVOYW1lKSkpO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gTm90ZTogQmVmb3JlIHdlIHJldHVybiB0aGUgb3V0cHV0IHBhdGgsIHdlIG5lZWQgdG8gbm9ybWFsaXplIHRoZSBwYXRoIGRlbGltaXRlcnMgYmVjYXVzZVxuICAgIC8vIHRoZSBvdXRwdXQgcGF0aCBpcyB1c3VhbGx5IHBhc3NlZCB0byBUeXBlU2NyaXB0IHdoaWNoIG9ubHkgcGFzc2VzIGFyb3VuZCBwb3NpeFxuICAgIC8vIG5vcm1hbGl6ZWQgcGF0aHMgKGUuZy4gaWYgYSBjdXN0b20gY29tcGlsZXIgaG9zdCBpcyB1c2VkKVxuICAgIHJldHVybiAoc3JjRmlsZU5hbWUpID0+IG5vcm1hbGl6ZVNlcGFyYXRvcnMoc3JjRmlsZU5hbWUpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpMThuRXh0cmFjdChcbiAgICBmb3JtYXROYW1lOiBzdHJpbmcgfCBudWxsLCBvdXRGaWxlOiBzdHJpbmcgfCBudWxsLCBob3N0OiB0cy5Db21waWxlckhvc3QsXG4gICAgb3B0aW9uczogQ29tcGlsZXJPcHRpb25zLCBidW5kbGU6IE1lc3NhZ2VCdW5kbGUpOiBzdHJpbmdbXSB7XG4gIGZvcm1hdE5hbWUgPSBmb3JtYXROYW1lIHx8ICd4bGYnO1xuICAvLyBDaGVja3MgdGhlIGZvcm1hdCBhbmQgcmV0dXJucyB0aGUgZXh0ZW5zaW9uXG4gIGNvbnN0IGV4dCA9IGkxOG5HZXRFeHRlbnNpb24oZm9ybWF0TmFtZSk7XG4gIGNvbnN0IGNvbnRlbnQgPSBpMThuU2VyaWFsaXplKGJ1bmRsZSwgZm9ybWF0TmFtZSwgb3B0aW9ucyk7XG4gIGNvbnN0IGRzdEZpbGUgPSBvdXRGaWxlIHx8IGBtZXNzYWdlcy4ke2V4dH1gO1xuICBjb25zdCBkc3RQYXRoID0gcGF0aC5yZXNvbHZlKG9wdGlvbnMub3V0RGlyIHx8IG9wdGlvbnMuYmFzZVBhdGggISwgZHN0RmlsZSk7XG4gIGhvc3Qud3JpdGVGaWxlKGRzdFBhdGgsIGNvbnRlbnQsIGZhbHNlLCB1bmRlZmluZWQsIFtdKTtcbiAgcmV0dXJuIFtkc3RQYXRoXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGkxOG5TZXJpYWxpemUoXG4gICAgYnVuZGxlOiBNZXNzYWdlQnVuZGxlLCBmb3JtYXROYW1lOiBzdHJpbmcsIG9wdGlvbnM6IENvbXBpbGVyT3B0aW9ucyk6IHN0cmluZyB7XG4gIGNvbnN0IGZvcm1hdCA9IGZvcm1hdE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgbGV0IHNlcmlhbGl6ZXI6IFNlcmlhbGl6ZXI7XG5cbiAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICBjYXNlICd4bWInOlxuICAgICAgc2VyaWFsaXplciA9IG5ldyBYbWIoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3hsaWZmMic6XG4gICAgY2FzZSAneGxmMic6XG4gICAgICBzZXJpYWxpemVyID0gbmV3IFhsaWZmMigpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAneGxmJzpcbiAgICBjYXNlICd4bGlmZic6XG4gICAgZGVmYXVsdDpcbiAgICAgIHNlcmlhbGl6ZXIgPSBuZXcgWGxpZmYoKTtcbiAgfVxuXG4gIHJldHVybiBidW5kbGUud3JpdGUoc2VyaWFsaXplciwgZ2V0UGF0aE5vcm1hbGl6ZXIob3B0aW9ucy5iYXNlUGF0aCkpO1xufVxuXG5mdW5jdGlvbiBnZXRQYXRoTm9ybWFsaXplcihiYXNlUGF0aD86IHN0cmluZykge1xuICAvLyBub3JtYWxpemUgc291cmNlIHBhdGhzIGJ5IHJlbW92aW5nIHRoZSBiYXNlIHBhdGggYW5kIGFsd2F5cyB1c2luZyBcIi9cIiBhcyBhIHNlcGFyYXRvclxuICByZXR1cm4gKHNvdXJjZVBhdGg6IHN0cmluZykgPT4ge1xuICAgIHNvdXJjZVBhdGggPSBiYXNlUGF0aCA/IHBhdGgucmVsYXRpdmUoYmFzZVBhdGgsIHNvdXJjZVBhdGgpIDogc291cmNlUGF0aDtcbiAgICByZXR1cm4gc291cmNlUGF0aC5zcGxpdChwYXRoLnNlcCkuam9pbignLycpO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaTE4bkdldEV4dGVuc2lvbihmb3JtYXROYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBmb3JtYXQgPSBmb3JtYXROYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICBjYXNlICd4bWInOlxuICAgICAgcmV0dXJuICd4bWInO1xuICAgIGNhc2UgJ3hsZic6XG4gICAgY2FzZSAneGxpZic6XG4gICAgY2FzZSAneGxpZmYnOlxuICAgIGNhc2UgJ3hsZjInOlxuICAgIGNhc2UgJ3hsaWZmMic6XG4gICAgICByZXR1cm4gJ3hsZic7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGZvcm1hdCBcIiR7Zm9ybWF0TmFtZX1cImApO1xufVxuXG5mdW5jdGlvbiBtZXJnZUVtaXRSZXN1bHRzKGVtaXRSZXN1bHRzOiB0cy5FbWl0UmVzdWx0W10pOiB0cy5FbWl0UmVzdWx0IHtcbiAgY29uc3QgZGlhZ25vc3RpY3M6IHRzLkRpYWdub3N0aWNbXSA9IFtdO1xuICBsZXQgZW1pdFNraXBwZWQgPSBmYWxzZTtcbiAgY29uc3QgZW1pdHRlZEZpbGVzOiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGNvbnN0IGVyIG9mIGVtaXRSZXN1bHRzKSB7XG4gICAgZGlhZ25vc3RpY3MucHVzaCguLi5lci5kaWFnbm9zdGljcyk7XG4gICAgZW1pdFNraXBwZWQgPSBlbWl0U2tpcHBlZCB8fCBlci5lbWl0U2tpcHBlZDtcbiAgICBlbWl0dGVkRmlsZXMucHVzaCguLi4oZXIuZW1pdHRlZEZpbGVzIHx8IFtdKSk7XG4gIH1cbiAgcmV0dXJuIHtkaWFnbm9zdGljcywgZW1pdFNraXBwZWQsIGVtaXR0ZWRGaWxlc307XG59XG5cbmZ1bmN0aW9uIGRpYWdub3N0aWNTb3VyY2VPZlNwYW4oc3BhbjogUGFyc2VTb3VyY2VTcGFuKTogdHMuU291cmNlRmlsZSB7XG4gIC8vIEZvciBkaWFnbm9zdGljcywgVHlwZVNjcmlwdCBvbmx5IHVzZXMgdGhlIGZpbGVOYW1lIGFuZCB0ZXh0IHByb3BlcnRpZXMuXG4gIC8vIFRoZSByZWR1bmRhbnQgJygpJyBhcmUgaGVyZSBpcyB0byBhdm9pZCBoYXZpbmcgY2xhbmctZm9ybWF0IGJyZWFraW5nIHRoZSBsaW5lIGluY29ycmVjdGx5LlxuICByZXR1cm4gKHsgZmlsZU5hbWU6IHNwYW4uc3RhcnQuZmlsZS51cmwsIHRleHQ6IHNwYW4uc3RhcnQuZmlsZS5jb250ZW50IH0gYXMgYW55KTtcbn1cblxuZnVuY3Rpb24gZGlhZ25vc3RpY1NvdXJjZU9mRmlsZU5hbWUoZmlsZU5hbWU6IHN0cmluZywgcHJvZ3JhbTogdHMuUHJvZ3JhbSk6IHRzLlNvdXJjZUZpbGUge1xuICBjb25zdCBzb3VyY2VGaWxlID0gcHJvZ3JhbS5nZXRTb3VyY2VGaWxlKGZpbGVOYW1lKTtcbiAgaWYgKHNvdXJjZUZpbGUpIHJldHVybiBzb3VyY2VGaWxlO1xuXG4gIC8vIElmIHdlIGFyZSByZXBvcnRpbmcgZGlhZ25vc3RpY3MgZm9yIGEgc291cmNlIGZpbGUgdGhhdCBpcyBub3QgaW4gdGhlIHByb2plY3QgdGhlbiB3ZSBuZWVkXG4gIC8vIHRvIGZha2UgYSBzb3VyY2UgZmlsZSBzbyB0aGUgZGlhZ25vc3RpYyBmb3JtYXR0aW5nIHJvdXRpbmVzIGNhbiBlbWl0IHRoZSBmaWxlIG5hbWUuXG4gIC8vIFRoZSByZWR1bmRhbnQgJygpJyBhcmUgaGVyZSBpcyB0byBhdm9pZCBoYXZpbmcgY2xhbmctZm9ybWF0IGJyZWFraW5nIHRoZSBsaW5lIGluY29ycmVjdGx5LlxuICByZXR1cm4gKHsgZmlsZU5hbWUsIHRleHQ6ICcnIH0gYXMgYW55KTtcbn1cblxuXG5mdW5jdGlvbiBkaWFnbm9zdGljQ2hhaW5Gcm9tRm9ybWF0dGVkRGlhZ25vc3RpY0NoYWluKGNoYWluOiBGb3JtYXR0ZWRNZXNzYWdlQ2hhaW4pOlxuICAgIERpYWdub3N0aWNNZXNzYWdlQ2hhaW4ge1xuICByZXR1cm4ge1xuICAgIG1lc3NhZ2VUZXh0OiBjaGFpbi5tZXNzYWdlLFxuICAgIG5leHQ6IGNoYWluLm5leHQgJiYgZGlhZ25vc3RpY0NoYWluRnJvbUZvcm1hdHRlZERpYWdub3N0aWNDaGFpbihjaGFpbi5uZXh0KSxcbiAgICBwb3NpdGlvbjogY2hhaW4ucG9zaXRpb25cbiAgfTtcbn1cblxuZnVuY3Rpb24gc3ludGF4RXJyb3JUb0RpYWdub3N0aWNzKGVycm9yOiBFcnJvcik6IERpYWdub3N0aWNbXSB7XG4gIGNvbnN0IHBhcnNlckVycm9ycyA9IGdldFBhcnNlRXJyb3JzKGVycm9yKTtcbiAgaWYgKHBhcnNlckVycm9ycyAmJiBwYXJzZXJFcnJvcnMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHBhcnNlckVycm9ycy5tYXA8RGlhZ25vc3RpYz4oZSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZVRleHQ6IGUuY29udGV4dHVhbE1lc3NhZ2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IGRpYWdub3N0aWNTb3VyY2VPZlNwYW4oZS5zcGFuKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBlLnNwYW4uc3RhcnQub2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiBlLnNwYW4uZW5kLm9mZnNldCAtIGUuc3Bhbi5zdGFydC5vZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogdHMuRGlhZ25vc3RpY0NhdGVnb3J5LkVycm9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBTT1VSQ0UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBERUZBVUxUX0VSUk9SX0NPREVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gIH0gZWxzZSBpZiAoaXNGb3JtYXR0ZWRFcnJvcihlcnJvcikpIHtcbiAgICByZXR1cm4gW3tcbiAgICAgIG1lc3NhZ2VUZXh0OiBlcnJvci5tZXNzYWdlLFxuICAgICAgY2hhaW46IGVycm9yLmNoYWluICYmIGRpYWdub3N0aWNDaGFpbkZyb21Gb3JtYXR0ZWREaWFnbm9zdGljQ2hhaW4oZXJyb3IuY2hhaW4pLFxuICAgICAgY2F0ZWdvcnk6IHRzLkRpYWdub3N0aWNDYXRlZ29yeS5FcnJvcixcbiAgICAgIHNvdXJjZTogU09VUkNFLFxuICAgICAgY29kZTogREVGQVVMVF9FUlJPUl9DT0RFLFxuICAgICAgcG9zaXRpb246IGVycm9yLnBvc2l0aW9uXG4gICAgfV07XG4gIH1cbiAgLy8gUHJvZHVjZSBhIERpYWdub3N0aWMgYW55d2F5IHNpbmNlIHdlIGtub3cgZm9yIHN1cmUgYGVycm9yYCBpcyBhIFN5bnRheEVycm9yXG4gIHJldHVybiBbe1xuICAgIG1lc3NhZ2VUZXh0OiBlcnJvci5tZXNzYWdlLFxuICAgIGNhdGVnb3J5OiB0cy5EaWFnbm9zdGljQ2F0ZWdvcnkuRXJyb3IsXG4gICAgY29kZTogREVGQVVMVF9FUlJPUl9DT0RFLFxuICAgIHNvdXJjZTogU09VUkNFLFxuICB9XTtcbn1cbiJdfQ==