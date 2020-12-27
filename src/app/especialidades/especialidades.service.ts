import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Investigador } from '../model/investigador';
import { InvestEspec } from '../model/invest-espec';
import { Especialidad } from '../model/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  private urlPrivada = environment.urlPrivada;
  private urlPublica = environment.urlPublica;

  constructor(private http: HttpClient) { }

  getInvestigadores_Especialidades() {
    let parametro = JSON.stringify({
      accion: "ListInvestigadores_Especialidades"
    });

    return this.http.post<Investigador[]>(this.urlPublica, parametro);
  }

  getEspecialidades_IdInvestigador(id) {
    let parametro = JSON.stringify({
      servicio: "GetEspecialidades_IdInvestigador",
      id: id
    });

    return this.http.post<InvestEspec[]>(this.urlPrivada, parametro, environment.cabecera());
  }

  getEspecialidadesInvestigador_id(id) {
    let parametro = JSON.stringify({
      servicio: "GetEspecialidadesInvest_id",
      id: id
    });

    return this.http.post<InvestEspec>(this.urlPrivada, parametro, environment.cabecera());
  }

  getDatosInvestigador(id) {
    let parametro = JSON.stringify({
      servicio: "GetInvestigadorById",
      id: id
    });

    return this.http.post<Investigador>(this.urlPrivada, parametro, environment.cabecera());
  }

  getEspecialidades() {
    let parametro = JSON.stringify({
      servicio: "GetEspecialidades"
    });

    return this.http.post<Especialidad[]>(this.urlPrivada, parametro, environment.cabecera());
  }

  addInvestEspecialidad(invest_espc) {
    let parametro = JSON.stringify({
      servicio: "InsertEspecialidadInvestigador",
      invest_espc: invest_espc
    });

    return this.http.post<any>(this.urlPrivada, parametro, environment.cabecera());
  }

  deleteInvestEspecialidad(id) {
    let parametro = JSON.stringify({
      servicio: "DeleteEspecialidadInvestigador",
      id: id
    });

    return this.http.post<InvestEspec>(this.urlPrivada, parametro, environment.cabecera());
  }

  updateEspecialidadInvestigador(invest_espc) {
    let parametro = JSON.stringify({
      servicio: "UpdateEspecialidadInvest",
      investEspecialidad: invest_espc
    });

    return this.http.post<InvestEspec>(this.urlPrivada, parametro, environment.cabecera());
  }
}
