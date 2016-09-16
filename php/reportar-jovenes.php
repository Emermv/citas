<?php 
require_once "server.php";
$con=conectar();
$response = array();
$response["status"]=0;
$response["mensaje"]="";
if($con){
$db=mysqli_select_db($con,db);
if($db){
   $peticion=mysqli_query($con,"call sp_reportar_citas(5)");
   if($peticion){
$entro=false;
$num=0;
while(true){
	if($data=mysqli_fetch_object($peticion)){
       for($i=0;$i<$data->num_f_horas;$i++){
       	if(!$entro){
			$response[$num]=array('id_cita'=>$data->id_cita,'fecha'=>$data->fecha,'num_f_horas'=>$data->num_f_horas,
		'especialidad'=>$data->especialidad,'pnombre'=>$data->pnombre,'estado'=>$data->estado,
		'papellidos'=>$data->papellidos,'ptelefono'=>$data->ptelefono,'mnombre'=>$data->mnombre,
		'mapellidos'=>$data->mapellidos,'mtelefono'=>$data->mtelefono,'confirmado'=>$data->confirmado);
			$response[$num][$i]=array('id_horas'=>$data->id_horas,'hora'=>$data->hora);
			$entro=true;
			}else{
		    $horas=mysqli_fetch_object($peticion);
			$response[$num][$i]=array('id_horas'=>$horas->id_horas,'hora'=>$horas->hora);
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
$response["mensaje"]="No se atendió jovenes aún!";
}
}else{
$response["status"]=-1;
$response["mensaje"]="No se atendió jovenes aún!";
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