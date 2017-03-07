import {Component, OnInit} from "@angular/core";
import {Bx24Service} from "../shared/bx24.service";
import {DaDataService} from "./da-data.service";
import {SystemService} from "../shared/system.service";

@Component({
    // template: require('./client.html'),
    templateUrl: './client.html',
})

export class ClientComponent implements OnInit {
    clients;

    constructor(private system: SystemService, private service: Bx24Service, private dataService: DaDataService) {
        this.dataService.suggest('party', 'сбербанк').then(data => console.log('Поиск по данным', data));
    }

    ngOnInit(): void {
        this.clients = this.service.get('crm.company.list', {order: {DATE_CREATE: 'DESC'}}).then(data => data.result.map(item => {
            this.system.users.then(data => item['assigned'] = data.filter(user => item.ASSIGNED_BY_ID == user.ID)[0]);
            return item;
        }));
    }

    findFor(client) {
        let inn = client.BANKING_DETAILS ? client.BANKING_DETAILS.match(/ИНН\s*(\d{10}|\d{12})[^\d]+/) : false;
        this.dataService.suggest('party', inn ? inn[1] : client.TITLE).then(data => console.log(data));
    }

}