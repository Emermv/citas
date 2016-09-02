class Asistente{
    constructor(){
      $('select').material_select();
    /*************************/   
      $( "#datepicker_a" ).datepicker({
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
$( "#input_fecha_a" ).datepicker({
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
$('.timepicker').pickatime({
    default: 'now',
    twelvehour: true,
    donetext: 'OK',
  autoclose: false,
    darktheme: true, 
  vibrate: true
});
var btn_guardar_paciente=$("#btn_guardar_paciente");
btn_guardar_paciente.click(function(e){
 e.preventDefault();
 alertify.success("siiii!!");
 });  
    }
    
}