
<?php 
require_once "server.php";
$con=conectar();
$response = array();
$response["status"]=0;
$response["mensaje"]="";
if($con){
$db=mysqli_select_db($con,db);
if($db){
	$id_his=$_POST["id_his"];
$id_cita=$_POST["id_cita"];
$diag=$_POST["diagnostico"];
$rec=$_POST["receta"];
$id_medico=$_POST["id_medico"];
$id_paciente=$_POST["id_paciente"];
$alergico=$_POST["alergico"];
$id_esp=$_POST["id_esp"];
$desc_alergia=$_POST["desc_alergia"];
$fecha=$_POST["fecha"];
$hora=$_POST["hora"];
$sql="update historial_clinico set diagnostico='".$diag."',receta='".$rec."',alergico='".$alergico."',descripcion_alergia='".$desc_alergia."',fecha='".$fecha."',hora='".$hora."' where id_his=".$id_his;
 $peticion=mysqli_query($con,$sql);
if($peticion){
$response["status"]=1;
$response["id"]=$id_his;
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