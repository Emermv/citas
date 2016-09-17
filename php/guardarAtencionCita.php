
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
$diag=$_POST["diagnostico"];
$rec=$_POST["receta"];
$estado="asistio";
$sql="update citas_paciente_medico as cpm set cpm.diagnostico='"
 .$diag."',receta='".$rec."',estado='".$estado."' where cpm.id_cita=".$id_cita;
 $peticion=mysqli_query($con,$sql);
if($peticion){
$response["status"]=1;
$response["id"]=$id_cita;
$response["mensaje"]="OK!";	
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