import { ElementRef, isDevMode, TemplateRef, ViewChild } from '@angular/core';
import { DialogConfig, DialogRef, DialogService, MobileModeConfig } from '@fundamental-ngx/core';
import { MobileModeControl } from '../interfaces/mobile-component.interface';
import { MOBILE_CONFIG_ERROR } from '../consts';
import { Subject } from 'rxjs';

export abstract class MobileBase<T> {
    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden */
    dialogRef: DialogRef;

    /** @hidden */
    mobileModeConfig: MobileModeConfig;

    /** @hidden */
    protected readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        protected _elementRef: ElementRef,
        protected _dialogService: DialogService,
        protected _component: MobileModeControl & T) {

        this.mobileModeConfig = this._getMobileModeConfig();
    }

    get dialogConfig(): DialogConfig {
        return this._component.dialogConfig || {};
    }

    private _getMobileModeConfig(): MobileModeConfig {
        if (this._component.mobileConfig) {
            return this._component.mobileConfig;
        } else {
            if (isDevMode()) {
                throw new Error(MOBILE_CONFIG_ERROR);
            }
        }
    }
}
