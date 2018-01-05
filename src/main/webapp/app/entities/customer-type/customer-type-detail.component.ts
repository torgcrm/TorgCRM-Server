import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerType } from './customer-type.model';
import { CustomerTypeService } from './customer-type.service';

@Component({
    selector: 'jhi-customer-type-detail',
    templateUrl: './customer-type-detail.component.html'
})
export class CustomerTypeDetailComponent implements OnInit, OnDestroy {

    customerType: CustomerType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private customerTypeService: CustomerTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCustomerTypes();
    }

    load(id) {
        this.customerTypeService.find(id).subscribe((customerType) => {
            this.customerType = customerType;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCustomerTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'customerTypeListModification',
            (response) => this.load(this.customerType.id)
        );
    }
}
