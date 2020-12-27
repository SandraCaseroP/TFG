import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EspecialidadesService } from '../especialidades.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router } from '@angular/router';
import { InvestEspec } from 'src/app/model/invest-espec';
import { Especialidad } from 'src/app/model/especialidad';

@Component({
  selector: 'app-update-especialidad',
  templateUrl: './update-especialidad.component.html',
  styleUrls: ['./update-especialidad.component.css']
})
export class UpdateEspecialidadComponent implements OnInit {

  @Input() especialidadId: number;
  @Output() actualizado = new EventEmitter();


  public updateEspecialidad: InvestEspec;
  public especialidad: Especialidad;
  public alert: Boolean;

  constructor(private especialidadesService: EspecialidadesService, private menuService: MenuService, private router: Router) {
    this.updateEspecialidad = <InvestEspec>{};
    this.especialidad = <Especialidad>{};
    this.alert = false;
  }

  ngOnInit() {
    this.menuService.validaLoginJWT(null);

    this.especialidadesService.getEspecialidadesInvestigador_id(this.especialidadId).subscribe(
      datos => {
        //console.log(datos)
        this.updateEspecialidad = datos;
        this.especialidad = this.updateEspecialidad.tipo_especialidad;
        //console.log(this.especialidad.nombre)
      }
    );
  }

  update() {
    //console.log(this.updateEspecialidad)

    if (this.updateEspecialidad.nivel_experiencia != "Alto" && this.updateEspecialidad.nivel_experiencia != "Medio"
      && this.updateEspecialidad.nivel_experiencia != "Bajo" && this.updateEspecialidad.nivel_experiencia != "Master") {
      this.alert = true;
    }
    else {
      this.alert = false;

      this.especialidadesService.updateEspecialidadInvestigador(this.updateEspecialidad).subscribe(
        datos => {
          this.actualizado.emit(datos);
        },
        error => console.log(error)
      );
    }


  }

  cancel() {
    this.actualizado.emit(null);
  }

}
