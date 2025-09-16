const Computador = require("../models/Computador");

class ComputadorController {
  async create(name, description, empresaId, local) {
    try {
      if (!empresaId) {
        throw new Error("ID da empresa não fornecido");
      }
      if (!name) {
        throw new Error("Nome do computador não fornecido");
      }
      const computador = await Computador.create({ nome: name, descricao: description, empresaId: empresaId, local: local });
      return computador;
    } catch (error) {
      throw new Error(`Erro ao registrar computador: ${error.message}`);
    }
  }

  async getAll() {
    try {
      const computadoresList = await Computador.findAll({ include: 'empresa' });

      const computadoresJSON = computadoresList.map(computador => ({
        id: computador.dataValues.id,
        nome: computador.dataValues.nome,
        descricao: computador.dataValues.descricao,
        local: computador.dataValues.local,
        empresa: computador.dataValues.empresa
      }));
      return computadoresJSON;

    } catch (error) {
      throw new Error('Erro ao buscar computadores: ' + error.message);
    }
  }

  async getByEmpresa(id) {
    try {
      const computadoresList = await Computador.findAll({ where: { empresaId: id }, include: 'empresa' });

      const computadoresJSON = computadoresList.map(computador => ({
        id: computador.dataValues.id,
        nome: computador.dataValues.nome,
        descricao: computador.dataValues.descricao,
        local: computador.dataValues.local,
        empresa: computador.dataValues.empresa
      }));
      return computadoresJSON;
    } catch (error) {
      throw new Error('Erro ao buscar computadores: ' + error.message);
    }
  }

  async getById(id) {
    try {
      const computador = await Computador.findByPk(id, { include: 'empresa' });

      if (!computador) {
        throw new Error('Computador não encontrado');
      }
      return computador
    }
    catch (error) {
      throw new Error(`Erro ao buscar computador: ${error.message}`);
    }
  }

  async update(computador_new) {
    try {
      const computador = await Computador.findByPk(computador_new.id);
      if (!computador) {
        throw new Error('Computador não encontrado');
      }
      console.log(computador_new)
      computador.nome = computador_new.nome;
      computador.descricao = computador_new.descricao;
      computador.local = computador_new.local; 
      computador.save();
      return computador;
    } catch (error) {
      throw new Error(`Erro ao atualizar computador: ${error.message}`);
    }
  }
}

module.exports = ComputadorController;