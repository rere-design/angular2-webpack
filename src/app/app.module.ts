import {NgModule, ApplicationRef} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {routing} from "./app.routing";
import {removeNgStyles, createNewHosts} from "@angularclass/hmr";
import {Bx24Service} from "./shared/bx24.service";
import {CoreModule} from "./core/core.module";
import {TaskModule} from "./+task/task.module";
import {ClientModule} from "./+client/client.module";
import {LoginModule} from "./+login/login.module";
import {SystemService} from "./shared/system.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,

        CoreModule,
        TaskModule,
        ClientModule,
        LoginModule,

        routing
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        Bx24Service,
        SystemService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) {
    }

    hmrOnInit(store) {
        console.log('HMR store', store);
    }

    hmrOnDestroy(store) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
