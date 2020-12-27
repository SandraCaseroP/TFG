import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InvestEspec } from 'src/app/model/invest-espec';
import { Especialidad } from 'src/app/model/especialidad';
import { EspecialidadesService } from '../especialidades.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-especialidad',
  templateUrl: './delete-especialidad.component.html',
  styleUrls: ['./delete-especialidad.component.css']
})
export class DeleteEspecialidadComponent implements OnInit {

  @Input() especialidadInvestId: number;
  @Output() eliminado = new EventEmitter();

  public especialidadInvestigador: InvestEspec;
  public especialidad: Especialidad;

  constructor(private especialidadesService: EspecialidadesService, private menuService: MenuService, private router: Router) {
    this.especialidadInvestigador = <InvestEspec>{};
    this.especialidad = <Especialidad>{};
  }

  ngOnInit() {
    this.menuService.validaLoginJWT(null);

    this.especialidadesService.getEspecialidadesInvestigador_id(this.especialidadInvestId).subscribe(
      datos => {
        this.especialidadInvestigador = datos;
        this.especialidad = this.especialidadInvestigador.tipo_especialidad;
        //console.log(this.especialidad)
      }
    );
  }

  delete(id) {
    this.especialidadesService.deleteInvestEspecialidad(id).subscribe(
      datos => {
        this.eliminado.emit(datos);
      },
      error => console.log(error)
    );
  }

  cancel() {
    this.eliminado.emit(null);
  }

}
