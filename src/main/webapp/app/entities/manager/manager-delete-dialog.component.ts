import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Manager } from './manager.model';
import { ManagerPopupService } from './manager-popup.service';
import { ManagerService } from './manager.service';

@Component({
    selector: 'jhi-manager-delete-dialog',
    templateUrl: './manager-delete-dialog.component.html'
})
export class ManagerDeleteDialogComponent {

    manager: Manager;

    constructor(
        private managerService: ManagerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.managerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'managerListModification',
                content: 'Deleted an manager'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-manager-delete-popup',
    template: ''
})
export class ManagerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private managerPopupService: ManagerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.managerPopupService
                .open(ManagerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
