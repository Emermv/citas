class Paciente{
    constructor(){
        /*******************************************************************/
    this.especialidades_p=jq("#especialidades_p");
    this.medicos_p=jq("#medicos_p");
    this.btn_guardar_paciente=jq("#btn_guardar_paciente");
					this.horas_seleccionadas=0;
    this.btn_guardar_paciente.click(function(e){
              e.preventDefault();
             alertify.success("hola");
             crear_cita_paciente();
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
    listar_horas_disponibles_p(date);
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
					 this.setCheckboxListener(jq("#h0800"),this,jq("#hora_total"));
					this.setCheckboxListener(jq("#h0830"),this,	jq("#hora_total"));
					this.setCheckboxListener(jq("#h0900"),this,	jq("#hora_total"));
					this.setCheckboxListener(jq("#h0930"),this,	jq("#hora_total"));
					this.setCheckboxListener(jq("#h1000"),this,	jq("#hora_total"));
					this.setCheckboxListener(jq("#h1030"),this,	jq("#hora_total"));
					this.setCheckboxListener(jq("#h1100"),this,	jq("#hora_total"));
					this.setCheckboxListener(jq("#h1130"),this,	jq("#hora_total"));
					this.setCheckboxListener(jq("#h1200"),this,	jq("#hora_total"));
					this.setCheckboxListener(jq("#h1230"),this,	jq("#hora_total"));
					this.setCheckboxListener(jq("#h1300"),this,	jq("#hora_total"));
					this.setCheckboxListener(jq("#h1330"),this,	jq("#hora_total"));
					this.setCheckboxListener(jq("#h1400"),this,	jq("#hora_total"));
					this.setCheckboxListener(jq("#h1430"),this,	jq("#hora_total"));
					this.setCheckboxListener(jq("#h1500"),this,	jq("#hora_total"));
					this.setCheckboxListener(jq("#h1530"),this,	jq("#hora_total"));
					this.setCheckboxListener(jq("#h1600"),this,	jq("#hora_total"));
					this.setCheckboxListener(jq("#h1630"),this,	jq("#hora_total"));
					this.setCheckboxListener(jq("#h1700"),this,	jq("#hora_total"));
				}
	  setCheckboxListener(id,instance,hora_total){
		  id.click(function(){
						if(id.is(":checked")){
							if(instance.horas_seleccionadas<jsonData["tiempoMinutosMaximoCita"]){
										instance.horas_seleccionadas+=30;
								hora_total.empty().append('<img src="../files/clock.png" alt="horas">'+
																											             instance.horas_seleccionadas+'.00 minutos');
								
							}else{
								alertify.alert("Lo sentimos, el tiempo maximo es de : "+jsonData["tiempoMinutosMaximoCita"]+" minutos");
							}
						}else{
								instance.horas_seleccionadas-=30;
								hora_total.empty().append('<img src="../files/clock.png" alt="horas">'+
																											             instance.horas_seleccionadas+'.00 minutos');
						}
					});
}
}
/*end class */
function listar_horas_disponibles_p(date){
    var formdata=new FormData();
    var medico=localStorage.getItem("medico_id");
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
               beforeSend:iniciandoListado,
                success:SuccesListado,
                timeout:5000,
              error:problemas
            }); 
    }else{console.error("medico no  seleccionado!");}
}


function iniciandoListado(){
    
}

function SuccesListado(data){
        var json=JSON.parse(data);
        var status_disponibilidad=jq("#status_disponibilidad").empty();
         var selectable=jq("#selectable").empty();
        selectable.append(file_get_contents("includes/horas_item.html"));
    if(json.status==1){
        var hora_aux="";
        for(var i=0;i<json.num;i++){
              if(json[i].estado==="ocupado"){
                  hora_aux=json[i].hora.split(":");
                  jq("#lh"+hora_aux[0]+hora_aux[1]).remove();
              }
        }
        status_disponibilidad.append('Visibles');
    }else{
        status_disponibilidad.append('Todo');
    }
}
function problemas(){
    
}
/**************************CREACION  DE CITA ******************************************/
function crear_cita_paciente(){
    var especialidad=jq("#especialidades_p").val();
    var medico=localStorage.getItem("medico_id");
    var descripcion=jq("#descripcion_p").val();
    var date=jq("#datepicker").datepicker("getDate");
    var fecha_arr=date.toLocaleDateString().split("/");
    var fecha=fecha_arr[2]+"-"+fecha_arr[1]+"-"+fecha_arr[0];
    var select=jq("#h1230").css("backgroundColor");
    alertify.success("color :"+select);
    if(especialidad!==null){
        if(medico!==null){
           if(fecha.replace("-","").replace("-","")!==""){
               alertify.success("ok");
           }else{
             alertify.success("no fecha");   
           }
        }else{
             alertify.success("no medci");
        }
        
    }else{
        alertify.success("no");
    }
    
}

/**************************END CREACION  DE CITA ******************************************/

class Filtrar{
    constructor(){
        this.formdata=new FormData();
    }
    execute(val,opcion){
					
       if(opcion==1){
								alertify.success(jsonData["filtrarEspecialidad"]);
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
}

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

