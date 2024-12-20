
<?php
require 'dataConnect.php';
$show_Table = "Select * from userTab";
$rez = mysqli_query($conn,$show_Table);
if($rez){
    echo json_encode(mysqli_fetch_all($rez));
}
else{
    echo json_encode(["err" => "Insertion failed", "msg" => mysqli_error($conn)]);
}
mysqli_close($conn);
?>