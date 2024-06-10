import axios from 'axios';

const routes = {
  tasksPath: () => '/api/tasks',
};

// BEGIN
const renderTasks = (tasks) => {
  const tasksList = document.getElementById('tasks');
  tasksList.innerHTML = ''; // Clear the list before rendering
  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('list-group-item');
    taskItem.textContent = task.name;
    tasksList.appendChild(taskItem);
  });
};

const run = async () => {
  // Fetch initial tasks
  try {
    const response = await axios.get(routes.tasksPath());
    const tasks = response.data.items;
    renderTasks(tasks);
  } catch (error) {
    console.error('Failed to fetch tasks', error);
  }

  const form = document.querySelector('form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const input = form.elements.name;
    const taskName = input.value.trim();

    if (taskName === '') {
      return;
    }

    try {
      const response = await axios.post(routes.tasksPath(), { name: taskName });
      if (response.status === 201) {
        const newTask = { name: taskName };
        const tasksList = document.getElementById('tasks');
        const taskItem = document.createElement('li');
        taskItem.classList.add('list-group-item');
        taskItem.textContent = newTask.name;
        tasksList.insertBefore(taskItem, tasksList.firstChild);
        input.value = '';
        input.focus();
      }
    } catch (error) {
      console.error('Failed to add task', error);
    }
  });
};

export default run;
// END
