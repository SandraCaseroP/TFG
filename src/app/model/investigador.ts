import { InvestEspec } from './invest-espec';
import { Suceso } from './suceso';
import { Rol } from './rol';

export interface Investigador {
    id: number;
    nombre: string;
    apellidos: string;
    dni: string;
    telefono: number;
    email: string;
    foto: string;
    imgGrande: string;
    sucesos: Suceso[];
    especialidades: InvestEspec[];
    id_rol: Rol;
    user: string;
    password: string;
}
