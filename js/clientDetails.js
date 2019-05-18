var urlParams = new URLSearchParams(window.location.search);
var clientId= urlParams.get('id');
var typeID;

$(document).ready(function(){ debugger;
    $.ajax(
        { 
            url:"http://localhost:50555/api/IndividualClient/"+clientId,
            dataType : "json" ,
            crossDomain: true
        })
        .done(populateClient)
        .fail(function(){alert("Sorry, there was a problem")})

         var formedit = document.getElementById("editClientForm");

        formedit.addEventListener("submit", function (event) {
             event.preventDefault();

                UpdateClient();
        });
        
        $("#deleteClient").click(function(event) {
            DeleteClient()
        });
        GetClietsTypes();
});

$(document).ajaxStop(function(){$("#clientTypes").val(typeID);});

var populateClient = function (data)
    {   debugger;
        // $("#list").html("");
        $("#inputName").val(data.Name);
        $("#inputEmail").val(data.EMail);
        $("#inputStreet").val(data.Street);
        $("#inputCity").val(data.City);
        $("#inputZip").val(data.PostalCode);
        typeID= data.TypeId;
   
    }

function UpdateClient(){
   debugger;
     var ClientDto={ 
                    ID : clientId,
                    Name : $("#inputName").val(),
                    EMail : $("#inputEmail").val(),
                    Street : $("#inputStreet").val(),
                    City : $("#inputCity").val(),
                    PostalCode : $("#inputZip").val(),
                    TypeId: $("#clientTypes").val()
                };
        $.ajax(
            {
                
                type:"PUT",
                url:"http://localhost:50555/api/IndividualClient/",
                // dataType : "json" ,
                crossDomain: true,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(ClientDto)
            })
            .done(function(){ window.location.href = "clients.html";})
            .fail(function(){alert("Error in changing client")});
  
};

function DeleteClient(){
   debugger;
     
        $.ajax(
            {
                
                type:"Delete",
                url:"http://localhost:50555/api/IndividualClient/"+clientId,
                // dataType : "json" ,
                crossDomain: true
               
            })
            .done(function(){ window.location.href = "clients.html";})
            .fail(function(){alert("Error in deleting client")});
  
};

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
    // $("#list").html("");
    for (var i =0; i<data.length;++i)
    {
        
        var type = $("<option value ="+data[i].ID+">"+data[i].Name+"</option>");
        $("#clientTypes").append(type);
    }
}
