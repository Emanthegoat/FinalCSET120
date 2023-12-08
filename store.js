var NumberOfUsers = 0;
var NumberOfOrders = 0
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
if(document.readyState == "loading") //if it isn't ready
{
    document.addEventListener("DOMContentLoaded", ready)
}
else//if it is loaded calls the ready function
{
    ready()
}




//when the page is loaded this function runs
function ready()
{
    if(localStorage.getItem('CurrentLogin') == 'Manager')//checks if the current person logged in is the manager
    {
        let navBarLinks = document.getElementsByClassName('links')[0];//gets the position of the nav bar
        let ManDirLi = document.createElement('li')//creates an li element
        let ManDirAlink = document.createElement('a')//creates an a link element
        ManDirAlink.setAttribute('href', 'Manager_Directory.html')//sets the link href to the manager directory page
        ManDirAlink.innerText = "Manager Directory";//changes what the text of the a link displays
        navBarLinks.appendChild(ManDirLi)//appends the li to the nav bar
        ManDirLi.appendChild(ManDirAlink)//appends the a link to the li appened to the nav bar
    }
   var WhereAmI = window.location.pathname//gets the url of what page the user is on
    if(WhereAmI == "/Incoming_Orders.html")//if on the incoming orders page
    {
        IncomingOrdersReady()
    }
    if(WhereAmI == '/menu.html')
    {
        MenuReady()
    }
    if(WhereAmI == '/Checkout.html')
    {
        CheckoutReady()
    }
    updateNumOfUsers()
    updateNumOfOrders()
}

function updateNumOfUsers()
{
    //updates the number of users
        if(NumberOfUsers === 0)//when the page is reloaded the variable will be 0 and if so it pulls whatever number has been stored in the local storage
        {
            if(localStorage.getItem("Number Of Users") == null)
        {
            localStorage.setItem("Number Of Users", NumberOfUsers)
        }
        else if(localStorage.getItem("Number Of Users") !== 0)//if the local storage number of users is not 0
        {
            NumberOfUsers = Number(localStorage.getItem("Number Of Users"))//updates the variable number of users
        }
        }
        else if(NumberOfUsers !== 0)//updates the local storage number when the number of users variable gets updated
        {
            localStorage.setItem("Number Of Users", NumberOfUsers)
        }
}

function updateNumOfOrders()
{
    console.log('here')
    //updates the number of users
        if(NumberOfOrders == 0)//when the page is reloaded the variable will be 0 and if so it pulls whatever number has been stored in the local storage
        {
            console.log('here1')
            if(localStorage.getItem("Number Of Orders") == null)
            {
                console.log('here1.1')
                localStorage.setItem("Number Of Orders", NumberOfOrders)
            }
            else if(localStorage.getItem("Number Of Orders") !== 0)//if the local storage number of users is not 0
            {
                console.log('here1.2')
                NumberOfOrders = Number(localStorage.getItem("Number Of Orders"))//updates the variable number of users
            }
        }
        else if(NumberOfOrders !== 0)//updates the local storage number when the number of users variable gets updated
        {
            console.log('here2')
            localStorage.setItem("Number Of Orders", NumberOfOrders)
        }
}

function IncomingOrdersReady()
{
    var acceptButtons = document.getElementsByName("acceptOrder")//gets the accept buttons to add the accept function to them
    for(let i = 0; i < acceptButtons.length; i++)
    {
        let button = acceptButtons[i]
        button.addEventListener('click', accept)
    }
    var completeButtons = document.getElementsByName('markAsComplete')//gets the mark as complete buttons to add the complete order function to them
    for(let i = 0; i < completeButtons.length; i++)
    {
        let button = completeButtons[i]
        button.addEventListener('click', completedOrder)
    }
}
// accept button
function accept(event)
{
    //gets the div of the clicked button
    let button = event.srcElement
    let clickedButton = event.target.parentNode
    let clickedButtonParent = clickedButton.parentNode
    let acceptedOrdersDiv = document.getElementsByClassName('accepted-orders-grid')[0]//gets the accepted orders div
    acceptedOrdersDiv.appendChild(clickedButtonParent)//moves the clicked button parent to the accepted orders div
    button.setAttribute("name", "markAsComplete")//changes the button on the bottom of the clicked div to marked as complete
    button.innerText = "Mark As Complete"
    IncomingOrdersReady()//calls the incoming orders ready to resets the onclick attribute
}
// completed order button
function completedOrder(event)
{
    let completedOrdersDiv = document.getElementsByClassName('completed-orders-grid')[0]//gets the completed orders div
    //gets the button and the div the button is in
    let clickedButton = event.target.parentNode
    let clickedButtonParent = clickedButton.parentNode
    completedOrdersDiv.appendChild(clickedButtonParent)//appends the div the button is in to the completed orders div
    let button = event.srcElement //gets the button source
    button.setAttribute("name", "markedAsComplete")//changes the name attribute of the button
    button.innerText = "Order Completed"//changes the text of the button 
}


