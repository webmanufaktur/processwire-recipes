<?php
    
// check if the user is logged in and if they are not a super user
if ($user->isLoggedIn() && $config->maintenance === true && !$user->isSuperuser()) {
    // logout the user
    $session->logout();
    // spit out an error message via session, so it still appears after the redirect
    $session->error('Database currently in maintenance - logged out');
    // redirect to the login page
    $session->redirect($config->urls->admin);
}

$config->maintenance = true;
