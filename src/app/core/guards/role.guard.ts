import { Injectable } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivateFn {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as Array<string>;
    const userRole = this.authService.getUserRole();

    if (!userRole || !requiredRoles.includes(userRole)) {
      this.router.navigate(['/tickets']);
      return false;
    }
    return true;
  }
}