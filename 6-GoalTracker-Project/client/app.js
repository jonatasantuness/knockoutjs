function getGoals() {
  $.get('http://localhost:3000/goals', function (data) {
    viewModel.goals(data);
  });
}

function viewModel() {
  var self = this;

  self.goals = ko.observableArray();
  self.goalInputName = ko.observable();
  self.goalInputType = ko.observable();
  self.goalInputDeadline = ko.observable();
  self.selectedGoals = ko.observableArray();
  self.isUpdate = ko.observable(false);
  self.updateId = ko.observable();

  self.canEdit = ko.computed(function () {
    return self.selectedGoals().length > 0;
  });

  self.cleanInputs = function () {
    self.goalInputName('');
    self.goalInputType('');
    self.goalInputDeadline('');
  }

  self.addGoal = function () {
    var name = $('#name').val();
    var type = $('#type').val();
    var deadline = $('#deadline').val();

    self.goals.push({
      name: name,
      type: type,
      deadline: deadline
    });

    $.ajax({
      url: 'http://localhost:3000/goals',
      data: JSON.stringify({
        "name": name,
        "type": type,
        "deadline": deadline
      }),
      type: 'POST',
      contentType: 'application/json',
      success: function (data) {
        console.log('Objetivo Adicionado!\n', data);
        self.cleanInputs();
      },
      error: function (xhr, status, err) {
        console.warn('addGoal error\n', err);
      }
    });
  }

  self.updateGoal = function () {
    var id = self.updateId;

    if (id) {
      var name = $('#name').val();
      var type = $('#type').val();
      var deadline = $('#deadline').val();

      self.goals.remove(function (item) {
        return item['_id'] == id;
      });

      self.goals.push({
        name: name,
        type: type,
        deadline: deadline
      });

      $.ajax({
        url: 'http://localhost:3000/goals/' + id,
        data: JSON.stringify({
          "name": name,
          "type": type,
          "deadline": deadline
        }),
        type: 'PUT',
        contentType: 'application/json',
        success: function (data) {
          console.log('Objetivo Atualizado!\n', data);
          self.isUpdate(false);
          self.cleanInputs();
        },
        error: function (xhr, status, err) {
          console.warn('updateGoal error\n', err);
        }
      });
    }
  }

  self.editSelected = function () {
    self.updateId = self.selectedGoals()[0]['_id'];

    var name = self.selectedGoals()[0].name;
    var type = self.selectedGoals()[0].type;
    var deadline = self.selectedGoals()[0].deadline;

    self.isUpdate(true);

    self.goalInputName(name);
    self.goalInputType(type);
    self.goalInputDeadline(deadline);
  }

  self.deleteSelected = function () {
    $.each(self.selectedGoals(), function (index, value) {
      var id = self.selectedGoals()[index]['_id'];

      if (id) {
        $.ajax({
          url: 'http://localhost:3000/goals/' + id,
          type: 'DELETE',
          async: true,
          timeout: 300000,
          success: function (data) {
            console.log('Objetivo Deletado!\n', data);
          },
          error: function (xhr, status, err) {
            console.warn('deleteSelected error\n', err);
          }
        });
      }
    });

    self.goals.removeAll(self.selectedGoals());
    self.selectedGoals.removeAll();
  }

  self.types = ko.observableArray([
    'Fitness',
    'Profissional',
    'Relacionamento',
    'Finanças',
    'Auto Ajuda'
  ]);
}

var viewModel = new viewModel();

ko.applyBindings(viewModel);
