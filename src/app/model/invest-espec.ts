import { Especialidad } from './especialidad';

export interface InvestEspec {
    id: number;
    id_investigador: number;
    tipo_especialidad: Especialidad;
    nivel_experiencia: string;
}
