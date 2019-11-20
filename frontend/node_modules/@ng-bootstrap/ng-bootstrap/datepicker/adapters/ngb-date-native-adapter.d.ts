import { NgbDateAdapter } from './ngb-date-adapter';
import { NgbDateStruct } from '../ngb-date-struct';
/**
* NgbDateAdapter implementation that allows using native javascript date as a user date model.
 */
export declare class NgbDateNativeAdapter extends NgbDateAdapter<Date> {
    /**
     * Converts native date to a NgbDateStruct
     */
    fromModel(date: Date): NgbDateStruct;
    /**
     * Converts a NgbDateStruct to a native date
     */
    toModel(date: NgbDateStruct): Date;
    protected _fromNativeDate(date: Date): NgbDateStruct;
    protected _toNativeDate(date: NgbDateStruct): Date;
}
