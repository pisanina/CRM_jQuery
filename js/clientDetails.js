var urlParams = new URLSearchParams(window.location.search);
var clientId= urlParams.get('id');
var typeID;
var industryList;

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

        var formMessage = document.getElementById("addMessageForm");

        formMessage.addEventListener("submit", function (event) {
             event.preventDefault();

                SendMessage();
        });
        
        $("#deleteClient").click(function(event) {
            DeleteClient()
        });
        GetClientIndustries();
        GetIndustryList();
        GetClietsTypes();
        GetMessages();
        GetSellers();

});

$(document).ajaxStop(function()
{
    $("#clientTypes").val(typeID);
    debugger;
    $("#clientIndustry").val(industryList);
});


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
                    TypeId: $("#clientTypes").val(),
                    Industries: $("#clientIndustry").val()
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

function GetClientIndustries()
{
 $.ajax(
        {
            url:"http://localhost:50555/api/IndividualClient/Industry/"+clientId ,
            dataType : "json" ,
            crossDomain: true
        })
        .done(populateClientsIndustries)
        .fail(function(){alert("Sorry, there was a problem")})

}

var populateClientsIndustries = function (data)
{   debugger;
   industryList = data;
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
    // $("#list").html("");
    for (var i =0; i<data.length;++i)
    {
        var industry = $("<option value ="+data[i].ID+">"+data[i].Name+"</option>");
        $("#clientIndustry").append(industry);
    }
}

function GetMessages()
{
 $.ajax(
        {
            url:"http://localhost:50555/api/Action/"+clientId,
            dataType : "json" ,
            crossDomain: true
        })
        .done(populateMessages)
        .fail(function(){alert("Sorry, there was a problem")})

}

var populateMessages = function (data)
{   debugger;
    // $("#list").html("");
    for (var i =0; i<data.length;++i)
    {
        
        var message = $("<tr onclick=clickRow("+data[i].ID+")><td>"+data[i].SellerName+"</td><td>"+data[i].MessageDateFormatted+"</td><td>"+data[i].Message+"</td></tr>");
        $("#messages").append(message);
    }
}


function GetSellers()
{ debugger;
 $.ajax(
        {
            url:"http://localhost:50555/api/Seller",
            dataType : "json" ,
            crossDomain: true
        })
        .done(populateSellers)
        .fail(function(){alert("Sorry, there was a problem")})

}

var populateSellers = function (data)
{   debugger;
    // $("#list").html("");
    for (var i =0; i<data.length;++i)
    {
        
        var seller = $("<option value ="+data[i].ID+">"+data[i].Name+"</option>");
        $("#sellerName").append(seller);
    }
}

function SendMessage(){
   debugger;
     var MessageDto={ 
                    ClientId : clientId,
                    SellerId : $("#sellerName").val(),
                    Message : $("#newMessage").val()
                   
                };
        $.ajax(
            {
                
                type:"Post",
                url:"http://localhost:50555/api/Action",
                // dataType : "json" ,
                crossDomain: true,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(MessageDto)
            })
            .done(function(){ window.location.href = "clientDetails.html?id="+clientId;})
            .fail(function(){alert("Error in sending message")});
  
};