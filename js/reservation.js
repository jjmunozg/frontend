function insertar_res(){

    if( $("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 ||  $("#select-client").val().length == 0 || $("#select-cabin").val().length == 0){
          
      alert("Todos los campos son obligatorios")
  
    }else{
          let reserva={
                      startDate:$("#startDate").val(),
                      devolutionDate:$("#devolutionDate").val(),
                      client:{idClient:+$("#select-client").val()},
                      cabin:{id:+$("#select-cabin").val()},    
          };
        
          let dataToSend=JSON.stringify(reserva);
          console.log(reserva);
          $.ajax({
              
              type:"POST",
              contentType : "application/json",
              dataType : 'json',
              url:"http://158.101.0.12:8080/api/Reservation/save",
              data:dataToSend,
  
              success:function(response) {
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");
                consultar_res();
                alert("Se ha creado la reserva exitosamente")
              }
        
          });
    
    }
  }
    
    function consultar_res(){
    
      $.ajax({
  
          type:'GET',
          contentType : "application/json",
          dataType: 'json',
          url:"http://158.101.0.12:8080/api/Reservation/all",
          
          success:function(response) {
    
            console.log(response);
            $("#resultado_res").empty();
    
            for(i=0;i<response.length;i++){
                
              let fstarDay = moment(response[i].startDate).format("DD-MM-YYYY");
              let fdevolutionDate = moment(response[i].devolutionDate).format("DD-MM-YYYY");
              $("#resultado_res").append("<tr>");
              $("#resultado_res").append("<td>"+fstarDay+"</td>");
              $("#resultado_res").append("<td>"+fdevolutionDate+"</td>");
              $("#resultado_res").append("<td>"+response[i].status+"</td>");
              $("#resultado_res").append("<td>"+response[i].client.name+"</td>");
              $("#resultado_res").append("<td>"+response[i].cabin.name+"</td>");
              $("#resultado_res").append('<td><button onclick="consultar_res_id('+response[i].idReservation+')">Edit</button></td>');
              $("#resultado_res").append('<td><button onclick="eliminar_res('+response[i].idReservation+')">Delete</button></td>');
              $("#resultado_res").append("</tr>");
                }
          },
          
          error: function(jqXHR, textStatus, errorThrown) {
                
          }
      });
    
    }
    
    function consultar_res_id(idres){
    
      $.ajax({
  
          type:'GET',
          contentType : "application/json",
          dataType: 'json',
          url:"http://158.101.0.12:8080/api/Reservation/"+idres,
  
          success:function(response) {
            let fstarDay = moment(response.startDate).format("YYYY-MM-DD");
            let fdevolutionDate = moment(response.devolutionDate).format("YYYY-MM-DD");
           
            $("#id_res").val(response.idReservation);
            $("#startDate").val(fstarDay);
            $("#devolutionDate").val(fdevolutionDate);
            $("#status").val(response.status);
            $("#select-client").val(response.client.idClient);
            $("#select-cabin").val(response.cabin.id);
                               
          },
          
          error: function(jqXHR, textStatus, errorThrown) {
                
          }
      });
    
    }
    
  
    function eliminar_res(idres){
    
      var elemento={
                    id:idres
      };
    
      var dataToSend=JSON.stringify(elemento);
    
      $.ajax({
  
            type:"DELETE",
            contentType : "application/json",
            dataType : 'json',
            url:"http://158.101.0.12:8080/api/Reservation/"+idres,
  
            success:function(response) {
              console.log(response);
              consultar_res();
              alert("Se ha eliminado la reserva exitosamente")
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                  
            }
        });
    
    }
    
    function actualizar_res(){
  
        if( $("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0 ||  $("#select-client").val().length == 0 || $("#select-cabin").val().length == 0){
          
            alert("Todos los campos son obligatorios")
        
          }else{
                let reserva={
                            idReservation:$("#id_res").val(),
                            startDate:$("#startDate").val(),
                            devolutionDate:$("#devolutionDate").val(),
                            status:$("#status").val(),
                            client:{idClient:+$("#select-client").val()},
                            cabin:{id:+$("#select-cabin").val()},    
                };
          
            var dataToSend=JSON.stringify(reserva);
          
            $.ajax({
  
                    data:dataToSend,
                    contentType:'application/json',
                    url:"http://158.101.0.12:8080/api/Reservation/update",
                    type:'PUT',
                    
                    success:function(response) {
                    console.log(response);
                    $("#startDate").val("");
                    $("#devolutionDate").val("");
                    $("#status").val("");
                    consultar_res();
                    alert("Se ha actualizado la reserva exitosamente")
                   
                    },
                    
                    error: function(jqXHR, textStatus, errorThrown) {
                        
                    }
                });
    
    }
  
  }