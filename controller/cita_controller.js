	var jq=jQuery.noConflict(false);
 var jsonData;
	   var json=jQuery.getJSON("../values/defaultvalues.json",function(datos){
						jsonData=datos;
					});
(function(){
           /*init ui*********************************/
							   try{
											 jq("#tit_logo").append(Base64.decode(localStorage.getItem("tit")));
							    jq("#titulo").append(Base64.decode(localStorage.getItem("tit")));
							    jq(".navbarCita").addClass(Base64.decode(localStorage.getItem("bnc")));
										}catch(err){
											console.error(err);
											jq(location).attr("href","../");
										}

  jq(document).ready(function(){
			
      var usuario=jq("#usuario");
      usuario.empty();
      var cita=new Cita();
      var usuarios=new Usuario();
      if(usuarios.tipo==="Paciente"){
          usuario.append(file_get_contents("includes/paciente.html"));
							  jq("#paciente").addClass(Base64.decode(localStorage.getItem("cfp")));
          jq("#nombre").append('<span>'+usuarios.nombre+'</span>');
          jq("#apellidos").append('<span>'+usuarios.apellidos+'</span>');
          jq("#direccion").append('<span>'+usuarios.direccion+'</span>');
          jq("#telefono").append('<span>'+usuarios.telefono+'</span>');
          jq("#edad").append('<span>'+usuarios.edad+'</span>');
          jq("#genero").append('<span>'+usuarios.genero+'</span>');
       jq("#perfil").append('<img src="../'+usuarios.ruta_foto+'"><span class="card-title">'+usuarios.nombre+'</span>');
         
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
          jq("#perfil_m").append('<img src="../'+usuarios.ruta_foto+'"><span class="card-title">'+usuarios.nombre+'</span>');
          var medico=new Medico();
							     medico.initHorasA();
							      medico.initEspecialidades();
							     medico.initComponents();
      }else if(usuarios.tipo==="Asistente"){
          usuario.append(file_get_contents("includes/asistente.html"));
							jq("#asistente").addClass(Base64.decode(localStorage.getItem("cfa")));
          jq("#nombre_a").append('<span>'+usuarios.nombre+'</span>');
          jq("#apellidos_a").append('<span>'+usuarios.apellidos+'</span>');
          jq("#direccion_a").append('<span>'+usuarios.direccion+'</span>');
          jq("#telefono_a").append('<span>'+usuarios.telefono+'</span>');
          jq("#correo_a").append('<span>'+usuarios.correo+'</span>');
          jq("#genero_a").append('<span>'+usuarios.genero+'</span>');
          jq("#edad_a").append('<span>'+usuarios.edad+'</span>');
      jq("#perfil_a").append('<img src="../'+usuarios.ruta_foto+'"><span class="card-title">'+usuarios.nombre+'</span>');
          var asistente=new Asistente(Base64.decode(localStorage.getItem("cfa")));
							asistente.initComponents();
      }else if(usuarios.tipo==="Administrador"){
							
							usuario.append(file_get_contents("includes/administrador.html"));
							jq("body").append(file_get_contents("includes/footer.html"));
							jq("#medico").addClass(Base64.decode(localStorage.getItem("cfp")));
          var nom=jq("#nombre").val(usuarios.nombre);
          var ape=jq("#apellidos").val(usuarios.apellidos);
         var dir=jq("#direccion").val(usuarios.direccion);
          var tel=jq("#telefono").val(usuarios.telefono);
           var dn=jq("#dni").val(usuarios.dni);
          var ps=jq("#conpas").val(usuarios.ppp);
          dn.characterCounter();
          ps.characterCounter();

            jq("#btn_view_pass").click(function() {
             alertify.prompt("Ingrese tu contraseña actual",function(e,str){
             if(e){
               if(usuarios.ppp===str){
                ps.removeAttr('type');
                ps.attr('type','text');
                setTimeout(function(){
                     ps.removeAttr('type');
                ps.attr('type','password');
                },5000);
               }else{
                ps.removeAttr('type');
                ps.attr('type','password');
               }
             }else{
              ps.removeAttr('type');
                ps.attr('type','password');
             }
             });
            });
        
       jq("#perfil_admin").append('<img src="../'+usuarios.ruta_foto+'"><span class="card-title">'+usuarios.nombre+'</span>');
         
							var administrador=new Administrador();
							administrador.initComponents();
							var btn= jq("#btn_modificar_admin").click(function() {
                var aux=document.getElementById("foto");
                  if(nom.val()!==""){
                       if(ape.val()!==""){
                        if(dir.val()!==""){
                        if(tel.val()!==""){
                          if(dn.val()!=="" && dn.val().length==8){
                           if(ps.val()!=="" && ps.val().length==6){
                            if(aux.value!==""){
                               var form=new FormData();
                            form.append('nombre',nom.val());
                            form.append('apellidos',ape.val());
                            form.append('direccion',dir.val());
                            form.append('telefono',tel.val());
                            form.append('dni',dn.val());
                            form.append('pass',ps.val());
                            form.append('id',Base64.decode(localStorage.getItem("id")));
                         var file=aux.files[0];
                        form.append("foto",file);

                       administrador.ajaxAdmin("../php/modificar_admin.php",form,function(data){
                               try{
                                 var response=JSON.parse(data);
                                
                                 if(response.status==1){

                                  administrador.validarInput(btn,response.mensaje,'top','info');
                                  alertify.confirm("Debe volver ha inciar sesion, ¿desea hacerlo ahora?",function(e){
                                    if(e){
                                      jq(location).attr("href","../");
                                    }
                                  });
                                 }else{
                                  administrador.validarInput(btn,response.mensaje,'top','error');
                                 }
                               }catch(e){
                                administrador.validarInput(btn,e,'top','error');
                               }
                                });
                             }else{
                               administrador.validarInput(btn,"Foto requerido",'top','error');
                             }
                           }else{
                            administrador.validarInput(ps,"Contraseña requerido",'top','error');
                           }
                          }else{
                            administrador.validarInput(dn,"DNI requerido",'top','error');
                          }
                        }else{
                          administrador.validarInput(btn,"Telefono requerido",'top','error');
                        }
                        }else{
                          administrador.validarInput(btn,"Dirección requerido",'top','error');
                        }
                       }else{
                        administrador.validarInput(btn,"Apellidos requerido",'top','error');
                       }
                    
                        }else{
                        administrador.validarInput(btn,"Nombre requerido",'top','error');
                  }
                 });
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
        }else if(this.tipo==="Administrador"){
            this.ppp=Base64.decode(localStorage.getItem("ppp"));
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


