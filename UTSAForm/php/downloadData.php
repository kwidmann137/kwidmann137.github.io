<?php
        // echo "valid json";
        $file = "formData.txt";

        // set the headers, so that
        // the browser knows to expect a .txt file download.
        header("Content-Disposition: attachment; filename=".basename($file));
        header("Content-Type: text/html");
        header("Content-Length: " . filesize($file));

        // set Cache headers, to minimize the
        // risk of the browser using old versions of the data.
        header("Pragma: no-cache");
        header("Expires: 0");
        header("Cache-Control: must-revalidate");

        // print out the file data for
        // the browser to open or save.
        readfile($file);

        exit;
?>