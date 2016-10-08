var adminInstance;
class Administrador{
	constructor(){
		this.btn_medico=jq("#btn_medico");
		this.btn_paciente=jq("#btn_paciente");
		this.btn_asistente=jq("#btn_asistente");
		this.btnconfig=jq("#btnconfig");
		this.btn_farmaceutico=jq("#btn_farmaceutico");
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
		/*********asistant*******/
		this.btn_guardar_asistente;
		this.nombres_a;
		this.apellidos_a;
		this.direccion_a;
		this.telefono_a;
		this.dni_asi;
		this.password_asi;
		this.genero_asi;
		this.fecha_asi;
		this.foto_asi;
		this.correo_a;
		/***************medico******/
		this.especialidad;
		this.btn_guardar_medico;
		this.nombres_m;
		this.apellidos_m;
		this.direccion_m;
		this.telefono_m;
		this.dni_med;
		this.password_med;
		this.genero_med;
		this.foto_med;
		this.correo_m;
		/**************farmaceutico**********/
				this.nombres_f;
		this.apellidos_f;
		this.direccion_f;
		this.telefono_f;
		this.dni_far;
		this.password_far;
		this.genero_far;
		this.foto_far;
		this.correo_f;
		this.btn_guardar_farma;
		/****************************/
		this.lista_especialidades;
		this.btn_new_especialidad;
		this.table_medicos;
		this.table_asistentes;
		this.table_pacientes;
		this.table_farma;
		/* vars******************/
		this.btn_cancelar;
		this.modificando_usuario=false;
		adminInstance=this;
	}
initComponents(){
	adminInstance.form_content_admin.empty().append(file_get_contents("includes/form-config.html"));
		adminInstance.initCompoenentsConfig();
	this.btn_asistente.mouseenter(function(){
	jq(this).notify("Asistente",{ position:"left",className: 'info' });
	}).click(function(){
				adminInstance.form_content_admin.empty().append(file_get_contents("includes/form-asistente.html"));
		adminInstance.initCompoenentsAsistente();
	});
	this.btn_medico.mouseenter(function(){
	jq(this).notify("Médico",{ position:"left" ,className: 'info'});
	}).click(function(){
		adminInstance.form_content_admin.empty().append(file_get_contents("includes/form-medico.html"));
		adminInstance.initCompoenentsMedico();
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
		adminInstance.form_content_admin.empty().append(file_get_contents("includes/form-config.html"));
		adminInstance.initCompoenentsConfig();
	});
	this.btn_farmaceutico.mouseenter(function(){
		jq(this).notify("Farmaceutico(a)",{ position:"left",className: 'info' });
	}).click(function(){
		adminInstance.form_content_admin.empty().append(file_get_contents("includes/form-farmaceutico.html"));
		adminInstance.initComponentsFarma();
	});
	
}
	/********************************************************************************/
	eliminarEspecialidad(obj){
		alertify.confirm("¿Seguro que desea eliminar la especialidad?",function(si){
			if(si){
				var id=obj.id.replace("espe","");
		var form=new FormData();
		form.append("id",id);
		adminInstance.ajaxAdmin("../php/eliminar_especialidad.php",form,function(data){
			try{
				var response=JSON.parse(data);
				if(response.status==1){
					jq("#liespe"+id).remove();
					adminInstance.validarInput(adminInstance.lista_especialidades,response.mensaje,'top','info');
				}else{
					adminInstance.validarInput(adminInstance.lista_especialidades,response.mensaje,'top','error');
				}
			}catch(err){
				adminInstance.validarInput(adminInstance.lista_especialidades,err,'top','error');
			}
		});
			}
		});
	}
	/********************************************************************************/
	crearEspecialidad(){
		var especialidad=jq("#txt_especialidad");
			var form=new FormData();
			if(especialidad.val()!==""){
				form.append("especialidad",especialidad.val());
		adminInstance.ajaxAdmin("../php/crear_especialidad.php",form,function(data){
			try{
				var response=JSON.parse(data);
				if(response.status==1){
					adminInstance.setEspecialidadesConfig();
					adminInstance.validarInput(adminInstance.lista_especialidades,response.mensaje,'top','info');
				}else{
					adminInstance.validarInput(adminInstance.lista_especialidades,response.mensaje,'top','error');
				}
			}catch(err){
				adminInstance.validarInput(adminInstance.lista_especialidades,err,'top','error');
			}
			});
			}else{
				adminInstance.validarInput(especialidad,"Ingrese una especialidad!",'bottom','error');
			}
	}
	/********************************************************************************/
	initComponentsFarma(){
	adminInstance.btn_guardar_farma=jq("#btn_guardar_farma").click(function(e){
			e.preventDefault();
			adminInstance.guardarFarma();
		});
		adminInstance.btn_cancelar=jq("#btn_cancelar").click(function(){
			adminInstance.modificando_usuario=false;
			adminInstance.form_content_admin.empty().append(file_get_contents("includes/form-config.html"));
		adminInstance.initCompoenentsConfig();
		});
		adminInstance.nombres_f=jq("#nombres_f");
		adminInstance.apellidos_f=jq("#apellidos_f");
		adminInstance.direccion_f=jq("#direccion_f");
		adminInstance.telefono_f=jq("#telefono_f");
		adminInstance.dni_far=jq("#dni_far");
		adminInstance.password_far=jq("#password_far");
		adminInstance.foto_far=jq("#foto_far");
			adminInstance.correo_f=jq("#correo_f");
				adminInstance.dni_far.characterCounter();
		adminInstance.password_far.characterCounter();	
	}
	/********************************************************************************/
	initCompoenentsConfig(){
		adminInstance.lista_especialidades=jq("#lista_especialidades");
		adminInstance.table_medicos=jq("#table_medicos");
		adminInstance.table_asistentes=jq("#table_asistentes");
		adminInstance.table_pacientes=jq("#table_pacientes");
		adminInstance.table_farma=jq("#table_farma");
		adminInstance.setEspecialidadesConfig();
			adminInstance.listar_medicos();
					adminInstance.listar_asistentes();
		adminInstance.listar_pacientes();
		adminInstance.listar_farma();
	}
	setEspecialidadesConfig(){
		adminInstance.ajaxAdmin("../php/listar_especialidades.php",null,function(data){
			try{
				var response=JSON.parse(data);
				if(response.status==1){
					adminInstance.lista_especialidades.empty().append(adminInstance.getAdItemEspecialidades());
					for(var i=0;i<response.num;i++){
						adminInstance.lista_especialidades.append(
						'<li class="collection-item" id="liespe'+response[i].id_esp+'"><div>'+response[i].especialidad+
							'<a href="#" class="secondary-content" id="espe'+response[i].id_esp+
					'" onclick="adminInstance.eliminarEspecialidad(this)"><i class="material-icons red-text">delete</i></a></div></li>');
					}
					adminInstance.btn_new_especialidad=jq("#btn_new_especialidad").click(function(){
						 adminInstance.crearEspecialidad();
           	});
						jq('.collapsible').collapsible({
      accordion : false 
    });
				}else{
					adminInstance.validarInput(adminInstance.lista_especialidades,"Sin especialidades",'top','error');
				}
			}catch(err){
				adminInstance.validarInput(adminInstance.lista_especialidades,err,'top','error');
			}
		});
	}
	/********************************************************************************/
	getAdItemEspecialidades(){
		return '	<li class="collection-item">'+
									'<div class="row">'+
									  ' <div class="input-field col s9 m9 l9">'+
          '<input id="txt_especialidad" type="text" class="validate" >'+
          '<label for="txt_especialidad">Especialidad</label>'+
        '</div>	<div class="col s3 m3 l3">'+
			'<a href="#!" class="secondary-content btn-floating blue " id="btn_new_especialidad">'+
										'<i class="material-icons">add</i>'+
										'</a></div></div></li>';
	}
	
