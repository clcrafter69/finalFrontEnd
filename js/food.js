"use strict";

(function () {
    var fetchButton = document.getElementById("fetch-button"),
        clearButton = document.getElementById("clear-button"),
        categoryList = document.getElementById("cat-list"),
        cityList = document.getElementById("city-name"),
        // carUrlDebug = "http://localhost:3000/",
        catUrl = "https://developers.zomato.com/api/v2.1/categories",
        cityUrl ="https://developers.zomato.com/api/v2.1/locations?query=seattle",
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
            var newItem = document.createElement("option");
               //  newSelect = document.createElement("select");

            newItem.classList.add("dropdown-item");
            newItem.innerText = value.categories.name;
            newItem.id = value.categories.id;
            categoryList.appendChild(newItem);
         
        });
        
    };
    //category event listener
    fetchButton.addEventListener("click", function () {
        makeRequest(catUrl);
    });


    clearButton.addEventListener("click", function () {
        renderList("[]");
    });
    // load category list
    window.onload= function () { 
        makeRequest(catUrl);
    };
})();