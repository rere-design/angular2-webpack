import {Component, Input, OnInit, EventEmitter, Output} from "@angular/core";
import {Message} from "../../models/message";
import {SystemService} from "../../shared/system.service";
import {Bx24Service} from "../../shared/bx24.service";
import {User} from "../../models/user";

@Component({
    templateUrl: 'message.html',
    selector: 'message'
})
export class MessageComponent implements OnInit {
    @Input() message: Message;
    @Input() taskID;

    @Output() onChange:EventEmitter<boolean> = new EventEmitter();

    user;
    currentUser;

    constructor(private system: SystemService, private bxService: Bx24Service) {

    }

    ngOnInit(): void {
        this.system.currentUser.then((data: User) => this.currentUser = data);
        this.system.users.then(users => {
            this.user = users.filter((user: User) => this.message.AUTHOR_ID == user.ID)[0];
        });
    }

    remove() {
        if (confirm('Вы действительно хотите удалить сообщение?'))
            this.bxService.get('task.commentitem.delete', [this.taskID, this.message.ID]).then(() => this.onChange.emit(true));
    }
}