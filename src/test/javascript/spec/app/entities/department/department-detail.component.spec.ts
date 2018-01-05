/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { TorgCrmTestModule } from '../../../test.module';
import { DepartmentDetailComponent } from '../../../../../../main/webapp/app/entities/department/department-detail.component';
import { DepartmentService } from '../../../../../../main/webapp/app/entities/department/department.service';
import { Department } from '../../../../../../main/webapp/app/entities/department/department.model';

describe('Component Tests', () => {

    describe('Department Management Detail Component', () => {
        let comp: DepartmentDetailComponent;
        let fixture: ComponentFixture<DepartmentDetailComponent>;
        let service: DepartmentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TorgCrmTestModule],
                declarations: [DepartmentDetailComponent],
                providers: [
                    DepartmentService
                ]
            })
            .overrideTemplate(DepartmentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DepartmentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Department(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.department).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
