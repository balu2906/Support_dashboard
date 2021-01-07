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
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { HighchartsChartModule } from 'highcharts-angular';
// <<<<<<< HEAD
import {MatDatepickerModule} from '@angular/material/datepicker';
 
// =======
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// >>>>>>> 258d0ecc125ed71f8f90c67c003b25d63674f79e
import { FilterComponent } from '../../filter/filter.component';
import { FilterPipe } from '../../utils/filter.pipe';
import { ResolvedTicketsComponent } from '../../resolved-tickets/resolved-tickets.component';
import { ClosedTicketsComponent } from '../../closed-tickets/closed-tickets.component';
import { ClosedAlertsComponent } from '../../closed-alerts/closed-alerts.component';
import { OpenAlertsComponent } from '../../open-alerts/open-alerts.component';
import { AdminComponent } from '../../admin/admin.component';



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
    HighchartsChartModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
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
    ClosedTicketsComponent,
    OpenAlertsComponent,
    ClosedAlertsComponent,
    AdminComponent
  ],
  exports: [FilterComponent]
})

export class AdminLayoutModule { }
