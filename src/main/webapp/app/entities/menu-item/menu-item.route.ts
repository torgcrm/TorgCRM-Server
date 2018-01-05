import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MenuItemComponent } from './menu-item.component';
import { MenuItemDetailComponent } from './menu-item-detail.component';
import { MenuItemPopupComponent } from './menu-item-dialog.component';
import { MenuItemDeletePopupComponent } from './menu-item-delete-dialog.component';

export const menuItemRoute: Routes = [
    {
        path: 'menu-item',
        component: MenuItemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MenuItems'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'menu-item/:id',
        component: MenuItemDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MenuItems'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const menuItemPopupRoute: Routes = [
    {
        path: 'menu-item-new',
        component: MenuItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MenuItems'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'menu-item/:id/edit',
        component: MenuItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MenuItems'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'menu-item/:id/delete',
        component: MenuItemDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MenuItems'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
