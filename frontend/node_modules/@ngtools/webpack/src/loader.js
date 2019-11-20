"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// TODO: fix typings.
// tslint:disable-next-line:no-global-tslint-disable
// tslint:disable:no-any
const path = require("path");
const angular_compiler_plugin_1 = require("./angular_compiler_plugin");
const benchmark_1 = require("./benchmark");
const sourceMappingUrlRe = /^\/\/# sourceMappingURL=[^\r\n]*/gm;
function ngcLoader() {
    const cb = this.async();
    const sourceFileName = this.resourcePath;
    const timeLabel = `ngcLoader+${sourceFileName}+`;
    if (!cb) {
        throw new Error('This loader needs to support asynchronous webpack compilations.');
    }
    benchmark_1.time(timeLabel);
    const plugin = this._compilation._ngToolsWebpackPluginInstance;
    if (!plugin) {
        throw new Error('The AngularCompilerPlugin was not found. '
            + 'The @ngtools/webpack loader requires the plugin.');
    }
    // We must verify that the plugin is an instance of the right class.
    // Throw an error if it isn't, that often means multiple @ngtools/webpack installs.
    if (!(plugin instanceof angular_compiler_plugin_1.AngularCompilerPlugin) || !plugin.done) {
        throw new Error('Angular Compiler was detected but it was an instance of the wrong class.\n'
            + 'This likely means you have several @ngtools/webpack packages installed. '
            + 'You can check this with `npm ls @ngtools/webpack`, and then remove the extra copies.');
    }
    benchmark_1.time(timeLabel + '.ngcLoader.AngularCompilerPlugin');
    plugin.done
        .then(() => {
        benchmark_1.timeEnd(timeLabel + '.ngcLoader.AngularCompilerPlugin');
        const result = plugin.getCompiledFile(sourceFileName);
        if (result.sourceMap) {
            // Process sourcemaps for Webpack.
            // Remove the sourceMappingURL.
            result.outputText = result.outputText.replace(sourceMappingUrlRe, '');
            // Set the map source to use the full path of the file.
            const sourceMap = JSON.parse(result.sourceMap);
            sourceMap.sources = sourceMap.sources.map((fileName) => {
                return path.join(path.dirname(sourceFileName), fileName);
            });
            result.sourceMap = sourceMap;
        }
        // Manually add the dependencies for TS files.
        // Type only imports will be stripped out by compilation so we need to add them as
        // as dependencies.
        // Component resources files (html and css templates) also need to be added manually for
        // AOT, so that this file is reloaded when they change.
        if (sourceFileName.endsWith('.ts')) {
            result.errorDependencies.forEach(dep => this.addDependency(dep));
            const dependencies = plugin.getDependencies(sourceFileName);
            dependencies
                .filter(d => d.endsWith('index.ts'))
                .forEach(d => dependencies.push(...plugin.getDependencies(d)));
            [...new Set(dependencies)].forEach(dep => {
                plugin.updateChangedFileExtensions(path.extname(dep));
                this.addDependency(dep);
            });
        }
        // NgFactory files depend on the component template, but we can't know what that file
        // is (if any). So we add all the dependencies that the original component file has
        // to the factory as well, which includes html and css templates, and the component
        // itself (for inline html/templates templates).
        const ngFactoryRe = /\.ngfactory.js$/;
        if (ngFactoryRe.test(sourceFileName)) {
            const originalFile = sourceFileName.replace(ngFactoryRe, '.ts');
            this.addDependency(originalFile);
            const origDependencies = plugin.getDependencies(originalFile);
            origDependencies.forEach(dep => this.addDependency(dep));
        }
        // NgStyle files depend on the style file they represent.
        // E.g. `some-style.less.shim.ngstyle.js` depends on `some-style.less`.
        // Those files can in turn depend on others, so we have to add them all.
        const ngStyleRe = /(?:\.shim)?\.ngstyle\.js$/;
        if (ngStyleRe.test(sourceFileName)) {
            const styleFile = sourceFileName.replace(ngStyleRe, '');
            const styleDependencies = plugin.getResourceDependencies(styleFile);
            styleDependencies.forEach(dep => this.addDependency(dep));
        }
        benchmark_1.timeEnd(timeLabel);
        cb(null, result.outputText, result.sourceMap);
    })
        .catch(err => {
        benchmark_1.timeEnd(timeLabel);
        cb(err);
    });
}
exports.ngcLoader = ngcLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9uZ3Rvb2xzL3dlYnBhY2svc3JjL2xvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILHFCQUFxQjtBQUNyQixvREFBb0Q7QUFDcEQsd0JBQXdCO0FBQ3hCLDZCQUE2QjtBQUU3Qix1RUFBa0U7QUFDbEUsMkNBQTRDO0FBRzVDLE1BQU0sa0JBQWtCLEdBQUcsb0NBQW9DLENBQUM7QUFFaEUsU0FBZ0IsU0FBUztJQUN2QixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsTUFBTSxjQUFjLEdBQVcsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUNqRCxNQUFNLFNBQVMsR0FBRyxhQUFhLGNBQWMsR0FBRyxDQUFDO0lBRWpELElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDUCxNQUFNLElBQUksS0FBSyxDQUFDLGlFQUFpRSxDQUFDLENBQUM7S0FDcEY7SUFFRCxnQkFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRWhCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsNkJBQTZCLENBQUM7SUFDL0QsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDO2NBQzNDLGtEQUFrRCxDQUFDLENBQUM7S0FDckU7SUFFRCxvRUFBb0U7SUFDcEUsbUZBQW1GO0lBQ25GLElBQUksQ0FBQyxDQUFDLE1BQU0sWUFBWSwrQ0FBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtRQUM5RCxNQUFNLElBQUksS0FBSyxDQUFDLDRFQUE0RTtjQUN4RiwwRUFBMEU7Y0FDMUUsc0ZBQXNGLENBQ3pGLENBQUM7S0FDSDtJQUVELGdCQUFJLENBQUMsU0FBUyxHQUFHLGtDQUFrQyxDQUFDLENBQUM7SUFDckQsTUFBTSxDQUFDLElBQUk7U0FDUixJQUFJLENBQUMsR0FB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QixHQUFHLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwRSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDM0Q7UUFFRCxtQkFBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsU0FBZ0IsQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNYLG1CQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBM0ZELDhCQTJGQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8vIFRPRE86IGZpeCB0eXBpbmdzLlxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWdsb2JhbC10c2xpbnQtZGlzYWJsZVxuLy8gdHNsaW50OmRpc2FibGU6bm8tYW55XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgbG9hZGVyIH0gZnJvbSAnd2VicGFjayc7XG5pbXBvcnQgeyBBbmd1bGFyQ29tcGlsZXJQbHVnaW4gfSBmcm9tICcuL2FuZ3VsYXJfY29tcGlsZXJfcGx1Z2luJztcbmltcG9ydCB7IHRpbWUsIHRpbWVFbmQgfSBmcm9tICcuL2JlbmNobWFyayc7XG5cblxuY29uc3Qgc291cmNlTWFwcGluZ1VybFJlID0gL15cXC9cXC8jIHNvdXJjZU1hcHBpbmdVUkw9W15cXHJcXG5dKi9nbTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5nY0xvYWRlcih0aGlzOiBsb2FkZXIuTG9hZGVyQ29udGV4dCkge1xuICBjb25zdCBjYiA9IHRoaXMuYXN5bmMoKTtcbiAgY29uc3Qgc291cmNlRmlsZU5hbWU6IHN0cmluZyA9IHRoaXMucmVzb3VyY2VQYXRoO1xuICBjb25zdCB0aW1lTGFiZWwgPSBgbmdjTG9hZGVyKyR7c291cmNlRmlsZU5hbWV9K2A7XG5cbiAgaWYgKCFjYikge1xuICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBsb2FkZXIgbmVlZHMgdG8gc3VwcG9ydCBhc3luY2hyb25vdXMgd2VicGFjayBjb21waWxhdGlvbnMuJyk7XG4gIH1cblxuICB0aW1lKHRpbWVMYWJlbCk7XG5cbiAgY29uc3QgcGx1Z2luID0gdGhpcy5fY29tcGlsYXRpb24uX25nVG9vbHNXZWJwYWNrUGx1Z2luSW5zdGFuY2U7XG4gIGlmICghcGx1Z2luKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgQW5ndWxhckNvbXBpbGVyUGx1Z2luIHdhcyBub3QgZm91bmQuICdcbiAgICAgICAgICAgICAgICAgICsgJ1RoZSBAbmd0b29scy93ZWJwYWNrIGxvYWRlciByZXF1aXJlcyB0aGUgcGx1Z2luLicpO1xuICB9XG5cbiAgLy8gV2UgbXVzdCB2ZXJpZnkgdGhhdCB0aGUgcGx1Z2luIGlzIGFuIGluc3RhbmNlIG9mIHRoZSByaWdodCBjbGFzcy5cbiAgLy8gVGhyb3cgYW4gZXJyb3IgaWYgaXQgaXNuJ3QsIHRoYXQgb2Z0ZW4gbWVhbnMgbXVsdGlwbGUgQG5ndG9vbHMvd2VicGFjayBpbnN0YWxscy5cbiAgaWYgKCEocGx1Z2luIGluc3RhbmNlb2YgQW5ndWxhckNvbXBpbGVyUGx1Z2luKSB8fCAhcGx1Z2luLmRvbmUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FuZ3VsYXIgQ29tcGlsZXIgd2FzIGRldGVjdGVkIGJ1dCBpdCB3YXMgYW4gaW5zdGFuY2Ugb2YgdGhlIHdyb25nIGNsYXNzLlxcbidcbiAgICAgICsgJ1RoaXMgbGlrZWx5IG1lYW5zIHlvdSBoYXZlIHNldmVyYWwgQG5ndG9vbHMvd2VicGFjayBwYWNrYWdlcyBpbnN0YWxsZWQuICdcbiAgICAgICsgJ1lvdSBjYW4gY2hlY2sgdGhpcyB3aXRoIGBucG0gbHMgQG5ndG9vbHMvd2VicGFja2AsIGFuZCB0aGVuIHJlbW92ZSB0aGUgZXh0cmEgY29waWVzLicsXG4gICAgKTtcbiAgfVxuXG4gIHRpbWUodGltZUxhYmVsICsgJy5uZ2NMb2FkZXIuQW5ndWxhckNvbXBpbGVyUGx1Z2luJyk7XG4gIHBsdWdpbi5kb25lXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgdGltZUVuZCh0aW1lTGFiZWwgKyAnLm5nY0xvYWRlci5Bbmd1bGFyQ29tcGlsZXJQbHVnaW4nKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHBsdWdpbi5nZXRDb21waWxlZEZpbGUoc291cmNlRmlsZU5hbWUpO1xuXG4gICAgICBpZiAocmVzdWx0LnNvdXJjZU1hcCkge1xuICAgICAgICAvLyBQcm9jZXNzIHNvdXJjZW1hcHMgZm9yIFdlYnBhY2suXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgc291cmNlTWFwcGluZ1VSTC5cbiAgICAgICAgcmVzdWx0Lm91dHB1dFRleHQgPSByZXN1bHQub3V0cHV0VGV4dC5yZXBsYWNlKHNvdXJjZU1hcHBpbmdVcmxSZSwgJycpO1xuICAgICAgICAvLyBTZXQgdGhlIG1hcCBzb3VyY2UgdG8gdXNlIHRoZSBmdWxsIHBhdGggb2YgdGhlIGZpbGUuXG4gICAgICAgIGNvbnN0IHNvdXJjZU1hcCA9IEpTT04ucGFyc2UocmVzdWx0LnNvdXJjZU1hcCk7XG4gICAgICAgIHNvdXJjZU1hcC5zb3VyY2VzID0gc291cmNlTWFwLnNvdXJjZXMubWFwKChmaWxlTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHBhdGguam9pbihwYXRoLmRpcm5hbWUoc291cmNlRmlsZU5hbWUpLCBmaWxlTmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXN1bHQuc291cmNlTWFwID0gc291cmNlTWFwO1xuICAgICAgfVxuXG4gICAgICAvLyBNYW51YWxseSBhZGQgdGhlIGRlcGVuZGVuY2llcyBmb3IgVFMgZmlsZXMuXG4gICAgICAvLyBUeXBlIG9ubHkgaW1wb3J0cyB3aWxsIGJlIHN0cmlwcGVkIG91dCBieSBjb21waWxhdGlvbiBzbyB3ZSBuZWVkIHRvIGFkZCB0aGVtIGFzXG4gICAgICAvLyBhcyBkZXBlbmRlbmNpZXMuXG4gICAgICAvLyBDb21wb25lbnQgcmVzb3VyY2VzIGZpbGVzIChodG1sIGFuZCBjc3MgdGVtcGxhdGVzKSBhbHNvIG5lZWQgdG8gYmUgYWRkZWQgbWFudWFsbHkgZm9yXG4gICAgICAvLyBBT1QsIHNvIHRoYXQgdGhpcyBmaWxlIGlzIHJlbG9hZGVkIHdoZW4gdGhleSBjaGFuZ2UuXG4gICAgICBpZiAoc291cmNlRmlsZU5hbWUuZW5kc1dpdGgoJy50cycpKSB7XG4gICAgICAgIHJlc3VsdC5lcnJvckRlcGVuZGVuY2llcy5mb3JFYWNoKGRlcCA9PiB0aGlzLmFkZERlcGVuZGVuY3koZGVwKSk7XG4gICAgICAgIGNvbnN0IGRlcGVuZGVuY2llcyA9IHBsdWdpbi5nZXREZXBlbmRlbmNpZXMoc291cmNlRmlsZU5hbWUpO1xuICAgICAgICBkZXBlbmRlbmNpZXNcbiAgICAgICAgICAuZmlsdGVyKGQgPT4gZC5lbmRzV2l0aCgnaW5kZXgudHMnKSlcbiAgICAgICAgICAuZm9yRWFjaChkID0+IGRlcGVuZGVuY2llcy5wdXNoKC4uLnBsdWdpbi5nZXREZXBlbmRlbmNpZXMoZCkpKTtcblxuICAgICAgICBbLi4ubmV3IFNldChkZXBlbmRlbmNpZXMpXS5mb3JFYWNoKGRlcCA9PiB7XG4gICAgICAgICAgcGx1Z2luLnVwZGF0ZUNoYW5nZWRGaWxlRXh0ZW5zaW9ucyhwYXRoLmV4dG5hbWUoZGVwKSk7XG4gICAgICAgICAgdGhpcy5hZGREZXBlbmRlbmN5KGRlcCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBOZ0ZhY3RvcnkgZmlsZXMgZGVwZW5kIG9uIHRoZSBjb21wb25lbnQgdGVtcGxhdGUsIGJ1dCB3ZSBjYW4ndCBrbm93IHdoYXQgdGhhdCBmaWxlXG4gICAgICAvLyBpcyAoaWYgYW55KS4gU28gd2UgYWRkIGFsbCB0aGUgZGVwZW5kZW5jaWVzIHRoYXQgdGhlIG9yaWdpbmFsIGNvbXBvbmVudCBmaWxlIGhhc1xuICAgICAgLy8gdG8gdGhlIGZhY3RvcnkgYXMgd2VsbCwgd2hpY2ggaW5jbHVkZXMgaHRtbCBhbmQgY3NzIHRlbXBsYXRlcywgYW5kIHRoZSBjb21wb25lbnRcbiAgICAgIC8vIGl0c2VsZiAoZm9yIGlubGluZSBodG1sL3RlbXBsYXRlcyB0ZW1wbGF0ZXMpLlxuICAgICAgY29uc3QgbmdGYWN0b3J5UmUgPSAvXFwubmdmYWN0b3J5LmpzJC87XG4gICAgICBpZiAobmdGYWN0b3J5UmUudGVzdChzb3VyY2VGaWxlTmFtZSkpIHtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxGaWxlID0gc291cmNlRmlsZU5hbWUucmVwbGFjZShuZ0ZhY3RvcnlSZSwgJy50cycpO1xuICAgICAgICB0aGlzLmFkZERlcGVuZGVuY3kob3JpZ2luYWxGaWxlKTtcbiAgICAgICAgY29uc3Qgb3JpZ0RlcGVuZGVuY2llcyA9IHBsdWdpbi5nZXREZXBlbmRlbmNpZXMob3JpZ2luYWxGaWxlKTtcbiAgICAgICAgb3JpZ0RlcGVuZGVuY2llcy5mb3JFYWNoKGRlcCA9PiB0aGlzLmFkZERlcGVuZGVuY3koZGVwKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIE5nU3R5bGUgZmlsZXMgZGVwZW5kIG9uIHRoZSBzdHlsZSBmaWxlIHRoZXkgcmVwcmVzZW50LlxuICAgICAgLy8gRS5nLiBgc29tZS1zdHlsZS5sZXNzLnNoaW0ubmdzdHlsZS5qc2AgZGVwZW5kcyBvbiBgc29tZS1zdHlsZS5sZXNzYC5cbiAgICAgIC8vIFRob3NlIGZpbGVzIGNhbiBpbiB0dXJuIGRlcGVuZCBvbiBvdGhlcnMsIHNvIHdlIGhhdmUgdG8gYWRkIHRoZW0gYWxsLlxuICAgICAgY29uc3QgbmdTdHlsZVJlID0gLyg/OlxcLnNoaW0pP1xcLm5nc3R5bGVcXC5qcyQvO1xuICAgICAgaWYgKG5nU3R5bGVSZS50ZXN0KHNvdXJjZUZpbGVOYW1lKSkge1xuICAgICAgICBjb25zdCBzdHlsZUZpbGUgPSBzb3VyY2VGaWxlTmFtZS5yZXBsYWNlKG5nU3R5bGVSZSwgJycpO1xuICAgICAgICBjb25zdCBzdHlsZURlcGVuZGVuY2llcyA9IHBsdWdpbi5nZXRSZXNvdXJjZURlcGVuZGVuY2llcyhzdHlsZUZpbGUpO1xuICAgICAgICBzdHlsZURlcGVuZGVuY2llcy5mb3JFYWNoKGRlcCA9PiB0aGlzLmFkZERlcGVuZGVuY3koZGVwKSk7XG4gICAgICB9XG5cbiAgICAgIHRpbWVFbmQodGltZUxhYmVsKTtcbiAgICAgIGNiKG51bGwsIHJlc3VsdC5vdXRwdXRUZXh0LCByZXN1bHQuc291cmNlTWFwIGFzIGFueSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgIHRpbWVFbmQodGltZUxhYmVsKTtcbiAgICAgIGNiKGVycik7XG4gICAgfSk7XG59XG4iXX0=