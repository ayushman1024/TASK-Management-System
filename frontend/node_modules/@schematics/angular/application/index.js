"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const index_1 = require("../component/index");
const config_1 = require("../utility/config");
const dependencies_1 = require("../utility/dependencies");
const json_utils_1 = require("../utility/json-utils");
const latest_versions_1 = require("../utility/latest-versions");
const lint_fix_1 = require("../utility/lint-fix");
const validation_1 = require("../utility/validation");
const workspace_models_1 = require("../utility/workspace-models");
const schema_1 = require("./schema");
// TODO: use JsonAST
// function appendPropertyInAstObject(
//   recorder: UpdateRecorder,
//   node: JsonAstObject,
//   propertyName: string,
//   value: JsonValue,
//   indent = 4,
// ) {
//   const indentStr = '\n' + new Array(indent + 1).join(' ');
//   if (node.properties.length > 0) {
//     // Insert comma.
//     const last = node.properties[node.properties.length - 1];
//     recorder.insertRight(last.start.offset + last.text.replace(/\s+$/, '').length, ',');
//   }
//   recorder.insertLeft(
//     node.end.offset - 1,
//     '  '
//     + `"${propertyName}": ${JSON.stringify(value, null, 2).replace(/\n/g, indentStr)}`
//     + indentStr.slice(0, -2),
//   );
// }
function addDependenciesToPackageJson(options) {
    return (host, context) => {
        [
            {
                type: dependencies_1.NodeDependencyType.Dev,
                name: '@angular/compiler-cli',
                version: latest_versions_1.latestVersions.Angular,
            },
            {
                type: dependencies_1.NodeDependencyType.Dev,
                name: '@angular-devkit/build-angular',
                version: latest_versions_1.latestVersions.DevkitBuildAngular,
            },
            {
                type: dependencies_1.NodeDependencyType.Dev,
                name: 'typescript',
                version: latest_versions_1.latestVersions.TypeScript,
            },
        ].forEach(dependency => dependencies_1.addPackageJsonDependency(host, dependency));
        if (!options.skipInstall) {
            context.addTask(new tasks_1.NodePackageInstallTask());
        }
        return host;
    };
}
function addPostInstallScript() {
    return (host) => {
        const pkgJsonPath = '/package.json';
        const buffer = host.read(pkgJsonPath);
        if (!buffer) {
            throw new schematics_1.SchematicsException('Could not read package.json.');
        }
        const packageJsonAst = core_1.parseJsonAst(buffer.toString(), core_1.JsonParseMode.Strict);
        if (packageJsonAst.kind !== 'object') {
            throw new schematics_1.SchematicsException('Invalid package.json. Was expecting an object.');
        }
        const scriptsNode = json_utils_1.findPropertyInAstObject(packageJsonAst, 'scripts');
        if (scriptsNode && scriptsNode.kind === 'object') {
            const recorder = host.beginUpdate(pkgJsonPath);
            const postInstall = json_utils_1.findPropertyInAstObject(scriptsNode, 'postinstall');
            if (!postInstall) {
                // postinstall script not found, add it.
                json_utils_1.insertPropertyInAstObjectInOrder(recorder, scriptsNode, 'postinstall', 'ivy-ngcc', 4);
            }
            host.commitUpdate(recorder);
        }
    };
}
function addAppToWorkspaceFile(options, workspace) {
    // TODO: use JsonAST
    // const workspacePath = '/angular.json';
    // const workspaceBuffer = host.read(workspacePath);
    // if (workspaceBuffer === null) {
    //   throw new SchematicsException(`Configuration file (${workspacePath}) not found.`);
    // }
    // const workspaceJson = parseJson(workspaceBuffer.toString());
    // if (workspaceJson.value === null) {
    //   throw new SchematicsException(`Unable to parse configuration file (${workspacePath}).`);
    // }
    let projectRoot = options.projectRoot !== undefined
        ? options.projectRoot
        : `${workspace.newProjectRoot}/${options.name}`;
    if (projectRoot !== '' && !projectRoot.endsWith('/')) {
        projectRoot += '/';
    }
    const rootFilesRoot = options.projectRoot === undefined
        ? projectRoot
        : projectRoot + 'src/';
    const schematics = {};
    if (options.inlineTemplate === true
        || options.inlineStyle === true
        || options.style !== schema_1.Style.Css) {
        const componentSchematicsOptions = {};
        if (options.inlineTemplate === true) {
            componentSchematicsOptions.inlineTemplate = true;
        }
        if (options.inlineStyle === true) {
            componentSchematicsOptions.inlineStyle = true;
        }
        if (options.style && options.style !== schema_1.Style.Css) {
            componentSchematicsOptions.style = options.style;
        }
        schematics['@schematics/angular:component'] = componentSchematicsOptions;
    }
    if (options.skipTests === true) {
        ['class', 'component', 'directive', 'guard', 'module', 'pipe', 'service'].forEach((type) => {
            if (!(`@schematics/angular:${type}` in schematics)) {
                schematics[`@schematics/angular:${type}`] = {};
            }
            schematics[`@schematics/angular:${type}`].skipTests = true;
        });
    }
    const styleExt = index_1.styleToFileExtention(options.style);
    const project = {
        root: projectRoot,
        sourceRoot: core_1.join(core_1.normalize(projectRoot), 'src'),
        projectType: workspace_models_1.ProjectType.Application,
        prefix: options.prefix || 'app',
        schematics,
        architect: {
            build: {
                builder: workspace_models_1.Builders.Browser,
                options: {
                    outputPath: `dist/${options.name}`,
                    index: `${projectRoot}src/index.html`,
                    main: `${projectRoot}src/main.ts`,
                    polyfills: `${projectRoot}src/polyfills.ts`,
                    tsConfig: `${rootFilesRoot}tsconfig.app.json`,
                    assets: [
                        core_1.join(core_1.normalize(projectRoot), 'src', 'favicon.ico'),
                        core_1.join(core_1.normalize(projectRoot), 'src', 'assets'),
                    ],
                    styles: [
                        `${projectRoot}src/styles.${styleExt}`,
                    ],
                    scripts: [],
                    es5BrowserSupport: true,
                },
                configurations: {
                    production: {
                        fileReplacements: [{
                                replace: `${projectRoot}src/environments/environment.ts`,
                                with: `${projectRoot}src/environments/environment.prod.ts`,
                            }],
                        optimization: true,
                        outputHashing: 'all',
                        sourceMap: false,
                        extractCss: true,
                        namedChunks: false,
                        aot: true,
                        extractLicenses: true,
                        vendorChunk: false,
                        buildOptimizer: true,
                        budgets: [{
                                type: 'initial',
                                maximumWarning: '2mb',
                                maximumError: '5mb',
                            }],
                    },
                },
            },
            serve: {
                builder: workspace_models_1.Builders.DevServer,
                options: {
                    browserTarget: `${options.name}:build`,
                },
                configurations: {
                    production: {
                        browserTarget: `${options.name}:build:production`,
                    },
                },
            },
            'extract-i18n': {
                builder: workspace_models_1.Builders.ExtractI18n,
                options: {
                    browserTarget: `${options.name}:build`,
                },
            },
            test: {
                builder: workspace_models_1.Builders.Karma,
                options: {
                    main: `${projectRoot}src/test.ts`,
                    polyfills: `${projectRoot}src/polyfills.ts`,
                    tsConfig: `${rootFilesRoot}tsconfig.spec.json`,
                    karmaConfig: `${rootFilesRoot}karma.conf.js`,
                    styles: [
                        `${projectRoot}src/styles.${styleExt}`,
                    ],
                    scripts: [],
                    assets: [
                        core_1.join(core_1.normalize(projectRoot), 'src', 'favicon.ico'),
                        core_1.join(core_1.normalize(projectRoot), 'src', 'assets'),
                    ],
                },
            },
            lint: {
                builder: workspace_models_1.Builders.TsLint,
                options: {
                    tsConfig: [
                        `${rootFilesRoot}tsconfig.app.json`,
                        `${rootFilesRoot}tsconfig.spec.json`,
                    ],
                    exclude: [
                        '**/node_modules/**',
                    ],
                },
            },
        },
    };
    // tslint:disable-next-line:no-any
    // const projects: JsonObject = (<any> workspaceAst.value).projects || {};
    // tslint:disable-next-line:no-any
    // if (!(<any> workspaceAst.value).projects) {
    //   // tslint:disable-next-line:no-any
    //   (<any> workspaceAst.value).projects = projects;
    // }
    return config_1.addProjectToWorkspace(workspace, options.name, project);
}
function minimalPathFilter(path) {
    const toRemoveList = /(test.ts|tsconfig.spec.json|karma.conf.js).template$/;
    return !toRemoveList.test(path);
}
function default_1(options) {
    return (host, context) => {
        if (!options.name) {
            throw new schematics_1.SchematicsException(`Invalid options, "name" is required.`);
        }
        validation_1.validateProjectName(options.name);
        const prefix = options.prefix || 'app';
        const appRootSelector = `${prefix}-root`;
        const componentOptions = !options.minimal ?
            {
                inlineStyle: options.inlineStyle,
                inlineTemplate: options.inlineTemplate,
                skipTests: options.skipTests,
                style: options.style,
                viewEncapsulation: options.viewEncapsulation,
            } :
            {
                inlineStyle: true,
                inlineTemplate: true,
                skipTests: true,
                style: options.style,
            };
        const workspace = config_1.getWorkspace(host);
        let newProjectRoot = workspace.newProjectRoot || 'projects';
        let appDir = `${newProjectRoot}/${options.name}`;
        let sourceRoot = `${appDir}/src`;
        let sourceDir = `${sourceRoot}/app`;
        let relativePathToWorkspaceRoot = appDir.split('/').map(x => '..').join('/');
        const rootInSrc = options.projectRoot !== undefined;
        if (options.projectRoot !== undefined) {
            newProjectRoot = options.projectRoot;
            appDir = `${newProjectRoot}/src`;
            sourceRoot = appDir;
            sourceDir = `${sourceRoot}/app`;
            relativePathToWorkspaceRoot = core_1.relative(core_1.normalize('/' + sourceRoot), core_1.normalize('/'));
            if (relativePathToWorkspaceRoot === '') {
                relativePathToWorkspaceRoot = '.';
            }
        }
        const tsLintRoot = appDir;
        const e2eOptions = {
            name: `${options.name}-e2e`,
            relatedAppName: options.name,
            rootSelector: appRootSelector,
            projectRoot: newProjectRoot ? `${newProjectRoot}/${options.name}-e2e` : 'e2e',
        };
        const styleExt = index_1.styleToFileExtention(options.style);
        return schematics_1.chain([
            addAppToWorkspaceFile(options, workspace),
            schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files/src'), [
                options.minimal ? schematics_1.filter(minimalPathFilter) : schematics_1.noop(),
                schematics_1.applyTemplates(Object.assign({ utils: core_1.strings }, options, { 'dot': '.', relativePathToWorkspaceRoot,
                    styleExt })),
                schematics_1.move(sourceRoot),
            ])),
            schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files/root'), [
                options.minimal ? schematics_1.filter(minimalPathFilter) : schematics_1.noop(),
                schematics_1.applyTemplates(Object.assign({ utils: core_1.strings }, options, { 'dot': '.', relativePathToWorkspaceRoot,
                    rootInSrc, appName: options.name })),
                schematics_1.move(appDir),
            ])),
            options.minimal ? schematics_1.noop() : schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files/lint'), [
                schematics_1.applyTemplates(Object.assign({ utils: core_1.strings }, options, { tsLintRoot,
                    relativePathToWorkspaceRoot,
                    prefix })),
            ])),
            schematics_1.schematic('module', {
                name: 'app',
                commonModule: false,
                flat: true,
                routing: options.routing,
                routingScope: 'Root',
                path: sourceDir,
                project: options.name,
            }),
            schematics_1.schematic('component', Object.assign({ name: 'app', selector: appRootSelector, flat: true, path: sourceDir, skipImport: true, project: options.name }, componentOptions)),
            schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./other-files'), [
                componentOptions.inlineTemplate
                    ? schematics_1.filter(path => !path.endsWith('.html.template'))
                    : schematics_1.noop(),
                componentOptions.skipTests
                    ? schematics_1.filter(path => !/[.|-]spec.ts.template$/.test(path))
                    : schematics_1.noop(),
                schematics_1.applyTemplates(Object.assign({ utils: core_1.strings }, options, { selector: appRootSelector }, componentOptions, { styleExt })),
                schematics_1.move(sourceDir),
            ]), schematics_1.MergeStrategy.Overwrite),
            options.minimal ? schematics_1.noop() : schematics_1.schematic('e2e', e2eOptions),
            options.experimentalIvy ? addPostInstallScript() : schematics_1.noop(),
            options.skipPackageJson ? schematics_1.noop() : addDependenciesToPackageJson(options),
            options.lintFix ? lint_fix_1.applyLintFix(sourceDir) : schematics_1.noop(),
        ]);
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL3NjaGVtYXRpY3MvYW5ndWxhci9hcHBsaWNhdGlvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILCtDQVE4QjtBQUM5QiwyREFlb0M7QUFDcEMsNERBQTBFO0FBQzFFLDhDQUEwRDtBQUcxRCw4Q0FHMkI7QUFDM0IsMERBQXVGO0FBQ3ZGLHNEQUFrRztBQUNsRyxnRUFBNEQ7QUFDNUQsa0RBQW1EO0FBQ25ELHNEQUE0RDtBQUM1RCxrRUFLcUM7QUFDckMscUNBQStEO0FBRy9ELG9CQUFvQjtBQUNwQixzQ0FBc0M7QUFDdEMsOEJBQThCO0FBQzlCLHlCQUF5QjtBQUN6QiwwQkFBMEI7QUFDMUIsc0JBQXNCO0FBQ3RCLGdCQUFnQjtBQUNoQixNQUFNO0FBQ04sOERBQThEO0FBRTlELHNDQUFzQztBQUN0Qyx1QkFBdUI7QUFDdkIsZ0VBQWdFO0FBQ2hFLDJGQUEyRjtBQUMzRixNQUFNO0FBRU4seUJBQXlCO0FBQ3pCLDJCQUEyQjtBQUMzQixXQUFXO0FBQ1gseUZBQXlGO0FBQ3pGLGdDQUFnQztBQUNoQyxPQUFPO0FBQ1AsSUFBSTtBQUVKLFNBQVMsNEJBQTRCLENBQUMsT0FBMkI7SUFDL0QsT0FBTyxDQUFDLElBQVUsRUFBRSxPQUF5QixFQUFFLEVBQUU7UUFDL0M7WUFDRTtnQkFDRSxJQUFJLEVBQUUsaUNBQWtCLENBQUMsR0FBRztnQkFDNUIsSUFBSSxFQUFFLHVCQUF1QjtnQkFDN0IsT0FBTyxFQUFFLGdDQUFjLENBQUMsT0FBTzthQUNoQztZQUNEO2dCQUNFLElBQUksRUFBRSxpQ0FBa0IsQ0FBQyxHQUFHO2dCQUM1QixJQUFJLEVBQUUsK0JBQStCO2dCQUNyQyxPQUFPLEVBQUUsZ0NBQWMsQ0FBQyxrQkFBa0I7YUFDM0M7WUFDRDtnQkFDRSxJQUFJLEVBQUUsaUNBQWtCLENBQUMsR0FBRztnQkFDNUIsSUFBSSxFQUFF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Q0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3RELENBQUMsQ0FBQyxpQkFBSSxFQUFFO2dCQUNWLDJCQUFjLGlCQUNaLEtBQUssRUFBRSxjQUFPLElBQ1gsT0FBYyxJQUNqQixRQUFRLEVBQUUsZUFBZSxJQUN0QixnQkFBZ0IsSUFDbkIsUUFBUSxJQUNSO2dCQUNGLGlCQUFJLENBQUMsU0FBUyxDQUFDO2FBQ2hCLENBQUMsRUFBRSwwQkFBYSxDQUFDLFNBQVMsQ0FBQztZQUM5QixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxpQkFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLHNCQUFTLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQztZQUN2RCxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxpQkFBSSxFQUFFO1lBQ3pELE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLGlCQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsNEJBQTRCLENBQUMsT0FBTyxDQUFDO1lBQ3hFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLHVCQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFJLEVBQUU7U0FDbkQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQXJJRCw0QkFxSUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge1xuICBKc29uT2JqZWN0LFxuICBKc29uUGFyc2VNb2RlLFxuICBqb2luLFxuICBub3JtYWxpemUsXG4gIHBhcnNlSnNvbkFzdCxcbiAgcmVsYXRpdmUsXG4gIHN0cmluZ3MsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7XG4gIE1lcmdlU3RyYXRlZ3ksXG4gIFJ1bGUsXG4gIFNjaGVtYXRpY0NvbnRleHQsXG4gIFNjaGVtYXRpY3NFeGNlcHRpb24sXG4gIFRyZWUsXG4gIGFwcGx5LFxuICBhcHBseVRlbXBsYXRlcyxcbiAgY2hhaW4sXG4gIGZpbHRlcixcbiAgbWVyZ2VXaXRoLFxuICBtb3ZlLFxuICBub29wLFxuICBzY2hlbWF0aWMsXG4gIHVybCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHsgTm9kZVBhY2thZ2VJbnN0YWxsVGFzayB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzL3Rhc2tzJztcbmltcG9ydCB7IHN0eWxlVG9GaWxlRXh0ZW50aW9uIH0gZnJvbSAnLi4vY29tcG9uZW50L2luZGV4JztcbmltcG9ydCB7IFNjaGVtYSBhcyBDb21wb25lbnRPcHRpb25zIH0gZnJvbSAnLi4vY29tcG9uZW50L3NjaGVtYSc7XG5pbXBvcnQgeyBTY2hlbWEgYXMgRTJlT3B0aW9ucyB9IGZyb20gJy4uL2UyZS9zY2hlbWEnO1xuaW1wb3J0IHtcbiAgYWRkUHJvamVjdFRvV29ya3NwYWNlLFxuICBnZXRXb3Jrc3BhY2UsXG59IGZyb20gJy4uL3V0aWxpdHkvY29uZmlnJztcbmltcG9ydCB7IE5vZGVEZXBlbmRlbmN5VHlwZSwgYWRkUGFja2FnZUpzb25EZXBlbmRlbmN5IH0gZnJvbSAnLi4vdXRpbGl0eS9kZXBlbmRlbmNpZXMnO1xuaW1wb3J0IHsgZmluZFByb3BlcnR5SW5Bc3RPYmplY3QsIGluc2VydFByb3BlcnR5SW5Bc3RPYmplY3RJbk9yZGVyIH0gZnJvbSAnLi4vdXRpbGl0eS9qc29uLXV0aWxzJztcbmltcG9ydCB7IGxhdGVzdFZlcnNpb25zIH0gZnJvbSAnLi4vdXRpbGl0eS9sYXRlc3QtdmVyc2lvbnMnO1xuaW1wb3J0IHsgYXBwbHlMaW50Rml4IH0gZnJvbSAnLi4vdXRpbGl0eS9saW50LWZpeCc7XG5pbXBvcnQgeyB2YWxpZGF0ZVByb2plY3ROYW1lIH0gZnJvbSAnLi4vdXRpbGl0eS92YWxpZGF0aW9uJztcbmltcG9ydCB7XG4gIEJ1aWxkZXJzLFxuICBQcm9qZWN0VHlwZSxcbiAgV29ya3NwYWNlUHJvamVjdCxcbiAgV29ya3NwYWNlU2NoZW1hLFxufSBmcm9tICcuLi91dGlsaXR5L3dvcmtzcGFjZS1tb2RlbHMnO1xuaW1wb3J0IHsgU2NoZW1hIGFzIEFwcGxpY2F0aW9uT3B0aW9ucywgU3R5bGUgfSBmcm9tICcuL3NjaGVtYSc7XG5cblxuLy8gVE9ETzogdXNlIEpzb25BU1Rcbi8vIGZ1bmN0aW9uIGFwcGVuZFByb3BlcnR5SW5Bc3RPYmplY3QoXG4vLyAgIHJlY29yZGVyOiBVcGRhdGVSZWNvcmRlcixcbi8vICAgbm9kZTogSnNvbkFzdE9iamVjdCxcbi8vICAgcHJvcGVydHlOYW1lOiBzdHJpbmcsXG4vLyAgIHZhbHVlOiBKc29uVmFsdWUsXG4vLyAgIGluZGVudCA9IDQsXG4vLyApIHtcbi8vICAgY29uc3QgaW5kZW50U3RyID0gJ1xcbicgKyBuZXcgQXJyYXkoaW5kZW50ICsgMSkuam9pbignICcpO1xuXG4vLyAgIGlmIChub2RlLnByb3BlcnRpZXMubGVuZ3RoID4gMCkge1xuLy8gICAgIC8vIEluc2VydCBjb21tYS5cbi8vICAgICBjb25zdCBsYXN0ID0gbm9kZS5wcm9wZXJ0aWVzW25vZGUucHJvcGVydGllcy5sZW5ndGggLSAxXTtcbi8vICAgICByZWNvcmRlci5pbnNlcnRSaWdodChsYXN0LnN0YXJ0Lm9mZnNldCArIGxhc3QudGV4dC5yZXBsYWNlKC9cXHMrJC8sICcnKS5sZW5ndGgsICcsJyk7XG4vLyAgIH1cblxuLy8gICByZWNvcmRlci5pbnNlcnRMZWZ0KFxuLy8gICAgIG5vZGUuZW5kLm9mZnNldCAtIDEsXG4vLyAgICAgJyAgJ1xuLy8gICAgICsgYFwiJHtwcm9wZXJ0eU5hbWV9XCI6ICR7SlNPTi5zdHJpbmdpZnkodmFsdWUsIG51bGwsIDIpLnJlcGxhY2UoL1xcbi9nLCBpbmRlbnRTdHIpfWBcbi8vICAgICArIGluZGVudFN0ci5zbGljZSgwLCAtMiksXG4vLyAgICk7XG4vLyB9XG5cbmZ1bmN0aW9uIGFkZERlcGVuZGVuY2llc1RvUGFja2FnZUpzb24ob3B0aW9uczogQXBwbGljYXRpb25PcHRpb25zKSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIFtcbiAgICAgIHtcbiAgICAgICAgdHlwZTogTm9kZURlcGVuZGVuY3lUeXBlLkRldixcbiAgICAgICAgbmFtZTogJ0Bhbmd1bGFyL2NvbXBpbGVyLWNsaScsXG4gICAgICAgIHZlcnNpb246IGxhdGVzdFZlcnNpb25zLkFuZ3VsYXIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBOb2RlRGVwZW5kZW5jeVR5cGUuRGV2LFxuICAgICAgICBuYW1lOiAnQGFuZ3VsYXItZGV2a2l0L2J1aWxkLWFuZ3VsYXInLFxuICAgICAgICB2ZXJzaW9uOiBsYXRlc3RWZXJzaW9ucy5EZXZraXRCdWlsZEFuZ3VsYXIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBOb2RlRGVwZW5kZW5jeVR5cGUuRGV2LFxuICAgICAgICBuYW1lOiAndHlwZXNjcmlwdCcsXG4gICAgICAgIHZlcnNpb246IGxhdGVzdFZlcnNpb25zLlR5cGVTY3JpcHQsXG4gICAgICB9LFxuICAgIF0uZm9yRWFjaChkZXBlbmRlbmN5ID0+IGFkZFBhY2thZ2VKc29uRGVwZW5kZW5jeShob3N0LCBkZXBlbmRlbmN5KSk7XG5cbiAgICBpZiAoIW9wdGlvbnMuc2tpcEluc3RhbGwpIHtcbiAgICAgIGNvbnRleHQuYWRkVGFzayhuZXcgTm9kZVBhY2thZ2VJbnN0YWxsVGFzaygpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaG9zdDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYWRkUG9zdEluc3RhbGxTY3JpcHQoKSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIGNvbnN0IHBrZ0pzb25QYXRoID0gJy9wYWNrYWdlLmpzb24nO1xuICAgIGNvbnN0IGJ1ZmZlciA9IGhvc3QucmVhZChwa2dKc29uUGF0aCk7XG4gICAgaWYgKCFidWZmZXIpIHtcbiAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKCdDb3VsZCBub3QgcmVhZCBwYWNrYWdlLmpzb24uJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcGFja2FnZUpzb25Bc3QgPSBwYXJzZUpzb25Bc3QoYnVmZmVyLnRvU3RyaW5nKCksIEpzb25QYXJzZU1vZGUuU3RyaWN0KTtcbiAgICBpZiAocGFja2FnZUpzb25Bc3Qua2luZCAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKCdJbnZhbGlkIHBhY2thZ2UuanNvbi4gV2FzIGV4cGVjdGluZyBhbiBvYmplY3QuJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2NyaXB0c05vZGUgPSBmaW5kUHJvcGVydHlJbkFzdE9iamVjdChwYWNrYWdlSnNvbkFzdCwgJ3NjcmlwdHMnKTtcbiAgICBpZiAoc2NyaXB0c05vZGUgJiYgc2NyaXB0c05vZGUua2luZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnN0IHJlY29yZGVyID0gaG9zdC5iZWdpblVwZGF0ZShwa2dKc29uUGF0aCk7XG4gICAgICBjb25zdCBwb3N0SW5zdGFsbCA9IGZpbmRQcm9wZXJ0eUluQXN0T2JqZWN0KHNjcmlwdHNOb2RlLCAncG9zdGluc3RhbGwnKTtcblxuICAgICAgaWYgKCFwb3N0SW5zdGFsbCkge1xuICAgICAgICAvLyBwb3N0aW5zdGFsbCBzY3JpcHQgbm90IGZvdW5kLCBhZGQgaXQuXG4gICAgICAgIGluc2VydFByb3BlcnR5SW5Bc3RPYmplY3RJbk9yZGVyKFxuICAgICAgICAgIHJlY29yZGVyLFxuICAgICAgICAgIHNjcmlwdHNOb2RlLFxuICAgICAgICAgICdwb3N0aW5zdGFsbCcsXG4gICAgICAgICAgJ2l2eS1uZ2NjJyxcbiAgICAgICAgICA0LFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBob3N0LmNvbW1pdFVwZGF0ZShyZWNvcmRlcik7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBhZGRBcHBUb1dvcmtzcGFjZUZpbGUob3B0aW9uczogQXBwbGljYXRpb25PcHRpb25zLCB3b3Jrc3BhY2U6IFdvcmtzcGFjZVNjaGVtYSk6IFJ1bGUge1xuICAvLyBUT0RPOiB1c2UgSnNvbkFTVFxuICAvLyBjb25zdCB3b3Jrc3BhY2VQYXRoID0gJy9hbmd1bGFyLmpzb24nO1xuICAvLyBjb25zdCB3b3Jrc3BhY2VCdWZmZXIgPSBob3N0LnJlYWQod29ya3NwYWNlUGF0aCk7XG4gIC8vIGlmICh3b3Jrc3BhY2VCdWZmZXIgPT09IG51bGwpIHtcbiAgLy8gICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbihgQ29uZmlndXJhdGlvbiBmaWxlICgke3dvcmtzcGFjZVBhdGh9KSBub3QgZm91bmQuYCk7XG4gIC8vIH1cbiAgLy8gY29uc3Qgd29ya3NwYWNlSnNvbiA9IHBhcnNlSnNvbih3b3Jrc3BhY2VCdWZmZXIudG9TdHJpbmcoKSk7XG4gIC8vIGlmICh3b3Jrc3BhY2VKc29uLnZhbHVlID09PSBudWxsKSB7XG4gIC8vICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oYFVuYWJsZSB0byBwYXJzZSBjb25maWd1cmF0aW9uIGZpbGUgKCR7d29ya3NwYWNlUGF0aH0pLmApO1xuICAvLyB9XG4gIGxldCBwcm9qZWN0Um9vdCA9IG9wdGlvbnMucHJvamVjdFJvb3QgIT09IHVuZGVmaW5lZFxuICAgID8gb3B0aW9ucy5wcm9qZWN0Um9vdFxuICAgIDogYCR7d29ya3NwYWNlLm5ld1Byb2plY3RSb290fS8ke29wdGlvbnMubmFtZX1gO1xuICBpZiAocHJvamVjdFJvb3QgIT09ICcnICYmICFwcm9qZWN0Um9vdC5lbmRzV2l0aCgnLycpKSB7XG4gICAgcHJvamVjdFJvb3QgKz0gJy8nO1xuICB9XG4gIGNvbnN0IHJvb3RGaWxlc1Jvb3QgPSBvcHRpb25zLnByb2plY3RSb290ID09PSB1bmRlZmluZWRcbiAgICA/IHByb2plY3RSb290XG4gICAgOiBwcm9qZWN0Um9vdCArICdzcmMvJztcblxuICBjb25zdCBzY2hlbWF0aWNzOiBKc29uT2JqZWN0ID0ge307XG5cbiAgaWYgKG9wdGlvbnMuaW5saW5lVGVtcGxhdGUgPT09IHRydWVcbiAgICB8fCBvcHRpb25zLmlubGluZVN0eWxlID09PSB0cnVlXG4gICAgfHwgb3B0aW9ucy5zdHlsZSAhPT0gU3R5bGUuQ3NzKSB7XG4gICAgY29uc3QgY29tcG9uZW50U2NoZW1hdGljc09wdGlvbnM6IEpzb25PYmplY3QgPSB7fTtcbiAgICBpZiAob3B0aW9ucy5pbmxpbmVUZW1wbGF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgY29tcG9uZW50U2NoZW1hdGljc09wdGlvbnMuaW5saW5lVGVtcGxhdGUgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5pbmxpbmVTdHlsZSA9PT0gdHJ1ZSkge1xuICAgICAgY29tcG9uZW50U2NoZW1hdGljc09wdGlvbnMuaW5saW5lU3R5bGUgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zdHlsZSAmJiBvcHRpb25zLnN0eWxlICE9PSBTdHlsZS5Dc3MpIHtcbiAgICAgIGNvbXBvbmVudFNjaGVtYXRpY3NPcHRpb25zLnN0eWxlID0gb3B0aW9ucy5zdHlsZTtcbiAgICB9XG5cbiAgICBzY2hlbWF0aWNzWydAc2NoZW1hdGljcy9hbmd1bGFyOmNvbXBvbmVudCddID0gY29tcG9uZW50U2NoZW1hdGljc09wdGlvbnM7XG4gIH1cblxuICBpZiAob3B0aW9ucy5za2lwVGVzdHMgPT09IHRydWUpIHtcbiAgICBbJ2NsYXNzJywgJ2NvbXBvbmVudCcsICdkaXJlY3RpdmUnLCAnZ3VhcmQnLCAnbW9kdWxlJywgJ3BpcGUnLCAnc2VydmljZSddLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIGlmICghKGBAc2NoZW1hdGljcy9hbmd1bGFyOiR7dHlwZX1gIGluIHNjaGVtYXRpY3MpKSB7XG4gICAgICAgIHNjaGVtYXRpY3NbYEBzY2hlbWF0aWNzL2FuZ3VsYXI6JHt0eXBlfWBdID0ge307XG4gICAgICB9XG4gICAgICAoc2NoZW1hdGljc1tgQHNjaGVtYXRpY3MvYW5ndWxhcjoke3R5cGV9YF0gYXMgSnNvbk9iamVjdCkuc2tpcFRlc3RzID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IHN0eWxlRXh0ID0gc3R5bGVUb0ZpbGVFeHRlbnRpb24ob3B0aW9ucy5zdHlsZSk7XG5cbiAgY29uc3QgcHJvamVjdDogV29ya3NwYWNlUHJvamVjdCA9IHtcbiAgICByb290OiBwcm9qZWN0Um9vdCxcbiAgICBzb3VyY2VSb290OiBqb2luKG5vcm1hbGl6ZShwcm9qZWN0Um9vdCksICdzcmMnKSxcbiAgICBwcm9qZWN0VHlwZTogUHJvamVjdFR5cGUuQXBwbGljYXRpb24sXG4gICAgcHJlZml4OiBvcHRpb25zLnByZWZpeCB8fCAnYXBwJyxcbiAgICBzY2hlbWF0aWNzLFxuICAgIGFyY2hpdGVjdDoge1xuICAgICAgYnVpbGQ6IHtcbiAgICAgICAgYnVpbGRlcjogQnVpbGRlcnMuQnJvd3NlcixcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG91dHB1dFBhdGg6IGBkaXN0LyR7b3B0aW9ucy5uYW1lfWAsXG4gICAgICAgICAgaW5kZXg6IGAke3Byb2plY3RSb290fXNyYy9pbmRleC5odG1sYCxcbiAgICAgICAgICBtYWluOiBgJHtwcm9qZWN0Um9vdH1zcmMvbWFpbi50c2AsXG4gICAgICAgICAgcG9seWZpbGxzOiBgJHtwcm9qZWN0Um9vdH1zcmMvcG9seWZpbGxzLnRzYCxcbiAgICAgICAgICB0c0NvbmZpZzogYCR7cm9vdEZpbGVzUm9vdH10c2NvbmZpZy5hcHAuanNvbmAsXG4gICAgICAgICAgYXNzZXRzOiBbXG4gICAgICAgICAgICBqb2luKG5vcm1hbGl6ZShwcm9qZWN0Um9vdCksICdzcmMnLCAnZmF2aWNvbi5pY28nKSxcbiAgICAgICAgICAgIGpvaW4obm9ybWFsaXplKHByb2plY3RSb290KSwgJ3NyYycsICdhc3NldHMnKSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHN0eWxlczogW1xuICAgICAgICAgICAgYCR7cHJvamVjdFJvb3R9c3JjL3N0eWxlcy4ke3N0eWxlRXh0fWAsXG4gICAgICAgICAgXSxcbiAgICAgICAgICBzY3JpcHRzOiBbXSxcbiAgICAgICAgICBlczVCcm93c2VyU3VwcG9ydDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlndXJhdGlvbnM6IHtcbiAgICAgICAgICBwcm9kdWN0aW9uOiB7XG4gICAgICAgICAgICBmaWxlUmVwbGFjZW1lbnRzOiBbe1xuICAgICAgICAgICAgICByZXBsYWNlOiBgJHtwcm9qZWN0Um9vdH1zcmMvZW52aXJvbm1lbnRzL2Vudmlyb25tZW50LnRzYCxcbiAgICAgICAgICAgICAgd2l0aDogYCR7cHJvamVjdFJvb3R9c3JjL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudC5wcm9kLnRzYCxcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgb3B0aW1pemF0aW9uOiB0cnVlLFxuICAgICAgICAgICAgb3V0cHV0SGFzaGluZzogJ2FsbCcsXG4gICAgICAgICAgICBzb3VyY2VNYXA6IGZhbHNlLFxuICAgICAgICAgICAgZXh0cmFjdENzczogdHJ1ZSxcbiAgICAgICAgICAgIG5hbWVkQ2h1bmtzOiBmYWxzZSxcbiAgICAgICAgICAgIGFvdDogdHJ1ZSxcbiAgICAgICAgICAgIGV4dHJhY3RMaWNlbnNlczogdHJ1ZSxcbiAgICAgICAgICAgIHZlbmRvckNodW5rOiBmYWxzZSxcbiAgICAgICAgICAgIGJ1aWxkT3B0aW1pemVyOiB0cnVlLFxuICAgICAgICAgICAgYnVkZ2V0czogW3tcbiAgICAgICAgICAgICAgdHlwZTogJ2luaXRpYWwnLFxuICAgICAgICAgICAgICBtYXhpbXVtV2FybmluZzogJzJtYicsXG4gICAgICAgICAgICAgIG1heGltdW1FcnJvcjogJzVtYicsXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHNlcnZlOiB7XG4gICAgICAgIGJ1aWxkZXI6IEJ1aWxkZXJzLkRldlNlcnZlcixcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIGJyb3dzZXJUYXJnZXQ6IGAke29wdGlvbnMubmFtZX06YnVpbGRgLFxuICAgICAgICB9LFxuICAgICAgICBjb25maWd1cmF0aW9uczoge1xuICAgICAgICAgIHByb2R1Y3Rpb246IHtcbiAgICAgICAgICAgIGJyb3dzZXJUYXJnZXQ6IGAke29wdGlvbnMubmFtZX06YnVpbGQ6cHJvZHVjdGlvbmAsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICAnZXh0cmFjdC1pMThuJzoge1xuICAgICAgICBidWlsZGVyOiBCdWlsZGVycy5FeHRyYWN0STE4bixcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIGJyb3dzZXJUYXJnZXQ6IGAke29wdGlvbnMubmFtZX06YnVpbGRgLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHRlc3Q6IHtcbiAgICAgICAgYnVpbGRlcjogQnVpbGRlcnMuS2FybWEsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtYWluOiBgJHtwcm9qZWN0Um9vdH1zcmMvdGVzdC50c2AsXG4gICAgICAgICAgcG9seWZpbGxzOiBgJHtwcm9qZWN0Um9vdH1zcmMvcG9seWZpbGxzLnRzYCxcbiAgICAgICAgICB0c0NvbmZpZzogYCR7cm9vdEZpbGVzUm9vdH10c2NvbmZpZy5zcGVjLmpzb25gLFxuICAgICAgICAgIGthcm1hQ29uZmlnOiBgJHtyb290RmlsZXNSb290fWthcm1hLmNvbmYuanNgLFxuICAgICAgICAgIHN0eWxlczogW1xuICAgICAgICAgICAgYCR7cHJvamVjdFJvb3R9c3JjL3N0eWxlcy4ke3N0eWxlRXh0fWAsXG4gICAgICAgICAgXSxcbiAgICAgICAgICBzY3JpcHRzOiBbXSxcbiAgICAgICAgICBhc3NldHM6IFtcbiAgICAgICAgICAgIGpvaW4obm9ybWFsaXplKHByb2plY3RSb290KSwgJ3NyYycsICdmYXZpY29uLmljbycpLFxuICAgICAgICAgICAgam9pbihub3JtYWxpemUocHJvamVjdFJvb3QpLCAnc3JjJywgJ2Fzc2V0cycpLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgbGludDoge1xuICAgICAgICBidWlsZGVyOiBCdWlsZGVycy5Uc0xpbnQsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICB0c0NvbmZpZzogW1xuICAgICAgICAgICAgYCR7cm9vdEZpbGVzUm9vdH10c2NvbmZpZy5hcHAuanNvbmAsXG4gICAgICAgICAgICBgJHtyb290RmlsZXNSb290fXRzY29uZmlnLnNwZWMuanNvbmAsXG4gICAgICAgICAgXSxcbiAgICAgICAgICBleGNsdWRlOiBbXG4gICAgICAgICAgICAnKiovbm9kZV9tb2R1bGVzLyoqJyxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIC8vIGNvbnN0IHByb2plY3RzOiBKc29uT2JqZWN0ID0gKDxhbnk+IHdvcmtzcGFjZUFzdC52YWx1ZSkucHJvamVjdHMgfHwge307XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgLy8gaWYgKCEoPGFueT4gd29ya3NwYWNlQXN0LnZhbHVlKS5wcm9qZWN0cykge1xuICAvLyAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgLy8gICAoPGFueT4gd29ya3NwYWNlQXN0LnZhbHVlKS5wcm9qZWN0cyA9IHByb2plY3RzO1xuICAvLyB9XG5cbiAgcmV0dXJuIGFkZFByb2plY3RUb1dvcmtzcGFjZSh3b3Jrc3BhY2UsIG9wdGlvbnMubmFtZSwgcHJvamVjdCk7XG59XG5cbmZ1bmN0aW9uIG1pbmltYWxQYXRoRmlsdGVyKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCB0b1JlbW92ZUxpc3QgPSAvKHRlc3QudHN8dHNjb25maWcuc3BlYy5qc29ufGthcm1hLmNvbmYuanMpLnRlbXBsYXRlJC87XG5cbiAgcmV0dXJuICF0b1JlbW92ZUxpc3QudGVzdChwYXRoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9wdGlvbnM6IEFwcGxpY2F0aW9uT3B0aW9ucyk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICBpZiAoIW9wdGlvbnMubmFtZSkge1xuICAgICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oYEludmFsaWQgb3B0aW9ucywgXCJuYW1lXCIgaXMgcmVxdWlyZWQuYCk7XG4gICAgfVxuICAgIHZhbGlkYXRlUHJvamVjdE5hbWUob3B0aW9ucy5uYW1lKTtcbiAgICBjb25zdCBwcmVmaXggPSBvcHRpb25zLnByZWZpeCB8fCAnYXBwJztcbiAgICBjb25zdCBhcHBSb290U2VsZWN0b3IgPSBgJHtwcmVmaXh9LXJvb3RgO1xuICAgIGNvbnN0IGNvbXBvbmVudE9wdGlvbnM6IFBhcnRpYWw8Q29tcG9uZW50T3B0aW9ucz4gPSAhb3B0aW9ucy5taW5pbWFsID9cbiAgICAgIHtcbiAgICAgICAgaW5saW5lU3R5bGU6IG9wdGlvbnMuaW5saW5lU3R5bGUsXG4gICAgICAgIGlubGluZVRlbXBsYXRlOiBvcHRpb25zLmlubGluZVRlbXBsYXRlLFxuICAgICAgICBza2lwVGVzdHM6IG9wdGlvbnMuc2tpcFRlc3RzLFxuICAgICAgICBzdHlsZTogb3B0aW9ucy5zdHlsZSxcbiAgICAgICAgdmlld0VuY2Fwc3VsYXRpb246IG9wdGlvbnMudmlld0VuY2Fwc3VsYXRpb24sXG4gICAgICB9IDpcbiAgICAgIHtcbiAgICAgICAgaW5saW5lU3R5bGU6IHRydWUsXG4gICAgICAgIGlubGluZVRlbXBsYXRlOiB0cnVlLFxuICAgICAgICBza2lwVGVzdHM6IHRydWUsXG4gICAgICAgIHN0eWxlOiBvcHRpb25zLnN0eWxlLFxuICAgICAgfTtcblxuICAgIGNvbnN0IHdvcmtzcGFjZSA9IGdldFdvcmtzcGFjZShob3N0KTtcbiAgICBsZXQgbmV3UHJvamVjdFJvb3QgPSB3b3Jrc3BhY2UubmV3UHJvamVjdFJvb3QgfHwgJ3Byb2plY3RzJztcbiAgICBsZXQgYXBwRGlyID0gYCR7bmV3UHJvamVjdFJvb3R9LyR7b3B0aW9ucy5uYW1lfWA7XG4gICAgbGV0IHNvdXJjZVJvb3QgPSBgJHthcHBEaXJ9L3NyY2A7XG4gICAgbGV0IHNvdXJjZURpciA9IGAke3NvdXJjZVJvb3R9L2FwcGA7XG4gICAgbGV0IHJlbGF0aXZlUGF0aFRvV29ya3NwYWNlUm9vdCA9IGFwcERpci5zcGxpdCgnLycpLm1hcCh4ID0+ICcuLicpLmpvaW4oJy8nKTtcbiAgICBjb25zdCByb290SW5TcmMgPSBvcHRpb25zLnByb2plY3RSb290ICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG9wdGlvbnMucHJvamVjdFJvb3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbmV3UHJvamVjdFJvb3QgPSBvcHRpb25zLnByb2plY3RSb290O1xuICAgICAgYXBwRGlyID0gYCR7bmV3UHJvamVjdFJvb3R9L3NyY2A7XG4gICAgICBzb3VyY2VSb290ID0gYXBwRGlyO1xuICAgICAgc291cmNlRGlyID0gYCR7c291cmNlUm9vdH0vYXBwYDtcbiAgICAgIHJlbGF0aXZlUGF0aFRvV29ya3NwYWNlUm9vdCA9IHJlbGF0aXZlKG5vcm1hbGl6ZSgnLycgKyBzb3VyY2VSb290KSwgbm9ybWFsaXplKCcvJykpO1xuICAgICAgaWYgKHJlbGF0aXZlUGF0aFRvV29ya3NwYWNlUm9vdCA9PT0gJycpIHtcbiAgICAgICAgcmVsYXRpdmVQYXRoVG9Xb3Jrc3BhY2VSb290ID0gJy4nO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB0c0xpbnRSb290ID0gYXBwRGlyO1xuXG4gICAgY29uc3QgZTJlT3B0aW9uczogRTJlT3B0aW9ucyA9IHtcbiAgICAgIG5hbWU6IGAke29wdGlvbnMubmFtZX0tZTJlYCxcbiAgICAgIHJlbGF0ZWRBcHBOYW1lOiBvcHRpb25zLm5hbWUsXG4gICAgICByb290U2VsZWN0b3I6IGFwcFJvb3RTZWxlY3RvcixcbiAgICAgIHByb2plY3RSb290OiBuZXdQcm9qZWN0Um9vdCA/IGAke25ld1Byb2plY3RSb290fS8ke29wdGlvbnMubmFtZX0tZTJlYCA6ICdlMmUnLFxuICAgIH07XG5cbiAgICBjb25zdCBzdHlsZUV4dCA9IHN0eWxlVG9GaWxlRXh0ZW50aW9uKG9wdGlvbnMuc3R5bGUpO1xuXG4gICAgcmV0dXJuIGNoYWluKFtcbiAgICAgIGFkZEFwcFRvV29ya3NwYWNlRmlsZShvcHRpb25zLCB3b3Jrc3BhY2UpLFxuICAgICAgbWVyZ2VXaXRoKFxuICAgICAgICBhcHBseSh1cmwoJy4vZmlsZXMvc3JjJyksIFtcbiAgICAgICAgICBvcHRpb25zLm1pbmltYWwgPyBmaWx0ZXIobWluaW1hbFBhdGhGaWx0ZXIpIDogbm9vcCgpLFxuICAgICAgICAgIGFwcGx5VGVtcGxhdGVzKHtcbiAgICAgICAgICAgIHV0aWxzOiBzdHJpbmdzLFxuICAgICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICAgICdkb3QnOiAnLicsXG4gICAgICAgICAgICByZWxhdGl2ZVBhdGhUb1dvcmtzcGFjZVJvb3QsXG4gICAgICAgICAgICBzdHlsZUV4dCxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBtb3ZlKHNvdXJjZVJvb3QpLFxuICAgICAgICBdKSksXG4gICAgICBtZXJnZVdpdGgoXG4gICAgICAgIGFwcGx5KHVybCgnLi9maWxlcy9yb290JyksIFtcbiAgICAgICAgICBvcHRpb25zLm1pbmltYWwgPyBmaWx0ZXIobWluaW1hbFBhdGhGaWx0ZXIpIDogbm9vcCgpLFxuICAgICAgICAgIGFwcGx5VGVtcGxhdGVzKHtcbiAgICAgICAgICAgIHV0aWxzOiBzdHJpbmdzLFxuICAgICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICAgICdkb3QnOiAnLicsXG4gICAgICAgICAgICByZWxhdGl2ZVBhdGhUb1dvcmtzcGFjZVJvb3QsXG4gICAgICAgICAgICByb290SW5TcmMsXG4gICAgICAgICAgICBhcHBOYW1lOiBvcHRpb25zLm5hbWUsXG4gICAgICAgICAgfSksXG4gICAgICAgICAgbW92ZShhcHBEaXIpLFxuICAgICAgICBdKSksXG4gICAgICBvcHRpb25zLm1pbmltYWwgPyBub29wKCkgOiBtZXJnZVdpdGgoXG4gICAgICAgIGFwcGx5KHVybCgnLi9maWxlcy9saW50JyksIFtcbiAgICAgICAgICBhcHBseVRlbXBsYXRlcyh7XG4gICAgICAgICAgICB1dGlsczogc3RyaW5ncyxcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgICB0c0xpbnRSb290LFxuICAgICAgICAgICAgcmVsYXRpdmVQYXRoVG9Xb3Jrc3BhY2VSb290LFxuICAgICAgICAgICAgcHJlZml4LFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIC8vIFRPRE86IE1vdmluZyBzaG91bGQgd29yayBidXQgaXMgYnVnZ2VkIHJpZ2h0IG5vdy5cbiAgICAgICAgICAvLyBUaGUgX190c0xpbnRSb290X18gaXMgYmVpbmcgdXNlZCBtZWFud2hpbGUuXG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIHRoZSB0c2xpbnQuanNvbiBmaWxlIGNvdWxkIGJlIGluc2lkZSBvZiB0aGUgcm9vdCBmb2xkZXIgYW5kXG4gICAgICAgICAgLy8gdGhpcyBibG9jayBhbmQgdGhlIGxpbnQgZm9sZGVyIGNvdWxkIGJlIHJlbW92ZWQuXG4gICAgICAgIF0pKSxcbiAgICAgIHNjaGVtYXRpYygnbW9kdWxlJywge1xuICAgICAgICBuYW1lOiAnYXBwJyxcbiAgICAgICAgY29tbW9uTW9kdWxlOiBmYWxzZSxcbiAgICAgICAgZmxhdDogdHJ1ZSxcbiAgICAgICAgcm91dGluZzogb3B0aW9ucy5yb3V0aW5nLFxuICAgICAgICByb3V0aW5nU2NvcGU6ICdSb290JyxcbiAgICAgICAgcGF0aDogc291cmNlRGlyLFxuICAgICAgICBwcm9qZWN0OiBvcHRpb25zLm5hbWUsXG4gICAgICB9KSxcbiAgICAgIHNjaGVtYXRpYygnY29tcG9uZW50Jywge1xuICAgICAgICBuYW1lOiAnYXBwJyxcbiAgICAgICAgc2VsZWN0b3I6IGFwcFJvb3RTZWxlY3RvcixcbiAgICAgICAgZmxhdDogdHJ1ZSxcbiAgICAgICAgcGF0aDogc291cmNlRGlyLFxuICAgICAgICBza2lwSW1wb3J0OiB0cnVlLFxuICAgICAgICBwcm9qZWN0OiBvcHRpb25zLm5hbWUsXG4gICAgICAgIC4uLmNvbXBvbmVudE9wdGlvbnMsXG4gICAgICB9KSxcbiAgICAgIG1lcmdlV2l0aChcbiAgICAgICAgYXBwbHkodXJsKCcuL290aGVyLWZpbGVzJyksIFtcbiAgICAgICAgICBjb21wb25lbnRPcHRpb25zLmlubGluZVRlbXBsYXRlXG4gICAgICAgICAgICA/IGZpbHRlcihwYXRoID0+ICFwYXRoLmVuZHNXaXRoKCcuaHRtbC50ZW1wbGF0ZScpKVxuICAgICAgICAgICAgOiBub29wKCksXG4gICAgICAgICAgY29tcG9uZW50T3B0aW9ucy5za2lwVGVzdHNcbiAgICAgICAgICAgID8gZmlsdGVyKHBhdGggPT4gIS9bLnwtXXNwZWMudHMudGVtcGxhdGUkLy50ZXN0KHBhdGgpKVxuICAgICAgICAgICAgOiBub29wKCksXG4gICAgICAgICAgYXBwbHlUZW1wbGF0ZXMoe1xuICAgICAgICAgICAgdXRpbHM6IHN0cmluZ3MsXG4gICAgICAgICAgICAuLi5vcHRpb25zIGFzIGFueSwgIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tYW55XG4gICAgICAgICAgICBzZWxlY3RvcjogYXBwUm9vdFNlbGVjdG9yLFxuICAgICAgICAgICAgLi4uY29tcG9uZW50T3B0aW9ucyxcbiAgICAgICAgICAgIHN0eWxlRXh0LFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIG1vdmUoc291cmNlRGlyKSxcbiAgICAgICAgXSksIE1lcmdlU3RyYXRlZ3kuT3ZlcndyaXRlKSxcbiAgICAgIG9wdGlvbnMubWluaW1hbCA/IG5vb3AoKSA6IHNjaGVtYXRpYygnZTJlJywgZTJlT3B0aW9ucyksXG4gICAgICBvcHRpb25zLmV4cGVyaW1lbnRhbEl2eSA/IGFkZFBvc3RJbnN0YWxsU2NyaXB0KCkgOiBub29wKCksXG4gICAgICBvcHRpb25zLnNraXBQYWNrYWdlSnNvbiA/IG5vb3AoKSA6IGFkZERlcGVuZGVuY2llc1RvUGFja2FnZUpzb24ob3B0aW9ucyksXG4gICAgICBvcHRpb25zLmxpbnRGaXggPyBhcHBseUxpbnRGaXgoc291cmNlRGlyKSA6IG5vb3AoKSxcbiAgICBdKTtcbiAgfTtcbn1cbiJdfQ==