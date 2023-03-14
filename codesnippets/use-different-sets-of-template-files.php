<?php
    
$config->urls->templates = $config->urls->site . 'mytemplates/';
$config->paths->templates = $config->paths->site . 'mytemplates/';

/**
* Development example: Alias for template-dev access
*
*/
if($_SERVER['HTTP_HOST'] == 'dev.domain.ext') {
    $config->urls->templates = $config->urls->site . 'templates-dev/';
    $config->paths->templates = $config->paths->site . 'templates-dev/';
    $config->debug = true;
}

/**
* Mobile example: Alias for template-mobile access
*
*/
if($_SERVER['HTTP_HOST'] == 'm.domain.ext') {
    $config->urls->templates = $config->urls->site . 'templates-mobile/';
    $config->paths->templates = $config->paths->site . 'templates-mobile/';
}
