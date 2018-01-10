import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ManagerComponent } from './manager.component';
import { ManagerDetailComponent } from './manager-detail.component';
import { ManagerPopupComponent } from './manager-dialog.component';
import { ManagerDeletePopupComponent } from './manager-delete-dialog.component';

export const managerRoute: Routes = [
    {
        path: 'manager',
        component: ManagerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Managers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'manager/:id',
        component: ManagerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Managers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const managerPopupRoute: Routes = [
    {
        path: 'manager-new',
        component: ManagerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Managers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'manager/:id/edit',
        component: ManagerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Managers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'manager/:id/delete',
        component: ManagerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Managers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
