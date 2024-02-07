document.addEventListener('DOMContentLoaded', function () {
    var todoForm = document.getElementById('todoForm');

    todoForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var formData = new FormData(todoForm);

        var action = formData.get('id') ? 'update_todo' : 'add_todo';
        formData.append('action', action);

        fetch('handle_todo_1.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); 

            if (data.success) {
                alert(data.message);
                window.location.href = 'todo_list_1.html';
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

