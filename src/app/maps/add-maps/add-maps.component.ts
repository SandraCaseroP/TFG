import { Component, OnInit } from '@angular/core';
import { MapsService } from '../maps.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router } from '@angular/router';
import { Map } from 'src/app/model/map';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-maps',
  templateUrl: './add-maps.component.html',
  styleUrls: ['./add-maps.component.css']
})
export class AddMapsComponent implements OnInit {

  public lugar: Map;
  public mapa: mapboxgl.Map

  constructor(private mapsService: MapsService, private menuService: MenuService, private router: Router) {
    this.lugar = <Map>{};
  }

  ngOnInit() {
    this.menuService.validaLoginJWT(null);

    (mapboxgl as any).accessToken = environment.mapBoxToken;

    this.mapa = new mapboxgl.Map({
      container: 'divmapa', // 
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-5.981415, 37.386722],
      zoom: -0.77
    });
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

  add() {
    //console.log(this.lugar)

    this.mapsService.addPlace(this.lugar).subscribe(
      datos => {
        if (datos.result == "OK") {
          this.router.navigate(['/mapa']);
        }
      }
    );
  }

}
