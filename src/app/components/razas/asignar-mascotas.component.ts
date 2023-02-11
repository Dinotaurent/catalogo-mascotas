import { MascotasServiceService } from './../../services/mascotas-service.service';
import { RazasServiceService } from './../../services/razas-service.service';
import { Mascota } from './../../models/mascota';
import { Raza } from './../../models/raza';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-mascotas',
  templateUrl: './asignar-mascotas.component.html',
  styleUrls: ['./razas.component.css'],
})
export class AsignarMascotasComponent implements OnInit {
  raza: Raza;
  mascotasAsignar: Mascota[] = [];
  mascotasRegistradas: Mascota[];
  mostrarColumnas = ['seleccion', 'nombre', 'edad'];
  mostrarColumnasRegistrados = ['nombre', 'edad', 'eliminar'];
  seleccion: SelectionModel<Mascota> = new SelectionModel<Mascota>(true, []);
  totalXPagina = [3, 6, 9, 20, 100];
  tabIndex = 0;
  dataSource: MatTableDataSource<Mascota>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private razaService: RazasServiceService,
    private mascotaService: MascotasServiceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((p) => {
      const id: number = +p.get('id');
      this.razaService.listarXId(id).subscribe((r) => {
        this.raza = r;
        this.mascotasRegistradas = this.raza.mascotas;

        this.iniciarPaginador();
      });
    });
  }

  iniciarPaginador(): void {
    this.dataSource = new MatTableDataSource<Mascota>(this.mascotasRegistradas);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
  }

  filtrarMascotas(event: any): void {
    let nombre: string = (<HTMLInputElement>event.target).value;
    nombre = nombre !== undefined ? nombre.trim() : '';
    if (nombre !== '') {
      this.mascotaService.buscarXNombre(nombre).subscribe(
        (mascotas) =>
          (this.mascotasAsignar = mascotas.filter((m) => {
            let filtrado = true;
            this.mascotasRegistradas.forEach((mr) => {
              if (m.id === mr.id) {
                filtrado = false;
              }
            });
            return filtrado;
          }))
      );
    }
  }

  todoSeleccionados(): boolean {
    const seleccionados = this.seleccion.selected.length;
    const numMascotas = this.mascotasAsignar.length;
    return seleccionados === numMascotas;
  }

  seleccionarTodos(): void {
    this.todoSeleccionados()
      ? this.seleccion.clear()
      : this.mascotasAsignar.forEach((e) => this.seleccion.select(e));
  }

  asignar(): void {
    this.razaService
      .asignarMascotas(this.raza, this.seleccion.selected)
      .subscribe(
        (r) => {
          this.mascotasRegistradas = this.mascotasRegistradas.concat(
            this.seleccion.selected
          );
          this.iniciarPaginador();
          this.mascotasAsignar = [];
          this.seleccion.clear();
          Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (e) => {
          if (e.status === 500) {
            const mensaje = e.error.trace as string;
            console.log(e);
            if (mensaje.indexOf('DataIntegrityViolationException') > -1) {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Esa mascota ya pertenece a otra raza`,
              });
            }
          }
        }
      );
      this.tabIndex = 0;
  }

  remover(mascota: Mascota): void {
    this.razaService.removerMascota(this.raza, mascota).subscribe((raza) => {
      this.mascotasRegistradas = this.mascotasRegistradas.filter(
        (m) => m.id !== mascota.id
      );
      this.iniciarPaginador();
      Swal.fire('Eliminada!', `${mascota.nombre} fue borrada`, 'success');
    });
  }
}
