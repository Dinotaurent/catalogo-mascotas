import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Razas', cols: 1, rows: 1 , img: '../../../assets/images/razas.jpg',texto:'Puedes ver, editar, eliminar todas las razas de mascotas o registrar nuevas'},
          { title: 'Mascotas', cols: 1, rows: 1 ,texto:'Puedes registrar ,editar, o liminar mascotas'},
        ];
      }

      return [
        { title: 'Razas', cols: 1, rows: 1 ,img: '../../../assets/images/razas.jpg' ,texto:'Puedes ver, editar, eliminar todas las razas de mascotas o registrar nuevas'},
        { title: 'Mascotas', cols: 1, rows: 1 ,img: '../../../assets/images/mascotas.jpg' ,texto:'Puedes registrar editar, o liminar mascotas'},
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
