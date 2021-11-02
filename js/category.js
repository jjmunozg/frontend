function autoLoadCategory(){
  console.log("se esta ejecutando")
  $.ajax({
      url:"http://158.101.0.12:8080/api/Category/all",
      type:"GET",
      datatype:"JSON",
      success:function(respuesta){
          console.log(respuesta);
          let $select = $("#select-category");
          $.each(respuesta, function (id, name) {
              $select.append('<option value='+name.id+'>'+name.name+'</option>');
              console.log("select "+name.id);
          }); 
      }
  
  })
}


function insertar_cat(){

  if( $("#name_cat").val().length == 0 || $("#desc_cat").val().length == 0){
      
    alert("Todos los campos son obligatorios")

  }else{

          let category={
                      name:$("#name_cat").val(),
                      description:$("#desc_cat").val(),
          };
        
        
          let dataToSend=JSON.stringify(category);
          console.log(category);
          $.ajax({
              
              type:"POST",
              contentType : "application/json",
              dataType : 'json',
              url:"http://158.101.0.12:8080/api/Category/save",
              data:dataToSend,
              
              success:function(response) {
                $("#name_cat").val("");
                $("#desc_cat").val("");
                consultar_cat();
                alert("Se ha creado la categoria exitosamente")
              }
        
          });
  }
}
  function consultar_cat(){
  
    $.ajax({
        
        type:'GET',
        contentType : "application/json",
        dataType: 'json',
        url:"http://158.101.0.12:8080/api/Category/all",
        
        
        success:function(response) {
          $("#resultado_cat").empty();
          console.log(response);
          for(i=0;i<response.length;i++){

           
            $("#resultado_cat").append("<tr>");
            //$("#resultado_cat").append("<td>"+response[i].id+"</td>");
            $("#resultado_cat").append("<td>"+response[i].name+"</td>");
            $("#resultado_cat").append("<td>"+response[i].description+"</td>");
            $("#resultado_cat").append('<td><button onclick="consultar_cat_id('+response[i].id+')">Edit</button></td>');
            $("#resultado_cat").append('<td><button onclick="eliminar_cat('+response[i].id+')">Delete</button></td>');
            $("#resultado_cat").append("</tr>");
  
          }
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              
        }
    });
  
  }
  
  function consultar_cat_id(idcat){
  
    $.ajax({
        
        type:'GET',
        contentType : "application/json",
        dataType: 'json',
        url:"http://158.101.0.12:8080/api/Category/"+idcat,
        
        success:function(response) {
          console.log(response);
          var item=response[0];
          console.log(item);
          $("#id_cat").val(response.id);
          $("#name_cat").val(response.name);
          $("#desc_cat").val(response.description);
          
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              
        }
    });
  
  }

  function eliminar_cat(idcat){
  
    var elemento={
                  id:idcat
    };
  
    var dataToSend=JSON.stringify(elemento);
  
    $.ajax({

          type:"DELETE",
          contentType : "application/json",
          dataType : 'json',
          url:"http://158.101.0.12:8080/api/Category/"+idcat,
          success:function(response) {
            console.log(response);
            consultar_cat();
            alert("Se ha eliminado la categoria exitosamente")
          },
          
          error: function(jqXHR, textStatus, errorThrown) {
                
          }
      });
  
  }
  
   
  function actualizar_cat(){

    if( $("#name_cat").val().length == 0 || $("#desc_cat").val().length == 0){
      
      alert("Todos los campos son obligatorios")
  
    }else{
  
          var category={
                        id:$("#id_cat").val(),
                        name:$("#name_cat").val(),
                        description:$("#desc_cat").val(),
          };
        
          var dataToSend=JSON.stringify(category);
          
          $.ajax({
                data:dataToSend,
                contentType:'application/json',
                url:"http://158.101.0.12:8080/api/Category/update",
                type:'PUT',
                
                success:function(response) {
                  console.log(response);
                  $("#id_cat").val("");
                  $("#name_cat").val("");
                  $("#desc_cat").val("");
                  consultar_cat();
                  alert("Se ha actualizado la categoria exitosamente")
                },
                
                error: function(jqXHR, textStatus, errorThrown) {
                      
                }
            });
  
  }
}
  
  