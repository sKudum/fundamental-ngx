import { Component, ElementRef, Inject, OnInit, TemplateRef } from '@angular/core';
import { DialogService } from '../../dialog/dialog-service/dialog.service';
import { DATE_PICKER_COMPONENT, DatePickerInterface } from '../date-picker.interface';
import { MobileControlBase } from '../../utils/base-class/mobile-control-base.class';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'fd-date-picker-mobile',
    templateUrl: './date-picker-mobile.component.html',
    styleUrls: ['./date-picker-mobile.component.scss']
})
export class DatePickerMobileComponent extends MobileControlBase<DatePickerInterface> implements OnInit {
    /** @hidden External content */
    childContent: TemplateRef<any> = null;

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

    /** @hidden */
    private _listenOnOpenChange() {
        this._component.isOpenChange.pipe(
            takeUntil(this._onDestroy$)
        ).subscribe(isOpen => isOpen ? this._openDialog() : this.dialogRef.close())
    }
}
