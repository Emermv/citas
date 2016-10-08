
(function(){
    var clave_ok=false;
    var dni_ok=false;
    var email_ok=false;
    $(document).ready(function(){
      var form_login=$("#form_login");
        var btn_login=$("#btn_login");
      var dni=$("#dni");
      var clave=$("#password");
    var email=$("#email");
      var estado_dni=$("#estado_dni");
        var estado_clave=$("#estado_password");
        var estado_email=$("#estado_email");
        var btnRecuperarClave=$("#btnRecuperarClave");
        var recupera_cuenta=$("#recupera_cuenta");
        var content_form_recuperacion=$("#content_form_recuperacion");
        var btnCancelar=$("#btnCancelar");
          form_login.on("submit",function(event){
             event.preventDefault();
             validar_dni(estado_dni,dni);
             validar_clave(estado_clave,clave);
             login(dni.val(),clave.val());
           });
        dni.on("blur",function(e){
         e.preventDefault();
            validar_dni(estado_dni,dni);
        });
        dni.on("focus",function(e){
            estado_dni.empty();
        });
          clave.on("focus",function(e){
            estado_clave.empty();
        });
        clave.on("blur",function(e){
           e.preventDefault();
            validar_clave(estado_clave,clave);
        });
        btnRecuperarClave.click(function(){
            form_login.hide();
            content_form_recuperacion.removeClass("hide");
            
        });
        btnCancelar.click(function(){
           content_form_recuperacion.addClass("hide");
            form_login.show();
        });
        email.on("blur",function(e){
            e.preventDefault();
            validar_email(estado_email,email);
        });
        email.on("focus",function(e){
           estado_email.empty(); 
        });
        recupera_cuenta.click(function(event) {
          event.preventDefault();
          recuperar_cuenta(email.val());
        });

    });
  function validar_dni(estado_dni,dni){
      estado_dni.empty();
      if(dni.val()!==""){
            if(!isNaN(dni.val()) && dni.val().length==8){
              estado_dni.append('<i class="material-icons prefix green-text ">done</i>');
                dni_ok=true;
        }else{
             estado_dni.append('<i class="material-icons prefix red-text ">error</i>');
        }
        }else{
             estado_dni.append('<i class="material-icons prefix deep-orange-text ">error</i>');
        }
  }
    function validar_clave(estado,clave){
        estado.empty();
      if(clave.val()!==""){
            if(clave.val().length==6){
              estado.append('<i class="material-icons prefix green-text ">done</i>');
                clave_ok=true;
        }else{
             estado.append('<i class="material-icons prefix red-text ">error</i>');
        }
        }else{
             estado.append('<i class="material-icons prefix deep-orange-text ">error</i>');
        }
    }
    function validar_email(estado,email){
          estado.empty();
      if(email.val()!==""){
            if(email.val().indexOf("@")!=-1){
              estado.append('<i class="material-icons prefix green-text ">done</i>');
                email_ok=true;
        }else{
             estado.append('<i class="material-icons prefix red-text ">error</i>');
        }
        }else{
             estado.append('<i class="material-icons prefix deep-orange-text ">error</i>');
        }
    }
    function login(dni,clave){
           var formData=new FormData();
        
           if(dni_ok){
               if(clave_ok){
                   formData.append("dni",dni);
                   formData.append("clave",clave);
                $.ajax({
                async:true,
                type:"post",
                url:"php/login.php",
                dataType:"html",
                data:formData,
                cache:false,
                contentType: false,
	             processData: false,
                beforeSend:iniciandoLogin, 
                success:recibiendoDatos,
                timeout:5000,
              error:problemas
            });
           
               }else{
                  mensaje_error("Ingrese tu contrase&ntilde;a"); 
               }
           }else{
               mensaje_error("Ingrese tu DNI");
           }
        return false;
    }
    function mensaje_error(mensaje){
    
        var btn=$("#mensaje_error");
        btn.empty();
        btn.append('<a class="waves-effect waves-light red-text" id="btn_error"><i class="material-icons left">warning</i>'+
        mensaje+'</a><br/>');
        btn.click(function(){
           btn.empty(); 
        });
    }
    function iniciandoLogin(){
          $("#content_form_login").hide();
          $("#ajax_loader").removeClass("hide");
        
    }
    function recibiendoDatos(data){
					         localStorage.clear();
												   $.getJSON("values/ui-config.json",function(datos){
										        localStorage.setItem("cf",Base64.encode(datos["colorFondo"]));
																  localStorage.setItem("cfp",Base64.encode(datos["colorFondoPaciente"]));
																localStorage.setItem("bnc",Base64.encode(datos["barraNavegacionColor"]));
																localStorage.setItem("tit",Base64.encode(datos["titulo"]));
																localStorage.setItem("cfa",Base64.encode(datos["colorFondoAsistente"]));
                   });
       setTimeout(function(){
           var credenciales=JSON.parse(data);
           var tipo="";
              
           localStorage.setItem("status",Base64.encode("-1"));
           if(credenciales.code!=="-1" && credenciales.status===Base64.decode("b2s=")){
												    localStorage.setItem("id",Base64.encode(credenciales.id));
               localStorage.setItem("dni",Base64.encode(credenciales.dni));
               localStorage.setItem("nombre",Base64.encode(credenciales.nombre));
               localStorage.setItem("apellidos",Base64.encode(credenciales.apellidos));
               localStorage.setItem("direccion",Base64.encode(credenciales.direccion));
               localStorage.setItem("telefono",Base64.encode(credenciales.telefono));
               localStorage.setItem("ruta_foto",Base64.encode(credenciales.ruta_foto));
               tipo=credenciales.tipo;
               localStorage.setItem("tipo",Base64.encode(tipo));
               if(tipo==="Asistente"){
                   localStorage.setItem("edad",Base64.encode(credenciales.edad));
                   localStorage.setItem("correo",Base64.encode(credenciales.correo));
                   localStorage.setItem("genero",Base64.encode(credenciales.genero));
               }else if(tipo==="Medico"){
                   localStorage.setItem("correo",Base64.encode(credenciales.correo));
               }else if(tipo==="Paciente"){
                   localStorage.setItem("edad",Base64.encode(credenciales.edad));
                   localStorage.setItem("genero",Base64.encode(credenciales.genero));
               }else if(tipo==="Administrador"){
                   localStorage.setItem("ppp",Base64.encode(credenciales.ppp));
               }else if(tipo==="Farmaceutico"){
																localStorage.setItem("correo",Base64.encode(credenciales.correo));
															}else{
																localStorage.setItem("tipo",Base64.encode("undefined"));
															}
               localStorage.setItem("status",Base64.encode("1"));
                $(location).attr("href","cita/");
           }else{
                 $("#ajax_loader").addClass("hide");
                $("#content_form_login").show();
                if(credenciales.status==="clave"){
               mensaje_error("Clave incorrecto");
           }else if(credenciales.status==="dni"){
               mensaje_error("DNI incorrecto");
           }else if(credenciales.status==="user"){
               mensaje_error("Este usuario no se encuentra registrado");
           }else if(credenciales.status==="server"){
               mensaje_error("No es posible establecer conexion");
           }else{
            mensaje_error("Error!");
           }
      
           }
       },1000);
        
    }
    function problemas(){
        mensaje_error("Problemas en el servidor");
    }

   function recuperar_cuenta(em){
    if(em!==""){
      var form=new FormData();
    form.append('email',em);
          
                $.ajax({
                async:true,
                type:"post",
                url:"php/recuperar_cuenta.php",
                dataType:"html",
                data:form,
                cache:false,
                contentType: false,
               processData: false,
                
                success:function(data){
                 try{
                   var response=JSON.parse(data);
                  if(response.status==1){
                    mensaje_info(response.mensaje);
                  }else{
                    mensaje_error(response.mensaje);
                  }
                 }catch(err){
                    mensaje_error(err);
                  }
                },
                timeout:5000,
              error:problemas
            });
      }else{
    mensaje_error("Ingrese tu email para poder recuperar tu cuenta ");
  }
    
   }
    function mensaje_info(mensaje){
    
        var btn=$("#mensaje_error");
        btn.empty();
        btn.append('<a class="waves-effect waves-light blue-text" id="btn_error"><i class="material-icons left">done</i>'+
        mensaje+'</a><br/>');
        btn.click(function(){
           btn.empty(); 
        });
    }
}());