<?php
    
// get the template
$t = $templates->get('basic-page');

// get the field in context of this template
$f = $t->fieldgroup->getField('summary', $useFieldgroupContext = true);

// value of the field
$f->description = "Description of 'summary' only in context of 'basic-page'";

// save new setting in context
$fields->saveFieldgroupContext($f, $t->fieldgroup);
