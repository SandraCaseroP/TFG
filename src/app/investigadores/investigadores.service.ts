import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Investigador } from '../model/investigador';

@Injectable({
  providedIn: 'root'
})
export class InvestigadoresService {

  private urlPrivada = environment.urlPrivada;
  private urlPublica = environment.urlPublica;

  constructor(private http: HttpClient) { }

  listInvestigadores() {
    let parametro = JSON.stringify({
      accion: "ListInvestigadores"
    });

    return this.http.post<Investigador[]>(this.urlPublica, parametro);
  }

  getInvestigadorById(id) {
    let parametro = JSON.stringify({
      servicio: "GetInvestigadorById",
      id
    });

    return this.http.post<Investigador>(this.urlPrivada, parametro, environment.cabecera());
  }

  checkInvestEspecialidad(id) {
    let parametro = JSON.stringify({
      servicio: "Check_Especialidades",
      id
    });

    return this.http.post<any>(this.urlPrivada, parametro, environment.cabecera());
  }

  checkInvestSucesos(id) {
    let parametro = JSON.stringify({
      servicio: "Check_Sucesos",
      id
    });

    return this.http.post<any>(this.urlPrivada, parametro, environment.cabecera());
  }

  detailsInvestigador(id) {
    let parametro = JSON.stringify({
      accion: "DetailsInvestigador_id",
      id: id
    });

    return this.http.post<Investigador>(this.urlPublica, parametro);
  }

  addInvestigador(investigador) {
    let parametro = JSON.stringify({
      servicio: "InsertInvestigador",
      investigador
    });

    return this.http.post<any>(this.urlPrivada, parametro, environment.cabecera());
  }

  deleteInvestigador(id) {
    let parametro = JSON.stringify({
      servicio: "DeleteInvestigador",
      id
    });

    return this.http.post<Investigador>(this.urlPrivada, parametro, environment.cabecera());
  }

  updateInvestigador(investigador) {
    let parametro = JSON.stringify({
      servicio: "UpdateInvestigador",
      investigador
    });

    return this.http.post<Investigador>(this.urlPrivada, parametro, environment.cabecera());
  }
}
