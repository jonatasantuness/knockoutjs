# O que são Componentes?

Os Componentes ajudam organizar o código de sua UI de maneira modular e reutilizável.

- São benéficos em grandes aplicações.
- Desenvolvimento simplificado.
- Melhora o desempenho do tempo de execução.


## Vantagens dos Components

- Representam controles individuais, widgets ou uma seção inteira.
- Possuem seu próprio view e view model.
- São carregados de maneira assíncrona.
- Recebem parâmetros.
- Aninhamento e herança
- Fácilmente emcapsulados.

## Registrando um componente

O nome do componente pode ser qualquer sequência não vazia. É recomendável, mas não obrigatório, o uso de sequências separadas por traços em minúsculas (como nome-do-seu-componente) para que o nome do componente seja válido para ser usado como um elemento personalizado (como <nome-do-seu-componente>).

- O viewModel é opcional,
- Template é obrigatório.

```javascript
ko.components.register('some-component-name', {
  viewModel: ...,
  template: ...
});
```

## Exemplo: Um widget de like/dislike

Para começar, você pode registrar um componente usando ko.components.register (tecnicamente, registrar é opcional, mas é a maneira mais fácil de se começar). Uma definição de componente especifica um viewModel e template. Por exemplo:

```javascript
ko.components.register('like-widget', {
  viewModel: function(params) {
      // Data: o valor pode ser null, 'like' ou 'dislike'
      this.chosenValue = params.value;

      // Comportamento do like
      this.like = function() {
        this.chosenValue('like');
      }.bind(this);

      // Comportamento do dislike
      this.dislike = function() {
        this.chosenValue('dislike');
      }.bind(this);
  },
  template:
    '<div class="like-or-dislike" data-bind="visible: !chosenValue()">\
      <button data-bind="click: like">Like it</button>\
      <button data-bind="click: dislike">Dislike it</button>\
    </div>\
    <div class="result" data-bind="visible: chosenValue">\
      You <strong data-bind="text: chosenValue"></strong> it\
    </div>'
});
```

Normalmente, você carregaria a view model e template a partir de arquivos externos em vez de declara-los inline dessa forma. Chegaremos lá mais tarde.

Agora, para usar esse componente, você pode referencia-lo de qualquer outra view em sua aplicação, ou usando um binding component ou usando um custom element. Aqui um live example que utiliza-o como um custom element:

Código fonte: View

```html
<ul data-bind="foreach: products">
  <li class="product">
    <strong data-bind="text: name"></strong>
    <like-widget params="value: userRating"></like-widget>
  </li>
</ul>
```

Código fonte: View model

```javascript
function Product(name, rating) {
  this.name = name;
  this.userRating = ko.observable(rating || null);
}

function MyViewModel() {
  this.products = [
    new Product('Garlic bread'),
    new Product('Pain au chocolat'),
    new Product('Seagull spaghetti', 'like') // This one was already 'liked'
  ];
}

ko.applyBindings(new MyViewModel());
```

## Especificando um Template

- Elemento ID existente.
- Elemento de instância.
- String Markup.
- Array de node DOM.
- Fragmento de documento.
- módulo AMD.

## Exemplo de especificação de template utilizando um ID

```javascript
ko.components.register('my-component', {
  template: { element: 'my-component-template' },
  viewModel: ...
});

<template id='my-component-template'>
  <h1 data-bind="text: title"></h1>
  <button data-bind="click: doSomething">Click me right now</button>
</template>
```

## Exemplo de especificação de template utilizando uma instância de elemento existente

```javascript
var elemInstance = document.getElementById('my-component-template');

ko.components.register('my-component', {
  template: { element: elemInstance },
  viewModel: ...
});
```

## Exemplo de especificação de template utilizando uma string de markup

```javascript
ko.components.register('my-component', {
  template: '<h1 data-bind="text: title"></h1>\
        <button data-bind="click: doSomething">Click</button>',
  viewModel: ...
});
```

## Exemplo de especificação de template utilizando Array do node DOM

```javascript
var myNodes = [
  document.getElementById('first-node'),
  document.getElementById('second-node'),
  document.getElementById('third-node')
];

ko.components.register('my-component', {
  template: myNodes,
  viewModel: ...
});
```

## Exemplo de especificação de template com módulo AMD (RequireJS)

```javascript
ko.components.register('my-component', {
  template: { require: 'some/template' } ,
  viewModel: ...
});
```

## Chave viewModel

- Pode ser uma função.
- Pode ser passada uma instância para usar o objeto diretamente.
- Pode passar 'createViewModel' para chamar a função que atuará com uma 'fabrica'.

## Exemplo de registro com uso do createViewModel

```javascript
ko.components.register('my-component', {
  template: ... ,
  viewModel: {
    createViewModel: function(params, componentInfo) {
      // params: é um objeto onde chave/valor são os parâmetros
      /* componentInfo.element: é o elemento no qual o componente está sendo injetado. Quando createViewModel é chamado, o template já foi injetado nesse elemento, mas ainda não está vinculado. */
      // componentInfo.templateNodes: é um array que contém os nodes DOM que foram fornecidos ao componente.

      // Retornar a instância do view model
      return new MyViewModel(params);
    }
  }
});
```

## Carregamento Síncrono/Assíncrono

- Podes er setado no registro (synchronous: false).
- o padrão é asynchronous.
- As vezes não tem escolha.

## Criando Componentes

- Custom Elements: Forneçe uma maneira conveniente de injetar componentes nas views.
- Component Binding: Injeta um componente específico em um elemento com parâmetros opcionais.

