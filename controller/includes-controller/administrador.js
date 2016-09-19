var adminInstance;
class Administrador{
	constructor(){
		this.btn_medico=jq("#btn_medico");
		this.btn_paciente=jq("#btn_paciente");
		this.btn_asistente=jq("#btn_asistente");
		this.btnconfig=jq("#btnconfig");
		this.form_content_admin=jq("#form_content_admin");
		this.btn_guardar_paciente;
		this.nombres_p;
		this.apellidos_p;
		this.direccion_p;
		this.telefono_p;
		this.dni_pac;
		this.password_pac;
		this.genero_pac;
		this.fecha_pac;
		this.foto_pac;
		adminInstance=this;
	}
initComponents(){
	this.btn_asistente.mouseenter(function(){
	jq(this).notify("Asistente",{ position:"left",className: 'info' });
	}).click(function(){
		adminInstance.guardarPaciente();
	});
	this.btn_medico.mouseenter(function(){
	jq(this).notify("Medico",{ position:"left" ,className: 'info'});
	}).click(function(){
		
	});
	this.btn_paciente.mouseenter(function(){
	jq(this).notify("Paciente",{ position:"left",className: 'info' });
	}).click(function(){
		adminInstance.form_content_admin.empty().append(file_get_contents("includes/form-paciente.html"));
		adminInstance.initCompoenentsPaciente();
		
	});
	this.btnconfig.mouseenter(function(){
	jq(this).notify("Configuración",{ position:"left",className: 'info' });
	}).click(function(){
		
	});
	
}
	initCompoenentsPaciente(){
		adminInstance.btn_guardar_paciente=jq("#btn_guardar_paciente").click(function(e){
			e.preventDefault();
			adminInstance.guardarPaciente();
		});
		adminInstance.nombres_p=jq("#nombres_p");
		adminInstance.apellidos_p=jq("#apellidos_p");
		adminInstance.direccion_p=jq("#direccion_p");
		adminInstance.telefono_p=jq("#telefono_p");
		adminInstance.dni_pac=jq("#dni_pac");
		adminInstance.password_pac=jq("#password_pac");
		adminInstance.genero_pac=jq("#genero_pac");
		adminInstance.fecha_pac=jq("#fecha_pac");
		adminInstance.foto_pac=jq("#foto_pac");
		jq("select").material_select();
		jq('.datepicker').pickadate({
    selectMonths: true, 
    selectYears: 15,
			format: 'yyyy-mm-dd',
			max:new Date(),
	   today:'Hoy',
			close:'Aceptar'
  });
	}
	/*****************************************************************************/
	guardarPaciente(){
		var data=new FormData();
		if(adminInstance.nombres_p.val()!==""){
			if(adminInstance.apellidos_p.val()!==""){
				if(adminInstance.direccion_p.val()!==""){
					if(adminInstance.telefono_p.val()!==""){
						if(adminInstance.dni_pac.val()!==""){
							if(adminInstance.password_pac.val()!==""){
									if(adminInstance.genero_pac.val()!==null){
										if(adminInstance.fecha_pac.val()!==""){
											if(adminInstance.foto_pac.val()!==""){
												data.append("nombre",adminInstance.nombres_p.val());
												data.append("apellidos",adminInstance.apellidos_p.val());
												data.append("direccion",adminInstance.direccion_p.val());
												data.append("telefono",adminInstance.telefono_p.val());
												data.append("dni",adminInstance.dni_pac.val());
												data.append("password",adminInstance.password_pac.val());
												data.append("edad",adminInstance.calculaEdad(adminInstance.fecha_pac.val()));
												data.append("genero",adminInstance.genero_pac.val());
												data.append("opcion",1);
												 var aux=document.getElementById("foto_pac");
            var file=aux.files[0];
												data.append("foto",file);
												adminInstance.ajaxAdmin("../php/guardar_usuario.php",data,function(datos){
													try{
														var resp=JSON.parse(datos);
														if(resp.status==1){
															adminInstance.validarInput(adminInstance.btn_guardar_paciente,resp.mensaje,'top','info');
														}else{
															adminInstance.validarInput(adminInstance.btn_guardar_paciente,resp.mensaje,'top','error');
														}
													}catch(err){
													adminInstance.validarInput(adminInstance.btn_guardar_paciente,err,'top','error');
													}
												});
											}else{
												adminInstance.validarInput(adminInstance.foto_pac,"Foto de perfil requerido",'top','warn');
											}
										}else{
											adminInstance.validarInput(adminInstance.fecha_pac,"Fecha de nacimiento requerido",'top','warn');
										}
									}else{
										adminInstance.validarInput(adminInstance.genero_pac,"Genero requerido",'top','warn');
									}
							}else{
								adminInstance.validarInput(adminInstance.password_pac,"Contraseña requerido",'top','warn');
							}
						}else{
								adminInstance.validarInput(adminInstance.dni_pac,"DNI requerido",'top','warn');
						}
					}else{
							adminInstance.validarInput(adminInstance.telefono_p,"Telefono requerido",'top','warn');
					}
				}else{
						adminInstance.validarInput(adminInstance.direccion_p,"Dirección requerido",'top','warn');
				}
			}else{
					adminInstance.validarInput(adminInstance.apellidos_p,"Apellidos requerido",'top','warn');
			}
		}else{
			adminInstance.validarInput(adminInstance.nombres_p,"Nombre requerido",'top','warn');
		}
	}
	/*****************************************************************************/
	validarInput(input,msj,pos,typ){
		input.notify(msj,{ position:pos,className:typ });
	}
	/*****************************************************************************/
	calculaEdad(date){
		var time=new Date();
		var year=date.split("-");
		var edad=time.getFullYear()-year[0];
		return edad;
	}
	/*****************************************************************************/
	/*****************************************************************************/
	/*****************************************************************************/
	/*****************************************************************************/
	/*****************************************************************************/
	/*****************************************************************************/
	/*****************************************************************************/
	ajaxAdmin(ruta,form,responsefuncion){
		jq.ajax({
               async:true,
                contentType:"application/x-www-form-urlencoded",
                url:ruta,
                type: "post",
                dataType: "html",
                data:form,
                cache: false,
                contentType: false,
	               processData: false,
                success:responsefuncion,
                timeout:5000,
                error:function(){
                	jq.notify("Problemas en el servidor!","error");
                }
            });
	}
}//end  class