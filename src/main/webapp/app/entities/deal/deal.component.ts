import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Deal } from './deal.model';
import { DealService } from './deal.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-deal',
    templateUrl: './deal.component.html'
})
export class DealComponent implements OnInit, OnDestroy {
deals: Deal[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private dealService: DealService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.dealService.query().subscribe(
            (res: ResponseWrapper) => {
                this.deals = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDeals();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Deal) {
        return item.id;
    }
    registerChangeInDeals() {
        this.eventSubscriber = this.eventManager.subscribe('dealListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
