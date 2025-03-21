<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $firstName = $_POST['first-name'] ?? '';
    $lastName = $_POST['last-name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $address = $_POST['address'] ?? '';
    $cartData = json_decode($_POST['cart-data'], true); // Decode the cart data from JSON

    // Prepare email content
    $subject = "New Order from $firstName $lastName";
    $message = "
    <h2>Customer Information</h2>
    <p><strong>First Name:</strong> $firstName</p>
    <p><strong>Last Name:</strong> $lastName</p>
    <p><strong>Phone:</strong> $phone</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Address:</strong> $address</p>
    
    <h2>Order Details</h2>";

    $totalPrice = 0;
    $message .= "<ul>";
    foreach ($cartData as $item) {
        $itemTotal = $item['price'] * $item['quantity'];
        $totalPrice += $itemTotal;
        $message .= "<li>{$item['name']} x {$item['quantity']} = {$itemTotal} lei</li>";
    }
    $message .= "</ul>";
    $message .= "<h3>Total Price: $totalPrice lei</h3>";

    // Set email headers
    $to = "comenzi@frumix.ro";
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        // Redirect to the confirmation page
        header("Location: multumim.html");
        exit();
    } else {
        echo "There was an error sending your order. Please try again later.";
    }
}
?>
