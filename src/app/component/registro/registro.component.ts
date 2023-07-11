import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/models/models';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [],
})
export class RegistroComponent {
  titulo: string = 'Registro nuevo usuario';
  existeUsuario: boolean = false;
  usuario: NuevoUsuario = {
    nombre: '',
    apellido: '',
    username: '',
    password: '',
  };

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  crearUsuario() {
    if (
      this.usuario.nombre == '' ||
      this.usuario.apellido == '' ||
      this.usuario.username == '' ||
      this.usuario.password == ''
    ) {
      alert('Debe llenar todos los campos del formulario');
      return;
    }
    this.usuarioService.nuevoUsuario(this.usuario).subscribe({
      next: (response) => {
        if (response == null) {
          this.existeUsuario = true;
        } else {
          alert('Usuario ' + this.usuario.username + ' registrado con éxito');
          this.router.navigate(['/login']);
        }
      },
      error: (err) => console.log(err),
    });
  }
}
