import { Lugar } from './lugar.model';
import { Operador } from './operador.model';

export interface Viaje {
  idViaje: number;
  origenId: number;
  destinoId: number;
  operadorId: number;
  fechaHoraInicio: string;
  fechaHoraFin: string;
  origen?: Lugar;
  destino?: Lugar;
  operador?: Operador;
}