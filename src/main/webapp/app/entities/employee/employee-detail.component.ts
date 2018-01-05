import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
    selector: 'jhi-employee-detail',
    templateUrl: './employee-detail.component.html'
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {

    employee: Employee;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private employeeService: EmployeeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEmployees();
    }

    load(id) {
        this.employeeService.find(id).subscribe((employee) => {
            this.employee = employee;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEmployees() {
        this.eventSubscriber = this.eventManager.subscribe(
            'employeeListModification',
            (response) => this.load(this.employee.id)
        );
    }
}
