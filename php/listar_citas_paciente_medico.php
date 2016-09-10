<?php
require_once 'server.php';
$con=conectar();
$response= array();
$response["status"]=0;
$response["mensaje"]="";

if($con){
$db=mysqli_select_db($con,db);
if($db){
//$fecha=$_POST["fecha"];
$fecha="2016-09-05";
$peticion=mysqli_query($con,"call sp_listar_citas('".$fecha."')");
$num=0;
if($peticion){

while($data=mysqli_fetch_object($peticion)){
	$response[]=array('id_cita'=>$data->id_cita,'fecha'=>$data->fecha);
	$num++;
}

$response["status"]=1;
$response["mensaje"]="Ok";
$response["num"]=$num;
}else{
$response["status"]=-1;
$response["mensaje"]="Sin resultados para ".$fecha;
}
}else{
$response["status"]=-1;
$response["mensaje"]="Base de datos no encontrada!";
}
}else{
$response["status"]=-1;
$response["mensaje"]="Imposible establecer conexion con el servidor";
}
echo json_encode($response);
?>
