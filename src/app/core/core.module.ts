import {NgModule} from "@angular/core";
import {Bx24Service} from "../shared/bx24.service";
import {MainComponent} from "./main.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        MainComponent
    ],
    exports: [MainComponent],
    providers: [
        Bx24Service,
    ],
})

export class CoreModule {

}
