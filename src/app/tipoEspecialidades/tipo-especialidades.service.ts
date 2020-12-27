import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Especialidad } from '../model/especialidad';

@Injectable({
  providedIn: 'root'
})
export class TipoEspecialidadesService {

  private urlPrivada = environment.urlPrivada;
  private urlPublica = environment.urlPublica;

  constructor(private http: HttpClient) { }

  getEspecialidades() {
    let parametro = JSON.stringify({
      accion: "GetEspecialidades"
    });

    return this.http.post<Especialidad[]>(this.urlPublica, parametro);
  }

  getEspecialidadById(id) {
    let parametro = JSON.stringify({
      servicio: "GetEspecialidad_Id",
      id: id
    });

    return this.http.post<Especialidad>(this.urlPrivada, parametro, environment.cabecera());
  }

  addEspecialidad(especialidad) {
    let parametro = JSON.stringify({
      servicio: "InsertEspecialidad",
      especialidad: especialidad
    });

    return this.http.post<Especialidad>(this.urlPrivada, parametro, environment.cabecera());
  }

  deleteEspecialidad(id) {
    let parametro = JSON.stringify({
      servicio: "DeleteEspecialidad",
      id: id
    });

    return this.http.post<Especialidad>(this.urlPrivada, parametro, environment.cabecera());
  }

  updateEspecialidad(especialidad) {
    let parametro = JSON.stringify({
      servicio: "UpdateEspecialidad",
      especialidad: especialidad
    });

    return this.http.post<Especialidad>(this.urlPrivada, parametro, environment.cabecera());
  }

  validarTipoEspecialidad(id) {
    let parametro = JSON.stringify({
      servicio: "Check_tipoEspecialidad",
      id
    });

    return this.http.post<any>(this.urlPrivada, parametro, environment.cabecera());
  }

}
