<?php
    
$p = new Page();
$p->setOutputFormatting(false);
$p->template = 'products'; // example template
$p->parent = wire('pages')->get('/'); // example parent
$p->name = "foo"; // example name
$p->title = "My API-generated new PW page";
$p->fieldname = "my field value"; // example field with example value
$p->save();
echo "page ID {$p->id} created!<br>";
