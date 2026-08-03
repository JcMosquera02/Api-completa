import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

@NgModule({
  providers: [AuthGuard, RoleGuard]
})
export class CoreModule { }