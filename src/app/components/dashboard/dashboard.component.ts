import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Estudiante } from '../../interfaces/estudiante';
import { EstudianteService } from '../../services/estudiante.service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from './confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarComponent,
    MatTableModule,
    MatIcon,
    MatIconButton,
    MatPaginatorModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, AfterViewInit {
  nombres_columnas: string[] = [
    'id',
    'nombre',
    'apellido',
    'edad',
    'carrera',
    'acciones',
  ];

  //GET A ESTUDIANTES
  lista_estudiantes = new MatTableDataSource<Estudiante>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private estudianteService: EstudianteService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getEstudiantes();
  }

  ngAfterViewInit() {
    this.lista_estudiantes.paginator = this.paginator;
  }

  getEstudiantes(): void {
    this.estudianteService.getAll().subscribe((data: Estudiante[]) => {
      if (data.length > 0) this.lista_estudiantes.data = data;
    });
  }

  deleteEstudiante(id: number): void {
    this.confirmDialog().subscribe((result) => {
      if (result) {
        this.estudianteService.delete(id).subscribe((data: Estudiante) => {
          if (data) {
            this.message(`Estudiante ${data.nombre} ${data.apellido} eliminado`);
            this.getEstudiantes();
          }
        });
      }
    });
  }

  updateEstudiante(id: number): void {
    if (id) this.router.navigateByUrl(`/actualizar/${id}`);
  }

  message(mensaje: string): void {
    this.snackBar.open(`¡${mensaje}!`, 'Salir', {
      duration: this.estudianteService.time() * 1000,
    });
  }

  confirmDialog(): Observable<DialogRef> {
    const message = `¿Esta seguro de eliminar?`;
    const dialogData = new ConfirmDialogModel('Confirmar acción', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });
    return dialogRef.afterClosed();
  }
}
