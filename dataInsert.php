<?php
require 'dataConnect.php';


$name =mysqli_real_escape_string($conn,$_POST['nameData']);
$email= mysqli_real_escape_string($conn,$_POST['emailData']);
$maxIDQuery= "SELECT MAX(user_Id) from userTab";
$maxIDResult = mysqli_query($conn,$maxIDQuery);
if (!$maxIDResult) {
    http_response_code(500);
    echo json_encode(["err" => "Query failed", "msg" => mysqli_error($conn)]);
    exit;
}
$sno = mysqli_fetch_assoc($maxIDResult)['MAX(user_Id)'];
if ($sno === NULL) {
    $sno = 1;
} else {
    $sno += 1;
}
$qr = "INSERT INTO `userTab` (`user_Id` ,`name`, `email`) VALUES ('$sno' , '$name', '$email')";
$rez = mysqli_query($conn,$qr);
if ($rez) {
    echo json_encode(["success" => true, "msg" => "Data added successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["err" => "Insertion failed", "msg" => mysqli_error($conn)]);
}

mysqli_close($conn);
?>