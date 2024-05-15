const Computador = require("../models/Computador");

class ComputadorController {
  async create(name, description, empresaId) {
    try {
      // Verifica se o id da empresa é válido

      if (!empresaId) {
        throw new Error("ID da empresa não fornecido");
      }

      if (!name) {
        throw new Error("Nome do computador não fornecido");
      }

      // Cria o computador associado à empresa
      const computador = await Computador.create({ nome: name, descricao: description, empresaId: empresaId });
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
      computador.nome = computador_new.nome;
      computador.descricao = computador_new.descricao;
      computador.save();
      return computador;

    } catch (error) {
      throw new Error(`Erro ao atualizar computador: ${error.message}`);

    }
  }
}

module.exports = ComputadorController;