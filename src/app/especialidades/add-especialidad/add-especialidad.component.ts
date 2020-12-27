import { Component, OnInit } from '@angular/core';
import { Investigador } from 'src/app/model/investigador';
import { Especialidad } from 'src/app/model/especialidad';
import { InvestEspec } from 'src/app/model/invest-espec';
import { EspecialidadesService } from '../especialidades.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-especialidad',
  templateUrl: './add-especialidad.component.html',
  styleUrls: ['./add-especialidad.component.css']
})
export class AddEspecialidadComponent implements OnInit {

  public id_invest;

  public idInvestigador: number;
  public investigador: Investigador;

  public allEspecialidades: Array<Especialidad>;
  public especialidadesInvest: any;
  public especialidades: Array<Especialidad>;

  public newEspecialidad: InvestEspec;
  public alert: boolean;

  constructor(private especialidadesService: EspecialidadesService, private menuService: MenuService, private router: Router) {
    this.investigador = <Investigador>{};
    this.allEspecialidades = [];
    this.especialidadesInvest = [];
    this.especialidades = [];
    this.newEspecialidad = <InvestEspec>{};
    this.alert = false;
  }

  ngOnInit() {
    this.menuService.validaLoginJWT(null);

    this.id_invest = localStorage.getItem('idInvestigador');

    //console.log(this.id_invest)

    this.especialidadesService.getDatosInvestigador(this.id_invest).subscribe(
      datos => {
        this.investigador = datos;
      }
    );

    this.especialidadesService.getEspecialidades().subscribe(
      datos => {
        //console.log(datos)
        this.allEspecialidades = datos;
        this.especialidadesLibres();
      }
    );

    this.newEspecialidad.id_investigador = this.id_invest;
  }

  especialidadesLibres() {

    this.especialidadesService.getEspecialidades_IdInvestigador(this.id_invest).subscribe(
      datos => {
        //console.log(datos)
        this.especialidadesInvest = datos;

        //Comparamos los 2 arrays y vemos la diferencias. Guardamos en el array "especialidades" las especialidades que no tiene el investigador

        this.allEspecialidades.forEach(element => {
          let same = false;

          this.especialidadesInvest.forEach(element2 => {
            if (element.id == element2.especialidad_id) {
              same = true;
            }
          });

          if (!same) {
            this.especialidades.push(element)
          }
        });
      }
    );
  }

  add() {
    //console.log(this.newEspecialidad)

    if (this.newEspecialidad.nivel_experiencia != "Alto" && this.newEspecialidad.nivel_experiencia != "Medio"
      && this.newEspecialidad.nivel_experiencia != "Bajo" && this.newEspecialidad.nivel_experiencia != "Master") {
      this.alert = true;
    }
    else {
      this.alert = false;
      this.especialidadesService.addInvestEspecialidad(this.newEspecialidad).subscribe(
        datos => {
          //console.log("resultado ", datos)

          if (datos.result == "OK") {
            this.router.navigate(['/investigador-detalles/' + this.id_invest]);
          }
        }
      );
    }
  }

}
