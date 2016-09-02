
     class Medico{
	  constructor(){
	  $('select').material_select();
      $("#selectable" ).selectable({
      stop: function() {
        var result = $( "#select-result" ).empty();
        $( ".ui-selected", this ).each(function() {
          var index = $( "#selectable li" ).index( this );
          result.append( " #" + ( index + 1 ) );
        });
      }
    });
    $('.collapsible').collapsible({
      accordion : false
    });
    /***********************************/
    $("#selectable_mas" ).selectable({
      stop: function() {
        var result = $( "#select-resultados" ).empty();
        $( ".ui-selected", this ).each(function() {
          var index = $( "#selectable_mas li" ).index( this );
          result.append( " #" + ( index + 1 ) );
        });
      }
    });
    /*************************/
    $( "#datepicker_m" ).datepicker({
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
var btn_guardar_paciente=$("#btn_guardar_paciente");
btn_guardar_paciente.click(function(e){
 e.preventDefault();
 alertify.success("siiii!!");
 });
	
	  }
	  
	 }