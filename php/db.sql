drop database if exists citas;
create database citas;
  use citas;
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
create table farmaceutico(
   codigo int not null primary key,
    id_usuario int not null,
   estado int not null,
   correo varchar(100) not null,
    foreign key(id_usuario) REFERENCES usuarios(id)
    );

create table administrador(
    codigo int not null primary key,
    id_usuario int not null,
    FOREIGN key(id_usuario) REFERENCES usuarios(id)
    );
INSERT INTO `usuarios` VALUES ('1', '00000000', 'admin0', 'Admin', 'Administrador', 'admin', '000000000', 'images/Admin.png');
INSERT INTO `administrador` (`codigo`, `id_usuario`) VALUES ('1', '1');
  create table pacientes(
    codigo int not null primary key,
    id_usuario int not null,
    edad smallint not null,
    genero char(1) not null,
    foreign key (id_usuario) references usuarios(id)
  );
  create table especialidades(
                    id_esp int not null primary key,
                    especialidad varchar(100) not null 
                    );

  create table medicos(
    codigo int not null primary key,
    id_usuario int not null,
    correo varchar(100) not null,
    id_esp int not null,
    foreign key (id_usuario) references usuarios(id),
    foreign key (id_esp) references especialidades(id_esp)
  );

  create table asistentes(
    codigo int not null primary key,
    id_usuario int not null,
    edad smallint not null,
    correo varchar(100) not null,
      genero char(1) not null,
      foreign key (id_usuario) references usuarios(id)
  );

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
          );
								

    create table historial_clinico(
  id_his int not null primary key,
 id_cita int not null,
 id_medico int not null,
 id_paciente int not null,
 id_especialidad int not null,
diagnostico varchar(200) not null,
receta varchar(200) not null,
alergico char(2) not null,
descripcion_alergia varchar(300),
fecha date not null,
hora time not null,
FOREIGN key(id_cita) REFERENCES citas_paciente_medico(id_cita),
  FOREIGN key(id_medico) REFERENCES medicos(codigo),
   FOREIGN key(id_paciente) REFERENCES pacientes(codigo),
   FOREIGN key(id_especialidad) REFERENCES especialidades(id_esp)
 );
    
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
  ELSEIF EXISTS(SELECT u.id from usuarios as u join administrador as adm on 
             u.id=adm.id_usuario where u.dni=dni)THEN
  select 'Administrador' as 'tipo',adm.codigo, u.id,u.dni,u.password,u.nombre,u.apellidos,u.direccion,u.telefono,u.ruta_foto
          from usuarios as u join administrador as adm on adm.id_usuario=u.id
          where u.dni=dni;
      ELSEIF EXISTS(SELECT u.id from usuarios as u join farmaceutico as f on f.id_usuario=u.id)THEN
      
    select 'Farmaceutico' as 'tipo',f.codigo,f.correo, u.id,u.dni,u.password,u.nombre,u.apellidos,u.direccion,u.telefono,u.ruta_foto
          from usuarios as u join farmaceutico as f on f.id_usuario=u.id
          where u.dni=dni;
         ELSE
         SELECT 'error usuario no encontrado!';
      end if;


 
      /*constraints -********************  */
alter table usuarios add CONSTRAINT uq_dni_usu UNIQUE(dni);
drop procedure if exists sp_listar_citas;
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
on m.codigo=cpm.id_medico order by cpm.id_cita desc;
end if;

drop procedure if exists sp_crear_citas;
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
        end



