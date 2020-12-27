import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SucesosService } from '../sucesos.service';
import { MenuService } from 'src/app/menu/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Suceso } from 'src/app/model/suceso';

@Component({
  selector: 'app-delete-suceso',
  templateUrl: './delete-suceso.component.html',
  styleUrls: ['./delete-suceso.component.css']
})
export class DeleteSucesoComponent implements OnInit {

  @Input() sucesoId: number;
  @Output() eliminado = new EventEmitter();

  public suceso: Suceso;

  constructor(private sucesosService: SucesosService, private menuService: MenuService, private router: Router, private route: ActivatedRoute) {
    this.suceso = <Suceso>{};
  }

  ngOnInit() {
    this.menuService.validaLoginJWT(null);

    this.sucesosService.getSucesoById(this.sucesoId).subscribe(
      datos => {
        this.suceso = datos;
        //console.log(this.suceso)
      }
    );
  }

  delete(id) {
    this.sucesosService.deleteSuceso(id).subscribe(
      datos => {
        //console.log(datos)
        this.eliminado.emit(datos);
      },
      error => console.log(error)
    );
  }

  cancel() {
    this.eliminado.emit(null);
  }

}
