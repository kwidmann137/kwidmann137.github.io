<?php
    $json = $_POST['myData'];
    if(json_decode($json) != null){
        // echo "valid json";
        $file = "formData.txt";
        $fh = fopen($file, "w"); 
        fwrite($fh, $json);
        fclose($fh);

        exit;
    }else{
        echo "Invalid json";
    }
?>
