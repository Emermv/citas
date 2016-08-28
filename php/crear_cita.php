<?php
require_once "server.php";
$id_paciente=$_POST['paciente'];
$id_medico=$_POST['medico'];
$fecha=$_POST['fecha'];
$hora_inicio=$_POST['hora_inicio'];
$hora_fin=$_POST['hora_fin'];
$especialidad=$_POST['especialidad'];
$descripcion=$_POST['descripcion'];
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
   $peticion=mysqli_query($con,$sql);
if($x=mysqli_fetch_array($peticion)){
    $id_cita=$x['id_cita']+1;
  }else{
    $id_cita=1;
  }
   $sql='insert into citas_paciente_medico values('
   .$id_cita.','.$medico.','.$paciente.','.$fecha.','
   .$hora_inicio.','.$hora_fin.','.$especialidad.','.$descripcion.','.$estado.')';
   $save=mysqli_query($con,$sql);
    if($save){
      $response['status']=1;
      $response['mensaje']="ok";
    }else{
      $response['status']=-1;
      $response['mensaje']="no se puede guardar la cita !";
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
