class Paciente{
    constructor(){
        /*******************************************************************/
    this.especialidades_p=$("#especialidades_p");
    this.medicos_p=$("#medicos_p");
    this.btn_guardar_paciente=$("#btn_guardar_paciente");
    this.btn_guardar_paciente.click(function(e){
              e.preventDefault();
             alertify.success("hola");
             crear_cita_paciente();
          });  
/*******************************************************************/
       $('select').material_select(); 
       /*  $("#selectable").selectable({
      stop: function() {
        var result = $( "#select-result" ).empty();
        $( ".ui-selected", this ).each(function() {
          var index = $( "#selectable li" ).index( this );
            var id=getItemSelected(index);
            if(id!=-1){
            horas_selecciondas.splice(0,horas_selecciondas.length);
              horas_selecciondas.push(id);
                console.log("desde aqui");
                for(var i in horas_selecciondas){
                    
                    console.log(horas_selecciondas[i]);
                }
              result.append(id);
            }
        });
      }
    });*/
 
 $("#datepicker" ).datepicker({
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
}
