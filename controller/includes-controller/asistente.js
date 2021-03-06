var asistenteNewInstance;
class Asistente{
    constructor(color){
      
    /*************************/   
					 jq('.collapsible').collapsible({
      accordion : false
    });
					this.btn_reportar_a=jq("#btn_reportar_a");
					this.color_fondo=color;
					this.tabla_citas_hoy=jq("#tabla_citas_hoy");
			asistenteNewInstance=this; 
					this.div_content_tabla_hoy=jq("#div_content_tabla_hoy");
					this.div_content_config_reporte=jq("#div_content_config_reporte");
					this.content_reportes_tabla_cita=jq("#content_reportes_tabla_cita");
					this.head_tabla_reportes_asistente=jq("#head_tabla_reportes_asistente");
					this.body_tabla_reportes_asistente=jq("#body_tabla_reportes_asistente");
				this.datepicker_a=jq("#datepicker_a").datepicker({
	inline: true,
monthNames: ['Enero', 'Febrero', 'Marzo',
'Abril', 'Mayo', 'Junio',
'Julio', 'Agosto', 'Septiembre',
'Octubre', 'Noviembre', 'Diciembre'],
dayNamesMin: ['Dom', 'Lun','Mar', 'Mier', 'Jue', 'Vier', 'Sab'],
onSelect: function (date) {
    asistenteNewInstance.listar_citas_paciente_medico(date);
},
firstDay: 1,
dateFormat: "yy-mm-dd",
showButtonPanel: true,
minDate:new Date()
});
					this.content_picker=jq("#content_picker").draggable({refreshPositions: true});
					this.datepicker_a.resizable();
					this.datos_paciente=jq("#datos_paciente").draggable();
			this.datepicker_a.addClass(this.color_fondo);
				}
	  initComponents(){
			this.btn_reportar_a.click(function(){
				asistenteNewInstance.reportar_citas_paciente();
			});
		} 
	/****************************************************************/
listar_citas_paciente_medico(date){
	var form=new FormData();
	form.append("fecha",date);
	jq.ajax({
                 async:true,
                 contentType:"application/x-www-form-urlencoded",
                url:"../php/listar_citas_paciente_medico.php",
                type: "post",
                dataType: "html",
                data:form,
                cache: false,
                contentType: false,
	             processData: false,
                success:asistenteNewInstance.SuccesListadoCitas,
                timeout:5000,
              error:function(){
															jq.notify("Problemas en el servidor","error");
														}
            }); 
}
	SuccesListadoCitas(data){
		var response=JSON.parse(data);
		asistenteNewInstance.tabla_citas_hoy.empty();
		if(response.status==1){
	   for(var i=0;i<response.num;i++){
					asistenteNewInstance.setTabla_citas_hoy(asistenteNewInstance.tabla_citas_hoy,
						                                      i+1,response[i].pnombre+' '+response[i].papellidos,
																																												response[i].ptelefono,
																																												response[i].mnombre+' '+response[i].mapellidos,
																																												response[i].mtelefono,
																																												response[i].fecha,
																																												asistenteNewInstance.getHorasFromTablaCitas(response[i],
																																																								response[i].num_f_horas,i),
																																												response[i].especialidad,
																																												asistenteNewInstance.getEstadoFromTablasCitas(
					                                        response[i].estado,response[i].id_cita),
																																													asistenteNewInstance.getCofirmacionFromListado(
						                                         response[i].confirmado,
																																															response[i].id_cita));
				}
			asistenteNewInstance.initDropdownHoras();
			asistenteNewInstance.div_content_config_reporte.removeClass("active");
			asistenteNewInstance.content_reportes_tabla_cita.removeClass("active");
			asistenteNewInstance.div_content_tabla_hoy.addClass("active");
			jq('select').material_select();
				 jq('.collapsible').collapsible({
      accordion : false
    });
		}else{
			jq.notify(response.mensaje,"success");
		}
	}

