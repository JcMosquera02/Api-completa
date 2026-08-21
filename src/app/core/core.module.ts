import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TokenRefreshInterceptor } from './interceptors/token-refresh.interceptor';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@NgModule({
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    RoleGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenRefreshInterceptor, multi: true }
  ]
})
export class CoreModule { }