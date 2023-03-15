<?php
    
echo "<ul class=\"breadcrumbs \">";

$parents = $page->parents;

foreach($parents as $parent) {
    $url = $parent->url;
    echo "<li><a href='$url'>{$parent->title}</a></li>\n";
}

// show current / "we are here" page as well, but not as link: (last element)
echo "<li>{$page->title}</li>\n";

echo "</ul>";

echo "<ul class=\"breadcrumbs \">";

echo $page->parents->each("<li><a href='{url}'>{title}</a></li>\n");

// show current / "we are here" page as well, but not as link: (last element)
echo "<li>{$page->title}</li>\n";

echo "</ul>";
