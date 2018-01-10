import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Manager } from './manager.model';
import { ManagerService } from './manager.service';

@Component({
    selector: 'jhi-manager-detail',
    templateUrl: './manager-detail.component.html'
})
export class ManagerDetailComponent implements OnInit, OnDestroy {

    manager: Manager;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private managerService: ManagerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInManagers();
    }

    load(id) {
        this.managerService.find(id).subscribe((manager) => {
            this.manager = manager;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInManagers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'managerListModification',
            (response) => this.load(this.manager.id)
        );
    }
}
