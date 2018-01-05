import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MenuItem } from './menu-item.model';
import { MenuItemService } from './menu-item.service';

@Component({
    selector: 'jhi-menu-item-detail',
    templateUrl: './menu-item-detail.component.html'
})
export class MenuItemDetailComponent implements OnInit, OnDestroy {

    menuItem: MenuItem;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private menuItemService: MenuItemService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMenuItems();
    }

    load(id) {
        this.menuItemService.find(id).subscribe((menuItem) => {
            this.menuItem = menuItem;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMenuItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'menuItemListModification',
            (response) => this.load(this.menuItem.id)
        );
    }
}
