/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { TorgCrmTestModule } from '../../../test.module';
import { ManagerDetailComponent } from '../../../../../../main/webapp/app/entities/manager/manager-detail.component';
import { ManagerService } from '../../../../../../main/webapp/app/entities/manager/manager.service';
import { Manager } from '../../../../../../main/webapp/app/entities/manager/manager.model';

describe('Component Tests', () => {

    describe('Manager Management Detail Component', () => {
        let comp: ManagerDetailComponent;
        let fixture: ComponentFixture<ManagerDetailComponent>;
        let service: ManagerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TorgCrmTestModule],
                declarations: [ManagerDetailComponent],
                providers: [
                    ManagerService
                ]
            })
            .overrideTemplate(ManagerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ManagerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ManagerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Manager(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.manager).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
