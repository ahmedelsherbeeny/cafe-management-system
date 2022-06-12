import { NgModule } from '@angular/core';

import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { menuitems } from './menuItems';


@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
   ],
  providers: [menuitems ]
})
export class SharedModule { }
