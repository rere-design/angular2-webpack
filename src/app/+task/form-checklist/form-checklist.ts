import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {SubTask} from "../../models/subTask";

@Component({
    templateUrl: './form-checklist.html',
    selector: 'form-check',
})

export class FormCheckComponent implements OnInit {
    @Input() check: SubTask;
    @Output() onClose: EventEmitter<any> = new EventEmitter();

    constructor() {

    }

    ngOnInit(): void {
        this.check = this.check ? this.check : new SubTask;
    }
}