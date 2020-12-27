import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    if (localStorage.getItem('JWT') != "") {
      this.menuService.validaLoginJWT(null);
    }
  }

}
