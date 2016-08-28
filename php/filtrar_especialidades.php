<?php
require_once "server.php";
$especialidad=$_POST['especialidad'];
  $response=array();
$con=conectar();
if($con){
$selectdb=mysqli_select_db($con,db);
if($selectdb){
  $response['status']=0;
  $response['mensaje']="";
  $existe=false;
  $num=0;
  $sql="select u.nombre,u.apellidos,u.id from usuarios as u join medicos as m on u.id=m.id_usuario where m.especialidad='".$especialidad."'";
   $especialidades=mysqli_query($con,$sql);
if($especialidades){
    while($data=mysqli_fetch_object($especialidades)){
      $existe=true;
     $response[] = array('nom_app' =>$data->nombre." ".$data->apellidos,'id'=>$data->id);
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
