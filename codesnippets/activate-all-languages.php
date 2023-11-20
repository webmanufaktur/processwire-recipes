<?php
    
$pages->setOutputFormatting(false);
$pag = $pages->find("template='product'");
foreach($pag as $p) {
    foreach($languages as $lang) {
      if($lang->isDefault()) continue;
      $p->set("status$lang", 1);
      $p->save();
    }
}
