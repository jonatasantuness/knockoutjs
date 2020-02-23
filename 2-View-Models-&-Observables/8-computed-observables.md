# Computed Observables

São funções que dependem de um ou mais observables e atualizam automaticamente quando o sua depêndencia muda, exemplo:

```html
<span data-bind="text: fullName"></span>
```

```javascript
function myViewModel () {
  var self = this;

  self.firstName = ko.observable('Jonatas');
  self.lastName = ko.observable('Antunes');

  // Computed Observable
  self.fullName = ko.computed(function () {
    return self.firstName() + ' ' + self.lastName();
  }, this);
}
```

## Gerenciando o 'this'

O segundo parâmetro para ko.computed define o valor do 'this' ao avaliar a Computed Obeservable. Sem não passá-lo, não seria possível fazer a referência a this.firstName() ou this.lastName(). Os programadores JavaScript experientes considerarão isso óbvio, mas se você ainda estiver conhecendo o JavaScript, pode parecer estranho. (Linguagens como C# e Java nunca esperam que o programador defina um valor para isso, mas o JavaScript sim, porque suas próprias funções não fazem parte de nenhum objeto por padrão.)

## Pure Computed Observables

Se uma Computed Observable funciona apenas em um valor baseado em outro observable, declare como ko.pureComputed, isso permite que o 'knockout' gerencie seu uso de memória e é um pouco mais eficiente.

```javascript
this.fullName = ko.pureComputed(function () {
  return this.firstName() + ' ' + this.lastName()
}, this);
```

## Notificando os Subscribers

As Computed Observables geralmente só notificam os subscribers depois que o valor foi alterado, você pode usar o 'notify extender' para ter certeza que os subscribers SEMPRE serão notificados em uma atualização.

```javascript
myViewModel.fullName = ko.pureComputed(function () {
  return myViewModel.firstName() + ' ' + myViewModel.lastName();
}).extend({ notify: 'always' });
```
## Delaying Notification

Normalmente os subscribers são notificados imediatamente em alguma atualização e na maior parte dos casos isso é bom, mas se o Computed Observable possui muitas dependências talvez você ganhe um aumento na performance atrasando as atualizações e notificações, exemplo:

```javascript
myViewModel.fullName.extend({ rateLimit: 75 });
```

## Determining Computed Observables

Em alguns casos você pode querer checar se um observable é computada, para isso o Knockout oferece a função ko.isComputed().

```javascript
for(var prop in someObject) {
  if(someObject.hasOwnProperty(prop) && !ko.isComputed(someObject[prop])) {
    result[prop] = someObject[prop];
  }
}
```
