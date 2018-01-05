import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Deal } from './deal.model';
import { DealService } from './deal.service';

@Component({
    selector: 'jhi-deal-detail',
    templateUrl: './deal-detail.component.html'
})
export class DealDetailComponent implements OnInit, OnDestroy {

    deal: Deal;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dealService: DealService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDeals();
    }

    load(id) {
        this.dealService.find(id).subscribe((deal) => {
            this.deal = deal;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDeals() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dealListModification',
            (response) => this.load(this.deal.id)
        );
    }
}
