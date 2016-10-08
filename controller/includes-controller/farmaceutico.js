var farmaInstance;
class Farmaceutico{
	constructor(){
	this.datepicker_f=jq("#datepicker_f");
		this.table_historial=jq("#table_historial");
		farmaInstance=this;
	}
	initComponents(){
		this.datepicker_f.datepicker({
inline:true,
monthNames: ['Enero', 'Febrero', 'Marzo',
'Abril', 'Mayo', 'Junio',
'Julio', 'Agosto', 'Septiembre',
'Octubre', 'Noviembre', 'Diciembre'],
dayNamesMin: ['Dom', 'Lun','Mar', 'Mier', 'Jue', 'Vier', 'Sab'],
onSelect: function (date) {
  farmaInstance.listar_historial(date);
},
firstDay: 1,
dateFormat: "yy-mm-dd",
showButtonPanel: true,
minDate:new Date()
		});    
	}
	
	listar_historial(date){
		var form=new FormData();
		form.append("opcion",4);
		form.append("fecha",date);
		form.append("id_paciente",1);
		form.append("id_medico",1);
		farmaInstance.ajaxFarma("../php/listar_historial.php",form,function(data){
			try{
				var resp=JSON.parse(data);
				farmaInstance.table_historial.empty();
				if(resp.status==1){
					for(var i=0;i<resp.num;i++){
						farmaInstance.setTable_historial(i+1,
																																	farmaInstance.getModalDiagnostico(i,resp[i].diagnostico),
																																	farmaInstance.getModalReceta(i,resp[i].receta),
																																		farmaInstance.getDescripcionAlergia(i,resp[i].descripcion_alergia,resp[i].alergico),
																																				resp[i].fecha,
																																				resp[i].hora,
																																			resp[i].especialidad,
																																			resp[i].nombre+' '+resp[i].apellidos,
																													farmaInstance.getActionFromHistorial(i,resp[i].diagnostico,resp[i].receta,resp[i].descripcion_alergia,resp[i].nombre+' '+resp[i].apellidos,resp[i].fecha,resp[i].hora),
																																			i
																																						);
					}
					jq('.modal-trigger').leanModal();
				}else{
					farmaInstance.mensaje(farmaInstance.table_historial,resp.mensaje,'top','error');
				}
			}catch(err){
				farmaInstance.mensaje(farmaInstance.table_historial,err,'top','error');
			}
		});
		
	}
	setTable_historial(id,diag,rec,alergico,fecha,hora,espe,medico,action,id_his){
		farmaInstance.table_historial.append('<tr id="trfarma'+id_his+'">'+
																																						'<td>'+id+'</td>'+
																																							'<td>'+diag+'</td>'+
																																							'<td>'+rec+'</td>'+
																																							'<td>'+alergico+'</td>'+
																																							'<td>'+fecha+'</td>'+
																																							'<td>'+hora+'</td>'+
																																							'<td>'+espe+'</td>'+
																																							'<td>'+medico+'</td>'+
																																							'<td>'+action+'</td>'+
																																						'</tr>');
	}
		/********************************************************************************************************/
		getActionFromHistorial(id,diag,rece,aler,medico,fecha,hora){
		return '<a class="btn-floating waves-effect waves-light blue" onclick="farmaInstance.imprSelec(this)" id="impr'+id+'">'+
								'<i class="material-icons">print</i></a>'+
			'<div id="imprimir'+id+'" class="modal bottom-sheet">'+
    '<div class="modal-content">'+
			'<h4>Datos generales :</h4>'+
      '<p> Fecha: '+fecha+'</p>'+
			   '<p> Hora: '+hora+'</p>'+
			   '<p>Médico:'+medico+'</p>'+
      '<h4>Diagnóstico</h4>'+
      '<p>'+diag+'</p>'+
			   '<h4>Receta Médica</h4>'+
      '<p>'+rece+'</p>'+
			'<h4>Alergias</h4>'+
      '<p>'+aler+'</p>'+
			'</div><div class="modal-footer">'+
    '</div></div>';
					}
		/********************************************************************************/
			getModalDiagnostico(id,diag){
				return '<a class="waves-effect waves-light btn-floating blue darken-4 modal-trigger" href="#diag'+id+'">'+
				'<i class="material-icons">visibility</i></a>'+
  '<div id="diag'+id+'" class="modal bottom-sheet">'+
    '<div class="modal-content">'+
      '<h4>Diagnóstico</h4>'+
      '<p>'+diag+'</p> </div><div class="modal-footer">'+
      '<a href="#!" class=" modal-action modal-close waves-effect waves-green btn-floating red">'+
					'<i class="material-icons black-text">close</i></a>'+
    '</div></div>';
			}
					getModalReceta(id,rec){
				return '<a class="waves-effect waves-light btn-floating green modal-trigger" href="#rec'+id+'">'+
				'<i class="material-icons">visibility</i></a>'+
  '<div id="rec'+id+'" class="modal bottom-sheet">'+
    '<div class="modal-content">'+
      '<h4>Receta médica</h4>'+
      '<p>'+rec+'</p> </div><div class="modal-footer">'+
      '<a href="#!" class=" modal-action modal-close waves-effect waves-green btn-floating red">'+
					'<i class="material-icons black-text">close</i></a>'+
    '</div></div>';
			}
		/********************************************************************************/
				getDescripcionAlergia(id,des,aler){
				if(aler==="SI"){
						return '<a class="waves-effect waves-light btn-floating teal accent-3 modal-trigger" href="#desaler'+id+'">'+
				'<i class="material-icons">visibility</i></a>'+
  '<div id="desaler'+id+'" class="modal bottom-sheet">'+
    '<div class="modal-content">'+
      '<h4>Alergias del paciente</h4>'+
      '<p>'+des+'</p> </div><div class="modal-footer">'+
      '<a href="#!" class=" modal-action modal-close waves-effect waves-green btn-floating red">'+
					'<i class="material-icons black-text">close</i></a>'+
    '</div></div>';
				}else{
					return '<a class="waves-effect waves-light btn-floating red"  disabled="disabled">'+
				'<i class="material-icons">visibility</i></a>';
				}
				}
		/********************************************************************************************************/
imprSelec(obj){
	var id=obj.id.replace("impr","");
	
	var ficha=document.getElementById("imprimir"+id);
	var ventimp=window.open('','popimpr');
	ventimp.document.write(ficha.innerHTML);
	ventimp.document.close();
	ventimp.print();
	ventimp.close();
}

		/********************************************************************************************************/
		/********************************************************************************************************/
		/********************************************************************************************************/
		/********************************************************************************************************/
		/********************************************************************************************************/
	mensaje(input,msj,pos,typ){
		input.notify(msj,{ position:pos,className:typ });
	}
	ajaxFarma(ruta,form,responsefuncion){
		jq.ajax({
               async:true,
                contentType:"application/x-www-form-urlencoded",
                url:ruta,
                type: "post",
                dataType: "html",
                data:form,
                cache: false,
                contentType: false,
	               processData: false,
                success:responsefuncion,
                timeout:5000,
                error:function(){
                	jq.notify("Problemas en el servidor!","error");
                }
            });
	}
}