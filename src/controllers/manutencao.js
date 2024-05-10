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

  async findOpened() {
    try {
      const manutencoesList = await Manutencao.findAll({
        where: { dataSaida: null }
      });
      return manutencoesList;
    } catch (err) {
      throw new Error(`Erro ao buscar manutenções abertas: ${err.message}`);
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
        dataSaida: manutencao.dataValues.dataSaida,
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
      // const manutencoesList = await Manutencao.findAll({
      //   where: { empresaId: empresaId },
      //   include: "empresa",
      // });
      return;

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
        dataSaida: manutencao.dataValues.dataSaida,
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
      descricao.replace(/[^\w\s]|_\s*$/gi, "");
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

      const manutencaoJSON = manutencaoItemList.map((manutencao) => ({
        id: manutencao.dataValues.id,
        descricao: manutencao.dataValues.descricao,
        dataEntrada: manutencao.dataValues.createdAt,
      }));

      return manutencaoJSON

    }catch(err){
      throw new Error("Erro ao procurar os itens dentro de uma manutenção" + err)
    }
  }

  async encerrarManutencao(id){
    try{
      const manutencao = await Manutencao.findByPk(id)
      manutencao.dataSaida = new Date()
      manutencao.save()

      return
  } catch (err){
    throw new Error("Erro ao encerrar uma manutenção" + err)
  }
  }

}

ManutencaoItem.belongsTo(Manutencao, { foreignKey: 'id', as: 'manutencao' })

module.exports = ManutencaoController;
