<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
if($_POST){
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/POP3.php';
    require 'PHPMailer/src/SMTP.php';
    require 'PHPMailer/src/Exception.php';
    $mail = new PHPMailer(true);                     
    try {
        $mail->CharSet = 'UTF-8';
        $mail->SMTPDebug = 2;                        
        $mail->isSMTP();                                     
        $mail->Host = 'ssl://smtp.mail.ru';  
        $mail->SMTPAuth = true;                       
        $mail->Username = 'maksim1233@mail.ru';              
        $mail->Password = 'BfSGkGAJ';                           
        $mail->SMTPSecure = 'ssl';                           
        $mail->Port = 465;                                  

        $mail->setFrom('maksim1233@mail.ru', 'kazanbel');
        $mail->addAddress('maksim.zelenovskiy@gmail.com', 'kazanbel'); 

        $mail->isHTML(true);                         
        $mail->Subject = $_POST['fromForm'];
        $mail->Body    = ' <html>
                        <head>
                    <title>'.$_POST['fromForm'].'</title>
                    </head>
                    <body>
                    <h2>'.$_POST['fromPage'].'</h2>
                        <p>Телефон:  <span style="font-size: 20px">'.$_POST['person_phone'].'</span></p>                                           
                    </body>
                </html>';

        $mail->send();
    } catch (Exception $e) {
        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    }
}
?>