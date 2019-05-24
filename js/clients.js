function newClient(){
   debugger;
        var addClient={ 
                    Name: $("#inputName").val(),
                    Email: $("#inputEmail").val(),
                    Street: $("#inputStreet").val(),
                    City: $("#inputCity").val(),
                    PostalCode: $("#inputZip").val(),
                    TypeId: $("#clientTypes").val(),
                    Industries: $("#clientIndustry").val()
                };
        $.ajax(
             {
                type:"POST",
                url:"http://localhost:50555/api/IndividualClient",
                crossDomain: true,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(addClient)
            })
            .done(function(){ window.location.href = "clients.html";})
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

        var form = document.getElementById("addClientForm");

        form.addEventListener("submit", function (event) {
             event.preventDefault();

                newClient();
        });

        var formSearch = document.getElementById("searchClientForm");

         formSearch.addEventListener("submit", function (event) {
              event.preventDefault();
              debugger;
                 var toSearch = $("#inputSearch").val();
                 var toType = $("#clientTypesSearch").val();
                 Search(toSearch, toType);
         });

            GetClietsTypes();
            GetIndustryList();
});

var populateClients = function (data)
{   debugger;
     $("#list").html("");
    for (var i =0; i<data.length;++i)
    {
        var client = $("<tr onclick=clickRow("+data[i].ID+")><td>"+data[i].Name+"</td><td>"+data[i].EMail+"</td><td>"+data[i].Street+"</td><td>"+data[i].City+"</td><td>"+data[i].PostalCode+"</td></tr>");
        $("#list").append(client);
    }
}

var clickRow = function(id)
{
    debugger;  
    window.location.href ="clientDetails.html?id="+id;
}

function GetClietsTypes()
{
 $.ajax(
        {
            url:"http://localhost:50555/api/IndividualClient/Type",
            dataType : "json" ,
            crossDomain: true
        })
        .done(populateClientsTypes)
        .fail(function(){alert("Sorry, there was a problem")})

}

var populateClientsTypes = function (data)
{   debugger;
    
    for (var i =0; i<data.length;++i)
    {
        var type = $("<option value ="+data[i].ID+">"+data[i].Name+"</option>");
        $("#clientTypes, #clientTypesSearch").append(type);

    }
}

function GetIndustryList()
{
 $.ajax(
        {
            url:"http://localhost:50555/api/IndividualClient/Industry",
            dataType : "json" ,
            crossDomain: true
        })
        .done(populateIndustry)
        .fail(function(){alert("Sorry, there was a problem")})

}

var populateIndustry = function (data)
{   debugger;
    
    for (var i =0; i<data.length;++i)
    {
        var industry = $("<option value ="+data[i].ID+">"+data[i].Name+"</option>");
        $("#clientIndustry, #clientIndustrySearch ").append(industry);
    }
}

function Search(toSearch, toType)
{debugger;
     $.ajax(
        {
            url:"http://localhost:50555/api/IndividualClient?toSearch="+toSearch+"&typeId="+toType,
            dataType : "json" ,
            crossDomain: true
        })
        .done(populateClients)
        .fail(function(){alert("Sorry, there was a problem")})
}