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
                        <p style="font-size: 18px">Какой казан вас интересует?____<b>'.$_POST['kazan_quiz'].'</b></p>                                           
                        <p style="font-size: 18px">На какое колличество персон вы будете готовить?____<b>'.$_POST['person_quiz'].'</b></p>                                           
                        <p style="font-size: 18px">Вы планируете готовить?____<b>'.$_POST['cook_quiz'].'</b></p>                                           
                        <p style="font-size: 18px">У вас есть печь или мангал для казана?____<b>'.$_POST['quiz_furnace'].'</b></p>                                           
                                                  
                        <p style="font-size: 18px">Вы хотите купить аксессуары со скидкой в 10%??____<b>'.$_POST['accessories_quiz'].'</b></p>                                          
                        <p style="font-size: 18px">Какой бюджет у вас на покупку казана?____<b>'.$_POST['quiz_budget'].'</b></p>                                          
                        <p style="font-size: 18px">Вам нужна доставка казана?____<b>'.$_POST['quiz_delivery'].'</b></p>                                          
                        <p style="font-size: 18px">Как с Вами связаться?____<b>'.$_POST['quiz_messenger'].'</b></p>                                          
                        <p style="font-size: 18px">Телефон____<b>'.$_POST['person_phone_quiz'].'</b></p>                                          
                    </body>
                </html>';

        $mail->send();
        //<p style="font-size: 18px">Какие аксессуары со скидкой в 10% вы бы приобрели?____<b>'.implode(", ", $_POST['quiz_accessories']).'</b></p>
    } catch (Exception $e) {
        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    }
}
?>