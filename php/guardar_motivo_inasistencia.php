
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
$motivo=$_POST["motivo"];
$id_as=$_POST["id_asistente"];
$estado=$_POST["estado"];
 $peticion=mysqli_query($con,
 "update citas_paciente_medico as cpm set cpm.motivo_inasistencia='"
 .$motivo."',id_asistente=".$id_as.",estado='".$estado."',cpm.confirmado='SI' where cpm.id_cita=".$id_cita);
if($peticion){
$response["status"]=1;
$response["id_cita"]=$id_cita;
$response["mensaje"]="OK!";	
$response["estado"]=$estado;
}else{
$response["status"]=-1;
$response["mensaje"]="Error al intentar realizar la operación";
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