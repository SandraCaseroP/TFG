// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { HttpHeaders } from '@angular/common/http';

export const environment = {
	production: false,

	mapBoxToken: 'pk.eyJ1Ijoic2FuZHJhY3AiLCJhIjoiY2szem11dG5zMXJsMzNmbzE0eTAycTNiMiJ9.KxcVixyqIpX48ODk7j-VrA',

	urlLogin: "http://localhost/AJAX/paranormal/login.php",

	urlPrivada: "http://localhost/AJAX/paranormal/servicioPrivado.php",

	urlPublica: "http://localhost/AJAX/paranormal/servicio.php",

	cabecera: function () {
		let headers = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + localStorage.JWT
			})
		};
		return headers;
	},

	equalJson: function (a, b) {
		return JSON.stringify(a) === JSON.stringify(b);
	},

	seleccionarObj: function (array, objeto) {
		var res;
		for (let i = 0; i < array.length; i++) {
			if (this.equalJson(objeto, array[i])) {
				res = array[i];
			}
		}
		return res;
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
