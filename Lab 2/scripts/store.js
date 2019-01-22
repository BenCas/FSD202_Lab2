
var URL = 'http://restclass.azurewebsites.net';
var DB = []; 
var Categories = []; 
var storage = window.localStorage

$(document).ready(function () {

    $("#btnSave").click(register);

    $("#txtSearch").keyup(function (event) {
      
        var searchText = $("#txtSearch").val();
        search(searchText);
    });

    getData();
});

function Item(issue, title, price, image, category) {
    this.issue = issue;
    this.title = title;
    this.price = price;
    this.image = image;
    this.category = category;
    this.user = "Ben";
}

function register() {
    var issue = $("#txtIssue").val();
    var title = $("#txtTitle").val();
    var price = $("#txtPrice").val();
    var image = $("#txtImage").val();
    var cat = $("#selCat").val();

    var item = new Item(issue, title, price, image, cat);

    var jsonOb = JSON.stringify(item);

    $.ajax({
        type: "POST", 
        url: URL + '/API/points',
        contentType: 'application/json',
        data: jsonOb,
        success: function (res) {
            console.log(res);
        },
        error: function (res) {
            console.error("BAD", res);
        }

    });

}

function getData() {
    $.ajax({
        url: URL + '/API/points',
        type: "GET", 
        success: function (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].user == "Ben") {
                    DB.push(list[i]);
                }
            }
            showCatalog();
        },
        error: function (res) {
        }
    });
}

function displayItem(item) {
    var container = $("#catalog");


   var element =
        '<div class="item"> ' +
        '  <img src="images/' + item.image + '">  ' +
        '  <label class="lblCode">' + item.code + '</label>  ' +
        '  <label class="lblTitle">' + item.title + '</label> ' +
        ' </div>';

    $(container).append(element);
}

function showCatalog() {
    for (var i = 0; i < DB.length; i++) {
        var item = DB[i];
        var currentCategory = item.category;
        if (Categories.indexOf(currentCategory) < 0) { 
        }

        displayItem(item);
    }

    displayCategories();
}

function displayCategories() {
    var catContainer = $("#catList"); 
    for (var i = 0; i < Categories.length; i++) {
        var cat = Categories[i];
        var element = '<li><a onclick=filterByCat("' + cat + '") href="#">' + cat + '</a></li>';
        $(catContainer).append(element);
    }
}

function filterByCat(category) {

    var container = $("#catalog");
    $(container).html('');

    for (var i = 0; i < DB.length; i++) {
        var item = DB[i];
        if (item.category.toLowerCase() == category.toLowerCase()) {
            displayItem(item);
        }
    }
}

function search(text) {
    text = text.toLowerCase();
    var container = $("#catalog");

    $(container).html('');


    for (var i = 0; i < DB.length; i++) {
        var item = DB[i];

        if (
            item.title.toLowerCase().indexOf(text) >= 0 
            || 
            item.code.toLowerCase().indexOf(text) >= 0 
        ) {
            displayItem(item);
        }

    }
}


