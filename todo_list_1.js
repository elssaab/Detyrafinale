document.addEventListener('DOMContentLoaded', function () {
  
    fetchTodoData();
});

function fetchTodoData() {
  
    fetch('get_todos_1.php') 
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            updateTodoList(data);
        })
        .catch(error => {
            console.error('Error fetching To-Do data:', error);
        });
}

function updateTodoList(todoData) {

    var todoListElement = document.getElementById('todoList');

    todoListElement.innerHTML = '';

    if (todoData.length > 0) {
        todoData.forEach(todo => {
            var todoItem = document.createElement('li');
            todoItem.innerHTML = `
                
                <span>${todo.title}</span>
                <button onclick="editTodoForm(${todo.id}, '${todo.title}', '${todo.description}')">Edit</button>
                <button onclick="deleteTodo(${todo.id})">Delete</button>
            `;
            todoListElement.appendChild(todoItem);
        });
    } else {
      
        todoListElement.innerHTML = 'No To-Do items found';
    }
}

function updateTodoStatus(todoId) {

    fetch('handle_todo_1.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `action=update_todo&id=${todoId}`
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        fetchTodoData(); 
    })
    .catch(error => {
        console.error('Error updating To-Do status:', error);
    });
}

function editTodoForm(todoId, title, description, completed) {

    var form = document.createElement('form');
    form.innerHTML = `
        <label for="editTitle">Title:</label>
        <input type="text" id="editTitle" name="editTitle" value="${title}" required>

        <label for="editDescription">Description:</label>
        <textarea id="editDescription" name="editDescription" required>${description}</textarea>

        <label for="editCompleted">Completed:</label>
        <input type="checkbox" id="editCompleted" name="editCompleted" ${completed ? 'checked' : ''}>

        <button type="button" onclick="updateTodo(${todoId})">Update</button>
    `;

    form.style.border = '1px solid #ccc';
    form.style.padding = '10px';
    form.style.marginTop = '10px';

    form.querySelectorAll('label').forEach(label => {
        label.style.display = 'block';
        label.style.marginBottom = '5px';
    });

    form.querySelectorAll('input, textarea').forEach(input => {
        input.style.width = '100%';
        input.style.padding = '8px';
        input.style.marginBottom = '10px';
        input.style.boxSizing = 'border-box';
    });

    var checkbox = form.querySelector('#editCompleted');
    checkbox.style.width = 'auto';

    var todoListElement = document.getElementById('todoList');
    todoListElement.innerHTML = '';
    todoListElement.appendChild(form);
}

function updateTodo(todoId) {
    var updatedTitle = document.getElementById('editTitle').value;
    var updatedDescription = document.getElementById('editDescription').value;
    var updatedCompleted = document.getElementById('editCompleted').checked ? 1 : 0;

    fetch('handle_todo_1.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `action=update_todo&id=${todoId}&title=${updatedTitle}&description=${updatedDescription}&completed=${updatedCompleted}`
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        fetchTodoData(); 
    })
    .catch(error => {
        console.error('Error updating To-Do:', error);
    });
}

function deleteTodo(todoId) {
  
    fetch('handle_todo_1.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `action=delete_todo&id=${todoId}`
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        fetchTodoData(); 
    })
    .catch(error => {
        console.error('Error deleting To-Do:', error);
    });
}
