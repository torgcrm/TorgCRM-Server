import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MenuItem } from './menu-item.model';
import { MenuItemPopupService } from './menu-item-popup.service';
import { MenuItemService } from './menu-item.service';
import { Menu, MenuService } from '../menu';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-menu-item-dialog',
    templateUrl: './menu-item-dialog.component.html'
})
export class MenuItemDialogComponent implements OnInit {

    menuItem: MenuItem;
    isSaving: boolean;

    menus: Menu[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private menuItemService: MenuItemService,
        private menuService: MenuService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.menuService.query()
            .subscribe((res: ResponseWrapper) => { this.menus = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.menuItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.menuItemService.update(this.menuItem));
        } else {
            this.subscribeToSaveResponse(
                this.menuItemService.create(this.menuItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<MenuItem>) {
        result.subscribe((res: MenuItem) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MenuItem) {
        this.eventManager.broadcast({ name: 'menuItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMenuById(index: number, item: Menu) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-menu-item-popup',
    template: ''
})
export class MenuItemPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private menuItemPopupService: MenuItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.menuItemPopupService
                    .open(MenuItemDialogComponent as Component, params['id']);
            } else {
                this.menuItemPopupService
                    .open(MenuItemDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
