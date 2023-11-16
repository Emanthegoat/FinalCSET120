function myPassword(){
var x = document.getElementById("input");
if (x.type === "password") {
    x.type = "text" ;
}
    else {
        x.type = "password";
    }
}
