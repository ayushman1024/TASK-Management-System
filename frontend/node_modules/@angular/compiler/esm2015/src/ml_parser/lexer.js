/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as chars from '../chars';
import { ParseError, ParseLocation, ParseSourceFile, ParseSourceSpan } from '../parse_util';
import { DEFAULT_INTERPOLATION_CONFIG } from './interpolation_config';
import { NAMED_ENTITIES, TagContentType } from './tags';
export var TokenType;
(function (TokenType) {
    TokenType[TokenType["TAG_OPEN_START"] = 0] = "TAG_OPEN_START";
    TokenType[TokenType["TAG_OPEN_END"] = 1] = "TAG_OPEN_END";
    TokenType[TokenType["TAG_OPEN_END_VOID"] = 2] = "TAG_OPEN_END_VOID";
    TokenType[TokenType["TAG_CLOSE"] = 3] = "TAG_CLOSE";
    TokenType[TokenType["TEXT"] = 4] = "TEXT";
    TokenType[TokenType["ESCAPABLE_RAW_TEXT"] = 5] = "ESCAPABLE_RAW_TEXT";
    TokenType[TokenType["RAW_TEXT"] = 6] = "RAW_TEXT";
    TokenType[TokenType["COMMENT_START"] = 7] = "COMMENT_START";
    TokenType[TokenType["COMMENT_END"] = 8] = "COMMENT_END";
    TokenType[TokenType["CDATA_START"] = 9] = "CDATA_START";
    TokenType[TokenType["CDATA_END"] = 10] = "CDATA_END";
    TokenType[TokenType["ATTR_NAME"] = 11] = "ATTR_NAME";
    TokenType[TokenType["ATTR_VALUE"] = 12] = "ATTR_VALUE";
    TokenType[TokenType["DOC_TYPE"] = 13] = "DOC_TYPE";
    TokenType[TokenType["EXPANSION_FORM_START"] = 14] = "EXPANSION_FORM_START";
    TokenType[TokenType["EXPANSION_CASE_VALUE"] = 15] = "EXPANSION_CASE_VALUE";
    TokenType[TokenType["EXPANSION_CASE_EXP_START"] = 16] = "EXPANSION_CASE_EXP_START";
    TokenType[TokenType["EXPANSION_CASE_EXP_END"] = 17] = "EXPANSION_CASE_EXP_END";
    TokenType[TokenType["EXPANSION_FORM_END"] = 18] = "EXPANSION_FORM_END";
    TokenType[TokenType["EOF"] = 19] = "EOF";
})(TokenType || (TokenType = {}));
export class Token {
    constructor(type, parts, sourceSpan) {
        this.type = type;
        this.parts = parts;
        this.sourceSpan = sourceSpan;
    }
}
export class TokenError extends ParseError {
    constructor(errorMsg, tokenType, span) {
        super(span, errorMsg);
        this.tokenType = tokenType;
    }
}
export class TokenizeResult {
    constructor(tokens, errors) {
        this.tokens = tokens;
        this.errors = errors;
    }
}
export function tokenize(source, url, getTagDefinition, tokenizeExpansionForms = false, interpolationConfig = DEFAULT_INTERPOLATION_CONFIG) {
    return new _Tokenizer(new ParseSourceFile(source, url), getTagDefinition, tokenizeExpansionForms, interpolationConfig)
        .tokenize();
}
const _CR_OR_CRLF_REGEXP = /\r\n?/g;
function _unexpectedCharacterErrorMsg(charCode) {
    const char = charCode === chars.$EOF ? 'EOF' : String.fromCharCode(charCode);
    return `Unexpected character "${char}"`;
}
function _unknownEntityErrorMsg(entitySrc) {
    return `Unknown entity "${entitySrc}" - use the "&#<decimal>;" or  "&#x<hex>;" syntax`;
}
class _ControlFlowError {
    constructor(error) {
        this.error = error;
    }
}
// See http://www.w3.org/TR/html51/syntax.html#writing
class _Tokenizer {
    /**
     * @param _file The html source
     * @param _getTagDefinition
     * @param _tokenizeIcu Whether to tokenize ICU messages (considered as text nodes when false)
     * @param _interpolationConfig
     */
    constructor(_file, _getTagDefinition, _tokenizeIcu, _interpolationConfig = DEFAULT_INTERPOLATION_CONFIG) {
        this._file = _file;
        this._getTagDefinition = _getTagDefinition;
        this._tokenizeIcu = _tokenizeIcu;
        this._interpolationConfig = _interpolationConfig;
        // Note: this is always lowercase!
        this._peek = -1;
        this._nextPeek = -1;
        this._index = -1;
        this._line = 0;
        this._column = -1;
        this._expansionCaseStack = [];
        this._inInterpolation = false;
        this.tokens = [];
        this.errors = [];
        this._input = _file.content;
        this._length = _file.content.length;
        this._advance();
    }
    _processCarriageReturns(content) {
        // http://www.w3.org/TR/html5/syntax.html#preprocessing-the-input-stream
        // In order to keep the original position in the source, we can not
        // pre-process it.
        // Instead CRs are processed right before instantiating the tokens.
        return content.replace(_CR_OR_CRLF_REGEXP, '\n');
    }
    tokenize() {
        while (this._peek !== chars.$EOF) {
            const start = this._getLocation();
            try {
                if (this._attemptCharCode(chars.$LT)) {
                    if (this._attemptCharCode(chars.$BANG)) {
                        if (this._attemptCharCode(chars.$LBRACKET)) {
                            this._consumeCdata(start);
                        }
                        else if (this._attemptCharCode(chars.$MINUS)) {
                            this._consumeComment(start);
                        }
                        else {
                            this._consumeDocType(start);
                        }
                    }
                    else if (this._attemptCharCode(chars.$SLASH)) {
                        this._consumeTagClose(start);
                    }
                    else {
                        this._consumeTagOpen(start);
                    }
                }
                else if (!(this._tokenizeIcu && this._tokenizeExpansionForm())) {
                    this._consumeText();
                }
            }
            catch (e) {
                if (e instanceof _ControlFlowError) {
                    this.errors.push(e.error);
                }
                else {
                    throw e;
                }
            }
        }
        this._beginToken(TokenType.EOF);
        this._endToken([]);
        return new TokenizeResult(mergeTextTokens(this.tokens), this.errors);
    }
    /**
     * @returns whether an ICU token has been created
     * @internal
     */
    _tokenizeExpansionForm() {
        if (isExpansionFormStart(this._input, this._index, this._interpolationConfig)) {
            this._consumeExpansionFormStart();
            return true;
        }
        if (isExpansionCaseStart(this._peek) && this._isInExpansionForm()) {
            this._consumeExpansionCaseStart();
            return true;
        }
        if (this._peek === chars.$RBRACE) {
            if (this._isInExpansionCase()) {
                this._consumeExpansionCaseEnd();
                return true;
            }
            if (this._isInExpansionForm()) {
                this._consumeExpansionFormEnd();
                return true;
            }
        }
        return false;
    }
    _getLocation() {
        return new ParseLocation(this._file, this._index, this._line, this._column);
    }
    _getSpan(start = this._getLocation(), end = this._getLocation()) {
        return new ParseSourceSpan(start, end);
    }
    _beginToken(type, start = this._getLocation()) {
        this._currentTokenStart = start;
        this._currentTokenType = type;
    }
    _endToken(parts, end = this._getLocation()) {
        const token = new Token(this._currentTokenType, parts, new ParseSourceSpan(this._currentTokenStart, end));
        this.tokens.push(token);
        this._currentTokenStart = null;
        this._currentTokenType = null;
        return token;
    }
    _createError(msg, span) {
        if (this._isInExpansionForm()) {
            msg += ` (Do you have an unescaped "{" in your template? Use "{{ '{' }}") to escape it.)`;
        }
        const error = new TokenError(msg, this._currentTokenType, span);
        this._currentTokenStart = null;
        this._currentTokenType = null;
        return new _ControlFlowError(error);
    }
    _advance() {
        if (this._index >= this._length) {
            throw this._createError(_unexpectedCharacterErrorMsg(chars.$EOF), this._getSpan());
        }
        if (this._peek === chars.$LF) {
            this._line++;
            this._column = 0;
        }
        else if (this._peek !== chars.$LF && this._peek !== chars.$CR) {
            this._column++;
        }
        this._index++;
        this._peek = this._index >= this._length ? chars.$EOF : this._input.charCodeAt(this._index);
        this._nextPeek =
            this._index + 1 >= this._length ? chars.$EOF : this._input.charCodeAt(this._index + 1);
    }
    _attemptCharCode(charCode) {
        if (this._peek === charCode) {
            this._advance();
            return true;
        }
        return false;
    }
    _attemptCharCodeCaseInsensitive(charCode) {
        if (compareCharCodeCaseInsensitive(this._peek, charCode)) {
            this._advance();
            return true;
        }
        return false;
    }
    _requireCharCode(charCode) {
        const location = this._getLocation();
        if (!this._attemptCharCode(charCode)) {
            throw this._createError(_unexpectedCharacterErrorMsg(this._peek), this._getSpan(location, location));
        }
    }
    _attemptStr(chars) {
        const len = chars.length;
        if (this._index + len > this._length) {
            return false;
        }
        const initialPosition = this._savePosition();
        for (let i = 0; i < len; i++) {
            if (!this._attemptCharCode(chars.charCodeAt(i))) {
                // If attempting to parse the string fails, we want to reset the parser
                // to where it was before the attempt
                this._restorePosition(initialPosition);
                return false;
            }
        }
        return true;
    }
    _attemptStrCaseInsensitive(chars) {
        for (let i = 0; i < chars.length; i++) {
            if (!this._attemptCharCodeCaseInsensitive(chars.charCodeAt(i))) {
                return false;
            }
        }
        return true;
    }
    _requireStr(chars) {
        const location = this._getLocation();
        if (!this._attemptStr(chars)) {
            throw this._createError(_unexpectedCharacterErrorMsg(this._peek), this._getSpan(location));
        }
    }
    _attemptCharCodeUntilFn(predicate) {
        while (!predicate(this._peek)) {
            this._advance();
        }
    }
    _requireCharCodeUntilFn(predicate, len) {
        const start = this._getLocation();
        this._attemptCharCodeUntilFn(predicate);
        if (this._index - start.offset < len) {
            throw this._createError(_unexpectedCharacterErrorMsg(this._peek), this._getSpan(start, start));
        }
    }
    _attemptUntilChar(char) {
        while (this._peek !== char) {
            this._advance();
        }
    }
    _readChar(decodeEntities) {
        if (decodeEntities && this._peek === chars.$AMPERSAND) {
            return this._decodeEntity();
        }
        else {
            const index = this._index;
            this._advance();
            return this._input[index];
        }
    }
    _decodeEntity() {
        const start = this._getLocation();
        this._advance();
        if (this._attemptCharCode(chars.$HASH)) {
            const isHex = this._attemptCharCode(chars.$x) || this._attemptCharCode(chars.$X);
            const numberStart = this._getLocation().offset;
            this._attemptCharCodeUntilFn(isDigitEntityEnd);
            if (this._peek != chars.$SEMICOLON) {
                throw this._createError(_unexpectedCharacterErrorMsg(this._peek), this._getSpan());
            }
            this._advance();
            const strNum = this._input.substring(numberStart, this._index - 1);
            try {
                const charCode = parseInt(strNum, isHex ? 16 : 10);
                return String.fromCharCode(charCode);
            }
            catch (_a) {
                const entity = this._input.substring(start.offset + 1, this._index - 1);
                throw this._createError(_unknownEntityErrorMsg(entity), this._getSpan(start));
            }
        }
        else {
            const startPosition = this._savePosition();
            this._attemptCharCodeUntilFn(isNamedEntityEnd);
            if (this._peek != chars.$SEMICOLON) {
                this._restorePosition(startPosition);
                return '&';
            }
            this._advance();
            const name = this._input.substring(start.offset + 1, this._index - 1);
            const char = NAMED_ENTITIES[name];
            if (!char) {
                throw this._createError(_unknownEntityErrorMsg(name), this._getSpan(start));
            }
            return char;
        }
    }
    _consumeRawText(decodeEntities, firstCharOfEnd, attemptEndRest) {
        let tagCloseStart;
        const textStart = this._getLocation();
        this._beginToken(decodeEntities ? TokenType.ESCAPABLE_RAW_TEXT : TokenType.RAW_TEXT, textStart);
        const parts = [];
        while (true) {
            tagCloseStart = this._getLocation();
            if (this._attemptCharCode(firstCharOfEnd) && attemptEndRest()) {
                break;
            }
            if (this._index > tagCloseStart.offset) {
                // add the characters consumed by the previous if statement to the output
                parts.push(this._input.substring(tagCloseStart.offset, this._index));
            }
            while (this._peek !== firstCharOfEnd) {
                parts.push(this._readChar(decodeEntities));
            }
        }
        return this._endToken([this._processCarriageReturns(parts.join(''))], tagCloseStart);
    }
    _consumeComment(start) {
        this._beginToken(TokenType.COMMENT_START, start);
        this._requireCharCode(chars.$MINUS);
        this._endToken([]);
        const textToken = this._consumeRawText(false, chars.$MINUS, () => this._attemptStr('->'));
        this._beginToken(TokenType.COMMENT_END, textToken.sourceSpan.end);
        this._endToken([]);
    }
    _consumeCdata(start) {
        this._beginToken(TokenType.CDATA_START, start);
        this._requireStr('CDATA[');
        this._endToken([]);
        const textToken = this._consumeRawText(false, chars.$RBRACKET, () => this._attemptStr(']>'));
        this._beginToken(TokenType.CDATA_END, textToken.sourceSpan.end);
        this._endToken([]);
    }
    _consumeDocType(start) {
        this._beginToken(TokenType.DOC_TYPE, start);
        this._attemptUntilChar(chars.$GT);
        this._advance();
        this._endToken([this._input.substring(start.offset + 2, this._index - 1)]);
    }
    _consumePrefixAndName() {
        const nameOrPrefixStart = this._index;
        let prefix = null;
        while (this._peek !== chars.$COLON && !isPrefixEnd(this._peek)) {
            this._advance();
        }
        let nameStart;
        if (this._peek === chars.$COLON) {
            this._advance();
            prefix = this._input.substring(nameOrPrefixStart, this._index - 1);
            nameStart = this._index;
        }
        else {
            nameStart = nameOrPrefixStart;
        }
        this._requireCharCodeUntilFn(isNameEnd, this._index === nameStart ? 1 : 0);
        const name = this._input.substring(nameStart, this._index);
        return [prefix, name];
    }
    _consumeTagOpen(start) {
        const savedPos = this._savePosition();
        let tagName;
        let lowercaseTagName;
        try {
            if (!chars.isAsciiLetter(this._peek)) {
                throw this._createError(_unexpectedCharacterErrorMsg(this._peek), this._getSpan());
            }
            const nameStart = this._index;
            this._consumeTagOpenStart(start);
            tagName = this._input.substring(nameStart, this._index);
            lowercaseTagName = tagName.toLowerCase();
            this._attemptCharCodeUntilFn(isNotWhitespace);
            while (this._peek !== chars.$SLASH && this._peek !== chars.$GT) {
                this._consumeAttributeName();
                this._attemptCharCodeUntilFn(isNotWhitespace);
                if (this._attemptCharCode(chars.$EQ)) {
                    this._attemptCharCodeUntilFn(isNotWhitespace);
                    this._consumeAttributeValue();
                }
                this._attemptCharCodeUntilFn(isNotWhitespace);
            }
            this._consumeTagOpenEnd();
        }
        catch (e) {
            if (e instanceof _ControlFlowError) {
                // When the start tag is invalid, assume we want a "<"
                this._restorePosition(savedPos);
                // Back to back text tokens are merged at the end
                this._beginToken(TokenType.TEXT, start);
                this._endToken(['<']);
                return;
            }
            throw e;
        }
        const contentTokenType = this._getTagDefinition(tagName).contentType;
        if (contentTokenType === TagContentType.RAW_TEXT) {
            this._consumeRawTextWithTagClose(lowercaseTagName, false);
        }
        else if (contentTokenType === TagContentType.ESCAPABLE_RAW_TEXT) {
            this._consumeRawTextWithTagClose(lowercaseTagName, true);
        }
    }
    _consumeRawTextWithTagClose(lowercaseTagName, decodeEntities) {
        const textToken = this._consumeRawText(decodeEntities, chars.$LT, () => {
            if (!this._attemptCharCode(chars.$SLASH))
                return false;
            this._attemptCharCodeUntilFn(isNotWhitespace);
            if (!this._attemptStrCaseInsensitive(lowercaseTagName))
                return false;
            this._attemptCharCodeUntilFn(isNotWhitespace);
            return this._attemptCharCode(chars.$GT);
        });
        this._beginToken(TokenType.TAG_CLOSE, textToken.sourceSpan.end);
        this._endToken([null, lowercaseTagName]);
    }
    _consumeTagOpenStart(start) {
        this._beginToken(TokenType.TAG_OPEN_START, start);
        const parts = this._consumePrefixAndName();
        this._endToken(parts);
    }
    _consumeAttributeName() {
        this._beginToken(TokenType.ATTR_NAME);
        const prefixAndName = this._consumePrefixAndName();
        this._endToken(prefixAndName);
    }
    _consumeAttributeValue() {
        this._beginToken(TokenType.ATTR_VALUE);
        let value;
        if (this._peek === chars.$SQ || this._peek === chars.$DQ) {
            const quoteChar = this._peek;
            this._advance();
            const parts = [];
            while (this._peek !== quoteChar) {
                parts.push(this._readChar(true));
            }
            value = parts.join('');
            this._advance();
        }
        else {
            const valueStart = this._index;
            this._requireCharCodeUntilFn(isNameEnd, 1);
            value = this._input.substring(valueStart, this._index);
        }
        this._endToken([this._processCarriageReturns(value)]);
    }
    _consumeTagOpenEnd() {
        const tokenType = this._attemptCharCode(chars.$SLASH) ? TokenType.TAG_OPEN_END_VOID : TokenType.TAG_OPEN_END;
        this._beginToken(tokenType);
        this._requireCharCode(chars.$GT);
        this._endToken([]);
    }
    _consumeTagClose(start) {
        this._beginToken(TokenType.TAG_CLOSE, start);
        this._attemptCharCodeUntilFn(isNotWhitespace);
        const prefixAndName = this._consumePrefixAndName();
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this._requireCharCode(chars.$GT);
        this._endToken(prefixAndName);
    }
    _consumeExpansionFormStart() {
        this._beginToken(TokenType.EXPANSION_FORM_START, this._getLocation());
        this._requireCharCode(chars.$LBRACE);
        this._endToken([]);
        this._expansionCaseStack.push(TokenType.EXPANSION_FORM_START);
        this._beginToken(TokenType.RAW_TEXT, this._getLocation());
        const condition = this._readUntil(chars.$COMMA);
        this._endToken([condition], this._getLocation());
        this._requireCharCode(chars.$COMMA);
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this._beginToken(TokenType.RAW_TEXT, this._getLocation());
        const type = this._readUntil(chars.$COMMA);
        this._endToken([type], this._getLocation());
        this._requireCharCode(chars.$COMMA);
        this._attemptCharCodeUntilFn(isNotWhitespace);
    }
    _consumeExpansionCaseStart() {
        this._beginToken(TokenType.EXPANSION_CASE_VALUE, this._getLocation());
        const value = this._readUntil(chars.$LBRACE).trim();
        this._endToken([value], this._getLocation());
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this._beginToken(TokenType.EXPANSION_CASE_EXP_START, this._getLocation());
        this._requireCharCode(chars.$LBRACE);
        this._endToken([], this._getLocation());
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this._expansionCaseStack.push(TokenType.EXPANSION_CASE_EXP_START);
    }
    _consumeExpansionCaseEnd() {
        this._beginToken(TokenType.EXPANSION_CASE_EXP_END, this._getLocation());
        this._requireCharCode(chars.$RBRACE);
        this._endToken([], this._getLocation());
        this._attemptCharCodeUntilFn(isNotWhitespace);
        this._expansionCaseStack.pop();
    }
    _consumeExpansionFormEnd() {
        this._beginToken(TokenType.EXPANSION_FORM_END, this._getLocation());
        this._requireCharCode(chars.$RBRACE);
        this._endToken([]);
        this._expansionCaseStack.pop();
    }
    _consumeText() {
        const start = this._getLocation();
        this._beginToken(TokenType.TEXT, start);
        const parts = [];
        do {
            if (this._interpolationConfig && this._attemptStr(this._interpolationConfig.start)) {
                parts.push(this._interpolationConfig.start);
                this._inInterpolation = true;
            }
            else if (this._interpolationConfig && this._inInterpolation &&
                this._attemptStr(this._interpolationConfig.end)) {
                parts.push(this._interpolationConfig.end);
                this._inInterpolation = false;
            }
            else {
                parts.push(this._readChar(true));
            }
        } while (!this._isTextEnd());
        this._endToken([this._processCarriageReturns(parts.join(''))]);
    }
    _isTextEnd() {
        if (this._peek === chars.$LT || this._peek === chars.$EOF) {
            return true;
        }
        if (this._tokenizeIcu && !this._inInterpolation) {
            if (isExpansionFormStart(this._input, this._index, this._interpolationConfig)) {
                // start of an expansion form
                return true;
            }
            if (this._peek === chars.$RBRACE && this._isInExpansionCase()) {
                // end of and expansion case
                return true;
            }
        }
        return false;
    }
    _savePosition() {
        return [this._peek, this._index, this._column, this._line, this.tokens.length];
    }
    _readUntil(char) {
        const start = this._index;
        this._attemptUntilChar(char);
        return this._input.substring(start, this._index);
    }
    _restorePosition(position) {
        this._peek = position[0];
        this._index = position[1];
        this._column = position[2];
        this._line = position[3];
        const nbTokens = position[4];
        if (nbTokens < this.tokens.length) {
            // remove any extra tokens
            this.tokens = this.tokens.slice(0, nbTokens);
        }
    }
    _isInExpansionCase() {
        return this._expansionCaseStack.length > 0 &&
            this._expansionCaseStack[this._expansionCaseStack.length - 1] ===
                TokenType.EXPANSION_CASE_EXP_START;
    }
    _isInExpansionForm() {
        return this._expansionCaseStack.length > 0 &&
            this._expansionCaseStack[this._expansionCaseStack.length - 1] ===
                TokenType.EXPANSION_FORM_START;
    }
}
function isNotWhitespace(code) {
    return !chars.isWhitespace(code) || code === chars.$EOF;
}
function isNameEnd(code) {
    return chars.isWhitespace(code) || code === chars.$GT || code === chars.$SLASH ||
        code === chars.$SQ || code === chars.$DQ || code === chars.$EQ;
}
function isPrefixEnd(code) {
    return (code < chars.$a || chars.$z < code) && (code < chars.$A || chars.$Z < code) &&
        (code < chars.$0 || code > chars.$9);
}
function isDigitEntityEnd(code) {
    return code == chars.$SEMICOLON || code == chars.$EOF || !chars.isAsciiHexDigit(code);
}
function isNamedEntityEnd(code) {
    return code == chars.$SEMICOLON || code == chars.$EOF || !chars.isAsciiLetter(code);
}
function isExpansionFormStart(input, offset, interpolationConfig) {
    const isInterpolationStart = interpolationConfig ? input.indexOf(interpolationConfig.start, offset) == offset : false;
    return input.charCodeAt(offset) == chars.$LBRACE && !isInterpolationStart;
}
function isExpansionCaseStart(peek) {
    return peek === chars.$EQ || chars.isAsciiLetter(peek) || chars.isDigit(peek);
}
function compareCharCodeCaseInsensitive(code1, code2) {
    return toUpperCaseCharCode(code1) == toUpperCaseCharCode(code2);
}
function toUpperCaseCharCode(code) {
    return code >= chars.$a && code <= chars.$z ? code - chars.$a + chars.$A : code;
}
function mergeTextTokens(srcTokens) {
    const dstTokens = [];
    let lastDstToken = undefined;
    for (let i = 0; i < srcTokens.length; i++) {
        const token = srcTokens[i];
        if (lastDstToken && lastDstToken.type == TokenType.TEXT && token.type == TokenType.TEXT) {
            lastDstToken.parts[0] += token.parts[0];
            lastDstToken.sourceSpan.end = token.sourceSpan.end;
        }
        else {
            lastDstToken = token;
            dstTokens.push(lastDstToken);
        }
    }
    return dstTokens;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV4ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvbWxfcGFyc2VyL2xleGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sS0FBSyxLQUFLLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFMUYsT0FBTyxFQUFDLDRCQUE0QixFQUFzQixNQUFNLHdCQUF3QixDQUFDO0FBQ3pGLE9BQU8sRUFBQyxjQUFjLEVBQUUsY0FBYyxFQUFnQixNQUFNLFFBQVEsQ0FBQztBQUVyRSxNQUFNLENBQU4sSUFBWSxTQXFCWDtBQXJCRCxXQUFZLFNBQVM7SUFDbkIsNkRBQWMsQ0FBQTtJQUNkLHlEQUFZLENBQUE7SUFDWixtRUFBaUIsQ0FBQTtJQUNqQixtREFBUyxDQUFBO0lBQ1QseUNBQUksQ0FBQTtJQUNKLHFFQUFrQixDQUFBO0lBQ2xCLGlEQUFRLENBQUE7SUFDUiwyREFBYSxDQUFBO0lBQ2IsdURBQVcsQ0FBQTtJQUNYLHVEQUFXLENBQUE7SUFDWCxvREFBUyxDQUFBO0lBQ1Qsb0RBQVMsQ0FBQTtJQUNULHNEQUFVLENBQUE7SUFDVixrREFBUSxDQUFBO0lBQ1IsMEVBQW9CLENBQUE7SUFDcEIsMEVBQW9CLENBQUE7SUFDcEIsa0ZBQXdCLENBQUE7SUFDeEIsOEVBQXNCLENBQUE7SUFDdEIsc0VBQWtCLENBQUE7SUFDbEIsd0NBQUcsQ0FBQTtBQUNMLENBQUMsRUFyQlcsU0FBUyxLQUFULFNBQVMsUUFxQnBCO0FBRUQsTUFBTSxPQUFPLEtBQUs7SUFDaEIsWUFBbUIsSUFBZSxFQUFTLEtBQWUsRUFBUyxVQUEyQjtRQUEzRSxTQUFJLEdBQUosSUFBSSxDQUFXO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUFTLGVBQVUs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bUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEUsQ0FBQztBQUVELFNBQVMsbUJBQW1CLENBQUMsSUFBWTtJQUN2QyxPQUFPLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRSxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDbEYsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLFNBQWtCO0lBQ3pDLE1BQU0sU0FBUyxHQUFZLEVBQUUsQ0FBQztJQUM5QixJQUFJLFlBQVksR0FBb0IsU0FBUyxDQUFDO0lBQzlDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3pDLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFJLFlBQVksSUFBSSxZQUFZLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsSUFBSSxFQUFFO1lBQ3ZGLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztTQUNwRDthQUFNO1lBQ0wsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUNyQixTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzlCO0tBQ0Y7SUFFRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgKiBhcyBjaGFycyBmcm9tICcuLi9jaGFycyc7XG5pbXBvcnQge1BhcnNlRXJyb3IsIFBhcnNlTG9jYXRpb24sIFBhcnNlU291cmNlRmlsZSwgUGFyc2VTb3VyY2VTcGFufSBmcm9tICcuLi9wYXJzZV91dGlsJztcblxuaW1wb3J0IHtERUZBVUxUX0lOVEVSUE9MQVRJT05fQ09ORklHLCBJbnRlcnBvbGF0aW9uQ29uZmlnfSBmcm9tICcuL2ludGVycG9sYXRpb25fY29uZmlnJztcbmltcG9ydCB7TkFNRURfRU5USVRJRVMsIFRhZ0NvbnRlbnRUeXBlLCBUYWdEZWZpbml0aW9ufSBmcm9tICcuL3RhZ3MnO1xuXG5leHBvcnQgZW51bSBUb2tlblR5cGUge1xuICBUQUdfT1BFTl9TVEFSVCxcbiAgVEFHX09QRU5fRU5ELFxuICBUQUdfT1BFTl9FTkRfVk9JRCxcbiAgVEFHX0NMT1NFLFxuICBURVhULFxuICBFU0NBUEFCTEVfUkFXX1RFWFQsXG4gIFJBV19URVhULFxuICBDT01NRU5UX1NUQVJULFxuICBDT01NRU5UX0VORCxcbiAgQ0RBVEFfU1RBUlQsXG4gIENEQVRBX0VORCxcbiAgQVRUUl9OQU1FLFxuICBBVFRSX1ZBTFVFLFxuICBET0NfVFlQRSxcbiAgRVhQQU5TSU9OX0ZPUk1fU1RBUlQsXG4gIEVYUEFOU0lPTl9DQVNFX1ZBTFVFLFxuICBFWFBBTlNJT05fQ0FTRV9FWFBfU1RBUlQsXG4gIEVYUEFOU0lPTl9DQVNFX0VYUF9FTkQsXG4gIEVYUEFOU0lPTl9GT1JNX0VORCxcbiAgRU9GXG59XG5cbmV4cG9ydCBjbGFzcyBUb2tlbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlOiBUb2tlblR5cGUsIHB1YmxpYyBwYXJ0czogc3RyaW5nW10sIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBUb2tlbkVycm9yIGV4dGVuZHMgUGFyc2VFcnJvciB7XG4gIGNvbnN0cnVjdG9yKGVycm9yTXNnOiBzdHJpbmcsIHB1YmxpYyB0b2tlblR5cGU6IFRva2VuVHlwZSwgc3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7XG4gICAgc3VwZXIoc3BhbiwgZXJyb3JNc2cpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUb2tlbml6ZVJlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0b2tlbnM6IFRva2VuW10sIHB1YmxpYyBlcnJvcnM6IFRva2VuRXJyb3JbXSkge31cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRva2VuaXplKFxuICAgIHNvdXJjZTogc3RyaW5nLCB1cmw6IHN0cmluZywgZ2V0VGFnRGVmaW5pdGlvbjogKHRhZ05hbWU6IHN0cmluZykgPT4gVGFnRGVmaW5pdGlvbixcbiAgICB0b2tlbml6ZUV4cGFuc2lvbkZvcm1zOiBib29sZWFuID0gZmFsc2UsXG4gICAgaW50ZXJwb2xhdGlvbkNvbmZpZzogSW50ZXJwb2xhdGlvbkNvbmZpZyA9IERFRkFVTFRfSU5URVJQT0xBVElPTl9DT05GSUcpOiBUb2tlbml6ZVJlc3VsdCB7XG4gIHJldHVybiBuZXcgX1Rva2VuaXplcihcbiAgICAgICAgICAgICBuZXcgUGFyc2VTb3VyY2VGaWxlKHNvdXJjZSwgdXJsKSwgZ2V0VGFnRGVmaW5pdGlvbiwgdG9rZW5pemVFeHBhbnNpb25Gb3JtcyxcbiAgICAgICAgICAgICBpbnRlcnBvbGF0aW9uQ29uZmlnKVxuICAgICAgLnRva2VuaXplKCk7XG59XG5cbmNvbnN0IF9DUl9PUl9DUkxGX1JFR0VYUCA9IC9cXHJcXG4/L2c7XG5cbmZ1bmN0aW9uIF91bmV4cGVjdGVkQ2hhcmFjdGVyRXJyb3JNc2coY2hhckNvZGU6IG51bWJlcik6IHN0cmluZyB7XG4gIGNvbnN0IGNoYXIgPSBjaGFyQ29kZSA9PT0gY2hhcnMuJEVPRiA/ICdFT0YnIDogU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyQ29kZSk7XG4gIHJldHVybiBgVW5leHBlY3RlZCBjaGFyYWN0ZXIgXCIke2NoYXJ9XCJgO1xufVxuXG5mdW5jdGlvbiBfdW5rbm93bkVudGl0eUVycm9yTXNnKGVudGl0eVNyYzogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGBVbmtub3duIGVudGl0eSBcIiR7ZW50aXR5U3JjfVwiIC0gdXNlIHRoZSBcIiYjPGRlY2ltYWw+O1wiIG9yICBcIiYjeDxoZXg+O1wiIHN5bnRheGA7XG59XG5cbmNsYXNzIF9Db250cm9sRmxvd0Vycm9yIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVycm9yOiBUb2tlbkVycm9yKSB7fVxufVxuXG4vLyBTZWUgaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUxL3N5bnRheC5odG1sI3dyaXRpbmdcbmNsYXNzIF9Ub2tlbml6ZXIge1xuICBwcml2YXRlIF9pbnB1dDogc3RyaW5nO1xuICBwcml2YXRlIF9sZW5ndGg6IG51bWJlcjtcbiAgLy8gTm90ZTogdGhpcyBpcyBhbHdheXMgbG93ZXJjYXNlIVxuICBwcml2YXRlIF9wZWVrOiBudW1iZXIgPSAtMTtcbiAgcHJpdmF0ZSBfbmV4dFBlZWs6IG51bWJlciA9IC0xO1xuICBwcml2YXRlIF9pbmRleDogbnVtYmVyID0gLTE7XG4gIHByaXZhdGUgX2xpbmU6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2NvbHVtbjogbnVtYmVyID0gLTE7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF9jdXJyZW50VG9rZW5TdGFydCAhOiBQYXJzZUxvY2F0aW9uO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBfY3VycmVudFRva2VuVHlwZSAhOiBUb2tlblR5cGU7XG4gIHByaXZhdGUgX2V4cGFuc2lvbkNhc2VTdGFjazogVG9rZW5UeXBlW10gPSBbXTtcbiAgcHJpdmF0ZSBfaW5JbnRlcnBvbGF0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgdG9rZW5zOiBUb2tlbltdID0gW107XG4gIGVycm9yczogVG9rZW5FcnJvcltdID0gW107XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBfZmlsZSBUaGUgaHRtbCBzb3VyY2VcbiAgICogQHBhcmFtIF9nZXRUYWdEZWZpbml0aW9uXG4gICAqIEBwYXJhbSBfdG9rZW5pemVJY3UgV2hldGhlciB0byB0b2tlbml6ZSBJQ1UgbWVzc2FnZXMgKGNvbnNpZGVyZWQgYXMgdGV4dCBub2RlcyB3aGVuIGZhbHNlKVxuICAgKiBAcGFyYW0gX2ludGVycG9sYXRpb25Db25maWdcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZmlsZTogUGFyc2VTb3VyY2VGaWxlLCBwcml2YXRlIF9nZXRUYWdEZWZpbml0aW9uOiAodGFnTmFtZTogc3RyaW5nKSA9PiBUYWdEZWZpbml0aW9uLFxuICAgICAgcHJpdmF0ZSBfdG9rZW5pemVJY3U6IGJvb2xlYW4sXG4gICAgICBwcml2YXRlIF9pbnRlcnBvbGF0aW9uQ29uZmlnOiBJbnRlcnBvbGF0aW9uQ29uZmlnID0gREVGQVVMVF9JTlRFUlBPTEFUSU9OX0NPTkZJRykge1xuICAgIHRoaXMuX2lucHV0ID0gX2ZpbGUuY29udGVudDtcbiAgICB0aGlzLl9sZW5ndGggPSBfZmlsZS5jb250ZW50Lmxlbmd0aDtcbiAgICB0aGlzLl9hZHZhbmNlKCk7XG4gIH1cblxuICBwcml2YXRlIF9wcm9jZXNzQ2FycmlhZ2VSZXR1cm5zKGNvbnRlbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjcHJlcHJvY2Vzc2luZy10aGUtaW5wdXQtc3RyZWFtXG4gICAgLy8gSW4gb3JkZXIgdG8ga2VlcCB0aGUgb3JpZ2luYWwgcG9zaXRpb24gaW4gdGhlIHNvdXJjZSwgd2UgY2FuIG5vdFxuICAgIC8vIHByZS1wcm9jZXNzIGl0LlxuICAgIC8vIEluc3RlYWQgQ1JzIGFyZSBwcm9jZXNzZWQgcmlnaHQgYmVmb3JlIGluc3RhbnRpYXRpbmcgdGhlIHRva2Vucy5cbiAgICByZXR1cm4gY29udGVudC5yZXBsYWNlKF9DUl9PUl9DUkxGX1JFR0VYUCwgJ1xcbicpO1xuICB9XG5cbiAgdG9rZW5pemUoKTogVG9rZW5pemVSZXN1bHQge1xuICAgIHdoaWxlICh0aGlzLl9wZWVrICE9PSBjaGFycy4kRU9GKSB7XG4gICAgICBjb25zdCBzdGFydCA9IHRoaXMuX2dldExvY2F0aW9uKCk7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAodGhpcy5fYXR0ZW1wdENoYXJDb2RlKGNoYXJzLiRMVCkpIHtcbiAgICAgICAgICBpZiAodGhpcy5fYXR0ZW1wdENoYXJDb2RlKGNoYXJzLiRCQU5HKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2F0dGVtcHRDaGFyQ29kZShjaGFycy4kTEJSQUNLRVQpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2NvbnN1bWVDZGF0YShzdGFydCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2F0dGVtcHRDaGFyQ29kZShjaGFycy4kTUlOVVMpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2NvbnN1bWVDb21tZW50KHN0YXJ0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX2NvbnN1bWVEb2NUeXBlKHN0YXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2F0dGVtcHRDaGFyQ29kZShjaGFycy4kU0xBU0gpKSB7XG4gICAgICAgICAgICB0aGlzLl9jb25zdW1lVGFnQ2xvc2Uoc3RhcnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb25zdW1lVGFnT3BlbihzdGFydCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCEodGhpcy5fdG9rZW5pemVJY3UgJiYgdGhpcy5fdG9rZW5pemVFeHBhbnNpb25Gb3JtKCkpKSB7XG4gICAgICAgICAgdGhpcy5fY29uc3VtZVRleHQoKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIF9Db250cm9sRmxvd0Vycm9yKSB7XG4gICAgICAgICAgdGhpcy5lcnJvcnMucHVzaChlLmVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2JlZ2luVG9rZW4oVG9rZW5UeXBlLkVPRik7XG4gICAgdGhpcy5fZW5kVG9rZW4oW10pO1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVSZXN1bHQobWVyZ2VUZXh0VG9rZW5zKHRoaXMudG9rZW5zKSwgdGhpcy5lcnJvcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHdoZXRoZXIgYW4gSUNVIHRva2VuIGhhcyBiZWVuIGNyZWF0ZWRcbiAgICogQGludGVybmFsXG4gICAqL1xuICBwcml2YXRlIF90b2tlbml6ZUV4cGFuc2lvbkZvcm0oKTogYm9vbGVhbiB7XG4gICAgaWYgKGlzRXhwYW5zaW9uRm9ybVN0YXJ0KHRoaXMuX2lucHV0LCB0aGlzLl9pbmRleCwgdGhpcy5faW50ZXJwb2xhdGlvbkNvbmZpZykpIHtcbiAgICAgIHRoaXMuX2NvbnN1bWVFeHBhbnNpb25Gb3JtU3RhcnQoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChpc0V4cGFuc2lvbkNhc2VTdGFydCh0aGlzLl9wZWVrKSAmJiB0aGlzLl9pc0luRXhwYW5zaW9uRm9ybSgpKSB7XG4gICAgICB0aGlzLl9jb25zdW1lRXhwYW5zaW9uQ2FzZVN0YXJ0KCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcGVlayA9PT0gY2hhcnMuJFJCUkFDRSkge1xuICAgICAgaWYgKHRoaXMuX2lzSW5FeHBhbnNpb25DYXNlKCkpIHtcbiAgICAgICAgdGhpcy5fY29uc3VtZUV4cGFuc2lvbkNhc2VFbmQoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9pc0luRXhwYW5zaW9uRm9ybSgpKSB7XG4gICAgICAgIHRoaXMuX2NvbnN1bWVFeHBhbnNpb25Gb3JtRW5kKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldExvY2F0aW9uKCk6IFBhcnNlTG9jYXRpb24ge1xuICAgIHJldHVybiBuZXcgUGFyc2VMb2NhdGlvbih0aGlzLl9maWxlLCB0aGlzLl9pbmRleCwgdGhpcy5fbGluZSwgdGhpcy5fY29sdW1uKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFNwYW4oXG4gICAgICBzdGFydDogUGFyc2VMb2NhdGlvbiA9IHRoaXMuX2dldExvY2F0aW9uKCksXG4gICAgICBlbmQ6IFBhcnNlTG9jYXRpb24gPSB0aGlzLl9nZXRMb2NhdGlvbigpKTogUGFyc2VTb3VyY2VTcGFuIHtcbiAgICByZXR1cm4gbmV3IFBhcnNlU291cmNlU3BhbihzdGFydCwgZW5kKTtcbiAgfVxuXG4gIHByaXZhdGUgX2JlZ2luVG9rZW4odHlwZTogVG9rZW5UeXBlLCBzdGFydDogUGFyc2VMb2NhdGlvbiA9IHRoaXMuX2dldExvY2F0aW9uKCkpIHtcbiAgICB0aGlzLl9jdXJyZW50VG9rZW5TdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuX2N1cnJlbnRUb2tlblR5cGUgPSB0eXBlO1xuICB9XG5cbiAgcHJpdmF0ZSBfZW5kVG9rZW4ocGFydHM6IHN0cmluZ1tdLCBlbmQ6IFBhcnNlTG9jYXRpb24gPSB0aGlzLl9nZXRMb2NhdGlvbigpKTogVG9rZW4ge1xuICAgIGNvbnN0IHRva2VuID1cbiAgICAgICAgbmV3IFRva2VuKHRoaXMuX2N1cnJlbnRUb2tlblR5cGUsIHBhcnRzLCBuZXcgUGFyc2VTb3VyY2VTcGFuKHRoaXMuX2N1cnJlbnRUb2tlblN0YXJ0LCBlbmQpKTtcbiAgICB0aGlzLnRva2Vucy5wdXNoKHRva2VuKTtcbiAgICB0aGlzLl9jdXJyZW50VG9rZW5TdGFydCA9IG51bGwgITtcbiAgICB0aGlzLl9jdXJyZW50VG9rZW5UeXBlID0gbnVsbCAhO1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUVycm9yKG1zZzogc3RyaW5nLCBzcGFuOiBQYXJzZVNvdXJjZVNwYW4pOiBfQ29udHJvbEZsb3dFcnJvciB7XG4gICAgaWYgKHRoaXMuX2lzSW5FeHBhbnNpb25Gb3JtKCkpIHtcbiAgICAgIG1zZyArPSBgIChEbyB5b3UgaGF2ZSBhbiB1bmVzY2FwZWQgXCJ7XCIgaW4geW91ciB0ZW1wbGF0ZT8gVXNlIFwie3sgJ3snIH19XCIpIHRvIGVzY2FwZSBpdC4pYDtcbiAgICB9XG4gICAgY29uc3QgZXJyb3IgPSBuZXcgVG9rZW5FcnJvcihtc2csIHRoaXMuX2N1cnJlbnRUb2tlblR5cGUsIHNwYW4pO1xuICAgIHRoaXMuX2N1cnJlbnRUb2tlblN0YXJ0ID0gbnVsbCAhO1xuICAgIHRoaXMuX2N1cnJlbnRUb2tlblR5cGUgPSBudWxsICE7XG4gICAgcmV0dXJuIG5ldyBfQ29udHJvbEZsb3dFcnJvcihlcnJvcik7XG4gIH1cblxuICBwcml2YXRlIF9hZHZhbmNlKCkge1xuICAgIGlmICh0aGlzLl9pbmRleCA+PSB0aGlzLl9sZW5ndGgpIHtcbiAgICAgIHRocm93IHRoaXMuX2NyZWF0ZUVycm9yKF91bmV4cGVjdGVkQ2hhcmFjdGVyRXJyb3JNc2coY2hhcnMuJEVPRiksIHRoaXMuX2dldFNwYW4oKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9wZWVrID09PSBjaGFycy4kTEYpIHtcbiAgICAgIHRoaXMuX2xpbmUrKztcbiAgICAgIHRoaXMuX2NvbHVtbiA9IDA7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9wZWVrICE9PSBjaGFycy4kTEYgJiYgdGhpcy5fcGVlayAhPT0gY2hhcnMuJENSKSB7XG4gICAgICB0aGlzLl9jb2x1bW4rKztcbiAgICB9XG4gICAgdGhpcy5faW5kZXgrKztcbiAgICB0aGlzLl9wZWVrID0gdGhpcy5faW5kZXggPj0gdGhpcy5fbGVuZ3RoID8gY2hhcnMuJEVPRiA6IHRoaXMuX2lucHV0LmNoYXJDb2RlQXQodGhpcy5faW5kZXgpO1xuICAgIHRoaXMuX25leHRQZWVrID1cbiAgICAgICAgdGhpcy5faW5kZXggKyAxID49IHRoaXMuX2xlbmd0aCA/IGNoYXJzLiRFT0YgOiB0aGlzLl9pbnB1dC5jaGFyQ29kZUF0KHRoaXMuX2luZGV4ICsgMSk7XG4gIH1cblxuICBwcml2YXRlIF9hdHRlbXB0Q2hhckNvZGUoY2hhckNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9wZWVrID09PSBjaGFyQ29kZSkge1xuICAgICAgdGhpcy5fYWR2YW5jZSgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgX2F0dGVtcHRDaGFyQ29kZUNhc2VJbnNlbnNpdGl2ZShjaGFyQ29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKGNvbXBhcmVDaGFyQ29kZUNhc2VJbnNlbnNpdGl2ZSh0aGlzLl9wZWVrLCBjaGFyQ29kZSkpIHtcbiAgICAgIHRoaXMuX2FkdmFuY2UoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIF9yZXF1aXJlQ2hhckNvZGUoY2hhckNvZGU6IG51bWJlcikge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5fZ2V0TG9jYXRpb24oKTtcbiAgICBpZiAoIXRoaXMuX2F0dGVtcHRDaGFyQ29kZShjaGFyQ29kZSkpIHtcbiAgICAgIHRocm93IHRoaXMuX2NyZWF0ZUVycm9yKFxuICAgICAgICAgIF91bmV4cGVjdGVkQ2hhcmFjdGVyRXJyb3JNc2codGhpcy5fcGVlayksIHRoaXMuX2dldFNwYW4obG9jYXRpb24sIGxvY2F0aW9uKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYXR0ZW1wdFN0cihjaGFyczogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbGVuID0gY2hhcnMubGVuZ3RoO1xuICAgIGlmICh0aGlzLl9pbmRleCArIGxlbiA+IHRoaXMuX2xlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBpbml0aWFsUG9zaXRpb24gPSB0aGlzLl9zYXZlUG9zaXRpb24oKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoIXRoaXMuX2F0dGVtcHRDaGFyQ29kZShjaGFycy5jaGFyQ29kZUF0KGkpKSkge1xuICAgICAgICAvLyBJZiBhdHRlbXB0aW5nIHRvIHBhcnNlIHRoZSBzdHJpbmcgZmFpbHMsIHdlIHdhbnQgdG8gcmVzZXQgdGhlIHBhcnNlclxuICAgICAgICAvLyB0byB3aGVyZSBpdCB3YXMgYmVmb3JlIHRoZSBhdHRlbXB0XG4gICAgICAgIHRoaXMuX3Jlc3RvcmVQb3NpdGlvbihpbml0aWFsUG9zaXRpb24pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXR0ZW1wdFN0ckNhc2VJbnNlbnNpdGl2ZShjaGFyczogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCF0aGlzLl9hdHRlbXB0Q2hhckNvZGVDYXNlSW5zZW5zaXRpdmUoY2hhcnMuY2hhckNvZGVBdChpKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlcXVpcmVTdHIoY2hhcnM6IHN0cmluZykge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5fZ2V0TG9jYXRpb24oKTtcbiAgICBpZiAoIXRoaXMuX2F0dGVtcHRTdHIoY2hhcnMpKSB7XG4gICAgICB0aHJvdyB0aGlzLl9jcmVhdGVFcnJvcihfdW5leHBlY3RlZENoYXJhY3RlckVycm9yTXNnKHRoaXMuX3BlZWspLCB0aGlzLl9nZXRTcGFuKGxvY2F0aW9uKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYXR0ZW1wdENoYXJDb2RlVW50aWxGbihwcmVkaWNhdGU6IChjb2RlOiBudW1iZXIpID0+IGJvb2xlYW4pIHtcbiAgICB3aGlsZSAoIXByZWRpY2F0ZSh0aGlzLl9wZWVrKSkge1xuICAgICAgdGhpcy5fYWR2YW5jZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlcXVpcmVDaGFyQ29kZVVudGlsRm4ocHJlZGljYXRlOiAoY29kZTogbnVtYmVyKSA9PiBib29sZWFuLCBsZW46IG51bWJlcikge1xuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5fZ2V0TG9jYXRpb24oKTtcbiAgICB0aGlzLl9hdHRlbXB0Q2hhckNvZGVVbnRpbEZuKHByZWRpY2F0ZSk7XG4gICAgaWYgKHRoaXMuX2luZGV4IC0gc3RhcnQub2Zmc2V0IDwgbGVuKSB7XG4gICAgICB0aHJvdyB0aGlzLl9jcmVhdGVFcnJvcihcbiAgICAgICAgICBfdW5leHBlY3RlZENoYXJhY3RlckVycm9yTXNnKHRoaXMuX3BlZWspLCB0aGlzLl9nZXRTcGFuKHN0YXJ0LCBzdGFydCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2F0dGVtcHRVbnRpbENoYXIoY2hhcjogbnVtYmVyKSB7XG4gICAgd2hpbGUgKHRoaXMuX3BlZWsgIT09IGNoYXIpIHtcbiAgICAgIHRoaXMuX2FkdmFuY2UoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZWFkQ2hhcihkZWNvZGVFbnRpdGllczogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgaWYgKGRlY29kZUVudGl0aWVzICYmIHRoaXMuX3BlZWsgPT09IGNoYXJzLiRBTVBFUlNBTkQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZWNvZGVFbnRpdHkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9pbmRleDtcbiAgICAgIHRoaXMuX2FkdmFuY2UoKTtcbiAgICAgIHJldHVybiB0aGlzLl9pbnB1dFtpbmRleF07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZGVjb2RlRW50aXR5KCk6IHN0cmluZyB7XG4gICAgY29uc3Qgc3RhcnQgPSB0aGlzLl9nZXRMb2NhdGlvbigpO1xuICAgIHRoaXMuX2FkdmFuY2UoKTtcbiAgICBpZiAodGhpcy5fYXR0ZW1wdENoYXJDb2RlKGNoYXJzLiRIQVNIKSkge1xuICAgICAgY29uc3QgaXNIZXggPSB0aGlzLl9hdHRlbXB0Q2hhckNvZGUoY2hhcnMuJHgpIHx8IHRoaXMuX2F0dGVtcHRDaGFyQ29kZShjaGFycy4kWCk7XG4gICAgICBjb25zdCBudW1iZXJTdGFydCA9IHRoaXMuX2dldExvY2F0aW9uKCkub2Zmc2V0O1xuICAgICAgdGhpcy5fYXR0ZW1wdENoYXJDb2RlVW50aWxGbihpc0RpZ2l0RW50aXR5RW5kKTtcbiAgICAgIGlmICh0aGlzLl9wZWVrICE9IGNoYXJzLiRTRU1JQ09MT04pIHtcbiAgICAgICAgdGhyb3cgdGhpcy5fY3JlYXRlRXJyb3IoX3VuZXhwZWN0ZWRDaGFyYWN0ZXJFcnJvck1zZyh0aGlzLl9wZWVrKSwgdGhpcy5fZ2V0U3BhbigpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2FkdmFuY2UoKTtcbiAgICAgIGNvbnN0IHN0ck51bSA9IHRoaXMuX2lucHV0LnN1YnN0cmluZyhudW1iZXJTdGFydCwgdGhpcy5faW5kZXggLSAxKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNoYXJDb2RlID0gcGFyc2VJbnQoc3RyTnVtLCBpc0hleCA/IDE2IDogMTApO1xuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyQ29kZSk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgY29uc3QgZW50aXR5ID0gdGhpcy5faW5wdXQuc3Vic3RyaW5nKHN0YXJ0Lm9mZnNldCArIDEsIHRoaXMuX2luZGV4IC0gMSk7XG4gICAgICAgIHRocm93IHRoaXMuX2NyZWF0ZUVycm9yKF91bmtub3duRW50aXR5RXJyb3JNc2coZW50aXR5KSwgdGhpcy5fZ2V0U3BhbihzdGFydCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzdGFydFBvc2l0aW9uID0gdGhpcy5fc2F2ZVBvc2l0aW9uKCk7XG4gICAgICB0aGlzLl9hdHRlbXB0Q2hhckNvZGVVbnRpbEZuKGlzTmFtZWRFbnRpdHlFbmQpO1xuICAgICAgaWYgKHRoaXMuX3BlZWsgIT0gY2hhcnMuJFNFTUlDT0xPTikge1xuICAgICAgICB0aGlzLl9yZXN0b3JlUG9zaXRpb24oc3RhcnRQb3NpdGlvbik7XG4gICAgICAgIHJldHVybiAnJic7XG4gICAgICB9XG4gICAgICB0aGlzLl9hZHZhbmNlKCk7XG4gICAgICBjb25zdCBuYW1lID0gdGhpcy5faW5wdXQuc3Vic3RyaW5nKHN0YXJ0Lm9mZnNldCArIDEsIHRoaXMuX2luZGV4IC0gMSk7XG4gICAgICBjb25zdCBjaGFyID0gTkFNRURfRU5USVRJRVNbbmFtZV07XG4gICAgICBpZiAoIWNoYXIpIHtcbiAgICAgICAgdGhyb3cgdGhpcy5fY3JlYXRlRXJyb3IoX3Vua25vd25FbnRpdHlFcnJvck1zZyhuYW1lKSwgdGhpcy5fZ2V0U3BhbihzdGFydCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNoYXI7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZVJhd1RleHQoXG4gICAgICBkZWNvZGVFbnRpdGllczogYm9vbGVhbiwgZmlyc3RDaGFyT2ZFbmQ6IG51bWJlciwgYXR0ZW1wdEVuZFJlc3Q6ICgpID0+IGJvb2xlYW4pOiBUb2tlbiB7XG4gICAgbGV0IHRhZ0Nsb3NlU3RhcnQ6IFBhcnNlTG9jYXRpb247XG4gICAgY29uc3QgdGV4dFN0YXJ0ID0gdGhpcy5fZ2V0TG9jYXRpb24oKTtcbiAgICB0aGlzLl9iZWdpblRva2VuKGRlY29kZUVudGl0aWVzID8gVG9rZW5UeXBlLkVTQ0FQQUJMRV9SQVdfVEVYVCA6IFRva2VuVHlwZS5SQVdfVEVYVCwgdGV4dFN0YXJ0KTtcbiAgICBjb25zdCBwYXJ0czogc3RyaW5nW10gPSBbXTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgdGFnQ2xvc2VTdGFydCA9IHRoaXMuX2dldExvY2F0aW9uKCk7XG4gICAgICBpZiAodGhpcy5fYXR0ZW1wdENoYXJDb2RlKGZpcnN0Q2hhck9mRW5kKSAmJiBhdHRlbXB0RW5kUmVzdCgpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX2luZGV4ID4gdGFnQ2xvc2VTdGFydC5vZmZzZXQpIHtcbiAgICAgICAgLy8gYWRkIHRoZSBjaGFyYWN0ZXJzIGNvbnN1bWVkIGJ5IHRoZSBwcmV2aW91cyBpZiBzdGF0ZW1lbnQgdG8gdGhlIG91dHB1dFxuICAgICAgICBwYXJ0cy5wdXNoKHRoaXMuX2lucHV0LnN1YnN0cmluZyh0YWdDbG9zZVN0YXJ0Lm9mZnNldCwgdGhpcy5faW5kZXgpKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlICh0aGlzLl9wZWVrICE9PSBmaXJzdENoYXJPZkVuZCkge1xuICAgICAgICBwYXJ0cy5wdXNoKHRoaXMuX3JlYWRDaGFyKGRlY29kZUVudGl0aWVzKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9lbmRUb2tlbihbdGhpcy5fcHJvY2Vzc0NhcnJpYWdlUmV0dXJucyhwYXJ0cy5qb2luKCcnKSldLCB0YWdDbG9zZVN0YXJ0KTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnN1bWVDb21tZW50KHN0YXJ0OiBQYXJzZUxvY2F0aW9uKSB7XG4gICAgdGhpcy5fYmVnaW5Ub2tlbihUb2tlblR5cGUuQ09NTUVOVF9TVEFSVCwgc3RhcnQpO1xuICAgIHRoaXMuX3JlcXVpcmVDaGFyQ29kZShjaGFycy4kTUlOVVMpO1xuICAgIHRoaXMuX2VuZFRva2VuKFtdKTtcbiAgICBjb25zdCB0ZXh0VG9rZW4gPSB0aGlzLl9jb25zdW1lUmF3VGV4dChmYWxzZSwgY2hhcnMuJE1JTlVTLCAoKSA9PiB0aGlzLl9hdHRlbXB0U3RyKCctPicpKTtcbiAgICB0aGlzLl9iZWdpblRva2VuKFRva2VuVHlwZS5DT01NRU5UX0VORCwgdGV4dFRva2VuLnNvdXJjZVNwYW4uZW5kKTtcbiAgICB0aGlzLl9lbmRUb2tlbihbXSk7XG4gIH1cblxuICBwcml2YXRlIF9jb25zdW1lQ2RhdGEoc3RhcnQ6IFBhcnNlTG9jYXRpb24pIHtcbiAgICB0aGlzLl9iZWdpblRva2VuKFRva2VuVHlwZS5DREFUQV9TVEFSVCwgc3RhcnQpO1xuICAgIHRoaXMuX3JlcXVpcmVTdHIoJ0NEQVRBWycpO1xuICAgIHRoaXMuX2VuZFRva2VuKFtdKTtcbiAgICBjb25zdCB0ZXh0VG9rZW4gPSB0aGlzLl9jb25zdW1lUmF3VGV4dChmYWxzZSwgY2hhcnMuJFJCUkFDS0VULCAoKSA9PiB0aGlzLl9hdHRlbXB0U3RyKCddPicpKTtcbiAgICB0aGlzLl9iZWdpblRva2VuKFRva2VuVHlwZS5DREFUQV9FTkQsIHRleHRUb2tlbi5zb3VyY2VTcGFuLmVuZCk7XG4gICAgdGhpcy5fZW5kVG9rZW4oW10pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZURvY1R5cGUoc3RhcnQ6IFBhcnNlTG9jYXRpb24pIHtcbiAgICB0aGlzLl9iZWdpblRva2VuKFRva2VuVHlwZS5ET0NfVFlQRSwgc3RhcnQpO1xuICAgIHRoaXMuX2F0dGVtcHRVbnRpbENoYXIoY2hhcnMuJEdUKTtcbiAgICB0aGlzLl9hZHZhbmNlKCk7XG4gICAgdGhpcy5fZW5kVG9rZW4oW3RoaXMuX2lucHV0LnN1YnN0cmluZyhzdGFydC5vZmZzZXQgKyAyLCB0aGlzLl9pbmRleCAtIDEpXSk7XG4gIH1cblxuICBwcml2YXRlIF9jb25zdW1lUHJlZml4QW5kTmFtZSgpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgbmFtZU9yUHJlZml4U3RhcnQgPSB0aGlzLl9pbmRleDtcbiAgICBsZXQgcHJlZml4OiBzdHJpbmcgPSBudWxsICE7XG4gICAgd2hpbGUgKHRoaXMuX3BlZWsgIT09IGNoYXJzLiRDT0xPTiAmJiAhaXNQcmVmaXhFbmQodGhpcy5fcGVlaykpIHtcbiAgICAgIHRoaXMuX2FkdmFuY2UoKTtcbiAgICB9XG4gICAgbGV0IG5hbWVTdGFydDogbnVtYmVyO1xuICAgIGlmICh0aGlzLl9wZWVrID09PSBjaGFycy4kQ09MT04pIHtcbiAgICAgIHRoaXMuX2FkdmFuY2UoKTtcbiAgICAgIHByZWZpeCA9IHRoaXMuX2lucHV0LnN1YnN0cmluZyhuYW1lT3JQcmVmaXhTdGFydCwgdGhpcy5faW5kZXggLSAxKTtcbiAgICAgIG5hbWVTdGFydCA9IHRoaXMuX2luZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICBuYW1lU3RhcnQgPSBuYW1lT3JQcmVmaXhTdGFydDtcbiAgICB9XG4gICAgdGhpcy5fcmVxdWlyZUNoYXJDb2RlVW50aWxGbihpc05hbWVFbmQsIHRoaXMuX2luZGV4ID09PSBuYW1lU3RhcnQgPyAxIDogMCk7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuX2lucHV0LnN1YnN0cmluZyhuYW1lU3RhcnQsIHRoaXMuX2luZGV4KTtcbiAgICByZXR1cm4gW3ByZWZpeCwgbmFtZV07XG4gIH1cblxuICBwcml2YXRlIF9jb25zdW1lVGFnT3BlbihzdGFydDogUGFyc2VMb2NhdGlvbikge1xuICAgIGNvbnN0IHNhdmVkUG9zID0gdGhpcy5fc2F2ZVBvc2l0aW9uKCk7XG4gICAgbGV0IHRhZ05hbWU6IHN0cmluZztcbiAgICBsZXQgbG93ZXJjYXNlVGFnTmFtZTogc3RyaW5nO1xuICAgIHRyeSB7XG4gICAgICBpZiAoIWNoYXJzLmlzQXNjaWlMZXR0ZXIodGhpcy5fcGVlaykpIHtcbiAgICAgICAgdGhyb3cgdGhpcy5fY3JlYXRlRXJyb3IoX3VuZXhwZWN0ZWRDaGFyYWN0ZXJFcnJvck1zZyh0aGlzLl9wZWVrKSwgdGhpcy5fZ2V0U3BhbigpKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5hbWVTdGFydCA9IHRoaXMuX2luZGV4O1xuICAgICAgdGhpcy5fY29uc3VtZVRhZ09wZW5TdGFydChzdGFydCk7XG4gICAgICB0YWdOYW1lID0gdGhpcy5faW5wdXQuc3Vic3RyaW5nKG5hbWVTdGFydCwgdGhpcy5faW5kZXgpO1xuICAgICAgbG93ZXJjYXNlVGFnTmFtZSA9IHRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIHRoaXMuX2F0dGVtcHRDaGFyQ29kZVVudGlsRm4oaXNOb3RXaGl0ZXNwYWNlKTtcbiAgICAgIHdoaWxlICh0aGlzLl9wZWVrICE9PSBjaGFycy4kU0xBU0ggJiYgdGhpcy5fcGVlayAhPT0gY2hhcnMuJEdUKSB7XG4gICAgICAgIHRoaXMuX2NvbnN1bWVBdHRyaWJ1dGVOYW1lKCk7XG4gICAgICAgIHRoaXMuX2F0dGVtcHRDaGFyQ29kZVVudGlsRm4oaXNOb3RXaGl0ZXNwYWNlKTtcbiAgICAgICAgaWYgKHRoaXMuX2F0dGVtcHRDaGFyQ29kZShjaGFycy4kRVEpKSB7XG4gICAgICAgICAgdGhpcy5fYXR0ZW1wdENoYXJDb2RlVW50aWxGbihpc05vdFdoaXRlc3BhY2UpO1xuICAgICAgICAgIHRoaXMuX2NvbnN1bWVBdHRyaWJ1dGVWYWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2F0dGVtcHRDaGFyQ29kZVVudGlsRm4oaXNOb3RXaGl0ZXNwYWNlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2NvbnN1bWVUYWdPcGVuRW5kKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBfQ29udHJvbEZsb3dFcnJvcikge1xuICAgICAgICAvLyBXaGVuIHRoZSBzdGFydCB0YWcgaXMgaW52YWxpZCwgYXNzdW1lIHdlIHdhbnQgYSBcIjxcIlxuICAgICAgICB0aGlzLl9yZXN0b3JlUG9zaXRpb24oc2F2ZWRQb3MpO1xuICAgICAgICAvLyBCYWNrIHRvIGJhY2sgdGV4dCB0b2tlbnMgYXJlIG1lcmdlZCBhdCB0aGUgZW5kXG4gICAgICAgIHRoaXMuX2JlZ2luVG9rZW4oVG9rZW5UeXBlLlRFWFQsIHN0YXJ0KTtcbiAgICAgICAgdGhpcy5fZW5kVG9rZW4oWyc8J10pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRocm93IGU7XG4gICAgfVxuXG4gICAgY29uc3QgY29udGVudFRva2VuVHlwZSA9IHRoaXMuX2dldFRhZ0RlZmluaXRpb24odGFnTmFtZSkuY29udGVudFR5cGU7XG5cbiAgICBpZiAoY29udGVudFRva2VuVHlwZSA9PT0gVGFnQ29udGVudFR5cGUuUkFXX1RFWFQpIHtcbiAgICAgIHRoaXMuX2NvbnN1bWVSYXdUZXh0V2l0aFRhZ0Nsb3NlKGxvd2VyY2FzZVRhZ05hbWUsIGZhbHNlKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRlbnRUb2tlblR5cGUgPT09IFRhZ0NvbnRlbnRUeXBlLkVTQ0FQQUJMRV9SQVdfVEVYVCkge1xuICAgICAgdGhpcy5fY29uc3VtZVJhd1RleHRXaXRoVGFnQ2xvc2UobG93ZXJjYXNlVGFnTmFtZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZVJhd1RleHRXaXRoVGFnQ2xvc2UobG93ZXJjYXNlVGFnTmFtZTogc3RyaW5nLCBkZWNvZGVFbnRpdGllczogYm9vbGVhbikge1xuICAgIGNvbnN0IHRleHRUb2tlbiA9IHRoaXMuX2NvbnN1bWVSYXdUZXh0KGRlY29kZUVudGl0aWVzLCBjaGFycy4kTFQsICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5fYXR0ZW1wdENoYXJDb2RlKGNoYXJzLiRTTEFTSCkpIHJldHVybiBmYWxzZTtcbiAgICAgIHRoaXMuX2F0dGVtcHRDaGFyQ29kZVVudGlsRm4oaXNOb3RXaGl0ZXNwYWNlKTtcbiAgICAgIGlmICghdGhpcy5fYXR0ZW1wdFN0ckNhc2VJbnNlbnNpdGl2ZShsb3dlcmNhc2VUYWdOYW1lKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgdGhpcy5fYXR0ZW1wdENoYXJDb2RlVW50aWxGbihpc05vdFdoaXRlc3BhY2UpO1xuICAgICAgcmV0dXJuIHRoaXMuX2F0dGVtcHRDaGFyQ29kZShjaGFycy4kR1QpO1xuICAgIH0pO1xuICAgIHRoaXMuX2JlZ2luVG9rZW4oVG9rZW5UeXBlLlRBR19DTE9TRSwgdGV4dFRva2VuLnNvdXJjZVNwYW4uZW5kKTtcbiAgICB0aGlzLl9lbmRUb2tlbihbbnVsbCAhLCBsb3dlcmNhc2VUYWdOYW1lXSk7XG4gIH1cblxuICBwcml2YXRlIF9jb25zdW1lVGFnT3BlblN0YXJ0KHN0YXJ0OiBQYXJzZUxvY2F0aW9uKSB7XG4gICAgdGhpcy5fYmVnaW5Ub2tlbihUb2tlblR5cGUuVEFHX09QRU5fU1RBUlQsIHN0YXJ0KTtcbiAgICBjb25zdCBwYXJ0cyA9IHRoaXMuX2NvbnN1bWVQcmVmaXhBbmROYW1lKCk7XG4gICAgdGhpcy5fZW5kVG9rZW4ocGFydHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29uc3VtZUF0dHJpYnV0ZU5hbWUoKSB7XG4gICAgdGhpcy5fYmVnaW5Ub2tlbihUb2tlblR5cGUuQVRUUl9OQU1FKTtcbiAgICBjb25zdCBwcmVmaXhBbmROYW1lID0gdGhpcy5fY29uc3VtZVByZWZpeEFuZE5hbWUoKTtcbiAgICB0aGlzLl9lbmRUb2tlbihwcmVmaXhBbmROYW1lKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnN1bWVBdHRyaWJ1dGVWYWx1ZSgpIHtcbiAgICB0aGlzLl9iZWdpblRva2VuKFRva2VuVHlwZS5BVFRSX1ZBTFVFKTtcbiAgICBsZXQgdmFsdWU6IHN0cmluZztcbiAgICBpZiAodGhpcy5fcGVlayA9PT0gY2hhcnMuJFNRIHx8IHRoaXMuX3BlZWsgPT09IGNoYXJzLiREUSkge1xuICAgICAgY29uc3QgcXVvdGVDaGFyID0gdGhpcy5fcGVlaztcbiAgICAgIHRoaXMuX2FkdmFuY2UoKTtcbiAgICAgIGNvbnN0IHBhcnRzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgd2hpbGUgKHRoaXMuX3BlZWsgIT09IHF1b3RlQ2hhcikge1xuICAgICAgICBwYXJ0cy5wdXNoKHRoaXMuX3JlYWRDaGFyKHRydWUpKTtcbiAgICAgIH1cbiAgICAgIHZhbHVlID0gcGFydHMuam9pbignJyk7XG4gICAgICB0aGlzLl9hZHZhbmNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHZhbHVlU3RhcnQgPSB0aGlzLl9pbmRleDtcbiAgICAgIHRoaXMuX3JlcXVpcmVDaGFyQ29kZVVudGlsRm4oaXNOYW1lRW5kLCAxKTtcbiAgICAgIHZhbHVlID0gdGhpcy5faW5wdXQuc3Vic3RyaW5nKHZhbHVlU3RhcnQsIHRoaXMuX2luZGV4KTtcbiAgICB9XG4gICAgdGhpcy5fZW5kVG9rZW4oW3RoaXMuX3Byb2Nlc3NDYXJyaWFnZVJldHVybnModmFsdWUpXSk7XG4gIH1cblxuICBwcml2YXRlIF9jb25zdW1lVGFnT3BlbkVuZCgpIHtcbiAgICBjb25zdCB0b2tlblR5cGUgPVxuICAgICAgICB0aGlzLl9hdHRlbXB0Q2hhckNvZGUoY2hhcnMuJFNMQVNIKSA/IFRva2VuVHlwZS5UQUdfT1BFTl9FTkRfVk9JRCA6IFRva2VuVHlwZS5UQUdfT1BFTl9FTkQ7XG4gICAgdGhpcy5fYmVnaW5Ub2tlbih0b2tlblR5cGUpO1xuICAgIHRoaXMuX3JlcXVpcmVDaGFyQ29kZShjaGFycy4kR1QpO1xuICAgIHRoaXMuX2VuZFRva2VuKFtdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnN1bWVUYWdDbG9zZShzdGFydDogUGFyc2VMb2NhdGlvbikge1xuICAgIHRoaXMuX2JlZ2luVG9rZW4oVG9rZW5UeXBlLlRBR19DTE9TRSwgc3RhcnQpO1xuICAgIHRoaXMuX2F0dGVtcHRDaGFyQ29kZVVudGlsRm4oaXNOb3RXaGl0ZXNwYWNlKTtcbiAgICBjb25zdCBwcmVmaXhBbmROYW1lID0gdGhpcy5fY29uc3VtZVByZWZpeEFuZE5hbWUoKTtcbiAgICB0aGlzLl9hdHRlbXB0Q2hhckNvZGVVbnRpbEZuKGlzTm90V2hpdGVzcGFjZSk7XG4gICAgdGhpcy5fcmVxdWlyZUNoYXJDb2RlKGNoYXJzLiRHVCk7XG4gICAgdGhpcy5fZW5kVG9rZW4ocHJlZml4QW5kTmFtZSk7XG4gIH1cblxuICBwcml2YXRlIF9jb25zdW1lRXhwYW5zaW9uRm9ybVN0YXJ0KCkge1xuICAgIHRoaXMuX2JlZ2luVG9rZW4oVG9rZW5UeXBlLkVYUEFOU0lPTl9GT1JNX1NUQVJULCB0aGlzLl9nZXRMb2NhdGlvbigpKTtcbiAgICB0aGlzLl9yZXF1aXJlQ2hhckNvZGUoY2hhcnMuJExCUkFDRSk7XG4gICAgdGhpcy5fZW5kVG9rZW4oW10pO1xuXG4gICAgdGhpcy5fZXhwYW5zaW9uQ2FzZVN0YWNrLnB1c2goVG9rZW5UeXBlLkVYUEFOU0lPTl9GT1JNX1NUQVJUKTtcblxuICAgIHRoaXMuX2JlZ2luVG9rZW4oVG9rZW5UeXBlLlJBV19URVhULCB0aGlzLl9nZXRMb2NhdGlvbigpKTtcbiAgICBjb25zdCBjb25kaXRpb24gPSB0aGlzLl9yZWFkVW50aWwoY2hhcnMuJENPTU1BKTtcbiAgICB0aGlzLl9lbmRUb2tlbihbY29uZGl0aW9uXSwgdGhpcy5fZ2V0TG9jYXRpb24oKSk7XG4gICAgdGhpcy5fcmVxdWlyZUNoYXJDb2RlKGNoYXJzLiRDT01NQSk7XG4gICAgdGhpcy5fYXR0ZW1wdENoYXJDb2RlVW50aWxGbihpc05vdFdoaXRlc3BhY2UpO1xuXG4gICAgdGhpcy5fYmVnaW5Ub2tlbihUb2tlblR5cGUuUkFXX1RFWFQsIHRoaXMuX2dldExvY2F0aW9uKCkpO1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLl9yZWFkVW50aWwoY2hhcnMuJENPTU1BKTtcbiAgICB0aGlzLl9lbmRUb2tlbihbdHlwZV0sIHRoaXMuX2dldExvY2F0aW9uKCkpO1xuICAgIHRoaXMuX3JlcXVpcmVDaGFyQ29kZShjaGFycy4kQ09NTUEpO1xuICAgIHRoaXMuX2F0dGVtcHRDaGFyQ29kZVVudGlsRm4oaXNOb3RXaGl0ZXNwYWNlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnN1bWVFeHBhbnNpb25DYXNlU3RhcnQoKSB7XG4gICAgdGhpcy5fYmVnaW5Ub2tlbihUb2tlblR5cGUuRVhQQU5TSU9OX0NBU0VfVkFMVUUsIHRoaXMuX2dldExvY2F0aW9uKCkpO1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fcmVhZFVudGlsKGNoYXJzLiRMQlJBQ0UpLnRyaW0oKTtcbiAgICB0aGlzLl9lbmRUb2tlbihbdmFsdWVdLCB0aGlzLl9nZXRMb2NhdGlvbigpKTtcbiAgICB0aGlzLl9hdHRlbXB0Q2hhckNvZGVVbnRpbEZuKGlzTm90V2hpdGVzcGFjZSk7XG5cbiAgICB0aGlzLl9iZWdpblRva2VuKFRva2VuVHlwZS5FWFBBTlNJT05fQ0FTRV9FWFBfU1RBUlQsIHRoaXMuX2dldExvY2F0aW9uKCkpO1xuICAgIHRoaXMuX3JlcXVpcmVDaGFyQ29kZShjaGFycy4kTEJSQUNFKTtcbiAgICB0aGlzLl9lbmRUb2tlbihbXSwgdGhpcy5fZ2V0TG9jYXRpb24oKSk7XG4gICAgdGhpcy5fYXR0ZW1wdENoYXJDb2RlVW50aWxGbihpc05vdFdoaXRlc3BhY2UpO1xuXG4gICAgdGhpcy5fZXhwYW5zaW9uQ2FzZVN0YWNrLnB1c2goVG9rZW5UeXBlLkVYUEFOU0lPTl9DQVNFX0VYUF9TVEFSVCk7XG4gIH1cblxuICBwcml2YXRlIF9jb25zdW1lRXhwYW5zaW9uQ2FzZUVuZCgpIHtcbiAgICB0aGlzLl9iZWdpblRva2VuKFRva2VuVHlwZS5FWFBBTlNJT05fQ0FTRV9FWFBfRU5ELCB0aGlzLl9nZXRMb2NhdGlvbigpKTtcbiAgICB0aGlzLl9yZXF1aXJlQ2hhckNvZGUoY2hhcnMuJFJCUkFDRSk7XG4gICAgdGhpcy5fZW5kVG9rZW4oW10sIHRoaXMuX2dldExvY2F0aW9uKCkpO1xuICAgIHRoaXMuX2F0dGVtcHRDaGFyQ29kZVVudGlsRm4oaXNOb3RXaGl0ZXNwYWNlKTtcblxuICAgIHRoaXMuX2V4cGFuc2lvbkNhc2VTdGFjay5wb3AoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnN1bWVFeHBhbnNpb25Gb3JtRW5kKCkge1xuICAgIHRoaXMuX2JlZ2luVG9rZW4oVG9rZW5UeXBlLkVYUEFOU0lPTl9GT1JNX0VORCwgdGhpcy5fZ2V0TG9jYXRpb24oKSk7XG4gICAgdGhpcy5fcmVxdWlyZUNoYXJDb2RlKGNoYXJzLiRSQlJBQ0UpO1xuICAgIHRoaXMuX2VuZFRva2VuKFtdKTtcblxuICAgIHRoaXMuX2V4cGFuc2lvbkNhc2VTdGFjay5wb3AoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnN1bWVUZXh0KCkge1xuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5fZ2V0TG9jYXRpb24oKTtcbiAgICB0aGlzLl9iZWdpblRva2VuKFRva2VuVHlwZS5URVhULCBzdGFydCk7XG4gICAgY29uc3QgcGFydHM6IHN0cmluZ1tdID0gW107XG5cbiAgICBkbyB7XG4gICAgICBpZiAodGhpcy5faW50ZXJwb2xhdGlvbkNvbmZpZyAmJiB0aGlzLl9hdHRlbXB0U3RyKHRoaXMuX2ludGVycG9sYXRpb25Db25maWcuc3RhcnQpKSB7XG4gICAgICAgIHBhcnRzLnB1c2godGhpcy5faW50ZXJwb2xhdGlvbkNvbmZpZy5zdGFydCk7XG4gICAgICAgIHRoaXMuX2luSW50ZXJwb2xhdGlvbiA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHRoaXMuX2ludGVycG9sYXRpb25Db25maWcgJiYgdGhpcy5faW5JbnRlcnBvbGF0aW9uICYmXG4gICAgICAgICAgdGhpcy5fYXR0ZW1wdFN0cih0aGlzLl9pbnRlcnBvbGF0aW9uQ29uZmlnLmVuZCkpIHtcbiAgICAgICAgcGFydHMucHVzaCh0aGlzLl9pbnRlcnBvbGF0aW9uQ29uZmlnLmVuZCk7XG4gICAgICAgIHRoaXMuX2luSW50ZXJwb2xhdGlvbiA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFydHMucHVzaCh0aGlzLl9yZWFkQ2hhcih0cnVlKSk7XG4gICAgICB9XG4gICAgfSB3aGlsZSAoIXRoaXMuX2lzVGV4dEVuZCgpKTtcblxuICAgIHRoaXMuX2VuZFRva2VuKFt0aGlzLl9wcm9jZXNzQ2FycmlhZ2VSZXR1cm5zKHBhcnRzLmpvaW4oJycpKV0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaXNUZXh0RW5kKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9wZWVrID09PSBjaGFycy4kTFQgfHwgdGhpcy5fcGVlayA9PT0gY2hhcnMuJEVPRikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3Rva2VuaXplSWN1ICYmICF0aGlzLl9pbkludGVycG9sYXRpb24pIHtcbiAgICAgIGlmIChpc0V4cGFuc2lvbkZvcm1TdGFydCh0aGlzLl9pbnB1dCwgdGhpcy5faW5kZXgsIHRoaXMuX2ludGVycG9sYXRpb25Db25maWcpKSB7XG4gICAgICAgIC8vIHN0YXJ0IG9mIGFuIGV4cGFuc2lvbiBmb3JtXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fcGVlayA9PT0gY2hhcnMuJFJCUkFDRSAmJiB0aGlzLl9pc0luRXhwYW5zaW9uQ2FzZSgpKSB7XG4gICAgICAgIC8vIGVuZCBvZiBhbmQgZXhwYW5zaW9uIGNhc2VcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2F2ZVBvc2l0aW9uKCk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xuICAgIHJldHVybiBbdGhpcy5fcGVlaywgdGhpcy5faW5kZXgsIHRoaXMuX2NvbHVtbiwgdGhpcy5fbGluZSwgdGhpcy50b2tlbnMubGVuZ3RoXTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlYWRVbnRpbChjaGFyOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5faW5kZXg7XG4gICAgdGhpcy5fYXR0ZW1wdFVudGlsQ2hhcihjaGFyKTtcbiAgICByZXR1cm4gdGhpcy5faW5wdXQuc3Vic3RyaW5nKHN0YXJ0LCB0aGlzLl9pbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZXN0b3JlUG9zaXRpb24ocG9zaXRpb246IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0pOiB2b2lkIHtcbiAgICB0aGlzLl9wZWVrID0gcG9zaXRpb25bMF07XG4gICAgdGhpcy5faW5kZXggPSBwb3NpdGlvblsxXTtcbiAgICB0aGlzLl9jb2x1bW4gPSBwb3NpdGlvblsyXTtcbiAgICB0aGlzLl9saW5lID0gcG9zaXRpb25bM107XG4gICAgY29uc3QgbmJUb2tlbnMgPSBwb3NpdGlvbls0XTtcbiAgICBpZiAobmJUb2tlbnMgPCB0aGlzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgIC8vIHJlbW92ZSBhbnkgZXh0cmEgdG9rZW5zXG4gICAgICB0aGlzLnRva2VucyA9IHRoaXMudG9rZW5zLnNsaWNlKDAsIG5iVG9rZW5zKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pc0luRXhwYW5zaW9uQ2FzZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwYW5zaW9uQ2FzZVN0YWNrLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgdGhpcy5fZXhwYW5zaW9uQ2FzZVN0YWNrW3RoaXMuX2V4cGFuc2lvbkNhc2VTdGFjay5sZW5ndGggLSAxXSA9PT1cbiAgICAgICAgVG9rZW5UeXBlLkVYUEFOU0lPTl9DQVNFX0VYUF9TVEFSVDtcbiAgfVxuXG4gIHByaXZhdGUgX2lzSW5FeHBhbnNpb25Gb3JtKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9leHBhbnNpb25DYXNlU3RhY2subGVuZ3RoID4gMCAmJlxuICAgICAgICB0aGlzLl9leHBhbnNpb25DYXNlU3RhY2tbdGhpcy5fZXhwYW5zaW9uQ2FzZVN0YWNrLmxlbmd0aCAtIDFdID09PVxuICAgICAgICBUb2tlblR5cGUuRVhQQU5TSU9OX0ZPUk1fU1RBUlQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNOb3RXaGl0ZXNwYWNlKGNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gIWNoYXJzLmlzV2hpdGVzcGFjZShjb2RlKSB8fCBjb2RlID09PSBjaGFycy4kRU9GO1xufVxuXG5mdW5jdGlvbiBpc05hbWVFbmQoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBjaGFycy5pc1doaXRlc3BhY2UoY29kZSkgfHwgY29kZSA9PT0gY2hhcnMuJEdUIHx8IGNvZGUgPT09IGNoYXJzLiRTTEFTSCB8fFxuICAgICAgY29kZSA9PT0gY2hhcnMuJFNRIHx8IGNvZGUgPT09IGNoYXJzLiREUSB8fCBjb2RlID09PSBjaGFycy4kRVE7XG59XG5cbmZ1bmN0aW9uIGlzUHJlZml4RW5kKGNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gKGNvZGUgPCBjaGFycy4kYSB8fCBjaGFycy4keiA8IGNvZGUpICYmIChjb2RlIDwgY2hhcnMuJEEgfHwgY2hhcnMuJFogPCBjb2RlKSAmJlxuICAgICAgKGNvZGUgPCBjaGFycy4kMCB8fCBjb2RlID4gY2hhcnMuJDkpO1xufVxuXG5mdW5jdGlvbiBpc0RpZ2l0RW50aXR5RW5kKGNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gY29kZSA9PSBjaGFycy4kU0VNSUNPTE9OIHx8IGNvZGUgPT0gY2hhcnMuJEVPRiB8fCAhY2hhcnMuaXNBc2NpaUhleERpZ2l0KGNvZGUpO1xufVxuXG5mdW5jdGlvbiBpc05hbWVkRW50aXR5RW5kKGNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gY29kZSA9PSBjaGFycy4kU0VNSUNPTE9OIHx8IGNvZGUgPT0gY2hhcnMuJEVPRiB8fCAhY2hhcnMuaXNBc2NpaUxldHRlcihjb2RlKTtcbn1cblxuZnVuY3Rpb24gaXNFeHBhbnNpb25Gb3JtU3RhcnQoXG4gICAgaW5wdXQ6IHN0cmluZywgb2Zmc2V0OiBudW1iZXIsIGludGVycG9sYXRpb25Db25maWc6IEludGVycG9sYXRpb25Db25maWcpOiBib29sZWFuIHtcbiAgY29uc3QgaXNJbnRlcnBvbGF0aW9uU3RhcnQgPVxuICAgICAgaW50ZXJwb2xhdGlvbkNvbmZpZyA/IGlucHV0LmluZGV4T2YoaW50ZXJwb2xhdGlvbkNvbmZpZy5zdGFydCwgb2Zmc2V0KSA9PSBvZmZzZXQgOiBmYWxzZTtcblxuICByZXR1cm4gaW5wdXQuY2hhckNvZGVBdChvZmZzZXQpID09IGNoYXJzLiRMQlJBQ0UgJiYgIWlzSW50ZXJwb2xhdGlvblN0YXJ0O1xufVxuXG5mdW5jdGlvbiBpc0V4cGFuc2lvbkNhc2VTdGFydChwZWVrOiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuIHBlZWsgPT09IGNoYXJzLiRFUSB8fCBjaGFycy5pc0FzY2lpTGV0dGVyKHBlZWspIHx8IGNoYXJzLmlzRGlnaXQocGVlayk7XG59XG5cbmZ1bmN0aW9uIGNvbXBhcmVDaGFyQ29kZUNhc2VJbnNlbnNpdGl2ZShjb2RlMTogbnVtYmVyLCBjb2RlMjogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiB0b1VwcGVyQ2FzZUNoYXJDb2RlKGNvZGUxKSA9PSB0b1VwcGVyQ2FzZUNoYXJDb2RlKGNvZGUyKTtcbn1cblxuZnVuY3Rpb24gdG9VcHBlckNhc2VDaGFyQ29kZShjb2RlOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gY29kZSA+PSBjaGFycy4kYSAmJiBjb2RlIDw9IGNoYXJzLiR6ID8gY29kZSAtIGNoYXJzLiRhICsgY2hhcnMuJEEgOiBjb2RlO1xufVxuXG5mdW5jdGlvbiBtZXJnZVRleHRUb2tlbnMoc3JjVG9rZW5zOiBUb2tlbltdKTogVG9rZW5bXSB7XG4gIGNvbnN0IGRzdFRva2VuczogVG9rZW5bXSA9IFtdO1xuICBsZXQgbGFzdERzdFRva2VuOiBUb2tlbnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3JjVG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgdG9rZW4gPSBzcmNUb2tlbnNbaV07XG4gICAgaWYgKGxhc3REc3RUb2tlbiAmJiBsYXN0RHN0VG9rZW4udHlwZSA9PSBUb2tlblR5cGUuVEVYVCAmJiB0b2tlbi50eXBlID09IFRva2VuVHlwZS5URVhUKSB7XG4gICAgICBsYXN0RHN0VG9rZW4ucGFydHNbMF0gKz0gdG9rZW4ucGFydHNbMF07XG4gICAgICBsYXN0RHN0VG9rZW4uc291cmNlU3Bhbi5lbmQgPSB0b2tlbi5zb3VyY2VTcGFuLmVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFzdERzdFRva2VuID0gdG9rZW47XG4gICAgICBkc3RUb2tlbnMucHVzaChsYXN0RHN0VG9rZW4pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkc3RUb2tlbnM7XG59XG4iXX0=