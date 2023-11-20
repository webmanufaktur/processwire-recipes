<?php

$tokenName = $this->session->CSRF->getTokenName();
$tokenValue = $this->session->CSRF->getTokenValue();

$html .= '<input type="hidden" id="_post_token" name="' . $tokenName . '" value="' . $tokenValue . '"/>';

// result
// <input type="hidden" id="_post_token" name="TOKEN1470842875" value="fe8ce9c1b9e6b9e361830df3525c49317a35332fbf626aa8793777a3b705824a">

$session->CSRF->validate();
