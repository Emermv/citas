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
    id_esp int not null,
    foreign key (id_usuario) references usuarios(id),
    foreign key (id_esp) references especialidades(id_esp)
  )

  create table asistentes(
    codigo int not null primary key,
    id_usuario int not null,
    edad smallint not null,
    correo varchar(100) not null,
      genero char(1) not null,
      foreign key (id_usuario) references usuarios(id)
  )

  create table  citas_paciente_medico(
      id_cita int not null PRIMARY key,
      id_medico int not null,
      id_paciente int not null,
       fecha date not null,
      especialidad int not null,
      descripcion varchar(500),
      estado varchar(20) not null,
      num_f_horas int not null,
      foreign key(especialidad) references especialidades(id_esp),
     FOREIGN key(id_medico) REFERENCES medicos(codigo),
    FOREIGN key(id_paciente) REFERENCES pacientes(codigo)
      );
      create table horas_citas_paciente_medico(
          id_horas int not null PRIMARY key,
          id_cita int not null,
          hora varchar(11) not null,
          FOREIGN key(id_cita) REFERENCES citas_paciente_medico(id_cita)
          )
										create table especialidades(
										id_esp int not null primary key,
										especialidad varchar(100) not null 
										)
  /*procedures*******************************************/
  DELIMITER //
  CREATE PROCEDURE sp_login( dni char(8),clave char(6))
      COMMENT 'sp login'
      if EXISTS(SELECT u.id from usuarios as u JOIN pacientes as p on u.id=p.id_usuario WHERE u.dni=dni) THEN
      SELECT u.id,'Paciente' as 'tipo',u.dni,u.password,u.nombre,u.apellidos,u.direccion,u.telefono,u.ruta_foto,p.edad,p.genero
      from usuarios as u JOIN pacientes as p on u.id=p.id_usuario WHERE u.dni=dni;
      ELSEIF EXISTS(SELECT u.id from usuarios as u JOIN medicos as m on u.id=m.id_usuario WHERE u.dni=dni) THEN
         SELECT u.id,'Medico' as 'tipo',u.dni,u.password,u.nombre,u.apellidos,u.direccion,u.telefono,u.ruta_foto,m.correo
      from usuarios as u JOIN medicos as m on u.id=m.id_usuario WHERE u.dni=dni;
        ELSEIF EXISTS(SELECT u.id from usuarios as u JOIN asistentes as a on u.id=a.id_usuario WHERE u.dni=dni) THEN
         SELECT  u.id,'Asistente' as 'tipo',u.dni,u.password,u.nombre,u.apellidos,u.direccion,u.telefono,u.ruta_foto,a.edad,a.correo,a.genero
      from usuarios as u JOIN asistentes as a on u.id=a.id_usuario WHERE u.dni=dni;
      ELSE
      SELECT 'Usuario no encontrado';
      end if;


      DELIMITER //
      CREATE PROCEDURE sp_buscar_disponibles(medico,paciente,fecha)
      COMMENT 'SP QUE BUSCA FECHAS Y HORAS LIBRES DE DE  UN MEDICO';
      IF EXISTS(SELECT p.id_usuario FROM pacientes AS p WHERE P.id_usuario=paciente) THEN
      SELECT fecha,hora_inicio,hora_fin from citas_paciente_medico as c where c.estado='disponible'




create procedure  sp_listar_horas(id int)
SELECT hora from horas_citas_paciente_medico as cpm where cpm.id_cita=id