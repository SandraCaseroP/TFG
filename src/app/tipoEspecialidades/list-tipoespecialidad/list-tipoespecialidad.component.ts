import { Component, OnInit } from '@angular/core';
import { TipoEspecialidadesService } from '../tipo-especialidades.service';
import { Especialidad } from 'src/app/model/especialidad';
import { MenuService } from 'src/app/menu/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-tipoespecialidad',
  templateUrl: './list-tipoespecialidad.component.html',
  styleUrls: ['./list-tipoespecialidad.component.css']
})
export class ListTipoespecialidadComponent implements OnInit {

  public especialidades: Array<Especialidad>;

  public visibleAdd: boolean;
  public visibleUpdate: boolean;
  public visibleDelete: boolean;

  public sucesoId: number;

  public id_Rol;

  constructor(private tipoEspecialidadesService: TipoEspecialidadesService, private menuService: MenuService, private router: Router) {
    this.visibleAdd = false;
    this.visibleUpdate = false;
    this.visibleDelete = false;
  }

  ngOnInit() {

    if (localStorage.getItem('JWT') != "") {
      this.menuService.validaLoginJWT(null);
    }

    this.id_Rol = localStorage.getItem('idRol');

    this.tipoEspecialidadesService.getEspecialidades().subscribe(
      datos => {
        this.especialidades = datos;
      }
    );
  }

  mostrarConfirmAdd() {
    this.visibleAdd = true;
  }

  mostrarConfirmUpdate(id) {
    this.visibleUpdate = true;
    this.sucesoId = id;
  }

  mostrarConfirmDelete(id) {
    this.visibleDelete = true;
    this.sucesoId = id;
  }

  listarEspecialidades(res) {
    this.visibleAdd = false;
    this.visibleUpdate = false;
    this.visibleDelete = false;

    this.tipoEspecialidadesService.getEspecialidades().subscribe(
      datos => {
        this.especialidades = datos;
      }
    );
  }

}
