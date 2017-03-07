import {NgModule} from "@angular/core";
import {Bx24Service} from "../shared/bx24.service";
import {Routes, RouterModule} from "@angular/router";
import {AuthGuard} from "../+login/auth-guard.service";
import {ClientComponent} from "./client.component";
import {CommonModule} from "@angular/common";
import {DaDataService} from "./da-data.service";
import {ShareModule} from "../shared/share.module";
import {SystemService} from "../shared/system.service";

const clientRoutes: Routes = [
    {path: 'clients', component: ClientComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [
        RouterModule.forChild(clientRoutes),
        CommonModule,
        ShareModule
    ],
    declarations: [
        ClientComponent,
    ],
    providers: [
        Bx24Service,
        SystemService,
        DaDataService
    ],
})

export class ClientModule {

}
