(function(){
    
  $(document).ready(function(){
      var btn_inicio=$(".btn_inicio");
      var btn_paciente=$(".btn_paciente");
      var btn_medico=$(".btn_medico");
      var btn_asistente=$(".btn_asistente");
      var paciente=$("#paciente");
      var medico=$("#medico");
      var asistente=$("#asistente");
      var inicio=$("#inicio");
      var cita=new Cita();
      paciente.load("includes/paciente.html");
      medico.load("includes/medico.html");
      asistente.load("includes/asistente.html");
      btn_inicio.click(function(e){
          e.preventDefault();
          cita.controlar_active(btn_inicio,btn_paciente,btn_medico,btn_asistente);
          cita.controlar_visible()
      });
      
      btn_paciente.click(function(e){
         e.preventDefault(); 
          cita.controlar_active(btn_paciente,btn_inicio,btn_medico,btn_asistente);
          cita.controlar_visible(paciente,medico,asistente);
      });
      btn_medico.click(function(){
         cita.controlar_active(btn_medico,btn_paciente,btn_inicio,btn_asistente); 
          cita.controlar_visible(medico,paciente,asistente);
      });
      btn_asistente.click(function(){
          cita.controlar_active(btn_asistente,btn_inicio,btn_medico,btn_paciente);
          cita.controlar_visible(asistente,medico,paciente);
      });
      
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
