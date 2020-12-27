import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Especialidad } from 'src/app/model/especialidad';
import { TipoEspecialidadesService } from '../tipo-especialidades.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-tipoespecialidad',
  templateUrl: './delete-tipoespecialidad.component.html',
  styleUrls: ['./delete-tipoespecialidad.component.css']
})
export class DeleteTipoespecialidadComponent implements OnInit {

  @Input() sucesoIdDelete: number;
  @Output() eliminado = new EventEmitter();

  public especialidad: Especialidad;

  public oculto: boolean;

  public noBorrar: boolean;

  constructor(private tipoEspecialidadesService: TipoEspecialidadesService, private menuService: MenuService, private router: Router) {
    this.especialidad = <Especialidad>{};
    this.noBorrar = true;
    this.oculto = true;
  }

  ngOnInit() {
    this.menuService.validaLoginJWT(null);

    this.tipoEspecialidadesService.getEspecialidadById(this.sucesoIdDelete).subscribe(
      datos => {
        this.especialidad = datos;
      }
    );

    //Comprobamos que ese tipo de especialidad no está en uso

    this.tipoEspecialidadesService.validarTipoEspecialidad(this.sucesoIdDelete).subscribe(
      datos => {
        //console.log(datos);

        if (datos.estado && datos.estado == "ocupado") { //si está en uso no se borra y se muestra un mensaje de alerta
          this.oculto = true;
          this.noBorrar = false;

          setTimeout(() => {
            this.eliminado.emit(null);
          }, 3000);
        }

        else { //si no está en uso se muestra el confirm para borrarlo
          this.oculto = false;
        }
      }
    );
  }

  delete(id) {

    //console.log(id)

    this.tipoEspecialidadesService.deleteEspecialidad(id).subscribe(
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
