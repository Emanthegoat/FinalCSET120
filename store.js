// Customer sign up function
function registerCustomer()
{
    var message = "";

    document.getElementsByName("Name")[0].style.backgroundColor="";
    document.getElementsByName("Email")[0].style.backgroundColor="";
    document.getElementsByName("User")[0].style.backgroundColor="";
    document.getElementsByName("Pass")[0].style.backgroundColor="";
    document.getElementsByName("ConfirmPass")[0].style.backgroundColor="";

    const confirmPass = document.getElementById('confirm-password').value
    const user = document.getElementById('username').value
    const pass = document.getElementById('password').value
    const email = document.getElementById('email').value
    const name = document.getElementById('Name').value

    if(document.getElementsByName("Name")[0].value == "")
    {
        message+= "Please Enter Your Full Name \n";
        document.getElementsByName("Name")[0].style.backgroundColor="red";
    }
    
    if(document.getElementsByName("Email")[0].value == "")
    {
        message+= "Please Enter Your Email \n";
        document.getElementsByName("Email")[0].style.backgroundColor="red";
    }

    if(document.getElementsByName("User")[0].value == "")
    {
        message+= "Please Enter A Username \n";
        document.getElementsByName("User")[0].style.backgroundColor="red";
    }
    
    if(document.getElementsByName("Pass")[0].value == "")
    {
        message+= "Please Enter Your password \n";
        document.getElementsByName("Pass")[0].style.backgroundColor="red";
    }

    if(document.getElementsByName("ConfirmPass")[0].value == "")
    {
        message+= "Please Confirm Your password \n";
        document.getElementsByName("ConfirmPass")[0].style.backgroundColor="red";
    }

    if(confirmPass !== pass)
    {
        document.getElementsByName("Pass")[0].style.backgroundColor="red";
        document.getElementsByName("ConfirmPass")[0].style.backgroundColor="red";
        alert('Passwords Do Not Match');
    }

    if(message != "")
    {
        alert(message);
    }
    else
    {
        localStorage.setItem("RegisteredUsername", user);
        localStorage.setItem("RegisteredPassword", pass);
        localStorage.setItem("RegisteredEmail", email);
        localStorage.setItem("RegisteredName", name)
        localStorage.setItem("CurrentLogin", "customer")
        location.replace('index.html');
    }
}

// // log in function for customer and manager - manager part needs to be added
function login(){
    const user = document.getElementById('username').value 
    const pass = document.getElementById('password').value
    if(localStorage.getItem(user) == user){
        if(pass == localStorage.getItem(pass)){
            alert('Successful Log-in!')
            location.replace('menu.html')
        }
        else{
            alert('Invalid password entered')
        }
    }
    else{
        alert('Invalid username entered')
    }
}


//Checks and makes sure that the document is loaded before we access the different parts of it
if(document.readyState == "loading") 
{
    document.addEventListener("DOMContentLoaded", ready)
}
else{
    ready()
}
// accepts orders that are ready
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
// accept button
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
// completed order button
function completedOrder(event)
{
    let completedOrdersDiv = document.getElementsByClassName('completed-orders-grid')[0]
    let clickedButton = event.target.parentNode
    let clickedButtonParent = clickedButton.parentNode
    completedOrdersDiv.appendChild(clickedButtonParent)
    event.srcElement.remove()
}
