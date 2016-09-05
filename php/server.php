<?php

define("host","localhost");
define("user","emer_pc");
define("password","teranova");
define("db","citas");
/*
define("host","mysql.hostinger.es");
define("user","u387583705_emerm");
define("password","teranova");
define("db","u387583705_movil");*/
 function conectar(){
  try {
    $con=mysqli_connect(host,user,password);
    mysqli_query($con,"SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");
  } catch (Exception $e) {
    echo $e;
  }

  return $con;
}

 ?>
