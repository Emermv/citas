<?php 
require_once "server.php";
$con=conectar();
$response = array();
$response["status"]=0;
$response["mensaje"]="";
if($con){
$db=mysqli_select_db($con,db);
if($db){
$email=$_POST["email"];

$para      = $email;
$titulo    = 'Recuperacion de cuenta';
$mensaje   = 'Hola usted ha solicitado sus credenciales';
$cabeceras = 'From:'.email_admin. "\r\n" .
    'Reply-To: '.email_admin. "\r\n" .
    'X-Mailer: PHP/' . phpversion();


$peticion1=@mail($para, $titulo, $mensaje, $cabeceras);
if($peticion1){
$response["status"]=1;
$response["mensaje"]="OK revise su bandeja de entrada!";	
}else{
$response["status"]=-1;
$response["mensaje"]="Error, no se pudo enviar el email!";
}

}else{
	$response["status"]=-1;
$response["mensaje"]="Error en el srevidor";
}
}else{
$response["status"]=-1;
$response["mensaje"]="Conexion no disponible!";
}
echo json_encode($response);
 ?>

 