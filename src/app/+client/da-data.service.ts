import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import "rxjs/add/operator/toPromise";


@Injectable()
export class DaDataService {
    apiUrl: string = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/';

    errors: any[] = window['errors'] ? window['errors'] : [];

    constructor(private http: Http){}

    options() {
        let req = new RequestOptions({headers:new Headers()});
        req.headers.set('Content-Type', 'application/json');
        req.headers.set('Accept', 'application/json');
        req.headers.set('Authorization', 'Token bb951f2f6d32b1d4880e8cbe00228cc95a559332');
        return req;
    }

    suggest(method: string, query: string, count = 10) {
        return this.http.post(this.apiUrl + 'suggest/' + method, JSON.stringify({query: query, count: count}), this.options())
            .toPromise()
            .then((res: any) => res.json().suggestions)
            .catch((error: Response) => {
                let info = error.json(),
                    data = {
                        code: error.status,
                        text: error.statusText + ' (' + error.status + '): ' + (info.error_description ? info.error_description : info.error),
                        response: error,
                    };
                this.errors.push(data);
                window['errors'] = this.errors;
                console.error(data.text);
            });
    }
}

