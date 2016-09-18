
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
$id_his=0;
$id_medico=$_POST["id_medico"];
$id_paciente=$_POST["id_paciente"];
$alergico=$_POST["alergico"];
$id_esp=$_POST["id_esp"];
$desc_alergia=$_POST["desc_alergia"];
$fecha=$_POST["fecha"];
$hora=$_POST["hora"];

$peticion=mysqli_query($con,"select id_his from historial_clinico order by id_his desc limit 1");
if($x=mysqli_fetch_array($peticion)){
$id_his=$x["id_his"]+1;
}else{
	$id_his=1;
}

$sql="call sp_insertar_historial(".$id_his.",".$id_cita.",".$id_medico.",".$id_paciente.",".$id_esp.",'".
$diag."','".$rec."','".$alergico."','".$desc_alergia."','".$fecha."','".$hora."')";

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