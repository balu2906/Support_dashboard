import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
// <<<<<<< lakshmi-tcheckbox
import { HighchartsChartModule } from 'highcharts-angular';


// =======
import { FilterComponent } from '../../filter/filter.component';
import { FilterPipe } from '../../utils/filter.pipe';
// <<<<<<< HEAD
import { ResolvedTicketsComponent } from '../../resolved-tickets/resolved-tickets.component';
// import { ClosedTicketsComponent } from '../../closed-tickets/closed-tickets.component';
// import { OpenAlertsComponent } from '../../open-alerts/open-alerts.component';
// import { ClosedAlertsComponent } from '../../closed-alerts/closed-alerts.component';

// =======
// import {ResolvedTicketsComponent} from '../../resolved-tickets/resolved-tickets.component';
import { ClosedTicketsComponent } from '../../closed-tickets/closed-tickets.component';
// import { ClosedAlertsComponent } from '../../closed-alerts/closed-alerts.component';
// import { OpenAlertsComponent } from '../../open-alerts/open-alerts.component';
import { OpenAlertsComponent } from '../../open-alerts/open-alerts.component';
 
// >>>>>>> 6cdf65251da3713bd7f400622f6cb982a73f285b
// // >>>>>>> main
@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    // <<<<<<< lakshmi-tcheckbox
    HighchartsChartModule,
    MatTooltipModule,
    // =======
    MatTooltipModule
    // >>>>>>> main
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    FilterComponent,
    FilterPipe,
    ResolvedTicketsComponent,
// <<<<<<< HEAD
    ClosedTicketsComponent,
     OpenAlertsComponent,
    // ClosedAlertsComponent,
// =======
//     ClosedTicketsComponent,
//     ClosedAlertsComponent,
//     OpenAlertsComponent
// >>>>>>> 6cdf65251da3713bd7f400622f6cb982a73f285b
  ],
  exports: [FilterComponent]
})

export class AdminLayoutModule { }
