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
localStorage.setItem("ExistCustomerRecoverPin", "5288")



// Customer sign up function
function registerCustomer()
{
    var message = ""; //defines the message that will pop up saying what information is missing

    //resets the styles for the input tags
    document.getElementsByName("Name")[0].style.backgroundColor="";
    document.getElementsByName("Email")[0].style.backgroundColor="";
    document.getElementsByName("User")[0].style.backgroundColor="";
    document.getElementsByName("Pass")[0].style.backgroundColor="";
    document.getElementsByName("ConfirmPass")[0].style.backgroundColor="";
    //grabs all info needed from the html
    const confirmPass = document.getElementById('confirm-password').value
    const user = document.getElementById('username').value.toLowerCase()
    const pass = document.getElementById('password').value
    const email = document.getElementById('email').value.toLowerCase()
    const name = document.getElementById('Name').value
    //DETERMINES WHAT IS MISSING//  //all these determines what is missing and if so adds the error to the message variable and changes the backgroundColor of the missing input tag to red
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
    //DETERMINES WHAT IS MISSING END//

    //this confirms is the passwords match and if not changes them to be red background
    //this takes priority over everything else
    if(confirmPass !== pass)
    {
        document.getElementsByName("Pass")[0].style.backgroundColor="red";
        document.getElementsByName("ConfirmPass")[0].style.backgroundColor="red";
        return alert('Passwords Do Not Match');
    }

    //checks if the message isn't empty which means that there is an error
    if(message != "")
    {
        return alert(message);
    }
    else //if the message is empty procedes
    {
        //updates the number of users variable
        NumberOfUsers++;
        //asks the user if they would like to set up a recovery pin with ok or cancel prompt
        if(confirm("Would you like to set up a recovery Pin"))//if they click ok they proceed if cancel ends prompt and nothing else happens
        {
            let recoverpin = prompt('Please Enter The Pin')//prompts the user for a pin
            localStorage.setItem(`Customer${NumberOfUsers}RecoveryPin`, recoverpin)//stores the pin
        }
        //this increases the number of users 
        //gets all required information and sends it to the local storage
        localStorage.setItem(`Customer${NumberOfUsers}Username`, user);
        localStorage.setItem(`Customer${NumberOfUsers}Password`, pass);
        localStorage.setItem(`Customer${NumberOfUsers}Email`, email);
        localStorage.setItem(`Customer${NumberOfUsers}Name`, name)
        //sets who the current person logged in is to customer
        localStorage.setItem("CurrentLogin", "customer")
        //sends the custoemr to the index
        location.replace('index.html');
    }
    updateNumOfUsers();
}


