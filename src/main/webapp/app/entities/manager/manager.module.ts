import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgCrmSharedModule } from '../../shared';
import {
    ManagerService,
    ManagerPopupService,
    ManagerComponent,
    ManagerDetailComponent,
    ManagerDialogComponent,
    ManagerPopupComponent,
    ManagerDeletePopupComponent,
    ManagerDeleteDialogComponent,
    managerRoute,
    managerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...managerRoute,
    ...managerPopupRoute,
];

@NgModule({
    imports: [
        TorgCrmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ManagerComponent,
        ManagerDetailComponent,
        ManagerDialogComponent,
        ManagerDeleteDialogComponent,
        ManagerPopupComponent,
        ManagerDeletePopupComponent,
    ],
    entryComponents: [
        ManagerComponent,
        ManagerDialogComponent,
        ManagerPopupComponent,
        ManagerDeleteDialogComponent,
        ManagerDeletePopupComponent,
    ],
    providers: [
        ManagerService,
        ManagerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgCrmManagerModule {}
