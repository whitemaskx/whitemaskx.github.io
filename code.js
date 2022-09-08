function setStyleSheet(){
    var stylesheet = document.getElementById("stylesheet");
    if(stylesheet.getAttribute("href") === "light.css"){
        stylesheet.setAttribute("href", "dark.css");
    }else{
        stylesheet.setAttribute("href", "light.css");
    }
}