var attempts = 0
function login()
{
    //grabs the info neccessary from the html input tags
    const userOrEmail = document.getElementById('Username-Or-Email').value.toLowerCase()
    const loginPass = document.getElementById('Login-Password').value
    userOrEmail.toLowerCase()//converts the user or email to lowercase to avoid later conflicts
    //check for manager email match
    if(userOrEmail == localStorage.getItem('ManagerUser') || userOrEmail == localStorage.getItem('ManagerEmail'))//checks if the inputed information matches the manager email
    {
        if(loginPass === localStorage.getItem('ManagerPassword'))//checks if the inpured information matches the manager password
        {
            alert('Login Successful')//if the if statement outputs true then the login is successful
            localStorage.setItem("CurrentLogin", "Manager")//sets the current user to manager
            let inputPin = Number(prompt('Please Input The Manager Pin'))//prompts the user for the manager pin
            console.log(localStorage.getItem('ManagerPin'), inputPin)
            if(inputPin == localStorage.getItem('ManagerPin'))//checks if the inputed pin matches the stored pin and if so it moves the user to manager directory and if not says incorrect pin and ends the function
            {
                return location.href = 'Manager_Directory.html';
            }
            else
            {
                alert("Incorrect Pin")
                return;
            }
        }
        else
        {
            alert('Incorrect Password')
            document.getElementById('Login-Password').value = "";
            attempts++
        }
    }
    else if(userOrEmail == localStorage.getItem('ExistCustomerUser') || userOrEmail == localStorage.getItem('ExistCustomerEmail'))//check existing cutomer email and user
    {
        console.log('else if exist starts')
        console.log(localStorage.getItem('ExistCustomerUser'))
        if(loginPass === localStorage.getItem('ExistCustomerPassword'))
        {
            console.log('password passed')
            alert('Login Successful')
            localStorage.setItem("CurrentLogin", "customer")
            return location.href = 'index.html';
        }
        else
        {
            alert('Incorrect Password')
            document.getElementById('Login-Password').value = "";
            attempts++
        }
    }
    else if(userOrEmail !== localStorage.getItem('ManagerUser') || userOrEmail !== localStorage.getItem('ManagerEmail') || userOrEmail !== localStorage.getItem('ExistCustomerUser') || userOrEmail !== localStorage.getItem('ExistCustomerEmail'))
    {
        //check stored emails
        for(let i = 1; i <= localStorage.getItem("Number Of Users").length; i++)
        {
            console.log(localStorage.getItem(`Customer${i}Password`))
            if(userOrEmail === localStorage.getItem(`Customer${i}Username`) || userOrEmail == localStorage.getItem(`Customer${i}Email`))
            {
                if(loginPass == localStorage.getItem(`Customer${i}Password`))
                {
                    alert('Login Successful')
                    localStorage.setItem("CurrentLogin", "customer")
                    return location.href = 'index.html';
                }
                else
                {
                    alert('Incorrect Password')
                    document.getElementById('Login-Password').value = "";
                    attempts++
                    return;
                }
            }
        }
        alert("Incorrect Username or Password")
        document.getElementById('Login-Password').value = "";
        document.getElementById('Username-Or-Email').value = "";
        attempts++
        if(attempts > 5)
        {
            if(confirm("Account does not exist. Please Consider Registering"))
            {
                location.href = "signUp.html";
            }
        }
        if(attempts == 5)
        {
            if(confirm("Forgot Username Or Password? Would you like to attempt to recover it?"))
            {
                RecoverInfo();
            }
        }
    }
}


function RecoverInfo()
{
    let recoverEmail = prompt("Please Enter your email")
    recoverEmail = recoverEmail.toLowerCase()
    if(recoverEmail === localStorage.getItem("ExistCustomerEmail"))
    {
        console.log("match exist")
        let enterRecovPin = prompt("Please Enter Your Recovery Pin")
        console.log(enterRecovPin)
        console.log(localStorage.getItem("ExistCustomerRecoverPin"))
        if(enterRecovPin == localStorage.getItem("ExistCustomerRecoverPin"))
        {
            console.log("correctPin")
            return alert(`Your Username is ${localStorage.getItem('ExistCustomerUser')} and your password is ${localStorage.getItem('ExistCustomerPassword')}`);
        }
        else{alert("Incorrect Pin")}
    }
    else
    {
        console.log("else starts")
        for(let i = 1; i <= localStorage.getItem("Number Of Users").length; i++)
        {
            console.log("for starts")
            console.log(i, (`Customer${i} Email`))
            console.log(localStorage.getItem(`Customer${1}Email`))
            console.log(localStorage.getItem('Customer1Email'))
            console.log(recoverEmail)
            if(recoverEmail == localStorage.getItem(`Customer${i}Email`))
            {

                console.log("match stored")
                let enterRecovPin = prompt('Please Enter Your Recovery Pin')
                if(enterRecovPin = localStorage.getItem(`Customer${i}RecoveryPin`))
                {
                    return alert(`Your Username is ${localStorage.getItem(`Customer${i}Username`)} and your password is ${localStorage.getItem(`Customer${i}Password`)}`)
                }
                else{alert("Incorrect Pin")}
            } 
            alert("This Email Does Not Exist In Our Database")
        }
        console.log('for ends')
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
    if(WhereAmI == '/login.html')
    {
        updateNumOfUsers()
    }
}

function updateNumOfUsers()
{
    //updates the number of users
        if(NumberOfUsers === 0)//when the page is reloaded the variable will be 0 and if so it pulls whatever number has been stored in the local storage
        {
            if(localStorage.getItem("Number Of Users") !== 0)
            {
                NumberOfUsers = Number(localStorage.getItem("Number Of Users"))
            }
        }
        else if(NumberOfUsers !== 0)//updates the local storage number when the number of users variable gets updated
        {
            localStorage.setItem("Number Of Users", NumberOfUsers)
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