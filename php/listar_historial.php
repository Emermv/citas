<?php
require_once 'server.php';
$con=conectar();
$response= array();
$response["status"]=0;
$response["mensaje"]="";

if($con){
$db=mysqli_select_db($con,db);
if($db){

$fecha=$_POST["fecha"];
$opcion=$_POST["opcion"];
$id_medico=$_POST["id_medico"];
$id_paciente=$_POST["id_paciente"];
/*
$fecha='2016-09-18';
$opcion=1;
$id_medico=1;
$id_paciente=1;*/
$peticion=mysqli_query($con,"call sp_listar_historial('".$opcion."',".$id_paciente.",".$id_medico.",'".$fecha."')");
$num=0;
if($peticion){
while($datos=mysqli_fetch_object($peticion)){
	$response[$num]=array('id_his'=>$datos->id_his,'id_paciente'=>$datos->id_paciente,
		'id_cita'=>$datos->id_cita,'diagnostico'=>$datos->diagnostico,
		'receta'=>$datos->receta,'alergico'=>$datos->alergico,'descripcion_alergia'=>$datos->descripcion_alergia,
		'fecha'=>$datos->fecha,'hora'=>$datos->hora,'nombre'=>$datos->nombre,'apellidos'=>$datos->apellidos,
		'especialidad'=>$datos->especialidad);
	$num++;
}


if($num>0){
$response["status"]=1;
$response["mensaje"]="Ok";
$response["num"]=$num;

}else{
$response["status"]=-1;
$response["mensaje"]="Sin resultados";
}
}else{
$response["status"]=-1;
$response["mensaje"]="Sin resultados";
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
