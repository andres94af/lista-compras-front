import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginService.estaLogueado()) {
      const username = this.loginService.obtenerUsername();
      alert("Ya se encuentra logueado como: " + username);
      this.router.navigate(['compras']);
      return false;
    }
    return true;
  }
}
