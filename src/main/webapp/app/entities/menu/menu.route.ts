import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MenuComponent } from './menu.component';
import { MenuDetailComponent } from './menu-detail.component';
import { MenuPopupComponent } from './menu-dialog.component';
import { MenuDeletePopupComponent } from './menu-delete-dialog.component';

export const menuRoute: Routes = [
    {
        path: 'menu',
        component: MenuComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Menus'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'menu/:id',
        component: MenuDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Menus'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const menuPopupRoute: Routes = [
    {
        path: 'menu-new',
        component: MenuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Menus'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'menu/:id/edit',
        component: MenuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Menus'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'menu/:id/delete',
        component: MenuDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Menus'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
