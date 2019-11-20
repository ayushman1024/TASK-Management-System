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
        define("@angular/compiler-cli/src/transformers/compiler_host", ["require", "exports", "tslib", "@angular/compiler", "path", "typescript", "@angular/compiler-cli/src/transformers/metadata_reader", "@angular/compiler-cli/src/transformers/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var compiler_1 = require("@angular/compiler");
    var path = require("path");
    var ts = require("typescript");
    var metadata_reader_1 = require("@angular/compiler-cli/src/transformers/metadata_reader");
    var util_1 = require("@angular/compiler-cli/src/transformers/util");
    var NODE_MODULES_PACKAGE_NAME = /node_modules\/((\w|-|\.)+|(@(\w|-|\.)+\/(\w|-|\.)+))/;
    var EXT = /(\.ts|\.d\.ts|\.js|\.jsx|\.tsx)$/;
    var CSS_PREPROCESSOR_EXT = /(\.scss|\.less|\.styl)$/;
    function createCompilerHost(_a) {
        var options = _a.options, _b = _a.tsHost, tsHost = _b === void 0 ? ts.createCompilerHost(options, true) : _b;
        return tsHost;
    }
    exports.createCompilerHost = createCompilerHost;
    function assert(condition) {
        if (!condition) {
            // TODO(chuckjaz): do the right thing
        }
        return condition;
    }
    /**
     * Implements the following hosts based on an api.CompilerHost:
     * - ts.CompilerHost to be consumed by a ts.Program
     * - AotCompilerHost for @angular/compiler
     * - TypeCheckHost for mapping ts errors to ng errors (via translateDiagnostics)
     */
    var TsCompilerAotCompilerTypeCheckHostAdapter = /** @class */ (function () {
        function TsCompilerAotCompilerTypeCheckHostAdapter(rootFiles, options, context, metadataProvider, codeGenerator, librarySummaries) {
            if (librarySummaries === void 0) { librarySummaries = new Map(); }
            var _this = this;
            this.rootFiles = rootFiles;
            this.options = options;
            this.context = context;
            this.metadataProvider = metadataProvider;
            this.codeGenerator = codeGenerator;
            this.librarySummaries = librarySummaries;
            this.metadataReaderCache = metadata_reader_1.createMetadataReaderCache();
            this.fileNameToModuleNameCache = new Map();
            this.flatModuleIndexCache = new Map();
            this.flatModuleIndexNames = new Set();
            this.flatModuleIndexRedirectNames = new Set();
            this.originalSourceFiles = new Map();
            this.originalFileExistsCache = new Map();
            this.generatedSourceFiles = new Map();
            this.generatedCodeFor = new Map();
            this.emitter = new compiler_1.TypeScriptEmitter();
            this.getDefaultLibFileName = function (options) {
                return _this.context.getDefaultLibFileName(options);
            };
            this.getCurrentDirectory = function () { return _this.context.getCurrentDirectory(); };
            this.getCanonicalFileName = function (fileName) { return _this.context.getCanonicalFileName(fileName); };
            this.useCaseSensitiveFileNames = function () { return _this.context.useCaseSensitiveFileNames(); };
            this.getNewLine = function () { return _this.context.getNewLine(); };
            // Make sure we do not `host.realpath()` from TS as we do not want to resolve symlinks.
            // https://github.com/Microsoft/TypeScript/issues/9552
            this.realpath = function (p) { return p; };
            this.writeFile = this.context.writeFile.bind(this.context);
            this.moduleResolutionCache = ts.createModuleResolutionCache(this.context.getCurrentDirectory(), this.context.getCanonicalFileName.bind(this.context));
            var basePath = this.options.basePath;
            this.rootDirs =
                (this.options.rootDirs || [this.options.basePath]).map(function (p) { return path.resolve(basePath, p); });
            if (context.getDirectories) {
                this.getDirectories = function (path) { return context.getDirectories(path); };
            }
            if (context.directoryExists) {
                this.directoryExists = function (directoryName) { return context.directoryExists(directoryName); };
            }
            if (context.getCancellationToken) {
                this.getCancellationToken = function () { return context.getCancellationToken(); };
            }
            if (context.getDefaultLibLocation) {
                this.getDefaultLibLocation = function () { return context.getDefaultLibLocation(); };
            }
            if (context.resolveTypeReferenceDirectives) {
                this.resolveTypeReferenceDirectives = function (names, containingFile) {
                    return context.resolveTypeReferenceDirectives(names, containingFile);
                };
            }
            if (context.trace) {
                this.trace = function (s) { return context.trace(s); };
            }
            if (context.fileNameToModuleName) {
                this.fileNameToModuleName = context.fileNameToModuleName.bind(context);
            }
            // Note: don't copy over context.moduleNameToFileName as we first
            // normalize undefined containingFile to a filled containingFile.
            if (context.resourceNameToFileName) {
                this.resourceNameToFileName = context.resourceNameToFileName.bind(context);
            }
            if (context.toSummaryFileName) {
                this.toSummaryFileName = context.toSummaryFileName.bind(context);
            }
            if (context.fromSummaryFileName) {
                this.fromSummaryFileName = context.fromSummaryFileName.bind(context);
            }
            this.metadataReaderHost = {
                cacheMetadata: function () { return true; },
                getSourceFileMetadata: function (filePath) {
                    var sf = _this.getOriginalSourceFile(filePath);
                    return sf ? _this.metadataProvider.getMetadata(sf) : undefined;
                },
                fileExists: function (filePath) { return _this.originalFileExists(filePath); },
                readFile: function (filePath) { return assert(_this.context.readFile(filePath)); },
            };
        }
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.resolveModuleName = function (moduleName, containingFile) {
            var rm = ts.resolveModuleName(moduleName, containingFile.replace(/\\/g, '/'), this.options, this, this.moduleResolutionCache)
                .resolvedModule;
            if (rm && this.isSourceFile(rm.resolvedFileName) && util_1.DTS.test(rm.resolvedFileName)) {
                // Case: generateCodeForLibraries = true and moduleName is
                // a .d.ts file in a node_modules folder.
                // Need to set isExternalLibraryImport to false so that generated files for that file
                // are emitted.
                rm.isExternalLibraryImport = false;
            }
            return rm;
        };
        // Note: We implement this method so that TypeScript and Angular share the same
        // ts.ModuleResolutionCache
        // and that we can tell ts.Program about our different opinion about
        // ResolvedModule.isExternalLibraryImport
        // (see our isSourceFile method).
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.resolveModuleNames = function (moduleNames, containingFile) {
            var _this = this;
            // TODO(tbosch): this seems to be a typing error in TypeScript,
            // as it contains assertions that the result contains the same number of entries
            // as the given module names.
            return moduleNames.map(function (moduleName) { return _this.resolveModuleName(moduleName, containingFile); });
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.moduleNameToFileName = function (m, containingFile) {
            if (!containingFile) {
                if (m.indexOf('.') === 0) {
                    throw new Error('Resolution of relative paths requires a containing file.');
                }
                // Any containing file gives the same result for absolute imports
                containingFile = this.rootFiles[0];
            }
            if (this.context.moduleNameToFileName) {
                return this.context.moduleNameToFileName(m, containingFile);
            }
            var resolved = this.resolveModuleName(m, containingFile);
            return resolved ? resolved.resolvedFileName : null;
        };
        /**
         * We want a moduleId that will appear in import statements in the generated code
         * which will be written to `containingFile`.
         *
         * Note that we also generate files for files in node_modules, as libraries
         * only ship .metadata.json files but not the generated code.
         *
         * Logic:
         * 1. if the importedFile and the containingFile are from the project sources
         *    or from the same node_modules package, use a relative path
         * 2. if the importedFile is in a node_modules package,
         *    use a path that starts with the package name.
         * 3. Error if the containingFile is in the node_modules package
         *    and the importedFile is in the project soures,
         *    as that is a violation of the principle that node_modules packages cannot
         *    import project sources.
         */
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.fileNameToModuleName = function (importedFile, containingFile) {
            var cacheKey = importedFile + ":" + containingFile;
            var moduleName = this.fileNameToModuleNameCache.get(cacheKey);
            if (moduleName != null) {
                return moduleName;
            }
            var originalImportedFile = importedFile;
            if (this.options.traceResolution) {
                console.error('fileNameToModuleName from containingFile', containingFile, 'to importedFile', importedFile);
            }
            // drop extension
            importedFile = importedFile.replace(EXT, '');
            var importedFilePackageName = getPackageName(importedFile);
            var containingFilePackageName = getPackageName(containingFile);
            if (importedFilePackageName === containingFilePackageName ||
                util_1.GENERATED_FILES.test(originalImportedFile)) {
                var rootedContainingFile = util_1.relativeToRootDirs(containingFile, this.rootDirs);
                var rootedImportedFile = util_1.relativeToRootDirs(importedFile, this.rootDirs);
                if (rootedContainingFile !== containingFile && rootedImportedFile !== importedFile) {
                    // if both files are contained in the `rootDirs`, then strip the rootDirs
                    containingFile = rootedContainingFile;
                    importedFile = rootedImportedFile;
                }
                moduleName = dotRelative(path.dirname(containingFile), importedFile);
            }
            else if (importedFilePackageName) {
                moduleName = stripNodeModulesPrefix(importedFile);
                if (originalImportedFile.endsWith('.d.ts')) {
                    // the moduleName for these typings could be shortented to the npm package name
                    // if the npm package typings matches the importedFile
                    try {
                        var modulePath = importedFile.substring(0, importedFile.length - moduleName.length) +
                            importedFilePackageName;
                        var packageJson = require(modulePath + '/package.json');
                        var packageTypings = path.posix.join(modulePath, packageJson.typings);
                        if (packageTypings === originalImportedFile) {
                            moduleName = importedFilePackageName;
                        }
                    }
                    catch (_a) {
                        // the above require() will throw if there is no package.json file
                        // and this is safe to ignore and correct to keep the longer
                        // moduleName in this case
                    }
                }
            }
            else {
                throw new Error("Trying to import a source file from a node_modules package: import " + originalImportedFile + " from " + containingFile);
            }
            this.fileNameToModuleNameCache.set(cacheKey, moduleName);
            return moduleName;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.resourceNameToFileName = function (resourceName, containingFile) {
            // Note: we convert package paths into relative paths to be compatible with the the
            // previous implementation of UrlResolver.
            var firstChar = resourceName[0];
            if (firstChar === '/') {
                resourceName = resourceName.slice(1);
            }
            else if (firstChar !== '.') {
                resourceName = "./" + resourceName;
            }
            var filePathWithNgResource = this.moduleNameToFileName(addNgResourceSuffix(resourceName), containingFile);
            // If the user specified styleUrl pointing to *.scss, but the Sass compiler was run before
            // Angular, then the resource may have been generated as *.css. Simply try the resolution again.
            if (!filePathWithNgResource && CSS_PREPROCESSOR_EXT.test(resourceName)) {
                var fallbackResourceName = resourceName.replace(CSS_PREPROCESSOR_EXT, '.css');
                filePathWithNgResource =
                    this.moduleNameToFileName(addNgResourceSuffix(fallbackResourceName), containingFile);
            }
            var result = filePathWithNgResource ? stripNgResourceSuffix(filePathWithNgResource) : null;
            // Used under Bazel to report more specific error with remediation advice
            if (!result && this.context.reportMissingResource) {
                this.context.reportMissingResource(resourceName);
            }
            return result;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.toSummaryFileName = function (fileName, referringSrcFileName) {
            return this.fileNameToModuleName(fileName, referringSrcFileName);
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.fromSummaryFileName = function (fileName, referringLibFileName) {
            var resolved = this.moduleNameToFileName(fileName, referringLibFileName);
            if (!resolved) {
                throw new Error("Could not resolve " + fileName + " from " + referringLibFileName);
            }
            return resolved;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.parseSourceSpanOf = function (fileName, line, character) {
            var data = this.generatedSourceFiles.get(fileName);
            if (data && data.emitCtx) {
                return data.emitCtx.spanOf(line, character);
            }
            return null;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.getOriginalSourceFile = function (filePath, languageVersion, onError) {
            // Note: we need the explicit check via `has` as we also cache results
            // that were null / undefined.
            if (this.originalSourceFiles.has(filePath)) {
                return this.originalSourceFiles.get(filePath);
            }
            if (!languageVersion) {
                languageVersion = this.options.target || ts.ScriptTarget.Latest;
            }
            // Note: This can also return undefined,
            // as the TS typings are not correct!
            var sf = this.context.getSourceFile(filePath, languageVersion, onError) || null;
            this.originalSourceFiles.set(filePath, sf);
            return sf;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.updateGeneratedFile = function (genFile) {
            if (!genFile.stmts) {
                throw new Error("Invalid Argument: Expected a GenerateFile with statements. " + genFile.genFileUrl);
            }
            var oldGenFile = this.generatedSourceFiles.get(genFile.genFileUrl);
            if (!oldGenFile) {
                throw new Error("Illegal State: previous GeneratedFile not found for " + genFile.genFileUrl + ".");
            }
            var newRefs = genFileExternalReferences(genFile);
            var oldRefs = oldGenFile.externalReferences;
            var refsAreEqual = oldRefs.size === newRefs.size;
            if (refsAreEqual) {
                newRefs.forEach(function (r) { return refsAreEqual = refsAreEqual && oldRefs.has(r); });
            }
            if (!refsAreEqual) {
                throw new Error("Illegal State: external references changed in " + genFile.genFileUrl + ".\nOld: " + Array.from(oldRefs) + ".\nNew: " + Array.from(newRefs));
            }
            return this.addGeneratedFile(genFile, newRefs);
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.addGeneratedFile = function (genFile, externalReferences) {
            if (!genFile.stmts) {
                throw new Error("Invalid Argument: Expected a GenerateFile with statements. " + genFile.genFileUrl);
            }
            var _a = this.emitter.emitStatementsAndContext(genFile.genFileUrl, genFile.stmts, /* preamble */ '', 
            /* emitSourceMaps */ false), sourceText = _a.sourceText, context = _a.context;
            var sf = ts.createSourceFile(genFile.genFileUrl, sourceText, this.options.target || ts.ScriptTarget.Latest);
            if ((this.options.module === ts.ModuleKind.AMD || this.options.module === ts.ModuleKind.UMD) &&
                this.context.amdModuleName) {
                var moduleName = this.context.amdModuleName(sf);
                if (moduleName)
                    sf.moduleName = moduleName;
            }
            this.generatedSourceFiles.set(genFile.genFileUrl, {
                sourceFile: sf,
                emitCtx: context, externalReferences: externalReferences,
            });
            return sf;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.shouldGenerateFile = function (fileName) {
            var _this = this;
            // TODO(tbosch): allow generating files that are not in the rootDir
            // See https://github.com/angular/angular/issues/19337
            if (!util_1.isInRootDir(fileName, this.options)) {
                return { generate: false };
            }
            var genMatch = util_1.GENERATED_FILES.exec(fileName);
            if (!genMatch) {
                return { generate: false };
            }
            var _a = tslib_1.__read(genMatch, 4), base = _a[1], genSuffix = _a[2], suffix = _a[3];
            if (suffix !== 'ts' && suffix !== 'tsx') {
                return { generate: false };
            }
            var baseFileName;
            if (genSuffix.indexOf('ngstyle') >= 0) {
                // Note: ngstyle files have names like `afile.css.ngstyle.ts`
                if (!this.originalFileExists(base)) {
                    return { generate: false };
                }
            }
            else {
                // Note: on-the-fly generated files always have a `.ts` suffix,
                // but the file from which we generated it can be a `.ts`/ `.tsx`/ `.d.ts`
                // (see options.generateCodeForLibraries).
                baseFileName = [base + ".ts", base + ".tsx", base + ".d.ts"].find(function (baseFileName) { return _this.isSourceFile(baseFileName) && _this.originalFileExists(baseFileName); });
                if (!baseFileName) {
                    return { generate: false };
                }
            }
            return { generate: true, baseFileName: baseFileName };
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.shouldGenerateFilesFor = function (fileName) {
            // TODO(tbosch): allow generating files that are not in the rootDir
            // See https://github.com/angular/angular/issues/19337
            return !util_1.GENERATED_FILES.test(fileName) && this.isSourceFile(fileName) &&
                util_1.isInRootDir(fileName, this.options);
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.getSourceFile = function (fileName, languageVersion, onError) {
            var _this = this;
            // Note: Don't exit early in this method to make sure
            // we always have up to date references on the file!
            var genFileNames = [];
            var sf = this.getGeneratedFile(fileName);
            if (!sf) {
                var summary = this.librarySummaries.get(fileName);
                if (summary) {
                    if (!summary.sourceFile) {
                        summary.sourceFile = ts.createSourceFile(fileName, summary.text, this.options.target || ts.ScriptTarget.Latest);
                    }
                    sf = summary.sourceFile;
                    genFileNames = [];
                }
            }
            if (!sf) {
                sf = this.getOriginalSourceFile(fileName);
                var cachedGenFiles = this.generatedCodeFor.get(fileName);
                if (cachedGenFiles) {
                    genFileNames = cachedGenFiles;
                }
                else {
                    if (!this.options.noResolve && this.shouldGenerateFilesFor(fileName)) {
                        genFileNames = this.codeGenerator.findGeneratedFileNames(fileName).filter(function (fileName) { return _this.shouldGenerateFile(fileName).generate; });
                    }
                    this.generatedCodeFor.set(fileName, genFileNames);
                }
            }
            if (sf) {
                addReferencesToSourceFile(sf, genFileNames);
            }
            // TODO(tbosch): TypeScript's typings for getSourceFile are incorrect,
            // as it can very well return undefined.
            return sf;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.getGeneratedFile = function (fileName) {
            var genSrcFile = this.generatedSourceFiles.get(fileName);
            if (genSrcFile) {
                return genSrcFile.sourceFile;
            }
            var _a = this.shouldGenerateFile(fileName), generate = _a.generate, baseFileName = _a.baseFileName;
            if (generate) {
                var genFile = this.codeGenerator.generateFile(fileName, baseFileName);
                return this.addGeneratedFile(genFile, genFileExternalReferences(genFile));
            }
            return null;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.originalFileExists = function (fileName) {
            var fileExists = this.originalFileExistsCache.get(fileName);
            if (fileExists == null) {
                fileExists = this.context.fileExists(fileName);
                this.originalFileExistsCache.set(fileName, fileExists);
            }
            return fileExists;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.fileExists = function (fileName) {
            fileName = stripNgResourceSuffix(fileName);
            if (this.librarySummaries.has(fileName) || this.generatedSourceFiles.has(fileName)) {
                return true;
            }
            if (this.shouldGenerateFile(fileName).generate) {
                return true;
            }
            return this.originalFileExists(fileName);
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.loadSummary = function (filePath) {
            var summary = this.librarySummaries.get(filePath);
            if (summary) {
                return summary.text;
            }
            if (this.originalFileExists(filePath)) {
                return assert(this.context.readFile(filePath));
            }
            return null;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.isSourceFile = function (filePath) {
            // Don't generate any files nor typecheck them
            // if skipTemplateCodegen is set and fullTemplateTypeCheck is not yet set,
            // for backwards compatibility.
            if (this.options.skipTemplateCodegen && !this.options.fullTemplateTypeCheck) {
                return false;
            }
            // If we have a summary from a previous compilation,
            // treat the file never as a source file.
            if (this.librarySummaries.has(filePath)) {
                return false;
            }
            if (util_1.GENERATED_FILES.test(filePath)) {
                return false;
            }
            if (this.options.generateCodeForLibraries === false && util_1.DTS.test(filePath)) {
                return false;
            }
            if (util_1.DTS.test(filePath)) {
                // Check for a bundle index.
                if (this.hasBundleIndex(filePath)) {
                    var normalFilePath = path.normalize(filePath);
                    return this.flatModuleIndexNames.has(normalFilePath) ||
                        this.flatModuleIndexRedirectNames.has(normalFilePath);
                }
            }
            return true;
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.readFile = function (fileName) {
            var summary = this.librarySummaries.get(fileName);
            if (summary) {
                return summary.text;
            }
            return this.context.readFile(fileName);
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.getMetadataFor = function (filePath) {
            return metadata_reader_1.readMetadata(filePath, this.metadataReaderHost, this.metadataReaderCache);
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.loadResource = function (filePath) {
            if (this.context.readResource)
                return this.context.readResource(filePath);
            if (!this.originalFileExists(filePath)) {
                throw compiler_1.syntaxError("Error: Resource file not found: " + filePath);
            }
            return assert(this.context.readFile(filePath));
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.getOutputName = function (filePath) {
            return path.relative(this.getCurrentDirectory(), filePath);
        };
        TsCompilerAotCompilerTypeCheckHostAdapter.prototype.hasBundleIndex = function (filePath) {
            var _this = this;
            var checkBundleIndex = function (directory) {
                var result = _this.flatModuleIndexCache.get(directory);
                if (result == null) {
                    if (path.basename(directory) == 'node_module') {
                        // Don't look outside the node_modules this package is installed in.
                        result = false;
                    }
                    else {
                        // A bundle index exists if the typings .d.ts file has a metadata.json that has an
                        // importAs.
                        try {
                            var packageFile = path.join(directory, 'package.json');
                            if (_this.originalFileExists(packageFile)) {
                                // Once we see a package.json file, assume false until it we find the bundle index.
                                result = false;
                                var packageContent = JSON.parse(assert(_this.context.readFile(packageFile)));
                                if (packageContent.typings) {
                                    var typings = path.normalize(path.join(directory, packageContent.typings));
                                    if (util_1.DTS.test(typings)) {
                                        var metadataFile = typings.replace(util_1.DTS, '.metadata.json');
                                        if (_this.originalFileExists(metadataFile)) {
                                            var metadata = JSON.parse(assert(_this.context.readFile(metadataFile)));
                                            if (metadata.flatModuleIndexRedirect) {
                                                _this.flatModuleIndexRedirectNames.add(typings);
                                                // Note: don't set result = true,
                                                // as this would mark this folder
                                                // as having a bundleIndex too early without
                                                // filling the bundleIndexNames.
                                            }
                                            else if (metadata.importAs) {
                                                _this.flatModuleIndexNames.add(typings);
                                                result = true;
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                var parent = path.dirname(directory);
                                if (parent != directory) {
                                    // Try the parent directory.
                                    result = checkBundleIndex(parent);
                                }
                                else {
                                    result = false;
                                }
                            }
                        }
                        catch (_a) {
                            // If we encounter any errors assume we this isn't a bundle index.
                            result = false;
                        }
                    }
                    _this.flatModuleIndexCache.set(directory, result);
                }
                return result;
            };
            return checkBundleIndex(path.dirname(filePath));
        };
        return TsCompilerAotCompilerTypeCheckHostAdapter;
    }());
    exports.TsCompilerAotCompilerTypeCheckHostAdapter = TsCompilerAotCompilerTypeCheckHostAdapter;
    function genFileExternalReferences(genFile) {
        return new Set(compiler_1.collectExternalReferences(genFile.stmts).map(function (er) { return er.moduleName; }));
    }
    function addReferencesToSourceFile(sf, genFileNames) {
        // Note: as we modify ts.SourceFiles we need to keep the original
        // value for `referencedFiles` around in cache the original host is caching ts.SourceFiles.
        // Note: cloning the ts.SourceFile is expensive as the nodes in have parent pointers,
        // i.e. we would also need to clone and adjust all nodes.
        var originalReferencedFiles = sf.originalReferencedFiles;
        if (!originalReferencedFiles) {
            originalReferencedFiles = sf.referencedFiles;
            sf.originalReferencedFiles = originalReferencedFiles;
        }
        var newReferencedFiles = tslib_1.__spread(originalReferencedFiles);
        genFileNames.forEach(function (gf) { return newReferencedFiles.push({ fileName: gf, pos: 0, end: 0 }); });
        sf.referencedFiles = newReferencedFiles;
    }
    function getOriginalReferences(sourceFile) {
        return sourceFile && sourceFile.originalReferencedFiles;
    }
    exports.getOriginalReferences = getOriginalReferences;
    function dotRelative(from, to) {
        var rPath = path.relative(from, to).replace(/\\/g, '/');
        return rPath.startsWith('.') ? rPath : './' + rPath;
    }
    /**
     * Moves the path into `genDir` folder while preserving the `node_modules` directory.
     */
    function getPackageName(filePath) {
        var match = NODE_MODULES_PACKAGE_NAME.exec(filePath);
        return match ? match[1] : null;
    }
    function stripNodeModulesPrefix(filePath) {
        return filePath.replace(/.*node_modules\//, '');
    }
    function getNodeModulesPrefix(filePath) {
        var match = /.*node_modules\//.exec(filePath);
        return match ? match[1] : null;
    }
    function stripNgResourceSuffix(fileName) {
        return fileName.replace(/\.\$ngresource\$.*/, '');
    }
    function addNgResourceSuffix(fileName) {
        return fileName + ".$ngresource$";
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXJfaG9zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9zcmMvdHJhbnNmb3JtZXJzL2NvbXBpbGVyX2hvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7O0lBRUgsOENBQXVMO0lBQ3ZMLDJCQUE2QjtJQUM3QiwrQkFBaUM7SUFNakMsMEZBQThGO0lBQzlGLG9FQUE2RTtJQUU3RSxJQUFNLHlCQUF5QixHQUFHLHNEQUFzRCxDQUFDO0lBQ3pGLElBQU0sR0FBRyxHQUFHLGtDQUFrQyxDQUFDO0lBQy9DLElBQU0sb0JBQW9CLEdBQUcseUJBQXlCLENBQUM7SUFFdkQsU0FBZ0Isa0JBQWtCLENBQzlCLEVBQ3dEO1lBRHZELG9CQUFPLEVBQUUsY0FBNkMsRUFBN0Msa0VBQTZDO1FBRXpELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFKRCxnREFJQztJQWlCRCxTQUFTLE1BQU0sQ0FBSSxTQUErQjtRQUNoRCxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2QscUNBQXFDO1NBQ3RDO1FBQ0QsT0FBTyxTQUFXLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0g7UUE0QkUsbURBQ1ksU0FBZ0MsRUFBVSxPQUF3QixFQUNsRSxPQUFxQixFQUFVLGdCQUFrQyxFQUNqRSxhQUE0QixFQUM1QixnQkFBb0Q7WUFBcEQsaUNBQUEsRUFBQSx1QkFBdUIsR0FBRyxFQUEwQjtZQUpoRSxpQkEwREM7WUF6RFcsY0FBUyxHQUFULFNBQVMsQ0FBdUI7WUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFpQjtZQUNsRSxZQUFPLEdBQVAsT0FBTyxDQUFjO1lBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtZQUNqRSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtZQUM1QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW9DO1lBOUJ4RCx3QkFB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QUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNqQyxDQUFDO0lBRUQsU0FBUyxzQkFBc0IsQ0FBQyxRQUFnQjtRQUM5QyxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELFNBQVMsb0JBQW9CLENBQUMsUUFBZ0I7UUFDNUMsSUFBTSxLQUFLLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNqQyxDQUFDO0lBRUQsU0FBUyxxQkFBcUIsQ0FBQyxRQUFnQjtRQUM3QyxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELFNBQVMsbUJBQW1CLENBQUMsUUFBZ0I7UUFDM0MsT0FBVSxRQUFRLGtCQUFlLENBQUM7SUFDcEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBb3RDb21waWxlckhvc3QsIEVtaXR0ZXJWaXNpdG9yQ29udGV4dCwgRXh0ZXJuYWxSZWZlcmVuY2UsIEdlbmVyYXRlZEZpbGUsIFBhcnNlU291cmNlU3BhbiwgVHlwZVNjcmlwdEVtaXR0ZXIsIGNvbGxlY3RFeHRlcm5hbFJlZmVyZW5jZXMsIHN5bnRheEVycm9yfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbmltcG9ydCB7VHlwZUNoZWNrSG9zdH0gZnJvbSAnLi4vZGlhZ25vc3RpY3MvdHJhbnNsYXRlX2RpYWdub3N0aWNzJztcbmltcG9ydCB7TUVUQURBVEFfVkVSU0lPTiwgTW9kdWxlTWV0YWRhdGF9IGZyb20gJy4uL21ldGFkYXRhL2luZGV4JztcblxuaW1wb3J0IHtDb21waWxlckhvc3QsIENvbXBpbGVyT3B0aW9ucywgTGlicmFyeVN1bW1hcnl9IGZyb20gJy4vYXBpJztcbmltcG9ydCB7TWV0YWRhdGFSZWFkZXJIb3N0LCBjcmVhdGVNZXRhZGF0YVJlYWRlckNhY2hlLCByZWFkTWV0YWRhdGF9IGZyb20gJy4vbWV0YWRhdGFfcmVhZGVyJztcbmltcG9ydCB7RFRTLCBHRU5FUkFURURfRklMRVMsIGlzSW5Sb290RGlyLCByZWxhdGl2ZVRvUm9vdERpcnN9IGZyb20gJy4vdXRpbCc7XG5cbmNvbnN0IE5PREVfTU9EVUxFU19QQUNLQUdFX05BTUUgPSAvbm9kZV9tb2R1bGVzXFwvKChcXHd8LXxcXC4pK3woQChcXHd8LXxcXC4pK1xcLyhcXHd8LXxcXC4pKykpLztcbmNvbnN0IEVYVCA9IC8oXFwudHN8XFwuZFxcLnRzfFxcLmpzfFxcLmpzeHxcXC50c3gpJC87XG5jb25zdCBDU1NfUFJFUFJPQ0VTU09SX0VYVCA9IC8oXFwuc2Nzc3xcXC5sZXNzfFxcLnN0eWwpJC87XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb21waWxlckhvc3QoXG4gICAge29wdGlvbnMsIHRzSG9zdCA9IHRzLmNyZWF0ZUNvbXBpbGVySG9zdChvcHRpb25zLCB0cnVlKX06XG4gICAgICAgIHtvcHRpb25zOiBDb21waWxlck9wdGlvbnMsIHRzSG9zdD86IHRzLkNvbXBpbGVySG9zdH0pOiBDb21waWxlckhvc3Qge1xuICByZXR1cm4gdHNIb3N0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1ldGFkYXRhUHJvdmlkZXIge1xuICBnZXRNZXRhZGF0YShzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlKTogTW9kdWxlTWV0YWRhdGF8dW5kZWZpbmVkO1xufVxuXG5pbnRlcmZhY2UgR2VuU291cmNlRmlsZSB7XG4gIGV4dGVybmFsUmVmZXJlbmNlczogU2V0PHN0cmluZz47XG4gIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGU7XG4gIGVtaXRDdHg6IEVtaXR0ZXJWaXNpdG9yQ29udGV4dDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2RlR2VuZXJhdG9yIHtcbiAgZ2VuZXJhdGVGaWxlKGdlbkZpbGVOYW1lOiBzdHJpbmcsIGJhc2VGaWxlTmFtZT86IHN0cmluZyk6IEdlbmVyYXRlZEZpbGU7XG4gIGZpbmRHZW5lcmF0ZWRGaWxlTmFtZXMoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZ1tdO1xufVxuXG5mdW5jdGlvbiBhc3NlcnQ8VD4oY29uZGl0aW9uOiBUIHwgbnVsbCB8IHVuZGVmaW5lZCkge1xuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIC8vIFRPRE8oY2h1Y2tqYXopOiBkbyB0aGUgcmlnaHQgdGhpbmdcbiAgfVxuICByZXR1cm4gY29uZGl0aW9uICE7XG59XG5cbi8qKlxuICogSW1wbGVtZW50cyB0aGUgZm9sbG93aW5nIGhvc3RzIGJhc2VkIG9uIGFuIGFwaS5Db21waWxlckhvc3Q6XG4gKiAtIHRzLkNvbXBpbGVySG9zdCB0byBiZSBjb25zdW1lZCBieSBhIHRzLlByb2dyYW1cbiAqIC0gQW90Q29tcGlsZXJIb3N0IGZvciBAYW5ndWxhci9jb21waWxlclxuICogLSBUeXBlQ2hlY2tIb3N0IGZvciBtYXBwaW5nIHRzIGVycm9ycyB0byBuZyBlcnJvcnMgKHZpYSB0cmFuc2xhdGVEaWFnbm9zdGljcylcbiAqL1xuZXhwb3J0IGNsYXNzIFRzQ29tcGlsZXJBb3RDb21waWxlclR5cGVDaGVja0hvc3RBZGFwdGVyIGltcGxlbWVudHMgdHMuQ29tcGlsZXJIb3N0LCBBb3RDb21waWxlckhvc3QsXG4gICAgVHlwZUNoZWNrSG9zdCB7XG4gIHByaXZhdGUgbWV0YWRhdGFSZWFkZXJDYWNoZSA9IGNyZWF0ZU1ldGFkYXRhUmVhZGVyQ2FjaGUoKTtcbiAgcHJpdmF0ZSBmaWxlTmFtZVRvTW9kdWxlTmFtZUNhY2hlID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgcHJpdmF0ZSBmbGF0TW9kdWxlSW5kZXhDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBib29sZWFuPigpO1xuICBwcml2YXRlIGZsYXRNb2R1bGVJbmRleE5hbWVzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIHByaXZhdGUgZmxhdE1vZHVsZUluZGV4UmVkaXJlY3ROYW1lcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBwcml2YXRlIHJvb3REaXJzOiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSBtb2R1bGVSZXNvbHV0aW9uQ2FjaGU6IHRzLk1vZHVsZVJlc29sdXRpb25DYWNoZTtcbiAgcHJpdmF0ZSBvcmlnaW5hbFNvdXJjZUZpbGVzID0gbmV3IE1hcDxzdHJpbmcsIHRzLlNvdXJjZUZpbGV8bnVsbD4oKTtcbiAgcHJpdmF0ZSBvcmlnaW5hbEZpbGVFeGlzdHNDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBib29sZWFuPigpO1xuICBwcml2YXRlIGdlbmVyYXRlZFNvdXJjZUZpbGVzID0gbmV3IE1hcDxzdHJpbmcsIEdlblNvdXJjZUZpbGU+KCk7XG4gIHByaXZhdGUgZ2VuZXJhdGVkQ29kZUZvciA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmdbXT4oKTtcbiAgcHJpdmF0ZSBlbWl0dGVyID0gbmV3IFR5cGVTY3JpcHRFbWl0dGVyKCk7XG4gIHByaXZhdGUgbWV0YWRhdGFSZWFkZXJIb3N0OiBNZXRhZGF0YVJlYWRlckhvc3Q7XG5cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIGdldENhbmNlbGxhdGlvblRva2VuICE6ICgpID0+IHRzLkNhbmNlbGxhdGlvblRva2VuO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgZ2V0RGVmYXVsdExpYkxvY2F0aW9uICE6ICgpID0+IHN0cmluZztcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHRyYWNlICE6IChzOiBzdHJpbmcpID0+IHZvaWQ7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBnZXREaXJlY3RvcmllcyAhOiAocGF0aDogc3RyaW5nKSA9PiBzdHJpbmdbXTtcbiAgcmVzb2x2ZVR5cGVSZWZlcmVuY2VEaXJlY3RpdmVzPzpcbiAgICAgIChuYW1lczogc3RyaW5nW10sIGNvbnRhaW5pbmdGaWxlOiBzdHJpbmcpID0+IHRzLlJlc29sdmVkVHlwZVJlZmVyZW5jZURpcmVjdGl2ZVtdO1xuICBkaXJlY3RvcnlFeGlzdHM/OiAoZGlyZWN0b3J5TmFtZTogc3RyaW5nKSA9PiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSByb290RmlsZXM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPiwgcHJpdmF0ZSBvcHRpb25zOiBDb21waWxlck9wdGlvbnMsXG4gICAgICBwcml2YXRlIGNvbnRleHQ6IENvbXBpbGVySG9zdCwgcHJpdmF0ZSBtZXRhZGF0YVByb3ZpZGVyOiBNZXRhZGF0YVByb3ZpZGVyLFxuICAgICAgcHJpdmF0ZSBjb2RlR2VuZXJhdG9yOiBDb2RlR2VuZXJhdG9yLFxuICAgICAgcHJpdmF0ZSBsaWJyYXJ5U3VtbWFyaWVzID0gbmV3IE1hcDxzdHJpbmcsIExpYnJhcnlTdW1tYXJ5PigpKSB7XG4gICAgdGhpcy5tb2R1bGVSZXNvbHV0aW9uQ2FjaGUgPSB0cy5jcmVhdGVNb2R1bGVSZXNvbHV0aW9uQ2FjaGUoXG4gICAgICAgIHRoaXMuY29udGV4dC5nZXRDdXJyZW50RGlyZWN0b3J5ICEoKSwgdGhpcy5jb250ZXh0LmdldENhbm9uaWNhbEZpbGVOYW1lLmJpbmQodGhpcy5jb250ZXh0KSk7XG4gICAgY29uc3QgYmFzZVBhdGggPSB0aGlzLm9wdGlvbnMuYmFzZVBhdGggITtcbiAgICB0aGlzLnJvb3REaXJzID1cbiAgICAgICAgKHRoaXMub3B0aW9ucy5yb290RGlycyB8fCBbdGhpcy5vcHRpb25zLmJhc2VQYXRoICFdKS5tYXAocCA9PiBwYXRoLnJlc29sdmUoYmFzZVBhdGgsIHApKTtcbiAgICBpZiAoY29udGV4dC5nZXREaXJlY3Rvcmllcykge1xuICAgICAgdGhpcy5nZXREaXJlY3RvcmllcyA9IHBhdGggPT4gY29udGV4dC5nZXREaXJlY3RvcmllcyAhKHBhdGgpO1xuICAgIH1cbiAgICBpZiAoY29udGV4dC5kaXJlY3RvcnlFeGlzdHMpIHtcbiAgICAgIHRoaXMuZGlyZWN0b3J5RXhpc3RzID0gZGlyZWN0b3J5TmFtZSA9PiBjb250ZXh0LmRpcmVjdG9yeUV4aXN0cyAhKGRpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgICBpZiAoY29udGV4dC5nZXRDYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgdGhpcy5nZXRDYW5jZWxsYXRpb25Ub2tlbiA9ICgpID0+IGNvbnRleHQuZ2V0Q2FuY2VsbGF0aW9uVG9rZW4gISgpO1xuICAgIH1cbiAgICBpZiAoY29udGV4dC5nZXREZWZhdWx0TGliTG9jYXRpb24pIHtcbiAgICAgIHRoaXMuZ2V0RGVmYXVsdExpYkxvY2F0aW9uID0gKCkgPT4gY29udGV4dC5nZXREZWZhdWx0TGliTG9jYXRpb24gISgpO1xuICAgIH1cbiAgICBpZiAoY29udGV4dC5yZXNvbHZlVHlwZVJlZmVyZW5jZURpcmVjdGl2ZXMpIHtcbiAgICAgIC8vIEJhY2t3YXJkIGNvbXBhdGliaWxpdHkgd2l0aCBUeXBlU2NyaXB0IDIuOSBhbmQgb2xkZXIgc2luY2UgcmV0dXJuXG4gICAgICAvLyB0eXBlIGhhcyBjaGFuZ2VkIGZyb20gKHRzLlJlc29sdmVkVHlwZVJlZmVyZW5jZURpcmVjdGl2ZSB8IHVuZGVmaW5lZClbXVxuICAgICAgLy8gdG8gdHMuUmVzb2x2ZWRUeXBlUmVmZXJlbmNlRGlyZWN0aXZlW10gaW4gVHlwZXNjcmlwdCAzLjBcbiAgICAgIHR5cGUgdHMzUmVzb2x2ZVR5cGVSZWZlcmVuY2VEaXJlY3RpdmVzID0gKG5hbWVzOiBzdHJpbmdbXSwgY29udGFpbmluZ0ZpbGU6IHN0cmluZykgPT5cbiAgICAgICAgICB0cy5SZXNvbHZlZFR5cGVSZWZlcmVuY2VEaXJlY3RpdmVbXTtcbiAgICAgIHRoaXMucmVzb2x2ZVR5cGVSZWZlcmVuY2VEaXJlY3RpdmVzID0gKG5hbWVzOiBzdHJpbmdbXSwgY29udGFpbmluZ0ZpbGU6IHN0cmluZykgPT5cbiAgICAgICAgICAoY29udGV4dC5yZXNvbHZlVHlwZVJlZmVyZW5jZURpcmVjdGl2ZXMgYXMgdHMzUmVzb2x2ZVR5cGVSZWZlcmVuY2VEaXJlY3RpdmVzKSAhKFxuICAgICAgICAgICAgICBuYW1lcywgY29udGFpbmluZ0ZpbGUpO1xuICAgIH1cbiAgICBpZiAoY29udGV4dC50cmFjZSkge1xuICAgICAgdGhpcy50cmFjZSA9IHMgPT4gY29udGV4dC50cmFjZSAhKHMpO1xuICAgIH1cbiAgICBpZiAoY29udGV4dC5maWxlTmFtZVRvTW9kdWxlTmFtZSkge1xuICAgICAgdGhpcy5maWxlTmFtZVRvTW9kdWxlTmFtZSA9IGNvbnRleHQuZmlsZU5hbWVUb01vZHVsZU5hbWUuYmluZChjb250ZXh0KTtcbiAgICB9XG4gICAgLy8gTm90ZTogZG9uJ3QgY29weSBvdmVyIGNvbnRleHQubW9kdWxlTmFtZVRvRmlsZU5hbWUgYXMgd2UgZmlyc3RcbiAgICAvLyBub3JtYWxpemUgdW5kZWZpbmVkIGNvbnRhaW5pbmdGaWxlIHRvIGEgZmlsbGVkIGNvbnRhaW5pbmdGaWxlLlxuICAgIGlmIChjb250ZXh0LnJlc291cmNlTmFtZVRvRmlsZU5hbWUpIHtcbiAgICAgIHRoaXMucmVzb3VyY2VOYW1lVG9GaWxlTmFtZSA9IGNvbnRleHQucmVzb3VyY2VOYW1lVG9GaWxlTmFtZS5iaW5kKGNvbnRleHQpO1xuICAgIH1cbiAgICBpZiAoY29udGV4dC50b1N1bW1hcnlGaWxlTmFtZSkge1xuICAgICAgdGhpcy50b1N1bW1hcnlGaWxlTmFtZSA9IGNvbnRleHQudG9TdW1tYXJ5RmlsZU5hbWUuYmluZChjb250ZXh0KTtcbiAgICB9XG4gICAgaWYgKGNvbnRleHQuZnJvbVN1bW1hcnlGaWxlTmFtZSkge1xuICAgICAgdGhpcy5mcm9tU3VtbWFyeUZpbGVOYW1lID0gY29udGV4dC5mcm9tU3VtbWFyeUZpbGVOYW1lLmJpbmQoY29udGV4dCk7XG4gICAgfVxuICAgIHRoaXMubWV0YWRhdGFSZWFkZXJIb3N0ID0ge1xuICAgICAgY2FjaGVNZXRhZGF0YTogKCkgPT4gdHJ1ZSxcbiAgICAgIGdldFNvdXJjZUZpbGVNZXRhZGF0YTogKGZpbGVQYXRoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNmID0gdGhpcy5nZXRPcmlnaW5hbFNvdXJjZUZpbGUoZmlsZVBhdGgpO1xuICAgICAgICByZXR1cm4gc2YgPyB0aGlzLm1ldGFkYXRhUHJvdmlkZXIuZ2V0TWV0YWRhdGEoc2YpIDogdW5kZWZpbmVkO1xuICAgICAgfSxcbiAgICAgIGZpbGVFeGlzdHM6IChmaWxlUGF0aCkgPT4gdGhpcy5vcmlnaW5hbEZpbGVFeGlzdHMoZmlsZVBhdGgpLFxuICAgICAgcmVhZEZpbGU6IChmaWxlUGF0aCkgPT4gYXNzZXJ0KHRoaXMuY29udGV4dC5yZWFkRmlsZShmaWxlUGF0aCkpLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHJlc29sdmVNb2R1bGVOYW1lKG1vZHVsZU5hbWU6IHN0cmluZywgY29udGFpbmluZ0ZpbGU6IHN0cmluZyk6IHRzLlJlc29sdmVkTW9kdWxlXG4gICAgICB8dW5kZWZpbmVkIHtcbiAgICBjb25zdCBybSA9IHRzLnJlc29sdmVNb2R1bGVOYW1lKFxuICAgICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZSwgY29udGFpbmluZ0ZpbGUucmVwbGFjZSgvXFxcXC9nLCAnLycpLCB0aGlzLm9wdGlvbnMsIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZVJlc29sdXRpb25DYWNoZSlcbiAgICAgICAgICAgICAgICAgICAucmVzb2x2ZWRNb2R1bGU7XG4gICAgaWYgKHJtICYmIHRoaXMuaXNTb3VyY2VGaWxlKHJtLnJlc29sdmVkRmlsZU5hbWUpICYmIERUUy50ZXN0KHJtLnJlc29sdmVkRmlsZU5hbWUpKSB7XG4gICAgICAvLyBDYXNlOiBnZW5lcmF0ZUNvZGVGb3JMaWJyYXJpZXMgPSB0cnVlIGFuZCBtb2R1bGVOYW1lIGlzXG4gICAgICAvLyBhIC5kLnRzIGZpbGUgaW4gYSBub2RlX21vZHVsZXMgZm9sZGVyLlxuICAgICAgLy8gTmVlZCB0byBzZXQgaXNFeHRlcm5hbExpYnJhcnlJbXBvcnQgdG8gZmFsc2Ugc28gdGhhdCBnZW5lcmF0ZWQgZmlsZXMgZm9yIHRoYXQgZmlsZVxuICAgICAgLy8gYXJlIGVtaXR0ZWQuXG4gICAgICBybS5pc0V4dGVybmFsTGlicmFyeUltcG9ydCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gcm07XG4gIH1cblxuICAvLyBOb3RlOiBXZSBpbXBsZW1lbnQgdGhpcyBtZXRob2Qgc28gdGhhdCBUeXBlU2NyaXB0IGFuZCBBbmd1bGFyIHNoYXJlIHRoZSBzYW1lXG4gIC8vIHRzLk1vZHVsZVJlc29sdXRpb25DYWNoZVxuICAvLyBhbmQgdGhhdCB3ZSBjYW4gdGVsbCB0cy5Qcm9ncmFtIGFib3V0IG91ciBkaWZmZXJlbnQgb3BpbmlvbiBhYm91dFxuICAvLyBSZXNvbHZlZE1vZHVsZS5pc0V4dGVybmFsTGlicmFyeUltcG9ydFxuICAvLyAoc2VlIG91ciBpc1NvdXJjZUZpbGUgbWV0aG9kKS5cbiAgcmVzb2x2ZU1vZHVsZU5hbWVzKG1vZHVsZU5hbWVzOiBzdHJpbmdbXSwgY29udGFpbmluZ0ZpbGU6IHN0cmluZyk6IHRzLlJlc29sdmVkTW9kdWxlW10ge1xuICAgIC8vIFRPRE8odGJvc2NoKTogdGhpcyBzZWVtcyB0byBiZSBhIHR5cGluZyBlcnJvciBpbiBUeXBlU2NyaXB0LFxuICAgIC8vIGFzIGl0IGNvbnRhaW5zIGFzc2VydGlvbnMgdGhhdCB0aGUgcmVzdWx0IGNvbnRhaW5zIHRoZSBzYW1lIG51bWJlciBvZiBlbnRyaWVzXG4gICAgLy8gYXMgdGhlIGdpdmVuIG1vZHVsZSBuYW1lcy5cbiAgICByZXR1cm4gPHRzLlJlc29sdmVkTW9kdWxlW10+bW9kdWxlTmFtZXMubWFwKFxuICAgICAgICBtb2R1bGVOYW1lID0+IHRoaXMucmVzb2x2ZU1vZHVsZU5hbWUobW9kdWxlTmFtZSwgY29udGFpbmluZ0ZpbGUpKTtcbiAgfVxuXG4gIG1vZHVsZU5hbWVUb0ZpbGVOYW1lKG06IHN0cmluZywgY29udGFpbmluZ0ZpbGU/OiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7XG4gICAgaWYgKCFjb250YWluaW5nRmlsZSkge1xuICAgICAgaWYgKG0uaW5kZXhPZignLicpID09PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUmVzb2x1dGlvbiBvZiByZWxhdGl2ZSBwYXRocyByZXF1aXJlcyBhIGNvbnRhaW5pbmcgZmlsZS4nKTtcbiAgICAgIH1cbiAgICAgIC8vIEFueSBjb250YWluaW5nIGZpbGUgZ2l2ZXMgdGhlIHNhbWUgcmVzdWx0IGZvciBhYnNvbHV0ZSBpbXBvcnRzXG4gICAgICBjb250YWluaW5nRmlsZSA9IHRoaXMucm9vdEZpbGVzWzBdO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb250ZXh0Lm1vZHVsZU5hbWVUb0ZpbGVOYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb250ZXh0Lm1vZHVsZU5hbWVUb0ZpbGVOYW1lKG0sIGNvbnRhaW5pbmdGaWxlKTtcbiAgICB9XG4gICAgY29uc3QgcmVzb2x2ZWQgPSB0aGlzLnJlc29sdmVNb2R1bGVOYW1lKG0sIGNvbnRhaW5pbmdGaWxlKTtcbiAgICByZXR1cm4gcmVzb2x2ZWQgPyByZXNvbHZlZC5yZXNvbHZlZEZpbGVOYW1lIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBXZSB3YW50IGEgbW9kdWxlSWQgdGhhdCB3aWxsIGFwcGVhciBpbiBpbXBvcnQgc3RhdGVtZW50cyBpbiB0aGUgZ2VuZXJhdGVkIGNvZGVcbiAgICogd2hpY2ggd2lsbCBiZSB3cml0dGVuIHRvIGBjb250YWluaW5nRmlsZWAuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB3ZSBhbHNvIGdlbmVyYXRlIGZpbGVzIGZvciBmaWxlcyBpbiBub2RlX21vZHVsZXMsIGFzIGxpYnJhcmllc1xuICAgKiBvbmx5IHNoaXAgLm1ldGFkYXRhLmpzb24gZmlsZXMgYnV0IG5vdCB0aGUgZ2VuZXJhdGVkIGNvZGUuXG4gICAqXG4gICAqIExvZ2ljOlxuICAgKiAxLiBpZiB0aGUgaW1wb3J0ZWRGaWxlIGFuZCB0aGUgY29udGFpbmluZ0ZpbGUgYXJlIGZyb20gdGhlIHByb2plY3Qgc291cmNlc1xuICAgKiAgICBvciBmcm9tIHRoZSBzYW1lIG5vZGVfbW9kdWxlcyBwYWNrYWdlLCB1c2UgYSByZWxhdGl2ZSBwYXRoXG4gICAqIDIuIGlmIHRoZSBpbXBvcnRlZEZpbGUgaXMgaW4gYSBub2RlX21vZHVsZXMgcGFja2FnZSxcbiAgICogICAgdXNlIGEgcGF0aCB0aGF0IHN0YXJ0cyB3aXRoIHRoZSBwYWNrYWdlIG5hbWUuXG4gICAqIDMuIEVycm9yIGlmIHRoZSBjb250YWluaW5nRmlsZSBpcyBpbiB0aGUgbm9kZV9tb2R1bGVzIHBhY2thZ2VcbiAgICogICAgYW5kIHRoZSBpbXBvcnRlZEZpbGUgaXMgaW4gdGhlIHByb2plY3Qgc291cmVzLFxuICAgKiAgICBhcyB0aGF0IGlzIGEgdmlvbGF0aW9uIG9mIHRoZSBwcmluY2lwbGUgdGhhdCBub2RlX21vZHVsZXMgcGFja2FnZXMgY2Fubm90XG4gICAqICAgIGltcG9ydCBwcm9qZWN0IHNvdXJjZXMuXG4gICAqL1xuICBmaWxlTmFtZVRvTW9kdWxlTmFtZShpbXBvcnRlZEZpbGU6IHN0cmluZywgY29udGFpbmluZ0ZpbGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgY2FjaGVLZXkgPSBgJHtpbXBvcnRlZEZpbGV9OiR7Y29udGFpbmluZ0ZpbGV9YDtcbiAgICBsZXQgbW9kdWxlTmFtZSA9IHRoaXMuZmlsZU5hbWVUb01vZHVsZU5hbWVDYWNoZS5nZXQoY2FjaGVLZXkpO1xuICAgIGlmIChtb2R1bGVOYW1lICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBtb2R1bGVOYW1lO1xuICAgIH1cblxuICAgIGNvbnN0IG9yaWdpbmFsSW1wb3J0ZWRGaWxlID0gaW1wb3J0ZWRGaWxlO1xuICAgIGlmICh0aGlzLm9wdGlvbnMudHJhY2VSZXNvbHV0aW9uKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICdmaWxlTmFtZVRvTW9kdWxlTmFtZSBmcm9tIGNvbnRhaW5pbmdGaWxlJywgY29udGFpbmluZ0ZpbGUsICd0byBpbXBvcnRlZEZpbGUnLFxuICAgICAgICAgIGltcG9ydGVkRmlsZSk7XG4gICAgfVxuXG4gICAgLy8gZHJvcCBleHRlbnNpb25cbiAgICBpbXBvcnRlZEZpbGUgPSBpbXBvcnRlZEZpbGUucmVwbGFjZShFWFQsICcnKTtcbiAgICBjb25zdCBpbXBvcnRlZEZpbGVQYWNrYWdlTmFtZSA9IGdldFBhY2thZ2VOYW1lKGltcG9ydGVkRmlsZSk7XG4gICAgY29uc3QgY29udGFpbmluZ0ZpbGVQYWNrYWdlTmFtZSA9IGdldFBhY2thZ2VOYW1lKGNvbnRhaW5pbmdGaWxlKTtcblxuICAgIGlmIChpbXBvcnRlZEZpbGVQYWNrYWdlTmFtZSA9PT0gY29udGFpbmluZ0ZpbGVQYWNrYWdlTmFtZSB8fFxuICAgICAgICBHRU5FUkFURURfRklMRVMudGVzdChvcmlnaW5hbEltcG9ydGVkRmlsZSkpIHtcbiAgICAgIGNvbnN0IHJvb3RlZENvbnRhaW5pbmdGaWxlID0gcmVsYXRpdmVUb1Jvb3REaXJzKGNvbnRhaW5pbmdGaWxlLCB0aGlzLnJvb3REaXJzKTtcbiAgICAgIGNvbnN0IHJvb3RlZEltcG9ydGVkRmlsZSA9IHJlbGF0aXZlVG9Sb290RGlycyhpbXBvcnRlZEZpbGUsIHRoaXMucm9vdERpcnMpO1xuXG4gICAgICBpZiAocm9vdGVkQ29udGFpbmluZ0ZpbGUgIT09IGNvbnRhaW5pbmdGaWxlICYmIHJvb3RlZEltcG9ydGVkRmlsZSAhPT0gaW1wb3J0ZWRGaWxlKSB7XG4gICAgICAgIC8vIGlmIGJvdGggZmlsZXMgYXJlIGNvbnRhaW5lZCBpbiB0aGUgYHJvb3REaXJzYCwgdGhlbiBzdHJpcCB0aGUgcm9vdERpcnNcbiAgICAgICAgY29udGFpbmluZ0ZpbGUgPSByb290ZWRDb250YWluaW5nRmlsZTtcbiAgICAgICAgaW1wb3J0ZWRGaWxlID0gcm9vdGVkSW1wb3J0ZWRGaWxlO1xuICAgICAgfVxuICAgICAgbW9kdWxlTmFtZSA9IGRvdFJlbGF0aXZlKHBhdGguZGlybmFtZShjb250YWluaW5nRmlsZSksIGltcG9ydGVkRmlsZSk7XG4gICAgfSBlbHNlIGlmIChpbXBvcnRlZEZpbGVQYWNrYWdlTmFtZSkge1xuICAgICAgbW9kdWxlTmFtZSA9IHN0cmlwTm9kZU1vZHVsZXNQcmVmaXgoaW1wb3J0ZWRGaWxlKTtcbiAgICAgIGlmIChvcmlnaW5hbEltcG9ydGVkRmlsZS5lbmRzV2l0aCgnLmQudHMnKSkge1xuICAgICAgICAvLyB0aGUgbW9kdWxlTmFtZSBmb3IgdGhlc2UgdHlwaW5ncyBjb3VsZCBiZSBzaG9ydGVudGVkIHRvIHRoZSBucG0gcGFja2FnZSBuYW1lXG4gICAgICAgIC8vIGlmIHRoZSBucG0gcGFja2FnZSB0eXBpbmdzIG1hdGNoZXMgdGhlIGltcG9ydGVkRmlsZVxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IG1vZHVsZVBhdGggPSBpbXBvcnRlZEZpbGUuc3Vic3RyaW5nKDAsIGltcG9ydGVkRmlsZS5sZW5ndGggLSBtb2R1bGVOYW1lLmxlbmd0aCkgK1xuICAgICAgICAgICAgICBpbXBvcnRlZEZpbGVQYWNrYWdlTmFtZTtcbiAgICAgICAgICBjb25zdCBwYWNrYWdlSnNvbiA9IHJlcXVpcmUobW9kdWxlUGF0aCArICcvcGFja2FnZS5qc29uJyk7XG4gICAgICAgICAgY29uc3QgcGFja2FnZVR5cGluZ3MgPSBwYXRoLnBvc2l4LmpvaW4obW9kdWxlUGF0aCwgcGFja2FnZUpzb24udHlwaW5ncyk7XG4gICAgICAgICAgaWYgKHBhY2thZ2VUeXBpbmdzID09PSBvcmlnaW5hbEltcG9ydGVkRmlsZSkge1xuICAgICAgICAgICAgbW9kdWxlTmFtZSA9IGltcG9ydGVkRmlsZVBhY2thZ2VOYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgLy8gdGhlIGFib3ZlIHJlcXVpcmUoKSB3aWxsIHRocm93IGlmIHRoZXJlIGlzIG5vIHBhY2thZ2UuanNvbiBmaWxlXG4gICAgICAgICAgLy8gYW5kIHRoaXMgaXMgc2FmZSB0byBpZ25vcmUgYW5kIGNvcnJlY3QgdG8ga2VlcCB0aGUgbG9uZ2VyXG4gICAgICAgICAgLy8gbW9kdWxlTmFtZSBpbiB0aGlzIGNhc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYFRyeWluZyB0byBpbXBvcnQgYSBzb3VyY2UgZmlsZSBmcm9tIGEgbm9kZV9tb2R1bGVzIHBhY2thZ2U6IGltcG9ydCAke29yaWdpbmFsSW1wb3J0ZWRGaWxlfSBmcm9tICR7Y29udGFpbmluZ0ZpbGV9YCk7XG4gICAgfVxuXG4gICAgdGhpcy5maWxlTmFtZVRvTW9kdWxlTmFtZUNhY2hlLnNldChjYWNoZUtleSwgbW9kdWxlTmFtZSk7XG4gICAgcmV0dXJuIG1vZHVsZU5hbWU7XG4gIH1cblxuICByZXNvdXJjZU5hbWVUb0ZpbGVOYW1lKHJlc291cmNlTmFtZTogc3RyaW5nLCBjb250YWluaW5nRmlsZTogc3RyaW5nKTogc3RyaW5nfG51bGwge1xuICAgIC8vIE5vdGU6IHdlIGNvbnZlcnQgcGFja2FnZSBwYXRocyBpbnRvIHJlbGF0aXZlIHBhdGhzIHRvIGJlIGNvbXBhdGlibGUgd2l0aCB0aGUgdGhlXG4gICAgLy8gcHJldmlvdXMgaW1wbGVtZW50YXRpb24gb2YgVXJsUmVzb2x2ZXIuXG4gICAgY29uc3QgZmlyc3RDaGFyID0gcmVzb3VyY2VOYW1lWzBdO1xuICAgIGlmIChmaXJzdENoYXIgPT09ICcvJykge1xuICAgICAgcmVzb3VyY2VOYW1lID0gcmVzb3VyY2VOYW1lLnNsaWNlKDEpO1xuICAgIH0gZWxzZSBpZiAoZmlyc3RDaGFyICE9PSAnLicpIHtcbiAgICAgIHJlc291cmNlTmFtZSA9IGAuLyR7cmVzb3VyY2VOYW1lfWA7XG4gICAgfVxuICAgIGxldCBmaWxlUGF0aFdpdGhOZ1Jlc291cmNlID1cbiAgICAgICAgdGhpcy5tb2R1bGVOYW1lVG9GaWxlTmFtZShhZGROZ1Jlc291cmNlU3VmZml4KHJlc291cmNlTmFtZSksIGNvbnRhaW5pbmdGaWxlKTtcbiAgICAvLyBJZiB0aGUgdXNlciBzcGVjaWZpZWQgc3R5bGVVcmwgcG9pbnRpbmcgdG8gKi5zY3NzLCBidXQgdGhlIFNhc3MgY29tcGlsZXIgd2FzIHJ1biBiZWZvcmVcbiAgICAvLyBBbmd1bGFyLCB0aGVuIHRoZSByZXNvdXJjZSBtYXkgaGF2ZSBiZWVuIGdlbmVyYXRlZCBhcyAqLmNzcy4gU2ltcGx5IHRyeSB0aGUgcmVzb2x1dGlvbiBhZ2Fpbi5cbiAgICBpZiAoIWZpbGVQYXRoV2l0aE5nUmVzb3VyY2UgJiYgQ1NTX1BSRVBST0NFU1NPUl9FWFQudGVzdChyZXNvdXJjZU5hbWUpKSB7XG4gICAgICBjb25zdCBmYWxsYmFja1Jlc291cmNlTmFtZSA9IHJlc291cmNlTmFtZS5yZXBsYWNlKENTU19QUkVQUk9DRVNTT1JfRVhULCAnLmNzcycpO1xuICAgICAgZmlsZVBhdGhXaXRoTmdSZXNvdXJjZSA9XG4gICAgICAgICAgdGhpcy5tb2R1bGVOYW1lVG9GaWxlTmFtZShhZGROZ1Jlc291cmNlU3VmZml4KGZhbGxiYWNrUmVzb3VyY2VOYW1lKSwgY29udGFpbmluZ0ZpbGUpO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBmaWxlUGF0aFdpdGhOZ1Jlc291cmNlID8gc3RyaXBOZ1Jlc291cmNlU3VmZml4KGZpbGVQYXRoV2l0aE5nUmVzb3VyY2UpIDogbnVsbDtcbiAgICAvLyBVc2VkIHVuZGVyIEJhemVsIHRvIHJlcG9ydCBtb3JlIHNwZWNpZmljIGVycm9yIHdpdGggcmVtZWRpYXRpb24gYWR2aWNlXG4gICAgaWYgKCFyZXN1bHQgJiYgKHRoaXMuY29udGV4dCBhcyBhbnkpLnJlcG9ydE1pc3NpbmdSZXNvdXJjZSkge1xuICAgICAgKHRoaXMuY29udGV4dCBhcyBhbnkpLnJlcG9ydE1pc3NpbmdSZXNvdXJjZShyZXNvdXJjZU5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdG9TdW1tYXJ5RmlsZU5hbWUoZmlsZU5hbWU6IHN0cmluZywgcmVmZXJyaW5nU3JjRmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZmlsZU5hbWVUb01vZHVsZU5hbWUoZmlsZU5hbWUsIHJlZmVycmluZ1NyY0ZpbGVOYW1lKTtcbiAgfVxuXG4gIGZyb21TdW1tYXJ5RmlsZU5hbWUoZmlsZU5hbWU6IHN0cmluZywgcmVmZXJyaW5nTGliRmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgcmVzb2x2ZWQgPSB0aGlzLm1vZHVsZU5hbWVUb0ZpbGVOYW1lKGZpbGVOYW1lLCByZWZlcnJpbmdMaWJGaWxlTmFtZSk7XG4gICAgaWYgKCFyZXNvbHZlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgcmVzb2x2ZSAke2ZpbGVOYW1lfSBmcm9tICR7cmVmZXJyaW5nTGliRmlsZU5hbWV9YCk7XG4gICAgfVxuICAgIHJldHVybiByZXNvbHZlZDtcbiAgfVxuXG4gIHBhcnNlU291cmNlU3Bhbk9mKGZpbGVOYW1lOiBzdHJpbmcsIGxpbmU6IG51bWJlciwgY2hhcmFjdGVyOiBudW1iZXIpOiBQYXJzZVNvdXJjZVNwYW58bnVsbCB7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZ2VuZXJhdGVkU291cmNlRmlsZXMuZ2V0KGZpbGVOYW1lKTtcbiAgICBpZiAoZGF0YSAmJiBkYXRhLmVtaXRDdHgpIHtcbiAgICAgIHJldHVybiBkYXRhLmVtaXRDdHguc3Bhbk9mKGxpbmUsIGNoYXJhY3Rlcik7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPcmlnaW5hbFNvdXJjZUZpbGUoXG4gICAgICBmaWxlUGF0aDogc3RyaW5nLCBsYW5ndWFnZVZlcnNpb24/OiB0cy5TY3JpcHRUYXJnZXQsXG4gICAgICBvbkVycm9yPzogKChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQpfHVuZGVmaW5lZCk6IHRzLlNvdXJjZUZpbGV8bnVsbCB7XG4gICAgLy8gTm90ZTogd2UgbmVlZCB0aGUgZXhwbGljaXQgY2hlY2sgdmlhIGBoYXNgIGFzIHdlIGFsc28gY2FjaGUgcmVzdWx0c1xuICAgIC8vIHRoYXQgd2VyZSBudWxsIC8gdW5kZWZpbmVkLlxuICAgIGlmICh0aGlzLm9yaWdpbmFsU291cmNlRmlsZXMuaGFzKGZpbGVQYXRoKSkge1xuICAgICAgcmV0dXJuIHRoaXMub3JpZ2luYWxTb3VyY2VGaWxlcy5nZXQoZmlsZVBhdGgpICE7XG4gICAgfVxuICAgIGlmICghbGFuZ3VhZ2VWZXJzaW9uKSB7XG4gICAgICBsYW5ndWFnZVZlcnNpb24gPSB0aGlzLm9wdGlvbnMudGFyZ2V0IHx8IHRzLlNjcmlwdFRhcmdldC5MYXRlc3Q7XG4gICAgfVxuICAgIC8vIE5vdGU6IFRoaXMgY2FuIGFsc28gcmV0dXJuIHVuZGVmaW5lZCxcbiAgICAvLyBhcyB0aGUgVFMgdHlwaW5ncyBhcmUgbm90IGNvcnJlY3QhXG4gICAgY29uc3Qgc2YgPSB0aGlzLmNvbnRleHQuZ2V0U291cmNlRmlsZShmaWxlUGF0aCwgbGFuZ3VhZ2VWZXJzaW9uLCBvbkVycm9yKSB8fCBudWxsO1xuICAgIHRoaXMub3JpZ2luYWxTb3VyY2VGaWxlcy5zZXQoZmlsZVBhdGgsIHNmKTtcbiAgICByZXR1cm4gc2Y7XG4gIH1cblxuICB1cGRhdGVHZW5lcmF0ZWRGaWxlKGdlbkZpbGU6IEdlbmVyYXRlZEZpbGUpOiB0cy5Tb3VyY2VGaWxlIHtcbiAgICBpZiAoIWdlbkZpbGUuc3RtdHMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgSW52YWxpZCBBcmd1bWVudDogRXhwZWN0ZWQgYSBHZW5lcmF0ZUZpbGUgd2l0aCBzdGF0ZW1lbnRzLiAke2dlbkZpbGUuZ2VuRmlsZVVybH1gKTtcbiAgICB9XG4gICAgY29uc3Qgb2xkR2VuRmlsZSA9IHRoaXMuZ2VuZXJhdGVkU291cmNlRmlsZXMuZ2V0KGdlbkZpbGUuZ2VuRmlsZVVybCk7XG4gICAgaWYgKCFvbGRHZW5GaWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYElsbGVnYWwgU3RhdGU6IHByZXZpb3VzIEdlbmVyYXRlZEZpbGUgbm90IGZvdW5kIGZvciAke2dlbkZpbGUuZ2VuRmlsZVVybH0uYCk7XG4gICAgfVxuICAgIGNvbnN0IG5ld1JlZnMgPSBnZW5GaWxlRXh0ZXJuYWxSZWZlcmVuY2VzKGdlbkZpbGUpO1xuICAgIGNvbnN0IG9sZFJlZnMgPSBvbGRHZW5GaWxlLmV4dGVybmFsUmVmZXJlbmNlcztcbiAgICBsZXQgcmVmc0FyZUVxdWFsID0gb2xkUmVmcy5zaXplID09PSBuZXdSZWZzLnNpemU7XG4gICAgaWYgKHJlZnNBcmVFcXVhbCkge1xuICAgICAgbmV3UmVmcy5mb3JFYWNoKHIgPT4gcmVmc0FyZUVxdWFsID0gcmVmc0FyZUVxdWFsICYmIG9sZFJlZnMuaGFzKHIpKTtcbiAgICB9XG4gICAgaWYgKCFyZWZzQXJlRXF1YWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgSWxsZWdhbCBTdGF0ZTogZXh0ZXJuYWwgcmVmZXJlbmNlcyBjaGFuZ2VkIGluICR7Z2VuRmlsZS5nZW5GaWxlVXJsfS5cXG5PbGQ6ICR7QXJyYXkuZnJvbShvbGRSZWZzKX0uXFxuTmV3OiAke0FycmF5LmZyb20obmV3UmVmcyl9YCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFkZEdlbmVyYXRlZEZpbGUoZ2VuRmlsZSwgbmV3UmVmcyk7XG4gIH1cblxuICBwcml2YXRlIGFkZEdlbmVyYXRlZEZpbGUoZ2VuRmlsZTogR2VuZXJhdGVkRmlsZSwgZXh0ZXJuYWxSZWZlcmVuY2VzOiBTZXQ8c3RyaW5nPik6IHRzLlNvdXJjZUZpbGUge1xuICAgIGlmICghZ2VuRmlsZS5zdG10cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBJbnZhbGlkIEFyZ3VtZW50OiBFeHBlY3RlZCBhIEdlbmVyYXRlRmlsZSB3aXRoIHN0YXRlbWVudHMuICR7Z2VuRmlsZS5nZW5GaWxlVXJsfWApO1xuICAgIH1cbiAgICBjb25zdCB7c291cmNlVGV4dCwgY29udGV4dH0gPSB0aGlzLmVtaXR0ZXIuZW1pdFN0YXRlbWVudHNBbmRDb250ZXh0KFxuICAgICAgICBnZW5GaWxlLmdlbkZpbGVVcmwsIGdlbkZpbGUuc3RtdHMsIC8qIHByZWFtYmxlICovICcnLFxuICAgICAgICAvKiBlbWl0U291cmNlTWFwcyAqLyBmYWxzZSk7XG4gICAgY29uc3Qgc2YgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKFxuICAgICAgICBnZW5GaWxlLmdlbkZpbGVVcmwsIHNvdXJjZVRleHQsIHRoaXMub3B0aW9ucy50YXJnZXQgfHwgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdCk7XG4gICAgaWYgKCh0aGlzLm9wdGlvbnMubW9kdWxlID09PSB0cy5Nb2R1bGVLaW5kLkFNRCB8fCB0aGlzLm9wdGlvbnMubW9kdWxlID09PSB0cy5Nb2R1bGVLaW5kLlVNRCkgJiZcbiAgICAgICAgdGhpcy5jb250ZXh0LmFtZE1vZHVsZU5hbWUpIHtcbiAgICAgIGNvbnN0IG1vZHVsZU5hbWUgPSB0aGlzLmNvbnRleHQuYW1kTW9kdWxlTmFtZShzZik7XG4gICAgICBpZiAobW9kdWxlTmFtZSkgc2YubW9kdWxlTmFtZSA9IG1vZHVsZU5hbWU7XG4gICAgfVxuICAgIHRoaXMuZ2VuZXJhdGVkU291cmNlRmlsZXMuc2V0KGdlbkZpbGUuZ2VuRmlsZVVybCwge1xuICAgICAgc291cmNlRmlsZTogc2YsXG4gICAgICBlbWl0Q3R4OiBjb250ZXh0LCBleHRlcm5hbFJlZmVyZW5jZXMsXG4gICAgfSk7XG4gICAgcmV0dXJuIHNmO1xuICB9XG5cbiAgc2hvdWxkR2VuZXJhdGVGaWxlKGZpbGVOYW1lOiBzdHJpbmcpOiB7Z2VuZXJhdGU6IGJvb2xlYW4sIGJhc2VGaWxlTmFtZT86IHN0cmluZ30ge1xuICAgIC8vIFRPRE8odGJvc2NoKTogYWxsb3cgZ2VuZXJhdGluZyBmaWxlcyB0aGF0IGFyZSBub3QgaW4gdGhlIHJvb3REaXJcbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTkzMzdcbiAgICBpZiAoIWlzSW5Sb290RGlyKGZpbGVOYW1lLCB0aGlzLm9wdGlvbnMpKSB7XG4gICAgICByZXR1cm4ge2dlbmVyYXRlOiBmYWxzZX07XG4gICAgfVxuICAgIGNvbnN0IGdlbk1hdGNoID0gR0VORVJBVEVEX0ZJTEVTLmV4ZWMoZmlsZU5hbWUpO1xuICAgIGlmICghZ2VuTWF0Y2gpIHtcbiAgICAgIHJldHVybiB7Z2VuZXJhdGU6IGZhbHNlfTtcbiAgICB9XG4gICAgY29uc3QgWywgYmFzZSwgZ2VuU3VmZml4LCBzdWZmaXhdID0gZ2VuTWF0Y2g7XG4gICAgaWYgKHN1ZmZpeCAhPT0gJ3RzJyAmJiBzdWZmaXggIT09ICd0c3gnKSB7XG4gICAgICByZXR1cm4ge2dlbmVyYXRlOiBmYWxzZX07XG4gICAgfVxuICAgIGxldCBiYXNlRmlsZU5hbWU6IHN0cmluZ3x1bmRlZmluZWQ7XG4gICAgaWYgKGdlblN1ZmZpeC5pbmRleE9mKCduZ3N0eWxlJykgPj0gMCkge1xuICAgICAgLy8gTm90ZTogbmdzdHlsZSBmaWxlcyBoYXZlIG5hbWVzIGxpa2UgYGFmaWxlLmNzcy5uZ3N0eWxlLnRzYFxuICAgICAgaWYgKCF0aGlzLm9yaWdpbmFsRmlsZUV4aXN0cyhiYXNlKSkge1xuICAgICAgICByZXR1cm4ge2dlbmVyYXRlOiBmYWxzZX07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5vdGU6IG9uLXRoZS1mbHkgZ2VuZXJhdGVkIGZpbGVzIGFsd2F5cyBoYXZlIGEgYC50c2Agc3VmZml4LFxuICAgICAgLy8gYnV0IHRoZSBmaWxlIGZyb20gd2hpY2ggd2UgZ2VuZXJhdGVkIGl0IGNhbiBiZSBhIGAudHNgLyBgLnRzeGAvIGAuZC50c2BcbiAgICAgIC8vIChzZWUgb3B0aW9ucy5nZW5lcmF0ZUNvZGVGb3JMaWJyYXJpZXMpLlxuICAgICAgYmFzZUZpbGVOYW1lID0gW2Ake2Jhc2V9LnRzYCwgYCR7YmFzZX0udHN4YCwgYCR7YmFzZX0uZC50c2BdLmZpbmQoXG4gICAgICAgICAgYmFzZUZpbGVOYW1lID0+IHRoaXMuaXNTb3VyY2VGaWxlKGJhc2VGaWxlTmFtZSkgJiYgdGhpcy5vcmlnaW5hbEZpbGVFeGlzdHMoYmFzZUZpbGVOYW1lKSk7XG4gICAgICBpZiAoIWJhc2VGaWxlTmFtZSkge1xuICAgICAgICByZXR1cm4ge2dlbmVyYXRlOiBmYWxzZX07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7Z2VuZXJhdGU6IHRydWUsIGJhc2VGaWxlTmFtZX07XG4gIH1cblxuICBzaG91bGRHZW5lcmF0ZUZpbGVzRm9yKGZpbGVOYW1lOiBzdHJpbmcpIHtcbiAgICAvLyBUT0RPKHRib3NjaCk6IGFsbG93IGdlbmVyYXRpbmcgZmlsZXMgdGhhdCBhcmUgbm90IGluIHRoZSByb290RGlyXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE5MzM3XG4gICAgcmV0dXJuICFHRU5FUkFURURfRklMRVMudGVzdChmaWxlTmFtZSkgJiYgdGhpcy5pc1NvdXJjZUZpbGUoZmlsZU5hbWUpICYmXG4gICAgICAgIGlzSW5Sb290RGlyKGZpbGVOYW1lLCB0aGlzLm9wdGlvbnMpO1xuICB9XG5cbiAgZ2V0U291cmNlRmlsZShcbiAgICAgIGZpbGVOYW1lOiBzdHJpbmcsIGxhbmd1YWdlVmVyc2lvbjogdHMuU2NyaXB0VGFyZ2V0LFxuICAgICAgb25FcnJvcj86ICgobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkKXx1bmRlZmluZWQpOiB0cy5Tb3VyY2VGaWxlIHtcbiAgICAvLyBOb3RlOiBEb24ndCBleGl0IGVhcmx5IGluIHRoaXMgbWV0aG9kIHRvIG1ha2Ugc3VyZVxuICAgIC8vIHdlIGFsd2F5cyBoYXZlIHVwIHRvIGRhdGUgcmVmZXJlbmNlcyBvbiB0aGUgZmlsZSFcbiAgICBsZXQgZ2VuRmlsZU5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGxldCBzZiA9IHRoaXMuZ2V0R2VuZXJhdGVkRmlsZShmaWxlTmFtZSk7XG4gICAgaWYgKCFzZikge1xuICAgICAgY29uc3Qgc3VtbWFyeSA9IHRoaXMubGlicmFyeVN1bW1hcmllcy5nZXQoZmlsZU5hbWUpO1xuICAgICAgaWYgKHN1bW1hcnkpIHtcbiAgICAgICAgaWYgKCFzdW1tYXJ5LnNvdXJjZUZpbGUpIHtcbiAgICAgICAgICBzdW1tYXJ5LnNvdXJjZUZpbGUgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKFxuICAgICAgICAgICAgICBmaWxlTmFtZSwgc3VtbWFyeS50ZXh0LCB0aGlzLm9wdGlvbnMudGFyZ2V0IHx8IHRzLlNjcmlwdFRhcmdldC5MYXRlc3QpO1xuICAgICAgICB9XG4gICAgICAgIHNmID0gc3VtbWFyeS5zb3VyY2VGaWxlO1xuICAgICAgICBnZW5GaWxlTmFtZXMgPSBbXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFzZikge1xuICAgICAgc2YgPSB0aGlzLmdldE9yaWdpbmFsU291cmNlRmlsZShmaWxlTmFtZSk7XG4gICAgICBjb25zdCBjYWNoZWRHZW5GaWxlcyA9IHRoaXMuZ2VuZXJhdGVkQ29kZUZvci5nZXQoZmlsZU5hbWUpO1xuICAgICAgaWYgKGNhY2hlZEdlbkZpbGVzKSB7XG4gICAgICAgIGdlbkZpbGVOYW1lcyA9IGNhY2hlZEdlbkZpbGVzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMubm9SZXNvbHZlICYmIHRoaXMuc2hvdWxkR2VuZXJhdGVGaWxlc0ZvcihmaWxlTmFtZSkpIHtcbiAgICAgICAgICBnZW5GaWxlTmFtZXMgPSB0aGlzLmNvZGVHZW5lcmF0b3IuZmluZEdlbmVyYXRlZEZpbGVOYW1lcyhmaWxlTmFtZSkuZmlsdGVyKFxuICAgICAgICAgICAgICBmaWxlTmFtZSA9PiB0aGlzLnNob3VsZEdlbmVyYXRlRmlsZShmaWxlTmFtZSkuZ2VuZXJhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVkQ29kZUZvci5zZXQoZmlsZU5hbWUsIGdlbkZpbGVOYW1lcyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzZikge1xuICAgICAgYWRkUmVmZXJlbmNlc1RvU291cmNlRmlsZShzZiwgZ2VuRmlsZU5hbWVzKTtcbiAgICB9XG4gICAgLy8gVE9ETyh0Ym9zY2gpOiBUeXBlU2NyaXB0J3MgdHlwaW5ncyBmb3IgZ2V0U291cmNlRmlsZSBhcmUgaW5jb3JyZWN0LFxuICAgIC8vIGFzIGl0IGNhbiB2ZXJ5IHdlbGwgcmV0dXJuIHVuZGVmaW5lZC5cbiAgICByZXR1cm4gc2YgITtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0R2VuZXJhdGVkRmlsZShmaWxlTmFtZTogc3RyaW5nKTogdHMuU291cmNlRmlsZXxudWxsIHtcbiAgICBjb25zdCBnZW5TcmNGaWxlID0gdGhpcy5nZW5lcmF0ZWRTb3VyY2VGaWxlcy5nZXQoZmlsZU5hbWUpO1xuICAgIGlmIChnZW5TcmNGaWxlKSB7XG4gICAgICByZXR1cm4gZ2VuU3JjRmlsZS5zb3VyY2VGaWxlO1xuICAgIH1cbiAgICBjb25zdCB7Z2VuZXJhdGUsIGJhc2VGaWxlTmFtZX0gPSB0aGlzLnNob3VsZEdlbmVyYXRlRmlsZShmaWxlTmFtZSk7XG4gICAgaWYgKGdlbmVyYXRlKSB7XG4gICAgICBjb25zdCBnZW5GaWxlID0gdGhpcy5jb2RlR2VuZXJhdG9yLmdlbmVyYXRlRmlsZShmaWxlTmFtZSwgYmFzZUZpbGVOYW1lKTtcbiAgICAgIHJldHVybiB0aGlzLmFkZEdlbmVyYXRlZEZpbGUoZ2VuRmlsZSwgZ2VuRmlsZUV4dGVybmFsUmVmZXJlbmNlcyhnZW5GaWxlKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBvcmlnaW5hbEZpbGVFeGlzdHMoZmlsZU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGxldCBmaWxlRXhpc3RzID0gdGhpcy5vcmlnaW5hbEZpbGVFeGlzdHNDYWNoZS5nZXQoZmlsZU5hbWUpO1xuICAgIGlmIChmaWxlRXhpc3RzID09IG51bGwpIHtcbiAgICAgIGZpbGVFeGlzdHMgPSB0aGlzLmNvbnRleHQuZmlsZUV4aXN0cyhmaWxlTmFtZSk7XG4gICAgICB0aGlzLm9yaWdpbmFsRmlsZUV4aXN0c0NhY2hlLnNldChmaWxlTmFtZSwgZmlsZUV4aXN0cyk7XG4gICAgfVxuICAgIHJldHVybiBmaWxlRXhpc3RzO1xuICB9XG5cbiAgZmlsZUV4aXN0cyhmaWxlTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgZmlsZU5hbWUgPSBzdHJpcE5nUmVzb3VyY2VTdWZmaXgoZmlsZU5hbWUpO1xuICAgIGlmICh0aGlzLmxpYnJhcnlTdW1tYXJpZXMuaGFzKGZpbGVOYW1lKSB8fCB0aGlzLmdlbmVyYXRlZFNvdXJjZUZpbGVzLmhhcyhmaWxlTmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaG91bGRHZW5lcmF0ZUZpbGUoZmlsZU5hbWUpLmdlbmVyYXRlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMub3JpZ2luYWxGaWxlRXhpc3RzKGZpbGVOYW1lKTtcbiAgfVxuXG4gIGxvYWRTdW1tYXJ5KGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7XG4gICAgY29uc3Qgc3VtbWFyeSA9IHRoaXMubGlicmFyeVN1bW1hcmllcy5nZXQoZmlsZVBhdGgpO1xuICAgIGlmIChzdW1tYXJ5KSB7XG4gICAgICByZXR1cm4gc3VtbWFyeS50ZXh0O1xuICAgIH1cbiAgICBpZiAodGhpcy5vcmlnaW5hbEZpbGVFeGlzdHMoZmlsZVBhdGgpKSB7XG4gICAgICByZXR1cm4gYXNzZXJ0KHRoaXMuY29udGV4dC5yZWFkRmlsZShmaWxlUGF0aCkpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlzU291cmNlRmlsZShmaWxlUGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgLy8gRG9uJ3QgZ2VuZXJhdGUgYW55IGZpbGVzIG5vciB0eXBlY2hlY2sgdGhlbVxuICAgIC8vIGlmIHNraXBUZW1wbGF0ZUNvZGVnZW4gaXMgc2V0IGFuZCBmdWxsVGVtcGxhdGVUeXBlQ2hlY2sgaXMgbm90IHlldCBzZXQsXG4gICAgLy8gZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICAgIGlmICh0aGlzLm9wdGlvbnMuc2tpcFRlbXBsYXRlQ29kZWdlbiAmJiAhdGhpcy5vcHRpb25zLmZ1bGxUZW1wbGF0ZVR5cGVDaGVjaykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBJZiB3ZSBoYXZlIGEgc3VtbWFyeSBmcm9tIGEgcHJldmlvdXMgY29tcGlsYXRpb24sXG4gICAgLy8gdHJlYXQgdGhlIGZpbGUgbmV2ZXIgYXMgYSBzb3VyY2UgZmlsZS5cbiAgICBpZiAodGhpcy5saWJyYXJ5U3VtbWFyaWVzLmhhcyhmaWxlUGF0aCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKEdFTkVSQVRFRF9GSUxFUy50ZXN0KGZpbGVQYXRoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLmdlbmVyYXRlQ29kZUZvckxpYnJhcmllcyA9PT0gZmFsc2UgJiYgRFRTLnRlc3QoZmlsZVBhdGgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChEVFMudGVzdChmaWxlUGF0aCkpIHtcbiAgICAgIC8vIENoZWNrIGZvciBhIGJ1bmRsZSBpbmRleC5cbiAgICAgIGlmICh0aGlzLmhhc0J1bmRsZUluZGV4KGZpbGVQYXRoKSkge1xuICAgICAgICBjb25zdCBub3JtYWxGaWxlUGF0aCA9IHBhdGgubm9ybWFsaXplKGZpbGVQYXRoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmxhdE1vZHVsZUluZGV4TmFtZXMuaGFzKG5vcm1hbEZpbGVQYXRoKSB8fFxuICAgICAgICAgICAgdGhpcy5mbGF0TW9kdWxlSW5kZXhSZWRpcmVjdE5hbWVzLmhhcyhub3JtYWxGaWxlUGF0aCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmVhZEZpbGUoZmlsZU5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IHN1bW1hcnkgPSB0aGlzLmxpYnJhcnlTdW1tYXJpZXMuZ2V0KGZpbGVOYW1lKTtcbiAgICBpZiAoc3VtbWFyeSkge1xuICAgICAgcmV0dXJuIHN1bW1hcnkudGV4dDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5yZWFkRmlsZShmaWxlTmFtZSk7XG4gIH1cblxuICBnZXRNZXRhZGF0YUZvcihmaWxlUGF0aDogc3RyaW5nKTogTW9kdWxlTWV0YWRhdGFbXXx1bmRlZmluZWQge1xuICAgIHJldHVybiByZWFkTWV0YWRhdGEoZmlsZVBhdGgsIHRoaXMubWV0YWRhdGFSZWFkZXJIb3N0LCB0aGlzLm1ldGFkYXRhUmVhZGVyQ2FjaGUpO1xuICB9XG5cbiAgbG9hZFJlc291cmNlKGZpbGVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz58c3RyaW5nIHtcbiAgICBpZiAodGhpcy5jb250ZXh0LnJlYWRSZXNvdXJjZSkgcmV0dXJuIHRoaXMuY29udGV4dC5yZWFkUmVzb3VyY2UoZmlsZVBhdGgpO1xuICAgIGlmICghdGhpcy5vcmlnaW5hbEZpbGVFeGlzdHMoZmlsZVBhdGgpKSB7XG4gICAgICB0aHJvdyBzeW50YXhFcnJvcihgRXJyb3I6IFJlc291cmNlIGZpbGUgbm90IGZvdW5kOiAke2ZpbGVQYXRofWApO1xuICAgIH1cbiAgICByZXR1cm4gYXNzZXJ0KHRoaXMuY29udGV4dC5yZWFkRmlsZShmaWxlUGF0aCkpO1xuICB9XG5cbiAgZ2V0T3V0cHV0TmFtZShmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gcGF0aC5yZWxhdGl2ZSh0aGlzLmdldEN1cnJlbnREaXJlY3RvcnkoKSwgZmlsZVBhdGgpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNCdW5kbGVJbmRleChmaWxlUGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgY2hlY2tCdW5kbGVJbmRleCA9IChkaXJlY3Rvcnk6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuZmxhdE1vZHVsZUluZGV4Q2FjaGUuZ2V0KGRpcmVjdG9yeSk7XG4gICAgICBpZiAocmVzdWx0ID09IG51bGwpIHtcbiAgICAgICAgaWYgKHBhdGguYmFzZW5hbWUoZGlyZWN0b3J5KSA9PSAnbm9kZV9tb2R1bGUnKSB7XG4gICAgICAgICAgLy8gRG9uJ3QgbG9vayBvdXRzaWRlIHRoZSBub2RlX21vZHVsZXMgdGhpcyBwYWNrYWdlIGlzIGluc3RhbGxlZCBpbi5cbiAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBBIGJ1bmRsZSBpbmRleCBleGlzdHMgaWYgdGhlIHR5cGluZ3MgLmQudHMgZmlsZSBoYXMgYSBtZXRhZGF0YS5qc29uIHRoYXQgaGFzIGFuXG4gICAgICAgICAgLy8gaW1wb3J0QXMuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHBhY2thZ2VGaWxlID0gcGF0aC5qb2luKGRpcmVjdG9yeSwgJ3BhY2thZ2UuanNvbicpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3JpZ2luYWxGaWxlRXhpc3RzKHBhY2thZ2VGaWxlKSkge1xuICAgICAgICAgICAgICAvLyBPbmNlIHdlIHNlZSBhIHBhY2thZ2UuanNvbiBmaWxlLCBhc3N1bWUgZmFsc2UgdW50aWwgaXQgd2UgZmluZCB0aGUgYnVuZGxlIGluZGV4LlxuICAgICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgY29uc3QgcGFja2FnZUNvbnRlbnQ6IGFueSA9IEpTT04ucGFyc2UoYXNzZXJ0KHRoaXMuY29udGV4dC5yZWFkRmlsZShwYWNrYWdlRmlsZSkpKTtcbiAgICAgICAgICAgICAgaWYgKHBhY2thZ2VDb250ZW50LnR5cGluZ3MpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBpbmdzID0gcGF0aC5ub3JtYWxpemUocGF0aC5qb2luKGRpcmVjdG9yeSwgcGFja2FnZUNvbnRlbnQudHlwaW5ncykpO1xuICAgICAgICAgICAgICAgIGlmIChEVFMudGVzdCh0eXBpbmdzKSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgbWV0YWRhdGFGaWxlID0gdHlwaW5ncy5yZXBsYWNlKERUUywgJy5tZXRhZGF0YS5qc29uJyk7XG4gICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcmlnaW5hbEZpbGVFeGlzdHMobWV0YWRhdGFGaWxlKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXRhZGF0YSA9IEpTT04ucGFyc2UoYXNzZXJ0KHRoaXMuY29udGV4dC5yZWFkRmlsZShtZXRhZGF0YUZpbGUpKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXRhZGF0YS5mbGF0TW9kdWxlSW5kZXhSZWRpcmVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmxhdE1vZHVsZUluZGV4UmVkaXJlY3ROYW1lcy5hZGQodHlwaW5ncyk7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gTm90ZTogZG9uJ3Qgc2V0IHJlc3VsdCA9IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgLy8gYXMgdGhpcyB3b3VsZCBtYXJrIHRoaXMgZm9sZGVyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gYXMgaGF2aW5nIGEgYnVuZGxlSW5kZXggdG9vIGVhcmx5IHdpdGhvdXRcbiAgICAgICAgICAgICAgICAgICAgICAvLyBmaWxsaW5nIHRoZSBidW5kbGVJbmRleE5hbWVzLlxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLmltcG9ydEFzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbGF0TW9kdWxlSW5kZXhOYW1lcy5hZGQodHlwaW5ncyk7XG4gICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gcGF0aC5kaXJuYW1lKGRpcmVjdG9yeSk7XG4gICAgICAgICAgICAgIGlmIChwYXJlbnQgIT0gZGlyZWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgLy8gVHJ5IHRoZSBwYXJlbnQgZGlyZWN0b3J5LlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNoZWNrQnVuZGxlSW5kZXgocGFyZW50KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgLy8gSWYgd2UgZW5jb3VudGVyIGFueSBlcnJvcnMgYXNzdW1lIHdlIHRoaXMgaXNuJ3QgYSBidW5kbGUgaW5kZXguXG4gICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mbGF0TW9kdWxlSW5kZXhDYWNoZS5zZXQoZGlyZWN0b3J5LCByZXN1bHQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGNoZWNrQnVuZGxlSW5kZXgocGF0aC5kaXJuYW1lKGZpbGVQYXRoKSk7XG4gIH1cblxuICBnZXREZWZhdWx0TGliRmlsZU5hbWUgPSAob3B0aW9uczogdHMuQ29tcGlsZXJPcHRpb25zKSA9PlxuICAgICAgdGhpcy5jb250ZXh0LmdldERlZmF1bHRMaWJGaWxlTmFtZShvcHRpb25zKVxuICBnZXRDdXJyZW50RGlyZWN0b3J5ID0gKCkgPT4gdGhpcy5jb250ZXh0LmdldEN1cnJlbnREaXJlY3RvcnkoKTtcbiAgZ2V0Q2Fub25pY2FsRmlsZU5hbWUgPSAoZmlsZU5hbWU6IHN0cmluZykgPT4gdGhpcy5jb250ZXh0LmdldENhbm9uaWNhbEZpbGVOYW1lKGZpbGVOYW1lKTtcbiAgdXNlQ2FzZVNlbnNpdGl2ZUZpbGVOYW1lcyA9ICgpID0+IHRoaXMuY29udGV4dC51c2VDYXNlU2Vuc2l0aXZlRmlsZU5hbWVzKCk7XG4gIGdldE5ld0xpbmUgPSAoKSA9PiB0aGlzLmNvbnRleHQuZ2V0TmV3TGluZSgpO1xuICAvLyBNYWtlIHN1cmUgd2UgZG8gbm90IGBob3N0LnJlYWxwYXRoKClgIGZyb20gVFMgYXMgd2UgZG8gbm90IHdhbnQgdG8gcmVzb2x2ZSBzeW1saW5rcy5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy85NTUyXG4gIHJlYWxwYXRoID0gKHA6IHN0cmluZykgPT4gcDtcbiAgd3JpdGVGaWxlID0gdGhpcy5jb250ZXh0LndyaXRlRmlsZS5iaW5kKHRoaXMuY29udGV4dCk7XG59XG5cbmZ1bmN0aW9uIGdlbkZpbGVFeHRlcm5hbFJlZmVyZW5jZXMoZ2VuRmlsZTogR2VuZXJhdGVkRmlsZSk6IFNldDxzdHJpbmc+IHtcbiAgcmV0dXJuIG5ldyBTZXQoY29sbGVjdEV4dGVybmFsUmVmZXJlbmNlcyhnZW5GaWxlLnN0bXRzICEpLm1hcChlciA9PiBlci5tb2R1bGVOYW1lICEpKTtcbn1cblxuZnVuY3Rpb24gYWRkUmVmZXJlbmNlc1RvU291cmNlRmlsZShzZjogdHMuU291cmNlRmlsZSwgZ2VuRmlsZU5hbWVzOiBzdHJpbmdbXSkge1xuICAvLyBOb3RlOiBhcyB3ZSBtb2RpZnkgdHMuU291cmNlRmlsZXMgd2UgbmVlZCB0byBrZWVwIHRoZSBvcmlnaW5hbFxuICAvLyB2YWx1ZSBmb3IgYHJlZmVyZW5jZWRGaWxlc2AgYXJvdW5kIGluIGNhY2hlIHRoZSBvcmlnaW5hbCBob3N0IGlzIGNhY2hpbmcgdHMuU291cmNlRmlsZXMuXG4gIC8vIE5vdGU6IGNsb25pbmcgdGhlIHRzLlNvdXJjZUZpbGUgaXMgZXhwZW5zaXZlIGFzIHRoZSBub2RlcyBpbiBoYXZlIHBhcmVudCBwb2ludGVycyxcbiAgLy8gaS5lLiB3ZSB3b3VsZCBhbHNvIG5lZWQgdG8gY2xvbmUgYW5kIGFkanVzdCBhbGwgbm9kZXMuXG4gIGxldCBvcmlnaW5hbFJlZmVyZW5jZWRGaWxlczogUmVhZG9ubHlBcnJheTx0cy5GaWxlUmVmZXJlbmNlPiA9XG4gICAgICAoc2YgYXMgYW55KS5vcmlnaW5hbFJlZmVyZW5jZWRGaWxlcztcbiAgaWYgKCFvcmlnaW5hbFJlZmVyZW5jZWRGaWxlcykge1xuICAgIG9yaWdpbmFsUmVmZXJlbmNlZEZpbGVzID0gc2YucmVmZXJlbmNlZEZpbGVzO1xuICAgIChzZiBhcyBhbnkpLm9yaWdpbmFsUmVmZXJlbmNlZEZpbGVzID0gb3JpZ2luYWxSZWZlcmVuY2VkRmlsZXM7XG4gIH1cbiAgY29uc3QgbmV3UmVmZXJlbmNlZEZpbGVzID0gWy4uLm9yaWdpbmFsUmVmZXJlbmNlZEZpbGVzXTtcbiAgZ2VuRmlsZU5hbWVzLmZvckVhY2goZ2YgPT4gbmV3UmVmZXJlbmNlZEZpbGVzLnB1c2goe2ZpbGVOYW1lOiBnZiwgcG9zOiAwLCBlbmQ6IDB9KSk7XG4gIHNmLnJlZmVyZW5jZWRGaWxlcyA9IG5ld1JlZmVyZW5jZWRGaWxlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE9yaWdpbmFsUmVmZXJlbmNlcyhzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlKTogdHMuRmlsZVJlZmVyZW5jZVtdfHVuZGVmaW5lZCB7XG4gIHJldHVybiBzb3VyY2VGaWxlICYmIChzb3VyY2VGaWxlIGFzIGFueSkub3JpZ2luYWxSZWZlcmVuY2VkRmlsZXM7XG59XG5cbmZ1bmN0aW9uIGRvdFJlbGF0aXZlKGZyb206IHN0cmluZywgdG86IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHJQYXRoOiBzdHJpbmcgPSBwYXRoLnJlbGF0aXZlKGZyb20sIHRvKS5yZXBsYWNlKC9cXFxcL2csICcvJyk7XG4gIHJldHVybiByUGF0aC5zdGFydHNXaXRoKCcuJykgPyByUGF0aCA6ICcuLycgKyByUGF0aDtcbn1cblxuLyoqXG4gKiBNb3ZlcyB0aGUgcGF0aCBpbnRvIGBnZW5EaXJgIGZvbGRlciB3aGlsZSBwcmVzZXJ2aW5nIHRoZSBgbm9kZV9tb2R1bGVzYCBkaXJlY3RvcnkuXG4gKi9cbmZ1bmN0aW9uIGdldFBhY2thZ2VOYW1lKGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7XG4gIGNvbnN0IG1hdGNoID0gTk9ERV9NT0RVTEVTX1BBQ0tBR0VfTkFNRS5leGVjKGZpbGVQYXRoKTtcbiAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiBudWxsO1xufVxuXG5mdW5jdGlvbiBzdHJpcE5vZGVNb2R1bGVzUHJlZml4KGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gZmlsZVBhdGgucmVwbGFjZSgvLipub2RlX21vZHVsZXNcXC8vLCAnJyk7XG59XG5cbmZ1bmN0aW9uIGdldE5vZGVNb2R1bGVzUHJlZml4KGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7XG4gIGNvbnN0IG1hdGNoID0gLy4qbm9kZV9tb2R1bGVzXFwvLy5leGVjKGZpbGVQYXRoKTtcbiAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiBudWxsO1xufVxuXG5mdW5jdGlvbiBzdHJpcE5nUmVzb3VyY2VTdWZmaXgoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBmaWxlTmFtZS5yZXBsYWNlKC9cXC5cXCRuZ3Jlc291cmNlXFwkLiovLCAnJyk7XG59XG5cbmZ1bmN0aW9uIGFkZE5nUmVzb3VyY2VTdWZmaXgoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBgJHtmaWxlTmFtZX0uJG5ncmVzb3VyY2UkYDtcbn1cbiJdfQ==