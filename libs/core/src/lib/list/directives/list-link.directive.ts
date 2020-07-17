import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[fd-list-link], [fdListLink]'
})
export class ListLinkDirective {
    /** */
    @Input()
    @HostBinding('class.fd-list__link--navigation-indicator')
    navigationIndicator: boolean = false;

    /** */
    @Input()
    @HostBinding('class.is-navigated')
    navigated: boolean = false;

    /** */
    @Input()
    @HostBinding('class.is-selected')
    selected: boolean = false;

    /** Whether tab is selected */
    @HostBinding('class.fd-list__link')
    fdListSecondaryClass: boolean = true;
}
