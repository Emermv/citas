	var jq=jQuery.noConflict(false);
 var jsonData;
(function(){
           /*init ui*********************************/
							   try{
											 jq("#tit_logo").append(Base64.decode(localStorage.getItem("tit")));
							    jq("#titulo").append(Base64.decode(localStorage.getItem("tit")));
							    jq("#navbarCita").addClass(Base64.decode(localStorage.getItem("bnc")));
										}catch(err){
											console.error(err);
											jq(location).attr("href","../");
										}
  jq(document).ready(function(){
			
      var usuario=jq("#usuario");
      usuario.empty();
      var cita=new Cita();
      var usuarios=new Usuario();
			  jq.getJSON("../values/default-values.json",function(datos){
						jsonData=datos;
					});
      if(usuarios.tipo==="Paciente"){
          usuario.append(file_get_contents("includes/paciente.html"));
							  jq("#paciente").addClass(Base64.decode(localStorage.getItem("cfp")));
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
            paciente.initOnHorasChangeListener();
							   paciente.setEspecialidades();
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
        }catch(err){console.error(" Error:"+err);
																				jq(location).attr("href","../");
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


	/*************************************************************************************************************************/

}());


