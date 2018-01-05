import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Menu } from './menu.model';
import { MenuPopupService } from './menu-popup.service';
import { MenuService } from './menu.service';

@Component({
    selector: 'jhi-menu-delete-dialog',
    templateUrl: './menu-delete-dialog.component.html'
})
export class MenuDeleteDialogComponent {

    menu: Menu;

    constructor(
        private menuService: MenuService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.menuService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'menuListModification',
                content: 'Deleted an menu'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-menu-delete-popup',
    template: ''
})
export class MenuDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private menuPopupService: MenuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.menuPopupService
                .open(MenuDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
