import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
    AppComponent,
    DialogContentExampleDialog
} from './app.component';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {
    ButtonModule,
    SelectModule
} from '@fundamental-ngx/core';
import { DialogModule } from '@fundamental-ngx/core';

@NgModule({
    declarations: [AppComponent, DialogContentExampleDialog],
    imports: [BrowserAnimationsModule, BrowserModule, MatSelectModule, MatFormFieldModule, MatDialogModule,
        SelectModule, DialogModule, ButtonModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