	/****************************************************************/
	getCofirmacionFromListado(confirmado,id){
		if(confirmado==="NO"){
			return '<select id="confirmar'+id+'" onchange="confirmarCita(this)">'+
      '<option value="NO">NO</option>'+
      '<option value="SI">SI</option>'+
    '</select>';
		}else{
				return '<select id="confirmar'+id+'" onchange="confirmarCita(this)">'+
      '<option value="SI">SI</option>'+
      '<option value="NO">NO</option>'+
    '</select>';
		}
	}
	/****************************************************************/
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
	
	getHorasFromTablaCitas(object,num,id){
		var item='<ul id="dropdown'+id+'" class="dropdown-content">';
		for(var j=0;j<num;j++){
			item+='<li><a href="#">'+object[j].hora+'</a></li>';
		}
		item+='</ul>'+
  '<a class="btn dropdown-button" href="#" data-activates="dropdown'+id+'">'+
			'<i class="material-icons">schedule</i><i class="mdi-navigation-arrow-drop-down right"></i></a>';
		return item;
	}
	getEstadoFromTablasCitas(estado,id_cita){
	if(estado==="asistira"){
		return '<div class="switch"><label>No<input type="checkbox" id="ch'+id_cita+'" checked="checked" onclick="noAsistira(this)">'+
			'<span class="lever"></span>Si</label></div>'+
			'<div id="modalch'+id_cita+'" class="modal modal-fixed-footer">'+
    '<div class="modal-content">'+
      '<h4>Explique el motivo de su inasistencia</h4>'+
      '<div class="input-field ">'+
          '<i class="material-icons prefix">mode_edit</i>'+
          '<textarea id="motivoch'+id_cita+'" class="materialize-textarea"></textarea>'+
          '<label for="motivoch'+id_cita+'">Motivo</label>'+
        '</div></div><div class="modal-footer light-blue accent-2">'+
			'<a href="#" class="modal-action modal-close waves-effect waves-green btn-flat"'+
			'onclick="CerrarModalInasistencia(this)" id="btnch'+id_cita+'">'+
			'<i class=" large material-icons red-text">shuffle</i></a>'+
			'<a href="#" class=" waves-effect waves-green btn-flat " onclick="guardarInasistencia(this)" id="btn'+id_cita+'" >'+
			'<i class=" large material-icons yellow-text">save</i></a></div></div>';
        
	}else if(estado==="asistio"){
				return '<i class="material-icons teal-text">spellcheck</i>';
	}else{
		return '<div class="switch"><label>No<input type="checkbox" id="ch'+id_cita+'" onclick="Asistira_paciente_cita(this)">'+
			'<span class="lever"></span>Si</label></div>'+
			'<div id="modalch'+id_cita+'" class="modal modal-fixed-footer">'+
    '<div class="modal-content">'+
      '<h4>Explique el motivo de su inasistencia</h4>'+
      '<div class="input-field ">'+
          '<i class="material-icons prefix">mode_edit</i>'+
          '<textarea id="motivoch'+id_cita+'" class="materialize-textarea"></textarea>'+
          '<label for="motivoch'+id_cita+'">Motivo</label>'+
        '</div></div><div class="modal-footer light-blue accent-2">'+
			'<a href="#" class="modal-action modal-close waves-effect waves-green btn-flat"'+
			'onclick="siAsistira(this)" id="btnch'+id_cita+'">'+
			'<i class=" large material-icons red-text">shuffle</i></a>'+
			'<a href="#" class=" waves-effect waves-green btn-flat " onclick="guardarInasistencia(this)" id="btn'+id_cita+'" >'+
			'<i class=" large material-icons yellow-text">save</i></a></div></div>';
	}
	}
	setTabla_citas_hoy(tabla,id,pac,telpac,me,telme,fecha,hora,esp,estado,confirmado){
		tabla.append('<tr>'+
					'<td>'+id+'</td>'+
					'<td>'+pac+'</td>'+
				'<td>'+telpac+'</td>'+
				'<td>'+me+'</td>'+
			  '<td>'+telme+'</td>'+
					'<td>'+fecha+'</td>'+
				'<td>'+hora+'</td>'+
					'<td>'+esp+'</td>'+
					'<td>'+confirmado+'</td>'+
	   '<td>'+estado+'</td></tr>');
	}
				
