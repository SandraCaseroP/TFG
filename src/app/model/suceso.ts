import { TipoSuceso } from './tipo-suceso';

export interface Suceso {
    id: number;
    tipo: TipoSuceso;
    id_investigador: number;
    nombre: string;
    lugar: string;
    fecha: Date;
    descripcion: string;
    donacion: number;
    actualDonacion: number;
}
