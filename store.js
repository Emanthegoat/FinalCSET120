var NumberOfUsers = 0;
//all the login info for the manager
localStorage.setItem("ManagerUser", 'manager')
localStorage.setItem("ManagerEmail", 'manager@sugarsoiree.yummy')
localStorage.setItem("ManagerPassword", 'Qwerty1234')
localStorage.setItem("ManagerPin", '7791')
//user: manager  email:Manager@sugarsoiree.yummy  password: qwerty1234  pin: 7791

//all the login info for the already existing customer
localStorage.setItem("ExistCustomerUser", 'johndoe!!')
localStorage.setItem("ExistCustomerEmail", 'johndoe!@fak3.nam3')
localStorage.setItem("ExistCustomerPassword", 'IWantYummyFood123')




//make it so that stored logins are converted to lowercase




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
        NumberOfUsers++;
        localStorage.setItem(`Customer${NumberOfUsers}  Username`, user.toLowerCase());
        localStorage.setItem(`Customer${NumberOfUsers}  Password`, pass);
        localStorage.setItem(`Customer${NumberOfUsers}  Email`, email.toLowerCase());
        localStorage.setItem(`Customer${NumberOfUsers}  Name`, name)
        localStorage.setItem("CurrentLogin", "customer")
        location.replace('index.html');
    }

    localStorage.setItem("Number Of Users", NumberOfUsers)
        if(NumberOfUsers === 0)
        {
            if(localStorage.getItem("Number Of Users") !== 0)
            {
                NumberOfUsers = 0;
            }
        }
        if(NumberOfUsers !== 0)
        {
            localStorage.setItem("Number Of Users", NumberOfUsers)
        }
}

// // log in function for customer and manager - manager part needs to be added
function login()
{
    const userOrEmail = document.getElementById('Username-Or-Email').value
    const loginPass = document.getElementById('Login-Password').value
    userOrEmail.toLowerCase()
    //check for manager email match
    if(userOrEmail == localStorage.getItem('ManagerUser') || userOrEmail == localStorage.getItem('ManagerEmail'))//check 
    {
        if(loginPass === localStorage.getItem('ManagerPassword'))
        {
            alert('Login Successful')
            localStorage.setItem("CurrentLogin", "Manager")
            return location.href = 'Manager_Directory.html';
        }
        else
        {
            alert("Incorrect Username or Password")
            document.getElementById('Login-Password').innerText = "";
            document.getElementById('Username-Or-Email').innerText = "";
        }
    }
    else if(userOrEmail == localStorage.getItem('ExistCustomerUser') || userOrEmail == localStorage.getItem('ExistCustomerEmail'))//check existing cutomer email and user
    {
        if(loginPass === localStorage.getItem('ExistCustomerPassword'))
        {
            alert('Login Successful')
            localStorage.setItem("CurrentLogin", "customer")
            return location.href = 'index.html';
        }
        else
        {
            alert("Incorrect Username or Password")
            document.getElementById('Login-Password').innerText = "";
            document.getElementById('Username-Or-Email').innerText = "";
        }
    }
    else if(userOrEmail !== localStorage.getItem('ManagerUser') || userOrEmail !== localStorage.getItem('ManagerEmail') || userOrEmail !== localStorage.getItem('ExistCustomerUser') || userOrEmail !== localStorage.getItem('ExistCustomerEmail'))
    {
        //check stored emails
        for(let i = 0;i < NumberOfUsers.length; i++)
        {
            if(userOrEmail == localStorage.getItem(`Customer${i} Username`) || userOrEmail == localStorage.getItem(`Customer${i} Email`))
            {
                if(loginPass === localStorage.getItem(`Customer${i} Password`))
                {
                    alert('Login Successful')
                    localStorage.setItem("CurrentLogin", "customer")
                    return location.href = 'index.html';
                }
                else
                {
                    continue;
                }
            }
        }
        alert("Incorrect Username or Password")
        document.getElementById('Login-Password').innerText = "";
        document.getElementById('Username-Or-Email').innerText = "";
    }
    else
    {
        if(confirm("Account does not exist. Please Consider Registering"))
        {
            location.href = "signUp.html";
        }
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
//when the page is loaded this function runs
function ready()
{
   var WhereAmI = window.location.pathname
    if(WhereAmI == "/Incoming_Orders.html")
    {
        IncomingOrdersReady()
    }
}
function IncomingOrdersReady()
{
    var acceptButtons = document.getElementsByName("acceptOrder")
    for(let i = 0; i < acceptButtons.length; i++)
    {
        let button = acceptButtons[i]
        button.addEventListener('click', accept)
    }
    var completeButtons = document.getElementsByName('markAsComplete')
    for(let i = 0; i < completeButtons.length; i++)
    {
        let button = completeButtons[i]
        button.addEventListener('click', completedOrder)
    }
}
// accept button
function accept(event)
{
    let clickedButton = event.target.parentNode
    let clickedButtonParent = clickedButton.parentNode
    let acceptedOrdersDiv = document.getElementsByClassName('accepted-orders-grid')[0]
    localStorage.setItem('This is a test', acceptedOrdersDiv)
    acceptedOrdersDiv.appendChild(clickedButtonParent)
    button.setAttribute("name", "markAsComplete")
    button.innerText = "Mark As Complete"
    IncomingOrdersReady()
}
// completed order button
function completedOrder(event)
{
    let completedOrdersDiv = document.getElementsByClassName('completed-orders-grid')[0]
    let clickedButton = event.target.parentNode
    let clickedButtonParent = clickedButton.parentNode
    completedOrdersDiv.appendChild(clickedButtonParent)
    let button = event.srcElement
    button.setAttribute("name", "markedAsComplete")
    button.innerText = "Order Completed"
}