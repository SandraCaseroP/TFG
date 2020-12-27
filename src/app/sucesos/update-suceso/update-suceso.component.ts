import { Component, OnInit } from '@angular/core';
import { SucesosService } from '../sucesos.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Suceso } from 'src/app/model/suceso';
import { TipoSuceso } from 'src/app/model/tipo-suceso';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-suceso',
  templateUrl: './update-suceso.component.html',
  styleUrls: ['./update-suceso.component.css']
})
export class UpdateSucesoComponent implements OnInit {

  public suceso: Suceso;
  public idSuceso: number;
  public tipo_sucesos: TipoSuceso;

  constructor(private sucesosService: SucesosService, private menuService: MenuService, private router: Router, private route: ActivatedRoute) {
    this.suceso = <Suceso>{};
    this.tipo_sucesos = <TipoSuceso>{};
  }

  ngOnInit() {
    this.menuService.validaLoginJWT(null);

    this.idSuceso = this.route.snapshot.params["idSuceso"];

    this.sucesosService.getSucesoById(this.idSuceso).subscribe(
      datos => {
        this.suceso = datos;
        this.tipo_sucesos = this.suceso.tipo;
        //console.log(this.suceso)
        //console.log(this.suceso.tipo.nombre)
      }
    );
  }

  update() {
    //console.log(this.suceso)
    this.sucesosService.updateSuceso(this.suceso).subscribe(
      datos => {
        //console.log(datos)

        this.router.navigate(['/sucesos/']);
      }
    );
  }

}
