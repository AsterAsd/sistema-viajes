import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operador } from '../models/operador.model';

@Injectable({ providedIn: 'root' })
export class OperadoresService {
  private apiUrl = 'https://localhost:7139/api/operadores';

  constructor(private http: HttpClient) {}

  getOperadores(): Observable<Operador[]> {
    return this.http.get<Operador[]>(this.apiUrl);
  }
}
