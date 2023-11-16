function userCheck(){
    let ask = prompt('Are you a Soiree Guest or a Manager?')
    if(ask == 'guest' || ask == 'Guest'){
        alert('Taking you to guest page')
        location.replace('guestSignUp.html')
    }
    else if(ask == 'manager' || ask == 'Manager'){
        alert('Redirecting to manager page')
        location.replace('mSignUp.html')
    }
    else{
        alert('Please insert a valid option')
    }
}