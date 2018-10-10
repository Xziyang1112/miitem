<?php  
    require "conn.php";
    if(isset($_GET['sid'])){//前端ajax传输过来的额
        $sid=$_GET['sid'];
    }else{
        exit('非法操作');
    }
	$result=mysql_query("select * from detailstable");
	$arrdata=array();
	for($i=0;$i<mysql_num_rows($result);$i++){
		$arrdata[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
    }
    $arrdata=$arrdata[$sid];
    echo json_encode($arrdata);
?>