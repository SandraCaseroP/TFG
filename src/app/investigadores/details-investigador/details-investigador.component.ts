import { Component, OnInit } from '@angular/core';
import { Investigador } from 'src/app/model/investigador';
import { InvestigadoresService } from '../investigadores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/menu/menu.service';

@Component({
  selector: 'app-details-investigador',
  templateUrl: './details-investigador.component.html',
  styleUrls: ['./details-investigador.component.css']
})
export class DetailsInvestigadorComponent implements OnInit {

  public investigador: Investigador;
  public loading: boolean;
  public idInvestigador;

  public id_invest;
  public id_Rol;

  constructor(private investigadorService: InvestigadoresService, private menuService: MenuService, private router: Router, private route: ActivatedRoute) {
    this.investigador = <Investigador>{};
    this.loading = true;
  }

  ngOnInit() {
    this.idInvestigador = this.route.snapshot.params["idInvestigador"];

    //console.log("investigador "+ this.idInvestigador)

    this.investigadorService.detailsInvestigador(this.idInvestigador).subscribe(
      datos => {
        //console.log(datos);

        setTimeout(() => {
          this.investigador = datos;
          this.loading = false;
        }, 1000);
      }
    );

    this.id_invest = localStorage.getItem('idInvestigador');
    this.id_Rol = localStorage.getItem('idRol');

    if (localStorage.getItem('JWT') != "") {
      this.menuService.validaLoginJWT(null);
    }
  }

}
