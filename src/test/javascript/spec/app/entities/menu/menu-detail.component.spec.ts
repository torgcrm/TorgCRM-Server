/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { TorgCrmTestModule } from '../../../test.module';
import { MenuDetailComponent } from '../../../../../../main/webapp/app/entities/menu/menu-detail.component';
import { MenuService } from '../../../../../../main/webapp/app/entities/menu/menu.service';
import { Menu } from '../../../../../../main/webapp/app/entities/menu/menu.model';

describe('Component Tests', () => {

    describe('Menu Management Detail Component', () => {
        let comp: MenuDetailComponent;
        let fixture: ComponentFixture<MenuDetailComponent>;
        let service: MenuService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TorgCrmTestModule],
                declarations: [MenuDetailComponent],
                providers: [
                    MenuService
                ]
            })
            .overrideTemplate(MenuDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MenuDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MenuService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Menu(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.menu).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
