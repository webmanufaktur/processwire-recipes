<?php
    
// this duplicates the content in fieldname1 into fieldname2 for all pages with
// the template called: templatename
$source = "fieldname1";
$destination = "fieldname2";
$template = "templatename";

foreach($pages->find("template=$template") as $p) {
    // set outputFormatting to 'false' so the plain value is copied
    $p->of(false);
    $p->$destination = $p->$source;
    $p->save($destination);
}
