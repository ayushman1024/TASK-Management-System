"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const exception_1 = require("../exception");
class InvalidPathException extends exception_1.BaseException {
    constructor(path) { super(`Path ${JSON.stringify(path)} is invalid.`); }
}
exports.InvalidPathException = InvalidPathException;
class PathMustBeAbsoluteException extends exception_1.BaseException {
    constructor(path) { super(`Path ${JSON.stringify(path)} must be absolute.`); }
}
exports.PathMustBeAbsoluteException = PathMustBeAbsoluteException;
class PathCannotBeFragmentException extends exception_1.BaseException {
    constructor(path) { super(`Path ${JSON.stringify(path)} cannot be made a fragment.`); }
}
exports.PathCannotBeFragmentException = PathCannotBeFragmentException;
/**
 * The Separator for normalized path.
 * @type {Path}
 */
exports.NormalizedSep = '/';
/**
 * The root of a normalized path.
 * @type {Path}
 */
exports.NormalizedRoot = exports.NormalizedSep;
/**
 * Split a path into multiple path fragments. Each fragments except the last one will end with
 * a path separator.
 * @param {Path} path The path to split.
 * @returns {Path[]} An array of path fragments.
 */
function split(path) {
    const fragments = path.split(exports.NormalizedSep).map(x => fragment(x));
    if (fragments[fragments.length - 1].length === 0) {
        fragments.pop();
    }
    return fragments;
}
exports.split = split;
/**
 *
 */
function extname(path) {
    const base = basename(path);
    const i = base.lastIndexOf('.');
    if (i < 1) {
        return '';
    }
    else {
        return base.substr(i);
    }
}
exports.extname = extname;
/**
 * Return the basename of the path, as a Path. See path.basename
 */
function basename(path) {
    const i = path.lastIndexOf(exports.NormalizedSep);
    if (i == -1) {
        return fragment(path);
    }
    else {
        return fragment(path.substr(path.lastIndexOf(exports.NormalizedSep) + 1));
    }
}
exports.basename = basename;
/**
 * Return the dirname of the path, as a Path. See path.dirname
 */
function dirname(path) {
    const index = path.lastIndexOf(exports.NormalizedSep);
    if (index === -1) {
        return '';
    }
    const endIndex = index === 0 ? 1 : index; // case of file under root: '/file'
    return normalize(path.substr(0, endIndex));
}
exports.dirname = dirname;
/**
 * Join multiple paths together, and normalize the result. Accepts strings that will be
 * normalized as well (but the original must be a path).
 */
function join(p1, ...others) {
    if (others.length > 0) {
        return normalize((p1 ? p1 + exports.NormalizedSep : '') + others.join(exports.NormalizedSep));
    }
    else {
        return p1;
    }
}
exports.join = join;
/**
 * Returns true if a path is absolute.
 */
function isAbsolute(p) {
    return p.startsWith(exports.NormalizedSep);
}
exports.isAbsolute = isAbsolute;
/**
 * Returns a path such that `join(from, relative(from, to)) == to`.
 * Both paths must be absolute, otherwise it does not make much sense.
 */
function relative(from, to) {
    if (!isAbsolute(from)) {
        throw new PathMustBeAbsoluteException(from);
    }
    if (!isAbsolute(to)) {
        throw new PathMustBeAbsoluteException(to);
    }
    let p;
    if (from == to) {
        p = '';
    }
    else {
        const splitFrom = split(from);
        const splitTo = split(to);
        while (splitFrom.length > 0 && splitTo.length > 0 && splitFrom[0] == splitTo[0]) {
            splitFrom.shift();
            splitTo.shift();
        }
        if (splitFrom.length == 0) {
            p = splitTo.join(exports.NormalizedSep);
        }
        else {
            p = splitFrom.map(_ => '..').concat(splitTo).join(exports.NormalizedSep);
        }
    }
    return normalize(p);
}
exports.relative = relative;
/**
 * Returns a Path that is the resolution of p2, from p1. If p2 is absolute, it will return p2,
 * otherwise will join both p1 and p2.
 */
function resolve(p1, p2) {
    if (isAbsolute(p2)) {
        return p2;
    }
    else {
        return join(p1, p2);
    }
}
exports.resolve = resolve;
function fragment(path) {
    if (path.indexOf(exports.NormalizedSep) != -1) {
        throw new PathCannotBeFragmentException(path);
    }
    return path;
}
exports.fragment = fragment;
/**
 * normalize() cache to reduce computation. For now this grows and we never flush it, but in the
 * future we might want to add a few cache flush to prevent this from growing too large.
 */