drop procedure if exists sp_reportar_citas;
DELIMITER //
create procedure sp_reportar_citas(opcion int)
COMMENT 'sp que reporta citas'
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
on m.codigo=cpm.id_medico where cpm.estado='no asistio';
ELSEIF(opcion=2)THEN
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
ELSEIF(opcion=3)THEN
select cpm.id_cita,cpm.fecha,cpm.num_f_horas,cpm.estado,
cpm.confirmado,hcpm.id_horas,hcpm.hora,e.especialidad,u.nombre as 'pnombre',
u.apellidos as 'papellidos',u.telefono as 'ptelefono',
um.nombre as 'mnombre',um.apellidos as 'mapellidos',um.telefono as 'mtelefono'
from horas_citas_paciente_medico as hcpm 
join citas_paciente_medico as cpm 
on hcpm.id_cita=cpm.id_cita join especialidades as e
on cpm.especialidad=e.id_esp join (pacientes as p join usuarios as u on p.id_usuario=u.id) 
on p.codigo=cpm.id_paciente join(medicos as m join usuarios as um on um.id=m.id_usuario)
on m.codigo=cpm.id_medico where p.edad>=30;
ELSEIF(opcion=4)THEN
select cpm.id_cita,cpm.fecha,cpm.num_f_horas,cpm.estado,
cpm.confirmado,hcpm.id_horas,hcpm.hora,e.especialidad,u.nombre as 'pnombre',
u.apellidos as 'papellidos',u.telefono as 'ptelefono',
um.nombre as 'mnombre',um.apellidos as 'mapellidos',um.telefono as 'mtelefono'
from horas_citas_paciente_medico as hcpm 
join citas_paciente_medico as cpm 
on hcpm.id_cita=cpm.id_cita join especialidades as e
on cpm.especialidad=e.id_esp join (pacientes as p join usuarios as u on p.id_usuario=u.id) 
on p.codigo=cpm.id_paciente join(medicos as m join usuarios as um on um.id=m.id_usuario)
on m.codigo=cpm.id_medico where p.edad<18;
ELSE
select cpm.id_cita,cpm.fecha,cpm.num_f_horas,cpm.estado,
cpm.confirmado,hcpm.id_horas,hcpm.hora,e.especialidad,u.nombre as 'pnombre',
u.apellidos as 'papellidos',u.telefono as 'ptelefono',
um.nombre as 'mnombre',um.apellidos as 'mapellidos',um.telefono as 'mtelefono'
from horas_citas_paciente_medico as hcpm 
join citas_paciente_medico as cpm 
on hcpm.id_cita=cpm.id_cita join especialidades as e
on cpm.especialidad=e.id_esp join (pacientes as p join usuarios as u on p.id_usuario=u.id) 
on p.codigo=cpm.id_paciente join(medicos as m join usuarios as um on um.id=m.id_usuario)
on m.codigo=cpm.id_medico where p.edad BETWEEN 18 and 29;
end IF;
     

drop procedure if exists sp_listar_pacientes;
DELIMITER //
create PROCEDURE sp_listar_pacientes(fecha date,id int,esp int,opcion int)
COMMENT 'SP que lista los pacientes que tienen cita con un medico'
if(opcion=1) THEN
SELECT cpm.id_cita,cpm.fecha,cpm.num_f_horas,
p.codigo,p.edad,u.nombre,u.apellidos,u.direccion,
u.ruta_foto,hcpm.hora,cpm.estado,cpm.descripcion,p.codigo
from citas_paciente_medico as cpm
join pacientes as p on cpm.id_paciente=p.codigo
join usuarios as u on p.id_usuario=u.id
join horas_citas_paciente_medico as hcpm
on hcpm.id_cita=cpm.id_cita where cpm.fecha=fecha
and cpm.especialidad=esp
and cpm.estado='asistira'
order  by cpm.id_cita ASC;
ELSE
SELECT cpm.id_cita,cpm.fecha,cpm.num_f_horas,
p.codigo,p.edad,u.nombre,u.apellidos,u.direccion,
u.ruta_foto,hcpm.hora,cpm.estado,cpm.descripcion,p.codigo
from citas_paciente_medico as cpm
join pacientes as p on cpm.id_paciente=p.codigo
join usuarios as u on p.id_usuario=u.id
join horas_citas_paciente_medico as hcpm
on hcpm.id_cita=cpm.id_cita
where  cpm.fecha=fecha
and cpm.estado='asistira'
order  by cpm.id_cita ASC;
end if;
/**************************/

drop procedure if exists sp_insertar_historial;
DELIMITER //
create procedure sp_insertar_historial(
    id_h int,
    id_c int,
    id_m int,
    id_p int,
    id_es int,
    diag varchar(200),
    rec varchar(200),
    aler char(2),
    descrip varchar(300),
    fec date,
    hor time)
    comment 'sp que inserta  historial'
    if not EXISTS(SELECT id_his from historial_clinico where id_his=id_h) THEN
    update citas_paciente_medico set estado='asistio' where id_cita=id_c;
    insert into historial_clinico values(
     id_h,id_c,id_m,id_p,id_es,diag,rec,aler,descrip,fec,hor);
   ELSE
   select 'Error';
   end if;

drop procedure if exists sp_listar_historial;
   DELIMITER //
