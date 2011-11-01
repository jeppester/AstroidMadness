<?php
	require_once dirname(__FILE__)."/../dbSettings.php";
	
	$arr=array();
	$arr['singleplayer']=array();
	$arr['multiplayer']=array();
	
	$q="select * from $dbTable
	where gametype=0
	order by score desc
	limit 10";
	$op=$db->query($q) or die ("Query failed: ".$q);
	
	while ($val=$op->fetch_assoc()) {
		$val['playername']=addslashes($val['playername']);
		$arr['singleplayer'][]=$val;
	}
	
	$q="select * from $dbTable
	where gametype=1
	order by score desc
	limit 10";
	$op=$db->query($q) or die ("Query failed: ".$q);
	
	while ($val=$op->fetch_assoc()) {
		$val['playername']=addslashes($val['playername']);
		$arr['multiplayer'][]=$val;
	}
	
	echo json_encode($arr);
?>
