{
  let app = {
    el: undefined,
    tasks: [
      { description: "Centralizar link Sobre", done: true },
      { description: "Diminuir título", done: true },
      { description: "Rever cores dos links", done: true },
      { description: "Diminuir texto Sobre", done: true },
      { description: "Melhorar texto da introdução", done: false },
      { description: "Afinar linguagem do início", done: false },
      { description: "Testar opções durante o jogo", done: false },
      { description: "Inserir pequenas conquistas", done: false },
      { description: "Adicionar opção de regressão", done: false },
      { description: "Melhorar a recompensa final", done: false }
    ]
  }

  function init() {
    app.el = document.getElementById('task-list');

    let input = document.getElementById('new-task');
    input.onchange = function() {
      update({ action:"add", value: input.value });
    }

    render();
  }

  function update(changes) {
    if (changes.action === "add") {
      app.tasks.unshift({
        description: changes.value,
        done: false
      });
    }
    else if (changes.action === "check") {
      app.tasks[changes.index].done = changes.value;
    }
    else if (changes.action === "delete") {
      app.tasks.splice(changes.index, 1);
    }

    render();
  }

  function render() {
    app.el.innerHTML = "";
    for (let i = 0; i < app.tasks.length; i++) {
      let task_data = app.tasks[i];
      let task = document.createElement('div');
      task.className = "task";

      let check = document.createElement('input');
      check.setAttribute('type', 'checkbox');
      check.onchange = function() {
        update({
          action: "check",
          index: i,
          value: check.checked
        });
      }
      task.appendChild(check);

      let btn = document.createElement('button');
      btn.className = "del";
      btn.innerText = "x";
      btn.onclick = function() {
        update({
          action: "delete",
          index: i
        });
      }
      task.appendChild(btn);

      let txt = document.createElement('p');
      txt.innerText = task_data.description;
      task.appendChild(txt);

       if (task_data.done) {
        check.setAttribute('checked', 'true');
        task.classList.add('done');
      }

      app.el.appendChild(task);
    }
  }

  init();
}
