<?php
require_once "server.php";
$con=conectar();
$response=array();
 $response['status']=0;
	$response["mensaje"]="";
if($con){
$selectdb=mysqli_select_db($con,db);
if($selectdb){
	   $num=0;
        $hay=false;
	$medicos=mysqli_query($con,"select u.id,u.dni,u.nombre,u.apellidos,u.direccion,u.telefono,u.ruta_foto, a.correo,a.codigo,a.edad,a.genero from usuarios as u join asistentes as a on u.id=a.id_usuario");
	while (@$med=mysqli_fetch_object($medicos)) {
		$response[]=array('id'=>$med->id,'dni'=>$med->dni,'nom_ap'=>$med->nombre." ".$med->apellidos,'direccion'=>$med->direccion,'telefono'=>$med->telefono,'ruta_foto'=>$med->ruta_foto,'correo'=>$med->correo,'codigo'=>$med->codigo,'edad'=>$med->edad,'genero'=>$med->genero);
		  $num++;
          $hay=true;
	}
	if($hay){
			 $response['status']=1;
		 $response["mensaje"]="ok!";
		 $response['num']=$num;
		 
		}else{
			 $response['status']=-1;
		 $response["mensaje"]="Sin Resultados!";
		}
}else{
	  $response['status']=-1;
	$response["mensaje"]="Base de datos no seleccionada !";
}
}else {
  $response['status']=-1;
	$response["mensaje"]="Imposible establecer conexion !";
}
   echo json_encode($response);
 ?>
