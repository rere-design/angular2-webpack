import {NgModule} from "@angular/core";
import {AuthService} from "./auth.service";
import {LoginComponent} from "./login.component";
import {Routes, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AuthGuard} from "./auth-guard.service";

const loginRoutes: Routes = [
    {path: 'login', component: LoginComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(loginRoutes),
        CommonModule,
        FormsModule,
    ],
    declarations: [
        LoginComponent
    ],
    exports: [],
    providers: [
        AuthService,
        AuthGuard,
    ],
})

export class LoginModule {
}
