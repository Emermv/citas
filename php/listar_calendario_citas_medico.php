<?php
require_once "server.php";
/*
$medico=$_POST['medico'];
$fecha_inicio=$_POST['fecha_inicio'];
$fecha_fin=$_POST['fecha_fin'];
*/
$medico="2";
$fecha_inicio="2016-08-28";
$fecha_fin="2016-08-31";
  $response=array();
$con=conectar();
if($con){
$selectdb=mysqli_select_db($con,db);
if($selectdb){
  $response['status']=0;
  $response['mensaje']="";
  $existe=false;
  $num=0;
  $sql="select fecha,hora_inicio,hora_fin,estado from citas_paciente_medico as c where c.id_medico="
  .$medico." and c.fecha between '".$fecha_inicio."' and '".$fecha_fin."'";

   $disponibles=mysqli_query($con,$sql);
if($disponibles){
    while($data=mysqli_fetch_object($disponibles)){
      $existe=true;
     $response[] = array('fecha' =>$data->fecha,
     'hora_inicio'=>$data->hora_inicio,'hora_fin'=>$data->hora_fin,
     'estado'=>$data->estado);
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
