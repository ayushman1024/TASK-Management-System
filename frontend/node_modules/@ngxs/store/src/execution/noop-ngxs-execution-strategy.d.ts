import { NgxsExecutionStrategy } from './symbols';
export declare class NoopNgxsExecutionStrategy implements NgxsExecutionStrategy {
    enter<T>(func: () => T): T;
    leave<T>(func: () => T): T;
}
