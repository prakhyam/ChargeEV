import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../addstations/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../transactions/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ComponentsModule } from "../../components/components.module";
import { AddStationComponent } from '../../add-station/add-station.component';


@NgModule({
    declarations: [
        DashboardComponent,
        TableListComponent,
        UpgradeComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        AddStationComponent,
        NotificationsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ChartsModule,
        NgbModule,
        ToastrModule.forRoot(),
        ComponentsModule
    ]
})

export class AdminLayoutModule {}
