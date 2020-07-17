import { Component, ElementRef, Inject, OnInit, TemplateRef } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core';
import { Subscription } from 'rxjs';
import { DATE_PICKER_COMPONENT, DatePickerInterface } from '../date-picker.interface';
import { MobileBase } from '../../utils/base-class/mobile-base.class';
import { FdScreenOrientation } from '../../utils/functions/screen-orientation';

@Component({
  selector: 'fd-date-picker-mobile',
  templateUrl: './date-picker-mobile.component.html',
  styleUrls: ['./date-picker-mobile.component.scss']
})
export class DatePickerMobileComponent extends MobileBase<DatePickerInterface> implements OnInit {
    /** @hidden External content */
    childContent: TemplateRef<any> = null;

    /** @hidden External content */
    screenOrientation = FdScreenOrientation;

    /** @hidden */
    private _subscriptions = new Subscription();

    constructor(
        elementRef: ElementRef,
        dialogService: DialogService,
        @Inject(DATE_PICKER_COMPONENT) component: DatePickerInterface
    ) {
        super(elementRef, dialogService, component);
    }

    ngOnInit(): void {
        this._listenOnOpenChange();
    }

    cancel() {
        this._component.closeCalendar();
    }

    approve() {
        this._component.closeCalendar();
    }

    /** @hidden Opens the Dialog */
    private _openDialog(): void {
        this.dialogRef = this._dialogService.open(this.dialogTemplate, {
            ...this.dialogConfig,
            mobile: true,
            verticalPadding: false,
            responsivePadding: true,
            escKeyCloseable: false,
            backdropClickCloseable: false,
            container: this._elementRef.nativeElement
        });
    }

    private _listenOnOpenChange() {

        this._subscriptions.add(
            this._component.isOpenChange
                .subscribe(isOpen => isOpen ? this._openDialog() : this.dialogRef.close())
        )
    }
}
