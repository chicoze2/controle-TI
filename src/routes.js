const { Router } = require('express')
const router = Router()

// import controllers
const EmpresaController = require("./controllers/empresa")
const empresaController = new EmpresaController();
const ComputadorController = require("./controllers/computador")
const computadorController = new ComputadorController();
const ManutencaoController = require("./controllers/manutencao")
const manutencaoController = new ManutencaoController();
const TransferenciaController = require("./controllers/transferencia")
const transferenciaController = new TransferenciaController();
router.get('/test', (req, res) => {
    const manutencoesAbertas = manutencaoController.findOpened();
    console.log(typeof manutencoesAbertas)

    return res.send()
})
router.get('/', (req, res) => {
    const manutencoes = manutencaoController.findOpened();

    res.render('pages/home.ejs', { manutencoes: manutencoes })
});

///EMPRESA///
router.get('/register-empresa', (req, res) => {
    res.render('pages/register_empresa.ejs')
})

router.post('/register-empresa', async (req, res) => {
    try {
        const { nome, descricao } = req.body;
        const empresa = await empresaController.create(nome, descricao);
        res.redirect("/empresas");
    } catch (error) {
        console.error("Erro ao registrar empresa:", error);
        res.status(500).send("Erro ao registrar empresa: " + error.message);
    }
});

router.get('/empresas', async (req, res) => {
    const empresaController = new EmpresaController();
    const empresasList = await empresaController.getAll();

    res.render('pages/empresas', { empresas: empresasList });
})

router.get('/get-empresas', async (req, res) => {
    const empresasList = await empresaController.getAll();

    res.json(empresasList);
})

/// COMPUTADORES ///
router.get('/editar-pc', async (req, res) => {

    const { id } = req.query

    const computador = await computadorController.getById(id);
    const { descricao, nome, empresa } = computador;

    const empresas = await empresaController.getAll();

    return res.render('pages/editar-pc', { descricao, nome, id, empresas, empresa });
})

router.post('/editar-pc', async (req, res) => {

    const { id } = req.query
    const { nome, descricao } = req.body;

    console.log("id rota editar" + id)
    const computador = await computadorController.update({ id, nome, descricao });

    return res.redirect(`/ver-pc?id=${id}`);
})

router.get('/computadores-by-empresa', async (req, res) => {

    const { empresaId } = req.query

    console.log("log rotas " + empresaId)

    if (!empresaId) {
        const allComputadoresList = await computadorController.getAll()
        return res.json(allComputadoresList)
    }

    const computadoresList = await computadorController.getByEmpresa(empresaId);

    res.json(computadoresList);

})

router.get('/computadores', async (req, res) => {
    const computadoresList = await computadorController.getAll();
    const empresasList = await empresaController.getAll();

    res.render('pages/computadores', { computadores: computadoresList, empresas: empresasList });
})

router.get('/register-pc', async (req, res) => {
    const empresasList = await empresaController.getAll();

    res.render('pages/register_computer', { empresas: empresasList });
})

router.post('/register-pc', async (req, res) => {
    const { nome, descricao, empresaId } = req.body;
    try {
        const pc = await computadorController.create(nome, descricao, empresaId);
        res.redirect("/computadores");
    } catch (error) {
        console.error("Erro ao registrar pc:", error);
        res.status(500).send("Erro ao registrar pc");
    }

})

router.get('/ver-pc', async (req, res) => {
    try {
        const { id } = req.query
        const pc = await computadorController.getById(id);

        return res.render('pages/computador', { computador: pc })
    } catch (error) {
        console.error("Erro ao procurar pc:", error);
        res.status(500).send("Erro ao procurar pc" + error);
    }
})

//MANUTENCOES
router.get('/manutencoes-by-empresa', async (req, res) => {

    const { empresaId } = req.query
    const manutencoesList = await manutencaoController.findByEmpresa(empresaId);

    return res.json(manutencoesList)
})

router.get('/manutencoes-by-computador', async (req, res) => {

    const { id } = req.query //////CHAAANGE
    const manutencoesList = await manutencaoController.findByComputador(id);

    return res.json(manutencoesList)

})


router.get('/manutencoes', async (req, res) => {
    const manutencaoList = await manutencaoController.findAll()
    const empresasList = await empresaController.getAll();

    return res.render('pages/manutencoes', { empresas: empresasList, manutencoes: manutencaoList })
})

router.get('/manutencoes-open', async (req, res) => {
    const manutencaoList = await manutencaoController.findOpened()

    return res.json(manutencaoList)
})


router.get('/register-manutencao', async (req, res) => {
    const computadoresList = await computadorController.getAll();

    return res.render('pages/register_manutencao')

})

router.post('/register-manutencao', async (req, res) => {
    const { descricao, computador } = req.body;

    try {
        const manutencao = await manutencaoController.create(descricao, computador);
        return res.redirect(`/ver-manutencao?id=${manutencao.id}`)

    } catch (error) {
        console.error("Erro ao registrar manutencao:", error);
        res.status(500).send("Erro ao registrar manutencao" + error.message);
    }

})

router.get('/ver-manutencao', async (req, res) => {
    const { id } = req.query

    const manutencao = await manutencaoController.findById(id)
    const manutencoes = await manutencaoController.getItemManutencao(id)


    console.log(manutencao, manutencoes)

    res.render('pages/manutencao', { manutencao: manutencao, manutencoes: manutencoes })

})

router.post('/add-item-manutencao', async (req, res) => {
    const { manutencaoId, descricao } = req.body

    const itemManutencao = await manutencaoController.addItemManutencao(manutencaoId, descricao)

    return res.redirect(`/ver-manutencao?id=${manutencaoId}`)
})

router.get('/get-itens-manutencao', async (req, res) => {
    const { id } = req.query

    const manutencaoItensList = await manutencaoController.getItemManutencao(id)

    return manutencaoItensList
})

router.get('/encerrar-manutencao', async (req, res) => {
    const { id } = req.query

    manutencaoController.encerrarManutencao(id)

    // Redirecionar o usuário de volta para a página anterior
    const referer = req.headers.referer || '/';
    return res.redirect(referer);

})


//TRANSFERENCIAS
router.get("/transferir", async (req, res) => {

})

router.post('/transferir', async (req, res) => {

    console.log(req.body);

    const { computador, emp_origem, emp_destino, observacao } = req.body;

    try {
        const transferencia = await transferenciaController.create(computador, emp_origem, emp_destino, observacao);
        return res.redirect(`/ver-pc?id=${computador}`)
    }
    catch (error) {
        console.error("Erro ao registrar transferencia:", error);
        res.status(500).send("Erro ao registrar transferencia" + error.message);
    }

})

module.exports = router;