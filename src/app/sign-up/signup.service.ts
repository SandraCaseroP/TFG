import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class SignupService {

	private urlLogin = environment.urlLogin;
	private urlPrivada = environment.urlPrivada;

	constructor(private http: HttpClient) { }

	validarCorreo(email: string) {
		const parametro = JSON.stringify({
			servicio: "comprobar_email",
			email
		});
		return this.http.post<any>(this.urlLogin, parametro);
	}

	validarUser(user: string) {
		const parametro = JSON.stringify({
			servicio: "comprobar_user",
			user
		});
		return this.http.post<any>(this.urlLogin, parametro);
	}


	registro(nombre: string, apellidos: string, dni: string, telefono: number, email: string, user: string, claveHash: string) {
		const parametro = JSON.stringify({
			servicio: "registro",
			CONTROL: "EstoEsUnControl",
			nombre,
			apellidos,
			dni,
			telefono,
			email,
			user,
			password: claveHash
		});
		console.log(parametro);
		return this.http.post<any>(this.urlLogin, parametro);
	}


	//  Con este método conseguimos validar si el JWT actual es válido:
	validarLogin() {
		return this.http.post<any>(this.urlPrivada, '{"servicio":"nada"}', environment.cabecera());
	}
}
