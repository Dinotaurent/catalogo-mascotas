import { Generic } from "./generic";
import { Mascota } from "./mascota";


export class Raza implements Generic{
  id: number;
  nombre: string;
  mascotas: Mascota[] = [];
  createAt: number;
  fotoHashCode: number;

}
