
<?php 
function checkExtension($extension) {
       //aqui podemos añadir las extensiones que deseemos permitir
       $tipos_files= array("jpg", "jpeg", "png", "JPG", "PNG");
       if(in_array(strtolower($extension), $tipos_files)){
           return TRUE;
       }else{
           return FALSE;
       }
   }
require_once "server.php";
$con=conectar();
$response = array();
$response["status"]=0;
$response["mensaje"]="";
if($con){
$db=mysqli_select_db($con,db);
if($db){
$nombre=$_POST["nombre"];
$apellidos=$_POST["apellidos"];
$direccion=$_POST["direccion"];
$id_medico=$_POST["id_medico"];
$id_usuario=$_POST["id_usuario"];
$id_esp=$_POST["id_esp"];
$telefono=$_POST["telefono"];
$dni=$_POST["dni"];
$genero=$_POST["genero"];
$password=$_POST["password"];
$correo=$_POST["correo"];
 $ruta="images/";
$extension = end(explode(".", $_FILES["foto"]["name"]));
if(checkExtension($extension)){
$name=basename( $_FILES['foto']['name']);
  $ruta = $ruta.$id_usuario."foto_".$name;
  if(move_uploaded_file($_FILES['foto']['tmp_name'],"../".$ruta)){

   $sql1="call sp_modificar_medico(".$id_usuario.",'".$dni."','".$password."','".$nombre."','".$apellidos."','".
$direccion."','".$telefono."','".$ruta."',".$id_medico.",'".$correo."',".$id_esp.")";
 $peticion1=mysqli_query($con,$sql1);
 
if($peticion1){
$response["status"]=1;
$response["mensaje"]="OK!"; 
}else{
$response["status"]=-1;
$response["mensaje"]="Error al intentar realizar la operación";
}
  }else{
    $response["status"]=-1;
$response["mensaje"]="Error al intentar subir el archivo";
  }
}else{
  $response["status"]=-1;
$response["mensaje"]="Archivo no valido!";
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