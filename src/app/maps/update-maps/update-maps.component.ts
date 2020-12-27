import { Component, OnInit } from '@angular/core';
import { Map } from 'src/app/model/map';
import * as mapboxgl from 'mapbox-gl';
import { MapsService } from '../maps.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-maps',
  templateUrl: './update-maps.component.html',
  styleUrls: ['./update-maps.component.css']
})
export class UpdateMapsComponent implements OnInit {

  public lugar: Map;
  public mapa: mapboxgl.Map
  public idLugar;

  public coordenadas: {
    latitud: number;
    longitud: number;
  };

  constructor(private mapsService: MapsService, private menuService: MenuService, private router: Router, private route: ActivatedRoute) {
    this.lugar = <Map>{};
    this.coordenadas = { latitud: 0, longitud: 0 };
  }

  ngOnInit() {

    this.menuService.validaLoginJWT(null);

    this.idLugar = this.route.snapshot.params["idLugar"];

    this.mapsService.getPlaceById(this.idLugar).subscribe(
      datos => {
        this.lugar = datos;
        this.coordenadas.latitud = datos.latitud;
        this.coordenadas.longitud = datos.longitud;
      }
    );

    (mapboxgl as any).accessToken = environment.mapBoxToken;

    this.mapa = new mapboxgl.Map({
      container: 'divmapa', // 
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-5.981415, 37.386722],
      zoom: -0.77
    });

    this.mapa.on('load', this.ponPopUp);

    this.mapa.on('click', this.ponInfo);
  }

  ponInfo = (e) => {
    //  Pongo el popup:
    var ventana = new mapboxgl.Popup({ closeOnClick: true })
      .setLngLat(e.lngLat)
      .setHTML(`Latitud: ${e.lngLat.lat}<br>
				Longitud: ${e.lngLat.lng}`)
      .addTo(this.mapa);

    this.lugar.latitud = e.lngLat.lat;
    this.lugar.longitud = e.lngLat.lng;
    //console.log(this.lugar)
  }

  ponPopUp = (e) => {
    var mapa = this.mapa;

    var marker = new mapboxgl.Marker().setLngLat([this.lugar.longitud, this.lugar.latitud]).addTo(mapa);
  }

  resetCoordenadas() {
    this.lugar.latitud = this.coordenadas.latitud;
    this.lugar.longitud = this.coordenadas.longitud;

    var mapa = this.mapa;

    var marker = new mapboxgl.Marker().setLngLat([this.lugar.longitud, this.lugar.latitud]).addTo(mapa);
  }

  update() {
    this.mapsService.updatePlace(this.lugar).subscribe(
      datos => {
        if (datos.result == "OK") {
          this.router.navigate(['/mapa']);
        }
      }
    );
  }

}
