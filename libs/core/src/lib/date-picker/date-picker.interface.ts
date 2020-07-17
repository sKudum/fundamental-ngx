import { EventEmitter, InjectionToken } from '@angular/core';
import { MobileModeConfig } from '../utils/interfaces/mobile-mode-config';
import { DialogConfig } from '../dialog/dialog-utils/dialog-config.class';
import { FdScreenOrientation } from '../utils/functions/screen-orientation';
import { MobileModeControl } from '../utils/interfaces/mobile-component.interface';

export const DATE_PICKER_COMPONENT = new InjectionToken<DatePickerInterface>('DatePickerInterface');

/**
 * Date Picker Interface to have typing and avoid circular dependency between
 * DatePickerComponent <==> DatePickerMobileComponent
 */
export interface DatePickerInterface extends MobileModeControl {
    mobileConfig: MobileModeConfig;
    dialogConfig: DialogConfig;
    isOpenChange: EventEmitter<boolean>;
    screenOrientation: FdScreenOrientation;
    openCalendar();
    closeCalendar();
}
