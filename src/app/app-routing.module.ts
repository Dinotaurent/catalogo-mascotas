import { RazasFormComponent } from './components/razas/razas-form.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { RazasComponent } from './components/razas/razas.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotasFormComponent } from './components/mascotas/mascotas-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: 'inicio', component: InicioComponent },
  { path: 'razas', component: RazasComponent },
  { path: 'razas/form', component: RazasFormComponent },
  { path: 'razas/form/:id', component: RazasFormComponent },
  { path: 'mascotas', component: MascotasComponent },
  { path: 'mascotas/form', component: MascotasFormComponent },
  { path: 'mascotas/form/:id', component: MascotasFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
