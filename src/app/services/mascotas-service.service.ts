import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_BASE } from '../config/app';
import { Mascota } from '../models/mascota';
import { CommonsServiceService } from './commons-service.service';

@Injectable({
  providedIn: 'root'
})
export class MascotasServiceService extends CommonsServiceService<Mascota>{

  constructor(http: HttpClient) {
    super(http);
    this.URL = `${URL_BASE}mascotas/`;
  }


  crearConFoto(mascota: Mascota, archivo: File): Observable<Mascota>{
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', mascota.nombre);

    return this.http.post<Mascota>(`${this.URL}registrar-con-foto`, formData);
  }

  editarConFoto(mascota: Mascota, archivo: File): Observable<Mascota>{
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', mascota.nombre);

    return this.http.put<Mascota>(`${this.URL}actualizar-con-foto/${mascota.id}`, formData);
  }

  buscarMascotaXNombre(nombre: string): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(
      `${this.URL}buscar-mascota-x-nombre/${nombre}`
    );
  }
}
