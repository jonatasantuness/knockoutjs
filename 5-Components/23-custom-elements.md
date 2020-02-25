# Componentes com Custom Elements

Umas da maneiras mais comuns de se criar um componente no KnockoutJS é através de Custom Elements:

- Syntax conveniente para criação de componentes
- Knockout cuida da compatibilidade entre Browsers (IE6 para o IE8 precisa registrar anes do parsing do HTML)
- Boa maneira de organizar o código
- ```<like-button>, <date-slider>, <login-form>```


## Registrando o componente

Código do View

```html
<h4>Primeira Instância sem parâmetros</h4>

<message-editor></message-editor>

<h4>Segunda Instância com parâmetros</h4>

<message-editor params="initialText: Hellow, World!"></message-editor>
```

Código do View Model


```javascript
ko.components.register('message-editor', {
  viewModel: function(params) {
    this.text = ko.observable(params.initialText || '');
  },
  template: 'Message: <inputd data-bind="value: text" />' +
            '(length: <span data-bind="text: text().length"></span>)'
});

ko.applyBindings();
```

## Passando parâmetros

- Interpretado como um objeto literal JavaScript.
- Você pode passar valores arbitrários de qualquer tipo.


```html
<some-component
  params='valueOne: "hello", valueTwo: 123'>
</some-component>
```

## Passando expressões com observables

```html
<some-component
  params='
  simplesExpression: 1 + 1,
  simplesObservable: myObservable,
  observableExpression: myObservable() + 1
  '>
</some-component>
```
