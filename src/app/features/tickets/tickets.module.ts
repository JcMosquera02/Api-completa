import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { SharedModule } from '../../shared/shared.module';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';

@NgModule({
  declarations: [
    TicketListComponent,
    TicketDetailComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    SharedModule
  ]
})
export class TicketsModule { }
