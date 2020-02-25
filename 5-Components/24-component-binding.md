# Componentes com Custom Elements

# Component Binding

Outra maneira de criar componentes é atraves de Component Bindings, este método injeta um componente específico em um elemento e pode opcionalmente passar parâmetros para ele. Funciona de maneira similar aos custom elements e na maioria dos casos faz a mesma coisa.

## Shorthand API

```html
<div data-bind="component: 'my-component'"></div>
```

como oservable:

```javascript
someObservable = ko.observable('my-component');
```

```html
<div data-bind="component: 'someObservable'"></div>
```

## Full API

Onde 'name' é o nome do componente e 'params' é o objeto passado para o componente, normalmente um objeto chave-valor contendo múltiplos parâmetros e geralmente recebido pelo construtor do viewmodel do componente.

```html
<div data-bind="component: {
  name: 'my-component',
  params: {
    valueOne: 'something',
    valueTwo: 123
  }
}"></div>
```

## Component Lifecycle

1. Components Loaders fornecem o vm e o template;
2. O template é clonado e injetado;
3. O VM é instanciado;
4. O VM é vinculado à view;
5. O componente é ativado;
6. O componente é derrubado e o viewmodel é descartado.

### 1 - Components Loaders fornecem o vm e o template

- Múltiplos loaders de componentes podem ser consultados.
- O processo ocorre uma vez para cada tipo de componente.
- Fornece vm/template com base no que está registrado.
- Processo Assíscrono.

### 2 - O template é clonado e injetado

- O template é clonado e injetado no container do elemento.
- Qualquer conteúdo existente é removido e descartado.

### 3 - O VM é instanciado

- Se houver um view model - eles não são necessários.
- Se for passado um construtor, o 'Knockout' chama 'new viewModelName(params)'.
- 'createViewModel' é chamado se fornecido.
- É sempre assíncrono.

### 4 - O VM é vinculado à view

Se não houver view model, a view será vinculada a quaisquer parâmetros fornecidos ao component binding.

### 5 - O componente é ativado

- O componente está em operação e pode estar na tela enquanto for necessário.
- Se qualquer parâmetro for um observable, o componente poderá observar alterações ou gravar valores modificados.
- Comunica-se de maneira limpa com os pais.

### 6 - O componente é derrubado e o viewmodel é descartado

- O valor de 'name' muda notavelmente.
- A função 'Dispose' no view model é chamada.
- Se o usuário navega para novos navegadores de página, faz automaticamente.
- Memória dos objetos é apagada.

## Template-Only Components

O objeto ao qual a view está vinculada é o objeto 'params' passado para component binding.

```javascript
ko.components.register('special-offer', {
  template: '<div class="offer-box" data-bind="text: productName"></div>'
});
```

```html
<div data-bind="component: {
  name: 'special-offer-callout',
  params: { productName: someProduct.name }
}"></div>
```

## Containerless Components

As vezes você pode não querer um container para o componente, neste caso usamos a sintaxe:

```html
<!-- ko component: "message-editor" -->
<!-- /ko -->
```

passando parâmetros:

```html
<!-- ko component: {
  name: "message-editor",
  params: {
    initialText: "Hello, World!",
    otherParam: 123
  }
} -->
<!-- /ko -->
```

## Passando Markup


```html
<div data-bind="component: {
  name: 'my-specil-list',
  params: {
    items: someArrayOfPeople
  }
}">
  The Person <em data-bind="text: name"></em>
  is <em data-bind="text: age"></em> years old.
</div>
```

