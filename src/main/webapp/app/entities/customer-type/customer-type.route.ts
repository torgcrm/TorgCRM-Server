import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CustomerTypeComponent } from './customer-type.component';
import { CustomerTypeDetailComponent } from './customer-type-detail.component';
import { CustomerTypePopupComponent } from './customer-type-dialog.component';
import { CustomerTypeDeletePopupComponent } from './customer-type-delete-dialog.component';

export const customerTypeRoute: Routes = [
    {
        path: 'customer-type',
        component: CustomerTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomerTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'customer-type/:id',
        component: CustomerTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomerTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerTypePopupRoute: Routes = [
    {
        path: 'customer-type-new',
        component: CustomerTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomerTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-type/:id/edit',
        component: CustomerTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomerTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-type/:id/delete',
        component: CustomerTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomerTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
