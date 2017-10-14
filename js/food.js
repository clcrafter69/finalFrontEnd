"use strict";

(function () {
    var  clearButton = document.getElementById("clear-button"),
        cuisineList = document.getElementById("cuisine-list"),
        categoryList = document.getElementById("cat-list"),
        cityList = document.getElementById("city-name"),
        findFood = document.getElementById("find-food"),
        restaurantList = document.getElementById("restaurant-list"),
        // carUrlDebug = "http://localhost:3000/",
        catUrl = "https://developers.zomato.com/api/v2.1/categories",
        urlCalled = "",
        cityUrl ="https://developers.zomato.com/api/v2.1/locations?query={{city_name}}",
        findUrl = "https://developers.zomato.com/api/v2.1/search?entity_id={{entity_id}}&entity_type=city&count=5&sort=rating&order=desc",
       // carUrl = "http://formreflector.azurewebsites.net/api/car/manufacturer/",
        httpRequest;

    var makeRequest = function makeRequest(url) {
        httpRequest = new XMLHttpRequest(); // This is my handle for doing AJAX requests
        //store the called url
        //urlCalled= url;

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

    var getData = function getData(){
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

       switch (urlCalled) {
       case catUrl:
        dataArr.categories.forEach(function(value, index, originalArray){
            console.log(value);
            var newItem = document.createElement("option");
               //  newSelect = document.createElement("select");

            newItem.classList.add("dropdown-item");
            newItem.innerText = value.categories.name;
            newItem.id = value.categories.id;
            categoryList.appendChild(newItem);
                            
        });  
        break; 
        case cityUrl:
        dataArr.location_suggestions.forEach(function(value, index, originalArray){
            console.log(value);


        /*    categoryList.innerHTML = "";
            var newItem = document.createElement("option");
               //  newSelect = document.createElement("select");

            newItem.classList.add("dropdown-item");
            newItem.innerText = value.city_name;
            newItem.id = value.city_id;
            categoryList.appendChild(newItem);*/

            cityList.innerText = value.city_name;
            cityList.id = value.city_id;

                
        }); 
        break;
        case findUrl:
        restaurantList.innerText="";
        var ourTable,
            ourTableBody,
            cell,
            cellText,
            cellRow,
            row;
        
          /*test table code--REMOVE after test*/

          var headerArray = ["Name","ADDRESS","CUISINE","RATING","LINK"];
              ourTable =document.createElement("table");
          ourTable.classList.add("table","table-striped","table-responsive");
          ourTableBody = document.createElement("tbody");
          for (var i = 0; i < 4; i++) {
               row = document.createElement("tr");
              // row.classList.add("thead-inverse");
              for (var j = 0; j <headerArray.length; j++) {
                   cell = document.createElement("th");
                   cellText = document.createTextNode(headerArray[j].toUpperCase());
                  cell.appendChild(cellText);
                  row.appendChild(cell);
              }
          }

          ourTableBody.appendChild(row);
        //  ourTable.appendChild(ourTableBody);
         // restaurantList.appendChild(ourTable);      

          dataArr.restaurants.forEach(function(value, index, originalArray){
            console.log(value); 
         //   restaurantList.innerText+=value.restaurant.url + " " +value.restaurant.location.address + " " + value.restaurant.cuisines + " " +value.restaurant.user_rating.aggregate_rating;

         //create row
         
            cellRow = document.createElement("tr");
            //populate cells
            for (var i = 0; i <= 5; i++) {    
                cell = document.createElement("td");
                if(i==0){
                cellText = document.createTextNode(value.restaurant.name);
                cell.appendChild(cellText);
                cellRow.appendChild(cell);
                }
                else if (i==1){
                cellText = document.createTextNode(value.restaurant.location.address);
                cell.appendChild(cellText);
                cellRow.appendChild(cell);
                }
                else if(i==2){
                cellText = document.createTextNode(value.restaurant.cuisines);
                cell.appendChild(cellText);
                cellRow.appendChild(cell);
                }
                else if (i==3)
                {
                cellText = document.createTextNode(value.restaurant.user_rating.aggregate_rating);
                cell.appendChild(cellText);
                cellRow.appendChild(cell);
                }
                else if (i==4)
                {
                cellText = document.createElement('a');
                cellText.href = value.restaurant.url;
                cellText.innerText= "GO!";
                cellText.target="_blank";
                cell.appendChild(cellText);
                cellRow.appendChild(cell);
                }
         }
         
         ourTableBody.appendChild(cellRow);
                 
        }); 
      //  ourTableBody.appendChild(cellRow);
        ourTable.appendChild(ourTableBody);
        restaurantList.appendChild(ourTable);   
        break;
        default:
        console.log('Mangoes and papayas are $2.79 a pound.');
        
    };
};


    //build restaurant string
    var foodString = function foodString()
    {
        findUrl = "https://developers.zomato.com/api/v2.1/search?entity_id=" +cityList.id + "&entity_type=city&category="+ document.getElementById("cat-list").selectedIndex + "&count=5&sort=rating&order=desc";
        urlCalled =findUrl;
    }

    //category event listener
  //  fetchButton.addEventListener("click", function () {
    cityList.addEventListener("focusout", function () {
        var searchUri ="",
             newSearchUri = "";
             urlCalled=cityUrl;
             newSearchUri = cityUrl.replace("{{city_name}}", cityList.value);         
            makeRequest(newSearchUri);
    }); 


    clearButton.addEventListener("click", function () {
        renderList("[]");
    });


    //add event listener for restaurants
    findFood.addEventListener("click",function () {
      /*  var searchUri ="",
             newSearchUri = "";
             urlCalled=cityUrl;
             newSearchUri = cityUrl.replace("{{city_name}}", cityList.value); */   
             foodString();     
            makeRequest(findUrl);
    }); 
    // load category list
    window.onload= function () { 
        urlCalled=catUrl;
        makeRequest(catUrl);
    };
})();