<?php
include 'config_1.php';

$sql = "SELECT id, title, description, completed FROM todos"; 
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $todos[] = [
            'id' => $row['id'],
            'title' => $row['title'],
            'description' => $row['description'], 
            'completed' => (bool)$row['completed'],
        ];
        
        error_log('Description: ' . $row['description']);
    }
 
    header('Content-Type: application/json');
    echo json_encode($todos);
} else {
    echo json_encode([]);
}

$conn->close();
?>
