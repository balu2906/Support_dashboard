import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {Service} from "./service/service"




import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
// import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { ClosedTicketsComponent } from './closed-tickets/closed-tickets.component';


import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { HighchartsChartModule } from 'highcharts-angular';

import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import {TokenInterceptorService} from './token-interceptor.service'


@NgModule({
  imports: [
    BrowserAnimationsModule,
    HighchartsChartModule,
    FormsModule,
    ReactiveFormsModule,
    // MatInputModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),

   
    AdminLayoutModule,


    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,

    ],
  providers: [Service,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
