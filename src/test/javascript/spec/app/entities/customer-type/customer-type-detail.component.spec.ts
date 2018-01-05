/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { TorgCrmTestModule } from '../../../test.module';
import { CustomerTypeDetailComponent } from '../../../../../../main/webapp/app/entities/customer-type/customer-type-detail.component';
import { CustomerTypeService } from '../../../../../../main/webapp/app/entities/customer-type/customer-type.service';
import { CustomerType } from '../../../../../../main/webapp/app/entities/customer-type/customer-type.model';

describe('Component Tests', () => {

    describe('CustomerType Management Detail Component', () => {
        let comp: CustomerTypeDetailComponent;
        let fixture: ComponentFixture<CustomerTypeDetailComponent>;
        let service: CustomerTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TorgCrmTestModule],
                declarations: [CustomerTypeDetailComponent],
                providers: [
                    CustomerTypeService
                ]
            })
            .overrideTemplate(CustomerTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new CustomerType(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.customerType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
