# Criando View Models e Observables

O KnockoutJS utiliza o design pattern MVVM, esse modelo foi baseado no MVC, que foi criado para manter lógica, UI e Design Views separados.

O MVVM é estruturado em 3 partes:

- Model
- View Model
- View

### Model

O model é camada de dados da aplicação, é independente da UI e existem multiplas maneiras de interagir com ele, uma das maneiras mais comuns, são as requisições AJAX.

### View Model

É a representação de código pura dos dados e das operações na UI, o View Model não é a UI propriamente dita, e sim JavaScript puro, é aonde todos os dados não salvos são mantidos.

### View

É a UI que conseguimos ver, ela exibe as informações do View Model e atualiza quando o estado da pulicação é alterado, então o View é essencialmente o HTML com as declarações de bindings.

## Observables

São usados para detectar e responder alterações em um objeto, isso permite que a UI seja atualizada automaticamente sempre que o modelo ou o view model sejam alterados, o principal objetivo disso é uso do two way data binding. Os Observables podem ser 'assinados', assim, você pode fazer algo acontecer sempre que um estado for alterado ou também detectar automaticamente dependências.

```html
<p>Bem vindo <span data-bind='text: firstName'></span></p>

<script>
  // Criando uma View Model

  /* A variável 'myViewModel' estará conectada com o atributo 'data-bind' do elemento HTML que a esta chamando. */

  var myViewModel = {
    firstName: 'Jonatas',
    lastName: 'Antunes'
  }

  // Criando Observables

  /* Ao colocar o valor como argumento do método 'observable()'' do objeto 'ko', nós tornamos esses valores dinâmicos, e não importa onde eles estão e quantos 'firstName' existem em sua UI, eles serão atualizados. */

  var myViewModel = {
    firstName: ko.observable('Jonatas'),
    lastName: ko.observable('Antunes')
  }

  // GET: obtendo um valor de um observable

  myViewModel.firstName();

  // SET: alterando ou setando um valor no observable

  myViewModel.firstName('Johnny');

  // Inserindo multiplas propriedades

  myViewModel.firstName('Jo').age(27).gender('male');
</script>
```
