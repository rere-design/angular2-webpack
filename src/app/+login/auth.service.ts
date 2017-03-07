import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import {Router} from "@angular/router";


@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;
    redirectUrl: string;

    private token: string;
    private clientId = 'local.58760b75b13ab4.18962256';
    // private clientSecret = 'lXyZoUw1iG3D33w7vunRFiIOvq75CwXTzZ7oXOTPy35JS7PgWU';

    constructor(public router: Router) {
        if (localStorage.getItem('token') && localStorage.getItem('tokenExpire') && +localStorage.getItem('tokenExpire') > (new Date()).getTime()) {
            this.auth(localStorage.getItem('token'));
        } else {
            this.isLoggedIn = false;
        }
    }

    getDomain(): string {
        return localStorage.getItem('domain');
    }

    getToken(): string {
        if (this.isLoggedIn && +localStorage.getItem('tokenExpire') < (new Date()).getTime()) {
            if (confirm('Время авторизации истекло, необходима повторная авторизация. Покинуть страницу?')) {
                this.logout();
                this.router.navigate(['/login']);
            }
            return null;
        }
        return this.token;
    }

    go(domain: string) {

        return 'https://' + domain + '/oauth/authorize/?client_id=' + this.clientId + '&state=' + location.host;
    }

    login(domain: string, token: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('domain', 'https://' + domain + '/rest/');
        localStorage.setItem('tokenExpire', (3500 * 1000 + (new Date()).getTime()).toString());
        this.auth(token);
    }

    auth(token: string) {
        this.isLoggedIn = true;
        this.token = token;
    }

    logout() {
        this.token = '';
        this.isLoggedIn = false;
        localStorage.removeItem('token');
        localStorage.removeItem('domain');
        localStorage.removeItem('tokenExpire');
        this.router.navigate(['/login']);
    }
}
