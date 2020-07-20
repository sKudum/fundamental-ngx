import { ComponentRef, EventEmitter, InjectionToken } from '@angular/core';
import { MobileModeConfig } from '../utils/interfaces/mobile-mode-config';
import { MobileControl } from '../utils/interfaces/mobile-control.interface';

export const DATE_PICKER_COMPONENT = new InjectionToken<DatePickerInterface>('DatePickerInterface');

/**
 * Date Picker Interface to have typing and avoid circular dependency between
 * DatePickerComponent <==> DatePickerMobileComponent
 */
export interface DatePickerInterface extends MobileControl {
    mobileConfig: MobileModeConfig;
    isOpenChange: EventEmitter<boolean>;
    mobileModeComponentRef: ComponentRef<any>;

    openCalendar();
    closeCalendar();
}
