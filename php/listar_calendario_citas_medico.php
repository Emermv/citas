<?php
require_once "server.php";

$medico=$_POST['medico'];
$fecha=$_POST['fecha'];
/*
$medico="2";
$fecha="2016-09-03";*/
  $response=array();
$con=conectar();
if($con){
$selectdb=mysqli_select_db($con,db);
if($selectdb){
  $response['status']=0;
  $response['mensaje']="";
  $existe=false;
  $num=0;
  $sql="select c.fecha,c.estado,c.num_f_horas,h.hora,h.id_cita from citas_paciente_medico as c".
   " join horas_citas_paciente_medico as h on c.id_cita=h.id_cita  where c.id_medico="
  .$medico." and c.fecha='".$fecha."'";
   $disponibles=mysqli_query($con,$sql);
if($disponibles){
    while($data=mysqli_fetch_object($disponibles)){
      $existe=true;
     $response[] = array('id_cita'=>$data->id_cita,'num_f_horas'=>$data->num_f_horas,'fecha' =>$data->fecha,
     'hora'=>$data->hora,'estado'=>$data->estado);
        $num++;
    }
    if($existe){
      $response['status']=1;
      $response['mensaje']="ok";
      $response['num']=$num;
    }else{
      $response['status']=-1;
      $response['mensaje']="no existe!";
    }
 }else{
   $response['status']=-1;
   $response['mensaje']="no existe!";
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
