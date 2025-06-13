import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Viaje } from '../models/viaje.model';
import { Operador } from '../models/operador.model';
import { Lugar } from '../models/lugar.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ViajesService {
  private apiUrl = 'https://localhost:7139/api';

  constructor(private http: HttpClient) {}

  getViajes(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(`${this.apiUrl}/Viajes`);
  }

  getOperadores(): Observable<Operador[]> {
    return this.http.get<Operador[]>(`${this.apiUrl}/Operadores`);
  }

  getLugares(): Observable<Lugar[]> {
    return this.http.get<Lugar[]>(`${this.apiUrl}/Lugares`);
  }

  crearViaje(viaje: Partial<Viaje>): Observable<any> {
    return this.http.post(`${this.apiUrl}/Viajes`, viaje);
  }
  updateViaje(id: number, viaje: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, viaje);
  }
}
