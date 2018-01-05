/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { TorgCrmTestModule } from '../../../test.module';
import { ProjectDetailComponent } from '../../../../../../main/webapp/app/entities/project/project-detail.component';
import { ProjectService } from '../../../../../../main/webapp/app/entities/project/project.service';
import { Project } from '../../../../../../main/webapp/app/entities/project/project.model';

describe('Component Tests', () => {

    describe('Project Management Detail Component', () => {
        let comp: ProjectDetailComponent;
        let fixture: ComponentFixture<ProjectDetailComponent>;
        let service: ProjectService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TorgCrmTestModule],
                declarations: [ProjectDetailComponent],
                providers: [
                    ProjectService
                ]
            })
            .overrideTemplate(ProjectDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProjectDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Project(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.project).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
