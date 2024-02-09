import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudiante } from '../interfaces/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private readonly API_URL = 'http://localhost:3001/estudiante';
  private readonly TIME = 2;

  constructor(private httpCLient: HttpClient) { }

  getAll(): Observable<Estudiante[]> {
    return this.httpCLient.get<Estudiante[]>(this.API_URL);
  }

  get(id: number): Observable<Estudiante> {
    return this.httpCLient.get<Estudiante>(`${this.API_URL}/${id}`)
  }

  create(estudiante: Estudiante): Observable<Estudiante> {
    return this.httpCLient.post<Estudiante>(this.API_URL, estudiante);
  }

  update(id: number, estudiante: Estudiante): Observable<Estudiante> {
    return this.httpCLient.put<Estudiante>(`${this.API_URL}/${id}`, estudiante);
  }

  delete(id: number){
    return this.httpCLient.delete<any>(`${this.API_URL}/${id}`)
  }

  time(): number {
    return this.TIME;
  }
}
