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
		if(response.status==1){
			asistenteNewInstance.tabla_citas_hoy.empty();
	   for(var i=0;i<response.num;i++){
					asistenteNewInstance.setTabla_citas_hoy(i+1,response[i].pnombre+' '+response[i].papellidos,
																																												response[i].ptelefono,
																																												response[i].mnombre+' '+response[i].mapellidos,
																																												response[i].mtelefono,
																																												response[i].fecha,
																																												asistenteNewInstance.getHorasFromTablaCitas(response[i],
																																																								response[i].num_f_horas,i),
																																												response[i].especialidad,
																																												response[i].id_cita);
				}
			asistenteNewInstance.initDropdownHoras();
		}else{
			jq.notify(response.mensaje,"error");
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
	setTabla_citas_hoy(id,pac,telpac,me,telme,fecha,hora,esp,id_cita){
		asistenteNewInstance.tabla_citas_hoy.append('<tr>'+
					'<td>'+id+'</td>'+
					'<td>'+pac+'</td>'+
				'<td>'+telpac+'</td>'+
				'<td>'+me+'</td>'+
			  '<td>'+telme+'</td>'+
					'<td>'+fecha+'</td>'+
				'<td>'+hora+'</td>'+
					'<td>'+esp+'</td>'+
	   '<td><div class="switch"> <label>No<input type="checkbox" id="ch'+id_cita+'"><span class="lever"></span>Si</label></div></td></tr>');
	}

											
	/****************************************************************/
	getFechaToPicker(){
		  //  var date=jq("#datepicker_a").datepicker("getDate");
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