let normalizedCache = new Map();
/**
 * Reset the cache. This is only useful for testing.
 * @private
 */
function resetNormalizeCache() {
    normalizedCache = new Map();
}
exports.resetNormalizeCache = resetNormalizeCache;
/**
 * Normalize a string into a Path. This is the only mean to get a Path type from a string that
 * represents a system path. This method cache the results as real world paths tend to be
 * duplicated often.
 * Normalization includes:
 *   - Windows backslashes `\\` are replaced with `/`.
 *   - Windows drivers are replaced with `/X/`, where X is the drive letter.
 *   - Absolute paths starts with `/`.
 *   - Multiple `/` are replaced by a single one.
 *   - Path segments `.` are removed.
 *   - Path segments `..` are resolved.
 *   - If a path is absolute, having a `..` at the start is invalid (and will throw).
 * @param path The path to be normalized.
 */
function normalize(path) {
    let maybePath = normalizedCache.get(path);
    if (!maybePath) {
        maybePath = noCacheNormalize(path);
        normalizedCache.set(path, maybePath);
    }
    return maybePath;
}
exports.normalize = normalize;
/**
 * The no cache version of the normalize() function. Used for benchmarking and testing.
 */
function noCacheNormalize(path) {
    if (path == '' || path == '.') {
        return '';
    }
    else if (path == exports.NormalizedRoot) {
        return exports.NormalizedRoot;
    }
    // Match absolute windows path.
    const original = path;
    if (path.match(/^[A-Z]:[\/\\]/i)) {
        path = '\\' + path[0] + '\\' + path.substr(3);
    }
    // We convert Windows paths as well here.
    const p = path.split(/[\/\\]/g);
    let relative = false;
    let i = 1;
    // Special case the first one.
    if (p[0] != '') {
        p.unshift('.');
        relative = true;
    }
    while (i < p.length) {
        if (p[i] == '.') {
            p.splice(i, 1);
        }
        else if (p[i] == '..') {
            if (i < 2 && !relative) {
                throw new InvalidPathException(original);
            }
            else if (i >= 2 && p[i - 1] != '..') {
                p.splice(i - 1, 2);
                i--;
            }
            else {
                i++;
            }
        }
        else if (p[i] == '') {
            p.splice(i, 1);
        }
        else {
            i++;
        }
    }
    if (p.length == 1) {
        return p[0] == '' ? exports.NormalizedSep : '';
    }
    else {
        if (p[0] == '.') {
            p.shift();
        }
        return p.join(exports.NormalizedSep);
    }
}
exports.noCacheNormalize = noCacheNormalize;
exports.path = (strings, ...values) => {
    return normalize(String.raw(strings, ...values));
};
function asWindowsPath(path) {
    const drive = path.match(/^\/(\w)(?:\/(.*))?$/);
    if (drive) {
        const subPath = drive[2] ? drive[2].replace(/\//g, '\\') : '';
        return `${drive[1]}:\\${subPath}`;
    }
    return path.replace(/\//g, '\\');
}
exports.asWindowsPath = asWindowsPath;
function asPosixPath(path) {
    return path;
}
exports.asPosixPath = asPosixPath;
function getSystemPath(path) {
    if (process.platform.startsWith('win32')) {
        return asWindowsPath(path);
    }
    else {
        return asPosixPath(path);
    }
}
exports.getSystemPath = getSystemPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvY29yZS9zcmMvdmlydHVhbC1mcy9wYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsNENBQTZDO0FBSTdDLE1BQWEsb0JBQXFCLFNBQVEseUJBQWE7SUFDckQsWUFBWSxJQUFZLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2pGO0FBRkQsb0RBRUM7QUFDRCxNQUFhLDJCQUE0QixTQUFRLHlCQUFhO0lBQzVELFlBQVksSUFBWSxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3ZGO0FBRkQsa0VBRUM7QUFDRCxNQUFhLDZCQUE4QixTQUFRLHlCQUFhO0lBQzlELFlBQVksSUFBWSxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2hHO0FBRkQsc0VBRUM7QUFrQkQ7OztHQUdHO0FBQ1UsUUFBQSxhQUFhLEdBQUcsR0FBVyxDQUFDO0FBR3pDOzs7R0FHRztBQUNVLFFBQUEsY0FBYyxHQUFHLHFCQUFxQixDQUFDO0FBR3BEOzs7OztHQUtHO0FBQ0gsU0FBZ0IsS0FBSyxDQUFDLElBQVU7SUFDOUIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFF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IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEJhc2VFeGNlcHRpb24gfSBmcm9tICcuLi9leGNlcHRpb24nO1xuaW1wb3J0IHsgVGVtcGxhdGVUYWcgfSBmcm9tICcuLi91dGlscy9saXRlcmFscyc7XG5cblxuZXhwb3J0IGNsYXNzIEludmFsaWRQYXRoRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHBhdGg6IHN0cmluZykgeyBzdXBlcihgUGF0aCAke0pTT04uc3RyaW5naWZ5KHBhdGgpfSBpcyBpbnZhbGlkLmApOyB9XG59XG5leHBvcnQgY2xhc3MgUGF0aE11c3RCZUFic29sdXRlRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHBhdGg6IHN0cmluZykgeyBzdXBlcihgUGF0aCAke0pTT04uc3RyaW5naWZ5KHBhdGgpfSBtdXN0IGJlIGFic29sdXRlLmApOyB9XG59XG5leHBvcnQgY2xhc3MgUGF0aENhbm5vdEJlRnJhZ21lbnRFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IocGF0aDogc3RyaW5nKSB7IHN1cGVyKGBQYXRoICR7SlNPTi5zdHJpbmdpZnkocGF0aCl9IGNhbm5vdCBiZSBtYWRlIGEgZnJhZ21lbnQuYCk7IH1cbn1cblxuXG4vKipcbiAqIEEgUGF0aCByZWNvZ25pemVkIGJ5IG1vc3QgbWV0aG9kcyBpbiB0aGUgRGV2S2l0LlxuICovXG5leHBvcnQgdHlwZSBQYXRoID0gc3RyaW5nICYge1xuICBfX1BSSVZBVEVfREVWS0lUX1BBVEg6IHZvaWQ7XG59O1xuXG4vKipcbiAqIEEgUGF0aCBmcmFnbWVudCAoZmlsZSBvciBkaXJlY3RvcnkgbmFtZSkgcmVjb2duaXplZCBieSBtb3N0IG1ldGhvZHMgaW4gdGhlIERldktpdC5cbiAqL1xuZXhwb3J0IHR5cGUgUGF0aEZyYWdtZW50ID0gUGF0aCAmIHtcbiAgX19QUklWQVRFX0RFVktJVF9QQVRIX0ZSQUdNRU5UOiB2b2lkO1xufTtcblxuXG4vKipcbiAqIFRoZSBTZXBhcmF0b3IgZm9yIG5vcm1hbGl6ZWQgcGF0aC5cbiAqIEB0eXBlIHtQYXRofVxuICovXG5leHBvcnQgY29uc3QgTm9ybWFsaXplZFNlcCA9ICcvJyBhcyBQYXRoO1xuXG5cbi8qKlxuICogVGhlIHJvb3Qgb2YgYSBub3JtYWxpemVkIHBhdGguXG4gKiBAdHlwZSB7UGF0aH1cbiAqL1xuZXhwb3J0IGNvbnN0IE5vcm1hbGl6ZWRSb290ID0gTm9ybWFsaXplZFNlcCBhcyBQYXRoO1xuXG5cbi8qKlxuICogU3BsaXQgYSBwYXRoIGludG8gbXVsdGlwbGUgcGF0aCBmcmFnbWVudHMuIEVhY2ggZnJhZ21lbnRzIGV4Y2VwdCB0aGUgbGFzdCBvbmUgd2lsbCBlbmQgd2l0aFxuICogYSBwYXRoIHNlcGFyYXRvci5cbiAqIEBwYXJhbSB7UGF0aH0gcGF0aCBUaGUgcGF0aCB0byBzcGxpdC5cbiAqIEByZXR1cm5zIHtQYXRoW119IEFuIGFycmF5IG9mIHBhdGggZnJhZ21lbnRzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3BsaXQocGF0aDogUGF0aCk6IFBhdGhGcmFnbWVudFtdIHtcbiAgY29uc3QgZnJhZ21lbnRzID0gcGF0aC5zcGxpdChOb3JtYWxpemVkU2VwKS5tYXAoeCA9PiBmcmFnbWVudCh4KSk7XG4gIGlmIChmcmFnbWVudHNbZnJhZ21lbnRzLmxlbmd0aCAtIDFdLmxlbmd0aCA9PT0gMCkge1xuICAgIGZyYWdtZW50cy5wb3AoKTtcbiAgfVxuXG4gIHJldHVybiBmcmFnbWVudHM7XG59XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dG5hbWUocGF0aDogUGF0aCk6IHN0cmluZyB7XG4gIGNvbnN0IGJhc2UgPSBiYXNlbmFtZShwYXRoKTtcbiAgY29uc3QgaSA9IGJhc2UubGFzdEluZGV4T2YoJy4nKTtcbiAgaWYgKGkgPCAxKSB7XG4gICAgcmV0dXJuICcnO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlLnN1YnN0cihpKTtcbiAgfVxufVxuXG5cbi8qKlxuICogUmV0dXJuIHRoZSBiYXNlbmFtZSBvZiB0aGUgcGF0aCwgYXMgYSBQYXRoLiBTZWUgcGF0aC5iYXNlbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmFzZW5hbWUocGF0aDogUGF0aCk6IFBhdGhGcmFnbWVudCB7XG4gIGNvbnN0IGkgPSBwYXRoLmxhc3RJbmRleE9mKE5vcm1hbGl6ZWRTZXApO1xuICBpZiAoaSA9PSAtMSkge1xuICAgIHJldHVybiBmcmFnbWVudChwYXRoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZnJhZ21lbnQocGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZihOb3JtYWxpemVkU2VwKSArIDEpKTtcbiAgfVxufVxuXG5cbi8qKlxuICogUmV0dXJuIHRoZSBkaXJuYW1lIG9mIHRoZSBwYXRoLCBhcyBhIFBhdGguIFNlZSBwYXRoLmRpcm5hbWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpcm5hbWUocGF0aDogUGF0aCk6IFBhdGgge1xuICBjb25zdCBpbmRleCA9IHBhdGgubGFzdEluZGV4T2YoTm9ybWFsaXplZFNlcCk7XG4gIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICByZXR1cm4gJycgYXMgUGF0aDtcbiAgfVxuXG4gIGNvbnN0IGVuZEluZGV4ID0gaW5kZXggPT09IDAgPyAxIDogaW5kZXg7IC8vIGNhc2Ugb2YgZmlsZSB1bmRlciByb290OiAnL2ZpbGUnXG5cbiAgcmV0dXJuIG5vcm1hbGl6ZShwYXRoLnN1YnN0cigwLCBlbmRJbmRleCkpO1xufVxuXG5cbi8qKlxuICogSm9pbiBtdWx0aXBsZSBwYXRocyB0b2dldGhlciwgYW5kIG5vcm1hbGl6ZSB0aGUgcmVzdWx0LiBBY2NlcHRzIHN0cmluZ3MgdGhhdCB3aWxsIGJlXG4gKiBub3JtYWxpemVkIGFzIHdlbGwgKGJ1dCB0aGUgb3JpZ2luYWwgbXVzdCBiZSBhIHBhdGgpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gam9pbihwMTogUGF0aCwgLi4ub3RoZXJzOiBzdHJpbmdbXSk6IFBhdGgge1xuICBpZiAob3RoZXJzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gbm9ybWFsaXplKChwMSA/IHAxICsgTm9ybWFsaXplZFNlcCA6ICcnKSArIG90aGVycy5qb2luKE5vcm1hbGl6ZWRTZXApKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcDE7XG4gIH1cbn1cblxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhIHBhdGggaXMgYWJzb2x1dGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Fic29sdXRlKHA6IFBhdGgpIHtcbiAgcmV0dXJuIHAuc3RhcnRzV2l0aChOb3JtYWxpemVkU2VwKTtcbn1cblxuXG4vKipcbiAqIFJldHVybnMgYSBwYXRoIHN1Y2ggdGhhdCBgam9pbihmcm9tLCByZWxhdGl2ZShmcm9tLCB0bykpID09IHRvYC5cbiAqIEJvdGggcGF0aHMgbXVzdCBiZSBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGl0IGRvZXMgbm90IG1ha2UgbXVjaCBzZW5zZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbGF0aXZlKGZyb206IFBhdGgsIHRvOiBQYXRoKTogUGF0aCB7XG4gIGlmICghaXNBYnNvbHV0ZShmcm9tKSkge1xuICAgIHRocm93IG5ldyBQYXRoTXVzdEJlQWJzb2x1dGVFeGNlcHRpb24oZnJvbSk7XG4gIH1cbiAgaWYgKCFpc0Fic29sdXRlKHRvKSkge1xuICAgIHRocm93IG5ldyBQYXRoTXVzdEJlQWJzb2x1dGVFeGNlcHRpb24odG8pO1xuICB9XG5cbiAgbGV0IHA6IHN0cmluZztcblxuICBpZiAoZnJvbSA9PSB0bykge1xuICAgIHAgPSAnJztcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBzcGxpdEZyb20gPSBzcGxpdChmcm9tKTtcbiAgICBjb25zdCBzcGxpdFRvID0gc3BsaXQodG8pO1xuXG4gICAgd2hpbGUgKHNwbGl0RnJvbS5sZW5ndGggPiAwICYmIHNwbGl0VG8ubGVuZ3RoID4gMCAmJiBzcGxpdEZyb21bMF0gPT0gc3BsaXRUb1swXSkge1xuICAgICAgc3BsaXRGcm9tLnNoaWZ0KCk7XG4gICAgICBzcGxpdFRvLnNoaWZ0KCk7XG4gICAgfVxuXG4gICAgaWYgKHNwbGl0RnJvbS5sZW5ndGggPT0gMCkge1xuICAgICAgcCA9IHNwbGl0VG8uam9pbihOb3JtYWxpemVkU2VwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcCA9IHNwbGl0RnJvbS5tYXAoXyA9PiAnLi4nKS5jb25jYXQoc3BsaXRUbykuam9pbihOb3JtYWxpemVkU2VwKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbm9ybWFsaXplKHApO1xufVxuXG5cbi8qKlxuICogUmV0dXJucyBhIFBhdGggdGhhdCBpcyB0aGUgcmVzb2x1dGlvbiBvZiBwMiwgZnJvbSBwMS4gSWYgcDIgaXMgYWJzb2x1dGUsIGl0IHdpbGwgcmV0dXJuIHAyLFxuICogb3RoZXJ3aXNlIHdpbGwgam9pbiBib3RoIHAxIGFuZCBwMi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmUocDE6IFBhdGgsIHAyOiBQYXRoKSB7XG4gIGlmIChpc0Fic29sdXRlKHAyKSkge1xuICAgIHJldHVybiBwMjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gam9pbihwMSwgcDIpO1xuICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZyYWdtZW50KHBhdGg6IHN0cmluZyk6IFBhdGhGcmFnbWVudCB7XG4gIGlmIChwYXRoLmluZGV4T2YoTm9ybWFsaXplZFNlcCkgIT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgUGF0aENhbm5vdEJlRnJhZ21lbnRFeGNlcHRpb24ocGF0aCk7XG4gIH1cblxuICByZXR1cm4gcGF0aCBhcyBQYXRoRnJhZ21lbnQ7XG59XG5cblxuLyoqXG4gKiBub3JtYWxpemUoKSBjYWNoZSB0byByZWR1Y2UgY29tcHV0YXRpb24uIEZvciBub3cgdGhpcyBncm93cyBhbmQgd2UgbmV2ZXIgZmx1c2ggaXQsIGJ1dCBpbiB0aGVcbiAqIGZ1dHVyZSB3ZSBtaWdodCB3YW50IHRvIGFkZCBhIGZldyBjYWNoZSBmbHVzaCB0byBwcmV2ZW50IHRoaXMgZnJvbSBncm93aW5nIHRvbyBsYXJnZS5cbiAqL1xubGV0IG5vcm1hbGl6ZWRDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBQYXRoPigpO1xuXG5cbi8qKlxuICogUmVzZXQgdGhlIGNhY2hlLiBUaGlzIGlzIG9ubHkgdXNlZnVsIGZvciB0ZXN0aW5nLlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0Tm9ybWFsaXplQ2FjaGUoKSB7XG4gIG5vcm1hbGl6ZWRDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBQYXRoPigpO1xufVxuXG5cbi8qKlxuICogTm9ybWFsaXplIGEgc3RyaW5nIGludG8gYSBQYXRoLiBUaGlzIGlzIHRoZSBvbmx5IG1lYW4gdG8gZ2V0IGEgUGF0aCB0eXBlIGZyb20gYSBzdHJpbmcgdGhhdFxuICogcmVwcmVzZW50cyBhIHN5c3RlbSBwYXRoLiBUaGlzIG1ldGhvZCBjYWNoZSB0aGUgcmVzdWx0cyBhcyByZWFsIHdvcmxkIHBhdGhzIHRlbmQgdG8gYmVcbiAqIGR1cGxpY2F0ZWQgb2Z0ZW4uXG4gKiBOb3JtYWxpemF0aW9uIGluY2x1ZGVzOlxuICogICAtIFdpbmRvd3MgYmFja3NsYXNoZXMgYFxcXFxgIGFyZSByZXBsYWNlZCB3aXRoIGAvYC5cbiAqICAgLSBXaW5kb3dzIGRyaXZlcnMgYXJlIHJlcGxhY2VkIHdpdGggYC9YL2AsIHdoZXJlIFggaXMgdGhlIGRyaXZlIGxldHRlci5cbiAqICAgLSBBYnNvbHV0ZSBwYXRocyBzdGFydHMgd2l0aCBgL2AuXG4gKiAgIC0gTXVsdGlwbGUgYC9gIGFyZSByZXBsYWNlZCBieSBhIHNpbmdsZSBvbmUuXG4gKiAgIC0gUGF0aCBzZWdtZW50cyBgLmAgYXJlIHJlbW92ZWQuXG4gKiAgIC0gUGF0aCBzZWdtZW50cyBgLi5gIGFyZSByZXNvbHZlZC5cbiAqICAgLSBJZiBhIHBhdGggaXMgYWJzb2x1dGUsIGhhdmluZyBhIGAuLmAgYXQgdGhlIHN0YXJ0IGlzIGludmFsaWQgKGFuZCB3aWxsIHRocm93KS5cbiAqIEBwYXJhbSBwYXRoIFRoZSBwYXRoIHRvIGJlIG5vcm1hbGl6ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemUocGF0aDogc3RyaW5nKTogUGF0aCB7XG4gIGxldCBtYXliZVBhdGggPSBub3JtYWxpemVkQ2FjaGUuZ2V0KHBhdGgpO1xuICBpZiAoIW1heWJlUGF0aCkge1xuICAgIG1heWJlUGF0aCA9IG5vQ2FjaGVOb3JtYWxpemUocGF0aCk7XG4gICAgbm9ybWFsaXplZENhY2hlLnNldChwYXRoLCBtYXliZVBhdGgpO1xuICB9XG5cbiAgcmV0dXJuIG1heWJlUGF0aDtcbn1cblxuXG4vKipcbiAqIFRoZSBubyBjYWNoZSB2ZXJzaW9uIG9mIHRoZSBub3JtYWxpemUoKSBmdW5jdGlvbi4gVXNlZCBmb3IgYmVuY2htYXJraW5nIGFuZCB0ZXN0aW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9DYWNoZU5vcm1hbGl6ZShwYXRoOiBzdHJpbmcpOiBQYXRoIHtcbiAgaWYgKHBhdGggPT0gJycgfHwgcGF0aCA9PSAnLicpIHtcbiAgICByZXR1cm4gJycgYXMgUGF0aDtcbiAgfSBlbHNlIGlmIChwYXRoID09IE5vcm1hbGl6ZWRSb290KSB7XG4gICAgcmV0dXJuIE5vcm1hbGl6ZWRSb290O1xuICB9XG5cbiAgLy8gTWF0Y2ggYWJzb2x1dGUgd2luZG93cyBwYXRoLlxuICBjb25zdCBvcmlnaW5hbCA9IHBhdGg7XG4gIGlmIChwYXRoLm1hdGNoKC9eW0EtWl06W1xcL1xcXFxdL2kpKSB7XG4gICAgcGF0aCA9ICdcXFxcJyArIHBhdGhbMF0gKyAnXFxcXCcgKyBwYXRoLnN1YnN0cigzKTtcbiAgfVxuXG4gIC8vIFdlIGNvbnZlcnQgV2luZG93cyBwYXRocyBhcyB3ZWxsIGhlcmUuXG4gIGNvbnN0IHAgPSBwYXRoLnNwbGl0KC9bXFwvXFxcXF0vZyk7XG4gIGxldCByZWxhdGl2ZSA9IGZhbHNlO1xuICBsZXQgaSA9IDE7XG5cbiAgLy8gU3BlY2lhbCBjYXNlIHRoZSBmaXJzdCBvbmUuXG4gIGlmIChwWzBdICE9ICcnKSB7XG4gICAgcC51bnNoaWZ0KCcuJyk7XG4gICAgcmVsYXRpdmUgPSB0cnVlO1xuICB9XG5cbiAgd2hpbGUgKGkgPCBwLmxlbmd0aCkge1xuICAgIGlmIChwW2ldID09ICcuJykge1xuICAgICAgcC5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChwW2ldID09ICcuLicpIHtcbiAgICAgIGlmIChpIDwgMiAmJiAhcmVsYXRpdmUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEludmFsaWRQYXRoRXhjZXB0aW9uKG9yaWdpbmFsKTtcbiAgICAgIH0gZWxzZSBpZiAoaSA+PSAyICYmIHBbaSAtIDFdICE9ICcuLicpIHtcbiAgICAgICAgcC5zcGxpY2UoaSAtIDEsIDIpO1xuICAgICAgICBpLS07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwW2ldID09ICcnKSB7XG4gICAgICBwLnNwbGljZShpLCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaSsrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwLmxlbmd0aCA9PSAxKSB7XG4gICAgcmV0dXJuIHBbMF0gPT0gJycgPyBOb3JtYWxpemVkU2VwIDogJycgYXMgUGF0aDtcbiAgfSBlbHNlIHtcbiAgICBpZiAocFswXSA9PSAnLicpIHtcbiAgICAgIHAuc2hpZnQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcC5qb2luKE5vcm1hbGl6ZWRTZXApIGFzIFBhdGg7XG4gIH1cbn1cblxuXG5leHBvcnQgY29uc3QgcGF0aDogVGVtcGxhdGVUYWc8UGF0aD4gPSAoc3RyaW5ncywgLi4udmFsdWVzKSA9PiB7XG4gIHJldHVybiBub3JtYWxpemUoU3RyaW5nLnJhdyhzdHJpbmdzLCAuLi52YWx1ZXMpKTtcbn07XG5cblxuLy8gUGxhdGZvcm0tc3BlY2lmaWMgcGF0aHMuXG5leHBvcnQgdHlwZSBXaW5kb3dzUGF0aCA9IHN0cmluZyAmIHtcbiAgX19QUklWQVRFX0RFVktJVF9XSU5ET1dTX1BBVEg6IHZvaWQ7XG59O1xuZXhwb3J0IHR5cGUgUG9zaXhQYXRoID0gc3RyaW5nICYge1xuICBfX1BSSVZBVEVfREVWS0lUX1BPU0lYX1BBVEg6IHZvaWQ7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gYXNXaW5kb3dzUGF0aChwYXRoOiBQYXRoKTogV2luZG93c1BhdGgge1xuICBjb25zdCBkcml2ZSA9IHBhdGgubWF0Y2goL15cXC8oXFx3KSg/OlxcLyguKikpPyQvKTtcbiAgaWYgKGRyaXZlKSB7XG4gICAgY29uc3Qgc3ViUGF0aCA9IGRyaXZlWzJdID8gZHJpdmVbMl0ucmVwbGFjZSgvXFwvL2csICdcXFxcJykgOiAnJztcblxuICAgIHJldHVybiBgJHtkcml2ZVsxXX06XFxcXCR7c3ViUGF0aH1gIGFzIFdpbmRvd3NQYXRoO1xuICB9XG5cbiAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXFwvL2csICdcXFxcJykgYXMgV2luZG93c1BhdGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc1Bvc2l4UGF0aChwYXRoOiBQYXRoKTogUG9zaXhQYXRoIHtcbiAgcmV0dXJuIHBhdGggYXMgc3RyaW5nIGFzIFBvc2l4UGF0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN5c3RlbVBhdGgocGF0aDogUGF0aCk6IHN0cmluZyB7XG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtLnN0YXJ0c1dpdGgoJ3dpbjMyJykpIHtcbiAgICByZXR1cm4gYXNXaW5kb3dzUGF0aChwYXRoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYXNQb3NpeFBhdGgocGF0aCk7XG4gIH1cbn1cbiJdfQ==