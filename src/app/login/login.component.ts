import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

import * as CryptoJS from 'crypto-js';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: { email: string, user: string, password: string };
  public loginIncorrecto: boolean = false;

  constructor(private loginService: LoginService, private menuService: MenuService, private ruta: Router) {
    this.login = { email: "", user: "", password: "" };
  }

  ngOnInit() {
  }

  validar(user) {
    //console.log(user);

    //  Generamos el hash para la clave:
    const claveHash = CryptoJS.SHA3(user.password).toString(CryptoJS.enc.Base64);
    //console.log("hashClave = ", claveHash);
    user.password = claveHash;


    //  Procedemos a la validación:
    this.loginService.getLogin_perfil(user).subscribe(
      datos => {
        //console.log(datos);

        //  Informamos y vamos a la pantalla de inicio.
        if ((datos.estado) || (datos.estado == "NO")) {
          //	alert("El correo o la clave son incorrectos");
          this.loginIncorrecto = true;
        }
        else { //  Iniciamos sesión:
          this.loginIncorrecto = false;

          //  Guardamos el JWT en el sesionStorage:
          localStorage.setItem("JWT", datos.JWT);
          localStorage.setItem("nombreUsuario", datos.usuario);
          localStorage.setItem("idInvestigador", datos.id);
          localStorage.setItem("idRol", datos.id_rol);

          let datosUser = {
            login: true,
            id: datos.id,
            usuario: datos.usuario,
            id_rol: datos.id_rol,
            rol: datos.rol,
            idUser: datos.id
          }
          this.menuService.establecerLogin(datosUser);

          this.ruta.navigate(['/']);
        }
      },
      error => console.log(error)
    );
  }
}
