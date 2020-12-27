import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Especialidad } from 'src/app/model/especialidad';
import { TipoEspecialidadesService } from '../tipo-especialidades.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-tipoespecialidad',
  templateUrl: './add-tipoespecialidad.component.html',
  styleUrls: ['./add-tipoespecialidad.component.css']
})
export class AddTipoespecialidadComponent implements OnInit {

  public especialidad: Especialidad;

  @Output() anadido = new EventEmitter();

  constructor(private tipoEspecialidadesService: TipoEspecialidadesService, private menuService: MenuService, private router: Router) {
    this.especialidad = <Especialidad>{};
  }

  ngOnInit() {
    this.menuService.validaLoginJWT(null);
  }

  add() {
    //console.log(this.especialidad);

    this.tipoEspecialidadesService.addEspecialidad(this.especialidad).subscribe(
      datos => {
        this.anadido.emit(datos);
      },
      error => console.log(error)
    );
  }

  cancel() {
    this.anadido.emit(null);
  }

}
