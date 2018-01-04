import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CustomerType } from './customer-type.model';
import { CustomerTypePopupService } from './customer-type-popup.service';
import { CustomerTypeService } from './customer-type.service';

@Component({
    selector: 'jhi-customer-type-delete-dialog',
    templateUrl: './customer-type-delete-dialog.component.html'
})
export class CustomerTypeDeleteDialogComponent {

    customerType: CustomerType;

    constructor(
        private customerTypeService: CustomerTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'customerTypeListModification',
                content: 'Deleted an customerType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-type-delete-popup',
    template: ''
})
export class CustomerTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private customerTypePopupService: CustomerTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.customerTypePopupService
                .open(CustomerTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
