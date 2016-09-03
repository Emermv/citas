<?php
require_once "server.php";
$id_paciente=$_POST['paciente'];
$id_medico=$_POST['medico'];
$tamHoras=$_POST["tamHoras"];
$horasTotal=$_POST["horas_total"];
$fecha=$_POST['fecha'];
$especialidad=$_POST['especialidad'];
$descripcion=$_POST['descripcion'];
$horas=array();
$id_hora=0;

for($i=0;$i<$tamHoras;$i++){
	$horas[$i]=$_POST["hora_fila".$i];
}
$estado="ocupado";
$id_cita=0;
$response=array();
$con=conectar();
if($con){
$selectdb=mysqli_select_db($con,db);
if($selectdb){
  $response['status']=0;
  $response['mensaje']="";

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
  $peticion_usuario=mysqli_query($con,"select id from usuarios as u where dni='".$id_paciente."'");
  if($dat=mysqli_fetch_array($peticion_usuario)){
  	$id_paciente=$dat["id"];
  }
   $sql="insert into citas_paciente_medico values(
   '$id_cita','$id_medico','$id_paciente','$fecha','
    $especialidad','$descripcion','$estado','$tamHoras')";
   $save=mysqli_query($con,$sql);
   $save_horas;
   for($i=0;$i<$tamHoras;$i++){
 $save_horas=mysqli_query($con,
 "insert into horas_citas_paciente_medico values('$id_hora','$id_cita','$horas[$i]')");
 $id_hora++;
   }
    if($save){
     if($save_horas){
	 	 $response['status']=1;
      $response['mensaje']="ok";
	 }else{
	 	 $response['status']=-1;
      $response['mensaje']="no se puede crear las horas de la cita !";
	 }
    }else{
      $response['status']=-1;
      $response['mensaje']="no se puede crear la cita !";
    }
}else{
  $response['status']=-1;
  $response['mensaje']="La base de datos no existe!";
}
}else{
  $response['status']=-1;
  $response['mensaje']="No es posible establecer conexion";
}
echo json_encode($response);
 ?>
