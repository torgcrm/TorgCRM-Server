import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgCrmSharedModule } from '../../shared';
import {
    DealService,
    DealPopupService,
    DealComponent,
    DealDetailComponent,
    DealDialogComponent,
    DealPopupComponent,
    DealDeletePopupComponent,
    DealDeleteDialogComponent,
    dealRoute,
    dealPopupRoute,
} from './';

const ENTITY_STATES = [
    ...dealRoute,
    ...dealPopupRoute,
];

@NgModule({
    imports: [
        TorgCrmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DealComponent,
        DealDetailComponent,
        DealDialogComponent,
        DealDeleteDialogComponent,
        DealPopupComponent,
        DealDeletePopupComponent,
    ],
    entryComponents: [
        DealComponent,
        DealDialogComponent,
        DealPopupComponent,
        DealDeleteDialogComponent,
        DealDeletePopupComponent,
    ],
    providers: [
        DealService,
        DealPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgCrmDealModule {}
