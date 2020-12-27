import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TipoSucesosService } from '../tipo-sucesos.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router } from '@angular/router';
import { TipoSuceso } from 'src/app/model/tipo-suceso';

@Component({
  selector: 'app-update-tiposuceso',
  templateUrl: './update-tiposuceso.component.html',
  styleUrls: ['./update-tiposuceso.component.css']
})
export class UpdateTiposucesoComponent implements OnInit {

  @Input() tipoSucesoId: number;
  @Output() actualizado = new EventEmitter();

  public tipoSuceso: TipoSuceso;

  constructor(private tipoSucesosService: TipoSucesosService, private menuService: MenuService, private router: Router) {
    this.tipoSuceso = <TipoSuceso>{};
  }

  ngOnInit() {
    this.menuService.validaLoginJWT(null);

    this.tipoSucesosService.getTipoSucesoById(this.tipoSucesoId).subscribe(
      datos => {
        //console.log(datos)
        this.tipoSuceso = datos;
      }
    );
  }

  update() {
    //console.log(this.tipoSuceso)
    this.tipoSucesosService.updateTipoSuceso(this.tipoSuceso).subscribe(
      datos => {
        this.actualizado.emit(datos);
      },
      error => console.log(error)
    );
  }

  cancel() {
    this.actualizado.emit(null);
  }

}
