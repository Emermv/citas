<?php
require_once "server.php";
$con=conectar();
$response=array();
 $response['status']=0;
	$response["mensaje"]="";
if($con){
$selectdb=mysqli_select_db($con,db);
if($selectdb){
	$especialidades=mysqli_query($con,"select id_esp,especialidad from especialidades");
        $num=0;
        $hay=false;
		while(@$esp=mysqli_fetch_array($especialidades)){
			$response[$num]=array('id'=>$esp["id_esp"],'especialidad'=>$esp["especialidad"]);
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
