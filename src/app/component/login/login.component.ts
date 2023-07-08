import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/models';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  titulo:string = "Inicia sesión y gestiona tus listados";

  email:string;
  password:string;

  constructor(private loginService:LoginService, private router:Router){}

  iniciarSesion(){
    if(this.email != "" && this.password != ""){
      let autenticado:boolean = this.loginService.iniciarSesion(this.email, this.password);
      if (autenticado) {
        this.router.navigate(['/compras']);
      }
    }
  }

}