	/****************************************************************/
	getFechaToPicker(){
		 var date=asistenteNewInstance.datepicker_a.datepicker("getDate");
    var fecha_arr=date.toLocaleDateString().split("/");
    var fecha=fecha_arr[2]+"-"+fecha_arr[1]+"-"+fecha_arr[0];
		return fecha;
	}
	/******************REPORTES*************************************/
	 reportar_citas_paciente(){
		if(asistenteNewInstance.getOpcionesFromReporte("todo")){
			asistenteNewInstance.ajaxFromReportes_Citas("../php/reportar_todo.php",null,asistenteNewInstance.successReporteTodo);
		}
		else if(asistenteNewInstance.getOpcionesFromReporte("faltantes")){	asistenteNewInstance.ajaxFromReportes_Citas("../php/reportar_inasistencias.php",null,asistenteNewInstance.successReporteTodo);	
			}
			else if(asistenteNewInstance.getOpcionesFromReporte("asistieron")){	asistenteNewInstance.ajaxFromReportes_Citas("../php/reportar_asistencias.php",null,asistenteNewInstance.successReporteTodo);	
			}
				else if(asistenteNewInstance.getOpcionesFromReporte("adultos")){	asistenteNewInstance.ajaxFromReportes_Citas("../php/reportar_adultos.php",null,asistenteNewInstance.successReporteTodo);	
			}
			else	if(asistenteNewInstance.getOpcionesFromReporte("ninios")){	asistenteNewInstance.ajaxFromReportes_Citas("../php/reportar_ninios.php",null,asistenteNewInstance.successReporteTodo);	
			}	
			else	if(asistenteNewInstance.getOpcionesFromReporte("jovenes")){	asistenteNewInstance.ajaxFromReportes_Citas("../php/reportar-jovenes.php",null,asistenteNewInstance.successReporteTodo);	
			}
		}
	/****************************************************************/
	getOpcionesFromReporte(id){
if(jq("#"+id).is(":checked")){
	return true;
}
	return false;
	}
	/****************************************************************/
			successReporteTodo(data){
				var response=JSON.parse(data);
				if(response.status==1){
					asistenteNewInstance.setHeadFromTablaReportes();
					asistenteNewInstance.body_tabla_reportes_asistente.empty();
			for(var i=0;i<response.num;i++){
					asistenteNewInstance.setTabla_citas_hoy(asistenteNewInstance.body_tabla_reportes_asistente,
						                                      i+1,response[i].pnombre+' '+response[i].papellidos,
																																												response[i].ptelefono,
																																												response[i].mnombre+' '+response[i].mapellidos,
																																												response[i].mtelefono,
																																												response[i].fecha,
																																												asistenteNewInstance.getHorasFromTablaCitas(response[i],
																																																								response[i].num_f_horas,'rep'+i),
																																												response[i].especialidad,
																																												asistenteNewInstance.getEstadoFromTablasCitas(
					                                        response[i].estado,response[i].id_cita),
																																													response[i].confirmado);
				}
			asistenteNewInstance.initDropdownHoras();
			asistenteNewInstance.div_content_config_reporte.removeClass("active");
			asistenteNewInstance.div_content_tabla_hoy.removeClass("active");
						asistenteNewInstance.content_reportes_tabla_cita.addClass("active");
				 jq('.collapsible').collapsible({
      accordion : false
    });
				}else{
					jq.notify(response.mensaje,"error");
				}
			}
	/****************************************************************/

