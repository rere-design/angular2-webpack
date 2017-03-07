import {Injectable, EventEmitter} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {AuthService} from "../+login/auth.service";


@Injectable()
export class Bx24Service {
    apiUrl: string;

    errors = new EventEmitter();

    constructor(private http: Http, private authService: AuthService) {
        this.apiUrl = authService.getDomain();
    }

    url(method: string, params: any = {}): string {
        params['auth'] = this.authService.getToken();
        return this.apiUrl + method + '.json?' + Bx24Service.build_query(params);
    }

    get(method: string, params: any = {}) {
        // if(!this.authService.isLoggedIn) return false;
        return this.http.get(this.url(method, params))
            .toPromise()
            .then((res: any) => res.json())
            .catch((error: Response) => this.error(error));
    }

    post(method: string, params: any) {
        // if(!this.authService.isLoggedIn) return false;
        return this.http.post(this.url(method), Bx24Service.build_query(params))
            .toPromise()
            .then((res: any) => res.json())
            .catch((error: Response) => this.error(error));
    }

    error(error: Response) {
        let info = error.json();
        this.errors.emit({
            type: 'alert',
            code: error.status,
            title: error.statusText + ' (' + error.status + '):',
            text: info && info.error_description ? info.error_description : info.error,
            response: error,
            time: new Date(),
        });
    }

    static build_query(obj: any, temp_key?: string, encode = true): string {
        let output_string: string[] = [];
        Object.keys(obj).forEach(function (val) {
            let key = val;
            key = encodeURIComponent(key);
            temp_key ? key = temp_key + '[' + key + ']' : '';
            if (typeof obj[val] === 'object') {
                let query = Bx24Service.build_query(obj[val], key, encode);
                output_string.push(query)
            } else {
                let value = encode ? encodeURIComponent(obj[val]) : obj[val];
                output_string.push(key + '=' + value)
            }
        });
        return output_string.join('&');
    }

}

