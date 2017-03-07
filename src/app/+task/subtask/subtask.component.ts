import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SubTask} from "../../models/subTask";
import {Bx24Service} from "../../shared/bx24.service";

@Component({
    templateUrl: './subtask.html',
    selector: 'sub-task',
})

export class SubTaskComponent {
    subTasks: SubTask[];
    params;

    constructor(private bxService: Bx24Service, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            if (params['task'] && this.params != params['task']) {
                this.params = params['task'];
                this.bxService.get('task.checklistitem.getlist', [this.params, {SORT_INDEX: 'ASC'}]).then((data: any) => {
                    this.subTasks = data.result;
                    console.log('подзадачи', this.subTasks);
                });
            }
        });

    }

    changeStatus(e) {
        console.log(e);
    }


    save(task: any) {
        this.bxService.get('task.checklistitem.update', [this.params, task.ID, {TITLE: task.TITLE}]).then(() => {
                return false;
            }
        );
    }

}