import { Injectable } from '@angular/core';
import { Login } from '../model/login';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class MenuService {

	private urlPrivada = environment.urlPrivada;

	private login: Login;

	private login$ = new Subject<any>();

	constructor(private http: HttpClient, private ruta: Router) {
		this.limpiarReslogin(this.login)
	}

	//  Actualizamos el observable:
	establecerLogin(datosUser: any) {
		this.login = datosUser;
		this.login$.next(this.login);
	}

	//  Ofrecemos el observable:
	ObtenerResLogin$(): Observable<any> {
		return this.login$.asObservable();
	}

	limpiarReslogin(login: Login) {
		login = {
			login: false,
			id: -1,
			usuario: "",
			id_rol: -1,
			rol_nombre: ""
		};
	}

	validaLoginJWT(fRes) {
		this.validarLogin().subscribe(
			datos => {
				const val = <any>datos;
				if ((val.sesion) && (val.sesion == "NO")) {
					//limpiamos el login
					this.limpiarReslogin(this.login)

					//  Vamos a inicio:
					this.ruta.navigate(['login']);
				} else {
					datos.login = true;
					this.establecerLogin(datos);
					if (fRes)
						fRes(datos);
				}
			},
			error => console.log(error)
		)
	}


	//  Con este método conseguimos validar si el JWT actual es válido:
	validarLogin() {
		return this.http.post<Login>(this.urlPrivada, '{"servicio":"validaJWTconInfo"}', environment.cabecera());
	}

}