function MenuReady()
{
    var removeCartItemButtons = document.getElementsByClassName("btn-remove")
    for(var i = 0; i< removeCartItemButtons.length; i++)
    {
        var button = removeCartItemButtons[i]
        button.addEventListener("click", removeCartItem)
    }

    var quantityInput = document.getElementsByClassName("cart-quantity-input")
    for(var i = 0; i< quantityInput.length; i++)
    {
        var input = quantityInput[i]
        input.addEventListener("change", quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName("shop-item-button")
    for(var i = 0; i< addToCartButtons.length; i++)
    {
        var button = addToCartButtons[i]
        button.addEventListener("click", addToCartClicked)
    }
    var purchaseButton = document.getElementsByClassName("btn-checkout")[0]
    purchaseButton.addEventListener('click', checkoutClicked)
}
function removeCartItem(event)//when you click remove button for any cart item event listener 
{
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
function quantityChanged(event) //event listener for whenever aa quantity is changed
{
    var input = event.target
    if(isNaN(input.value) || input.value <= 0)
    {
        input.value = 1
    }
    updateCartTotal()
}
function addToCartClicked(event)//event listener for whenever add to cart button is clicked
{
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText
    var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src
    addItemToCart(title, price, imageSrc)
    return updateCartTotal();
}
function addItemToCart(title, price, imageSrc)//adds item to cart after button is clicked
{
    var cartRow = document.createElement('div')
    cartRow.classList.add("cart-item")
    var cartItems = document.getElementsByClassName("cart-items")[0]
    var cartItemNames = document.getElementsByClassName("cart-item-name")
    for(let i = 0; i < cartItemNames.length; i++)
    {
        if(cartItemNames[i].innerText == title)
        {
            alert("This item is already added to the cart")
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item-desc"><img class="cart-item-image" src="${imageSrc}"><span class="cart-item-name">${title}</span></div>
        <div class="cart-item-price"><span class="item-price-tag">${price}</span></div>
        <div class="cart-item-quantity"><input type="number" class="cart-quantity-input" value="1"><button class="btn-remove">Remove</button></div>
    `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName("btn-remove")[0].addEventListener("click", removeCartItem)
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged)
}
function updateCartTotal()//updates the cart total
{
    var cartItemContainer = document.getElementsByClassName("cart-items")[0]
    var cartRows = cartItemContainer.getElementsByClassName("cart-item")
    var total = 0
    for(var i = 0; i< cartRows.length; i++)
    {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName("item-price-tag")[0]
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        var price = parseFloat(priceElement.innerText.replace("$", ""))
        var quantity =quantityElement.value
        total = total + (price*quantity)
    }
    total = (Math.round(total * 100) / 100)
    var totalTag = document.getElementById("total-price-tag")
    totalTag.innerText = `$${total.toFixed(2)}`
}

var Object_of_all_orders = new Object
function checkoutClicked(event)//when you click the purchase button even listener
{
    if(confirm("Confirm Checkout"))
    {

    }
    else
    {
        return;
    }
    
    const order = new Object
    var cart_items = document.getElementsByClassName('cart-item')
    for(let i=0; i<cart_items.length;i++)
    {
        const item = new Object
        item.item_name = document.getElementsByClassName('cart-item-name')[i].innerText
        item.item_name = document.getElementsByClassName('cart-item-name')[i].innerText
        let price_per_item = document.getElementsByClassName('item-price-tag')[i].innerText
        price_per_item = Number(price_per_item.substring(1))
        item.price_per_item = price_per_item
        let item_quantity = Number(document.getElementsByClassName('cart-quantity-input')[i].value)
        item.item_quantity = item_quantity;
        item.item_total = price_per_item*item_quantity
        order[`Item${i + 1}`] = item;
    }
    let cart_total = document.getElementById('total-price-tag').innerText;
    cart_total = Number(cart_total.substring(1));
    order.cart_total = cart_total;
    
    let TempSendOrder = order
    localStorage.setItem('Send To Checkout Info', JSON.stringify(TempSendOrder))
    //send to local storage
    updateNumOfOrders()
    location.replace("Checkout.html")
}
    
function CheckoutReady()
{
    let retreiveOrder = JSON.parse(localStorage.getItem("Send To Checkout Info"))
    let subtotal = 0;
    var total = 0
    for(const key in retreiveOrder)
    {
        const item = retreiveOrder[key]
        const item_name = item['item_name'];
        const item_quantity = item['item_quantity'];
        const item_total = item['item_total'];
        if(key == 'cart_total')
        {
            subtotal = Number(subtotal.toFixed(2))
            const subtotalLocation = document.getElementsByClassName('sum-subtotal-price')[0]
            subtotalLocation.innerText = `$${subtotal}`
            let tax = Number((subtotal*.06).toFixed(2))
            const taxLocation = document.getElementsByClassName('sum-tax-price')[0]
            taxLocation.innerText = `$${tax}`
            total = Number((subtotal*1.06).toFixed(2))
            const totalLocation = document.getElementsByClassName('sum-total-price')[0]
            totalLocation.innerText = `$${total}`
        }
        else
        {
            subtotal += item_total
            const summaryItemsLocation = document.getElementsByClassName('order-summary-items')[0]
            const itemHTML = `
                <div class="item-left">
                    <span class="item-quantity"><b>${item_quantity}</b></span>
                    <span class="item-Name">${item_name}</span>
                </div>
                <div class="item-right">
                    <span class="item-total">$${item_total.toFixed(2)}</span>
                </div>
            `
            const item_row = document.createElement('div')
            item_row.setAttribute('class', 'item-row')
            item_row.innerHTML = itemHTML
            summaryItemsLocation.appendChild(item_row)
        }
    }
    //localStorage.setItem("Send To Checkout Info", '')
}



function addOrderToLocalStorage(x)
{
    let tempStorage =  JSON.parse(localStorage.getItem('Send To Checkout Info'))
    tempStorage['CustomerName'] = x
    tempStorage['OrderTotal']
    console.log(tempStorage)
    // ordersObject[`Order${NumberOfOrders}`] = temptStorage
    // localStorage.setItem('Incoming Orders', JSON.stringify(ordersObject))
    // NumberOfOrders++
    
}


function SummaryConfirm()
{
    if(confirm('Are you sure?'))
    {
        let name = prompt("Please Enter A Name For This Order")
        while(name=="")
        {
            name = prompt("Please Enter A Name For This Order")
        }
        let summary_div = document.getElementsByClassName('order-summary')[0]
        summary_div.style.visibility='hidden'
        summary_div.style.float='left'
        ShowPayment(name)
    }
    else if(confirm("Go back to Menu?"))
    {

    }
}

function SummaryCancel()
{
    if(confirm('Are you sure?'))
    {
        location.replace('menu.html')
    }
    else if(confirm("Go back to Menu?"))
    {
        location.replace('menu.html')
    }
}

function ShowPayment(name)
{
    
}

///////////MAKE IT SO WHEN THE PAGE IS LOADED IT MAKES IT PROMPT THE USER TO CONTINUE AS GUEST.
////AND IF THEY START ON A PAGE THAT ISNT LOGIN/SIGNUP/INDEX// AND THE "CURRENT" LOCAL STORAGE ITEMS ARE EMPTY...
// IT WILL ASK THEM IF THEY WANT TO LOGIN AND IF NOT COUNTIUE AS GUEST. 
//THAT WOULD ALSO SET THE ///CURRENT_USER///CURRENT_LOGIN///CURREN_LOGIN_NAME/// TO GUEST



///number of orders need to be done

///update the nav bar to be able to go to the customer profile if the user is customer is currently logged in
//update the nav bar to be able to go to the menu without having to click continue as guest