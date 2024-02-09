import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { EstudianteService } from '../../../services/estudiante.service';
import { Estudiante } from '../../../interfaces/estudiante';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nuevo-estudiante',
  standalone: true,
  imports: [
    NavbarComponent,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './nuevo-estudiante.component.html',
  styleUrl: './nuevo-estudiante.component.css',
})
export class NuevoEstudianteComponent implements OnInit {
  estudiante!: Estudiante;
  estudianteForm!: FormGroup;
  id!: number;

  constructor(
    private estudianteService: EstudianteService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.estudiante = {
      nombre: '',
      apellido: '',
      carrera: '',
    };
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.estudianteService.get(this.id).subscribe((data: Estudiante) => {
          if (data) {
            this.estudiante = data;
            this.estudianteForm.setValue(data);
          }
        });
      }
    });
  }
  ngOnInit(): void {
    this.estudianteForm = this.fb.group({
      id: new FormControl(
        { value: this.estudiante.id, disabled: this.estudiante.id != null },
        []
      ),
      nombre: new FormControl(this.estudiante.nombre, [Validators.required]),
      apellido: new FormControl(this.estudiante.apellido, [
        Validators.required,
      ]),
      edad: new FormControl(this.estudiante.edad, [Validators.required]),
      carrera: new FormControl(this.estudiante.nombre, [Validators.required]),
    });
  }

  createEstudiante(): void {
    this.estudiante = this.estudianteForm.getRawValue();
    this.estudianteService.create(this.estudiante).subscribe((data: Estudiante) => {
      if (data) this.message(`Estudiante creado`);
    });
  }
  updateEstudiante(): void {
    this.estudiante = this.estudianteForm.getRawValue();
    this.estudianteService
      .update(this.id, this.estudiante)
      .subscribe((data: Estudiante) => {
        if (data) this.message(`Estudiante ${this.estudiante.nombre} ${this.estudiante.apellido} actualizado`);
      });
  }
  submit(): void {
    if (this.id) this.updateEstudiante();
    else this.createEstudiante();
    this.router.navigateByUrl(`/dashboard`);
  }
  clean(): void {
    this.estudianteForm.reset();
    this.router.navigateByUrl(`/dashboard`);
  }

  message(mensaje: string): void {
    this.snackBar.open(`¡${mensaje}!`, 'Salir', {
      duration: this.estudianteService.time() * 1000,
    });
  }
}
