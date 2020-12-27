import { Component, OnInit } from '@angular/core';
import { InvestigadoresService } from '../investigadores.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router } from '@angular/router';
import { Investigador } from 'src/app/model/investigador';
import { MenuComponent } from 'src/app/menu/menu.component';

@Component({
  selector: 'app-delete-investigador',
  templateUrl: './delete-investigador.component.html',
  styleUrls: ['./delete-investigador.component.css']
})
export class DeleteInvestigadorComponent implements OnInit {

  public id_User;
  public userName;
  public user: Investigador;

  public notAllowed: boolean;

  public check1: boolean;
  public check2: boolean;

  constructor(private investigadorService: InvestigadoresService, private menu: MenuComponent, private menuService: MenuService, private router: Router) {
    this.user = <Investigador>{};
    this.notAllowed = false;

    this.check1 = false;
  }

  ngOnInit() {
    this.userName = localStorage.getItem('nombreUsuario');
    this.id_User = localStorage.getItem('idInvestigador');

    this.menuService.validaLoginJWT(null);

    let boton = document.getElementById("botonBorrar");

    if (!this.check1) {
      this.investigadorService.checkInvestEspecialidad(this.id_User).subscribe(
        datos => {
          //console.log(datos);
          if (datos.estado && datos.estado == "ocupado") {
            boton.style.cursor = "not-allowed";
            this.notAllowed = true;
          } else {
            this.check2 = false;
          }
        }
      );
    }
    if (!this.check2) {
      this.investigadorService.checkInvestSucesos(this.id_User).subscribe(
        datos => {
          //console.log(datos);
          if (datos.estado && datos.estado == "ocupado") {
            boton.style.cursor = "not-allowed";
            this.notAllowed = true;
          }
        }
      );
    }
  }

  delete() {

    this.investigadorService.deleteInvestigador(this.id_User).subscribe(
      datos => {
        this.user = datos;

        this.menu.cerrarLogin();

        this.menuService.establecerLogin({
          login: false,
          usuario: "",
          id_rol: -1,
          rol: "",
          idUser: -1
        });
      }
    );


  }

  cancel() {
    this.router.navigate(['/']);
  }

}
