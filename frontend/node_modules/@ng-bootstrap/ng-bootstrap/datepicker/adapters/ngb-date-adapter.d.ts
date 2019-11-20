import { NgbDateStruct } from '../ngb-date-struct';
export declare function NGB_DATEPICKER_DATE_ADAPTER_FACTORY(): NgbDateStructAdapter;
/**
 * An abstract class used as the DI token that does conversion between the internal
 * datepicker NgbDateStruct model and any provided user date model, ex. string, native date, etc.
 *
 * Adapter is used for conversion when binding datepicker to a model with forms, ex. [(ngModel)]="userDateModel"
 *
 * Default implementation assumes NgbDateStruct for user model as well.
 */
export declare abstract class NgbDateAdapter<D> {
    /**
     * Converts user-model date into an NgbDateStruct for internal use in the library
     */
    abstract fromModel(value: D): NgbDateStruct;
    /**
     * Converts internal date value NgbDateStruct to user-model date
     * The returned type is supposed to be of the same type as fromModel() input-value param
     */
    abstract toModel(date: NgbDateStruct): D;
}
export declare class NgbDateStructAdapter extends NgbDateAdapter<NgbDateStruct> {
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     */
    fromModel(date: NgbDateStruct): NgbDateStruct;
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     */
    toModel(date: NgbDateStruct): NgbDateStruct;
}
