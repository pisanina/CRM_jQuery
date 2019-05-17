var urlParams = new URLSearchParams(window.location.search);
var clientId= urlParams.get('id');

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
});

var populateClient = function (data)
    {   debugger;
        // $("#list").html("");
        $("#inputName").val(data.Name);
        $("#inputEmail").val(data.EMail);
        $("#inputStreet").val(data.Street);
        $("#inputCity").val(data.City);
        $("#inputZip").val(data.PostalCode);
   
    }

function UpdateClient(){
   debugger;
     var ClientDto={ 
                    ID : clientId,
                    Name : $("#inputName").val(),
                    EMail : $("#inputEmail").val(),
                    Street : $("#inputStreet").val(),
                    City : $("#inputCity").val(),
                    PostalCode : $("#inputZip").val()
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
            .done(function(){alert("Client changed")})
            .fail(function(){alert("Error in changing client")});
  
};