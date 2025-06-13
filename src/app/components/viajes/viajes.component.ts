import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
})
export class ViajesComponent implements OnInit {
  formularioViaje!: FormGroup;
  operadores: any[] = [];
  lugares: any[] = [];
  viajes: any[] = [];
  viajesFiltrados: any[] = [];

  modoEdicion: boolean = false;
  viajeActualId: number | null = null;
  filtroOperador: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  origenDestinoDiferentes(group: AbstractControl): ValidationErrors | null {
    const origen = group.get('origenId')?.value;
    const destino = group.get('destinoId')?.value;
    if (origen && destino && origen === destino) {
      return { origenIgualDestino: true };
    }
    return null;
  }

  fechaValida(group: AbstractControl): ValidationErrors | null {
    const inicio = new Date(group.get('fechaHoraInicio')?.value);
    const fin = new Date(group.get('fechaHoraFin')?.value);
    if (inicio && fin && fin <= inicio) {
      return { fechaFinInvalida: true };
    }
    return null;
  }

  ngOnInit(): void {
    this.formularioViaje = this.fb.group(
      {
        idViaje: [null],
        origenId: ['', Validators.required],
        destinoId: ['', Validators.required],
        fechaHoraInicio: ['', Validators.required],
        fechaHoraFin: ['', Validators.required],
        operadorId: ['', Validators.required],
      },
      { validators: [fechaFinPosteriorValidator, origenIgualDestinoValidator] }
    );

    this.cargarLugares();
    this.cargarOperadores();
    this.cargarViajes();
  }

  cargarLugares() {
    this.http
      .get<any[]>('https://localhost:7139/api/Lugares')
      .subscribe((res) => (this.lugares = res));
  }

  cargarOperadores() {
    this.http
      .get<any[]>('https://localhost:7139/api/Operadores')
      .subscribe((res) => (this.operadores = res));
  }

  cargarViajes() {
    this.http
      .get<any[]>('https://localhost:7139/api/Viajes')
      .subscribe((res) => {
        this.viajes = res;
        this.aplicarFiltro();
      });
  }

  guardarViaje() {
    if (this.formularioViaje.invalid) return;

    const datos = this.formularioViaje.value;

    if (this.modoEdicion && this.viajeActualId !== null) {
      this.http
        .put(`https://localhost:7139/api/Viajes/${this.viajeActualId}`, datos)
        .subscribe(() => {
          this.cargarViajes();
          this.resetFormulario();
        });
    } else {
      const datosPost = { ...datos };
      delete datosPost.idViaje;
      this.http
        .post('https://localhost:7139/api/Viajes', datosPost)
        .subscribe(() => {
          this.cargarViajes();
          this.resetFormulario();
        });
    }
  }

  editarViaje(viaje: any) {
    this.modoEdicion = true;
    this.viajeActualId = viaje.idViaje;

    this.formularioViaje.patchValue({
      idViaje: viaje.idViaje,
      origenId: viaje.origenId,
      destinoId: viaje.destinoId,
      operadorId: viaje.operadorId,
      fechaHoraInicio: this.formatoFecha(viaje.fechaHoraInicio),
      fechaHoraFin: this.formatoFecha(viaje.fechaHoraFin),
    });
  }

  resetFormulario() {
    this.formularioViaje.reset();
    this.modoEdicion = false;
    this.viajeActualId = null;
  }
  aplicarFiltro() {
    if (!this.filtroOperador.trim()) {
      this.viajesFiltrados = this.viajes;
    } else {
      const filtro = this.filtroOperador.toLowerCase();
      this.viajesFiltrados = this.viajes.filter((v) =>
        v.operador?.nombre.toLowerCase().includes(filtro)
      );
    }
  }

  formatoFecha(fecha: string): string {
    const d = new Date(fecha);
    const offset = d.getTimezoneOffset();
    const localDate = new Date(d.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  }
}

function fechaFinPosteriorValidator(
  formGroup: AbstractControl
): ValidationErrors | null {
  const inicio = formGroup.get('fechaHoraInicio')?.value;
  const fin = formGroup.get('fechaHoraFin')?.value;

  if (!inicio || !fin) return null;

  return new Date(fin) > new Date(inicio) ? null : { fechaFinInvalida: true };
}

function origenIgualDestinoValidator(
  formGroup: AbstractControl
): ValidationErrors | null {
  const origen = formGroup.get('origenId')?.value;
  const destino = formGroup.get('destinoId')?.value;

  if (!origen || !destino) return null;

  return origen === destino ? { origenIgualDestino: true } : null;
}
