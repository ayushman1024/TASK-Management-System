import { TreeNodeDragEvent } from './treenodedragevent';
export declare class TreeDragDropService {
    private dragStartSource;
    private dragStopSource;
    dragStart$: import("rxjs/internal/Observable").Observable<TreeNodeDragEvent>;
    dragStop$: import("rxjs/internal/Observable").Observable<TreeNodeDragEvent>;
    startDrag(event: TreeNodeDragEvent): void;
    stopDrag(event: TreeNodeDragEvent): void;
}
