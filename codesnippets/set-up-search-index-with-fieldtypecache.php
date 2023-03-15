<?php
    
$q = $sanitizer->selectorValue($input->get->q);
if ($q) {
    $pages->find('search_cache%=' . $q);
    // ... do something with the results ...
}
