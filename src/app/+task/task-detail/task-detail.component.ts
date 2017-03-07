import {Component, OnInit} from "@angular/core";
import {Params, ActivatedRoute} from "@angular/router";
import {User} from "../../models/user";
import {SystemService} from "../../shared/system.service";
import {Bx24Service} from "../../shared/bx24.service";
import {Task} from "../../models/task";

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.html',
})

export class TaskDetailComponent implements OnInit {
    auditors: User[];
    task: Task;

    private _params: Params;

    constructor(private system: SystemService, private bxService: Bx24Service, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params)=> {
            // Список задач
            this._params = params;
            if (params['task'] && (!this.task || this.task.ID != params['task'])) {
                this.bxService.get('task.item.list', [
                    {PRIORITY: 'asc', DEADLINE: 'asc', START_DATE_PLAN: 'asc', ID: 'asc'},
                    {'ID': params['task']},
                    {NAV_PARAMS: {nPageSize: 10, iNumPage: 1}}
                ]).then((data: any) => (this.task = data.result.map(task => {
                    this.system.groups.then(data => task['group'] = data.filter(group => task.GROUP_ID == group.ID)[0]);
                    this.system.users.then(data => {
                        task['responsible'] = data.filter(user => task.RESPONSIBLE_ID == user.ID)[0];
                        this.auditors = data.filter(user=> task.AUDITORS.filter(id=>id == user.ID)[0]);
                    });
                    console.log('данный таск', task);
                    return task;
                })[0]));
            }

            if (!params['task']) this.task = null;
        });
    }

    routeTo(name: string, value: string) {
        let params = Object.assign({}, this._params);
        if (value) params[name] = value;
        else delete params[name];
        return ['/tasks', params];
    }
}