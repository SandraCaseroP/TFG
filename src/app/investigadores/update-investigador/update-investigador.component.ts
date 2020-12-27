import { Component, OnInit } from '@angular/core';
import { Investigador } from 'src/app/model/investigador';
import { InvestigadoresService } from '../investigadores.service';
import { SignupService } from 'src/app/sign-up/signup.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-update-investigador',
  templateUrl: './update-investigador.component.html',
  styleUrls: ['./update-investigador.component.css']
})
export class UpdateInvestigadorComponent implements OnInit {

  public investigador: Investigador;
  public idInvestigador;

  public correoCorrecto: boolean;
  public checkCorreo: boolean;

  public userCorrecto: boolean;
  public checkUser: boolean;

  constructor(private investigadorService: InvestigadoresService, private signUpService: SignupService, private menuService: MenuService, private router: Router) {
    this.investigador = <Investigador>{};

    this.correoCorrecto = true;
    this.checkCorreo = false;

    this.userCorrecto = true;
    this.checkUser = false;
  }

  ngOnInit() {
    this.menuService.validaLoginJWT(null);

    this.idInvestigador = localStorage.getItem('idInvestigador');

    this.investigadorService.getInvestigadorById(this.idInvestigador).subscribe(
      datos => {
        //console.log(datos)
        this.investigador = datos;
      }
    );
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
    this.checkCorreo = true;

    this.signUpService.validarUser(user).subscribe(
      datos => {
        //console.log(datos);
        //  Alza la bandera si el correo está libre, o no:
        this.correoCorrecto = (datos.estado && datos.estado == "libre");
        this.checkCorreo = false;
      },
      error => console.log(error)
    );
  }

  cancel(event) {
    this.investigador.foto = null;
    this.investigador.imgGrande = null;

    //console.log(this.investigador.foto)
  }

  leerImagen(ficheros) {
    // Cogemos el primer archivo
    const archivo = ficheros[0];
    // Creamos la instancia de FileReader
    let reader = new FileReader();
    //  Hacemos un apuntador a persona:
    let investigador = this.investigador;
    let creaImagenRedu = this.creaImagenRedu;

    reader.onload = function () {
      investigador.imgGrande = (<string>reader.result).split(",")[1];
      //  Creamos la imagen reducida:
      creaImagenRedu(investigador.imgGrande, investigador);
    }
    reader.readAsDataURL(archivo);
  }

  creaImagenRedu(datos, investigador: any) {
    let imagen = new Image();
    imagen.onload = () => {
      //  Creamos el canvas:
      let canvasRedu = document.createElement('canvas');
      let ctxRedu = canvasRedu.getContext("2d");
      //  Le damos unas dimensiones:
      canvasRedu.width = 100;
      canvasRedu.height = 100;
      ctxRedu.drawImage(imagen, 0, 0, canvasRedu.width, canvasRedu.height);
      //console.log("imagen reducidad: ", canvasRedu.toDataURL("image/jpeg").split(",")[1])
      investigador.foto = canvasRedu.toDataURL("image/jpeg").split(",")[1];
    }
    imagen.src = "data:image/jpeg;base64," + datos;
  }

  update() {
    //console.log(this.investigador)

    const claveHash = CryptoJS.SHA3(this.investigador.password).toString(CryptoJS.enc.Base64);
    this.investigador.password = claveHash;

    //console.log(this.idInvestigador)

    this.investigadorService.updateInvestigador(this.investigador).subscribe(
      datos => {
        this.investigador = datos;

        this.router.navigate(['/investigador-detalles/' + this.idInvestigador]);
      }
    );
  }

}
