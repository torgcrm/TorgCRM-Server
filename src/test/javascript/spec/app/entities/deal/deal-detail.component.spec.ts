/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { TorgCrmTestModule } from '../../../test.module';
import { DealDetailComponent } from '../../../../../../main/webapp/app/entities/deal/deal-detail.component';
import { DealService } from '../../../../../../main/webapp/app/entities/deal/deal.service';
import { Deal } from '../../../../../../main/webapp/app/entities/deal/deal.model';

describe('Component Tests', () => {

    describe('Deal Management Detail Component', () => {
        let comp: DealDetailComponent;
        let fixture: ComponentFixture<DealDetailComponent>;
        let service: DealService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TorgCrmTestModule],
                declarations: [DealDetailComponent],
                providers: [
                    DealService
                ]
            })
            .overrideTemplate(DealDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DealDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DealService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Deal(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.deal).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
