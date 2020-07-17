import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[fd-list-thumbnail], [fdListThumbnail]'
})
export class ListThumbnailDirective {

    /** Whether tab is selected */
    @HostBinding('class.fd-list__thumbnail')
    fdListThumbnailClass: boolean = true;
}
