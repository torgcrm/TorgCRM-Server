import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgCrmSharedModule } from '../../shared';
import {
    MenuItemService,
    MenuItemPopupService,
    MenuItemComponent,
    MenuItemDetailComponent,
    MenuItemDialogComponent,
    MenuItemPopupComponent,
    MenuItemDeletePopupComponent,
    MenuItemDeleteDialogComponent,
    menuItemRoute,
    menuItemPopupRoute,
} from './';

const ENTITY_STATES = [
    ...menuItemRoute,
    ...menuItemPopupRoute,
];

@NgModule({
    imports: [
        TorgCrmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MenuItemComponent,
        MenuItemDetailComponent,
        MenuItemDialogComponent,
        MenuItemDeleteDialogComponent,
        MenuItemPopupComponent,
        MenuItemDeletePopupComponent,
    ],
    entryComponents: [
        MenuItemComponent,
        MenuItemDialogComponent,
        MenuItemPopupComponent,
        MenuItemDeleteDialogComponent,
        MenuItemDeletePopupComponent,
    ],
    providers: [
        MenuItemService,
        MenuItemPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgCrmMenuItemModule {}
