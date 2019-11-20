import { MonoTypeOperatorFunction } from 'rxjs';
import { NgxsExecutionStrategy } from '../execution/symbols';
/**
 * Returns operator that will run
 * `subscribe` outside of the ngxs execution context
 */
export declare function leaveNgxs<T>(ngxsExecutionStrategy: NgxsExecutionStrategy): MonoTypeOperatorFunction<T>;
