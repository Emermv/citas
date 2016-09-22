<?php 
require_once "server.php";
$con=conectar();
$response = array();
$response["status"]=0;
$response["mensaje"]="";
if($con){
$db=mysqli_select_db($con,db);
if($db){
$especialidad=$_POST["especialidad"];
$id_esp=0;
 $peticion=mysqli_query($con,"select id_esp from especialidades order by id_esp desc limit 1");
 if($p=mysqli_fetch_array($peticion)){
$id_esp=$p["id_esp"]+1;
 }else{
 	$id_esp=1;
 }
 $peticion=mysqli_query($con,"insert into especialidades values(".$id_esp.",'".$especialidad."')");
if($peticion){
$response["status"]=1;
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

 