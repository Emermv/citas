(function(){
    $(document).ready(function(){
       var login_form=$("#login_form");
        var email=$("#email");
        var password=$("#password");
       login_form.on("submit",function(e){
          e.preventDefault();
           var formData=new FormData();
           if(email.val()!==""){
               if(password.val()!==""){
                   formData.append("email",email.val());
                   formData.append("password",password.val());
                $.ajax({
                async:true,
                type:"post",
                url:"centinelas/includes/login.php",
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
               mensaje_error("Ingrese tu email");
           }
       });
        
    });
    function problemas(){
        mensaje_error("Problemas con el servidor");
    }
    function iniciandoLogin(){
      var inputs=$("#inputs");
     var ajax_loader=$("#ajax_loader");
         inputs.hide();
        
        ajax_loader.show();
    }
    function recibiendoDatos(data){
       setTimeout(function(){
           if(data==="ok"){
            $(location).attr("href","centinelas/");
        }else {
            $("#ajax_loader").hide();
           $("#inputs").show();
          mensaje_error(data);
        } 
       },2000);
    }
    function mensaje_error(data){
         var msj=$("#mensaje_error");
        msj.empty();
              msj.append('<a class="waves-effect waves-light red-text" id="btn_error"><i class="material-icons left">error</i>'+
        data+'</a>');
            $("#btn_error").click(function(){
               $("#mensaje_error").empty(); 
            });
    }
}());