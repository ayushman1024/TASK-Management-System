export declare class Positioning {
    private getAllStyles;
    private getStyle;
    private isStaticPositioned;
    private offsetParent;
    position(element: HTMLElement, round?: boolean): ClientRect;
    offset(element: HTMLElement, round?: boolean): ClientRect;
    positionElements(hostElement: HTMLElement, targetElement: HTMLElement, placement: string, appendToBody?: boolean): boolean;
}
export declare function positionElements(hostElement: HTMLElement, targetElement: HTMLElement, placement: string | Placement | PlacementArray, appendToBody?: boolean, baseClass?: string): Placement;
export declare type Placement = 'auto' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';
export declare type PlacementArray = Placement | Array<Placement> | string;
