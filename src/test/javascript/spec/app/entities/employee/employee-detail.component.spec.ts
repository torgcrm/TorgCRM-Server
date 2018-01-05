/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { TorgCrmTestModule } from '../../../test.module';
import { EmployeeDetailComponent } from '../../../../../../main/webapp/app/entities/employee/employee-detail.component';
import { EmployeeService } from '../../../../../../main/webapp/app/entities/employee/employee.service';
import { Employee } from '../../../../../../main/webapp/app/entities/employee/employee.model';

describe('Component Tests', () => {

    describe('Employee Management Detail Component', () => {
        let comp: EmployeeDetailComponent;
        let fixture: ComponentFixture<EmployeeDetailComponent>;
        let service: EmployeeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TorgCrmTestModule],
                declarations: [EmployeeDetailComponent],
                providers: [
                    EmployeeService
                ]
            })
            .overrideTemplate(EmployeeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Employee(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.employee).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
