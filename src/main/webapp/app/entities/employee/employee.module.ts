import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TorgCrmSharedModule } from '../../shared';
import {
    EmployeeService,
    EmployeePopupService,
    EmployeeComponent,
    EmployeeDetailComponent,
    EmployeeDialogComponent,
    EmployeePopupComponent,
    EmployeeDeletePopupComponent,
    EmployeeDeleteDialogComponent,
    employeeRoute,
    employeePopupRoute,
} from './';

const ENTITY_STATES = [
    ...employeeRoute,
    ...employeePopupRoute,
];

@NgModule({
    imports: [
        TorgCrmSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmployeeComponent,
        EmployeeDetailComponent,
        EmployeeDialogComponent,
        EmployeeDeleteDialogComponent,
        EmployeePopupComponent,
        EmployeeDeletePopupComponent,
    ],
    entryComponents: [
        EmployeeComponent,
        EmployeeDialogComponent,
        EmployeePopupComponent,
        EmployeeDeleteDialogComponent,
        EmployeeDeletePopupComponent,
    ],
    providers: [
        EmployeeService,
        EmployeePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgCrmEmployeeModule {}
