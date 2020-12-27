import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/menu/menu.service';
import { Router } from '@angular/router';
import { TipoSucesosService } from '../tipo-sucesos.service';
import { TipoSuceso } from 'src/app/model/tipo-suceso';

@Component({
  selector: 'app-list-tiposuceso',
  templateUrl: './list-tiposuceso.component.html',
  styleUrls: ['./list-tiposuceso.component.css']
})
export class ListTiposucesoComponent implements OnInit {

  public visibleDelete: boolean;
  public visibleUpdate: boolean;
  public visibleAdd: boolean;

  public tipos: Array<TipoSuceso>;
  public idTipo: number;
  public id_Rol;

  constructor(private tipoSucesosService: TipoSucesosService, private menuService: MenuService, private router: Router) {
    this.visibleDelete = false;
    this.visibleUpdate = false;
    this.visibleAdd = false;
  }

  ngOnInit() {
    if (localStorage.getItem('JWT') != "") {
      this.menuService.validaLoginJWT(null);
    }

    this.id_Rol = localStorage.getItem('idRol');

    this.tipoSucesosService.getSucesosType().subscribe(
      datos => {
        //console.log(datos)
        this.tipos = datos;
      });
  }

  mostrarConfirmDelete(id) {
    this.idTipo = id;
    this.visibleDelete = true;
  }

  mostrarConfirmUpdate(id) {
    this.idTipo = id;
    this.visibleUpdate = true;
  }

  mostrarConfirmAdd() {
    this.visibleAdd = true;
  }

  listTipoSucesos(res) {
    this.visibleDelete = false;
    this.visibleUpdate = false;
    this.visibleAdd = false;

    //console.log(res);
    //se puede hacer sin el if
    if (res == null || res.result == "OK") {
      this.tipoSucesosService.getSucesosType().subscribe(
        datos => {
          //console.log(datos);
          this.tipos = datos;
        }
      );
    }
  }

}
