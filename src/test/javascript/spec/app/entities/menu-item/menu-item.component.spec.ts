/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { TorgCrmTestModule } from '../../../test.module';
import { MenuItemComponent } from '../../../../../../main/webapp/app/entities/menu-item/menu-item.component';
import { MenuItemService } from '../../../../../../main/webapp/app/entities/menu-item/menu-item.service';
import { MenuItem } from '../../../../../../main/webapp/app/entities/menu-item/menu-item.model';

describe('Component Tests', () => {

    describe('MenuItem Management Component', () => {
        let comp: MenuItemComponent;
        let fixture: ComponentFixture<MenuItemComponent>;
        let service: MenuItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TorgCrmTestModule],
                declarations: [MenuItemComponent],
                providers: [
                    MenuItemService
                ]
            })
            .overrideTemplate(MenuItemComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MenuItemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MenuItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new MenuItem(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.menuItems[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
