import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {SystemService} from "../../shared/system.service";

@Component({
    templateUrl: './task.html',
})

export class TaskComponent implements OnInit {
    private _params: Params;

    constructor(private system: SystemService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params)=> this._params = params);
    }

    // обновляем переменую в роутинге
    updateRouter(name: string, value: string) {
        let params = Object.assign({}, this._params);
        if(params[name] == value) return;
        if (value) params[name] = value;
        else delete params[name];
        this.router.navigate(['/tasks', params]);
    }
}