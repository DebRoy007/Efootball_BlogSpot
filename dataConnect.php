<?php
$servername = "localhost";
$username = "root";
$password = "";
$db = "userData";

// Enable mysqli exceptions
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    // Attempt to connect to the database
    $conn = mysqli_connect($servername, $username, $password, $db);

    // If connection is successful
  if (!$conn) {
    http_response_code(500);
    echo json_encode(["err" => "Connection failed", "msg" => mysqli_connect_error()]);
    die(); 
}

} catch (mysqli_sql_exception $e) {
    // Handle error if connection fails
    http_response_code(500);
    echo json_encode(["err" => "Connection failed", "msg" => $e->getMessage()]);
    die(); 
}
?>