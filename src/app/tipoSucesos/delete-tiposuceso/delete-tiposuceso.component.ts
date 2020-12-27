import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TipoSuceso } from 'src/app/model/tipo-suceso';
import { TipoSucesosService } from '../tipo-sucesos.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-tiposuceso',
  templateUrl: './delete-tiposuceso.component.html',
  styleUrls: ['./delete-tiposuceso.component.css']
})
export class DeleteTiposucesoComponent implements OnInit {

  @Input() tipoId: number;
  @Output() eliminado = new EventEmitter();

  public tipo: TipoSuceso;
  public oculto: boolean;

  public noBorrar: boolean;

  constructor(private tipoSucesosService: TipoSucesosService, private menuService: MenuService, private router: Router) {
    this.tipo = <TipoSuceso>{};
    this.noBorrar = true;
    this.oculto = true;
  }

  ngOnInit() {
    this.menuService.validaLoginJWT(null);

    this.tipoSucesosService.getTipoSucesoById(this.tipoId).subscribe(
      datos => {
        this.tipo = datos;
        //console.log(this.tipo)
      }
    );

    //Comprobamos que ese tipo de suceso no está en uso

    this.tipoSucesosService.validarTipoSuceso(this.tipoId).subscribe(
      datos => {
        //console.log(datos);
        if (datos.estado && datos.estado == "ocupado") {
          this.oculto = true;
          this.noBorrar = false;

          setTimeout(() => {
            this.eliminado.emit(null);
          }, 3000);
        }
        else {//si no está en uso se muestra el confirm para borrarlo
          this.oculto = false;
        }
      }
    );
  }

  delete(id) {

    //console.log(id)

    this.tipoSucesosService.deleteTipoSuceso(id).subscribe(
      datos => {
        this.eliminado.emit(datos);
        //console.log(datos)
      },
      error => console.log(error)
    );
  }

  cancel() {
    this.eliminado.emit(null);
  }

}
