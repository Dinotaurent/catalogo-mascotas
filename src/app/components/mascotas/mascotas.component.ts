import { MascotasServiceService } from './../../services/mascotas-service.service';
import { Component, OnInit } from '@angular/core';
import { CommonsListarComponent } from '../commons-listar.component';
import { Mascota } from 'src/app/models/mascota';
import { URL_BASE } from 'src/app/config/app';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css'],
})
export class MascotasComponent
  extends CommonsListarComponent<Mascota, MascotasServiceService>
  implements OnInit
{
  URL = `${URL_BASE}mascotas/`;
  constructor(service: MascotasServiceService) {
    super(service);
    this.titulo = 'Listado de mascotas';
    this.nombreEntity = Mascota.name;
  }



}
