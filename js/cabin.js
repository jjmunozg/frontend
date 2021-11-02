  
  function autoLoadCabin(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://158.101.0.12:8080/api/Cabin/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-cabin");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
  }
  
  
  function insertar_cab(){

    if( $("#name_cab").val().length == 0 || $("#brand_cab").val().length == 0 || $("#rooms_cab").val().length == 0 || $("#desc_cab").val().length == 0 || $("#select-category").val().length == 0){
        
        alert("Todos los campos son obligatorios")

    }else{
          let cabin={
                        name:$("#name_cab").val(),
                        brand:$("#brand_cab").val(),
                        rooms:$("#rooms_cab").val(),
                        description:$("#desc_cab").val(),
                        category:{id: +$("#select-category").val()},
          };


          let dataToSend=JSON.stringify(cabin);
          console.log(cabin);
          $.ajax({
              
              type:"POST",
              contentType : "application/json",
              dataType : 'json',
              url:"http://158.101.0.12:8080/api/Cabin/save",
              data:dataToSend,
              
              success:function(response) {
                $("#id_cab").val("");
                $("#brand_cab").val("");
                $("#rooms_cab").val("");
                $("#desc_cab").val("");
                $("#name_cab").val("");
                consultar_cab();
                alert("Se ha creado la cabaña exitosamente")
              }

          });
    }
}

function consultar_cab(){

  $.ajax({
      
      type:'GET',
      contentType : "application/json",
      dataType: 'json',
      url:"http://158.101.0.12:8080/api/Cabin/all",
      
      
      success:function(response) {
        $("#resultado_cab").empty();
        console.log(response);
        for(i=0;i<response.length;i++){

         
          $("#resultado_cab").append("<tr>");
          //$("#resultado_cat").append("<td>"+response[i].id+"</td>");
          $("#resultado_cab").append("<td>"+response[i].name+"</td>");
          $("#resultado_cab").append("<td>"+response[i].brand+"</td>");
          $("#resultado_cab").append("<td>"+response[i].rooms+"</td>");
          $("#resultado_cab").append("<td>"+response[i].description+"</td>");
          $("#resultado_cab").append("<td>"+response[i].category.name+"</td>");
          $("#resultado_cab").append('<td><button onclick="consultar_cab_id('+response[i].id+')">Edit</button></td>');
          $("#resultado_cab").append('<td><button onclick="eliminar_cab('+response[i].id+')">Delete</button></td>');
          $("#resultado_cab").append("</tr>");

        }
      },
      
      error: function(jqXHR, textStatus, errorThrown) {
            
      }
  });

}

function consultar_cab_id(idcab){

  $.ajax({
      
      type:'GET',
      contentType : "application/json",
      dataType: 'json',
      url:"http://158.101.0.12:8080/api/Cabin/"+idcab,
      
      success:function(response) {
        console.log(response);
        $("#id_cab").val(response.id);
        $("#name_cab").val(response.name);
        $("#brand_cab").val(response.brand);
        $("#rooms_cab").val(response.rooms);
        $("#desc_cab").val(response.description);
        $("#select-category").val(response.category.id);
        
      },
      
      error: function(jqXHR, textStatus, errorThrown) {
            
      }
  });

}

function eliminar_cab(idcab){

  var elemento={
                id:idcab
  };

  var dataToSend=JSON.stringify(elemento);

  $.ajax({

        type:"DELETE",
        contentType : "application/json",
        dataType : 'json',
        url:"http://158.101.0.12:8080/api/Cabin/"+idcab,
        success:function(response) {
          console.log(response);
          consultar_cab();
          alert("Se ha eliminado la categoria exitosamente")
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              
        }
    });

}

 
function actualizar_cab(){

if( $("#name_cab").val().length == 0 || $("#brand_cab").val().length == 0 || $("#rooms_cab").val().length == 0 || $("#desc_cab").val().length == 0 || $("#select-category").val().length == 0){
      
    alert("Todos los campos son obligatorios")

}else{

      var cabin={
                    id:$("#id_cab").val(),
                    name:$("#name_cab").val(),
                    brand:$("#brand_cab").val(),
                    rooms:$("#rooms_cab").val(),
                    description:$("#desc_cab").val(),
                    category:{id: +$("#select-category").val()},
      };

      var dataToSend=JSON.stringify(cabin);

      $.ajax({
            data:dataToSend,
            contentType:'application/json',
            url:"http://158.101.0.12:8080/api/Cabin/update",
            type:'PUT',
            
            success:function(response) {
              $("#id_cab").val("");
              $("#name_cab").val("");
              $("#brand_cab").val("");
              $("#rooms_cab").val("");
              $("#desc_cab").val("");
              consultar_cab();
              alert("Se ha actualizado la cabaña exitosamente")
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                  
            }
        });
  }
}
