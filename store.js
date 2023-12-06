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
localStorage.setItem("ExistCustomerName", "John Doe")


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
        localStorage.setItem("CurrentLoginType", "customer")
        localStorage.setItem("CurrentLoginName", name)
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
                return location.href = 'Manager_Directory.html'; //directs the user to the manager directory page
            }
            else//if the pin is incorrect
            {
                alert("Incorrect Pin")
                return;
            }
        }
        else//if the password does not match
        {
            alert('Incorrect Password')
            document.getElementById('Login-Password').value = "";//clears the input login tag
            attempts++ //increases the number of attempts
        }
    }
    else if(userOrEmail == localStorage.getItem('ExistCustomerUser') || userOrEmail == localStorage.getItem('ExistCustomerEmail'))//check existing cutomer email and user
    {
        if(loginPass === localStorage.getItem('ExistCustomerPassword')) //checks if what is in the password input tag matches what is stored
        {
            alert('Login Successful')
            localStorage.setItem("CurrentLogin", "customer")//sets the current person using the site to customer
            localStorage.setItem("CurrentLoginName", localStorage.getItem('ExistCustomerName'))//sets the current name of the user to the existing customers name for later use
            return location.href = 'index.html'; //takes user to home page
        }
        else//if the password does not match
        {
            alert('Incorrect Password')
            document.getElementById('Login-Password').value = "";
            attempts++
        }
    }
    else if(userOrEmail !== localStorage.getItem('ManagerUser') || userOrEmail !== localStorage.getItem('ManagerEmail') || userOrEmail !== localStorage.getItem('ExistCustomerUser') || userOrEmail !== localStorage.getItem('ExistCustomerEmail')) //if what is in the email/user input tag does not match either pre-set logins
    {
        //check stored emails
        for(let i = 1; i <= localStorage.getItem("Number Of Users").length; i++)
        {
            if(userOrEmail === localStorage.getItem(`Customer${i}Username`) || userOrEmail == localStorage.getItem(`Customer${i}Email`))//checks if what is in the email/user input tag matches any of the stored items
            {
                if(loginPass == localStorage.getItem(`Customer${i}Password`))//if the email/user passes it checks the password of the login
                {
                    alert('Login Successful')
                    localStorage.setItem("CurrentLogin", "customer")//sets the current person logged in as customr
                    localStorage.setItem("CurrentLoginName", localStorage.getItem(`Customer${i}Name`))//sets the current users name to who ever has logged in
                    return location.href = 'index.html';//takes the user to the home page
                }
                else//if the password is incorrect
                {
                    alert('Incorrect Password')
                    document.getElementById('Login-Password').value = "";//removes whatever is in the password input tag
                    attempts++//increases the number of attempts
                    return;
                }
            }
        }
        //if it does not pass any of the previous conditions this runs
        alert("Incorrect Username or Password")
        //clears both input tags
        document.getElementById('Login-Password').value = "";
        document.getElementById('Username-Or-Email').value = "";
        attempts++ //increases number of attempts
        if(attempts > 5)//if the user attempts to login more than 5 times
        {
            if(confirm("Account does not exist. Please Consider Registering")) //the confirm is an alert the the user can either click ok or cancel
            {
                location.href = "signUp.html";//if the user clicks okay this is run. which takes them to the sign up page
            }
        }
        if(attempts == 5)//on the 5 attempt logging in unsuccessfully 
        {
            if(confirm("Forgot Username Or Password? Would you like to attempt to recover it?"))//the confirm is an alert the the user can either click ok or cancel
            {
                RecoverInfo();//if they click okay this function is run
            }
        }
    }
}


function RecoverInfo()
{
    
    let recoverEmail = prompt("Please Enter your email")//prompt the user to enter their email
    recoverEmail = recoverEmail.toLowerCase()//converts whatever the user enters to lower case
    if(recoverEmail === localStorage.getItem("ExistCustomerEmail"))//checks if the email matches with the existing customer email
    {
        let enterRecovPin = prompt("Please Enter Your Recovery Pin")//prompts the user to enter their pin
        if(enterRecovPin == localStorage.getItem("ExistCustomerRecoverPin"))//if the stored pin matches the entered pin continue
        {
            return alert(`Your Username is ${localStorage.getItem('ExistCustomerUser')} and your password is ${localStorage.getItem('ExistCustomerPassword')}`); //this alerts the user what their info is
        }
        else{alert("Incorrect Pin")}//if the pin does not match
    }
    else //if inputed email does not match the existing customer
    {
        for(let i = 1; i <= localStorage.getItem("Number Of Users").length; i++)//runs through all of the stored users
        {
            if(recoverEmail == localStorage.getItem(`Customer${i}Email`))//if the inputed email matches a stored email
            {
                if(localStorage.getItem(`Customer${i}RecoveryPin`) == "")
                {
                    return alert("You did not set up a pin")
                }
                let enterRecovPin = prompt('Please Enter Your Recovery Pin')//prompts them to enter their pin
                if(enterRecovPin == localStorage.getItem(`Customer${i}RecoveryPin`))//if the inputed pin matches the stored pin
                {
                    return alert(`Your Username is ${localStorage.getItem(`Customer${i}Username`)} and your password is ${localStorage.getItem(`Customer${i}Password`)}`)//alerts the user to what their info is
                }
                else{alert("Incorrect Pin")}//if the pin is incorrect
            } 
            alert("This Email Does Not Exist In Our Database")//if it does not match and previous conditions it does not exist in our storage
        }
    }
}


function SignOut()//sign out function
{
    localStorage.setItem("CurrentLoginType", "")//clears the current login type
    localStorage.setItem("CurrentLoginName", "")//clears the current logged in users' name
    location.replace('login.html');//takes the user to the login page
}   


//Checks and makes sure that the document is loaded before we access the different parts of it
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
