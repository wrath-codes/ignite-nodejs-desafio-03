# **Find a Friend API**


## RF's (Requisitos funcionais)

- [ ] Deve ser possível cadastrar um pet;
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [ ] Deve ser possível filtrar pets por suas características
- [ ] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [ ] Deve ser possível realizar login como uma ORG

## RN's (Requisitos de negocio)
- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [ ] Um pet deve estar ligado a uma ORG
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada
- [x] Uma ORG não pode se cadastrar com emails duplicados


## RNF's (Requisitos nao-funcionais)
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] A senha de uma org deve ser criptografada
- [ ] Todas as listagens devem ser paginadas com 20 itens por página


