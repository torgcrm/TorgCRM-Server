/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { TorgCrmTestModule } from '../../../test.module';
import { DealComponent } from '../../../../../../main/webapp/app/entities/deal/deal.component';
import { DealService } from '../../../../../../main/webapp/app/entities/deal/deal.service';
import { Deal } from '../../../../../../main/webapp/app/entities/deal/deal.model';

describe('Component Tests', () => {

    describe('Deal Management Component', () => {
        let comp: DealComponent;
        let fixture: ComponentFixture<DealComponent>;
        let service: DealService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TorgCrmTestModule],
                declarations: [DealComponent],
                providers: [
                    DealService
                ]
            })
            .overrideTemplate(DealComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DealComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DealService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Deal(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.deals[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
