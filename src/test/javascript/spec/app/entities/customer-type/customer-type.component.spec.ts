/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { TorgCrmTestModule } from '../../../test.module';
import { CustomerTypeComponent } from '../../../../../../main/webapp/app/entities/customer-type/customer-type.component';
import { CustomerTypeService } from '../../../../../../main/webapp/app/entities/customer-type/customer-type.service';
import { CustomerType } from '../../../../../../main/webapp/app/entities/customer-type/customer-type.model';

describe('Component Tests', () => {

    describe('CustomerType Management Component', () => {
        let comp: CustomerTypeComponent;
        let fixture: ComponentFixture<CustomerTypeComponent>;
        let service: CustomerTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TorgCrmTestModule],
                declarations: [CustomerTypeComponent],
                providers: [
                    CustomerTypeService
                ]
            })
            .overrideTemplate(CustomerTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new CustomerType(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.customerTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
