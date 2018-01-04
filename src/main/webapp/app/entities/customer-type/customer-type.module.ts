import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgCrmSharedModule } from '../../shared';
import {
    CustomerTypeService,
    CustomerTypePopupService,
    CustomerTypeComponent,
    CustomerTypeDetailComponent,
    CustomerTypeDialogComponent,
    CustomerTypePopupComponent,
    CustomerTypeDeletePopupComponent,
    CustomerTypeDeleteDialogComponent,
    customerTypeRoute,
    customerTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...customerTypeRoute,
    ...customerTypePopupRoute,
];

@NgModule({
    imports: [
        TorgCrmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CustomerTypeComponent,
        CustomerTypeDetailComponent,
        CustomerTypeDialogComponent,
        CustomerTypeDeleteDialogComponent,
        CustomerTypePopupComponent,
        CustomerTypeDeletePopupComponent,
    ],
    entryComponents: [
        CustomerTypeComponent,
        CustomerTypeDialogComponent,
        CustomerTypePopupComponent,
        CustomerTypeDeleteDialogComponent,
        CustomerTypeDeletePopupComponent,
    ],
    providers: [
        CustomerTypeService,
        CustomerTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgCrmCustomerTypeModule {}
