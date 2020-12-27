import { Component, OnInit } from '@angular/core';
import { SucesosService } from '../sucesos.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router } from '@angular/router';
import { TipoSuceso } from 'src/app/model/tipo-suceso';
import { Suceso } from 'src/app/model/suceso';

@Component({
  selector: 'app-add-suceso',
  templateUrl: './add-suceso.component.html',
  styleUrls: ['./add-suceso.component.css']
})
export class AddSucesoComponent implements OnInit {

  public id_invest;

  public tipo_sucesos: Array<TipoSuceso>;
  public idInvestigador;
  public suceso: Suceso;

  constructor(private sucesosService: SucesosService, private menuService: MenuService, private router: Router) {
    this.suceso = <Suceso>{};
    this.tipo_sucesos = [];
  }

  ngOnInit() {
    this.id_invest = localStorage.getItem('idInvestigador');

    this.menuService.validaLoginJWT(null);

    this.sucesosService.getSucesosType().subscribe(
      datos => {
        //console.log(datos);
        this.tipo_sucesos = datos;
      }
    );
    this.suceso.id_investigador = this.id_invest;
  }

  add() {
    this.sucesosService.addSucesos(this.suceso).subscribe(
      datos => {
        //console.log("resultado ",datos)

        if (datos.result == "OK") {
          this.router.navigate(['/investigador-detalles/' + this.id_invest]);
        }
      }
    );
  }

}
