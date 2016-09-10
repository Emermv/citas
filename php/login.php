<?php
require_once "server.php";
$con=conectar();
if($con){
mysqli_select_db($con,db);

$dni=$_POST['dni'];
$clave=$_POST['clave'];

$credenciales=mysqli_query($con,"call sp_login('".$dni."','".$clave."')");
$datos =array();
if($x=mysqli_fetch_array($credenciales)){
  if($dni===@$x['dni']){
  if($clave===@$x['password']){
    $datos['status']="ok";
    $datos['code']="1";
    $datos['id']=$x['id'];
     $datos['dni']=$x['dni'];
     $datos['nombre']=$x['nombre'];
     $datos['apellidos']=$x['apellidos'];
     $datos['direccion']=$x['direccion'];
     $datos['telefono']=$x['telefono'];
     $datos['ruta_foto']=$x['ruta_foto'];
     if($x['tipo']==="Paciente"){
       $datos['edad']=$x['edad'];
       $datos['genero']=$x['genero'];
     }else if($x['tipo']==="Medico"){
       $datos['correo']=$x['correo'];
     }else if($x['tipo']==="Asistente"){
       $datos['edad']=$x['edad'];
       $datos['correo']=$x['correo'];
       $datos['genero']=$x['genero'];
     }else{
       $datos['code']="-1";
     }
     $datos['tipo']=$x['tipo'];
  }else{
      $datos['status']="clave";
  }
  }else{
    $datos['status']="dni";
  }
}else{
  $datos['status']="user";
}
}else {
  $datos['status']="server";
}
   echo json_encode($datos);
 ?>
