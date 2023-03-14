<?php
    
$wire->addHookAfter('WireMail::send', function($event) {
  $mail = $event->object;
  $event->wire('log')->save('sent-mail',
    "SENT ($event->return of " . count($mail->to) . "), " .
    "SUBJECT ($mail->subject), " .
    "TO (" .  implode(", ", $mail->to) . "), " .
    "FROM ($mail->from)"
  );
});

$mail->new()
  ->to('test@processwire.com')
  ->from('ryan@test.com')
  ->subject('Hello world')
  ->body('How are you doing?')
  ->send();
