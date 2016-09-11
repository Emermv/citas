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
       id_asistente int,
       fecha date not null,
      especialidad int not null,
      descripcion varchar(500),
      estado varchar(20) not null,
      motivo_inasistencia varchar(500),
      num_f_horas int not null,
    confirmado char(2) not null,
      foreign key(especialidad) references especialidades(id_esp),
     FOREIGN key(id_medico) REFERENCES medicos(codigo),
    FOREIGN key(id_paciente) REFERENCES pacientes(codigo),
    FOREIGN key(id_asistente) REFERENCES asistentes(codigo)
      );
      alter table citas_paciente_medico add INDEX(fecha,estado,num_f_horas);
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
      SELECT p.codigo,'Paciente' as 'tipo',u.dni,u.password,u.nombre,u.apellidos,u.direccion,u.telefono,u.ruta_foto,p.edad,p.genero
      from usuarios as u JOIN pacientes as p on u.id=p.id_usuario WHERE u.dni=dni;
      ELSEIF EXISTS(SELECT u.id from usuarios as u JOIN medicos as m on u.id=m.id_usuario WHERE u.dni=dni) THEN
         SELECT m.codigo,'Medico' as 'tipo',u.dni,u.password,u.nombre,u.apellidos,u.direccion,u.telefono,u.ruta_foto,m.correo
      from usuarios as u JOIN medicos as m on u.id=m.id_usuario WHERE u.dni=dni;
        ELSEIF EXISTS(SELECT u.id from usuarios as u JOIN asistentes as a on u.id=a.id_usuario WHERE u.dni=dni) THEN
         SELECT  a.codigo,'Asistente' as 'tipo',u.dni,u.password,u.nombre,u.apellidos,u.direccion,u.telefono,u.ruta_foto,a.edad,a.correo,a.genero
      from usuarios as u JOIN asistentes as a on u.id=a.id_usuario WHERE u.dni=dni;
      ELSE
      SELECT 'Usuario no encontrado';
      end if;


      DELIMITER //
      CREATE PROCEDURE sp_buscar_disponibles(medico,paciente,fecha)
      COMMENT 'SP QUE BUSCA FECHAS Y HORAS LIBRES DE DE  UN MEDICO';
      IF EXISTS(SELECT p.id_usuario FROM pacientes AS p WHERE P.id_usuario=paciente) THEN
      SELECT fecha,hora_inicio,hora_fin from citas_paciente_medico as c where c.estado='disponible'


DELIMITER //
create procedure sp_listar_citas(fecha date,opcion int)
COMMENT 'sp que lista las citas por fecha o todo'
if(opcion=1) THEN
select cpm.id_cita,cpm.fecha,cpm.num_f_horas,cpm.estado,
cpm.confirmado,hcpm.id_horas,hcpm.hora,e.especialidad,u.nombre as 'pnombre',
u.apellidos as 'papellidos',u.telefono as 'ptelefono',
um.nombre as 'mnombre',um.apellidos as 'mapellidos',um.telefono as 'mtelefono'
from horas_citas_paciente_medico as hcpm 
join citas_paciente_medico as cpm 
on hcpm.id_cita=cpm.id_cita join especialidades as e
on cpm.especialidad=e.id_esp join (pacientes as p join usuarios as u on p.id_usuario=u.id) 
on p.codigo=cpm.id_paciente join(medicos as m join usuarios as um on um.id=m.id_usuario)
on m.codigo=cpm.id_medico where cpm.fecha=fecha order by cpm.id_cita DESC;
else 
select cpm.id_cita,cpm.fecha,cpm.num_f_horas,cpm.estado,
cpm.confirmado,hcpm.id_horas,hcpm.hora,e.especialidad,u.nombre as 'pnombre',
u.apellidos as 'papellidos',u.telefono as 'ptelefono',
um.nombre as 'mnombre',um.apellidos as 'mapellidos',um.telefono as 'mtelefono'
from horas_citas_paciente_medico as hcpm 
join citas_paciente_medico as cpm 
on hcpm.id_cita=cpm.id_cita join especialidades as e
on cpm.especialidad=e.id_esp join (pacientes as p join usuarios as u on p.id_usuario=u.id) 
on p.codigo=cpm.id_paciente join(medicos as m join usuarios as um on um.id=m.id_usuario)
on m.codigo=cpm.id_medico where cpm.estado='asistio';
end if;


 DELIMITER //
create PROCEDURE sp_crear_citas(
    id_c int,
    id_m int,
    id_p int,
    fecha date,
    id_esp int,
    des varchar(500),
    est varchar(20),
    num_f int,
    confir char(2)
    ) 
    BEGIN
    if not EXISTS(SELECT id_cita from citas_paciente_medico as c WHERE c.id_cita=id_c) THEN
    insert into citas_paciente_medico(
        id_cita,id_medico,id_paciente,fecha,
        especialidad,descripcion,estado,num_f_horas,confirmado)
        values (id_c,id_m,id_p,fecha,id_esp,des,est,num_f,confir);
        else 
        SELECT 'Error esta cita ya fue creado';
        end if;
        end//