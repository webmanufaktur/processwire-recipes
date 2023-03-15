<?php
    

require "index.php";
$admin = $users->get('admin'); // or whatever your username is
$admin->setAndSave('pass', 'yo123456');


require "index.php";
$admin = wire('users')->get('admin');
$admin->setOutputFormatting(false);
$admin->set('pass', 'yo12345');
$admin->save('pass');
