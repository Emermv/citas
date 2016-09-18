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
$esp=$_POST["especialidad"];
/*
$fecha='2016-09-18';
$opcion=2;
$id_medico=1;
$esp=2;
*/
$peticion=mysqli_query($con,"call sp_listar_pacientes('".$fecha."',".$id_medico.",".$esp.",".$opcion.")");
$num=0;

if($peticion){
$entro=false;
while(true){
	if($data=mysqli_fetch_object($peticion)){

       for($i=0;$i<$data->num_f_horas;$i++){
       	if(!$entro){
			$response[$num]=array('id_cita'=>$data->id_cita,'fecha'=>$data->fecha,'num_f_horas'=>$data->num_f_horas,
		  'nombre'=>$data->nombre,'estado'=>$data->estado,
		'apellidos'=>$data->apellidos,'edad'=>$data->edad,'direccion'=>$data->direccion,'descripcion'=>$data->descripcion,
		'ruta_foto'=>$data->ruta_foto,'codigo_pac'=>$data->codigo);
			$response[$num][$i]=array('hora'=>$data->hora);
			$entro=true;
			}else{
		    $horas=mysqli_fetch_object($peticion);
			$response[$num][$i]=array('hora'=>$horas->hora);
			}
       }
	 
	$num++;
	$entro=false;
}else{
	break;
}
}


if($num>0){
$response["status"]=1;
$response["mensaje"]="Ok";
$response["num"]=$num;

}else{
$response["status"]=-1;
$response["mensaje"]="La fecha ".$fecha." aún no tiene citas asignadas";
}
}else{
$response["status"]=-1;
$response["mensaje"]="La fecha ".$fecha." aún no tiene citas asignadas";
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
