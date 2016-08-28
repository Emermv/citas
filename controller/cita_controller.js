(function(){
  $(document).ready(function(){
      var usuario=$("#usuario");
      usuario.empty();
      var cita=new Cita();
      var usuarios=new Usuario();
      if(usuarios.tipo==="Paciente"){
          usuario.append(file_get_contents("includes/paciente.html"));
          $("#nombre").append('<span>'+usuarios.nombre+'</span>');
          $("#apellidos").append('<span>'+usuarios.apellidos+'</span>');
          $("#direccion").append('<span>'+usuarios.direccion+'</span>');
          $("#telefono").append('<span>'+usuarios.telefono+'</span>');
          $("#edad").append('<span>'+usuarios.edad+'</span>');
          $("#genero").append('<span>'+usuarios.genero+'</span>');
          $("#perfil").append('<img src="../'+usuarios.ruta_foto+'"><span class="card-title">Datos del paciente : </span>');
          var paciente=new Paciente();
           var object_filtrar=new Filtrar(1);
            paciente.setOnSelectListener(paciente.especialidades_p,object_filtrar);
             
      }else if(usuarios.tipo==="Medico"){
          usuario.append(file_get_contents("includes/medico.html"));
      }else if(usuarios.tipo==="Asistente"){
          usuario.append(file_get_contents("includes/asistente.html"));
      } 
  });  
}());


class Cita{
    constructor(){
        $(".button-collapse").sideNav();
    }
    controlar_active(btn1,btn2,btn3,btn4){
        btn1.addClass("active");
        btn2.removeClass("active");
        btn3.removeClass("active");
         btn4.removeClass("active");
    }
    controlar_visible(div1,div2,div3,div4){
        div1.show('slow');
        div2.hide('slow');
        div3.hide('slow');
        div4.hide('slow');
    }
}
class Usuario{
    constructor(){
        try{
        this.status=Base64.decode(localStorage.getItem("status"));
            if(this.status==="1"){
        this.tipo=Base64.decode(localStorage.getItem("tipo"));
        this.dni=Base64.decode(localStorage.getItem("dni"));
        this.nombre=Base64.decode(localStorage.getItem("nombre"));
        this.apellidos=Base64.decode(localStorage.getItem("apellidos"));
        this.direccion=Base64.decode(localStorage.getItem("direccion"));
        this.telefono=Base64.decode(localStorage.getItem("telefono"));
        this.ruta_foto=Base64.decode(localStorage.getItem("ruta_foto")); 
        if(this.tipo==="Paciente"){
        this.edad=Base64.decode(localStorage.getItem("edad"));
        this.genero=Base64.decode(localStorage.getItem("genero"));
        }else if(this.tipo==="Medico"){
        this.correo=Base64.decode(localStorage.getItem("correo"));
        }else if(this.tipo==="Asistente"){
            this.edad=Base64.decode(localStorage.getItem("edad"));
            this.correo=Base64.decode(localStorage.getItem("correo"));
            this.genero=Base64.decode(localStorage.getItem("genero"));
        }else{
            this.user=undefined;
        }
            }
        }catch(err){console.error(" Error:"+err.message);}
     
    }
    getStatus(){return this.status;}
    getTipo(){return this.tipo;}
    getDni(){return this.dni;}
    getNombre(){return this.nombre;}
    getApellidos(){return this.apellidos;}
    getDireccion(){return this.direccion;}
    
}

class Paciente{
    constructor(){
        /*******************************************************************/
    this.especialidades_p=$("#especialidades_p");
    
    this.btn_guardar_paciente=$("#btn_guardar_paciente");
    this.btn_guardar_paciente.click(function(e){
              e.preventDefault();
             alertify.success("esotoy");
          });  
    this.reset_fechas_p=$("#reset_fechas_p");
    this.fechas_p=$("#fechas_seleccionadas_p");
    this.num_fechas_p=0;
    this.reset_fechas_p.click(function(e){
        e.preventDefault();
    $("#fechas_seleccionadas_p").empty();
    });
/*******************************************************************/
       $('select').material_select(); 
      $('.tooltipped').tooltip({delay: 50});
         $("#selectable").selectable({
      stop: function() {
        var result = $( "#select-result" ).empty();
        $( ".ui-selected", this ).each(function() {
          var index = $( "#selectable li" ).index( this );
          result.append( " #" + ( index + 1 ) );
        });
      }
    });
 //$.datepicker.setDefaults($.datepicker.regional["es"]);
 $( "#datepicker" ).datepicker({
inline: true,
monthNames: ['Enero', 'Febrero', 'Marzo',
'Abril', 'Mayo', 'Junio',
'Julio', 'Agosto', 'Septiembre',
'Octubre', 'Noviembre', 'Diciembre'],
dayNamesMin: ['Dom', 'Lun','Mar', 'Mier', 'Jue', 'Vier', 'Sab'],
onSelect: function (date) {
     fechas_seleccionadas_p(date,this.num_fechas_p);
        this.num_fechas_p++;
},
firstDay: 1,
dateFormat: "yy-mm-dd",
showButtonPanel: true,
minDate:new Date()
});
$('.collapsible').collapsible({
      accordion : false
    });

    }
    setDimensions(image){
        image.height=50;
        image.width=50;
    }
    setOnSelectListener(selectlist,object){
        selectlist.on("change",function(){
            alertify.success("select");
            object.execute(selectlist.val());
            
        });
    }
}
function fechas_seleccionadas_p(date,num_fechas_p){
    $("#fechas_seleccionadas_p").append('<li class="collection-item" id="fecha_p'+num_fechas_p+'"><div>'+date+
        '<a href="#" class="secondary-content" onclick="eliminar_fecha_p('+num_fechas_p+')" >'+
        '<i class="material-icons">delete'+
        '</i></a></div></li>');
}
function  eliminar_fecha_p(num){
        $("#fecha_p"+num).remove();
}
class Filtrar{
    constructor(opcion){
        this.opcion=opcion;
        
    }
    execute(val){
       if(this.opcion==1){
            alertify.success(val);
           var formdata=new FormData();
               formdata.append("especialidad",val);
           $.ajax({
               async:true,
                 contentType:"application/x-www-form-urlencoded",
                url: "../php/filtrar_especialidades.php",
                type: "post",
                dataType: "html",
                data:formdata,
                cache: false,
                contentType: false,
	             processData: false,
               beforeSend:iniciandoListado,
                success:SuccesFiltrado,
                timeout:5000,
              error:problemas

            });
        }else{
            alertify.success("opccion 2");
        }
    }
    
}
function iniciandoListado(){
    
}
function SuccesFiltrado(data){
    var aux=JSON.parse(data);
    if(aux.status==1){
       var medicos_p=$("#medicos_p");
        medicos_p.empty();
        medicos_p.append('<option value="" disabled selected>Seleccione</option>');
        for(var i=0;i<aux.num;i++){
            medicos_p.append('<option value="'+aux[i].id+'">'+aux[i].nom_app+'</option>');
        }
        $('select').material_select(); 
    }
}
function problemas(){
    
}