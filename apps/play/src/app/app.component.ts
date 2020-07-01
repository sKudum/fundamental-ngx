import {
    Component,
    Inject,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
    DIALOG_REF,
    DialogRef,
    DialogService
} from '@fundamental-ngx/core';

interface Food {
    value: string;
    viewValue: string;
}


@Component({
    selector: 'fundamental-ngx-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'play';

    @ViewChild('dialogRef', {read: TemplateRef})
    dialogDef: TemplateRef<any>;

    foods: Food[] = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
    ];

    constructor(public dialog: MatDialog, private _dialogService: DialogService) {}

    openDialog() {
        // const dialogRef = this.dialog.open(this.dialogDef);
        // const dialogRef = this.dialog.open(DialogContentExampleDialog);

        // dialogRef.afterClosed().subscribe(result => {
        //     console.log(`Dialog result: ${result}`);
        // });


        // const dialogRef = this._dialogService.open(this.dialogDef, { responsivePadding: true });
        const dialogRef = this._dialogService.open(DialogContentExampleDialog, { responsivePadding: true });
    }

}


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'dialog-content-example-dialog',
    templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) {
    }

    foods: Food[] = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
    ];
}
