/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TorgCrmTestModule } from '../../../test.module';
import { MenuItemDialogComponent } from '../../../../../../main/webapp/app/entities/menu-item/menu-item-dialog.component';
import { MenuItemService } from '../../../../../../main/webapp/app/entities/menu-item/menu-item.service';
import { MenuItem } from '../../../../../../main/webapp/app/entities/menu-item/menu-item.model';
import { MenuService } from '../../../../../../main/webapp/app/entities/menu';

describe('Component Tests', () => {

    describe('MenuItem Management Dialog Component', () => {
        let comp: MenuItemDialogComponent;
        let fixture: ComponentFixture<MenuItemDialogComponent>;
        let service: MenuItemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TorgCrmTestModule],
                declarations: [MenuItemDialogComponent],
                providers: [
                    MenuService,
                    MenuItemService
                ]
            })
            .overrideTemplate(MenuItemDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MenuItemDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MenuItemService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MenuItem(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.menuItem = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'menuItemListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MenuItem();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.menuItem = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'menuItemListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
