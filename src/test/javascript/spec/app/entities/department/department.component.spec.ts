/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { TorgCrmTestModule } from '../../../test.module';
import { DepartmentComponent } from '../../../../../../main/webapp/app/entities/department/department.component';
import { DepartmentService } from '../../../../../../main/webapp/app/entities/department/department.service';
import { Department } from '../../../../../../main/webapp/app/entities/department/department.model';

describe('Component Tests', () => {

    describe('Department Management Component', () => {
        let comp: DepartmentComponent;
        let fixture: ComponentFixture<DepartmentComponent>;
        let service: DepartmentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TorgCrmTestModule],
                declarations: [DepartmentComponent],
                providers: [
                    DepartmentService
                ]
            })
            .overrideTemplate(DepartmentComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DepartmentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Department(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.departments[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
