
<?php 
require_once "server.php";
$con=conectar();
$response = array();
$response["status"]=0;
$response["mensaje"]="";
if($con){
$db=mysqli_select_db($con,db);
if($db){
$id_cita=$_POST["id_cita"];
$confirmado=$_POST["confirmado"];
$id_as=$_POST["id_asistente"];
 $peticion=mysqli_query($con,
 "update citas_paciente_medico as cpm set cpm.confirmado='".$confirmado."',id_asistente=".$id_as." where cpm.id_cita=".$id_cita);
if($peticion){
$response["status"]=1;
$response["mensaje"]="OK!";	
}else{
	$response["status"]=-1;
$response["mensaje"]="Sin confirmar";
}

}else{
	$response["status"]=-1;
$response["mensaje"]="Base de datos no seleccionada";
}
}else{
$response["status"]=-1;
$response["mensaje"]="Conexion no disponible!";
}
echo json_encode($response);
 ?>