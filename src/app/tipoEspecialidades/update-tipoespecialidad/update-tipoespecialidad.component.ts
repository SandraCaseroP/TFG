import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Especialidad } from 'src/app/model/especialidad';
import { TipoEspecialidadesService } from '../tipo-especialidades.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-tipoespecialidad',
  templateUrl: './update-tipoespecialidad.component.html',
  styleUrls: ['./update-tipoespecialidad.component.css']
})
export class UpdateTipoespecialidadComponent implements OnInit {

  @Input() sucesoIdUpdate: number;
  @Output() actualizado = new EventEmitter();

  public especialidad: Especialidad;

  constructor(private tipoEspecialidadesService: TipoEspecialidadesService, private menuService: MenuService, private router: Router) {
    this.especialidad = <Especialidad>{};
  }

  ngOnInit() {
    this.menuService.validaLoginJWT(null);

    this.tipoEspecialidadesService.getEspecialidadById(this.sucesoIdUpdate).subscribe(
      datos => {
        //console.log(datos)
        this.especialidad = datos;
      }
    );
  }

  update() {
    //console.log(this.especialidad)

    this.tipoEspecialidadesService.updateEspecialidad(this.especialidad).subscribe(
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
