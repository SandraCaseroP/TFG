import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	private urlLogin = environment.urlLogin;
	private urlPrivada = environment.urlPrivada;

	constructor(private http: HttpClient) { }

	getLogin(user) {
		//  Clonamos el objeto:
		let parametro = JSON.parse(JSON.stringify(user));
		//  Le añadimos el nuevo atributo, servicio:
		parametro.servicio = "inicio_sesion";
		return this.http.post<any>(this.urlLogin, JSON.stringify(parametro));
	}

	getLogin_perfil(user) {
		//  Clonamos el objeto:
		let parametro = JSON.parse(JSON.stringify(user));
		//  Le añadimos el nuevo atributo, servicio:
		parametro.servicio = "inicio_sesion_perfil";
		return this.http.post<any>(this.urlLogin, JSON.stringify(parametro));
	}


	//  Con este método conseguimos validar si el JWT actual es válido:
	validarLogin() {
		return this.http.post<any>(this.urlPrivada, '{"servicio":"nada"}', environment.cabecera());
	}
}
