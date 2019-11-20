import { Observable } from 'rxjs';
export declare class NgxsBootstrapper {
    /**
     * Use `ReplaySubject`, thus we can get cached value even if the stream is completed
     */
    private bootstrap$;
    readonly appBootstrapped$: Observable<boolean>;
    /**
     * This event will be emitted after attaching `ComponentRef` of the root component
     * to the tree of views, that's a signal that application has been fully rendered
     */
    bootstrap(): void;
}
