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
const config_1 = require("../utility/config");
const dependencies_1 = require("../utility/dependencies");
const latest_versions_1 = require("../utility/latest-versions");
const lint_fix_1 = require("../utility/lint-fix");
const validation_1 = require("../utility/validation");
const workspace_models_1 = require("../utility/workspace-models");
function updateJsonFile(host, path, callback) {
    const source = host.read(path);
    if (source) {
        const sourceText = source.toString('utf-8');
        const json = core_1.parseJson(sourceText, core_1.JsonParseMode.Loose);
        callback(json);
        host.overwrite(path, JSON.stringify(json, null, 2));
    }
    return host;
}
function updateTsConfig(packageName, distRoot) {
    return (host) => {
        if (!host.exists('tsconfig.json')) {
            return host;
        }
        return updateJsonFile(host, 'tsconfig.json', (tsconfig) => {
            if (!tsconfig.compilerOptions.paths) {
                tsconfig.compilerOptions.paths = {};
            }
            if (!tsconfig.compilerOptions.paths[packageName]) {
                tsconfig.compilerOptions.paths[packageName] = [];
            }
            tsconfig.compilerOptions.paths[packageName].push(distRoot);
            // deep import & secondary entrypoint support
            const deepPackagePath = packageName + '/*';
            if (!tsconfig.compilerOptions.paths[deepPackagePath]) {
                tsconfig.compilerOptions.paths[deepPackagePath] = [];
            }
            tsconfig.compilerOptions.paths[deepPackagePath].push(distRoot + '/*');
        });
    };
}
function addDependenciesToPackageJson() {
    return (host) => {
        [
            {
                type: dependencies_1.NodeDependencyType.Dev,
                name: '@angular/compiler-cli',
                version: latest_versions_1.latestVersions.Angular,
            },
            {
                type: dependencies_1.NodeDependencyType.Dev,
                name: '@angular-devkit/build-ng-packagr',
                version: latest_versions_1.latestVersions.DevkitBuildNgPackagr,
            },
            {
                type: dependencies_1.NodeDependencyType.Dev,
                name: '@angular-devkit/build-angular',
                version: latest_versions_1.latestVersions.DevkitBuildNgPackagr,
            },
            {
                type: dependencies_1.NodeDependencyType.Dev,
                name: 'ng-packagr',
                version: '^4.2.0',
            },
            {
                type: dependencies_1.NodeDependencyType.Dev,
                name: 'tsickle',
                version: '>=0.34.0',
            },
            {
                type: dependencies_1.NodeDependencyType.Dev,
                name: 'tslib',
                version: latest_versions_1.latestVersions.TsLib,
            },
            {
                type: dependencies_1.NodeDependencyType.Dev,
                name: 'typescript',
                version: latest_versions_1.latestVersions.TypeScript,
            },
        ].forEach(dependency => dependencies_1.addPackageJsonDependency(host, dependency));
        return host;
    };
}
function addAppToWorkspaceFile(options, workspace, projectRoot, projectName) {
    const project = {
        root: projectRoot,
        sourceRoot: `${projectRoot}/src`,
        projectType: workspace_models_1.ProjectType.Library,
        prefix: options.prefix || 'lib',
        architect: {
            build: {
                builder: workspace_models_1.Builders.NgPackagr,
                options: {
                    tsConfig: `${projectRoot}/tsconfig.lib.json`,
                    project: `${projectRoot}/ng-package.json`,
                },
            },
            test: {
                builder: workspace_models_1.Builders.Karma,
                options: {
                    main: `${projectRoot}/src/test.ts`,
                    tsConfig: `${projectRoot}/tsconfig.spec.json`,
                    karmaConfig: `${projectRoot}/karma.conf.js`,
                },
            },
            lint: {
                builder: workspace_models_1.Builders.TsLint,
                options: {
                    tsConfig: [
                        `${projectRoot}/tsconfig.lib.json`,
                        `${projectRoot}/tsconfig.spec.json`,
                    ],
                    exclude: [
                        '**/node_modules/**',
                    ],
                },
            },
        },
    };
    return config_1.addProjectToWorkspace(workspace, projectName, project);
}
function default_1(options) {
    return (host, context) => {
        if (!options.name) {
            throw new schematics_1.SchematicsException(`Invalid options, "name" is required.`);
        }
        const prefix = options.prefix || 'lib';
        validation_1.validateProjectName(options.name);
        // If scoped project (i.e. "@foo/bar"), convert projectDir to "foo/bar".
        const projectName = options.name;
        const packageName = core_1.strings.dasherize(projectName);
        let scopeName = null;
        if (/^@.*\/.*/.test(options.name)) {
            const [scope, name] = options.name.split('/');
            scopeName = scope.replace(/^@/, '');
            options.name = name;
        }
        const workspace = config_1.getWorkspace(host);
        const newProjectRoot = workspace.newProjectRoot || 'projects';
        const scopeFolder = scopeName ? core_1.strings.dasherize(scopeName) + '/' : '';
        const folderName = `${scopeFolder}${core_1.strings.dasherize(options.name)}`;
        const projectRoot = `${newProjectRoot}/${folderName}`;
        const distRoot = `dist/${folderName}`;
        const sourceDir = `${projectRoot}/src/lib`;
        const relativePathToWorkspaceRoot = projectRoot.split('/').map(x => '..').join('/');
        const templateSource = schematics_1.apply(schematics_1.url('./files'), [
            schematics_1.applyTemplates(Object.assign({}, core_1.strings, options, { packageName,
                projectRoot,
                distRoot,
                relativePathToWorkspaceRoot,
                prefix, angularLatestVersion: latest_versions_1.latestVersions.Angular.replace('~', '').replace('^', ''), folderName })),
            schematics_1.move(projectRoot),
        ]);
        return schematics_1.chain([
            schematics_1.mergeWith(templateSource),
            addAppToWorkspaceFile(options, workspace, projectRoot, projectName),
            options.skipPackageJson ? schematics_1.noop() : addDependenciesToPackageJson(),
            options.skipTsConfig ? schematics_1.noop() : updateTsConfig(packageName, distRoot),
            schematics_1.schematic('module', {
                name: options.name,
                commonModule: false,
                flat: true,
                path: sourceDir,
                project: options.name,
            }),
            schematics_1.schematic('component', {
                name: options.name,
                selector: `${prefix}-${options.name}`,
                inlineStyle: true,
                inlineTemplate: true,
                flat: true,
                path: sourceDir,
                export: true,
                project: options.name,
            }),
            schematics_1.schematic('service', {
                name: options.name,
                flat: true,
                path: sourceDir,
                project: options.name,
            }),
            options.lintFix ? lint_fix_1.applyLintFix(sourceDir) : schematics_1.noop(),
            (_tree, context) => {
                if (!options.skipPackageJson && !options.skipInstall) {
                    context.addTask(new tasks_1.NodePackageInstallTask());
                }
            },
        ]);
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL3NjaGVtYXRpY3MvYW5ndWxhci9saWJyYXJ5L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsK0NBQXlFO0FBQ3pFLDJEQWFvQztBQUNwQyw0REFBMEU7QUFDMUUsOENBRzJCO0FBQzNCLDBEQUF1RjtBQUN2RixnRUFBNEQ7QUFDNUQsa0RBQW1EO0FBQ25ELHNEQUE0RDtBQUM1RCxrRUFLcUM7QUFnQnJDLFNBQVMsY0FBYyxDQUFJLElBQVUsRUFBRSxJQUFZLEVBQUUsUUFBeUI7SUFDNUUsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixJQUFJLE1BQU0sRUFBRTtRQUNWLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsTUFBTSxJQUFJLEdBQUcsZ0JBQVMsQ0FBQyxVQUFVLEVBQUUsb0JBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RCxRQUFRLENBQUMsSUFBZSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDckQ7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxTQUFTLGNBQWMsQ0FBQyxXQUFtQixFQUFFLFFBQWdCO0lBRTNELE9BQU8sQ0FBQyxJQUFVLEVBQUUsRUFBRTtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDO1NBQUU7UUFFbkQsT0FBTyxjQUFjLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRSxDQUFDLFFBQTZCLEVBQUUsRUFBRTtZQUM3RSxJQUFJLENBQUMsUUFB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SUFBSTtnQkFDbEIsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJO2FBQ3RCLENBQUM7WUFDRixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyx1QkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBSSxFQUFFO1lBQ2xELENBQUMsS0FBVyxFQUFFLE9BQXlCLEVBQUUsRUFBRTtnQkFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO29CQUNwRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksOEJBQXNCLEVBQUUsQ0FBQyxDQUFDO2lCQUMvQztZQUNILENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7QUFDSixDQUFDO0FBakZELDRCQWlGQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEpzb25QYXJzZU1vZGUsIHBhcnNlSnNvbiwgc3RyaW5ncyB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7XG4gIFJ1bGUsXG4gIFNjaGVtYXRpY0NvbnRleHQsXG4gIFNjaGVtYXRpY3NFeGNlcHRpb24sXG4gIFRyZWUsXG4gIGFwcGx5LFxuICBhcHBseVRlbXBsYXRlcyxcbiAgY2hhaW4sXG4gIG1lcmdlV2l0aCxcbiAgbW92ZSxcbiAgbm9vcCxcbiAgc2NoZW1hdGljLFxuICB1cmwsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7IE5vZGVQYWNrYWdlSW5zdGFsbFRhc2sgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcy90YXNrcyc7XG5pbXBvcnQge1xuICBhZGRQcm9qZWN0VG9Xb3Jrc3BhY2UsXG4gIGdldFdvcmtzcGFjZSxcbn0gZnJvbSAnLi4vdXRpbGl0eS9jb25maWcnO1xuaW1wb3J0IHsgTm9kZURlcGVuZGVuY3lUeXBlLCBhZGRQYWNrYWdlSnNvbkRlcGVuZGVuY3kgfSBmcm9tICcuLi91dGlsaXR5L2RlcGVuZGVuY2llcyc7XG5pbXBvcnQgeyBsYXRlc3RWZXJzaW9ucyB9IGZyb20gJy4uL3V0aWxpdHkvbGF0ZXN0LXZlcnNpb25zJztcbmltcG9ydCB7IGFwcGx5TGludEZpeCB9IGZyb20gJy4uL3V0aWxpdHkvbGludC1maXgnO1xuaW1wb3J0IHsgdmFsaWRhdGVQcm9qZWN0TmFtZSB9IGZyb20gJy4uL3V0aWxpdHkvdmFsaWRhdGlvbic7XG5pbXBvcnQge1xuICBCdWlsZGVycyxcbiAgUHJvamVjdFR5cGUsXG4gIFdvcmtzcGFjZVByb2plY3QsXG4gIFdvcmtzcGFjZVNjaGVtYSxcbn0gZnJvbSAnLi4vdXRpbGl0eS93b3Jrc3BhY2UtbW9kZWxzJztcbmltcG9ydCB7IFNjaGVtYSBhcyBMaWJyYXJ5T3B0aW9ucyB9IGZyb20gJy4vc2NoZW1hJztcblxuaW50ZXJmYWNlIFVwZGF0ZUpzb25GbjxUPiB7XG4gIChvYmo6IFQpOiBUIHwgdm9pZDtcbn1cblxudHlwZSBUc0NvbmZpZ1BhcnRpYWxUeXBlID0ge1xuICBjb21waWxlck9wdGlvbnM6IHtcbiAgICBiYXNlVXJsOiBzdHJpbmcsXG4gICAgcGF0aHM6IHtcbiAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZ1tdO1xuICAgIH0sXG4gIH0sXG59O1xuXG5mdW5jdGlvbiB1cGRhdGVKc29uRmlsZTxUPihob3N0OiBUcmVlLCBwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBVcGRhdGVKc29uRm48VD4pOiBUcmVlIHtcbiAgY29uc3Qgc291cmNlID0gaG9zdC5yZWFkKHBhdGgpO1xuICBpZiAoc291cmNlKSB7XG4gICAgY29uc3Qgc291cmNlVGV4dCA9IHNvdXJjZS50b1N0cmluZygndXRmLTgnKTtcbiAgICBjb25zdCBqc29uID0gcGFyc2VKc29uKHNvdXJjZVRleHQsIEpzb25QYXJzZU1vZGUuTG9vc2UpO1xuICAgIGNhbGxiYWNrKGpzb24gYXMge30gYXMgVCk7XG4gICAgaG9zdC5vdmVyd3JpdGUocGF0aCwgSlNPTi5zdHJpbmdpZnkoanNvbiwgbnVsbCwgMikpO1xuICB9XG5cbiAgcmV0dXJuIGhvc3Q7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRzQ29uZmlnKHBhY2thZ2VOYW1lOiBzdHJpbmcsIGRpc3RSb290OiBzdHJpbmcpIHtcblxuICByZXR1cm4gKGhvc3Q6IFRyZWUpID0+IHtcbiAgICBpZiAoIWhvc3QuZXhpc3RzKCd0c2NvbmZpZy5qc29uJykpIHsgcmV0dXJuIGhvc3Q7IH1cblxuICAgIHJldHVybiB1cGRhdGVKc29uRmlsZShob3N0LCAndHNjb25maWcuanNvbicsICh0c2NvbmZpZzogVHNDb25maWdQYXJ0aWFsVHlwZSkgPT4ge1xuICAgICAgaWYgKCF0c2NvbmZpZy5jb21waWxlck9wdGlvbnMucGF0aHMpIHtcbiAgICAgICAgdHNjb25maWcuY29tcGlsZXJPcHRpb25zLnBhdGhzID0ge307XG4gICAgICB9XG4gICAgICBpZiAoIXRzY29uZmlnLmNvbXBpbGVyT3B0aW9ucy5wYXRoc1twYWNrYWdlTmFtZV0pIHtcbiAgICAgICAgdHNjb25maWcuY29tcGlsZXJPcHRpb25zLnBhdGhzW3BhY2thZ2VOYW1lXSA9IFtdO1xuICAgICAgfVxuICAgICAgdHNjb25maWcuY29tcGlsZXJPcHRpb25zLnBhdGhzW3BhY2thZ2VOYW1lXS5wdXNoKGRpc3RSb290KTtcblxuICAgICAgLy8gZGVlcCBpbXBvcnQgJiBzZWNvbmRhcnkgZW50cnlwb2ludCBzdXBwb3J0XG4gICAgICBjb25zdCBkZWVwUGFja2FnZVBhdGggPSBwYWNrYWdlTmFtZSArICcvKic7XG4gICAgICBpZiAoIXRzY29uZmlnLmNvbXBpbGVyT3B0aW9ucy5wYXRoc1tkZWVwUGFja2FnZVBhdGhdKSB7XG4gICAgICAgIHRzY29uZmlnLmNvbXBpbGVyT3B0aW9ucy5wYXRoc1tkZWVwUGFja2FnZVBhdGhdID0gW107XG4gICAgICB9XG4gICAgICB0c2NvbmZpZy5jb21waWxlck9wdGlvbnMucGF0aHNbZGVlcFBhY2thZ2VQYXRoXS5wdXNoKGRpc3RSb290ICsgJy8qJyk7XG4gICAgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGFkZERlcGVuZGVuY2llc1RvUGFja2FnZUpzb24oKSB7XG5cbiAgcmV0dXJuIChob3N0OiBUcmVlKSA9PiB7XG4gICAgW1xuICAgICAge1xuICAgICAgICB0eXBlOiBOb2RlRGVwZW5kZW5jeVR5cGUuRGV2LFxuICAgICAgICBuYW1lOiAnQGFuZ3VsYXIvY29tcGlsZXItY2xpJyxcbiAgICAgICAgdmVyc2lvbjogbGF0ZXN0VmVyc2lvbnMuQW5ndWxhcixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6IE5vZGVEZXBlbmRlbmN5VHlwZS5EZXYsXG4gICAgICAgIG5hbWU6ICdAYW5ndWxhci1kZXZraXQvYnVpbGQtbmctcGFja2FncicsXG4gICAgICAgIHZlcnNpb246IGxhdGVzdFZlcnNpb25zLkRldmtpdEJ1aWxkTmdQYWNrYWdyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogTm9kZURlcGVuZGVuY3lUeXBlLkRldixcbiAgICAgICAgbmFtZTogJ0Bhbmd1bGFyLWRldmtpdC9idWlsZC1hbmd1bGFyJyxcbiAgICAgICAgdmVyc2lvbjogbGF0ZXN0VmVyc2lvbnMuRGV2a2l0QnVpbGROZ1BhY2thZ3IsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBOb2RlRGVwZW5kZW5jeVR5cGUuRGV2LFxuICAgICAgICBuYW1lOiAnbmctcGFja2FncicsXG4gICAgICAgIHZlcnNpb246ICdeNC4yLjAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogTm9kZURlcGVuZGVuY3lUeXBlLkRldixcbiAgICAgICAgbmFtZTogJ3RzaWNrbGUnLFxuICAgICAgICB2ZXJzaW9uOiAnPj0wLjM0LjAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogTm9kZURlcGVuZGVuY3lUeXBlLkRldixcbiAgICAgICAgbmFtZTogJ3RzbGliJyxcbiAgICAgICAgdmVyc2lvbjogbGF0ZXN0VmVyc2lvbnMuVHNMaWIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBOb2RlRGVwZW5kZW5jeVR5cGUuRGV2LFxuICAgICAgICBuYW1lOiAndHlwZXNjcmlwdCcsXG4gICAgICAgIHZlcnNpb246IGxhdGVzdFZlcnNpb25zLlR5cGVTY3JpcHQsXG4gICAgICB9LFxuICAgIF0uZm9yRWFjaChkZXBlbmRlbmN5ID0+IGFkZFBhY2thZ2VKc29uRGVwZW5kZW5jeShob3N0LCBkZXBlbmRlbmN5KSk7XG5cbiAgICByZXR1cm4gaG9zdDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYWRkQXBwVG9Xb3Jrc3BhY2VGaWxlKG9wdGlvbnM6IExpYnJhcnlPcHRpb25zLCB3b3Jrc3BhY2U6IFdvcmtzcGFjZVNjaGVtYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0Um9vdDogc3RyaW5nLCBwcm9qZWN0TmFtZTogc3RyaW5nKTogUnVsZSB7XG5cbiAgY29uc3QgcHJvamVjdDogV29ya3NwYWNlUHJvamVjdDxQcm9qZWN0VHlwZS5MaWJyYXJ5PiA9IHtcbiAgICByb290OiBwcm9qZWN0Um9vdCxcbiAgICBzb3VyY2VSb290OiBgJHtwcm9qZWN0Um9vdH0vc3JjYCxcbiAgICBwcm9qZWN0VHlwZTogUHJvamVjdFR5cGUuTGlicmFyeSxcbiAgICBwcmVmaXg6IG9wdGlvbnMucHJlZml4IHx8ICdsaWInLFxuICAgIGFyY2hpdGVjdDoge1xuICAgICAgYnVpbGQ6IHtcbiAgICAgICAgYnVpbGRlcjogQnVpbGRlcnMuTmdQYWNrYWdyLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgdHNDb25maWc6IGAke3Byb2plY3RSb290fS90c2NvbmZpZy5saWIuanNvbmAsXG4gICAgICAgICAgcHJvamVjdDogYCR7cHJvamVjdFJvb3R9L25nLXBhY2thZ2UuanNvbmAsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgdGVzdDoge1xuICAgICAgICBidWlsZGVyOiBCdWlsZGVycy5LYXJtYSxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIG1haW46IGAke3Byb2plY3RSb290fS9zcmMvdGVzdC50c2AsXG4gICAgICAgICAgdHNDb25maWc6IGAke3Byb2plY3RSb290fS90c2NvbmZpZy5zcGVjLmpzb25gLFxuICAgICAgICAgIGthcm1hQ29uZmlnOiBgJHtwcm9qZWN0Um9vdH0va2FybWEuY29uZi5qc2AsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgbGludDoge1xuICAgICAgICBidWlsZGVyOiBCdWlsZGVycy5Uc0xpbnQsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICB0c0NvbmZpZzogW1xuICAgICAgICAgICAgYCR7cHJvamVjdFJvb3R9L3RzY29uZmlnLmxpYi5qc29uYCxcbiAgICAgICAgICAgIGAke3Byb2plY3RSb290fS90c2NvbmZpZy5zcGVjLmpzb25gLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgZXhjbHVkZTogW1xuICAgICAgICAgICAgJyoqL25vZGVfbW9kdWxlcy8qKicsXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4gYWRkUHJvamVjdFRvV29ya3NwYWNlKHdvcmtzcGFjZSwgcHJvamVjdE5hbWUsIHByb2plY3QpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob3B0aW9uczogTGlicmFyeU9wdGlvbnMpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgaWYgKCFvcHRpb25zLm5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKGBJbnZhbGlkIG9wdGlvbnMsIFwibmFtZVwiIGlzIHJlcXVpcmVkLmApO1xuICAgIH1cbiAgICBjb25zdCBwcmVmaXggPSBvcHRpb25zLnByZWZpeCB8fCAnbGliJztcblxuICAgIHZhbGlkYXRlUHJvamVjdE5hbWUob3B0aW9ucy5uYW1lKTtcblxuICAgIC8vIElmIHNjb3BlZCBwcm9qZWN0IChpLmUuIFwiQGZvby9iYXJcIiksIGNvbnZlcnQgcHJvamVjdERpciB0byBcImZvby9iYXJcIi5cbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IG9wdGlvbnMubmFtZTtcbiAgICBjb25zdCBwYWNrYWdlTmFtZSA9IHN0cmluZ3MuZGFzaGVyaXplKHByb2plY3ROYW1lKTtcbiAgICBsZXQgc2NvcGVOYW1lID0gbnVsbDtcbiAgICBpZiAoL15ALipcXC8uKi8udGVzdChvcHRpb25zLm5hbWUpKSB7XG4gICAgICBjb25zdCBbc2NvcGUsIG5hbWVdID0gb3B0aW9ucy5uYW1lLnNwbGl0KCcvJyk7XG4gICAgICBzY29wZU5hbWUgPSBzY29wZS5yZXBsYWNlKC9eQC8sICcnKTtcbiAgICAgIG9wdGlvbnMubmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgY29uc3Qgd29ya3NwYWNlID0gZ2V0V29ya3NwYWNlKGhvc3QpO1xuICAgIGNvbnN0IG5ld1Byb2plY3RSb290ID0gd29ya3NwYWNlLm5ld1Byb2plY3RSb290IHx8ICdwcm9qZWN0cyc7XG5cbiAgICBjb25zdCBzY29wZUZvbGRlciA9IHNjb3BlTmFtZSA/IHN0cmluZ3MuZGFzaGVyaXplKHNjb3BlTmFtZSkgKyAnLycgOiAnJztcbiAgICBjb25zdCBmb2xkZXJOYW1lID0gYCR7c2NvcGVGb2xkZXJ9JHtzdHJpbmdzLmRhc2hlcml6ZShvcHRpb25zLm5hbWUpfWA7XG4gICAgY29uc3QgcHJvamVjdFJvb3QgPSBgJHtuZXdQcm9qZWN0Um9vdH0vJHtmb2xkZXJOYW1lfWA7XG4gICAgY29uc3QgZGlzdFJvb3QgPSBgZGlzdC8ke2ZvbGRlck5hbWV9YDtcblxuICAgIGNvbnN0IHNvdXJjZURpciA9IGAke3Byb2plY3RSb290fS9zcmMvbGliYDtcbiAgICBjb25zdCByZWxhdGl2ZVBhdGhUb1dvcmtzcGFjZVJvb3QgPSBwcm9qZWN0Um9vdC5zcGxpdCgnLycpLm1hcCh4ID0+ICcuLicpLmpvaW4oJy8nKTtcblxuICAgIGNvbnN0IHRlbXBsYXRlU291cmNlID0gYXBwbHkodXJsKCcuL2ZpbGVzJyksIFtcbiAgICAgIGFwcGx5VGVtcGxhdGVzKHtcbiAgICAgICAgLi4uc3RyaW5ncyxcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgcGFja2FnZU5hbWUsXG4gICAgICAgIHByb2plY3RSb290LFxuICAgICAgICBkaXN0Um9vdCxcbiAgICAgICAgcmVsYXRpdmVQYXRoVG9Xb3Jrc3BhY2VSb290LFxuICAgICAgICBwcmVmaXgsXG4gICAgICAgIGFuZ3VsYXJMYXRlc3RWZXJzaW9uOiBsYXRlc3RWZXJzaW9ucy5Bbmd1bGFyLnJlcGxhY2UoJ34nLCAnJykucmVwbGFjZSgnXicsICcnKSxcbiAgICAgICAgZm9sZGVyTmFtZSxcbiAgICAgIH0pLFxuICAgICAgbW92ZShwcm9qZWN0Um9vdCksXG4gICAgXSk7XG5cbiAgICByZXR1cm4gY2hhaW4oW1xuICAgICAgbWVyZ2VXaXRoKHRlbXBsYXRlU291cmNlKSxcbiAgICAgIGFkZEFwcFRvV29ya3NwYWNlRmlsZShvcHRpb25zLCB3b3Jrc3BhY2UsIHByb2plY3RSb290LCBwcm9qZWN0TmFtZSksXG4gICAgICBvcHRpb25zLnNraXBQYWNrYWdlSnNvbiA/IG5vb3AoKSA6IGFkZERlcGVuZGVuY2llc1RvUGFja2FnZUpzb24oKSxcbiAgICAgIG9wdGlvbnMuc2tpcFRzQ29uZmlnID8gbm9vcCgpIDogdXBkYXRlVHNDb25maWcocGFja2FnZU5hbWUsIGRpc3RSb290KSxcbiAgICAgIHNjaGVtYXRpYygnbW9kdWxlJywge1xuICAgICAgICBuYW1lOiBvcHRpb25zLm5hbWUsXG4gICAgICAgIGNvbW1vbk1vZHVsZTogZmFsc2UsXG4gICAgICAgIGZsYXQ6IHRydWUsXG4gICAgICAgIHBhdGg6IHNvdXJjZURpcixcbiAgICAgICAgcHJvamVjdDogb3B0aW9ucy5uYW1lLFxuICAgICAgfSksXG4gICAgICBzY2hlbWF0aWMoJ2NvbXBvbmVudCcsIHtcbiAgICAgICAgbmFtZTogb3B0aW9ucy5uYW1lLFxuICAgICAgICBzZWxlY3RvcjogYCR7cHJlZml4fS0ke29wdGlvbnMubmFtZX1gLFxuICAgICAgICBpbmxpbmVTdHlsZTogdHJ1ZSxcbiAgICAgICAgaW5saW5lVGVtcGxhdGU6IHRydWUsXG4gICAgICAgIGZsYXQ6IHRydWUsXG4gICAgICAgIHBhdGg6IHNvdXJjZURpcixcbiAgICAgICAgZXhwb3J0OiB0cnVlLFxuICAgICAgICBwcm9qZWN0OiBvcHRpb25zLm5hbWUsXG4gICAgICB9KSxcbiAgICAgIHNjaGVtYXRpYygnc2VydmljZScsIHtcbiAgICAgICAgbmFtZTogb3B0aW9ucy5uYW1lLFxuICAgICAgICBmbGF0OiB0cnVlLFxuICAgICAgICBwYXRoOiBzb3VyY2VEaXIsXG4gICAgICAgIHByb2plY3Q6IG9wdGlvbnMubmFtZSxcbiAgICAgIH0pLFxuICAgICAgb3B0aW9ucy5saW50Rml4ID8gYXBwbHlMaW50Rml4KHNvdXJjZURpcikgOiBub29wKCksXG4gICAgICAoX3RyZWU6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICAgICAgaWYgKCFvcHRpb25zLnNraXBQYWNrYWdlSnNvbiAmJiAhb3B0aW9ucy5za2lwSW5zdGFsbCkge1xuICAgICAgICAgIGNvbnRleHQuYWRkVGFzayhuZXcgTm9kZVBhY2thZ2VJbnN0YWxsVGFzaygpKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICBdKTtcbiAgfTtcbn1cbiJdfQ==