window.onload = init;

function init() {
    var button = document.getElementById("add_button");
    button.onclick = addNotes;

    var stickiesArray = getStickiesArray();

    for (var i = 0; i < stickiesArray.length; i++) {
        var key = stickiesArray[i];
        var value = JSON.parse(localStorage[key]);
        addStickyToDOM(key, value);
    }
}

function addStickyToDOM(key, stickyObj) {
    var stickies = document.getElementById("stickies");
    var sticky = document.createElement("li");
    sticky.setAttribute("id", key);

    sticky.style.backgroundColor = stickyObj.color;

    var head = document.createElement("span");
    head.setAttribute("class", "stickyHead");
    head.innerHTML = stickyObj.title;
    sticky.appendChild(head);

    var span = document.createElement("span");
    span.setAttribute("class", "sticky");
    span.innerHTML = stickyObj.value;
    sticky.appendChild(span);

    stickies.appendChild(sticky);

    sticky.onclick = openEdit;
}

function createSticky() {
    var stickiesArray = getStickiesArray();
    var currentDate = new Date();
    var key = "sticky_" + currentDate.getTime();
    var colorSelectObj = document.getElementById("note_color");
    var index = colorSelectObj.selectedIndex;
    var color = colorSelectObj[index].value;

    var value = document.getElementById("note_text").value;
    var stickyObj = {
        "value": value,
        "color": color
    };
    localStorage.setItem(key, JSON.stringify(stickyObj));

    stickiesArray.push(key);
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    addStickyToDOM(key, stickyObj);
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

function deleteSticky(e) {
    if(confirm("Are you sure you want to delete?")) {
        var key = e.target.id;
        if (e.target.tagName.toLowerCase() == "span") {
            key = e.target.parentNode.id;
        }
        localStorage.removeItem(key);
        var stickiesArray = getStickiesArray();

        if (stickiesArray) {
            for (var i = 0; i < stickiesArray.length; i++) {
                if (key == stickiesArray[i]) {
                    stickiesArray.splice(i, 1);
                }
            }

            localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
        }

        removeStickyFromDOM(key);
    }
}

function removeStickyFromDOM(key) {
    var sticky = document.getElementById(key);
    sticky.parentNode.removeChild(sticky);
}

function openEdit(e) {
    var key = e.target.id;
    if (e.target.tagName.toLowerCase() == "span") {
        key = e.target.parentNode.id;
    }
    localStorage.setItem("openNote", key);
    location.assign("note.html");
}

function addNotes() {
    location.assign("addnote.html");
}