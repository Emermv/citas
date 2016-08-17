create table pacientes(
id int not null primary key,
dni char(8) not null,
password char(6) not null,
nombre varchar(50) not null,
apellidos varchar(50) not null,
 direccion varchar(200) not null,
  telefono varchar(15) not null,
    email varchar(100),
    edad int not null,
    genero char(1) not null,
    ruta_foto varchar(100) not null
    )
