import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TorgCrmProjectModule } from './project/project.module';
import { TorgCrmCustomerModule } from './customer/customer.module';
import { TorgCrmEmployeeModule } from './employee/employee.module';
import { TorgCrmDepartmentModule } from './department/department.module';
import { TorgCrmDealModule } from './deal/deal.module';
import { TorgCrmTaskModule } from './task/task.module';
import { TorgCrmMenuModule } from './menu/menu.module';
import { TorgCrmMenuItemModule } from './menu-item/menu-item.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TorgCrmProjectModule,
        TorgCrmCustomerModule,
        TorgCrmEmployeeModule,
        TorgCrmDepartmentModule,
        TorgCrmDealModule,
        TorgCrmTaskModule,
        TorgCrmMenuModule,
        TorgCrmMenuItemModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TorgCrmEntityModule {}
