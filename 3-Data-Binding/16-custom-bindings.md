# Custom Bindings

## Registrando Bindings

Para criar uma custom binding é necesário registrá-la, essa é sintaxe:

```javascript
ko.bindingHandlers.yourBindingName = {
  init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
    // Isso será chamado quando o binding for aplicado pela primeira vez a um elemento
    // Configure qualquer state inicial, event handlers, etc. aqui
  },
  update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
    /* Isso será chamado quando o binding for aplicado pela primeira vez a um elemento e novamente sempre que quaisquer observables/computeds acessados forem alterados */
    // Atualize o elemento DOM com base nos valores fornecidos aqui.
  }
};
```

```html
<div data-bind="someBinding: someValue"></div>
```

## O Callback 'Update'

- Element: o elemento DOM envolvido no binding.
- valueAccessor: Função JavaScript para obter a propriedade atual do modelo envolvido no binding.
- allBindings: Um objeto JavaScript que você pode usar para acessar todos os valores de modelo vinculados a este elemento DOM.
- viewModel: - deprecated no Knockout 3.x. Use bindingContext.$data ou bindingContext.$rawData para acessar o viewModel.
- bindingContext: Um objeto que mantém o contexto de binding disponível para os bindings deste elemento. Este objeto inclui propriedades especiais, incluindo $parent, $parents, e $root, que podem ser usadas para acessar dados vinculados aos ancestrais desse contexto.

## Exemplo de Update

Por exemplo, você pode estar controlando a visibilidade de um elemento usando o visible binding, mas agora deseja dar um passo adiante e animar essa transição. Você deseja que os elementos deslizem para dentro e para fora da existência de acordo com o valor de um observable. Você pode fazer isso escrevendo uma custom binding que chama as funções slideUp/slideDown do jQuery:

```javascript
ko.bindingHandlers.slideVisible = {
  update: function(element, valueAccessor, allBindings) {
    // Primeiro, obtenha os dados mais recentes aos quais estamos vinculados
    var value = valueAccessor();

    /* Em seguida, independente se a propriedade do modelo fornecida é ou não um observable,
    obtenha seu valor atual */
    var valueUnwrapped = ko.unwrap(value);

    /* Pegue mais alguns dados de outra propriedade de binding,
    400ms será o duração padrão, a menos que seja especificado outro valor */
    var duration = allBindings.get('slideDuration') || 400;

    // Agora manipule o elemento DOM
    if (valueUnwrapped == true)
      $(element).slideDown(duration); // Tornar o elemento visível
    else
      $(element).slideUp(duration); // Tornar o elemento invisível
  }
};
```

```html
<div data-bind="slideVisible: giftWrap, slideDuration: 600">
  You have selected the option
</div>

<label>
  <input type="checkbox" data-bind="checked: giftWrap" />
  Gift wrap
</label>
```

```javascript
var viewModel = {
  giftWrap: ko.observable(true)
};

ko.applyBindings(viewModel);
```

## O callback 'Init'

O Knockout chamará sua função init uma vez para cada elemento DOM em que você usa o binding. Existem dois usos principais para o init:

- Para definir qualquer estado inicial para o elemento DOM,
- Para registrar qualquer manipulador de eventos para que, por exemplo, quando o usuário clicar ou modificar o elemento DOM, você possa alterar o estado do observable associado.

O KO passará exatamente o mesmo conjunto de parâmetros que ele passa para o callback do update.

Continuando o exemplo anterior, é conveniente que slideVisible defina o elemento para ficar instantaneamente visível ou invisível quando a página aparecer pela primeira vez (sem nenhum slide animado), para que a animação seja executada apenas quando o usuário alterar o estado do modelo. Você pode fazer isso da seguinte maneira:

```javascript
ko.bindingHandlers.slideVisible = {
  init: function(element, valueAccessor) {
    // Obtenha o valor atual da propriedade atual à qual estamos vinculados
    var value = ko.unwrap(valueAccessor());

    // O jQuery irá ocultar/mostrar o elemento, dependendo do "valor" ou verdadeiro ou falso
    $(element).toggle(value);
  },
  update: function(element, valueAccessor, allBindings) {
    // ...conforme exemplo anterior
  }
};
```

## Wrapper Bindings

Usado para adicionar uma funcionalidade à um binding já existente, exemplo:

```javascript
ko.bindingHandlers.text.update(element, valueAccessor);
```
