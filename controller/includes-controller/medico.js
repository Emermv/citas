   var mediconewInstance;
     class Medico{
	  constructor(){
				this.horasA_m=jq("#horasA_m");
				this.horasB_min_m=jq("#horasB_min_m");
				this.especialidades_m=jq("#especialidades_m");
				mediconewInstance=this;
   jq('select').material_select();
				jq('.collapsible').collapsible({
      accordion : false
    });
    /***********************************/
 
    /*************************/
    jq( "#datepicker_m" ).datepicker({
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
var btn_guardar_paciente=jq("#btn_guardar_paciente");
btn_guardar_paciente.click(function(e){
 e.preventDefault();
 alertify.success("siiii!!");
 });
	
	  }
		/********************************************************************************/
						initHorasA(){
							this.horasA_m.empty().append(file_get_contents("includes/horas_item.html"));
						}
						initHorasBmin(){
							this.horasB_min_m.empty().append(file_get_contents("includes/horas_min_item.html"));
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
		/********************************************************************************/
		/********************************************************************************/
		/********************************************************************************/
		/********************************************************************************/
	  
	 }//end  class Medico