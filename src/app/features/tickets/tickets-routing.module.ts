import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: TicketListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: TicketFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'client'] }
  },
  {
    path: ':id',
    component: TicketDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id/edit',
    component: TicketFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'agent'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }