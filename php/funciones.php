<?php
function consultar_id($con,$sql){
$peticion=mysqli_query($con,$sql);
if($x=mysqli_fetch_array($peticion)){
    return $x['id_cita']+1;
  }else{
    return 1;
  }
}
?>