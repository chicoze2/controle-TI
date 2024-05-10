# TODO LIST - APP CONTROLE DE TI

## CURRENT TASKS

- [x] add itens de manutenção na tela de infos da manut.
- [] listagem de manutencoes - ao filtrar por empresa está creasheando o sistema. 
- [] tela home listagem de manutencoes abertas (na vddd esta listando todas {n +3 task})
    -  add regra de neogcio para manutencoes sem data da finalizacao (botao novo modal)
    - rever rota de encerrar manut
    - add data saida // status nessa tabela (verificar a possibilidade de criar um public/script para loadar essas infos)
- [] criar tela e rota editar-pc (vincular ao botao na pagina de pcs)
    - nessa tela editar-pc, deve-se ser possivel trocar a descrição e transferir o pc para outra empresa
    - analisar como armazenar e cadastrar as transferencias (fazer isso preferencialmente apos arredondadar o sistema)
- [] começar a pensar sobre as listagens -> tornar o sistema dinâmico
- [x] add mostrar manutencao encerrada na tela de manutencao e status na tela de listagem de manutencoes 
- []   botao add manutencao na pagina computador 

# ajustes tecnicos (gambiarras) - improvement to future
- rota de encerrar manutencao está GET, o ideal seria PUT (creio eu)