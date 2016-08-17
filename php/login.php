<?php
require_once "server.php";
$con=conectar();
if($con){
mysqli_select_db($con,db);
$dni=$_POST['dni'];
$clave=$_POST['clave'];
$credenciales=mysqli_query($con,"select p.dni,p.password from pacientes as p where dni='".$dni."'");
if($x=mysqli_fetch_array($credenciales)){
  if($dni===$x['dni']){
  if($clave===$x['password']){
     echo "ok";
  }else{
    echo "Clave incorrecto";
  }
  }else{
    echo "DNI incorrecto";
  }
}else{
echo "El usuario : ".$dni." no existe!";
}
}else {
  echo "Imposible establecer conexion";
}
 ?>
