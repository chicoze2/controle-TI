# TODO LIST - APP CONTROLE DE TI

## CURRENT TASKS

- [x] add itens de manutenção na tela de infos da manut.
- [x] listagem de manutencoes - ao filtrar por empresa está creasheando o sistema. -> foi removida essa funcionalidade devido a nao fazer sentido com o modelo de db que temos no sistema

- [x] tela home listagem de manutencoes abertas (na vddd esta listando todas {n + 3 task})
    -  add regra de neogcio para manutencoes sem data da finalizacao (botao novo modal)
    - rever rota de encerrar manut
    - add data saida // status nessa tabela (verificar a possibilidade de criar um public/script para loadar essas infos)
- [] criar tela e rota editar-pc (vincular ao botao na pagina de pcs)
- [] começar a pensar sobre as listagens -> tornar o sistema dinâmico
- [] add mostrar manutencao encerrada na tela de manutencao e status na tela de listagem de manutencoes 

# ajustes tecnicos (gambiarras) - improvement to future


- rota de encerrar manutencao está GET, o ideal seria PUT (creio eu)