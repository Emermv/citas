<?php
/*
define("host","localhost");
define("user","emer_pc");
define("password","teranova");
define("db","citas");
*/
define("host","advisorsystemnet1.fatcowmysql.com");
define("user","citas_us");
define("password","password_citas");
define("db","citas_db");
define("email_admin", "emer.morales@allsoft.hol.es");
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
