var pacienteNewInstance;
class Paciente{
    constructor(){
        /*******************************************************************/
    this.especialidades_p=jq("#especialidades_p");
    this.medicos_p=jq("#medicos_p");
    this.btn_crear_cita=jq("#btn_crear_cita");
					this.horas_seleccionadas=0;
					this.hora_total=jq("#hora_total");
					 pacienteNewInstance=this;
    this.btn_crear_cita.click(function(e){
              e.preventDefault();
            pacienteNewInstance.crear_cita_paciente();
          });  
/*******************************************************************/
       jq('select').material_select(); 
    
 jq("#datepicker" ).datepicker({
inline: true,
monthNames: ['Enero', 'Febrero', 'Marzo',
'Abril', 'Mayo', 'Junio',
'Julio', 'Agosto', 'Septiembre',
'Octubre', 'Noviembre', 'Diciembre'],
dayNamesMin: ['Dom', 'Lun','Mar', 'Mier', 'Jue', 'Vier', 'Sab'],
onSelect: function (date) {
   pacienteNewInstance.listar_horas_disponibles_p(date);
},
firstDay: 1,
dateFormat: "yy-mm-dd",
showButtonPanel: true,
minDate:new Date()
});

    }
    setOnSelectListener(selectlist,object,opcion){
        selectlist.on("change",function(){
            object.execute(selectlist.val(),opcion);
        });
    }
	   initOnHorasChangeListener(){
				 this.setCheckboxListener("h0800_0830");
					this.setCheckboxListener("h0830_0900");
					this.setCheckboxListener("h0900_0930");
					this.setCheckboxListener("h0930_1000");
					this.setCheckboxListener("h1000_1030");
					this.setCheckboxListener("h1030_1100");
					this.setCheckboxListener("h1100_1130");
					this.setCheckboxListener("h1130_1200");
					this.setCheckboxListener("h1200_1230");
					this.setCheckboxListener("h1230_1300");
					this.setCheckboxListener("h1300_1330");
					this.setCheckboxListener("h1330_1400");
					this.setCheckboxListener("h1400_1430");
					this.setCheckboxListener("h1430_1500");
					this.setCheckboxListener("h1500_1530");
					this.setCheckboxListener("h1530_1600");
					this.setCheckboxListener("h1600_1630");
					this.setCheckboxListener("h1630_1700");
				}
	  setCheckboxListener(id){
				 var lobj=jq("#l"+id);
		   var obj=jq("#"+id);
				var instance=this;
				obj.click(function(){
						if(obj.is(":checked")){
							if(instance.horas_seleccionadas<jsonData["tiempoMinutosMaximoCita"] && instance.horas_seleccionadas>=0){
										instance.horas_seleccionadas+=30;
								  	instance.setHoraTotal();
								lobj.addClass("blue");
							}else{
							lobj.addClass("red");
								alertify.alert("Lo sentimos, el tiempo maximo es de : "+jsonData["tiempoMinutosMaximoCita"]+" minutos",
																								function(e){
										obj.prop("checked",false);
										lobj.removeClass("red");
								
								});
							}
						}else{
								instance.horas_seleccionadas-=30;
							if(	instance.horas_seleccionadas<0){
								instance.resetHorasSeleccionadas();
							}
							instance.setHoraTotal();
							lobj.removeClass("blue");
							lobj.removeClass("red");
						}
					});
}
	
