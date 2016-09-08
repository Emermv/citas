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
				this.hora_total_add=jq("#hora_total_add");
				this.hora_total=jq("#hora_total");
    /***********************************/
    this.horas_seleccionadas_A=0;
				this.horas_seleccionadas_B=0;
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
							this.horasA_m.empty().append(file_get_contents("includes/horas_item_medico.html"));
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
						initComponents(){
							mediconewInstance.setCheckboxHorasListener_B();
							mediconewInstance.setCheckboxHorasListener_A();
						}
		/********************************************************************************/
					setCheckboxHorasListener_B(){
						mediconewInstance.setOnChangeListener_B("ah0800_0815");
						mediconewInstance.setOnChangeListener_B("ah0815_0830");
						mediconewInstance.setOnChangeListener_B("ah0830_0900");
						mediconewInstance.setOnChangeListener_B("ah0900_0915");
						mediconewInstance.setOnChangeListener_B("ah0915_0930");
						mediconewInstance.setOnChangeListener_B("ah0930_1000");
						mediconewInstance.setOnChangeListener_B("ah1000_1015");
						mediconewInstance.setOnChangeListener_B("ah1030_1100");
						mediconewInstance.setOnChangeListener_B("ah1100_1115");
						mediconewInstance.setOnChangeListener_B("ah1115_1130");
						mediconewInstance.setOnChangeListener_B("ah1130_1200");
						mediconewInstance.setOnChangeListener_B("ah1200_1215");
						mediconewInstance.setOnChangeListener_B("ah1215_1230");
						mediconewInstance.setOnChangeListener_B("ah1230_1300");
						mediconewInstance.setOnChangeListener_B("ah1300_1315");
						mediconewInstance.setOnChangeListener_B("ah1315_1330");
						mediconewInstance.setOnChangeListener_B("ah1330_1400");
						mediconewInstance.setOnChangeListener_B("ah1400_1415");
						mediconewInstance.setOnChangeListener_B("ah1415_1430");
						mediconewInstance.setOnChangeListener_B("ah1430_1500");
						mediconewInstance.setOnChangeListener_B("ah1500_1515");
						mediconewInstance.setOnChangeListener_B("ah1515_1530");
						mediconewInstance.setOnChangeListener_B("ah1530_1600");
						mediconewInstance.setOnChangeListener_B("ah1600_1615");
						mediconewInstance.setOnChangeListener_B("ah1615_1630");
						mediconewInstance.setOnChangeListener_B("ah1630_1700");
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
				setOnChangeListener_B(id){
					var listItem=jq("#l"+id);
					var item=jq("#"+id).click(function(){
						  if(item.is(":checked")){
							     if(mediconewInstance.horas_seleccionadas_B<jsonData["tiempoMinutosMaximoCita"] && 
														mediconewInstance.horas_seleccionadas_B>=0){
													mediconewInstance.horas_seleccionadas_B+=30;
													mediconewInstance.sethora_total(mediconewInstance.hora_total_add,mediconewInstance.horas_seleccionadas_B);
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
									mediconewInstance.horas_seleccionadas_B-=30;
										mediconewInstance.sethora_total(mediconewInstance.hora_total_add,mediconewInstance.horas_seleccionadas_B);
												}
					});
					/* end  click*/
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
					/* end  click checkbox*/
					btnAdd.click(function(){
						jq.notify("OK","success");
					});
				}
		/********************************************************************************/
		/********************************************************************************/
	  
	 }//end  class Medico