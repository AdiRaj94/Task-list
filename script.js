// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all Event listeners
loadEventListeners();

// Add all event listeners

function loadEventListeners(){
    // DOM Load events
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add an event
    form.addEventListener('submit', addTask);

    // Remove task
    taskList.addEventListener('click', removeTask);

    // Clear task
    clearBtn.addEventListener('click', clearTask);

    // filter tasks
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function (task){
        
    // Create li element
    const li = document.createElement('li');

    // Add a classname
    li.className = 'collection-item';

    // Create textNode and Append to the li
    li.appendChild(document.createTextNode(task));

    // Create a link
    const link = document.createElement('a');

    // Add className
    link.className = 'delete-item secondary-content';

    // Add icon HTML
    link.innerHTML = `<i class="fa fa-remove"></i>`;

    // Append link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

        });
}

// Add task 
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }

    // Create li element
    const li = document.createElement('li');

    // Add a classname
    li.className = 'collection-item';

    // Create textNode and Append to the li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create a link
    const link = document.createElement('a');

    // Add className
    link.className = 'delete-item secondary-content';

    // Add icon HTML
    link.innerHTML = `<i class="fa fa-remove"></i>`;

    // Append link to li
    li.appendChild(link);

    // Append li to ul

    taskList.appendChild(li);

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value)

    // Clear task
    taskInput.value = '';

    e.preventDefault();
}


// Store LS

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
        }

        removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
      
}

// Remove from LS

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Task

function clearTask(){
    // taskList.innerHTML = '';


    // Faster method
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage()
}

// Clear from LS

function clearTasksFromLocalStorage(){
    localStorage.clear();
}


// Filter Tasks

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function (task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }
        }
    )

}