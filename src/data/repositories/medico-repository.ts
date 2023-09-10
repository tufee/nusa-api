import Knex from 'knex';
import config from '../../../knexfile';
import { IMedico } from '../../domain/entities/interfaces/medico';
import { IMedicoRepository } from './interfaces/medico';

const knex = Knex(config);

export class MedicoRepository implements IMedicoRepository {
  async create(medico: Omit<IMedico, 'id'>): Promise<IMedico> {
    const [createdMedico] = await knex<IMedico>('medicos')
      .insert(medico)
      .returning('*');
    return createdMedico;
  }

  async findByCPF(cpf: string): Promise<IMedico | null> {
    const [medico] = await knex<IMedico>('medicos').select('*').where({ cpf });
    return medico;
  }
}