
     class Medico{
	  constructor(){
	  jq('select').material_select();
      jq("#selectable" ).selectable({
      stop: function() {
        var result = jq( "#select-result" ).empty();
        jq( ".ui-selected", this ).each(function() {
          var index = jq( "#selectable li" ).index( this );
          result.append( " #" + ( index + 1 ) );
        });
      }
    });
    jq('.collapsible').collapsible({
      accordion : false
    });
    /***********************************/
    jq("#selectable_mas" ).selectable({
      stop: function() {
        var result = jq( "#select-resultados" ).empty();
        jq( ".ui-selected", this ).each(function() {
          var index = jq( "#selectable_mas li" ).index( this );
          result.append( " #" + ( index + 1 ) );
        });
      }
    });
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
	  
	 }