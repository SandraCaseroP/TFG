import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SucesosService } from '../sucesos.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Suceso } from 'src/app/model/suceso';

@Component({
  selector: 'app-donation-suceso',
  templateUrl: './donation-suceso.component.html',
  styleUrls: ['./donation-suceso.component.css']
})
export class DonationSucesoComponent implements OnInit {

  @Input() idSucesoDonacion: number;
  @Output() donado = new EventEmitter();

  public suceso: Suceso;
  public actualDonacion: number;
  public donacionTotal: any;

  public negativo: boolean;

  constructor(private sucesosService: SucesosService, private menuService: MenuService, private router: Router, private route: ActivatedRoute) {
    this.suceso = <Suceso>{};
    this.negativo = false;
  }

  ngOnInit() {
    this.menuService.validaLoginJWT(null);

    this.sucesosService.getSucesoById(this.idSucesoDonacion).subscribe(
      datos => {
        this.suceso = datos;
        this.donacionTotal = this.suceso.donacion;

        this.donacionTotal = Number(datos.donacion);
        //console.log(typeof (this.donacionTotal), this.donacionTotal)
      }
    );
  }

  checkDonation(actualDonacion) {
    if (actualDonacion < 0) {
      this.negativo = true;
    }
    else {
      this.negativo = false;
    }
  }

  donate() {
    this.donacionTotal += this.suceso.actualDonacion;
    this.donacionTotal = this.donacionTotal.toFixed(2);

    this.donacionTotal = this.donacionTotal.toString();

    //console.log(this.donacionTotal)
    this.suceso.donacion = this.donacionTotal;

    //console.log(this.suceso)


    this.sucesosService.updateDonacion(this.suceso).subscribe(
      datos => {
        this.donado.emit(datos);
      },
      error => console.log(error)
    );
  }

  cancel() {
    this.donado.emit(null);
  }

}
