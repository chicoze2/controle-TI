const Manutencao = require("../models/Manutencao");
const Computador = require("../models/Computador");
const Empresa = require("../models/Empresa");
const ManutencaoItem = require("../models/ManutencaoItem")

class ManutencaoController {
  async create(description, computadorId) {
    try {
      if (!computadorId) {
        throw new Error(
          "Não foi informado um computador para registrar a manutenção!"
        );
      }

      const manutencao = await Manutencao.create({
        descricao: description,
        computadorId: computadorId,
      });
      return manutencao;
    } catch (e) {
      throw new Error(`Erro ao registrar manutenção: ${e.message}`);
    }
  }

  async findAll() {
    try {
      const manutencoesList = await Manutencao.findAll({
        include: [
          {
            model: Computador,
            as: "computador",
            include: [
              { model: Empresa, as: "empresa", attributes: ["nome"] }, // Adicione o alias aqui
            ],
          },
        ],
      });
      const manutencoesJSON = manutencoesList.map((manutencao) => ({
        id: manutencao.dataValues.id,
        descricao: manutencao.dataValues.descricao,
        computadorId: manutencao.dataValues.computadorId,
        dataEntrada: manutencao.dataValues.dataEntrada,
        empresa: manutencao.computador.empresa.nome, // Use o alias aqui
        pcName: manutencao.computador.nome,
      }));
      return manutencoesJSON;
    } catch (error) {
      throw new Error(`Erro ao listar manutenções: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const manutencao = await Manutencao.findByPk(id, {
        include: "computador",})

      return manutencao
      
  } catch (error) {
    throw new Error(
      "Erro ao buscar manutenções por ID: " + error.message
   )}
  }

  async findByEmpresa(empresaId) {
    try {
      const manutencoesList = await Manutencao.findAll({
        where: { empresaId: id },
        include: "empresa",
      });
      console.log("terminar essa pora");
    } catch (error) {
      throw new Error(
        "Erro ao buscar manutenções by empresa: " + error.message
      );
    }
  }

  async findByComputador(id) {
    try {
      const manutencaoList = await Manutencao.findAll({
        where: { computadorId: id },
        include: "computador",
      });

      const manutencaoJSON = manutencaoList.map((manutencao) => ({
        id: manutencao.dataValues.id,
        descricao: manutencao.dataValues.descricao,
        dataEntrada: manutencao.dataValues.dataEntrada,
        computadorId: manutencao.dataValues.computadorId,
        pcName: manutencao.computador.nome,
      }));
      console.log(manutencaoJSON);
      return manutencaoJSON;
    } catch (error) {
      throw new Error("Erro ao buscar computadores: " + error.message);
    }
  }

  async addItemManutencao(manutencaoId, descricao) {
    try {
      const manutencaoItem = await ManutencaoItem.create({descricao: descricao, manutencaoId: manutencaoId})
    }
    catch(err){
      throw new Error("Erro ao adicionar um item dentro de uma manutenção" + err)
    }
  }

  async getItemManutencao(id) {
    try{

      const manutencaoItemList = await ManutencaoItem.findAll({
        where: {manutencaoId : id},
        include: "manutencao"
      })

      console.log(manutencaoItemList)

      const manutencaoJSON = manutencaoItemList.map((manutencao) => ({
        id: manutencao.dataValues.id,
        descricao: manutencao.dataValues.descricao,
        dataEntrada: manutencao.dataValues.createdAt,
      }));

      console.log(manutencaoJSON)
      return manutencaoJSON

    }catch(err){
      throw new Error("Erro ao procurar os itens dentro de uma manutenção" + err)
    }
  }

}

ManutencaoItem.belongsTo(Manutencao, { foreignKey: 'id', as: 'manutencao' })

module.exports = ManutencaoController;
