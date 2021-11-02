
function autoLoadClient(){
  console.log("se esta ejecutando ClientAutoLoad")
  $.ajax({
      url:"http://158.101.0.12:8080/api/Client/all",
      type:"GET",
      datatype:"JSON",
      success:function(respuesta){
          console.log(respuesta);
          let $select = $("#select-client");
          $.each(respuesta, function (idClient, name) {
              $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
              console.log("select "+name.idClient);
          }); 
      }
  
  })
}


function insertar_cli(){

  if( $("#name_cli").val().length == 0 || $("#email_cli").val().length == 0 || $("#pass_cli").val().length == 0 || $("#age_cli").val().length == 0){
      
    alert("Todos los campos son obligatorios")

  }else{

        let cliente={
          
                    name:$("#name_cli").val(),
                    email:$("#email_cli").val(),
                    password:$("#pass_cli").val(),
                    age:$("#age_cli").val(),
        };
      
        let dataToSend=JSON.stringify(cliente);
        console.log(cliente);
        $.ajax({
            
            type:"POST",
            contentType : "application/json",
            dataType : 'json',
            url:"http://158.101.0.12:8080/api/Client/save",
            data:dataToSend,

            success:function(response) {
              $("#id_cli").val("");
              $("#name_cli").val("");
              $("#email_cli").val("");
              $("#pass_cli").val("");
              $("#age_cli").val("");
              consultar_cli();
              alert("Se ha creado el cliente exitosamente")
            }
      
        });
  
  }
}
  
  function consultar_cli(){
  
    $.ajax({

        type:'GET',
        contentType : "application/json",
        dataType: 'json',
        url:"http://158.101.0.12:8080/api/Client/all",
        
        success:function(response) {
  
          console.log(response);
          $("#resultado_cli").empty();
  
            for(i=0;i<response.length;i++){
  
            $("#resultado_cli").append("<tr>");
            $("#resultado_cli").append("<td>"+response[i].name+"</td>");
            $("#resultado_cli").append("<td>"+response[i].email+"</td>");
            $("#resultado_cli").append("<td>"+response[i].age+"</td>");
            $("#resultado_cli").append('<td><button onclick="consultar_cli_id('+response[i].idClient+')">Edit</button></td>');
            $("#resultado_cli").append('<td><button onclick="eliminar_cli('+response[i].idClient+')">Delete</button></td>');
            $("#resultado_cli").append("</tr>");
  
          }
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              
        }
    });
  
  }
  
  function consultar_cli_id(idcli){
  
    $.ajax({

        type:'GET',
        contentType : "application/json",
        dataType: 'json',
        url:"http://158.101.0.12:8080/api/Client/"+idcli,

        success:function(response) {
          console.log(response);
            
          $("#id_cli").val(response.idClient);
          $("#name_cli").val(response.name);
          $("#email_cli").val(response.email);
          $("#pass_cli").val(response.password);
          $("#age_cli").val(response.age);
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              
        }
    });
  
  }

  function eliminar_cli(idcli){
  
    var elemento={
                  id:idcli
    };
  
    var dataToSend=JSON.stringify(elemento);
  
    $.ajax({

          type:"DELETE",
          contentType : "application/json",
          dataType : 'json',
          url:"http://158.101.0.12:8080/api/Client/"+idcli,

          success:function(response) {
            console.log(response);
            consultar_cli();
            alert("Se ha eliminado el cliente exitosamente")
          },
          
          error: function(jqXHR, textStatus, errorThrown) {
                
          }
      });
  
  }
  
  
  function actualizar_cli(){

    if( $("#name_cli").val().length == 0 || $("#email_cli").val().length == 0 || $("#pass_cli").val().length == 0 || $("#age_cli").val().length == 0){
      
      alert("Todos los campos son obligatorios")
  
    }else{
  
          let cliente={

              idClient:$("#id_cli").val(),
              name:$("#name_cli").val(),
              email:$("#email_cli").val(),
              password:$("#pass_cli").val(),
              age:$("#age_cli").val(),

          };
        
          var dataToSend=JSON.stringify(cliente);
        
          $.ajax({

                  type:'PUT',
                  contentType:'application/json',
                  dataType: 'json',
                  data:dataToSend,
                  url:"http://158.101.0.12:8080/api/Client/update",
                              
                  success:function(response) {
                  console.log(response);
                  $("#id_cli").val("");
                  $("#name_cli").val("");
                  $("#email_cli").val("");
                  $("#pass_cli").val("");
                  $("#age_cli").val("");
                  consultar_cli();
                  alert("Se ha actualizado los datos del cliente exitosamente")
                  },
                  
                  error: function(jqXHR, textStatus, errorThrown) {
                      
                  }
              });
  
    }
  }
  
  
  