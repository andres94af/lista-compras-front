import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/models';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  titulo: string = 'Inicia sesión y gestiona tus listados';

  creds: Credentials = {
    username: '',
    password: ''
  }

  constructor(private loginService: LoginService, private router: Router) {}

  iniciarSesion(form: NgForm) {
    this.loginService.iniciarSesion(this.creds).subscribe(() => {
      this.router.navigate(['/compras']).then(() => window.location.reload());
    })
  }
}
