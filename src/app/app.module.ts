import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuComponent } from './menu/menu.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddInvestigadorComponent } from './investigadores/add-investigador/add-investigador.component';
import { UpdateInvestigadorComponent } from './investigadores/update-investigador/update-investigador.component';
import { DetailsInvestigadorComponent } from './investigadores/details-investigador/details-investigador.component';
import { ListInvestigadorComponent } from './investigadores/list-investigador/list-investigador.component';
import { DeleteInvestigadorComponent } from './investigadores/delete-investigador/delete-investigador.component';
import { AddSucesoComponent } from './sucesos/add-suceso/add-suceso.component';
import { UpdateSucesoComponent } from './sucesos/update-suceso/update-suceso.component';
import { DeleteSucesoComponent } from './sucesos/delete-suceso/delete-suceso.component';
import { ListSucesoComponent } from './sucesos/list-suceso/list-suceso.component';
import { DonationSucesoComponent } from './sucesos/donation-suceso/donation-suceso.component';
import { AddTiposucesoComponent } from './tipoSucesos/add-tiposuceso/add-tiposuceso.component';
import { UpdateTiposucesoComponent } from './tipoSucesos/update-tiposuceso/update-tiposuceso.component';
import { DeleteTiposucesoComponent } from './tipoSucesos/delete-tiposuceso/delete-tiposuceso.component';
import { ListTiposucesoComponent } from './tipoSucesos/list-tiposuceso/list-tiposuceso.component';
import { ListEspecialidadComponent } from './especialidades/list-especialidad/list-especialidad.component';
import { AddEspecialidadComponent } from './especialidades/add-especialidad/add-especialidad.component';
import { UpdateEspecialidadComponent } from './especialidades/update-especialidad/update-especialidad.component';
import { DeleteEspecialidadComponent } from './especialidades/delete-especialidad/delete-especialidad.component';
import { ListTipoespecialidadComponent } from './tipoEspecialidades/list-tipoespecialidad/list-tipoespecialidad.component';
import { AddTipoespecialidadComponent } from './tipoEspecialidades/add-tipoespecialidad/add-tipoespecialidad.component';
import { UpdateTipoespecialidadComponent } from './tipoEspecialidades/update-tipoespecialidad/update-tipoespecialidad.component';
import { DeleteTipoespecialidadComponent } from './tipoEspecialidades/delete-tipoespecialidad/delete-tipoespecialidad.component';
import { ListMapComponent } from './maps/list-map/list-map.component';
import { AddMapsComponent } from './maps/add-maps/add-maps.component';
import { UpdateMapsComponent } from './maps/update-maps/update-maps.component';
import { DeleteMapsComponent } from './maps/delete-maps/delete-maps.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    LoginComponent,
    SignUpComponent,
    AddInvestigadorComponent,
    UpdateInvestigadorComponent,
    DetailsInvestigadorComponent,
    ListInvestigadorComponent,
    DeleteInvestigadorComponent,
    AddSucesoComponent,
    UpdateSucesoComponent,
    DeleteSucesoComponent,
    ListSucesoComponent,
    DonationSucesoComponent,
    AddTiposucesoComponent,
    UpdateTiposucesoComponent,
    DeleteTiposucesoComponent,
    ListTiposucesoComponent,
    ListEspecialidadComponent,
    AddEspecialidadComponent,
    UpdateEspecialidadComponent,
    DeleteEspecialidadComponent,
    ListTipoespecialidadComponent,
    AddTipoespecialidadComponent,
    UpdateTipoespecialidadComponent,
    DeleteTipoespecialidadComponent,
    ListMapComponent,
    AddMapsComponent,
    UpdateMapsComponent,
    DeleteMapsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [MenuComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
