import { IMedicamento } from '../../../domain/entities/interfaces/medicamento';

export interface IMedicamentoRepository {
  create(medicamento: IMedicamento): Promise<IMedicamento[]>;
  findByCodigoAnvisa(codigo_anvisa: string): Promise<IMedicamento[] | null>;
  findAll(): Promise<IMedicamento[] | null>;
  search(name: string): Promise<IMedicamento[] | null>;
}
