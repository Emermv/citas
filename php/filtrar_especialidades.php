<?php
require_once "server.php";
$id_esp=$_POST['id_esp'];
  $response=array();
$con=conectar();
if($con){
$selectdb=mysqli_select_db($con,db);
if($selectdb){
  $response['status']=0;
  $response['mensaje']="";
  $existe=false;
  $num=0;
  $sql="select m.codigo,u.nombre,u.apellidos,e.id_esp from medicos as m JOIN especialidades as e on m.id_esp=e.id_esp join usuarios as u on u.id=m.id_usuario WHERE e.id_esp=".$id_esp;
   $especialidades=mysqli_query($con,$sql);
if($especialidades){
    while($data=mysqli_fetch_object($especialidades)){
      $existe=true;
     $response[] = array('nom_app' =>$data->nombre." ".$data->apellidos,'id'=>$data->codigo,'id_esp'=>$data->id_esp);
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
