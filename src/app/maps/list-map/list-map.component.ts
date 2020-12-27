import { Component, OnInit } from '@angular/core';
import { Map } from 'src/app/model/map';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { MapsService } from '../maps.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-list-map',
	templateUrl: './list-map.component.html',
	styleUrls: ['./list-map.component.css']
})
export class ListMapComponent implements OnInit {

	public mapa: mapboxgl.Map

	public id_Rol;

	public popups: Array<Map>;

	constructor(private mapsService: MapsService, private menuService: MenuService, private router: Router) {
	}

	ngOnInit() {

		if (localStorage.getItem('JWT') != "") {
			this.menuService.validaLoginJWT(null);
		}

		this.id_Rol = localStorage.getItem('idRol');

		(mapboxgl as any).accessToken = environment.mapBoxToken;

		this.mapa = new mapboxgl.Map({
			container: 'divmapa', // 
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-5.981415, 37.386722],
			zoom: 1.5
		});

		this.mapsService.getPopUps().subscribe(
			datos => {
				this.popups = datos;
				//console.log(this.popups)
			}
		);

		this.mapa.on('load', this.cargarPopUp);
	}

	cargarPopUp = (e) => {
		var mapa = this.mapa;

		this.popups.forEach(function (element) {
			//console.log(element)
			var marker = new mapboxgl.Marker().setLngLat([element.longitud, element.latitud]).addTo(mapa);

			var popup = new mapboxgl.Popup({ closeOnClick: false })
				.setHTML('<h3 style="font-size: 13pt;margin-top: 5px;margin-bottom: 2px;">' + element.titulo + '</h3>');

			marker.setPopup(popup);
		});
	}

}
