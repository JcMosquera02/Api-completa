import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadchildren: () => import('./features/auth/auth.module').them(m => m.AuthModule)
  },
  {
    path: 'tickets',
    loadChildren: () => import('.features/tickests/tickest.module')then.(m => m.TicketsModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
    canActivate: [RoleGuard],
    data: { roles: ['admin'] }
  },
  { path: '', redirectTo: '/tickets', pathMatch: 'full' },
  { path: '**', redirectTo: '/tickets' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
