import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Map } from '../model/map';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private urlPrivada = environment.urlPrivada;
  private urlPublica = environment.urlPublica;

  constructor(private http: HttpClient) { }

  getPopUps() {
    let parametro = JSON.stringify({
      accion: "GetPlaces"
    });

    return this.http.post<Map[]>(this.urlPublica, parametro);
  }

  getPlaceById(id) {
    let parametro = JSON.stringify({
      servicio: "GetPlaceById",
      id
    });

    return this.http.post<Map>(this.urlPrivada, parametro, environment.cabecera());
  }

  addPlace(mapa) {
    let parametro = JSON.stringify({
      servicio: "InsertPlace",
      mapa
    });

    return this.http.post<any>(this.urlPrivada, parametro, environment.cabecera());
  }

  deletePlace(id) {
    let parametro = JSON.stringify({
      servicio: "DeletePlace",
      id
    });

    return this.http.post<any>(this.urlPrivada, parametro, environment.cabecera());
  }

  updatePlace(map) {
    let parametro = JSON.stringify({
      servicio: "UpdatePlace",
      map
    });

    return this.http.post<any>(this.urlPrivada, parametro, environment.cabecera());
  }
}