create procedure sp_listar_historial(opcion int,paciente int,medico int,fecha date)
COMMENT 'sp que lista el historial clinico'
if(opcion=1)then 
select hc.id_his,hc.id_paciente,hc.id_cita,hc.diagnostico,
hc.receta,hc.alergico,hc.descripcion_alergia,hc.fecha,hc.hora,
u.nombre,u.apellidos,e.especialidad
from historial_clinico as hc join medicos as m on 
hc.id_medico=m.codigo join usuarios as u on m.id_usuario=u.id
join especialidades as e  on hc.id_especialidad=e.id_esp;
ELSEIF(opcion=2)THEN
select hc.id_his,hc.id_paciente,hc.id_cita,hc.diagnostico,
hc.receta,hc.alergico,hc.descripcion_alergia,hc.fecha,hc.hora,
u.nombre,u.apellidos,e.especialidad
from historial_clinico as hc join medicos as m on 
hc.id_medico=m.codigo join usuarios as u on m.id_usuario=u.id
join especialidades as e  on hc.id_especialidad=e.id_esp 
where hc.id_paciente=paciente and hc.id_medico=medico;
ELSEIF(opcion=3)THEN
select hc.id_his,hc.id_paciente,hc.id_cita,hc.diagnostico,
hc.receta,hc.alergico,hc.descripcion_alergia,hc.fecha,hc.hora,
u.nombre,u.apellidos,e.especialidad
from historial_clinico as hc join medicos as m on 
hc.id_medico=m.codigo join usuarios as u on m.id_usuario=u.id
join especialidades as e  on hc.id_especialidad=e.id_esp 
where hc.id_medico=medico;
ELSE
select hc.id_his,hc.id_paciente,hc.id_cita,hc.diagnostico,
hc.receta,hc.alergico,hc.descripcion_alergia,hc.fecha,hc.hora,
u.nombre,u.apellidos,e.especialidad
from historial_clinico as hc join medicos as m on 
hc.id_medico=m.codigo join usuarios as u on m.id_usuario=u.id
join especialidades as e  on hc.id_especialidad=e.id_esp 
where hc.fecha=fecha;
end if;

/*inserts*/
INSERT INTO especialidades (id_esp, especialidad) VALUES
(1, 'Medicina General'),
(2, 'Ginecología'),
(3, 'Nutricionista'),
(4, 'Odontología'),
(5, 'Optometría'),
(6, 'Pediatría'),
(7, 'Psicología'),
(8, 'Terapia Ocupacional');


drop procedure if exists sp_crear_paciente;
DELIMITER //
create procedure sp_crear_paciente(
    id int,
    dni char(8),
    passwor char(6),
    nombre varchar(50),
    apellidos varchar(50),
    direccion varchar(200),
    telefono varchar(15),
    ruta_foto varchar(100),
    codigo int,
    edad int,
    genero char(1)
    )
    COMMENT 'sp que crea pacientes '
  if not EXISTS(SELECT u.id from usuarios as u where u.id=id)THEN
  INSERT into usuarios values (id,dni,passwor,nombre,apellidos,direccion,telefono,ruta_foto);
INSERT into pacientes VALUES(codigo,id,edad,genero);
else 
select 'Error';
end if;

DELIMITER //
create procedure sp_crear_farma(
    id int,
    dni char(8),
    passwor char(6),
    nombre varchar(50),
    apellidos varchar(50),
    direccion varchar(200),
    telefono varchar(15),
    ruta_foto varchar(100),
    codigo int,
    estado int,
    correo varchar(100)
    )
    COMMENT 'sp que crea farma '
  if not EXISTS(SELECT u.id from usuarios as u where u.id=id)THEN
  INSERT into usuarios values (id,dni,passwor,nombre,apellidos,direccion,telefono,ruta_foto);
INSERT into farmaceutico VALUES(codigo,id,estado,correo);
else 
select 'Error';
end if;

DELIMITER //
create procedure sp_modificar_farma(
    i int,
    dn char(8),
    passwor char(6),
    nombr varchar(50),
    apellido varchar(50),
    direccio varchar(200),
    telefon varchar(15),
    ruta_fot varchar(100),
    codig int,
    estad int,
    corre varchar(100)
    )
    COMMENT 'sp que modifica farma '
  if EXISTS(SELECT u.id from usuarios as u where u.id=id)THEN
  update usuarios set dni=dn,password=passwor,nombre=nombr,apellidos=apellido,direccion=direccio,
  telefono=telefon,ruta_foto=ruta_fot where id=i;
update farmaceutico set estado=estad,correo=corre where codigo=codig;
else 
select 'Error';
end if;


