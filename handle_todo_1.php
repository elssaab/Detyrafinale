<?php
include 'config_1.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   
    if (isset($_POST['action']) && $_POST['action'] === 'add_todo') {
        $title = $_POST['title'];
        $description = $_POST['description'];

        $sql = "INSERT INTO todos (title, description, completed, created_at) VALUES ('$title', '$description', 0, NOW())";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'To-Do added successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error adding To-Do: ' . $conn->error]);
        }
    }

    elseif (isset($_POST['action']) && $_POST['action'] === 'update_todo') {
        $todoId = $_POST['id'];
        $title = $_POST['title'];
        $description = $_POST['description'];
        $completed = $_POST['completed'];

        $sql = "UPDATE todos SET title='$title', description='$description', completed=$completed WHERE id=$todoId";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'To-Do updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error updating To-Do: ' . $conn->error]);
        }
    }

  
    elseif (isset($_POST['action']) && $_POST['action'] === 'delete_todo') {
        $todoId = $_POST['id'];

        $sql = "DELETE FROM todos WHERE id=$todoId";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'To-Do deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error deleting To-Do: ' . $conn->error]);
        }
    }

  
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$conn->close();
?>
