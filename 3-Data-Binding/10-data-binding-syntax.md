# Data Binding Syntax

# Porque usar Data Binding?

O sistema de data building do KnockoutJS nos permite ligar dados entre o model e o view de maneira poderosa e eficiente, possui uma coleção de opções que podem ser incluidas no data bind separadas por virgula e possui diversos tipos de declarações de bindings.

## Sintaxe

Nos capítulos anteriores vimos que a sintaxe é muito simples, funciona como uma data attribute do HTML5:

```html
<p>Meu nome é <span data-bind="text: myName"></span></p>
<p>Eu moro em <span data-bind="text: myLocation"></span></p>

<input data-bind="value: someValue, valueUpdate: 'afterkeydown'" />
```
## Valores do Binding

Pode ser um valor, uma variável, literal ou qualquer tipo de expressão JavaScript:

```html
<div data-bind="text: firstName"></div>

<p>
  Esse produto é
  <span data-bind="text: price() > 100 ? 'caro' : 'barato'"></span>
</p>

<button data-bind="enable: parseAreaCode(cellphoneNumber()) != '555">

<div data-bind="with: {
  firstName: 'Jonatas',
  lastName: 'Antunes'
  }">
<div>
```
Podem ter espaços em brancos e tabs:

```html
<select data-bind="
  options: avaiableCountries,
  optionsText: 'countryName',
  value: selectedCountry,
  optionsCaption: 'Choose...'
"></select>
```
## Binding Contexts

- Objetos que possuam dados, podem ser facilmente referenciados pelo seu binding, o KnockoutJS cria e gerencia uma hierarquia de contexto.
- O parâmetro viewModel é o nível raiz.
- Cada controle de fluxo do binding cria um novo contexto de binding filho que referência o modelo de dados aninhado.

## $parent

- Contexto imediato fora do contexto atual.
- No contexto raiz, ele é undefined pois a raiz não tem pai.
- $parents - Array de todos os pais do view model.
- $parents[0] - Não tem contexto (é igual à $parent).
- $parents[1] - Contexto avô.
- $parents[2] = Contexto Bisavô.

## $root

- É o principal objeto do view model no contexto raiz.
- É o contexto pai mais alto.
- Normalmente é o objeto passado para o ko.applyBindings.
- Equivalente à $parents[$parents.length - 1].

## Components

- Se você estiver em um contexto de componente, ele se refere ao component view model.
- Um componente especifíco é equivalente à $root.
- Se aninhado então refere-se ao mais próximo componente.

## $data

- Objeto view model no contexto atual.
- No contexto $root, $data e $root são a mesma coisa.
- Útil para referenciar o próprio view model.

## $index

- Só esta disponível dentro de foreach bindings.
- Index baseado em 0 do Array atual de entrada.
- Observável e atualizado.

## $parentContext

- O objeto de contexto do binding no nível do pai.
- Diferente de $parent.
- Pode ser usado para acessar um valor de index de um item de um foreach externo.


## Outros

- $rawData: Valor cru do view model no atual contexto, normalmente é igual ao $data.
- $componentTemplateNodes: Dentro do contexto de um template de um componente específico, um Array que possui qualquer node DOM que é passado para o componente.
- $context: Objeto de contexto atual do binding.
- $element: O elemento DOM do binding atual.
