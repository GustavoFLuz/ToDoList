const form = document.getElementById('inputForm')
form.addEventListener('submit', e=>{
    e.preventDefault();
})

class Task{
    constructor(name, description, priority){
        this.name = name;
        this.description = description;
        this.priority = priority;
    }
}

function allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = 0, key;
    for (; key = keys[i]; i++) {
        values.push(key);
    }
    return values;
}

function printTask(taskObject){

    const list = document.getElementById('taskList');
    const listItem = document.createElement('li');


    const taskName = document.createElement('div');
    taskName.classList.add('task-name');
    taskName.appendChild(document.createTextNode(taskObject.name));
    listItem.appendChild(taskName);

    if(taskObject.description != ''){
        const taskDescription = document.createElement('span');
        taskDescription.classList.add('tooltip');
        taskDescription.appendChild(document.createTextNode(taskObject.description));
        listItem.appendChild(taskDescription);
    }
    
    const priority = document.createElement('div');
    priority.classList.add('priority');
    priority.style.backgroundColor = taskObject.priority;
    listItem.appendChild(priority);

    const button = document.createElement('button');
    button.classList.add('task-completed');
    button.setAttribute('id', taskObject.name);
    button.setAttribute('onclick', 'deleteTask(this)');
    listItem.appendChild(button);

    list.appendChild(listItem);
}

function submitTask(){
    const name = document.getElementsByClassName('input-text')[0].value;
    const priority =  document.getElementsByClassName('input-priority')[0].value;
    const description = document.getElementsByClassName('input-description')[0].value;
    var task = new Task(name, description, priority);
    
    window.localStorage.setItem(task.name, JSON.stringify(task));
    printTask(task);

    document.getElementsByClassName('input-text')[0].value = '';
    document.getElementsByClassName('input-priority')[0].selectedIndex = 0;
    document.getElementsByClassName('input-description')[0].value = '';
}

function getTasks(){
    const storage = allStorage();
    for (n in storage){
        const tasks = JSON.parse(window.localStorage.getItem(storage[n]));
        printTask(tasks);
    }
}

function deleteTask(button){
    const taskList = button.parentNode.parentNode;
    const listItem = button.parentNode;
    taskList.removeChild(listItem);
    window.localStorage.removeItem(button.id)
}

window.addEventListener('load', e=>{
    getTasks();
})
