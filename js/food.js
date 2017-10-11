"use strict";

(function () {
    var fetchButton = document.getElementById("fetch-button"),
        clearButton = document.getElementById("clear-button"),
        categoryList = document.getElementById("cat-list"),
        // carUrlDebug = "http://localhost:3000/",
        carUrl = "https://developers.zomato.com/api/v2.1/categories",
       // carUrl = "http://formreflector.azurewebsites.net/api/car/manufacturer/",
        httpRequest;

    var makeRequest = function makeRequest(url) {
        httpRequest = new XMLHttpRequest(); // This is my handle for doing AJAX requests
       

        if (!httpRequest) {
            console.log("Error creating SMLHttp object");
            return false;
        }

        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
        httpRequest.onreadystatechange = getData;
        httpRequest.open("GET", url);
        httpRequest.setRequestHeader("user-key", "8267b8cd76a64d223ef1275eb2cdc63a");
        httpRequest.send();
    };

    var getData = function getData() {
        console.log(httpRequest.readyState);
       // httpRequest.setRequestHeader('Authorization', '8267b8cd76a64d223ef1275eb2cdc63a');
        if(httpRequest.readyState === XMLHttpRequest.DONE){
            if(httpRequest.status === 200){
                console.log("Go Data: " + httpRequest.responseText);
                renderList(httpRequest.responseText);
            }else {
                console.log("Error: " + httpRequest.status);
            }
        }
    };

    var renderList = function renderList(data){
        var dataArr = JSON.parse(data);

      //  manufacturerList.innerHTML = "";
        var newSelect;
        dataArr.categories.forEach(function(value, index, originalArray){
            console.log(value);
        
             //    newSelect =document.createElement("select");
            var newItem = document.createElement("option");
               //  newSelect = document.createElement("select");

            newItem.classList.add("dropdown-item");
           // newItem.classList.add("bg-secondary");

          //  newAnchor.href="https://developers.zomato.com/api/v2.1/categories/" + value.categories.id;
          //  newAnchor.href= "#";
            newItem.innerText = value.categories.name;
            newItem.id = value.categories.id;
          //  newItem.value = "https://developers.zomato.com/api/v2.1/categories/" + value.categories.id;
         //   newSelect.appendChild(newItem);
           // newSelect.appendChild(newItem);
            /*   if (index < 7)
        {*/
         categoryList.appendChild(newItem);
         // }//
         
        });
    
       // manufacturerList.appendChild(newSelect);

       /* console.log(dataArr.categories.length);
        console.log(dataArr.categories[0]);

        for (var i =0; i < dataArr.categories.length;i++)
        {
            console.log(dataArr.categories[i]);
               // console.log(dataArr.length);
        }*/
        
    };

    fetchButton.addEventListener("click", function () {
        makeRequest(carUrl);
    });

    clearButton.addEventListener("click", function () {
        renderList("[]");
    });

    window.onload= function () { 
        makeRequest(carUrl);
    };
})();