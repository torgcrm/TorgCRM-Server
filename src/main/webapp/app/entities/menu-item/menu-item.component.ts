import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MenuItem } from './menu-item.model';
import { MenuItemService } from './menu-item.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-menu-item',
    templateUrl: './menu-item.component.html'
})
export class MenuItemComponent implements OnInit, OnDestroy {
menuItems: MenuItem[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private menuItemService: MenuItemService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.menuItemService.query().subscribe(
            (res: ResponseWrapper) => {
                this.menuItems = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMenuItems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MenuItem) {
        return item.id;
    }
    registerChangeInMenuItems() {
        this.eventSubscriber = this.eventManager.subscribe('menuItemListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
