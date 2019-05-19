$(document).ready(function(){
    $.ajax(
        {
            url:"http://localhost:50555/api/Seller",
            dataType : "json" ,
            crossDomain: true
        })
        .done(populateSellers)
        .fail(function(){alert("Sorry, there was a problem")})

        var form = document.getElementById("addSellerForm");

        form.addEventListener("submit", function (event) {
             event.preventDefault();

                newSeller();
        });
            
});

var populateSellers = function (data)
{   debugger;
    // $("#list").html("");
    for (var i =0; i<data.length;++i)
    {
        var seller = $("<tr onclick=clickRow("+data[i].ID+")><td>"+data[i].Name+"</td></tr>");
        $("#list").append(seller);
    }
}

function newSeller(){
   debugger;
        var addSeller={ 
                    Name: $("#inputName").val()
         };
        $.ajax(
             {
                type:"POST",
                url:"http://localhost:50555/api/Seller",
                crossDomain: true,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(addSeller)
            })
            .done(function(){ window.location.href = "selers.html";})
            .fail(function(){alert("Sorry, there was a problem")});

}