import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Department } from './department.model';
import { DepartmentPopupService } from './department-popup.service';
import { DepartmentService } from './department.service';

@Component({
    selector: 'jhi-department-delete-dialog',
    templateUrl: './department-delete-dialog.component.html'
})
export class DepartmentDeleteDialogComponent {

    department: Department;

    constructor(
        private departmentService: DepartmentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.departmentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'departmentListModification',
                content: 'Deleted an department'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-department-delete-popup',
    template: ''
})
export class DepartmentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private departmentPopupService: DepartmentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.departmentPopupService
                .open(DepartmentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
