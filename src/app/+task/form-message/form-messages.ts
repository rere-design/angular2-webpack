import {Component, Output, OnInit, EventEmitter, Input} from "@angular/core";
import {Message} from "../../models/message";
import {File} from "../../models/file";
import {Bx24Service} from "../../shared/bx24.service";

@Component({
    templateUrl: 'form-messages.html',
    selector: 'form-messages',
})

export class FormMessagesComponent implements OnInit {
    @Input() message: Message;
    @Input() taskID: number|string;

    @Output() onSubmit: EventEmitter<any> = new EventEmitter();


    constructor(private bxService: Bx24Service) {
    }

    ngOnInit() {
        this.initModel();
    }

    initModel() {
        this.message = this.message ? this.message : Object.assign({}, new Message());
    }


    addFile(id) {
        this.message.FILES.push(id);
    }

    save() {
        if (this.message.POST_MESSAGE.length) {
            if (!this.message.ID) {
                this.bxService.get('task.commentitem.add', [this.taskID, {'POST_MESSAGE': this.message.POST_MESSAGE}]).then(() => {
                        this.onSubmit.emit();
                        this.message = Object.assign({}, new Message());
                    }
                );
            } else {
                this.bxService.get('task.commentitem.update', [this.taskID, this.message.ID, {'POST_MESSAGE': this.message.POST_MESSAGE}]).then(() => {
                        this.onSubmit.emit();
                    }
                );
            }
        } else {
            alert('нельзя' + (this.message.ID ? ' сохранить' : ' добавить') + ' пустое сообщение');
        }
    }
}