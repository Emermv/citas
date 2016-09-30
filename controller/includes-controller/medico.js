   var mediconewInstance;
     class Medico{
	  constructor(){
				this.horasA_m=jq("#horasA_m");
				this.especialidades_m=jq("#especialidades_m");
				this.datepickerContent=jq("#datepickerContent").draggable();
				this.content_citas_medico=jq("#content_citas_medico");
				this.li_content_citas_medico=jq("#li_content_citas_medico");
				this.li_content_citas_historial=jq("#li_content_citas_historial");
				this.content_historial_paciente=jq("#content_historial_paciente");
				jq("#btn_listar_all_historial").click(function(){
					mediconewInstance.listar_all_historial();
				});
				mediconewInstance=this;
   jq('select').material_select();
				jq('.collapsible').collapsible({
      accordion : false
    });
				this.hora_total_add=jq("#hora_total_add");
				this.hora_total=jq("#hora_total");
    /***********************************/
    this.horas_seleccionadas_A=0;
				this.horas_seleccionadas_B=0;
    /*************************/
    this.datepicker_m=jq( "#datepicker_m" ).datepicker({
	inline: true,
monthNames: ['Enero', 'Febrero', 'Marzo',
'Abril', 'Mayo', 'Junio',
'Julio', 'Agosto', 'Septiembre',
'Octubre', 'Noviembre', 'Diciembre'],
dayNamesMin: ['Dom', 'Lun','Mar', 'Mier', 'Jue', 'Vier', 'Sab'],
onSelect: function (date) {
	mediconewInstance.listarPacientesCitas_m(date);
},
firstDay: 1,
dateFormat: "yy-mm-dd",
showButtonPanel: true,
minDate:new Date()
});
var btn_guardar_paciente=jq("#btn_guardar_paciente");
btn_guardar_paciente.click(function(e){
 e.preventDefault();
 alertify.success("siiii!!");
 });
	
	  }
		/********************************************************************************/
				listarPacientesCitas_m(date){
					var form=new FormData();
	var id_medico=Base64.decode(localStorage.getItem("id"));
	 var id_esp=mediconewInstance.especialidades_m.val();
	
	if(id_esp!==null){
		if(id_medico!==null){
			form.append("opcion",1);
		form.append("id_medico",id_medico);
		form.append("fecha",date);
		form.append("especialidad",id_esp);
		var url="../php/listar_pacientes_para_medico.php";
		mediconewInstance.ajaxFromMedico(url,form,mediconewInstance.successListadoPacientes);
		}else{
			jq.notify("Error!","warn");
		}
	}else{
		jq.notify("Seleccione una especialidad","warn");
	}
	
				}
		/********************************************************************************/
						successListadoPacientes(data){
						try{
							var resp=JSON.parse(data);
							mediconewInstance.content_citas_medico.empty();
							if(resp.status==1){
								  
						   for(var i=0;i<resp.num;i++){
										mediconewInstance.setcontent_citas_medico(
											mediconewInstance.content_citas_medico,
											i+1,
											resp[i].nombre,
											resp[i].apellidos,
											resp[i].edad,
											resp[i].direccion,
											resp[i].fecha,
											mediconewInstance.getHorasFromCitas(resp[i],resp[i].num_f_horas,i),
											resp[i].estado,
											mediconewInstance.getDescripcionModal(resp[i].descripcion,i),
											mediconewInstance.getChipFoto(resp[i].ruta_foto,resp[i].nombre),
											mediconewInstance.getAccionFromCitas(resp[i].id_cita,resp[i].estado,resp[i].codigo_pac),
											resp[i].id_cita);//end  set 
									}	
								/*init new  elements***/
								mediconewInstance.initDropdownHoras();
								jq('.modal-trigger').leanModal();
								jq('textarea').characterCounter();
								//jq('.chips').material_chip();
								mediconewInstance.li_content_citas_historial.removeClass("active");
								mediconewInstance.li_content_citas_medico.addClass("active");
								jq('.collapsible').collapsible({ accordion : false });
								jq('.tooltipped').tooltip({delay: 50});
								jq('select').material_select();
							}else{
								jq.notify(resp.mensaje,"error");
							}
						}catch(err){
							console.error(err);
						}
						}
		/********************************************************************************/
						setcontent_citas_medico(tabla,id,nombre,ape,edad,direccion,fecha,hora,estado,desc,foto,det,id_cita){
							tabla.append('<tr id="tritem'+id_cita+'">'+
								           '<td>'+id+'</td>'+
																			'<td>'+nombre+'</td>'+
								            '<td>'+ape+'</td>'+
								           '<td>'+edad+'</td>'+
						            '<td>'+direccion+'</td>'+
							            '<td>'+fecha+'</td>'+
								          '<td>'+hora+'</td>'+
																		'<td>'+estado+'</td>'+
																		'<td>'+desc+'</td>'+
								          '<td>'+foto+'</td>'+
																			'<td>'+det+'</td>'+
																				'</tr>');
						}
		/********************************************************************************/
						getChipFoto(src,name){
							return '<div class="chip">'+
    '<img src="../'+src+'">'+name+'</div>';
						}
						getHorasFromCitas(object,num,id){
		var item='<ul id="dropdown'+id+'" class="dropdown-content">';
		for(var j=0;j<num;j++){
			item+='<li><a href="#">'+object[j].hora+'</a></li>';
		}
		item+='</ul>'+
  '<a class="btn-floating dropdown-button" href="#" data-activates="dropdown'+id+'">'+
			'<i class="material-icons">schedule</i><i class="mdi-navigation-arrow-drop-down right"></i></a>';
		return item;
	}
		/********************************************************************************/
						initDropdownHoras(){
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
	}
		/********************************************************************************/
						getDescripcionModal(desc,id){
							return '<a class="waves-effect waves-light btn modal-trigger" href="#modal'+id+'">'+
								'<i class="material-icons">subject</i></a>'+
      '<div id="modal'+id+'" class="modal bottom-sheet">'+
       '<div class="modal-content">'+
       ' <h4>Detalles de la cita</h4>'+
      '<p>'+desc+'</p></div>'+
    '<div class="modal-footer">'+
      '<a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">'+
    '<i class="material-icons">close</i></a></div></div>';
						}
		/********************************************************************************/
						getAccionFromCitas(id,estado,cod){

							return '<a class="waves-effect waves-light btn-floating blue modal-trigger tooltipped" '+
								'href="#atender'+id+'"  data-delay="50" data-position="top" data-tooltip="Atender">'+
				'<i class="material-icons">spellcheck</i></a>'+
				'<div id="atender'+id+'" class="modal"><form>'+
    '<div class="modal-content">'+
      '<div class="row">'+
        '<div class="input-field col s12 m12 l12">'+
         '<i class="material-icons prefix">mode_edit</i>'+
          '<textarea id="diagnostico'+id+'" class="materialize-textarea" required="Diagnostico" length="200"></textarea>'+
          '<label for="diagnostico'+id+'">Diagnostico</label>'+
        '</div>'+
				     '<div class="input-field col s12 m12 l12">'+
         '<i class="material-icons prefix">mode_edit</i>'+
          '<textarea id="receta'+id+'" class="materialize-textarea" required="Receta " length="200"></textarea>'+
          '<label for="receta'+id+'">Receta M&eacute;dica</label>'+
        '</div>'+
								'<div class="input-field col s10 offset-s1 m8 offset-m2 l6 offset-l3">'+
        '<select id="selectalergia'+id+'" onchange="mediconewInstance.isAlergicoPaciente(this)" required>'+
      '<option value="" disabled selected>Seleccione una opción</option>'+
      '<option value="SI">SI</option><option value="NO">NO</option>'+
     '</select><label>¿Alérgico?</label></div>'+
								'<div id="desc_alergia'+id+'" class="input-field col s12 m12 l12"></div>'+
			   	'</div>'+
    '</div><div class="modal-footer">'+
					'<a href="#" class=" modal-action modal-close waves-effect waves-green btn-flat red">Cancelar</a>'+
					'<a  class="waves-effect waves-white btn-flat blue" id="btnatencion'+id+'" onclick="mediconewInstance.guardarAtencion(this)" name="cod_pac'+cod+'">Guardar</a>'+
     '</div></form></div>'+
								'<a class="waves-effect waves-light btn-floating teal"'+
								' onclick="mediconewInstance.verHistorialClinico(this)" id="ver_his'+cod+'">'+
				   '<i class="material-icons">recent_actors</i></a>';
						}
		/********************************************************************************/
						getFechaToPicker(){
		 var date=mediconewInstance.datepicker_m.datepicker("getDate");
    var fecha_arr=date.toLocaleDateString().split("/");
    var fecha=fecha_arr[2]+"-"+fecha_arr[1]+"-"+fecha_arr[0];
		return fecha;
	}
		/********************************************************************************/
						initHorasA(){
							this.horasA_m.empty().append(file_get_contents("includes/horas_item_medico.html"));
						}
		/********************************************************************************/
						initEspecialidades(){
							 jq.ajax({
               async:true,
                 contentType:"application/x-www-form-urlencoded",
                url:"../php/listar_especialidades.php",
                type: "post",
                dataType: "html",
                data:null,
                cache: false,
                contentType: false,
	               processData: false,
                success:mediconewInstance.SuccesListadoEspceialidades,
                timeout:5000,
                error:mediconewInstance.problemasEspecialidades
            });
						}
						problemasEspecialidades(){
								jq.notify("Problemas con la conexion!", "error");
						}
						SuccesListadoEspceialidades(data){
							var response=JSON.parse(data);
			if(response.status==1){
				mediconewInstance.especialidades_m.empty().append('<option value="" disabled selected>Seleccione</option>');
				for(var i=0;i<response.num;i++){
			mediconewInstance.especialidades_m.append('<option value="'+response[i].id_esp+'">'+response[i].especialidad+'</option>');
					jq('select').material_select();
				}
			}else{
			jq.notify(response.mensaje, "error");
			}
						}
		/********************************************************************************/
						initComponents(){
						//	mediconewInstance.setCheckboxHorasListener_B();
							mediconewInstance.setCheckboxHorasListener_A();
							 mediconewInstance.initDialogsHorasAdicionales();
						}
		
							setCheckboxHorasListener_A(){
			  this.setOnChangeListener_A("h0800_0830");
					this.setOnChangeListener_A("h0830_0900");
					this.setOnChangeListener_A("h0900_0930");
					this.setOnChangeListener_A("h0930_1000");
					this.setOnChangeListener_A("h1000_1030");
					this.setOnChangeListener_A("h1030_1100");
					this.setOnChangeListener_A("h1100_1130");
					this.setOnChangeListener_A("h1130_1200");
					this.setOnChangeListener_A("h1200_1230");
					this.setOnChangeListener_A("h1230_1300");
					this.setOnChangeListener_A("h1300_1330");
					this.setOnChangeListener_A("h1330_1400");
					this.setOnChangeListener_A("h1400_1430");
					this.setOnChangeListener_A("h1430_1500");
					this.setOnChangeListener_A("h1500_1530");
					this.setOnChangeListener_A("h1530_1600");
					this.setOnChangeListener_A("h1600_1630");
					this.setOnChangeListener_A("h1630_1700");
					}

		/********************************************************************************/
				sethora_total(element,horas){
					element.empty().append('<img src="../files/clock.png" alt="horas">'+
					horas+'.00 minutos');
				}
		/********************************************************************************/
					setOnChangeListener_A(id){
					var listItem=jq("#l"+id);
						var btnAdd=jq("#b"+id);
					var item=jq("#"+id).click(function(){
						  if(item.is(":checked")){
							     if(mediconewInstance.horas_seleccionadas_A<jsonData["tiempoMinutosMaximoCita"] && 
														mediconewInstance.horas_seleccionadas_A>=0){
													mediconewInstance.horas_seleccionadas_A+=30;
													mediconewInstance.sethora_total(mediconewInstance.hora_total,mediconewInstance.horas_seleccionadas_A);
													listItem.addClass("blue");
												}else{
														listItem.addClass("red");
													alertify.alert("Lo sentimos, el tiempo  maximo de una cita es de "+jsonData["tiempoMinutosMaximoCita"]+' minutos',
																											function(e){
														listItem.removeClass("red");
														item.prop("checked",false);
													});
												}
								}else{// no  checked
									 listItem.removeClass("blue");
									mediconewInstance.horas_seleccionadas_A-=30;
										mediconewInstance.sethora_total(mediconewInstance.hora_total,mediconewInstance.horas_seleccionadas_A);
								}
					});
				}
		/********************************************************************************/
		initDialogsHorasAdicionales(){	
        jq('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    }

  );
        jq("#a1h1630_1700").click(function() {
    	jq(this).addClass('blue');
    	alertify.success("ok");
    });
    
		}
		/********************************************************************************/
						guardarAtencion(obj){
							
								var id_cita=obj.id.replace("btnatencion","");
							  
							var diag=jq("#diagnostico"+id_cita).val();
							var receta=jq("#receta"+id_cita).val();
							var id_medico=Base64.decode(localStorage.getItem("id"));
							var id_esp=mediconewInstance.especialidades_m.val();
							var id_paciente=obj.name.replace("cod_pac","");
							var alergico=jq("#selectalergia"+id_cita).val();
							var desc_alergia=jq("#des_ale"+id_cita).val();
						if(desc_alergia==undefined){
							desc_alergia=null;
						}
							var form=new FormData();
							form.append("id_cita",id_cita);
							form.append("receta",receta);
							form.append("diagnostico",diag);
							form.append("id_medico",id_medico);
							form.append("id_paciente",id_paciente);
							form.append("alergico",alergico);
							form.append("desc_alergia",desc_alergia);
							form.append("fecha",mediconewInstance.getFecha());
							form.append("hora",mediconewInstance.getHora());
							form.append("id_esp",id_esp);
						if(diag!==""){
					 if(receta!==""){
							if(alergico==="SI" || alergico==="NO"){
								if(id_medico!==null){
											alertify.confirm("¿Seguro que desea continuar?",function(e){
								if(e){
						  mediconewInstance.ajaxFromMedico("../php/guardarAtencionCita.php",form,
									function(data){
								try{
									var resp=JSON.parse(data);
									if(resp.status==1){
										jq.notify(resp.mensaje,"success");
										jq("#atender"+resp.id).closeModal();
										mediconewInstance.listarPacientesCitas_m(mediconewInstance.getFechaToPicker());
									}else{
										jq.notify(resp.mensaje,"error");
									}
								}catch(err){console.error(err);}
								});
								}else{
									jq.notify("Cancelado!","success");
								}
							});
								}else{
									jq.notify("Error !","warn");
								}
							}else{
								jq.notify("Seleccione una opción!","warn");
							}
						}else{
							jq.notify("Receta médica obligatoria!","warn");
						}
						}else{jq.notify("Diagnostico obligatorio!","warn");}
						}
		
		/********************************************************************************/
			getHora(){
				var date=new Date();
			return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
			}
			getFecha(){
				var date=new Date();
				return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
			}
		/********************************************************************************/
			isAlergicoPaciente(select){
		  var aler=select.value;
				var id=select.id.replace("selectalergia","");
				var divdes=jq("#desc_alergia"+id).empty();
				 if(aler==="SI"){
						divdes.append(
						'<i class="material-icons prefix">mode_edit</i>'+
          '<textarea id="des_ale'+id+'" class="materialize-textarea" required length="300"></textarea>'+
          '<label for="des_ale'+id+'">Descripción de la alergia</label>');
						jq('textarea').characterCounter();
					}
			}
		/********************************************************************************/
		verHistorialClinico(obj){
			var id_pac=obj.id.replace("ver_his","");
			var id_med=Base64.decode(localStorage.getItem("id"));
			var datos=new FormData();
		if(id_med!==null){
				datos.append("opcion",2);
			datos.append("id_medico",id_med);
			datos.append("id_paciente",id_pac);
			datos.append("fecha",mediconewInstance.getFecha());
			mediconewInstance.ajaxFromMedico("../php/listar_historial.php",datos,
						function(data){
				try{
					 var res=JSON.parse(data);
					if(res.status==1){
						mediconewInstance.setHistorialTable(res);
					}else{
						jq.notify(res.mensaje,"error");
					}
				}catch(err){jq.notify(err,"error");}
			});
		}else{
			jq.notify("Error!","error");
		}
			
		}
		/********************************************************************************/
			setHistorialTable(response){
				mediconewInstance.content_historial_paciente.empty();
				for(var i=0;i<response.num;i++){
					mediconewInstance.setcontent_historial_paciente(
					mediconewInstance.content_historial_paciente,
					i+1,
					response[i].nombre+' '+response[i].apellidos,
					response[i].especialidad,
						mediconewInstance.getModalDiagnostico(response[i].id_his,response[i].diagnostico),
						mediconewInstance.getModalReceta(response[i].id_his,response[i].receta),
						response[i].alergico,
						mediconewInstance.	getDescripcionAlergia(response[i].id_his,response[i].descripcion_alergia,response[i].alergico),
						response[i].fecha,
						response[i].hora,
					 mediconewInstance.getActionFromHistorial(response[i].id_his,response[i].id_paciente,response[i].id_cita),
						response[i].id_his
					);
				}
				jq('.modal-trigger').leanModal();
				mediconewInstance.li_content_citas_medico.removeClass("active");
				mediconewInstance.li_content_citas_historial.addClass("active");
				jq('.collapsible').collapsible({ accordion : false });
			}
		/********************************************************************************/
			setcontent_historial_paciente(tabla,id,medico,esp,diag,receta,alergico,des_aler,fecha,hora,action,id_his){
				tabla.append('<tr id="tritemhis'+id_his+'">'+
																	'<td>'+id+'</td>'+
																	'<td>'+medico+'</td>'+
																	'<td>'+esp+'</td>'+
																	'<td>'+diag+'</td>'+
																	'<td>'+receta+'</td>'+
																	'<td>'+alergico+'</td>'+
																	'<td>'+des_aler+'</td>'+
																	'<td>'+fecha+'</td>'+
																	'<td>'+hora+'</td>'+
																	'<td>'+action+'</td>'+
																'</tr>');
			}
		/********************************************************************************/
					getActionFromHistorial(id,cod,cita){
						return '<a class="btn-floating waves-effect waves-light blue"><i class="material-icons">done</i></a>'+
	'<a class="btn-floating waves-effect waves-light red" onclick="mediconewInstance.eliminarHis(this)" id="eli'+id+'">'+
								'<i class="material-icons">delete</i></a>'+
		'<a class="btn-floating waves-effect waves-light green darken-4" id="modi'+id+'" onclick="mediconewInstance.modificarHis(this)" name="cod_paciente'+cod+'" datacita="cita_modi'+cita+'">'+
								'<i class="material-icons">create</i></a><div id="modificador'+id+'" ></div>';
					}
		/********************************************************************************/
			getModalDiagnostico(id,diag){
				return '<a class="waves-effect waves-light btn-floating blue darken-4 modal-trigger" href="#diag'+id+'">'+
				'<i class="material-icons">visibility</i></a>'+
  '<div id="diag'+id+'" class="modal bottom-sheet">'+
    '<div class="modal-content">'+
      '<h4>Diagnóstico</h4>'+
      '<p>'+diag+'</p> </div><div class="modal-footer">'+
      '<a href="#!" class=" modal-action modal-close waves-effect waves-green btn-floating red">'+
					'<i class="material-icons black-text">close</i></a>'+
    '</div></div>';
			}
					getModalReceta(id,rec){
				return '<a class="waves-effect waves-light btn-floating green modal-trigger" href="#rec'+id+'">'+
				'<i class="material-icons">visibility</i></a>'+
  '<div id="rec'+id+'" class="modal bottom-sheet">'+
    '<div class="modal-content">'+
      '<h4>Receta médica</h4>'+
      '<p>'+rec+'</p> </div><div class="modal-footer">'+
      '<a href="#!" class=" modal-action modal-close waves-effect waves-green btn-floating red">'+
					'<i class="material-icons black-text">close</i></a>'+
    '</div></div>';
			}
		/********************************************************************************/
				getDescripcionAlergia(id,des,aler){
				if(aler==="SI"){
						return '<a class="waves-effect waves-light btn-floating teal accent-3 modal-trigger" href="#desaler'+id+'">'+
				'<i class="material-icons">visibility</i></a>'+
  '<div id="desaler'+id+'" class="modal bottom-sheet">'+
    '<div class="modal-content">'+
      '<h4>Alergias del paciente</h4>'+
      '<p>'+des+'</p> </div><div class="modal-footer">'+
      '<a href="#!" class=" modal-action modal-close waves-effect waves-green btn-floating red">'+
					'<i class="material-icons black-text">close</i></a>'+
    '</div></div>';
				}else{
					return '<a class="waves-effect waves-light btn-floating red"  disabled="disabled">'+
				'<i class="material-icons">visibility</i></a>';
				}
				}
		
			/********************************************************************************/
									eliminarHis(obj){
										alertify.confirm("¿Seguro que desea eliminar la cita?",function(e){
											if(e){
												var id_his=obj.id.replace("eli","");
												var data=new FormData();
												data.append("id",id_his);
												var url="../php/eliminar_historial.php";
							mediconewInstance.ajaxFromMedico(url,data,function(response){
								try{
									var resp=JSON.parse(response);
									if(resp.status==1){
										jq.notify(resp.mensaje,"success");
									jq("#tritemhis"+id_his).remove();
									}else{
										jq.notify(resp.mensaje,"error");
									}
								}catch(err){jq.notify(err,"error");}
								
							});
											}else{
												jq.notify("Cancelado!","success");
											}
										});
									}
		/********************************************************************************/
						modificarHis(obj){
							var id_his=obj.id.replace("modi","");
							var cod_paci=obj.name.replace("cod_paciente","");
							var modal=jq("#modificador"+id_his);
							var cita=jq("#"+obj.id).attr("datacita").replace("cita_modi","");
							modal.empty();
							modal.append(mediconewInstance.getModalFromModificador(id_his,cod_paci,cita));
							jq('select').material_select();
							jq('#modificar'+id_his).openModal();
						}
		/********************************************************************************/
						getModalFromModificador(id,p,c){
							return '<div id="modificar'+id+'" class="modal modal-fixed-footer"><form>'+
    '<div class="modal-content">'+
      '<div class="row">'+
        '<div class="input-field col s12 m12 l12">'+
         '<i class="material-icons prefix">mode_edit</i>'+
          '<textarea id="diag_mod'+id+'" class="materialize-textarea" required="Diagnóstico" length="200"></textarea>'+
          '<label for="diag_mod'+id+'">Diagnostico</label>'+
        '</div>'+
				     '<div class="input-field col s12 m12 l12">'+
         '<i class="material-icons prefix">mode_edit</i>'+
          '<textarea id="rec_mod'+id+'" class="materialize-textarea" required="Receta " length="200"></textarea>'+
          '<label for="rec_mod'+id+'">Receta M&eacute;dica</label>'+
        '</div>'+
								'<div class="input-field col s10 offset-s1 m8 offset-m2 l6 offset-l3">'+
        '<select id="selectmodi'+id+'" onchange="mediconewInstance.isAlergicoFromModificar(this)" required>'+
      '<option value="" disabled selected>Seleccione una opción</option>'+
      '<option value="SI">SI</option><option value="NO">NO</option>'+
     '</select><label>¿Alérgico?</label></div>'+
								'<div id="desc_alergia_modi'+id+'" class="input-field col s12 m12 l12"></div>'+
			   	'</div>'+
    '</div><div class="modal-footer teal lighten-1">'+
					'<a href="#" class=" modal-action modal-close waves-effect waves-green btn-flat red">Cancelar</a>'+
					'<a  class="waves-effect waves-white btn-flat blue darken-4" id="btnmodificar'+id+'" onclick="mediconewInstance.modificarHistorial(this)" name="cod_pac_modi'+p+'" idcita="idcitamodi'+c+'">Modificar</a>'+
     '</div></form></div>';
						}
		/********************************************************************************/
		isAlergicoFromModificar(select){
			var aler=select.value;
				var id=select.id.replace("selectmodi","");
				var divdes=jq("#desc_alergia_modi"+id).empty();
				 if(aler==="SI"){
						divdes.append(
						'<i class="material-icons prefix">mode_edit</i>'+
          '<textarea id="des_ale_modi'+id+'" class="materialize-textarea" required length="300"></textarea>'+
          '<label for="des_ale'+id+'">Descripción de la alergia</label>');
						jq('textarea').characterCounter();
					}
		}
		/********************************************************************************/
						modificarHistorial(obj){
							var id=obj.id.replace("btnmodificar","");
							var diag=jq("#diag_mod"+id).val();
							var id_cita=jq("#"+obj.id).attr("idcita").replace("idcitamodi","");
							var receta=jq("#rec_mod"+id).val();
							var id_medico=Base64.decode(localStorage.getItem("id"));
							var id_esp=mediconewInstance.especialidades_m.val();
							var id_paciente=obj.name.replace("cod_pac_modi","");
							var alergico=jq("#selectmodi"+id).val();
							var desc_alergia=jq("#des_ale_modi"+id).val();
						if(desc_alergia==undefined){
							desc_alergia=null;
						}
							var form=new FormData();
							form.append("id_his",id);
							form.append("id_cita",id_cita);
							form.append("receta",receta);
							form.append("diagnostico",diag);
							form.append("id_medico",id_medico);
							form.append("id_paciente",id_paciente);
							form.append("alergico",alergico);
							form.append("desc_alergia",desc_alergia);
							form.append("fecha",mediconewInstance.getFecha());
							form.append("hora",mediconewInstance.getHora());
							form.append("id_esp",id_esp);
						if(diag!==""){
					 if(receta!==""){
							if(alergico==="SI" || alergico==="NO"){
								if(id_medico!==null){
											alertify.confirm("¿Seguro que desea continuar?",function(e){
								if(e){
						  mediconewInstance.ajaxFromMedico("../php/modificarHistorial.php",form,
									function(data){
								try{
									var resp=JSON.parse(data);
									if(resp.status==1){
										mediconewInstance.listar_all_historial();
										jq.notify(resp.mensaje,"success");
										jq("#modificar"+resp.id).closeModal();
									}else{
										jq.notify(resp.mensaje,"error");
									}
								}catch(err){console.error(err);}
								});
								}else{
									jq.notify("Cancelado!","success");
								}
							});
								}else{
									jq.notify("Error !","warn");
								}
							}else{
								jq.notify("Seleccione una opción!","warn");
							}
						}else{
							jq.notify("Receta médica obligatoria!","warn");
						}
						}else{jq.notify("Diagnostico obligatorio!","warn");}
						}
		/********************************************************************************/
		listar_all_historial(){
			var id_med=Base64.decode(localStorage.getItem("id"));
			var datos=new FormData();
			if(id_med!==null){
				datos.append("id_medico",id_med);
				datos.append("opcion",1);
				datos.append("fecha",mediconewInstance.getFecha());
				datos.append("id_paciente",0);
				mediconewInstance.ajaxFromMedico("../php/listar_historial.php",datos,
								function(data){
					   	try{
					 var res=JSON.parse(data);
					if(res.status==1){
						mediconewInstance.setHistorialTable(res);
					}else{
						jq.notify(res.mensaje,"error");
					}
				}catch(err){jq.notify(err,"error");}
				});
			}else{
				jq.notify("Error!","error");
			}
		}
		/********************************************************************************/
		ajaxFromMedico(ruta,form,responsefuncion){
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
	  
	 }//end  class Medico

	 function HoraLibre(element){
	 	alertify.log(element.id);
			alertify.success(mediconewInstance.getHora());
	 }