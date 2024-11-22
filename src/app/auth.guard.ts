import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verificar si el usuario está autenticado
    const isAuthenticated = !!localStorage.getItem('user'); // Verifica si hay datos de usuario guardados

    if (!isAuthenticated) {
      // Si no está autenticado, redirige al login
      this.router.navigate(['/login']);
      return false;
    }

    return true; // Permite el acceso si está autenticado
  }
}
