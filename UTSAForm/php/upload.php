<?php

	if($_FILES['userfile']['error'] > 0){
		echo 'Problem: ';
		switch($_FILES['userfile']['error']){
			case 1:
				echo 'File exceeded upload_max_filesize';
				break;
			case 2:
				echo 'File exceeded max_file_size';
				break;
			case 3:
				echo 'File only partially uploaded';
				break;
			case 4:
				echo 'No file uploaded';
				break;
			case 6:
				echo 'Cannot upload file: No temp direcotry specified'; 
				break;
			case 7:
				echo 'Upload failed: Cannot write to disk';
				break;
		}
		exit;
	}


	if($_FILES['userfile']['type'] != 'text/plain'){
		echo 'Problem: file is not correct type';
		exit;
	}

	$fh = $_FILES['userfile']['tmp_name'];

	$contents = file_get_contents($_FILES['userfile']['tmp_name']);
	$contents = strip_tags($contents);

	echo $contents;

	exit;
?>