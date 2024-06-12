<?php
    
<?php

/**
 * Hook the saving of pages to add own processes.
 *
 * ProcessWire 2.x
 * Copyright (C) 2014 by Ryan Cramer
 * Licensed under GNU/GPL v2, see LICENSE.TXT
 *
 * http://processwire.com
 *
 */

class HookAfterPagesSave extends WireData implements Module {

    public static function getModuleInfo() {

        return array(
            'title' => 'HookAfterPageSave',
            'version' => 1,
            'summary' => 'Hook the saving of pages to add own processes.',
            'singular' => true, // Limit the module to a single instance
            'autoload' => true, // Load the module with every call to ProcessWire
            );
    }

    public function init() {
        // init() is called when the module is loaded.
        // saveReady is a hook after processing the previous changes of the page,
        // but just before those changes are saved to the database.
        // It's called for each page that's being saved, no matter if it's in
        // the backend or in your templates via the api.
        $this->addHookAfter('Pages::saveReady', $this, 'afterSaveReady');
    }

    public function afterSaveReady($event) {
        // Get the soon to be saved page object from the given event
        $page = $event->arguments[0];

        // Sample condition and changes
        if($page->template == "basic-page" && !$page->isTrash()){
            $page->addStatus(Page::statusLocked);
            // Page will be saved right after this hook, so no need to call save().
            // Every other page you load and edit here needs to be saved manually.
            $this->message("Page has been locked");
        }
    }

}
