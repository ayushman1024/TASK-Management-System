"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var scrolling_1 = require("@angular/cdk/scrolling");
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var common_1 = require("@angular/common");
var shared_1 = require("../common/shared");
var domhandler_1 = require("../dom/domhandler");
var objectutils_1 = require("../utils/objectutils");
var forms_1 = require("@angular/forms");
exports.DROPDOWN_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return Dropdown; }),
    multi: true
};
var DropdownItem = /** @class */ (function () {
    function DropdownItem() {
        this.onClick = new core_1.EventEmitter();
    }
    DropdownItem.prototype.onOptionClick = function (event) {
        this.onClick.emit({
            originalEvent: event,
            option: this.option
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DropdownItem.prototype, "option", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DropdownItem.prototype, "selected", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DropdownItem.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DropdownItem.prototype, "visible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DropdownItem.prototype, "itemSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", core_1.TemplateRef)
    ], DropdownItem.prototype, "template", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DropdownItem.prototype, "onClick", void 0);
    DropdownItem = __decorate([
        core_1.Component({
            selector: 'p-dropdownItem',
            template: "\n        <li (click)=\"onOptionClick($event)\" role=\"option\"\n            [attr.aria-label]=\"option.label\"\n            [ngStyle]=\"{'height': itemSize + 'px'}\"\n            [ngClass]=\"{'ui-dropdown-item ui-corner-all':true,\n                                                'ui-state-highlight': selected,\n                                                'ui-state-disabled':(option.disabled),\n                                                'ui-dropdown-item-empty': !option.label||option.label.length === 0}\">\n            <span *ngIf=\"!template\">{{option.label||'empty'}}</span>\n            <ng-container *ngTemplateOutlet=\"template; context: {$implicit: option}\"></ng-container>\n        </li>\n    "
        })
    ], DropdownItem);
    return DropdownItem;
}());
exports.DropdownItem = DropdownItem;
var Dropdown = /** @class */ (function () {
    function Dropdown(el, renderer, cd, zone) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.scrollHeight = '200px';
        this.filterBy = 'label';
        this.resetFilterOnHide = false;
        this.dropdownIcon = 'pi pi-chevron-down';
        this.autoDisplayFirst = true;
        this.emptyFilterMessage = 'No results found';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.onChange = new core_1.EventEmitter();
        this.onFocus = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
        this.onClick = new core_1.EventEmitter();
        this.onShow = new core_1.EventEmitter();
        this.onHide = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Object.defineProperty(Dropdown.prototype, "autoWidth", {
        get: function () {
            return this._autoWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dropdown.prototype, "utc", {
        set: function (_autoWidth) {
            this._autoWidth = _autoWidth;
            console.log("Setting autoWidth has no effect as automatic width calculation is removed for better perfomance.");
        },
        enumerable: true,
        configurable: true
    });
    Dropdown.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                case 'selectedItem':
                    _this.selectedItemTemplate = item.template;
                    break;
                case 'group':
                    _this.groupTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    Dropdown.prototype.ngOnInit = function () {
        this.optionsToDisplay = this.options;
        this.updateSelectedOption(null);
    };
    Object.defineProperty(Dropdown.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (val) {
            var opts = this.optionLabel ? objectutils_1.ObjectUtils.generateSelectItems(val, this.optionLabel) : val;
            this._options = opts;
            this.optionsToDisplay = this._options;
            this.updateSelectedOption(this.value);
            this.optionsChanged = true;
            if (this.filterValue && this.filterValue.length) {
                this.activateFilter();
            }
        },
        enumerable: true,
        configurable: true
    });
    Dropdown.prototype.ngAfterViewInit = function () {
        if (this.editable) {
            this.updateEditableLabel();
        }
    };
    Object.defineProperty(Dropdown.prototype, "label", {
        get: function () {
            return (this.selectedOption ? this.selectedOption.label : null);
        },
        enumerable: true,
        configurable: true
    });
    Dropdown.prototype.updateEditableLabel = function () {
        if (this.editableInputViewChild && this.editableInputViewChild.nativeElement) {
            this.editableInputViewChild.nativeElement.value = (this.selectedOption ? this.selectedOption.label : this.value || '');
        }
    };
    Dropdown.prototype.onItemClick = function (event) {
        var _this = this;
        var option = event.option;
        this.itemClick = true;
        if (!option.disabled) {
            this.selectItem(event, option);
            this.focusViewChild.nativeElement.focus();
            this.filled = true;
        }
        setTimeout(function () {
            _this.hide();
        }, 150);
    };
    Dropdown.prototype.selectItem = function (event, option) {
        if (this.selectedOption != option) {
            this.selectedOption = option;
            this.value = option.value;
            this.onModelChange(this.value);
            this.updateEditableLabel();
            this.onChange.emit({
                originalEvent: event.originalEvent,
                value: this.value
            });
        }
    };
    Dropdown.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this.optionsChanged && this.overlayVisible) {
            this.optionsChanged = false;
            this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    _this.alignOverlay();
                }, 1);
            });
        }
        if (this.selectedOptionUpdated && this.itemsWrapper) {
            var selectedItem = domhandler_1.DomHandler.findSingle(this.overlay, 'li.ui-state-highlight');
            if (selectedItem) {
                domhandler_1.DomHandler.scrollInView(this.itemsWrapper, domhandler_1.DomHandler.findSingle(this.overlay, 'li.ui-state-highlight'));
            }
            this.selectedOptionUpdated = false;
        }
    };
    Dropdown.prototype.writeValue = function (value) {
        if (this.filter) {
            this.resetFilter();
        }
        this.value = value;
        this.updateSelectedOption(value);
        this.updateEditableLabel();
        this.updateFilledState();
        this.cd.markForCheck();
    };
    Dropdown.prototype.resetFilter = function () {
        if (this.filterViewChild && this.filterViewChild.nativeElement) {
            this.filterValue = null;
            this.filterViewChild.nativeElement.value = '';
        }
        this.optionsToDisplay = this.options;
    };
    Dropdown.prototype.updateSelectedOption = function (val) {
        this.selectedOption = this.findOption(val, this.optionsToDisplay);
        if (this.autoDisplayFirst && !this.placeholder && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length && !this.editable) {
            this.selectedOption = this.optionsToDisplay[0];
        }
        this.selectedOptionUpdated = true;
    };
    Dropdown.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Dropdown.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Dropdown.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Dropdown.prototype.onMouseclick = function (event) {
        if (this.disabled || this.readonly) {
            return;
        }
        this.onClick.emit(event);
        this.selfClick = true;
        this.clearClick = domhandler_1.DomHandler.hasClass(event.target, 'ui-dropdown-clear-icon');
        if (!this.itemClick && !this.clearClick) {
            this.focusViewChild.nativeElement.focus();
            if (this.overlayVisible)
                this.hide();
            else
                this.show();
        }
    };
    Dropdown.prototype.onEditableInputClick = function (event) {
        this.itemClick = true;
        this.bindDocumentClickListener();
    };
    Dropdown.prototype.onEditableInputFocus = function (event) {
        this.focused = true;
        this.hide();
        this.onFocus.emit(event);
    };
    Dropdown.prototype.onEditableInputChange = function (event) {
        this.value = event.target.value;
        this.updateSelectedOption(this.value);
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    Dropdown.prototype.show = function () {
        this.overlayVisible = true;
    };
    Dropdown.prototype.onOverlayAnimationStart = function (event) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                this.itemsWrapper = domhandler_1.DomHandler.findSingle(this.overlay, '.ui-dropdown-items-wrapper');
                this.appendOverlay();
                if (this.autoZIndex) {
                    this.overlay.style.zIndex = String(this.baseZIndex + (++domhandler_1.DomHandler.zindex));
                }
                this.alignOverlay();
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                if (this.options && this.options.length) {
                    var selectedListItem = domhandler_1.DomHandler.findSingle(this.itemsWrapper, '.ui-dropdown-item.ui-state-highlight');
                    if (selectedListItem) {
                        domhandler_1.DomHandler.scrollInView(this.itemsWrapper, selectedListItem);
                    }
                }
                if (this.filterViewChild && this.filterViewChild.nativeElement) {
                    this.filterViewChild.nativeElement.focus();
                }
                this.onShow.emit(event);
                break;
            case 'void':
                this.onHide.emit(event);
                this.onOverlayHide();
                break;
        }
    };
    Dropdown.prototype.appendOverlay = function () {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                domhandler_1.DomHandler.appendChild(this.overlay, this.appendTo);
            this.overlay.style.minWidth = domhandler_1.DomHandler.getWidth(this.containerViewChild.nativeElement) + 'px';
        }
    };
    Dropdown.prototype.restoreOverlayAppend = function () {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    };
    Dropdown.prototype.hide = function () {
        this.overlayVisible = false;
        if (this.filter && this.resetFilterOnHide) {
            this.resetFilter();
        }
        this.cd.markForCheck();
    };
    Dropdown.prototype.alignOverlay = function () {
        if (this.overlay) {
            if (this.appendTo)
                domhandler_1.DomHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement);
            else
                domhandler_1.DomHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement);
        }
    };
    Dropdown.prototype.onInputFocus = function (event) {
        this.focused = true;
        this.onFocus.emit(event);
    };
    Dropdown.prototype.onInputBlur = function (event) {
        this.focused = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    };
    Dropdown.prototype.findPrevEnabledOption = function (index) {
        var prevEnabledOption;
        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            for (var i = (index - 1); 0 <= i; i--) {
                var option = this.optionsToDisplay[i];
                if (option.disabled) {
                    continue;
                }
                else {
                    prevEnabledOption = option;
                    break;
                }
            }
            if (!prevEnabledOption) {
                for (var i = this.optionsToDisplay.length - 1; i >= index; i--) {
                    var option = this.optionsToDisplay[i];
                    if (option.disabled) {
                        continue;
                    }
                    else {
                        prevEnabledOption = option;
                        break;
                    }
                }
            }
        }
        return prevEnabledOption;
    };
    Dropdown.prototype.findNextEnabledOption = function (index) {
        var nextEnabledOption;
        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            for (var i = (index + 1); index < (this.optionsToDisplay.length - 1); i++) {
                var option = this.optionsToDisplay[i];
                if (option.disabled) {
                    continue;
                }
                else {
                    nextEnabledOption = option;
                    break;
                }
            }
            if (!nextEnabledOption) {
                for (var i = 0; i < index; i++) {
                    var option = this.optionsToDisplay[i];
                    if (option.disabled) {
                        continue;
                    }
                    else {
                        nextEnabledOption = option;
                        break;
                    }
                }
            }
        }
        return nextEnabledOption;
    };
    Dropdown.prototype.onKeydown = function (event, search) {
        if (this.readonly || !this.optionsToDisplay || this.optionsToDisplay.length === null) {
            return;
        }
        switch (event.which) {
            //down
            case 40:
                if (!this.overlayVisible && event.altKey) {
                    this.show();
                }
                else {
                    if (this.group) {
                        var selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                        if (selectedItemIndex !== -1) {
                            var nextItemIndex = selectedItemIndex.itemIndex + 1;
                            if (nextItemIndex < (this.optionsToDisplay[selectedItemIndex.groupIndex].items.length)) {
                                this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex].items[nextItemIndex]);
                                this.selectedOptionUpdated = true;
                            }
                            else if (this.optionsToDisplay[selectedItemIndex.groupIndex + 1]) {
                                this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex + 1].items[0]);
                                this.selectedOptionUpdated = true;
                            }
                        }
                        else {
                            this.selectItem(event, this.optionsToDisplay[0].items[0]);
                        }
                    }
                    else {
                        var selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                        var nextEnabledOption = this.findNextEnabledOption(selectedItemIndex);
                        if (nextEnabledOption) {
                            this.selectItem(event, nextEnabledOption);
                            this.selectedOptionUpdated = true;
                        }
                    }
                }
                event.preventDefault();
                break;
            //up
            case 38:
                if (this.group) {
                    var selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                    if (selectedItemIndex !== -1) {
                        var prevItemIndex = selectedItemIndex.itemIndex - 1;
                        if (prevItemIndex >= 0) {
                            this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex].items[prevItemIndex]);
                            this.selectedOptionUpdated = true;
                        }
                        else if (prevItemIndex < 0) {
                            var prevGroup = this.optionsToDisplay[selectedItemIndex.groupIndex - 1];
                            if (prevGroup) {
                                this.selectItem(event, prevGroup.items[prevGroup.items.length - 1]);
                                this.selectedOptionUpdated = true;
                            }
                        }
                    }
                }
                else {
                    var selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                    var prevEnabledOption = this.findPrevEnabledOption(selectedItemIndex);
                    if (prevEnabledOption) {
                        this.selectItem(event, prevEnabledOption);
                        this.selectedOptionUpdated = true;
                    }
                }
                event.preventDefault();
                break;
            //space
            case 32:
            case 32:
                if (!this.overlayVisible) {
                    this.show();
                    event.preventDefault();
                }
                break;
            //enter
            case 13:
                if (!this.filter || (this.optionsToDisplay && this.optionsToDisplay.length > 0)) {
                    this.hide();
                }
                event.preventDefault();
                break;
            //escape and tab
            case 27:
            case 9:
                this.hide();
                break;
            //search item based on keyboard input
            default:
                if (search) {
                    this.search(event);
                }
                break;
        }
    };
    Dropdown.prototype.search = function (event) {
        var _this = this;
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        var char = String.fromCharCode(event.keyCode);
        this.previousSearchChar = this.currentSearchChar;
        this.currentSearchChar = char;
        if (this.previousSearchChar === this.currentSearchChar)
            this.searchValue = this.currentSearchChar;
        else
            this.searchValue = this.searchValue ? this.searchValue + char : char;
        var newOption;
        if (this.group) {
            var searchIndex = this.selectedOption ? this.findOptionGroupIndex(this.selectedOption.value, this.optionsToDisplay) : { groupIndex: 0, itemIndex: 0 };
            newOption = this.searchOptionWithinGroup(searchIndex);
        }
        else {
            var searchIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
            newOption = this.searchOption(++searchIndex);
        }
        if (newOption) {
            this.selectItem(event, newOption);
            this.selectedOptionUpdated = true;
        }
        this.searchTimeout = setTimeout(function () {
            _this.searchValue = null;
        }, 250);
    };
    Dropdown.prototype.searchOption = function (index) {
        var option;
        if (this.searchValue) {
            option = this.searchOptionInRange(index, this.optionsToDisplay.length);
            if (!option) {
                option = this.searchOptionInRange(0, index);
            }
        }
        return option;
    };
    Dropdown.prototype.searchOptionInRange = function (start, end) {
        for (var i = start; i < end; i++) {
            var opt = this.optionsToDisplay[i];
            if (opt.label.toLowerCase().startsWith(this.searchValue.toLowerCase())) {
                return opt;
            }
        }
        return null;
    };
    Dropdown.prototype.searchOptionWithinGroup = function (index) {
        var option;
        if (this.searchValue) {
            for (var i = index.groupIndex; i < this.optionsToDisplay.length; i++) {
                for (var j = (index.groupIndex === i) ? (index.itemIndex + 1) : 0; j < this.optionsToDisplay[i].items.length; j++) {
                    var opt = this.optionsToDisplay[i].items[j];
                    if (opt.label.toLowerCase().startsWith(this.searchValue.toLowerCase())) {
                        return opt;
                    }
                }
            }
            if (!option) {
                for (var i = 0; i <= index.groupIndex; i++) {
                    for (var j = 0; j < ((index.groupIndex === i) ? index.itemIndex : this.optionsToDisplay[i].items.length); j++) {
                        var opt = this.optionsToDisplay[i].items[j];
                        if (opt.label.toLowerCase().startsWith(this.searchValue.toLowerCase())) {
                            return opt;
                        }
                    }
                }
            }
        }
        return null;
    };
    Dropdown.prototype.findOptionIndex = function (val, opts) {
        var index = -1;
        if (opts) {
            for (var i = 0; i < opts.length; i++) {
                if ((val == null && opts[i].value == null) || objectutils_1.ObjectUtils.equals(val, opts[i].value, this.dataKey)) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    Dropdown.prototype.findOptionGroupIndex = function (val, opts) {
        var groupIndex, itemIndex;
        if (opts) {
            for (var i = 0; i < opts.length; i++) {
                groupIndex = i;
                itemIndex = this.findOptionIndex(val, opts[i].items);
                if (itemIndex !== -1) {
                    break;
                }
            }
        }
        if (itemIndex !== -1) {
            return { groupIndex: groupIndex, itemIndex: itemIndex };
        }
        else {
            return -1;
        }
    };
    Dropdown.prototype.findOption = function (val, opts, inGroup) {
        if (this.group && !inGroup) {
            var opt = void 0;
            if (opts && opts.length) {
                for (var _i = 0, opts_1 = opts; _i < opts_1.length; _i++) {
                    var optgroup = opts_1[_i];
                    opt = this.findOption(val, optgroup.items, true);
                    if (opt) {
                        break;
                    }
                }
            }
            return opt;
        }
        else {
            var index = this.findOptionIndex(val, opts);
            return (index != -1) ? opts[index] : null;
        }
    };
    Dropdown.prototype.onFilter = function (event) {
        var inputValue = event.target.value;
        if (inputValue && inputValue.length) {
            this.filterValue = inputValue;
            this.activateFilter();
        }
        else {
            this.filterValue = null;
            this.optionsToDisplay = this.options;
        }
        this.optionsChanged = true;
    };
    Dropdown.prototype.activateFilter = function () {
        var searchFields = this.filterBy.split(',');
        if (this.options && this.options.length) {
            if (this.group) {
                var filteredGroups = [];
                for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
                    var optgroup = _a[_i];
                    var filteredSubOptions = objectutils_1.ObjectUtils.filter(optgroup.items, searchFields, this.filterValue);
                    if (filteredSubOptions && filteredSubOptions.length) {
                        filteredGroups.push({
                            label: optgroup.label,
                            value: optgroup.value,
                            items: filteredSubOptions
                        });
                    }
                }
                this.optionsToDisplay = filteredGroups;
            }
            else {
                this.optionsToDisplay = objectutils_1.ObjectUtils.filter(this.options, searchFields, this.filterValue);
            }
            this.optionsChanged = true;
        }
    };
    Dropdown.prototype.applyFocus = function () {
        if (this.editable)
            domhandler_1.DomHandler.findSingle(this.el.nativeElement, '.ui-dropdown-label.ui-inputtext').focus();
        else
            domhandler_1.DomHandler.findSingle(this.el.nativeElement, 'input[readonly]').focus();
    };
    Dropdown.prototype.focus = function () {
        this.applyFocus();
    };
    Dropdown.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function () {
                if (!_this.selfClick && !_this.itemClick) {
                    _this.hide();
                    _this.unbindDocumentClickListener();
                }
                _this.clearClickState();
                _this.cd.markForCheck();
            });
        }
    };
    Dropdown.prototype.clearClickState = function () {
        this.selfClick = false;
        this.itemClick = false;
    };
    Dropdown.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    Dropdown.prototype.bindDocumentResizeListener = function () {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    };
    Dropdown.prototype.unbindDocumentResizeListener = function () {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    };
    Dropdown.prototype.onWindowResize = function () {
        if (!domhandler_1.DomHandler.isAndroid()) {
            this.hide();
        }
    };
    Dropdown.prototype.updateFilledState = function () {
        this.filled = (this.selectedOption != null);
    };
    Dropdown.prototype.clear = function (event) {
        this.clearClick = true;
        this.value = null;
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
        this.updateSelectedOption(this.value);
        this.updateEditableLabel();
        this.updateFilledState();
    };
    Dropdown.prototype.onOverlayHide = function () {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.overlay = null;
        this.itemsWrapper = null;
    };
    Dropdown.prototype.ngOnDestroy = function () {
        this.restoreOverlayAppend();
        this.onOverlayHide();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "filter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Dropdown.prototype, "style", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Dropdown.prototype, "panelStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "panelStyleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "editable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Dropdown.prototype, "appendTo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Dropdown.prototype, "tabindex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "filterPlaceholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "inputId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "selectId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "dataKey", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "filterBy", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "autofocus", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "resetFilterOnHide", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "dropdownIcon", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "optionLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "autoDisplayFirst", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "group", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "showClear", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "emptyFilterMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "virtualScroll", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Dropdown.prototype, "itemSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Dropdown.prototype, "autoZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Dropdown.prototype, "baseZIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "showTransitionOptions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "hideTransitionOptions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Dropdown.prototype, "ariaFilterLabel", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Dropdown.prototype, "onChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Dropdown.prototype, "onFocus", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Dropdown.prototype, "onBlur", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Dropdown.prototype, "onClick", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Dropdown.prototype, "onShow", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Dropdown.prototype, "onHide", void 0);
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], Dropdown.prototype, "containerViewChild", void 0);
    __decorate([
        core_1.ViewChild('filter'),
        __metadata("design:type", core_1.ElementRef)
    ], Dropdown.prototype, "filterViewChild", void 0);
    __decorate([
        core_1.ViewChild('in'),
        __metadata("design:type", core_1.ElementRef)
    ], Dropdown.prototype, "focusViewChild", void 0);
    __decorate([
        core_1.ViewChild('editableInput'),
        __metadata("design:type", core_1.ElementRef)
    ], Dropdown.prototype, "editableInputViewChild", void 0);
    __decorate([
        core_1.ContentChildren(shared_1.PrimeTemplate),
        __metadata("design:type", core_1.QueryList)
    ], Dropdown.prototype, "templates", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], Dropdown.prototype, "autoWidth", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], Dropdown.prototype, "options", null);
    Dropdown = __decorate([
        core_1.Component({
            selector: 'p-dropdown',
            template: "\n         <div #container [ngClass]=\"{'ui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix':true,\n            'ui-state-disabled':disabled, 'ui-dropdown-open':overlayVisible, 'ui-state-focus':focused, 'ui-dropdown-clearable': showClear && !disabled}\"\n            (click)=\"onMouseclick($event)\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #in [attr.id]=\"inputId\" type=\"text\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" readonly (focus)=\"onInputFocus($event)\" aria-haspopup=\"listbox\"\n                    (blur)=\"onInputBlur($event)\" (keydown)=\"onKeydown($event, true)\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\" [attr.autofocus]=\"autofocus\">\n            </div>\n            <label [ngClass]=\"{'ui-dropdown-label ui-inputtext ui-corner-all':true,'ui-dropdown-label-empty':(label == null || label.length === 0)}\" *ngIf=\"!editable && (label != null)\">\n                <ng-container *ngIf=\"!selectedItemTemplate\">{{label||'empty'}}</ng-container>\n                <ng-container *ngTemplateOutlet=\"selectedItemTemplate; context: {$implicit: selectedOption}\"></ng-container>\n            </label>\n            <label [ngClass]=\"{'ui-dropdown-label ui-inputtext ui-corner-all ui-placeholder':true,'ui-dropdown-label-empty': (placeholder == null || placeholder.length === 0)}\" *ngIf=\"!editable && (label == null)\">{{placeholder||'empty'}}</label>\n            <input #editableInput type=\"text\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" class=\"ui-dropdown-label ui-inputtext ui-corner-all\" *ngIf=\"editable\" [disabled]=\"disabled\" [attr.placeholder]=\"placeholder\"\n                        (click)=\"onEditableInputClick($event)\" (input)=\"onEditableInputChange($event)\" (focus)=\"onEditableInputFocus($event)\" (blur)=\"onInputBlur($event)\">\n            <i class=\"ui-dropdown-clear-icon pi pi-times\" (click)=\"clear($event)\" *ngIf=\"value != null && showClear && !disabled\"></i>\n            <div class=\"ui-dropdown-trigger ui-state-default ui-corner-right\">\n                <span class=\"ui-dropdown-trigger-icon ui-clickable\" [ngClass]=\"dropdownIcon\"></span>\n            </div>\n            <div *ngIf=\"overlayVisible\" [ngClass]=\"'ui-dropdown-panel  ui-widget ui-widget-content ui-corner-all ui-shadow'\" [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" [ngStyle]=\"panelStyle\" [class]=\"panelStyleClass\">\n                <div *ngIf=\"filter\" class=\"ui-dropdown-filter-container\" (click)=\"$event.stopPropagation()\">\n                    <input #filter type=\"text\" autocomplete=\"off\" [value]=\"filterValue||''\" class=\"ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all\" [attr.placeholder]=\"filterPlaceholder\"\n                    (keydown.enter)=\"$event.preventDefault()\" (keydown)=\"onKeydown($event, false)\" (input)=\"onFilter($event)\" [attr.aria-label]=\"ariaFilterLabel\">\n                    <span class=\"ui-dropdown-filter-icon pi pi-search\"></span>\n                </div>\n                <div class=\"ui-dropdown-items-wrapper\" [style.max-height]=\"virtualScroll ? 'auto' : (scrollHeight||'auto')\">\n                    <ul class=\"ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\" role=\"listbox\">\n                        <ng-container *ngIf=\"group\">\n                            <ng-template ngFor let-optgroup [ngForOf]=\"optionsToDisplay\">\n                                <li class=\"ui-dropdown-item-group\">\n                                    <span *ngIf=\"!groupTemplate\">{{optgroup.label||'empty'}}</span>\n                                    <ng-container *ngTemplateOutlet=\"groupTemplate; context: {$implicit: optgroup}\"></ng-container>\n                                </li>\n                                <ng-container *ngTemplateOutlet=\"itemslist; context: {$implicit: optgroup.items, selectedOption: selectedOption}\"></ng-container>\n                            </ng-template>\n                        </ng-container>\n                        <ng-container *ngIf=\"!group\">\n                            <ng-container *ngTemplateOutlet=\"itemslist; context: {$implicit: optionsToDisplay, selectedOption: selectedOption}\"></ng-container>\n                        </ng-container>\n                        <ng-template #itemslist let-options let-selectedOption=\"selectedOption\">\n\n                            <ng-container *ngIf=\"!virtualScroll; else virtualScrollList\">\n                                <ng-template ngFor let-option let-i=\"index\" [ngForOf]=\"options\">\n                                    <p-dropdownItem [option]=\"option\" [selected]=\"selectedOption == option\" \n                                                    (onClick)=\"onItemClick($event)\"\n                                                    [template]=\"itemTemplate\"></p-dropdownItem>\n                                </ng-template>\n                            </ng-container>\n                            <ng-template #virtualScrollList>\n                                <cdk-virtual-scroll-viewport #viewport [ngStyle]=\"{'height': scrollHeight}\" [itemSize]=\"itemSize\" *ngIf=\"virtualScroll && optionsToDisplay && optionsToDisplay.length\">\n                                    <ng-container *cdkVirtualFor=\"let option of options; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd\">         \n                                        <p-dropdownItem [option]=\"option\" [selected]=\"selectedOption == option\"\n                                                                   (onClick)=\"onItemClick($event)\"\n                                                                   [template]=\"itemTemplate\"></p-dropdownItem>\n                                    </ng-container>\n                                </cdk-virtual-scroll-viewport>\n                            </ng-template>\n                        </ng-template>\n                        <li *ngIf=\"filter && optionsToDisplay && optionsToDisplay.length === 0\" class=\"ui-dropdown-empty-message\">{{emptyFilterMessage}}</li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    ",
            animations: [
                animations_1.trigger('overlayAnimation', [
                    animations_1.state('void', animations_1.style({
                        transform: 'translateY(5%)',
                        opacity: 0
                    })),
                    animations_1.state('visible', animations_1.style({
                        transform: 'translateY(0)',
                        opacity: 1
                    })),
                    animations_1.transition('void => visible', animations_1.animate('{{showTransitionParams}}')),
                    animations_1.transition('visible => void', animations_1.animate('{{hideTransitionParams}}'))
                ])
            ],
            host: {
                '[class.ui-inputwrapper-filled]': 'filled',
                '[class.ui-inputwrapper-focus]': 'focused'
            },
            providers: [exports.DROPDOWN_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2, core_1.ChangeDetectorRef, core_1.NgZone])
    ], Dropdown);
    return Dropdown;
}());
exports.Dropdown = Dropdown;
var DropdownModule = /** @class */ (function () {
    function DropdownModule() {
    }
    DropdownModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, shared_1.SharedModule, scrolling_1.ScrollingModule],
            exports: [Dropdown, shared_1.SharedModule, scrolling_1.ScrollingModule],
            declarations: [Dropdown, DropdownItem]
        })
    ], DropdownModule);
    return DropdownModule;
}());
exports.DropdownModule = DropdownModule;
//# sourceMappingURL=dropdown.js.map