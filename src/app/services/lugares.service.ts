import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lugar } from '../models/lugar.model';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {
  private apiUrl = 'https://localhost:7139/api/Lugares';

  constructor(private http: HttpClient) {}

  getLugares(): Observable<Lugar[]> {
    return this.http.get<Lugar[]>(this.apiUrl);
  }

}



