import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerMobileComponent } from './date-picker-mobile.component';
import { ButtonModule, DialogModule } from '@fundamental-ngx/core';


@NgModule({
    declarations: [DatePickerMobileComponent],
    imports: [CommonModule, DialogModule, ButtonModule],
    exports: [DatePickerMobileComponent],
    entryComponents: [DatePickerMobileComponent]
})
export class DatePickerMobileModule { }
