# Observable Arrays

## Porque usar Observable Arrays?

- Já sabemos que os observables é usado para detectar mudanças em um objeto, os observables arrays são usados para detectar e responder mudanças em coleções de objetos.

- Um Observable Arrays rastreia quais objetos estão no Array, e não o state desses objetos.

- Rastreia os objetos dentro do Array e notifica quando objetos são adicionados e removidos.

## Criando um Array

```javascript
// inicializa um array vazio

var myArray = ko.observableArray();

// Adiciona um item

myArray.push('Algum valor');
```
