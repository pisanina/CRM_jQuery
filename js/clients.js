function newClient(){
   debugger;
        var addClient={ 
                    Name: $("#inputName").val(),
                    Email: $("#inputEmail").val(),
                    Street: $("#inputStreet").val(),
                    City: $("#inputCity").val(),
                    ZIP: $("#inputZip").val()
                };
        $.ajax(
             {
                type:"POST",
                url:"http://localhost:50555/api/IndividualClient",
                crossDomain: true,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(addClient)
            })
            .done(function(){alert("We have new client")})
            .fail(function(){alert("Sorry, there was a problem")});
    
}

$(document).ready(function(){
    $.ajax(
        {
            url:"http://localhost:50555/api/IndividualClient",
            dataType : "json" ,
            crossDomain: true
        })
        .done(populateClients)
        .fail(function(){alert("Sorry, there was a problem")})
});

var populateClients = function (data)
    {   debugger;
        // $("#list").html("");
        for (var i =0; i<data.length;++i)
        {
            var client = $("<tr><td>"+data[i].Name+"</td><td>"+data[i].EMail+"</td><td>"+data[i].Street+"</td><td>"+data[i].City+"</td><td>"+data[i].PostalCode+"</td></tr>");
            $("#list").append(client);
        }
    }