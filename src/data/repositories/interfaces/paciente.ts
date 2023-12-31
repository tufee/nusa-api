import { IPaciente } from '../../../domain/entities/interfaces/paciente';

export interface IPacienteRepository {
  create(paciente: IPaciente): Promise<IPaciente[]>;
  findByCPF(id: string): Promise<IPaciente[] | null>;
  findAll(): Promise<IPaciente[] | null>;
  search(name: string): Promise<IPaciente[] | null>;
}
