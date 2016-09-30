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
        $entro=false;
	$medicos=mysqli_query($con,"select (select COUNT(codigo) from medicos WHERE id_usuario=u.id) as 'num_f_esp', u.id,u.dni,u.nombre,u.apellidos,u.direccion,u.telefono,u.ruta_foto,m.correo,m.codigo,m.id_esp,e.especialidad from usuarios as u join medicos as m on u.id=m.id_usuario join especialidades as e on e.id_esp=m.id_esp ");
	while (@$med=mysqli_fetch_object($medicos)) {
		  for($i=0;$i<$med->num_f_esp;$i++){
		  	if(!$entro){
		  		$response[$num]=array('id'=>$med->id,'dni'=>$med->dni,'nom_ap'=>$med->nombre." ".$med->apellidos,'direccion'=>$med->direccion,'telefono'=>$med->telefono,'ruta_foto'=>$med->ruta_foto,'correo'=>$med->correo,'codigo'=>$med->codigo,'num_f_esp'=>$med->num_f_esp);
            $response[$num][$i]=array('id_esp'=>$med->id_esp,'especialidad'=>$med->especialidad);
		  		$entro=true;
		  	}else{
              $espe=mysqli_fetch_object($medicos);
              $response[$num][$i]=array('id_esp'=>$espe->id_esp,'especialidad'=>$espe->especialidad);
		  	}
		  }
		  $entro=false;
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
