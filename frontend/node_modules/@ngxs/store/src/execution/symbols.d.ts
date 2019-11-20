import { InjectionToken } from '@angular/core';
export declare const NGXS_EXECUTION_STRATEGY: InjectionToken<NgxsExecutionStrategy>;
export interface NgxsExecutionStrategy {
    enter<T>(func: () => T): T;
    leave<T>(func: () => T): T;
}