drop procedure if exists sp_crear_asistente;
DELIMITER //
create procedure sp_crear_asistente(
    id int,
    dni char(8),
    passwor char(6),
    nombre varchar(50),
    apellidos varchar(50),
    direccion varchar(200),
    telefono varchar(15),
    ruta_foto varchar(100),
    codigo int,
    edad int,
    correo varchar(100),
    genero char(1)
    )
    COMMENT 'sp que crea pacientes '
  if not EXISTS(SELECT u.id from usuarios as u where u.id=id)THEN
  INSERT into usuarios values (id,dni,passwor,nombre,apellidos,direccion,telefono,ruta_foto);
INSERT into asistentes VALUES(codigo,id,edad,correo,genero);
else 
select 'Error';
end if;

DELIMITER //
create procedure sp_crear_medico(
    id int,
    dni char(8),
    passwor char(6),
    nombre varchar(50),
    apellidos varchar(50),
    direccion varchar(200),
    telefono varchar(15),
    ruta_foto varchar(100)
    )
    COMMENT 'sp que crea medicos '
  if not EXISTS(SELECT u.id from usuarios as u where u.id=id)THEN
  INSERT into usuarios values (id,dni,passwor,nombre,apellidos,direccion,telefono,ruta_foto);
else 
select 'Error';
end if;


DELIMITER //
create procedure sp_modificar_medico(
    i int,
    dn char(8),
    passwo char(6),
    nombr varchar(50),
    apellido varchar(50),
    direccio varchar(200),
    telefon varchar(15),
    ruta_fot varchar(100)
    )
    COMMENT 'sp que modifica medicos '
  if EXISTS(SELECT u.id from usuarios as u where u.id=id)THEN
  update  usuarios set       dni=dn,password=passwo,nombre=nombr,apellidos=apellido,direccion=direccio,telefono=telefon,ruta_foto=ruta_fot where id =i;
else 
select 'Error';
end if;

DELIMITER //
create procedure sp_modificar_paciente(
    i int,
    dn char(8),
    passwo char(6),
    nombr varchar(50),
    apellido varchar(50),
    direccio varchar(200),
    telefon varchar(15),
    ruta_fot varchar(100),
    codig int,
    eda int,
    gener char(1)
    )
    COMMENT 'sp que modifica pacientes '
  if EXISTS(SELECT u.id from usuarios as u where u.id=id)THEN
  update usuarios set dni=dn,password=passwo,nombre=nombr,apellidos=apellido,direccion=direccio,telefono=telefon,ruta_foto=ruta_fot where id=i;
update pacientes set edad=eda,genero=gener where codigo=codig;
else 
select 'Error';
end if;


DELIMITER //
create procedure sp_modificar_asistente(
    i int,
    dn char(8),
    passwor char(6),
    nombr varchar(50),
    apellido varchar(50),
    direccio varchar(200),
    telefon varchar(15),
    ruta_fot varchar(100),
    codig int,
    eda int,
    corre varchar(100),
    gener char(1)
    )
    COMMENT 'sp que modifica pacientes '
  if EXISTS(SELECT u.id from usuarios as u where u.id=id)THEN
  update usuarios set dni=dn,password=passwor,nombre=nombr,apellidos=apellido,direccion=direccio,telefono=telefon,ruta_foto=ruta_fot where id=i;
update asistentes set edad=eda,correo=corre,genero=gener where codigo=codig;
else 
select 'Error';
end if;


/*indices **********************************/
create index ix_fec_cit on citas_paciente_medico(fecha);


  DELIMITER //
create procedure  sp_listar_notificar(fecha date , paciente int)
select cpm.id_cita,cpm.fecha,cpm.num_f_horas,cpm.estado,
cpm.confirmado,hcpm.id_horas,hcpm.hora,e.especialidad,u.nombre as 'pnombre',
u.apellidos as 'papellidos',u.telefono as 'ptelefono',
um.nombre as 'mnombre',um.apellidos as 'mapellidos',um.telefono as 'mtelefono'
from horas_citas_paciente_medico as hcpm 
join citas_paciente_medico as cpm 
on hcpm.id_cita=cpm.id_cita join especialidades as e
on cpm.especialidad=e.id_esp join (pacientes as p join usuarios as u on p.id_usuario=u.id) 
on p.codigo=cpm.id_paciente join(medicos as m join usuarios as um on um.id=m.id_usuario)
on m.codigo=cpm.id_medico  where cpm.fecha=fecha and cpm.id_paciente=paciente
and cpm.id_cita=(select id_cita from citas_paciente_medico order by id_cita desc limit 1);
call sp_listar_notificar('2016-09-24',1)
drop PROCEDURE sp_listar_notificar

