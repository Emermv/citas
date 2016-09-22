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
require_once  "server.php";

$con=conectar();
$response=array();
$response["status"]=0;
$response["mensaje"]="";

if($con){
$selectdb=mysqli_select_db($con,db);
if($selectdb){
/*inserts********************************************************************/
$nombre=$_POST["nombre"];
$apellidos=$_POST["apellidos"];
$direccion=$_POST["direccion"];
$id_asistente=$_POST["id_asistente"];
$id_usuario=$_POST["id_usuario"];
$telefono=$_POST["telefono"];
$dni=$_POST["dni"];
$genero=$_POST["genero"];
$password=$_POST["password"];
$edad=$_POST["edad"];
$correo=$_POST["correo"];
 $ruta="images/";
 $name=basename( $_FILES['foto']['name']);

 
 $ruta = $ruta.$id_usuario."foto_".$name;
$extension = end(explode(".", $_FILES["foto"]["name"]));
if(checkExtension($extension)){
 if(move_uploaded_file($_FILES["foto"]["tmp_name"], "../".$ruta)){
   
 $sql="call sp_modificar_asistente(".$id_usuario.",'".$dni."','".$password."','".$nombre."','".$apellidos."','".
$direccion."','".$telefono."','".$ruta."',".$id_asistente.",".$edad.",'".$correo."','".$genero."')";
 $pet=mysqli_query($con,$sql);
/******************************************************/

if($pet){
$response["status"]=1;
$response["mensaje"]="OK!"; 
}else{
$response["status"]=-1;
$response["mensaje"]="Error,el asistente posee citas asignadas y no puede modificarse !";
}
/*****************************************************/
 }else{
 $response["status"]=-1;
$response["mensaje"]="No es  posible subir  la  foto!";
 }
}else{
    $response["status"]=-1;
$response["mensaje"]="Archivo no compatible!";
}

/******************************************************************************/

}else{
  $response["status"]=-1;
$response["mensaje"]="Base de datos no hllada!";
}
}else{
$response["status"]=-1;
$response["mensaje"]="Sin conexion!";
}

echo json_encode($response);
?>