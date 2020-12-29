import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';




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
// <<<<<<< HEAD
// <<<<<<< lakshmi-tcheckbox
// import { ResolvedTicketsComponent } from './resolved-tickets/resolved-tickets.component';
import { ClosedTicketsComponent } from './closed-tickets/closed-tickets.component';

// import { ClosedAlertsComponent } from './closed-alerts/closed-alerts.component';
// =======
// // <<<<<<< lakshmi-tcheckbox
// import { ResolvedTicketsComponent } from './resolved-tickets/resolved-tickets.component';
// import { ClosedTicketsComponent } from './closed-tickets/closed-tickets.component';
// import { OpenAlertsComponent } from './open-alerts/open-alerts.component';
// import { ClosedAlertsComponent } from './closed-alerts/closed-alerts.component';
// >>>>>>> 6cdf65251da3713bd7f400622f6cb982a73f285b
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { HighchartsChartModule } from 'highcharts-angular';
// import { ResolvedTicketsComponent } from './resolved-tickets/resolved-tickets.component';
// import { ClosedTicketsComponent } from './closed-tickets/closed-tickets.component';
// import { OpenAlertsComponent } from './open-alerts/open-alerts.component';
// import { ClosedAlertsComponent } from './closed-alerts/closed-alerts.component';
// import {LoginComponent} from './login/login.component';
// import {AdminLayoutModule} from './layouts/admin-layout/admin-layout.module';
// import { FilterPipe } from './utils/filter.pipe'

// import { ResolvedTicketsComponent } from './resolved-tickets/resolved-tickets.component';
// import { ClosedTicketsComponent } from './closed-tickets/closed-tickets.component';
// import { OpenAlertsComponent } from './open-alerts/open-alerts.component';
import { ClosedAlertsComponent } from './closed-alerts/closed-alerts.component';
// // =======
// import {LoginComponent} from './login/login.component';
// import { ToastrModule } from 'ngx-toastr';
// import {LoginComponent} from './login/login.component';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HighchartsChartModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),

    // <<<<<<< HEAD
    // =======
    AdminLayoutModule,

    // >>>>>>> 6cdf65251da3713bd7f400622f6cb982a73f285b
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right'
    })
    // <<<<<<< HEAD
    //     // >>>>>>> e4166bb3a8a230ab1d3998aee31f75cd4c1a5267
    // =======

    // >>>>>>> 6cdf65251da3713bd7f400622f6cb982a73f285b
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    // <<<<<<< HEAD
    // <<<<<<< lakshmi-tcheckbox
    // ResolvedTicketsComponent,
    // ClosedTicketsComponent,
    // OpenAlertsComponent,
    ClosedAlertsComponent,
    // TypographyComponent,
    LoginComponent
    // =======
    // <<<<<<< HEAD
    // ResolvedTicketsComponent,
    //     ClosedTicketsComponent,
    //     OpenAlertsComponent,
    //     ClosedAlertsComponent,
    //     LoginComponent
    // // =======
    // <<<<<<< HEAD
    // =======
    // >>>>>>> 6cdf65251da3713bd7f400622f6cb982a73f285b
    // ResolvedTicketsComponent,
    // ClosedTicketsComponent,
    // OpenAlertsComponent,
    // ClosedAlertsComponent,
    // <<<<<<< HEAD
    // =======
    // LoginComponent
    // >>>>>>> df08fe4707ee225b99cd229c641e49c8d829c1dc
    // >>>>>>> e4166bb3a8a230ab1d3998aee31f75cd4c1a5267
    // >>>>>>> main


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