	setHoraTotal(){
		 this.hora_total.empty().append('<img src="../files/clock.png" alt="horas">'+
						 this.horas_seleccionadas+'.00 minutos');
	}
	resetHorasSeleccionadas(){
		this.horas_seleccionadas=0;
		this.setHoraTotal();
	}
	/*functions  ********************************************/
	listar_horas_disponibles_p(date){
    var formdata=new FormData();
    var medico=localStorage.getItem("medico_id");
		  var instance=this;
    if(medico!==null){
       formdata.append("medico",medico);
        formdata.append("fecha",date);
               jq.ajax({
               async:true,
                 contentType:"application/x-www-form-urlencoded",
                url:jsonData["listarHorasDisponibles"],
                type: "post",
                dataType: "html",
                data:formdata,
                cache: false,
                contentType: false,
	             processData: false,
               beforeSend:instance.iniciandoListado,
                success:instance.SuccesListado,
                timeout:5000,
              error:instance.problemas
            }); 
    }else{$.notify("Medico no seleccionado");}
}
	/*************************************************/
	iniciandoListado(){
    
}
	/*************************************************/
	SuccesListado(data){
        var json=JSON.parse(data);
        var status_disponibilidad=jq("#status_disponibilidad").empty();
         var selectable=jq("#selectable").empty();
        selectable.append(file_get_contents("includes/horas_item.html"));
	     pacienteNewInstance.initOnHorasChangeListener();
    if(json.status==1){
        var hora_aux="";
        for(var i=0;i<json.num;i++){
              if(json[i].estado==="ocupado"){
                  hora_aux=json[i].hora.replace("-","_").split(":");
                  jq("#lh"+hora_aux[0]+hora_aux[1]+hora_aux[2]).remove();
															  pacienteNewInstance.resetHorasSeleccionadas();
              }
        }
        status_disponibilidad.append('las horas visibles');
    }else{
        status_disponibilidad.append('todas las horas');
    }
}
	/*************************************************/
	 problemas(){
    
}
	/*************************************************/
	crear_cita_paciente(){
    var especialidad=jq("#especialidades_p").val();
    var medico=localStorage.getItem("medico_id");
    var descripcion=jq("#descripcion_p").val();
    var date=jq("#datepicker").datepicker("getDate");
    var fecha_arr=date.toLocaleDateString().split("/");
    var fecha=fecha_arr[2]+"-"+fecha_arr[1]+"-"+fecha_arr[0];
		  var horasArr=pacienteNewInstance.getHorasOnCheckbox();
		  var paciente=Base64.decode(localStorage.getItem("dni"));
    if(especialidad!==null){
        if(medico!==null){
           if(fecha.replace("-","").replace("-","")!==""){
              if(horasArr.length>0){
															if(paciente!==null){
																var formData=new FormData();
															var tamHoras=horasArr.length;
															var x="";
															for(var i=0;i<tamHoras;i++){
																formData.append("hora_fila"+i,pacienteNewInstance.getFormatHora(horasArr[i]));
															}
															formData.append("descripcion",descripcion);
															formData.append("medico",medico);
															formData.append("especialidad",especialidad);
															formData.append("fecha",fecha);
															formData.append("tamHoras",tamHoras);
															formData.append("horas_total",pacienteNewInstance.horas_seleccionadas);
																formData.append("paciente",paciente);
															jq.ajax({
               async:true,
                 contentType:"application/x-www-form-urlencoded",
                url:jsonData["crearCitaPaciente"],
                type: "post",
                dataType: "html",
                data:formData,
                cache: false,
                contentType: false,
	             processData: false,
               beforeSend:pacienteNewInstance.iniciandoCreacionCita,
                success:pacienteNewInstance.succesCreacionCita,
                timeout:5000,
              error:pacienteNewInstance.problemasCreacionCita
            }); 
															}else{
															pacienteNewInstance.alertar(jq("#perfil"),"Paciente no logueado","right","warn");
															}
														}else{
															pacienteNewInstance.alertar(jq("#selectable"),"Selecciona las horas por favor!","left","warn");
														}
           }else{
             	pacienteNewInstance.alertar(jq("#datepicker"),"Selecciona la fecha por favor!","top","warn");
           }
        }else{
          	pacienteNewInstance.alertar(pacienteNewInstance.medicos_p,"Seleccione un medico por favor!","top","warn");
        }
        
    }else{
     pacienteNewInstance.alertar(pacienteNewInstance.especialidades_p,"Seleccione una especialidad por favor!","left","success");
    }
    
}
	/*************************************************/
	getHorasOnCheckbox(){
		var horas=new Array();
		 jq(".filled-in:checked").each(function(){
				horas.push(jq(this).attr("id"));
			});
		return horas;
	}
	/*************************************************/
	getFormatHora(id){
		var matrix=id.replace("h","").split("_");
		var hora1=matrix[0].substring(0,2);
		var min1=matrix[0].substring(2,4);
		var hora2=matrix[1].substring(0,2);
		var min2=matrix[1].substring(2,4);
		return hora1+":"+min1+"-"+hora2+":"+min2;
	}
	/*************************************************/
	iniciandoCreacionCita(){}
	/*************************************************/
	succesCreacionCita(data){
	var response=JSON.parse(data);
		if(response.status===1){
			pacienteNewInstance.alertar(pacienteNewInstance.btn_crear_cita,response.mensaje,"top","success");
		}else{
				pacienteNewInstance.alertar(pacienteNewInstance.btn_crear_cita,response.mensaje,"top","error");
		}
	}
	/*************************************************/
	problemasCreacionCita(){
		
	}
	/*************************************************/
	alertar(obj,msj,pos,type){
		obj.notify( msj, { position:pos },{className:type});
	}
	/*************************************************/
	setEspecialidades(){
               jq.ajax({
               async:true,
                 contentType:"application/x-www-form-urlencoded",
                url:jsonData["listarEspecialidadesDisponibles"] ,
                type: "post",
                dataType: "html",
                data:null,
                cache: false,
                contentType: false,
	               processData: false,
                success:pacienteNewInstance.SuccesListadoEspceialidades,
                timeout:5000,
                error:pacienteNewInstance.problemasEspecialides
            });
	}
	/*************************************************/
		SuccesListadoEspceialidades(data){
			var response=JSON.parse(data);
			if(response.status==1){
				pacienteNewInstance.especialidades_p.empty().append('<option value="" disabled selected>Seleccione</option>');
				for(var i=0;i<response.num;i++){
			pacienteNewInstance.especialidades_p.append('<option value="'+response.especialidad+'">'+response.especialidad+'</option>');
				}
			}else{
			$.notify(response.mensaje, "error");
			}
		}
	/*************************************************/
		problemasEspecialides(){
			$.notify(response.mensaje, "Problemas en el servidor");
		}
	/*************************************************/
	/*************************************************/
	/*************************************************/
}
/*end class */