	/********************************************************************************/
	initCompoenentsPaciente(){
		adminInstance.btn_guardar_paciente=jq("#btn_guardar_paciente").click(function(e){
			e.preventDefault();
			adminInstance.guardarPaciente();
		});
		adminInstance.btn_cancelar=jq("#btn_cancelar").click(function(){
			adminInstance.modificando_usuario=false;
			adminInstance.form_content_admin.empty().append(file_get_contents("includes/form-config.html"));
		adminInstance.initCompoenentsConfig();
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
				adminInstance.dni_pac.characterCounter();
		adminInstance.password_pac.characterCounter();
	}
	/*****************************************************************************/
	initCompoenentsAsistente(){
		adminInstance.btn_guardar_asistente=jq("#btn_guardar_asistente").click(function(e){
			e.preventDefault();
			adminInstance.guardarAsistente();
		});
			adminInstance.btn_cancelar=jq("#btn_cancelar").click(function(){
			adminInstance.modificando_usuario=false;
			adminInstance.form_content_admin.empty().append(file_get_contents("includes/form-config.html"));
		adminInstance.initCompoenentsConfig();
		});
		adminInstance.nombres_a=jq("#nombres_a");
		adminInstance.apellidos_a=jq("#apellidos_a");
		adminInstance.direccion_a=jq("#direccion_a");
		adminInstance.telefono_a=jq("#telefono_a");
		adminInstance.dni_asi=jq("#dni_asi");
		adminInstance.password_asi=jq("#password_asi");
		adminInstance.genero_asi=jq("#genero_asi");
		adminInstance.fecha_asi=jq("#fecha_asi");
		adminInstance.foto_asi=jq("#foto_asi");
		adminInstance.correo_a=jq("#correo_a");
		jq("select").material_select();
		jq('.datepicker').pickadate({
    selectMonths: true, 
    selectYears: 15,
			format: 'yyyy-mm-dd',
			max:new Date(),
	   today:'Hoy',
			close:'Aceptar'
  });
		adminInstance.dni_asi.characterCounter();
		adminInstance.password_asi.characterCounter();
	}
	/*****************************************************************************/
	initCompoenentsMedico(){
		adminInstance.btn_guardar_medico=jq("#btn_guardar_medico").click(function(e){
			e.preventDefault();
			adminInstance.guardarMedico();
		});
			adminInstance.btn_cancelar=jq("#btn_cancelar").click(function(){
			adminInstance.modificando_usuario=false;
			adminInstance.form_content_admin.empty().append(file_get_contents("includes/form-config.html"));
		adminInstance.initCompoenentsConfig();
		});
		adminInstance.nombres_m=jq("#nombres_m");
		adminInstance.apellidos_m=jq("#apellidos_m");
		adminInstance.direccion_m=jq("#direccion_m");
		adminInstance.telefono_m=jq("#telefono_m");
		adminInstance.dni_med=jq("#dni_med");
		adminInstance.password_med=jq("#password_med");
		adminInstance.genero_med=jq("#genero_med");
		adminInstance.foto_med=jq("#foto_med");
		adminInstance.correo_m=jq("#correo_m");
		adminInstance.especialidad=jq("#especialidad");
		adminInstance.setEspecialidad();
		jq("select").material_select();
		adminInstance.dni_med.characterCounter();
		adminInstance.password_med.characterCounter();
	}
	/*****************************************************************************/
	guardarFarma(){
			var data=new FormData();
		if(adminInstance.nombres_f.val()!==""){
			if(adminInstance.apellidos_f.val()!==""){
				if(adminInstance.direccion_f.val()!==""){
					if(adminInstance.telefono_f.val()!==""){
						if(adminInstance.dni_far.val()!==""){
							if(adminInstance.password_far.val()!==""){
									if(adminInstance.correo_f.val()!==""){
											if(adminInstance.foto_far.val()!==""){
												data.append("nombre",adminInstance.nombres_f.val());
												data.append("apellidos",adminInstance.apellidos_f.val());
												data.append("direccion",adminInstance.direccion_f.val());
												data.append("telefono",adminInstance.telefono_f.val());
												data.append("dni",adminInstance.dni_far.val());
												data.append("password",adminInstance.password_far.val());
													data.append("correo",adminInstance.correo_f.val());
												 var aux=document.getElementById("foto_far");
            var file=aux.files[0];
												data.append("foto",file);
												if(adminInstance.modificando_usuario){
													var idf_mod=localStorage.getItem("idf_mod");
													var iduf_mod=localStorage.getItem("iduf_mod");
													data.append("id_farma",idf_mod);
													data.append("id_usuario",iduf_mod);
															adminInstance.ajaxAdmin("../php/modificar_farma.php",data,function(responsejson){
													try{
														var resp=JSON.parse(responsejson);
														
														if(resp.status==1){
															
															adminInstance.modificando_usuario=false;
															jq.notify(resp.mensaje,"info");
																		adminInstance.form_content_admin.empty().append(file_get_contents("includes/form-config.html"));
		                adminInstance.initCompoenentsConfig();
																}else{
															adminInstance.validarInput(adminInstance.btn_guardar_farma,resp.mensaje,'top','error');
														}
													}catch(err){
													adminInstance.validarInput(adminInstance.btn_guardar_farma,err,'top','error');
													}
												});
													/************************************/
												}else{
													adminInstance.ajaxAdmin("../php/guardar_farma.php",data,function(responsejson){
													try{
														var resp=JSON.parse(responsejson);
														if(resp.status==1){
															adminInstance.validarInput(adminInstance.btn_guardar_farma,resp.mensaje,'top','info');
															adminInstance.form_content_admin.empty().append(file_get_contents("includes/form-config.html"));
		                adminInstance.initCompoenentsConfig();
														}else{
															adminInstance.validarInput(adminInstance.btn_guardar_farma,resp.mensaje,'top','error');
														}
													}catch(err){
													adminInstance.validarInput(adminInstance.btn_guardar_farma,err,'top','error');
													}
												});
												}
												/***************************/
											}else{
												adminInstance.validarInput(adminInstance.foto_far,"Foto de perfil requerido",'top','warn');
											}
									}else{
										adminInstance.validarInput(adminInstance.correo_f,"Email requerido",'top','warn');
									}
							}else{
								adminInstance.validarInput(adminInstance.password_far,"Contraseña requerido",'top','warn');
							}
						}else{
								adminInstance.validarInput(adminInstance.dni_far,"DNI requerido",'top','warn');
						}
					}else{
							adminInstance.validarInput(adminInstance.telefono_f,"Telefono requerido",'top','warn');
					}
				}else{
						adminInstance.validarInput(adminInstance.direccion_f,"Dirección requerido",'top','warn');
				}
			}else{
					adminInstance.validarInput(adminInstance.apellidos_f,"Apellidos requerido",'top','warn');
			}
		}else{
			adminInstance.validarInput(adminInstance.nombres_f,"Nombre requerido",'top','warn');
		}
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
											
												 var aux=document.getElementById("foto_pac");
            var file=aux.files[0];
												data.append("foto",file);
												if(adminInstance.modificando_usuario){
													var idp_mod=localStorage.getItem("idp_mod");
													var idup_mod=localStorage.getItem("idup_mod");
													data.append("id_paciente",idp_mod);
													data.append("id_usuario",idup_mod);
															adminInstance.ajaxAdmin("../php/modificar_paciente.php",data,function(responsejson){
													try{
														var resp=JSON.parse(responsejson);
														
														if(resp.status==1){
															
															adminInstance.modificando_usuario=false;
															jq.notify(resp.mensaje,"info");
																		adminInstance.form_content_admin.empty().append(file_get_contents("includes/form-config.html"));
		                adminInstance.initCompoenentsConfig();
																}else{
															adminInstance.validarInput(adminInstance.btn_guardar_paciente,resp.mensaje,'top','error');
														}
													}catch(err){
													adminInstance.validarInput(adminInstance.btn_guardar_paciente,err,'top','error');
													}
												});
												}else{
													
													adminInstance.ajaxAdmin("../php/guardar_paciente.php",data,function(responsejson){
													try{
														var resp=JSON.parse(responsejson);
														if(resp.status==1){
															adminInstance.validarInput(adminInstance.btn_guardar_paciente,resp.mensaje,'top','info');
														}else{
															adminInstance.validarInput(adminInstance.btn_guardar_paciente,resp.mensaje,'top','error');
														}
													}catch(err){
													adminInstance.validarInput(adminInstance.btn_guardar_paciente,err,'top','error');
													}
												});
												}
												/***************************/
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
	
	guardarAsistente(){
		var data=new FormData();
		if(adminInstance.nombres_a.val()!==""){
			if(adminInstance.apellidos_a.val()!==""){
				if(adminInstance.direccion_a.val()!==""){
					if(adminInstance.telefono_a.val()!==""){
						if(adminInstance.correo_a.val()!==""){
							if(adminInstance.dni_asi.val()!==""){
							if(adminInstance.password_asi.val()!==""){
									if(adminInstance.genero_asi.val()!==null){
										if(adminInstance.fecha_asi.val()!==""){
											if(adminInstance.foto_asi.val()!==""){
												data.append("nombre",adminInstance.nombres_a.val());
												data.append("apellidos",adminInstance.apellidos_a.val());
												data.append("direccion",adminInstance.direccion_a.val());
												data.append("telefono",adminInstance.telefono_a.val());
												data.append("dni",adminInstance.dni_asi.val());
												data.append("password",adminInstance.password_asi.val());
												data.append("edad",adminInstance.calculaEdad(adminInstance.fecha_asi.val()));
												data.append("genero",adminInstance.genero_asi.val());
													data.append("correo",adminInstance.correo_a.val());
												
												 var aux=document.getElementById("foto_asi");
            var file=aux.files[0];
												data.append("foto",file);
												if(adminInstance.modificando_usuario){
														var ida_mod=localStorage.getItem("ida_mod");
													var idua_mod=localStorage.getItem("idua_mod");
													data.append("id_asistente",ida_mod);
													data.append("id_usuario",idua_mod);
															adminInstance.ajaxAdmin("../php/modificar_asistente.php",data,function(responsejson){
													try{
														var resp=JSON.parse(responsejson);
														
														if(resp.status==1){
															
															adminInstance.modificando_usuario=false;
															jq.notify(resp.mensaje,"info");
																		adminInstance.form_content_admin.empty().append(file_get_contents("includes/form-config.html"));
		                adminInstance.initCompoenentsConfig();
																}else{
															adminInstance.validarInput(adminInstance.btn_guardar_medico,resp.mensaje,'top','error');
														}
													}catch(err){
													adminInstance.validarInput(adminInstance.btn_guardar_medico,err,'top','error');
													}
												});
													/*************************/
												}else{
													adminInstance.ajaxAdmin("../php/guardar_asistente.php",data,function(responsejson){
													try{
														var resp=JSON.parse(responsejson);
														if(resp.status==1){
															adminInstance.validarInput(adminInstance.btn_guardar_asistente,resp.mensaje,'top','info');
														}else{
															adminInstance.validarInput(adminInstance.btn_guardar_asistente,resp.mensaje,'top','error');
														}
													}catch(err){
													adminInstance.validarInput(adminInstance.btn_guardar_asistente,err,'top','error');
													}
												});
												}
												/********************************/
												
											}else{
												adminInstance.validarInput(adminInstance.foto_asi,"Foto de perfil requerido",'top','warn');
											}
										}else{
											adminInstance.validarInput(adminInstance.fecha_asi,"Fecha de nacimiento requerido",'top','warn');
										}
									}else{
										adminInstance.validarInput(adminInstance.genero_asi,"Genero requerido",'top','warn');
									}
							}else{
								adminInstance.validarInput(adminInstance.password_asi,"Contraseña requerido",'top','warn');
							}
						}else{
								adminInstance.validarInput(adminInstance.dni_asi,"DNI requerido",'top','warn');
						}
						}else{
							adminInstance.validarInput(adminInstance.correo_a,"Email requerido!",'top','warn');
						}
					}else{
							adminInstance.validarInput(adminInstance.telefono_a,"Telefono requerido",'top','warn');
					}
				}else{
						adminInstance.validarInput(adminInstance.direccion_a,"Dirección requerido",'top','warn');
				}
			}else{
					adminInstance.validarInput(adminInstance.apellidos_a,"Apellidos requerido",'top','warn');
			}
		}else{
			adminInstance.validarInput(adminInstance.nombres_a,"Nombre requerido",'top','warn');
		}
	}
	/*****************************************************************************/

	/*****************************************************************************/
	
	guardarMedico(){
		var data=new FormData();
		
		if(adminInstance.nombres_m.val()!==""){
			if(adminInstance.apellidos_m.val()!==""){
				if(adminInstance.direccion_m.val()!==""){
					if(adminInstance.telefono_m.val()!==""){
						if(adminInstance.correo_m.val()!==""){
							if(adminInstance.dni_med.val()!==""){
							if(adminInstance.password_med.val()!==""){
									if(adminInstance.genero_med.val()!==null){
											if(adminInstance.foto_med.val()!==""){
												data.append("nombre",adminInstance.nombres_m.val());
												data.append("apellidos",adminInstance.apellidos_m.val());
												data.append("direccion",adminInstance.direccion_m.val());
												data.append("telefono",adminInstance.telefono_m.val());
												data.append("dni",adminInstance.dni_med.val());
												data.append("password",adminInstance.password_med.val());
												data.append("genero",adminInstance.genero_med.val());
													data.append("correo",adminInstance.correo_m.val());
												var espearr=adminInstance.especialidad.val();
												var arr=(espearr+'').split(",");
												var tam_esp=arr.length;
												for(var i=0;i<tam_esp;i++){
													data.append("id_esp"+i,arr[i]);
												}
											
												data.append("tam_esp",tam_esp);
												 var aux=document.getElementById("foto_med");
                                           var file=aux.files[0];
												data.append("foto",file);
												
											
												if(adminInstance.modificando_usuario){
													  
													var idm_mod=localStorage.getItem("idm_mod");
													var idum_mod=localStorage.getItem("idum_mod");
													data.append("id_medico",idm_mod);
													data.append("id_usuario",idum_mod);
															adminInstance.ajaxAdmin("../php/modificar_medico.php",data,function(responsejson){
													try{
														var resp=JSON.parse(responsejson);
														
														if(resp.status==1){
															
															adminInstance.modificando_usuario=false;
															jq.notify(resp.mensaje,"info");
												   	adminInstance.form_content_admin.empty().append(file_get_contents("includes/form-config.html"));
		             adminInstance.initCompoenentsConfig();
														}else{
															adminInstance.validarInput(adminInstance.btn_guardar_medico,resp.mensaje,'top','error');
														}
													}catch(err){
													adminInstance.validarInput(adminInstance.btn_guardar_medico,err,'top','error');
													}
												});
													
												}else{
														adminInstance.ajaxAdmin("../php/guardar_medico.php",data,function(responsejson){
													try{
														var resp=JSON.parse(responsejson);
														if(resp.status==1){
															adminInstance.validarInput(adminInstance.btn_guardar_medico,resp.mensaje,'top','info');
														}else{
															adminInstance.validarInput(adminInstance.btn_guardar_medico,resp.mensaje,'top','error');
														}
													}catch(err){
													adminInstance.validarInput(adminInstance.btn_guardar_medico,err,'top','error');
													}
												});
												}
											
												
												/********************************************/
											}else{
												adminInstance.validarInput(adminInstance.foto_med,"Foto de perfil requerido",'top','warn');
											}
									}else{
										adminInstance.validarInput(adminInstance.genero_med,"Genero requerido",'top','warn');
									}
							}else{
								adminInstance.validarInput(adminInstance.password_med,"Contraseña requerido",'top','warn');
							}
						}else{
								adminInstance.validarInput(adminInstance.dni_med,"DNI requerido",'top','warn');
						}
						}else{
							adminInstance.validarInput(adminInstance.correo_m,"Email requerido!",'top','warn');
						}
					}else{
							adminInstance.validarInput(adminInstance.telefono_m,"Telefono requerido",'top','warn');
					}
				}else{
						adminInstance.validarInput(adminInstance.direccion_m,"Dirección requerido",'top','warn');
				}
			}else{
					adminInstance.validarInput(adminInstance.apellidos_m,"Apellidos requerido",'top','warn');
			}
		}else{
			adminInstance.validarInput(adminInstance.nombres_m,"Nombre requerido",'top','warn');
		}
	}
	/*****************************************************************************/
	setEspecialidad(){
		adminInstance.ajaxAdmin("../php/listar_especialidades.php",null,function(data){
			try{
				var response=JSON.parse(data);
				if(response.status==1){
					adminInstance.especialidad.empty().append('<option value="0" disabled selected>Seleccione su especialidad</option>');
					for(var i=0;i<response.num;i++){
						adminInstance.especialidad.append('<option value="'+response[i].id_esp+'">'+response[i].especialidad+'</option>');
						
					}
					jq("select").material_select();
				}else{
					adminInstance.validarInput(adminInstance.especialidad,"Sin especialidades",'top','error');
				}
			}catch(err){
				adminInstance.validarInput(adminInstance.especialidad,err,'top','error');
			}
		});
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
	listar_farma(){
		adminInstance.ajaxAdmin("../php/listar_farma.php",null,function(data){
			try{
				var res=JSON.parse(data);
					adminInstance.table_farma.empty();
				if(res.status==1){
				
					for(var i=0;i<res.num;i++){
						adminInstance.setTableFarma(i+1,res[i].dni,
												adminInstance.getChipFoto(res[i].ruta_foto,res[i].nom_ap),
												res[i].direccion,
												res[i].telefono,
												res[i].correo,
												res[i].codigo,
												adminInstance.getAtionTableFarma(res[i].codigo,res[i].id));
					}
					 
				}else{
						adminInstance.validarInput(adminInstance.table_farma,res.mensaje,'top','error');
				}
			}catch(err){
				adminInstance.validarInput(adminInstance.table_farma,err,'top','error');
			}
			
		});
	}
	/*****************************************************************************/
		setTableFarma(id,dni,nom_ape,dir,tel,email,id_far,action){
		adminInstance.table_farma.append('<tr id="trfar'+id_far+'">'+
						'<td>'+id+'</td>'+
					'<td>'+dni+'</td>'+
				 	'<td>'+nom_ape+'</td>'+
						'<td>'+dir+'</td>'+
						'<td>'+tel+'</td>'+
						'<td>'+email+'</td>'+
				  	'<td>'+action+'</td>'+
		           '</tr>');
	}
	/*****************************************************************************/
		getAtionTableFarma(id,id_usu){
		return '<a class="btn-floating  waves-effect waves-light red" id="eliminarfar'+id+'" onclick="adminInstance.eliminarFarma(this)" name="eliminarusu_far'+id_usu+'">'+
			'<i class="material-icons">delete</i></a>'+
			'<a class="btn-floating waves-effect waves-light blue" id="modificarfar'+id+'" onclick="adminInstance.modificarFarma(this)" name="modificarusu_far'+id_usu+'">'+
			'<i class="material-icons">create</i></a>';
	}
	/*****************************************************************************/
	eliminarFarma(obj){
		var id=obj.id.replace("eliminarfar","");
		var id_usu=obj.name.replace("eliminarusu_far","");
		alertify.confirm("¿Seguro que desea eliminar?",function(e){
			if(e){
				var form=new FormData();
				form.append("codigo",id);
				form.append("id_usu",id_usu);
				adminInstance.ajaxAdmin("../php/eliminar_Farma.php",form,function(data){
					try{
						var response=JSON.parse(data);
						if(response.status==1){
							adminInstance.validarInput(adminInstance.table_farma,response.mensaje,'top','success');
							adminInstance.listar_farma();
						}else{
							adminInstance.validarInput(adminInstance.table_farma,response.mensaje,'top','error');
						}
					}catch(e){
					adminInstance.validarInput(adminInstance.table_farma,e,'top','error');	
					}
				});
			}
		});
	}
	/*****************************************************************************/
	modificarFarma(obj){
			var id=obj.id.replace("modificarfar","");
			var far=obj.name.replace("modificarusu_far","");
			localStorage.setItem("idf_mod",id);
			localStorage.setItem("iduf_mod",far);
			adminInstance.modificando_usuario=true;
		adminInstance.form_content_admin.empty().append(file_get_contents("includes/form-farmaceutico.html"));
		adminInstance.initComponentsFarma();
		
	}
	/*****************************************************************************/
	listar_medicos(){
		adminInstance.ajaxAdmin("../php/listar_medicos.php",null,function(data){
			try{
				var res=JSON.parse(data);
				if(res.status==1){
					adminInstance.table_medicos.empty();
					for(var i=0;i<res.num;i++){
						adminInstance.setTableMedicos(i+1,res[i].dni,
												adminInstance.getChipFoto(res[i].ruta_foto,res[i].nom_ap),
												res[i].direccion,
												res[i].telefono,
												res[i].correo,
												res[i].codigo,
												adminInstance.getEspecialidadesMedico(res[i],res[i].num_f_esp,i),
												adminInstance.getAtionTableMedicos(res[i].codigo,res[i].id));
					}
					 jq('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false,
      hover: true, 
      gutter: 0,
      belowOrigin: false,
      alignment: 'left'
    }
  );
				}else{
						adminInstance.validarInput(adminInstance.table_medicos,res.mensaje,'top','error');
				}
			}catch(err){
				adminInstance.validarInput(adminInstance.table_medicos,err,'top','error');
			}
			
		});
	}
	/*****************************************************************************/
	getEspecialidadesMedico(object,num,id){
		var item='<ul id="dropdown'+id+'" class="dropdown-content">';
		for(var j=0;j<num;j++){
			item+='<li><a href="#">'+object[j].especialidad+'</a></li>';
		}
		item+='</ul>'+
  '<a class="btn dropdown-button" href="#" data-activates="dropdown'+id+'">'+
			'<i class="material-icons">school</i><i class="mdi-navigation-arrow-drop-down right"></i></a>';
		return item;
	}
	/*****************************************************************************/
	setTableMedicos(id,dni,nom_ape,dir,tel,email,id_med,especialidad,action){
		adminInstance.table_medicos.append('<tr id="trmed'+id_med+'">'+
						'<td>'+id+'</td>'+
					'<td>'+dni+'</td>'+
				 	'<td>'+nom_ape+'</td>'+
						'<td>'+dir+'</td>'+
						'<td>'+tel+'</td>'+
						'<td>'+email+'</td>'+
						'<td>'+especialidad+'</td>'+
				  	'<td>'+action+'</td>'+
		           '</tr>');
	}
	/********************************************************************************/
	getAtionTableMedicos(id,id_usu){
		return '<a class="btn-floating  waves-effect waves-light red" id="eliminarmed'+id+'" onclick="adminInstance.eliminarMedico(this)" name="eliminarusu'+id_usu+'">'+
			'<i class="material-icons">delete</i></a>'+
			'<a class="btn-floating waves-effect waves-light blue" id="modificarmed'+id+'" onclick="adminInstance.modificarMedico(this)" name="modificarusu'+id_usu+'">'+
			'<i class="material-icons">create</i></a>';
	}
	/*****************************************************************************/
	getChipFoto(ruta,nom){
		return ' <div class="chip">'+
    '<img src="../'+ruta+'" >'+nom+'</div>';
	}
	/*****************************************************************************/
	eliminarMedico(obj){
		var id=obj.id.replace("eliminarmed","");
		var id_usu=obj.name.replace("eliminarusu","");
		alertify.confirm("¿Seguro que desea eliminar?",function(e){
			if(e){
				var form=new FormData();
				form.append("codigo",id);
				form.append("id_usu",id_usu);
				adminInstance.ajaxAdmin("../php/eliminar_medico.php",form,function(data){
					try{
						var response=JSON.parse(data);
						if(response.status==1){
							adminInstance.validarInput(adminInstance.table_medicos,response.mensaje,'top','success');
							adminInstance.listar_medicos();
						}else{
							adminInstance.validarInput(adminInstance.table_medicos,response.mensaje,'top','error');
						}
					}catch(e){
					adminInstance.validarInput(adminInstance.table_medicos,e,'top','error');	
					}
				});
			}
		});
	}
	/*****************************************************************************/
		modificarMedico(obj){
		var id=obj.id.replace("modificarmed","");
			var med=obj.name.replace("modificarusu","");
			localStorage.setItem("idm_mod",id);
			localStorage.setItem("idum_mod",med);
			adminInstance.modificando_usuario=true;
			adminInstance.form_content_admin.empty().append(file_get_contents("includes/form-medico.html"));
		adminInstance.initCompoenentsMedico();
		

	}
	/*****************************************************************************/
	listar_asistentes(){
		adminInstance.ajaxAdmin("../php/listar_asistentes.php",null,function(data){
			try{
				var res=JSON.parse(data);
				if(res.status==1){
					adminInstance.table_asistentes.empty();
					for(var i=0;i<res.num;i++){
						adminInstance.setTableAsistentes(i+1,res[i].dni,
												adminInstance.getChipFoto(res[i].ruta_foto,res[i].nom_ap),
												res[i].direccion,
												res[i].telefono,
												res[i].edad,
												res[i].correo,
												res[i].genero,
											  res[i].codigo,
												adminInstance.getAtionTableAsistentes(res[i].codigo,res[i].id));
					}
				}else{
						adminInstance.validarInput(adminInstance.table_medicos,res.mensaje,'top','error');
				}
			}catch(err){
				adminInstance.validarInput(adminInstance.table_medicos,err,'top','error');
			}
			
		});
	}
	/*****************************************************************************/
	setTableAsistentes(id,dni,nom_ape,dir,tel,edad,email,genero,id_asis,action){
		adminInstance.table_asistentes.append('<tr id="trasi'+id_asis+'">'+
						'<td>'+id+'</td>'+
					'<td>'+dni+'</td>'+
				 	'<td>'+nom_ape+'</td>'+
						'<td>'+dir+'</td>'+
						'<td>'+tel+'</td>'+
					'<td>'+edad+'</td>'+
						'<td>'+email+'</td>'+
						'<td>'+genero+'</td>'+
				  	'<td>'+action+'</td>'+
		           '</tr>');
	}
	/*****************************************************************************/
	getAtionTableAsistentes(id,id_usu){
			return '<a class="btn-floating  waves-effect waves-light red" id="eliminarasi'+id+'" onclick="adminInstance.eliminarAsistente(this)" name="eliminarusu_asi'+id_usu+'">'+
			'<i class="material-icons">delete</i></a>'+
			'<a class="btn-floating waves-effect waves-light blue" id="modificarasi'+id+'" onclick="adminInstance.modificarAsistente(this)" name="modificarusu_asi'+id_usu+'">'+
			'<i class="material-icons">create</i></a>';
	}
	/*****************************************************************************/
	modificarAsistente(obj){
		var id=obj.id.replace("modificarasi","");
			var asi=obj.name.replace("modificarusu_asi","");
			localStorage.setItem("ida_mod",id);
			localStorage.setItem("idua_mod",asi);
			adminInstance.modificando_usuario=true;
		adminInstance.form_content_admin.empty().append(file_get_contents("includes/form-asistente.html"));
		adminInstance.initCompoenentsAsistente();
	}
	/*****************************************************************************/
	eliminarAsistente(obj){
		
			var id=obj.id.replace("eliminarasi","");
		var id_usu=obj.name.replace("eliminarusu_asi","");
		alertify.confirm("¿Seguro que desea eliminar?",function(e){
			if(e){
				var form=new FormData();
				form.append("codigo",id);
				form.append("id_usu",id_usu);
				adminInstance.ajaxAdmin("../php/eliminar_asistente.php",form,function(data){
					try{
						var response=JSON.parse(data);
						if(response.status==1){
							adminInstance.validarInput(adminInstance.table_asistentes,response.mensaje,'top','success');
							adminInstance.listar_asistentes();
						}else{
							adminInstance.validarInput(adminInstance.table_asistentes,response.mensaje,'top','error');
						}
					}catch(e){
					adminInstance.validarInput(adminInstance.table_asistentes,e,'top','error');	
					}
				});
			}
		});
	}
	/*****************************************************************************/
	listar_pacientes(){
		adminInstance.ajaxAdmin("../php/listar_pacientes.php",null,function(data){
			try{
				var res=JSON.parse(data);
				if(res.status==1){
					adminInstance.table_pacientes.empty();
					for(var i=0;i<res.num;i++){
						adminInstance.setTablePacientes(i+1,
													res[i].dni,
												adminInstance.getChipFoto(res[i].ruta_foto,res[i].nom_ap),
												res[i].direccion,
												res[i].telefono,
												res[i].edad,
												res[i].genero,
											  res[i].codigo,
												adminInstance.getAtionTablePacientes(res[i].codigo,res[i].id));
					}
				}else{
						adminInstance.validarInput(adminInstance.table_medicos,res.mensaje,'top','error');
				}
			}catch(err){
				adminInstance.validarInput(adminInstance.table_medicos,err,'top','error');
			}
			
		});
	}
	/*****************************************************************************/
	setTablePacientes(id,dni,nom_ape,dir,tel,edad,genero,id_asis,action){
		adminInstance.table_pacientes.append('<tr id="trpac'+id_asis+'">'+
						'<td>'+id+'</td>'+
					'<td>'+dni+'</td>'+
				 	'<td>'+nom_ape+'</td>'+
						'<td>'+dir+'</td>'+
						'<td>'+tel+'</td>'+
					'<td>'+edad+'</td>'+
						'<td>'+genero+'</td>'+
				  	'<td>'+action+'</td>'+
		           '</tr>');
	}
	/*****************************************************************************/
		getAtionTablePacientes(id,id_usu){
			return '<a class="btn-floating  waves-effect waves-light red" id="eliminarpac'+id+'" onclick="adminInstance.eliminarPaciente(this)" name="eliminarusu_pac'+id_usu+'">'+
			'<i class="material-icons">delete</i></a>'+
			'<a class="btn-floating waves-effect waves-light blue" id="modificarpac'+id+'" onclick="adminInstance.modificarPaciente(this)" name="modificarusu_pac'+id_usu+'">'+
			'<i class="material-icons">create</i></a>';
	}
	/*****************************************************************************/
	eliminarPaciente(obj){
		
		var id=obj.id.replace("eliminarpac","");
		var id_usu=obj.name.replace("eliminarusu_pac","");
		alertify.confirm("¿Seguro que desea eliminar?",function(e){
			if(e){
				var form=new FormData();
				form.append("codigo",id);
				form.append("id_usu",id_usu);
				adminInstance.ajaxAdmin("../php/eliminar_paciente.php",form,function(data){
					try{
						var response=JSON.parse(data);
						if(response.status==1){
							adminInstance.validarInput(adminInstance.table_pacientes,response.mensaje,'top','success');
							adminInstance.listar_pacientes();
						}else{
							adminInstance.validarInput(adminInstance.table_pacientes,response.mensaje,'top','error');
						}
					}catch(e){
					adminInstance.validarInput(adminInstance.table_pacientes,e,'top','error');	
					}
				});
			}
		});
	}
	/*****************************************************************************/
	modificarPaciente(obj){
				var id=obj.id.replace("modificarpac","");
			var pac=obj.name.replace("modificarusu_pac","");
			localStorage.setItem("idp_mod",id);
			localStorage.setItem("idup_mod",pac);
			adminInstance.modificando_usuario=true;
		adminInstance.form_content_admin.empty().append(file_get_contents("includes/form-paciente.html"));
		adminInstance.initCompoenentsPaciente();
	}
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