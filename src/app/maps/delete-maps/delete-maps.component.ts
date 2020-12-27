import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapsService } from '../maps.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Map } from 'src/app/model/map';

@Component({
  selector: 'app-delete-maps',
  templateUrl: './delete-maps.component.html',
  styleUrls: ['./delete-maps.component.css']
})
export class DeleteMapsComponent implements OnInit {

  public lugar: Map;
  public idLugar;

  constructor(private mapsService: MapsService, private menuService: MenuService, private router: Router, private route: ActivatedRoute) {
    this.lugar = <Map>{};
  }

  ngOnInit() {
    this.menuService.validaLoginJWT(null);

    this.idLugar = this.route.snapshot.params["idLugar"];

    this.mapsService.getPlaceById(this.idLugar).subscribe(
      datos => {
        this.lugar = datos;
      }
    );
  }

  delete(id) {
    this.mapsService.deletePlace(id).subscribe(
      datos => {
        if (datos.result == "OK") {
          this.router.navigate(['/mapa']);
        }
      },
      error => console.log(error)
    );
  }

  cancel() {
    this.router.navigate(['/mapa']);
  }

}
