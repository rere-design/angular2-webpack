import {NgModule} from "@angular/core";
import {ShareModule} from "../shared/share.module";
import {Routes, RouterModule} from "@angular/router";
import {AuthGuard} from "../+login/auth-guard.service";
import {AuditorsComponent} from "./auditors/auditors.component";
import {FormMessagesComponent} from "./form-message/form-messages";
import {MessagesComponent} from "./messages/messages.component";
import {MessageComponent} from "./messages/message.component";
import {SubTaskComponent} from "./subtask/subtask.component";
import {TaskDetailComponent} from "./task-detail/task-detail.component";
import {TaskComponent} from "./task/task.component";
import {TaskListComponent} from "./task-list/task-list.component";
import {FormCheckComponent} from "./form-checklist/form-checklist";

const taskRoutes: Routes = [
    {path: 'tasks', component: TaskComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [
        RouterModule.forChild(taskRoutes),
        ShareModule,
    ],
    declarations: [
        TaskComponent,
        TaskListComponent,
        TaskDetailComponent,
        AuditorsComponent,
        SubTaskComponent,
        MessagesComponent,
        FormMessagesComponent,
        MessageComponent,
        FormCheckComponent,
    ],

    providers: [],
})

export class TaskModule {

}
