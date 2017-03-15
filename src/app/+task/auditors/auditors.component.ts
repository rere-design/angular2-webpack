import {Component, Input} from "@angular/core";
import {User} from "../../models/user";

@Component({
    templateUrl: 'auditors.html',
    selector: 'auditors'
})
export class AuditorsComponent {
    @Input() auditors: User[];

    constructor() {
    }

    ngOnInit() {
    }
}