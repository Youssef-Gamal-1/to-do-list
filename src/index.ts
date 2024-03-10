const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-input");

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener('submit',e => {
  e.preventDefault();

  if(!input?.value) return;

  const newTask: Task = {
    id: "id" + Math.random().toString(16).slice(2),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  tasks.push(newTask);
  addListItem(newTask);

  input.value  = '';
})

function addListItem(task: Task) {
  const item: HTMLLIElement = document.createElement('li');
  const label: HTMLLabelElement = document.createElement('label');
  const checkBox: HTMLInputElement = document.createElement('input');
  checkBox.addEventListener('change',() => {
    task.completed = checkBox.checked;
    saveTasks();
  })
  checkBox.type = 'checkbox';
  checkBox.checked = task.completed;

  label.append(checkBox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks(): void {
  localStorage.setItem('Tasks',JSON.stringify(tasks));
}

function loadTasks(): Task[]{
  const taskJSON = localStorage.getItem('Tasks');
  if(!taskJSON) return [];
  return JSON.parse(taskJSON);
}