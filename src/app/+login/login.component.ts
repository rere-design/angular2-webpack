/**
 * Created by semyonchick on 21.07.2016.
 */
import {Component, ElementRef, ViewChild, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Component({
    templateUrl: './login.html',
    styles: [
        'label, span {line-height: 40px}',
        'label, span {font-size: 16px}',
        'label {text-align: right}',
    ]
})

export class LoginComponent implements OnInit{
    @ViewChild('iframe') iframe: ElementRef;

    domain: string;
    token: string;
    step: number = 1;

    message: string;
    form: boolean = true;

    // private error: boolean = false;

    constructor(public authService: AuthService, public router: Router) {
    }

    ngOnInit(): void {
        if (this.authService.isLoggedIn) this.redirect();
        let parseDomain = this.authService.getDomain() ? this.authService.getDomain().match(/[\w\d-]+\.bitrix24\.\w{2,3}/) : '';
        if(parseDomain){
            this.domain = parseDomain[0];
            this.login();
        }
    }

    login() {
        if (!this.token) {
            this.step = 2;
            this.iframe.nativeElement.setAttribute('src', this.authService.go(this.domain));
            this.iframe.nativeElement.style = {display: 'block'};
            let data = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow.document;
            if(data.getElementsByTagName('h1').length && (this.token = data.getElementsByTagName('h1')[0].innerText)) this.login();
        } else {
            this.authService.login(this.domain, this.token.toString());
            this.redirect();
        }
        return false;
    }

    redirect() {
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
        this.router.navigate([redirect]);

    }
}
