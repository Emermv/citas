create table usuarios(
id int not null primary key,
dni char(8) not null,
password char(6) not null,
nombre varchar(50) not null,
apellidos varchar(50) not null,
 direccion varchar(200) not null,
  telefono varchar(15) not null,
    ruta_foto varchar(100) not null
  );
  create table pacientes(
    codigo int not null primary key,
    id_usuario int not null,
    edad smallint not null,
    genero char(1) not null,
    foreign key (id_usuario) references usuarios(id)
  )
  create table medicos(
    codigo int not null primary key,
    id_usuario int not null,
    correo varchar(100) not null,
    especialidad varchar(100) not null,
    foreign key (id_usuario) references usuarios(id)
  )
  create table asistentes(
    codigo int not null primary key,
    id_usuario int not null,
    edad smallint not null,
    correo varchar(100) not null,
      genero char(1) not null,
      foreign key (id_usuario) references usuarios(id)
  )

  /*procedures*******************************************/
  DELIMITER //
  CREATE PROCEDURE sp_login( dni char(8),clave char(6))
      COMMENT 'sp login'
      if EXISTS(SELECT u.id from usuarios as u JOIN pacientes as p on u.id=p.id_usuario WHERE u.dni=dni) THEN
      SELECT  'Paciente' as 'tipo',u.dni,u.password,u.nombre,u.apellidos,u.direccion,u.telefono,u.ruta_foto,p.edad,p.genero
      from usuarios as u JOIN pacientes as p on u.id=p.id_usuario WHERE u.dni=dni;
      ELSEIF EXISTS(SELECT u.id from usuarios as u JOIN medicos as m on u.id=m.id_usuario WHERE u.dni=dni) THEN
         SELECT  'Medico' as 'tipo',u.dni,u.password,u.nombre,u.apellidos,u.direccion,u.telefono,u.ruta_foto,m.correo
      from usuarios as u JOIN medicos as m on u.id=m.id_usuario WHERE u.dni=dni;
        ELSEIF EXISTS(SELECT u.id from usuarios as u JOIN asistentes as a on u.id=a.id_usuario WHERE u.dni=dni) THEN
         SELECT  'Asistente' as 'tipo',u.dni,u.password,u.nombre,u.apellidos,u.direccion,u.telefono,u.ruta_foto,a.edad,a.correo,a.genero
      from usuarios as u JOIN asistentes as a on u.id=a.id_usuario WHERE u.dni=dni;
      ELSE
      SELECT 'Usuario no encontrado';
      end if;
