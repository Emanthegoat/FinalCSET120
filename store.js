// variables for functions
// let pass = document.getElementById('pass').value
// let user = document.getElementById('user').value
// var CustomerLogin = {email: "123@t.com", password: "12345"}
// var ManagerLogin= {email: "123@t.com", password: "12345"}
// var SignupInfo = {email: "", password: ""}
// var creds = {user: "", pass: ""} 
// Customer sign up function

function signUp(){
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
    else if (localStorage.getItem(email)){}
    else{
        alert('Invalid username')
    }
}

// // log in function for customer and manager
// function login(){
//     localStorage.setItem('email', CustomerLogin.email)
//     localStorage.setItem('pass', ManagerLogin.email)
//     let pin = document.getElementById('pin').value
//     let email = document.getElementById('email').value
//     let pass = document.getElementById('pass').value
//     if(localStorage.getItem(email)){
//         if(pass === localStorage.getItem(email)){
//             alert('Log in success.')
//             location.replace('menu.html')
//         }
//         else{
//             alert('Invalid password')
//         }
//     }
//     else if (localStorage.getItem(email)){}
//     else{
//         alert('Invalid username')
//     }
// }












//Checks and makes sure that the document it loaded before we access the different parts of it
// if(document.readyState == "loading") 
// {
//     document.addEventListener("DOMContentLoaded", ready)
// }
// else{
//     ready()
// }
// // accepts orders that are ready
// function ready()
// {
//     var acceptButtons = document.getElementsByClassName("accept-order")
//     for(let i = 0; i < acceptButtons.length; i++)
//     {
//         let button = acceptButtons[i]
//         button.addEventListener('click', accept)
//     }
//     var completeButtons = document.getElementsByClassName('mark-as-complete')
//     for(let i = 0; i < completeButtons.length; i++)
//     {
//         let button = completeButtons[i]
//         button.addEventListener('click', completedOrder)
//     }
// }
// // accept button
// function accept(event)
// {
//     console.log(event.srcElement)
//     let acceptedOrdersDiv = document.getElementsByClassName('accepted-orders-grid')[0]
//     let clickedButton = event.target.parentNode
//     let clickedButtonParent = clickedButton.parentNode
//     acceptedOrdersDiv.appendChild(clickedButtonParent)
//     console.log(clickedButtonParent)
//     event.srcElement.remove()
// }
// // completed order button
// function completedOrder(event)
// {
//     let completedOrdersDiv = document.getElementsByClassName('completed-orders-grid')[0]
//     let clickedButton = event.target.parentNode
//     let clickedButtonParent = clickedButton.parentNode
//     completedOrdersDiv.appendChild(clickedButtonParent)
//     event.srcElement.remove()
// }
