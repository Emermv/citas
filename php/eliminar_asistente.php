<?php 
require_once "server.php";
$con=conectar();
$response = array();
$response["status"]=0;
$response["mensaje"]="";
if($con){
$db=mysqli_select_db($con,db);
if($db){
$id=$_POST["codigo"];
$id_usu=$_POST["id_usu"];
 $peticion1=mysqli_query($con,"delete from asistentes where codigo=".$id);
$peticion2=mysqli_query($con,"delete from usuarios where id=".$id_usu);
if($peticion1 && $peticion2){
$response["status"]=1;
$response["mensaje"]="OK!";	
}else{
$response["status"]=-1;
$response["mensaje"]="Error, el asistente tiene citas asignadas!";
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

 