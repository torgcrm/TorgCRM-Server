import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerType } from './customer-type.model';
import { CustomerTypePopupService } from './customer-type-popup.service';
import { CustomerTypeService } from './customer-type.service';

@Component({
    selector: 'jhi-customer-type-dialog',
    templateUrl: './customer-type-dialog.component.html'
})
export class CustomerTypeDialogComponent implements OnInit {

    customerType: CustomerType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private customerTypeService: CustomerTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.customerType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.customerTypeService.update(this.customerType));
        } else {
            this.subscribeToSaveResponse(
                this.customerTypeService.create(this.customerType));
        }
    }

    private subscribeToSaveResponse(result: Observable<CustomerType>) {
        result.subscribe((res: CustomerType) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CustomerType) {
        this.eventManager.broadcast({ name: 'customerTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-customer-type-popup',
    template: ''
})
export class CustomerTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerTypePopupService: CustomerTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.customerTypePopupService
                    .open(CustomerTypeDialogComponent as Component, params['id']);
            } else {
                this.customerTypePopupService
                    .open(CustomerTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
