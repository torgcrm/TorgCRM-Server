/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { TorgCrmTestModule } from '../../../test.module';
import { TaskDetailComponent } from '../../../../../../main/webapp/app/entities/task/task-detail.component';
import { TaskService } from '../../../../../../main/webapp/app/entities/task/task.service';
import { Task } from '../../../../../../main/webapp/app/entities/task/task.model';

describe('Component Tests', () => {

    describe('Task Management Detail Component', () => {
        let comp: TaskDetailComponent;
        let fixture: ComponentFixture<TaskDetailComponent>;
        let service: TaskService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TorgCrmTestModule],
                declarations: [TaskDetailComponent],
                providers: [
                    TaskService
                ]
            })
            .overrideTemplate(TaskDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TaskDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Task(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.task).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
