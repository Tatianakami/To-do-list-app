// Selecionar elementos do DOM
const form = document.querySelector('#todo-form');
const taskTitleInput = document.querySelector('#task-title-input');
const todoListUl = document.querySelector('#todo-list');

let tasks = [];

// Carregar tarefas do localStorage ao iniciar
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

// Adicionar evento de submit no formulário
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o recarregamento da página

    const taskTitle = taskTitleInput.value.trim();

    // Validação da tarefa
    if (taskTitle.length < 3) {
        alert('Sua tarefa precisa ter, pelo menos, 3 caracteres.');
        return;
    }

    // Criar a nova tarefa no array de tarefas
    const task = {
        title: taskTitle,
        done: false,
    };
    tasks.push(task);
    
    // Salvar no localStorage
    saveTasksToLocalStorage();

    // Adicionar a tarefa ao DOM
    const taskElement = createTaskElement(task);
    todoListUl.appendChild(taskElement);

    // Limpar o campo de entrada
    taskTitleInput.value = '';
});

// Criar elemento de tarefa
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'task-item';

    // Checkbox para marcar como concluído
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.className = 'task-checkbox';
    input.checked = task.done;
    input.addEventListener('change', () => {
        task.done = input.checked; // Atualiza o status da tarefa no array
        li.classList.toggle('completed', task.done);
        saveTasksToLocalStorage(); // Atualizar o localStorage
    });

    // Texto da tarefa
    const span = document.createElement('span');
    span.textContent = task.title;
    span.className = 'task-title';

    // Botão de remoção
    const button = document.createElement('button');
    button.innerHTML = '❌';
    button.className = 'remove-btn';
    button.addEventListener('click', () => {
        // Remover o item do DOM
        li.style.opacity = '0'; // Animação de fade-out
        setTimeout(() => {
            li.remove();
        }, 300);

        // Remover do array de tarefas
        tasks = tasks.filter(t => t.title !== task.title);
        saveTasksToLocalStorage(); // Atualizar o localStorage
    });

    // Montar o item de lista
    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);

    return li;
}

// Salvar tarefas no localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Carregar tarefas do localStorage
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(task => {
            const taskElement = createTaskElement(task);
            todoListUl.appendChild(taskElement);
        });
    }
}
