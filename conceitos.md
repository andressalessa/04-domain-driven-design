# Conceitos

## Exemplo: Aggregate

- Order -> OrderItem[]
- Order -> Shipping

**Aggregate** -> conjunto de entidades em um domínio que são manipuladas ao mesmo tempo e juntas elas
compõe algo maior que é o agregado.


## Exemplo: WatchedList (pattern) (com aggregate)
- Question -> Attachment[]

### Criação
Ao criar uma Pergunta, eu devo incluir os Anexos. Para incluir é simples, basta incluir a pergunta e 
vincular os anexos a ela.
- Título
- Conteúdo
- Anexos (3)

### Edição
Alterar os dados da pergunta é fácil:
- Título
- Conteúdo

Mas alterar os dados do anexo, já fica mais complexo:
- Adicionar um novo anexo (create)
- Remover o segundo anexo que tinha sido criado previamente (delete)
- Editar um anexo existente

Não seria correto eu apagar todos os anexos incluídos no create, para depois reincluí-los do jeito 
que vieram na alteração.
Isso seria ruim para performance, custoso pro banco de dados.

O correto seria:
- identificar os anexos que foram incluídos
- identificar os anexos que foram excluídos
- identificar os anexos que foram editados/atualizados

Para isso serve o pattern WatchedList. 
É uma lista que irá guardar além das informações padrão da entidade, as informações para identificar o estado
e a ação a ser executada para o item.


## Subdomínios (pequenas partes do negócio)
Divididos em:

- Core: tudo o que envolve dinheiro
- Supporting: tudo o que dá suporte para o core funcionar
- Generic: necessários mas não são tão essenciais/primordiais

### Exemplos
#### Em um e-commerce
O que seriam Core subdomínios?
- Compra
- Catálogo
- Pagamento
- Entrega

O que seriam Supporting subdomínios?
- Estoque

O que seriam Generic subdomínios?
- Notificação ao cliente
- Promoções
- Chat de atendimento
