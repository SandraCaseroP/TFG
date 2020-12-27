import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ListInvestigadorComponent } from './investigadores/list-investigador/list-investigador.component';
import { DetailsInvestigadorComponent } from './investigadores/details-investigador/details-investigador.component';
import { AddSucesoComponent } from './sucesos/add-suceso/add-suceso.component';
import { ListSucesoComponent } from './sucesos/list-suceso/list-suceso.component';
import { UpdateSucesoComponent } from './sucesos/update-suceso/update-suceso.component';
import { ListTiposucesoComponent } from './tipoSucesos/list-tiposuceso/list-tiposuceso.component';
import { DeleteInvestigadorComponent } from './investigadores/delete-investigador/delete-investigador.component';
import { ListEspecialidadComponent } from './especialidades/list-especialidad/list-especialidad.component';
import { AddEspecialidadComponent } from './especialidades/add-especialidad/add-especialidad.component';
import { ListTipoespecialidadComponent } from './tipoEspecialidades/list-tipoespecialidad/list-tipoespecialidad.component';
import { AddInvestigadorComponent } from './investigadores/add-investigador/add-investigador.component';
import { UpdateInvestigadorComponent } from './investigadores/update-investigador/update-investigador.component';
import { ListMapComponent } from './maps/list-map/list-map.component';
import { AddMapsComponent } from './maps/add-maps/add-maps.component';
import { DeleteMapsComponent } from './maps/delete-maps/delete-maps.component';
import { UpdateMapsComponent } from './maps/update-maps/update-maps.component';


const routes: Routes = [
  {
    path: "",
    component: InicioComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "sign-up",
    component: SignUpComponent
  },
  {
    path: "investigadores",
    component: ListInvestigadorComponent
  },
  {
    path: "investigador-detalles/:idInvestigador",
    component: DetailsInvestigadorComponent
  },
  {
    path: "perfil/:idInvestigador",
    component: DetailsInvestigadorComponent
  },
  {
    path: "investigador-add",
    component: AddInvestigadorComponent
  },
  {
    path: "investigador-update",
    component: UpdateInvestigadorComponent
  },
  {
    path: "delete-investigador",
    component: DeleteInvestigadorComponent
  },
  {
    path: "sucesos",
    component: ListSucesoComponent
  },
  {
    path: "suceso-add",
    component: AddSucesoComponent
  },
  {
    path: "suceso-update/:idSuceso",
    component: UpdateSucesoComponent
  },
  {
    path: "tipos-sucesos",
    component: ListTiposucesoComponent
  },
  {
    path: "especialidades",
    component: ListEspecialidadComponent
  },
  {
    path: "especialidad-add",
    component: AddEspecialidadComponent
  },
  {
    path: "tipos-especialidades",
    component: ListTipoespecialidadComponent
  },
  {
    path: "mapa",
    component: ListMapComponent
  },
  {
    path: "lugar-add",
    component: AddMapsComponent
  },  
  {
    path: "lugar-delete/:idLugar",
    component: DeleteMapsComponent
  },
  {
    path: "lugar-actualizar/:idLugar",
    component: UpdateMapsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }