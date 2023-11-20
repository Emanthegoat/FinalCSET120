
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

var CustomerLogin = {email: "123@t.com", password: "12345"}
var ManagerLogin= {email: "123@t.com", password: "12345"}




if(document.readyState == "loading") //Checks and makes sure that the document it loaded before we access the different parts of it
{
    document.addEventListener("DOMContentLoaded", ready)
}
else{
    ready()
}

function ready()
{
    var acceptButtons = document.getElementsByClassName("accept-order")
    for(let i = 0; i < acceptButtons.length; i++)
    {
        let button = acceptButtons[i]
        button.addEventListener('click', accept)
    }
    var completeButtons = document.getElementsByClassName('mark-as-complete')
    for(let i = 0; i < completeButtons.length; i++)
    {
        let button = completeButtons[i]
        button.addEventListener('click', completedOrder)
    }
}

function accept(event)
{
    console.log(event.srcElement)
    let acceptedOrdersDiv = document.getElementsByClassName('accepted-orders-grid')[0]
    let clickedButton = event.target.parentNode
    let clickedButtonParent = clickedButton.parentNode
    acceptedOrdersDiv.appendChild(clickedButtonParent)
    console.log(clickedButtonParent)
    event.srcElement.remove()
}

function completedOrder(event)
{
    let completedOrdersDiv = document.getElementsByClassName('completed-orders-grid')[0]
    let clickedButton = event.target.parentNode
    let clickedButtonParent = clickedButton.parentNode
    completedOrdersDiv.appendChild(clickedButtonParent)
    event.srcElement.remove()
}