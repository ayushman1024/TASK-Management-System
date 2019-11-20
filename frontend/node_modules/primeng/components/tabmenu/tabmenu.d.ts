import { QueryList, AfterContentInit, TemplateRef } from '@angular/core';
import { MenuItem } from '../common/menuitem';
export declare class TabMenu implements AfterContentInit {
    model: MenuItem[];
    activeItem: MenuItem;
    popup: boolean;
    style: any;
    styleClass: string;
    templates: QueryList<any>;
    itemTemplate: TemplateRef<any>;
    ngAfterContentInit(): void;
    itemClick(event: Event, item: MenuItem): void;
}
export declare class TabMenuModule {
}
