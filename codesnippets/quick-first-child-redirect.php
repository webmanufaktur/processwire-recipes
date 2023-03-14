<?php

/**
 * Template: First Child redirect
 *
 */

// if current page has children (published, not hidden), redirect (HTTP 302) to its first child
if($pages->count("parent=$page")) $session->redirect($page->child->url, false);
