$(document).ready(function(){ debugger;

 $.ajax(
        {
            url:"http://localhost:50555/api/Product",
            dataType : "json" ,
            crossDomain: true
        })
        .done(populateProducts)
        .fail(function(){alert("Sorry, there was a problem")})

        GetProductCategories();

         var form = document.getElementById("addProductForm");

        form.addEventListener("submit", function (event) {
             event.preventDefault();

                newProduct(); 
            });

        var formSearch = document.getElementById("searchProductForm");

        formSearch.addEventListener("submit", function (event) {
             event.preventDefault();
                 var toSearch = $("#inputSearch").val();
                 var categoryId = $("#productCategorySearch").val();
                 Search(categoryId, toSearch);
             });

});

function GetProductCategories()
{
 $.ajax(
        {
            url:"http://localhost:50555/api/Product/Category",
            dataType : "json" ,
            crossDomain: true
        })
        .done(populateCategories)
        .fail(function(){alert("Sorry, there was a problem")})

}

var populateCategories = function (data)
{   debugger;
    // $("#list").html("");
    for (var i =0; i<data.length;++i)
    {
        
        var type = $("<option value ="+data[i].ID+">"+data[i].Name+"</option>");
        $("#productCategory, #productCategorySearch").append(type);
    }
}



var populateProducts = function (data)
{   debugger;
     $("#list").html("");
    for (var i =0; i<data.length;++i)
    {
        
        var product = $("<tr onclick=clickRow("+data[i].ID+")><td>"+data[i].Name+"</td><td>"+data[i].CategoryName+"</td><td>"+data[i].Price+"</td><td>"+data[i].Quantity+"</td></tr>");
        $("#list").append(product);
    }
}

function newProduct(){
   debugger;
        var addProduct={ 
                    Name: $("#inputName").val(),
                    Price: $("#inputPrice").val(),
                    Quantity: $("#inputQuantity").val(),
                    Category: $("#productCategory").val()
                };
        $.ajax(
             {
                type:"POST",
                url:"http://localhost:50555/api/Product",
                crossDomain: true,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(addProduct)
            })
            .done(function(){ window.location.href = "products.html";})
            .fail(function(){alert("Sorry, there was a problem")})
 }

function Search(categoryId, toSearch)
{debugger;
     $.ajax(
        {
            url:"http://localhost:50555/api/Product?categoryId="+categoryId+"&toSearch="+toSearch,
            dataType : "json" ,
            crossDomain: true
        })
        .done(populateProducts)
        .fail(function(){alert("Sorry, there was a problem")})
}

