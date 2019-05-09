import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelMenuModule} from 'primeng/panelmenu';
import { TieredMenuModule} from 'primeng/tieredmenu';
import { MenuModule} from 'primeng/menu';
import { SidebarModule} from 'primeng/sidebar';
import { StepsModule} from 'primeng/steps';
import { ToolbarModule} from 'primeng/toolbar';
import { SplitButtonModule} from 'primeng/splitbutton';
import { EditorModule} from 'primeng/editor';
import {PickListModule} from 'primeng/picklist';
import {InputMaskModule} from 'primeng/inputmask';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DialogModule} from 'primeng/dialog';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PanelMenuModule,
    TieredMenuModule,
    SidebarModule,
    MenuModule,
    StepsModule,
    ToolbarModule,
    SplitButtonModule,
    EditorModule,
    PickListModule,
    InputMaskModule,
    OverlayPanelModule,
    DialogModule,
    DataViewModule,
    PanelModule,
    DropdownModule,
    ToastModule
  ],
  exports: [
    PanelMenuModule,
    TieredMenuModule,
    SidebarModule,
    MenuModule,
    StepsModule,
    ToolbarModule,
    SplitButtonModule,
    EditorModule,
    PickListModule,
    InputMaskModule,
    OverlayPanelModule,
    DialogModule,
    DataViewModule,
    PanelModule,
    DropdownModule,
    ToastModule
  ]
})
export class PrimengModuleImportModule { }
