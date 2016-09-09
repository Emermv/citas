class Asistente{
    constructor(){
      jq('select').material_select();
    /*************************/   
					 jq('.collapsible').collapsible({
      accordion : false
    });
      jq( "#datepicker_a" ).datepicker({
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
jq( "#input_fecha_a" ).datepicker({
    monthNames: ['Enero', 'Febrero', 'Marzo',
'Abril', 'Mayo', 'Junio',
'Julio', 'Agosto', 'Septiembre',
'Octubre', 'Noviembre', 'Diciembre'],
dayNamesMin: ['Dom', 'Lun','Mar', 'Mier', 'Jue', 'Vier', 'Sab'],
onSelect: function (date) {
},
firstDay: 1,
dateFormat: "yy-mm-dd"
});
jq('.timepicker').pickatime({
    default: 'now',
    twelvehour: true,
    donetext: 'OK',
  autoclose: false,
    darktheme: true, 
  vibrate: true
});
var btn_guardar_paciente=jq("#btn_guardar_paciente");
btn_guardar_paciente.click(function(e){
 e.preventDefault();
 alertify.success("siiii!!");
 });  
    }
    
}