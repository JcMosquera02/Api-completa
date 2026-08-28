import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const RoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRoles = route.data['roles'] as Array<string>;
  const userRole = authService.getUserRole();

  if (!userRole || !requiredRoles.includes(userRole)) {
    router.navigate(['/tickets']);
    return false;
  }
  return true;
};