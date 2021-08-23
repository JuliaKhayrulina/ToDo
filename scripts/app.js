'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

render();

function render() {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  let data = JSON.parse(localStorage.getItem('todo'));

  if (data) {
    todoData = data;
    todoData.forEach((item) => {
      const li = document.createElement('li');
      li.classList.add('todo-item');

      li.innerHTML = `
      <span class="text-todo">${item.value}</span>
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
      `;

      if (item.completed) {
        todoCompleted.append(li);
      } else {
        todoList.append(li);
      }

      const btnTodoComplete = li.querySelector('.todo-complete');
      btnTodoComplete.addEventListener('click', function () {
        item.completed = !item.completed;
        localStorage.setItem('todo', JSON.stringify(todoData));
        render();
      });

      const btnTodoRemove = li.querySelector('.todo-remove');
      btnTodoRemove.addEventListener('click', function () {
        todoData = todoData.filter((items) => items !== item);
        localStorage.setItem('todo', JSON.stringify(todoData));
        render();
      });
    });
  }
}

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();
  headerInput.value = headerInput.value.trim();
  console.log(todoData);
  if (headerInput.value) {
    todoData.push({
      value: headerInput.value,
      completed: false,
    });
    localStorage.setItem('todo', JSON.stringify(todoData));
    headerInput.value = '';
    render();
  }
});
