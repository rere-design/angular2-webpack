import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./+login/auth-guard.service";


const routes: Routes = [
    {path: '', redirectTo: '/tasks', pathMatch: 'full'},
    // {path: 'clients', loadChildren: './+client/client.module#ClientModule'},
    // {path: 'tasks', loadChildren: '/src/app/+task/task.module#TaskModule'},
];

export const routing = RouterModule.forRoot(routes);
