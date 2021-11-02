function traerReporteStatus(){
    console.log("test");
    $.ajax({
        url:"http://158.101.0.12:9090/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}
function pintarRespuesta(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
    myTable+="</table>";
    $("#resultadoStatus").html(myTable);
}
function traerReporteDate(){

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);
    
        $.ajax({
            url:"http://158.101.0.12:9090/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
    }
    function pintarRespuestaDate(respuesta){

        let myTable="<table>";
        myTable+="<tr>";
          
        for(i=0;i<respuesta.length;i++){
        let fstarDay = moment(respuesta[i].startDate).format("DD-MM-YYYY");
        let fdevolutionDate = moment(respuesta[i].devolutionDate).format("DD-MM-YYYY");
        
            myTable+="<td>"+fdevolutionDate+"</td>";
            myTable+="<td>"+fstarDay+"</td>";
            myTable+="<td>"+respuesta[i].status+"</td>";
          
          
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoDate").html(myTable);

        //$("#totalReservas").append("<tr>");
        $("#totalReservas").append("<th>"+respuesta.length+"</th>");
        //$("#totalReservas").append("</tr>");
    }

    function traerReporteClientes(){
        $.ajax({
            url:"http://158.101.0.12:9090/api/Reservation/report-clients",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaClientes(respuesta);
            }
        });
    }
    function pintarRespuestaClientes(respuesta){

        let myTable="<table>";
        myTable+="<tr>";
          
        for(i=0;i<respuesta.length;i++){
       
            myTable+="<td>"+respuesta[i].client.name+"</td>";
            myTable+="<td>"+respuesta[i].client.email+"</td>";
            myTable+="<td>"+respuesta[i].client.age+"</td>";
            myTable+="<td>"+respuesta[i].total+"</td>";
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoClientes").html(myTable);
    }
