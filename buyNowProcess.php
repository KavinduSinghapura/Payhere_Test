<?PHP

$fname = $_POST["f"];
$lname = $_POST["l"];
$email = $_POST["e"];
$address = $_POST["ad"];
$phone = $_POST["p"];
$city = $_POST["c"];
$country = $_POST["co"];
$amount = $_POST["am"];
$order_id = uniqid();
$item = "Course Payment";

$merchant_id = "1224972";
$merchant_secret = "NTk3MDk2MDcwMjYzNDgxODA0MTg5NTI5NjQ0NTE2MTc4NjYwOTI=";
$currency = "LKR";

$hash = strtoupper(
    md5(
        $merchant_id .
            $order_id .
            number_format($amount, 2, '.', '') .
            $currency .
            strtoupper(md5($merchant_secret))
    )
);

$array["id"] = $order_id;
$array["item"] = $item;
$array["amount"] = $amount;
$array["fname"] = $fname;
$array["lname"] = $lname;
$array["mobile"] = $phone;
$array["address"] = $address;
$array["city"] = $city;
$array["email"] = $email;
$array["mid"] = $merchant_id;
$array["msecret"] = $merchant_secret;
$array["currency"] = $currency;
$array["hash"] = $hash;

echo json_encode($array);
