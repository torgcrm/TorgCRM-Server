/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { TorgCrmTestModule } from '../../../test.module';
import { MenuItemDetailComponent } from '../../../../../../main/webapp/app/entities/menu-item/menu-item-detail.component';
import { MenuItemService } from '../../../../../../main/webapp/app/entities/menu-item/menu-item.service';
import { MenuItem } from '../../../../../../main/webapp/app/entities/menu-item/menu-item.model';

describe('Component Tests', () => {

    describe('MenuItem Management Detail Component', () => {
        let comp: MenuItemDetailComponent;
        let fixture: ComponentFixture<MenuItemDetailComponent>;
        let service: MenuItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TorgCrmTestModule],
                declarations: [MenuItemDetailComponent],
                providers: [
                    MenuItemService
                ]
            })
            .overrideTemplate(MenuItemDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MenuItemDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MenuItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new MenuItem(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.menuItem).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
