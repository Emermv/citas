<?php
require_once "server.php";
$con=conectar();
$response=array();
$response["status"]=0;
$response["mensaje"]="";
if($con){
$db=mysqli_select_db($con,db);
if($db){
$id_paciente=$_POST['paciente'];
$id_medico=$_POST['medico'];
$tamHoras=$_POST["tamHoras"];
$horasTotal=$_POST["horas_total"];
$fecha=$_POST['fecha'];
$especialidad=$_POST['especialidad'];
$descripcion=$_POST['descripcion'];
$estado="asistira";
$confirmado="NO";
$horas=array();
$id_cita=0;
$id_hora=0;
for($i=0;$i<$tamHoras;$i++){
  $horas[$i]=$_POST["hora_fila".$i];
}
/* ********************************* operacion*************/
  $sql="select id_cita from citas_paciente_medico as cpm order by cpm.id_cita desc limit 1";
  $sqlhora="select id_horas from horas_citas_paciente_medico as hcpm order by hcpm.id_horas desc limit 1";
   $peticion=mysqli_query($con,$sql);
   $peticion_hora=mysqli_query($con,$sqlhora);
if($x=mysqli_fetch_array($peticion)){
    $id_cita=$x['id_cita']+1;
  }else{
    $id_cita=1;
  }
  if($h=mysqli_fetch_array($peticion_hora)){
    $id_hora=$h['id_horas']+1;
  }else{
    $id_hora=1;
  }
  $sql_cita="call sp_crear_citas(".$id_cita.",".$id_medico.",".$id_paciente.",'"
  .$fecha."',".$especialidad.",'".$descripcion."','".$estado."',".$tamHoras.",'".$confirmado."')";
$save_cita=mysqli_query($con,$sql_cita);
if($save_cita){
  $save_horas;
  for($i=0;$i<$tamHoras;$i++){
    $sql_hora="insert into horas_citas_paciente_medico values (".$id_hora.",".$id_cita.",'".$horas[$i]."')";
    $id_hora++;
    $save_horas=mysqli_query($con,$sql_hora);
  }
  if($save_horas){
$response["status"]=1;
$response["mensaje"]="La cita ha sido creada !";
  }else{
    $response["status"]=-1;
$response["mensaje"]="No se pudo crear las horas para la cita";
  }
}else{
$response["status"]=-1;
//$response["mensaje"]="La cita no pudo ser creada";
$response["mensaje"]=$sql_cita;
}
  
/* ********************************* end  operacion*************/

}else{
$response["status"]=-1;
$response["mensaje"]="Base de datos no econtrada";
}
}else{
$response["status"]=-1;
$response["mensaje"]="Sin conexion";
}
echo json_encode($response);
?>