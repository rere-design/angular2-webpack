import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {SystemService} from "../../shared/system.service";
import {Bx24Service} from "../../shared/bx24.service";
import {Task} from "../../models/task"

@Component({
    selector: 'task-list',
    templateUrl: './task-list.html',
})
export class TaskListComponent implements OnInit {
    tasks: Task[];

    private _params: any;

    constructor(private system: SystemService, private bxService: Bx24Service, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        let tasks;
        // Следим за роутингом
        this.route.params.subscribe((params: Params)=> {
            // Список задач
            if (!tasks || this._params['group'] != params['group'] || this._params['user'] != params['user']) {
                let filter = {'>ID': 0};
                if (params['group']) filter['GROUP_ID'] = params['group'];
                if (params['user']) filter['RESPONSIBLE_ID'] = params['user'];
                tasks = this.bxService.get('task.item.list', [
                    {PRIORITY: 'asc', DEADLINE: 'asc', START_DATE_PLAN: 'asc', ID: 'asc'},
                    filter,
                    {NAV_PARAMS: {nPageSize: 10, iNumPage: 1}}
                ]).then((data: any) => (this.tasks = data.result.map(task => {
                    this.system.groups.then(data => task['group'] = data.filter(group => task.GROUP_ID == group.ID)[0]);
                    this.system.users.then(data => task['responsible'] = data.filter(user => task.RESPONSIBLE_ID == user.ID)[0]);
                    return task;
                })));
            }
            this._params = Object.assign({}, params);
        });
    }

    routeTo(name: string, value: string) {
        let params = Object.assign({}, this._params);
        if (value) params[name] = value;
        else delete params[name];
        return ['/tasks', params];
    }

    changeStatus(task) {
        task.STATUS = task.STATUS > 0 ? -2 : 5;
    }
}