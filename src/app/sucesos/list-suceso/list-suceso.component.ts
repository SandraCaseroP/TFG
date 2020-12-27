import { Component, OnInit } from '@angular/core';
import { SucesosService } from '../sucesos.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router } from '@angular/router';
import { Suceso } from 'src/app/model/suceso';

@Component({
  selector: 'app-list-suceso',
  templateUrl: './list-suceso.component.html',
  styleUrls: ['./list-suceso.component.css']
})
export class ListSucesoComponent implements OnInit {

  public sucesos: Array<Suceso>;

  public showDelete: boolean;
  public showDonation: boolean;

  public idSuceso: number;

  public buscar: { nombre, tipo, lugar };
  public filtro: boolean;

  public id_invest;
  public idRol;

  constructor(private sucesosService: SucesosService, private menuService: MenuService, private router: Router) {
    this.showDelete = false;
    this.showDonation = false;

    this.buscar = { nombre: "", tipo: "", lugar: "" };
    this.filtro = false;
  }

  ngOnInit() {
    if (localStorage.getItem('JWT') != "") {
      this.menuService.validaLoginJWT(null);
    }

    this.id_invest = localStorage.getItem('idInvestigador');
    this.idRol = localStorage.getItem('idRol');

    this.sucesosService.listSucesos().subscribe(
      datos => {
        //console.log(datos);
        this.sucesos = datos;
      }
    );
  }

  mostrarConfirm(id) {
    this.idSuceso = id;
    this.showDelete = true;
  }

  mostrarConfirmDonation(id) {
    this.idSuceso = id;
    this.showDonation = true;
  }

  listSucesos(res) {
    this.showDelete = false;
    this.showDonation = false;

    //console.log(res);

    //se puede hacer sin el if
    if (res == null || res.result == "OK") {
      this.sucesosService.listSucesos().subscribe(
        datos => {
          //console.log(datos);
          this.sucesos = datos;
        }
      );
    }

    this.filtro = false;
    this.buscar = { nombre: "", tipo: "", lugar: "" };
  }

  showDiv(id) {

    let div = document.getElementById(id);

    let buttom = document.getElementById("btn" + id);

    if (div.style.display == "none") {

      div.style.display = "block";
      buttom.innerHTML = "HIDE OPTIONS";
    }
    else {

      div.style.display = "none";
      buttom.innerHTML = "SHOW OPTIONS";
    }
  }

  search() {
    this.sucesosService.filter(this.buscar.nombre, this.buscar.tipo, this.buscar.lugar).subscribe(
      datos => {
        this.sucesos = datos;
        //console.log(this.sucesos)
      }
    );
  }

  buscador() {
    let img = document.getElementById("lupa");

    if (this.filtro == false) {
      img.className = "loupeActive";
      this.filtro = true;
    }
    else {
      this.filtro = false;
      img.className = "loupe";

      this.buscar = { nombre: "", tipo: "", lugar: "" };
      this.sucesosService.listSucesos().subscribe(
        datos => {
          //console.log(datos);
          this.sucesos = datos;
        }
      );
    }
  }

}
