import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TipoSuceso } from 'src/app/model/tipo-suceso';
import { TipoSucesosService } from '../tipo-sucesos.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-tiposuceso',
  templateUrl: './add-tiposuceso.component.html',
  styleUrls: ['./add-tiposuceso.component.css']
})
export class AddTiposucesoComponent implements OnInit {

  @Output() anadido = new EventEmitter();

  public tipoSuceso: TipoSuceso;

  constructor(private tipoSucesosService: TipoSucesosService, private menuService: MenuService, private router: Router) {
    this.tipoSuceso = <TipoSuceso>{};
  }

  ngOnInit() {
    this.menuService.validaLoginJWT(null);
  }

  add() {
    //console.log(this.tipoSuceso);

    this.tipoSucesosService.addTipoSuceso(this.tipoSuceso).subscribe(
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
