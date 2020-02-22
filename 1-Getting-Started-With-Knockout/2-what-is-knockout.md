## O que é o KnockoutJS?

O KnockoutJS é uma biblioteca que simplifica a construção de interfaces dinâmicas com Javascript através da utilização do padrão MVVM.

- Atualiza automaticamente os elementos da UI sempre que ocorre alguma alteração no modelo de dados.
- Implementação de data bindings para facilitar a reutilização.
- Javascript puro, funciona em qualquer navegador (IE 6+, Firefox 2+, Chrome, Safari, Edge, outros).
- Pode ser adicionado sobre sua aplicação Web existente sem a necessidade de grandes mudanças de arquitetura.

## O que é MVVM?

É um padrão de projeto (design pattern) criado por John Gossman. O padrão de projeto Model-View-ViewModel (MVVM) foi originalmente criado para aplicativos Windows Presentation Foundation (WPF) usando XAML para separar a interface do usuário (UI) da lógica de negócios e aproveitando ao máximo o data binding (a vinculação de dados).

## Porque não Jquery?

O KnockoutJS permite uma fácil sincronização entre o modelo de dados e a UI através de two way data bindings.

## Porque não Angular?

O Angular é classificado como um framework completo, enquanto o KnockoutJS é uma biblioteca com foco em data bindings.


## Conceitos Fundamentais
- Declarative Bindings: É basicamente o link entre os dados e a UI;
- Dependency Tracking: É o conceito de manter tudo no seu devido lugar, quando o modelo de dados é atualizado, todas as partes conectadas também são alteradas;
- Templating: Possui sua própria template engine, você pode usar outras templates engines como underscore, handlebars ou basicamente qualquer template engine baseada em JavaScript.

## Sintaxe Básica (exemplo)

```html
<script src='https://cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-debug.js'></script>

<p>Meu nome é <span data-bind='text: name'></span></p>


function viewModel() {
  this.name = ko.observable('Jonatas');
}

ko.applyBindings(new viewModel());
```
