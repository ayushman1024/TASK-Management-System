/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { isNumber, toInteger } from '../util/util';
var NgbTime = /** @class */ (function () {
    function NgbTime(hour, minute, second) {
        this.hour = toInteger(hour);
        this.minute = toInteger(minute);
        this.second = toInteger(second);
    }
    /**
     * @param {?=} step
     * @return {?}
     */
    NgbTime.prototype.changeHour = /**
     * @param {?=} step
     * @return {?}
     */
    function (step) {
        if (step === void 0) { step = 1; }
        this.updateHour((isNaN(this.hour) ? 0 : this.hour) + step);
    };
    /**
     * @param {?} hour
     * @return {?}
     */
    NgbTime.prototype.updateHour = /**
     * @param {?} hour
     * @return {?}
     */
    function (hour) {
        if (isNumber(hour)) {
            this.hour = (hour < 0 ? 24 + hour : hour) % 24;
        }
        else {
            this.hour = NaN;
        }
    };
    /**
     * @param {?=} step
     * @return {?}
     */
    NgbTime.prototype.changeMinute = /**
     * @param {?=} step
     * @return {?}
     */
    function (step) {
        if (step === void 0) { step = 1; }
        this.updateMinute((isNaN(this.minute) ? 0 : this.minute) + step);
    };
    /**
     * @param {?} minute
     * @return {?}
     */
    NgbTime.prototype.updateMinute = /**
     * @param {?} minute
     * @return {?}
     */
    function (minute) {
        if (isNumber(minute)) {
            this.minute = minute % 60 < 0 ? 60 + minute % 60 : minute % 60;
            this.changeHour(Math.floor(minute / 60));
        }
        else {
            this.minute = NaN;
        }
    };
    /**
     * @param {?=} step
     * @return {?}
     */
    NgbTime.prototype.changeSecond = /**
     * @param {?=} step
     * @return {?}
     */
    function (step) {
        if (step === void 0) { step = 1; }
        this.updateSecond((isNaN(this.second) ? 0 : this.second) + step);
    };
    /**
     * @param {?} second
     * @return {?}
     */
    NgbTime.prototype.updateSecond = /**
     * @param {?} second
     * @return {?}
     */
    function (second) {
        if (isNumber(second)) {
            this.second = second < 0 ? 60 + second % 60 : second % 60;
            this.changeMinute(Math.floor(second / 60));
        }
        else {
            this.second = NaN;
        }
    };
    /**
     * @param {?=} checkSecs
     * @return {?}
     */
    NgbTime.prototype.isValid = /**
     * @param {?=} checkSecs
     * @return {?}
     */
    function (checkSecs) {
        if (checkSecs === void 0) { checkSecs = true; }
        return isNumber(this.hour) && isNumber(this.minute) && (checkSecs ? isNumber(this.second) : true);
    };
    /**
     * @return {?}
     */
    NgbTime.prototype.toString = /**
     * @return {?}
     */
    function () { return (this.hour || 0) + ":" + (this.minute || 0) + ":" + (this.second || 0); };
    return NgbTime;
}());
export { NgbTime };
if (false) {
    /** @type {?} */
    NgbTime.prototype.hour;
    /** @type {?} */
    NgbTime.prototype.minute;
    /** @type {?} */
    NgbTime.prototype.second;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdiLXRpbWUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInRpbWVwaWNrZXIvbmdiLXRpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUUsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRWpEO0lBS0UsaUJBQVksSUFBYSxFQUFFLE1BQWUsRUFBRSxNQUFlO1FBQ3pELElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBRUQsNEJBQVU7Ozs7SUFBVixVQUFXLElBQVE7UUFBUixxQkFBQSxFQUFBLFFBQVE7UUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFBQyxDQUFDOzs7OztJQUVwRiw0QkFBVTs7OztJQUFWLFVBQVcsSUFBWTtRQUNyQixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2hEO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztTQUNqQjtJQUNILENBQUM7Ozs7O0lBRUQsOEJBQVk7Ozs7SUFBWixVQUFhLElBQVE7UUFBUixxQkFBQSxFQUFBLFFBQVE7UUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFBQyxDQUFDOzs7OztJQUU1Riw4QkFBWTs7OztJQUFaLFVBQWEsTUFBYztRQUN6QixJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDMUM7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1NBQ25CO0lBQ0gsQ0FBQzs7Ozs7SUFFRCw4QkFBWTs7OztJQUFaLFVBQWEsSUFBUTtRQUFSLHFCQUFBLEVBQUEsUUFBUTtRQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUFDLENBQUM7Ozs7O0lBRTVGLDhCQUFZOzs7O0lBQVosVUFBYSxNQUFjO1FBQ3pCLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDMUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztTQUNuQjtJQUNILENBQUM7Ozs7O0lBRUQseUJBQU87Ozs7SUFBUCxVQUFRLFNBQWdCO1FBQWhCLDBCQUFBLEVBQUEsZ0JBQWdCO1FBQ3RCLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRyxDQUFDOzs7O0lBRUQsMEJBQVE7OztJQUFSLGNBQWEsT0FBTyxDQUFHLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxXQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLGNBQUM7QUFBRCxDQUFDLEFBaERELElBZ0RDOzs7O0lBL0NDLHVCQUFhOztJQUNiLHlCQUFlOztJQUNmLHlCQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc051bWJlciwgdG9JbnRlZ2VyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuXG5leHBvcnQgY2xhc3MgTmdiVGltZSB7XG4gIGhvdXI6IG51bWJlcjtcbiAgbWludXRlOiBudW1iZXI7XG4gIHNlY29uZDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGhvdXI/OiBudW1iZXIsIG1pbnV0ZT86IG51bWJlciwgc2Vjb25kPzogbnVtYmVyKSB7XG4gICAgdGhpcy5ob3VyID0gdG9JbnRlZ2VyKGhvdXIpO1xuICAgIHRoaXMubWludXRlID0gdG9JbnRlZ2VyKG1pbnV0ZSk7XG4gICAgdGhpcy5zZWNvbmQgPSB0b0ludGVnZXIoc2Vjb25kKTtcbiAgfVxuXG4gIGNoYW5nZUhvdXIoc3RlcCA9IDEpIHsgdGhpcy51cGRhdGVIb3VyKChpc05hTih0aGlzLmhvdXIpID8gMCA6IHRoaXMuaG91cikgKyBzdGVwKTsgfVxuXG4gIHVwZGF0ZUhvdXIoaG91cjogbnVtYmVyKSB7XG4gICAgaWYgKGlzTnVtYmVyKGhvdXIpKSB7XG4gICAgICB0aGlzLmhvdXIgPSAoaG91ciA8IDAgPyAyNCArIGhvdXIgOiBob3VyKSAlIDI0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhvdXIgPSBOYU47XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlTWludXRlKHN0ZXAgPSAxKSB7IHRoaXMudXBkYXRlTWludXRlKChpc05hTih0aGlzLm1pbnV0ZSkgPyAwIDogdGhpcy5taW51dGUpICsgc3RlcCk7IH1cblxuICB1cGRhdGVNaW51dGUobWludXRlOiBudW1iZXIpIHtcbiAgICBpZiAoaXNOdW1iZXIobWludXRlKSkge1xuICAgICAgdGhpcy5taW51dGUgPSBtaW51dGUgJSA2MCA8IDAgPyA2MCArIG1pbnV0ZSAlIDYwIDogbWludXRlICUgNjA7XG4gICAgICB0aGlzLmNoYW5nZUhvdXIoTWF0aC5mbG9vcihtaW51dGUgLyA2MCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1pbnV0ZSA9IE5hTjtcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VTZWNvbmQoc3RlcCA9IDEpIHsgdGhpcy51cGRhdGVTZWNvbmQoKGlzTmFOKHRoaXMuc2Vjb25kKSA/IDAgOiB0aGlzLnNlY29uZCkgKyBzdGVwKTsgfVxuXG4gIHVwZGF0ZVNlY29uZChzZWNvbmQ6IG51bWJlcikge1xuICAgIGlmIChpc051bWJlcihzZWNvbmQpKSB7XG4gICAgICB0aGlzLnNlY29uZCA9IHNlY29uZCA8IDAgPyA2MCArIHNlY29uZCAlIDYwIDogc2Vjb25kICUgNjA7XG4gICAgICB0aGlzLmNoYW5nZU1pbnV0ZShNYXRoLmZsb29yKHNlY29uZCAvIDYwKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2Vjb25kID0gTmFOO1xuICAgIH1cbiAgfVxuXG4gIGlzVmFsaWQoY2hlY2tTZWNzID0gdHJ1ZSkge1xuICAgIHJldHVybiBpc051bWJlcih0aGlzLmhvdXIpICYmIGlzTnVtYmVyKHRoaXMubWludXRlKSAmJiAoY2hlY2tTZWNzID8gaXNOdW1iZXIodGhpcy5zZWNvbmQpIDogdHJ1ZSk7XG4gIH1cblxuICB0b1N0cmluZygpIHsgcmV0dXJuIGAke3RoaXMuaG91ciB8fCAwfToke3RoaXMubWludXRlIHx8IDB9OiR7dGhpcy5zZWNvbmQgfHwgMH1gOyB9XG59XG4iXX0=