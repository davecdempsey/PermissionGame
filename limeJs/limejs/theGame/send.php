
<?php

 $data= array($_POST['UserID'],$_POST['GroupID'],$_POST['AppID'],$_POST['PermissionName'],$_POST['PermissionType'],$_POST['PermissionSize'],$_POST['Decision']);
        $f=fopen("user-data.csv","a+"); 
        fputcsv($f, $data);
        fclose($f); 

?>

