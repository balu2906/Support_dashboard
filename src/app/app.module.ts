import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// <<<<<<< HEAD
import { ResolvedTicketsComponent } from './resolved-tickets/resolved-tickets.component';
import { ClosedTicketsComponent } from './closed-tickets/closed-tickets.component';
import { OpenAlertsComponent } from './open-alerts/open-alerts.component';
import { ClosedAlertsComponent } from './closed-alerts/closed-alerts.component';
// =======
import {LoginComponent} from './login/login.component';
import { ToastrModule } from 'ngx-toastr';

// >>>>>>> df08fe4707ee225b99cd229c641e49c8d829c1dc

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
// <<<<<<< HEAD
    ResolvedTicketsComponent,
    ClosedTicketsComponent,
    OpenAlertsComponent,
    ClosedAlertsComponent,
// =======
    LoginComponent
// >>>>>>> df08fe4707ee225b99cd229c641e49c8d829c1dc

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
