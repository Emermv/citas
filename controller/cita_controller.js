	var jq=jQuery.noConflict(false);
(function(){

  jq(document).ready(function(){
      var usuario=jq("#usuario");
      usuario.empty();
      var cita=new Cita();
      var usuarios=new Usuario();
      if(usuarios.tipo==="Paciente"){
        // requirejs("paciente","../controller/includes-controller/paciente.js");
          usuario.append(file_get_contents("includes/paciente.html"));
          jq("#nombre").append('<span>'+usuarios.nombre+'</span>');
          jq("#apellidos").append('<span>'+usuarios.apellidos+'</span>');
          jq("#direccion").append('<span>'+usuarios.direccion+'</span>');
          jq("#telefono").append('<span>'+usuarios.telefono+'</span>');
          jq("#edad").append('<span>'+usuarios.edad+'</span>');
          jq("#genero").append('<span>'+usuarios.genero+'</span>');
          jq("#perfil").append('<img src="../'+usuarios.ruta_foto+'"><span class="card-title">Datos del paciente : </span>');
         
          var paciente=new Paciente();
           var object_filtrar=new Filtrar();
            paciente.setOnSelectListener(paciente.especialidades_p,object_filtrar,1);
             paciente.setOnSelectListener(paciente.medicos_p,object_filtrar,2);
             
      }else if(usuarios.tipo==="Medico"){
          usuario.append(file_get_contents("includes/medico.html"));
          jq("#nombre_m").append('<span>'+usuarios.nombre+'</span>');
          jq("#apellidos_m").append('<span>'+usuarios.apellidos+'</span>');
          jq("#direccion_m").append('<span>'+usuarios.direccion+'</span>');
          jq("#telefono_m").append('<span>'+usuarios.telefono+'</span>');
          jq("#correo_m").append('<span>'+usuarios.correo+'</span>');
          jq("#perfil_m").append('<img src="../'+usuarios.ruta_foto+'"><span class="card-title">Datos del m&eacute;dico: </span>');
          var medico=new Medico();
      }else if(usuarios.tipo==="Asistente"){
          usuario.append(file_get_contents("includes/asistente.html"));
          jq("#nombre_a").append('<span>'+usuarios.nombre+'</span>');
          jq("#apellidos_a").append('<span>'+usuarios.apellidos+'</span>');
          jq("#direccion_a").append('<span>'+usuarios.direccion+'</span>');
          jq("#telefono_a").append('<span>'+usuarios.telefono+'</span>');
          jq("#correo_a").append('<span>'+usuarios.correo+'</span>');
          jq("#genero_a").append('<span>'+usuarios.genero+'</span>');
          jq("#edad_a").append('<span>'+usuarios.edad+'</span>');
          jq("#perfil_a").append('<img src="../'+usuarios.ruta_foto+'"><span class="card-title">Datos del asistente: </span>');
          var asistente=new Asistente();
      } 
      
      /********************************************************************************/
      jq("#btnSalir").click(function(){
         localStorage.clear(); 
      });
      
  });  
}());
/*************************************************************************************************************************/
var horas_selecciondas=new Array();

class Cita{
    constructor(){
        jq(".button-collapse").sideNav();
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
}

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
                url: "../php/filtrar_especialidades.php",
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
function getFecha(option){
        var time=new Date();
        if(option==1){
             return time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate();
        }else{
            var ultimoDia = new Date(time.getFullYear(), time.getMonth() + 1, 0);
            return  time.getFullYear()+"-"+(time.getMonth()+1)+"-"+ultimoDia.getDate();
        }
    }
function listar_horas_disponibles_p(date){
    var formdata=new FormData();
    var medico=localStorage.getItem("medico_id");
    if(medico!==null){
       formdata.append("medico",medico);
        formdata.append("fecha",date);
               jq.ajax({
               async:true,
                 contentType:"application/x-www-form-urlencoded",
                url: "../php/listar_calendario_citas_medico.php",
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
                  jq("#h"+hora_aux[0]+hora_aux[1]).attr("disabled","disabled");
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
function getItemSelected(index){
    if(index==0){
        return "08:00:00";
    }else if(index==1){
        return "08:30:00";
    }else if(index==2){
        return "09:00:00";
    }else if(index==3){
        return "09:30:00";
    }else if(index==4){
        return "10:00:00";
    }else if(index==5){
        return "10:30:00";
    }else if(index==6){
        return "11:00:00";
    }else if(index==7){
        return "11:30:00";
    }else if(index==8){
        return "12:00:00";
    }else if(index==9){
        return "12:30:00";
    }else if(index==10){
        return "13:00:00";
    }else if(index==11){
        return "13:30:00";
    }else if(index==12){
        return "14:00:00";
    }else if(index==13){
        return "14:30:00";
    }else if(index==15){
        return "15:00:00";
    }else if(index==16){
        return "15:30:00";
    }else if(index==17){
        return "16:00:00";
    }else if(index==18){
        return "16:30:00";
    }else if(index==19){
        return "17:00:00";
    }else{return -1;}
}
function include(js) {
var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.setAttribute('src', js);
document.getElementsByTagName('head')[0].appendChild(script);
}

function requirejs(id, src) {
    if (document.getElementById(id) != null) return;
    var js = document.createElement('script'); 
    js.id = id; js.async = false; js.src = src;
    document.getElementById("scripts").appendChild(js);
}