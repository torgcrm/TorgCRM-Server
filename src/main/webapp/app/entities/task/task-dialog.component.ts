import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Task } from './task.model';
import { TaskPopupService } from './task-popup.service';
import { TaskService } from './task.service';
import { Customer, CustomerService } from '../customer';
import { Manager, ManagerService } from '../manager';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-task-dialog',
    templateUrl: './task-dialog.component.html'
})
export class TaskDialogComponent implements OnInit {

    task: Task;
    isSaving: boolean;

    customers: Customer[];

    managers: Manager[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private taskService: TaskService,
        private customerService: CustomerService,
        private managerService: ManagerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: ResponseWrapper) => { this.customers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.managerService.query()
            .subscribe((res: ResponseWrapper) => { this.managers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.task.id !== undefined) {
            this.subscribeToSaveResponse(
                this.taskService.update(this.task));
        } else {
            this.subscribeToSaveResponse(
                this.taskService.create(this.task));
        }
    }

    private subscribeToSaveResponse(result: Observable<Task>) {
        result.subscribe((res: Task) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Task) {
        this.eventManager.broadcast({ name: 'taskListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }

    trackManagerById(index: number, item: Manager) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-task-popup',
    template: ''
})
export class TaskPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private taskPopupService: TaskPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.taskPopupService
                    .open(TaskDialogComponent as Component, params['id']);
            } else {
                this.taskPopupService
                    .open(TaskDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
