{
  let app = {
    el: undefined,
    tasks: [
      { description: "Centralizar link Sobre", priority: "Alta", done: true },
      { description: "Diminuir título", priority: "Alta", done: true },
      { description: "Rever cores dos links", priority: "Alta", done: true },
      { description: "Diminuir texto Sobre", priority: "Alta", done: true },
      { description: "Melhorar texto da introdução", priority: "Baixa", done: false },
      { description: "Afinar linguagem do início", priority: "Baixa", done: false },
      { description: "Testar opções durante o jogo", priority: "Baixa", done: false },
      { description: "Inserir pequenas conquistas", priority: "Baixa", done: false },
      { description: "Adicionar opção de regressão", priority: "Baixa", done: false },
      { description: "Melhorar a recompensa final", priority: "Baixa", done: false }
    ]
  }

  function init() {
    app.el = document.getElementById('task-list');

    /*let input = document.getElementById('new-task');
    input.onchange = function() {
      update({ action:"add", value: input.value });
    }*/

    render();
  }

  function submit() {
    let new_task = document.getElementById('new-task');
    let new_priority = document.getElementById('new-priority');
    
    update({ action:"add", value: {task: new_task.value, priority: new_priority.value} });
  }

  function update(changes) {
    if (changes.action === "add") {
      app.tasks.unshift({
        description: changes.value.task,
        priority: changes.value.priority,
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

      let priority_txt = document.createElement('p');
      priority_txt.className = "priority";
      priority_txt.innerText = task_data.priority;
      task.appendChild(priority_txt);

       if (task_data.done) {
        check.setAttribute('checked', 'true');
        task.classList.add('done');
      }

      app.el.appendChild(task);
    }
  }

  init();
}
