function paynow() {

    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var phone = document.getElementById("phone").value;
    var city = document.getElementById("city").value;
    var country = document.getElementById("country").value;
    var amount = document.getElementById("amount").value;


    var form = new FormData();

    form.append("f", fname);
    form.append("l", lname);
    form.append("e", email);
    form.append("ad", address);
    form.append("p", phone);
    form.append("c", city);
    form.append("co", country);
    form.append("am", amount);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {

        if (request.readyState == 4 & request.status == 200) {

            var response = request.responseText;

            var obj = JSON.parse(response);

            var email = obj["email"];
            var amount = obj["amount"];
            var fname = obj["fname"];
            var lname = obj["lname"];
            var mobile = obj["mobile"];

            // Payment completed. It can be a successful failure.
            payhere.onCompleted = function onCompleted(orderId) {
                console.log("Payment completed. OrderID:" + orderId);
               
                
                saveInvoice(orderId, fname, lname, amount, mobile, email);
                


                // Note: validate the payment and show success or failure page to the customer
            };

            // Payment window closed
            payhere.onDismissed = function onDismissed() {
                // Note: Prompt user to pay again or show an error page
                console.log("Payment dismissed");
            };

            // Error occurred
            payhere.onError = function onError(error) {
                // Note: show an error page
                console.log("Error:" + error);
            };

            // Put the payment variables here
            var payment = {
                "sandbox": true,
                "merchant_id": obj["mid"],    // Replace your Merchant ID
                "return_url": "http://localhost/payment/success.php",     // Important
                "cancel_url": "http://localhost/payment/cancel.php",     // Important
                "notify_url": "http://sample.com/notify",
                "order_id": obj["id"],
                "items": obj["item"],
                "amount": obj["amount"],
                "currency": "LKR",
                "hash": obj["hash"], // *Replace with generated hash retrieved from backend
                "first_name": obj["fname"],
                "last_name": obj["lname"],
                "email": obj["email"],
                "phone": obj["mobile"],
                "address": obj["address"],
                "city": obj["city"],
                "country": obj["country"],
                "delivery_address": obj["address"],
                "delivery_city": obj["city"],
                "delivery_country": "Sri Lanka",
                "custom_1": "",
                "custom_2": ""
            };

            // Show the payhere.js popup, when "PayHere Pay" is clicked
            //document.getElementById('payhere-payment').onclick = function (e) {
            payhere.startPayment(payment);
            //};
        }

    }

    request.open("POST", "buyNowProcess.php", true);
    request.send(form);


}

function saveInvoice(id, fname, lname, amount, mobile, email) {


    var form = new FormData();

    form.append("i", id);
    form.append("f", fname);
    form.append("l", lname);
    form.append("a", amount);
    form.append("m", mobile);
    form.append("e", email);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {

        if (request.readyState == 4 && request.status == 200) {

            var response = request.responseText;
            
            if(response == "success"){

                window.location = "success.php?id=" + id;
            }else{
                alert(response);
            }

           

        }


    }



    request.open("POST", "save.php", true);
    request.send(form);


}


function printInvoice() {
    var restorePage = document.body.innerHTML;
    var page = document.getElementById("page").innerHTML;
    document.body.innerHTML = page;
    window.print();
    document.body.innerHTML = restorePage;
}