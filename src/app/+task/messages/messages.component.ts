import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Bx24Service} from "../../shared/bx24.service";

@Component({
    templateUrl: './messages.html',
    selector: 'messages'
})

export class MessagesComponent implements OnInit {
    messages: any;
    params;

    constructor(private bxService: Bx24Service, private route: ActivatedRoute) {

    }

    ngOnInit() {
        //следит за изменением route
        this.route.params.subscribe((params) => {
            if (params['task'] && this.params != params['task']) {
                this.params = params['task'];
                //получение комментариев
                this.getComments();
            }
        })
    }

    getComments() {
        this.bxService.get('task.commentitem.getlist', [this.params, {ID: 'ASC'}]).then((data: any) => this.messages = data.result.filter(({}, i) => i > 0).reverse());
    }
}