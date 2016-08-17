<?php
define("host","localhost");
define("user","emer_pc");
define("password","teranova");
define("db","citas");
 function conectar(){
  try {
    $con=mysqli_connect(host,user,password);
  } catch (Exception $e) {
    echo $e;
  }

  return $con;
}

 ?>
