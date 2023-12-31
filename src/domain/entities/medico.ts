import { IMedico } from './interfaces/medico';

export class Medico implements IMedico {
  id: string;
  nome: string;
  cpf: string;
  data_nascimento: Date;
  senha: string;
  tipo: string;

  constructor(properties: IMedico) {
    this.id = properties.id;
    this.nome = properties.nome;
    this.cpf = properties.cpf;
    this.data_nascimento = properties.data_nascimento;
    this.senha = properties.senha;
    this.tipo = properties.tipo;
  }
}
