import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-date-picker-mobile-example',
    template: ` <fd-date-picker [mobile]="true" [type]="'single'" [(ngModel)]="date"></fd-date-picker>
        <div>Selected Date: {{ date ? date.toDateString() : 'null' }}</div>`
})
export class DatePickerMobileExampleComponent {
    date = FdDate.getToday();
}
