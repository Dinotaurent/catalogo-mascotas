import { Generic } from './../models/generic';
import { Directive, OnInit, ViewChild } from '@angular/core';
import { CommonsServiceService } from '../services/commons-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Directive()
export abstract class CommonsListarComponent<E extends Generic, S extends CommonsServiceService<E>> implements OnInit{

  titulo: string;
  lista: E[];
  totalRegistros = 0;
  paginaActual = 0;
  totalXPagina = 9;
  pageSizeOptions: number[] =  [3, 9, 18, 32, 100];
  protected nombreEntity: string;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(protected service: S) {}

  ngOnInit(): void {
    this.calcularRangos();
  }


  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalXPagina = event.pageSize;
    this.calcularRangos();
  }

  calcularRangos(){
    this.service.listarXPagina(
      this.paginaActual.toString(),
      this.totalXPagina.toString()
    ).subscribe(p => {
      this.lista = p.content as E[];
      this.totalRegistros = p.totalElements as number;
      this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
    })
  }

  eliminar(e: E): void {
    Swal.fire({
      title: `Estas seguro de eliminar ${this.nombreEntity} ${e.nombre}?`,
      text: 'Esto no se podra revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(e.id).subscribe(() => {
          this.calcularRangos();
        });
        Swal.fire(
          'Eliminado!',
          `${e.nombre} fue borrado`,
          'success'
        );
      }
    });
  }

}
