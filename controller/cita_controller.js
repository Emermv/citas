(function(){
  $(document).ready(function(){
      var btn_inicio=$(".btn_inicio");
      var btn_usuarios=$(".btn_usuarios");
      var users=$("#users");
      var medico=$("#medico");
       var cita=new Cita();
        var btn_guardar_paciente;
      var paciente=new Paciente();
      medico.load("includes/medico.html");
      btn_inicio.click(function(e){
          e.preventDefault();
          cita.controlar_active(btn_usuarios,btn_inicio);
      });
      btn_usuarios.click(function(e){
         e.preventDefault(); 
          cita.controlar_active(btn_inicio,btn_usuarios);
          users.load("includes/paciente.html");
          
        /**/
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
class Paciente{
    constructor(){
    }
    init(){
        this.form_pacientes=$("#form_pacientes");
    }
    setOnSubmit(){
        this.form_pacientes.on("submit",function(e){
           e.preventDefault();
            alertify.success("siiiii");
        });
    }
}
