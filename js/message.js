function insertar_msj(){

  if( $("#messagetext_msj").val().length == 0 || $("#select-client").val().length == 0 || $("#select-cabin").val().length == 0){
        
    alert("Todos los campos son obligatorios")

  }else{
        let mensaje={
                    messageText:$("#messagetext_msj").val(), 
                    client:{idClient:+$("#select-client").val()},
                    cabin:{id:+$("#select-cabin").val()},    
        };
      
        let dataToSend=JSON.stringify(mensaje);
        console.log(mensaje);
        $.ajax({
            
            type:"POST",
            contentType : "application/json",
            dataType : 'json',
            url:"http://158.101.0.12:8080/api/Message/save",
            data:dataToSend,

            success:function(response) {
              $("#id_msj").val("");
              $("#messagetext_msj").val("");
              consultar_msj();
              alert("Se ha creado el mensaje exitosamente")
            }
      
        });
  
  }
}
  
  function consultar_msj(){
  
    $.ajax({

        type:'GET',
        contentType : "application/json",
        dataType: 'json',
        url:"http://158.101.0.12:8080/api/Message/all",
        
        success:function(response) {
  
          console.log(response);
          $("#resultado_msj").empty();
  
          for(i=0;i<response.length;i++){
  
            $("#resultado_msj").append("<tr>");
            $("#resultado_msj").append("<td>"+response[i].messageText+"</td>");
            $("#resultado_msj").append("<td>"+response[i].client.name+"</td>");
            $("#resultado_msj").append("<td>"+response[i].cabin.name+"</td>");
            $("#resultado_msj").append('<td><button onclick="consultar_msj_id('+response[i].idMessage+')">Edit</button></td>');
            $("#resultado_msj").append('<td><button onclick="eliminar_msj('+response[i].idMessage+')">Delete</button></td>');
            $("#resultado_msj").append("</tr>");
  
          }
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              
        }
    });
  
  }
  
  function consultar_msj_id(idmsj){
  
    $.ajax({

        type:'GET',
        contentType : "application/json",
        dataType: 'json',
        url:"http://158.101.0.12:8080/api/Message/"+idmsj,

        success:function(response) {
          console.log(response.client.idClient);
          $("#id_msj").val(response.id);
          $("#messagetext_msj").val(response.messageText);
          $("#select-client").val(response.client.idClient);
          $("#select-cabin").val(response.cabin.id);
                             
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              
        }
    });
  
  }
  

  function eliminar_msj(idmsj){
  
    var elemento={
                  id:idmsj
    };
  
    var dataToSend=JSON.stringify(elemento);
  
    $.ajax({

          type:"DELETE",
          contentType : "application/json",
          dataType : 'json',
          url:"http://158.101.0.12:8080/api/Message/"+idmsj,

          success:function(response) {
            console.log(response);
            consultar_msj();
            alert("Se ha eliminado el mensaje exitosamente")
          },
          
          error: function(jqXHR, textStatus, errorThrown) {
                
          }
      });
  
  }
  
  function actualizar_msj(){

    if( $("#messagetext_msj").val().length == 0 || $("#select-client").val().length == 0 || $("#select-cabin").val().length == 0){
        
      alert("Todos los campos son obligatorios")
  
    }else{
  
          let mensaje={

              id:$("#id_msj").val(),
              messageText:$("#messagetext_msj").val(), 
              client:{idClient: +$("#select-client").val()},
              cabin:{id: +$("#select-cabin").val()},    

          };
        
          var dataToSend=JSON.stringify(mensaje);
        
          $.ajax({

                  data:dataToSend,
                  contentType:'application/json',
                  url:"http://158.101.0.12:8080/api/Message/update",
                  type:'PUT',
                  
                  success:function(response) {
                  console.log(response);
                  $("#id_msj").val("");
                  $("#messagetext_msj").val("");
                  consultar_msj();
                  alert("Se ha actualizado los datos del mensaje exitosamente")
                  },
                  
                  error: function(jqXHR, textStatus, errorThrown) {
                      
                  }
              });
  
  }

}