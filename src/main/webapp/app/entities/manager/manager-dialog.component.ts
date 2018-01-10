import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Manager } from './manager.model';
import { ManagerPopupService } from './manager-popup.service';
import { ManagerService } from './manager.service';

@Component({
    selector: 'jhi-manager-dialog',
    templateUrl: './manager-dialog.component.html'
})
export class ManagerDialogComponent implements OnInit {

    manager: Manager;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private managerService: ManagerService,
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
        if (this.manager.id !== undefined) {
            this.subscribeToSaveResponse(
                this.managerService.update(this.manager));
        } else {
            this.subscribeToSaveResponse(
                this.managerService.create(this.manager));
        }
    }

    private subscribeToSaveResponse(result: Observable<Manager>) {
        result.subscribe((res: Manager) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Manager) {
        this.eventManager.broadcast({ name: 'managerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-manager-popup',
    template: ''
})
export class ManagerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private managerPopupService: ManagerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.managerPopupService
                    .open(ManagerDialogComponent as Component, params['id']);
            } else {
                this.managerPopupService
                    .open(ManagerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
