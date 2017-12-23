import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { TorgCrmceSharedModule, UserRouteAccessService } from './shared';
import { TorgCrmceAppRoutingModule} from './app-routing.module';
import { TorgCrmceHomeModule } from './home/home.module';
import { TorgCrmceAdminModule } from './admin/admin.module';
import { TorgCrmceAccountModule } from './account/account.module';
import { TorgCrmceEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        TorgCrmceAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        TorgCrmceSharedModule,
        TorgCrmceHomeModule,
        TorgCrmceAdminModule,
        TorgCrmceAccountModule,
        TorgCrmceEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class TorgCrmceAppModule {}
