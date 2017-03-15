import {Component, EventEmitter, Output, ViewChild} from "@angular/core";
import {Bx24Service} from "./bx24.service";

@Component({
    template: `<input #file type="file" (change)="uploadFiles($event.target.files)" multiple>`,
    selector: 'upload-file'
})

export class UploadFile {
    @ViewChild('file') file;
    @Output() onUploadFile: EventEmitter<any> = new EventEmitter();

    storageId = 1;
    method = 'disk.storage.uploadfile';

    constructor(private service: Bx24Service) {
    }

    uploadFiles(response) {
        [].forEach.call(response, (file) => {
            let reader = new FileReader();
            reader.onload = () => {
                if (0) {
                    this.service.post(this.method, {
                        id: this.storageId,
                        fileContent: [file.name, btoa(reader.result)],
                        data: {NAME: file.name}
                    }).then((file) => {
                        this.onUploadFile.emit(file);
                    })
                }else {
                    this.onUploadFile.emit(file);
                }

            };
            reader.readAsBinaryString(file);
        });
        this.file.nativeElement.value = '';
    }
}