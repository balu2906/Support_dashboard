import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ResolvedTicketsComponent } from "../../resolved-tickets/resolved-tickets.component";
import { ClosedTicketsComponent } from "../../closed-tickets/closed-tickets.component";
import { OpenAlertsComponent} from "../../open-alerts/open-alerts.component";
import {ClosedAlertsComponent} from "../../closed-alerts/closed-alerts.component";
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
    { path: 'resolved-tickets', component: ResolvedTicketsComponent },
    { path: 'closed-tickets', component: ClosedTicketsComponent },
    { path: 'open-alerts', component: OpenAlertsComponent},
    { path: 'closed-alerts', component: ClosedAlertsComponent}
];
