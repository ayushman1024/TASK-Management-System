import { NgbDateStruct } from '../ngb-date-struct';
import { NgbDateNativeAdapter } from './ngb-date-native-adapter';
/**
 * NgbDateAdapter implementation that allows using native javascript UTC date as a user date model.
 * Same as NgbDateNativeAdapter, but uses UTC dates.
 *
 * @since 3.2.0
 */
export declare class NgbDateNativeUTCAdapter extends NgbDateNativeAdapter {
    protected _fromNativeDate(date: Date): NgbDateStruct;
    protected _toNativeDate(date: NgbDateStruct): Date;
}
