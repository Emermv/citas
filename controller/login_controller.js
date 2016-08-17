(function(){
    var clave_ok=false;
    var dni_ok=false;
    var email_ok=false;
    $(document).ready(function(){
      var form_login=$("#form_login");
      var dni=$("#dni");
      var clave=$("#password");
    var email=$("#email");
      var estado_dni=$("#estado_dni");
        var estado_clave=$("#estado_password");
        var estado_email=$("#estado_email");
        var btnRecuperarClave=$("#btnRecuperarClave");
        var content_form_recuperacion=$("#content_form_recuperacion");
        var btnCancelar=$("#btnCancelar");
        form_login.on("submit",function(event){
             login(event,dni,clave);
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
    function login(e,dni,clave){
        e.preventDefault();
             var formData=new FormData();
           if(dni_ok){
               if(clave_ok){
                   formData.append("dni",dni.val());
                   formData.append("clave",clave.val());
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
          setTimeout(function(){
           if(data===Base64.decode("b2s=")){
            $(location).attr("href","cita/");
        }else {
            $("#ajax_loader").addClass("hide");
           $("#content_form_login").show();
          mensaje_error(data);
        } 
       },2000);
    }
    function problemas(){
        mensaje_error("Problemas en el servidor");
    }
   
}());