import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: true,

  mapBoxToken: 'pk.eyJ1Ijoic2FuZHJhY3AiLCJhIjoiY2szem11dG5zMXJsMzNmbzE0eTAycTNiMiJ9.KxcVixyqIpX48ODk7j-VrA',

	urlLogin: "backend/login.php",

	urlPrivada: "backend/servicioPrivado.php",

	urlPublica: "backend/servicio.php",

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
