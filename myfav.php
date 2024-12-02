<?php
$servername = "localhost";
$username = "root";
$password="";
$db = "mydb";
$conn = mysqli_connect($servername,$username,$password,$db);
if(!$conn){
    die("Sorry connection failed due to -->".mysqli_connect_error());
}
$name =mysqli_real_escape_string($conn,$_POST['name']);
$email= mysqli_real_escape_string($conn,$_POST['email']);
$qr = "INSERT INTO `mytab` (`name`, `email`) VALUES ( '$name', '$email')";
$rez = mysqli_query($conn,$qr);
if($rez){
    echo "query executed successfully affected rows".mysqli_affected_rows($conn);
}
else{
    echo "sorry failed to insert due to".mysqli_error($conn);
}

?>