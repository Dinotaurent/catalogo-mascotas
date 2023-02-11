import { MascotasServiceService } from './../../services/mascotas-service.service';
import { Mascota } from './../../models/mascota';
import { Component } from '@angular/core';
import { CommonsFormComponent } from '../commons-form.component';
import { URL_BASE } from 'src/app/config/app';
import { Router, ActivatedRoute } from '@angular/router';
import { Raza } from 'src/app/models/raza';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mascotas-form',
  templateUrl: './mascotas-form.component.html',
  styleUrls: ['./mascotas.component.css'],
})
export class MascotasFormComponent extends CommonsFormComponent<Mascota, MascotasServiceService> {
  URL = `${URL_BASE}mascotas/`;
  fotoSeleccionada: File;

  constructor(
    service: MascotasServiceService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(service, router, route);
    this.model = new Mascota();
    this.rutaRedirect = '/mascotas';
    this.nombreEntity = Mascota.name;
    this.titulo = 'Crear nueva mascota';
  }

  subirFoto(event): void {
    this.fotoSeleccionada = event.target.files[0];

    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      this.fotoSeleccionada = null;
      Swal.fire({
        icon: 'error',
        text: 'Tienes que subir una imagen de algun tipo valido ej: PNG,JPG',
      });
    }
  }

  override crear(): void {
    if (!this.fotoSeleccionada) {
      super.crear();
    } else {
      this.service.crearConFoto(this.model, this.fotoSeleccionada).subscribe(
        (model) => {
          this.router.navigate([this.rutaRedirect]);
          Swal.fire(
            `${this.nombreEntity} ${model.nombre}`,
            'registrado con exito',
            'success'
          );
        },
        (err) => {
          if (err.status == 400) {
            this.error = err.error;
            Swal.fire({
              icon: 'error',
              title: 'Campos incorrectos',
            });
          }
        }
      );
    }
  }

  override editar(): void {
    if (!this.fotoSeleccionada) {
      super.editar();
    } else {
      Swal.fire({
        title: 'Seguro que quieres guardar los cambios?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: 'No guardar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service
            .editarConFoto(this.model, this.fotoSeleccionada)
            .subscribe(
              (model) => {
                this.router.navigate([this.rutaRedirect]);
                Swal.fire('Actualizado', '', 'success');
              },
              (err) => {
                if (err.status == 400) {
                  this.error = err.error;
                  console.log(this.error);
                  Swal.fire({
                    icon: 'error',
                    title: 'Campos incorrectos',
                  });
                }
              }
            );
        } else if (result.isDenied) {
          Swal.fire('No se aplicaron los cambios', '', 'info');
        }
      });
    }
  }

}
