import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DealComponent } from './deal.component';
import { DealDetailComponent } from './deal-detail.component';
import { DealPopupComponent } from './deal-dialog.component';
import { DealDeletePopupComponent } from './deal-delete-dialog.component';

export const dealRoute: Routes = [
    {
        path: 'deal',
        component: DealComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Deals'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'deal/:id',
        component: DealDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Deals'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dealPopupRoute: Routes = [
    {
        path: 'deal-new',
        component: DealPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Deals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'deal/:id/edit',
        component: DealPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Deals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'deal/:id/delete',
        component: DealDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Deals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
