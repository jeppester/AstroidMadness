<?php
	require_once dirname(__FILE__)."/../dbSettings.php";
	
	//Validér higscore
	//$c = alle spilleres kombinerede score
	$c=array();
	
	$c['playername']=$db->real_escape_string($_REQUEST['playername']);
	$c['time']=$db->real_escape_string($_REQUEST['time']);
	
	$c['s1l1']=$_REQUEST['ship1']['s1l1'];
	$c['s1l2']=$_REQUEST['ship1']['s1l2'];
	$c['s1l3']=$_REQUEST['ship1']['s1l3'];
	$c['s1l4']=$_REQUEST['ship1']['s1l4'];
	$c['s2l1']=$_REQUEST['ship1']['s2l1'];
	$c['s2l2']=$_REQUEST['ship1']['s2l2'];
	$c['s2l3']=$_REQUEST['ship1']['s2l3'];
	$c['s2l4']=$_REQUEST['ship1']['s2l4'];
	$c['s3l1']=$_REQUEST['ship1']['s3l1'];
	$c['s3l2']=$_REQUEST['ship1']['s3l2'];
	$c['s3l3']=$_REQUEST['ship1']['s3l3'];
	$c['s3l4']=$_REQUEST['ship1']['s3l4'];
	
	$c['PU']=$_REQUEST['ship1']['PU'];
	$c['points']=$_REQUEST['ship1']['points'];
	
	if ($_REQUEST['players']==2) {
		$c['s1l1']+=$_REQUEST['ship2']['s1l1'];
		$c['s1l2']+=$_REQUEST['ship2']['s1l2'];
		$c['s1l3']+=$_REQUEST['ship2']['s1l3'];
		$c['s1l4']+=$_REQUEST['ship2']['s1l4'];
		$c['s2l1']+=$_REQUEST['ship2']['s2l1'];
		$c['s2l2']+=$_REQUEST['ship2']['s2l2'];
		$c['s2l3']+=$_REQUEST['ship2']['s2l3'];
		$c['s2l4']+=$_REQUEST['ship2']['s2l4'];
		$c['s3l1']+=$_REQUEST['ship2']['s3l1'];
		$c['s3l2']+=$_REQUEST['ship2']['s3l2'];
		$c['s3l3']+=$_REQUEST['ship2']['s3l3'];
		$c['s3l4']+=$_REQUEST['ship2']['s3l4'];
	
		$c['PU']+=$_REQUEST['ship2']['PU'];
		$c['points']+=$_REQUEST['ship2']['points'];
	}
	
	//Lav tests på data
	$err=array();
	
	//Udregn score ud fra data
	$calcScore=0;
	$calcScore+=($c['s1l1']+$c['s1l2']+$c['s1l3']+$c['s1l4'])*800;
	$calcScore+=($c['s2l1']+$c['s2l2']+$c['s2l3']+$c['s2l4'])*600;
	$calcScore+=($c['s3l1']+$c['s3l2']+$c['s3l3']+$c['s3l4'])*400;
	$calcScore+=$c['PU']*1000;
	
	//Tjek om den udregnede score passer med den indsendte
	if ($calcScore!=$c['points']) {
		$err[]="Score is wrong!";
	}
	
	//Udregn hvor lang tid at spillet må have taget
	$calcTime=0;
	
	$calcTime+=($c['s1l1']+$c['s2l1']+$c['s3l1'])*325;
	$calcTime+=($c['s1l2']+$c['s2l2']+$c['s3l2'])*250;
	$calcTime+=($c['s1l3']+$c['s2l3']+$c['s3l3'])*175;
	$calcTime+=($c['s1l4']+$c['s2l4']+$c['s3l4'])*100;
	$calcTime/=$_REQUEST['players'];
	$calcTime+=90000;
	
	//Tjek om den udregnede tid stemmer overens med den indsendte
	if (abs($calcTime-$c['time'])>1000) {
		$err[]="Time is wrong!";
	}
	
	//Tjek om antallet af forskellige skudte astroider kan lade sig gøre
	$s1=$c['s1l1']+$c['s1l2']+$c['s1l3']+$c['s1l4'];
	$s2=$c['s2l1']+$c['s2l2']+$c['s2l3']+$c['s2l4'];
	$s3=$c['s3l1']+$c['s3l2']+$c['s3l3']+$c['s3l4'];
	if ($s3*2<$s2 || $s2*2<$s1) {
		$err[]="Number of destroyed astroids is impossible";
	}
	
	//Hvis der ikke er fundet nogen uregelmæssigheder i highscoren, gem den til databasen
	if (count($err)==0) {
		$q="insert into $dbTable (gametype,playername,score,gametime) values (".($_REQUEST['players']*1-1).",'".$c['playername']."',".$c['points'].",".$c['time'].")";
		$db->query($q) or die ("Query failed: ".$q);
		
		echo "1";
	}
	else {
		print_r($err);
	}
?>
