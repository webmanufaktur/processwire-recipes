<?php
    
<?php

    class LanguageDefault extends WireData implements Module {

        /**
         * getModuleInfo is a module required by all modules to tell ProcessWire about them
         *
         * @return array
         *
         */
        public static function getModuleInfo() {

            return array(
                'title' => 'LanguageDefault',
                'version' => 1,
                'summary' => 'A work around to changing the default language.',
                'href' => 'https://processwire.com/talk/topic/9322-change-default-language-for-homepage/?p=89717',
                'singular' => true,
                'autoload' => true,
            );
        }

        /**
         * Initialize the module
         *
         * ProcessWire calls this when the module is loaded. For 'autoload' modules, this will be called
         * when ProcessWire's API is ready. As a result, this is a good place to attach hooks.
         *
         */
        public function init() {
            $this->session->addHookBefore('redirect', $this, 'setDefaultLanguage');
            // The hook checks whether you are viewing the home page, and whether you are redirecting to the English url, and if so, it changes the url to the French url
        }


        public function setDefaultLanguage($event) {
            if ($this->page->id == 1 && $event->arguments(0) == $this->page->localUrl('default')) {
              $event->arguments(0, $this->page->localUrl('fr'));
            }
        }

    }
