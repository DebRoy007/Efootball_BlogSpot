<?php
require 'dataConnect.php';

// Check if the request method is PATCH
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the expected fields are in the parsed data
    if (isset($_POST['Sno'])){
        $sno = $_POST['Sno'];
        // Now perform the database update or other actions
        // Example: Update data in the database
        $qr = "DELETE from usertab WHERE user_Id = '$sno'";
        $update_Qr="UPDATE usertab SET user_Id = user_Id -1 where user_Id >'$sno' ";
        $rez = mysqli_query($conn,$qr);
        $rez1 = mysqli_query($conn,$update_Qr);
        if ($rez || $rez1) {
            // Return success response
            if($rez1){
                echo json_encode(['msg'=>'The Table updation query did not run']);
            } else{
                echo json_encode(['msg' => 'Data Deleted successfully']);
            }
            
        } else {
            // Return error response
            http_response_code(500);
            echo json_encode(['error'=>mysqli_error($conn),'msg' => 'Failed to delete data']);
        }
    } else {
        echo json_encode(['msg' => 'Required fields missing']);
    }
} else {
    // Handle if method is not PATCH
    echo json_encode(['msg' => 'Invalid request method']);
}

mysqli_close($conn);
?>
