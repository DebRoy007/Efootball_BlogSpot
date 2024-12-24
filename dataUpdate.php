<?php
require "dataConnect.php";

// Check if the request method is PATCH
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the expected fields are in the parsed data
    if (isset($_POST['Sno']) &&isset($_POST['update_Name']) && isset($_POST['update_Email'])){
        $sno = mysqli_real_escape_string($conn,$_POST['Sno']);
        $newName =mysqli_real_escape_string($conn,$_POST['update_Name']);
        $newEmail =  mysqli_real_escape_string($conn,$_POST['update_Email']);;

        // Now perform the database update or other actions
        // Example: Update data in the database
        $qr = "UPDATE usertab SET name = '$newName', email = '$newEmail' WHERE user_Id = '$sno'";
        $rez = mysqli_query($conn,$qr);
        if ($rez) {
            // Return success response
            echo json_encode(['msg' => 'Data Updated successfully']);
        } else {
            // Return error response
            http_response_code(500);
            echo json_encode(['error'=>mysqli_error($conn),'msg' => 'Failed to update data']);
        }
    } else {
        http_response_code(500);
        echo json_encode(['msg' => 'Required fields missing']);
    }
} else {
    // Handle if method is not PATCH
    http_response_code(500);
    echo json_encode(['msg' => 'Invalid request method']);
}

mysqli_close($conn);
?>
