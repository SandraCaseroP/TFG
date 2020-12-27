import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TipoSuceso } from '../model/tipo-suceso';

@Injectable({
  providedIn: 'root'
})
export class TipoSucesosService {

  private urlPrivada = environment.urlPrivada;
  private urlPublica = environment.urlPublica;

  constructor(private http: HttpClient) { }

  getSucesosType() {
    let parametro = JSON.stringify({
      accion: "GetTiposSucesos"
    });

    return this.http.post<TipoSuceso[]>(this.urlPublica, parametro);
  }

  getTipoSucesoById(id) {
    let parametro = JSON.stringify({
      servicio: "GetTipoSucesosById",
      id: id
    });

    return this.http.post<TipoSuceso>(this.urlPrivada, parametro, environment.cabecera());
  }

  addTipoSuceso(tipoSuceso) {
    let parametro = JSON.stringify({
      servicio: "InsertTipoSuceso",
      tipoSuceso: tipoSuceso
    });

    return this.http.post<TipoSuceso>(this.urlPrivada, parametro, environment.cabecera());
  }

  deleteTipoSuceso(id) {
    let parametro = JSON.stringify({
      servicio: "DeleteTipoSuceso",
      id: id
    });

    return this.http.post<TipoSuceso>(this.urlPrivada, parametro, environment.cabecera());
  }

  updateTipoSuceso(tipoSuceso) {
    let parametro = JSON.stringify({
      servicio: "UpdateTipoSuceso",
      tipoSuceso: tipoSuceso
    });

    return this.http.post<TipoSuceso>(this.urlPrivada, parametro, environment.cabecera());
  }

  validarTipoSuceso(id) {
    let parametro = JSON.stringify({
      servicio: "Check_tipoSuceso",
      id
    });

    return this.http.post<any>(this.urlPrivada, parametro, environment.cabecera());
  }
}