	/****************************************************************/
	ajaxFromReportes_Citas(ruta,formdata,resp){
		jq.ajax({
                 async:true,
                 contentType:"application/x-www-form-urlencoded",
                url:ruta,
                type: "post",
                dataType: "html",
                data:formdata,
                cache: false,
                contentType: false,
	             processData: false,
                success:resp,
                timeout:5000,
              error:function(){
															jq.notify("Problemas en el servidor","error");
														}
            }); 
	}
	/****************************************************************/
	setHeadFromTablaReportes(){
	 asistenteNewInstance.head_tabla_reportes_asistente.empty();
		asistenteNewInstance.head_tabla_reportes_asistente.append(
		'<th data-field="id">#</th>'+
											'<th data-field="paciente">Paciente</th>'+
											 ' <th data-field="telefono_paciente">telefono del paciente</th>'+
               '<th data-field="medico">M&eacute;dico</th>'+
											   '<th data-field="telefono_medico">telefono del m&eacute;dico</th>'+
											   '<th data-field="fecha">Fecha</th>'+
										   	'<th data-field="hora">Hora</th>'+
											'<th data-field="especialidad">Especialidad</th>'+
											'<th data-field="confirmado">Confirmado</th>'+
											'<th data-field="asistira">Estado</th>');
	}
	/****************************************************************/

	/****************************************************************/
	/****************************************************************/
	/****************************************************************/
	/****************************************************************/
	/****************************************************************/
	/****************************************************************/
	/****************************************************************/
	/****************************************************************/
}// end class Asistente
/*jq('select').material_select();*/
function noAsistira(obj){
if(!obj.checked){
	var id=obj.id;
jq("#modal"+id).openModal();
}
}
function CerrarModalInasistencia(obj){
	var checkbox=obj.id.replace("btn","");
	jq("#"+checkbox).prop("checked",true);
}
function confirmarCita(obj){
	var id_cita=obj.id.replace("confirmar","");
	var formdata=new FormData();
	var id_asistente=Base64.decode(localStorage.getItem("id"));
	formdata.append("id_cita",id_cita);
	formdata.append("confirmado",obj.value);
	formdata.append("id_asistente",id_asistente);
	asistenteNewInstance.ajaxFromReportes_Citas("../php/confirmar_cita.php",formdata,successConfirmacion_a);
}
function successConfirmacion_a(data){
		try{
			var response_confirmacion=JSON.parse(data);
			if(response_confirmacion.status==1){
				jq.notify(response_confirmacion.mensaje,"success");
			}else{
				jq.notify(response_confirmacion.mensaje,"error");
			}
		}catch(err){
			console.log(err);
		}
	}
function guardarInasistencia(obj){
	var id=obj.id.replace("btn","");
	var id_asistente=Base64.decode(localStorage.getItem("id"));
	var motivo=jq("#motivoch"+id).val();
var formdata=new FormData();
if(motivo!==""){
		formdata.append("id_cita",id);
	formdata.append("motivo",motivo);
	formdata.append("id_asistente",id_asistente);
		formdata.append("estado","no asistio");
	jq.notify("Procesando...","success");
	
		asistenteNewInstance.ajaxFromReportes_Citas("../php/guardar_motivo_inasistencia.php",formdata,successGuardarMotivo_a);
}else{
	jq.notify("Descripción del motivo requerido!");
}
}
function successGuardarMotivo_a(data){
		try{
			var response=JSON.parse(data);
			if(response.status==1){
				jq.notify(response.mensaje,"success");
				if(response.estado!=="asistio"){
					jq('#modalch'+response.id_cita).closeModal();
				}
			}else{
				jq.notify(response.mensaje,"error");
			}
		}catch(err){
			console.log(err);
		}
	}
function Asistira_paciente_cita(obj){
	var id=obj.id;
	var check=jq("#"+id);
	if(check.is(":checked")){
		jq("#"+id).prop("checked",true);
			var formdata=new FormData();
	var id_asistente=Base64.decode(localStorage.getItem("id"));
	formdata.append("id_cita",id.replace("ch",""));
	formdata.append("motivo","");
	formdata.append("id_asistente",id_asistente);
		formdata.append("estado","asistira");
		asistenteNewInstance.ajaxFromReportes_Citas("../php/guardar_motivo_inasistencia.php",formdata,successGuardarMotivo_a);
	}else{
		jq("#"+id).prop("checked",false);
		jq("#modal"+id).openModal();
	}
	
}