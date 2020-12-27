import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { MenuService } from './menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public logout: boolean;

  public navBar = {
    isNavbarCollapsed: false,
    dropdown: false,

    options: {
      dropdown: true
    },

    user: {
      dropdown: true
    },
    login: false,
    usuario: "",
    id_rol: -1,
    rol: "",
    idUser: -1
  }

  public resLogin$: Observable<any>;

  constructor(private menuService: MenuService, private loginService: LoginService, private router: Router) {
    this.logout = false;
  }

  ngOnInit() {
    this.resLogin$ = this.menuService.ObtenerResLogin$();
    this.resLogin$.subscribe(
      datos => {

        //console.log(datos)
        this.navBar.login = datos.login;
        this.navBar.usuario = datos.usuario;
        //  NUEVO:
        this.navBar.id_rol = datos.id_rol;
        this.navBar.rol = datos.rol;
        this.navBar.idUser = datos.id;
      },
      error => console.log(error)
    );
  }

  mostrarConfirm() {
    this.logout = true;
  }

  cerrarLogin() {

    localStorage.JWT = "";
    localStorage.nombreUsuario = "";
    localStorage.idInvestigador = "";
    localStorage.idRol = "";

    this.navBar.login = false;
    this.navBar.usuario = "";
    this.navBar.id_rol = -1;
    this.navBar.rol = "";
    this.navBar.idUser = -1;

    //  Vamos a inicio:
    this.router.navigate(['/']);
    this.logout = false;
  }

  cancel() {
    this.logout = false;
  }

}
