import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CustomerType } from './customer-type.model';
import { CustomerTypeService } from './customer-type.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-customer-type',
    templateUrl: './customer-type.component.html'
})
export class CustomerTypeComponent implements OnInit, OnDestroy {
customerTypes: CustomerType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private customerTypeService: CustomerTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.customerTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.customerTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCustomerTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CustomerType) {
        return item.id;
    }
    registerChangeInCustomerTypes() {
        this.eventSubscriber = this.eventManager.subscribe('customerTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
