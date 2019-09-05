window.onload = init;

function init() {
    if(localStorage.getItem("toEdit") == "yes") {
        var key = localStorage.getItem("openNote");
        var note = JSON.parse(localStorage.getItem(key));

        var titleInput = document.getElementById("titleInput");
        var textContent = document.getElementById("textContent");
        var addButton = document.getElementById("addButton");
        addButton.value = "Save";

        var color = note.color;
        var index;

        if(color.toLowerCase() == "lightgoldenrodyellow") {
            index = 0;
        } else if (color.toLowerCase() == "palegreen") {
            index = 1;
        } else if (color.toLowerCase() == "lightpink") {
            index = 2;
        } else if (color.toLowerCase() == "lightblue") {
            index = 3;
        }

        var colorSelectObj = document.getElementById("note_color");
        colorSelectObj.selectedIndex = index;

        titleInput.value = note.title;
        textContent.innerHTML = note.value;
    } 
    changeColor();
    var yellowColor = document.getElementById("yellow");
    var greenColor = document.getElementById("green");
    var pinkColor = document.getElementById("pink");
    var blueColor = document.getElementById("blue");

    yellowColor.onclick = changeColor;
    greenColor.onclick = changeColor;
    pinkColor.onclick = changeColor;
    blueColor.onclick = changeColor;

    var addButton = document.getElementById("addButton");
    var cancelButton = document.getElementById("cancelButton");

    addButton.onclick = save;
    cancelButton.onclick = cancel;
}

function changeColor(e) {
    var colorSelect = document.getElementById("note_color");
    var index = colorSelect.selectedIndex;
    var color = colorSelect[index].value;

    var spanObj = document.getElementById("color");
    spanObj.style.backgroundColor = color;

    var titleObj = document.getElementById("titleInput");
    var textObj = document.getElementById("textContent");
    titleObj.style.backgroundColor = color;
    textObj.style.backgroundColor = color;
}

function save() {
    var stickiesArray = getStickiesArray();
    var currentDate = new Date();
    var key = "sticky_" + currentDate.getTime();
    var colorSelectObj = document.getElementById("note_color");
    var index = colorSelectObj.selectedIndex;
    var color = colorSelectObj[index].value;
    var title = document.getElementById("titleInput").value;
    var value = document.getElementById("textContent").value;
    var stickyObj = {
        "title": title,
        "value": value,
        "color": color
    };

    if (localStorage.getItem("toEdit") == "yes") {
        key = localStorage.getItem("openNote");
    } else {
        stickiesArray.push(key);
        localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    }
    localStorage.setItem(key, JSON.stringify(stickyObj));
    localStorage.setItem("toEdit", "no");
    location.assign("notetoself.html");
}

function getStickiesArray() {
    var stickiesArray = localStorage.getItem("stickiesArray");

    if (!stickiesArray) {
        stickiesArray = [];
        localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    } else {
        stickiesArray = JSON.parse(stickiesArray);
    }

    return stickiesArray;
}

function cancel() {
    if (localStorage.getItem("toEdit") == "yes") {
        localStorage.setItem("toEdit", "no");
        location.assign("note.html");
    } else {
        localStorage.setItem("toEdit", "no");
        location.assign("notetoself.html");
    }
}