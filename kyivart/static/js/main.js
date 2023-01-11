body = document.getElementById("mode")
function themeChanger() {
    if (body.style.backgroundColor === "grey") {
        body.style.backgroundColor = "#ffffff";
        body.style.color = "black";
    } else {
        body.style.backgroundColor = "grey";
        body.style.color = "white";
    }
}
