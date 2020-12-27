import { Component, OnInit } from '@angular/core';
import { Investigador } from 'src/app/model/investigador';
import { EspecialidadesService } from '../especialidades.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-especialidad',
  templateUrl: './list-especialidad.component.html',
  styleUrls: ['./list-especialidad.component.css']
})
export class ListEspecialidadComponent implements OnInit {

  public especialidades_investigador: Array<Investigador>;
  public idInvestigador: number;

  public idEspecialidadInvest: number;
  public visibleUpdate: boolean = false;
  public visibleDelete: boolean = false;

  public id_user;
  public idRol;

  constructor(private especialidadesService: EspecialidadesService, private menuService: MenuService, private router: Router) {
    this.especialidades_investigador = [];
  }

  ngOnInit() {
    if (localStorage.getItem('JWT') != "") {
      this.menuService.validaLoginJWT(null);
    }

    this.id_user = localStorage.getItem('idInvestigador');
    this.idRol = localStorage.getItem('idRol');

    this.especialidadesService.getInvestigadores_Especialidades().subscribe(
      datos => {
        this.especialidades_investigador = datos;
        //console.log(datos)
      }
    );
  }

  mostrarConfirmUpdate(id) {
    this.idEspecialidadInvest = id;
    this.visibleUpdate = true;
  }

  mostrarConfirmDelete(id) {
    this.idEspecialidadInvest = id;
    this.visibleDelete = true;
  }

  showDiv(id) {
    let div = document.getElementById(id);

    let buttom = document.getElementById("btn" + id);

    let img = document.getElementById("img" + id);

    if (div.style.display == "none") {

      div.style.display = "block";
      buttom.className = "botonClose";
      img.className = "imgClose";
    }
    else {

      div.style.display = "none";
      buttom.className = "boton";
      img.className = "img";
    }
  }

  listEspecialidadesInvest(res) {
    this.visibleDelete = false;
    this.visibleUpdate = false;

    this.especialidadesService.getInvestigadores_Especialidades().subscribe(
      datos => {
        this.especialidades_investigador = datos;
      }
    );
  }

}
