(function(){
  $(document).ready(function(){
      var btn_inicio=$(".btn_inicio");
      var btn_usuarios=$(".btn_usuarios");
      var users=$("#users");
      users.load("includes/usuarios.html");
       var cita=new Cita();
      btn_inicio.click(function(e){
          e.preventDefault();
          cita.controlar_active(btn_usuarios,btn_inicio);
          
      });
      btn_usuarios.click(function(e){
         e.preventDefault(); 
          cita.controlar_active(btn_inicio,btn_usuarios);
      });
  });  
}());
class Cita{
    constructor(){
        $(".button-collapse").sideNav();

       
    }
    controlar_active(btn1,btn2){
        btn1.removeClass("active");
        btn2.addClass("active");
    }
}
