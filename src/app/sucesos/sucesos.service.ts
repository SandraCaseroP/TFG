import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TipoSuceso } from '../model/tipo-suceso';
import { Suceso } from '../model/suceso';

@Injectable({
  providedIn: 'root'
})
export class SucesosService {

  private urlPrivada = environment.urlPrivada;
  private urlPublica = environment.urlPublica;

  constructor(private http: HttpClient) { }

  getSucesosType() {
    let parametro = JSON.stringify({
      accion: "GetTiposSucesos"
    });

    return this.http.post<TipoSuceso[]>(this.urlPublica, parametro);
  }

  listSucesos() {
    let parametro = JSON.stringify({
      accion: "ListSucesos"
    });

    return this.http.post<Suceso[]>(this.urlPublica, parametro);
  }

  getSucesoById(id) {
    let parametro = JSON.stringify({
      servicio: "GetSucesos_id",
      id: id
    });

    return this.http.post<Suceso>(this.urlPrivada, parametro, environment.cabecera());
  }

  filter(nombre, tipo, lugar) {
    let parametro = JSON.stringify({
      accion: "FilterSucesos",
      nombre,
      tipo,
      lugar
    });

    return this.http.post<Suceso[]>(this.urlPublica, parametro);
  }

  addSucesos(sucesos) {
    let parametro = JSON.stringify({
      servicio: "InsertSuceso",
      sucesos: sucesos
    });

    return this.http.post<any>(this.urlPrivada, parametro, environment.cabecera());
  }

  deleteSuceso(id) {
    let parametro = JSON.stringify({
      servicio: "DeleteSuceso",
      id: id
    });

    return this.http.post<Suceso>(this.urlPrivada, parametro, environment.cabecera());
  }

  updateSuceso(suceso) {
    let parametro = JSON.stringify({
      servicio: "UpdateSuceso",
      suceso: suceso
    });

    return this.http.post<Suceso>(this.urlPrivada, parametro, environment.cabecera());
  }

  updateDonacion(suceso) {
    let parametro = JSON.stringify({
      servicio: "UpdateDonacion",
      suceso: suceso
    });

    return this.http.post<Suceso>(this.urlPrivada, parametro, environment.cabecera());
  }
}