class Filtrar{
    constructor(){
        this.formdata=new FormData();
    }
    execute(val,opcion){
					
       if(opcion==1){
               this.formdata.append("especialidad",val);
           jq.ajax({
               async:true,
                 contentType:"application/x-www-form-urlencoded",
                url:jsonData["filtrarEspecialidad"] ,
                type: "post",
                dataType: "html",
                data:this.formdata,
                cache: false,
                contentType: false,
	             processData: false,
               beforeSend:iniciandoFiltrado,
                success:SuccesFiltrado,
                timeout:5000,
              error:problemas
            });
        }else if(opcion==2){
           localStorage.setItem("medico_id",val); 
        }else{
            console.error("opcion incorrecto");
        }
    }
}/*end class Filtrar*/

function iniciandoFiltrado(){
    
}
function SuccesFiltrado(data){
    var aux=JSON.parse(data);
    if(aux.status==1){
       var medicos_p=jq("#medicos_p");
        medicos_p.empty();
        medicos_p.append('<option value="" disabled selected>Seleccione</option>');
        for(var i=0;i<aux.num;i++){
            medicos_p.append('<option value="'+aux[i].id+'">'+aux[i].nom_app+'</option>');
        }
        jq('select').material_select(); 
    }
	   
}

function problemas(){
	
}
