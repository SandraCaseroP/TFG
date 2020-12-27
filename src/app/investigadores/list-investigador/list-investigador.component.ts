import { Component, OnInit } from '@angular/core';
import { Investigador } from 'src/app/model/investigador';
import { InvestigadoresService } from '../investigadores.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-investigador',
  templateUrl: './list-investigador.component.html',
  styleUrls: ['./list-investigador.component.css']
})
export class ListInvestigadorComponent implements OnInit {

  public investigadores: Array<Investigador>;

  public id_Rol;

  public id_invest;

  constructor(private investigadorService: InvestigadoresService, private menuService: MenuService, private router: Router) {
    this.investigadores = [];
  }

  ngOnInit() {

    this.id_Rol = localStorage.getItem('idRol');
    this.id_invest = localStorage.getItem('idInvestigador');

    this.investigadorService.listInvestigadores().subscribe(
      datos => {
        //console.log(datos)

        datos.forEach(element => {
          if (element.id != this.id_invest) {
            this.investigadores.push(element)
          }
        });

        //console.log(this.investigadores)
      }
    );

    if (localStorage.getItem('JWT') != "") {
      this.menuService.validaLoginJWT(null);
    }

  }

}
