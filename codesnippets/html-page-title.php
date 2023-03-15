<?php
    
function renderPageTitle($options=array()){
    $defaults = array(
        'glue'    => ' « ', // ' » '
        'reverse' => true   // false
    );
    $opts = array_merge($defaults,$options);
    $page = wire('page');
    $parents = $page->parents;
    $items = array();
    foreach($parents as $parent) {
        $items[] = $parent->title;
    }
    $items[] = $page->title;
    if($opts['reverse']){
        $items = array_reverse($items);
    }
    $out = implode($opts['glue'],$items);
    return $out;
}
