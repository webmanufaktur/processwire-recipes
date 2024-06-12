<?php
    
// Assign API variables to make things a little easier
$fields = wire("fields");
$languages = wire("languages");

// Example languages
$en = $languages->get('en');
$us = $languages->get('us');
$fr = $languages->get('fr');

// Example multi-language field
$field = $fields->get("prod_max_power_consumption");
$field->set("label$en", "Max. Power Consumption");
$field->set("label$us", "Max. Power Consumption");
$field->set("label$fr", "Max. consommation de courant");

$field->save();
