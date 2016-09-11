var asistenteNewInstance;
class Asistente{
    constructor(){
      
    /*************************/   
					 jq('.collapsible').collapsible({
      accordion : false
    });
					this.tabla_citas_hoy=jq("#tabla_citas_hoy");
			asistenteNewInstance=this;
this.btn_guardar_paciente=jq("#btn_guardar_paciente");
this.btn_guardar_paciente.click(function(e){
 e.preventDefault();
 alertify.success("siiii!!");
 });   
					
				this.datepicker_a=jq("#datepicker_a").datepicker({
	inline: true,
monthNames: ['Enero', 'Febrero', 'Marzo',
'Abril', 'Mayo', 'Junio',
'Julio', 'Agosto', 'Septiembre',
'Octubre', 'Noviembre', 'Diciembre'],
dayNamesMin: ['Dom', 'Lun','Mar', 'Mier', 'Jue', 'Vier', 'Sab'],
onSelect: function (date) {
    asistenteNewInstance.listar_citas_paciente_medico();
},
firstDay: 1,
dateFormat: "yy-mm-dd",
showButtonPanel: true,
minDate:new Date()
});
				}
	  initComponents(){
			
		} 
	/****************************************************************/
listar_citas_paciente_medico(){
	var form=new FormData();
	form.append("fecha",asistenteNewInstance.getFechaToPicker());
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
					asistenteNewInstance.setTabla_citas_hoy(i+1,response[i].pnombre+' '+response[i].papellidos,
																																												response[i].ptelefono,
																																												response[i].mnombre+' '+response[i].mapellidos,
																																												response[i].mtelefono,
																																												response[i].fecha,
																																												asistenteNewInstance.getHorasFromTablaCitas(response[i],
																																																								response[i].num_f_horas,i),
																																												response[i].especialidad,
																																												asistenteNewInstance.getEstadoFromTablasCitas(
					                                        response[i].estado,response[i].id_cita));
				}
			asistenteNewInstance.initDropdownHoras();
		}else{
			jq.notify(response.mensaje,"success");
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
			'onclick="siAsistira(this)" id="btnch'+id_cita+'">'+
			'<i class=" large material-icons red-text">shuffle</i></a>'+
			'<a href="#" class=" waves-effect waves-green btn-flat ">'+
			'<i class=" large material-icons yellow-text">save</i></a></div></div>';
        
	}else if(estado==="asistio"){
				return '<i class="material-icons teal-text">spellcheck</i>';
	}else{
		return '<div class="switch"><label>No<input type="checkbox" id="ch'+id_cita+'" >'+
			'<span class="lever"></span>Si</label></div>';
	}
	}
	setTabla_citas_hoy(id,pac,telpac,me,telme,fecha,hora,esp,estado){
		asistenteNewInstance.tabla_citas_hoy.append('<tr>'+
					'<td>'+id+'</td>'+
					'<td>'+pac+'</td>'+
				'<td>'+telpac+'</td>'+
				'<td>'+me+'</td>'+
			  '<td>'+telme+'</td>'+
					'<td>'+fecha+'</td>'+
				'<td>'+hora+'</td>'+
					'<td>'+esp+'</td>'+
	   '<td>'+estado+'</td></tr>');
	}

											
	/****************************************************************/
	getFechaToPicker(){
		 var date=asistenteNewInstance.datepicker_a.datepicker("getDate");
    var fecha_arr=date.toLocaleDateString().split("/");
    var fecha=fecha_arr[2]+"-"+fecha_arr[1]+"-"+fecha_arr[0];
		return fecha;
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
function siAsistira(obj){
	var checkbox=obj.id.replace("btn","");
	jq("#"+checkbox).prop("checked",true);
}