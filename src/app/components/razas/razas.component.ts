import { RazasServiceService } from './../../services/razas-service.service';
import { Raza } from './../../models/raza';
import { Component, OnInit } from '@angular/core';
import { CommonsListarComponent } from '../commons-listar.component';
import { URL_BASE } from 'src/app/config/app';

@Component({
  selector: 'app-razas',
  templateUrl: './razas.component.html',
  styleUrls: ['./razas.component.css'],
})
export class RazasComponent
  extends CommonsListarComponent<Raza, RazasServiceService>
  implements OnInit
{
  URL = `${URL_BASE}razas/`;
  constructor(service: RazasServiceService) {
    super(service);
    this.titulo = 'Listado de Razas de mascotas';
    this.nombreEntity = Raza.name;
  }
}
