// variables for functions
var CustomerLogin = {email: "123@t.com", password: "12345"}
var ManagerLogin= {email: "123@t.com", password: "12345"}
var SignupInfo = {email: "", password: ""}
// General sign up function
function signUp(){
    let email = document.getElementById('email').value
    let pass = document.getElementById('pass').value
    console.log(email,pass)
    alert('Account created successfully')
}
// log in function for customer and manager
function login(){
    localStorage.setItem('email', CustomerLogin.email)
    localStorage.setItem('pass', ManagerLogin.email)
    let pin = document.getElementById('pin').value
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
    else if (localStorage.getItem(email)){
        if(){}
    }
    else{
        alert('Invalid username')
    }
}





// function myPassword(){
//     var x = document.getElementById("input");
//     if (x.type === "password") {
//         x.type = "text" ;
//     }
//         else {
//             x.type = "password";
//         }
//     }



