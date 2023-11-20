
// customer sign up and log in functions
function signUp(){
    let email = document.getElementById('email').value
    let pass = document.getElementById('pass').value
    console.log(email,pass)
    localStorage.setItem(email,pass)
    alert('Account created successfully')
}
function login(){
    let email = document.getElementById('email').value
    let pass = document.getElementById('pass').value
    if(localStorage.getItem(email)){
        if(pass === localStorage.getItem(email)){
            alert('Log in success.')
            location.replace('menu.html')
        }
        else{
            alert('Invalid password')
        }
    }
    else{
        alert('Invalid username')
    }
    managerlog()
}
// manager sign up and login functions
function managerSign(){
    let email = document.getElementById('email').value
    let pin = document.getElementById('pin').value
    console.log(email,pin)
    localStorage.setItem(email,pin)
    alert('Account created successfully')
}
function managerlog(){
    let email = document.getElementById('email').value
    let pin = document.getElementById('pin').value
    if(localStorage.getItem(email)){
        if(pin = localStorage.getItem('pin')){
            alert('Log in success.')
            location.replace('Manager_Directory.html')
        }
        else{
            alert('Invalid Manager Pin')
        }
    }
    else{
        alert('Invalid username')
    }
}
function myPassword(){
    var x = document.getElementById("input");
    if (x.type === "password") {
        x.type = "text" ;
    }
        else {
            x.type = "password";
        }
    }
 HEAD
    //shows password visibly when clicked


var CustomerLogin = {email: "123@t.com", password: "12345"}
var ManagerLogin= {email: "123@t.com", password: "12345"}
var SignupInfo = {email: "", password: ""} 