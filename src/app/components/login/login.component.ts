import { Component } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  logo = '../../../assets/profile.png';
  usuario!: Usuario;
  formLogin!: FormGroup;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.formLogin = this.fb.group({
      usuario: new FormControl('', Validators.required),
      contrasena: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  ingresar(): void {
    this.usuario = this.formLogin.getRawValue();
    this.usuarioService
      .login(this.usuario.usuario, this.usuario.contrasena)
      .subscribe((data: Usuario[]) => {
        if (data.length > 0) {
          this.message('Bienvenido');
          this.router.navigateByUrl('/dashboard');
        } else {
          this.message('Usuario incorrecto');
        }
      });
  }

  message(mensaje: string) {
    this.snackBar.open(`¡${mensaje}!`, 'Salir', {
      duration: this.usuarioService.time() * 1000,
    });
  }
}
