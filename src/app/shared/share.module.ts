import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {DateFormatPipe} from "./date-format.pipe";
import {CommonModule} from "@angular/common";
import {UploadFile} from "./upload-file";

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpModule,
    ],
    declarations: [
        UploadFile,
        DateFormatPipe,
    ],
    exports: [
        DateFormatPipe,
        HttpModule,
        BrowserModule,
        FormsModule,
        UploadFile,
        // CommonModule,
    ],
})

export class ShareModule {

}
