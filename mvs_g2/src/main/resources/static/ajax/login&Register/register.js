function isEmail(inputEmail) {
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(inputEmail);
}

$(document).ready(function (){
    $("#registerBtn").click(function (event) {
        if ($("#userName").val().length == 0) {
            $(".userNameError").html("User Name should not be blank");
        }else{
            $(".userNameError").html("");
        }

        let password = $("#password").val();
        if (password.length == 0) {
            $(".passwordError").html("Password should not be blank");
        }else{
            $(".passwordError").html("");
        }


        let confirm = $("#confirmPassword").val();
        if (confirm.length == 0) {
            $(".confirmPasswordError").html("Confirm password should not be blank");
        } else if(confirm !=password){
            $(".confirmPasswordError").html("Confirm password not match");
        }else{
            $(".confirmPasswordError").html("");
        }

        if ($("#fullName").val().length == 0) {
            $(".fullNameError").html("Full Name should not be blank");
        }else{
            $(".fullNameError").html("");
        }

        if ($("#identityCard").val().length == 0) {
            $(".identityCardError").html("Identity card should not be blank");
        }else{
            $(".identityCardError").html("");
        }

        let email = $("#email").val();
        if (email.length == 0) {
            $(".emailError").html("Email should not be blank");
        }else if(!isEmail(email)){
            $(".emailError").html("Email not correct");
        }
        else{
            $(".emailError").html("");
        }

        if ($("#address").val().length == 0) {
            $(".addressError").html("Address should not be blank");
        }else{
            $(".addressError").html("");
        }

        if ($("#phoneNumber").val().length == 0) {
            $(".phoneNumberError").html("Phone number should not be blank");
        }else{
            $(".phoneNumberError").html("");
        }
        event.preventDefault();
    });

    $('#loginBtn').on('click',function (){
        window.location.href= 'http://localhost:8080/';
    })

    $('#registerBtn').on("click",function (){
        let account={};
        let userName = $("#userName").val();
        let password = $("#password").val();
        let fullName = $("#fullName").val();
        let gender = $("#gender").val();
        let identityCard = $("#identityCard").val();
        let email = $("#email").val();
        let address = $("#address").val();
        let phoneNumber = $("#phoneNumber").val()
        account.username = userName;
        account.password = password;
        account.fullName = fullName;
        account.gender = 'gender';
        account.identityCard = identityCard;
        account.email = email;
        account.address = address;
        account.phoneNumber = phoneNumber;
        console.log(account);
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(account),
            url: "http://localhost:8080/api/account",
            success: function(result){
               $('#message').html("Register Success");
            }
        })
    })
})