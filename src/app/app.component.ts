import {Component} from "@angular/core";
import "../style/app.scss";
import {AuthService} from "./+login/auth.service";

@Component({
    selector: 'my-app', // <my-app></my-app>
    templateUrl: './app.component.html',
})
export class AppComponent {
    title: string = 'Time Manager';

    constructor(private auth:AuthService) {
        console.log((new Date()).toISOString())
    }
}
