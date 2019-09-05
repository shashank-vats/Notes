window.onload = init;

function init() {
    var key = localStorage.getItem("openNote");
    var note = JSON.parse(localStorage.getItem(key));

    var noteDOM = document.getElementById("note");
    noteDOM.style.backgroundColor = note.color;

    var title = document.getElementsByTagName("title")[0];
    title.innerHTML = note.title;

    var head = document.getElementById("head");
    head.innerHTML = note.title;
    
    var noteContent = document.getElementById("noteContent");
    noteContent.innerHTML = note.value;

    var editButton = document.getElementById("editButton");
    editButton.onclick = editNote;

    var deleteButton = document.getElementById("deleteButton");
    deleteButton.onclick = deleteNote;

    var backButton = document.getElementById("backButton");
    backButton.onclick = back;
}

function editNote() {
    var key = localStorage.getItem("openNote");
    localStorage.setItem("toEdit", "yes");

    location.assign("addnote.html");
}

function deleteNote() {
    var key = localStorage.getItem("openNote");

    if(confirm("Are you sure you want to delete?")) {
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
        location.assign("notetoself.html");
    }
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

function back() {
    location.assign("notetoself.html");
}