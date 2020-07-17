import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListItemDirective } from './list-item.directive';
import {
    ListFooterDirective,
    ListGroupHeaderDirective,
    ListIconDirective,
    ListLabelDirective,
    ListSecondaryDirective,
    ListTitleDirective
} from './list.directives';
import { ListMessageDirective } from './list-message.directive';
import { ListLinkDirective } from './directives/list-link.directive';
import { ListFormItemDirective } from './directives/list-form-item.directive';
import { ListBylineDirective } from './directives/list-byline.directive';
import { ListContentDirective } from './directives/list-content.directive';
import { ListThumbnailDirective } from './directives/list-thumbnail.directive';
@NgModule({
    declarations: [
        ListComponent,
        ListItemDirective,
        ListLabelDirective,
        ListTitleDirective,
        ListSecondaryDirective,
        ListGroupHeaderDirective,
        ListIconDirective,
        ListFooterDirective,
        ListMessageDirective,
        ListLinkDirective,
        ListFormItemDirective,
        ListBylineDirective,
        ListContentDirective,
        ListThumbnailDirective
    ],
    imports: [CommonModule],
    exports: [
        ListComponent,
        ListItemDirective,
        ListLabelDirective,
        ListTitleDirective,
        ListSecondaryDirective,
        ListGroupHeaderDirective,
        ListIconDirective,
        ListFooterDirective,
        ListMessageDirective,
        ListLinkDirective,
        ListFormItemDirective,
        ListBylineDirective,
        ListContentDirective,
        ListThumbnailDirective
    ]
})
export class ListModule {}
