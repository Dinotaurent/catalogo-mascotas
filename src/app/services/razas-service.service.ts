import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Raza } from './../models/raza';
import { Injectable } from '@angular/core';
import { CommonsServiceService } from './commons-service.service';
import { URL_BASE } from '../config/app';
import { Mascota } from '../models/mascota';

@Injectable({
  providedIn: 'root'
})
export class RazasServiceService  extends CommonsServiceService<Raza>{

  constructor(http: HttpClient) {
    super(http);
    this.URL = `${URL_BASE}razas/`;
  }

  crearConFoto(raza: Raza, archivo: File): Observable<Raza>{
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', raza.nombre);

    return this.http.post<Raza>(`${this.URL}registrar-con-foto`, formData);
  }

  editarConFoto(raza: Raza, archivo: File): Observable<Raza>{
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', raza.nombre);

    return this.http.put<Raza>(`${this.URL}actualizar-con-foto/${raza.id}`, formData);
  }

  asignarMascotas(
    raza: Raza,
    mascotas: Mascota[]
  ): Observable<Raza> {
    return this.http.put<Raza>(
      `${this.URL}${raza.id}/asignar-mascota`,
      mascotas,
      { headers: this.headers }
    );
  }

  removerMascota(raza: Raza, mascota: Mascota): Observable<Raza> {
    return this.http.put<Raza>(
      `${this.URL}${raza.id}/remover-mascota`,
      mascota,
      {
        headers: this.headers,
      }
    );
  }
}
