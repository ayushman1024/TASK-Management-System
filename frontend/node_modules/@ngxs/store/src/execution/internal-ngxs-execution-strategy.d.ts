import { NgxsExecutionStrategy } from './symbols';
export declare class InternalNgxsExecutionStrategy implements NgxsExecutionStrategy {
    private _executionStrategy;
    constructor(_executionStrategy: NgxsExecutionStrategy);
    enter<T>(func: () => T): T;
    leave<T>(func: () => T): T;
}
