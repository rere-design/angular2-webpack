import {Component, OnInit} from "@angular/core";
import {Bx24Service} from "../shared/bx24.service";
import {User} from "../models/user";
import {AuthService} from "../+login/auth.service";
import {SystemService} from "../shared/system.service";

@Component({
    selector: 'main-component',
    template: require('./main.html'),
})

export class MainComponent implements OnInit {
    user: User;

    tasks: any[];
    subTasks: any[];
    comments: any[];
    groups: any[];
    users: any[];
    files: any[];
    comment: any;
    errors: any[];

    ngOnInit(): void {
        this.errors = localStorage['errors'] ? JSON.parse(localStorage['errors']) : [];
        this.system.currentUser.then(user => this.user = user);
        this.bxService.errors.subscribe((error) => {
            if(error) this.errors.push(error);
            localStorage['errors'] = JSON.stringify(this.errors);
        });
    }

    logout() {
        this.auth.logout();
    }

    constructor(private bxService: Bx24Service, private system: SystemService, private auth: AuthService) {
        // Список задач
        this.bxService.get('task.item.list', [
            {PRIORITY: 'asc', DEADLINE: 'asc', START_DATE_PLAN: 'asc', END_DATE_PLAN: 'asc', ID: 'asc'},
            {'>ID': 0},
            {
                NAV_PARAMS: {
                    nPageSize: 5,
                    iNumPage: 1
                }
            }
        ]).then((data: any) => {
            this.tasks = data.result;
            console.log('Задачи', this.tasks);
        }).then(() => {

            // Список чеклистов
            this.bxService.get('task.checklistitem.getlist', [this.tasks[0].ID, {SORT_INDEX: 'ASC'}]).then((data: any) => {
                this.subTasks = data.result;
                console.log('Подзадачи', this.subTasks);
            });

            // Список коментариев
            this.bxService.get('task.commentitem.getlist', [this.tasks[0].ID, {ID: 'ASC'}]).then((data: any) => {
                this.comments = data.result;
                console.log('Комментарии', this.comments);
            });

            // Список файлов по задаче
            this.bxService.get('task.item.getfiles', [this.tasks[0].ID]).then((data: any) => {
                this.files = data.result;
                console.log('Файлы', this.files);
            });
        });

        // Список проектов
        this.bxService.get('sonet_group.get', [
            {NAME: 'ASC'}
        ]).then((data: any) => {
            this.groups = data.result;
            console.log('Проекты', this.groups);
        });

        /*this.bxService.get('disk.storage.getlist', [{filter:{'ENTITY_TYPE': 'group'}]).then((data: any) => {
         console.log('Хранилища', data.result);
         });
         this.bxService.get('disk.file.get', {id:'124'}).then((data: any) => {
         console.log('Файл', data.result);
         });
         this.bxService.get('disk.folder.getchildren', {id:'35'}).then((data: any) => {
         console.log('Папка', data.result);
         });*/
        this.bxService.get('task.item.getmanifest', {}).then((data: any) => {
            console.log('Данные', data.result);
        });
    }

}