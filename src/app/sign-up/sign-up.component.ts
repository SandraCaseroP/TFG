import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public user: {
    nombre: string,
    apellidos: string,
    dni: string,
    telefono: string,
    email: string,
    userName: string,
    password: string,
    password2: string
  };

  public signup: boolean;

  public correoCorrecto: boolean;
  public checkCorreo: boolean;

  public userCorrecto: boolean;
  public checkUser: boolean;

  constructor(private signUpService: SignupService, private router: Router) {
    this.signup = false;

    this.correoCorrecto = true;
    this.checkCorreo = false;

    this.userCorrecto = true;
    this.checkUser = false;

    this.user = {
      nombre: "",
      apellidos: "",
      dni: "",
      telefono: "",
      email: "",
      userName: "",
      password: "",
      password2: ""
    }
  }

  ngOnInit() {
  }

  checkEmail(email: string) {
    this.checkCorreo = true;

    this.signUpService.validarCorreo(email).subscribe(
      datos => {
        //console.log(datos);
        //  Alza la bandera si el correo está libre, o no:
        this.correoCorrecto = (datos.estado && datos.estado == "libre");
        this.checkCorreo = false;
      },
      error => console.log(error)
    );
  }

  checkUsuario(user: string) {
    this.checkUser = true;

    this.signUpService.validarUser(user).subscribe(
      datos => {
        //console.log(datos);
        //  Alza la bandera si el correo está libre, o no:
        this.userCorrecto = (datos.estado && datos.estado == "libre");
        this.checkUser = false;
      },
      error => console.log(error)
    );
  }

  registrarse(datos) {
    //  Generamos el hash para la clave:
    const claveHash = CryptoJS.SHA3(datos.password).toString(CryptoJS.enc.Base64);

    //console.log(datos)

    this.signUpService.registro(datos.nombre, datos.apellidos, datos.dni, datos.telefono, datos.email, datos.userName, claveHash).subscribe(
      datos => {
        //console.log(datos);
        if ((datos.estado) && (datos.estado == "OK")) {
          this.signup = true;
        }
      },
      error => console.log(error)
    );
  }

  cancel() {
    this.signup = false;
    this.router.navigate(['/login']);
  }

}
