/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TorgCrmTestModule } from '../../../test.module';
import { EmployeeDialogComponent } from '../../../../../../main/webapp/app/entities/employee/employee-dialog.component';
import { EmployeeService } from '../../../../../../main/webapp/app/entities/employee/employee.service';
import { Employee } from '../../../../../../main/webapp/app/entities/employee/employee.model';
import { DepartmentService } from '../../../../../../main/webapp/app/entities/department';

describe('Component Tests', () => {

    describe('Employee Management Dialog Component', () => {
        let comp: EmployeeDialogComponent;
        let fixture: ComponentFixture<EmployeeDialogComponent>;
        let service: EmployeeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TorgCrmTestModule],
                declarations: [EmployeeDialogComponent],
                providers: [
                    DepartmentService,
                    EmployeeService
                ]
            })
            .overrideTemplate(EmployeeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Employee(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.employee = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'employeeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Employee();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.employee = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'employeeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
