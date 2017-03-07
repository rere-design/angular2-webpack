import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import {Bx24Service} from "./bx24.service";
import {User} from "../models/user";
import {Group} from "../models/group";


@Injectable()
export class SystemService {

    private _currentUser;
    private _users;
    private _groups;

    constructor(private bxService: Bx24Service) {
    }

    get currentUser(): Promise<User> {
        return this._currentUser = this._currentUser ||
            this.bxService.get('user.current', [
                {}
            ]).then((data: any) => Object.assign(new User, data.result));
    }

    get users(): Promise<User[]> {
        return this._users = this._users ||
            this.bxService.get('user.get', [
                {}
            ]).then((data: any) => data.result.map(item => Object.assign(new User, item)));
    }

    get groups(): Promise<Group[]> {
        return this._groups = this._groups ||
            this.bxService.get('sonet_group.get', [
                {NAME: 'ASC'}
            ]).then((data: any) => data.result.map(item => Object.assign(new Group, item)));
    }
}

