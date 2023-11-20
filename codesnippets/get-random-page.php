<?php
    
$quote = $pages->find("template=quote, include=hidden, sort=random, limit=1")->first();

if($quote->id) {

    $q = $quote->quote; // example field
    $a = $quote->author; // example field

    echo "<blockquote>\n";
    echo "    <p>$q</p>\n";
    echo "    <footer>— <cite>$a</cite></footer>\n";
    echo "</blockquote>\n";

}
