
<?php 
require_once "server.php";
$con=conectar();
$response = array();
$response["status"]=0;
$response["mensaje"]="";
if($con){
$db=mysqli_select_db($con,db);
if($db){
$id_cita=$_POST["id"];

 $peticion1=mysqli_query($con,"delete from horas_citas_paciente_medico where id_cita=".$id_cita);
 $peticion2=mysqli_query($con,"delete from citas_paciente_medico where id_cita=".$id_cita);
if($peticion1 && $peticion2){
$response["status"]=1;
$response["mensaje"]="OK!";	
}else{
	$response["status"]=-1;
$response["mensaje"]="No se ha podido eliminar la cita debido a un error!";
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