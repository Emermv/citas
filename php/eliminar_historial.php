
<?php 
require_once "server.php";
$con=conectar();
$response = array();
$response["status"]=0;
$response["mensaje"]="";
if($con){
$db=mysqli_select_db($con,db);
if($db){
$id=$_POST["id"];

 $peticion1=mysqli_query($con,"delete from historial_clinico where id_his=".$id);
if($peticion1){
$response["status"]=1;
$response["mensaje"]="OK!";	
}else{
	$response["status"]=-1;
$response["mensaje"]="No se ha podido eliminar el historial clinico debido a un error!";
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