import { Component, ElementRef, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogRef, DialogService, MobileModeConfig } from '@fundamental-ngx/core';
import { CALENDAR_COMPONENT, CalendarInterface } from '../../models/calendar.interface';

@Component({
    selector: 'fd-calendar-mobile',
    templateUrl: './calendar-mobile.component.html',
    styleUrls: ['./calendar-mobile.component.scss']
})
export class CalendarMobileComponent implements OnInit {

    /** @hidden Dialog template reference */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden */
    dialogRef: DialogRef;

    childContent: TemplateRef<any> = undefined;

    constructor(
        private _elementRef: ElementRef,
        private _dialogService: DialogService,
        @Inject(CALENDAR_COMPONENT) private _calendarComponent: CalendarInterface
    ) { }

    ngOnInit(): void {
    }

    /** @hidden */
    get mobileConfig(): MobileModeConfig {
        return this._calendarComponent.mobileConfig || {};
    }
}
