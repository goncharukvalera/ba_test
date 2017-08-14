<?php
include 'connection.php';

$firstName = $_POST["firstName"];
$surName = $_POST["surName"];
$phone = $_POST["phone"];
$email = $_POST["email"];
$message = $_POST["message"];
$pattern = [
    'email' => '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',
    'phone' => '/^[0-9\-\+]{9,15}$/'
];

/**
 * Validate input values
 * @param $name
 * @param $value
 * @return int
 */
function checkRegExp($name, $value)
{
    global $pattern;
    return preg_match($pattern[$name], $value);
}

;

if (!checkRegExp('email', $email)) {
    $response['error']['email'] = 'Invalid email';
}

if (!checkRegExp('phone', $phone)) {
    $response['error']['phone'] = 'Invalid phone';
}

if (!$response['error']) {
    $userInfoSql = "INSERT INTO `reviews` (`first_name`, `surname`, `phone`, `email`, `message`)
                VALUES ('$firstName', '$surName','$phone', '$email', '$message')";
    mysqli_query($connect, $userInfoSql);
}
$response["success"] = true;

echo json_encode($response);
