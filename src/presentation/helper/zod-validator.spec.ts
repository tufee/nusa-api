import {
  createMedicamentoSchema,
  createMedicoSchema,
  createPacienteSchema,
  createReceitaSchema,
  loginInputSchema,
} from './zod-validator';

describe('ZodValidator', () => {
  describe('createPacienteSchema', () => {
    const pacienteData = {
      nome: 'John Doe',
      cpf: '12345678901',
      data_nascimento: '07/03/1994',
    };

    it('Deve aceitar dados de pacientes válidos', () => {
      expect(() => createPacienteSchema.parse(pacienteData)).not.toThrow();
    });

    it('Deve rejeitar dados de pacientes com data de nascimento inválida', () => {
      expect(() =>
        createPacienteSchema.parse({
          ...pacienteData,
          data_nascimento: 'invalid-date',
        })
      ).toThrowError('Data de nascimento inválida');
    });

    it('Deve rejeitar dados de pacientes com campos em falta', () => {
      expect(() =>
        createPacienteSchema.parse({ nome: pacienteData.nome })
      ).toThrowError();
    });
  });

  describe('createMedicoSchema', () => {
    const medicoData = {
      nome: 'John Doe',
      cpf: '12345678901',
      senha: 'password123',
    };

    it('Deve aceitar dados de médicos válidos', () => {
      expect(() =>
        createMedicoSchema.parse({
          ...medicoData,
          data_nascimento: '07/03/1994',
          confirma_senha: 'password123',
        })
      ).not.toThrow();
    });

    it('Deve rejeitar dados de médicos com senhas diferentes', () => {
      expect(() =>
        createMedicoSchema.parse({
          ...medicoData,
          data_nascimento: '07/03/1994',
          confirma_senha: 'password',
        })
      ).toThrowError('Senhas não conferem');
    });

    it('Deve rejeitar dados de médicos com data de nascimento inválida', () => {
      expect(() =>
        createMedicoSchema.parse({
          ...medicoData,
          data_nascimento: 'invalid-date',
          confirma_senha: 'password123',
        })
      ).toThrowError('Data de nascimento inválida');
    });

    it('Deve rejeitar dados de usuário com campos em falta', () => {
      expect(() => createMedicoSchema.parse(medicoData)).toThrowError();
    });
  });

  describe('createMedicamentoSchema', () => {
    it('Deve aceitar dados de medicamento válidos', () => {
      const medicamentoData = {
        nome: 'dipirona',
        categoria: 'ANALGESICOS',
        codigo_anvisa: '1018600360022',
      };

      expect(() =>
        createMedicamentoSchema.parse(medicamentoData)
      ).not.toThrow();
    });

    it('Deve rejeitar dados de medicamento com campos ausentes', () => {
      const medicamentoData = {
        nome: 'dipirona',
      };

      expect(() =>
        createMedicamentoSchema.parse(medicamentoData)
      ).toThrowError();
    });

    it('Deve rejeitar dados de medicamento com tipos inválidos', () => {
      const medicamentoData = {
        nome: 123,
        categoria: 123,
        codigo_anvisa: 123,
      };

      expect(() =>
        createMedicamentoSchema.parse(medicamentoData)
      ).toThrowError();
    });
  });

  describe('createReceitaSchema', () => {
    const receitaData = {
      medico_id: 'c9f47d0c-df15-4d15-9d6e-329235c5d4d3',
      paciente_id: '0ecf2e35-44e9-4e0c-b9b3-ae383ba9e5a7',
      medicamento_id: '3d3b4b2b-e558-4b89-926b-5d0f21b86e45',
    };

    it('Deve validar dados de receita corretos', async () => {
      expect(() =>
        createReceitaSchema.parse({
          ...receitaData,
          data_prescricao: '07/03/1994',
        })
      ).not.toThrow();
    });

    it('Deve lançar erro ao validar dados de receita incorretos', () => {
      expect(() =>
        createReceitaSchema.parse({
          ...receitaData,
          data_prescricao: 'invalid-date',
        })
      ).toThrowError('Data de prescrição inválida');
    });
  });

  describe('loginInputSchema', () => {
    it('deve passar na validação com dados válidos', () => {
      const validData = {
        cpf: '12345678901',
        senha: 'senha123',
      };

      const result = loginInputSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it('deve falhar na validação com CPF inválido', () => {
      const invalidData = {
        cpf: '12345',
        senha: 'senha123',
      };

      const result = loginInputSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it('deve falhar na validação com senha muito curta', () => {
      const invalidData = {
        cpf: '12345678901',
        senha: '123',
      };

      const result = loginInputSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it('deve falhar na validação com dados ausentes', () => {
      const invalidData = {};

      const result = loginInputSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });
  });
});
