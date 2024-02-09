import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private readonly API_URL = 'http://localhost:3001/usuario';
  private readonly TIME = 8;

  constructor(private httpCLient: HttpClient) {}

  login(usuario: string, contrasena: string): Observable<Usuario[]> {
    return this.httpCLient.get<Usuario[]>(`${this.API_URL}?usuario=${usuario}&contrasena=${contrasena}`);
  }

  time(): number {
    return this.TIME;
  }
}
